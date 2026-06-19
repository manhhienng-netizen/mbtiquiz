/**
 * WORK SCOPE DETECT — Layer A + B1 + B2 (WA only)
 * workContextScore trung tâm · append cuối reply · không qua system prompt
 */

import { pickScopePhrase } from '../../data/work-scope-phrases'

const WORK_KEYWORDS = [
  'sếp',
  'đồng nghiệp',
  'công ty',
  'công việc',
  'deadline',
  'lương',
  'thăng tiến',
  'họp',
  'dự án',
  'khách hàng',
  'nhân viên',
  'team',
  'quản lý',
  'lead',
  'review',
  'kpi',
  'phỏng vấn',
  'hợp đồng',
  'sản phẩm',
  'báo cáo',
]

const NON_WORK_SIGNALS = [
  'cô đơn',
  'ý nghĩa cuộc sống',
  'ý nghĩa cuộc sống của mình',
  'không biết mình muốn gì',
  'không biết mình là ai',
  'quan hệ tình cảm',
  'người yêu',
  'gia đình',
  'bố mẹ',
  'bạn bè ngoài công việc',
  'hạnh phúc cá nhân',
  'tự ti',
  'trầm cảm',
  'lo âu',
  'sức khoẻ tâm lý',
]

export function calcWorkContextScore(userMessage: string): number {
  const msg = userMessage.toLowerCase()
  const workHits = WORK_KEYWORDS.filter((k) => msg.includes(k)).length
  if (workHits >= 2) return 0.9
  if (workHits === 1) return 0.6
  const nonWorkHits = NON_WORK_SIGNALS.filter((k) => msg.includes(k)).length
  if (nonWorkHits >= 1) return 0.1
  return 0.35
}

export function hasNonWorkSignal(userMessage: string): boolean {
  const msg = userMessage.toLowerCase()
  return NON_WORK_SIGNALS.some((k) => msg.includes(k))
}

export function shouldFireScopeNudge(
  userMessage: string,
  state: WorkScopeState,
  turnIndex: number,
  isCrisis: boolean,
): boolean {
  if (isCrisis) return false
  if (state.hasShownScopeNudge) return false
  if (turnIndex < 2) return false
  const score = calcWorkContextScore(userMessage)
  return score < 0.3 && hasNonWorkSignal(userMessage)
}

export function shouldFireWelcomeTip(
  userMessage: string,
  state: WorkScopeState,
  turnIndex: number,
  workMessageCount: number,
  isProtectiveOrCrisis: boolean,
): boolean {
  if (isProtectiveOrCrisis) return false
  if (state.hasShownWelcomeTip) return false
  if (turnIndex !== 0) return false
  if (workMessageCount >= 5) return false
  const wordCount = userMessage.trim().split(/\s+/).filter(Boolean).length
  const score = calcWorkContextScore(userMessage)
  return wordCount < 10 && score < 0.5
}

export function shouldFireIdlePrompt(
  recentScores: number[],
  state: WorkScopeState,
  isProtectiveOrCrisis: boolean,
): boolean {
  if (isProtectiveOrCrisis) return false
  if (state.hasShownIdlePrompt) return false
  if (recentScores.length < 3) return false
  return recentScores.slice(-3).every((s) => s < 0.3)
}

export interface WorkScopeState {
  hasShownScopeNudge: boolean
  hasShownWelcomeTip: boolean
  hasShownIdlePrompt: boolean
  recentWorkContextScores: number[]
}

export function initWorkScopeState(): WorkScopeState {
  return {
    hasShownScopeNudge: false,
    hasShownWelcomeTip: false,
    hasShownIdlePrompt: false,
    recentWorkContextScores: [],
  }
}

export function updateScopeState(
  state: WorkScopeState,
  score: number,
  fired: 'A' | 'B1' | 'B2' | null,
): WorkScopeState {
  const scores = [...state.recentWorkContextScores, score].slice(-3)
  return {
    hasShownScopeNudge: fired === 'A' ? true : state.hasShownScopeNudge,
    hasShownWelcomeTip: fired === 'B1' ? true : state.hasShownWelcomeTip,
    hasShownIdlePrompt: fired === 'B2' ? true : state.hasShownIdlePrompt,
    recentWorkContextScores: scores,
  }
}

export function resolveWorkScopeAppend(
  replyBody: string,
  userMessage: string,
  scopeState: WorkScopeState,
  opts: {
    turnIndex: number
    workMessageCount: number
    isProtectiveOrCrisis: boolean
    isCrisis: boolean
    recentAssistantReplies?: string[]
  },
): { reply: string; state: WorkScopeState; fired: 'A' | 'B1' | 'B2' | null } {
  const score = calcWorkContextScore(userMessage)
  const {
    turnIndex,
    workMessageCount,
    isProtectiveOrCrisis,
    isCrisis,
    recentAssistantReplies = [],
  } = opts

  let fired: 'A' | 'B1' | 'B2' | null = null
  let appendText = ''

  if (
    shouldFireWelcomeTip(
      userMessage,
      scopeState,
      turnIndex,
      workMessageCount,
      isProtectiveOrCrisis,
    )
  ) {
    appendText = `\n\n${pickScopePhrase('welcomeTip', recentAssistantReplies)}`
    fired = 'B1'
  } else if (
    shouldFireScopeNudge(userMessage, scopeState, turnIndex, isCrisis)
  ) {
    appendText = `\n\n${pickScopePhrase('scopeNudge', recentAssistantReplies)}`
    fired = 'A'
  } else if (
    shouldFireIdlePrompt(
      scopeState.recentWorkContextScores,
      scopeState,
      isProtectiveOrCrisis,
    )
  ) {
    appendText = `\n\n${pickScopePhrase('idlePrompt', recentAssistantReplies)}`
    fired = 'B2'
  }

  return {
    reply: replyBody + appendText,
    state: updateScopeState(scopeState, score, fired),
    fired,
  }
}
