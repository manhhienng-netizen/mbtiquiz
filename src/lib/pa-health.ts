// PA Sức khỏe: vận động cá nhân · giấc ngủ · thói quen cá nhân
// LOẠI TRỪ: burnout công việc (→ WA) · chế độ sinh hoạt gia đình (→ MA)
// KHÔNG tư vấn y tế · redirect bác sĩ khi cần
export {
  getSportsByGroup,
  getHealthStyle,
  getHealthNudge,
  calculateTargetHR,
  getMbtiGroup,
  MBTI_HEALTH_STYLE,
  SPORTS_BY_GROUP,
  HEART_RATE_FORMULAS,
  HEART_RATE_ZONES,
  HEALTH_NUDGES,
  type Sport,
  type HealthStyle,
  type HeartRateZone,
} from '../data/pa-kb-health'

import { getMbtiGroup, getSportsByGroup, getHealthStyle } from '../data/pa-kb-health'

export const HEALTH_DISCLAIMER =
  'Thông tin tham khảo · không thay thế tư vấn y tế · Có bệnh tim mạch → tham khảo bác sĩ trước khi bắt đầu'

export function getSportsForType(mbtiType: string) {
  const group = getMbtiGroup(mbtiType)
  const all = getSportsByGroup(group)
  const preferred = all.filter((s) => s.bestFor.includes(mbtiType))
  return { group, style: getHealthStyle(group), sports: preferred.length ? preferred : all.slice(0, 6) }
}
