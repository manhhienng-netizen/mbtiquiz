import { useNavigate } from 'react-router-dom'

interface SanTapContext {
  module: 'WA' | 'MA' | 'PA'
  role?: string
  typePair?: string
  scenario?: string
  relationship?: string
  maContext?: string
  painId?: string
  ageGroup?: string
}

interface SanTapPortalProps {
  label: string
  sublabel?: string
  context: SanTapContext
  accent: string
  compact?: boolean
}

function buildArenaRoute(context: SanTapContext): string {
  const params = new URLSearchParams()
  if (context.role) params.set('role', context.role)
  if (context.typePair) params.set('typePair', context.typePair)
  if (context.scenario) params.set('scenario', context.scenario)
  if (context.relationship) params.set('relationship', context.relationship)
  if (context.maContext) params.set('maContext', context.maContext)
  if (context.painId) params.set('painId', context.painId)
  if (context.ageGroup) params.set('ageGroup', context.ageGroup)

  switch (context.module) {
    case 'WA':
      return `/work/san-tap/arena?${params.toString()}`
    case 'MA':
      params.set('module', 'MA')
      return `/match/san-tap/session?${params.toString()}`
    case 'PA':
      return `/assistant/chat?${params.toString()}`
    default:
      return `/work/san-tap/arena?${params.toString()}`
  }
}

function hexToRgba(hex: string, opacity: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${opacity})`
}

export default function SanTapPortal({
  label,
  sublabel,
  context,
  accent,
  compact = false,
}: SanTapPortalProps) {
  const navigate = useNavigate()
  const route = buildArenaRoute(context)

  const accentBg = hexToRgba(accent, 0.08)
  const accentBorder = hexToRgba(accent, 0.3)
  const accentArrow = hexToRgba(accent, 0.6)

  return (
    <div
      onClick={() => navigate(route)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(route)
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 10 : 14,
        background: accentBg,
        border: `1px solid ${accentBorder}`,
        borderRadius: compact ? 12 : 16,
        padding: compact ? '10px 12px' : '16px 18px',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        transition: 'all 180ms ease',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: compact ? 32 : 40,
          height: compact ? 32 : 40,
          borderRadius: compact ? 10 : 12,
          flexShrink: 0,
          background: hexToRgba(accent, 0.12),
          border: `1px solid ${hexToRgba(accent, 0.25)}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/assets/icons/santap-train.png"
          alt=""
          aria-hidden
          width={compact ? 32 : 40}
          height={compact ? 32 : 40}
          style={{ mixBlendMode: 'screen', filter: 'brightness(1.8)' }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: compact ? 13 : 14,
            fontWeight: 600,
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          {label}
        </div>
        {sublabel ? (
          <div
            style={{
              fontSize: 12,
              lineHeight: 1.4,
              marginTop: 3,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {sublabel}
          </div>
        ) : null}
      </div>

      <div
        style={{
          fontSize: 18,
          color: accentArrow,
          flexShrink: 0,
          fontWeight: 300,
        }}
      >
        →
      </div>
    </div>
  )
}
