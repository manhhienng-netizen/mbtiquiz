import { getResourceForSituation } from '../data/tncb-resources-vn-safety'
import type { RegistryKBEntry } from './kb-registry'

const PLACEHOLDER_RE = /\[[^\]]+\]/g

/** Safety net — strip bracket placeholders trước khi vào prompt. */
export function stripPlaceholders(text: string): string {
  return text.replace(PLACEHOLDER_RE, '').replace(/\s{2,}/g, ' ').trim()
}

function protectiveRedirectBlock(entry: RegistryKBEntry): string | null {
  if (entry.zone !== 'PROTECTIVE' || !entry.safetySituation) return null
  const res = getResourceForSituation(entry.safetySituation)
  const parts = [`[Nguồn hỗ trợ đã verify]: ${res.message}`]
  if (res.fallback) {
    parts.push(`(Dự phòng: ${res.fallback})`)
  }
  return parts.join(' ')
}

/**
 * Build block inject vào system prompt (GU hoặc PROTECTIVE).
 * PROTECTIVE: không nhồi số chưa verify — redirect từ SSOT.
 */
export function buildKBInjectBlock(entry: RegistryKBEntry): string {
  const body = stripPlaceholders(entry.body)
  const parts = [
    `[KB NỘI BỘ — ${entry.label} — dùng để trả lời ĐÚNG, KHÔNG đọc nguyên văn, KHÔNG nói tên framework/sách cho user]`,
    body,
  ]
  if (entry.why) {
    parts.push(`(Nguồn nội bộ — không đọc cho user: ${stripPlaceholders(entry.why)})`)
  }
  const redirect = protectiveRedirectBlock(entry)
  if (redirect) parts.push(redirect)
  parts.push(
    '[QUAN TRỌNG: Diễn đạt lại bằng lời của bạn cho đúng tình huống user. Giọng group đang chọn. KHÔNG đọc nguyên văn KB. KHÔNG leak framework/jargon. PROTECTIVE: không đưa calo/cân/liều/mã đầu tư — hướng nguồn verify ở trên.]',
  )
  return parts.join('\n')
}
