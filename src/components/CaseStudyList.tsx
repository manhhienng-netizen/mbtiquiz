import { useState } from 'react'
import { CASE_STUDIES, SITUATION_LABELS, type SituationId } from '../data/manager-case-studies'
import { CaseStudyCard } from './CaseStudyCard'

const SITUATIONS: SituationId[] = ['S1', 'S2', 'S4', 'S5', 'S8']

export function CaseStudyList() {
  const [activeSituation, setActiveSituation] = useState<SituationId>('S1')

  const filtered = CASE_STUDIES.filter((c) => c.situation === activeSituation)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {SITUATIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActiveSituation(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeSituation === s
                ? 'bg-[#A8E63D] text-black'
                : 'bg-white/10 text-white/60 hover:bg-white/15'
            }`}
          >
            {SITUATION_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((c) => (
          <CaseStudyCard key={c.id} case_={c} />
        ))}
      </div>

      <p className="text-xs text-white/30 text-center pt-2">
        {filtered.length} kịch bản · góc nhìn sếp SMB VN
      </p>
    </div>
  )
}
