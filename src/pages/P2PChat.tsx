import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { RealtimeChannel } from '@supabase/supabase-js'
import AtmosphericPage from '../components/AtmosphericPage'
import { useP2PAuth } from '../context/P2PAuthContext'
import {
  getMessages,
  sendMessage,
  markAsRead,
  subscribeToMessages,
  unsubscribeChannel,
  P2P_DEMO_MESSAGES_EVENT,
  type ChatMessage,
} from '../lib/p2p/chat-service'
import { getMyMatches } from '../lib/p2p/match-service'
import { getSupabaseClient, hasSupabaseEnv } from '../lib/p2p/supabase-client'
import ReportModal from '../components/p2p/ReportModal'
import {
  unmatchAndBlock,
  reportUser,
  type ReportReason,
} from '../lib/p2p/safety-service'
import { readDexiePersona } from '../lib/p2p/persona-sync'
import { getBig5Profile } from '../db/tncb-db'
import {
  getRandomOpeningQuestions,
  getRandomBridgeQuestions,
  DEFAULT_OPENING_QUESTIONS,
} from '../lib/p2p/opening-questions'
import { getCard } from '../lib/p2p/relationship-diagnostic'
import { calibrateChips, big5ProfileToNA, type Big5NA } from '../lib/p2p/chip-calibration'
import type { MBTIType } from '../data/quiz-types'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

function isMbtiType(value: string): value is MBTIType {
  return /^[IE][NS][FT][JP]$/.test(value)
}

export default function P2PChat() {
  const { matchId } = useParams<{ matchId: string }>()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useP2PAuth()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [otherName, setOtherName] = useState('...')
  const [otherPhoto, setOtherPhoto] = useState('')
  const [otherMbti, setOtherMbti] = useState('')
  const [otherUserId, setOtherUserId] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [myMbti, setMyMbti] = useState('')
  const [myBig5NA, setMyBig5NA] = useState<Big5NA | null>(null)
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([])
  const [depthCueShown, setDepthCueShown] = useState(false)
  const [depthCueDismissed, setDepthCueDismissed] = useState(false)
  const [depthCueQuestion, setDepthCueQuestion] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [myReceiptsEnabled, setMyReceiptsEnabled] = useState(true)
  const [otherReceiptsEnabled, setOtherReceiptsEnabled] = useState(true)

  const bottomRef = useRef<HTMLDivElement>(null)
  const channelRef = useRef<RealtimeChannel | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const usedQuestionIndices = useRef<Set<number>>(new Set())
  const filterRef = useRef<typeof import('../services/profanity-filter') | null>(null)
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (!authLoading && !user) navigate('/profile/setup')
  }, [authLoading, user, navigate])

  useEffect(() => {
    void import('../services/profanity-filter').then((mod) => {
      filterRef.current = mod
    })
  }, [])

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToastMsg(msg)
    toastTimerRef.current = setTimeout(() => setToastMsg(null), 3000)
  }, [])

  const showReadReceipts = myReceiptsEnabled && otherReceiptsEnabled

  const handleEmojiSelect = useCallback((emoji: { native: string }) => {
    setInput((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!showEmojiPicker) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.emoji-picker-container')) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showEmojiPicker])

  useEffect(() => {
    if (!user?.id) return

    if (!hasSupabaseEnv) {
      const profile = JSON.parse(localStorage.getItem('p2p_dating_profile') ?? '{}') as {
        read_receipts_enabled?: boolean
      }
      setMyReceiptsEnabled(profile.read_receipts_enabled ?? true)
      return
    }

    void getSupabaseClient()
      .from('dating_profiles')
      .select('read_receipts_enabled')
      .eq('user_id', user.id)
      .single()
      .then(({ data: row }) => {
        if (row) setMyReceiptsEnabled(row.read_receipts_enabled ?? true)
      })
  }, [user?.id])

  useEffect(() => {
    if (!otherUserId) return

    if (!hasSupabaseEnv) {
      setOtherReceiptsEnabled(true)
      return
    }

    void getSupabaseClient()
      .from('dating_profiles')
      .select('read_receipts_enabled')
      .eq('user_id', otherUserId)
      .single()
      .then(({ data: row }) => {
        if (row) setOtherReceiptsEnabled(row.read_receipts_enabled ?? true)
      })
  }, [otherUserId])

  useEffect(() => {
    if (!user?.id || !matchId || messages.length === 0) return

    void markAsRead(matchId, user.id).then(() => {
      if (!hasSupabaseEnv) {
        void getMessages(matchId).then((msgs) => setMessages(msgs))
      }
    })
  }, [matchId, messages.length, user?.id])

  useEffect(() => {
    if (!hasSupabaseEnv || !matchId) return

    const channel = getSupabaseClient()
      .channel(`read-receipts-${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          const updated = payload.new as {
            id: string
            read_at: string | null
          }
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === updated.id
                ? { ...msg, readAt: updated.read_at ?? undefined }
                : msg,
            ),
          )
        },
      )
      .subscribe()

    return () => {
      void getSupabaseClient().removeChannel(channel)
    }
  }, [matchId])

  useEffect(() => {
    void (async () => {
      const profile = JSON.parse(localStorage.getItem('p2p_dating_profile') ?? '{}') as {
        payload?: { mbtiType?: string }
      }
      let mbti = profile.payload?.mbtiType
      if (!mbti) {
        const persona = await readDexiePersona()
        mbti = persona.mbtiType
      }
      setMyMbti(mbti ?? '')

      const big5 = await getBig5Profile()
      if (big5) {
        setMyBig5NA(big5ProfileToNA(big5))
      }
    })()
  }, [])

  useEffect(() => {
    usedQuestionIndices.current = new Set()
    setSuggestedQuestions([])
    setOtherMbti('')
    setDepthCueShown(false)
    setDepthCueDismissed(false)
    setDepthCueQuestion(null)
  }, [matchId])

  useEffect(() => {
    if (isMbtiType(myMbti) && isMbtiType(otherMbti)) {
      const { questions, indices } = getRandomOpeningQuestions(
        myMbti,
        otherMbti,
        3,
        usedQuestionIndices.current,
      )
      setSuggestedQuestions(calibrateChips(questions, myBig5NA))
      indices.forEach((i) => usedQuestionIndices.current.add(i))
    } else {
      const { questions, indices } = getRandomBridgeQuestions(
        2,
        usedQuestionIndices.current,
      )
      const combined = [...questions, DEFAULT_OPENING_QUESTIONS[0]]
      setSuggestedQuestions(calibrateChips(combined, myBig5NA))
      indices.forEach((i) => usedQuestionIndices.current.add(i))
    }
  }, [myMbti, otherMbti, matchId, myBig5NA])

  useEffect(() => {
    if (depthCueShown || depthCueDismissed) return
    if (messages.length < 5) return

    const card = isMbtiType(myMbti) ? getCard(myMbti, 'intimacy') : undefined
    if (card) {
      setDepthCueQuestion(card.selfAsk)
      setDepthCueShown(true)
    }
  }, [messages.length, depthCueShown, depthCueDismissed, myMbti])

  useEffect(() => {
    if (!user || !matchId) return

    const userId = user.id
    const activeMatchId = matchId
    let active = true

    const reloadDemoMessages = () => {
      if (!active) return
      void getMessages(activeMatchId).then((msgs) => {
        if (active) setMessages(msgs)
      })
    }

    const storageHandler = (e: StorageEvent) => {
      if (e.key === `p2p_demo_msgs_${activeMatchId}`) reloadDemoMessages()
    }

    const demoHandler = (e: Event) => {
      const detail = (e as CustomEvent<{ matchId: string }>).detail
      if (detail?.matchId === activeMatchId) reloadDemoMessages()
    }

    if (!hasSupabaseEnv) {
      window.addEventListener('storage', storageHandler)
      window.addEventListener(P2P_DEMO_MESSAGES_EVENT, demoHandler)
    }

    async function init() {
      setLoading(true)

      const matches = await getMyMatches(userId)
      const thisMatch = matches.find((m) => m.matchId === activeMatchId)
      if (thisMatch) {
        setOtherName(thisMatch.otherUser.displayName)
        setOtherPhoto(thisMatch.otherUser.photos[0] ?? '')
        setOtherMbti(thisMatch.otherUser.mbtiType ?? '')
        setOtherUserId(thisMatch.otherUser.userId)
      }

      const msgs = await getMessages(activeMatchId)
      if (active) setMessages(msgs)

      await markAsRead(activeMatchId, userId)

      if (active) setLoading(false)

      if (hasSupabaseEnv) {
        channelRef.current = subscribeToMessages(activeMatchId, (newMsg) => {
          if (!active) return
          setMessages((prev) => {
            if (prev.find((m) => m.id === newMsg.id)) return prev
            return [...prev, newMsg]
          })
          if (newMsg.senderId !== userId) {
            void markAsRead(activeMatchId, userId)
          }
        })
      }
    }

    void init()

    return () => {
      active = false
      unsubscribeChannel(channelRef.current)
      channelRef.current = null
      if (!hasSupabaseEnv) {
        window.removeEventListener('storage', storageHandler)
        window.removeEventListener(P2P_DEMO_MESSAGES_EVENT, demoHandler)
      }
    }
  }, [user, matchId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!showMenu) return
    const handler = () => setShowMenu(false)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [showMenu])

  async function handleUnmatch() {
    if (!user || !matchId || !otherUserId) return
    setShowMenu(false)
    const confirmed = window.confirm(
      `Bỏ match với ${otherName}? Hành động này không thể hoàn tác.`,
    )
    if (!confirmed) return
    await unmatchAndBlock(user.id, matchId, otherUserId)
    navigate('/matches')
  }

  async function handleReport(reason: ReportReason) {
    if (!user || !otherUserId) return
    await reportUser(user.id, otherUserId, reason)
    if (matchId) {
      await unmatchAndBlock(user.id, matchId, otherUserId)
    }
    navigate('/matches')
  }

  const handleSend = useCallback(async () => {
    const content = input.trim()
    if (!content || !user || !matchId || sending) return

    let outgoing = content

    if (filterRef.current) {
      const { confidence, censored } = filterRef.current.checkMessage(content)

      if (confidence === 'high') {
        showToast('Tin nhắn chứa nội dung không phù hợp')
        return
      }

      if (confidence === 'medium') {
        outgoing = censored
      }
    }

    setSending(true)
    setInput('')

    const optimistic: ChatMessage = {
      id: `optimistic_${Date.now()}`,
      matchId,
      senderId: user.id,
      content: outgoing,
      sentAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, optimistic])

    const { message, error } = await sendMessage(matchId, user.id, outgoing)

    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id))
      setInput(content)
    } else if (message && hasSupabaseEnv) {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? message : m)),
      )
    } else if (message && !hasSupabaseEnv) {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? message : m)),
      )
    }

    setSending(false)
    inputRef.current?.focus()
  }, [input, user, matchId, sending, showToast])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  if (authLoading || loading) {
    return (
      <AtmosphericPage overlay="heavy" contentClassName="flex items-center justify-center min-h-screen">
        <div className="text-white/40 text-sm">Đang tải...</div>
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage overlay="heavy" contentClassName="flex flex-col min-h-screen">
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-white/8">
        <button
          type="button"
          onClick={() => navigate('/matches')}
          className="text-white/60 hover:text-white transition-colors p-1"
        >
          ← Trận đấu
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
          {otherPhoto ? (
            <img src={otherPhoto} alt={otherName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30">
              {otherName[0]}
            </div>
          )}
        </div>
        <div>
          <div className="text-white font-medium text-sm">{otherName}</div>
          {otherMbti && <div className="text-white/40 text-xs">{otherMbti}</div>}
        </div>

        <div className="ml-auto relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowMenu((v) => !v)
            }}
            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            ⋯
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-full mt-1 bg-[#1A1A20] border border-white/10 rounded-xl overflow-hidden min-w-[160px] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => void handleUnmatch()}
                className="w-full text-left px-4 py-3 text-white/70 text-sm hover:bg-white/5 transition-colors"
              >
                Bỏ match
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowMenu(false)
                  setShowReportModal(true)
                }}
                className="w-full text-left px-4 py-3 text-red-400 text-sm hover:bg-white/5 transition-colors"
              >
                Báo cáo
              </button>
            </div>
          )}
        </div>
      </div>

      <ReportModal
        isOpen={showReportModal}
        targetName={otherName}
        onConfirm={handleReport}
        onClose={() => setShowReportModal(false)}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-white/30 text-sm py-8">
            Bắt đầu cuộc trò chuyện 👋
          </div>
        )}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isMe={msg.senderId === user?.id}
            showReadReceipts={showReadReceipts}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-8 pt-3 border-t border-white/8">
        {messages.length === 0 && suggestedQuestions.length > 0 && (
          <div className="flex flex-col gap-2 px-0 pb-3">
            <p className="text-xs text-white/40 uppercase tracking-wide">
              Gợi ý câu mở đầu
            </p>
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                type="button"
                className="text-left text-sm text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition-colors cursor-pointer w-full"
                onClick={() => {
                  setInput(question)
                  inputRef.current?.focus()
                }}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {depthCueShown && !depthCueDismissed && depthCueQuestion && (
          <div className="px-0 pb-3 flex flex-col gap-2">
            <p className="text-xs text-white/30 uppercase tracking-wide">
              Câu hỏi sâu hơn?
            </p>
            <div className="flex items-start gap-2">
              <button
                type="button"
                className="flex-1 text-left text-sm text-white/70 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
                onClick={() => {
                  setInput(depthCueQuestion)
                  inputRef.current?.focus()
                  setDepthCueDismissed(true)
                }}
              >
                {depthCueQuestion}
              </button>
              <button
                type="button"
                onClick={() => setDepthCueDismissed(true)}
                className="text-white/20 hover:text-white/40 text-xs px-2 py-3 transition-colors shrink-0"
                aria-label="Bỏ qua"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2 items-end">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhắn tin..."
            maxLength={1000}
            className="flex-1 bg-white/8 rounded-2xl px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-white/30 text-sm"
          />
          <div className="relative emoji-picker-container">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="hidden sm:block text-white/40 hover:text-white/70 p-2 transition-colors text-xl leading-none"
              aria-label="Chọn emoji"
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 z-50 emoji-picker-container">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="dark"
                  locale="vi"
                  previewPosition="none"
                  skinTonePosition="none"
                />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={!input.trim() || sending}
            className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-black font-bold disabled:opacity-30 transition-opacity flex-shrink-0"
          >
            {sending ? '•' : '↑'}
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 backdrop-blur text-white/80 text-sm px-5 py-3 rounded-xl shadow-lg z-50">
          {toastMsg}
        </div>
      )}
    </AtmosphericPage>
  )
}

function MessageBubble({
  message,
  isMe,
  showReadReceipts,
}: {
  message: ChatMessage
  isMe: boolean
  showReadReceipts: boolean
}) {
  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
          isMe
            ? 'bg-white text-black rounded-br-md'
            : 'bg-white/10 text-white rounded-bl-md'
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <p
          className={`text-xs mt-1 flex items-center justify-end gap-1 ${
            isMe ? 'text-black/40' : 'text-white/30'
          }`}
        >
          <span>{formatTime(message.sentAt)}</span>
          {isMe && (
            <span className="flex-shrink-0">
              {showReadReceipts && message.readAt ? (
                <span className="text-[#7EB8D8]">✓✓</span>
              ) : (
                <span className={isMe ? 'text-black/30' : 'text-white/30'}>✓</span>
              )}
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
