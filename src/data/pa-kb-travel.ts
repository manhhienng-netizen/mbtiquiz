/**
 * PA KB — TRAVEL DATA
 * Ngày: 18/06/2026 · Review: Master PM
 * Source: Datamine Gemini · 185 data points
 * 
 * ⚠️ Quyền lợi du khách:
 *   · Link: tourism.gov.vn
 *   · Số chính thức Cục Du lịch Quốc gia: (024) 3942 1060
 * 
 * Feature độc đáo: travelCompatibility — không app VN nào có
 * Proactive warn: khi user lưu điểm đến → PA tự warn bẫy vùng đó
 */

// ─── TYPES ────────────────────────────────────────────────

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

export interface VNDestination {
  place: string
  province: string
  bestFor: string[]
  highlights: string[]
  bestTime: string
  budget: string
  transportFrom: { hanoi: string; hcmc: string }
  hiddenGem: string
  avoidIf: string
  whyThisGroup: string
}

export interface IntlDestination {
  country: string
  city: string
  flightTime: string
  visaVN: string
  budgetPerDay: string
  whyThisGroup: string
  bestActivity: string
  avoidFor: string
}

export interface TypeSpecificTravel {
  perfectDestinationVN: string
  perfectDestinationIntl: string
  avoidDestination: string
  idealTripLength: string
  travelCompanion: string
  mustDo: string
}

export interface CompatibilityPair {
  pair: string
  rationale?: string
  conflict?: string
  resolution?: string
}

export interface TravelTrap {
  trap: string
  details: string
}

// ─── TYPE-SPECIFIC (16 types) ─────────────────────────────

export const TRAVEL_TYPE_SPECIFIC: Record<string, TypeSpecificTravel> = {
  INTJ: {
    perfectDestinationVN: "Thánh địa Mỹ Sơn (Quảng Nam) — Chiêm ngưỡng cấu trúc toán học cổ đại bí ẩn.",
    perfectDestinationIntl: "Siem Reap (Campuchia) — Khảo sát kiến trúc kỹ thuật vĩ mô Angkor Wat.",
    avoidDestination: "Bãi biển Sầm Sơn xô bồ — Tránh đám đông ồn ào phá vỡ không gian suy tưởng.",
    idealTripLength: "3-5 ngày",
    travelCompanion: "Solo hoặc một người bạn lý tính (INTP/ENTJ).",
    mustDo: "Ngắm đền tháp Mỹ Sơn lúc 5:30 sáng, phân tích kỹ thuật xếp gạch không chất kết dính."
  },
  INTP: {
    perfectDestinationVN: "Vườn quốc gia Ba Bể (Bắc Kạn) — Nghiên cứu hệ sinh thái hồ trên núi đá vôi.",
    perfectDestinationIntl: "Kyoto (Nhật Bản) — Thưởng ngoạn quy hoạch cổ kính và triết lý vườn thiền.",
    avoidDestination: "Phú Quốc náo nhiệt — Tránh khu vui chơi nhân tạo ồn ào.",
    idealTripLength: "5-7 ngày",
    travelCompanion: "Solo hoặc người bạn hiểu biết sâu (INTJ/INFJ).",
    mustDo: "Thuê xuồng luồn vào Động Puông lúc hoàng hôn, ngắm thạch nhũ và thực vật hoang sơ."
  },
  ENTJ: {
    perfectDestinationVN: "Nhà máy Thủy điện Hòa Bình — Chiêm ngưỡng kỳ tích siêu kỹ thuật cơ khí vĩ mô.",
    perfectDestinationIntl: "Singapore — Phân tích quy hoạch đô thị xanh tích hợp công nghệ tương lai.",
    avoidDestination: "Bản Lác Mai Châu tĩnh lặng — Tránh nhịp sống chậm thiếu động lực.",
    idealTripLength: "4-5 ngày",
    travelCompanion: "Đồng nghiệp chí hướng hoặc nhóm bạn năng động.",
    mustDo: "Đăng ký tour tham quan sâu bên trong hầm lò các tổ máy phát điện dưới lòng đất."
  },
  ENTP: {
    perfectDestinationVN: "Cao nguyên đá Đồng Văn (Hà Giang) — Thử thách xe côn tay địa hình hiểm trở.",
    perfectDestinationIntl: "Tokyo (Nhật Bản) — Đắm mình vào không gian giao thoa công nghệ retro và viễn tưởng.",
    avoidDestination: "Tràng An Ninh Bình — Tránh lộ trình đò chèo gò bó thiếu tính điều hướng.",
    idealTripLength: "6-8 ngày",
    travelCompanion: "Bạn thích tranh biện, khám phá dị biệt.",
    mustDo: "Chạy xe côn tay XR150 đổ đèo Mã Pí Lèng lúc xế chiều."
  },
  INFJ: {
    perfectDestinationVN: "Măng Đen (Kon Tum) — Tìm lại thăng bằng năng lượng giữa rừng thông u lạnh.",
    perfectDestinationIntl: "Luang Prabang (Lào) — Thả trôi tâm hồn bên dòng Mekong cổ kính.",
    avoidDestination: "Nha Trang nhộn nhịp — Tránh xô bồ làm kiệt quệ năng lượng trực giác.",
    idealTripLength: "4-6 ngày",
    travelCompanion: "Solo hoặc người bạn tri kỷ (INFP/ENFJ).",
    mustDo: "Ngồi đọc sách cả buổi chiều bên hồ Đăk Ke trong vắt soi bóng thông."
  },
  INFP: {
    perfectDestinationVN: "Mỏm đá săn mây Tà Xùa (Sơn La) — Đón ánh nắng đầu tiên giữa đại hải mây.",
    perfectDestinationIntl: "Chiang Mai (Thái Lan) — Đắm mình vào lớp học làm gốm nghệ thuật bản địa.",
    avoidDestination: "Đỉnh Fansipan leo bộ — Tránh vắt kiệt thể lực thô bạo.",
    idealTripLength: "5-7 ngày",
    travelCompanion: "Solo hoặc bạn mộng mơ tinh tế đồng cảm.",
    mustDo: "Vẽ tranh màu nước về sương mù ôm sườn núi lúc rạng sáng tại Tà Xùa."
  },
  ENFJ: {
    perfectDestinationVN: "Yên Tử (Quảng Ninh) — Trải nghiệm hành trình tâm linh thiền hành kết nối nhân văn.",
    perfectDestinationIntl: "Bali, Ubud (Indonesia) — Tham gia sound healing chữa lành cộng đồng.",
    avoidDestination: "Cát Tiên rừng sâu ẩm — Tránh không gian ngột ngạt thiếu tiện nghi.",
    idealTripLength: "3-5 ngày",
    travelCompanion: "Nhóm bạn hữu nghị hoặc đại gia đình.",
    mustDo: "Thiền hành lúc 5:00 sáng dưới rừng xích tùng cổ thụ Yên Tử."
  },
  ENFP: {
    perfectDestinationVN: "Phố cổ Hội An — Khơi nguồn cảm hứng bên đèn hoa đăng sông Hoài.",
    perfectDestinationIntl: "Busan (Hàn Quốc) — Sky Capsule lãng mạn ngắm bờ biển rực rỡ.",
    avoidDestination: "Nhà máy Thủy điện Hòa Bình — Tránh không gian kỹ thuật thiếu chất thơ.",
    idealTripLength: "5-7 ngày",
    travelCompanion: "Nhóm bạn sáng tạo tự do bay bổng.",
    mustDo: "Thả đèn hoa đăng trên sông Hoài lúc 5:30 sáng khi phố cổ chưa thức."
  },
  ISTJ: {
    perfectDestinationVN: "Đất Mũi Cà Mau — Hoàn thành mục tiêu chinh phục điểm cực Nam kỷ luật.",
    perfectDestinationIntl: "Đài Bắc (Đài Loan) — Hệ thống giao thông ngăn nắp, bảo tàng lịch sử quy củ.",
    avoidDestination: "Tà Xùa săn mây bất định — Tránh ngẫu hứng phá vỡ kế hoạch.",
    idealTripLength: "3-4 ngày",
    travelCompanion: "Gia đình nhỏ hoặc đi độc lập có kế hoạch cứng.",
    mustDo: "Check-in tại mốc tọa độ GPS cực Nam Đất Mũi đúng 12:00 trưa."
  },
  ISTP: {
    perfectDestinationVN: "Đèo Mã Pí Lèng (Hà Giang) — Thử thách xe côn tay ôm sườn núi hiểm trở.",
    perfectDestinationIntl: "Vang Vieng (Lào) — Tubing thả sông Nam Song mạo hiểm thể chất.",
    avoidDestination: "Hội An đèn lồng sến sẩm — Tránh giả tạo thương mại.",
    idealTripLength: "5-7 ngày",
    travelCompanion: "Solo hoặc bạn phượt dẻo dai.",
    mustDo: "Chạy xe máy vượt Mã Pí Lèng, ngắm dòng Nho Quế vực sâu thăm thẳm."
  },
  ESTJ: {
    perfectDestinationVN: "Vịnh Hạ Long — Du thuyền sang trọng dịch vụ quy chuẩn chặt chẽ.",
    perfectDestinationIntl: "Sentosa Singapore — Tổ hợp giải trí chuyên nghiệp ngăn nắp.",
    avoidDestination: "Măng Đen hoang vắng dịch vụ nghèo nàn — Tránh tẻ nhạt vô kỷ luật.",
    idealTripLength: "3-5 ngày",
    travelCompanion: "Nhóm bạn hữu nghị hoặc đối tác.",
    mustDo: "Đồng hành thuyền trưởng du thuyền Hạ Long khảo sát quy trình cập bến hàng hải."
  },
  ESTP: {
    perfectDestinationVN: "Đồi cát Mũi Né — Chinh phục cát bằng mô tô ATV gầm rú tốc độ cao.",
    perfectDestinationIntl: "Phuket (Thái Lan) — Nhảy dù lượn vượt biển, lặn biển mạo hiểm.",
    avoidDestination: "Mỹ Sơn tháp cổ — Tránh đi bộ thụ động thiếu kích thích.",
    idealTripLength: "4-5 ngày",
    travelCompanion: "Nhóm bạn ham vui mạo hiểm.",
    mustDo: "Lái ATV 4 bánh chinh phục đỉnh cát trắng Mũi Né lúc rạng sáng."
  },
  ISFJ: {
    perfectDestinationVN: "Đảo Ngọc Phú Quốc — Nghỉ dưỡng đầm ấm an toàn chu đáo cả gia đình.",
    perfectDestinationIntl: "Jeju (Hàn Quốc) — Dạo cánh đồng cải vàng ven biển thanh bình.",
    avoidDestination: "Tú Làn hang tối hiểm nguy lội sông ngầm — Tránh rủi ro thể chất.",
    idealTripLength: "4-5 ngày",
    travelCompanion: "Đại gia đình hoặc nhóm bạn thân.",
    mustDo: "Mâm hải sản nướng cho cả nhà bên bãi biển cát mịn Phú Quốc."
  },
  ISFP: {
    perfectDestinationVN: "Vịnh Vĩnh Hy (Ninh Thuận) — Biển xanh hữu tình vườn nho mọng ngọt.",
    perfectDestinationIntl: "Hualien, Taroko (Đài Loan) — Khe núi xanh mướt thanh tĩnh dịu dàng.",
    avoidDestination: "Sầm Sơn đông đúc — Tránh stress thính giác cảm quan.",
    idealTripLength: "5-6 ngày",
    travelCompanion: "Solo hoặc bạn thẩm mỹ dịu dàng.",
    mustDo: "Tự tay cắt chùm nho đỏ mọng từ vườn Ba Mọi lúc sương sớm."
  },
  ESFJ: {
    perfectDestinationVN: "Bản Lác Mai Châu — Sum vầy lửa trại múa xòe thung lũng xanh mến khách.",
    perfectDestinationIntl: "Bangkok Chinatown — Thiên đường ẩm thực gắn kết cộng đồng đa vị.",
    avoidDestination: "Sơn Đoòng biệt lập không sóng — Tránh ngắt kết nối quan hệ xã hội.",
    idealTripLength: "3-5 ngày",
    travelCompanion: "Đại gia đình hoặc đoàn hội nhóm.",
    mustDo: "Cả gia đình mặc đồ thổ cẩm Thái chụp hình bên thung lũng Mai Châu."
  },
  ESFP: {
    perfectDestinationVN: "Bãi biển Nha Trang — Tiếng sóng, tắm biển, hải sản bờ biển sôi động.",
    perfectDestinationIntl: "Bali, Nusa Penida — Sống ảo bãi biển khủng long Kelingking rực rỡ.",
    avoidDestination: "Huế cổ kính mưa dầm — Tránh không khí u uất giảm năng lượng.",
    idealTripLength: "4-5 ngày",
    travelCompanion: "Nhóm bạn năng động ham vui.",
    mustDo: "Canô cao tốc ra Hòn Nội khám phá bãi tắm đôi tự nhiên độc đáo."
  },
}

// ─── TRAVEL COMPATIBILITY ─────────────────────────────────

export const TRAVEL_GOOD_PAIRS: CompatibilityPair[] = [
  { pair: "ISTP & ESTP", rationale: "Hành động thực tế, đam mê tốc độ, không cần thảo luận dài. Sẵn sàng thuê XR150 phượt Hà Giang đổ đèo Mã Pí Lèng cùng nhau." },
  { pair: "INFJ & INFP", rationale: "Thấu cảm sâu sắc, trân trọng thế giới nội tâm. Sẵn sàng ngồi im lặng uống trà ngắm thông mờ sương Măng Đen không cần giao tiếp gượng ép." },
  { pair: "INTJ & ENTJ", rationale: "Tư duy hệ thống, lập kế hoạch cứng bằng Excel. Phân bổ ngân sách rõ ràng, chuẩn bị backup di chuyển khoa học." },
  { pair: "ISFJ & ESFJ", rationale: "Đồng điệu chăm lo an toàn và dịch vụ cho gia đình. Cùng chuẩn bị bento trái cây, đặt phòng resort sạch sẽ." },
  { pair: "ISFP & ENFP", rationale: "Khát khao tự do biểu đạt nghệ thuật. Cùng thả đèn hoa đăng sông Hoài, lưu giữ khung hình lãng mạn đậm chất thơ." },
]

export const TRAVEL_CHALLENGING_PAIRS: CompatibilityPair[] = [
  { pair: "INTJ & ESFP", conflict: "INTJ muốn tĩnh lặng nghiên cứu Mỹ Sơn · ESFP hò hét tắm biển Nha Trang.", resolution: "70% thời gian hoạt động cá nhân · gặp nhau bữa tối hải sản." },
  { pair: "ISTJ & ENFP", conflict: "ISTJ mốc giờ cứng GPS · ENFP tùy hứng rẽ vào vườn dâu Đà Lạt.", resolution: "Chốt cứng giờ tàu bay (ISTJ quản lý) · thả nổi hoạt động trong ngày (ENFP ngẫu hứng)." },
  { pair: "INFP & ESTP", conflict: "INFP đi bộ chánh niệm rừng thông · ESTP nổ ATV chinh phục cát Mũi Né.", resolution: "Sáng đi bộ tĩnh lặng (INFP) · chiều thể thao mạo hiểm (ESTP)." },
  { pair: "ESTJ & ISFP", conflict: "ESTJ áp lịch trình chuẩn mực · ISFP dạo chụp ảnh san hô Vĩnh Hy không màng giờ.", resolution: "ESTJ quản lý vé/phòng · ISFP phụ trách chọn quán ăn và chụp ảnh." },
  { pair: "INTP & ESFJ", conflict: "INTP nhốt mình đọc sách hồ Ba Bể · ESFJ lôi kéo múa xòe lửa trại.", resolution: "Tôn trọng quyền từ chối của INTP · INTP hỗ trợ kỹ thuật chuẩn bị hành lý cho ESFJ." },
]

// ─── VN TRAVEL TRAPS ──────────────────────────────────────

export const VN_TRAVEL_TRAPS_BY_REGION: Record<string, string[]> = {
  hanoi: [
    "Taxi giả mạo thương hiệu: fake taxi gắn biển Mai Linh/Taxi Group, đi vòng vo tính tiền gấp 3-4 lần.",
    "Ép giá chụp ảnh Phố Cổ: gánh hàng rong tự đặt lên vai du khách rồi vòi 200k-500k.",
    "Xích lô chặt chém: báo 100k nhưng ép thanh toán ngoại tệ hoặc thu thêm phí.",
  ],
  danang: [
    "Tour Cù Lao Chàm chất lượng thấp: tour ghép giá rẻ, cắt giảm thời gian ngắm san hô, canô quá tải.",
    "Hải sản giá cao bất thường: quán không niêm yết giá rõ ràng, ghi 'giá theo mùa'.",
    "Taxi mồi chài sân bay: cò mồi dụ xe không app rồi vẽ đường vòng thu thêm tiền.",
  ],
  nhatrang: [
    "Dịch vụ lặn biển kém: thiết bị rách nát không tiệt trùng, hướng dẫn không bằng cứu hộ.",
    "Khách sạn khác xa ảnh: hình đẹp nhưng phòng ôi mốc dơ bẩn khi check-in.",
    "Cò mồi đặc sản: taxi/xe ôm dắt vào quán ăn chặn hoa hồng 30% hoá đơn.",
  ],
  dalat: [
    "Phòng không có lò sưởi: homestay lãng mạn nhưng không có máy sưởi, rét buốt ban đêm.",
    "Thời tiết dông lốc bất ngờ: mưa đá, sạt lở cắt đứt lộ trình phượt xe máy.",
    "Bẫy hái dâu tây: hứa 20k/kg nhưng ép mua mứt đặc sản giá cắt cổ kèm theo.",
  ],
  phuquoc: [
    "Xe máy thuê không kiểm tra: phanh lỏng, xích rách gây rủi ro đổ đèo cua dốc.",
    "Hải sản bị ép trọng lượng: cân chợ đêm tinh chỉnh lệch, hao hụt 20-30% thực tế.",
    "Tour ca nô 4 đảo lừa: nhồi nhét, bỏ điểm hoang sơ để đưa vào quán ăn hoa hồng.",
  ],
  hcmc: [
    "Grab/Xanh SM giả danh: mặc đồng phục, năn nỉ hủy app để đi ngoài app giá cắt cổ.",
    "Hàng giả chợ Bến Thành: túi da thực ra là nhựa simili Trung Quốc hỏng nhanh.",
    "Mượn điện thoại xin OTP: giả vờ kiểm tra định vị rồi chiếm đoạt thông tin ngân hàng.",
  ],
}

export const VN_TRAVEL_TRAPS_GENERAL: TravelTrap[] = [
  { trap: "Booking phòng ảo 2025-2026", details: "Fanpage giả mạo resort chạy quảng cáo giảm 30-50%, ép chuyển khoản đặt cọc rồi biến mất. Tra cứu tại tinnhiemmang.vn." },
  { trap: "Email giả mạo Booking.com/Agoda", details: "Tiêu đề 'Xác nhận đặt phòng khẩn cấp', link cài mã độc Trojan chiếm tài khoản ngân hàng." },
  { trap: "Bẫy cộng tác viên du lịch fake", details: "Tuyển xử lý đơn vé máy bay online, ban đầu trả hoa hồng nhỏ, sau ép nạp tiền lớn rồi khoá tài khoản." },
  { trap: "Đổi tiền ngoại tệ bất hợp pháp", details: "Tỷ giá hời bất thường, thối thiếu tiền hoặc tráo tiền giả simili." },
  { trap: "SIM card dữ liệu giả mạo", details: "SIM không đăng ký chính chủ, hoạt động 1-2 ngày rồi khoá vĩnh viễn." },
]

export const TOURIST_RIGHTS_URL = "https://tourism.gov.vn"
export const TOURIST_RIGHTS_PHONE = "(024) 3942 1060"

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getTravelTypeSpec(mbtiType: string): TypeSpecificTravel | null {
  return TRAVEL_TYPE_SPECIFIC[mbtiType] ?? null
}

export function getRegionTraps(region: keyof typeof VN_TRAVEL_TRAPS_BY_REGION): string[] {
  return VN_TRAVEL_TRAPS_BY_REGION[region] ?? []
}

export function getCompatiblePairs(mbtiType: string): CompatibilityPair[] {
  return TRAVEL_GOOD_PAIRS.filter(p => p.pair.includes(mbtiType))
}

export function getChallengingPairs(mbtiType: string): CompatibilityPair[] {
  return TRAVEL_CHALLENGING_PAIRS.filter(p => p.pair.includes(mbtiType))
}
