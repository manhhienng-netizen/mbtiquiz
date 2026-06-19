import { describe, expect, it } from 'vitest'
import { getCompatSignal } from './compat-signal'

describe('getCompatSignal', () => {
  it('1. ENFP × INTJ full + element Mộc × Kim', () => {
    const signal = getCompatSignal({
      userType: 'ENFP',
      partner: 'INTJ',
      userElement: 'Mộc',
      partnerElement: 'Kim',
    })

    expect(signal.axes).toEqual({
      EI: 'diff',
      NS: 'same',
      TF: 'diff',
      JP: 'diff',
    })
    expect(signal.blockKeys).toEqual(['B1_NN', 'B4_TxF', 'B7_JxP', 'B10_ExI'])
    expect(signal.pairKey).toBe('ENFP+INTJ')
    expect(signal.coverage).toBe('full')
    expect(signal.elementRelation).toBe('partnerKhacUser')
    expect(signal.elementNote).toBe('dễ va về giá trị/cách làm')
  })

  it('2. INTJ × INTJ full, no element', () => {
    const signal = getCompatSignal({
      userType: 'INTJ',
      partner: 'INTJ',
    })

    expect(signal.axes).toEqual({
      EI: 'same',
      NS: 'same',
      TF: 'same',
      JP: 'same',
    })
    expect(signal.blockKeys).toEqual(['B1_NN', 'B5_TT', 'B8_JJ', 'B11_II'])
    expect(signal.pairKey).toBe('INTJ+INTJ')
    expect(signal.coverage).toBe('full')
    expect(signal.elementRelation).toBe('unknown')
    expect(signal.elementNote).toBe('')
  })

  it('3. INFP partial partner { EI: E, NS: S }', () => {
    const signal = getCompatSignal({
      userType: 'INFP',
      partner: { EI: 'E', NS: 'S' },
    })

    expect(signal.axes).toEqual({
      EI: 'diff',
      NS: 'diff',
      TF: 'unknown',
      JP: 'unknown',
    })
    expect(signal.blockKeys).toEqual(['B3_NxS', 'B10_ExI'])
    expect(signal.pairKey).toBeNull()
    expect(signal.coverage).toBe('partial')
  })

  it('4. ENFJ × ISTP same element Hỏa', () => {
    const signal = getCompatSignal({
      userType: 'ENFJ',
      partner: 'ISTP',
      userElement: 'Hỏa',
      partnerElement: 'Hỏa',
    })

    expect(signal.elementRelation).toBe('same')
    expect(signal.elementNote).toContain('đồng hành')
  })

  it('5. invalid userType ENF throws', () => {
    expect(() =>
      getCompatSignal({
        userType: 'ENF',
        partner: 'INTJ',
      }),
    ).toThrow('invalid userType')
  })
})
