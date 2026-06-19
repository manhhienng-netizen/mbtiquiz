import { useMemo, type ReactNode } from 'react'
import { pickRandomBackground } from '../utils/sessionBackground'

export const MA_ACCENT = '#E88B9E'
export const MA_ACCENT_RGBA = (opacity: number) => `rgba(232,139,158,${opacity})`

interface MaShellProps {
  children: ReactNode
  scrollable?: boolean
}

export default function MaShell({ children, scrollable = true }: MaShellProps) {
  const bgUrl = useMemo(
    () => `/assets/backgrounds/${pickRandomBackground()}`,
    [],
  )

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0F',
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: '#fff',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(232,139,158,0.32) 0%, rgba(232,139,158,0.08) 50%, rgba(232,139,158,0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -80,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(192,96,128,0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(130% 80% at 50% 20%, transparent 55%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {scrollable ? (
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            height: '100dvh',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            width: '100%',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
