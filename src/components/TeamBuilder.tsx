import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { pickRelevantCaseStudy } from '../data/manager-case-studies'
import { analyzeTeam, type TeamReport } from '../data/team-analysis'
import { CaseStudyCard } from './CaseStudyCard'
import { TeamCompanion } from './TeamCompanion'
import {
  loadLatestTeamProfile,
  saveTeamProfile,
  type TeamMember,
  type TeamProfile,
} from '../db/tncb-db'

type Step = 'intro' | 'members' | 'goal' | 'blocker' | 'report'

const accent = '#A8E63D'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  padding: 16,
}

const labelStyle: CSSProperties = {
  fontSize: 14,
  color: '#fff',
  marginBottom: 10,
}

const inputStyle: CSSProperties = {
  flex: 1,
  padding: '8px 12px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  fontSize: 14,
  fontFamily: 'inherit',
}

const removeBtn: CSSProperties = {
  width: 36,
  borderRadius: 8,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: 'rgba(255,255,255,0.5)',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

function primaryBtn(): CSSProperties {
  return {
    width: '100%',
    padding: '10px 0',
    borderRadius: 8,
    background: accent,
    color: '#0A0A0F',
    fontWeight: 600,
    fontSize: 14,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: accent,
          marginBottom: 8,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 1.6,
        marginBottom: 4,
        display: 'flex',
        gap: 8,
      }}
    >
      <span style={{ color: accent }}>•</span>
      <span>{text}</span>
    </p>
  )
}

export function TeamBuilder() {
  const [step, setStep] = useState<Step>('intro')
  const [members, setMembers] = useState<TeamMember[]>([{ name: '', mbti: '' }])
  const [goal, setGoal] = useState('')
  const [blocker, setBlocker] = useState('')
  const [report, setReport] = useState<TeamReport | null>(null)
  const [existing, setExisting] = useState<TeamProfile | null>(null)
  const [savedTeamId, setSavedTeamId] = useState<number | null>(null)
  const [savedTeam, setSavedTeam] = useState<TeamProfile | null>(null)
  const [showCaseExample, setShowCaseExample] = useState(false)

  useEffect(() => {
    loadLatestTeamProfile()
      .then((p) => {
        if (p) setExisting(p)
      })
      .catch(() => {})
  }, [])

  function addMember() {
    setMembers([...members, { name: '', mbti: '' }])
  }

  function updateMember(i: number, field: keyof TeamMember, val: string) {
    const next = [...members]
    next[i] = { ...next[i], [field]: val }
    setMembers(next)
  }

  function removeMember(i: number) {
    setMembers(members.filter((_, idx) => idx !== i))
  }

  async function generateReport() {
    const valid = members.filter(
      (m) => m.name.trim() && m.mbti.trim().length === 4,
    )
    const r = analyzeTeam(valid, goal, blocker)
    setReport(r)
    setStep('report')
    const createdAt = new Date().toISOString()
    const id = await saveTeamProfile({
      members: valid,
      goal,
      currentBlocker: blocker,
      createdAt,
      milestones: [],
    })
    setSavedTeamId(id)
    setSavedTeam({
      id,
      members: valid,
      goal,
      currentBlocker: blocker,
      createdAt,
      milestones: [],
    })
  }

  if (step === 'intro') {
    return (
      <div style={{ padding: '12px 0' }}>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          Mình sẽ giúp bạn nhìn đội theo góc &quot;đạt mục tiêu chung&quot; — đội
          đang mạnh gì, thiếu gì, và{' '}
          <strong style={{ color: accent }}>
            ai trong đội có thể bù cho ai
          </strong>
          . Không xếp hạng, không soi ai yếu.
        </p>
        {existing ? (
          <div style={{ ...cardStyle, marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
              Bạn đã có một đội lưu trước đó ({existing.members.length} người).
            </p>
            <button
              type="button"
              onClick={() => {
                setMembers(existing.members)
                setGoal(existing.goal)
                setBlocker(existing.currentBlocker)
                const r = analyzeTeam(
                  existing.members,
                  existing.goal,
                  existing.currentBlocker,
                )
                setReport(r)
                setSavedTeamId(existing.id ?? null)
                setSavedTeam(existing)
                setStep('report')
              }}
              style={{
                marginTop: 8,
                color: accent,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'inherit',
              }}
            >
              → Xem lại báo cáo đội đó
            </button>
          </div>
        ) : null}
        <button type="button" onClick={() => setStep('members')} style={primaryBtn()}>
          Bắt đầu
        </button>
      </div>
    )
  }

  if (step === 'members') {
    return (
      <div style={{ padding: '12px 0' }}>
        <p style={labelStyle}>
          Đội bạn có những ai? Nhập tên + type MBTI từng người.
        </p>
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 12,
          }}
        >
          Chưa biết type của ai đó? Dùng &quot;Chuẩn bị&quot; → Ước lượng type,
          rồi quay lại đây.
        </p>
        {members.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input
              placeholder="Tên"
              value={m.name}
              onChange={(e) => updateMember(i, 'name', e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="VD: ENFP"
              value={m.mbti}
              onChange={(e) =>
                updateMember(i, 'mbti', e.target.value.toUpperCase())
              }
              maxLength={4}
              style={{ ...inputStyle, maxWidth: 90 }}
            />
            {members.length > 1 ? (
              <button
                type="button"
                onClick={() => removeMember(i)}
                style={removeBtn}
              >
                ×
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          onClick={addMember}
          style={{
            color: accent,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            marginBottom: 16,
            fontFamily: 'inherit',
          }}
        >
          + Thêm người
        </button>
        <button
          type="button"
          onClick={() => setStep('goal')}
          disabled={
            !members.some((m) => m.name.trim() && m.mbti.trim().length === 4)
          }
          style={{
            ...primaryBtn(),
            opacity: members.some(
              (m) => m.name.trim() && m.mbti.trim().length === 4,
            )
              ? 1
              : 0.5,
          }}
        >
          Tiếp
        </button>
      </div>
    )
  }

  if (step === 'goal') {
    return (
      <div style={{ padding: '12px 0' }}>
        <p style={labelStyle}>
          Mục tiêu lớn nhất của đội trong 3 tháng tới là gì?
        </p>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="VD: ra mắt sản phẩm mới · tăng doanh số 30% · xây quy trình ổn định..."
          style={{
            ...inputStyle,
            minHeight: 80,
            width: '100%',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="button"
          onClick={() => setStep('blocker')}
          style={{ ...primaryBtn(), marginTop: 12 }}
        >
          Tiếp
        </button>
      </div>
    )
  }

  if (step === 'blocker') {
    return (
      <div style={{ padding: '12px 0' }}>
        <p style={labelStyle}>
          Hiện tại đội đang kẹt ở đâu nhất? (có thể bỏ qua)
        </p>
        <textarea
          value={blocker}
          onChange={(e) => setBlocker(e.target.value)}
          placeholder="VD: quyết định chậm · thiếu phối hợp · hay miss deadline..."
          style={{
            ...inputStyle,
            minHeight: 80,
            width: '100%',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
        <button
          type="button"
          onClick={() => void generateReport()}
          style={{ ...primaryBtn(), marginTop: 12 }}
        >
          Xem báo cáo đội
        </button>
      </div>
    )
  }

  if (step === 'report' && report) {
    const relevantCase = pickRelevantCaseStudy(blocker, goal)

    return (
      <div style={{ padding: '12px 0' }}>
        <h3 style={{ fontSize: 16, color: '#fff', marginBottom: 16 }}>
          Đội của bạn — Tóm tắt
        </h3>

        <Section title="💪 Đội đang mạnh">
          {report.strengths.map((s, i) => (
            <Bullet key={i} text={s} />
          ))}
        </Section>

        {report.gapsWithCover.length > 0 ? (
          <Section title="🔧 Cần bù để đạt mục tiêu">
            {report.gapsWithCover.map((g, i) => (
              <div key={i} style={{ ...cardStyle, marginBottom: 8 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 4,
                  }}
                >
                  {g.gap}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  <span style={{ color: accent }}>→ </span>
                  {g.suggestion}
                </p>
              </div>
            ))}
          </Section>
        ) : null}

        <Section title="⚠️ Điểm mù chung cần để ý">
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {report.blindSpotRisk}
          </p>
        </Section>

        <div
          style={{
            ...cardStyle,
            borderColor: 'rgba(168,230,61,0.25)',
            background: 'rgba(168,230,61,0.05)',
            marginTop: 12,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: accent,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            ✅ 1 việc nên làm tuần này
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#fff',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {report.oneActionThisWeek}
          </p>
        </div>

        {relevantCase ? (
          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              onClick={() => setShowCaseExample((v) => !v)}
              style={{
                background: 'none',
                border: 'none',
                color: accent,
                fontSize: 13,
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              📖 {showCaseExample ? 'Ẩn ví dụ' : 'Xem ví dụ tương tự'}
            </button>
            {showCaseExample ? (
              <div style={{ marginTop: 10 }}>
                <CaseStudyCard case_={relevantCase} defaultExpanded />
              </div>
            ) : null}
          </div>
        ) : null}

        {savedTeamId && savedTeam ? (
          <div
            style={{
              marginTop: 20,
              paddingTop: 16,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <TeamCompanion team={savedTeam} teamId={savedTeamId} />
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => {
            setStep('intro')
            setReport(null)
            setSavedTeamId(null)
            setSavedTeam(null)
            setShowCaseExample(false)
          }}
          style={{
            marginTop: 16,
            color: 'rgba(255,255,255,0.5)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: 'inherit',
          }}
        >
          ← Làm lại với đội khác
        </button>
      </div>
    )
  }

  return null
}
