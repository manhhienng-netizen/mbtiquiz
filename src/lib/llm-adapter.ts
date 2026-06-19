// LLM Adapter — swap Ollama / Claude / Gemini qua CONFIG, không sửa logic
// B3: test Ollama. Production: Claude/Gemini qua env var VITE_LLM_PROVIDER

export type LLMProvider = 'ollama' | 'claude' | 'gemini'

export const LLM_PROVIDER: LLMProvider =
  (import.meta.env.VITE_LLM_PROVIDER as LLMProvider) ?? 'ollama'

const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL ?? 'http://localhost:11434'
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL ?? 'qwen3:8b'
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-2.0-flash'

export async function callLLM(prompt: string, systemPrompt?: string): Promise<string> {
  switch (LLM_PROVIDER) {
    case 'ollama':
      return callOllama(prompt, systemPrompt)
    case 'claude':
      return callClaude(prompt, systemPrompt)
    case 'gemini':
      return callGemini(prompt, systemPrompt)
    default:
      console.warn('[LLM] Unknown provider:', LLM_PROVIDER, '— fallback Ollama')
      return callOllama(prompt, systemPrompt)
  }
}

async function callOllama(prompt: string, system?: string): Promise<string> {
  const body = {
    model: OLLAMA_MODEL,
    prompt: system ? `${system}\n\n${prompt}` : prompt,
    stream: false,
  }
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as { response?: string }
  return data.response ?? ''
}

async function callClaude(prompt: string, system?: string): Promise<string> {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY
  if (!apiKey) throw new Error('CLAUDE_API_KEY not set')
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      system: system ?? '',
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  const data = (await res.json()) as {
    content?: Array<{ text?: string }>
  }
  return data.content?.[0]?.text ?? ''
}

async function callGemini(prompt: string, system?: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not set')
  const fullPrompt = system ? `${system}\n\n${prompt}` : prompt
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
    },
  )
  const data = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
  }
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
}
