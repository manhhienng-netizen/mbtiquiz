import type { CSSProperties } from 'react'
import {
  FIELD_GUIDE,
  FIELD_ORDER,
  honestNote,
  MANAGER_COACHING_B2B,
  type MbtiType,
} from '../data/manager-coaching-b2b'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
  marginBottom: '16px',
}

const sectionLabel: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.40)',
  marginBottom: '12px',
}

const bodyText: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.80)',
  margin: '0 0 12px',
}

interface CoachingCardProps {
  name: string
  type: MbtiType
}

export default function CoachingCard({ name, type }: CoachingCardProps) {
  const tints = MANAGER_COACHING_B2B[type]

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
          {honestNote(name)}
        </p>
      </div>

      {FIELD_ORDER.map((field) => {
        const guide = FIELD_GUIDE[field]
        const tint = tints[field]

        return (
          <div key={field} style={cardStyle}>
            <div style={sectionLabel}>{guide.label}</div>

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
        )
      })}
    </div>
  )
}
