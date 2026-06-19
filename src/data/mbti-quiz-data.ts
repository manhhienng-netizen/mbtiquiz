/**
 * mbti-quiz-data.ts
 * TNCB Adaptive MBTI Quiz — Question Bank
 *
 * Design principles (evidence-backed):
 * - Situation-based > self-assessment (higher discrimination)
 * - Likert 5-point scale (better CAT reliability than forced choice)
 * - 4-5 items minimum per dimension, 8 maximum
 * - T/F minimum 5 items (weakest dimension, 39-76% retest variation)
 * - Phase 1: 2 items/dimension (hook, fixed)
 * - Phase 2: adaptive based on score confidence
 *
 * Sources: IPIP open-source item bank, Mini-IPIP research,
 *          situational judgment test literature, VN context adaptation
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type Dimension = 'EI' | 'NS' | 'TF' | 'JP'
export type Phase = 1 | 2 | 3
export type LikertOption = 1 | 2 | 3 | 4 | 5

export interface QuizQuestion {
  id: string
  dimension: Dimension
  phase: Phase
  situation: string           // tình huống cụ thể
  optionA: string             // nghiêng về cực 1 (E/N/T/J)
  optionB: string             // nghiêng về cực 2 (I/S/F/P)
  scoringDirection: 'A_is_first' | 'B_is_first'
  // A_is_first: chọn A → +score về cực đầu (E/N/T/J)
  // 5-point: 1=Hoàn toàn A, 3=Trung lập, 5=Hoàn toàn B
  illustration: string        // icon name hoặc illustration key
  discriminationNote?: string // note về tại sao câu này tốt
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — HOOK QUESTIONS (8 câu cố định)
// Mỗi dimension 2 câu — situation-based, relatable với người VN
// ─────────────────────────────────────────────────────────────────────────────

export const PHASE1_QUESTIONS: QuizQuestion[] = [

  // ── E/I ──────────────────────────────────────────────────────────────────

  {
    id: 'EI_P1_01',
    dimension: 'EI',
    phase: 1,
    situation: "Sau một tuần làm việc bận rộn, cuối tuần đến bạn thường muốn...",
    optionA: "Gặp gỡ bạn bè, đi chơi, nạp năng lượng từ mọi người",
    optionB: "Ở nhà, đọc sách hoặc xem phim, tận hưởng không gian yên tĩnh",
    scoringDirection: 'A_is_first',
    illustration: 'weekend_recharge',
    discriminationNote: 'Classic E/I recharging question — high discrimination',
  },
  {
    id: 'EI_P1_02',
    dimension: 'EI',
    phase: 1,
    situation: "Trong buổi họp team đông người, bạn thường...",
    optionA: "Chủ động phát biểu, đóng góp ý kiến ngay lúc đó",
    optionB: "Quan sát, lắng nghe và suy nghĩ kỹ trước khi nói",
    scoringDirection: 'A_is_first',
    illustration: 'team_meeting',
  },

  // ── N/S ──────────────────────────────────────────────────────────────────

  {
    id: 'NS_P1_01',
    dimension: 'NS',
    phase: 1,
    situation: "Khi bắt đầu một dự án mới, điều bạn hứng thú nhất là...",
    optionA: "Khám phá ý tưởng lớn, tưởng tượng những gì có thể đạt được",
    optionB: "Lên kế hoạch cụ thể, xác định các bước rõ ràng để thực hiện",
    scoringDirection: 'A_is_first',
    illustration: 'new_project',
  },
  {
    id: 'NS_P1_02',
    dimension: 'NS',
    phase: 1,
    situation: "Khi đọc một cuốn sách hay xem phim, bạn thích...",
    optionA: "Câu chuyện giàu ý nghĩa ẩn dụ, để suy ngẫm về cuộc sống",
    optionB: "Câu chuyện thực tế, chi tiết cụ thể và dễ hình dung",
    scoringDirection: 'A_is_first',
    illustration: 'reading',
  },

  // ── T/F ──────────────────────────────────────────────────────────────────

  {
    id: 'TF_P1_01',
    dimension: 'TF',
    phase: 1,
    situation: "Bạn thân nhờ bạn góp ý về quyết định quan trọng của họ — một quyết định bạn thấy có vấn đề. Bạn sẽ...",
    optionA: "Chỉ ra thẳng những điểm không ổn, dù có thể họ không vui",
    optionB: "Tìm cách nói nhẹ nhàng, để họ không cảm thấy tệ về lựa chọn của mình",
    scoringDirection: 'A_is_first',
    illustration: 'giving_advice',
    discriminationNote: 'T/F classic — high stakes advice giving',
  },
  {
    id: 'TF_P1_02',
    dimension: 'TF',
    phase: 1,
    situation: "Khi đưa ra một quyết định quan trọng, bạn thường tin tưởng vào...",
    optionA: "Phân tích logic và dữ liệu khách quan",
    optionB: "Cảm nhận của bản thân và tác động lên những người liên quan",
    scoringDirection: 'A_is_first',
    illustration: 'decision_making',
  },

  // ── J/P ──────────────────────────────────────────────────────────────────

  {
    id: 'JP_P1_01',
    dimension: 'JP',
    phase: 1,
    situation: "Khi có một chuyến đi chơi với bạn bè, bạn thích...",
    optionA: "Lên lịch trình cụ thể từ trước — biết rõ sẽ làm gì, đi đâu",
    optionB: "Để tự nhiên, quyết định theo hứng — linh hoạt tùy tình huống",
    scoringDirection: 'A_is_first',
    illustration: 'trip_planning',
    discriminationNote: 'J/P classic — planning vs spontaneity',
  },
  {
    id: 'JP_P1_02',
    dimension: 'JP',
    phase: 1,
    situation: "Khi có nhiều việc cần làm trong tuần, bạn thường...",
    optionA: "Lên danh sách việc cần làm và tick off từng mục",
    optionB: "Làm theo cảm hứng, xử lý việc gì quan trọng nhất lúc đó",
    scoringDirection: 'A_is_first',
    illustration: 'task_list',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 2 — CLARIFY QUESTIONS (adaptive pool)
// Hỏi khi dimension score 35-65% (ambiguous zone)
// Mỗi dimension 6 câu bổ sung (tổng 8 câu/dimension khi cần)
// ─────────────────────────────────────────────────────────────────────────────

export const PHASE2_POOL: QuizQuestion[] = [

  // ── E/I (6 câu bổ sung) ──────────────────────────────────────────────────

  {
    id: 'EI_P2_01',
    dimension: 'EI',
    phase: 2,
    situation: "Khi phải làm việc quan trọng đòi hỏi tập trung cao, bạn làm việc tốt hơn khi...",
    optionA: "Có người xung quanh, không gian có chút hoạt động",
    optionB: "Một mình trong không gian yên tĩnh, không bị gián đoạn",
    scoringDirection: 'A_is_first',
    illustration: 'focus_work',
  },
  {
    id: 'EI_P2_02',
    dimension: 'EI',
    phase: 2,
    situation: "Khi gặp người mới ở một buổi tiệc hay sự kiện, bạn thường...",
    optionA: "Chủ động bắt chuyện, thoải mái làm quen",
    optionB: "Chờ người khác bắt chuyện trước hoặc chỉ nói với người đã quen",
    scoringDirection: 'A_is_first',
    illustration: 'social_event',
  },
  {
    id: 'EI_P2_03',
    dimension: 'EI',
    phase: 2,
    situation: "Bạn nhận được cuộc gọi bất ngờ trong khi đang làm việc một mình. Cảm giác đầu tiên của bạn là...",
    optionA: "Vui vì có người liên lạc, sẵn sàng nói chuyện",
    optionB: "Hơi bực vì bị gián đoạn, dù biết đó không phải vấn đề lớn",
    scoringDirection: 'A_is_first',
    illustration: 'phone_call',
  },
  {
    id: 'EI_P2_04',
    dimension: 'EI',
    phase: 2,
    situation: "Sau khi kết thúc một ngày giao tiếp nhiều (họp, gặp khách, sự kiện), bạn cảm thấy...",
    optionA: "Hứng khởi, đầy năng lượng, muốn tiếp tục gặp gỡ thêm",
    optionB: "Cần thời gian yên tĩnh một mình để phục hồi",
    scoringDirection: 'A_is_first',
    illustration: 'after_socializing',
    discriminationNote: 'Recharging pattern — strongest E/I discriminator',
  },
  {
    id: 'EI_P2_05',
    dimension: 'EI',
    phase: 2,
    situation: "Khi muốn xử lý một vấn đề phức tạp, bạn thường...",
    optionA: "Nói ra với người khác, thảo luận để tìm hướng giải quyết",
    optionB: "Suy nghĩ một mình trước, sau đó mới chia sẻ khi đã có hướng",
    scoringDirection: 'A_is_first',
    illustration: 'problem_solving',
  },
  {
    id: 'EI_P2_06',
    dimension: 'EI',
    phase: 2,
    situation: "Người xung quanh thường nhận xét bạn là người...",
    optionA: "Cởi mở, dễ gần, hay nói chuyện",
    optionB: "Trầm tĩnh, ít nói, khó đoán đang nghĩ gì",
    scoringDirection: 'A_is_first',
    illustration: 'personality_perception',
  },

  // ── N/S (6 câu bổ sung) ──────────────────────────────────────────────────

  {
    id: 'NS_P2_01',
    dimension: 'NS',
    phase: 2,
    situation: "Khi học một kỹ năng mới, bạn thích...",
    optionA: "Hiểu nguyên lý tổng thể trước, sau đó mới thực hành",
    optionB: "Thực hành luôn từng bước cụ thể, học qua làm",
    scoringDirection: 'A_is_first',
    illustration: 'learning_style',
  },
  {
    id: 'NS_P2_02',
    dimension: 'NS',
    phase: 2,
    situation: "Trong cuộc trò chuyện, bạn thích nhảy sang...",
    optionA: "Ý tưởng mới, khả năng, những gì có thể xảy ra trong tương lai",
    optionB: "Ví dụ cụ thể, kinh nghiệm thực tế, những gì đã xảy ra",
    scoringDirection: 'A_is_first',
    illustration: 'conversation_style',
  },
  {
    id: 'NS_P2_03',
    dimension: 'NS',
    phase: 2,
    situation: "Khi mô tả con đường đến chỗ nào đó, bạn thường nói...",
    optionA: "Theo hướng la bàn và cảm nhận không gian tổng thể",
    optionB: "Từng bước cụ thể: rẽ trái ở đâu, đi thẳng bao nhiêu",
    scoringDirection: 'A_is_first',
    illustration: 'giving_directions',
    discriminationNote: 'Classic N/S spatial description',
  },
  {
    id: 'NS_P2_04',
    dimension: 'NS',
    phase: 2,
    situation: "Bạn thấy mình hay bị thu hút bởi...",
    optionA: "Câu hỏi 'Tại sao?' và 'Điều gì có thể xảy ra?'",
    optionB: "Câu hỏi 'Cụ thể là gì?' và 'Làm thế nào?'",
    scoringDirection: 'A_is_first',
    illustration: 'curiosity_type',
  },
  {
    id: 'NS_P2_05',
    dimension: 'NS',
    phase: 2,
    situation: "Khi đọc hướng dẫn sử dụng một thiết bị mới, bạn thường...",
    optionA: "Đọc lướt, thử ngay và tự khám phá",
    optionB: "Đọc kỹ từng bước trước khi bắt đầu",
    scoringDirection: 'A_is_first',
    illustration: 'instruction_manual',
  },
  {
    id: 'NS_P2_06',
    dimension: 'NS',
    phase: 2,
    situation: "Khi giải quyết vấn đề, bạn thường tin vào...",
    optionA: "Linh cảm và kết nối các mảng thông tin không rõ ràng",
    optionB: "Bằng chứng cụ thể và kinh nghiệm đã được chứng minh",
    scoringDirection: 'A_is_first',
    illustration: 'problem_approach',
  },

  // ── T/F (6 câu bổ sung — TỐI THIỂU 5 CÂU TỔNG) ─────────────────────────

  {
    id: 'TF_P2_01',
    dimension: 'TF',
    phase: 2,
    situation: "Trong team, ai đó mắc lỗi ảnh hưởng đến cả nhóm. Phản ứng đầu tiên của bạn là...",
    optionA: "Phân tích nguyên nhân và tìm cách khắc phục ngay",
    optionB: "Hỏi thăm họ ổn không, sau đó mới bàn về cách giải quyết",
    scoringDirection: 'A_is_first',
    illustration: 'team_mistake',
  },
  {
    id: 'TF_P2_02',
    dimension: 'TF',
    phase: 2,
    situation: "Người thân kể về một tình huống khó — bạn chưa biết họ muốn gì. Bạn sẽ...",
    optionA: "Hỏi: 'Bạn muốn mình giúp giải quyết hay chỉ cần được nghe?'",
    optionB: "Lắng nghe và đồng cảm trước, để họ nói hết đã",
    scoringDirection: 'A_is_first',
    illustration: 'listening_support',
    discriminationNote: 'T asks clarifying question, F listens first',
  },
  {
    id: 'TF_P2_03',
    dimension: 'TF',
    phase: 2,
    situation: "Khi xem tin tức về một thảm họa ở đâu đó, bạn thường...",
    optionA: "Tìm hiểu nguyên nhân và phân tích cách ngăn chặn trong tương lai",
    optionB: "Cảm thấy xúc động, nghĩ đến những người bị ảnh hưởng",
    scoringDirection: 'A_is_first',
    illustration: 'news_reaction',
  },
  {
    id: 'TF_P2_04',
    dimension: 'TF',
    phase: 2,
    situation: "Ai đó phê bình công việc của bạn. Bạn xử lý thế nào?",
    optionA: "Đánh giá xem phê bình đó có cơ sở không — nếu có thì chỉnh sửa",
    optionB: "Cảm thấy không thoải mái, cần thời gian để tiêu hóa",
    scoringDirection: 'A_is_first',
    illustration: 'receiving_feedback',
  },
  {
    id: 'TF_P2_05',
    dimension: 'TF',
    phase: 2,
    situation: "Khi phải chọn giữa một quyết định đúng về logic nhưng làm người khác buồn, và một quyết định ít đúng hơn nhưng mọi người đều vui...",
    optionA: "Chọn quyết định đúng về logic — cảm xúc không nên quyết định điều này",
    optionB: "Tìm cách cân bằng — không muốn ai phải buồn vì quyết định của mình",
    scoringDirection: 'A_is_first',
    illustration: 'logic_vs_harmony',
    discriminationNote: 'Strongest T/F discriminator — head vs heart conflict',
  },
  {
    id: 'TF_P2_06',
    dimension: 'TF',
    phase: 2,
    situation: "Trong cuộc tranh luận, bạn cảm thấy thuyết phục nhất khi...",
    optionA: "Người kia đưa ra dữ liệu và lập luận logic chặt chẽ",
    optionB: "Người kia kể câu chuyện thực tế và cho thấy tác động con người",
    scoringDirection: 'A_is_first',
    illustration: 'persuasion_style',
  },

  // ── J/P (6 câu bổ sung) ──────────────────────────────────────────────────

  {
    id: 'JP_P2_01',
    dimension: 'JP',
    phase: 2,
    situation: "Khi còn nhiều việc chưa xong, bạn cảm thấy...",
    optionA: "Không thoải mái — muốn xử lý xong hết rồi mới nghỉ",
    optionB: "Bình thường — sẽ làm khi cần, không cần vội",
    scoringDirection: 'A_is_first',
    illustration: 'pending_tasks',
  },
  {
    id: 'JP_P2_02',
    dimension: 'JP',
    phase: 2,
    situation: "Khi kế hoạch bị thay đổi đột ngột, bạn thường...",
    optionA: "Hơi bực — thích biết trước để chuẩn bị",
    optionB: "Thích nghi nhanh — thay đổi thường mang lại điều thú vị",
    scoringDirection: 'A_is_first',
    illustration: 'plan_change',
  },
  {
    id: 'JP_P2_03',
    dimension: 'JP',
    phase: 2,
    situation: "Mô tả cách bạn thường làm việc gần deadline...",
    optionA: "Hoàn thành trước deadline, tránh áp lực phút chót",
    optionB: "Hay để đến gần deadline mới làm — cần áp lực mới hiệu quả",
    scoringDirection: 'A_is_first',
    illustration: 'deadline_style',
    discriminationNote: 'J/P deadline behavior — strong discriminator',
  },
  {
    id: 'JP_P2_04',
    dimension: 'JP',
    phase: 2,
    situation: "Phòng/không gian làm việc của bạn thường...",
    optionA: "Gọn gàng, ngăn nắp — mọi thứ có chỗ của nó",
    optionB: "Có vẻ lộn xộn nhưng bạn biết mọi thứ ở đâu",
    scoringDirection: 'A_is_first',
    illustration: 'workspace',
  },
  {
    id: 'JP_P2_05',
    dimension: 'JP',
    phase: 2,
    situation: "Khi phải đưa ra quyết định, bạn thường...",
    optionA: "Quyết định nhanh và chắc chắn với lựa chọn đó",
    optionB: "Giữ nhiều lựa chọn mở, quyết định sau khi đã cân nhắc đủ",
    scoringDirection: 'A_is_first',
    illustration: 'decision_style',
  },
  {
    id: 'JP_P2_06',
    dimension: 'JP',
    phase: 2,
    situation: "Bạn cảm thấy thoải mái nhất khi...",
    optionA: "Mọi thứ được lên kế hoạch và biết trước",
    optionB: "Có không gian linh hoạt để điều chỉnh theo tình huống",
    scoringDirection: 'A_is_first',
    illustration: 'comfort_zone',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — OPTIONAL DEPTH (4-8 câu, chỉ hỏi nếu user chọn)
// Câu khó hơn, phân biệt rõ hơn với người borderline
// ─────────────────────────────────────────────────────────────────────────────

export const PHASE3_POOL: QuizQuestion[] = [

  // Chỉ hỏi dimension vẫn còn borderline sau Phase 2

  {
    id: 'EI_P3_01',
    dimension: 'EI',
    phase: 3,
    situation: "Khi bạn buồn hoặc đang xử lý cảm xúc khó, bạn cần...",
    optionA: "Nói chuyện với ai đó — chia sẻ giúp bạn cảm thấy nhẹ hơn",
    optionB: "Thời gian và không gian một mình để tự xử lý",
    scoringDirection: 'A_is_first',
    illustration: 'emotional_processing',
  },
  {
    id: 'NS_P3_01',
    dimension: 'NS',
    phase: 3,
    situation: "Khi ai đó giải thích điều gì đó, bạn thấy dễ hiểu hơn khi họ...",
    optionA: "Giải thích ý nghĩa lớn và kết nối với bức tranh tổng thể",
    optionB: "Đưa ví dụ cụ thể và step-by-step rõ ràng",
    scoringDirection: 'A_is_first',
    illustration: 'explanation_preference',
  },
  {
    id: 'TF_P3_01',
    dimension: 'TF',
    phase: 3,
    situation: "Một quyết định của tổ chức bạn làm việc bị nhiều người phản đối vì ảnh hưởng đến cảm xúc team, dù logic là đúng. Bạn nghĩ...",
    optionA: "Quyết định đúng thì nên giữ — người sẽ quen dần",
    optionB: "Cần xem xét lại — tác động đến con người quan trọng không kém logic",
    scoringDirection: 'A_is_first',
    illustration: 'organizational_decision',
    discriminationNote: 'High stakes T/F — organizational context',
  },
  {
    id: 'JP_P3_01',
    dimension: 'JP',
    phase: 3,
    situation: "Khi nghĩ về tương lai, bạn cảm thấy thoải mái nhất khi...",
    optionA: "Có kế hoạch rõ ràng và biết mình đang hướng đến đâu",
    optionB: "Giữ mọi thứ mở — cơ hội tốt nhất thường đến bất ngờ",
    scoringDirection: 'A_is_first',
    illustration: 'future_planning',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PREVIEW MESSAGES (sau câu 8 — Phase 1 xong)
// ─────────────────────────────────────────────────────────────────────────────

export const PREVIEW_MESSAGES: Record<string, {
  heading: string
  body: string
  curiosityHook: string
}> = {
  // Key: "E_N" | "E_S" | "I_N" | "I_S" (2 chiều rõ nhất sau 8 câu)
  I_N: {
    heading: "Có vẻ bạn là người Hướng Nội & Trực Giác",
    body: "Bạn thường nạp năng lượng khi ở một mình và hay nhìn thấy bức tranh lớn hơn những gì đang xảy ra.",
    curiosityHook: "Thêm vài câu nữa để biết bạn thuộc nhóm tính cách nào trong 4 nhóm hướng nội — kết quả sẽ khác nhau nhiều lắm đấy 👀",
  },
  I_S: {
    heading: "Có vẻ bạn là người Hướng Nội & Thực Tế",
    body: "Bạn thường làm việc tốt nhất khi có không gian yên tĩnh và tin vào những gì đã được chứng minh.",
    curiosityHook: "Thêm vài câu để khám phá xem bạn là người ra quyết định bằng logic hay cảm xúc — điều này ảnh hưởng lớn đến cách bạn trong các mối quan hệ.",
  },
  E_N: {
    heading: "Có vẻ bạn là người Hướng Ngoại & Trực Giác",
    body: "Bạn nạp năng lượng từ mọi người xung quanh và hay bị thu hút bởi những ý tưởng mới và khả năng.",
    curiosityHook: "Thêm vài câu nữa — bạn thuộc nhóm ENFP sáng tạo hay ENTP hay tranh luận? Khác nhau nhiều lắm 😄",
  },
  E_S: {
    heading: "Có vẻ bạn là người Hướng Ngoại & Thực Tế",
    body: "Bạn thích hành động hơn lý thuyết và nạp năng lượng từ việc kết nối với người thật trong cuộc sống thực.",
    curiosityHook: "Thêm vài câu để biết bạn thích có kế hoạch hay thích tự phát — hai nhóm này rất khác nhau trong công việc và tình yêu.",
  },
  uncertain: {
    heading: "Bạn có vẻ rất cân bằng 🤔",
    body: "Một số câu trả lời của bạn cho thấy bạn linh hoạt giữa nhiều kiểu khác nhau — điều này khá thú vị!",
    curiosityHook: "Cần thêm vài câu nữa để tìm ra pattern thật sự của bạn. Người cân bằng thường có kết quả thú vị nhất đấy.",
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE LABELS (thay cho số câu — Goal Gradient Effect)
// ─────────────────────────────────────────────────────────────────────────────

export const PHASE_LABELS: Record<Dimension, string[]> = {
  EI: [
    "Đang tìm hiểu cách bạn nạp năng lượng...",
    "Đang làm rõ thêm về phong cách xã hội của bạn...",
  ],
  NS: [
    "Đang khám phá cách bạn nhìn nhận thế giới...",
    "Đang tìm hiểu cách bạn xử lý thông tin...",
  ],
  TF: [
    "Đang tìm hiểu cách bạn đưa ra quyết định...",
    "Đang làm rõ thêm về giá trị của bạn...",
  ],
  JP: [
    "Đang khám phá phong cách sống của bạn...",
    "Đang tìm hiểu cách bạn tổ chức cuộc sống...",
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// ADAPTIVE THRESHOLDS
// ─────────────────────────────────────────────────────────────────────────────

/** Score 0–100: 0 = E/N/T/J pole, 100 = I/S/F/P pole */
export const THRESHOLDS = {
  ambiguous: [35, 65] as const,
  clearLow: 35,
  clearHigh: 65,
} as const;

export const MIN_PER_DIM: Record<Dimension, number> = {
  EI: 4,
  NS: 4,
  TF: 5,
  JP: 4,
};

export const MAX_PER_DIM: Record<Dimension, number> = {
  EI: 8,
  NS: 8,
  TF: 8,
  JP: 8,
};

export function isDimensionAmbiguous(score: number): boolean {
  return score >= THRESHOLDS.ambiguous[0] && score <= THRESHOLDS.ambiguous[1];
}

export function isDimensionClear(score: number): boolean {
  return score < THRESHOLDS.clearLow || score > THRESHOLDS.clearHigh;
}

// ─────────────────────────────────────────────────────────────────────────────
// SCORING HELPER
// ─────────────────────────────────────────────────────────────────────────────

export function calculateDimensionScore(
  answers: { questionId: string; value: LikertOption }[],
  dimension: Dimension,
  allQuestions: QuizQuestion[]
): number {
  // Returns 0-100 (0 = fully first pole E/N/T/J, 100 = fully second pole I/S/F/P)
  const dimAnswers = answers.filter(a => {
    const q = allQuestions.find(q => q.id === a.questionId)
    return q?.dimension === dimension
  })
  if (dimAnswers.length === 0) return 50

  const total = dimAnswers.reduce((sum, a) => {
    const q = allQuestions.find(q => q.id === a.questionId)
    const value = q?.scoringDirection === 'A_is_first'
      ? a.value           // 1=E/N/T/J, 5=I/S/F/P
      : (6 - a.value)     // reverse
    return sum + value
  }, 0)

  const maxPossible = dimAnswers.length * 5
  const minPossible = dimAnswers.length * 1
  return Math.round(((total - minPossible) / (maxPossible - minPossible)) * 100)
}

export function getMBTIType(scores: Record<Dimension, number>): string {
  return [
    scores.EI < 50 ? 'E' : 'I',
    scores.NS < 50 ? 'N' : 'S',
    scores.TF < 50 ? 'T' : 'F',
    scores.JP < 50 ? 'J' : 'P',
  ].join('')
}

export function getPCC(score: number): 'slight' | 'moderate' | 'clear' | 'very_clear' {
  const distance = Math.abs(score - 50)
  if (distance < 10) return 'slight'
  if (distance < 20) return 'moderate'
  if (distance < 35) return 'clear'
  return 'very_clear'
}

export const ALL_QUESTIONS = [
  ...PHASE1_QUESTIONS,
  ...PHASE2_POOL,
  ...PHASE3_POOL,
]
