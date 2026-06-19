import { useState, type CSSProperties } from 'react'
import {
  estimateExternalStyle,
  EXTERNAL_ESTIMATE_QUESTIONS,
  WORKING_STYLE_LABELS,
  type ExternalEstimate,
  type WorkingStyle,
} from '../data/external-type-estimator'
import { getKinhDoanhGuidance, type KinhDoanhGuidance } from '../data/kinh-doanh-guidance'
import {
  getCasesByRole,
  type RolePlayCase,
} from '../data/roleplay-case-studies'
import { RolePlayCaseCard } from './RolePlayCaseCard'

type SectionMode = 'menu' | 'estimate' | 'guidance' | 'cases' | 'playing'

const accent = '#A8E63D'

const menuBtn: CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  marginBottom: 10,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.25)',
  borderRadius: 12,
  textAlign: 'left',
  cursor: 'pointer',
  fontFamily: 'inherit',
  color: '#fff',
  fontSize: 14,
  lineHeight: 1.5,
}

interface Props {
  context: 'KH' | 'DT'
  mbtiType: string
}

function GuidanceView({
  guidance,
  estimate,
  contextLabel,
  onBack,
}: {
  guidance: KinhDoanhGuidance
  estimate: ExternalEstimate
  contextLabel: string
  onBack: () => void
}) {
  return (
    <div>
      <button type="button" onClick={onBack} style={backBtn}>
        ← Quay lại
      </button>
      <p
        style={{
          fontSize: 12,
          color: accent,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Phong cách {contextLabel}: {WORKING_STYLE_LABELS[estimate.topStyle]} ·
        tin cậy {estimate.confidence}
      </p>
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.9)',
          marginBottom: 12,
        }}
      >
        {guidance.readSignal}
      </p>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: accent,
          marginBottom: 6,
        }}
      >
        Cách tiếp cận
      </p>
      {guidance.approach.map((line, i) => (
        <p
          key={i}
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.8)',
            margin: '0 0 6px',
            display: 'flex',
            gap: 8,
          }}
        >
          <span style={{ color: accent }}>→</span>
          <span>{line}</span>
        </p>
      ))}
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.65)',
          margin: '10px 0',
        }}
      >
        <span style={{ color: 'rgba(255,200,0,0.8)' }}>⚠ </span>
        {guidance.avoid}
      </p>
      <div
        style={{
          marginTop: 10,
          padding: '12px 14px',
          borderRadius: 10,
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
          Giữ thể diện đôi bên
        </p>
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.85)',
            margin: 0,
          }}
        >
          {guidance.faceSaving}
        </p>
      </div>
      <p
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)',
          fontStyle: 'italic',
          marginTop: 12,
          lineHeight: 1.5,
        }}
      >
        Đây là gợi ý theo xu hướng quan sát — bạn hiểu {contextLabel} thật hơn
        mọi ước lượng.
      </p>
    </div>
  )
}

function EstimateFlow({
  onComplete,
  onBack,
}: {
  onComplete: (answers: WorkingStyle[]) => void
  onBack: () => void
}) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<WorkingStyle[]>([])

  const q = EXTERNAL_ESTIMATE_QUESTIONS[step]

  function pick(style: WorkingStyle) {
    const next = [...answers, style]
    if (step >= EXTERNAL_ESTIMATE_QUESTIONS.length - 1) {
      onComplete(next)
      return
    }
    setAnswers(next)
    setStep(step + 1)
  }

  return (
    <div>
      <button type="button" onClick={onBack} style={backBtn}>
        ← Quay lại
      </button>
      <p
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: 8,
        }}
      >
        Câu {step + 1}/{EXTERNAL_ESTIMATE_QUESTIONS.length}
      </p>
      <p
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: '#fff',
          marginBottom: 14,
          lineHeight: 1.5,
        }}
      >
        {q.question}
      </p>
      {q.options.map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => pick(opt.style)}
          style={menuBtn}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function KinhDoanhSection({ context, mbtiType }: Props) {
  const [mode, setMode] = useState<SectionMode>('menu')
  const [estimate, setEstimate] = useState<ExternalEstimate | null>(null)
  const [activeCase, setActiveCase] = useState<RolePlayCase | null>(null)

  const cases = getCasesByRole(context)
  const contextLabel = context === 'KH' ? 'khách hàng' : 'đối tác'

  function resetToMenu() {
    setMode('menu')
    setEstimate(null)
    setActiveCase(null)
  }

  if (mode === 'playing' && activeCase) {
    return (
      <RolePlayCaseCard
        case_={activeCase}
        mbtiType={mbtiType}
        onBack={() => {
          setActiveCase(null)
          setMode('cases')
        }}
      />
    )
  }

  if (mode === 'estimate') {
    return (
      <EstimateFlow
        onBack={resetToMenu}
        onComplete={(answers) => {
          setEstimate(estimateExternalStyle(answers))
          setMode('guidance')
        }}
      />
    )
  }

  if (mode === 'guidance' && estimate) {
    return (
      <GuidanceView
        guidance={getKinhDoanhGuidance(context, estimate.topStyle)}
        estimate={estimate}
        contextLabel={contextLabel}
        onBack={resetToMenu}
      />
    )
  }

  if (mode === 'cases') {
    return (
      <div>
        <button type="button" onClick={resetToMenu} style={backBtn}>
          ← Quay lại
        </button>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 12,
          }}
        >
          {cases.length} tình huống — chọn một ca để luyện
        </p>
        {cases.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => {
              setActiveCase(c)
              setMode('playing')
            }}
            style={menuBtn}
          >
            <span
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              {c.id}
            </span>
            <span
              style={{
                display: 'block',
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              {c.title}
            </span>
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setMode('estimate')}
        style={menuBtn}
      >
        <span style={{ fontSize: 16, marginRight: 8 }}>🎯</span>
        Thực tế: Hiểu cách làm việc của {contextLabel} này
      </button>
      <button
        type="button"
        onClick={() => setMode('cases')}
        style={menuBtn}
      >
        <span style={{ fontSize: 16, marginRight: 8 }}>📖</span>
        Case study: Luyện tình huống ({cases.length} ca)
      </button>
    </div>
  )
}

const backBtn: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'rgba(255,255,255,0.4)',
  fontSize: 13,
  cursor: 'pointer',
  marginBottom: 12,
  padding: 0,
  fontFamily: 'inherit',
}
