import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import {
  getConsequence,
  getMbtiGroup,
  getTypeFeedback,
  type RolePlayCase,
} from '../data/roleplay-case-studies'
import { isPremiumActive } from '../lib/arena-premium'

type RevealStep = 'context' | 'choices' | 'consequence' | 'feedback' | 'mirror'

export type { RevealStep }

const accent = '#A8E63D'

const INTERNAL_TAGS = new Set([
  'static-arc',
  'tutorial',
  'ai-arc',
  'NV',
  'MG',
  'KH',
  'DT',
  'VT',
])

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.2)',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
}

const textStyle: CSSProperties = {
  fontSize: 14,
  color: 'rgba(255,255,255,0.85)',
  lineHeight: 1.6,
  margin: 0,
  whiteSpace: 'pre-line',
}

const btnPrimary: CSSProperties = {
  width: '100%',
  padding: '10px 0',
  borderRadius: 8,
  background: accent,
  color: '#0A0A0F',
  fontWeight: 600,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  marginTop: 12,
}

const btnSecondary: CSSProperties = {
  ...btnPrimary,
  background: 'rgba(255,255,255,0.08)',
  color: 'rgba(255,255,255,0.7)',
}

interface Props {
  case_: RolePlayCase
  mbtiType: string
  onBack?: () => void
  onStepChange?: (step: RevealStep) => void
  onChoiceSelect?: (choiceId: 'A' | 'B' | 'C') => void
  enableFreeform?: boolean
  onFreeformSubmit?: (input: string) => void
  freeformLoading?: boolean
  freeformError?: string | null
  interactionLocked?: boolean
  hideChoiceRetry?: boolean
}

function StepBlock({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: accent,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

export function RolePlayCaseCard({
  case_,
  mbtiType,
  onBack,
  onStepChange,
  onChoiceSelect,
  enableFreeform = false,
  onFreeformSubmit,
  freeformLoading = false,
  freeformError = null,
  interactionLocked = false,
  hideChoiceRetry = false,
}: Props) {
  const [step, setStep] = useState<RevealStep>('context')
  const [chosenId, setChosenId] = useState<'A' | 'B' | 'C' | null>(null)
  const [freeformInput, setFreeformInput] = useState('')
  const premium = isPremiumActive()

  useEffect(() => {
    onStepChange?.(step)
  }, [step, onStepChange])

  const userGroup = getMbtiGroup(mbtiType)
  const consequence = chosenId ? getConsequence(case_, chosenId) : null
  const feedback = chosenId ? getTypeFeedback(case_, mbtiType) : null

  function choose(id: 'A' | 'B' | 'C') {
    if (interactionLocked || freeformLoading) return
    setChosenId(id)
    onChoiceSelect?.(id)
    setStep('consequence')
  }

  function retryChoices() {
    setChosenId(null)
    setStep('choices')
  }

  const showChoices =
    step === 'choices' ||
    step === 'consequence' ||
    step === 'feedback' ||
    step === 'mirror'
  const showConsequence =
    (step === 'consequence' || step === 'feedback' || step === 'mirror') &&
    consequence
  const showFeedback =
    (step === 'feedback' || step === 'mirror') && feedback

  const displayTags = (case_.tags ?? []).filter((t) => !INTERNAL_TAGS.has(t))

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
            }}
          >
            {case_.title}
          </h3>
        </div>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'inherit',
              flexShrink: 0,
            }}
          >
            ← Danh sách
          </button>
        ) : null}
      </div>

      {displayTags.length > 0 ? (
        <div
          style={{
            display: 'flex',
            gap: 6,
            flexWrap: 'wrap',
            marginBottom: 12,
          }}
        >
          {displayTags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.05)',
                padding: '2px 8px',
                borderRadius: 6,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <StepBlock label="Bối cảnh">
        <p style={textStyle}>{case_.hook}</p>
        <p style={{ ...textStyle, marginTop: 8 }}>{case_.setup}</p>
      </StepBlock>

      {step === 'context' ? (
        <button type="button" style={btnPrimary} onClick={() => setStep('choices')}>
          Xem các lựa chọn →
        </button>
      ) : null}

      {showChoices ? (
        <StepBlock label="Bạn sẽ làm gì?">
          {case_.choices.map((choice) => {
            const isChosen = chosenId === choice.id
            const isDimmed = chosenId !== null && !isChosen
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => step === 'choices' && choose(choice.id)}
                disabled={step !== 'choices' || interactionLocked || freeformLoading}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: 8,
                  padding: '10px 12px',
                  borderRadius: 8,
                  cursor: step === 'choices' ? 'pointer' : 'default',
                  background: isChosen
                    ? 'rgba(168,230,61,0.10)'
                    : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isChosen ? accent : 'rgba(168,230,61,0.2)'}`,
                  opacity: isDimmed ? 0.4 : 1,
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ color: accent, fontWeight: 700, marginRight: 6 }}>
                  {choice.id}.
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 12,
                    color: accent,
                    marginBottom: 4,
                  }}
                >
                  {choice.label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.55,
                  }}
                >
                  {choice.action}
                </span>
              </button>
            )
          })}
          {enableFreeform && step === 'choices' && !chosenId && !interactionLocked ? (
            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                Hoặc cách bạn xử:
              </p>
              <textarea
                value={freeformInput}
                onChange={(e) => setFreeformInput(e.target.value)}
                disabled={!premium || freeformLoading}
                placeholder={
                  premium
                    ? 'Bạn sẽ làm gì?'
                    : 'Mở để AI phân tích cách xử của bạn ✨'
                }
                maxLength={300}
                rows={2}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '10px 12px',
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.85)',
                  resize: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.5,
                  opacity: !premium || freeformLoading ? 0.5 : 1,
                  cursor: !premium || freeformLoading ? 'not-allowed' : 'text',
                  outline: 'none',
                }}
              />
              {!premium ? (
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: 11,
                    color: 'rgba(168,230,61,0.7)',
                  }}
                >
                  ✨ Premium: AI phân tích cách xử riêng của bạn
                </p>
              ) : (
                <div
                  style={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                    {freeformInput.length}/300
                  </span>
                  <button
                    type="button"
                    onClick={() => onFreeformSubmit?.(freeformInput)}
                    disabled={freeformInput.trim().length < 5 || freeformLoading}
                    style={{
                      padding: '6px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: accent,
                      color: '#0A0A0F',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor:
                        freeformInput.trim().length < 5 || freeformLoading
                          ? 'not-allowed'
                          : 'pointer',
                      opacity: freeformInput.trim().length < 5 || freeformLoading ? 0.4 : 1,
                      fontFamily: 'inherit',
                    }}
                  >
                    {freeformLoading ? 'Đang xử lý...' : 'Xử lý →'}
                  </button>
                </div>
              )}
              {freeformError ? (
                <p
                  style={{
                    margin: '8px 0 0',
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: 'rgba(255,180,100,0.9)',
                  }}
                >
                  {freeformError}
                </p>
              ) : null}
            </div>
          ) : null}
        </StepBlock>
      ) : null}

      {showConsequence ? (
        <StepBlock label="Điều xảy ra">
          <div style={{ marginBottom: 8 }}>
            <p
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 4px',
              }}
            >
              Ngay lúc đó
            </p>
            <p style={textStyle}>{consequence.immediate}</p>
          </div>
          <div>
            <p
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 4px',
              }}
            >
              Về sau
            </p>
            <p style={textStyle}>{consequence.later}</p>
          </div>
        </StepBlock>
      ) : null}

      {step === 'consequence' ? (
        <button type="button" style={btnPrimary} onClick={() => setStep('feedback')}>
          Xem góc nhìn theo tính cách →
        </button>
      ) : null}

      {showFeedback ? (
        <StepBlock label={`Góc nhìn cho nhóm ${userGroup}`}>
          <p style={textStyle}>{feedback.text}</p>
        </StepBlock>
      ) : null}

      {step === 'feedback' ? (
        <button type="button" style={btnPrimary} onClick={() => setStep('mirror')}>
          Câu hỏi tự vấn →
        </button>
      ) : null}

      {step === 'mirror' ? (
        <>
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 8,
              background: 'rgba(168,230,61,0.06)',
              border: '1px solid rgba(168,230,61,0.15)',
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: accent,
                margin: '0 0 6px',
              }}
            >
              💭 Tự vấn
            </p>
            <p style={{ ...textStyle, fontStyle: 'italic' }}>{case_.mirrorMoment}</p>
          </div>
          {!hideChoiceRetry ? (
            <button type="button" style={btnSecondary} onClick={retryChoices}>
              ↺ Thử lại với lựa chọn khác
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
