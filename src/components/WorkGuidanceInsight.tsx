import { useEffect, useState, type CSSProperties } from 'react'
import type { CaseStudy } from '../data/manager-case-studies'
import type { GuidanceCardData } from '../data/manager-diagnostic'

type GuidanceWithScripts = GuidanceCardData & { sampleScripts?: string[] }

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(168,230,61,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
  marginBottom: '16px',
}

const sectionLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#A8E63D',
  marginBottom: '8px',
}

const stepButtonStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  minHeight: '44px',
  marginTop: '14px',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(168,230,61,0.35)',
  background: 'rgba(168,230,61,0.08)',
  color: '#A8E63D',
  fontSize: '14px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
  textAlign: 'center',
}

interface WorkGuidanceInsightProps {
  guidance: GuidanceWithScripts
  mode: 'subordinate' | 'colleague'
  situationLabel: string
  personType: string
  cardKey: string
  peerCompatNote?: string | null
  caseStudy?: CaseStudy
}

function retoneForPeer(text: string): string {
  return text
    .replace(/\bGiao việc\b/g, 'Thống nhất phần việc')
    .replace(/\bgiao việc\b/g, 'thống nhất phần việc')
    .replace(/\bGiao\b/g, 'Trao đổi')
    .replace(/\bgiao\b/g, 'trao đổi')
    .replace(/\bnhân viên\b/gi, 'đồng nghiệp')
    .replace(/\bĐừng assign\b/g, 'Đừng áp đặt')
    .replace(/\bassign\b/gi, 'giao việc cứng')
    .replace(/\bmicromanage\b/gi, 'kiểm soát quá chặt')
    .replace(/\bđánh giá\b/gi, 'phán xét')
}

function StepButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} style={stepButtonStyle}>
      {label}
    </button>
  )
}

export default function WorkGuidanceInsight({
  guidance,
  mode,
  situationLabel,
  personType,
  cardKey,
  peerCompatNote,
  caseStudy,
}: WorkGuidanceInsightProps) {
  const [caseOpen, setCaseOpen] = useState(false)
  const [step, setStep] = useState(0)
  const isPeer = mode === 'colleague'

  useEffect(() => {
    setStep(0)
  }, [cardKey])

  const approachLabel = isPeer ? 'Cách phối hợp' : 'Cách tiếp cận 1-1'
  const avoidLabel = isPeer ? 'Ranh giới nên giữ' : 'Điều nên tránh'
  const approachItems = isPeer
    ? guidance.approach.map(retoneForPeer)
    : guidance.approach
  const avoidText = isPeer ? retoneForPeer(guidance.avoid) : guidance.avoid
  const hasExtraStep = !!(guidance.invest || peerCompatNote)

  return (
    <div>
      <article style={cardStyle}>
        <p
          style={{
            margin: '0 0 12px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {situationLabel} · có thể thuộc nhóm {personType}
        </p>

        <p style={sectionLabel}>Thực tế — tình huống của bạn</p>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {guidance.signal}
        </p>

        {step >= 1 ? (
          <>
            <p style={{ ...sectionLabel, marginTop: '14px' }}>{approachLabel}</p>
            <ul
              style={{
                margin: '0 0 14px',
                paddingLeft: '18px',
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.78)',
              }}
            >
              {approachItems.map((item) => (
                <li key={item} style={{ marginBottom: '6px' }}>
                  {item}
                </li>
              ))}
            </ul>

            {guidance.sampleScripts && guidance.sampleScripts.length > 0 ? (
              <div style={{ marginBottom: '14px' }}>
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#A8E63D',
                  }}
                >
                  💬 Bạn có thể nói:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {guidance.sampleScripts.map((script) => (
                    <p
                      key={script}
                      style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: 1.65,
                        color: 'rgba(255,255,255,0.72)',
                        fontStyle: 'italic',
                        borderLeft: '2px solid rgba(168,230,61,0.30)',
                        paddingLeft: '12px',
                      }}
                    >
                      &ldquo;{isPeer ? retoneForPeer(script) : script}&rdquo;
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
            <p style={sectionLabel}>{avoidLabel}</p>
            <p
              style={{
                margin: '0 0 14px',
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {avoidText}
            </p>

            <p style={sectionLabel}>Câu hỏi mở</p>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.78)',
                fontStyle: 'italic',
              }}
            >
              {isPeer ? retoneForPeer(guidance.openQuestion) : guidance.openQuestion}
            </p>

            {guidance.openQuestion2 ? (
              <p
                style={{
                  margin: '10px 0 0',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.78)',
                  fontStyle: 'italic',
                }}
              >
                {isPeer ? retoneForPeer(guidance.openQuestion2) : guidance.openQuestion2}
              </p>
            ) : null}
          </>
        ) : null}

        {step === 1 ? (
          <StepButton
            label="Điều nên tránh & Câu hỏi →"
            onClick={() => setStep(2)}
          />
        ) : null}

        {step >= 3 ? (
          <>
            {guidance.invest ? (
              <>
                <div
                  style={{
                    height: 1,
                    background: 'rgba(255,255,255,0.08)',
                    margin: '16px 0',
                  }}
                />
                <p style={sectionLabel}>Động lực sâu hơn</p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {guidance.invest}
                </p>
              </>
            ) : null}

            {peerCompatNote ? (
              <>
                <div
                  style={{
                    height: 1,
                    background: 'rgba(255,255,255,0.08)',
                    margin: '16px 0',
                  }}
                />
                <p style={sectionLabel}>Quan hệ 2 kiểu</p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {peerCompatNote}
                </p>
              </>
            ) : null}
          </>
        ) : null}

        {step === 2 && hasExtraStep ? (
          <StepButton label="Xem thêm →" onClick={() => setStep(3)} />
        ) : null}

        {step >= 2 ? (
          <p
            style={{
              margin: '14px 0 0',
              fontSize: '11px',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            Đây là xu hướng chung — hỏi trực tiếp tốt hơn giả định type.
          </p>
        ) : null}
      </article>

      {caseStudy ? (
        <div style={{ marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => setCaseOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 14px',
              marginBottom: caseOpen ? '10px' : 0,
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.10)',
              background: caseOpen ? 'rgba(168,230,61,0.08)' : 'rgba(255,255,255,0.04)',
              color: caseOpen ? '#A8E63D' : 'rgba(255,255,255,0.65)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textAlign: 'left',
              minHeight: '44px',
            }}
          >
            <span>Ví dụ thực tế</span>
            <span style={{ fontSize: '11px', opacity: 0.8 }}>{caseOpen ? '▾' : '▸'}</span>
          </button>

          {caseOpen ? (
            <article
              style={{
                ...cardStyle,
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                {caseStudy.title}
              </h4>
              <p
                style={{
                  margin: '0 0 10px',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {caseStudy.context}
              </p>
              <p
                style={{
                  margin: '0 0 10px',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                {caseStudy.whatHappened}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                Tự hỏi: {caseStudy.selfCheck}
              </p>
            </article>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
