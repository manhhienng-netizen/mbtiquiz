// boss-type-estimator.ts — Hiểu Sếp type estimator
// Content: spec-boss-type-estimator-12062026-1930.md §2–§3

import type { MbtiType } from './manager-coaching-b2b'

export type EstimatorSignal = 'B' | 'C' | 'D' | 'E'
export type Confidence = 'cao' | 'vừa' | 'thấp'
export type DimensionKey = 'EI' | 'NS' | 'TF' | 'JP'

export interface DimensionScore {
  E: number
  I: number
  N: number
  S: number
  T: number
  F: number
  J: number
  P: number
}

export interface EstimatorOption {
  id: string
  label: string
  delta: Partial<DimensionScore>
}

export interface EstimatorQuestion {
  id: string
  signal: EstimatorSignal
  text: string
  options: EstimatorOption[]
}

export interface ResolveTypeResult {
  primaryType: MbtiType
  topTypes: MbtiType[]
  confidence: Confidence
  totalGap: number
}

export const ESTIMATOR_QUESTIONS: EstimatorQuestion[] = [
  {
    id: 'q1',
    signal: 'B',
    text: 'Sếp bạn đang ở vị trí nào?',
    options: [
      {
        id: 'q1a',
        label: 'Giám đốc / CEO / Founder',
        delta: { T: 2, J: 1 },
      },
      {
        id: 'q1b',
        label: 'Sales / Kinh doanh / BD',
        delta: { E: 2, T: 1 },
      },
      {
        id: 'q1c',
        label: 'Vận hành / Sản xuất / Logistics',
        delta: { S: 2, J: 2 },
      },
      {
        id: 'q1d',
        label: 'Marketing / Sáng tạo / Nội dung',
        delta: { N: 2, P: 1 },
      },
      {
        id: 'q1e',
        label: 'Nhân sự / People / Đào tạo',
        delta: { F: 2, J: 1 },
      },
      {
        id: 'q1f',
        label: 'Kỹ thuật / Engineering / Data',
        delta: { T: 2, I: 1 },
      },
    ],
  },
  {
    id: 'q2',
    signal: 'C',
    text: 'Sếp bạn thường giao tiếp (email/Zalo/họp) theo kiểu nào?',
    options: [
      {
        id: 'q2a',
        label: 'Cộc lốc, đi thẳng vấn đề, ít giải thích',
        delta: { T: 2, J: 1, E: 1 },
      },
      {
        id: 'q2b',
        label: 'Đầy đủ, có context, chính xác từng chi tiết',
        delta: { S: 1, J: 1, T: 1 },
      },
      {
        id: 'q2c',
        label: 'Nhiều ý tưởng, hay lan man sang chủ đề khác',
        delta: { N: 2, P: 2 },
      },
      {
        id: 'q2d',
        label: 'Ấm áp, hay hỏi thăm, quan tâm người',
        delta: { F: 2, E: 1 },
      },
    ],
  },
  {
    id: 'q3',
    signal: 'D',
    text: 'Khi cần quyết định, sếp bạn thường?',
    options: [
      {
        id: 'q3a',
        label: 'Quyết nhanh và dứt khoát, ít do dự',
        delta: { T: 2, J: 2 },
      },
      {
        id: 'q3b',
        label: 'Suy nghĩ lâu, ít giải thích lý do, rồi mới chốt',
        delta: { N: 2, I: 2, J: 1 },
      },
      {
        id: 'q3c',
        label: 'Hỏi ý kiến cả team trước khi quyết',
        delta: { F: 2, E: 1 },
      },
      {
        id: 'q3d',
        label: 'Hay đổi hướng khi có thông tin/ý tưởng mới',
        delta: { N: 2, P: 2 },
      },
    ],
  },
  {
    id: 'q4',
    signal: 'D',
    text: 'Sếp bạn quan tâm nhất đến điều gì?',
    options: [
      {
        id: 'q4a',
        label: 'Kết quả và số liệu cụ thể',
        delta: { T: 2, J: 1 },
      },
      {
        id: 'q4b',
        label: 'Quy trình đúng và chi tiết không sai',
        delta: { S: 2, J: 2 },
      },
      {
        id: 'q4c',
        label: 'Tầm nhìn và hướng đi dài hạn',
        delta: { N: 2 },
      },
      {
        id: 'q4d',
        label: 'Con người và không khí trong đội',
        delta: { F: 2, E: 1 },
      },
    ],
  },
  {
    id: 'q5',
    signal: 'E',
    text: 'Khi sếp bạn căng thẳng/áp lực, họ thường?',
    options: [
      {
        id: 'q5a',
        label: 'Siết kiểm soát chặt hơn, soi chi tiết',
        delta: { J: 2, T: 1 },
      },
      {
        id: 'q5b',
        label: 'Im lặng, rút lui, khó tiếp cận',
        delta: { I: 2, N: 1 },
      },
      {
        id: 'q5c',
        label: 'Nói nhiều hơn, bốc đồng, năng lượng cao',
        delta: { E: 2, P: 1 },
      },
      {
        id: 'q5d',
        label: 'Lo cho team quá mức, ôm việc của người khác',
        delta: { F: 2, E: 1 },
      },
    ],
  },
]

export function emptyDimensionScore(): DimensionScore {
  return { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }
}

export function applyAnswer(
  score: DimensionScore,
  delta: Partial<DimensionScore>,
): DimensionScore {
  const next = { ...score }
  for (const key of Object.keys(delta) as Array<keyof DimensionScore>) {
    next[key] += delta[key] ?? 0
  }
  return next
}

export function flipDimension(type: string, dim: DimensionKey): string {
  const map: Record<DimensionKey, [number, string, string]> = {
    EI: [0, 'E', 'I'],
    NS: [1, 'N', 'S'],
    TF: [2, 'T', 'F'],
    JP: [3, 'J', 'P'],
  }
  const [pos, a, b] = map[dim]
  const chars = type.split('')
  chars[pos] = chars[pos] === a ? b : a
  return chars.join('')
}

export function resolveType(score: DimensionScore): ResolveTypeResult {
  const e = score.E >= score.I ? 'E' : 'I'
  const n = score.N >= score.S ? 'N' : 'S'
  const t = score.T >= score.F ? 'T' : 'F'
  const j = score.J >= score.P ? 'J' : 'P'

  const primaryType = `${e}${n}${t}${j}` as MbtiType

  const gaps = {
    EI: Math.abs(score.E - score.I),
    NS: Math.abs(score.N - score.S),
    TF: Math.abs(score.T - score.F),
    JP: Math.abs(score.J - score.P),
  }

  const topTypes: MbtiType[] = [primaryType]
  const minGap = Math.min(gaps.EI, gaps.NS, gaps.TF, gaps.JP)

  if (minGap <= 1) {
    if (gaps.TF <= 1) topTypes.push(flipDimension(primaryType, 'TF') as MbtiType)
    else if (gaps.JP <= 1) topTypes.push(flipDimension(primaryType, 'JP') as MbtiType)
    else if (gaps.EI <= 1) topTypes.push(flipDimension(primaryType, 'EI') as MbtiType)
    else if (gaps.NS <= 1) topTypes.push(flipDimension(primaryType, 'NS') as MbtiType)
  }

  const totalGap = gaps.EI + gaps.NS + gaps.TF + gaps.JP
  const confidence: Confidence =
    totalGap >= 8 ? 'cao' : totalGap >= 4 ? 'vừa' : 'thấp'

  return {
    primaryType,
    topTypes: topTypes.slice(0, 3),
    confidence,
    totalGap,
  }
}
