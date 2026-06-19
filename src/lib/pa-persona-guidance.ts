import type { Big5Level } from './big5-scoring'

export interface PersonaGuidanceInput {
  mbtiType: string
  age?: number | null
  nLevel?: Big5Level
  aLevel?: Big5Level
}

const MBTI_TRAITS: Record<string, string> = {
  INTJ: 'người thích nghĩ sâu và có hệ thống trước khi chia sẻ',
  INTP: 'người hay phân tích nhiều chiều và cần thời gian xử lý',
  ENTJ: 'người định hướng kết quả, thích quyết định rõ ràng',
  ENTP: 'người thích ý tưởng mới và debate, dễ chán khi lặp lại',
  INFJ: 'người có trực giác sâu về cảm xúc người khác, cần ý nghĩa trong mọi thứ',
  INFP: 'người lọc mọi thứ qua giá trị nội tâm, cần được thấu hiểu trước khi mở lòng',
  ENFJ: 'người quan tâm sâu đến người khác, hay đặt nhu cầu người khác lên trước',
  ENFP: 'người hứng khởi với khả năng và kết nối, cần tự do để khám phá',
  ISTJ: 'người đáng tin cậy, làm theo cam kết, cần sự ổn định và rõ ràng',
  ISFJ: 'người chăm sóc lặng thầm, nhớ chi tiết về người thân, ít nói về nhu cầu mình',
  ESTJ: 'người tổ chức và quyết đoán, thích quy trình rõ ràng',
  ESFJ: 'người coi trọng hài hòa, dễ bị ảnh hưởng bởi cảm xúc người xung quanh',
  ISTP: 'người thực tế, học bằng tay, không thích bị quản lý',
  ISFP: 'người sống trong hiện tại, cần không gian để tự biểu đạt',
  ESTP: 'người thích hành động ngay, học qua trải nghiệm, không thích lý thuyết dài',
  ESFP: 'người năng động, ấm áp, cần kết nối thật và không gian sôi động',
}

function lifeStageGuidance(age: number): string {
  if (age < 22) {
    return 'đang trong giai đoạn khám phá bản thân và định hướng'
  }
  if (age < 28) {
    return 'đang trong giai đoạn đầu sự nghiệp và xây dựng bản thân'
  }
  if (age < 35) {
    return 'đang trong giai đoạn tìm ý nghĩa sâu hơn trong công việc và cuộc sống'
  }
  if (age < 45) {
    return 'đang trong giai đoạn cân bằng trách nhiệm và phát triển cá nhân'
  }
  return 'đang trong giai đoạn nhìn lại và tái định hướng'
}

/** PA-only — diễn giải quiz data tự nhiên, không dump raw metadata. */
export function buildPersonaGuidance(persona: PersonaGuidanceInput): string {
  const lines: string[] = []

  const trait = MBTI_TRAITS[persona.mbtiType]
  if (trait) {
    lines.push(
      `Người dùng là ${trait}. Điều chỉnh cách trò chuyện cho phù hợp — KHÔNG nói rõ bạn biết type của họ.`,
    )
  }

  if (typeof persona.age === 'number') {
    const stage = lifeStageGuidance(persona.age)
    lines.push(
      `Người dùng ${stage}. Phản hồi phù hợp với ngữ cảnh này — KHÔNG đề cập tuổi.`,
    )
  }

  if (persona.nLevel === 'high') {
    lines.push(
      'Tone: validate cảm xúc trước, giọng dịu, không vội đưa lời khuyên. Người dùng nhạy cảm với cảm xúc.',
    )
  } else if (persona.nLevel === 'low') {
    lines.push(
      'Tone: có thể đi thẳng vào vấn đề thực tế, người dùng ổn định cảm xúc.',
    )
  }

  if (persona.aLevel === 'low') {
    lines.push(
      'Communication: thẳng thắn, không vòng vo, người dùng thích direct.',
    )
  }

  return lines.join('\n')
}
