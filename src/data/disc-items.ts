export interface DiscItem {
  id: number
  situation: string
  options: { D: string; I: string; S: string; C: string }
}

export const DISC_ITEMS: DiscItem[] = [
  {
    id: 1,
    situation: 'Khi làm việc nhóm, bạn thường muốn là người...',
    options: {
      D: 'Đưa ra quyết định và push team về phía trước',
      I: 'Tạo không khí vui và kết nối mọi người',
      S: 'Đảm bảo mọi người ổn và hỗ trợ team',
      C: 'Kiểm tra kỹ để mọi thứ đúng quy trình',
    },
  },
  {
    id: 2,
    situation: 'Khi gặp vấn đề cần giải quyết, bạn thường...',
    options: {
      D: 'Quyết định nhanh và hành động ngay',
      I: 'Hỏi ý kiến nhiều người, brainstorm',
      S: 'Tìm cách ổn định tình hình trước khi hành động',
      C: 'Thu thập đủ thông tin trước khi quyết định',
    },
  },
  {
    id: 3,
    situation: 'Người khác thường mô tả bạn là...',
    options: {
      D: 'Quyết đoán, thẳng thắn, kết quả-oriented',
      I: 'Vui vẻ, nhiệt tình, truyền cảm hứng',
      S: 'Kiên nhẫn, đáng tin, team player',
      C: 'Chính xác, logic, cẩn thận',
    },
  },
  {
    id: 4,
    situation: 'Trong cuộc họp, bạn thường...',
    options: {
      D: 'Drive agenda, tóm tắt và kết luận nhanh',
      I: 'Chia sẻ nhiều, tạo năng lượng cho nhóm',
      S: 'Lắng nghe kỹ, đảm bảo mọi người được nghe',
      C: 'Chuẩn bị kỹ, đặt câu hỏi clarifying',
    },
  },
  {
    id: 5,
    situation: 'Khi bị căng thẳng, bạn có xu hướng...',
    options: {
      D: 'Trở nên demanding và impatient hơn',
      I: 'Nói nhiều hơn, cần được reassure',
      S: 'Rút vào trong, tránh conflict',
      C: 'Overanalyze, khó quyết định hơn',
    },
  },
  {
    id: 6,
    situation: 'Điều bạn coi trọng nhất trong công việc là...',
    options: {
      D: 'Kết quả, thành tích, chiến thắng',
      I: 'Recognition, quan hệ tốt, vui',
      S: 'Ổn định, harmony, được tin tưởng',
      C: 'Chất lượng, accuracy, làm đúng',
    },
  },
  {
    id: 7,
    situation: 'Khi nhận feedback, bạn muốn nghe...',
    options: {
      D: 'Thẳng thắn, đi thẳng vào vấn đề',
      I: 'Positive trước, sau đó mới suggest',
      S: 'Gentle, có thời gian để xử lý',
      C: 'Cụ thể, có data, giải thích logic',
    },
  },
  {
    id: 8,
    situation: 'Khi start dự án mới, bạn thường...',
    options: {
      D: 'Define mục tiêu và phân công ngay',
      I: 'Excite team, paint big picture',
      S: 'Đảm bảo mọi người hiểu và comfortable',
      C: 'Lên kế hoạch chi tiết, risk assessment',
    },
  },
  {
    id: 9,
    situation: 'Môi trường làm việc lý tưởng của bạn là...',
    options: {
      D: 'Autonomy cao, challenge, fast-paced',
      I: 'Social, collaborative, creative',
      S: 'Predictable, team-oriented, supportive',
      C: 'Structured, clear expectations, quality-focused',
    },
  },
  {
    id: 10,
    situation: 'Khi không đồng ý với quyết định, bạn thường...',
    options: {
      D: 'Nói thẳng ngay lập tức',
      I: 'Thuyết phục bằng cách tạo enthusiasm cho hướng khác',
      S: 'Chờ thời điểm phù hợp, tránh conflict trực tiếp',
      C: 'Chuẩn bị data và logic để argue case',
    },
  },
  {
    id: 11,
    situation: 'Người khác có thể frustrated với bạn vì...',
    options: {
      D: 'Quá pushy, không lắng nghe đủ',
      I: 'Nói nhiều, không focus vào details',
      S: 'Quá chậm, tránh change',
      C: 'Quá cầu toàn, phân tích quá nhiều',
    },
  },
  {
    id: 12,
    situation: 'Khi đạt được kết quả tốt, bạn muốn...',
    options: {
      D: 'Được giao challenge lớn hơn tiếp theo',
      I: 'Được celebrate và share với team',
      S: 'Biết team cũng happy và stable',
      C: 'Được ghi nhận vì làm đúng quy trình',
    },
  },
]

export const DISC_LABELS: Record<'D' | 'I' | 'S' | 'C', string> = {
  D: 'Quyết đoán',
  I: 'Truyền cảm hứng',
  S: 'Kiên định',
  C: 'Tỉ mỉ',
}

export const DISC_OPTION_LETTERS = ['D', 'I', 'S', 'C'] as const
