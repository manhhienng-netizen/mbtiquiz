import { getCurrentCharacter } from '../db/tncb-db'

export interface UserMemory {
  goal: string
  notes: string
}

const MEMORY_KEY = 'tncb_assistant_memory'

function extractGoalFromPersona(personaCompressed: string): string {
  const match = personaCompressed.match(/Đang tập:\s*(.+?)\./)
  return match?.[1]?.trim() ?? ''
}

export function loadUserMemory(): UserMemory | null {
  try {
    const raw = localStorage.getItem(MEMORY_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<UserMemory>
    return {
      goal: parsed.goal ?? '',
      notes: parsed.notes ?? '',
    }
  } catch {
    return null
  }
}

export function saveUserMemory(memory: UserMemory): void {
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory))
}

export function clearUserMemory(): void {
  localStorage.removeItem(MEMORY_KEY)
}

/** Ghi chú lưu dạng mỗi dòng một mục (tương thích prompt chat). */
export function parseNotesList(notes: string): string[] {
  if (!notes.trim()) return []
  return notes
    .split('\n')
    .map((line) => line.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean)
}

export function serializeNotesList(items: string[]): string {
  return items.map((s) => s.trim()).filter(Boolean).join('\n')
}

export function getUserMemory(): UserMemory {
  return loadUserMemory() ?? { goal: '', notes: '' }
}

export function setUserMemory(partial: Partial<UserMemory>): UserMemory {
  const next = { ...getUserMemory(), ...partial }
  saveUserMemory(next)
  return next
}

export async function initUserMemory(): Promise<UserMemory> {
  const existing = loadUserMemory()
  if (existing) return existing

  const character = await getCurrentCharacter()
  let goal = ''

  if (character?.personaCompressed) {
    goal = extractGoalFromPersona(character.personaCompressed)
  }
  if (!goal && character?.growthZoneShadow) {
    goal = character.growthZoneShadow.split(' · ')[0]?.trim() ?? ''
  }

  const memory: UserMemory = { goal, notes: '' }
  saveUserMemory(memory)
  return memory
}
