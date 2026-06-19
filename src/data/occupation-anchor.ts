// occupation-anchor.ts — Gap 4: occupation × MBTI group anchor (PM eyeball: ops/edu/creative draft)
import { getMbtiGroup, type MbtiGroup } from './self-coaching-weekly-tips'

export type OccGroup = 'tech' | 'biz' | 'ops' | 'edu' | 'creative' | 'other'
export type AnchorCard = 'strengths' | 'procrastination' | 'environment'

const OCCUPATION_GROUPS: Record<Exclude<OccGroup, 'other'>, string[]> = {
  tech: [
    'developer',
    'dev',
    'engineer',
    'kỹ sư',
    'lập trình',
    'designer',
    'thiết kế',
    'data',
    'product',
    'it',
    'phần mềm',
  ],
  biz: [
    'sales',
    'kinh doanh',
    'marketing',
    'business',
    'bd',
    'account',
    'bán hàng',
  ],
  ops: [
    'operation',
    'vận hành',
    'supply',
    'logistics',
    'admin',
    'hành chính',
    'hr',
    'nhân sự',
    'finance',
    'kế toán',
    'tài chính',
  ],
  edu: [
    'teacher',
    'giáo viên',
    'trainer',
    'coach',
    'lecturer',
    'giảng',
    'đào tạo',
    'education',
  ],
  creative: [
    'writer',
    'content',
    'creative',
    'sáng tạo',
    'media',
    'journalist',
    'nhà báo',
    'biên tập',
  ],
}

export const OCCUPATION_ANCHORS: Record<
  Exclude<OccGroup, 'other'>,
  Record<MbtiGroup, Record<AnchorCard, string>>
> = {
  tech: {
    ST: {
      strengths:
        'Trong môi trường kỹ thuật, nhóm ST thường mạnh ở việc triển khai chính xác, debug có hệ thống và đảm bảo code chạy đúng trước khi tối ưu.',
      procrastination:
        'Người làm kỹ thuật nhóm ST hay trì hoãn khi yêu cầu mơ hồ — thiếu spec rõ ràng làm bạn khó bắt đầu hơn là thiếu kỹ năng.',
      environment:
        'Bạn làm tốt nhất khi có yêu cầu rõ ràng, công cụ ổn định và ít bị ngắt quãng giữa các phiên làm việc sâu.',
    },
    SF: {
      strengths:
        'Trong tech, nhóm SF thường là cầu nối giữa kỹ thuật và con người — giải thích vấn đề phức tạp dễ hiểu và quan tâm trải nghiệm người dùng thật.',
      procrastination:
        'Bạn hay trì hoãn việc kỹ thuật khô khan, ít liên quan đến con người — dễ bắt đầu hơn khi thấy nó giúp ích cho ai đó cụ thể.',
      environment:
        'Bạn làm tốt nhất trong team hợp tác, có phản hồi thường xuyên và không khí tôn trọng lẫn nhau.',
    },
    NF: {
      strengths:
        'Trong tech, nhóm NF thường mạnh ở việc nhìn ra ý nghĩa lớn của sản phẩm và thiết kế trải nghiệm chạm tới người dùng, không chỉ chạy được.',
      procrastination:
        'Bạn hay trì hoãn task lặp lại hoặc thuần kỹ thuật không thấy mục đích — cần kết nối việc đang làm với bức tranh lớn để có lửa.',
      environment:
        'Bạn làm tốt nhất nơi có tầm nhìn rõ, được tự chủ về cách làm và thấy việc mình tạo tác động thật.',
    },
    NT: {
      strengths:
        'Trong tech, nhóm NT thường thiết kế kiến trúc chặt chẽ, nhìn ra điểm tối ưu hệ thống và liên tục cải tiến — đây là thế mạnh rõ nhất.',
      procrastination:
        'Bạn hay trì hoãn khi việc thiếu thử thách trí tuệ hoặc bị bó buộc quy trình — dễ bắt đầu hơn khi thấy bài toán đáng giải.',
      environment:
        'Bạn làm tốt nhất nơi có quyền tự chủ kỹ thuật, được thử cách mới và ít bị micromanage.',
    },
  },

  biz: {
    ST: {
      strengths:
        'Trong kinh doanh, nhóm ST thường mạnh ở việc chốt deal cụ thể, theo dõi số liệu chặt và thực thi quy trình bán hàng nhất quán.',
      procrastination:
        'Bạn hay trì hoãn khi việc đòi hỏi ứng biến cảm xúc nhiều hơn quy trình rõ ràng — dễ hơn khi có khung và mục tiêu cụ thể.',
      environment:
        'Bạn làm tốt nhất với mục tiêu doanh số rõ ràng, quy trình ổn định và kết quả đo được.',
    },
    SF: {
      strengths:
        'Trong sales/marketing, nhóm SF thường tỏa sáng ở việc xây quan hệ bền với khách, lắng nghe nhu cầu thật và tạo niềm tin lâu dài.',
      procrastination:
        'Bạn hay trì hoãn việc đòi hỏi từ chối thẳng hoặc gây áp lực lên khách — dễ hơn khi tập trung vào giúp họ giải quyết vấn đề.',
      environment:
        'Bạn làm tốt nhất nơi quan hệ được coi trọng, có hỗ trợ từ team và không khí ấm.',
    },
    NF: {
      strengths:
        'Trong kinh doanh, nhóm NF thường tỏa sáng nhất khi pitch ý tưởng mới và truyền cảm hứng về giá trị — không phải đọc theo kịch bản có sẵn.',
      procrastination:
        'Bạn hay trì hoãn việc lặp lại hoặc thuần con số không thấy ý nghĩa — cần kết nối với câu chuyện và tác động để có động lực.',
      environment:
        'Bạn làm tốt nhất nơi được sáng tạo cách tiếp cận, thấy sản phẩm có ý nghĩa và được công nhận.',
    },
    NT: {
      strengths:
        'Trong kinh doanh, nhóm NT thường mạnh ở chiến lược thị trường, phân tích cạnh tranh và thiết kế cách tiếp cận tối ưu dài hạn.',
      procrastination:
        'Bạn hay trì hoãn việc thực thi lặp lại sau khi đã giải xong bài toán chiến lược — phần "làm đi làm lại" ít hấp dẫn hơn phần "nghĩ ra".',
      environment:
        'Bạn làm tốt nhất nơi có tự chủ chiến lược, dữ liệu để phân tích và được thử hướng mới.',
    },
  },

  // PM eyeball: ops draft
  ops: {
    ST: {
      strengths:
        'Trong vận hành, nhóm ST thường mạnh ở việc giữ quy trình chạy đúng, xử lý sự cố có hệ thống và đảm bảo deadline được giữ.',
      procrastination:
        'Bạn hay trì hoãn khi thiếu checklist hoặc tiêu chí hoàn thành rõ — mơ hồ làm bạn khó bắt đầu hơn là khối lượng công việc.',
      environment:
        'Bạn làm tốt nhất khi có quy trình ổn định, công cụ theo dõi rõ và ít thay đổi đột ngột giữa chừng.',
    },
    SF: {
      strengths:
        'Trong vận hành, nhóm SF thường tỏa sáng ở việc phối hợp nhiều bên, giữ không khí đội ổn và xử lý xung đột nhỏ trước khi leo thang.',
      procrastination:
        'Bạn hay trì hoãn việc đòi hỏi từ chối hoặc đặt ranh giới với đồng nghiệp — dễ hơn khi thấy việc đó giúp cả team.',
      environment:
        'Bạn làm tốt nhất nơi có giao tiếp thường xuyên, team hỗ trợ lẫn nhau và sếp lắng nghe phản hồi từ tuyến.',
    },
    NF: {
      strengths:
        'Trong vận hành, nhóm NF thường mạnh ở việc nhìn thấy tác động của quy trình lên con người và cải thiện trải nghiệm làm việc, không chỉ tối ưu số.',
      procrastination:
        'Bạn hay trì hoãn báo cáo thuần số liệu hoặc task lặp không thấy ý nghĩa — cần nối việc với mục đích phục vụ ai đó.',
      environment:
        'Bạn làm tốt nhất nơi có văn hóa công bằng, được lắng nghe khi đề xuất cải tiến và thấy thay đổi có tác động thật.',
    },
    NT: {
      strengths:
        'Trong vận hành, nhóm NT thường mạnh ở việc tối ưu hệ thống, thiết kế quy trình hiệu quả và nhìn ra điểm nghẽn trước khi thành khủng hoảng.',
      procrastination:
        'Bạn hay trì hoãn việc lặp lại sau khi đã tối ưu xong mô hình — phần vận hành hàng ngày ít kích thích hơn phần thiết kế.',
      environment:
        'Bạn làm tốt nhất nơi có quyền cải tiến quy trình, dữ liệu để ra quyết định và ít bị bắt làm theo cách cũ không có lý do.',
    },
  },

  // PM eyeball: edu draft
  edu: {
    ST: {
      strengths:
        'Trong giáo dục/đào tạo, nhóm ST thường mạnh ở việc cấu trúc bài giảng rõ, theo dõi tiến độ học viên và đảm bảo mục tiêu đầu ra đạt được.',
      procrastination:
        'Bạn hay trì hoãn khi chương trình hoặc yêu cầu đánh giá mơ hồ — thiếu rubric rõ làm bạn khó chuẩn bị hơn là thiếu kiến thức.',
      environment:
        'Bạn làm tốt nhất khi có lịch ổn định, tài liệu chuẩn và kỳ vọng rõ ràng từ phía tổ chức.',
    },
    SF: {
      strengths:
        'Trong giáo dục, nhóm SF thường tỏa sáng ở việc tạo không gian an toàn, lắng nghe học viên và giữ động lực nhóm qua quan hệ cá nhân.',
      procrastination:
        'Bạn hay trì hoãn việc đòi hỏi phản hồi khó hoặc kỷ luật cứng — dễ hơn khi frame là giúp học viên phát triển.',
      environment:
        'Bạn làm tốt nhất nơi có tương tác thường xuyên, được hỗ trợ từ đồng nghiệp và không khí tôn trọng lẫn nhau.',
    },
    NF: {
      strengths:
        'Trong giáo dục, nhóm NF thường mạnh ở việc truyền cảm hứng, kết nối bài học với ý nghĩa và giúp học viên thấy họ đang phát triển.',
      procrastination:
        'Bạn hay trì hoãn hành chính thuần kỹ thuật hoặc báo cáo số — cần thấy tác động lên người học để có lửa.',
      environment:
        'Bạn làm tốt nhất nơi được tự chủ cách dạy, có không gian sáng tạo nội dung và thấy học viên thật sự thay đổi.',
    },
    NT: {
      strengths:
        'Trong giáo dục, nhóm NT thường mạnh ở việc thiết kế chương trình logic, cải tiến phương pháp và giải thích khái niệm phức tạp rõ ràng.',
      procrastination:
        'Bạn hay trì hoãn phần hành chính lặp hoặc giao tiếp cảm xúc nhiều — dễ bắt đầu hơn khi có bài toán giảng dạy đáng giải.',
      environment:
        'Bạn làm tốt nhất nơi được thử phương pháp mới, có quyền tự chủ nội dung và ít bị ràng buộc kịch bản cứng.',
    },
  },

  // PM eyeball: creative draft
  creative: {
    ST: {
      strengths:
        'Trong sáng tạo/nội dung, nhóm ST thường mạnh ở việc hoàn thiện chi tiết, bám deadline và deliver đúng brief đã chốt.',
      procrastination:
        'Bạn hay trì hoãn khi brief mơ hồ hoặc feedback không cụ thể — thiếu tiêu chí rõ làm bạn khó bắt đầu hơn là thiếu ý tưởng.',
      environment:
        'Bạn làm tốt nhất khi có deadline rõ, yêu cầu cụ thể và ít bị đổi hướng giữa chừng không có lý do.',
    },
    SF: {
      strengths:
        'Trong creative, nhóm SF thường tỏa sáng ở việc nắm bắt cảm xúc khán giả, hợp tác với team và tạo nội dung chạm được người đọc/xem.',
      procrastination:
        'Bạn hay trì hoãn việc làm một mình quá lâu hoặc nhận feedback cứng — dễ hơn khi có người cùng brainstorm.',
      environment:
        'Bạn làm tốt nhất trong team cởi mở, có phản hồi thường xuyên và không khí khuyến khích thử nghiệm.',
    },
    NF: {
      strengths:
        'Trong sáng tạo, nhóm NF thường mạnh ở việc kể chuyện có chiều sâu, bám giá trị và tạo tác phẩm có ý nghĩa thay vì chỉ đẹp.',
      procrastination:
        'Bạn hay trì hoãn brief thuần thương mại không khớp giá trị — cần thấy mục đích nội dung trước khi có lửa làm.',
      environment:
        'Bạn làm tốt nhất nơi được tự do sáng tạo, được lắng nghe ý tưởng và thấy tác phẩm có tác động thật với người xem.',
    },
    NT: {
      strengths:
        'Trong creative, nhóm NT thường mạnh ở concept mới, cấu trúc nội dung chặt và liên tục cải tiến cách kể chuyện hoặc thiết kế.',
      procrastination:
        'Bạn hay trì hoãn revision lặp hoặc task sản xuất thuần kỹ thuật — dễ bắt đầu hơn ở giai đoạn ý tưởng và khung.',
      environment:
        'Bạn làm tốt nhất nơi có quyền thử hướng mới, được phản biện ý tưởng và ít bị ép theo template cũ.',
    },
  },
}

export function getOccupationGroup(occupation?: string | null): OccGroup {
  if (!occupation) return 'other'
  const occ = occupation.toLowerCase().trim()
  for (const [group, keywords] of Object.entries(OCCUPATION_GROUPS)) {
    if (keywords.some((kw) => occ.includes(kw))) return group as OccGroup
  }
  return 'other'
}

export function getOccupationAnchor(
  occupation: string | null | undefined,
  mbtiType: string | null | undefined,
  card: AnchorCard,
): string | null {
  if (!occupation || !mbtiType) return null
  const occGroup = getOccupationGroup(occupation)
  if (occGroup === 'other') return null
  const mbtiGroup = getMbtiGroup(mbtiType)
  return OCCUPATION_ANCHORS[occGroup]?.[mbtiGroup]?.[card] ?? null
}
