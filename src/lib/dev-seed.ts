import { QUIZ_RESULT_KEY, type QuizResult } from '../data/quiz-types'
import {
  clearAllData,
  getCurrentCharacter,
  getLatestMBTI,
  mapCharacterToCurrentRecord,
  saveCurrentCharacter,
  saveMBTIResult,
  saveSpiritualResult,
} from '../db/tncb-db'
import { computeCharacter } from '../engine/character-engine'

const SEED_PCC = { EI: 22, SN: 78, TF: 72, JP: 85 }

function buildSeedQuizResult(): QuizResult {
  return {
    mbtiType: 'INTJ',
    identity: 'A',
    pcc: SEED_PCC,
    completedAt: new Date().toISOString(),
    fullName: 'Dev Test User',
    birthDate: '1990-05-15',
    birthHour: '09:00',
    lunarYear: 1990,
    canYear: 'Canh',
    chiYear: 'Ngọ',
    nhatChu: 'Giáp',
    element: 'Kim',
    cungMenh: 'Khảm',
    lifePath: 8,
  }
}

export async function seedTestUser(): Promise<void> {
  const quizResult = buildSeedQuizResult()
  const character = computeCharacter(quizResult)

  await saveSpiritualResult({
    fullName: quizResult.fullName!,
    birthDate: quizResult.birthDate!,
    birthHour: quizResult.birthHour ?? '',
    lunarYear: quizResult.lunarYear!,
    canYear: quizResult.canYear!,
    chiYear: quizResult.chiYear!,
    nhatChu: quizResult.nhatChu!,
    element: quizResult.element!,
    cungMenh: quizResult.cungMenh ?? '',
    lifePath: quizResult.lifePath!,
  })

  await saveMBTIResult({
    mbtiType: quizResult.mbtiType!,
    identity: quizResult.identity!,
    pcc: quizResult.pcc!,
    archetypeKey: character.archetypeKey,
    archetypeLabel: character.archetypeLabel,
    coreTraitLabels: character.coreTraitLabels,
    convergenceScore: character.convergenceScore,
  })

  await saveCurrentCharacter(mapCharacterToCurrentRecord(character))

  localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(quizResult))

  const mbti = await getLatestMBTI()
  const current = await getCurrentCharacter()

  console.log('[DEV] seedTestUser OK')
  console.log('  MBTI:', mbti?.mbtiType, mbti?.identity)
  console.log('  Archetype:', current?.archetypeLabel, `(${current?.archetypeKey})`)
  console.log('  Core traits:', current?.coreTraitLabels?.join(', '))
  console.log('  Persona:', current?.personaCompressed)
}

export async function clearTestUser(): Promise<void> {
  await clearAllData()
  localStorage.removeItem(QUIZ_RESULT_KEY)
  console.log('[DEV] clearTestUser OK — Dexie + mbtiquiz_result cleared')
}
