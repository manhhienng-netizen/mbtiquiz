// Narrative Arc — tập có nhân vật nhất quán, case moc từ case trước

import type { CaseRole, RolePlayCase } from '../data/roleplay-case-studies'
import type { ArenaContext } from './arena-session'

export interface ArcCharacters {
  boss?: string
  colleague?: string
  client?: string
  subordinate?: string
  partner?: string
}

export interface NarrativeContext {
  arcId: string
  role: CaseRole
  episodeNumber: number
  characters: ArcCharacters
  previousOutcome: string
  difficultyLevel: 1 | 2 | 3
  isComplete: boolean
  arenaContext?: ArenaContext
}

export interface ArcEpisode {
  episodeNumber: number
  case: RolePlayCase
  resolvedChoiceId?: string
  freeformInput?: string
  outcome: string
}

export interface ArcState {
  context: NarrativeContext
  episodes: ArcEpisode[]
  arcNumber: number
  source: 'static' | 'ai'
}

export function getDifficultyLevel(episodeNumber: number): 1 | 2 | 3 {
  if (episodeNumber <= 2) return 1
  if (episodeNumber <= 4) return 2
  return 3
}

const ARC_MIN_EPISODES = 3
const ARC_MAX_EPISODES = 7

export function shouldEndArc(ctx: NarrativeContext, episodeCount: number): boolean {
  if (episodeCount >= ARC_MAX_EPISODES) return true
  if (episodeCount >= ARC_MIN_EPISODES && ctx.isComplete) return true
  return false
}

export { ARC_MIN_EPISODES, ARC_MAX_EPISODES }
