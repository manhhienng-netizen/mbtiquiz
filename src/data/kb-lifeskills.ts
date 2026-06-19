/**
 * KB — Life-Skills (8 Domain)
 * Tạo: 02/06/2026
 * Nguồn: life-skills-kb-8domains-02062026.md
 * Tổng: 33 entry
 * Domain: finance · relationships · learning · career · emotion · adulting · decision · digital
 */

export type KBZone = "GU" | "PROTECTIVE"
export type KBLevel = "Research" | "Book" | "Official" | "Inference"

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
}

export const KB_LIFESKILLS: KBEntry[] = [

  // ─── MẺ 1: TÀI CHÍNH ─────────────────────────────────────────

  {
    id: "fin-01",
    name: "Quy tắc 50-30-20",
    triggers: [
      "chia tiền lương thế nào",
      "ngân sách hàng tháng",
      "bắt đầu quản lý tiền từ đâu",
    ],
    zone: "GU",
    content:
      "Chia thu nhập sau thuế theo ba nhóm: 50% cho chi phí thiết yếu (nhà, ăn, di chuyển), 30% cho thứ muốn (ăn ngoài, giải trí), 20% cho tiết kiệm và trả nợ. Không phải công thức cứng — điều chỉnh tỷ lệ theo thu nhập thực tế của bạn. Giá trị của nó là tạo khung tư duy, không phải con số chính xác.",
    why: "Elizabeth Warren popularized framework này; được nhiều tổ chức tài chính (PNC, Experian) dùng như điểm khởi đầu cho người mới bắt đầu quản lý tiền.",
    level: "Book",
    trait: "Low Conscientiousness (cần framework đơn giản để bắt đầu)",
    domain: "finance",
  },
  {
    id: "fin-02",
    name: "Trả tiền cho mình trước",
    triggers: [
      "tại sao không tiết kiệm được",
      "cuối tháng không còn tiền tiết kiệm",
      "cách tiết kiệm hiệu quả",
    ],
    zone: "GU",
    content:
      "Chuyển tiền tiết kiệm ngay khi nhận lương — trước khi chi tiêu bất cứ thứ gì. Tự động hóa nếu ngân hàng cho phép. \"Tiết kiệm phần còn lại\" không hoạt động vì phần còn lại thường bằng không. Hành vi tự động hiệu quả hơn kỷ luật tự giác nhiều.",
    why: "Nguyên tắc kinh điển của personal finance — hành vi tự động loại bỏ điểm quyết định, giảm cognitive load và friction.",
    level: "Book",
    trait: "Low Conscientiousness, P types (MBTI)",
    domain: "finance",
  },
  {
    id: "fin-03",
    name: "Quỹ khẩn cấp",
    triggers: [
      "quỹ dự phòng bao nhiêu là đủ",
      "tiết kiệm khẩn cấp",
      "cần tiền dự phòng không",
    ],
    zone: "GU",
    content:
      "Dành riêng 3-6 tháng chi phí sinh hoạt trong tài khoản riêng, không chạm vào trừ khẩn cấp thật. Xây quỹ này trước khi nghĩ đến đầu tư. Mất việc, bệnh, tai nạn không báo trước — quỹ khẩn cấp là thứ giúp bạn không phải vay lãi cao trong lúc khó.",
    why: "Bankrate Annual Emergency Savings Report 2025 — 59% người Mỹ không cảm thấy thoải mái với quỹ khẩn cấp hiện tại của mình.",
    level: "Research",
    trait: "High Neuroticism (cần quỹ này để giảm lo âu tài chính)",
    domain: "finance",
  },
  {
    id: "fin-04",
    name: "Lạm phát VN và tiền mặt",
    triggers: [
      "để tiền mặt có mất giá không",
      "lạm phát ảnh hưởng thế nào",
      "tiết kiệm dưới dạng gì",
    ],
    zone: "GU",
    content:
      "Lạm phát VN trung bình 3-4%/năm — 100 triệu để dưới gối 10 năm mất khoảng 30% sức mua. Tiền dư cần sinh lời tối thiểu bằng tỷ lệ lạm phát để không mất giá trị thực. Đây không phải lời khuyên đầu tư cụ thể — là thông tin để bạn quyết định có hành động không.",
    why: "NHNN VN — dữ liệu lạm phát chính thức.",
    level: "Official",
    domain: "finance",
  },
  {
    id: "fin-05",
    name: "Bẫy app cho vay online",
    triggers: [
      "app vay tiền nhanh có ổn không",
      "vay tiền online uy tín",
      "vay tiêu dùng không cần thế chấp",
    ],
    zone: "PROTECTIVE",
    content:
      "App cho vay online quảng cáo \"duyệt nhanh, không cần thế chấp\" thường có lãi suất thực tế 300-700%/năm khi quy đổi đúng — dù họ quảng cáo phí nhỏ theo ngày hoặc tuần. Khi trễ hạn, lãi phạt leo thang nhanh và một số đơn vị dùng chiến thuật đòi nợ gây áp lực với người thân trong danh bạ. Nếu cần tiền gấp, xem xét vay từ người thân hoặc quỹ tín dụng chính thức trước.",
    why: "Bộ Công an VN, NHNN VN — đã phát đi nhiều cảnh báo chính thức về loại hình này.",
    level: "Official",
    trait: "High Agreeableness (dễ bị thuyết phục bởi quảng cáo cảm xúc)",
    domain: "finance",
  },
  {
    id: "fin-06",
    name: "Tâm lý tiêu tiền cần biết",
    triggers: [
      "hay mua sắm khi buồn",
      "mua xong hối hận",
      "tại sao cứ tiêu hết tiền",
    ],
    zone: "GU",
    content:
      "Ba kiểu phổ biến: (1) Lifestyle creep — thu nhập tăng thì chi tiêu tự động tăng theo, không bao giờ tiết kiệm được nhiều hơn. (2) Chi tiêu cảm xúc — buồn, bực, stress dẫn đến mua sắm để cảm thấy tốt hơn ngay lập tức. Nhận ra trigger cảm xúc của mình là bước đầu tiên. (3) Neo giá — \"giảm 50%\" từ giá gốc có thể bịa — so sánh với giá thị trường, không phải giá gốc được đăng.",
    why: "Morgan Housel \"The Psychology of Money\" 2020; Kahneman anchoring bias research.",
    level: "Book",
    trait: "High Neuroticism, Feeling types (dễ chi tiêu cảm xúc)",
    domain: "finance",
  },

  // ─── MẺ 2: QUAN HỆ TÍCH CỰC ──────────────────────────────────

  {
    id: "rel-s01",
    name: "Nói về nhu cầu thay vì đổ lỗi",
    triggers: [
      "cãi nhau xong cảm thấy tệ hơn",
      "không biết nói thế nào để người kia hiểu",
      "hay nói sai khi cãi nhau",
    ],
    zone: "GU",
    content:
      "Thay vì \"Anh/em luôn...\" — thử \"Tôi cảm thấy X khi Y xảy ra, tôi cần Z.\" Tách cảm xúc của mình ra khỏi việc tấn công tính cách người kia. Câu mở đầu bằng \"Tôi\" giảm phòng thủ ở người nghe vì nó mô tả trải nghiệm của bạn, không phán xét họ.",
    why: "Rosenberg NVC; SBI feedback model — \"I statements\" được xác nhận trong nhiều nghiên cứu giao tiếp về giảm phòng thủ.",
    level: "Book",
    trait: "T types (MBTI) cần nhắc thêm bước này",
    domain: "relationships",
  },
  {
    id: "rel-s02",
    name: "Sửa chữa sau mâu thuẫn",
    triggers: [
      "sau cãi nhau thì làm gì",
      "xin lỗi đúng cách",
      "làm hòa với người yêu",
    ],
    zone: "GU",
    content:
      "Khả năng sửa chữa sau mâu thuẫn quan trọng hơn việc không bao giờ cãi nhau. Cách thực tế: xin lỗi về hành vi cụ thể (không phải tổng quát), sau đó hỏi đối phương cần gì lúc này — không giả định. Nghiên cứu Gottman cho thấy 90%+ cặp đôi cãi nhau; sự khác biệt nằm ở bên nào biết sửa chữa.",
    why: "Gottman Institute research — \"repair attempts\" là chỉ số dự báo mạnh của quan hệ lành mạnh, không phải tần suất mâu thuẫn.",
    level: "Research",
    trait: "High Neuroticism (cần repair nhanh hơn)",
    domain: "relationships",
  },
  {
    id: "rel-s03",
    name: "Cô đơn dù đông người",
    triggers: [
      "có nhiều bạn mà vẫn cô đơn",
      "không ai thực sự hiểu mình",
      "cô đơn giữa đám đông",
    ],
    zone: "GU",
    content:
      "Cô đơn xã hội là thiếu kết nối sâu, không phải thiếu người xung quanh. Một cuộc trò chuyện 1:1 có chiều sâu thật sự hiệu quả hơn nhiều buổi tụ tập đông người trong việc giảm cô đơn. Nếu đang cảm thấy vậy, câu hỏi không phải \"làm sao gặp nhiều người hơn\" mà là \"làm sao đi sâu hơn với người mình đã có.\"",
    why: "Harvard loneliness study 2023; Vivek Murthy \"Surgeon General's Advisory on Loneliness\" 2023.",
    level: "Research",
    trait: "Introversion (1:1 phù hợp hơn nhóm lớn)",
    domain: "relationships",
  },
  {
    id: "rel-s04",
    name: "Đặt ranh giới với gia đình VN",
    triggers: [
      "bố mẹ không hiểu mình",
      "áp lực gia đình quá nhiều",
      "muốn sống theo ý mình mà không mất hiếu thảo",
    ],
    zone: "GU",
    content:
      "Ranh giới không phải từ chối quan tâm — là nói rõ mình có thể và không thể làm mà vẫn ổn. Trong văn hóa VN, hiếu thảo thường được hiểu là đồng ý tất cả — nhưng nghiên cứu cho thấy ranh giới lành mạnh không làm giảm kết nối khi được giao tiếp đúng cách. Câu có thể thử: \"Con thương bố/mẹ và con cần điều này để có thể ổn.\"",
    why: "Psychology research về healthy boundaries; VN collectivist cultural context từ Hofstede.",
    level: "Inference",
    trait: "High Agreeableness, F types (MBTI)",
    domain: "relationships",
  },

  // ─── MẺ 3: HỌC CÁCH HỌC ──────────────────────────────────────

  {
    id: "learn-01",
    name: "Nhớ chủ động hiệu quả hơn đọc lại",
    triggers: [
      "cách học nhớ lâu",
      "ôn bài hiệu quả",
      "đọc mãi mà không nhớ",
    ],
    zone: "GU",
    content:
      "Đọc lại kém hiệu quả hơn nhiều so với tự nhớ lại. Cách thực tế: đọc xong gấp sách lại, viết ra tất cả những gì bạn nhớ được — không nhìn. Phần bạn không viết được là phần chưa thật sự vào. Flashcard, tự đặt câu hỏi, giải thích lại cho người khác đều là các hình thức của nguyên lý này.",
    why: "Brown, Roediger, McDaniel \"Make It Stick\" 2014; Dunlosky 2013 trong Psychological Science — active retrieval là kỹ thuật học có evidence mạnh nhất.",
    level: "Research",
    trait: "Low Conscientiousness (cần kỹ thuật cụ thể thay vì học nhiều hơn)",
    domain: "learning",
  },
  {
    id: "learn-02",
    name: "Ôn cách quãng — ôn theo khoảng cách",
    triggers: [
      "ôn bài thế nào",
      "học trước thi mấy ngày",
      "quên kiến thức nhanh",
    ],
    zone: "GU",
    content:
      "Thay vì ôn tất cả một lúc trước ngày thi, ôn theo khoảng cách: ngày 1, ngày 3, ngày 7, ngày 14. Cảm giác \"quên một chút rồi mới ôn\" là bạn thật — não phải cố nhớ lại mới củng cố ký ức. App Anki tự động hóa lịch ôn này nếu bạn muốn.",
    why: "Make It Stick (Brown et al 2014); Kang 2016 \"Spaced Repetition Promotes Efficient and Effective Learning.\"",
    level: "Research",
    domain: "learning",
  },
  {
    id: "learn-03",
    name: "Kỹ thuật Feynman — kiểm tra hiểu thật",
    triggers: [
      "cảm giác hiểu nhưng không giải thích được",
      "làm sao biết mình thật sự hiểu",
      "học khái niệm trừu tượng",
    ],
    zone: "GU",
    content:
      "Chọn một khái niệm, giải thích nó như đang dạy cho người không biết gì. Chỗ nào giải thích không được, nói vòng vo, hoặc dùng thuật ngữ không thể định nghĩa tiếp — là chỗ bạn chưa hiểu thật. Quay lại nghiên cứu đúng phần đó.",
    why: "Feynman approach to physics learning; \"Make It Stick\" — phân biệt \"cảm thấy quen thuộc\" và \"thật sự hiểu.\"",
    level: "Book",
    trait: "High Conscientiousness (thích kiểm tra độ chính xác)",
    domain: "learning",
  },

  // ─── MẺ 4: SỰ NGHIỆP ─────────────────────────────────────────

  {
    id: "career-01",
    name: "Ikigai — tìm hướng khi mù mờ",
    triggers: [
      "không biết mình muốn làm gì",
      "chọn nghề thế nào",
      "mất phương hướng về sự nghiệp",
    ],
    zone: "GU",
    content:
      "Khung Nhật Bản ikigai đặt ra bốn câu hỏi: Bạn yêu gì? Bạn giỏi gì? Thế giới cần gì? Bạn có thể kiếm tiền từ gì? Giao điểm của bốn vòng là vùng đáng khám phá. Đây là la bàn định hướng, không phải câu trả lời ngay lập tức — và không phải mọi ikigai đều phải là nghề nghiệp.",
    why: "Ken Mogi \"The Little Book of Ikigai\" 2017 — popular framework, evidence là inference.",
    level: "Inference",
    trait: "High Openness (quá nhiều option, cần thu hẹp)",
    domain: "career",
  },
  {
    id: "career-02",
    name: "Phương pháp STAR cho phỏng vấn",
    triggers: [
      "trả lời phỏng vấn thế nào",
      "phỏng vấn hay bị hỏi về kinh nghiệm",
      "chuẩn bị phỏng vấn",
    ],
    zone: "GU",
    content:
      "Với câu hỏi hành vi (\"Kể về lần bạn...\"), trả lời theo bốn bước: Situation (bối cảnh là gì), Task (nhiệm vụ của bạn là gì), Action (bạn đã làm gì cụ thể), Result (kết quả ra sao). Chuẩn bị 5-7 tình huống từ kinh nghiệm thật theo format này trước khi đi phỏng vấn.",
    why: "STAR method là tiêu chuẩn phỏng vấn hành vi được dùng rộng rãi bởi hiring managers — dự báo performance từ hành vi trong quá khứ.",
    level: "Official",
    trait: "Introversion (cần chuẩn bị cấu trúc trước hơn extrovert)",
    domain: "career",
  },
  {
    id: "career-03",
    name: "CV: kết quả, không phải nhiệm vụ",
    triggers: [
      "viết CV thế nào",
      "CV của mình không có gì nổi bật",
      "sửa CV xin việc",
    ],
    zone: "GU",
    content:
      "Viết \"Tăng X% trong Y tháng bằng cách Z\" thay vì \"Chịu trách nhiệm X.\" Nhà tuyển dụng đọc CV lần đầu chỉ 6-10 giây — kết quả cụ thể đo được dễ đọc hơn nhiều so với mô tả nhiệm vụ. Nếu không có con số, mô tả tác động: \"Xây quy trình mới, giảm thời gian xử lý từ 2 ngày xuống 4 giờ.\"",
    why: "ATS scanning và human review đều ưu tiên quantified accomplishments — career development research consensus.",
    level: "Official",
    trait: "Introversion (hay understate thành tích)",
    domain: "career",
  },

  // ─── MẺ 5: ĐIỀU HÒA CẢM XÚC ──────────────────────────────────

  {
    id: "emo-01",
    name: "Đặt tên cảm xúc cụ thể",
    triggers: [
      "không biết mình đang cảm thấy gì",
      "cảm xúc hỗn độn",
      "hay bị cảm xúc cuốn đi",
    ],
    zone: "GU",
    content:
      "Đặt tên chính xác cho cảm xúc — không phải \"buồn\" mà là \"thất vọng,\" \"tủi thân,\" \"cô đơn,\" \"lo âu.\" Không phải \"tức\" mà là \"bị phản bội,\" \"xấu hổ,\" \"mất kiểm soát.\" Tên càng cụ thể thì não càng điều tiết được tốt hơn. Đây không phải phân tích — chỉ cần nhận ra và gọi tên.",
    why: "Lieberman et al 2007 (UCLA) — \"affect labeling\" giảm hoạt động amygdala; Lisa Feldman Barrett \"How Emotions Are Made\" 2017 về emotional granularity.",
    level: "Research",
    trait: "T types (MBTI), High Neuroticism",
    domain: "emotion",
  },
  {
    id: "emo-02",
    name: "Nhận ra méo mó tư duy",
    triggers: [
      "hay nghĩ tiêu cực",
      "suy nghĩ xấu tự động",
      "cứ nghĩ mãi một chuyện xấu",
    ],
    zone: "GU",
    content:
      "Một số suy nghĩ tiêu cực lặp lại là kiểu, không phải sự thật. Các dạng phổ biến: Tất hoặc không (hoặc hoàn hảo hoặc thất bại hoàn toàn), Thổi phồng thảm họa (thứ này xảy ra nghĩa là mọi thứ sẽ sụp đổ), Đọc suy nghĩ người khác (mình biết họ đang nghĩ gì về mình), Câu \"phải\" (mình phải...). Nhận ra tên của kiểu không giải quyết nó ngay — nhưng giúp bạn không tin nó hoàn toàn.",
    why: "CBT (Aaron Beck, 1970s) — một trong các phương pháp có evidence base mạnh nhất trong tâm lý học; đây là phần literacy, không phải trị liệu.",
    level: "Research",
    trait: "High Neuroticism",
    domain: "emotion",
  },
  {
    id: "emo-03",
    name: "Tự biết ơn bản thân khi thất bại",
    triggers: [
      "tự trách mình quá nhiều",
      "thất bại xong cảm thấy vô dụng",
      "khó tha thứ cho bản thân",
    ],
    zone: "GU",
    content:
      "Tự biết ơn bản thân có ba thành phần: đối xử với mình như với người bạn tốt khi thất bại (không phải kẻ thù), nhớ rằng mắc lỗi và khổ đau là phần của trải nghiệm con người — không phải chỉ mình bạn, và nhận ra cảm xúc đang có mà không kịch hóa. Nghiên cứu cho thấy tự biết ơn bản thân ổn định hơn lòng tự trọng và không liên quan đến narcissism như nhiều người lo.",
    why: "Kristin Neff 2023, Annual Review of Psychology — self-compassion predicts well-being và giảm lo âu, trầm cảm.",
    level: "Research",
    trait: "Perfectionism, INTJ/ISTJ, High Conscientiousness",
    domain: "emotion",
  },

  // ─── MẺ 6: ADULTING VN ────────────────────────────────────────

  {
    id: "adult-01",
    name: "Thuê nhà — hợp đồng bắt buộc",
    triggers: [
      "ký hợp đồng thuê nhà cần chú ý gì",
      "chủ nhà không chịu trả cọc",
      "thuê trọ lần đầu",
    ],
    zone: "PROTECTIVE",
    content:
      "Luôn yêu cầu hợp đồng bằng văn bản có chữ ký cả hai bên, ghi rõ: giá thuê, số tiền cọc, điều khoản tăng giá (không tăng trong bao lâu, hoặc tối đa bao nhiêu phần trăm mỗi năm), trách nhiệm sửa chữa, và thời hạn thông báo trước khi đòi ra. Trước khi vào ở, chụp ảnh hoặc quay video toàn bộ phòng kể cả chỗ đã hư hỏng sẵn, gửi cho chủ nhà xác nhận. Hợp đồng miệng rất khó chứng minh khi tranh chấp.",
    why: "Luật Dân sự VN 2015 — bảo vệ người thuê nhà.",
    level: "Official",
    domain: "adulting",
  },
  {
    id: "adult-02",
    name: "Đăng ký tạm trú VN",
    triggers: [
      "chuyển nhà cần làm gì",
      "đăng ký tạm trú ở đâu",
      "chưa đăng ký tạm trú có sao không",
    ],
    zone: "GU",
    content:
      "Đăng ký tạm trú tại công an phường trong 30 ngày kể từ khi đến ở — đây là nghĩa vụ theo Luật Cư trú VN 2020. Cần để làm nhiều thủ tục hành chính về sau: đổi bằng lái, làm thủ tục y tế, một số hồ sơ xin việc. Vi phạm có thể bị phạt hành chính.",
    why: "Luật Cư trú VN 2020.",
    level: "Official",
    domain: "adulting",
  },
  {
    id: "adult-03",
    name: "Mẫu thiết kế lừa người dùng — nhận ra để miễn dịch",
    triggers: [
      "hay bị mua sắm bốc đồng",
      "đồng hồ đếm ngược trên web có thật không",
      "ưu đãi giảm giá chớp nhoáng có nên tin không",
    ],
    zone: "PROTECTIVE",
    content:
      "Mẫu thiết kế lừa người dùng là kỹ thuật thiết kế tạo urgency giả: đồng hồ đếm ngược có thể reset khi bạn tải lại trang, \"chỉ còn 2 cái\" thường không chính xác, \"X người đang xem sản phẩm này\" thường là kịch bản. Nhận ra tên của các kỹ thuật này giúp bạn không bị kích hoạt theo phản xạ. Quy tắc thực tế: nếu cảm thấy bị ép phải quyết định ngay, đó là lúc nên dừng lại.",
    why: "FTC (Federal Trade Commission) về dark patterns; marketing psychology research về artificial urgency.",
    level: "Official",
    trait: "High Neuroticism, P types (dễ bị kích thích ngay lúc đó)",
    domain: "adulting",
  },

  // ─── MẺ 7: RA QUYẾT ĐỊNH ──────────────────────────────────────

  {
    id: "dec-01",
    name: "Ngụy biện chi phí chìm",
    triggers: [
      "đã đầu tư nhiều rồi nên tiếp tục",
      "bỏ cuộc hay tiếp tục",
      "cứ ở lại vì đã bỏ thời gian",
    ],
    zone: "GU",
    content:
      "Chi phí đã bỏ ra — tiền, thời gian, công sức — không thể lấy lại, và không nên ảnh hưởng đến quyết định tiếp theo. Câu hỏi đúng: \"Nếu mình chưa đầu tư bất cứ gì vào đây, mình có chọn tiếp tục không?\" Nếu không — thì lý do duy nhất để tiếp tục là chi phí chìm, không phải lý do tốt.",
    why: "Kahneman & Tversky 1979; Thaler 1980 — sunk cost fallacy được ghi nhận là một trong những thiên kiến nhận thức phổ biến và tốn kém nhất.",
    level: "Research",
    trait: "High Conscientiousness, J types (MBTI — khó bỏ kế hoạch đã cam kết)",
    domain: "decision",
  },
  {
    id: "dec-02",
    name: "Quyết định có thể hoàn tác hay không",
    triggers: [
      "phân vân không biết có nên quyết không",
      "sợ quyết định sai",
      "quyết định lớn phải làm gì",
    ],
    zone: "GU",
    content:
      "Phân loại quyết định trước khi cân nhắc: quyết định có thể hoàn tác (thử và sửa) thì quyết nhanh, không cần hoàn hảo. Quyết định không thể hoàn tác (ít hơn nhiều) mới cần cân nhắc kỹ. Hầu hết quyết định hàng ngày thuộc loại đầu — nhưng người hay cầu toàn thường đối xử với tất cả như loại thứ hai.",
    why: "Jeff Bezos \"two-way door / one-way door\" principle trong shareholder letters; Kahneman về phân loại quyết định.",
    level: "Book",
    trait: "High Conscientiousness, perfectionism",
    domain: "decision",
  },
  {
    id: "dec-03",
    name: "Thiên kiến nhận thức cần biết",
    triggers: [
      "tại sao mình hay quyết định sai",
      "bias nhận thức là gì",
      "suy nghĩ của mình có bị méo không",
    ],
    zone: "GU",
    content:
      "Ba thiên kiến phổ biến nhất ảnh hưởng đến quyết định thường ngày: (1) Neo giá — con số đầu tiên bạn thấy ảnh hưởng mạnh đến đánh giá tiếp theo dù không liên quan. (2) Thiên kiến sẵn có — đánh giá xác suất dựa vào ví dụ dễ nhớ nhất, không phải tần suất thật. (3) Thiên kiến xác nhận — tự nhiên tìm kiếm thông tin xác nhận điều đã tin, bỏ qua thông tin ngược lại. Biết tên không triệt tiêu hoàn toàn nhưng giúp nhận ra lúc nó đang xảy ra.",
    why: "Kahneman \"Thinking, Fast and Slow\" 2011; Kahneman & Tversky — nền tảng behavioral economics.",
    level: "Research",
    trait: "High Conscientiousness (confirmation bias đặc biệt mạnh khi đã có kế hoạch)",
    domain: "decision",
  },
  {
    id: "dec-04",
    name: "Đọc hiểu truyền thông — đánh giá thông tin",
    triggers: [
      "làm sao biết tin tức có thật không",
      "kiểm tra thông tin online",
      "tin giả nhận ra thế nào",
    ],
    zone: "GU",
    content:
      "Phương pháp SIFT của Stanford: Stop — Dừng (dừng phản ứng ngay) → Investigate — Tìm hiểu nguồn (tìm kiếm về tổ chức/tác giả, không đọc sâu vào trang đó) → Find — Tìm nguồn khác (tìm nguồn khác đưa tin) → Trace — Truy ngược (truy ngược về nguồn gốc tuyên bố). Thực tế nhất: khi thấy tin cần kiểm tra, mở tab mới search tên tổ chức trước khi đọc nội dung của họ.",
    why: "Stanford History Education Group — SIFT method, được dùng trong nhiều chương trình media literacy.",
    level: "Official",
    domain: "decision",
  },

  // ─── MẺ 8: DIGITAL WELLBEING ──────────────────────────────────

  {
    id: "digi-01",
    name: "So sánh mạng xã hội và sức khỏe tâm thần",
    triggers: [
      "dùng mạng xã hội nhiều có hại không",
      "Instagram làm mình buồn",
      "thấy tệ khi xem feed",
    ],
    zone: "GU",
    content:
      "Những gì bạn thấy trên mạng xã hội là đoạn nổi bật được chọn lọc — không phải cuộc sống thật của người đó. Não tự động so sánh cuộc sống thường ngày của mình với khoảnh khắc tốt nhất của người khác, và kết quả luôn bất công với bạn. Nghiên cứu trên ba bộ dữ liệu lớn cho thấy người dùng nặng có khả năng gấp 2 lần có sức khỏe tinh thần thấp so với người dùng nhẹ.",
    why: "Twenge & Martin 2020 — Journal of Adolescence; Twenge 2019 — Current Directions in Psychological Science.",
    level: "Research",
    trait: "High Neuroticism (đặc biệt dễ bị affected)",
    domain: "digital",
  },
  {
    id: "digi-02",
    name: "Cuộn thụ động vs dùng chủ động",
    triggers: [
      "giảm thời gian điện thoại thế nào",
      "dùng mạng xã hội đúng cách",
      "thời gian màn hình ảnh hưởng gì",
    ],
    zone: "GU",
    content:
      "Không phải tất cả thời gian màn hình đều như nhau. Cuộn thụ động (cuộn feed không mục đích) liên quan đến sức khỏe tinh thần thấp hơn. Nhắn tin với bạn bè thật, tạo nội dung, xem video có mục đích — trung tính hoặc ít hại hơn. Câu hỏi thực tế: \"Lúc này mình đang chủ động dùng hay đang bị cuộn đi?\" Nhận ra sự khác biệt là đủ để bắt đầu thay đổi.",
    why: "Twenge research về screen type differentiation; Northwestern Medicine về dopamine loop của social media.",
    level: "Research",
    trait: "P types, Ne dominant (dễ bị cuốn vào novelty feed)",
    domain: "digital",
  },
  {
    id: "digi-03",
    name: "Tắt thông báo và vùng cấm điện thoại",
    triggers: [
      "hay bị phân tâm vì điện thoại",
      "không tập trung được vì thông báo",
      "ngủ không ngon vì điện thoại",
    ],
    zone: "GU",
    content:
      "Hai thay đổi đơn giản có tác động lớn: tắt thông báo thời gian thực và chỉ check vào 2-3 khung giờ cố định trong ngày — giảm chuyển ngữ cảnh, tăng khả năng tập trung sâu. Không mang điện thoại vào phòng ngủ, hoặc ít nhất để xa tầm với — ánh sáng xanh và thông báo phá melatonin và giảm chất lượng giấc ngủ.",
    why: "Cal Newport \"Deep Work\" 2016 về attention và context-switching; Northwestern Medicine + sleep research về blue light.",
    level: "Book",
    trait: "High Neuroticism (notification làm tăng anxiety baseline)",
    domain: "digital",
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

export function getSkillsEntryById(id: string): KBEntry | undefined {
  return KB_LIFESKILLS.find((e) => e.id === id)
}

export function getSkillsEntriesByDomain(domain: string): KBEntry[] {
  return KB_LIFESKILLS.filter((e) => e.domain === domain)
}

export function getProtectiveEntries(): KBEntry[] {
  return KB_LIFESKILLS.filter((e) => e.zone === "PROTECTIVE")
}

export function searchSkillsByTrigger(query: string): KBEntry[] {
  const q = query.toLowerCase()
  return KB_LIFESKILLS.filter((e) =>
    e.triggers.some((t) => t.toLowerCase().includes(q))
  )
}

export const LIFESKILLS_DOMAINS = [
  "finance",       // tài chính cá nhân
  "relationships", // quan hệ tích cực
  "learning",      // học cách học
  "career",        // sự nghiệp giai đoạn đầu
  "emotion",       // điều hòa cảm xúc
  "adulting",      // đời sống hành chính VN
  "decision",      // ra quyết định + tư duy phản biện
  "digital",       // digital wellbeing
] as const

export type LifeSkillsDomain = (typeof LIFESKILLS_DOMAINS)[number]
