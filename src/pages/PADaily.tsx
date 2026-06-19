import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import DailyInsightCard from '../components/DailyInsightCard'

export default function PADaily() {
  const navigate = useNavigate()

  return (
    <AtmosphericPage
      overlay="light"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{
        minHeight: '100dvh',
        padding: '48px 20px 32px',
      }}
    >
      <button
        type="button"
        onClick={() => navigate('/assistant')}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 24,
          padding: 0,
        }}
      >
        ← Cá nhân
      </button>

      <div style={{ maxWidth: 420, margin: '0 auto' }}>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            margin: '0 0 8px',
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          Bài học hôm nay
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 20px',
          }}
        >
          Một gợi ý nhỏ phù hợp với tính cách và thời điểm trong ngày của bạn.
        </p>

        <DailyInsightCard />
      </div>
    </AtmosphericPage>
  )
}
