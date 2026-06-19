import type { Gender } from '../data/quiz-types'
import { calculateCanChi } from './spiritual-engine/canchi'
import { calculateNumerology } from './spiritual-engine/numerology'
import { getNhatChu } from './lunar-converter'

export interface SpiritualData {
  fullName: string
  birthDate: string
  birthHour: string | null
  gender: Gender
  genderPreference?: 'male' | 'female'
  lunarYear: number
  canYear: string
  chiYear: string
  nhatChu: string
  element: string
  cungMenh: string | null
  lifePath: number
}

export function calculateSpiritualData(
  fullName: string,
  day: number,
  month: number,
  year: number,
  birthHour: string | null,
  gender: Gender,
  genderPreference?: 'male' | 'female',
): SpiritualData {
  const dob = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`

  const numerology = calculateNumerology(fullName, dob)
  const canChi = calculateCanChi(dob)
  const nhatChu = getNhatChu(year, month, day)

  return {
    fullName,
    birthDate: dob,
    birthHour,
    gender,
    ...(genderPreference !== undefined ? { genderPreference } : {}),
    lunarYear: canChi.lunarYear,
    canYear: canChi.can,
    chiYear: canChi.chi,
    nhatChu,
    element: canChi.element,
    cungMenh: canChi.chi,
    lifePath: numerology.lifePath,
  }
}
