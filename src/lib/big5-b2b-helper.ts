// Wire Big Five C+A vào B2B
// Grounding: Barrick & Mount 1991 [R] · Malouff 2010 [R] · Noftle & Shaver 2006 [R]

import { getBig5Profile } from '../db/tncb-db'

export interface Big5CATip {
  headline: string
  reinforce: string
  watchOut: string
  coachingBehavior: string
}

export function getCATip(C: number, A: number): Big5CATip {
  const cHigh = C > 3.5
  const aHigh = A > 3.5

  if (cHigh && aHigh) {
    return {
      headline:
        'Bạn có xu hướng vừa kỷ luật vừa để ý đến người — nền tảng tốt để dẫn đội.',
      reinforce:
        'Khả năng giữ kế hoạch trong khi vẫn quan tâm từng người là điểm mạnh hiếm. Tiếp tục chia sẻ roadmap rõ với đội để họ thấy mình đang đi đâu.',
      watchOut:
        'Có xu hướng muốn mọi thứ tốt cả về chất lượng lẫn cảm xúc đội — đôi khi khó ra quyết định khó (feedback tiêu cực, performance talk) vì không muốn ảnh hưởng ai.',
      coachingBehavior:
        'Khi cần đưa feedback khó: chuẩn bị trước, nói thẳng và cụ thể — đây là cách care thật sự, không phải cứng rắn.',
    }
  }

  if (cHigh && !aHigh) {
    return {
      headline:
        'Bạn có xu hướng hướng kết quả và kỷ luật — đội biết bạn nghiêm túc.',
      reinforce:
        'Khả năng giữ deadline và structure là điểm mạnh. Chia sẻ kế hoạch rõ với đội giúp họ tự tổ chức tốt hơn mà không cần bạn phải nhắc nhiều.',
      watchOut:
        'Có xu hướng đi thẳng vào task mà bỏ qua context của người — đội đôi khi cần cảm thấy được nghe trước khi thực hiện, đặc biệt khi task khó.',
      coachingBehavior:
        'Thêm 1 câu hỏi vào đầu mỗi 1:1: "Gần đây bạn đang thấy phần nào của việc này còn có ý nghĩa?" — mất 2 phút, đổi lại nhiều.',
    }
  }

  if (!cHigh && aHigh) {
    return {
      headline:
        'Bạn có xu hướng linh hoạt và quan tâm người — đội thường thoải mái với bạn.',
      reinforce:
        'Khả năng tạo môi trường an toàn để đội nói thật là điểm mạnh thật sự. Giữ thói quen check-in 1:1 thường xuyên.',
      watchOut:
        'Có xu hướng thích nghi hơn là giữ cấu trúc — đội đôi khi cần deadline và roadmap rõ hơn để không bị lạc. Template + checklist là công cụ, không phải điểm yếu.',
      coachingBehavior:
        'Chọn 1 template đơn giản (checklist tuần, board task) và giữ nhất quán trong 3 tuần — nhiều manager hiệu quả dùng công cụ bù trừ điểm này.',
    }
  }

  return {
    headline:
      'Bạn có xu hướng quyết nhanh và thẳng thắn — đội biết bạn muốn gì.',
    reinforce:
      'Tốc độ ra quyết định và sự rõ ràng là điểm mạnh trong môi trường cần move fast.',
    watchOut:
      'Có xu hướng để structure và connection bị bỏ qua khi bận. Cả hai thứ này ảnh hưởng đến retention và chất lượng dài hạn.',
    coachingBehavior:
      'Mỗi tuần: 1 checklist tiến độ ngắn (cấu trúc) + 1 câu hỏi thăm đội (connection). Mỗi thứ mất 5 phút, cộng dồn tạo khác biệt lớn.',
  }
}

export async function loadBig5ForB2B(): Promise<{ C: number; A: number } | null> {
  try {
    const profile = await getBig5Profile()
    if (!profile || profile.C == null || profile.A == null) return null
    return { C: profile.C, A: profile.A }
  } catch {
    return null
  }
}
