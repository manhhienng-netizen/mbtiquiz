import { useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import DiscAssessment from './DiscAssessment'
import {
  defaultWorkUserId,
  saveWorkProfile,
  type WorkLevel,
} from '../db/tncb-db'
import { saveDiscProfileToDb } from '../lib/disc-db-helper'
import type { DiscProfile } from '../lib/disc-scoring'

const LEVEL_OPTIONS: {
  value: WorkLevel
  title: string
  hint: string
}[] = [
  { value: 'fresher', title: 'Fresher', hint: 'Mới đi làm (< 2 năm)' },
  { value: 'junior', title: 'Junior', hint: 'Có kinh nghiệm (2-4 năm)' },
  { value: 'senior', title: 'Senior', hint: 'Thâm niên (5+ năm)' },
  { value: 'lead', title: 'Lead', hint: 'Trưởng nhóm / Team lead' },
  { value: 'manager', title: 'Manager', hint: 'Quản lý đội' },
]

const glassCard: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '20px',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  padding: '28px 24px',
}

type SetupPhase = 'form' | 'disc-prompt' | 'disc-quiz'

interface WorkSetupFormProps {
  onComplete: () => void
  onSkip: () => void
}

export default function WorkSetupForm({ onComplete, onSkip }: WorkSetupFormProps) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<SetupPhase>('form')
  const [occupation, setOccupation] = useState('')
  const [level, setLevel] = useState<WorkLevel>('junior')
  const [saving, setSaving] = useState(false)

  async function handleSubmit() {
    if (!occupation.trim() || saving) return
    setSaving(true)
    try {
      await saveWorkProfile({
        userId: defaultWorkUserId(),
        occupation: occupation.trim(),
        level,
        updatedAt: Date.now(),
      })
      setPhase('disc-prompt')
    } finally {
      setSaving(false)
    }
  }

  async function handleDiscDone(profile: DiscProfile) {
    await saveDiscProfileToDb(profile)
    onComplete()
  }

  if (phase === 'disc-quiz') {
    return (
      <DiscAssessment
        onComplete={(profile) => void handleDiscDone(profile)}
        onSkip={onComplete}
      />
    )
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(88, 60, 180, 0.10) 0%, #0A0A0F 55%)',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px', ...glassCard }}>
        <button
          type="button"
          onClick={() => navigate('/work')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '24px',
            padding: 0,
            border: 'none',
            background: 'none',
            color: 'rgba(127, 119, 221, 0.85)',
            fontSize: '14px',
            fontFamily: 'inherit',
            cursor: 'pointer',
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(127, 119, 221, 1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(127, 119, 221, 0.85)'
          }}
        >
          ← Làm việc
        </button>

        {phase === 'disc-prompt' ? (
          <>
            <p
              style={{
                margin: '0 0 4px',
                fontSize: '14px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.90)',
              }}
            >
              Mình có thể tư vấn sát hơn nếu hiểu phong cách làm việc của bạn
            </p>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              12 câu · ~3 phút · có thể bỏ qua
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setPhase('disc-quiz')}
                style={{
                  flex: 1,
                  minWidth: '140px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#A8E63D',
                  color: '#0A0A0F',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Làm thêm 12 câu
              </button>
              <button
                type="button"
                onClick={onComplete}
                style={{
                  flex: 1,
                  minWidth: '100px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Bỏ qua
              </button>
            </div>
          </>
        ) : (
          <>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                margin: '0 0 8px',
                lineHeight: 1.3,
              }}
            >
              Trước khi bắt đầu
            </h1>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.45)',
                margin: '0 0 16px',
              }}
            >
              Bạn cần setup thông tin công việc trước khi dùng Đồng hành công việc.
            </p>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.65)',
                margin: '0 0 24px',
              }}
            >
              Cho tôi biết thêm để tư vấn sát hơn
            </p>

            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '8px',
                letterSpacing: '0.04em',
              }}
            >
              Nghề nghiệp
            </label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="Ví dụ: Product Manager, Sales, Kế toán..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                marginBottom: '6px',
              }}
            />
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.40)',
                margin: '0 0 20px',
              }}
            >
              Nhập nghề của bạn
            </p>

            <div
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '10px',
                letterSpacing: '0.04em',
              }}
            >
              Cấp độ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {LEVEL_OPTIONS.map((opt) => {
                const active = level === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setLevel(opt.value)}
                    style={{
                      textAlign: 'left',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: active
                        ? '1px solid rgba(168,230,61,0.45)'
                        : '1px solid rgba(255,255,255,0.10)',
                      background: active
                        ? 'rgba(168,230,61,0.10)'
                        : 'rgba(255,255,255,0.03)',
                      color: active ? '#A8E63D' : 'rgba(255,255,255,0.80)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>{opt.title}</div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: active
                          ? 'rgba(168,230,61,0.85)'
                          : 'rgba(255,255,255,0.45)',
                        marginTop: '2px',
                      }}
                    >
                      {opt.hint}
                    </div>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={!occupation.trim() || saving}
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '14px',
                borderRadius: '14px',
                border: 'none',
                background:
                  !occupation.trim() || saving
                    ? 'rgba(168,230,61,0.25)'
                    : '#A8E63D',
                color:
                  !occupation.trim() || saving ? 'rgba(255,255,255,0.4)' : '#0A0A0F',
                fontSize: '15px',
                fontWeight: 700,
                cursor: !occupation.trim() || saving ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {saving ? 'Đang lưu...' : 'Bắt đầu'}
            </button>

            <button
              type="button"
              onClick={onSkip}
              style={{
                display: 'block',
                width: '100%',
                marginTop: '14px',
                padding: '8px',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.40)',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Bỏ qua, điền sau
            </button>
          </>
        )}
      </div>
    </div>
  )
}
