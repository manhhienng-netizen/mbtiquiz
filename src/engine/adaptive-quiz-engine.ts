import type { QuizQuestion } from '../data/mbti-quiz-data'
import {
  ALL_QUESTIONS,
  calculateDimensionScore,
  getMBTIType,
  getPCC,
  isDimensionAmbiguous,
  isDimensionClear,
  MAX_PER_DIM,
  MIN_PER_DIM,
  PHASE1_QUESTIONS,
  PHASE2_POOL,
  PHASE3_POOL,
} from '../data/mbti-quiz-data'
import type { MBTIType, QuizResult } from '../data/quiz-types'

export type Dimension = 'EI' | 'NS' | 'TF' | 'JP'

export type PreviewKey = 'I_N' | 'I_S' | 'E_N' | 'E_S' | 'uncertain'

export type LikertValue = 1 | 2 | 3 | 4 | 5

export interface QuizAnswer {
  questionId: string
  value: LikertValue
}

export interface DimensionState {
  score: number
  answeredCount: number
  isComplete: boolean
}

export interface AdaptiveQuizState {
  phase: 1 | 2 | 3
  answers: QuizAnswer[]
  dimensions: Record<Dimension, DimensionState>
  currentQuestion: QuizQuestion | null
  isComplete: boolean
  showPhase2Preview: boolean
  showPhase3Prompt: boolean
  phase3Active: boolean
}

const DIMENSIONS: Dimension[] = ['EI', 'NS', 'TF', 'JP']

/** Phase 2: TF has highest minimum item count */
const PHASE2_PRIORITY: Dimension[] = ['TF', 'EI', 'NS', 'JP']

const PCC_LABEL_TO_NUMBER: Record<
  ReturnType<typeof getPCC>,
  number
> = {
  slight: 25,
  moderate: 50,
  clear: 75,
  very_clear: 100,
}

function emptyDimensions(): Record<Dimension, DimensionState> {
  return {
    EI: { score: 50, answeredCount: 0, isComplete: false },
    NS: { score: 50, answeredCount: 0, isComplete: false },
    TF: { score: 50, answeredCount: 0, isComplete: false },
    JP: { score: 50, answeredCount: 0, isComplete: false },
  }
}

function recalcDimensions(answers: QuizAnswer[]): Record<Dimension, DimensionState> {
  const next = emptyDimensions()
  for (const dim of DIMENSIONS) {
    const score = calculateDimensionScore(answers, dim, ALL_QUESTIONS)
    const answeredCount = answers.filter((a) => {
      const q = ALL_QUESTIONS.find((item) => item.id === a.questionId)
      return q?.dimension === dim
    }).length
    const isComplete =
      isDimensionClear(score) || answeredCount >= MAX_PER_DIM[dim]
    next[dim] = { score, answeredCount, isComplete }
  }
  return next
}

function answeredIds(answers: QuizAnswer[]): Set<string> {
  return new Set(answers.map((a) => a.questionId))
}

function phase1Complete(answers: QuizAnswer[]): boolean {
  const ids = answeredIds(answers)
  return PHASE1_QUESTIONS.every((q) => ids.has(q.id))
}

function phase2PoolRemaining(
  answers: QuizAnswer[],
  dim: Dimension,
): QuizQuestion[] {
  const ids = answeredIds(answers)
  return PHASE2_POOL.filter(
    (q) => q.dimension === dim && !ids.has(q.id),
  )
}

/** Phase 2 only while dimension is ambiguous, not complete, and pool has questions */
function needsPhase2Question(
  dim: Dimension,
  answers: QuizAnswer[],
  dimensions: Record<Dimension, DimensionState>,
): boolean {
  const d = dimensions[dim]
  if (!isDimensionAmbiguous(d.score) || d.isComplete) return false
  return phase2PoolRemaining(answers, dim).length > 0
}

/** No more Phase 2 questions to ask (pool exhausted and/or all dims complete) */
function isPhase2Finished(
  answers: QuizAnswer[],
  dimensions: Record<Dimension, DimensionState>,
): boolean {
  return pickPhase2Question(answers, dimensions) === null
}

function hasPhase3QuestionsRemaining(answers: QuizAnswer[]): boolean {
  const ids = answeredIds(answers)
  return PHASE3_POOL.some((q) => !ids.has(q.id))
}

function pickPhase2Question(
  answers: QuizAnswer[],
  dimensions: Record<Dimension, DimensionState>,
): QuizQuestion | null {
  for (const dim of PHASE2_PRIORITY) {
    const pool = phase2PoolRemaining(answers, dim)
    if (!needsPhase2Question(dim, answers, dimensions) || pool.length === 0) {
      continue
    }
    return pool[0] ?? null
  }
  return null
}

/** Phase 3: optional depth — ask all PHASE3_POOL items not yet answered */
function pickPhase3Question(answers: QuizAnswer[]): QuizQuestion | null {
  const ids = answeredIds(answers)
  return PHASE3_POOL.find((q) => !ids.has(q.id)) ?? null
}

function pickPhase1Question(answers: QuizAnswer[]): QuizQuestion | null {
  const ids = answeredIds(answers)
  return PHASE1_QUESTIONS.find((q) => !ids.has(q.id)) ?? null
}

export function getPreviewKey(
  dimensions: Record<Dimension, DimensionState>,
): PreviewKey {
  const ei = dimensions.EI.score
  const ns = dimensions.NS.score
  if (isDimensionAmbiguous(ei) && isDimensionAmbiguous(ns)) {
    return 'uncertain'
  }
  const eOrI = ei < 50 ? 'E' : 'I'
  const nOrS = ns < 50 ? 'N' : 'S'
  return `${eOrI}_${nOrS}` as PreviewKey
}

export function estimateTotalQuestions(state: AdaptiveQuizState): number {
  const answered = state.answers.length
  let remaining = 0
  for (const dim of DIMENSIONS) {
    const d = state.dimensions[dim]
    if (d.isComplete) continue
    if (state.phase === 1) {
      remaining += Math.max(0, MIN_PER_DIM[dim] - d.answeredCount)
      continue
    }
    if (isDimensionAmbiguous(d.score)) {
      remaining += Math.min(
        MAX_PER_DIM[dim] - d.answeredCount,
        PHASE2_POOL.filter((q) => q.dimension === dim).length,
      )
    }
  }
  const phase3Extra =
    state.phase3Active || state.showPhase3Prompt ? 4 : 0
  return Math.max(answered + remaining + phase3Extra, answered + 1, 8)
}

export function getPhaseLabel(phase: 1 | 2 | 3): string {
  if (phase === 1) return 'Khám phá'
  if (phase === 2) return 'Phân tích sâu'
  return 'Hoàn thiện'
}

export function initQuizState(): AdaptiveQuizState {
  const dimensions = emptyDimensions()
  const state: AdaptiveQuizState = {
    phase: 1,
    answers: [],
    dimensions,
    currentQuestion: pickPhase1Question([]),
    isComplete: false,
    showPhase2Preview: false,
    showPhase3Prompt: false,
    phase3Active: false,
  }
  return state
}

export function getNextQuestion(state: AdaptiveQuizState): QuizQuestion | null {
  if (state.showPhase2Preview || state.showPhase3Prompt || state.isComplete) {
    return null
  }

  if (state.phase === 1) {
    return pickPhase1Question(state.answers)
  }

  if (state.phase === 2) {
    return pickPhase2Question(state.answers, state.dimensions)
  }

  if (state.phase === 3 && state.phase3Active) {
    return pickPhase3Question(state.answers)
  }

  return null
}

function refreshState(
  partial: AdaptiveQuizState,
): AdaptiveQuizState {
  const dimensions = recalcDimensions(partial.answers)
  let showPhase2Preview = partial.showPhase2Preview
  let showPhase3Prompt = partial.showPhase3Prompt
  let phase3Active = partial.phase3Active
  let isComplete = partial.isComplete

  if (partial.phase === 1 && phase1Complete(partial.answers) && !showPhase2Preview) {
    showPhase2Preview = true
    return {
      ...partial,
      dimensions,
      showPhase2Preview: true,
      currentQuestion: null,
      isComplete: false,
    }
  }

  // Phase 2 ends when pool is exhausted and/or no dimension needs clarify — offer Phase 3
  if (
    partial.phase === 2 &&
    !showPhase2Preview &&
    !showPhase3Prompt &&
    isPhase2Finished(partial.answers, dimensions)
  ) {
    showPhase3Prompt = true
    return {
      ...partial,
      dimensions,
      showPhase3Prompt: true,
      currentQuestion: null,
      isComplete: false,
    }
  }

  if (
    partial.phase === 3 &&
    phase3Active &&
    !hasPhase3QuestionsRemaining(partial.answers)
  ) {
    isComplete = true
  }

  const currentQuestion = isComplete || showPhase2Preview || showPhase3Prompt
    ? null
    : getNextQuestion({
        ...partial,
        dimensions,
        showPhase2Preview,
        showPhase3Prompt,
        phase3Active,
        isComplete,
      })

  return {
    ...partial,
    dimensions,
    showPhase2Preview,
    showPhase3Prompt,
    phase3Active,
    isComplete,
    currentQuestion,
  }
}

export function answerQuestion(
  state: AdaptiveQuizState,
  questionId: string,
  value: LikertValue,
): AdaptiveQuizState {
  if (state.isComplete || state.showPhase2Preview || state.showPhase3Prompt) {
    return state
  }

  const answers: QuizAnswer[] = [
    ...state.answers,
    { questionId, value },
  ]

  return refreshState({
    ...state,
    answers,
  })
}

export function continueFromPhase2Preview(
  state: AdaptiveQuizState,
): AdaptiveQuizState {
  if (!state.showPhase2Preview) return state

  const next: AdaptiveQuizState = {
    ...state,
    showPhase2Preview: false,
    phase: 2,
  }
  return refreshState(next)
}

export function acceptPhase3(state: AdaptiveQuizState): AdaptiveQuizState {
  const next: AdaptiveQuizState = {
    ...state,
    showPhase3Prompt: false,
    phase3Active: true,
    phase: 3,
  }
  return refreshState(next)
}

export function skipPhase3(state: AdaptiveQuizState): AdaptiveQuizState {
  return {
    ...state,
    showPhase3Prompt: false,
    phase3Active: false,
    isComplete: true,
    currentQuestion: null,
  }
}

function computeIdentity(
  dimensions: Record<Dimension, DimensionState>,
): 'A' | 'T' {
  const slightCount = Object.values(dimensions).filter(
    (d) => Math.abs(d.score - 50) < 10,
  ).length
  return slightCount >= 2 ? 'T' : 'A'
}

export function computeResult(state: AdaptiveQuizState): QuizResult {
  const dimensions = recalcDimensions(state.answers)
  const scores: Record<Dimension, number> = {
    EI: dimensions.EI.score,
    NS: dimensions.NS.score,
    TF: dimensions.TF.score,
    JP: dimensions.JP.score,
  }

  const mbtiType = getMBTIType(scores) as MBTIType
  const identity = computeIdentity(dimensions)

  return {
    mbtiType,
    identity,
    pcc: {
      EI: PCC_LABEL_TO_NUMBER[getPCC(scores.EI)],
      SN: PCC_LABEL_TO_NUMBER[getPCC(scores.NS)],
      TF: PCC_LABEL_TO_NUMBER[getPCC(scores.TF)],
      JP: PCC_LABEL_TO_NUMBER[getPCC(scores.JP)],
    },
    completedAt: new Date().toISOString(),
  }
}
