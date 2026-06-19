import { detectRelationshipProtective } from './detect-protective'

const MBTI_RE = /\b[EI][NS][TF][JP]\b/gi

const PARTNER_KEYWORDS =
  /người ấy|anh ấy|chị ấy|em ấy|bạn ấy|bạn trai|bạn gái|chồng|vợ|crush|đối phương|người yêu|người kia|ông ấy|bà ấy/i

const COMPAT_KEYWORDS =
  /tương hợp|có hợp|hợp không|hợp nhau|hợp với|hợp với nhau|cặp đôi|\bcặp\b/i

const RELATIONSHIP_WITH_PERSON =
  /quan hệ\s+(với|của)\s+|mối quan hệ\s+(với|và)/i

const SELF_EMOTIONAL_MARKERS = [
  'cô đơn',
  'buồn',
  'stress',
  'mệt',
  'lo lắng',
  'trống rỗng',
  'nặng lòng',
  'cảm thấy',
  'chia sẻ',
  'không biết',
  'nản',
  'tức',
  'chán',
  'sợ',
  'bế tắc',
  'mệt mỏi',
  'khóc',
  'tâm sự',
  'cô độc',
  'lẻ loi',
]

export const CROSS_MENTION_PA_TEXT =
  'Nếu muốn được lắng nghe nhiều hơn về cảm xúc này, /assistant/chat có thể phù hợp hơn.'

function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function isValidMbtiType(type: string): boolean {
  if (type.length !== 4) return false
  const e = type.toUpperCase()
  return (
    (e[0] === 'E' || e[0] === 'I') &&
    (e[1] === 'N' || e[1] === 'S') &&
    (e[2] === 'T' || e[2] === 'F') &&
    (e[3] === 'J' || e[3] === 'P')
  )
}

function extractMbtiTypes(text: string): string[] {
  const found = text.match(MBTI_RE) ?? []
  const unique = new Set<string>()
  for (const raw of found) {
    const t = raw.toUpperCase()
    if (isValidMbtiType(t)) unique.add(t)
  }
  return [...unique]
}

/** Tín hiệu dyad — MA scope, không chuyển PA. */
export function hasDyadSignal(text: string): boolean {
  const normalized = normalize(text)
  if (!normalized) return false

  if (PARTNER_KEYWORDS.test(normalized)) return true
  if (COMPAT_KEYWORDS.test(normalized)) return true
  if (RELATIONSHIP_WITH_PERSON.test(normalized)) return true

  const types = extractMbtiTypes(normalized)
  if (types.length > 0) {
    if (PARTNER_KEYWORDS.test(normalized) || COMPAT_KEYWORDS.test(normalized)) {
      return true
    }
    if (/\b(và|với|cùng)\b/.test(normalized) && types.length >= 1) {
      return true
    }
  }

  return false
}

function hasSelfEmotionalSignal(text: string): boolean {
  const normalized = normalize(text)
  return SELF_EMOTIONAL_MARKERS.some((m) => normalized.includes(m))
}

/**
 * TRUE khi thuần cảm xúc bản thân, không có signal dyad / protective.
 */
export function shouldCrossMentionPA(
  userMsg: string,
  recentContext?: string[],
): boolean {
  const trimmed = userMsg.trim()
  if (!trimmed) return false

  if (detectRelationshipProtective(trimmed)) return false

  const contextTexts = recentContext ?? []
  if ([trimmed, ...contextTexts].some((t) => hasDyadSignal(t))) return false

  return hasSelfEmotionalSignal(trimmed)
}

export function appendCrossMentionIfNeeded(
  reply: string,
  shouldMention: boolean,
  alreadyMentionedThisSession: boolean,
): string {
  const body = reply.trim()
  if (!body || !shouldMention || alreadyMentionedThisSession) return body
  if (body.includes(CROSS_MENTION_PA_TEXT)) return body
  return `${body}\n\n${CROSS_MENTION_PA_TEXT}`
}

export function hasCrossMentionPA(text: string): boolean {
  return text.includes(CROSS_MENTION_PA_TEXT)
}

/** Chỉ path=normal, không compat/crisis/protective. */
export function canApplyCrossMentionOnPath(
  path: string,
  compatMode: string | null,
  crisisTurn: boolean,
  protectiveTurn: boolean,
): boolean {
  if (crisisTurn || protectiveTurn) return false
  if (compatMode === 'pair' || compatMode === 'block') return false
  return path === 'normal'
}

export function applyMatchCrossMentionToReply(
  reply: string,
  userMessage: string,
  opts: {
    path: string
    compatMode: string | null
    crisisTurn: boolean
    protectiveTurn: boolean
    crossMentionedPA: boolean
    recentUserTexts?: string[]
  },
): { reply: string; crossMentionedPA: boolean; crossMentionApplied: boolean } {
  const canApply = canApplyCrossMentionOnPath(
    opts.path,
    opts.compatMode,
    opts.crisisTurn,
    opts.protectiveTurn,
  )
  const shouldMention =
    canApply &&
    shouldCrossMentionPA(userMessage, opts.recentUserTexts)

  const next = appendCrossMentionIfNeeded(
    reply,
    shouldMention,
    opts.crossMentionedPA,
  )

  const applied = next !== reply.trim() && hasCrossMentionPA(next)
  return {
    reply: next,
    crossMentionedPA: opts.crossMentionedPA || applied,
    crossMentionApplied: applied,
  }
}
