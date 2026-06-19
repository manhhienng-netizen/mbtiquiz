// src/data/manager-case-studies.ts
// Case Study Batch C — 20 cases · 5 situations × 4 type-pairs
// Tạo: 12/06/2026 · B2B PM

export type SituationId = 'S1' | 'S2' | 'S4' | 'S5' | 'S8'
export type CasePairId = 'A' | 'B' | 'C' | 'D'

export interface CaseStudy {
  id: string           // 'C01'–'C20'
  situation: SituationId
  pair: CasePairId
  managerType: string  // 'ESTJ'
  employeeType: string // 'ENFP'
  title: string        // label ngắn cho UI
  context: string
  whatHappened: string
  outcome: string
  lessons: string[]    // 2 gạch
  selfCheck: string    // câu "Tự hỏi"
}

export const CASE_STUDIES: CaseStudy[] = [
  // ── S1 FEEDBACK KHÓ ──────────────────────────────────────────
  {
    id: 'C01',
    situation: 'S1',
    pair: 'A',
    managerType: 'ESTJ',
    employeeType: 'ENFP',
    title: 'Sửa brief nhưng mất sáng tạo',
    context: 'Tuấn (ESTJ) là trưởng phòng marketing của công ty FMCG 35 người ở Hà Nội. Phương (ENFP) — copywriter 2 năm trong đội — nộp brief liên tục thiếu data, viết đẹp nhưng không gắn với insight. Tuấn đã nhắc qua email 2 lần, Phương trả lời "dạ anh" nhưng lần sau vẫn vậy.',
    whatHappened: 'Tuấn gọi Phương vào, đặt brief trước mặt và chỉ từng điểm thiếu. Nói thẳng: "Brief này không đạt yêu cầu — em cần làm lại." Phương gật đầu, đi ra, im lặng cả tuần. Brief sau nộp đúng format nhưng mất đi sự sáng tạo.',
    outcome: 'Phương bắt đầu làm đúng checklist nhưng không còn pitch ý tưởng mới. Khi Tuấn hỏi riêng sau đó, Phương nói: "Em tưởng anh không thích cách em làm nên em làm theo đúng format thôi." Tuấn mới hiểu — mình đã sửa biểu hiện nhưng phá mất thứ quý hơn.',
    lessons: [
      'ENFP tiếp nhận phản hồi như tín hiệu về toàn bộ cách tiếp cận của họ, không chỉ về việc cụ thể. Phản hồi "brief không đạt" với ENFP có thể được nghe là "cách em làm không được." Cần tách rõ: "Sáng tạo của em tốt, phần thiếu là số liệu làm căn cứ."',
      'Ở VN, phản hồi trực tiếp từ sếp thường được nhân viên đọc nặng hơn ý định — đặc biệt khi chưa có nền quan hệ đủ mạnh. Phương không phòng thủ, Phương tự điều chỉnh hoàn toàn — và mất đi điểm mạnh nhất của mình.',
    ],
    selfCheck: 'Sau lần bạn đưa phản hồi thẳng gần nhất, nhân viên đó có ít sáng tạo hoặc ít chủ động hơn không?',
  },
  {
    id: 'C02',
    situation: 'S1',
    pair: 'B',
    managerType: 'ENTJ',
    employeeType: 'INFP',
    title: 'Bắt buộc deadline khi nhân viên không hiểu lý do',
    context: 'Hoa (ENTJ) là founder của studio thiết kế 18 người ở HCM. Minh (INFP) — senior designer — nộp revision chậm liên tục, luôn có lý do hợp lý nhưng deadline vẫn trễ. Hoa đã nói trong họp nhóm: "Tất cả mọi người cần giữ deadline — đây là vấn đề của cả đội."',
    whatHappened: 'Sau khi cả đội được nhắc, Minh vẫn trễ tiếp. Hoa gọi riêng và nói rõ: "Đây là lần thứ ba trong tháng. Nếu tiếp tục, mình phải xem lại vai trò của Minh trong đội." Minh im lặng, về chỗ, và hôm sau xin gặp riêng.',
    outcome: 'Trong buổi gặp đó, Minh nói điều Hoa không ngờ: "Em không biết tại sao deadline quan trọng hơn chất lượng. Nếu em nộp đúng giờ mà xấu thì có ý nghĩa không?" Hoa nhận ra mình chưa bao giờ giải thích tại sao deadline quan trọng với khách hàng cụ thể này. Sau khi Hoa giải thích context, Minh thay đổi ngay.',
    lessons: [
      'INFP không chống đối deadline — họ chống đối thứ cảm thấy vô nghĩa. Khi biết lý do thật (khách hàng launch event cụ thể, hậu quả thật nếu trễ), INFP thường tuân thủ tốt hơn người nghĩ. Vấn đề không phải kỷ luật mà là context bị thiếu.',
      'ENTJ hay cho rằng nhân viên hiểu "tại sao" mà không giải thích. Ở VN, nhân viên nhiều khi không hỏi ngược lại vì sợ bị coi là chống đối sếp. Kết quả: họ không làm mà không ai biết lý do thật.',
    ],
    selfCheck: 'Có yêu cầu nào bạn đang áp đặt mà bạn chưa giải thích lý do thật với nhân viên không?',
  },
  {
    id: 'C03',
    situation: 'S1',
    pair: 'C',
    managerType: 'INTJ',
    employeeType: 'ESFJ',
    title: 'Email kỹ thuật chuẩn nhưng đội mất không khí',
    context: 'Hùng (INTJ) là CTO của startup fintech 30 người Hà Nội. Lan (ESFJ) — project coordinator — thường bỏ sót chi tiết kỹ thuật trong bản tóm tắt họp, nhưng không ai nói vì Lan rất cẩn thận về mọi thứ khác và là người giữ tinh thần đội.',
    whatHappened: 'Hùng gửi email sau một buổi họp: "Lan ơi, bản tóm tắt hôm nay thiếu 3 điểm kỹ thuật quan trọng — mình forward lại để bạn update." Không giải thích thêm. Lan reply "dạ anh" và update ngay. Nhưng hôm sau Lan ít nói trong họp hơn hẳn.',
    outcome: 'Hai tuần sau, một người trong đội nhắn Hùng: "Lan có vẻ buồn gần đây — anh có biết chuyện gì không?" Hùng mới hiểu email ngắn gọn của mình bị đọc là "sếp không hài lòng với mình." Lan không nói gì vì sợ làm Hùng thêm phiền.',
    lessons: [
      'ESFJ không chỉ tiếp nhận nội dung phản hồi — họ tiếp nhận tone và tín hiệu quan hệ trong đó. Email kỹ thuật ngắn của Hùng chuẩn về nội dung nhưng thiếu một câu ghi nhận nỗ lực của Lan. Câu đó quan trọng hơn toàn bộ list kỹ thuật.',
      'VN context: ESFJ nhân viên thường không nói khi bị ảnh hưởng — nhưng mood thay đổi và cả đội cảm nhận được. "Kim chỉ nam không khí đội" bị tắt là tín hiệu mạnh.',
    ],
    selfCheck: 'Phản hồi bạn gửi gần nhất — bạn có thêm vào một câu ghi nhận nỗ lực trước khi chỉ ra lỗi không?',
  },
  {
    id: 'C04',
    situation: 'S1',
    pair: 'D',
    managerType: 'ENFJ',
    employeeType: 'ISTJ',
    title: 'Ba buổi 1:1 ấm áp không thay đổi được hành vi',
    context: 'Linh (ENFJ) là head of operations của công ty logistics 45 người HCM. Tuấn (ISTJ) — warehouse lead 4 năm — hay làm đúng quy trình cũ ngay cả khi quy trình mới đã được thông báo. Không phải không biết, mà vì chưa thấy quy trình mới được chứng minh là tốt hơn.',
    whatHappened: 'Linh tổ chức 1:1 ấm áp, bắt đầu bằng cảm ơn đóng góp của Tuấn, rồi nêu vấn đề theo kiểu "mình hiểu Tuấn có lý do" và kết thúc bằng "mình muốn nghe Tuấn nghĩ sao." Tuấn gật đầu lịch sự, đi ra, và tiếp tục làm theo quy trình cũ.',
    outcome: 'Linh tổ chức thêm 2 buổi nữa tương tự — vẫn không thay đổi. Cuối cùng đồng nghiệp khuyên Linh thử cách khác: gửi email với so sánh cụ thể giữa 2 quy trình, data rõ ràng, và deadline bắt đầu áp dụng. Tuấn áp dụng ngay từ tuần sau.',
    lessons: [
      'ISTJ không bị thuyết phục bởi cuộc trò chuyện ấm áp — họ bị thuyết phục bởi bằng chứng. Linh cần trao cho Tuấn lý do kỹ thuật để switch, không phải cơ hội được lắng nghe. Câu hỏi "bạn nghĩ sao?" với ISTJ đôi khi là câu hỏi sai.',
      'ENFJ thường dùng trò chuyện thấu cảm như công cụ quen dùng — hiệu quả với nhiều type nhưng không phải tất cả. Ở VN, ISTJ nhân viên đặc biệt tôn trọng cách tiếp cận có data hơn cách tiếp cận có cảm xúc.',
    ],
    selfCheck: 'Có nhân viên nào bạn đã nói chuyện nhiều lần mà vẫn không thay đổi — có thể họ cần data thay vì đối thoại không?',
  },

  // ── S2 ĐỘNG LỰC THẤP ─────────────────────────────────────────
  {
    id: 'C05',
    situation: 'S2',
    pair: 'A',
    managerType: 'ESTJ',
    employeeType: 'ENFP',
    title: 'KPI vẫn đạt nhưng đang phỏng vấn chỗ khác',
    context: 'Hùng (ESTJ) là giám đốc kinh doanh của startup SaaS 28 người Hà Nội. Phương (ENFP) — account manager top — 3 tháng nay KPI vẫn đạt nhưng không còn pitch ý tưởng mới, không còn hỏi về product roadmap, và hay về sớm hơn trước.',
    whatHappened: 'Hùng tổ chức họp đội và nói: "Chúng ta cần giữ nhịp — mọi người cần nỗ lực hơn." Phương gật đầu nhưng ra về. Tuần sau Hùng gặp riêng và hỏi về số — Phương nói số vẫn ổn và cười. Hùng không biết vấn đề ở đâu.',
    outcome: 'Một đồng nghiệp của Phương nhắn Hùng: "Phương đang phỏng vấn chỗ khác." Hùng gặp Phương ngay và lần này hỏi khác: "Gần đây bạn đang thấy phần nào của việc này còn có ý nghĩa không?" Phương im lặng lâu rồi nói: "Thật ra em không còn thấy mình đang học được gì nữa." Sau cuộc trò chuyện đó, Hùng giao cho Phương dẫn dắt một dự án thí điểm mới — thứ chưa ai làm. Phương ở lại thêm 8 tháng và thí điểm đó thành sản phẩm chính.',
    lessons: [
      'ENFP mất động lực khi hết tính mới và học hỏi — không phải khi hết thưởng. KPI vẫn đạt nhưng đang làm tối thiểu. Câu hỏi cần hỏi sớm hơn: "Bạn đang học được gì?" không phải "Bạn đang đạt được gì?"',
      'VN SMB: nhân viên thường không nói thẳng "em chán rồi" — họ dần dần rút lui. "Về sớm hơn" và "ít hỏi về công ty hơn" là tín hiệu mạnh, không phải lười biếng.',
    ],
    selfCheck: 'Ai trong đội bạn đang "đạt KPI nhưng rút lui" mà bạn chưa hỏi về học hỏi và phát triển của họ?',
  },
  {
    id: 'C06',
    situation: 'S2',
    pair: 'B',
    managerType: 'ENTJ',
    employeeType: 'INFP',
    title: 'Bài đúng format nhưng không ai nhớ được gì',
    context: 'Nam (ENTJ) là founder của agency content 22 người HCM. Lan (INFP) — content lead — 3 năm gắn bó, từng viết những bài viral nhất của agency, nhưng 2 tháng nay bài nộp đúng hạn, đúng format, nhưng không có gì đặc biệt. Đọc xong thấy ổn nhưng không nhớ được gì.',
    whatHappened: 'Nam đánh giá bài và comment chi tiết: "Phần 2 cần mạnh hơn, phần 3 dùng data để làm căn cứ." Lan sửa theo đúng comment. Lần sau vẫn vậy — đúng, nhưng phẳng.',
    outcome: 'Nam hỏi thẳng: "Gần đây Lan đang viết cho ai — có kết nối với người đọc không?" Lan trả lời: "Em không biết người đọc là ai nữa — brief chỉ có KPI, không có người thật." Nam nhận ra agency đã mở rộng quy mô đến mức brief trở thành bảng tính, không còn câu chuyện. Lan không thiếu kỹ năng — thiếu người để viết cho.',
    lessons: [
      'INFP mất tinh thần sáng tạo khi mất kết nối với người thật đằng sau công việc. "Viết đủ giỏi" không thay thế được "biết mình đang giúp ai." Khi brief trở thành checklist, INFP đang thực thi chứ không còn sáng tạo.',
      'Mở rộng quy mô là thứ giết sáng tạo trong VN SMB mà không ai để ý. Quy trình tốt hơn nhưng linh hồn công việc biến đâu mất — và người nhạy cảm với điều đó nhất thường là INFP/ISFP.',
    ],
    selfCheck: 'Quy trình trong công ty bạn đang serve KPI hay đang serve người thật — nhân viên có biết họ đang giúp ai không?',
  },
  {
    id: 'C07',
    situation: 'S2',
    pair: 'C',
    managerType: 'INTJ',
    employeeType: 'ESFJ',
    title: 'Người giữ đội gắn kết rút lui im lặng',
    context: 'Hùng (INTJ) là technical lead của công ty phần mềm 35 người Hà Nội. Hoa (ESFJ) — QA lead — luôn là người giữ đội gắn kết, hay tổ chức ăn trưa nhóm và nhớ sinh nhật mọi người. Gần đây Hoa bắt đầu ít tổ chức những thứ đó, đến làm đúng giờ về đúng giờ, và không còn hỏi thăm đồng nghiệp như trước.',
    whatHappened: 'Hùng không để ý — công việc của Hoa vẫn tốt, bug report vẫn chính xác. Một tháng sau, đồng nghiệp nói với Hùng: "Không khí trong đội khác rồi anh ơi."',
    outcome: 'Hùng gặp Hoa và hỏi thẳng: "Mình thấy bạn ít tương tác với đội hơn trước — bạn đang ổn không?" Hoa nói: "Em không biết mình còn được cần ở đây không nữa — công việc nào mình làm sếp cũng không nói gì." Không phải Hoa muốn khen nhiều — Hoa cần biết việc mình làm có giá trị.',
    lessons: [
      'ESFJ mất động lực khi công việc vô hình không được ghi nhận. Hùng không chỉ trích Hoa — nhưng cũng không để ý. Với ESFJ, không có phản hồi cũng giống như phản hồi tiêu cực: "Chắc mình không được cần."',
      'VN: "Kim chỉ nam không khí đội" bị tắt là tín hiệu nghiêm trọng. Khi người giữ không khí gắn kết của đội rút lui, đội mất đi thứ không đo được bằng KPI nhưng ảnh hưởng đến mọi thứ.',
    ],
    selfCheck: 'Ai trong đội bạn đang làm những việc vô hình giữ đội gắn kết — và bạn đã nói với họ điều đó có giá trị không?',
  },
  {
    id: 'C08',
    situation: 'S2',
    pair: 'D',
    managerType: 'ENFJ',
    employeeType: 'ISTJ',
    title: 'Hoạt động gắn kết đội không sửa được mất định hướng',
    context: 'Linh (ENFJ) là head of HR của tập đoàn bán lẻ 80 người HCM. Tuấn (ISTJ) — compliance specialist 6 năm — gần đây làm đúng yêu cầu nhưng không còn chủ động phát hiện vấn đề như trước, và thường xuyên hỏi "em làm đúng chưa?" thay vì tự quyết.',
    whatHappened: 'Linh tổ chức hoạt động gắn kết đội và nói: "Mình cần mọi người có động lực hơn!" Tuấn tham gia, ăn sáng vui vẻ, về chỗ và tiếp tục làm như cũ.',
    outcome: 'Linh gặp Tuấn riêng và hỏi: "Bạn thấy công việc đang rõ ràng không — hay có gì đang chưa chắc chắn?" Tuấn mới nói thẳng: "Công ty thay đổi quy định 3 lần trong 2 tháng — em không biết phiên bản nào đang áp dụng nên chỉ dám hỏi thay vì tự quyết." Linh mới hiểu: Tuấn không mất động lực — Tuấn đang mất định hướng.',
    lessons: [
      'ISTJ mất chủ động khi môi trường mất nhất quán, không phải khi thiếu động lực. Hoạt động gắn kết đội không sửa hướng đi lệch. Cần: quản lý phiên bản rõ ràng và truyền đạt về thay đổi.',
      'Ở VN SMB, thay đổi quy trình thường được thông báo qua Zalo group nhưng không có bàn giao rõ ràng từ phiên bản cũ sang mới. ISTJ đặc biệt bị ảnh hưởng vì họ dựa vào sự rõ ràng để vận hành.',
    ],
    selfCheck: 'Có nhân viên nào đang "chỉ hỏi thay vì tự quyết" mà thực ra họ đang thiếu sự rõ ràng, không phải thiếu tự tin?',
  },

  // ── S4 MISS KỲ VỌNG ──────────────────────────────────────────
  {
    id: 'C09',
    situation: 'S4',
    pair: 'A',
    managerType: 'ESTJ',
    employeeType: 'ENFP',
    title: 'Trễ deadline vì cầu toàn, không phải lười',
    context: 'Hùng (ESTJ) là giám đốc của agency 40 người Hà Nội. Phương (ENFP) — project manager — liên tục trễ deadline bàn giao tài liệu cho khách hàng: tuần này 1 ngày, tuần sau 2 ngày. Dự án vẫn chạy nhưng khách hàng đã nhắc đến 1 lần.',
    whatHappened: 'Hùng nhắc trong họp đội: "Deadline bàn giao là cam kết với khách hàng — không phải tùy chọn." Nhìn vào Phương khi nói. Phương gật đầu, mặt đỏ, đồng nghiệp nhìn sang. Tuần sau Phương vẫn trễ.',
    outcome: 'Hùng gặp riêng và hỏi: "Bạn đang gặp vướng mắc gì ở bước bàn giao?" Phương nói: "Thật ra em thường xong nội dung rồi nhưng hay bổ sung thêm — cảm thấy chưa đủ tốt." Hùng mới hiểu: vấn đề không phải chậm mà là cầu toàn. Hai người thống nhất: nộp đúng hạn 80% còn hơn nộp trễ 100%.',
    lessons: [
      'ENFP đôi khi trễ deadline không vì chậm mà vì tiếp tục thêm — muốn phiên bản tốt nhất. "Sao trễ?" là câu hỏi sai. "Đang kẹt ở đâu?" và "80% đúng hạn có được không?" mới giải quyết được.',
      'Nhắc nhở trong họp nhóm với ENFP có thể gây mất mặt và không hiệu quả — họ không phòng thủ mà thu mình lại. Ở VN, phản hồi trước mọi người dù nhẹ vẫn có yếu tố xấu hổ công khai với nhiều type.',
    ],
    selfCheck: 'Deadline nào trong đội bạn bị trễ vì cầu toàn, không phải vì lười biếng — và bạn đã phân biệt được hai cái chưa?',
  },
  {
    id: 'C10',
    situation: 'S4',
    pair: 'B',
    managerType: 'ENTJ',
    employeeType: 'INFP',
    title: 'Kiểm soát quá sát giải quyết deadline nhưng phá chất lượng',
    context: 'Nam (ENTJ) là founder của startup edtech 25 người HCM. Lan (INFP) — curriculum designer — liên tiếp nộp module học muộn 1 tuần. Nội dung chất lượng cao nhưng không đúng timeline để team tech triển khai kịp.',
    whatHappened: 'Nam gọi vào họp và trình bày rõ: "Mỗi tuần Lan trễ là team tech mất 3 ngày dự phòng. Mình cần giải quyết việc này." Lan nói "dạ anh hiểu" nhưng lần sau vẫn trễ. Nam bực và bắt đầu kiểm tra tiến độ hàng ngày.',
    outcome: 'Với hỏi thăm hàng ngày, Lan đạt deadline nhưng chất lượng giảm rõ. Trong một buổi đánh giá, Lan nói: "Em cảm thấy áp lực khi bị kiểm tra mỗi ngày nên hay làm nhanh hơn thay vì làm tốt hơn." Nam nhận ra: mình đang tối ưu cho deadline nhưng phá hỏng cái quý nhất.',
    lessons: [
      'INFP làm tốt nhất khi có tự chủ và ý nghĩa. Kiểm soát quá sát giải quyết biểu hiện nhưng phá chất lượng và động lực nội tại. Nam cần hệ thống khác: dự phòng lớn hơn trong kế hoạch, hoặc Lan nộp bản nháp trước để team tech bắt đầu, bản hoàn chỉnh nộp sau.',
      'VN context: "Dạ anh hiểu" không có nghĩa là đồng ý — thường là lịch sự. Sếp ENTJ hay hiểu đây là đồng thuận và ngạc nhiên khi không có gì thay đổi.',
    ],
    selfCheck: 'Có nhân viên nào đang "dạ anh/chị hiểu" nhưng thực ra chưa thực sự đồng ý với giải pháp không?',
  },
  {
    id: 'C11',
    situation: 'S4',
    pair: 'C',
    managerType: 'INTJ',
    employeeType: 'ESFJ',
    title: 'Biết quy trình nhưng không dám từ chối khách',
    context: 'Hùng (INTJ) là tech lead của startup 30 người Hà Nội. Hoa (ESFJ) — account manager — liên tục để khách hàng kỳ vọng vượt phạm vi, dẫn đến đội dev phải làm thêm và kiệt sức. Hoa không nói không với khách hàng được.',
    whatHappened: 'Hùng gửi tài liệu về quản lý phạm vi và nói: "Đây là khung làm việc — bất kỳ yêu cầu nào ngoài phạm vi phải đi qua quy trình này." Hoa đọc, hiểu, nhưng vẫn đồng ý với khách hàng trước rồi mới báo đội.',
    outcome: 'Hùng hỏi riêng: "Bạn đọc tài liệu rồi — tại sao vẫn đồng ý trước khi kiểm tra phạm vi?" Hoa nói: "Em sợ khách hàng không vui nếu em nói không ngay." Hùng mới hiểu: Hoa không thiếu quy trình — Hoa thiếu sự cho phép và câu mẫu để từ chối khách mà vẫn giữ quan hệ. Hai người nhập vai lại cuộc hội thoại với khách hàng.',
    lessons: [
      'ESFJ không thiếu kiến thức về quản lý phạm vi — thiếu cảm giác an toàn để từ chối trong khoảnh khắc thật. Tài liệu không giải quyết được cái này. Cần: câu mẫu cụ thể và sự cho phép rõ ràng từ sếp.',
      'VN SMB: Tránh xung đột với khách hàng rất cao — đặc biệt với F types và trong văn hóa service VN. "Nói không mà vẫn giữ khách" là kỹ năng cần được dạy và thực hành, không chỉ được quy định.',
    ],
    selfCheck: 'Có ai trong đội bạn cần câu mẫu để từ chối lịch sự, không phải chỉ cần chính sách?',
  },
  {
    id: 'C12',
    situation: 'S4',
    pair: 'D',
    managerType: 'ENFJ',
    employeeType: 'ISTJ',
    title: 'Không theo mẫu mới vì có lý do kỹ thuật',
    context: 'Linh (ENFJ) là manager của đội data 20 người HCM. Tuấn (ISTJ) — data analyst — liên tục nộp report đúng nhưng format khác với mẫu mới Linh yêu cầu 2 tháng trước. Không phải không biết — chỉ thấy mẫu cũ tốt hơn và chưa thuyết phục được Linh.',
    whatHappened: 'Linh nhắc qua Zalo: "Nhớ dùng mẫu mới nhé." Tuấn reply "ok" nhưng lần sau vẫn dùng mẫu cũ — chỉ thêm vài cột từ mẫu mới vào. Linh bắt đầu bực và nói trong họp: "Chúng ta cần nhất quán."',
    outcome: 'Tuấn gửi email cho Linh với 3 lý do kỹ thuật tại sao mẫu cũ tốt hơn cho data type của họ. Linh đọc, nhận ra Tuấn đúng về 2/3 điểm, và họ tạo mẫu lai. Report từ đó đúng và tốt hơn cả hai phiên bản trước.',
    lessons: [
      'ISTJ không tuân thủ vì cứng đầu — họ giữ cách cũ khi chưa thuyết phục được bằng lý do kỹ thuật. Nhắc nhở không giải quyết được. Cần: hỏi tại sao họ giữ cách cũ trước khi áp cách mới.',
      'VN context: ISTJ thường không phản đối công khai — họ giữ cách của mình im lặng và chỉ nói khi được hỏi thẳng hoặc buộc phải email. Đây là mất mát cho tổ chức vì thường họ đúng về lý do kỹ thuật.',
    ],
    selfCheck: 'Có ai trong đội đang "không chịu theo quy trình mới" mà thực ra đang giữ lý do kỹ thuật tốt mà bạn chưa nghe?',
  },

  // ── S5 NHÂN VIÊN MUỐN NGHỈ ───────────────────────────────────
  {
    id: 'C13',
    situation: 'S5',
    pair: 'A',
    managerType: 'ESTJ',
    employeeType: 'ENFP',
    title: 'Tăng lương 12% nhưng vẫn nghỉ sau 3 tuần',
    context: 'Hùng (ESTJ) là giám đốc của công ty tư vấn 35 người Hà Nội. Phương (ENFP) — consultant star — bắt đầu đặt câu hỏi về "work-life balance" trong 1:1, nhắc đến một lần về một offer từ công ty khác "nhưng chưa chắc," và ít pitch ý tưởng mới trong đề xuất.',
    whatHappened: 'Hùng tăng lương 12% và nói: "Chúng ta đang phát triển tốt — có nhiều cơ hội phía trước." Phương cảm ơn nhưng không có vẻ hào hứng. 3 tuần sau, Phương nộp đơn nghỉ.',
    outcome: 'Trong buổi phỏng vấn nghỉ việc, Phương nói: "Em không phải vì lương — em cần thấy mình đang xây dựng về một hướng nào đó. Ở đây em làm dự án nhưng không biết mình đang đến đâu." Hùng nhận ra mình đã giải quyết bằng đãi ngộ trong khi vấn đề là hướng đi và lộ trình phát triển.',
    lessons: [
      'ENFP nghỉ khi không thấy hướng đi cá nhân — không phải khi thiếu tiền. "Nhiều cơ hội phía trước" là câu trả lời cho câu hỏi khác. Câu cần hỏi: "Bạn muốn đến đâu trong 2 năm tới — và mình có thể là một phần của con đường đó không?"',
      '"Nhắc đến offer từ chỗ khác" trong VN SMB là tín hiệu rất rõ — không phải đang thương lượng lương mà đang test xem sếp có để ý và quan tâm không. Đây là khoảnh khắc để có cuộc trò chuyện thật, không phải đề nghị giữ chân.',
    ],
    selfCheck: 'Ai trong đội bạn đã nhắc đến "chỗ khác" hoặc "cơ hội khác" mà bạn chưa có cuộc trò chuyện thật về hướng đi với họ?',
  },
  {
    id: 'C14',
    situation: 'S5',
    pair: 'B',
    managerType: 'ENTJ',
    employeeType: 'INFP',
    title: 'Muốn freelance không phải vì tự do — vì nguyên tắc',
    context: 'Nam (ENTJ) là CTO của agency 40 người Hà Nội. Lan (INFP) — UX writer 4 năm — bắt đầu đi trễ nhẹ, ít contribute trong brainstorm, và một buổi cà phê sau giờ nói: "Thỉnh thoảng em nghĩ về việc thử freelance."',
    whatHappened: 'Nam lo ngại và nghĩ về tăng lương. Trước khi quyết định, gặp Lan và hỏi thẳng: "Bạn đang tìm kiếm gì mà công việc hiện tại chưa cho?" Lan im lặng một lúc rồi nói: "Em muốn được viết thứ mình thật sự tin là đúng — nhiều brief bây giờ em viết nhưng không tin."',
    outcome: 'Nam không tăng lương ngay. Thay vào đó, giao cho Lan một dự án gắn với sứ mệnh rõ ràng và toàn quyền sáng tạo. Lan ở lại và dự án đó trở thành tình huống mẫu tốt nhất của agency.',
    lessons: [
      'INFP không rời vì thiếu tiền — rời khi công việc xung đột với giá trị của họ. "Muốn thử freelance" không phải muốn tự do về thời gian — là muốn tự do về nguyên tắc sáng tạo. Câu hỏi đúng là về giá trị, không phải về phúc lợi.',
      'VN: "Nói về freelance trong cà phê thân mật" = đang test xem sếp có nghe không. Nếu sếp không phản hồi bằng cuộc trò chuyện thật, tín hiệu tiếp theo thường là đơn nghỉ.',
    ],
    selfCheck: 'Có nhân viên nào đang làm đúng job nhưng bạn nghi ngờ họ không còn tin vào thứ họ đang làm không?',
  },
  {
    id: 'C15',
    situation: 'S5',
    pair: 'C',
    managerType: 'INTJ',
    employeeType: 'ESFJ',
    title: 'Người trụ cột rời đi vì không ai hỏi thăm',
    context: 'Hùng (INTJ) là founder của startup HR-tech 28 người Hà Nội. Hoa (ESFJ) — customer success lead 3 năm — bắt đầu ít chủ động organize team activity, xin về sớm hơn thường lệ 2 tuần nay, và một đồng nghiệp nói với Hùng: "Hoa hay nói mình mệt."',
    whatHappened: 'Hùng không quen với cuộc trò chuyện về cảm xúc nhưng lần này gặp Hoa và hỏi thẳng: "Mình thấy bạn đang kéo lại gần đây — bạn có muốn nói không?" Hoa bắt đầu khóc và nói không nghĩ Hùng để ý.',
    outcome: 'Hoa nói: "Em làm hết sức nhưng không biết mình có được cần ở đây không." Hùng ngạc nhiên vì Hoa là trụ cột của đội. Sau cuộc trò chuyện đó, Hùng bắt đầu ghi nhận đóng góp của Hoa cụ thể hơn. Hoa ở lại và sau đó nói đó là cuộc trò chuyện thay đổi mọi thứ.',
    lessons: [
      'ESFJ có thể rời đi trong im lặng vì không ai hỏi họ đang thế nào. Họ không drama, không đòi hỏi được công nhận — nhưng cần biết công việc của mình có giá trị. INTJ sếp thường không nói điều này vì cho rằng người ta biết.',
      'VN SMB: người giữ culture thường không được hỏi thăm vì "trông ổn." Câu "bạn đang ổn không" từ sếp INTJ lạnh đôi khi có impact mạnh hơn cả sếp ENFJ vì nó unexpected và genuine.',
    ],
    selfCheck: 'Người giữ culture của đội bạn — bạn đã hỏi họ đang thế nào, thật sự, lần gần nhất là khi nào?',
  },
  {
    id: 'C16',
    situation: 'S5',
    pair: 'D',
    managerType: 'ENFJ',
    employeeType: 'ISTJ',
    title: 'Hỏi về lộ trình nhưng chỉ nghe về culture',
    context: 'Linh (ENFJ) là manager của đội kế toán 15 người HCM. Tuấn (ISTJ) — accountant senior 5 năm — bắt đầu hỏi về "chính sách thăng tiến" và "lộ trình phát triển" trong các buổi đánh giá. Linh trả lời chung về văn hóa và tinh thần đội nhưng Tuấn tiếp tục hỏi lại.',
    whatHappened: 'Linh cảm nhận được tín hiệu nhưng tiếp tục nói về đội, về văn hóa, về "chúng ta đang cùng xây dựng điều lớn." Tuấn nghe lịch sự và không hỏi thêm. 2 tháng sau nộp đơn nghỉ.',
    outcome: 'Trong buổi nghỉ việc, Tuấn nói: "Em muốn biết trong 3 năm nữa mình sẽ ở đâu — nhưng mỗi lần hỏi chỉ nghe về đội." Linh nhận ra mình đã nói đúng thứ của mình nhưng không đúng thứ Tuấn cần.',
    lessons: [
      'ISTJ muốn biết lộ trình thăng tiến rõ ràng — không phải bài nói về văn hóa. Khi họ hỏi "lộ trình phát triển," họ đang hỏi về cột mốc, chức danh, timeline cụ thể. Nếu không có câu trả lời rõ, hãy thẳng thắn về điều đó.',
      'ENFJ thường lấp đầy khoảng lặng bằng kết nối và tầm nhìn — điều đó hiệu quả với NF types nhưng không hiệu quả với ST types cần sự rõ ràng. Ở VN, nhiều nhân viên rời đi vì không biết mình đang đi đâu — không phải vì văn hóa xấu.',
    ],
    selfCheck: 'Câu hỏi về "lộ trình" từ nhân viên — bạn đã trả lời bằng quỹ đạo cụ thể hay bằng văn hóa và cơ hội chung chung?',
  },

  // ── S8 XÂY NỀN TẢNG QUAN HỆ ──────────────────────────────────
  {
    id: 'C17',
    situation: 'S8',
    pair: 'A',
    managerType: 'ESTJ',
    employeeType: 'ENFP',
    title: 'Cà phê không mục đích riêng mở ra thí điểm thành sản phẩm',
    context: 'Hùng (ESTJ) là giám đốc kinh doanh của công ty phân phối 45 người HCM. Phương (ENFP) — sales manager mới join 3 tháng — đạt kết quả tốt nhưng Hùng nhận ra mình chưa biết gì về Phương ngoài số liệu. Không có vấn đề gì, nhưng Hùng muốn đầu tư quan hệ trước khi cần nói khó.',
    whatHappened: 'Hùng mời Phương uống cà phê ngoài văn phòng, không có mục đích riêng. Nói thẳng: "Mình muốn biết bạn hơn ngoài công việc — bạn đang thích phần nào nhất gần đây và bạn muốn thử gì mà chưa có cơ hội?"',
    outcome: 'Phương mở lòng và kể về một ý tưởng về cách tiếp cận khách hàng SMB khác hoàn toàn với cách đội đang làm. Ý tưởng hay, không có vẻ đúng chỗ trong buổi đánh giá sales. Hùng lắng nghe và 2 tuần sau cho Phương không gian để thử nghiệm nhỏ. Thử nghiệm thành công và Phương trở thành người đầu tư nhiều nhất vào đội từ đó.',
    lessons: [
      'ENFP có ý tưởng liên tục nhưng chỉ chia sẻ trong môi trường cảm thấy được nghe. Họp trang trọng với ESTJ sếp thường không phải môi trường đó. Cà phê ngoài văn phòng là không gian khác.',
      'VN SMB: "Đầu tư quan hệ trước khi cần" là nguyên tắc mà sếp hay bỏ qua vì bận. Nhưng 1 buổi cà phê sớm có thể thay thế 3 buổi trò chuyện khó sau này.',
    ],
    selfCheck: 'Có ai trong đội mà bạn chỉ biết qua số liệu — chưa biết họ muốn gì và đang nghĩ gì thật sự?',
  },
  {
    id: 'C18',
    situation: 'S8',
    pair: 'B',
    managerType: 'ENTJ',
    employeeType: 'INFP',
    title: 'Một câu Zalo mở ra phần cảm xúc cốt lõi của sản phẩm',
    context: 'Nam (ENTJ) là founder của studio game indie 20 người Hà Nội. Lan (INFP) — narrative designer — không có vấn đề gì, nhưng Nam nhận ra mình hay giao tiếp với Lan qua việc và deadline, chưa bao giờ hỏi Lan đang quan tâm đến gì trong công việc này.',
    whatHappened: 'Nam gửi tin nhắn Zalo: "Mình muốn hỏi Lan một câu — không liên quan đến dự án hiện tại. Phần nào của công việc ở đây bạn thấy đang đúng với mình nhất?" Không cần họp, không cần phòng họp.',
    outcome: 'Lan trả lời dài, bất ngờ: kể về một nhân vật trong game mình đang xây dựng và cách mình muốn cốt truyện đó chạm đến người chơi thật sự. Nam đọc và nhận ra Lan đang gánh phần cảm xúc cốt lõi của sản phẩm — thứ mà Nam không đo được bằng tốc độ sprint. Từ đó Nam bắt đầu chia sẻ với Lan về tầm nhìn của game từ sớm hơn, không chỉ khi cần narrative.',
    lessons: [
      'INFP thường không chia sẻ sự đầu tư sáng tạo trừ khi được hỏi trong môi trường an toàn. Một câu Zalo thân mật mở ra nhiều hơn một buổi đánh giá trang trọng. Với INFP, "được hỏi về thứ mình quan tâm" là vốn quan hệ cao nhất.',
      'ENTJ hay tập trung vào kết quả bàn giao và bỏ lỡ thứ đang thúc đẩy động lực thật sự của INFP. Biết điều này sớm giúp tránh bất ngờ khi INFP đột ngột mất gắn kết vì "mất kết nối với dự án."',
    ],
    selfCheck: 'Nhân viên nào trong đội đang gánh thứ gì quan trọng mà bạn chưa hỏi họ về điều đó?',
  },
  {
    id: 'C19',
    situation: 'S8',
    pair: 'C',
    managerType: 'INTJ',
    employeeType: 'ESFJ',
    title: '30 giây nói thật — 3 tháng vốn quan hệ',
    context: 'Hùng (INTJ) là head of product của fintech startup 32 người Hà Nội. Hoa (ESFJ) — operation lead — không có vấn đề gì, nhưng Hùng nhận ra mình chưa bao giờ ghi nhận Hoa về những gì Hoa làm cho đội — chỉ biết khi có lỗi.',
    whatHappened: 'Hùng gặp Hoa trong 5 phút và nói thẳng: "Mình muốn nói một điều — mình để ý là không khí đội tốt lên rõ từ khi Hoa join. Hòa nhập suôn sẻ, mọi người giao tiếp tốt hơn. Mình chưa nói điều này nhưng cần nói." Hùng không quen với việc này nhưng cố nói thẳng.',
    outcome: 'Hoa im lặng và gật đầu. Đến cuối ngày nhắn Hùng một tin: "Anh biết không, đó là lần đầu em nghe anh nói điều đó — em sẽ nhớ lâu." Không có gì thay đổi về việc nhưng Hoa bắt đầu chia sẻ lo ngại về đội với Hùng sớm hơn và chủ động hơn trước.',
    lessons: [
      'ESFJ nạp năng lượng quan hệ từ việc được nhìn thấy. INTJ không cần nhiều — chỉ cần nói thật, cụ thể, và một lần. Không cần hoa mỹ, không cần nghi lễ.',
      'VN SMB: nhiều sếp "biết nhân viên đang làm tốt" nhưng không nói ra vì cho rằng người ta biết. ESFJ đặc biệt cần nghe điều đó bằng lời. Câu nói 30 giây có thể tích lũy vốn quan hệ đủ cho 3 tháng.',
    ],
    selfCheck: 'Ai trong đội bạn đang làm tốt mà bạn chưa nói thẳng với họ — không phải trong buổi đánh giá kết quả công việc, mà trong một câu bình thường?',
  },
  {
    id: 'C20',
    situation: 'S8',
    pair: 'D',
    managerType: 'ENFJ',
    employeeType: 'ISTJ',
    title: 'Hỏi về cảm xúc không hiệu quả — hỏi về chuyên môn mới hiệu quả',
    context: 'Linh (ENFJ) là head of finance của công ty logistics 50 người HCM. Tuấn (ISTJ) — senior accountant 7 năm — đáng tin, ít lời, chưa bao giờ có vấn đề. Linh muốn đầu tư quan hệ vì biết đây là người quan trọng nhất khi mùa audit đến.',
    whatHappened: 'Linh thường hỏi thăm bằng câu hỏi cảm xúc — "Tuấn đang thế nào?" Tuấn trả lời "ổn anh/chị" và im lặng. Linh cảm thấy không kết nối được và tự hỏi mình đang làm gì sai.',
    outcome: 'Linh thử cách khác: thay vì hỏi về cảm xúc, hỏi về công việc nhưng theo kiểu tham vấn: "Mình đang nghĩ về cách thiết lập audit trail — Tuấn có thấy điểm nào trong quy trình hiện tại dễ bị bỏ sót không?" Tuấn nói trong 10 phút — chi tiết, rõ ràng, và có 3 ý cải thiện cụ thể.',
    lessons: [
      'Với ISTJ, "hỏi về cảm xúc" không phải cách xây quan hệ — "hỏi về chuyên môn của họ" mới là. Khi sếp tham vấn ISTJ như chuyên gia, họ cảm thấy được trân trọng theo cách của họ, không phải theo cách sếp tưởng.',
      'VN SMB: ENFJ sếp thường cho rằng "kết nối = hỏi thăm cảm xúc" với mọi người. Không phải vậy với ST types. Người Việt có thể rất ấm áp nhưng thể hiện và nhận sự quan tâm khác nhau theo type.',
    ],
    selfCheck: 'Có nhân viên nào bạn cảm thấy "không kết nối được" dù đã thử — có thể bạn đang dùng sai cách thể hiện quan tâm với họ?',
  },
]

// Helper: lấy cases theo situation
export function getCasesBySituation(situation: SituationId): CaseStudy[] {
  return CASE_STUDIES.filter(c => c.situation === situation)
}

// Helper: lấy case theo situation + pair (cho link từ GuidanceCard)
export function getCaseByKey(situation: SituationId, pair: CasePairId): CaseStudy | undefined {
  return CASE_STUDIES.find(c => c.situation === situation && c.pair === pair)
}

// Helper: lấy cases liên quan đến 1 type (manager hoặc employee)
export function getCasesByType(type: string): CaseStudy[] {
  return CASE_STUDIES.filter(
    c => c.managerType === type || c.employeeType === type
  )
}

export const SITUATION_LABELS: Record<SituationId, string> = {
  S1: 'Góp ý khó',
  S2: 'Động lực thấp',
  S4: 'Miss kỳ vọng',
  S5: 'Nhân viên muốn nghỉ',
  S8: 'Xây nền tảng',
}

/** Gợi ý 1 case study gần nhất với blocker/goal của đội (Team Builder). */
export function pickRelevantCaseStudy(
  blocker: string,
  goal: string,
): CaseStudy | undefined {
  const text = `${blocker} ${goal}`.toLowerCase()
  const rules: { keywords: string[]; situation: SituationId }[] = [
    { keywords: ['nghỉ', 'ra đi', 'resign', 'quit'], situation: 'S5' },
    { keywords: ['deadline', 'trễ', 'miss', 'kỳ vọng', 'chất lượng'], situation: 'S4' },
    { keywords: ['feedback', 'phản hồi', 'defensive', 'né'], situation: 'S1' },
    {
      keywords: ['động lực', 'mất lửa', 'quiet', 'burnout', 'chán'],
      situation: 'S2',
    },
    {
      keywords: ['quan hệ', 'trust', 'đầu tư', 'onboard', 'mới'],
      situation: 'S8',
    },
  ]
  for (const rule of rules) {
    if (rule.keywords.some((k) => text.includes(k))) {
      return getCasesBySituation(rule.situation)[0]
    }
  }
  return CASE_STUDIES[0]
}
