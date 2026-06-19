import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaShell from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'

const PA_ACCENT = '#7F77DD'

function hexToRgba(hex: string, op: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${op})`
}

const TILES = [
  { id: 'ban-than', label: 'Hiểu bản thân', icon: '🧠', active: true, route: '/assistant/chat' },
  { id: 'suc-khoe', label: 'Sức khỏe', icon: '🏃', active: true, route: '/assistant/health' },
  { id: 'stress', label: 'Stress', icon: '🧘', active: true, route: '/assistant/stress' },
  { id: 'phap-luat', label: 'Pháp luật', icon: '⚖️', active: true, route: '/assistant/legal' },
  { id: 'giai-tri', label: 'Giải trí', icon: '🎬', active: true, route: '/assistant/entertainment' },
  { id: 'du-lich', label: 'Du lịch', icon: '✈️', active: true, route: '/assistant/travel' },
  { id: 'tai-chinh', label: 'Tài chính', icon: '💰', active: true, route: '/assistant/finance' },
  { id: 'an-vi', label: 'Ẩm thực', icon: '🍜', active: true, route: '/assistant/food' },
  { id: 'phat-trien', label: 'Phát triển', icon: '📚', active: true, route: '/assistant/self-dev' },
  { id: 'xa-hoi', label: 'Xã hội', icon: '🤝', active: true, route: '/assistant/social' },
  { id: 'moi-truong', label: 'Môi trường', icon: '🌍', active: true, route: '/assistant/environment' },
  { id: 'van-hoa', label: 'Văn hóa', icon: '🏛️', active: true, route: '/assistant/culture' },
  { id: 'lich-su', label: 'Lịch sử', icon: '📜', active: true, route: '/assistant/history' },
  { id: 'muc-tieu', label: 'Mục tiêu', icon: '🎯', active: false },
] as const

export default function PALanding() {
  const navigate = useNavigate()
  const [onboardingDone, setOnboardingDone] = useState(
    () => localStorage.getItem('pa_onboarding_done') === 'true',
  )

  return (
    <PaShell>
      <PaTopBar backLabel="Trang chủ" backRoute="/home" />

      <div style={{ padding: '8px 16px 32px' }}>
        {!onboardingDone ? (
          <button
            type="button"
            onClick={() => {
              localStorage.setItem('pa_onboarding_done', 'true')
              setOnboardingDone(true)
            }}
            style={{
              width: '100%',
              textAlign: 'left',
              background: hexToRgba(PA_ACCENT, 0.1),
              border: `1px solid ${hexToRgba(PA_ACCENT, 0.35)}`,
              borderRadius: 16,
              padding: '16px 18px',
              marginBottom: 20,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                marginBottom: 6,
              }}
            >
              Tôi muốn giúp bạn ở những mảng nào?
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
              Chọn để cá nhân hóa trải nghiệm →
            </div>
          </button>
        ) : null}

        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: hexToRgba(PA_ACCENT, 0.7),
              marginBottom: 8,
            }}
          >
            ĐỒNG HÀNH
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.3,
            }}
          >
            Bạn muốn khám phá gì hôm nay?
          </h1>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
          }}
        >
          {TILES.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() =>
                tile.active && 'route' in tile && tile.route
                  ? navigate(tile.route)
                  : undefined
              }
              style={{
                background: tile.active
                  ? hexToRgba(PA_ACCENT, 0.1)
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${
                  tile.active
                    ? hexToRgba(PA_ACCENT, 0.3)
                    : 'rgba(255,255,255,0.08)'
                }`,
                borderRadius: 15,
                padding: '18px 16px',
                cursor: tile.active ? 'pointer' : 'default',
                opacity: tile.active ? 1 : 0.5,
                transition: 'all 180ms ease',
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontFamily: 'inherit',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 28 }}>{tile.icon}</span>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: tile.active ? '#fff' : 'rgba(255,255,255,0.5)',
                    marginBottom: 4,
                  }}
                >
                  {tile.label}
                </div>
                {!tile.active ? (
                  <div
                    style={{ fontSize: 11, color: hexToRgba(PA_ACCENT, 0.5) }}
                  >
                    Sắp có
                  </div>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      </div>
    </PaShell>
  )
}
