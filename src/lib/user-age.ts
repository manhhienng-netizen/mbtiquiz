export type AgeTag = '25+' | 'parenting'

/** Giai đoạn đời — khung advice nhẹ, không phán xét. */
export function lifeStageLabel(age: number | null): string | null {
  if (age === null) return null
  if (age < 18) return 'đi học'
  if (age < 23) return 'đi học / mới tốt nghiệp'
  if (age < 30) return 'mới đi làm / khởi đầu sự nghiệp'
  if (age < 45) return 'giữa sự nghiệp'
  if (age < 60) return 'giữa sự nghiệp / nuôi dưỡng gia đình'
  return 'giai đoạn trưởng thành muộn'
}

/** Tuổi từ birthDate (YYYY-MM-DD). */
export function ageFromBirthDate(birthDate: string | undefined | null): number | null {
  if (!birthDate?.trim()) return null
  const d = new Date(birthDate.trim())
  if (Number.isNaN(d.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - d.getFullYear()
  const m = today.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--
  return age >= 0 && age < 130 ? age : null
}

/** 1 dòng persona — surface tuổi cho LLM khung advice hợp lứa. */
export function formatAgeContextLine(age: number | null): string | null {
  if (age === null) return null
  const stage = lifeStageLabel(age)
  if (!stage) return null
  return `Tuổi: ${age} — giai đoạn ${stage}. Dùng khung advice phù hợp lứa tuổi; tuổi chỉ là ngữ cảnh — KHÔNG hạ mức safety/PROTECTIVE.`
}

function tagMatchesAge(tag: AgeTag | string, userAge: number): boolean {
  if (tag === '25+') return userAge >= 25
  if (tag === 'parenting') return userAge >= 25
  return true
}

/**
 * Lọc tuổi MỀM cho KB GU — PROTECTIVE luôn pass (caller truyền zone).
 * Không tag / không tuổi → mọi lứa tuổi.
 */
export function passesAgeFilter(
  ageTags: string[] | undefined,
  userAge: number | null,
  zone: 'GU' | 'PROTECTIVE' = 'GU',
): boolean {
  if (zone === 'PROTECTIVE') return true
  if (!ageTags?.length || userAge === null) return true
  return ageTags.every((tag) => tagMatchesAge(tag, userAge))
}
