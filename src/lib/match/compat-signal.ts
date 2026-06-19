/**
 * MA M1 — Compatibility Signal Engine (pure logic, không score %).
 * Sinh tín hiệu cấu trúc: axes, blockKeys, pairKey, elementRelation.
 * Wired M4-core via build-match-compat-inject.ts.
 */

export type MBTIType = string

export type Element = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'

export interface PartnerSpec {
  EI?: 'E' | 'I'
  NS?: 'N' | 'S'
  TF?: 'T' | 'F'
  JP?: 'J' | 'P'
}

export interface CompatInput {
  userType: MBTIType
  partner: MBTIType | PartnerSpec
  userElement?: Element
  partnerElement?: Element
}

export type AxisState = 'same' | 'diff' | 'unknown'

export type BlockKey =
  | 'B1_NN'
  | 'B2_SS'
  | 'B3_NxS'
  | 'B4_TxF'
  | 'B5_TT'
  | 'B6_FF'
  | 'B7_JxP'
  | 'B8_JJ'
  | 'B9_PP'
  | 'B10_ExI'
  | 'B11_II'
  | 'B12_EE'

export type ElementRelation =
  | 'userSinhPartner'
  | 'partnerSinhUser'
  | 'userKhacPartner'
  | 'partnerKhacUser'
  | 'same'
  | 'unknown'

export interface CompatSignal {
  pairKey: string | null
  coverage: 'full' | 'partial'
  axes: { EI: AxisState; NS: AxisState; TF: AxisState; JP: AxisState }
  blockKeys: BlockKey[]
  elementRelation: ElementRelation
  elementNote: string
}

interface ParsedAxes {
  EI?: 'E' | 'I'
  NS?: 'N' | 'S'
  TF?: 'T' | 'F'
  JP?: 'J' | 'P'
}

const EI_VALUES = new Set(['E', 'I'])
const NS_VALUES = new Set(['N', 'S'])
const TF_VALUES = new Set(['T', 'F'])
const JP_VALUES = new Set(['J', 'P'])

/** Chu trình ngũ hành — dùng đúng thứ tự spec M1. */
const SINH: Record<Element, Element> = {
  Thủy: 'Mộc',
  Mộc: 'Hỏa',
  Hỏa: 'Thổ',
  Thổ: 'Kim',
  Kim: 'Thủy',
}

const KHAC: Record<Element, Element> = {
  Mộc: 'Thổ',
  Thổ: 'Thủy',
  Thủy: 'Hỏa',
  Hỏa: 'Kim',
  Kim: 'Mộc',
}

/**
 * 12 BlockKey — ý nghĩa 1 dòng (M2 viết content theo key):
 * B1_NN   — Cả hai trực giác (N): cùng nhìn xa, thích ý tưởng.
 * B2_SS   — Cả hai thực tế (S): cùng bám chi tiết, trải nghiệm cụ thể.
 * B3_NxS  — N gặp S: một người tổng quan, một người chi tiết — cần dịch ngôn ngữ.
 * B4_TxF  — T gặp F: logic đối cảm xúc — dễ hiểu nhầm động cơ.
 * B5_TT   — Cả hai T: cùng ưu tiên lý, hiệu quả, phân tích.
 * B6_FF   — Cả hai F: cùng ưu tiên hòa khí, giá trị, cảm xúc người.
 * B7_JxP  — J gặp P: kế hoạch đối linh hoạt — khác nhịp cam kết.
 * B8_JJ   — Cả hai J: cùng thích rõ ràng, kết cấu, quyết định sớm.
 * B9_PP   — Cả hai P: cùng thích mở, giữ option, thích ứng dần.
 * B10_ExI — E gặp I: nạp năng lượng khác nhau — khác nhu cầu tương tác.
 * B11_II  — Cả hai I: cùng cần không gian, suy ngẫm trước khi nói.
 * B12_EE  — Cả hai E: cùng nạp qua giao tiếp, năng lượng bên ngoài.
 */

function isValidMBTIType(type: string): type is MBTIType {
  if (type.length !== 4) return false
  return (
    EI_VALUES.has(type[0]!) &&
    NS_VALUES.has(type[1]!) &&
    TF_VALUES.has(type[2]!) &&
    JP_VALUES.has(type[3]!)
  )
}

function parseFullType(type: MBTIType): ParsedAxes {
  return {
    EI: type[0] as 'E' | 'I',
    NS: type[1] as 'N' | 'S',
    TF: type[2] as 'T' | 'F',
    JP: type[3] as 'J' | 'P',
  }
}

function normalizePartner(partner: MBTIType | PartnerSpec): ParsedAxes {
  if (typeof partner === 'string') {
    if (isValidMBTIType(partner)) return parseFullType(partner)
    return {}
  }
  return {
    EI: partner.EI,
    NS: partner.NS,
    TF: partner.TF,
    JP: partner.JP,
  }
}

function partnerFullType(axes: ParsedAxes): string | null {
  const { EI, NS, TF, JP } = axes
  if (!EI || !NS || !TF || !JP) return null
  return `${EI}${NS}${TF}${JP}`
}

function compareAxis(
  userVal: string | undefined,
  partnerVal: string | undefined,
): AxisState {
  if (!partnerVal) return 'unknown'
  if (!userVal) return 'unknown'
  return userVal === partnerVal ? 'same' : 'diff'
}

function blockForNS(state: AxisState, user: 'N' | 'S'): BlockKey | null {
  if (state === 'unknown') return null
  if (state === 'diff') return 'B3_NxS'
  return user === 'N' ? 'B1_NN' : 'B2_SS'
}

function blockForTF(state: AxisState, user: 'T' | 'F'): BlockKey | null {
  if (state === 'unknown') return null
  if (state === 'diff') return 'B4_TxF'
  return user === 'T' ? 'B5_TT' : 'B6_FF'
}

function blockForJP(state: AxisState, user: 'J' | 'P'): BlockKey | null {
  if (state === 'unknown') return null
  if (state === 'diff') return 'B7_JxP'
  return user === 'J' ? 'B8_JJ' : 'B9_PP'
}

function blockForEI(state: AxisState, user: 'E' | 'I'): BlockKey | null {
  if (state === 'unknown') return null
  if (state === 'diff') return 'B10_ExI'
  return user === 'I' ? 'B11_II' : 'B12_EE'
}

function resolveElement(
  userElement?: Element,
  partnerElement?: Element,
): { relation: ElementRelation; note: string } {
  if (!userElement || !partnerElement) {
    return { relation: 'unknown', note: '' }
  }
  if (userElement === partnerElement) {
    return { relation: 'same', note: 'đồng hành (cùng hành)' }
  }
  if (SINH[userElement] === partnerElement) {
    return { relation: 'userSinhPartner', note: 'bạn nâng đỡ năng lượng người kia' }
  }
  if (SINH[partnerElement] === userElement) {
    return { relation: 'partnerSinhUser', note: 'người kia nâng đỡ năng lượng bạn' }
  }
  if (KHAC[userElement] === partnerElement) {
    return { relation: 'userKhacPartner', note: 'dễ va về giá trị/cách làm' }
  }
  if (KHAC[partnerElement] === userElement) {
    return { relation: 'partnerKhacUser', note: 'dễ va về giá trị/cách làm' }
  }
  return { relation: 'unknown', note: '' }
}

export function getCompatSignal(input: CompatInput): CompatSignal {
  const userType = input.userType.trim().toUpperCase()
  if (!isValidMBTIType(userType)) {
    throw new Error('invalid userType')
  }

  const user = parseFullType(userType)
  const partnerAxes =
    typeof input.partner === 'string'
      ? normalizePartner(input.partner.trim().toUpperCase())
      : normalizePartner(input.partner)

  const axes = {
    EI: compareAxis(user.EI, partnerAxes.EI),
    NS: compareAxis(user.NS, partnerAxes.NS),
    TF: compareAxis(user.TF, partnerAxes.TF),
    JP: compareAxis(user.JP, partnerAxes.JP),
  }

  const blockKeys: BlockKey[] = []
  if (partnerAxes.NS && user.NS) {
    const b = blockForNS(axes.NS, user.NS)
    if (b) blockKeys.push(b)
  }
  if (partnerAxes.TF && user.TF) {
    const b = blockForTF(axes.TF, user.TF)
    if (b) blockKeys.push(b)
  }
  if (partnerAxes.JP && user.JP) {
    const b = blockForJP(axes.JP, user.JP)
    if (b) blockKeys.push(b)
  }
  if (partnerAxes.EI && user.EI) {
    const b = blockForEI(axes.EI, user.EI)
    if (b) blockKeys.push(b)
  }

  const partnerType = partnerFullType(partnerAxes)
  const coverage = partnerType ? 'full' : 'partial'
  const pairKey =
    coverage === 'full' ? [userType, partnerType!].sort().join('+') : null

  const { relation, note } = resolveElement(input.userElement, input.partnerElement)

  return {
    pairKey,
    coverage,
    axes,
    blockKeys,
    elementRelation: relation,
    elementNote: note,
  }
}
