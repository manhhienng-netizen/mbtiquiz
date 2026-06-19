/**
 * ARCHETYPE ENGINE DATA + CONVERGENCE TRAITS MAP
 * packages/data/src/archetype-engine-data.ts
 *
 * 1. TRAIT_SIGNALS — mapping trait → MBTI/Numerology/Element signals
 * 2. ARCHETYPE_DATA — 7 Archetype với full profile
 * 3. TYPE_TO_ARCHETYPE — lookup nhanh theo MBTI type
 * 4. PERSONA_TEMPLATES — template sinh persona_compressed
 */

// ============================================================
// PHẦN 1 — TRAIT SIGNALS
// Map mỗi "core trait" → điều kiện để được xác nhận từ mỗi hệ thống
// Engine dùng để findConvergences()
// ============================================================

export interface TraitSignal {
  traitId: string
  traitLabel: string
  traitLabelVi: string
  mbtiSignals: string[]         // MBTI conditions (type letters)
  numerologySignals: number[]   // Life Path numbers
  elementSignals: string[]      // Ngũ Hành elements
  nhatChuSignals?: string[]     // Nhật Chủ Bát Tự (optional, deeper)
}

export const TRAIT_SIGNALS: TraitSignal[] = [
  // ── Analytical / Tư duy phân tích ──────────────────────
  {
    traitId: 'analytical',
    traitLabel: 'Analytical',
    traitLabelVi: 'Tư duy phân tích sâu',
    mbtiSignals: ['T', 'N'],           // Thinking + Intuitive → NT types
    numerologySignals: [4, 7, 8],      // Life Path 4 (kỹ lưỡng), 7 (sâu sắc), 8 (chiến lược)
    elementSignals: ['Kim', 'Thủy'],   // Kim = chính xác, Thủy = chiều sâu
    nhatChuSignals: ['Canh', 'Tân', 'Nhâm', 'Quý'],
  },

  // ── Independent / Độc lập ──────────────────────────────
  {
    traitId: 'independent',
    traitLabel: 'Independent',
    traitLabelVi: 'Tư duy độc lập',
    mbtiSignals: ['I', 'T'],           // Introvert + Thinking
    numerologySignals: [1, 7, 8],      // 1 = tiên phong, 7 = cô độc suy nghĩ, 8 = tự lực
    elementSignals: ['Kim', 'Mộc'],    // Kim = cứng rắn, Giáp Mộc = vươn thẳng
    nhatChuSignals: ['Giáp', 'Canh', 'Nhâm'],
  },

  // ── Empathetic / Đồng cảm ──────────────────────────────
  {
    traitId: 'empathetic',
    traitLabel: 'Empathetic',
    traitLabelVi: 'Đồng cảm sâu sắc',
    mbtiSignals: ['F'],                // Feeling types
    numerologySignals: [2, 6, 9],      // 2 = kết nối, 6 = chăm sóc, 9 = nhân loại
    elementSignals: ['Thủy', 'Mộc'],  // Thủy = nhạy cảm, Mộc Âm = nuôi dưỡng
    nhatChuSignals: ['Ất', 'Đinh', 'Kỷ', 'Quý'],
  },

  // ── Visionary / Tầm nhìn ───────────────────────────────
  {
    traitId: 'visionary',
    traitLabel: 'Visionary',
    traitLabelVi: 'Tầm nhìn xa rộng',
    mbtiSignals: ['N'],                // Intuitive types
    numerologySignals: [11, 22, 9],    // Master Numbers + 9
    elementSignals: ['Hỏa', 'Mộc'],   // Hỏa = tỏa sáng, Mộc = vươn cao
    nhatChuSignals: ['Giáp', 'Bính', 'Nhâm'],
  },

  // ── Strategic / Chiến lược ─────────────────────────────
  {
    traitId: 'strategic',
    traitLabel: 'Strategic',
    traitLabelVi: 'Tư duy chiến lược',
    mbtiSignals: ['N', 'T', 'J'],      // NTJ types
    numerologySignals: [8, 4, 1],      // 8 = quyền lực, 4 = xây dựng, 1 = tiên phong
    elementSignals: ['Kim', 'Thổ'],   // Kim = quyết đoán, Thổ = bền vững
    nhatChuSignals: ['Canh', 'Mậu', 'Giáp'],
  },

  // ── Creative / Sáng tạo ────────────────────────────────
  {
    traitId: 'creative',
    traitLabel: 'Creative',
    traitLabelVi: 'Sáng tạo đột phá',
    mbtiSignals: ['N', 'P'],           // NP types
    numerologySignals: [3, 11, 5],     // 3 = biểu đạt, 11 = trực giác cao, 5 = phiêu lưu
    elementSignals: ['Hỏa', 'Mộc'],   // Hỏa = tỏa sáng, Mộc = tăng trưởng
    nhatChuSignals: ['Bính', 'Đinh', 'Ất'],
  },

  // ── Resilient / Kiên cường ─────────────────────────────
  {
    traitId: 'resilient',
    traitLabel: 'Resilient',
    traitLabelVi: 'Kiên cường vượt khó',
    mbtiSignals: ['S', 'J'],           // Sentinel types
    numerologySignals: [4, 8, 22],     // 4 = nền tảng, 8 = vượt thăng trầm, 22 = master builder
    elementSignals: ['Thổ', 'Kim'],   // Thổ = bền vững, Kim = cứng rắn
    nhatChuSignals: ['Mậu', 'Canh', 'Tân'],
  },

  // ── Compassionate / Từ bi ──────────────────────────────
  {
    traitId: 'compassionate',
    traitLabel: 'Compassionate',
    traitLabelVi: 'Lòng từ bi rộng lớn',
    mbtiSignals: ['F', 'E'],           // Extravert Feeling
    numerologySignals: [6, 9, 33],     // 6 = nuôi dưỡng, 9 = nhân loại, 33 = master healer
    elementSignals: ['Thủy', 'Mộc'],  // Thủy = nuôi dưỡng, Mộc = chở che
    nhatChuSignals: ['Kỷ', 'Ất', 'Quý'],
  },

  // ── Disciplined / Kỷ luật ──────────────────────────────
  {
    traitId: 'disciplined',
    traitLabel: 'Disciplined',
    traitLabelVi: 'Kỷ luật và kiên định',
    mbtiSignals: ['J'],                // Judging types
    numerologySignals: [4, 8, 1],      // 4 = nền tảng, 8 = ý chí, 1 = tiên phong
    elementSignals: ['Kim', 'Thổ'],   // Kim = cứng rắn, Thổ = ổn định
    nhatChuSignals: ['Canh', 'Mậu', 'Giáp'],
  },

  // ── Intuitive / Trực giác ──────────────────────────────
  {
    traitId: 'intuitive_deep',
    traitLabel: 'Deeply Intuitive',
    traitLabelVi: 'Trực giác phi thường',
    mbtiSignals: ['N', 'F'],           // NF types
    numerologySignals: [11, 7, 2],     // 11 = linh cảm, 7 = chiều sâu, 2 = nhạy cảm
    elementSignals: ['Thủy'],          // Thủy = chiều sâu và cảm nhận
    nhatChuSignals: ['Nhâm', 'Quý', 'Đinh'],
  },

  // ── Communicative / Giao tiếp ──────────────────────────
  {
    traitId: 'communicative',
    traitLabel: 'Communicative',
    traitLabelVi: 'Giao tiếp xuất sắc',
    mbtiSignals: ['E', 'F'],           // Extravert Feeling
    numerologySignals: [3, 5, 9],      // 3 = biểu đạt, 5 = kết nối, 9 = nhân văn
    elementSignals: ['Hỏa', 'Mộc'],   // Hỏa = tỏa sáng, Mộc = phát triển
    nhatChuSignals: ['Bính', 'Ất', 'Đinh'],
  },

  // ── Builder / Xây dựng ─────────────────────────────────
  {
    traitId: 'builder',
    traitLabel: 'Builder',
    traitLabelVi: 'Xây dựng bền vững',
    mbtiSignals: ['S', 'T', 'J'],      // STJ types
    numerologySignals: [4, 22, 8],     // 4 = nền tảng, 22 = master builder, 8 = empire
    elementSignals: ['Thổ', 'Kim'],   // Thổ = nền tảng, Kim = cấu trúc
    nhatChuSignals: ['Mậu', 'Kỷ', 'Canh'],
  },

  // ── Adventurous / Phiêu lưu ────────────────────────────
  {
    traitId: 'adventurous',
    traitLabel: 'Adventurous',
    traitLabelVi: 'Tinh thần khám phá',
    mbtiSignals: ['N', 'P', 'E'],      // ENP types
    numerologySignals: [5, 3, 1],      // 5 = tự do, 3 = sáng tạo, 1 = tiên phong
    elementSignals: ['Hỏa', 'Mộc'],   // Hỏa = năng lượng, Mộc = vươn tới
    nhatChuSignals: ['Bính', 'Giáp', 'Nhâm'],
  },

  // ── Nurturing / Nuôi dưỡng ─────────────────────────────
  {
    traitId: 'nurturing',
    traitLabel: 'Nurturing',
    traitLabelVi: 'Nuôi dưỡng và chăm sóc',
    mbtiSignals: ['S', 'F', 'J'],      // SFJ types
    numerologySignals: [6, 2, 33],     // 6 = chăm sóc, 2 = hỗ trợ, 33 = healer
    elementSignals: ['Thổ', 'Thủy'],  // Thổ = đất màu, Thủy = nuôi dưỡng
    nhatChuSignals: ['Kỷ', 'Quý', 'Ất'],
  },
]

// Helper: tính core traits từ profile
export interface UserProfile {
  mbtiType: string         // "INTJ", "ENFP"...
  identity: 'A' | 'T'
  lifePath: number
  element: string          // "Kim", "Mộc"...
  nhatChu?: string         // "Canh", "Ất"... (optional)
}

export function findCoreTraits(profile: UserProfile): {
  coreTraits: string[]
  uniqueFromMBTI: string[]
  uniqueFromNumerology: string[]
  uniqueFromElement: string[]
} {
  const coreTraits: string[] = []
  const uniqueFromMBTI: string[] = []
  const uniqueFromNumerology: string[] = []
  const uniqueFromElement: string[] = []

  for (const signal of TRAIT_SIGNALS) {
    const mbtiMatch = signal.mbtiSignals.some(s => profile.mbtiType.includes(s))
    const numMatch = signal.numerologySignals.includes(profile.lifePath)
    const elemMatch = signal.elementSignals.includes(profile.element)
    const nhatChuMatch = profile.nhatChu
      ? (signal.nhatChuSignals || []).includes(profile.nhatChu)
      : false

    const confirmed = [mbtiMatch, numMatch, elemMatch || nhatChuMatch].filter(Boolean).length

    if (confirmed >= 2) {
      coreTraits.push(signal.traitId)
    } else {
      if (mbtiMatch) uniqueFromMBTI.push(signal.traitId)
      if (numMatch) uniqueFromNumerology.push(signal.traitId)
      if (elemMatch || nhatChuMatch) uniqueFromElement.push(signal.traitId)
    }
  }

  return { coreTraits, uniqueFromMBTI, uniqueFromNumerology, uniqueFromElement }
}

// ============================================================
// PHẦN 2 — 7 ARCHETYPE DATA
// ============================================================

export interface ArchetypeData {
  id: string
  label: string                   // "Kiến trúc sư chiến lược"
  labelEn: string
  tagline: string                 // "Tư duy hệ thống + Ý chí độc lập"
  emoji: string
  description: string             // 2-3 câu
  requiredTraits: string[]        // Phải có ≥ 2 trong số này
  primaryMBTITypes: string[]      // MBTI types thường nhất
  primaryLifePaths: number[]      // Life Path thường nhất
  primaryElements: string[]       // Ngũ Hành thường nhất
  growsAt: string[]               // Lĩnh vực phát triển
  strengthSummary: string         // 1 câu điểm mạnh tổng hợp
  growthEdge: string              // 1 câu điểm cần phát triển
  famousExamples: Array<{
    name: string
    context: string
    disclaimerNeeded: boolean
  }>
  colorHex: string               // Màu đặc trưng cho UI
  iconType: string               // Icon category
}

export const ARCHETYPE_DATA: Record<string, ArchetypeData> = {

  strategic_architect: {
    id: 'strategic_architect',
    label: 'Kiến trúc sư chiến lược',
    labelEn: 'Strategic Architect',
    tagline: 'Tư duy hệ thống · Ý chí độc lập',
    emoji: '🏛️',
    description: 'Những người định hình lại hệ thống và ngành công nghiệp từ bên trong. Họ không chỉ giải quyết vấn đề — họ tái cấu trúc cách vấn đề được nhìn nhận. Sức mạnh nằm ở khả năng nhìn thấy cấu trúc ẩn mà người khác bỏ qua và ý chí kiên trì thực thi tầm nhìn đó.',
    requiredTraits: ['analytical', 'independent', 'strategic'],
    primaryMBTITypes: ['INTJ', 'ENTJ', 'INTP', 'ENTP'],
    primaryLifePaths: [1, 7, 8, 22],
    primaryElements: ['Kim', 'Thổ'],
    growsAt: ['Công nghệ & Kỹ thuật', 'Tài chính & Đầu tư', 'Chiến lược', 'Nghiên cứu & Khoa học', 'Lãnh đạo tổ chức'],
    strengthSummary: 'Biến tầm nhìn phức tạp thành kế hoạch thực thi được.',
    growthEdge: 'Kết nối cảm xúc và truyền tầm nhìn đến người khác.',
    famousExamples: [
      { name: 'Elon Musk', context: 'Kiến trúc hệ thống công nghiệp mới', disclaimerNeeded: true },
      { name: 'Marie Curie', context: 'Xây dựng nền tảng khoa học hạt nhân', disclaimerNeeded: true },
      { name: 'Sun Tzu', context: 'Chiến lược tư duy vượt thời đại', disclaimerNeeded: true },
    ],
    colorHex: '#2C3E50',
    iconType: 'architecture',
  },

  empathetic_leader: {
    id: 'empathetic_leader',
    label: 'Lãnh đạo truyền cảm hứng',
    labelEn: 'Empathetic Leader',
    tagline: 'Đồng cảm sâu · Tầm nhìn nhân văn',
    emoji: '🌟',
    description: 'Những người kéo cả tập thể đi cùng bằng niềm tin và cảm hứng, không bằng quyền lực. Họ nhìn thấy tiềm năng trong từng người và biết cách khai phá nó. Sức ảnh hưởng của họ lan rộng vì mọi người cảm thấy được hiểu và được trân trọng.',
    requiredTraits: ['empathetic', 'communicative', 'visionary'],
    primaryMBTITypes: ['ENFJ', 'INFJ', 'ENFP', 'INFP'],
    primaryLifePaths: [2, 6, 9, 11],
    primaryElements: ['Hỏa', 'Mộc'],
    growsAt: ['Giáo dục & Đào tạo', 'Tư vấn & Coaching', 'Xã hội & NGO', 'Nghệ thuật nhân văn', 'Lãnh đạo cộng đồng'],
    strengthSummary: 'Truyền cảm hứng và khai phá tiềm năng ẩn trong người khác.',
    growthEdge: 'Đặt ranh giới và chăm sóc bản thân trước khi kiệt sức.',
    famousExamples: [
      { name: 'Oprah Winfrey', context: 'Xây dựng đế chế truyền thông từ đồng cảm', disclaimerNeeded: true },
      { name: 'Nelson Mandela', context: 'Lãnh đạo qua tha thứ và đoàn kết', disclaimerNeeded: true },
      { name: 'Mother Teresa', context: 'Phụng sự bằng tình yêu vô điều kiện', disclaimerNeeded: true },
    ],
    colorHex: '#E74C3C',
    iconType: 'heart_star',
  },

  creative_pioneer: {
    id: 'creative_pioneer',
    label: 'Tiên phong sáng tạo',
    labelEn: 'Creative Pioneer',
    tagline: 'Sáng tạo đột phá · Tinh thần khám phá',
    emoji: '🎨',
    description: 'Những người phá vỡ khuôn mẫu và mở ra hướng đi mới mà người khác chưa nghĩ đến. Họ không làm việc trong hệ thống hiện có — họ xây dựng hệ thống mới. Sức mạnh nằm ở khả năng nhìn thấy điều chưa tồn tại và dũng cảm biến nó thành hiện thực.',
    requiredTraits: ['creative', 'visionary', 'adventurous'],
    primaryMBTITypes: ['ENFP', 'ENTP', 'INFP', 'INTP'],
    primaryLifePaths: [3, 5, 11, 22],
    primaryElements: ['Hỏa', 'Mộc'],
    growsAt: ['Nghệ thuật & Thiết kế', 'Khởi nghiệp & Đổi mới', 'Truyền thông sáng tạo', 'Nghiên cứu & Phát triển', 'Văn hóa & Giải trí'],
    strengthSummary: 'Nhìn thấy điều chưa tồn tại và có dũng khí biến nó thành thật.',
    growthEdge: 'Kỷ luật hoàn thành những gì đã bắt đầu.',
    famousExamples: [
      { name: 'Steve Jobs', context: 'Kết hợp nghệ thuật và công nghệ', disclaimerNeeded: true },
      { name: 'Leonardo da Vinci', context: 'Tiên phong trên nhiều lĩnh vực', disclaimerNeeded: true },
      { name: 'Pablo Picasso', context: 'Phá vỡ quy tắc nghệ thuật', disclaimerNeeded: true },
    ],
    colorHex: '#F39C12',
    iconType: 'palette',
  },

  resilient_builder: {
    id: 'resilient_builder',
    label: 'Người xây dựng kiên cường',
    labelEn: 'Resilient Builder',
    tagline: 'Kiên cường vượt khó · Xây dựng bền vững',
    emoji: '🏗️',
    description: 'Những người biến thử thách thành nền tảng và xây dựng những thứ tồn tại qua thời gian. Họ không nổi bật trong ngày nắng — họ tỏa sáng trong bão. Sức mạnh nằm ở khả năng tiếp tục xây dựng khi người khác đã bỏ cuộc.',
    requiredTraits: ['resilient', 'disciplined', 'builder'],
    primaryMBTITypes: ['ISTJ', 'ESTJ', 'ISFJ', 'ISTP'],
    primaryLifePaths: [4, 8, 22],
    primaryElements: ['Thổ', 'Kim'],
    growsAt: ['Kỹ thuật & Xây dựng', 'Tài chính & Ngân hàng', 'Quản lý dự án', 'Bất động sản', 'Y tế & Hành chính'],
    strengthSummary: 'Xây dựng những thứ bền vững mà người khác dựa vào.',
    growthEdge: 'Mở lòng với sự thay đổi và linh hoạt khi cần.',
    famousExamples: [
      { name: 'Warren Buffett', context: 'Xây dựng đế chế đầu tư qua kiên nhẫn', disclaimerNeeded: true },
      { name: 'Angela Merkel', context: 'Lãnh đạo ổn định qua nhiều khủng hoảng', disclaimerNeeded: true },
      { name: 'Sam Walton', context: 'Xây dựng từ cửa hàng nhỏ thành đế chế', disclaimerNeeded: true },
    ],
    colorHex: '#27AE60',
    iconType: 'foundation',
  },

  healing_teacher: {
    id: 'healing_teacher',
    label: 'Người thầy chữa lành',
    labelEn: 'Healing Teacher',
    tagline: 'Lòng từ bi · Trí tuệ nuôi dưỡng',
    emoji: '💚',
    description: 'Những người mang đến sự chữa lành và khôn ngoan cho những ai họ tiếp xúc. Họ không chỉ dạy kiến thức — họ dạy cách sống. Sức mạnh nằm ở khả năng nhìn thấy nỗi đau ẩn và tạo ra không gian an toàn để người khác phát triển.',
    requiredTraits: ['compassionate', 'nurturing', 'empathetic'],
    primaryMBTITypes: ['INFJ', 'ISFJ', 'ESFJ', 'INFP'],
    primaryLifePaths: [6, 9, 33, 2],
    primaryElements: ['Thủy', 'Mộc'],
    growsAt: ['Y tế & Chữa lành', 'Tâm lý & Tư vấn', 'Giáo dục đặc biệt', 'Tâm linh & Thiền định', 'Xã hội & Từ thiện'],
    strengthSummary: 'Chữa lành và nuôi dưỡng tiềm năng trong mỗi người.',
    growthEdge: 'Đặt ranh giới và nhận sự chăm sóc trở lại.',
    famousExamples: [
      { name: 'Dalai Lama', context: 'Dạy từ bi và trí tuệ toàn cầu', disclaimerNeeded: true },
      { name: 'Fred Rogers', context: 'Nuôi dưỡng tâm hồn trẻ em', disclaimerNeeded: true },
      { name: 'Thích Nhất Hạnh', context: 'Mang thiền chánh niệm đến thế giới', disclaimerNeeded: true },
    ],
    colorHex: '#1ABC9C',
    iconType: 'leaf_heart',
  },

  connector_catalyst: {
    id: 'connector_catalyst',
    label: 'Cầu nối và chất xúc tác',
    labelEn: 'Connector & Catalyst',
    tagline: 'Giao tiếp xuất sắc · Kết nối thế giới',
    emoji: '🔗',
    description: 'Những người tạo ra phép màu từ việc kết nối những thứ và người tưởng chừng không liên quan. Họ thấy mạng lưới ở nơi người khác thấy hỗn loạn. Sức mạnh nằm ở khả năng truyền đạt, kết nối và làm cho cộng đồng trở nên mạnh hơn.',
    requiredTraits: ['communicative', 'adventurous', 'empathetic'],
    primaryMBTITypes: ['ENFP', 'ESFP', 'ESTP', 'ENTP'],
    primaryLifePaths: [3, 5, 6],
    primaryElements: ['Hỏa', 'Mộc'],
    growsAt: ['Truyền thông & Marketing', 'Sales & Phát triển kinh doanh', 'Sự kiện & Cộng đồng', 'Ngoại giao', 'Khởi nghiệp xã hội'],
    strengthSummary: 'Kết nối những điểm rời rạc để tạo ra điều lớn hơn.',
    growthEdge: 'Đào sâu và cam kết lâu dài thay vì chỉ kết nối bề mặt.',
    famousExamples: [
      { name: 'Richard Branson', context: 'Xây dựng đế chế từ kết nối con người', disclaimerNeeded: true },
      { name: 'Oprah Winfrey', context: 'Cầu nối câu chuyện con người', disclaimerNeeded: true },
      { name: 'Tony Robbins', context: 'Kết nối người với tiềm năng của họ', disclaimerNeeded: true },
    ],
    colorHex: '#E67E22',
    iconType: 'network',
  },

  deep_seeker: {
    id: 'deep_seeker',
    label: 'Nhà tìm kiếm chiều sâu',
    labelEn: 'Deep Seeker',
    tagline: 'Trực giác phi thường · Trí tuệ ẩn sâu',
    emoji: '🔮',
    description: 'Những người sống ở ranh giới giữa điều đã biết và điều chưa khám phá. Họ không hài lòng với câu trả lời bề mặt và luôn đào sâu hơn. Sức mạnh nằm ở trực giác sắc bén và khả năng nhìn thấy sự thật mà người khác né tránh.',
    requiredTraits: ['intuitive_deep', 'analytical', 'independent'],
    primaryMBTITypes: ['INTJ', 'INFJ', 'INTP', 'INFP'],
    primaryLifePaths: [7, 11, 9],
    primaryElements: ['Thủy', 'Kim'],
    growsAt: ['Nghiên cứu & Triết học', 'Tâm lý học chiều sâu', 'Khoa học tiên phong', 'Nghệ thuật chiều sâu', 'Tâm linh & Thiền định'],
    strengthSummary: 'Nhìn thấu sự thật ẩn mà người khác không tiếp cận được.',
    growthEdge: 'Chia sẻ trí tuệ với thế giới thay vì giữ trong nội tâm.',
    famousExamples: [
      { name: 'Carl Jung', context: 'Khám phá chiều sâu tâm lý con người', disclaimerNeeded: true },
      { name: 'Albert Einstein', context: 'Nhìn thấy cấu trúc vũ trụ ẩn', disclaimerNeeded: true },
      { name: 'Fyodor Dostoevsky', context: 'Khám phá chiều sâu tâm hồn qua văn học', disclaimerNeeded: true },
    ],
    colorHex: '#8E44AD',
    iconType: 'crystal_ball',
  },
}

// ============================================================
// PHẦN 3 — TYPE TO ARCHETYPE (lookup nhanh)
// Không cố định — dùng làm gợi ý, engine vẫn tính đúng từ traits
// ============================================================

export const TYPE_TO_ARCHETYPE_HINT: Record<string, string[]> = {
  'INTJ': ['strategic_architect', 'deep_seeker'],
  'INTP': ['strategic_architect', 'deep_seeker', 'creative_pioneer'],
  'ENTJ': ['strategic_architect', 'empathetic_leader'],
  'ENTP': ['creative_pioneer', 'connector_catalyst', 'strategic_architect'],
  'INFJ': ['empathetic_leader', 'deep_seeker', 'healing_teacher'],
  'INFP': ['empathetic_leader', 'creative_pioneer', 'healing_teacher'],
  'ENFJ': ['empathetic_leader', 'healing_teacher', 'connector_catalyst'],
  'ENFP': ['creative_pioneer', 'connector_catalyst', 'empathetic_leader'],
  'ISTJ': ['resilient_builder', 'strategic_architect'],
  'ISFJ': ['healing_teacher', 'resilient_builder', 'nurturing'],
  'ESTJ': ['resilient_builder', 'strategic_architect'],
  'ESFJ': ['healing_teacher', 'connector_catalyst'],
  'ISTP': ['resilient_builder', 'deep_seeker'],
  'ISFP': ['creative_pioneer', 'healing_teacher'],
  'ESTP': ['connector_catalyst', 'creative_pioneer'],
  'ESFP': ['connector_catalyst', 'creative_pioneer'],
}

// Function chọn archetype từ core traits
export function selectArchetype(coreTraits: string[], mbtiType: string): string {
  let bestMatch = ''
  let bestScore = 0

  for (const [id, arch] of Object.entries(ARCHETYPE_DATA)) {
    const score = arch.requiredTraits.filter(t => coreTraits.includes(t)).length
    if (score > bestScore) {
      bestScore = score
      bestMatch = id
    }
  }

  // Fallback: dùng hint nếu không có core traits đủ
  if (bestScore < 1) {
    const hints = TYPE_TO_ARCHETYPE_HINT[mbtiType] || ['strategic_architect']
    return hints[0]
  }

  return bestMatch || 'strategic_architect'
}

// ============================================================
// PHẦN 4 — PERSONA TEMPLATES
// Sinh persona_compressed ~60-80 token
// ============================================================

export function generatePersonaCompressed(params: {
  mbtiType: string
  identity: 'A' | 'T'
  element: string
  lifePath: number
  archetype: string
  coreTraits: string[]
  growthFocus: string      // từ GROWTH_AREAS[type].growthFocus
  avoidTrap: string        // từ GROWTH_AREAS[type].avoidTrap
}): string {
  const archetypeLabel = ARCHETYPE_DATA[params.archetype]?.label || params.archetype
  const coreTraitLabels = params.coreTraits
    .slice(0, 3)
    .map(id => TRAIT_SIGNALS.find(t => t.traitId === id)?.traitLabelVi || id)
    .join(', ')

  const turbulentNote = params.identity === 'T' ? ' Turbulent: giảm tự phán xét.' : ''

  return `${params.mbtiType}-${params.identity}/${params.element}/ĐĐ${params.lifePath}. Archetype: ${archetypeLabel}. Core: ${coreTraitLabels}. Đang tập: ${params.growthFocus}. Tránh: ${params.avoidTrap}.${turbulentNote}`.trim()
}

// Ví dụ output:
// "INTJ-T/Kim/ĐĐ7. Archetype: Kiến trúc sư chiến lược. Core: Tư duy phân tích sâu, Tư duy độc lập, Tư duy chiến lược. Đang tập: Trí tuệ cảm xúc. Tránh: Áp tiêu chuẩn lên người khác. Turbulent: giảm tự phán xét."
// → ~85 tokens ✓

// ============================================================
// PHẦN 5 — GROWTH ZONE
// Điểm tất cả hệ thống cùng cảnh báo
// ============================================================

export const GROWTH_ZONE_BY_MBTI: Record<string, string[]> = {
  'INTJ': ['Kết nối cảm xúc với người khác', 'Linh hoạt khi kế hoạch thay đổi'],
  'INTP': ['Xây dựng sự gắn kết cộng đồng', 'Hoàn thành việc đã bắt đầu'],
  'ENTJ': ['Đồng cảm chủ động', 'Kiên nhẫn với tốc độ của người khác'],
  'ENTP': ['Cam kết dài hạn', 'Kỷ luật hoàn thành'],
  'INFJ': ['Assertiveness — sống đúng với bản thân', 'Đặt ranh giới lành mạnh'],
  'INFP': ['Tự tin và hành động không cần hoàn hảo', 'Assertiveness trong công việc'],
  'ENFJ': ['Chăm sóc bản thân', 'Nói không khi cần'],
  'ENFP': ['Kỷ luật tự giác', 'Cam kết với ưu tiên đã chọn'],
  'ISTJ': ['Từ bi và tha thứ', 'Linh hoạt với cách làm việc mới'],
  'ISFJ': ['Nhận sự giúp đỡ mà không cảm thấy mắc nợ', 'Spontaneity lành mạnh'],
  'ESTJ': ['Ngôn ngữ cảm xúc và trân trọng hành trình', 'Kết nối với đồng nghiệp'],
  'ESFJ': ['Tò mò với quan điểm mới', 'Không kiểm soát người khác qua "quan tâm"'],
  'ISTP': ['Kỹ năng kết nối như một kỹ năng học được', 'Mục tiêu dài hạn'],
  'ISFP': ['Tìm mục đích và passion rõ ràng', 'Chia sẻ lý do đằng sau hành động'],
  'ESTP': ['Tư duy chiến lược dài hạn', 'Empathy sâu hơn với đồng nghiệp'],
  'ESFP': ['Chăm sóc tương lai thực tế', 'Hoàn thành chi tiết quan trọng'],
}
