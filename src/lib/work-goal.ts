// Work Goal — mục tiêu dài hạn · Dexie local · 1 goal hiện tại

import { db } from '../db/tncb-db'

export const GOAL_SINGLETON_ID = 'singleton'

export interface SkillStep {
  order: number
  skill: string
  why: string
  role?: string
  scenario?: string
}

export interface SkillRoadmap {
  skills: SkillStep[]
  generatedAt: string
}

export interface Milestone {
  id: string
  text: string
  done: boolean
  createdAt: string
}

export interface Challenge {
  id: string
  text: string
  suggestion?: string
  portalRole?: string
  portalScenario?: string
  createdAt: string
}

export interface WorkGoal {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  roadmap?: SkillRoadmap
  milestones: Milestone[]
  challenges: Challenge[]
}

export async function getGoal(): Promise<WorkGoal | null> {
  try {
    const row = await db.workGoal.get(GOAL_SINGLETON_ID)
    return row ?? null
  } catch {
    return null
  }
}

export async function saveGoal(goal: WorkGoal): Promise<void> {
  try {
    await db.workGoal.put({ ...goal, id: GOAL_SINGLETON_ID })
  } catch {
    // fail silently
  }
}

export function createEmptyGoal(text: string): WorkGoal {
  const now = new Date().toISOString()
  return {
    id: GOAL_SINGLETON_ID,
    text,
    createdAt: now,
    updatedAt: now,
    milestones: [],
    challenges: [],
  }
}
