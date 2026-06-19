// match-pair-content-vn-enfp.ts
// Task 4 retone — BATCH 2a: 8 cặp ENFP+* (ENFP+ENFP → ENFP+INFJ)
// Content agent · 16/06/2026 · tiếp tục từ ENFJ batch
// Đã: bỏ EN code-mixing · sửa lỗi lẫn type (ENFP+ENTJ/ENTP/ESFJ/ESFP/ESTJ/ESTP) · giữ pairKey/texture/coverage/tag nguồn
// ⚠️ Còn 7 cặp ENFP (INFP,INTJ,INTP,ISFJ,ISFP,ISTJ,ISTP) + 105 cặp khác — CẦN MA re-upload match-pair-content.ts (file đã reset khỏi uploads)

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_ENFP: Record<string, MatchPairContent> = {
  'ENFP+ENFP': {
    pairKey: 'ENFP+ENFP',
    tenCap: 'Hai ngọn lửa',
    texture: 'growth_pair',
    dongLuc: 'Hiểu nhau hoàn toàn về nhu cầu tự do và kết nối — nhưng ai sẽ là người giữ ổn định?',
    vungDeHop: 'Không bao giờ chán, cùng tần số sáng tạo và hào hứng với cuộc sống.',
    vungMaSat: 'Cả hai đều khởi đầu nhiều thứ — ai sẽ theo đến cùng? Cả hai đều cần được công nhận — ai sẽ là người cho?',
    canDeY: [
      'Phân vai "người giữ nhịp" — luân phiên ai lo phần thực tế của cuộc sống.',
      'Cả hai mở nhiều dự án, không ai làm xong → bực dồn lại.',
      'Cả hai cùng cần được công nhận một lúc → không ai còn sức để cho.',
    ],
    cachDiQua: [
      'ENFP (người A): Tập làm người vững — khi người kia đang xuống, bạn giữ thăng bằng thay vì cùng chìm theo.',
      'ENFP (người B): Tương tự — thống nhất tín hiệu: "Lúc này mình cần bạn vững, không cần sôi nổi."',
      'Cả hai: Phân một người làm "trụ của ngày" theo lịch — hôm đó người ấy lo phần thực tế.',
    ],
    funFact: 'ENFP được cho là nhóm "vẫn còn lấp lánh sau 20 năm bên nhau" khi ghép với nhau — nếu dựng được chút cấu trúc. [P]',
    coverage: 'full',
  },
  'ENFP+ENTJ': {
    pairKey: 'ENFP+ENTJ',
    tenCap: 'Ước mơ và Thực thi',
    texture: 'growth_pair',
    dongLuc: 'ENFP có tầm nhìn và đam mê; ENTJ có chiến lược và khả năng triển khai — bổ sung mạnh nhất giữa ý tưởng và kết quả.',
    vungDeHop: 'ENTJ giúp ENFP biến ý tưởng thành hiện thực; ENFP giúp ENTJ kết nối với cảm xúc và sự sáng tạo.',
    vungMaSat: 'ENFP muốn khám phá nhiều hướng; ENTJ muốn chốt một hướng và bắt tay làm — căng nhau về thời điểm quyết định.',
    canDeY: [
      'ENTJ: trân trọng cái tia sáng ý tưởng, đừng chỉ chê khâu thực hiện.',
      'ENFP: chọn trận mà giữ sự tự phát.',
      'ENTJ chốt hạn cứng cho quyết định → ENFP thấy bị bó.', // [SỬA LỖI LẪN TYPE: gốc "ESTJ… → INFP…"]
      'ENFP đổi hướng liên tục → ENTJ bực vì thiếu sự theo đến cùng.',
    ],
    cachDiQua: [
      'ENFP: Khi ENTJ đặt hạn chót cho một quyết định, đó không phải kiểm soát — đó là điều cần để thật sự đạt được thứ bạn quan tâm.',
      'ENTJ: Cho thêm thời gian khám phá trước hạn chót — sự lang thang của ENFP thường sinh ra điều bạn sẽ bỏ lỡ.',
      'Cả hai: "Khám phá đến [ngày], chốt vào [ngày]" — một cấu trúc tôn trọng cả hai nhu cầu.',
    ],
    funFact: 'ENFP và ENTJ cùng có chức năng nhìn ra khả năng và mối liên hệ dễ dàng — nhưng ENTJ hướng nó vào triển khai, còn ENFP hướng vào khám phá. [S]',
    coverage: 'full',
  },
  'ENFP+ENTP': {
    pairKey: 'ENFP+ENTP',
    tenCap: 'Ý tưởng không tắt',
    texture: 'growth_pair',
    dongLuc: 'Cùng yêu khám phá và khả năng — cuộc trò chuyện giữa hai người này không bao giờ nhàm.',
    vungDeHop: 'Kích thích nhau liên tục về trí tuệ và sáng tạo — mối quan hệ luôn thấy sống động.',
    vungMaSat: 'Cả hai đều ngẫu hứng — ai lo việc hậu cần? Cả hai đều tản mạn — dễ cùng khởi đầu mà không kết thúc.',
    canDeY: [
      'Có cơ chế "nhắc nhau theo đến cùng" — một cách nhắc nhau hoàn tất việc.',
      'Cả hai né phần hậu cần thực tế → mọi thứ dồn tới phút chót.',
      'ENTP phản biện hăng → ENFP dễ chạnh lòng vì coi ý tưởng là chuyện cá nhân.', // [SỬA LỖI LẪN TYPE: gốc "INFP… → ESTJ…"]
    ],
    cachDiQua: [
      'ENFP: Khi ENTP thách thức ý tưởng bạn quý, phân biệt: họ đang khám phá hay thật sự phản đối? Hỏi thẳng.',
      'ENTP: Nhớ rằng ENFP coi ý tưởng là chuyện cá nhân theo cách bạn không — ra dấu khi bạn đang đóng vai phản biện.',
      'Cả hai: Phân một người lo hậu cần cho mỗi chuyến đi/sự kiện — luân phiên trách nhiệm.',
    ],
    funFact: 'ENFP và ENTP đều có chức năng nhìn-ra-khả-năng dẫn đầu — trò chuyện của họ thường nhảy từ chủ đề A đến Z trong 30 phút và cả hai đều mê điều đó. [S]',
    coverage: 'full',
  },
  'ENFP+ESFJ': {
    pairKey: 'ENFP+ESFJ',
    tenCap: 'Ấm áp khác nhịp',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều quan tâm, nhưng ENFP cần tự do khám phá; ESFJ cần ổn định và nề nếp.',
    vungDeHop: 'ESFJ mang sự ấm áp và chăm sóc; ENFP mang sự hào hứng — cân bằng được nếu tôn trọng nhịp sống của nhau.',
    vungMaSat: 'ESFJ cần cấu trúc và nề nếp; ENFP cần ngẫu hứng và mới mẻ — lệch nhau về lối sống.',
    canDeY: [
      'Lên trước "thời gian phiêu lưu" để ENFP có chỗ ngẫu hứng trong khuôn ESFJ cần.',
      'ENFP đổi hoặc hủy hẹn phút chót → ESFJ thấy bất an vì mất nề nếp.', // [SỬA LỖI LẪN TYPE: gốc "ENTP… → ISFJ…"]
      'ESFJ giữ thói quen cũ → ENFP thấy tù túng và muốn đổi mới.', // [SỬA LỖI LẪN TYPE: gốc "ISFJ… → ENTP…"]
    ],
    cachDiQua: [
      'ENFP: Tôn trọng kế hoạch của ESFJ — khi họ đã sắp xếp gì đó, việc hủy gây hụt hẫng lớn hơn bạn tưởng.',
      'ESFJ: Chừa vài khoảng "trống không lịch" — cho ENFP chỗ để thở.',
      'Cả hai: Lên "ngày phiêu lưu" từ sớm — ESFJ có cấu trúc, ENFP có cái mới.',
    ],
    funFact: 'ENFP và ESFJ đều thiên về cảm xúc — cả hai đều thật sự quan tâm người khác, chỉ là ENFP qua giá trị còn ESFJ qua hòa khí. [S]',
    coverage: 'full',
  },
  'ENFP+ESFP': {
    pairKey: 'ENFP+ESFP',
    tenCap: 'Cùng sống hết mình',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều yêu trải nghiệm và con người — năng lượng cao, vui vẻ, không ai làm buồn ai.',
    vungDeHop: 'Cuộc sống với cặp này đầy màu sắc — cùng khám phá, cùng tận hưởng, cùng kết nối với người xung quanh.',
    vungMaSat: 'Cả hai đều ngẫu hứng và ham vui — ai sẽ lo phần không-vui của cuộc sống?',
    canDeY: [
      'Đặt một "buổi lo việc" mỗi tháng — dành một buổi cùng nhau xử lý phần thực tế.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → INTJ…"]
      'Cả hai cùng mải vui → giấy tờ, hóa đơn, kế hoạch dài hạn bị bỏ quên.', // [SỬA LỖI LẪN TYPE: gốc "ISTP… → ESFJ…"]
      'Cả hai cùng cần được công nhận một lúc → dễ hụt khi không ai cho.',
    ],
    cachDiQua: [
      'ENFP: Khi muốn một cuộc trò chuyện sâu hơn, mời ESFP cùng tham gia nhẹ nhàng — đừng cho rằng họ không thích chiều sâu.', // [SỬA LỖI LẪN TYPE: gốc "INTJ… → ESFJ…"]
      'ESFP: Khi ENFP muốn bàn chuyện ý nghĩa, hãy nhập cuộc — đó là cách ENFP kết nối.',
      'Cả hai: Mỗi tháng một "buổi xử lý việc chán" — cùng nhau làm phần thực tế và biến nó thành chuyện vui.',
    ],
    funFact: 'ENFP và ESFP đều ngẫu hứng và thiên cảm xúc — mối quan hệ này có thể thấy vui một cách dễ dàng, nhất là ở giai đoạn đầu. [P]',
    coverage: 'full',
  },
  'ENFP+ESTJ': {
    pairKey: 'ENFP+ESTJ',
    tenCap: 'Đối cực khó hòa',
    texture: 'challenge_pair',
    dongLuc: 'ENFP sống bằng khả năng; ESTJ sống bằng hệ thống đã được kiểm chứng — thế giới quan nền tảng khác nhau.',
    vungDeHop: 'ESTJ mang cấu trúc ENFP cần; ENFP mang sự linh hoạt ESTJ thiếu — cân bằng được nếu cố gắng.',
    vungMaSat: 'ENFP muốn khám phá khả năng; ESTJ muốn theo cách đã được kiểm chứng — khác nhau căn bản trong cách tiếp cận cuộc sống.',
    canDeY: [
      'Tập trung vào kết quả chung, không phải cách làm khác nhau.',
      'ENFP đổi hướng → ESTJ bực vì thiếu nhất quán.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ESFP…"]
      'ESTJ áp quy trình cứng → ENFP thấy bị bó và mất hứng.',
    ],
    cachDiQua: [
      'ENFP: Trình bày ý tưởng kèm ví dụ thực tế — ESTJ cần thấy bằng chứng rằng cách của bạn chạy được.',
      'ESTJ: Khi ENFP đề xuất cái mới, hỏi lý do trước khi gạt — đôi khi cái "chưa kiểm chứng" lại mở ra điều bạn chưa thấy.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → ISTP…"]
      'Cả hai: Cùng quyết: khi nào theo lối đã chứng minh, khi nào thử nghiệm.',
    ],
    funFact: 'ENFP và ESTJ đối lập ở nhiều mặt nhưng cùng quan tâm sâu sắc tới con người — chỉ là theo những cách rất khác. [S]',
    coverage: 'full',
  },
  'ENFP+ESTP': {
    pairKey: 'ENFP+ESTP',
    tenCap: 'Năng lượng gặp nhau',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng ngoại và yêu trải nghiệm — dễ vui cùng nhau.',
    vungDeHop: 'ESTP mang sự thực tế vững chân; ENFP mang trí tưởng tượng — bổ sung tốt khi tôn trọng nhau.',
    vungMaSat: 'Cả hai đều nhiều năng lượng, nhưng ENFP cần ý nghĩa đằng sau hành động; ESTP cần chính hành động — đôi khi thấy nhau hời hợt hoặc nghĩ ngợi quá.',
    canDeY: [
      'ESTP: tìm hiểu vì sao ENFP coi trọng vài điều nhất định.',
      'ENFP: đôi khi trân trọng hành động hơn là phân tích.',
      'ENFP cần ý nghĩa sâu, ESTP thích niềm vui bề mặt → dễ chưa đủ chiều sâu cho ENFP.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → ISTJ…" / "ISTJ… → ENFP…"]
    ],
    cachDiQua: [
      'ENFP: Cùng ESTP bắt tay làm trước — bạn có thể thấy ý nghĩa nằm ngay trong trải nghiệm, không chỉ trong việc lên kế hoạch.',
      'ESTP: ENFP cần một chút chiều sâu phía sau cuộc vui — thử hỏi "điều này có ý nghĩa gì với bạn?"', // [SỬA LỖI LẪN TYPE: gốc "ESFP… → INTP…"]
      'Cả hai: Những cuộc phiêu lưu có mục đích — hoạt động ESTP mê, cuộc trò chuyện ENFP cần, cả hai đều vui.',
    ],
    funFact: 'ENFP và ESTP đều thuộc nhóm tìm-kiếm-trải-nghiệm — chỉ khác: ENFP qua những mẫu hình trừu tượng, ESTP qua trải nghiệm cụ thể. [S]',
    coverage: 'full',
  },
  'ENFP+INFJ': {
    pairKey: 'ENFP+INFJ',
    tenCap: 'Kết nối hiếm có',
    texture: 'golden_pair',
    dongLuc: 'INFJ hiểu chiều sâu của ENFP; ENFP kéo INFJ ra khỏi vỏ — cặp này tìm thấy nhau như kiểu "cuối cùng cũng gặp".',
    vungDeHop: 'Cuộc trò chuyện sâu nhất, kết nối thật nhất — cả hai đều tìm ý nghĩa và sự chân thật.',
    vungMaSat: 'ENFP cần kích thích từ bên ngoài; INFJ cần không gian bên trong — dễ va nhau về nhịp sống xã hội.',
    canDeY: [
      'ENFP: tôn trọng khoảng một mình của INFJ như cách họ nạp lại, không phải sự chối từ.',
      'INFJ: nói cần gì trước khi đóng cửa lại.',
      'Năng lượng xã hội của ENFP làm kiệt sức INFJ.',
      'Thời gian một mình của INFJ bị ENFP hiểu nhầm là xa cách.',
    ],
    cachDiQua: [
      'ENFP: Tôn trọng thời gian một mình của INFJ — nó cần thiết để họ hiện diện trọn vẹn với bạn.',
      'INFJ: Nói trước nhu cầu nạp lại để ENFP không phải đoán.',
      'Cả hai: Có tối ra ngoài (ENFP), có tối ở nhà đi vào chiều sâu (INFJ) — trân trọng cả hai.',
    ],
    funFact: 'ENFP và INFJ được nhiều cộng đồng MBTI gọi là "cặp vàng" — cùng chiều sâu NF với mức năng lượng bổ sung cho nhau. [P]',
    coverage: 'full',
  },
}
