import type { LLMMessage } from '../llm'
import {
  MATCH_CHAT_STREAM_MAX_TOKENS,
  MATCH_SAFETY_STREAM_MAX_TOKENS,
} from '../llm'
import { getLLM } from '../llm-client'
import {
  hasUncertainFork,
  pickUncertainFork,
  UNCERTAIN_FORK_ALTERNATIVES,
} from '../style-adapter'
import {
  buildMatchReplyDiagRow,
  logMatchReplyDiagRow,
  type OllamaStreamDoneInfo,
} from './match-reply-diag'

const THINK_BLOCK_RE = /`[\s\S]*?<\/think>/gi
const REDACTED_THINKING_RE = /<think>[\s\S]*?<\/redacted_thinking>/gi

export const MATCH_REPLY_MIN_BODY_CHARS = 40

export const MATCH_LLM_EMPTY_FALLBACK =
  'Mình chưa kết nối được, kiểm tra Ollama đang chạy nhé'

/** Strip qwen3 / reasoning blocks — chỉ dùng MA path. */
export function stripModelThinkingTags(raw: string): string {
  return raw.replace(THINK_BLOCK_RE, '').replace(REDACTED_THINKING_RE, '').trim()
}

/** `[đường dây...](1900...)` → số plain text — MA output only. */
export function stripMarkdownPhoneLinks(text: string): string {
  return text.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (_match, label, target) => {
    const url = String(target).trim()
    if (/^[\d\s+\-().]+$/.test(url)) return url
    const lbl = String(label).trim()
    return lbl ? `${lbl} ${url}` : url
  })
}

export function finalizeMatchAssistantReply(raw: string): string {
  return stripMarkdownPhoneLinks(stripModelThinkingTags(raw)).trim()
}

export function matchReplyBodyWithoutFork(reply: string): string {
  let text = reply.trim()
  for (const fork of UNCERTAIN_FORK_ALTERNATIVES) {
    if (text.includes(fork)) {
      text = text.replace(fork, '').trim()
    }
  }
  return text.replace(/\n{3,}/g, '\n\n').trim()
}

/** Reply chỉ còn fork hoặc thân quá ngắn — dùng runner flag. */
export function isForkOnlyOrNearEmpty(reply: string): boolean {
  const body = matchReplyBodyWithoutFork(reply)
  return body.length < MATCH_REPLY_MIN_BODY_CHARS
}

/** Reply kết bằng câu hỏi mở — coi như đã có fork, không thêm UNCERTAIN_FORK_TEXT. */
function replyEndsWithOpenQuestion(text: string): boolean {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return false
  return /[?？]/.test(lines[lines.length - 1]!)
}

/**
 * MA-only uncertain fork — KHÔNG gọi appendUncertainForkIfMissing (style-adapter).
 *
 * SHARED-BUG FLAG (PA/WA): appendUncertainForkIfMissing xóa dòng cuối nếu kết bằng "?",
 * rồi nếu body trống → trả về CHỈ fork — làm mất nội dung model. PA/WA vẫn dùng hàm chung.
 * Engine-owner: sửa shared = giữ body, reply đã kết bằng câu hỏi → giữ nguyên, không replace.
 */
export function appendMatchUncertainForkIfMissing(
  reply: string,
  options?: { recentAssistantReplies?: string[] },
): string {
  const body = stripModelThinkingTags(reply).trim()
  if (!body) return body

  if (hasUncertainFork(body)) return body

  if (replyEndsWithOpenQuestion(body)) return body

  const forkText = pickUncertainFork(options?.recentAssistantReplies ?? [])
  return `${body}\n\n${forkText}`
}

export interface MatchStreamResult {
  reply: string
  raw: string
  empty: boolean
  /** AFTER_STRIP — sau strip thinking, trước append fork. */
  afterStrip: string
}

export async function streamMatchChatReply(
  messages: LLMMessage[],
  options: {
    crisisTurn?: boolean
    protectiveTurn?: boolean
    maxAttempts?: number
    onPartial?: (visible: string) => void
  } = {},
): Promise<MatchStreamResult> {
  const maxTokens =
    options.crisisTurn || options.protectiveTurn
      ? MATCH_SAFETY_STREAM_MAX_TOKENS
      : MATCH_CHAT_STREAM_MAX_TOKENS
  const attempts = options.maxAttempts ?? 2
  let lastRaw = ''

  for (let attempt = 0; attempt < attempts; attempt++) {
    let raw = ''
    try {
      await getLLM().stream(
        messages,
        (chunk) => {
          if (!chunk.content) return
          raw += chunk.content
          options.onPartial?.(finalizeMatchAssistantReply(raw))
        },
        { maxTokens },
      )
    } catch {
      if (attempt === attempts - 1) {
        return {
          reply: MATCH_LLM_EMPTY_FALLBACK,
          raw: '',
          empty: true,
          afterStrip: '',
        }
      }
      continue
    }

    lastRaw = raw
    const reply = finalizeMatchAssistantReply(raw)
    if (reply) {
      if (import.meta.env.DEV && raw.length !== reply.length) {
        console.log('[match-llm] stripped thinking', {
          rawLen: raw.length,
          replyLen: reply.length,
        })
      }
      return { reply, raw, empty: false, afterStrip: reply }
    }

    if (import.meta.env.DEV) {
      console.warn(
        `[match-llm] empty after strip — attempt ${attempt + 1}/${attempts}`,
        { rawPreview: raw.slice(0, 300) },
      )
    }
  }

  return { reply: '', raw: lastRaw, empty: true, afterStrip: '' }
}

/**
 * DEV — log chẩn đoán sau khi đã có FINAL (gọi từ MatchChat / runner).
 * Không đổi nội dung reply.
 */
export function logMatchReplyDiagTurn(input: {
  turn?: number
  userQ: string
  raw: string
  afterStrip: string
  beforeFork: string
  final: string
  responseMode: string
  meta?: OllamaStreamDoneInfo
}): void {
  if (!import.meta.env.DEV) return
  const row = buildMatchReplyDiagRow({
    turn: input.turn ?? 0,
    userQ: input.userQ,
    responseMode: input.responseMode,
    raw: input.raw,
    afterStrip: input.afterStrip,
    beforeFork: input.beforeFork,
    final: input.final,
    meta: input.meta,
  })
  logMatchReplyDiagRow(row)
}
