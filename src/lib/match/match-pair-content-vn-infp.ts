// match-pair-content-vn-infp.ts
// Task 4 retone — BATCH 10: 7 cặp INFP+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// compat-only: INFP+INFP · Sửa lỗi lẫn type: INFP+INTJ, INFP+INTP · Thay filler: INFP+ISFJ

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_INFP: Record<string, MatchPairContent> = {
  'INFP+INFP': {
    pairKey: 'INFP+INFP',
    tenCap: 'Chân thực đồng hành',
    texture: 'growth_pair',
    dongLuc: 'Hiểu nhau hoàn toàn về nhu cầu chân thật và chiều sâu.',
    vungDeHop: 'Không phán xét — cả hai mang trọn vẹn con người mình ra một cách tự do.',
    vungMaSat: 'Cả hai đều cần được trấn an và đều tránh va chạm — ai sẽ khởi xướng những cuộc nói chuyện khó?',
    canDeY: [
      'Tạo một nếp "không gian can đảm" — mỗi tháng một cuộc trò chuyện thẳng thắn về mối quan hệ.',
    ],
    cachDiQua: [],
    coverage: 'compat-only',
  },
  'INFP+INTJ': {
    pairKey: 'INFP+INTJ',
    tenCap: 'Chiều sâu bổ sung',
    texture: 'growth_pair',
    dongLuc: 'INFP mang giá trị và sự chân thật; INTJ mang chiến lược và chiều sâu — cả hai đều tìm ý nghĩa.',
    vungDeHop: 'Những cuộc trò chuyện sâu về cuộc sống và mục đích — giàu cả trí tuệ lẫn cảm xúc.',
    vungMaSat: 'INTJ có thể nói thẳng; INFP để bụng — cách nói cực kỳ quan trọng. INTJ thẳng và bộc trực; INFP rất nhạy cảm — INTJ có thể làm INFP tổn thương mà không hay, và INFP không nói ra khiến INTJ không biết.',
    canDeY: [
      'INTJ: đóng khung góp ý là "giúp mình hiểu" thay vì "bạn sai". INFP: tách ý tưởng khỏi con người mình.',
      'INTJ nói thẳng, gọn → INFP để bụng và rút lui.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → ISTJ…"]
      'INFP giữ tổn thương trong lòng → INTJ không biết có vấn đề.', // [SỬA LỖI LẪN TYPE: gốc "ISTJ… → ENFP…"]
    ],
    cachDiQua: [
      'INFP: Nói cho INTJ biết ngay khi điều gì đó làm bạn đau — họ không đọc được ẩn ý cảm xúc và thật sự muốn biết.',
      'INTJ: Sau khi nói một điều, thêm "Câu đó nghe thế nào?" — bạn không cần làm mềm sự thật, chỉ cần kiểm tra tác động.',
      'Cả hai: Sự thẳng thắn của INTJ + chiều sâu của INFP = thành thật và có ý nghĩa — một sự kết hợp hiếm khi nó hợp.',
    ],
    funFact: 'INFP và INTJ đều là những người nghĩ độc lập, không theo lối mòn — cả hai thường thấy bị hiểu lầm, và thường hiểu nhau hơn phần đông. [P]',
    coverage: 'full',
  },
  'INFP+INTP': {
    pairKey: 'INFP+INTP',
    tenCap: 'Tư duy gặp giá trị',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội và yêu chiều sâu — INFP qua cảm xúc, INTP qua tư duy.',
    vungDeHop: 'Kết nối sâu — cả hai tôn trọng nhu cầu suy ngẫm và sự chân thật của nhau.',
    vungMaSat: 'INFP cần kết nối cảm xúc; INTP thoải mái hơn với kết nối trí tuệ. Cả hai đều hướng nội và xử lý trong đầu — kết nối đòi hỏi nỗ lực chủ động mà cả hai đều có xu hướng né.',
    canDeY: [
      'INTP: thỉnh thoảng để tâm tới cảm xúc.',
      'INFP: thỉnh thoảng tham gia bằng logic.',
      'INTP dừng ở phân tích → INFP thấy thiếu kết nối cảm xúc.', // [SỬA LỖI LẪN TYPE: gốc "ENTJ… → ISFP…"]
      'Cả hai cùng ngại mở lời → khoảng cách dần len vào.', // [SỬA LỖI LẪN TYPE: gốc "ISFP… → ENTJ…"]
    ],
    cachDiQua: [
      'INFP: Nói thẳng khi bạn cần kết nối cảm xúc — "Mình cần bạn nghe, chưa cần phân tích."', // [SỬA LỖI LẪN TYPE: gốc "ESTP… → INFJ…"]
      'INTP: Thỉnh thoảng hỏi "Điều này khiến bạn thấy thế nào?" — INFP cần câu hỏi đó.', // [SỬA LỖI LẪN TYPE: gốc "INFJ… → ESTP…"]
      'Cả hai: Sắp lịch ở bên nhau một cách rõ ràng — cả hai đều thoải mái một mình, nên kết nối cần được chủ động.',
    ],
    funFact: 'INFP và INTP đều rất cá tính và ghét bị bảo phải cảm hay nghĩ gì. Cùng sự tôn trọng sâu sắc dành cho khoảng riêng của nhau. [S]',
    coverage: 'full',
  },
  'INFP+ISFJ': {
    pairKey: 'INFP+ISFJ',
    tenCap: 'Ấm áp chân thực',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thiên cảm xúc và biết quan tâm — INFP trừu tượng hơn, ISFJ cụ thể hơn trong cách bày tỏ.',
    vungDeHop: 'Cùng ấm áp và chăm sóc — mối quan hệ thấy an toàn và được nâng đỡ.',
    vungMaSat: 'INFP phóng khoáng hơn; ISFJ có cấu trúc hơn — căng nhau về lối sống. INFP hướng về tương lai và giá trị; ISFJ hướng về quá khứ và kinh nghiệm — hai điểm tựa khác nhau khi quyết định.',
    canDeY: [
      'INFP: tôn trọng nhu cầu lên kế hoạch của ISFJ.',
      'ISFJ: cho INFP tự do sáng tạo trong cách thể hiện riêng.',
      'INFP phóng khoáng đổi ý → ISFJ bất an vì mất nề nếp.', // [SỬA FILLER: gốc "Nhớ rằng khác biệt không có nghĩa là sai"]
      'ISFJ giữ thói quen cũ → INFP thấy hơi tù túng.', // [SỬA FILLER: gốc "Tạo ritual nhỏ để duy trì kết nối hàng ngày"]
    ],
    cachDiQua: [
      'INFP: Nói ra giá trị quan trọng với bạn để ISFJ hiểu — họ sẵn lòng nâng đỡ khi biết rõ.', // [SỬA FILLER: gốc "Đặt thời gian 'nói chuyện quan trọng'…"]
      'ISFJ: Cho INFP biết bạn vẫn linh hoạt được — họ cần thấy có khoảng thở.', // [SỬA FILLER: gốc "Học ngôn ngữ tình yêu của nhau"]
      'Cả hai: Cả hai đều thiên cảm xúc và đều dịu dàng — nói thẳng với nhau thường an toàn hơn nhiều cặp khác.',
    ],
    funFact: 'INFP và ISFJ đều có cảm xúc nội tâm và ký ức nội tâm — thứ tự khác nhau nhưng cùng một chiều sâu nội tâm và sự quan tâm chân thành. [S]',
    coverage: 'full',
  },
  'INFP+ISFP': {
    pairKey: 'INFP+ISFP',
    tenCap: 'Linh hồn tự do',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thiên cảm xúc và phóng khoáng — sống thật, theo giá trị, và có chất nghệ.',
    vungDeHop: 'Tự do, chân thật và chấp nhận lẫn nhau — không ai cố thay đổi ai.',
    vungMaSat: 'Cả hai đều rất dịu dàng và né tránh va chạm — an toàn cảm xúc tuyệt đối nhưng những điều quan trọng mãi không được nói ra.',
    canDeY: [
      'Luân phiên khởi xướng những cuộc nói thẳng — biến nó thành một nếp yêu thương, không phải một sự kiện đáng sợ.',
      'Cả hai cùng né va chạm → những điều khó không bao giờ được giải quyết.',
      'Không ai tự nhiên đứng ra lo phần trách nhiệm thực tế.',
    ],
    cachDiQua: [
      'INFP: La bàn giá trị của bạn sẽ chỉ ra điều cần được giải quyết — tin vào nó và hành động.',
      'ISFP: Sự chân thật của bạn nghĩa là bạn đủ sức đón nhận lời nói thẳng — hãy mời nó đến.',
      'Cả hai: Đóng khung sự chia sẻ thật lòng như tình yêu: "Mình nói điều này vì muốn hai đứa thật với nhau."',
    ],
    funFact: 'INFP và ISFP đều thiên cảm xúc và phóng khoáng — sự chấp nhận lẫn nhau sâu nhất, không ai phán xét ai. Thử thách hiếm hoi là những điều quan trọng cần được nói ra. [S]',
    coverage: 'full',
  },
  'INFP+ISTJ': {
    pairKey: 'INFP+ISTJ',
    tenCap: 'Khoảng cách lớn',
    texture: 'challenge_pair',
    dongLuc: 'INFP lý tưởng và trừu tượng; ISTJ thực tế và cụ thể — khác nhau ở mọi thứ.',
    vungDeHop: 'ISTJ mang sự đáng tin; INFP mang ý nghĩa — nếu hai người trân trọng được nhau.',
    vungMaSat: 'ISTJ thấy INFP không thực tế; INFP thấy ISTJ thiếu chiều sâu. INFP trừu tượng và lý tưởng; ISTJ cụ thể và có hệ thống — hai cách xử lý gây hiểu lầm dai dẳng.',
    canDeY: [
      'Tìm một giá trị chung (trung thực, lòng trung thành) làm nền — xây từ đó.',
      'ISTJ thấy INFP thiếu thực tế; INFP thấy ISTJ bỏ lỡ ý nghĩa thật.',
      'Khác nhau về nhu cầu: xử lý cảm xúc trước hay tiến tới việc trước.',
    ],
    cachDiQua: [
      'INFP: Dùng ví dụ cụ thể để ISTJ có thể đánh giá — giúp thu hẹp khoảng cách.',
      'ISTJ: Lắng nghe nghiêm túc những nỗi lo về giá trị của INFP — họ thường nhận ra điều quan trọng.',
      'Cả hai: Cả hai đều trung thực và trung thành — sự tin tưởng vốn rất mạnh ngay cả khi phong cách khác nhau.',
    ],
    funFact: 'INFP và ISTJ đều hướng nội — cả hai trầm và sâu, tạo nên một sự dễ chịu nhất định bất chấp khác biệt về định hướng. [S]',
    coverage: 'full',
  },
  'INFP+ISTP': {
    pairKey: 'INFP+ISTP',
    tenCap: 'Khác nhịp cơ bản',
    texture: 'challenge_pair',
    dongLuc: 'INFP sống trong cảm xúc và ý nghĩa; ISTP sống trong logic và hành động — hai cách xử lý đối nghịch.',
    vungDeHop: 'ISTP mang sự vững chân; INFP mang chiều sâu — có thể cân bằng.',
    vungMaSat: 'INFP dễ tổn thương bởi sự thẳng thắn của ISTP; ISTP không phải lúc nào cũng biết mình đã nói gì sai. INFP rất giàu cảm xúc và theo giá trị; ISTP thiên logic và hành động — hai khung khác nhau ở gần như mọi thứ.',
    canDeY: [
      'ISTP: kiểm tra "câu đó nghe thế nào?" INFP: nói khi bạn tổn thương thay vì rút lui.',
      'Cách tiếp cận logic của ISTP gạt đi những nỗi lo dựa trên cảm xúc của INFP.',
      'Cường độ cảm xúc của INFP có thể làm ISTP thực dụng quá tải.',
    ],
    cachDiQua: [
      'INFP: ISTP thể hiện tình yêu qua việc sửa giúp bạn mọi thứ — hãy nhận nó như sự quan tâm.',
      'ISTP: Hỏi "Bạn thấy thế nào về điều này?" — INFP cần câu hỏi đó, dù ngắn.',
      'Cả hai: Cả hai đều rất cá tính — sự tôn trọng chân thành dành cho khoảng riêng của nhau là một nền tảng thật.',
    ],
    funFact: 'INFP và ISTP đều hướng nội và kín đáo — cùng sự thoải mái với khoảng riêng tạo nên một sự dễ chịu bất ngờ. [S]',
    coverage: 'full',
  },
}
