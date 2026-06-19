import type { TeamMember } from '../db/tncb-db'

export type CompanionMode =
  | 'role-assign'
  | 'unblock'
  | 'deadline'
  | 'checkin'

const MBTI_ROLES: Record<string, string[]> = {
  ENTJ: ['Dẫn dắt quyết định', 'Cầm nhịp dự án', 'Thuyết phục stakeholder'],
  INTJ: ['Thiết kế chiến lược', 'Phân tích rủi ro', 'Tạo cấu trúc dài hạn'],
  ENTP: ['Phá băng ý tưởng', 'Đối ngoại & pitch', 'Tìm giải pháp sáng tạo'],
  INTP: ['Research & phân tích sâu', 'Debug logic', 'Tài liệu kỹ thuật'],
  ENFJ: ['Kết nối đội', 'Trình bày tầm nhìn', 'Giải quyết xung đột'],
  INFJ: ['Chiến lược dài hạn', 'Mentor cá nhân', 'Đảm bảo ý nghĩa công việc'],
  ENFP: ['Brainstorm & ý tưởng mới', 'Tạo năng lượng đội', 'Đối ngoại & kết nối'],
  INFP: ['Content có chiều sâu', 'Giữ giá trị đội', 'Viết & sáng tạo'],
  ESTJ: ['Quản lý quy trình', 'Đảm bảo deadline', 'Tổ chức hệ thống'],
  ISTJ: ['Ownership quy trình', 'Kiểm soát chất lượng', 'Tài liệu & chuẩn hóa'],
  ESTP: ['Xử lý tình huống gấp', 'Đàm phán', 'Drive kết quả nhanh'],
  ISTP: ['Fix vấn đề kỹ thuật', 'Xử lý thực tế', 'Troubleshoot'],
  ESFJ: ['Giữ không khí đội', 'Phối hợp logistics', 'Chăm sóc client'],
  ISFJ: ['Hỗ trợ đội', 'Đảm bảo chi tiết', 'Follow-through'],
  ESFP: ['Tạo năng lượng', 'Đối ngoại', 'Trình bày & demo'],
  ISFP: ['Execution ổn định', 'Craft & chất lượng', 'Hỗ trợ hậu cần'],
}

function getMbtiRoles(mbti: string): string[] {
  return MBTI_ROLES[mbti.toUpperCase()] ?? ['Đóng góp theo điểm mạnh cá nhân']
}

export interface RoleAssignment {
  member: TeamMember
  suggestedRoles: string[]
  rationale: string
}

export function assignRoles(
  members: TeamMember[],
  project: string,
): RoleAssignment[] {
  return members.map((m) => {
    const roles = getMbtiRoles(m.mbti)
    return {
      member: m,
      suggestedRoles: roles.slice(0, 2),
      rationale: `${m.name} (${m.mbti}) hay ${roles[0].toLowerCase()} tốt — phù hợp với "${project}".`,
    }
  })
}

export interface UnblockPlan {
  diagnosis: string
  actions: string[]
  whoHelps: string
}

export function diagnoseBlocker(
  members: TeamMember[],
  blocker: string,
): UnblockPlan {
  const types = members.map((m) => m.mbti.toUpperCase())
  const jCount = types.filter((t) => t[3] === 'J').length
  const pCount = types.filter((t) => t[3] === 'P').length
  const nCount = types.filter((t) => t[1] === 'N').length
  const n = members.length
  const blockerLower = blocker.toLowerCase()

  let diagnosis = ''
  let actions: string[] = []
  let whoHelps = ''

  if (
    blockerLower.includes('quyết') ||
    blockerLower.includes('chậm') ||
    jCount < Math.ceil(n * 0.3)
  ) {
    diagnosis = 'Đội có xu hướng cân nhắc kỹ — quyết định dễ bị kéo dài.'
    const driver =
      members.find((m) => m.mbti[3] === 'J' || m.mbti[2] === 'T') ?? members[0]
    actions = [
      `Giao ${driver.name} quyền "chốt" trong nhóm quyết định tuần này — không cần đồng thuận 100%.`,
      'Đặt deadline nhỏ: mỗi quyết định có 48h để decide, sau đó move on.',
      'Tách "quyết định thuận nghịch" (dễ sửa) vs "quyết định không thuận nghịch" — cái đầu quyết nhanh.',
    ]
    whoHelps = driver.name
  } else if (
    blockerLower.includes('xung đột') ||
    blockerLower.includes('mâu thuẫn') ||
    blockerLower.includes('không phối')
  ) {
    diagnosis =
      'Có friction giữa người trong đội — thường do khác phong cách, không phải ác ý.'
    const connector =
      members.find((m) => m.mbti[2] === 'F' && m.mbti[0] === 'E') ??
      members.find((m) => m.mbti[2] === 'F') ??
      members[0]
    actions = [
      `Gặp riêng từng người trước (đặc biệt là ${connector.name} làm cầu nối) — hiểu góc nhìn thật trước khi họp chung.`,
      'Đặt lại mục tiêu chung rõ ràng — friction thường giảm khi mọi người thấy cùng hướng.',
      'Tránh blame — frame "chúng ta đang kẹt ở X, mình giải quyết thế nào" thay vì "ai gây ra X".',
    ]
    whoHelps = connector.name
  } else if (
    blockerLower.includes('ý tưởng') ||
    blockerLower.includes('bí') ||
    nCount < Math.ceil(n * 0.3)
  ) {
    diagnosis =
      'Đội đang kẹt về hướng đi hoặc giải pháp — cần mở không gian sáng tạo.'
    const creative = members.find((m) => m.mbti[1] === 'N') ?? members[0]
    actions = [
      `Giao ${creative.name} dẫn 15 phút "crazy ideas" — mọi ý tưởng đều được, không phán xét.`,
      'Thay đổi context: họp đứng, họp ngoài văn phòng, hay gửi ý tưởng async qua Zalo trước.',
      'Hỏi ngược: "Nếu chúng ta làm ngược lại, sẽ ra sao?" — often unlocks new directions.',
    ]
    whoHelps = creative.name
  } else if (
    blockerLower.includes('follow') ||
    blockerLower.includes('miss') ||
    blockerLower.includes('deadline') ||
    pCount > jCount
  ) {
    diagnosis = 'Đội linh hoạt cao — dễ thiếu follow-through và để việc trôi.'
    const anchor = members.find((m) => m.mbti[3] === 'J') ?? members[0]
    actions = [
      `Giao ${anchor.name} giữ "bản đồ tiến độ" — ai làm gì, đến đâu, review 5 phút mỗi ngày.`,
      'Dùng done-list thay to-do-list: mỗi ngày ghi 3 việc đã xong — tạo momentum.',
      'Commit công khai: mỗi người nói 1 việc sẽ xong trước thứ 6 — social accountability.',
    ]
    whoHelps = anchor.name
  } else {
    const helper = members[0]
    diagnosis = `Đội đang kẹt ở "${blocker}" — cần làm rõ nguyên nhân gốc trước khi giải.`
    actions = [
      `${helper.name} (hoặc bạn) dành 15 phút họp "5 Whys": hỏi "tại sao" 5 lần để tìm nguyên nhân thật.`,
      'Chia vấn đề thành 3 loại: tôi có thể giải, đội có thể giải, cần người ngoài giải.',
      'Chọn 1 việc nhỏ nhất có thể làm ngay để mở kẹt — đừng cố giải hết một lúc.',
    ]
    whoHelps = helper.name
  }

  return { diagnosis, actions, whoHelps }
}

export interface DeadlinePlan {
  planA: string[]
  planB: string
  risks: string[]
  quickWin: string
}

export function planDeadline(
  members: TeamMember[],
  deadline: string,
  _currentStatus: string,
): DeadlinePlan {
  const assignments = assignRoles(members, deadline)
  const tCount = members.filter((m) => m.mbti[2] === 'T').length
  const fCount = members.filter((m) => m.mbti[2] === 'F').length
  const jCount = members.filter((m) => m.mbti[3] === 'J').length
  const pCount = members.filter((m) => m.mbti[3] === 'P').length

  const planA = assignments.map(
    (a) => `${a.member.name} (${a.member.mbti}) → ${a.suggestedRoles[0]}`,
  )

  const planB =
    members.length <= 2
      ? 'Đội nhỏ — ưu tiên 20% việc tạo ra 80% kết quả. Cắt scope những gì không critical.'
      : `Nếu thiếu người cho deadline, ${members[0].name} có thể phụ trách thêm phần X (điều chỉnh sau khi confirm scope).`

  const risks: string[] = []
  if (pCount > jCount)
    risks.push(
      'Đội linh hoạt cao → rủi ro bỏ sót detail cuối. Cần 1 người checklist trước submit.',
    )
  if (tCount > fCount)
    risks.push(
      'Đội thiên logic → có thể bỏ qua phản hồi từ phía người dùng/khách. Validate sớm.',
    )
  if (jCount > pCount)
    risks.push(
      'Đội kỷ luật cao → dễ cứng khi cần thay đổi gấp. Giữ 1 buffer 10% cho unexpected.',
    )
  if (risks.length === 0)
    risks.push(
      'Đội cân bằng — rủi ro chính là communication: ai làm gì cần rõ từ đầu.',
    )

  const fastPerson =
    members.find((m) => m.mbti[2] === 'T' && m.mbti[0] === 'E') ??
    members.find((m) => m.mbti[3] === 'J') ??
    members[0]
  const quickWin = `Họp 15 phút với cả đội ngay hôm nay: ${fastPerson.name} dẫn confirm scope cuối + ai làm gì → mọi người clear trước khi bắt đầu chạy.`

  return { planA, planB, risks, quickWin }
}

export interface CheckInResult {
  acknowledgment: string
  nextSuggestion: string
  milestoneNote: string
}

export function processCheckIn(
  prevBlocker: string,
  status: 'done' | 'partial' | 'stuck',
  members: TeamMember[],
): CheckInResult {
  const anchor = members.find((m) => m.mbti[3] === 'J') ?? members[0]

  if (status === 'done') {
    return {
      acknowledgment: `Tốt! Đội đã vượt qua "${prevBlocker}". Momentum tốt.`,
      nextSuggestion: `${anchor.name} ghi nhận lại cách đội đã giải — bài học nhỏ này có thể dùng lại sau.`,
      milestoneNote: `✅ Đã giải: ${prevBlocker}`,
    }
  }
  if (status === 'partial') {
    return {
      acknowledgment:
        'Đội đang cải thiện dần — tiến triển tốt dù chưa xong hoàn toàn.',
      nextSuggestion: `Tuần này tập trung vào phần còn lại của "${prevBlocker}". ${anchor.name} có thể cập nhật tiến độ ngắn mỗi ngày để giữ nhịp.`,
      milestoneNote: `⏳ Đang giải: ${prevBlocker}`,
    }
  }
  const connector = members.find((m) => m.mbti[2] === 'F') ?? members[0]
  return {
    acknowledgment: `"${prevBlocker}" vẫn còn kẹt — không sao, cần nhìn lại cách tiếp cận.`,
    nextSuggestion: `${connector.name} gặp riêng từng người 10 phút để hỏi thật "đang vướng gì" — đôi khi vấn đề thật khác vấn đề được nói trong họp chung.`,
    milestoneNote: `❌ Chưa giải được: ${prevBlocker}`,
  }
}
