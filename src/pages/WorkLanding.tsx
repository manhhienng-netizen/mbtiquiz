import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'

const WORK_PATHS = [
  {
    icon: '/assets/icons/work-profile.png',
    label: 'Work\nProfile',
    route: '/work/profile',
    accent: '#D4B880',
  },
  {
    icon: '/assets/icons/work-chat.png',
    label: 'Work\nChat',
    route: '/work/chat',
    accent: '#A8E63D',
  },
  {
    icon: '/assets/icons/work-action.png',
    label: 'Vào\nviệc',
    route: '/work/business',
    accent: '#A8E63D',
  },
  {
    icon: '🏋️',
    label: 'Sân\ntập',
    route: '/work/san-tap',
    accent: '#A8E63D',
    isEmoji: true,
    sub: 'Luyện phản xạ',
  },
] as const

export default function WorkLanding() {
  const navigate = useNavigate()

  return (
    <AtmosphericPage
      overlay="light"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <button
        type="button"
        onClick={() => navigate('/home')}
        style={{
          position: 'absolute',
          top: 52,
          left: 20,
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        ← Trang chủ
      </button>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          marginBottom: '16px',
        }}
      >
        Công việc
      </div>

      <h1
        style={{
          fontSize: '32px',
          fontWeight: 700,
          lineHeight: 1.2,
          margin: '0 0 16px',
          maxWidth: '320px',
        }}
      >
        Bạn làm việc
        <br />
        tốt nhất khi nào?
      </h1>

      <p
        style={{
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.60)',
          maxWidth: '300px',
          marginBottom: '32px',
        }}
      >
        Khám phá điểm mạnh, lý do trì hoãn, và môi trường lý tưởng của bạn.
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          padding: '0 20px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 420,
        }}
      >
        {WORK_PATHS.map((p) => (
          <button
            key={p.route}
            type="button"
            onClick={() => navigate(p.route)}
            style={{
              flex: '1 1 40%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '16px 8px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${p.accent}33`,
              borderRadius: 14,
              cursor: 'pointer',
              maxWidth: 120,
              fontFamily: 'inherit',
            }}
          >
            {'isEmoji' in p && p.isEmoji ? (
              <span
                style={{ fontSize: 32, lineHeight: 1, height: 44, display: 'flex', alignItems: 'center' }}
                aria-hidden
              >
                {p.icon}
              </span>
            ) : (
              <img
                src={p.icon}
                alt={p.label.replace('\n', ' ')}
                style={{
                  width: 44,
                  height: 44,
                  objectFit: 'contain',
                  mixBlendMode: 'screen',
                }}
                draggable={false}
              />
            )}
            <div
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.7)',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {p.label.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              {'sub' in p && p.sub ? (
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 2,
                  }}
                >
                  {p.sub}
                </div>
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </AtmosphericPage>
  )
}
