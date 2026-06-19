import { describe, it, expect } from 'vitest'
import { runGuardrail } from '../lib/arena-case-generator'

describe('M4 — Guardrail 3 lớp', () => {
  it('chặn sa thải / fire', () => {
    const input = JSON.stringify({
      hook: 'đề xuất sa thải nhân viên ngay',
      choices: [],
    })
    expect(runGuardrail(input)).toEqual({ pass: false, reason: 'anti-selection' })
  })

  it('chặn không thuê', () => {
    const input = JSON.stringify({
      hook: 'không thuê người này vào team',
      choices: [],
    })
    expect(runGuardrail(input)).toEqual({ pass: false, reason: 'anti-selection' })
  })

  it('chặn muốn nghỉ hết', () => {
    const input = JSON.stringify({
      hook: 'nhân viên nói muốn nghỉ hết rồi',
      choices: [],
    })
    expect(runGuardrail(input)).toEqual({ pass: false, reason: 'crisis-detected' })
  })

  it('chặn không trụ nổi', () => {
    const input = JSON.stringify({
      hook: 'bạn cảm thấy không trụ nổi nữa',
      choices: [],
    })
    expect(runGuardrail(input)).toEqual({ pass: false, reason: 'crisis-detected' })
  })

  it('chặn type giỏi hơn', () => {
    const input = JSON.stringify({
      hook: 'INTJ type này giỏi hơn ENFP',
      choices: [],
    })
    expect(runGuardrail(input)).toEqual({ pass: false, reason: 'type-judgment' })
  })

  it('pass case bình thường', () => {
    const input = JSON.stringify({
      hook: 'Đồng nghiệp nhờ bạn review báo cáo trước deadline',
      choices: [
        { id: 'A', action: 'review ngay hôm nay' },
        { id: 'B', action: 'hỏi thêm context trước' },
        { id: 'C', action: 'đề xuất pair review cùng nhau' },
      ],
    })
    expect(runGuardrail(input)).toEqual({ pass: true })
  })

  it('pass khi không có từ nhạy cảm', () => {
    const input = JSON.stringify({
      hook: 'Khách hàng yêu cầu thay đổi scope dự án',
      choices: [],
    })
    expect(runGuardrail(input)).toEqual({ pass: true })
  })
})
