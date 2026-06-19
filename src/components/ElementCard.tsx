import { useState } from 'react'
import CollapsibleSection from './CollapsibleSection'
import {
  ELEMENT_CONTENT,
  type ElementContent,
} from '../data/tncb-element-content'
import {
  NHAT_CHU_CONTENT,
  type NhatChuContent,
} from '../data/tncb-nhatchu-content'
import {
  getElementAccent,
  getElementGradient,
  getLayer1Path,
  getLayer2Path,
  hexToRgba,
} from '../utils/colorUtils'

export interface ElementCardProps {
  element: string
  nhatChu?: string
}

const FONT = "'Be Vietnam Pro', system-ui, sans-serif"
const NHAT_CHU_ACCENT = '#D4C49A'

function ElementSection({
  element,
  content,
}: {
  element: string
  content: ElementContent
}) {
  const [bgError, setBgError] = useState(false)
  const bgPath = getLayer1Path(element)
  const accentColor = getElementAccent(element)

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      {bgPath && !bgError ? (
        <img
          src={bgPath}
          alt=""
          onError={() => setBgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            zIndex: 0,
          }}
        />
      ) : null}

      {(bgError || !bgPath) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: getElementGradient(element),
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, padding: '24px 20px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: hexToRgba(accentColor, 0.8),
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>🌿</span>
          <span>Ngũ Hành Đông Phương</span>
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: 4,
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}
        >
          Hành {element}
        </div>

        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.70)',
            marginBottom: 8,
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
          }}
        >
          {content.nickname}
        </p>

        {content.tagline ? (
          <p
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              color: hexToRgba(accentColor, 0.9),
              marginBottom: 16,
              lineHeight: 1.5,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            &ldquo;{content.tagline}&rdquo;
          </p>
        ) : null}

        <div
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, ${hexToRgba(accentColor, 0.4)}, transparent)`,
            marginBottom: 16,
          }}
        />

        <CollapsibleSection title="Tổng quan" size="sm">
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              whiteSpace: 'pre-line',
            }}
          >
            {content.overview}
          </p>
        </CollapsibleSection>

        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {content.sections.map((section) => (
            <CollapsibleSection key={section.heading} title={section.heading} size="sm">
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.70)',
                  lineHeight: 1.6,
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.content}
              </p>
            </CollapsibleSection>
          ))}
        </div>
      </div>
    </div>
  )
}

function NhatChuSection({
  nhatChu,
  content,
}: {
  nhatChu: string
  content: NhatChuContent
}) {
  const [bgError, setBgError] = useState(false)
  const bgPath = getLayer2Path(nhatChu)
  const accentColor = NHAT_CHU_ACCENT

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        fontFamily: FONT,
      }}
    >
      {bgPath && !bgError ? (
        <img
          src={bgPath}
          alt=""
          onError={() => setBgError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            zIndex: 0,
          }}
        />
      ) : null}

      {(bgError || !bgPath) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(160deg, #0F0F14, #1A1810)',
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, padding: '24px 20px' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: hexToRgba(accentColor, 0.8),
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>☽</span>
          <span>Nhật Chủ — {nhatChu}</span>
        </div>

        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.95)',
            marginBottom: 4,
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}
        >
          {content.nickname}
        </div>

        {content.tagline ? (
          <p
            style={{
              fontSize: 14,
              fontStyle: 'italic',
              color: hexToRgba(accentColor, 0.9),
              marginBottom: 16,
              lineHeight: 1.5,
              textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            }}
          >
            &ldquo;{content.tagline}&rdquo;
          </p>
        ) : null}

        <div
          style={{
            height: 1,
            background: `linear-gradient(to right, transparent, ${hexToRgba(accentColor, 0.4)}, transparent)`,
            marginBottom: 16,
          }}
        />

        <CollapsibleSection title="Tổng quan" size="sm">
          <p
            style={{
              margin: 0,
              fontSize: 14,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              whiteSpace: 'pre-line',
            }}
          >
            {content.overview}
          </p>
        </CollapsibleSection>

        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {content.sections.map((section) => (
            <CollapsibleSection key={section.heading} title={section.heading} size="sm">
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.70)',
                  lineHeight: 1.6,
                  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                  whiteSpace: 'pre-line',
                }}
              >
                {section.content}
              </p>
            </CollapsibleSection>
          ))}
        </div>

        {content.inOneSentence ? (
          <div
            style={{
              marginTop: 16,
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 12,
              borderLeft: `3px solid ${hexToRgba(accentColor, 0.5)}`,
              fontSize: 13,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}
          >
            {content.inOneSentence}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function ElementCard({ element, nhatChu }: ElementCardProps) {
  const elementContent = element ? ELEMENT_CONTENT[element] : undefined
  const nhatChuContent = nhatChu ? NHAT_CHU_CONTENT[nhatChu] : undefined

  if (!elementContent && !nhatChuContent) return null

  return (
    <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {elementContent ? (
        <ElementSection element={element} content={elementContent} />
      ) : null}
      {nhatChu && nhatChuContent ? (
        <NhatChuSection nhatChu={nhatChu} content={nhatChuContent} />
      ) : null}
    </div>
  )
}
