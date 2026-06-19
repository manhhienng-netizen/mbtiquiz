/**
 * MANAGER DIAGNOSTIC — Guidance Cards
 * Tạo: 10/06/2026 21:00
 * Batch 1: S2 + S1 + S4 = 48 cards
 * Batch 2: S7 + S5 + S6 = 48 cards
 * Batch 3: S8 = 16 cards (invest field)
 * Batch 4: S3 = 6 pair cards (manager mediating, từ match-pair-content)
 *
 * Guardrail: MBTI KHÔNG dùng cho selection. "Hay/thường/có xu hướng", không "luôn luôn".
 */

import type { MbtiType } from './manager-coaching-b2b'

export const SITUATIONS = [
  { id: 'S1', label: 'Feedback khó', icon: '📢', desc: 'Nhân viên defensive / né tránh' },
  { id: 'S2', label: 'Động lực thấp', icon: '🔋', desc: 'Quiet quitting / mất lửa' },
  { id: 'S3', label: 'Xung đột đội', icon: '⚡', desc: 'Hai người ma sát — sếp mediate' },
  { id: 'S4', label: 'Miss kỳ vọng', icon: '⚠️', desc: 'Deadline trễ / chất lượng kém' },
  { id: 'S5', label: 'Muốn nghỉ', icon: '🚶', desc: 'Tín hiệu ra đi / stay conversation' },
  { id: 'S6', label: 'Sếp mới', icon: '🤝', desc: 'Thiết lập authority / build trust' },
  { id: 'S7', label: 'Nhịp hàng ngày', icon: '📅', desc: 'Check-in / khen / coaching tuần' },
  { id: 'S8', label: 'Xây nền tảng', icon: '🌱', desc: 'Đầu tư relationship — chưa có vấn đề' },
] as const

export type SituationId = (typeof SITUATIONS)[number]['id']

export type DiagnosticKey = `${SituationId}:${MbtiType}`

export type { MbtiType }

export interface GuidanceCard {
  signal?: string
  invest?: string
  approach: string[]
  avoid: string
  openQuestion: string
  openQuestion2?: string
  sampleScripts?: string[]
}

/** S3 keys: `S3:TYPE_A+TYPE_B` — types sorted alphabetically. */
export function buildS3DiagnosticKey(
  managerType: MbtiType,
  employeeType: MbtiType,
): string {
  return `S3:${[managerType, employeeType].sort().join('+')}`
}

export function resolveDiagnosticKey(
  situationId: SituationId,
  employeeType: MbtiType,
  managerType?: MbtiType,
): string {
  if (situationId === 'S3' && managerType) {
    return buildS3DiagnosticKey(managerType, employeeType)
  }
  return `${situationId}:${employeeType}`
}

export const MANAGER_DIAGNOSTIC: Record<string, GuidanceCard> = {

  // ============================================================
  // S2 — ĐỘNG LỰC THẤP (quiet quitting, mất lửa, thờ ơ)
  // ============================================================

  'S2:INTJ': {
    signal: 'INTJ thường âm thầm disengaged khi thấy công việc thiếu chiều sâu hoặc bị micromanage — bề ngoài vẫn làm nhưng không còn đầu tư thật sự.',
    approach: [
      'Giao bài toán có độ phức tạp và tự chủ cao hơn — INTJ cần thấy challenge thật, không phải task routine',
      'Hỏi về tầm nhìn dài hạn của họ cho vị trí này, không chỉ task trước mắt',
      'Giảm check-in về tiến độ, tăng thảo luận về strategy và lý do đằng sau quyết định',
    ],
    avoid: 'Đừng assign thêm task routine khi họ đang mất động lực — sẽ đẩy họ ra nhanh hơn.',
    openQuestion: 'Phần nào của việc bạn đang làm cảm thấy thật sự có tác động?',
  },

  'S2:INTP': {
    signal: 'INTP hay rút vào đầu mình khi mất động lực — vẫn ngồi đó nhưng đang giải quyết bài toán thú vị hơn trong đầu, không phải bài toán bạn giao.',
    approach: [
      'Hỏi họ muốn đào sâu vào vấn đề nào trong project hiện tại — để họ chọn góc thú vị nhất',
      'Kết nối task với câu hỏi mở chưa có câu trả lời — INTP cần intellectual puzzle, không cần milestone',
      'Cho phép explore và fail nhỏ trong sandbox — kết quả không chắc làm họ hứng khởi',
    ],
    avoid: 'Đừng đặt deadline cứng cho mọi thứ khi họ đang khám phá — sẽ làm tắt luôn động lực còn lại.',
    openQuestion: 'Có vấn đề nào trong dự án này bạn nghĩ chưa ai thực sự hiểu đúng không?',
  },

  'S2:ENTJ': {
    signal: 'ENTJ mất động lực khi thấy mình đang execute thay vì dẫn dắt — hay xuất hiện ở những meeting không quyết được gì và dần giảm năng lượng rõ rệt.',
    approach: [
      'Mở rộng phạm vi trách nhiệm hoặc giao ownership một mảng mới — ENTJ cần thấy mình đang build something',
      'Hỏi họ thấy team đang thiếu gì về chiến lược và muốn làm gì với điều đó',
      'Kết nối công việc hiện tại với bức tranh lớn hơn của tổ chức — rõ ràng, không mơ hồ',
    ],
    avoid: 'Đừng giữ họ ở vai trò thực thi đơn thuần khi họ đã sẵn sàng dẫn dắt — sẽ mất họ.',
    openQuestion: 'Bạn thấy cơ hội lớn nhất team đang bỏ lỡ là gì?',
  },

  'S2:ENTP': {
    signal: 'ENTP hay báo hiệu mất động lực bằng cách tranh luận mọi thứ không cần tranh luận, hoặc đột nhiên pitch ý tưởng mới liên tục mà không làm việc cũ.',
    approach: [
      'Giao role "devil\'s advocate" hoặc "problem finder" cho một dự án quan trọng — biến năng lượng tranh luận thành giá trị',
      'Cho phép họ experiment với approach mới cho một phần nhỏ của project',
      'Hỏi họ thấy điều gì trong cách làm hiện tại có thể làm tốt hơn gấp đôi',
    ],
    avoid: 'Đừng đóng cửa với mọi ý tưởng mới của họ — sẽ làm họ cảm thấy không ai muốn nghe và rút lui.',
    openQuestion: 'Nếu bạn có thể thay đổi một thứ trong cách chúng ta làm việc, bạn sẽ thay gì?',
  },

  'S2:INFJ': {
    signal: 'INFJ thường mất động lực khi không thấy công việc có ý nghĩa với người thật — hay chuyển sang "chỉ hoàn thành để xong" mà không còn đầu tư cảm xúc.',
    approach: [
      'Hỏi họ thấy công việc này đang giúp được ai — và kết nối rõ ràng với impact thật ngoài KPI',
      'Chia sẻ feedback tích cực từ người hưởng lợi từ công việc của họ — dù nhỏ',
      'Tạo không gian 1:1 để họ nói về điều đang làm họ cảm thấy không ổn — không phải về deadline',
    ],
    avoid: 'Đừng chỉ nói về numbers và output — INFJ cần thấy người được giúp đỡ, không phải metric tăng.',
    openQuestion: 'Bạn thấy công việc của mình đang tạo ra sự khác biệt ở đâu gần đây?',
  },

  'S2:INFP': {
    signal: 'INFP hay biểu hiện mất động lực bằng cách làm đúng yêu cầu tối thiểu nhưng sáng tạo biến mất — nộp đúng hạn nhưng không còn dấu ấn cá nhân.',
    approach: [
      'Hỏi họ còn thấy phần nào của công việc này đang đúng với giá trị của mình không',
      'Kết nối task cụ thể với tác động trực tiếp đến người cụ thể — không phải tổ chức trừu tượng',
      'Cho họ tự chủ về cách làm, không chỉ về kết quả — INFP cần không gian thể hiện cá nhân',
    ],
    avoid: 'Đừng push bằng competition hay ranking — INFP không bị thúc đẩy bởi so sánh và sẽ càng rút lui.',
    openQuestion: 'Có phần nào của công việc bạn vẫn thấy đáng làm không, dù nhỏ?',
  },

  'S2:ENFJ': {
    signal: 'ENFJ hay mất động lực khi cảm thấy không đang giúp ích được cho đội — hoặc khi môi trường có quá nhiều xung đột không giải quyết được.',
    approach: [
      'Giao role mentoring hoặc onboarding người mới — ENFJ lấy lại năng lượng khi giúp người khác phát triển',
      'Acknowledge explicitly công việc của họ đang ảnh hưởng tích cực thế nào đến đội',
      'Giải quyết hoặc đặt tên rõ các xung đột ngầm trong đội — ENFJ không làm việc tốt được trong môi trường căng thẳng không nói ra',
    ],
    avoid: 'Đừng để họ gánh cảm xúc của cả đội mà không có ai hỏi thăm họ — sẽ dẫn đến burnout.',
    openQuestion: 'Bạn thấy mình đang giúp được team nhiều nhất ở đâu gần đây?',
  },

  'S2:ENFP': {
    signal: 'ENFP hay báo hiệu mất động lực bằng cách trở nên yên lặng bất thường trong meeting, hoặc bắt đầu nhiều thứ mới mà không hoàn thành cái đang làm.',
    approach: [
      'Hỏi họ thấy điều gì trong project hiện tại còn thú vị — và build từ điểm đó ra',
      'Tạo một "sprint ngắn" có điểm kết thúc rõ ràng thay vì timeline dài — ENFP cần thấy finish line',
      'Kết nối công việc với người cụ thể đang được giúp — ENFP cần cả meaning lẫn excitement',
    ],
    avoid: 'Đừng đặt thêm deadline cứng và check-in dày lên khi họ đang chán — sẽ khiến họ cảm thấy bị giam cầm.',
    openQuestion: 'Nếu bạn có thể làm một phần của project này theo cách khác hoàn toàn, bạn sẽ thử gì?',
  },

  'S2:ISTJ': {
    signal: 'ISTJ hay mất động lực khi thấy tổ chức thiếu nhất quán hoặc kỳ vọng thay đổi liên tục — bắt đầu làm đúng quy trình nhưng không còn chủ động cải thiện.',
    approach: [
      'Làm rõ kỳ vọng ổn định và không thay đổi trong ít nhất một quý — ISTJ cần nền tảng vững để làm tốt',
      'Ghi nhận cụ thể độ tin cậy và chất lượng nhất quán của họ — đây là điều họ tự hào nhất',
      'Hỏi họ thấy quy trình nào cần cải thiện — và giao ownership cho họ fix nó',
    ],
    avoid: 'Đừng thay đổi priorities liên tục mà không giải thích — sẽ làm họ mất tin vào khả năng lên kế hoạch của bản thân.',
    openQuestion: 'Có điều gì trong cách chúng ta làm việc bạn thấy có thể ổn định hơn không?',
  },

  'S2:ISFJ': {
    signal: 'ISFJ hay biểu hiện mất động lực im lặng — tiếp tục làm nhưng giảm chủ động hỏi han, giảm để ý đến chi tiết, và ít chia sẻ concern hơn trước.',
    approach: [
      'Hỏi thẳng họ có đang ổn không trong 1:1 riêng — ISFJ không tự nói ra nhưng cần được hỏi',
      'Ghi nhận cụ thể những thứ nhỏ họ đang làm tốt — ISFJ cần thấy công việc chăm chút của mình được nhìn thấy',
      'Kiểm tra xem họ có đang gánh quá nhiều không — và chủ động giảm tải nếu cần',
    ],
    avoid: 'Đừng chờ họ tự lên tiếng khi có vấn đề — ISFJ sẽ im lặng gánh đến khi không chịu được.',
    openQuestion: 'Gần đây có điều gì khiến bạn cảm thấy không được hỗ trợ đủ không?',
  },

  'S2:ESTJ': {
    signal: 'ESTJ hay biểu hiện mất động lực bằng cách trở nên cứng nhắc hơn với quy tắc và giảm sáng kiến — vẫn làm tốt nhưng chỉ làm đúng được giao, không hơn.',
    approach: [
      'Giao ownership rõ ràng cho một mảng quan trọng — ESTJ cần trách nhiệm thật, không phải task',
      'Hỏi họ thấy team đang thiếu cấu trúc ở đâu và muốn xây gì',
      'Kết nối công việc với kết quả đo được và impact với tổ chức — ESTJ cần thấy việc mình làm đang tính',
    ],
    avoid: 'Đừng để họ ở vai trò thực thi không có quyền quyết định — sẽ làm họ frustrate và resign mentally.',
    openQuestion: 'Bạn thấy đội đang thiếu cấu trúc hoặc rõ ràng ở đâu nhất?',
  },

  'S2:ESFJ': {
    signal: 'ESFJ hay biểu hiện mất động lực khi harmony trong đội bị phá vỡ — bắt đầu ít tương tác tích cực hơn, ít volunteer giúp người khác hơn.',
    approach: [
      'Hỏi thẳng về tình trạng của đội theo mắt họ — ESFJ là người đọc động lực nhóm tốt nhất',
      'Giao role kết nối — onboarding, team event, hay làm cầu nối giữa các bên — để họ đóng góp theo cách tự nhiên',
      'Giải quyết xung đột công khai trong đội nếu có — ESFJ không làm việc tốt được trong môi trường căng thẳng',
    ],
    avoid: 'Đừng bỏ qua dấu hiệu căng thẳng trong nhóm — ESFJ sẽ mất động lực nhanh khi thấy đội không ổn.',
    openQuestion: 'Bạn thấy tinh thần của đội mình đang ở đâu gần đây?',
  },

  'S2:ISTP': {
    signal: 'ISTP hay biểu hiện mất động lực bằng cách làm việc một mình hoàn toàn và ít update hơn — không phải vì họ không làm, mà vì họ đang làm thứ họ thấy thú vị hơn.',
    approach: [
      'Giao problem kỹ thuật khó và cụ thể có tác động thật — ISTP cần challenge thực tế, không phải lý thuyết',
      'Hỏi họ đang giải quyết vấn đề gì và tại sao — thay vì check tiến độ',
      'Cho phép autonomy tối đa về cách làm, chỉ yêu cầu outcome rõ ràng',
    ],
    avoid: 'Đừng tăng cường meeting và check-in khi họ đang mất động lực — sẽ đẩy họ ra xa hơn.',
    openQuestion: 'Bạn đang giải quyết vấn đề nào thú vị nhất trong công việc gần đây?',
  },

  'S2:ISFP': {
    signal: 'ISFP hay biểu hiện mất động lực bằng cách rút lui khỏi sáng tạo — vẫn làm đúng yêu cầu nhưng không còn dấu ấn cá nhân hay sự chăm chút nhỏ.',
    approach: [
      'Hỏi họ thấy phần nào của công việc vẫn còn ý nghĩa với họ',
      'Kết nối output với người cụ thể đang được ảnh hưởng — ISFP cần thấy impact cụ thể, không phải số liệu',
      'Cho họ tự chủ về aesthetic hoặc cách tiếp cận — ISFP cần cảm thấy bản thân được thể hiện trong công việc',
    ],
    avoid: 'Đừng push bằng áp lực xã hội hoặc so sánh với người khác — ISFP sẽ càng rút lui.',
    openQuestion: 'Có phần nào của công việc gần đây bạn thấy thật sự là của mình không?',
  },

  'S2:ESTP': {
    signal: 'ESTP hay biểu hiện mất động lực bằng cách bắt đầu né tránh công việc boring và tìm drama hoặc khủng hoảng để giải quyết thay thế.',
    approach: [
      'Kết nối công việc với kết quả có thể thấy được ngay — ESTP cần feedback loop ngắn',
      'Giao task có element của giải quyết vấn đề thực tế và tương tác người — không phải paperwork',
      'Hỏi họ thấy cơ hội nào đang bị bỏ qua trong project — và để họ chase nó',
    ],
    avoid: 'Đừng giam họ vào reporting và documentation thuần túy khi đang mất động lực — sẽ mất họ nhanh.',
    openQuestion: 'Gần đây có cơ hội nào bạn thấy đang bỏ lỡ không?',
  },

  'S2:ESFP': {
    signal: 'ESFP hay biểu hiện mất động lực bằng cách trở nên ít vui vẻ hơn trong đội và bắt đầu đến trễ hoặc rời sớm — năng lượng xã hội của họ biến mất.',
    approach: [
      'Kết nối công việc với impact trực tiếp đến người — ESFP cần thấy mình đang tạo ra niềm vui cho ai đó',
      'Tạo quick win có thể chia sẻ và celebrate với đội — ESFP cần cảm giác chiến thắng tập thể',
      'Hỏi họ thấy điều gì trong công việc đang làm họ mệt và điều gì vẫn còn thú vị',
    ],
    avoid: 'Đừng cắt tương tác xã hội trong đội để "tập trung vào hiệu suất" — sẽ lấy đi nguồn năng lượng chính của ESFP.',
    openQuestion: 'Điều gì gần đây trong công việc làm bạn cảm thấy vẫn đáng đến?',
  },

  // ============================================================
  // S1 — FEEDBACK KHÓ (nhân viên defensive / né tránh / phủ nhận)
  // ============================================================

  'S1:INTJ': {
    signal: 'INTJ hay phản ứng với feedback bằng cách phản biện logic ngay lập tức — không phải vì phòng thủ cảm xúc mà vì thật sự thấy lỗi trong lập luận của bạn.',
    approach: [
      'Chuẩn bị data và ví dụ cụ thể trước khi gặp — INTJ sẽ kiểm tra mọi claim, nên đừng để họ bắt bạn nói chung chung',
      'Gửi tóm tắt feedback bằng văn bản trước cuộc gặp — cho họ thời gian xử lý một mình trước khi phản hồi',
      'Hỏi quan điểm của họ trước ("Bạn thấy buổi đó diễn ra như thế nào?") — để họ tự nhận ra trước nếu có thể',
    ],
    avoid: 'Đừng dùng "mọi người thấy" hoặc "cảm giác chung" — INTJ cần bằng chứng cụ thể, không phải consensus.',
    openQuestion: 'Bạn tự đánh giá phần đó như thế nào?',
  },

  'S1:INTP': {
    signal: 'INTP hay phản ứng với feedback bằng cách đặt câu hỏi về phương pháp đánh giá, hoặc đưa ra 5 exception khiến nhận xét của bạn không hoàn toàn đúng.',
    approach: [
      'Acknowledge trước rằng feedback này có thể không hoàn hảo — và mời họ cùng tìm hiểu vấn đề thật sự',
      'Frame như hypothesis cần kiểm chứng ("Mình quan sát thấy X — bạn thấy điều này có đúng không?")',
      'Gửi trước bằng văn bản để họ có thể phân tích một mình trước khi thảo luận',
    ],
    avoid: 'Đừng đưa ra kết luận cứng ngay từ đầu — hãy để họ cùng arrive tại kết luận đó thông qua dữ liệu.',
    openQuestion: 'Bạn nghĩ pattern này có đúng với những gì bạn quan sát về bản thân không?',
  },

  'S1:ENTJ': {
    signal: 'ENTJ hay phản ứng với feedback bằng cách counter-argue mạnh hoặc chuyển ngay sang "vậy kế hoạch hành động là gì" — né tránh phần nhận lỗi thật sự.',
    approach: [
      'Đặt kỳ vọng rõ từ đầu: buổi này để thảo luận, không phải để tranh luận — và giữ vững điều đó',
      'Acknowledge năng lực và thành tích của họ trước — ENTJ cần thấy bạn không phủ nhận toàn bộ',
      'Liên kết feedback với tác động cụ thể đến kết quả — không phải phong cách hay cảm xúc người khác',
    ],
    avoid: 'Đừng nhượng bộ logic của họ nếu điểm cốt lõi vẫn đúng — ENTJ sẽ mất tôn trọng và tiếp tục pattern.',
    openQuestion: 'Nếu kết quả đó xảy ra lại, bạn sẽ làm khác gì?',
  },

  'S1:ENTP': {
    signal: 'ENTP hay phản ứng với feedback bằng cách đồng ý ngay trước mặt nhưng đi ra ngoài và không thay đổi gì — hoặc tranh luận mọi điểm không phải vì phủ nhận mà vì phản xạ.',
    approach: [
      'Hỏi họ tự đánh giá trước khi bạn đưa nhận xét — cho họ cơ hội tự nhận ra',
      'Frame feedback như thách thức trí tuệ ("Điều thú vị là mình thấy pattern X — bạn nghĩ tại sao lại thế?")',
      'Yêu cầu cam kết cụ thể trước khi kết thúc buổi — không phải "sẽ cải thiện" mà là "sẽ làm Y vào thứ 6 này"',
    ],
    avoid: 'Đừng coi sự đồng ý trong buổi là cam kết thật — hỏi thêm một câu về hành động cụ thể.',
    openQuestion: 'Nếu bạn coach người khác có vấn đề này, bạn sẽ nói gì với họ?',
  },

  'S1:INFJ': {
    signal: 'INFJ hay internalize feedback quá mức — nghe xong im lặng, có vẻ chấp nhận, nhưng bên trong đang self-criticize nặng hơn bạn muốn.',
    approach: [
      'Tách biệt rõ ràng: "Đây là feedback về hành động cụ thể, không phải đánh giá bạn là người thế nào"',
      'Gặp riêng tư, không bao giờ trước nhóm — INFJ cần không gian an toàn để tiếp nhận',
      'Hỏi họ cảm thấy thế nào sau khi nghe — không phải hỏi họ có đồng ý không',
    ],
    avoid: 'Đừng đưa feedback và ngay lập tức hỏi kế hoạch hành động — cho họ thời gian xử lý trước.',
    openQuestion: 'Bạn cảm thấy thế nào về điều mình vừa chia sẻ?',
  },

  'S1:INFP': {
    signal: 'INFP hay trải nghiệm feedback như là tấn công vào bản thân, không phải vào hành động — dù bạn cẩn thận đến đâu, họ vẫn có thể hear "bạn không đủ tốt".',
    approach: [
      'Bắt đầu bằng genuine strength thật sự — không phải đệm lót, mà vì INFP cần thấy bạn nhìn thấy cả người họ trước khi nhận xét một phần',
      'Frame feedback như "hành động cụ thể trong tình huống cụ thể", không phải "bạn hay làm thế"',
      'Hỏi họ tự cảm nhận về tình huống đó trước khi bạn đưa nhận xét',
    ],
    avoid: 'Đừng dùng "bạn luôn luôn" hay "bạn không bao giờ" — INFP sẽ defend toàn bộ bản sắc, không phải chỉ hành động đó.',
    openQuestion: 'Khi bạn nhìn lại buổi đó, bạn cảm thấy phần nào không đúng với cách bạn muốn thể hiện?',
  },

  'S1:ENFJ': {
    signal: 'ENFJ hay phản ứng với feedback bằng cách agree ngay và bắt đầu xin lỗi quá nhiều — nhưng thực ra đang cảm thấy đau hơn họ thể hiện.',
    approach: [
      'Acknowledge cảm xúc họ đang có trước khi đi tiếp ("Mình hiểu điều này có thể khó nghe")',
      'Tách biệt: feedback này không phủ nhận việc họ care về đội',
      'Hỏi họ cần gì để xử lý được thông tin này — không phải hỏi họ sẽ sửa như thế nào',
    ],
    avoid: 'Đừng để họ xin lỗi liên tục và chuyển sang lo người khác cảm thấy thế nào — hãy giữ focus vào họ.',
    openQuestion: 'Bạn cần điều gì để có thể move forward với điều này?',
  },

  'S1:ENFP': {
    signal: 'ENFP hay né feedback trực tiếp bằng cách chuyển topic, agree ngay nhưng không thay đổi, hoặc overexplain context để giảm tension.',
    approach: [
      'Bắt đầu bằng genuine strength ("Mình thấy bạn đang làm tốt X") — không phải đệm lót mà là thật',
      'Frame feedback như cơ hội phát triển, gắn với điều họ đang muốn đạt được',
      'Hỏi họ tự đánh giá trước ("Bạn thấy buổi đó có thể làm tốt hơn ở đâu?")',
    ],
    avoid: 'Đừng dùng data và logic thuần — ENFP cần cảm thấy bạn care trước khi tiếp nhận được gì.',
    openQuestion: 'Nếu bạn có thể làm lại tình huống đó, bạn sẽ thử cách khác nào?',
  },

  'S1:ISTJ': {
    signal: 'ISTJ hay tiếp nhận feedback im lặng và gật đầu — nhưng bên trong đang kiểm tra xem bạn có đưa ra bằng chứng đủ mạnh không, và có thể hold grudge nếu thấy không công bằng.',
    approach: [
      'Đưa ví dụ cụ thể với ngày tháng và bối cảnh — ISTJ không tin vào nhận định chung chung',
      'Thừa nhận nếu có phần nào của vấn đề không hoàn toàn do họ — ISTJ cần thấy sự công bằng',
      'Đề xuất cải thiện theo quy trình cụ thể — ISTJ làm tốt hơn với checklist, không phải mơ hồ',
    ],
    avoid: 'Đừng đưa feedback dựa trên cảm nhận hoặc "vibe" — sẽ bị dismiss ngay.',
    openQuestion: 'Bạn thấy mình cần thêm gì để làm tốt hơn phần đó?',
  },

  'S1:ISFJ': {
    signal: 'ISFJ hay tiếp nhận feedback bằng cách xin lỗi ngay và nhận tất cả — kể cả phần không hoàn toàn là lỗi của họ — và sau đó tự chỉ trích nặng trong đầu.',
    approach: [
      'Bắt đầu bằng điều cụ thể họ đang làm tốt — ISFJ cần biết bạn nhìn thấy nỗ lực của họ',
      'Phân biệt rõ phần nào là thật sự cần cải thiện và phần nào là context ngoài tầm kiểm soát của họ',
      'Kết thúc bằng cam kết hỗ trợ cụ thể — đừng kết thúc buổi chỉ ở điểm cần cải thiện',
    ],
    avoid: 'Đừng đưa feedback trước nhiều người — dù nhẹ nhàng đến đâu, ISFJ vẫn sẽ ảnh hưởng nặng.',
    openQuestion: 'Bạn cần hỗ trợ gì để làm tốt hơn phần này?',
  },

  'S1:ESTJ': {
    signal: 'ESTJ hay tiếp nhận feedback tốt về kết quả nhưng defensive khi feedback về phong cách lãnh đạo hoặc cách đối xử với người — thường counter bằng "nhưng kết quả tốt mà".',
    approach: [
      'Tách biệt rõ: kết quả tốt không nullify impact đến người khác — cả hai đều quan trọng',
      'Dùng data cụ thể về tác động đến team nếu có — ESTJ tôn trọng bằng chứng',
      'Frame như kỹ năng cần phát triển thêm để đạt kết quả lớn hơn — không phải phê phán cá nhân',
    ],
    avoid: 'Đừng chỉ nói về cảm xúc của người khác mà không gắn với kết quả kinh doanh — ESTJ sẽ coi là không liên quan.',
    openQuestion: 'Bạn nghĩ phần đó ảnh hưởng thế nào đến hiệu quả chung của đội?',
  },

  'S1:ESFJ': {
    signal: 'ESFJ hay tiếp nhận feedback như tấn công vào mối quan hệ — và có thể phản ứng bằng cách xin lỗi quá mức hoặc sau đó lo lắng bạn không còn ủng hộ họ nữa.',
    approach: [
      'Khẳng định mối quan hệ trước: "Mình chia sẻ điều này vì mình muốn bạn thành công"',
      'Chọn thời điểm khi cả hai đang thoải mái — không phải ngay sau sự cố',
      'Hỏi cảm nhận của họ sau khi chia sẻ — và đảm bảo họ ra về cảm thấy được ủng hộ',
    ],
    avoid: 'Đừng kết thúc buổi chỉ với việc cần cải thiện — ESFJ cần ra về biết rằng mối quan hệ vẫn ổn.',
    openQuestion: 'Bạn cảm thấy thế nào sau những gì mình chia sẻ?',
  },

  'S1:ISTP': {
    signal: 'ISTP hay tiếp nhận feedback im lặng và không phản ứng nhiều — không phải họ không quan tâm, mà vì đang xử lý và sẽ quyết định sau khi verify.',
    approach: [
      'Dùng ví dụ cụ thể từ tình huống thật — ISTP không bị thuyết phục bởi generalization',
      'Ngắn gọn và thẳng — ISTP không cần nhiều context hay cảm xúc, chỉ cần fact',
      'Để họ có thời gian xử lý — đừng expect phản ứng ngay trong buổi',
    ],
    avoid: 'Đừng diễn giải sự im lặng của họ là không tiếp nhận — hãy hỏi họ nghĩ gì thay vì assume.',
    openQuestion: 'Bạn cần thêm thông tin gì để đánh giá điều này đúng hơn?',
  },

  'S1:ISFP': {
    signal: 'ISFP hay thu mình lại khi nhận feedback và có thể agree trên bề mặt trong khi bên trong cảm thấy bị hiểu lầm hoặc không được nhìn thấy đúng.',
    approach: [
      'Tạo không gian an toàn và riêng tư — ISFP cần biết bạn không phán xét trước khi mở ra',
      'Hỏi cảm nhận của họ về tình huống đó trước khi đưa nhận xét của bạn',
      'Tách feedback về hành động ra khỏi bất kỳ gợi ý nào về giá trị hay bản thân họ',
    ],
    avoid: 'Đừng push họ phản hồi ngay trong buổi — ISFP cần thời gian và không gian để xử lý trước khi chia sẻ thật.',
    openQuestion: 'Bạn cảm thấy tình huống đó diễn ra như thế nào từ góc nhìn của bạn?',
  },

  'S1:ESTP': {
    signal: 'ESTP hay tiếp nhận feedback tốt khi gắn với kết quả thật, nhưng defensive khi feedback về "soft skills" hoặc cảm nhận của người khác — thường dismiss là không quantifiable.',
    approach: [
      'Gắn feedback với kết quả cụ thể đo được — "việc X dẫn đến outcome Y" thay vì "mọi người cảm thấy Z"',
      'Ngắn gọn và direct — ESTP mất kiên nhẫn với nhiều context',
      'Hỏi họ thấy cách giải quyết nhanh nhất là gì — ESTP thích action hơn reflection',
    ],
    avoid: 'Đừng kéo dài buổi với nhiều analysis và background — ESTP muốn biết cần làm gì ngay.',
    openQuestion: 'Bạn thấy cách nhanh nhất để xử lý điều này là gì?',
  },

  'S1:ESFP': {
    signal: 'ESFP hay tiếp nhận feedback với cảm xúc cao — có thể vui vẻ ngay sau, có thể upset rõ ràng — và cần thấy bạn vẫn ủng hộ họ sau buổi đó.',
    approach: [
      'Bắt đầu bằng genuine strength và sự ủng hộ — không phải để làm ngọt mà vì ESFP tiếp nhận tốt hơn khi cảm thấy được care',
      'Giữ tone ấm áp và không formal — ESFP bị ảnh hưởng bởi cách nói nhiều hơn content',
      'Kết thúc với câu cụ thể về sự ủng hộ của bạn — không kết thúc ở điểm cần cải thiện',
    ],
    avoid: 'Đừng formal hóa quá buổi feedback — ESFP đóng cửa với bầu không khí căng thẳng và có thể không tiếp nhận được gì.',
    openQuestion: 'Bạn cảm thấy thế nào về điều này — nói thật nhé?',
  },

  // ============================================================
  // S4 — MISS KỲ VỌNG (deadline trễ / chất lượng kém liên tiếp)
  // ============================================================

  'S4:INTJ': {
    signal: 'INTJ thường miss kỳ vọng khi kỳ vọng không được truyền đạt đủ rõ lý do đằng sau, hoặc khi họ không đồng ý với approach và âm thầm làm cách khác.',
    approach: [
      'Hỏi họ hiểu kỳ vọng đó là gì theo cách của họ — thường gap nằm ở đây',
      'Hỏi thẳng xem họ có đồng ý với approach không — INTJ cần đồng ý về logic thì mới execute tốt',
      'Thiết lập checkpoint ngắn hơn không phải để micromanage mà để catch drift sớm',
    ],
    avoid: 'Đừng chỉ repeat kỳ vọng to hơn hoặc thêm deadline cứng — cần tìm hiểu root cause thật sự trước.',
    openQuestion: 'Phần nào của kỳ vọng này bạn thấy chưa rõ hoặc chưa đồng ý?',
  },

  'S4:INTP': {
    signal: 'INTP thường miss deadline vì đang hoàn thiện thêm trong đầu hoặc bị kéo vào problem thú vị hơn — không phải lười, mà là tiêu chuẩn của họ khác với deadline của bạn.',
    approach: [
      'Làm rõ "đủ tốt" trông như thế nào trước khi bắt đầu — INTP cần biết 80% là đủ hay cần 100%',
      'Hỏi họ đang gặp khó ở đâu cụ thể — thường có một chỗ mắc kẹt kỹ thuật họ chưa nói ra',
      'Tạo milestone nhỏ có kết quả rõ ràng thay vì một deadline lớn',
    ],
    avoid: 'Đừng chỉ nhắc deadline mà không hỏi họ đang gặp vướng mắc gì — sẽ không giải quyết được gốc rễ.',
    openQuestion: 'Phần nào đang khó nhất và chặn bạn tiến lên?',
  },

  'S4:ENTJ': {
    signal: 'ENTJ ít khi miss deadline do thiếu năng lực — thường là vì đang pursue goal lớn hơn theo cách của họ và không thấy milestone nhỏ là quan trọng.',
    approach: [
      'Kết nối milestone cụ thể với bức tranh lớn họ đang pursue — tại sao milestone nhỏ này quan trọng cho strategy',
      'Hỏi thẳng: có resource hoặc authority nào họ cần nhưng chưa có không',
      'Review kỳ vọng cùng nhau để đảm bảo alignment — ENTJ đôi khi đang pursue version kỳ vọng cao hơn của chính họ',
    ],
    avoid: 'Đừng micromanage steps — ENTJ cần ownership và sẽ resist nếu cảm thấy bị control.',
    openQuestion: 'Bạn thấy điều gì đang chặn kết quả mà bạn biết mình có thể đạt được?',
  },

  'S4:ENTP': {
    signal: 'ENTP thường miss kỳ vọng ở giai đoạn execution — họ excellent ở idea và design nhưng bị distract hoặc chán khi đến phần implement chi tiết.',
    approach: [
      'Hỏi thẳng: phần nào của task này họ thấy boring và đang né — để cùng tìm solution',
      'Tìm ai đó có thể pair với họ ở giai đoạn execution — ENTP làm tốt hơn khi có người giữ accountability',
      'Chia task thành sprint ngắn với checkpoint rõ — giảm khoảng thời gian có thể drift',
    ],
    avoid: 'Đừng chỉ nhấn mạnh tầm quan trọng mà không thay đổi gì về structure — ENTP hiểu tầm quan trọng, vấn đề là execution.',
    openQuestion: 'Phần nào của việc này đang khiến bạn không muốn tiếp tục?',
  },

  'S4:INFJ': {
    signal: 'INFJ thường miss kỳ vọng khi họ cảm thấy task thiếu ý nghĩa hoặc đang làm việc trong môi trường có nhiều tension chưa được giải quyết.',
    approach: [
      'Hỏi thẳng có điều gì đang làm phiền họ mà chưa nói ra không — INFJ thường có blocker cảm xúc trước blocker kỹ thuật',
      'Kết nối task với impact rõ ràng đến người cụ thể — INFJ cần thấy ý nghĩa mới fully engage',
      'Kiểm tra workload tổng thể — INFJ dễ overcommit giúp người khác và thiếu thời gian cho việc của mình',
    ],
    avoid: 'Đừng chỉ hỏi về task mà không hỏi về trạng thái của họ — INFJ thường cần check-in con người trước khi check-in công việc.',
    openQuestion: 'Có điều gì ngoài task đang làm bạn khó tập trung gần đây không?',
  },

  'S4:INFP': {
    signal: 'INFP thường miss kỳ vọng khi task cảm thấy vô nghĩa hoặc trái với giá trị của họ — không phải thiếu capability mà là thiếu connection với lý do tại sao.',
    approach: [
      'Giải thích "tại sao việc này quan trọng" thật sự — không phải business case, mà là impact với người thật',
      'Hỏi họ thấy cách làm nào có ý nghĩa hơn — INFP làm tốt nhất khi có chút tự chủ về cách tiếp cận',
      'Kiểm tra xem họ có đang unclear về kỳ vọng không — INFP ít khi hỏi lại khi không chắc',
    ],
    avoid: 'Đừng chỉ nhấn mạnh deadline và hậu quả — sẽ làm tăng lo lắng nhưng không giải quyết được blocker thật.',
    openQuestion: 'Bạn hiểu tại sao việc này quan trọng không — và điều đó có make sense với bạn không?',
  },

  'S4:ENFJ': {
    signal: 'ENFJ thường miss kỳ vọng vì đang giúp đỡ người khác quá nhiều và thiếu thời gian cho việc của mình — hoặc vì tránh đưa ra kết quả chưa đủ tốt để không làm người khác thất vọng.',
    approach: [
      'Hỏi thẳng có đang giúp người khác nhiều đến mức ảnh hưởng đến công việc của chính họ không',
      'Reassure rằng kết quả 80% đúng hạn tốt hơn 100% trễ — ENFJ cần được phép không hoàn hảo',
      'Kiểm tra workload tổng thể và giúp họ prioritize nếu cần',
    ],
    avoid: 'Đừng chỉ push deadline mà không hỏi về tổng load — ENFJ thường bị overcommit từ nhiều phía.',
    openQuestion: 'Bạn đang gánh bao nhiêu thứ cùng lúc gần đây?',
  },

  'S4:ENFP': {
    signal: 'ENFP thường miss kỳ vọng ở giai đoạn execution cuối — họ start strong nhưng mất energy và focus khi đến phần detail và polish.',
    approach: [
      'Hỏi họ đang stuck ở đâu cụ thể — thường có một obstacle cụ thể làm chậm lại, không phải lazy',
      'Tạo accountability partner hoặc check-in ngắn giữa chừng — ENFP làm tốt hơn khi biết có người sẽ hỏi',
      'Chia kỳ vọng thành phần smaller với celebration nhỏ ở mỗi bước',
    ],
    avoid: 'Đừng dùng guilt hoặc so sánh với người khác — sẽ không thúc đẩy mà chỉ làm ENFP cảm thấy tệ và procrastinate thêm.',
    openQuestion: 'Bạn đang stuck ở đâu cụ thể trong việc này?',
  },

  'S4:ISTJ': {
    signal: 'ISTJ ít khi miss kỳ vọng rõ ràng — khi xảy ra thường do kỳ vọng thay đổi mà họ chưa được thông báo, hoặc do scope creep làm quá tải.',
    approach: [
      'Kiểm tra xem kỳ vọng có thay đổi gần đây mà không được communicate rõ không',
      'Hỏi xem có workload nào khác đang cạnh tranh priority không — ISTJ sẽ không tự complain',
      'Làm rõ priority tuyệt đối nếu có conflict — ISTJ cần biết rõ cái gì quan trọng hơn khi phải chọn',
    ],
    avoid: 'Đừng assume họ hiểu được priority order mà không nói thẳng — ISTJ cần rõ ràng về thứ tự ưu tiên.',
    openQuestion: 'Có thứ gì đang cạnh tranh priority với việc này mà mình chưa biết không?',
  },

  'S4:ISFJ': {
    signal: 'ISFJ thường miss kỳ vọng vì đang giúp người khác quá nhiều, hoặc vì không dám hỏi khi unclear về yêu cầu — thà làm sai còn hơn làm phiền.',
    approach: [
      'Tạo môi trường an toàn để hỏi lại kỳ vọng — ISFJ cần biết hỏi không bị coi là kém',
      'Hỏi thẳng có đang gánh thêm việc của người khác không',
      'Kiểm tra xem họ có đủ resource và thông tin cần thiết không — ISFJ ít khi chủ động đòi',
    ],
    avoid: 'Đừng để họ gánh một mình trong im lặng — hãy check in chủ động giữa chừng thay vì chờ kết quả.',
    openQuestion: 'Bạn có đủ thông tin và resource để làm tốt phần này không?',
  },

  'S4:ESTJ': {
    signal: 'ESTJ ít khi miss deadline — khi xảy ra thường do blocker bên ngoài họ không có authority để giải quyết, và họ không escalate vì tự xử lý.',
    approach: [
      'Hỏi có blocker nào họ đang tự xử lý mà cần bạn can thiệp không',
      'Kiểm tra xem kỳ vọng về quality và format có rõ ràng không — ESTJ đôi khi làm rất tốt theo chuẩn của họ nhưng không khớp với yêu cầu thật',
      'Nếu là pattern, hỏi thẳng về root cause — ESTJ sẽ honest khi được hỏi trực tiếp',
    ],
    avoid: 'Đừng micromanage steps khi ESTJ có track record tốt — tìm hiểu cái gì đã thay đổi thay vì tăng oversight.',
    openQuestion: 'Có blocker nào bạn đang tự xử lý mà có thể cần mình tháo giúp không?',
  },

  'S4:ESFJ': {
    signal: 'ESFJ thường miss kỳ vọng khi đang conflict giữa yêu cầu của bạn và yêu cầu của người khác mà họ cũng muốn làm vui — và ưu tiên cái gần hơn.',
    approach: [
      'Làm rõ priority order rõ ràng khi có nhiều yêu cầu cạnh tranh — ESFJ cần biết của bạn là quan trọng nhất',
      'Hỏi thẳng có ai khác đang yêu cầu thứ gì conflict không',
      'Reassure rằng bạn ổn với việc họ nói không với người khác khi cần — ESFJ cần permission',
    ],
    avoid: 'Đừng assume họ sẽ tự prioritize đúng — họ đang cố làm vui tất cả mọi người cùng lúc.',
    openQuestion: 'Có ai khác đang yêu cầu thứ gì đang conflict với việc này không?',
  },

  'S4:ISTP': {
    signal: 'ISTP thường miss kỳ vọng vì đang solve problem theo cách mình thấy tốt nhất, không nhất thiết là cách được yêu cầu — hoặc vì không communicate tiến độ đủ.',
    approach: [
      'Hỏi họ đang giải quyết problem theo hướng nào — ISTP đôi khi đang làm đúng hướng nhưng khác format',
      'Establish update checkpoint ngắn không phải để control mà để catch drift',
      'Hỏi thẳng có obstacle kỹ thuật nào đang chặn không — ISTP sẽ không tự báo cáo',
    ],
    avoid: 'Đừng xem sự im lặng là mọi thứ đang ổn — ISTP không báo cáo proactively dù có vấn đề.',
    openQuestion: 'Bạn đang tiếp cận vấn đề này theo hướng nào?',
  },

  'S4:ISFP': {
    signal: 'ISFP thường miss kỳ vọng khi task thiếu connection với điều họ care, hoặc khi áp lực bên ngoài làm họ block về sáng tạo và không biết bắt đầu từ đâu.',
    approach: [
      'Hỏi họ đang cảm thấy thế nào về task này — không phải về tiến độ mà về trải nghiệm làm nó',
      'Kết nối với ý nghĩa cụ thể — ai được giúp, điều gì trở nên tốt hơn',
      'Cho họ không gian và tự chủ về cách làm — ISFP làm tốt nhất khi không bị xem mọi bước',
    ],
    avoid: 'Đừng tăng pressure và deadline khi họ đang block — thường làm tệ hơn vì ISFP cần cảm thấy an toàn để creative.',
    openQuestion: 'Bạn đang cảm thấy thế nào về việc này — có phần nào đang khó tiếp cận không?',
  },

  'S4:ESTP': {
    signal: 'ESTP thường miss kỳ vọng về chất lượng hoặc documentation vì họ đã chuyển sang vấn đề tiếp theo khi coi problem đã "solved enough".',
    approach: [
      'Làm rõ "done" cụ thể trông như thế nào bao gồm cả documentation và handover — không để mặc định',
      'Hỏi thẳng về phần nào họ thấy không cần thiết — thường có thể negotiate scope hợp lý',
      'Kết nối quality requirement với hậu quả thật của việc thiếu nó — ESTP respond với impact thực tế',
    ],
    avoid: 'Đừng chỉ nói "cần chú ý hơn" — hãy cụ thể "phần X cần Y level of detail vì lý do Z".',
    openQuestion: 'Bạn thấy phần nào của kỳ vọng này đang không clear hoặc không cần thiết?',
  },

  'S4:ESFP': {
    signal: 'ESFP thường miss kỳ vọng khi task quá boring ở giai đoạn cuối, hoặc khi có opportunity mới hấp dẫn hơn xuất hiện và họ chuyển attention.',
    approach: [
      'Hỏi họ đang stuck ở phần nào và cảm thấy thế nào về nó — honest answer sẽ cho bạn biết nguyên nhân thật',
      'Celebrate progress giữa chừng — ESFP cần frequent positive reinforcement, không chỉ khi xong',
      'Kết nối finish line với something họ care — sẽ làm gì sau khi xong cái này',
    ],
    avoid: 'Đừng dùng deadline và hậu quả thuần túy — ESFP cần thấy phần tích cực của việc hoàn thành, không phải chỉ hậu quả của không hoàn thành.',
    openQuestion: 'Điều gì đang làm bạn khó finish phần này?',
  },

  'S7:INTJ': {
    signal: 'INTJ tiếp nhận tốt nhất với check-in bằng văn bản ngắn, async — họ không cần (và không thích) small talk sáng, nhưng sẽ respond kỹ nếu bạn hỏi đúng câu.',
    approach: [
      'Morning: 1 tin Zalo ngắn — "Hôm nay bạn focus vào phần nào?" thay vì check-in miệng — INTJ thích có thời gian suy nghĩ trước khi trả lời',
      'Khen cụ thể: "Phân tích bạn gửi hôm qua rõ logic và đúng ý — cảm ơn" (behavior + impact, không chỉ "tốt")',
      'Nhịp coaching: 1 lần/tuần async hoặc meeting ngắn 15 phút có agenda gửi trước — không drop-in bất ngờ',
    ],
    avoid: 'Đừng check-in miệng nhiều lần trong ngày — INTJ cần deep work time và mỗi interruption làm mất focus thật.',
    openQuestion: 'Tuần này bạn đang tiến đến đâu với phần mình giao — có gì cần tháo gỡ không?',
  },

  'S7:INTP': {
    signal: 'INTP tiếp nhận tốt nhất khi check-in là câu hỏi thật cần suy nghĩ — không phải status update routine mà là vấn đề cần explore.',
    approach: [
      'Morning: "Bạn đang nghĩ về vấn đề gì?" hơn là "Hôm nay bạn làm gì?" — INTP thích bắt đầu từ câu hỏi, không phải task list',
      'Khen cụ thể: "Cách bạn frame vấn đề hôm qua mở ra direction mình chưa nghĩ đến" — khen về insight, không chỉ về output',
      'Nhịp coaching: ít meeting hơn, nhiều async hơn — email hoặc message với câu hỏi để họ suy nghĩ và respond khi sẵn sàng',
    ],
    avoid: 'Đừng require daily status report ngắn gọn — INTP sẽ thấy đó là overhead vô nghĩa và dần không làm.',
    openQuestion: 'Có vấn đề gì trong tuần này bạn thấy thú vị hoặc cần nghĩ thêm không?',
  },

  'S7:ENTJ': {
    signal: 'ENTJ tiếp nhận tốt nhất khi check-in gắn với strategy và kết quả — họ cần biết bạn cũng đang tracking big picture, không chỉ micromanage task.',
    approach: [
      'Morning: "Hôm nay bạn đang tiến đến milestone nào?" — ENTJ cần kết nối ngay với outcome, không phải activity',
      'Khen cụ thể: "Quyết định bạn đưa ra hôm qua về X tiết kiệm thời gian cho cả đội — đó là lead tốt" — khen về impact và leadership',
      'Nhịp coaching: weekly meeting ngắn về progress và obstacle — nhưng ENTJ là người dẫn dắt cuộc trò chuyện đó, không phải bạn',
    ],
    avoid: 'Đừng check-in về detail steps khi ENTJ đang handle outcome tốt — sẽ cảm thấy bị micromanage.',
    openQuestion: 'Tuần này bạn cần tháo gỡ gì để team đạt được kết quả bạn đang nhắm đến?',
  },

  'S7:ENTP': {
    signal: 'ENTP tiếp nhận tốt nhất khi check-in là conversation thật, không phải checklist — họ không respond tốt với routine và cần đủ space để share ý tưởng.',
    approach: [
      'Morning: "Có idea gì mới không — hoặc có gì đang block bạn?" — hai câu để họ chọn direction',
      'Khen cụ thể: "Câu hỏi bạn đặt ra trong meeting hôm qua giúp đội nhìn thấy góc chưa ai nghĩ đến" — khen về contribution, không phải compliance',
      'Nhịp coaching: informal conversation trong context tự nhiên tốt hơn scheduled meeting — ENTP dễ mở khi không formal',
    ],
    avoid: 'Đừng dùng rigid agenda cho check-in với ENTP — sẽ coi đó là overhead và mentally checkout.',
    openQuestion: 'Tuần này bạn đang thấy opportunity hoặc vấn đề gì mà mình chưa để ý?',
  },

  'S7:INFJ': {
    signal: 'INFJ tiếp nhận tốt nhất khi check-in có chiều sâu và thật — họ không comfortable với small talk surface và sẽ mở ra khi cảm thấy cuộc trò chuyện có ý nghĩa.',
    approach: [
      'Morning: "Bạn đang thấy thế nào hôm nay — có gì cần xử lý trước không?" — bắt đầu từ trạng thái người, không phải task',
      'Khen cụ thể: "Cách bạn handle situation với khách hàng hôm qua — giữ được cả relationship lẫn kết quả — đó là cái khó làm được" — khen về wisdom, không chỉ về output',
      'Nhịp coaching: 1:1 riêng tư, không brief — INFJ cần không gian thật để chia sẻ concern và insight',
    ],
    avoid: 'Đừng check-in bề mặt liên tục mà không có 1:1 thật — INFJ sẽ dần ít chia sẻ và bạn mất đi signal quan trọng nhất.',
    openQuestion: 'Có điều gì bạn đang để ý trong đội hoặc trong công việc mà muốn chia sẻ không?',
  },

  'S7:INFP': {
    signal: 'INFP tiếp nhận tốt nhất khi check-in không có pressure phải report — họ cần cảm thấy được hỏi thăm thật, không phải bị track.',
    approach: [
      'Morning: "Bạn đang tập trung vào phần nào hôm nay?" — mở để họ tự chọn, không phải check nếu đúng task',
      'Khen cụ thể: "Phần mình viết cho proposal hôm qua có giọng văn thật và đúng tone — người đọc sẽ feel được" — khen về authenticity và quality, không phải speed',
      'Nhịp coaching: informal, không scheduled nếu được — hỏi thăm khi tự nhiên trong ngày hơn là meeting cứng',
    ],
    avoid: 'Đừng dùng KPI và số liệu thuần túy khi check-in với INFP — sẽ cảm thấy bị đánh giá như machine, không phải người.',
    openQuestion: 'Tuần này có phần nào bạn thấy đang làm đúng với cách mình muốn làm không?',
  },

  'S7:ENFJ': {
    signal: 'ENFJ tiếp nhận tốt nhất khi check-in có cả phần "team đang thế nào" — họ sẽ tự nhiên share insight về đội khi được hỏi và đó là thông tin quý.',
    approach: [
      'Morning: "Bạn thấy hôm nay đội mình đang ở đâu về năng lượng?" — ENFJ sẽ cho bạn real-time team pulse',
      'Khen cụ thể: "Cách bạn bridge gap giữa hai người trong meeting hôm qua — không ai để ý nhưng mình thấy và nó giúp cả buổi" — khen về invisible contribution',
      'Nhịp coaching: hỏi thăm họ — không chỉ hỏi về team — ENFJ hay quên check in với bản thân khi đang lo cho người khác',
    ],
    avoid: 'Đừng chỉ dùng ENFJ như "pulse checker" cho team mà không hỏi họ đang thế nào — sẽ burnout mà bạn không biết.',
    openQuestion: 'Bạn đang thế nào — không phải đội, mà là bạn personally?',
  },

  'S7:ENFP': {
    signal: 'ENFP tiếp nhận tốt nhất khi check-in là conversation tự nhiên, energetic — họ không respond tốt với check-in formal và cần cảm thấy bạn genuinely interested.',
    approach: [
      'Morning: tin nhắn casual — "Hôm nay bạn excited về cái gì?" — ENFP cần bắt đầu ngày từ energy, không phải task',
      'Khen cụ thể: "Ý tưởng bạn throw ra trong standup sáng nay — mình thấy đó là direction đáng explore, cảm ơn vì đã nói ra" — khen về idea generation và courage to share',
      'Nhịp coaching: frequent nhưng ngắn — 5 phút tự nhiên tốt hơn 30 phút scheduled mỗi 2 tuần',
    ],
    avoid: 'Đừng bỏ qua check-in khi đang bận — ENFP cần biết bạn vẫn có mặt dù ngắn.',
    openQuestion: 'Tuần này bạn đang thấy excited về phần nào nhất?',
  },

  'S7:ISTJ': {
    signal: 'ISTJ tiếp nhận tốt nhất khi check-in có cấu trúc rõ và consistent — họ không thích surprise check-in và sẽ respond tốt nhất với nhịp ổn định.',
    approach: [
      'Morning: check-in ngắn structured — "Hôm nay plan của bạn là gì và có gì cần tháo gỡ không?" — 2 câu, không thêm',
      'Khen cụ thể: "Báo cáo bạn gửi đúng format, đúng hạn, đúng level of detail mình cần — đó là standard mình muốn cả đội giữ" — khen về reliability',
      'Nhịp coaching: weekly scheduled meeting ngắn với agenda rõ — ISTJ chuẩn bị tốt hơn khi biết trước',
    ],
    avoid: 'Đừng drop-in bất ngờ để check-in với ISTJ — họ cần thời gian chuẩn bị và sẽ uncomfortable khi bị bắt không chuẩn bị.',
    openQuestion: 'Có gì trong tuần này đang không theo kế hoạch và cần điều chỉnh không?',
  },

  'S7:ISFJ': {
    signal: 'ISFJ tiếp nhận tốt nhất khi check-in có warmth thật — họ cần cảm thấy bạn hỏi vì care, không phải vì track performance.',
    approach: [
      'Morning: "Bạn đang thế nào hôm nay?" trước "Hôm nay plan gì?" — ISFJ cần thấy bạn quan tâm đến người trước khi quan tâm đến task',
      'Khen cụ thể: "Bạn catch được lỗi nhỏ trong report trước khi gửi khách hàng — đó là attention to detail cứu được cả deal" — khen về invisible careful work',
      'Nhịp coaching: 1:1 riêng tư, không cần dài — ISFJ không comfortable chia sẻ concern trong nhóm',
    ],
    avoid: 'Đừng chỉ check-in về task và performance — ISFJ cần biết bạn thấy họ là người, không phải resource.',
    openQuestion: 'Có gì bạn cần mình hỗ trợ thêm để làm tốt hơn gần đây không?',
  },

  'S7:ESTJ': {
    signal: 'ESTJ tiếp nhận tốt nhất khi check-in gắn với kết quả và có cấu trúc — họ respond tốt với nhịp consistent và không thích conversation không có mục đích.',
    approach: [
      'Morning: "Hôm nay bạn đang close cái gì?" — gắn với deliverable cụ thể, không phải activity',
      'Khen cụ thể: "Team execute đúng quy trình trong deal đó — và kết quả đúng như kế hoạch. Bạn giữ được standard tốt" — khen về execution và standard',
      'Nhịp coaching: weekly review ngắn về progress vs plan — ESTJ muốn thấy mình đang trên track',
    ],
    avoid: 'Đừng để check-in trở thành vague conversation — ESTJ mất kiên nhẫn với meeting không có output rõ.',
    openQuestion: 'So với kế hoạch đầu tuần, bạn đang ở đâu và cần điều chỉnh gì không?',
  },

  'S7:ESFJ': {
    signal: 'ESFJ tiếp nhận tốt nhất khi check-in có phần hỏi về đội và về họ — họ sẽ share nhiều insight quý khi cảm thấy được hỏi thật.',
    approach: [
      'Morning: "Bạn và đội đang ổn không?" — ESFJ sẽ give bạn real team status trong 30 giây',
      'Khen cụ thể: "Cách bạn giữ không khí trong meeting hôm qua — mọi người nói được nhiều hơn. Cảm ơn vì đã làm thế" — khen về invisible facilitation',
      'Nhịp coaching: informal và warm — ESFJ cần biết relationship với bạn vẫn tốt trong mọi conversation',
    ],
    avoid: 'Đừng skip check-in khi đang busy mà không báo — ESFJ sẽ đọc sự im lặng đó là bạn không ổn với họ.',
    openQuestion: 'Tuần này bạn thấy đội mình cần gì nhất?',
  },

  'S7:ISTP': {
    signal: 'ISTP tiếp nhận tốt nhất khi check-in ngắn, không required small talk — họ sẽ respond khi được hỏi câu cụ thể và không comfortable với open-ended "bạn đang thế nào?"',
    approach: [
      'Morning: tin nhắn ngắn — "Hôm nay bạn đang giải quyết vấn đề gì?" — ISTP thích bắt đầu từ problem, không phải từ cảm xúc',
      'Khen cụ thể: "Bạn fix được bug đó trong 2 giờ — bình thường phải mất cả ngày. Cảm ơn vì đã tập trung vào đó" — khen về technical execution cụ thể',
      'Nhịp coaching: ít và ngắn — ISTP không cần nhiều check-in nếu work đang chạy tốt; chỉ cần biết có thể hỏi khi cần',
    ],
    avoid: 'Đừng required daily verbal check-in từ ISTP — sẽ cảm thấy overhead và bắt đầu tránh.',
    openQuestion: 'Có vấn đề kỹ thuật nào đang chặn bạn mà cần mình tháo gỡ không?',
  },

  'S7:ISFP': {
    signal: 'ISFP tiếp nhận tốt nhất khi check-in có warmth và không pressure — họ cần cảm thấy được hỏi thăm thật, không phải bị evaluated.',
    approach: [
      'Morning: "Bạn đang tập trung vào phần nào hôm nay?" — nhẹ nhàng, không required justification',
      'Khen cụ thể: "Cái detail nhỏ bạn thêm vào presentation hôm qua — khách hàng để ý và mention. Bạn thấy thứ mà người khác bỏ qua" — khen về sensibility và attention to quality',
      'Nhịp coaching: informal và không scheduled nếu được — ISFP mở ra trong context tự nhiên hơn là trong meeting cứng',
    ],
    avoid: 'Đừng check-in về numbers và metrics thuần túy — ISFP cần biết công việc của mình có ý nghĩa, không chỉ đạt target.',
    openQuestion: 'Có phần nào của công việc gần đây bạn thấy mình đang làm tốt nhất?',
  },

  'S7:ESTP': {
    signal: 'ESTP tiếp nhận tốt nhất khi check-in nhanh, direct, và gắn với action — họ không comfortable với long reflection conversation và cần biết mình đang win.',
    approach: [
      'Morning: "Hôm nay bạn đang close cái gì? Có cần giúp gì không?" — 2 câu, done',
      'Khen cụ thể: "Deal đó bạn close nhanh hơn ai trong đội — và khách hàng happy. Good execution" — khen về speed và result',
      'Nhịp coaching: real-time feedback ngay sau situation tốt hơn scheduled review — ESTP learn trong action, không phải trong meeting room',
    ],
    avoid: 'Đừng kéo dài coaching conversation về reflection và future planning — ESTP cần feedback về action hiện tại, không phải phân tích quá khứ dài.',
    openQuestion: 'Hôm nay bạn đang đánh vào đâu — và mình có thể clear gì để bạn chạy nhanh hơn không?',
  },

  'S7:ESFP': {
    signal: 'ESFP tiếp nhận tốt nhất khi check-in có energy và không formal — họ shut down với conversation cứng nhắc và bật lên với conversation có warmth.',
    approach: [
      'Morning: "Bạn hôm nay thế nào?" genuine — ESFP sẽ give bạn honest answer và bạn sẽ biết ngay họ đang ở đâu',
      'Khen cụ thể: "Cách bạn welcome khách hàng mới hôm qua — họ relax ngay lập tức. Đó là skill không ai dạy được" — khen về natural people skills',
      'Nhịp coaching: informal, frequent, ngắn — ESFP cần biết bạn có mặt thường xuyên dù chỉ 2 phút',
    ],
    avoid: 'Đừng bỏ qua ESFP khi busy và chỉ engage khi có problem — họ cần positive interaction thường xuyên để stay energized.',
    openQuestion: 'Tuần này có điều gì làm bạn excited không?',
  },

// ============================================================
// S5 — NHÂN VIÊN MUỐN NGHỈ
// VN: relationship trước → retention ask sau
// "Ở lại vì sếp" là real leverage — acknowledge trực tiếp
// ============================================================

  'S5:INTJ': {
    signal: 'INTJ thường báo hiệu sắp ra đi bằng cách bắt đầu tối ưu hóa và document công việc rõ hơn bình thường, ít invest vào long-term initiative, và câu trả lời trong meeting ngắn đi.',
    approach: [
      'Gặp riêng sớm — không mention "muốn nghỉ" ngay — hỏi về công việc và tầm nhìn: "Anh/chị muốn nghe bạn đang muốn phát triển theo hướng nào"',
      'Nếu đã có tín hiệu rõ: "Mình lo bạn đang không tìm được challenge mình cần ở đây — mình muốn hiểu đúng hơn" — honest, không đi vòng',
      'Follow-up với action cụ thể trong 1-2 tuần — INTJ không tin vào lời hứa vague, chỉ tin vào hành động',
    ],
    avoid: 'Đừng offer lương hoặc title ngay — INTJ thường nghỉ vì thiếu autonomy hoặc challenge, không phải vì tiền.',
    openQuestion: 'Anh/chị muốn hỏi thẳng — công việc hiện tại có đang cho bạn đủ không gian để làm được thứ bạn muốn làm không?',
  },

  'S5:INTP': {
    signal: 'INTP thường báo hiệu sắp ra đi bằng cách ngừng bring up ý tưởng mới, bắt đầu explore intellectual territory ngoài công việc, và conversation trở nên shorter và more transactional.',
    approach: [
      'Hỏi về intellectual interest của họ hiện tại: "Gần đây bạn đang nghĩ về vấn đề gì thú vị?" — nghe xem có connection với công việc không',
      'Nếu tín hiệu rõ: "Mình cảm thấy bạn đang underutilized — mình muốn tìm cách thay đổi điều đó nếu được" — thẳng, không emotional',
      'Đề xuất project hoặc problem cụ thể có độ phức tạp cao — và để họ tự chọn direction tiếp cận',
    ],
    avoid: 'Đừng dùng team dynamics hoặc relationship như lý do để ở lại — INTP quyết định ở lại vì intellectual value, không phải social bond.',
    openQuestion: 'Mình muốn hỏi thẳng — bạn có đang tìm kiếm thứ gì mà công việc hiện tại không cho bạn không?',
  },

  'S5:ENTJ': {
    signal: 'ENTJ thường báo hiệu sắp ra đi bằng cách bắt đầu nhìn ra ngoài tổ chức nhiều hơn, ít invest vào build team, và câu hỏi strategic trở nên hướng về tương lai xa.',
    approach: [
      'Acknowledge scope và authority thật sự của họ: "Mình nhận ra vị trí hiện tại có thể chưa đủ rộng cho bạn — mình muốn nói về điều đó"',
      'Hỏi thẳng về ambition: "Bạn muốn đến đâu trong 2 năm tới — và mình có thể là một phần của con đường đó không?"',
      'Nếu không giữ được về growth: honest về limitation và help họ transition tốt — ENTJ nhớ người treat họ tốt',
    ],
    avoid: 'Đừng dùng loyalty hoặc guilt — ENTJ sẽ coi đó là manipulation và lose respect ngay.',
    openQuestion: 'Anh/chị muốn nghe thẳng — bạn đang muốn nhiều hơn những gì vị trí này đang cho, đúng không?',
  },

  'S5:ENTP': {
    signal: 'ENTP thường báo hiệu sắp ra đi bằng cách bắt đầu debate nhiều hơn về why things are done this way, ít excited với projects mới, và bắt đầu test limits nhiều hơn.',
    approach: [
      'Hỏi về frustration thật: "Bạn đang debate nhiều thứ gần đây — mình muốn nghe bạn thấy gì chưa đúng" — không defensive, genuinely curious',
      'Nếu tín hiệu rõ: "Mình lo bạn đang không còn challenged ở đây — bạn thấy thứ gì sẽ thay đổi được điều đó không?"',
      'Kết nối họ với real problem chưa ai solve — ENTP ở lại vì puzzle, không phải vì comfort',
    ],
    avoid: 'Đừng dùng stability hoặc team culture như argument — ENTP không motivated bởi những thứ này khi đã muốn ra đi.',
    openQuestion: 'Nếu công việc này cho bạn tự do hoàn toàn để thay đổi một thứ, bạn sẽ thay gì?',
  },

  'S5:INFJ': {
    signal: 'INFJ thường báo hiệu sắp ra đi rất kín — không than phiền, nhưng bắt đầu increasingly withdraw, ít chia sẻ insight, và contribution giảm dần.',
    approach: [
      'Tạo không gian riêng và safe: "Mình muốn gặp bạn — không phải về performance, mà mình muốn biết bạn đang thế nào thật sự"',
      'Nếu tín hiệu rõ, hỏi về meaning: "Bạn đang tìm kiếm gì trong công việc mà gần đây không thấy?"',
      'Acknowledge nếu có cultural/value misalignment: đừng promise thứ không thể thay đổi — INFJ sẽ nhớ',
    ],
    avoid: 'Đừng hỏi vì lo mất người giỏi — INFJ cảm nhận được motivation đằng sau câu hỏi và sẽ đóng lại nếu thấy bạn chỉ lo cho tổ chức.',
    openQuestion: 'Mình muốn nghe thật — bạn đang tìm kiếm gì trong công việc mà mình có thể chưa hiểu đủ?',
  },

  'S5:INFP': {
    signal: 'INFP thường báo hiệu sắp ra đi bằng cách bắt đầu invest cảm xúc và creativity ra ngoài công việc, chất lượng work vẫn ổn nhưng không còn dấu ấn cá nhân.',
    approach: [
      'Hỏi về meaning, không hỏi về commitment: "Gần đây bạn có phần nào của công việc vẫn thấy đáng làm không?"',
      'Nếu tín hiệu rõ: "Mình lo công việc này không còn phù hợp với bạn nữa — mình muốn hiểu thật sự trước khi bất cứ thứ gì xảy ra"',
      'Tìm project có meaning thật sự để kết nối lại — không phải tất cả đều có thể giữ, nhưng thử trước',
    ],
    avoid: 'Đừng dùng team hoặc khách hàng sẽ miss bạn — INFP cần lý do cho bản thân họ, không phải lý do bên ngoài.',
    openQuestion: 'Anh/chị muốn hỏi thẳng — công việc này có đang cho bạn làm thứ bạn thấy có ý nghĩa không?',
  },

  'S5:ENFJ': {
    signal: 'ENFJ thường báo hiệu sắp ra đi bằng cách bắt đầu giảm emotional investment vào đội, ít initiative giúp đỡ người khác, và vẫn professional nhưng không còn fully present.',
    approach: [
      'Hỏi thăm họ — không phải về performance: "Mình muốn hỏi bạn một câu thật — bạn đang ổn không?"',
      'Nếu tín hiệu rõ: "Mình thấy bạn đang kéo lại gần đây — mình lo rằng mình hoặc tổ chức đang để bạn không được hỗ trợ đủ"',
      'Acknowledge contribution của họ đến đội explicitly: ENFJ cần nghe rõ impact của mình trước khi quyết định ở lại',
    ],
    avoid: 'Đừng approach như giải quyết vấn đề — ENFJ muốn nghe bạn care trước, problem-solving sau.',
    openQuestion: 'Mình muốn hỏi thẳng — có điều gì mình đang không làm đủ cho bạn mà bạn cần không?',
  },

  'S5:ENFP': {
    signal: 'ENFP thường báo hiệu sắp ra đi khi energy tự nhiên của họ biến mất — ít excited, ít pitch ý tưởng, và bắt đầu nói về "sau này" nhiều hơn về hiện tại.',
    approach: [
      'Reconnect với excitement: "Khi nào lần cuối bạn thấy thực sự excited với việc gì trong công ty này?"',
      'Nếu tín hiệu rõ: "Mình nhận ra công việc có thể không còn cho bạn thứ bạn cần — mình muốn thay đổi điều đó nếu được"',
      'Kết nối với người và meaning: ENFP ở lại vì connection với người và mission, không phải vì comp',
    ],
    avoid: 'Đừng chỉ offer flexibility hoặc perk — ENFP cần cảm thấy họ đang matter và đang grow, không phải comfortable.',
    openQuestion: 'Nếu bạn ở lại đây thêm 2 năm, bạn muốn nhìn lại và thấy mình đã làm được gì?',
  },

  'S5:ISTJ': {
    signal: 'ISTJ thường báo hiệu sắp ra đi rất kín — công việc vẫn tốt, nhưng bắt đầu hỏi ít câu hỏi về tương lai và không invest vào long-term planning.',
    approach: [
      'Hỏi về satisfaction với sự ổn định: "Bạn thấy công việc đang cho bạn sự rõ ràng và nhất quán mà bạn cần không?"',
      'Nếu tín hiệu rõ: "Mình muốn hỏi thẳng — có điều gì về cách tổ chức hoạt động đang làm bạn không thoải mái không?"',
      'ISTJ ở lại khi tổ chức đáng tin cậy — không phải vì sếp charismatic, mà vì hệ thống và cam kết được giữ',
    ],
    avoid: 'Đừng promise thay đổi lớn nếu không thể deliver — mất trust của ISTJ một lần là mất vĩnh viễn.',
    openQuestion: 'Bạn thấy công ty đang giữ được những gì mình cam kết với bạn không?',
  },

  'S5:ISFJ': {
    signal: 'ISFJ thường không tự nói về việc muốn nghỉ — nhưng bắt đầu ít volunteer giúp đỡ hơn, ít chú ý đến detail hơn, và trả lời email chậm hơn.',
    approach: [
      'Tạo không gian safe để họ nói: "Mình muốn hỏi thật — bạn có đang cảm thấy được tôn trọng và hỗ trợ đủ ở đây không?"',
      'Acknowledge contribution cụ thể của họ — ISFJ cần biết công việc thầm lặng của mình được nhìn thấy',
      'Hỏi về điều gì khiến họ ở lại đến giờ: câu trả lời đó sẽ cho bạn biết leverage thật sự',
    ],
    avoid: 'Đừng assume họ ở lại vì không dám ra đi — ISFJ có giá trị cao và được thị trường cần. Đừng coi sự im lặng là chấp nhận.',
    openQuestion: 'Điều gì giữ bạn ở đây đến giờ — và điều đó có còn đủ không?',
  },

  'S5:ESTJ': {
    signal: 'ESTJ thường báo hiệu sắp ra đi khi bắt đầu process-orient hơn, ít ownership về outcome, và câu hỏi về chiến lược dài hạn biến mất.',
    approach: [
      'Hỏi về authority và impact: "Bạn có cảm thấy mình có đủ quyền để tạo ra kết quả mình muốn không?"',
      'Nếu tín hiệu rõ: "Mình nhận ra position hiện tại có thể đang limit bạn — mình muốn nói về điều đó"',
      'ESTJ ở lại khi thấy đường phát triển rõ ràng với authority và impact tương ứng',
    ],
    avoid: 'Đừng dùng loyalty hoặc đồng đội như argument — ESTJ nghỉ vì tính toán career, không phải vì quan hệ.',
    openQuestion: 'Bạn thấy vị trí này có đang cho bạn authority và scope để làm được thứ bạn có khả năng không?',
  },

  'S5:ESFJ': {
    signal: 'ESFJ thường báo hiệu sắp ra đi bằng cách bắt đầu ít giữ harmony trong đội, ít plan social event, và tone trở nên professional hơn là warm.',
    approach: [
      'Hỏi về relationship: "Mình muốn hỏi bạn — bạn còn cảm thấy gắn kết với đội và với mình không?"',
      'ESFJ ở lại vì người — acknowledge relationship thật: "Mình biết bạn care về đội này. Mình cũng care về bạn."',
      'Hỏi về điều gì có thể làm tốt hơn — ESFJ đã có sẵn list, chỉ cần được hỏi trong không gian an toàn',
    ],
    avoid: 'Đừng purely rational về salary và benefit — ESFJ sẽ ra đi vì cảm thấy không còn belong, không phải vì thiếu tiền.',
    openQuestion: 'Bạn có cảm thấy được trân trọng và thoải mái ở đây không — không phải formal, mà thật sự?',
  },

  'S5:ISTP': {
    signal: 'ISTP thường báo hiệu sắp ra đi bằng cách work quality vẫn tốt nhưng bắt đầu chọn task theo thứ tự ưu tiên của họ, không phải của bạn, và ít update hơn.',
    approach: [
      'Hỏi về technical challenge: "Bạn có đang tìm vấn đề kỹ thuật nào thú vị hơn những gì hiện tại không?"',
      'Nếu tín hiệu rõ: "Mình lo bạn đang underutilized — mình muốn biết thật sự bạn cần gì để ở lại và làm tốt"',
      'ISTP ở lại vì problem thú vị và autonomy — không phải vì benefits hay team events',
    ],
    avoid: 'Đừng dùng team bonding hoặc culture như argument — ISTP quyết định dựa trên work quality và freedom, không phải social environment.',
    openQuestion: 'Bạn đang tìm kiếm loại challenge nào mà công việc hiện tại không cho bạn?',
  },

  'S5:ISFP': {
    signal: 'ISFP thường báo hiệu sắp ra đi rất kín — không drama, nhưng creativity biến mất khỏi work, và bắt đầu pour energy vào side project hoặc hobby ngoài.',
    approach: [
      'Hỏi về meaning một cách genuine: "Gần đây bạn có thấy công việc của mình đang có ý nghĩa với ai không?"',
      'Nếu tín hiệu rõ: "Mình lo công việc này không còn cho bạn không gian để làm theo cách bạn muốn — mình muốn thay đổi điều đó nếu được"',
      'ISFP ở lại khi có freedom về cách làm và khi thấy impact thật với người thật',
    ],
    avoid: 'Đừng pressure họ về commitment hoặc loyalty — sẽ accelerate quyết định ra đi.',
    openQuestion: 'Bạn có thấy mình đang được thể hiện đúng bản thân trong công việc này không?',
  },

  'S5:ESTP': {
    signal: 'ESTP thường báo hiệu sắp ra đi bằng cách bắt đầu look outward rõ hơn — mention competitors, market rate, và opportunity bên ngoài nhiều hơn.',
    approach: [
      'Hỏi thẳng về ambition: "Bạn đang nhắm đến gì trong 1-2 năm tới — và mình có thể là một phần không?"',
      'ESTP ở lại khi thấy upside rõ ràng — commission, promotion, project lớn hơn',
      'Nếu không giữ được về growth: better to be honest và help them transition well — ESTP nhớ người treat them fair',
    ],
    avoid: 'Đừng chỉ offer base salary — ESTP motivated bởi upside potential, recognition, và winning opportunity.',
    openQuestion: 'Bạn thấy đây có phải là chỗ tốt nhất để bạn đạt được mục tiêu gần nhất của mình không?',
  },

  'S5:ESFP': {
    signal: 'ESFP thường báo hiệu sắp ra đi khi fun và energy tự nhiên của họ giảm đi rõ rệt — ít tương tác với đồng nghiệp và bắt đầu nói về opportunity khác công khai hơn.',
    approach: [
      'Hỏi về connection và fun: "Bạn có còn thấy vui khi đến làm ở đây không — thật sự?"',
      'ESFP ở lại khi môi trường energetic, có people connection, và được ghi nhận thường xuyên',
      'Offer visibility và recognition opportunity mới — ESFP cần thấy mình đang shine, không phải chỉ đang work',
    ],
    avoid: 'Đừng dùng rational argument về career path — ESFP quyết định bằng feel, không phải logic.',
    openQuestion: 'Khi nào lần cuối bạn thấy thực sự vui khi đến làm?',
  },

// ============================================================
// S6 — SẾP MỚI THIẾT LẬP AUTHORITY
// VN: Power Distance 70 — build credibility TRƯỚC coaching
// Competence + care cả hai phải visible sớm
// ============================================================

  'S6:INTJ': {
    signal: 'INTJ nhân viên hay test new manager bằng cách đặt câu hỏi kỹ thuật hoặc strategy sâu trong những tuần đầu — không phải hostile, mà đang đánh giá competence thật.',
    approach: [
      'Gặp 1:1 riêng trong tuần đầu: "Tôi muốn hiểu bạn đang làm gì tốt và bạn cần gì từ tôi" — show interest in their work, không phải chỉ introduce yourself',
      'Demonstrate strategic thinking sớm: INTJ nhân viên respect sếp thấy bức tranh lớn, không chỉ manage task',
      'Sau 2-3 tuần khi credibility established: "Bạn thấy có gì trong cách đội đang hoạt động có thể cải thiện không?" — invite their analysis',
    ],
    avoid: 'Đừng làm coaching question kiểu "bạn nghĩ sao?" quá sớm khi chưa establish competence — INTJ sẽ đọc đó là sếp không biết.',
    openQuestion: 'Tôi muốn nghe từ bạn — bạn đang làm tốt nhất ở đâu và cần gì để làm tốt hơn?',
  },

  'S6:INTP': {
    signal: 'INTP nhân viên hay test new manager bằng cách throw ra vấn đề phức tạp và xem sếp xử lý thế nào — họ đang check intellectual credibility.',
    approach: [
      'Engage với câu hỏi khó thật sự: nếu không biết thì nói "tôi chưa có đủ context để trả lời chắc — hãy cùng tìm hiểu"',
      'Cho phép autonomy về approach từ sớm: INTP cần thấy sếp không micromanage method',
      'Gặp 1:1 về intellectual interest của họ: "Bạn đang tìm kiếm thứ gì trong công việc về mặt học hỏi và phát triển?"',
    ],
    avoid: 'Đừng pretend biết những gì bạn không biết — INTP sẽ detect ngay và mất respect.',
    openQuestion: 'Tôi muốn nghe góc nhìn của bạn về vấn đề lớn nhất đội đang đối mặt — trước khi tôi chia sẻ quan sát của mình.',
  },

  'S6:ENTJ': {
    signal: 'ENTJ nhân viên hay test new manager bằng cách challenge quyết định strategy và xem sếp có hold firm hoặc fold không — họ respect người có backbone.',
    approach: [
      'Demonstrate command của situation sớm: ENTJ nhân viên cần thấy bạn biết mình đang làm gì',
      'Khi họ challenge: engage substantively, không defensive — "đó là góc nhìn tốt, tôi muốn nghe thêm trước khi quyết định"',
      'Gặp 1:1 về ambition của họ sớm: ENTJ nhân viên cần biết sếp mới sẽ không block path của họ',
    ],
    avoid: 'Đừng hedge và không quyết đoán trong những tuần đầu — ENTJ sẽ fill the leadership vacuum và bạn sẽ mất authority.',
    openQuestion: 'Tôi muốn biết bạn muốn đến đâu — và tôi có thể hỗ trợ gì trên con đường đó.',
  },

  'S6:ENTP': {
    signal: 'ENTP nhân viên hay test new manager bằng cách debate mọi quyết định trong những tuần đầu — không phải chống đối, mà đang check xem sếp có thể match intellectual energy không.',
    approach: [
      'Engage với debate một cách genuine: "Đó là counter-argument thú vị — đây là lý do tôi vẫn giữ quyết định..." — show reasoning, không phải authority',
      'Tạo channel cho input của họ: ENTP cần biết ý kiến của mình được nghe và có thể impact decision',
      'Sau khi credibility established: invite them vào problem-solving thật sự — "Tôi muốn nghe bạn bóc vấn đề này"',
    ],
    avoid: 'Đừng shut down debate bằng authority — ENTP sẽ lose respect ngay và tiếp tục debate ngầm thay vì công khai.',
    openQuestion: 'Tôi muốn nghe góc nhìn của bạn trước — sau đó tôi sẽ chia sẻ quan điểm của mình và chúng ta cùng quyết định.',
  },

  'S6:INFJ': {
    signal: 'INFJ nhân viên hay test new manager bằng cách observe im lặng trong nhiều tuần — họ đang đọc consistency giữa lời nói và hành động trước khi open up.',
    approach: [
      'Consistent trong lời nói và hành động từ ngày đầu: INFJ sẽ nhớ mọi inconsistency nhỏ',
      'Gặp 1:1 riêng sớm và hỏi về vision của họ: "Bạn thấy đội này có thể đi đến đâu nếu mọi thứ đi đúng hướng?"',
      'Sau 4-6 tuần: "Bạn có insight gì về đội mà tôi có thể chưa thấy được?" — họ có, và đây là thông tin quý',
    ],
    avoid: 'Đừng push INFJ mở ra quá sớm — họ cần time để observe và trust trước khi share insight thật sự.',
    openQuestion: 'Tôi muốn học từ người trong team — bạn thấy điều gì đang làm tốt và điều gì có thể tốt hơn?',
  },

  'S6:INFP': {
    signal: 'INFP nhân viên hay test new manager bằng cách xem liệu sếp có care về mission và về con người thật không — không phải qua lời nói mà qua hành động nhỏ.',
    approach: [
      'Demonstrate genuine interest in them as person, không phải chỉ as performer: INFP cần thấy bạn care trước',
      'Chia sẻ về mission và meaning của công việc sớm: "Tôi muốn bạn biết tại sao việc mình làm quan trọng..."',
      'Gặp 1:1 về giá trị và điều gì có ý nghĩa với họ: INFP cần thấy sếp cũng có values thật',
    ],
    avoid: 'Đừng purely business trong những tuần đầu — INFP đang đánh giá bạn là người thế nào, không phải bạn quản lý thế nào.',
    openQuestion: 'Điều gì trong công việc này bạn thấy quan trọng nhất — với bạn cá nhân?',
  },

  'S6:ENFJ': {
    signal: 'ENFJ nhân viên thường welcome new manager warmly và ngay lập tức try to help — nhưng bên trong đang carefully assess xem sếp có care về đội thật không.',
    approach: [
      'Accept help của họ và acknowledge contribution sớm — ENFJ sẽ become your strongest ally nếu feel appreciated',
      'Hỏi họ về đội: "Bạn biết đội này hơn tôi — bạn thấy tôi nên biết gì để hỗ trợ mọi người tốt nhất?" — họ sẽ give valuable insight',
      'Demonstrate care về wellbeing của team thật sự: ENFJ sẽ watch closely',
    ],
    avoid: 'Đừng purely task-focused trong những tuần đầu — ENFJ cần thấy sếp care về người trước khi fully commit.',
    openQuestion: 'Tôi muốn làm tốt cho đội này — bạn thấy điều gì tôi cần hiểu đầu tiên?',
  },

  'S6:ENFP': {
    signal: 'ENFP nhân viên thường enthusiastic với new manager ngay — nhưng sẽ quickly disengage nếu sếp quá rigid hoặc không cho họ không gian để contribute ý tưởng.',
    approach: [
      'Tạo không gian cho idea của họ sớm: invite them vào brainstorm hoặc ask for input về direction',
      'Show genuine enthusiasm về mission — ENFP cần thấy sếp excited, không chỉ competent',
      'Gặp 1:1 về creativity và initiative: "Bạn muốn explore gì mà chưa có cơ hội?"',
    ],
    avoid: 'Đừng shut down enthusiasm quá sớm với process và constraint — ENFP cần feel expansive, không phải constrained.',
    openQuestion: 'Nếu bạn có thể làm một việc mới hoặc khác trong vai trò này, bạn sẽ thử gì?',
  },

  'S6:ISTJ': {
    signal: 'ISTJ nhân viên hay test new manager bằng cách xem liệu bạn có respect process và commitment đã có không — họ không chào đón change vô lý.',
    approach: [
      'Học trước về quy trình và commitment đang tồn tại trước khi propose change bất kỳ thứ gì',
      'Gặp 1:1 để nghe họ explain cách mọi thứ đang hoạt động: "Tôi muốn hiểu cách đội đang làm tốt trước khi tôi thêm bất cứ gì"',
      'Change từ từ, luôn explain why: ISTJ sẽ execute tốt khi hiểu lý do, sẽ resist khi không hiểu',
    ],
    avoid: 'Đừng thay đổi nhiều thứ cùng lúc trong những tháng đầu — ISTJ cần thấy bạn respect history và earned context.',
    openQuestion: 'Tôi muốn học từ bạn — những gì đang hoạt động tốt mà tôi nên biết để không vô tình phá đi?',
  },

  'S6:ISFJ': {
    signal: 'ISFJ nhân viên hay observe và wait trong những tuần đầu — họ cần thấy bạn là người an toàn và nhất quán trước khi share concern hoặc cần gì.',
    approach: [
      'Check in với họ riêng sớm và cho thấy bạn có mặt: "Tôi muốn biết bạn đang cần gì và làm thế nào tôi có thể hỗ trợ"',
      'Nhất quán trong lời hứa nhỏ: ISFJ trust qua consistent small actions, không phải big gestures',
      'Sau vài tuần: "Tôi muốn hỏi — bạn có concern gì về cách đội đang thay đổi không?" — họ sẽ nói nếu cảm thấy safe',
    ],
    avoid: 'Đừng promise thứ không thể giữ trong những tuần đầu — ISFJ sẽ nhớ và trust bạn sẽ giảm mạnh nếu không giữ được.',
    openQuestion: 'Có điều gì bạn muốn tôi biết về cách tôi có thể hỗ trợ bạn tốt nhất không?',
  },

  'S6:ESTJ': {
    signal: 'ESTJ nhân viên thường respect authority nhưng test new manager bằng cách xem liệu bạn có biết mình đang làm gì về process và kết quả không.',
    approach: [
      'Demonstrate command của metrics và goals sớm: ESTJ cần thấy bạn biết numbers và đang tracking right things',
      'Clarify authority và decision-making structure sớm: ai quyết định cái gì, escalate khi nào',
      'Gặp 1:1 và hỏi về cách làm tốt nhất của họ: "Bạn thấy đội cần gì để execute tốt hơn?"',
    ],
    avoid: 'Đừng vague về expectation và authority trong những tuần đầu — ESTJ cần clarity để operate well.',
    openQuestion: 'Tôi muốn nghe bạn — bạn thấy đội cần gì từ tôi để deliver tốt nhất?',
  },

  'S6:ESFJ': {
    signal: 'ESFJ nhân viên thường try to make new manager feel welcome và will be very helpful — nhưng bên trong đang carefully watch xem team culture có được respected không.',
    approach: [
      'Accept warmth của họ genuinely và reciprocate: ESFJ sẽ become your strongest supporter nếu feel appreciated',
      'Hỏi về team culture và dynamics: "Bạn thấy điều gì đang làm cho đội này work well?" — họ biết rõ hơn ai',
      'Include team trong decision khi có thể: ESFJ respect leader biết consult, không chỉ dictate',
    ],
    avoid: 'Đừng dismiss cultural và relational concern vì "không quan trọng bằng results" — ESFJ sẽ lose confidence vào bạn.',
    openQuestion: 'Tôi muốn giữ được những gì đang tốt trong đội này — bạn thấy điều gì quan trọng nhất cần giữ?',
  },

  'S6:ISTP': {
    signal: 'ISTP nhân viên sẽ observe và làm việc độc lập trong những tuần đầu — họ không cần nhiều từ sếp mới, chỉ cần biết autonomy của họ được respected.',
    approach: [
      'Clarify rõ scope và autonomy từ đầu: "Bạn tự quyết được những gì và cần check-in với tôi về những gì?"',
      'Đừng over-engage sớm — ISTP cần không gian, không cần warm welcome intensive',
      'Sau vài tuần khi họ thấy bạn để họ work: "Có gì bạn cần từ tôi để làm tốt hơn không?"',
    ],
    avoid: 'Đừng require nhiều meeting và update trong những tuần đầu — ISTP sẽ coi đó là overhead và bắt đầu resistant.',
    openQuestion: 'Tôi muốn biết bạn cần gì và không cần gì từ tôi để làm tốt nhất.',
  },

  'S6:ISFP': {
    signal: 'ISFP nhân viên sẽ observe quietly trong những tuần đầu và cần thấy sếp là người genuine và không judgmental trước khi họ mở ra.',
    approach: [
      'Tạo không gian 1:1 sớm và keep it low pressure: "Tôi muốn biết bạn đang làm gì tốt và bạn cần gì"',
      'Respect creative approach của họ: ISFP cần thấy sếp value cách làm của họ, không chỉ compliance',
      'Không rush toward performance conversation — relationship foundation cần thời gian với ISFP',
    ],
    avoid: 'Đừng purely results-focused trong những tuần đầu với ISFP — họ cần feel seen as person trước khi they open up.',
    openQuestion: 'Bạn thích làm việc thế nào nhất — và tôi có thể hỗ trợ điều đó như thế nào?',
  },

  'S6:ESTP': {
    signal: 'ESTP nhân viên thường test new manager bằng cách push boundaries nhỏ sớm — không phải hostile, mà đang check xem sếp có hold authority hay không.',
    approach: [
      'Hold your ground calmly khi cần: ESTP respect sếp biết khi nào firm',
      'Give them opportunities để win and be recognized sớm: ESTP cần thấy sếp mới không block their shine',
      'Keep communication direct và fast: ESTP mất kiên nhẫn với indirect hoặc slow manager',
    ],
    avoid: 'Đừng hedge hoặc không quyết đoán khi ESTP test boundaries — sẽ mất authority ngay.',
    openQuestion: 'Tôi muốn biết thẳng — bạn cần gì từ tôi để work được tốt nhất?',
  },

  'S6:ESFP': {
    signal: 'ESFP nhân viên thường welcome new manager với energy cao — nhưng sẽ quickly check xem sếp có fun để work với và có care về người không.',
    approach: [
      'Engage với energy của họ genuinely — ESFP biết ngay bạn có thật hay đang perform',
      'Include họ sớm trong team activities và celebration: ESFP cần feel part of something fun',
      'Show bạn care about them as individual: quick genuine check-in về how they are doing',
    ],
    avoid: 'Đừng quá serious và formal trong những tuần đầu — ESFP sẽ feel stifled và bắt đầu check out.',
    openQuestion: 'Tôi muốn biết bạn — công việc này đang thế nào với bạn, thật sự?',
  },

  'S8:ISFJ': {
    invest: 'ISFJ coi trọng sếp nhìn thấy và ghi nhận những việc nhỏ họ làm — không cần big praise, chỉ cần biết công việc thầm lặng của mình được noticed.',
    approach: [
      'Nhắc cụ thể một việc nhỏ họ làm tốt tuần này — "Bạn catch được lỗi nhỏ trong báo cáo trước khi gửi — cảm ơn vì đã chú ý đến điều đó" — ISFJ nhớ lâu những lần được nhìn thấy',
      'Hỏi thăm về cuộc sống của họ khi có cơ hội tự nhiên — không forced, không agenda, chỉ genuine',
      'Giữ kỳ vọng và cách làm việc nhất quán — ISFJ nạp relationship energy từ predictability và sự ổn định',
    ],
    avoid: 'Đừng chỉ kết nối với ISFJ khi bạn cần gì từ họ — pattern này sẽ làm họ cảm thấy là resource, không phải người.',
    openQuestion: 'Gần đây có điều gì trong công việc bạn thấy đang tốt không?',
  },

  'S8:ISFP': {
    invest: 'ISFP coi trọng sếp respect cách họ làm và thấy giá trị trong sự chú ý đến chi tiết của họ — không phải khen to, mà là ghi nhận thật.',
    approach: [
      'Nhận xét về một chi tiết nhỏ trong work của họ mà người khác hay bỏ qua — ISFP pour soul vào những chi tiết đó và cần thấy nó được thấy',
      'Cho họ tự chủ về cách tiếp cận — "Bạn thấy cách nào phù hợp nhất?" — ISFP invest nhiều hơn khi không bị constrain',
      'Hỏi thăm qua Zalo khi tự nhiên — ngắn, genuine, không phải check-in công việc',
    ],
    avoid: 'Đừng chỉ đánh giá kết quả bằng metrics — ISFP cần thấy sếp thấy được process và nỗ lực, không chỉ output cuối.',
    openQuestion: 'Bạn đang thích nhất phần nào của công việc gần đây?',
  },

  'S8:ESFJ': {
    invest: 'ESFJ coi trọng sếp genuine care về đội và về họ như người — họ sẽ đầu tư hết mình cho sếp nào thật sự thấy mọi người xung quanh.',
    approach: [
      'Hỏi về đội theo mắt họ — "Bạn thấy tinh thần đội mình thế nào gần đây?" — ESFJ sẽ give bạn insight thật và cảm thấy được valued vì bạn hỏi',
      'Acknowledge contribution của họ với đội explicitly — "Cách bạn giữ không khí trong team làm mọi người làm việc tốt hơn — cảm ơn"',
      'Involve họ trong quyết định liên quan đến team dynamics — ESFJ coi đây là dấu hiệu được tin tưởng thật',
    ],
    avoid: 'Đừng skip relationship khi đang bận và chỉ reconnect khi có vấn đề — ESFJ đọc được pattern này và sẽ giữ khoảng cách.',
    openQuestion: 'Bạn thấy đội mình cần gì nhất để gắn kết hơn gần đây?',
  },

  'S8:ESFP': {
    invest: 'ESFP coi trọng sếp có năng lượng genuine, notice họ, và tạo ra môi trường có thể enjoy — họ bring energy nhiều nhất cho người thật sự appreciate họ.',
    approach: [
      'Ghi nhận năng lượng và ảnh hưởng tích cực của họ với đội — "Bạn có mặt làm không khí buổi họp khác hẳn — đó là điều thật" — cụ thể và sincere',
      'Tạo moment fun nhỏ trong work — celebrate win cùng nhau dù nhỏ — ESFP charge từ shared positive experience',
      'Nhắn hỏi thăm ngắn qua Zalo khi appropriate — ESFP appreciate khi sếp không chỉ tồn tại trong meeting room',
    ],
    avoid: 'Đừng chỉ engage với ESFP khi đang có problem hoặc khi cần energy của họ cho event — sẽ cảm thấy bị dùng.',
    openQuestion: 'Tuần này có điều gì làm bạn thấy vui khi đến làm không?',
  },

// ─── NF GROUP ────────────────────────────────────────────────

  'S8:INFJ': {
    invest: 'INFJ coi trọng sếp thấy chiều sâu của họ — không phải khen năng lực, mà là nhận ra perspective và insight họ mang lại mà người khác không thấy.',
    approach: [
      'Hỏi ý kiến của họ về điều có meaning thật sự — "Bạn thấy direction này có đúng không?" — INFJ invest khi thấy ý kiến của họ được seek genuinely',
      'Acknowledge một lần khi insight của họ đúng mà không ai trong phòng chú ý — ngay lúc đó, không cần formal',
      'Hỏi thăm họ là người — "Bạn đang thế nào gần đây, thật sự?" — INFJ rare khi được hỏi điều này và sẽ nhớ',
    ],
    avoid: 'Đừng chỉ value INFJ vì năng suất — nếu họ cảm thấy bị reduce thành resource, relationship capital giảm nhanh và âm thầm.',
    openQuestion: 'Bạn đang để ý điều gì trong đội hoặc trong công việc mà bạn muốn tôi biết?',
  },

  'S8:INFP': {
    invest: 'INFP coi trọng sếp thấy họ là người có giá trị và vision riêng — không phải chỉ là người thực thi tốt, mà là người đang đóng góp theo cách của mình.',
    approach: [
      'Kết nối công việc của họ với impact thật đến người thật — "Phần bạn làm trong project này trực tiếp ảnh hưởng đến..." — INFP charge từ meaningful connection',
      'Hỏi về điều họ care ngoài công việc — không phải để small talk mà để thật sự biết họ là ai',
      'Respect khi họ nói không với thứ gì đó vì lý do values — đừng push, hãy hỏi để hiểu',
    ],
    avoid: 'Đừng chỉ tương tác khi có task hoặc khi cần performance — INFP cần cảm thấy bạn care về họ như người, không phải khi có việc cần họ.',
    openQuestion: 'Có phần nào của công việc gần đây bạn thấy thật sự đang đúng với mình không?',
  },

  'S8:ENFJ': {
    invest: 'ENFJ coi trọng sếp nhìn thấy impact của họ lên người xung quanh — những contribution invisible đến team dynamics mà không ai nói ra.',
    approach: [
      'Nói rõ một lần khi bạn thấy họ có ảnh hưởng tích cực đến người khác trong đội — "Tôi thấy cách bạn hỗ trợ [tên] tuần trước — điều đó quan trọng với cả team" — ENFJ cần biết invisible work được thấy',
      'Hỏi họ về wellbeing của đội và genuinely listen — không phải gather intel mà là acknowledge đây là territory họ care sâu',
      'Hỏi thăm họ cá nhân — ENFJ thường chăm sóc người khác và ít được ai hỏi ngược lại',
    ],
    avoid: 'Đừng chỉ dùng ENFJ như người giữ morale mà không care về morale của họ — burnout của ENFJ thường không có warning.',
    openQuestion: 'Bạn đang thế nào — không phải đội, mà là bạn?',
  },

  'S8:ENFP': {
    invest: 'ENFP coi trọng sếp thật sự excited về vision và không làm chậm năng lượng của họ — sếp tốt nhất với ENFP là người vừa grounding vừa amplifying.',
    approach: [
      'Acknowledge một ý tưởng của họ mà thật sự có giá trị — "Cái đó mình nghĩ theo đúng hướng — mình muốn explore thêm" — ENFP charge từ ý tưởng được xem xét thật',
      'Chia sẻ một thứ bạn đang excited về trong công việc — ENFP connect với sếp có passion, không chỉ có process',
      'Nhớ những thứ họ đã share về interest hoặc project cá nhân và hỏi lại — "Dự án mình mention tuần trước đang thế nào?" — ENFP cảm thấy được seen khi được remembered',
    ],
    avoid: 'Đừng chỉ reconnect với ENFP khi cần energy của họ cho presentation hay event — họ biết và sẽ start holding back.',
    openQuestion: 'Bạn đang excited về điều gì nhất gần đây — trong công việc hoặc ngoài đời?',
  },

// ─── ST GROUP ────────────────────────────────────────────────

  'S8:ISTJ': {
    invest: 'ISTJ coi trọng sếp reliable và consistent — relationship capital được build qua chuỗi nhỏ commitments được giữ, không phải qua gesture lớn.',
    approach: [
      'Giữ mọi commitment nhỏ — đúng hẹn, làm theo nói — ISTJ track record sếp cẩn thận hơn bạn nghĩ',
      'Ghi nhận công việc reliable của họ một cách specific — "Bạn deliver đúng spec và đúng hạn liên tục — đó là điều cả team dựa vào được"',
      'Giải thích lý do khi thay đổi decision hoặc priority — ISTJ không cần mọi thứ giữ nguyên, nhưng cần hiểu tại sao thay đổi',
    ],
    avoid: 'Đừng thay đổi priorities hoặc process mà không giải thích — với ISTJ đây không phải khó chịu nhỏ mà là dấu hiệu sếp không đáng tin.',
    openQuestion: 'Có điều gì trong cách chúng ta làm việc bạn thấy có thể ổn định và rõ hơn không?',
  },

  'S8:ESTJ': {
    invest: 'ESTJ coi trọng sếp competent, fair, và giữ tiêu chuẩn — họ invest nhiều nhất cho người họ respect về năng lực và integrity.',
    approach: [
      'Ghi nhận kết quả cụ thể của họ một cách business-relevant — "Deal bạn close tháng trước đóng góp X% của target đội — đó là kết quả thật"',
      'Consult ý kiến của họ về process hoặc decision trước khi finalize — ESTJ coi đây là dấu hiệu sếp competent muốn input từ người cũng competent',
      'Giữ fair và consistent với tiêu chuẩn — ESTJ notice ngay khi standard áp dụng không đều và lose respect ngay',
    ],
    avoid: 'Đừng không follow through hoặc thay đổi quyết định vì pressure cảm xúc — ESTJ build relationship với sếp có backbone.',
    openQuestion: 'Bạn thấy đội đang có cơ hội nào để improve kết quả mà chúng ta chưa tận dụng?',
  },

  'S8:ISTP': {
    invest: 'ISTP coi trọng sếp không waste thời gian của họ và trust họ giải quyết vấn đề theo cách của mình — respect autonomy là loại relationship currency cao nhất với ISTP.',
    approach: [
      'Chỉ interrupt khi thật sự cần — ISTP nhớ lâu sếp nào không làm phiền họ vô lý',
      'Khi hỏi ý kiến, hỏi về vấn đề kỹ thuật thật sự — "Bạn nghĩ cách nào để fix vấn đề này nhanh nhất?" — ISTP invest khi được consult về thứ trong domain của họ',
      'Ghi nhận khi họ solve được vấn đề khó — specific, ngắn, không over-effusive — "Fix đó tốt. Cảm ơn"',
    ],
    avoid: 'Đừng require check-in hoặc update thường xuyên khi không cần thiết — ISTP đọc đây là thiếu trust và sẽ start doing minimum.',
    openQuestion: 'Có vấn đề nào bạn đang nghĩ đến mà chưa có solution tốt không?',
  },

  'S8:ESTP': {
    invest: 'ESTP coi trọng sếp recognize khi họ deliver và give them room to operate — họ invest nhiều nhất cho người để họ win, không phải người hold them back.',
    approach: [
      'Public recognition khi họ win — ESTP thích được recognized trong front of team, không chỉ 1:1',
      'Give them stretch opportunity — project lớn hơn, account quan trọng hơn — ESTP charge từ upside potential',
      'Defend autonomy của họ với bên ngoài khi cần — ESTP biết ngay sếp nào cover cho họ và sẽ loyal với người đó',
    ],
    avoid: 'Đừng micromanage cách họ đạt kết quả khi kết quả đang tốt — ESTP sẽ cảm thấy bị block và bắt đầu route around bạn.',
    openQuestion: 'Opportunity nào bạn đang thấy mà bạn muốn chase gần đây?',
  },

// ─── NT GROUP ────────────────────────────────────────────────

  'S8:INTJ': {
    invest: 'INTJ coi trọng sếp respect trí tuệ và tự chủ của họ — relationship capital được build khi sếp bàn việc ngang hàng và tin tưởng judgment của họ.',
    approach: [
      'Chia sẻ context chiến lược thật sự, không chỉ task — INTJ coi đây là dấu hiệu bạn tin họ đủ để share big picture',
      'Hỏi ý kiến về bài toán khó khi phù hợp — không phải coaching question mà là genuine consultation: "Bạn thấy vấn đề này nên nhìn từ góc nào?"',
      'Acknowledge khi analysis hoặc dự đoán của họ đúng — INTJ không cần nhiều, nhưng cần thấy bạn nhận ra khi họ đúng',
    ],
    avoid: 'Đừng micromanage hoặc double-check không cần thiết — INTJ đọc điều này là thiếu tin tưởng và relationship capital sẽ giảm nhanh.',
    openQuestion: 'Có bài toán nào trong dự án này bạn thấy chúng ta chưa đang nhìn đúng không?',
  },

  'S8:INTP': {
    invest: 'INTP coi trọng sếp có thể engage với ý tưởng phức tạp và không dismiss câu hỏi "vô lý" — họ invest cho người trí tuệ bằng hoặc complement họ.',
    approach: [
      'Đặt câu hỏi mở về vấn đề bạn đang nghĩ — "Mình đang wonder về X — bạn thấy có angle nào mình chưa xem xét không?" — INTP thích được included vào intellectual puzzle',
      'Khi họ share insight dài, engage thật sự thay vì summarize và move on — INTP notice ngay bạn có hiểu hay không',
      'Give them time và space để cho ra câu trả lời tốt — không rush them với deadline artificial',
    ],
    avoid: 'Đừng ask for quick answer về complex problem và dismiss nếu câu trả lời có qualification — INTP sẽ stop sharing thinking với bạn.',
    openQuestion: 'Bạn đang nghĩ về vấn đề gì thú vị liên quan đến công việc gần đây?',
  },

  'S8:ENTJ': {
    invest: 'ENTJ coi trọng sếp ambitious, có vision rõ, và không hold them back — relationship được build khi họ thấy bạn là người accelerate career của họ, không phải bottleneck.',
    approach: [
      'Chia sẻ về strategy và direction của tổ chức sớm và thẳng — ENTJ cần biết bức tranh lớn để operate tốt và trust sếp có plan',
      'Giao visibility project — thứ giúp họ được thấy bởi leadership cấp trên — ENTJ invest cho sếp giúp họ grow',
      'Khi họ deliver tốt, advocate cho họ với leadership cấp trên — ENTJ nhớ lâu người sponsor cho mình',
    ],
    avoid: 'Đừng block opportunity hoặc keep information về strategy — ENTJ mất respect với sếp không cho họ đủ context để thật sự lead.',
    openQuestion: 'Bạn muốn đạt được gì trong role này trong 6 tháng tới — tôi muốn nghe để support đúng chỗ.',
  },

  'S8:ENTP': {
    invest: 'ENTP coi trọng sếp đủ tự tin để debate và không coi ý kiến phản biện là personal attack — đây là cách ENTP show respect và test xem sếp có đáng invest vào không.',
    approach: [
      'Mời họ phản biện ý tưởng hoặc decision quan trọng — "Tôi muốn nghe bạn find the holes trong plan này trước khi chúng ta commit" — ENTP invest nhiều hơn khi thấy được trust để challenge',
      'Share problem khó chưa có solution và genuinely muốn input — ENTP coi đây là dấu hiệu sếp treat họ như intellectual peer',
      'Khi insight của họ đúng và bạn áp dụng, ghi nhận — "Câu hỏi bạn đặt ra tuần trước dẫn đến quyết định X — đó là contribution thật"',
    ],
    avoid: 'Đừng dismiss ý kiến của họ mà không giải thích tại sao không áp dụng — ENTP sẽ disengage dần và chỉ nói những thứ bạn muốn nghe.',
    openQuestion: 'Bạn đang thấy điều gì chúng ta đang làm mà có thể làm tốt hơn gấp đôi nếu làm khác đi?',
  },

  // ============================================================
  // S3 — XUNG ĐỘT ĐỘI (6 cặp — reframe từ match-pair-content)
  // Key: S3:TYPE_A+TYPE_B (sorted alphabetically)
  // ============================================================

  'S3:ENFP+INTJ': {
    signal:
      'Hai người này hay ma sát ở chỗ ENFP cần kết nối còn INTJ cần không gian — dễ đọc nhầm thành lạnh lùng vs bám víu. INTJ hay đưa giải pháp ngay; ENFP cần được lắng nghe trước. Ở VN thường ít cãi to — tín hiệu hay là ENFP chủ động hơn bình thường, INTJ im lặng bất thường.',
    approach: [
      'Gặp riêng từng người trước khi họp cả hai — nghe concern thật mà không phán ai đúng sai.',
      'Với INTJ: nhắc họ hỏi "Bạn muốn mình lắng nghe hay giúp giải quyết?" trước khi đưa hướng xử lý — cách tiếp cận này thường match ENFP hơn là nhảy thẳng vào fix.',
      'Với ENFP: khuyến khích nói rõ khi chỉ cần trút bầu tâm sự — giúp INTJ biết đây không phải lúc cần kế hoạch hành động ngay.',
    ],
    avoid:
      'Đừng ép họ giải quyết ngay trong meeting chung khi chưa hiểu từng bên — ENFP đổi hướng đột ngột dễ làm INTJ cảm thấy mất kiểm soát và đóng cửa.',
    openQuestion:
      'Mình thấy gần đây hai bạn có vẻ không khớp nhịp — bạn đang cảm thấy điều gì khi làm việc với đồng nghiệp đó?',
    openQuestion2:
      'Mình muốn nghe góc nhìn của bạn — có điều gì trong cách hai bạn phối hợp đang làm bạn khó chịu mà chưa nói ra không?',
  },

  'S3:ESTJ+INFP': {
    signal:
      'Hai người này hay friction ở chỗ ESTJ ưu tiên kết quả và quy trình, INFP ưu tiên ý nghĩa và giá trị — định nghĩa "làm tốt" khác nhau. ESTJ có thể áp nhịp quá nhanh; INFP hay im lặng thay vì phản kháng. Ở VN, xung đột thường âm thầm: INFP rút lui, ESTJ cho là đồng ý.',
    approach: [
      'Gặp riêng từng người trước — đặc biệt tạo không gian an toàn cho INFP nói mà không bị ngắt lời.',
      'Với ESTJ: nhắc chậm lại và nghe hết concern của INFP — họ thường phát hiện vấn đề sớm hơn bạn nghĩ.',
      'Với INFP: khuyến khích nói thẳng nhu cầu cụ thể — ESTJ phản hồi tốt với yêu cầu rõ, không phải gợi ý mơ hồ.',
    ],
    avoid:
      'Đừng để ESTJ quyết định một mình rồi thông báo — INFP sẽ nuốt vào trong và mối quan hệ trong đội sẽ xấu dần mà không ai nói ra.',
    openQuestion:
      'Bạn thấy phần nào trong cách hai bạn phối hợp đang chưa hiệu quả — và bạn cần gì từ phía kia để làm tốt hơn?',
    openQuestion2:
      'Có điều gì bạn đang giữ trong lòng về cách đồng nghiệp làm việc mà mình muốn nghe thật sự không?',
  },

  'S3:ENTJ+ISFP': {
    signal:
      'Hai người này hay ma sát ở nhịp độ và cách thể hiện — ENTJ drive mạnh và có hệ thống, ISFP nhẹ nhàng và theo giá trị cá nhân. ENTJ có thể overwhelm; ISFP hay rút lui im lặng thay vì nói không. Tín hiệu VN: ISFP làm ít hơn hoặc tránh tương tác, ENTJ frustrated vì "không phản hồi".',
    approach: [
      'Gặp riêng từng người trước — đừng để ENTJ và ISFP đối đầu khi ISFP chưa cảm thấy an toàn.',
      'Với ENTJ: coi phản đối nhẹ của ISFP về giá trị là dữ liệu thật — hỏi rõ "Điều gì khiến bạn lo ngại?" thay vì đẩy tiếp.',
      'Với ISFP: khuyến khích nói boundary một lần, rõ ràng — ENTJ phản hồi tốt với giao tiếp thẳng, không phải hint.',
    ],
    avoid:
      'Đừng bỏ qua sự kháng cự nhẹ nhàng của ISFP vì "họ không nói gì" — đó thường là tín hiệu approach hiện tại không match, không phải đồng ý.',
    openQuestion:
      'Bạn thấy đồng nghiệp đang chậm hay khó phối hợp ở đâu — và bạn cần họ làm gì khác để đạt kết quả?',
    openQuestion2:
      'Có điều gì trong cách làm việc hiện tại khiến bạn không thoải mái mà bạn chưa nói với mình không?',
  },

  'S3:ENFP+ISTJ': {
    signal:
      'Hai người này có ít preference chung nhất — năng lượng, cách lấy thông tin, nhịp làm việc đều khác. ISTJ hay thấy ENFP thiếu đáng tin; ENFP thấy ISTJ quá cứng. Friction thường không nổ — mà là ENFP chủ động quá, ISTJ im lặng và làm theo cách riêng.',
    approach: [
      'Gặp riêng từng người trước — tìm shared values (trung thực, quan tâm đội) trước khi bàn cách làm.',
      'Với ENFP: nhắc thể hiện độ tin cậy qua hành động nhỏ đều đặn — ISTJ tin behavior hơn lời hứa.',
      'Với ISTJ: giúp họ thấy ENFP không cố phá quy trình mà cần linh hoạt có giới hạn — thỏa thuận ranh giới rõ.',
    ],
    avoid:
      'Đừng ép hai người "hòa ngay" trong meeting chung — gap lớn, cần bridge từng bước qua bạn, không qua áp lực nhóm.',
    openQuestion:
      'Bạn thấy đồng nghiệp đang làm gì khiến bạn khó tin tưởng hoặc khó phối hợp — nói thẳng với mình được không?',
    openQuestion2:
      'Có điều gì bạn cần từ phía kia để yên tâm làm việc cùng mà bạn chưa nói ra không?',
  },

  'S3:ESFJ+INTJ': {
    signal:
      'Hai người này hay friction ở chỗ ESFJ ưu tiên hòa khí, INTJ ưu tiên sự thật — va chạm về cái gì quan trọng hơn. INTJ nói thẳng dễ làm ESFJ tổn thương; nghĩa vụ xã hội của ESFJ dễ làm INTJ kiệt sức. Ở VN: ESFJ vẫn tươi cười nhưng tránh INTJ; INTJ coi là "ổn" trong khi ESFJ đang chịu đựng.',
    approach: [
      'Gặp riêng từng người trước — đừng để INTJ bluntness và ESFJ need-for-harmony va nhau trước mặt đội.',
      'Với ESFJ: giúp đọc sự thẳng thắn của INTJ như honesty, không phải chỉ trích cá nhân.',
      'Với INTJ: nhắc nói thật kèm lý do quan tâm — thêm "Mình nói điều này vì..." trước khi feedback cứng.',
    ],
    avoid:
      'Đừng bắt INTJ "mềm hơn" hoặc ESFJ "bớt quan tâm" công khai — sẽ làm cả hai defensive và đội thấy bạn chọn phe.',
    openQuestion:
      'Bạn thấy đồng nghiệp đang làm gì ảnh hưởng không khí đội — và bạn cần điều gì để hai bạn làm việc ổn hơn?',
    openQuestion2:
      'Có feedback nào bạn muốn đưa cho đồng nghiệp mà bạn đang giữ lại vì sợ làm họ tổn thương không?',
  },

  'S3:ENTP+ISFJ': {
    signal:
      'Hai người này hay friction ở worldview — ENTP thách thức cách làm cũ, ISFJ giữ ổn định và truyền thống. ENTP tranh luận vì explore; ISFJ hay coi đó là thiếu tôn trọng. Ở VN: ISFJ im lặng, tránh confrontation; ENTP không hiểu vì sao "không ai phản hồi".',
    approach: [
      'Gặp riêng từng người trước — ISFJ cần cảm thấy được tôn trọng trước khi nghe ENTP debate.',
      'Với ENTP: nhắc báo hiệu khi đang tranh luận để explore vs thực sự phản đối — ISFJ cần biết không phải tấn công cá nhân.',
      'Với ISFJ: khuyến khích nói rõ phần nào trong cách làm hiện tại quan trọng cần giữ — ENTP phản hồi tốt khi hiểu "tại sao".',
    ],
    avoid:
      'Đừng để ENTP debate truyền thống ISFJ trân trọng trước mặt nhóm — ISFJ sẽ withdraw hoàn toàn và bạn mất người giữ ổn định đội.',
    openQuestion:
      'Bạn đang thấy điều gì trong cách đội làm việc có thể làm tốt hơn — và bạn muốn thử hướng nào?',
    openQuestion2:
      'Có điều gì trong cách làm việc hiện tại bạn muốn giữ nguyên mà bạn lo sẽ bị thay đổi mà chưa được nghe không?',
  },
}

// ── SAMPLE SCRIPTS (Gap 1) — S1/S2/S4/S5 × NT/NF/ST/SF ─────
// Tone: NVC + Gottman repair + VN face-saving · sếp → nhân viên

type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

function getDiagnosticMbtiGroup(type: MbtiType): MbtiGroup {
  const isN = type.includes('N')
  const isT = type.includes('T')
  if (!isN && isT) return 'ST'
  if (!isN && !isT) return 'SF'
  if (isN && !isT) return 'NF'
  return 'NT'
}

const SAMPLE_SCRIPTS: Partial<
  Record<'S1' | 'S2' | 'S4' | 'S5', Record<MbtiGroup, string[]>>
> = {
  S1: {
    NT: [
      'Mình muốn trao đổi về phần [X] — không phải để phê bình, mà vì mình thấy có khoảng cách giữa kết quả và điều mình kỳ vọng. Bạn nhìn nhận thế nào?',
      'Mình tôn trọng cách bạn làm. Có một điểm mình muốn hiểu rõ hơn: [cụ thể]. Bạn nghĩ gì về cách tiếp cận đó?',
    ],
    NF: [
      'Trước khi nói về phần cần điều chỉnh, mình muốn bạn biết: đóng góp của bạn ở [Y] thật sự có giá trị. Phần mình muốn cùng nhìn lại là [X] — bạn thấy sao?',
      'Mình để ý có điều gì đó đang làm bạn chưa thoải mái. Mình muốn nghe góc nhìn của bạn trước khi mình nói tiếp.',
    ],
    ST: [
      'Mình có vài điểm cụ thể về [X] muốn trao đổi với bạn. Mình nghĩ nếu mình chỉ rõ thì mình cùng giải quyết nhanh hơn. Bạn ok không?',
      'Kết quả lần này có [điểm cụ thể] chưa đạt. Mình muốn hiểu nguyên nhân từ phía bạn trước khi mình kết luận gì.',
    ],
    SF: [
      'Mình quý cách bạn luôn cẩn thận với mọi người. Có một việc nhỏ mình muốn nói riêng với bạn về [X] — không có gì nghiêm trọng, mình chỉ muốn mình cùng tốt hơn.',
      'Mình thấy bạn đang cố gắng. Có một phần mình nghĩ mình điều chỉnh được cùng nhau — bạn nghe mình chia sẻ nhé?',
    ],
  },
  S2: {
    NT: [
      'Mình thấy dạo này bạn có vẻ ít hứng hơn với [project]. Có điều gì đang làm bạn thấy chưa ổn không — hay việc này chưa khớp với thứ bạn muốn làm?',
      'Mình muốn hỏi thật: bạn đang học được gì từ công việc hiện tại? Nếu có khoảng trống, mình muốn cùng bạn tìm cách.',
    ],
    NF: [
      'Gần đây mình cảm giác bạn không còn được kết nối với công việc như trước. Mình muốn hiểu — điều gì khiến bạn thấy việc mình làm có ý nghĩa nhất?',
      'Mình để ý bạn trầm hơn dạo này. Mình không muốn đoán — bạn có muốn chia sẻ điều gì đang trong lòng không?',
    ],
    ST: [
      'Mình thấy nhịp làm việc của bạn khác trước một chút. Có vướng mắc gì cụ thể trong quy trình hiện tại làm bạn thấy nản không?',
      'Nếu có gì trong cách tổ chức công việc đang cản bạn, mình muốn biết để điều chỉnh. Bạn thấy phần nào chưa hợp lý?',
    ],
    SF: [
      'Mình để ý bạn ít tham gia hơn dạo gần đây — và mình thật sự quan tâm bạn đang ổn không. Có điều gì mình giúp được không?',
      'Công việc bạn làm cho đội rất quan trọng, dù không phải lúc nào cũng được nói ra. Mình muốn biết bạn đang cảm thấy thế nào.',
    ],
  },
  S4: {
    NT: [
      'Mình thấy deadline lần này bị trễ. Mình không muốn dừng ở việc đó — mình muốn hiểu nguyên nhân gốc để lần sau mình cùng tránh. Bạn đang kẹt ở đâu?',
      'Kết quả chưa đạt mức mình kỳ vọng. Mình tin bạn làm được — nên mình muốn cùng bạn xem điều gì đang cản.',
    ],
    NF: [
      'Mình biết bạn đặt nhiều tâm huyết. Lần này có vài điểm chưa đạt — mình muốn cùng bạn nhìn lại, không phải để trách, mà để bạn không phải mang áp lực một mình.',
      'Bạn đang gặp kẹt ở bước nào không? Mình muốn hiểu rõ trước khi mình nói về deadline.',
    ],
    ST: [
      'Deadline lần này trễ [N ngày]. Mình muốn rõ ràng: nguyên nhân là gì, và mình cần làm gì khác để lần sau đúng hẹn?',
      'Mình thấy có khoảng cách giữa kế hoạch và kết quả. Mình cùng bạn rà lại quy trình để tìm điểm nghẽn nhé?',
    ],
    SF: [
      'Mình biết bạn luôn cố hết sức. Lần này có vài việc chưa kịp — mình không trách, mình chỉ muốn hiểu mình hỗ trợ bạn thế nào cho đỡ quá tải.',
      'Có phải bạn đang nhận quá nhiều việc cùng lúc không? Mình muốn cùng bạn sắp xếp lại ưu tiên.',
    ],
  },
  S5: {
    NT: [
      'Mình muốn hỏi thẳng và mong bạn cũng thẳng với mình: bạn đang tìm kiếm điều gì mà công việc hiện tại chưa cho bạn?',
      'Nếu bạn đang cân nhắc hướng đi khác, mình tôn trọng. Mình chỉ muốn hiểu — có điều gì ở đây mình thay đổi được để giữ bạn không?',
    ],
    NF: [
      'Mình cảm giác bạn đang ở một ngã rẽ nào đó. Mình không muốn níu kéo — mình muốn hiểu điều gì thật sự quan trọng với bạn lúc này.',
      'Dù bạn quyết định thế nào, mình vẫn trân trọng quãng thời gian bạn ở đây. Bạn có muốn chia sẻ điều đang khiến bạn suy nghĩ không?',
    ],
    ST: [
      'Mình muốn nói chuyện thẳng thắn. Nếu có điều gì cụ thể về công việc, lộ trình, hay điều kiện làm bạn cân nhắc rời đi — mình muốn nghe rõ.',
      'Bạn cần gì cụ thể để thấy ở lại là lựa chọn đúng? Mình muốn biết để cân nhắc thật sự, không hứa suông.',
    ],
    SF: [
      'Mình thật sự quý bạn trong đội. Nếu bạn đang nghĩ đến chuyện rời đi, mình muốn hiểu — có phải bạn đang cảm thấy chưa được ghi nhận đúng mức không?',
      'Mình muốn bạn biết công việc bạn làm có ý nghĩa với mọi người ở đây. Bạn có muốn nói với mình điều đang khiến bạn băn khoăn không?',
    ],
  },
}

const SAMPLE_SCRIPT_SITUATIONS = ['S1', 'S2', 'S4', 'S5'] as const

for (const key of Object.keys(MANAGER_DIAGNOSTIC)) {
  const colon = key.indexOf(':')
  if (colon === -1) continue
  const situation = key.slice(0, colon)
  const type = key.slice(colon + 1) as MbtiType
  if (!SAMPLE_SCRIPT_SITUATIONS.includes(situation as (typeof SAMPLE_SCRIPT_SITUATIONS)[number])) {
    continue
  }
  const group = getDiagnosticMbtiGroup(type)
  const scripts =
    SAMPLE_SCRIPTS[situation as 'S1' | 'S2' | 'S4' | 'S5']?.[group]
  if (scripts) {
    MANAGER_DIAGNOSTIC[key].sampleScripts = scripts
  }
}

// ── PUBLIC ENGINE API (Đợt 2) ─────────────────────────────────
// WA PM tái dùng cho "Hiểu cấp dưới" (1-1 context)

export interface GuidanceCardData {
  signal: string
  approach: string[]
  avoid: string
  openQuestion: string
  openQuestion2?: string
  invest?: string
  sampleScripts?: string[]
}

function toGuidanceCardData(entry: GuidanceCard): GuidanceCardData {
  return {
    signal: entry.signal ?? entry.invest ?? '',
    approach: entry.approach,
    avoid: entry.avoid,
    openQuestion: entry.openQuestion,
    openQuestion2: entry.openQuestion2,
    invest: entry.invest,
    sampleScripts: entry.sampleScripts,
  }
}

/**
 * Lấy guidance card cho 1 type trong 1 situation.
 * S3 (xung đột) cần 2 type → dùng getS3GuidanceCard.
 */
export function getGuidanceCard(
  type: string,
  situation: string,
): GuidanceCardData | null {
  const key = resolveDiagnosticKey(
    situation as SituationId,
    type as MbtiType,
  )
  const entry = MANAGER_DIAGNOSTIC[key]
  if (!entry) return null
  return toGuidanceCardData(entry)
}

/**
 * S3 — xung đột giữa 2 người (thứ tự type không quan trọng).
 */
export function getS3GuidanceCard(
  typeA: string,
  typeB: string,
): GuidanceCardData | null {
  const key = buildS3DiagnosticKey(typeA as MbtiType, typeB as MbtiType)
  const entry = MANAGER_DIAGNOSTIC[key]
  if (!entry) return null
  return toGuidanceCardData(entry)
}
