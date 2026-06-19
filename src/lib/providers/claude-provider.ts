import type { LLMConfig, LLMMessage, LLMProvider, LLMStreamChunk } from '../llm'

export class ClaudeProvider implements LLMProvider {
  readonly name = 'claude'

  async checkConnection(): Promise<boolean> {
    throw new Error('[claude] chưa implement — bật ở Giai đoạn cloud')
  }

  async chat(_messages: LLMMessage[], _config?: Partial<LLMConfig>): Promise<string> {
    throw new Error('[claude] chưa implement — bật ở Giai đoạn cloud')
  }

  async stream(
    _messages: LLMMessage[],
    _onChunk: (chunk: LLMStreamChunk) => void,
    _config?: Partial<LLMConfig>,
  ): Promise<void> {
    throw new Error('[claude] chưa implement — bật ở Giai đoạn cloud')
  }
}

export const claudeProvider = new ClaudeProvider()
