import { getCurrentSlotNudge } from './nudge-service'
import { normalizeVoiceGroup, type GroupKey } from '../data/voice-lexicon'

export type { GroupKey }

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  ts: number
  isOpening?: boolean
  /** Assistant reply sau user message crisis — hiện support block cố định */
  crisisSupport?: boolean
  /** Gợi ý Big Five quiz — 1 lần/session */
  big5Nudge?: boolean
}

export interface AssistantConfig {
  group: GroupKey
}

const CHAT_KEY = 'tncb_assistant_chat'
const CONFIG_KEY = 'tncb_assistant_config'

const DEFAULT_CONFIG: AssistantConfig = { group: 'sincere' }

export function createMessageId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function loadChat(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(CHAT_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ChatMessage[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveChat(messages: ChatMessage[]): void {
  localStorage.setItem(CHAT_KEY, JSON.stringify(messages))
}

export function clearChat(): void {
  localStorage.removeItem(CHAT_KEY)
}

export function loadConfig(): AssistantConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (!raw) return DEFAULT_CONFIG
    const parsed = JSON.parse(raw) as Partial<AssistantConfig> & {
      group?: string
    }
    const group = normalizeVoiceGroup(parsed.group)
    if (parsed.group && parsed.group !== group) {
      saveConfig({ group })
    }
    return { group }
  } catch {
    return DEFAULT_CONFIG
  }
}

export function saveConfig(config: AssistantConfig): void {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}

export function buildOpeningMessage(mbtiType: string): ChatMessage {
  const { nudge } = getCurrentSlotNudge(mbtiType)
  const nudgeText =
    nudge?.nudgeText ?? 'Hôm nay bạn muốn nói về điều gì?'

  return {
    id: createMessageId(),
    role: 'assistant',
    content: `Chào bạn. ${nudgeText}`,
    ts: Date.now(),
    isOpening: true,
  }
}
