import { useState, type CSSProperties } from 'react'
import type { EmployeeCaseStudy as EmployeeCaseStudyData } from '../data/employee-case-studies'

const cardStyle: CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '18px 20px',
  marginBottom: '16px',
}

const mutedText: CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.50)',
  margin: '0 0 12px',
}

const bodyText: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.80)',
  margin: '0 0 12px',
}

interface EmployeeCaseStudyProps {
  study: EmployeeCaseStudyData
  defaultOpen?: boolean
}

export default function EmployeeCaseStudy({
  study,
  defaultOpen = false,
}: EmployeeCaseStudyProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{ marginBottom: '20px' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '10px 14px',
          marginBottom: open ? '10px' : 0,
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.10)',
          background: open ? 'rgba(168,230,61,0.08)' : 'rgba(255,255,255,0.04)',
          color: open ? '#A8E63D' : 'rgba(255,255,255,0.65)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontFamily: 'inherit',
          textAlign: 'left',
        }}
      >
        <span>Ví dụ thực tế</span>
        <span style={{ fontSize: '11px', opacity: 0.8 }}>{open ? '▾' : '▸'}</span>
      </button>

      {open ? (
        <article style={cardStyle}>
          <h4
            style={{
              margin: '0 0 10px',
              fontSize: '15px',
              fontWeight: 700,
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.92)',
            }}
          >
            {study.title}
          </h4>

          <p style={mutedText}>{study.context}</p>
          <p style={bodyText}>{study.whatHappened}</p>

          <p
            style={{
              ...bodyText,
              marginBottom: '14px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'rgba(168,230,61,0.06)',
              border: '1px solid rgba(168,230,61,0.16)',
              color: 'rgba(255,255,255,0.82)',
            }}
          >
            {study.outcome}
          </p>

          <ul style={{ margin: '0 0 14px', padding: 0, listStyle: 'none' }}>
            {study.lessons.map((lesson) => (
              <li
                key={lesson}
                style={{
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.72)',
                  marginBottom: '8px',
                  paddingLeft: '18px',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: 'rgba(168,230,61,0.70)',
                  }}
                >
                  →
                </span>
                {lesson}
              </li>
            ))}
          </ul>

          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.68)',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {study.selfCheck}
          </p>
        </article>
      ) : null}
    </div>
  )
}
