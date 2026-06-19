import type { CoachingField } from './manager-coaching-b2b'
import type { ScaleField } from './scale-tint-content'

/** Map mảng self-coaching → scale-tint (không gồm feedback). */
export const COACHING_FIELD_TO_SCALE: Partial<Record<CoachingField, ScaleField>> = {
  motivate: 'giaTriNghe',
  support: 'phatTrien',
  environment: 'moiTruong',
}

/** Reframe từ lens manager → self-coaching */
export const selfHonestNote = (): string =>
  'Đây là điểm khởi đầu theo type — điều đúng nhất là tự quan sát và hỏi chính mình.'

/** Chuyển câu ask manager-facing sang tự hỏi bản thân */
export function selfAsk(ask: string): string {
  return ask
    .replace(/Bạn muốn mình góp ý/g, 'Bạn muốn nhận góp ý')
    .replace(/mình góp ý/g, 'nhận góp ý')
}

export const FIELD_ICONS: Record<CoachingField, string> = {
  motivate: '🔥',
  feedback: '📢',
  support: '⚡',
  environment: '🌿',
}
