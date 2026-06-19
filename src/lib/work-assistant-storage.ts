import type { ChatMessage } from './assistant-storage'
import { createMessageId } from './assistant-storage'
import { clearWorkSummaryState } from './work-memory-service'

const WORK_CHAT_KEY = 'tncb_work_assistant_chat'

export function loadWorkChat(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(WORK_CHAT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveWorkChat(messages: ChatMessage[]): void {
  localStorage.setItem(WORK_CHAT_KEY, JSON.stringify(messages))
}

export function clearWorkChat(): void {
  localStorage.removeItem(WORK_CHAT_KEY)
  clearWorkSummaryState()
}

export function createWorkUserMessage(content: string): ChatMessage {
  return {
    id: createMessageId(),
    role: 'user',
    content,
    ts: Date.now(),
  }
}

/** Số tin user đã gửi trong WA — dùng cho B1 welcome tip (< 5 = user mới). */
export function getWorkMessageCount(messages?: ChatMessage[]): number {
  const list = messages ?? loadWorkChat()
  return list.filter((m) => m.role === 'user').length
}
