/** Placeholder trong [ngoặc] → thay bằng từ chung hoặc bỏ. */
const PLACEHOLDER_INNER: { pattern: RegExp; replacement: string }[] = [
  { pattern: /^tên(\s+dự\s*án)?$/i, replacement: 'người đó' },
  { pattern: /^tên\s+người$/i, replacement: 'người đó' },
  { pattern: /^dự\s*án(\s+x)?$/i, replacement: 'đó' },
  { pattern: /^x$/i, replacement: 'đó' },
  { pattern: /^gợi\s*ý$/i, replacement: '' },
  { pattern: /^cụ\s*thể$/i, replacement: '' },
  { pattern: /^chủ\s*đề$/i, replacement: 'chủ đề đó' },
  { pattern: /^hành\s*động\s*cụ\s*thể$/i, replacement: 'việc cần làm' },
  { pattern: /^kết\s*quả\s*cụ\s*thể$/i, replacement: 'kết quả' },
  { pattern: /^ngày(\s*\/\s*giờ)?$/i, replacement: 'thời điểm đó' },
]

/** Từ Anh OK trong môi trường công sở VN — không flag. */
const ENGLISH_OK_WHITELIST = new Set([
  'deadline',
  'email',
  'team',
  'ok',
  'feedback',
  'stakeholder',
  'deliverable',
  'meeting',
  'pm',
  'ux',
  'backend',
  'frontend',
  'api',
  'hr',
  'kpi',
  'manager',
  'lead',
  'slide',
  'file',
  'deal',
  'app',
  'timer',
])

/** Từ Anh cụ thể hay lọt — đóng, không match âm tiết Việt đơn. */
const ENGLISH_LEAK_BLOCKLIST = new Set([
  'passively',
  'actively',
  'proactively',
  'reactively',
  'scope',
  'alignment',
  'mindset',
  'leadership',
  'proactive',
  'reactive',
  'leverage',
  'onboarding',
  'offboarding',
  'actionable',
  'bandwidth',
  'synergy',
  'optimize',
  'utilize',
  'prioritize',
])

/** Hậu tố đặc trưng tiếng Anh — chỉ áp từ ≥6 ký tự (tránh âm tiết Việt ngắn). */
const ENGLISH_SUFFIX_PATTERN =
  /(?:ingly|edly|fully|lessly|tion|sion|ment|ness|able|ible|ship|ward|wise|ized|ised|ize|ise|ism|ing|ed|ly|ive)$/i

function replaceBracketInner(inner: string): string {
  const trimmed = inner.trim()
  for (const { pattern, replacement } of PLACEHOLDER_INNER) {
    if (pattern.test(trimmed)) return replacement
  }
  return trimmed
}

function cleanupSpacing(text: string): string {
  return text
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .replace(/\s+([)\]])/g, '$1')
    .trim()
}

/**
 * Bỏ placeholder [tên]/[X]/... hoặc unwrap ngoặc giữ nội dung thật.
 * Chạy sau stream, trước hiển thị/lưu.
 */
export function stripBracketPlaceholders(text: string): string {
  if (!text.trim() || text.startsWith('[LỖI')) return text

  const cleaned = text.replace(/\[([^\]]{1,48})\]/g, (_, inner: string) =>
    replaceBracketInner(inner),
  )

  return cleanupSpacing(cleaned)
}

export function sanitizeWorkChatReply(text: string): string {
  return stripBracketPlaceholders(text)
}

function isEnglishLeakToken(lower: string): boolean {
  if (ENGLISH_LEAK_BLOCKLIST.has(lower)) return true
  if (lower.length >= 6 && ENGLISH_SUFFIX_PATTERN.test(lower)) return true
  return false
}

/** Warn-only — không strip. Chỉ flag từ Anh thật (blocklist / hậu tố), không flag âm tiết Việt không dấu. */
export function findEnglishLeaks(text: string): string[] {
  if (!text.trim() || text.startsWith('[LỖI')) return []
  const words = text.match(/\b[a-zA-Z]{3,}\b/g) ?? []
  const seen = new Set<string>()
  const leaks: string[] = []
  for (const w of words) {
    const lower = w.toLowerCase()
    if (ENGLISH_OK_WHITELIST.has(lower)) continue
    if (seen.has(lower)) continue
    if (!isEnglishLeakToken(lower)) continue
    seen.add(lower)
    leaks.push(w)
  }
  return leaks
}
