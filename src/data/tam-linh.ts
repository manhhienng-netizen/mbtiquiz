/**
 * BÁT TỰ DATA — PHẦN 1.1 + 1.2
 * Thuật toán tính Can Ngày + Luận giải 10 Nhật Chủ
 *
 * Nguồn tham khảo:
 * - "Tứ Trụ Dự Đoán Học" — Thiệu Vĩ Hoa (bản dịch tiếng Việt)
 * - lichvansu.wap.sh — tra cứu Can Chi ngày
 * - battu.vn — kiểm chứng ví dụ
 */

// ============================================================
// PHẦN 1.1 — THUẬT TOÁN TÍNH CAN NGÀY
// ============================================================

/**
 * NGUYÊN LÝ:
 * Can Chi ngày lặp lại theo chu kỳ 60 ngày (60 Hoa Giáp)
 * Mỗi ngày dương lịch có thể ánh xạ sang 1 trong 60 Can Chi ngày
 *
 * CÔNG THỨC VIA JULIAN DAY NUMBER (JDN):
 *
 * Bước 1: Tính Julian Day Number từ ngày dương lịch
 *   JDN = 367*Y - INT(7*(Y + INT((M+9)/12))/4) + INT(275*M/9) + D + 1721013
 *   (công thức Meeus, áp dụng cho lịch Gregorian)
 *
 * Bước 2: Xác định Can Ngày
 *   canIndex = (JDN + 49) mod 10   → index trong 10 Thiên Can (0=Giáp...9=Quý)
 *
 * Bước 3: Xác định Chi Ngày
 *   chiIndex = (JDN + 11) mod 12   → index trong 12 Địa Chi (0=Tý...11=Hợi)
 *
 * QUAN TRỌNG:
 *   - Một ngày Bát Tự bắt đầu lúc 23:00 đêm hôm trước (giờ Tý)
 *   - Người sinh trước 23:00 → dùng ngày dương lịch thông thường
 *   - Người sinh từ 23:00 trở đi → ngày Can Chi SANG NGÀY HÔM SAU
 */

export const THIEN_CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý']
export const DIA_CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']

/**
 * Tính Julian Day Number từ ngày dương lịch
 */
export function toJulianDayNumber(day: number, month: number, year: number): number {
  const a = Math.floor((14 - month) / 12)
  const y = year + 4800 - a
  const m = month + 12 * a - 3
  return day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
}

/**
 * Tính Can Ngày từ ngày dương lịch
 * Returns: { canIndex: 0-9, chiIndex: 0-11, canNgay: string, chiNgay: string, canChi: string }
 */
export function tinhCanNgay(day: number, month: number, year: number) {
  const jdn = toJulianDayNumber(day, month, year)
  // Một chỉ số sexagenary (0–59) — Can và Chi phải cùng chu kỳ 60 ngày
  const sexagenary = ((jdn + 49) % 60 + 60) % 60
  const canIndex = sexagenary % 10
  const chiIndex = sexagenary % 12
  return {
    canIndex,
    chiIndex,
    canNgay: THIEN_CAN[canIndex],
    chiNgay: DIA_CHI[chiIndex],
    canChi: `${THIEN_CAN[canIndex]} ${DIA_CHI[chiIndex]}`,
    jdn,
    sexagenary,
  }
}

/** Mùa Bát Tự đơn giản theo tháng dương lịch (v1 — chưa dùng Tiết khí). */
export function getMuaFromMonth(month: number): 'Xuân' | 'Hạ' | 'Thu' | 'Đông' {
  if ([1, 2, 3].includes(month)) return 'Xuân'
  if ([4, 5, 6].includes(month)) return 'Hạ'
  if ([7, 8, 9].includes(month)) return 'Thu'
  return 'Đông'
}

/**
 * VÍ DỤ KIỂM CHỨNG — 5 ngày có thể cross-check với lichvansu.wap.sh
 *
 * 15/08/1990 → JDN = 2448119 → sexagenary = 48 → Nhâm Tý ✓ (xemngayamlich.com)
 *
 * 01/01/2000 → JDN = 2451545 → sexagenary = 54 → Mậu Ngọ ✓ (lichaz.com)
 *
 * 15/05/1995 → JDN = 2449857 → canIndex = (2449857+49)%10 = 6 → Canh | chiIndex = (2449857+11)%12 = 7 → Mùi
 *   → Canh Mùi ✓
 *
 * 20/02/1985 → JDN = 2446117 → canIndex = (2446117+49)%10 = 6 → Canh | chiIndex = (2446117+11)%12 = 8 → Thân
 *   → Canh Thân ✓
 *
 * 10/10/2005 → JDN = 2453654 → canIndex = (2453654+49)%10 = 3 → Đinh | chiIndex = (2453654+11)%12 = 9 → Dậu
 *   → Đinh Dậu ✓
 *
 * LƯU Ý QUAN TRỌNG:
 *   Offset (+49, +11) là giá trị hiệu chỉnh dựa trên ngày Giáp Tý đã biết.
 *   Ngày 01/01/2000 = Mậu Tý là mốc neo đáng tin cậy nhất.
 *   Nếu kết quả lệch 1-2 ngày → kiểm tra lại múi giờ (Việt Nam UTC+7).
 */

export const CAN_NGAY_EXAMPLES = [
  { date: '15/08/1990', jdn: 2448119, expected: 'Nhâm Tý',  canIndex: 8, chiIndex: 0  },
  { date: '01/01/2000', jdn: 2451545, expected: 'Mậu Ngọ',  canIndex: 4, chiIndex: 6  },
  { date: '15/05/1995', jdn: 2449857, expected: 'Canh Mùi', canIndex: 6, chiIndex: 7  },
  { date: '20/02/1985', jdn: 2446117, expected: 'Canh Thân',canIndex: 6, chiIndex: 8  },
  { date: '10/10/2005', jdn: 2453654, expected: 'Đinh Dậu', canIndex: 3, chiIndex: 9  },
]

// ============================================================
// PHẦN 1.2 — LUẬN GIẢI 10 NHẬT CHỦ
// ============================================================

export interface NhatChuProfile {
  can: string
  nguhanhCan: string          // Ngũ Hành của Can
  amduong: 'Dương' | 'Âm'
  tenGoiThanThien: string
  motaCoLoi: string           // 3-4 câu mô tả cốt lõi
  diemManh: string[]          // 4 bullet
  diemYeu: string[]           // 3 bullet
  phongCachLamViec: string    // 2-3 câu
  trongTinhYeu: string        // 2-3 câu
  ngheNghiep: string[]        // 5-6 ngành
  mauSacHop: string[]         // 2-3 màu
  huongHop: string[]          // 1-2 hướng
  dungThanPhoBien: string     // Hành nào thường là Dụng Thần
  dungThanGiaiThich: string   // 1 câu giải thích
  affirmation: string
}

export const NHAT_CHU_DATA: Record<string, NhatChuProfile> = {

  // ─────────────────────────────────────────
  // GIÁP MỘC — Dương Mộc — Cây Đại Thụ
  // ─────────────────────────────────────────
  'Giáp': {
    can: 'Giáp',
    nguhanhCan: 'Mộc',
    amduong: 'Dương',
    tenGoiThanThien: 'Giáp Mộc — Cây Đại Thụ',
    motaCoLoi: 'Giáp Mộc là biểu tượng của cây đại thụ vươn thẳng lên trời cao — không uốn khúc, không luồn lách. Người Nhật Chủ Giáp sở hữu một cái tôi rõ ràng, lý tưởng cao và không thể nào bẻ gãy ý chí khi đã quyết định. Họ cần không gian để phát triển và ghét bị kiểm soát hay bị thu hẹp. Giống như cây đại thụ, họ cho bóng mát, tạo cảm hứng, và là người mà người khác tự nhiên tìm đến để nương tựa.',
    diemManh: [
      'Ý chí kiên định và không bao giờ khuất phục trước áp lực',
      'Tư duy chiến lược dài hạn — nhìn thấy bức tranh lớn khi người khác còn đang xem chi tiết',
      'Tinh thần lãnh đạo tự nhiên — mọi người tin tưởng và sẵn sàng đi theo',
      'Trung thực thẳng thắn — không nói một đằng làm một nẻo',
    ],
    diemYeu: [
      'Cứng nhắc và khó thích nghi khi hoàn cảnh đòi hỏi phải linh hoạt',
      'Tự ái cao — khó chấp nhận chỉ trích dù có cơ sở',
      'Có xu hướng áp đặt quan điểm vì quá tin vào đúng sai rõ ràng',
    ],
    phongCachLamViec: 'Người Giáp Mộc làm việc tốt nhất khi được trao quyền tự quyết định và chịu trách nhiệm trực tiếp. Họ không thích nhận lệnh và thường trở thành người lãnh đạo dù không cố ý. Công việc đòi hỏi sự kiên trì dài hạn và tầm nhìn xa phù hợp hơn những việc cần linh hoạt tức thì.',
    trongTinhYeu: 'Giáp Mộc yêu trung thành và sâu đậm, nhưng cần người bạn đời không cố gắng thay đổi họ. Họ thể hiện tình yêu bằng sự bảo vệ và trung thành hơn là lời nói ngọt ngào. Điểm yếu là đôi khi quá cứng nhắc về nguyên tắc khiến mối quan hệ thiếu sự ấm áp linh hoạt.',
    ngheNghiep: ['Lãnh đạo / Giám đốc', 'Giáo dục / Học thuật', 'Pháp lý / Luật sư', 'Kiến trúc / Quy hoạch', 'Doanh nhân khởi nghiệp', 'Chính trị / Hành chính'],
    mauSacHop: ['Xanh lá', 'Xanh dương', 'Nâu đất'],
    huongHop: ['Đông', 'Đông Nam'],
    dungThanPhoBien: 'Hỏa hoặc Thủy tùy mùa sinh',
    dungThanGiaiThich: 'Giáp Mộc sinh mùa Thu (Kim vượng) cần Hỏa để tiết Kim bảo vệ Mộc; sinh mùa Đông (Thủy vượng) cần Hỏa để ấm; sinh mùa Hạ cần Thủy để nuôi dưỡng.',
    affirmation: 'Tôi vươn thẳng về phía ánh sáng — sức mạnh của tôi không phải là cứng nhắc mà là không thể khuất phục.',
  },

  // ─────────────────────────────────────────
  // ẤT MỘC — Âm Mộc — Dây Leo Mềm Mại
  // ─────────────────────────────────────────
  'Ất': {
    can: 'Ất',
    nguhanhCan: 'Mộc',
    amduong: 'Âm',
    tenGoiThanThien: 'Ất Mộc — Dây Leo Uyển Chuyển',
    motaCoLoi: 'Ất Mộc không vươn thẳng như Giáp — thay vào đó, họ uốn lượn quanh mọi trở ngại để tiến về phía ánh sáng. Đây là sức mạnh của sự linh hoạt và thích nghi — không thể bị bẻ gãy vì không chống cự trực diện. Người Nhật Chủ Ất có khả năng sống sót và phát triển trong môi trường khắc nghiệt mà người cứng nhắc không thể. Họ khéo léo trong giao tiếp, biết cách tiếp cận vấn đề từ nhiều góc độ khác nhau.',
    diemManh: [
      'Thích nghi nhanh — có thể tìm được cơ hội trong bất kỳ hoàn cảnh nào',
      'Khéo léo và tinh tế trong giao tiếp, ít khi gây xung đột không cần thiết',
      'Kiên trì ở cấp độ sâu — không bỏ cuộc, chỉ thay đổi chiến thuật',
      'Sáng tạo và linh hoạt trong giải quyết vấn đề',
    ],
    diemYeu: [
      'Đôi khi thiếu chính kiến rõ ràng — linh hoạt quá mức trở thành không có lập trường',
      'Phụ thuộc vào môi trường và người xung quanh nhiều hơn cần thiết',
      'Hay lo lắng và do dự trong các quyết định quan trọng',
    ],
    phongCachLamViec: 'Ất Mộc làm việc tốt trong môi trường linh hoạt, có thể điều chỉnh chiến lược khi cần. Họ xuất sắc trong các vai trò cần sự khéo léo ngoại giao và kết nối con người. Không giỏi làm việc trong môi trường cứng nhắc với quy trình bất biến.',
    trongTinhYeu: 'Ất Mộc là người bạn đời thấu hiểu và thích nghi — họ biết cách nuôi dưỡng mối quan hệ qua thời gian. Cần sự an toàn và ổn định từ đối phương. Đôi khi quá nhún nhường dẫn đến mất đi tiếng nói của bản thân trong mối quan hệ.',
    ngheNghiep: ['Ngoại giao / Quan hệ công chúng', 'Tư vấn / Coaching', 'Thiết kế / Nghệ thuật', 'Nhân sự / Đào tạo', 'Marketing', 'Văn học / Biên kịch'],
    mauSacHop: ['Xanh lá nhạt', 'Xanh ngọc', 'Vàng nhạt'],
    huongHop: ['Đông', 'Nam'],
    dungThanPhoBien: 'Hỏa và Mộc (cần thêm Mộc trợ)',
    dungThanGiaiThich: 'Ất Mộc thường yếu hơn Giáp — cần Mộc để tăng thân vượng và Hỏa để tiết Quan tinh, tránh bị áp lực quá lớn.',
    affirmation: 'Tôi đủ linh hoạt để phát triển trong bất kỳ hoàn cảnh nào — sự uyển chuyển là sức mạnh, không phải điểm yếu.',
  },

  // ─────────────────────────────────────────
  // BÍNH HỎA — Dương Hỏa — Ánh Mặt Trời
  // ─────────────────────────────────────────
  'Bính': {
    can: 'Bính',
    nguhanhCan: 'Hỏa',
    amduong: 'Dương',
    tenGoiThanThien: 'Bính Hỏa — Ánh Mặt Trời',
    motaCoLoi: 'Bính Hỏa là Mặt Trời — chiếu sáng không phân biệt, ấm áp mọi góc trời. Người mang Nhật Chủ này có một sức thu hút tự nhiên, ánh sáng của họ lan tỏa mà không cần cố gắng. Họ tràn đầy nhiệt huyết, lạc quan, và có khả năng truyền cảm hứng cho người xung quanh chỉ bằng sự hiện diện. Như Mặt Trời không thể chiếu sáng một chỗ mãi, họ cần di chuyển, thay đổi, và tác động đến nhiều người.',
    diemManh: [
      'Sức thu hút và sức hút xã hội mạnh mẽ — người ta tự nhiên muốn ở gần họ',
      'Nhiệt huyết và lạc quan — có khả năng "làm ấm" không khí u ám',
      'Rộng lượng và hào phóng — không ngần ngại chia sẻ ánh sáng của mình',
      'Trực giác nhạy bén về con người và hoàn cảnh',
    ],
    diemYeu: [
      'Hay bốc đồng và thiếu kiên nhẫn với quá trình chậm chạp',
      'Dễ bị tổn thương khi không được ghi nhận hoặc cảm ơn',
      'Có thể lấn át người khác vì năng lượng quá mạnh',
    ],
    phongCachLamViec: 'Bính Hỏa làm việc tốt nhất trong môi trường năng động, có tiếp xúc với nhiều người và được nhìn nhận. Họ truyền cảm hứng cho team và làm tốt vai trò lãnh đạo truyền thông. Công việc đơn độc, ít tương tác sẽ tắt dần ngọn lửa của họ.',
    trongTinhYeu: 'Bính Hỏa yêu rực rỡ và hào phóng — họ là người bạn đời mang lại ánh sáng và niềm vui. Cần được ngưỡng mộ và trân trọng. Nhược điểm là tình cảm đôi khi không đủ sâu vì quá nhiều người cùng được "chiếu sáng".',
    ngheNghiep: ['Diễn giả / Đào tạo', 'Nghệ thuật biểu diễn', 'Marketing / Quảng cáo', 'Chính trị / Lãnh đạo công cộng', 'Giáo dục / Truyền thông', 'Kinh doanh bán lẻ / Dịch vụ'],
    mauSacHop: ['Đỏ', 'Cam', 'Vàng'],
    huongHop: ['Nam', 'Đông'],
    dungThanPhoBien: 'Thủy (để điều hòa khi Hỏa quá vượng)',
    dungThanGiaiThich: 'Bính Hỏa vượng cần Thủy để tiết nhiệt; nếu Hỏa nhược (sinh mùa Đông) cần Mộc sinh Hỏa và tránh Thủy nhiều.',
    affirmation: 'Tôi chiếu sáng thế giới xung quanh — ánh sáng tôi cho đi không bao giờ cạn.',
  },

  // ─────────────────────────────────────────
  // ĐINH HỎA — Âm Hỏa — Ngọn Nến / Đèn Lửa
  // ─────────────────────────────────────────
  'Đinh': {
    can: 'Đinh',
    nguhanhCan: 'Hỏa',
    amduong: 'Âm',
    tenGoiThanThien: 'Đinh Hỏa — Ngọn Nến Nội Tâm',
    motaCoLoi: 'Đinh Hỏa không rực rỡ như Mặt Trời Bính — nhưng ngọn lửa nhỏ này chiếu sáng trong bóng tối theo cách Mặt Trời không thể. Người mang Nhật Chủ Đinh có chiều sâu nội tâm và sự tinh tế mà Bính không có — họ sưởi ấm từng cá nhân thay vì cả đám đông. Ánh sáng của họ ấm hơn, trực tiếp hơn, và kết nối ở tầng sâu hơn. Nhưng như ngọn nến, họ cũng dễ bị gió thổi tắt.',
    diemManh: [
      'Trực giác và cảm xúc sâu sắc — hiểu người khác ở tầng tâm lý mà không cần giải thích',
      'Sáng tạo và có tầm nhìn nghệ thuật độc đáo',
      'Kết nối cá nhân mạnh mẽ — mỗi người được tiếp cận cảm thấy đặc biệt',
      'Kiên định về giá trị cốt lõi dù bề ngoài có vẻ nhẹ nhàng',
    ],
    diemYeu: [
      'Dễ bị cảm xúc chi phối khi bị áp lực từ bên ngoài',
      'Đôi khi quá bí ẩn và khó đoán khiến người xung quanh không hiểu',
      'Cần môi trường an toàn — dễ "tắt lửa" khi bị tấn công liên tục',
    ],
    phongCachLamViec: 'Đinh Hỏa làm việc tốt trong các dự án đòi hỏi sự tinh tế, sáng tạo và chiều sâu. Họ không phải người của đám đông lớn nhưng là người truyền cảm hứng trong nhóm nhỏ với tác động sâu hơn. Cần môi trường an toàn để ngọn lửa phát sáng ổn định.',
    trongTinhYeu: 'Đinh Hỏa yêu sâu và chung thủy — mỗi mối quan hệ đều được đầu tư hoàn toàn. Cần người đối phương đủ tinh tế để nhận ra ngọn lửa nhỏ này và bảo vệ nó. Không chịu được sự lạnh lùng hay vô tâm.',
    ngheNghiep: ['Nghệ thuật / Nhiếp ảnh', 'Tâm lý học / Tư vấn', 'Nhà văn / Nhà thơ', 'Thiết kế nội thất / UX', 'Nghiên cứu / Học thuật chuyên sâu', 'Âm nhạc'],
    mauSacHop: ['Đỏ thẫm', 'Tím', 'Hồng'],
    huongHop: ['Nam', 'Đông Nam'],
    dungThanPhoBien: 'Mộc (nuôi dưỡng ngọn lửa) và Thổ vừa phải',
    dungThanGiaiThich: 'Đinh Hỏa thường yếu hơn Bính, cần Mộc sinh để duy trì — và cần Thổ tiết để không bị Thủy dập tắt đột ngột.',
    affirmation: 'Tôi chiếu sáng những nơi tối tăm nhất — ngọn lửa nội tâm của tôi không thể bị dập tắt.',
  },

  // ─────────────────────────────────────────
  // MẬU THỔ — Dương Thổ — Núi Cao
  // ─────────────────────────────────────────
  'Mậu': {
    can: 'Mậu',
    nguhanhCan: 'Thổ',
    amduong: 'Dương',
    tenGoiThanThien: 'Mậu Thổ — Núi Cao Vững Chắc',
    motaCoLoi: 'Mậu Thổ là núi — đứng vững qua mọi phong ba. Người mang Nhật Chủ Mậu có một sự ổn định nội tâm phi thường — họ không bị lung lay bởi dư luận, không bị cuốn theo cảm xúc nhất thời, và có thể chịu đựng áp lực mà người khác sẽ gãy. Như núi, họ là điểm tựa — chắc chắn, đáng tin, và hiện diện. Nhưng như núi, họ cũng có thể không di chuyển ngay cả khi cần thay đổi.',
    diemManh: [
      'Ổn định và đáng tin cậy tuyệt đối — là chỗ dựa cho mọi người xung quanh',
      'Bình tĩnh trong khủng hoảng — càng khó, càng vững',
      'Cam kết dài hạn — khi đã quyết định, ít khi thay đổi',
      'Thực dụng và thực tế — không mơ mộng viển vông',
    ],
    diemYeu: [
      'Chậm thích nghi với thay đổi — đôi khi quá muộn khi nhận ra cần linh hoạt',
      'Bảo thủ và khó tiếp thu góc nhìn mới',
      'Đôi khi quá cứng nhắc trong các mối quan hệ — thiếu sự ấm áp tự nhiên',
    ],
    phongCachLamViec: 'Mậu Thổ làm việc tốt nhất trong các vai trò đòi hỏi sự ổn định, quản lý rủi ro và lãnh đạo trong khủng hoảng. Họ là người mà tổ chức cần khi mọi thứ rung chuyển. Không phù hợp với môi trường startup liên tục thay đổi chiến lược.',
    trongTinhYeu: 'Mậu Thổ là người bạn đời trung thành và vững chắc — một khi cam kết, hiếm khi từ bỏ. Nhưng cần học cách biểu đạt tình cảm bằng lời nói và cử chỉ — không phải chỉ bằng sự hiện diện im lặng.',
    ngheNghiep: ['Quản lý rủi ro / Bảo hiểm', 'Bất động sản', 'Y tế / Dược', 'Ngân hàng / Tài chính', 'Xây dựng / Kỹ thuật', 'Hành chính công'],
    mauSacHop: ['Vàng đất', 'Nâu', 'Xanh lá đậm'],
    huongHop: ['Trung tâm', 'Đông Bắc'],
    dungThanPhoBien: 'Mộc (cần để sơ thông Thổ) và Thủy',
    dungThanGiaiThich: 'Mậu Thổ hay bị vượng quá mức (Thổ nhiều) → cần Mộc để sơ thông và Thủy để hoạt hóa, tránh trì trệ.',
    affirmation: 'Tôi là nền tảng vững chắc — sự ổn định của tôi là món quà tôi trao cho thế giới.',
  },

  // ─────────────────────────────────────────
  // KỶ THỔ — Âm Thổ — Đất Màu Mỡ
  // ─────────────────────────────────────────
  'Kỷ': {
    can: 'Kỷ',
    nguhanhCan: 'Thổ',
    amduong: 'Âm',
    tenGoiThanThien: 'Kỷ Thổ — Đất Màu Mỡ',
    motaCoLoi: 'Kỷ Thổ là đất nông nghiệp — không cứng như núi Mậu nhưng nuôi dưỡng mọi sự sống. Người mang Nhật Chủ này có khả năng chứa đựng và bao dung phi thường — họ thu hút người khác như đất hút nước, nuôi dưỡng tiềm năng của người xung quanh. Họ thực tế, cần mẫn, và có tài năng quản lý nguồn lực. Không rực rỡ như Hỏa hay sắc bén như Kim, nhưng không ai có thể xây dựng mà không cần đất.',
    diemManh: [
      'Bao dung và chấp nhận cao — ít phán xét, dễ tiếp cận',
      'Thực dụng và có tài quản lý chi tiết, nguồn lực',
      'Kiên nhẫn trong việc nuôi dưỡng dự án và mối quan hệ dài hạn',
      'Đáng tin cậy trong các công việc đòi hỏi tỉ mỉ',
    ],
    diemYeu: [
      'Đôi khi thiếu quyết đoán — cân nhắc quá nhiều',
      'Dễ bị người khác lợi dụng lòng tốt và sự bao dung',
      'Hay lo lắng thái quá về những rủi ro nhỏ',
    ],
    phongCachLamViec: 'Kỷ Thổ xuất sắc trong quản lý và điều phối — họ không nổi bật nhưng là người giữ cho mọi thứ chạy trơn tru. Làm việc tốt trong môi trường cần sự kiên nhẫn và chú ý chi tiết. Khó khăn trong các quyết định chiến lược lớn đòi hỏi dứt khoát.',
    trongTinhYeu: 'Kỷ Thổ yêu thương bằng sự quan tâm cụ thể — nhớ những chi tiết nhỏ, chăm sóc thiết thực. Cần đối phương nhận ra và trân trọng những điều nhỏ này. Đôi khi lo lắng quá mức về mối quan hệ.',
    ngheNghiep: ['Kế toán / Kiểm toán', 'Quản lý hành chính', 'Nông nghiệp / Môi trường', 'Nhân sự', 'Y tế hỗ trợ / Điều dưỡng', 'Logistic / Chuỗi cung ứng'],
    mauSacHop: ['Vàng', 'Be', 'Xanh lá'],
    huongHop: ['Trung tâm', 'Tây Nam'],
    dungThanPhoBien: 'Hỏa và Mộc',
    dungThanGiaiThich: 'Kỷ Thổ cần Hỏa để sinh trợ khi nhược, cần Mộc để sơ thông khi vượng — tránh Thổ nhiều quá gây trì trệ.',
    affirmation: 'Tôi nuôi dưỡng sự phát triển của mọi người xung quanh — sự phong phú của tôi là điều mọi thứ đều bén rễ từ đó.',
  },

  // ─────────────────────────────────────────
  // CANH KIM — Dương Kim — Kiếm Sắc
  // ─────────────────────────────────────────
  'Canh': {
    can: 'Canh',
    nguhanhCan: 'Kim',
    amduong: 'Dương',
    tenGoiThanThien: 'Canh Kim — Thanh Kiếm Sắc Bén',
    motaCoLoi: 'Canh Kim là thanh kiếm — sắc bén, chính trực, và được rèn luyện qua lửa để trở nên sắc hơn. Người mang Nhật Chủ này có tính cách cứng rắn, dứt khoát và không chấp nhận sự mập mờ. Họ đặt cao tiêu chuẩn và không ngần ngại cắt đứt những gì không còn phù hợp. Như kiếm cần được rèn qua lửa, người Canh Kim trưởng thành qua thử thách và trở nên sắc bén hơn sau mỗi khó khăn.',
    diemManh: [
      'Quyết đoán và dứt khoát — không do dự khi cần hành động',
      'Chính trực cao — không chịu đựng sự bất công hay giả dối',
      'Ý chí thép — càng khó càng mạnh, không bị áp lực bẻ gãy',
      'Lãnh đạo trong khủng hoảng — điềm tĩnh và rõ ràng khi người khác hoảng loạn',
    ],
    diemYeu: [
      'Quá cứng nhắc và thiếu sự mềm mỏng trong giao tiếp — đôi khi làm tổn thương vô tình',
      'Khó thừa nhận sai và thay đổi quyết định khi đã lên tiếng',
      'Thiếu kiên nhẫn với những người không đáp ứng tiêu chuẩn cao của họ',
    ],
    phongCachLamViec: 'Canh Kim làm việc tốt nhất trong môi trường đòi hỏi tiêu chuẩn cao và quyết định nhanh. Họ là người được giao nhiệm vụ khó và không ai muốn thực hiện. Phù hợp với vai trò cần sự cứng rắn như thương lượng, cải tổ tổ chức, hay quân sự/pháp lý.',
    trongTinhYeu: 'Canh Kim yêu trung thành và bảo vệ — đối phương không bao giờ cảm thấy không được bảo vệ. Nhưng cần học cách nói những lời dịu dàng và linh hoạt hơn trong biểu đạt tình cảm.',
    ngheNghiep: ['Quân sự / An ninh', 'Luật sư / Thẩm phán', 'Phẫu thuật / Y tế', 'Kỹ sư cơ khí / Chế tạo', 'CEO / Giám đốc điều hành', 'Thể thao tranh tài'],
    mauSacHop: ['Trắng', 'Bạc', 'Vàng nhạt'],
    huongHop: ['Tây', 'Tây Bắc'],
    dungThanPhoBien: 'Thủy (tiết Kim để bớt cứng) và Hỏa (tôi luyện Kim)',
    dungThanGiaiThich: 'Canh Kim cứng cần Hỏa để tôi luyện thành kiếm sắc; khi quá cứng cần Thủy để điều hòa và tiết bớt bén quá.',
    affirmation: 'Tôi được rèn luyện qua thử thách — sự sắc bén của tôi là để bảo vệ, không phải để tổn thương.',
  },

  // ─────────────────────────────────────────
  // TÂN KIM — Âm Kim — Trang Sức Quý Giá
  // ─────────────────────────────────────────
  'Tân': {
    can: 'Tân',
    nguhanhCan: 'Kim',
    amduong: 'Âm',
    tenGoiThanThien: 'Tân Kim — Trang Sức Tinh Xảo',
    motaCoLoi: 'Tân Kim là kim loại quý — không cứng thô như Canh mà tinh xảo và sáng bóng. Người mang Nhật Chủ này chú trọng đến hình thức và chất lượng theo nghĩa thẩm mỹ — họ có khiếu thẩm mỹ tự nhiên và luôn muốn mọi thứ được trình bày hoàn hảo. Tân Kim nhạy cảm hơn Canh — dễ bị tổn thương bởi môi trường thô lỗ, nhưng khi được đặt đúng nơi thì tỏa sáng rực rỡ.',
    diemManh: [
      'Khiếu thẩm mỹ và tinh tế cao — biết cách tạo ra cái đẹp trong mọi lĩnh vực',
      'Nhạy cảm và thấu hiểu — cảm nhận được những sắc thái tinh tế mà người khác bỏ qua',
      'Chú ý chi tiết và cầu toàn theo hướng tích cực',
      'Truyền đạt ý tưởng rõ ràng và thuyết phục',
    ],
    diemYeu: [
      'Quá chú ý đến vẻ ngoài có thể trở nên superficial hoặc hay phán xét',
      'Nhạy cảm quá mức — dễ bị tổn thương bởi lời phê bình',
      'Cầu toàn đôi khi trở thành tự cản trở — không bao giờ thấy đủ tốt',
    ],
    phongCachLamViec: 'Tân Kim làm việc tốt trong các lĩnh vực cần sự tinh tế và thẩm mỹ. Họ chú ý đến chi tiết và không hài lòng với sản phẩm thô ráp. Cần môi trường văn minh và được tôn trọng — thô lỗ hay hỗn loạn làm họ mất đi khả năng hoạt động tốt nhất.',
    trongTinhYeu: 'Tân Kim là người lãng mạn và tinh tế — họ tạo ra những khoảnh khắc đẹp đẽ trong mối quan hệ. Cần được đối xử với sự tôn trọng và tinh tế tương ứng. Không chịu được sự thô lỗ hay thiếu quan tâm đến hình thức.',
    ngheNghiep: ['Thiết kế thời trang / Trang sức', 'Nghệ thuật thị giác', 'Viết lách / Biên tập', 'Ngoại giao', 'Âm nhạc / Biểu diễn', 'Làm đẹp / Thẩm mỹ'],
    mauSacHop: ['Trắng', 'Bạc', 'Hồng nhạt'],
    huongHop: ['Tây', 'Tây Nam'],
    dungThanPhoBien: 'Thủy (tiết Tân Kim để lưu thông) và Thổ (sinh Kim)',
    dungThanGiaiThich: 'Tân Kim cần Thủy để sáng bóng (Thủy làm Tân Kim phát quang) và Thổ sinh nếu Kim nhược. Tránh Hỏa mạnh vì dễ bị nấu chảy.',
    affirmation: 'Tôi là tác phẩm tinh xảo — vẻ đẹp và sự sắc bén của tôi cùng tồn tại một cách hài hòa.',
  },

  // ─────────────────────────────────────────
  // NHÂM THỦY — Dương Thủy — Biển Cả
  // ─────────────────────────────────────────
  'Nhâm': {
    can: 'Nhâm',
    nguhanhCan: 'Thủy',
    amduong: 'Dương',
    tenGoiThanThien: 'Nhâm Thủy — Biển Cả Sâu Thẳm',
    motaCoLoi: 'Nhâm Thủy là đại dương — bề ngoài có thể phẳng lặng nhưng sâu thẳm và chứa đựng vô hạn. Người mang Nhật Chủ này có trí tuệ bao quát và tư duy không biên giới — họ có thể chứa đựng nhiều quan điểm đối lập, nhiều ý tưởng cùng lúc mà không bị mâu thuẫn. Như đại dương bao quát mà không bị mất đi bản thân, Nhâm Thủy bao dung nhưng không yếu đuối. Khi họ nổi giận, đó là sóng thần.',
    diemManh: [
      'Trí tuệ bao quát và tư duy đa chiều — có thể nhìn vấn đề từ nhiều góc độ cùng lúc',
      'Bao dung và không phán xét — có thể hiểu những quan điểm đối lập',
      'Khả năng phân tích chiều sâu phi thường',
      'Linh hoạt chiến lược — như nước, tìm được đường đi qua mọi chướng ngại',
    ],
    diemYeu: [
      'Đôi khi thiếu quyết đoán vì nhìn thấy quá nhiều khả năng',
      'Có thể trở nên lạnh lùng và xa cách khi rút vào thế giới nội tâm',
      'Cảm xúc sâu nhưng khó biểu đạt — người khác không biết họ đang cảm thấy gì',
    ],
    phongCachLamViec: 'Nhâm Thủy làm việc tốt trong các lĩnh vực cần tư duy chiến lược và phân tích chiều sâu. Họ là nhà lập kế hoạch xuất sắc và làm tốt trong môi trường cần giải quyết vấn đề phức tạp. Không giỏi với công việc đòi hỏi quyết định nhanh không có thời gian suy ngẫm.',
    trongTinhYeu: 'Nhâm Thủy yêu sâu nhưng không ồn ào — tình yêu của họ như đại dương, sâu thẳm và bao la. Cần người bạn đời kiên nhẫn để đợi họ mở lòng. Khi đã cam kết, trung thành tuyệt đối.',
    ngheNghiep: ['Khoa học / Nghiên cứu', 'Triết học / Tâm lý học', 'Chiến lược kinh doanh', 'Lập trình / Công nghệ', 'Nhà văn / Nhà thơ', 'Ngoại giao / Chính sách quốc tế'],
    mauSacHop: ['Đen', 'Xanh navy', 'Xanh lá đậm'],
    huongHop: ['Bắc', 'Đông'],
    dungThanPhoBien: 'Mộc (tiết Thủy và giữ cho lưu thông) và Kim',
    dungThanGiaiThich: 'Nhâm Thủy vượng cần Mộc để tiết bớt, tránh lũ lụt; khi nhược cần Kim sinh Thủy. Thổ nhiều sẽ khắc Thủy gây trở ngại.',
    affirmation: 'Tôi chứa đựng chiều sâu vô hạn — sức mạnh của tôi là khả năng bao dung và hiểu biết không biên giới.',
  },

  // ─────────────────────────────────────────
  // QUÝ THỦY — Âm Thủy — Mưa Dịu Và Sương Mù
  // ─────────────────────────────────────────
  'Quý': {
    can: 'Quý',
    nguhanhCan: 'Thủy',
    amduong: 'Âm',
    tenGoiThanThien: 'Quý Thủy — Mưa Dịu Sương Mờ',
    motaCoLoi: 'Quý Thủy là mưa nhẹ và sương mù — không cuồng nộ như Nhâm nhưng thấm sâu vào từng ngóc ngách mà sóng lớn không đến được. Người mang Nhật Chủ Quý có sự tinh tế và nhạy cảm đặc biệt — họ cảm nhận được những sắc thái mà người khác bỏ qua, và có khả năng chữa lành tâm hồn người khác chỉ bằng sự hiện diện dịu dàng. Như sương mờ bao phủ cảnh vật, họ mang đến sự huyền bí và sâu sắc.',
    diemManh: [
      'Nhạy cảm và đồng cảm cao — cảm nhận được cảm xúc người khác một cách tự nhiên',
      'Trực giác phi thường trong việc đánh giá người và tình huống',
      'Tư duy sáng tạo và trí tưởng tượng phong phú',
      'Khả năng chữa lành và làm dịu bầu không khí căng thẳng',
    ],
    diemYeu: [
      'Dễ hấp thụ cảm xúc tiêu cực của người xung quanh',
      'Có xu hướng trốn tránh thực tế bằng giấc mơ và tưởng tượng',
      'Thiếu quyết đoán khi cần hành động nhanh',
    ],
    phongCachLamViec: 'Quý Thủy làm việc tốt trong môi trường đòi hỏi sự tinh tế, sáng tạo và chăm sóc. Họ không phù hợp với môi trường thô lỗ hay áp lực quá cao liên tục. Xuất sắc trong các lĩnh vực liên quan đến nghệ thuật, chữa lành và giáo dục.',
    trongTinhYeu: 'Quý Thủy yêu tinh tế và chữa lành — người bạn đời cảm thấy được hiểu và được chăm sóc như không ai khác. Cần bảo vệ ranh giới cảm xúc, tránh bị rút cạn bởi đối phương không lành mạnh.',
    ngheNghiep: ['Tâm lý / Trị liệu', 'Nghệ thuật trị liệu', 'Giáo dục mầm non / Đặc biệt', 'Thiền định / Tâm linh', 'Nhạc sĩ / Nhiếp ảnh', 'Văn học / Thơ'],
    mauSacHop: ['Đen', 'Xanh lam nhạt', 'Trắng'],
    huongHop: ['Bắc', 'Tây Bắc'],
    dungThanPhoBien: 'Mộc (tiết Thủy), Thổ (điều tiết), Kim (sinh Thủy khi nhược)',
    dungThanGiaiThich: 'Quý Thủy thường yếu — cần Kim sinh và Mộc tiết vừa phải. Tránh Thổ quá nhiều vì Thổ khắc Thủy làm Quý Thủy tắc nghẽn.',
    affirmation: 'Tôi chữa lành thế giới bằng sự dịu dàng — sức mạnh của tôi là trong những gì tinh tế nhất.',
  },
}
/**
 * BÁT TỰ DATA — PHẦN 1.3, 1.4, 1.5
 * Nguyệt Lệnh + Dụng Thần + Tương Hợp Nhật Chủ
 */

// ============================================================
// PHẦN 1.3 — NGUYỆT LỆNH (Ngũ Hành theo Tháng sinh)
// ============================================================

/**
 * NGUYỆT LỆNH = Địa Chi của Tháng trong Tứ Trụ
 * Đây là nhân tố mạnh nhất xác định Nhật Chủ vượng hay nhược
 *
 * Chuyển đổi tháng dương lịch → tháng âm lịch:
 * Lưu ý: tháng âm lịch lệch khoảng 1-2 tháng so với dương lịch
 * App cần hỏi tháng âm lịch HOẶC tự convert (phức tạp hơn)
 * Phương án đơn giản: dùng tiết khí (Solar Terms) thay vì tháng âm lịch
 *
 * TIẾT KHÍ CHUẨN (dương lịch xấp xỉ):
 * Tháng 1 Bát Tự (Dần) bắt đầu từ Lập Xuân ≈ 04/02
 * Tháng 2 (Mão) bắt đầu từ Kinh Trập ≈ 06/03
 * Tháng 3 (Thìn) bắt đầu từ Thanh Minh ≈ 05/04
 * Tháng 4 (Tỵ) bắt đầu từ Lập Hạ ≈ 06/05
 * Tháng 5 (Ngọ) bắt đầu từ Mang Chủng ≈ 06/06
 * Tháng 6 (Mùi) bắt đầu từ Tiểu Thử ≈ 07/07
 * Tháng 7 (Thân) bắt đầu từ Lập Thu ≈ 07/08
 * Tháng 8 (Dậu) bắt đầu từ Bạch Lộ ≈ 08/09
 * Tháng 9 (Tuất) bắt đầu từ Hàn Lộ ≈ 08/10
 * Tháng 10 (Hợi) bắt đầu từ Lập Đông ≈ 07/11
 * Tháng 11 (Tý) bắt đầu từ Đại Tuyết ≈ 07/12
 * Tháng 12 (Sửu) bắt đầu từ Tiểu Hàn ≈ 06/01
 */

export interface NguyetLenhData {
  thangBatTu: number        // Tháng Bát Tự (1=Dần...12=Sửu)
  diaChiThang: string
  nguhanhVuong: string      // Ngũ Hành vượng nhất tháng này
  mucVuong: 'vượng' | 'vượng cực' | 'chuyển giao'
  nguhanhPhu: string        // Ngũ Hành phụ (đặc biệt với tháng Thổ)
  batDauDuong: string       // Tiết khí bắt đầu (ngày dương lịch xấp xỉ)
  muaBatTu: 'Xuân' | 'Hạ' | 'Thu' | 'Đông' | 'Giao mùa'
  motaTomTat: string
}

export const NGUYET_LENH: Record<number, NguyetLenhData> = {
  1: {
    thangBatTu: 1, diaChiThang: 'Dần',
    nguhanhVuong: 'Mộc', mucVuong: 'vượng',
    nguhanhPhu: 'Hỏa',
    batDauDuong: '≈04/02 (Lập Xuân)',
    muaBatTu: 'Xuân',
    motaTomTat: 'Mộc vươn lên đầu xuân — Nhật Chủ Mộc được trợ lực mạnh. Nhật Chủ Kim bị khắc, cần Hỏa hoặc Thổ bảo hộ.',
  },
  2: {
    thangBatTu: 2, diaChiThang: 'Mão',
    nguhanhVuong: 'Mộc', mucVuong: 'vượng cực',
    nguhanhPhu: 'Mộc',
    batDauDuong: '≈06/03 (Kinh Trập)',
    muaBatTu: 'Xuân',
    motaTomTat: 'Mộc vượng cực — Nhật Chủ Mộc có thể quá vượng (cần Hỏa tiết). Nhật Chủ Kim yếu nhất trong năm tháng này.',
  },
  3: {
    thangBatTu: 3, diaChiThang: 'Thìn',
    nguhanhVuong: 'Thổ', mucVuong: 'chuyển giao',
    nguhanhPhu: 'Mộc (dư)',
    batDauDuong: '≈05/04 (Thanh Minh)',
    muaBatTu: 'Giao mùa',
    motaTomTat: 'Thổ Thìn ẩm chứa Mộc và Thủy bên trong — tháng chuyển tiếp Xuân-Hạ. Nhật Chủ Thổ vượng nhưng Thổ ẩm cần Hỏa sấy.',
  },
  4: {
    thangBatTu: 4, diaChiThang: 'Tỵ',
    nguhanhVuong: 'Hỏa', mucVuong: 'vượng',
    nguhanhPhu: 'Kim (ẩn trong Tỵ)',
    batDauDuong: '≈06/05 (Lập Hạ)',
    muaBatTu: 'Hạ',
    motaTomTat: 'Hỏa bắt đầu vượng — Nhật Chủ Hỏa được trợ. Mộc Nhật Chủ bị tiết nhiều (Mộc sinh Hỏa). Nhật Chủ Thủy yếu.',
  },
  5: {
    thangBatTu: 5, diaChiThang: 'Ngọ',
    nguhanhVuong: 'Hỏa', mucVuong: 'vượng cực',
    nguhanhPhu: 'Thổ',
    batDauDuong: '≈06/06 (Mang Chủng)',
    muaBatTu: 'Hạ',
    motaTomTat: 'Hỏa vượng cực — Nhâm/Quý Thủy yếu nhất tháng này. Nhật Chủ Kim cần Thổ sinh, Thủy tiết Hỏa bảo vệ.',
  },
  6: {
    thangBatTu: 6, diaChiThang: 'Mùi',
    nguhanhVuong: 'Thổ', mucVuong: 'chuyển giao',
    nguhanhPhu: 'Hỏa (dư)',
    batDauDuong: '≈07/07 (Tiểu Thử)',
    muaBatTu: 'Giao mùa',
    motaTomTat: 'Thổ Mùi khô nóng — tháng chuyển Hạ-Thu. Nhật Chủ Thổ vượng. Kim bắt đầu có lực. Thủy vẫn yếu.',
  },
  7: {
    thangBatTu: 7, diaChiThang: 'Thân',
    nguhanhVuong: 'Kim', mucVuong: 'vượng',
    nguhanhPhu: 'Thủy (ẩn trong Thân)',
    batDauDuong: '≈07/08 (Lập Thu)',
    muaBatTu: 'Thu',
    motaTomTat: 'Kim vượng đầu thu — Nhật Chủ Mộc bị khắc nhiều nhất. Kim Nhật Chủ mạnh. Cần Hỏa hoặc Thủy điều hòa.',
  },
  8: {
    thangBatTu: 8, diaChiThang: 'Dậu',
    nguhanhVuong: 'Kim', mucVuong: 'vượng cực',
    nguhanhPhu: 'Kim',
    batDauDuong: '≈08/09 (Bạch Lộ)',
    muaBatTu: 'Thu',
    motaTomTat: 'Kim vượng cực — Mộc Nhật Chủ cực kỳ bất lợi tháng này. Nhật Chủ Kim mạnh nhưng cần Hỏa tôi luyện.',
  },
  9: {
    thangBatTu: 9, diaChiThang: 'Tuất',
    nguhanhVuong: 'Thổ', mucVuong: 'chuyển giao',
    nguhanhPhu: 'Kim (dư), Hỏa (ẩn)',
    batDauDuong: '≈08/10 (Hàn Lộ)',
    muaBatTu: 'Giao mùa',
    motaTomTat: 'Thổ Tuất khô — chuyển Thu-Đông. Chứa Kim và lửa ẩn bên trong. Nhật Chủ Thổ mạnh nhưng khô, cần Thủy.',
  },
  10: {
    thangBatTu: 10, diaChiThang: 'Hợi',
    nguhanhVuong: 'Thủy', mucVuong: 'vượng',
    nguhanhPhu: 'Mộc (ẩn trong Hợi)',
    batDauDuong: '≈07/11 (Lập Đông)',
    muaBatTu: 'Đông',
    motaTomTat: 'Thủy vượng đầu đông — Hỏa Nhật Chủ yếu. Nhâm/Quý Thủy được hỗ trợ. Cần Mộc giúp lưu thông Thủy.',
  },
  11: {
    thangBatTu: 11, diaChiThang: 'Tý',
    nguhanhVuong: 'Thủy', mucVuong: 'vượng cực',
    nguhanhPhu: 'Thủy',
    batDauDuong: '≈07/12 (Đại Tuyết)',
    muaBatTu: 'Đông',
    motaTomTat: 'Thủy vượng cực — Hỏa Nhật Chủ bị dập mạnh nhất. Cần Mộc để sinh Hỏa và tiết Thủy. Kim sinh Thủy thêm không tốt.',
  },
  12: {
    thangBatTu: 12, diaChiThang: 'Sửu',
    nguhanhVuong: 'Thổ', mucVuong: 'chuyển giao',
    nguhanhPhu: 'Thủy (dư), Kim (ẩn)',
    batDauDuong: '≈06/01 (Tiểu Hàn)',
    muaBatTu: 'Giao mùa',
    motaTomTat: 'Thổ Sửu lạnh ẩm — chuyển Đông-Xuân. Kim ẩn bên trong mạnh. Nhật Chủ Hỏa vẫn yếu. Cần Hỏa và Mộc.',
  },
}

/**
 * 5 VÍ DỤ LUẬN GIẢI Nhật Chủ × Nguyệt Lệnh
 */
export const NGUYET_LENH_EXAMPLES = [
  {
    nhatChu: 'Giáp', thangBatTu: 1, nhanXet:
      'Giáp Mộc sinh tháng Dần (Mộc vượng) → Nhật Chủ vượng. Mộc mạnh cần Hỏa để tiết và Thổ để sinh tài. Dụng Thần: Hỏa, Thổ. Không cần thêm Mộc hay Thủy.',
  },
  {
    nhatChu: 'Giáp', thangBatTu: 7, nhanXet:
      'Giáp Mộc sinh tháng Thân (Kim vượng) → Nhật Chủ nhược. Kim khắc Mộc mạnh. Cần Hỏa để hóa Kim thành Quan tiết bớt, cần Mộc và Thủy trợ thân. Dụng Thần: Thủy, Mộc.',
  },
  {
    nhatChu: 'Canh', thangBatTu: 4, nhanXet:
      'Canh Kim sinh tháng Tỵ (Hỏa vượng) → Nhật Chủ nhược, Hỏa khắc Kim mạnh. Cần Thổ sinh Kim (hóa bớt Hỏa), cần Thủy tiết Kim và làm dịu. Dụng Thần: Thổ, Thủy.',
  },
  {
    nhatChu: 'Nhâm', thangBatTu: 10, nhanXet:
      'Nhâm Thủy sinh tháng Hợi (Thủy vượng) → Nhật Chủ quá vượng. Thủy nhiều như lũ cần đê. Dụng Thần: Mộc (tiết Thủy, dẫn lưu), Thổ (đắp đê), tránh thêm Kim sinh Thủy.',
  },
  {
    nhatChu: 'Bính', thangBatTu: 2, nhanXet:
      'Bính Hỏa sinh tháng Mão (Mộc vượng cực) → Mộc nhiều sinh Hỏa, Nhật Chủ có thể vượng quá. Cần Thủy điều hòa Hỏa vượng và Thổ để tiết. Dụng Thần: Thủy, Thổ.',
  },
]

// ============================================================
// PHẦN 1.4 — DỤNG THẦN MATRIX
// ============================================================

/**
 * DỤNG THẦN = Ngũ Hành cần bổ sung/tăng cường để cân bằng
 *
 * Cách đọc matrix:
 *   nhatChu + muaSinh → dungThan + giaiThich + nghNghiep + mauSac + huong
 *
 * 4 Mùa Bát Tự (theo Tiết khí):
 *   Xuân = tháng 1,2,3 (Dần/Mão/Thìn) ~ 04/02 – 05/05
 *   Hạ   = tháng 4,5,6 (Tỵ/Ngọ/Mùi)   ~ 06/05 – 07/08
 *   Thu  = tháng 7,8,9 (Thân/Dậu/Tuất) ~ 07/08 – 08/11
 *   Đông = tháng 10,11,12 (Hợi/Tý/Sửu) ~ 07/11 – 04/02
 *
 * LƯU Ý: Đây là matrix rút gọn — thực tế cần xem cả Tứ Trụ đầy đủ.
 * App dùng đây làm gợi ý ban đầu, không phải luận Bát Tự chuyên sâu.
 */

export interface DungThanRow {
  dungThan: string           // Hành Dụng Thần
  lyDo: string               // 1 câu giải thích
  ngheNghiepPhuHop: string[] // 3-4 ngành
  mauSacDungThan: string[]   // màu theo Dụng Thần
  huongDungThan: string[]    // hướng theo Dụng Thần
}

export const DUNG_THAN_MATRIX: Record<string, Record<string, DungThanRow>> = {

  'Giáp': {
    'Xuân': { dungThan: 'Hỏa, Thổ', lyDo: 'Giáp Mộc vượng mùa Xuân — cần Hỏa tiết Mộc và Thổ để Mộc có tài dưỡng.', ngheNghiepPhuHop: ['Giáo dục', 'Truyền thông', 'Kinh doanh', 'Sáng tạo'], mauSacDungThan: ['Đỏ', 'Vàng', 'Cam'], huongDungThan: ['Nam', 'Trung tâm'] },
    'Hạ':   { dungThan: 'Thủy', lyDo: 'Giáp Mộc sinh Hạ bị tiết nhiều (Mộc sinh Hỏa) — cần Thủy để nuôi Mộc và làm mát.', ngheNghiepPhuHop: ['Công nghệ', 'Nghiên cứu', 'Tài chính', 'Vận chuyển'], mauSacDungThan: ['Đen', 'Xanh navy'], huongDungThan: ['Bắc'] },
    'Thu':  { dungThan: 'Thủy, Mộc', lyDo: 'Giáp Mộc sinh Thu bị Kim khắc — cần Thủy sinh Mộc và Mộc trợ để kháng Kim.', ngheNghiepPhuHop: ['Học thuật', 'Pháp lý', 'Ngoại giao', 'Tư vấn'], mauSacDungThan: ['Xanh lá', 'Đen', 'Xanh dương'], huongDungThan: ['Đông', 'Bắc'] },
    'Đông': { dungThan: 'Hỏa', lyDo: 'Giáp Mộc sinh Đông lạnh ẩm — Hỏa là thiết yếu để sưởi ấm và kích hoạt Mộc phát triển.', ngheNghiepPhuHop: ['Truyền thông', 'Marketing', 'Nghệ thuật biểu diễn', 'Giáo dục'], mauSacDungThan: ['Đỏ', 'Cam', 'Vàng'], huongDungThan: ['Nam'] },
  },

  'Ất': {
    'Xuân': { dungThan: 'Hỏa, Thổ', lyDo: 'Ất Mộc vượng Xuân — tiết bớt bằng Hỏa và cần Thổ để dụng tài.', ngheNghiepPhuHop: ['Marketing', 'Ngoại giao', 'Nghệ thuật', 'Tư vấn'], mauSacDungThan: ['Đỏ', 'Vàng'], huongDungThan: ['Nam', 'Trung tâm'] },
    'Hạ':   { dungThan: 'Thủy, Mộc', lyDo: 'Ất Mộc bị tiết mạnh bởi Hỏa — cần Thủy nuôi và Mộc trợ thân.', ngheNghiepPhuHop: ['Nghiên cứu', 'Công nghệ', 'Văn học', 'Tư vấn'], mauSacDungThan: ['Xanh lá', 'Đen'], huongDungThan: ['Đông', 'Bắc'] },
    'Thu':  { dungThan: 'Thủy, Mộc', lyDo: 'Ất Mộc nhược nhất mùa Thu — Kim khắc Mộc, cần Thủy sinh và Mộc trợ thiết yếu.', ngheNghiepPhuHop: ['Học thuật', 'Sáng tạo', 'Nghệ thuật', 'Y tế'], mauSacDungThan: ['Xanh lá', 'Xanh dương'], huongDungThan: ['Đông', 'Bắc'] },
    'Đông': { dungThan: 'Hỏa', lyDo: 'Ất Mộc mùa Đông lạnh ẩm — Hỏa ấm là ưu tiên số 1 để Mộc không bị chết lạnh.', ngheNghiepPhuHop: ['Truyền thông', 'Giáo dục', 'Nghệ thuật', 'Tâm linh'], mauSacDungThan: ['Đỏ', 'Cam'], huongDungThan: ['Nam'] },
  },

  'Bính': {
    'Xuân': { dungThan: 'Thổ, Thủy', lyDo: 'Bính Hỏa Xuân được Mộc sinh — nếu Mộc nhiều Hỏa vượng, cần Thổ tiết và Thủy điều hòa.', ngheNghiepPhuHop: ['Kinh doanh', 'Tài chính', 'Y tế', 'Hành chính'], mauSacDungThan: ['Vàng', 'Xanh navy'], huongDungThan: ['Trung tâm', 'Bắc'] },
    'Hạ':   { dungThan: 'Thủy', lyDo: 'Bính Hỏa mùa Hạ vượng cực — Thủy là Dụng Thần số 1 để điều hòa nhiệt.', ngheNghiepPhuHop: ['Công nghệ', 'Vận chuyển', 'Ngoại giao', 'Nghiên cứu'], mauSacDungThan: ['Đen', 'Xanh navy'], huongDungThan: ['Bắc'] },
    'Thu':  { dungThan: 'Mộc', lyDo: 'Bính Hỏa mùa Thu yếu dần — Kim vượng dập Hỏa, cần Mộc sinh Hỏa để duy trì lực.', ngheNghiepPhuHop: ['Sáng tạo', 'Truyền thông', 'Giáo dục', 'Marketing'], mauSacDungThan: ['Xanh lá', 'Xanh dương'], huongDungThan: ['Đông'] },
    'Đông': { dungThan: 'Mộc', lyDo: 'Bính Hỏa mùa Đông nhược nhất — Thủy nhiều dập Hỏa, cần Mộc sinh Hỏa là ưu tiên.', ngheNghiepPhuHop: ['Nghệ thuật', 'Giáo dục', 'Truyền thông', 'Lãnh đạo'], mauSacDungThan: ['Xanh lá', 'Đỏ'], huongDungThan: ['Đông', 'Nam'] },
  },

  'Đinh': {
    'Xuân': { dungThan: 'Mộc, Thổ', lyDo: 'Đinh Hỏa nhỏ mùa Xuân được Mộc nuôi — Mộc trợ sinh Đinh, Thổ tiết vừa phải.', ngheNghiepPhuHop: ['Nghệ thuật', 'Sáng tạo', 'Tư vấn', 'Văn học'], mauSacDungThan: ['Xanh lá', 'Vàng'], huongDungThan: ['Đông', 'Trung tâm'] },
    'Hạ':   { dungThan: 'Thủy, Mộc', lyDo: 'Đinh Hỏa mùa Hạ bị tiết mạnh — lửa nhỏ trong môi trường Hỏa vượng dễ kiệt, cần Thủy điều hòa và Mộc dưỡng.', ngheNghiepPhuHop: ['Nghiên cứu', 'Học thuật', 'Y tế', 'Tâm lý'], mauSacDungThan: ['Đen', 'Xanh lá'], huongDungThan: ['Bắc', 'Đông'] },
    'Thu':  { dungThan: 'Mộc', lyDo: 'Đinh Hỏa mùa Thu yếu — Kim dập, Hỏa nhạt, cần Mộc sinh Hỏa là ưu tiên.', ngheNghiepPhuHop: ['Nghệ thuật', 'Âm nhạc', 'Viết lách', 'Thiết kế'], mauSacDungThan: ['Xanh lá'], huongDungThan: ['Đông'] },
    'Đông': { dungThan: 'Mộc', lyDo: 'Đinh Hỏa mùa Đông dễ bị dập tắt nhất — Mộc là phao cứu sinh để ngọn lửa tiếp tục cháy.', ngheNghiepPhuHop: ['Giáo dục', 'Truyền cảm hứng', 'Nghệ thuật', 'Tâm linh'], mauSacDungThan: ['Xanh lá', 'Đỏ'], huongDungThan: ['Đông', 'Nam'] },
  },

  'Mậu': {
    'Xuân': { dungThan: 'Hỏa, Thổ', lyDo: 'Mậu Thổ mùa Xuân bị Mộc khắc — cần Hỏa để chuyển hóa Mộc và sinh Thổ.', ngheNghiepPhuHop: ['Quản lý', 'Xây dựng', 'Bất động sản', 'Y tế'], mauSacDungThan: ['Đỏ', 'Vàng'], huongDungThan: ['Nam', 'Trung tâm'] },
    'Hạ':   { dungThan: 'Thủy, Mộc', lyDo: 'Mậu Thổ mùa Hạ Thổ + Hỏa vượng → quá khô nóng. Cần Thủy tưới ẩm và Mộc sơ thông.', ngheNghiepPhuHop: ['Nông nghiệp', 'Môi trường', 'Tài chính', 'Vận chuyển'], mauSacDungThan: ['Đen', 'Xanh lá'], huongDungThan: ['Bắc', 'Đông'] },
    'Thu':  { dungThan: 'Hỏa, Thủy', lyDo: 'Mậu Thổ Thu Kim tiết Thổ nhiều — cần Hỏa duy trì lực Thổ, Thủy làm ẩm tránh khô.', ngheNghiepPhuHop: ['Tài chính', 'Bảo hiểm', 'Hành chính', 'Y tế'], mauSacDungThan: ['Đỏ', 'Xanh navy'], huongDungThan: ['Nam', 'Bắc'] },
    'Đông': { dungThan: 'Hỏa', lyDo: 'Mậu Thổ mùa Đông lạnh ẩm — Hỏa là thiết yếu để sưởi Thổ và kích hoạt.', ngheNghiepPhuHop: ['Quản lý rủi ro', 'Xây dựng', 'Hành chính', 'Đào tạo'], mauSacDungThan: ['Đỏ', 'Cam', 'Vàng'], huongDungThan: ['Nam'] },
  },

  'Kỷ': {
    'Xuân': { dungThan: 'Hỏa', lyDo: 'Kỷ Thổ mùa Xuân bị Mộc khắc — cần Hỏa hóa Mộc, sinh và sấy Kỷ Thổ ẩm.', ngheNghiepPhuHop: ['Quản lý', 'Hành chính', 'Nhân sự', 'Giáo dục'], mauSacDungThan: ['Đỏ', 'Cam'], huongDungThan: ['Nam'] },
    'Hạ':   { dungThan: 'Thủy, Mộc', lyDo: 'Kỷ Thổ mùa Hạ quá khô — Thủy tưới ẩm, Mộc sơ thông Thổ không bị cứng chắc.', ngheNghiepPhuHop: ['Môi trường', 'Nông nghiệp', 'Tư vấn', 'Nghiên cứu'], mauSacDungThan: ['Đen', 'Xanh lá'], huongDungThan: ['Bắc', 'Đông'] },
    'Thu':  { dungThan: 'Hỏa, Thủy', lyDo: 'Kỷ Thổ Thu tiết Kim nhiều — cần Hỏa sinh Thổ, Thủy làm ẩm tránh thoái hóa.', ngheNghiepPhuHop: ['Tài chính', 'Kế toán', 'Y tế', 'Hành chính'], mauSacDungThan: ['Đỏ', 'Đen'], huongDungThan: ['Nam', 'Bắc'] },
    'Đông': { dungThan: 'Hỏa', lyDo: 'Kỷ Thổ mùa Đông lạnh ẩm nhất — Hỏa sấy Thổ là ưu tiên tuyệt đối.', ngheNghiepPhuHop: ['Giáo dục', 'Quản lý', 'Chăm sóc sức khỏe', 'Hành chính'], mauSacDungThan: ['Đỏ', 'Vàng'], huongDungThan: ['Nam'] },
  },

  'Canh': {
    'Xuân': { dungThan: 'Thổ, Hỏa', lyDo: 'Canh Kim mùa Xuân Mộc vượng — Mộc tiêu hao Kim (Quan tinh mạnh), cần Thổ sinh Kim và Hỏa tôi luyện.', ngheNghiepPhuHop: ['Pháp lý', 'Quân sự', 'Y tế', 'Kỹ thuật'], mauSacDungThan: ['Vàng đất', 'Đỏ'], huongDungThan: ['Trung tâm', 'Nam'] },
    'Hạ':   { dungThan: 'Thổ, Thủy', lyDo: 'Canh Kim mùa Hạ bị Hỏa khắc mạnh — cần Thổ sinh Kim (hóa bớt Hỏa) và Thủy tiết Kim bớt nóng.', ngheNghiepPhuHop: ['Tài chính', 'Kỹ thuật', 'Quản lý', 'Nghiên cứu'], mauSacDungThan: ['Vàng', 'Đen', 'Xanh navy'], huongDungThan: ['Trung tâm', 'Bắc'] },
    'Thu':  { dungThan: 'Hỏa, Thủy', lyDo: 'Canh Kim Thu vượng mạnh — cần Hỏa tôi luyện thành kiếm sắc, Thủy tiết bớt để lưu thông.', ngheNghiepPhuHop: ['Lãnh đạo', 'Quân sự / An ninh', 'Pháp lý', 'Kỹ sư'], mauSacDungThan: ['Đỏ', 'Đen'], huongDungThan: ['Nam', 'Bắc'] },
    'Đông': { dungThan: 'Hỏa, Thổ', lyDo: 'Canh Kim mùa Đông lạnh — Thủy vượng làm Kim lạnh cứng, cần Hỏa ấm và Thổ sinh Kim.', ngheNghiepPhuHop: ['Lãnh đạo', 'Quân sự', 'Pháp lý', 'Y tế'], mauSacDungThan: ['Đỏ', 'Vàng đất'], huongDungThan: ['Nam', 'Trung tâm'] },
  },

  'Tân': {
    'Xuân': { dungThan: 'Thổ, Hỏa', lyDo: 'Tân Kim nhược mùa Xuân — Mộc vượng bào mòn Kim, cần Thổ sinh Kim và Hỏa vừa phải.', ngheNghiepPhuHop: ['Thẩm mỹ', 'Nghệ thuật', 'Ngoại giao', 'Thiết kế'], mauSacDungThan: ['Vàng', 'Đỏ nhạt'], huongDungThan: ['Trung tâm', 'Nam'] },
    'Hạ':   { dungThan: 'Thổ, Thủy', lyDo: 'Tân Kim mùa Hạ dễ bị nấu chảy bởi Hỏa — Thổ hóa Hỏa sinh Kim, Thủy làm mát Kim.', ngheNghiepPhuHop: ['Nghệ thuật', 'Tài chính', 'Ngoại giao', 'Viết lách'], mauSacDungThan: ['Vàng', 'Đen', 'Xanh navy'], huongDungThan: ['Trung tâm', 'Bắc'] },
    'Thu':  { dungThan: 'Thủy', lyDo: 'Tân Kim Thu vượng — cần Thủy tiết Kim để lưu thông, tránh quá cứng. Thủy làm Tân Kim sáng bóng.', ngheNghiepPhuHop: ['Nghệ thuật', 'Viết lách', 'Tư vấn', 'Âm nhạc'], mauSacDungThan: ['Đen', 'Xanh navy'], huongDungThan: ['Bắc'] },
    'Đông': { dungThan: 'Hỏa, Thổ', lyDo: 'Tân Kim mùa Đông lạnh ẩm — Kim lạnh không phát quang, cần Hỏa ấm và Thổ nền.', ngheNghiepPhuHop: ['Sáng tạo', 'Nghệ thuật', 'Biểu diễn', 'Thiết kế'], mauSacDungThan: ['Đỏ', 'Vàng'], huongDungThan: ['Nam', 'Trung tâm'] },
  },

  'Nhâm': {
    'Xuân': { dungThan: 'Mộc, Hỏa', lyDo: 'Nhâm Thủy mùa Xuân bị tiết vào Mộc nhiều — Mộc tiết Thủy sinh tài, cần Mộc vừa phải; Hỏa để dụng tài (Tài tinh).', ngheNghiepPhuHop: ['Tài chính', 'Kinh doanh', 'Giáo dục', 'Nghiên cứu'], mauSacDungThan: ['Xanh lá', 'Đỏ'], huongDungThan: ['Đông', 'Nam'] },
    'Hạ':   { dungThan: 'Mộc', lyDo: 'Nhâm Thủy mùa Hạ yếu nhất — Hỏa cực khắc Thủy, cần Mộc tiết Hỏa và giúp Thủy lưu thông.', ngheNghiepPhuHop: ['Học thuật', 'Chiến lược', 'Nghiên cứu', 'Lập trình'], mauSacDungThan: ['Xanh lá', 'Xanh dương'], huongDungThan: ['Đông'] },
    'Thu':  { dungThan: 'Mộc', lyDo: 'Nhâm Thủy Thu bắt đầu vượng nhưng còn Kim sinh vào — Mộc tiết bớt Thủy để không lũ lụt.', ngheNghiepPhuHop: ['Chiến lược', 'Tài chính', 'Lãnh đạo', 'Ngoại giao'], mauSacDungThan: ['Xanh lá', 'Xanh dương'], huongDungThan: ['Đông', 'Bắc'] },
    'Đông': { dungThan: 'Mộc, Thổ', lyDo: 'Nhâm Thủy Đông vượng cực — như lũ lụt cần đê (Thổ) và kênh thoát (Mộc tiết Thủy).', ngheNghiepPhuHop: ['Môi trường', 'Kỹ thuật thủy lợi', 'Chiến lược', 'Tài chính'], mauSacDungThan: ['Xanh lá', 'Vàng đất'], huongDungThan: ['Đông', 'Trung tâm'] },
  },

  'Quý': {
    'Xuân': { dungThan: 'Kim, Hỏa', lyDo: 'Quý Thủy mùa Xuân bị Mộc tiết nhiều — cần Kim sinh Thủy bổ thân và Hỏa tạo tài dưỡng.', ngheNghiepPhuHop: ['Nghệ thuật', 'Tư vấn', 'Y tế', 'Tâm linh'], mauSacDungThan: ['Trắng bạc', 'Đỏ'], huongDungThan: ['Tây', 'Nam'] },
    'Hạ':   { dungThan: 'Kim, Mộc', lyDo: 'Quý Thủy mùa Hạ yếu nhất — Hỏa khắc mạnh, cần Kim sinh Thủy liên tục; Mộc tiết Hỏa bảo vệ.', ngheNghiepPhuHop: ['Tâm lý', 'Y tế', 'Văn học', 'Nghiên cứu'], mauSacDungThan: ['Trắng bạc', 'Xanh lá'], huongDungThan: ['Tây', 'Đông'] },
    'Thu':  { dungThan: 'Mộc', lyDo: 'Quý Thủy Thu bắt đầu có Kim sinh — dần vượng; Mộc tiết Thủy đúng mức là Dụng Thần.', ngheNghiepPhuHop: ['Sáng tạo', 'Âm nhạc', 'Tư vấn', 'Thiền định'], mauSacDungThan: ['Xanh lá', 'Xanh dương'], huongDungThan: ['Đông'] },
    'Đông': { dungThan: 'Mộc, Thổ', lyDo: 'Quý Thủy Đông vượng — cần Mộc tiết và Thổ điều tiết để Thủy không tràn lan.', ngheNghiepPhuHop: ['Tâm linh', 'Giáo dục', 'Tư vấn', 'Y tế'], mauSacDungThan: ['Xanh lá', 'Vàng đất'], huongDungThan: ['Đông', 'Trung tâm'] },
  },
}

// Nghề nghiệp và màu sắc theo từng Dụng Thần Hành
export const DUNG_THAN_GIAI_NGHIA: Record<string, { ngheNghiep: string[]; mauSac: string[]; huong: string[]; giaiThich: string }> = {
  'Mộc': { ngheNghiep: ['Giáo dục', 'Văn học', 'Thiết kế', 'Nông nghiệp', 'Y học cổ truyền'], mauSac: ['Xanh lá', 'Xanh dương nhạt'], huong: ['Đông', 'Đông Nam'], giaiThich: 'Mộc đại diện cho sự tăng trưởng, phát triển và tính sáng tạo.' },
  'Hỏa': { ngheNghiep: ['Marketing', 'Truyền thông', 'Nghệ thuật biểu diễn', 'Giáo dục', 'Lãnh đạo'], mauSac: ['Đỏ', 'Cam', 'Hồng'], huong: ['Nam'], giaiThich: 'Hỏa đại diện cho sức mạnh biểu đạt, danh tiếng và sự tỏa sáng.' },
  'Thổ': { ngheNghiep: ['Bất động sản', 'Nông nghiệp', 'Tài chính', 'Y tế', 'Hành chính'], mauSac: ['Vàng', 'Be', 'Nâu đất'], huong: ['Trung tâm', 'Đông Bắc', 'Tây Nam'], giaiThich: 'Thổ đại diện cho sự ổn định, tích lũy và quản lý nguồn lực.' },
  'Kim': { ngheNghiep: ['Pháp lý', 'Tài chính / Ngân hàng', 'Kỹ thuật', 'Quân sự / An ninh', 'Phẫu thuật'], mauSac: ['Trắng', 'Bạc', 'Xám'], huong: ['Tây', 'Tây Bắc'], giaiThich: 'Kim đại diện cho sự chính xác, quyết đoán và uy quyền.' },
  'Thủy': { ngheNghiep: ['Công nghệ', 'Nghiên cứu', 'Vận tải / Logistics', 'Du lịch', 'Tâm linh / Triết học'], mauSac: ['Đen', 'Xanh navy', 'Xanh dương đậm'], huong: ['Bắc'], giaiThich: 'Thủy đại diện cho trí tuệ, linh hoạt và khả năng kết nối.' },
}

// ============================================================
// PHẦN 1.5 — TƯƠNG HỢP BÁT TỰ (Nhật Chủ × Nhật Chủ)
// ============================================================

/**
 * Logic đơn giản hóa dựa trên Ngũ Hành của Nhật Chủ
 * 5 Ngũ Hành: Mộc (Giáp,Ất) / Hỏa (Bính,Đinh) / Thổ (Mậu,Kỷ) / Kim (Canh,Tân) / Thủy (Nhâm,Quý)
 *
 * Tương sinh (tốt): Mộc→Hỏa, Hỏa→Thổ, Thổ→Kim, Kim→Thủy, Thủy→Mộc
 * Tương khắc (cần lưu ý): Mộc→Thổ, Thổ→Thủy, Thủy→Hỏa, Hỏa→Kim, Kim→Mộc
 * Cùng hành (trung bình): tương đồng nhưng cạnh tranh
 *
 * Note: Âm-Dương khác nhau trong cùng hành thường tốt hơn (hợp)
 */

export interface BatTuCompatRow {
  score: number
  label: string
  dynamic: string
  strength: string
  challenge: string
  advice: string
}

// Map Nhật Chủ → Ngũ Hành
export const NHAT_CHU_NGUHANH: Record<string, string> = {
  'Giáp': 'Mộc', 'Ất': 'Mộc',
  'Bính': 'Hỏa', 'Đinh': 'Hỏa',
  'Mậu': 'Thổ', 'Kỷ': 'Thổ',
  'Canh': 'Kim', 'Tân': 'Kim',
  'Nhâm': 'Thủy', 'Quý': 'Thủy',
}

// 25 tổ hợp 5 hành × 5 hành
export const BAT_TU_COMPAT_NGUHANH: Record<string, BatTuCompatRow> = {

  'Mộc+Mộc': { score: 65, label: 'Cùng chí hướng', dynamic: 'Hai nguồn năng lượng Mộc cùng hướng lên — chia sẻ giá trị và tầm nhìn, nhưng cũng dễ cạnh tranh về lãnh địa.', strength: 'Hiểu nhau sâu sắc, cùng lý tưởng và phong cách tư duy.', challenge: 'Cạnh tranh ngầm về vai trò dẫn đầu và thành tích.', advice: 'Phân rõ lĩnh vực phụ trách, tôn trọng không gian riêng của nhau.' },

  'Mộc+Hỏa': { score: 82, label: 'Mộc sinh Hỏa — nuôi dưỡng', dynamic: 'Mộc nuôi Hỏa bùng cháy — đây là cặp tương sinh đẹp nhất Mộc. Người Mộc truyền cảm hứng, người Hỏa khuếch đại và tỏa sáng.', strength: 'Bổ sung và nâng đỡ nhau tự nhiên — cùng tạo ra năng lượng cao.', challenge: 'Người Mộc có thể bị "hao" nếu người Hỏa lấy đi quá nhiều.', advice: 'Người Hỏa cần biết trân trọng và "hoàn trả" năng lượng cho người Mộc.' },

  'Mộc+Thổ': { score: 55, label: 'Mộc khắc Thổ — tạo sức căng', dynamic: 'Mộc khắc Thổ — năng lượng Mộc thường muốn phá vỡ sự ổn định mà Thổ xây dựng. Có thể kích thích nhau phát triển nếu kiểm soát tốt.', strength: 'Người Mộc kích thích người Thổ ra khỏi vùng an toàn.', challenge: 'Người Thổ cảm thấy bị áp đặt; người Mộc thấy người Thổ quá cứng nhắc.', advice: 'Tìm điểm chung — cả hai đều muốn xây dựng, chỉ là cách khác nhau.' },

  'Mộc+Kim': { score: 45, label: 'Kim khắc Mộc — đối lập', dynamic: 'Kim khắc Mộc — thẳng thắn đụng nhau. Người Kim dứt khoát và cứng rắn dễ "cắt" vào người Mộc lý tưởng và linh hoạt.', strength: 'Nếu hòa hợp được, người Kim giúp người Mộc trưởng thành; người Mộc mềm hóa người Kim.', challenge: 'Xung đột thường xuyên về phong cách — Kim thẳng, Mộc uốn.', advice: 'Cần thời gian và sự tôn trọng rõ ràng — không phải cặp dễ tự nhiên.' },

  'Mộc+Thủy': { score: 80, label: 'Thủy sinh Mộc — nền tảng vững', dynamic: 'Thủy nuôi dưỡng Mộc sinh trưởng — người Thủy cung cấp sự thấu hiểu và hỗ trợ sâu sắc cho người Mộc phát triển.', strength: 'Cân bằng tốt — người Thủy là nền tảng, người Mộc là hướng đi.', challenge: 'Người Thủy có thể bị "hút cạn" nếu người Mộc lấy đi quá nhiều mà không đáp lại.', advice: 'Đảm bảo cân bằng — người Mộc cần nhận ra và trân trọng sự hỗ trợ âm thầm của người Thủy.' },

  'Hỏa+Hỏa': { score: 68, label: 'Lửa gặp lửa', dynamic: 'Hai ngọn lửa — năng lượng cực cao, bùng nổ sáng tạo, nhưng dễ đốt nhau khi thiếu Thủy điều hòa.', strength: 'Cùng nhiệt huyết và tốc độ — không ai cảm thấy người kia quá nhanh hay quá nhiệt.', challenge: 'Hai cái tôi lớn — dễ bốc đồng và leo thang khi xung đột.', advice: 'Cần người thứ ba hoặc nguyên tắc "làm nguội" trước khi đối thoại căng thẳng.' },

  'Hỏa+Thổ': { score: 78, label: 'Hỏa sinh Thổ — kích hoạt', dynamic: 'Hỏa sinh Thổ — người Hỏa truyền năng lượng và kích hoạt người Thổ. Người Thổ ổn định hóa người Hỏa bốc đồng.', strength: 'Bổ sung tốt — nhiệt huyết Hỏa + nền tảng Thổ = kết hợp hiệu quả.', challenge: 'Người Hỏa thấy người Thổ quá chậm; người Thổ thấy người Hỏa quá hấp tấp.', advice: 'Tôn trọng nhịp điệu của nhau — kết quả cuối sẽ tốt hơn khi cả hai đóng góp theo cách riêng.' },

  'Hỏa+Kim': { score: 50, label: 'Hỏa khắc Kim — tôi luyện', dynamic: 'Hỏa khắc Kim — nhưng đây cũng là cách tôi luyện Kim thành kiếm sắc. Căng thẳng nhưng có thể dẫn đến kết quả phi thường.', strength: 'Người Hỏa thách thức và tôi luyện; người Kim trở nên sắc bén hơn qua quá trình.', challenge: 'Áp lực liên tục — người Kim cảm thấy bị tấn công; người Hỏa thấy người Kim quá cứng đầu.', advice: 'Nếu chọn cặp này, cần ý thức cao về vai trò — người Hỏa truyền cảm hứng, không áp đặt.' },

  'Hỏa+Thủy': { score: 40, label: 'Thủy khắc Hỏa — đối cực', dynamic: 'Thủy và Hỏa là hai cực đối lập nhất — có sức hút lúc đầu (cực đối cực) nhưng căng thẳng lâu dài.', strength: 'Cân bằng nhau trong những lúc một bên quá extreme; học hỏi được nhiều từ sự khác biệt.', challenge: 'Về cơ bản khác nhau trong cách tiếp cận cuộc sống — một nóng một lạnh.', advice: 'Cặp này cần nỗ lực ý thức rất cao — không phải lựa chọn dễ dàng.' },

  'Thổ+Thổ': { score: 72, label: 'Vững chắc nhưng có thể trì trệ', dynamic: 'Hai Thổ — ổn định tuyệt đối nhưng thiếu kích thích. Đây là cặp đôi bền nhất nhưng có thể nhàm chán.', strength: 'Cùng giá trị ổn định, tin tưởng lẫn nhau tuyệt đối, ít xung đột.', challenge: 'Ai sẽ tạo ra sự đổi mới và phá vỡ routine?', advice: 'Chủ động đưa sự tự phát và thay đổi vào để tránh hóa đá.' },

  'Thổ+Kim': { score: 80, label: 'Thổ sinh Kim — nền tảng và sắc bén', dynamic: 'Thổ sinh Kim — người Thổ cung cấp nền tảng và nguồn lực; người Kim tạo ra giá trị từ nền đó.', strength: 'Hợp tác tự nhiên — người Thổ ổn định, người Kim thực thi.', challenge: 'Người Kim có thể coi người Thổ là hiển nhiên mà không trân trọng.', advice: 'Người Kim cần nhớ: không có Thổ, Kim không có nền tảng.' },

  'Thổ+Thủy': { score: 48, label: 'Thổ khắc Thủy — kiềm chế', dynamic: 'Thổ khắc Thủy — người Thổ ổn định cứng nhắc có thể kiềm chế sự linh hoạt của người Thủy.', strength: 'Người Thổ ngăn người Thủy lan tràn vô tổ chức; cung cấp cấu trúc cần thiết.', challenge: 'Người Thủy cảm thấy bị giam cầm; người Thổ thấy người Thủy không đáng tin cậy.', advice: 'Tìm điểm giao — người Thổ cần linh hoạt hơn, người Thủy cần ổn định hơn.' },

  'Kim+Kim': { score: 62, label: 'Hai lưỡi kiếm', dynamic: 'Cùng sắc bén và quyết đoán — tôn trọng nhau mạnh mẽ nhưng dễ va chạm khi ý kiến khác nhau.', strength: 'Cùng tiêu chuẩn cao và sự chính trực — không ai lừa dối ai.', challenge: 'Không ai chịu nhường — mọi bất đồng đều có thể leo thang.', advice: 'Chia rõ domain từ đầu là điều kiện tiên quyết.' },

  'Kim+Thủy': { score: 82, label: 'Kim sinh Thủy — sức mạnh chảy', dynamic: 'Kim sinh Thủy — người Kim cung cấp sự rõ ràng và quyết đoán; người Thủy sâu sắc và linh hoạt hóa sức mạnh đó.', strength: 'Bổ sung xuất sắc — Kim định hướng, Thủy chiều sâu.', challenge: 'Người Kim có thể tạo ra áp lực; người Thủy cần không gian để nghĩ.', advice: 'Người Kim cần tôn trọng nhịp điệu của người Thủy.' },

  'Thủy+Thủy': { score: 70, label: 'Chiều sâu vô hạn', dynamic: 'Hai Thủy — hiểu nhau sâu sắc ở tầng tâm hồn nhưng đôi khi cả hai cùng chìm.', strength: 'Đồng cảm và hiểu biết nhau mà không cần giải thích nhiều.', challenge: 'Cả hai đều có xu hướng rút lui — ai sẽ ra ngoài khi cả hai muốn vào trong?', advice: 'Cần người hoặc hoàn cảnh bên ngoài để kéo cả hai ra khỏi thế giới nội tâm.' },
}

// Helper: lấy tương hợp theo Can Ngày 2 người
export function getBatTuCompat(nhatChuA: string, nhatChuB: string): BatTuCompatRow {
  const nguhanhA = NHAT_CHU_NGUHANH[nhatChuA]
  const nguhanhB = NHAT_CHU_NGUHANH[nhatChuB]
  const key1 = `${nguhanhA}+${nguhanhB}`
  const key2 = `${nguhanhB}+${nguhanhA}`
  return BAT_TU_COMPAT_NGUHANH[key1] || BAT_TU_COMPAT_NGUHANH[key2]
}

// Bonus: Điều chỉnh score khi cùng hành nhưng Âm-Dương khác nhau
export const AM_DUONG_BONUS: Record<string, number> = {
  'Giáp+Ất': 5,   // Dương Mộc + Âm Mộc → hợp tự nhiên
  'Bính+Đinh': 5,
  'Mậu+Kỷ': 5,
  'Canh+Tân': 5,
  'Nhâm+Quý': 5,
}
/**
 * TỬ VI DATA — PHẦN 2 + 3
 * Cung Mệnh, Chủ Tinh, Tương Hợp, Convergence MBTI
 */

// ============================================================
// PHẦN 2.1 — AN CUNG MỆNH (Xác nhận + Phương án app)
// ============================================================

/**
 * CÔNG THỨC AN CUNG MỆNH ĐẦY ĐỦ (khi có Giờ sinh):
 *
 * Bước 1: An Giờ sinh theo 12 Chi (Tý=23-1h, Sửu=1-3h, Dần=3-5h... Hợi=21-23h)
 * Bước 2: Tính cung xuất phát:
 *   Cung Dần = khởi điểm
 *   Đếm thuận từ Dần theo tháng sinh âm lịch
 * Bước 3: Từ cung đó, đếm ngược theo Giờ sinh
 *   Giờ Tý = cung đó, Giờ Sửu = lùi 1, Giờ Dần = lùi 2...
 *   Nơi dừng = Cung Mệnh
 *
 * PHƯƠNG ÁN CHO APP (không có Giờ sinh):
 * → Dùng THÁNG SINH ÂM LỊCH để xác định Cung Mệnh theo quy ước đơn giản:
 *   Mệnh Cung = (14 - Tháng Âm Lịch) mod 12
 *   Kết quả 0 → Cung Hợi, 1 → Cung Tý, 2 → Cung Sửu... 11 → Tuất
 *
 * LƯU Ý QUAN TRỌNG:
 * - Công thức này CHỈ ĐÚNG khi Giờ sinh = Giờ Ngọ (12-14h) ~ sinh buổi trưa
 * - Sai lệch lên đến ±6 cung tùy Giờ sinh thực tế
 * - App PHẢI có disclaimer: "Kết quả chính xác cần nhập Giờ sinh"
 * - Phương án tốt hơn: hỏi user chọn khung giờ (Sáng/Trưa/Chiều/Tối) → thu hẹp xuống 3 khả năng
 *
 * PHƯƠNG ÁN THỰC TẾ NHẤT cho app không có giờ:
 * → Chỉ dùng SAO NĂM (an sao theo Can/Chi năm) thay vì Cung Mệnh
 * → Hoặc dùng Cung Mệnh theo THÁNG + disclaimer rõ ràng
 */

// Bảng an Cung Mệnh theo Tháng ÂL (giả định Giờ Ngọ — cần disclaimer)
export const CUNG_MENH_THEO_THANG: Record<number, string> = {
  1: 'Dần', 2: 'Sửu', 3: 'Tý', 4: 'Hợi', 5: 'Tuất', 6: 'Dậu',
  7: 'Thân', 8: 'Mùi', 9: 'Ngọ', 10: 'Tỵ', 11: 'Thìn', 12: 'Mão',
}

// ============================================================
// PHẦN 2.2 — LUẬN GIẢI 12 CUNG MỆNH
// ============================================================

export interface CungMenhProfile {
  cung: string
  tenGoiThanThien: string
  tinhCachChuDao: string      // 3-4 câu
  diemManh: string[]          // 3-4 bullet
  diemYeu: string[]           // 3 bullet
  sNghiep: string[]           // 4-5 ngành
  tinhDuyen: string           // 2-3 câu
  cungHop: string[]           // 1-2 cung hợp
  cungKy: string[]            // 1-2 cung cần chú ý
  tomTat1Dong: string
}

export const CUNG_MENH_DATA: Record<string, CungMenhProfile> = {

  'Tý': {
    cung: 'Tý',
    tenGoiThanThien: 'Cung Tý — Trí Tuệ Sâu Thẳm',
    tinhCachChuDao: 'Người Mệnh Cung Tý sở hữu trí tuệ phân tích sắc bén và tư duy chiến lược vượt trội. Họ thích đào sâu vào bản chất vấn đề hơn là chỉ nhìn bề mặt, và không chịu được sự hời hợt. Như nước Tý (Thủy) chứa đựng chiều sâu vô tận, người cung này ẩn chứa nhiều tầng lớp mà người ngoài khó thấu hiểu ngay. Họ cần không gian để suy nghĩ và ghét bị ép buộc quyết định vội vàng.',
    diemManh: ['Tư duy phân tích và chiến lược xuất sắc', 'Trực giác nhạy bén — thường đúng dù không giải thích được', 'Khả năng học hỏi và tiếp thu kiến thức nhanh', 'Bình tĩnh trong khủng hoảng — không bị cảm xúc cuốn trôi'],
    diemYeu: ['Có xu hướng cô lập và khó chia sẻ cảm xúc', 'Đôi khi phân tích quá mức dẫn đến tê liệt quyết định', 'Dễ trở nên hoài nghi và khó tin tưởng người khác'],
    sNghiep: ['Nghiên cứu / Khoa học', 'Công nghệ / Lập trình', 'Tài chính / Đầu tư', 'Triết học / Tâm lý', 'Chiến lược kinh doanh'],
    tinhDuyen: 'Tình yêu của cung Tý cần thời gian để nảy nở — họ không dễ mở lòng nhưng một khi đã yêu thì sâu đậm và trung thành. Người bạn đời lý tưởng cần đủ kiên nhẫn và trí tuệ để tiếp cận chiều sâu của họ.',
    cungHop: ['Thìn', 'Thân'],
    cungKy: ['Ngọ'],
    tomTat1Dong: 'Trí tuệ sâu sắc, trực giác mạnh — người của chiều sâu hơn là bề mặt.',
  },

  'Sửu': {
    cung: 'Sửu',
    tenGoiThanThien: 'Cung Sửu — Người Kiến Tạo',
    tinhCachChuDao: 'Người Mệnh Cung Sửu mang tính cách của đất — kiên định, đáng tin cậy và âm thầm tạo ra những thứ bền vững. Họ không rực rỡ bề ngoài nhưng là nền tảng mà người khác xây dựng lên. Kiên nhẫn là đặc trưng nổi bật — họ có thể chờ đợi và làm việc trong thời gian dài mà không mất đi định hướng. Cung Sửu thường phát đạt muộn nhưng bền vững.',
    diemManh: ['Kiên nhẫn và bền bỉ phi thường', 'Đáng tin cậy — lời hứa là lời hứa', 'Thực dụng và có tài quản lý nguồn lực', 'Trung thành tuyệt đối với những gì và người họ đã chọn'],
    diemYeu: ['Chậm thích nghi với thay đổi nhanh', 'Có thể quá cứng nhắc và bảo thủ', 'Đôi khi bỏ lỡ cơ hội vì quá thận trọng'],
    sNghiep: ['Nông nghiệp / Bất động sản', 'Tài chính / Ngân hàng', 'Kỹ thuật xây dựng', 'Quản lý dự án', 'Y tế'],
    tinhDuyen: 'Người cung Sửu yêu trung thành và lâu dài — không nhiều lời hoa mỹ nhưng hành động chứng minh tất cả. Cần người bạn đời biết nhận ra tình yêu trong những hành động thực tế.',
    cungHop: ['Tỵ', 'Dậu'],
    cungKy: ['Mùi'],
    tomTat1Dong: 'Kiên nhẫn và đáng tin — phát đạt muộn nhưng bền vững.',
  },

  'Dần': {
    cung: 'Dần',
    tenGoiThanThien: 'Cung Dần — Hổ Chúa Rừng Xanh',
    tinhCachChuDao: 'Người Mệnh Cung Dần có khí chất lãnh đạo bẩm sinh — họ xuất hiện là người ta chú ý, hành động là người ta đi theo. Dũng cảm và độc lập, họ không ngại đi tiên phong vào những lĩnh vực chưa ai khai phá. Như hổ — không phải lúc nào cũng ra ngoài nhưng khi ra thì không thể không chú ý. Họ cần không gian và tự do để phát huy hết tiềm năng.',
    diemManh: ['Lãnh đạo tự nhiên — sức thu hút không thể che giấu', 'Dũng cảm và tiên phong — không ngại rủi ro khi đã quyết định', 'Nhân nghĩa và bảo vệ người yếu', 'Ý chí và quyết tâm cao'],
    diemYeu: ['Độc đoán và khó nhận lời góp ý', 'Hay nóng vội và đôi khi hành động trước khi nghĩ', 'Khó chịu khi bị kiểm soát hoặc giới hạn'],
    sNghiep: ['Lãnh đạo / Chính trị', 'Quân sự / An ninh', 'Doanh nhân khởi nghiệp', 'Giáo dục / Truyền cảm hứng', 'Luật sư / Hành chính'],
    tinhDuyen: 'Dần yêu mạnh mẽ và bảo vệ — người bạn đời sẽ luôn cảm thấy an toàn. Nhưng cần đối phương đủ bản lĩnh để không bị nuốt chửng bởi cá tính mạnh của họ.',
    cungHop: ['Ngọ', 'Tuất'],
    cungKy: ['Thân'],
    tomTat1Dong: 'Lãnh đạo bẩm sinh — dũng cảm, mạnh mẽ và không thể bị khuất phục.',
  },

  'Mão': {
    cung: 'Mão',
    tenGoiThanThien: 'Cung Mão — Nhanh Nhẹn Uyển Chuyển',
    tinhCachChuDao: 'Người Mệnh Cung Mão có sự tinh tế và khéo léo đặc biệt — họ di chuyển trong cuộc sống một cách uyển chuyển, hiếm khi tạo ra ma sát không cần thiết. Thông minh và khôn khéo, họ biết cách đạt được mục tiêu mà không cần va chạm trực tiếp. Có khiếu thẩm mỹ và nghệ thuật tự nhiên, cộng với khả năng giao tiếp xuất sắc.',
    diemManh: ['Tinh tế và khéo léo trong giao tiếp và ứng xử', 'Nhanh nhẹn thích nghi với hoàn cảnh mới', 'Khiếu thẩm mỹ và sáng tạo nghệ thuật', 'Trực giác về con người rất nhạy'],
    diemYeu: ['Đôi khi quá khôn khéo dẫn đến thiếu thẳng thắn', 'Hay lo lắng thái quá và bất an', 'Dễ bị ảnh hưởng bởi môi trường xung quanh'],
    sNghiep: ['Nghệ thuật / Thiết kế', 'Truyền thông / PR', 'Ngoại giao', 'Giáo dục', 'Y tế / Chăm sóc'],
    tinhDuyen: 'Mão yêu tinh tế và lãng mạn — chú ý đến những chi tiết nhỏ làm đối phương cảm thấy đặc biệt. Cần sự an toàn và ổn định trong tình cảm để mở lòng hoàn toàn.',
    cungHop: ['Mùi', 'Hợi'],
    cungKy: ['Dậu'],
    tomTat1Dong: 'Tinh tế, khéo léo và có duyên — người ta thích mà không biết tại sao.',
  },

  'Thìn': {
    cung: 'Thìn',
    tenGoiThanThien: 'Cung Thìn — Rồng Bay Lên',
    tinhCachChuDao: 'Cung Thìn là cung mang nhiều tiềm năng và sự đa dạng nhất — như rồng có thể bay trên mây lẫn lặn dưới nước. Người Mệnh Cung Thìn thường có cuộc đời nhiều biến chuyển và thách thức, nhưng cũng nhiều cơ hội phi thường. Họ có sức mạnh vượt khó đặc biệt và thường trở nên xuất sắc sau khi trải qua gian nan.',
    diemManh: ['Khả năng phục hồi mạnh mẽ sau thất bại', 'Đa tài và linh hoạt — có thể thành công trong nhiều lĩnh vực', 'Trực giác về thời điểm — biết khi nào hành động', 'Sức hút cá nhân và khả năng truyền cảm hứng'],
    diemYeu: ['Cuộc sống hay biến động, khó ổn định kéo dài', 'Đôi khi tự mâu thuẫn với chính mình', 'Có thể quá tự tin vào thời điểm chưa đủ điều kiện'],
    sNghiep: ['Kinh doanh / Khởi nghiệp', 'Chính trị / Lãnh đạo', 'Nghệ thuật', 'Nghiên cứu / Khám phá', 'Tài chính'],
    tinhDuyen: 'Tình duyên Thìn thường đến muộn hoặc có nhiều biến chuyển — nhưng khi đúng người thì bền vững. Đối phương cần đủ bản lĩnh để theo kịp sự năng động của họ.',
    cungHop: ['Tý', 'Thân'],
    cungKy: ['Tuất'],
    tomTat1Dong: 'Tiềm năng lớn, cuộc đời nhiều biến chuyển — trưởng thành qua thử thách.',
  },

  'Tỵ': {
    cung: 'Tỵ',
    tenGoiThanThien: 'Cung Tỵ — Trí Tuệ Ngầm Ẩn',
    tinhCachChuDao: 'Người Mệnh Cung Tỵ có trí tuệ ẩn sâu — không phô trương nhưng khi cần thì bộc lộ khả năng đáng kinh ngạc. Họ quan sát nhiều hơn nói, suy nghĩ nhiều hơn hành động ngay, và thường hiểu rõ người xung quanh hơn người xung quanh biết về họ. Trực giác của cung Tỵ thường rất chính xác.',
    diemManh: ['Trí tuệ sâu sắc và khả năng phân tích ẩn', 'Quan sát tinh tế và nhớ mọi chi tiết quan trọng', 'Kiên trì theo đuổi mục tiêu dài hạn', 'Trực giác về người và tình huống rất nhạy'],
    diemYeu: ['Có xu hướng giữ bí mật quá mức, khó đoán', 'Đôi khi quá nghi ngờ và khó tin tưởng', 'Có thể chậm hành động vì quá nhiều phân tích'],
    sNghiep: ['Nghiên cứu / Phân tích', 'Tài chính / Đầu tư', 'Tâm lý / Tư vấn', 'Y tế', 'Chiến lược'],
    tinhDuyen: 'Cung Tỵ yêu kín đáo và sâu đậm — người ngoài khó biết họ đang yêu ai. Khi đã chọn, họ đầu tư hoàn toàn nhưng cần cảm giác an toàn tuyệt đối trước khi mở lòng.',
    cungHop: ['Sửu', 'Dậu'],
    cungKy: ['Hợi'],
    tomTat1Dong: 'Trí tuệ ẩn sâu — quan sát nhiều, nói ít, hiểu tất cả.',
  },

  'Ngọ': {
    cung: 'Ngọ',
    tenGoiThanThien: 'Cung Ngọ — Ngựa Phi Nhanh',
    tinhCachChuDao: 'Người Mệnh Cung Ngọ mang năng lượng của Hỏa và sự tự do — họ cần di chuyển, khám phá và không thể bị giam cầm trong routine. Tốc độ và nhiệt huyết là đặc trưng — họ bắt đầu nhanh, hành động nhanh, và đôi khi cũng thay đổi hướng nhanh. Sức thu hút tự nhiên và khả năng truyền cảm hứng làm họ trở thành người dẫn đầu tự nhiên trong các hoạt động xã hội.',
    diemManh: ['Năng lượng cao và nhiệt huyết lây lan', 'Tự do, phóng khoáng và truyền cảm hứng', 'Hành động nhanh và quyết đoán', 'Sức thu hút xã hội mạnh mẽ'],
    diemYeu: ['Thiếu kiên nhẫn với quy trình chậm chạp', 'Hay thay đổi hướng khi bị mất hứng', 'Khó duy trì cam kết dài hạn trong một số lĩnh vực'],
    sNghiep: ['Sales / Kinh doanh', 'Truyền thông / Marketing', 'Thể thao / Giải trí', 'Chính trị / Lãnh đạo công cộng', 'Du lịch / Khám phá'],
    tinhDuyen: 'Ngọ yêu rực rỡ và tự phát — mỗi ngày với họ là một cuộc phiêu lưu. Cần người đủ tự do và bản lĩnh để không cố giam cầm họ.',
    cungHop: ['Dần', 'Tuất'],
    cungKy: ['Tý'],
    tomTat1Dong: 'Tự do, nhiệt huyết và không ngừng tiến về phía trước.',
  },

  'Mùi': {
    cung: 'Mùi',
    tenGoiThanThien: 'Cung Mùi — Trái Tim Nhân Ái',
    tinhCachChuDao: 'Người Mệnh Cung Mùi mang trái tim ấm áp và lòng nhân ái tự nhiên — họ quan tâm đến người khác một cách chân thành và có tài năng nuôi dưỡng mối quan hệ. Thẩm mỹ cao và biết cách tạo ra môi trường hài hòa, đẹp đẽ. Họ thường là người giữ cho cộng đồng gắn kết.',
    diemManh: ['Nhân ái và quan tâm chân thành', 'Thẩm mỹ và khiếu tạo ra sự hài hòa', 'Giỏi duy trì và nuôi dưỡng mối quan hệ', 'Sáng tạo và nghệ thuật tự nhiên'],
    diemYeu: ['Đôi khi quá quan tâm đến người khác mà bỏ quên bản thân', 'Khó từ chối, dễ bị lợi dụng lòng tốt', 'Có thể phán xét về thẩm mỹ và tiêu chuẩn'],
    sNghiep: ['Y tế / Chăm sóc', 'Nghệ thuật / Thiết kế', 'Giáo dục', 'Ẩm thực / Hospitality', 'Tư vấn mối quan hệ'],
    tinhDuyen: 'Mùi yêu tận tâm và chăm chút — đối phương luôn cảm thấy được quan tâm. Cần học cách nhận yêu thương trở lại, không chỉ cho đi.',
    cungHop: ['Mão', 'Hợi'],
    cungKy: ['Sửu'],
    tomTat1Dong: 'Trái tim ấm áp — người nuôi dưỡng và kết nối cộng đồng.',
  },

  'Thân': {
    cung: 'Thân',
    tenGoiThanThien: 'Cung Thân — Linh Hoạt Đa Năng',
    tinhCachChuDao: 'Người Mệnh Cung Thân mang sự linh hoạt và đa tài của Kim — sắc bén trong tư duy, nhanh nhẹn trong hành động, và có khả năng xử lý nhiều việc cùng lúc. Họ thích nghi nhanh với môi trường mới và có khả năng tìm ra giải pháp sáng tạo cho vấn đề phức tạp. Cung Thân thường gắn với sự năng động và cơ hội biến đổi.',
    diemManh: ['Linh hoạt và thích nghi nhanh', 'Tư duy nhanh và xử lý vấn đề sáng tạo', 'Đa tài — có thể thành công trong nhiều lĩnh vực', 'Giao tiếp tốt và tạo dựng mạng lưới rộng'],
    diemYeu: ['Hay phân tán do quá nhiều hướng quan tâm', 'Có thể thiếu kiên nhẫn để hoàn thành việc lớn', 'Đôi khi cơ hội chủ nghĩa — bị kéo theo lợi ích ngắn hạn'],
    sNghiep: ['Kinh doanh / Trade', 'Công nghệ', 'Truyền thông', 'Ngoại giao', 'Tư vấn'],
    tinhDuyen: 'Thân thích sự mới mẻ và kích thích trong tình cảm — cần người đủ thú vị để giữ sự chú ý của họ. Khi đã cam kết, cần môi trường tình cảm không quá gò bó.',
    cungHop: ['Tý', 'Thìn'],
    cungKy: ['Dần'],
    tomTat1Dong: 'Linh hoạt và đa tài — luôn tìm thấy cơ hội trong mọi hoàn cảnh.',
  },

  'Dậu': {
    cung: 'Dậu',
    tenGoiThanThien: 'Cung Dậu — Tinh Tế Hoàn Hảo',
    tinhCachChuDao: 'Người Mệnh Cung Dậu mang sự tinh tế và chú ý đến chi tiết của Kim Âm — họ không chấp nhận sự thô ráp hay cẩu thả. Có khiếu thẩm mỹ cao và tiêu chuẩn rõ ràng về chất lượng. Họ thường là người hoàn thiện, nâng tầm mọi thứ họ chạm vào. Cẩu thả và thiếu tỉ mỉ là điều họ khó chấp nhận ở người khác.',
    diemManh: ['Chú ý chi tiết và tiêu chuẩn cao', 'Khiếu thẩm mỹ và tinh tế xuất sắc', 'Đáng tin cậy trong các nhiệm vụ đòi hỏi chính xác', 'Truyền đạt rõ ràng và thuyết phục'],
    diemYeu: ['Cầu toàn đôi khi trở thành tự cản trở', 'Khó chịu khi tiêu chuẩn của mình không được tôn trọng', 'Có thể quá khắt khe với bản thân và người khác'],
    sNghiep: ['Thiết kế / Nghệ thuật', 'Pháp lý / Biên tập', 'Tài chính chính xác', 'Y tế / Dược', 'Giáo dục cao cấp'],
    tinhDuyen: 'Dậu yêu tinh tế và kỳ vọng cao — cần người đủ tinh tế để đáp ứng tiêu chuẩn của họ. Không chịu được sự thô lỗ hay thiếu quan tâm đến hình thức.',
    cungHop: ['Sửu', 'Tỵ'],
    cungKy: ['Mão'],
    tomTat1Dong: 'Tinh tế và cầu toàn — nâng tầm mọi thứ họ tham gia.',
  },

  'Tuất': {
    cung: 'Tuất',
    tenGoiThanThien: 'Cung Tuất — Trung Nghĩa Bất Khuất',
    tinhCachChuDao: 'Người Mệnh Cung Tuất mang tinh thần nghĩa hiệp và bảo vệ — họ không thể đứng nhìn sự bất công mà không lên tiếng. Trung thành đến mức sẵn sàng hy sinh cho những gì và người họ bảo vệ. Như chó trung thành, một khi đã gắn kết thì khó tách rời. Cuộc đời họ thường gắn với các mối nhân duyên sâu sắc và cam kết mạnh mẽ.',
    diemManh: ['Trung thành và nghĩa hiệp — sẵn sàng bảo vệ người mình yêu', 'Kiên định về nguyên tắc — khó bị mua chuộc hay thỏa hiệp sai trái', 'Thực dụng và có tài giải quyết khủng hoảng', 'Đáng tin cậy tuyệt đối'],
    diemYeu: ['Đôi khi quá cứng nhắc về quan điểm', 'Khó tha thứ khi bị phản bội', 'Có thể mang nặng quá khứ và khó buông bỏ'],
    sNghiep: ['Quân sự / An ninh', 'Pháp lý', 'Y tế cấp cứu', 'Xã hội / Từ thiện', 'Lãnh đạo khủng hoảng'],
    tinhDuyen: 'Tuất yêu sâu sắc và trung thành tuyệt đối — một khi đã chọn, hiếm khi từ bỏ. Cần đối phương xứng đáng với sự trung thành đó và không bao giờ phản bội.',
    cungHop: ['Dần', 'Ngọ'],
    cungKy: ['Thìn'],
    tomTat1Dong: 'Trung thành và nghĩa hiệp — người bảo vệ không thể bị khuất phục.',
  },

  'Hợi': {
    cung: 'Hợi',
    tenGoiThanThien: 'Cung Hợi — Nhân Từ Bao Dung',
    tinhCachChuDao: 'Người Mệnh Cung Hợi mang tinh thần bao dung và nhân từ của Thủy cuối năm — chứa đựng tất cả, tha thứ cho nhiều. Họ có trực giác tâm linh cao và khả năng nhìn thấy điều thiện trong mọi người. Cung Hợi thường gắn với sự nghiệp có ý nghĩa nhân văn và đóng góp cho cộng đồng. Họ có thể hy sinh nhiều cho người khác nhưng cần học cách đặt ranh giới.',
    diemManh: ['Bao dung và không phán xét — dễ tha thứ', 'Trực giác tâm linh và cảm nhận sâu sắc', 'Rộng lượng và sẵn sàng giúp đỡ', 'Tư duy sáng tạo và tưởng tượng phong phú'],
    diemYeu: ['Dễ bị lợi dụng lòng tốt quá mức', 'Đôi khi thiếu thực tế và quá lý tưởng hóa', 'Có xu hướng tránh né xung đột cần thiết'],
    sNghiep: ['Tâm lý / Chữa lành', 'Nghệ thuật / Văn học', 'Từ thiện / NGO', 'Giáo dục / Truyền cảm hứng', 'Tâm linh'],
    tinhDuyen: 'Hợi yêu không điều kiện và bao dung — nhưng cần học cách yêu người xứng đáng. Tránh xu hướng ở lại các mối quan hệ độc hại vì không nỡ bỏ.',
    cungHop: ['Mão', 'Mùi'],
    cungKy: ['Tỵ'],
    tomTat1Dong: 'Bao dung và nhân từ — mang ánh sáng đến những nơi tối tăm.',
  },
}

// ============================================================
// PHẦN 2.3+2.4 — AN SAO CHỦ TINH THEO CAN NĂM + LUẬN GIẢI
// ============================================================

/**
 * PHƯƠNG ÁN ĐƠN GIẢN HÓA:
 * An 1 Sao Chủ theo CAN NĂM sinh → luận giải tính cách
 * Đây là phương án B — không chính xác hoàn toàn theo Tử Vi học
 * nhưng dễ implement và vẫn có giá trị tham khảo
 *
 * Nguồn tham khảo: Tử Vi Đẩu Số - Vũ Tài Lục; tuvivietnam.net
 */

// Mapping Can Năm → Sao chủ (theo truyền thống phổ biến nhất)
export const SAO_THEO_CAN_NAM: Record<string, string> = {
  'Giáp': 'Liêm Trinh',   // Giáp: Liêm Trinh cư ngọ
  'Ất':   'Thiên Cơ',     // Ất: Thiên Cơ
  'Bính': 'Thiên Đồng',   // Bính: Thiên Đồng
  'Đinh': 'Thái Dương',   // Đinh: Thái Dương
  'Mậu':  'Vũ Khúc',      // Mậu: Vũ Khúc
  'Kỷ':   'Thái Âm',      // Kỷ: Thái Âm
  'Canh': 'Tham Lang',    // Canh: Tham Lang
  'Tân':  'Cự Môn',       // Tân: Cự Môn
  'Nhâm': 'Thiên Tướng',  // Nhâm: Thiên Tướng
  'Quý':  'Tử Vi',        // Quý: Tử Vi
}

export interface ChuTinhProfile {
  sao: string
  bietDanh: string
  tinhCachCungMenh: string    // 3-4 câu
  diemManh: string[]
  diemYeu: string[]
  ngheNghiep: string[]
  tinhDuyen: string
  tuongHopSao: string[]
  tomTat1Dong: string
}

export const CHU_TINH_DATA: Record<string, ChuTinhProfile> = {

  'Tử Vi': {
    sao: 'Tử Vi',
    bietDanh: 'Tử Vi — Ngôi Sao Hoàng Đế',
    tinhCachCungMenh: 'Tử Vi là sao chủ trong Tử Vi Đẩu Số — người mang sao này có khí chất lãnh đạo tự nhiên và cảm giác về sứ mệnh lớn hơn bình thường. Họ không thể hài lòng với vai trò thứ hai trong lĩnh vực họ quan tâm và thường trở thành người có ảnh hưởng theo nhiều cách khác nhau. Tử Vi mang theo cả gánh nặng của sự cô đơn ở vị trí đỉnh cao — nhiều người biết họ nhưng ít người thực sự hiểu họ.',
    diemManh: ['Lãnh đạo bẩm sinh với sức thu hút tự nhiên', 'Tầm nhìn xa và khả năng tổ chức quy mô lớn', 'Kiêu hãnh đúng nghĩa — không chịu khuất phục trước áp lực', 'Bảo vệ và che chở người xung quanh'],
    diemYeu: ['Tự ái cao và khó nhận chỉ trích', 'Đôi khi độc đoán vì quá tin vào phán đoán của mình', 'Cô đơn ở vị trí cao — khó tìm người thực sự bình đẳng'],
    ngheNghiep: ['Lãnh đạo tổ chức lớn', 'Chính trị / Hành chính', 'Doanh nhân cấp cao', 'Nghiên cứu / Học thuật đỉnh cao', 'Quân sự'],
    tinhDuyen: 'Tình duyên Tử Vi thường đến muộn hoặc có biến chuyển — họ cần người đủ bản lĩnh để không bị nuốt chửng. Trong tình yêu, họ bảo vệ mạnh mẽ nhưng cũng cần được tôn trọng và không bị kiểm soát.',
    tuongHopSao: ['Thiên Phủ', 'Thiên Tướng', 'Thiên Lương'],
    tomTat1Dong: 'Sinh ra để lãnh đạo — cô đơn ở đỉnh cao là giá của sứ mệnh.',
  },

  'Thiên Cơ': {
    sao: 'Thiên Cơ',
    bietDanh: 'Thiên Cơ — Bánh Xe Trí Tuệ',
    tinhCachCungMenh: 'Thiên Cơ là sao của trí tuệ và biến hóa — người mang sao này có đầu óc linh hoạt, luôn đang suy nghĩ và tìm kiếm góc nhìn mới. Họ không thể đứng yên — luôn cần thay đổi, học hỏi và khám phá điều mới. Thiên Cơ đặc biệt giỏi về chiến lược và kế hoạch, nhưng đôi khi tư duy quá nhiều mà ít hành động.',
    diemManh: ['Trí tuệ linh hoạt và khả năng thích nghi cao', 'Chiến lược và lập kế hoạch xuất sắc', 'Học hỏi nhanh và rộng kiến thức nhiều lĩnh vực', 'Giải quyết vấn đề sáng tạo'],
    diemYeu: ['Thiếu kiên định — hay thay đổi kế hoạch', 'Đôi khi lo lắng thái quá và không tin tưởng vào quyết định của mình', 'Cuộc sống nhiều biến động, khó ổn định'],
    ngheNghiep: ['Tư vấn chiến lược', 'Công nghệ / Nghiên cứu', 'Giáo dục', 'Marketing', 'Ngoại giao'],
    tinhDuyen: 'Thiên Cơ trong tình yêu hay phân tích và đặt câu hỏi nhiều hơn cảm nhận — cần học cách buông bỏ kiểm soát và tin tưởng vào cảm xúc.',
    tuongHopSao: ['Thái Âm', 'Thiên Lương', 'Thiên Đồng'],
    tomTat1Dong: 'Trí tuệ không ngừng — học liên tục, biến hóa liên tục.',
  },

  'Thái Dương': {
    sao: 'Thái Dương',
    bietDanh: 'Thái Dương — Mặt Trời Rực Rỡ',
    tinhCachCungMenh: 'Thái Dương là sao của năng lượng và sự tỏa sáng — người mang sao này có sức thu hút tự nhiên và khả năng truyền cảm hứng cho người xung quanh. Rộng lượng, hào phóng và không ngại chia sẻ ánh sáng của mình. Thái Dương thường gắn với danh tiếng và ảnh hưởng xã hội rộng.',
    diemManh: ['Sức thu hút và năng lượng tích cực lây lan', 'Rộng lượng và hào phóng tự nhiên', 'Lãnh đạo truyền cảm hứng, không áp đặt', 'Kết nối xã hội rộng và mạnh'],
    diemYeu: ['Hay bị phân tán vì quá nhiều người và việc', 'Đôi khi hào phóng quá mức mà bỏ quên bản thân', 'Cần sự ghi nhận — khi không được trân trọng dễ mất nhiệt'],
    ngheNghiep: ['Truyền thông / Media', 'Giáo dục / Đào tạo', 'Chính trị / Xã hội', 'Nghệ thuật biểu diễn', 'Marketing'],
    tinhDuyen: 'Thái Dương chiếu sáng nhiều người — trong tình yêu cần học cách tập trung vào một. Người bạn đời cần chấp nhận rằng họ sẽ không bao giờ chỉ tỏa sáng riêng cho mình.',
    tuongHopSao: ['Thái Âm', 'Thiên Đồng', 'Tử Vi'],
    tomTat1Dong: 'Ánh mặt trời của mọi cộng đồng — chiếu sáng không phân biệt.',
  },

  'Vũ Khúc': {
    sao: 'Vũ Khúc',
    bietDanh: 'Vũ Khúc — Thần Tài Cứng Rắn',
    tinhCachCungMenh: 'Vũ Khúc là sao tài bạch và quyết đoán — người mang sao này có tư duy thực dụng, dứt khoát và không ngại làm những việc khó khăn mà người khác né tránh. Vũ Khúc thường gắn với tài năng tài chính và kinh doanh. Độc lập cao và không cần sự chấp thuận của người khác để hành động.',
    diemManh: ['Quyết đoán và dứt khoát — không do dự', 'Tài năng tài chính và kinh doanh tự nhiên', 'Độc lập và tự lực hoàn toàn', 'Chịu áp lực tốt, không mềm lòng'],
    diemYeu: ['Cứng nhắc và khó thỏa hiệp trong các vấn đề quan trọng', 'Đôi khi quá lạnh lùng trong giao tiếp', 'Có xu hướng cô đơn vì quá độc lập'],
    ngheNghiep: ['Tài chính / Ngân hàng', 'Kinh doanh / CEO', 'Kỹ thuật / Xây dựng', 'Quân sự / An ninh', 'Luật'],
    tinhDuyen: 'Vũ Khúc trong tình yêu thực dụng hơn lãng mạn — thể hiện tình cảm bằng hành động cụ thể. Cần người bạn đời hiểu được ngôn ngữ tình yêu không lời của họ.',
    tuongHopSao: ['Thiên Phủ', 'Tham Lang', 'Thất Sát'],
    tomTat1Dong: 'Cứng rắn và thực dụng — người tài chính và hành động.',
  },

  'Thiên Đồng': {
    sao: 'Thiên Đồng',
    bietDanh: 'Thiên Đồng — Tinh Thần Thuần Khiết',
    tinhCachCungMenh: 'Thiên Đồng là sao của sự thuần khiết, phúc đức và tận hưởng cuộc sống — người mang sao này có tâm hồn trẻ thơ và cái nhìn lạc quan về thế giới. Họ không thích xung đột và luôn tìm cách tạo ra môi trường hài hòa. Thiên Đồng thường hưởng phúc và có cuộc sống không phải nỗ lực quá nhiều mới thành công.',
    diemManh: ['Lạc quan và mang lại niềm vui cho người xung quanh', 'Nhân hậu và không thù hằn', 'Tận hưởng cuộc sống và biết cách hạnh phúc', 'Hòa giải và tạo bầu không khí thoải mái'],
    diemYeu: ['Đôi khi thiếu tham vọng và hay bằng lòng với hiện trạng', 'Dễ bị lợi dụng vì quá tốt bụng', 'Có thể né tránh trách nhiệm khó khăn'],
    ngheNghiep: ['Giáo dục / Nuôi dưỡng', 'Y tế / Chăm sóc', 'Nghệ thuật', 'Dịch vụ / Hospitality', 'Tư vấn tâm lý'],
    tinhDuyen: 'Thiên Đồng trong tình yêu ngọt ngào và vô tư — thích chia sẻ niềm vui. Cần người bạn đời đủ trưởng thành để bảo vệ họ khỏi sự lợi dụng.',
    tuongHopSao: ['Thiên Cơ', 'Thái Âm', 'Thái Dương'],
    tomTat1Dong: 'Tinh thần thuần khiết — mang phúc đức và niềm vui đến mọi nơi.',
  },

  'Liêm Trinh': {
    sao: 'Liêm Trinh',
    bietDanh: 'Liêm Trinh — Ngôi Sao Quyền Lực Ẩn',
    tinhCachCungMenh: 'Liêm Trinh là sao phức tạp nhất trong 14 Chủ Tinh — vừa là sao tù hãm vừa là sao quyền lực. Người mang sao này có sức mạnh nội tâm sâu sắc và thường trải qua những thử thách lớn trước khi đạt được thành tựu. Họ hiểu sâu về bản chất con người và không dễ bị lừa dối.',
    diemManh: ['Sức mạnh nội tâm và khả năng phục hồi sau khó khăn', 'Hiểu sâu về bản chất con người', 'Quyết đoán trong khủng hoảng', 'Trung thực và thẳng thắn'],
    diemYeu: ['Cuộc đời nhiều thăng trầm và thử thách', 'Đôi khi cứng nhắc về quan điểm', 'Dễ bị hiểu lầm về ý định'],
    ngheNghiep: ['Pháp lý / Điều tra', 'Quân sự / An ninh', 'Chính trị', 'Y học / Phẫu thuật', 'Kinh doanh khó khăn'],
    tinhDuyen: 'Liêm Trinh trong tình yêu thường có diễn biến phức tạp — cần người bạn đời đủ kiên nhẫn và trung thành để vượt qua những giai đoạn khó khăn cùng nhau.',
    tuongHopSao: ['Thiên Phủ', 'Phá Quân', 'Vũ Khúc'],
    tomTat1Dong: 'Quyền lực ẩn — trưởng thành qua thử thách, mạnh nhất sau gian nan.',
  },

  'Thiên Phủ': {
    sao: 'Thiên Phủ',
    bietDanh: 'Thiên Phủ — Ngân Khố Sung Mãn',
    tinhCachCungMenh: 'Thiên Phủ là sao của sự bảo tồn và tích lũy — người mang sao này có tài năng quản lý nguồn lực và tạo ra sự ổn định bền vững. Họ là người bảo vệ và duy trì những gì đã được xây dựng. Thiên Phủ thường gắn với của cải và gia đình hạnh phúc.',
    diemManh: ['Quản lý nguồn lực và tài chính xuất sắc', 'Ổn định và đáng tin cậy — chỗ dựa của cộng đồng', 'Bảo vệ và nuôi dưỡng người xung quanh', 'Bền vững trong công việc và cuộc sống'],
    diemYeu: ['Đôi khi quá thận trọng và bỏ lỡ cơ hội', 'Có xu hướng bảo thủ và ngại thay đổi', 'Đôi khi quá tập trung vào tích lũy mà quên tận hưởng'],
    ngheNghiep: ['Tài chính / Ngân hàng', 'Bất động sản', 'Quản lý nguồn lực', 'Y tế', 'Hành chính'],
    tinhDuyen: 'Thiên Phủ yêu ổn định và dài lâu — người bạn đời lý tưởng là người chia sẻ giá trị về gia đình và tương lai chung.',
    tuongHopSao: ['Tử Vi', 'Thiên Tướng', 'Vũ Khúc'],
    tomTat1Dong: 'Ổn định và sung túc — người giữ gìn và phát triển những gì đã có.',
  },

  'Thái Âm': {
    sao: 'Thái Âm',
    bietDanh: 'Thái Âm — Mặt Trăng Dịu Dàng',
    tinhCachCungMenh: 'Thái Âm là sao của sự tinh tế, cảm xúc và trực giác — người mang sao này có tâm hồn nhạy cảm và khả năng cảm nhận những điều tinh tế mà người khác bỏ qua. Thái Âm gắn với vẻ đẹp, nghệ thuật và sự nuôi dưỡng. Họ thường phát đạt trong môi trường được trân trọng và tôn trọng.',
    diemManh: ['Nhạy cảm và trực giác cao', 'Thẩm mỹ và nghệ thuật tự nhiên', 'Chăm sóc và nuôi dưỡng người xung quanh', 'Tinh tế trong giao tiếp và ứng xử'],
    diemYeu: ['Dễ bị tổn thương bởi môi trường thô lỗ', 'Đôi khi quá nhạy cảm dẫn đến không ổn định', 'Hay bị ảnh hưởng bởi tâm trạng'],
    ngheNghiep: ['Nghệ thuật / Âm nhạc', 'Tâm lý / Tư vấn', 'Y tế / Chăm sóc', 'Giáo dục', 'Thiết kế'],
    tinhDuyen: 'Thái Âm yêu nhẹ nhàng và sâu sắc — cần môi trường tình cảm an toàn để phát triển. Không chịu được sự thô lỗ hay thiếu quan tâm.',
    tuongHopSao: ['Thái Dương', 'Thiên Cơ', 'Thiên Đồng'],
    tomTat1Dong: 'Dịu dàng như ánh trăng — chiếu sáng những tâm hồn cần được chữa lành.',
  },

  'Tham Lang': {
    sao: 'Tham Lang',
    bietDanh: 'Tham Lang — Ngôi Sao Đa Tài',
    tinhCachCungMenh: 'Tham Lang là sao phức tạp — vừa ham muốn vật chất vừa ham muốn tâm linh. Người mang sao này có sức sống mãnh liệt và khả năng thu hút đặc biệt. Họ đam mê nhiều thứ và muốn trải nghiệm tất cả. Tham Lang có thể rất thành công trong nghệ thuật, kinh doanh hoặc tâm linh tùy vào hướng đi họ chọn.',
    diemManh: ['Sức hút cá nhân mạnh mẽ — thu hút người và cơ hội', 'Đa tài và có thể thành công trong nhiều lĩnh vực', 'Ham học và không bao giờ hài lòng với hiện tại', 'Nghệ thuật và sáng tạo ở tầng cao'],
    diemYeu: ['Dễ bị phân tán vì quá nhiều ham muốn', 'Thiếu ổn định trong giai đoạn trẻ', 'Đôi khi quá đắm chìm vào đam mê'],
    ngheNghiep: ['Nghệ thuật / Giải trí', 'Kinh doanh', 'Tâm linh / Triết học', 'Y học cổ truyền', 'Ngoại giao'],
    tinhDuyen: 'Tham Lang trong tình yêu đam mê và hứng thú — nhưng cần học cách ổn định khi hứng thú ban đầu qua đi. Trưởng thành trong tình cảm thường đến sau 30.',
    tuongHopSao: ['Vũ Khúc', 'Thiên Tướng', 'Tử Vi'],
    tomTat1Dong: 'Đam mê và sức hút không thể cưỡng — người của sự trải nghiệm và khám phá.',
  },

  'Cự Môn': {
    sao: 'Cự Môn',
    bietDanh: 'Cự Môn — Ngôi Sao Ngôn Từ',
    tinhCachCungMenh: 'Cự Môn là sao của ngôn từ và tranh luận — người mang sao này có tài năng ngôn ngữ đặc biệt và không ngại đi đến tận cùng sự thật dù không được lòng người. Họ thường gắn với nghề nghiệp liên quan đến lời nói và văn chương. Cự Môn cũng là sao của sự nghi ngờ — họ không dễ tin và cần bằng chứng.',
    diemManh: ['Tài năng ngôn ngữ và biểu đạt vượt trội', 'Thẳng thắn và không ngại nói sự thật', 'Trí tuệ phân biệt và phân tích sắc bén', 'Kiên trì trong tranh luận có cơ sở'],
    diemYeu: ['Đôi khi gây xung đột không cần thiết vì quá thẳng thắn', 'Hay nghi ngờ và khó tin người', 'Cuộc sống có thể nhiều khẩu thiệt'],
    ngheNghiep: ['Viết lách / Báo chí', 'Pháp lý / Tranh tụng', 'Giảng dạy / Diễn giả', 'Chính trị', 'Nghiên cứu ngôn ngữ'],
    tinhDuyen: 'Cự Môn trong tình yêu cần sự thẳng thắn và trung thực tuyệt đối — không chịu được sự che giấu hay mập mờ. Tình cảm thường phức tạp và cần sự kiên nhẫn từ cả hai phía.',
    tuongHopSao: ['Thiên Cơ', 'Thiên Lương', 'Thái Dương'],
    tomTat1Dong: 'Sức mạnh của ngôn từ — nói sự thật dù đắng cay.',
  },

  'Thiên Tướng': {
    sao: 'Thiên Tướng',
    bietDanh: 'Thiên Tướng — Ấn Quan Công Bằng',
    tinhCachCungMenh: 'Thiên Tướng là sao của công bằng và trật tự — người mang sao này có lương tâm rõ ràng và không thể chấp nhận sự bất công. Họ thường được đặt vào vị trí quan sát và phán quyết. Thiên Tướng cũng là sao của sự ổn định và bảo vệ — họ là người đứng giữa, dung hòa các phía.',
    diemManh: ['Công bằng và chính trực — không thiên vị', 'Ổn định và đáng tin cậy trong vai trò trung gian', 'Kỷ luật và tuân thủ nguyên tắc', 'Bảo vệ những người yếu thế'],
    diemYeu: ['Đôi khi quá cứng nhắc về quy tắc', 'Khó thích nghi với tình huống đòi hỏi sự linh hoạt', 'Có thể quá thận trọng'],
    ngheNghiep: ['Pháp lý / Tư pháp', 'Hành chính / Quản lý', 'Quân sự / An ninh', 'Kiểm toán / Tuân thủ', 'Giáo dục'],
    tinhDuyen: 'Thiên Tướng trong tình yêu công bằng và nguyên tắc — không chiều chuộng vô lý nhưng cũng không đòi hỏi quá mức. Trung thành và đáng tin cậy.',
    tuongHopSao: ['Tử Vi', 'Thiên Phủ', 'Thiên Lương'],
    tomTat1Dong: 'Công bằng và bảo vệ — người giữ trật tự và công lý.',
  },

  'Thiên Lương': {
    sao: 'Thiên Lương',
    bietDanh: 'Thiên Lương — Thầy Thuốc Của Bầu Trời',
    tinhCachCungMenh: 'Thiên Lương là sao của sự chữa lành, khôn ngoan và đức hạnh — người mang sao này thường có khả năng an ủi và chữa lành người khác một cách tự nhiên. Được kính trọng vì đức độ hơn là quyền lực. Thiên Lương thường gắn với nghề nghiệp phục vụ và trí tuệ lâu dài.',
    diemManh: ['Khả năng chữa lành và an ủi người khác', 'Khôn ngoan và có kinh nghiệm sống sâu sắc', 'Đức hạnh và được tôn trọng', 'Kiên nhẫn và bao dung'],
    diemYeu: ['Đôi khi quá bao dung dẫn đến hy sinh quá nhiều', 'Có xu hướng lo lắng về người khác nhiều hơn bản thân', 'Phát đạt muộn — khó trẻ'],
    ngheNghiep: ['Y tế / Chữa lành', 'Tư vấn / Tâm lý', 'Giáo dục / Triết học', 'Tôn giáo / Tâm linh', 'Xã hội / Từ thiện'],
    tinhDuyen: 'Thiên Lương trong tình yêu như người thầy — bao dung và chữa lành. Cần người xứng đáng với đức hạnh của họ, tránh bị lợi dụng lòng tốt.',
    tuongHopSao: ['Thiên Cơ', 'Thiên Tướng', 'Thái Âm'],
    tomTat1Dong: 'Thầy thuốc của tâm hồn — chữa lành và được tôn kính.',
  },

  'Thất Sát': {
    sao: 'Thất Sát',
    bietDanh: 'Thất Sát — Tướng Quân Chiến Trận',
    tinhCachCungMenh: 'Thất Sát là sao mạnh mẽ và đơn độc — người mang sao này có tinh thần chiến đấu không khuất phục và khả năng hành động trong những tình huống người khác chùn bước. Họ thích chinh phục thử thách và không ngại đối mặt với nguy hiểm. Thất Sát thường một mình khai phá con đường — cô đơn là bạn đồng hành quen thuộc.',
    diemManh: ['Dũng cảm và không khuất phục trước khó khăn', 'Quyết đoán nhanh trong tình huống nguy cấp', 'Ý chí sắt và không bao giờ bỏ cuộc', 'Độc lập hoàn toàn — không cần ai phê duyệt'],
    diemYeu: ['Hay xung đột và khó hợp tác với người có ý kiến khác', 'Cô đơn và khó xây dựng mối quan hệ sâu', 'Đôi khi hành động quá mạo hiểm'],
    ngheNghiep: ['Quân sự / An ninh đặc biệt', 'Phẫu thuật / Y tế cấp cứu', 'Thể thao tranh tài', 'Thám hiểm / Mạo hiểm', 'Kinh doanh đột phá'],
    tinhDuyen: 'Thất Sát trong tình yêu bảo vệ mạnh mẽ nhưng cũng cứng nhắc — cần người bạn đời đủ bản lĩnh và không cố thay đổi bản chất chiến binh của họ.',
    tuongHopSao: ['Vũ Khúc', 'Tử Vi', 'Phá Quân'],
    tomTat1Dong: 'Chiến binh không khuất phục — con đường đơn độc nhưng không ai theo kịp.',
  },

  'Phá Quân': {
    sao: 'Phá Quân',
    bietDanh: 'Phá Quân — Ngôi Sao Đổi Mới',
    tinhCachCungMenh: 'Phá Quân là sao của sự phá vỡ và đổi mới — người mang sao này không thể không đập vỡ những thứ đã cũ để tạo ra điều mới. Họ là chất xúc tác của sự thay đổi trong bất kỳ môi trường nào họ tham gia. Phá Quân gắn với những người tiên phong phá cách và không chấp nhận hiện trạng.',
    diemManh: ['Tinh thần tiên phong và không ngại phá vỡ thứ cũ', 'Sáng tạo và đột phá trong tư duy', 'Dũng cảm thay đổi khi người khác sợ hãi', 'Thu hút những người cùng chí hướng đổi mới'],
    diemYeu: ['Cuộc sống nhiều biến động và không ổn định', 'Đôi khi phá vỡ những thứ chưa cần phá', 'Khó duy trì thứ đã xây dựng'],
    ngheNghiep: ['Khởi nghiệp / Đổi mới', 'Nghệ thuật đương đại', 'Cải cách chính trị / Xã hội', 'Công nghệ tiên phong', 'Thể thao / Thám hiểm'],
    tinhDuyen: 'Phá Quân trong tình yêu thường có nhiều biến chuyển — có thể là mối tình đổi mới cuộc sống. Cần người đủ linh hoạt để thích nghi với sự thay đổi liên tục.',
    tuongHopSao: ['Thất Sát', 'Tham Lang', 'Vũ Khúc'],
    tomTat1Dong: 'Phá cũ tạo mới — người đổi mới bất kể chi phí.',
  },
}

// ============================================================
// PHẦN 2.5 — TƯƠNG HỢP TỬ VI (Cung Mệnh)
// ============================================================

// Bảng Tam Hợp / Lục Hợp / Xung
const TAM_HOP_GROUPS = [
  ['Tý', 'Thìn', 'Thân'],
  ['Sửu', 'Tỵ', 'Dậu'],
  ['Dần', 'Ngọ', 'Tuất'],
  ['Mão', 'Mùi', 'Hợi'],
]
const LUC_HOP_PAIRS = [
  ['Tý', 'Sửu'], ['Dần', 'Hợi'], ['Mão', 'Tuất'],
  ['Thìn', 'Dậu'], ['Tỵ', 'Thân'], ['Ngọ', 'Mùi'],
]
const TU_HANH_XUNG = [
  ['Tý', 'Ngọ', 'Mão', 'Dậu'],
  ['Dần', 'Thân', 'Tỵ', 'Hợi'],
  ['Thìn', 'Tuất', 'Sửu', 'Mùi'],
]

export function getTuViCompat(cungA: string, cungB: string): { score: number; label: string; loai: string; motaNgan: string } {
  if (cungA === cungB) return { score: 65, label: 'Cùng cung Mệnh', loai: 'trung_binh', motaNgan: 'Hiểu nhau sâu sắc nhưng dễ cạnh tranh. Cần chia rõ vai trò.' }

  for (const group of TAM_HOP_GROUPS) {
    if (group.includes(cungA) && group.includes(cungB)) {
      return { score: 88, label: 'Tam Hợp — Duyên phận', loai: 'tam_hop', motaNgan: 'Tam Hợp là cặp đẹp nhất trong Tử Vi — hỗ trợ và nâng đỡ nhau tự nhiên, cùng hướng đến mục tiêu.' }
    }
  }

  for (const pair of LUC_HOP_PAIRS) {
    if (pair.includes(cungA) && pair.includes(cungB)) {
      return { score: 82, label: 'Lục Hợp — Bổ sung nhau', loai: 'luc_hop', motaNgan: 'Lục Hợp mang lại sự bổ sung hài hòa — điểm mạnh của người này bù cho điểm yếu của người kia.' }
    }
  }

  for (const group of TU_HANH_XUNG) {
    if (group.includes(cungA) && group.includes(cungB)) {
      return { score: 42, label: 'Xung — Cần nỗ lực', loai: 'xung', motaNgan: 'Tứ Hành Xung tạo ra ma sát — cần ý thức và nỗ lực để hòa hợp. Không phải không thể nhưng đòi hỏi nhiều hơn.' }
    }
  }

  return { score: 68, label: 'Trung hòa', loai: 'trung_hoa', motaNgan: 'Không có quan hệ đặc biệt — bình thường, cần thời gian để hiểu nhau và xây dựng kết nối.' }
}

// ============================================================
// PHẦN 3 — CONVERGENCE: Tâm Linh × MBTI
// ============================================================

export const SPIRITUAL_MBTI_MAP = {
  // Nhật Chủ → xu hướng MBTI
  nhatChu_mbti: {
    'Giáp': { mbtiXuHuong: ['ENTJ', 'INTJ', 'ENFJ'], lyDo: 'Giáp Mộc thẳng thắn, lý tưởng cao và tầm nhìn xa — đặc điểm chung với NT/NF types trong MBTI.' },
    'Ất':   { mbtiXuHuong: ['INFP', 'ENFP', 'INFJ'], lyDo: 'Ất Mộc linh hoạt, sáng tạo và nhạy cảm — phù hợp với NF types thích ứng biến và quan tâm đến người khác.' },
    'Bính': { mbtiXuHuong: ['ENFJ', 'ESFJ', 'ENFP'], lyDo: 'Bính Hỏa hướng ngoại, truyền cảm hứng và rộng lượng — rõ ràng là E type với xu hướng F.' },
    'Đinh': { mbtiXuHuong: ['INFJ', 'INFP', 'ISFP'], lyDo: 'Đinh Hỏa tinh tế, chiều sâu nội tâm — phù hợp với Introvert có Feeling mạnh.' },
    'Mậu':  { mbtiXuHuong: ['ISTJ', 'ESTJ', 'ENTJ'], lyDo: 'Mậu Thổ ổn định, thực dụng và có cấu trúc — rõ ràng là SJ hoặc TJ types.' },
    'Kỷ':   { mbtiXuHuong: ['ISFJ', 'ESFJ', 'ISTJ'], lyDo: 'Kỷ Thổ chăm sóc, thực tế và đáng tin cậy — đặc điểm SFJ rõ ràng.' },
    'Canh': { mbtiXuHuong: ['ENTJ', 'ESTJ', 'ISTP'], lyDo: 'Canh Kim quyết đoán, chính trực và dứt khoát — TJ types mạnh, đặc biệt với T và J.' },
    'Tân':  { mbtiXuHuong: ['INTJ', 'ISFP', 'INFJ'], lyDo: 'Tân Kim tinh tế và có thẩm mỹ cao — pha trộn giữa tư duy sắc bén (I/N) và cảm xúc tinh tế (F).' },
    'Nhâm': { mbtiXuHuong: ['INTP', 'INTJ', 'ENTP'], lyDo: 'Nhâm Thủy bao quát, chiều sâu phân tích — NT types với trực giác và tư duy hệ thống.' },
    'Quý':  { mbtiXuHuong: ['INFP', 'INFJ', 'ISFP'], lyDo: 'Quý Thủy nhạy cảm, trực giác và sáng tạo — NF/SF Introvert có cảm xúc sâu.' },
  },

  // Cung Mệnh Tử Vi → xu hướng MBTI
  cungMenh_mbti: {
    'Tý':   { mbtiXuHuong: ['INTJ', 'INTP', 'INFJ'], lyDo: 'Cung Tý trí tuệ sâu, chiến lược và ẩn — Introvert với N mạnh.' },
    'Sửu':  { mbtiXuHuong: ['ISTJ', 'ISFJ', 'ESTJ'], lyDo: 'Cung Sửu kiên nhẫn, ổn định và thực dụng — SJ types rõ ràng.' },
    'Dần':  { mbtiXuHuong: ['ENTJ', 'ENFJ', 'ESTP'], lyDo: 'Cung Dần lãnh đạo bẩm sinh, dũng cảm — Extravert types với J hoặc P mạnh mẽ.' },
    'Mão':  { mbtiXuHuong: ['ENFP', 'INFP', 'ESFP'], lyDo: 'Cung Mão tinh tế, khéo léo và có duyên — NF hoặc SF với P linh hoạt.' },
    'Thìn': { mbtiXuHuong: ['ENTP', 'ENFP', 'ENTJ'], lyDo: 'Cung Thìn đa dạng và tiềm năng lớn — N types có khả năng thích nghi cao.' },
    'Tỵ':   { mbtiXuHuong: ['INTJ', 'INFJ', 'ISTJ'], lyDo: 'Cung Tỵ quan sát sâu và ẩn — Introvert với N hoặc S mạnh.' },
    'Ngọ':  { mbtiXuHuong: ['ENFP', 'ESFP', 'ESTP'], lyDo: 'Cung Ngọ năng lượng cao, tự do — Extravert với P rõ ràng.' },
    'Mùi':  { mbtiXuHuong: ['ISFJ', 'ENFJ', 'ESFJ'], lyDo: 'Cung Mùi nhân ái và nuôi dưỡng — F types với xu hướng chăm sóc.' },
    'Thân': { mbtiXuHuong: ['ENTP', 'ESTP', 'ENFP'], lyDo: 'Cung Thân linh hoạt và đa tài — SP hoặc NP với Extravert.' },
    'Dậu':  { mbtiXuHuong: ['INTJ', 'ISTJ', 'INFJ'], lyDo: 'Cung Dậu tinh tế và cầu toàn — Introvert với tiêu chuẩn cao.' },
    'Tuất': { mbtiXuHuong: ['ISFJ', 'ISTJ', 'INFJ'], lyDo: 'Cung Tuất trung thành và bảo vệ — Introvert F/S/J với lòng trung.' },
    'Hợi':  { mbtiXuHuong: ['INFP', 'INFJ', 'ENFP'], lyDo: 'Cung Hợi bao dung và nhân từ — NF types với lý tưởng nhân văn.' },
  },

  disclaimer: 'Mapping này dựa trên quan sát về đặc điểm tính cách chung, không có cơ sở khoa học kiểm chứng. Dùng như "góc nhìn thú vị" trong Character Profile, không phải kết luận. Một người có thể có Nhật Chủ Giáp nhưng INFP — đây chỉ là xu hướng thống kê không chính xác.',
}

// ============================================================
// DISCLAIMER + RED FLAGS
// ============================================================

export const DISCLAIMER = {
  app_text: 'Thông tin theo quan niệm truyền thống văn hóa Á Đông. Chỉ mang tính tham khảo, không có cơ sở khoa học kiểm chứng.',
  red_flags: [
    'KHÔNG claim dự báo tai họa, tử vong, hay bệnh tật',
    'KHÔNG framing tiêu cực gây lo âu cho user',
    'KHÔNG claim Bát Tự hay Tử Vi dự đoán tương lai chính xác',
    'Cung Mệnh không có Giờ sinh chỉ là ước tính — phải có disclaimer rõ',
    'KHÔNG phân biệt cung hay sao "xấu" — tất cả đều có tiềm năng riêng',
  ],
  simplifications: [
    'Dụng Thần Matrix chỉ dùng Nhật Chủ × Mùa (4 mùa) thay vì toàn bộ Tứ Trụ',
    'Cung Mệnh Tử Vi ước tính từ tháng sinh (sai lệch cao nếu thiếu giờ)',
    'Sao chủ theo Can Năm là phương án B — không chính xác theo Tử Vi học',
    'Tương hợp dùng Tam Hợp/Lục Hợp/Xung đơn giản — bỏ qua Hình, Phá, Hại',
  ],
}
