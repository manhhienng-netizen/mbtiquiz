import { useCallback, useEffect, useState } from 'react'
import SanTapPortal from './SanTapPortal'
import { WA_ACCENT } from './WaShell'
import {
  analyzeChallengeAndSuggestPortal,
  analyzeGoal,
  isForbiddenGoalText,
} from '../lib/work-goal-ai'
import {
  createEmptyGoal,
  getGoal,
  saveGoal,
  type Challenge,
  type Milestone,
  type SkillRoadmap,
  type WorkGoal,
} from '../lib/work-goal'

const sectionStyle = {
  marginBottom: 24,
  padding: '16px',
  borderRadius: 14,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
} as const

const sectionTitleStyle = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: 'rgba(255,255,255,0.4)',
  margin: '0 0 12px',
}

const inputStyle = {
  width: '100%',
  minHeight: 88,
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(0,0,0,0.2)',
  color: '#fff',
  fontSize: 14,
  lineHeight: 1.55,
  fontFamily: 'inherit',
  resize: 'vertical' as const,
  boxSizing: 'border-box' as const,
}

const primaryBtnStyle = {
  marginTop: 12,
  width: '100%',
  padding: '12px 16px',
  borderRadius: 10,
  border: 'none',
  background: WA_ACCENT,
  color: '#0A0A0F',
  fontSize: 14,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const

const ghostBtnStyle = {
  marginTop: 10,
  width: '100%',
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.75)',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const

function mergeGoal(
  base: WorkGoal | null,
  text: string,
  patch: Partial<WorkGoal>,
): WorkGoal {
  const now = new Date().toISOString()
  if (base) {
    return { ...base, ...patch, text, updatedAt: now }
  }
  return { ...createEmptyGoal(text), ...patch, updatedAt: now }
}

export default function WorkGoalTab() {
  const [goalText, setGoalText] = useState('')
  const [roadmap, setRoadmap] = useState<SkillRoadmap | null>(null)
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [goalBase, setGoalBase] = useState<WorkGoal | null>(null)

  const [analyzing, setAnalyzing] = useState(false)
  const [goalError, setGoalError] = useState<string | null>(null)
  const [challengeInput, setChallengeInput] = useState('')
  const [challengeLoading, setChallengeLoading] = useState(false)
  const [challengeError, setChallengeError] = useState<string | null>(null)
  const [newMilestone, setNewMilestone] = useState('')
  const [latestChallenge, setLatestChallenge] = useState<Challenge | null>(null)

  const persist = useCallback(
    async (patch: Partial<WorkGoal>) => {
      const next = mergeGoal(goalBase, goalText.trim(), {
        roadmap: roadmap ?? undefined,
        milestones,
        challenges,
        ...patch,
      })
      setGoalBase(next)
      await saveGoal(next)
      return next
    },
    [goalBase, goalText, roadmap, milestones, challenges],
  )

  useEffect(() => {
    void getGoal().then((g) => {
      if (!g) return
      setGoalBase(g)
      setGoalText(g.text)
      setRoadmap(g.roadmap ?? null)
      setMilestones(g.milestones ?? [])
      setChallenges(g.challenges ?? [])
      const last = g.challenges[g.challenges.length - 1]
      if (last?.suggestion) setLatestChallenge(last)
    })
  }, [])

  async function handleAnalyze() {
    const text = goalText.trim()
    if (text.length < 5) {
      setGoalError('Viết rõ hơn một chút về mục tiêu của bạn nhé.')
      return
    }
    if (isForbiddenGoalText(text)) {
      setGoalError(
        'Hãy đặt mục tiêu về kỹ năng của bạn — ví dụ "Giao tiếp tốt hơn với team" hoặc "Lên manager trong 6 tháng".',
      )
      return
    }

    setGoalError(null)
    setAnalyzing(true)
    const result = await analyzeGoal(text)
    setAnalyzing(false)

    if (!result) {
      setGoalError(
        'Chưa phân tích được — thử diễn đạt mục tiêu theo kỹ năng bạn muốn luyện, không nhắm vào người khác.',
      )
      return
    }

    setRoadmap(result)
    await persist({ text, roadmap: result })
  }

  async function toggleMilestone(id: string) {
    const updated = milestones.map((m) =>
      m.id === id ? { ...m, done: !m.done } : m,
    )
    setMilestones(updated)
    await persist({ milestones: updated })
  }

  async function handleAddMilestone() {
    const text = newMilestone.trim()
    if (!text) return
    const item: Milestone = {
      id: `m-${Date.now()}`,
      text,
      done: false,
      createdAt: new Date().toISOString(),
    }
    const updated = [...milestones, item]
    setMilestones(updated)
    setNewMilestone('')
    await persist({ milestones: updated })
  }

  async function handleChallenge() {
    const text = challengeInput.trim()
    if (text.length < 5) {
      setChallengeError('Kể thêm vài câu về tình huống bạn đang gặp nhé.')
      return
    }
    if (!goalText.trim()) {
      setChallengeError('Đặt mục tiêu trước để WA gợi phù hợp hơn.')
      return
    }

    setChallengeError(null)
    setChallengeLoading(true)
    const result = await analyzeChallengeAndSuggestPortal(goalText.trim(), text)
    setChallengeLoading(false)

    if (!result) {
      setChallengeError('Chưa gợi được — thử mô tả khó khăn cụ thể hơn.')
      return
    }

    const item: Challenge = {
      id: `c-${Date.now()}`,
      text,
      suggestion: result.suggestion,
      portalRole: result.portalRole,
      portalScenario: result.portalScenario,
      createdAt: new Date().toISOString(),
    }
    const updated = [...challenges, item]
    setChallenges(updated)
    setLatestChallenge(item)
    setChallengeInput('')
    await persist({ challenges: updated })
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Mục tiêu của bạn</h3>
        <textarea
          value={goalText}
          onChange={(e) => {
            setGoalText(e.target.value)
            setGoalError(null)
          }}
          placeholder="Bạn muốn đạt gì trong 6–12 tháng tới? Ví dụ: thăng manager, giao việc rõ hơn..."
          style={inputStyle}
        />
        {goalError ? (
          <p style={{ margin: '10px 0 0', fontSize: 13, color: '#f5a623', lineHeight: 1.5 }}>
            {goalError}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => void handleAnalyze()}
          disabled={analyzing}
          style={{
            ...primaryBtnStyle,
            opacity: analyzing ? 0.6 : 1,
            cursor: analyzing ? 'wait' : 'pointer',
          }}
        >
          {analyzing ? 'Đang phân tích...' : 'Phân tích →'}
        </button>
      </section>

      {roadmap && roadmap.skills.length > 0 ? (
        <section style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Lộ trình kỹ năng</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {roadmap.skills.map((step) => (
              <div
                key={`${step.order}-${step.skill}`}
                style={{
                  paddingBottom: 14,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  {step.order}. {step.skill}
                </p>
                <p
                  style={{
                    margin: '0 0 10px',
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Vì sao: {step.why}
                </p>
                {step.role ? (
                  <SanTapPortal
                    label={`Luyện: ${step.skill}`}
                    sublabel="Thực hành ngay trong sân tập"
                    context={{
                      module: 'WA',
                      role: step.role,
                      scenario: step.scenario,
                      relationship: 'WorkGoal',
                    }}
                    accent={WA_ACCENT}
                    compact
                  />
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Cột mốc</h3>
        {milestones.length === 0 ? (
          <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
            Thêm vài việc nhỏ bạn muốn làm trên đường đi.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', margin: '0 0 12px', padding: 0 }}>
            {milestones.map((m) => (
              <li key={m.id} style={{ marginBottom: 10 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    cursor: 'pointer',
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: m.done ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.85)',
                    textDecoration: m.done ? 'line-through' : 'none',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={m.done}
                    onChange={() => void toggleMilestone(m.id)}
                    style={{ marginTop: 4, accentColor: WA_ACCENT }}
                  />
                  <span>{m.text}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handleAddMilestone()
          }}
          placeholder="Ví dụ: Nói chuyện 1:1 với từng người trong team"
          style={{
            ...inputStyle,
            minHeight: 'auto',
            height: 44,
            resize: 'none',
          }}
        />
        <button type="button" onClick={() => void handleAddMilestone()} style={ghostBtnStyle}>
          + Thêm cột mốc
        </button>
      </section>

      <section style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Khó khăn đang gặp</h3>
        <textarea
          value={challengeInput}
          onChange={(e) => {
            setChallengeInput(e.target.value)
            setChallengeError(null)
          }}
          placeholder="Kể tình huống thật đang gặp — ví dụ: team hay trễ deadline, khách đổi ý phút chót..."
          style={inputStyle}
        />
        {challengeError ? (
          <p style={{ margin: '10px 0 0', fontSize: 13, color: '#f5a623', lineHeight: 1.5 }}>
            {challengeError}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => void handleChallenge()}
          disabled={challengeLoading}
          style={{
            ...primaryBtnStyle,
            opacity: challengeLoading ? 0.6 : 1,
            cursor: challengeLoading ? 'wait' : 'pointer',
          }}
        >
          {challengeLoading ? 'Đang gợi...' : 'Gợi cách xử →'}
        </button>

        {latestChallenge?.suggestion ? (
          <div style={{ marginTop: 16 }}>
            <p
              style={{
                margin: '0 0 12px',
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(168,230,61,0.9)',
                fontStyle: 'italic',
              }}
            >
              {latestChallenge.suggestion}
            </p>
            {latestChallenge.portalRole ? (
              <SanTapPortal
                label="→ Luyện tình huống này"
                sublabel="Vào sân tập với bối cảnh phù hợp"
                context={{
                  module: 'WA',
                  role: latestChallenge.portalRole,
                  scenario: latestChallenge.portalScenario,
                  relationship: 'WorkGoal',
                }}
                accent={WA_ACCENT}
                compact
              />
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  )
}
