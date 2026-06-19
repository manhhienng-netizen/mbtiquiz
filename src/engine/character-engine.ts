import {
  findConvergences,
  generatePersonaCompressed,
  getTraitLabel,
  selectArchetypeFromTraits,
  TRAIT_SIGNALS,
  type ConvergenceInput,
} from '../data/convergence-traits-data'
import type { QuizResult } from '../data/quiz-types'

export interface CharacterResult {
  archetypeKey: string
  archetypeLabel: string
  coreTraits: string[]
  coreTraitLabels: string[]
  mbtiOnlyTraits: string[]
  numOnlyTraits: string[]
  elemOnlyTraits: string[]
  growthZone: string[]
  convergenceScore: number
  personaCompressed: string
  hasSpiritualData: boolean
  /** true when only MBTI (no spiritual) or traits come from mbtiOnly fallback */
  isPartialResult: boolean
}

const MAX_CORE_TRAITS = 5
const MAX_MBTI_ONLY_TRAITS = 3

function getTraitConfirmCount(
  trait: string,
  input: Pick<ConvergenceInput, 'mbtiType' | 'lifePath' | 'element' | 'nhatChu'>
): number {
  const traitDef = TRAIT_SIGNALS.find((ts) => ts.trait === trait)
  if (!traitDef) return 0

  const { mbtiSignals, numerologySignals, elementSignals } = traitDef
  const { mbtiType, lifePath, element, nhatChu } = input

  const hasMbti =
    mbtiSignals.strongTypes.includes(mbtiType) ||
    mbtiSignals.moderateTypes.includes(mbtiType)
  const hasNum =
    numerologySignals.strongNumbers.includes(lifePath) ||
    numerologySignals.moderateNumbers.includes(lifePath)
  const hasElem =
    elementSignals.strongElements.includes(element) ||
    elementSignals.moderateElements.includes(element)
  const hasBatTu = !!(nhatChu && elementSignals.batTuCan?.includes(nhatChu))

  return [hasMbti, hasNum, hasElem || hasBatTu].filter(Boolean).length
}

function sortAndLimitCoreTraits(
  traits: string[],
  input: Pick<ConvergenceInput, 'mbtiType' | 'lifePath' | 'element' | 'nhatChu'>,
  max: number
): string[] {
  return [...traits]
    .sort((a, b) => getTraitConfirmCount(b, input) - getTraitConfirmCount(a, input))
    .slice(0, max)
}

const ARCHETYPE_LABELS: Record<string, string> = {
  strategic_architect: 'Kiến trúc sư chiến lược',
  empathetic_leader: 'Lãnh đạo truyền cảm hứng',
  creative_pioneer: 'Người tiên phong sáng tạo',
  resilient_builder: 'Người xây dựng kiên cường',
  healing_teacher: 'Người thầy chữa lành',
  connector_catalyst: 'Chất xúc tác kết nối',
  deep_seeker: 'Người tìm kiếm chiều sâu',
}

export function computeCharacter(result: QuizResult): CharacterResult {
  if (!result.mbtiType) {
    throw new Error('computeCharacter requires mbtiType')
  }

  const hasSpiritualData = !!(result.lifePath && result.element)
  const isPartialResult = !hasSpiritualData

  const convergenceInput: ConvergenceInput = {
    mbtiType: result.mbtiType,
    lifePath: result.lifePath ?? 0,
    element: result.element ?? '',
    nhatChu: result.nhatChu,
  }

  const convergence = findConvergences(convergenceInput)

  let displayTraits = sortAndLimitCoreTraits(
    convergence.coreTraits,
    convergenceInput,
    MAX_CORE_TRAITS
  )

  if (displayTraits.length === 0) {
    displayTraits = sortAndLimitCoreTraits(
      convergence.mbtiOnlyTraits,
      convergenceInput,
      MAX_MBTI_ONLY_TRAITS
    )
  }

  const archetypeKey = selectArchetypeFromTraits(displayTraits)
  const archetypeLabel = ARCHETYPE_LABELS[archetypeKey] ?? archetypeKey

  const personaCompressed = generatePersonaCompressed({
    mbtiType: result.mbtiType,
    identity: result.identity ?? 'A',
    lifePath: result.lifePath ?? 0,
    element: result.element ?? '',
    archetype: archetypeKey,
    coreTraits: displayTraits,
  })

  return {
    archetypeKey,
    archetypeLabel,
    coreTraits: displayTraits,
    coreTraitLabels: displayTraits.map((t) => getTraitLabel(t)),
    mbtiOnlyTraits: convergence.mbtiOnlyTraits,
    numOnlyTraits: convergence.numOnlyTraits,
    elemOnlyTraits: convergence.elemOnlyTraits,
    growthZone: convergence.growthZone,
    convergenceScore: convergence.convergenceScore,
    personaCompressed,
    hasSpiritualData,
    isPartialResult,
  }
}
