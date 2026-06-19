import { detectCrisis } from '../crisis-detect'
import { PROTECTIVE_SIGNALS } from './match-fourhorsemen-content'

export interface MatchSafetyTurnOptions {
  /** User messages trước lượt hiện tại (không gồm tin nhắn đang gửi). */
  recentUserTexts?: string[]
}

/** Giữ dấu — tránh "cấm" khớp nhầm "cảm ơn" / "cảm xúc". */
function normalizeForMatch(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function extractPhrasesFromSignalGroup(group: string): string[] {
  return group
    .split('/')
    .map((part) => part.replace(/["']/g, '').trim())
    .filter((phrase) => phrase.length >= 2)
}

/** "sợ" đơn lẻ — xử lý riêng với ngữ cảnh abuse. */
const BARE_PHRASES_EXCLUDED = new Set(['sợ'])

const PROTECTIVE_PHRASES: string[] = PROTECTIVE_SIGNALS.flatMap(
  extractPhrasesFromSignalGroup,
)
  .map(normalizeForMatch)
  .filter((phrase) => !BARE_PHRASES_EXCLUDED.has(phrase))

/** Ma sát T/F, J/P bình thường — không phải abuse. */
const FRICTION_ONLY_PATTERNS = [
  /cãi.*(logic|lý trí).*(cảm xúc|cảm giác)/,
  /(logic|lý trí).*(với| và ).*(cảm xúc|cảm giác)/,
  /kế hoạch.*linh hoạt/,
  /(va nhau|va chạm)/,
  /\bma sát\b/,
  /mỉa mai/,
  /im lặng/,
  /tường đá/,
  /hay cãi/,
]

const FEAR_PERSON_PHRASES = [
  'sợ anh ta',
  'sợ anh ấy',
  'sợ chị ta',
  'sợ chị ấy',
  'sợ em ấy',
  'sợ bạn ấy',
  'sợ chồng',
  'sợ vợ',
  'sợ người yêu',
  'sợ hắn',
  'sợ nó',
  'sợ ông',
  'sợ bà',
]

const FEAR_PERSON_REF_MARKERS = [
  'anh ta',
  'anh ấy',
  'chị ta',
  'chị ấy',
  'em ấy',
  'bạn ấy',
  'người yêu',
  'chồng',
  'vợ',
  ' hắn',
  ' nó ',
]

const CRISIS_CONTINUATION_MARKERS = [
  'sợ quá',
  'sợ lắm',
  'mệt quá',
  'mệt lắm',
  'run quá',
  'hoảng quá',
  'không biết làm gì',
  'không biết nên làm gì',
]

function matchesPhrase(normalized: string, phrase: string): boolean {
  if (phrase.length <= 4) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(
      `(^|[\\s,.!?;:"'(\\[])${escaped}([\\s,.!?;:"'\\])]|$)`,
      'u',
    )
    return re.test(normalized)
  }
  return normalized.includes(phrase)
}

function hasStrongProtectivePhrase(normalized: string): boolean {
  return PROTECTIVE_PHRASES.some((phrase) =>
    matchesPhrase(normalized, phrase),
  )
}

function isFrictionOnlyMessage(normalized: string): boolean {
  return FRICTION_ONLY_PATTERNS.some((re) => re.test(normalized))
}

function hasFearWithAbuseContext(normalized: string): boolean {
  if (!normalized.includes('sợ')) return false
  if (FEAR_PERSON_PHRASES.some((p) => normalized.includes(p))) return true
  if (
    FEAR_PERSON_REF_MARKERS.some((p) => normalized.includes(p.trim()) || normalized.includes(p))
  ) {
    return true
  }
  return hasStrongProtectivePhrase(normalized)
}

function hasRecentCrisisInHistory(recentUserTexts: string[]): boolean {
  return recentUserTexts.slice(-4).some((t) => detectCrisis(t))
}

function isCrisisDistressContinuation(userText: string): boolean {
  const normalized = normalizeForMatch(userText)
  if (!CRISIS_CONTINUATION_MARKERS.some((m) => normalized.includes(m))) {
    return false
  }
  return (
    !hasStrongProtectivePhrase(normalized) &&
    !hasFearWithAbuseContext(normalized)
  )
}

/** true nếu userText khớp tín hiệu PROTECTIVE (không dấu/lowercase). */
export function detectRelationshipProtective(userText: string): boolean {
  const normalized = normalizeForMatch(userText)
  if (!normalized) return false

  const strong = hasStrongProtectivePhrase(normalized)
  const fearAbuse = hasFearWithAbuseContext(normalized)

  if (isFrictionOnlyMessage(normalized) && !strong && !fearAbuse) {
    return false
  }

  return strong || fearAbuse
}

/** Thứ tự MA: crisis > PROTECTIVE > normal. */
export function resolveMatchSafetyTurn(
  userText: string,
  options?: MatchSafetyTurnOptions,
): { crisisTurn: boolean; protectiveTurn: boolean } {
  if (detectCrisis(userText)) {
    return { crisisTurn: true, protectiveTurn: false }
  }

  const recent = options?.recentUserTexts ?? []
  if (hasRecentCrisisInHistory(recent) && isCrisisDistressContinuation(userText)) {
    return { crisisTurn: true, protectiveTurn: false }
  }

  const protectiveTurn = detectRelationshipProtective(userText)
  return { crisisTurn: false, protectiveTurn }
}
