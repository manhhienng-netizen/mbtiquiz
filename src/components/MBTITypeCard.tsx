import { useState } from 'react'
import CollapsibleSection from './CollapsibleSection'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import {
  buildFigurePath,
  CARD_SURFACE_STYLE,
  dividerStyle,
  getElementAccent,
  hexToRgba,
  MBTI_GROUP_GLOW,
} from '../utils/colorUtils'

export interface MBTITypeCardProps {
  mbtiType: string
  identity: 'A' | 'T'
  element?: string
  gender?: string
  genderPreference?: string
}

const FONT = "'Be Vietnam Pro', system-ui, sans-serif"

export default function MBTITypeCard({
  mbtiType,
  identity,
  element,
  gender,
  genderPreference,
}: MBTITypeCardProps) {
  const [figureError, setFigureError] = useState(false)
  const content = TNCB_TYPE_CONTENT[mbtiType.toUpperCase()]
  if (!content) return null

  const accent = getElementAccent(element)
  const code = `${content.type}-${identity}`
  const figurePath = buildFigurePath(mbtiType, gender, genderPreference)
  const glowColor = MBTI_GROUP_GLOW[mbtiType.toUpperCase()] || '#3B5BDB'

  return (
    <div
      style={{
        ...CARD_SURFACE_STYLE,
        fontFamily: FONT,
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}26 0%, ${glowColor}00 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}14 0%, ${glowColor}00 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, padding: '14px 16px' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 12,
            minHeight: 44,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              Tính cách
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
              }}
            >
              {mbtiType}
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 13,
                color: accent,
                fontWeight: 500,
              }}
            >
              {content.nickname} · {code}
            </div>
          </div>

          {!figureError ? (
            <img
              src={figurePath}
              alt=""
              onError={() => setFigureError(true)}
              style={{
                height: 56,
                width: 'auto',
                objectFit: 'contain',
                opacity: 0.75,
                flexShrink: 0,
              }}
            />
          ) : null}
        </div>

        <hr style={dividerStyle(accent)} />

        <p
          style={{
            fontSize: 15,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
            marginTop: 10,
          }}
        >
          &ldquo;{content.tagline}&rdquo;
        </p>

        <div style={{ marginTop: 6 }}>
          <CollapsibleSection title="Chân dung tổng quan" size="sm">
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {content.overview}
            </p>
          </CollapsibleSection>
        </div>

        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {content.sections.map((section) => (
            <CollapsibleSection key={section.heading} title={section.heading} size="sm">
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {section.content}
              </p>
            </CollapsibleSection>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          <CollapsibleSection title="Mâu thuẫn nội tâm" size="sm">
            <p
              style={{
                margin: 0,
                fontSize: 14,
                fontStyle: 'italic',
                color: hexToRgba(accent, 0.9),
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {content.coreContradiction}
            </p>
          </CollapsibleSection>
        </div>

        <div style={{ marginTop: 8 }}>
          <CollapsibleSection title="Quote dẫn dắt" size="sm">
            <blockquote
              style={{
                margin: 0,
                borderLeft: `2px solid ${accent}`,
                paddingLeft: 16,
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                &ldquo;{content.quote.text}&rdquo;
              </p>
              <footer
                style={{
                  marginTop: 8,
                  textAlign: 'right',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.40)',
                }}
              >
                — {content.quote.author}
              </footer>
            </blockquote>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  )
}
