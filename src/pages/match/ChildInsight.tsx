import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MaShell from '../../components/MaShell'
import MaTopBar from '../../components/MaTopBar'
import CollapsibleSection from '../../components/CollapsibleSection'
import SanTapPortal from '../../components/SanTapPortal'
import { getLatestMBTI } from '../../db/tncb-db'
import { CHILD_ADULT_ROLEPLAY_A } from '../../data/match/child/child-adult-roleplay-a'
import { CHILD_ADULT_ROLEPLAY_B } from '../../data/match/child/child-adult-roleplay-b'
import { CHILD_ADULT_TRUTH_STATEMENTS } from '../../data/match/child/child-adult-truth-statements'
import { CHILD_TEEN_ROLEPLAY_A } from '../../data/match/child/child-teen-roleplay-a'
import { CHILD_TEEN_ROLEPLAY_B } from '../../data/match/child/child-teen-roleplay-b'
import { CHILD_TEEN_SAFETY } from '../../data/match/child/child-teen-safety'
import { CHILD_TEEN_TRUTH_STATEMENTS } from '../../data/match/child/child-teen-truth-statements'
import { CHILD_YOUNG_ROLEPLAY_A } from '../../data/match/child/child-young-roleplay-a'
import { CHILD_YOUNG_ROLEPLAY_B } from '../../data/match/child/child-young-roleplay-b'
import { CHILD_YOUNG_TRUTH_STATEMENTS } from '../../data/match/child/child-young-truth-statements'
import {
  CHECKIN_OPTIONS,
  CHECKIN_RESPONSES,
  LUA_OPTIONS,
  clusterToMbti,
  getPainLabels,
  getPainToRpGroup,
  type CheckInChoice,
  type ChildCluster,
  type ChildLua,
  type ChildPainId,
} from '../../data/match/child-static-content'
import {
  CHILD_ADULT_ESTIMATOR_QUESTIONS,
  CHILD_TEEN_ESTIMATOR_QUESTIONS,
  CHILD_YOUNG_ESTIMATOR_QUESTIONS,
  estimateAdultCluster,
  estimateTeenCluster,
  estimateYoungCluster,
} from '../../lib/match/child-estimator'
import {
  MATCH_PAIR_CONTENT,
  type MatchPairContent,
} from '../../lib/match/match-pair-content'

type ChildStep =
  | 'select-lua'
  | 'hook'
  | 'estimator'
  | 'insight'
  | 'roleplay-select'
  | 'roleplay-a'
  | 'roleplay-b'
  | 'safety'
  | 'checkin'

type RpChoice = 'c1' | 'c2' | 'c3'

const ACCENT = '#E88B9E'

const PREV: Partial<Record<ChildStep, ChildStep>> = {
  hook: 'select-lua',
  estimator: 'hook',
  insight: 'estimator',
  'roleplay-select': 'insight',
  'roleplay-a': 'roleplay-select',
  'roleplay-b': 'roleplay-select',
  safety: 'roleplay-b',
  checkin: 'roleplay-select',
}

function getEstimatorQuestions(lua: ChildLua) {
  if (lua === 'young') return CHILD_YOUNG_ESTIMATOR_QUESTIONS
  if (lua === 'teen') return CHILD_TEEN_ESTIMATOR_QUESTIONS
  return CHILD_ADULT_ESTIMATOR_QUESTIONS
}

function getTruthStatements(lua: ChildLua): Record<string, string[]> {
  if (lua === 'young') return CHILD_YOUNG_TRUTH_STATEMENTS
  if (lua === 'teen') return CHILD_TEEN_TRUTH_STATEMENTS
  return CHILD_ADULT_TRUTH_STATEMENTS
}

function getRolePlayAPool(lua: ChildLua) {
  if (lua === 'young') return CHILD_YOUNG_ROLEPLAY_A
  if (lua === 'teen') return CHILD_TEEN_ROLEPLAY_A
  return CHILD_ADULT_ROLEPLAY_A
}

function getRolePlayBPool(lua: ChildLua) {
  if (lua === 'young') return CHILD_YOUNG_ROLEPLAY_B
  if (lua === 'teen') return CHILD_TEEN_ROLEPLAY_B
  return CHILD_ADULT_ROLEPLAY_B
}

function estimateCluster(
  lua: ChildLua,
  answers: Record<string, string>,
): ChildCluster {
  if (lua === 'young') return estimateYoungCluster(answers)
  if (lua === 'teen') return estimateTeenCluster(answers)
  return estimateAdultCluster(answers)
}

function filterRolePlayA(lua: ChildLua, painId: ChildPainId | null) {
  const pool = getRolePlayAPool(lua)
  if (!painId) return pool
  const group = getPainToRpGroup(lua, painId)
  const filtered = pool.filter((c) => c.group === group)
  return filtered.length > 0 ? filtered : pool
}

function filterRolePlayB(lua: ChildLua, painId: ChildPainId | null) {
  const pool = getRolePlayBPool(lua)
  if (!painId) return pool
  const group = getPainToRpGroup(lua, painId)
  const filtered = pool.filter((c) => c.group === group)
  return filtered.length > 0 ? filtered : pool
}

function lookupPairContent(
  userType: string | null,
  childType: string,
): MatchPairContent | null {
  if (!userType) return null
  const key = [userType, childType].sort().join('+')
  return MATCH_PAIR_CONTENT[key] ?? null
}

function getChildSanTapContext(lua: ChildLua | null): {
  maContext: string
  ageGroup?: 'teen'
} {
  if (lua === 'young') return { maContext: 'child-young' }
  if (lua === 'adult') return { maContext: 'child-adult' }
  if (lua === 'teen') return { maContext: 'child-teen', ageGroup: 'teen' }
  return { maContext: 'child-young' }
}

export default function ChildInsight() {
  const navigate = useNavigate()
  const [step, setStep] = useState<ChildStep>('select-lua')
  const [lua, setLua] = useState<ChildLua | null>(null)
  const [painId, setPainId] = useState<ChildPainId | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [qIndex, setQIndex] = useState(0)
  const [cluster, setCluster] = useState<ChildCluster | null>(null)
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

  const rpACases = useMemo(
    () => (lua ? filterRolePlayA(lua, painId) : []),
    [lua, painId],
  )
  const rpBCases = useMemo(
    () => (lua ? filterRolePlayB(lua, painId) : []),
    [lua, painId],
  )

  const typePair = useMemo(() => {
    if (!userMbtiType || !cluster || !lua) return undefined
    const childType = clusterToMbti(lua, cluster)
    return `${userMbtiType}+${childType}`
  }, [userMbtiType, cluster, lua])

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
    if (!cluster || !lua) {
      setPairContent(null)
      return
    }
    const childType = clusterToMbti(lua, cluster)
    setPairContent(lookupPairContent(userMbtiType, childType))
  }, [cluster, lua, userMbtiType])

  const resetForNewLua = useCallback(() => {
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
  }, [])

  const goBack = useCallback(() => {
    if (step === 'select-lua') {
      navigate('/match/relationships')
      return
    }
    const target = PREV[step]
    if (target) setStep(target)
  }, [step, navigate])

  const resetToSelectLua = useCallback(() => {
    setLua(null)
    resetForNewLua()
    setCheckInChoice(null)
    setStep('select-lua')
  }, [resetForNewLua])

  return (
    <MaShell>
      {step === 'select-lua' ? (
        <MaTopBar backLabel="Quan hệ" backRoute="/match/relationships" />
      ) : null}

      <div className="min-h-screen px-4 py-6 max-w-md mx-auto text-white">
        {step !== 'select-lua' ? (
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

        {step === 'select-lua' && (
          <SelectLuaView
            onSelect={(id) => {
              setLua(id)
              resetForNewLua()
              setStep('hook')
            }}
          />
        )}

        {step === 'hook' && lua && (
          <HookView
            lua={lua}
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

        {step === 'estimator' && lua && (
          <EstimatorView
            lua={lua}
            qIndex={qIndex}
            onAnswer={(qId, choiceId) => {
              const next = { ...answers, [qId]: choiceId }
              setAnswers(next)
              const qs = getEstimatorQuestions(lua)
              if (qIndex < qs.length - 1) {
                setQIndex((i) => i + 1)
              } else {
                setCluster(estimateCluster(lua, next))
                setInsightLayer(0)
                setStep('insight')
              }
            }}
          />
        )}

        {step === 'insight' && painId && lua && (
          <InsightView
            lua={lua}
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

        {step === 'roleplay-b' && lua && (
          <RolePlayBView
            cases={rpBCases}
            index={rpBIndex}
            onNext={() => setRpBIndex((i) => i + 1)}
            onDone={() => setStep(lua === 'teen' ? 'safety' : 'checkin')}
          />
        )}

        {step === 'safety' && (
          <SafetyView onContinue={() => setStep('checkin')} />
        )}

        {step === 'checkin' && (
          <CheckInView
            choice={checkInChoice}
            onChoose={setCheckInChoice}
            onReset={resetToSelectLua}
            lua={lua}
            painId={painId}
            typePair={typePair}
          />
        )}
      </div>
    </MaShell>
  )
}

function SelectLuaView({
  onSelect,
}: {
  onSelect: (lua: ChildLua) => void
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2" style={{ color: ACCENT }}>
        Hiểu con hơn
      </h1>
      <p className="text-sm opacity-70 mb-6">Con bạn đang ở giai đoạn nào?</p>
      <div className="flex flex-col gap-3">
        {(
          Object.entries(LUA_OPTIONS) as [
            ChildLua,
            (typeof LUA_OPTIONS)[ChildLua],
          ][]
        ).map(([id, { icon, label, sublabel }]) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="p-4 border text-left transition-all hover:scale-[1.01]"
            style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}11`, borderRadius: 14 }}
          >
            <span className="text-xl mr-3">{icon}</span>
            <span className="font-semibold">{label}</span>
            <span className="text-xs opacity-50 ml-2">{sublabel}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function HookView({
  lua,
  onSelect,
}: {
  lua: ChildLua
  onSelect: (p: ChildPainId) => void
}) {
  const labels = getPainLabels(lua)
  return (
    <div>
      <h2 className="text-xl font-bold mb-2" style={{ color: ACCENT }}>
        {LUA_OPTIONS[lua].icon} {LUA_OPTIONS[lua].label}
      </h2>
      <p className="text-sm opacity-70 mb-6">Chọn điều đang khó với con:</p>
      <div className="grid grid-cols-2 gap-3">
        {(
          Object.entries(labels) as [
            ChildPainId,
            { icon: string; label: string },
          ][]
        ).map(([id, { icon, label }]) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="p-4 border text-left transition-all hover:scale-[1.02]"
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
  lua,
  qIndex,
  onAnswer,
}: {
  lua: ChildLua
  qIndex: number
  onAnswer: (qId: string, choiceId: string) => void
}) {
  const qs = getEstimatorQuestions(lua)
  const q = qs[qIndex]
  if (!q) return null

  return (
    <div>
      <div className="flex gap-1 mb-6">
        {qs.map((_, i) => (
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
        {q.choices.map((ch) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => onAnswer(q.id, ch.id)}
            className="p-4 rounded-xl border text-left text-sm transition-all hover:scale-[1.01]"
            style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0A` }}
          >
            {ch.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function InsightView({
  lua,
  painId,
  layer,
  pairContent,
  userMbtiType,
  onNextLayer,
  onContinue,
}: {
  lua: ChildLua
  painId: ChildPainId
  layer: number
  pairContent: MatchPairContent | null
  userMbtiType: string | null
  onNextLayer: () => void
  onContinue: () => void
}) {
  const truths = getTruthStatements(lua)[painId] ?? []

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: ACCENT }}>
        Có thể hiểu hơn ở đây
      </h2>

      <CollapsibleSection title="Vì sao con vậy" icon="🔍" defaultOpen>
        {pairContent?.dongLuc ? (
          <p className="text-sm leading-relaxed opacity-90">
            {pairContent.dongLuc}
          </p>
        ) : (
          <p className="text-sm opacity-50 italic">
            {userMbtiType
              ? 'Đang tải...'
              : 'Hoàn thiện bài quiz để thấy insight theo cặp.'}
          </p>
        )}
      </CollapsibleSection>

      {layer >= 1 && (
        <CollapsibleSection title="Vùng dễ căng thẳng" icon="⚡">
          <p className="text-sm leading-relaxed opacity-90">
            {pairContent?.vungMaSat ?? 'Đang tải...'}
          </p>
        </CollapsibleSection>
      )}

      {layer >= 2 && truths.length > 0 && (
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
            🔄 Là con một lúc ⭐
          </div>
          <div className="text-xs opacity-60">
            Đặt mình vào góc nhìn của con — hiểu điều con không nói được
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

type RolePlayACase = {
  hook: string
  setup: string
  choices: { id: RpChoice; label: string }[]
  consequences: Record<
    RpChoice,
    { immediate: string; later: string }
  >
  mirrorMoment: string
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
  cases: RolePlayACase[]
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

type RolePlayBCase = {
  hook: string
  setup: string
  reveal: string
  noiSo: string
  checkIn: string
}

function RolePlayBView({
  cases,
  index,
  onNext,
  onDone,
}: {
  cases: RolePlayBCase[]
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
          🔄 Là con một lúc
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
        <p className="text-xs opacity-50 mb-2">Có thể con đang...</p>
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

function SafetyView({ onContinue }: { onContinue: () => void }) {
  const safety = CHILD_TEEN_SAFETY

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold" style={{ color: ACCENT }}>
        Khi nào cần thêm hỗ trợ
      </h2>

      <p className="text-sm leading-relaxed opacity-90">{safety.intro}</p>

      <CollapsibleSection title="Điều bình thường ở tuổi này" icon="🌱">
        <ul className="text-sm leading-relaxed space-y-2 list-disc pl-4">
          {safety.normalSigns.map((sign, i) => (
            <li key={i}>{sign}</li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="Điều đáng chú ý thêm" icon="👀">
        <ul className="text-sm leading-relaxed space-y-2 list-disc pl-4">
          {safety.concernSigns.map((sign, i) => (
            <li key={i}>{sign}</li>
          ))}
        </ul>
        <p className="text-sm mt-3 opacity-80 italic">{safety.framingNote}</p>
      </CollapsibleSection>

      <CollapsibleSection title="Khi nào cần tìm hỗ trợ" icon="🤝">
        <p className="text-sm leading-relaxed">{safety.whenToSeekHelp}</p>
      </CollapsibleSection>

      <div
        className="p-4 rounded-xl text-sm leading-relaxed"
        style={{ background: `${ACCENT}11` }}
      >
        <p>{safety.boundaryNote}</p>
      </div>

      <CollapsibleSection title="Nguồn hỗ trợ" icon="📞">
        <p className="text-sm opacity-70 mb-2">{safety.resources.primary}</p>
        <p className="text-sm leading-relaxed">{safety.resources.fallback}</p>
      </CollapsibleSection>

      <p className="text-sm leading-relaxed opacity-80">{safety.closing}</p>

      <button
        type="button"
        onClick={onContinue}
        className="w-full py-3 rounded-xl text-sm font-medium text-white"
        style={{ background: ACCENT }}
      >
        Tiếp →
      </button>
    </div>
  )
}

function CheckInView({
  choice,
  onChoose,
  onReset,
  lua,
  painId,
  typePair,
}: {
  choice: CheckInChoice | null
  onChoose: (c: CheckInChoice) => void
  onReset: () => void
  lua: ChildLua | null
  painId: ChildPainId | null
  typePair?: string
}) {
  const navigate = useNavigate()
  const sanTapCtx = getChildSanTapContext(lua)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: ACCENT }}>
        Hiểu con hơn một chút chưa?
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
              Chọn lứa khác →
            </button>
          )}

          <SanTapPortal
            label={
              lua === 'teen'
                ? 'Luyện tình huống với con tuổi teen'
                : 'Luyện tình huống với con'
            }
            sublabel="Thực hành từ những gì vừa đọc"
            context={{
              module: 'MA',
              ...sanTapCtx,
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
