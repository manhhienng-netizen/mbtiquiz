// match-pair-content-vn-esfj.ts
// Task 4 retone — BATCH 5: 12 cặp ESFJ+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// Sửa lỗi lẫn type: ESFJ+ESFP, ESFJ+ESTJ, ESFJ+ESTP, ESFJ+ISFP, ESFJ+ISTJ
// Thay dòng FILLER chung chung (không đúng cặp) ở ESFJ+INFJ & ESFJ+INFP bằng nội dung đặc thù cặp

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_ESFJ: Record<string, MatchPairContent> = {
  'ESFJ+ESFJ': {
    pairKey: 'ESFJ+ESFJ',
    tenCap: 'Ấm áp gấp đôi',
    texture: 'growth_pair',
    dongLuc: 'Cùng giá trị về gia đình và sự hài hòa — hiểu nhau sâu về nhu cầu kết nối.',
    vungDeHop: 'Một mái nhà ấm áp nhất — cả hai đều quan tâm sâu sắc và bày tỏ điều đó rõ ràng.',
    vungMaSat: 'Cả hai đều tránh va chạm và muốn giữ hòa khí — vấn đề tích tụ âm thầm cho đến khi quá lớn để làm ngơ.',
    canDeY: [
      'Cam kết nói thật khi khó chịu — "an toàn để bất đồng" là món quà cả hai cần trao nhau.',
      'Cả hai muốn chiều lòng người kia → không ai nói thật về nhu cầu của mình.',
      'Khi có áp lực từ bên ngoài, cả hai cùng gánh và không ai giữ được sự vững.',
    ],
    cachDiQua: [
      'ESFJ (người A): Mở lời thẳng thắn sớm — đóng khung như một hành động quan tâm: "Mình nói vì muốn hai đứa tốt hơn."',
      'ESFJ (người B): Khi nghe nỗi lo từ người kia, kìm phản xạ làm dịu ngay — lắng nghe cho đủ trước khi đáp.',
      'Cả hai: Lập một nếp "nói thật" mỗi tuần — nhỏ và an toàn, hơn là để dồn lại thành bùng nổ.',
    ],
    funFact: 'ESFJ là nhóm phổ biến nhất (~12% dân số) — cặp ESFJ+ESFJ thường có mạng lưới xã hội rộng nhất. [P]',
    coverage: 'full',
  },
  'ESFJ+ESFP': {
    pairKey: 'ESFJ+ESFP',
    tenCap: 'Vui vẻ cùng nhau',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thích giao tiếp và ấm áp — dễ tận hưởng cuộc sống cùng nhau.',
    vungDeHop: 'Thích giao tiếp và vui vẻ — bạn bè thích ở quanh cặp này. Nhà luôn đầy người và tiếng cười.',
    vungMaSat: 'ESFJ cần kế hoạch và báo trước; ESFP muốn tự phát và phút chót — căng nhau liên tục về lịch.',
    canDeY: [
      'ESFJ: để vài cuối tuần không cần lên kế hoạch.',
      'ESFP: báo trước cho ESFJ khi có thể.',
      'ESFP đổi kế hoạch phút chót → ESFJ bất an vì mất nề nếp.', // [SỬA LỖI LẪN TYPE: gốc "INTJ… → ENFP…"]
      'ESFJ lo cho mọi người → ESFP thấy bị quản hơi nhiều.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → ISTP…"]
    ],
    cachDiQua: [
      'ESFJ: Chừa những "khoảng trống không lịch" — cho ESFP chỗ thở, và bạn sẽ thấy thích hơn mình tưởng.',
      'ESFP: Khi ESFJ lên kế hoạch cho bạn, hãy tham gia với hứng thú thật — với họ, lên kế hoạch là một hành động quan tâm.',
      'Cả hai: Lên "ngày phiêu lưu" từ sớm — ESFJ có cấu trúc, ESFP có cái mới, cả hai cùng vui.',
    ],
    funFact: 'ESFJ và ESFP đều có cảm xúc hướng ngoại dẫn đầu — cả hai cực kỳ nhạy với bầu không khí cảm xúc và thật lòng muốn người xung quanh vui. [S]',
    coverage: 'full',
  },
  'ESFJ+ESTJ': {
    pairKey: 'ESFJ+ESTJ',
    tenCap: 'Trách nhiệm chung',
    texture: 'growth_pair',
    dongLuc: 'Cùng nhóm gìn giữ nề nếp — cùng đáng tin và coi trọng gia đình — một nền móng chắc chắn.',
    vungDeHop: 'Cả hai đều có mặt, cả hai cùng cam kết — đáng tin với nhau.',
    vungMaSat: 'ESFJ ra quyết định qua cảm xúc và tác động lên con người; ESTJ qua logic và hiệu quả — hai cách xử lý thường va nhau.',
    canDeY: [
      'ESTJ: công nhận cảm xúc trước khi đưa logic.',
      'ESFJ: nêu nỗi lo kèm dữ kiện, không chỉ cảm xúc.',
      'ESTJ quyết theo logic, gạt cảm xúc → ESFJ thấy không được nghe.', // [SỬA LỖI LẪN TYPE: gốc "ENTP… → ISFJ…"]
      'ESFJ cần đồng thuận → ESTJ sốt ruột muốn chốt nhanh.', // [SỬA LỖI LẪN TYPE: gốc "ISFJ… → ENTP…"]
    ],
    cachDiQua: [
      'ESFJ: Nêu mối lo về con người kèm ví dụ cụ thể — "3 người trong nhóm đang bực vì X" tốt hơn "mọi người không vui."',
      'ESTJ: Công nhận cảm xúc trước khi nhảy vào giải pháp — "Tôi nghe bạn, và đây là cách tôi muốn xử lý" tốt hơn là xử lý luôn.',
      'Cả hai: Quyết định tốt nhất khi có cả dữ liệu lẫn tác động lên con người — mỗi người đại diện một phía.',
    ],
    funFact: 'ESFJ và ESTJ đều thuộc nhóm gìn giữ nề nếp nên cùng cam kết sâu về sự đáng tin và giá trị gia đình — một nền móng rất chắc. [S]',
    coverage: 'full',
  },
  'ESFJ+ESTP': {
    pairKey: 'ESFJ+ESTP',
    tenCap: 'Vui nhưng khác chiều',
    texture: 'challenge_pair',
    dongLuc: 'Cả hai đều hướng ngoại và thực tế — nhưng ESFJ cần hòa khí, ESTP cần sự hào hứng.',
    vungDeHop: 'ESTP mang sự phiêu lưu; ESFJ mang sự chăm sóc — cân bằng tốt nếu tôn trọng nhau.',
    vungMaSat: 'ESFJ cần hòa khí cảm xúc; ESTP nói thẳng không lọc — ESTP vô tình làm ESFJ tổn thương mà không hay.',
    canDeY: [
      'ESTP: nói nhẹ hơn khi ở cạnh ESFJ.',
      'ESFJ: đừng coi cách xuề xòa của ESTP là không quan tâm.',
      'ESTP nói thẳng, bộc trực → ESFJ tổn thương.', // [SỬA LỖI LẪN TYPE: gốc "ISTP… → ESFJ…"]
      'ESFJ cần được trấn an → ESTP thấy hơi nặng nề.', // [SỬA LỖI LẪN TYPE: gốc "INTP… → ESFP…"]
    ],
    cachDiQua: [
      'ESFJ: Nói cho ESTP biết khi điều gì đó làm bạn đau — họ không bắt được ẩn ý và thật sự muốn biết.',
      'ESTP: Dừng một nhịp trước khi nói ra sự thật phũ với ESFJ — cùng nội dung, nói nhẹ hơn, kết quả khác hẳn.',
      'Cả hai: Sự ấm áp của ESFJ + sự thực tế của ESTP = người ta vừa thấy được quan tâm vừa được giúp.',
    ],
    funFact: 'ESFJ và ESTP đều hướng ngoại và gắn với con người — năng lượng xã hội của cặp này rất cao và vui. [S]',
    coverage: 'full',
  },
  'ESFJ+INFJ': {
    pairKey: 'ESFJ+INFJ',
    tenCap: 'Quan tâm cùng nhịp',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều quan tâm sâu sắc đến con người — cách bày tỏ khác nhau nhưng cùng một tấm lòng.',
    vungDeHop: 'INFJ mang chiều sâu và sự thấu suốt; ESFJ mang sự ấm áp và khéo léo xã giao — một sự kết hợp đẹp.',
    vungMaSat: 'INFJ cần thời gian một mình; ESFJ thấy đó như sự chối bỏ — cần nói rõ về nhu cầu nạp lại. ESFJ tập trung vào hòa khí trước mắt; INFJ tập trung vào tầm nhìn dài hạn — lệch nhau về khung thời gian.',
    canDeY: [
      'INFJ: chủ động nói ra nhu cầu nạp lại.',
      'ESFJ: hiểu rằng khoảng một mình không phải sự bỏ rơi.',
      'ESFJ cần kết nối thường xuyên → INFJ cần khoảng lặng để hồi lại.', // [SỬA FILLER CHUNG CHUNG: gốc "Kết nối cảm xúc quan trọng hơn sự tương đồng tính cách"]
      'INFJ rút vào trong → ESFJ dễ thấy bất an.', // [SỬA FILLER CHUNG CHUNG: gốc "Bạn mang chiều sâu. Họ mang ánh sáng…"]
    ],
    cachDiQua: [
      'ESFJ: Khoảng một mình của INFJ là cách họ nạp lại để hiện diện trọn vẹn với bạn — không phải xa cách.', // [SỬA FILLER: gốc "Điều quan trọng không phải là không có xung đột…"]
      'INFJ: Nói trước nhu cầu nạp lại để ESFJ không phải đoán và lo.', // [SỬA FILLER: gốc "Các cặp hạnh phúc nhất không phải là những người hoàn toàn giống nhau"]
      'Cả hai: Cả hai đều quan tâm sâu — chỉ ở hai quy mô khác nhau. Chính sự quan tâm đó là điểm chung.',
    ],
    funFact: 'ESFJ và INFJ đều có cảm xúc hướng ngoại trong cấu trúc — cả hai đều nhạy với bầu không khí cảm xúc, chỉ là ESFJ hướng ra ngoài còn INFJ hướng vào trong. [S]',
    coverage: 'full',
  },
  'ESFJ+INFP': {
    pairKey: 'ESFJ+INFP',
    tenCap: 'Chăm sóc đồng hành',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thiên cảm xúc và lấy con người làm trọng tâm — chung một nền tảng đồng cảm.',
    vungDeHop: 'Cùng chăm sóc và nâng đỡ nhau — cả hai đều có mặt cho nhau về mặt cảm xúc.',
    vungMaSat: 'ESFJ thiên cấu trúc; INFP thiên tự do — lệch nhau về lối sống. ESFJ tập trung vào hòa khí của nhóm; INFP tập trung vào giá trị cá nhân — va nhau khi kỳ vọng của nhóm xung đột với la bàn nội tâm của INFP.',
    canDeY: [
      'ESFJ: cho INFP khoảng tự do sáng tạo.',
      'INFP: tôn trọng nhu cầu lên kế hoạch của ESFJ bằng cách báo trước.',
      'ESFJ kỳ vọng theo nề nếp chung → INFP thấy bị ép trái với giá trị mình.', // [SỬA FILLER CHUNG CHUNG: gốc "Bạn giữ cho mọi thứ ổn định. Họ mang lại sự đổi mới…"]
      'INFP rút vào nội tâm → ESFJ thấy bị giữ khoảng cách.', // [SỬA FILLER CHUNG CHUNG: gốc "Bạn thấy chi tiết. Họ thấy bức tranh lớn…"]
    ],
    cachDiQua: [
      'ESFJ: Tôn trọng rằng giá trị của INFP là điều không thể thương lượng — và đó thật ra là một điểm mạnh cho mối quan hệ.',
      'INFP: Cho ESFJ biết bạn vẫn quan tâm dù cần khoảng riêng — họ cần lời trấn an đó.', // [SỬA FILLER: gốc "Bạn xây nền tảng. Họ tạo ra khả năng…"]
      'Cả hai: Cả hai đều thiên cảm xúc — sự quan tâm chân thành nối hai người. Quay về điều đó khi phong cách va nhau.',
    ],
    funFact: 'ESFJ và INFP đều thiên cảm xúc và đều quan tâm sâu đến con người — chỉ là ESFJ qua hòa khí còn INFP qua sự chân thật. [S]',
    coverage: 'full',
  },
  'ESFJ+INTJ': {
    pairKey: 'ESFJ+INTJ',
    tenCap: 'Thế giới khác nhau',
    texture: 'challenge_pair',
    dongLuc: 'ESFJ coi trọng hòa khí; INTJ coi trọng sự thật — thường va nhau về việc ưu tiên cái nào.',
    vungDeHop: 'INTJ mang chiều sâu và sự thẳng thắn ESFJ cần; ESFJ mang sự ấm áp mà INTJ thầm mong.',
    vungMaSat: 'Sự thẳng thắn của INTJ làm ESFJ tổn thương; các đòi hỏi xã giao của ESFJ làm INTJ kiệt sức. ESFJ coi trọng hòa khí; INTJ coi trọng sự thật ngay cả khi khó nghe — va chạm nền tảng về việc ưu tiên cái nào.',
    canDeY: [
      'INTJ: nói sự thật một cách nhẹ nhàng.',
      'ESFJ: nhìn sự thẳng thắn của INTJ là trung thực, không phải tàn nhẫn.',
      'Sự thẳng thắn của INTJ làm ESFJ vốn cần hòa thuận tổn thương.',
      'Nghĩa vụ xã giao của ESFJ làm INTJ kiệt sức đáng kể.',
    ],
    cachDiQua: [
      'ESFJ: Sự thẳng thắn của INTJ là một món quà — họ không cố làm bạn đau, họ tôn trọng bạn đủ để nói thật.',
      'INTJ: Nói thật kèm sự quan tâm rõ ràng — thêm "Mình nói điều này vì..." ở trước.',
      'Cả hai: Sự trung thực của INTJ + sự ấm áp của ESFJ = một mối quan hệ vừa thật vừa biết quan tâm.',
    ],
    funFact: 'ESFJ và INTJ có cấu trúc chức năng đối nghịch — tạo nên cả căng thẳng lẫn sự bổ sung thật. [S]',
    coverage: 'full',
  },
  'ESFJ+INTP': {
    pairKey: 'ESFJ+INTP',
    tenCap: 'Ít điểm chung',
    texture: 'challenge_pair',
    dongLuc: 'Thế giới của ESFJ là con người và cảm xúc; thế giới của INTP là ý tưởng và hệ thống — hai hành tinh rất khác.',
    vungDeHop: 'INTP mang chiều sâu trí tuệ; ESFJ mang kết nối xã hội — nếu bắc cầu được.',
    vungMaSat: 'Sự tách bạch của INTP nghe lạnh với ESFJ; các đòi hỏi xã giao của ESFJ làm INTP kiệt sức. ESFJ cần kết nối cảm xúc và sự ấm áp xã giao; INTP thoải mái với kết nối trí tuệ và ít giao tiếp.',
    canDeY: [
      'Tìm một mối quan tâm chung rồi cùng đi sâu vào đó — một cây cầu là đủ để bắt đầu.',
      'Sự ít biểu lộ cảm xúc của INTP khiến ESFJ vốn cần ấm áp thấy thiếu thốn.',
      'Các đòi hỏi xã giao của ESFJ làm INTP kiệt sức đáng kể.',
    ],
    cachDiQua: [
      'ESFJ: INTP thể hiện quan tâm qua việc giải quyết vấn đề và bàn luận trí tuệ — học cách đón nhận dạng quan tâm đó.',
      'INTP: Hỏi "Hôm nay bạn thấy thế nào?" mỗi ngày một lần — ESFJ cần câu hỏi đó.',
      'Cả hai: Chiều sâu của INTP + sự ấm áp của ESFJ = một sự kết hợp hiếm giữa thông minh và tử tế.',
    ],
    funFact: 'ESFJ và INTP có chức năng dẫn đầu đối nghịch — tạo nên sự tò mò mạnh về nhau ngay từ đầu. [S]',
    coverage: 'full',
  },
  'ESFJ+ISFJ': {
    pairKey: 'ESFJ+ISFJ',
    tenCap: 'Hiểu nhau sâu',
    texture: 'golden_pair',
    dongLuc: 'Cả hai đều thuộc nhóm chăm sóc và gìn giữ nề nếp — cùng giá trị, cùng cách quan tâm, cùng đặt gia đình và sự ổn định lên đầu.',
    vungDeHop: 'Một mái nhà ấm áp và ổn định nhất — hiểu nhau không cần giải thích nhiều.',
    vungMaSat: 'Cả hai đều quan tâm và né tránh va chạm — vấn đề tích tụ âm thầm vì không ai muốn làm người kia buồn.',
    canDeY: [
      'Tạo một nếp chia sẻ thật lòng — mỗi tuần một lần, an toàn để nói điều khó.',
      'Cả hai cùng tránh va chạm → vấn đề âm thầm lớn dần.',
      'ESFJ muốn thay đổi → ISFJ thích sự ổn định đã được kiểm chứng.',
    ],
    cachDiQua: [
      'ESFJ: Là người mở lời thẳng thắn khi thấy vấn đề đang tích tụ — bạn dễ chịu với việc khởi xướng hơn.',
      'ISFJ: Tin rằng sự chia sẻ thẳng thắn của ESFJ xuất phát từ quan tâm — đón nhận nó với lòng biết ơn.',
      'Cả hai: "Mình nói điều này vì muốn hai đứa tốt hơn" — đóng khung mọi cuộc nói chuyện khó qua lăng kính yêu thương.',
    ],
    funFact: 'ESFJ và ISFJ đều có cảm xúc hướng ngoại cùng nền ký ức quá khứ — cùng sự ấm áp và lòng trung thành, chỉ khác về mức biểu lộ. Cặp này có độ an toàn cảm xúc cao nhất. [S]',
    coverage: 'full',
  },
  'ESFJ+ISFP': {
    pairKey: 'ESFJ+ISFP',
    tenCap: 'Nhẹ nhàng bên nhau',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thiên cảm xúc và quan tâm đến con người — ESFJ biểu lộ nhiều hơn, ISFP trầm hơn.',
    vungDeHop: 'Cùng chăm sóc và dịu dàng — mối quan hệ thấy an toàn và ấm.',
    vungMaSat: 'ESFJ rất hay bày tỏ; ISFP kín đáo hơn — lệch nhau về mức độ chia sẻ. ESFJ muốn chia sẻ và bày tỏ cởi mở; ISFP thích yên tĩnh và cần nhiều khoảng riêng — khoảng cách về sự biểu lộ.',
    canDeY: [
      'ESFJ: cho ISFP chia sẻ theo nhịp của họ.',
      'ISFP: thử bày tỏ nhiều hơn một chút so với mức tự nhiên.',
      'ESFJ bày tỏ và hỏi han nhiều → ISFP thấy bị thúc.', // [SỬA LỖI LẪN TYPE: gốc "ENFJ… → ESTJ…"]
      'ISFP cần khoảng riêng → ESFJ dễ thấy mình không được ưu tiên.', // [SỬA LỖI LẪN TYPE: gốc "ESTJ… → ENFJ…"]
    ],
    cachDiQua: [
      'ESFJ: Cho ISFP khoảng riêng để chia sẻ theo nhịp của họ — họ vẫn quan tâm, chỉ là kín đáo hơn.', // [SỬA LỖI LẪN TYPE: gốc "ESFP… → INTP…"]
      'ISFP: Chia sẻ một điều về thế giới bên trong mỗi ngày với ESFJ — họ cần kết nối qua lời nói để thấy gần.',
      'Cả hai: Cả hai đều thiên cảm xúc — quan tâm sâu sắc, chỉ bày tỏ theo cách khác nhau.',
    ],
    funFact: 'ESFJ và ISFP đều thiên cảm xúc và sống với hiện tại — chỉ là ESFJ hướng ra ngoài còn ISFP hướng vào trong. [S]',
    coverage: 'full',
  },
  'ESFJ+ISTJ': {
    pairKey: 'ESFJ+ISTJ',
    tenCap: 'Ổn định vững chắc',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thuộc nhóm gìn giữ nề nếp — cùng coi trọng cam kết, gia đình và truyền thống.',
    vungDeHop: 'Một cặp cực kỳ đáng tin — cả hai đều có mặt và làm tới nơi.',
    vungMaSat: 'ESFJ thiên cảm xúc; ISTJ trầm và kín — lệch nhau về cách bày tỏ cảm xúc. ESFJ hướng ngoại và hay bày tỏ; ISTJ hướng nội và kín đáo — khác nhau về mức "chia sẻ bao nhiêu là đủ."',
    canDeY: [
      'ISTJ: nói ra sự trân trọng thành lời, đừng cho rằng ESFJ tự biết.',
      'ESFJ: cho ISTJ thời gian để xử lý cảm xúc.',
      'ISTJ giữ nguyên tắc cứng → ESFJ thấy thiếu sự mềm mỏng.', // [SỬA LỖI LẪN TYPE: gốc "ESTJ… → ENFP…"]
      'ESFJ cần được hồi đáp cảm xúc → ISTJ ít bày tỏ làm ESFJ thấy thiếu.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → ESTJ…"]
    ],
    cachDiQua: [
      'ESFJ: Tôn trọng rằng ISTJ ít nói không có nghĩa là không quan tâm — hành động là ngôn ngữ của họ.',
      'ISTJ: Nói ra sự trân trọng thành lời mỗi ngày một lần — ESFJ cần nghe, không chỉ thấy.',
      'Cả hai: Cùng nhóm gìn giữ nề nếp — cả hai đều đáng tin và cam kết. Đây là một nền móng hiếm có.',
    ],
    funFact: 'ESFJ và ISTJ đều có nền ký ức quá khứ dẫn đầu — cả hai đều nhớ rõ những trải nghiệm có ý nghĩa và rất trung thành. [S]',
    coverage: 'full',
  },
  'ESFJ+ISTP': {
    pairKey: 'ESFJ+ISTP',
    tenCap: 'Khó kết nối',
    texture: 'challenge_pair',
    dongLuc: 'ESFJ cần kết nối cảm xúc và đời sống xã hội; ISTP cần sự độc lập và ít giao tiếp.',
    vungDeHop: 'ISTP mang sự điềm tĩnh và năng lực; ESFJ mang sự ấm áp và chăm sóc.',
    vungMaSat: 'Nhu cầu khoảng riêng của ISTP dễ bị ESFJ hiểu thành sự chối bỏ. ESFJ cần lời khẳng định và kết nối cảm xúc; ISTP thể hiện quan tâm qua giúp đỡ thiết thực và ít lời.',
    canDeY: [
      'ISTP: trấn an ESFJ khi bạn cần khoảng một mình.',
      'ESFJ: tin rằng hành động của ISTP đã thể hiện sự quan tâm.',
      'ISTP xử lý vấn đề một mình → ESFJ muốn được tham gia và giúp.',
      'ESFJ hỏi han nhiều → ISTP thấy bị lấn khoảng riêng.',
    ],
    cachDiQua: [
      'ESFJ: Nhận ra việc ISTP giúp đỡ thiết thực chính là cách họ thể hiện quan tâm — khi họ sửa giúp bạn điều gì, đó là "tôi quan tâm".',
      'ISTP: Nói ra "tôi trân trọng bạn" thành lời mỗi ngày một lần — ESFJ cần nghe điều đó.',
      'Cả hai: Vẽ rõ cách mỗi người thể hiện quan tâm — giúp ISTP biết phải làm gì, giúp ESFJ hiểu hành động của ISTP.',
    ],
    funFact: 'ESFJ và ISTP có cấu trúc chức năng đối nghịch — đây là lý do sức hút ban đầu thường mạnh (đối cực hút nhau). [S]',
    coverage: 'full',
  },
}
