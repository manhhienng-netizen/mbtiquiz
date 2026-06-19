import { useEffect, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import CollapsibleSection from '../components/CollapsibleSection'
import RoleTransitionSection from '../components/RoleTransitionSection'
import { RolePlayCaseCard } from '../components/RolePlayCaseCard'
import WaShell from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import { MANAGER_COACHING_B2B, type MbtiType } from '../data/manager-coaching-b2b'
import { getCasesByRole, type RolePlayCase } from '../data/roleplay-case-studies'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import {
  defaultWorkUserId,
  getLatestMBTI,
  getWorkProfile,
  type WorkProfile,
} from '../db/tncb-db'

const VALID_TYPES = new Set(Object.keys(MANAGER_COACHING_B2B))

const vaiTroCases = getCasesByRole('VT')

const menuBtn: CSSProperties = {
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '14px 16px',
  marginBottom: 10,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.2)',
  borderRadius: 12,
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function WorkSelfVaiTro() {
  const navigate = useNavigate()
  const [mbtiType, setMbtiType] = useState<MbtiType | null>(null)
  const [workProfile, setWorkProfile] = useState<WorkProfile | null | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true)
  const [activeCase, setActiveCase] = useState<RolePlayCase | null>(null)

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
          Chuyển vai trò
        </h1>

        <CollapsibleSection
          icon="🔄"
          iconImg="/assets/icons/self-transition.png"
          title="Hướng dẫn chuyển đổi vai trò"
        >
          <RoleTransitionSection
            mbtiType={mbtiType}
            scaleBand={workProfile?.scaleBand ?? null}
            embedded
          />
        </CollapsibleSection>

        <CollapsibleSection
          icon="📖"
          iconImg="/assets/icons/vai-tro-practice.png"
          title="Tình huống thực hành"
        >
          {activeCase ? (
            <RolePlayCaseCard
              case_={activeCase}
              mbtiType={mbtiType}
              onBack={() => setActiveCase(null)}
            />
          ) : (
            <>
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: 12,
                  lineHeight: 1.5,
                }}
              >
                {vaiTroCases.length} tình huống chuyển vai trò — chọn một ca để
                luyện
              </p>
              {vaiTroCases.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCase(c)}
                  style={menuBtn}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'monospace',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {c.id}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontWeight: 600,
                      marginTop: 4,
                    }}
                  >
                    {c.title}
                  </span>
                </button>
              ))}
            </>
          )}
        </CollapsibleSection>
      </div>
    </WaShell>
  )
}
