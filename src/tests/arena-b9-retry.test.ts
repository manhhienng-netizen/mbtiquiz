import { describe, expect, it, vi, beforeEach } from 'vitest'
import { canRetry } from '../lib/arena-retry'

vi.mock('../lib/arena-premium', () => ({
  isPremiumActive: vi.fn(() => false),
}))

import { isPremiumActive } from '../lib/arena-premium'

describe('B9 — canRetry', () => {
  beforeEach(() => {
    vi.mocked(isPremiumActive).mockReturnValue(false)
  })

  it('tập 1: 1 lần free', () => {
    expect(canRetry(1, 1, 0)).toEqual({ allowed: true, isPremiumFeature: false })
    expect(canRetry(1, 3, 0).allowed).toBe(true)
    expect(canRetry(1, 1, 1)).toEqual({
      allowed: false,
      reason: 'tutorial-used',
      isPremiumFeature: false,
    })
  })

  it('tập 2+ level 1: không chọn lại', () => {
    expect(canRetry(2, 1, 0)).toEqual({
      allowed: false,
      reason: 'level1-no-retry',
      isPremiumFeature: false,
    })
    expect(canRetry(2, 2, 0).reason).toBe('level1-no-retry')
  })

  it('tập 2+ level 2-3 free: cần premium', () => {
    expect(canRetry(2, 3, 0)).toEqual({
      allowed: false,
      reason: 'need-premium',
      isPremiumFeature: true,
    })
  })

  it('tập 2+ level 2-3 premium: max 2 lần', () => {
    vi.mocked(isPremiumActive).mockReturnValue(true)
    expect(canRetry(2, 4, 0)).toEqual({ allowed: true, isPremiumFeature: true })
    expect(canRetry(2, 4, 1).allowed).toBe(true)
    expect(canRetry(2, 4, 2)).toEqual({
      allowed: false,
      reason: 'premium-limit-reached',
      isPremiumFeature: true,
    })
  })
})
