import type { ChatMessage } from './assistant-storage'
import type { LLMMessage } from './llm'
import { getLLM } from './llm-client'

const MATCH_SUMMARY_KEY = 'tncb_match_assistant_summary'

const TAIL_MAX = 14
const FOLD = 6
const START = 16

export interface MatchSummaryState {
  summary: string
  coveredUpTo: number
}

export function loadMatchSummaryState(): MatchSummaryState {
  try {
    const raw = localStorage.getItem(MATCH_SUMMARY_KEY)
    if (!raw) return { summary: '', coveredUpTo: 0 }
    const parsed = JSON.parse(raw) as Partial<MatchSummaryState>
    return {
      summary: parsed.summary ?? '',
      coveredUpTo:
        typeof parsed.coveredUpTo === 'number' ? parsed.coveredUpTo : 0,
    }
  } catch {
    return { summary: '', coveredUpTo: 0 }
  }
}

export function saveMatchSummaryState(state: MatchSummaryState): void {
  localStorage.setItem(MATCH_SUMMARY_KEY, JSON.stringify(state))
}

export function clearMatchSummaryState(): void {
  localStorage.removeItem(MATCH_SUMMARY_KEY)
}

function getConversationalMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter((m) => m.content.trim())
}

function formatChunk(chunk: ChatMessage[]): string {
  return chunk
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n')
}

async function generateMatchSummary(
  prevSummary: string,
  chunk: ChatMessage[],
): Promise<string> {
  const prevBlock = prevSummary.trim()
    ? `[Tóm tắt cũ]: ${prevSummary.trim()}`
    : '[Tóm tắt cũ]: (chưa có)'

  const prompt = [
    'Tóm tắt hội thoại tương hợp/quan hệ sau thành 3-4 câu tiếng Việt. Giữ: chủ đề, facts user nói, điểm vướng. Gộp với tóm tắt cũ nếu có.',
    prevBlock,
    `[Hội thoại mới]:\n${formatChunk(chunk)}`,
  ].join('\n\n')

  return getLLM().chat([{ role: 'user', content: prompt }], {
    temperature: 0.3,
    maxTokens: 300,
  })
}

export async function ensureMatchSummary(
  messages: ChatMessage[],
): Promise<MatchSummaryState> {
  const conversational = getConversationalMessages(messages)

  if (conversational.length <= START) {
    return loadMatchSummaryState()
  }

  let state = loadMatchSummaryState()

  if (state.coveredUpTo > conversational.length) {
    state = { summary: '', coveredUpTo: 0 }
  }

  while (conversational.length - state.coveredUpTo > TAIL_MAX) {
    const foldChunk = conversational.slice(
      state.coveredUpTo,
      state.coveredUpTo + FOLD,
    )
    if (foldChunk.length === 0) break

    const summary = await generateMatchSummary(state.summary, foldChunk)
    state = {
      summary,
      coveredUpTo: state.coveredUpTo + foldChunk.length,
    }
    saveMatchSummaryState(state)
  }

  return state
}

export function buildMatchContext(messages: ChatMessage[]): {
  summaryBlock: string | null
  recent: LLMMessage[]
} {
  const conversational = getConversationalMessages(messages)
  let { summary, coveredUpTo } = loadMatchSummaryState()

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
