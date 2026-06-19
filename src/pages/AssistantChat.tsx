import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import ChatScreenLayout from '../components/ChatScreenLayout'
import AssistantSwitcher, {
  hasActiveCrisisSupport,
} from '../components/AssistantSwitcher'
import PageSpinner from '../components/PageSpinner'
import {
  buildOpeningMessage,
  createMessageId,
  loadChat,
  loadConfig,
  saveChat,
  saveConfig,
  type ChatMessage,
  type GroupKey,
} from '../lib/assistant-storage'
import { getUserMemory, initUserMemory, type UserMemory } from '../lib/assistant-memory'
import { buildContext, ensureSummary } from '../lib/memory-service'
import {
  detectCrisis,
  getCrisisSupportText,
} from '../lib/crisis-detect'
import { checkStressEscalation } from '../lib/pa-stress'
import { getDomainKBHint } from '../lib/pa-kb-router'
import {
  probeInjectedContext,
  resolveInjectedContext,
  type InjectPath,
} from '../lib/assistant-context'
import { pickBoundaryPhrase } from '../data/ai-boundary-phrases'
import { getIsolationPhrase, getRomanticBoundaryPhrase } from '../lib/isolation-detect'
import { buildSystemPrompt, getLLM, type LLMMessage } from '../lib/llm-client'
import { getCurrentCharacter, getLatestMBTI, getSpiritualResult, getBig5Profile, getPaMemory, savePaMemory, markDailyNudgeSeen } from '../db/tncb-db'
import { getBig5Level } from '../lib/big5-scoring'
import { buildPaMemoryBlock } from '../data/pa-memory'
import { extractFact, mergeFactIntoMemory } from '../lib/pa-memory-extract'
import { buildPersonaGuidance } from '../lib/pa-persona-guidance'
import {
  openingHasDailyNudge,
  markDailyNudgeOfferedSession,
  shouldShowDailyNudge,
} from '../lib/daily-insight-nudge'
import {
  appendProactiveGreeting,
  buildPayloadReply,
  buildProactivePayload,
  EMPTY_PROACTIVE_STATE,
  getReminderFallbackReply,
  isUserConfirming,
  isUserRemindingPromise,
  type ProactiveState,
} from '../lib/pa-proactive'
import { ageFromBirthDate } from '../lib/user-age'
import {
  appendUncertainForkIfMissing,
  detectResponseMode,
  type AssertiveTurbulent,
} from '../lib/style-adapter'

const GROUPS: { key: GroupKey; label: string; emoji: string }[] = [
  { key: 'sincere', label: 'Chân thành', emoji: '🤝' },
  { key: 'maverick', label: 'Người Giời', emoji: '😏' },
]

const LLM_ERROR =
  'Mình chưa kết nối được, kiểm tra Ollama đang chạy nhé'

interface AiBoundaryState {
  hasShownIsolation: boolean
  hasShownDepth: boolean
  hasShownRomantic: boolean
  emotionalDepthCount: number
  anyBoundaryShown: boolean
}

function updateEmotionalDepth(
  state: AiBoundaryState,
  params: {
    path: InjectPath
    mode: string
    hasKBInject: boolean
  },
): void {
  const { path, mode, hasKBInject } = params

  if (hasKBInject || path === 'protective' || path === 'crisis') {
    state.emotionalDepthCount = 0
    return
  }

  if (mode === 'listen' && !hasKBInject) {
    state.emotionalDepthCount += 1
  } else {
    state.emotionalDepthCount = 0
  }
}

function appendBoundaryPhrase(
  state: AiBoundaryState,
  turnIndex: number,
  params: {
    replyBody: string
    isCrisis: boolean
    isProtective: boolean
    hasKBInject: boolean
    userMsg: string
  },
): string {
  const { replyBody, isCrisis, isProtective, hasKBInject, userMsg } = params

  if (isCrisis || isProtective) return replyBody
  if (turnIndex < 2) return replyBody

  // Romantic boundary — lớp riêng, không bị chặn bởi anyBoundaryShown
  if (!state.hasShownRomantic) {
    const romanticPhrase = getRomanticBoundaryPhrase({
      userMsg,
      hasShownRomantic: state.hasShownRomantic,
    })
    if (romanticPhrase) {
      state.hasShownRomantic = true
      return `${replyBody}\n\n${romanticPhrase}`
    }
  }

  if (state.anyBoundaryShown) return replyBody

  if (!state.hasShownIsolation) {
    const phrase = getIsolationPhrase({
      userMsg,
      turnIndex,
      hasShownIsolation: state.hasShownIsolation,
      isCrisis,
      isProtective,
    })
    if (phrase) {
      state.hasShownIsolation = true
      state.anyBoundaryShown = true
      return `${replyBody}\n\n${phrase}`
    }
  }

  if (hasKBInject) return replyBody

  if (!state.hasShownDepth && state.emotionalDepthCount >= 4) {
    const phrase = pickBoundaryPhrase('sessionDepth')
    state.hasShownDepth = true
    state.anyBoundaryShown = true
    return `${replyBody}\n\n${phrase}`
  }

  return replyBody
}

interface Big5NudgeState {
  hasShown: boolean
  hasProfile: boolean
}

function appendBig5Nudge(
  state: Big5NudgeState,
  turnIndex: number,
  params: {
    replyBody: string
    isCrisis: boolean
    isProtective: boolean
  },
): { body: string; showNudge: boolean } {
  const { replyBody, isCrisis, isProtective } = params
  if (isCrisis || isProtective) return { body: replyBody, showNudge: false }
  if (state.hasProfile || state.hasShown) return { body: replyBody, showNudge: false }
  if (turnIndex !== 4) return { body: replyBody, showNudge: false }

  state.hasShown = true
  return {
    body: `${replyBody}\n\nNếu muốn mình hiểu bạn sâu hơn, có thể thử trắc nghiệm Big Five (5 phút) →`,
    showNudge: true,
  }
}

function buildSystemContent(
  personaCompressed: string,
  group: GroupKey,
  mbtiType: string,
  archetypeLabel: string,
  identity: AssertiveTurbulent,
  userMessage: string,
  userAge: number | null,
  userMemory: UserMemory,
  summaryBlock: string | null,
  crisisTurn: boolean,
  skipStyle: boolean,
  commBlock: string | null,
  kbBlock: string | null,
  situationalBlock: string | null,
  personaGuidanceBlock: string | null,
  paMemoryBlock: string | null,
  domainHintBlock: string | null,
): string {
  const parts = [
    buildSystemPrompt(
      personaCompressed,
      group,
      mbtiType,
      archetypeLabel,
      crisisTurn,
      {
        identity,
        userMessage,
        userAge,
        skipStyle,
        subtlePersona: !crisisTurn,
      },
    ),
  ]

  if (!crisisTurn && personaGuidanceBlock) {
    parts.push(
      '',
      '[PERSONA GUIDANCE — chỉ cách hiểu user, không đọc lại cho user]',
      personaGuidanceBlock,
    )
  }

  if (!crisisTurn && domainHintBlock) {
    parts.push('', '[DOMAIN CONTEXT — soft hint, không override crisis/safety]', domainHintBlock)
  }

  if (!crisisTurn && commBlock) {
    parts.push('', commBlock)
  } else if (!crisisTurn && kbBlock) {
    parts.push('', kbBlock)
  } else if (!crisisTurn && situationalBlock) {
    parts.push('', situationalBlock)
  }

  if (userMemory.goal.trim()) {
    parts.push('', `[Mục tiêu user]: ${userMemory.goal.trim()}`)
  }
  if (userMemory.notes.trim()) {
    parts.push(`[Ghi chú về user]: ${userMemory.notes.trim()}`)
  }
  if (summaryBlock) {
    parts.push('', `[Tóm tắt hội thoại trước]: ${summaryBlock}`)
  }

  if (!crisisTurn && paMemoryBlock) {
    parts.push('', paMemoryBlock)
  }

  return parts.join('\n')
}

function buildLLMMessages(
  history: ChatMessage[],
  personaCompressed: string,
  group: GroupKey,
  mbtiType: string,
  archetypeLabel: string,
  identity: AssertiveTurbulent,
  userMessage: string,
  userAge: number | null,
  userMemory: UserMemory,
  crisisTurn: boolean,
  skipStyle: boolean,
  commBlock: string | null,
  kbBlock: string | null,
  situationalBlock: string | null,
  personaGuidanceBlock: string | null,
  paMemoryBlock: string | null,
  domainHintBlock: string | null,
): LLMMessage[] {
  const { summaryBlock, recent } = buildContext(history)

  return [
    {
      role: 'system',
      content: buildSystemContent(
        personaCompressed,
        group,
        mbtiType,
        archetypeLabel,
        identity,
        userMessage,
        userAge,
        userMemory,
        summaryBlock,
        crisisTurn,
        skipStyle,
        commBlock,
        kbBlock,
        situationalBlock,
        personaGuidanceBlock,
        paMemoryBlock,
        domainHintBlock,
      ),
    },
    ...recent,
  ]
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.45)',
            animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  )
}

function CrisisSupportBlock() {
  return (
    <div
      style={{
        marginTop: '8px',
        maxWidth: '85%',
        padding: '10px 12px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        fontSize: '13px',
        lineHeight: 1.55,
        color: 'rgba(255,255,255,0.72)',
      }}
    >
      {getCrisisSupportText()}
    </div>
  )
}

function ChatBubble({
  message,
  showTyping,
}: {
  message: ChatMessage
  showTyping?: boolean
}) {
  const isUser = message.role === 'user'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
      }}
    >
      <div
        style={{
          maxWidth: '85%',
          padding: '12px 14px',
          borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
          background: isUser
            ? 'rgba(168,230,61,0.18)'
            : 'rgba(255,255,255,0.06)',
          border: isUser
            ? '1px solid rgba(168,230,61,0.35)'
            : '1px solid rgba(255,255,255,0.10)',
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.88)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {showTyping ? <TypingIndicator /> : message.content}
      </div>
      {!isUser && message.crisisSupport && !showTyping && message.content ? (
        <CrisisSupportBlock />
      ) : null}
      {!isUser && message.big5Nudge && !showTyping ? (
        <Link
          to="/big5"
          style={{
            display: 'inline-block',
            marginTop: 8,
            padding: '8px 14px',
            borderRadius: 10,
            border: '1px solid rgba(168,230,61,0.35)',
            background: 'rgba(168,230,61,0.12)',
            color: '#A8E63D',
            fontSize: 12,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Big Five · 5 phút
        </Link>
      ) : null}
    </div>
  )
}

function DailyNudgeButtons({
  onListen,
  onLater,
}: {
  onListen: () => void
  onLater: () => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        marginTop: 8,
        marginBottom: 12,
        maxWidth: '85%',
      }}
    >
      <button
        type="button"
        onClick={onListen}
        style={{
          padding: '8px 14px',
          borderRadius: 10,
          border: '1px solid rgba(168,230,61,0.35)',
          background: 'rgba(168,230,61,0.12)',
          color: '#A8E63D',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Nghe
      </button>
      <button
        type="button"
        onClick={onLater}
        style={{
          padding: '8px 14px',
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'transparent',
          color: 'rgba(255,255,255,0.45)',
          fontSize: 12,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Để sau
      </button>
    </div>
  )
}

const pillBase: CSSProperties = {
  flexShrink: 0,
  padding: '8px 14px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.65)',
  transition: 'all 0.15s ease',
}

const pillActive: CSSProperties = {
  background: 'rgba(168,230,61,0.15)',
  border: '1px solid rgba(168,230,61,0.45)',
  color: '#A8E63D',
}

const headerIconLink: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.75)',
  textDecoration: 'none',
  fontSize: '18px',
  lineHeight: 1,
  flexShrink: 0,
}

export default function AssistantChat() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const aiBoundaryState = useRef<AiBoundaryState>({
    hasShownIsolation: false,
    hasShownDepth: false,
    hasShownRomantic: false,
    emotionalDepthCount: 0,
    anyBoundaryShown: false,
  })
  const big5NudgeState = useRef<Big5NudgeState>({
    hasShown: false,
    hasProfile: false,
  })
  const turnIndex = useRef(0)
  const dailyNudgePromptRef = useRef<'hidden' | 'pending' | 'dismissed'>('hidden')
  const proactiveStateRef = useRef<ProactiveState>({ ...EMPTY_PROACTIVE_STATE })

  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [archetypeLabel, setArchetypeLabel] = useState('')
  const [persona, setPersona] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [group, setGroup] = useState<GroupKey>('sincere')
  const [identity, setIdentity] = useState<AssertiveTurbulent>('A')
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [userAge, setUserAge] = useState<number | null>(null)
  const [dailyNudgePrompt, setDailyNudgePrompt] = useState<
    'hidden' | 'pending' | 'dismissed'
  >('hidden')

  useEffect(() => {
    async function init() {
      const mbti = await getLatestMBTI()
      if (!mbti?.mbtiType) {
        navigate('/quiz', { replace: true })
        return
      }

      const character = await getCurrentCharacter()
      const spiritual = await getSpiritualResult()
      setUserAge(ageFromBirthDate(spiritual?.birthDate))
      setMbtiType(mbti.mbtiType)
      setIdentity(mbti.identity ?? 'A')
      setArchetypeLabel(
        character?.archetypeLabel ?? mbti.archetypeLabel ?? 'Chưa xác định',
      )
      setPersona(character?.personaCompressed ?? '')
      await initUserMemory()

      const big5 = await getBig5Profile()
      big5NudgeState.current.hasProfile = big5 !== null

      const config = loadConfig()
      setGroup(config.group)

      let chat = loadChat()
      if (chat.length === 0) {
        chat = [buildOpeningMessage(mbti.mbtiType)]
        saveChat(chat)
      }

      const proactive = await buildProactivePayload(mbti.mbtiType)
      const showNudgeRoll = await shouldShowDailyNudge()

      if (showNudgeRoll && proactive) {
        markDailyNudgeOfferedSession()
        proactiveStateRef.current = {
          hasPromise: true,
          payload: proactive.content,
          payloadType: proactive.type,
        }
        dailyNudgePromptRef.current = 'pending'
        setDailyNudgePrompt('pending')
        chat = chat.map((m) =>
          m.isOpening
            ? {
                ...m,
                content: appendProactiveGreeting(m.content, proactive.greeting),
              }
            : m,
        )
        saveChat(chat)
      } else if (
        chat.some((m) => m.isOpening && openingHasDailyNudge(m.content))
      ) {
        const restored = proactive ?? (await buildProactivePayload(mbti.mbtiType))
        if (restored) {
          proactiveStateRef.current = {
            hasPromise: true,
            payload: restored.content,
            payloadType: restored.type,
          }
          dailyNudgePromptRef.current = 'pending'
          setDailyNudgePrompt('pending')
        }
      }

      setMessages(chat)
      setInitialized(true)
      setLoading(false)
    }

    void init()
  }, [navigate])

  useEffect(() => {
    if (!initialized) return
    saveChat(messages)
  }, [messages, initialized])

  useEffect(() => {
    if (!initialized) return
    saveConfig({ group })
  }, [group, initialized])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  function handleDailyNudgeListen() {
    const payload = proactiveStateRef.current.payload
    if (!payload) return

    const assistantMsg: ChatMessage = {
      id: createMessageId(),
      role: 'assistant',
      content: payload,
      ts: Date.now(),
    }

    proactiveStateRef.current = { ...EMPTY_PROACTIVE_STATE }
    dailyNudgePromptRef.current = 'dismissed'
    setDailyNudgePrompt('dismissed')
    void markDailyNudgeSeen()
    setMessages((prev) => [...prev, assistantMsg])
  }

  function handleDailyNudgeLater() {
    dailyNudgePromptRef.current = 'dismissed'
    setDailyNudgePrompt('dismissed')
  }

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming) return

    const crisisTurn = detectCrisis(text) || checkStressEscalation(text)
    const proactive = proactiveStateRef.current

    if (!crisisTurn && proactive.hasPromise && proactive.payload) {
      if (isUserConfirming(text) || isUserRemindingPromise(text)) {
        const reminded = isUserRemindingPromise(text) && !isUserConfirming(text)
        const userMsg: ChatMessage = {
          id: createMessageId(),
          role: 'user',
          content: text,
          ts: Date.now(),
        }
        const assistantMsg: ChatMessage = {
          id: createMessageId(),
          role: 'assistant',
          content: buildPayloadReply(proactive.payload, reminded),
          ts: Date.now(),
        }

        proactiveStateRef.current = { ...EMPTY_PROACTIVE_STATE }
        dailyNudgePromptRef.current = 'dismissed'
        setDailyNudgePrompt('dismissed')
        void markDailyNudgeSeen()
        setMessages((prev) => [...prev, userMsg, assistantMsg])
        setInput('')
        return
      }
    } else if (!crisisTurn && isUserRemindingPromise(text)) {
      const userMsg: ChatMessage = {
        id: createMessageId(),
        role: 'user',
        content: text,
        ts: Date.now(),
      }
      const assistantMsg: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        content: getReminderFallbackReply(),
        ts: Date.now(),
      }
      dailyNudgePromptRef.current = 'dismissed'
      setDailyNudgePrompt('dismissed')
      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setInput('')
      return
    }

    if (dailyNudgePromptRef.current === 'pending') {
      dailyNudgePromptRef.current = 'dismissed'
      setDailyNudgePrompt('dismissed')
    }

    const userMsg: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: text,
      ts: Date.now(),
    }

    const assistantId = createMessageId()
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      ts: Date.now(),
      crisisSupport: crisisTurn,
    }

    const historyWithUser = [...messages, userMsg]
    setMessages([...historyWithUser, assistantMsg])
    setInput('')
    setStreaming(true)

    if (turnIndex.current % 3 === 0) {
      const fact = extractFact(text)
      if (fact) {
        const existing = await getPaMemory()
        await savePaMemory(mergeFactIntoMemory(existing, fact))
      }
    }

    const userMemory = getUserMemory()

    const big5Profile = await getBig5Profile()
    const personaGuidanceBlock = !crisisTurn
      ? buildPersonaGuidance({
          mbtiType: mbtiType!,
          age: userAge,
          nLevel: big5Profile ? getBig5Level(big5Profile.N) : undefined,
          aLevel: big5Profile ? getBig5Level(big5Profile.A) : undefined,
        })
      : null

    const paMemory = await getPaMemory()
    const paMemoryBlock =
      !crisisTurn && paMemory?.facts.length
        ? buildPaMemoryBlock(paMemory)
        : null

    const domainHintBlock = !crisisTurn
      ? await getDomainKBHint(mbtiType!)
      : null

    const { commBlock, kbBlock, situationalBlock } = resolveInjectedContext(
      text,
      mbtiType!,
      crisisTurn,
      userAge,
      'PA',
    )
    const probe = probeInjectedContext(text, mbtiType!, crisisTurn, userAge, 'PA')
    const skipStyle = probe.path === 'protective'
    const hasKBInject =
      commBlock !== null || kbBlock !== null || situationalBlock !== null
    const isProtective = probe.path === 'protective'
    const responseMode =
      crisisTurn || skipStyle
        ? 'solve'
        : detectResponseMode(text, {
            mbtiType: mbtiType!,
            identity,
          })

    const llmMessages = buildLLMMessages(
      historyWithUser,
      persona,
      group,
      mbtiType!,
      archetypeLabel,
      identity,
      text,
      userAge,
      userMemory,
      crisisTurn,
      skipStyle,
      commBlock,
      kbBlock,
      situationalBlock,
      personaGuidanceBlock,
      paMemoryBlock,
      domainHintBlock,
    )

    if (import.meta.env.DEV) {
      const systemContent = llmMessages[0]?.content ?? ''
      console.log('[assistant] system prompt:', systemContent)
      console.log('[assistant] inject:', {
        crisisTurn,
        comm: commBlock !== null,
        kb: kbBlock !== null,
        situational: situationalBlock !== null,
        injectPath: probe.path,
        skipStyle,
      })
    }

    let assistantContent = ''

    try {
      await getLLM().stream(llmMessages, (chunk) => {
        if (!chunk.content) return
        assistantContent += chunk.content
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: m.content + chunk.content }
              : m,
          ),
        )
      })
    } catch {
      assistantContent = LLM_ERROR
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: m.content || LLM_ERROR }
            : m,
        ),
      )
    }

    if (!crisisTurn && !skipStyle && responseMode === 'uncertain') {
      const withFork = appendUncertainForkIfMissing(assistantContent)
      if (withFork !== assistantContent) {
        assistantContent = withFork
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: withFork } : m,
          ),
        )
      }
    }

    updateEmotionalDepth(aiBoundaryState.current, {
      path: probe.path,
      mode: responseMode,
      hasKBInject,
    })
    const displayReply = appendBoundaryPhrase(
      aiBoundaryState.current,
      turnIndex.current,
      {
        replyBody: assistantContent,
        isCrisis: crisisTurn,
        isProtective,
        hasKBInject,
        userMsg: text,
      },
    )

    if (displayReply !== assistantContent) {
      assistantContent = displayReply
    }

    const big5Nudge = appendBig5Nudge(big5NudgeState.current, turnIndex.current, {
      replyBody: assistantContent,
      isCrisis: crisisTurn,
      isProtective,
    })
    if (big5Nudge.body !== assistantContent) {
      assistantContent = big5Nudge.body
    }

    turnIndex.current += 1

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId
          ? {
              ...m,
              content: assistantContent,
              ...(big5Nudge.showNudge ? { big5Nudge: true } : {}),
            }
          : m,
      ),
    )

    setStreaming(false)
    inputRef.current?.focus()

    const completedHistory: ChatMessage[] = [
      ...historyWithUser,
      {
        ...assistantMsg,
        content: assistantContent,
        ...(big5Nudge.showNudge ? { big5Nudge: true } : {}),
      },
    ]
    void ensureSummary(completedHistory).catch(console.error)
  }, [input, streaming, messages, persona, group, mbtiType, archetypeLabel, identity, userAge])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  if (loading || !mbtiType) {
    return (
      <AtmosphericPage
        overlay="heavy"
        fixedHeight
        contentStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageSpinner label="Đang tải..." />
      </AtmosphericPage>
    )
  }

  const lastMessage = messages[messages.length - 1]
  const showTyping =
    streaming &&
    lastMessage?.role === 'assistant' &&
    lastMessage.content === ''
  const crisisActive = hasActiveCrisisSupport(messages)

  return (
    <AtmosphericPage overlay="heavy" fixedHeight>
      <ChatScreenLayout>
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          padding: '16px 16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/home')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '8px',
            padding: 0,
          }}
        >
          ← Trang chủ
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              margin: 0,
              flex: 1,
            }}
          >
            Đồng hành cá nhân
          </h1>
          <Link
            to="/assistant/weekly"
            title="Nhìn lại tuần"
            style={headerIconLink}
            aria-label="Tuần"
          >
            📅
          </Link>
          <Link
            to="/assistant/goals"
            title="Mục tiêu & ghi chú"
            style={headerIconLink}
            aria-label="Mục tiêu"
          >
            🎯
          </Link>
          <Link
            to="/assistant/settings"
            title="Cài đặt"
            style={headerIconLink}
            aria-label="Cài đặt"
          >
            ⚙
          </Link>
          <span
            style={{
              padding: '3px 10px',
              borderRadius: '20px',
              background: 'rgba(168,230,61,0.12)',
              border: '1px solid rgba(168,230,61,0.25)',
              color: '#A8E63D',
              fontSize: '12px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {mbtiType}
          </span>
        </div>

        {/* Group pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '12px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '2px',
          }}
        >
          {GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              disabled={streaming}
              onClick={() => setGroup(g.key)}
              style={{
                ...pillBase,
                ...(group === g.key ? pillActive : {}),
                opacity: streaming ? 0.6 : 1,
              }}
            >
              {g.emoji} {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 8px',
          minHeight: 0,
        }}
      >
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1
          return (
            <div key={msg.id}>
              <ChatBubble
                message={msg}
                showTyping={isLast && showTyping}
              />
              {msg.isOpening && dailyNudgePrompt === 'pending' ? (
                <DailyNudgeButtons
                  onListen={handleDailyNudgeListen}
                  onLater={handleDailyNudgeLater}
                />
              ) : null}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <AssistantSwitcher active="personal" crisisActive={crisisActive} />

      {/* Input */}
      <div
        style={{
          flexShrink: 0,
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(10,10,15,0.95)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-end',
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            placeholder="Nhắn gì đó..."
            rows={1}
            style={{
              flex: 1,
              resize: 'none',
              padding: '12px 14px',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: '14px',
              lineHeight: 1.5,
              fontFamily: 'inherit',
              outline: 'none',
              minHeight: '44px',
              maxHeight: '120px',
            }}
          />
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={streaming || !input.trim()}
            style={{
              flexShrink: 0,
              padding: '12px 18px',
              borderRadius: '14px',
              border: 'none',
              background:
                streaming || !input.trim()
                  ? 'rgba(168,230,61,0.25)'
                  : '#A8E63D',
              color: streaming || !input.trim() ? 'rgba(255,255,255,0.4)' : '#0A0A0F',
              fontSize: '14px',
              fontWeight: 700,
              cursor: streaming || !input.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Gửi
          </button>
        </div>
      </div>
      </ChatScreenLayout>
    </AtmosphericPage>
  )
}
