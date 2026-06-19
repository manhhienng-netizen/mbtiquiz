/**
 * MA Layer R — roleplay seed/exit verify (không cần Ollama).
 * Chạy: npx tsx scripts/ma-roleplay-verify.mts
 */

import { detectCrisis } from '../src/lib/crisis-detect.ts'
import { resolveMatchSafetyTurn } from '../src/lib/match/detect-protective.ts'
import { RELATIONSHIP_SCENARIOS } from '../src/lib/match/match-roleplay-scenarios.ts'
import {
  buildMatchRoleplayBlock,
  checkMatchRoleplayExit,
  outboundMatchCrisisCheck,
} from '../src/lib/match/match-roleplay-seed.ts'

let pass = 0
let fail = 0

function check(label: string, ok: boolean, detail?: string) {
  if (ok) {
    pass++
    console.log(`PASS: ${label}`)
  } else {
    fail++
    console.log(`FAIL: ${label}${detail ? ` — ${detail}` : ''}`)
  }
}

console.log('=== MA Layer R VERIFY ===\n')

check('5 scenarios defined', RELATIONSHIP_SCENARIOS.length === 5)

for (const s of RELATIONSHIP_SCENARIOS) {
  const block = buildMatchRoleplayBlock({
    scenarioId: s.id,
    launchedAt: Date.now(),
  })
  check(
    `${s.id} block + opening`,
    block.includes('[ROLE-PLAY MODE') &&
      block.includes(s.title) &&
      s.openingLine.length > 0,
  )
}

const rp1 = RELATIONSHIP_SCENARIOS[0]!
check(
  'exit trigger "thoát"',
  checkMatchRoleplayExit('mình muốn thoát', rp1),
)
check(
  'exit trigger "kết thúc"',
  checkMatchRoleplayExit('kết thúc nhé', rp1),
)

const abuse = 'anh ấy hay đánh mình'
const abuseSafety = resolveMatchSafetyTurn(abuse)
check(
  'real abuse → protective',
  abuseSafety.protectiveTurn && !abuseSafety.crisisTurn,
)

const crisis = 'không muốn sống nữa'
check(
  'crisis detect',
  resolveMatchSafetyTurn(crisis).crisisTurn,
)

check(
  'outbound crisis check',
  outboundMatchCrisisCheck('tôi không muốn sống nữa') === detectCrisis('tôi không muốn sống nữa'),
)

check(
  'block no MBTI in roleplay instructions',
  !buildMatchRoleplayBlock({ scenarioId: 'rp1', launchedAt: 0 }).includes('ENFP'),
)

console.log(`\n=== ${pass} PASS, ${fail} FAIL ===\n`)
process.exit(fail > 0 ? 1 : 0)
