import { useEffect, useState, type CSSProperties } from 'react'
import {
  ACTIVE_MAP_ROLES,
  COMING_SOON_ROLES,
  ROLE_LABELS,
  barFillPercent,
  getProgress,
  getStrengthLevel,
  latestPracticeLabel,
  type ArenaProgressRole,
  type RoleProgress,
} from '../lib/arena-progress'

const accent = '#A8E63D'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.15)',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
}

function RoleRow({
  role,
  progress,
  comingSoon,
}: {
  role: ArenaProgressRole
  progress?: RoleProgress
  comingSoon?: boolean
}) {
  const level = comingSoon ? null : getStrengthLevel(progress)
  const total = progress?.totalCompleted ?? 0
  const fill = comingSoon ? 0 : barFillPercent(total)

  let barBg = 'transparent'
  let barBorder = 'rgba(168,230,61,0.2)'
  if (level === 'vững') {
    barBg = accent
    barBorder = accent
  } else if (level === 'đang luyện') {
    barBg = 'rgba(168,230,61,0.4)'
    barBorder = 'rgba(168,230,61,0.4)'
  }

  const statusLabel = comingSoon
    ? 'sắp có'
    : level === 'vững'
      ? 'vững'
      : level === 'đang luyện'
        ? 'đang luyện'
        : 'chưa luyện'

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              marginRight: 8,
            }}
          >
            [{role}]
          </span>
          {ROLE_LABELS[role]}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>
          {comingSoon ? (
            <span style={{ letterSpacing: 2, color: 'rgba(255,255,255,0.25)' }}>
              ··········
            </span>
          ) : null}
          {!comingSoon && total > 0 ? (
            <span style={{ marginLeft: 6 }}>({total} tình huống)</span>
          ) : null}
          <span
            style={{
              marginLeft: 8,
              color:
                level === 'vững'
                  ? accent
                  : 'rgba(255,255,255,0.5)',
            }}
          >
            {statusLabel}
          </span>
        </span>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          border: `1px solid ${barBorder}`,
          background: 'transparent',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${fill}%`,
            background: barBg,
            borderRadius: 2,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}

export interface ArenaProgressMapProps {
  refreshKey?: number
}

export default function ArenaProgressMap({ refreshKey = 0 }: ArenaProgressMapProps) {
  const [progress, setProgress] = useState<
    Partial<Record<ArenaProgressRole, RoleProgress>>
  >({})

  useEffect(() => {
    void getProgress().then(setProgress)
  }, [refreshKey])

  const lastLabel = latestPracticeLabel(progress)

  return (
    <div style={cardStyle}>
      <h2
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#fff',
          margin: '0 0 6px',
        }}
      >
        Bản đồ phản xạ của bạn
      </h2>
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.5,
          margin: '0 0 16px',
        }}
      >
        Luyện nhiều hơn → phản xạ vững hơn. Không có đúng sai.
      </p>

      {ACTIVE_MAP_ROLES.map((role) => (
        <RoleRow key={role} role={role} progress={progress[role]} />
      ))}
      {COMING_SOON_ROLES.map((role) => (
        <RoleRow key={role} role={role} comingSoon />
      ))}

      {lastLabel ? (
        <p
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            margin: '8px 0 0',
          }}
        >
          {lastLabel}
        </p>
      ) : null}
    </div>
  )
}
