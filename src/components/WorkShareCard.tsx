import { forwardRef } from 'react'
import {
  MANAGER_COACHING_B2B,
  type MbtiType,
} from '../data/manager-coaching-b2b'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'

export const WORK_SHARE_CARD_WIDTH = 600
export const WORK_SHARE_CARD_HEIGHT = 315

const ACCENT = '#A8E63D'

export interface WorkShareCardProps {
  mbtiType: MbtiType
}

function sanitizeShareText(text: string): string {
  return text
    .replace(/hành trình/gi, 'quá trình')
    .replace(/tiềm năng/gi, 'khả năng')
    .replace(/bứt phá/gi, 'tiến bộ')
}

/** Cắt tint dài: sau 50 ký tự, tìm dấu chấm/gạch đầu tiên → thêm "..." */
export function truncateTint(text: string): string {
  if (text.length <= 80) return text
  const after50 = text.slice(50)
  const match = after50.match(/[.—\-–]/)
  if (match && match.index !== undefined) {
    return `${text.slice(0, 50 + match.index + 1).trim()}...`
  }
  return `${text.slice(0, 77).trim()}...`
}

export function getWorkArchetypeLabel(mbtiType: MbtiType): string {
  return TNCB_TYPE_CONTENT[mbtiType]?.nickname ?? mbtiType
}

const WorkShareCard = forwardRef<HTMLDivElement, WorkShareCardProps>(
  ({ mbtiType }, ref) => {
    const coaching = MANAGER_COACHING_B2B[mbtiType]
    const motivateTint = truncateTint(sanitizeShareText(coaching.motivate ?? ''))
    const feedbackTint = truncateTint(sanitizeShareText(coaching.feedback ?? ''))
    const archetypeLabel = getWorkArchetypeLabel(mbtiType)

    return (
      <div
        ref={ref}
        style={{
          width: WORK_SHARE_CARD_WIDTH,
          height: WORK_SHARE_CARD_HEIGHT,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#0A0A0F',
          border: '1px solid rgba(168,230,61,0.2)',
          borderRadius: 12,
          fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
          boxSizing: 'border-box',
          display: 'flex',
        }}
      >
        {/* Left column ~40% */}
        <div
          style={{
            width: '40%',
            padding: '20px 18px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: 20,
                  background: 'rgba(168,230,61,0.12)',
                  border: '1px solid rgba(168,230,61,0.28)',
                  color: ACCENT,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                MBTI
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                {mbtiType}
              </span>
            </div>

            <div
              style={{
                height: 1,
                background:
                  'linear-gradient(90deg, rgba(168,230,61,0.35) 0%, transparent 100%)',
                marginBottom: 12,
              }}
            />

            <div
              style={{
                color: ACCENT,
                fontSize: 15,
                fontWeight: 700,
                lineHeight: 1.35,
                marginBottom: 6,
              }}
            >
              {archetypeLabel}
            </div>

            <div
              style={{
                height: 1,
                background: 'rgba(255,255,255,0.08)',
                margin: '10px 0',
              }}
            />

            <div
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: 11,
                lineHeight: 1.45,
                fontWeight: 500,
              }}
            >
              Phong cách làm việc
              <br />
              theo MBTI
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: 'rgba(255,255,255,0.28)',
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            tncb.app
          </div>
        </div>

        {/* Right column ~60% */}
        <div
          style={{
            width: '60%',
            padding: '18px 20px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(168,230,61,0.03) 100%)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: ACCENT,
                marginBottom: 6,
                letterSpacing: '0.02em',
              }}
            >
              🔥 Động lực
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {motivateTint}
            </p>
          </div>

          <div
            style={{
              flex: 1,
              padding: '12px 14px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: ACCENT,
                marginBottom: 6,
                letterSpacing: '0.02em',
              }}
            >
              📢 Feedback
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {feedbackTint}
            </p>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: 18,
            right: '42%',
            fontSize: 8,
            lineHeight: 1.3,
            color: 'rgba(255,255,255,0.22)',
            fontStyle: 'italic',
          }}
        >
          Xu hướng theo type — điều đúng nhất là tự quan sát.
        </div>
      </div>
    )
  },
)

WorkShareCard.displayName = 'WorkShareCard'
export default WorkShareCard
