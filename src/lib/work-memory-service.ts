import type { ChatMessage } from './assistant-storage'
import type { LLMMessage } from './llm'
import { getLLM } from './llm-client'

const WORK_SUMMARY_KEY = 'tncb_work_assistant_summary'

const TAIL_MAX = 14
const FOLD = 6
const START = 16

export interface WorkSummaryState {
  summary: string
  coveredUpTo: number
}

export function loadWorkSummaryState(): WorkSummaryState {
  try {
    const raw = localStorage.getItem(WORK_SUMMARY_KEY)
    if (!raw) return { summary: '', coveredUpTo: 0 }
    const parsed = JSON.parse(raw) as Partial<WorkSummaryState>
    return {
      summary: parsed.summary ?? '',
      coveredUpTo:
        typeof parsed.coveredUpTo === 'number' ? parsed.coveredUpTo : 0,
    }
  } catch {
    return { summary: '', coveredUpTo: 0 }
  }
}

export function saveWorkSummaryState(state: WorkSummaryState): void {
  localStorage.setItem(WORK_SUMMARY_KEY, JSON.stringify(state))
}

export function clearWorkSummaryState(): void {
  localStorage.removeItem(WORK_SUMMARY_KEY)
}

function getConversationalMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter((m) => m.content.trim())
}

function formatChunk(chunk: ChatMessage[]): string {
  return chunk
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n')
}

async function generateWorkSummary(
  prevSummary: string,
  chunk: ChatMessage[],
): Promise<string> {
  const prevBlock = prevSummary.trim()
    ? `[Tóm tắt cũ]: ${prevSummary.trim()}`
    : '[Tóm tắt cũ]: (chưa có)'

  const prompt = [
    'Tóm tắt hội thoại công việc sau thành 3-4 câu tiếng Việt.',
    'BẮT BUỘC giữ facts cụ thể user đã nói: số người/team size, deadline, vấn đề nhân sự (trễ, underperform), vai trò mới (lead/sếp).',
    'KHÔNG tóm tắt mất con số hoặc chi tiết then chốt. Gộp với tóm tắt cũ nếu có.',
    prevBlock,
    `[Hội thoại mới]:\n${formatChunk(chunk)}`,
  ].join('\n\n')

  return getLLM().chat([{ role: 'user', content: prompt }], {
    temperature: 0.3,
    maxTokens: 300,
  })
}

export async function ensureWorkSummary(
  messages: ChatMessage[],
): Promise<WorkSummaryState> {
  const conversational = getConversationalMessages(messages)

  if (conversational.length <= START) {
    return loadWorkSummaryState()
  }

  let state = loadWorkSummaryState()

  if (state.coveredUpTo > conversational.length) {
    state = { summary: '', coveredUpTo: 0 }
  }

  while (conversational.length - state.coveredUpTo > TAIL_MAX) {
    const foldChunk = conversational.slice(
      state.coveredUpTo,
      state.coveredUpTo + FOLD,
    )
    if (foldChunk.length === 0) break

    const summary = await generateWorkSummary(state.summary, foldChunk)
    state = {
      summary,
      coveredUpTo: state.coveredUpTo + foldChunk.length,
    }
    saveWorkSummaryState(state)
  }

  return state
}

export function buildWorkContext(messages: ChatMessage[]): {
  summaryBlock: string | null
  recent: LLMMessage[]
} {
  const conversational = getConversationalMessages(messages)
  let { summary, coveredUpTo } = loadWorkSummaryState()

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
