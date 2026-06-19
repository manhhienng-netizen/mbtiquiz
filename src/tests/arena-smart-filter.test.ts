import { describe, expect, it } from 'vitest'
import type { RolePlayCase } from '../data/roleplay-case-studies'
import { getMbtiGroup, smartFilterByGroup } from '../lib/arena-session'

const POOL: RolePlayCase[] = [
  {
    id: 'nt-1',
    role: 'MG',
    title: 'NT',
    tags: ['conflict', 'strategy'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
  {
    id: 'nf-1',
    role: 'KH',
    title: 'NF',
    tags: ['feedback'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
  {
    id: 'done',
    role: 'DT',
    title: 'Done',
    tags: ['conflict'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
]

describe('getMbtiGroup', () => {
  it('maps INTJ to NT', () => {
    expect(getMbtiGroup('INTJ')).toBe('NT')
  })

  it('maps ENFP to NF', () => {
    expect(getMbtiGroup('ENFP')).toBe('NF')
  })

  it('maps ESTJ to ST', () => {
    expect(getMbtiGroup('ESTJ')).toBe('ST')
  })

  it('maps ISFP to SF', () => {
    expect(getMbtiGroup('ISFP')).toBe('SF')
  })

  it('returns null for invalid types', () => {
    expect(getMbtiGroup('INT')).toBeNull()
    expect(getMbtiGroup('INTJX')).toBeNull()
    expect(getMbtiGroup('IXTJ')).toBeNull()
    expect(getMbtiGroup('INPJ')).toBeNull()
    expect(getMbtiGroup('')).toBeNull()
  })
})

describe('smartFilterByGroup', () => {
  it('prefers NT-tagged uncompleted cases', () => {
    const out = smartFilterByGroup(POOL, 'NT', ['done'])
    expect(out.map((c) => c.id)).toEqual(['nt-1'])
  })

  it('prefers NF-tagged uncompleted cases', () => {
    const out = smartFilterByGroup(POOL, 'NF', ['done'])
    expect(out.map((c) => c.id)).toEqual(['nf-1'])
  })

  it('falls back to uncompleted when no tag match', () => {
    const out = smartFilterByGroup(POOL, 'ST', ['done'])
    expect(out.map((c) => c.id)).toEqual(['nt-1', 'nf-1'])
  })

  it('falls back to full pool when all completed', () => {
    const out = smartFilterByGroup(POOL, 'NT', ['nt-1', 'nf-1', 'done'])
    expect(out).toEqual(POOL)
  })
})
