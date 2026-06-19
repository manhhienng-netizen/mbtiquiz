// match-pair-content-vn-enfp-part2.ts
// Task 4 retone — BATCH 2b: 7 cặp ENFP+* còn lại (INFP, INTJ, INTP, ISFJ, ISFP, ISTJ, ISTP)
// Content agent · 16/06/2026 · nối tiếp match-pair-content-vn-enfp.ts (8 cặp đầu)
// → Gộp 2 file = đủ 15 cặp ENFP. Đã sửa lỗi lẫn type: INFP, INTP, ISFJ, ISTJ, ISTP (INTJ & ISFP gốc sạch)
// Giữ pairKey/texture/coverage/tag nguồn

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_ENFP_PART2: Record<string, MatchPairContent> = {
  'ENFP+INFP': {
    pairKey: 'ENFP+INFP',
    tenCap: 'Sáng tạo đồng hành',
    texture: 'growth_pair',
    dongLuc: 'Cùng lý tưởng, cùng giàu sáng tạo, cùng chiều sâu cảm xúc — hiểu nhau về thế giới nội tâm.',
    vungDeHop: 'Một mối quan hệ giàu cảm xúc và năng lượng sáng tạo — cùng truyền cảm hứng cho nhau.',
    vungMaSat: 'Cả hai đều sáng tạo và lý tưởng — nhưng ai sẽ khởi xướng hành động thực tế khi cả hai đều thích mơ mộng? Cả hai đều cần được công nhận mà ít ai cho — ai sẽ là người giữ vững chân?',
    canDeY: [
      'Chủ động ăn mừng thành công của nhau — đừng cho rằng người kia tự biết mình trân trọng họ.',
      'Cả hai cùng mơ mộng → việc thực tế bị trì hoãn vì không ai khởi xướng.', // [SỬA LỖI LẪN TYPE: gốc "ENTJ… → INFJ…"]
      'Cả hai cùng cần được công nhận một lúc → dễ hụt khi không ai cho.', // [SỬA LỖI LẪN TYPE: gốc "INFJ… → ENTJ…"]
    ],
    cachDiQua: [
      'ENFP: Khi cả hai cùng chìm vào cảm xúc, là người kéo cả hai về mặt đất một chút — đặt một việc cụ thể cho hôm nay.', // [SỬA LỖI LẪN TYPE: gốc "ESTP… → ISFJ…"]
      'INFP: Nói rõ điều bạn cần thay vì im lặng rút vào trong — ENFP sẽ lo nếu không được cho biết.', // [SỬA LỖI LẪN TYPE: gốc "ISFJ… → ESTP…"]
      'Cả hai: Trân trọng chiều sâu của nhau — đó là điểm mạnh, không phải điểm yếu.',
    ],
    funFact: 'ENFP và INFP là một trong những cặp được mô tả là "kết nối sâu tức thì" — cả hai đều khao khát sự chân thật và một mối quan hệ có ý nghĩa. [P]',
    coverage: 'full',
  },
  'ENFP+INTJ': {
    pairKey: 'ENFP+INTJ',
    tenCap: 'Bổ sung hoàn hảo',
    texture: 'golden_pair',
    dongLuc: 'INTJ mang chiều sâu và chiến lược; ENFP mang nhiệt huyết và kết nối cảm xúc — hai thứ mỗi người cần nhất.',
    vungDeHop: 'Kích thích nhau phát triển: INTJ học cởi mở hơn, ENFP học tập trung hơn.',
    vungMaSat: 'INTJ cần không gian; ENFP cần kết nối — dễ hiểu nhầm thành lạnh lùng và bám víu. INTJ đưa giải pháp ngay; ENFP cần được lắng nghe cảm xúc trước.',
    canDeY: [
      'INTJ: nói "tôi cần thời gian một mình" thay vì im lặng.',
      'ENFP: tôn trọng khoảng lặng đó.',
      'INTJ cần thời gian một mình → ENFP thấy bị đẩy ra.',
      'ENFP đổi kế hoạch đột ngột → INTJ thấy mất kiểm soát.',
    ],
    cachDiQua: [
      'INTJ: Hỏi "Bạn muốn tôi lắng nghe hay cùng tìm giải pháp?" trước khi đưa lời khuyên.',
      'ENFP: Nói rõ "Mình chỉ cần trút bầu tâm sự, chưa cần giải pháp" khi cần.',
      'Cả hai: Phần lớn khác biệt sẽ không bao giờ biến mất — học đi cùng nhau, không ép nhau thay đổi.',
    ],
    funFact: 'ENFP và INTJ là một trong những cặp được bàn nhiều nhất trong cộng đồng MBTI vì các chức năng bổ sung cho nhau gần như hoàn hảo. [P]',
    coverage: 'full',
  },
  'ENFP+INTP': {
    pairKey: 'ENFP+INTP',
    tenCap: 'Ý tưởng gặp nhau',
    texture: 'growth_pair',
    dongLuc: 'ENFP mang sự nhiệt thành; INTP mang chiều sâu phân tích — cùng yêu khám phá ý tưởng.',
    vungDeHop: 'Sự ăn ý về trí tuệ rất mạnh — trò chuyện về ý tưởng không bao giờ nhàm.',
    vungMaSat: 'ENFP cần sự ấm áp và kết nối cảm xúc; INTP thoải mái với kết nối qua trí tuệ mà không cần lớp cảm xúc — lệch nhau về mức độ thân mật.',
    canDeY: [
      'INTP: tập hỏi "điều này khiến bạn thấy thế nào?" ENFP: trân trọng sự gắn kết trí tuệ như một cách thể hiện quan tâm.',
      'INTP phân tích khi ENFP cần được đồng cảm → ENFP thấy hụt.', // [SỬA LỖI LẪN TYPE: gốc "ISFP… → ENTP…"]
      'ENFP cần kết nối cảm xúc → INTP dễ dừng lại ở tầng ý tưởng.', // [SỬA LỖI LẪN TYPE: gốc "ESTJ… → INFP…"]
    ],
    cachDiQua: [
      'ENFP: Khi INTP phân tích thay vì đồng cảm, hiểu lại: họ đang thể hiện quan tâm theo cách của họ — thử nói "lần này mình chỉ cần bạn nghe, không cần phân tích."',
      'INTP: Đôi khi ENFP cần một câu công nhận cảm xúc trước cả một lời phân tích đúng.', // [SỬA LỖI LẪN TYPE: gốc "ENTP… → ISFP…"]
      'Cả hai: Kết nối trí tuệ cũng là kết nối — đừng xem nhẹ nó, nhưng ENFP cần thêm một lớp cảm xúc.',
    ],
    funFact: 'ENFP và INTP cùng có chức năng khám phá ý tưởng dẫn đầu — đây là điểm chung mạnh nhất và thường là điều đầu tiên họ mê ở nhau. [S]',
    coverage: 'full',
  },
  'ENFP+ISFJ': {
    pairKey: 'ENFP+ISFJ',
    tenCap: 'Khác chiều',
    texture: 'challenge_pair',
    dongLuc: 'ENFP cần tự do và mới mẻ; ISFJ cần ổn định và nề nếp — lối sống khác biệt.',
    vungDeHop: 'ISFJ mang sự chăm sóc và đáng tin ENFP cần; ENFP mang sự hào hứng ISFJ thiếu.',
    vungMaSat: 'ENFP muốn linh hoạt và đổi mới; ISFJ cần ổn định và nề nếp — nhu cầu lối sống ngược nhau.',
    canDeY: [
      'Tìm hoạt động cả hai cùng thích — thử nghiệm cùng nhau trong một không gian an toàn.',
      'ENFP ngẫu hứng đổi kế hoạch → ISFJ bất an vì mất nề nếp.', // [SỬA LỖI LẪN TYPE: gốc "ENFJ… → INTJ…"]
      'ISFJ giữ thói quen cũ → ENFP thấy tù túng.', // [SỬA LỖI LẪN TYPE: gốc "ISTP… → ESFJ…"]
    ],
    cachDiQua: [
      'ENFP: Cho ISFJ thấy bạn đáng tin qua những hành động nhỏ đều đặn — họ tin hành vi hơn lời nói.', // [SỬA LỖI LẪN TYPE: gốc "INFP… → ESTJ…"]
      'ISFJ: Nói ra nhu cầu ổn định của bạn thay vì âm thầm chịu — ENFP không cố ý làm xáo trộn.', // [SỬA LỖI LẪN TYPE: gốc "INTJ… → ENFJ…"]
      'Cả hai: Có việc cần cấu trúc (ISFJ), có việc cần tự do (ENFP) — phân rõ việc nào ra việc nào.',
    ],
    funFact: 'ENFP và ISFJ đối lập về hướng nội/ngoại và cách thu nhận thông tin — nhưng cả hai đều thiên cảm xúc, tạo nền tảng để bắc cầu qua khác biệt. [S]',
    coverage: 'full',
  },
  'ENFP+ISFP': {
    pairKey: 'ENFP+ISFP',
    tenCap: 'Tự do đồng hành',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều ngẫu hứng và thiên cảm xúc — cùng yêu tự do, cùng sáng tạo, cùng chân thật.',
    vungDeHop: 'Không ai cố thay đổi ai — mối quan hệ thấy an toàn và được thở.',
    vungMaSat: 'Cả hai đều tránh va chạm và ngại cấu trúc — ai sẽ khởi xướng những cuộc nói chuyện khó? ENFP cần năng lượng và sự công nhận từ bên ngoài; ISFP cần sự yên tĩnh và khoảng riêng bên trong.',
    canDeY: [
      'Tạo một nếp "cuộc trò chuyện can đảm" — định kỳ cùng nhìn lại sức khỏe của mối quan hệ.',
      'Năng lượng xã hội của ENFP làm kiệt sức ISFP hướng nội.',
      'Sự lặng lẽ rút lui của ISFP khiến ENFP thấy mất kết nối cảm xúc.',
    ],
    cachDiQua: [
      'ENFP: Cho ISFP khoảng một mình thật sự — đó không phải chối từ, mà là cách họ nạp lại để hiện diện trọn vẹn với bạn.',
      'ISFP: Nói thẳng điều bạn trân trọng ở ENFP — họ cần nghe để thấy yên tâm.',
      'Cả hai: Cả hai đều rất chân thật — giữ lấy điều đó làm nền, đừng bao giờ phải diễn trước mặt nhau.',
    ],
    funFact: 'ENFP và ISFP đều thiên cảm xúc và ngẫu hứng — cùng sự quan tâm chân thành và khiếu thẩm mỹ. Tình yêu với trải nghiệm thật là điểm chung vững. [S]',
    coverage: 'full',
  },
  'ENFP+ISTJ': {
    pairKey: 'ENFP+ISTJ',
    tenCap: 'Rất khác nhau',
    texture: 'challenge_pair',
    dongLuc: 'ENFP và ISTJ có ít điểm chung tự nhiên nhất — khác năng lượng, khác trọng tâm, khác lối sống.',
    vungDeHop: 'Nếu cam kết: ISTJ mang sự ổn định và theo đến cùng; ENFP mang niềm vui và sự tự phát.',
    vungMaSat: 'ISTJ thấy ENFP khó đoán; ENFP thấy ISTJ quá nghiêm — khoảng cách lớn cần bắc cầu. Hai người khác nhau ở năng lượng, cách thu nhận thông tin lẫn lối sống.',
    canDeY: [
      'Tập trung vào giá trị chung (sự trung thực, lòng quan tâm) thay vì lối sống chung — tìm điểm chung từ gốc.',
      'ENFP đổi hướng liên tục → ISTJ thấy thiếu nhất quán và khó theo.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ESFP…"]
      'ISTJ giữ nguyên tắc cứng → ENFP thấy thiếu tự do.', // [SỬA LỖI LẪN TYPE: gốc "ESFP… → INTP…"]
    ],
    cachDiQua: [
      'ENFP: Cho ISTJ thấy bạn đáng tin qua những hành động nhỏ nhất quán — họ tin hành vi hơn lời nói.',
      'ISTJ: Nhìn sự tự phát của ENFP như một nguồn sống, không phải sự thiếu kỷ luật.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → ISTP…"]
      'Cả hai: Lấy giá trị chung (trung thực, quan tâm) làm nền — xây từ đó dù phong cách khác nhau.',
    ],
    funFact: 'ENFP và ISTJ đối lập ở nhiều mặt — nhưng "đối cực hút nhau" có thể thành thật nếu cả hai cùng cam kết học hỏi. [P]',
    coverage: 'full',
  },
  'ENFP+ISTP': {
    pairKey: 'ENFP+ISTP',
    tenCap: 'Ấn tượng đầu mạnh',
    texture: 'challenge_pair',
    dongLuc: 'Sức hút ban đầu rất mạnh (đối cực hút nhau) — nhưng giữ được kết nối thì cần nỗ lực.',
    vungDeHop: 'ISTP mang sự điềm tĩnh và giỏi xoay xở; ENFP mang sự ấm áp và sáng tạo — tương phản hấp dẫn.',
    vungMaSat: 'ENFP cần nói ra cảm xúc; ISTP thể hiện qua hành động — khoảng cách giao tiếp căn bản.',
    canDeY: [
      'Lập "chế độ" trước khi chia sẻ: "Mình cần được nghe" hay "Mình cần giải pháp."',
      'ISTP xử lý vấn đề một mình → ENFP thấy bị gạt khỏi.', // [SỬA LỖI LẪN TYPE: gốc "ESTP… → ISFP…"]
      'ENFP cần nói ra cảm xúc → ISTP thấy quá nhiều lời.', // [SỬA LỖI LẪN TYPE: gốc "ISFP… → ESTP…"]
    ],
    cachDiQua: [
      'ENFP: ISTP sửa giúp bạn chính là cách họ thể hiện quan tâm — đừng chỉ chờ lời nói.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → ISTJ…"]
      'ISTP: Đôi khi ENFP chỉ cần bạn ngồi nghe, không cần bạn giải quyết gì.', // [SỬA LỖI LẪN TYPE: gốc "ISTJ… → ENFP…"]
      'Cả hai: Lập tín hiệu "chế độ" — ENFP: "Mình cần nói cho hết cảm xúc." ISTP: "Mình cần xử lý một mình."',
    ],
    funFact: 'ENFP và ISTP cùng có chức năng cảm nhận hiện tại trong cấu trúc — cả hai đều thích trải nghiệm bằng giác quan, tạo một điểm chung thực tế để xây trên đó. [S]',
    coverage: 'full',
  },
}
