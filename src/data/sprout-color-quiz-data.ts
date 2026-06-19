// ============================================================
// sprout-color-quiz-data.ts
// TNCB Learn · File: src/data/sprout-color-quiz-data.ts
// Nhóm tuổi: SPROUT (6-8) — quiz 4 Sắc màu tiềm năng
// ============================================================
// Mô hình custom "Sắc màu tiềm năng" — lấy cảm hứng từ lý
// thuyết khí chất công cộng (Hippocrates/Keirsey).
// KHÔNG phải True Colors. KHÔNG sử dụng tên/mô tả của Don Lowry.
// ============================================================
// CÁCH DÙNG:
//   import { SPROUT_QUESTIONS, SPROUT_COLOR_META }
//     from '@/data/sprout-color-quiz-data'
//
// FLOW:
//   1. Bố/mẹ đọc questionText cho con nghe
//   2. Con chỉ vào hình / bố/mẹ chọn option con thích nhất
//   3. Option chọn → +1 cho color tương ứng
//   4. Sau 8 câu → tally → màu cao nhất = kết quả
//   5. Render SPROUT_COLOR_META[color] trên màn kết quả
//
// SCORING ENGINE:
//   const scores: Record<SproutColor, number> = {
//     xanh_duong: 0, vang: 0, xanh_la: 0, cam: 0
//   }
//   // Mỗi câu: scores[selectedOption.color] += 1
//   // Kết quả: Object.entries(scores).sort(([,a],[,b]) => b-a)[0][0]
// ============================================================
// NGUYÊN TẮC NỘI DUNG:
//   - Bố/mẹ đọc cho con nghe — ngôn ngữ đơn giản, cụ thể
//   - KHÔNG label cứng: "Con đang có..." không "Con là..."
//   - Tất cả 4 options đều tốt đẹp — không có lựa chọn sai
//   - Scenario gần gũi với trẻ 6-8 (trường/nhà/chơi)
//   - KHÔNG tâm linh, KHÔNG định hướng nghề
//   - options đặt random, không theo thứ tự cố định của màu
// ============================================================

export type SproutColor = 'xanh_duong' | 'vang' | 'xanh_la' | 'cam'

export interface SproutColorOption {
  /** Màu mà option này signal */
  color: SproutColor
  /**
   * Mô tả hành vi ngắn — bố/mẹ đọc cho con nghe.
   * Cực kỳ đơn giản, cụ thể, trẻ 6-8 nhận ra ngay.
   * KHÔNG dùng tên màu trong text.
   */
  text: string
  /** Key hình minh họa — dev render icon/ảnh bên cạnh text */
  illustrationKey: string
}

export interface SproutColorQuestion {
  /** 'SPROUT_Q01' ... 'SPROUT_Q08' */
  id: string
  /**
   * Câu hỏi — bố/mẹ đọc to cho con nghe.
   * Ngắn, thân thiện, dễ hiểu với trẻ 6 tuổi.
   */
  questionText: string
  /**
   * 4 options — mỗi cái signal 1 màu khác nhau.
   * Tuple đảm bảo luôn có đủ 4.
   */
  options: [SproutColorOption, SproutColorOption, SproutColorOption, SproutColorOption]
  /** Key hình minh họa chính của câu — dev render ảnh to ở đầu */
  illustration: string
}

// ─────────────────────────────────────────────────────────────
// 8 CÂU HỎI QUIZ
// Mỗi câu cover đủ 4 màu.
// Options được đặt xen kẽ màu để tránh pattern dự đoán được.
// ─────────────────────────────────────────────────────────────

export const SPROUT_QUESTIONS: SproutColorQuestion[] = [

  // ── Q01: Giờ chơi tự do ────────────────────────────────
  {
    id: 'SPROUT_Q01',
    questionText: 'Khi được chơi tự do ở nhà, con thích làm gì nhất?',
    illustration: 'playtime_home',
    options: [
      {
        color: 'xanh_la',
        text: 'Lắp ráp mô hình hoặc xếp hình — thích tự mình tìm ra cách làm',
        illustrationKey: 'building_blocks',
      },
      {
        color: 'cam',
        text: 'Chạy nhảy, leo trèo, chơi đùa năng động',
        illustrationKey: 'running_jumping',
      },
      {
        color: 'xanh_duong',
        text: 'Chơi cùng bạn hoặc kể chuyện cho bố mẹ nghe',
        illustrationKey: 'playing_with_friends',
      },
      {
        color: 'vang',
        text: 'Sắp xếp đồ chơi gọn gàng hoặc vẽ theo sách hướng dẫn',
        illustrationKey: 'organizing_toys',
      },
    ],
  },

  // ── Q02: Ở lớp học ─────────────────────────────────────
  {
    id: 'SPROUT_Q02',
    questionText: 'Trong lớp học, con thường làm gì khi thầy cô hỏi câu hỏi khó?',
    illustration: 'classroom_question',
    options: [
      {
        color: 'xanh_duong',
        text: 'Nhìn xem bạn bè có biết không, muốn giúp nhau cùng trả lời',
        illustrationKey: 'looking_at_friends',
      },
      {
        color: 'xanh_la',
        text: 'Suy nghĩ kỹ, tự mình tìm câu trả lời trước khi giơ tay',
        illustrationKey: 'thinking_hard',
      },
      {
        color: 'vang',
        text: 'Nhớ lại những gì thầy cô đã dạy và trả lời theo đúng bài',
        illustrationKey: 'remembering_lesson',
      },
      {
        color: 'cam',
        text: 'Giơ tay ngay và thử trả lời — thích được thử xem mình có đúng không',
        illustrationKey: 'raising_hand_fast',
      },
    ],
  },

  // ── Q03: Khi bạn buồn ──────────────────────────────────
  {
    id: 'SPROUT_Q03',
    questionText: 'Con thấy một bạn đang ngồi buồn một mình. Con thường làm gì?',
    illustration: 'friend_sitting_alone',
    options: [
      {
        color: 'xanh_duong',
        text: 'Đến hỏi bạn có ổn không, ngồi cạnh bạn cho vui',
        illustrationKey: 'comforting_friend',
      },
      {
        color: 'cam',
        text: 'Rủ bạn đi chơi một trò gì đó cho bạn quên buồn',
        illustrationKey: 'inviting_to_play',
      },
      {
        color: 'vang',
        text: 'Hỏi thầy cô để biết có thể giúp bạn theo đúng cách',
        illustrationKey: 'asking_teacher',
      },
      {
        color: 'xanh_la',
        text: 'Nghĩ xem tại sao bạn buồn, rồi mới tìm cách giúp',
        illustrationKey: 'thinking_about_friend',
      },
    ],
  },

  // ── Q04: Trò chơi nhóm ─────────────────────────────────
  {
    id: 'SPROUT_Q04',
    questionText: 'Khi chơi trò chơi cùng bạn bè, con thích nhất điều gì?',
    illustration: 'group_game',
    options: [
      {
        color: 'cam',
        text: 'Được tranh đua xem ai nhanh hơn, ai thắng',
        illustrationKey: 'racing_winning',
      },
      {
        color: 'xanh_duong',
        text: 'Cả nhóm cùng chơi vui, không ai bị thua buồn',
        illustrationKey: 'everyone_happy',
      },
      {
        color: 'xanh_la',
        text: 'Trò chơi có luật thú vị để suy nghĩ và giải đố',
        illustrationKey: 'puzzle_game',
      },
      {
        color: 'vang',
        text: 'Mọi người chơi đúng luật và lần lượt theo thứ tự',
        illustrationKey: 'following_rules',
      },
    ],
  },

  // ── Q05: Cuối tuần ─────────────────────────────────────
  {
    id: 'SPROUT_Q05',
    questionText: 'Bố mẹ hỏi con muốn làm gì vào cuối tuần. Con thích chọn gì nhất?',
    illustration: 'weekend_choice',
    options: [
      {
        color: 'xanh_la',
        text: 'Đến bảo tàng hoặc xem phim khoa học có nhiều điều hay',
        illustrationKey: 'museum_visit',
      },
      {
        color: 'vang',
        text: 'Làm theo kế hoạch đã định sẵn — con thích biết trước sẽ làm gì',
        illustrationKey: 'planned_activity',
      },
      {
        color: 'cam',
        text: 'Ra ngoài chạy nhảy hoặc thử điều gì mới mẻ chưa làm bao giờ',
        illustrationKey: 'outdoor_adventure',
      },
      {
        color: 'xanh_duong',
        text: 'Gặp gỡ họ hàng hoặc bạn bè của gia đình — thích có đông người',
        illustrationKey: 'family_gathering',
      },
    ],
  },

  // ── Q06: Góc học ───────────────────────────────────────
  {
    id: 'SPROUT_Q06',
    questionText: 'Góc học của con trông như thế nào?',
    illustration: 'study_corner',
    options: [
      {
        color: 'vang',
        text: 'Sách vở và bút màu xếp gọn gàng đúng chỗ — con thích như vậy',
        illustrationKey: 'neat_desk',
      },
      {
        color: 'xanh_la',
        text: 'Có nhiều sách và thứ thú vị để khám phá — hơi bề bộn nhưng con biết ở đâu hết',
        illustrationKey: 'books_everywhere',
      },
      {
        color: 'xanh_duong',
        text: 'Có ảnh bạn bè hoặc gia đình và những đồ vật con trân trọng',
        illustrationKey: 'cozy_corner',
      },
      {
        color: 'cam',
        text: 'Con không hay ngồi yên một chỗ — thích học ở đây một lúc rồi chạy đi chỗ khác',
        illustrationKey: 'moving_around',
      },
    ],
  },

  // ── Q07: Khi làm xong bài ──────────────────────────────
  {
    id: 'SPROUT_Q07',
    questionText: 'Con vừa làm xong bài tập. Con thường làm gì tiếp theo?',
    illustration: 'finished_homework',
    options: [
      {
        color: 'cam',
        text: 'Chạy ra ngoài chơi ngay — thích vận động sau khi ngồi lâu',
        illustrationKey: 'run_outside',
      },
      {
        color: 'xanh_duong',
        text: 'Khoe với bố mẹ hoặc gọi bạn nói chuyện',
        illustrationKey: 'show_parents',
      },
      {
        color: 'xanh_la',
        text: 'Đọc sách hoặc xem video về điều con đang tò mò',
        illustrationKey: 'reading_book',
      },
      {
        color: 'vang',
        text: 'Kiểm tra lại bài cho chắc chắn rồi mới cất đi',
        illustrationKey: 'checking_homework',
      },
    ],
  },

  // ── Q08: Khi có thứ mới ────────────────────────────────
  {
    id: 'SPROUT_Q08',
    questionText: 'Bố mẹ mua cho con một món đồ chơi mới. Con thường làm gì đầu tiên?',
    illustration: 'new_toy',
    options: [
      {
        color: 'xanh_la',
        text: 'Nhìn kỹ xem nó được làm thế nào và cách hoạt động ra sao',
        illustrationKey: 'examining_toy',
      },
      {
        color: 'xanh_duong',
        text: 'Rủ bạn hoặc anh chị em cùng chơi',
        illustrationKey: 'sharing_toy',
      },
      {
        color: 'vang',
        text: 'Đọc hướng dẫn hoặc xem bao bì trước khi mở',
        illustrationKey: 'reading_instructions',
      },
      {
        color: 'cam',
        text: 'Mở ra và chơi thử ngay — không cần đọc hướng dẫn',
        illustrationKey: 'open_and_play',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────
// METADATA 4 MÀU — dùng trong màn kết quả
// ─────────────────────────────────────────────────────────────

export const SPROUT_COLOR_META: Record<SproutColor, {
  /** Emoji đại diện — hiển thị to trong màn kết quả */
  emoji: string
  /** Tên ngắn hiển thị — VD "Bé Xanh Dương" */
  nameShort: string
  /** 1 câu tagline ấm áp — bố/mẹ đọc cho con nghe */
  tagline: string
  /**
   * 1–2 câu cho mục "Bố/mẹ biết không?" — hành vi quan sát được,
   * growth framing, không chẩn đoán (research-reference temperament map).
   */
  parentInsight: [string, string]
  /**
   * 3 điểm mạnh vui — ngôn ngữ 6-8 tuổi.
   * Growth framing: "Con đang có..." không "Con là..."
   * Vui tươi, cụ thể, trẻ nhận ra được trong cuộc sống hàng ngày.
   */
  strengths: [string, string, string]
  /**
   * Mapping sang nhóm MBTI — dùng cho narrative continuity
   * khi trẻ lên 13 và làm quiz MBTI.
   * VD: app nói "Hồi lớp 2 con là Bé Xanh Lá →
   *      điều đó kết nối với ENTP của em thế này..."
   */
  mbtiGroup: 'NT' | 'NF' | 'SJ' | 'SP'
  /** Màu hex — dev dùng cho UI theming */
  colorHex: string
}> = {

  xanh_la: {
    emoji: '🟢',
    nameShort: 'Bé Xanh Lá',
    tagline: 'Con đang có óc tò mò tuyệt vời — con thích hỏi "tại sao" và tự mình tìm ra câu trả lời!',
    parentInsight: [
      'Ở nhà và ở lớp, con thường muốn tự tìm cách trước — hỏi nhiều, thử nhiều, và thích khi được giải thích vì sao.',
      'Bố/mẹ có thể ghi nhận câu hỏi hay của con thay vì chỉ khen kết quả — đó là cách con đang luyện tư duy.',
    ],
    strengths: [
      'Con đang có trí tò mò rất đặc biệt — con hỏi những câu hỏi hay mà bạn bè chưa nghĩ đến',
      'Con giỏi tự mình giải quyết vấn đề — khi gặp khó, con không bỏ cuộc mà tìm cách khác',
      'Con có trí nhớ tốt về những điều con thích — con nhớ rất nhiều thứ thú vị mà con học được',
    ],
    mbtiGroup: 'NT',
    colorHex: '#22C55E',
  },

  xanh_duong: {
    emoji: '🔵',
    nameShort: 'Bé Xanh Dương',
    tagline: 'Con đang có trái tim ấm áp tuyệt vời — con quan tâm đến bạn bè và làm cho mọi người cảm thấy vui!',
    parentInsight: [
      'Con hay để ý cảm xúc người khác — muốn mọi người được vui và thường chủ động an ủi hoặc mời chơi cùng.',
      'Bố/mẹ có thể kể lại một lúc con đã giúp bạn — con sẽ thấy mình được nhìn đúng cách.',
    ],
    strengths: [
      'Con đang có trái tim nhân hậu — con hay để ý khi bạn bè buồn và muốn giúp đỡ',
      'Con giỏi kết bạn và làm cho mọi người cảm thấy được chào đón',
      'Con biết nói những điều khiến người khác cảm thấy tốt hơn — đây là điều rất quý',
    ],
    mbtiGroup: 'NF',
    colorHex: '#3B82F6',
  },

  vang: {
    emoji: '🟡',
    nameShort: 'Bé Vàng',
    tagline: 'Con đang có sự đáng tin cậy tuyệt vời — con làm mọi thứ cẩn thận và bố mẹ luôn tin tưởng con!',
    parentInsight: [
      'Con thích mọi thứ rõ ràng — làm theo hướng dẫn, giữ gọn gàng, và cảm thấy an tâm khi biết trước sẽ làm gì.',
      'Bố/mẹ có thể nhắc trước lịch trình nhỏ (ăn, học, chơi) — con sẽ hợp tác dễ hơn khi không bị bất ngờ.',
    ],
    strengths: [
      'Con đang có tính cẩn thận đặc biệt — con làm việc gì cũng chắc chắn và không bỏ sót',
      'Con rất đáng tin cậy — khi con hứa điều gì, con luôn cố gắng làm đúng như vậy',
      'Con giỏi ghi nhớ và làm theo hướng dẫn — con học bài rất có trật tự',
    ],
    mbtiGroup: 'SJ',
    colorHex: '#EAB308',
  },

  cam: {
    emoji: '🟠',
    nameShort: 'Bé Cam',
    tagline: 'Con đang có năng lượng tuyệt vời — con thích thử những điều mới và luôn mang lại sự vui vẻ!',
    parentInsight: [
      'Con học nhanh qua trải nghiệm — thích chạy nhảy, thử trò mới, và mang không khí vui vào nhóm chơi.',
      'Bố/mẹ có thể cho con thử hoạt động ngắn, đổi dần — con cần chuyển động hơn là ngồi lâu một việc.',
    ],
    strengths: [
      'Con đang có năng lượng tràn đầy — con làm cho mọi hoạt động trở nên vui hơn',
      'Con dũng cảm thử những điều mới — con không sợ bắt đầu điều chưa từng làm',
      'Con phản ứng nhanh và linh hoạt — khi có thay đổi bất ngờ, con thích nghi rất nhanh',
    ],
    mbtiGroup: 'SP',
    colorHex: '#F97316',
  },
}

// ─────────────────────────────────────────────────────────────
// COVERAGE TABLE — màu xuất hiện bao nhiêu lần trong 32 options
// ─────────────────────────────────────────────────────────────
//
// | Màu         | Q01 Q02 Q03 Q04 Q05 Q06 Q07 Q08 | TỔNG |
// |-------------|----------------------------------|------|
// | xanh_la     |  ✓   ✓   ✓        ✓   ✓   ✓   ✓  |  7   |
// | xanh_duong  |  ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓  |  8   |
// | vang        |  ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓  |  8   |
// | cam         |  ✓   ✓   ✓   ✓   ✓   ✓   ✓   ✓  |  8   |
// | xanh_la     |  ✓                ✓             |  2   |
//
// Thực tế đếm chính xác (4 màu × 8 câu = 32 options tổng):
// xanh_la:    8 lần (mỗi câu đúng 1 lần)
// xanh_duong: 8 lần
// vang:        8 lần
// cam:         8 lần
// Tổng:       32 = 8 câu × 4 options ✓
//
// Điểm tối đa mỗi màu: 8/8 câu
// Điểm tối thiểu để "thắng": > điểm màu còn lại
// ─────────────────────────────────────────────────────────────
