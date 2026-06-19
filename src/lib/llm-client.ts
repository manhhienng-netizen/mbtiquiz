import type { LLMProvider, ProviderName } from './llm'
import { claudeProvider } from './providers/claude-provider'
import { geminiProvider } from './providers/gemini-provider'
import { ollamaProvider } from './providers/ollama-provider'

export type { LLMConfig, LLMMessage, LLMStreamChunk } from './llm'
export { buildSystemPrompt } from './system-prompt'

// Chọn provider mặc định ở đây — đổi 1 dòng là swap toàn app
export const ACTIVE_PROVIDER: ProviderName = 'ollama'

const providers: Record<ProviderName, LLMProvider> = {
  ollama: ollamaProvider,
  gemini: geminiProvider,
  claude: claudeProvider,
}

export function getLLM(): LLMProvider {
  return providers[ACTIVE_PROVIDER]
}
