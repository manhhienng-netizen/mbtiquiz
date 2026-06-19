import Dexie, { type Table } from 'dexie'
import type { MbtiType } from '../data/manager-coaching-b2b'
import type { ScaleBand } from '../data/scale-tint-content'
import type { Element, QuizResult } from '../data/quiz-types'
import type { Big5Profile } from '../lib/big5-scoring'
import type { DiscProfile } from '../lib/disc-scoring'
import type { PaMemory, PaMemoryFact } from '../data/pa-memory'
import { isValidPADomain, type PADomain } from '../data/pa-domains'
import type { ArenaProgressRole, RoleProgress } from '../lib/arena-progress'
import type { StoredArcState } from '../lib/arena-arc-db'
import type { WorkGoal } from '../lib/work-goal'
import type { MAGoal } from '../lib/match-goal'
import {
  computeCharacter,
  type CharacterResult,
} from '../engine/character-engine'

// ── Types ──────────────────────────────────────────

export interface MBTIRecord {
  id?: number
  mbtiType: string
  identity: 'A' | 'T'
  pcc: { EI: number; SN: number; TF: number; JP: number }
  archetypeKey: string
  archetypeLabel: string
  coreTraitLabels: string[]
  convergenceScore: number
  takenAt: string
}

export interface SpiritualRecord {
  id?: number
  fullName: string
  birthDate: string
  birthHour: string
  lunarYear: number
  canYear: string
  chiYear: string
  nhatChu: string
  element: string
  cungMenh: string
  lifePath: number
  savedAt: string
}

export interface CurrentCharacterRecord {
  id: 1
  archetypeKey: string
  archetypeLabel: string
  coreTraitLabels: string[]
  personaCompressed: string
  growthZoneShadow: string
  convergenceScore: number
  hasSpiritualData: boolean
  updatedAt: string
}

export type WorkLevel = 'fresher' | 'junior' | 'senior' | 'lead' | 'manager'

export interface WorkProfile {
  id?: number
  userId: string
  occupation: string
  level: WorkLevel
  scaleBand?: ScaleBand
  updatedAt: number
}

export interface ManagedPerson {
  id?: number
  name: string
  type: MbtiType
  createdAt: number
}

export type TeamSize = '1-5' | '6-15' | '16-30' | '30+'

export type TeamChallenge =
  | 'communication'
  | 'motivation'
  | 'delegation'
  | 'retention'

export interface TeamContext {
  id: 1
  size: TeamSize
  challenge: TeamChallenge
  updatedAt: number
}

export interface Big5ProfileRecord extends Big5Profile {
  id: 1
}

export interface DiscProfileRecord extends DiscProfile {
  id: 1
}

export interface TeamMember {
  name: string
  mbti: string
  disc?: string
}

export interface TeamProfile {
  id?: number
  members: TeamMember[]
  goal: string
  currentBlocker: string
  createdAt: string
  milestones: { date: string; note: string; status: string }[]
}

export interface PaMemoryRecord extends PaMemory {
  id: 1
}

export interface DailyNudgeSeenRecord {
  id: 1
  date: string
}

export type TypeSource = 'quiz' | 'self-select'

export type AttachmentSignalLevel = 'low' | 'medium' | 'high'

export interface PersonaData {
  id: 1
  mbtiType?: string
  typeSource?: TypeSource
  updatedAt?: string
  attachmentAnxiety?: AttachmentSignalLevel
  attachmentAvoidance?: AttachmentSignalLevel
}

export interface TipProgressRecord {
  id: 1
  seenTipIds: string[]
  currentPack: number
}

export interface PAPrefs {
  selectedDomains: PADomain[]
  onboardingDone: boolean
  onboardingAnswers?: {
    q1?: string
    q2?: string
    q3?: string
  }
}

export interface PAPrefsRecord extends PAPrefs {
  id: 1
}

export type { PADomain } from '../data/pa-domains'

export const WORK_LEVEL_LABELS: Record<WorkLevel, string> = {
  fresher: 'Mới đi làm',
  junior: 'Có kinh nghiệm',
  senior: 'Thâm niên',
  lead: 'Trưởng nhóm',
  manager: 'Quản lý',
}

// ── Database class ─────────────────────────────────

export class TNCBDatabase extends Dexie {
  mbtiHistory!: Table<MBTIRecord>
  spiritual!: Table<SpiritualRecord>
  currentCharacter!: Table<CurrentCharacterRecord>
  workProfile!: Table<WorkProfile>
  managedPeople!: Table<ManagedPerson>
  teamContext!: Table<TeamContext>
  big5Profile!: Table<Big5ProfileRecord>
  discProfile!: Table<DiscProfileRecord>
  teamProfile!: Table<TeamProfile>
  paMemory!: Table<PaMemoryRecord>
  dailyNudgeSeen!: Table<DailyNudgeSeenRecord>
  persona!: Table<PersonaData>
  tipProgress!: Table<TipProgressRecord>
  arenaProgress!: Table<RoleProgress, ArenaProgressRole>
  arenaArcState!: Table<StoredArcState, string>
  workGoal!: Table<WorkGoal, string>
  matchGoals!: Table<MAGoal, number>
  paPrefs!: Table<PAPrefsRecord>

  constructor() {
    super('tncb-db')

    this.version(1).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
    })

    this.version(2).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
    })

    this.version(3).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
    })

    this.version(4).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
    })

    this.version(5).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
    })

    this.version(6).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
    })

    this.version(7).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
    })

    this.version(8).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
    })

    this.version(9).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
    })

    this.version(10).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
    })

    this.version(11).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
      tipProgress: 'id',
    })

    this.version(12).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
      tipProgress: 'id',
      arenaProgress: '&role',
    })

    this.version(13).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
      tipProgress: 'id',
      arenaProgress: '&role',
      arenaArcState: '&arcId',
    })

    this.version(14).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
      tipProgress: 'id',
      arenaProgress: '&role',
      arenaArcState: '&arcId',
      workGoal: 'id',
    })

    this.version(15).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
      tipProgress: 'id',
      arenaProgress: '&role',
      arenaArcState: '&arcId',
      workGoal: 'id',
      matchGoals: '++id, relationship, updatedAt',
    })

    this.version(16).stores({
      mbtiHistory: '++id, mbtiType, takenAt',
      spiritual: '++id, savedAt',
      currentCharacter: 'id',
      workProfile: '++id, userId',
      managedPeople: '++id, type, createdAt',
      teamContext: '&id',
      big5Profile: '&id',
      discProfile: '&id',
      teamProfile: '++id, createdAt',
      paMemory: '&id',
      dailyNudgeSeen: '&id',
      persona: 'id',
      tipProgress: 'id',
      arenaProgress: '&role',
      arenaArcState: '&arcId',
      workGoal: 'id',
      matchGoals: '++id, relationship, updatedAt',
      paPrefs: 'id',
    })
  }
}

export const db = new TNCBDatabase()

// ── Mappers ────────────────────────────────────────

export function mapCharacterToCurrentRecord(
  character: CharacterResult,
): Omit<CurrentCharacterRecord, 'id' | 'updatedAt'> {
  return {
    archetypeKey: character.archetypeKey,
    archetypeLabel: character.archetypeLabel,
    coreTraitLabels: character.coreTraitLabels,
    personaCompressed: character.personaCompressed,
    growthZoneShadow: character.growthZone.join(' · '),
    convergenceScore: character.convergenceScore,
    hasSpiritualData: character.hasSpiritualData,
  }
}

// ── Helper functions ───────────────────────────────

export async function saveMBTIResult(
  result: Omit<MBTIRecord, 'id' | 'takenAt'>,
): Promise<void> {
  await db.mbtiHistory.add({
    ...result,
    takenAt: new Date().toISOString(),
  })
}

export async function saveSpiritualResult(
  data: Omit<SpiritualRecord, 'id' | 'savedAt'>,
): Promise<void> {
  await db.spiritual.clear()
  await db.spiritual.add({
    ...data,
    savedAt: new Date().toISOString(),
  })
}

export async function saveCurrentCharacter(
  data: Omit<CurrentCharacterRecord, 'id' | 'updatedAt'>,
): Promise<void> {
  await db.currentCharacter.put({
    id: 1,
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

export async function getSpiritualResult(): Promise<SpiritualRecord | undefined> {
  return db.spiritual.orderBy('savedAt').last()
}

export async function getLatestMBTI(): Promise<MBTIRecord | undefined> {
  return db.mbtiHistory.orderBy('takenAt').last()
}

export async function getMBTIHistory(): Promise<MBTIRecord[]> {
  return db.mbtiHistory.orderBy('takenAt').toArray()
}

export async function getCurrentCharacter(): Promise<
  CurrentCharacterRecord | undefined
> {
  return db.currentCharacter.get(1)
}

export async function hasSpiritualData(): Promise<boolean> {
  const count = await db.spiritual.count()
  return count > 0
}

export async function clearAllData(): Promise<void> {
  await db.mbtiHistory.clear()
  await db.spiritual.clear()
  await db.currentCharacter.clear()
  await db.workProfile.clear()
  await db.managedPeople.clear()
  await db.teamContext.clear()
  await db.big5Profile.clear()
  await db.discProfile.clear()
  await db.teamProfile.clear()
  await db.paMemory.clear()
  await db.dailyNudgeSeen.clear()
  await db.persona.clear()
  await db.tipProgress.clear()
  await db.paPrefs.clear()
}

export async function getPersona(): Promise<PersonaData | undefined> {
  let persona = await db.persona.get(1)

  if (!persona?.mbtiType) {
    const mbti = await getLatestMBTI()
    if (!mbti?.mbtiType) return persona

    persona = {
      id: 1,
      mbtiType: mbti.mbtiType,
      typeSource: 'quiz',
      updatedAt: new Date().toISOString(),
    }
    await db.persona.put(persona)
    return persona
  }

  if (persona.mbtiType && !persona.typeSource) {
    persona = {
      ...persona,
      typeSource: 'quiz',
      updatedAt: new Date().toISOString(),
    }
    await db.persona.put(persona)
  }

  return persona
}

export async function savePersona(
  data: Partial<Omit<PersonaData, 'id'>> & Pick<PersonaData, 'mbtiType'>,
): Promise<void> {
  const existing = await db.persona.get(1)
  await db.persona.put({
    id: 1,
    ...existing,
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

const DEFAULT_PA_PREFS: PAPrefs = {
  selectedDomains: [],
  onboardingDone: false,
}

function isValidPADomainList(value: unknown): value is PADomain[] {
  if (!Array.isArray(value)) return false
  return value.every((item) => typeof item === 'string' && isValidPADomain(item))
}

export async function getPAPrefs(): Promise<PAPrefs> {
  const row = await db.paPrefs.get(1)
  if (!row) return { ...DEFAULT_PA_PREFS }

  return {
    selectedDomains: isValidPADomainList(row.selectedDomains)
      ? row.selectedDomains
      : [],
    onboardingDone: row.onboardingDone === true,
    onboardingAnswers: row.onboardingAnswers,
  }
}

export async function savePAPrefs(prefs: PAPrefs): Promise<void> {
  await db.paPrefs.put({ id: 1, ...prefs })
}

export async function saveAttachmentSignal(signal: {
  attachmentAnxiety: AttachmentSignalLevel
  attachmentAvoidance: AttachmentSignalLevel
}): Promise<void> {
  const existing = await db.persona.get(1)
  await db.persona.put({
    id: 1,
    ...existing,
    attachmentAnxiety: signal.attachmentAnxiety,
    attachmentAvoidance: signal.attachmentAvoidance,
    updatedAt: new Date().toISOString(),
  })
}

export async function getTipProgress(): Promise<{
  seenTipIds: string[]
  currentPack: number
}> {
  const row = await db.tipProgress.get(1)
  return {
    seenTipIds: Array.isArray(row?.seenTipIds) ? row.seenTipIds : [],
    currentPack: typeof row?.currentPack === 'number' ? row.currentPack : 1,
  }
}

export async function saveTipProgress(
  progress: Pick<TipProgressRecord, 'seenTipIds' | 'currentPack'>,
): Promise<void> {
  await db.tipProgress.put({ id: 1, ...progress })
}

export async function recordTipSeen(tipId: string): Promise<void> {
  const progress = await getTipProgress()
  if (progress.seenTipIds.includes(tipId)) return
  await saveTipProgress({
    ...progress,
    seenTipIds: [...progress.seenTipIds, tipId],
  })
}

function isValidPaMemoryFact(raw: unknown): raw is PaMemoryFact {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  const keys = ['job', 'concern', 'interest', 'name', 'goal', 'context', 'other']
  return (
    typeof o.key === 'string' &&
    keys.includes(o.key) &&
    typeof o.value === 'string' &&
    o.value.trim().length > 0 &&
    typeof o.updatedAt === 'string'
  )
}

export async function getPaMemory(): Promise<PaMemory | null> {
  try {
    const row = await db.paMemory.get(1)
    if (!row?.facts?.length) return null
    const facts = row.facts.filter(isValidPaMemoryFact)
    return facts.length ? { facts } : null
  } catch {
    return null
  }
}

export async function savePaMemory(memory: PaMemory): Promise<void> {
  await db.paMemory.put({ id: 1, facts: memory.facts })
}

export async function clearPaMemory(): Promise<void> {
  await db.paMemory.clear()
}

export async function getDailyNudgeSeen(): Promise<{ date: string } | null> {
  try {
    const row = await db.dailyNudgeSeen.get(1)
    if (row?.date && typeof row.date === 'string') {
      return { date: row.date }
    }
    return null
  } catch {
    return null
  }
}

export async function markDailyNudgeSeen(): Promise<void> {
  await db.dailyNudgeSeen.put({
    id: 1,
    date: new Date().toDateString(),
  })
}

export async function clearDailyNudgeSeen(): Promise<void> {
  await db.dailyNudgeSeen.clear()
}

function isValidBig5Score(value: unknown): value is number {
  return typeof value === 'number' && value >= 1 && value <= 5
}

function isValidBig5Profile(raw: unknown): raw is Big5Profile {
  if (!raw || typeof raw !== 'object') return false
  const o = raw as Record<string, unknown>
  return (
    isValidBig5Score(o.O) &&
    isValidBig5Score(o.C) &&
    isValidBig5Score(o.E) &&
    isValidBig5Score(o.A) &&
    isValidBig5Score(o.N)
  )
}

export async function getBig5Profile(): Promise<Big5Profile | null> {
  try {
    const row = await db.big5Profile.get(1)
    if (isValidBig5Profile(row)) {
      return {
        O: row.O,
        C: row.C,
        E: row.E,
        A: row.A,
        N: row.N,
        completedAt:
          typeof row.completedAt === 'string'
            ? row.completedAt
            : new Date().toISOString(),
      }
    }
    return null
  } catch {
    return null
  }
}

export async function saveBig5Profile(profile: Big5Profile): Promise<void> {
  await db.big5Profile.put({ id: 1, ...profile })
}

export { loadDiscProfile, saveDiscProfileToDb } from '../lib/disc-db-helper'

/** @deprecated Prefer saveDiscProfileToDb from disc-db-helper */
export { saveDiscProfileToDb as saveDiscProfile } from '../lib/disc-db-helper'

export function defaultWorkUserId(): string {
  return 'default'
}

export async function saveWorkProfile(
  profile: Omit<WorkProfile, 'id'>,
): Promise<void> {
  const existing = await db.workProfile.where('userId').equals(profile.userId).first()
  const next: Omit<WorkProfile, 'id'> = { ...profile }
  if (!next.scaleBand) {
    delete next.scaleBand
  }
  if (existing?.id != null) {
    await db.workProfile.put({ ...existing, ...next, id: existing.id })
    return
  }
  await db.workProfile.add(next)
}

export async function getWorkProfile(
  userId: string,
): Promise<WorkProfile | undefined> {
  return db.workProfile.where('userId').equals(userId).first()
}

export async function addManagedPerson(
  name: string,
  type: MbtiType,
): Promise<number> {
  return db.managedPeople.add({
    name: name.trim(),
    type,
    createdAt: Date.now(),
  })
}

export async function listManagedPeople(): Promise<ManagedPerson[]> {
  return db.managedPeople.orderBy('createdAt').reverse().toArray()
}

export async function getManagedPerson(
  id: number,
): Promise<ManagedPerson | undefined> {
  return db.managedPeople.get(id)
}

export async function deleteManagedPerson(id: number): Promise<void> {
  await db.managedPeople.delete(id)
}

export async function getTeamContext(): Promise<TeamContext | undefined> {
  return db.teamContext.get(1)
}

export async function saveTeamContext(
  ctx: Omit<TeamContext, 'id' | 'updatedAt'>,
): Promise<void> {
  await db.teamContext.put({
    id: 1,
    ...ctx,
    updatedAt: Date.now(),
  })
}

const NGUYEN_HANH = new Set<string>(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'])

function toElement(value: string | undefined): Element | undefined {
  if (!value || !NGUYEN_HANH.has(value)) return undefined
  return value as Element
}

/** Rebuild QuizResult từ Dexie khi localStorage trống */
export function quizResultFromDexie(
  mbti?: MBTIRecord,
  spiritual?: SpiritualRecord | null,
): QuizResult | null {
  if (!mbti && !spiritual) return null

  const result: QuizResult = {
    completedAt: mbti?.takenAt ?? spiritual?.savedAt ?? new Date().toISOString(),
  }

  if (mbti) {
    result.mbtiType = mbti.mbtiType as QuizResult['mbtiType']
    result.identity = mbti.identity
    result.pcc = mbti.pcc
  }

  if (spiritual) {
    result.fullName = spiritual.fullName
    result.birthDate = spiritual.birthDate
    result.birthHour = spiritual.birthHour || undefined
    result.lunarYear = spiritual.lunarYear
    result.canYear = spiritual.canYear
    result.chiYear = spiritual.chiYear
    result.nhatChu = spiritual.nhatChu
    result.element = toElement(spiritual.element)
    result.cungMenh = spiritual.cungMenh || undefined
    result.lifePath = spiritual.lifePath
  }

  if (!mbti && spiritual) {
    result.spiritualOnly = true
  }

  return result
}

function pccMatches(
  a: { EI: number; SN: number; TF: number; JP: number },
  b: { EI: number; SN: number; TF: number; JP: number },
): boolean {
  return a.EI === b.EI && a.SN === b.SN && a.TF === b.TF && a.JP === b.JP
}

/** Ghi QuizResult vào Dexie — idempotent khi mở /result */
export async function syncQuizResultToDexie(result: QuizResult): Promise<void> {
  if (result.mbtiType && result.identity && result.pcc) {
    const latest = await getLatestMBTI()
    const alreadySynced =
      latest &&
      latest.mbtiType === result.mbtiType &&
      latest.identity === result.identity &&
      pccMatches(latest.pcc, result.pcc)

    const character = computeCharacter(result)
    if (!alreadySynced) {
      await saveMBTIResult({
        mbtiType: result.mbtiType,
        identity: result.identity,
        pcc: result.pcc,
        archetypeKey: character.archetypeKey,
        archetypeLabel: character.archetypeLabel,
        coreTraitLabels: character.coreTraitLabels,
        convergenceScore: character.convergenceScore,
      })
    }
    await saveCurrentCharacter(mapCharacterToCurrentRecord(character))
  }

  if (result.fullName && result.birthDate) {
    await saveSpiritualResult({
      fullName: result.fullName,
      birthDate: result.birthDate,
      birthHour: result.birthHour ?? '',
      lunarYear: result.lunarYear ?? 0,
      canYear: result.canYear ?? '',
      chiYear: result.chiYear ?? '',
      nhatChu: result.nhatChu ?? '',
      element: result.element ?? '',
      cungMenh: result.cungMenh ?? '',
      lifePath: result.lifePath ?? 0,
    })
  }
}

export async function saveTeamProfile(
  profile: Omit<TeamProfile, 'id'>,
): Promise<number> {
  return db.teamProfile.add(profile as TeamProfile)
}

export async function loadLatestTeamProfile(): Promise<TeamProfile | null> {
  const p = await db.teamProfile.orderBy('createdAt').last()
  return p ?? null
}

export async function updateTeamProfile(
  id: number,
  patch: Partial<TeamProfile>,
): Promise<void> {
  await db.teamProfile.update(id, patch)
}
