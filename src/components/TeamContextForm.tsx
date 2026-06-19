import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import {
  getTeamContext,
  saveTeamContext,
  type TeamContext,
  type TeamChallenge,
  type TeamSize,
} from '../db/tncb-db'

const SKIP_SESSION_KEY = 'work-manage-team-context-skipped'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  padding: '18px',
  marginBottom: '16px',
}

const SIZE_OPTIONS: { value: TeamSize; label: string }[] = [
  { value: '1-5', label: '1–5' },
  { value: '6-15', label: '6–15' },
  { value: '16-30', label: '16–30' },
  { value: '30+', label: '30+' },
]

const CHALLENGE_OPTIONS: { value: TeamChallenge; label: string }[] = [
  { value: 'communication', label: 'Giao tiếp / hiểu nhau' },
  { value: 'motivation', label: 'Giữ động lực' },
  { value: 'delegation', label: 'Phân công đúng người' },
  { value: 'retention', label: 'Giữ người giỏi lại' },
]

const SIZE_BADGE_LABEL: Record<TeamSize, string> = {
  '1-5': '~5 người',
  '6-15': '~10 người',
  '16-30': '~20 người',
  '30+': '30+ người',
}

const CHALLENGE_BADGE_LABEL: Record<TeamChallenge, string> = {
  communication: 'Giao tiếp',
  motivation: 'Động lực',
  delegation: 'Phân công',
  retention: 'Giữ người',
}

function chipStyle(active: boolean): CSSProperties {
  return {
    padding: '8px 14px',
    borderRadius: '10px',
    border: active
      ? '1px solid rgba(168,230,61,0.45)'
      : '1px solid rgba(255,255,255,0.12)',
    background: active ? 'rgba(168,230,61,0.12)' : 'rgba(0,0,0,0.2)',
    color: active ? '#A8E63D' : 'rgba(255,255,255,0.65)',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}

export default function TeamContextForm() {
  const [saved, setSaved] = useState<TeamContext | undefined>()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [sessionSkipped, setSessionSkipped] = useState(
    () => sessionStorage.getItem(SKIP_SESSION_KEY) === '1',
  )
  const [size, setSize] = useState<TeamSize>('6-15')
  const [challenge, setChallenge] = useState<TeamChallenge>('motivation')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    const ctx = await getTeamContext()
    setSaved(ctx)
    if (ctx) {
      setSize(ctx.size)
      setChallenge(ctx.challenge)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function handleSave() {
    setSaving(true)
    try {
      await saveTeamContext({ size, challenge })
      sessionStorage.removeItem(SKIP_SESSION_KEY)
      setSessionSkipped(false)
      setEditing(false)
      await load()
    } finally {
      setSaving(false)
    }
  }

  function handleSkip() {
    sessionStorage.setItem(SKIP_SESSION_KEY, '1')
    setSessionSkipped(true)
    setEditing(false)
  }

  if (loading) return null

  if (saved && !editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          padding: '8px 14px',
          borderRadius: '20px',
          border: '1px solid rgba(168,230,61,0.28)',
          background: 'rgba(168,230,61,0.08)',
          color: '#A8E63D',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span>⚡ Đội {SIZE_BADGE_LABEL[saved.size]} · {CHALLENGE_BADGE_LABEL[saved.challenge]}</span>
        <span aria-hidden style={{ opacity: 0.7 }}>
          ✏️
        </span>
      </button>
    )
  }

  if (sessionSkipped && !editing) return null

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.90)',
          }}
        >
          ⚡ Thêm context về đội (tùy chọn)
        </div>
        <button
          type="button"
          onClick={handleSkip}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.40)',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            flexShrink: 0,
          }}
        >
          Bỏ qua
        </button>
      </div>

      <div
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          marginBottom: '16px',
        }}
      />

      <p
        style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.55)',
          margin: '0 0 10px',
        }}
      >
        Đội bạn khoảng bao nhiêu người?
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '18px',
        }}
      >
        {SIZE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setSize(opt.value)}
            style={chipStyle(size === opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p
        style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.55)',
          margin: '0 0 10px',
        }}
      >
        Điều khó nhất với đội hiện tại?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {CHALLENGE_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.75)',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="team-challenge"
              checked={challenge === opt.value}
              onChange={() => setChallenge(opt.value)}
              style={{ accentColor: '#A8E63D' }}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            background: 'rgba(168,230,61,0.90)',
            color: '#0A0A0F',
            fontSize: '14px',
            fontWeight: 700,
            cursor: saving ? 'wait' : 'pointer',
            fontFamily: 'inherit',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'Đang lưu...' : 'Lưu context →'}
        </button>
      </div>
    </div>
  )
}
