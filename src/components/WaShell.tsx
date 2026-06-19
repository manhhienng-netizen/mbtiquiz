import { useMemo, type ReactNode } from 'react'
import { pickRandomBackground } from '../utils/sessionBackground'

// WA Design Tokens
export const WA_ACCENT = '#A8E63D'
export const WA_ACCENT_RGBA = (opacity: number) => `rgba(168,230,61,${opacity})`

interface WaShellProps {
  children: ReactNode
  scrollable?: boolean
}

export default function WaShell({ children, scrollable = true }: WaShellProps) {
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
          opacity: 0.35,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(168,230,61,0.38) 0%, rgba(168,230,61,0.10) 45%, rgba(168,230,61,0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: -140,
          left: -120,
          width: 340,
          height: 340,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(120,150,200,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 80% at 50% 30%, transparent 50%, rgba(0,0,0,0.55) 100%)',
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
