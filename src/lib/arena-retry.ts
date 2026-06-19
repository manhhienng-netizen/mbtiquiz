// Chọn lại có giới hạn — không bất tử trong narrative (B9)

import { getDifficultyLevel } from './arena-arc'
import { isPremiumActive } from './arena-premium'

const FREE_RETRY_TUTORIAL = 1
const PREMIUM_RETRY_PER_ARC = 2

export interface RetryState {
  arcNumber: number
  retriesUsed: number
}

export interface RetryCheck {
  allowed: boolean
  reason?: string
  isPremiumFeature: boolean
}

/** Có được Chọn lại ở episode này không? */
export function canRetry(
  arcNumber: number,
  episodeNumber: number,
  retriesUsed: number,
): RetryCheck {
  const level = getDifficultyLevel(episodeNumber)

  if (arcNumber === 1) {
    if (retriesUsed < FREE_RETRY_TUTORIAL) {
      return { allowed: true, isPremiumFeature: false }
    }
    return { allowed: false, reason: 'tutorial-used', isPremiumFeature: false }
  }

  if (level === 1) {
    return { allowed: false, reason: 'level1-no-retry', isPremiumFeature: false }
  }

  if (!isPremiumActive()) {
    return { allowed: false, reason: 'need-premium', isPremiumFeature: true }
  }
  if (retriesUsed >= PREMIUM_RETRY_PER_ARC) {
    return { allowed: false, reason: 'premium-limit-reached', isPremiumFeature: true }
  }
  return { allowed: true, isPremiumFeature: true }
}

export { FREE_RETRY_TUTORIAL, PREMIUM_RETRY_PER_ARC }
