import { useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'

interface HomeButtonProps {
  bottom: string
}

export default function HomeButton({ bottom }: HomeButtonProps) {
  const navigate = useNavigate()

  const buttonStyle: CSSProperties = {
    position: 'fixed',
    bottom,
    right: 'max(12px, env(safe-area-inset-right, 0px))',
    zIndex: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    padding: 0,
    margin: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    opacity: 0.75,
    transition: 'opacity 0.15s ease',
  }

  return (
    <button
      type="button"
      onClick={() => navigate('/home')}
      aria-label="Về trang chính"
      title="Trang chính"
      style={buttonStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '1'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.75'
      }}
    >
      <img
        src="/assets/icons/home-button.png"
        alt="Trang chủ"
        style={{
          width: 24,
          height: 24,
          objectFit: 'contain',
          mixBlendMode: 'screen',
        }}
      />
    </button>
  )
}
