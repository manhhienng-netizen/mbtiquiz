import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import WaShell from '../components/WaShell'
import WaTopBar from '../components/WaTopBar'
import { MANAGER_COACHING_B2B, type MbtiType } from '../data/manager-coaching-b2b'
import { SCALE_BAND_LABELS } from '../data/scale-tint-content'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import {
  defaultWorkUserId,
  getLatestMBTI,
  getWorkProfile,
  WORK_LEVEL_LABELS,
  type WorkProfile,
} from '../db/tncb-db'

const VALID_TYPES = new Set(Object.keys(MANAGER_COACHING_B2B))

const SELF_ITEMS = [
  {
    icon: '/assets/icons/self-coaching.png',
    label: 'Tự coaching',
    desc: 'Hiểu động lực và điểm mạnh của bạn',
    route: '/work/self/ban-than',
    accent: '#7F77DD',
    blend: 'screen' as const,
  },
  {
    icon: '/assets/icons/self-boss.png',
    label: 'Hiểu Sếp',
    desc: 'Đọc phong cách sếp — làm việc hiệu quả',
    route: '/work/self/sep',
    accent: '#D4B880',
    blend: 'screen' as const,
  },
  {
    icon: '/assets/icons/self-subordinate.png',
    label: 'Hiểu cấp dưới',
    desc: 'Dẫn dắt từng người đúng cách',
    route: '/work/self/cap-duoi',
    accent: '#A8E63D',
    blend: 'screen' as const,
  },
  {
    icon: '/assets/icons/self-colleague.png',
    label: 'Hiểu đồng nghiệp',
    desc: 'Hợp tác và giữ ranh giới lành mạnh',
    route: '/work/self/dong-nghiep',
    accent: '#7EB8D8',
    blend: 'screen' as const,
  },
  {
    icon: '/assets/icons/self-transition.png',
    label: 'Chuyển vai trò',
    desc: 'Từ làm giỏi sang dẫn tốt',
    route: '/work/self/vai-tro',
    accent: '#E8883A',
    blend: 'screen' as const,
  },
] as const

function formatWorkSelfSubHeader(
  mbtiType: string,
  workProfile: WorkProfile | null | undefined,
): string | null {
  if (!workProfile?.occupation) return null
  const parts = [
    workProfile.occupation,
    WORK_LEVEL_LABELS[workProfile.level],
    mbtiType,
  ]
  if (workProfile.scaleBand) {
    parts.push(SCALE_BAND_LABELS[workProfile.scaleBand])
  }
  return parts.join(' · ')
}

export default function WorkSelf() {
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

  const subHeader = formatWorkSelfSubHeader(mbtiType, workProfile)

  return (
    <WaShell>
      <WaTopBar backLabel="Vào việc" backRoute="/work/business" />

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
          Tự coaching
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0 4px' }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Coach chính mình
          </h1>
          <span
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              background: 'rgba(168,230,61,0.12)',
              border: '1px solid rgba(168,230,61,0.25)',
              color: '#A8E63D',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            {mbtiType}
          </span>
        </div>

        {subHeader ? (
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 24px',
            }}
          >
            {subHeader}
          </p>
        ) : (
          <div style={{ marginBottom: 24 }} />
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
          }}
        >
        {SELF_ITEMS.map((item, idx) => (
          <button
            key={item.route}
            type="button"
            onClick={() => navigate(item.route)}
            style={{
              gridColumn: idx === 4 ? '1 / -1' : 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              padding: '16px 8px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${item.accent}33`,
              borderRadius: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <img
              src={item.icon}
              alt={item.label}
              style={{
                width: 44,
                height: 44,
                objectFit: 'contain',
                mixBlendMode: item.blend,
              }}
            />
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.45)',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              {item.desc}
            </div>
          </button>
        ))}
        </div>
      </div>
    </WaShell>
  )
}
