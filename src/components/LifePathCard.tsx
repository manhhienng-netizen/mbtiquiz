import { LIFE_PATH_CONTENT } from '../data/tncb-lifepath-content'
import CollapsibleSection from './CollapsibleSection'
import { ConstellationSVG } from './LifePathConstellationSVG'
import {
  CARD_SURFACE_STYLE,
  dividerStyle,
  getLifePathAccent,
  LIFEPATH_ACCENT,
} from '../utils/colorUtils'

export interface LifePathCardProps {
  lifePath: number
  fullName?: string
}

const FONT = "'Be Vietnam Pro', system-ui, sans-serif"

export default function LifePathCard({ lifePath }: LifePathCardProps) {
  const content = LIFE_PATH_CONTENT[lifePath]
  if (!content) return null

  const accent = getLifePathAccent(lifePath)
  const glowColor = LIFEPATH_ACCENT[lifePath] || '#B8A0D4'

  return (
    <div
      className="mt-4"
      style={{
        ...CARD_SURFACE_STYLE,
        fontFamily: FONT,
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: -60,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor}20 0%, ${glowColor}00 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', marginBottom: 8 }}>
        <ConstellationSVG
          lifePathNumber={lifePath}
          width={320}
          height={80}
          opacity={0.45}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            right: 16,
            transform: 'translateY(-50%)',
            fontSize: 72,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.1)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {lifePath}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <hr style={dividerStyle(accent)} />

        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.40)',
          }}
        >
          🔢 Số học Tây phương
        </p>
        <h2
          style={{
            marginTop: 4,
            fontSize: 22,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            lineHeight: 1.25,
          }}
        >
          Đường đời số {lifePath}
        </h2>

        <p
          style={{
            marginTop: 16,
            fontSize: 16,
            fontStyle: 'italic',
            color: accent,
            lineHeight: 1.5,
          }}
        >
          &ldquo;{content.hookLine}&rdquo;
        </p>

        <div style={{ marginTop: 8 }}>
          <CollapsibleSection title="Ý nghĩa cốt lõi" size="sm">
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {content.deepDesc}
            </p>
          </CollapsibleSection>
        </div>

        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <CollapsibleSection title="Trong cuộc sống" size="sm">
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {content.inLife}
            </p>
          </CollapsibleSection>

          <CollapsibleSection title="Món quà & Gánh nặng" size="sm">
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {content.giftAndBurden}
            </p>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  )
}
