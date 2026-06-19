import type { CSSProperties, ReactNode } from 'react'
import CollapsibleSection from './CollapsibleSection'
import {
  FIELD_GUIDE,
  FIELD_ORDER,
  honestNote,
  MANAGER_COACHING_B2B,
  type CoachingField,
  type MbtiType,
} from '../data/manager-coaching-b2b'
import { FIELD_ICONS } from '../data/self-coaching-lens'
import type { TeamContext } from '../db/tncb-db'
import {
  getHintForCoachingField,
  getTeamSizeHintTop,
} from '../lib/work/team-context-hints'
import TeamContextHint from './TeamContextHint'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
  marginBottom: '16px',
}

const bodyText: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.80)',
  margin: '0 0 12px',
}

interface ManagedCoachingSectionProps {
  name: string
  type: MbtiType
  teamContext?: TeamContext
  middleContent?: ReactNode
}

export default function ManagedCoachingSection({
  name,
  type,
  teamContext,
  middleContent,
}: ManagedCoachingSectionProps) {
  const tints = MANAGER_COACHING_B2B[type]
  const topSizeHint = teamContext ? getTeamSizeHintTop(teamContext) : null

  function fieldHint(field: CoachingField): string | null {
    return getHintForCoachingField(teamContext, field)
  }

  return (
    <div>
      {topSizeHint ? <TeamContextHint text={topSizeHint} /> : null}

      <div
        style={{
          ...cardStyle,
          background: 'rgba(168,230,61,0.08)',
          border: '1px solid rgba(168,230,61,0.28)',
          marginBottom: '20px',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.92)',
            fontWeight: 600,
            margin: 0,
          }}
        >
          {honestNote(name)}
        </p>
      </div>

      {middleContent}

      {FIELD_ORDER.map((field) => {
        const guide = FIELD_GUIDE[field]
        const tint = tints[field]
        const hint = fieldHint(field)

        return (
          <div key={field}>
            {hint ? <TeamContextHint text={hint} /> : null}
            <CollapsibleSection
              icon={FIELD_ICONS[field]}
              title={guide.label}
              variant="list"
            >
              <div style={{ ...cardStyle, marginBottom: 0 }}>
                <p style={bodyText}>{guide.principle}</p>

                {tint != null && (
                  <div style={{ marginBottom: '14px' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(168,230,61,0.65)',
                        marginBottom: '6px',
                      }}
                    >
                      Xu hướng theo type
                    </div>
                    <p
                      style={{
                        ...bodyText,
                        marginBottom: 0,
                        color: 'rgba(255,255,255,0.72)',
                      }}
                    >
                      {tint}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    marginTop: '14px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(168,230,61,0.06)',
                    border: '1px solid rgba(168,230,61,0.22)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#A8E63D',
                      marginBottom: '6px',
                    }}
                  >
                    💬 Hỏi {name}
                  </div>
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.88)',
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {guide.ask}
                  </p>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        )
      })}
    </div>
  )
}
