import { getBig5Profile as getBig5ProfileFromDb } from '../../db/tncb-db'
import type { Big5Profile } from '../big5-scoring'
import { getBig5Level } from '../big5-scoring'

export type { Big5Profile }

/** Đọc big5Profile từ Dexie — optional, không throw khi chưa có. */
export async function getBig5Profile(): Promise<Big5Profile | null> {
  return getBig5ProfileFromDb()
}

/**
 * Calibration note ngắn cho MA — chỉ N + A.
 * Không label absolute; không đủ signal → chuỗi rỗng.
 */
export function buildBig5MatchNote(profile: Big5Profile): string {
  const nBand = getBig5Level(profile.N)
  const aBand = getBig5Level(profile.A)

  if (nBand === 'high' && aBand === 'high') {
    return 'Cần reassurance từ partner, dễ worry — giúp user thấy an toàn trước.'
  }

  if (nBand === 'high' && aBand === 'low') {
    return 'Dễ conflict, cần structure trong giao tiếp.'
  }

  const notes: string[] = []

  if (nBand === 'high') {
    notes.push(
      'User có xu hướng nhạy cảm cảm xúc — validate cảm xúc trước khi đưa insight.',
    )
  } else if (nBand === 'low') {
    notes.push(
      'User ổn định cảm xúc — có thể đi thẳng vào practical insight.',
    )
  }

  if (aBand === 'high') {
    notes.push(
      'User care nhiều về harmony — framing nhẹ, tránh trực tiếp quá.',
    )
  } else if (aBand === 'low') {
    notes.push(
      'User thẳng thắn — có thể nói thẳng về conflict patterns.',
    )
  }

  return notes.join(' ')
}
