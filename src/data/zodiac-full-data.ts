/**
 * zodiac-full-data.ts
 * Cung Hoàng Đạo — Western/Tropical Zodiac
 *
 * Nguồn tham khảo:
 *   - astrology.com/zodiac-signs + astrology.com/compatibility
 *   - cafeastrology.com/articles/zodiacsigns + cafeastrology.com/compatibility
 *   - astrostyle.com/astrology/zodiac-signs
 *   - horoscope.com/zodiac-signs
 *   - lichngaytot.com (adapt ngôn ngữ tiếng Việt)
 *   - typematchapp.com + personality-database.com (MBTI × Zodiac survey data)
 *
 * Scope: Tropical Zodiac từ ngày/tháng sinh dương lịch
 * Không bao gồm: Rising sign, Moon sign, Sidereal/Vedic
 */

/**
 * zodiac-full-data.ts
 * Cung Hoàng Đạo — Western/Tropical Zodiac
 *
 * Nguồn tham khảo:
 *   - astrology.com/zodiac-signs
 *   - cafeastrology.com/articles/zodiacsigns
 *   - astrostyle.com/astrology/zodiac-signs
 *   - horoscope.com/zodiac-signs
 *   - lichngaytot.com (adapt ngôn ngữ tiếng Việt)
 *
 * Scope: Tropical Zodiac từ ngày/tháng sinh dương lịch
 * Không bao gồm: Rising sign, Moon sign, Sidereal/Vedic
 */

// ============================================================
// PHẦN 1 — ENGINE TÍNH CUNG
// ============================================================

export interface ZodiacSignMeta {
  key: string
  name: string
  nameEn: string
  symbol: string
  element: 'Lửa' | 'Đất' | 'Khí' | 'Nước'
  modality: 'Cardinal' | 'Fixed' | 'Mutable'
  rulingPlanet: string
  dateRange: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
}

export const ZODIAC_META: ZodiacSignMeta[] = [
  { key: 'aries',       name: 'Bạch Dương', nameEn: 'Aries',       symbol: '♈', element: 'Lửa',  modality: 'Cardinal', rulingPlanet: 'Sao Hỏa',    dateRange: '21/3 – 19/4',  startMonth: 3,  startDay: 21, endMonth: 4,  endDay: 19 },
  { key: 'taurus',      name: 'Kim Ngưu',   nameEn: 'Taurus',      symbol: '♉', element: 'Đất',  modality: 'Fixed',    rulingPlanet: 'Sao Kim',     dateRange: '20/4 – 20/5',  startMonth: 4,  startDay: 20, endMonth: 5,  endDay: 20 },
  { key: 'gemini',      name: 'Song Tử',    nameEn: 'Gemini',      symbol: '♊', element: 'Khí',  modality: 'Mutable',  rulingPlanet: 'Sao Thủy',    dateRange: '21/5 – 20/6',  startMonth: 5,  startDay: 21, endMonth: 6,  endDay: 20 },
  { key: 'cancer',      name: 'Cự Giải',    nameEn: 'Cancer',      symbol: '♋', element: 'Nước', modality: 'Cardinal', rulingPlanet: 'Mặt Trăng',   dateRange: '21/6 – 22/7',  startMonth: 6,  startDay: 21, endMonth: 7,  endDay: 22 },
  { key: 'leo',         name: 'Sư Tử',      nameEn: 'Leo',         symbol: '♌', element: 'Lửa',  modality: 'Fixed',    rulingPlanet: 'Mặt Trời',    dateRange: '23/7 – 22/8',  startMonth: 7,  startDay: 23, endMonth: 8,  endDay: 22 },
  { key: 'virgo',       name: 'Xử Nữ',      nameEn: 'Virgo',       symbol: '♍', element: 'Đất',  modality: 'Mutable',  rulingPlanet: 'Sao Thủy',    dateRange: '23/8 – 22/9',  startMonth: 8,  startDay: 23, endMonth: 9,  endDay: 22 },
  { key: 'libra',       name: 'Thiên Bình', nameEn: 'Libra',       symbol: '♎', element: 'Khí',  modality: 'Cardinal', rulingPlanet: 'Sao Kim',     dateRange: '23/9 – 22/10', startMonth: 9,  startDay: 23, endMonth: 10, endDay: 22 },
  { key: 'scorpio',     name: 'Bọ Cạp',     nameEn: 'Scorpio',     symbol: '♏', element: 'Nước', modality: 'Fixed',    rulingPlanet: 'Diêm Vương',  dateRange: '23/10 – 21/11',startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { key: 'sagittarius', name: 'Nhân Mã',    nameEn: 'Sagittarius', symbol: '♐', element: 'Lửa',  modality: 'Mutable',  rulingPlanet: 'Sao Mộc',    dateRange: '22/11 – 21/12',startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  { key: 'capricorn',   name: 'Ma Kết',     nameEn: 'Capricorn',   symbol: '♑', element: 'Đất',  modality: 'Cardinal', rulingPlanet: 'Sao Thổ',    dateRange: '22/12 – 19/1', startMonth: 12, startDay: 22, endMonth: 1,  endDay: 19 },
  { key: 'aquarius',    name: 'Bảo Bình',   nameEn: 'Aquarius',    symbol: '♒', element: 'Khí',  modality: 'Fixed',    rulingPlanet: 'Thiên Vương', dateRange: '20/1 – 18/2',  startMonth: 1,  startDay: 20, endMonth: 2,  endDay: 18 },
  { key: 'pisces',      name: 'Song Ngư',   nameEn: 'Pisces',      symbol: '♓', element: 'Nước', modality: 'Mutable',  rulingPlanet: 'Hải Vương',   dateRange: '19/2 – 20/3',  startMonth: 2,  startDay: 19, endMonth: 3,  endDay: 20 },
]

/**
 * Tính cung Hoàng Đạo từ ngày và tháng dương lịch
 * Trả về key của cung (ví dụ: "aries", "scorpio")
 *
 * Kiểm chứng:
 *   01/01 → capricorn ✓
 *   15/03 → pisces ✓
 *   21/03 → aries ✓
 *   23/10 → scorpio ✓
 *   22/12 → capricorn ✓
 */
export function getZodiacSign(day: number, month: number): string {
  for (const sign of ZODIAC_META) {
    const { startMonth, startDay, endMonth, endDay, key } = sign
    if (startMonth === endMonth) {
      if (month === startMonth && day >= startDay && day <= endDay) return key
    } else if (startMonth < endMonth) {
      if (month === startMonth && day >= startDay) return key
      if (month === endMonth && day <= endDay) return key
    } else {
      // Wrap around year (Capricorn: 22/12 – 19/1)
      if (month === startMonth && day >= startDay) return key
      if (month === endMonth && day <= endDay) return key
    }
  }
  return 'pisces' // fallback an toàn (20/3 edge case)
}

export function getZodiacName(day: number, month: number): string {
  const key = getZodiacSign(day, month)
  return ZODIAC_META.find(z => z.key === key)?.name ?? key
}

// ============================================================
// PHẦN 2 — PROFILE 12 CUNG
// ============================================================

export interface ZodiacProfile {
  key: string
  name: string
  nameEn: string
  symbol: string
  element: string
  modality: string
  rulingPlanet: string
  dateRange: string
  motaCoLoi: string
  diemManh: string[]
  diemYeu: string[]
  trongTinhYeu: string
  trongCongViec: string
  ngheNghiep: string[]
  tuongHopTot: string[]
  canNoLuc: string[]
  mauSac: string[]
  affirmation: string
  funFact: string
}

export const ZODIAC_DATA: Record<string, ZodiacProfile> = {

// ─────────────────────────────────────────
  // BẠCH DƯƠNG — Aries ♈ (21/3 – 19/4)
  // ─────────────────────────────────────────
  aries: {
    key: 'aries',
    name: 'Bạch Dương',
    nameEn: 'Aries',
    symbol: '♈',
    element: 'Lửa',
    modality: 'Cardinal — khởi xướng',
    rulingPlanet: 'Sao Hỏa',
    dateRange: '21/3 – 19/4',

    motaCoLoi: 'Bạch Dương là người đầu tiên xông vào — không phải vì vô nghĩ mà vì họ tin rằng hành động luôn tốt hơn chờ đợi. Năng lượng của họ là ngọn lửa đầu xuân: rực rỡ, khởi đầu mọi thứ, đôi khi tắt nhanh nhưng khi cháy thì không ai dập được. Họ sống theo bản năng, không thích bị hỏi "tại sao" khi đã muốn làm — câu trả lời luôn là "tại sao không?"',

    diemManh: [
      'Dũng cảm bẩm sinh — người đầu tiên giơ tay khi không ai dám, người cuối cùng rời đi khi mọi thứ khó khăn.',
      'Nhiệt huyết lây lan — khi Bạch Dương hứng thú với điều gì, năng lượng đó lan sang cả phòng.',
      'Quyết đoán tức thì — không mắc kẹt trong vòng phân tích mãi mãi, họ chọn và đi.',
      'Tinh thần hồi phục mạnh — ngã rồi đứng dậy nhanh hơn bất kỳ cung nào khác, không có thời gian để ủ rũ lâu.',
    ],

    diemYeu: [
      'Thiếu kiên nhẫn thái quá — khi hứng thú qua đi, dự án dở dang cũng dễ bị bỏ lại.',
      'Bốc đồng và nói trước nghĩ sau — thẳng thắn đến mức đôi khi trở thành vũ khí không chủ ý.',
      'Khó chấp nhận thua — ego lớn, cãi đến cùng dù biết mình sai.',
    ],

    trongTinhYeu: 'Bạch Dương yêu mãnh liệt và tốc độ — không thích vòng vo hay trò chơi "thử thách nhau". Họ theo đuổi thẳng thắn và muốn biết ngay có tương lai không. Cần người bạn đời đủ mạnh để không bị nuốt chửng bởi năng lượng của họ, nhưng cũng đủ tự do để không cảm thấy ngột ngạt.',

    trongCongViec: 'Xuất sắc trong giai đoạn khởi động — đây là người bạn muốn trong phòng khi cần ai đó bắt đầu điều chưa từng có. Làm việc tốt nhất khi được trao quyền tự quyết định và tốc độ riêng. Khó khăn nhất với công việc lặp đi lặp lại và quy trình quan liêu.',

    ngheNghiep: ['Doanh nhân / Founder', 'Vận động viên / Huấn luyện viên', 'Quân sự / Cảnh sát', 'Sales & Business Development', 'Phẫu thuật / Cấp cứu'],

    tuongHopTot: ['leo', 'sagittarius', 'gemini'],
    canNoLuc: ['cancer', 'capricorn'],
    mauSac: ['Đỏ', 'Cam', 'Vàng'],

    affirmation: 'Tôi dẫn đầu bằng dũng cảm — hành động của tôi mở đường cho người khác.',

    funFact: 'Bạch Dương là cung đầu tiên trong hoàng đạo — không phải ngẫu nhiên mà là vì năng lượng của họ thực sự là "người khai mào" của mọi thứ.',
  },

  // ─────────────────────────────────────────
  // KIM NGƯU — Taurus ♉ (20/4 – 20/5)
  // ─────────────────────────────────────────
  taurus: {
    key: 'taurus',
    name: 'Kim Ngưu',
    nameEn: 'Taurus',
    symbol: '♉',
    element: 'Đất',
    modality: 'Fixed — bền vững',
    rulingPlanet: 'Sao Kim',
    dateRange: '20/4 – 20/5',

    motaCoLoi: 'Kim Ngưu là người hiểu rằng những thứ tốt nhất trong đời không đến vội. Họ không vội vàng — không phải vì lười, mà vì biết rằng chất lượng cần thời gian và sự kiên nhẫn. Cai trị bởi Sao Kim, họ có gu thẩm mỹ tinh tế và bị thu hút bởi vẻ đẹp trong mọi hình thức: âm nhạc, thức ăn ngon, không gian sống thoải mái. Một khi đã quyết định, rất khó lay chuyển — đây là điểm mạnh và điểm yếu cùng một lúc.',

    diemManh: [
      'Đáng tin cậy tuyệt đối — nếu Kim Ngưu nói sẽ làm, họ làm, không cần nhắc.',
      'Kiên nhẫn chiến lược — có thể chờ đợi và duy trì nỗ lực bền bỉ hơn hầu hết mọi người.',
      'Khiếu thẩm mỹ và hưởng thụ tinh tế — biết cách tạo ra và tận hưởng cái đẹp trong cuộc sống.',
      'Ổn định tài chính — hiếm khi tiêu hoang, thường có kế hoạch dài hạn cho tiền bạc.',
    ],

    diemYeu: [
      'Bướng bỉnh đến mức ngoan cố — thay đổi ý kiến của Kim Ngưu gần như bất khả thi dù có bằng chứng.',
      'Tích lũy thái quá — khó buông bỏ, kể cả những thứ và người đã không còn phù hợp.',
      'Chậm thích nghi — thay đổi đột ngột làm họ khó chịu và mất phương hướng.',
    ],

    trongTinhYeu: 'Kim Ngưu yêu chậm nhưng sâu — họ không trao lòng ngay lần đầu gặp. Khi đã yêu, đó là tình yêu ổn định, vật chất và cảm xúc đều được chăm chút. Ngôn ngữ tình yêu của họ thường là hành động: nấu ăn, lên kế hoạch ngày đặc biệt, nhớ những chi tiết nhỏ.',

    trongCongViec: 'Kim Ngưu xuất sắc trong môi trường cần sự ổn định và kết quả lâu dài. Không phải người thích rủi ro cao, nhưng là người đảm bảo dự án đến đích đúng chất lượng. Làm việc tốt nhất khi có quy trình rõ ràng và được đánh giá bằng thành quả thực tế.',

    ngheNghiep: ['Tài chính / Ngân hàng / Đầu tư', 'Nghệ thuật / Âm nhạc / Thiết kế', 'Bất động sản / Xây dựng', 'Ẩm thực / Đầu bếp', 'Nông nghiệp / Môi trường'],

    tuongHopTot: ['virgo', 'capricorn', 'cancer'],
    canNoLuc: ['leo', 'aquarius'],
    mauSac: ['Xanh lá', 'Hồng đất', 'Nâu'],

    affirmation: 'Tôi xây dựng điều bền vững — sự kiên nhẫn của tôi là sức mạnh, không phải điểm yếu.',

    funFact: 'Kim Ngưu là cung có nhiều nghệ sĩ và nhạc sĩ nổi tiếng nhất hoàng đạo — Adele, Stevie Wonder, và cả Shakespeare đều là Kim Ngưu.',
  },

  // ─────────────────────────────────────────
  // SONG TỬ — Gemini ♊ (21/5 – 20/6)
  // ─────────────────────────────────────────
  gemini: {
    key: 'gemini',
    name: 'Song Tử',
    nameEn: 'Gemini',
    symbol: '♊',
    element: 'Khí',
    modality: 'Mutable — linh hoạt',
    rulingPlanet: 'Sao Thủy',
    dateRange: '21/5 – 20/6',

    motaCoLoi: 'Song Tử không phải "hai mặt" như người ta hay nói — họ đơn giản là chứa đựng nhiều thế giới trong một người. Tò mò về mọi thứ, nói chuyện được với bất kỳ ai, và có khả năng chuyển đổi giữa các chủ đề và vai trò với tốc độ không ai theo kịp. Bộ não Song Tử luôn chạy song song — đang nghe bạn nhưng đồng thời đang nghĩ về 3 thứ khác. Đây không phải thiếu tập trung mà là cách họ vận hành.',

    diemManh: [
      'Giao tiếp xuất sắc — có thể giải thích bất kỳ ý tưởng phức tạp nào thành ngôn ngữ ai cũng hiểu.',
      'Thích nghi nhanh — đổi môi trường, vai trò, và góc nhìn mà không mất đà.',
      'Tư duy kết nối — nhìn thấy mối liên hệ giữa những thứ tưởng chừng không liên quan.',
      'Vui vẻ và hấp dẫn — hiếm khi làm ai chán, luôn có chuyện hay để kể.',
    ],

    diemYeu: [
      'Khó tập trung dài hạn — khi hứng thú qua, năng lượng cũng bay theo.',
      'Hay thay đổi ý kiến — đôi khi đến mức không ai biết họ thực sự muốn gì.',
      'Né tránh cảm xúc nặng nề — dùng sự vui vẻ và trí tuệ để không phải deal với phần sâu hơn.',
    ],

    trongTinhYeu: 'Song Tử cần người bạn đời vừa là người yêu vừa là người bạn thật sự — ai đó có thể vừa bàn luận triết học lúc 2 giờ sáng vừa đồng hành trong những chuyến đi ngẫu hứng. Sợ nhất là sự nhàm chán và routine cứng nhắc. Khi thực sự yêu, họ cực kỳ trung thành — nhưng cần được cho không gian để là chính mình.',

    trongCongViec: 'Song Tử phát huy tốt nhất trong môi trường cần sáng tạo, giao tiếp và đa nhiệm. Xuất sắc trong brainstorming và kết nối ý tưởng từ nhiều lĩnh vực khác nhau. Cần đa dạng trong công việc hàng ngày — công việc lặp đi lặp lại sẽ "giết" họ từ từ.',

    ngheNghiep: ['Nhà báo / Biên kịch / Nhà văn', 'Marketing & Truyền thông', 'Giảng dạy / Diễn giả', 'Luật sư / Thương thuyết viên', 'PR & Social Media'],

    tuongHopTot: ['libra', 'aquarius', 'aries'],
    canNoLuc: ['virgo', 'pisces'],
    mauSac: ['Vàng nhạt', 'Xanh nhạt', 'Bạc'],

    affirmation: 'Sự tò mò của tôi là món quà — tôi kết nối thế giới bằng những ý tưởng và ngôn từ.',

    funFact: 'Song Tử là cung có tỷ lệ người nổi tiếng trong giới truyền thông và nghệ thuật cao nhất — Marilyn Monroe, Kanye West, Johnny Depp đều là Song Tử.',
  },

  // ─────────────────────────────────────────
  // CỰ GIẢI — Cancer ♋ (21/6 – 22/7)
  // ─────────────────────────────────────────
  cancer: {
    key: 'cancer',
    name: 'Cự Giải',
    nameEn: 'Cancer',
    symbol: '♋',
    element: 'Nước',
    modality: 'Cardinal — khởi xướng',
    rulingPlanet: 'Mặt Trăng',
    dateRange: '21/6 – 22/7',

    motaCoLoi: 'Cự Giải được điều khiển bởi Mặt Trăng — và như Mặt Trăng, họ thay đổi theo chu kỳ, có những đợt triều dâng và lúc rút xuống mà chính họ đôi khi cũng không giải thích được. Bên ngoài lớp vỏ cứng là trái tim mềm nhất trong hoàng đạo — người quan tâm đến người khác một cách bản năng, nhớ sinh nhật của tất cả, và tạo ra bầu không khí "gia đình" ở bất cứ nơi nào họ đến. Nhà là nơi linh thiêng với họ — không nhất thiết là địa điểm, mà là cảm giác.',

    diemManh: [
      'Trực giác cảm xúc cực nhạy — cảm nhận được tâm trạng người khác trước khi họ nói ra một chữ.',
      'Trung thành đến cùng — khi đã gọi bạn là "người của mình", Cự Giải sẽ bảo vệ bạn không cần điều kiện.',
      'Ký ức tốt về cảm xúc — nhớ mọi khoảnh khắc quan trọng, mọi lần bị tổn thương, mọi lần được yêu thương.',
      'Tạo ra không gian ấm áp — nơi nào có Cự Giải, người ta cảm thấy được chào đón và an toàn.',
    ],

    diemYeu: [
      'Dễ bị tổn thương và hay mang hận lâu — vết thương cảm xúc không dễ lành và không dễ quên.',
      'Cảm xúc lên xuống thất thường — Mặt Trăng thay đổi và họ cũng vậy, đôi khi không báo trước.',
      'Quá bám víu — tình yêu thương đôi khi trở thành sự kiểm soát núp bóng quan tâm.',
    ],

    trongTinhYeu: 'Cự Giải yêu sâu và cần được yêu lại ở cùng độ sâu đó. Họ nhớ mọi chi tiết nhỏ trong mối quan hệ, kỷ niệm mọi dịp, và thể hiện tình yêu bằng sự chăm sóc cụ thể. Điều họ cần nhất không phải là lời hứa hẹn lớn mà là cảm giác an toàn — biết rằng người kia sẽ không biến mất.',

    trongCongViec: 'Cự Giải làm tốt nhất trong môi trường có cấu trúc rõ ràng và đồng nghiệp đáng tin cậy. Họ mang lại sự ấm áp nhân văn vào bất kỳ tổ chức nào — thường là người mà mọi người tìm đến khi cần được lắng nghe. Môi trường độc hại hay thiếu sự kết nối sẽ ảnh hưởng mạnh đến hiệu suất làm việc của họ.',

    ngheNghiep: ['Y tế / Điều dưỡng / Tâm lý trị liệu', 'Giáo dục / Mầm non', 'Nghệ thuật ẩm thực / Hospitality', 'Nhà văn / Nhiếp ảnh gia', 'Nhân sự / Tư vấn'],

    tuongHopTot: ['scorpio', 'pisces', 'taurus'],
    canNoLuc: ['aries', 'libra'],
    mauSac: ['Trắng bạc', 'Xanh biển nhạt', 'Xám nhẹ'],

    affirmation: 'Trái tim tôi là sức mạnh — sự quan tâm tôi dành cho người khác tạo ra những điều bền vững nhất.',

    funFact: 'Cự Giải là cung nấu ăn giỏi nhất hoàng đạo — không phải vì học được mà vì với họ, nấu cho người khác ăn là ngôn ngữ tình yêu tự nhiên nhất.',
  },

// ─────────────────────────────────────────
  // SƯ TỬ — Leo ♌ (23/7 – 22/8)
  // ─────────────────────────────────────────
  leo: {
    key: 'leo',
    name: 'Sư Tử',
    nameEn: 'Leo',
    symbol: '♌',
    element: 'Lửa',
    modality: 'Fixed — bền vững',
    rulingPlanet: 'Mặt Trời',
    dateRange: '23/7 – 22/8',

    motaCoLoi: 'Sư Tử không chỉ muốn tỏa sáng — họ cần tỏa sáng như Mặt Trời cần chiếu sáng: đó là bản chất, không phải lựa chọn. Hào phóng một cách đáng kinh ngạc, họ cho đi không cần tính toán — tiền bạc, thời gian, sự chú ý. Đổi lại, họ cần được nhận ra và trân trọng. Tự ái của Sư Tử không phải kiêu ngạo rỗng tuếch mà là lòng tự trọng được nuôi dưỡng từ ý thức rất rõ về giá trị của mình.',

    diemManh: [
      'Lãnh đạo bẩm sinh và truyền cảm hứng — người ta đi theo Sư Tử không vì quyền lực mà vì họ tin.',
      'Hào phóng không giới hạn — cho đi với trái tim mở mà không giữ sổ ghi nợ.',
      'Sự hiện diện không thể bỏ qua — khi Sư Tử bước vào phòng, năng lượng thay đổi.',
      'Trung thành và bảo vệ người thân — ai thuộc về "đàn" của Sư Tử được bảo vệ mạnh mẽ.',
    ],

    diemYeu: [
      'Tự ái dễ bị tổn thương — lời phê bình dù nhỏ cũng có thể bị cảm nhận như tấn công cá nhân.',
      'Cần được chú ý liên tục — khi không được ghi nhận, họ rút lui hoặc trở nên dramatic.',
      'Đôi khi áp đặt — chắc chắn mình đúng đến mức khó lắng nghe quan điểm khác.',
    ],

    trongTinhYeu: 'Sư Tử yêu rực rỡ và hết mình — khi bạn là người họ chọn, bạn sẽ cảm thấy như người quan trọng nhất thế giới. Họ lãng mạn theo nghĩa cổ điển: grand gesture, kỷ niệm, sự chú ý không chia sẻ. Điều họ cần nhất không phải khen ngợi giả tạo mà là người thực sự thấy được chiều sâu phía sau ánh hào quang.',

    trongCongViec: 'Sư Tử làm tốt nhất khi được dẫn đầu hoặc ít nhất là được thấy và công nhận. Xuất sắc trong các vai trò cần thuyết phục và truyền cảm hứng. Môi trường âm thầm không ai biết đến sẽ làm Sư Tử dần mất lửa.',

    ngheNghiep: ['Nghệ thuật biểu diễn / Diễn viên / MC', 'CEO / Lãnh đạo tổ chức', 'Giáo dục / Truyền cảm hứng', 'Chính trị / Vận động cộng đồng', 'Thiết kế thời trang / Làm đẹp'],

    tuongHopTot: ['aries', 'sagittarius', 'gemini'],
    canNoLuc: ['taurus', 'scorpio'],
    mauSac: ['Vàng', 'Cam', 'Đỏ'],

    affirmation: 'Tôi chiếu sáng không phải để lấn át người khác — ánh sáng của tôi đủ lớn để soi sáng tất cả.',

    funFact: 'Sư Tử là cung có nhiều ngôi sao điện ảnh nhất — Jennifer Lopez, Barack Obama, Kylie Jenner, và Coco Chanel đều là Sư Tử.',
  },

  // ─────────────────────────────────────────
  // XỬ NỮ — Virgo ♍ (23/8 – 22/9)
  // ─────────────────────────────────────────
  virgo: {
    key: 'virgo',
    name: 'Xử Nữ',
    nameEn: 'Virgo',
    symbol: '♍',
    element: 'Đất',
    modality: 'Mutable — linh hoạt',
    rulingPlanet: 'Sao Thủy',
    dateRange: '23/8 – 22/9',

    motaCoLoi: 'Xử Nữ không phải cầu toàn vì ảo tưởng — họ cầu toàn vì nhìn thấy rõ khoảng cách giữa điều đang là và điều có thể là. Đây là cung của sự phân tích, dịch vụ, và sự cải thiện liên tục. Khi Xử Nữ giúp đỡ ai đó, đó không phải vì muốn cảm ơn — đó là vì họ thực sự không thể đứng nhìn khi biết mình có thể làm cho tình huống tốt hơn. Trí tuệ thực dụng của họ thường bị hiểu nhầm là lạnh lùng — thực ra họ chỉ cần thêm thời gian để mở lòng.',

    diemManh: [
      'Phân tích chi tiết phi thường — không có gì lọt qua mắt Xử Nữ khi họ đã chú ý.',
      'Đáng tin cậy trong thực thi — nếu Xử Nữ nhận việc, nó sẽ được làm đúng và đúng hạn.',
      'Thực dụng và giải quyết vấn đề — không bị mất trong ý tưởng, tập trung vào giải pháp cụ thể.',
      'Quan tâm qua hành động — thể hiện tình cảm bằng những việc làm thiết thực hơn là lời nói hoa mỹ.',
    ],

    diemYeu: [
      'Tự phê bình quá mức — tiêu chuẩn cao áp dụng với người khác còn chưa bằng với chính mình.',
      'Lo lắng kinh niên — đầu óc luôn chạy, khó tắt, hay thấy vấn đề trước khi thấy cơ hội.',
      'Khó buông bỏ sự kiểm soát — tin tưởng người khác làm đúng cách của mình là thử thách thật sự.',
    ],

    trongTinhYeu: 'Xử Nữ không bày tỏ tình cảm bằng lời — họ thể hiện qua việc nhớ đúng loại cà phê bạn uống, nhắc uống thuốc, nghiên cứu nơi bạn muốn đến. Cần người bạn đời kiên nhẫn để vượt qua lớp giáp phân tích và thấy được trái tim ấm áp bên trong. Đừng bao giờ phê bình họ trước mặt người khác — đây là điều không thể tha thứ.',

    trongCongViec: 'Xử Nữ là tài sản không thể thiếu trong bất kỳ tổ chức nào — người kiểm tra lần cuối trước khi publish, người phát hiện lỗi mà không ai thấy, người giữ cho mọi thứ chạy đúng. Xuất sắc trong nghiên cứu, phân tích, quản lý quy trình.',

    ngheNghiep: ['Y tế / Dược / Dinh dưỡng', 'Biên tập / Kiểm duyệt nội dung', 'Kế toán / Kiểm toán', 'Nghiên cứu / Khoa học', 'Tư vấn / Cố vấn chiến lược'],

    tuongHopTot: ['taurus', 'capricorn', 'cancer'],
    canNoLuc: ['gemini', 'sagittarius'],
    mauSac: ['Xanh lá nhạt', 'Be', 'Nâu nhạt'],

    affirmation: 'Tôi phục vụ từ sức mạnh, không phải từ nỗi sợ — sự kỹ lưỡng của tôi tạo ra sự khác biệt thực sự.',

    funFact: 'Nhiều Xử Nữ nổi tiếng là thiên tài ngôn ngữ — Beyoncé, Freddie Mercury, và Michael Jackson đều là Xử Nữ, và cả ba đều nổi tiếng với sự cầu toàn trong âm nhạc.',
  },

  // ─────────────────────────────────────────
  // THIÊN BÌNH — Libra ♎ (23/9 – 22/10)
  // ─────────────────────────────────────────
  libra: {
    key: 'libra',
    name: 'Thiên Bình',
    nameEn: 'Libra',
    symbol: '♎',
    element: 'Khí',
    modality: 'Cardinal — khởi xướng',
    rulingPlanet: 'Sao Kim',
    dateRange: '23/9 – 22/10',

    motaCoLoi: 'Thiên Bình là cung duy nhất trong hoàng đạo được đại diện bởi vật thể vô tri — chiếc cân — không phải ngẫu nhiên. Họ sống để cân bằng: giữa hai lập trường, giữa cái đẹp và sự công bằng, giữa cái tôi và mối quan hệ. Cai trị bởi Sao Kim, họ có mắt thẩm mỹ tự nhiên và nhu cầu hài hòa sâu sắc — xung đột làm họ không thoải mái về thể chất. Không phải yếu đuối, mà là họ nhìn thấy cả hai phía quá rõ đến mức không thể chọn một phía dễ dàng.',

    diemManh: [
      'Ngoại giao và hòa giải tự nhiên — tìm được điểm chung trong các cuộc tranh luận căng thẳng nhất.',
      'Công bằng và nguyên tắc — không chịu được sự bất công, dù nó có lợi cho mình.',
      'Thẩm mỹ và phong cách — biết cách tạo ra môi trường đẹp và hài hòa.',
      'Giao tiếp duyên dáng — biết cách nói những điều khó nghe mà người ta vẫn muốn nghe.',
    ],

    diemYeu: [
      'Thiếu quyết đoán kinh niên — nhìn thấy quá nhiều phía khiến không thể chọn một hướng dứt khoát.',
      'Tránh né xung đột cần thiết — giữ hòa khí đến mức đôi khi im lặng khi đáng phải lên tiếng.',
      'Phụ thuộc vào xác nhận từ bên ngoài — cần người khác thấy mình ổn mới cảm thấy ổn.',
    ],

    trongTinhYeu: 'Thiên Bình là người lãng mạn nhất hoàng đạo — không chỉ về hành động mà về tinh thần. Họ tìm kiếm quan hệ đối tác thật sự: ai đó để cùng khám phá thế giới, thảo luận ý tưởng, và cùng tạo ra cuộc sống đẹp. Điều khó nhất với họ là thừa nhận khi mối quan hệ không còn phù hợp — vì buông bỏ cảm thấy như thất bại.',

    trongCongViec: 'Thiên Bình làm tốt nhất trong môi trường cần sự hợp tác và tư duy đa chiều. Xuất sắc trong các vai trò cần đàm phán, thiết kế, hoặc xây dựng sự đồng thuận. Khó khăn nhất với môi trường cạnh tranh cao và áp lực ra quyết định đơn độc.',

    ngheNghiep: ['Luật sư / Thẩm phán / Hòa giải viên', 'Thiết kế / Nghệ thuật / Kiến trúc', 'Ngoại giao / PR', 'Tư vấn HR / Quản lý con người', 'Thời trang / Làm đẹp'],

    tuongHopTot: ['gemini', 'aquarius', 'leo'],
    canNoLuc: ['cancer', 'capricorn'],
    mauSac: ['Hồng phấn', 'Xanh nhạt', 'Trắng'],

    affirmation: 'Tôi tạo ra sự hài hòa không phải bằng cách tránh né sự thật mà bằng cách nói nó một cách đẹp đẽ.',

    funFact: 'Thiên Bình có nhiều tổng thống và nhà lãnh đạo nhất trong hoàng đạo — không phải vì họ tham vọng mà vì khả năng nhìn thấy mọi phía và xây dựng sự đồng thuận của họ.',
  },

  // ─────────────────────────────────────────
  // BỌ CẠP — Scorpio ♏ (23/10 – 21/11)
  // ─────────────────────────────────────────
  scorpio: {
    key: 'scorpio',
    name: 'Bọ Cạp',
    nameEn: 'Scorpio',
    symbol: '♏',
    element: 'Nước',
    modality: 'Fixed — bền vững',
    rulingPlanet: 'Diêm Vương',
    dateRange: '23/10 – 21/11',

    motaCoLoi: 'Bọ Cạp không phải cung đáng sợ — họ là cung đáng kính nể nhất. Không ai đi đến chiều sâu của sự trải nghiệm như Bọ Cạp: họ không muốn biết bạn như thế nào bên ngoài mà muốn biết bạn là gì ở lõi trong cùng. Sao Diêm Vương cai trị sự biến đổi và tái sinh — không phải ngẫu nhiên mà Bọ Cạp thường trải qua những giai đoạn "chết và sống lại" trong cuộc đời, và mỗi lần họ trở lại đều mạnh hơn. Không gì đơn giản và không gì hời hợt với họ — tất cả hoặc không có gì.',

    diemManh: [
      'Trực giác về con người không thể đánh lừa — phát hiện dối trá và giả tạo gần như ngay lập tức.',
      'Ý chí và sức bền không ai sánh — khi Bọ Cạp quyết định điều gì, không có trở ngại nào là vĩnh viễn.',
      'Trung thành tuyệt đối — người thuộc về Bọ Cạp được bảo vệ như không ai khác trong hoàng đạo.',
      'Biến đổi và phục hồi mạnh mẽ — trải qua khủng hoảng mà người khác không thể sống sót và bước ra mạnh hơn.',
    ],

    diemYeu: [
      'Nhớ dai và khó tha thứ — một khi tin tưởng bị phá vỡ, rất hiếm khi được xây dựng lại hoàn toàn.',
      'Kiểm soát và ghen tuông — tình yêu thương sâu sắc đôi khi biến thành nhu cầu kiểm soát.',
      'Bí ẩn đến mức đơn độc — giữ mọi thứ quá riêng tư, đôi khi đẩy đi chính những người muốn gần.',
    ],

    trongTinhYeu: 'Bọ Cạp không yêu theo kiểu bình thường — họ yêu theo kiểu đại dương: sâu, toàn bộ, và bất tận. Khi đã chọn bạn, họ muốn biết mọi thứ về bạn — kể cả những phần tối tăm mà bạn giấu khỏi mọi người. Đây là sức mạnh và gánh nặng của tình yêu Bọ Cạp. Không thể giả vờ hay che giấu với họ — họ sẽ biết.',

    trongCongViec: 'Bọ Cạp làm tốt nhất trong các công việc đòi hỏi chiều sâu, bảo mật, và khả năng xử lý áp lực cao. Không ai đào sâu vào một vấn đề và tìm ra sự thật ẩn giấu tốt hơn Bọ Cạp. Môi trường giả tạo và chính trị văn phòng là kẻ thù của hiệu suất của họ.',

    ngheNghiep: ['Điều tra / Thám tử / An ninh', 'Tâm lý học / Trị liệu', 'Phẫu thuật / Y tế', 'Nghiên cứu khoa học sâu', 'Tài chính / Đầu tư chiến lược'],

    tuongHopTot: ['cancer', 'pisces', 'virgo'],
    canNoLuc: ['leo', 'aquarius'],
    mauSac: ['Đen', 'Đỏ đậm', 'Tím'],

    affirmation: 'Chiều sâu của tôi là món quà — tôi chuyển hóa bóng tối thành sức mạnh.',

    funFact: 'Bọ Cạp có nhiều nhà lãnh đạo cách mạng nhất hoàng đạo — Bill Gates, Marie Curie, Pablo Picasso, và Hillary Clinton đều là Bọ Cạp, và tất cả đều nổi tiếng với sự kiên định không ai lay chuyển được.',
  },

// ─────────────────────────────────────────
  // NHÂN MÃ — Sagittarius ♐ (22/11 – 21/12)
  // ─────────────────────────────────────────
  sagittarius: {
    key: 'sagittarius',
    name: 'Nhân Mã',
    nameEn: 'Sagittarius',
    symbol: '♐',
    element: 'Lửa',
    modality: 'Mutable — linh hoạt',
    rulingPlanet: 'Sao Mộc',
    dateRange: '22/11 – 21/12',

    motaCoLoi: 'Nhân Mã sinh ra với mũi tên hướng về chân trời — họ không hỏi "tại sao đi" mà hỏi "tại sao không đi". Cai trị bởi Sao Mộc — hành tinh của sự mở rộng, may mắn, và triết học — họ nhìn cuộc sống như một trường đại học không có điểm tốt nghiệp. Mỗi trải nghiệm là bài học, mỗi con người là thầy giáo, mỗi thất bại là dữ liệu cho lần tiếp theo. Thẳng thắn đến mức đôi khi thiếu lọc — không phải vì thiếu tế nhị mà vì họ thực sự tin vào sức mạnh của sự thật.',

    diemManh: [
      'Lạc quan không thể dập tắt — ngay cả sau thất bại lớn, họ vẫn tìm thấy lý do để tin vào điều tốt tiếp theo.',
      'Ham học và tầm nhìn rộng — kết nối ý tưởng từ nhiều lĩnh vực và văn hóa theo cách ít ai làm được.',
      'Hài hước và dễ gần — có thể làm cho người lạ cảm thấy như bạn cũ chỉ sau 10 phút.',
      'Tự do và không phán xét — chấp nhận sự khác biệt và ít bị ràng buộc bởi quy chuẩn xã hội.',
    ],

    diemYeu: [
      'Cam kết là thử thách — khó ở lại một nơi, một công việc, hoặc một người đủ lâu để đào sâu.',
      'Thẳng thắn thiếu lọc — nói thật nhưng đôi khi không đọc được phòng, gây tổn thương vô tình.',
      'Bắt đầu nhiều, hoàn thành ít — nhiệt huyết lớn nhưng kiên nhẫn thực thi không phải điểm mạnh.',
    ],

    trongTinhYeu: 'Nhân Mã cần người bạn đời là người bạn đồng hành — không phải người giam cầm họ. Họ yêu hứng khởi, không yêu routine. Người kéo được Nhân Mã ở lại là người thú vị hơn bất kỳ cuộc phiêu lưu nào họ có thể tự mình tìm kiếm. Không gian là điều không thể thương lượng — kiểm soát thái quá là đường tắt kết thúc mọi thứ.',

    trongCongViec: 'Nhân Mã phát huy tốt nhất trong môi trường năng động với cơ hội học hỏi liên tục. Xuất sắc trong lĩnh vực cần tầm nhìn lớn và kết nối ý tưởng từ nhiều nguồn. Không phù hợp với công việc đơn điệu, giám sát vi mô, hoặc môi trường không có cơ hội phát triển.',

    ngheNghiep: ['Giảng dạy / Học thuật / Nghiên cứu', 'Du lịch / Trải nghiệm / Hướng dẫn viên', 'Báo chí / Xuất bản / Biên kịch', 'Triết học / Tâm linh', 'Marketing quốc tế / Ngoại giao'],

    tuongHopTot: ['aries', 'leo', 'aquarius'],
    canNoLuc: ['virgo', 'pisces'],
    mauSac: ['Tím', 'Xanh hoàng gia', 'Cam đất'],

    affirmation: 'Mỗi ngày là một chân trời mới — tầm nhìn của tôi mở ra những cánh cửa mà người khác chưa thấy.',

    funFact: 'Nhân Mã là cung có nhiều triết gia và nhà tư tưởng nhất — Voltaire, Mark Twain, và Winston Churchill đều là Nhân Mã, nổi tiếng với tư duy độc lập và sự thẳng thắn không ngại va chạm.',
  },

  // ─────────────────────────────────────────
  // MA KẾT — Capricorn ♑ (22/12 – 19/1)
  // ─────────────────────────────────────────
  capricorn: {
    key: 'capricorn',
    name: 'Ma Kết',
    nameEn: 'Capricorn',
    symbol: '♑',
    element: 'Đất',
    modality: 'Cardinal — khởi xướng',
    rulingPlanet: 'Sao Thổ',
    dateRange: '22/12 – 19/1',

    motaCoLoi: 'Ma Kết leo núi — không vì cảm giác hứng khởi mà vì đỉnh núi là điểm đến cần đến. Cai trị bởi Sao Thổ — hành tinh của kỷ luật, thời gian, và kết quả — họ hiểu rằng mọi thứ xứng đáng đều cần thời gian và công sức. Người trưởng thành sớm nhất hoàng đạo: ngay khi còn trẻ, họ đã suy nghĩ về hậu quả dài hạn. Đổi lại, càng về già họ càng biết cách tận hưởng và nhẹ nhõm hơn — cuộc đời của Ma Kết thường ngược với hầu hết mọi người.',

    diemManh: [
      'Kỷ luật và kiên nhẫn dài hạn — có thể chịu đựng quá trình khó khăn mà người khác từ bỏ từ lâu.',
      'Thực dụng và có kế hoạch — không mơ mộng hão huyền, luôn có bước đi cụ thể cho từng mục tiêu.',
      'Đáng tin cậy và chuyên nghiệp — cam kết là cam kết, không có ngoại lệ.',
      'Tham vọng có chiều sâu — không chỉ muốn thành công mà muốn xây dựng thứ gì đó bền vững.',
    ],

    diemYeu: [
      'Làm việc quá mức và khó nghỉ ngơi — tin rằng nghỉ là lãng phí, thường burnout trước khi nhận ra.',
      'Lạnh lùng bề ngoài — cần thời gian và tin tưởng trước khi mở lòng, dễ bị hiểu nhầm là xa cách.',
      'Cứng nhắc với tiêu chuẩn — khó chấp nhận cách làm khác dù kết quả tương đương.',
    ],

    trongTinhYeu: 'Ma Kết không yêu vội và không chọn ai ngẫu nhiên — họ đánh giá kỹ trước khi đầu tư. Một khi đã cam kết, đó là cam kết cho lâu dài. Họ thể hiện tình yêu qua sự ổn định và bảo vệ: lên kế hoạch tương lai chung, đảm bảo tài chính, làm những việc thực tế chứng minh rằng bạn là người họ chọn xây dựng cuộc đời cùng.',

    trongCongViec: 'Ma Kết được tạo ra để lãnh đạo trong dài hạn. Không phải người của giai đoạn đầu hứng khởi mà là người đảm bảo dự án đến đích và tổ chức phát triển bền vững. Làm việc tốt nhất khi có mục tiêu rõ ràng và được đánh giá bằng kết quả thực tế.',

    ngheNghiep: ['CEO / Quản lý cấp cao', 'Tài chính / Kế toán / Kiểm toán', 'Luật / Hành chính công', 'Bất động sản / Xây dựng', 'Khoa học / Kỹ thuật'],

    tuongHopTot: ['taurus', 'virgo', 'scorpio'],
    canNoLuc: ['aries', 'libra'],
    mauSac: ['Đen', 'Nâu đậm', 'Xám than'],

    affirmation: 'Mỗi bước chậm của tôi đang xây dựng điều gì đó không thể phá vỡ.',

    funFact: 'Ma Kết nổi tiếng với hiện tượng "lão hóa ngược" — họ trông già hơn và nghiêm túc hơn khi còn trẻ, nhưng khi về già lại trở nên nhẹ nhàng, vui vẻ, và thậm chí hài hước hơn bất ngờ.',
  },

  // ─────────────────────────────────────────
  // BẢO BÌNH — Aquarius ♒ (20/1 – 18/2)
  // ─────────────────────────────────────────
  aquarius: {
    key: 'aquarius',
    name: 'Bảo Bình',
    nameEn: 'Aquarius',
    symbol: '♒',
    element: 'Khí',
    modality: 'Fixed — bền vững',
    rulingPlanet: 'Thiên Vương',
    dateRange: '20/1 – 18/2',

    motaCoLoi: 'Bảo Bình đến từ tương lai — ít nhất họ nhìn thế giới theo cách đó. Cai trị bởi Sao Thiên Vương, hành tinh của đột phá và cách mạng, họ tư duy ngoài khuôn khổ không phải vì muốn khác biệt mà vì cách suy nghĩ của họ tự nhiên vận hành ở một bước trước thời đại. Nghịch lý của Bảo Bình: cực kỳ quan tâm đến nhân loại như một tập thể nhưng đôi khi giữ khoảng cách với từng cá nhân. Họ yêu loài người trong trừu tượng và đôi khi khó kết nối ở tầng cá nhân.',

    diemManh: [
      'Tư duy đột phá và nguyên bản — ý tưởng của Bảo Bình thường đi trước thời đại vài năm.',
      'Tinh thần nhân đạo thực sự — quan tâm đến sự công bằng và tiến bộ xã hội không phải vì xu hướng.',
      'Độc lập và không bị ảnh hưởng bởi áp lực đám đông — làm điều mình tin dù không ai đồng ý.',
      'Trí tuệ và hài hước lệch pha — cách nhìn độc đáo tạo ra những quan sát mà chỉ họ mới thấy được.',
    ],

    diemYeu: [
      'Cảm xúc xa cách — hiểu cảm xúc bằng lý trí nhưng khó thực sự cảm nhận và biểu đạt.',
      'Cứng đầu trong quan điểm — dù mở với ý tưởng mới, khó thay đổi khi đã định hình niềm tin.',
      'Không dự đoán được — thích sự tự do đến mức đôi khi trở nên không đáng tin cậy trong mắt người khác.',
    ],

    trongTinhYeu: 'Bảo Bình cần người bạn đời là người bạn thật sự trước khi là người yêu — ai đó có thể bàn về triết học lúc 3 giờ sáng và không cần sự gắn kết cảm xúc liên tục. Tình yêu của họ thể hiện qua sự tôn trọng, sự thú vị, và cam kết trí tuệ hơn là những cử chỉ lãng mạn truyền thống. Cần không gian cá nhân ngay cả trong mối quan hệ sâu nhất.',

    trongCongViec: 'Bảo Bình làm tốt nhất khi được tự do thử nghiệm và đặt câu hỏi với cách làm hiện tại. Xuất sắc trong đổi mới, công nghệ, và các lĩnh vực đòi hỏi tư duy hệ thống phi tuyến tính. Không phù hợp với môi trường cứng nhắc và không cho phép thử nghiệm.',

    ngheNghiep: ['Công nghệ / Lập trình / AI', 'Hoạt động xã hội / NGO', 'Khoa học / Nghiên cứu tiên phong', 'Thiết kế sản phẩm / UX', 'Triết học / Giáo dục'],

    tuongHopTot: ['gemini', 'libra', 'sagittarius'],
    canNoLuc: ['taurus', 'scorpio'],
    mauSac: ['Xanh điện', 'Bạc', 'Tím nhạt'],

    affirmation: 'Tôi tư duy tự do và sống theo sự thật của mình — sự khác biệt của tôi là đóng góp cho thế giới.',

    funFact: 'Bảo Bình là cung có nhiều thiên tài và nhà phát minh nhất hoàng đạo — Thomas Edison, Galileo, và Charles Darwin đều là Bảo Bình, và cả ba đều thay đổi cách nhân loại hiểu thế giới.',
  },

  // ─────────────────────────────────────────
  // SONG NGƯ — Pisces ♓ (19/2 – 20/3)
  // ─────────────────────────────────────────
  pisces: {
    key: 'pisces',
    name: 'Song Ngư',
    nameEn: 'Pisces',
    symbol: '♓',
    element: 'Nước',
    modality: 'Mutable — linh hoạt',
    rulingPlanet: 'Hải Vương',
    dateRange: '19/2 – 20/3',

    motaCoLoi: 'Song Ngư là cung cuối cùng — và theo nhiều nghĩa, họ chứa đựng một phần của tất cả 11 cung trước. Cai trị bởi Sao Hải Vương, họ sống giữa thế giới vật chất và thế giới tưởng tượng, đôi khi không rõ ranh giới ở đâu. Đồng cảm đến mức hấp thụ cảm xúc người xung quanh như bọt biển, sáng tạo đến mức đôi khi thế giới nội tâm của họ phong phú hơn thực tế bên ngoài. Không phải yếu đuối — mà là loại sức mạnh khác: sức mạnh của sự chữa lành và kết nối tâm hồn.',

    diemManh: [
      'Đồng cảm sâu nhất hoàng đạo — cảm nhận nỗi đau của người khác như của chính mình.',
      'Sáng tạo nghệ thuật thiên phú — có thể chuyển hóa cảm xúc thành nghệ thuật theo cách không ai dạy được.',
      'Trực giác tâm linh — linh cảm thường chính xác đến mức đáng ngạc nhiên, đặc biệt về con người.',
      'Bao dung và không phán xét — chấp nhận con người với mọi phức tạp và mâu thuẫn của họ.',
    ],

    diemYeu: [
      'Ranh giới cảm xúc mờ — hấp thụ năng lượng tiêu cực của người khác, khó phân biệt đâu là của mình.',
      'Trốn tránh thực tế — khi thực tế quá khắc nghiệt, xu hướng thoát vào thế giới tưởng tượng hoặc trốn tránh trách nhiệm.',
      'Dễ bị lợi dụng — lòng tốt và sự đồng cảm của họ đôi khi thu hút những người muốn khai thác.',
    ],

    trongTinhYeu: 'Song Ngư yêu theo nghĩa đen của từ "linh hồn" — họ tìm kiếm kết nối tâm hồn, không phải chỉ cơ thể hay trí tuệ. Lãng mạn và lý tưởng hóa, họ có thể yêu hình ảnh của người hơn là người thật. Cần học cách yêu người thật với tất cả khiếm khuyết của họ thay vì phiên bản hoàn hảo trong đầu mình.',

    trongCongViec: 'Song Ngư làm tốt nhất khi công việc có ý nghĩa và kết nối với điều gì đó lớn hơn bản thân. Xuất sắc trong nghệ thuật, chữa lành, và bất kỳ lĩnh vực nào cần empathy sâu. Khó khăn nhất trong môi trường cạnh tranh, phi cảm xúc, và đòi hỏi sự rõ ràng tuyệt đối.',

    ngheNghiep: ['Nghệ thuật / Âm nhạc / Nhiếp ảnh', 'Tâm lý trị liệu / Tư vấn', 'Y tế / Chăm sóc sức khỏe tâm thần', 'Tâm linh / Thiền định', 'Giáo dục đặc biệt / Từ thiện'],

    tuongHopTot: ['cancer', 'scorpio', 'capricorn'],
    canNoLuc: ['gemini', 'sagittarius'],
    mauSac: ['Xanh biển đậm', 'Xanh ngọc', 'Tím nhạt'],

    affirmation: 'Tôi chuyển hóa cảm xúc thành sức mạnh — chiều sâu tâm hồn tôi là nguồn sáng tạo vô tận.',

    funFact: 'Song Ngư là cung có nhiều thiên tài âm nhạc nhất — Rihanna, Kurt Cobain, Johnny Cash, và Chopin đều là Song Ngư, và tất cả đều nổi tiếng với chiều sâu cảm xúc hiếm có trong âm nhạc.',
  },
}

// ============================================================
// ZODIAC_SHORT — 12 cung phiên bản viral
// ============================================================

export const ZODIAC_SHORT: Record<string, {
  oneliner: string
  emoji: string
  vibe: string
  redFlag: string
  greenFlag: string
}> = {
  aries: {
    oneliner: 'Bạch Dương: Xông vào trước, hỏi sau — và thường không sai',
    emoji: '🐏',
    vibe: 'First place or nothing, natural born starter',
    redFlag: 'Mất kiên nhẫn sau 3 phút chờ đợi',
    greenFlag: 'Sẽ đứng về phía bạn dù cả thế giới chống lại',
  },
  taurus: {
    oneliner: 'Kim Ngưu: Không cần nhiều, nhưng thứ gì có thì phải là tốt nhất',
    emoji: '🐂',
    vibe: 'Luxury minimalist, cozy chaos, loyal to death',
    redFlag: 'Bướng đến mức có thể cãi với sự kiện thực tế',
    greenFlag: 'Một khi đã tin bạn, trung thành tuyệt đối — không có điều kiện',
  },
  gemini: {
    oneliner: 'Song Tử: Có thể bàn về triết học và tám chuyện trong cùng một hơi thở',
    emoji: '👯',
    vibe: 'Main character energy, curious about everything, always online',
    redFlag: 'Đổi ý 3 lần trong 10 phút là bình thường',
    greenFlag: 'Không bao giờ để bạn cảm thấy nhàm chán',
  },
  cancer: {
    oneliner: 'Cự Giải: Nhớ mọi thứ bạn từng nói — kể cả từ năm ngoái',
    emoji: '🦀',
    vibe: 'Cottagecore, nấu ăn lúc 2 giờ sáng, feels everything deeply',
    redFlag: 'Cảm xúc thay đổi như thời tiết và không phải lúc nào cũng giải thích',
    greenFlag: 'Nhà bạn là nhà của họ — theo nghĩa đen và nghĩa bóng',
  },
  leo: {
    oneliner: 'Sư Tử: Không phải họ đòi được chú ý — ánh sáng tự nhiên tập trung vào họ',
    emoji: '🦁',
    vibe: 'Main character, red carpet always, generous to a fault',
    redFlag: 'Ego dễ vỡ dù bề ngoài tự tin vô đối',
    greenFlag: 'Sẽ hype bạn lên như PR manager không lương',
  },
  virgo: {
    oneliner: 'Xử Nữ: Đã thấy 5 lỗi trong email của bạn trước khi bạn gửi',
    emoji: '♍',
    vibe: 'Organized chaos, helpful perfectionist, overthinks everything lovingly',
    redFlag: 'Critiques bằng tình yêu — nhưng đôi khi hơi nhiều',
    greenFlag: 'Nếu bạn cần ai đó sửa CV, dọn nhà, và nghe bạn rant lúc 2 giờ sáng: Xử Nữ',
  },
  libra: {
    oneliner: 'Thiên Bình: Đẹp, duyên dáng, và đang cân nhắc xem nên ăn gì từ sáng đến giờ',
    emoji: '⚖️',
    vibe: 'Aesthetic everything, fairness obsessed, flirt without trying',
    redFlag: 'Nếu cần câu trả lời ngay lập tức — đừng hỏi Thiên Bình',
    greenFlag: 'Sẽ nghe cả hai phía câu chuyện và không phán xét',
  },
  scorpio: {
    oneliner: 'Bọ Cạp: Bí ẩn, mãnh liệt, và có trí nhớ của voi',
    emoji: '🦂',
    vibe: 'Dark academia, all or nothing, intensity is their love language',
    redFlag: 'Không bao giờ thực sự quên — chỉ là chưa đến lúc',
    greenFlag: 'Trung thành đến cùng khi đã chọn bạn vào vòng tin tưởng',
  },
  sagittarius: {
    oneliner: 'Nhân Mã: Đặt vé trước, suy nghĩ sau — và thường thấy đó là quyết định đúng',
    emoji: '🏹',
    vibe: 'Wanderlust, philosopher at heart, laugh through everything',
    redFlag: 'Cam kết là khái niệm họ đang "xem xét"',
    greenFlag: 'Sẽ mang bạn đến những cuộc phiêu lưu mà bạn không dám tự mình đi',
  },
  capricorn: {
    oneliner: 'Ma Kết: Đã lên kế hoạch cho 5 năm tới trong khi bạn còn đang lên giường ngủ',
    emoji: '🐐',
    vibe: 'CEO mindset at birth, stoic exterior warm interior, built different',
    redFlag: 'Workaholic — rest là từ họ đang học cách đánh vần',
    greenFlag: 'Nếu họ tin bạn đủ để chia sẻ kế hoạch tương lai — bạn đặc biệt với họ',
  },
  aquarius: {
    oneliner: 'Bảo Bình: Yêu nhân loại như một khái niệm, đôi khi khó chịu với người cụ thể',
    emoji: '🏺',
    vibe: 'Alien from the future, rebel with a cause, ironically mainstream-proof',
    redFlag: 'Emotionally unavailable là understatement',
    greenFlag: 'Sẽ defend human rights của bạn dù không biết bạn',
  },
  pisces: {
    oneliner: 'Song Ngư: Đang sống trong thực tế song song và không thể giải thích nó',
    emoji: '🐟',
    vibe: 'Ethereal, art is life, feels too much and creates from it',
    redFlag: 'Ranh giới cảm xúc gần như không tồn tại',
    greenFlag: 'Sẽ hiểu bạn ở tầng mà người khác không nhìn thấy',
  },
}

// ============================================================
// MBTI × ZODIAC AFFINITY


// ============================================================
// TƯƠNG HỢP
// ============================================================

export interface ZodiacCompatibility {
  score: number       // 1–10
  label: string       // "Tuyệt vời" | "Tốt" | "Trung bình" | "Cần nỗ lực"
  reason: string      // 1 câu lý do ngắn
  tip: string         // 1 câu gợi ý thực tế
}

/**
 * 78 cặp unique — key luôn theo alphabet: "aries+taurus" không phải "taurus+aries"
 * Thứ tự key: aries, taurus, gemini, cancer, leo, virgo,
 *             libra, scorpio, sagittarius, capricorn, aquarius, pisces
 *
 * Score guide:
 *   9–10 = Tuyệt vời (Tam Hợp / Nhị Hợp điển hình)
 *   7–8  = Tốt
 *   5–6  = Trung bình
 *   3–4  = Cần nỗ lực
 *
 * Nguồn: astrology.com/compatibility, cafeastrology.com/compatibility
 */

export const ZODIAC_COMPAT: Record<string, ZodiacCompatibility> = {

  // ── ARIES ──────────────────────────────────────────────────
  'aries+aries': {
    score: 7,
    label: 'Tốt',
    reason: 'Hai ngọn lửa cùng bùng cháy — nhiệt huyết, nhưng cần ai đó nhường trước.',
    tip: 'Phân rõ ai dẫn dắt lĩnh vực nào, tránh cạnh tranh không cần thiết.',
  },
  'aries+taurus': {
    score: 5,
    label: 'Trung bình',
    reason: 'Bạch Dương muốn đi nhanh, Kim Ngưu muốn đi chắc — hai nhịp độ khó sync.',
    tip: 'Bạch Dương cần kiên nhẫn hơn; Kim Ngưu cần linh hoạt hơn một chút.',
  },
  'aries+gemini': {
    score: 8,
    label: 'Tốt',
    reason: 'Cùng năng lượng cao và thích phiêu lưu — ít khi chán nhau.',
    tip: 'Cần ai đó chịu trách nhiệm về chi tiết thực tế trong cuộc sống chung.',
  },
  'aries+cancer': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Bạch Dương thẳng thắn, Cự Giải nhạy cảm — lời nói thiếu lọc dễ gây tổn thương.',
    tip: 'Bạch Dương cần mềm mỏng hơn; Cự Giải cần nói thẳng khi bị tổn thương thay vì im lặng.',
  },
  'aries+leo': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Lửa hiểu nhau về nhiệt huyết và tham vọng — cặp đôi rực rỡ.',
    tip: 'Cả hai đều cần được chú ý — nhớ dành ánh đèn cho nhau thay vì cạnh tranh.',
  },
  'aries+virgo': {
    score: 5,
    label: 'Trung bình',
    reason: 'Bạch Dương bốc đồng, Xử Nữ cẩn thận — phong cách ra quyết định đối lập.',
    tip: 'Xử Nữ cần bớt phê bình; Bạch Dương cần lắng nghe phân tích của Xử Nữ trước khi hành động.',
  },
  'aries+libra': {
    score: 6,
    label: 'Trung bình',
    reason: 'Đối lập nhau trên hoàng đạo — hút nhau mạnh nhưng xung đột cũng mạnh.',
    tip: 'Bạch Dương học từ sự cân nhắc của Thiên Bình; Thiên Bình học từ sự quyết đoán của Bạch Dương.',
  },
  'aries+scorpio': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cả hai đều mạnh mẽ và không chịu thua — sức hút lớn, xung đột cũng không nhỏ.',
    tip: 'Cần học cách buông — không phải mọi trận đều cần thắng.',
  },
  'aries+sagittarius': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Lửa tự do — cùng yêu phiêu lưu, không ai cảm thấy bị giam cầm.',
    tip: 'Cần xây dựng một số routine chung để mối quan hệ có điểm neo.',
  },
  'aries+capricorn': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Bạch Dương hành động theo bản năng; Ma Kết hành động theo kế hoạch — hai cách tiếp cận cuộc sống khác biệt căn bản.',
    tip: 'Cả hai đều tham vọng — tìm điểm chung trong mục tiêu, khác nhau về cách đạt.',
  },
  'aries+aquarius': {
    score: 8,
    label: 'Tốt',
    reason: 'Cùng yêu tự do và không thích bị kiểm soát — tôn trọng không gian của nhau tự nhiên.',
    tip: 'Aquarius cần biểu đạt cảm xúc nhiều hơn; Aries cần kiên nhẫn với tư duy trừu tượng của Aquarius.',
  },
  'aries+pisces': {
    score: 5,
    label: 'Trung bình',
    reason: 'Bạch Dương trực tiếp, Song Ngư mơ màng — hai ngôn ngữ cảm xúc khác nhau.',
    tip: 'Bạch Dương cần nhẹ nhàng hơn; Song Ngư cần rõ ràng hơn về nhu cầu của mình.',
  },

  // ── TAURUS ─────────────────────────────────────────────────
  'taurus+taurus': {
    score: 7,
    label: 'Tốt',
    reason: 'Hiểu nhau sâu sắc về nhu cầu ổn định — nguy cơ là routine quá cứng nhắc.',
    tip: 'Chủ động tạo ra những thay đổi nhỏ để tránh mối quan hệ hóa đá.',
  },
  'taurus+gemini': {
    score: 5,
    label: 'Trung bình',
    reason: 'Kim Ngưu cần ổn định, Song Tử cần kích thích mới — hai nhu cầu cơ bản xung đột.',
    tip: 'Kim Ngưu cần linh hoạt hơn; Song Tử cần cam kết hơn.',
  },
  'taurus+cancer': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Cả hai đều xây dựng gia đình, ổn định, và yêu thương qua chăm sóc — hiểu nhau không cần giải thích.',
    tip: 'Cùng nhau học cách thay đổi và phát triển thay vì chỉ bảo tồn.',
  },
  'taurus+leo': {
    score: 5,
    label: 'Trung bình',
    reason: 'Cả hai đều stubborn theo cách riêng — ai sẽ nhường trước là câu hỏi không có câu trả lời dễ.',
    tip: 'Taurus cần ghi nhận Sư Tử; Sư Tử cần tôn trọng nhịp độ của Taurus.',
  },
  'taurus+virgo': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Đất tương sinh — cùng thực dụng, đáng tin cậy, và xây dựng từng bước.',
    tip: 'Tránh trở nên quá nhàm chán — lên kế hoạch cho những trải nghiệm mới dù nhỏ.',
  },
  'taurus+libra': {
    score: 7,
    label: 'Tốt',
    reason: 'Cùng cai trị bởi Sao Kim — chia sẻ tình yêu với cái đẹp, nghệ thuật, và sự hài hòa.',
    tip: 'Taurus cần quyết đoán hơn khi Libra do dự; Libra cần nhắc Taurus về sự linh hoạt.',
  },
  'taurus+scorpio': {
    score: 7,
    label: 'Tốt',
    reason: 'Đối lập nhau — Kim Ngưu và Bọ Cạp cùng trung thành, cùng Fixed, cùng intense trong tình yêu.',
    tip: 'Cả hai đều stubborn — cần học cách buông bỏ quyền kiểm soát trong những tình huống nhỏ.',
  },
  'taurus+sagittarius': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Kim Ngưu muốn ổn định tại chỗ; Nhân Mã muốn khám phá thế giới — lifestyle không match.',
    tip: 'Tìm điểm chung trong những trải nghiệm mới được lên kế hoạch kỹ — giải pháp giữa hai thái cực.',
  },
  'taurus+capricorn': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Đất cùng tầm nhìn dài hạn và cùng xây dựng bền vững — đây là cặp đôi "đế chế".',
    tip: 'Nhớ tận hưởng hành trình, không chỉ chú tâm vào đích đến.',
  },
  'taurus+aquarius': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Kim Ngưu muốn truyền thống; Bảo Bình muốn cách mạng — giá trị căn bản khác nhau.',
    tip: 'Aquarius cần tôn trọng nhu cầu ổn định; Taurus cần cởi mở với những ý tưởng khác thường.',
  },
  'taurus+pisces': {
    score: 8,
    label: 'Tốt',
    reason: 'Kim Ngưu tạo nền tảng; Song Ngư mang chiều sâu cảm xúc — bổ sung cho nhau đẹp.',
    tip: 'Kim Ngưu cần kiên nhẫn với sự mơ màng của Song Ngư; Song Ngư cần học cách hiện diện thực tế hơn.',
  },

  // ── GEMINI ─────────────────────────────────────────────────
  'gemini+gemini': {
    score: 7,
    label: 'Tốt',
    reason: 'Không bao giờ nhàm — hai Song Tử gặp nhau là cuộc trò chuyện không bao giờ hết chủ đề.',
    tip: 'Ai đó cần lo phần thực tế — cả hai đều muốn bay cao mà chưa nghĩ ai giữ dây.',
  },
  'gemini+cancer': {
    score: 5,
    label: 'Trung bình',
    reason: 'Song Tử thích vui vẻ bề mặt; Cự Giải cần chiều sâu cảm xúc — hai nhu cầu khó dung hòa.',
    tip: 'Gemini cần học cách ngồi với cảm xúc nặng; Cancer cần học cách nhẹ nhàng hơn đôi khi.',
  },
  'gemini+leo': {
    score: 8,
    label: 'Tốt',
    reason: 'Cả hai đều hướng ngoại, vui vẻ, và yêu sự chú ý — không ai làm tắt ngọn lửa của người kia.',
    tip: 'Song Tử cần cam kết hơn; Sư Tử cần tôn trọng sự tự do của Song Tử.',
  },
  'gemini+virgo': {
    score: 5,
    label: 'Trung bình',
    reason: 'Cùng cai trị bởi Sao Thủy nhưng dùng nó khác nhau — Gemini mở rộng, Virgo đào sâu.',
    tip: 'Học từ điểm mạnh của nhau: Virgo cần bớt phê bình; Gemini cần hoàn thành trước khi bắt đầu tiếp.',
  },
  'gemini+libra': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Khí — cùng yêu trí tuệ, nghệ thuật, và giao tiếp; cùng tần số hiếm thấy.',
    tip: 'Cần ai đó đưa ra quyết định — cả hai đều có xu hướng trì hoãn.',
  },
  'gemini+scorpio': {
    score: 5,
    label: 'Trung bình',
    reason: 'Gemini ở bề mặt; Scorpio muốn bước xuống tầng sâu nhất — hai cách kết nối khác biệt.',
    tip: 'Scorpio cần bớt intensity đôi khi; Gemini cần chịu khó vào chiều sâu hơn.',
  },
  'gemini+sagittarius': {
    score: 8,
    label: 'Tốt',
    reason: 'Đối lập nhau — Gemini thông tin, Sagittarius ý nghĩa; cùng nhau tạo ra bức tranh đầy đủ.',
    tip: 'Cả hai cần cam kết hơn để mối quan hệ có nền tảng.',
  },
  'gemini+capricorn': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Gemini bay bổng; Capricorn bám đất — khó tìm ngôn ngữ chung.',
    tip: 'Capricorn có thể học vui hơn từ Gemini; Gemini có thể học kiên định hơn từ Capricorn.',
  },
  'gemini+aquarius': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Khí cùng tần số trí tuệ — đây là cặp đôi bàn luận và khám phá ý tưởng.',
    tip: 'Cần chủ động tạo kết nối cảm xúc sâu hơn — không chỉ trí tuệ.',
  },
  'gemini+pisces': {
    score: 5,
    label: 'Trung bình',
    reason: 'Gemini logic; Pisces cảm xúc — đôi khi không nói cùng ngôn ngữ.',
    tip: 'Gemini cần học cách feel hơn; Pisces cần learn cách express rõ hơn.',
  },

  // ── CANCER ─────────────────────────────────────────────────
  'cancer+cancer': {
    score: 7,
    label: 'Tốt',
    reason: 'Hiểu nhau sâu sắc về cảm xúc — nguy cơ cả hai cùng chìm vào khi khủng hoảng.',
    tip: 'Cần ai đó là người "mạnh" khi người kia đang yếu — không thể cùng sụp đổ một lúc.',
  },
  'cancer+leo': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cự Giải nuôi dưỡng; Sư Tử cần sân khấu — có thể bổ sung nếu Sư Tử biết trân trọng.',
    tip: 'Leo cần để Cự Giải cảm thấy được yêu thương an toàn; Cancer cần học cách ngưỡng mộ Leo thẳng thắn.',
  },
  'cancer+virgo': {
    score: 8,
    label: 'Tốt',
    reason: 'Cùng yêu chăm sóc và chi tiết — Cự Giải bằng cảm xúc, Xử Nữ bằng hành động cụ thể.',
    tip: 'Virgo cần học cách biểu đạt tình cảm bằng lời ngoài hành động; Cancer cần bớt nhạy cảm với phê bình của Virgo.',
  },
  'cancer+libra': {
    score: 5,
    label: 'Trung bình',
    reason: 'Cancer cần cam kết sâu; Libra cần cân bằng và đôi khi khoảng cách — hai nhu cầu xung đột.',
    tip: 'Libra cần rõ ràng hơn về cam kết; Cancer cần tôn trọng không gian cá nhân của Libra.',
  },
  'cancer+scorpio': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Nước — hiểu nhau ở tầng cảm xúc không cần giải thích, trung thành tuyệt đối.',
    tip: 'Cần tránh kéo nhau xuống khi cả hai cùng trong trạng thái tối tăm.',
  },
  'cancer+sagittarius': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Cancer cần ổn định và gần gũi; Sagittarius cần tự do và khoảng cách — xung đột cơ bản.',
    tip: 'Sagittarius cần committed hơn; Cancer cần học cách không đọc sự tự do là từ bỏ.',
  },
  'cancer+capricorn': {
    score: 7,
    label: 'Tốt',
    reason: 'Đối lập trên hoàng đạo — cùng gia đình là ưu tiên, khác nhau về cách biểu đạt.',
    tip: 'Capricorn cần học cách mềm mỏng hơn; Cancer cần tôn trọng khi Capricorn cần làm việc.',
  },
  'cancer+aquarius': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Cancer cần kết nối cá nhân sâu; Aquarius quan tâm nhân loại trừu tượng — khoảng cách cảm xúc lớn.',
    tip: 'Aquarius cần học cách hiện diện cảm xúc hơn; Cancer cần tôn trọng nhu cầu độc lập của Aquarius.',
  },
  'cancer+pisces': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Nước — cùng cảm xúc sâu sắc, cùng trực giác, cùng nuôi dưỡng nhau bản năng.',
    tip: 'Cả hai cần ai đó thực tế để giữ chân xuống mặt đất — hoặc tự xây dựng thói quen thực tế cùng nhau.',
  },

  // ── LEO ────────────────────────────────────────────────────
  'leo+leo': {
    score: 7,
    label: 'Tốt',
    reason: 'Hai ngôi sao gặp nhau — rực rỡ, nhưng cần học cách nhường sân khấu.',
    tip: 'Celebrate nhau thay vì cạnh tranh spotlight.',
  },
  'leo+virgo': {
    score: 5,
    label: 'Trung bình',
    reason: 'Sư Tử muốn được ngưỡng mộ; Xử Nữ có xu hướng phân tích và phê bình — không phải combo tự nhiên.',
    tip: 'Virgo cần học cách ngưỡng mộ trước khi phê bình; Leo cần học cách tiếp thu feedback.',
  },
  'leo+libra': {
    score: 8,
    label: 'Tốt',
    reason: 'Cả hai đều yêu cái đẹp, xã giao, và được nhìn nhận — cặp đôi social butterfly đẹp nhất.',
    tip: 'Leo cần lắng nghe nhiều hơn; Libra cần quyết đoán hơn khi cần thiết.',
  },
  'leo+scorpio': {
    score: 5,
    label: 'Trung bình',
    reason: 'Hai cung Fixed mạnh nhất — sức hút lớn, ego lớn, không ai chịu thua.',
    tip: 'Cả hai cần học cách thua trong những chuyện nhỏ để thắng trong những thứ quan trọng hơn.',
  },
  'leo+sagittarius': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Lửa — nhiệt huyết, phiêu lưu, và cùng tôn trọng tự do của nhau.',
    tip: 'Cần xây dựng cam kết và routine để mối quan hệ không chỉ là highlight reel.',
  },
  'leo+capricorn': {
    score: 5,
    label: 'Trung bình',
    reason: 'Leo cần được chú ý; Capricorn tập trung vào công việc và ít quan tâm đến màn trình diễn.',
    tip: 'Capricorn cần dành thời gian ngưỡng mộ Leo; Leo cần tôn trọng kỷ luật của Capricorn.',
  },
  'leo+aquarius': {
    score: 6,
    label: 'Trung bình',
    reason: 'Đối lập — Leo cá nhân, Aquarius tập thể; hút nhau mạnh vì bổ sung nhau.',
    tip: 'Học từ sự khác biệt: Leo cần bớt ego; Aquarius cần bớt detached.',
  },
  'leo+pisces': {
    score: 6,
    label: 'Trung bình',
    reason: 'Leo ánh sáng; Pisces chiều sâu — có thể tuyệt vời nếu Leo không lấn át Song Ngư.',
    tip: 'Leo cần học cách lắng nghe chiều sâu cảm xúc của Pisces; Pisces cần học cách rõ ràng về nhu cầu.',
  },

  // ── VIRGO ──────────────────────────────────────────────────
  'virgo+virgo': {
    score: 7,
    label: 'Tốt',
    reason: 'Hiểu nhau về chuẩn mực và chi tiết — nguy cơ là phê bình nhau quá mức.',
    tip: 'Áp dụng sự rộng lượng với người khác vào mối quan hệ của mình.',
  },
  'virgo+libra': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cả hai đều muốn hài hòa nhưng theo cách khác nhau — Virgo qua chi tiết, Libra qua ngoại giao.',
    tip: 'Virgo cần bớt phân tích; Libra cần rõ ràng hơn về quan điểm thật.',
  },
  'virgo+scorpio': {
    score: 8,
    label: 'Tốt',
    reason: 'Cả hai đều đi sâu — Virgo vào chi tiết, Scorpio vào chiều sâu — tôn trọng sự nghiêm túc của nhau.',
    tip: 'Scorpio cần bớt secretive với Virgo; Virgo cần bớt phê bình và trust Scorpio.',
  },
  'virgo+sagittarius': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Virgo chi tiết; Sagittarius bức tranh lớn — cách nhìn thế giới đối lập.',
    tip: 'Virgo cần learn cách relax; Sagittarius cần learn cách chú ý chi tiết.',
  },
  'virgo+capricorn': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Đất cùng thực dụng và cùng xây dựng — đây là cặp đôi achiever.',
    tip: 'Nhớ kết nối cảm xúc bên cạnh kết nối qua công việc và mục tiêu.',
  },
  'virgo+aquarius': {
    score: 5,
    label: 'Trung bình',
    reason: 'Virgo chi tiết và truyền thống; Aquarius lớn và đột phá — khó cùng nhịp.',
    tip: 'Virgo học open-mindedness từ Aquarius; Aquarius học implementation từ Virgo.',
  },
  'virgo+pisces': {
    score: 7,
    label: 'Tốt',
    reason: 'Đối lập nhau — Virgo thực tế, Pisces mơ mộng; bổ sung nhau nếu tôn trọng sự khác biệt.',
    tip: 'Virgo cần ôm lấy chiều sâu cảm xúc của Pisces; Pisces cần học cách cụ thể hóa ý tưởng từ Virgo.',
  },

  // ── LIBRA ──────────────────────────────────────────────────
  'libra+libra': {
    score: 7,
    label: 'Tốt',
    reason: 'Hiểu nhau về cần hài hòa — nguy cơ là không ai đưa ra quyết định.',
    tip: 'Thay phiên nhau làm người quyết định — quy định trước để tránh paralysis đôi.',
  },
  'libra+scorpio': {
    score: 6,
    label: 'Trung bình',
    reason: 'Libra nhẹ nhàng; Scorpio mãnh liệt — intensity của Scorpio đôi khi overwhelm Libra.',
    tip: 'Scorpio cần bớt intense; Libra cần học cách deal với depth hơn là avoid.',
  },
  'libra+sagittarius': {
    score: 8,
    label: 'Tốt',
    reason: 'Cùng yêu sự phiêu lưu trí tuệ, văn hóa, và cuộc sống rộng lớn — match tốt.',
    tip: 'Libra cần quyết đoán hơn; Sagittarius cần cam kết hơn.',
  },
  'libra+capricorn': {
    score: 5,
    label: 'Trung bình',
    reason: 'Libra xã hội và linh hoạt; Capricorn nghiêm túc và có cấu trúc — khó tìm tiếng chung.',
    tip: 'Capricorn học cách thư giãn hơn; Libra học cách serious hơn khi cần.',
  },
  'libra+aquarius': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Khí — cùng yêu tự do, trí tuệ, và sự công bằng; tìm thấy người bạn đồng hành hiếm gặp.',
    tip: 'Cùng nhau xây dựng kết nối cảm xúc sâu hơn bên cạnh kết nối trí tuệ.',
  },
  'libra+pisces': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cả hai mơ mộng và lãng mạn — nhưng ai sẽ lo phần thực tế?',
    tip: 'Cần có kế hoạch rõ ràng cho những quyết định thực tế để mối quan hệ không chỉ là lý tưởng hóa.',
  },

  // ── SCORPIO ────────────────────────────────────────────────
  'scorpio+scorpio': {
    score: 7,
    label: 'Tốt',
    reason: 'Hiểu nhau về chiều sâu và intensity — nguy cơ là cả hai cùng toxic nếu không lành mạnh.',
    tip: 'Cần trust tuyệt đối — và học cách tha thứ vì cả hai đều nhớ dai.',
  },
  'scorpio+sagittarius': {
    score: 5,
    label: 'Trung bình',
    reason: 'Scorpio muốn depth và exclusivity; Sagittarius muốn freedom và breadth — xung đột cơ bản.',
    tip: 'Scorpio cần cho Sagittarius không gian; Sagittarius cần cho Scorpio sự trung thành.',
  },
  'scorpio+capricorn': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Cùng tham vọng, cùng kiên định, cùng không tin tưởng ai dễ dàng — hiểu nhau không cần giải thích.',
    tip: 'Cùng nhau học cách mở lòng và tận hưởng thay vì chỉ chinh phục.',
  },
  'scorpio+aquarius': {
    score: 4,
    label: 'Cần nỗ lực',
    reason: 'Scorpio cần sở hữu; Aquarius không thuộc về ai — xung đột về bản chất của mối quan hệ.',
    tip: 'Scorpio cần học cách tin tưởng; Aquarius cần học cách cam kết cụ thể hơn.',
  },
  'scorpio+pisces': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Hai cung Nước mạnh nhất — chiều sâu cảm xúc của cả hai tìm thấy nhau; kết nối tâm hồn hiếm gặp.',
    tip: 'Cả hai cần người ngoài để kéo ra thế giới thực tế đôi khi.',
  },

  // ── SAGITTARIUS ────────────────────────────────────────────
  'sagittarius+sagittarius': {
    score: 8,
    label: 'Tốt',
    reason: 'Hai Nhân Mã — không ai cảm thấy bị giam cầm; cùng tần số phiêu lưu.',
    tip: 'Cần ai đó chịu trách nhiệm về kế hoạch dài hạn — cả hai đều muốn sống trong hiện tại.',
  },
  'sagittarius+capricorn': {
    score: 5,
    label: 'Trung bình',
    reason: 'Nhân Mã tự do; Ma Kết kỷ luật — hai triết lý sống khác nhau.',
    tip: 'Capricorn học cách thoải mái từ Sagittarius; Sagittarius học cách có kế hoạch từ Capricorn.',
  },
  'sagittarius+aquarius': {
    score: 9,
    label: 'Tuyệt vời',
    reason: 'Cùng yêu tự do, ý tưởng lớn, và không bị ràng buộc bởi convention — match triết học.',
    tip: 'Cần xây dựng thêm kết nối cảm xúc sâu để mối quan hệ không chỉ là friendship.',
  },
  'sagittarius+pisces': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cùng Mutable — cả hai linh hoạt và mơ mộng; nhưng ai sẽ lo thực tế?',
    tip: 'Sagittarius thẳng thắn có thể hurt Pisces — cần học cách deliver honesty với kindness.',
  },

  // ── CAPRICORN ──────────────────────────────────────────────
  'capricorn+capricorn': {
    score: 8,
    label: 'Tốt',
    reason: 'Hiểu nhau về tham vọng và kỷ luật — cặp đôi xây dựng đế chế cùng nhau.',
    tip: 'Nhớ nghỉ ngơi và tận hưởng — cả hai cần ai đó nhắc rằng cuộc sống không chỉ là công việc.',
  },
  'capricorn+aquarius': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cùng cai trị bởi Sao Thổ trong truyền thống — nhưng Capricorn truyền thống, Aquarius cách mạng.',
    tip: 'Học từ nhau: Capricorn cần tầm nhìn của Aquarius; Aquarius cần tính thực tế của Capricorn.',
  },
  'capricorn+pisces': {
    score: 8,
    label: 'Tốt',
    reason: 'Bổ sung hoàn hảo — Capricorn là nền tảng; Pisces là chiều sâu cảm xúc mà Capricorn thiếu.',
    tip: 'Capricorn cần học cách mở lòng hơn; Pisces cần học cách hiện thực hóa ước mơ với Capricorn.',
  },

  // ── AQUARIUS ───────────────────────────────────────────────
  'aquarius+aquarius': {
    score: 8,
    label: 'Tốt',
    reason: 'Hiểu nhau về nhu cầu tự do và tư duy độc lập — không ai cảm thấy bị kiểm soát.',
    tip: 'Cần chủ động xây dựng kết nối cảm xúc — không tự nhiên đến với cả hai.',
  },
  'aquarius+pisces': {
    score: 6,
    label: 'Trung bình',
    reason: 'Cùng nhân văn và phi thường — nhưng Aquarius trí tuệ, Pisces cảm xúc; đôi khi ngôn ngữ khác.',
    tip: 'Aquarius cần học cách cảm nhận hơn; Pisces cần học cách thực tế hơn.',
  },

  // ── PISCES ─────────────────────────────────────────────────
  'pisces+pisces': {
    score: 7,
    label: 'Tốt',
    reason: 'Hiểu nhau ở tầng cảm xúc không ai khác hiểu — nguy cơ là cả hai cùng chìm.',
    tip: 'Cần ai đó giữ cả hai kết nối với thực tế — hoặc tự xây dựng thói quen thực tế cùng nhau.',
  },
}

// ============================================================
// SHORT CONTENT & MBTI AFFINITY

export const MBTI_ZODIAC_AFFINITY: Record<string, {
  commonSigns: string[]
  note: string
}> = {
  INTJ: {
    commonSigns: ['scorpio', 'capricorn', 'aquarius'],
    note: 'Cả ba đều có xu hướng chiều sâu, chiến lược dài hạn, và không bị ảnh hưởng bởi ý kiến số đông — phù hợp với INTJ.',
  },
  INTP: {
    commonSigns: ['aquarius', 'gemini', 'scorpio'],
    note: 'Tư duy hệ thống, tò mò không giới hạn, và xu hướng phân tích từ nhiều góc độ — đặc điểm chung của cả hai.',
  },
  ENTJ: {
    commonSigns: ['capricorn', 'leo', 'aries'],
    note: 'Tham vọng, lãnh đạo bẩm sinh, và không ngại đưa ra quyết định khó — những cung này mang năng lượng tương tự.',
  },
  ENTP: {
    commonSigns: ['gemini', 'aquarius', 'sagittarius'],
    note: 'Tranh luận vì hứng thú, ý tưởng đột phá, và không chấp nhận câu trả lời "vì vậy nó vẫn luôn thế" — ba cung này cùng năng lượng.',
  },
  INFJ: {
    commonSigns: ['scorpio', 'pisces', 'cancer'],
    note: 'Trực giác sâu, tìm kiếm ý nghĩa trong mọi thứ, và kết nối ở tầng tâm hồn — đặc trưng chung của nhóm Nước và INFJ.',
  },
  INFP: {
    commonSigns: ['pisces', 'cancer', 'libra'],
    note: 'Lý tưởng hóa, nghệ thuật như ngôn ngữ cảm xúc, và tìm kiếm sự thật bên trong — ba cung này chia sẻ thế giới nội tâm phong phú.',
  },
  ENFJ: {
    commonSigns: ['leo', 'libra', 'cancer'],
    note: 'Lãnh đạo bằng cảm hứng, quan tâm đến sự phát triển của người khác, và tạo ra môi trường hài hòa — cùng xu hướng với ENFJ.',
  },
  ENFP: {
    commonSigns: ['sagittarius', 'gemini', 'aries'],
    note: 'Năng lượng cao, sáng tạo không ngừng, và niềm tin rằng mọi thứ đều có thể — ba cung này chia sẻ spirit tương tự ENFP.',
  },
  ISTJ: {
    commonSigns: ['capricorn', 'taurus', 'virgo'],
    note: 'Đáng tin cậy, kỷ luật, và thực dụng — ba cung Đất này và ISTJ cùng coi trọng trách nhiệm và kết quả cụ thể.',
  },
  ISFJ: {
    commonSigns: ['cancer', 'virgo', 'taurus'],
    note: 'Chăm sóc qua hành động, nhớ từng chi tiết quan trọng với người thân, và tạo ra sự ổn định — đặc điểm chung rõ rệt.',
  },
  ESTJ: {
    commonSigns: ['capricorn', 'aries', 'leo'],
    note: 'Cấu trúc, quyết đoán, và không ngại lãnh đạo — những cung này mang năng lượng tổ chức và thực thi tương tự ESTJ.',
  },
  ESFJ: {
    commonSigns: ['libra', 'cancer', 'leo'],
    note: 'Hài hòa xã hội, quan tâm đến cảm xúc của mọi người, và tạo ra môi trường ấm áp — đặc trưng chung với ESFJ.',
  },
  ISTP: {
    commonSigns: ['capricorn', 'scorpio', 'virgo'],
    note: 'Thực dụng, phân tích, và ít nói nhưng hành động hiệu quả — ba cung này chia sẻ xu hướng giải quyết vấn đề của ISTP.',
  },
  ISFP: {
    commonSigns: ['pisces', 'libra', 'taurus'],
    note: 'Nghệ thuật như ngôn ngữ tự nhiên, cảm thụ vẻ đẹp tinh tế, và thể hiện cảm xúc qua sáng tạo — phù hợp với ISFP.',
  },
  ESTP: {
    commonSigns: ['aries', 'sagittarius', 'gemini'],
    note: 'Hành động ngay, thích nghi nhanh, và tìm cơ hội trong mọi tình huống — ba cung này và ESTP cùng năng lượng thực tế năng động.',
  },
  ESFP: {
    commonSigns: ['leo', 'sagittarius', 'aries'],
    note: 'Sống trong khoảnh khắc hiện tại, mang lại niềm vui, và không thích ở phía sau hậu trường — đặc điểm chung rõ rệt với ESFP.',
  },
}
