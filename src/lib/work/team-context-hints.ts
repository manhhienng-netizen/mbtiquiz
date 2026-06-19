import type { CoachingField } from '../../data/manager-coaching-b2b'
import type { TeamContext } from '../../db/tncb-db'

const CHALLENGE_FIELD: Record<TeamContext['challenge'], CoachingField> = {
  motivation: 'motivate',
  communication: 'feedback',
  delegation: 'environment',
  retention: 'support',
}

const CHALLENGE_HINTS: Record<TeamContext['challenge'], string> = {
  motivation:
    'Thách thức động lực: xem mảng 🔥 trước — check nguyên lý SDT (tự chủ · thành thạo · ý nghĩa) trước khi làm gì khác.',
  retention:
    'Giữ người: stay-interview đơn giản hơn exit-interview. Hỏi "điều gì giữ bạn ở lại" trước khi họ tính ra đi.',
  communication:
    'Giao tiếp: kiểu nhận feedback (T vs F, N vs S) ảnh hưởng nhiều hơn nội dung — xem mảng 📢 cho từng người.',
  delegation:
    'Phân công: "bạn tỏa sáng khi làm gì" (mảng 🔥) + "môi trường hợp" (mảng 🌿) là 2 input quan trọng nhất.',
}

/** Hint size hiện 1 lần đầu trang (trước honestNote) */
export function getTeamSizeHintTop(ctx: TeamContext): string | null {
  if (ctx.size === '30+') {
    return 'Đội lớn: tâm lý an toàn khó xây — đặc biệt chú ý khi ai đó im lặng bất thường.'
  }
  return null
}

/** Hint size gắn với field cụ thể */
export function getTeamSizeHintForField(
  ctx: TeamContext,
  field: CoachingField,
): string | null {
  if (ctx.size === '1-5' && field === 'feedback') {
    return 'Đội nhỏ: feedback thường xuyên quan trọng hơn — check-in 1:1 ngắn hiệu quả hơn họp chung.'
  }
  return null
}

/** Hint challenge — chỉ trên field tương ứng */
export function getTeamChallengeHintForField(
  ctx: TeamContext,
  field: CoachingField,
): string | null {
  if (CHALLENGE_FIELD[ctx.challenge] !== field) return null
  return CHALLENGE_HINTS[ctx.challenge]
}

export function getTeamContextHints(ctx: TeamContext): string[] {
  const hints: string[] = []
  const top = getTeamSizeHintTop(ctx)
  if (top) hints.push(top)
  const challenge = CHALLENGE_HINTS[ctx.challenge]
  if (challenge) hints.push(challenge)
  if (ctx.size === '1-5') {
    hints.push(
      'Đội nhỏ: feedback thường xuyên quan trọng hơn — check-in 1:1 ngắn hiệu quả hơn họp chung.',
    )
  }
  return hints
}

export function getHintForCoachingField(
  ctx: TeamContext | undefined,
  field: CoachingField,
): string | null {
  if (!ctx) return null
  return (
    getTeamSizeHintForField(ctx, field) ??
    getTeamChallengeHintForField(ctx, field)
  )
}
