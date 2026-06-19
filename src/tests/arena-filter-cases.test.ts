import { describe, expect, it } from 'vitest'
import type { RolePlayCase } from '../data/roleplay-case-studies'
import { ROLEPLAY_CASES } from '../data/roleplay-case-studies'
import {
  buildArenaContextHint,
  filterCases,
  nextCaseFromPool,
  createSession,
} from '../lib/arena-session'

const FIXTURE: RolePlayCase[] = [
  {
    id: 't1',
    role: 'MG',
    title: 'A',
    tags: ['conflict', 'ENTJ+INTJ'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
  {
    id: 't2',
    role: 'MG',
    title: 'B',
    tags: ['conflict'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
  {
    id: 't3',
    role: 'MG',
    title: 'C',
    tags: ['feedback'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
  {
    id: 't4',
    role: 'DT',
    title: 'D',
    tags: ['conflict'],
    hook: 'h',
    setup: 's',
    choices: [],
    consequences: [],
    typeFeedback: [],
    mirrorMoment: 'm',
  },
]

describe('filterCases', () => {
  it('returns full pool when no context', () => {
    expect(filterCases(FIXTURE, {})).toEqual(FIXTURE)
    expect(filterCases(ROLEPLAY_CASES, {})).toBe(ROLEPLAY_CASES)
  })

  it('priority 2: role + scenario', () => {
    const out = filterCases(FIXTURE, { role: 'MG', scenario: 'conflict' })
    expect(out).toHaveLength(2)
    expect(out.every((c) => c.role === 'MG' && c.tags.includes('conflict'))).toBe(true)
  })

  it('priority 3: role only when scenario match too few', () => {
    const out = filterCases(FIXTURE, { role: 'MG', scenario: 'feedback' })
    expect(out.length).toBeGreaterThanOrEqual(1)
    expect(out.every((c) => c.role === 'MG')).toBe(true)
  })

  it('falls back to full pool when role unknown in pool', () => {
    expect(filterCases(FIXTURE, { role: 'ZZ' })).toEqual(FIXTURE)
  })

  it('DT + conflict from real pool', () => {
    const out = filterCases(ROLEPLAY_CASES, { role: 'DT', scenario: 'conflict' })
    expect(out.length).toBeGreaterThanOrEqual(1)
    expect(out.every((c) => c.role === 'DT')).toBe(true)
  })
})

describe('nextCaseFromPool', () => {
  it('skips served ids', () => {
    const session = createSession('MG')
    session.servedCaseIds = ['t1', 't2']
    const picked = nextCaseFromPool(session, FIXTURE)
    expect(picked).not.toBeNull()
    expect(['t3', 't4']).toContain(picked?.id)
    expect(session.servedCaseIds).not.toContain(picked?.id)
  })
})

describe('buildArenaContextHint', () => {
  it('builds hint when scenario present', () => {
    const hint = buildArenaContextHint({
      role: 'MG',
      scenario: 'conflict',
      origin: 'HieuSep',
    })
    expect(hint).toContain('HieuSep')
    expect(hint).toContain('scenario=conflict')
  })

  it('returns undefined when empty', () => {
    expect(buildArenaContextHint({ role: 'MG' })).toBeUndefined()
  })

  it('includes mbti group hint for smart mode', () => {
    const hint = buildArenaContextHint({ mbtiGroup: 'NT' })
    expect(hint).toContain('phân tích')
  })
})
