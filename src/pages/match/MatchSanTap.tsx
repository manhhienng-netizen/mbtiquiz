import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MaShell from '../../components/MaShell'
import MaTopBar from '../../components/MaTopBar'
import {
  checkTeenCrisisLevel,
  serveTeenStaticCase,
  type MAContext,
  type MAChoiceRecord,
} from '../../lib/match/ma-guardrail'
import {
  nextCaseAdaptive,
  type ArenaSession,
} from '../../lib/arena-session'

const ACCENT = '#E88B9E'

type AgeGroup = 'young' | 'teen' | 'adult'
type RpChoice = 'c1' | 'c2' | 'c3'
type Phase = 'setup' | 'chose' | 'mirror'

interface MACaseChoice {
  id: RpChoice
  label: string
}

interface MACase {
  id?: string
  hook?: string
  setup?: string
  choices?: MACaseChoice[]
  consequences?: Record<
    RpChoice,
    { immediate: string; later: string }
  >
  mirrorMoment?: string
  isCrisis?: boolean
}

const AGE_GROUP_OPTIONS: { id: AgeGroup; label: string; sublabel: string }[] = [
  { id: 'young', label: 'Con nhỏ', sublabel: '3–11 tuổi' },
  { id: 'teen', label: 'Con tuổi teen', sublabel: '12–18 tuổi' },
  { id: 'adult', label: 'Con trưởng thành', sublabel: '18 tuổi trở lên' },
]

function resolveMaContextParam(param: string, painId: string): string {
  if (param === 'goal') {
    if (painId === 'bo-me') return 'parent'
    if (painId === 'con') return 'child-young'
    if (painId === 'vo-chong') return 'spouse'
    return 'spouse'
  }
  return param
}

function resolveMAContext(baseContext: string, ageGroup?: AgeGroup): MAContext {
  if (baseContext === 'child-young') {
    if (ageGroup === 'teen') return 'child-teen'
    if (ageGroup === 'adult') return 'child-adult'
    return 'child-young'
  }
  const valid: MAContext[] = [
    'spouse',
    'parent',
    'child-young',
    'child-teen',
    'child-adult',
  ]
  if (valid.includes(baseContext as MAContext)) {
    return baseContext as MAContext
  }
  return 'spouse'
}

function needsAgeGroupPick(baseContext: string, ageGroup: AgeGroup | null): boolean {
  return baseContext === 'child-young' && ageGroup == null
}

function toMACase(raw: unknown): MACase | null {
  if (!raw || typeof raw !== 'object') return null
  return raw as MACase
}

function createMASession(ctx: MAContext, painId: string): ArenaSession {
  return {
    focusRole: 'random',
    servedCaseIds: [],
    completedCount: 0,
    context: 'match',
    maContext: ctx,
    painId,
    choiceHistory: [],
    lastFreeformInput: '',
  }
}

export default function MatchSanTap() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initializedRef = useRef(false)

  const rawMaContext = searchParams.get('maContext') ?? 'spouse'
  const painId = searchParams.get('painId') ?? 'general'
  const typePair = searchParams.get('typePair') ?? undefined
  const ageGroupParam = searchParams.get('ageGroup') as AgeGroup | null

  const baseContext = resolveMaContextParam(rawMaContext, painId)
  const initialAgeGroup =
    ageGroupParam ??
    (baseContext === 'child-teen'
      ? 'teen'
      : baseContext === 'child-adult'
        ? 'adult'
        : null)

  const [showAgeSelect, setShowAgeSelect] = useState(
    needsAgeGroupPick(baseContext, initialAgeGroup),
  )
  const [resolvedCtx, setResolvedCtx] = useState<MAContext>(() =>
    resolveMAContext(baseContext, initialAgeGroup ?? undefined),
  )

  const [session, setSession] = useState<ArenaSession | null>(null)
  const [currentCase, setCurrentCase] = useState<MACase | null>(null)
  const [choiceHistory, setChoiceHistory] = useState<MAChoiceRecord[]>([])
  const [isLoading, setLoading] = useState(false)
  const [phase, setPhase] = useState<Phase>('setup')
  const [selectedChoice, setSelectedChoice] = useState<RpChoice | null>(null)
  const [isCrisis, setIsCrisis] = useState(false)

  const fetchNextCase = useCallback(
    async (sess: ArenaSession) => {
      setLoading(true)
      setPhase('setup')
      setSelectedChoice(null)
      setIsCrisis(false)

      if (sess.maContext === 'child-teen') {
        const crisisLevel = checkTeenCrisisLevel(
          sess.painId ?? '',
          sess.lastFreeformInput,
        )
        if (crisisLevel === 'primary') {
          const fallback = serveTeenStaticCase(sess.servedCaseIds)
          if (fallback) {
            setCurrentCase({ ...fallback, isCrisis: true })
            setIsCrisis(true)
          } else {
            setCurrentCase(null)
          }
          setLoading(false)
          return
        }
        if (crisisLevel === 'secondary') {
          setCurrentCase(serveTeenStaticCase(sess.servedCaseIds, 'DISTANCE'))
          setLoading(false)
          return
        }
      }

      try {
        const mbtiType = typePair?.split('+')[0]
        const nextCase = await nextCaseAdaptive(sess, mbtiType)
        const parsed = toMACase(nextCase)
        if (parsed?.isCrisis) setIsCrisis(true)
        setCurrentCase(parsed)
      } catch (e) {
        console.error('fetchNextCase error:', e)
        if (sess.maContext === 'child-teen') {
          setCurrentCase(serveTeenStaticCase(sess.servedCaseIds))
        } else {
          setCurrentCase(null)
        }
      } finally {
        setLoading(false)
      }
    },
    [typePair],
  )

  const initSession = useCallback(
    (ctx: MAContext) => {
      const newSession = createMASession(ctx, painId)
      setSession(newSession)
      setChoiceHistory([])
      void fetchNextCase(newSession)
    },
    [fetchNextCase, painId],
  )

  const handleAgeSelect = useCallback(
    (ag: AgeGroup) => {
      const ctx = resolveMAContext(baseContext, ag)
      setResolvedCtx(ctx)
      setShowAgeSelect(false)
      initSession(ctx)
    },
    [baseContext, initSession],
  )

  const handleChoice = useCallback(
    (choice: RpChoice) => {
      if (!session) return
      setSelectedChoice(choice)
      setPhase('chose')

      const record: MAChoiceRecord = {
        caseId: currentCase?.id ?? 'unknown',
        choice,
        context: resolvedCtx,
      }
      const newHistory = [...choiceHistory, record]
      setChoiceHistory(newHistory)
      setSession({
        ...session,
        choiceHistory: newHistory,
        completedCount: session.completedCount + 1,
      })
    },
    [session, currentCase?.id, resolvedCtx, choiceHistory],
  )

  const handleNextCase = useCallback(() => {
    if (!session) return
    const caseId = currentCase?.id
    const updatedSession: ArenaSession = {
      ...session,
      servedCaseIds: caseId
        ? [...session.servedCaseIds, caseId]
        : session.servedCaseIds,
    }
    setSession(updatedSession)
    void fetchNextCase(updatedSession)
  }, [session, currentCase?.id, fetchNextCase])

  useEffect(() => {
    if (showAgeSelect || initializedRef.current) return
    initializedRef.current = true
    initSession(resolvedCtx)
  }, [showAgeSelect, resolvedCtx, initSession])

  return (
    <MaShell>
      <MaTopBar backLabel="Sân tập" backRoute="/match/san-tap" />

      <div className="min-h-screen px-4 py-6 max-w-md mx-auto text-white">
        {showAgeSelect ? (
          <div>
            <h2 className="text-xl font-bold mb-2" style={{ color: ACCENT }}>
              Con bạn ở giai đoạn nào?
            </h2>
            <p className="text-sm opacity-60 mb-6">
              Để chọn tình huống phù hợp nhất
            </p>
            <div className="flex flex-col gap-3">
              {AGE_GROUP_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAgeSelect(opt.id)}
                  className="p-4 rounded-xl border text-left hover:scale-[1.01] transition-all"
                  style={{
                    borderColor: `${ACCENT}44`,
                    background: `${ACCENT}11`,
                  }}
                >
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-xs opacity-50 ml-2">{opt.sublabel}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {isCrisis ? (
          <div
            className="mb-4 p-4 rounded-xl text-sm"
            style={{
              background: `${ACCENT}22`,
              borderColor: ACCENT,
              border: '1px solid',
            }}
          >
            <p className="font-semibold mb-1" style={{ color: ACCENT }}>
              Khi nào cần thêm hỗ trợ
            </p>
            <p className="opacity-80">
              Tổng đài Quốc gia Bảo vệ Trẻ em: <strong>111</strong> — miễn phí,
              24/7
            </p>
            <p className="opacity-60 text-xs mt-1">
              Hoặc đến cơ sở y tế hoặc bệnh viện tâm thần gần nhất.
            </p>
          </div>
        ) : null}

        {isLoading && !showAgeSelect ? (
          <div className="text-center py-12 opacity-40 text-sm">
            Đang tải tình huống...
          </div>
        ) : null}

        {!showAgeSelect && !isLoading && currentCase ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs opacity-40">
                Tập {(session?.completedCount ?? 0) + 1}
              </span>
              <span className="text-xs font-medium" style={{ color: ACCENT }}>
                🎭 Sân tập Match
              </span>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: `${ACCENT}11` }}
            >
              {currentCase.hook ? (
                <p className="text-xs opacity-50 mb-1">{currentCase.hook}</p>
              ) : null}
              <p className="text-sm leading-relaxed">{currentCase.setup}</p>
            </div>

            {phase === 'setup' && currentCase.choices ? (
              <div className="space-y-2">
                <p className="text-xs opacity-50">Chọn cách xử lý:</p>
                {currentCase.choices.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleChoice(ch.id)}
                    className="w-full p-3 rounded-xl border text-sm text-left"
                    style={{ borderColor: `${ACCENT}33` }}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            ) : null}

            {phase === 'chose' &&
            selectedChoice &&
            currentCase.consequences?.[selectedChoice] ? (
              <div className="space-y-3">
                <div
                  className="p-3 rounded-xl text-sm"
                  style={{ background: `${ACCENT}15` }}
                >
                  <p className="font-semibold text-xs mb-1 opacity-60">
                    Ngay lúc đó
                  </p>
                  <p>{currentCase.consequences[selectedChoice].immediate}</p>
                </div>
                <div
                  className="p-3 rounded-xl text-sm"
                  style={{ background: `${ACCENT}08` }}
                >
                  <p className="font-semibold text-xs mb-1 opacity-60">
                    Sau đó
                  </p>
                  <p>{currentCase.consequences[selectedChoice].later}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPhase('mirror')}
                  className="w-full py-2 text-sm"
                  style={{ color: ACCENT }}
                >
                  Tự hỏi →
                </button>
              </div>
            ) : null}

            {phase === 'mirror' ? (
              <div className="space-y-4">
                <div
                  className="p-4 rounded-xl border-l-4 text-sm italic"
                  style={{ borderColor: ACCENT }}
                >
                  {currentCase.mirrorMoment}
                </div>
                <button
                  type="button"
                  onClick={handleNextCase}
                  className="w-full py-3 rounded-xl text-sm text-white"
                  style={{ background: ACCENT }}
                >
                  Tình huống tiếp →
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {!showAgeSelect && !isLoading && !currentCase ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-sm opacity-50">
              Chưa tải được tình huống — thử lại sau.
            </p>
            <button
              type="button"
              onClick={() => navigate('/match/san-tap')}
              className="text-sm underline opacity-60"
              style={{ color: ACCENT }}
            >
              Về sân tập
            </button>
          </div>
        ) : null}
      </div>
    </MaShell>
  )
}
