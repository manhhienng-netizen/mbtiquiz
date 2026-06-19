import { useState } from 'react'
import AtmosphericPage from './AtmosphericPage'
import { confirmMatchAgeGate } from '../lib/match-age-gate'

interface MatchAgeGateProps {
  onConfirm: () => void
  onBack?: () => void
}

export default function MatchAgeGate({ onConfirm, onBack }: MatchAgeGateProps) {
  const [checked, setChecked] = useState(false)

  function handleContinue() {
    if (!checked) return
    confirmMatchAgeGate()
    onConfirm()
  }

  return (
    <AtmosphericPage
      overlay="heavy"
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
        minHeight: '100dvh',
      }}
    >
      <div
        style={{
          maxWidth: '360px',
          width: '100%',
          padding: '28px 24px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 700,
            margin: '0 0 12px',
            lineHeight: 1.3,
          }}
        >
          Đồng hành tâm tính
        </h1>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          Nội dung tư vấn quan hệ dành cho người từ 18 tuổi trở lên.
        </p>

        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            fontSize: '14px',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            style={{
              marginTop: '3px',
              width: '18px',
              height: '18px',
              accentColor: '#A8E63D',
              flexShrink: 0,
            }}
          />
          <span>Tôi đủ 18 tuổi và muốn tiếp tục</span>
        </label>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!checked}
          style={{
            width: '100%',
            marginTop: '24px',
            padding: '14px 20px',
            borderRadius: '12px',
            border: 'none',
            background: checked ? '#A8E63D' : 'rgba(168,230,61,0.25)',
            color: checked ? '#0A0A0F' : 'rgba(255,255,255,0.4)',
            fontSize: '15px',
            fontWeight: 700,
            cursor: checked ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          Tiếp tục
        </button>
      </div>

      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          style={{
            marginTop: '24px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.40)',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          ← Tâm tính
        </button>
      ) : null}
    </AtmosphericPage>
  )
}
