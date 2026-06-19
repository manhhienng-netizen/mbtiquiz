// src/lib/roleplay-seed.ts
// RP2 — đọc/ghi roleplay seed từ sessionStorage · WA PM 12/06/2026

import type { RoleplayScenarioId } from '../data/manager-roleplay-scenarios'
import { getRoleplayScenario } from '../data/manager-roleplay-scenarios'
import { detectCrisis } from './crisis-detect'

/** Key B2B PM set trước khi navigate — đọc xong clear ngay. */
export const ROLEPLAY_STORAGE_KEY = 'roleplay_seed'
const LEGACY_ROLEPLAY_STORAGE_KEY = 'tncb_roleplay_seed'

/** Seed format B2B navigate → /work/chat */
export interface RoleplaySeed {
  roleplay: boolean
  employeeName: string
  employeeType: string
  situation: string
  situationLabel: string
  managerType: string
  personaScript: string
  exitRoute: string
  openingLine?: string
}

/** Legacy format từ RoleplayLauncher (scenarioId) — normalize khi load. */
interface LegacyRoleplaySeed {
  scenarioId: RoleplayScenarioId
  employeeName: string
  employeeType?: string
  managerType?: string
  exitRoute: string
  startedAt?: number
}

export const ROLEPLAY_EXIT_PHRASES = [
  'xong rồi',
  'xong',
  'kết thúc',
  'thoát',
  'dừng lại',
  'stop roleplay',
] as const

function normalizeRoleplaySeed(raw: unknown): RoleplaySeed | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (o.roleplay === true && typeof o.personaScript === 'string') {
    return {
      roleplay: true,
      employeeName: String(o.employeeName ?? 'nhân viên'),
      employeeType: String(o.employeeType ?? ''),
      situation: String(o.situation ?? ''),
      situationLabel: String(o.situationLabel ?? o.situation ?? ''),
      managerType: String(o.managerType ?? ''),
      personaScript: o.personaScript,
      exitRoute: String(o.exitRoute ?? '/work/manage'),
      openingLine: typeof o.openingLine === 'string' ? o.openingLine : undefined,
    }
  }

  if (typeof o.scenarioId === 'string') {
    const scenario = getRoleplayScenario(o.scenarioId as RoleplayScenarioId)
    if (!scenario) return null
    return {
      roleplay: true,
      employeeName: String(o.employeeName ?? 'nhân viên'),
      employeeType: String(o.employeeType ?? scenario.suggestedEmployeeType ?? ''),
      situation: scenario.id,
      situationLabel: scenario.title,
      managerType: String(o.managerType ?? ''),
      personaScript: scenario.employeePersona,
      exitRoute: String(o.exitRoute ?? '/work/manage'),
      openingLine: scenario.openingLine,
    }
  }

  return null
}

export function saveRoleplaySeed(seed: RoleplaySeed | LegacyRoleplaySeed): void {
  sessionStorage.setItem(ROLEPLAY_STORAGE_KEY, JSON.stringify(seed))
}

/** Đọc seed + clear sessionStorage ngay sau khi đọc. */
export function loadRoleplaySeed(): RoleplaySeed | null {
  for (const key of [ROLEPLAY_STORAGE_KEY, LEGACY_ROLEPLAY_STORAGE_KEY]) {
    const raw = sessionStorage.getItem(key)
    if (!raw) continue
    sessionStorage.removeItem(key)
    try {
      const normalized = normalizeRoleplaySeed(JSON.parse(raw))
      if (normalized) return normalized
    } catch {
      // thử key tiếp
    }
  }
  return null
}

export function clearRoleplaySeed(): void {
  sessionStorage.removeItem(ROLEPLAY_STORAGE_KEY)
  sessionStorage.removeItem(LEGACY_ROLEPLAY_STORAGE_KEY)
}

export function buildRoleplayBlock(seed: RoleplaySeed): string {
  const managerNote = seed.managerType
    ? ` (MBTI ${seed.managerType})`
    : ''

  return [
    '[ROLE-PLAY MODE — ĐỌC KỸ]',
    `Bạn đang đóng vai ${seed.employeeName} — nhân viên MBTI ${seed.employeeType}.`,
    `Tình huống: ${seed.situationLabel}`,
    '',
    seed.personaScript,
    '',
    `Người chat với bạn là sếp của ${seed.employeeName}${managerNote}.`,
    'KHÔNG phá vai cho đến khi user nói "xong" hoặc "kết thúc".',
    'Khi user kết thúc → ra khỏi vai → reflection ngắn:',
    '  - 1 điều sếp làm tốt trong cuộc trò chuyện vừa rồi',
    '  - 1 điều có thể thử khác lần sau',
    '  (KHÔNG chấm điểm, KHÔNG rank)',
  ].join('\n')
}

export function checkExitTrigger(message: string): boolean {
  const lower = message.toLowerCase()
  return ROLEPLAY_EXIT_PHRASES.some((trigger) => lower.includes(trigger))
}

/** Outbound: reply nhân viên giả có trigger crisis → exit role-play. */
export function outboundCrisisCheck(aiReply: string): boolean {
  return detectCrisis(aiReply)
}
