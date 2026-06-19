// match-pair-content-vn-infj.ts
// Task 4 retone — BATCH 9: 8 cặp INFJ+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// compat-only: INFJ+INFJ, INFJ+INFP · Sửa lỗi lẫn type: INFJ+INTP (gốc lẫn ESFJ)

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_INFJ: Record<string, MatchPairContent> = {
  'INFJ+INFJ': {
    pairKey: 'INFJ+INFJ',
    tenCap: 'Tâm hồn đồng điệu',
    texture: 'growth_pair',
    dongLuc: 'Hai nhóm hiếm tìm thấy nhau — thấu hiểu sâu sắc, kết nối sâu.',
    vungDeHop: 'Sự thấu hiểu sâu nhất có thể — không cần giải thích.',
    vungMaSat: 'Cả hai đều gánh cảm xúc của nhau — dễ cùng chìm trong những lúc khó khăn.',
    canDeY: [
      'Tạo khoảng để mỗi người xử lý riêng — không phải mọi thứ đều cần xử lý cùng nhau.',
    ],
    cachDiQua: [],
    coverage: 'compat-only',
  },
  'INFJ+INFP': {
    pairKey: 'INFJ+INFP',
    tenCap: 'Chiều sâu và chân thực',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều tìm ý nghĩa và sự chân thật — kết nối sâu về con người thật của mỗi người.',
    vungDeHop: 'Thấu hiểu sâu và trân trọng nhau — mối quan hệ thấy có ý nghĩa.',
    vungMaSat: 'Cả hai đều nhạy cảm và cần được trấn an — ai sẽ là người cho trước?',
    canDeY: [
      'Luân phiên làm người "vững" hơn — đừng cho rằng người kia lúc nào cũng ổn.',
    ],
    cachDiQua: [],
    coverage: 'compat-only',
  },
  'INFJ+INTJ': {
    pairKey: 'INFJ+INTJ',
    tenCap: 'Chiều sâu tư duy',
    texture: 'golden_pair',
    dongLuc: 'Cùng trực giác hướng nội và yêu chiều sâu — INFJ với cảm xúc, INTJ với tư duy — một sự bổ sung đẹp.',
    vungDeHop: 'Cả hai đều có tầm nhìn và chiều sâu — những cuộc trò chuyện sâu và một sứ mệnh chung.',
    vungMaSat: 'INFJ cần kết nối cảm xúc; INTJ kín đáo hơn — INFJ có thể thấy chưa đủ gần. Cả hai đều có tầm nhìn nội tâm mạnh — khi tầm nhìn va nhau, cả hai đều ngại nhường.',
    canDeY: [
      'INTJ: bày tỏ sự quan tâm rõ ràng hơn bằng lời.',
      'INFJ: trân trọng hành động của INTJ như một cách họ thể hiện quan tâm.',
      'Cách nói thẳng của INTJ → INFJ tổn thương sâu.',
      'INFJ cần được công nhận cảm xúc → INTJ muốn nhảy vào giải pháp.',
    ],
    cachDiQua: [
      'INTJ: Ghi nhận góc nhìn của INFJ trước khi trình bày góc nhìn của bạn.',
      'INFJ: Tham gia vào logic của INTJ — với nhóm này, cảm xúc cần được nâng đỡ bởi lý lẽ.',
      'Cả hai: Hai người đều thuộc nhóm hiếm và đã tìm thấy nhau — bản thân điều đó đã đặc biệt rồi.',
    ],
    funFact: 'INTJ và INFJ là hai trong những nhóm hiếm nhất nhưng hay tìm thấy nhau trong những cộng đồng trí tuệ. [P]',
    coverage: 'full',
  },
  'INFJ+INTP': {
    pairKey: 'INFJ+INTP',
    tenCap: 'Khám phá cùng nhau',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều yêu những ý tưởng sâu — INFJ thêm sự thấu hiểu con người, INTP thêm khung logic.',
    vungDeHop: 'Một mối quan hệ giàu trí tuệ — kết hợp tầm nhìn với phân tích.',
    vungMaSat: 'INFJ cần được công nhận cảm xúc và kết nối; INTP thoải mái với kết nối thuần trí tuệ — khoảng cách về mức độ thân mật.',
    canDeY: [
      'INTP: công nhận cảm xúc trước khi phân tích.',
      'INFJ: cho INTP thời gian suy nghĩ trước khi mong có câu trả lời.',
      'INTP trả lời chậm → INFJ hiểu nhầm là thờ ơ.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ESFJ…"]
      'INFJ cần hồi đáp cảm xúc → INTP dừng lại ở phân tích.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → INTP…"]
    ],
    cachDiQua: [
      'INFJ: Khi INTP phân tích cảm xúc của bạn thay vì công nhận chúng, nói thẳng: "Mình cần bạn nói \'mình nghe bạn\', chưa cần phân tích."',
      'INTP: Tập hỏi "Điều này khiến bạn thấy thế nào?" và thật sự chờ câu trả lời — INFJ cần câu hỏi đó thường xuyên.',
      'Cả hai: Chiều sâu trí tuệ là một sợi dây thật — đừng xem nhẹ, nhưng INFJ cần thêm một lớp cảm xúc.',
    ],
    funFact: 'INFJ và INTP đều dễ cuốn vào thế giới nội tâm — cả hai có thể biến mất vào trong và cần người kia kéo ra. [S]',
    coverage: 'full',
  },
  'INFJ+ISFJ': {
    pairKey: 'INFJ+ISFJ',
    tenCap: 'Chăm sóc sâu sắc',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều tận tụy và quan tâm — INFJ trừu tượng hơn, ISFJ cụ thể hơn trong cách bày tỏ.',
    vungDeHop: 'Cả hai đều quan tâm sâu và đáng tin — một mối quan hệ dựa trên sự quan tâm chân thành.',
    vungMaSat: 'INFJ hướng về tương lai và tầm nhìn; ISFJ hướng về kinh nghiệm và hiện tại — hai điểm tựa khác nhau khi quyết định.',
    canDeY: [
      'INFJ: tôn trọng những nề nếp của ISFJ.',
      'ISFJ: cởi mở với tầm nhìn tương lai của INFJ.',
      'Tầm nhìn trừu tượng của INFJ va với sở thích cái cụ thể của ISFJ.',
      'Thời gian một mình của INFJ bị ISFJ hiểu nhầm là xa cách.',
    ],
    cachDiQua: [
      'INFJ: Tôn trọng sự thận trọng dựa trên kinh nghiệm của ISFJ — những gì họ đã trải là dữ liệu thật.',
      'ISFJ: Tham gia vào tầm nhìn của INFJ — họ thường cảm được điều quan trọng trước khi nó hiện ra.',
      'Cả hai: Cả hai đều quan tâm sâu và tận tụy — nền tảng này rất chắc. Khác biệt phong cách chỉ là bề mặt.',
    ],
    funFact: 'INFJ và ISFJ đều có trực giác hoặc ký ức nội tâm dẫn đầu — cả hai đều giàu nội tâm và rất trung thành, chỉ là INFJ hướng về tương lai còn ISFJ hướng về quá khứ. [S]',
    coverage: 'full',
  },
  'INFJ+ISFP': {
    pairKey: 'INFJ+ISFP',
    tenCap: 'Chiều sâu gặp chân thực',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều coi trọng chiều sâu và sự chân thật — INFJ có cấu trúc hơn, ISFP phóng khoáng hơn.',
    vungDeHop: 'Cả hai đều chân thành và quan tâm — mối quan hệ thấy thật, không phải diễn.',
    vungMaSat: 'INFJ cần nhiều cấu trúc hơn; ISFP cần nhiều tự do hơn — đôi khi căng. INFJ có cấu trúc và hướng tương lai; ISFP phóng khoáng và hướng hiện tại — nhịp sống khác nhau.',
    canDeY: [
      'INFJ: cho ISFP khoảng tự do sáng tạo.',
      'ISFP: cho INFJ chút khả năng đoán trước.',
      'Việc lên kế hoạch của INFJ va với sự tập trung vào hiện tại của ISFP.',
      'ISFP cần nhiều tự do hơn mức cách tiếp cận có cấu trúc của INFJ cho phép.',
    ],
    cachDiQua: [
      'INFJ: Cho ISFP sự tự do sáng tạo — sự chân thật của họ là điểm mạnh, không phải vấn đề.',
      'ISFP: Tham gia vào tầm nhìn dài hạn của INFJ — bạn có thể thấy vẻ đẹp trong tương lai họ nhìn ra.',
      'Cả hai: Cả hai đều tìm một cuộc sống chân thật và có ý nghĩa — mục tiêu chung là có thật.',
    ],
    funFact: 'INFJ và ISFP đều hướng nội và thiên cảm xúc — trầm, sâu và biết quan tâm. Sự dịu dàng tự nhiên với nhau là một món quà thật. [S]',
    coverage: 'full',
  },
  'INFJ+ISTJ': {
    pairKey: 'INFJ+ISTJ',
    tenCap: 'Khác nhưng tôn trọng',
    texture: 'challenge_pair',
    dongLuc: 'INFJ trừu tượng và thấu cảm; ISTJ cụ thể và có hệ thống — hai cách xử lý khác nhau.',
    vungDeHop: 'ISTJ mang sự đáng tin; INFJ mang chiều sâu — một nền móng chắc với những thế mạnh khác nhau.',
    vungMaSat: 'ISTJ thấy INFJ quá trừu tượng; INFJ thấy ISTJ quá cứng. INFJ trừu tượng và có tầm nhìn; ISTJ cụ thể và có hệ thống — cách xử lý thông tin gần như ngược nhau.',
    canDeY: [
      'INFJ: trình bày ý tưởng một cách cụ thể.',
      'ISTJ: cởi mở với những điều không đo đếm được.',
      'ISTJ cần bằng chứng trước khi tin vào trực giác của INFJ.',
      'Cách tiếp cận trừu tượng của INFJ va với sở thích cái cụ thể của ISTJ.',
    ],
    cachDiQua: [
      'INFJ: Đặt những hiểu biết của bạn vào bằng chứng cụ thể mà ISTJ có thể đánh giá.',
      'ISTJ: Coi trọng khả năng nhận diện mẫu hình của INFJ ngay cả khi chưa có bằng chứng.',
      'Cả hai: Tầm nhìn của INFJ + khả năng triển khai của ISTJ = những ý tưởng thật sự thành hiện thực.',
    ],
    funFact: 'INFJ và ISTJ đều hướng nội và thích sự dứt khoát — cùng sự hướng nội và nhu cầu chốt việc tạo nên một sự dễ chịu ngầm. [S]',
    coverage: 'full',
  },
  'INFJ+ISTP': {
    pairKey: 'INFJ+ISTP',
    tenCap: 'Hai thế giới',
    texture: 'challenge_pair',
    dongLuc: 'INFJ sống trong ý nghĩa và tương lai; ISTP sống trong logic và hiện tại — định hướng rất khác.',
    vungDeHop: 'ISTP mang sự thực tế vững chân; INFJ mang ý nghĩa — nếu bắc cầu được.',
    vungMaSat: 'INFJ cần chiều sâu cảm xúc; ISTP thấy không thoải mái với cường độ cảm xúc. INFJ cần chiều sâu cảm xúc và ý nghĩa; ISTP thích logic và hành động thực tế — khoảng cách giao tiếp sâu sắc.',
    canDeY: [
      'ISTP: thử để tâm tới cảm xúc.',
      'INFJ: đừng đòi hỏi ISTP lúc nào cũng sẵn sàng về cảm xúc.',
      'INFJ cần chiều sâu cảm xúc mà ISTP không tự nhiên cho được.',
      'Sự im lặng của ISTP bị INFJ nhạy cảm hiểu nhầm là chối từ.',
    ],
    cachDiQua: [
      'INFJ: Đừng đòi hỏi ISTP luôn sẵn sàng về cảm xúc — sự hiện diện điềm tĩnh của họ chính là cách họ quan tâm.',
      'ISTP: Thỉnh thoảng thử hỏi "Điều này khiến bạn thấy thế nào?"',
      'Cả hai: Sự thấu suốt của INFJ + năng lực thực tế của ISTP = vấn đề vừa được hiểu vừa được giải quyết.',
    ],
    funFact: 'INFJ và ISTP có cấu trúc chức năng đối nghịch — tạo nên sự cuốn hút lẫn nhau từ những thế mạnh rất khác. [S]',
    coverage: 'full',
  },
}
