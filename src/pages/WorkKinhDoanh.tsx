import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import { KinhDoanhSection } from '../components/KinhDoanhSection'
import PageSpinner from '../components/PageSpinner'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import { getLatestMBTI } from '../db/tncb-db'

const sectionCard = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.25)',
  borderRadius: 16,
  padding: '20px',
} as const

const SECTIONS = [
  {
    title: 'Xử lý khách hàng',
    description:
      'Thương lượng · set boundary · manage expectation — không authority, cân bằng lợi ích đôi bên.',
    context: 'KH' as const,
  },
  {
    title: 'Làm việc với đối tác',
    description:
      'Collaborate · hold accountable · find common ground — peer-level, có cam kết rõ.',
    context: 'DT' as const,
  },
]

export default function WorkKinhDoanh() {
  const navigate = useNavigate()
  const [mbtiType, setMbtiType] = useState<string>('INTJ')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const mbti = await getLatestMBTI()
      let type = mbti?.mbtiType
      if (!type) {
        const raw = localStorage.getItem(QUIZ_RESULT_KEY)
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as { mbtiType?: string }
            type = parsed.mbtiType
          } catch {
            type = undefined
          }
        }
      }
      if (type) setMbtiType(type)
      setLoading(false)
    }
    void load()
  }, [])

  if (loading) {
    return (
      <AtmosphericPage
        overlay="medium"
        contentStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageSpinner label="Đang tải..." />
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage
      overlay="medium"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{ padding: '52px 20px 40px' }}
    >
      <button
        type="button"
        onClick={() => navigate('/work/business')}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '24px',
          padding: 0,
        }}
      >
        ← Vào việc
      </button>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Vào việc
      </div>

      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          lineHeight: 1.25,
          margin: '0 0 8px',
        }}
      >
        Kinh doanh
      </h1>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.55)',
          margin: '0 0 28px',
          maxWidth: 480,
        }}
      >
        Quan hệ bên ngoài — tone negotiate & collaborate, không chỉ đạo như
        nội bộ.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 480,
        }}
      >
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <div style={sectionCard}>
              <h2
                style={{
                  margin: '0 0 6px',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#A8E63D',
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  margin: '0 0 16px',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {section.description}
              </p>
              <KinhDoanhSection context={section.context} mbtiType={mbtiType} />
            </div>
          </section>
        ))}
      </div>
    </AtmosphericPage>
  )
}
