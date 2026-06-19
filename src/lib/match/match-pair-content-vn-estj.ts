// match-pair-content-vn-estj.ts
// Task 4 retone — BATCH 7: 10 cặp ESTJ+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// Sửa lỗi lẫn type: ESTJ+ESTJ, ESTJ+ISFJ, ESTJ+ISTJ
// Thay FILLER chung chung: ESTJ+ESTP, ESTJ+INFJ, ESTJ+INFP, ESTJ+ISFP, ESTJ+ISTP

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_ESTJ: Record<string, MatchPairContent> = {
  'ESTJ+ESTJ': {
    pairKey: 'ESTJ+ESTJ',
    tenCap: 'Cùng tiêu chuẩn',
    texture: 'growth_pair',
    dongLuc: 'Hiểu nhau về trách nhiệm và cấu trúc — một nền móng rất chắc.',
    vungDeHop: 'Cực kỳ đáng tin — cả hai đều có mặt, làm tới nơi, và cùng xây dựng.',
    vungMaSat: 'Cả hai đều cứng về "cách làm đúng" — khi bất đồng về phương pháp, không ai muốn nhường vì cả hai đều có thành tích.',
    canDeY: [
      'Thống nhất: trong một mối quan hệ, "thắng" không tồn tại — chỉ có "cùng giải quyết".',
      'Cả hai cùng muốn áp cách của mình → bế tắc khi bất đồng.', // [SỬA LỖI LẪN TYPE: gốc "INTJ… → ESFJ…"]
      'Cả hai cùng quyết liệt → tranh chấp dễ thành cuộc đọ sức.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → INTJ…"]
    ],
    cachDiQua: [
      'ESTJ (người A): Trước khi khăng khăng cách của mình, hỏi "Kết quả cả hai cùng muốn là gì?" — thường nhiều đường dẫn về cùng một đích.',
      'ESTJ (người B): Nhường những điều nhỏ thường xuyên — thắng mọi cuộc tranh luận sẽ giết thiện chí. Chọn trận mà đấu.',
      'Cả hai: Thống nhất rằng "ai đúng" ít quan trọng hơn "cái gì chạy được". Định nghĩa lại chữ "thắng".',
    ],
    funFact: 'ESTJ+ESTJ là cặp có sức triển khai cao nhất — khi đồng lòng, gần như không có gì họ không cùng xây được. [P]',
    coverage: 'full',
  },
  'ESTJ+ESTP': {
    pairKey: 'ESTJ+ESTP',
    tenCap: 'Hành động cùng nhau',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều dứt khoát và thực tế — nể nhau về năng lực.',
    vungDeHop: 'Cùng nhau hoàn thành công việc — một đội hiệu quả.',
    vungMaSat: 'ESTJ làm theo hệ thống và dài hạn; ESTP cơ hội và ngắn hạn — căng nhau về tốc độ và việc cam kết với kế hoạch.',
    canDeY: [
      'ESTJ: tin vào trực giác ngắn hạn của ESTP.',
      'ESTP: tôn trọng kế hoạch dài hạn của ESTJ.',
      'ESTP ứng biến đổi kế hoạch → ESTJ thấy mất hệ thống.', // [SỬA FILLER CHUNG CHUNG: gốc "Hỏi trước khi đưa ra giải pháp…"]
      'ESTJ áp quy trình cứng → ESTP thấy bị bó.', // [SỬA FILLER CHUNG CHUNG: gốc "Chấp nhận rằng im lặng…"]
    ],
    cachDiQua: [
      'ESTJ: Tin vào khả năng ứng biến của ESTP khi tình huống đổi — không phải mọi cú xoay đều là thất bại.',
      'ESTP: Báo trước cho ESTJ khi lệch khỏi kế hoạch — họ cần cảm giác chuẩn bị được.', // [SỬA FILLER: gốc "Nói lời cảm ơn cụ thể…"]
      'Cả hai: Cả hai đều thực tế và lý trí — chung một cách tiếp cận logic. Đây là điểm chung vững.',
    ],
    funFact: 'ESTJ và ESTP đều hướng ngoại, thực tế và dứt khoát. Sự nể nhau về năng lực đến tự nhiên. [S]',
    coverage: 'full',
  },
  'ESTJ+INFJ': {
    pairKey: 'ESTJ+INFJ',
    tenCap: 'Khác nhau sâu xa',
    texture: 'challenge_pair',
    dongLuc: 'ESTJ cụ thể và truyền thống; INFJ trừu tượng và hướng tương lai — hai cách xử lý khác nhau.',
    vungDeHop: 'INFJ mang tầm nhìn và sự thấu cảm; ESTJ mang khả năng triển khai và sự ổn định.',
    vungMaSat: 'ESTJ thấy INFJ quá lý tưởng; INFJ thấy ESTJ quá cứng. ESTJ cụ thể và có hệ thống; INFJ trừu tượng và trực giác — hai cách xử lý khác nhau gây hiểu lầm dai dẳng.',
    canDeY: [
      'ESTJ: cân nhắc tầm nhìn của INFJ trước khi gạt đi.',
      'INFJ: trình bày ý tưởng bằng những từ thực tế.',
      'INFJ cần chiều sâu và ý nghĩa → ESTJ tập trung vào cái cụ thể trước mắt.', // [SỬA FILLER: gốc "Bạn cần ổn định. Họ cần tự do…"]
      'ESTJ muốn kết quả ngay → INFJ cần thời gian để cảm cho đúng hướng.', // [SỬA FILLER: gốc "Bạn sống trong hiện tại…"]
    ],
    cachDiQua: [
      'ESTJ: Khi INFJ đưa ra một góc nhìn dài hạn, đừng vội gạt vì nó "không thực tế" — hỏi thêm trước.', // [SỬA FILLER: gốc "Bạn hành động. Họ lên kế hoạch…"]
      'INFJ: Đóng khung ý tưởng của bạn bằng kết quả cụ thể — ESTJ tiếp nhận tốt hơn khi thấy được điều hữu hình.', // [SỬA FILLER: gốc "Bạn trân trọng cảm xúc…"]
      'Cả hai: Khả năng triển khai của ESTJ + tầm nhìn của INFJ = một sự kết hợp mạnh khi hai người tin nhau.',
    ],
    funFact: 'ESTJ và INFJ có cấu trúc chức năng đối nghịch — tạo nên cả va chạm lẫn sự bổ sung thật. [S]',
    coverage: 'full',
  },
  'ESTJ+INFP': {
    pairKey: 'ESTJ+INFP',
    tenCap: 'Rất khác nhau',
    texture: 'challenge_pair',
    dongLuc: 'ESTJ thực tế và có hệ thống; INFP lý tưởng và sống theo giá trị — gần như đối lập ở mọi mặt.',
    vungDeHop: 'INFP mang sự chân thật và giá trị; ESTJ mang cấu trúc và hành động.',
    vungMaSat: 'ESTJ có thể lấn át INFP; INFP có thể không nói rõ nhu cầu của mình — dễ thành một thế lệch. ESTJ thực tế và hướng kết quả; INFP sống theo giá trị và hướng ý nghĩa — hai định nghĩa khác nhau về thành công.',
    canDeY: [
      'ESTJ: chậm lại và lắng nghe.',
      'INFP: tập nói rõ nhu cầu mà không cần xin lỗi.',
      'ESTJ quyết nhanh, áp đặt → INFP thấy giá trị mình bị bỏ qua.', // [SỬA FILLER: gốc "Hỏi trước khi đưa ra giải pháp"]
      'INFP cần xử lý nội tâm → ESTJ sốt ruột muốn chốt.', // [SỬA FILLER: gốc "Nói thẳng điều mình cần"]
    ],
    cachDiQua: [
      'ESTJ: Chậm lại và lắng nghe nỗi lo của INFP cho trọn — họ thường phát hiện vấn đề từ sớm.',
      'INFP: Nói nhu cầu thẳng và cụ thể — ESTJ không làm việc tốt với ám chỉ, nhưng đáp lại tốt với lời đề nghị rõ.',
      'Cả hai: Thống nhất kết quả chung trước — rồi tôn trọng những con đường khác nhau để đến đó.',
    ],
    funFact: 'ESTJ và INFP đối lập về tính khí — nhưng cả hai đều rất trung thành và tận tâm một khi đã cam kết. [S]',
    coverage: 'full',
  },
  'ESTJ+INTJ': {
    pairKey: 'ESTJ+INTJ',
    tenCap: 'Cùng xây dựng',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều dứt khoát — cùng tư duy chiến lược và quyết đoán — một nền móng chắc.',
    vungDeHop: 'Một đội hiệu quả — INTJ đưa tầm nhìn, ESTJ đưa khả năng triển khai.',
    vungMaSat: 'Cả hai đều có thể cứng nhắc — khi bất đồng, không ai muốn nhường. ESTJ thiên về cách đã được kiểm chứng; INTJ muốn thiết kế lại từ gốc — căng nhau liên tục về thay đổi.',
    canDeY: [
      'Phân định trước phạm vi quyết định — ai có tiếng nói cuối ở lĩnh vực nào.',
      'INTJ muốn thiết kế lại cái ESTJ đã tối ưu.',
      'Cả hai cứng về cách làm → bế tắc.',
    ],
    cachDiQua: [
      'ESTJ: Cân nhắc nghiêm túc các đề xuất cải tiến của INTJ — họ thường nhìn ra vấn đề ở tầng hệ thống.',
      'INTJ: Ghi nhận điều đang chạy tốt trước khi đề xuất thay đổi.',
      'Cả hai: ESTJ làm mọi thứ hiệu quả ngay bây giờ; INTJ làm chúng tốt hơn về lâu dài. Cần cả hai.',
    ],
    funFact: 'ESTJ và INTJ đều thiên tư duy hướng ngoại và dứt khoát — cùng định hướng hiệu quả và tôn trọng kết quả. Sự nể nhau đến tự nhiên dù phong cách khác. [S]',
    coverage: 'full',
  },
  'ESTJ+INTP': {
    pairKey: 'ESTJ+INTP',
    tenCap: 'Khác phong cách',
    texture: 'challenge_pair',
    dongLuc: 'ESTJ hành động; INTP phân tích — dễ làm nhau bực về tốc độ và cách tiếp cận.',
    vungDeHop: 'INTP mang phân tích sâu; ESTJ mang khả năng triển khai — cân bằng tốt nếu tôn trọng nhau.',
    vungMaSat: 'ESTJ thấy INTP do dự; INTP thấy ESTJ chưa nghĩ đủ. ESTJ muốn hành động; INTP muốn phân tích thêm — căng nhau về tốc độ và việc chốt ở mỗi quyết định lớn.',
    canDeY: [
      'ESTJ: cho INTP thời gian phân tích.',
      'INTP: đưa cho ESTJ một quyết định để họ tiến tới.',
      'ESTJ thúc chốt trước khi INTP phân tích đủ.',
      'INTP phân tích quá mức khi ESTJ đã chốt xong.',
    ],
    cachDiQua: [
      'ESTJ: Cho INTP thời gian phân tích — sự kỹ lưỡng của họ thường bắt được những lỗi đắt giá.',
      'INTP: Đưa ra phân tích kèm khuyến nghị, không chỉ liệt kê các điểm cần cân nhắc.',
      'Cả hai: Chiều sâu của INTP + hành động của ESTJ = những quyết định vừa đúng vừa thật sự được thực thi.',
    ],
    funFact: 'ESTJ và INTP đều thiên lý trí — cùng tôn trọng logic và năng lực tạo sự nể nhau về mặt chuyên môn một cách tự nhiên. [S]',
    coverage: 'full',
  },
  'ESTJ+ISFJ': {
    pairKey: 'ESTJ+ISFJ',
    tenCap: 'Ổn định hài hòa',
    texture: 'golden_pair',
    dongLuc: 'Cả hai đều thuộc nhóm gìn giữ nề nếp — cùng coi trọng gia đình, sự ổn định và trách nhiệm — hợp nhau tự nhiên.',
    vungDeHop: 'Một cặp cực kỳ ổn định và đáng tin — cả hai mang sự cam kết và chăm sóc.',
    vungMaSat: 'ESTJ thiên logic; ISFJ thiên cảm xúc — đôi khi căng về quyết định. ESTJ quả quyết và thẳng; ISFJ dịu dàng và gián tiếp — ISFJ có thể không nói rõ nhu cầu và ESTJ bỏ lỡ tín hiệu.',
    canDeY: [
      'ESTJ: công nhận cảm xúc của ISFJ trước khi đưa logic.',
      'ISFJ: biết rằng ESTJ thể hiện tình yêu qua hành động.',
      'ISFJ giữ nhu cầu trong lòng → ESTJ bỏ lỡ tín hiệu.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → ISTP…"]
      'ESTJ quyết theo logic → ISFJ thấy thiếu sự công nhận cảm xúc.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ESFJ…"]
    ],
    cachDiQua: [
      'ESTJ: Công nhận cảm xúc trước khi nhảy vào giải pháp — ISFJ cần thấy mình được nghe.', // [SỬA LỖI LẪN TYPE: gốc "ISTP… → ENFP…"]
      'ISFJ: Tập nói nhu cầu thẳng — "Mình cần X" thay vì ám chỉ và mong ESTJ tự nhận ra.',
      'Cả hai: Cùng nhóm gìn giữ nề nếp — chung giá trị về bổn phận và gia đình. Xây từ điểm chung này.',
    ],
    funFact: 'ESTJ và ISFJ đều có nền ký ức quá khứ dẫn đầu — cùng trân trọng truyền thống, sự nhất quán và gìn giữ những gì đang hiệu quả. [S]',
    coverage: 'full',
  },
  'ESTJ+ISFP': {
    pairKey: 'ESTJ+ISFP',
    tenCap: 'Cần nhiều cầu nối',
    texture: 'challenge_pair',
    dongLuc: 'ESTJ có cấu trúc và quả quyết; ISFP dịu dàng và phóng khoáng — biểu hiện tính cách đối lập.',
    vungDeHop: 'ISFP mang sự chân thật và chất nghệ; ESTJ mang cấu trúc và định hướng.',
    vungMaSat: 'Sự mạnh mẽ của ESTJ có thể làm ISFP quá tải; sự né tránh của ISFP làm ESTJ bực. ESTJ quả quyết và thẳng; ISFP dịu dàng và theo giá trị — cách nói của ESTJ có thể nghe gắt và lấn át.',
    canDeY: [
      'ESTJ: làm nhẹ cách tiếp cận đáng kể khi ở cạnh ISFP.',
      'ISFP: tập nói rõ nhu cầu của mình.',
      'ESTJ nói thẳng, áp đặt → ISFP rút lui im lặng.', // [SỬA FILLER: gốc "Thử làm điều gì đó mới cùng nhau mỗi tháng"]
      'ISFP né va chạm → ESTJ thấy hụt vì không biết họ nghĩ gì.', // [SỬA FILLER: gốc "Nói ra điều bạn trân trọng…"]
    ],
    cachDiQua: [
      'ESTJ: Làm mềm cách nói đáng kể với ISFP — cùng dữ kiện, khác giọng, kết quả khác hẳn.',
      'ISFP: Tập nói nhu cầu thẳng — "Mình cần X" thay vì ám chỉ và mong ESTJ đoán.',
      'Cả hai: Cấu trúc của ESTJ + sự chân thật của ISFP = một cuộc sống vừa chạy được vừa có ý nghĩa.',
    ],
    funFact: 'ESTJ và ISFP có cách phán đoán đối nghịch — tạo nên cả sự tò mò lẫn căng thẳng. [S]',
    coverage: 'full',
  },
  'ESTJ+ISTJ': {
    pairKey: 'ESTJ+ISTJ',
    tenCap: 'Đất vững chắc',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thuộc nhóm thực tế và gìn giữ nề nếp — rất hợp về giá trị và cách sống.',
    vungDeHop: 'Cặp ổn định và đáng tin nhất — cam kết và theo việc đến cùng.',
    vungMaSat: 'Cả hai rất giống nhau — có thể thiếu cái "tia khác biệt" thúc đẩy phát triển. Cả hai đều có chính kiến mạnh về "cách làm đúng" — khi cách làm khác nhau, cả hai đều quyết bám cách của mình.',
    canDeY: [
      'Chủ động đưa cái mới vào — mỗi tháng một trải nghiệm mới.',
      'Cả hai cùng giữ nếp cũ → dễ trôi vào lối mòn.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → INTP…"]
      'Cả hai ít bày tỏ cảm xúc → mối quan hệ dễ thiếu hơi ấm.', // [SỬA LỖI LẪN TYPE: gốc "ENFJ… → ISTP…"]
    ],
    cachDiQua: [
      'ESTJ: Tận dụng sự kỹ lưỡng của ISTJ thay vì thúc họ nhanh hơn — kết quả thường tốt hơn.',
      'ISTJ: Tham gia vào tầm nhìn rộng hơn của ESTJ khi bạn muốn đi sâu vào chi tiết — bắt đầu từ "vì sao".',
      'Cả hai: Thử cách "dựa vào thành tích" — thử cả hai cách làm một lần và để dữ liệu quyết định.',
    ],
    funFact: 'ESTJ và ISTJ đều thực tế và gìn giữ nề nếp — đây là cặp dễ xây dựng sự nể nhau nhất vì cả hai đều thể hiện sự đáng tin qua hành động. [P]',
    coverage: 'full',
  },
  'ESTJ+ISTP': {
    pairKey: 'ESTJ+ISTP',
    tenCap: 'Thực tế chung',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều thực tế và coi trọng năng lực — nể nhau.',
    vungDeHop: 'Cả hai đều thực dụng và ưa hành động — cùng nhau hoàn thành việc.',
    vungMaSat: 'ESTJ muốn kế hoạch và sự tuân thủ; ISTP muốn linh hoạt — va chạm về cấu trúc. ESTJ muốn quy trình có hệ thống; ISTP muốn ứng biến theo tình huống thực tế — va chạm về cách làm.',
    canDeY: [
      'ESTJ: để ISTP giải quyết theo cách của họ.',
      'ISTP: báo trước cho ESTJ đủ sớm để họ thấy chuẩn bị được.',
      'ESTJ áp quy trình cứng → ISTP thấy bị bó.', // [SỬA FILLER: gốc "Học cách đối phương muốn được an ủi…"]
      'ISTP ứng biến không báo → ESTJ thấy mất kiểm soát.', // [SỬA FILLER: gốc "Thống nhất trước về cách xử lý…"]
    ],
    cachDiQua: [
      'ESTJ: Để ISTP tự giải quyết theo cách của họ ở những việc không quá quan trọng — kết quả thường giống nhau, chỉ khác đường đi.',
      'ISTP: Báo trước cho ESTJ khi lệch khỏi kế hoạch — một câu là đủ.', // [SỬA FILLER: gốc "Tạo ritual nhỏ hàng ngày…"]
      'Cả hai: Cả hai đều thực tế và lý trí — chung sự tôn trọng logic và năng lực. Hãy để điều đó dẫn dắt.',
    ],
    funFact: 'ESTJ và ISTP đều thực tế và lý trí — cả hai coi trọng năng lực gần như trên hết. Sự nể nhau đến từ kỹ năng thể hiện được. [S]',
    coverage: 'full',
  },
}
