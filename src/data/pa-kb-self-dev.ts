/**
 * PA KB — SELF DEVELOPMENT DATA
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 7 + 8
 *
 * [R] UCL Frontiers in Psychology (2025) — Flaminia Ronca + Paul Burgess
 * Cite: "[R] based on personality-exercise research (UCL, 2025)"
 * KHÔNG cite "UCL 2025" standalone — paper đã verify tên tác giả
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── HR ZONES — BẢNG ĐẦY ĐỦ (Tanaka + Karvonen) ─────────

/**
 * Bảng nhịp tim mục tiêu theo Tanaka + Karvonen
 * Nam: HRrest = 65 bpm · Nữ: HRrest = 70 bpm
 * Source: Document 7 + 8 (verified consistent)
 */
export const HR_ZONES_TABLE = {
  male: [
    {
      age: 25, restHR: 65, maxHR: 191.4,
      zone1_recovery: { min: 128, max: 141, pct: '50-60%' },
      zone2_fatBurn:  { min: 141, max: 153, pct: '60-70%' },
      zone3_aerobic:  { min: 153, max: 166, pct: '70-80%' },
      zone4_anaerobic:{ min: 166, max: 179, pct: '80-90%' },
      zone5_max:      { min: 179, max: 191, pct: '90-100%' },
    },
    {
      age: 35, restHR: 65, maxHR: 184.4,
      zone1_recovery: { min: 125, max: 137, pct: '50-60%' },
      zone2_fatBurn:  { min: 137, max: 149, pct: '60-70%' },
      zone3_aerobic:  { min: 149, max: 161, pct: '70-80%' },
      zone4_anaerobic:{ min: 161, max: 172, pct: '80-90%' },
      zone5_max:      { min: 172, max: 184, pct: '90-100%' },
    },
    {
      age: 45, restHR: 65, maxHR: 177.4,
      zone1_recovery: { min: 121, max: 132, pct: '50-60%' },
      zone2_fatBurn:  { min: 132, max: 144, pct: '60-70%' },
      zone3_aerobic:  { min: 144, max: 155, pct: '70-80%' },
      zone4_anaerobic:{ min: 155, max: 166, pct: '80-90%' },
      zone5_max:      { min: 166, max: 177, pct: '90-100%' },
    },
  ],
  female: [
    {
      age: 25, restHR: 70, maxHR: 191.4,
      zone1_recovery: { min: 131, max: 143, pct: '50-60%' },
      zone2_fatBurn:  { min: 143, max: 155, pct: '60-70%' },
      zone3_aerobic:  { min: 155, max: 167, pct: '70-80%' },
      zone4_anaerobic:{ min: 167, max: 179, pct: '80-90%' },
      zone5_max:      { min: 179, max: 191, pct: '90-100%' },
    },
    {
      age: 35, restHR: 70, maxHR: 184.4,
      zone1_recovery: { min: 127, max: 139, pct: '50-60%' },
      zone2_fatBurn:  { min: 139, max: 150, pct: '60-70%' },
      zone3_aerobic:  { min: 150, max: 162, pct: '70-80%' },
      zone4_anaerobic:{ min: 162, max: 173, pct: '80-90%' },
      zone5_max:      { min: 173, max: 184, pct: '90-100%' },
    },
    {
      age: 45, restHR: 70, maxHR: 177.4,
      zone1_recovery: { min: 124, max: 134, pct: '50-60%' },
      zone2_fatBurn:  { min: 134, max: 145, pct: '60-70%' },
      zone3_aerobic:  { min: 145, max: 156, pct: '70-80%' },
      zone4_anaerobic:{ min: 156, max: 167, pct: '80-90%' },
      zone5_max:      { min: 167, max: 177, pct: '90-100%' },
    },
  ],
  disclaimer: "⚠️ Không áp dụng cho người có bệnh tim mạch · Tham khảo bác sĩ trước khi bắt đầu",
  measureRestHR: "Đo ngay sau khi thức dậy · 3 ngày liên tiếp · lấy trung bình",
}

// ─── LEARNING PLATFORMS (VN + Quốc tế) ───────────────────

export interface LearningPlatform {
  name: string
  type: 'video' | 'audio' | 'language' | 'community' | 'app'
  language: 'VI' | 'EN' | 'Both'
  cost: 'free' | 'paid' | 'freemium'
  bestFor: MbtiGroup[]
  mbtiTypes: string[] // type cụ thể
  why: string
  topContent: string[]
  availableVN: boolean
}

export const LEARNING_PLATFORMS: LearningPlatform[] = [
  {
    name: "Gitiho",
    type: "video",
    language: "VI",
    cost: "paid",
    bestFor: ["ST", "SF"],
    mbtiTypes: ["ISTJ", "ESTJ", "ISFJ", "ESFJ"],
    why: "[P] Cấu trúc lộ trình tuyến tính rõ ràng từng bước · mục tiêu thực tế ngắn hạn · phù hợp SJ",
    topContent: ["Excel nâng cao", "PowerPoint chuyên nghiệp", "Quản trị thời gian", "Phân tích dữ liệu"],
    availableVN: true,
  },
  {
    name: "Unica",
    type: "video",
    language: "VI",
    cost: "paid",
    bestFor: ["ST", "SF"],
    mbtiTypes: ["ISTJ", "ESTJ", "ISFJ", "ESFJ"],
    why: "[P] Tương tự Gitiho · nhiều khóa kỹ năng mềm + nghề nghiệp · thực hành trực quan ngay",
    topContent: ["Kỹ năng thuyết trình", "Thiết kế Canva", "Marketing online", "Kỹ năng lãnh đạo"],
    availableVN: true,
  },
  {
    name: "Fonos",
    type: "audio",
    language: "VI",
    cost: "freemium",
    bestFor: ["NT", "NF"],
    mbtiTypes: ["INFJ", "INTJ", "INTP", "INFP"],
    why: "[P] Sách nói bản quyền · tóm tắt 15 phút · thiền định · phù hợp IN thích hấp thụ tri thức tĩnh lặng",
    topContent: ["Sách phi hư cấu VN", "Tóm tắt bestseller", "Thiền định", "Nhạc sóng não"],
    availableVN: true,
  },
  {
    name: "Voiz FM",
    type: "audio",
    language: "VI",
    cost: "freemium",
    bestFor: ["NT", "NF"],
    mbtiTypes: ["INFJ", "INTJ", "INTP", "INFP"],
    why: "[P] Tương tự Fonos · thêm podcast chuyên sâu · nội dung học thuật tốt cho IN",
    topContent: ["Sách nói kinh doanh", "Tâm lý học", "Lịch sử", "Phát triển bản thân"],
    availableVN: true,
  },
  {
    name: "ELSA Speak",
    type: "language",
    language: "EN",
    cost: "freemium",
    bestFor: ["ST", "SF"],
    mbtiTypes: ["ENFP", "ENTP", "ESFP", "ESTP"],
    why: "[P] AI nhận diện giọng nói · sửa phát âm từng âm tiết · gamification · phù hợp EP cần kích thích nhanh",
    topContent: ["Luyện phát âm tiếng Anh", "Giao tiếp hàng ngày", "Phát âm chuẩn Anh/Mỹ"],
    availableVN: true,
  },
  {
    name: "Duolingo",
    type: "language",
    language: "Both",
    cost: "freemium",
    bestFor: ["ST", "SF"],
    mbtiTypes: ["ENFP", "ESFP", "ESTP", "ENTP"],
    why: "[P] Gamification mạnh · bài học ngắn sinh động · streak motivation · EP cần quick wins",
    topContent: ["Tiếng Anh", "Tiếng Nhật", "Tiếng Hàn", "Tiếng Pháp", "Tiếng Tây Ban Nha"],
    availableVN: true,
  },
  {
    name: "Coursera",
    type: "video",
    language: "EN",
    cost: "freemium",
    bestFor: ["NT"],
    mbtiTypes: ["INTJ", "INTP", "ENTJ", "ENTP"],
    why: "[P] Khóa học đại học quốc tế · có chứng chỉ · học sâu · phù hợp NT muốn credential",
    topContent: ["Machine Learning (Andrew Ng)", "Data Science", "Business Strategy", "Python"],
    availableVN: true,
  },
  {
    name: "edX / MIT OpenCourseWare",
    type: "video",
    language: "EN",
    cost: "free",
    bestFor: ["NT"],
    mbtiTypes: ["INTP", "INTJ"],
    why: "[P] Tài liệu học thuật miễn phí từ MIT/Harvard · INTP thích tự học từ nguồn gốc",
    topContent: ["Toán học", "Khoa học máy tính", "Vật lý", "Triết học"],
    availableVN: true,
  },
  {
    name: "YouTube (channels học thuật)",
    type: "video",
    language: "Both",
    cost: "free",
    bestFor: ["NT", "NF"],
    mbtiTypes: ["INTP", "INFP", "ENTP", "ENFP"],
    why: "[P] Miễn phí · đa dạng chủ đề · P-type thích khám phá ngẫu nhiên không cấu trúc cứng",
    topContent: ["3Blue1Brown (Toán)", "Kurzgesagt (Khoa học)", "TED-Ed", "Khan Academy VN"],
    availableVN: true,
  },
  {
    name: "Anki",
    type: "app",
    language: "Both",
    cost: "free",
    bestFor: ["NT"],
    mbtiTypes: ["INTJ", "INTP", "ISTJ"],
    why: "[P] Spaced repetition algorithm · học thuật sâu · NT thích tối ưu hoá học tập bằng data",
    topContent: ["Từ vựng ngoại ngữ", "Flashcard y khoa", "Lịch sử · Địa lý", "Bất kỳ chủ đề nào"],
    availableVN: true,
  },
]

// ─── HOBBIES BY 16 TYPE ───────────────────────────────────

export const HOBBIES_BY_TYPE: Record<string, {
  primary: string[]
  relaxation: string[]
  avoid: string[]
  vnContext: string
}> = {
  INTJ: {
    primary: ["Chơi cờ vua/cờ tướng", "Lập trình dự án cá nhân", "Đọc sách khoa học/triết học", "Bơi lội solo"],
    relaxation: ["Trò chơi chiến thuật (Civilization, Chess.com)", "Đi bộ một mình nghe podcast", "Vẽ bản đồ tư duy"],
    avoid: ["Karaoke nhóm lớn", "Thể thao đồng đội áp lực cao", "Sinh hoạt tập thể gượng ép"],
    vnContext: "Câu lạc bộ cờ vua tại các quận trung tâm HCM/HN · Hackathon công nghệ · Discord cộng đồng lập trình VN",
  },
  INTP: {
    primary: ["Nghiên cứu chủ đề khoa học ngẫu nhiên", "Viết mã lập trình", "Đi bộ đường dài dã ngoại", "Chơi cờ vua"],
    relaxation: ["Xem TED Talks · YouTube khoa học", "Podcast triết học", "Câu đố logic · Sudoku"],
    avoid: ["Họp nhóm dài dòng vô nghĩa", "Tập thể dục có giám sát chặt chẽ", "Mạng xã hội ồn ào"],
    vnContext: "Reddit r/VietnamTech · Diễn đàn lập trình TopDev · Meetup công nghệ HCM/HN",
  },
  ENTJ: {
    primary: ["Học lập trình ứng dụng", "Tham gia ban điều hành CLB thể thao", "Chạy bộ có target (marathon)"],
    relaxation: ["Podcast lãnh đạo kinh doanh", "Đọc tiểu sử CEO thành công", "Golf (kết hợp networking)"],
    avoid: ["Hoạt động không có mục tiêu rõ ràng", "Nhóm không cam kết nghiêm túc"],
    vnContext: "Young Professional Network HCM · CEO Club · Running Club có race target",
  },
  ENTP: {
    primary: ["Tranh biện ý tưởng", "Lập trình giả lập", "Chụp ảnh nghệ thuật", "Nghiên cứu triết học"],
    relaxation: ["Trò chơi điện tử chiến thuật", "Podcast tranh biện", "Đọc sách interdisciplinary"],
    avoid: ["Routine lặp đi lặp lại không đổi", "Môi trường cứng nhắc không sáng tạo"],
    vnContext: "TEDx Hanoi/HCMC · Debate Club · Innovation Hub · Spiderum cộng đồng viết",
  },
  INFJ: {
    primary: ["Đọc sách sâu", "Vẽ tranh", "Yoga · thiền định", "Bắn cung (archery - tập trung tĩnh lặng)"],
    relaxation: ["Thiền hành sáng sớm", "Viết nhật ký", "Podcast chữa lành (Thầy Minh Niệm)"],
    avoid: ["Đám đông ồn ào", "Theo dõi nhịp tim liên tục khi tập", "Áp lực thi đấu"],
    vnContext: "Lớp yoga Hatha buổi sáng · Retreat thiền Yên Tử · Workshop viết lách sáng tạo HN/HCM",
  },
  INFP: {
    primary: ["Viết lách sáng tạo", "Chụp ảnh nghệ thuật", "Cosplay", "Nghe nhạc cảm xúc"],
    relaxation: ["Làm sổ tay bullet journal", "Vẽ watercolor", "Podcast Tri Kỷ Cảm Xúc"],
    avoid: ["Thi đấu thể thao áp lực cao", "Môi trường cứng nhắc quy tắc nhiều"],
    vnContext: "Cộng đồng cosplay VN Fanpage · Workshop nhiếp ảnh cảm xúc · Hội viết lách Spiderum",
  },
  ENFJ: {
    primary: ["Thám hiểm địa phương mới", "Đọc sách và viết lách", "Tổ chức hoạt động cộng đồng"],
    relaxation: ["Podcast phát triển cá nhân", "Nấu ăn cho người thân", "Đi bộ trò chuyện cùng bạn"],
    avoid: ["Solo hoàn toàn không có kết nối người", "Cạnh tranh không lành mạnh"],
    vnContext: "Volunteer group thiện nguyện VN · Workshop kỹ năng mềm · Book club nhỏ",
  },
  ENFP: {
    primary: ["Sudoku · câu đố từ vựng", "Viết lách sáng tạo", "Khám phá quán mới", "Dance class"],
    relaxation: ["Podcast sáng tạo · TED Talks", "Vẽ mind map ý tưởng", "Chụp ảnh đường phố"],
    avoid: ["Routine cứng nhắc không thay đổi", "Công việc lặp đi lặp lại đơn điệu"],
    vnContext: "Improv comedy HCM · Workshop sáng tạo · Cộng đồng viết blog VN",
  },
  ISTJ: {
    primary: ["Cờ vua · giải đố logic", "Tập gym đơn độc", "Golf", "Sưu tầm tem/coin"],
    relaxation: ["Podcast lịch sử · khoa học (Oddly Normal)", "Đọc tiểu thuyết trinh thám cổ điển"],
    avoid: ["Hoạt động ngẫu hứng không kế hoạch", "Môi trường lộn xộn thiếu tổ chức"],
    vnContext: "CLB cờ vua phường · Phòng gym có lịch tập cố định · Podcast Oddly Normal",
  },
  ISTP: {
    primary: ["Bắn cung", "Lặn biển", "Nhảy dù", "Sửa chữa thiết bị cơ khí"],
    relaxation: ["Xem video cơ khí YouTube", "Tháo lắp thiết bị điện tử", "Fishing (câu cá)"],
    avoid: ["Họp nhóm dài · nói chuyện cảm xúc nhiều", "Môi trường kiểm soát chặt chẽ"],
    vnContext: "CLB lặn biển Nha Trang · Maker Space HCM · Hội thợ sửa xe tự do",
  },
  ESTJ: {
    primary: ["Chế tác đồ gỗ", "Làm vườn quy mô lớn", "Thể thao đối kháng (cầu lông · tennis)"],
    relaxation: ["Podcast kinh doanh · quản trị", "Tổ chức sự kiện cộng đồng"],
    avoid: ["Môi trường mơ hồ không rõ quy tắc", "Hoạt động không có kết quả đo được"],
    vnContext: "Hội đồng nghiệp · CLB tennis/cầu lông quận · Business network HCM/HN",
  },
  ESTP: {
    primary: ["Đua xe", "Đấm bốc · võ thuật", "Bay lượn thể thao", "Cá độ thể thao (hợp pháp)"],
    relaxation: ["Trò chơi điện tử competitive FPS", "Xem thể thao trực tiếp", "Poker"],
    avoid: ["Lý thuyết dài dòng không thực hành", "Hoạt động quá chậm thiếu adrenaline"],
    vnContext: "Muay Thai gym HCM · CLB đua xe địa hình · E-sports community VN",
  },
  ISFJ: {
    primary: ["Terrarium making (tiểu cảnh thực vật)", "Làm vườn", "Nướng bánh thủ công", "Đi bộ thiên nhiên chậm"],
    relaxation: ["Podcast gia đình ấm áp", "Xem phim gia đình", "Nghe nhạc acoustic"],
    avoid: ["Thể thao đối kháng cạnh tranh cao", "Môi trường ồn ào hỗn loạn"],
    vnContext: "Hội làm vườn ban công HCM/HN · Workshop làm bánh handmade · CLB đi bộ thiên nhiên cuối tuần",
  },
  ISFP: {
    primary: ["Khiêu vũ", "Làm đồ thủ công DIY", "Tập gym độc lập", "Nghe nhạc cường độ cao"],
    relaxation: ["Vẽ sketching", "Nhiếp ảnh đường phố", "Pottery (làm gốm)"],
    avoid: ["Thi đấu team sports áp lực", "Phải follow strict schedule"],
    vnContext: "Lớp làm gốm HCM/HN · Dance studio K-pop · Workshop DIY thủ công mỹ nghệ",
  },
  ESFJ: {
    primary: ["Khiêu vũ cổ điển", "Làm vườn nhóm", "Hoạt động thiện nguyện xã hội"],
    relaxation: ["Nấu ăn chia sẻ", "Podcast Giang Ơi Radio", "Karaoke với bạn bè thân"],
    avoid: ["Solo hoàn toàn kéo dài", "Môi trường cạnh tranh không có đồng đội"],
    vnContext: "Nhóm thiện nguyện bếp ăn từ thiện · Hội nấu ăn Esheep Kitchen Family · CLB nhảy Ballroom HCM/HN",
  },
  ESFP: {
    primary: ["Kể chuyện tương tác (vlogging/podcasting)", "Cải tạo nhà cửa", "Thể thao đồng đội"],
    relaxation: ["Xem reality show", "Karaoke", "Shopping + cà phê bạn bè"],
    avoid: ["Công việc một mình quá lâu", "Lý thuyết không thực hành"],
    vnContext: "TikTok creator community VN · CLB bóng đá phong trào · Studio podcast thuê theo giờ HCM/HN",
  },
}

// ─── FILM PREFERENCE BY TYPE (từ Doc 7+8) ────────────────

export const FILM_PREFERENCE_VN = {
  NT: {
    genres: ["Sử thi lịch sử", "Trinh thám", "Sci-fi kỹ xảo phức tạp", "Tài liệu"],
    examples: [
      { title: "Tử chiến trên không", revenue: "252 tỷ đồng", why: "Kỹ xảo phức tạp · kế hoạch không chiến logic" },
      { title: "Thám tử Kiên: Kỳ án không đầu", revenue: "249 tỷ đồng", why: "Trinh thám cổ trang · suy luận logic" },
      { title: "Địa đạo: Mặt trời trong bóng tối", revenue: "172 tỷ đồng", why: "Lịch sử chiến thuật · kỹ thuật quân sự" },
    ],
  },
  NF: {
    genres: ["Chính kịch nhân văn", "Kinh dị tâm lý", "Gia đình cảm động", "Nghệ thuật"],
    examples: [
      { title: "Mưa đỏ", revenue: "714 tỷ đồng (kỷ lục)", why: "Sử thi nhân văn · hy sinh · giá trị con người" },
      { title: "Mang mẹ đi bỏ", revenue: "N/A", why: "Tình mẫu tử · cảm xúc gia đình sâu sắc" },
      { title: "Nhà gia tiên", revenue: "N/A", why: "Tâm lý · tâm linh dân gian · chiều sâu cảm xúc" },
    ],
  },
  ST: {
    genres: ["Hành động thực tế", "Phiêu lưu", "Lịch sử chiến tranh", "Tội phạm"],
    examples: [
      { title: "Truy tìm Long Diên Hương", revenue: "196 tỷ đồng", why: "Phiêu lưu hành động · thực địa thật" },
      { title: "Địa đạo: Mặt trời trong bóng tối", revenue: "172 tỷ đồng", why: "Chiến thuật thực chiến · kỹ năng sinh tồn" },
    ],
  },
  SF: {
    genres: ["Hài gia đình", "Lãng mạn", "Drama tình cảm", "Hài kịch ấm áp"],
    examples: [
      { title: "Bộ tứ báo thủ", revenue: "332 tỷ đồng", why: "Hài gia đình · tình bạn · kết nối cộng đồng" },
      { title: "Nụ hôn bạc tỷ", revenue: "212 tỷ đồng", why: "Lãng mạn hài · cảm xúc nhẹ nhàng" },
    ],
  },
}

// ─── PODCAST PREFERENCE BY GROUP ─────────────────────────

export const PODCAST_BY_GROUP: Record<MbtiGroup, { name: string; language: 'VI'|'EN'; topic: string }[]> = {
  NT: [
    { name: "Amateur Psychology", language: "VI", topic: "Tâm lý học thực chứng · giải mã hành vi" },
    { name: "Oddly Normal", language: "VI", topic: "Lịch sử · kinh tế · văn hoá góc nhìn khoa học" },
    { name: "The Lex Fridman Podcast", language: "EN", topic: "AI · khoa học · triết học" },
    { name: "Have A Sip", language: "VI", topic: "Phỏng vấn sâu trí thức · thế giới quan" },
  ],
  NF: [
    { name: "Tri Kỷ Cảm Xúc", language: "VI", topic: "Tâm sự cuộc sống · chữa lành" },
    { name: "Pháp Thoại Thầy Minh Niệm", language: "VI", topic: "Thiền · chánh niệm · gia đình" },
    { name: "Giang Ơi Radio", language: "VI", topic: "Trưởng thành · yêu bản thân · tâm sự" },
    { name: "Unlocking Us (Brené Brown)", language: "EN", topic: "Tổn thương · lòng dũng cảm · kết nối" },
  ],
  ST: [
    { name: "The Present Writer", language: "VI", topic: "Tối giản · phát triển thực tế" },
    { name: "Oddly Normal", language: "VI", topic: "Kiến thức khoa học lịch sử" },
    { name: "The Jocko Podcast", language: "EN", topic: "Kỷ luật · lãnh đạo quân đội" },
    { name: "Người Trong Muôn Nghề (Spiderum)", language: "VI", topic: "Hướng nghiệp thực tế các ngành" },
  ],
  SF: [
    { name: "Giang Ơi Radio", language: "VI", topic: "Đời sống cởi mở · tâm sự trẻ" },
    { name: "Have A Sip", language: "VI", topic: "Phỏng vấn cảm xúc người nổi tiếng" },
    { name: "Cởi Mở", language: "VI", topic: "Xã hội · giới tính · kết nối" },
    { name: "Đắp Chăn Nằm Nghe Tun Kể", language: "VI", topic: "Đời thường · tâm sự nhẹ nhàng" },
  ],
}

// ─── TIME MANAGEMENT SYSTEMS ──────────────────────────────

export const TIME_MANAGEMENT_BY_GROUP: Record<MbtiGroup, {
  system: string
  tools: string[]
  morningRoutine: string[]
  why: string
}> = {
  NT: {
    system: "GTD (Getting Things Done) + Deep Work Time Blocking",
    tools: ["Notion", "Obsidian (Zettelkasten)", "Anki", "Forest App"],
    morningRoutine: [
      "5 phút review task list ngày hôm nay",
      "Block 2-3 giờ deep work không distraction",
      "No social media trước 10am",
    ],
    why: "NT cần hệ thống capture ý tưởng + focus sâu · GTD giúp clear mind để tư duy",
  },
  NF: {
    system: "Bullet Journal + Energy Management (không phải Time Management)",
    tools: ["Bullet Journal giấy", "Notion cảm xúc", "Insight Timer (thiền)", "Day One (nhật ký)"],
    morningRoutine: [
      "10 phút thiền hoặc journaling cảm ơn",
      "Không check email/mạng xã hội 30 phút đầu",
      "Đặt intention cho ngày (không phải todo list cứng)",
    ],
    why: "NF cần flexible · energy-based không phải time-based · ritual sáng quan trọng",
  },
  ST: {
    system: "Pomodoro + Strict Schedule + Habit Tracker",
    tools: ["Pomodoro Timer", "Streaks App", "Google Calendar cứng", "Microsoft To Do"],
    morningRoutine: [
      "Wake up cùng giờ mỗi ngày (kể cả cuối tuần)",
      "Check checklist ngày hôm nay",
      "Tập thể dục theo lịch đã định",
    ],
    why: "ST cần structure cứng · streak motivation · checklist hoàn thành tạo satisfaction",
  },
  SF: {
    system: "Social Accountability + Gentle Routine (không cứng nhắc)",
    tools: ["Cùng bạn bè check-in thói quen", "Google Calendar chia sẻ với người thân", "Habitica (gamification social)"],
    morningRoutine: [
      "10 phút nhắn tin hỏi thăm người thân yêu",
      "Ăn sáng không vội · không check điện thoại ngay",
      "Chuẩn bị 1 điều nhỏ để mong chờ trong ngày",
    ],
    why: "SF motivated bởi connection · accountability với người thân hiệu quả hơn app",
  },
}

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getHobbies(mbtiType: string) {
  return HOBBIES_BY_TYPE[mbtiType] ?? null
}

export function getPlatformsByGroup(group: MbtiGroup): LearningPlatform[] {
  return LEARNING_PLATFORMS.filter(p => p.bestFor.includes(group))
}

export function getHRZones(age: number, gender: 'male' | 'female') {
  const table = HR_ZONES_TABLE[gender]
  const closest = table.reduce((prev, curr) =>
    Math.abs(curr.age - age) < Math.abs(prev.age - age) ? curr : prev
  )
  return closest
}
