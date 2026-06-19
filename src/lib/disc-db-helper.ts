// SHARED — 1 nơi duy nhất đọc DISC profile của user từ Dexie
// Cả WA (bossLens) và B2B (managerTip) đều import từ đây
//
// PHÂN BIỆT RÕ:
//   loadDiscProfile()  — đọc DISC user ĐÃ LÀM từ Dexie (async, có thể null)
//   getDiscContent()   — disc-content.ts: lấy content tĩnh theo type (sync)
//   getBlendContent()  — disc-content.ts: lấy blend content tĩnh

import { db } from '../db/tncb-db'
import type { DiscProfile } from './disc-scoring'

const DISC_LETTERS = new Set(['D', 'I', 'S', 'C'])

function isValidDiscPct(value: unknown): value is number {
  return typeof value === 'number' && value >= 0 && value <= 100
}

function isValidDiscProfile(raw: unknown): raw is DiscProfile {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  return (
    isValidDiscPct(o.D) &&
    isValidDiscPct(o.I) &&
    isValidDiscPct(o.S) &&
    isValidDiscPct(o.C) &&
    typeof o.primary === 'string' &&
    DISC_LETTERS.has(o.primary) &&
    typeof o.secondary === 'string' &&
    DISC_LETTERS.has(o.secondary) &&
    typeof o.blend === 'string' &&
    typeof o.completedAt === 'string'
  )
}

export async function loadDiscProfile(): Promise<DiscProfile | null> {
  try {
    const row = await db.discProfile.get(1)
    if (isValidDiscProfile(row)) {
      return {
        D: row.D,
        I: row.I,
        S: row.S,
        C: row.C,
        primary: row.primary,
        secondary: row.secondary,
        blend: row.blend,
        completedAt: row.completedAt,
      }
    }
    return null
  } catch {
    return null
  }
}

/** Alias — tên master recommend, cùng logic với loadDiscProfile. */
export const getDiscProfileFromDb = loadDiscProfile

export async function saveDiscProfileToDb(profile: DiscProfile): Promise<void> {
  await db.discProfile.put({ id: 1, ...profile })
}
