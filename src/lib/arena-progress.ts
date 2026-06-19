// Arena Progress — Bản đồ phản xạ theo role · Dexie local
// Không streak, không điểm · chỉ đo "đã luyện được gì" theo role

import { db } from '../db/tncb-db'
import type { ArenaFocus } from './arena-session'
import type { CaseRole } from '../data/roleplay-case-studies'

export type ArenaProgressRole =
  | 'MG'
  | 'KH'
  | 'DT'
  | 'VT'
  | 'boss'
  | 'peer'
  | 'random'

export interface ChoiceEntry {
  caseId: string
  choiceId: string
  completedAt: string
}

export interface RoleProgress {
  role: ArenaProgressRole
  totalCompleted: number
  lastPracticedAt: string
  choiceLog: ChoiceEntry[]
}

export type StrengthLevel = 'vững' | 'đang luyện' | 'chưa luyện'

export const ROLE_LABELS: Record<ArenaProgressRole, string> = {
  MG: 'Cấp dưới',
  KH: 'Khách hàng',
  DT: 'Đối tác',
  VT: 'Chuyển vai',
  boss: 'Sếp',
  peer: 'Đồng nghiệp',
  random: 'Ngẫu nhiên',
}

export const ACTIVE_MAP_ROLES: ArenaProgressRole[] = ['MG', 'KH', 'DT', 'VT']
export const COMING_SOON_ROLES: ArenaProgressRole[] = ['boss', 'peer']

const TRACKABLE_CASE_ROLES = new Set<CaseRole>(['MG', 'KH', 'DT', 'VT'])

export function resolveProgressRole(
  focus: ArenaFocus,
  caseRole: CaseRole,
): ArenaProgressRole {
  if (focus !== 'random') return focus as ArenaProgressRole
  if (TRACKABLE_CASE_ROLES.has(caseRole)) return caseRole as ArenaProgressRole
  return 'random'
}

export async function getProgress(): Promise<Partial<Record<ArenaProgressRole, RoleProgress>>> {
  try {
    const all = await db.arenaProgress.toArray()
    return Object.fromEntries(all.map((p) => [p.role, p])) as Partial<
      Record<ArenaProgressRole, RoleProgress>
    >
  } catch {
    return {}
  }
}

export async function recordCompletion(
  role: ArenaProgressRole,
  caseId: string,
  choiceId: string,
): Promise<void> {
  try {
    const existing = await db.arenaProgress.get(role)
    const entry: ChoiceEntry = {
      caseId,
      choiceId,
      completedAt: new Date().toISOString(),
    }
    const updated: RoleProgress = {
      role,
      totalCompleted: (existing?.totalCompleted ?? 0) + 1,
      lastPracticedAt: new Date().toISOString(),
      choiceLog: [...(existing?.choiceLog ?? []), entry].slice(-50),
    }
    await db.arenaProgress.put(updated)
  } catch {
    // fail silently — progress không cần crash UX
  }
}

export function getStrengthLevel(progress?: RoleProgress): StrengthLevel {
  if (!progress || progress.totalCompleted === 0) return 'chưa luyện'
  if (progress.totalCompleted >= 10) return 'vững'
  return 'đang luyện'
}

export function barFillPercent(totalCompleted: number): number {
  if (totalCompleted <= 0) return 0
  return Math.min(100, (totalCompleted / 10) * 100)
}

export function formatLastPracticed(iso?: string): string | null {
  if (!iso) return null
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return null
  const days = Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'hôm nay'
  if (days === 1) return '1 ngày trước'
  return `${days} ngày trước`
}

export function latestPracticeLabel(
  progress: Partial<Record<ArenaProgressRole, RoleProgress>>,
): string | null {
  let latest: string | undefined
  for (const p of Object.values(progress)) {
    if (!p?.lastPracticedAt) continue
    if (!latest || p.lastPracticedAt > latest) latest = p.lastPracticedAt
  }
  const formatted = formatLastPracticed(latest)
  return formatted ? `Luyện lần cuối: ${formatted}` : null
}
