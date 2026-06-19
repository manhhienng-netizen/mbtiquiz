/**
 * KB — Tình Cảm / Quan Hệ (Mẻ 1–5)
 * Tạo: 02/06/2026
 * Nguồn: datamining-relationships-me1-5-01062026.md
 * Tổng: 23 entry (rel-01 → rel-23)
 * Framework: Attachment theory (Bowlby/Hazan-Shaver), Gottman, Big Five
 */

export type KBZone = "GU" | "PROTECTIVE"
export type KBLevel =
  | "Research"
  | "Book"
  | "Official"
  | "Inference"
  | "Research_LowEvidence"

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

export const KB_RELATIONSHIPS: KBEntry[] = [

  // ─── MẺ 1: GIAI ĐOẠN QUAN HỆ ─────────────────────────────────

  {
    id: "rel-01",
    name: "Si mê đơn phương (limerence)",
    triggers: [
      "mình cứ nghĩ về người ta mãi",
      "si mê đơn phương có bình thường không",
      "crush mà cứ xoáy trong đầu",
    ],
    zone: "GU",
    content:
      "Cảm giác cứ nghĩ mãi về một người, lên xuống theo từng tin nhắn nhỏ — đây là trạng thái si mê đơn phương (limerence), một hiện tượng tâm lý có tên hẳn hoi. Nó khuếch đại mọi tín hiệu, lý tưởng hóa người kia, và tạo ra cảm giác gần như nghiện. Không phải yếu đuối, không phải \"thần kinh\" — chỉ là bộ não đang ở chế độ hưng phấn cao bất thường.",
    why: "Dorothy Tennov đặt tên hiện tượng này năm 1979; nghiên cứu của Helen Fisher xác nhận cơ chế não tương tự trạng thái nghiện nhẹ (Tennov \"Love and Limerence\", Fisher neuroscience).",
    level: "Research",
    trait: "Anxious attachment (khuếch đại mạnh hơn)",
    domain: "stage",
  },
  {
    id: "rel-02",
    name: "Hiệu ứng hào quang khi cảm nắng",
    triggers: [
      "sao crush của mình hoàn hảo vậy",
      "mình có đang tưởng tượng ra không",
    ],
    zone: "GU",
    content:
      "Khi cảm nắng ai đó, não bạn tự động tô màu họ đẹp hơn thực tế — gọi là hiệu ứng hào quang. Bạn sẽ đọc những điểm tốt nhiều hơn, bỏ qua điểm xấu, và giải thích mọi thứ theo hướng có lợi cho họ. Điều này xảy ra với tất cả mọi người, không phân biệt ai.",
    why: "Halo effect được xác nhận từ nghiên cứu của Nisbett & Wilson 1977 — một đặc điểm tích cực làm tăng đánh giá tổng thể về người đó.",
    level: "Research",
    domain: "stage",
  },
  {
    id: "rel-03",
    name: "Giai đoạn tán tỉnh mập mờ và theo dõi lướt qua",
    triggers: [
      "người ta theo dõi mà không nhắn",
      "mập mờ mãi không tiến tới",
      "quan hệ mập mờ là gì",
    ],
    zone: "GU",
    content:
      "Theo dõi lướt qua — theo dõi nhưng không nhắn — thường là cách giữ một người trong tầm tay mà không cần cam kết. Giai đoạn tán tỉnh mập mờ kéo dài thường có lợi cho một bên và gây mệt mỏi cho bên kia. Người có kiểu gắn bó an toàn thường rời đi nếu tình huống không rõ ràng — không phải vì lạnh lùng, mà vì họ biết mình cần gì.",
    why: "Attachment theory giải thích orbiting như avoidant behavior — muốn duy trì option mà không bị ràng buộc (Hazan & Shaver 1987, anniewright.com).",
    level: "Research",
    trait: "Avoidant attachment",
    domain: "stage",
  },
  {
    id: "rel-04",
    name: "Lo âu – né tránh trong quan hệ mập mờ",
    triggers: [
      "mình cứ cần được trấn an còn người ta cứ lùi",
      "tại sao cứ lặp đi lặp lại vậy",
      "quan hệ đẩy-kéo",
    ],
    zone: "GU",
    content:
      "Kiểu lo âu càng cần thêm, kiểu né tránh càng lùi. Né tránh lùi xong, lo âu dịu lại, né tránh quay lại — rồi vòng lặp bắt đầu. Đây là kiểu phổ biến nhất và cũng gây mệt mỏi nhất trong quan hệ mập mờ. Không phải người kia xấu tính, cũng không phải bạn có vấn đề — đây là hai cơ chế gắn kết va nhau theo cách có thể đoán trước.",
    why: "Anxious-avoidant cycle được ghi nhận rộng rãi trong nghiên cứu attachment — mỗi bên kích hoạt đúng nỗi sợ lớn nhất của bên kia (houston-therapy.com, Levine & Heller \"Attached\").",
    level: "Research",
    trait: "Anxious attachment × Avoidant attachment",
    domain: "stage",
  },
  {
    id: "rel-05",
    name: "Hẹn hò buổi đầu và ấn tượng đầu",
    triggers: [
      "hẹn hò lần đầu phải làm sao",
      "bị lo lắng khi gặp người mới",
    ],
    zone: "GU",
    content:
      "Ấn tượng đầu được hình thành rất nhanh — não người đọc hai tín hiệu chính: bạn có vẻ ấm áp không, và bạn có vẻ năng lực không. Lo lắng lộ rõ — người đối diện thường cảm nhận được dù không nói ra. Không phải lý do để diễn, mà là lý do để tìm cách thật sự thoải mái hơn thay vì cố kiểm soát ấn tượng.",
    why: "Amy Cuddy (Harvard, 2012) xác định warmth + competence là hai tín hiệu cốt lõi trong đánh giá người lạ; nghiên cứu speed-dating (ScienceDirect 2022) cho thấy anxious attachment ảnh hưởng đến cách người khác perceive bạn ngay buổi đầu.",
    level: "Research",
    trait: "Anxious attachment, Introversion",
    domain: "stage",
  },
  {
    id: "rel-06",
    name: "Chia tay và vượt qua",
    triggers: [
      "bao lâu thì hết đau sau chia tay",
      "sao người kia có vẻ ổn hơn mình nhiều",
    ],
    zone: "GU",
    content:
      "Trung bình khoảng 11 tuần để cảm thấy ổn hơn sau chia tay — nhưng con số này dao động rất nhiều, và người có kiểu gắn bó lo âu thường lâu hơn đáng kể. Người né tránh trông có vẻ \"ổn nhanh\" bề ngoài — nhưng thường chỉ là kìm nén, cảm xúc thật có thể xuất hiện trễ 1-2 tháng sau.",
    why: "Journal of Positive Psychology 2007 nghiên cứu thời gian phục hồi sau chia tay; Hazan-Shaver và attachment theory giải thích sự khác biệt giữa các styles.",
    level: "Research",
    trait: "Anxious attachment (lâu hơn), Avoidant attachment (suppress trước)",
    domain: "stage",
  },
  {
    id: "rel-07",
    name: "Gắn bó an toàn hình thành sau — kiểu gắn bó có thể thay đổi",
    triggers: [
      "kiểu gắn bó có thể thay đổi không",
      "mình muốn bớt lo âu trong quan hệ",
    ],
    zone: "GU",
    content:
      "Kiểu gắn bó không phải số phận cố định. Nghiên cứu cho thấy người từng có kiểu gắn bó không an toàn có thể trở nên gắn bó an toàn hình thành sau — thường thông qua trị liệu, tự nhận thức, hoặc trải nghiệm trong một quan hệ an toàn và nhất quán. Điều này đòi hỏi công sức thật, nhưng không phải không thể.",
    why: "Daniel Siegel \"The Developing Mind\" và Wallin \"Attachment in Psychotherapy\" — earned security là concept được xác nhận trong nghiên cứu attachment.",
    level: "Research",
    domain: "stage",
  },

  // ─── MẺ 2: VẤN ĐỀ TRONG QUAN HỆ ─────────────────────────────

  {
    id: "rel-08",
    name: "Chỉ trích vs Phàn nàn",
    triggers: [
      "hay chỉ trích người yêu",
      "cãi nhau xong cảm thấy tệ hơn",
      "cách nói chuyện trong cãi nhau",
    ],
    zone: "GU",
    content:
      "Có sự khác biệt quan trọng giữa phàn nàn về hành vi (được) và tấn công tính cách (không được). Phàn nàn: \"Anh không dọn nhà hôm nay làm em bực.\" Chỉ trích: \"Anh luôn luôn lười biếng.\" Một câu nhắm vào việc cụ thể, câu kia nhắm vào con người. Cách thay thế: bắt đầu bằng \"mình thấy X, mình cần Y.\"",
    why: "Gottman nghiên cứu hàng nghìn cặp đôi trong vài thập kỷ — criticism (tấn công character) là một trong bốn yếu tố dự báo tan vỡ mạnh nhất (gottman.com).",
    level: "Research",
    trait: "High Neuroticism, Anxious attachment",
    domain: "conflict",
  },
  {
    id: "rel-09",
    name: "Khinh miệt — nguy hiểm nhất",
    triggers: [
      "hay coi thường nhau",
      "cãi nhau mà thấy khinh đối phương",
      "mỉa mai trong quan hệ",
    ],
    zone: "GU",
    content:
      "Khinh miệt — coi thường, khinh bỉ, chế giễu, đảo mắt — là tín hiệu nguy hiểm nhất trong một quan hệ. Không phải cãi nhau nhiều mới là dấu hiệu xấu, mà là khi một bên (hoặc cả hai) bắt đầu thấy đối phương \"thấp kém hơn.\" Cách khắc phục là xây dựng lại văn hóa ghi nhận và trân trọng nhau trong ngày thường, không chỉ lúc cãi nhau.",
    why: "Trong nghiên cứu của Gottman, contempt là yếu tố đơn lẻ dự báo ly hôn mạnh nhất — mạnh hơn tần suất cãi nhau (gottman.com, empathi.com).",
    level: "Research",
    domain: "conflict",
  },
  {
    id: "rel-10",
    name: "Im lặng rút lui và quá tải thần kinh",
    triggers: [
      "người yêu im lặng khi cãi nhau",
      "mình tắt máy khi cãi nhau",
      "cần làm gì khi không muốn nói nữa",
    ],
    zone: "GU",
    content:
      "Im lặng rút lui — im lặng, rút lui khỏi cuộc trò chuyện — thường xảy ra khi nhịp tim vượt 100 bpm và não không còn xử lý được hiệu quả. Không phải thao túng, mà là hệ thần kinh bị quá tải. Cách khắc phục: hai bên đồng ý tạm dừng 20–30 phút để thật sự dịu lại — không phải để thắng, mà để có thể tiếp tục sau đó.",
    why: "Gottman xác định physiological flooding là cơ chế đằng sau stonewalling — não ở trạng thái fight-or-flight không thể process information mới (rousetherapy.com, gottman.com).",
    level: "Research",
    trait: "Avoidant attachment, High Neuroticism",
    domain: "conflict",
  },
  {
    id: "rel-11",
    name: "Ghen và kiểu gắn bó",
    triggers: [
      "hay ghen vô cớ",
      "ghen nhiều là tại sao",
      "ghen trong quan hệ bình thường không",
    ],
    zone: "GU",
    content:
      "Cảm xúc ghen xuất hiện ở tất cả mọi người — không phân biệt kiểu gắn bó. Sự khác biệt nằm ở cách phản ứng: người lo âu có xu hướng ghen hành vi cao — kiểm tra, hỏi liên tục, thử người yêu. Người né tránh nhận ra mối đe dọa nhưng thường kìm nén thay vì bộc lộ. Cảm giác ghen không phải vấn đề — cách bạn xử lý nó mới là.",
    why: "Nghiên cứu PMC/10659228 cho thấy cảm xúc ghen tương đương nhau giữa các attachment style; behavioral response mới khác nhau.",
    level: "Research",
    trait: "Anxious attachment (behavioral jealousy cao), Avoidant attachment (suppress)",
    domain: "conflict",
  },
  {
    id: "rel-12",
    name: "Ranh giới trong quan hệ",
    triggers: [
      "không biết đặt ranh giới với người yêu",
      "sợ nói không sẽ mất quan hệ",
      "ranh giới quá cứng hay quá mềm",
    ],
    zone: "GU",
    content:
      "Ranh giới quá mềm (nói có khi muốn nói không vì sợ mất người) thường đi cùng kiểu gắn bó lo âu và tính dễ đồng ý cao. Ranh giới quá cứng (không ai vào được) thường đi cùng kiểu né tránh. Ranh giới tốt không phải tường — là cửa bạn tự quyết mở ra khi nào và cho ai.",
    why: "Levine & Heller \"Attached\" — anxious thường mất cảm giác bản thân trong nhu cầu của partner; avoidant dùng \"ranh giới\" như cách giữ khoảng cách cảm xúc.",
    level: "Research",
    trait: "Anxious attachment (ranh giới mềm), Avoidant attachment (ranh giới cứng), High Agreeableness",
    domain: "conflict",
  },
  {
    id: "rel-13",
    name: "5 ngôn ngữ tình yêu — dùng đúng chỗ",
    triggers: [
      "ngôn ngữ tình yêu là gì",
      "người yêu không hiểu mình cần gì",
      "cách thể hiện tình cảm khác nhau",
    ],
    zone: "GU",
    content:
      "5 ngôn ngữ tình yêu (lời khen, hành động, quà, thời gian, tiếp xúc thể chất) là khung phổ biến để nói chuyện về cách mỗi người cảm thấy được yêu. Dùng nó như ngôn ngữ để bắt đầu câu chuyện — \"mình cảm thấy gắn kết hơn khi...\" — không phải như kết luận khoa học cứng nhắc. Bằng chứng nghiên cứu của nó còn hạn chế, nhưng giá trị thực dụng là có.",
    why: "Chapman \"The 5 Love Languages\" 1992 — framework phổ biến, nhưng thiếu RCT mạnh. Giá trị nằm ở việc tạo ngôn ngữ chung, không phải ở độ chính xác khoa học.",
    level: "Research_LowEvidence",
    trait: "Anxious attachment (words of affirmation cao)",
    domain: "conflict",
  },

  // ─── MẺ 3: COMPATIBILITY ──────────────────────────────────────

  {
    id: "rel-14",
    name: "Cái gì thực sự làm quan hệ bền",
    triggers: [
      "mình và người yêu có hợp không",
      "quan hệ bền cần gì",
      "tại sao quan hệ không lâu dài",
    ],
    zone: "GU",
    content:
      "Nghiên cứu trên hàng nghìn cặp đôi cho thấy những gì dự báo quan hệ bền không phải là \"cùng sở thích\" hay \"cùng type tính cách\" — mà là: sự an toàn gắn bó của mỗi người, ổn định cảm xúc (không dễ bùng nổ), khả năng sửa chữa sau xung đột, và giá trị chung. Tỷ lệ tương tác tích cực so với tiêu cực trong lúc cãi nhau cần ở mức ít nhất 5:1.",
    why: "Gottman nghiên cứu 3000+ cặp đôi; kết hợp với Hazan-Shaver attachment research và Big Five studies.",
    level: "Research",
    domain: "compatibility",
  },
  {
    id: "rel-15",
    name: "Neuroticism và quan hệ",
    triggers: [
      "hay xúc động quá mức trong quan hệ",
      "cảm xúc bất ổn ảnh hưởng đến quan hệ không",
    ],
    zone: "GU",
    content:
      "Trong Big Five, Neuroticism (xu hướng bất ổn cảm xúc, lo âu, dễ bùng nổ) là yếu tố dự báo mạnh nhất cho sự không hài lòng trong quan hệ. Chỉ cần một trong hai người có Neuroticism cao là cả hai đều bị ảnh hưởng. Không phải kết án — mà là thông tin: nếu bạn nhận ra mình có xu hướng này, đây là điểm đáng đầu tư công sức nhất.",
    why: "Big Five relationship research — Neuroticism là strongest predictor of relationship dissatisfaction trong nhiều nghiên cứu (quiztype.com, bigfivepersonality.org).",
    level: "Research",
    trait: "High Neuroticism",
    domain: "compatibility",
  },
  {
    id: "rel-16",
    name: "Sự giống nhau và khác nhau trong quan hệ",
    triggers: [
      "trái dấu có hút nhau không",
      "mình khác nhau nhiều quá có ổn không",
      "cần giống nhau đến mức nào",
    ],
    zone: "GU",
    content:
      "Giống nhau trong Conscientiousness (sự cẩn thận, ngăn nắp, kỷ luật) là yếu tố dự báo hài lòng trong hôn nhân mạnh nhất — cách hai người tiếp cận trách nhiệm và kế hoạch hàng ngày ảnh hưởng lớn. Giống nhau trong Openness cũng giúp ích. Còn Extraversion khác nhau không tự động là vấn đề nếu cả hai hiểu và tôn trọng sự khác biệt đó.",
    why: "Caspi 2005, Chopik 2019, mdpi.com/2813-9844 — Conscientiousness similarity là strongest compatibility predictor trong Big Five.",
    level: "Research",
    trait: "Conscientiousness, Openness, Extraversion",
    domain: "compatibility",
  },
  {
    id: "rel-17",
    name: "MBTI và độ hợp — giới hạn của nó",
    triggers: [
      "MBTI nào hợp với MBTI nào",
      "type MBTI của mình có hợp với người yêu không",
    ],
    zone: "GU",
    content:
      "Không có nghiên cứu phản biện nào xác nhận \"type X + Y = tri kỷ.\" Các biểu đồ độ hợp MBTI trên mạng là sản phẩm của cộng đồng, không phải khoa học. MBTI có giá trị thực dụng khác: nó cho bạn ngôn ngữ để nói về sự khác biệt — \"mình cần thời gian một mình để nạp lại\" dễ giải thích hơn là \"mình hướng nội.\" Đó là giá trị thật của nó trong quan hệ.",
    why: "Không có peer-reviewed validation cho MBTI compatibility charts; S/N difference tạo nhiều friction nhất về communication style (earlyyears.tv/mbti-relationships).",
    level: "Research_LowEvidence",
    domain: "compatibility",
  },

  // ─── MẺ 4: GENZ VN SPECIFIC ──────────────────────────────────

  {
    id: "rel-18",
    name: "Bỏ mặc im lặng — tâm lý và tác động",
    triggers: [
      "bị bỏ mặc im lặng rồi phải làm sao",
      "tại sao người ta bỏ mặc im lặng",
      "bỏ mặc im lặng có đau không",
    ],
    zone: "GU",
    content:
      "Bị bỏ mặc im lặng đau theo nghĩa thật — nghiên cứu não học cho thấy từ chối xã hội kích hoạt cùng vùng não với đau thể chất. Người bỏ mặc im lặng thường tránh xung đột (hành vi né tránh) hơn là có ý định ác ý. Điều đó không làm cho nó bớt khó chịu — nhưng có thể giúp bạn không tự hỏi \"mình có vấn đề gì\" quá lâu. Câu trả lời thường là: không phải về bạn.",
    why: "Naomi Eisenberger (UCLA) — nghiên cứu não học về social rejection; attachment theory giải thích anxious attachment hay catastrophize sau khi bị ghost.",
    level: "Research",
    trait: "Anxious attachment (catastrophize cao hơn)",
    domain: "genz",
  },
  {
    id: "rel-19",
    name: "Áp lực gia đình và quan hệ VN",
    triggers: [
      "bị gia đình hỏi bao giờ lấy vợ/chồng",
      "áp lực ra mắt gia đình",
      "gia đình không chấp nhận người yêu",
    ],
    zone: "GU",
    content:
      "Ở Việt Nam, sự chấp thuận của gia đình có trọng lượng lớn hơn nhiều so với văn hóa cá nhân chủ nghĩa. Ra mắt gia đình là cột mốc mang ý nghĩa cam kết nghiêm túc, không phải hình thức. Và áp lực \"phải có người yêu\" từ gia đình và bạn bè là nguồn sợ bỏ lỡ trong quan hệ thật sự — dễ khiến người ta vào quan hệ vì sợ bị bỏ lại hơn là vì thật sự muốn.",
    why: "Hofstede collectivism research; UNFPA Vietnam 2022 data về xu hướng trì hoãn hôn nhân của GenZ VN.",
    level: "Research",
    domain: "genz",
  },
  {
    id: "rel-20",
    name: "Nghịch lý quá nhiều lựa chọn trong app hẹn hò",
    triggers: [
      "dùng app hẹn hò mà không đi đến đâu",
      "quá nhiều lựa chọn mà không chọn được ai",
    ],
    zone: "GU",
    content:
      "Càng nhiều lựa chọn, não càng khó cam kết — đây là nghịch lý quá nhiều lựa chọn. App hẹn hò tạo ra cảm giác luôn có thể có người tốt hơn ở lần vuốt tiếp theo, dẫn đến khó đầu tư thật sự vào bất kỳ ai. Nhận ra kiểu này không giải quyết được nó ngay — nhưng ít nhất bạn biết mình đang bị ảnh hưởng bởi thiết kế của app, không phải bởi \"người đó không đủ tốt.\"",
    why: "Barry Schwartz \"The Paradox of Choice\" — concept được xác nhận rộng rãi; ứng dụng vào dating app là research-informed inference.",
    level: "Research",
    domain: "genz",
  },

  // ─── MẺ 5: AN TOÀN QUAN HỆ ───────────────────────────────────

  {
    id: "rel-21",
    name: "Nhận biết kiểm soát và cô lập",
    triggers: [
      "người yêu kiểm soát mình",
      "bị cấm gặp bạn bè",
      "bị kiểm tra điện thoại liên tục",
    ],
    zone: "PROTECTIVE",
    content:
      "Kiểm soát tài chính, thời gian, và mối quan hệ xã hội — cùng với việc dần tách bạn ra khỏi gia đình và bạn bè — là những dấu hiệu của kiểm soát cưỡng bức, không phải \"yêu nhiều quá.\" Kiểu này thường bắt đầu nhẹ và leo thang dần. Nếu bạn đang nhận ra những điều này, nói chuyện với người bạn tin tưởng ngoài quan hệ đó là bước đầu tiên quan trọng.",
    why: "cvpsd.org, psychcentral.com, sefton.gov.uk — coercive control được ghi nhận là escalate dần, thường bắt đầu bằng isolation trước khi có bạo lực thể chất.",
    level: "Research",
    domain: "safety",
  },
  {
    id: "rel-22",
    name: "Thao túng tâm lý",
    triggers: [
      "người yêu nói mình nhớ sai",
      "bị làm cho nghi ngờ bản thân",
      "không biết mình có đang nghĩ đúng không",
      "thao túng tâm lý",
      "bị thao túng",
      "người ta thao túng mình",
      "thao túng cảm xúc",
      "gaslighting",
      "bị ai đó kiểm soát",
      "làm mình nghi ngờ bản thân",
    ],
    zone: "PROTECTIVE",
    content:
      "Thao túng tâm lý là khi ai đó liên tục khiến bạn nghi ngờ trí nhớ, cảm giác, và thực tế của chính mình — \"bạn nhớ nhầm rồi,\" \"bạn quá nhạy cảm,\" \"không ai nói vậy cả.\" Nếu bạn thường xuyên cảm thấy mình bị rối loạn về những gì thật sự đã xảy ra, đây là tín hiệu đáng chú ý. Tin vào nhật ký hoặc ghi chép của mình, nói chuyện với người ngoài quan hệ đó.",
    why: "nyccounseling.com, sefton.gov.uk — gaslighting được nhận diện là công cụ kiểm soát tâm lý phổ biến trong abusive relationships.",
    level: "Research",
    domain: "safety",
  },
  {
    id: "rel-23",
    name: "Khi cần hỗ trợ về bạo hành",
    triggers: [
      "bị đánh",
      "bị đe dọa",
      "sợ người yêu",
      "không biết phải làm gì khi bị bạo hành",
    ],
    zone: "PROTECTIVE",
    content:
      "Nếu bạn đang trong tình huống nguy hiểm hoặc sợ cho sự an toàn của mình, có người và nơi có thể giúp — bạn không phải xử lý một mình. Nói chuyện với người bạn tin ngoài quan hệ đó là bước đầu; khi cần hỗ trợ chuyên môn hoặc thoát an toàn, dùng đường dây bạo lực gia đình và cấp cứu đã được xác minh (app sẽ gợi ý số cụ thể). CSAGA: csaga.org.vn.",
    why: "CSAGA, Hội LHPNVN (Nhà Bình Yên); nghiên cứu quốc gia VN 2019 ghi nhận tỷ lệ bạo hành gia đình cao (rfa.org/vietnam-domestic-violence).",
    level: "Research",
    domain: "safety",
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

export function getRelEntryById(id: string): KBEntry | undefined {
  return KB_RELATIONSHIPS.find((e) => e.id === id)
}

export function getRelEntriesByDomain(domain: string): KBEntry[] {
  return KB_RELATIONSHIPS.filter((e) => e.domain === domain)
}

export function getProtectiveEntries(): KBEntry[] {
  return KB_RELATIONSHIPS.filter((e) => e.zone === "PROTECTIVE")
}

export function searchRelByTrigger(query: string): KBEntry[] {
  const q = query.toLowerCase()
  return KB_RELATIONSHIPS.filter((e) =>
    e.triggers.some((t) => t.toLowerCase().includes(q))
  )
}

export const REL_DOMAINS = [
  "stage",       // giai đoạn quan hệ
  "conflict",    // vấn đề và xung đột
  "compatibility",
  "genz",        // GenZ VN specific
  "safety",      // protective layer
] as const

export type RelDomain = (typeof REL_DOMAINS)[number]
