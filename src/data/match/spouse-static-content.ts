// ============================================================
// SPOUSE STATIC CONTENT — config, estimator, check-in
// ============================================================

import type { SituationId } from '../manager-diagnostic'
import type { SpouseRolePlayA } from './spouse-roleplay-a'

export type PainId = 'argue' | 'silence' | 'money' | 'parenting'

export type PartnerCluster = {
  ei: 'E' | 'I' | 'unknown'
  tf: 'T' | 'F' | 'unknown'
}

export type RolePlayGroup = SpouseRolePlayA['group']

// ── HOOK labels ───────────────────────────────────────────
export const PAIN_LABELS: Record<PainId, { icon: string; label: string }> = {
  argue: { icon: '🔥', label: 'Cãi hoài một chuyện' },
  silence: { icon: '🌧️', label: 'Im lặng, xa cách' },
  money: { icon: '💸', label: 'Khác cách tiêu tiền' },
  parenting: { icon: '🌱', label: 'Khác ý nuôi con' },
}

export const PAIN_TO_RP_GROUP: Record<PainId, RolePlayGroup> = {
  argue: 'CONFLICT',
  silence: 'SILENCE',
  money: 'MONEY',
  parenting: 'PARENTING',
}

export const PAIN_TO_SITUATION: Record<PainId, SituationId> = {
  argue: 'S1',
  silence: 'S2',
  money: 'S8',
  parenting: 'S8',
}

// ── CLUSTER → MBTI TYPE (để getGuidanceCard) ──────────────
export function clusterToMbtiType(cluster: PartnerCluster): string {
  const ei = cluster.ei === 'unknown' ? 'I' : cluster.ei
  const tf = cluster.tf === 'unknown' ? 'F' : cluster.tf
  if (ei === 'E' && tf === 'T') return 'ESTJ'
  if (ei === 'E' && tf === 'F') return 'ENFJ'
  if (ei === 'I' && tf === 'T') return 'ISTJ'
  return 'INFP'
}

// ── ESTIMATOR QUESTIONS ────────────────────────────────────
export interface EstimatorQuestion {
  id: 'eq1' | 'eq2' | 'eq3' | 'eq4'
  text: string
  choices: [
    { id: 'a'; label: string },
    { id: 'b'; label: string },
    { id: 'c'; label: string },
    { id: 'd'; label: string },
  ]
}

export const ESTIMATOR_QUESTIONS: EstimatorQuestion[] = [
  {
    id: 'eq1',
    text: 'Sau một tuần dài, vợ/chồng bạn thường muốn điều gì hơn?',
    choices: [
      { id: 'a', label: 'Ra ngoài, gặp gỡ bạn bè cho khuây' },
      { id: 'b', label: 'Ở nhà, tìm một khoảng yên tĩnh' },
      { id: 'c', label: 'Làm gì cũng được, miễn là vui' },
      { id: 'd', label: 'Tùy hôm — khó đoán trước' },
    ],
  },
  {
    id: 'eq2',
    text: 'Khi bạn kể một chuyện buồn, họ thường phản ứng thế nào?',
    choices: [
      { id: 'a', label: 'Nghe xong rồi đưa ra cách giải quyết' },
      { id: 'b', label: 'Hỏi bạn đang cảm thấy thế nào' },
      { id: 'c', label: 'Cố tìm xem vì sao chuyện đó xảy ra' },
      { id: 'd', label: 'Không nói nhiều, chỉ lặng lẽ ở bên' },
    ],
  },
  {
    id: 'eq3',
    text: 'Sau khi hai người cãi nhau, họ thường có xu hướng nào?',
    choices: [
      { id: 'a', label: 'Muốn nói cho ra lẽ ngay lúc đó' },
      { id: 'b', label: 'Cần một khoảng lặng, để nói sau' },
      { id: 'c', label: 'Làm như không có chuyện gì' },
      { id: 'd', label: 'Mỗi lần một khác' },
    ],
  },
  {
    id: 'eq4',
    text: 'Khi đứng trước một quyết định lớn, họ thường làm gì?',
    choices: [
      { id: 'a', label: 'Cân nhắc kỹ cái được và cái mất' },
      { id: 'b', label: 'Hỏi ý kiến nhiều người quanh mình' },
      { id: 'c', label: 'Nghe theo cảm giác trong lòng' },
      { id: 'd', label: 'Để đó đã, từ từ tính' },
    ],
  },
]

// ── ESTIMATOR SCORING ──────────────────────────────────────
type Answers = Record<string, string>

export function estimatePartnerCluster(answers: Answers): PartnerCluster {
  let eScore = 0
  let tScore = 0

  if (answers.eq1 === 'a') eScore += 2
  if (answers.eq1 === 'b') eScore -= 2
  if (answers.eq2 === 'a') tScore += 1
  if (answers.eq2 === 'b') tScore -= 2
  if (answers.eq2 === 'c') tScore += 2
  if (answers.eq2 === 'd') tScore -= 1
  if (answers.eq3 === 'a') eScore += 1
  if (answers.eq3 === 'b') eScore -= 2
  if (answers.eq4 === 'a') tScore += 2
  if (answers.eq4 === 'b') tScore -= 1
  if (answers.eq4 === 'c') tScore -= 2

  const THRESHOLD = 1.5
  return {
    ei:
      Math.abs(eScore) >= THRESHOLD
        ? eScore > 0
          ? 'E'
          : 'I'
        : 'unknown',
    tf:
      Math.abs(tScore) >= THRESHOLD
        ? tScore > 0
          ? 'T'
          : 'F'
        : 'unknown',
  }
}

// ── CHECK-IN ───────────────────────────────────────────────
export const CHECKIN_OPTIONS = [
  { id: 'better', label: 'Đỡ rồi 🌤️' },
  { id: 'same', label: 'Vẫn vậy' },
  { id: 'new', label: 'Có chuyện khác rồi' },
] as const

export type CheckInChoice = (typeof CHECKIN_OPTIONS)[number]['id']

export const CHECKIN_RESPONSES: Record<CheckInChoice, string> = {
  better:
    'Tốt. Những chuyện nhỏ dần đi khi cả hai bắt đầu nghe nhau hơn.',
  same:
    'Bình thường. Thay đổi trong quan hệ thường chậm hơn ta muốn — thử một trong những câu ở trên xem sao.',
  new:
    'Có chuyện khác — chọn lại chủ đề hoặc mở Match Chat để nói sâu hơn.',
}
