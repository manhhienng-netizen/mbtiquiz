/**
 * KB — Savoir-Faire / Nâng Cấp Đời Sống
 * Tạo: 02/06/2026
 * Nguồn: tips_bank_assistant.md (Mẻ 1 + 4 + 5)
 * Tổng: 36 entry
 * Lưu ý: Mẻ 2 (rượu vang) và Mẻ 3 (food pairing) KHÔNG có trong file này
 *   theo nguyên tắc content agent: bỏ phần rượu/cồn
 * Domain: style · dining · social
 * Khung: "giúp tình huống cụ thể" — không phải daily-tip
 */

export type KBZone = "GU" | "PROTECTIVE"
export type KBLevel = "Research" | "Book" | "Official" | "Inference" | "Evergreen"

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

export const KB_SAVOIRFAIRE: KBEntry[] = [

  // ─── MẺ 1: PHONG CÁCH / MẶC ĐỒ ──────────────────────────────

  {
    id: "style-01",
    name: "Quy tắc 3 màu",
    triggers: [
      "mặc đồ phối màu thế nào",
      "phối màu trang phục không biết bắt đầu từ đâu",
      "mặc nhiều màu có ổn không",
      "phối đồ",
      "phối màu đồ",
      "chỉn chu",
      "ăn mặc",
      "trang phục",
      "mặc đẹp",
      "mix đồ",
      "outfit",
      "trông gọn gàng",
      "diện mạo",
    ],
    zone: "GU",
    content:
      "Giới hạn trang phục ở tối đa 3 màu: 1 màu chủ (khoảng 60% diện tích), 1 màu phụ (30%), và 1 điểm nhấn nhỏ (10%). Ít màu hơn thường trông gọn và có chủ đích hơn. Đây là điểm bắt đầu tốt nhất nếu bạn chưa chắc về phối màu.",
    why: "Nguyên tắc phổ biến trong nhiều hướng dẫn phong cách (necesera.com, glance.com) — dựa trên lý thuyết màu sắc áp dụng vào thời trang.",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-02",
    name: "Màu tương tự — an toàn nhất",
    triggers: [
      "màu nào phối được với nhau",
      "phối màu an toàn",
      "không biết kết hợp màu gì",
    ],
    zone: "GU",
    content:
      "Chọn màu nằm cạnh nhau trên bánh xe màu — xanh lá với teal với vàng, cam với vàng với nâu ấm. Cách phối này tạo ra sự hài hòa tự nhiên và ít rủi ro nhất. Phù hợp cho thường ngày đến smart casual.",
    why: "Analogous color harmony là nguyên tắc cơ bản của color theory, được áp dụng rộng rãi trong thời trang (masterclass.com, luxe.digital).",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-03",
    name: "Trung tính là nền tảng",
    triggers: [
      "xây tủ đồ từ đâu",
      "màu nào dễ phối nhất",
      "mua gì để mặc được nhiều",
    ],
    zone: "GU",
    content:
      "Đen, trắng, xám, be, navy, denim là trung tính — phối được với hầu hết màu khác. Xây tủ đồ từ các màu này trước, thêm màu sắc sau qua phụ kiện. Denim xử lý như trung tính — jeans mid-wash phối với áo bất kỳ màu không quá chói.",
    why: "Neutral-first capsule wardrobe là nguyên tắc của tủ đồ tối giản — giảm quyết định hàng sáng, tăng số lượng outfit có thể tạo ra.",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-04",
    name: "Tông-sur-tông — tinh tế và dễ",
    triggers: [
      "mặc một màu có nhàm không",
      "trang phục tông-sur-tông là gì",
      "cách mặc đồ công sở đơn giản",
    ],
    zone: "GU",
    content:
      "Mặc các sắc độ khác nhau của cùng một màu — beige nhạt với camel với nâu đất, hoặc trắng sữa với xám nhạt với xám đậm. Cách phối này trông tinh tế và dễ nhìn hơn nhiều so với vẻ đơn điệu ban đầu. An toàn nhất cho công sở và trang trọng.",
    why: "Monochromatic dressing là kỹ thuật được nhiều stylist khuyến nghị vì tạo ra silhouette dài và cohesive mà không cần kỹ năng phối màu phức tạp (luxe.digital, so-sew-easy).",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-05",
    name: "Vừa người quan trọng hơn giá",
    triggers: [
      "mặc đồ rẻ mà nhìn đẹp",
      "mua đồ đắt mà không thấy khác",
      "đồ mặc vừa người có cần thiết không",
    ],
    zone: "GU",
    content:
      "Đồ vừa người nhìn đắt hơn đồ xa xỉ mặc rộng thùng. May sửa một chiếc áo thường thành vừa người là khoản đầu tư đáng giá hơn mua thêm đồ mới. Kiểm tra vai: đường may vai phải chạm đúng đỉnh vai — lệch 2cm thay đổi toàn bộ silhouette.",
    why: "Fit là yếu tố số một ảnh hưởng đến cách quần áo nhìn — nguyên tắc cơ bản của tailoring.",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-06",
    name: "Họa tiết với một màu",
    triggers: [
      "mặc áo họa tiết phối với gì",
      "đồ có họa tiết kết hợp thế nào",
      "áo kẻ hay hoa mặc với quần gì",
    ],
    zone: "GU",
    content:
      "Nếu mặc đồ có họa tiết lớn, phần còn lại phải một màu. Cách phối: lấy một màu trong họa tiết đó làm tông màu chủ cho phần một màu. Tránh phối hai loại họa tiết lớn cùng nhau trừ khi bạn đang cố tình tạo hiệu ứng đó.",
    why: "Nguyên tắc visual balance trong thời trang — pattern lớn đã có visual weight cao, cần solid để cân bằng (so-sew-easy.com).",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-07",
    name: "Giá mỗi lần mặc — đánh giá thật sự",
    triggers: [
      "mua đồ đắt có đáng không",
      "đồ giá nào là tốt",
      "khi nào nên đầu tư vào quần áo",
    ],
    zone: "GU",
    content:
      "Trước khi mua: tổng giá chia cho số lần mặc ước tính. Áo 50k mặc 2 lần = 25k mỗi lần. Áo 500k mặc 100 lần = 5k mỗi lần. Đầu tư nhiều hơn vào những thứ mặc thường xuyên (áo trắng tốt, quần jeans tốt, giày sạch) và mua rẻ hơn với đồ chỉ mặc vài lần.",
    why: "Cost-per-wear là metric đơn giản nhất để đánh giá giá trị thật của quần áo — kết hợp personal finance với style planning.",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-08",
    name: "Mặc theo dịp — hẹn hò lần đầu",
    triggers: [
      "mặc gì khi đi hẹn hò",
      "trang phục cho hẹn lần đầu",
      "mặc gì để gây ấn tượng tốt",
    ],
    zone: "GU",
    content:
      "Mặc thứ bạn thấy tự tin nhất — nhưng nâng cấp một bậc so với ngày thường: thêm một lớp ngoài (áo khoác, áo cardigan), giày tốt hơn giày thể thao thường, hoặc phụ kiện gọn. Tự tin trong đồ mình mặc quan trọng hơn trang phục đắt tiền.",
    why: "Style consensus về first impressions — tự tin bộc lộ ra ngoài và người đối diện cảm nhận được.",
    level: "Evergreen",
    domain: "style",
  },
  {
    id: "style-09",
    name: "Mặc theo dịp — sự kiện trang trọng",
    triggers: [
      "mặc gì khi đi sự kiện trang trọng",
      "quy tắc ăn mặc trang trọng là gì",
      "không biết có nên mặc đẹp không",
    ],
    zone: "GU",
    content:
      "Khi không chắc về quy tắc ăn mặc: mặc quá chỉnh nhẹ tốt hơn mặc quá đơn giản. Nhìn quá lịch sự dễ điều chỉnh hơn nhìn quá thoải mái. Nếu thiệp mời không nói rõ quy tắc ăn mặc, hỏi trực tiếp người tổ chức — đó không phải câu hỏi ngại.",
    why: "Etiquette principle — overdressing at formal events is always safer than underdressing.",
    level: "Evergreen",
    domain: "style",
  },

  // ─── MẺ 4: ĂN UỐNG Ở NHÀ HÀNG ───────────────────────────────

  {
    id: "dining-01",
    name: "Quy tắc ngoài-vào — dùng dụng cụ đúng",
    triggers: [
      "dùng dao nĩa thế nào ở nhà hàng",
      "nhiều dao nĩa trên bàn dùng cái nào",
      "nghi thức ăn uống cơ bản",
    ],
    zone: "GU",
    content:
      "Dùng dụng cụ từ ngoài vào trong theo từng món: ngoài cùng là dụng cụ cho món đầu tiên (salad, soup), trong cùng là cho món chính. Dao luôn bên phải (lưỡi quay vào trong về phía đĩa), nĩa bên trái. Muỗng soup bên phải ngoài cùng.",
    why: "Chuẩn Emily Post — outside-in rule là quy ước dining etiquette phổ biến nhất ở Western fine-dining.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-02",
    name: "Ngôn ngữ dao nĩa",
    triggers: [
      "đặt dao nĩa thế nào khi ăn xong",
      "làm sao để phục vụ biết mình xong",
      "cách đặt dao nĩa đúng",
    ],
    zone: "GU",
    content:
      "Đặt dao và nĩa chéo nhau hình chữ X = đang nghỉ, chưa ăn xong. Đặt song song ở vị trí 10 giờ-4 giờ (như kim đồng hồ) = đã ăn xong, phục vụ có thể dọn. Tín hiệu này được hiểu ở hầu hết nhà hàng có phục vụ.",
    why: "Chuẩn quốc tế về ngôn ngữ dao nĩa — giúp giao tiếp với phục vụ mà không cần nói (finedininglovers, Emily Post).",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-03",
    name: "Khăn ăn — đúng cách",
    triggers: [
      "dùng khăn ăn thế nào",
      "khăn ăn ở nhà hàng để đâu",
      "khi rời bàn ăn thì để khăn ở đâu",
    ],
    zone: "GU",
    content:
      "Ngồi xuống: trải khăn ăn lên đùi ngay. Khi cần rời bàn tạm thời: đặt khăn gọn nhẹ lên ghế (không phải bàn) — nghĩa là bạn sẽ quay lại. Kết thúc bữa: đặt khăn sang bên trái đĩa ăn — không cần gấp gọn. Dùng chấm nhẹ môi, không chà.",
    why: "Emily Post Institute — khăn ăn là tín hiệu giao tiếp trong bữa ăn, không chỉ là vật dụng thực tế.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-04",
    name: "Bánh mì trái, đồ uống phải",
    triggers: [
      "đĩa bánh mì của mình là cái nào",
      "ly nước của mình bên nào",
      "bàn ăn nhiều người dùng đồ nào",
    ],
    zone: "GU",
    content:
      "Đĩa bánh mì luôn bên trái đĩa chính. Ly uống luôn bên phải. Mẹo nhớ: chữ \"b\" (bread) viết giống hướng trái, chữ \"d\" (drink) viết giống hướng phải. Khi bàn đông người, chạm vào đĩa/ly trái trước để xác nhận trước khi lấy.",
    why: "Emily Post — quy ước bàn ăn chuẩn Western để tránh nhầm lẫn đồ của người ngồi cạnh.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-05",
    name: "Muỗng soup — đúng cách",
    triggers: [
      "ăn súp thế nào cho đúng",
      "múc súp hướng nào",
      "không được thổi súp à",
    ],
    zone: "GU",
    content:
      "Múc soup theo hướng ra xa bạn (không phải kéo về phía mình). Không thổi để nguội và không nhấc bát lên uống trực tiếp trong ăn uống cao cấp. Nếu còn ít ở đáy, có thể nghiêng bát nhẹ ra phía ngoài để múc.",
    why: "Classic dining etiquette — quy ước này có từ lâu và vẫn được áp dụng ở Western formal dining.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-06",
    name: "Gọi phục vụ đúng cách",
    triggers: [
      "gọi phục vụ thế nào",
      "cách gọi phục vụ không bất lịch sự",
      "làm sao để phục vụ chú ý",
    ],
    zone: "GU",
    content:
      "Gọi phục vụ bằng giao tiếp bằng mắt hoặc giơ tay nhẹ nhàng — không gọi to qua phòng hoặc kêu \"phục vụ!\" Ở nhiều nơi cách gọi to được coi là thô. Kiên nhẫn chờ nhân viên đi ngang qua tầm nhìn của bạn.",
    why: "Dining etiquette consensus — cách gọi phục vụ phản ánh cách bạn đối xử với người phục vụ.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-07",
    name: "Tiền boa tại VN",
    triggers: [
      "có cần tiền boa ở VN không",
      "tiền boa bao nhiêu ở nhà hàng VN",
      "ăn uống cao cấp VN có tiền boa không",
    ],
    zone: "GU",
    content:
      "VN không có văn hóa tiền boa bắt buộc — nhưng đang phổ biến dần ở ăn uống cao cấp và nhà hàng cao cấp. 5-10% hoặc làm tròn hóa đơn là phù hợp nếu muốn. Không tiền boa cũng không bất lịch sự.",
    why: "VN dining observation — phân biệt với chuẩn Mỹ/Canada (15-20%) vì bối cảnh khác nhau.",
    level: "Inference",
    domain: "dining",
  },
  {
    id: "dining-08",
    name: "Ai trả tiền",
    triggers: [
      "ai trả tiền khi đi ăn nhóm",
      "khó xử lúc tính tiền thế nào",
      "người mời có phải trả tiền không",
    ],
    zone: "GU",
    content:
      "Người mời = người trả. Nếu không rõ ai mời ai, hỏi trước khi đến hoặc ngay đầu bữa — \"mình chia đôi hay bạn muốn?\" Tránh để câu hỏi đó xuất hiện lúc bill ra vì lúc đó khó xử hơn nhiều.",
    why: "Social etiquette principle — làm rõ sớm tránh tình huống khó xử.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-09",
    name: "Theo chủ tiệc khi gọi món",
    triggers: [
      "gọi mấy món thì phù hợp",
      "gọi đắt hơn người mời có sao không",
      "không biết gọi gì ở nhà hàng lạ",
    ],
    zone: "GU",
    content:
      "Nếu có chủ tiệc (người mời, người dẫn), để ý họ gọi bao nhiêu món rồi theo mức đó. Tránh gọi nhiều hơn hoặc đắt hơn chủ tiệc rõ rệt. Nếu không chắc, gọi khoảng giữa menu là an toàn.",
    why: "Dining etiquette consensus — follow the host là nguyên tắc lịch sự cơ bản trong bữa ăn có người mời.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-10",
    name: "Điện thoại trên bàn ăn",
    triggers: [
      "điện thoại khi ăn với người khác",
      "có nên để điện thoại trên bàn không",
      "dùng điện thoại lúc ăn có bất lịch sự không",
    ],
    zone: "GU",
    content:
      "Điện thoại úp xuống hoặc cất vào túi khi ngồi ăn với người khác. Kiểm tra sau bữa ăn. Điện thoại mặt lên trên bàn, dù không dùng, vẫn phát tín hiệu \"thứ này quan trọng hơn người ngồi trước mặt mình.\"",
    why: "Emily Post guidance — hiện diện trong bữa ăn là hình thức tôn trọng người cùng bàn.",
    level: "Evergreen",
    domain: "dining",
  },
  {
    id: "dining-11",
    name: "Đặt bàn và đúng giờ",
    triggers: [
      "ăn uống cao cấp cần đặt bàn trước không",
      "trễ bao nhiêu phút thì ổn",
      "đến sớm hay đúng giờ khi đi ăn nhà hàng",
    ],
    zone: "GU",
    content:
      "Đặt bàn trước cho nhà hàng ăn uống cao cấp. Đến đúng giờ hoặc sớm 5 phút — nhà hàng tốt thường giữ bàn 15 phút sau giờ hẹn. Nếu biết sẽ trễ, gọi báo trước.",
    why: "Dining etiquette consensus — đúng giờ là hình thức tôn trọng cả nhà hàng lẫn người đi cùng.",
    level: "Evergreen",
    domain: "dining",
  },

  // ─── MẺ 5: XÃ GIAO & KỸ NĂNG SỐNG ──────────────────────────

  {
    id: "social-01",
    name: "Phương pháp FORD cho trò chuyện xã giao",
    triggers: [
      "không biết nói gì khi gặp người lạ",
      "làm sao để bắt chuyện",
      "trò chuyện xã giao khó xử phải làm gì",
    ],
    zone: "GU",
    content:
      "Bốn chủ đề an toàn cho trò chuyện xã giao: Family (gia đình — hỏi thăm nhẹ), Occupation (nghề nghiệp — gì đang làm), Recreation (sở thích, giải trí), Dreams (mong muốn, kế hoạch). Khi không biết nói gì tiếp theo, chọn một trong bốn chữ F-O-R-D để đặt câu hỏi.",
    why: "FORD method là công cụ giao tiếp kinh điển — tạo ra chủ đề tự nhiên mà không xâm phạm vào vùng nhạy cảm.",
    level: "Evergreen",
    trait: "Introversion (cần chuẩn bị cấu trúc hơn extrovert)",
    domain: "social",
  },
  {
    id: "social-02",
    name: "Hỏi tiếp — trò chuyện xã giao thật sự",
    triggers: [
      "trò chuyện xã giao cứ nói được vài câu là hết",
      "làm sao để cuộc trò chuyện tự nhiên",
      "cải thiện kỹ năng nói chuyện",
    ],
    zone: "GU",
    content:
      "Kỹ năng thật của trò chuyện xã giao không phải biết nhiều chủ đề — mà là hỏi câu tiếp theo sau khi người kia trả lời. \"Hay đó — sao bạn bắt đầu làm vậy?\" hay \"Như thế nào rồi?\" cho thấy bạn đang thật sự nghe, không chỉ chờ đến lượt mình nói.",
    why: "Carnegie \"How to Win Friends and Influence People\" — genuine interest là nền tảng của giao tiếp tốt.",
    level: "Book",
    domain: "social",
  },
  {
    id: "social-03",
    name: "80/20 — nghe nhiều hơn nói",
    triggers: [
      "cách gây ấn tượng tốt khi gặp người mới",
      "lần đầu gặp người quan trọng",
      "nói ít có bị đánh giá không",
    ],
    zone: "GU",
    content:
      "Trong lần đầu gặp gỡ, nghe 80% và nói 20%. Người ta nhớ bạn tốt hơn khi được nói nhiều — không phải khi nghe bạn nói nhiều. Đây là nghịch lý nhưng đúng theo quan sát.",
    why: "Carnegie \"How to Win Friends\" — classic principle về making people feel valued through genuine listening.",
    level: "Book",
    domain: "social",
  },
  {
    id: "social-04",
    name: "Gọi tên trong cuộc trò chuyện",
    triggers: [
      "cách để người khác nhớ mình",
      "mẹo giao tiếp để tạo kết nối",
      "làm sao để nói chuyện tự nhiên hơn",
    ],
    zone: "GU",
    content:
      "Gọi tên người trong cuộc trò chuyện 2-3 lần — không phải mỗi câu, sẽ nghe gượng. Chỉ cần tự nhiên, ví dụ \"Như bạn vừa nói, Minh...\" hay \"Cảm ơn Lan nhé.\" Tên là âm thanh người ta luôn chú ý đến.",
    why: "Carnegie — gọi tên là một trong những nguyên tắc giao tiếp hiệu quả nhất và đơn giản nhất để tạo kết nối.",
    level: "Book",
    domain: "social",
  },
  {
    id: "social-05",
    name: "Kết thúc cuộc trò chuyện đúng cách",
    triggers: [
      "làm sao để thoát khỏi cuộc trò chuyện",
      "kết thúc gặp gỡ mà không khó xử",
      "rời đi lịch sự",
    ],
    zone: "GU",
    content:
      "Kết thúc bằng báo trước cho lần sau: \"Tôi muốn nghe thêm về dự án của bạn lần sau — hôm nay vui được gặp bạn!\" Cách này đóng cửa lịch sự và để lại ấn tượng tốt. Tránh rút ra trong khi người kia vẫn đang nói hoặc nhìn điện thoại.",
    why: "Social etiquette principle — how you leave a conversation affects how you're remembered.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-06",
    name: "Giới thiệu người — đúng thứ tự",
    triggers: [
      "giới thiệu người như thế nào",
      "giới thiệu ai trước khi gặp nhóm",
      "cách giới thiệu người cho người",
    ],
    zone: "GU",
    content:
      "Giới thiệu người trẻ hơn hoặc cấp dưới cho người lớn hơn hoặc cấp cao hơn trước — \"Chị ơi, đây là em A, đang thực tập tại công ty.\" Khi không chắc, giới thiệu người bạn biết ít hơn cho người bạn biết nhiều hơn.",
    why: "Emily Post Institute — thứ tự giới thiệu thể hiện sự tôn trọng đúng mức.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-07",
    name: "Bắt tay đúng cách",
    triggers: [
      "bắt tay thế nào",
      "bắt tay mạnh hay nhẹ",
      "bắt tay khi gặp đối tác",
    ],
    zone: "GU",
    content:
      "Bắt tay vừa đủ — không quá nhẹ (nghe thiếu tự tin), không bóp chặt (nghe aggressive). Hai đến ba giây, mắt nhìn thẳng, mỉm cười nhẹ. Đứng dậy nếu đang ngồi khi bắt tay lần đầu. Ở VN/Á: gật đầu và mỉm cười là hoàn toàn phù hợp khi bắt tay không thuận tiện.",
    why: "Emily Post — handshake là tín hiệu đầu tiên về sự tự tin và chuyên nghiệp trong giao tiếp.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-08",
    name: "Nhận danh thiếp — đặc biệt với người Á Đông",
    triggers: [
      "nhận danh thiếp thế nào",
      "gặp đối tác Nhật Hàn cần chú ý gì",
      "nghi thức danh thiếp",
    ],
    zone: "GU",
    content:
      "Nhận card bằng hai tay, nhìn card 2-3 giây trước khi cất — đọc tên và chức vụ, không cất ngay vào túi. Với đối tác Nhật, Hàn, Trung: đây là chi tiết quan trọng thể hiện sự tôn trọng. Không viết lên card khi người đó còn đó.",
    why: "Business etiquette Asia — trong văn hóa Á Đông, name card mang theo danh dự người tặng.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-09",
    name: "Đúng giờ — quy tắc thực tế",
    triggers: [
      "trễ bao nhiêu là được",
      "đúng giờ quan trọng không",
      "hay bị trễ không biết làm sao",
    ],
    zone: "GU",
    content:
      "Đến sớm 5 phút = đúng giờ. Đến đúng giờ = hơi muộn. Đến muộn 10 phút mà không báo trước = không tôn trọng thời gian người khác. Nếu biết sẽ trễ, nhắn trước khi hết giờ hẹn — không phải lúc sắp đến.",
    why: "Time etiquette principle — đúng giờ là hình thức tôn trọng cơ bản và dễ thực hiện nhất.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-10",
    name: "Cảm ơn cụ thể",
    triggers: [
      "cách cảm ơn đúng",
      "cảm ơn có cần cụ thể không",
      "sau khi được giúp đỡ thì làm gì",
    ],
    zone: "GU",
    content:
      "\"Cảm ơn\" chung chung kém hiệu quả hơn nhiều so với cảm ơn cụ thể: \"Cảm ơn chị Lan vì đã giới thiệu mình với team — nhờ vậy mình kết nối được đúng người.\" Sau bữa tối được mời hoặc được giúp đỡ lớn: nhắn cảm ơn trong vòng 24 giờ.",
    why: "Carnegie + Emily Post — cảm ơn cụ thể thể hiện bạn thật sự chú ý và trân trọng, không phải xã giao.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-11",
    name: "Làm khách — đừng đến tay không",
    triggers: [
      "mang gì khi được mời đến nhà",
      "làm khách thế nào cho lịch sự",
      "đến nhà người khác có cần mang gì không",
    ],
    zone: "GU",
    content:
      "Mang theo gì đó nhỏ khi được mời đến nhà người khác — bánh, nến nhỏ, đồ uống, hoa nhỏ — dù chủ tiệc nói \"không cần mang gì.\" Sau khi về, nhắn cảm ơn trong vòng 24 giờ. Đề nghị giúp dọn dẹp một lần — nếu chủ tiệc từ chối, không ép tiếp.",
    why: "Social etiquette consensus — cử chỉ nhỏ này thể hiện bạn coi trọng sự mời mọc, không phải phép lịch sự rỗng.",
    level: "Evergreen",
    domain: "social",
  },
  {
    id: "social-12",
    name: "Nhớ tên người mới gặp",
    triggers: [
      "hay quên tên người mới gặp",
      "mẹo nhớ tên",
      "gặp nhiều người cùng lúc làm sao nhớ",
    ],
    zone: "GU",
    content:
      "Khi gặp người mới: nhắc tên họ ngay trong câu đầu tiên — \"Rất vui được gặp bạn, Minh!\" Trong đầu, liên kết tên với người hoặc thứ bạn đã biết (\"Minh — như anh họ mình\"). Dùng tên một lần trong 5 phút đầu sẽ giúp nhớ lâu hơn nhiều.",
    why: "Memory technique + Carnegie — repetition và association là hai cơ chế nhớ tên hiệu quả nhất.",
    level: "Evergreen",
    trait: "Introversion (cần kỹ thuật cụ thể hơn để xử lý thông tin xã hội)",
    domain: "social",
  },
  {
    id: "social-13",
    name: "Giao tiếp bằng mắt và lắng nghe chủ động",
    triggers: [
      "cách để người khác cảm thấy được lắng nghe",
      "làm sao để nghe tập trung hơn",
      "kỹ năng lắng nghe tốt",
    ],
    zone: "GU",
    content:
      "Gật đầu nhẹ và duy trì giao tiếp bằng mắt khoảng 60-70% thời gian khi nghe — đủ để thể hiện bạn đang tập trung, không phải nhìn chằm chằm. Sau khi người kia nói xong, diễn đạt lại một câu điều bạn hiểu: \"Nếu mình hiểu đúng, bạn đang nói...\" — cách này thể hiện bạn đã nghe thật, không phải nghe hờ.",
    why: "Active listening research — paraphrasing và eye contact là hai chỉ số mạnh nhất của genuine listening.",
    level: "Evergreen",
    trait: "Extraversion (thường bỏ qua bước này vì muốn nói nhanh)",
    domain: "social",
  },
  {
    id: "social-14",
    name: "Nhận quà — khác biệt văn hóa",
    triggers: [
      "có nên mở quà trước mặt người tặng không",
      "nhận quà thế nào cho lịch sự",
      "VN và Tây khác nhau về nhận quà",
    ],
    zone: "GU",
    content:
      "Ở VN và nhiều nước Á Đông: thông thường không mở quà ngay trước mặt người tặng — để tránh tình huống khó xử nếu phản ứng không như kỳ vọng. Ở sự kiện Western hoặc khi người tặng rõ ràng muốn bạn mở: mở ngay và phản ứng genuine. Khi không chắc, hỏi nhẹ: \"Mình mở bây giờ hay để sau ạ?\"",
    why: "Cultural nuance — nhận biết sự khác biệt văn hóa tránh được hiểu lầm trong giao tiếp đa văn hóa.",
    level: "Inference",
    domain: "social",
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

export function getSavoirEntryById(id: string): KBEntry | undefined {
  return KB_SAVOIRFAIRE.find((e) => e.id === id)
}

export function getSavoirEntriesByDomain(domain: string): KBEntry[] {
  return KB_SAVOIRFAIRE.filter((e) => e.domain === domain)
}

export function searchSavoirByTrigger(query: string): KBEntry[] {
  const q = query.toLowerCase()
  return KB_SAVOIRFAIRE.filter((e) =>
    e.triggers.some((t) => t.toLowerCase().includes(q))
  )
}

export const SAVOIR_DOMAINS = [
  "style",   // phong cách / mặc đồ
  "dining",  // ăn uống ở nhà hàng
  "social",  // xã giao & kỹ năng giao tiếp
] as const

export type SavoirDomain = (typeof SAVOIR_DOMAINS)[number]

/**
 * NOTE: Mẻ 2 (rượu vang) và Mẻ 3 (food pairing với rượu) không có trong file này.
 * Theo nguyên tắc content: bỏ phần rượu/cồn.
 * Nếu cần mở rộng sau, PM quyết định riêng.
 */
