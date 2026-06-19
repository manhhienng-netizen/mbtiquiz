import { useEffect, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { MbtiType } from '../data/manager-coaching-b2b'
import {
  getGuidanceCard,
  getS3GuidanceCard,
  SITUATIONS,
  type SituationId,
} from '../data/manager-diagnostic'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(168,230,61,0.22)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
  marginBottom: '20px',
}

const divider: CSSProperties = {
  height: 1,
  background: 'rgba(255,255,255,0.08)',
  margin: '14px 0',
}

const sectionTitle: CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#A8E63D',
  marginBottom: '8px',
}

export interface GuidanceCardProps {
  situationId: SituationId
  mbtiType: MbtiType
  employeeName: string
  managerType?: MbtiType
}

function situationLabel(id: SituationId): string {
  return SITUATIONS.find((s) => s.id === id)?.label ?? id
}

export default function GuidanceCard({
  situationId,
  mbtiType,
  employeeName,
  managerType,
}: GuidanceCardProps) {
  const [copiedField, setCopiedField] = useState<'q1' | 'q2' | null>(null)
  const guidance =
    situationId === 'S3' && managerType
      ? getS3GuidanceCard(managerType, mbtiType)
      : getGuidanceCard(mbtiType, situationId)

  useEffect(() => {
    if (!copiedField) return
    const t = window.setTimeout(() => setCopiedField(null), 2000)
    return () => window.clearTimeout(t)
  }, [copiedField])

  async function handleCopy(text: string, field: 'q1' | 'q2') {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
    } catch {
      // clipboard unavailable — không crash
    }
  }

  if (!guidance) {
    return (
      <div style={{ ...cardStyle, border: '1px solid rgba(255,255,255,0.10)' }}>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.6,
          }}
        >
          Nội dung sẽ có sớm.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        ...cardStyle,
        animation: 'guidance-card-in 0.28s ease-out',
      }}
    >
      <style>
        {`
          @keyframes guidance-card-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <p
        style={{
          margin: '0 0 8px',
          fontSize: '12px',
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.50)',
        }}
      >
        💡 Đọc trước khi gặp {employeeName}
      </p>

      <div
        style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '4px',
        }}
      >
        {mbtiType} × {situationLabel(situationId)}
      </div>

      <div style={divider} />

      <div style={sectionTitle}>
        {situationId === 'S8'
          ? '🌱 Điều họ coi trọng'
          : situationId === 'S3'
            ? '⚡ Điểm ma sát giữa hai người'
            : '👁 Điều hay xảy ra'}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.62)',
          fontStyle: 'italic',
        }}
      >
        {guidance.invest ?? guidance.signal ?? ''}
      </p>

      <div style={divider} />

      <div style={sectionTitle}>✅ Hướng xử lý</div>
      <ul
        style={{
          margin: 0,
          paddingLeft: '18px',
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.82)',
        }}
      >
        {guidance.approach.map((item, i) => (
          <li key={i} style={{ marginBottom: i < 2 ? '6px' : 0 }}>
            {item}
          </li>
        ))}
      </ul>

      <div style={divider} />

      <div style={sectionTitle}>⚠️ Tránh</div>
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.75)',
        }}
      >
        {guidance.avoid}
      </p>

      <div style={divider} />

      <div style={sectionTitle}>💬 Câu để mở đầu cuộc trò chuyện:</div>
      <p
        style={{
          margin: '0 0 12px',
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.88)',
          fontWeight: 500,
        }}
      >
        &ldquo;{guidance.openQuestion}&rdquo;
      </p>
      <button
        type="button"
        onClick={() => void handleCopy(guidance.openQuestion, 'q1')}
        style={{
          padding: '8px 14px',
          borderRadius: '8px',
          border: '1px solid rgba(168,230,61,0.30)',
          background: 'rgba(168,230,61,0.08)',
          color: '#A8E63D',
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {copiedField === 'q1' ? 'Đã copy' : 'Copy câu hỏi'}
      </button>

      {guidance.openQuestion2 ? (
        <>
          <div style={{ ...sectionTitle, marginTop: '16px' }}>
            💬 Và với người kia:
          </div>
          <p
            style={{
              margin: '0 0 12px',
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.88)',
              fontWeight: 500,
            }}
          >
            &ldquo;{guidance.openQuestion2}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => void handleCopy(guidance.openQuestion2!, 'q2')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(168,230,61,0.30)',
              background: 'rgba(168,230,61,0.08)',
              color: '#A8E63D',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {copiedField === 'q2' ? 'Đã copy' : 'Copy câu hỏi'}
          </button>
        </>
      ) : null}

      {situationId === 'S6' ? (
        <p
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: '11px',
            marginTop: '16px',
            fontStyle: 'italic',
          }}
        >
          Người bạn vừa bổ nhiệm cũng có thể tự dùng{' '}
          <Link
            to="/work/self"
            style={{
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'underline',
            }}
          >
            /work/self
          </Link>{' '}
          để chuẩn bị cho vai trò mới.
        </p>
      ) : null}
    </div>
  )
}
