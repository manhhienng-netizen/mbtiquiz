export type DiscLetter = 'D' | 'I' | 'S' | 'C'

export interface DiscProfile {
  D: number
  I: number
  S: number
  C: number
  primary: DiscLetter
  secondary: DiscLetter
  blend: string
  completedAt: string
}

const PURE_THRESHOLD = 7

export function scoreDisc(answers: DiscLetter[]): DiscProfile {
  if (answers.length !== 12) throw new Error('DISC requires exactly 12 answers')

  const counts: Record<DiscLetter, number> = { D: 0, I: 0, S: 0, C: 0 }
  for (const a of answers) counts[a]++

  const total = answers.length
  const pct = {
    D: Math.round((counts.D / total) * 100 * 10) / 10,
    I: Math.round((counts.I / total) * 100 * 10) / 10,
    S: Math.round((counts.S / total) * 100 * 10) / 10,
    C: Math.round((counts.C / total) * 100 * 10) / 10,
  }

  const sorted = (['D', 'I', 'S', 'C'] as DiscLetter[]).sort(
    (a, b) => counts[b] - counts[a],
  )
  const primary = sorted[0]
  const secondary = sorted[1]

  const blend =
    counts[primary] >= PURE_THRESHOLD ? primary : primary + secondary

  return {
    D: pct.D,
    I: pct.I,
    S: pct.S,
    C: pct.C,
    primary,
    secondary,
    blend,
    completedAt: new Date().toISOString(),
  }
}
