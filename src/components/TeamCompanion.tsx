import { useState, type CSSProperties, type ReactNode } from 'react'
import {
  assignRoles,
  diagnoseBlocker,
  planDeadline,
  processCheckIn,
} from '../data/team-companion'
import type { TeamProfile } from '../db/tncb-db'
import { updateTeamProfile } from '../db/tncb-db'

type CompanionStep =
  | 'menu'
  | 'role-input'
  | 'role-result'
  | 'unblock-result'
  | 'deadline-input'
  | 'deadline-result'
  | 'checkin-input'
  | 'checkin-result'

interface Props {
  team: TeamProfile
  teamId: number
}

const accent = '#A8E63D'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  padding: 16,
  marginBottom: 10,
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  fontSize: 14,
  boxSizing: 'border-box',
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

function BackBtn({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        color: 'rgba(255,255,255,0.4)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        marginBottom: 12,
        padding: 0,
        fontFamily: 'inherit',
      }}
    >
      ← Quay lại
    </button>
  )
}

function HonestNote({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
        marginTop: 12,
        fontStyle: 'italic',
        lineHeight: 1.5,
      }}
    >
      ℹ️ {text}
    </p>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: 14 }}>
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

function BulletLine({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
      <span style={{ color: accent, flexShrink: 0 }}>→</span>
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  )
}

export function TeamCompanion({ team, teamId }: Props) {
  const [step, setStep] = useState<CompanionStep>('menu')
  const [projectInput, setProjectInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')
  const [statusInput, setStatusInput] = useState('')
  const [checkInStatus, setCheckInStatus] = useState<
    'done' | 'partial' | 'stuck'
  >('partial')
  const [result, setResult] = useState<unknown>(null)
  const [milestones, setMilestones] = useState(team.milestones ?? [])

  function back() {
    setStep('menu')
    setResult(null)
  }

  if (step === 'menu') {
    const menuItems = [
      {
        icon: '📋',
        label: 'Phân vai theo điểm mạnh',
        step: 'role-input' as CompanionStep,
      },
      {
        icon: '🚧',
        label: 'Giải quyết đội đang kẹt',
        step: 'unblock-result' as CompanionStep,
      },
      {
        icon: '⏰',
        label: 'Chuẩn bị cho deadline gấp',
        step: 'deadline-input' as CompanionStep,
      },
      {
        icon: '🔄',
        label: 'Cập nhật tiến độ + gợi ý tiếp',
        step: 'checkin-input' as CompanionStep,
      },
    ]
    return (
      <div style={{ padding: '12px 0' }}>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 14,
          }}
        >
          Bạn cần gì cho đội hôm nay?
        </p>
        {menuItems.map((item) => (
          <button
            key={item.step}
            type="button"
            onClick={() => {
              if (item.step === 'unblock-result') {
                setResult(
                  diagnoseBlocker(
                    team.members,
                    team.currentBlocker || 'chưa rõ',
                  ),
                )
              }
              setStep(item.step)
            }}
            style={{
              ...cardStyle,
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 14, color: '#fff' }}>{item.label}</span>
          </button>
        ))}
      </div>
    )
  }

  if (step === 'role-input') {
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p style={{ fontSize: 14, color: '#fff', marginBottom: 10 }}>
          Dự án hoặc mục tiêu cần phân vai là gì?
        </p>
        <input
          value={projectInput}
          onChange={(e) => setProjectInput(e.target.value)}
          placeholder="VD: ra mắt tính năng mới · chuẩn bị pitch · chạy campaign..."
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => {
            setResult(assignRoles(team.members, projectInput))
            setStep('role-result')
          }}
          disabled={!projectInput.trim()}
          style={{
            ...primaryBtn(),
            marginTop: 12,
            opacity: projectInput.trim() ? 1 : 0.5,
          }}
        >
          Phân vai
        </button>
      </div>
    )
  }

  if (step === 'role-result' && result) {
    const assignments = result as ReturnType<typeof assignRoles>
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p
          style={{
            fontSize: 13,
            color: accent,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          📋 Phân vai cho &quot;{projectInput}&quot;
        </p>
        {assignments.map((a, i) => (
          <div key={i} style={cardStyle}>
            <p
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {a.member.name}{' '}
              <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                ({a.member.mbti})
              </span>
            </p>
            <p style={{ fontSize: 13, color: accent, marginBottom: 4 }}>
              → {a.suggestedRoles.join(' · ')}
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              {a.rationale}
            </p>
          </div>
        ))}
        <HonestNote text="Đây là gợi ý theo xu hướng type — bạn hiểu người thật trong đội hơn. Điều chỉnh theo thực tế." />
      </div>
    )
  }

  if (step === 'unblock-result' && result) {
    const r = result as ReturnType<typeof diagnoseBlocker>
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p
          style={{
            fontSize: 13,
            color: accent,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          🚧 Gỡ kẹt cho đội
        </p>
        <div style={cardStyle}>
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: 4,
            }}
          >
            Chẩn đoán
          </p>
          <p style={{ fontSize: 14, color: '#fff', margin: 0 }}>{r.diagnosis}</p>
        </div>
        <p
          style={{
            fontSize: 13,
            color: accent,
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          3 cách điều phối:
        </p>
        {r.actions.map((a, i) => (
          <div key={i} style={{ ...cardStyle, display: 'flex', gap: 10 }}>
            <span style={{ color: accent, flexShrink: 0 }}>{i + 1}.</span>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {a}
            </p>
          </div>
        ))}
        <HonestNote text="Chọn 1 cách thử trước — không cần làm cả 3 cùng lúc." />
      </div>
    )
  }

  if (step === 'deadline-input') {
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p style={{ fontSize: 14, color: '#fff', marginBottom: 8 }}>
          Deadline là gì?
        </p>
        <input
          value={deadlineInput}
          onChange={(e) => setDeadlineInput(e.target.value)}
          placeholder="VD: demo cho khách thứ 6 tuần này"
          style={{ ...inputStyle, marginBottom: 12 }}
        />
        <p style={{ fontSize: 14, color: '#fff', marginBottom: 8 }}>
          Tình trạng hiện tại?
        </p>
        <input
          value={statusInput}
          onChange={(e) => setStatusInput(e.target.value)}
          placeholder="VD: 60% xong, còn kẹt phần X"
          style={{ ...inputStyle, marginBottom: 12 }}
        />
        <button
          type="button"
          onClick={() => {
            setResult(planDeadline(team.members, deadlineInput, statusInput))
            setStep('deadline-result')
          }}
          disabled={!deadlineInput.trim()}
          style={{
            ...primaryBtn(),
            opacity: deadlineInput.trim() ? 1 : 0.5,
          }}
        >
          Lên kế hoạch
        </button>
      </div>
    )
  }

  if (step === 'deadline-result' && result) {
    const r = result as ReturnType<typeof planDeadline>
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p
          style={{
            fontSize: 13,
            color: accent,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          ⏰ Kế hoạch deadline
        </p>
        <Section title="Phân vai nhanh">
          {r.planA.map((line, i) => (
            <BulletLine key={i} text={line} />
          ))}
        </Section>
        <Section title="Điều chỉnh nếu thiếu người">
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {r.planB}
          </p>
        </Section>
        <Section title="Rủi ro cần để ý">
          {r.risks.map((risk, i) => (
            <BulletLine key={i} text={risk} />
          ))}
        </Section>
        <div
          style={{
            ...cardStyle,
            borderColor: 'rgba(168,230,61,0.25)',
            background: 'rgba(168,230,61,0.05)',
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: accent,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            ⚡ Làm ngay
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#fff',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {r.quickWin}
          </p>
        </div>
      </div>
    )
  }

  if (step === 'checkin-input') {
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p style={{ fontSize: 14, color: '#fff', marginBottom: 12 }}>
          Tuần trước đội đang kẹt:{' '}
          <em style={{ color: accent }}>
            &quot;{team.currentBlocker || 'không rõ'}&quot;
          </em>
        </p>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 10,
          }}
        >
          Đội đã cải thiện được không?
        </p>
        {(['done', 'partial', 'stuck'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setCheckInStatus(s)}
            style={{
              ...cardStyle,
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              marginBottom: 8,
              borderColor:
                checkInStatus === s ? accent : 'rgba(255,255,255,0.1)',
              color:
                checkInStatus === s ? accent : 'rgba(255,255,255,0.7)',
              fontFamily: 'inherit',
              fontSize: 14,
            }}
          >
            {s === 'done'
              ? '✅ Đã giải quyết được'
              : s === 'partial'
                ? '⏳ Một phần, chưa xong'
                : '❌ Vẫn còn kẹt'}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            void (async () => {
              const r = processCheckIn(
                team.currentBlocker,
                checkInStatus,
                team.members,
              )
              const newMilestone = {
                date: new Date().toISOString(),
                note: r.milestoneNote,
                status: checkInStatus,
              }
              const nextMilestones = [...milestones, newMilestone]
              await updateTeamProfile(teamId, { milestones: nextMilestones })
              setMilestones(nextMilestones)
              setResult(r)
              setStep('checkin-result')
            })()
          }}
          style={{ ...primaryBtn(), marginTop: 4 }}
        >
          Xem gợi ý tiếp
        </button>
      </div>
    )
  }

  if (step === 'checkin-result' && result) {
    const r = result as ReturnType<typeof processCheckIn>
    return (
      <div style={{ padding: '12px 0' }}>
        <BackBtn onBack={back} />
        <p
          style={{
            fontSize: 13,
            color: accent,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          🔄 Tiến độ đội
        </p>
        <div style={cardStyle}>
          <p
            style={{
              fontSize: 14,
              color: '#fff',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {r.acknowledgment}
          </p>
        </div>
        <div
          style={{
            ...cardStyle,
            borderColor: 'rgba(168,230,61,0.25)',
            background: 'rgba(168,230,61,0.05)',
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: accent,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Tuần này nên làm
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#fff',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {r.nextSuggestion}
          </p>
        </div>
        <HonestNote text="Milestone đã lưu. Quay lại đây tuần sau để cập nhật tiếp." />
      </div>
    )
  }

  return null
}
