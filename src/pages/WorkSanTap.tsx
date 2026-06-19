import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import WaShell, { WA_ACCENT } from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import { getStoredCompleted } from '../lib/arena-session'
import type { CaseRole } from '../data/roleplay-case-studies'

const ROLE_ENTRIES: {
  role: CaseRole
  icon: string
  label: string
  sub: string
}[] = [
  { role: 'NV', icon: '/assets/icons/arena-role-nv.png', label: 'Nhân viên', sub: 'Góc nhân viên' },
  { role: 'MG', icon: '/assets/icons/arena-role-mg.png', label: 'Quản lý', sub: 'Góc quản lý' },
  { role: 'KH', icon: '/assets/icons/arena-role-kh.png', label: 'Khách hàng', sub: 'Góc khách hàng' },
  { role: 'VT', icon: '/assets/icons/arena-role-vt.png', label: 'Chuyển vai', sub: 'Đổi vai trò' },
]

const roleButtonStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'flex-start',
  gap: 4,
  width: '100%',
  textAlign: 'left' as const,
  padding: '16px 18px',
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${WA_ACCENT}33`,
  borderRadius: 14,
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function WorkSanTap() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const practicedCount = getStoredCompleted().length

  useEffect(() => {
    if (searchParams.get('resume') === 'true') {
      navigate('/work/san-tap/arena?resume=true', { replace: true })
      return
    }
    if (searchParams.get('mode') === 'smart') {
      const q = new URLSearchParams({ mode: 'smart' })
      const type = searchParams.get('type')
      if (type) q.set('type', type)
      navigate(`/work/san-tap/arena?${q.toString()}`, { replace: true })
    }
  }, [navigate, searchParams])

  return (
    <WaShell>
      <WaTopBar backLabel="Làm việc" backRoute="/work" />

      <div style={{ padding: '8px 20px 40px' }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 8px',
          }}
        >
          Sân tập
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 8px',
          }}
        >
          Luyện phản xạ qua tình huống thực
        </p>
        {practicedCount > 0 ? (
          <p
            style={{
              fontSize: 12,
              color: 'rgba(168,230,61,0.65)',
              margin: '0 0 20px',
            }}
          >
            {practicedCount} tình huống đã luyện
          </p>
        ) : (
          <div style={{ marginBottom: 20 }} />
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
          {ROLE_ENTRIES.map((entry) => (
            <button
              key={entry.role}
              type="button"
              onClick={() => navigate(`/work/san-tap/arena?role=${entry.role}`)}
              style={roleButtonStyle}
            >
              <img
                src={entry.icon}
                alt=""
                width={44}
                height={44}
                aria-hidden
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.8)' }}
              />
              <span style={{ fontSize: 15, fontWeight: 600 }}>{entry.label}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                {entry.sub}
              </span>
            </button>
          ))}
        </div>

        <div style={{ paddingTop: 24, textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/work/san-tap/progress')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(168,230,61,0.7)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Xem bản đồ phản xạ →
          </button>
        </div>
      </div>
    </WaShell>
  )
}
