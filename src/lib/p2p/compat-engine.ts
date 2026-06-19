// ============================================================
// TNCB Compatibility Engine — P2P Match
// Algorithm: MBTI 40% + ngũ hành 30% + số học 15% + bát tự 15%
// ============================================================

export interface PersonaPayload {
  mbtiType?: string
  element?: string
  lifePath?: number
  canChi?: string
}

const MBTI_COMPAT: Record<string, Record<string, number>> = {
  INTJ: { INTJ:70, INTP:82, ENTJ:78, ENTP:85, INFJ:80, INFP:72, ENFJ:75, ENFP:68, ISTJ:65, ISFJ:60, ESTJ:62, ESFJ:55, ISTP:68, ISFP:58, ESTP:60, ESFP:52 },
  INTP: { INTJ:82, INTP:70, ENTJ:75, ENTP:88, INFJ:78, INFP:75, ENFJ:70, ENFP:72, ISTJ:62, ISFJ:58, ESTJ:60, ESFJ:52, ISTP:72, ISFP:62, ESTP:62, ESFP:55 },
  ENTJ: { INTJ:78, INTP:75, ENTJ:70, ENTP:80, INFJ:72, INFP:65, ENFJ:75, ENFP:70, ISTJ:68, ISFJ:60, ESTJ:72, ESFJ:58, ISTP:65, ISFP:58, ESTP:68, ESFP:60 },
  ENTP: { INTJ:85, INTP:88, ENTJ:80, ENTP:70, INFJ:82, INFP:75, ENFJ:72, ENFP:78, ISTJ:60, ISFJ:55, ESTJ:62, ESFJ:52, ISTP:70, ISFP:62, ESTP:65, ESFP:58 },
  INFJ: { INTJ:80, INTP:78, ENTJ:72, ENTP:82, INFJ:70, INFP:85, ENFJ:78, ENFP:88, ISTJ:60, ISFJ:65, ESTJ:55, ESFJ:62, ISTP:62, ISFP:70, ESTP:55, ESFP:65 },
  INFP: { INTJ:72, INTP:75, ENTJ:65, ENTP:75, INFJ:85, INFP:70, ENFJ:82, ENFP:90, ISTJ:55, ISFJ:65, ESTJ:50, ESFJ:60, ISTP:60, ISFP:72, ESTP:52, ESFP:68 },
  ENFJ: { INTJ:75, INTP:70, ENTJ:75, ENTP:72, INFJ:78, INFP:82, ENFJ:70, ENFP:85, ISTJ:62, ISFJ:70, ESTJ:65, ESFJ:72, ISTP:58, ISFP:68, ESTP:60, ESFP:70 },
  ENFP: { INTJ:68, INTP:72, ENTJ:70, ENTP:78, INFJ:88, INFP:90, ENFJ:85, ENFP:70, ISTJ:52, ISFJ:62, ESTJ:50, ESFJ:65, ISTP:58, ISFP:75, ESTP:55, ESFP:72 },
  ISTJ: { INTJ:65, INTP:62, ENTJ:68, ENTP:60, INFJ:60, INFP:55, ENFJ:62, ENFP:52, ISTJ:70, ISFJ:78, ESTJ:80, ESFJ:75, ISTP:68, ISFP:62, ESTP:70, ESFP:65 },
  ISFJ: { INTJ:60, INTP:58, ENTJ:60, ENTP:55, INFJ:65, INFP:65, ENFJ:70, ENFP:62, ISTJ:78, ISFJ:70, ESTJ:75, ESFJ:82, ISTP:62, ISFP:70, ESTP:62, ESFP:68 },
  ESTJ: { INTJ:62, INTP:60, ENTJ:72, ENTP:62, INFJ:55, INFP:50, ENFJ:65, ENFP:50, ISTJ:80, ISFJ:75, ESTJ:70, ESFJ:78, ISTP:65, ISFP:58, ESTP:72, ESFP:62 },
  ESFJ: { INTJ:55, INTP:52, ENTJ:58, ENTP:52, INFJ:62, INFP:60, ENFJ:72, ENFP:65, ISTJ:75, ISFJ:82, ESTJ:78, ESFJ:70, ISTP:58, ISFP:68, ESTP:65, ESFP:72 },
  ISTP: { INTJ:68, INTP:72, ENTJ:65, ENTP:70, INFJ:62, INFP:60, ENFJ:58, ENFP:58, ISTJ:68, ISFJ:62, ESTJ:65, ESFJ:58, ISTP:70, ISFP:78, ESTP:82, ESFP:75 },
  ISFP: { INTJ:58, INTP:62, ENTJ:58, ENTP:62, INFJ:70, INFP:72, ENFJ:68, ENFP:75, ISTJ:62, ISFJ:70, ESTJ:58, ESFJ:68, ISTP:78, ISFP:70, ESTP:75, ESFP:82 },
  ESTP: { INTJ:60, INTP:62, ENTJ:68, ENTP:65, INFJ:55, INFP:52, ENFJ:60, ENFP:55, ISTJ:70, ISFJ:62, ESTJ:72, ESFJ:65, ISTP:82, ISFP:75, ESTP:70, ESFP:80 },
  ESFP: { INTJ:52, INTP:55, ENTJ:60, ENTP:58, INFJ:65, INFP:68, ENFJ:70, ENFP:72, ISTJ:65, ISFJ:68, ESTJ:62, ESFJ:72, ISTP:75, ISFP:82, ESTP:80, ESFP:70 },
}

function mbtiScore(a?: string, b?: string): number {
  if (!a || !b) return 50
  return MBTI_COMPAT[a]?.[b] ?? 50
}

const ELEMENT_COMPAT: Record<string, Record<string, number>> = {
  Mộc:  { Mộc:70, Hỏa:85, Thổ:55, Kim:35, Thủy:85 },
  Hỏa:  { Mộc:85, Hỏa:70, Thổ:85, Kim:55, Thủy:35 },
  Thổ:  { Mộc:55, Hỏa:85, Thổ:70, Kim:85, Thủy:55 },
  Kim:  { Mộc:35, Hỏa:55, Thổ:85, Kim:70, Thủy:85 },
  Thủy: { Mộc:85, Hỏa:35, Thổ:55, Kim:85, Thủy:70 },
}

function elementScore(a?: string, b?: string): number {
  if (!a || !b) return 50
  return ELEMENT_COMPAT[a]?.[b] ?? 50
}

const NUMEROLOGY_COMPAT: Record<number, Record<number, number>> = {
  1: { 1:65, 2:75, 3:80, 4:60, 5:82, 6:70, 7:78, 8:72, 9:68 },
  2: { 1:75, 2:65, 3:72, 4:80, 5:68, 6:85, 7:70, 8:62, 9:78 },
  3: { 1:80, 2:72, 3:65, 4:55, 5:85, 6:75, 7:70, 8:68, 9:80 },
  4: { 1:60, 2:80, 3:55, 4:65, 5:58, 6:78, 7:72, 8:85, 9:60 },
  5: { 1:82, 2:68, 3:85, 4:58, 5:65, 6:62, 7:75, 8:70, 9:78 },
  6: { 1:70, 2:85, 3:75, 4:78, 5:62, 6:65, 7:68, 8:72, 9:82 },
  7: { 1:78, 2:70, 3:70, 4:72, 5:75, 6:68, 7:65, 8:60, 9:85 },
  8: { 1:72, 2:62, 3:68, 4:85, 5:70, 6:72, 7:60, 8:65, 9:62 },
  9: { 1:68, 2:78, 3:80, 4:60, 5:78, 6:82, 7:85, 8:62, 9:65 },
}

function reduceLifePath(n?: number): number | undefined {
  if (!n) return undefined
  const masterMap: Record<number, number> = { 11: 2, 22: 4, 33: 6 }
  if (masterMap[n] !== undefined) return masterMap[n]
  if (n >= 1 && n <= 9) return n
  return undefined
}

function numerologyScore(a?: number, b?: number): number {
  const ra = reduceLifePath(a)
  const rb = reduceLifePath(b)
  if (!ra || !rb) return 50
  return NUMEROLOGY_COMPAT[ra]?.[rb] ?? 50
}

const CAN_ELEMENT: Record<string, string> = {
  Giáp: 'Mộc', Ất: 'Mộc',
  Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ',
  Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy',
}

function canChiScore(a?: string, b?: string): number {
  if (!a || !b) return 50
  const canA = a.split(' ')[0]
  const canB = b.split(' ')[0]
  const elemA = canA ? CAN_ELEMENT[canA] : undefined
  const elemB = canB ? CAN_ELEMENT[canB] : undefined
  return elementScore(elemA, elemB)
}

export interface CompatResult {
  total: number
  mbti: number
  element: number
  numerology: number
  battu: number
}

export function calculateCompat(a: PersonaPayload, b: PersonaPayload): CompatResult {
  const mbti = mbtiScore(a.mbtiType, b.mbtiType)
  const element = elementScore(a.element, b.element)
  const numerology = numerologyScore(a.lifePath, b.lifePath)
  const battu = canChiScore(a.canChi, b.canChi)

  const total = Math.round(
    mbti * 0.4 +
    element * 0.3 +
    numerology * 0.15 +
    battu * 0.15,
  )

  return { total, mbti, element, numerology, battu }
}
