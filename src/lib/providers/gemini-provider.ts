import type { LLMConfig, LLMMessage, LLMProvider, LLMStreamChunk } from '../llm'

export class GeminiProvider implements LLMProvider {
  readonly name = 'gemini'

  async checkConnection(): Promise<boolean> {
    throw new Error('[gemini] chưa implement — bật ở Giai đoạn cloud')
  }

  async chat(_messages: LLMMessage[], _config?: Partial<LLMConfig>): Promise<string> {
    throw new Error('[gemini] chưa implement — bật ở Giai đoạn cloud')
  }

  async stream(
    _messages: LLMMessage[],
    _onChunk: (chunk: LLMStreamChunk) => void,
    _config?: Partial<LLMConfig>,
  ): Promise<void> {
    throw new Error('[gemini] chưa implement — bật ở Giai đoạn cloud')
  }
}

export const geminiProvider = new GeminiProvider()
