import type { CSSProperties, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const assistantPageStyle: CSSProperties = {
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  background:
    'radial-gradient(ellipse at 50% 0%, rgba(88, 60, 180, 0.12) 0%, #0A0A0F 55%)',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  color: '#fff',
}

export const assistantCardStyle: CSSProperties = {
  padding: '14px 16px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
}

export const assistantInputStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: '14px',
  lineHeight: 1.5,
  fontFamily: 'inherit',
  outline: 'none',
}

export const assistantPrimaryBtn: CSSProperties = {
  padding: '12px 20px',
  borderRadius: '12px',
  border: 'none',
  background: '#A8E63D',
  color: '#0A0A0F',
  fontSize: '14px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export const assistantGhostBtn: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '12px',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.85)',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export const assistantDangerBtn: CSSProperties = {
  ...assistantGhostBtn,
  border: '1px solid rgba(255,100,100,0.35)',
  color: 'rgba(255,160,160,0.95)',
}

const iconLinkStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.75)',
  textDecoration: 'none',
  fontSize: '18px',
  lineHeight: 1,
}

type AssistantShellProps = {
  title: string
  backTo?: string
  headerExtra?: ReactNode
  children: ReactNode
}

export default function AssistantShell({
  title,
  backTo = '/assistant/chat',
  headerExtra,
  children,
}: AssistantShellProps) {
  const navigate = useNavigate()

  return (
    <div style={assistantPageStyle}>
      <header
        style={{
          flexShrink: 0,
          padding: '16px 16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(backTo)}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '8px',
            padding: 0,
          }}
        >
          ← Đồng hành
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, flex: 1 }}>
            {title}
          </h1>
          <Link
            to="/assistant/weekly"
            title="Nhìn lại tuần"
            style={iconLinkStyle}
            aria-label="Tuần"
          >
            📅
          </Link>
          <Link
            to="/assistant/goals"
            title="Mục tiêu & ghi chú"
            style={iconLinkStyle}
            aria-label="Mục tiêu"
          >
            🎯
          </Link>
          <Link
            to="/assistant/settings"
            title="Cài đặt"
            style={iconLinkStyle}
            aria-label="Cài đặt"
          >
            ⚙
          </Link>
          {headerExtra}
        </div>
      </header>

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        {children}
      </main>
    </div>
  )
}
