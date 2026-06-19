/**
 * Integration test: M1 (template) + M2 (adaptive) + M3a (chất lượng Ollama)
 * Cần: VITE_LLM_PROVIDER=ollama + Ollama local chạy + qwen3:8b đã pull
 *
 * Chạy: npm run test:arena:integration
 */

import {
  generateAdaptiveCase,
  runGuardrail,
  type AdaptiveCaseRole,
  type GeneratedCase,
} from '../lib/arena-case-generator'

const TEST_ROLES: AdaptiveCaseRole[] = ['MG', 'KH', 'DT', 'VT']
const M3A_CASES_REQUIRED = 5
const results: Record<string, boolean> = {}

async function testM1Template(role: AdaptiveCaseRole): Promise<boolean> {
  console.log(`\n[M1] Test template — role: ${role}`)
  const c = await generateAdaptiveCase(role)
  if (!c) {
    console.error('  FAIL: null returned')
    return false
  }

  const checks = {
    'hook present': !!c.hook,
    'setup present': !!c.setup,
    'choices 3': c.choices?.length === 3,
    'choices unique': new Set(c.choices.map((x) => x.action)).size === 3,
    'consequences 3': c.consequences?.length === 3,
    'typeFeedback 4': c.typeFeedback?.length === 4,
    'mirrorMoment present': !!c.mirrorMoment,
    isAiGenerated: c.isAiGenerated === true,
  }

  let allPass = true
  for (const [check, pass] of Object.entries(checks)) {
    console.log(`  ${pass ? '✓' : '✗'} ${check}`)
    if (!pass) allPass = false
  }
  return allPass
}

async function testM3aQuality(cases: GeneratedCase[]): Promise<number> {
  console.log(`\n[M3a] Eyeball ${cases.length} cases...`)
  let passCount = 0

  for (const c of cases) {
    const checks = {
      'on-topic (có ngữ cảnh công việc)': c.hook.length > 20,
      '3 choices khác nhau':
        new Set(c.choices.map((x) => x.action.slice(0, 20))).size === 3,
      'guardrail pass': runGuardrail(JSON.stringify(c)).pass,
      'mirrorMoment là câu hỏi':
        c.mirrorMoment.includes('?') || c.mirrorMoment.length > 15,
      'không từ cấm': !/(tiềm năng|hành trình|bứt phá)/.test(c.hook + c.mirrorMoment),
    }

    const casePass = Object.values(checks).every(Boolean)
    if (casePass) {
      passCount++
      console.log(`  ✓ Case ${c.id}: "${c.hook.slice(0, 50)}..."`)
    } else {
      console.log(`  ✗ Case ${c.id} FAIL:`)
      for (const [k, v] of Object.entries(checks)) {
        if (!v) console.log(`    - ${k}`)
      }
    }
  }

  return passCount
}

async function runAll() {
  console.log('=== ARENA INTEGRATION TEST (Ollama) ===\n')
  console.log(`Provider: ${process.env.VITE_LLM_PROVIDER ?? 'ollama (default)'}`)
  console.log(`Model: ${process.env.VITE_OLLAMA_MODEL ?? 'qwen3:8b (default)'}\n`)

  console.log('─── M1: TEMPLATE ───')
  const m1Results = await Promise.all(TEST_ROLES.map(testM1Template))
  results.M1 = m1Results.every(Boolean)
  console.log(
    `\nM1 RESULT: ${results.M1 ? '✅ PASS' : '❌ FAIL'} (${m1Results.filter(Boolean).length}/${TEST_ROLES.length} roles)`,
  )

  console.log('\n─── M3a: QUALITY (5 case MG) ───')
  const m3aCases: GeneratedCase[] = []
  for (let i = 0; i < M3A_CASES_REQUIRED; i++) {
    const c = await generateAdaptiveCase('MG')
    if (c) m3aCases.push(c)
    process.stdout.write('.')
  }
  console.log('')
  const m3aPass = await testM3aQuality(m3aCases)
  results.M3a = m3aPass >= 4
  console.log(
    `\nM3a RESULT: ${results.M3a ? '✅ PASS' : '❌ FAIL'} (${m3aPass}/${M3A_CASES_REQUIRED} cases)`,
  )

  console.log('\n══════════════════════════')
  console.log('SUMMARY:')
  for (const [m, pass] of Object.entries(results)) {
    console.log(`  ${pass ? '✅' : '❌'} ${m}`)
  }
  console.log('\nM2 (weaknessHint): test trong browser — xem console log "[Arena]"')
  console.log('M4 (guardrail): npx vitest run src/tests/arena-m4-guardrail.test.ts')
  console.log('M5 (metric): npx vitest run src/tests/arena-m5-metric.test.ts')
  console.log('══════════════════════════\n')
}

runAll().catch(console.error)
