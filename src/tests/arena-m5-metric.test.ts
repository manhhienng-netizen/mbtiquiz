import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../db/tncb-db', () => ({
  db: {
    arenaProgress: {
      get: vi.fn(),
      put: vi.fn(),
      toArray: vi.fn().mockResolvedValue([]),
    },
  },
}))

import { getStrengthLevel, recordCompletion } from '../lib/arena-progress'
import type { RoleProgress } from '../lib/arena-progress'
import { db } from '../db/tncb-db'

describe('M5 — Metric bản đồ phản xạ', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('chưa luyện: 0 case', () => {
    expect(getStrengthLevel(undefined)).toBe('chưa luyện')
    expect(getStrengthLevel({ totalCompleted: 0 } as RoleProgress)).toBe('chưa luyện')
  })

  it('đang luyện: 1-9 case', () => {
    expect(getStrengthLevel({ totalCompleted: 1 } as RoleProgress)).toBe('đang luyện')
    expect(getStrengthLevel({ totalCompleted: 5 } as RoleProgress)).toBe('đang luyện')
    expect(getStrengthLevel({ totalCompleted: 9 } as RoleProgress)).toBe('đang luyện')
  })

  it('vững: ≥10 case', () => {
    expect(getStrengthLevel({ totalCompleted: 10 } as RoleProgress)).toBe('vững')
    expect(getStrengthLevel({ totalCompleted: 25 } as RoleProgress)).toBe('vững')
  })

  it('recordCompletion tăng totalCompleted', async () => {
    const existing: RoleProgress = {
      role: 'MG',
      totalCompleted: 4,
      lastPracticedAt: '2026-06-17T00:00:00Z',
      choiceLog: [],
    }
    vi.mocked(db.arenaProgress.get).mockResolvedValue(existing)
    vi.mocked(db.arenaProgress.put).mockResolvedValue(undefined)

    await recordCompletion('MG', 'case-001', 'B')

    const putCall = vi.mocked(db.arenaProgress.put).mock.calls[0]![0] as RoleProgress
    expect(putCall.totalCompleted).toBe(5)
    expect(putCall.choiceLog).toHaveLength(1)
    expect(putCall.choiceLog[0]!.choiceId).toBe('B')
  })

  it('recordCompletion không crash khi Dexie lỗi (fail silently)', async () => {
    vi.mocked(db.arenaProgress.get).mockRejectedValue(new Error('Dexie error'))
    await expect(recordCompletion('MG', 'case-002', 'A')).resolves.toBeUndefined()
  })

  it('choiceLog giữ tối đa 50 entry', async () => {
    const existing: RoleProgress = {
      role: 'KH',
      totalCompleted: 50,
      lastPracticedAt: '2026-06-17T00:00:00Z',
      choiceLog: Array.from({ length: 50 }, (_, i) => ({
        caseId: `case-${i}`,
        choiceId: 'A',
        completedAt: '2026-06-17T00:00:00Z',
      })),
    }
    vi.mocked(db.arenaProgress.get).mockResolvedValue(existing)
    vi.mocked(db.arenaProgress.put).mockResolvedValue(undefined)

    await recordCompletion('KH', 'case-new', 'C')

    const putCall = vi.mocked(db.arenaProgress.put).mock.calls[0]![0] as RoleProgress
    expect(putCall.choiceLog).toHaveLength(50)
    expect(putCall.choiceLog[49]!.caseId).toBe('case-new')
  })

  it('RoleProgress không có streak hay score field', () => {
    const rp: RoleProgress = {
      role: 'DT',
      totalCompleted: 3,
      lastPracticedAt: '2026-06-17T00:00:00Z',
      choiceLog: [],
    }
    expect((rp as Record<string, unknown>).streak).toBeUndefined()
    expect((rp as Record<string, unknown>).score).toBeUndefined()
    expect((rp as Record<string, unknown>).points).toBeUndefined()
  })
})
