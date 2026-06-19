import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RELATIONSHIP_SCENARIOS,
  type RelationshipScenario,
} from '../../lib/match/match-roleplay-scenarios'
import { setMatchRoleplaySeed } from '../../lib/match/match-roleplay-seed'

interface Props {
  partnerType?: string
  onLaunch?: (scenarioId: RelationshipScenario['id']) => void
}

export default function RelationshipRoleplayLauncher({
  partnerType,
  onLaunch,
}: Props) {
  const navigate = useNavigate()
  const [showPicker, setShowPicker] = useState(false)

  function launch(scenarioId: RelationshipScenario['id']) {
    setMatchRoleplaySeed({
      scenarioId,
      partnerType,
      launchedAt: Date.now(),
    })
    onLaunch?.(scenarioId)
    navigate('/match/chat')
    setShowPicker(false)
  }

  return (
    <div className="w-full max-w-[280px]">
      <button
        type="button"
        onClick={() => setShowPicker((s) => !s)}
        className="w-full mt-3 py-2.5 rounded-lg text-sm font-medium border border-[#A8E63D]/40 text-[#A8E63D] hover:bg-[#A8E63D]/10 transition-colors"
      >
        🎭 Thực hành cuộc trò chuyện {showPicker ? '▲' : '▼'}
      </button>

      {showPicker && (
        <div className="mt-2 space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-3 text-left">
          <p className="text-xs text-white/50 mb-2">
            Chọn tình huống muốn thực hành:
          </p>
          {RELATIONSHIP_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => launch(s.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="text-sm text-white/85 font-medium">{s.title}</div>
              <div className="text-xs text-white/45 mt-1 line-clamp-2">
                {s.situation}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
