/**
 * TNCB — Attachment Questions (3 câu · /profile/setup)
 * Mục đích: đo attachment style gián tiếp qua cảm giác (không clinical)
 * Wire: /profile/setup — optional, sau basic setup
 * Internal use only: KHÔNG show label (anxious/avoidant/secure) cho user
 * Backing: ECR-S + Bartholomew RQ [R] · VN feeling-based framing [S]
 */

export interface AttachmentQuestion {
  id: string
  text: string
  placeholder: string
  dimension: 'anxiety' | 'avoidance' | 'security'
}

export const ATTACHMENT_QUESTIONS: AttachmentQuestion[] = [
  {
    id: 'aq1',
    text: 'Khi người thân bận và ít liên lạc mấy ngày, trong đầu bạn thường diễn ra điều gì?',
    placeholder: 'Không cần câu trả lời đúng — chỉ cần thật...',
    dimension: 'anxiety',
  },
  {
    id: 'aq2',
    text: 'Khi bạn gặp chuyện khó, bạn thường chia sẻ với người thân ở giai đoạn nào — lúc đang rối, hay sau khi đã tự xử lý?',
    placeholder: 'Không có đáp án đúng sai ở đây...',
    dimension: 'avoidance',
  },
  {
    id: 'aq3',
    text: 'Trong một mối quan hệ thân thiết, điều gì khiến bạn cảm thấy an toàn nhất?',
    placeholder: 'Trả lời theo cảm giác đầu tiên của bạn...',
    dimension: 'security',
  },
]

export type AttachmentAnswers = {
  aq1?: string
  aq2?: string
  aq3?: string
}
