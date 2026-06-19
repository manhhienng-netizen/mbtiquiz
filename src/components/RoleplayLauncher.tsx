import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ROLEPLAY_SCENARIOS,
  type RoleplayScenarioId,
} from '../data/manager-roleplay-scenarios'
import { saveRoleplaySeed } from '../lib/roleplay-seed'

interface Props {
  employeeName: string
  employeeType?: string
  managerType?: string
  defaultScenario?: RoleplayScenarioId
}

export function RoleplayLauncher({
  employeeName,
  employeeType,
  managerType,
  defaultScenario,
}: Props) {
  const navigate = useNavigate()
  const [showPicker, setShowPicker] = useState(false)

  function launch(scenarioId: RoleplayScenarioId) {
    saveRoleplaySeed({
      scenarioId,
      employeeName,
      employeeType,
      managerType,
      exitRoute: '/work/manage',
      startedAt: Date.now(),
    })
    navigate('/work/chat')
    setShowPicker(false)
  }

  if (defaultScenario) {
    return (
      <button
        type="button"
        onClick={() => launch(defaultScenario)}
        className="w-full mt-3 py-2.5 rounded-lg text-sm font-medium border border-[#A8E63D]/40 text-[#A8E63D] hover:bg-[#A8E63D]/10 transition-colors"
      >
        🎭 Thực hành cuộc trò chuyện
      </button>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowPicker((s) => !s)}
        className="w-full mt-3 py-2.5 rounded-lg text-sm font-medium border border-[#A8E63D]/40 text-[#A8E63D] hover:bg-[#A8E63D]/10 transition-colors"
      >
        🎭 Thực hành cuộc trò chuyện {showPicker ? '▲' : '▼'}
      </button>

      {showPicker && (
        <div className="mt-2 space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-white/50 mb-2">Chọn tình huống muốn thực hành:</p>
          {ROLEPLAY_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => launch(s.id)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 transition-colors"
            >
              <span className="text-white/40 font-mono text-xs mr-2">{s.id}</span>
              {s.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
