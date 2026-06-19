import { detectCommIntent } from '../data/work-comm-kb'
import { KB_REGISTRY, type KBName, type KBZone, type RegistryKBEntry } from './kb-registry'
import { passesAgeFilter } from './user-age'

export type AssistantScope = 'PA' | 'WA' | 'MA'

/** PA topical KB — không gồm work-comm / leadership. */
export const PA_KB_NAMES: readonly KBName[] = [
  'life',
  'lifeskills',
  'relationships',
  'savoirfaire',
  'selfprotection',
]

/** WA topical KB — registry (work-comm inject riêng qua assistant-context). */
export const WA_KB_NAMES: readonly KBName[] = ['leadership']

// MA KB scope = rỗng ở giai đoạn này. KHÔNG gán relationships/lifeskills/selfprotection (đó là PA-owned).
// Nội dung MA sẽ vào qua các kênh khác, KHÔNG phải keyword-router:
//   - match-pair / match-block: LOOKUP theo pairKey/blockKey (M4, dùng getCompatSignal) — không keyword-route.
//   - four-horsemen: thêm ở M5 (detect dấu hiệu quan hệ độc hại → PROTECTIVE).
//   - relationship-insight: CHỜ boundary PA/MA ký (master + PA) mới quyết có thuộc MA scope không.
export const MA_KB_NAMES: readonly KBName[] = []

export interface KBUserProfile {
  mbtiType?: string
  age: number | null
}

function filterByScope(
  entries: RegistryKBEntry[],
  assistantScope: AssistantScope,
): RegistryKBEntry[] {
  const allowed =
    assistantScope === 'PA'
      ? PA_KB_NAMES
      : assistantScope === 'WA'
        ? WA_KB_NAMES
        : MA_KB_NAMES
  return entries.filter((e) => allowed.includes(e.kbName))
}

export interface KBHit {
  entry: RegistryKBEntry
  score: number
  matchedTrigger: string
}

const norm = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .trim()

const TRIGGER_STOP_WORDS = new Set([
  've',
  'cua',
  'toi',
  'ma',
  'va',
  'la',
  'co',
  'cho',
  'voi',
  'de',
  'noi',
  'lam',
  'thi',
  'se',
  'nen',
  'mot',
  'cai',
  'gi',
  'ai',
  'neu',
  'khi',
  'hay',
  'qua',
  'con',
  'duoc',
])

function significantTokens(trigger: string): string[] {
  return norm(trigger)
    .split(/\s+/)
    .filter((tok) => {
      if (TRIGGER_STOP_WORDS.has(tok)) return false
      return tok.length >= 3 || /[\d-]/.test(tok)
    })
}

function scoreTrigger(message: string, trigger: string): number {
  const m = norm(message)
  const t = norm(trigger)
  if (!t || t.length < 3) return 0
  if (m === t) return t.length + 50
  if (m.includes(t)) return t.length

  const tokens = t.split(/\s+/).filter((w) => w.length >= 2)
  if (tokens.length >= 2) {
    let mi = 0
    let matched = 0
    for (const tok of tokens) {
      const idx = m.indexOf(tok, mi)
      if (idx === -1) break
      matched++
      mi = idx + tok.length
    }
    if (matched === tokens.length) return tokens.join('').length

    const present = tokens.filter((tok) => m.includes(tok)).length
    const ratio = present / tokens.length
    if (ratio >= 0.75) return Math.floor(tokens.join('').length * ratio * 0.9)

    const sig = [...new Set(significantTokens(t))]
    if (sig.length >= 2) {
      const sigPresent = sig.filter((tok) => m.includes(tok)).length
      const sigRatio = sigPresent / sig.length
      if (sigRatio >= 0.75) return Math.floor(sig.join('').length * sigRatio * 0.88)
    }
  }

  return 0
}

function scoreEntry(message: string, entry: RegistryKBEntry): KBHit | null {
  let best = 0
  let matchedTrigger = ''
  for (const trigger of entry.triggers) {
    const s = scoreTrigger(message, trigger)
    if (s > best) {
      best = s
      matchedTrigger = trigger
    }
  }
  if (best === 0) return null
  return { entry, score: best, matchedTrigger }
}

function filterByAge(
  entries: RegistryKBEntry[],
  profile: KBUserProfile,
  strict: boolean,
): RegistryKBEntry[] {
  return entries.filter((e) => {
    if (e.zone === 'PROTECTIVE') return true
    if (e.ageGate != null && profile.age !== null && profile.age < e.ageGate) return false
    if (!strict) return true
    return passesAgeFilter(e.ageTags, profile.age, e.zone)
  })
}

/** GU phải vượt PROTECTIVE rõ rệt mới thắng khi cả hai zone đều match. */
export const GU_WINS_OVER_PROTECTIVE_RATIO = 1.5

export function guOutscoresProtective(gu: KBHit, protective: KBHit): boolean {
  return gu.score > protective.score * GU_WINS_OVER_PROTECTIVE_RATIO
}

function pickBestScoredHit(
  userText: string,
  entries: RegistryKBEntry[],
): KBHit | null {
  const hits: KBHit[] = []
  for (const entry of entries) {
    const hit = scoreEntry(userText, entry)
    if (hit) hits.push(hit)
  }
  if (hits.length === 0) return null

  const zoneRank = (z: KBZone): number => (z === 'PROTECTIVE' ? 2 : 1)
  hits.sort((a, b) => {
    const zd = zoneRank(b.entry.zone) - zoneRank(a.entry.zone)
    if (zd !== 0) return zd
    return b.score - a.score
  })
  return hits[0]!
}

function pickBestHit(
  userText: string,
  entries: RegistryKBEntry[],
): RegistryKBEntry | null {
  return pickBestScoredHit(userText, entries)?.entry ?? null
}

export function getZoneBestScoredHit(
  userText: string,
  profile: KBUserProfile,
  zone: KBZone,
  assistantScope: AssistantScope,
): KBHit | null {
  const base = filterByScope(
    KB_REGISTRY.filter((e) => e.zone === zone),
    assistantScope,
  )

  const strictCandidates = filterByAge(base, profile, true)
  const hit = pickBestScoredHit(userText, strictCandidates)
  if (hit) return hit

  if (profile.age === null) return null

  const relaxedCandidates = filterByAge(base, profile, false)
  return pickBestScoredHit(userText, relaxedCandidates)
}

/** work-comm match — chỉ WA scope (không chặn PROTECTIVE). */
export function commIntentWouldMatch(
  message: string,
  assistantScope: AssistantScope = 'PA',
): boolean {
  if (assistantScope !== 'WA') return false
  return detectCommIntent(message) !== null
}

/**
 * Quét registry — trả entry khớp nhất sau lọc tuổi mềm.
 * PROTECTIVE thắng GU; lọc tuổi không áp PROTECTIVE.
 * Không hit sau lọc tuổi → thử lại không lọc (user hỏi vẫn cho).
 */
export function detectRegistryHit(
  userText: string,
  profile: KBUserProfile,
  zoneFilter: KBZone | 'any' = 'any',
  assistantScope: AssistantScope = 'PA',
): RegistryKBEntry | null {
  const base = filterByScope(
    KB_REGISTRY.filter((e) => zoneFilter === 'any' || e.zone === zoneFilter),
    assistantScope,
  )

  const strictCandidates = filterByAge(base, profile, true)
  const hit = pickBestHit(userText, strictCandidates)
  if (hit) return hit

  if (profile.age === null) return null

  const relaxedCandidates = filterByAge(base, profile, false)
  return pickBestHit(userText, relaxedCandidates)
}

export function detectProtectiveHit(
  userText: string,
  profile: KBUserProfile,
  assistantScope: AssistantScope = 'PA',
): RegistryKBEntry | null {
  return detectRegistryHit(userText, profile, 'PROTECTIVE', assistantScope)
}

export function detectGUHit(
  userText: string,
  profile: KBUserProfile,
  assistantScope: AssistantScope = 'PA',
): RegistryKBEntry | null {
  return detectRegistryHit(userText, profile, 'GU', assistantScope)
}

/** @deprecated dùng detectRegistryHit / detectProtectiveHit / detectGUHit */
export function detectKBHit(
  userText: string,
  profile: KBUserProfile,
  assistantScope: AssistantScope = 'PA',
): RegistryKBEntry | null {
  return detectRegistryHit(userText, profile, 'any', assistantScope)
}

/** WA scope — leadership registry (+ comm qua resolveInjectedContext). */
export function detectWorkKBHit(
  userText: string,
  userAge: number | null,
  mbtiType?: string,
): RegistryKBEntry | null {
  return detectRegistryHit(
    userText,
    { mbtiType, age: userAge },
    'any',
    'WA',
  )
}
