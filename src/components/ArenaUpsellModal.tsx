import type { CSSProperties } from 'react'

const accent = '#A8E63D'

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  background: 'rgba(0,0,0,0.65)',
}

const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: 360,
  background: '#0A0A0F',
  border: '1px solid rgba(168,230,61,0.25)',
  borderRadius: 14,
  padding: 20,
  fontFamily: "'Be Vietnam Pro', sans-serif",
}

const btnPrimary: CSSProperties = {
  flex: 1,
  padding: '10px 0',
  borderRadius: 8,
  background: accent,
  color: '#0A0A0F',
  fontWeight: 600,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  opacity: 0.4,
}

const btnText: CSSProperties = {
  flex: 1,
  padding: '10px 0',
  borderRadius: 8,
  background: 'transparent',
  color: 'rgba(255,255,255,0.7)',
  fontWeight: 500,
  fontSize: 14,
  border: '1px solid rgba(255,255,255,0.15)',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export interface ArenaUpsellModalProps {
  onClose: () => void
  onReplayPool: () => void
}

export function ArenaUpsellModal({ onClose, onReplayPool }: ArenaUpsellModalProps) {
  return (
    <div
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="arena-upsell-title"
      onClick={onClose}
    >
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <h3
          id="arena-upsell-title"
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#fff',
            margin: '0 0 8px',
          }}
        >
          Sân tập thông minh
        </h3>
        <p
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.65,
            margin: '0 0 16px',
          }}
        >
          Sau mỗi lần bạn xử, sân tập sinh tình huống tiếp theo nhắm đúng điểm bạn
          cần luyện thêm — không phải ngẫu nhiên. Luyện sâu hơn, tiến bộ nhanh hơn.
        </p>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            fontStyle: 'italic',
            margin: '0 0 20px',
          }}
        >
          Tính năng đang hoàn thiện — sẽ ra mắt sớm.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" disabled style={btnPrimary}>
            Kích hoạt
          </button>
          <button
            type="button"
            style={btnText}
            onClick={() => {
              onClose()
              onReplayPool()
            }}
          >
            Luyện lại pool
          </button>
        </div>
      </div>
    </div>
  )
}
