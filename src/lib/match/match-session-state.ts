const MATCH_SESSION_KEY = 'tncb_match_session_partner'
const CROSS_MENTION_PA_KEY = 'tncb_match_cross_mention_pa'

export function loadCrossMentionedPA(): boolean {
  try {
    return localStorage.getItem(CROSS_MENTION_PA_KEY) === '1'
  } catch {
    return false
  }
}

export function saveCrossMentionedPA(mentioned: boolean): void {
  try {
    if (mentioned) localStorage.setItem(CROSS_MENTION_PA_KEY, '1')
    else localStorage.removeItem(CROSS_MENTION_PA_KEY)
  } catch {
    /* ignore */
  }
}

export function clearCrossMentionedPA(): void {
  saveCrossMentionedPA(false)
}

export function loadMatchSessionPartnerType(): string | null {
  try {
    const raw = localStorage.getItem(MATCH_SESSION_KEY)
    if (!raw) return null
    return /^[EI][NS][TF][JP]$/.test(raw) ? raw : null
  } catch {
    return null
  }
}

export function saveMatchSessionPartnerType(partnerType: string | null): void {
  if (!partnerType) {
    localStorage.removeItem(MATCH_SESSION_KEY)
    return
  }
  localStorage.setItem(MATCH_SESSION_KEY, partnerType)
}
