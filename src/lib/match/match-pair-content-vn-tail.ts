// match-pair-content-vn-tail.ts
// Task 4 retone — BATCH 12 (CUỐI): 15 cặp INTP+* (5), ISFJ+* (4), ISFP+* (3), ISTJ+* (2), ISTP+ISTP (1)
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// compat-only: INTP+INTP
// Sửa lỗi lẫn type: ISFJ+ISFJ, ISFJ+ISFP, ISFJ+ISTJ, ISFP+ISFP, ISFP+ISTJ, ISFP+ISTP, ISTJ+ISTJ, ISTP+ISTP
// Thay filler chung chung: ISTJ+ISTP

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_TAIL: Record<string, MatchPairContent> = {
  'INTP+INTP': {
    pairKey: 'INTP+INTP',
    tenCap: 'Ý tưởng không ngừng',
    texture: 'growth_pair',
    dongLuc: 'Hiểu nhau hoàn toàn về tình yêu với ý tưởng và nhu cầu có khoảng riêng.',
    vungDeHop: 'Tự do trí tuệ — cả hai khám phá ý tưởng không phán xét.',
    vungMaSat: 'Cả hai đều không giỏi cảm xúc — mối quan hệ có thể thiếu hơi ấm.',
    canDeY: [
      'Tập hỏi han nhau về cảm xúc — không chỉ về ý tưởng.',
    ],
    cachDiQua: [],
    coverage: 'compat-only',
  },
  'INTP+ISFJ': {
    pairKey: 'INTP+ISFJ',
    tenCap: 'Ít điểm chung',
    texture: 'challenge_pair',
    dongLuc: 'INTP trừu tượng và logic; ISFJ cụ thể và cảm xúc — hai ngôn ngữ khác nhau.',
    vungDeHop: 'ISFJ mang sự ấm áp và chăm sóc; INTP mang chiều sâu và những góc nhìn mới.',
    vungMaSat: 'Sự tách bạch của INTP làm ISFJ tổn thương; nhu cầu kết nối cảm xúc của ISFJ làm INTP cạn sức. INTP thoải mái với khoảng cách cảm xúc; ISFJ cần sự ấm áp và kết nối — khoảng cách thân mật nền tảng.',
    canDeY: [
      'INTP: tập hỏi ISFJ đang thấy thế nào.',
      'ISFJ: cho INTP sự gắn kết về trí tuệ.',
      'Sự ít biểu lộ cảm xúc của INTP khiến ISFJ thấy không được nhìn thấy.',
      'Các nghĩa vụ xã giao của ISFJ làm INTP kiệt sức đáng kể.',
    ],
    cachDiQua: [
      'INTP: Hỏi "Bạn đang thấy thế nào?" mỗi ngày một lần — ISFJ cần câu hỏi đó.',
      'ISFJ: Cách INTP giúp giải quyết vấn đề chính là ngôn ngữ quan tâm của họ — hãy nhận nó như vậy.',
      'Cả hai: Chiều sâu của INTP + sự ấm áp của ISFJ = vừa giàu trí tuệ vừa an toàn về cảm xúc.',
    ],
    funFact: 'INTP và ISFJ đều hướng nội — cùng sự hướng nội tạo nên một sự yên tĩnh dễ chịu. Khoảng cách về cách thể hiện quan tâm là điều cần xử lý chính. [S]',
    coverage: 'full',
  },
  'INTP+ISFP': {
    pairKey: 'INTP+ISFP',
    tenCap: 'Khám phá nhau',
    texture: 'challenge_pair',
    dongLuc: 'Chiều sâu của INTP làm ISFP tò mò; sự chân thật của ISFP làm INTP tò mò — tò mò nối hai người.',
    vungDeHop: 'Cả hai đều chân thành và tôn trọng sự chân thật — mối quan hệ không có sự diễn.',
    vungMaSat: 'INTP tách bạch hơn; ISFP cần sự ấm áp — khoảng cách cảm xúc. INTP tách bạch và phân tích; ISFP sống với hiện tại và thiên cảm xúc — cách tiếp xúc với cảm xúc và ý nghĩa khác nhau.',
    canDeY: [
      'INTP: thể hiện quan tâm qua hành động — làm những việc có ý nghĩa với ISFP.',
      'ISFP: trân trọng việc INTP có mặt.',
      'Sự ít biểu lộ cảm xúc của INTP khiến ISFP thấy không được nhìn thấy.',
      'Những quyết định theo cảm xúc của ISFP làm INTP thiên logic bối rối.',
    ],
    cachDiQua: [
      'INTP: Thể hiện quan tâm qua những hành động nhỏ nhất quán — ISFP đọc sự quan tâm qua những gì bạn làm.',
      'ISFP: Tham gia vào thế giới trí tuệ của INTP — bạn có thể thấy nhiều điểm chung hơn tưởng.',
      'Cả hai: Cả hai đều rất cá nhân và chân thật — sự tôn trọng chân thành dành cho đời sống nội tâm của nhau.',
    ],
    funFact: 'INTP và ISFP đều hướng nội và phóng khoáng — cùng sự thoải mái với độc lập và chân thật tạo nên một sự dễ chịu bất ngờ. [S]',
    coverage: 'full',
  },
  'INTP+ISTJ': {
    pairKey: 'INTP+ISTJ',
    tenCap: 'Logic chung',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều hướng nội và lý trí — tôn trọng năng lực và logic — một nền tảng chung.',
    vungDeHop: 'Hợp tác thực tế — cùng nhau làm tốt những mục tiêu cụ thể.',
    vungMaSat: 'INTP muốn khám phá; ISTJ muốn thực thi cách đã kiểm chứng — khác nhau về tốc độ. INTP phân tích để hiểu; ISTJ dùng cách đã kiểm chứng để hành động — khác nhau về cách đối với quy trình đã có.',
    canDeY: [
      'INTP: rồi cũng phải chốt quyết định.',
      'ISTJ: cho INTP thời gian khám phá trước khi quyết.',
      'INTP đặt câu hỏi về những quy trình ISTJ đã chứng minh hiệu quả.',
      'ISTJ hành động trước khi INTP phân tích xong.',
    ],
    cachDiQua: [
      'INTP: Tôn trọng rằng quy trình của ISTJ có cơ sở từ kinh nghiệm — hỏi "vì sao" trước khi thách thức.',
      'ISTJ: Tham gia vào phân tích của INTP — họ thường tìm ra những cải tiến đáng làm.',
      'Cả hai: Cả hai đều lý trí và hướng nội — sự nể nhau qua năng lực thể hiện được đến tự nhiên.',
    ],
    funFact: 'INTP và ISTJ đều hướng nội và lý trí — trầm, logic và độc lập. Dễ chịu tự nhiên với nhu cầu một mình của nhau. [S]',
    coverage: 'full',
  },
  'INTP+ISTP': {
    pairKey: 'INTP+ISTP',
    tenCap: 'Cùng thực chất',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội, lý trí và coi trọng năng lực — nể nhau tự nhiên.',
    vungDeHop: 'Không phải diễn — cả hai chân thật, thực tế và tò mò về trí tuệ.',
    vungMaSat: 'Cả hai đều ít biểu lộ — mối quan hệ có thể thiếu hơi ấm. Cả hai đều hướng nội sâu và lý trí — sự thân mật cảm xúc cần nỗ lực chủ động đáng kể.',
    canDeY: [
      'Tìm một hoạt động kết hợp suy nghĩ và làm — bắc cầu giữa hai cách thể hiện trí tuệ.',
      'Không ai chủ động kết nối cảm xúc → dần xa cách.',
      'Tư duy trừu tượng của INTP va với sở thích cái cụ thể của ISTP.',
    ],
    cachDiQua: [
      'INTP: Chủ động kết nối — bạn có vốn ngôn ngữ rộng hơn một chút, hãy dùng nó.',
      'ISTP: Đề xuất hoạt động chung — hành động là ngôn ngữ kết nối của bạn.',
      'Cả hai: Cùng làm những dự án trí tuệ và thực tế — đó chính là sự thân mật của hai người.',
    ],
    funFact: 'INTP và ISTP đều hướng nội, lý trí và độc lập. Sự nể nhau về năng lực cao nhất, kịch tính thấp nhất. [S]',
    coverage: 'full',
  },
  'ISFJ+ISFJ': {
    pairKey: 'ISFJ+ISFJ',
    tenCap: 'Chăm sóc hoàn hảo',
    texture: 'growth_pair',
    dongLuc: 'Cùng giá trị về gia đình và sự ổn định — hiểu nhau về nhu cầu an toàn.',
    vungDeHop: 'Mối quan hệ ấm áp và nuôi dưỡng nhất — cả hai đều biết chăm sóc sâu sắc.',
    vungMaSat: 'Cả hai đều quá quan tâm và né tránh va chạm — không ai muốn làm người kia buồn nên vấn đề không được xử lý.',
    canDeY: [
      'Thống nhất rằng bày tỏ nỗi lo là một hành động quan tâm, không phải phá vỡ hòa khí.',
      'Cả hai cùng giữ trong lòng → vấn đề âm thầm lớn dần.', // [SỬA LỖI LẪN TYPE: gốc "ISTP… → ENFJ…"]
      'Cả hai cùng chiều người kia → không ai nói thật nhu cầu của mình.', // [SỬA LỖI LẪN TYPE: gốc "ENTJ… → INFP…"]
    ],
    cachDiQua: [
      'ISFJ (người A): Hãy là người khởi xướng trò chuyện thẳng thắn — đóng khung như quan tâm: "Mình nói vì mình muốn hai đứa hiểu nhau hơn."',
      'ISFJ (người B): Khi người kia nói nỗi lo, đón nhận với lòng biết ơn thay vì xin lỗi ngay — họ tin bạn đủ để nói thật.',
      'Cả hai: Tập nói "Điều này làm mình thấy phiền" ở những tình huống nhỏ trước — luyện cho những cuộc lớn hơn.',
    ],
    funFact: 'ISFJ là nhóm phổ biến nhất (~14% dân số) — ISFJ+ISFJ là một trong những cặp có độ an toàn cảm xúc cao nhất. [P]',
    coverage: 'full',
  },
  'ISFJ+ISFP': {
    pairKey: 'ISFJ+ISFP',
    tenCap: 'Nhẹ nhàng đồng hành',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội và thiên cảm xúc — dịu dàng, quan tâm và chân thật — ấm áp tự nhiên.',
    vungDeHop: 'An toàn và nuôi dưỡng — cả hai thấy được chấp nhận, không bị phán xét.',
    vungMaSat: 'Cả hai đều ít quả quyết và né tránh va chạm — những cuộc nói chuyện khó dễ bị hoãn mãi; cả hai dịu dàng đến mức điều quan trọng không bao giờ được nói ra.',
    canDeY: [
      'Luân phiên là người nêu chủ đề khó.',
      'Cả hai cùng né va chạm → điều khó không bao giờ được giải quyết.', // [SỬA LỖI LẪN TYPE: gốc "ENTP và INFJ có thể có những cuộc trò chuyện sâu sắc nhất"]
      'Không ai chủ động lo phần thực tế.', // [SỬA LỖI LẪN TYPE: gốc "ESTJ và INFP học được nhiều nhất từ nhau…"]
    ],
    cachDiQua: [
      'ISFJ: Nói nỗi lo của bạn sớm, dịu dàng — ISFP đón nhận tốt khi không thấy bị công kích.', // [SỬA LỖI LẪN TYPE: gốc "ENFJ thường được gọi là 'người thầy'…"]
      'ISFP: Nói ra điều bạn cần thay vì lặng lẽ chịu — ISFJ không đọc được ẩn ý.', // [SỬA LỖI LẪN TYPE: gốc "ISTP và ESFJ tạo ra cặp đôi ổn định…"]
      'Cả hai: Cả hai đều thiên cảm xúc và quan tâm sâu — hướng sự quan tâm đó vào trong: quan tâm mối quan hệ đủ để thành thật.',
    ],
    funFact: 'ISFJ và ISFP đều hướng nội và thiên cảm xúc — quan tâm sâu, trầm và sống với hiện tại. Họ thường "hiểu" nhau mà không cần giải thích nhiều. [S]',
    coverage: 'full',
  },
  'ISFJ+ISTJ': {
    pairKey: 'ISFJ+ISTJ',
    tenCap: 'Ổn định hoàn hảo',
    texture: 'golden_pair',
    dongLuc: 'Cả hai đều hướng nội và gìn giữ nề nếp — đáng tin, coi trọng gia đình và trách nhiệm — rất hợp.',
    vungDeHop: 'Cặp ổn định nhất — cam kết và theo việc đến cùng từ cả hai phía.',
    vungMaSat: 'Có thể quá thoải mái — phát triển đôi khi cần chịu khó một chút. ISFJ cần sự ấm áp cảm xúc và lời khẳng định; ISTJ thể hiện quan tâm qua sự đáng tin và hành động — khoảng cách về cách thể hiện quan tâm.',
    canDeY: [
      'Mỗi quý thử một trải nghiệm mới — giữ mối quan hệ luôn tươi.',
      'ISFJ cần được hồi đáp cảm xúc → ISTJ ít bày tỏ làm ISFJ thấy thiếu.', // [SỬA LỖI LẪN TYPE: gốc "INFP… → ENTJ…"]
      'ISTJ làm theo nề nếp → ISFJ đôi khi mong sự linh hoạt hơn.', // [SỬA LỖI LẪN TYPE: gốc "ESTP… → INTP…"]
    ],
    cachDiQua: [
      'ISFJ: Nói rõ điều bạn cần với ISTJ — "Mình cần nghe bạn nói bạn trân trọng mình" là một lời đề nghị hoàn toàn hợp lệ.',
      'ISTJ: Đặt lịch mỗi ngày một lần để nói ra một điều cụ thể bạn trân trọng — bạn cảm điều đó thật, chỉ cần luyện nói ra.',
      'Cả hai: Cặp gìn giữ nề nếp có lòng trung thành cao nhất — cả hai đều có mặt. Điều cần là thể hiện theo cách người kia đón nhận được.',
    ],
    funFact: 'ISFJ và ISTJ đều có nền ký ức quá khứ dẫn đầu — cùng thế mạnh là nhớ những trải nghiệm có ý nghĩa và tận tụy với người mình thương. [S]',
    coverage: 'full',
  },
  'ISFJ+ISTP': {
    pairKey: 'ISFJ+ISTP',
    tenCap: 'Khác nhau bổ sung',
    texture: 'challenge_pair',
    dongLuc: 'ISFJ ấm áp và có cấu trúc; ISTP điềm tĩnh và thực tế — phong cách cảm xúc đối lập.',
    vungDeHop: 'ISTP mang năng lực; ISFJ mang sự chăm sóc — có thể bù trừ cho nhau.',
    vungMaSat: 'ISFJ cần kết nối cảm xúc; ISTP không thoải mái với cường độ cảm xúc cao. ISFJ cần kết nối cảm xúc và sự ấm áp; ISTP thoải mái với sự đồng hành thực tế và ít lời.',
    canDeY: [
      'ISTP: hiểu những cử chỉ chăm sóc của ISFJ là cách họ thể hiện quan tâm.',
      'ISFJ: đừng hiểu phong cách kín đáo của ISTP là thờ ơ.',
      'ISTP ít bày tỏ bằng lời → ISFJ thấy không được nhìn thấy về cảm xúc.',
      'Nhu cầu hòa khí xã giao của ISFJ va với sở thích ít giao tiếp của ISTP.',
    ],
    cachDiQua: [
      'ISFJ: Nói chính xác điều bạn cần với ISTP — "Hôm nay mình cần nghe bạn trân trọng mình" là đủ rõ.',
      'ISTP: Một lời khẳng định cụ thể mỗi ngày — bạn cảm điều đó, hãy nói ra.',
      'Cả hai: Cả hai đều quan tâm theo cách của mình — ISFJ nuôi dưỡng, ISTP sửa chữa. Cả hai đều là tình yêu.',
    ],
    funFact: 'ISFJ và ISTP đều hướng nội — cùng sự hướng nội và lòng trung thành lặng lẽ. Khoảng cách là ở cách thể hiện, không phải chiều sâu quan tâm. [S]',
    coverage: 'full',
  },
  'ISFP+ISFP': {
    pairKey: 'ISFP+ISFP',
    tenCap: 'Tự do chân thực',
    texture: 'growth_pair',
    dongLuc: 'Cùng dịu dàng, có chất nghệ và sống theo giá trị — chấp nhận lẫn nhau sâu sắc.',
    vungDeHop: 'Không ai phán xét ai — hoàn toàn tự do là chính mình.',
    vungMaSat: 'Cả hai đều rất né tránh va chạm — những cuộc nói chuyện quan trọng có thể không bao giờ xảy ra; cả hai dịu dàng đến mức điều quan trọng dễ bị hoãn vô thời hạn.',
    canDeY: [
      'Đóng khung trò chuyện thẳng thắn như một hành động tin tưởng và quan tâm, không phải đối đầu.',
      'Cả hai cùng cần được trấn an → ai sẽ cho trước?', // [SỬA LỖI LẪN TYPE: gốc "ENFJ… → INTP…"]
      'Cả hai cùng né va chạm → vấn đề dễ bị hoãn mãi.', // [SỬA LỖI LẪN TYPE: gốc "ENTJ… → INFP…"]
    ],
    cachDiQua: [
      'ISFP (người A): Tập "chia sẻ can đảm" — nói điều nhỏ làm bạn phiền trước khi nó lớn lên thành chuyện to.',
      'ISFP (người B): Khi người kia mở lòng, đón nhận với sự dịu dàng — đừng vội giải quyết hay xem nhẹ.',
      'Cả hai: Tạo một nếp "hỏi han nhau" — nhỏ, đều đặn, không nặng nề: "Hai đứa mình đang thế nào?"',
    ],
    funFact: 'ISFP+ISFP là cặp có sự chấp nhận lẫn nhau cao nhất — cả hai thật sự không phán xét nhau, tạo nên một khoảng hiếm có để là chính mình. [P]',
    coverage: 'full',
  },
  'ISFP+ISTJ': {
    pairKey: 'ISFP+ISTJ',
    tenCap: 'Cần nhiều nỗ lực',
    texture: 'challenge_pair',
    dongLuc: 'ISFP phóng khoáng và có chất nghệ; ISTJ có cấu trúc và có hệ thống — nhu cầu cốt lõi khác nhau.',
    vungDeHop: 'ISTJ mang sự ổn định; ISFP mang sự chân thật — có thể cân bằng.',
    vungMaSat: 'Sự cứng nhắc của ISTJ có thể làm ISFP ngột; sự khó đoán của ISFP có thể làm ISTJ bực. ISTJ có hệ thống và nặng bổn phận; ISFP theo giá trị và phóng khoáng — hai khung khác nhau khi ra quyết định.',
    canDeY: [
      'ISTJ: cho ISFP tự do sáng tạo.',
      'ISFP: cho ISTJ chút khả năng đoán trước khi có thể.',
      'ISTJ giữ nguyên tắc cứng → ISFP thấy ngột.', // [SỬA LỖI LẪN TYPE: gốc "INTJ và ENFJ cùng chia sẻ tầm nhìn…"]
      'ISFP phóng khoáng → ISTJ thấy thiếu nhất quán.', // [SỬA LỖI LẪN TYPE: gốc "Cặp T+F thường học được nhiều nhất…"]
    ],
    cachDiQua: [
      'ISFP: Cho ISTJ biết bạn vẫn đáng tin qua những hành động nhỏ nhất quán — họ tin hành vi hơn lời nói.', // [SỬA LỖI LẪN TYPE: gốc "ENTJ và INFP là cặp 'lửa và nước'…"]
      'ISTJ: Nhìn sự chân thật và chất nghệ của ISFP là một điểm mạnh, không phải sự thiếu kỷ luật.', // [SỬA LỖI LẪN TYPE: gốc "ISFJ chiếm gần 14% dân số…"]
      'Cả hai: Cả hai đều trung thực và trung thành — nền tin tưởng rất chắc ngay cả khi phong cách va nhau.',
    ],
    funFact: 'ISFP và ISTJ đều hướng nội — cả hai lặng lẽ đáng tin và rất trung thành. Sự quan tâm của họ thể hiện qua những hành động nhỏ nhất quán. [S]',
    coverage: 'full',
  },
  'ISFP+ISTP': {
    pairKey: 'ISFP+ISTP',
    tenCap: 'Cùng nhịp tự nhiên',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội và sống với hiện tại — linh hoạt, thực tế — hợp nhau tự nhiên.',
    vungDeHop: 'Không ai gây áp lực cho ai — thoải mái và dễ chịu.',
    vungMaSat: 'Cả hai đều ít bày tỏ bằng lời — cảm xúc có thể không được chia sẻ. ISFP cần sự ấm áp cảm xúc và kết nối riêng tư; ISTP thoải mái với sự im lặng bên nhau và giúp đỡ thực tế.',
    canDeY: [
      'Tạo thói quen hỏi han xem hai người đang thế nào.',
      'ISFP cần hồi đáp cảm xúc → ISTP ít lời làm ISFP thấy thiếu.', // [SỬA LỖI LẪN TYPE: gốc "INFP… → ENTJ…"]
      'ISTP thích yên tĩnh → ISFP đôi khi mong được nói nhiều hơn.', // [SỬA LỖI LẪN TYPE: gốc "ESTP… → ISFJ…"]
    ],
    cachDiQua: [
      'ISFP: Nói rõ nhu cầu của bạn — "Mình cần nghe bạn trân trọng mình" là một lời đề nghị hợp lý mà ISTP có thể đáp lại.',
      'ISTP: Một lời khẳng định cụ thể mỗi ngày — bạn cảm điều đó, chỉ cần nói ra.',
      'Cả hai: Cùng yêu những hoạt động ở hiện tại — gắn kết qua trải nghiệm chung là điều tự nhiên.',
    ],
    funFact: 'ISFP và ISTP đều hướng nội, thực tế và ít nói. Sự im lặng dễ chịu thật ra chính là sự thân mật với họ. [S]',
    coverage: 'full',
  },
  'ISTJ+ISTJ': {
    pairKey: 'ISTJ+ISTJ',
    tenCap: 'Trách nhiệm song hành',
    texture: 'growth_pair',
    dongLuc: 'Cùng sự đáng tin và cách làm có hệ thống — chung những giá trị cao nhất.',
    vungDeHop: 'Cực kỳ ổn định — cả hai giữ trọn cam kết.',
    vungMaSat: 'Quá giống nhau — có thể thiếu cái khác biệt thúc đẩy phát triển. Cả hai trung thành và đáng tin nhưng ít biểu lộ — kết nối có thể dần thành lối mòn mà không ai nhận ra.',
    canDeY: [
      'Chủ động tìm trải nghiệm mới — mỗi tháng thử một việc cả hai chưa từng làm.',
      'Cả hai ít bày tỏ cảm xúc → kết nối dễ thành thói quen khô khan.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ESTP…"]
      'Cả hai cùng giữ nếp cũ → dễ trôi vào lối mòn.', // [SỬA LỖI LẪN TYPE: gốc "ESFP… → INTJ…"]
    ],
    cachDiQua: [
      'ISTJ (người A): Sắp lịch cho khoảng thời gian "không năng suất" — không phải mọi thứ cần mục tiêu hay kết quả.',
      'ISTJ (người B): Đưa vào một trải nghiệm mới mỗi tháng — cái mới không phải mối đe dọa với sự ổn định, mà là dưỡng chất.',
      'Cả hai: Bày tỏ sự trân trọng rõ ràng và thường xuyên — cả hai biết người kia quan tâm, nhưng nghe nó vẫn quan trọng.',
    ],
    funFact: 'ISTJ+ISTJ là cặp theo việc đến cùng nhất — khi họ nói sẽ làm gì, việc đó được làm. Độ tin tưởng cao nhất. [P]',
    coverage: 'full',
  },
  'ISTJ+ISTP': {
    pairKey: 'ISTJ+ISTP',
    tenCap: 'Thực tế chung',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội và thực tế — thực dụng và giỏi — nể nhau.',
    vungDeHop: 'Cả hai đều giỏi và đáng tin — sự tin tưởng đến dễ dàng.',
    vungMaSat: 'ISTJ muốn kế hoạch; ISTP muốn linh hoạt — căng thẳng về quy trình. ISTJ theo quy trình đã có; ISTP ứng biến theo tình huống — va chạm về cách làm khi cùng giải quyết vấn đề.',
    canDeY: [
      'ISTJ: để ISTP ứng biến với việc không quan trọng.',
      'ISTP: báo trước cho ISTJ khi có thay đổi.',
      'ISTP ứng biến không báo → ISTJ thấy mất an toàn.', // [SỬA FILLER: gốc "Cặp J+P thường cần thỏa thuận rõ về việc lên kế hoạch"]
      'ISTJ bám quy trình → ISTP thấy bị bó.', // [SỬA FILLER: gốc "Nghiên cứu Gottman: 69% vấn đề trong mối quan hệ không thể giải quyết"]
    ],
    cachDiQua: [
      'ISTJ: Tin vào khả năng xử lý tức thời của ISTP — họ thường thấy giải pháp nhanh hơn quy trình của bạn.',
      'ISTP: Cho ISTJ lý do khi bạn lệch khỏi kế hoạch — "Mình bỏ bước X vì Y" là đủ với họ.',
      'Cả hai: Cả hai đều hướng nội, giỏi và độc lập — sự nể nhau qua kỹ năng thể hiện được.',
    ],
    funFact: 'ISTJ và ISTP đều hướng nội và thực tế — cùng sự hướng nội và cách tiếp cận logic tạo sự dễ chịu tự nhiên. Ít kịch tính, nhiều năng lực. [S]',
    coverage: 'full',
  },
  'ISTP+ISTP': {
    pairKey: 'ISTP+ISTP',
    tenCap: 'Cùng thực chất',
    texture: 'growth_pair',
    dongLuc: 'Cùng độc lập, thực tế và giỏi — hiểu nhau mà không cần giải thích.',
    vungDeHop: 'Không kịch tính — cả hai thoải mái và tôn trọng khoảng riêng của nhau.',
    vungMaSat: 'Cả hai đều rất ít bày tỏ — mối quan hệ có thể trôi dần nếu không chủ động hỏi han; cả hai thích hành động và ít biểu lộ cảm xúc, dễ trở thành như bạn cùng nhà nếu không chủ ý.',
    canDeY: [
      'Tạo thói quen hỏi han đơn giản — "hai đứa mình đang thế nào?" một lần mỗi tháng là đủ.',
      'Cả hai cùng giữ trong lòng → khoảng cách cảm xúc dần len vào.', // [SỬA LỖI LẪN TYPE: gốc "ISFJ… → ESTP…"]
      'Cả hai ưa hành động → dễ quên phần nuôi dưỡng tình cảm.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → INTJ…"]
    ],
    cachDiQua: [
      'ISTP (người A): Sắp lịch cho hoạt động chung đều đặn — cho cả hai một điều để gắn kết qua đó.',
      'ISTP (người B): Tương tự — và thỉnh thoảng hỏi "hai đứa thế nào?" kể cả khi thấy không cần thiết.',
      'Cả hai: Cùng làm — dự án, phiêu lưu, giải quyết vấn đề. Hành động chính là cách hai người thể hiện quan tâm.',
    ],
    funFact: 'ISTP+ISTP là cặp ít kịch tính nhất và hay "hiểu nhau" nhất — sự nể nhau qua năng lực. [P]',
    coverage: 'full',
  },
}
