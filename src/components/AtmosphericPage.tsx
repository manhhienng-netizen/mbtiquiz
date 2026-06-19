import { useMemo, type CSSProperties, type ReactNode } from 'react'
import { pickRandomBackground } from '../utils/sessionBackground'

export type AtmosphericOverlay = 'light' | 'medium' | 'heavy'

export const ATMOSPHERIC_OVERLAY_LIGHT =
  'linear-gradient(180deg, rgba(7,7,13,0.25) 0%, rgba(7,7,13,0.55) 30%, rgba(7,7,13,0.85) 55%, rgba(7,7,13,1) 75%)'

export const ATMOSPHERIC_OVERLAY_MEDIUM =
  'linear-gradient(180deg, rgba(7,7,13,0.45) 0%, rgba(7,7,13,0.70) 25%, rgba(7,7,13,0.92) 50%, rgba(7,7,13,1) 70%)'

export const ATMOSPHERIC_OVERLAY_HEAVY =
  'linear-gradient(180deg, rgba(7,7,13,0.55) 0%, rgba(7,7,13,0.80) 20%, rgba(7,7,13,0.95) 45%, rgba(7,7,13,1) 65%)'

const OVERLAYS: Record<AtmosphericOverlay, string> = {
  light: ATMOSPHERIC_OVERLAY_LIGHT,
  medium: ATMOSPHERIC_OVERLAY_MEDIUM,
  heavy: ATMOSPHERIC_OVERLAY_HEAVY,
}

export interface AtmosphericPageProps {
  overlay?: AtmosphericOverlay
  children: ReactNode
  style?: CSSProperties
  contentStyle?: CSSProperties
  className?: string
  contentClassName?: string
  fixedHeight?: boolean
}

export default function AtmosphericPage({
  overlay = 'medium',
  children,
  style,
  contentStyle,
  className,
  contentClassName,
  fixedHeight = false,
}: AtmosphericPageProps) {
  const bgFile = useMemo(() => pickRandomBackground(), [])
  const bgUrl = `/assets/backgrounds/${bgFile}`

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minHeight: fixedHeight ? undefined : '100vh',
        height: fixedHeight ? '100dvh' : undefined,
        background: '#07070D',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 18%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: OVERLAYS[overlay],
        }}
      />
      <div
        className={contentClassName}
        style={{
          position: 'relative',
          zIndex: 10,
          minHeight: fixedHeight ? '100%' : '100vh',
          height: fixedHeight ? '100%' : undefined,
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}
