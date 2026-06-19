import {
  DEFAULT_LLM_CONFIG,
  type LLMConfig,
  type LLMMessage,
  type LLMProvider,
  type LLMStreamChunk,
} from '../llm'

interface OllamaProviderConfig {
  model: string
  baseUrl: string
}

const DEFAULT_OLLAMA: OllamaProviderConfig = {
  model: 'qwen3:8b',
  baseUrl: 'http://localhost:11434',
}

const CONNECTION_TIMEOUT_MS = 3000

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, '')
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

async function checkOllamaConnection(baseUrl: string): Promise<boolean> {
  const url = `${normalizeBaseUrl(baseUrl)}/api/tags`

  try {
    const response = await fetchWithTimeout(url, { method: 'GET' }, CONNECTION_TIMEOUT_MS)
    return response.ok
  } catch {
    return false
  }
}

function resolveConfig(config?: Partial<LLMConfig>): LLMConfig {
  return { ...DEFAULT_LLM_CONFIG, ...config }
}

export class OllamaProvider implements LLMProvider {
  readonly name = 'ollama'
  private readonly providerConfig: OllamaProviderConfig

  constructor(providerConfig: OllamaProviderConfig = DEFAULT_OLLAMA) {
    this.providerConfig = providerConfig
  }

  async checkConnection(): Promise<boolean> {
    return checkOllamaConnection(this.providerConfig.baseUrl)
  }

  async chat(messages: LLMMessage[], config?: Partial<LLMConfig>): Promise<string> {
    const resolved = resolveConfig(config)
    const baseUrl = normalizeBaseUrl(this.providerConfig.baseUrl)
    const connected = await checkOllamaConnection(baseUrl)

    if (!connected) {
      throw new Error(
        `Ollama không phản hồi tại ${baseUrl}. Hãy chạy Ollama local trước khi dùng Assistant.`,
      )
    }

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.providerConfig.model,
        messages,
        stream: false,
        options: {
          temperature: resolved.temperature,
          num_predict: resolved.maxTokens,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(
        `Ollama chat thất bại (${response.status}): ${await response.text()}`,
      )
    }

    const data = (await response.json()) as {
      message?: { content?: string }
    }

    const content = data.message?.content?.trim()
    if (!content) {
      throw new Error('Ollama trả về phản hồi rỗng.')
    }

    return content
  }

  async stream(
    messages: LLMMessage[],
    onChunk: (chunk: LLMStreamChunk) => void,
    config?: Partial<LLMConfig>,
  ): Promise<void> {
    const resolved = resolveConfig(config)
    const baseUrl = normalizeBaseUrl(this.providerConfig.baseUrl)
    const connected = await checkOllamaConnection(baseUrl)

    if (!connected) {
      throw new Error(
        `Ollama không phản hồi tại ${baseUrl}. Hãy chạy Ollama local trước khi dùng Assistant.`,
      )
    }

    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.providerConfig.model,
        messages,
        stream: true,
        options: {
          temperature: resolved.temperature,
          num_predict: resolved.maxTokens,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(
        `Ollama stream thất bại (${response.status}): ${await response.text()}`,
      )
    }

    if (!response.body) {
      throw new Error('Ollama không trả về stream body.')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (!trimmed) continue

          let parsed: { message?: { content?: string }; done?: boolean }
          try {
            parsed = JSON.parse(trimmed) as {
              message?: { content?: string }
              done?: boolean
            }
          } catch {
            continue
          }

          const content = parsed.message?.content ?? ''
          if (content) {
            onChunk({ content, done: false })
          }

          if (parsed.done) {
            onChunk({ content: '', done: true })
            return
          }
        }
      }

      onChunk({ content: '', done: true })
    } finally {
      reader.releaseLock()
    }
  }
}

export const ollamaProvider = new OllamaProvider()
