/**
 * Smoke test: SPROUT quiz tally + storage (no browser).
 * Run: npx tsx scripts/test-sprout-quiz.mjs
 */
import {
  SPROUT_QUESTIONS,
  type SproutColor,
} from '../src/data/sprout-color-quiz-data.ts'
import {
  emptySproutScores,
  sproutResultFromScores,
  SPROUT_TALLY_ORDER,
} from '../src/utils/sprout-quiz-ui.ts'

const answers: SproutColor[] = SPROUT_QUESTIONS.map((q) => q.options[0].color)
const scores = emptySproutScores()
for (const c of answers) scores[c] += 1
const result = sproutResultFromScores(scores)

console.log('Questions:', SPROUT_QUESTIONS.length)
console.log('First-option tally scores:', scores)
console.log('Result color:', result)
console.log('Tie order:', SPROUT_TALLY_ORDER.join(', '))

const payload = {
  ageGroup: 'SPROUT',
  resultColor: result,
  scores,
  completedAt: new Date().toISOString(),
}
console.log('localStorage payload keys:', Object.keys(payload))
console.log('OK')
