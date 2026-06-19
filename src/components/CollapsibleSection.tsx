import { useState, type CSSProperties, type ReactNode } from 'react'

interface CollapsibleSectionProps {
  icon?: string
  iconImg?: string
  title: string
  children: ReactNode
  defaultOpen?: boolean
  variant?: 'list' | 'grid'
  /** sm = nested level-2: smaller header, left border, no icon */
  size?: 'md' | 'sm'
}

function renderIcon(iconImg: string | undefined, icon: string | undefined, title: string, size: number) {
  if (iconImg) {
    return (
      <img
        src={iconImg}
        alt={title}
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          mixBlendMode: 'screen',
          filter: 'brightness(1.8)',
        }}
        draggable={false}
      />
    )
  }
  if (icon) {
    return <span style={{ fontSize: size, lineHeight: 1 }}>{icon}</span>
  }
  return null
}

export function CollapsibleSection({
  icon,
  iconImg,
  title,
  children,
  defaultOpen = false,
  variant = 'list',
  size = 'md',
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const isSmall = size === 'sm'

  if (variant === 'grid') {
    const expandedStyle: CSSProperties = {
      gridColumn: '1 / -1',
      padding: '16px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.06)',
    }

    return (
      <>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px 8px',
            minHeight: '80px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            cursor: 'pointer',
            gap: '6px',
            fontFamily: 'inherit',
          }}
        >
          {renderIcon(iconImg, icon, title, 36)}
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
            {open ? '▼' : '▶'}
          </span>
        </button>
        {open ? <div style={expandedStyle}>{children}</div> : null}
      </>
    )
  }

  const containerStyle: CSSProperties = isSmall
    ? {
        borderRadius: '8px',
        borderLeft: '2px solid rgba(255,255,255,0.12)',
        marginBottom: '6px',
        marginLeft: '4px',
        background: 'rgba(255,255,255,0.02)',
      }
    : {
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        marginBottom: '8px',
      }

  const buttonStyle: CSSProperties = isSmall
    ? {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        gap: '8px',
        fontFamily: 'inherit',
      }
    : {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        gap: '8px',
        fontFamily: 'inherit',
      }

  const contentPadding: CSSProperties = isSmall
    ? { padding: '0 12px 10px 14px' }
    : { padding: '0 16px 16px' }

  return (
    <div style={containerStyle}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={buttonStyle}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          {!isSmall ? renderIcon(iconImg, icon, title, 18) : null}
          <span
            style={{
              fontSize: isSmall ? '13px' : '15px',
              fontWeight: isSmall ? 500 : 600,
              color: isSmall ? 'rgba(255,255,255,0.75)' : 'white',
              lineHeight: 1.35,
            }}
          >
            {title}
          </span>
        </span>
        <span
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '11px',
            flexShrink: 0,
          }}
        >
          {open ? '▼' : '▶'}
        </span>
      </button>

      {open ? <div style={contentPadding}>{children}</div> : null}
    </div>
  )
}

export default CollapsibleSection
