import type { ShareCardProps } from '../components/ShareCard'
import { getCombinationPhrase } from '../data/tncb-combination-phrases'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import type { QuizResult } from '../data/quiz-types'
import type { CharacterResult } from '../engine/character-engine'

export function buildShareCardData(
  result: QuizResult,
  character: CharacterResult,
): ShareCardProps {
  const mbtiContent = TNCB_TYPE_CONTENT[result.mbtiType ?? 'INFP']
  const combinationPhrase =
    result.nhatChu && result.lifePath
      ? getCombinationPhrase(result.nhatChu, result.lifePath)
      : undefined

  return {
    archetypeKey: character.archetypeKey,
    mbtiNickname: mbtiContent?.nickname ?? 'Nhà khám phá',
    combinationPhrase: combinationPhrase || undefined,
    mbtiType: result.mbtiType ?? 'INFP',
    identity: result.identity ?? 'A',
    inOneSentence: mbtiContent?.inOneSentence ?? '',
    coreTraitLabels: character.coreTraitLabels.slice(0, 3),
    nhatChu: result.nhatChu,
    element: result.element,
    lifePath: result.lifePath,
    gender: result.gender,
    genderPreference: result.genderPreference,
  }
}
