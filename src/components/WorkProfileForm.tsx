import { useState, type CSSProperties, type FormEvent } from 'react'
import type { WorkLevel } from '../db/tncb-db'

const LEVEL_OPTIONS: { value: WorkLevel; label: string }[] = [
  { value: 'fresher', label: 'Fresher' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'manager', label: 'Manager' },
]

const glassCard: CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.25)',
  borderRadius: '16px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  padding: '20px',
}

export interface WorkProfileFormProps {
  initialOccupation?: string
  initialLevel?: WorkLevel
  onSubmit: (data: { occupation: string; level: WorkLevel }) => void
  submitLabel?: string
}

export default function WorkProfileForm({
  initialOccupation = '',
  initialLevel = 'junior',
  onSubmit,
  submitLabel = 'Xem phân tích của bạn →',
}: WorkProfileFormProps) {
  const [occupation, setOccupation] = useState(initialOccupation)
  const [level, setLevel] = useState<WorkLevel>(initialLevel)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = occupation.trim()
    if (!trimmed) {
      setError('Vui lòng nhập nghề nghiệp của bạn')
      return
    }
    setError(null)
    onSubmit({ occupation: trimmed, level })
  }

  return (
    <form onSubmit={handleSubmit} style={glassCard}>
      <label
        htmlFor="work-profile-occupation"
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: 8,
        }}
      >
        Nghề nghiệp của bạn
      </label>
      <input
        id="work-profile-occupation"
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        placeholder="Nghề nghiệp của bạn"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px 14px',
          marginBottom: 20,
          borderRadius: 10,
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          color: '#fff',
          fontSize: 15,
          fontFamily: 'inherit',
          outline: 'none',
        }}
      />

      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        <legend
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 10,
          }}
        >
          Cấp bậc
        </legend>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LEVEL_OPTIONS.map((option) => {
            const selected = level === option.value
            return (
              <label
                key={option.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: selected
                    ? '1px solid rgba(168,230,61,0.45)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: selected
                    ? 'rgba(168,230,61,0.08)'
                    : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: selected ? '#A8E63D' : 'rgba(255,255,255,0.75)',
                }}
              >
                <input
                  type="radio"
                  name="work-level"
                  value={option.value}
                  checked={selected}
                  onChange={() => setLevel(option.value)}
                  style={{ accentColor: '#A8E63D' }}
                />
                {option.label}
              </label>
            )
          })}
        </div>
      </fieldset>

      {error ? (
        <p
          style={{
            margin: '12px 0 0',
            fontSize: 13,
            color: 'rgba(255,140,120,0.9)',
          }}
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        style={{
          width: '100%',
          marginTop: 20,
          padding: '14px 16px',
          borderRadius: 12,
          border: 'none',
          background: 'rgba(168,230,61,0.90)',
          color: '#0A0A0F',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {submitLabel}
      </button>
    </form>
  )
}
