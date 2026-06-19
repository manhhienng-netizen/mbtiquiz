import { useNavigate } from 'react-router-dom'
import MaShell from '../components/MaShell'
import MaTopBar from '../components/MaTopBar'
import CollapsibleSection from '../components/CollapsibleSection'
import P2PInviteEntry from '../components/match/P2PInviteEntry'

const MA_ACCENT = '#E88B9E'

const FAMILY_ROUTES = [
  {
    iconPng: '/assets/icons/match-spouse.png',
    label: 'Vợ/chồng/người yêu',
    route: '/match/relationships/vo-chong',
  },
  {
    iconPng: '/assets/icons/match-child.png',
    label: 'Con',
    route: '/match/relationships/con',
  },
  {
    iconPng: '/assets/icons/match-parent.png',
    label: 'Bố mẹ',
    route: '/match/relationships/bo-me',
  },
] as const

const familyButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
  textAlign: 'left' as const,
  padding: '14px 16px',
  marginBottom: 10,
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${MA_ACCENT}33`,
  borderRadius: 12,
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function MatchRelationships() {
  const navigate = useNavigate()

  return (
    <MaShell>
      <MaTopBar backLabel="Tâm tính" backRoute="/match" />

      <div style={{ padding: '8px 20px 40px' }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 20px',
          }}
        >
          Vào quan hệ
        </h1>
        {/* Mục A */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 10,
            }}
          >
            <img
              src="/assets/icons/match-self.png"
              alt=""
              width={36}
              height={36}
              style={{ mixBlendMode: 'screen', objectFit: 'contain' }}
              draggable={false}
              aria-hidden
            />
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              Hiểu mình trong quan hệ
            </h2>
          </div>
          <CollapsibleSection
            iconImg="/assets/icons/match-self.png"
            title="Gợi ý từ Match Profile"
            defaultOpen={false}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.55)',
                margin: '0 0 12px',
              }}
            >
              Bạn yêu và gắn kết thế nào — sắp có nội dung từ Match Profile.
            </p>
            <button
              type="button"
              onClick={() => navigate('/match/profile')}
              style={{
                padding: '10px 16px',
                borderRadius: 10,
                border: `1px solid ${MA_ACCENT}50`,
                background: 'rgba(232,139,158,0.08)',
                color: MA_ACCENT,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Xem Match Profile trước →
            </button>
          </CollapsibleSection>
        </div>

        {/* Mục B */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <img
              src="/assets/icons/match-family.png"
              alt=""
              width={36}
              height={36}
              style={{ mixBlendMode: 'screen', objectFit: 'contain' }}
              draggable={false}
              aria-hidden
            />
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              Hiểu người thân
            </h2>
          </div>
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 12px',
            }}
          >
            Đang phát triển — chọn để xem trước
          </p>
          {FAMILY_ROUTES.map((item) => (
            <button
              key={item.route}
              type="button"
              onClick={() => navigate(item.route)}
              style={familyButtonStyle}
            >
              <img
                src={item.iconPng}
                alt=""
                width={28}
                height={28}
                style={{ mixBlendMode: 'screen', objectFit: 'contain', flexShrink: 0 }}
                draggable={false}
                aria-hidden
              />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mục C */}
        <section>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <img
              src="/assets/icons/p2p-invite.png"
              alt=""
              width={36}
              height={36}
              style={{ mixBlendMode: 'screen', objectFit: 'contain' }}
              draggable={false}
              aria-hidden
            />
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>
              Kết nối thực
            </h3>
          </div>
          <P2PInviteEntry />
        </section>
      </div>
    </MaShell>
  )
}
