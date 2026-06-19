import type { WorkingStyle } from './external-type-estimator'

export interface KinhDoanhGuidance {
  readSignal: string
  approach: string[]
  avoid: string
  faceSaving: string
}

export const KH_GUIDANCE: Record<WorkingStyle, KinhDoanhGuidance> = {
  direct: {
    readSignal:
      'Khách quyết nhanh, ghét vòng vo. Họ tôn trọng người nói thẳng có lý do.',
    approach: [
      'Đưa bottom line trước: được/không được, bao nhiêu, bao lâu.',
      'Khi từ chối: nói thẳng + lý do ngắn + giải pháp thay thế ngay.',
      'Không xin lỗi quá nhiều — họ đọc đó là thiếu tự tin.',
    ],
    avoid: 'Đừng giải thích dài dòng hay xin lỗi vòng vo — họ mất kiên nhẫn.',
    faceSaving:
      'Với khách direct, "thẳng nhưng tôn trọng" = giữ thể diện. Họ thích được coi là người quyết định được.',
  },
  analytical: {
    readSignal:
      'Khách cẩn thận, cần data và sự rõ ràng. Họ khó chịu với ước lượng mơ hồ.',
    approach: [
      'Chuẩn bị số liệu, timeline, phạm vi rõ ràng trước khi trao đổi.',
      'Khi báo giá/từ chối: kèm phân tích cụ thể, không cảm tính.',
      'Cho họ thời gian xem xét — đừng ép quyết định ngay.',
    ],
    avoid: 'Đừng đưa ước lượng "khoảng khoảng" — họ sẽ mất tin tưởng.',
    faceSaving:
      'Với khách analytical, sự chính xác = tôn trọng. Số liệu rõ giúp họ giữ thể diện khi báo cáo lên trên.',
  },
  relational: {
    readSignal:
      'Khách coi trọng quan hệ, hay nói "mình tin bên bạn". Họ nhạy cảm với cách từ chối.',
    approach: [
      'Giữ quan hệ ấm trước khi vào việc — hỏi thăm là đầu tư, không phí.',
      'Khi cần đặt ranh giới: nói theo hướng "để phục vụ anh/chị tốt hơn lâu dài".',
      'Từ chối kèm cam kết quan hệ: "lần này em chưa làm được nhưng..."',
    ],
    avoid: 'Đừng từ chối thẳng băng — họ đọc đó là "không coi trọng quan hệ".',
    faceSaving:
      'Với khách relational, cách nói quan trọng hơn nội dung. "Không làm mất mặt" là chìa khóa giữ khách.',
  },
  expressive: {
    readSignal:
      'Khách nhiệt, nhiều ý tưởng, hay "thêm cái này cái kia". Dễ phát sinh việc ngoài thỏa thuận.',
    approach: [
      'Đón nhận ý tưởng tích cực trước, rồi quy về phạm vi thực tế.',
      'Khi cần giới hạn: "ý hay đó! Để làm được, mình cần ưu tiên X trước".',
      'Cho họ cảm giác được nghe — rồi mới điều hướng về khả thi.',
    ],
    avoid: 'Đừng dập ý tưởng ngay bằng "không được" — họ mất hứng và thấy bị cản.',
    faceSaving:
      'Với khách expressive, công nhận ý tưởng = giữ thể diện. Điều hướng nhẹ nhàng hiệu quả hơn từ chối thẳng.',
  },
}

export const DT_GUIDANCE: Record<WorkingStyle, KinhDoanhGuidance> = {
  direct: {
    readSignal:
      'Đối tác quyết đoán, muốn rõ ràng trách nhiệm. Phù hợp với cam kết minh bạch.',
    approach: [
      'Xác định rõ ai làm gì, deadline nào, ngay từ đầu.',
      'Khi họ trễ cam kết: nói thẳng dựa trên thỏa thuận, không vòng vo.',
      'Đề xuất giải pháp cùng thắng — họ tôn trọng người nghĩ về kết quả chung.',
    ],
    avoid: 'Đừng để mọi thứ "ngầm hiểu" — đối tác direct cần cam kết rõ ràng.',
    faceSaving:
      'Với đối tác direct, minh bạch trách nhiệm = chuyên nghiệp, không phải thiếu tin tưởng.',
  },
  analytical: {
    readSignal:
      'Đối tác coi trọng quy trình và điều khoản. Họ giữ đúng những gì đã ký.',
    approach: [
      'Dựa trên hợp đồng/thỏa thuận khi có tranh chấp — họ tôn trọng văn bản.',
      'Khi cần thay đổi: đề xuất bằng văn bản, có lý do rõ.',
      'Ghi lại mọi thay đổi bằng văn bản — họ đánh giá cao sự rõ ràng.',
    ],
    avoid: 'Đừng đề nghị thay đổi điều khoản bằng miệng — họ cần văn bản.',
    faceSaving:
      'Với đối tác analytical, tuân thủ quy trình = tôn trọng. Văn bản rõ giúp cả hai cùng giữ thể diện.',
  },
  relational: {
    readSignal:
      'Đối tác coi trọng quan hệ lâu dài hơn từng giao dịch. Thiện chí là vốn.',
    approach: [
      'Đầu tư quan hệ — đối tác relational nhớ ơn và đáp lại.',
      'Khi có vấn đề: giải quyết riêng, giữ thể diện cho họ trước người khác.',
      'Tìm điểm chung và lợi ích đôi bên thay vì đòi hỏi cứng.',
    ],
    avoid: 'Đừng làm họ mất mặt trước bên thứ ba — quan hệ có thể đổ vỡ.',
    faceSaving:
      'Với đối tác relational, giữ thể diện = giữ quan hệ = giữ hợp tác dài hạn.',
  },
  expressive: {
    readSignal:
      'Đối tác nhiệt, sáng tạo, hay đề xuất hướng mới. Năng lượng cao nhưng dễ lan man.',
    approach: [
      'Đón nhận năng lượng nhưng neo về cam kết cụ thể và deadline.',
      'Khi họ đổi hướng giữa chừng: nhắc lại mục tiêu chung đã thống nhất.',
      'Ghi lại thỏa thuận sau mỗi lần bàn — tránh "nói rồi quên".',
    ],
    avoid: 'Đừng để cuộc bàn không có kết luận rõ — expressive partner dễ trôi.',
    faceSaving:
      'Với đối tác expressive, ghi nhận ý tưởng rồi chốt cụ thể = vừa giữ hứng vừa giữ trách nhiệm.',
  },
}

export function getKinhDoanhGuidance(
  context: 'KH' | 'DT',
  style: WorkingStyle,
): KinhDoanhGuidance {
  return context === 'KH' ? KH_GUIDANCE[style] : DT_GUIDANCE[style]
}
