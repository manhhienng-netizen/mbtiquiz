import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import SelfCoachingCard from '../components/SelfCoachingCard'
import WaShell from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import { MANAGER_COACHING_B2B, type MbtiType } from '../data/manager-coaching-b2b'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import {
  defaultWorkUserId,
  getLatestMBTI,
  getWorkProfile,
  type WorkProfile,
} from '../db/tncb-db'

const VALID_TYPES = new Set(Object.keys(MANAGER_COACHING_B2B))

export default function WorkSelfBanThan() {
  const navigate = useNavigate()
  const [mbtiType, setMbtiType] = useState<MbtiType | null>(null)
  const [workProfile, setWorkProfile] = useState<WorkProfile | null | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      let type = (await getLatestMBTI())?.mbtiType
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
      if (!type || !VALID_TYPES.has(type)) {
        navigate('/quiz')
        return
      }
      const profile = await getWorkProfile(defaultWorkUserId())
      setWorkProfile(profile ?? null)
      setMbtiType(type as MbtiType)
      setLoading(false)
    }
    void load()
  }, [navigate])

  if (loading || !mbtiType) {
    return (
      <WaShell scrollable={false}>
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PageSpinner label="Đang tải..." />
        </div>
      </WaShell>
    )
  }

  return (
    <WaShell>
      <WaTopBar backLabel="Về mình" backRoute="/work/self" />

      <div style={{ padding: '8px 20px 40px' }}>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '0 0 20px',
          }}
        >
          Tự coaching
        </h1>

        <section id="self-coaching">
          <h2
            style={{
              margin: '0 0 6px',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Hiểu bản thân
          </h2>
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.50)',
              marginBottom: '20px',
            }}
          >
            Bốn mảng để bạn tự hỏi và phát triển — quan sát thật quan trọng hơn mọi giả định từ type.
          </p>
          <SelfCoachingCard
            type={mbtiType}
            scaleBand={workProfile?.scaleBand ?? null}
            sectionVariant="grid"
          />
        </section>
      </div>
    </WaShell>
  )
}
