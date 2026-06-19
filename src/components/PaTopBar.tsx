import { useNavigate } from 'react-router-dom'
import { PA_ACCENT } from './PaShell'

interface PaTopBarProps {
  backLabel: string
  backRoute: string
  title?: string
  roleLabel?: string
  rightText?: string
}

export default function PaTopBar({
  backLabel,
  backRoute,
  title,
  roleLabel,
  rightText,
}: PaTopBarProps) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 18px',
      }}
    >
      <button
        type="button"
        onClick={() => navigate(backRoute)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          padding: 0,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 13,
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 16 }}>←</span>
        <span>{backLabel}</span>
      </button>

      {title ? (
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
      ) : null}

      {roleLabel ? (
        <div
          style={{
            padding: '5px 14px',
            borderRadius: 999,
            border: '1px solid rgba(127,119,221,0.4)',
            color: PA_ACCENT,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {roleLabel}
        </div>
      ) : null}
      {rightText && !roleLabel ? (
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
          {rightText}
        </div>
      ) : null}
      {!roleLabel && !rightText && !title ? (
        <div style={{ width: 60 }} />
      ) : null}
    </div>
  )
}
