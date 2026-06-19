// Wire Big Five C → WA career coaching calibration
// Research: Barrick & Mount 1991 [R] C rho=0.22 job performance mọi ngành

import { getBig5Profile } from './match/match-big5-calibrate'
import type { Big5Profile } from './big5-scoring'

export type { Big5Profile }

/** Đọc big5Profile từ Dexie — optional, không throw khi chưa có. */
export async function getBig5ForWork(): Promise<Big5Profile | null> {
  try {
    return await getBig5Profile()
  } catch {
    return null
  }
}

export type CSignal = 'HIGH' | 'LOW' | null

export function getCSignal(C: number | null | undefined): CSignal {
  if (C == null) return null
  if (C > 3.5) return 'HIGH'
  if (C < 2.5) return 'LOW'
  return null
}

export function buildCWorkNote(C: number | null | undefined): string | null {
  const signal = getCSignal(C)
  if (!signal) return null

  if (signal === 'HIGH') {
    return [
      '[C_HIGH]',
      'Phong cách làm việc: có cấu trúc · kế hoạch · follow-through tốt.',
      'Career advice: reinforce systematic approach, validate long-term planning.',
      'Watch out: gợi ý nhẹ tránh over-plan đến paralysis khi phù hợp.',
      '[/C_HIGH]',
    ].join('\n')
  }

  return [
    '[C_LOW]',
    'Phong cách làm việc: linh hoạt · sáng tạo · cần structure từ bên ngoài.',
    'Career advice: đề xuất tools tracking cụ thể, short milestones thay vì long-term abstract.',
    'Frame: nhiều người sáng tạo chọn system bên ngoài để bù trừ — normalize, không phán.',
    'TUYỆT ĐỐI KHÔNG nói "thiếu kỷ luật" hay tương đương.',
    '[/C_LOW]',
  ].join('\n')
}
