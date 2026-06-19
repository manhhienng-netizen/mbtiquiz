/**
 * PA KB — STRESS MANAGEMENT DATA
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 4
 *
 * ⚠️ DISCLAIMER bắt buộc mọi nơi hiển thị:
 * "Thông tin hỗ trợ phát triển bản thân · không thay thế chuyên gia tâm lý
 *  Nếu stress kéo dài > 2 tuần + ảnh hưởng sinh hoạt → tìm hỗ trợ"
 *
 * ⚠️ RANH GIỚI PA: nhận diện + kỹ thuật tự hỗ trợ + chuyển tuyến khi cần
 * PA KHÔNG chẩn đoán rối loạn tâm lý · KHÔNG thay thế trị liệu lâm sàng
 *
 * HOTLINES VERIFIED:
 *  ✅ Ngày Mai: 096 306 1414 (13:00-20:30 · T4-CN)
 *  ✅ BV Tâm Thần HCM: 1900 1267 (24/7)
 *  ✅ Bạch Mai: (024) 3576 5344
 *  ✅ 111 (Trẻ em 24/7 miễn phí)
 *  ✅ CSAGA: 024 3333 5599
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── TYPES ────────────────────────────────────────────────

export interface DiagnosticSigns {
  physical: string[]
  emotional: string[]
  behavioral: string[]
  cognitive: string[]
}

export interface ImmediateTechnique {
  name: string
  steps: string
  science: string
  duration: string
}

export interface StressRecognition {
  stressTypes: string[]
  signs: DiagnosticSigns
  vietnameseContext: string
  urbanLonelinessNote: string
}

// ─── NHẬN DIỆN STRESS THEO MBTI ──────────────────────────

export const STRESS_RECOGNITION: Record<MbtiGroup, StressRecognition> = {
  NT: {
    stressTypes: [
      "Existential stress (áp lực hiện sinh · tìm kiếm ý nghĩa công việc)",
      "Intellectual frustration (ức chế trí tuệ · môi trường tẻ nhạt thiếu kích thích)",
    ],
    signs: {
      physical: ["Đau đầu thắt chặt", "Mất ngủ do suy nghĩ quá mức", "Căng cơ vai gáy", "Rối loạn tiêu hoá"],
      emotional: ["Cảm giác trống rỗng", "Mất kiên nhẫn với mọi người", "Hoài nghi các giá trị sống", "Thờ ơ lạnh lùng"],
      behavioral: ["Thu mình cô lập hoàn toàn", "Trì hoãn công việc", "Sa đà vào tìm kiếm thông tin vô hại online"],
      cognitive: ["Overthinking không dừng được", "Mất khả năng tập trung vào chi tiết", "Tư duy cực đoan hóa (trắng-đen)"],
    },
    vietnameseContext: "Cảm thấy bị vắt kiệt trong môi trường công sở thiếu kích thích tư duy · áp lực tích lũy tài sản mâu thuẫn với nhu cầu ý nghĩa",
    urbanLonelinessNote: "NT tự thoải mái một mình nhưng dễ bị cô lập tri thức · cần ít nhất 1 người có thể tranh biện thật sự",
  },
  NF: {
    stressTypes: [
      "Emotional exhaustion (kiệt quệ cảm xúc · thấu cảm quá mức với người khác)",
      "Identity crisis (khủng hoảng căn tính · không thể sống đúng với giá trị bản thân)",
    ],
    signs: {
      physical: ["Mệt mỏi mãn tính không rõ nguyên nhân", "Tức ngực", "Khó thở nông", "Thay đổi khẩu vị đột ngột"],
      emotional: ["Nhạy cảm quá mức · dễ khóc vô cớ", "Bất an sâu sắc", "Hoài nghi lòng tốt của con người"],
      behavioral: ["Tránh né giao tiếp xã hội", "Bộc phát cảm xúc bất ngờ", "Tìm kiếm xoa dịu từ chất kích thích nhẹ"],
      cognitive: ["Bị áp đảo bởi viễn cảnh tiêu cực", "Mất khả năng tư duy logic", "Tự phán xét bản thân gay gắt"],
    },
    vietnameseContext: "Sự cô đơn đô thị + khủng hoảng giá trị sống trong nền kinh tế thực dụng · áp lực kết hôn từ gia đình",
    urbanLonelinessNote: "NF nhạy cảm với môi trường xã hội · xa gia đình + thiếu kết nối sâu = cô đơn mạn tính nghiêm trọng nhất",
  },
  ST: {
    stressTypes: [
      "Performance stress (áp lực hiệu suất · không đạt tiêu chuẩn tự đặt ra)",
      "Loss of control (nỗi sợ mất kiểm soát · môi trường hỗn loạn không dự đoán được)",
    ],
    signs: {
      physical: ["Co thắt dạ dày", "Tăng huyết áp tức thời", "Nghiến răng khi ngủ", "Rụng tóc"],
      emotional: ["Dễ nổi giận bộc phát", "Thất vọng với sự bất tài xung quanh", "Lo âu về tương lai tài chính"],
      behavioral: ["Kiểm soát vi mô người khác", "Làm việc điên cuồng (workaholism)", "Phản ứng gay gắt với thay đổi nhỏ"],
      cognitive: ["Tư duy phân cực trắng-đen", "Cứng nhắc trong giải quyết vấn đề", "Từ chối tiếp nhận ý kiến mới"],
    },
    vietnameseContext: "Áp lực mua nhà mua xe trước 30 tuổi · không đạt KPI công ty · cảm giác tụt hậu so với bạn bè",
    urbanLonelinessNote: "ST hoạt động tốt độc lập · ít phụ thuộc xã hội · nguy cơ cô đơn thấp nhưng dễ bị burnout do workaholic",
  },
  SF: {
    stressTypes: [
      "Relationship stress (áp lực quan hệ · rạn nứt kết nối gia đình · cô lập cộng đồng)",
      "Caretaker burnout (kiệt sức vì chăm sóc · ưu tiên người khác đến quên bản thân)",
    ],
    signs: {
      physical: ["Đau mỏi toàn thân không rõ nguyên nhân", "Suy giảm hệ miễn dịch", "Đánh trống ngực", "Uể oải kéo dài"],
      emotional: ["Cảm thấy bị bỏ rơi", "Tủi thân sâu sắc", "Sợ hãi sự từ chối xã hội", "Cô đơn trong đám đông"],
      behavioral: ["Cố gắng làm hài lòng mọi người bằng mọi giá", "Liên tục than phiền nhưng không thay đổi", "Bám víu các mối quan hệ cũ độc hại"],
      cognitive: ["Suy diễn hành vi người khác theo hướng tiêu cực", "Tự trách bản thân", "Mất định hướng cá nhân"],
    },
    vietnameseContext: "Áp lực hôn nhân từ cha mẹ · so sánh xã hội về vị thế gia đình · Financial guilt gửi tiền về quê",
    urbanLonelinessNote: "SF cần người xung quanh để nạp năng lượng · mất kết nối xã hội = năng lượng tụt nhanh + FOMO nặng",
  },
}

// ─── KỸ THUẬT GIẢI TOẢ 3 TẦNG THEO MBTI ─────────────────

export interface TechniqueTiers {
  immediate: ImmediateTechnique[]
  shortTerm: string[]
  longTerm: string[]
}

export const STRESS_TECHNIQUES: Record<MbtiGroup, TechniqueTiers> = {
  NT: {
    immediate: [
      { name: "Đi bộ một mình không nhạc", duration: "15 phút", steps: "Tìm không gian ít tiếng ồn, đi bộ chậm, hướng sự chú ý hoàn toàn vào nhịp chân tiếp đất, không dùng điện thoại.", science: "Tạm dừng hoạt động phân tích của vỏ não trước trán, kích hoạt mạng lưới mặc định của não (DMN) giúp tái cấu trúc tư duy." },
      { name: "Viết nhật ký xả ly", duration: "5 phút", steps: "Viết tự do mọi suy nghĩ phi logic ra giấy không biên tập, sau đó xé hoặc hủy tờ giấy đó.", science: "Externalise suy nghĩ từ working memory xuống vật lý, giải phóng tài nguyên nhận thức đang bị chiếm dụng." },
      { name: "Thở hộp (Box Breathing)", duration: "5 phút", steps: "Hít vào 4 giây → Giữ 4 giây → Thở ra 4 giây → Giữ 4 giây. Lặp lại 5 vòng.", science: "Kích hoạt hệ thần kinh phó giao cảm, giảm nhịp tim và cortisol nhanh trong 3-5 phút." },
    ],
    shortTerm: [
      "Digital Detox 48 giờ: tắt toàn bộ thông báo mạng xã hội và email cá nhân",
      "Micro-learning chủ đề mới: đọc tài liệu triết học hoặc lịch sử hoàn toàn phi công việc",
      "Thay đổi lộ trình di chuyển: đi làm bằng con đường mới để kích hoạt tính linh hoạt của não",
    ],
    longTerm: [
      "Thực hành triết học Khắc kỷ (Stoicism): phân biệt vùng kiểm soát nội tâm và ngoại cảnh",
      "Xây dựng Second Brain: hệ thống hóa tri thức cá nhân bằng Obsidian/Notion để giảm tải bộ nhớ làm việc",
      "Thiết lập ranh giới công việc nghiêm ngặt: không xử lý email sau 19 giờ",
    ],
  },
  NF: {
    immediate: [
      { name: "Khóc giải tỏa tự nhiên", duration: "Không giới hạn", steps: "Cho phép bản thân khóc trong không gian riêng tư mà không kìm nén hoặc cảm thấy tội lỗi.", science: "Nước mắt cảm xúc chứa leucine-enkephalin (opioid tự nhiên) và prolactin giúp giảm cortisol và trạng thái kích thích cảm xúc." },
      { name: "Viết biểu cảm tự do (Expressive Writing)", duration: "10 phút", steps: "Viết liên tục dòng cảm xúc không cần biên tập hay sửa lỗi. Viết cả điều tồi tệ nhất đang nghĩ.", science: "Chuyển hoạt động từ hạch hạnh nhân (amygdala) sang thùy trán trái, giúp gọi tên và giảm cường độ cơn bão cảm xúc [Pennebaker, 1997]." },
      { name: "Gọi điện cho một người tin cậy", duration: "10-20 phút", steps: "Chia sẻ trạng thái cảm xúc hiện tại với người bạn an toàn. Không cần tìm giải pháp, chỉ cần được nghe.", science: "Kích hoạt hệ thống gắn kết xã hội (social bonding system), giải phóng oxytocin giúp giảm phản ứng stress." },
    ],
    shortTerm: [
      "Thiết lập ranh giới đồng cảm: từ chối tiếp nhận năng lượng tiêu cực từ người khác có chủ đích",
      "Trị liệu nghệ thuật tự do: vẽ tranh, tô màu hoặc cắm hoa không theo quy tắc",
      "Một ngày tĩnh lặng trong thiên nhiên: dạo công viên hoặc vùng ngoại ô không có thiết bị số",
    ],
    longTerm: [
      "Thực hành thiền định chánh niệm: huấn luyện tâm trí sống trong hiện tại thay vì cuộc hội thoại nội tâm",
      "Tham gia tình nguyện môi trường: cống hiến cho dự án xanh (WildAct, CHANGE) để lấy lại ý nghĩa",
      "Viết nhật ký biết ơn hằng đêm: ghi lại 3 điều tích cực diễn ra trong ngày",
    ],
  },
  ST: {
    immediate: [
      { name: "HIIT ngắn 10 phút", duration: "10 phút", steps: "Thực hiện chuỗi: squat → lunge → chống đẩy → burpee, cường độ cao liên tục trong 10 phút không nghỉ.", science: "Đốt cháy cortisol và adrenaline dư thừa trong máu nhanh chóng, kích thích giải phóng endorphin giảm stress [R]." },
      { name: "Dọn dẹp một góc nhỏ vật lý", duration: "10-15 phút", steps: "Sắp xếp lại bàn làm việc hoặc tủ sách ngay lập tức. Tạo ra trật tự hữu hình trong 10 phút.", science: "Hành động kiểm soát môi trường xung quanh phục hồi cảm giác agency (tự chủ), giảm stress do mất kiểm soát." },
      { name: "Progressive Muscle Relaxation (PMR)", duration: "10 phút", steps: "Co cứng từng nhóm cơ 5-7 giây (bắt đầu từ bàn chân), sau đó thả lỏng hoàn toàn 20-30 giây. Lần lượt từ chân lên đầu.", science: "Giảm căng thẳng cơ do stress tích lũy, kích hoạt phản ứng thư giãn đối kháng với phản ứng stress [Jacobson, 1938]." },
    ],
    shortTerm: [
      "Lập kế hoạch tuần có khoảng nghỉ trống: đặt cố định các mốc giờ không làm gì trong lịch",
      "Chạy bộ vùng nhịp tim Zone 2 (60-70% HRmax): dùng công thức Karvonen để tính target HR",
      "Sửa chữa hoặc lắp ráp đồ đạc: lego, sửa đồ điện nhỏ — hoạt động chân tay có kết quả cụ thể",
    ],
    longTerm: [
      "Tích hợp triết lý Kaizen (cải tiến 1% mỗi ngày): chia nhỏ mục tiêu lớn thành các bước siêu nhỏ",
      "Tham gia giải đấu thể thao phong trào: rèn luyện kỷ luật qua cạnh tranh lành mạnh",
      "Chuẩn hóa quy trình tài chính cá nhân: xây dựng quỹ dự phòng 6 tháng chi phí",
    ],
  },
  SF: {
    immediate: [
      { name: "Gọi điện ngắn người thân thiết", duration: "5-10 phút", steps: "Gọi cho một người thân hoặc bạn thân, chỉ cần nghe giọng nói ấm áp, không cần chia sẻ vấn đề nếu chưa muốn.", science: "Giọng nói người thân kích hoạt hệ thống attachment, giải phóng oxytocin và giảm cortisol nhanh hơn text message." },
      { name: "Liệu pháp hương thơm + thở sâu", duration: "5 phút", steps: "Pha một tách trà ấm, nhỏ 2 giọt tinh dầu oải hương lên cổ tay, hít thở sâu và cảm nhận khứu giác hoàn toàn.", science: "Kích thích thụ thể cảm giác ngoại vi, đưa não bộ về trạng thái hiện tại (grounding), giảm hoạt động lo âu nội tâm." },
      { name: "Thưởng thức một món ăn yêu thích có ý thức", duration: "15-20 phút", steps: "Chuẩn bị hoặc mua món yêu thích, ăn chậm rãi, chú ý hoàn toàn vào vị giác và khứu giác, không dùng điện thoại.", science: "Mindful eating kích hoạt hệ phó giao cảm và giảm cortisol, tránh emotional eating mất kiểm soát." },
    ],
    shortTerm: [
      "Tổ chức trà chiều kết nối trực tiếp: gặp gỡ bạn bè thân thiết, cam kết không dùng điện thoại",
      "Làm vườn hoặc tạo terrarium tiểu cảnh: chăm sóc cây xanh nhỏ trong nhà",
      "Thay đổi cách bài trí phòng ngủ: ánh sáng vàng ấm + chăn nệm mềm tạo cocoon space",
    ],
    longTerm: [
      "Thực hành triết lý Hygge (Đan Mạch): tìm kiếm sự ấm cúng và bình yên trong các kết nối nhỏ",
      "Học cách từ chối khéo léo: thiết lập ranh giới cá nhân, không ôm đồm việc của người khác",
      "Tham gia lớp khiêu vũ hoặc nhảy cộng đồng: giải phóng năng lượng cơ thể qua nhịp điệu",
    ],
  },
}

// ─── 10 TÌNH HUỐNG STRESS THỰC TẾ VN ─────────────────────

export interface VNStressSituation {
  title: string
  mechanism: string
  mbtiResponses: Record<MbtiGroup, string>
  reframe: string
  actionSteps: string[]
  escalationSign: string
}

export const VN_STRESS_SITUATIONS: VNStressSituation[] = [
  {
    title: "Bố mẹ hỏi bao giờ lấy vợ/chồng",
    mechanism: "Xung đột giữa chủ nghĩa cá nhân hiện đại (tự chủ, sẵn sàng tài chính) và tư tưởng tập thể truyền thống (hôn nhân = báo hiếu, duy trì dòng tộc).",
    mbtiResponses: {
      NT: "Tranh luận logic sắc bén để chứng minh kết hôn muộn là tối ưu, dễ gây rạn nứt quan hệ nghiêm trọng.",
      NF: "Cảm thấy tổn thương sâu, tự vấn liệu mình có phải kẻ bất hiếu, dễ rơi vào trầm uất và tránh né gia đình.",
      ST: "Coi đây là task cần hoàn thành nhưng chưa đến thời điểm tối ưu, đưa ra các cột mốc tài chính cụ thể để hoãn binh.",
      SF: "Rất áp lực vì sợ bị xã hội phán xét, có xu hướng vội vã tham gia xem mắt hoặc chấp nhận mối quan hệ không phù hợp.",
    },
    reframe: "Cha mẹ hỏi không phải để kiểm soát, mà đó là cách họ biểu đạt nỗi sợ về tương lai của con theo hệ quy chiếu cũ. Đây là tình yêu thương thiếu kỹ năng giao tiếp hiện đại.",
    actionSteps: [
      "Ghi nhận sự quan tâm của cha mẹ bằng lời cảm ơn chân thành",
      "Đưa ra thông tin ngắn gọn: 'Con đang tập trung chuẩn bị nền tảng tốt nhất cho tương lai'",
      "Chuyển chủ đề sang sức khỏe hoặc hoạt động hằng ngày của bố mẹ",
      "Không tranh luận logic về hôn nhân trong bữa cơm gia đình",
    ],
    escalationSign: "Nếu áp lực này gây mất ngủ kéo dài hoặc né tránh gặp mặt gia đình > 1 tháng → nên trao đổi với chuyên gia tư vấn",
  },
  {
    title: "Bạn bè cùng lứa mua nhà, mình chưa có",
    mechanism: "Thuyết so sánh xã hội (Festinger): đánh giá giá trị bản thân qua so sánh vị thế. Mạng xã hội chỉ hiển thị highlight reel, tạo bức tranh bóp méo về thực tại.",
    mbtiResponses: {
      NT: "Phân tích cấu trúc kinh tế, hoài nghi nguồn gốc tài sản, thất vọng vì năng lực trí tuệ chưa chuyển thành giá trị vật chất.",
      NF: "Cảm thấy trống rỗng, khủng hoảng hiện sinh, hoài nghi giá trị bản thân khi không đạt tiêu chuẩn vật chất xã hội.",
      ST: "Tự trách vô dụng, ép bản thân làm việc ngoài giờ điên cuồng, dễ dẫn đến kiệt sức thể chất nghiêm trọng.",
      SF: "Lo âu xã hội, tự ti khi gặp bạn bè, xu hướng cắt đứt quan hệ cộng đồng để trốn tránh cảm giác thất bại.",
    },
    reframe: "Sở hữu nhà sớm phụ thuộc vào nhiều yếu tố tích lũy, hỗ trợ gia đình và may mắn — không phản ánh năng lực cốt lõi hay hạnh phúc đích thực (Eudaimonia).",
    actionSteps: [
      "Thực hiện kiểm toán tài chính cá nhân thực tế dựa trên thu nhập hiện tại",
      "Lập kế hoạch tích lũy dài hạn có mốc cụ thể",
      "Tắt thông báo các tài khoản thường xuyên khoe tài sản",
      "Áp dụng quy tắc '30 phút không màn hình' sau khi thức dậy",
    ],
    escalationSign: "Nếu so sánh xã hội gây cảm giác cuộc sống vô nghĩa kéo dài > 2 tuần → cần hỗ trợ tâm lý",
  },
  {
    title: "Sếp giao việc cuối ngày thứ Sáu",
    mechanism: "Mất cân bằng quyền lực trong quan hệ lao động, người lao động chấp nhận xâm hại ranh giới cá nhân do nỗi sợ bị đánh giá kém năng lực.",
    mbtiResponses: {
      NT: "Phân tích sự thiếu hiệu quả quy trình, im lặng làm nhưng chất lượng giảm hoặc tỏ thái độ bất hợp tác ngầm.",
      NF: "Xung đột nội tâm gay gắt giữa muốn từ chối và sợ mất lòng sếp, cảm thấy bị bóc lột nhân văn.",
      ST: "Coi là nghĩa vụ hợp đồng, phản ứng cứng nhắc nếu không có quy định OT rõ ràng, dễ gây tranh chấp.",
      SF: "Lo lắng cho sự ổn định công việc, thực hiện ngay dù phải hủy kế hoạch gia đình bạn bè.",
    },
    reframe: "Sếp giao việc tối thứ Sáu phản ánh sự thiếu tổ chức hoặc áp lực từ cấp trên — không đồng nghĩa nhân viên phải xử lý ngay nếu không có rủi ro nghiêm trọng.",
    actionSteps: [
      "Phản hồi trì hoãn có kiểm soát: 'Tôi đã nhận được. Tôi sẽ xử lý chi tiết vào sáng thứ Hai để đảm bảo chất lượng tốt nhất.'",
      "Không giải thích dài dòng, không xin lỗi",
      "Ghi lại tần suất giao việc ngoài giờ để đánh giá sau 1 tháng",
    ],
    escalationSign: "Nếu tình trạng này gây mất ngủ mãn tính hoặc kiệt sức → xem xét làm việc với HR hoặc tìm vị trí khác",
  },
  {
    title: "Gia đình kỳ vọng gửi tiền về quê hàng tháng",
    mechanism: "Xung đột giữa nhu cầu tích lũy cá nhân để sinh tồn đô thị đắt đỏ và nghĩa vụ đền đáp công ơn theo đạo lý truyền thống.",
    mbtiResponses: {
      NT: "Lập mô hình tài chính tối ưu, bực bội khi người thân chi tiêu số tiền gửi về thiếu kế hoạch.",
      NF: "Cắt giảm chi tiêu bản thân xuống tối thiểu, sẵn sàng sống khổ cực để gửi tiền xoa dịu tội lỗi.",
      ST: "Coi là khoản nợ cố định phải trả, tìm side-hustle để bù đắp phần thiếu hụt.",
      SF: "Mệt mỏi cân bằng gia đình nhỏ thành phố và yêu cầu dòng tộc quê, dễ gây xung đột vợ chồng.",
    },
    reframe: "Tự chủ tài chính và xây dựng bệ đỡ kinh tế vững chắc là cách TỐT NHẤT để bảo vệ gia đình trước rủi ro lớn dài hạn. Hỗ trợ tài chính thông minh = có giới hạn và không tạo phụ thuộc.",
    actionSteps: [
      "Nói chuyện thẳng thắn với cha mẹ về chi phí sinh hoạt thực tế tại thành phố",
      "Thiết lập hạn mức hỗ trợ cố định: tối đa 10-15% thu nhập ròng",
      "Tách biệt khoản này hoàn toàn khỏi quỹ dự phòng khẩn cấp cá nhân",
    ],
    escalationSign: "Nếu Financial guilt gây cảm giác tuyệt vọng hoặc ý nghĩ tự hại → gọi ngay Ngày Mai: 096 306 1414",
  },
  {
    title: "Công việc vô nghĩa nhưng không dám nghỉ",
    mechanism: "Hội chứng 'Bullshit Jobs' (Graeber): công việc không tạo giá trị thực, lặp đi lặp lại duy trì bộ máy quan liêu, dẫn đến suy giảm lòng tự trọng sâu sắc.",
    mbtiResponses: {
      NT: "Trí tuệ bị sỉ nhục, bày tỏ chán nản công khai hoặc bỏ việc đột ngột thiếu dự phòng tài chính.",
      NF: "Trầm cảm hiện sinh nghiêm trọng, mất hoàn toàn năng lượng sống và động lực.",
      ST: "Bám trụ vì tính ổn định và dòng tiền, tối ưu hóa quy trình để có thêm thời gian rảnh.",
      SF: "Tìm kiếm an ủi từ đồng nghiệp, biến môi trường công sở thành không gian giao lưu xã hội.",
    },
    reframe: "Công việc hiện tại là công cụ kinh tế cung cấp nguồn tài chính để nuôi dưỡng các giá trị đích thực ngoài giờ làm việc. Nó là 'nhà tài trợ' cho các dự án cá nhân ý nghĩa hơn.",
    actionSteps: [
      "Áp dụng 'Job Crafting': tái thiết lập các nhiệm vụ nhỏ để tìm sự kết nối mới",
      "Dành 1-2 tiếng mỗi tối chuẩn bị năng lực cho lĩnh vực mới phù hợp hơn",
      "Xác định mốc thời gian cụ thể để chuyển dịch (ví dụ: 12 tháng)",
    ],
    escalationSign: "Nếu cảm thấy cuộc sống hoàn toàn vô nghĩa kéo dài → cần hỗ trợ tâm lý chuyên khoa",
  },
  {
    title: "Mạng xã hội toàn thấy người thành công",
    mechanism: "Thuật toán các nền tảng số phân phối nội dung kích thích cảm xúc cao, tạo Hyperreality — bức tranh bóp méo nơi mọi người xung quanh đều viên mãn tối thượng.",
    mbtiResponses: {
      NT: "Phân tích thuật toán một cách hoài nghi nhưng vẫn bị ảnh hưởng bởi số liệu thành công giả tạo.",
      NF: "Coi thành công của người khác là bằng chứng cho sự thiếu sót của bản thân, rơi vào tự ti sâu sắc.",
      ST: "Bắt chước thói quen hiệu suất của người nổi tiếng online một cách máy móc, dẫn đến kiệt sức.",
      SF: "Cuồng mua sắm các sản phẩm lifestyle được quảng cáo để khỏa lấp cảm giác thiếu hụt vị thế xã hội.",
    },
    reframe: "Mạng xã hội là không gian trình diễn được biên tập kỹ lưỡng. Những gì hiển thị chỉ là phần nổi của tảng băng trôi, che giấu sự bất an và thất bại của chính người đăng tải.",
    actionSteps: [
      "Quy tắc '30 phút không màn hình': không dùng mạng xã hội ngay sau khi thức dậy và trước khi ngủ",
      "Giới hạn mạng xã hội tối đa 1 giờ/ngày bằng tính năng Screen Time",
      "Unfollow các tài khoản thường xuyên gây cảm giác tự ti mà không có lợi ích thực",
      "Thay thế thời gian lướt mạng bằng đọc sách hoặc hoạt động thể chất",
    ],
    escalationSign: "Nếu FOMO gây lo âu liên tục hoặc khó ngủ > 2 tuần → nên trao đổi với chuyên gia tư vấn",
  },
  {
    title: "Bị lừa đảo tài chính qua sàn giao dịch giả mạo",
    mechanism: "Tội phạm tài chính thao túng qua lòng tham + nỗi sợ + sự cô đơn. Sập bẫy không phản ánh năng lực — các kịch bản lừa đảo được thiết kế bởi chuyên gia AI và tâm lý học.",
    mbtiResponses: {
      NT: "Sụp đổ vì lòng tự tôn trí tuệ bị chà đạp, cố tự giải quyết và từ chối chia sẻ vì xấu hổ.",
      NF: "Khủng hoảng lòng tin toàn diện với con người, dễ có suy nghĩ tiêu cực cực đoan về giá trị tồn tại.",
      ST: "Thu thập chứng cứ quyết liệt để đòi lại tiền, uất ức kéo dài nếu không giải quyết được.",
      SF: "Hoảng loạn tột độ, có xu hướng vay thêm từ nguồn khác (thậm chí tín dụng đen) để đắp lỗ.",
    },
    reframe: "Trở thành nạn nhân lừa đảo công nghệ cao là một tai nạn kỹ thuật số, không phản ánh năng lực hay đạo đức của bản thân. Nhu cầu tiếp theo là hành động pháp lý, không phải tự trách.",
    actionSteps: [
      "Lập tức ngắt kết nối và chặn liên lạc với đối tượng lừa đảo",
      "Chụp ảnh màn hình toàn bộ tin nhắn, biên lai chuyển tiền",
      "Trình báo tại cơ quan Công an gần nhất hoặc canhbao.khonggianmang.vn",
      "KHÔNG vay thêm tiền từ bất kỳ nguồn nào để 'đòi lại tiền'",
    ],
    escalationSign: "Nếu có ý nghĩ tự hại do mất tiền → gọi ngay Ngày Mai: 096 306 1414 hoặc 1900 1267",
  },
  {
    title: "Bị sa thải trái pháp luật, bị cắt BHXH đột ngột",
    mechanism: "Mất sinh kế đột ngột do lạm dụng quyền lực doanh nghiệp. Người lao động trẻ hoang mang, mất phương hướng và cảm giác bất công sâu sắc khi bị tước quyền an sinh.",
    mbtiResponses: {
      NT: "Nghiên cứu Luật Lao động, chuẩn bị hồ sơ tranh tụng bài bản và logic.",
      NF: "Cảm thấy bị phản bội, mất niềm tin vào đạo đức kinh doanh, rơi vào tự ti và lo âu xã hội.",
      ST: "Đánh giá thiệt hại tài chính lạnh lùng, yêu cầu bồi thường theo luật, chuẩn bị ngay phương án công việc mới.",
      SF: "Lo lắng tột độ về thu nhập hàng ngày, dễ ký vào biên bản thỏa thuận bất lợi để sớm nhận tiền nhỏ.",
    },
    reframe: "Sa thải không phải là sự phủ nhận năng lực cá nhân — đây là hành vi vi phạm pháp luật từ phía người sử dụng lao động. Đây là cơ hội thực hiện quyền công dân và tìm môi trường chuyên nghiệp hơn.",
    actionSteps: [
      "TUYỆT ĐỐI không ký 'tự nguyện thôi việc' khi chưa hiểu rõ quyền lợi",
      "Thu thập: hợp đồng lao động · quyết định sa thải · bảng lương · email trao đổi · VssID",
      "Nộp đơn khiếu nại lần đầu đến người sử dụng lao động trong 180 ngày",
      "Nếu không giải quyết: Chánh Thanh tra Sở LĐTB&XH hoặc trực tiếp khởi kiện TAND cấp huyện (không bắt buộc qua hòa giải đối với sa thải - K1 Điều 188 BLLĐ 2019)",
    ],
    escalationSign: "Nếu mất việc đột ngột gây khủng hoảng tinh thần kéo dài → cần hỗ trợ tâm lý song song với pháp lý",
  },
  {
    title: "Dính nợ tín dụng đen, bị khủng bố đòi nợ",
    mechanism: "Tín dụng đen vi phạm hình sự (Điều 201 BLHS). Bạn là nạn nhân của hệ thống bóc lột tài chính bất hợp pháp, không phải 'con nợ xấu'. Chấm dứt khủng hoảng cần pháp luật, không phải thỏa hiệp liên tục.",
    mbtiResponses: {
      NT: "Cố phân tích logic dòng tiền, tự giải quyết nhưng dễ bế tắc trước tốc độ tăng lãi suất phi lý.",
      NF: "Hoảng loạn cảm xúc tột cùng, tự trách đã kéo người thân vào nguy hiểm, dễ có suy nghĩ tự hại.",
      ST: "Đối chất pháp lý cứng rắn về lãi suất vượt trần, bị tổn thương khi bạo lực thực tế xảy ra.",
      SF: "Sợ mất danh dự gia đình, tiếp tục vay app này trả app kia, khoản nợ phình to theo cấp số nhân.",
    },
    reframe: "Tín dụng đen = tội phạm hình sự có tổ chức. Nghĩa vụ của bạn là tố giác, không phải trả nợ mãi mãi cho tổ chức bất hợp pháp.",
    actionSteps: [
      "TUYỆT ĐỐI không vay thêm từ bất kỳ app nào để trả nợ cũ",
      "Thông báo cho gia đình và bạn bè về tình trạng để họ chủ động chặn cuộc gọi rác",
      "Thu thập toàn bộ chứng cứ: hợp đồng vay, lãi suất thực tế, lịch sử chuyển khoản, tin nhắn đe dọa",
      "Tố giác tội phạm tại Cơ quan Cảnh sát điều tra cấp quận/huyện nơi cư trú",
    ],
    escalationSign: "⚠️ Nếu có suy nghĩ tự hại → GỌI NGAY 096 306 1414 (Ngày Mai) hoặc 1900 1267 · Đây là tình huống khẩn cấp · cần hỗ trợ ngay lập tức",
  },
  {
    title: "Bị phạt nguội giao thông qua camera AI, lo bị cưỡng chế lương",
    mechanism: "Camera AI có thể nhận diện sai biển số, xe đã bán chưa sang tên, hoặc người khác mượn xe vi phạm. Từ 01/01/2026, NĐ296/2025/NĐ-CP cho phép khấu trừ lương nếu không chấp hành xử phạt.",
    mbtiResponses: {
      NT: "Tra cứu kỹ thuật nhận diện hình ảnh camera AI, chuẩn bị lập luận logic để bác bỏ lỗi phạt.",
      NF: "Lo âu về ảnh hưởng hồ sơ lý lịch cá nhân và bị đánh giá xấu khi bị khấu trừ lương cưỡng chế.",
      ST: "Tra cứu ngay csgt.vn hoặc VNeTraffic, nếu đúng vi phạm thì nộp phạt qua Cổng dịch vụ công quốc gia.",
      SF: "Lo về thủ tục hành chính phức tạp, dễ tìm 'dịch vụ xử lý nhanh' không chính thống, nguy cơ bị lừa thêm.",
    },
    reframe: "Phạt nguội camera AI là quy trình tự động có thể sai sót. Pháp luật Việt Nam bảo vệ quyền khiếu nại và quy định rõ quy trình đối chiếu hình ảnh gốc để sửa sai.",
    actionSteps: [
      "Truy cập csgt.vn hoặc VNeTraffic để check thông tin lỗi phạt",
      "Nếu do người khác điều khiển hoặc camera AI sai: chuẩn bị chứng cứ (hợp đồng cho mượn xe, camera hành trình, GPS)",
      "Trong vòng 7 ngày kể từ nhận thông báo: đến Công an nơi phát hiện vi phạm để giải quyết",
      "Nếu sai: thực hiện quyền khiếu nại theo Luật Khiếu nại để hủy bỏ quyết định xử phạt oan",
    ],
    escalationSign: "Stress từ thủ tục hành chính thường giảm sau khi có plan hành động cụ thể · nếu vẫn lo âu quá mức → có thể liên hệ TGPL miễn phí tại tgpl.moj.gov.vn",
  },
]

// ─── RANH GIỚI CẦN HỖ TRỢ ─────────────────────────────────

export const WHEN_TO_SEEK_HELP = {
  clinicalSigns: [
    "Lo âu hoặc trầm uất kéo dài liên tục trên 2 tuần không cải thiện",
    "Mất ngủ mãn tính, chán ăn hoặc sụt cân đột ngột ảnh hưởng sinh hoạt",
    "Xuất hiện ý nghĩ muốn tự hại hoặc cảm thấy cuộc sống hoàn toàn vô nghĩa",
    "Công việc, học tập hoặc các mối quan hệ bị ảnh hưởng nghiêm trọng",
  ],
  resources: [
    { name: "Đường dây Ngày Mai", phone: "096 306 1414", hours: "13:00-20:30 · T4-CN", scope: "Sơ cứu tâm lý · trầm cảm · khủng hoảng tinh thần · phi lợi nhuận miễn phí" },
    { name: "BV Tâm Thần TP.HCM + 115", phone: "1900 1267", hours: "24/7", scope: "Cấp cứu trầm cảm · điều phối xe cứu thương tới nhà" },
    { name: "Viện SK Tâm thần Bạch Mai", phone: "(024) 3576 5344 / 0984 104 115", hours: "Giờ hành chính + trực cấp cứu", scope: "Khám · điều trị nội/ngoại trú toàn quốc" },
    { name: "BV Đại học Y Hà Nội", phone: "1900 6422", hours: "Giờ hành chính", scope: "Đặt lịch khám tâm thần" },
    { name: "CSAGA", phone: "024 3333 5599", hours: "Giờ hành chính", scope: "Bạo lực giới · nhóm yếu thế · LGBTQ" },
    { name: "Tổng đài trẻ em", phone: "111", hours: "24/7 miễn phí", scope: "Trẻ em dưới 16 tuổi · khủng hoảng tâm lý" },
  ],
}

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getStressTechniques(group: MbtiGroup): TechniqueTiers {
  return STRESS_TECHNIQUES[group]
}

export function getImmediateTechnique(group: MbtiGroup): ImmediateTechnique {
  const tech = STRESS_TECHNIQUES[group].immediate
  return tech[Math.floor(Math.random() * tech.length)]
}

export function detectEscalation(userText: string): boolean {
  const escalationKeywords = ['tự hại', 'tự tử', 'không muốn sống', 'chết đi', 'không còn ý nghĩa', 'biến mất', 'bỏ cuộc tất cả']
  return escalationKeywords.some(kw => userText.toLowerCase().includes(kw))
}
