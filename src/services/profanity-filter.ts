/**
 * TNCB — Profanity Filter Service
 * Hybrid: high → block · medium → censor · low → pass
 * Local-first · lazy loadable · không API call
 */

import { Profanity } from '@2toad/profanity'
import { normalizeForFilter } from '../utils/vn-normalize'
import {
  DIRECT_WORDS,
  OFFENSIVE_PHRASES,
  CONTEXT_PAIRS,
  WHITELIST,
} from '../data/vn-offensive-words'

export type FilterConfidence = 'low' | 'medium' | 'high'

export interface FilterResult {
  isOffensive: boolean
  censored: string
  confidence: FilterConfidence
  reasons: string[]
}

const englishProfanity = new Profanity()

function censorText(original: string, normalized: string): string {
  const originalWords = original.split(/\s+/)
  const normalizedWords = normalized.split(/\s+/)

  return originalWords
    .map((word, i) => {
      const norm = normalizedWords[i] ?? ''
      if (DIRECT_WORDS.has(norm)) {
        return word.length > 0 ? word[0] + '*'.repeat(Math.max(word.length - 1, 2)) : '***'
      }
      return word
    })
    .join(' ')
}

function checkContext(tokens: string[]): number {
  let score = 0
  for (let i = 0; i < tokens.length; i++) {
    for (const pair of CONTEXT_PAIRS) {
      if (pair.word === tokens[i]) {
        const window = tokens.slice(Math.max(0, i - 3), i)
        if (window.some((t) => pair.triggers.includes(t))) {
          score += 1
        }
      }
    }
  }
  return score
}

function checkEnglishProfanity(raw: string): boolean {
  try {
    return englishProfanity.exists(raw)
  } catch {
    return false
  }
}

export function checkMessage(raw: string): FilterResult {
  if (!raw.trim()) {
    return { isOffensive: false, censored: raw, confidence: 'low', reasons: [] }
  }

  const normalized = normalizeForFilter(raw)
  const tokens = normalized.split(/\s+/)
  const reasons: string[] = []
  let score = 0

  if (WHITELIST.has(normalized)) {
    return { isOffensive: false, censored: raw, confidence: 'low', reasons: ['whitelisted'] }
  }

  for (const white of WHITELIST) {
    if (normalized.includes(white)) {
      return { isOffensive: false, censored: raw, confidence: 'low', reasons: ['partial whitelist'] }
    }
  }

  for (const token of tokens) {
    if (DIRECT_WORDS.has(token)) {
      score += 1
      reasons.push(`direct: ${token}`)
    }
  }

  for (let i = 0; i < tokens.length - 1; i++) {
    const bigram = `${tokens[i]} ${tokens[i + 1]}`
    if (DIRECT_WORDS.has(bigram)) {
      score += 1
      reasons.push(`bigram: ${bigram}`)
    }
  }

  const compact = normalized.replace(/\s/g, '')
  if (compact && DIRECT_WORDS.has(compact)) {
    score += 2
    reasons.push(`compact: ${compact}`)
  }

  for (const pattern of OFFENSIVE_PHRASES) {
    if (pattern.test(normalized)) {
      score += 1
      reasons.push(`phrase: ${pattern.source}`)
    }
  }

  const contextScore = checkContext(tokens)
  if (contextScore > 0) {
    score += contextScore
    reasons.push(`context: +${contextScore}`)
  }

  if (checkEnglishProfanity(raw)) {
    score += 1
    reasons.push('english: @2toad/profanity')
  }

  const confidence: FilterConfidence =
    score >= 2 ? 'high' : score === 1 ? 'medium' : 'low'

  const isOffensive = score >= 1
  let censored = raw

  if (isOffensive) {
    censored = censorText(raw, normalized)
    if (checkEnglishProfanity(raw)) {
      censored = englishProfanity.censor(censored)
    }
  }

  return { isOffensive, censored, confidence, reasons }
}
