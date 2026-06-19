export interface PaMemoryFact {
  key: 'job' | 'concern' | 'interest' | 'name' | 'goal' | 'context' | 'other'
  value: string
  updatedAt: string
}

export interface PaMemory {
  facts: PaMemoryFact[]
}

export const PA_MEMORY_KEY = 'paMemory'

export const PA_MEMORY_MAX_FACTS = 7

export function buildPaMemoryBlock(memory: PaMemory): string {
  const memoryLine = memory.facts.map((f) => `${f.key}: ${f.value}`).join(' · ')
  return [
    `Fact người dùng đã chia sẻ (dùng tự nhiên, KHÔNG liệt kê ra): ${memoryLine}`,
    'Dùng memory để KHÔNG hỏi lại — không phải để "chứng minh mình nhớ".',
    'KHÔNG nhắc lại cảm xúc cũ. KHÔNG nói "tôi nhớ bạn kể...".',
    'Chỉ dùng fact để câu trả lời tự nhiên hơn.',
  ].join('\n')
}
