import type { ChatMessage } from './assistant-storage'
import type { LLMMessage } from './llm'
import { getLLM } from './llm-client'

const SUMMARY_KEY = 'tncb_assistant_summary'

const TAIL_MAX = 14
const FOLD = 6
const START = 16

export interface SummaryState {
  summary: string
  coveredUpTo: number
}

export function loadSummaryState(): SummaryState {
  try {
    const raw = localStorage.getItem(SUMMARY_KEY)
    if (!raw) return { summary: '', coveredUpTo: 0 }
    const parsed = JSON.parse(raw) as Partial<SummaryState>
    return {
      summary: parsed.summary ?? '',
      coveredUpTo:
        typeof parsed.coveredUpTo === 'number' ? parsed.coveredUpTo : 0,
    }
  } catch {
    return { summary: '', coveredUpTo: 0 }
  }
}

export function saveSummaryState(state: SummaryState): void {
  localStorage.setItem(SUMMARY_KEY, JSON.stringify(state))
}

export function clearSummaryState(): void {
  localStorage.removeItem(SUMMARY_KEY)
}

function getConversationalMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter((m) => !m.isOpening && m.content.trim())
}

function formatChunk(chunk: ChatMessage[]): string {
  return chunk
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n')
}

export async function generateSummary(
  prevSummary: string,
  chunk: ChatMessage[],
): Promise<string> {
  const prevBlock = prevSummary.trim()
    ? `[Tóm tắt cũ]: ${prevSummary.trim()}`
    : '[Tóm tắt cũ]: (chưa có)'

  const prompt = [
    'Tóm tắt hội thoại sau thành 3-4 câu tiếng Việt. Giữ: facts về user, cảm xúc/chủ đề chính, điều user đang vướng. Gộp với tóm tắt cũ nếu có.',
    prevBlock,
    `[Hội thoại mới]:\n${formatChunk(chunk)}`,
  ].join('\n\n')

  return getLLM().chat([{ role: 'user', content: prompt }], {
    temperature: 0.3,
    maxTokens: 300,
  })
}

export async function ensureSummary(
  messages: ChatMessage[],
): Promise<SummaryState> {
  const conversational = getConversationalMessages(messages)

  if (conversational.length <= START) {
    return loadSummaryState()
  }

  let state = loadSummaryState()

  if (state.coveredUpTo > conversational.length) {
    state = { summary: '', coveredUpTo: 0 }
  }

  while (conversational.length - state.coveredUpTo > TAIL_MAX) {
    const foldChunk = conversational.slice(
      state.coveredUpTo,
      state.coveredUpTo + FOLD,
    )
    if (foldChunk.length === 0) break

    const summary = await generateSummary(state.summary, foldChunk)
    state = {
      summary,
      coveredUpTo: state.coveredUpTo + foldChunk.length,
    }
    saveSummaryState(state)
  }

  return state
}

export function buildContext(messages: ChatMessage[]): {
  summaryBlock: string | null
  recent: LLMMessage[]
} {
  const conversational = getConversationalMessages(messages)
  let { summary, coveredUpTo } = loadSummaryState()

  if (coveredUpTo > conversational.length) {
    coveredUpTo = 0
    summary = ''
  }

  const summaryBlock =
    coveredUpTo > 0 && summary.trim() ? summary.trim() : null

  const recent = conversational.slice(coveredUpTo).map((m) => ({
    role: m.role,
    content: m.content,
  }))

  return { summaryBlock, recent }
}
