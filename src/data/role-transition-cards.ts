// role-transition-cards.ts — Chuyển đổi vai trò sau bổ nhiệm
// 5 pieces: role-transition-content-5pieces-reviewed-13062026.ts (PM WA review)
// Type-tint 8 type + 3 bối cảnh VN: spec merge 13/06/2026

import type { ScaleBand } from './scale-tint-content'

export interface RoleTransitionCard {
  id: string
  title: string
  body: string
  selfAsk: string
  context?: 'VN'
}

export interface RoleTransitionTypeTint {
  strength: string
  watchOut: string
  selfAsk: string
}

export interface RoleTransitionVnContext {
  id: string
  context: string
  note: string
  selfAsk: string
}

const PIECE_TITLES: Record<string, string> = {
  'rt-frame': 'Không phải do thiếu năng lực',
  'rt-diminisher': 'IC giỏi — team im lặng',
  'rt-identity': 'Mất đi identity chuyên gia',
  'rt-firstdecisions': 'Quy tắc ngầm từ tuần đầu',
  'rt-vn-feedback': 'Im lặng hai chiều',
}

export const ROLE_TRANSITION_CARDS: RoleTransitionCard[] = [
  {
    id: 'rt-frame',
    title: PIECE_TITLES['rt-frame'],
    body: `Hầu hết tân quản lý đều đối mặt với thách thức trong 18 tháng đầu, và đó không phải do thiếu năng lực. Chỉ 11% trường hợp underperform là do thiếu kỹ năng chuyên môn. Thực tế là kỹ năng đã đưa bạn tới vị trí này, nhưng cái cần rèn luyện tiếp theo là một dạng "giỏi" khác. Bạn không đơn độc trong giai đoạn chuyển đổi này.`,
    selfAsk: `Đâu là thứ bạn cần học mới để phát triển vai trò quản lý của mình?`,
  },
  {
    id: 'rt-diminisher',
    title: PIECE_TITLES['rt-diminisher'],
    body: `Nghịch lý là những IC càng giỏi thường càng dễ vô tình làm team phụ thuộc vào mình khi lên quản lý. Không phải vì ác ý, mà vì thói quen từ khi còn là chuyên gia — luôn biết câu trả lời và chủ động xử lý. Dấu hiệu là khi team ngừng đưa ra ý kiến, ít chủ động nêu vấn đề, và chờ đợi sếp nói trước trong meeting.`,
    selfAsk: `Trong cuộc họp gần nhất, team im lặng là vì họ không có suy nghĩ — hay vì đợi bạn lên tiếng?`,
  },
  {
    id: 'rt-identity',
    title: PIECE_TITLES['rt-identity'],
    body: `Dù trên danh nghĩa là thăng tiến, nhiều tân quản lý vẫn cảm giác như đang "mất đi thứ gì đó". Đó là mất đi phần identity gắn liền với vai trò chuyên gia — thứ từng là nguồn tự hào chính. Đôi khi sẽ có cảm giác muốn "nhảy vào làm lại cho nhanh", không phải vì không tin team mà vì đó là lĩnh vực mình tự tin. Những cảm xúc lẫn lộn này là phần tất yếu của quá trình chuyển đổi.`,
    selfAsk: `Điều gì khiến bạn luyến tiếc nhất khi nghĩ về vai trò cũ — và tại sao nó lại quan trọng với bạn như vậy?`,
  },
  {
    id: 'rt-firstdecisions',
    title: PIECE_TITLES['rt-firstdecisions'],
    body: `Hầu hết sách quản trị nhấn mạnh về "quyết định lớn", nhưng ít người nói với bạn rằng ngay từ tuần đầu, team đã observe từng phản ứng nhỏ của mình để tìm ra "luật chơi". Cách bạn xử lý sai lầm, phản ứng khi bị phản bác, khen hay phê bình ai — đều trở thành quy tắc ngầm. Bỏ qua một lần trễ deadline không phải ngoại lệ — team sẽ hiểu đó là chính sách mới. Bạn vẫn còn thời gian để chọn các phản ứng nhỏ một cách có ý thức.`,
    selfAsk: `Trong 2 tuần đầu với team, phản ứng nào của bạn có thể đang tạo ra "quy tắc ngầm" mà bạn chưa để ý?`,
  },
  {
    id: 'rt-vn-feedback',
    title: PIECE_TITLES['rt-vn-feedback'],
    body: `Nhiều tân quản lý ở Việt Nam sẽ trải qua cảm giác "mất kết nối với thực tế" ngay từ tháng đầu, khi cả sếp lẫn nhân viên cùng im lặng. Một phần là do quan niệm "sếp phải biết hết" — sếp mới ngại hỏi để khỏi lộ điểm yếu. Phần khác, nhân viên không muốn làm sếp mất mặt nên không nói hết sự thật. Vòng này dẫn đến không ai có thông tin đầy đủ. Để phá vỡ, sếp cần chủ động hỏi thay vì chờ team nói — đó là tín hiệu khác với văn hóa cũ.`,
    selfAsk: `Tuần này bạn có hỏi ai trong team "bạn đang thật sự thấy thế nào" — hay chỉ hỏi về tiến độ công việc?`,
    context: 'VN',
  },
]

export const ROLE_TRANSITION_TYPE_TINT: Record<string, RoleTransitionTypeTint> = {
  ISTJ: {
    strength: `Xu hướng nhất quán và đáng tin — team biết rõ kỳ vọng từ bạn. Watkins's "listening first" đến khá tự nhiên vì bạn không vội thay đổi.`,
    watchOut: `Xu hướng apply cách cũ vào context mới mà không đánh giá lại — "vì luôn làm thế này". Có thể chậm nhận ra khi team cần cách tiếp cận khác.`,
    selfAsk: `Quyết định này dựa trên "đây là cách đúng" — hay dựa trên hiểu biết thật về hoàn cảnh hiện tại?`,
  },
  ESTJ: {
    strength: `Xu hướng rõ ràng về accountability và kỳ vọng — team biết ai chịu trách nhiệm cái gì. Chuyển từ "tôi làm" sang "tôi tổ chức" khá tự nhiên.`,
    watchOut: `Xu hướng move to resolution quá nhanh — trả lời trước khi nghe đủ. Có thể bị nhìn là "không lắng nghe" dù intentions tốt.`,
    selfAsk: `Trong cuộc trò chuyện vừa rồi, bạn hỏi bao lâu trước khi bắt đầu đề xuất giải pháp?`,
  },
  ISFJ: {
    strength: `Xu hướng chú ý đến con người — nhớ chi tiết, nhận ra khi ai đó đang struggle. Tự nhiên trong việc tạo môi trường ổn định và an toàn.`,
    watchOut: `Xu hướng tránh conflict và góp ý khó — "không muốn làm ai khó chịu". Trong văn hóa face-saving VN, xu hướng này càng mạnh hơn.`,
    selfAsk: `Có góp ý nào bạn cần cho ai trong team nhưng chưa nói — và điều gì đang giữ bạn lại?`,
  },
  ESFJ: {
    strength: `Xu hướng tạo cohesion — aware về động lực nhóm, tự nhiên trong việc celebrate và acknowledge. Team thường engage tốt hơn.`,
    watchOut: `Xu hướng ưu tiên harmony ngắn hạn — tránh quyết định unpopular dù cần thiết. Có thể giải quyết vấn đề hộ team thay vì giúp họ tự giải quyết.`,
    selfAsk: `Quyết định gần nhất bạn defer vì "chưa đúng lúc" — thật ra bạn đang chờ khi nào?`,
  },
  INTJ: {
    strength: `Xu hướng suy nghĩ dài hạn và có strategy — giúp team hiểu direction, không chỉ task. Comfortable với ambiguity và quyết định khó.`,
    watchOut: `Xu hướng "giải quyết trong đầu rồi communicate kết luận" — team không thấy quá trình suy nghĩ, khó build buy-in. Có thể nghe như "đã quyết rồi" dù không có ý đó.`,
    selfAsk: `Quyết định tuần này — team có cơ hội đặt câu hỏi và ảnh hưởng vào không, hay họ chỉ nhận kết quả?`,
  },
  ENTJ: {
    strength: `Xu hướng clear vision và decisive — team biết đi đâu và tại sao. Comfortable với accountability và high standards.`,
    watchOut: `Xu hướng high pace + high standards = tạo áp lực không cố ý. Team có thể ngừng bring problems vì sợ bị criticize thay vì được support.`,
    selfAsk: `Team của bạn có mang problems đến với bạn — hay họ tự giải quyết trong im lặng?`,
  },
  ENFP: {
    strength: `Xu hướng tạo enthusiasm và inspire — team cảm thấy work có ý nghĩa. Tự nhiên trong việc thấy potential trong người khác.`,
    watchOut: `Xu hướng start nhiều initiatives nhưng không maintain follow-through — team mệt với "dự án tuần trước đâu rồi?". Consistency là thứ team mới cần nhiều nhất để build trust.`,
    selfAsk: `Những gì bạn commit với team trong 30 ngày qua — bạn đã follow through hết chưa?`,
  },
  INFP: {
    strength: `Xu hướng tạo môi trường authentic — team cảm thấy được là mình. Tự nhiên trong 1-1 meaningful conversations.`,
    watchOut: `Xu hướng tránh conflict và hard decisions — "không muốn hurt ai". Managing đòi hỏi những quyết định không ai vui. Có thể ở lại care-role quá lâu mà chưa fully transition sang accountability-role.`,
    selfAsk: `Có quyết định khó nào bạn cần đưa ra nhưng đang delay — và cái giá của việc delay đó là gì?`,
  },
}

export const ROLE_TRANSITION_VN_CONTEXTS: RoleTransitionVnContext[] = [
  {
    id: 'vn-ctx-nhanuoc',
    context: 'Nhà nước / Tổ chức lớn',
    note: `Trong tổ chức có khoảng cách quyền lực lớn, sếp mới thường ngại hỏi hoặc thừa nhận không biết vì sợ bị coi là yếu. Cùng lúc, team không push back vì sợ vượt quyền. Cả hai cùng im lặng — và không ai có thông tin thật để làm việc hiệu quả.`,
    selfAsk: `Tuần này bạn đã nói "tôi cần tìm hiểu thêm" hay "tôi không chắc" bao nhiêu lần?`,
  },
  {
    id: 'vn-ctx-sme',
    context: 'SME / Công ty gia đình',
    note: `Được bổ nhiệm vì tin tưởng thay vì kỹ năng quản lý → không có role model rõ ràng. Friction với team cũ là bạn bè tạo ra 2 trap: quá gần (không hold accountable) hoặc quá xa (mất kết nối). Cả hai đều phá vỡ authority theo cách khác nhau.`,
    selfAsk: `Bạn có đang hold bạn bè cũ cùng tiêu chuẩn với người khác trong team không?`,
  },
  {
    id: 'vn-ctx-startup',
    context: 'Startup / Tech',
    note: `IC giỏi nhất được promote nhưng startup thiếu người → vẫn phải làm cả IC lẫn manage. "Player-coach trap" không phải lười biếng — là không có đủ bandwidth để làm tốt cả hai. Mỗi lần nhảy vào làm IC là một lần signal với team "đừng tự quyết định."`,
    selfAsk: `Tuần này bao nhiêu % thời gian bạn dành cho IC work vs manage — và cái nào là role bạn được trả để làm?`,
  },
]

const SCALE_TO_VN_CONTEXT: Partial<Record<ScaleBand, string>> = {
  CORP: 'vn-ctx-nhanuoc',
  VUA: 'vn-ctx-sme',
  STARTUP: 'vn-ctx-startup',
}

export function getRoleTransitionVnContext(
  scaleBand: ScaleBand | null | undefined,
): RoleTransitionVnContext | undefined {
  if (!scaleBand) return undefined
  const id = SCALE_TO_VN_CONTEXT[scaleBand]
  if (!id) return undefined
  return ROLE_TRANSITION_VN_CONTEXTS.find((c) => c.id === id)
}
