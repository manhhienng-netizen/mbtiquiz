import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaShell from '../../components/MaShell'
import MaTopBar from '../../components/MaTopBar'
import CollapsibleSection from '../../components/CollapsibleSection'
import SanTapPortal from '../../components/SanTapPortal'
import { getLatestMBTI } from '../../db/tncb-db'
import { PARENT_TRUTH_STATEMENTS } from '../../data/match/parent-truth-statements'
import {
  PARENT_ROLEPLAY_A,
  type ParentRolePlayA,
} from '../../data/match/parent-roleplay-a'
import {
  PARENT_ROLEPLAY_B,
  type ParentRolePlayB,
} from '../../data/match/parent-roleplay-b'
import {
  CHECKIN_OPTIONS,
  CHECKIN_RESPONSES,
  PAIN_LABELS,
  PAIN_TO_RP_GROUP,
  clusterToMbtiType,
  type CheckInChoice,
  type PainId,
  type ParentCluster,
} from '../../data/match/parent-static-content'
import {
  estimateParentCluster,
  PARENT_ESTIMATOR_QUESTIONS,
} from '../../lib/match/parent-estimator'
import {
  MATCH_PAIR_CONTENT,
  type MatchPairContent,
} from '../../lib/match/match-pair-content'

type ParentStep =
  | 'hook'
  | 'estimator'
  | 'insight'
  | 'roleplay-select'
  | 'roleplay-a'
  | 'roleplay-b'
  | 'checkin'

type RpChoice = 'c1' | 'c2' | 'c3'

const ACCENT = '#E88B9E'

const PREV: Partial<Record<ParentStep, ParentStep>> = {
  estimator: 'hook',
  insight: 'estimator',
  'roleplay-select': 'insight',
  'roleplay-a': 'roleplay-select',
  'roleplay-b': 'roleplay-select',
  checkin: 'roleplay-select',
}

function filterRolePlayA(painId: PainId | null): ParentRolePlayA[] {
  if (!painId) return PARENT_ROLEPLAY_A
  const group = PAIN_TO_RP_GROUP[painId]
  const pool = PARENT_ROLEPLAY_A.filter((c) => c.group === group)
  return pool.length > 0 ? pool : PARENT_ROLEPLAY_A
}

function filterRolePlayB(painId: PainId | null): ParentRolePlayB[] {
  if (!painId) return PARENT_ROLEPLAY_B
  const group = PAIN_TO_RP_GROUP[painId]
  const pool = PARENT_ROLEPLAY_B.filter((c) => c.group === group)
  return pool.length > 0 ? pool : PARENT_ROLEPLAY_B
}

function lookupPairContent(
  userType: string | null,
  parentType: string,
): MatchPairContent | null {
  if (!userType) return null
  const key = [userType, parentType].sort().join('+')
  return MATCH_PAIR_CONTENT[key] ?? null
}

export default function ParentInsight() {
  const navigate = useNavigate()
  const [step, setStep] = useState<ParentStep>('hook')
  const [painId, setPainId] = useState<PainId | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [qIndex, setQIndex] = useState(0)
  const [cluster, setCluster] = useState<ParentCluster | null>(null)
  const [userMbtiType, setUserMbtiType] = useState<string | null>(null)
  const [pairContent, setPairContent] = useState<MatchPairContent | null>(null)
  const [insightLayer, setInsightLayer] = useState(0)
  const [rpAIndex, setRpAIndex] = useState(0)
  const [rpAPhase, setRpAPhase] = useState<'setup' | 'chose' | 'mirror'>(
    'setup',
  )
  const [rpAChoice, setRpAChoice] = useState<RpChoice | null>(null)
  const [rpBIndex, setRpBIndex] = useState(0)
  const [checkInChoice, setCheckInChoice] = useState<CheckInChoice | null>(
    null,
  )

  const rpACases = useMemo(() => filterRolePlayA(painId), [painId])
  const rpBCases = useMemo(() => filterRolePlayB(painId), [painId])

  const typePair = useMemo(() => {
    if (!userMbtiType || !cluster) return undefined
    const parentType = clusterToMbtiType(cluster)
    return `${userMbtiType}+${parentType}`
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
    const parentType = clusterToMbtiType(cluster)
    setPairContent(lookupPairContent(userMbtiType, parentType))
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
              if (qIndex < PARENT_ESTIMATOR_QUESTIONS.length - 1) {
                setQIndex((i) => i + 1)
              } else {
                setCluster(estimateParentCluster(next))
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
              setStep('roleplay-b')
            }}
            onSkip={() => setStep('checkin')}
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
            onDone={() => setStep('checkin')}
          />
        )}

        {step === 'roleplay-b' && (
          <RolePlayBView
            cases={rpBCases}
            index={rpBIndex}
            onNext={() => setRpBIndex((i) => i + 1)}
            onDone={() => setStep('checkin')}
          />
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
        Hiểu bố/mẹ bạn hơn
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
        ).map(([id, { icon, label }]) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="p-4 border text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}11`, borderRadius: 14 }}
          >
            <div className="text-2xl mb-2">{icon}</div>
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
  const q = PARENT_ESTIMATOR_QUESTIONS[qIndex]
  if (!q) return null

  return (
    <div>
      <div className="flex gap-1 mb-6">
        {PARENT_ESTIMATOR_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{ background: i <= qIndex ? ACCENT : `${ACCENT}33` }}
          />
        ))}
      </div>
      <p className="text-xs opacity-50 mb-1">
        Ước lượng từ hành vi — không chẩn đoán
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
  const truths = PARENT_TRUTH_STATEMENTS[painId] ?? []

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: ACCENT }}>
        Có thể hiểu hơn ở đây
      </h2>

      <CollapsibleSection title="Vì sao họ vậy" icon="🔍" defaultOpen>
        {pairContent?.dongLuc ? (
          <p className="text-sm leading-relaxed opacity-90">
            {pairContent.dongLuc}
          </p>
        ) : (
          <p className="text-sm opacity-50 italic">
            {userMbtiType
              ? 'Chưa ước lượng được — thử trả lời thêm câu hỏi.'
              : 'Hoàn thiện bài quiz để thấy insight theo cặp cụ thể.'}
          </p>
        )}
      </CollapsibleSection>

      {layer >= 1 && (
        <CollapsibleSection title="Vùng dễ căng thẳng" icon="⚡">
          <p className="text-sm leading-relaxed opacity-90">
            {pairContent?.vungMaSat ?? (
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
          <div className="font-semibold text-sm mb-1">
            🔄 Là bố/mẹ một lúc ⭐
          </div>
          <div className="text-xs opacity-60">
            Đặt mình vào góc nhìn của họ — hiểu điều họ không nói được
          </div>
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="w-full py-2 text-xs opacity-40 hover:opacity-60"
        >
          Bỏ qua, kết thúc →
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
  cases: ParentRolePlayA[]
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
  onNext,
  onDone,
}: {
  cases: ParentRolePlayB[]
  index: number
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
          🔄 Là bố/mẹ một lúc
        </span>
      </div>

      <div
        className="p-4 rounded-xl border"
        style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0A` }}
      >
        <p className="text-xs font-semibold mb-1 opacity-60">{c.hook}</p>
        <p className="text-sm leading-relaxed">{c.setup}</p>
      </div>

      <div
        className="p-4 rounded-xl text-sm leading-relaxed"
        style={{ background: `${ACCENT}15` }}
      >
        <p className="text-xs opacity-50 mb-2">Có thể họ đang...</p>
        <p>{c.reveal}</p>
      </div>

      <p
        className="text-xs opacity-60 italic border-l-2 pl-3"
        style={{ borderColor: ACCENT }}
      >
        Nỗi sợ bên dưới: {c.noiSo}
      </p>

      <div
        className="p-4 rounded-xl border text-sm"
        style={{ borderColor: `${ACCENT}55`, background: `${ACCENT}11` }}
      >
        <p className="font-semibold mb-1" style={{ color: ACCENT }}>
          💬 {c.checkIn}
        </p>
        <p className="text-xs opacity-50 mt-1">
          Đây là ước lượng xu hướng — người thật mới biết chính xác.
        </p>
      </div>

      <div className="flex gap-2">
        {index < cases.length - 1 && (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 py-3 rounded-xl text-sm font-medium"
            style={{ background: `${ACCENT}22`, color: ACCENT }}
          >
            Trường hợp tiếp →
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
        Chuyện với bố/mẹ đỡ hơn chưa?
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
            label="Luyện tình huống với bố/mẹ"
            sublabel="Thực hành từ những gì vừa đọc"
            context={{
              module: 'MA',
              maContext: 'parent',
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
