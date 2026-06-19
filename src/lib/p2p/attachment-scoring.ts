/**
 * TNCB P2P — Attachment Signal Scoring
 * 3 câu MCQ → anxietySignal + avoidanceSignal
 * Backing: ECR-S [R] · Bartholomew RQ [R] · VN feeling-based framing [S]
 * KHÔNG hiện label cho user — internal only
 */

export type AttachmentLevel = 'low' | 'medium' | 'high'

export interface AttachmentAnswers {
  q1: string
  q2: string
  q3: string
}

export interface AttachmentSignal {
  anxietySignal: AttachmentLevel
  avoidanceSignal: AttachmentLevel
}

export function scoreAttachment(answers: AttachmentAnswers): AttachmentSignal {
  const anxietyScore: Record<string, number> = {
    'Tiếp tục việc của mình — họ chắc bận': 1,
    'Nhắn thêm 1 tin để check': 2,
    'Bắt đầu lo dù biết không cần': 3,
    'Tùy mối quan hệ': 1.5,
  }

  const avoidanceScore: Record<string, number> = {
    'Nói thẳng ra luôn': 1,
    'Cần thời gian một mình trước': 2,
    'Đổi chủ đề cho nhẹ hơn': 3,
    'Tùy cảm giác lúc đó': 1.5,
  }

  const calibration: Record<string, { anxiety: number; avoidance: number }> = {
    'Biết người kia luôn ở đó': { anxiety: 0.5, avoidance: -0.3 },
    'Không gian để là chính mình': { anxiety: -0.3, avoidance: 0.5 },
    'Cả 2 đều quan trọng như nhau': { anxiety: 0, avoidance: 0 },
    'Chưa chắc': { anxiety: 0, avoidance: 0 },
  }

  const rawAnxiety =
    (anxietyScore[answers.q1] ?? 1.5) + (calibration[answers.q3]?.anxiety ?? 0)
  const rawAvoidance =
    (avoidanceScore[answers.q2] ?? 1.5) + (calibration[answers.q3]?.avoidance ?? 0)

  const toLevel = (score: number): AttachmentLevel => {
    if (score <= 1.5) return 'low'
    if (score <= 2.3) return 'medium'
    return 'high'
  }

  return {
    anxietySignal: toLevel(rawAnxiety),
    avoidanceSignal: toLevel(rawAvoidance),
  }
}
