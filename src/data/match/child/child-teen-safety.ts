// child-teen-safety.ts
// Đợt 3 MẺ B — CHILD-SAFETY SECTION ⭐⭐ (teen 12-18) · "Khi nào cần thêm hỗ trợ"
// Content agent · 17/06/2026 · ⚠️ MASTER + MA EYEBALL BẮT BUỘC TRƯỚC KHI WIRE
// G-CS1: KHÔNG liệt kê chi tiết dấu hiệu tự hại — GÓI GỌN, hướng HÀNH ĐỘNG (dùng wording Master chốt)
// G-CS2: phân biệt nổi loạn bình thường vs cần chú ý — TRẤN AN trước, KHÔNG gây hoảng
// G-CS3: ranh giới hiểu ≠ kiểm soát — câu redirect chuẩn
// G-CS4: tông KHÔNG alarmist
// ⚠️ NGUỒN HỖ TRỢ = PLACEHOLDER. MA + Master VERIFY số/tổ chức CÒN HOẠT ĐỘNG trước khi ship.
//    KHÔNG hardcode số chưa verify (bài học NEDA: tài nguyên chết mà hiển thị = hại).

export interface ChildTeenSafetySection {
  /** Mở đầu trấn an — đa số là bình thường */
  intro: string
  /** Phân biệt: điều bình thường của tuổi lớn */
  normalSigns: string[]
  /** Điều khác với nổi loạn thường — đáng chú ý thêm (quan sát được, KHÔNG chẩn đoán) */
  concernSigns: string[]
  /** Note trấn an: một hai dấu hiệu thoáng qua ≠ chuyện lớn */
  framingNote: string
  /** Khi nào cần tìm hỗ trợ chuyên môn ngay — GÓI GỌN, hướng hành động (G-CS1) */
  whenToSeekHelp: string
  /** Ranh giới hiểu ≠ kiểm soát (G-CS3) */
  boundaryNote: string
  /** Nguồn hỗ trợ — primary + fallback */
  resources: {
    primary: string
    fallback: string
  }
  /** Đóng lại bằng tông không alarmist (G-CS4) */
  closing: string
}

export const CHILD_TEEN_SAFETY: ChildTeenSafetySection = {
  intro:
    'Phần lớn những gì trông như "nổi loạn" ở tuổi này là một phần bình thường của việc lớn lên. Mục này không phải để khiến bạn lo thường trực — mà để bạn nhận ra ranh giới giữa điều bình thường và điều đáng tìm thêm hỗ trợ, nếu lúc nào đó bạn cần.',

  normalSigns: [
    'Con muốn riêng tư hơn, đóng cửa phòng nhiều hơn.',
    'Con thân với bạn bè hơn, ưu tiên bạn trong nhiều quyết định.',
    'Con thử phong cách, quan điểm, sở thích khác với bố mẹ.',
    'Con hay cãi hoặc tranh luận để thử ý của mình.',
    'Tâm trạng con lên xuống thất thường theo giai đoạn.',
  ],

  concernSigns: [
    'Con rút lui khỏi tất cả mọi người — không chỉ gia đình mà cả bạn bè, thầy cô.',
    'Một thay đổi kéo dài liên tục trên hai tuần, không phải nhất thời theo mùa thi.',
    'Ăn, ngủ, học sa sút mạnh và kéo dài, không rõ nguyên nhân.',
    'Con mất hứng thú với cả những điều con từng rất thích.',
    'Con nói về cảm giác vô vọng, không thấy đường phía trước.',
  ],

  framingNote:
    'Có một vài dấu hiệu thoáng qua thường không phải chuyện lớn — tuổi này vốn nhiều biến động. Điều đáng lưu tâm hơn là khi nhiều dấu hiệu cùng xuất hiện và kéo dài.',

  // G-CS1 — wording Master chốt, GÓI GỌN, KHÔNG liệt kê chi tiết
  whenToSeekHelp:
    'Nếu bạn thấy con nói về việc không muốn tồn tại, cảm thấy mình là gánh nặng cho người khác, hoặc có thay đổi khiến bạn lo về sự an toàn của con — đừng chờ. Hãy tìm hỗ trợ chuyên môn ngay. Đây không phải lúc để tự xoay xở một mình.',

  // G-CS3 — redirect hiểu ≠ kiểm soát
  boundaryNote:
    'Khi lo, bạn có thể thấy muốn kiểm tra điện thoại hay đọc tin nhắn để biết con đang giấu gì. Nhưng hiểu con không phải là xem con làm gì — mà là hiểu vì sao con làm vậy. Cách đó thường mở được nhiều hơn, và giữ được lòng tin để con tìm đến bạn khi thật sự cần.',

  resources: {
    primary: 'Tổng đài Quốc gia Bảo vệ Trẻ em: 111 — miễn phí, 24/7',
    fallback: 'cơ sở y tế hoặc bệnh viện tâm thần gần nhất',
  },

  // G-CS4 — đóng lại, không alarmist
  closing:
    'Hầu hết bố mẹ sẽ không bao giờ cần dùng tới mục này. Nhưng biết khi nào nên tìm thêm hỗ trợ cũng là một phần của việc ở bên con — không phải vì bạn làm gì sai, mà vì có những lúc một đứa trẻ cần nhiều hơn những gì một mình gia đình lo được.',
}
