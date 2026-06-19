import type { CSSProperties, ReactNode } from 'react'

const layoutStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 10,
}

interface ChatScreenLayoutProps {
  children: ReactNode
  style?: CSSProperties
}

/** Full-viewport chat column — pins footer to screen bottom (avoids 100dvh / % height gaps). */
export default function ChatScreenLayout({ children, style }: ChatScreenLayoutProps) {
  return <div style={{ ...layoutStyle, ...style }}>{children}</div>
}
