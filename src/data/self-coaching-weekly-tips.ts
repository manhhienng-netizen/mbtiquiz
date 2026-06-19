// self-coaching-weekly-tips-16062026-1300.ts — WA Gap 2
// 16 tips: 4 mảng × 4 nhóm ST/SF/NF/NT · implementation intention

export type MbtiGroup = 'ST' | 'SF' | 'NF' | 'NT'

export type WeeklySection = 'motivation' | 'feedback' | 'burnout' | 'environment'

export interface WeeklyTip {
  section: WeeklySection
  group: MbtiGroup
  text: string
}

export const SECTION_LABELS: Record<WeeklySection, string> = {
  motivation: 'Tạo động lực',
  feedback: 'Đưa góp ý',
  burnout: 'Tránh kiệt sức',
  environment: 'Môi trường hợp',
}

export const WEEKLY_TIPS: WeeklyTip[] = [

  // MẢNG 1 — TẠO ĐỘNG LỰC
  {
    section: 'motivation',
    group: 'ST',
    text: 'Chọn 1 task đang làm và đặt deadline sớm hơn 1 ngày so với yêu cầu — xem sự khác biệt.',
  },
  {
    section: 'motivation',
    group: 'SF',
    text: 'Tuần này nhắn cảm ơn 1 người đã giúp bạn gần đây — cụ thể việc họ làm, không chỉ "cảm ơn bạn nhé".',
  },
  {
    section: 'motivation',
    group: 'NF',
    text: 'Viết 1 câu: "Việc tôi đang làm tuần này quan trọng vì..." — dán lên màn hình máy tính.',
  },
  {
    section: 'motivation',
    group: 'NT',
    text: 'Chọn 1 task đang làm và hỏi: "Nếu làm cái này tốt hơn 10%, hệ quả tiếp theo là gì?" — tìm leverage point.',
  },

  // MẢNG 2 — ĐƯA GÓP Ý
  {
    section: 'feedback',
    group: 'ST',
    text: 'Tuần này khi góp ý ai đó, thêm 1 câu về tác động cụ thể: "Điều này ảnh hưởng đến X như thế này..." trước khi nói cần thay đổi gì.',
  },
  {
    section: 'feedback',
    group: 'SF',
    text: 'Chọn 1 người bạn muốn góp ý — xin gặp riêng, bắt đầu bằng điều bạn thật sự đánh giá cao ở họ trước.',
  },
  {
    section: 'feedback',
    group: 'NF',
    text: 'Tuần này thử góp ý bằng câu hỏi thay vì nhận xét: "Bạn thấy phần X này có thể làm khác đi không?" — xem phản ứng khác thế nào.',
  },
  {
    section: 'feedback',
    group: 'NT',
    text: 'Sau khi góp ý ai đó tuần này, hỏi thêm: "Bạn cần gì từ mình để làm được điều đó?" — đừng chỉ nêu vấn đề.',
  },

  // MẢNG 3 — TRÁNH KIỆT SỨC
  {
    section: 'burnout',
    group: 'ST',
    text: 'Tuần này đặt giờ "dừng việc" cố định — không cần lý do, không cần làm xong hết. Thử 1 tuần xem ảnh hưởng đến năng suất thế nào.',
  },
  {
    section: 'burnout',
    group: 'SF',
    text: 'Chọn 1 buổi trong tuần chỉ dành cho mình — không Zalo công việc, không email. Ghi vào lịch như một cuộc họp quan trọng.',
  },
  {
    section: 'burnout',
    group: 'NF',
    text: 'Tuần này khi cảm thấy kiệt sức, thay vì cố tiếp — viết ra 1 câu: "Tôi đang thiếu thứ gì nhất lúc này?" Đọc lại sau 10 phút.',
  },
  {
    section: 'burnout',
    group: 'NT',
    text: 'Chọn 1 việc đang làm mà bạn thật sự không cần làm — ủy quyền, hoãn, hoặc bỏ hẳn. Xem điều gì xảy ra.',
  },

  // MẢNG 4 — MÔI TRƯỜNG HỢP
  {
    section: 'environment',
    group: 'ST',
    text: 'Thử làm việc theo block 90 phút không interrupt tuần này — tắt thông báo, đóng tab email. Ghi lại xem hoàn thành được bao nhiêu so với thường ngày.',
  },
  {
    section: 'environment',
    group: 'SF',
    text: 'Tuần này đề xuất với team 1 thay đổi nhỏ trong cách làm việc chung — giờ họp, cách chia việc, hay cách báo cáo. Không cần hoàn hảo, chỉ cần thử.',
  },
  {
    section: 'environment',
    group: 'NF',
    text: 'Thử đổi không gian làm việc 1 buổi tuần này — quán cà phê, phòng họp trống, hay đơn giản là góc khác trong nhà. Xem cảm giác khác không.',
  },
  {
    section: 'environment',
    group: 'NT',
    text: 'Tuần này thử làm 1 việc theo cách hoàn toàn khác với thói quen — không phải vì cách cũ sai, mà để xem có gì bạn đang bỏ sót.',
  },
]

export function getMbtiGroup(mbtiType: string): MbtiGroup {
  const type = mbtiType.toUpperCase()
  const isN = type.includes('N')
  const isT = type.includes('T')
  if (!isN && isT) return 'ST'
  if (!isN && !isT) return 'SF'
  if (isN && !isT) return 'NF'
  return 'NT'
}

export function getWeeklyTip(
  section: WeeklySection,
  group: MbtiGroup,
): string | null {
  return WEEKLY_TIPS.find((t) => t.section === section && t.group === group)?.text ?? null
}

/** Map CoachingField → weekly section key */
export const COACHING_FIELD_TO_WEEKLY: Record<
  'motivate' | 'feedback' | 'support' | 'environment',
  WeeklySection
> = {
  motivate: 'motivation',
  feedback: 'feedback',
  support: 'burnout',
  environment: 'environment',
}
