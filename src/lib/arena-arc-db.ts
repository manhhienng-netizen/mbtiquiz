// Dexie persistence for narrative arc state

import type { CaseRole } from '../data/roleplay-case-studies'
import { db } from '../db/tncb-db'
import type { ArcState } from './arena-arc'

const ACTIVE_ARC_KEY_PREFIX = 'arena_active_arc_'

export interface StoredArcState {
  arcId: string
  state: ArcState
  updatedAt: string
}

export async function saveArcState(state: ArcState): Promise<void> {
  try {
    await db.arenaArcState.put({
      arcId: state.context.arcId,
      state,
      updatedAt: new Date().toISOString(),
    })
  } catch {
    // fail silently
  }
}

export async function loadArcState(arcId: string): Promise<ArcState | null> {
  try {
    const row = await db.arenaArcState.get(arcId)
    return row?.state ?? null
  } catch {
    return null
  }
}

export function setActiveArcId(role: CaseRole, arcId: string): void {
  try {
    sessionStorage.setItem(`${ACTIVE_ARC_KEY_PREFIX}${role}`, arcId)
  } catch {
    // fail silently
  }
}

export function getActiveArcId(role: CaseRole): string | null {
  try {
    return sessionStorage.getItem(`${ACTIVE_ARC_KEY_PREFIX}${role}`)
  } catch {
    return null
  }
}

export function clearActiveArcId(role: CaseRole): void {
  try {
    sessionStorage.removeItem(`${ACTIVE_ARC_KEY_PREFIX}${role}`)
  } catch {
    // fail silently
  }
}
