/**
 * DEV-only — chẩn đoán nguồn câu fork MA (không đổi hành vi pipeline).
 */
import type { LLMMessage } from '../llm'
import {
  MATCH_CHAT_STREAM_MAX_TOKENS,
  MATCH_SAFETY_STREAM_MAX_TOKENS,
} from '../llm'
import {
  detectResponseMode,
  hasUncertainFork,
  UNCERTAIN_FORK_TEXT,
  type AssertiveTurbulent,
} from '../style-adapter'
import { appendMatchUncertainForkIfMissing } from './match-llm-output'

const OLLAMA_BASE = 'http://localhost:11434'
const OLLAMA_MODEL = 'qwen3:8b'

export interface OllamaStreamDoneInfo {
  doneReason: string | null
  promptTokens: number | null
  completionTokens: number | null
}

export interface MatchReplyDiagRow {
  turn: number
  userQ: string
  responseMode: string
  raw: string
  afterStrip: string
  beforeFork: string
  final: string
  finishReason: string | null
  promptTokens: number | null
  completionTokens: number | null
  forkInRaw: boolean
  forkAppended: boolean
  rawEmpty: boolean
  afterStripEmpty: boolean
}

/** Fork có trong output model thô (trước append). */
export function forkInRawText(raw: string): boolean {
  return hasUncertainFork(raw)
}

/** Appender có thêm fork so với afterStrip/beforeFork không. */
export function forkWasAppended(beforeFork: string, final: string): boolean {
  return hasUncertainFork(final) && !hasUncertainFork(beforeFork)
}

export function extractForkCloserSnippets(systemContent: string): string[] {
  const needles = [
    UNCERTAIN_FORK_TEXT,
    'Muốn mình nghe tiếp',
    'cùng nghĩ cách gỡ',
    'câu fork',
    'nghe tiếp, hay',
    'App sẽ tự thêm câu fork',
    'tối đa 1 câu hỏi mở',
  ]
  const hits: string[] = []
  for (const line of systemContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (needles.some((n) => trimmed.includes(n))) {
      hits.push(trimmed)
    }
  }
  return hits
}

export function buildMatchReplyDiagRow(input: {
  turn: number
  userQ: string
  responseMode: string
  raw: string
  afterStrip: string
  beforeFork: string
  final: string
  meta?: OllamaStreamDoneInfo
}): MatchReplyDiagRow {
  return {
    turn: input.turn,
    userQ: input.userQ,
    responseMode: input.responseMode,
    raw: input.raw,
    afterStrip: input.afterStrip,
    beforeFork: input.beforeFork,
    final: input.final,
    finishReason: input.meta?.doneReason ?? null,
    promptTokens: input.meta?.promptTokens ?? null,
    completionTokens: input.meta?.completionTokens ?? null,
    forkInRaw: forkInRawText(input.raw),
    forkAppended: forkWasAppended(input.beforeFork, input.final),
    rawEmpty: !input.raw.trim(),
    afterStripEmpty: !input.afterStrip.trim(),
  }
}

export function logMatchReplyDiagRow(row: MatchReplyDiagRow): void {
  console.log(`\n[diag:match-reply] ── L${row.turn} ──`)
  console.log(`  Q: ${row.userQ}`)
  console.log(`  responseMode: ${row.responseMode}`)
  console.log(`  finishReason: ${row.finishReason ?? '—'}`)
  console.log(
    `  tokens: prompt=${row.promptTokens ?? '—'} completion=${row.completionTokens ?? '—'}`,
  )
  console.log(`  forkInRaw: ${row.forkInRaw}  forkAppended: ${row.forkAppended}`)
  console.log(`  rawEmpty: ${row.rawEmpty}  afterStripEmpty: ${row.afterStripEmpty}`)
  console.log('  RAW (nguyên văn model):')
  console.log(row.raw === '' ? '    [RỖNG]' : row.raw)
  console.log('  AFTER_STRIP:')
  console.log(row.afterStrip === '' ? '    [RỖNG]' : row.afterStrip)
  console.log('  BEFORE_FORK (trước append):')
  console.log(row.beforeFork === '' ? '    [RỖNG]' : row.beforeFork)
  console.log('  FINAL (user thấy):')
  console.log(row.final === '' ? '    [RỖNG]' : row.final)
}

export function logMatchReplyDiagSummary(rows: MatchReplyDiagRow[]): void {
  console.log('\n[diag:match-reply] ═══ BẢNG TÓM TẮT ═══')
  console.table(
    rows.map((r) => ({
      L: r.turn,
      mode: r.responseMode,
      rawEmpty: r.rawEmpty,
      stripEmpty: r.afterStripEmpty,
      forkInRaw: r.forkInRaw,
      forkAppended: r.forkAppended,
      finish: r.finishReason ?? '—',
      pTok: r.promptTokens ?? '—',
      cTok: r.completionTokens ?? '—',
      finalLen: r.final.length,
    })),
  )

  const forkOnly = rows.filter(
    (r) => hasUncertainFork(r.final) && r.final.trim().length < 80,
  )
  if (forkOnly.length) {
    console.log('\n[diag:match-reply] Lượt FINAL gần chỉ-fork:')
    for (const r of forkOnly) {
      console.log(
        `  L${r.turn}: forkInRaw=${r.forkInRaw} forkAppended=${r.forkAppended} → ${
          r.forkInRaw
            ? 'giả thuyết A (model echo fork trong RAW)'
            : r.forkAppended
              ? 'giả thuyết B (rỗng/ngắn + appender thêm fork)'
              : 'không rõ — xem RAW/FINAL'
        }`,
      )
    }
  }
}

/** Stream Ollama trực tiếp — chỉ diag; giữ nguyên logic production stream. */
export async function streamOllamaRawDiag(
  messages: LLMMessage[],
  maxTokens: number,
): Promise<{ raw: string; meta: OllamaStreamDoneInfo }> {
  const response = await fetch(`${OLLAMA_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: true,
      options: { temperature: 0.7, num_predict: maxTokens },
    }),
  })

  if (!response.ok) {
    throw new Error(`Ollama stream thất bại (${response.status})`)
  }
  if (!response.body) {
    throw new Error('Ollama không trả về stream body')
  }

  let raw = ''
  let meta: OllamaStreamDoneInfo = {
    doneReason: null,
    promptTokens: null,
    completionTokens: null,
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        let parsed: {
          message?: { content?: string }
          done?: boolean
          done_reason?: string
          prompt_eval_count?: number
          eval_count?: number
        }
        try {
          parsed = JSON.parse(trimmed)
        } catch {
          continue
        }

        const content = parsed.message?.content ?? ''
        if (content) raw += content

        if (parsed.done) {
          meta = {
            doneReason: parsed.done_reason ?? null,
            promptTokens: parsed.prompt_eval_count ?? null,
            completionTokens: parsed.eval_count ?? null,
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }

  return { raw, meta }
}

/** Mô phỏng nhánh fork giống MatchChat — không đổi production helpers. */
export function applyMatchForkStep(
  afterStrip: string,
  userMessage: string,
  mbtiType: string,
  identity: AssertiveTurbulent,
  skipStyle: boolean,
  crisisTurn: boolean,
  protectiveTurn: boolean,
): { beforeFork: string; final: string; responseMode: string } {
  const beforeFork = afterStrip
  if (crisisTurn || protectiveTurn || skipStyle || !afterStrip) {
    return { beforeFork, final: beforeFork, responseMode: '—' }
  }
  const mode = detectResponseMode(userMessage, { mbtiType, identity })
  if (mode !== 'uncertain') {
    return { beforeFork, final: beforeFork, responseMode: mode }
  }
  const final = appendMatchUncertainForkIfMissing(afterStrip)
  return { beforeFork, final, responseMode: mode }
}

export function resolveMatchStreamMaxTokens(
  crisisTurn: boolean,
  protectiveTurn: boolean,
): number {
  return crisisTurn || protectiveTurn
    ? MATCH_SAFETY_STREAM_MAX_TOKENS
    : MATCH_CHAT_STREAM_MAX_TOKENS
}

export const DIAG_EMPTY_REPLY_QUESTIONS = [
  'chào, mình muốn hiểu hơn về một người',
  'bạn ấy là ESTJ',
  'mình với bạn ấy có hợp không?',
  'chỗ nào tụi mình dễ va nhau nhất?',
] as const
