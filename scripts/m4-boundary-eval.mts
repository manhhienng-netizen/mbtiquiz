/**
 * M4-boundary — cross-mention MA → PA (detect + session, không cần Ollama).
 * Chạy: npx tsx scripts/m4-boundary-eval.mts
 */

import { resolveMatchSafetyTurn } from '../src/lib/match/detect-protective.ts'
import {
  applyMatchCrossMentionToReply,
  CROSS_MENTION_PA_TEXT,
  hasCrossMentionPA,
  shouldCrossMentionPA,
} from '../src/lib/match/match-cross-mention.ts'

let pass = 0
let fail = 0

function check(id: number, label: string, ok: boolean, detail?: string) {
  if (ok) {
    pass++
    console.log(`PASS case ${id}: ${label}`)
  } else {
    fail++
    console.log(`FAIL case ${id}: ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

console.log('=== M4-boundary CROSS-MENTION EVAL ===\n')

const lonely = 'tôi cảm thấy cô đơn, không biết chia sẻ với ai'
check(
  1,
  'PA-scope loneliness → shouldCrossMention',
  shouldCrossMentionPA(lonely) === true,
  `got ${shouldCrossMentionPA(lonely)}`,
)

const dyad = 'tôi và người ấy ENFP có hợp không'
check(
  2,
  'dyad/compat — no cross-mention signal',
  shouldCrossMentionPA(dyad) === false,
  `got ${shouldCrossMentionPA(dyad)}`,
)

const gaslight = 'bạn trai hay gaslighting mình'
const gaslightSafety = resolveMatchSafetyTurn(gaslight)
const gaslightCross = applyMatchCrossMentionToReply('Mình nghe bạn.', gaslight, {
  path: gaslightSafety.protectiveTurn ? 'protective' : 'normal',
  compatMode: null,
  crisisTurn: gaslightSafety.crisisTurn,
  protectiveTurn: gaslightSafety.protectiveTurn,
  crossMentionedPA: false,
})
check(
  3,
  'gaslight/dyad — no cross-mention',
  !gaslightCross.crossMentionApplied &&
    (gaslightSafety.protectiveTurn || !shouldCrossMentionPA(gaslight)),
  `protective=${gaslightSafety.protectiveTurn} cross=${gaslightCross.crossMentionApplied}`,
)

const crisisMsg = 'không muốn sống nữa'
const crisisSafety = resolveMatchSafetyTurn(crisisMsg)
const crisisCross = applyMatchCrossMentionToReply('Mình ở đây.', crisisMsg, {
  path: 'crisis',
  compatMode: null,
  crisisTurn: true,
  protectiveTurn: false,
  crossMentionedPA: false,
})
check(
  4,
  'crisis — no cross-mention',
  crisisSafety.crisisTurn &&
    !crisisCross.crossMentionApplied &&
    crisisCross.reply === 'Mình ở đây.',
  `crisis=${crisisSafety.crisisTurn}`,
)

const turn1 = applyMatchCrossMentionToReply('Mình nghe bạn.', lonely, {
  path: 'normal',
  compatMode: null,
  crisisTurn: false,
  protectiveTurn: false,
  crossMentionedPA: false,
})
const turn2 = applyMatchCrossMentionToReply(
  'Vẫn cảm thấy cô đơn lắm.',
  'tôi vẫn cảm thấy cô đơn và mệt',
  {
    path: 'normal',
    compatMode: null,
    crisisTurn: false,
    protectiveTurn: false,
    crossMentionedPA: turn1.crossMentionedPA,
    recentUserTexts: [lonely],
  },
)
check(
  5,
  'session — mention once, turn 2 no repeat',
  turn1.crossMentionApplied &&
    hasCrossMentionPA(turn1.reply) &&
    !turn2.crossMentionApplied &&
    !hasCrossMentionPA(turn2.reply),
  `t1=${turn1.crossMentionApplied} t2=${turn2.crossMentionApplied}`,
)

console.log(`\n=== ${pass} PASS, ${fail} FAIL ===`)
console.log(`CROSS_MENTION_PA_TEXT: "${CROSS_MENTION_PA_TEXT}"\n`)
process.exit(fail > 0 ? 1 : 0)
