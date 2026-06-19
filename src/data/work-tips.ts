/**
 * Work module — WORK_TIPS (B2C S4) & STRESS_PATTERNS (B2B, giữ nguyên)
 * WORK_TIPS: sharpen batch1+batch2 + việt hóa English còn lại
 */

export { STRESS_PATTERNS } from './16p-knowledge-distilled'

export const WORK_TIPS: Record<
  string,
  {
    doMore: string[]
    doLess: string[]
  }
> = {
  INTJ: {
    doMore: [
      'Chủ động tiếp cận đồng nghiệp — tính độc lập không có nghĩa là một mình',
      "Coi mỗi người trong team là một 'dự án nghiên cứu' thú vị",
      'Tìm giá trị trong cách làm việc khác của người khác',
    ],
    doLess: [
      'Áp tiêu chuẩn của mình lên người khác (trừ khi trong mô tả công việc)',
      'Bác bỏ ý kiến người khác trước khi nghe xong',
    ],
  },
  INTP: {
    doMore: [
      "Lắng nghe cẩn thận hơn — đặc biệt với các chủ đề 'mềm' về con người",
      'Tò mò về cảm xúc người khác, không chỉ về logic',
    ],
    doLess: [
      'Suy nghĩ quá mức — đôi khi 1 câu trả lời đơn giản tốt hơn 47 góc nhìn',
      'Biến mọi cuộc thảo luận thành bài tập tư duy lý thuyết',
    ],
  },
  ENTJ: {
    doMore: [
      'Thỉnh thoảng giảm cường độ để người khác theo kịp — đó cũng là lãnh đạo',
      'Đóng vai cố vấn thay vì chỉ trích khi ai đó làm sai',
    ],
    doLess: [
      'Phán xét người không đáp ứng tiêu chuẩn của bạn',
      'Coi team như quân cờ phục vụ mục tiêu của bạn',
    ],
  },
  ENTP: {
    doMore: [
      'Lắng nghe feedback đủ lâu trước khi phản bác',
      'Nhận ra không phải mọi thứ đều cần được thách thức',
    ],
    doLess: [
      'Tranh luận chỉ vì thích tranh luận — đôi khi hợp tác quan trọng hơn đúng',
      'Thách thức mọi quyết định trong họp',
    ],
  },
  INFJ: {
    doMore: [
      'Tiếp cận nơi làm việc với sự khách quan tĩnh lặng — xem thứ đang tồn tại, không chỉ thứ nên tồn tại',
      'Chủ động hướng dẫn khi người khác cần — đừng giả định họ tự tìm ra',
    ],
    doLess: [
      'Giả định rằng tôn trọng sự tự chủ = không bao giờ đưa ra hướng dẫn',
      "Sống với quá nhiều 'nên' và kỳ vọng không thực tế",
    ],
  },
  INFP: {
    doMore: [
      'Đặt deadline riêng cho bản thân và giữ như cam kết — kỷ luật giúp bạn khi không có cảm hứng bên ngoài',
      'Bước lùi trước khi phản ứng từ cảm xúc',
    ],
    doLess: [
      'Nhầm hiền hòa với yếu đuối — bạn có thể tử tế VÀ mạnh mẽ',
      'Để cảm xúc tức thời quyết định hành động dài hạn',
    ],
  },
  ENFJ: {
    doMore: [
      'Mở rộng kỹ năng và phạm vi — không chỉ dựa vào một thế mạnh duy nhất',
      'Đứng lên trong xung đột khi cần thiết — không phải mọi xung đột đều nên tránh',
    ],
    doLess: [
      'Tránh mọi xung đột — đôi khi xung đột cần thiết để đạt kết quả tốt',
      'Quá tập trung vào 1 khía cạnh công việc',
    ],
  },
  ENFP: {
    doMore: [
      'Chú ý đến chi tiết nhỏ — 1 chi tiết bỏ qua có thể phá vỡ cả dự án',
      'Thực hành tỉnh thức để quay về hiện tại khi bị cuốn vào ý tưởng',
    ],
    doLess: [
      'Để ý tưởng mới trở thành xao nhãng khỏi việc đang làm',
      'Chia sẻ ý tưởng chưa được lọc trong mọi cuộc họp',
    ],
  },
  ISTJ: {
    doMore: [
      'Xây dựng 1-2 mối quan hệ thân thiết tại nơi làm việc — không cần là người vui tính nhất',
      "Tự hỏi: 'Điều gì thật sự nuôi dưỡng mình?' thay vì chỉ làm theo kỳ vọng",
    ],
    doLess: [
      'Bị cuốn theo áp lực của người có ảnh hưởng — đặt câu hỏi thay vì chỉ tuân theo',
      'Gán cho người với lỗi lầm họ mắc',
    ],
  },
  ISFJ: {
    doMore: [
      'Đặt lịch thời gian cho bản thân cụ thể — không ai cho đi được khi cạn kiệt',
      'Hỏi đồng nghiệp cần gì thay vì tự gánh mọi thứ',
    ],
    doLess: [
      'Nghĩ rằng bạn nên làm được tất cả mọi thứ',
      'Bám chặt vào phương pháp cũ khi môi trường đã thay đổi',
    ],
  },
  ESTJ: {
    doMore: [
      'Dành thời gian tìm hiểu về người trong team — họ không chỉ là nguồn lực',
      'Ủy quyền đúng người để giải phóng capacity cho việc quan trọng hơn',
    ],
    doLess: [
      'Quên dừng lại để nhận ra tiến độ team đã đạt',
      'Bỏ qua cảm xúc như thứ không quan trọng',
    ],
  },
  ESFJ: {
    doMore: [
      'Giao tiếp rõ ràng hơn về ý định khi cân bằng giữa kết quả và hòa hợp',
      'Để người khác giúp bạn thay vì tự làm tất cả',
    ],
    doLess: [
      "Trở thành 'cảnh sát tiêu chuẩn' — mọi người có cách làm việc khác nhau",
      'Dồn mọi tiêu chuẩn của bạn lên người khác',
    ],
  },
  ISTP: {
    doMore: [
      'Nói ra kết quả bạn đã làm được — ISTP thường giải quyết xong việc mà không ai biết; thỉnh thoảng cập nhật tiến độ giúp người khác thấy giá trị công việc của bạn',
      'Hỏi thăm nhóm thường xuyên hơn — hỏi trước khi làm',
    ],
    doLess: [
      'Hoạt động hoàn toàn độc lập mà không cập nhật người xung quanh',
      "Giả định 'xin lỗi dễ hơn xin phép' luôn đúng",
    ],
  },
  ISFP: {
    doMore: [
      'Tìm kiếm feedback về ý tưởng trước khi đi quá xa',
      "Hỏi 'tại sao' nhiều hơn 'như thế nào' khi tiếp cận việc",
    ],
    doLess: [
      "Để 'thú vị' là tiêu chí duy nhất — một thứ có thể vừa sáng tạo vừa thiếu thực tế",
      'Quên chia sẻ lý do đằng sau hành động — câu chuyện là phần của giá trị',
    ],
  },
  ESTP: {
    doMore: [
      'Tăng cường đồng cảm — kết nối tốt nhưng cần sâu hơn nữa',
      'Cho người khác thời gian xử lý trước khi hành động',
    ],
    doLess: [
      'Làm mọi thứ theo ý mình — năng lượng mạnh có thể khiến người khác cảm thấy bị áp đảo',
      'Quá tập trung vào thắng lợi ngắn hạn mà bỏ qua chiến lược dài hạn',
    ],
  },
  ESFP: {
    doMore: [
      'Để sự tò mò khám phá tương lai — đặt câu hỏi về 2, 5, 10 năm nữa',
      'Lên kế hoạch cụ thể cho những điều bạn muốn trong tương lai',
    ],
    doLess: [
      "Bỏ qua chi tiết tẻ nhạt — tiền, thời gian, các con số nhỏ thường là thứ quyết định",
      "Tránh việc lập kế hoạch vì nó 'không vui'",
    ],
  },
}
