import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import MaShell from '../components/MaShell'
import ChatScreenLayout from '../components/ChatScreenLayout'
import AssistantSwitcher, {
  hasActiveCrisisSupport,
} from '../components/AssistantSwitcher'
import { useSuppressHomeButton } from '../contexts/HomeNavContext'
import MatchAgeGate from '../components/MatchAgeGate'
import PageSpinner from '../components/PageSpinner'
import {
  createMessageId,
  loadConfig,
  type ChatMessage,
  type GroupKey,
} from '../lib/assistant-storage'
import { probeInjectedContext, resolveInjectedContext } from '../lib/assistant-context'
import { buildMatchSystemContent } from '../lib/build-match-system-prompt'
import { getCrisisSupportText } from '../lib/crisis-detect'
import {
  buildMatchCompatInjectBlock,
  parseUserElement,
} from '../lib/match/build-match-compat-inject'
import { resolveMatchSafetyTurn } from '../lib/match/detect-protective'
import {
  resolvePartnerType,
  shouldPersistPartnerType,
} from '../lib/match/match-partner-detect'
import { applyMatchCrossMentionToReply } from '../lib/match/match-cross-mention'
import {
  clearCrossMentionedPA,
  loadCrossMentionedPA,
  loadMatchSessionPartnerType,
  saveCrossMentionedPA,
  saveMatchSessionPartnerType,
} from '../lib/match/match-session-state'
import type { Element } from '../lib/match/compat-signal'
import type { LLMMessage } from '../lib/llm-client'
import { isMatchAgeGateConfirmed } from '../lib/match-age-gate'
import {
  createMatchUserMessage,
  loadMatchChat,
  saveMatchChat,
} from '../lib/match-assistant-storage'
import { buildMatchContext, ensureMatchSummary } from '../lib/match-memory-service'
import { getCurrentCharacter, getLatestMBTI, getSpiritualResult } from '../db/tncb-db'
import { ageFromBirthDate } from '../lib/user-age'
import {
  appendMatchUncertainForkIfMissing,
  logMatchReplyDiagTurn,
  MATCH_LLM_EMPTY_FALLBACK,
  streamMatchChatReply,
} from '../lib/match/match-llm-output'
import { detectResponseMode, type AssertiveTurbulent } from '../lib/style-adapter'
import { pickBoundaryPhrase } from '../data/ai-boundary-phrases'
import { detectIsolationSignal } from '../lib/isolation-detect'
import {
  getRelationshipScenario,
  type RelationshipScenario,
} from '../lib/match/match-roleplay-scenarios'
import {
  buildMatchRoleplaySystemContent,
  buildMatchRoleplayBlock,
  checkMatchRoleplayExit,
  loadMatchRoleplaySeed,
  clearMatchRoleplaySeed,
  outboundMatchCrisisCheck,
  type MatchRoleplaySeed,
} from '../lib/match/match-roleplay-seed'
import {
  buildBig5MatchNote,
  getBig5Profile,
} from '../lib/match/match-big5-calibrate'

interface MaBoundaryState {
  hasShownIsolation: boolean
  hasShownDepth: boolean
  emotionalDepthCount: number
  turnCount: number
}

function resetMaBoundaryState(state: MaBoundaryState): void {
  state.hasShownIsolation = false
  state.hasShownDepth = false
  state.emotionalDepthCount = 0
  state.turnCount = 0
}

function updateMatchEmotionalDepth(
  state: MaBoundaryState,
  params: {
    crisisTurn: boolean
    protectiveTurn: boolean
    compatMode: string | null
    mode: string
  },
): void {
  const { crisisTurn, protectiveTurn, compatMode, mode } = params

  if (
    crisisTurn ||
    protectiveTurn ||
    compatMode === 'pair' ||
    compatMode === 'block'
  ) {
    state.emotionalDepthCount = 0
    return
  }

  if (mode === 'listen') {
    state.emotionalDepthCount += 1
  } else {
    state.emotionalDepthCount = 0
  }
}

function willMaBoundaryFire(
  state: MaBoundaryState,
  params: {
    isCrisis: boolean
    isProtective: boolean
    compatMode: string | null
    userMsg: string
    nextTurnCount: number
  },
): boolean {
  const { isCrisis, isProtective, compatMode, userMsg, nextTurnCount } = params

  if (isCrisis || isProtective || nextTurnCount < 2) return false

  if (!state.hasShownIsolation && detectIsolationSignal(userMsg)) return true

  const isCompatPath = compatMode === 'pair' || compatMode === 'block'
  if (
    !isCompatPath &&
    !state.hasShownDepth &&
    state.emotionalDepthCount >= 4
  ) {
    return true
  }

  return false
}

function appendBoundaryPhraseMA(
  state: MaBoundaryState,
  params: {
    replyBody: string
    isCrisis: boolean
    isProtective: boolean
    compatMode: string | null
    userMsg: string
  },
): string {
  const { replyBody, isCrisis, isProtective, compatMode, userMsg } = params
  const body = replyBody.trim()
  if (!body || isCrisis || isProtective) return replyBody

  state.turnCount += 1
  if (state.turnCount < 2) return replyBody

  if (!state.hasShownIsolation && detectIsolationSignal(userMsg)) {
    const phrase = pickBoundaryPhrase('isolationSignal')
    state.hasShownIsolation = true
    return `${body}\n\n${phrase}`
  }

  const isCompatPath = compatMode === 'pair' || compatMode === 'block'
  if (
    !isCompatPath &&
    !state.hasShownDepth &&
    state.emotionalDepthCount >= 4
  ) {
    const phrase = pickBoundaryPhrase('sessionDepth')
    state.hasShownDepth = true
    return `${body}\n\n${phrase}`
  }

  return replyBody
}

const QUICK_PROMPTS = [
  'Tôi với một người ENFP có hợp không?',
  'Tôi hợp kiểu người nào nhất?',
  'Người yêu hay im lặng khi cãi — sao đây?',
]

const GROUPS: { key: GroupKey; label: string; emoji: string }[] = [
  { key: 'sincere', label: 'Chân thành', emoji: '🤝' },
  { key: 'maverick', label: 'Người Giời', emoji: '😏' },
]

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
            animation: `matchTypingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes matchTypingDot {
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
  roleplay,
}: {
  message: ChatMessage
  showTyping?: boolean
  roleplay?: boolean
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
            ? roleplay
              ? 'rgba(168,230,61,0.22)'
              : 'rgba(168,230,61,0.18)'
            : roleplay
              ? 'rgba(120,90,200,0.12)'
              : 'rgba(255,255,255,0.06)',
          border: isUser
            ? '1px solid rgba(168,230,61,0.35)'
            : roleplay
              ? '1px solid rgba(140,110,220,0.28)'
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

function buildMatchLLMMessages(
  history: ChatMessage[],
  params: {
    personaCompressed: string
    mbtiType: string
    archetypeLabel: string
    userAge: number | null
    voice: GroupKey
    identity: AssertiveTurbulent
    userMessage: string
    crisisTurn: boolean
    protectiveTurn: boolean
    skipStyle: boolean
    kbBlock: string | null
    situationalBlock: string | null
    compatBlock: string | null
    roleplaySeed?: MatchRoleplaySeed | null
    big5Note?: string | null
  },
): LLMMessage[] {
  const { summaryBlock, recent } = buildMatchContext(history)
  const inRoleplay = Boolean(params.roleplaySeed)

  const systemContent =
    inRoleplay && params.roleplaySeed
      ? buildMatchRoleplaySystemContent({
          personaCompressed: params.personaCompressed,
          voice: params.voice,
          mbtiType: params.mbtiType,
          archetypeLabel: params.archetypeLabel,
          identity: params.identity,
          userMessage: params.userMessage,
          userAge: params.userAge,
          seed: params.roleplaySeed,
        })
      : buildMatchSystemContent({
          personaCompressed: params.personaCompressed,
          voice: params.voice,
          mbtiType: params.mbtiType,
          archetypeLabel: params.archetypeLabel,
          identity: params.identity,
          userMessage: params.userMessage,
          userAge: params.userAge,
          crisisTurn: params.crisisTurn,
          protectiveTurn: params.protectiveTurn,
          skipStyle: params.skipStyle,
          kbBlock: params.kbBlock,
          situationalBlock: params.situationalBlock,
          compatBlock: params.compatBlock,
          summaryBlock: params.protectiveTurn ? null : summaryBlock,
          big5Note: params.big5Note,
        })

  return [
    {
      role: 'system',
      content: systemContent,
    },
    ...recent,
  ]
}

export default function MatchChat() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const boundaryState = useRef<MaBoundaryState>({
    hasShownIsolation: false,
    hasShownDepth: false,
    emotionalDepthCount: 0,
    turnCount: 0,
  })

  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const [ageGatePassed, setAgeGatePassed] = useState(isMatchAgeGateConfirmed)
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [archetypeLabel, setArchetypeLabel] = useState('')
  const [persona, setPersona] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [voice, setVoice] = useState<GroupKey>('sincere')
  const [streaming, setStreaming] = useState(false)
  const [userAge, setUserAge] = useState<number | null>(null)
  const [identity, setIdentity] = useState<AssertiveTurbulent>('A')
  const [userElement, setUserElement] = useState<Element | undefined>(undefined)
  const [sessionPartnerType, setSessionPartnerType] = useState<string | null>(
    () => loadMatchSessionPartnerType(),
  )
  const [crossMentionedPA, setCrossMentionedPA] = useState(
    () => loadCrossMentionedPA(),
  )
  const [big5Note, setBig5Note] = useState<string | null>(null)
  const [roleplaySession, setRoleplaySession] = useState<{
    scenario: RelationshipScenario
    seed: MatchRoleplaySeed
  } | null>(null)
  const [roleplayMessages, setRoleplayMessages] = useState<ChatMessage[]>([])
  const [roleplayExitDebrief, setRoleplayExitDebrief] = useState<string | null>(
    null,
  )
  const roleplayOpeningSet = useRef(false)

  const inRoleplay = roleplaySession !== null

  useSuppressHomeButton(inRoleplay)

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
      setUserElement(parseUserElement(spiritual?.element))
      setVoice(loadConfig().group)

      const big5Profile = await getBig5Profile()
      const note = big5Profile ? buildBig5MatchNote(big5Profile) : ''
      setBig5Note(note.trim() || null)

      const savedMessages = loadMatchChat()
      setMessages(savedMessages)
      if (savedMessages.length === 0) {
        clearCrossMentionedPA()
        setCrossMentionedPA(false)
        resetMaBoundaryState(boundaryState.current)
      }

      const rpSeed = loadMatchRoleplaySeed()
      if (rpSeed) {
        const scenario = getRelationshipScenario(rpSeed.scenarioId)
        if (scenario) {
          setRoleplaySession({ scenario, seed: rpSeed })
          resetMaBoundaryState(boundaryState.current)
          clearCrossMentionedPA()
          setCrossMentionedPA(false)
        }
      }

      setInitialized(true)
      setLoading(false)
    }
    void init()
  }, [navigate])

  useEffect(() => {
    if (
      !initialized ||
      !roleplaySession?.scenario.openingLine ||
      roleplayOpeningSet.current
    ) {
      return
    }
    roleplayOpeningSet.current = true
    setRoleplayMessages([
      {
        id: createMessageId(),
        role: 'assistant',
        content: roleplaySession.scenario.openingLine,
        ts: Date.now(),
      },
    ])
  }, [initialized, roleplaySession])

  useEffect(() => {
    if (!initialized || inRoleplay) return
    saveMatchChat(messages)
  }, [messages, initialized, inRoleplay])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, roleplayMessages, roleplayExitDebrief, streaming])

  const exitRoleplay = useCallback((opts?: { debrief?: string | null }) => {
    clearMatchRoleplaySeed()
    setRoleplaySession(null)
    setRoleplayMessages([])
    roleplayOpeningSet.current = false
    resetMaBoundaryState(boundaryState.current)
    clearCrossMentionedPA()
    setCrossMentionedPA(false)
    if (opts?.debrief) {
      setRoleplayExitDebrief(opts.debrief)
    }
  }, [])

  const handleSend = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim()
      if (!text || streaming || !mbtiType) return

      if (roleplayExitDebrief) {
        setRoleplayExitDebrief(null)
      }

      let usingRoleplay = inRoleplay
      const activeScenario = roleplaySession?.scenario

      if (
        usingRoleplay &&
        activeScenario &&
        checkMatchRoleplayExit(text, activeScenario)
      ) {
        exitRoleplay({ debrief: activeScenario.debrief })
        return
      }

      const priorMessages = usingRoleplay ? roleplayMessages : messages
      const recentUserTexts = priorMessages
        .filter((m) => m.role === 'user')
        .map((m) => m.content)

      let { crisisTurn, protectiveTurn } = resolveMatchSafetyTurn(text, {
        recentUserTexts,
      })

      if (usingRoleplay && (crisisTurn || protectiveTurn)) {
        exitRoleplay()
        usingRoleplay = false
      }

      const chatMessages = usingRoleplay ? roleplayMessages : messages
      const setChatMessages = usingRoleplay ? setRoleplayMessages : setMessages

      const userMsg = createMatchUserMessage(text)
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
        usingRoleplay && roleplaySession
          ? buildMatchRoleplayBlock(roleplaySession.seed)
          : null

      let kbBlock: string | null = null
      let situationalBlock: string | null = null
      let compatBlock: string | null = null
      let compatMode: string | null = null
      let partnerTypeUsed: string | null = null
      let probePath = 'none' as string

      if (!roleplayBlock && !crisisTurn && !protectiveTurn) {
        const recentForPartner = historyWithUser
          .filter((m) => m.role === 'user')
          .slice(-6)
          .map((m) => m.content)

        const partnerType = resolvePartnerType(
          recentForPartner,
          mbtiType,
          sessionPartnerType,
        )
        partnerTypeUsed = partnerType

        const persistCandidate = shouldPersistPartnerType(
          recentForPartner,
          mbtiType,
        )
        if (persistCandidate && persistCandidate !== sessionPartnerType) {
          saveMatchSessionPartnerType(persistCandidate)
          setSessionPartnerType(persistCandidate)
        }

        if (partnerType) {
          const { block, meta } = buildMatchCompatInjectBlock({
            userType: mbtiType,
            partnerType,
            userElement,
          })
          compatBlock = block
          compatMode = meta.mode
        }

        const resolved = resolveInjectedContext(
          text,
          mbtiType,
          crisisTurn,
          userAge,
          'MA',
        )
        kbBlock = resolved.kbBlock
        situationalBlock = resolved.situationalBlock
        probePath = probeInjectedContext(
          text,
          mbtiType,
          crisisTurn,
          userAge,
          'MA',
        ).path
      } else if (crisisTurn) {
        probePath = 'crisis'
      } else if (protectiveTurn) {
        probePath = 'protective'
      }

      const skipStyle =
        crisisTurn ||
        protectiveTurn ||
        probePath === 'protective' ||
        Boolean(roleplayBlock)

      const llmMessages = buildMatchLLMMessages(historyWithUser, {
        personaCompressed: persona,
        mbtiType,
        archetypeLabel,
        userAge,
        voice,
        identity,
        userMessage: text,
        crisisTurn,
        protectiveTurn,
        skipStyle,
        kbBlock: roleplayBlock ? null : kbBlock,
        situationalBlock: roleplayBlock ? null : situationalBlock,
        compatBlock: roleplayBlock ? null : compatBlock,
        roleplaySeed: usingRoleplay ? roleplaySession?.seed ?? null : null,
        big5Note: roleplayBlock ? null : big5Note,
      })

      if (import.meta.env.DEV) {
        console.log('[match-chat] safety:', {
          crisisTurn,
          protectiveTurn,
          path: probePath,
          kb: kbBlock !== null,
          situational: situationalBlock !== null,
          compat: compatBlock !== null,
          compatMode,
          partnerType: partnerTypeUsed,
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

      const streamResult = await streamMatchChatReply(llmMessages, {
        crisisTurn,
        protectiveTurn,
        onPartial: (visible) => {
          patchAssistant(visible)
        },
      })

      if (streamResult.empty) {
        assistantContent = MATCH_LLM_EMPTY_FALLBACK
        if (import.meta.env.DEV) {
          console.warn('[match-chat] empty model output', {
            rawPreview: streamResult.raw.slice(0, 300),
          })
        }
        patchAssistant(MATCH_LLM_EMPTY_FALLBACK)
      } else {
        assistantContent = streamResult.reply
        patchAssistant(assistantContent)
      }

      let responseModeForDiag = '—'
      const beforeForkContent = assistantContent

      if (
        !roleplayBlock &&
        !crisisTurn &&
        !protectiveTurn &&
        !skipStyle &&
        assistantContent
      ) {
        const mode = detectResponseMode(text, { mbtiType, identity })
        responseModeForDiag = mode
        if (mode === 'uncertain') {
          const withFork = appendMatchUncertainForkIfMissing(assistantContent)
          if (withFork !== assistantContent) {
            assistantContent = withFork
            patchAssistant(withFork)
          }
        }
      } else if (!roleplayBlock && !crisisTurn && !protectiveTurn && !skipStyle) {
        responseModeForDiag = detectResponseMode(text, { mbtiType, identity })
      }

      if (roleplayBlock && outboundMatchCrisisCheck(assistantContent)) {
        exitRoleplay()
        assistantContent =
          'Mình nghe thấy điều này quan trọng — hãy dành chút thời gian cho bản thân.'
        setMessages((prev) => [
          ...prev,
          userMsg,
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

      const matchPath =
        crisisTurn
          ? 'crisis'
          : protectiveTurn
            ? 'protective'
            : compatMode === 'pair'
              ? 'normal-compat'
              : compatMode === 'block'
                ? 'normal-block'
                : probePath === 'none'
                  ? 'normal'
                  : `normal+${probePath}`

      if (!roleplayBlock) {
        updateMatchEmotionalDepth(boundaryState.current, {
          crisisTurn,
          protectiveTurn,
          compatMode,
          mode: responseModeForDiag,
        })

        const nextTurnCount = boundaryState.current.turnCount + 1
        const skipCrossForBoundary = willMaBoundaryFire(boundaryState.current, {
          isCrisis: crisisTurn,
          isProtective: protectiveTurn,
          compatMode,
          userMsg: text,
          nextTurnCount,
        })

        if (assistantContent.trim() && !skipCrossForBoundary) {
          const cross = applyMatchCrossMentionToReply(assistantContent, text, {
            path: matchPath,
            compatMode,
            crisisTurn,
            protectiveTurn,
            crossMentionedPA,
            recentUserTexts,
          })
          if (cross.crossMentionApplied) {
            assistantContent = cross.reply
            setCrossMentionedPA(true)
            saveCrossMentionedPA(true)
            patchAssistant(cross.reply)
          }
        }

        if (assistantContent.trim()) {
          const withBoundary = appendBoundaryPhraseMA(boundaryState.current, {
            replyBody: assistantContent,
            isCrisis: crisisTurn,
            isProtective: protectiveTurn,
            compatMode,
            userMsg: text,
          })
          if (withBoundary !== assistantContent) {
            assistantContent = withBoundary
            patchAssistant(withBoundary)
          }
        }
      }

      if (import.meta.env.DEV && !crisisTurn && !protectiveTurn && !roleplayBlock) {
        logMatchReplyDiagTurn({
          userQ: text,
          raw: streamResult.raw,
          afterStrip: streamResult.afterStrip,
          beforeFork: beforeForkContent,
          final: assistantContent,
          responseMode: responseModeForDiag,
        })
      }

      setStreaming(false)
      inputRef.current?.focus()

      if (!roleplayBlock) {
        const completedHistory: ChatMessage[] = [
          ...historyWithUser,
          { ...assistantMsg, content: assistantContent },
        ]
        void ensureMatchSummary(completedHistory).catch(console.error)
      }
    },
    [
      input,
      streaming,
      messages,
      roleplayMessages,
      roleplaySession,
      inRoleplay,
      roleplayExitDebrief,
      mbtiType,
      archetypeLabel,
      persona,
      userAge,
      voice,
      identity,
      crossMentionedPA,
      sessionPartnerType,
      userElement,
      exitRoleplay,
      big5Note,
    ],
  )

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  if (loading || !mbtiType) {
    return (
      <MaShell scrollable={false}>
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
      </MaShell>
    )
  }

  if (!ageGatePassed) {
    return (
      <MatchAgeGate
        onConfirm={() => setAgeGatePassed(true)}
        onBack={() => navigate('/match')}
      />
    )
  }

  const displayMessages = inRoleplay ? roleplayMessages : messages
  const showQuickPrompts =
    !inRoleplay && messages.length === 0 && !streaming
  const lastMessage = displayMessages[displayMessages.length - 1]
  const showTyping =
    streaming &&
    lastMessage?.role === 'assistant' &&
    lastMessage.content === ''
  const crisisActive = hasActiveCrisisSupport(displayMessages)

  return (
    <MaShell scrollable={false}>
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
            onClick={() => navigate('/match')}
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
            ← Tâm tính
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
              Đồng hành tâm tính
            </h1>
          </div>
        <p
          style={{
            margin: '8px 0 0',
            textAlign: 'center',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {mbtiType} · {archetypeLabel}
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

      {inRoleplay && roleplaySession ? (
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '10px 16px',
            borderBottom: '1px solid rgba(140,110,220,0.25)',
            background: 'rgba(120,90,200,0.10)',
          }}
        >
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)' }}>
            🎭 Đang thực hành: {roleplaySession.scenario.title}
          </span>
          <button
            type="button"
            onClick={() =>
              exitRoleplay({ debrief: roleplaySession.scenario.debrief })
            }
            style={{
              flexShrink: 0,
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.75)',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Kết thúc
          </button>
        </div>
      ) : null}

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 16px 8px',
          minHeight: 0,
          scrollbarWidth: 'none',
        }}
      >
        {roleplayExitDebrief ? (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(140,110,220,0.3)',
              background: 'rgba(120,90,200,0.08)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginBottom: '6px' }}>
              Gợi ý phản chiếu
            </div>
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
              roleplay={inRoleplay}
            />
          )
        })}
        <div ref={bottomRef} />
      </div>

      <AssistantSwitcher active="match" crisisActive={crisisActive} />

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
                ? 'Nói chuyện với đối phương... (gõ "thoát" để kết thúc)'
                : 'Hỏi về tương hợp, quan hệ, người bạn đang nghĩ tới...'
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
    </MaShell>
  )
}
