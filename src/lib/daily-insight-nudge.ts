import { getDailyNudgeSeen } from '../db/tncb-db'

const SESSION_OFFER_PREFIX = 'tncb_pa_daily_nudge_offered_'

export function getTodayDateString(): string {
  return new Date().toDateString()
}

function sessionOfferKey(): string {
  return SESSION_OFFER_PREFIX + getTodayDateString()
}

export function markDailyNudgeOfferedSession(): void {
  try {
    sessionStorage.setItem(sessionOfferKey(), '1')
  } catch {
    // ignore quota / private mode
  }
}

export function wasDailyNudgeOfferedThisSession(): boolean {
  try {
    return sessionStorage.getItem(sessionOfferKey()) === '1'
  } catch {
    return false
  }
}

export const DAILY_NUDGE_SUFFIX =
  '\n\nHôm nay có một điều mình nghĩ hợp với bạn — muốn nghe không?'

/** First chat open today + chưa xem insight + 40% — không fire mỗi reload. */
export async function shouldShowDailyNudge(): Promise<boolean> {
  const today = getTodayDateString()
  if (wasDailyNudgeOfferedThisSession()) return false

  const lastSeen = await getDailyNudgeSeen()
  if (lastSeen?.date === today) return false

  return Math.random() < 0.4
}

export function openingHasDailyNudge(content: string): boolean {
  return content.includes('muốn nghe không')
}
