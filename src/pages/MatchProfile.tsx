import { useEffect, useState, type CSSProperties } from 'react'
import MaShell from '../components/MaShell'
import MaTopBar from '../components/MaTopBar'
import MatchGoalTab from './match/MatchGoalTab'

const MA_ACCENT = '#E88B9E'
const MATCH_PROFILE_KEY = 'match_profile_shell'

const STATUS_OPTIONS = ['Độc thân', 'Có đôi', 'Đã kết hôn', 'Có con'] as const
const FOCUS_OPTIONS = ['Vợ/chồng', 'Con', 'Bố mẹ', 'Bạn bè'] as const

type StatusOption = (typeof STATUS_OPTIONS)[number]
type FocusOption = (typeof FOCUS_OPTIONS)[number]
type ProfileTab = 'ho-so' | 'muc-tieu'

interface MatchProfileData {
  status: StatusOption
  focus?: FocusOption
}

function chipStyle(active: boolean): CSSProperties {
  return {
    padding: '10px 16px',
    borderRadius: 999,
    border: active
      ? `1px solid ${MA_ACCENT}80`
      : '1px solid rgba(255,255,255,0.12)',
    background: active ? 'rgba(232,139,158,0.12)' : 'rgba(255,255,255,0.04)',
    color: active ? MA_ACCENT : 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: active ? 600 : 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}

function tabButtonStyle(active: boolean): CSSProperties {
  return {
    flex: 1,
    padding: '8px 10px',
    borderRadius: 10,
    background: active ? 'rgba(232,139,158,0.15)' : 'rgba(255,255,255,0.04)',
    border: active
      ? `1px solid ${MA_ACCENT}66`
      : '1px solid rgba(255,255,255,0.08)',
    color: active ? MA_ACCENT : 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}

export default function MatchProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>('ho-so')
  const [status, setStatus] = useState<StatusOption | null>(null)
  const [focus, setFocus] = useState<FocusOption | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem(MATCH_PROFILE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as MatchProfileData
      if (parsed.status) {
        setStatus(parsed.status)
        setFocus(parsed.focus ?? null)
        setSubmitted(true)
      }
    } catch {
      sessionStorage.removeItem(MATCH_PROFILE_KEY)
    }
  }, [])

  function handleSubmit() {
    if (!status) return
    const data: MatchProfileData = { status, ...(focus ? { focus } : {}) }
    sessionStorage.setItem(MATCH_PROFILE_KEY, JSON.stringify(data))
    setSubmitted(true)
  }

  const profileTabContent = !submitted ? (
    <>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 10px',
        }}
      >
        Tình trạng
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 24,
        }}
      >
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setStatus(opt)}
            style={chipStyle(status === opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 10px',
        }}
      >
        Ai bạn quan tâm nhất lúc này? (tuỳ chọn)
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 28,
        }}
      >
        {FOCUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setFocus(focus === opt ? null : opt)}
            style={chipStyle(focus === opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!status}
        style={{
          width: '100%',
          padding: '14px 16px',
          borderRadius: 14,
          border: 'none',
          background: status
            ? 'rgba(232,139,158,0.90)'
            : 'rgba(232,139,158,0.25)',
          color: status ? '#0A0A0F' : 'rgba(255,255,255,0.4)',
          fontSize: 15,
          fontWeight: 700,
          cursor: status ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit',
        }}
      >
        Lưu và xem gợi ý
      </button>
    </>
  ) : (
    <div
      style={{
        padding: 20,
        borderRadius: 14,
        background: 'rgba(255,255,255,0.05)',
        border: `1px solid ${MA_ACCENT}40`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'workProfileFadeSlideIn 0.3s ease',
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: MA_ACCENT,
          margin: '0 0 8px',
        }}
      >
        Match Profile
      </p>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          margin: '0 0 8px',
          lineHeight: 1.35,
        }}
      >
        Hiểu bạn trong quan hệ — đang cập nhật
      </h2>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.55)',
          margin: 0,
        }}
      >
        {status}
        {focus ? ` · quan tâm ${focus.toLowerCase()}` : ''}. Nội dung chi tiết sẽ
        có trong đợt tiếp theo.
      </p>
      <button
        type="button"
        onClick={() => setSubmitted(false)}
        style={{
          marginTop: 16,
          padding: 0,
          border: 'none',
          background: 'none',
          color: 'rgba(255,255,255,0.45)',
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
        }}
      >
        Sửa lại
      </button>
    </div>
  )

  return (
    <MaShell>
      <MaTopBar backLabel="Tâm tính" backRoute="/match" />

      <div style={{ padding: '8px 20px 40px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Match Profile
        </div>

        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '8px 0 8px',
          }}
        >
          Bạn trong quan hệ
        </h1>

        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 20px',
          }}
        >
          Khai báo nhanh — giúp gợi ý phù hợp hơn sau này.
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(
            [
              { id: 'ho-so' as const, label: 'Hồ sơ' },
              { id: 'muc-tieu' as const, label: 'Mục tiêu' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={tabButtonStyle(activeTab === tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'muc-tieu' ? <MatchGoalTab /> : profileTabContent}
      </div>
    </MaShell>
  )
}
