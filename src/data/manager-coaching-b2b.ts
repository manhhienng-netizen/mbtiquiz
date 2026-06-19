// manager-coaching-b2b.ts
// B2B Manager Coaching content — TÁCH HẲN khỏi data B2C (không mutate bestAssignment/bestAssignments).
// Ngày: 09/06/2026 · 13:00 · viết trên nền manager-coaching-research-backing-09062026.md
//
// KIẾN TRÚC HONEST (đọc trước khi sửa):
//   - FIELD_GUIDE = Lớp A: nguyên lý quản lý type-AGNOSTIC, research-grade. Đây là phần THẬT SỰ vận hành.
//     Nó GIỐNG NHAU cho mọi nhân viên — vì khoa học cho thấy type không quyết định nhiều như người ta tưởng.
//   - MANAGER_COACHING_B2B[type] = Lớp B: "màu sắc theo type" — chỉ là XU HƯỚNG, có rào, [P]/[S].
//     KHÔNG đứng một mình, luôn đi kèm principle + ask.
//   - HONEST_NOTE: mỗi thẻ mở đầu bằng câu này. Điều đúng nhất là HỎI người thật, không đoán từ type.
//
// GUARDRAIL (theo roadmap B2B §7 + bảng GAP của backing):
//   ✗ KHÔNG selection: tuyệt đối không "type này nên/không nên giao việc X" — chỉ "điều kiện hợp/bào mòn".
//   ✗ KHÔNG thao túng: không "đòn bẩy/nút bấm để khiến họ...".
//   ✗ KHÔNG claim bị bảng GAP cấm: type→dễ burnout hơn · type→hiệu suất · type→hồi phục nhanh/chậm sau stress.
//     (support tint dưới đây chỉ nói KIỂU nạp năng lượng I/E — có cơ sở Big Five — KHÔNG nói tốc độ/khả năng chịu đựng.)
//
// Nguồn nền (chi tiết ở backing): SDT (Deci&Ryan) · Drive (Pink) · Gallup Q12 · Radical Candor (Scott) ·
//   Growth Mindset (Dweck) · SBI (CCL) · Hofstede VN · Maslach/WHO · JD-R (Bakker&Demerouti) ·
//   Psychological Safety (Edmondson/Aristotle) · Big Five (McCrae&Costa) · Project Oxygen · Judge et al. 1999.

export type MbtiType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export type CoachingField = 'motivate' | 'feedback' | 'support' | 'environment'

export interface FieldGuide {
  label: string      // nhãn UI
  principle: string  // Lớp A — universal, nền thật
  ask: string        // câu quản lý HỎI thẳng nhân viên (đúng nhất)
}

// ── Lớp A — nguyên lý type-agnostic (dùng chung 16 type) ───────────────────────
export const FIELD_GUIDE: Record<CoachingField, FieldGuide> = {
  motivate: {
    label: 'Tạo động lực',
    principle:
      'Động lực bền đến từ ba thứ: được tự quyết cách làm, thấy mình đang giỏi lên, và thấy việc có ý nghĩa — ' +
      'cộng cảm giác được kết nối, quan tâm. Khi ai đó thiếu lửa, thường là thiếu một trong số đó, không phải lười. ' +
      'Thưởng/ép từ ngoài ít hiệu quả với việc cần sáng tạo.',
    ask:
      'Phần nào của việc này bạn thấy được tự quyết, phần nào muốn tự quyết hơn? ' +
      'Bạn thấy mình đang tiến bộ ở đâu? Việc này nối với điều gì bạn thấy đáng làm?',
  },
  feedback: {
    label: 'Đưa feedback',
    principle:
      'Feedback hiệu quả cần đồng thời quan tâm thật đến người VÀ nói thẳng điều cần nói — thiếu vế đầu thành công kích, ' +
      'thiếu vế sau thành tử tế vô ích. Nói cụ thể theo tình huống – hành vi – tác động, kịp thời, riêng tư, ' +
      'và hướng vào cách làm chứ đừng dán nhãn con người.',
    ask:
      'Bạn muốn mình góp ý kiểu đi thẳng vào vấn đề, hay cùng nhìn bối cảnh trước? Cách nào giúp bạn dễ tiếp nhận nhất?',
  },
  support: {
    label: 'Lưu ý & tránh kiệt sức',
    principle:
      'Kiệt sức không phải "mệt nhiều" — là cạn năng lượng + xa cách hoài nghi + mất cảm giác mình làm được, ' +
      'xảy ra khi áp lực vượt nguồn lực (tự chủ, hỗ trợ, ghi nhận). Quản lý không chẩn đoán, chỉ để ý tín hiệu và can thiệp đúng: ' +
      'cạn năng lượng → giảm tải thật; hoài nghi → nối lại ý nghĩa; mất tự tin → thành công nhỏ + ghi nhận. ' +
      'Môi trường an toàn để nói thật là điều kiện để người dám lên tiếng trước khi quá muộn.',
    ask:
      'Việc gì đang ngốn năng lượng bạn nhất? Bạn đang thiếu nguồn lực hay hỗ trợ nào? Có điều gì bạn ngại nói ra không?',
  },
  environment: {
    label: 'Môi trường hợp',
    principle:
      'Người làm tốt nhất khi điều kiện hợp với cách họ nạp năng lượng và tổ chức công việc. ' +
      'Đây là điều kiện tiếp/hút năng lượng — KHÔNG phải tiêu chí giao hay loại việc. ' +
      'Hỏi "khi nào bạn vào guồng, khi nào bị bào mòn" chính xác hơn mọi giả định từ type.',
    ask:
      'Bạn vào guồng nhất khi nào — lúc yên tĩnh tập trung hay lúc trao đổi sôi nổi? ' +
      'Bạn làm tốt hơn với lịch rõ ràng hay khi được linh hoạt?',
  },
}

// ── Câu honest mở đầu mọi thẻ ──────────────────────────────────────────────────
export const honestNote = (name: string): string =>
  `Đây là điểm khởi đầu theo type — điều đúng nhất là quan sát và hỏi ${name} trực tiếp.`

// ── Lớp B — màu sắc theo type (XU HƯỚNG, có rào). null = không có cơ sở → UI ẩn phần này. ──
export type TypeTint = Record<CoachingField, string | null>

// Fragment tái dùng theo TRỤC (honest — đây là mức evidence cho phép):
//   motivate   : per-type 16 (duy nhất per type)
//   feedback   : T/F × N/S → 4 variant (giải quyết NT≠ST và NF≠SF; vd INTJ≠ISTJ)
//                T/F = cách tiếp nhận · N/S = cách đóng khung nội dung · [P] backed
//   support    : I/E → 2 variant (kiểu nạp năng lượng)
//   environment: I/E × J/P → 4 variant
const FB_NT =
  'Đi thẳng vào logic và lý do — và đóng khung trong bức tranh lớn hơn hoặc tác động hệ thống. NT thường muốn hiểu "tại sao điều này quan trọng" trước khi tiếp nhận "cần thay đổi gì" — xu hướng.'
const FB_ST =
  'Đi thẳng vào logic và lý do — neo vào ví dụ cụ thể, hành vi quan sát được, bước tiếp theo rõ ràng. ST thường hấp thụ tốt nhất khi feedback không trừu tượng mà cụ thể vào việc đã làm — xu hướng.'
const FB_NF =
  'Cảm nhận được thiện chí trước ("mình nói vì muốn bạn tốt"), riêng tư không nơi đông người — rồi đóng khung như cơ hội phát triển hướng tới tiềm năng và giá trị của họ. NF thường phản ứng tốt khi feedback nuôi dưỡng chứ không phán xét — xu hướng.'
const FB_SF =
  'Cảm nhận được thiện chí trước ("mình nói vì muốn bạn tốt"), riêng tư không nơi đông người — rồi ghi nhận cụ thể hành động/nỗ lực đã thấy, sau đó mới đến cần điều chỉnh gì. SF thường cảm nhận thiện chí rõ nhất khi được ghi nhận qua việc thật cụ thể — xu hướng.'
const ENV_IJ =
  'Thường vào guồng khi có khoảng yên tĩnh để làm sâu không bị ngắt, cùng lịch và kỳ vọng rõ ràng — xu hướng.'
const ENV_IP =
  'Thường vào guồng khi có khoảng yên tĩnh tập trung và được linh hoạt về cách/khi nào làm, không bị khung quá cứng — xu hướng.'
const ENV_EJ =
  'Thường vào guồng khi được trao đổi, phối hợp, cùng mục tiêu và kế hoạch rõ ràng — xu hướng.'
const ENV_EP =
  'Thường vào guồng khi được tương tác, nghĩ-thành-lời và có sự đa dạng, linh hoạt — xu hướng.'
const SUP_I =
  'Thường nạp lại năng lượng qua thời gian yên tĩnh một mình; nếu thấy họ rút lui, có thể là đang cần khoảng lặng — cũng có thể là tín hiệu quá tải. Hỏi để phân biệt, đừng đoán.'
const SUP_E =
  'Thường nạp lại năng lượng qua tương tác; nếu họ bỗng im ắng, rút khỏi trao đổi, đó có thể là dấu hiệu đáng để ý. Hỏi để phân biệt, đừng đoán.'

export const MANAGER_COACHING_B2B: Record<MbtiType, TypeTint> = {
  INTJ: {
    motivate: 'Nhóm NT hướng nội thường được tiếp lửa bởi quyền tự quyết cách làm và cảm giác làm chủ chuyên môn; tầm nhìn dài hạn cũng cuốn hút — xu hướng.',
    feedback: FB_NT, environment: ENV_IJ, support: SUP_I,
  },
  INTP: {
    motivate: 'Thường được tiếp lửa bởi tự do khám phá ý tưởng và việc ngày càng thành thạo; bị bó khung quá cứng dễ làm nguội — xu hướng.',
    feedback: FB_NT, environment: ENV_IP, support: SUP_I,
  },
  ENTJ: {
    motivate: 'Thường được tiếp lửa bởi mục tiêu rõ, tiến độ thấy được và quyền điều phối; cảm giác làm chủ và kết quả có tác động — xu hướng.',
    feedback: FB_NT, environment: ENV_EJ, support: SUP_E,
  },
  ENTP: {
    motivate: 'Thường được tiếp lửa bởi vấn đề mới để giải, tự do thử nghiệm và trao đổi ý tưởng sôi nổi — xu hướng.',
    feedback: FB_NT, environment: ENV_EP, support: SUP_E,
  },
  INFJ: {
    motivate: 'Thường được tiếp lửa khi việc nối với ý nghĩa và tác động lên con người, trong không gian đủ yên để nghĩ sâu — xu hướng.',
    feedback: FB_NF, environment: ENV_IJ, support: SUP_I,
  },
  INFP: {
    motivate: 'Thường được tiếp lửa khi việc khớp giá trị cá nhân và có ý nghĩa thật, được làm theo cách riêng — xu hướng.',
    feedback: FB_NF, environment: ENV_IP, support: SUP_I,
  },
  ENFJ: {
    motivate: 'Thường được tiếp lửa bởi mục đích chung và việc giúp người khác phát triển; ghi nhận ấm áp có ý nghĩa — xu hướng.',
    feedback: FB_NF, environment: ENV_EJ, support: SUP_E,
  },
  ENFP: {
    motivate: 'Thường được tiếp lửa bởi ý nghĩa, khả năng mới và tự do; việc lặp lại đơn độc dễ làm nguội — xu hướng.',
    feedback: FB_NF, environment: ENV_EP, support: SUP_E,
  },
  ISTJ: {
    motivate: 'Thường được tiếp lửa bởi mục tiêu rõ, kết quả cụ thể đáng tin cậy và sự ghi nhận cho việc làm chắc chắn — xu hướng.',
    feedback: FB_ST, environment: ENV_IJ, support: SUP_I,
  },
  ISFJ: {
    motivate: 'Thường được tiếp lửa khi thấy mình hỗ trợ được người khác một cách thiết thực, trong môi trường ổn định và được ghi nhận — xu hướng.',
    feedback: FB_SF, environment: ENV_IJ, support: SUP_I,
  },
  ESTJ: {
    motivate: 'Thường được tiếp lửa bởi mục tiêu rõ, tiến độ đo được và việc tổ chức mọi thứ chạy trơn — xu hướng.',
    feedback: FB_ST, environment: ENV_EJ, support: SUP_E,
  },
  ESFJ: {
    motivate: 'Thường được tiếp lửa bởi sự gắn kết của đội, được ghi nhận và thấy mình giúp ích cho mọi người — xu hướng.',
    feedback: FB_SF, environment: ENV_EJ, support: SUP_E,
  },
  ISTP: {
    motivate: 'Thường được tiếp lửa bởi việc thực tế để giải quyết tận tay, quyền tự chủ và kết quả thấy ngay — xu hướng.',
    feedback: FB_ST, environment: ENV_IP, support: SUP_I,
  },
  ISFP: {
    motivate: 'Thường được tiếp lửa khi việc khớp giá trị và cho không gian sáng tạo riêng, không bị giám sát sát sao — xu hướng.',
    feedback: FB_SF, environment: ENV_IP, support: SUP_I,
  },
  ESTP: {
    motivate: 'Thường được tiếp lửa bởi hành động, kết quả nhanh và thử thách cụ thể — xu hướng. Nếu có yếu tố thi đua, nên để tự nguyện, không biến thành đòn bẩy ép.',
    feedback: FB_ST, environment: ENV_EP, support: SUP_E,
  },
  ESFP: {
    motivate: 'Thường được tiếp lửa bởi tương tác, sự đa dạng và thấy tác động tích cực ngay; việc lặp lại dài dễ làm nguội — xu hướng.',
    feedback: FB_SF, environment: ENV_EP, support: SUP_E,
  },
}

// Thứ tự hiển thị gợi ý cho UI
export const FIELD_ORDER: CoachingField[] = ['motivate', 'feedback', 'support', 'environment']
