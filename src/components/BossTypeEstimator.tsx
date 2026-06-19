import { useState, type CSSProperties } from 'react'
import type { MbtiType } from '../data/manager-coaching-b2b'
import {
  applyAnswer,
  emptyDimensionScore,
  ESTIMATOR_QUESTIONS,
  resolveType,
  type DimensionScore,
  type ResolveTypeResult,
} from '../data/boss-type-estimator'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
  marginBottom: '16px',
}

const disclaimerStyle: CSSProperties = {
  fontSize: '12px',
  lineHeight: 1.55,
  color: 'rgba(255,255,255,0.42)',
  fontStyle: 'italic',
  margin: '12px 0 0',
}

interface BossTypeEstimatorProps {
  onSelectType: (type: MbtiType) => void
  onComplete: (result: ResolveTypeResult) => void
  onShowFullPicker: () => void
  onSkip: () => void
}

type Step = number | 'result'

export default function BossTypeEstimator({
  onSelectType,
  onComplete,
  onShowFullPicker,
  onSkip,
}: BossTypeEstimatorProps) {
  const [step, setStep] = useState<Step>(0)
  const [score, setScore] = useState<DimensionScore>(emptyDimensionScore)
  const [result, setResult] = useState<ResolveTypeResult | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const totalSteps = ESTIMATOR_QUESTIONS.length

  if (step === 'result' && result) {
    const lowConfidence = result.confidence === 'thấp'

    return (
      <div style={cardStyle}>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '10px',
          }}
        >
          Kết quả ước lượng
        </div>

        {lowConfidence ? (
          <p
            style={{
              margin: '0 0 14px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Mô tả chưa đủ để ước lượng chắc chắn — bạn xem cả 16 type và tự chọn nhé.
          </p>
        ) : (
          <>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: '15px',
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              Dựa trên mô tả, sếp có thể thuộc:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
              {result.topTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onSelectType(type)}
                  style={pillStyle(false)}
                >
                  {type}
                </button>
              ))}
            </div>
          </>
        )}

        <p style={disclaimerStyle}>
          Đây là ước lượng — không phải chẩn đoán.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '16px',
          }}
        >
          <button type="button" onClick={onShowFullPicker} style={secondaryButtonStyle}>
            {lowConfidence ? 'Xem 16 type' : 'Xem tất cả 16 type'}
          </button>
          <button type="button" onClick={onSkip} style={ghostButtonStyle}>
            Bỏ qua, tự chọn
          </button>
        </div>
      </div>
    )
  }

  const question = ESTIMATOR_QUESTIONS[step as number]
  if (!question) return null

  const isLast = step === totalSteps - 1

  return (
    <div style={cardStyle}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.38)',
          marginBottom: '12px',
        }}
      >
        Câu {(step as number) + 1} / {totalSteps}
      </div>

      <p
        style={{
          margin: '0 0 16px',
          fontSize: '15px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.90)',
          fontWeight: 500,
        }}
      >
        {question.text}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {question.options.map((option) => {
          const selected = selectedOption === option.id
          return (
            <label
              key={option.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: selected
                  ? '1px solid rgba(168,230,61,0.45)'
                  : '1px solid rgba(255,255,255,0.10)',
                background: selected
                  ? 'rgba(168,230,61,0.10)'
                  : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name={`estimator-q-${question.id}`}
                checked={selected}
                onChange={() => setSelectedOption(option.id)}
                style={{ marginTop: '3px', accentColor: '#A8E63D' }}
              />
              <span
                style={{
                  fontSize: '14px',
                  lineHeight: 1.55,
                  color: selected ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
                }}
              >
                {option.label}
              </span>
            </label>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          disabled={!selectedOption}
          onClick={() => {
            const option = question.options.find((o) => o.id === selectedOption)
            if (!option) return
            const nextScore = applyAnswer(score, option.delta)
            setScore(nextScore)
            setSelectedOption(null)
            if (isLast) {
              const resolved = resolveType(nextScore)
              setResult(resolved)
              onComplete(resolved)
              setStep('result')
            } else {
              setStep((step as number) + 1)
            }
          }}
          style={{
            ...primaryButtonStyle,
            opacity: selectedOption ? 1 : 0.45,
            cursor: selectedOption ? 'pointer' : 'not-allowed',
          }}
        >
          {isLast ? 'Xem kết quả' : 'Tiếp'}
        </button>
        <button type="button" onClick={onSkip} style={ghostButtonStyle}>
          Bỏ qua
        </button>
      </div>
    </div>
  )
}

const primaryButtonStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(168,230,61,0.45)',
  background: 'rgba(168,230,61,0.14)',
  color: '#A8E63D',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const secondaryButtonStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.14)',
  background: 'rgba(255,255,255,0.05)',
  color: 'rgba(255,255,255,0.80)',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const ghostButtonStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid transparent',
  background: 'transparent',
  color: 'rgba(255,255,255,0.50)',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

function pillStyle(selected: boolean): CSSProperties {
  return {
    padding: '8px 14px',
    borderRadius: '10px',
    border: selected
      ? '1px solid rgba(168,230,61,0.45)'
      : '1px solid rgba(255,255,255,0.12)',
    background: selected ? 'rgba(168,230,61,0.12)' : 'rgba(255,255,255,0.05)',
    color: selected ? '#A8E63D' : 'rgba(255,255,255,0.80)',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}
