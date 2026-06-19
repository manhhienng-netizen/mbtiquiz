import { BIG5_ITEMS, type Big5Dim } from '../data/big5-items'

export interface Big5Profile {
  O: number
  C: number
  E: number
  A: number
  N: number
  completedAt: string
}

export type { Big5Dim }

export type Big5Level = 'high' | 'medium' | 'low'

export const BIG5_DEXIE_KEY = 'big5Profile'

export const BIG5_DIM_LABELS: Record<Big5Dim, string> = {
  O: 'Cởi mở với trải nghiệm',
  C: 'Tận tâm',
  E: 'Hướng ngoại',
  A: 'Hòa hợp',
  N: 'Nhạy cảm cảm xúc',
}

const DIMS: Big5Dim[] = ['O', 'C', 'E', 'A', 'N']

export function scoreBig5(answers: Record<number, number>): Big5Profile {
  const result: Partial<Big5Profile> = {}

  for (const dim of DIMS) {
    const items = BIG5_ITEMS.filter((i) => i.dim === dim)
    const scores = items.map((i) => {
      const raw = answers[i.id] ?? 3
      return i.reverse ? 6 - raw : raw
    })
    result[dim] = scores.reduce((a, b) => a + b, 0) / scores.length
  }

  return { ...(result as Big5Profile), completedAt: new Date().toISOString() }
}

export function getBig5Level(score: number): Big5Level {
  if (score >= 3.7) return 'high'
  if (score >= 2.4) return 'medium'
  return 'low'
}

export function getBig5LevelLabelVi(level: Big5Level): string {
  if (level === 'high') return 'Cao'
  if (level === 'medium') return 'Trung bình'
  return 'Thấp'
}

/** PA system prompt — N+A levels + tone calibration */
export function buildBig5PaContext(profile: Big5Profile): string {
  const nLevel = getBig5Level(profile.N)
  const aLevel = getBig5Level(profile.A)
  const lines = [`Big Five: N=${nLevel} A=${aLevel}`]

  if (nLevel === 'high') {
    lines.push('Tone: validate cảm xúc trước, không rush advice.')
  } else if (nLevel === 'low') {
    lines.push('Tone: có thể đi thẳng vào practical suggestions.')
  }

  return lines.join('\n')
}

export function getBig5BarColor(dim: Big5Dim): string {
  if (dim === 'E' || dim === 'O') return 'rgba(168,230,61,0.55)'
  if (dim === 'C') return 'rgba(250,204,21,0.55)'
  if (dim === 'A') return 'rgba(96,165,250,0.55)'
  return 'rgba(251,146,60,0.55)'
}
