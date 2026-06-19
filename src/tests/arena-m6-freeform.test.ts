import { describe, expect, it } from 'vitest'
import { validateFreeformInput } from '../lib/arena-case-generator'

describe('M6 — Freeform validate', () => {
  it('chặn input quá ngắn', () => {
    expect(validateFreeformInput('ok')).toEqual({ valid: false, reason: 'too-short' })
  })

  it('chặn input quá dài', () => {
    expect(validateFreeformInput('a'.repeat(301))).toEqual({ valid: false, reason: 'too-long' })
  })

  it('chặn crisis nghỉ việc', () => {
    expect(validateFreeformInput('tôi muốn nghỉ việc luôn')).toEqual({
      valid: false,
      reason: 'crisis',
    })
  })

  it('pass input hợp lệ', () => {
    expect(validateFreeformInput('Tôi xin thêm 1 ngày rồi giải thích lý do')).toEqual({
      valid: true,
    })
  })
})
