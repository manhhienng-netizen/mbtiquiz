// child-static-content.ts — config 3 lứa, pain labels, check-in, cluster mapping

import type { ChildYoungRolePlayA } from './child/child-young-roleplay-a'
import type { ChildTeenRolePlayA } from './child/child-teen-roleplay-a'
import type { ChildAdultRolePlayA } from './child/child-adult-roleplay-a'

export type ChildLua = 'young' | 'teen' | 'adult'

export type YoungPainId = 'buong' | 'nhutnhat' | 'haykhoc' | 'hieudong'
export type TeenPainId = 'likhongnghe' | 'khepkin' | 'apluchoc' | 'noiloan'
export type AdultPainId = 'khaclua' | 'xacach' | 'batdong' | 'itvenha'

export type ChildPainId = YoungPainId | TeenPainId | AdultPainId

export type YoungCluster = 'easy' | 'difficult' | 'slow' | 'unknown'
export type MbtiCluster = 'ST' | 'SF' | 'NF' | 'NT' | 'unknown'
export type ChildCluster = YoungCluster | MbtiCluster

export type YoungRolePlayGroup = ChildYoungRolePlayA['group']
export type TeenRolePlayGroup = ChildTeenRolePlayA['group']
export type AdultRolePlayGroup = ChildAdultRolePlayA['group']

export const LUA_OPTIONS: Record<
  ChildLua,
  { icon: string; label: string; sublabel: string }
> = {
  young: { icon: '🌱', label: 'Con nhỏ', sublabel: '3 – 11 tuổi' },
  teen: { icon: '🌊', label: 'Con teen', sublabel: '12 – 18 tuổi' },
  adult: { icon: '🌿', label: 'Con trưởng thành', sublabel: '18 tuổi trở lên' },
}

export const YOUNG_PAIN_LABELS: Record<
  YoungPainId,
  { icon: string; label: string }
> = {
  buong: { icon: '🌋', label: 'Bướng / ăn vạ' },
  nhutnhat: { icon: '🫣', label: 'Nhút nhát' },
  haykhoc: { icon: '💧', label: 'Hay khóc / nhạy' },
  hieudong: { icon: '⚡', label: 'Hiếu động' },
}

export const TEEN_PAIN_LABELS: Record<
  TeenPainId,
  { icon: string; label: string }
> = {
  likhongnghe: { icon: '🔥', label: 'Lì / không nghe' },
  khepkin: { icon: '🚪', label: 'Khép kín' },
  apluchoc: { icon: '📚', label: 'Áp lực học' },
  noiloan: { icon: '🌊', label: 'Nổi loạn / cãi' },
}

export const ADULT_PAIN_LABELS: Record<
  AdultPainId,
  { icon: string; label: string }
> = {
  khaclua: { icon: '🛤️', label: 'Chọn lối khác' },
  xacach: { icon: '🌙', label: 'Xa cách' },
  batdong: { icon: '💬', label: 'Bất đồng nghề / bạn đời' },
  itvenha: { icon: '🏠', label: 'Ít về nhà' },
}

export const YOUNG_PAIN_TO_RP_GROUP: Record<YoungPainId, YoungRolePlayGroup> = {
  buong: 'TANTRUM',
  nhutnhat: 'SHY',
  haykhoc: 'BIGFEELINGS',
  hieudong: 'TANTRUM',
}

export const TEEN_PAIN_TO_RP_GROUP: Record<TeenPainId, TeenRolePlayGroup> = {
  likhongnghe: 'CONFLICT',
  khepkin: 'DISTANCE',
  apluchoc: 'PRESSURE',
  noiloan: 'CONFLICT',
}

export const ADULT_PAIN_TO_RP_GROUP: Record<AdultPainId, AdultRolePlayGroup> = {
  khaclua: 'CHOICES',
  xacach: 'DISTANCE',
  batdong: 'ADULTHOOD',
  itvenha: 'DISTANCE',
}

export function getPainLabels(lua: ChildLua) {
  if (lua === 'young') return YOUNG_PAIN_LABELS
  if (lua === 'teen') return TEEN_PAIN_LABELS
  return ADULT_PAIN_LABELS
}

export function getPainToRpGroup(
  lua: ChildLua,
  painId: ChildPainId,
): string {
  if (lua === 'young')
    return YOUNG_PAIN_TO_RP_GROUP[painId as YoungPainId]
  if (lua === 'teen') return TEEN_PAIN_TO_RP_GROUP[painId as TeenPainId]
  return ADULT_PAIN_TO_RP_GROUP[painId as AdultPainId]
}

export function youngClusterToMbti(cluster: YoungCluster): string {
  switch (cluster) {
    case 'easy':
      return 'ESFJ'
    case 'difficult':
      return 'ESTP'
    case 'slow':
      return 'ISFJ'
    default:
      return 'ISFJ'
  }
}

export function teenClusterToMbti(cluster: MbtiCluster): string {
  switch (cluster) {
    case 'ST':
      return 'ESTJ'
    case 'SF':
      return 'ISFP'
    case 'NF':
      return 'INFP'
    case 'NT':
      return 'INTP'
    default:
      return 'ISFP'
  }
}

export function adultClusterToMbti(cluster: MbtiCluster): string {
  switch (cluster) {
    case 'ST':
      return 'ESTJ'
    case 'SF':
      return 'ISFJ'
    case 'NF':
      return 'INFP'
    case 'NT':
      return 'INTJ'
    default:
      return 'INFP'
  }
}

export function clusterToMbti(lua: ChildLua, cluster: ChildCluster): string {
  if (lua === 'young') return youngClusterToMbti(cluster as YoungCluster)
  if (lua === 'teen') return teenClusterToMbti(cluster as MbtiCluster)
  return adultClusterToMbti(cluster as MbtiCluster)
}

export const CHECKIN_OPTIONS = [
  { id: 'better', label: 'Hiểu hơn rồi 🌤️' },
  { id: 'same', label: 'Vẫn đang tìm cách' },
  { id: 'new', label: 'Có chuyện khác rồi' },
] as const

export type CheckInChoice = (typeof CHECKIN_OPTIONS)[number]['id']

export const CHECKIN_RESPONSES: Record<CheckInChoice, string> = {
  better:
    'Tốt. Hiểu thêm một chút là bắt đầu của điều gì đó khác đi.',
  same:
    'Bình thường. Thử một cách nhỏ từ những gì vừa đọc — không cần thay đổi ngay hết.',
  new: 'Chọn lại chủ đề hoặc mở Match Chat để nói sâu hơn.',
}
