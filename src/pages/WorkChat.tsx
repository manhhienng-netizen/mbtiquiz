import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AssistantSwitcher, {
  hasActiveCrisisSupport,
} from '../components/AssistantSwitcher'
import WaShell from '../components/WaShell'
import ChatScreenLayout from '../components/ChatScreenLayout'
import WorkSetupForm from '../components/WorkSetupForm'
import PageSpinner from '../components/PageSpinner'
import {
  createMessageId,
  loadConfig,
  type ChatMessage,
  type GroupKey,
} from '../lib/assistant-storage'
import {
  probeInjectedContext,
  resolveInjectedContext,
  type InjectPath,
} from '../lib/assistant-context'
import { pickBoundaryPhrase } from '../data/ai-boundary-phrases'
import { buildWorkSystemPrompt } from '../lib/build-work-system-prompt'
import { detectCrisis, getCrisisSupportText } from '../lib/crisis-detect'
import { getIsolationPhrase } from '../lib/isolation-detect'
import {
  createWorkUserMessage,
  getWorkMessageCount,
  loadWorkChat,
  saveWorkChat,
} from '../lib/work-assistant-storage'
import {
  initWorkScopeState,
  resolveWorkScopeAppend,
  type WorkScopeState,
} from '../lib/work/work-scope-detect'
import { buildWorkContext, ensureWorkSummary } from '../lib/work-memory-service'
import {
  defaultWorkUserId,
  getLatestMBTI,
  getSpiritualResult,
  getWorkProfile,
  WORK_LEVEL_LABELS,
  type WorkProfile,
} from '../db/tncb-db'
import { loadDiscProfile } from '../lib/disc-db-helper'
import { buildCWorkNote, getBig5ForWork } from '../lib/work-big5-calibrate'
import { ageFromBirthDate } from '../lib/user-age'
import {
  appendUncertainForkIfMissing,
  detectResponseMode,
  type AssertiveTurbulent,
} from '../lib/style-adapter'
import { getLLM, type LLMMessage } from '../lib/llm-client'
import { WORK_CHAT_STREAM_MAX_TOKENS } from '../lib/llm'
import {
  buildRoleplayBlock,
  checkExitTrigger,
  clearRoleplaySeed,
  loadRoleplaySeed,
  outboundCrisisCheck,
  type RoleplaySeed,
} from '../lib/roleplay-seed'
import { sanitizeWorkChatReply } from '../lib/work-reply-sanitize'
import type { DiscProfile } from '../lib/disc-scoring'
import { useSuppressHomeButton } from '../contexts/HomeNavContext'

const QUICK_PROMPTS = [
  'Đồng nghiệp hay cắt ngang tôi trong họp',
  'Sếp giao việc mà không rõ kỳ vọng',
  'Tôi muốn xin tăng lương',
]

const BIG5_NUDGE_KEY = 'wa_big5_nudge_shown'

const GROUPS: { key: GroupKey; label: string; emoji: string }[] = [
  { key: 'sincere', label: 'Chân thành', emoji: '🤝' },
  { key: 'maverick', label: 'Người Giời', emoji: '😏' },
]

const LLM_ERROR =
  'Mình chưa kết nối được, kiểm tra Ollama đang chạy nhé'

const LLM_EMPTY_FALLBACK =
  'Mình chưa rõ ý, bạn nói thêm chút nhé?'

interface WorkAiBoundaryState {
  hasShownIsolation: boolean
  hasShownDepth: boolean
  emotionalDepthCount: number
  anyBoundaryShown: boolean
}

function updateEmotionalDepth(
  state: WorkAiBoundaryState,
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

function appendBoundaryPhraseWA(
  state: WorkAiBoundaryState,
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
            animation: `workTypingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes workTypingDot {
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

function formatSubHeader(
  mbtiType: string,
  workProfile: WorkProfile | null | undefined,
): string {
  if (!workProfile?.occupation) return mbtiType
  const levelLabel = WORK_LEVEL_LABELS[workProfile.level]
  return `${workProfile.occupation} · ${levelLabel} · ${mbtiType}`
}

function buildWorkLLMMessages(
  history: ChatMessage[],
  params: {
    mbtiType: string
    occupation: string | null
    level: WorkProfile['level'] | null
    userAge: number | null
    voice: GroupKey
    identity: AssertiveTurbulent
    userMessage: string
    crisisTurn: boolean
    skipStyle: boolean
    commBlock: string | null
    kbBlock: string | null
    situationalBlock: string | null
    roleplayBlock?: string | null
    discProfile?: DiscProfile | null
    cNote?: string | null
  },
): LLMMessage[] {
  const { summaryBlock, recent } = buildWorkContext(history)
  const priorTurnCount = Math.max(0, recent.length - 1)
  const inRoleplay = Boolean(params.roleplayBlock)

  const systemContent = buildWorkSystemPrompt({
    mbtiType: params.mbtiType,
    occupation: params.occupation,
    level: params.level,
    age: params.userAge,
    voice: params.voice,
    identity: params.identity,
    userMessage: params.userMessage,
    crisisTurn: params.crisisTurn,
    skipStyle: params.skipStyle || inRoleplay,
    commBlock: inRoleplay ? null : params.commBlock,
    kbBlock: inRoleplay ? null : params.kbBlock,
    situationalBlock: inRoleplay ? null : params.situationalBlock,
    summaryBlock: inRoleplay ? null : summaryBlock,
    priorTurnCount,
    roleplayBlock: params.roleplayBlock ?? null,
    skipKBInject: inRoleplay,
    discProfile: inRoleplay ? null : params.discProfile ?? null,
    cNote: inRoleplay ? null : params.cNote ?? null,
  })

  return [{ role: 'system', content: systemContent }, ...recent]
}

export default function WorkChat() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const aiBoundaryState = useRef<WorkAiBoundaryState>({
    hasShownIsolation: false,
    hasShownDepth: false,
    emotionalDepthCount: 0,
    anyBoundaryShown: false,
  })
  const turnIndex = useRef(0)
  const [scopeState, setScopeState] = useState<WorkScopeState>(initWorkScopeState())

  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [identity, setIdentity] = useState<AssertiveTurbulent>('A')
  const [workProfile, setWorkProfile] = useState<WorkProfile | null | undefined>(
    undefined,
  )
  const [discProfile, setDiscProfile] = useState<DiscProfile | null>(null)
  const [cNote, setCNote] = useState<string | null>(null)
  const [hasBig5, setHasBig5] = useState<boolean | null>(null)
  const [showBig5Nudge, setShowBig5Nudge] = useState(false)
  const [setupSkipped, setSetupSkipped] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [voice, setVoice] = useState<GroupKey>('sincere')
  const [streaming, setStreaming] = useState(false)
  const [userAge, setUserAge] = useState<number | null>(null)
  const [roleplaySeed, setRoleplaySeed] = useState<RoleplaySeed | null>(null)
  const [roleplayMessages, setRoleplayMessages] = useState<ChatMessage[]>([])
  const [roleplayExitDebrief, setRoleplayExitDebrief] = useState<string | null>(null)
  const roleplayOpeningSet = useRef(false)

  const inRoleplay = roleplaySeed !== null

  useSuppressHomeButton(inRoleplay)

  useEffect(() => {
    async function init() {
      const mbti = await getLatestMBTI()
      if (!mbti?.mbtiType) {
        navigate('/quiz', { replace: true })
        return
      }
      const spiritual = await getSpiritualResult()
      const profile = await getWorkProfile(defaultWorkUserId())
      const [disc, big5] = await Promise.all([loadDiscProfile(), getBig5ForWork()])
      setUserAge(ageFromBirthDate(spiritual?.birthDate))
      setMbtiType(mbti.mbtiType)
      setIdentity(mbti.identity ?? 'A')
      setWorkProfile(profile ?? null)
      setDiscProfile(disc)
      setHasBig5(big5 !== null)
      setCNote(buildCWorkNote(big5?.C))
      setVoice(loadConfig().group)
      setMessages(loadWorkChat())

      const seed = loadRoleplaySeed()
      if (seed) {
        setRoleplaySeed(seed)
        setScopeState(initWorkScopeState())
      }

      setInitialized(true)
      setLoading(false)
    }
    void init()
  }, [navigate])

  useEffect(() => {
    if (!initialized || !roleplaySeed?.openingLine || roleplayOpeningSet.current) {
      return
    }
    roleplayOpeningSet.current = true
    setRoleplayMessages([
      {
        id: createMessageId(),
        role: 'assistant',
        content: roleplaySeed.openingLine,
        ts: Date.now(),
      },
    ])
  }, [initialized, roleplaySeed])

  useEffect(() => {
    if (!initialized || roleplaySeed) return
    saveWorkChat(messages)
  }, [messages, initialized, roleplaySeed])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, roleplayMessages, roleplayExitDebrief, streaming, showBig5Nudge])

  useEffect(() => {
    if (inRoleplay || hasBig5 !== false || messages.length < 1) return
    const lastMsg = messages[messages.length - 1]
    if (lastMsg?.role !== 'assistant' || !lastMsg.content) return
    if (sessionStorage.getItem(BIG5_NUDGE_KEY)) return
    setShowBig5Nudge(true)
    sessionStorage.setItem(BIG5_NUDGE_KEY, '1')
  }, [messages, hasBig5, inRoleplay])

  const exitRoleplay = useCallback(
    (opts?: { debrief?: string | null; skipNavigate?: boolean }) => {
      const route = roleplaySeed?.exitRoute ?? '/work/manage'
      clearRoleplaySeed()
      setRoleplaySeed(null)
      setRoleplayMessages([])
      roleplayOpeningSet.current = false
      setScopeState(initWorkScopeState())
      if (opts?.debrief) {
        setRoleplayExitDebrief(opts.debrief)
      }
      if (!opts?.skipNavigate) {
        navigate(route)
      }
    },
    [roleplaySeed, navigate],
  )

  const handleSend = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim()
      if (!text || streaming || !mbtiType) return

      if (roleplayExitDebrief) {
        setRoleplayExitDebrief(null)
      }

      let usingRoleplay = inRoleplay
      const exitAfterReply = usingRoleplay && checkExitTrigger(text)

      const crisisTurn = detectCrisis(text)
      if (usingRoleplay && crisisTurn) {
        exitRoleplay({ skipNavigate: true })
        usingRoleplay = false
      }

      const chatMessages = usingRoleplay ? roleplayMessages : messages
      const setChatMessages = usingRoleplay ? setRoleplayMessages : setMessages

      const userMsg = createWorkUserMessage(text)
      const assistantId = createMessageId()
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: 'assistant',
        content: '',
        ts: Date.now(),
        crisisSupport: crisisTurn,
      }

      const historyWithUser = [...chatMessages, userMsg]
      setChatMessages([...historyWithUser, assistantMsg])
      setInput('')
      setStreaming(true)

      const roleplayBlock =
        usingRoleplay && roleplaySeed ? buildRoleplayBlock(roleplaySeed) : null

      const injectContext = roleplayBlock
        ? { commBlock: null, kbBlock: null, situationalBlock: null }
        : resolveInjectedContext(text, mbtiType, crisisTurn, userAge, 'WA')

      const { commBlock, kbBlock, situationalBlock } = injectContext
      const probe = roleplayBlock
        ? { path: 'none' as const }
        : probeInjectedContext(text, mbtiType, crisisTurn, userAge, 'WA')
      const skipStyle = crisisTurn || probe.path === 'protective' || Boolean(roleplayBlock)
      const hasKBInject =
        !roleplayBlock &&
        (commBlock !== null || kbBlock !== null || situationalBlock !== null)
      const isProtective = probe.path === 'protective'
      const responseMode =
        crisisTurn || skipStyle
          ? 'solve'
          : detectResponseMode(text, { mbtiType, identity })

      const llmMessages = buildWorkLLMMessages(historyWithUser, {
        mbtiType,
        occupation: workProfile?.occupation ?? null,
        level: workProfile?.level ?? null,
        userAge,
        voice,
        identity,
        userMessage: text,
        crisisTurn,
        skipStyle,
        commBlock,
        kbBlock,
        situationalBlock,
        roleplayBlock,
        discProfile,
        cNote,
      })

      if (import.meta.env.DEV) {
        console.log('[work-chat] inject:', {
          crisisTurn,
          path: probe.path,
          comm: commBlock !== null,
          kb: kbBlock !== null,
          situational: situationalBlock !== null,
          skipStyle,
          roleplay: Boolean(roleplayBlock),
        })
      }

      const patchAssistant = (content: string) => {
        setChatMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content } : m)),
        )
      }

      let assistantContent = ''

      try {
        for (let attempt = 0; attempt < 2; attempt++) {
          assistantContent = ''
          await getLLM().stream(
            llmMessages,
            (chunk) => {
              if (!chunk.content) return
              assistantContent += chunk.content
              setChatMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + chunk.content }
                    : m,
                ),
              )
            },
            { maxTokens: WORK_CHAT_STREAM_MAX_TOKENS },
          )
          if (assistantContent.trim()) break
        }
        if (!assistantContent.trim()) {
          assistantContent = LLM_EMPTY_FALLBACK
          patchAssistant(LLM_EMPTY_FALLBACK)
        }
      } catch {
        assistantContent = LLM_ERROR
        patchAssistant(assistantContent || LLM_ERROR)
      }

      if (!roleplayBlock && !crisisTurn && !skipStyle && responseMode === 'uncertain') {
        const recentAssistantReplies = chatMessages
          .filter((m) => m.role === 'assistant' && m.content.trim())
          .map((m) => m.content)
          .slice(-3)
        const withFork = appendUncertainForkIfMissing(assistantContent, {
          recentAssistantReplies,
        })
        if (withFork !== assistantContent) {
          assistantContent = withFork
          patchAssistant(withFork)
        }
      }

      const sanitized = sanitizeWorkChatReply(assistantContent)
      if (sanitized !== assistantContent) {
        assistantContent = sanitized
        patchAssistant(sanitized)
      }

      if (roleplayBlock && outboundCrisisCheck(assistantContent)) {
        exitRoleplay({ skipNavigate: true })
        setRoleplayMessages([])
        assistantContent =
          'Mình nghe thấy điều này quan trọng — hãy dành chút thời gian cho bản thân.'
        setMessages((prev) => [
          ...prev,
          createWorkUserMessage(text),
          {
            id: assistantId,
            role: 'assistant',
            content: assistantContent,
            ts: Date.now(),
            crisisSupport: true,
          },
        ])
        setStreaming(false)
        inputRef.current?.focus()
        return
      }

      if (!roleplayBlock) {
        const turnIdx = messages.filter((m) => m.role === 'user').length
        const workMsgCount = getWorkMessageCount(messages)
        const isProtectiveOrCrisis = crisisTurn || isProtective
        const recentAssistantReplies = messages
          .filter((m) => m.role === 'assistant' && m.content.trim())
          .map((m) => m.content)

        const scopeResult = resolveWorkScopeAppend(assistantContent, text, scopeState, {
          turnIndex: turnIdx,
          workMessageCount: workMsgCount,
          isProtectiveOrCrisis,
          isCrisis: crisisTurn,
          recentAssistantReplies,
        })
        if (scopeResult.reply !== assistantContent) {
          assistantContent = scopeResult.reply
          patchAssistant(scopeResult.reply)
        }
        setScopeState(scopeResult.state)
      }

      if (!roleplayBlock) {
        updateEmotionalDepth(aiBoundaryState.current, {
          path: probe.path,
          mode: responseMode,
          hasKBInject,
        })
        const displayReply = appendBoundaryPhraseWA(
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
        turnIndex.current += 1

        if (displayReply !== assistantContent) {
          assistantContent = displayReply
          patchAssistant(displayReply)
        }
      }

      setStreaming(false)
      inputRef.current?.focus()

      if (exitAfterReply && roleplayBlock) {
        exitRoleplay({ debrief: assistantContent })
        return
      }

      if (!roleplayBlock) {
        const completedHistory: ChatMessage[] = [
          ...historyWithUser,
          { ...assistantMsg, content: assistantContent },
        ]
        void ensureWorkSummary(completedHistory).catch(console.error)
      }
    },
    [
      input,
      streaming,
      messages,
      roleplayMessages,
      roleplaySeed,
      inRoleplay,
      roleplayExitDebrief,
      mbtiType,
      identity,
      workProfile,
      discProfile,
      cNote,
      userAge,
      voice,
      scopeState,
      exitRoleplay,
    ],
  )

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  async function handleSetupComplete() {
    const [profile, disc] = await Promise.all([
      getWorkProfile(defaultWorkUserId()),
      loadDiscProfile(),
    ])
    setWorkProfile(profile ?? null)
    setDiscProfile(disc)
  }

  if (loading || !mbtiType) {
    return (
      <WaShell scrollable={false}>
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PageSpinner label="Đang tải..." />
        </div>
      </WaShell>
    )
  }

  const needsSetup = workProfile === null && !setupSkipped && !inRoleplay
  if (needsSetup) {
    return (
      <WorkSetupForm
        onComplete={() => void handleSetupComplete()}
        onSkip={() => setSetupSkipped(true)}
      />
    )
  }

  const displayMessages = inRoleplay ? roleplayMessages : messages
  const showQuickPrompts = !inRoleplay && messages.length === 0 && !streaming
  const lastMessage = displayMessages[displayMessages.length - 1]
  const showTyping =
    streaming &&
    lastMessage?.role === 'assistant' &&
    lastMessage.content === ''
  const crisisActive = hasActiveCrisisSupport(displayMessages)

  return (
    <WaShell scrollable={false}>
      <ChatScreenLayout>
        <div
          style={{
            flexShrink: 0,
            padding: '16px 16px 12px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/work')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '8px',
              padding: 0,
              fontFamily: 'inherit',
            }}
          >
            ← Làm việc
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1
              style={{
                fontSize: '18px',
                fontWeight: 700,
                margin: 0,
                flex: 1,
                textAlign: 'center',
              }}
            >
              Đồng hành công việc
            </h1>
            <Link
              to="/work/settings"
              title="Cài đặt"
              style={headerIconLink}
              aria-label="Cài đặt"
            >
              ⚙
            </Link>
          </div>
          <p
            style={{
              margin: '8px 0 0',
              textAlign: 'center',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {formatSubHeader(mbtiType, workProfile)}
          </p>

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
                onClick={() => setVoice(g.key)}
                style={{
                  ...pillBase,
                  ...(voice === g.key ? pillActive : {}),
                  opacity: streaming ? 0.6 : 1,
                }}
              >
                {g.emoji} {g.label}
              </button>
            ))}
          </div>
        </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 8px',
          minHeight: 0,
          scrollbarWidth: 'none',
        }}
      >
        {inRoleplay && roleplaySeed ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              marginBottom: '12px',
              padding: '10px 12px',
              borderRadius: '12px',
              border: '1px solid rgba(168,230,61,0.25)',
              background: 'rgba(168,230,61,0.06)',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 600,
                color: '#A8E63D',
                lineHeight: 1.45,
              }}
            >
              🎭 Đang thực hành · {roleplaySeed.employeeName}
              {roleplaySeed.employeeType ? ` (${roleplaySeed.employeeType})` : ''}
            </p>
            <button
              type="button"
              onClick={() => exitRoleplay()}
              style={{
                flexShrink: 0,
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Kết thúc
            </button>
          </div>
        ) : null}

        {roleplayExitDebrief ? (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(168,230,61,0.25)',
              background: 'rgba(168,230,61,0.08)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.82)',
              whiteSpace: 'pre-wrap',
            }}
          >
            {roleplayExitDebrief}
          </div>
        ) : null}

        {showQuickPrompts && (
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.45)',
                margin: '0 0 12px',
              }}
            >
              Gợi ý để bắt đầu
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={streaming}
                  onClick={() => void handleSend(prompt)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    border: '1px solid rgba(168,230,61,0.25)',
                    background: 'rgba(168,230,61,0.06)',
                    color: 'rgba(255,255,255,0.82)',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    cursor: streaming ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    opacity: streaming ? 0.6 : 1,
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {displayMessages.map((msg, i) => {
          const isLast = i === displayMessages.length - 1
          return (
            <ChatBubble
              key={msg.id}
              message={msg}
              showTyping={isLast && showTyping}
            />
          )
        })}
        <div ref={bottomRef} />
      </div>

      {!inRoleplay && showBig5Nudge ? (
        <div
          style={{
            flexShrink: 0,
            margin: '0 16px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <span
            style={{
              flex: 1,
              fontSize: '12px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Làm Big Five (5 phút) giúp mình gợi ý career path phù hợp hơn với phong
            cách của bạn
          </span>
          <Link
            to="/big5"
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#A8E63D',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Làm ngay →
          </Link>
          <button
            type="button"
            onClick={() => setShowBig5Nudge(false)}
            aria-label="Đóng"
            style={{
              marginLeft: '4px',
              padding: 0,
              border: 'none',
              background: 'none',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            ✕
          </button>
        </div>
      ) : null}

      <AssistantSwitcher active="work" crisisActive={crisisActive} />

      <div
        style={{
          flexShrink: 0,
          padding: '12px 16px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(10,10,15,0.95)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            placeholder={
              inRoleplay
                ? 'Nói chuyện với nhân viên...'
                : 'Hỏi về công việc, giao tiếp, deal lương...'
            }
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
              color:
                streaming || !input.trim()
                  ? 'rgba(255,255,255,0.4)'
                  : '#0A0A0F',
              fontSize: '14px',
              fontWeight: 700,
              cursor:
                streaming || !input.trim() ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Gửi
          </button>
        </div>
      </div>
      </ChatScreenLayout>
    </WaShell>
  )
}
