/**
 * PA KB — FINANCE DATA (Tài Chính Cá Nhân)
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 7
 *
 * ⚠️ DISCLAIMER bắt buộc mọi nơi hiển thị:
 * "Thông tin tham khảo · không thay thế tư vấn tài chính chuyên nghiệp"
 * "Không phải khuyến nghị đầu tư"
 *
 * ⚠️ CSAGA: wire số 024 3333 5599 (verified) · KHÔNG wire 0941409119 (chưa verify)
 * ⚠️ TGPL: 1800 1233 · https://tgpl.moj.gov.vn (Cục TGPL, đã verify)
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── MBTI FINANCE STYLE ───────────────────────────────────

export interface FinanceStyle {
  coreApproach: string
  strengths: string[]
  traps: string[]
  strategy: string
  nudgeStyle: string
  budgetRule: string
}

export const MBTI_FINANCE_STYLE: Record<MbtiGroup, FinanceStyle> = {
  NT: {
    coreApproach: "Hệ thống hoá, tối ưu danh mục đầu tư, ưu tiên tăng trưởng dài hạn dựa trên dữ liệu. Tiếp cận tài chính như bài toán tối ưu hoá.",
    strengths: [
      "Nghiên cứu kỹ trước khi đầu tư · không bị ảnh hưởng bởi tin đồn",
      "Thiết lập hệ thống ngân sách tự động hiệu quả",
      "Tìm hiểu sâu các công cụ tài chính phức tạp (ETF · quỹ chỉ số · tài sản số)",
      "Skepticism giúp tránh fad investments",
    ],
    traps: [
      "Tự tin thái quá vào khả năng phân tích → overconfidence bias",
      "Dễ sập bẫy sàn Forex giả mạo · tiền mã hoá đa cấp núp bóng thuật toán",
      "Analysis paralysis → trì hoãn quyết định đầu tư quá lâu",
      "Bỏ qua yếu tố cảm xúc của người thân khi quyết định tài chính chung",
    ],
    strategy: "Research kỹ, giữ statistics để boost motivation. Nếu ai đưa fad advice, research để chứng minh sai — double motivation.",
    nudgeStyle: "Đưa data cụ thể: 'Lãi suất thực tế của app X là Y%/năm khi tính đúng APR.' Không nói mơ hồ.",
    budgetRule: "50/20/30: 50% nhu cầu · 20% muốn có · 30% tiết kiệm/đầu tư (tăng phần đầu tư)",
  },
  NF: {
    coreApproach: "Coi tiền tệ là công cụ đạt tự do cá nhân, thực hiện giá trị nhân văn. Không ưu tiên tích luỹ cơ học mà tập trung trải nghiệm ý nghĩa.",
    strengths: [
      "Nhạy cảm với giá trị cốt lõi → không chi tiêu vô nghĩa",
      "Generous với người thân · sẵn sàng đóng góp cho cause ý nghĩa",
      "Tập trung trải nghiệm thay vì vật chất → tiết kiệm dài hạn tốt hơn",
    ],
    traps: [
      "Thiếu chú ý chi tiết số liệu → dễ bị lừa đảo quyên góp từ thiện giả mạo",
      "Dễ rơi vào bẫy 'lợi nhuận khủng không rủi ro'",
      "Emotional spending: dùng tiền xoa dịu cảm xúc",
      "Cho vay bạn bè không đòi được do ngại nói",
      "Áp lực nợ nần → trầm cảm nặng hơn các nhóm khác",
    ],
    strategy: "Kết nối mục tiêu tài chính với giá trị sống: 'Tiết kiệm X triệu = 1 chuyến thiện nguyện / 1 khoá học nghệ thuật'",
    nudgeStyle: "Gắn với ý nghĩa: 'Quỹ khẩn cấp 6 tháng = tự do từ chối công việc không phù hợp giá trị của bạn.'",
    budgetRule: "40/35/25: 40% nhu cầu · 35% trải nghiệm/ý nghĩa · 25% tiết kiệm",
  },
  ST: {
    coreApproach: "Ưu tiên an toàn, minh bạch pháp lý và hiệu quả thực tế. SJ cẩn trọng gửi tiết kiệm/BĐS · SP chấp nhận rủi ro ngắn hạn.",
    strengths: [
      "Kỷ luật cao trong thực hiện kế hoạch ngân sách",
      "Không bị ảnh hưởng cảm xúc khi đầu tư",
      "Minh bạch và cẩn trọng trong các giao dịch",
      "Ưu tiên pháp lý rõ ràng → ít rủi ro pháp lý",
    ],
    traps: [
      "Cứng nhắc trong phân bổ tài sản → bỏ lỡ cơ hội đầu tư",
      "SP: chi tiêu bốc đồng cho thiết bị công nghệ/thể thao mạo hiểm",
      "Không dự phòng cho sự kiện bất ngờ (bệnh tật · mất việc)",
      "Tiết kiệm quá cứng nhắc đến mức chất lượng sống giảm sút",
    ],
    strategy: "Frame tài chính bằng checklist cụ thể, mốc rõ ràng. Rest days tài chính (tháng không check portfolio) cũng là part of the plan.",
    nudgeStyle: "Checklist cụ thể: 'Tháng 6: đạt quỹ khẩn cấp 3 tháng lương. Tháng 12: đạt 6 tháng lương.' Milestone đo được.",
    budgetRule: "50/15/35: 50% nhu cầu · 15% muốn có · 35% tiết kiệm/đầu tư (tiết kiệm nhiều nhất)",
  },
  SF: {
    coreApproach: "Chi tiêu hướng về gia đình, kết nối xã hội và thẩm mỹ đời sống. Tặng quà · tổ chức sự kiện · mua sắm thời trang.",
    strengths: [
      "Chi tiêu cho gia đình → đầu tư vào mối quan hệ dài hạn",
      "Nhạy cảm với nhu cầu của người thân → chăm sóc tốt",
      "Ổn định tâm lý hơn khi tài chính cộng đồng cân bằng",
    ],
    traps: [
      "FOMO và áp lực đồng lứa → chi tiêu quá mức để 'bằng bạn bằng bè'",
      "Dễ sập bẫy tín dụng đen 'vay không cần chứng minh thu nhập'",
      "Bẫy combo du lịch/deal hời ảo dịp lễ Tết",
      "Khó từ chối khi người thân/bạn bè cần tiền → cho vay không có kế hoạch",
      "Đường sử dụng thẻ tín dụng không kiểm soát",
    ],
    strategy: "Frame bằng bảo vệ gia đình: 'Quỹ khẩn cấp = bảo vệ gia đình khi bố mẹ ốm, con cần học.' Social accountability hoạt động tốt.",
    nudgeStyle: "Kết nối với gia đình: 'Tiết kiệm X triệu/tháng = mua được bảo hiểm sức khoẻ cho bố mẹ cuối năm.'",
    budgetRule: "50/30/20: 50% nhu cầu · 30% muốn có/xã hội · 20% tiết kiệm (chuẩn, không tăng giảm)",
  },
}

// ─── BUDGET RULES ─────────────────────────────────────────

export const BUDGET_RULE_5030 = {
  rule: "50/30/20",
  description: "Nguyên tắc phổ biến nhất. Điều chỉnh theo nhóm MBTI.",
  needs: "50% - nhu cầu thiết yếu (thuê nhà, ăn uống, điện nước, đi lại)",
  wants: "30% - muốn có (giải trí, mua sắm, ăn hàng, du lịch)",
  savings: "20% - tiết kiệm & đầu tư (quỹ khẩn cấp + đầu tư dài hạn)",
  disclaimer: "[P] Tỷ lệ tham khảo, điều chỉnh theo thu nhập và hoàn cảnh thực tế",
}

// ─── EMERGENCY FUND ────────────────────────────────────────

export const EMERGENCY_FUND = {
  singleNoDebt: "3-4 tháng chi phí sinh hoạt",
  singleWithDebt: "4-6 tháng chi phí sinh hoạt",
  familyWithDependents: "6-12 tháng chi phí sinh hoạt",
  whereToPut: [
    "Tiết kiệm không kỳ hạn (rút được ngay) — lãi suất thấp nhưng linh hoạt",
    "Tiết kiệm online 1-3 tháng (ACB Online · TPBank eBank · VPBank NEO) — lãi cao hơn",
    "KHÔNG để trong đầu tư cổ phiếu/ETF (giá có thể xuống khi cần rút)",
  ],
  commonMistake: "Để quỹ khẩn cấp trong tài khoản đầu tư dễ rút — nguy hiểm khi thị trường xuống",
}

// ─── BEGINNER INVESTING (VN 2025-2026) ────────────────────

export const BEGINNER_INVESTING = {
  recommended: [
    {
      name: "Quỹ ETF Index (VN30 · VFMVN30 · SSIAM VNX50)",
      why: "Phí thấp · đa dạng hoá tự động · không cần chọn cổ phiếu",
      minAmount: "100.000 VNĐ/lần (qua ứng dụng chứng khoán)",
      risk: "Trung bình · theo thị trường chung",
    },
    {
      name: "Tiết kiệm online lãi suất cao",
      why: "An toàn · BHTG bảo hiểm · lãi suất 6-8%/năm (2025)",
      minAmount: "500.000 VNĐ",
      risk: "Thấp nhất",
    },
    {
      name: "Trái phiếu Chính phủ (HNX Bond)",
      why: "Nhà nước bảo đảm · lãi suất ổn định · kỳ hạn linh hoạt",
      minAmount: "1.000.000 VNĐ",
      risk: "Rất thấp",
    },
  ],
  avoid: [
    "Cổ phiếu lẻ khi chưa có kiến thức (rủi ro cao với người mới)",
    "Bất động sản khi chưa đủ vốn (ít nhất 30% giá trị BĐS)",
    "Vàng vật lý (phí mua bán cao · khó quản lý)",
    "Forex / CFD / quyền chọn (đòn bẩy cao · thua lỗ nhanh)",
    "Crypto chưa có kiến thức (biến động cực lớn)",
  ],
  disclaimer: "Thông tin tham khảo · không phải khuyến nghị đầu tư · tham khảo chuyên gia tài chính",
}

// ─── VN FINANCIAL TRAPS 2024-2026 ─────────────────────────

export interface FinancialTrap {
  name: string
  description: string
  warningSign: string[]
  howToEscape: string
  legalBasis?: string
  mbtiMostVulnerable: MbtiGroup[]
}

export const VN_FINANCIAL_TRAPS: FinancialTrap[] = [
  {
    name: "App cho vay lãi suất cắt cổ (Tín dụng đen số)",
    description: "App vay tiền nhanh quảng cáo '0% lãi suất 7 ngày đầu' nhưng APR thực tế 300-700%/năm. Sau khi vay, liên tục gọi điện quấy rối người thân.",
    warningSign: [
      "Không cần chứng minh thu nhập · duyệt trong 5 phút",
      "Phí xử lý hồ sơ cao bất thường (15-30% khoản vay)",
      "Yêu cầu truy cập danh bạ điện thoại",
      "Lãi suất tính theo ngày không theo năm (0.5%/ngày = 182%/năm)",
    ],
    howToEscape: "Tính APR thật: lãi suất ngày × 365. Nếu > 20%/năm = vi phạm pháp luật. Báo cáo tại canhbao.khonggianmang.vn",
    legalBasis: "Điều 468 BLDS 2015: lãi suất tối đa 20%/năm. Điều 201 BLHS: > 100%/năm → truy cứu hình sự (phạt tù đến 3 năm)",
    mbtiMostVulnerable: ["SF", "NF"],
  },
  {
    name: "Đầu tư đa cấp Forex/Coin/BĐS ảo",
    description: "Hứa lợi nhuận 30-50%/tháng từ giao dịch ngoại hối hoặc tiền mã hoá. Yêu cầu 'phí nâng cấp tài khoản' liên tục. Không thể rút tiền thật.",
    warningSign: [
      "Lợi nhuận cam kết quá cao và ổn định bất thường",
      "Ép mời người thân tham gia để nhận hoa hồng",
      "Không có giấy phép kinh doanh rõ ràng",
      "Chỉ giao dịch trong app riêng, không qua sàn chính thống",
    ],
    howToEscape: "Kiểm tra giấy phép tại ủy ban chứng khoán SSC. Không đầu tư nếu không hiểu cơ chế sinh lời.",
    legalBasis: "Forex tự phát = hoạt động ngoại hối trái phép · xử phạt hành chính + tịch thu",
    mbtiMostVulnerable: ["NT", "NF"],
  },
  {
    name: "Ép mua bảo hiểm kèm khoản vay (Bancassurance)",
    description: "Nhân viên ngân hàng ép mua bảo hiểm nhân thọ mới được giải ngân khoản vay. Phí bảo hiểm 10-30% giá trị khoản vay/năm.",
    warningSign: [
      "Nói rõ 'phải mua bảo hiểm mới được vay'",
      "Không cho đọc kỹ hợp đồng bảo hiểm",
      "Phí bảo hiểm cao bất thường so với khoản vay",
    ],
    howToEscape: "Quyền từ chối: ghi âm, thu thập bằng chứng, phản ánh Ngân hàng Nhà nước nếu bị ép.",
    legalBasis: "Luật Tổ chức tín dụng 2024 Điều 15 Khoản 5: NGHIÊM CẤM gắn bán bảo hiểm không bắt buộc với dịch vụ ngân hàng",
    mbtiMostVulnerable: ["SF", "ST"],
  },
  {
    name: "Lừa đảo từ thiện / quyên góp ảo",
    description: "Fanpage mạo danh tổ chức từ thiện uy tín, đăng ảnh cảm động kêu gọi quyên góp khẩn cấp. Tiền chuyển vào tài khoản cá nhân.",
    warningSign: [
      "Tài khoản nhận tiền là cá nhân không phải pháp nhân",
      "Áp lực 'khẩn cấp' không có thời gian kiểm tra",
      "Không có mã số tổ chức phi lợi nhuận rõ ràng",
    ],
    howToEscape: "Tra cứu tổ chức tại Bộ Nội vụ. Chỉ quyên góp qua tài khoản pháp nhân có chứng minh rõ ràng.",
    mbtiMostVulnerable: ["NF", "SF"],
  },
  {
    name: "FOMO đầu tư (Cổ phiếu · Đất · Crypto)",
    description: "Thấy bạn bè/mạng xã hội đăng lãi to → panic buy ở đỉnh → giữ khi giá xuống → thua lỗ nặng.",
    warningSign: [
      "Mua vì sợ bỏ lỡ, không phải vì hiểu giá trị",
      "Đi vay để đầu tư khi giá đang cao",
      "Tin theo nhóm chat 'chứng khoán miễn phí' chưa verify",
    ],
    howToEscape: "3 câu hỏi trước khi mua: 1) Tôi hiểu cơ chế sinh lời không? 2) Tôi chịu được mất X% không? 3) Tôi đang mua vì phân tích hay vì sợ?",
    mbtiMostVulnerable: ["NT", "SF"],
  },
]

// ─── LEGAL BASIS (Pháp luật tài chính VN) ─────────────────

export const VN_FINANCE_LAW = {
  interestRateCap: {
    civil: "20%/năm (Điều 468 BLDS 2015) — mức tối đa thỏa thuận",
    criminal: "Từ 100%/năm (gấp 5 lần trần dân sự) + thu lợi bất chính ≥ 30 triệu → Điều 201 BLHS 2015",
    adminFine: "10-20 triệu VNĐ (Nghị định 144/2021/NĐ-CP) nếu chưa đến mức hình sự",
  },
  bancassurance: {
    law: "Luật Tổ chức tín dụng 2024 · Điều 15 · Khoản 5",
    effective: "01/07/2024",
    prohibition: "NGHIÊM CẤM gắn bán sản phẩm bảo hiểm không bắt buộc với dịch vụ ngân hàng",
    userRight: "Từ chối mua bảo hiểm · ghi âm bằng chứng nếu bị ép · phản ánh NHNN",
  },
  depositInsurance: {
    law: "Luật Bảo hiểm tiền gửi 2025 (hiệu lực tháng 5/2026)",
    protection: "Quyền lợi người gửi tiền phát sinh ngay khi phương án phá sản được phê duyệt",
  },
  penaltyFine: {
    law: "Nghị định 296/2025/NĐ-CP",
    effective: "01/01/2026",
    measure: "Cưỡng chế khấu trừ lương/tài khoản ngân hàng nếu không nộp phạt hành chính",
    note: "Áp dụng cả phạt giao thông nguội không nộp đúng hạn",
  },
}

// ─── INSURANCE GUIDE ──────────────────────────────────────

export const INSURANCE_GUIDE = {
  mustHave: [
    "BHYT (tối thiểu) hoặc bảo hiểm sức khoẻ tư nhân bổ sung",
    "Bảo hiểm tai nạn cá nhân (phí thấp · bảo vệ rủi ro cao)",
    "Bảo hiểm xe máy/ô tô theo luật",
  ],
  shouldHave: [
    "Bảo hiểm nhân thọ kỳ hạn (term life) — nếu có người phụ thuộc",
    "Bảo hiểm sức khoẻ có phòng bệnh viện (nếu BHYT không đủ)",
  ],
  notYet: [
    "Bảo hiểm đầu tư liên kết (unit-linked) — phí cao · phức tạp với người mới",
    "Bảo hiểm giáo dục cho con (thường có phí cao hơn tiết kiệm riêng)",
  ],
  warning21Days: "Quyền cân nhắc 21 ngày: Sau khi ký hợp đồng bảo hiểm nhân thọ, có 21 ngày hủy và lấy lại phí đã đóng",
}

// ─── CRISIS SUPPORT HOTLINES (Tài chính + Tâm lý) ─────────

export const TGPL_HOTLINE = '1800 1233'
export const TGPL_URL = 'https://tgpl.moj.gov.vn'

export const FINANCIAL_CRISIS_SUPPORT = {
  mentalHealth: [
    { name: "Đường dây Ngày Mai", phone: "096 306 1414", hours: "13:00-20:30 · T4-CN", scope: "Sơ cứu tâm lý miễn phí · trầm cảm do áp lực tài chính" },
    { name: "BV Tâm Thần TP.HCM + 115", phone: "1900 1267", hours: "24/7", scope: "Cấp cứu trầm cảm · điều phối ngoại viện" },
    { name: "Viện SK Tâm thần Bạch Mai", phone: "(024) 3576 5344", hours: "Giờ hành chính + trực cấp cứu", scope: "Khám · điều trị nội/ngoại trú cả nước" },
    { name: "CSAGA", phone: "024 3333 5599", hours: "Giờ hành chính", scope: "Bạo lực giới · nhóm yếu thế" },
    { name: "Tổng đài trẻ em", phone: "111", hours: "24/7 · miễn phí", scope: "Bảo vệ trẻ em dưới 16 tuổi" },
  ],
  legal: [
    { name: "TGPL Bộ Tư pháp", phone: TGPL_HOTLINE, url: TGPL_URL, hours: "Giờ hành chính", scope: "Trợ giúp pháp lý miễn phí cho đối tượng yếu thế" },
  ],
  scamReport: [
    { name: "Cổng cảnh báo AT thông tin", url: "canhbao.khonggianmang.vn", scope: "Báo cáo lừa đảo tài chính online" },
    { name: "Tín nhiệm mạng", url: "tinnhiemmang.vn", scope: "Tra cứu tài khoản ngân hàng lừa đảo · website đen" },
  ],
}

// ─── BY LIFE STAGE ────────────────────────────────────────

export const FINANCE_BY_STAGE = {
  student: {
    priority: ["Tránh nợ tiêu dùng · không dùng thẻ tín dụng khi chưa có thu nhập"],
    action: ["Học về quản lý chi tiêu cơ bản", "Tìm học bổng/part-time đúng luật"],
    taxNote: "Sinh viên có thu nhập > 132 triệu/năm mới phải đóng thuế TNCN",
  },
  earlyCareer: {
    priority: ["Xây quỹ khẩn cấp 3-6 tháng", "Đóng BHXH đúng", "Bắt đầu đầu tư nhỏ"],
    action: ["Đóng BHXH đầy đủ (35 năm để hưởng lương hưu)", "Mở tài khoản chứng khoán", "Thuế TNCN: hiểu bậc thuế của mình"],
  },
  established: {
    priority: ["Tăng tỷ lệ đầu tư", "Mua nhà thực tế (30% vốn tự có)", "Bảo hiểm nhân thọ nếu có gia đình"],
    action: ["ETF index hàng tháng", "So sánh lãi vay mua nhà các ngân hàng", "Lập di chúc cơ bản"],
  },
  family: {
    priority: ["Bảo vệ thu nhập (bảo hiểm)", "Quỹ giáo dục con", "Phòng hờ bố mẹ ốm"],
    action: ["Bảo hiểm term life tương đương 10x thu nhập năm", "Tiết kiệm giáo dục riêng (không trộn quỹ khẩn cấp)"],
  },
}

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getFinanceStyle(group: MbtiGroup): FinanceStyle {
  return MBTI_FINANCE_STYLE[group]
}

export function getTrapsByGroup(group: MbtiGroup): FinancialTrap[] {
  return VN_FINANCIAL_TRAPS.filter(t => t.mbtiMostVulnerable.includes(group))
}

export function calculateAPR(dailyRate: number): number {
  return dailyRate * 365
}
