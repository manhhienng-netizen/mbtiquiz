import type { TeamMember } from '../db/tncb-db'

interface DimensionCount {
  E: number
  I: number
  N: number
  S: number
  T: number
  F: number
  J: number
  P: number
}

function countDimensions(members: TeamMember[]): DimensionCount {
  const c: DimensionCount = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }
  for (const m of members) {
    const t = m.mbti.toUpperCase()
    if (t.length < 4) continue
    if (t[0] === 'E') c.E++
    else c.I++
    if (t[1] === 'N') c.N++
    else c.S++
    if (t[2] === 'T') c.T++
    else c.F++
    if (t[3] === 'J') c.J++
    else c.P++
  }
  return c
}

export interface TeamReport {
  strengths: string[]
  gapsWithCover: GapWithCover[]
  blindSpotRisk: string
  oneActionThisWeek: string
}

export interface GapWithCover {
  gap: string
  coverBy: string
  suggestion: string
}

export function analyzeTeam(
  members: TeamMember[],
  goal: string,
  blocker: string,
): TeamReport {
  const dim = countDimensions(members)
  const n = members.length

  const strengths: string[] = []
  const gapsWithCover: GapWithCover[] = []

  if (dim.J >= Math.ceil(n * 0.6))
    strengths.push(
      `Tổ chức và kỷ luật tốt (${dim.J}/${n} người thiên hoàn thành)`,
    )
  if (dim.S >= Math.ceil(n * 0.6))
    strengths.push(
      `Thực thi chắc chắn, chú ý chi tiết (${dim.S}/${n} người thiên cụ thể)`,
    )
  if (dim.N >= Math.ceil(n * 0.5))
    strengths.push(`Nhìn xa và sáng tạo (${dim.N}/${n} người thiên ý tưởng)`)
  if (dim.F >= Math.ceil(n * 0.5))
    strengths.push(
      `Gắn kết và quan tâm con người (${dim.F}/${n} người thiên cảm)`,
    )
  if (dim.E >= Math.ceil(n * 0.5))
    strengths.push(
      `Năng lượng và giao tiếp ngoài tốt (${dim.E}/${n} người hướng ngoại)`,
    )

  const findCover = (
    predicate: (m: TeamMember) => boolean,
    fallbackRole: string,
  ): string => {
    const candidate = members.find(predicate)
    return candidate ? candidate.name : fallbackRole
  }

  if (
    dim.E < Math.ceil(n * 0.3) ||
    (dim.T < Math.ceil(n * 0.4) && dim.J < Math.ceil(n * 0.4))
  ) {
    const cover = findCover(
      (m) => m.mbti.includes('J') || m.mbti[0] === 'E',
      'người quyết đoán nhất nhóm',
    )
    gapsWithCover.push({
      gap: 'Đội nghiêng thận trọng — chưa ai rõ ràng cầm nhịp tốc độ',
      coverBy: cover,
      suggestion: `Thử giao ${cover} vai trò "người chốt deadline" trong 3 quyết định tuần này — không cần đổi ai, chỉ rõ vai.`,
    })
  }

  if (dim.N < Math.ceil(n * 0.25)) {
    const cover = findCover(
      (m) => m.mbti[1] === 'N',
      'người cởi mở ý tưởng nhất',
    )
    gapsWithCover.push({
      gap: 'Đội thiên thực thi — ít người chủ động đưa ý tưởng mới',
      coverBy: cover,
      suggestion: `Khi đội bí, giao ${cover} vai trò "phá băng": đưa 3 ý tưởng thô để cả đội phản biện. Không cần đúng — cần mở.`,
    })
  }

  if (dim.F < Math.ceil(n * 0.25)) {
    const cover = findCover(
      (m) => m.mbti[2] === 'F' || m.mbti[0] === 'E',
      'người tinh tế với không khí nhóm nhất',
    )
    gapsWithCover.push({
      gap: 'Đội thiên lý trí — dễ bỏ qua không khí và cảm nhận của nhau',
      coverBy: cover,
      suggestion: `Giao ${cover} để ý "nhiệt độ" đội: ai đang quá tải, ai im lặng bất thường — báo bạn sớm.`,
    })
  }

  if (dim.J < Math.ceil(n * 0.25)) {
    const cover = findCover(
      (m) => m.mbti[3] === 'J',
      'người ngăn nắp nhất nhóm',
    )
    gapsWithCover.push({
      gap: 'Đội linh hoạt cao — dễ thiếu cấu trúc và follow-through',
      coverBy: cover,
      suggestion: `Giao ${cover} giữ "bản đồ tiến độ": ai làm gì, đến đâu — review ngắn mỗi tuần.`,
    })
  }

  let blindSpotRisk = ''
  if (dim.S >= Math.ceil(n * 0.7) && dim.J >= Math.ceil(n * 0.6))
    blindSpotRisk =
      'Cả đội thiên cẩn thận và quy trình → dễ chậm vì muốn hoàn hảo trước khi làm. Rủi ro: bỏ lỡ cơ hội cần quyết nhanh.'
  else if (dim.N >= Math.ceil(n * 0.7) && dim.P >= Math.ceil(n * 0.6))
    blindSpotRisk =
      'Cả đội thiên ý tưởng và linh hoạt → nhiều hướng mở nhưng dễ thiếu người chốt và thực thi đến cùng.'
  else if (dim.T >= Math.ceil(n * 0.7))
    blindSpotRisk =
      'Cả đội thiên lý trí → quyết định chắc nhưng dễ bỏ qua yếu tố con người, ảnh hưởng gắn kết lâu dài.'
  else if (dim.F >= Math.ceil(n * 0.7))
    blindSpotRisk =
      'Cả đội thiên cảm và hài hòa → gắn kết tốt nhưng dễ né quyết định khó hoặc phản hồi thẳng.'
  else
    blindSpotRisk =
      'Đội khá cân bằng về xu hướng — điểm cần để ý là phối hợp để mỗi người phát huy đúng vai.'

  let oneAction = ''
  if (gapsWithCover.length > 0) {
    oneAction = gapsWithCover[0].suggestion
  } else if (blocker.trim()) {
    oneAction = `Đội đang kẹt ở "${blocker.trim()}". Tuần này, dành 15 phút họp ngắn để cả đội nói thẳng 1 điều cản trở nhất — rồi chọn 1 việc gỡ trước.`
  } else {
    oneAction = `Đội đang ổn về xu hướng. Tuần này, xác nhận rõ với từng người vai trò họ đang giữ để hướng tới: "${goal.trim() || 'mục tiêu chung'}".`
  }

  return {
    strengths: strengths.length
      ? strengths
      : ['Đội đa dạng xu hướng — nền tốt để bù trừ cho nhau.'],
    gapsWithCover,
    blindSpotRisk,
    oneActionThisWeek: oneAction,
  }
}
