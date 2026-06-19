import type { CSSProperties } from 'react'
import { SITUATIONS, type SituationId } from '../data/manager-diagnostic'

export interface DiagnosticPickerProps {
  employeeName: string
  onSelect: (situationId: SituationId) => void
  selected?: SituationId
}

export default function DiagnosticPicker({
  employeeName,
  onSelect,
  selected,
}: DiagnosticPickerProps) {
  return (
    <div>
      <div
        style={{
          fontSize: '15px',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.90)',
          marginBottom: '4px',
        }}
      >
        Chuẩn bị trò chuyện với {employeeName}
      </div>
      <p
        style={{
          margin: '0 0 14px',
          fontSize: '13px',
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.45)',
        }}
      >
        Chọn tình huống — đọc trong 2 phút
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
        }}
      >
        {SITUATIONS.map((sit) => {
          const isSelected = selected === sit.id
          const cardStyle: CSSProperties = {
            padding: '12px 10px',
            borderRadius: '12px',
            border: isSelected
              ? '1px solid rgba(168,230,61,0.55)'
              : '1px solid rgba(168,230,61,0.18)',
            background: isSelected
              ? 'rgba(168,230,61,0.10)'
              : 'rgba(255,255,255,0.03)',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            color: 'inherit',
            transition: 'border-color 0.15s, background 0.15s',
            minHeight: '88px',
          }

          return (
            <button
              key={sit.id}
              type="button"
              onClick={() => onSelect(sit.id)}
              style={cardStyle}
            >
              <div
                style={{
                  fontSize: '18px',
                  marginBottom: '6px',
                  lineHeight: 1,
                }}
              >
                {sit.icon}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isSelected ? '#A8E63D' : 'rgba(255,255,255,0.88)',
                  marginBottom: '4px',
                  lineHeight: 1.3,
                }}
              >
                {sit.label}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  lineHeight: 1.35,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {sit.desc}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
