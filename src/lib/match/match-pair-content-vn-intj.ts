// match-pair-content-vn-intj.ts
// Task 4 retone — BATCH 11: 6 cặp INTJ+*
// Content agent · 16/06/2026 · giữ pairKey/texture/coverage/tag nguồn
// compat-only: INTJ+INTJ, INTJ+INTP · Nhóm này KHÔNG có lỗi lẫn type — chỉ retone EN code-mixing

import type { MatchPairContent } from './match-pair-content'

export const MATCH_PAIR_CONTENT_VN_INTJ: Record<string, MatchPairContent> = {
  'INTJ+INTJ': {
    pairKey: 'INTJ+INTJ',
    tenCap: 'Hiểu nhau sâu',
    texture: 'growth_pair',
    dongLuc: 'Hiểu nhau về nhu cầu không gian và chiều sâu — nhưng ai sẽ là người kết nối cảm xúc?',
    vungDeHop: 'Hoàn toàn tôn trọng nhau và không cần giải thích mọi thứ — hiệu quả, gắn kết sâu.',
    vungMaSat: 'Cả hai đều ít biểu lộ cảm xúc — mối quan hệ có thể thấy lạnh nếu không chủ ý.',
    canDeY: [
      'Sắp lịch "hỏi han nhau" về cảm xúc, không chỉ về kế hoạch và ý tưởng.',
    ],
    cachDiQua: [],
    coverage: 'compat-only',
  },
  'INTJ+INTP': {
    pairKey: 'INTJ+INTP',
    tenCap: 'Tư duy đồng nhịp',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều coi trọng năng lực và chiều sâu — sự nể nhau tự nhiên cao nhất.',
    vungDeHop: 'Kết nối trí tuệ sâu sắc — không bao giờ nhàm, luôn cùng phát triển.',
    vungMaSat: 'Cả hai đều hướng nội và ít biểu lộ — hơi ấm phải đến từ sự chủ động.',
    canDeY: [
      'Bày tỏ sự trân trọng rõ ràng — "tôi quý lúc bạn..." ít nhất mỗi tuần.',
    ],
    cachDiQua: [],
    coverage: 'compat-only',
  },
  'INTJ+ISFJ': {
    pairKey: 'INTJ+ISFJ',
    tenCap: 'Khác biệt cơ bản',
    texture: 'challenge_pair',
    dongLuc: 'INTJ coi trọng đổi mới; ISFJ coi trọng truyền thống — căng thẳng nền tảng.',
    vungDeHop: 'ISFJ mang sự ấm áp và chăm sóc mà INTJ thầm cần; INTJ mang tầm nhìn mà ISFJ được lợi.',
    vungMaSat: 'Sự thẳng thắn của INTJ làm ISFJ tổn thương; sự thiên về truyền thống của ISFJ làm INTJ bực. INTJ muốn thiết kế lại; ISFJ muốn gìn giữ — căng nhau giữa thay đổi và ổn định.',
    canDeY: [
      'INTJ: làm mềm cách nói rất nhiều.',
      'ISFJ: nói nỗi lo sớm, đừng chịu đựng lâu rồi mới nói.',
      'INTJ muốn đổi cái ISFJ đã chăm chút.',
      'Sự thẳng thắn của INTJ làm ISFJ vốn quan tâm thấy tổn thương.',
    ],
    cachDiQua: [
      'INTJ: Ghi nhận điều đang chạy tốt trước khi đề xuất thay đổi — ISFJ cần biết bạn trân trọng nền tảng họ tạo ra.',
      'ISFJ: Hỏi về lý do của INTJ — những thay đổi của họ thường có logic cẩn thận đáng hiểu.',
      'Cả hai: Tối ưu dài hạn của INTJ + sự gìn giữ đáng tin của ISFJ = những hệ thống vừa cải thiện vừa bền vững.',
    ],
    funFact: 'INTJ và ISFJ đều hướng nội và thích sự dứt khoát — cùng sự hướng nội và cam kết tạo nên một sự ổn định ngầm. [S]',
    coverage: 'full',
  },
  'INTJ+ISFP': {
    pairKey: 'INTJ+ISFP',
    tenCap: 'Khác màu sắc',
    texture: 'challenge_pair',
    dongLuc: 'INTJ trừu tượng và chiến lược; ISFP sống với hiện tại và theo giá trị — hai thế giới khác nhau.',
    vungDeHop: 'ISFP mang sự ấm áp và chân thật; INTJ mang chiều sâu và định hướng.',
    vungMaSat: 'Cường độ của INTJ có thể làm ISFP dịu dàng quá tải; sự tập trung vào hiện tại của ISFP có thể làm INTJ bực. INTJ trừu tượng và có hệ thống; ISFP sống với hiện tại và theo giá trị, thẩm mỹ — hai cách tiếp xúc với thế giới rất khác nhau.',
    canDeY: [
      'INTJ: thỉnh thoảng bắt nhịp với ISFP.',
      'ISFP: thử tham gia vào những ý tưởng lớn của INTJ.',
      'Nhịp và cường độ của INTJ áp đảo ISFP nhẹ nhàng.',
      'Sự tập trung vào hiện tại của ISFP va với kế hoạch dài hạn của INTJ.',
    ],
    cachDiQua: [
      'INTJ: Bắt nhịp với ISFP khi không phải lúc tập trung vào việc — chậm lại và trân trọng hiện tại.',
      'ISFP: Tham gia vào những ý tưởng lớn của INTJ — chúng không xa rời thực tế, chúng định hình thực tế.',
      'Cả hai: Tầm nhìn của INTJ + sự chân thật của ISFP = một cuộc sống vừa chạy được vừa có ý nghĩa.',
    ],
    funFact: 'INTJ và ISFP có cách phán đoán đối nghịch — tạo nên sự bổ sung thật ở nhiều chiều. [S]',
    coverage: 'full',
  },
  'INTJ+ISTJ': {
    pairKey: 'INTJ+ISTJ',
    tenCap: 'Kỷ luật và tầm nhìn',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội, lý trí và dứt khoát — đáng tin và chiến lược — INTJ đổi mới hơn, ISTJ hệ thống hơn.',
    vungDeHop: 'Sự tin tưởng và đáng tin sâu — cả hai đều giữ lời.',
    vungMaSat: 'INTJ muốn nghĩ lại từ đầu; ISTJ muốn theo cách đã được kiểm chứng — căng nhau về thay đổi. INTJ đổi mới từ nguyên lý gốc; ISTJ thực thi cách đã kiểm chứng — căng nhau về khi nào nên thiết kế lại và khi nào nên tối ưu.',
    canDeY: [
      'INTJ: tôn trọng điều đang chạy tốt.',
      'ISTJ: cởi mở với việc cải tiến.',
      'INTJ muốn nghĩ lại cái ISTJ đã tối ưu.',
      'Khác nhau về mức chịu đựng sự không chắc chắn trong quyết định.',
    ],
    cachDiQua: [
      'INTJ: Ghi nhận chuyên môn vận hành của ISTJ — bạn cần kỹ năng thực thi của họ.',
      'ISTJ: Tham gia vào những thiết kế lại của INTJ — chúng thường chỉ ra những cải tiến đáng làm.',
      'Cả hai: Chiến lược của INTJ + khả năng triển khai của ISTJ = những hệ thống vừa vững về ý tưởng vừa đáng tin về vận hành.',
    ],
    funFact: 'INTJ và ISTJ đều hướng nội, lý trí và dứt khoát — trầm, logic và rất cam kết. Sự nể nhau đến qua năng lực thể hiện được. [S]',
    coverage: 'full',
  },
  'INTJ+ISTP': {
    pairKey: 'INTJ+ISTP',
    tenCap: 'Cùng độc lập',
    texture: 'growth_pair',
    dongLuc: 'Cả hai đều hướng nội và lý trí — tôn trọng khoảng riêng và năng lực — một không gian dễ chịu.',
    vungDeHop: 'Không ai làm phiền không gian của ai — nể nhau sâu mà không phụ thuộc.',
    vungMaSat: 'Cả hai đều ít biểu lộ — kết nối có thể mãi không được nói ra. INTJ làm việc từ những mẫu hình trừu tượng; ISTP làm việc từ cơ chế cụ thể — gốc xử lý khác nhau.',
    canDeY: [
      'Tìm một dự án hoặc thử thách chung — gắn kết qua năng lực hợp với cả hai.',
      'INTJ nghĩ theo cái trừu tượng dài hạn mà ISTP thấy không thực tế.',
      'Không ai tự nhiên bày tỏ quan tâm bằng lời → khoảng cách cảm xúc.',
    ],
    cachDiQua: [
      'INTJ: Tôn trọng kiến thức thực tế của ISTP — năng lực thực hành của họ thường chỉ ra điều bạn bỏ lỡ.',
      'ISTP: Tham gia vào những mẫu hình dài hạn của INTJ — họ thấy được điều sắp xảy ra trước khi nó hiện ra.',
      'Cả hai: Cả hai đều rất giỏi và độc lập — sự nể nhau qua kỹ năng thể hiện được.',
    ],
    funFact: 'INTJ và ISTP đều hướng nội và lý trí — cả hai trầm, độc lập. Sự dễ chịu tự nhiên với cả im lặng. [S]',
    coverage: 'full',
  },
}
