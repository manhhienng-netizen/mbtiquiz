// employee-case-studies.ts — Hiểu Sếp Tầng 2
// EC01–EC05: spec-hieu-sep-tang1-2-b2b-12062026-1845.md §2
// EC06–EC16: employee-case-studies-ec06-ec16-12062026.ts

export interface EmployeeCaseStudy {
  id: string
  bossType: string
  title: string
  context: string
  whatHappened: string
  outcome: string
  lessons: string[]
  selfCheck: string
}

const EC06: EmployeeCaseStudy = {
  id: 'EC06',
  bossType: 'ISFP',
  title: 'Khi sếp thay đổi yêu cầu giữa chừng',
  context:
    'Linh đang làm presentation cho sếp Hoa (ISFP) theo brief ban đầu. Giữa chừng Hoa nhắn: "Mình đổi hướng một chút nhé" — không giải thích rõ.',
  whatHappened:
    'Linh không vội làm lại ngay. Thay vào đó nhắn: "Anh/chị muốn đổi theo hướng nào? Em muốn hiểu rõ trước khi bắt đầu lại để không sai thêm lần nữa." Sau khi nghe giải thích, Linh xác nhận lại scope mới bằng 3 gạch ngắn qua Zalo.',
  outcome:
    'Hoa confirm và thêm: "Em hỏi đúng điểm — mình cũng chưa nghĩ rõ hoàn toàn, cảm ơn em." Presentation cuối được approve nhanh.',
  lessons: [
    'ISFP sếp đôi khi thay đổi vì cảm giác hơn là logic rõ ràng — hỏi để hiểu hướng mới giúp cả hai tránh vòng lặp sửa đi sửa lại.',
    'Xác nhận scope bằng văn bản ngắn sau cuộc trò chuyện không phải bureaucracy — là cách tránh misalign tiếp.',
  ],
  selfCheck: 'Khi sếp thay đổi yêu cầu, bạn có hỏi rõ lý do trước khi làm lại không?',
}

const EC07: EmployeeCaseStudy = {
  id: 'EC07',
  bossType: 'INFP',
  title: 'Khi bạn không đồng ý với cách tiếp cận',
  context:
    'Minh không đồng ý với cách sếp Phương (INFP) muốn xử lý một tình huống với client. Phương có lý do riêng nhưng Minh thấy cách đó không hiệu quả.',
  whatHappened:
    'Minh chờ sau cuộc họp, gặp riêng Phương: "Anh/chị có 5 phút không? Em muốn chia sẻ một góc nhìn khác về cách xử lý case này — không phải để tranh luận mà vì em lo cho kết quả." Minh trình bày concern cụ thể, không phán xét.',
  outcome:
    'Phương lắng nghe và giải thích context đằng sau mà Minh chưa biết. Hai người tìm được cách tiếp cận kết hợp tốt hơn. Phương sau đó nói: "Em làm đúng khi nói thẳng."',
  lessons: [
    'INFP sếp không cần bạn đồng ý tất cả — cần bạn thành thật. Giả vờ đồng ý mà trong bụng không là thứ họ detect được.',
    '"Em lo cho kết quả" thay vì "em nghĩ anh/chị sai" = framing mời đối thoại thay vì phòng thủ.',
  ],
  selfCheck: 'Có lần nào bạn giả vờ đồng ý với sếp thay vì nói concern thật không?',
}

const EC08: EmployeeCaseStudy = {
  id: 'EC08',
  bossType: 'INTP',
  title: 'Khi cần quyết định nhanh mà sếp còn phân tích',
  context:
    'Tuấn cần quyết định từ sếp Nam (INTP) trong vòng 24 giờ cho một tình huống client. Nam có vẻ muốn phân tích thêm.',
  whatHappened:
    'Tuấn gửi một tài liệu ngắn: 3 option với pros/cons cụ thể, và ghi rõ "Deadline quyết định: ngày mai 5pm, vì client cần confirm sáng hôm sau." Tuấn đề xuất option mình cho là tốt nhất với lý do. Không push, chỉ inform context.',
  outcome:
    'Nam quyết định sau 2 giờ — nhanh hơn bình thường. Sau đó nói: "Bộ tài liệu em chuẩn bị giúp mình quyết định nhanh hơn nhiều so với trao đổi miệng."',
  lessons: [
    'INTP sếp phân tích lâu khi chưa đủ thông tin rõ — docs chuẩn bị sẵn với tradeoffs cụ thể giúp họ quyết định nhanh hơn chờ họ hỏi từng thứ.',
    'Inform deadline với context "client cần" chứ không phải "em cần" — objective reason dễ accept hơn.',
  ],
  selfCheck: 'Lần cần quyết định gấp, bạn có chuẩn bị đủ thông tin trước khi tìm sếp chưa?',
}

const EC09: EmployeeCaseStudy = {
  id: 'EC09',
  bossType: 'ESTP',
  title: 'Khi sếp pivot kế hoạch vào phút chót',
  context:
    'Hoa đã chuẩn bị xong presentation cho cuộc họp ngày mai. Sếp Khoa (ESTP) nhắn lúc 9pm: "Ngày mai đổi hướng — chỉ tập trung vào phần số thôi nhé."',
  whatHappened:
    'Hoa không cãi. Nhắn lại: "OK anh — em hiểu. Chỉ cần anh xác nhận: phần số là slides 4-7, phần kết luận vẫn giữ không?" Khoa confirm trong 5 phút. Hoa adjust trong 1 giờ.',
  outcome:
    'Cuộc họp diễn ra tốt. Sau đó Khoa nói: "Em xử lý thay đổi nhanh — cái đó quan trọng hơn nhiều so với presentation hoàn hảo."',
  lessons: [
    'ESTP sếp pivot vì opportunity thinking — không phải vì bạn làm sai. Adapt nhanh và hỏi đúng chỗ (thay vì hỏi lý do) là cách làm việc hiệu quả nhất với họ.',
    'Xác nhận scope thay đổi cụ thể bằng câu hỏi đóng (slides mấy đến mấy?) tốt hơn hỏi mở khi thời gian gấp.',
  ],
  selfCheck: 'Khi sếp thay đổi kế hoạch gấp, phản ứng đầu tiên của bạn là gì?',
}

const EC10: EmployeeCaseStudy = {
  id: 'EC10',
  bossType: 'ESFP',
  title: 'Khi bạn cần sếp duyệt chi tiết kỹ thuật',
  context:
    'Lan cần sếp Mai (ESFP) duyệt một technical doc dài trước deadline. Mai có tendency lướt nhanh và approve mà không đọc kỹ.',
  whatHappened:
    'Lan không gửi cả doc. Thay vào đó tóm tắt 3 điểm cần Mai quyết định, ghi rõ "Impact nếu approve" và "Impact nếu không approve" mỗi điểm. Gặp trực tiếp 15 phút thay vì email.',
  outcome:
    'Mai quyết định đủ 3 điểm trong 15 phút, và thêm một góc nhìn mà Lan chưa nghĩ đến về user experience. Lan realize: "Sếp hiểu vấn đề — chỉ không muốn đọc doc dài."',
  lessons: [
    'ESFP sếp không hợp với reading-heavy approval process — executive summary với decisions cần làm (không phải background) phù hợp hơn.',
    'Meeting ngắn thường hiệu quả hơn email với sếp hướng ngoại, đặc biệt khi cần quyết định.',
  ],
  selfCheck:
    'Cách bạn xin approval từ sếp — có phù hợp với cách sếp thích xử lý thông tin không?',
}

const EC11: EmployeeCaseStudy = {
  id: 'EC11',
  bossType: 'ENFP',
  title: 'Khi sếp có quá nhiều idea cùng lúc',
  context:
    'Phương làm việc với sếp Linh (ENFP) hay có nhiều idea mới và expect đội bắt đầu ngay. Team đang overloaded với backlog cũ chưa xong.',
  whatHappened:
    'Phương xin gặp Linh 15 phút, mang theo visual backlog hiện tại. Nói: "Anh/chị, em muốn help execute tất cả ideas — nhưng nếu làm song song hết thì khả năng hoàn thành tốt sẽ thấp hơn. Anh/chị muốn ưu tiên cái nào nhất?" Không phản đối idea, chỉ hỏi về priority.',
  outcome:
    'Linh chọn 2 idea ưu tiên. Backlog được clear hơn. Linh sau đó nói: "Lần sau em cứ làm như vậy — mình đôi khi cần người giúp focus."',
  lessons: [
    'ENFP sếp không cần bạn approve hay từ chối idea — cần bạn giúp prioritize. Framing "giúp execute tốt hơn" thay vì "không đủ capacity" receive được tốt hơn nhiều.',
    'Visual backlog (dù đơn giản) làm tradeoffs visible — hiệu quả hơn trao đổi miệng về khối lượng công việc.',
  ],
  selfCheck:
    'Khi sếp có nhiều idea, bạn có cách nào để giúp prioritize mà không làm họ cảm thấy bị từ chối không?',
}

const EC12: EmployeeCaseStudy = {
  id: 'EC12',
  bossType: 'ENTP',
  title: 'Khi sếp phản biện mọi thứ bạn đề xuất',
  context:
    'Tuấn mới vào đội và chưa quen với việc sếp Hùng (ENTP) luôn đặt câu hỏi và phản biện mọi đề xuất. Tuấn bắt đầu ngại đề xuất vì sợ bị phản bác.',
  whatHappened:
    'Sau khi hỏi đồng nghiệp cũ, Tuấn hiểu: Hùng phản biện không phải vì không thích idea — mà vì muốn test độ solid. Lần sau Tuấn chuẩn bị "weak points" của chính mình và đề cập trước: "Em biết điểm yếu của cách tiếp cận này là X — em đã nghĩ đến Y như một cách handle. Anh thấy còn hole nào khác không?"',
  outcome:
    'Hùng visible impressed: "Em tự critique được là tốt rồi. Thêm một điểm nữa là Z." Cuộc thảo luận productive hơn nhiều lần trước.',
  lessons: [
    'ENTP sếp dùng debate như một tool để improve ideas, không phải để dismiss. Tự phản biện trước = invite collaboration thay vì phòng thủ.',
    '"Anh thấy còn hole nào không?" chuyển dynamic từ bạn phòng thủ sang cả hai cùng tìm lỗ hổng.',
  ],
  selfCheck: 'Bạn có biết điểm yếu của đề xuất mình trước khi gặp sếp không?',
}

const EC13: EmployeeCaseStudy = {
  id: 'EC13',
  bossType: 'ESTJ',
  title: 'Khi yêu cầu của sếp có vẻ không hợp lý',
  context:
    'Minh nhận yêu cầu từ sếp Khoa (ESTJ) phải làm report theo format cũ dù format mới đã được cả đội agree là tốt hơn.',
  whatHappened:
    'Thay vì làm theo format cũ trong im lặng hoặc cãi ngay, Minh xin 10 phút: "Anh, em muốn hiểu context một chút — có lý do cụ thể nào nên dùng format cũ cho report này không? Em hỏi để biết cách làm đúng, không phải để tranh luận." Khoa giải thích: format cũ là yêu cầu của client cụ thể này.',
  outcome:
    'Minh làm theo format cũ cho client này và giữ format mới cho phần còn lại. Không còn confusion sau đó.',
  lessons: [
    'ESTJ sếp thường có lý do cụ thể cho quy trình — không phải vì cứng nhắc. Hỏi context thay vì assume "vô lý".',
    '"Em hỏi để biết cách làm đúng" = framing học hỏi, không phải challenge. Receive tốt hơn với ESTJ.',
  ],
  selfCheck:
    'Có yêu cầu nào của sếp bạn thấy vô lý mà chưa hỏi lý do đằng sau không?',
}

const EC14: EmployeeCaseStudy = {
  id: 'EC14',
  bossType: 'ESFJ',
  title: 'Khi sếp tránh quyết định khó vì không muốn làm ai buồn',
  context:
    'Lan nhận ra sếp Nam (ESFJ) đang trì hoãn quyết định về việc phân công lại task vì muốn tránh conflict trong đội. Sự trì hoãn đang ảnh hưởng đến timeline.',
  whatHappened:
    'Lan không gây pressure trực tiếp. Thay vào đó gặp riêng Nam và nói: "Anh, em biết quyết định phân công lại sẽ awkward — nhưng nếu không có quyết định trong tuần này, deadline Q3 sẽ miss và ảnh hưởng đến cả đội. Em có thể giúp anh communicate với team như thế nào không?" Lan offer giúp facilitate, không chỉ push.',
  outcome:
    'Nam quyết định trong ngày hôm đó và nhờ Lan giúp communicate với team. Quyết định được nhận tốt hơn vì có chuẩn bị kỹ về cách nói.',
  lessons: [
    'ESFJ sếp trì hoãn quyết định khó vì sợ harm relationship, không phải vì không biết phải làm gì. Offer giúp về cách communicate làm họ move được.',
    'Deadline rõ ràng với consequence cụ thể ("ảnh hưởng cả đội") thường activate decision-making của người care về team.',
  ],
  selfCheck:
    'Khi sếp trì hoãn quyết định, bạn có cách nào để giúp họ move mà không tạo thêm áp lực không?',
}

const EC15: EmployeeCaseStudy = {
  id: 'EC15',
  bossType: 'ENFJ',
  title: 'Khi sự quan tâm của sếp trở thành áp lực',
  context:
    'Phương có sếp Mai (ENFJ) rất quan tâm đến phát triển cá nhân — thường xuyên check in, đề xuất khóa học, giới thiệu mentor. Phương cảm thấy overwhelmed nhưng không muốn làm sếp buồn.',
  whatHappened:
    'Phương chọn thời điểm thích hợp và nói thật, nhẹ nhàng: "Chị, em rất biết ơn sự quan tâm của chị. Em muốn chia sẻ thật: gần đây em đang cần một chút không gian để tự xử lý và tìm hướng cho mình — không phải chị làm gì sai. Em nghĩ em sẽ phát triển tốt hơn nếu có thời gian tự navigate trước."',
  outcome:
    'Mai hiểu và điều chỉnh tần suất check in. Nói: "Cảm ơn em đã nói thẳng — mình đôi khi không biết mình đang overstep."',
  lessons: [
    'ENFJ sếp care deeply nhưng không phải không thể adjust — họ cần biết để điều chỉnh. Nói thật (với sự trân trọng) hiệu quả hơn im chịu.',
    '"Không phải chị làm gì sai" + lý do rõ ràng = góp ý mà ENFJ có thể tiếp nhận mà không phòng thủ.',
  ],
  selfCheck:
    'Có thứ gì trong cách sếp manage bạn đang không phù hợp mà bạn chưa nói thật không?',
}

const EC16: EmployeeCaseStudy = {
  id: 'EC16',
  bossType: 'ENTJ',
  title: 'Khi bị giao task ngoài scope liên tục',
  context:
    'Tuấn nhận thấy sếp Hùng (ENTJ) thường xuyên giao thêm task ngoài JD của Tuấn, không hỏi trước. Workload đang vượt capacity.',
  whatHappened:
    'Tuấn không phàn nàn về workload. Thay vào đó chuẩn bị danh sách các tasks hiện tại với estimated time, sau đó gặp Hùng: "Anh, em muốn align với anh về priorities. Đây là những gì em đang làm. Task mới anh giao tuần này — em muốn làm tốt — nhưng nếu thêm vào, cái nào trong list này em có thể defer hoặc drop?"',
  outcome:
    'Hùng review list và re-prioritize cùng Tuấn trong 20 phút. Sau đó nói: "Em cần làm việc này sớm hơn — không để accumulated rồi mới nói." Tuấn không bị giao ngoài scope tùy tiện nữa.',
  lessons: [
    'ENTJ sếp expect bạn own workload của mình — phàn nàn không hiệu quả bằng đưa tradeoffs cụ thể. "Thêm cái này thì drop cái nào" là ngôn ngữ họ hiểu.',
    'Chủ động align sớm (khi task mới về) tốt hơn chờ accumulated rồi mới escalate.',
  ],
  selfCheck:
    'Khi workload vượt capacity, bạn nói với sếp bằng cách nào — phàn nàn hay đưa tradeoffs?',
}

const EC01: EmployeeCaseStudy = {
  id: 'EC01',
  bossType: 'ISTJ',
  title: 'Đề xuất thay đổi quy trình',
  context:
    'Lan là junior analyst, nhận ra workflow đội đang làm mất thời gian. Sếp Hùng (ISTJ) nổi tiếng là khó thay đổi quy trình.',
  whatHappened:
    'Lan chuẩn bị so sánh cụ thể: quy trình hiện tại vs đề xuất, với dữ liệu thời gian tiết kiệm được trong 2 tuần pilot. Gửi email trước buổi gặp để sếp có thời gian đọc.',
  outcome:
    'Hùng approve thử nghiệm sau khi xem dữ liệu. Nói: "Nếu em có bằng chứng như thế này từ đầu, mình đã cho thử từ lâu rồi."',
  lessons: [
    'ISTJ sếp không chống đối thay đổi — chống đối thay đổi không có bằng chứng. Dữ liệu cụ thể là ngôn ngữ họ hiểu nhất.',
    'Gửi tài liệu trước để sếp có thời gian xử lý (không surprise trong meeting) là respect kiểu ra quyết định của họ.',
  ],
  selfCheck:
    'Đề xuất gần nhất của bạn với sếp — có dữ liệu hoặc ví dụ cụ thể kèm theo không?',
}

const EC02: EmployeeCaseStudy = {
  id: 'EC02',
  bossType: 'ISFJ',
  title: 'Bị sếp không hài lòng mà không nói',
  context:
    'Minh nhận ra sếp Nam (ISFJ) đột ngột ít tương tác hơn sau một lần Minh nộp báo cáo trễ. Nam không nói gì trực tiếp.',
  whatHappened:
    'Thay vì chờ đợi, Minh chủ động gặp riêng: "Anh có thể cho em biết gần đây em có làm gì chưa đúng không? Em muốn cải thiện."',
  outcome:
    'Nam nói thật: "Báo cáo tuần trước trễ 2 ngày mà không báo trước — client hỏi mình không biết trả lời thế nào." Sau khi Minh giải thích và xin lỗi cụ thể, mối quan hệ trở lại bình thường.',
  lessons: [
    'ISFJ sếp thường không confrontational — không nói thẳng không có nghĩa là ổn. Chủ động hỏi tốt hơn chờ họ nói.',
    '"Em muốn cải thiện" thay vì "em có sai không" = framing mời góp ý thay vì phòng thủ.',
  ],
  selfCheck:
    'Có dấu hiệu nào gần đây cho thấy sếp không hài lòng mà bạn chưa hỏi thẳng không?',
}

const EC03: EmployeeCaseStudy = {
  id: 'EC03',
  bossType: 'INFJ',
  title: 'Khi không hiểu lý do quyết định',
  context:
    'Phương không đồng ý với quyết định của sếp Linh (INFJ) về cách tiếp cận một client. Quyết định có vẻ trái với dữ liệu.',
  whatHappened:
    'Phương hỏi thẳng trong 1:1: "Anh/chị có thể giúp em hiểu logic đằng sau quyết định này không? Em đang băn khoăn về phần X."',
  outcome:
    'Linh giải thích context dài hạn mà Phương không biết — relationship với client đó phức tạp hơn dữ liệu cho thấy. Phương hiểu và execute tốt hơn.',
  lessons: [
    'INFJ sếp thường có lý do dài hạn không visible ngay. Hỏi thẳng "giúp em hiểu logic" tốt hơn tự đoán hoặc ngầm không đồng ý.',
    'Câu hỏi "em đang băn khoăn về X" (cụ thể) nhận được câu trả lời tốt hơn "em không hiểu tại sao."',
  ],
  selfCheck:
    'Có quyết định nào của sếp bạn chưa hiểu lý do và chưa hỏi thẳng không?',
}

const EC04: EmployeeCaseStudy = {
  id: 'EC04',
  bossType: 'INTJ',
  title: 'Muốn xin thêm resource',
  context:
    'Tuấn cần thêm 1 người trong đội để đạt target Q3. Sếp Hùng (INTJ) nổi tiếng là khó xin resource.',
  whatHappened:
    'Tuấn chuẩn bị: current capacity vs workload cụ thể, 3 scenario với/không có thêm người, ROI ước tính. Gửi doc trước và hỏi: "Anh có 15 phút review cùng em không?"',
  outcome:
    'Hùng approve sau khi xem doc — với 1 điều chỉnh về timing. Nói: "Lần sau cứ làm như thế này — đừng chỉ nói cần thêm người, cho mình thấy tại sao."',
  lessons: [
    'INTJ sếp không nói không với resource nếu business case solid. Họ nói không với request thiếu chuẩn bị.',
    '15 phút focused với doc chuẩn bị sẵn hiệu quả hơn 1 giờ trao đổi miệng.',
  ],
  selfCheck:
    'Request gần nhất của bạn với sếp — có business case cụ thể kèm theo không?',
}

const EC05: EmployeeCaseStudy = {
  id: 'EC05',
  bossType: 'ISTP',
  title: 'Khi cần hướng dẫn rõ hơn',
  context:
    'Hoa nhận task mới từ sếp Nam (ISTP) với brief rất ngắn. Hoa không chắc scope và expectation.',
  whatHappened:
    'Thay vì làm theo guess, Hoa hỏi 3 câu cụ thể: "Deliverable cuối là gì? Deadline nào? Quyết định nào em tự làm được, quyết định nào cần báo anh?" — tất cả trong 1 tin Zalo ngắn.',
  outcome:
    'Nam trả lời nhanh, rõ. Sau khi Hoa nộp kết quả, Nam nói: "Em hỏi đúng câu — tiết kiệm cho cả hai mình."',
  lessons: [
    'ISTP sếp brief ngắn không phải thiếu quan tâm — họ tin bạn figure out được. Hỏi 3 câu cụ thể thay vì hỏi "anh giải thích rõ hơn" = efficient hơn cho cả 2.',
    'Xác nhận trước: scope + deadline + autonomy level. 3 cái này đủ để làm hầu hết tasks.',
  ],
  selfCheck:
    'Lần gần nhất nhận task mơ hồ — bạn có hỏi 3 câu cụ thể đó không?',
}

export const EMPLOYEE_CASE_STUDIES: EmployeeCaseStudy[] = [
  EC01,
  EC02,
  EC03,
  EC04,
  EC05,
  EC06,
  EC07,
  EC08,
  EC09,
  EC10,
  EC11,
  EC12,
  EC13,
  EC14,
  EC15,
  EC16,
]
