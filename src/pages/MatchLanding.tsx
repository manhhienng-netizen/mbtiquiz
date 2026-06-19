import { useNavigate } from 'react-router-dom'
import MaShell, { MA_ACCENT } from '../components/MaShell'
import MaTopBar from '../components/MaTopBar'

const MATCH_PATHS = [
  {
    iconPng: '/assets/icons/match-profile.png',
    label: 'Match\nProfile',
    route: '/match/profile',
  },
  {
    iconPng: '/assets/icons/MA.png',
    label: 'Match\nChat',
    route: '/match/chat',
  },
  {
    iconPng: '/assets/icons/match-relationships.png',
    label: 'Vào\nquan hệ',
    route: '/match/relationships',
  },
] as const

function renderIcon(item: (typeof MATCH_PATHS)[number]) {
  return (
    <img
      src={item.iconPng}
      alt={item.label.replace('\n', ' ')}
      width={44}
      height={44}
      style={{
        objectFit: 'contain',
        mixBlendMode: 'screen',
      }}
      draggable={false}
    />
  )
}

export default function MatchLanding() {
  const navigate = useNavigate()

  return (
    <MaShell>
      <MaTopBar backLabel="Trang chủ" backRoute="/home" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100dvh - 56px)',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 16,
          }}
        >
          Tâm tính
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: '0 0 16px',
            maxWidth: 320,
          }}
        >
          Hiểu mối quan hệ
          <br />
          của bạn
        </h1>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.60)',
            maxWidth: 300,
            marginBottom: 32,
          }}
        >
          Trò chuyện honest về tương hợp — không phán định, không hype % hợp.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 10,
            padding: '0 20px',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 400,
          }}
        >
          {MATCH_PATHS.map((item) => (
            <button
              key={item.route}
              type="button"
              onClick={() => navigate(item.route)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '16px 8px',
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${MA_ACCENT}33`,
                borderRadius: 14,
                cursor: 'pointer',
                maxWidth: 120,
                fontFamily: 'inherit',
              }}
            >
              {renderIcon(item)}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {item.label.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </MaShell>
  )
}
