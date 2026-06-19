export type WorkingStyle = 'direct' | 'analytical' | 'relational' | 'expressive'

export interface ExternalEstimateQuestion {
  id: number
  question: string
  options: { label: string; style: WorkingStyle }[]
}

export const WORKING_STYLE_LABELS: Record<WorkingStyle, string> = {
  direct: 'Quyết nhanh, đi thẳng',
  analytical: 'Cẩn thận, cần data',
  relational: 'Coi trọng quan hệ',
  expressive: 'Nhiệt, nhiều ý tưởng',
}

export const EXTERNAL_ESTIMATE_QUESTIONS: ExternalEstimateQuestion[] = [
  {
    id: 1,
    question: 'Họ thường trao đổi công việc theo kiểu nào?',
    options: [
      { label: 'Ngắn gọn, đi thẳng vào việc', style: 'direct' },
      { label: 'Chi tiết, hỏi kỹ trước khi quyết', style: 'analytical' },
      { label: 'Ấm áp, hay hỏi thăm ngoài công việc', style: 'relational' },
      { label: 'Nhiều ý tưởng, nói chuyện rộng', style: 'expressive' },
    ],
  },
  {
    id: 2,
    question: 'Khi có vấn đề, họ phản ứng thế nào?',
    options: [
      { label: 'Muốn giải quyết ngay, dứt khoát', style: 'direct' },
      { label: 'Muốn hiểu rõ nguyên nhân trước', style: 'analytical' },
      { label: 'Để ý xem có ảnh hưởng quan hệ không', style: 'relational' },
      { label: 'Bàn nhiều hướng, linh hoạt', style: 'expressive' },
    ],
  },
  {
    id: 3,
    question: 'Điều gì làm họ hài lòng nhất khi làm việc với bạn?',
    options: [
      { label: 'Kết quả đúng hẹn, không lằng nhằng', style: 'direct' },
      { label: 'Mọi thứ chính xác, rõ ràng, đúng cam kết', style: 'analytical' },
      { label: 'Cảm giác được tin tưởng, thân thiết', style: 'relational' },
      { label: 'Sự nhiệt tình và ý tưởng mới', style: 'expressive' },
    ],
  },
  {
    id: 4,
    question: 'Khi bạn cần từ chối hoặc thương lượng, họ thường?',
    options: [
      { label: 'Tôn trọng nếu bạn nói thẳng có lý do', style: 'direct' },
      { label: 'Cần thấy phân tích/bằng chứng hợp lý', style: 'analytical' },
      { label: 'Nhạy cảm — cần cách nói giữ thể diện', style: 'relational' },
      { label: 'Dễ chịu nếu bạn đưa giải pháp thay thế', style: 'expressive' },
    ],
  },
]

export interface ExternalEstimate {
  topStyle: WorkingStyle
  confidence: 'cao' | 'vừa' | 'thấp'
}

export function estimateExternalStyle(answers: WorkingStyle[]): ExternalEstimate {
  const count: Record<WorkingStyle, number> = {
    direct: 0,
    analytical: 0,
    relational: 0,
    expressive: 0,
  }
  for (const a of answers) count[a]++
  const sorted = (Object.entries(count) as [WorkingStyle, number][]).sort(
    (a, b) => b[1] - a[1],
  )
  const top = sorted[0]
  const confidence = top[1] >= 3 ? 'cao' : top[1] === 2 ? 'vừa' : 'thấp'
  return { topStyle: top[0], confidence }
}
