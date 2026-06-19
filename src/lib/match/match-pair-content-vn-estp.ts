// match-pair-content-vn-estp.ts
// Task 4 retone — BATCH 8: 9 cặp ESTP+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// Sửa lỗi lẫn type: ESTP+ESTP, ESTP+ISFP, ESTP+ISTJ, ESTP+ISTP
// Sửa funFact placeholder lỗi ở ESTP+ISFJ (gốc ghi "[N/A] — see existing entry") + thay filler

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_ESTP: Record<string, MatchPairContent> = {
  'ESTP+ESTP': {
    pairKey: 'ESTP+ESTP',
    tenCap: 'Năng lượng không ngừng',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều sống với hiện tại và ưa hành động — không bao giờ buồn tẻ.',
    vungDeHop: 'Năng lượng cao và vui — luôn có chuyện gì đó đang diễn ra.',
    vungMaSat: 'Cả hai đều ganh đua và thẳng — tranh luận dễ leo thang nhanh vì không ai muốn lùi.',
    canDeY: [
      'Hướng năng lượng ganh đua vào hoạt động chung, không phải chống lại nhau.',
      'Cả hai cùng ganh đua → tranh luận dễ thành đọ sức.', // [SỬA LỖI LẪN TYPE: gốc "INFJ… → ESTJ…"]
      'Cả hai ít bày tỏ cảm xúc → kết nối dễ dừng ở bề mặt.', // [SỬA LỖI LẪN TYPE: gốc "INTJ… → ENFP…"]
    ],
    cachDiQua: [
      'ESTP (người A): "Thắng" một cuộc tranh luận với người kia làm hao vốn của mối quan hệ. Có đáng không?', // [SỬA LỖI LẪN TYPE: gốc "ESTJ… → INFJ…"]
      'ESTP (người B): Tương tự — kìm phản xạ phải hơn người kia; chọn trận mà đấu.',
      'Cả hai: Hướng năng lượng ganh đua ra ngoài — cùng nhau "đấu" với thế giới, không đấu nhau.',
    ],
    funFact: 'ESTP+ESTP là cặp có nhiều hoạt động "làm cùng nhau" nhất — phiêu lưu, thể thao, xây dựng. Hành động chính là cách họ gắn kết. [P]',
    coverage: 'full',
  },
  'ESTP+INFJ': {
    pairKey: 'ESTP+INFJ',
    tenCap: 'Hút nhau bí ẩn',
    texture: 'growth_pair',
    dongLuc: 'Sức sống của ESTP cuốn hút INFJ; chiều sâu của INFJ cuốn hút ESTP — sức hút ban đầu mạnh.',
    vungDeHop: 'ESTP giúp INFJ sống trọn vẹn hơn; INFJ giúp ESTP phát triển chiều sâu và ý nghĩa.',
    vungMaSat: 'ESTP cần hành động và giao tiếp; INFJ cần yên tĩnh và chiều sâu — va chạm lối sống. ESTP hướng về hành động và hiện tại; INFJ hướng về tầm nhìn và ý nghĩa — định hướng rất khác về việc sống để làm gì.',
    canDeY: [
      'Cả hai đều cần co giãn: ESTP đôi khi chậm lại, INFJ đôi khi nhập cuộc nhiều hơn.',
      'Sự thẳng thắn của ESTP làm INFJ nhạy cảm tổn thương sâu.',
      'Nhu cầu ý nghĩa và chiều sâu của INFJ va với sở thích hành động của ESTP.',
    ],
    cachDiQua: [
      'ESTP: Dành 10 phút nói chuyện thật về điều quan trọng với INFJ.',
      'INFJ: Thỉnh thoảng nhập cuộc hành động cùng ESTP — bạn có thể tìm thấy ý nghĩa ngay trong việc làm.',
      'Cả hai: ESTP kéo INFJ ra khỏi cái đầu; INFJ cho hành động của ESTP một hướng đi. Bổ sung thật.',
    ],
    funFact: 'ESTP và INFJ có cấu trúc chức năng đối nghịch — tạo nên sự cuốn hút mạnh ở giai đoạn đầu. [S]',
    coverage: 'full',
  },
  'ESTP+INFP': {
    pairKey: 'ESTP+INFP',
    tenCap: 'Khác sâu xa',
    texture: 'challenge_pair',
    dongLuc: 'ESTP phát triển trong thế giới bên ngoài; INFP phát triển trong thế giới bên trong — hai hành tinh khác nhau.',
    vungDeHop: 'ESTP kéo INFP vào hành động; INFP kéo ESTP vào sự suy ngẫm.',
    vungMaSat: 'Sự thẳng thắn của ESTP tác động sâu đến INFP; sự nhạy cảm của INFP nghe như quá nhiều kịch tính với ESTP. ESTP nói thẳng và đặt hành động lên trước; INFP rất nhạy cảm và sống theo giá trị — ESTP có thể làm INFP tổn thương mà không nhận ra, lặp đi lặp lại.',
    canDeY: [
      'ESTP: nói nhẹ hơn nhiều khi ở cạnh INFP.',
      'INFP: nhìn sự thẳng thắn của ESTP là trung thực, không phải công kích.',
      'Sự thẳng thắn của ESTP làm INFP nhạy cảm tổn thương sâu.',
      'Nhu cầu cảm xúc của INFP nghe như quá nhiều với ESTP vốn thiên hành động.',
    ],
    cachDiQua: [
      'ESTP: Chậm lại riêng với INFP — cùng sự thẳng thắn, gói lại mềm hơn nhiều, kết quả tốt hơn hẳn.',
      'INFP: Nói cho ESTP biết khi họ nói điều gì đó làm bạn đau — họ thật sự không biết và sẽ điều chỉnh.',
      'Cả hai: ESTP đưa INFP ra với thế giới; INFP cho thế giới của ESTP một ý nghĩa. Một sự trao đổi quà thật sự.',
    ],
    funFact: 'ESTP và INFP có định hướng chức năng đối nghịch — mỗi người mang đúng điều người kia thiếu. Vừa cuốn hút vừa thử thách. [S]',
    coverage: 'full',
  },
  'ESTP+INTJ': {
    pairKey: 'ESTP+INTJ',
    tenCap: 'Tôn trọng từ xa',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều giỏi và tự tin — nể nhau nhưng định hướng thế giới rất khác.',
    vungDeHop: 'INTJ đưa chiều sâu chiến lược; ESTP đưa khả năng triển khai trong thực tế.',
    vungMaSat: 'INTJ lập kế hoạch chậm và chiến lược; ESTP hành động nhanh — căng nhau về tốc độ. ESTP hành động dựa trên dữ liệu hiện tại; INTJ tính theo mẫu hình dài hạn — căng nhau về khi nào nên hành động và khi nào nên tính thêm.',
    canDeY: [
      'INTJ: để ESTP hành động trong khi bạn tính toán.',
      'ESTP: tin vào bức tranh lớn của INTJ.',
      'ESTP hành động trước khi INTJ tính xong hệ quả dài hạn.',
      'Kế hoạch tỉ mỉ của INTJ làm ESTP thiên hành động thấy nản.',
    ],
    cachDiQua: [
      'ESTP: Tin vào những đọc hiểu dài hạn của INTJ — họ thường đoán được điều dữ liệu hiện tại chưa thấy.',
      'INTJ: Tin vào khả năng đọc tình huống tức thời của ESTP — họ thấy điều trong hiện tại mà bạn bỏ lỡ.',
      'Cả hai: Chiến thuật của ESTP + chiến lược của INTJ = bao quát ở mọi tầm thời gian.',
    ],
    funFact: 'ESTP và INTJ đều coi trọng năng lực — sự nể nhau qua kỹ năng thể hiện được đến tự nhiên. [P]',
    coverage: 'full',
  },
  'ESTP+INTP': {
    pairKey: 'ESTP+INTP',
    tenCap: 'Sắc bén theo cách khác',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều phân tích nhưng ESTP trong thế giới thực, INTP trong thế giới trừu tượng — hai cách áp dụng trí tuệ khác nhau.',
    vungDeHop: 'INTP đưa khái niệm; ESTP đưa ứng dụng — hợp nhau về trí tuệ.',
    vungMaSat: 'ESTP muốn hành động; INTP muốn phân tích thêm — lệch nhau về tốc độ. ESTP hành động dựa trên kinh nghiệm thực tế; INTP phân tích trước khi hành động — lệch nhau về tốc độ ở các quyết định.',
    canDeY: [
      'Thống nhất một mốc thời gian quyết định để ESTP hành động được mà INTP vẫn thấy được nghe.',
      'ESTP hành động khi INTP vẫn đang phân tích.',
      'INTP phân tích quá mức khi ESTP cần đi ngay.',
    ],
    cachDiQua: [
      'ESTP: Cho INTP thời gian phân tích trước khi thúc hành động — họ thường bắt được điều bạn bỏ lỡ.',
      'INTP: Nhận ra khi phân tích đã đủ và hành động — xu hướng hành động của ESTP thường có kết quả.',
      'Cả hai: Luân phiên ai dẫn — lúc theo trực giác của ESTP, lúc theo phân tích của INTP.',
    ],
    funFact: 'ESTP và INTP đều thiên lý trí — cùng một khung logic tạo sự nể nhau về trí tuệ bất ngờ dù phong cách rất khác. [S]',
    coverage: 'full',
  },
  'ESTP+ISFJ': {
    pairKey: 'ESTP+ISFJ',
    tenCap: 'Khác nhau nhưng bù nhau',
    texture: 'challenge_pair',
    dongLuc: 'ESTP mang sự phiêu lưu; ISFJ mang sự chăm sóc — đối lập nhưng bổ sung.',
    vungDeHop: 'Sự ấm áp của ISFJ làm dịu ESTP; năng lượng của ESTP tiếp sức cho ISFJ.',
    vungMaSat: 'Sự thẳng thắn của ESTP làm ISFJ tổn thương sâu; nhu cầu ổn định của ISFJ làm ESTP thấy ngột. ESTP nói thẳng và đặt hành động lên trước; ISFJ dịu dàng và cần sự ấm áp — ESTP thường làm ISFJ tổn thương mà không hay.',
    canDeY: [
      'ESTP: đối với ISFJ bằng sự dịu dàng có chủ ý.',
      'ISFJ: thỉnh thoảng để ESTP rủ mình đi phiêu lưu.',
      'ESTP nói thẳng, bộc trực → ISFJ tổn thương.', // [SỬA FILLER: gốc "Chia sẻ một điều bạn lo lắng…"]
      'ISFJ giữ nề nếp ổn định → ESTP thấy bị bó.', // [SỬA FILLER: gốc "Đặt điện thoại xuống trong 30 phút…"]
    ],
    cachDiQua: [
      'ESTP: Nói nhẹ hơn với ISFJ — cùng nội dung, gói mềm hơn, kết quả khác hẳn.', // [SỬA FILLER: gốc "Khen ngợi nỗ lực…"]
      'ISFJ: Nói cho ESTP biết khi họ làm bạn đau — họ thật sự không nhận ra và sẽ điều chỉnh khi được nói rõ.',
      'Cả hai: Sự chăm sóc của ISFJ làm dịu cái gai của ESTP; hành động của ESTP giúp ISFJ tiến tới. Bổ sung thật.',
    ],
    funFact: 'ESTP và ISFJ đối lập ở nhiều mặt nhưng cùng sống với hiện tại — ESTP qua hành động, ISFJ qua sự chăm sóc thực tế. [S]', // [SỬA LỖI: gốc ghi "[N/A] — đã có trong file gốc… see existing entry" (placeholder generator)]
    coverage: 'full',
  },
  'ESTP+ISFP': {
    pairKey: 'ESTP+ISFP',
    tenCap: 'Cùng nhịp bình an',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều sống với hiện tại — thoải mái và thực tế — dễ chịu tự nhiên.',
    vungDeHop: 'Không ai gây áp lực cho ai — mối quan hệ thấy tự do.',
    vungMaSat: 'ESTP quả quyết hơn; ISFP kín đáo hơn — nhu cầu của ISFP dễ bị bỏ qua. ESTP nói thẳng và quả quyết; ISFP dịu dàng và rất giàu cảm xúc — ESTP có thể làm ISFP tổn thương mà không nhận ra.',
    canDeY: [
      'ESTP: hỏi han nhau đều đặn.',
      'ISFP: lên tiếng trước khi chạm ngưỡng chịu đựng.',
      'ESTP thẳng và quả quyết → ISFP rút lui im lặng.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → INTJ…"]
      'ISFP kín đáo → ESTP không nhận ra nhu cầu của họ.', // [SỬA LỖI LẪN TYPE: gốc "ISTP… → ESFP…"]
    ],
    cachDiQua: [
      'ESTP: Làm mềm cách nói đáng kể với ISFP — không phải vì bạn sai, mà vì cách nói ảnh hưởng đến kết quả.',
      'ISFP: Nói cho ESTP biết khi điều gì đó làm bạn đau — họ không bắt được ẩn ý và thật sự muốn biết.',
      'Cả hai: Cùng yêu khoảnh khắc hiện tại và trải nghiệm giác quan — xây kết nối qua hoạt động chung.',
    ],
    funFact: 'ESTP và ISFP đều sống với hiện tại — cả hai đều thực tế, tạo sự hợp ý về lối sống một cách tự nhiên. [S]',
    coverage: 'full',
  },
  'ESTP+ISTJ': {
    pairKey: 'ESTP+ISTJ',
    tenCap: 'Thực tế gặp nhau',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều thực tế và lý trí — nể nhau về năng lực.',
    vungDeHop: 'Cả hai đều hoàn thành việc — cùng nhau xây dựng tốt.',
    vungMaSat: 'ISTJ muốn theo quy trình; ESTP muốn ứng biến — va chạm đáng kể về cách làm. ESTP ứng biến; ISTJ theo quy trình đã được kiểm chứng — căng nhau nền tảng về cách tiếp cận khi có vấn đề.',
    canDeY: [
      'ESTP: tôn trọng nhu cầu theo kế hoạch của ISTJ.',
      'ISTJ: thỉnh thoảng để ESTP ứng biến.',
      'ESTP ứng biến đổi kế hoạch → ISTJ thấy mất an toàn.', // [SỬA LỖI LẪN TYPE: gốc "ISTJ và ENFP tưởng trái ngược…"]
      'ISTJ bám quy trình cứng → ESTP thấy bị gò.', // [SỬA LỖI LẪN TYPE: gốc "INFJ là loại hiếm nhất — dưới 2% dân số"]
    ],
    cachDiQua: [
      'ESTP: Tôn trọng nhu cầu làm theo cách đã quen của ISTJ — đó không phải cứng nhắc, mà là quản trị rủi ro.',
      'ISTJ: Cho ESTP một khoảng để ứng biến ở những việc không quá quan trọng — kết quả thường vẫn ổn.', // [SỬA LỖI LẪN TYPE: gốc "Cặp INTJ + ENFP được nghiên cứu nhiều nhất…"]
      'Cả hai: Cả hai đều thực tế — thống nhất kết quả cần đạt, rồi tôn trọng những con đường khác nhau để tới đó.',
    ],
    funFact: 'ESTP và ISTJ đều thực tế và lý trí — cùng coi trọng năng lực và hiệu quả thực tế tạo nên sự nể nhau ngầm. [S]',
    coverage: 'full',
  },
  'ESTP+ISTP': {
    pairKey: 'ESTP+ISTP',
    tenCap: 'Anh em cùng nhịp',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thuộc nhóm thực tế sống-với-hiện-tại — sở thích cốt lõi giống nhau, dễ hiểu nhau.',
    vungDeHop: 'Thoải mái, thực tế và ưa hành động — mối quan hệ không có kịch tính thừa.',
    vungMaSat: 'Cả hai đều thích hành động hơn cảm xúc — kết nối có thể dừng ở bề mặt nếu không chủ động.',
    canDeY: [
      'Thỉnh thoảng hỏi nhau "hai đứa mình dạo này thế nào?" — tạo chỗ cho cảm xúc.',
      'Cả hai cùng ngại nói cảm xúc → khoảng cách cảm xúc dần len vào.', // [SỬA LỖI LẪN TYPE: gốc "ESFP… → ISTP…"]
      'Cả hai ưa hành động → dễ quên phần nuôi dưỡng tình cảm.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ENFJ…"]
    ],
    cachDiQua: [
      'ESTP: Là người chủ động mở những cuộc "mình dạo này thế nào?" — bạn có nhiều năng lượng xã hội hơn, hãy dẫn dắt việc này.',
      'ISTP: Nhập cuộc khi ESTP muốn kết nối — bạn có thể thích ở một mình, nhưng mối quan hệ cần được chăm.',
      'Cả hai: Gắn kết qua dự án chung và phiêu lưu — với nhóm sống-với-hiện-tại, hành động chính là kết nối.',
    ],
    funFact: 'ESTP và ISTP đều thực tế và sống với hiện tại — cùng cách tiếp cận logic và yêu năng lực thực tế tạo sự nể nhau mạnh. [S]',
    coverage: 'full',
  },
}
