import { useState } from 'react'
import { Link } from 'react-router-dom'
import CollapsibleSection from './CollapsibleSection'
import { buildGrowthZoneDisplay } from '../data/growth-zone-content'
import type { CharacterResult } from '../engine/character-engine'
import {
  buildBackgroundPath,
  buildFigurePath,
  getElementAccent,
  getElementGradient,
  hexToRgba,
} from '../utils/colorUtils'

export interface CharacterCardProps {
  character: CharacterResult
  mbtiType: string
  identity: 'A' | 'T'
  element?: string
  nhatChu?: string
  lifePath?: number
  gender?: string
  genderPreference?: string
  mbtiNickname?: string
  combinationPhrase?: string
  onTraitClick?: (traitIndex: number) => void
}

const FONT = "'Be Vietnam Pro', system-ui, sans-serif"

export default function CharacterCard({
  character,
  mbtiType,
  identity,
  element,
  nhatChu,
  lifePath,
  gender,
  genderPreference,
  mbtiNickname = '',
  combinationPhrase = '',
  onTraitClick,
}: CharacterCardProps) {
  const [bgFailed, setBgFailed] = useState(false)
  const [figureFailed, setFigureFailed] = useState(false)

  const hasSpiritualData = !!(element && nhatChu)
  const showHero = hasSpiritualData && !bgFailed
  const accent = getElementAccent(element)
  const gradient = getElementGradient(element)
  const growthDisplay = buildGrowthZoneDisplay(
    character.archetypeKey,
    lifePath,
    element,
    nhatChu,
  )
  const strengthsTitle = character.isPartialResult
    ? 'Điểm mạnh từ MBTI'
    : 'Điểm mạnh cốt lõi'

  const bgPath =
    hasSpiritualData && nhatChu && element
      ? buildBackgroundPath(nhatChu, element)
      : null
  const figurePath = buildFigurePath(mbtiType, gender, genderPreference)

  return (
    <div
      style={{
        fontFamily: FONT,
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0F0F14',
      }}
    >
      {showHero && bgPath ? (
        <div
          style={{
            position: 'relative',
            height: 220,
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
          }}
        >
          <img
            src={bgPath}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={() => setBgFailed(true)}
          />
          {!figureFailed ? (
            <img
              src={figurePath}
              alt=""
              style={{
                position: 'absolute',
                bottom: -24,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'auto',
                height: 224,
                objectFit: 'contain',
                objectPosition: 'center bottom',
                pointerEvents: 'none',
              }}
              onError={() => setFigureFailed(true)}
            />
          ) : null}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background:
                'linear-gradient(to bottom, transparent, rgba(15,15,20,0.6) 40%, #0F0F14 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      ) : null}

      <div style={{ background: gradient, padding: 20 }}>
        <h1
          style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {mbtiNickname || character.archetypeLabel}
        </h1>

        {combinationPhrase ? (
          <p
            style={{
              color: accent,
              fontSize: 14,
              fontWeight: 500,
              marginTop: 6,
              lineHeight: 1.35,
            }}
          >
            {combinationPhrase}
          </p>
        ) : null}

        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)', marginTop: 10 }}>
          <p style={{ margin: 0 }}>
            MBTI:{' '}
            <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>
              {mbtiType}-{identity}
            </span>
          </p>
          {character.hasSpiritualData && element && lifePath != null ? (
            <p style={{ margin: '6px 0 0' }}>
              <span style={{ color: accent, fontWeight: 500 }}>{element}</span>
              {' · '}
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>Số {lifePath}</span>
            </p>
          ) : null}
        </div>

        {character.isPartialResult ? (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 16,
              background: 'rgba(255,191,0,0.08)',
              border: '1px solid rgba(255,191,0,0.2)',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.5 }}>
              Nhập ngày sinh để xác nhận bởi Tâm Linh →
            </p>
            <Link
              to="/explore"
              style={{
                display: 'block',
                marginTop: 12,
                textAlign: 'center',
                padding: '12px 16px',
                background: 'rgba(255,191,0,0.85)',
                color: '#0A0A0F',
                fontWeight: 600,
                borderRadius: 12,
                textDecoration: 'none',
                fontSize: 14,
              }}
            >
              Khám phá Tâm Linh
            </Link>
          </div>
        ) : null}

        <div style={{ marginTop: 16 }}>
          <CollapsibleSection title={strengthsTitle}>
            {character.coreTraits.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {character.coreTraitLabels.map((label, i) => {
                  const Tag = onTraitClick ? 'button' : 'span'
                  return (
                    <Tag
                      key={`${character.coreTraits[i]}-${i}`}
                      type={onTraitClick ? 'button' : undefined}
                      onClick={onTraitClick ? () => onTraitClick(i) : undefined}
                      style={{
                        background: hexToRgba(accent, 0.08),
                        border: `1px solid ${hexToRgba(accent, 0.25)}`,
                        color: hexToRgba(accent, 0.85),
                        borderRadius: 20,
                        padding: '4px 12px',
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: onTraitClick ? 'pointer' : 'default',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      {label}
                      {!character.isPartialResult ? (
                        <span style={{ opacity: 0.7 }} aria-hidden>
                          ✓
                        </span>
                      ) : null}
                    </Tag>
                  )
                })}
              </div>
            ) : (
              <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                Làm thêm quiz hoặc nhập ngày sinh để thấy điểm mạnh cốt lõi
              </p>
            )}
          </CollapsibleSection>
        </div>

        {growthDisplay.coreShadow || growthDisplay.coreParadox ? (
          <div style={{ marginTop: 8 }}>
            <CollapsibleSection title="Vùng phát triển">
              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.28)',
                    marginBottom: 5,
                  }}
                >
                  ⚡ Thách thức cốt lõi
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: 0,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {growthDisplay.coreShadow}
                </p>
              </div>

              <div style={{ marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.28)',
                    marginBottom: 5,
                  }}
                >
                  ◎ Nghịch lý
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    margin: 0,
                    color: 'rgba(255,255,255,0.60)',
                    fontStyle: 'italic',
                  }}
                >
                  {growthDisplay.coreParadox}
                </p>
              </div>

              {growthDisplay.lpInsight ? (
                <div style={{ marginBottom: 14 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.28)',
                      marginBottom: 5,
                    }}
                  >
                    ◆ Số học nói gì
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      margin: 0,
                      color: 'rgba(255,255,255,0.65)',
                      borderLeft: '2px solid rgba(255,255,255,0.18)',
                      paddingLeft: 10,
                    }}
                  >
                    {growthDisplay.lpInsight}
                  </p>
                </div>
              ) : null}

              {growthDisplay.elementInsight ? (
                <div style={{ marginBottom: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.28)',
                      marginBottom: 5,
                    }}
                  >
                    ◈ Năng lượng nguyên tố
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      lineHeight: 1.6,
                      margin: 0,
                      color: 'rgba(255,210,120,0.70)',
                    }}
                  >
                    {growthDisplay.elementInsight}
                  </p>
                </div>
              ) : null}
            </CollapsibleSection>
          </div>
        ) : null}
      </div>
    </div>
  )
}
