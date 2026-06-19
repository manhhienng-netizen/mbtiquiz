import { type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'

type BusinessItem = {
  icon: string
  label: string
  sublabel: string
  route: string
  accent: string
  iconStyle: CSSProperties
}

const BUSINESS_ITEMS: BusinessItem[] = [
  {
    icon: '/assets/icons/business-self.png',
    label: 'Self',
    sublabel: 'Coaching cho chính mình',
    route: '/work/self',
    accent: '#A8E63D',
    iconStyle: {
      mixBlendMode: 'normal',
      borderRadius: '50%',
    },
  },
  {
    icon: '/assets/icons/business-manage.png',
    label: 'Manage',
    sublabel: 'Hỗ trợ người bạn quản lý',
    route: '/work/manage',
    accent: '#A8E63D',
    iconStyle: {
      mixBlendMode: 'lighten',
    },
  },
  {
    icon: '/assets/icons/business-kinh-doanh.png',
    label: 'Kinh doanh',
    sublabel: 'Quan hệ với khách hàng & đối tác',
    route: '/work/kinh-doanh',
    accent: '#D4B880',
    iconStyle: {
      mixBlendMode: 'screen',
    },
  },
  {
    icon: '/assets/icons/work-action.png',
    label: 'Sân tập',
    sublabel: 'Luyện xử tình huống công sở, giỏi dần lên',
    route: '/work/san-tap',
    accent: '#A8E63D',
    iconStyle: {
      mixBlendMode: 'screen',
    },
  },
]

export default function WorkBusiness() {
  const navigate = useNavigate()

  return (
    <AtmosphericPage
      overlay="light"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
    >
      <div style={{ padding: '52px 20px 0' }}>
        <button
          type="button"
          onClick={() => navigate('/work')}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
          }}
        >
          ← Làm việc
        </button>
      </div>

      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '24px 0 40px',
        }}
      >
        <div style={{ padding: '0 20px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              lineHeight: 1.25,
              margin: '0 0 8px',
            }}
          >
            Vào việc
          </h1>
          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.55)',
              margin: '0 0 28px',
            }}
          >
            Chọn hướng bạn cần
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 10,
            padding: '0 20px',
            justifyContent: 'center',
          }}
        >
          {BUSINESS_ITEMS.map((item) => (
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
                border: `1px solid ${item.accent}33`,
                borderRadius: 14,
                cursor: 'pointer',
                maxWidth: 120,
                fontFamily: 'inherit',
              }}
            >
              <img
                src={item.icon}
                alt={item.label}
                style={{
                  width: 52,
                  height: 52,
                  objectFit: 'contain',
                  ...item.iconStyle,
                }}
                draggable={false}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {item.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </AtmosphericPage>
  )
}
