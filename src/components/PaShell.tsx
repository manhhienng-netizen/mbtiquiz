import { useMemo, type ReactNode } from 'react'
import { pickRandomBackground } from '../utils/sessionBackground'

export const PA_ACCENT = '#7F77DD'
export const PA_ACCENT_RGBA = (opacity: number) => `rgba(127,119,221,${opacity})`

interface PaShellProps {
  children: ReactNode
  scrollable?: boolean
}

export default function PaShell({ children, scrollable = true }: PaShellProps) {
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
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: -110,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(127,119,221,0.20) 0%, rgba(127,119,221,0.06) 50%, rgba(127,119,221,0) 70%)',
          filter: 'blur(85px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -60,
          right: -40,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 50%, rgba(167,139,250,0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(140% 90% at 50% 15%, transparent 60%, rgba(0,0,0,0.38) 100%)',
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
