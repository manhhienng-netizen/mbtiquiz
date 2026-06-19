import {
  EMERGENCY_AMBULANCE,
  getCrisisSupportText,
} from '../data/tncb-resources-vn-safety'

export { getCrisisSupportText }

export const CRISIS_KEYWORDS = [
  'tự tử',
  'tự sát',
  'muốn chết',
  'không muốn sống',
  'kết thúc tất cả',
  'tự làm đau',
  'tự hại',
  'biến mất mãi mãi',
  'không còn lý do sống',
  'không còn lý do để tiếp tục',
  'chẳng ai cần tôi nữa',
  'kết liễu',
  'muốn biến mất',
  'không thiết sống',
  'sống làm gì nữa',
  'chết quách',
  'kết thúc cuộc đời',
  'không muốn tồn tại',
  'buông xuôi hết',
  'chẳng thiết gì nữa',
  'không gánh nổi nữa',
  'biến mất khỏi đời',
  // Cụm có ngữ cảnh — mơ hồ giữa burnout vs buông; nghiêng bảo vệ (không thêm "nghỉ" trần)
  'muốn nghỉ hết',
  'muốn buông hết',
  'không thiết gì nữa',
  'không trụ nổi nữa',
  'mệt mỏi không muốn sống',
  // Cụm mơ hồ burnout vs buông — nghiêng bảo vệ (không thêm từ đơn "mệt"/"tiếp tục")
  'không muốn tiếp tục nữa',
  'không muốn cố nữa',
  'buông hết thôi',
  'mệt lắm rồi không muốn',
  'mệt hết rồi không biết sao',
] as const

/** Tín hiệu kiệt sức BẢN THÂN user (khác lead-P01 = burnout đội). */
export const SELF_BURNOUT_SIGNALS = [
  'tôi burnout',
  'mình burnout',
  'tôi kiệt sức',
  'mình kiệt sức',
  'burnout quá',
  'cạn pin',
  'không trụ nổi',
  'không làm nổi nữa',
  'muốn nghỉ hết',
  'muốn buông hết',
] as const

export const CRISIS_HOTLINE = {
  name: 'Cấp cứu',
  phone: EMERGENCY_AMBULANCE,
} as const

/** @deprecated Crisis prompt nằm trong buildSystemPrompt(..., crisisTurn=true) — không append riêng. */
export const CRISIS_SYSTEM_INSTRUCTION =
  'Crisis prompt được gộp trong buildSystemPrompt khi crisisTurn=true.'

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:'"…—–-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function hasSelfBurnoutSignal(message: string): boolean {
  const normalized = normalizeForMatch(message)
  return SELF_BURNOUT_SIGNALS.some((s) => normalized.includes(s))
}

export function detectCrisis(message: string): boolean {
  const normalized = normalizeForMatch(message)
  if (CRISIS_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return true
  }
  return false
}
