/**
 * MA M5a — Four Horsemen (friction-tier) + tầng PROTECTIVE cho Match Assistant.
 *
 * Nguồn Gottman: tổng hợp từ 16p-knowledge-supplement.ts (FOUR_HORSEMEN).
 * Tầng PROTECTIVE: biên soạn PM TNCB.
 *
 * Detect: detect-protective.ts (M5b). Hotline inject: build-match-system-prompt.ts via tncb-resources-vn-safety.
 */

export type HorsemanKey =
  | 'criticism'
  | 'contempt'
  | 'defensiveness'
  | 'stonewalling'

export interface HorsemanEntry {
  key: HorsemanKey
  ten: string
  moTa: string
  antidote: string
}

export const FOUR_HORSEMEN: HorsemanEntry[] = [
  {
    key: 'criticism',
    ten: 'Chỉ trích',
    moTa:
      "Công kích con người thay vì hành vi — 'lúc nào cũng...', 'anh/em là người ích kỷ'. Đánh vào tính cách, không phải việc cụ thể.",
    antidote:
      "Nói về hành vi cụ thể và cảm nhận của mình, không dán nhãn người kia. 'Anh thấy quá tải khi việc nhà dồn lại — mình chia nhau nhé?' thay vì 'em lười'.",
  },
  {
    key: 'contempt',
    ten: 'Khinh thường',
    moTa:
      'Chế giễu, coi thường, mỉa mai, hạ thấp — giọng bề trên, ánh mắt khinh. Gottman xem đây là dấu hiệu nguy hiểm nhất cho một quan hệ.',
    antidote:
      'Quay lại nhìn điều mình còn trân trọng ở người kia và nói ra. Khinh thường tích tụ từ oán giận không được nói — xử lý oán giận sớm, đừng để nó lên men.',
  },
  {
    key: 'defensiveness',
    ten: 'Phòng thủ',
    moTa:
      "Phủ nhận phần của mình, đổ ngược lỗi — 'tại em trước', 'anh có làm gì đâu'. Phổ biến nhất, phần lớn người rơi vào khi cãi.",
    antidote:
      "Nhận lấy dù chỉ một phần nhỏ trách nhiệm trước khi giải thích. 'Ừ, phần đó anh sai. Còn chuyện kia mình nói thêm nhé.'",
  },
  {
    key: 'stonewalling',
    ten: 'Phớt lờ / tường đá',
    moTa:
      'Rút lui, im lặng, đóng băng, không phản hồi. Khác với xin nghỉ có hẹn quay lại — tường đá là rút đi không hẹn ngày về.',
    antidote:
      "Khi quá tải, xin nghỉ rõ ràng có cam kết: 'mình cần 20 phút rồi quay lại nói tiếp' — thay vì im bặt bỏ đó.",
  },
]

export const FRICTION_FRAMING =
  'Bốn cái này ai cũng có lúc rơi vào — bản thân chúng không có nghĩa quan hệ đã hỏng. Phần lớn mâu thuẫn trong các cặp không bao giờ được giải quyết dứt điểm, và điều đó bình thường. Vấn đề nằm ở tần suất và việc có sửa được không, chứ không phải có hay không.'

export const PROTECTIVE_SIGNALS: string[] = [
  '"sợ" / "không dám" / "lo bị trừng phạt"',
  '"kiểm soát" / "cấm" / "không cho gặp" / "không cho mặc" / "không cho làm" / "bắt phải"',
  '"theo dõi điện thoại" / "định vị" / "ghen tới mức kiểm soát"',
  '"không cho gặp bạn bè" / "không cho gặp gia đình" / "cô lập"',
  '"dọa" / "đe dọa" / "dọa tự tử để giữ" / "dọa bỏ con"',
  '"đánh" / "tát" / "bóp cổ" / "ném đồ" / "thương tích" / "bạo lực" / "bạo hành"',
  '"giữ hết tiền" / "không cho tiền" / "không cho đi làm"',
  '"hạ nhục thường xuyên" / "ngày càng tệ hơn"',
]

export const PROTECTIVE_RESPONSE_RULES: string[] = [
  'Gọi tên thẳng và nhẹ: đây không còn là mâu thuẫn cân bằng để học cách đi qua — đây là dấu hiệu một quan hệ không an toàn.',
  'KHÔNG dạy antidote như thể hai bên cân nhau. KHÔNG tối ưu việc cứu hay giữ quan hệ. An toàn của bạn đứng trên sự tương hợp.',
  'Không phán xét, không thúc ép quyết định. Trao thông tin và đường dây hỗ trợ, để bạn tự quyết.',
  'Hướng tới đường dây hỗ trợ bạo lực gia đình (lấy số từ SSOT chung). Nguy cấp tức thì thì gọi cấp cứu (số từ SSOT).',
  'Nếu có đe dọa tính mạng hoặc ý định tự hại (của bạn hoặc bị người kia dọa) → đi theo đường khủng hoảng đã có, không phải PROTECTIVE thường.',
  'Khi ranh giới mơ hồ giữa mâu thuẫn-bình-thường và không-an-toàn → nghiêng về bảo vệ. Không khuyên ở lại.',
]

const HORSEMAN_BY_KEY: Record<HorsemanKey, HorsemanEntry> = {
  criticism: FOUR_HORSEMEN[0]!,
  contempt: FOUR_HORSEMEN[1]!,
  defensiveness: FOUR_HORSEMEN[2]!,
  stonewalling: FOUR_HORSEMEN[3]!,
}

/** Tra 1 horseman theo key. // TODO(M4): dùng trong tư vấn xung đột bình thường. */
export function getHorseman(key: HorsemanKey): HorsemanEntry {
  return HORSEMAN_BY_KEY[key]
}
