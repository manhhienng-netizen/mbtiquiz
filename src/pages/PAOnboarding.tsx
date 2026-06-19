import { useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import {
  getQ2Options,
  mapOnboardingToDomains,
  needsQ2,
  PA_ACCENT,
  Q1_OPTIONS,
  type Q1Choice,
} from '../data/pa-domains'
import { savePAPrefs } from '../db/tncb-db'

type Step = 1 | 2 | 3

const chipBase: CSSProperties = {
  padding: '10px 14px',
  borderRadius: 12,
  fontSize: 14,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'border-color 0.15s, background 0.15s',
}

function chipStyle(selected: boolean): CSSProperties {
  return {
    ...chipBase,
    border: selected
      ? `1px solid ${PA_ACCENT}`
      : '1px solid rgba(255,255,255,0.12)',
    background: selected ? 'rgba(127,119,221,0.15)' : 'rgba(255,255,255,0.04)',
    color: selected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
  }
}

export default function PAOnboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>(1)
  const [q1, setQ1] = useState<Q1Choice[]>([])
  const [q2, setQ2] = useState<string[]>([])
  const [q3, setQ3] = useState('')
  const [saving, setSaving] = useState(false)

  const q2Options = getQ2Options(q1)
  const showQ2 = step === 2 && needsQ2(q1)

  const toggleQ1 = (choice: Q1Choice) => {
    setQ1((prev) =>
      prev.includes(choice)
        ? prev.filter((item) => item !== choice)
        : [...prev, choice],
    )
  }

  const toggleQ2 = (id: string) => {
    setQ2((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const goNextFromQ1 = () => {
    if (q1.length === 0) return
    if (needsQ2(q1)) {
      setQ2([])
      setStep(2)
      return
    }
    setStep(3)
  }

  const goNextFromQ2 = () => {
    if (q2.length === 0) return
    setStep(3)
  }

  const finish = async () => {
    if (saving) return
    setSaving(true)
    try {
      const selectedDomains = mapOnboardingToDomains(q1, q2)
      await savePAPrefs({
        selectedDomains,
        onboardingDone: true,
        onboardingAnswers: {
          q1: q1.join(','),
          q2: q2.join(','),
          q3: q3.trim() || undefined,
        },
      })
      navigate('/assistant', { replace: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <AtmosphericPage
      overlay="light"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{
        minHeight: '100dvh',
        padding: '48px 20px 32px',
        maxWidth: 420,
        margin: '0 auto',
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: 12,
        }}
      >
        Bước {step} / 3
      </p>

      {step === 1 ? (
        <>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.3,
              margin: '0 0 8px',
            }}
          >
            Bạn đang quan tâm nhất điều gì lúc này?
          </h1>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 20,
            }}
          >
            Chọn một hoặc nhiều — có thể đổi sau trong cài đặt.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {Q1_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleQ1(opt.id)}
                style={chipStyle(q1.includes(opt.id))}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={goNextFromQ1}
            disabled={q1.length === 0}
            style={{
              marginTop: 28,
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              border: 'none',
              background: q1.length > 0 ? PA_ACCENT : 'rgba(255,255,255,0.08)',
              color: q1.length > 0 ? '#fff' : 'rgba(255,255,255,0.35)',
              fontSize: 15,
              fontWeight: 600,
              cursor: q1.length > 0 ? 'pointer' : 'default',
              fontFamily: 'inherit',
            }}
          >
            Tiếp tục
          </button>
        </>
      ) : null}

      {showQ2 ? (
        <>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.3,
              margin: '0 0 8px',
            }}
          >
            Mảng nào bạn quan tâm nhất?
          </h1>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 20,
            }}
          >
            Chọn ít nhất một mảng cụ thể hơn.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {q2Options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleQ2(opt.id)}
                style={chipStyle(q2.includes(opt.id))}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                flex: 1,
                padding: '14px 16px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 15,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={goNextFromQ2}
              disabled={q2.length === 0}
              style={{
                flex: 2,
                padding: '14px 16px',
                borderRadius: 12,
                border: 'none',
                background: q2.length > 0 ? PA_ACCENT : 'rgba(255,255,255,0.08)',
                color: q2.length > 0 ? '#fff' : 'rgba(255,255,255,0.35)',
                fontSize: 15,
                fontWeight: 600,
                cursor: q2.length > 0 ? 'pointer' : 'default',
                fontFamily: 'inherit',
              }}
            >
              Tiếp tục
            </button>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.3,
              margin: '0 0 8px',
            }}
          >
            Có điều gì bạn đang băn khoăn hoặc muốn tìm hiểu không?
          </h1>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 16,
            }}
          >
            Tùy chọn — giúp trợ lý hiểu bạn hơn một chút.
          </p>
          <textarea
            value={q3}
            onChange={(e) => setQ3(e.target.value)}
            placeholder="VD: Mình hay lo lắng quá nhiều..."
            rows={4}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 14,
              lineHeight: 1.5,
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button
              type="button"
              onClick={() => setStep(needsQ2(q1) ? 2 : 1)}
              style={{
                flex: 1,
                padding: '14px 16px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 15,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              Quay lại
            </button>
            <button
              type="button"
              onClick={() => void finish()}
              disabled={saving}
              style={{
                flex: 1,
                padding: '14px 16px',
                borderRadius: 12,
                border: 'none',
                background: 'rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              Bỏ qua
            </button>
            <button
              type="button"
              onClick={() => void finish()}
              disabled={saving}
              style={{
                flex: 2,
                padding: '14px 16px',
                borderRadius: 12,
                border: 'none',
                background: PA_ACCENT,
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'inherit',
                cursor: saving ? 'default' : 'pointer',
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? 'Đang lưu…' : 'Bắt đầu'}
            </button>
          </div>
        </>
      ) : null}
    </AtmosphericPage>
  )
}
