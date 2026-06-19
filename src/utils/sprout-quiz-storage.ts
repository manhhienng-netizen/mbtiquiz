import type { SproutColor } from '@tncb/data/sprout-color-quiz-data'

export const LEARN_RESULTS_KEY = 'tncb_learn_results'

export interface SproutLearnResult {
  ageGroup: 'SPROUT'
  resultColor: SproutColor
  scores: Record<SproutColor, number>
  completedAt: string
}

export function saveSproutLearnResult(payload: SproutLearnResult): void {
  localStorage.setItem(LEARN_RESULTS_KEY, JSON.stringify(payload))
}
