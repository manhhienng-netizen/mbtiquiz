/**
 * CONVERGENCE TRAITS DATA
 * packages/data/src/convergence-traits-data.ts
 *
 * Mapping 13 trait cốt lõi ↔ tín hiệu từ 3 hệ thống:
 *   - MBTI (type patterns)
 *   - Numerology (life path numbers)
 *   - Element (Ngũ Hành từ năm sinh + Nhật Chủ Bát Tự)
 *
 * Dùng cho: findConvergences() trong Character System
 * Logic: trait xuất hiện ≥ 2/3 hệ thống → CORE TRAIT
 *        trait chỉ 1 hệ thống → UNIQUE TRAIT
 */

export interface TraitSignal {
  trait: string                    // unique key
  label: string                    // tên hiển thị tiếng Việt
  description: string              // mô tả ngắn cho user
  mbtiSignals: {
    strongTypes: string[]          // types mang trait này mạnh nhất
    moderateTypes: string[]        // types cũng có nhưng ít hơn
    dimension?: string             // dimension liên quan: N/S, T/F, E/I, J/P
    dimensionSide?: 'high' | 'low' // phía nào của dimension
  }
  numerologySignals: {
    strongNumbers: number[]        // life path numbers mang trait mạnh
    moderateNumbers: number[]
    explanation: string
  }
  elementSignals: {
    strongElements: string[]       // Ngũ Hành mang trait này
    moderateElements: string[]
    batTuCan?: string[]            // Thiên Can Nhật Chủ liên quan
    explanation: string
  }
  growthEdge: string               // điểm phát triển / mặt tối của trait
  inWork: string                   // biểu hiện trong công việc
  inRelationship: string           // biểu hiện trong mối quan hệ
}

export const TRAIT_SIGNALS: TraitSignal[] = [

  // ─────────────────────────────────────────────────────────
  // 1. ANALYTICAL — Tư duy phân tích
  // ─────────────────────────────────────────────────────────
  {
    trait: 'analytical',
    label: 'Tư duy phân tích sâu',
    description: 'Có xu hướng đào sâu vào bản chất vấn đề, tìm kiếm nguyên nhân gốc rễ hơn là chấp nhận câu trả lời bề mặt.',
    mbtiSignals: {
      strongTypes: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
      moderateTypes: ['ISTJ', 'ESTJ', 'INFJ'],
      dimension: 'TF',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [7, 4, 1],
      moderateNumbers: [8, 22],
      explanation: 'Số 7 là con số của tìm kiếm sự thật và phân tích sâu; Số 4 có tư duy hệ thống; Số 1 độc lập và không chấp nhận câu trả lời chung chung.',
    },
    elementSignals: {
      strongElements: ['Kim', 'Thủy'],
      moderateElements: ['Mộc'],
      batTuCan: ['Canh', 'Tân', 'Nhâm', 'Quý'],
      explanation: 'Kim sắc bén và chính xác — tư duy cắt gọt đến tận cùng vấn đề. Thủy sâu thẳm và bao quát — tư duy đa chiều.',
    },
    growthEdge: 'Có thể over-analyze đến mức tê liệt hoặc bỏ qua góc nhìn cảm xúc quan trọng.',
    inWork: 'Xuất sắc trong nghiên cứu, chiến lược, và giải quyết vấn đề phức tạp. Cần được giao vấn đề thật sự khó.',
    inRelationship: 'Phân tích mối quan hệ thay vì cảm nhận. Cần partner đủ trí tuệ để engage ở tầng sâu.',
  },

  // ─────────────────────────────────────────────────────────
  // 2. INDEPENDENT — Độc lập nguyên tắc
  // ─────────────────────────────────────────────────────────
  {
    trait: 'independent',
    label: 'Độc lập nguyên tắc',
    description: 'Tự hình thành quan điểm riêng dựa trên nghiên cứu và suy nghĩ độc lập, không bị đám đông hoặc áp lực xã hội chi phối.',
    mbtiSignals: {
      strongTypes: ['INTJ', 'ISTP', 'INTP', 'ENTJ'],
      moderateTypes: ['INFJ', 'ENTP', 'ISFP'],
      dimension: 'EI',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [1, 7, 4],
      moderateNumbers: [8, 9],
      explanation: 'Số 1 là con số của tiên phong và không cần sự chấp thuận. Số 7 tự nghiên cứu và không tin vào nhận thức chung. Số 4 kiên định theo nguyên tắc.',
    },
    elementSignals: {
      strongElements: ['Kim', 'Mộc'],
      moderateElements: ['Hỏa'],
      batTuCan: ['Giáp', 'Canh', 'Nhâm'],
      explanation: 'Kim cứng rắn và không uốn cong theo áp lực. Mộc (Giáp) vươn thẳng không uốn khúc — biểu tượng của độc lập nguyên tắc.',
    },
    growthEdge: 'Có thể từ chối sự giúp đỡ cần thiết hoặc khó hợp tác hiệu quả.',
    inWork: 'Cần tự chủ trong công việc. Không thể hoạt động tốt dưới micro-management.',
    inRelationship: 'Cần không gian cá nhân và partner tôn trọng sự độc lập đó.',
  },

  // ─────────────────────────────────────────────────────────
  // 3. EMPATHETIC — Đồng cảm sâu
  // ─────────────────────────────────────────────────────────
  {
    trait: 'empathetic',
    label: 'Đồng cảm và kết nối người',
    description: 'Khả năng cảm nhận và hiểu trạng thái cảm xúc của người khác, tạo ra kết nối chân thực ở tầng cảm xúc.',
    mbtiSignals: {
      strongTypes: ['INFJ', 'INFP', 'ENFJ', 'ESFJ'],
      moderateTypes: ['ISFJ', 'ENFP', 'ISFP'],
      dimension: 'TF',
      dimensionSide: 'low',
    },
    numerologySignals: {
      strongNumbers: [2, 6, 9],
      moderateNumbers: [3, 33],
      explanation: 'Số 2 là con số của kết nối và đồng cảm; Số 6 yêu thương và nuôi dưỡng; Số 9 có trái tim nhân loại — đồng cảm ở tầng phổ quát.',
    },
    elementSignals: {
      strongElements: ['Thủy', 'Mộc'],
      moderateElements: ['Hỏa'],
      batTuCan: ['Quý', 'Ất', 'Đinh'],
      explanation: 'Thủy chảy và thấm vào mọi ngóc ngách — đồng cảm tự nhiên như nước. Mộc (Ất) uốn mình theo hoàn cảnh và người khác.',
    },
    growthEdge: 'Dễ bị hút cạn năng lượng bởi người khác hoặc mang cảm xúc của người khác về.',
    inWork: 'Xuất sắc trong các ngành liên quan đến con người — tư vấn, giáo dục, y tế, quản lý nhân sự.',
    inRelationship: 'Người bạn đời và bạn bè lý tưởng — luôn cảm thấy được hiểu. Cần học cách ranh giới.',
  },

  // ─────────────────────────────────────────────────────────
  // 4. VISIONARY — Tầm nhìn xa
  // ─────────────────────────────────────────────────────────
  {
    trait: 'visionary',
    label: 'Tầm nhìn và tư duy tương lai',
    description: 'Khả năng nhìn thấy khả năng và tiềm năng trong tương lai trước khi chúng trở thành hiện thực; tư duy về bức tranh lớn.',
    mbtiSignals: {
      strongTypes: ['INTJ', 'INFJ', 'ENFJ', 'ENTP'],
      moderateTypes: ['ENTJ', 'ENFP', 'INFP'],
      dimension: 'NS',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [11, 9, 3, 22],
      moderateNumbers: [1, 7],
      explanation: 'Số 11 là kênh dẫn tầm nhìn tâm linh; Số 22 biến tầm nhìn lớn thành hiện thực; Số 9 có tầm nhìn nhân văn rộng lớn; Số 3 sáng tạo và hướng về tương lai.',
    },
    elementSignals: {
      strongElements: ['Hỏa', 'Mộc'],
      moderateElements: ['Thủy'],
      batTuCan: ['Bính', 'Giáp', 'Nhâm'],
      explanation: 'Hỏa (Bính) tỏa sáng và soi đường phía trước — Mặt Trời nhìn thấy bức tranh toàn cảnh. Mộc vươn lên cao để thấy xa hơn.',
    },
    growthEdge: 'Có thể thiếu thực tế hoặc bỏ qua chi tiết quan trọng trong hiện tại.',
    inWork: 'Mạnh ở giai đoạn lên ý tưởng và strategy. Cần partner để implement chi tiết.',
    inRelationship: 'Inspire và dẫn dắt partner; nhưng cần học cách hiện diện với thực tại hiện tại.',
  },

  // ─────────────────────────────────────────────────────────
  // 5. SYSTEMATIC — Tư duy hệ thống
  // ─────────────────────────────────────────────────────────
  {
    trait: 'systematic',
    label: 'Tư duy hệ thống và trật tự',
    description: 'Xu hướng tạo ra cấu trúc, quy trình, và trật tự trong công việc và cuộc sống. Tìm thấy patterns và xây dựng hệ thống.',
    mbtiSignals: {
      strongTypes: ['ISTJ', 'ESTJ', 'INTJ', 'ENTJ'],
      moderateTypes: ['ISFJ', 'ESFJ', 'INTP'],
      dimension: 'JP',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [4, 8, 22],
      moderateNumbers: [1, 6],
      explanation: 'Số 4 là con số của xây dựng và hệ thống; Số 8 tổ chức nguồn lực; Số 22 xây dựng ở quy mô lớn với cấu trúc chặt chẽ.',
    },
    elementSignals: {
      strongElements: ['Thổ', 'Kim'],
      moderateElements: ['Mộc'],
      batTuCan: ['Mậu', 'Kỷ', 'Canh'],
      explanation: 'Thổ là nền tảng và cấu trúc — ổn định và có quy luật. Kim chính xác và có trật tự — không chấp nhận sự hỗn loạn.',
    },
    growthEdge: 'Có thể quá cứng nhắc khi cần linh hoạt hoặc cản trở sự sáng tạo.',
    inWork: 'Xuất sắc ở quản lý dự án, vận hành, tài chính, và bất kỳ vai trò cần tổ chức.',
    inRelationship: 'Mang lại sự ổn định và có thể dự đoán — nhưng cần học cách tự phát.',
  },

  // ─────────────────────────────────────────────────────────
  // 6. CREATIVE — Sáng tạo và biểu đạt
  // ─────────────────────────────────────────────────────────
  {
    trait: 'creative',
    label: 'Sáng tạo và biểu đạt độc đáo',
    description: 'Khả năng tạo ra ý tưởng mới, nhìn thấy connections không ai thấy, và biểu đạt bản thân qua các hình thức độc đáo.',
    mbtiSignals: {
      strongTypes: ['ENFP', 'INFP', 'ENTP', 'INTP'],
      moderateTypes: ['INFJ', 'ISFP', 'ESFP'],
      dimension: 'NS',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [3, 11, 6],
      moderateNumbers: [5, 9, 22],
      explanation: 'Số 3 là con số của sự biểu đạt sáng tạo; Số 11 có trực giác và cảm hứng sáng tạo đặc biệt; Số 6 có thẩm mỹ và tạo ra vẻ đẹp.',
    },
    elementSignals: {
      strongElements: ['Hỏa', 'Mộc'],
      moderateElements: ['Thủy'],
      batTuCan: ['Bính', 'Đinh', 'Giáp', 'Ất'],
      explanation: 'Hỏa (Đinh) là ngọn lửa sáng tạo — tỏa sáng từ nội tâm. Mộc sinh sôi và tạo ra điều mới — bản năng của sự tăng trưởng sáng tạo.',
    },
    growthEdge: 'Có thể thiếu kỷ luật để hoàn thành hoặc phân tán năng lượng vào quá nhiều hướng.',
    inWork: 'Cần tự do sáng tạo và môi trường cho phép thử nghiệm. Xuất sắc ở ideation và innovation.',
    inRelationship: 'Mang lại sự hứng thú và mới mẻ liên tục — nhưng cần cân bằng với sự ổn định.',
  },

  // ─────────────────────────────────────────────────────────
  // 7. RESILIENT — Kiên cường và phục hồi
  // ─────────────────────────────────────────────────────────
  {
    trait: 'resilient',
    label: 'Kiên cường và phục hồi mạnh',
    description: 'Khả năng vượt qua thất bại, khó khăn và áp lực mà không bị gục ngã về lâu dài. Trở nên mạnh hơn sau thử thách.',
    mbtiSignals: {
      strongTypes: ['ENTJ', 'ISTP', 'ESTJ', 'ESTP'],
      moderateTypes: ['INTJ', 'INFJ', 'ISTJ'],
      dimension: 'TF',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [8, 4, 1],
      moderateNumbers: [9, 22],
      explanation: 'Số 8 được tôi luyện qua thăng trầm — mỗi lần ngã là nguyên liệu xây lại. Số 4 kiên định không gãy dù chậm. Số 1 không chịu là người thứ hai dù bao lần thất bại.',
    },
    elementSignals: {
      strongElements: ['Kim', 'Thổ'],
      moderateElements: ['Mộc'],
      batTuCan: ['Canh', 'Mậu', 'Giáp'],
      explanation: 'Kim (Canh) được rèn luyện qua lửa để trở nên sắc bén hơn — thách thức là công cụ tôi luyện. Thổ (Mậu) là núi cao đứng vững qua mọi phong ba.',
    },
    growthEdge: 'Có thể trở nên cứng rắn quá mức và khó nhận sự giúp đỡ hoặc chia sẻ vulnerability.',
    inWork: 'Có thể dẫn dắt trong khủng hoảng và persist qua dự án dài hạn khi người khác bỏ cuộc.',
    inRelationship: 'Đáng tin cậy trong khó khăn — nhưng cần học cách mở lòng và nhận sự chăm sóc.',
  },

  // ─────────────────────────────────────────────────────────
  // 8. NURTURING — Nuôi dưỡng và chăm sóc
  // ─────────────────────────────────────────────────────────
  {
    trait: 'nurturing',
    label: 'Nuôi dưỡng và chăm sóc người khác',
    description: 'Bản năng tự nhiên chăm sóc, hỗ trợ, và giúp người khác phát triển. Tạo ra môi trường an toàn cho người xung quanh.',
    mbtiSignals: {
      strongTypes: ['ESFJ', 'ISFJ', 'ENFJ', 'INFJ'],
      moderateTypes: ['ENFP', 'INFP', 'ISTJ'],
      dimension: 'TF',
      dimensionSide: 'low',
    },
    numerologySignals: {
      strongNumbers: [6, 2, 9, 33],
      moderateNumbers: [3, 4],
      explanation: 'Số 6 là con số của nuôi dưỡng và gia đình — trái tim lớn nhất; Số 2 đồng hành và hỗ trợ; Số 33 Master Teacher — chữa lành và dạy dỗ.',
    },
    elementSignals: {
      strongElements: ['Thổ', 'Mộc'],
      moderateElements: ['Thủy'],
      batTuCan: ['Kỷ', 'Ất', 'Quý'],
      explanation: 'Thổ (Kỷ) như đất màu mỡ — nuôi dưỡng mọi sự sống. Mộc (Ất) che bóng mát và tạo điều kiện cho cây nhỏ phát triển bên dưới.',
    },
    growthEdge: 'Có thể bỏ quên bản thân hoặc kiểm soát núp bóng tình yêu thương.',
    inWork: 'Xuất sắc ở quản lý đội nhóm, giáo dục, y tế, và bất kỳ vai trò cần phát triển người khác.',
    inRelationship: 'Người bạn đời chu đáo nhất — nhưng cần partner biết trân trọng và đáp lại.',
  },

  // ─────────────────────────────────────────────────────────
  // 9. DECISIVE — Quyết đoán và dứt khoát
  // ─────────────────────────────────────────────────────────
  {
    trait: 'decisive',
    label: 'Quyết đoán và không do dự',
    description: 'Khả năng đưa ra quyết định nhanh chóng và dứt khoát, không bị tê liệt bởi quá nhiều lựa chọn.',
    mbtiSignals: {
      strongTypes: ['ENTJ', 'ESTJ', 'ESTP', 'INTJ'],
      moderateTypes: ['ISTJ', 'ENFJ', 'ISTP'],
      dimension: 'JP',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [1, 8, 4],
      moderateNumbers: [3, 22],
      explanation: 'Số 1 hành động trước — không chờ điều kiện hoàn hảo; Số 8 quyết đoán trong kinh doanh và quyền lực; Số 4 cam kết và không thay đổi sau khi đã quyết.',
    },
    elementSignals: {
      strongElements: ['Kim', 'Hỏa'],
      moderateElements: ['Thổ'],
      batTuCan: ['Canh', 'Bính', 'Mậu'],
      explanation: 'Kim (Canh) như kiếm sắc — cắt dứt khoát, không chần chừ. Hỏa (Bính) hành động theo bản năng và năng lượng ngay lập tức.',
    },
    growthEdge: 'Có thể quyết định quá nhanh mà thiếu thông tin, hoặc khó lắng nghe ý kiến ngược chiều.',
    inWork: 'Cần thiết trong vai trò lãnh đạo và quản lý khủng hoảng. Tạo ra momentum và tránh paralysis.',
    inRelationship: 'Dứt khoát và rõ ràng — nhưng cần học cách cho partner không gian trong quyết định chung.',
  },

  // ─────────────────────────────────────────────────────────
  // 10. ADAPTABLE — Linh hoạt và thích nghi
  // ─────────────────────────────────────────────────────────
  {
    trait: 'adaptable',
    label: 'Linh hoạt và thích nghi nhanh',
    description: 'Khả năng điều chỉnh và thích nghi với hoàn cảnh thay đổi một cách hiệu quả, không bị rigid bởi kế hoạch ban đầu.',
    mbtiSignals: {
      strongTypes: ['ENFP', 'ESTP', 'ENTP', 'ESFP'],
      moderateTypes: ['INFP', 'ISFP', 'INTP'],
      dimension: 'JP',
      dimensionSide: 'low',
    },
    numerologySignals: {
      strongNumbers: [5, 3, 9],
      moderateNumbers: [2, 11],
      explanation: 'Số 5 là con số của sự thay đổi và linh hoạt; Số 3 tìm thấy cơ hội trong mọi tình huống; Số 9 buông bỏ và thích nghi theo chu kỳ mới.',
    },
    elementSignals: {
      strongElements: ['Thủy', 'Mộc'],
      moderateElements: ['Hỏa'],
      batTuCan: ['Nhâm', 'Quý', 'Ất'],
      explanation: 'Thủy chảy quanh mọi chướng ngại vật — không chống cự mà tìm đường khác. Mộc (Ất) uốn lượn quanh trở ngại để tiến về phía ánh sáng.',
    },
    growthEdge: 'Có thể thiếu cam kết lâu dài hoặc bị coi là không đáng tin cậy.',
    inWork: 'Xuất sắc trong môi trường thay đổi nhanh, startup, hoặc vai trò cần giải quyết vấn đề sáng tạo.',
    inRelationship: 'Dễ chịu và không tạo ra rigid expectations — nhưng cần học cách build ổn định dài hạn.',
  },

  // ─────────────────────────────────────────────────────────
  // 11. INTUITIVE_LEADER — Lãnh đạo trực giác
  // ─────────────────────────────────────────────────────────
  {
    trait: 'intuitive_leader',
    label: 'Lãnh đạo và ảnh hưởng',
    description: 'Sức hút tự nhiên và khả năng ảnh hưởng người khác — không cần chức vụ để người ta đi theo.',
    mbtiSignals: {
      strongTypes: ['ENTJ', 'ENFJ', 'ESTJ', 'ESTP'],
      moderateTypes: ['ENTP', 'INFJ', 'ENFP'],
      dimension: 'EI',
      dimensionSide: 'low',
    },
    numerologySignals: {
      strongNumbers: [1, 8, 22, 33],
      moderateNumbers: [3, 9],
      explanation: 'Số 1 tiên phong và dẫn đầu bẩm sinh; Số 8 lãnh đạo qua quyền lực và tầm nhìn; Số 22 xây dựng cái gì đó lớn hơn bản thân.',
    },
    elementSignals: {
      strongElements: ['Hỏa', 'Kim'],
      moderateElements: ['Mộc'],
      batTuCan: ['Bính', 'Canh', 'Giáp'],
      explanation: 'Hỏa (Bính) là Mặt Trời — tự nhiên thu hút và tỏa sáng. Kim (Canh) lãnh đạo qua sự cứng rắn và rõ ràng. Mộc (Giáp) lãnh đạo bằng tầm nhìn và lý tưởng.',
    },
    growthEdge: 'Có thể trở nên áp đặt hoặc không lắng nghe khi quá tự tin vào phán đoán.',
    inWork: 'Bẩm sinh ở vai trò lãnh đạo. Cần challenge xứng tầm và quyền tự quyết.',
    inRelationship: 'Bảo vệ và dẫn dắt — cần partner đủ bản lĩnh để bình đẳng.',
  },

  // ─────────────────────────────────────────────────────────
  // 12. DEEP_THINKER — Chiều sâu nội tâm
  // ─────────────────────────────────────────────────────────
  {
    trait: 'deep_thinker',
    label: 'Chiều sâu nội tâm và triết học',
    description: 'Xu hướng suy nghĩ về những câu hỏi lớn của cuộc sống, tìm kiếm ý nghĩa sâu hơn trong mọi trải nghiệm.',
    mbtiSignals: {
      strongTypes: ['INFJ', 'INTP', 'INTJ', 'INFP'],
      moderateTypes: ['ENFJ', 'ENTP', 'ISFP'],
      dimension: 'EI',
      dimensionSide: 'high',
    },
    numerologySignals: {
      strongNumbers: [7, 9, 11],
      moderateNumbers: [4, 33],
      explanation: 'Số 7 là nhà tìm kiếm sự thật — không bao giờ hài lòng với câu trả lời bề mặt; Số 9 nhìn thấy bức tranh nhân văn lớn; Số 11 kết nối với tầng sâu của thực tại.',
    },
    elementSignals: {
      strongElements: ['Thủy', 'Thổ'],
      moderateElements: ['Kim'],
      batTuCan: ['Nhâm', 'Quý', 'Mậu'],
      explanation: 'Thủy sâu thẳm và chứa đựng chiều sâu vô hạn — như đại dương. Thổ (Mậu) núi cao nhìn xuống mọi thứ từ góc nhìn cao hơn.',
    },
    growthEdge: 'Có thể sống trong đầu quá nhiều và tách biệt với thực tế hoặc kết nối thông thường.',
    inWork: 'Xuất sắc trong nghiên cứu, triết học, tâm lý học, và bất kỳ công việc cần chiều sâu tư duy.',
    inRelationship: 'Cần kết nối ở tầng tâm hồn — không thể hài lòng với mối quan hệ bề mặt.',
  },

  // ─────────────────────────────────────────────────────────
  // 13. PRACTICAL_BUILDER — Xây dựng thực tế
  // ─────────────────────────────────────────────────────────
  {
    trait: 'practical_builder',
    label: 'Xây dựng và hiện thực hóa',
    description: 'Khả năng biến ý tưởng và kế hoạch thành kết quả cụ thể, có thể chạm vào và đo lường được.',
    mbtiSignals: {
      strongTypes: ['ISTJ', 'ESTJ', 'ISFJ', 'ESTP'],
      moderateTypes: ['ISTP', 'ESFJ', 'ENTJ'],
      dimension: 'NS',
      dimensionSide: 'low',
    },
    numerologySignals: {
      strongNumbers: [4, 8, 6, 22],
      moderateNumbers: [1, 2],
      explanation: 'Số 4 là con số của xây dựng bền vững; Số 8 tạo ra thành quả vật chất cụ thể; Số 22 Master Builder — xây dựng ở quy mô lớn nhất.',
    },
    elementSignals: {
      strongElements: ['Thổ', 'Kim'],
      moderateElements: ['Mộc'],
      batTuCan: ['Mậu', 'Kỷ', 'Canh', 'Tân'],
      explanation: 'Thổ là đất — mọi thứ được xây dựng từ đất và trở lại đất. Kim tạo ra sản phẩm hữu hình và bền vững từ nguyên liệu thô.',
    },
    growthEdge: 'Có thể thiếu tầm nhìn xa hoặc bỏ lỡ cơ hội vì quá tập trung vào hiện tại.',
    inWork: 'Xuất sắc ở execution, operations, và deliver kết quả. Không phải người của brainstorming mà là người biến brainstorm thành thực tế.',
    inRelationship: 'Thể hiện tình yêu qua hành động cụ thể — sửa nhà, lên kế hoạch, làm việc chăm chỉ.',
  },
]

// ─────────────────────────────────────────────────────────────
// CONVERGENCE ENGINE LOGIC
// ─────────────────────────────────────────────────────────────

export interface ConvergenceInput {
  mbtiType: string
  lifePath: number
  element: string       // Kim/Mộc/Thủy/Hỏa/Thổ (từ năm sinh hoặc Bát Tự)
  nhatChu?: string      // Thiên Can Nhật Chủ (optional, từ Bát Tự)
}

export interface ConvergenceOutput {
  coreTraits: string[]      // traits được ≥ 2/3 hệ thống confirm
  mbtiOnlyTraits: string[]  // traits chỉ MBTI có
  numOnlyTraits: string[]   // traits chỉ Numerology có
  elemOnlyTraits: string[]  // traits chỉ Element có
  growthZone: string[]      // traits cần phát triển (từ growth edges của core traits)
  convergenceScore: number  // 0-100: mức độ nhất quán giữa 3 hệ thống
}

/**
 * Tìm convergences từ profile đầu vào
 * Ngưỡng: trait cần ≥ 2 hệ thống confirm để là core trait
 */
export function findConvergences(input: ConvergenceInput): ConvergenceOutput {
  const { mbtiType, lifePath, element, nhatChu } = input
  const coreTraits: string[] = []
  const mbtiOnlyTraits: string[] = []
  const numOnlyTraits: string[] = []
  const elemOnlyTraits: string[] = []

  for (const traitDef of TRAIT_SIGNALS) {
    const { trait, mbtiSignals, numerologySignals, elementSignals } = traitDef

    // Check MBTI signal
    const mbtiStrong = mbtiSignals.strongTypes.includes(mbtiType)
    const mbtiModerate = mbtiSignals.moderateTypes.includes(mbtiType)
    const hasMbti = mbtiStrong || mbtiModerate

    // Check Numerology signal
    const numStrong = numerologySignals.strongNumbers.includes(lifePath)
    const numModerate = numerologySignals.moderateNumbers.includes(lifePath)
    const hasNum = numStrong || numModerate

    // Check Element signal
    const elemStrong = elementSignals.strongElements.includes(element)
    const elemModerate = elementSignals.moderateElements.includes(element)
    const hasElem = elemStrong || elemModerate

    // Bonus: Nhật Chủ (Bát Tự) confirms thêm nếu có
    const hasBatTu = nhatChu && elementSignals.batTuCan?.includes(nhatChu)

    // Đếm số hệ thống confirm
    const confirmCount = [hasMbti, hasNum, hasElem || hasBatTu].filter(Boolean).length

    if (confirmCount >= 2) {
      coreTraits.push(trait)
    } else if (hasMbti && !hasNum && !hasElem) {
      mbtiOnlyTraits.push(trait)
    } else if (!hasMbti && hasNum && !hasElem) {
      numOnlyTraits.push(trait)
    } else if (!hasMbti && !hasNum && (hasElem || hasBatTu)) {
      elemOnlyTraits.push(trait)
    }
  }

  // Growth zone: growth edges của 2-3 core traits đầu
  const growthZone = coreTraits
    .slice(0, 3)
    .map(t => {
      const def = TRAIT_SIGNALS.find(ts => ts.trait === t)
      return def?.growthEdge ?? ''
    })
    .filter(Boolean)

  // Convergence score: tỷ lệ traits được confirm ≥ 2 hệ thống
  const totalTraits = TRAIT_SIGNALS.length
  const convergenceScore = Math.round((coreTraits.length / totalTraits) * 100)

  return {
    coreTraits,
    mbtiOnlyTraits,
    numOnlyTraits,
    elemOnlyTraits,
    growthZone,
    convergenceScore,
  }
}

/**
 * Helper: lấy label tiếng Việt của trait
 */
export function getTraitLabel(trait: string): string {
  return TRAIT_SIGNALS.find(t => t.trait === trait)?.label ?? trait
}

/**
 * Helper: lấy full definition của trait
 */
export function getTraitDefinition(trait: string): TraitSignal | undefined {
  return TRAIT_SIGNALS.find(t => t.trait === trait)
}

// ─────────────────────────────────────────────────────────────
// ARCHETYPE SELECTION LOGIC (moved here for co-location)
// ─────────────────────────────────────────────────────────────

/**
 * Map core traits → archetype
 * Priority: đầu tiên check exact match, rồi partial match
 */
export const TRAIT_TO_ARCHETYPE: Record<string, string> = {
  // strategic_architect
  'analytical+independent': 'strategic_architect',
  'analytical+systematic': 'strategic_architect',
  'independent+systematic': 'strategic_architect',

  // empathetic_leader
  'empathetic+intuitive_leader': 'empathetic_leader',
  'empathetic+visionary': 'empathetic_leader',
  'nurturing+intuitive_leader': 'empathetic_leader',

  // creative_pioneer
  'creative+adaptable': 'creative_pioneer',
  'creative+visionary': 'creative_pioneer',
  'visionary+adaptable': 'creative_pioneer',

  // resilient_builder
  'resilient+practical_builder': 'resilient_builder',
  'resilient+systematic': 'resilient_builder',
  'practical_builder+decisive': 'resilient_builder',

  // healing_teacher
  'nurturing+deep_thinker': 'healing_teacher',
  'empathetic+deep_thinker': 'healing_teacher',
  'nurturing+empathetic': 'healing_teacher',

  // connector_catalyst
  'adaptable+intuitive_leader': 'connector_catalyst',
  'creative+intuitive_leader': 'connector_catalyst',
  'empathetic+adaptable': 'connector_catalyst',

  // deep_seeker
  'deep_thinker+independent': 'deep_seeker',
  'deep_thinker+analytical': 'deep_seeker',
  'independent+deep_thinker': 'deep_seeker',
}

/**
 * Chọn archetype từ core traits
 * Returns archetype key string
 */
export function selectArchetypeFromTraits(coreTraits: string[]): string {
  // Try pair matches first (most specific)
  for (let i = 0; i < coreTraits.length; i++) {
    for (let j = i + 1; j < coreTraits.length; j++) {
      const key1 = `${coreTraits[i]}+${coreTraits[j]}`
      const key2 = `${coreTraits[j]}+${coreTraits[i]}`
      if (TRAIT_TO_ARCHETYPE[key1]) return TRAIT_TO_ARCHETYPE[key1]
      if (TRAIT_TO_ARCHETYPE[key2]) return TRAIT_TO_ARCHETYPE[key2]
    }
  }

  // Fallback: single trait dominance
  const singleDefaults: Record<string, string> = {
    analytical: 'strategic_architect',
    independent: 'deep_seeker',
    empathetic: 'healing_teacher',
    visionary: 'creative_pioneer',
    systematic: 'resilient_builder',
    creative: 'creative_pioneer',
    resilient: 'resilient_builder',
    nurturing: 'healing_teacher',
    decisive: 'resilient_builder',
    adaptable: 'connector_catalyst',
    intuitive_leader: 'empathetic_leader',
    deep_thinker: 'deep_seeker',
    practical_builder: 'resilient_builder',
  }

  for (const trait of coreTraits) {
    if (singleDefaults[trait]) return singleDefaults[trait]
  }

  return 'strategic_architect' // default fallback
}

// ─────────────────────────────────────────────────────────────
// PERSONA COMPRESSED GENERATOR
// ─────────────────────────────────────────────────────────────

import { GROWTH_ZONE_BY_MBTI } from './archetype-engine'

interface PersonaParams {
  mbtiType: string
  identity: 'A' | 'T'        // Assertive / Turbulent
  lifePath: number
  element: string
  archetype: string
  coreTraits: string[]
  activeGoal?: string
}

/**
 * Sinh persona_compressed ~80 token cho Claude system prompt
 * Format: "[type]-[A/T]/[element]/ĐĐ[n]. Archetype: [label]. Core: [traits]. Đang tập: [goal]. [T-note]"
 */
export function generatePersonaCompressed(params: PersonaParams): string {
  const { mbtiType, identity, lifePath, element, archetype, coreTraits, activeGoal } = params

  // Lấy archetype label
  const archetypeLabels: Record<string, string> = {
    strategic_architect: 'Kiến trúc sư chiến lược',
    empathetic_leader: 'Lãnh đạo truyền cảm hứng',
    creative_pioneer: 'Người tiên phong sáng tạo',
    resilient_builder: 'Người xây dựng kiên cường',
    healing_teacher: 'Người thầy chữa lành',
    connector_catalyst: 'Chất xúc tác kết nối',
    deep_seeker: 'Người tìm kiếm chiều sâu',
  }

  const traitLabels = coreTraits.slice(0, 3).map(t => {
    const shortLabels: Record<string, string> = {
      analytical: 'phân tích',
      independent: 'độc lập',
      empathetic: 'đồng cảm',
      visionary: 'tầm nhìn',
      systematic: 'hệ thống',
      creative: 'sáng tạo',
      resilient: 'kiên cường',
      nurturing: 'nuôi dưỡng',
      decisive: 'quyết đoán',
      adaptable: 'linh hoạt',
      intuitive_leader: 'lãnh đạo',
      deep_thinker: 'chiều sâu',
      practical_builder: 'xây dựng',
    }
    return shortLabels[t] ?? t
  })

  const turbulentNote = identity === 'T' ? ' Turbulent: cần reassurance.' : ''
  const growth =
    activeGoal ?? GROWTH_ZONE_BY_MBTI[mbtiType]?.[0] ?? GROWTH_ZONE_BY_MBTI[mbtiType.slice(0, 4)]?.[0]
  const goalNote = growth ? ` Đang tập: ${growth}.` : ''

  return `${mbtiType}-${identity}/${element}/ĐĐ${lifePath}. Archetype: ${archetypeLabels[archetype] ?? archetype}. Core: ${traitLabels.join(', ')}.${goalNote}${turbulentNote}`.trim()
}
