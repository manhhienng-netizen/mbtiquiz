/**
 * MA Big5 N+A calibrate — unit verify.
 * Chạy: npx tsx scripts/ma-big5-verify.mts
 */

import {
  buildBig5MatchNote,
  type Big5Profile,
} from '../src/lib/match/match-big5-calibrate.ts'

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

function profile(overrides: Partial<Big5Profile>): Big5Profile {
  return {
    O: 3,
    C: 3,
    E: 3,
    A: 3,
    N: 3,
    ...overrides,
  }
}

console.log('=== MA Big5 VERIFY ===\n')

check(
  'no profile note — mid N+A',
  buildBig5MatchNote(profile({ N: 3, A: 3 })) === '',
)

check(
  'high N — validate first',
  buildBig5MatchNote(profile({ N: 4.0 })).includes('validate cảm xúc'),
)

check(
  'low N — practical insight',
  buildBig5MatchNote(profile({ N: 2.0 })).includes('practical insight'),
)

check(
  'high A — harmony framing',
  buildBig5MatchNote(profile({ A: 4.0 })).includes('harmony'),
)

check(
  'low A — direct conflict',
  buildBig5MatchNote(profile({ A: 2.0 })).includes('conflict patterns'),
)

check(
  'combo high N + high A',
  buildBig5MatchNote(profile({ N: 4.0, A: 4.0 })).includes('an toàn trước'),
)

check(
  'combo high N + low A',
  buildBig5MatchNote(profile({ N: 4.0, A: 2.0 })).includes('structure'),
)

console.log(`\n=== ${pass} PASS, ${fail} FAIL ===\n`)
process.exit(fail > 0 ? 1 : 0)
