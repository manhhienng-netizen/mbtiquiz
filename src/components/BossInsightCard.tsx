import { useEffect, useState, type CSSProperties } from 'react'
import type { BossInsightCard as BossInsightCardData } from '../data/boss-insight-cards'
import type { MbtiType } from '../data/manager-coaching-b2b'
import { getWorkArchetypeLabel } from './WorkShareCard'

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

const bulletStyle: CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.75)',
  margin: '0 0 8px',
  paddingLeft: '14px',
  position: 'relative',
}

const stepButtonStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  minHeight: '44px',
  marginTop: '14px',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(212,184,128,0.35)',
  background: 'rgba(212,184,128,0.08)',
  color: '#D4B880',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  textAlign: 'center',
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((item) => (
        <li key={item} style={bulletStyle}>
          <span
            style={{
              position: 'absolute',
              left: 0,
              color: 'rgba(168,230,61,0.65)',
            }}
          >
            ·
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function StepButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={stepButtonStyle}>
      {label}
    </button>
  )
}

interface BossInsightCardProps {
  card: BossInsightCardData
}

export default function BossInsightCard({ card }: BossInsightCardProps) {
  const [step, setStep] = useState(0)
  const archetypeLabel = getWorkArchetypeLabel(card.bossType as MbtiType)

  useEffect(() => {
    setStep(0)
  }, [card.bossType])

  return (
    <article style={cardStyle}>
      <h3
        style={{
          margin: '0 0 12px',
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: 1.4,
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        {card.bossType} — {archetypeLabel}
      </h3>

      <p style={{ ...bodyText, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>
        {card.howTheyThink}
      </p>

      {step >= 1 ? (
        <>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '14px',
              marginBottom: '14px',
            }}
          >
            <div>
              <BulletList items={card.whatTheyNeed} />
            </div>
            <div>
              <BulletList items={card.howToApproach} />
            </div>
          </div>

          {card.sampleScripts && card.sampleScripts.length > 0 ? (
            <div style={{ marginBottom: '14px' }}>
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#D4B880',
                }}
              >
                💬 Bạn có thể nói:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {card.sampleScripts.map((script) => (
                  <p
                    key={script}
                    style={{
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.72)',
                      fontStyle: 'italic',
                      borderLeft: '2px solid rgba(212,184,128,0.30)',
                      paddingLeft: '12px',
                    }}
                  >
                    &ldquo;{script}&rdquo;
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {step === 0 ? (
        <StepButton label="Xem cách tiếp cận →" onClick={() => setStep(1)} />
      ) : null}

      {step >= 2 ? (
        <>
          <p
            style={{
              ...bodyText,
              marginBottom: '10px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'rgba(255,200,120,0.06)',
              border: '1px solid rgba(255,200,120,0.14)',
              color: 'rgba(255,255,255,0.78)',
            }}
          >
            {card.whatToAvoid}
          </p>

          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.48)',
              fontStyle: 'italic',
              margin: '0 0 16px',
            }}
          >
            {card.signalToWatch}
          </p>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.90)',
              margin: 0,
              fontWeight: 500,
            }}
          >
            {card.selfCheck}
          </p>
        </>
      ) : null}

      {step === 1 ? (
        <StepButton
          label="Điều nên tránh & Tự check →"
          onClick={() => setStep(2)}
        />
      ) : null}
    </article>
  )
}
