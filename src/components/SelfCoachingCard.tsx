import type { CSSProperties } from 'react'
import CollapsibleSection from './CollapsibleSection'
import {
  FIELD_GUIDE,
  FIELD_ORDER,
  MANAGER_COACHING_B2B,
  type CoachingField,
  type MbtiType,
} from '../data/manager-coaching-b2b'
import {
  SCALE_TINT_CONTENT,
  type ScaleBand,
  type ScaleTintEntry,
} from '../data/scale-tint-content'
import {
  COACHING_FIELD_TO_WEEKLY,
  getMbtiGroup,
  getWeeklyTip,
} from '../data/self-coaching-weekly-tips'
import {
  COACHING_FIELD_TO_SCALE,
  FIELD_ICONS,
  selfAsk,
  selfHonestNote,
} from '../data/self-coaching-lens'

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

function ScaleTintBlock({ entry }: { entry: ScaleTintEntry }) {
  return (
    <div
      style={{
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
          marginBottom: '8px',
        }}
      >
        Bối cảnh quy mô
      </div>
      <p style={{ ...bodyText, color: 'rgba(255,255,255,0.68)', marginBottom: '12px' }}>
        {entry.note}
      </p>
      <p
        style={{
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.75)',
          margin: '0 0 10px',
          fontStyle: 'italic',
        }}
      >
        Tự hỏi: {entry.selfAsk}
      </p>
      {entry.safeguard ? (
        <p
          style={{
            fontSize: '12px',
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.42)',
            margin: 0,
          }}
        >
          {entry.safeguard}
        </p>
      ) : null}
    </div>
  )
}

function WeeklyTipBlock({ tip }: { tip: string }) {
  return (
    <div
      style={{
        marginTop: '16px',
        padding: '12px 14px',
        borderRadius: '10px',
        border: '1px solid rgba(168,230,61,0.25)',
        background: 'rgba(168,230,61,0.05)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.82)',
        }}
      >
        <span style={{ fontWeight: 600, color: '#A8E63D' }}>✋ Tuần này thử: </span>
        {tip}
      </p>
    </div>
  )
}

const SELF_SECTION_ICONS = {
  motivate: '/assets/icons/self-motivation.png',
  feedback: '/assets/icons/self-feedback.png',
  support: '/assets/icons/self-energy.png',
  environment: '/assets/icons/self-environment.png',
} as const

interface SelfCoachingCardProps {
  type: MbtiType
  scaleBand?: ScaleBand | null
  sectionVariant?: 'list' | 'grid'
}

function getScaleEntry(
  scaleBand: ScaleBand,
  field: CoachingField,
): ScaleTintEntry | null {
  const scaleField = COACHING_FIELD_TO_SCALE[field]
  if (!scaleField) return null
  return SCALE_TINT_CONTENT[scaleBand][scaleField]
}

export default function SelfCoachingCard({
  type,
  scaleBand,
  sectionVariant = 'list',
}: SelfCoachingCardProps) {
  const tints = MANAGER_COACHING_B2B[type]
  const mbtiGroup = type ? getMbtiGroup(type) : null

  const sections = FIELD_ORDER.map((field) => {
        const guide = FIELD_GUIDE[field]
        const tint = tints[field]
        const scaleEntry =
          scaleBand != null ? getScaleEntry(scaleBand, field) : null
        const weeklyTip =
          mbtiGroup != null
            ? getWeeklyTip(COACHING_FIELD_TO_WEEKLY[field], mbtiGroup)
            : null

    return (
      <CollapsibleSection
        key={field}
        icon={sectionVariant === 'list' ? FIELD_ICONS[field] : undefined}
        iconImg={sectionVariant === 'grid' ? SELF_SECTION_ICONS[field] : undefined}
        title={guide.label}
        variant={sectionVariant}
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
                Xu hướng của bạn
              </div>
              <p style={{ ...bodyText, marginBottom: 0, color: 'rgba(255,255,255,0.72)' }}>
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
              💬 Tự hỏi mình
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
              {selfAsk(guide.ask)}
            </p>
          </div>

          {scaleEntry ? <ScaleTintBlock entry={scaleEntry} /> : null}

          {weeklyTip ? <WeeklyTipBlock tip={weeklyTip} /> : null}
        </div>
      </CollapsibleSection>
    )
  })

  return (
    <div>
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
          {selfHonestNote()}
        </p>
      </div>

      {sectionVariant === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '0 4px',
          }}
        >
          {sections}
        </div>
      ) : (
        sections
      )}
    </div>
  )
}
