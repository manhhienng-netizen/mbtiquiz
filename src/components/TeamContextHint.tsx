import type { CSSProperties } from 'react'

const hintStyle: CSSProperties = {
  marginBottom: '12px',
  padding: '10px 12px 10px 14px',
  borderLeft: '2px solid rgba(168,230,61,0.35)',
  background: 'rgba(168,230,61,0.04)',
  borderRadius: '0 8px 8px 0',
  fontSize: '12px',
  lineHeight: 1.55,
  color: 'rgba(255,255,255,0.55)',
}

export default function TeamContextHint({ text }: { text: string }) {
  return (
    <div style={hintStyle} role="note">
      <span style={{ marginRight: 6 }}>💡</span>
      {text}
    </div>
  )
}
