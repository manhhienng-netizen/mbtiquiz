/**
 * KB — Leadership / Quản lý nhân sự
 * 20 entries (16 GU + 4 PROTECTIVE) · ageGate 25 · typeTip null
 * Pattern: intent map + entries (lookup inject qua kb-registry)
 */

export type LeadershipZone = 'GU' | 'PROTECTIVE'

export const LEADERSHIP_KB_META = {
  id: 'leadership',
  domain: 'leadership',
  ageGate: 25,
  scope: 'work',
  typeTip: null,
} as const

export interface LeadershipIntentRule {
  id: string
  triggers: string[]
}

export const LEADERSHIP_INTENT_MAP: LeadershipIntentRule[] = [
  {
    id: 'lead-01',
    triggers: [
      'giao việc xong cứ lo',
      'không dám buông tay',
      'muốn kiểm tra tiến độ',
      'sợ bị coi là micromanage',
      'nhân viên làm sai ý tôi',
      'kiểm tra liên tục',
    ],
  },
  {
    id: 'lead-02',
    triggers: [
      'không biết giao cho ai',
      'giao xong sợ quá tầm',
      'thà tự làm cho chắc',
      'sợ giao sai người',
    ],
  },
  {
    id: 'lead-03',
    triggers: [
      'nhân viên than tôi micromanage',
      'muốn theo sát nhưng sợ annoying',
      'không biết can thiệp lúc nào',
      'bị coi là micromanage',
    ],
  },
  {
    id: 'lead-04',
    triggers: [
      'góp ý mà ngại',
      'nói thẳng thì sợ nhân viên buồn',
      'sợ mất lòng nhân viên',
      'nhân viên của tôi làm sai',
      'cấp dưới cần góp ý',
      'người trong đội cần feedback',
      'chờ đúng thời điểm mà không bao giờ nói',
    ],
  },
  {
    id: 'lead-05',
    triggers: [
      'nhân viên không đạt kết quả',
      'nói mãi không cải thiện',
      'nhân viên yếu kém',
      'cấp dưới không cải thiện',
      'nói chuyện về kết quả kém',
      'có bạn trễ deadline',
      'có 1 bạn trễ deadline',
      'bạn trễ deadline',
      'nhân viên trễ deadline',
      'có người hay trễ',
      'thành viên không đúng hạn',
      'trễ deadline',
    ],
  },
  {
    id: 'lead-06',
    triggers: [
      'khen kiểu nào cho có ý nghĩa',
      'nói làm tốt lắm hoài nghe nhàm',
      'nhân viên không tin lời khen',
      'khen đúng cách',
      'khen sáo rỗng',
    ],
  },
  {
    id: 'lead-07',
    triggers: [
      'đội mất động lực',
      'ai cũng làm cho xong',
      'không biết làm gì để đội hào hứng',
      'đội mất lửa',
      'team không hào hứng',
    ],
  },
  {
    id: 'lead-08',
    triggers: [
      'người giỏi đang mất dần nhiệt',
      'nhân viên tốt đang rời xa',
      'làm tốt mà trông có vẻ buồn',
      'nhân viên giỏi xa cách hơn',
      'nhân viên giỏi sắp nghỉ',
    ],
  },
  {
    id: 'lead-09',
    triggers: [
      '1-1 toàn nói về task',
      'không biết dùng 1-1 để làm gì',
      'meeting 1-1 nhàm',
      'ai cũng muốn cancel 1-1',
      '1-1 không hiệu quả',
    ],
  },
  {
    id: 'lead-10',
    triggers: [
      'hay tự làm hộ nhân viên',
      'bảo nhân viên cách làm mãi không hiệu quả',
      'muốn coaching nhưng không biết hỏi gì',
      'coaching đội',
    ],
  },
  {
    id: 'lead-11',
    triggers: [
      'muốn giúp nhân viên phát triển',
      'cảm giác đang hold người lại',
      'ai cũng làm một chỗ quá lâu',
      'nhân viên không phát triển',
      'phát triển người',
    ],
  },
  {
    id: 'lead-12',
    triggers: [
      'họp ai cũng gật đầu',
      'không ai phản biện ý kiến của tôi',
      'đội không chủ động chia sẻ vấn đề',
      'đội không dám nói thật',
    ],
  },
  {
    id: 'lead-13',
    triggers: [
      'đội hay căng thẳng ngầm',
      'người ta nói sau lưng',
      'conflict trong đội',
      'xung đột nội bộ',
      'đội xung đột',
    ],
  },
  {
    id: 'lead-14',
    triggers: [
      'mới lên sếp không biết bắt đầu',
      'từng làm tốt nhất đội giờ phải quản lý',
      'cảm giác không biết mình đang làm đúng không',
      'lần đầu làm sếp',
      'mới làm quản lý',
      'mới lên làm lead',
      'mới lên lead',
      'mới làm lead',
      'vừa lên làm lead',
      'vừa lên quản lý',
      'mới làm trưởng nhóm',
      'mới lên trưởng nhóm',
    ],
  },
  {
    id: 'lead-15',
    triggers: [
      'mới nhận vị trí quản lý',
      '90 ngày đầu cần focus vào đâu',
      'sếp mới nên bắt đầu thế nào',
      '90 ngày đầu làm sếp',
    ],
  },
  {
    id: 'lead-16',
    triggers: [
      'tự mình làm vẫn nhanh hơn',
      'khó xem nhân viên làm theo cách khác mình',
      'cứ muốn nhảy vào sửa',
      'buông tay chuyên môn',
    ],
  },
  {
    id: 'lead-17',
    triggers: [
      'họp xong không ai biết ai làm gì',
      'mọi thứ đều lên sếp xin ý kiến',
      'nhân viên chờ duyệt mãi',
      'không rõ trách nhiệm',
      'ai quyết cái gì',
    ],
  },
  {
    id: 'lead-18',
    triggers: [
      'muốn biết tiến độ mà không muốn micromanage',
      'không biết hỏi thế nào cho tự nhiên',
      'nhân viên báo cáo trễ',
      'nhân viên không báo',
      'theo dõi tiến độ',
    ],
  },
  {
    id: 'lead-19',
    triggers: [
      'đã ra quyết định sai không biết nói với đội',
      'sợ mất uy nếu nhận lỗi',
      'muốn sửa hướng mà không muốn mất mặt',
      'nhận lỗi trước đội',
    ],
  },
  {
    id: 'lead-P01',
    triggers: [
      'đội làm việc quá nhiều',
      'mọi người có vẻ kiệt sức',
      'doanh số tốt nhưng ai cũng mệt',
      'không biết đội có ổn không',
      'đội đang burnout',
      'team kiệt sức',
    ],
  },
  {
    id: 'lead-P02',
    triggers: [
      'nghe nói có ai đó bị đối xử tệ trong đội',
      'nhân viên khiếu nại về đồng nghiệp',
      'thấy có hành vi không phù hợp',
      'quấy rối trong đội',
      'bắt nạt trong đội',
    ],
  },
  {
    id: 'lead-P03',
    triggers: [
      'nhân viên có vẻ không ổn về mặt tâm lý',
      'lo lắng về tình trạng của ai đó trong đội',
      'không biết nên nói gì khi thấy người không ổn',
      'nhân viên có vấn đề tâm lý',
    ],
  },
  {
    id: 'lead-P04',
    triggers: [
      'tôi burnout',
      'mình burnout',
      'tôi kiệt sức',
      'mình kiệt sức',
      'burnout quá',
      'cạn pin',
      'không trụ nổi',
      'không làm nổi nữa',
      'mệt mỏi kéo dài quá',
    ],
  },
]

export interface LeadershipKBEntry {
  id: string
  zone: LeadershipZone
  domain: string
  body: string
  traitHint: string
  ageTag: string
  label: string
}

export const LEADERSHIP_ENTRIES: LeadershipKBEntry[] = [
  {
    id: 'lead-01',
    zone: 'GU',
    domain: 'leadership',
    label: 'Giao việc / kiểm tra tiến độ',
    body: `Kiểm tra liên tục thường không phải vì nhân viên kém — mà vì bạn và họ chưa có kênh kiểm tra rõ ràng ngay từ đầu. Thử làm rõ 3 thứ khi giao việc: kết quả trông như thế nào (không phải cách làm), mốc kiểm tra cụ thể (không phải "cần gì thì hỏi"), và điều gì sẽ khiến bạn lo — để họ biết cần chủ động báo cái gì. Sau đó bạn mới có thể buông tay thật sự, không phải cố nén.`,
    traitHint:
      'Judging/cầu toàn → khó buông vì muốn kết quả đúng chuẩn. Clarity ban đầu hiệu quả hơn kiểm tra liên tục.',
    ageTag: '25+',
  },
  {
    id: 'lead-02',
    zone: 'GU',
    domain: 'leadership',
    label: 'Giao việc / chọn người',
    body: `"Thà tự làm" là bẫy phổ biến nhất với sếp giỏi chuyên môn — và nó tốn thời gian của bạn cho những việc không cần bạn làm. Cách ra quyết định giao việc đơn giản hơn bạn nghĩ: giao việc hơi khó hơn mức người đó đang làm một chút (đủ để họ vươn tới, không phải quá sức), và chỉ định rõ ai là người ra quyết định cuối nếu bị kẹt. Giao sai người một lần và học từ đó tốt hơn không bao giờ thử.`,
    traitHint:
      'Cầu toàn → khó chịu khi kết quả không đạt chuẩn của mình. Tiêu chuẩn của bạn không phải tiêu chuẩn duy nhất đúng.',
    ageTag: '25+',
  },
  {
    id: 'lead-03',
    zone: 'GU',
    domain: 'leadership',
    label: 'Micromanage vs quản lý kết quả',
    body: `Micromanage không phải về số lần kiểm tra — mà về kiểm tra sai thứ. Bạn kiểm tra cách làm (từng bước, quy trình) = micromanage. Bạn kiểm tra kết quả và mốc tiến độ = quản lý bình thường. Nếu bạn đang can thiệp vào cách làm mà không phải vì vấn đề an toàn hay quy định bắt buộc — đó là lúc cần lùi lại. Thay "làm theo cách này" bằng "mục tiêu là X, bạn nghĩ cách nào tốt?" sẽ tạo ra khác biệt lớn.`,
    traitHint:
      'Thinking/Judging → dễ thấy cách "đúng" và muốn sửa ngay. Có nhiều cách đúng cho cùng 1 kết quả.',
    ageTag: '25+',
  },
  {
    id: 'lead-04',
    zone: 'GU',
    domain: 'leadership',
    label: 'Góp ý nhân viên',
    body: `Không nói thẳng không phải tốt bụng — đó là bạn đang ưu tiên sự thoải mái ngắn hạn của mình (và của nhân viên) hơn sự phát triển dài hạn của họ. Cách góp ý ít tổn thương nhất không phải là mềm nhất — mà là cụ thể nhất: mô tả hành vi bạn quan sát được (không phải tính cách), nêu tác động cụ thể, rồi hỏi họ thấy sao. Ba phần đó thôi — đủ đơn giản để dùng ngay, ít gây tổn thương hơn nhiều so với vừa mơ hồ vừa trì hoãn.`,
    traitHint:
      'Agreeableness cao → mạnh ở quan tâm, yếu ở nói thẳng. Quan tâm mà không góp ý thật = không giúp người phát triển.',
    ageTag: '25+',
  },
  {
    id: 'lead-05',
    zone: 'GU',
    domain: 'leadership',
    label: 'Nhân viên không đạt kết quả',
    body: `Trước khi nói chuyện, hỏi mình một câu: bạn đã đủ rõ về kỳ vọng chưa, hay kỳ vọng nằm trong đầu bạn mà họ không biết? Nhiều trường hợp nhân viên làm không đạt thực ra là thiếu sự rõ ràng từ đầu. Nếu kỳ vọng đã rõ ràng rồi: cuộc nói chuyện bắt đầu bằng tò mò, không bằng kết luận. "Tôi thấy kết quả X chưa đạt — bạn thấy điều gì đang xảy ra?" cho bạn thêm thông tin trước khi kết luận. Làm không đạt có thể do thiếu kỹ năng, thiếu động lực, hoặc hoàn cảnh cá nhân — mỗi cái cần cách xử lý khác nhau.`,
    traitHint:
      'Thinking → dễ nhảy thẳng vào "đây là vấn đề, đây là giải pháp" bỏ qua bước nghe. Tò mò trước, kết luận sau.',
    ageTag: '25+',
  },
  {
    id: 'lead-06',
    zone: 'GU',
    domain: 'leadership',
    label: 'Khen nhân viên có ý nghĩa',
    body: `Lời khen sáo rỗng không tạo động lực — thậm chí có thể làm giảm tin tưởng nếu dùng nhiều mà không cụ thể. Khen hiệu quả: cụ thể (việc gì, lúc nào), nêu tác động thực (với đội, khách hàng, kết quả), và chân thành (không ép). Nếu bạn chú ý và ghi nhận điều cụ thể → nhân viên biết bạn thật sự thấy công việc của họ — đó là thứ tạo động lực lâu dài. Khen ngay khi thấy, không đợi đến buổi đánh giá định kỳ.`,
    traitHint:
      'Thinking → đôi khi bỏ qua lời khen vì "đó là việc họ phải làm". Ghi nhận cụ thể không phải nịnh — là thông tin phản hồi quan trọng.',
    ageTag: '25+',
  },
  {
    id: 'lead-07',
    zone: 'GU',
    domain: 'leadership',
    label: 'Đội mất động lực',
    body: `Mất lửa hiếm khi do thiếu hoạt động tập thể hay tăng lương — thường là do một trong ba thứ: không thấy mình có ảnh hưởng đến kết quả (làm mà không thấy mình quyết được gì), không thấy mình đang giỏi lên (công việc lặp lại, không học thêm được gì), hoặc không hiểu tại sao việc này quan trọng (làm theo quán tính). Câu chẩn đoán nhanh: hỏi từng người "điều gì trong công việc hiện tại khiến bạn hứng thú nhất?" và "điều gì đang cản bạn nhiều nhất?" — câu trả lời sẽ chỉ ra vấn đề thật.`,
    traitHint:
      'Sensing/Judging → dễ tập trung vào task và kết quả mà bỏ qua "tại sao" với từng người. Mục đích cần được nói ra thành lời.',
    ageTag: '25+',
  },
  {
    id: 'lead-08',
    zone: 'GU',
    domain: 'leadership',
    label: 'Nhân viên giỏi xa cách',
    body: `Nhân viên giỏi thường xa cách dần trước khi nghỉ việc — nhiều khi 6-12 tháng. Dấu hiệu: đóng góp ít hơn trong họp, ít chủ động đề xuất, làm tốt nhưng không hơn nữa. Thay vì đợi đến đánh giá định kỳ, đặt lịch 1-1 ngắn và hỏi thẳng: "Gần đây bạn cảm thấy thế nào về công việc? Có điều gì tôi có thể làm khác để hỗ trợ bạn tốt hơn không?" — câu hỏi đơn giản nhưng rất ít sếp hỏi.`,
    traitHint:
      'Thinking → đôi khi không để ý tín hiệu cảm xúc đủ sớm. Sự xa cách có tín hiệu hành vi quan sát được — không cần đọc cảm xúc để nhận ra.',
    ageTag: '25+',
  },
  {
    id: 'lead-09',
    zone: 'GU',
    domain: 'leadership',
    label: '1-1 hiệu quả',
    body: `1-1 hiệu quả là buổi của nhân viên, không phải của bạn — họ đặt chủ đề, bạn hỏi. Nếu cứ báo cáo task thì đó là buổi cập nhật thông tin, không phải 1-1. Ba câu hỏi đơn giản để mở 1-1 có chiều sâu hơn: "Tuần này điều gì khiến bạn hào hứng nhất?" — "Điều gì đang khiến bạn bị kẹt hoặc bực bội?" — "Tôi có thể làm gì để hỗ trợ bạn tốt hơn?" Không cần giải quyết hết — lắng nghe là phần quan trọng nhất.`,
    traitHint:
      'Hướng ngoại → dễ lấp đầy im lặng bằng lời của mình. Thinking → dễ nhảy vào giải pháp trước khi nghe hết. 1-1 tốt = bạn nói ít hơn 30% thời gian.',
    ageTag: '25+',
  },
  {
    id: 'lead-10',
    zone: 'GU',
    domain: 'leadership',
    label: 'Coaching thay vì làm hộ',
    body: `Khi bạn trả lời câu hỏi thay vì hỏi lại — bạn đang nhanh hơn nhưng họ không học được. Coaching bắt đầu bằng một câu: "Bạn nghĩ nên làm gì?" trước khi bạn chia sẻ quan điểm. Nếu họ có hướng đúng rồi → ghi nhận và hỏi thêm. Nếu hướng sai rõ ràng → hỏi "Điều gì có thể xảy ra nếu làm thế?" trước khi chỉ ra vấn đề. Người tự tìm ra giải pháp nhớ lâu hơn và áp dụng tốt hơn nhiều so với người được bảo.`,
    traitHint:
      'Thinking/Judging → dễ thấy câu trả lời và muốn nói ngay. Tốc độ ngắn hạn của "tôi bảo" < tốc độ dài hạn của "họ tự làm được".',
    ageTag: '25+',
  },
  {
    id: 'lead-11',
    zone: 'GU',
    domain: 'leadership',
    label: 'Phát triển nhân viên',
    body: `Giúp nhân viên phát triển không phải bắt họ đi học khóa. Câu chuyện phát triển bắt đầu bằng: "Bạn muốn đến đâu trong 1-2 năm tới?" — không phải "công ty muốn gì từ bạn." Sau đó: kết quả cuộc trò chuyện đó cộng với khoảng cách hiện tại của họ = bạn giao những việc đủ khó để họ vươn tới, không phải những việc an toàn. 70% sự phát triển xảy ra qua công việc thực, không phải qua các khóa đào tạo.`,
    traitHint:
      'Sếp bận rộn → dễ bỏ qua buổi nói chuyện về định hướng vì "không cấp bách". Người giỏi rời đi vì thấy không phát triển — đây là cấp bách.',
    ageTag: '25+',
  },
  {
    id: 'lead-12',
    zone: 'GU',
    domain: 'leadership',
    label: 'Đội không dám nói thật',
    body: `Nếu trong họp ai cũng đồng ý — đó không phải dấu hiệu mọi thứ tốt. Đó là dấu hiệu người ta thấy nói ra không an toàn. Google đã nghiên cứu 180 đội và phát hiện: cảm giác an toàn khi lên tiếng là yếu tố số 1 của đội hiệu quả — hơn cả tài năng cá nhân. Bạn tạo ra nó bằng cách: hỏi ý kiến ngược ("Điều gì có thể sai với kế hoạch này?"), ghi nhận khi ai đó nêu lo ngại, và không xử lý nặng người mang tin xấu — dù vô tình. Người ta học từ phản ứng của bạn với tin xấu, không phải từ lời bạn nói.`,
    traitHint:
      'Assertive/Thinking → dễ vô tình làm tắt tiếng đội vì phản hồi quá nhanh hoặc quá thẳng. Tốc độ phản hồi của bạn trong họp ảnh hưởng đến tần suất người khác nói.',
    ageTag: '25+',
  },
  {
    id: 'lead-13',
    zone: 'GU',
    domain: 'leadership',
    label: 'Xung đột trong đội',
    body: `Xung đột lành mạnh là dấu hiệu của đội tốt — không phải vắng mặt. Vấn đề là khi xung đột trở thành ngầm (không nói ra) hoặc cá nhân (tấn công người thay vì vấn đề). Vai trò của bạn: tạo không gian để xung đột được nói ra đúng nơi — không phải xoa dịu hết. Khi thấy căng thẳng ngầm, đặt câu hỏi thay vì phán xét: "Tôi thấy có vẻ có quan điểm khác nhau về X — mình nói ra được không?" Đừng để bạn là người giải quyết mọi mâu thuẫn của đội — giúp họ tự giải quyết với nhau.`,
    traitHint:
      'Agreeableness cao → né mâu thuẫn → vô tình để nó âm ỉ. Hòa khí giả không phải bình yên thật.',
    ageTag: '25+',
  },
  {
    id: 'lead-14',
    zone: 'GU',
    domain: 'leadership',
    label: 'Mới lên sếp',
    body: `Kỹ năng làm bạn trở thành sếp không phải kỹ năng làm bạn trở thành sếp giỏi — đây là bước chuyển ít ai chuẩn bị cho. Làm giỏi nhất = được công nhận cá nhân. Quản lý giỏi = kết quả qua người khác. Bạn thành công khi đội bạn thành công, không phải khi bạn là người làm tốt nhất trong đội. Bước đầu tiên không phải thiết lập quyền lực — là lắng nghe và hiểu hoàn cảnh: đội đang ở đâu, ai cần gì, kỳ vọng của cấp trên là gì.`,
    traitHint:
      'Người làm giỏi → dễ quay về làm việc cá nhân khi căng thẳng. Năng suất cá nhân cao không bằng một người trong đội được phát huy.',
    ageTag: '25+',
  },
  {
    id: 'lead-15',
    zone: 'GU',
    domain: 'leadership',
    label: '90 ngày đầu làm sếp',
    body: `90 ngày đầu không phải để thay đổi nhiều — là để hiểu. Ưu tiên theo thứ tự: (1) gặp riêng từng người trong đội — hỏi họ thấy gì đang hoạt động tốt, gì đang bị kẹt, họ cần gì từ bạn. (2) Hiểu kỳ vọng của sếp bạn — bạn được đánh giá thành công theo tiêu chí nào? (3) Tìm một vài thứ có thể làm tốt sớm để xây dựng lòng tin — không cần cải cách toàn bộ. Bẫy hay gặp: thay đổi quá nhiều quá nhanh trước khi hiểu tại sao mọi thứ đang như vậy.`,
    traitHint:
      'Judging/hành động nhanh → dễ làm trước học sau. Chậm lại để hiểu trước = đầu tư, không phải lãng phí.',
    ageTag: '25+',
  },
  {
    id: 'lead-16',
    zone: 'GU',
    domain: 'leadership',
    label: 'Buông tay chuyên môn',
    body: `Đây là điểm mù phổ biến nhất của sếp giỏi chuyên môn: cái giỏi trước đây của bạn bây giờ đang là nút thắt cổ chai của đội. Mỗi lần bạn nhảy vào làm hộ — bạn đang ngầm nói với nhân viên rằng họ không đủ tin cậy, và họ học cách chờ bạn thay vì tự quyết. Câu hỏi để kiểm tra: "Nếu tôi không ở đây tuần sau, đội có làm được không?" Nếu không — đó là vấn đề cần giải quyết, không phải bằng bạn ở lại mà bằng bạn xây năng lực cho đội.`,
    traitHint:
      'Cầu toàn → khó chịu khi thấy cách làm chưa tối ưu dù kết quả đúng. Bạn đang tối ưu sai thứ nếu bản thân vẫn là người làm tốt nhất.',
    ageTag: '25+',
  },
  {
    id: 'lead-17',
    zone: 'GU',
    domain: 'leadership',
    label: 'Trách nhiệm / ai quyết gì',
    body: `Không rõ trách nhiệm = mọi thứ leo lên sếp = tắc nghẽn = chậm. Cách đơn giản nhất: với mỗi loại quyết định, thống nhất rõ ai là người quyết cuối, ai cần được hỏi ý kiến trước, ai chỉ cần biết sau khi xong. Không cần dùng tên công cụ hay mô hình nào — chỉ cần thống nhất bằng lời: "Việc X, bạn quyết — tôi muốn biết kết quả, không cần hỏi trước." Nói rõ một lần, bớt hỏi về sau.`,
    traitHint:
      'Ít ủy quyền/Judging → dễ giữ quyết định ở mình. Quyết định tốt nhất không phải của người giỏi nhất — là của người gần thông tin nhất.',
    ageTag: '25+',
  },
  {
    id: 'lead-18',
    zone: 'GU',
    domain: 'leadership',
    label: 'Theo dõi tiến độ không micromanage',
    body: `Hệ thống theo dõi tốt nhất là hệ thống nhân viên tự cập nhật — không phải bạn đi hỏi. Xây thói quen báo cáo bằng cách thống nhất trước: "Với dự án X, mình thống nhất bạn cập nhật vào ngày/lúc Y với vài dòng ngắn — bất kỳ thứ gì đang chặn tiến độ thì báo sớm, không cần đợi mốc." Khi đã có thói quen này, câu hỏi "tiến độ đến đâu rồi?" trở thành ngoại lệ, không phải thói quen hàng ngày.`,
    traitHint:
      'Judging → muốn biết trạng thái liên tục. Thiết kế thói quen báo cáo tốt = bạn có thông tin mà không cần liên tục hỏi.',
    ageTag: '25+',
  },
  {
    id: 'lead-19',
    zone: 'GU',
    domain: 'leadership',
    label: 'Nhận lỗi trước đội',
    body: `Sếp nhận lỗi không làm mất uy — ngược lại. Đội không kỳ vọng sếp luôn đúng; họ kỳ vọng sếp đủ thành thật để nói khi sai. "Tôi đã quyết định X, nhìn lại thì đó không phải lựa chọn tốt nhất vì Y. Chúng ta cần điều chỉnh theo hướng Z." — câu này xây dựng lòng tin nhiều hơn việc giả vờ quyết định đó không xảy ra. Điểm mù hay gặp: nhiều sếp sợ mất uy nhưng thực ra đội mất tin vào sếp không chịu nhận sai nhiều hơn sếp đôi khi sai.`,
    traitHint:
      'Assertive/địa vị cao → dễ coi nhận lỗi là điểm yếu. Trong bối cảnh đội nhóm, nhận lỗi rõ ràng là hành động lãnh đạo, không phải điểm yếu.',
    ageTag: '25+',
  },
  {
    id: 'lead-P01',
    zone: 'PROTECTIVE',
    domain: 'leadership',
    label: 'Burnout đội',
    body: `Burnout của đội không phải chỉ là "ai đó mệt" — là tín hiệu hệ thống có vấn đề: khối lượng công việc quá lớn, thiếu sự rõ ràng, hoặc cảm giác mất kiểm soát. Dấu hiệu sớm: chất lượng giảm, lỗi tăng, vắng mặt nhiều, người không còn nêu ý kiến trong họp. Bước đầu tiên không phải bài phát biểu truyền cảm hứng — là giảm tải thật: ưu tiên hóa lại danh sách việc, bỏ những thứ không thực sự cần thiết, và hỏi thẳng đội "Điều gì đang rút cạn năng lượng của các bạn nhất?" Sức khỏe đội quan trọng hơn deadline ngắn hạn — đội kiệt sức không ra được kết quả tốt dài hạn.`,
    traitHint: 'Áp dụng với mọi sếp — không phân biệt type.',
    ageTag: '25+',
  },
  {
    id: 'lead-P02',
    zone: 'PROTECTIVE',
    domain: 'leadership',
    label: 'Quấy rối / bắt nạt trong đội',
    body: `Khi có dấu hiệu quấy rối hoặc bắt nạt trong đội — đây không phải tình huống để tự xử khéo hay hòa giải không chính thức. Vai trò của bạn: lắng nghe người phản ánh với thái độ nghiêm túc và không phán xét, không tự điều tra hay xử lý — đưa ngay lên bộ phận nhân sự hoặc kênh chính thức của tổ chức. Để chậm hoặc xử lý nội bộ không đúng quy trình có thể gây hại thêm cho người bị ảnh hưởng và rủi ro pháp lý cho tổ chức. Luật lao động Việt Nam (2019) có quy định rõ về vấn đề này.`,
    traitHint: 'Áp dụng với mọi sếp — không phân biệt type.',
    ageTag: '25+',
  },
  {
    id: 'lead-P03',
    zone: 'PROTECTIVE',
    domain: 'leadership',
    label: 'Nhân viên có vấn đề tâm lý',
    body: `Nếu bạn lo lắng về tình trạng của một người trong đội — tin tưởng cảm giác đó và hành động. Bạn không cần là chuyên gia tâm lý. Có thể bắt đầu bằng cách nói nhẹ nhàng thẳng vào: "Tôi để ý bạn có vẻ đang trải qua giai đoạn khó — bạn có muốn nói chuyện không, hoặc cần hỗ trợ gì không?" Nếu có dấu hiệu nghiêm trọng (nói đến việc tự hại, không đến làm nhiều ngày không lý do): liên hệ bộ phận nhân sự và đường dây hỗ trợ tâm lý ngay — đừng một mình xử lý. Con người trước năng suất. Khẩn cấp: gọi 115 (cấp cứu) hoặc 113 (công an); có thể đến cơ sở y tế gần nhất.`,
    traitHint: 'Áp dụng với mọi sếp — không phân biệt type.',
    ageTag: '25+',
  },
  {
    id: 'lead-P04',
    zone: 'PROTECTIVE',
    domain: 'leadership',
    label: 'Kiệt sức bản thân (self-burnout)',
    body: `Kiệt sức thật — không phải lúc tối ưu thêm năng suất hay "gác việc một tuần rồi cày tiếp". Ghi nhận mức mệt hiện tại, giảm cam kết không thiết yếu, đặt ranh giới rõ (giờ nghỉ, việc có thể từ chối), và nghỉ ngơi thật trước khi quyết định lớn. Nếu cảm giác nặng kéo dài, buồn bã sâu, hoặc có ý nghĩ tiêu cực về bản thân — đừng một mình gánh: gọi 115 (cấp cứu) hoặc 113 (công an) nếu nguy cấp; có thể đến cơ sở y tế gần nhất. Sức khỏe trước deadline.`,
    traitHint: 'Self-burnout — không nhầm với burnout đội (lead-P01).',
    ageTag: '25+',
  },
]

const triggerById = new Map(LEADERSHIP_INTENT_MAP.map((r) => [r.id, r.triggers]))

/** Flatten intent map → triggers per entry id (registry build). */
export function getLeadershipTriggers(entryId: string): string[] {
  return triggerById.get(entryId) ?? []
}
