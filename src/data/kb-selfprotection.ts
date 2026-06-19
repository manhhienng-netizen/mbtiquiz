/**
 * KB — Bảo Vệ Bản Thân & Phát Hiện Nguy Hiểm
 * Tạo: 02/06/2026
 * Nguồn: kb-selfprotection-02062026.md
 * Tổng: 28 entry (safe-01 → safe-18 + safe-work-01 → safe-work-09)
 * 5 domain: situational_awareness · everyday_safety · digital_safety · manipulation · response
 * Tinh thần: NHẬN BIẾT → PHÒNG NGỪA → THOÁT → TÌM TRỢ GIÚP
 *
 * ⚠️ PROTECTIVE entries: không validate ở lại nguy hiểm.
 * Hotlines VN: 113 (CA), 115 (cấp cứu), 111 (trẻ em) — DV: liên hệ 113 hoặc cơ sở y tế gần nhất
 */

export type KBZone = "GU" | "PROTECTIVE"
export type KBLevel =
  | "Research"
  | "Book"
  | "Official"
  | "Inference"

export interface KBEntry {
  id: string
  name: string
  triggers: string[]
  zone: KBZone
  content: string
  why: string
  level: KBLevel
  trait?: string
  domain: string
  /** Phân nhóm trong KB selfprotection — vd. workplace (Hiểu Sếp) */
  subDomain?: string
}

export const KB_SELFPROTECTION: KBEntry[] = [

  // ─── DOMAIN A: NHẬN THỨC TÌNH HUỐNG ──────────────────────────

  {
    id: "safe-01",
    name: "Trực giác là tín hiệu thật",
    triggers: [
      "có linh cảm gì đó sai mà không giải thích được",
      "cảm giác không an toàn có nên tin không",
      "trực giác có đáng tin không",
    ],
    zone: "GU",
    content:
      "Nếu bạn có cảm giác \"có gì đó sai\" mà không giải thích được — đừng bỏ qua. Không phải mê tín: não bạn đang xử lý hàng nghìn tín hiệu nhỏ từ môi trường mà ý thức chưa kịp tổng hợp. Lo âu thông thường là tưởng tượng về tương lai; cảm giác nguy hiểm thật là phản ứng với thứ gì đó đang xảy ra ngay lúc này. Hai cái này khác nhau — và bạn thường phân biệt được nếu chú ý.",
    why: "Gavin de Becker \"The Gift of Fear\" (1997) — nghiên cứu về cách trực giác hoạt động như hệ thống cảnh báo sớm thực sự, không phải lo âu vô căn cứ.",
    level: "Book",
    domain: "situational_awareness",
  },
  {
    id: "safe-02",
    name: "7 dấu hiệu của kẻ có ý đồ xấu",
    triggers: [
      "nhận biết người nguy hiểm",
      "dấu hiệu người đang tiếp cận mình có ý đồ xấu",
      "cảm thấy người lạ có gì đó lạ",
    ],
    zone: "GU",
    content:
      "Bảy tín hiệu cần chú ý khi người lạ tiếp cận: (1) Tự nhiên dùng \"chúng ta/cả hai mình\" như thể đã quen — tạo kết nối giả nhanh. (2) Quá dễ thương, quá nhiệt tình không có lý do rõ ràng. (3) Tự giải thích nhiều chi tiết không cần thiết — người không có ý đồ xấu không cần chứng minh mình vô hại. (4) Nhẹ nhàng xúc phạm để bạn chứng minh ngược lại. (5) Giúp đỡ hoặc cho thứ gì đó bạn không xin — tạo cảm giác nợ ơn. (6) Tiếp tục sau khi bạn đã từ chối, thương lượng chữ \"không\" của bạn. (7) Hứa những điều không ai yêu cầu — \"tôi thề sẽ không làm gì đâu.\" Nhận ra một vài tín hiệu này không phải lý do để hoảng loạn — là lý do để chú ý thêm.",
    why: "Gavin de Becker \"The Gift of Fear\" (1997) — bảy survival signals được tổng hợp từ nghiên cứu về hành vi của người gây hại.",
    level: "Book",
    domain: "situational_awareness",
  },
  {
    id: "safe-03",
    name: "Mức độ cảnh giác Cooper",
    triggers: [
      "cảnh giác ở nơi công cộng thế nào",
      "bao nhiêu là đủ khi đi một mình",
      "hoang tưởng nhẹ hay quá lo hay cẩn thận",
    ],
    zone: "GU",
    content:
      "Bốn mức cảnh giác: Trắng — không nhận thức môi trường (cắm mặt điện thoại, tai nghe hai bên) — không nên duy trì ở nơi lạ. Vàng — nhận thức môi trường nhẹ nhàng, không căng thẳng — trạng thái lý tưởng khi đi lại. Cam — chú ý dấu hiệu cụ thể đang làm bạn nghi ngờ — chuẩn bị hành động nếu cần. Đỏ — nguy hiểm đang xảy ra — rời đi, gọi 113, tìm nơi đông người. Cảnh giác tốt không phải luôn căng thẳng — là ở mức Vàng hầu hết thời gian.",
    why: "Jeff Cooper Color Code — tiêu chuẩn được dạy rộng rãi trong huấn luyện an toàn cá nhân.",
    level: "Official",
    domain: "situational_awareness",
  },
  {
    id: "safe-04",
    name: "Chọn vị trí và nhận biết lối thoát",
    triggers: [
      "ngồi đâu ở quán cà phê an toàn hơn",
      "để ý gì khi vào chỗ mới",
      "bị theo thì làm gì",
    ],
    zone: "GU",
    content:
      "Khi vào nơi mới — quán, tòa nhà, sự kiện — nhìn lối ra trước. Mất 3 giây, không cần quá lo. Ưu tiên ngồi lưng vào tường để quan sát được phần lớn không gian. Tránh góc khuất không có đường thoát rõ. Nếu nghi ngờ có người bám theo khi đi bộ: rẽ bốn lần liên tiếp (tạo hình vuông) — nếu họ vẫn đi cùng hướng, vào nơi đông người, không về thẳng nhà.",
    why: "Situational awareness principles từ de Becker và training an toàn — nhận biết lối thoát trước là thói quen nhỏ, lợi ích lớn trong tình huống khẩn cấp.",
    level: "Book",
    domain: "situational_awareness",
  },

  // ─── DOMAIN B: AN TOÀN ĐỜI THƯỜNG ────────────────────────────

  {
    id: "safe-05",
    name: "An toàn khi đi Grab/taxi",
    triggers: [
      "đi grab đêm có an toàn không",
      "làm gì khi lên taxi một mình",
      "cẩn thận gì khi đi xe ôm công nghệ",
    ],
    zone: "GU",
    content:
      "Trước khi lên xe: xác nhận biển số và mặt tài xế khớp với app — hỏi \"Anh đón tên [tên bạn] phải không?\" để tài xế xác nhận chủ động. Gửi thông tin xe và tài xế cho ít nhất một người trước khi lên, hoặc dùng tính năng chia sẻ hành trình. Luôn ngồi ghế sau. Ban đêm, không ngủ và để ý hướng đi. Nếu không an tâm, gọi điện cho ai đó và đọc to địa điểm đang đi — tài xế biết có người theo dõi hành trình.",
    why: "Grab/Be safety guidelines và nguyên tắc an toàn cá nhân khi sử dụng phương tiện với người lạ.",
    level: "Official",
    domain: "everyday_safety",
  },
  {
    id: "safe-06",
    name: "Nhờ nhân viên quầy bar/khách sạn hỗ trợ thoát tình huống nguy hiểm",
    triggers: [
      "bar",
      "quán bar",
      "khách sạn",
      "nhà hàng",
      "bị theo",
      "không an toàn",
      "cần thoát",
      "nhân viên",
      "lễ tân",
    ],
    zone: "GU",
    content:
      "Khi bạn ở bar, nhà hàng hoặc khách sạn và cảm thấy không an toàn — bị theo dõi, bị ép ở lại, hoặc không muốn người đi cùng biết bạn đang cầu cứu — có thể nhờ nhân viên quầy một cách kín đáo. Đến quầy bar hoặc lễ tân, nói riêng (không to) rằng bạn cần được hỗ trợ rời khỏi tình huống. Tại nhiều quán bar, café và khách sạn tham gia chương trình quốc tế, nhân viên được huấn luyện nhận ra tín hiệu này và xử lý im lặng: đồng hành bạn ra cửa, gọi taxi, hoặc tách bạn khỏi người gây áp lực — không cần bạn giải thích dài hay gây chú ý. Cơ chế này phổ biến ở các quốc gia phương Tây và đang được một số chuỗi quán, khách sạn tại Việt Nam áp dụng dần. Biết trước để dùng khi cần — không phải lúc nào cũng có, nên vẫn nên có phương án dự phòng như gọi bạn bè hoặc tự rời đi khi có thể.",
    why: "Cơ chế cầu cứu kín đáo qua nhân viên — hiệu quả khi không thể gọi điện hay cầu cứu công khai.",
    level: "Official",
    domain: "everyday_safety",
  },
  {
    id: "safe-06b",
    name: "An toàn khi gặp người quen online lần đầu",
    triggers: [
      "hẹn hò online",
      "gặp lần đầu",
      "người quen mạng",
      "app hẹn hò",
      "tinder",
      "bumble",
      "first date",
      "gặp ngoài đời",
      "người mới",
      "người quen online",
      "gặp người online",
      "quen online",
      "hẹn gặp lần đầu",
    ],
    zone: "GU",
    content:
      "Khi lần đầu gặp ngoài đời thực với người quen qua app hẹn hò hoặc mạng xã hội, vài thói quen giúp bạn chủ động hơn: chọn địa điểm công cộng đông người (quán café, trung tâm thương mại), báo trước cho ít nhất một người bạn thân — giờ, địa điểm, và tên/ảnh người bạn đang gặp. Chia sẻ vị trí theo thời gian thực với bạn bè qua Zalo/Maps trong buổi đó. Tự đi và tự về bằng phương tiện của mình hoặc gọi xe — không để người mới đón hoặc đưa về lần đầu. Nếu trong buổi gặp có điều gì không ổn, bạn có quyền rời đi bất cứ lúc nào mà không cần giải thích.",
    why: "Hướng dẫn an toàn hẹn hò được nhiều tổ chức và chuyên gia khuyến nghị rộng rãi.",
    level: "Official",
    domain: "everyday_safety",
  },
  {
    id: "safe-07",
    name: "Về khuya / Đi bộ một mình",
    triggers: [
      "về khuya một mình có an toàn không",
      "cẩn thận gì khi đi bộ đêm",
      "làm gì để an toàn hơn khi ra đường tối",
    ],
    zone: "GU",
    content:
      "Giữ tay rảnh — không cầm điện thoại hoặc đeo tai nghe cả hai tai — để có thể phản ứng nhanh nếu cần. Ưu tiên đường chính sáng và đông người, dù xa hơn một chút so với đường tắt tối. Không cắm mặt điện thoại khi đi bộ — nhìn xung quanh thường xuyên. Đi thẳng lưng, nhịp đều, đầu không cúi — nghiên cứu cho thấy kẻ xấu thường nhắm vào người có dáng đi không chắc chắn.",
    why: "Grayson & Stein (1981) nghiên cứu về đặc điểm nạn nhân bị nhắm; safety training consensus về awareness khi đi bộ.",
    level: "Research",
    domain: "everyday_safety",
  },

  // ─── DOMAIN C: AN TOÀN SỐ / LỪA ĐẢO ONLINE ──────────────────

  {
    id: "safe-08",
    name: "Nhận biết các loại lừa đảo phổ biến VN",
    triggers: [
      "làm sao biết bị lừa đảo",
      "dấu hiệu lừa đảo",
      "các loại lừa đảo phổ biến hiện nay",
    ],
    zone: "PROTECTIVE",
    content:
      "Sáu loại lừa đảo phổ biến nhất hiện nay tại Việt Nam: (1) Mạo danh công an/viện kiểm sát — gọi điện dọa liên quan án phạm, yêu cầu chuyển tiền \"tạm giữ.\" Cơ quan tố tụng không làm việc qua điện thoại hay Zalo và không yêu cầu chuyển tiền — mọi cuộc gọi kiểu này là 100% lừa đảo. (2) Lừa tình — giả quân nhân hoặc kỹ sư nước ngoài, xây dựng tình cảm dài hạn rồi nhờ nhận quà hoặc đóng phí hải quan. (3) Lừa đầu tư crypto — cho thắng nhỏ ban đầu rồi yêu cầu nạp lớn, sau đó sập sàn. (4) Giả ngân hàng gửi link lấy OTP. (5) Việc làm online lương cao yêu cầu nạp tiền trước để nhận task. (6) Hack tài khoản mạo danh bạn bè xin tiền khẩn cấp — gọi điện xác minh trực tiếp trước khi chuyển bất kỳ đồng nào.",
    why: "Bộ Công an VN, bocongan.gov.vn, tuoitre.vn — cảnh báo chính thức từ cơ quan nhà nước.",
    level: "Official",
    domain: "digital_safety",
  },
  {
    id: "safe-09",
    name: "Quy tắc vàng chống lừa đảo",
    triggers: [
      "làm sao không bị lừa đảo",
      "quy tắc an toàn khi giao dịch online",
      "phòng tránh lừa đảo mạng",
    ],
    zone: "PROTECTIVE",
    content:
      "Năm quy tắc không có ngoại lệ: (1) Không bao giờ cho OTP — không ai có quyền hợp lệ yêu cầu OTP của bạn, kể cả nhân viên ngân hàng thật. (2) Áp lực thời gian cộng với yêu cầu bí mật là tín hiệu nguy hiểm — kẻ lừa đảo luôn tạo cảm giác gấp và cần giữ bí mật. (3) Khi nhận cuộc gọi đáng ngờ từ \"ngân hàng\" hay \"cơ quan nhà nước\" — cúp máy, gọi lại số hotline chính thức, không gọi lại số vừa gọi cho bạn. (4) Không click link lạ — vào thẳng app hoặc gõ URL tay. (5) Không có đầu tư hợp pháp nào cam kết 20-50% mỗi tháng.",
    why: "Ngân hàng Nhà nước VN, Bộ Công an — hướng dẫn chính thức phòng chống lừa đảo.",
    level: "Official",
    domain: "digital_safety",
  },
  {
    id: "safe-10",
    name: "Tống tiền bằng ảnh nhạy cảm",
    triggers: [
      "bị đe dọa đăng ảnh nhạy cảm",
      "bị tống tiền bằng ảnh",
      "bị tống tiền bằng ảnh nhạy cảm phải làm gì",
    ],
    zone: "PROTECTIVE",
    content:
      "Nếu bạn đang đối mặt với tình huống này: không trả tiền — trả tiền không giải quyết vấn đề, người tống tiền sẽ tiếp tục đòi thêm. Chụp màn hình tất cả tin nhắn và yêu cầu trước khi làm bất cứ thứ gì khác — đây là bằng chứng. Sau khi lưu xong, chặn trên tất cả nền tảng và không tiếp tục đối thoại. Báo công an: 113 hoặc đến trực tiếp. Nếu kẻ xấu đã nhắn tin cho người trong danh sách bạn bè của bạn, thông báo cho họ biết để không bị lừa. Đây là tội của người làm sai — không phải lỗi của bạn.",
    why: "FBI sextortion guide; NCMEC data cho thấy 92% nạn nhân trả tiền tiếp tục bị đòi thêm; Bộ Công an VN hướng dẫn.",
    level: "Official",
    domain: "digital_safety",
  },
  {
    id: "safe-11",
    name: "Vệ sinh riêng tư số cơ bản",
    triggers: [
      "bảo vệ tài khoản mạng xã hội",
      "làm sao để không bị hack",
      "riêng tư trực tuyến cơ bản",
    ],
    zone: "GU",
    content:
      "Bốn việc cần làm: (1) Bật xác thực 2 bước (2FA) cho email và tài khoản ngân hàng ngay — ngay cả khi mật khẩu bị lộ, tài khoản vẫn an toàn hơn. (2) Dùng mật khẩu khác nhau cho mỗi app — một chỗ bị lộ không kéo theo tất cả. (3) Kiểm tra định kỳ app nào đang truy cập camera, mic, vị trí của bạn — xóa app lạ có quyền nhạy cảm. (4) Không đăng chi tiết lịch trình lên mạng — \"tôi sẽ vắng nhà từ thứ 2 đến thứ 6\" là thông tin có thể bị lợi dụng.",
    why: "Cybersecurity best practice consensus; NCA VN hướng dẫn bảo mật cá nhân.",
    level: "Official",
    domain: "digital_safety",
  },

  // ─── DOMAIN D: NHẬN DIỆN THAO TÚNG ───────────────────────────

  {
    id: "safe-12",
    name: "Dấu hiệu cảnh báo trong quan hệ",
    triggers: [
      "dấu hiệu người yêu không tốt",
      "dấu hiệu cảnh báo trong quan hệ là gì",
      "làm sao biết mình đang bị thao túng",
    ],
    zone: "GU",
    content:
      "Năm dấu hiệu sớm đáng chú ý: (1) Dội bom tình cảm — quà, lời khen, sự chú ý quá mức, quá sớm trong thời gian ngắn. Quan tâm thật thì đều đặn; dội bom tình cảm tạo áp lực và cảm giác phụ thuộc nhanh. (2) Cô lập dần — \"họ không tốt với em,\" \"ở bên anh là đủ rồi\" — muốn tách bạn khỏi mạng lưới hỗ trợ. (3) Thao túng tâm lý (phủ nhận thực tế) — liên tục khiến bạn nghi ngờ trí nhớ và cảm nhận của mình. (4) Kiểm soát tài chính, thời gian, điện thoại, quần áo, người bạn gặp. (5) Không bao giờ nhận trách nhiệm — luôn là nạn nhân, luôn đổi tội cho người kia.",
    why: "Coercive control research (Australian AG dept, sefton.gov.uk); Jennifer Freyd psychology research; attachment research.",
    level: "Research",
    trait: "Anxious attachment (dễ bị love bombing hơn)",
    domain: "manipulation",
  },
  {
    id: "safe-13",
    name: "Chiến thuật thao túng cần nhận ra",
    triggers: [
      "người kia có đang thao túng mình không",
      "gây tội lỗi là gì",
      "cho đủ chú ý nhưng không cam kết trong quan hệ",
    ],
    zone: "GU",
    content:
      "Bốn chiến thuật phổ biến: (1) Gây tội lỗi — \"sau tất cả những gì tao làm cho mày,\" tạo cảm giác tội lỗi để điều khiển hành vi của bạn. (2) Cho đủ chú ý nhưng không cam kết — cho đủ chú ý để bạn tiếp tục quan tâm, nhưng không đủ để có cam kết thật — giữ lựa chọn mở mà không đầu tư thật. (3) Im lặng trừng phạt có chủ đích — im lặng như vũ khí trừng phạt, không phải vì cần không gian mà để tạo lo âu và khiến bạn \"bù đắp.\" (4) Khen thưởng và trừng phạt xen kẽ không dự đoán được — cùng cơ chế tâm lý như cờ bạc, tạo ra sự phụ thuộc mạnh.",
    why: "Behavioral psychology research; attachment and dating psychology research.",
    level: "Research",
    trait: "Anxious attachment",
    domain: "manipulation",
  },
  {
    id: "safe-14",
    name: "Khi cần thoát và nguồn hỗ trợ",
    triggers: [
      "bị bạo hành phải làm gì",
      "sợ người yêu phải tìm đến đâu",
      "thoát khỏi quan hệ bạo lực",
    ],
    zone: "PROTECTIVE",
    content:
      "Nếu bạn đang trong tình huống sợ phản ứng của đối phương khi không đồng ý, hoặc đã có đe dọa hoặc bạo lực thể chất — bạn không phải xử lý điều này một mình. Có đường dây bạo lực gia đình và cấp cứu đã được xác minh tại VN (app sẽ gợi ý số cụ thể). CSAGA: csaga.org.vn. Các tổ chức này có thể hỗ trợ lên kế hoạch thoát an toàn.",
    why: "CSAGA, Hội LHPNVN (Nhà Bình Yên Hà Nội) — tổ chức hỗ trợ đã xác thực tại VN.",
    level: "Official",
    domain: "manipulation",
  },

  // ─── DOMAIN E: ỨNG PHÓ & RANH GIỚI ──────────────────────────

  {
    id: "safe-15",
    name: "Hạ nhiệt bằng lời nói",
    triggers: [
      "tình huống căng thẳng với người lạ phải làm gì",
      "xung đột leo thang cách xử lý",
      "cách bình tĩnh tình huống đang căng",
    ],
    zone: "GU",
    content:
      "Khi xung đột đang leo thang: giữ giọng thấp và chậm — giọng cao làm căng thẳng leo thang ở cả hai phía. Gọi tên người kia nếu biết — kết nối cơ bản giúp hạ nhiệt. Cho người kia lối thoát mặt — câu \"chắc có hiểu nhầm gì đó, mình nói chuyện bình thường được không?\" cho phép họ lùi mà không mất thể diện. Đừng tranh luận ai đúng ai sai trong khoảnh khắc căng thẳng — mục tiêu là thoát an toàn, không phải thắng. Thoát được là chiến thắng.",
    why: "Crisis intervention research; de-escalation training; conflict resolution psychology.",
    level: "Research",
    domain: "response",
  },
  {
    id: "safe-16",
    name: "Đặt ranh giới và nói không",
    triggers: [
      "khó nói không với người khác",
      "bị ép làm thứ không muốn",
      "cách từ chối mà không bị ép tiếp",
    ],
    zone: "GU",
    content:
      "\"Không\" là một câu đầy đủ — không cần giải thích. Giải thích nhiều là mời thương lượng: người ép bạn sẽ tìm cách phản bác từng lý do. Nếu bị push back: lặp lại chính xác câu vừa nói, không thêm lý do mới. Chuẩn bị ranh giới trước tình huống thay vì xử lý real-time — quyết định sẵn \"tôi sẽ về lúc X\" trước khi đến nơi dễ hơn nhiều so với từ chối trực tiếp lúc đang bị vây quanh. Người có xu hướng muốn làm hài lòng người khác thường cần luyện tập điều này nhiều hơn — không phải vì yếu, mà vì cần thói quen mới.",
    why: "de Becker \"The Gift of Fear\" — về việc \"không\" không cần giải thích; Big Five research on agreeableness và ranh giới.",
    level: "Book",
    trait: "High Agreeableness, F types (MBTI), Anxious attachment",
    domain: "response",
  },
  {
    id: "safe-17",
    name: "Thoát ép buộc nhóm / Ép uống / Ép ở lại",
    triggers: [
      "bị bạn bè ép uống",
      "không biết cách rời đi khi bị giữ lại",
      "áp lực nhóm phải làm gì",
    ],
    zone: "GU",
    content:
      "Không cần lý do thật để thoát áp lực nhóm — cái cớ trung lập hoạt động tốt hơn nhiều so với giải thích thật: \"tôi uống thuốc không được uống,\" \"tôi lái xe,\" \"tôi còn việc sớm sáng mai.\" Không cần announce với cả nhóm — nói thầm với người quen trước, rồi rời đi tự nhiên. Báo trước \"tôi chỉ ở được đến giờ X\" trước khi đến — dễ rời hơn nhiều so với từ chối giữa chừng.",
    why: "Social psychology research về group pressure; proactive planning trong safety training.",
    level: "Inference",
    trait: "High Agreeableness",
    domain: "response",
  },
  {
    id: "safe-18",
    name: "Bystander — khi chứng kiến người khác bị hại",
    triggers: [
      "thấy người bị quấy rối phải làm gì",
      "chứng kiến bạo lực ngoài đường",
      "làm sao giúp mà không nguy hiểm cho mình",
    ],
    zone: "GU",
    content:
      "Năm cách can thiệp an toàn khi chứng kiến tình huống không ổn — từ an toàn nhất đến trực tiếp nhất: (1) Phân tán — gián tiếp, không đối đầu kẻ quấy rối: giả vờ nhầm người, làm rơi đồ, hỏi đường để tạo gián đoạn. (2) Nhờ người khác — chỉ định rõ: \"Bạn áo xanh, bạn gọi bảo vệ giúp tôi.\" (3) Ghi lại — quay phim hoặc chụp ảnh làm bằng chứng, nhưng hỏi nạn nhân muốn làm gì với video trước khi share, không livestream. (4) Kiểm tra sau — sau khi tình huống qua, hỏi nạn nhân có cần giúp gì không. (5) Lên tiếng trực tiếp — chỉ khi an toàn cho bạn. Không can thiệp nếu có thể gây nguy hiểm cho bản thân.",
    why: "Right To Be 5Ds (righttobe.org, UN Women partner); University of Rochester bystander intervention research.",
    level: "Official",
    domain: "response",
  },

  // ─── DOMAIN F: HIỂU SẾP / WORKPLACE (Tầng 3A+3B) ───────────────

  {
    id: "safe-work-01",
    name: "Khi sếp hay kiểm tra",
    triggers: [
      "sếp kiểm tra liên tục",
      "sếp check tiến độ",
      "sếp hay hỏi đang làm gì",
      "sếp không tin tưởng",
      "bị quản lý quá chặt",
      "sếp micromanage",
    ],
    zone: "GU",
    content:
      "Sếp micromanage thường không phải vì không tin bạn — mà vì họ cần cảm giác kiểm soát để bản thân họ an tâm. Với sếp kiểu này, báo cáo chủ động trước khi bị hỏi thường hiệu quả hơn nhiều so với xin sếp bớt check. Thử: cuối ngày gửi 2–3 dòng update ngắn qua Zalo — không cần dài, chỉ cần đủ để sếp thấy mọi thứ đang được kiểm soát. Khi sếp nhận được thông tin chủ động, nhu cầu hỏi lại thường giảm. Điều này không phải phục tùng — là cách tạo điều kiện để bạn có thêm không gian làm việc.",
    why: "Micromanagement research — proactive status updates giảm perceived uncertainty ở người quản lý cần kiểm soát.",
    level: "Inference",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-02",
    name: "Khi sếp khó thuyết phục",
    triggers: [
      "sếp không nghe ý kiến",
      "nói gì cũng bị bác",
      "sếp không tiếp thu",
      "góp ý bị phớt lờ",
      "sếp luôn cho mình đúng",
      "không biết cách thuyết phục sếp",
    ],
    zone: "GU",
    content:
      'Có những sếp nghe tốt hơn khi được trình bày bằng kết quả và số liệu, thay vì ý kiến cá nhân. Câu "em nghĩ là..." thường ít có trọng lượng hơn câu "nếu thử cách này, kết quả dự kiến là...". Cách thử: trước khi đề xuất, chuẩn bị 1–2 điểm data hoặc ví dụ cụ thể. Frame đề xuất theo hướng lợi ích cho team/dự án thay vì theo ý em. Nếu sau nhiều lần thử vẫn không được nghe — đó là thông tin quan trọng về môi trường bạn đang làm việc, không phải về giá trị của bạn.',
    why: "Influence và upward communication research — data-framed proposals được tiếp nhận tốt hơn opinion-only framing.",
    level: "Inference",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-03",
    name: "Khi không đọc được sếp",
    triggers: [
      "sếp không khen không chê",
      "không biết sếp có hài lòng không",
      "sếp lạnh lùng",
      "sếp ít nói",
      "làm xong không ai nhận xét",
      "tự hỏi mình có làm đúng không",
    ],
    zone: "GU",
    content:
      'Có những người lãnh đạo thể hiện sự hài lòng bằng cách giao thêm trách nhiệm, không bằng lời khen. Sếp tin tưởng giao việc khó hơn đôi khi là tín hiệu tích cực, dù không có vẻ vậy. Nếu bạn cần feedback rõ hơn, thử hỏi thẳng trong buổi 1:1 hoặc qua Zalo: "Anh/chị thấy phần này em làm được chưa, có điểm nào cần điều chỉnh không?" Câu hỏi cụ thể thường nhận được câu trả lời cụ thể hơn. Tự nghi ngờ bản thân vì sếp ít nói — và thực tế làm việc kém đi — là 2 thứ khác nhau. Đừng để cái đầu tiên tạo ra cái thứ hai.',
    why: "Leadership communication styles — low-expressiveness managers thường signal trust qua delegation thay vì verbal praise.",
    level: "Inference",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-04",
    name: "Khi sếp mood không ổn định",
    triggers: [
      "sếp hay thay đổi",
      "không biết hôm nay sếp thế nào",
      "sếp mood thất thường",
      "sếp nóng tính",
      "đi làm mà lo sếp đang tâm trạng gì",
      "sếp dễ nổi",
    ],
    zone: "GU",
    content:
      "Làm việc với người có mood thất thường là mệt — không phải vì bạn yếu, mà vì não người thật sự tốn nhiều năng lượng hơn khi môi trường không ổn định. Một số thứ có thể giúp: chọn thời điểm tốt để trình bày việc quan trọng (sáng sớm thường tốt hơn cuối ngày, sau tin tốt tốt hơn sau vấn đề). Giao tiếp bằng văn bản với việc quan trọng để có trail rõ ràng. Điều cần nhớ: mood của sếp không phải trách nhiệm của bạn phải ổn định. Bạn có thể điều chỉnh cách tiếp cận, nhưng không phải ôm cảm xúc của người khác.",
    why: "Occupational stress research — emotional unpredictability ở workplace tăng cognitive load và burnout risk.",
    level: "Inference",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-05",
    name: "Tạo trail tự nhiên",
    triggers: [
      "sếp hay thay lời",
      "hứa rồi không nhớ",
      "đổ lỗi cho em",
      "nói miệng rồi phủ nhận",
      "không có bằng chứng",
      "bị đổ lỗi oan",
    ],
    zone: "GU",
    content:
      'Sau các cuộc họp hoặc trao đổi miệng quan trọng, gửi một tin nhắn/email ngắn tóm tắt lại: "Em tóm tắt lại những gì mình vừa bàn: [1–2 điểm chính]." Đây không phải hành động nghi ngờ sếp — là thói quen làm việc rõ ràng giúp cả 2 phía không bị hiểu nhầm. Không cần formal hay defensive. Chỉ cần đủ để có trail nếu cần nhớ lại sau. Với deadline hoặc quyết định quan trọng: luôn xác nhận bằng văn bản, dù chỉ 1 câu. Trail tốt bảo vệ bạn — và thường cũng bảo vệ cả sếp khỏi nhớ nhầm.',
    why: "Workplace documentation best practice — written recap giảm misattribution và scope creep sau verbal agreements.",
    level: "Inference",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-06",
    name: "Phân biệt: mình hay môi trường?",
    triggers: [
      "làm gì cũng sai",
      "mình có vấn đề gì không",
      "tự ti với sếp",
      "cảm thấy mình kém",
      "chỉ mình bị vậy không",
      "hay bị chê",
      "không biết mình sai ở đâu",
    ],
    zone: "PROTECTIVE",
    content:
      "Khi làm gì cũng bị phê bình, tự nhiên sẽ tự hỏi có phải mình có vấn đề không. Câu hỏi đó hợp lý — nhưng cần kiểm tra thêm trước khi kết luận. Dấu hiệu vấn đề là môi trường (không phải bạn): nhiều người trong đội cùng có trải nghiệm tương tự; tiêu chuẩn không nhất quán — cùng một việc hôm nay được hôm sau bị chê; feedback không cụ thể — chỉ chê chung chung không giải thích cần sửa gì. Nhận ra điều này không phải để đổ lỗi cho sếp — mà để bạn không tự đánh giá thấp mình vì điều nằm ngoài tầm kiểm soát của bạn.",
    why: "Toxic workplace và attribution research — inconsistent criticism patterns thường reflect environment hơn individual competence.",
    level: "Research",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-07",
    name: "Bạn không cần xử lý một mình",
    triggers: [
      "không biết nói với ai",
      "stress vì sếp",
      "cô đơn trong đội",
      "không ai hiểu",
      "chịu một mình",
      "không dám kể",
      "giữ trong bụng",
    ],
    zone: "GU",
    content:
      "Khi môi trường làm việc khó, não người có xu hướng thu mình lại — không biết kể ai, kể ra cũng vô ích. Nhưng cô lập thường làm mọi thứ nặng hơn, không nhẹ hơn. Đồng nghiệp tin cậy ngoài đội trực tiếp của bạn, mentor, bạn thân hoặc người thân có thể cho bạn thứ quan trọng: góc nhìn từ ngoài cuộc. Người trong cuộc thường không thể tự đánh giá khách quan tình huống. Không cần tìm người giải quyết thay bạn — chỉ cần người nghe và cho bạn biết bạn không bị điên, tình huống này thật sự khó.",
    why: "Social support research — external perspective giảm isolation bias khi workplace stress kéo dài.",
    level: "Research",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-08",
    name: "Khi môi trường ảnh hưởng đến sức khỏe",
    triggers: [
      "không muốn đi làm nữa",
      "sợ gặp sếp",
      "ảnh hưởng sức khỏe",
      "mất ngủ vì việc",
      "lo lắng quá mức",
      "kiệt sức vì sếp",
    ],
    zone: "PROTECTIVE",
    content:
      "Không muốn đi làm, lo âu trước khi vào văn phòng, mất ngủ vì chuyện công việc — những dấu hiệu này không nên bị bỏ qua hoặc bị coi là bình thường. Cân nhắc update CV và kết nối lại với network không có nghĩa là bạn bỏ cuộc — là bạn tạo cho mình lựa chọn. Khi biết mình có lựa chọn, cảm giác bị kẹt giảm đi rõ rệt, và bạn có thể quyết định tỉnh táo hơn về việc ở lại hay rời đi. Bạn không cần quyết định ngay. Nhưng chăm sóc sức khỏe của mình — thể chất và tâm lý — là điều đáng làm trước tiên, bất kể quyết định cuối cùng là gì.",
    why: "Work-related anxiety và burnout literature — somatic warning signs cần được xử lý trước khi quyết định career.",
    level: "Research",
    domain: "selfprotection",
    subDomain: "workplace",
  },
  {
    id: "safe-work-09",
    name: "Khó làm việc — hay cần escalate?",
    triggers: [
      "bị đối xử không công bằng",
      "bị chèn ép",
      "bị phân biệt",
      "bị quấy rối",
      "sếp có hành vi không đúng",
      "bị đe dọa",
      "bị bắt nạt",
    ],
    zone: "PROTECTIVE",
    content:
      "Hai thứ trông giống nhau nhưng khác nhau hoàn toàn. Khó làm việc (style khác nhau, giao tiếp không ăn khớp) → những gì trong phần này có thể giúp bạn navigate. Vi phạm quyền lợi rõ ràng → phân biệt đối xử, quấy rối, đe dọa, ép buộc trái luật — những điều này không phải vấn đề style cần adapt. Bạn có quyền report. Kênh: HR của công ty, Sở Lao động Thương binh và Xã hội địa phương, Công đoàn nếu có. Ghi chép lại sự kiện cụ thể (ngày/giờ/nội dung) trước khi report. Biết ranh giới này giúp bạn không chịu đựng sai thứ, và cũng không escalate những thứ có thể xử lý khác.",
    why: "Luật Lao động VN và workplace harassment reporting channels — phân biệt interpersonal friction vs rights violation.",
    level: "Official",
    domain: "selfprotection",
    subDomain: "workplace",
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

export function getSafeEntryById(id: string): KBEntry | undefined {
  return KB_SELFPROTECTION.find((e) => e.id === id)
}

export function getSafeEntriesByDomain(domain: string): KBEntry[] {
  return KB_SELFPROTECTION.filter((e) => e.domain === domain)
}

export function getProtectiveEntries(): KBEntry[] {
  return KB_SELFPROTECTION.filter((e) => e.zone === "PROTECTIVE")
}

const WORKPLACE_TIER_3A_IDS = [
  "safe-work-01",
  "safe-work-02",
  "safe-work-03",
  "safe-work-04",
] as const

/** Tầng 3B: PROTECTIVE trước, GU sau */
const WORKPLACE_TIER_3B_IDS = [
  "safe-work-06",
  "safe-work-08",
  "safe-work-09",
  "safe-work-05",
  "safe-work-07",
] as const

function getWorkplaceEntriesByIds(ids: readonly string[]): KBEntry[] {
  return ids
    .map((id) => getSafeEntryById(id))
    .filter((e): e is KBEntry => e != null && e.subDomain === "workplace")
}

/** Hiểu Sếp Tầng 3A — GU entries khi làm việc với sếp khó */
export function getWorkplaceBossTier3A(): KBEntry[] {
  return getWorkplaceEntriesByIds(WORKPLACE_TIER_3A_IDS)
}

/** Hiểu Sếp Tầng 3B — tự bảo vệ (PROTECTIVE surface chủ động) */
export function getWorkplaceBossTier3B(): KBEntry[] {
  return getWorkplaceEntriesByIds(WORKPLACE_TIER_3B_IDS)
}

export function searchSafeByTrigger(query: string): KBEntry[] {
  const q = query.toLowerCase()
  return KB_SELFPROTECTION.filter((e) =>
    e.triggers.some((t) => t.toLowerCase().includes(q))
  )
}

export const SAFE_DOMAINS = [
  "situational_awareness", // nhận thức tình huống
  "everyday_safety",       // an toàn đời thường
  "digital_safety",        // an toàn số / chống scam
  "manipulation",          // nhận diện thao túng / quan hệ độc hại
  "response",              // ứng phó & ranh giới
] as const

export type SafeDomain = (typeof SAFE_DOMAINS)[number]

/**
 * Emergency resources VN — verified
 * 113  — Công an (nguy hiểm tính mạng)
 * 115  — Cấp cứu
 * 111  — Tổng đài Quốc gia bảo vệ trẻ em (24/7)
 * Bạo lực/DV — liên hệ 113 hoặc cơ sở y tế gần nhất
 * csaga.org.vn  — CSAGA, tư vấn online bạo lực giới
 */
/** Số cứu trợ: import từ tncb-resources-vn-safety.ts (SSOT) — không duplicate tại đây. */
