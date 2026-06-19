import { useEffect, useState } from 'react'
import type { QuizQuestion } from '../data/mbti-quiz-data'

export interface QuizCardProps {
  question: QuizQuestion
  onAnswer: (value: 1 | 2 | 3 | 4 | 5) => void
  disabled?: boolean
}

const LIKERT_VALUES = [1, 2, 3, 4, 5] as const
const BAR_HEIGHTS = [68, 50, 32, 50, 68] as const
const NEON_GREEN = '#A8E63D'
const HINT_LABELS = [
  'Rất thiên về A',
  'Thiên về A',
  'Trung lập',
  'Thiên về B',
  'Rất thiên về B',
] as const

export default function QuizCard({
  question,
  onAnswer,
  disabled = false,
}: QuizCardProps) {
  const [selectedValue, setSelectedValue] = useState<1 | 2 | 3 | 4 | 5 | null>(
    null,
  )

  useEffect(() => {
    setSelectedValue(null)
  }, [question.id])

  const handleSelect = (value: 1 | 2 | 3 | 4 | 5) => {
    if (disabled) return
    setSelectedValue(value)
    onAnswer(value)
  }

  return (
    <div
      key={question.id}
      style={{
        width: '100%',
        maxWidth: 400,
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: 24,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '28px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        animation: 'questionIn 0.25s ease both',
      }}
    >
      <p
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.92)',
          lineHeight: 1.4,
          margin: '0 0 20px',
        }}
      >
        {question.situation}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.60)',
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
            A:
          </span>{' '}
          {question.optionA}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.60)',
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
            B:
          </span>{' '}
          {question.optionB}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 3,
          padding: '0 2px',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: NEON_GREEN }}>
          A
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: NEON_GREEN }}>
          B
        </span>
      </div>

      <div
        role="group"
        aria-label="Thang điểm Likert 5 mức"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 5,
          height: 72,
          padding: '0 2px',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {LIKERT_VALUES.map((val) => {
          const isSelected = selectedValue === val
          const dist = selectedValue ? Math.abs(val - selectedValue) : -1

          const bg = isSelected
            ? NEON_GREEN
            : dist === 1
              ? 'rgba(168,230,61,0.40)'
              : 'rgba(168,230,61,0.20)'

          const glow = isSelected
            ? `0 0 8px ${NEON_GREEN}, 0 0 20px rgba(168,230,61,0.55), 0 0 40px rgba(168,230,61,0.25)`
            : dist === 1
              ? '0 0 6px rgba(168,230,61,0.25)'
              : 'none'

          return (
            <button
              key={val}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(val)}
              aria-label={HINT_LABELS[val - 1]}
              aria-pressed={isSelected}
              style={{
                flex: 1,
                minWidth: 0,
                border: 'none',
                borderRadius: '4px 4px 0 0',
                background: bg,
                boxShadow: glow,
                cursor: disabled ? 'not-allowed' : 'pointer',
                height: `${BAR_HEIGHTS[val - 1]}px`,
                transform: isSelected ? 'scaleY(1.06)' : 'none',
                transformOrigin: 'bottom',
                transition: 'all 0.18s ease',
              }}
            />
          )
        })}
      </div>

      <div
        style={{
          height: 1,
          background: 'rgba(168,230,61,0.20)',
          margin: '0 2px',
        }}
      />

      <div
        style={{
          textAlign: 'center',
          fontSize: 11,
          color: selectedValue ? NEON_GREEN : 'rgba(255,255,255,0.22)',
          textShadow: selectedValue
            ? '0 0 8px rgba(168,230,61,0.5)'
            : 'none',
          marginTop: 10,
          minHeight: 16,
          fontStyle: selectedValue ? 'normal' : 'italic',
          transition: 'all 0.15s',
        }}
      >
        {selectedValue
          ? HINT_LABELS[selectedValue - 1]
          : 'Chạm vào cột để chọn'}
      </div>
    </div>
  )
}
