import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0F',
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: '16px',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: '26px',
          fontWeight: 700,
          lineHeight: 1.3,
          margin: '0 0 12px',
        }}
      >
        Trang này không tồn tại
      </h1>
      <p
        style={{
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: '28px',
          maxWidth: '280px',
        }}
      >
        Đường dẫn có thể đã đổi hoặc bạn gõ nhầm URL.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '14px 28px',
          borderRadius: '12px',
          background: 'rgba(168,230,61,0.90)',
          color: '#0A0A0F',
          fontSize: '15px',
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Về trang chủ
      </Link>
    </div>
  )
}
