import { useState, type CSSProperties } from 'react'
import { getOccupationAnchor } from '../data/occupation-anchor'
import { MBTI_COMPETENCY_MAP, MANAGER_COACHING_GUIDE } from '../data/work-competency'
import { PROCRASTINATION_BY_TYPE } from '../data/work-procrastination'
import { PROCRASTINATION_SHARP } from '../data/work-sharpen'
import { getStrengths, reframeYou, stripTag } from '../utils/workContent'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
  marginBottom: '16px',
}

const labelStyle: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.40)',
  marginBottom: '12px',
}

const bodyText: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.80)',
  marginBottom: '10px',
}

const revealCardStyle: CSSProperties = {
  animation: 'workProfileFadeSlideIn 0.3s ease',
}

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginTop: 8,
        padding: 0,
        border: 'none',
        background: 'none',
        color: '#A8E63D',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      Xem tiếp →
    </button>
  )
}

const anchorStyle: CSSProperties = {
  marginBottom: '12px',
  fontSize: '14px',
  lineHeight: 1.65,
  color: '#A8E63D',
  borderLeft: '2px solid rgba(168,230,61,0.30)',
  paddingLeft: '12px',
}

function OccupationAnchor({ text }: { text: string }) {
  return <p style={anchorStyle}>{text}</p>
}

export interface WorkProfileCardsProps {
  mbtiType: string
  occupation?: string | null
}

export default function WorkProfileCards({ mbtiType, occupation }: WorkProfileCardsProps) {
  const [revealedCount, setRevealedCount] = useState(1)

  const competency = MBTI_COMPETENCY_MAP[mbtiType]
  const coaching = MANAGER_COACHING_GUIDE[mbtiType]
  const procrast = PROCRASTINATION_BY_TYPE[mbtiType]

  if (!competency || !coaching || !procrast) {
    return (
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
        Chưa có dữ liệu phân tích cho type {mbtiType}.
      </p>
    )
  }

  const strengths = getStrengths(competency, coaching)
  const bestEnv =
    competency.managerInsights.bestAssignment ||
    coaching.bestAssignments[0] ||
    ''
  const escapeStrategy = procrast.strategies[0]
  const procrastinationSharp =
    PROCRASTINATION_SHARP[mbtiType] ?? procrast.rootCause

  const strengthsAnchor = getOccupationAnchor(occupation, mbtiType, 'strengths')
  const procrastinationAnchor = getOccupationAnchor(
    occupation,
    mbtiType,
    'procrastination',
  )
  const environmentAnchor = getOccupationAnchor(occupation, mbtiType, 'environment')

  return (
    <>
      <style>{`
        @keyframes workProfileFadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={cardStyle}>
        <p style={labelStyle}>⚡ Bạn tỏa sáng khi</p>
        {strengthsAnchor ? <OccupationAnchor text={strengthsAnchor} /> : null}
        {strengths.map((s, i) => (
          <p key={i} style={bodyText}>
            {reframeYou(s, mbtiType)}
          </p>
        ))}
        {revealedCount < 2 ? (
          <ContinueButton onClick={() => setRevealedCount(2)} />
        ) : null}
      </div>

      {revealedCount >= 2 ? (
        <div
          style={{
            ...cardStyle,
            ...revealCardStyle,
            border: '1px solid rgba(168,230,61,0.25)',
          }}
        >
          <p style={labelStyle}>⏳ Tại sao bạn trì hoãn</p>
          {procrastinationAnchor ? (
            <OccupationAnchor text={procrastinationAnchor} />
          ) : null}
          <p style={bodyText}>{reframeYou(procrastinationSharp, mbtiType)}</p>
          {escapeStrategy ? (
            <p style={{ color: '#A8E63D', fontSize: 14, lineHeight: 1.6, marginBottom: 0 }}>
              → Cách thoát: {escapeStrategy.micro_action}
            </p>
          ) : null}
          {revealedCount < 3 ? (
            <ContinueButton onClick={() => setRevealedCount(3)} />
          ) : null}
        </div>
      ) : null}

      {revealedCount >= 3 ? (
        <div style={{ ...cardStyle, ...revealCardStyle, marginBottom: 0 }}>
          <p style={labelStyle}>💼 Môi trường lý tưởng</p>
          {environmentAnchor ? <OccupationAnchor text={environmentAnchor} /> : null}
          <p style={{ ...bodyText, marginBottom: 0 }}>
            Bạn tỏa sáng khi làm: {reframeYou(stripTag(bestEnv), mbtiType)}
          </p>
        </div>
      ) : null}
    </>
  )
}
