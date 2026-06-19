import type { ChatMessage } from './assistant-storage'
import { createMessageId } from './assistant-storage'
import { clearMatchSummaryState } from './match-memory-service'

const MATCH_CHAT_KEY = 'tncb_match_assistant_chat'

export function loadMatchChat(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(MATCH_CHAT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveMatchChat(messages: ChatMessage[]): void {
  localStorage.setItem(MATCH_CHAT_KEY, JSON.stringify(messages))
}

export function clearMatchChat(): void {
  localStorage.removeItem(MATCH_CHAT_KEY)
  clearMatchSummaryState()
}

export function createMatchUserMessage(content: string): ChatMessage {
  return {
    id: createMessageId(),
    role: 'user',
    content,
    ts: Date.now(),
  }
}
