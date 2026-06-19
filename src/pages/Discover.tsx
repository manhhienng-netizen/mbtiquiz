import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import AtmosphericPage from '../components/AtmosphericPage'
import { useP2PAuth } from '../context/P2PAuthContext'
import { getDiscoverDeck, type DiscoverProfile } from '../lib/p2p/discover-service'
import { recordSwipe } from '../lib/p2p/swipe-service'
import { readDexiePersona } from '../lib/p2p/persona-sync'
import { getBig5Profile } from '../db/tncb-db'
import type { Big5Profile } from '../lib/big5-scoring'
import { getCommonPoints } from '../lib/p2p/common-points'

export default function Discover() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useP2PAuth()
  const [deck, setDeck] = useState<DiscoverProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [matchProfile, setMatchProfile] = useState<DiscoverProfile | null>(null)
  const [swiping, setSwiping] = useState(false)
  const [deckSize, setDeckSize] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [myMbtiType, setMyMbtiType] = useState('')
  const [myBig5Profile, setMyBig5Profile] = useState<Big5Profile | null>(null)

  useEffect(() => {
    if (!authLoading && !user) navigate('/profile/setup')
  }, [authLoading, user, navigate])

  const loadDeck = useCallback(async () => {
    if (!user) return
    setLoading(true)

    const myProfile = JSON.parse(localStorage.getItem('p2p_dating_profile') ?? '{}')
    const dexiePersona = await readDexiePersona()

    const prefs = {
      userId: user.id,
      lookingFor: myProfile.looking_for ?? 'any',
      minAge: myProfile.min_age ?? 18,
      maxAge: myProfile.max_age ?? 99,
      myPayload: myProfile.payload ?? dexiePersona,
    }

    const profiles = await getDiscoverDeck(prefs)
    setDeck(profiles)
    setDeckSize(profiles.length)
    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!user) return
    void loadDeck()
  }, [user, loadDeck])

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

  const handleSwipe = useCallback(
    async (profile: DiscoverProfile, action: 'like' | 'pass') => {
      if (!user || swiping) return
      setSwiping(true)

      setDeck((prev) => {
        const next = prev.filter((p) => p.userId !== profile.userId)
        if (next.length < 5) void loadDeck()
        return next
      })

      const result = await recordSwipe(user.id, profile.userId, action)

      if (result.isMatch) {
        setMatchProfile(profile)
      }

      setSwiping(false)
    },
    [user, swiping, loadDeck],
  )

  function handleDragEnd(profile: DiscoverProfile, info: PanInfo) {
    const threshold = 100
    if (info.offset.x > threshold) void handleSwipe(profile, 'like')
    else if (info.offset.x < -threshold) void handleSwipe(profile, 'pass')
  }

  if (authLoading || loading) {
    return (
      <AtmosphericPage overlay="medium" contentClassName="flex items-center justify-center min-h-screen">
        <div className="text-white/40 text-sm">Đang tải...</div>
      </AtmosphericPage>
    )
  }

  const topCard = deck[0]

  return (
    <AtmosphericPage overlay="medium" contentClassName="flex flex-col min-h-screen pb-20">
      <div className="flex items-center justify-between px-6 pt-12 pb-4">
        <h1 className="text-white font-bold text-xl">Khám phá</h1>
        <button
          type="button"
          onClick={() => navigate('/matches')}
          className="text-white/60 text-sm hover:text-white transition-colors"
        >
          Matches
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        {deck.length === 0 ? (
          <EmptyDeck deckSize={deckSize} onRefresh={() => void loadDeck()} />
        ) : (
          <div className="relative w-full max-w-sm" style={{ height: 520 }}>
            {deck[1] && (
              <div className="absolute inset-0 scale-95 opacity-40 rounded-2xl overflow-hidden bg-white/5">
                <ProfileCard
                  profile={deck[1]}
                  myMbtiType={myMbtiType}
                  myBig5Profile={myBig5Profile}
                />
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {topCard && (
                <motion.div
                  key={topCard.userId}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y"
                  drag="x"
                  dragConstraints={{ left: -400, right: 400 }}
                  dragElastic={0.15}
                  onDrag={(_, info) => setDragX(info.offset.x)}
                  onDragEnd={(_, info) => {
                    setDragX(0)
                    handleDragEnd(topCard, info)
                  }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                  exit={{ x: 300, opacity: 0, rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {dragX > 40 && (
                    <div className="absolute top-6 left-6 z-10 border-4 border-green-400 text-green-400 font-black text-2xl px-3 py-1 rounded-xl rotate-[-20deg] opacity-90">
                      THÍCH
                    </div>
                  )}
                  {dragX < -40 && (
                    <div className="absolute top-6 right-6 z-10 border-4 border-red-400 text-red-400 font-black text-2xl px-3 py-1 rounded-xl rotate-[20deg] opacity-90">
                      BỎ QUA
                    </div>
                  )}
                  <ProfileCard
                  profile={topCard}
                  myMbtiType={myMbtiType}
                  myBig5Profile={myBig5Profile}
                />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {topCard && (
        <div className="flex justify-center gap-8 pb-12 pt-4">
          <button
            type="button"
            onClick={() => void handleSwipe(topCard, 'pass')}
            disabled={swiping}
            className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl hover:border-red-400 hover:text-red-400 transition-colors disabled:opacity-30"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={() => void handleSwipe(topCard, 'like')}
            disabled={swiping}
            className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center text-2xl hover:border-green-400 hover:text-green-400 transition-colors disabled:opacity-30"
          >
            ♡
          </button>
        </div>
      )}

      <AnimatePresence>
        {matchProfile && (
          <MatchMomentModal
            profile={matchProfile}
            onChat={() => navigate('/matches')}
            onContinue={() => setMatchProfile(null)}
          />
        )}
      </AnimatePresence>
    </AtmosphericPage>
  )
}

function ProfileCard({
  profile,
  myMbtiType,
  myBig5Profile,
}: {
  profile: DiscoverProfile
  myMbtiType: string
  myBig5Profile: Big5Profile | null
}) {
  const [showBio, setShowBio] = useState(false)

  const otherMbtiType = profile.payload.mbtiType ?? ''
  const commonPoints = getCommonPoints(
    myMbtiType,
    otherMbtiType,
    myBig5Profile,
    null,
  )

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative select-none">
      <div className="absolute inset-0">
        {profile.photos[0] ? (
          <img
            src={profile.photos[0]}
            alt={profile.displayName}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
            <span className="text-white/20 text-6xl">?</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between mb-2">
          <div>
            <h2 className="text-white font-bold text-xl">{profile.displayName}</h2>
            <div className="flex gap-2 mt-1 flex-wrap">
              {profile.payload.mbtiType && (
                <span className="bg-white/15 text-white/80 text-xs px-2 py-0.5 rounded-full">
                  {profile.payload.mbtiType}
                </span>
              )}
              {profile.payload.element && (
                <span className="bg-white/15 text-white/80 text-xs px-2 py-0.5 rounded-full">
                  {profile.payload.element}
                </span>
              )}
              {profile.selfieVerified && (
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                  ✓ xác thực
                </span>
              )}
            </div>
          </div>
          {commonPoints.length > 0 && (
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-white/30 text-xs uppercase tracking-wide mb-1">
                Điểm chung
              </p>
              {commonPoints.map((point) => (
                <p key={point.text} className="text-white/55 text-xs leading-relaxed">
                  · {point.text}
                </p>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowBio((v) => !v)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
          >
            {showBio ? '▲' : '▼'}
          </button>
        </div>

        {showBio && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/70 text-sm leading-relaxed mt-2"
          >
            {profile.bio}
          </motion.p>
        )}
      </div>
    </div>
  )
}

function EmptyDeck({
  deckSize,
  onRefresh,
}: {
  deckSize: number
  onRefresh: () => void
}) {
  const shareText =
    'Mình đang dùng TNCB — app khám phá tính cách và kết nối người hợp. Bạn thử không?'
  const shareUrl = 'https://mbtiquiz-seven.vercel.app'

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'TNCB', text: shareText, url: shareUrl })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      alert('Đã copy link!')
    }
  }

  return (
    <div className="text-center space-y-5 px-4">
      <div className="text-4xl">🌙</div>
      {deckSize === 0 ? (
        <>
          <p className="text-white font-medium">Chưa có ai mới hôm nay</p>
          <p className="text-white/40 text-sm leading-relaxed">
            App đang trong giai đoạn đầu. Mời thêm bạn bè để deck phong phú hơn.
          </p>
        </>
      ) : (
        <>
          <p className="text-white font-medium">Chỉ còn {deckSize} người</p>
          <p className="text-white/40 text-sm">Mời thêm bạn bè để khám phá nhiều hơn</p>
        </>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => void handleShare()}
          className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-medium hover:bg-white/15 transition-colors"
        >
          Mời bạn bè tham gia 🔗
        </button>
        <button
          type="button"
          onClick={onRefresh}
          className="w-full py-3 rounded-xl border border-white/10 text-white/40 text-sm hover:border-white/20 hover:text-white/60 transition-colors"
        >
          Thử lại
        </button>
      </div>

      <p className="text-white/25 text-xs">
        Hoàn thiện{' '}
        <a href="/quiz" className="underline text-white/40 hover:text-white/60">
          quiz tính cách
        </a>{' '}
        để matching chính xác hơn
      </p>
    </div>
  )
}

function MatchMomentModal({
  profile,
  onChat,
  onContinue,
}: {
  profile: DiscoverProfile
  onChat: () => void
  onContinue: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#141418] border border-white/10 rounded-2xl p-8 text-center max-w-sm w-full space-y-5"
      >
        <div className="text-4xl">✨</div>
        <div>
          <h2 className="text-white font-bold text-2xl mb-1">Match!</h2>
          <p className="text-white/60 text-sm">
            Bạn và <span className="text-white">{profile.displayName}</span> đã thích nhau
          </p>
        </div>
        {profile.photos[0] && (
          <img
            src={profile.photos[0]}
            alt={profile.displayName}
            className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white/20"
          />
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onContinue}
            className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 text-sm hover:border-white/40 transition-colors"
          >
            Tiếp tục
          </button>
          <button
            type="button"
            onClick={onChat}
            className="flex-1 py-3 rounded-xl bg-white text-black font-semibold text-sm"
          >
            Nhắn tin
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
