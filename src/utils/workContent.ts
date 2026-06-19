/** Lọc chỉ lấy [P] (Primary), bỏ suffix */
export function filterPrimary(items: string[]): string[] {
  return items
    .filter((s) => s.includes('[P]') || (!s.includes('[S]') && !s.includes('[P]')))
    .map((s) => s.replace(/\s*\[[PS]\]\s*$/, '').trim())
}

/** Bỏ suffix [P]/[S] khỏi 1 string */
export function stripTag(s: string): string {
  return s.replace(/\s*\[[PS]\]\s*$/, '').replace(/\s*\[R\]\s*$/, '').trim()
}

/** Lấy câu đầu từ overview (hook) */
export function firstSentence(text: string): string {
  const cleaned = stripTag(text)
  const match = cleaned.match(/^[^.!?]+[.!?]?/)
  return match ? match[0].trim() : cleaned
}

const NEGATIVE_MANIFESTATION_SIGNALS = [
  '—nhưng',
  '— nhưng',
  'nhưng đôi khi',
  'nhưng có thể',
  'dù không',
  'xu hướng over',
  'hay interrupts',
  'quá dài',
  'quá nhanh',
  'thiếu',
  'mất ',
  'scatter',
  'struggle',
  'có thể scatter',
  'đôi khi',
  'block',
  'dismiss',
]

/** Lọc bỏ manifestation mang nghĩa tiêu cực */
export function filterPositive(items: string[]): string[] {
  return items.filter((s) => {
    const lower = s.toLowerCase()
    return !NEGATIVE_MANIFESTATION_SIGNALS.some((sig) =>
      lower.includes(sig.toLowerCase()),
    )
  })
}

export function getStrengths(
  comp: { dailyManifestations?: string[] },
  coach: { bestAssignments?: string[] },
): string[] {
  const positive = filterPositive(filterPrimary(comp.dailyManifestations ?? []))
  if (positive.length >= 2) return positive.slice(0, 3)

  const assignments = coach.bestAssignments ?? []
  if (assignments.length > 0) {
    return assignments.slice(0, 3).map((a) => {
      const text = stripTag(a)
      return `Bạn tỏa sáng với ${text.charAt(0).toLowerCase()}${text.slice(1)}`
    })
  }

  return positive.slice(0, 3)
}

/** S7 B2C: góc nhân viên — bestFormat + language đã việt hóa, ngôi "bạn" */
const COMMUNICATION_TIPS_B2C: Record<
  string,
  { bestFormat: string; language: string }
> = {
  INTJ: {
    bestFormat:
      'Bạn tiếp nhận feedback tốt nhất khi được đọc trước bằng văn bản — cho thời gian xử lý và phản hồi có chuẩn bị.',
    language:
      'Bạn muốn nhận xét cụ thể, có logic rõ ràng — không cần đệm lót cảm xúc, đi thẳng vào điểm cần cải thiện.',
  },
  INTP: {
    bestFormat:
      'Bạn hấp thụ feedback tốt hơn khi có thời gian đọc và suy nghĩ trước — không phải nghe trực tiếp lần đầu trong cuộc họp.',
    language:
      'Bạn cần nhận xét dựa trên bằng chứng cụ thể — không phải cảm nhận chung chung, và để ngỏ không gian để bạn phản biện nếu không đồng ý.',
  },
  ENTJ: {
    bestFormat:
      'Bạn muốn nhận feedback thẳng và nhanh — không cần đi vòng, nói thẳng điểm cần thay đổi và kỳ vọng cụ thể.',
    language:
      'Bạn tiếp nhận tốt khi nhận xét gắn với kết quả và tác động thật — không phải phong cách hay cách làm.',
  },
  ENTP: {
    bestFormat:
      'Bạn thích thảo luận hai chiều hơn là nhận xét một chiều — feedback theo kiểu đối thoại giúp bạn xử lý và áp dụng tốt hơn.',
    language:
      "Bạn cần nhận xét đủ thách thức để thú vị — câu hỏi mở ('Bạn nghĩ có thể làm khác không?') hiệu quả hơn kết luận cứng.",
  },
  INFJ: {
    bestFormat:
      'Bạn tiếp nhận feedback tốt nhất trong không gian riêng, không có áp lực — không phải giữa cuộc họp hay trước nhiều người.',
    language:
      'Bạn cần hiểu lý do đằng sau nhận xét — kết nối với ý nghĩa lớn hơn giúp bạn thật sự tiếp thu thay vì chỉ ghi nhận.',
  },
  INFP: {
    bestFormat:
      'Bạn cần cảm thấy an toàn trước khi mở lòng với feedback — bắt đầu bằng điều đang tốt trước khi vào điểm cần cải thiện.',
    language:
      "Bạn tiếp nhận tốt khi nhận xét về hành động cụ thể, không phải về con người — tránh kiểu 'bạn luôn luôn...' hoặc 'bạn không bao giờ...'",
  },
  ENFJ: {
    bestFormat:
      'Bạn hấp thụ feedback tốt khi có sự ấm áp trong cách nói — không cần đường mật, nhưng cần cảm giác người đưa ra nhận xét quan tâm đến bạn.',
    language:
      'Bạn cần hiểu tác động của mình lên người khác và tập thể — nhận xét gắn với điều này sẽ thúc đẩy bạn thay đổi hơn là nhận xét thuần túy về hiệu suất.',
  },
  ENFP: {
    bestFormat:
      'Bạn tiếp nhận tốt trong cuộc trò chuyện tự nhiên, không có cảm giác formal — feedback giữa cuộc đối thoại thật thường vào hơn là buổi review chính thức.',
    language:
      'Bạn cần thấy feedback kết nối với bức tranh lớn hơn — giải thích tại sao điều này quan trọng giúp bạn thấy ý nghĩa và thật sự thay đổi.',
  },
  ISTJ: {
    bestFormat:
      'Bạn muốn nhận feedback bằng văn bản hoặc có ghi chép — để xem lại và xử lý một mình trước khi phản hồi.',
    language:
      'Bạn cần nhận xét cụ thể, có ví dụ thật — không phải nhận định chung, và rõ ràng về kỳ vọng tiếp theo là gì.',
  },
  ISFJ: {
    bestFormat:
      'Bạn tiếp nhận tốt trong không gian riêng tư — feedback trước nhiều người dễ làm bạn phòng thủ dù nội dung đúng.',
    language:
      'Bạn cần nghe điểm tích cực thật sự trước — không phải để làm ngọt, mà vì nó giúp bạn mở ra để nghe điểm cần cải thiện tiếp theo.',
  },
  ESTJ: {
    bestFormat:
      'Bạn muốn nhận feedback trực tiếp, có cấu trúc — vấn đề cụ thể, kỳ vọng rõ, timeline để cải thiện.',
    language:
      'Bạn tiếp nhận tốt khi nhận xét gắn với kết quả đo được — không phải cảm nhận mơ hồ, và không cần đệm lót quá nhiều.',
  },
  ESFJ: {
    bestFormat:
      'Bạn tiếp nhận tốt khi cảm nhận được người đưa ra feedback quan tâm thật sự đến bạn — không phải chỉ đánh giá hiệu suất.',
    language:
      'Bạn cần nhận xét cân bằng — điểm tốt thật sự và điểm cần cải thiện cụ thể — không phải chỉ toàn chê hoặc toàn khen.',
  },
  ISTP: {
    bestFormat:
      'Bạn tiếp nhận tốt nhất qua ví dụ thực tế cụ thể — mô tả đúng tình huống và hành vi, không phải nhận xét chung chung về phong cách.',
    language:
      'Bạn muốn nhận xét ngắn gọn, thẳng — không cần nhiều context hay cảm xúc, nói thẳng vào điểm cần thay đổi là đủ.',
  },
  ISFP: {
    bestFormat:
      'Bạn cần không gian riêng và không áp lực khi nhận feedback — cuộc trò chuyện 1:1 nhẹ nhàng hiệu quả hơn nhiều so với review formal.',
    language:
      "Bạn cần nghe rằng nhận xét này không phủ nhận giá trị của bạn — tách biệt 'hành động cần cải thiện' với 'bạn là người thế nào' giúp bạn thật sự mở lòng tiếp nhận.",
  },
  ESTP: {
    bestFormat:
      'Bạn muốn nhận feedback ngay lúc đó, không phải sau nhiều ngày — real-time feedback hiệu quả với bạn hơn là buổi review chính thức.',
    language:
      'Bạn tiếp nhận tốt khi nhận xét thẳng, không vòng vo — nói rõ điều cần thay đổi và tác động thực tế của nó.',
  },
  ESFP: {
    bestFormat:
      'Bạn tiếp nhận tốt trong bầu không khí thoải mái, không căng thẳng — feedback trong cuộc trò chuyện tự nhiên dễ vào hơn buổi đánh giá chính thức.',
    language:
      'Bạn cần nghe điểm tốt thật sự trước và cảm nhận được sự ủng hộ — sau đó nhận xét cụ thể về hành động cần cải thiện sẽ thật sự được tiếp thu.',
  },
}

/** Góc nhân viên: 1–2 câu S7 (B2C map; fallback reframe từ manager guide) */
export function getCommunicationTips(
  feedbackStyle: { bestFormat: string; language: string },
  mbtiType: string,
): string[] {
  const b2c = COMMUNICATION_TIPS_B2C[mbtiType]
  if (b2c) {
    return [b2c.bestFormat, b2c.language]
  }
  return [feedbackStyle.bestFormat, feedbackStyle.language].map((s) =>
    reframeYou(stripTag(s), mbtiType),
  )
}

/** Reframe mô tả type → ngôi "bạn" */
export function reframeYou(text: string, mbtiType?: string): string {
  let s = stripTag(text)
  if (mbtiType) {
    s = s.replace(new RegExp(`\\b${mbtiType}\\b`, 'gi'), 'bạn')
  }
  s = s
    .replace(/\bHọ\b/g, 'bạn')
    .replace(/\bhọ\b/g, 'bạn')
    .replace(/\bINTJ\b|\bINTP\b|\bENTJ\b|\bENTP\b|\bINFJ\b|\bINFP\b|\bENFJ\b|\bENFP\b|\bISTJ\b|\bISFJ\b|\bESTJ\b|\bESFJ\b|\bISTP\b|\bISFP\b|\bESTP\b|\bESFP\b/gi, 'bạn')

  if (/^Hay /i.test(s)) {
    const rest = s.slice(4)
    s = `Bạn hay ${rest.charAt(0).toLowerCase()}${rest.slice(1)}`
  } else if (/^(Làm việc|Email|Có xu hướng|Giỏi nhất|Câu trả lời|Hoạt động)/i.test(s)) {
    s = `Bạn ${s.charAt(0).toLowerCase()}${s.slice(1)}`
  } else if (!/^Bạn\b/i.test(s)) {
    s = `Bạn ${s.charAt(0).toLowerCase()}${s.slice(1)}`
  }

  return s.charAt(0).toUpperCase() + s.slice(1)
}
