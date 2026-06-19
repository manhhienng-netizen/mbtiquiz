/**
 * TNCB P2P — "3 điểm chung" helper
 * Tính điểm tương đồng giữa 2 persona dựa trên MBTI + Big Five
 * KHÔNG dùng % score — chỉ câu mô tả hành vi
 */

import { big5ScoreToPercent } from './chip-calibration'

export interface CommonPoint {
  text: string
  basis: 'mbti' | 'big5'
}

type Big5Partial = {
  N?: number
  E?: number
  O?: number
  A?: number
  C?: number
}

function big5Percent(profile: Big5Partial, dim: keyof Big5Partial): number | undefined {
  const raw = profile[dim]
  if (raw === undefined) return undefined
  return big5ScoreToPercent(raw)
}

export function getCommonPoints(
  typeA: string,
  typeB: string,
  big5A?: Big5Partial | null,
  big5B?: Big5Partial | null,
): CommonPoint[] {
  if (!/^[IE][NS][FT][JP]$/.test(typeA) || !/^[IE][NS][FT][JP]$/.test(typeB)) {
    return []
  }

  const points: CommonPoint[] = []

  const iA = typeA[0]
  const iB = typeB[0]
  const sA = typeA[1]
  const sB = typeB[1]
  const tA = typeA[2]
  const tB = typeB[2]
  const jA = typeA[3]
  const jB = typeB[3]

  if (iA === iB) {
    points.push({
      text:
        iA === 'I'
          ? 'Cả 2 thường suy nghĩ kỹ trước khi nói'
          : 'Cả 2 thoải mái khi gặp gỡ và trò chuyện với nhiều người',
      basis: 'mbti',
    })
  }

  if (sA === sB) {
    points.push({
      text:
        sA === 'S'
          ? 'Cả 2 để ý đến chi tiết cụ thể hơn là lý thuyết trừu tượng'
          : 'Cả 2 thích nhìn bức tranh lớn và khám phá ý tưởng mới',
      basis: 'mbti',
    })
  }

  if (tA === tB) {
    points.push({
      text:
        tA === 'T'
          ? 'Cả 2 thường phân tích logic trước khi quyết định'
          : 'Cả 2 để ý đến cảm xúc của người xung quanh khi đưa ra quyết định',
      basis: 'mbti',
    })
  }

  if (jA === jB) {
    points.push({
      text:
        jA === 'J'
          ? 'Cả 2 thích có kế hoạch rõ ràng hơn là để mọi thứ tự nhiên'
          : 'Cả 2 thoải mái với sự thay đổi và linh hoạt theo tình huống',
      basis: 'mbti',
    })
  }

  if (big5A && big5B) {
    const nA = big5Percent(big5A, 'N')
    const nB = big5Percent(big5B, 'N')
    if (nA !== undefined && nB !== undefined) {
      if (nA > 60 && nB > 60) {
        points.push({
          text: 'Cả 2 có xu hướng cảm nhận sâu và cần thời gian để xử lý cảm xúc',
          basis: 'big5',
        })
      } else if (nA < 40 && nB < 40) {
        points.push({
          text: 'Cả 2 thường giữ được bình tĩnh trong tình huống căng thẳng',
          basis: 'big5',
        })
      }
    }

    const aA = big5Percent(big5A, 'A')
    const aB = big5Percent(big5B, 'A')
    if (aA !== undefined && aB !== undefined && aA > 60 && aB > 60) {
      points.push({
        text: 'Cả 2 dễ đồng cảm và ưu tiên hòa khí trong mối quan hệ',
        basis: 'big5',
      })
    }

    const cA = big5Percent(big5A, 'C')
    const cB = big5Percent(big5B, 'C')
    if (cA !== undefined && cB !== undefined && cA > 60 && cB > 60) {
      points.push({
        text: 'Cả 2 cẩn thận và có trách nhiệm với những cam kết của mình',
        basis: 'big5',
      })
    }
  }

  return points.slice(0, 3)
}
