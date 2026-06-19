import { describe, expect, it } from 'vitest'
import { isForbiddenGoalText } from '../lib/work-goal-ai'

describe('work-goal-ai guardrail', () => {
  it('blocks sa thải goals', () => {
    expect(isForbiddenGoalText('Muốn sa thải nhân viên yếu')).toBe(true)
  })

  it('allows skill goals', () => {
    expect(isForbiddenGoalText('Thăng manager trong 6 tháng')).toBe(false)
  })
})
