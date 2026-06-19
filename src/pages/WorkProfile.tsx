import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import RolePlayGame from '../components/RolePlayGame'
import SanTapPortal from '../components/SanTapPortal'
import WaShell from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import WorkGoalTab from '../components/WorkGoalTab'
import WorkProfileCards from '../components/WorkProfileCards'
import WorkProfileForm from '../components/WorkProfileForm'
import {
  FREE_CASE_LIMIT,
  ROLEPLAY_COUNT_KEY,
  ROLEPLAY_SEEN_KEY,
} from '../data/roleplay-case-studies'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import { MBTI_COMPETENCY_MAP, MANAGER_COACHING_GUIDE } from '../data/work-competency'
import { PROCRASTINATION_BY_TYPE } from '../data/work-procrastination'
import { STRESS_PATTERNS, WORK_TIPS } from '../data/work-tips'
import {
  defaultWorkUserId,
  getLatestMBTI,
  getWorkProfile,
  saveWorkProfile,
  WORK_LEVEL_LABELS,
  type WorkLevel,
} from '../db/tncb-db'
import { firstSentence, reframeYou } from '../utils/workContent'

const SESSION_KEY = 'work_profile_roleplay'

type ProfileData = { occupation: string; level: WorkLevel }

function readRoleplaySession(): ProfileData | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ProfileData
    if (!parsed.occupation?.trim() || !parsed.level) return null
    return { occupation: parsed.occupation.trim(), level: parsed.level }
  } catch {
    return null
  }
}

function formatLevelLabel(level: WorkLevel): string {
  return WORK_LEVEL_LABELS[level]
}

function getRoleFromLevel(level: WorkLevel): 'NV' | 'MG' {
  return level === 'lead' || level === 'manager' ? 'MG' : 'NV'
}

function WorkLoadingState() {
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
        <PageSpinner label="Đang tải Work Profile..." />
      </div>
    </WaShell>
  )
}

export default function WorkProfile() {
  const navigate = useNavigate()
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'reality' | 'roleplay' | 'goal'>('reality')

  const [realitySubmitted, setRealitySubmitted] = useState(false)
  const [realityData, setRealityData] = useState<ProfileData | null>(null)

  const [roleplaySubmitted, setRoleplaySubmitted] = useState(false)
  const [roleplayData, setRoleplayData] = useState<ProfileData | null>(null)
  const [showGate, setShowGate] = useState(false)
  const [gameRestartKey, setGameRestartKey] = useState(0)

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
      if (!type) {
        navigate('/quiz')
        return
      }
      setMbtiType(type)

      const profile = await getWorkProfile(defaultWorkUserId())
      const hasSetup = profile != null && !!profile.occupation?.trim()
      if (hasSetup) {
        setRealitySubmitted(true)
        setRealityData({
          occupation: profile!.occupation,
          level: profile!.level,
        })
      }

      const roleplay = readRoleplaySession()
      if (roleplay) {
        setRoleplaySubmitted(true)
        setRoleplayData(roleplay)
      }

      setLoading(false)
    }
    void load()
  }, [navigate])

  if (loading || !mbtiType) return <WorkLoadingState />

  const competency = MBTI_COMPETENCY_MAP[mbtiType]
  const coaching = MANAGER_COACHING_GUIDE[mbtiType]
  const tips = WORK_TIPS[mbtiType]
  const procrast = PROCRASTINATION_BY_TYPE[mbtiType]
  const stress = STRESS_PATTERNS[mbtiType]

  if (!competency || !coaching || !tips || !procrast || !stress) {
    return (
      <WaShell>
        <WaTopBar backLabel="Làm việc" backRoute="/work" />
        <div style={{ padding: '8px 20px 40px' }}>
          <p>Chưa có dữ liệu Work cho type {mbtiType}.</p>
        </div>
      </WaShell>
    )
  }

  const hookText = reframeYou(firstSentence(coaching.overview), mbtiType)

  const editLinkStyle = {
    marginBottom: 16,
    padding: 0,
    border: 'none',
    background: 'none',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: 'inherit',
    textDecoration: 'underline',
    textUnderlineOffset: 3,
  } as const

  const subheaderStyle = {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    margin: '0 0 8px',
  } as const

  const tabContent =
    activeTab === 'goal' ? (
      <WorkGoalTab />
    ) : activeTab === 'reality' ? (
      !realitySubmitted ? (
        <WorkProfileForm
          initialOccupation={realityData?.occupation}
          initialLevel={realityData?.level}
          onSubmit={async (data) => {
            await saveWorkProfile({
              userId: defaultWorkUserId(),
              occupation: data.occupation,
              level: data.level,
              updatedAt: Date.now(),
            })
            setRealityData(data)
            setRealitySubmitted(true)
          }}
        />
      ) : (
        <>
          {realityData ? (
            <p style={subheaderStyle}>
              {realityData.occupation} · {formatLevelLabel(realityData.level)}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => setRealitySubmitted(false)}
            style={editLinkStyle}
          >
            Sửa khai báo
          </button>
          <WorkProfileCards
            mbtiType={mbtiType}
            occupation={realityData?.occupation}
          />
        </>
      )
    ) : !roleplaySubmitted ? (
      <WorkProfileForm
        initialOccupation={roleplayData?.occupation}
        initialLevel={roleplayData?.level}
        submitLabel="Thử xem kết quả →"
        onSubmit={(data) => {
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
          setRoleplayData(data)
          setRoleplaySubmitted(true)
        }}
      />
    ) : showGate ? (
      <div style={{ textAlign: 'center', padding: '32px 20px' }}>
        <p
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'white',
            marginBottom: 8,
          }}
        >
          Bạn đã chơi {FREE_CASE_LIMIT} tình huống 🎉
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
          Chơi tiếp để luyện thêm kỹ năng ứng xử
        </p>

        <button
          type="button"
          style={{
            width: '100%',
            padding: '14px',
            background: 'rgba(168,230,61,0.1)',
            border: '1px solid rgba(168,230,61,0.4)',
            borderRadius: 14,
            color: '#A8E63D',
            fontWeight: 600,
            marginBottom: 12,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 15,
          }}
        >
          📺 Xem quảng cáo → +5 tình huống
        </button>

        <button
          type="button"
          style={{
            width: '100%',
            padding: '14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 14,
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 15,
          }}
        >
          ⭐ Premium → Không giới hạn
          <span
            style={{
              display: 'block',
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              marginTop: 2,
            }}
          >
            Sắp ra mắt
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(ROLEPLAY_COUNT_KEY)
            localStorage.removeItem(ROLEPLAY_SEEN_KEY)
            setShowGate(false)
            setGameRestartKey((k) => k + 1)
          }}
          style={{
            marginTop: 16,
            fontSize: 12,
            color: 'rgba(255,255,255,0.25)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
          }}
        >
          Chơi lại từ đầu (dev)
        </button>
      </div>
    ) : roleplayData ? (
      <>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY)
            setRoleplaySubmitted(false)
            setShowGate(false)
          }}
          style={editLinkStyle}
        >
          Thử nghề khác
        </button>
        <RolePlayGame
          key={gameRestartKey}
          mbtiType={mbtiType}
          occupation={roleplayData.occupation}
          level={roleplayData.level}
          role={getRoleFromLevel(roleplayData.level)}
          onGate={() => setShowGate(true)}
        />
      </>
    ) : null

  return (
    <WaShell>
      <WaTopBar backLabel="Làm việc" backRoute="/work" />

      <div style={{ padding: '8px 20px 40px' }}>
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Công việc
        </div>

        <div
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(168,230,61,0.15)',
            border: '1px solid rgba(168,230,61,0.3)',
            color: '#A8E63D',
            fontSize: '13px',
            fontWeight: 700,
            margin: '8px 0',
          }}
        >
          {mbtiType}
        </div>

        <h1
          style={{
            fontSize: '26px',
            fontWeight: 700,
            lineHeight: 1.25,
            margin: '4px 0 16px',
          }}
        >
          Bạn làm việc
          <br />
          tốt nhất khi nào?
        </h1>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.70)',
            fontStyle: 'italic',
            marginBottom: '24px',
          }}
        >
          {hookText}
        </p>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(
            [
              { id: 'reality' as const, label: 'Thực tế' },
              { id: 'roleplay' as const, label: 'Role play' },
              { id: 'goal' as const, label: 'Mục tiêu' },
            ] as const
          ).map((tab) => {
            const isRealityDimmed =
              tab.id === 'reality' &&
              activeTab === 'roleplay' &&
              roleplaySubmitted &&
              !showGate

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 10,
                  background:
                    activeTab === tab.id
                      ? 'rgba(168,230,61,0.15)'
                      : 'rgba(255,255,255,0.04)',
                  border:
                    activeTab === tab.id
                      ? '1px solid rgba(168,230,61,0.4)'
                      : '1px solid rgba(255,255,255,0.08)',
                  color: activeTab === tab.id ? '#A8E63D' : 'rgba(255,255,255,0.5)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  opacity: isRealityDimmed ? 0.5 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                {tab.id === 'reality' ? (
                  <>
                    Thực tế
                    {isRealityDimmed && (
                      <span
                        style={{
                          fontSize: 10,
                          background: 'rgba(168,230,61,0.2)',
                          color: '#A8E63D',
                          borderRadius: 4,
                          padding: '2px 6px',
                        }}
                      >
                        Premium
                      </span>
                    )}
                  </>
                ) : (
                  tab.label
                )}
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 4 }}>{tabContent}</div>

        {activeTab !== 'goal' ? (
          <div style={{ paddingTop: 24 }}>
            <SanTapPortal
              label="Vào sân tập phù hợp với bạn"
              sublabel="Tình huống được chọn dựa trên profile của bạn"
              context={{
                module: 'WA',
                role: 'NV',
                typePair: mbtiType ?? undefined,
              }}
              accent="#A8E63D"
            />
          </div>
        ) : null}
      </div>
    </WaShell>
  )
}
