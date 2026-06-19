import { useNavigate } from 'react-router-dom'
import { WA_ACCENT } from './WaShell'

interface WaTopBarProps {
  backLabel: string
  backRoute: string
  title?: string
  roleLabel?: string
  rightText?: string
}

function RolePill({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '5px 14px',
        borderRadius: 999,
        border: '1px solid rgba(168,230,61,0.4)',
        color: WA_ACCENT,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  )
}

export default function WaTopBar({
  backLabel,
  backRoute,
  title,
  roleLabel,
  rightText,
}: WaTopBarProps) {
  const navigate = useNavigate()
  const centerPill = !title && roleLabel && rightText
  const rightPill = title && roleLabel
  const loneRightPill = !title && roleLabel && !rightText

  return (
    <div
      style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 18px',
        flexShrink: 0,
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
      ) : centerPill && roleLabel ? (
        <RolePill label={roleLabel} />
      ) : (
        <div />
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          justifyContent: 'flex-end',
          minWidth: 60,
        }}
      >
        {rightPill && roleLabel ? <RolePill label={roleLabel} /> : null}
        {rightText ? (
          <div
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
              maxWidth: 140,
              textAlign: 'right',
            }}
          >
            {rightText}
          </div>
        ) : null}
        {loneRightPill && roleLabel ? <RolePill label={roleLabel} /> : null}
        {!title && !roleLabel && !rightText ? <div style={{ width: 60 }} /> : null}
      </div>
    </div>
  )
}
