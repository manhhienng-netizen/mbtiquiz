import { buildCommContext } from '../data/work-comm-kb'
import {
  buildSituationalContext,
  detectSituation,
} from './situation-detect'
import { buildKBInjectBlock } from './kb-inject'
import {
  commIntentWouldMatch,
  detectGUHit,
  getZoneBestScoredHit,
  guOutscoresProtective,
  type AssistantScope,
} from './kb-router'
import type { KBUserProfile } from './kb-router'
import type { RegistryKBEntry } from './kb-registry'

export interface AssistantInjectedContext {
  commBlock: string | null
  kbBlock: string | null
  situationalBlock: string | null
}

export type InjectPath =
  | 'crisis'
  | 'protective'
  | 'comm'
  | 'gu_kb'
  | 'situational'
  | 'none'

export interface InjectProbe {
  path: InjectPath
  entry: RegistryKBEntry | null
  commWouldMatch: boolean
  protectiveEntry: RegistryKBEntry | null
}

/**
 * Thứ tự: crisis > PROTECTIVE (registry) > comm > GU KB > situational
 */
export function probeInjectedContext(
  userMessage: string,
  mbtiType: string,
  crisisTurn: boolean,
  userAge: number | null = null,
  assistantScope: AssistantScope = 'PA',
): InjectProbe {
  if (crisisTurn) {
    return {
      path: 'crisis',
      entry: null,
      commWouldMatch: false,
      protectiveEntry: null,
    }
  }

  const profile: KBUserProfile = { mbtiType, age: userAge }
  const protectiveHit = getZoneBestScoredHit(userMessage, profile, 'PROTECTIVE', assistantScope)
  const guHit = getZoneBestScoredHit(userMessage, profile, 'GU', assistantScope)
  const commWouldMatch = commIntentWouldMatch(userMessage, assistantScope)

  const protectiveEntry =
    protectiveHit && !(guHit && guOutscoresProtective(guHit, protectiveHit))
      ? protectiveHit.entry
      : null

  if (protectiveEntry) {
    return { path: 'protective', entry: protectiveEntry, commWouldMatch, protectiveEntry }
  }
  if (commWouldMatch) {
    return { path: 'comm', entry: null, commWouldMatch, protectiveEntry: null }
  }
  const guEntry = guHit?.entry ?? detectGUHit(userMessage, profile, assistantScope)
  if (guEntry) {
    return { path: 'gu_kb', entry: guEntry, commWouldMatch, protectiveEntry: null }
  }
  if (detectSituation(userMessage)) {
    return { path: 'situational', entry: null, commWouldMatch, protectiveEntry: null }
  }
  return { path: 'none', entry: null, commWouldMatch, protectiveEntry: null }
}

export function resolveInjectedContext(
  userMessage: string,
  mbtiType: string,
  crisisTurn: boolean,
  userAge: number | null = null,
  assistantScope: AssistantScope = 'PA',
): AssistantInjectedContext {
  if (crisisTurn) {
    return { commBlock: null, kbBlock: null, situationalBlock: null }
  }

  const profile: KBUserProfile = { mbtiType, age: userAge }

  const protectiveHit = getZoneBestScoredHit(userMessage, profile, 'PROTECTIVE', assistantScope)
  const guHit = getZoneBestScoredHit(userMessage, profile, 'GU', assistantScope)
  const protectiveEntry =
    protectiveHit && !(guHit && guOutscoresProtective(guHit, protectiveHit))
      ? protectiveHit.entry
      : null

  if (protectiveEntry) {
    return {
      commBlock: null,
      kbBlock: buildKBInjectBlock(protectiveEntry),
      situationalBlock: null,
    }
  }

  if (assistantScope === 'WA') {
    const commBlock = buildCommContext(userMessage, mbtiType)
    if (commBlock) {
      return { commBlock, kbBlock: null, situationalBlock: null }
    }
  }

  const guEntry = guHit?.entry ?? detectGUHit(userMessage, profile, assistantScope)
  if (guEntry) {
    return {
      commBlock: null,
      kbBlock: buildKBInjectBlock(guEntry),
      situationalBlock: null,
    }
  }

  const situationKey = detectSituation(userMessage)
  const situationalBlock = situationKey
    ? buildSituationalContext(mbtiType, situationKey)
    : null

  return { commBlock: null, kbBlock: null, situationalBlock }
}
