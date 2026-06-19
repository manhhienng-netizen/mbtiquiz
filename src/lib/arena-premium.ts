// Premium flag local — dùng để DEV/test engine AI mà không cần payment
// Production: thay bằng check subscription thật (cloud GĐ2)

export interface PremiumStatus {
  isActive: boolean
  activatedAt?: string
  source: 'dev-override' | 'subscription'
}

const DEV_PREMIUM_KEY = 'tncb_dev_premium'

export function isPremiumActive(): boolean {
  if (localStorage.getItem(DEV_PREMIUM_KEY) === 'true') return true
  return false
}

export function devActivatePremium(): void {
  localStorage.setItem(DEV_PREMIUM_KEY, 'true')
  console.log('[Arena] DEV premium activated — engine AI enabled')
}

export function devDeactivatePremium(): void {
  localStorage.removeItem(DEV_PREMIUM_KEY)
  console.log('[Arena] DEV premium deactivated')
}
