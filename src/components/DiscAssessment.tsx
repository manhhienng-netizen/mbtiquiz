import { useState, type CSSProperties } from 'react'
import { DISC_ITEMS, DISC_OPTION_LETTERS } from '../data/disc-items'
import { scoreDisc, type DiscLetter, type DiscProfile } from '../lib/disc-scoring'

interface DiscAssessmentProps {
  onComplete: (profile: DiscProfile) => void
  onSkip: () => void
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const

const shellStyle: CSSProperties = {
  minHeight: '100dvh',
  background: '#0A0A0F',
  fontFamily: "'Be Vietnam Pro', sans-serif",
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 20px',
  paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
}

const cardStyle: CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  margin: '0 auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

export default function DiscAssessment({ onComplete, onSkip }: DiscAssessmentProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<DiscLetter[]>([])
  const [selected, setSelected] = useState<DiscLetter | null>(null)

  const item = DISC_ITEMS[current]
  const progress = ((current + 1) / DISC_ITEMS.length) * 100

  function handleNext() {
    if (!selected) return

    const nextAnswers = [...answers, selected]
    setSelected(null)

    if (current >= DISC_ITEMS.length - 1) {
      onComplete(scoreDisc(nextAnswers))
      return
    }

    setAnswers(nextAnswers)
    setCurrent((c) => c + 1)
  }

  return (
    <div style={shellStyle}>
      <div style={cardStyle}>
        <div style={{ marginBottom: '20px' }}>
          <p
            style={{
              margin: '0 0 4px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Phong cách làm việc · 12 câu · ~3 phút
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Chọn option nào gần với bạn nhất trong môi trường bạn cảm thấy thoải
            mái.
          </p>
        </div>

        <div
          style={{
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: '#A8E63D',
              transition: 'width 0.2s ease',
            }}
          />
        </div>
        <p
          style={{
            margin: '0 0 20px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Q{current + 1}/12
        </p>

        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '16px',
          }}
        >
          <p
            style={{
              margin: '0 0 16px',
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {item.situation}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DISC_OPTION_LETTERS.map((letter, i) => {
              const active = selected === letter
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelected(letter)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: active
                      ? '1px solid rgba(168,230,61,0.45)'
                      : '1px solid rgba(255,255,255,0.10)',
                    background: active
                      ? 'rgba(168,230,61,0.10)'
                      : 'rgba(255,255,255,0.03)',
                    color: active ? '#A8E63D' : 'rgba(255,255,255,0.80)',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      marginRight: '8px',
                      color: active ? '#A8E63D' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {OPTION_LABELS[i]}.
                  </span>
                  {item.options[letter]}
                </button>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={!selected}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '14px',
            border: 'none',
            background: !selected ? 'rgba(168,230,61,0.25)' : '#A8E63D',
            color: !selected ? 'rgba(255,255,255,0.4)' : '#0A0A0F',
            fontSize: '15px',
            fontWeight: 700,
            cursor: !selected ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            marginBottom: '12px',
          }}
        >
          {current >= DISC_ITEMS.length - 1 ? 'Hoàn thành' : 'Tiếp'}
        </button>

        <button
          type="button"
          onClick={onSkip}
          style={{
            display: 'block',
            width: '100%',
            padding: '8px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.40)',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Bỏ qua
        </button>
      </div>
    </div>
  )
}
