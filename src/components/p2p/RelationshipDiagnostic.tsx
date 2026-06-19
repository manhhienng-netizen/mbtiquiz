import { useEffect, useRef, useState } from 'react'
import {
  AVAILABLE_SITUATIONS,
  SITUATION_LABELS,
  getCard,
  getCardsForType,
  type MBTIType,
  type SituationKey,
} from '../../lib/p2p/relationship-diagnostic'

interface RelationshipDiagnosticProps {
  mbtiType: MBTIType
  className?: string
}

export function RelationshipDiagnostic({
  mbtiType,
  className = '',
}: RelationshipDiagnosticProps) {
  const [situation, setSituation] = useState<SituationKey>('conflict')
  const tabRefs = useRef<Partial<Record<SituationKey, HTMLButtonElement>>>({})
  const hasCards = getCardsForType(mbtiType).length > 0
  const card = hasCards ? getCard(mbtiType, situation) : undefined

  useEffect(() => {
    if (!hasCards) return
    tabRefs.current[situation]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [situation, hasCards])

  if (!hasCards) return null

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-white">Phong cách quan hệ của bạn</h2>
      <p className="text-white/40 text-sm mt-1">
        Dựa trên {mbtiType} — tap để đọc từng khía cạnh
      </p>

      <div className="flex flex-nowrap gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none snap-x snap-mandatory">
        {AVAILABLE_SITUATIONS.map((key) => (
          <button
            key={key}
            ref={(el) => {
              tabRefs.current[key] = el ?? undefined
            }}
            type="button"
            onClick={() => setSituation(key)}
            className={`shrink-0 snap-start px-3 py-1.5 rounded-full text-sm transition-colors ${
              situation === key
                ? 'bg-white/10 text-white'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {SITUATION_LABELS[key]}
          </button>
        ))}
      </div>

      {card ? (
        <div
          key={situation}
          className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl"
          style={{ animation: 'relationship-card-in 0.2s ease-out' }}
        >
          <style>
            {`
              @keyframes relationship-card-in {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>
          <p className="text-white/90 font-medium">📍 {card.signal}</p>
          <p className="text-white/70 mt-3 leading-relaxed">{card.insight}</p>
          <hr className="border-t border-white/10 my-4" />
          <p className="text-white/60 italic">💬 {card.selfAsk}</p>
          <p className="text-white/40 text-sm mt-3">👁 {card.watchFor}</p>
        </div>
      ) : null}
    </div>
  )
}
