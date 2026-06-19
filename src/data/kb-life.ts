/**
 * KB — Life Domains (Thể Thao · Sở Thích · Sách · Kỹ Năng · Thói Quen)
 * Tạo: 02/06/2026
 * Nguồn: life-kb-datamining-01062026.md
 * Tổng: 24 entry (life-01 → life-24)
 * Domain: sport · hobby · books · skills · habits
 *
 * ⚠️ KHÔNG có calo/khẩu phần/mục tiêu cân nặng trong file này.
 * life-24 là PROTECTIVE — redirect chuyên gia khi có dấu hiệu ED.
 * Trait liên quan = inference-level, KHÔNG claim deterministic.
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
}

export const KB_LIFE: KBEntry[] = [

  // ─── DOMAIN A: THỂ THAO / VẬN ĐỘNG ──────────────────────────

  {
    id: "life-01",
    name: "Vận động phù hợp người hướng nội",
    triggers: [
      "người hướng nội nên tập gì",
      "tập thể dục một mình",
      "gym hay lớp nhóm",
    ],
    zone: "GU",
    content:
      "Người hướng nội không cần không gian nhóm để có động lực vận động — ngược lại, vận động một mình thường hiệu quả hơn. Chạy bộ, bơi, gym, yoga, đạp xe một mình, leo núi một mình đều là lựa chọn tốt. Không cần lớp học nhóm nếu không thích — vận động một mình vừa nạp lại năng lượng vừa rèn thể lực.",
    why: "PMC meta-analysis 16 mẫu — người introvert không cần môi trường nhóm để duy trì vận động (Courneya 1998).",
    level: "Research",
    trait: "Introversion, I types (MBTI)",
    domain: "sport",
  },
  {
    id: "life-02",
    name: "Vận động phù hợp người hướng ngoại",
    triggers: [
      "người hướng ngoại nên tập gì",
      "tập thể dục với bạn bè",
      "môn thể thao nhóm",
    ],
    zone: "GU",
    content:
      "Người hướng ngoại có xu hướng duy trì vận động tốt hơn khi có yếu tố xã hội — nhóm, đối tác, hoặc môi trường đông người. Bóng đá, bóng rổ, CrossFit, nhảy nhóm, tennis đôi đều khai thác được điểm này. Cường độ cao cũng phù hợp hơn với người hướng ngoại.",
    why: "Rhodes & Smith 2006 meta-analysis 88,400 người — Extraversion correlate dương với physical activity; Ronca et al 2025 (UCL).",
    level: "Research",
    trait: "Extraversion, E types (MBTI)",
    domain: "sport",
  },
  {
    id: "life-03",
    name: "Vận động phù hợp người có Conscientiousness cao",
    triggers: [
      "tập thể dục theo kế hoạch",
      "gym có lịch tập",
      "chạy marathon",
    ],
    zone: "GU",
    content:
      "Người có tính kỷ luật cao duy trì vận động tốt nhất khi có lịch cụ thể và tiến độ đo được — số rep, km chạy, thời gian. Tập sức mạnh, chạy theo kế hoạch, bơi có lịch đều phù hợp. Không cần ép bản thân \"tự nhiên hơn\" — chạy theo hệ thống là cách bạn hoạt động tốt nhất.",
    why: "Ronca et al 2025 (Frontiers, UCL) — Conscientiousness correlate với adherence trong các bài tập có cấu trúc.",
    level: "Research",
    trait: "High Conscientiousness, J types (MBTI)",
    domain: "sport",
  },
  {
    id: "life-04",
    name: "Vận động phù hợp người lo âu cao",
    triggers: [
      "tập thể thao khi hay lo lắng",
      "vận động giảm căng thẳng",
      "môn thể thao nhẹ nhàng",
    ],
    zone: "GU",
    content:
      "Người có xu hướng lo âu cao thường thấy vận động cường độ cao làm tăng căng thẳng thay vì giảm. Yoga, đi bộ, bơi nhẹ, tai chi là lựa chọn phù hợp hơn — không vì bạn \"yếu\" mà vì hệ thần kinh của bạn phản ứng khác. Các hình thức vận động có yếu tố chánh niệm đặc biệt hiệu quả với người hay lo âu.",
    why: "Rhodes & Smith 2006 — Neuroticism correlate âm với high-intensity exercise; Barrett et al 2019 về mindfulness exercise.",
    level: "Research",
    trait: "High Neuroticism",
    domain: "sport",
  },
  {
    id: "life-05",
    name: "Vận động phù hợp người thích khám phá",
    triggers: [
      "thể thao mạo hiểm",
      "môn thể thao ngoài trời",
      "leo núi hay lướt sóng",
    ],
    zone: "GU",
    content:
      "Người có Openness cao thích trải nghiệm mới và không quen thuộc — đi bộ đường mòn mới, leo đá, võ thuật, phiêu lưu ngoài trời đều khai thác được năng lượng đó. Tránh thói quen lặp đi lặp lại quá nhiều — sự đa dạng giúp duy trì động lực lâu hơn.",
    why: "PMC 2017 — High Openness correlate với preference for outdoor và novel activity; McEwan et al 2019 về high-risk sport và sensation-seeking.",
    level: "Research",
    trait: "High Openness, N types (MBTI)",
    domain: "sport",
  },

  // ─── DOMAIN B: SỞ THÍCH & FLOW ────────────────────────────────

  {
    id: "life-06",
    name: "Dòng chảy (flow) là gì và cách tìm nó",
    triggers: [
      "làm gì để đạt trạng thái dòng chảy",
      "khi nào mình tập trung được nhất",
      "hoạt động cuốn vào không để ý thời gian",
    ],
    zone: "GU",
    content:
      "Dòng chảy (flow) — trạng thái hoàn toàn tập trung và cuốn vào một việc — xảy ra khi thử thách vừa đủ so với kỹ năng của bạn: không quá dễ (gây chán), không quá khó (gây lo lắng). Điều này nghĩa là hoạt động \"hợp tính cách\" chưa đủ — bạn cần ở đúng mức kỹ năng. Khi bạn lên cấp, cần thử thách lớn hơn để duy trì dòng chảy.",
    why: "Csikszentmihalyi \"Flow\" 1990 — lý thuyết nền tảng; challenge-skill balance là cơ chế cốt lõi được xác nhận trong nhiều nghiên cứu sau đó.",
    level: "Research",
    domain: "hobby",
  },
  {
    id: "life-07",
    name: "Sở thích phù hợp người hướng nội và có kỷ luật",
    triggers: [
      "người hướng nội thích làm gì",
      "hoạt động một mình thú vị",
      "sở thích cho người ít nói",
    ],
    zone: "GU",
    content:
      "Viết lách, lập trình, vẽ, đọc sách sâu, nhạc cụ một mình, xếp hình phức tạp, làm mô hình — các hoạt động này cho phép tập trung sâu một mình với feedback tức thì và mục tiêu rõ ràng. Đây là điều kiện lý tưởng để đạt dòng chảy cho người hướng nội và có kỷ luật. Không cần ép mình ra ngoài nhóm để \"phát triển\" nếu những hoạt động này đang nuôi dưỡng bạn.",
    why: "Flow theory (Csikszentmihalyi) + Low Neuroticism và High Conscientiousness correlate với flow proneness (Buseyne 2026 meta-analysis).",
    level: "Research",
    trait: "Introversion, High Conscientiousness, I types và J types (MBTI)",
    domain: "hobby",
  },
  {
    id: "life-08",
    name: "Sở thích phù hợp người thích khám phá và hướng ngoại",
    triggers: [
      "sở thích cho người năng động",
      "hoạt động nhóm thú vị",
      "người hướng ngoại thích làm gì",
    ],
    zone: "GU",
    content:
      "Kịch ứng khẩu, nhóm nhạc, câu lạc bộ tranh biện, du lịch khám phá, trò chơi cờ bàn nhóm — các hoạt động này kết hợp yếu tố xã hội và sự mới mẻ. Người hướng ngoại và Openness cao thường tìm được dòng chảy ở đây dễ hơn. Điều kiện cần: môi trường năng động, đa dạng, có tương tác thật.",
    why: "Inference từ E + Openness traits; Csikszentmihalyi về creativity và exploration activities.",
    level: "Inference",
    trait: "Extraversion, High Openness, E types và N types (MBTI)",
    domain: "hobby",
  },

  // ─── DOMAIN C: SÁCH NÊN ĐỌC ───────────────────────────────────

  {
    id: "life-09",
    name: "Sách cho người hay trì hoãn hoặc thiếu kỷ luật",
    triggers: [
      "sách về thói quen",
      "muốn kỷ luật hơn",
      "sách cho người hay trì hoãn",
    ],
    zone: "GU",
    content:
      "Hai lựa chọn tùy phong cách: \"Atomic Habits\" (James Clear, 2018) tập trung vào xây hệ thống thay vì đặt mục tiêu — phù hợp người muốn khung tổng thể. \"Tiny Habits\" (BJ Fogg, 2019) đề xuất bắt đầu từ thứ cực nhỏ (dưới 30 giây) gắn vào thói quen sẵn có — phù hợp người sợ bắt đầu lớn. Cả hai đều có nền tảng nghiên cứu.",
    why: "Atomic Habits — bestseller rộng rãi; Tiny Habits — từ Stanford Behavior Design Lab của BJ Fogg.",
    level: "Research",
    trait: "Low Conscientiousness, P types (MBTI)",
    domain: "books",
  },
  {
    id: "life-10",
    name: "Sách cho người hay suy nghĩ quá nhiều hoặc lo âu",
    triggers: [
      "sách giảm lo lắng",
      "sách cho người suy nghĩ quá nhiều",
      "đọc gì khi hay lo nghĩ nhiều",
    ],
    zone: "GU",
    content:
      "\"The Power of Now\" (Eckhart Tolle, 1997) — thực hành sống trong hiện tại thay vì chạy về tương lai hoặc quá khứ. \"The Body Keeps the Score\" (Bessel van der Kolk, 2014) — hiểu cách lo âu và trauma ảnh hưởng đến cơ thể, không chỉ tâm trí, và các cách tiếp cận phục hồi. Hai cuốn khác nhau về góc độ nhưng đều hữu ích cho người hay suy nghĩ quá nhiều hoặc lo âu mãn tính.",
    why: "Van der Kolk — nền tảng nghiên cứu trauma; Tolle — bestseller practical/spiritual, áp dụng rộng rãi.",
    level: "Research",
    trait: "High Neuroticism, N types (MBTI)",
    domain: "books",
  },
  {
    id: "life-11",
    name: "Sách cho người hướng nội muốn hiểu bản thân",
    triggers: [
      "sách cho người hướng nội",
      "muốn hiểu tính cách mình",
      "sách về người hướng nội",
    ],
    zone: "GU",
    content:
      "\"Quiet\" (Susan Cain, 2012) — phân tích sức mạnh của người hướng nội trong thế giới ưu tiên hướng ngoại, giúp bạn hiểu tại sao mình hoạt động theo cách đó và không cần phải thay đổi thành người khác.",
    why: "Bestseller với nền tảng research-informed; Susan Cain tổng hợp từ nhiều nghiên cứu về introversion.",
    level: "Research",
    trait: "Introversion, I types (MBTI)",
    domain: "books",
  },
  {
    id: "life-12",
    name: "Sách cho người muốn cải thiện tư duy và ra quyết định",
    triggers: [
      "sách về tư duy",
      "muốn ra quyết định tốt hơn",
      "sách về bias nhận thức",
    ],
    zone: "GU",
    content:
      "\"Thinking, Fast and Slow\" (Daniel Kahneman, 2011) — giải thích hai hệ thống tư duy và các bias nhận thức phổ biến khiến chúng ta ra quyết định sai. Đặc biệt phù hợp với người thích phân tích và muốn hiểu mình đang sai ở đâu trong logic. \"Mindset\" (Carol Dweck, 2006) — nghiên cứu về tư duy phát triển và tư duy cố định từ Stanford, cho người hay tự nghi ngờ hoặc sợ thất bại.",
    why: "Kahneman — Nobel Prize Economics 2002; Dweck — Stanford research, replicated nhiều lần.",
    level: "Research",
    trait: "High Conscientiousness, NT types (MBTI), perfectionism",
    domain: "books",
  },
  {
    id: "life-13",
    name: "Sách về quan hệ và kết nối",
    triggers: [
      "sách về tình cảm",
      "muốn hiểu kiểu quan hệ lặp lại",
      "sách giao tiếp tốt hơn",
    ],
    zone: "GU",
    content:
      "\"Attached\" (Levine & Heller, 2010) — lý thuyết gắn bó ứng dụng vào tình yêu, giúp hiểu tại sao bạn lặp lại cùng một kiểu trong quan hệ. \"Nonviolent Communication\" (Rosenberg, 1999) — cách giao tiếp dựa trên nhu cầu và cảm xúc thay vì phán xét, giúp giảm xung đột. \"Daring Greatly\" (Brené Brown, 2012) — nghiên cứu về sức mạnh của sự dễ bị tổn thương trong kết nối thật sự.",
    why: "Attached — Columbia Psychiatry research-backed; NVC — widely applied, clinical evidence; Daring Greatly — Brown's research program.",
    level: "Research",
    trait: "Anxious attachment, T types muốn hiểu emotional dynamics",
    domain: "books",
  },

  // ─── DOMAIN D: KỸ NĂNG NÊN LUYỆN ─────────────────────────────

  {
    id: "life-14",
    name: "Kỹ năng cho người hướng nội",
    triggers: [
      "kỹ năng giao tiếp cho người hướng nội",
      "cải thiện kết nối mạng lưới",
      "nói chuyện với người lạ",
    ],
    zone: "GU",
    content:
      "Kết nối mạng lưới và trò chuyện xã giao không cần \"trở thành người hướng ngoại\" — cần chuẩn bị cụ thể hơn. Cách thực tế: chuẩn bị 3 câu hỏi trước sự kiện, bắt đầu với một cuộc trò chuyện nhỏ mỗi ngày thay vì ép nhiều cùng lúc. Quyết đoán — nói thẳng nhu cầu của mình thay vì chờ người khác đoán — cũng là kỹ năng đáng đầu tư.",
    why: "Carnegie \"How to Win Friends and Influence People\"; Fogg Tiny Habits — bắt đầu nhỏ để xây thói quen mới.",
    level: "Book",
    trait: "Introversion, I types (MBTI)",
    domain: "skills",
  },
  {
    id: "life-15",
    name: "Kỹ năng cho người hướng ngoại",
    triggers: [
      "cải thiện kỹ năng lắng nghe",
      "hay ngắt lời người khác",
      "muốn suy nghĩ sâu hơn",
    ],
    zone: "GU",
    content:
      "Người hướng ngoại thường xử lý suy nghĩ bằng cách nói — điều này đôi khi làm họ ngắt lời hoặc nói trước khi nghe xong. Luyện im lặng 5 giây trước khi trả lời là thay đổi nhỏ có tác động lớn. Viết nhật ký 5 phút mỗi ngày giúp phát triển khả năng suy ngẫm — thứ người hướng ngoại hay bỏ qua nhưng lại cần để đưa ra quyết định tốt hơn.",
    why: "Crucial Conversations — active listening research; habit research về solo reflection.",
    level: "Book",
    trait: "Extraversion, E types (MBTI)",
    domain: "skills",
  },
  {
    id: "life-16",
    name: "Kỹ năng cho người thiên về lý trí",
    triggers: [
      "cải thiện trí tuệ cảm xúc",
      "muốn hiểu cảm xúc hơn",
      "hay đưa giải pháp khi người ta cần nghe",
    ],
    zone: "GU",
    content:
      "Người thiên về lý trí thường bỏ qua bước đặt câu hỏi về cảm xúc trước khi đưa ra giải pháp — điều này làm người kia cảm thấy không được lắng nghe dù giải pháp đúng. Thay đổi nhỏ: hỏi \"bạn đang cảm thấy thế nào về chuyện này?\" trước khi chuyển sang phân tích. SBI feedback model (Situation-Behavior-Impact) giúp đưa ra phản hồi về hành vi cụ thể thay vì nhận xét về con người.",
    why: "Voss — labeling cảm xúc; Rosenberg NVC — giao tiếp dựa trên nhu cầu và cảm xúc.",
    level: "Book",
    trait: "T types (MBTI), Low Agreeableness",
    domain: "skills",
  },
  {
    id: "life-17",
    name: "Kỹ năng cho người thiên về cảm xúc",
    triggers: [
      "khó nói không với người khác",
      "muốn đặt ranh giới",
      "hay bị lợi dụng vì tốt bụng",
    ],
    zone: "GU",
    content:
      "Quyết đoán — nói thẳng nhu cầu của mình mà không xin lỗi — là kỹ năng cần luyện có chủ đích với người hay ưu tiên cảm xúc người khác. Bắt đầu nhỏ: tập nói \"không\" với một việc nhỏ mỗi tuần. Thay câu \"bạn làm tôi...\" bằng \"tôi cần...\" — cùng nội dung nhưng không tạo ra phòng thủ ở người nghe.",
    why: "Crucial Conversations; Rosenberg NVC — needs-based communication.",
    level: "Book",
    trait: "High Agreeableness, F types (MBTI), Anxious attachment",
    domain: "skills",
  },
  {
    id: "life-18",
    name: "Kỹ năng cho người hay lo âu",
    triggers: [
      "kỹ thuật giảm lo âu",
      "cách xử lý suy nghĩ quá nhiều",
      "thở khi căng thẳng",
    ],
    zone: "GU",
    content:
      "Thở hộp (hít vào 4 giây, giữ 4, thở ra 4, giữ 4) là kỹ thuật có bằng chứng để hạ nhịp tim và giảm phản ứng stress nhanh. Khi bắt đầu nghĩ xấu nhất — viết ra ba kịch bản: tệ nhất có thể xảy ra, tốt nhất có thể, và khả năng nhất thực tế. Thường kịch bản thực tế xa hơn nhiều so với tệ nhất trong đầu bạn.",
    why: "CBT research về cognitive reframing; Barrett et al 2019 về mindfulness và emotion regulation.",
    level: "Research",
    trait: "High Neuroticism",
    domain: "skills",
  },
  {
    id: "life-19",
    name: "Khoa học luyện kỹ năng — luyện tập có chủ đích",
    triggers: [
      "cách học kỹ năng mới hiệu quả",
      "tại sao luyện tập mãi mà không tiến",
      "luyện tập có chủ đích là gì",
    ],
    zone: "GU",
    content:
      "Lặp đi lặp lại nhiều giờ không đảm bảo tiến bộ — điều quan trọng là luyện tập có chủ đích: tập trung vào điểm yếu cụ thể, cần feedback tức thì, và phải nằm ngoài vùng thoải mái hiện tại. Luyện tập thoải mái trong vùng đã giỏi chủ yếu duy trì kỹ năng, không phát triển thêm.",
    why: "K. Anders Ericsson \"Peak\" 2016 — deliberate practice research, nền tảng của khoa học luyện kỹ năng.",
    level: "Research",
    trait: "High Conscientiousness",
    domain: "skills",
  },

  // ─── DOMAIN E: THÓI QUEN LÀNH MẠNH ──────────────────────────

  {
    id: "life-20",
    name: "Bắt đầu thói quen mới đúng cách",
    triggers: [
      "cách tạo thói quen mới",
      "lập thói quen hay bỏ cuộc giữa chừng",
      "muốn duy trì thói quen",
    ],
    zone: "GU",
    content:
      "Thói quen mới dễ dính nhất khi bắt đầu cực nhỏ — dưới 30 giây — và gắn vào thứ đã có sẵn trong ngày: \"Sau khi pha cà phê, tôi sẽ viết một câu nhật ký.\" Ăn mừng ngay sau khi làm (dù nhỏ) giúp não kết nối hành động với cảm xúc tích cực. Ý định thực hiện — quyết định trước \"khi [tình huống X], tôi sẽ [hành động Y]\" — tăng xác suất thực hiện lên 2-3 lần so với chỉ có ý định.",
    why: "Fogg 2019 Stanford Behavior Design Lab; Gollwitzer & Sheeran 2006 meta-analysis về implementation intentions.",
    level: "Research",
    trait: "Low Conscientiousness, P types (MBTI)",
    domain: "habits",
  },
  {
    id: "life-21",
    name: "Vận động — ngưỡng tối thiểu thật sự",
    triggers: [
      "tập bao nhiêu là đủ",
      "không có thời gian tập thể dục",
      "vận động tối thiểu mỗi tuần",
    ],
    zone: "GU",
    content:
      "WHO khuyến nghị 150-300 phút vận động vừa hoặc 75-150 phút vận động mạnh mỗi tuần — nhưng nguyên tắc quan trọng hơn con số là: bất kỳ vận động nào cũng tốt hơn không vận động. Đi bộ 10 phút, lên cầu thang thay thang máy, đứng dậy mỗi giờ — tất cả đều tính. Không cần gym mới gọi là vận động.",
    why: "WHO Physical Activity Guidelines 2020 — tiêu chuẩn toàn cầu.",
    level: "Official",
    domain: "habits",
  },
  {
    id: "life-22",
    name: "Ngủ — nền tảng của mọi thứ khác",
    triggers: [
      "ngủ bao nhiêu là đủ",
      "hay mất ngủ phải làm gì",
      "cải thiện chất lượng giấc ngủ",
    ],
    zone: "GU",
    content:
      "Người trưởng thành cần 7-9 giờ mỗi đêm. Ba thứ ảnh hưởng nhiều nhất đến chất lượng ngủ: giờ ngủ và thức nhất quán (kể cả cuối tuần), phòng tối và mát, không dùng màn hình ít nhất một giờ trước khi ngủ. Thiếu ngủ ảnh hưởng đến tâm trạng, khả năng tập trung, và quyết định nhanh hơn và nặng nề hơn người ta thường nghĩ.",
    why: "National Sleep Foundation; Matthew Walker \"Why We Sleep\" 2017 — tổng hợp nghiên cứu về tầm quan trọng của giấc ngủ.",
    level: "Research",
    trait: "High Neuroticism (dễ bị ảnh hưởng hơn khi thiếu ngủ)",
    domain: "habits",
  },
  {
    id: "life-23",
    name: "Ăn uống — khung tổng quát không hạn chế",
    triggers: [
      "ăn uống lành mạnh là gì",
      "cách ăn tốt cho sức khỏe",
      "muốn ăn khỏe hơn",
    ],
    zone: "GU",
    content:
      "Đa dạng thực phẩm — nhiều rau củ quả, thực phẩm nguyên bản, protein đủ — là khung đơn giản nhất và có bằng chứng nhất. Không cần đếm calo hay cắt bỏ nhóm thực phẩm nào nếu không có lý do y tế cụ thể. Nếu bạn muốn thay đổi chế độ ăn vì mục tiêu sức khỏe cụ thể, gặp bác sĩ hoặc chuyên gia dinh dưỡng là cách hiệu quả và an toàn nhất.",
    why: "Harvard Healthy Eating Plate — khung dựa trên evidence, không phải trend.",
    level: "Research",
    domain: "habits",
  },
  {
    id: "life-24",
    name: "Dấu hiệu cần chú ý về mối quan hệ với thức ăn",
    triggers: [
      "ám ảnh về cân nặng",
      "lo lắng về thức ăn mọi lúc",
      "không kiểm soát được chuyện ăn uống",
    ],
    zone: "PROTECTIVE",
    content:
      "Nếu bạn nhận thấy mình thường xuyên lo lắng về thức ăn hoặc cân nặng đến mức ảnh hưởng đến tâm trạng hàng ngày, tránh ăn cùng người khác, hoặc cảm thấy mất kiểm soát với việc ăn uống — đây là những tín hiệu đáng nói chuyện với chuyên gia, không phải tự xử lý một mình. Bước phù hợp nhất là gặp bác sĩ tâm lý hoặc tâm thần tại bệnh viện (VN chưa có hotline ED chuyên biệt đã verify).",
    why: "NEDA, ANAD, monarchwellness.com — dấu hiệu cảnh báo rối loạn ăn uống được ghi nhận trong clinical literature.",
    level: "Official",
    domain: "habits",
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────

export function getLifeEntryById(id: string): KBEntry | undefined {
  return KB_LIFE.find((e) => e.id === id)
}

export function getLifeEntriesByDomain(domain: string): KBEntry[] {
  return KB_LIFE.filter((e) => e.domain === domain)
}

export function getProtectiveEntries(): KBEntry[] {
  return KB_LIFE.filter((e) => e.zone === "PROTECTIVE")
}

export function searchLifeByTrigger(query: string): KBEntry[] {
  const q = query.toLowerCase()
  return KB_LIFE.filter((e) =>
    e.triggers.some((t) => t.toLowerCase().includes(q))
  )
}

export const LIFE_DOMAINS = [
  "sport",   // thể thao / vận động hợp tính cách
  "hobby",   // sở thích & flow
  "books",   // sách nên đọc
  "skills",  // kỹ năng nên luyện
  "habits",  // thói quen lành mạnh
] as const

export type LifeDomain = (typeof LIFE_DOMAINS)[number]

/**
 * ⚠️ ED Safety — redirect qua tncb-resources-vn-safety (getResourceForSituation('ed')).
 * KHÔNG hardcode số hotline tại đây.
 */
