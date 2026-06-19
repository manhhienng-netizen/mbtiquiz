import type { CSSProperties } from 'react'
import { PA_ACCENT } from '../components/PaShell'
import {
  getLegalRestrictions,
  type LegalCase,
} from '../lib/pa-legal'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid rgba(127,119,221,0.25)`,
  borderRadius: 16,
  padding: '18px 16px',
  marginBottom: 14,
  backdropFilter: 'blur(8px)',
  textAlign: 'left',
}

const sectionTitle: CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.85)',
  marginBottom: 8,
}

const bulletList: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
  fontSize: 13,
  lineHeight: 1.55,
  color: 'rgba(255,255,255,0.68)',
}

export default function LegalCaseCard({ legalCase }: { legalCase: LegalCase }) {
  const restrictions = getLegalRestrictions(legalCase)

  return (
    <article style={cardStyle}>
      <h3
        style={{
          margin: '0 0 10px',
          fontSize: 16,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.35,
        }}
      >
        {legalCase.title}
      </h3>

      <p
        style={{
          margin: '0 0 14px',
          fontSize: 13,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.62)',
        }}
      >
        {legalCase.context}
      </p>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 14,
        }}
      >
        <p style={sectionTitle}>✅ Quyền của bạn:</p>
        <ul style={bulletList}>
          {legalCase.userRights.map((right) => (
            <li key={right} style={{ marginBottom: 6 }}>
              {right}
            </li>
          ))}
        </ul>

        {restrictions.length > 0 ? (
          <>
            <p style={{ ...sectionTitle, marginTop: 14 }}>❌ Không được phép / Bẫy thường gặp:</p>
            <ul style={bulletList}>
              {restrictions.map((item) => (
                <li key={item} style={{ marginBottom: 6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          marginTop: 14,
          paddingTop: 14,
        }}
      >
        <p style={sectionTitle}>💡 Bước thực tế:</p>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.68)',
          }}
        >
          {legalCase.practicalStep}
        </p>

        <p
          style={{
            margin: '12px 0 4px',
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          ⚖️ Căn cứ: {legalCase.legalBasis}
        </p>
        <p
          style={{
            margin: '0 0 8px',
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          🕐 Cập nhật: {legalCase.lastUpdated}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            color: PA_ACCENT,
            opacity: 0.75,
            fontStyle: 'italic',
          }}
        >
          ⚠️ {legalCase.disclaimer}
        </p>
      </div>
    </article>
  )
}
