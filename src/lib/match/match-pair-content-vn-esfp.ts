// match-pair-content-vn-esfp.ts
// Task 4 retone — BATCH 6: 11 cặp ESFP+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// Sửa lỗi lẫn type: ESFP+ESFP, ESFP+ESTP, ESFP+ISFP, ESFP+ISTP
// Thay dòng FILLER chung chung ở ESFP+ESTJ & ESFP+ISFJ bằng nội dung đặc thù cặp

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_ESFP: Record<string, MatchPairContent> = {
  'ESFP+ESFP': {
    pairKey: 'ESFP+ESFP',
    tenCap: 'Rực rỡ cùng nhau',
    texture: 'growth_pair',
    dongLuc: 'Cùng yêu hiện tại và con người — cuộc sống của cặp này lúc nào cũng như có tiệc.',
    vungDeHop: 'Không bao giờ có phút buồn tẻ — cả hai mang năng lượng, niềm vui và tình yêu cuộc sống.',
    vungMaSat: 'Cả hai đều tự phát và né những cuộc nói chuyện khó — vấn đề nghiêm túc có thể bị niềm vui và hoạt động lấn át.',
    canDeY: [
      'Tạo một nếp nghiêm túc — mỗi năm một lần "nói thật" về sức khỏe của mối quan hệ.',
      'Cả hai cùng né chuyện khó → vấn đề lớn bị bỏ lửng.', // [SỬA LỖI LẪN TYPE: gốc "ENFP… → ISFJ…"]
      'Cả hai cùng ham vui → việc thực tế dài hạn không ai lo.', // [SỬA LỖI LẪN TYPE: gốc "ISFJ… → ENFP…"]
    ],
    cachDiQua: [
      'ESFP (người A): Khi có vấn đề thật, kìm phản xạ cười cho qua — ngồi lại với sự khó chịu đó một lát.',
      'ESFP (người B): Đừng đổi sang chuyện vui ngay — cho cuộc nói chuyện khó được trọn vẹn.', // [SỬA LỖI LẪN TYPE: gốc "INTJ… → ESFP…"]
      'Cả hai: Sắp một buổi "nói thật" mỗi tháng — làm cho nó an toàn bằng cách đóng khung như sự quan tâm, không phải công kích.',
    ],
    funFact: 'ESFP+ESFP thường là cặp có niềm vui hằng ngày cao nhất — và cũng dễ trì hoãn xử lý vấn đề nghiêm túc nhất. [P]',
    coverage: 'full',
  },
  'ESFP+ESTJ': {
    pairKey: 'ESFP+ESTJ',
    tenCap: 'Cân bằng khó',
    texture: 'challenge_pair',
    dongLuc: 'ESFP vui và tự phát; ESTJ nghiêm túc và có cấu trúc — nhịp sống rất khác.',
    vungDeHop: 'ESTJ mang định hướng; ESFP mang niềm vui — có thể cân bằng tốt nếu tôn trọng nhau.',
    vungMaSat: 'ESTJ thấy ESFP thiếu trách nhiệm; ESFP thấy ESTJ làm cụt hứng. ESTJ cần cấu trúc và sự rõ ràng; ESFP tự phát và ghét lịch cứng — va chạm về lối sống.',
    canDeY: [
      'ESTJ: thỉnh thoảng nhập cuộc niềm vui của ESFP mà không kèm mục tiêu gì.',
      'ESFP: đáp ứng nhu cầu lên kế hoạch của ESTJ mỗi tháng một lần.',
      'ESFP đổi kế hoạch phút chót → ESTJ thấy không được tôn trọng.', // [SỬA FILLER CHUNG CHUNG: gốc "Dành 5 phút im lặng cùng nhau…"]
      'ESTJ áp lịch cứng → ESFP thấy mất tự do và cụt hứng.', // [SỬA FILLER CHUNG CHUNG: gốc "Hỏi 'Hôm nay bạn thế nào?'…"]
    ],
    cachDiQua: [
      'ESFP: Tôn trọng kế hoạch của ESTJ — tham gia những việc đã hẹn, hủy ngay trong ngày khiến họ thấy bị coi thường.',
      'ESTJ: Chừa vài cuối tuần hoàn toàn không lên lịch — để ESFP dẫn dắt ngày hôm đó, biết đâu bạn lại thích.',
      'Cả hai: ESFP mang niềm vui; ESTJ đảm bảo niềm vui đó thật sự diễn ra đúng lúc.',
    ],
    funFact: 'ESFP và ESTJ đều hướng ngoại và thực tế — cùng sống với hiện tại, tạo sự hợp ý tốt trong đời sống công việc. [S]',
    coverage: 'full',
  },
  'ESFP+ESTP': {
    pairKey: 'ESFP+ESTP',
    tenCap: 'Sống hết mình',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thuộc nhóm sống với hiện tại — cùng ưa hành động, cùng thực tế.',
    vungDeHop: 'Phiêu lưu và vui — luôn làm gì đó, luôn tận hưởng cuộc sống.',
    vungMaSat: 'Cả hai đều ưa hành động nhưng ESFP cần kết nối cảm xúc; ESTP thích giữ mọi thứ nhẹ nhàng — khoảng cách về chiều sâu.',
    canDeY: [
      'Mỗi tháng một "buổi tính chuyện tương lai" — lên kế hoạch một việc xa hơn 3 tháng tới.',
      'ESTP giữ mọi thứ nhẹ → ESFP đôi khi thấy thiếu chiều sâu cảm xúc.', // [SỬA LỖI LẪN TYPE: gốc "ESTP… → INFJ…"]
      'ESFP cần được lắng nghe cảm xúc → ESTP muốn giải quyết nhanh rồi tiếp tục.', // [SỬA LỖI LẪN TYPE: gốc "INFJ… → ESTP…"]
    ],
    cachDiQua: [
      'ESFP: Khi cần một cuộc trò chuyện sâu hơn, nói thẳng — "Mình cần nói về một chuyện quan trọng với mình."',
      'ESTP: Cho ESFP 10 phút chú ý cảm xúc thật sự — đó không phải điểm yếu, đó là một sự đầu tư.',
      'Cả hai: Năng lượng sống-với-hiện-tại là món quà — hướng nó vào những cuộc phiêu lưu vừa vui vừa có ý nghĩa.',
    ],
    funFact: 'ESFP và ESTP đều sống với hiện tại và phát triển nhờ hành động. Sự ăn ý về mặt xã hội và niềm vui của cặp này rất tự nhiên. [S]',
    coverage: 'full',
  },
  'ESFP+INFJ': {
    pairKey: 'ESFP+INFJ',
    tenCap: 'Sâu gặp rực rỡ',
    texture: 'growth_pair',
    dongLuc: 'Sức sống của ESFP hút INFJ; chiều sâu của INFJ hút ESFP — tò mò lẫn nhau.',
    vungDeHop: 'ESFP giúp INFJ tận hưởng hiện tại; INFJ giúp ESFP thấy ý nghĩa đằng sau những trải nghiệm.',
    vungMaSat: 'INFJ cần chiều sâu và khoảng một mình; ESFP cần giao tiếp và niềm vui bề mặt — va chạm về thế nào là một cuộc sống tốt.',
    canDeY: [
      'Tạo sự cân bằng: vài tối trò chuyện sâu (kiểu INFJ), vài tối ra ngoài (kiểu ESFP).',
      'Các kế hoạch xã hội của ESFP làm INFJ kiệt sức và cần hồi lại.',
      'Nhu cầu chiều sâu của INFJ nghe nặng nề với ESFP sống-với-hiện-tại.',
    ],
    cachDiQua: [
      'ESFP: Khi INFJ im lặng, hỏi "Bạn cần khoảng riêng hay cần kết nối lúc này?"',
      'INFJ: Nói ra nhu cầu cần khoảng riêng trước khi kiệt sức — ESFP luôn sẵn sàng điều chỉnh.',
      'Cả hai: Vài tối đi vào chiều sâu (kiểu INFJ), vài tối ra ngoài (kiểu ESFP) — luân phiên và trân trọng cả hai.',
    ],
    funFact: 'ESFP và INFJ là cặp "đối cực hút nhau" kinh điển — mỗi người có đúng điều người kia ngưỡng mộ từ xa. [P]',
    coverage: 'full',
  },
  'ESFP+INFP': {
    pairKey: 'ESFP+INFP',
    tenCap: 'Ấm áp gặp nhau',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều thiên cảm xúc và quan tâm đến con người — mức năng lượng khác nhau nhưng cùng một tấm lòng.',
    vungDeHop: 'ESFP giúp INFP ra khỏi cái đầu nặng nề; INFP giúp ESFP chậm lại và ngẫm.',
    vungMaSat: 'Năng lượng xã hội quá nhiều của ESFP có thể làm INFP quá tải; nhu cầu khoảng một mình của INFP có thể làm ESFP bối rối. ESFP sống với hiện tại; INFP sống trong thế giới giá trị bên trong — hai định nghĩa khác nhau về điều gì là quan trọng.',
    canDeY: [
      'ESFP: để INFP nạp lại trước khi bày ra hoạt động kế tiếp.',
      'INFP: thỉnh thoảng nhập cuộc thế giới xã hội của ESFP.',
      'Năng lượng xã hội của ESFP làm kiệt sức INFP hướng nội.',
      'Nhu cầu nhất quán về giá trị của INFP làm ESFP tự phát thấy bị ràng buộc.',
    ],
    cachDiQua: [
      'ESFP: Tham gia vào những điều INFP coi trọng — giá trị là cốt lõi con người họ.',
      'INFP: Cùng ESFP tận hưởng khoảnh khắc hiện tại — bạn có thể tìm thấy ý nghĩa trong niềm vui chung.',
      'Cả hai: Cả hai đều thiên cảm xúc và biết quan tâm — bắt đầu từ sự quan tâm chân thành dành cho nhau, rồi mở rộng ra.',
    ],
    funFact: 'ESFP và INFP đều thiên cảm xúc — sự ấm áp và quan tâm chân thành. Cách bày tỏ khác nhau (hướng ra ngoài và hướng vào trong) nhưng sự quan tâm thật như nhau. [S]',
    coverage: 'full',
  },
  'ESFP+INTJ': {
    pairKey: 'ESFP+INTJ',
    tenCap: 'Thách thức lớn',
    texture: 'contrast_pair',
    dongLuc: 'ESFP sống với hiện tại và thích giao tiếp; INTJ hướng tương lai và ưa một mình — tương phản cực độ.',
    vungDeHop: 'Khi hợp được: INTJ đưa định hướng, ESFP đưa niềm vui.',
    vungMaSat: 'Cường độ của INTJ dễ làm mờ ánh sáng của ESFP; nhu cầu giao tiếp của ESFP dễ rút cạn INTJ. ESFP sống-với-hiện-tại và thích giao tiếp; INTJ hướng-tương-lai và ưa một mình — định hướng đời sống gần như ngược nhau.',
    canDeY: [
      'Tìm MỘT điều cả hai cùng yêu và lấy đó làm nền tảng.',
      'Cường độ và nhu cầu một mình của INTJ va với lối sống xã hội của ESFP.',
      'Sự tập trung vào hiện tại của ESFP làm INTJ thích lập kế hoạch xa thấy nản.',
    ],
    cachDiQua: [
      'ESFP: Cho INTJ thời gian nạp lại sau sự kiện xã hội — không phải chối từ, đó là cách họ giữ sức.',
      'INTJ: Thỉnh thoảng nhập cuộc thế giới của ESFP — niềm vui của khoảnh khắc hiện tại đáng để trải nghiệm.',
      'Cả hai: Tìm MỘT hoạt động chung cả hai cùng yêu — xây dựng từ điểm tựa đó.',
    ],
    funFact: 'ESFP và INTJ có cấu trúc chức năng khác nhau nhất — tạo nên cả sự cuốn hút ban đầu mạnh lẫn nỗ lực lâu dài đáng kể. [S]',
    coverage: 'full',
  },
  'ESFP+INTP': {
    pairKey: 'ESFP+INTP',
    tenCap: 'Khác biệt thú vị',
    texture: 'challenge_pair',
    dongLuc: 'ESFP sống trong thế giới giác quan; INTP sống trong thế giới khái niệm — ban đầu tò mò lẫn nhau.',
    vungDeHop: 'INTP cho ESFP những ý tưởng để chơi cùng; ESFP cho INTP những trải nghiệm thật để suy ngẫm.',
    vungMaSat: 'Về lâu dài: ESFP muốn nhiều giao tiếp; INTP muốn nhiều chiều sâu — hai định nghĩa khác nhau về niềm vui. ESFP cần sự ấm áp xã giao và niềm vui; INTP cần chiều sâu trí tuệ và ít giao tiếp — nguồn sống khác nhau.',
    canDeY: [
      'Luân phiên: hoạt động của ESFP hôm nay, theo đuổi trí tuệ của INTP hôm khác.',
      'Các kế hoạch xã hội của ESFP làm kiệt sức INTP hướng nội.',
      'Sự tập trung trí tuệ của INTP khiến ESFP thấy thiếu kết nối.',
    ],
    cachDiQua: [
      'ESFP: Cho INTP khoảng một mình thật sự — không coi đó là chối từ là điều rất quan trọng.',
      'INTP: Thỉnh thoảng nhập cuộc thế giới xã hội của ESFP — có thể thú vị hơn bạn nghĩ.',
      'Cả hai: Luân phiên: hoạt động của ESFP một lần, theo đuổi trí tuệ của INTP lần khác.',
    ],
    funFact: 'ESFP và INTP đều tò mò và linh hoạt — sự cởi mở với trải nghiệm mới tạo nhiều kết nối hơn ta tưởng. [S]',
    coverage: 'full',
  },
  'ESFP+ISFJ': {
    pairKey: 'ESFP+ISFJ',
    tenCap: 'Bình yên và rực rỡ',
    texture: 'growth_pair',
    dongLuc: 'Sự chăm sóc và ổn định của ISFJ hấp dẫn ESFP; niềm vui của ESFP hấp dẫn ISFJ — cân bằng tốt.',
    vungDeHop: 'ISFJ mang sự đáng tin; ESFP mang niềm vui — mái nhà vừa ấm vừa hào hứng.',
    vungMaSat: 'ISFJ cần kế hoạch; ESFP cần tự phát — căng nhau về lịch. ESFP nhiều năng lượng và thích giao tiếp; ISFJ trầm và cần nề nếp — phải thương lượng đời sống xã hội liên tục.',
    canDeY: [
      'ESFP: tôn trọng nhu cầu được biết trước chuyện gì sẽ diễn ra của ISFJ.',
      'ISFJ: gật đầu với vài cuộc phiêu lưu tự phát.',
      'ESFP rủ đi phút chót → ISFJ bất an vì không kịp chuẩn bị.', // [SỬA FILLER CHUNG CHUNG: gốc "Thay 'Bạn nên...' bằng 'Mình nghĩ là...'"]
      'ISFJ giữ nề nếp → ESFP thấy hơi gò.', // [SỬA FILLER CHUNG CHUNG: gốc "Nhắc nhau khi cần không gian…"]
    ],
    cachDiQua: [
      'ESFP: Báo trước cho ISFJ khi có thể — chỉ cần trước một ngày cũng giúp họ yên tâm.', // [SỬA FILLER: gốc "Đồng ý về thời điểm 'nói chuyện nghiêm túc'…"]
      'ISFJ: Nói ra giới hạn xã giao của bạn trước khi chạm ngưỡng — "Mình cần một tối yên tĩnh thứ Sáu" rất dễ để sắp xếp quanh.',
      'Cả hai: Cả hai đều quan tâm sâu đến con người — chỉ ở quy mô và nhịp khác nhau.',
    ],
    funFact: 'ESFP và ISFJ đều thiên cảm xúc và sống với hiện tại — sự ấm áp chân thành và quan tâm đến người khác là nền tảng thật, chỉ bày tỏ rất khác nhau. [S]',
    coverage: 'full',
  },
  'ESFP+ISFP': {
    pairKey: 'ESFP+ISFP',
    tenCap: 'Tự do đồng hành',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều sống với hiện tại và thiên cảm xúc — sống thật và quan tâm đến người xung quanh.',
    vungDeHop: 'Thoải mái và vui — mối quan hệ không thấy nặng nề hay đòi hỏi.',
    vungMaSat: 'Cả hai đều tránh va chạm và ngại lên kế hoạch — dễ trôi đi mà không xử lý vấn đề. ESFP hướng ngoại và cần năng lượng xã hội; ISFP hướng nội và cần yên tĩnh — phải thương lượng đời sống xã hội liên tục.',
    canDeY: [
      'Tạo một nếp "hỏi han nhau" — không nặng nề, chỉ là "hai đứa mình dạo này thế nào?"',
      'ESFP rủ giao tiếp nhiều → ISFP cần yên tĩnh để hồi lại.', // [SỬA LỖI LẪN TYPE: gốc "ENTJ… → ISFP…"]
      'ISFP cần khoảng riêng → ESFP dễ thấy bị xa cách.', // [SỬA LỖI LẪN TYPE: gốc "ISFP… → ENTJ…"]
    ],
    cachDiQua: [
      'ESFP: Tôn trọng nhu cầu nạp lại một mình của ISFP — không phải chối từ, đó là cách họ tự chăm sóc mình.',
      'ISFP: Nói ra khi bạn cần yên tĩnh thay vì chỉ rút lui — "Mình cần một mình tối nay, bạn ra ngoài với bạn bè nhé?"',
      'Cả hai: Cùng nhau thương lượng lịch xã giao — vài sự kiện đi chung, vài cái đi riêng, cả hai đều được tôn trọng.',
    ],
    funFact: 'ESFP và ISFP đều sống với hiện tại, có khiếu thẩm mỹ và quan tâm sâu đến những người trong quỹ đạo của mình. [S]',
    coverage: 'full',
  },
  'ESFP+ISTJ': {
    pairKey: 'ESFP+ISTJ',
    tenCap: 'Cần nhiều nỗ lực',
    texture: 'challenge_pair',
    dongLuc: 'ESFP phóng khoáng; ISTJ có cấu trúc — lối sống va nhau đáng kể.',
    vungDeHop: 'ISTJ mang sự ổn định; ESFP mang niềm vui — nếu cả hai trân trọng điều người kia mang lại.',
    vungMaSat: 'ISTJ bực vì ESFP thiếu kế hoạch; ESFP bực vì ISTJ cứng nhắc. ISTJ cần kế hoạch và cấu trúc; ESFP thích tự phát và linh hoạt.',
    canDeY: [
      'Trân trọng sự khác biệt: ESFP dạy ISTJ tận hưởng hiện tại; ISTJ dạy ESFP tính trước.',
      'ESFP đổi kế hoạch phút chót → ISTJ thấy bị coi thường.',
      'ISTJ từ chối phiêu lưu → ESFP thấy bị kìm hãm.',
    ],
    cachDiQua: [
      'ISTJ: Thử một hoạt động tự phát mỗi tháng — để ESFP dẫn dắt.',
      'ESFP: Báo trước cho ISTJ khi có thể — chỉ cần trước một ngày cũng giúp.',
      'Cả hai: Sự đáng tin (ISTJ) + niềm vui (ESFP) là một bộ đôi đẹp — trân trọng cả hai.',
    ],
    funFact: 'ESFP và ISTJ đối lập ở nhiều mặt nhưng cùng một sự nhạy bén thực tế với hiện tại. [S]',
    coverage: 'full',
  },
  'ESFP+ISTP': {
    pairKey: 'ESFP+ISTP',
    tenCap: 'Cùng nhịp hiện tại',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều sống với hiện tại — thực tế, linh hoạt — hợp nhau tự nhiên.',
    vungDeHop: 'Cả hai đều dễ thích nghi và ưa hành động — ở bên nhau dễ chịu, không áp lực.',
    vungMaSat: 'ESFP thích giao tiếp và hay bày tỏ; ISTP kín đáo hơn — lệch nhau về nhu cầu giao tiếp. ESFP cần bày tỏ cảm xúc và kết nối qua lời nói; ISTP thể hiện qua hành động và ít lời — khoảng cách giao tiếp.',
    canDeY: [
      'ESFP: cho ISTP khoảng riêng sau khi giao tiếp.',
      'ISTP: thỉnh thoảng nhập cuộc thế giới xã hội của ESFP.',
      'ISTP xử lý vấn đề một mình → ESFP muốn được an ủi và tham gia.', // [SỬA LỖI LẪN TYPE: gốc "ENTP… → ESFJ…"]
      'ESFP cần được hồi đáp cảm xúc → ISTP nghĩ giải pháp quan trọng hơn.', // [SỬA LỖI LẪN TYPE: gốc "ESFJ… → ENTP…"]
    ],
    cachDiQua: [
      'ESFP: Để ý ISTP làm gì — "họ sửa xe, sửa máy, lo giúp bạn việc gì đó" chính là "tôi thương bạn" theo ngôn ngữ của họ.',
      'ISTP: Thỉnh thoảng nói "tôi thích thời gian ở bên bạn" — ESFP cần nghe, dù với bạn nghe có vẻ không cần thiết.',
      'Cả hai: Kết nối kiểu sống-với-hiện-tại thường qua hoạt động chung — tìm những việc cả hai cùng thích và để kết nối đến tự nhiên.',
    ],
    funFact: 'ESFP và ISTP đều sống với hiện tại và rất linh hoạt. Gắn kết qua hành động đến tự nhiên. [S]',
    coverage: 'full',
  },
}
