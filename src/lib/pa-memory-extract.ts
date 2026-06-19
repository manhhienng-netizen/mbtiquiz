import {
  PA_MEMORY_MAX_FACTS,
  type PaMemory,
  type PaMemoryFact,
} from '../data/pa-memory'

const EMOTIONAL_WORDS =
  /\b(buồn|lo|sợ|mệt|stress|căng thẳng|lo lắng|tủi|chán nản|bực|tức)\b/i

const FACT_PATTERNS: { key: PaMemoryFact['key']; patterns: RegExp[] }[] = [
  {
    key: 'job',
    patterns: [
      /(?:tôi|mình)\s+(?:đang\s+)?(?:làm|là)\s+([^\.,]+?)(?:\s+ở\s+|\.|,|$)/i,
      /(?:công việc|nghề|làm)\s+(?:của\s+(?:tôi|mình)\s+)?(?:là\s+)?([^\.,]+)/i,
    ],
  },
  {
    key: 'name',
    patterns: [
      /(?:tên|gọi)\s+(?:tôi|mình)\s+(?:là\s+)?([A-Za-zÀ-ỹ]+)/i,
      /(?:mình\s+là|tôi\s+là)\s+([A-Za-zÀ-ỹ]{2,20})(?:\s|$)/i,
    ],
  },
  {
    key: 'interest',
    patterns: [
      /(?:tôi|mình)\s+(?:thích|yêu thích|đam mê)\s+([^\.,]+)/i,
      /(?:sở thích)\s+(?:của\s+(?:tôi|mình)\s+)?(?:là\s+)?([^\.,]+)/i,
    ],
  },
  {
    key: 'goal',
    patterns: [
      /(?:tôi|mình)\s+(?:muốn|đang\s+cố|đang\s+học)\s+([^\.,]+)/i,
      /(?:mục tiêu|dự định)\s+(?:của\s+(?:tôi|mình)\s+)?(?:là\s+)?([^\.,]+)/i,
    ],
  },
]

function shouldSkipExtract(userMsg: string): boolean {
  const trimmed = userMsg.trim()
  if (!trimmed || trimmed.includes('?')) return true
  if (EMOTIONAL_WORDS.test(trimmed)) return true
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length
  if (wordCount < 3) return true
  return false
}

export function extractFact(userMsg: string): PaMemoryFact | null {
  if (shouldSkipExtract(userMsg)) return null

  for (const { key, patterns } of FACT_PATTERNS) {
    for (const pattern of patterns) {
      const m = userMsg.match(pattern)
      const value = m?.[1]?.trim()
      if (value && value.length > 1 && value.length < 50) {
        return {
          key,
          value,
          updatedAt: new Date().toISOString(),
        }
      }
    }
  }
  return null
}

export function mergeFactIntoMemory(
  existing: PaMemory | null,
  fact: PaMemoryFact,
): PaMemory {
  const facts = existing?.facts ?? []
  const updated = facts.filter((f) => f.key !== fact.key)
  updated.push(fact)
  const trimmed = updated
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, PA_MEMORY_MAX_FACTS)
  return { facts: trimmed }
}
