import { useCallback, useEffect, useState } from 'react'
import CollapsibleSection from '../../components/CollapsibleSection'
import SanTapPortal from '../../components/SanTapPortal'
import { analyzeMAGoal } from '../../lib/match-goal-ai'
import {
  addMatchGoal,
  listMatchGoals,
  updateMatchGoal,
  type MAGoal,
  type MARelationshipType,
} from '../../lib/match-goal'

const REL_LABELS: Record<MARelationshipType, string> = {
  'vo-chong': '💑 Vợ/chồng',
  'bo-me': '👨‍👩‍👧 Bố/mẹ',
  con: '🌱 Con',
  other: '👥 Quan hệ khác',
}

const ACCENT = '#E88B9E'

function goalRelationshipLabel(rel: MARelationshipType): string {
  if (rel === 'vo-chong') return 'vợ/chồng'
  if (rel === 'bo-me') return 'bố/mẹ'
  if (rel === 'con') return 'với con'
  return 'quan hệ khác'
}

const cardStyle = {
  padding: 16,
  borderRadius: 14,
  border: `1px solid ${ACCENT}33`,
  background: 'rgba(255,255,255,0.04)',
  marginBottom: 12,
} as const

export default function MatchGoalTab() {
  const [goals, setGoals] = useState<MAGoal[]>([])
  const [inputText, setInputText] = useState('')
  const [isAnalyzing, setAnalyzing] = useState(false)
  const [activeGoalId, setActiveGoalId] = useState<number | null>(null)
  const [showInput, setShowInput] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const loadGoals = useCallback(async () => {
    const saved = await listMatchGoals()
    setGoals(saved)
  }, [])

  useEffect(() => {
    void loadGoals()
  }, [loadGoals])

  async function handleSubmitGoal() {
    const text = inputText.trim()
    if (!text) return

    setSubmitError(null)
    setAnalyzing(true)
    try {
      const analysis = await analyzeMAGoal(text)
      const now = Date.now()
      const newGoal: Omit<MAGoal, 'id'> = {
        rawGoal: text,
        reframedGoal: analysis.reframedGoal,
        relationship: analysis.relationship,
        milestones: analysis.milestones,
        sanTapScenario: analysis.sanTapScenario,
        createdAt: now,
        updatedAt: now,
      }
      const id = await addMatchGoal(newGoal)
      if (id == null) {
        setSubmitError('Chưa lưu được — thử lại sau.')
        return
      }
      const saved: MAGoal = { ...newGoal, id }
      setGoals((prev) => [saved, ...prev])
      setInputText('')
      setShowInput(false)
      setActiveGoalId(id)
    } catch (e) {
      console.error('analyzeMAGoal error:', e)
      setSubmitError('Chưa phân tích được — thử lại sau.')
    } finally {
      setAnalyzing(false)
    }
  }

  async function toggleMilestone(goalId: number, milestoneId: string) {
    const goal = goals.find((g) => g.id === goalId)
    if (!goal) return
    const milestones = goal.milestones.map((m) =>
      m.id === milestoneId ? { ...m, done: !m.done } : m,
    )
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, milestones, updatedAt: Date.now() } : g,
      ),
    )
    await updateMatchGoal(goalId, { milestones })
  }

  return (
    <div style={{ paddingBottom: 24 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: ACCENT,
          }}
        >
          Mục tiêu
        </h2>
        <button
          type="button"
          onClick={() => {
            setShowInput((s) => !s)
            setSubmitError(null)
          }}
          style={{
            fontSize: 13,
            padding: '6px 12px',
            borderRadius: 999,
            border: 'none',
            background: `${ACCENT}22`,
            color: ACCENT,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontWeight: 600,
          }}
        >
          {showInput ? 'Hủy' : '+ Thêm'}
        </button>
      </div>

      <p
        style={{
          margin: '0 0 16px',
          fontSize: 13,
          lineHeight: 1.55,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        Hiểu hơn · kết nối khác đi — mục tiêu hướng về việc bạn có thể làm, không
        phải thay đổi người kia.
      </p>

      {showInput ? (
        <div
          style={{
            ...cardStyle,
            borderColor: `${ACCENT}44`,
            marginBottom: 20,
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Ví dụ: &quot;Tôi muốn gần hơn với bố&quot; · &quot;Tôi muốn nói
            chuyện tốt hơn với vợ&quot;
          </p>
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
              setSubmitError(null)
            }}
            placeholder="Tôi muốn..."
            maxLength={200}
            style={{
              width: '100%',
              minHeight: 80,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: 14,
              lineHeight: 1.55,
              color: '#fff',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
              {inputText.length}/200
            </span>
            <button
              type="button"
              onClick={() => void handleSubmitGoal()}
              disabled={isAnalyzing || !inputText.trim()}
              style={{
                fontSize: 13,
                padding: '8px 16px',
                borderRadius: 12,
                border: 'none',
                background: ACCENT,
                color: '#0A0A0F',
                fontWeight: 700,
                cursor:
                  isAnalyzing || !inputText.trim() ? 'not-allowed' : 'pointer',
                opacity: isAnalyzing || !inputText.trim() ? 0.4 : 1,
                fontFamily: 'inherit',
              }}
            >
              {isAnalyzing ? 'Đang phân tích...' : 'Phân tích →'}
            </button>
          </div>
          {submitError ? (
            <p
              style={{
                margin: '10px 0 0',
                fontSize: 13,
                color: '#f5a623',
                lineHeight: 1.5,
              }}
            >
              {submitError}
            </p>
          ) : null}
        </div>
      ) : null}

      {goals.length === 0 && !showInput ? (
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
            padding: '32px 0',
          }}
        >
          Chưa có mục tiêu nào. Thêm để bắt đầu.
        </p>
      ) : null}

      {goals.map((goal) => (
        <div key={goal.id ?? goal.createdAt} style={cardStyle}>
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 999,
                background: `${ACCENT}22`,
                color: ACCENT,
                fontWeight: 600,
              }}
            >
              {REL_LABELS[goal.relationship]}
            </span>
          </div>

          {goal.reframedGoal !== goal.rawGoal ? (
            <div style={{ marginBottom: 12 }}>
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'line-through',
                }}
              >
                {goal.rawGoal}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color: '#fff',
                }}
              >
                {goal.reframedGoal}
              </p>
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Đã re-frame về hành động của bạn
              </p>
            </div>
          ) : (
            <p
              style={{
                margin: '0 0 12px',
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.5,
                color: '#fff',
              }}
            >
              {goal.reframedGoal}
            </p>
          )}

          {goal.milestones.length > 0 ? (
            <CollapsibleSection
              title={`Cột mốc (${goal.milestones.filter((m) => m.done).length}/${goal.milestones.length})`}
              icon="✅"
              defaultOpen={goal.id === activeGoalId}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {goal.milestones.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => goal.id && void toggleMilestone(goal.id, m.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1.4 }}>
                      {m.done ? '✅' : '⬜'}
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: m.done
                          ? 'rgba(255,255,255,0.45)'
                          : 'rgba(255,255,255,0.85)',
                        textDecoration: m.done ? 'line-through' : 'none',
                      }}
                    >
                      {m.action}
                    </span>
                  </button>
                ))}
              </div>
            </CollapsibleSection>
          ) : null}

          <SanTapPortal
            label="Luyện tập liên quan"
            sublabel={`Tình huống ${goalRelationshipLabel(goal.relationship)}`}
            context={{
              module: 'MA',
              maContext: 'goal',
              painId: goal.relationship,
              scenario: goal.sanTapScenario,
            }}
            accent={ACCENT}
            compact
          />
        </div>
      ))}
    </div>
  )
}
