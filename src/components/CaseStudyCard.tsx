import { useEffect, useState, type CSSProperties } from 'react'
import type { CaseStudy } from '../data/manager-case-studies'

interface Props {
  case_: CaseStudy
  defaultExpanded?: boolean
}

const revealBtn: CSSProperties = {
  marginTop: '12px',
  padding: '10px 16px',
  background: 'rgba(168,230,61,0.1)',
  border: '1px solid rgba(168,230,61,0.3)',
  borderRadius: '10px',
  color: '#A8E63D',
  fontSize: '14px',
  cursor: 'pointer',
  width: '100%',
  fontFamily: 'inherit',
}

export function CaseStudyCard({ case_: c, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [step, setStep] = useState(defaultExpanded ? 3 : 0)

  useEffect(() => {
    setStep(defaultExpanded ? 3 : 0)
  }, [c.id, defaultExpanded])

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        type="button"
        className="w-full text-left px-4 py-3 flex items-start gap-3"
        onClick={() => setExpanded((e) => !e)}
      >
        <span className="text-xs font-mono text-white/40 mt-0.5 shrink-0">{c.id}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white leading-snug">{c.title}</p>
          <p className="text-xs text-white/40 mt-0.5">
            {c.managerType} sếp · {c.employeeType} nhân viên
          </p>
        </div>
        <span className="text-white/30 text-xs shrink-0 mt-0.5">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/10 pt-3">
          <Section label="Bối cảnh" text={c.context} />

          {step === 0 && (
            <button type="button" onClick={() => setStep(1)} style={revealBtn}>
              Xem cách xử lý →
            </button>
          )}

          {step >= 1 && (
            <div>
              <Section label="Sếp đã làm" text={c.whatHappened} />
              {step === 1 && (
                <button type="button" onClick={() => setStep(2)} style={revealBtn}>
                  Kết quả thế nào? →
                </button>
              )}
            </div>
          )}

          {step >= 2 && (
            <div>
              <Section label="Điều xảy ra" text={c.outcome} />
              {step === 2 && (
                <button type="button" onClick={() => setStep(3)} style={revealBtn}>
                  Bài học →
                </button>
              )}
            </div>
          )}

          {step >= 3 && (
            <div>
              <div>
                <p className="text-xs font-semibold text-[#A8E63D] uppercase tracking-wide mb-1.5">
                  Bài học
                </p>
                <ul className="space-y-1.5">
                  {c.lessons.map((l, i) => (
                    <li key={i} className="text-sm text-white/80 leading-relaxed flex gap-2">
                      <span className="text-[#A8E63D] shrink-0">→</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 mt-3">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">
                  💬 Tự hỏi
                </p>
                <p className="text-sm text-white/90 italic leading-relaxed">{c.selfCheck}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Section({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-white/50 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-sm text-white/80 leading-relaxed">{text}</p>
    </div>
  )
}
