import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import CollapsibleSection from '../components/CollapsibleSection'
import SanTapPortal from '../components/SanTapPortal'
import UnderstandBossSection from '../components/UnderstandBossSection'
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

export default function WorkSelfSep() {
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
          Hiểu Sếp
        </h1>

        <CollapsibleSection
          icon="👔"
          iconImg="/assets/icons/sep-boss-analysis.png"
          title="Phân tích phong cách sếp"
        >
          <UnderstandBossSection
            mbtiType={mbtiType}
            scaleBand={workProfile?.scaleBand ?? null}
            embedded
          />
        </CollapsibleSection>

        <div style={{ paddingTop: 24 }}>
          <SanTapPortal
            label="Thử tình huống với sếp của bạn"
            sublabel="Luyện phản xạ từ lý thuyết vừa đọc"
            context={{ module: 'WA', role: 'MG', scenario: 'conflict' }}
            accent="#A8E63D"
          />
        </div>
      </div>
    </WaShell>
  )
}
