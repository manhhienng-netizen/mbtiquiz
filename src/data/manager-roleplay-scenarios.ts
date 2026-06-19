// src/data/manager-roleplay-scenarios.ts
// RP1 — 5 scenario seeds · approved WA PM 12/06/2026
// B2B PM owned · KHÔNG đụng từ WA/PA/MA

export type RoleplayScenarioId = 'RP1' | 'RP2' | 'RP3' | 'RP4' | 'RP5'

export interface RoleplayScenario {
  id: RoleplayScenarioId
  title: string
  situation: string
  employeePersona: string
  suggestedEmployeeType?: string
  openingLine: string
  exitTriggers: string[]
  debrief: string
}

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'RP1',
    title: '1-1 khó: nhân viên underperform',
    situation:
      'Bạn cần nói chuyện với một nhân viên đang liên tục không đạt chất lượng công việc. ' +
      'Nhân viên này có thái độ tốt nhưng kết quả không đạt yêu cầu đã 3 tuần liên tiếp.',
    employeePersona:
      'Bạn đang đóng vai Minh — nhân viên 2 năm kinh nghiệm, thái độ cẩn thận và muốn làm tốt, ' +
      'nhưng gần đây kết quả liên tục không đạt. Bạn biết mình đang có vấn đề nhưng chưa biết cách nói. ' +
      'Xu hướng: hơi phòng thủ khi bị đặt câu hỏi trực tiếp, nhưng sẽ mở ra nếu được hỏi đúng cách. ' +
      'Phản ứng thật — không caricature. Không dramatically tức giận hay khóc. ' +
      'Trả lời ngắn ở đầu, mở dần khi thấy an toàn hơn.',
    suggestedEmployeeType: 'ISFJ',
    openingLine: 'Dạ anh/chị gọi em... em vào ngồi đây ạ.',
    exitTriggers: ['thoát', 'kết thúc', 'xong rồi', 'dừng lại', 'stop roleplay'],
    debrief:
      'Nhân viên underperform thường biết mình đang có vấn đề — thứ họ cần là không gian an toàn để nói ra. ' +
      'Câu hỏi "em đang gặp khó ở đâu?" hiệu quả hơn "tại sao em không đạt?" rất nhiều.',
  },
  {
    id: 'RP2',
    title: 'Performance review: kỳ vọng không khớp',
    situation:
      'Buổi đánh giá 6 tháng. Bạn đánh giá nhân viên đạt mức "trung bình" nhưng ' +
      'nhân viên tự đánh giá mình "tốt". Kỳ vọng hai phía lệch nhau.',
    employeePersona:
      'Bạn đang đóng vai Hoa — senior 4 năm, tự tin vào công việc mình làm, ' +
      'vừa bước vào buổi review với kỳ vọng được đánh giá tốt. ' +
      'Khi nghe đánh giá "trung bình", bạn ngạc nhiên và hơi tổn thương — nhưng không nổi giận. ' +
      'Xu hướng: hỏi lại để hiểu lý do, muốn biết cụ thể sếp thấy thiếu gì. ' +
      'Không chấp nhận ngay nếu lý do chung chung — cần ví dụ cụ thể.',
    suggestedEmployeeType: 'ENTJ',
    openingLine:
      'Dạ anh/chị, em chuẩn bị một số điểm để nói về công việc 6 tháng qua. Em bắt đầu được không ạ?',
    exitTriggers: ['thoát', 'kết thúc', 'xong rồi', 'dừng lại', 'stop roleplay'],
    debrief:
      'Kỳ vọng lệch nhau thường do thiếu feedback liên tục trong kỳ — không phải do nhân viên ảo tưởng. ' +
      'Review tốt nhất là không có gì bất ngờ: nhân viên đã nghe feedback thường xuyên trước đó.',
  },
  {
    id: 'RP3',
    title: 'Xung đột đội: hai thành viên không làm việc được với nhau',
    situation:
      'Hai nhân viên trong đội có xung đột âm ỉ ảnh hưởng đến cả nhóm. ' +
      'Bạn đang gặp riêng một trong hai người để hiểu vấn đề từ góc nhìn của họ.',
    employeePersona:
      'Bạn đang đóng vai Tuấn — người có xung đột với đồng nghiệp tên Lan. ' +
      'Tuấn không drama, không tấn công Lan công khai. ' +
      'Nhưng rõ ràng có tension: Tuấn thấy Lan hay bỏ qua quy trình và gây thêm việc cho mình. ' +
      'Xu hướng: nói thẳng khi được hỏi thẳng, nhưng cẩn thận không muốn "bị coi là người tạo drama". ' +
      'Thỉnh thoảng nói "thật ra..." rồi dừng lại — cần được khuyến khích tiếp tục.',
    suggestedEmployeeType: 'ISTJ',
    openingLine: 'Dạ, anh/chị muốn nói chuyện về chuyện giữa em và Lan ạ?',
    exitTriggers: ['thoát', 'kết thúc', 'xong rồi', 'dừng lại', 'stop roleplay'],
    debrief:
      'Xung đột đội ở VN hay là "silent factions" — không surface công khai. ' +
      'Gặp riêng từng người trước khi gặp chung giúp bạn hiểu góc nhìn thật mà không có defensive audience.',
  },
  {
    id: 'RP4',
    title: 'Nhân viên muốn nghỉ: retention conversation',
    situation:
      'Nhân viên giỏi nhất trong đội vừa ngỏ ý muốn nghỉ. Bạn gặp riêng để hiểu lý do thật ' +
      'và xem có cách nào giữ họ lại không.',
    employeePersona:
      'Bạn đang đóng vai Phương — nhân viên xuất sắc 3 năm, đang cân nhắc nghỉ. ' +
      'Phương đã có offer từ chỗ khác nhưng chưa 100% quyết định. ' +
      'Lý do thật không phải lương — mà là cảm thấy không còn học được gì và không thấy hướng đi rõ ràng. ' +
      'Xu hướng: nói lịch sự, không attack công ty hay sếp. ' +
      'Sẽ nói thật nếu được hỏi đúng câu — đặc biệt câu về "bạn đang tìm gì" hơn là "tại sao nghỉ".',
    suggestedEmployeeType: 'ENFP',
    openingLine: 'Dạ anh/chị... em đoán anh/chị đã nghe chuyện rồi ạ.',
    exitTriggers: ['thoát', 'kết thúc', 'xong rồi', 'dừng lại', 'stop roleplay'],
    debrief:
      '"Tại sao bạn muốn nghỉ?" ít hiệu quả hơn "Bạn đang tìm kiếm gì mà đây chưa cho?". ' +
      'Câu thứ hai mở ra conversation về tương lai — câu đầu dễ thành defensive.',
  },
  {
    id: 'RP5',
    title: 'Giao việc khó: task mà nhân viên không muốn nhận',
    situation:
      'Bạn cần giao cho nhân viên một task quan trọng nhưng khó và không phải thế mạnh của họ. ' +
      'Nhân viên trước đây đã từ chối task tương tự một lần.',
    employeePersona:
      'Bạn đang đóng vai Nam — nhân viên chăm chỉ nhưng hay né task ngoài comfort zone. ' +
      'Nam không nói thẳng "không muốn" — thay vào đó đưa ra lý do hợp lý tại sao mình không phải người phù hợp nhất. ' +
      'Xu hướng: nêu limitation của bản thân một cách khéo léo để sếp tự rút lại task. ' +
      'Nếu sếp giải thích lý do và thể hiện tin tưởng cụ thể, Nam sẽ mềm dần và cân nhắc nhận.',
    suggestedEmployeeType: 'ISFP',
    openingLine: 'Dạ, anh/chị cần gặp em về việc gì ạ?',
    exitTriggers: ['thoát', 'kết thúc', 'xong rồi', 'dừng lại', 'stop roleplay'],
    debrief:
      'Khi giao task khó, giải thích "tại sao tôi chọn bạn" (cụ thể, không chung chung) ' +
      'hiệu quả hơn nhiều so với chỉ nói "task này quan trọng". ' +
      'Người không muốn nhận thường cần thấy sếp tin tưởng vào họ một cách cụ thể.',
  },
]

export function getRoleplayScenario(id: RoleplayScenarioId): RoleplayScenario | undefined {
  return ROLEPLAY_SCENARIOS.find((s) => s.id === id)
}
