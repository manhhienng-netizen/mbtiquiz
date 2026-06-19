// Match Goal — mục tiêu quan hệ · Dexie local · nhiều goal

import { db } from '../db/tncb-db'

export type MARelationshipType = 'vo-chong' | 'bo-me' | 'con' | 'other'

export interface MAMilestone {
  id: string
  action: string
  done: boolean
}

export interface MAGoal {
  id?: number
  rawGoal: string
  reframedGoal: string
  relationship: MARelationshipType
  milestones: MAMilestone[]
  sanTapScenario?: string
  createdAt: number
  updatedAt: number
}

export async function listMatchGoals(): Promise<MAGoal[]> {
  try {
    return await db.matchGoals.orderBy('updatedAt').reverse().toArray()
  } catch {
    return []
  }
}

export async function addMatchGoal(
  goal: Omit<MAGoal, 'id'>,
): Promise<number | null> {
  try {
    return await db.matchGoals.add(goal)
  } catch {
    return null
  }
}

export async function updateMatchGoal(
  id: number,
  patch: Partial<MAGoal>,
): Promise<void> {
  try {
    await db.matchGoals.update(id, { ...patch, updatedAt: Date.now() })
  } catch {
    // fail silently
  }
}
