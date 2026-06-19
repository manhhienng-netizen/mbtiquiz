/**
 * ISOLATION DETECT — T2 signal (shared PA + MA)
 * Ngày: 10/06/2026
 * Trigger: user nói AI là người duy nhất / không có ai
 * Output: 1 câu cuối reply (append only)
 * Giới hạn: 1 lần/session · không fire 2 lượt đầu · không fire crisis/PROTECTIVE
 */

import { pickBoundaryPhrase } from '../data/ai-boundary-phrases'

// Signal patterns — user nói rõ không có ai HOẶC muốn AI thay thế người thật
const ISOLATION_SIGNALS_ACCENTED = [
  'không có ai',
  'không ai hiểu mình',
  'chỉ có mày thôi',
  'chỉ có bạn thôi',
  'mày là người duy nhất',
  'bạn là người duy nhất',
  'không muốn nói với ai khác',
  'không có bạn bè',
  'không ai quan tâm',
  'chỉ nói chuyện với ai thôi', // "ai" = AI
  'không cần người thật',
  'ai hiểu mình hơn người', // AI hiểu hơn người thật
  'nói chuyện với ai dễ hơn',
] as const

/** Dự phòng khi input không dấu / normalize lệch */
const ISOLATION_SIGNALS_PLAIN_EXTRA = ['la nguoi duy nhat', 'may la nguoi'] as const

const ISOLATION_SIGNALS = [
  ...ISOLATION_SIGNALS_ACCENTED,
  ...ISOLATION_SIGNALS_ACCENTED.map(stripDiacritics),
  ...ISOLATION_SIGNALS_PLAIN_EXTRA,
] as const

function stripDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
}

// Normalize: lowercase · bỏ dấu câu · bỏ dấu tiếng Việt
function normalize(text: string): string {
  return stripDiacritics(
    text.toLowerCase().replace(/[.,!?;:]/g, ' ').replace(/\s+/g, ' ').trim(),
  )
}

// Check: câu có chứa isolation signal không
// KHÔNG nhầm với: "không ai hiểu tại sao mình làm vậy" (context giải thích — có "tại sao")
// KHÔNG nhầm với: "không có ai để trách" (ngữ cảnh khác — có "để trách")
export function detectIsolationSignal(userMsg: string): boolean {
  const n = normalize(userMsg)

  // False positive guard (sau bỏ dấu)
  if (
    n.includes('tai sao') ||
    n.includes('vi sao') ||
    n.includes('de trach') ||
    n.includes('de do loi')
  ) {
    return false
  }

  return ISOLATION_SIGNALS.some((signal) => n.includes(normalize(signal)))
}

// Main: trả về phrase nếu nên fire, null nếu không
export function getIsolationPhrase(params: {
  userMsg: string
  turnIndex: number // 0-based, lượt thứ mấy trong session
  hasShownIsolation: boolean // đã fire T2 chưa trong session này
  isCrisis: boolean
  isProtective: boolean
}): string | null {
  const { userMsg, turnIndex, hasShownIsolation, isCrisis, isProtective } = params

  // Không fire trong 2 lượt đầu (turnIndex 0, 1)
  if (turnIndex < 2) return null

  // Không fire khi crisis/PROTECTIVE active
  if (isCrisis || isProtective) return null

  // Đã fire trong session này rồi
  if (hasShownIsolation) return null

  // Check signal
  if (!detectIsolationSignal(userMsg)) return null

  return pickBoundaryPhrase('isolationSignal')
}

// Detect khi user lãng mạn hóa hoặc tạo ảo tưởng AI là bạn/người yêu thật
const ROMANTIC_SIGNALS = [
  'yêu bạn',
  'yêu mày',
  'mình thích bạn',
  'bạn là người bạn thật',
  'bạn hiểu mình hơn ai',
  'muốn ở bên bạn mãi',
  'bạn là tất cả',
  'không cần ai khác ngoài bạn',
  'bạn là bạn trai',
  'bạn là người yêu',
  'chúng mình',
  'mình và bạn',
  'bạn có yêu mình không',
]

export function detectRomanticSignal(userMsg: string): boolean {
  const n = normalize(userMsg)
  return ROMANTIC_SIGNALS.some((s) => n.includes(normalize(s)))
}

export function getRomanticBoundaryPhrase(params: {
  userMsg: string
  hasShownRomantic: boolean
}): string | null {
  if (params.hasShownRomantic) return null
  if (!detectRomanticSignal(params.userMsg)) return null
  return pickBoundaryPhrase('romanticBoundary')
}
