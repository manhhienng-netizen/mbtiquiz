/**
 * M4-core — eval partner detect + compat inject.
 * Chạy: npx tsx scripts/m4-core-eval.mts
 */

import { buildMatchSystemContent } from '../src/lib/build-match-system-prompt.ts'
import { buildMatchCompatInjectBlock } from '../src/lib/match/build-match-compat-inject.ts'
import { resolveMatchSafetyTurn } from '../src/lib/match/detect-protective.ts'
import { resolvePartnerType } from '../src/lib/match/match-partner-detect.ts'

let pass = 0
let fail = 0

function check(name: string, ok: boolean, detail?: string) {
  if (ok) {
    pass++
    console.log(`PASS: ${name}`)
  } else {
    fail++
    console.log(`FAIL: ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

console.log('=== M4-core EVAL ===\n')

// 1. INTJ + "người ấy là ENFP, tụi mình hợp không?" → per-pair ENFP+INTJ
{
  const userType = 'INTJ'
  const text = 'người ấy là ENFP, tụi mình hợp không?'
  const partner = resolvePartnerType([text], userType, null)
  const { block, meta } = buildMatchCompatInjectBlock({
    userType,
    partnerType: partner!,
  })
  check(
    'case 1 partner ENFP',
    partner === 'ENFP' && meta.mode === 'pair' && meta.pairKey === 'ENFP+INTJ',
    `partner=${partner} mode=${meta.mode} key=${meta.pairKey}`,
  )
  check(
    'case 1 inject per-pair content',
    block !== null &&
      block.includes('Động lực:') &&
      block.includes('Vùng ma sát:') &&
      block.includes('KHÔNG nói %/điểm'),
  )
}

// 2. INTJ + "người ấy cũng INTJ" → block fallback
{
  const userType = 'INTJ'
  const text = 'người ấy cũng INTJ thì sao?'
  const partner = resolvePartnerType([text], userType, null)
  const { block, meta } = buildMatchCompatInjectBlock({
    userType,
    partnerType: partner!,
  })
  check('case 2 partner INTJ', partner === 'INTJ', `partner=${partner}`)
  check(
    'case 2 block inject INTJ+INTJ',
    meta.mode === 'block' &&
      meta.blockKeys.join(',') === 'B1_NN,B5_TT,B8_JJ,B11_II',
    `mode=${meta.mode} keys=${meta.blockKeys.join(',')}`,
  )
  check('case 2 has block content', block !== null && block.includes('B1_NN'))
}

// 3. INFP + vague description → no inject
{
  const userType = 'INFP'
  const text = 'không rõ bạn ấy type gì, chắc hướng ngoại thích kế hoạch'
  const partner = resolvePartnerType([text], userType, null)
  check('case 3 no partner type', partner === null, `partner=${partner}`)
}

// 4. protective → no compat in prompt
{
  const text = 'anh ấy kiểm soát hết, không cho tôi ra ngoài'
  const safety = resolveMatchSafetyTurn(text)
  const prompt = buildMatchSystemContent({
    personaCompressed: 'x',
    voice: 'sincere',
    mbtiType: 'INFP',
    archetypeLabel: 'Test',
    identity: 'A',
    userMessage: text,
    userAge: 25,
    crisisTurn: safety.crisisTurn,
    protectiveTurn: safety.protectiveTurn,
    skipStyle: true,
    kbBlock: null,
    situationalBlock: null,
    compatBlock: null,
    summaryBlock: null,
  })
  check('case 4 PROTECTIVE fire', safety.protectiveTurn && !safety.crisisTurn)
  check(
    'case 4 no compat in protective prompt',
    !prompt.includes('NGỮ CẢNH TƯƠNG HỢP') &&
      prompt.includes('MA PROTECTIVE'),
  )
}

// 5. crisis → no compat
{
  const text = 'tôi muốn biến mất'
  const safety = resolveMatchSafetyTurn(text)
  const prompt = buildMatchSystemContent({
    personaCompressed: 'x',
    voice: 'sincere',
    mbtiType: 'INFP',
    archetypeLabel: 'Test',
    identity: 'A',
    userMessage: text,
    userAge: 25,
    crisisTurn: safety.crisisTurn,
    protectiveTurn: safety.protectiveTurn,
    skipStyle: true,
    kbBlock: null,
    situationalBlock: null,
    compatBlock: null,
    summaryBlock: null,
  })
  check('case 5 CRISIS fire', safety.crisisTurn && !safety.protectiveTurn)
  check(
    'case 5 crisis prompt not compat',
    !prompt.includes('NGỮ CẢNH TƯƠNG HỢP'),
  )
}

console.log(`\nTotal: ${pass} PASS, ${fail} FAIL`)
process.exit(fail > 0 ? 1 : 0)
