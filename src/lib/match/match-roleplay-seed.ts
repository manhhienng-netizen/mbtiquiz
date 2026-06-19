// MA Layer R — roleplay seed · copy pattern WA roleplay-seed.ts

import type { GroupKey } from '../../data/voice-lexicon'
import { detectCrisis } from '../crisis-detect'
import { buildSystemPrompt } from '../system-prompt'
import type { AssertiveTurbulent } from '../style-adapter'
import {
  getRelationshipScenario,
  type RelationshipScenario,
} from './match-roleplay-scenarios'

export const MATCH_ROLEPLAY_SEED_KEY = 'tncb_match_roleplay_seed'

export interface MatchRoleplaySeed {
  scenarioId: string
  partnerType?: string
  launchedAt: number
}

export const MATCH_ROLEPLAY_EXTRA_EXIT = [
  'thoát roleplay',
  'thôi',
  'ra khỏi',
] as const

export function setMatchRoleplaySeed(seed: MatchRoleplaySeed): void {
  sessionStorage.setItem(MATCH_ROLEPLAY_SEED_KEY, JSON.stringify(seed))
}

export function getMatchRoleplaySeed(): MatchRoleplaySeed | null {
  const raw = sessionStorage.getItem(MATCH_ROLEPLAY_SEED_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<MatchRoleplaySeed>
    if (typeof parsed.scenarioId !== 'string') return null
    return {
      scenarioId: parsed.scenarioId,
      partnerType:
        typeof parsed.partnerType === 'string' ? parsed.partnerType : undefined,
      launchedAt:
        typeof parsed.launchedAt === 'number' ? parsed.launchedAt : Date.now(),
    }
  } catch {
    return null
  }
}

export function clearMatchRoleplaySeed(): void {
  sessionStorage.removeItem(MATCH_ROLEPLAY_SEED_KEY)
}

/** Đọc seed + clear sessionStorage ngay (init MatchChat). */
export function loadMatchRoleplaySeed(): MatchRoleplaySeed | null {
  const seed = getMatchRoleplaySeed()
  if (seed) clearMatchRoleplaySeed()
  return seed
}

export function checkMatchRoleplayExit(
  message: string,
  scenario: RelationshipScenario,
): boolean {
  const lower = message.toLowerCase()
  const triggers = [...scenario.exitTriggers, ...MATCH_ROLEPLAY_EXTRA_EXIT]
  return triggers.some((trigger) => lower.includes(trigger.toLowerCase()))
}

export function buildMatchRoleplayBlock(seed: MatchRoleplaySeed): string {
  const scenario = getRelationshipScenario(seed.scenarioId)
  if (!scenario) return ''

  return [
    '[ROLE-PLAY MODE — QUAN HỆ]',
    `Tình huống: ${scenario.title}`,
    scenario.situation,
    '',
    scenario.partnerPersona,
    '',
    'Bạn đang đóng vai người thân/đối phương trong cuộc trò chuyện thực hành — KHÔNG phá vai.',
    'KHÔNG dùng MBTI hay type cụ thể trong roleplay (universal scenarios).',
    'Tone ấm, realistic — không quá smooth (đừng agree hết), không attack, không gaslight, không chấm điểm.',
    'KHÔNG dùng các từ: tiềm năng, hành trình, bứt phá.',
    'Giữ phản ứng tự nhiên như người thật.',
    'Khi user nói "thoát" / "kết thúc" / "xong rồi" → ra khỏi vai ngay.',
  ].join('\n')
}

export function buildMatchRoleplaySystemContent(params: {
  personaCompressed: string
  voice: GroupKey
  mbtiType: string
  archetypeLabel: string
  identity: AssertiveTurbulent
  userMessage: string
  userAge: number | null
  seed: MatchRoleplaySeed
}): string {
  const roleplayBlock = buildMatchRoleplayBlock(params.seed)
  return [
    buildSystemPrompt(
      params.personaCompressed,
      params.voice,
      params.mbtiType,
      params.archetypeLabel,
      false,
      {
        identity: params.identity,
        userMessage: params.userMessage,
        userAge: params.userAge,
        skipStyle: true,
      },
    ),
    '',
    roleplayBlock,
  ].join('\n')
}

/** Outbound: reply đóng vai có crisis signal → exit role-play. */
export function outboundMatchCrisisCheck(aiReply: string): boolean {
  return detectCrisis(aiReply)
}
