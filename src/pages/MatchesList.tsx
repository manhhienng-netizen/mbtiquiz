import { useEffect, useRef, useState } from 'react'

const SILENT_BADGE_KEY = 'tncb_silent_badge_shown'

function isSilentConversation(
  lastMessageAt: string | null,
  lastMessageSenderId: string | null,
  myUserId: string,
): boolean {
  if (!lastMessageAt || !lastMessageSenderId) return false
  if (lastMessageSenderId === myUserId) return false

  const daysSince =
    (Date.now() - new Date(lastMessageAt).getTime()) / (1000 * 60 * 60 * 24)

  return daysSince > 3
}

function hasShownSilentBadge(matchId: string): boolean {
  try {
    const shown = JSON.parse(localStorage.getItem(SILENT_BADGE_KEY) ?? '{}') as Record<
      string,
      boolean
    >
    return !!shown[matchId]
  } catch {
    return false
  }
}

function markSilentBadgeShown(matchId: string): void {
  try {
    const shown = JSON.parse(localStorage.getItem(SILENT_BADGE_KEY) ?? '{}') as Record<
      string,
      boolean
    >
    shown[matchId] = true
    localStorage.setItem(SILENT_BADGE_KEY, JSON.stringify(shown))
  } catch {
    // ignore
  }
}
import AtmosphericPage from '../components/AtmosphericPage'
import { useNavigate } from 'react-router-dom'
import { useP2PAuth } from '../context/P2PAuthContext'
import { getMyMatches, type MatchWithProfile } from '../lib/p2p/match-service'
import { blockUser } from '../lib/p2p/safety-service'
import { createAndCopyInviteLink } from '../lib/p2p/invite-service'
import { readDexiePersona } from '../lib/p2p/persona-sync'
import { getBig5Profile } from '../db/tncb-db'
import type { Big5Profile } from '../lib/big5-scoring'
import { getCommonPoints } from '../lib/p2p/common-points'

export default function MatchesList() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useP2PAuth()
  const [matches, setMatches] = useState<MatchWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [myMbtiType, setMyMbtiType] = useState('')
  const [myBig5Profile, setMyBig5Profile] = useState<Big5Profile | null>(null)

  useEffect(() => {
    if (!authLoading && !user) navigate('/profile/setup')
  }, [authLoading, user, navigate])

  useEffect(() => {
    if (!user) return
    void loadMatches()
  }, [user])

  useEffect(() => {
    void (async () => {
      const myProfile = JSON.parse(localStorage.getItem('p2p_dating_profile') ?? '{}') as {
        payload?: { mbtiType?: string }
      }
      const dexiePersona = await readDexiePersona()
      setMyMbtiType(myProfile.payload?.mbtiType ?? dexiePersona.mbtiType ?? '')
      setMyBig5Profile(await getBig5Profile())
    })()
  }, [])

  async function loadMatches() {
    if (!user) return
    setLoading(true)
    const data = await getMyMatches(user.id)
    setMatches(data)
    setLoading(false)
  }

  if (authLoading || loading) {
    return (
      <AtmosphericPage overlay="medium" contentClassName="flex items-center justify-center min-h-screen">
        <div className="text-white/40 text-sm">Đang tải...</div>
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage overlay="medium" contentClassName="flex flex-col min-h-screen pb-20">
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <h1 className="text-white font-bold text-xl">Matches</h1>
        <button
          type="button"
          onClick={() => navigate('/discover')}
          className="text-white/60 text-sm hover:text-white transition-colors"
        >
          Khám phá
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-3">
            <div className="text-4xl">💫</div>
            <p className="text-white/60 text-sm">Chưa có match nào</p>
            <button
              type="button"
              onClick={() => navigate('/discover')}
              className="px-5 py-2 rounded-full border border-white/20 text-white/60 text-sm hover:border-white/40 hover:text-white transition-colors"
            >
              Đi khám phá →
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {matches.map((match) => (
              <MatchRow
                key={match.matchId}
                match={match}
                currentUserId={user!.id}
                myMbtiType={myMbtiType}
                myBig5Profile={myBig5Profile}
                onClick={() => navigate(`/chat/${match.matchId}`)}
                onBlocked={() => void loadMatches()}
              />
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-6 pt-2">
        <button
          type="button"
          onClick={() => void createAndCopyInviteLink()}
          className="w-full bg-white/5 border border-white/10 text-white/80 font-medium py-4 rounded-2xl text-sm active:scale-95 transition-transform"
        >
          Mời bạn so tương hợp 🔗
        </button>
      </div>
    </AtmosphericPage>
  )
}

function MatchRow({
  match,
  currentUserId,
  myMbtiType,
  myBig5Profile,
  onClick,
  onBlocked,
}: {
  match: MatchWithProfile
  currentUserId: string
  myMbtiType: string
  myBig5Profile: Big5Profile | null
  onClick: () => void
  onBlocked: () => void
}) {
  const { otherUser, lastMessage, unreadCount, matchedAt } = match
  const isMyMessage = lastMessage?.senderId === currentUserId
  const pressTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const commonPoints = getCommonPoints(
    myMbtiType,
    otherUser.mbtiType ?? '',
    myBig5Profile,
    null,
  )

  const silent = isSilentConversation(
    lastMessage?.sentAt ?? null,
    lastMessage?.senderId ?? null,
    currentUserId,
  )
  const badgeAlreadyShown = hasShownSilentBadge(match.matchId)
  const showSilentBadge = silent && !badgeAlreadyShown

  useEffect(() => {
    if (showSilentBadge) {
      markSilentBadgeShown(match.matchId)
    }
  }, [showSilentBadge, match.matchId])

  function handlePressStart() {
    pressTimer.current = setTimeout(() => {
      void (async () => {
        const confirmed = window.confirm(
          `Block ${match.otherUser.displayName}? Người này sẽ không còn hiện trong Khám phá.`,
        )
        if (!confirmed) return
        await blockUser(currentUserId, match.otherUser.userId)
        onBlocked()
      })()
    }, 600)
  }

  function handlePressEnd() {
    if (pressTimer.current !== undefined) clearTimeout(pressTimer.current)
  }

  function formatTime(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diffDays === 0) {
      return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays < 7) return `${diffDays} ngày trước`
    return d.toLocaleDateString('vi-VN')
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onContextMenu={(e) => e.preventDefault()}
      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors text-left"
    >
      <div className="relative flex-shrink-0">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10">
          {otherUser.photos[0] ? (
            <img
              src={otherUser.photos[0]}
              alt={otherUser.displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 text-xl">
              {otherUser.displayName[0]}
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-white font-medium">{otherUser.displayName}</span>
          <span className="text-white/30 text-xs flex-shrink-0">
            {formatTime(lastMessage?.sentAt ?? matchedAt)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {otherUser.mbtiType && (
            <span className="text-white/40 text-xs bg-white/8 px-1.5 py-0.5 rounded">
              {otherUser.mbtiType}
            </span>
          )}
          {lastMessage ? (
            <p
              className={`text-sm truncate ${unreadCount > 0 ? 'text-white font-medium' : 'text-white/40'}`}
            >
              {isMyMessage ? 'Bạn: ' : ''}
              {lastMessage.content}
            </p>
          ) : (
            <p className="text-white/30 text-sm italic">Match mới — bắt đầu trò chuyện</p>
          )}
          {showSilentBadge && (
            <span className="text-white/30 text-xs italic">
              Cuộc trò chuyện vẫn đang chờ
            </span>
          )}
        </div>
        {commonPoints.length > 0 && (
          <div className="mt-2 flex flex-col gap-0.5">
            <p className="text-white/25 text-[10px] uppercase tracking-wide">Điểm chung</p>
            {commonPoints.map((point) => (
              <p key={point.text} className="text-white/45 text-xs leading-snug truncate">
                · {point.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}
