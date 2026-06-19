export interface LLMMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface LLMStreamChunk {
  content: string
  done: boolean
}

export interface LLMConfig {
  temperature: number
  maxTokens: number
}

export interface LLMProvider {
  name: string
  checkConnection(): Promise<boolean>
  chat(messages: LLMMessage[], config?: Partial<LLMConfig>): Promise<string>
  stream(
    messages: LLMMessage[],
    onChunk: (chunk: LLMStreamChunk) => void,
    config?: Partial<LLMConfig>,
  ): Promise<void>
}

export type ProviderName = 'ollama' | 'gemini' | 'claude'

export const DEFAULT_LLM_CONFIG: LLMConfig = {
  temperature: 0.7,
  maxTokens: 500,
}

/** WorkChat stream — comm KB cần reply dài hơn PA chat ngắn (~150–250 từ). */
export const WORK_CHAT_STREAM_MAX_TOKENS = 900

/** MatchChat normal — compat inject dài, cần headroom hơn PA default 500. */
export const MATCH_CHAT_STREAM_MAX_TOKENS = 900

/** Crisis/PROTECTIVE MA — hotline + hướng dẫn an toàn, không được cắt cụt. */
export const MATCH_SAFETY_STREAM_MAX_TOKENS = 1200
