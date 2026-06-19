import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ArenaProgressMap from '../components/ArenaProgressMap'
import WaShell, { WA_ACCENT } from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'

export default function ArenaProgress() {
  const navigate = useNavigate()
  const location = useLocation()
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    setRefreshKey((k) => k + 1)
  }, [location.pathname])

  return (
    <WaShell>
      <WaTopBar
        backLabel="Sân tập"
        backRoute="/work/san-tap"
        title="Bản đồ phản xạ"
      />

      <div style={{ padding: '8px 20px 40px' }}>
        <ArenaProgressMap refreshKey={refreshKey} />

        <button
          type="button"
          onClick={() => navigate('/work/san-tap')}
          style={{
            width: '100%',
            marginTop: 8,
            padding: '14px 16px',
            borderRadius: 12,
            border: `1px solid ${WA_ACCENT}44`,
            background: 'rgba(168,230,61,0.08)',
            color: WA_ACCENT,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Vào sân tập →
        </button>
      </div>
    </WaShell>
  )
}
