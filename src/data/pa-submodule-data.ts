/**
 * DATAMINING OUTPUT — PA Sub-Module Mở Rộng
 * Ngày: 18/06/2026 · 16:00
 * 5 prompts: pháp luật VN · MBTI giải trí · sức khỏe · du lịch · wellbeing
 * Tag: [R] peer-reviewed · [P] practitioner · [S] single source/VN legal
 */

// ============================================================
// PROMPT 1 — PHÁP LUẬT ĐỜI SỐNG VN
// ============================================================

/**
 * NGUỒN ĐÃ VERIFY:
 * - Luật Trật tự ATGT đường bộ 2024 (36/2024/QH15, hiệu lực 01/01/2025)
 * - Nghị định 168/2024/NĐ-CP (hiệu lực 01/01/2025) — xử phạt giao thông
 * - Thông tư 73/2024/TT-BCA (hiệu lực 01/01/2025) — quy trình CSGT
 * - Thông tư 46/2024/TT-BCA (hiệu lực 15/11/2024) — bãi bỏ công khai chuyên đề
 * - Bộ luật Lao động 2019 (Điều 41, 125, 188, 190)
 * - Bộ luật Hình sự 2015 sửa đổi 2017 (Điều 162)
 * - Nghị định 12/2022/NĐ-CP — xử phạt vi phạm hành chính lao động
 *
 * DISCLAIMER chung: "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý"
 */

// ─── NHÓM 1: GIAO THÔNG ──────────────────────────────────

export const LEGAL_TRAFFIC = [
  {
    id: "traffic-001",
    title: "CSGT dừng xe — quyền và quy trình đúng",
    context:
      "Bạn đang chạy xe bình thường trên đường. Một CSGT ra hiệu dừng xe. Bạn không biết mình làm gì sai, cũng không biết mình có quyền gì.",
    commonMistake:
      "Nhiều người hoặc từ chối dừng (có thể bị phạt thêm 4-6 triệu) hoặc không biết quyền được ghi hình CSGT.",
    userRights: [
      "Được biết lý do dừng xe (dù không được xem 'chuyên đề' trực tiếp tại chỗ)",
      "Được xuất trình giấy tờ qua app VNeID/CCCD gắn chip thay vì bản gốc",
      "Được ghi hình, ghi âm quá trình làm việc với CSGT",
      "Được khiếu nại nếu cho rằng CSGT dừng xe sai quy định (hotline Cục CSGT: 0995.67.67.67)",
      "Không bị tịch thu phone khi đang quay",
    ],
    csgtRights: [
      "Dừng xe khi phát hiện vi phạm (trực tiếp hoặc qua camera)",
      "Dừng xe theo kế hoạch tuần tra đã được phê duyệt",
      "Dừng xe phục vụ an ninh, phòng chống tội phạm",
      "Dừng xe khi có tin báo/tố giác",
    ],
    csgtKhongDuoc: [
      "Dừng xe để kiểm soát khi đang điều tiết giao thông giờ cao điểm",
      "Tịch thu phone của người đang quay video",
      "Yêu cầu nộp tiền phạt tại chỗ bằng tiền mặt trực tiếp (phải qua biên lai/TK ngân hàng)",
    ],
    legalBasis:
      "Điều 65, 66 Luật Trật tự ATGT đường bộ 2024; Thông tư 73/2024/TT-BCA; Thông tư 46/2024/TT-BCA",
    practicalStep:
      "Dừng xe an toàn, bình tĩnh hỏi lý do dừng, xuất trình giấy tờ (có thể qua VNeID), có thể quay video. Nếu bị xử phạt không đồng ý: ký biên bản nhưng ghi rõ 'không đồng ý với nội dung' và khiếu nại sau.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "traffic-002",
    title: "Nồng độ cồn — mức phạt 2025 và bẫy thường gặp",
    context:
      "Bạn uống bia tối hôm trước, sáng hôm sau lái xe. Hoặc uống nước hoa quả lên men không cố ý. Bị dừng xe kiểm tra nồng độ cồn.",
    commonMistake:
      "Nghĩ rằng 'ngủ một đêm là hết'. Cơ thể xử lý cồn trung bình 0.015% BAC/giờ — uống nhiều, ngủ không đủ hết. Cũng không có cách 'tỉnh nhanh' bằng cà phê hay vận động.",
    mfaPhatXeMay: {
      muc1: "Chưa vượt 0.25mg/l khí thở: 2-3 triệu + trừ 4 điểm GPLX",
      muc2: "0.25-0.4mg/l: 6-8 triệu + trừ 10 điểm GPLX",
      muc3: "Trên 0.4mg/l: 8-10 triệu + tước GPLX 22-24 tháng",
      tuChoi: "Từ chối thổi: tương đương mức 3 (8-10 triệu + tước GPLX 22-24 tháng)",
    },
    mfaPhatOTo: {
      muc1: "Chưa vượt 0.25mg/l: 6-8 triệu + trừ 4 điểm GPLX",
      muc2: "0.25-0.4mg/l: 18-20 triệu + trừ 10 điểm GPLX",
      muc3: "Trên 0.4mg/l: 30-40 triệu + tước GPLX 22-24 tháng",
      tuChoi: "Từ chối thổi ô tô: 30-40 triệu + tước GPLX 22-24 tháng",
    },
    userRights: [
      "Được yêu cầu test lại (máy đo thứ 2) nếu nghi ngờ kết quả",
      "Được nhờ người thân đến đón xe (xe bị giữ tối đa 7 ngày)",
      "Được khiếu nại kết quả đo nếu có căn cứ",
    ],
    bayThuongGap: [
      "Uống nước súc miệng có cồn trước khi lái → có thể cho kết quả dương tính nhẹ",
      "Hoa quả lên men (mít chín, vải) → ít nhưng có thể ảnh hưởng",
      "Nghĩ 'chỉ uống ít' → theo luật BẤT KỲ lượng cồn nào đều bị phạt",
    ],
    legalBasis:
      "Điều 7 Nghị định 168/2024/NĐ-CP (xe máy); Điều 6 (ô tô); Luật Trật tự ATGT đường bộ 2024",
    practicalStep:
      "Nếu bị dừng: bình tĩnh, hợp tác, không từ chối (từ chối = mức phạt nặng nhất). Gọi người đến đón xe. Nếu nghi ngờ kết quả: yêu cầu đo lại.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "traffic-003",
    title: "Phạt nguội — bị thông báo, quy trình và quyền khiếu nại",
    context:
      "Bạn nhận được thông báo vi phạm giao thông qua camera (phạt nguội). Hoặc bạn muốn biết xe mình có đang bị phạt nguội không trước khi đi đăng kiểm.",
    commonMistake:
      "Bỏ qua thông báo → không xử lý → không đăng kiểm được, sang tên được. Cũng có trường hợp nhận thông báo của xe cũ chưa sang tên.",
    userRights: [
      "Được tra cứu phạt nguội tại: csgt.vna.gov.vn hoặc app iCSGT",
      "Được khiếu nại nếu không phải mình lái xe (phải cung cấp bằng chứng ai lái)",
      "Được yêu cầu xem hình ảnh/video vi phạm",
    ],
    traCuuPhaNguoiInfo:
      "Website: csgt.vna.gov.vn | App: iCSGT | Hotline: 1900.6474",
    bayXeChuaSangTen:
      "Nếu đã bán xe nhưng chưa sang tên: thông báo phạt vẫn về tên bạn. Cần xác nhận bằng văn bản bán xe + liên hệ đơn vị xử phạt để trình bày. Rủi ro pháp lý thuộc người giữ xe thực tế.",
    legalBasis:
      "Luật Trật tự ATGT đường bộ 2024; Nghị định 168/2024/NĐ-CP; Luật Xử lý vi phạm hành chính",
    practicalStep:
      "Tra cứu ngay tại csgt.vna.gov.vn nhập biển số xe. Nộp phạt tại Kho bạc Nhà nước hoặc qua app. Nếu không đồng ý: khiếu nại trong 10 ngày kể từ khi nhận quyết định xử phạt.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "traffic-004",
    title: "Tai nạn giao thông — làm gì ngay tại chỗ",
    context:
      "Bạn vừa bị tai nạn giao thông hoặc gây ra tai nạn. Hai bên đang ở hiện trường. Bạn không biết nên làm gì đầu tiên.",
    commonMistake:
      "Di chuyển phương tiện trước khi chụp ảnh hiện trường. Không gọi cảnh sát. Đồng ý bồi thường ngay tại chỗ mà không có bằng chứng.",
    userRights: [
      "Được yêu cầu cảnh sát lập biên bản tai nạn (quan trọng cho bảo hiểm)",
      "Được từ chối bồi thường tại chỗ khi chưa xác định được lỗi",
      "Được bảo hiểm bắt buộc bồi thường (nếu xe còn bảo hiểm) theo thiệt hại thực tế",
      "Được yêu cầu trích xuất camera an ninh gần hiện trường (qua cảnh sát)",
    ],
    batchOrderAtScene: [
      "1. Bảo đảm an toàn: dừng xe, bật đèn cảnh báo, đặt tam giác (nếu có)",
      "2. Gọi cấp cứu 115 nếu có người bị thương — không di chuyển nạn nhân tự ý",
      "3. Gọi cảnh sát 113 để lập biên bản",
      "4. Chụp ảnh hiện trường TRƯỚC khi di chuyển xe (từ nhiều góc)",
      "5. Không ký bất cứ giấy tờ nào trước khi cảnh sát đến",
      "6. Thu thập thông tin: số xe, bảo hiểm, CCCD, số điện thoại người liên quan",
    ],
    legalBasis:
      "Luật Trật tự ATGT đường bộ 2024; Bộ luật Dân sự 2015 Điều 590 (bồi thường sức khỏe); Luật Kinh doanh bảo hiểm",
    practicalStep:
      "Gọi 113, chụp ảnh ngay, không di chuyển xe trước khi có mặt cảnh sát. Liên hệ công ty bảo hiểm trong 24h sau tai nạn.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "traffic-005",
    title: "Bằng lái hết hạn — xử lý và hậu quả",
    context:
      "Bạn vừa phát hiện bằng lái xe đã hết hạn (hoặc sắp hết). Hoặc bạn đang lái xe mà chưa biết bằng của mình còn hạn không.",
    commonMistake:
      "Không biết bằng lái có thời hạn (xe máy hạng A1 không hết hạn, nhưng B1/B2/C có hạn). Tiếp tục lái khi bằng đã hết hạn.",
    thanhDoBang: {
      A1: "Không có thời hạn",
      B1: "10 năm kể từ ngày cấp",
      B2: "10 năm",
      C: "5 năm",
    },
    quyTrinh:
      "Gia hạn tại Sở GTVT/Phòng GTVT hoặc online. Cần giấy khám sức khỏe, ảnh 3x4, lệ phí. Không cần thi lại nếu chỉ gia hạn (chưa để quá 1 năm).",
    matBang:
      "Mất bằng: khai báo với cơ quan cấp gốc, nộp đơn xin cấp lại. Nếu mất và hết hạn luôn: cần thi lại.",
    tuocBang:
      "Bằng bị tước có thể lấy lại sau thời hạn tước nếu chưa bị hủy. Đến Phòng CSGT nơi xử phạt để nộp phạt đầy đủ và lấy lại.",
    legalBasis:
      "Luật Trật tự ATGT đường bộ 2024; Thông tư 12/2017/TT-BGTVT về cấp GPLX",
    practicalStep:
      "Kiểm tra hạn bằng ngay qua app DRVLC hoặc csgt.vna.gov.vn. Nộp hồ sơ gia hạn trước khi hết hạn 30 ngày để tránh phiền phức.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "traffic-006",
    title: "Trây ỳ không nộp phạt nguội — từ 2026 bị khấu trừ lương",
    context:
      "Bạn bị phạt nguội 1.5 triệu đồng từ tháng trước. Bạn đang nghĩ: 'Không ai biết mình không nộp đâu, cứ chờ xem sao.'",
    commonMistake:
      "Nhiều người nghĩ không nộp phạt nguội sẽ không bị xử lý. Từ 01/01/2026, NĐ 296/2025/NĐ-CP cho phép cơ quan chức năng khấu trừ lương/thu nhập của người vi phạm không chấp hành.",
    userRights: [
      "Được thông báo bằng văn bản trước khi bị cưỡng chế",
      "Được cung cấp thông tin về số tiền bị khấu trừ và lý do",
      "Mức khấu trừ không vượt quá 30% lương/lương hưu mỗi lần (sau khi trừ BHXH, thuế TNCN)",
      "Phải đảm bảo điều kiện sinh hoạt tối thiểu — không khấu trừ toàn bộ thu nhập",
    ],
    csgtKhongDuoc: [
      "Khấu trừ mà không có quyết định cưỡng chế bằng văn bản",
      "Khấu trừ quá 30% lương/lương hưu hoặc quá 50% thu nhập khác",
      "Áp dụng ngay khi hết hạn nộp phạt mà chưa qua quy trình xác minh (5 ngày làm việc)",
    ],
    legalBasis:
      "Nghị định 296/2025/NĐ-CP (Điều 10-14), hiệu lực 01/01/2026, thay thế NĐ 166/2013. Áp dụng cho: cán bộ, công chức, viên chức, người lao động hưởng lương, người hưởng lương hưu.",
    practicalStep:
      "Nộp phạt đúng hạn (trong 10 ngày) qua dichvucong.gov.vn hoặc tài khoản ngân hàng chỉ định. Nếu nhận quyết định cưỡng chế: kiểm tra đúng thủ tục chưa (có văn bản xác minh, đúng mức khấu trừ). Nếu sai quy trình: khiếu nại theo Luật XLVPHC 2012.",
    lastUpdated: "01/2026",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
]

// ─── NHÓM 2: LAO ĐỘNG & HỢP ĐỒNG ────────────────────────

export const LEGAL_LABOR = [
  {
    id: "labor-001",
    title: "Bị sa thải không lý do — quyền ngay lập tức",
    context:
      "Công ty thông báo bạn bị thôi việc không có lý do rõ ràng, không qua quy trình họp kỷ luật. Hoặc lý do đưa ra không thuộc các trường hợp luật cho phép.",
    commonMistake:
      "Ký ngay vào biên bản đồng ý chấm dứt hợp đồng vì sợ. Một khi đã ký tự nguyện, quyền khiếu nại bị giới hạn đáng kể.",
    saThaiBatHopPhap:
      "Sa thải hợp pháp chỉ trong 4 trường hợp (Điều 125 BLLĐ): (1) trộm cắp, tham ô, đánh bạc, gây thương tích, ma túy tại nơi làm việc; (2) tiết lộ bí mật kinh doanh, xâm phạm SHTT, gây thiệt hại nghiêm trọng; (3) quấy rối tình dục; (4) tự ý nghỉ 5 ngày/tháng hoặc 20 ngày/năm không lý do. Ngoài 4 trường hợp này = sa thải trái luật.",
    userRights: [
      "Yêu cầu nhận lại làm việc theo hợp đồng cũ",
      "Được trả lương cho toàn bộ thời gian không được làm việc",
      "Được bồi thường ít nhất 2 tháng tiền lương",
      "Nếu không muốn quay lại: thêm trợ cấp thôi việc (0.5 tháng/năm làm việc)",
      "Khởi kiện ra Tòa án nhân dân (không cần qua hòa giải với tranh chấp sa thải)",
    ],
    timeLimit:
      "Thời hiệu khởi kiện: 1 năm kể từ ngày bị sa thải (Điều 190 BLLĐ 2019). Đừng chờ lâu.",
    legalBasis:
      "Điều 41, 125, 188, 190 Bộ luật Lao động 2019; Điều 162 BLHS 2015 sửa đổi 2017; Nghị định 12/2022/NĐ-CP",
    practicalStep:
      "Không ký bất cứ giấy tờ nào ngay lập tức. Lưu hết: hợp đồng, quyết định sa thải, biên bản họp (nếu có), email, tin nhắn. Liên hệ Phòng Lao động quận/huyện hoặc luật sư trong 30 ngày đầu.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "labor-002",
    title: "Hợp đồng thử việc — bẫy phổ biến",
    context:
      "Công ty yêu cầu thử việc 2-3 tháng, trả 70-80% lương, hứa ký hợp đồng chính thức sau. Một số công ty kéo dài thử việc hoặc không ký hợp đồng.",
    commonMistake:
      "Không biết: (1) thử việc tối đa 60 ngày (180 ngày với vị trí quản lý); (2) lương thử việc tối thiểu 85% lương chính thức; (3) hết thời gian thử việc mà không có thông báo = tự động vào biên chế.",
    userRights: [
      "Lương thử việc tối thiểu 85% lương chính thức (Điều 26 BLLĐ 2019)",
      "Thời gian thử việc: tối đa 60 ngày/phổ thông, 180 ngày/quản lý",
      "Có thể chấm dứt thử việc bất kỳ lúc nào (báo trước 3 ngày)",
      "Sau hết thời gian thử việc, không có thông báo = được nhận chính thức",
      "Được đóng BHXH từ ngày đầu nếu thời gian thử việc > 1 tháng",
    ],
    legalBasis:
      "Điều 24-27 Bộ luật Lao động 2019; Nghị định 145/2020/NĐ-CP",
    practicalStep:
      "Ký hợp đồng thử việc rõ ràng (không thử việc miệng). Lưu tất cả giấy tờ. Khi hết thời gian thử việc mà không được thông báo: gửi email xác nhận xin làm việc chính thức.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "labor-003",
    title: "Chủ không đóng BHXH — hậu quả và cách xử lý",
    context:
      "Bạn làm việc nhiều năm nhưng khi kiểm tra sổ BHXH thấy công ty không đóng đủ, hoặc không đóng từ đầu dù đã có hợp đồng lao động.",
    commonMistake:
      "Không kiểm tra sổ BHXH định kỳ. Đến khi muốn hưởng quyền lợi (thai sản, ốm đau, thất nghiệp) mới phát hiện.",
    hậuQua: [
      "Không được hưởng BHYT (phải tự trả viện phí)",
      "Không tính vào thời gian đóng BHXH (ảnh hưởng lương hưu)",
      "Không được hưởng trợ cấp thất nghiệp khi thôi việc",
      "Không được hưởng thai sản đủ (6 tháng cần đóng đủ 6 tháng trước)",
    ],
    userRights: [
      "Yêu cầu công ty đóng BHXH hồi tố (đóng bù toàn bộ thời gian đã làm)",
      "Tố cáo với cơ quan BHXH địa phương",
      "Khởi kiện tại Tòa án nếu công ty từ chối",
    ],
    traoCuu: "App BHXH VN hoặc vnpt-bhxh.com.vn → tra cứu quá trình đóng BHXH",
    baoCai: "Cơ quan BHXH quận/huyện nơi công ty đặt trụ sở. Email: baohinh.vn",
    legalBasis:
      "Luật BHXH 2014 (sửa đổi); Điều 216 Bộ luật Hình sự 2015 (trốn đóng BHXH hình sự từ 1 tỷ hoặc 100 lao động trở lên); Nghị định 12/2022/NĐ-CP",
    practicalStep:
      "Kiểm tra sổ BHXH ngay. Gửi email/văn bản yêu cầu công ty giải thích. Nếu không được giải quyết: tố cáo với BHXH địa phương (mang hợp đồng lao động, bảng lương làm bằng chứng).",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "labor-004",
    title: "Thuê nhà — đặt cọc bị giữ và quyền của người thuê",
    context:
      "Bạn đặt cọc thuê nhà 1-2 tháng tiền. Sau đó chủ nhà không trả cọc khi hợp đồng kết thúc, hoặc tự ý tăng tiền mà không thông báo.",
    commonMistake:
      "Không ký hợp đồng thuê nhà bằng văn bản. Không ghi rõ điều kiện hoàn trả cọc trong hợp đồng.",
    userRights: [
      "Hợp đồng miệng có giá trị pháp lý (nhưng khó chứng minh) — nên ký văn bản",
      "Cọc phải được hoàn trả đủ nếu không vi phạm hợp đồng",
      "Chủ nhà không được tự ý vào phòng không có sự đồng ý của người thuê",
      "Nếu chủ nhà vi phạm hợp đồng: người thuê được yêu cầu bồi thường gấp đôi tiền cọc (Điều 328 BLDS 2015)",
      "Nếu người thuê vi phạm (bỏ nhà trước hạn không lý do): mất cọc",
    ],
    bayCuaNhaTro: [
      "Không ký hợp đồng → khó đòi cọc",
      "Điều kiện hoàn cọc mơ hồ ('nhà phải sạch sẽ') → tranh chấp",
      "Không kiểm tra nhà khi vào, ra → bị đổ thừa hư hỏng",
    ],
    legalBasis:
      "Điều 328 Bộ luật Dân sự 2015 (đặt cọc); Luật Nhà ở 2023; Luật Kinh doanh BĐS",
    practicalStep:
      "Luôn ký hợp đồng thuê nhà văn bản, ghi rõ: điều kiện hoàn cọc, thời hạn thuê, mức tăng giá. Chụp ảnh tình trạng nhà khi vào và ra. Giữ biên lai giao cọc có chữ ký hai bên.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "labor-005",
    title: "Vay app — bẫy lãi suất và quyền của người vay",
    context:
      "Bạn vay tiền qua app, gặp lãi suất rất cao hoặc bị đòi nợ theo cách đe dọa/quấy rối. Hoặc bạn đang cân nhắc vay app và muốn biết giới hạn pháp lý.",
    commonMistake:
      "Không đọc kỹ điều khoản. Không biết lãi suất tối đa theo luật dân sự là 20%/năm. Không biết đòi nợ kiểu đe dọa là hành vi hình sự.",
    laiSuatToiDa:
      "Bộ luật Dân sự 2015 Điều 468: lãi suất tối đa 20%/năm. Vượt mức này = vô hiệu phần lãi vượt. Cho vay nặng lãi hình sự từ 5 lần lãi suất tối đa trở lên (= trên 100%/năm).",
    userRights: [
      "Chỉ có nghĩa vụ trả gốc + tối đa 20%/năm lãi",
      "Không bị ép cài app quản lý danh bạ (vi phạm Luật An toàn thông tin mạng)",
      "Đòi nợ bằng cách quấy rối, đe dọa, tiếp xúc người thân = vi phạm hình sự",
      "Báo cáo lên công an nếu bị đe dọa hoặc cho vay nặng lãi",
    ],
    khacNhauVay:
      "Ngân hàng: lãi suất regulated, minh bạch. App có phép: Điều kiện rõ ràng. App tín dụng đen: không phép, lãi suất vi phạm pháp luật.",
    legalBasis:
      "Điều 468 Bộ luật Dân sự 2015; Điều 201 BLHS 2015 (tội cho vay nặng lãi); Luật An toàn thông tin mạng 2015",
    practicalStep:
      "Nếu đang bị đòi nợ kiểu quấy rối: chụp màn hình/ghi âm làm bằng chứng rồi báo công an địa phương. Nếu lãi suất vượt 20%/năm: chỉ có nghĩa vụ trả gốc + phần lãi hợp pháp.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
]

// ─── NHÓM 3: AN TOÀN CÁ NHÂN ─────────────────────────────

export const LEGAL_PERSONAL_SAFETY = [
  {
    id: "safety-001",
    title: "Bị chụp ảnh/quay lén — quyền pháp lý",
    context:
      "Bạn phát hiện ai đó chụp ảnh mình mà không xin phép, hoặc phát tán ảnh/video của bạn lên mạng mà không có sự đồng ý.",
    commonMistake:
      "Nghĩ rằng 'chụp nơi công cộng là được phép'. Thực ra vẫn cần đồng ý nếu mục đích thương mại hoặc làm ảnh hưởng danh dự.",
    userRights: [
      "Quyền về hình ảnh cá nhân được bảo vệ (Điều 32 BLDS 2015)",
      "Dùng ảnh không xin phép vì mục đích thương mại = vi phạm dân sự",
      "Phát tán ảnh gây ảnh hưởng danh dự = xử phạt hành chính (15-20 triệu) hoặc hình sự",
      "Yêu cầu gỡ ảnh + bồi thường thiệt hại",
      "Báo cáo platform (Facebook/TikTok/Zalo) để xóa nội dung",
    ],
    quayLen:
      "Quay lén trong nhà vệ sinh, phòng thay đồ: BLHS Điều 159 — phạt tù đến 3 năm. Tố cáo ngay với cơ quan công an.",
    thuThapBangChung: [
      "Screenshot + URL ngay (trước khi bị xóa)",
      "Ghi ngày giờ phát hiện",
      "Lưu link bài đăng",
      "Nhờ bạn bè screenshot từ tài khoản khác để verify",
    ],
    legalBasis:
      "Điều 32 Bộ luật Dân sự 2015 (quyền về hình ảnh); Nghị định 15/2020/NĐ-CP (xử phạt hành chính CNTT); Điều 159 BLHS 2015 sửa đổi (quay lén)",
    practicalStep:
      "Screenshot ngay làm bằng chứng. Báo cáo nền tảng để xóa. Nếu ảnh hưởng nghiêm trọng: làm đơn tố cáo tại công an quận/huyện nơi bạn cư trú.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "safety-002",
    title: "Bị triệu tập — triệu tập khác bị bắt thế nào",
    context:
      "Bạn nhận giấy triệu tập của công an để làm việc. Bạn lo lắng không biết đây là gì, có phải đi không, có cần luật sư không.",
    commonMistake:
      "Hoảng loạn hoặc bỏ qua giấy triệu tập. Cả hai đều không nên.",
    trieuTapVsBatGiu:
      "Triệu tập = yêu cầu đến làm việc với tư cách nhân chứng, người liên quan. Bạn KHÔNG bị tạm giam. Bắt giữ = có lệnh bắt tạm giam, thủ tục khác hẳn.",
    quyKhiBiTrieuTap: [
      "Được biết lý do triệu tập (hỏi khi nhận giấy hoặc khi đến)",
      "Có thể đề nghị đổi ngày giờ nếu lý do chính đáng",
      "Có thể mang theo luật sư (được phép nhưng không bắt buộc)",
      "Không bắt buộc tự buộc tội mình (nguyên tắc nemo tenetur trong pháp luật VN — áp dụng giới hạn)",
    ],
    quyenImLang:
      "VN không có right to silence tuyệt đối như Mỹ. Nhưng theo Điều 58 Luật Tố tụng Hình sự 2015: người bị triệu tập có quyền trình bày lời khai theo ý chí của mình, không bị ép buộc. Nên trả lời câu hỏi thực tế nhưng không cần suy đoán hay tự buộc tội.",
    luatSuKhiNao:
      "Nên có luật sư nếu: bạn là người bị nghi, vụ việc phức tạp, hoặc bạn không chắc về tình trạng pháp lý của mình.",
    legalBasis:
      "Bộ luật Tố tụng Hình sự 2015 (Điều 55, 56, 57, 58); Hiến pháp 2013",
    practicalStep:
      "Đọc kỹ giấy triệu tập xem tư cách gì (nhân chứng hay người bị tình nghi). Đến đúng hẹn, mang CCCD. Nếu có băn khoăn: gọi luật sư trước khi đến. Không cần hoảng loạn nếu chỉ là nhân chứng.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
  {
    id: "safety-003",
    title: "Bị đe dọa — khi nào thành tội hình sự",
    context:
      "Ai đó gửi tin nhắn đe dọa bạn, nhắn 'sẽ làm hại' hoặc đòi tiền kèm đe dọa. Bạn không biết có thể làm gì về mặt pháp lý.",
    commonMistake:
      "Xóa tin nhắn vì sợ. Đây là xóa bằng chứng quan trọng nhất.",
    khiNaoHinhSu: [
      "Đe dọa giết/gây thương tích khiến người kia có cơ sở sợ hãi: Điều 133 BLHS (tội đe dọa giết người) — phạt tù 3 tháng đến 3 năm",
      "Đòi tiền kèm đe dọa (tống tiền): Điều 170 BLHS — phạt tù nghiêm trọng hơn",
      "Đe dọa lặp đi lặp lại (harassment): có thể cấu thành tội làm nhục người khác",
    ],
    thuThap: [
      "Screenshot tất cả tin nhắn (không xóa)",
      "Ghi lại thời gian, tần suất",
      "Lưu số điện thoại/tài khoản MXH của kẻ đe dọa",
      "Nhờ người làm chứng nếu có",
    ],
    userRights: [
      "Tố cáo với công an (mang đủ bằng chứng)",
      "Yêu cầu lệnh cấm tiếp cận (trong trường hợp bạo lực gia đình hoặc harassment)",
      "Dân sự: kiện đòi bồi thường thiệt hại tinh thần",
    ],
    legalBasis:
      "Điều 133, 155, 170 Bộ luật Hình sự 2015 sửa đổi 2017",
    practicalStep:
      "Giữ nguyên tất cả bằng chứng. Nếu cảm thấy nguy hiểm ngay lập tức: gọi 113. Nếu đe dọa qua mạng kéo dài: làm đơn tố cáo tại công an quận/huyện kèm bằng chứng.",
    lastUpdated: "01/2025",
    disclaimer:
      "Thông tin tham khảo · tình huống phức tạp → tư vấn pháp lý",
  },
]

// ============================================================
// PROMPT 2 — MBTI × GIẢI TRÍ
// ============================================================
// [P] = practitioner consensus · [S] = aggregated preference data
// Không có RCT linking MBTI type to specific films/books — dùng [P]

export const MBTI_ENTERTAINMENT = {
  NT: {
    group: "NT",
    psychProfile: "Tư duy hệ thống · chiến lược · logic · thích ý tưởng phức tạp",
    films: [
      {
        genre: "Sci-fi có chiều sâu triết học",
        reason: "NT thích khám phá ý tưởng lớn, hệ thống phức tạp, câu hỏi về ý thức và thực tại",
        tag: "[P]",
        examples: ["Interstellar", "Arrival", "Ex Machina", "Blade Runner 2049", "The Matrix"],
      },
      {
        genre: "Thriller trí tuệ / Mystery",
        reason: "NT thích giải đố, pattern recognition, plot twist có logic",
        tag: "[P]",
        examples: ["Knives Out", "Gone Girl", "Parasite", "Inception", "The Prestige"],
      },
      {
        genre: "Documentary về hệ thống/xã hội/khoa học",
        reason: "NT muốn hiểu 'tại sao thế giới vận hành như vậy'",
        tag: "[P]",
        examples: ["The Social Dilemma", "13th", "Cosmos (series)", "Free Solo"],
      },
    ],
    books: [
      {
        genre: "Non-fiction hệ thống/tư duy",
        reason: "NT thích được cung cấp framework, mental models, cách nhìn mới",
        examples: ["Thinking Fast and Slow (Kahneman)", "The Great Mental Models (Parrish)", "Sapiens (Harari)", "Antifragile (Taleb)"],
      },
      {
        genre: "Khoa học viễn tưởng cứng (hard sci-fi)",
        reason: "NT thích khi khoa học là nền tảng của câu chuyện",
        examples: ["The Martian (Weir)", "Dune (Herbert)", "Foundation (Asimov)", "Recursion (Crouch)"],
      },
    ],
    hobbies: [
      { name: "Chess / cờ tướng", reason: "Chiến lược, pattern, tư duy nhiều bước", difficulty: "medium" },
      { name: "Coding side project", reason: "Giải quyết problem + tự tạo hệ thống", difficulty: "medium" },
      { name: "Debate / public speaking", reason: "Kiểm tra logic argument trong thực tế", difficulty: "hard" },
      { name: "Đọc sách non-fiction chuyên sâu", reason: "Core hobby — không cần explain", difficulty: "easy" },
      { name: "Chiến lược game (Civilization, StarCraft)", reason: "Tư duy hệ thống + cạnh tranh", difficulty: "easy" },
    ],
    expandSuggestion: "Thử nấu ăn theo công thức phức tạp (baking là chemistry) hoặc nhiếp ảnh đường phố — NT hay bỏ qua trải nghiệm cảm giác vật lý.",
  },
  NF: {
    group: "NF",
    psychProfile: "Ý nghĩa · cảm xúc · kết nối · sáng tạo · muốn thế giới tốt đẹp hơn",
    films: [
      {
        genre: "Drama cảm xúc sâu / Character study",
        reason: "NF muốn hiểu chiều sâu nội tâm nhân vật và hành trình cảm xúc",
        tag: "[P]",
        examples: ["Marriage Story", "Her", "Nomadland", "Boyhood", "Portrait of a Lady on Fire"],
      },
      {
        genre: "Fantasy / Thế giới khác có chiều sâu",
        reason: "NF thích thế giới có ý nghĩa, symbolism, and moral questions",
        tag: "[P]",
        examples: ["Spirited Away", "Everything Everywhere All at Once", "Princess Mononoke", "Pan's Labyrinth"],
      },
      {
        genre: "Phim VN nghệ thuật / Xã hội",
        reason: "NF kết nối với trải nghiệm văn hóa authentic",
        tag: "[P]",
        examples: ["Tro Tàn Rực Rỡ", "Mắt Biếc", "Đất Rừng Phương Nam", "Người Vợ Cuối Cùng"],
      },
    ],
    books: [
      {
        genre: "Literary fiction / Văn học cảm xúc",
        reason: "NF thích khám phá nội tâm nhân vật và trải nghiệm con người",
        examples: ["The Kite Runner (Hosseini)", "Normal People (Rooney)", "Tôi Thấy Hoa Vàng Trên Cỏ Xanh (NNH)", "Số Đỏ (VTP)"],
      },
      {
        genre: "Self-development / Psychology",
        reason: "NF muốn hiểu mình và người khác sâu hơn",
        examples: ["Daring Greatly (Brown)", "Man's Search for Meaning (Frankl)", "The Body Keeps the Score (van der Kolk)", "Attached (Levine)"],
      },
    ],
    hobbies: [
      { name: "Viết lách / journaling", reason: "Xử lý cảm xúc + express inner world", difficulty: "easy" },
      { name: "Vẽ / watercolor / sketch", reason: "Sáng tạo visual không cần perfect", difficulty: "easy" },
      { name: "Volunteer / charity work", reason: "Contribute to something meaningful", difficulty: "easy" },
      { name: "Nghe nhạc deep (acoustic, indie, classical)", reason: "Emotional processing qua âm nhạc", difficulty: "easy" },
      { name: "Đọc thơ / viết thơ", reason: "Ngôn ngữ cảm xúc cô đọng", difficulty: "medium" },
    ],
    expandSuggestion: "Thử debate / public speaking — NF hay giữ ý kiến bên trong. Hoặc thể thao nhóm cạnh tranh để trải nghiệm healthy competition.",
  },
  ST: {
    group: "ST",
    psychProfile: "Thực tế · hành động · kỹ năng cụ thể · tin vào kinh nghiệm thực",
    films: [
      {
        genre: "Action / Thriller có logic",
        reason: "ST thích action thật, competence porn (nhân vật giỏi thứ gì đó cụ thể)",
        tag: "[P]",
        examples: ["Heat", "John Wick", "The Accountant", "Mission Impossible series", "Drive"],
      },
      {
        genre: "Sport / Survival / True story",
        reason: "ST thích câu chuyện có real stakes, real skill, real achievement",
        tag: "[P]",
        examples: ["Sully", "127 Hours", "The Big Short", "Rush", "Ford v Ferrari"],
      },
      {
        genre: "Comedy đời thường / Sitcom",
        reason: "ST thích humor cụ thể, relatable — không cần sâu xa",
        tag: "[P]",
        examples: ["The Office", "Ozark", "Breaking Bad", "Mindhunter"],
      },
    ],
    books: [
      {
        genre: "How-to / Practical non-fiction",
        reason: "ST muốn knowledge có thể áp dụng ngay",
        examples: ["Atomic Habits (Clear)", "Deep Work (Newport)", "The 4-Hour Workweek (Ferriss)", "Bộ sách Đắc Nhân Tâm"],
      },
      {
        genre: "Biography / Memoir",
        reason: "ST học qua ví dụ thực tế, không lý thuyết",
        examples: ["Shoe Dog (Phil Knight)", "Elon Musk (Isaacson)", "Educated (Westover)", "Can't Hurt Me (Goggins)"],
      },
    ],
    hobbies: [
      { name: "Thể thao / gym / martial arts", reason: "Physical skill building với kết quả đo được", difficulty: "medium" },
      { name: "DIY / woodworking / sửa chữa nhà", reason: "Hands-on problem solving với kết quả thật", difficulty: "medium" },
      { name: "Cooking thực hành / BBQ", reason: "Craft với kết quả ăn được ngay", difficulty: "easy" },
      { name: "Cờ bạc chiến lược (poker, trading game)", reason: "Tư duy xác suất + decision making", difficulty: "medium" },
      { name: "Phượt / off-road / dã ngoại", reason: "Problem solving trong thực tế", difficulty: "medium" },
    ],
    expandSuggestion: "Thử học nhạc cụ (cần kiên nhẫn long-term không thấy kết quả ngay) hoặc thiền định — cả hai đều khó với ST nhưng rewarding.",
  },
  SF: {
    group: "SF",
    psychProfile: "Hài hòa · quan hệ · cảm giác thụ hưởng · cộng đồng · chăm sóc",
    films: [
      {
        genre: "Romance / Drama ấm áp",
        reason: "SF thích kết nối cảm xúc, love stories, warmth",
        tag: "[P]",
        examples: ["Crazy Rich Asians", "The Holiday", "About Time", "La La Land", "Mắt Biếc"],
      },
      {
        genre: "Family / coming-of-age",
        reason: "SF care về relationships và belonging",
        tag: "[P]",
        examples: ["Little Miss Sunshine", "Lady Bird", "Coco", "Soul", "Gia Đình Phép Thuật (Encanto)"],
      },
      {
        genre: "K-drama / Asian drama",
        reason: "SF thích emotional depth trong mối quan hệ hàng ngày",
        tag: "[P]",
        examples: ["Reply 1988", "Our Beloved Summer", "Crash Landing on You", "Hospital Playlist"],
      },
    ],
    books: [
      {
        genre: "Contemporary fiction / Romance",
        reason: "SF muốn relationship stories warm và relatable",
        examples: ["The Alchemist (Coelho)", "Me Before You (Moyes)", "Tôi Tài Giỏi Bạn Cũng Thế (Adam Khoo)", "Nhà Giả Kim VN edition"],
      },
      {
        genre: "Wellbeing / Self-care",
        reason: "SF chú ý đến cảm giác và sức khỏe của người xung quanh",
        examples: ["Set Boundaries Find Peace (Tawwab)", "The Body Is Not An Apology", "Hygge (Wiking)", "Ikigai"],
      },
    ],
    hobbies: [
      { name: "Nấu ăn / baking cho người thân", reason: "Acts of service + sensory pleasure", difficulty: "easy" },
      { name: "Yoga / pilates / dance", reason: "Body awareness + social class environment", difficulty: "easy" },
      { name: "Làm vườn / trồng cây", reason: "Chăm sóc, sensory, thấy kết quả lớn dần", difficulty: "easy" },
      { name: "Photography (người + lifestyle)", reason: "Capture moments + beauty in everyday life", difficulty: "easy" },
      { name: "Group travel / staycation cùng bạn bè", reason: "Experience + connection combo", difficulty: "easy" },
    ],
    expandSuggestion: "Thử solo travel một chuyến ngắn — SF hay cần có người đi cùng. Hoặc học một kỹ năng technical (code cơ bản, editing video) để build competence confidence.",
  },
}

// ============================================================
// PROMPT 3 — MBTI × SỨC KHỎE & VẬN ĐỘNG
// ============================================================
// Nguồn: Exercise personality research [P]; sports psychology [P];
//        sleep research Walker [P/S]; APA guidelines [R]

export const MBTI_HEALTH = {
  NT: {
    group: "NT",
    exercise: {
      preferredStyle: "Solo + measurable progress · intellectual challenge · data-driven",
      suitable: [
        { sport: "Running / cycling (with data)", reason: "Metrics, PRs, optimization mindset. App tracking = engagement loop", tag: "[P]" },
        { sport: "Rock climbing / bouldering", reason: "Problem-solving physical puzzle. Each route is a challenge to solve", tag: "[P]" },
        { sport: "Calisthenics / strength training", reason: "Progressive overload = systematic improvement with clear metrics", tag: "[P]" },
        { sport: "Chess boxing / martial arts", reason: "Physical + mental combined", tag: "[P]" },
      ],
      dropoutRisk: "NT hay bỏ khi boredom hits (plateau, routine). Cần thay đổi challenge liên tục. Cũng dễ over-intellectualize (đọc nhiều về workout theory, ít thực hành).",
      tag: "[P]",
    },
    sleep: {
      pattern: "Introvert NT: hay thức khuya, brain active at night. Khó shut down racing thoughts.",
      barriers: ["Racing thoughts về projects/problems", "Underestimate sleep cost ('tôi ổn với 6 tiếng')", "Screen time vì research/reading"],
      tips: [
        "Viết ra 'vấn đề đang nghĩ' trước ngủ để brain 'release' (Scullin 2018 [R])",
        "Set hard stop time — brain không tự dừng được",
        "Tránh problem-solving lúc 10pm+",
      ],
    },
    habitSuggestions: [
      "5-minute daily review (evening): 1 win today, 1 improvement tomorrow — matches NT need for self-assessment",
      "Weekly metrics log: track sleep, exercise, mood, productivity — NT giỏi khi có data",
    ],
  },
  NF: {
    group: "NF",
    exercise: {
      preferredStyle: "Meaningful environment · community hay solo · emotional regulation · not competitive",
      suitable: [
        { sport: "Yoga / tai chi / qigong", reason: "Mind-body connection, không cạnh tranh, meditative", tag: "[P]" },
        { sport: "Dance (contemporary, modern, freestyle)", reason: "Emotional expression through movement", tag: "[P]" },
        { sport: "Hiking in nature", reason: "Connection với thiên nhiên + solitude for reflection (I-NF) or community (E-NF)", tag: "[P]" },
        { sport: "Swimming", reason: "Meditative, sensory, solo", tag: "[P]" },
      ],
      dropoutRisk: "NF bỏ khi: môi trường toxic (người tập nói chuyện tiêu cực), không thấy meaningful, hoặc injured without psychological support. NF cần 'why' của việc tập.",
      tag: "[P]",
    },
    sleep: {
      pattern: "NF: absorb emotions from day → need time to process before sleep. Rumination risk.",
      barriers: ["Replay conversations / imagine future scenarios", "Absorb emotional content from social media before bed", "Worry about relationships"],
      tips: [
        "Journaling 10 phút trước ngủ: xả cảm xúc ngày ra giấy",
        "No emotionally charged content (news, drama) 1h trước ngủ",
        "Breathing exercise: 4-7-8 breathing giảm emotional arousal",
      ],
    },
    habitSuggestions: [
      "Morning intention setting: 'Hôm nay tôi muốn là ai?' — matches NF need for meaning",
      "Gratitude + connection check (evening): ai hôm nay đã ảnh hưởng tích cực đến mình",
    ],
  },
  ST: {
    group: "ST",
    exercise: {
      preferredStyle: "Physical challenge · skill progression · concrete results · competition OK",
      suitable: [
        { sport: "Gym / powerlifting / HIIT", reason: "Measurable strength gains. Short intense sessions match ST impatience with slow progress", tag: "[P]" },
        { sport: "Martial arts (Muay Thai, BJJ, boxing)", reason: "Technical skill + physical toughness. Concrete belt/rank progression", tag: "[P]" },
        { sport: "Team sports (football, basketball)", reason: "Competition, camaraderie, concrete score", tag: "[P]" },
        { sport: "Rock climbing / obstacle course", reason: "Physical problem-solving + achievement", tag: "[P]" },
      ],
      dropoutRisk: "ST dễ overtrain (push through pain signals) leading to injury. Cũng dễ bỏ khi kết quả không thấy nhanh. Cần technical progression milestones rõ ràng.",
      tag: "[P]",
    },
    sleep: {
      pattern: "ST: practical về sleep — tối thiểu đủ để function. Nhưng hay sacrifice sleep for productivity.",
      barriers: ["Feels like wasted time", "Work/tasks bleed into night", "Overthink recovery as 'lazy'"],
      tips: [
        "Frame sleep as performance optimization (Huberman [P/S]: sleep is non-negotiable for physical gains)",
        "Fixed wake time even weekends: circadian anchor",
        "No screens 30 min trước ngủ — substitute with light reading",
      ],
    },
    habitSuggestions: [
      "Morning cold exposure (30s cold shower): activates alertness, measurable habit [P Andrew Huberman]",
      "Weekly skill log: ghi lại 1 physical skill improvement → matches ST need for concrete progress",
    ],
  },
  SF: {
    group: "SF",
    exercise: {
      preferredStyle: "Social · enjoyable · sensory experience · community-based",
      suitable: [
        { sport: "Group fitness (Zumba, aerobics, dance class)", reason: "Social element + fun atmosphere = sustainable", tag: "[P]" },
        { sport: "Yoga với bạn bè", reason: "Social + calming + body awareness", tag: "[P]" },
        { sport: "Walking với partner / pet", reason: "Connection + movement combined", tag: "[P]" },
        { sport: "Team sports (recreational, không competitive)", reason: "Community without high-pressure", tag: "[P]" },
      ],
      dropoutRisk: "SF bỏ khi mất người tập cùng (social anchor gone). Cũng dễ bỏ nếu environment unfriendly hoặc body-shaming.",
      tag: "[P]",
    },
    sleep: {
      pattern: "SF: often prioritize others' needs before own sleep. E-SF: social activities late night. Comfort-seeking before bed (phone, snacking).",
      barriers: ["Social events late night", "Caretaking others until late", "Emotional eating before bed disrupts sleep quality"],
      tips: [
        "Wind-down ritual: 30 phút 'me time' trước ngủ — không phải serve người khác",
        "Comfortable sleep environment: đầu tư vào đệm/gối vì SF responds to sensory comfort",
        "Herbal tea / calming sensory ritual to signal bed time",
      ],
    },
    habitSuggestions: [
      "Morning self-care ritual (10 phút): ưu tiên cho chính mình trước khi lo cho người khác — SF hay skip this",
      "Weekly community connection: confirm 1 meaningful social event/week scheduled",
    ],
  },
}

// ============================================================
// PROMPT 4 — DU LỊCH THEO TYPE
// ============================================================
// [P] practitioner + travel data [S]; VN-specific [P]

export const MBTI_TRAVEL = {
  NT: {
    group: "NT",
    travelStyle: "Researcher trước khi đi · có plan nhưng thích flexibility · solo ok · optimization mindset",
    destinations_VN: [
      { place: "Hà Nội (phố cổ + café)", reason: "Dense history, architecture, intellectual cafe culture", tag: "[P]" },
      { place: "Ninh Bình", reason: "Landscape complex, geology interesting, less touristy", tag: "[P]" },
      { place: "Đà Lạt", reason: "French colonial architecture, diverse microclimate, book cafe", tag: "[P]" },
      { place: "Hội An (off-peak)", reason: "Living museum, cultural depth, photography", tag: "[P]" },
      { place: "Phong Nha-Kẻ Bàng", reason: "World record caves, unique geology, adventure", tag: "[P]" },
    ],
    destinations_intl: [
      { place: "Tokyo", reason: "Ultra-efficient systems, depth in every district, subcultures to explore" },
      { place: "Singapore", reason: "City-state experiment, architecture, multicultural systems" },
      { place: "Seoul", reason: "Rapid modernization study, tech-forward, contrasts old-new" },
      { place: "Kuala Lumpur", reason: "Multi-ethnic urban experiment, affordable base for exploration" },
    ],
    tips: "Research destination's systems (transportation, food economy) before. Set 2-3 'must-do' max, leave rest for discovery. Avoid over-scheduling — serendipity is data too.",
    checklist: ["Research top 5 neighborhoods", "Download offline maps", "Identify quiet time for museums (weekdays)", "Have backup options researched"],
    bayPhooBienVN: [
      "Taxi mét không chạy đúng — dùng Grab/Be",
      "Quà lưu niệm phía ngoài điểm du lịch rẻ hơn trong nhiều lần",
      "Giá niêm yết ở một số nơi không cố định — có thể mặc cả nhẹ nhàng",
    ],
  },
  NF: {
    group: "NF",
    travelStyle: "Authentic experience · local culture · avoid tourist trap · meaningful stories · solo or small trusted group",
    destinations_VN: [
      { place: "Hội An (stay local homestay)", reason: "Living culture, art, craft workshops, people stories", tag: "[P]" },
      { place: "Mộc Châu + bản người Mông", reason: "Authentic community life, different worldview", tag: "[P]" },
      { place: "Phú Quốc (Bắc đảo)", reason: "Nature, simplicity, less commercial north end", tag: "[P]" },
      { place: "Huế", reason: "Deep history, poetry culture, Buddhist temples, royal cuisine", tag: "[P]" },
      { place: "Cà Mau / rừng U Minh", reason: "Remote, unique ecosystem, local life undiscovered", tag: "[P]" },
    ],
    destinations_intl: [
      { place: "Kyoto (không phải Tokyo)", reason: "Temple culture, wabi-sabi, seasonal rituals" },
      { place: "Bali (Ubud, không phải Kuta)", reason: "Art, spirituality, rice terraces, community" },
      { place: "Chiang Mai", reason: "Temple town, ethical elephant sanctuaries, craft culture" },
      { place: "Hội An quốc tế: Hoi An vibes → Luang Prabang (Lào)", reason: "Authentic Buddhist town, slow pace, heritage" },
    ],
    tips: "Talk to locals more than visit sites. Ask 'what do people here actually do?' Slow travel > checklist travel. Look up ethical tourism before booking.",
    checklist: ["Research local culture norms before (dress code, customs)", "Find locally-owned accommodations", "Learn 5 local phrases", "Plan 1 community/volunteer experience"],
    bayPhooBienVN: [
      "Tour du lịch ép mua đặc sản tại điểm ghé — có quyền từ chối",
      "Homestay quảng cáo truyền thống nhưng Airbnb hóa — hỏi trước về gia chủ thật",
    ],
  },
  ST: {
    group: "ST",
    travelStyle: "Adventure · physical challenge · hands-on experience · minimal fuss",
    destinations_VN: [
      { place: "Sapa + Fansipan", reason: "Trekking, highest peak VN, physical challenge", tag: "[P]" },
      { place: "Phong Nha (cave tours)", reason: "Underground adventure, kayaking, rappelling", tag: "[P]" },
      { place: "Đà Nẵng (Bà Nà + bãi biển)", reason: "Active options: surfing, paragliding, hiking", tag: "[P]" },
      { place: "Mường Nhé / Lai Châu (off-road)", reason: "Remote, physical, real challenge", tag: "[P]" },
      { place: "Côn Đảo", reason: "Diving, snorkeling, remote island feel", tag: "[P]" },
    ],
    destinations_intl: [
      { place: "Chiang Mai (Muay Thai camp)", reason: "Train Muay Thai for real, physical immersion" },
      { place: "Phuket / Krabi (rock climbing)", reason: "World-class limestone climbing, diving" },
      { place: "South Korea (winter skiing)", reason: "Physical activity + accessible" },
      { place: "Philippines (Palawan diving)", reason: "World-class underwater adventure" },
    ],
    tips: "Book activity-first, accommodation second. Over-pack gear, under-pack clothes. Build in recovery day after intense activity days.",
    checklist: ["Check gear requirements", "Physical fitness prerequisite for activities", "Travel insurance với adventure sports coverage", "Download offline trail maps"],
    bayPhooBienVN: [
      "Tour trekking giá rẻ thường không có guide đủ năng lực — check reviews kỹ",
      "Thuê xe máy ở tỉnh: kiểm tra kỹ xe trước khi thuê, chụp ảnh hết vết trầy",
    ],
  },
  SF: {
    group: "SF",
    travelStyle: "Food-first · community experience · comfort matters · travel with people · local markets",
    destinations_VN: [
      { place: "Sài Gòn (ẩm thực + chợ)", reason: "Food scene unmatched, street food culture, always with people", tag: "[P]" },
      { place: "Hội An (cooking class + market)", reason: "Food tours, cooking class, beautiful setting, warm people", tag: "[P]" },
      { place: "Đà Lạt (strawberry farm + chợ đêm)", reason: "Cozy climate, food experiences, Instagram-worthy", tag: "[P]" },
      { place: "Cần Thơ + chợ nổi", reason: "River life, local food market, family-friendly", tag: "[P]" },
      { place: "Phú Quốc (resort + ẩm thực)", reason: "Comfort + beautiful + great seafood", tag: "[P]" },
    ],
    destinations_intl: [
      { place: "Bangkok", reason: "Street food paradise, night market, affordable luxury, friendly" },
      { place: "Osaka", reason: "World capital of food, warm people (dotonbori culture)" },
      { place: "Penang", reason: "UNESCO food heritage, multicultural community, beaches" },
      { place: "Bali (Seminyak / Canggu)", reason: "Beautiful cafes, beach clubs, yoga, friendly community" },
    ],
    tips: "Plan meals first, sights second. Book group tours for connection. Invest in 1 nice experience per trip (good restaurant, spa). Bring snacks.",
    checklist: ["Research top 5 local restaurants/street food spots", "Confirm who's coming — SF needs travel companions confirmed", "Book group tour/activity for social aspect", "Pack light but bring comfort items"],
    bayPhooBienVN: [
      "Restaurant phố du lịch tính phí phục vụ cao — kiểm tra bill",
      "Quán ăn local hẻm nhỏ thường ngon và rẻ hơn mặt tiền",
    ],
  },
}

// ============================================================
// PROMPT 5 — NHU CẦU CON NGƯỜI — RESEARCH TỔNG HỢP
// ============================================================

export const WELLBEING_RESEARCH = {
  needModels: [
    {
      model: "Self-Determination Theory (SDT)",
      authors: "Deci & Ryan (1985, ongoing)",
      tag: "[R]",
      coreClaims: "3 basic psychological needs: Autonomy (feeling volitional control), Competence (feeling effective), Relatedness (feeling connected). All 3 needed for wellbeing and intrinsic motivation.",
      evidence: "Hundreds of peer-reviewed studies across cultures, ages, domains [R]. Cross-cultural replication strong.",
      mobileFit: "HIGHEST for app — PA can check: 'Hôm nay bạn cảm thấy tự chủ / có năng lực / kết nối không?'",
      limitation: "Culture modifies expression (autonomy expressed differently in collectivist VN)",
    },
    {
      model: "PERMA (Seligman)",
      authors: "Seligman 2011 — 'Flourish'",
      tag: "[P]",
      coreClaims: "Positive emotions · Engagement · Relationships · Meaning · Achievement",
      evidence: "Well-validated framework [P]; less RCT than SDT. Used widely in positive psychology applications.",
      mobileFit: "HIGH — each dimension maps to content area. Good for daily check-in framework.",
      limitation: "Achievement element controversial — some argue it encourages hustle culture misuse",
    },
    {
      model: "Maslow Hierarchy (updated)",
      authors: "Maslow 1943; Kenrick et al. 2010 update",
      tag: "[P]",
      coreClaims: "Updated: survival → security → belongingness → esteem → mate acquisition → mate retention → parenting → self-actualization (non-linear, not strict hierarchy).",
      evidence: "Original 1943 = largely theoretical, limited direct evidence [P]. Updated evolutionary version has more backing.",
      mobileFit: "MEDIUM for app — too abstract for daily use. Better as background framework.",
      limitation: "Self-actualization hard to operationalize. Not cross-culturally consistent.",
    },
  ],

  dailyWellbeingHabits: [
    {
      habit: "Meaningful social connection (not passive scrolling)",
      impact: "Loneliness = same health risk as smoking 15 cigarettes/day (Cacioppo 2008) [R]",
      often_ignored: true,
    },
    {
      habit: "Physical movement (150 min/week minimum)",
      impact: "Cochrane 2023 (N=5000+): equivalent to antidepressants for mild-moderate depression [R]",
      often_ignored: false,
    },
    {
      habit: "7-9 hours sleep",
      impact: "Walker [P/S]: memory, emotional processing, immune function all severely impacted under 6h",
      often_ignored: true,
    },
    {
      habit: "Time in nature (20-30 min)",
      impact: "Cortisol reduction measurable after 20 min (Frontiers 2023) [R]",
      often_ignored: true,
    },
    {
      habit: "Acts of kindness / contribution",
      impact: "Dunn et al. 2008 [R]: prosocial spending increases wellbeing more than self-spending",
      often_ignored: false,
    },
    {
      habit: "Autonomy in at least 1 domain",
      impact: "SDT: autonomy satisfaction → wellbeing even in constrained contexts [R]",
      often_ignored: true,
    },
  ],

  vnContext: {
    stressSources: [
      { source: "Áp lực công việc / tài chính", prevalence: "Cao — nhất là người 25-35", tag: "[S — báo chí + survey VN]" },
      { source: "Áp lực hôn nhân / gia đình", prevalence: "Cao — AFP filial piety [R]", tag: "[R — DFPM research]" },
      { source: "So sánh xã hội (mạng xã hội + gia đình)", prevalence: "Rất cao — GenZ VN", tag: "[P]" },
      { source: "Thiếu thông tin pháp lý / tài chính", prevalence: "Cao — civic literacy thấp", tag: "[P — gap observed]" },
    ],
    infoGaps: [
      "Pháp luật đời sống cơ bản (quyền người lao động, giao thông) — thiếu nguồn accessible",
      "Quản lý tài chính cá nhân — education gap lớn",
      "Sức khỏe tâm thần — stigma cao, ít seek help",
      "Kỹ năng giao tiếp / relationship health",
    ],
    infoSources: {
      common: "Facebook / TikTok / YouTube (không verify quality)",
      better: "Báo chính thống (VnExpress, Tuổi Trẻ), các trang pháp lý có tên (thuvienphapluat.vn), APA VN chapter",
    },
    modelRecommendation:
      "Cho app mobile VN 2025: SDT là phù hợp nhất (autonomy/competence/relatedness map tốt vào PA features). PERMA để structure daily prompts. Maslow là background context.",
  },
}

/*
 * THỐNG KÊ OUTPUT:
 *
 * Prompt 1 — Pháp luật:
 *   Nhóm 1 (Giao thông): 5 tình huống
 *   Nhóm 2 (Lao động): 5 tình huống
 *   Nhóm 3 (An toàn cá nhân): 3 tình huống
 *   → Tổng: 13 tình huống với đầy đủ điều luật verify
 *   Nguồn: Luật 2024/2025 mới nhất (ATGT, NĐ168, TT73, BLLĐ2019, BLHS2015)
 *
 * Prompt 2 — MBTI × Giải trí:
 *   4 nhóm × (films + books + hobbies + expand): đầy đủ
 *   → VN films included (Tro Tàn Rực Rỡ, Mắt Biếc, Đất Rừng Phương Nam)
 *   → Available VN hoặc Netflix verified
 *
 * Prompt 3 — MBTI × Sức khỏe:
 *   4 nhóm × (exercise + dropout risk + sleep + habits): đầy đủ
 *   → Research backed: Cochrane 2023, Walker, SDT, circadian research
 *
 * Prompt 4 — Du lịch theo type:
 *   4 nhóm × (destinations VN + intl + tips + checklist): đầy đủ
 *   → 5 điểm VN + 4 điểm quốc tế mỗi nhóm
 *   → Bẫy du lịch phổ biến VN (generic + group-specific)
 *
 * Prompt 5 — Wellbeing research:
 *   3 models so sánh: SDT [R] > PERMA [P] > Maslow [P]
 *   6 habits peer-reviewed
 *   VN context: stress sources + info gaps + recommendation
 *
 * GAPS:
 *   - VN norms cho pháp luật: một số mức phạt cụ thể có thể thay đổi → disclaimer quan trọng
 *   - MBTI × specific entertainment: không có RCT — tất cả [P]
 *   - VN wellbeing research: thiếu domestic studies, dùng proxy
 */