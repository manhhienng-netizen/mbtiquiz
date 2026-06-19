export interface Phase3PromptProps {
  onAccept: () => void
  onSkip: () => void
}

export default function Phase3Prompt({ onAccept, onSkip }: Phase3PromptProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        padding: '28px 24px',
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: 24,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        animation: 'questionIn 0.25s ease both',
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.90)',
          lineHeight: 1.35,
          margin: '0 0 24px',
        }}
      >
        Thêm vài câu để kết quả chính xác hơn?
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          type="button"
          onClick={onAccept}
          style={{
            width: '100%',
            minHeight: 48,
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.90)',
            color: '#07070D',
            fontWeight: 700,
            fontSize: 14,
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          Tiếp tục — thêm 4 câu
        </button>
        <button
          type="button"
          onClick={onSkip}
          style={{
            width: '100%',
            minHeight: 48,
            padding: '12px 24px',
            background: 'transparent',
            color: 'rgba(255,255,255,0.70)',
            fontWeight: 500,
            fontSize: 14,
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          Xem kết quả ngay
        </button>
      </div>
    </div>
  )
}
