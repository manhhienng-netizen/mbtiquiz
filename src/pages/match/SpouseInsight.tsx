import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaShell from '../../components/MaShell'
import MaTopBar from '../../components/MaTopBar'
import CollapsibleSection from '../../components/CollapsibleSection'
import SanTapPortal from '../../components/SanTapPortal'
import { SPOUSE_TRUTH_STATEMENTS } from '../../data/match/spouse-truth-statements'
import {
  SPOUSE_ROLEPLAY_A,
  type SpouseRolePlayA,
} from '../../data/match/spouse-roleplay-a'
import {
  SPOUSE_ROLEPLAY_B,
  type SpouseRolePlayB,
} from '../../data/match/spouse-roleplay-b'
import { getLatestMBTI } from '../../db/tncb-db'
import {
  CHECKIN_OPTIONS,
  CHECKIN_RESPONSES,
  ESTIMATOR_QUESTIONS,
  PAIN_LABELS,
  PAIN_TO_RP_GROUP,
  clusterToMbtiType,
  estimatePartnerCluster,
  type CheckInChoice,
  type PainId,
  type PartnerCluster,
} from '../../data/match/spouse-static-content'
import {
  MATCH_PAIR_CONTENT,
  type MatchPairContent,
} from '../../lib/match/match-pair-content'
import {
  FOUR_HORSEMEN,
  FRICTION_FRAMING,
} from '../../lib/match/match-fourhorsemen-content'

type SpouseStep =
  | 'hook'
  | 'estimator'
  | 'insight'
  | 'roleplay-select'
  | 'roleplay-a'
  | 'roleplay-b'
  | 'horsemen'
  | 'checkin'

type RpChoice = 'c1' | 'c2' | 'c3'

const ACCENT = '#E88B9E'

const HOOK_ICONS: Record<PainId, string> = {
  argue: '/assets/icons/hook-argue.png',
  silence: '/assets/icons/hook-silence.png',
  money: '/assets/icons/hook-money.png',
  parenting: '/assets/icons/hook-parenting.png',
}

const HORSEMAN_ICONS: Record<string, string> = {
  criticism: '⚡',
  contempt: '🛡️',
  defensiveness: '🤝',
  stonewalling: '🌿',
}

const PREV: Partial<Record<SpouseStep, SpouseStep>> = {
  estimator: 'hook',
  insight: 'estimator',
  'roleplay-select': 'insight',
  'roleplay-a': 'roleplay-select',
  'roleplay-b': 'roleplay-select',
  horsemen: 'roleplay-select',
  checkin: 'horsemen',
}

function filterRolePlayA(painId: PainId | null): SpouseRolePlayA[] {
  if (!painId) return SPOUSE_ROLEPLAY_A
  const group = PAIN_TO_RP_GROUP[painId]
  const pool = SPOUSE_ROLEPLAY_A.filter((c) => c.group === group)
  return pool.length > 0 ? pool : SPOUSE_ROLEPLAY_A
}

function filterRolePlayB(painId: PainId | null): SpouseRolePlayB[] {
  if (!painId) return SPOUSE_ROLEPLAY_B
  const group = PAIN_TO_RP_GROUP[painId]
  const pool = SPOUSE_ROLEPLAY_B.filter((c) => c.group === group)
  return pool.length > 0 ? pool : SPOUSE_ROLEPLAY_B
}

function lookupPairContent(
  userType: string | null,
  partnerType: string,
): MatchPairContent | null {
  if (!userType) return null
  const key = [userType, partnerType].sort().join('+')
  return MATCH_PAIR_CONTENT[key] ?? null
}

export default function SpouseInsight() {
  const navigate = useNavigate()
  const [step, setStep] = useState<SpouseStep>('hook')
  const [painId, setPainId] = useState<PainId | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [qIndex, setQIndex] = useState(0)
  const [cluster, setCluster] = useState<PartnerCluster | null>(null)
  const [userMbtiType, setUserMbtiType] = useState<string | null>(null)
  const [pairContent, setPairContent] = useState<MatchPairContent | null>(null)
  const [insightLayer, setInsightLayer] = useState(0)
  const [rpAIndex, setRpAIndex] = useState(0)
  const [rpAPhase, setRpAPhase] = useState<'setup' | 'chose' | 'mirror'>(
    'setup',
  )
  const [rpAChoice, setRpAChoice] = useState<RpChoice | null>(null)
  const [rpBIndex, setRpBIndex] = useState(0)
  const [rpBPhase, setRpBPhase] = useState<'setup' | 'chose' | 'reveal'>(
    'setup',
  )
  const [checkInChoice, setCheckInChoice] = useState<CheckInChoice | null>(
    null,
  )

  const rpACases = useMemo(() => filterRolePlayA(painId), [painId])
  const rpBCases = useMemo(() => filterRolePlayB(painId), [painId])

  const typePair = useMemo(() => {
    if (!userMbtiType || !cluster) return undefined
    const partnerType = clusterToMbtiType(cluster)
    return `${userMbtiType}+${partnerType}`
  }, [userMbtiType, cluster])

  useEffect(() => {
    async function loadUserType() {
      try {
        const mbti = await getLatestMBTI()
        setUserMbtiType(mbti?.mbtiType ?? null)
      } catch {
        setUserMbtiType(null)
      }
    }
    void loadUserType()
  }, [])

  useEffect(() => {
    if (!cluster) {
      setPairContent(null)
      return
    }
    const partnerType = clusterToMbtiType(cluster)
    setPairContent(lookupPairContent(userMbtiType, partnerType))
  }, [cluster, userMbtiType])

  const goBack = useCallback(() => {
    if (step === 'hook') {
      navigate('/match/relationships')
      return
    }
    const target = PREV[step]
    if (target) setStep(target)
  }, [step, navigate])

  const resetFlow = useCallback(() => {
    setPainId(null)
    setAnswers({})
    setQIndex(0)
    setCluster(null)
    setPairContent(null)
    setInsightLayer(0)
    setRpAIndex(0)
    setRpAPhase('setup')
    setRpAChoice(null)
    setRpBIndex(0)
    setRpBPhase('setup')
    setCheckInChoice(null)
    setStep('hook')
  }, [])

  return (
    <MaShell>
      {step === 'hook' ? (
        <MaTopBar backLabel="Quan hệ" backRoute="/match/relationships" />
      ) : null}

      <div className="min-h-screen px-4 py-6 max-w-md mx-auto text-white">
        {step !== 'hook' ? (
          <button
            type="button"
            onClick={goBack}
            className="mb-4 text-sm flex items-center gap-1"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: ACCENT,
              opacity: 0.6,
            }}
          >
            ← Quay lại
          </button>
        ) : null}

        {step === 'hook' && (
          <HookView
            onSelect={(p) => {
              setPainId(p)
              setQIndex(0)
              setAnswers({})
              setCluster(null)
              setPairContent(null)
              setInsightLayer(0)
              setStep('estimator')
            }}
          />
        )}

        {step === 'estimator' && (
          <EstimatorView
            qIndex={qIndex}
            onAnswer={(qId, choiceId) => {
              const next = { ...answers, [qId]: choiceId }
              setAnswers(next)
              if (qIndex < ESTIMATOR_QUESTIONS.length - 1) {
                setQIndex((i) => i + 1)
              } else {
                setCluster(estimatePartnerCluster(next))
                setInsightLayer(0)
                setStep('insight')
              }
            }}
          />
        )}

        {step === 'insight' && painId && (
          <InsightView
            painId={painId}
            layer={insightLayer}
            pairContent={pairContent}
            userMbtiType={userMbtiType}
            onNextLayer={() => setInsightLayer((l) => l + 1)}
            onContinue={() => setStep('roleplay-select')}
          />
        )}

        {step === 'roleplay-select' && (
          <RolePlaySelectView
            onSelectA={() => {
              setRpAIndex(0)
              setRpAPhase('setup')
              setRpAChoice(null)
              setStep('roleplay-a')
            }}
            onSelectB={() => {
              setRpBIndex(0)
              setRpBPhase('setup')
              setStep('roleplay-b')
            }}
            onSkip={() => setStep('horsemen')}
          />
        )}

        {step === 'roleplay-a' && (
          <RolePlayAView
            cases={rpACases}
            index={rpAIndex}
            phase={rpAPhase}
            choice={rpAChoice}
            onChoose={(c) => {
              setRpAChoice(c)
              setRpAPhase('chose')
            }}
            onMirror={() => setRpAPhase('mirror')}
            onNext={() => {
              setRpAIndex((i) => i + 1)
              setRpAPhase('setup')
              setRpAChoice(null)
            }}
            onDone={() => setStep('horsemen')}
          />
        )}

        {step === 'roleplay-b' && (
          <RolePlayBView
            cases={rpBCases}
            index={rpBIndex}
            phase={rpBPhase}
            onChoose={() => setRpBPhase('chose')}
            onReveal={() => setRpBPhase('reveal')}
            onNext={() => {
              setRpBIndex((i) => i + 1)
              setRpBPhase('setup')
            }}
            onDone={() => setStep('horsemen')}
          />
        )}

        {step === 'horsemen' && (
          <HorsemenView onContinue={() => setStep('checkin')} />
        )}

        {step === 'checkin' && (
          <CheckInView
            choice={checkInChoice}
            onChoose={setCheckInChoice}
            onReset={resetFlow}
            painId={painId}
            typePair={typePair}
          />
        )}
      </div>
    </MaShell>
  )
}

function HookView({ onSelect }: { onSelect: (p: PainId) => void }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>
        Hiểu vợ/chồng bạn hơn
      </h1>
      <p className="text-sm opacity-70 mb-6">
        Chọn điều đang khó giữa hai người:
      </p>
      <div className="grid grid-cols-2 gap-3">
        {(
          Object.entries(PAIN_LABELS) as [
            PainId,
            (typeof PAIN_LABELS)[PainId],
          ][]
        ).map(([id, { label }]) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="p-4 border text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}11`, borderRadius: 14 }}
          >
            <img
              src={HOOK_ICONS[id]}
              alt=""
              width={56}
              height={56}
              style={{
                mixBlendMode: 'screen',
                objectFit: 'contain',
                filter: 'brightness(1.8)',
              }}
              className="mb-2"
              draggable={false}
              aria-hidden
            />
            <div className="text-sm font-medium">{label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function EstimatorView({
  qIndex,
  onAnswer,
}: {
  qIndex: number
  onAnswer: (qId: string, choiceId: string) => void
}) {
  const q = ESTIMATOR_QUESTIONS[qIndex]
  if (!q) return null

  return (
    <div>
      <div className="flex gap-1 mb-6">
        {ESTIMATOR_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i <= qIndex ? ACCENT : `${ACCENT}33` }}
          />
        ))}
      </div>
      <p className="text-xs opacity-50 mb-1">
        Ước lượng từ hành vi — không phải chẩn đoán
      </p>
      <h2 className="text-lg font-semibold mb-5">{q.text}</h2>
      <div className="flex flex-col gap-3">
        {q.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => onAnswer(q.id, choice.id)}
            className="p-4 rounded-xl border text-left text-sm transition-all hover:scale-[1.01]"
            style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0A` }}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function InsightView({
  painId,
  layer,
  pairContent,
  userMbtiType,
  onNextLayer,
  onContinue,
}: {
  painId: PainId
  layer: number
  pairContent: MatchPairContent | null
  userMbtiType: string | null
  onNextLayer: () => void
  onContinue: () => void
}) {
  const truths = SPOUSE_TRUTH_STATEMENTS[painId] ?? []
  const whyTheyDoThis = pairContent?.dongLuc ?? pairContent?.vungDeHop ?? null
  const frictionContent = pairContent?.vungMaSat ?? null

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: ACCENT }}>
        Có thể hiểu hơn ở đây
      </h2>

      <CollapsibleSection
        title="Vì sao họ vậy"
        iconImg="/assets/icons/insight-why.png"
        defaultOpen
      >
        {whyTheyDoThis ? (
          <p className="text-sm leading-relaxed opacity-90">{whyTheyDoThis}</p>
        ) : (
          <p className="text-sm opacity-50 italic">
            {userMbtiType
              ? 'Chưa ước lượng được type của họ — thử trả lời thêm câu hỏi.'
              : 'Hoàn thiện bài quiz của bạn để thấy insight theo cặp cụ thể.'}
          </p>
        )}
      </CollapsibleSection>

      {layer >= 1 && (
        <CollapsibleSection
          title="Vùng dễ căng thẳng"
          iconImg="/assets/icons/insight-tension.png"
        >
          <p className="text-sm leading-relaxed opacity-90">
            {frictionContent ?? (
              <span className="opacity-40 italic">Đang tải...</span>
            )}
          </p>
        </CollapsibleSection>
      )}

      {layer >= 2 && (
        <div
          className="p-4 rounded-xl border-l-4 space-y-2"
          style={{ borderColor: ACCENT, background: `${ACCENT}11` }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
            Thử nói thật
          </p>
          {truths.map((s, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {s}
            </p>
          ))}
        </div>
      )}

      {layer < 2 ? (
        <button
          type="button"
          onClick={onNextLayer}
          className="w-full py-3 rounded-xl text-sm font-medium mt-2"
          style={{ background: `${ACCENT}22`, color: ACCENT }}
        >
          Xem thêm →
        </button>
      ) : (
        <button
          type="button"
          onClick={onContinue}
          className="w-full py-3 rounded-xl text-sm font-medium mt-2 text-white"
          style={{ background: ACCENT }}
        >
          Thực hành →
        </button>
      )}
    </div>
  )
}

function RolePlaySelectView({
  onSelectA,
  onSelectB,
  onSkip,
}: {
  onSelectA: () => void
  onSelectB: () => void
  onSkip: () => void
}) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2" style={{ color: ACCENT }}>
        Muốn thực hành gì?
      </h2>
      <p className="text-sm opacity-60 mb-6">Chọn một — hoặc thử cả hai.</p>
      <div className="space-y-3">
        <button
          type="button"
          onClick={onSelectA}
          className="w-full p-4 rounded-xl border text-left transition-all"
          style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0A` }}
        >
          <div className="font-semibold text-sm mb-1">🎭 Tôi xử thế nào</div>
          <div className="text-xs opacity-60">
            Bạn là chính mình — chọn cách phản ứng trong tình huống thực
          </div>
        </button>
        <button
          type="button"
          onClick={onSelectB}
          className="w-full p-4 rounded-xl border text-left transition-all"
          style={{ borderColor: `${ACCENT}66`, background: `${ACCENT}15` }}
        >
          <div className="font-semibold text-sm mb-1">🔄 Là họ một lúc ⭐</div>
          <div className="text-xs opacity-60">
            Đặt mình vào vị trí họ — hiểu điều họ không nói được
          </div>
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-2 text-xs opacity-40 hover:opacity-60"
        >
          Bỏ qua, xem ngay →
        </button>
      </div>
    </div>
  )
}

function RolePlayAView({
  cases,
  index,
  phase,
  choice,
  onChoose,
  onMirror,
  onNext,
  onDone,
}: {
  cases: SpouseRolePlayA[]
  index: number
  phase: 'setup' | 'chose' | 'mirror'
  choice: RpChoice | null
  onChoose: (c: RpChoice) => void
  onMirror: () => void
  onNext: () => void
  onDone: () => void
}) {
  const c = cases[index % cases.length]
  if (!c) return <div className="text-sm opacity-60">Đang tải case...</div>

  const selectedLabel = choice
    ? c.choices.find((ch) => ch.id === choice)?.label
    : null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-40">
          {(index % cases.length) + 1}/{cases.length}
        </span>
        <span className="text-xs font-medium" style={{ color: ACCENT }}>
          🎭 Tôi xử thế nào
        </span>
      </div>

      {phase === 'setup' && (
        <>
          <div className="p-4 rounded-xl" style={{ background: `${ACCENT}11` }}>
            <p className="text-xs opacity-50 mb-1 italic">{c.hook}</p>
            <p className="text-sm leading-relaxed">{c.setup}</p>
          </div>
          <p className="text-sm font-medium opacity-80">Chọn cách xử lý:</p>
          <div className="space-y-2">
            {c.choices.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => onChoose(ch.id)}
                className="w-full p-3 rounded-xl border text-sm text-left transition-all hover:scale-[1.01]"
                style={{
                  borderColor: `${ACCENT}44`,
                  background: `${ACCENT}0A`,
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>
        </>
      )}

      {phase === 'chose' && choice && (
        <div className="space-y-3">
          {selectedLabel && (
            <p className="text-xs opacity-50">
              Bạn chọn: <span className="opacity-80">{selectedLabel}</span>
            </p>
          )}
          <div
            className="p-3 rounded-xl text-sm"
            style={{ background: `${ACCENT}15` }}
          >
            <p className="font-semibold text-xs mb-1 opacity-60">Ngay lúc đó</p>
            <p>{c.consequences[choice].immediate}</p>
          </div>
          <div
            className="p-3 rounded-xl text-sm"
            style={{ background: `${ACCENT}08` }}
          >
            <p className="font-semibold text-xs mb-1 opacity-60">Sau đó</p>
            <p>{c.consequences[choice].later}</p>
          </div>
          <button
            type="button"
            onClick={onMirror}
            className="w-full py-3 rounded-xl text-sm font-medium"
            style={{ background: `${ACCENT}22`, color: ACCENT }}
          >
            Tự hỏi →
          </button>
        </div>
      )}

      {phase === 'mirror' && (
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl border-l-4 text-sm italic leading-relaxed"
            style={{ borderColor: ACCENT, background: `${ACCENT}08` }}
          >
            {c.mirrorMoment}
          </div>
          <div className="flex gap-2">
            {index < cases.length - 1 && (
              <button
                type="button"
                onClick={onNext}
                className="flex-1 py-3 rounded-xl text-sm font-medium"
                style={{ background: `${ACCENT}22`, color: ACCENT }}
              >
                Tình huống tiếp →
              </button>
            )}
            <button
              type="button"
              onClick={onDone}
              className="flex-1 py-3 rounded-xl text-sm font-medium text-white"
              style={{ background: ACCENT }}
            >
              Xong →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function RolePlayBView({
  cases,
  index,
  phase,
  onChoose,
  onReveal,
  onNext,
  onDone,
}: {
  cases: SpouseRolePlayB[]
  index: number
  phase: 'setup' | 'chose' | 'reveal'
  onChoose: () => void
  onReveal: () => void
  onNext: () => void
  onDone: () => void
}) {
  const c = cases[index % cases.length]
  if (!c) return <div className="text-sm opacity-60">Đang tải case...</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-40">
          {(index % cases.length) + 1}/{cases.length}
        </span>
        <span className="text-xs font-medium" style={{ color: ACCENT }}>
          🔄 Là họ một lúc
        </span>
      </div>
      <div
        className="p-4 rounded-xl border"
        style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0A` }}
      >
        <p className="text-xs font-semibold mb-1 opacity-60">{c.hook}</p>
        <p className="text-sm leading-relaxed">{c.setup}</p>
      </div>

      {phase === 'setup' && (
        <div className="space-y-2">
          <p className="text-xs opacity-50">
            Trong lúc đó, bạn (với tư cách họ) cảm thấy...
          </p>
          {c.choices.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={onChoose}
              className="w-full p-3 rounded-xl border text-sm text-left"
              style={{ borderColor: `${ACCENT}33` }}
            >
              {ch.label}
            </button>
          ))}
        </div>
      )}

      {phase === 'chose' && (
        <div className="space-y-3">
          <div
            className="p-4 rounded-xl text-sm leading-relaxed"
            style={{ background: `${ACCENT}15` }}
          >
            <p className="text-xs opacity-50 mb-2">
              Với xu hướng kiểu này, có thể họ đang...
            </p>
            <p>{c.reveal}</p>
          </div>
          <p
            className="text-xs opacity-60 italic border-l-2 pl-3"
            style={{ borderColor: ACCENT }}
          >
            Nhu cầu bên dưới: {c.nhuCau}
          </p>
          <button
            type="button"
            onClick={onReveal}
            className="w-full py-2 text-sm"
            style={{ color: ACCENT }}
          >
            Bước tiếp →
          </button>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl border text-sm"
            style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}11` }}
          >
            <p className="font-semibold mb-1" style={{ color: ACCENT }}>
              💬 {c.checkIn}
            </p>
            <p className="text-xs opacity-50 mt-1">
              App chỉ ước lượng xu hướng — người thật mới biết chính xác.
            </p>
          </div>
          <div className="flex gap-2">
            {index < cases.length - 1 && (
              <button
                type="button"
                onClick={onNext}
                className="flex-1 py-3 rounded-xl text-sm"
                style={{ background: `${ACCENT}22`, color: ACCENT }}
              >
                Case tiếp →
              </button>
            )}
            <button
              type="button"
              onClick={onDone}
              className="flex-1 py-3 rounded-xl text-sm text-white"
              style={{ background: ACCENT }}
            >
              Xong →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function HorsemenView({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: ACCENT }}>
        4 dấu hiệu cần để ý
      </h2>
      <p className="text-sm opacity-60 mb-2">{FRICTION_FRAMING}</p>

      {FOUR_HORSEMEN.map((h) => (
        <CollapsibleSection
          key={h.key}
          title={`${h.ten} → gợi ý`}
          icon={HORSEMAN_ICONS[h.key] ?? '•'}
        >
          <p className="text-sm opacity-80 mb-2">{h.moTa}</p>
          <p className="text-sm" style={{ color: ACCENT }}>
            {h.antidote}
          </p>
        </CollapsibleSection>
      ))}

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3 rounded-xl text-sm text-white mt-2"
        style={{ background: ACCENT }}
      >
        Kiểm tra lại với vợ/chồng →
      </button>
    </div>
  )
}

function CheckInView({
  choice,
  onChoose,
  onReset,
  painId,
  typePair,
}: {
  choice: CheckInChoice | null
  onChoose: (c: CheckInChoice) => void
  onReset: () => void
  painId: PainId | null
  typePair?: string
}) {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: ACCENT }}>
        Chuyện với vợ/chồng đỡ chưa?
      </h2>

      {!choice ? (
        <div className="flex flex-col gap-3 mt-4">
          {CHECKIN_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChoose(opt.id)}
              className="p-4 rounded-xl border text-sm text-left"
              style={{ borderColor: `${ACCENT}44` }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className="p-4 rounded-xl text-sm leading-relaxed"
            style={{ background: `${ACCENT}11` }}
          >
            {CHECKIN_RESPONSES[choice]}
          </div>

          {choice === 'new' && (
            <button
              type="button"
              onClick={onReset}
              className="w-full py-3 rounded-xl text-sm"
              style={{ background: `${ACCENT}22`, color: ACCENT }}
            >
              Chọn chủ đề khác →
            </button>
          )}

          <SanTapPortal
            label="Luyện tình huống vợ/chồng"
            sublabel="Thực hành từ những gì vừa đọc"
            context={{
              module: 'MA',
              maContext: 'spouse',
              painId: painId ?? undefined,
              typePair,
            }}
            accent={ACCENT}
          />

          <button
            type="button"
            onClick={() => navigate('/match/chat')}
            className="w-full text-xs opacity-50 hover:opacity-80 text-center py-2"
            style={{ color: ACCENT }}
          >
            Muốn nói sâu hơn? Mở Match Chat →
          </button>
        </div>
      )}
    </div>
  )
}
