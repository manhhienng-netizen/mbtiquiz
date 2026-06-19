import {
  DAILY_PRACTICES,
  getDayPractices,
  getPracticeSlotId,
  type PracticeSlot,
} from '../data/daily-practices'
import { KB_TIPS_CIVIC_WELLNESS } from '../data/kb-tips-civic-wellness'
import { KB_TIPS_P2, type KBTip } from '../data/kb-tips-p2'
import { KB_TIPS_P3 } from '../data/kb-tips-p3'
import {
  getSituationalNudge as lookupSituationalNudge,
  type SituationKey,
} from '../data/situational-nudges'
import { getLatestMBTI, getTipProgress, recordTipSeen } from '../db/tncb-db'

export type NudgeTimeSlot = 'morning' | 'practice' | 'evening'

export type DayNudges = {
  morning: PracticeSlot | null
  practice: PracticeSlot | null
  evening: PracticeSlot | null
}

export type PracticeSlotWithId = PracticeSlot & { id: string }

const KB_POOL_ALL: KBTip[] = [
  ...KB_TIPS_P2,
  ...KB_TIPS_P3,
  ...KB_TIPS_CIVIC_WELLNESS,
]

function getTimeSlotFromHour(hour: number): NudgeTimeSlot {
  if (hour >= 5 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 18) return 'practice'
  return 'evening'
}

function pickRandom<T>(items: T[]): T | null {
  if (items.length === 0) return null
  return items[Math.floor(Math.random() * items.length)]
}

export function getTodayNudges(mbtiType: string): DayNudges {
  const dayIndex = new Date().getDay()
  return getDayPractices(mbtiType, dayIndex)
}

export function getCurrentSlotNudge(mbtiType: string): {
  slot: NudgeTimeSlot
  nudge: PracticeSlot | null
} {
  const slot = getTimeSlotFromHour(new Date().getHours())
  const dayIndex = new Date().getDay()
  const nudge = getDayPractices(mbtiType, dayIndex)[slot]

  return { slot, nudge }
}

export function getSituationalNudge(
  mbtiType: string,
  situation: SituationKey,
): string | null {
  const entry = lookupSituationalNudge(mbtiType, situation)
  if (!entry) return null

  return [entry.headline, entry.body, entry.actionPrompt]
    .filter(Boolean)
    .join('\n\n')
}

export async function getNudgesForCurrentUser(): Promise<DayNudges | null> {
  const record = await getLatestMBTI()
  if (!record?.mbtiType) return null

  return getTodayNudges(record.mbtiType)
}

/** Pack 1 — daily-practices tips chưa xem theo slot. */
export async function getUnseenSlotTip(
  mbtiType: string,
  slot: NudgeTimeSlot,
): Promise<PracticeSlotWithId | null> {
  const profile = DAILY_PRACTICES[mbtiType]
  if (!profile) return null

  const progress = await getTipProgress()
  const seen = new Set(progress.seenTipIds)

  const candidates = profile[slot]
    .map((practice, index) => ({
      ...practice,
      id: getPracticeSlotId(mbtiType, slot, index, practice),
    }))
    .filter((practice) => !seen.has(practice.id))

  return pickRandom(candidates)
}

/** Pool lớn — P2 + P3 + Civic/Wellness tips chưa xem theo slot. */
export async function getUnseenPoolTip(
  mbtiType: string,
  slot: NudgeTimeSlot,
): Promise<KBTip | null> {
  const progress = await getTipProgress()
  const seen = new Set(progress.seenTipIds)

  const candidates = KB_POOL_ALL.filter(
    (tip) =>
      (tip.slot === slot || tip.slot === 'any') &&
      !seen.has(tip.id) &&
      (tip.applicable_types.length === 0 ||
        tip.applicable_types.includes(mbtiType)),
  )

  return pickRandom(candidates)
}

export { recordTipSeen, getTipProgress }

export type { SituationKey, PracticeSlot, KBTip }
