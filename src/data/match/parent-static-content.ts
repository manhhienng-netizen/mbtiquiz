// parent-static-content.ts — config, pain labels, check-in, cluster mapping

import type { ParentRolePlayA } from './parent-roleplay-a'

export type PainId = 'pressure' | 'unheard' | 'overworry' | 'distance'

export type ParentCluster = 'ST' | 'SF' | 'NF' | 'NT' | 'unknown'

export type RolePlayGroup = ParentRolePlayA['group']

export const PAIN_LABELS: Record<PainId, { icon: string; label: string }> = {
  pressure: { icon: '🪢', label: 'Ép cưới / ép nghề' },
  unheard: { icon: '🌀', label: 'Không chịu nghe nhau' },
  overworry: { icon: '☁️', label: 'Lo lắng thái quá' },
  distance: { icon: '🌙', label: 'Khó gần, ít nói' },
}

export const PAIN_TO_RP_GROUP: Record<PainId, RolePlayGroup> = {
  pressure: 'PRESSURE',
  unheard: 'UNHEARD',
  overworry: 'OVERWORRY',
  distance: 'DISTANCE',
}

export function clusterToMbtiType(cluster: ParentCluster): string {
  switch (cluster) {
    case 'ST':
      return 'ESTJ'
    case 'SF':
      return 'ISFJ'
    case 'NF':
      return 'ENFJ'
    case 'NT':
      return 'INTJ'
    default:
      return 'ISFJ'
  }
}

export const CHECKIN_OPTIONS = [
  { id: 'better', label: 'Đỡ hơn rồi 🌤️' },
  { id: 'same', label: 'Vẫn vậy' },
  { id: 'new', label: 'Có chuyện khác rồi' },
] as const

export type CheckInChoice = (typeof CHECKIN_OPTIONS)[number]['id']

export const CHECKIN_RESPONSES: Record<CheckInChoice, string> = {
  better:
    'Tốt. Hiểu thêm một chút — dù nhỏ — cũng là bắt đầu của điều gì đó.',
  same:
    'Bình thường. Khoảng cách với bố mẹ thường cần thời gian, không phải một cuộc nói chuyện. Thử một trong những cách nhỏ ở trên xem sao.',
  new:
    'Có chuyện khác — chọn lại chủ đề hoặc mở Match Chat để nói sâu hơn.',
}
