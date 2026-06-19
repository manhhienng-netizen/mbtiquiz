import { calculateAge } from '@tncb/core/age-gate'
import type { AgeGroupId } from '@tncb/data/design-tokens'

export function learnGroupFromAge(age: number): AgeGroupId | null {
  if (age >= 6 && age <= 8) return 'SPROUT'
  if (age >= 9 && age <= 12) return 'BLOOM'
  if (age >= 13 && age <= 15) return 'SPARK'
  if (age >= 16 && age <= 18) return 'RISE'
  if (age >= 19 && age <= 22) return 'LAUNCH'
  return null
}

export function learnGroupFromBirthDate(birthDate: Date): AgeGroupId | null {
  return learnGroupFromAge(calculateAge(birthDate))
}

export function isValidAgeGroupParam(value: string | null): value is AgeGroupId {
  return (
    value === 'SPROUT' ||
    value === 'BLOOM' ||
    value === 'SPARK' ||
    value === 'RISE' ||
    value === 'LAUNCH'
  )
}

export const USER_PROFILE_KEY = 'tncb_user_profile'
export const PARENT_CONSENT_KEY = 'tncb_parent_contact_mvp'

export interface UserProfile {
  ageGroup: AgeGroupId
  dob: string
  onboardedAt: string
}

export interface ParentConsentRecord {
  consentedAt: string
  parentConsent: boolean
  childConsent?: boolean
}
