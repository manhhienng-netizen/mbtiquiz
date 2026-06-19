import {
  ROLEPLAY_CASES,
  type CaseRole,
  type MbtiGroup,
  type RolePlayCase,
} from '../data/roleplay-case-studies'
import { db } from '../db/tncb-db'
import { getProgress } from './arena-progress'
import {
  generateAdaptiveCase,
  type AdaptiveCaseRole,
  type GeneratedCase,
} from './arena-case-generator'
import { isPremiumActive } from './arena-premium'
import { getDifficultyLevel, shouldEndArc } from './arena-arc'
import type { ArcEpisode, ArcState, NarrativeContext } from './arena-arc'
import {
  getActiveArcId,
  loadArcState,
  setActiveArcId,
} from './arena-arc-db'
import { generateArcEpisode } from './arena-case-generator'
import { getStaticArc, getStaticArcForRole } from './arena-static-arcs'
import { callLLM } from './llm-adapter'
import type { ChildTeenRolePlayA } from '../data/match/child/child-teen-roleplay-a'
import {
  buildMANextCasePrompt,
  checkTeenCrisisLevel,
  detectMAWeakness,
  getMAFewShot,
  getMAFewShotJson,
  runMAGuardrail,
  serveTeenStaticCase,
  TEEN_USE_STATIC_POOL,
  type MAChoiceRecord,
  type MAContext,
} from './match/ma-guardrail'

const FREE_CASE_LIMIT = 5
const FREE_ARC_LIMIT = 1
const PREMIUM_ARC_START = 2
const STORAGE_KEY = 'arena_completed'

export type ArenaFocus = CaseRole | 'random' | 'boss' | 'peer'

export interface ArenaContext {
  role?: string
  scenario?: string
  typePair?: string
  origin?: string
  mbtiGroup?: MbtiGroup
}

/** Map MBTI type → nhóm (chữ cái thứ 2+3). */
export function getMbtiGroup(mbtiType: string): MbtiGroup | null {
  const t = mbtiType.toUpperCase()
  if (t.length !== 4) return null
  if (!['N', 'S'].includes(t[1])) return null
  if (!['T', 'F'].includes(t[2])) return null
  const isN = t[1] === 'N'
  const isT = t[2] === 'T'
  if (isN && isT) return 'NT'
  if (isN && !isT) return 'NF'
  if (!isN && isT) return 'ST'
  return 'SF'
}

const GROUP_PREFS: Record<MbtiGroup, { tags: string[]; desc: string }> = {
  NT: { tags: ['strategy', 'conflict', 'decision'], desc: 'phức tạp · chiến lược · logic' },
  NF: { tags: ['feedback', 'relation', 'meaning'], desc: 'quan hệ · ý nghĩa · kết nối' },
  ST: { tags: ['process', 'result', 'problem'], desc: 'thực tế · cụ thể · giải quyết' },
  SF: { tags: ['team', 'harmony', 'support'], desc: 'hài hòa · team · quan tâm' },
}

/** Soft filter pool theo nhóm MBTI (fallback toàn pool). */
export function smartFilterByGroup(
  pool: RolePlayCase[],
  group: MbtiGroup,
  completedIds: string[],
): RolePlayCase[] {
  const prefs = GROUP_PREFS[group]

  const p1 = pool.filter(
    (c) =>
      !completedIds.includes(c.id) &&
      prefs.tags.some((t) => c.tags.includes(t)),
  )
  if (p1.length >= 1) return p1

  const p2 = pool.filter((c) => !completedIds.includes(c.id))
  if (p2.length >= 1) return p2

  return pool
}

/** Chọn role + pool cho smart mode (Home "Thử case mới"). */
export async function pickSmartArcEntry(
  mbtiType: string,
): Promise<{ role: CaseRole; pool: RolePlayCase[]; context: ArenaContext }> {
  const progress = await getProgress()
  const completedIds = Object.values(progress).flatMap((p) =>
    p ? p.choiceLog.map((c) => c.caseId) : [],
  )
  const group = getMbtiGroup(mbtiType)
  const pool = group
    ? smartFilterByGroup(ROLEPLAY_CASES, group, completedIds)
    : ROLEPLAY_CASES.filter((c) => !completedIds.includes(c.id))
  const picked = pool[Math.floor(Math.random() * pool.length)] ?? ROLEPLAY_CASES[0]
  const context: ArenaContext = {
    origin: 'smart',
    ...(group ? { mbtiGroup: group } : {}),
  }
  return { role: picked.role, pool, context }
}

/** Priority filter theo context SanTapPortal (fallback toàn pool). */
export function filterCases(
  pool: RolePlayCase[],
  context: ArenaContext,
): RolePlayCase[] {
  const { role, scenario, typePair } = context

  if (!role && !scenario) return pool

  if (role && scenario && typePair) {
    const p1 = pool.filter(
      (c) =>
        c.role === role &&
        c.tags.includes(scenario) &&
        c.tags.includes(typePair),
    )
    if (p1.length >= 2) return p1
  }

  if (role && scenario) {
    const p2 = pool.filter((c) => c.role === role && c.tags.includes(scenario))
    if (p2.length >= 2) return p2
  }

  if (role) {
    const p3 = pool.filter((c) => c.role === role)
    if (p3.length >= 1) return p3
  }

  return pool
}

export function nextCaseFromPool(
  session: ArenaSession,
  pool: RolePlayCase[],
): RolePlayCase | null {
  const remaining = pool.filter((c) => !session.servedCaseIds.includes(c.id))
  if (remaining.length === 0) return null
  return remaining[Math.floor(Math.random() * remaining.length)]
}

const MBTI_GROUP_HINTS: Record<MbtiGroup, string> = {
  NT: 'User thiên về phân tích hệ thống, ưa tình huống phức tạp có đánh đổi chiến lược.',
  NF: 'User quan tâm đến kết nối và ý nghĩa, ưa tình huống có chiều sâu quan hệ.',
  ST: 'User thiên thực tế, ưa tình huống cụ thể có kết quả đo được.',
  SF: 'User quan tâm đến hài hòa nhóm, ưa tình huống có yếu tố cảm xúc và hỗ trợ.',
}

/** Gợi ý context cho AI arc (premium tập 2+). */
export function buildArenaContextHint(context?: ArenaContext): string | undefined {
  if (!context) return undefined

  const parts: string[] = []
  if (context.mbtiGroup) parts.push(MBTI_GROUP_HINTS[context.mbtiGroup])
  if (context.origin && context.origin !== 'smart') {
    parts.push(`User đến từ màn ${context.origin}.`)
  }
  if (context.scenario || context.typePair || context.origin) {
    parts.push(`Tình huống liên quan: role=${context.role || 'chung'}`)
    if (context.scenario) parts.push(`scenario=${context.scenario}`)
    if (context.typePair) parts.push(`typePair=${context.typePair}`)
    parts.push('Tập đầu nên bám sát context này.')
  }

  return parts.length ? parts.join(' ') : undefined
}

export interface ArenaSession {
  focusRole: ArenaFocus
  servedCaseIds: string[]
  completedCount: number
  /** `'match'` kích hoạt nhánh MA trong nextCaseAdaptive */
  context?: 'work' | 'match'
  maContext?: MAContext
  painId?: string
  choiceHistory?: MAChoiceRecord[]
  /** Freeform text user gõ (nếu có) — dùng teen crisis check */
  lastFreeformInput?: string
}

/** Case MA sân tập — pool tĩnh teen hoặc JSON AI (format roleplay MA) */
export type MAArenaCase =
  | (ChildTeenRolePlayA & { isCrisis?: boolean })
  | Record<string, unknown>

/** Session-scoped completed case ids (sessionStorage). */
export function getStoredCompleted(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]') as string[]
  } catch {
    return []
  }
}

export function markStoredCompleted(caseId: string): void {
  const completed = getStoredCompleted()
  if (!completed.includes(caseId)) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...completed, caseId]))
  }
}

export function getArenaSession(role?: CaseRole): RolePlayCase[] {
  return role ? ROLEPLAY_CASES.filter((c) => c.role === role) : ROLEPLAY_CASES
}

export function nextCaseFromStorage(role?: CaseRole): RolePlayCase | null {
  const pool = getArenaSession(role)
  const completed = getStoredCompleted()
  const remaining = pool.filter((c) => !completed.includes(c.id))
  return remaining[0] ?? null
}

export function isPaywalledByCount(completedCount: number): boolean {
  return completedCount >= FREE_CASE_LIMIT
}

function getPool(focus: ArenaFocus): RolePlayCase[] {
  if (focus === 'random') return ROLEPLAY_CASES
  if (focus === 'peer') {
    return ROLEPLAY_CASES.filter(
      (c) =>
        c.title.toLowerCase().includes('đồng nghiệp') ||
        c.tags.some((t) => t.includes('peer')),
    )
  }
  if (focus === 'boss') {
    return ROLEPLAY_CASES.filter(
      (c) =>
        c.role === 'NV' &&
        (c.title.toLowerCase().includes('sếp') ||
          ['NV-01', 'NV-03', 'NV-07'].includes(c.id)),
    )
  }
  return ROLEPLAY_CASES.filter((c) => c.role === focus)
}

export function createSession(focusRole: ArenaFocus): ArenaSession {
  return { focusRole, servedCaseIds: [], completedCount: 0 }
}

export function nextCase(session: ArenaSession, pool?: RolePlayCase[]): RolePlayCase | null {
  const casePool = pool ?? getPool(session.focusRole)
  return nextCaseFromPool(session, casePool)
}

export function markCompleted(session: ArenaSession, caseId: string): ArenaSession {
  return {
    ...session,
    servedCaseIds: [...session.servedCaseIds, caseId],
    completedCount: session.completedCount + 1,
  }
}

export function isPaywalled(session: ArenaSession): boolean {
  return session.completedCount >= FREE_CASE_LIMIT
}

function pickRandomAdaptiveRole(): AdaptiveCaseRole {
  const roles: AdaptiveCaseRole[] = ['MG', 'KH', 'DT', 'VT']
  return roles[Math.floor(Math.random() * roles.length)]!
}

function resolveAdaptiveRole(focus: ArenaFocus): AdaptiveCaseRole {
  if (focus === 'random') return pickRandomAdaptiveRole()
  return focus as AdaptiveCaseRole
}

const MA_CASE_MAX_RETRIES = 2

/** Premium: AI sinh case adaptive (fallback pool nếu AI fail) */
export async function nextCaseAdaptive(
  session: ArenaSession,
  mbtiType?: string,
  arenaContext?: ArenaContext,
): Promise<RolePlayCase | GeneratedCase | MAArenaCase | null> {
  if (session.context === 'match') {
    const maCtx = (session.maContext ?? 'spouse') as MAContext

    if (maCtx === 'child-teen' && TEEN_USE_STATIC_POOL) {
      const crisisLevel = checkTeenCrisisLevel(
        session.painId ?? '',
        session.lastFreeformInput,
      )

      if (crisisLevel === 'primary') {
        const teenCase = serveTeenStaticCase(session.servedCaseIds)
        if (!teenCase) return null
        return { ...teenCase, isCrisis: true }
      }

      if (crisisLevel === 'secondary') {
        return serveTeenStaticCase(session.servedCaseIds, 'DISTANCE')
      }

      return serveTeenStaticCase(session.servedCaseIds)
    }

    const weakness = detectMAWeakness(session.choiceHistory ?? [])
    const fewShot = getMAFewShotJson(maCtx)
    const prompt = buildMANextCasePrompt({
      context: maCtx,
      weakness,
      painId: session.painId ?? 'general',
      previousChoices: (session.choiceHistory ?? []).map((h) => h.choice),
      fewShotCases: fewShot,
    })

    for (let attempt = 0; attempt <= MA_CASE_MAX_RETRIES; attempt++) {
      try {
        const raw = await callLLM(prompt, '')
        const cleaned = raw.replace(/```json|```/g, '').trim()
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
        if (!jsonMatch) continue

        const guardrailResult = runMAGuardrail(jsonMatch[0])
        if (!guardrailResult.pass) {
          console.warn(
            `[Arena] MA guardrail fail: ${guardrailResult.reason}, retry ${attempt}`,
          )
          continue
        }

        return JSON.parse(jsonMatch[0]) as Record<string, unknown>
      } catch (e) {
        console.warn('[Arena] MA generate attempt failed:', e)
      }
    }

    if (maCtx === 'child-teen') {
      return serveTeenStaticCase(session.servedCaseIds)
    }
    return getMAFewShot(maCtx)[0] ?? null
  }

  const role = resolveAdaptiveRole(session.focusRole)

  const aiCase = await generateAdaptiveCase(role, mbtiType)
  if (aiCase) return aiCase

  const pool = arenaContext ? filterCases(ROLEPLAY_CASES, arenaContext) : undefined
  return nextCase(session, pool)
}

/** Arc paywall: tập 1 free · tập 2+ cần premium */
export function isArcPaywalled(arcNumber: number): boolean {
  if (arcNumber <= FREE_ARC_LIMIT) return false
  return !isPremiumActive()
}

/** Lấy tập tiếp theo (B6: tập 1 tĩnh · tập 2+ AI = B7) */
export async function nextArc(currentArcNumber: number): Promise<ArcState | null> {
  const nextNum = currentArcNumber + 1

  if (nextNum <= FREE_ARC_LIMIT) {
    return getStaticArc(nextNum - 1)
  }

  if (isArcPaywalled(nextNum)) {
    return null
  }

  return null
}

/** Khởi tạo tập 1 tĩnh cho role */
export function initStaticArc(
  role: CaseRole,
  arenaContext?: ArenaContext,
): ArcState | null {
  const arc = getStaticArcForRole(role)
  if (!arc) return null
  if (arenaContext && Object.values(arenaContext).some(Boolean)) {
    arc.context = { ...arc.context, arenaContext }
  }
  setActiveArcId(role, arc.context.arcId)
  return arc
}

/** Episode đã xử xong (choice hoặc freeform) */
export function isEpisodeResolved(ep: ArcEpisode): boolean {
  return !!ep.resolvedChoiceId || !!ep.freeformInput
}

/** Index episode đang chơi (chưa resolve) */
export function getCurrentEpisodeIndex(state: ArcState): number {
  const idx = state.episodes.findIndex((ep) => !isEpisodeResolved(ep))
  return idx >= 0 ? idx : Math.max(0, state.episodes.length - 1)
}

export function isStaticArcFinished(state: ArcState): boolean {
  return (
    state.source === 'static' &&
    state.episodes.length > 0 &&
    state.episodes.every((ep) => isEpisodeResolved(ep))
  )
}

export function buildOutcomeText(
  case_: RolePlayCase | GeneratedCase,
  choiceId: 'A' | 'B' | 'C',
): string {
  const consequence = case_.consequences.find((c) => c.choiceId === choiceId)
  if (!consequence) return ''
  return `${consequence.immediate} ${consequence.later}`.trim()
}

/** Tạo shell arc AI (tập 2+) từ tập trước */
export function createAiArcShell(prevArc: ArcState, lastOutcome: string): ArcState {
  const arcNumber = prevArc.arcNumber + 1
  return {
    arcNumber,
    source: 'ai',
    context: {
      arcId: `ai-${prevArc.context.role}-arc${arcNumber}-${Date.now()}`,
      role: prevArc.context.role,
      episodeNumber: 0,
      characters: { ...prevArc.context.characters },
      previousOutcome: lastOutcome,
      difficultyLevel: 1,
      isComplete: false,
      arenaContext: prevArc.context.arenaContext,
    },
    episodes: [],
  }
}

/** Sinh episode tiếp trong arc AI (premium) */
export async function nextArcEpisode(
  arcState: ArcState,
  lastOutcome: string,
): Promise<{ case: GeneratedCase; ctx: NarrativeContext; arcState: ArcState } | null> {
  const nextEpisodeNum = arcState.episodes.length + 1

  const ctx: NarrativeContext = {
    ...arcState.context,
    episodeNumber: nextEpisodeNum,
    previousOutcome: lastOutcome,
    difficultyLevel: getDifficultyLevel(nextEpisodeNum),
  }

  const c = await generateArcEpisode(
    ctx,
    buildArenaContextHint(ctx.arenaContext),
  )
  if (!c) return null

  ctx.isComplete = c.arcComplete === true

  const updated: ArcState = {
    ...arcState,
    context: { ...ctx },
    episodes: [
      ...arcState.episodes,
      {
        episodeNumber: nextEpisodeNum,
        case: c,
        outcome: '',
      },
    ],
  }

  setActiveArcId(arcState.context.role, updated.context.arcId)
  return { case: c, ctx, arcState: updated }
}

/** Resume arc đã lưu hoặc null */
export async function resumeArc(role: CaseRole): Promise<ArcState | null> {
  const arcId = getActiveArcId(role)
  if (!arcId) return null
  return loadArcState(arcId)
}

function isArcInProgress(state: ArcState): boolean {
  if (state.source === 'static') {
    return !isStaticArcFinished(state)
  }
  const resolvedCount = state.episodes.filter((ep) => isEpisodeResolved(ep)).length
  if (state.episodes.length === 0) return true
  if (state.episodes.some((ep) => !isEpisodeResolved(ep))) return true
  return !shouldEndArc(state.context, resolvedCount)
}

/** Tìm arc dở gần nhất (mọi role) — Home "Tiếp tục". */
export async function findResumableArc(): Promise<ArcState | null> {
  const roles: CaseRole[] = ['MG', 'KH', 'DT', 'VT', 'NV']
  let best: { state: ArcState; updatedAt: string } | null = null

  for (const r of roles) {
    const arcId = getActiveArcId(r)
    if (!arcId) continue
    try {
      const row = await db.arenaArcState.get(arcId)
      if (!row?.state || !isArcInProgress(row.state)) continue
      if (!best || row.updatedAt > best.updatedAt) {
        best = { state: row.state, updatedAt: row.updatedAt }
      }
    } catch {
      // skip
    }
  }

  return best?.state ?? null
}

export { shouldEndArc }
export { FREE_CASE_LIMIT, FREE_ARC_LIMIT, PREMIUM_ARC_START }
export type { GeneratedCase }
