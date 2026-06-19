// boss-insight-cards.ts — Hiểu Sếp Tầng 1
// Content: spec-hieu-sep-tang1-2-b2b-12062026-1845.md §1

export interface BossInsightCard {
  bossType: string
  howTheyThink: string
  whatTheyNeed: string[]
  howToApproach: string[]
  sampleScripts: string[]
  whatToAvoid: string
  signalToWatch: string
  selfCheck: string
}

export const BOSS_INSIGHT_CARDS: BossInsightCard[] = [
  {
    bossType: 'ISTJ',
    howTheyThink:
      'Sếp ISTJ làm việc theo quy trình rõ ràng và coi trọng sự nhất quán. Thay đổi đột ngột hoặc làm việc không theo quy trình là thứ họ khó chịu nhất.',
    whatTheyNeed: [
      'Báo cáo đúng format, đúng deadline — không cần hoa mỹ',
      'Thông báo trước khi có thay đổi, dù nhỏ',
      'Không bao giờ để họ bị bất ngờ trước cấp trên',
    ],
    howToApproach: [
      'Khi đề xuất ý kiến: chuẩn bị bằng chứng cụ thể, không chỉ ý kiến cá nhân',
      'Khi gặp vấn đề: báo sớm + kèm phương án xử lý, không chỉ báo vấn đề',
      'Email hoặc Zalo text thường hiệu quả hơn trao đổi miệng khi cần xác nhận',
    ],
    sampleScripts: [
      'Em có một đề xuất nhỏ cho quy trình này. Em đã thử và có số liệu cụ thể — anh/chị xem giúp em 5 phút được không?',
      'Trước khi em làm khác cách cũ, em muốn báo anh/chị trước. Lý do là [X], em thấy nên xác nhận với anh/chị.',
      'Việc này có thể trễ deadline 1 ngày. Em báo sớm để mình cùng tính phương án, không để anh/chị bị động.',
    ],
    whatToAvoid:
      'Đừng thay đổi cách làm mà không thông báo — dù bạn nghĩ cách mới tốt hơn. Thuyết phục bằng dữ liệu trước khi tự ý làm khác.',
    signalToWatch:
      'Im lặng kéo dài sau khi bạn làm gì đó = họ đang xử lý và không hài lòng. Hỏi thẳng tốt hơn chờ đợi.',
    selfCheck: 'Lần trước bạn làm khác quy trình — có thông báo sếp trước không?',
  },
  {
    bossType: 'ISFJ',
    howTheyThink:
      'Sếp ISFJ quan tâm thật sự đến đội và nhớ từng chi tiết về mọi người. Họ thường không nói thẳng khi không hài lòng — thể hiện qua thái độ và im lặng.',
    whatTheyNeed: [
      'Biết team đang ổn — cần được cập nhật, không thích bất ngờ',
      'Được appreciate công sức họ bỏ ra (thường vô hình)',
      'Không khí đội hài hòa, không drama',
    ],
    howToApproach: [
      'Check-in thường xuyên, dù việc đang ổn — "mọi thứ đang chạy tốt ạ" có giá trị',
      'Khi có conflict trong đội: báo sớm thay vì để leo thang',
      'Khi cần góp ý: hỏi riêng, không công khai',
    ],
    sampleScripts: [
      'Anh/chị ơi, em thấy [thành viên] có vẻ mệt gần đây — em không chắc mọi người có ổn không. Em nên làm gì để support ạ?',
      'Em thấy có chút căng giữa [A] và [B] tuần này. Em báo sớm vì em biết anh/chị quan tâm đến từng người — mình xử nhẹ để không leo thang ạ?',
      'Em cảm ơn anh/chị đã [việc cụ thể cho đội] — em thấy không nhiều người nói ra. Em muốn hỏi riêng một việc nhỏ khi anh/chị rảnh ạ?',
    ],
    whatToAvoid:
      'Đừng bỏ qua chi tiết nhỏ họ nhắc — dù có vẻ không quan trọng với bạn. Với ISFJ, chi tiết nhỏ = respect.',
    signalToWatch:
      'Họ đột ngột ít hỏi thăm hơn bình thường = đang có gì đó không ổn với bạn hoặc đội.',
    selfCheck: 'Bạn có nhớ cảm ơn sếp cho những việc nhỏ họ làm cho đội không?',
  },
  {
    bossType: 'INFJ',
    howTheyThink:
      'Sếp INFJ nhìn xa và quan tâm đến ý nghĩa của công việc, không chỉ kết quả. Họ làm việc tốt nhất khi team hiểu WHY, không chỉ WHAT.',
    whatTheyNeed: [
      'Biết bạn care về ý nghĩa của việc đang làm, không chỉ hoàn thành task',
      'Không gian tư duy — không bị interrupt liên tục',
      'Cảm giác team đang tiến về cùng một hướng',
    ],
    howToApproach: [
      'Khi đề xuất: kết nối với mục tiêu lớn hơn, không chỉ lợi ích ngắn hạn',
      'Khi không đồng ý: nêu concern về impact dài hạn, không chỉ bất tiện trước mắt',
      'Cho họ thời gian xử lý trước khi cần quyết định',
    ],
    sampleScripts: [
      'Em muốn hiểu rõ hướng lớn của việc này — để em làm đúng ý nghĩa, không chỉ xong task.',
      'Em có một lo lắng về tác động dài hạn ở [X]. Anh/chị cho em xin ý kiến khi anh/chị suy nghĩ xong nhé?',
      'Em có một observation: [X] có thể ảnh hưởng đến hướng team 6 tháng tới — em muốn chia sẻ sớm, không cần quyết ngay ạ.',
    ],
    whatToAvoid:
      'Đừng push họ quyết định nhanh khi vấn đề còn mơ hồ. INFJ cần thấy rõ hướng đi trước khi commit.',
    signalToWatch:
      'Họ trở nên đặc biệt im lặng hoặc nói ít đi = đang xử lý vấn đề lớn hoặc conflict nội tâm.',
    selfCheck: 'Bạn có biết sếp đang nhìn team mình đi đến đâu trong 1 năm tới không?',
  },
  {
    bossType: 'INTJ',
    howTheyThink:
      'Sếp INTJ đã có kế hoạch và lý do cho hầu hết quyết định — nhưng không phải lúc nào cũng giải thích. Họ coi trọng năng lực và autonomy hơn là sự ngoan ngoãn.',
    whatTheyNeed: [
      'Kết quả, không lý do tại sao không có kết quả',
      'Bạn tự giải quyết được vấn đề trong tầm của mình',
      'Khi cần hỏi: đã nghĩ trước, không hỏi những gì tự làm được',
    ],
    howToApproach: [
      'Khi báo vấn đề: kèm 1-2 phương án đề xuất — không chỉ báo rồi chờ',
      'Khi không hiểu quyết định của sếp: hỏi thẳng "anh/chị có thể giải thích logic không?" — INTJ thường appreciate câu hỏi thẳng hơn đoán mò',
      'Email/doc > trao đổi miệng cho việc phức tạp',
    ],
    sampleScripts: [
      'Em có một góc nhìn khác về cách tiếp cận này. Em nghĩ nó tối ưu hơn ở điểm [X] — anh/chị cho em trình bày 2 phút?',
      'Em muốn hiểu rõ mục tiêu cuối để làm đúng hướng ngay từ đầu, đỡ phải sửa nhiều lần. Đích mình nhắm tới là gì ạ?',
      'Phần này em thấy có rủi ro ở [X]. Em đề xuất [Y] để giảm thiểu — anh/chị thấy có hợp lý không?',
    ],
    whatToAvoid:
      'Đừng hỏi câu hỏi mà bạn có thể tự tìm ra câu trả lời. INTJ đọc được sự thiếu chuẩn bị rất nhanh.',
    signalToWatch:
      'Họ trả lời email/tin nhắn của bạn rất ngắn = bận hoặc không hài lòng. Cần phân biệt 2 cái này.',
    selfCheck:
      'Lần gần nhất bạn gặp sếp — bạn đã chuẩn bị đủ để không mất thời gian của họ chưa?',
  },
  {
    bossType: 'ISTP',
    howTheyThink:
      'Sếp ISTP quan tâm đến việc gì hoạt động thực tế, không phải lý thuyết đẹp. Họ ít quan tâm đến quy trình nếu có cách nhanh hơn và hiệu quả hơn.',
    whatTheyNeed: [
      'Tự lo được công việc của mình — không cần cầm tay chỉ việc',
      'Không drama, không politics — chỉ cần việc xong',
      'Không gian để xử lý vấn đề theo cách của họ',
    ],
    howToApproach: [
      'Ngắn gọn, cụ thể, không vòng vo',
      'Khi có vấn đề: mô tả symptom cụ thể, không phân tích cảm xúc',
      'Nếu muốn thay đổi gì: prove it works, đừng chỉ argue it should work',
    ],
    sampleScripts: [
      'Em thử cách [X] — chạy được, tiết kiệm [Y]. Anh/chị xem nhanh giúp em có nên áp dụng tiếp không?',
      'Em kẹt ở [triệu chứng cụ thể]. Em đề xuất [A] hoặc [B] — anh/chị chọn hướng nào?',
      'Em xin 10 phút — em mang kết quả thực tế, không cần meeting dài ạ.',
    ],
    whatToAvoid:
      'Đừng kéo họ vào meetings dài không cần thiết. ISTP mất patience với discussion không đi đến đâu.',
    signalToWatch:
      'Họ bắt đầu handle mọi thứ một mình, không hỏi bạn nữa = mất tin tưởng bạn có thể handle.',
    selfCheck:
      'Bạn có đang giải quyết vấn đề trong tầm của mình, hay thường đẩy lên cho sếp?',
  },
  {
    bossType: 'ISFP',
    howTheyThink:
      'Sếp ISFP quan tâm thật sự đến từng người trong đội, coi trọng sự chân thành hơn năng lực thuần túy. Họ làm việc tốt nhất trong môi trường không áp lực và tin tưởng lẫn nhau.',
    whatTheyNeed: [
      'Biết team đang ổn và được care',
      'Không gian sáng tạo — không bị box vào quy trình cứng nhắc',
      'Cảm giác công việc có ý nghĩa với người thật',
    ],
    howToApproach: [
      'Chia sẻ genuine về những gì bạn đang làm — không chỉ báo cáo kết quả khô',
      'Khi cần góp ý: hỏi theo kiểu "anh/chị thấy em có thể làm khác gì không?"',
      'Khi có conflict: tiếp cận trực tiếp, riêng tư, không qua bên thứ ba',
    ],
    sampleScripts: [
      'Em muốn xin ý kiến anh/chị về việc này, không gấp đâu ạ — khi nào anh/chị tiện thì cho em biết nhé.',
      'Em cảm thấy có gì đó chưa ổn trong cách mình đang làm. Em chia sẻ để mình cùng nhìn lại, được không anh/chị?',
      'Em cảm ơn anh/chị đã để em tự chủ phần này. Có một chỗ em muốn hỏi thêm cho chắc.',
    ],
    whatToAvoid:
      'Đừng tạo áp lực bằng deadline liên tục hoặc urgent requests không cần thiết. ISFP cần không gian để làm tốt.',
    signalToWatch:
      'Họ bắt đầu ít share về cảm nhận cá nhân = đang cảm thấy unsafe hoặc không được appreciated.',
    selfCheck: 'Bạn có biết sếp care về điều gì nhất trong công việc này không?',
  },
  {
    bossType: 'INFP',
    howTheyThink:
      'Sếp INFP dẫn dắt bằng giá trị và tầm nhìn về ý nghĩa, không phải bằng authority hay rule. Họ rất nhạy cảm với sự thiếu chân thành — detect được hypocrisy khá nhanh.',
    whatTheyNeed: [
      'Biết team đang làm việc vì lý do đúng, không chỉ vì được trả tiền',
      'Không gian sáng tạo và tự chủ',
      'Cảm giác mọi người đang cùng tin vào thứ gì đó',
    ],
    howToApproach: [
      'Khi đề xuất: kết nối với giá trị, không chỉ ROI',
      'Khi không đồng ý: nêu concern chân thành, không strategic',
      'Cho họ thời gian — đừng push quyết định nhanh',
    ],
    sampleScripts: [
      'Em thấy việc này quan trọng với em vì [lý do]. Em muốn nói thật concern của mình trước khi mình quyết.',
      'Em không chắc việc này còn khớp với giá trị em tin — anh/chị giúp em hiểu ý nghĩa của nó với mình được không ạ?',
      'Em cần thêm chút thời gian để cân nhắc cho thật — em muốn làm việc có ý nghĩa với mình, không muốn đi cho xong ạ.',
    ],
    whatToAvoid:
      'Đừng nói những gì bạn nghĩ sếp muốn nghe thay vì thật. INFP detect được nhanh và mất trust ngay.',
    signalToWatch:
      'Họ bắt đầu nói ít về vision, nhiều về task cụ thể = đang disengaged hoặc kiệt sức.',
    selfCheck: 'Bạn có đang honest với sếp về những gì bạn thật sự nghĩ không?',
  },
  {
    bossType: 'INTP',
    howTheyThink:
      'Sếp INTP suy nghĩ sâu trước khi quyết định — có vẻ chậm nhưng lý do thường rất solid. Họ appreciate được challenge bằng logic, không thích sự vâng lời mù quáng.',
    whatTheyNeed: [
      'Bạn tự suy nghĩ thay vì chỉ làm theo lệnh',
      'Không gian tư duy không bị interrupt',
      'Ít small talk, nhiều substance',
    ],
    howToApproach: [
      'Khi có câu hỏi: tự nghĩ trước, đặt câu hỏi cụ thể không phải câu hỏi chung',
      'Khi không đồng ý: argue bằng logic, không bằng cảm xúc hoặc authority',
      'Async (email/doc) thường tốt hơn sync meeting',
    ],
    sampleScripts: [
      'Em đã nghĩ qua vấn đề này — em có 2 giả thuyết và một chỗ em chưa chắc. Anh/chị phản biện giúp em chỗ [X]?',
      'Em không đồng ý ở điểm [X] vì [logic]. Em gửi doc ngắn — anh/chị xem khi tiện nhé.',
      'Em muốn hỏi cụ thể: với ràng buộc [Y], anh/chị ưu tiên [A] hay [B]?',
    ],
    whatToAvoid:
      'Đừng expect họ sẽ check-in thường xuyên hoặc manage bạn chặt. Nếu bạn cần guidance, chủ động hỏi.',
    signalToWatch:
      'Họ bắt đầu hỏi nhiều câu hỏi phân tích về việc bạn làm = đang lo ngại về hướng đi.',
    selfCheck: 'Bạn có mang vấn đề đã được nghĩ kỹ khi gặp sếp, hay mang vấn đề thô?',
  },
  {
    bossType: 'ESTP',
    howTheyThink:
      'Sếp ESTP quyết định nhanh và thích action hơn analysis. Họ dễ thay đổi kế hoạch khi situation thay đổi — thứ bạn cần adapt theo.',
    whatTheyNeed: [
      'Team phản ứng nhanh khi có thay đổi',
      'Kết quả thực tế, không lý thuyết',
      'Năng lượng và sự chủ động từ đội',
    ],
    howToApproach: [
      'Ngắn gọn, thực tế, sẵn sàng quyết định nhanh',
      'Khi có idea: pitch ngắn với kết quả kỳ vọng cụ thể',
      'Khi không đồng ý: nói thẳng và nhanh — không để sau',
    ],
    sampleScripts: [
      'Anh/chị ơi nhanh em báo: [kết quả/số]. Em cần quyết trong hôm nay — mình chốt [A] hay [B]?',
      'Em đã thử [X] — chạy được ngay, kết quả [Y]. Em đang test thêm [Z], nếu ổn em report lại cuối ngày ạ.',
      'Em thấy plan đổi — em adapt theo. Anh/chị xác nhận giúp em phần trọng tâm là gì?',
    ],
    whatToAvoid:
      'Đừng mang slide deck dài hoặc report dày khi meeting. ESTP muốn bullet points và conversation, không phải presentation.',
    signalToWatch:
      'Họ bắt đầu handle trực tiếp việc bạn đang làm = không hài lòng với tốc độ hoặc kết quả.',
    selfCheck: 'Lần gần nhất sếp thay đổi kế hoạch — bạn phản ứng như thế nào?',
  },
  {
    bossType: 'ESFP',
    howTheyThink:
      'Sếp ESFP tạo ra năng lượng và không khí tốt cho đội — nhưng cần được appreciated ngược lại. Họ làm việc tốt nhất khi đội engaged và vui, không phải chỉ productive.',
    whatTheyNeed: [
      'Đội show enthusiasm, không chỉ compliance',
      'Được appreciate khi họ tạo ra không khí tốt',
      'Không khí đội không quá serious và rigid',
    ],
    howToApproach: [
      'Show enthusiasm thật với dự án — dù chỉ 1-2 câu',
      'Khi cần góp ý: trong không khí thoải mái, không quá trang trọng',
      'Celebrate small wins với họ — họ appreciate điều này',
    ],
    sampleScripts: [
      'Em rất hào hứng với phần này! Em có một góp ý nhỏ — mình nói nhanh được không anh/chị?',
      'Team hôm nay vibe rất tốt ạ! Em muốn chia sẻ nhanh một win nhỏ — anh/chị nghe em 1 phút được không?',
      'Em thấy không khí hơi nặng khi làm [việc] — em muốn làm nó vui hơn một chút, anh/chị có idea nào không ạ?',
    ],
    whatToAvoid:
      'Đừng quá rigid về quy trình khi flexibility có thể cho kết quả tốt hơn. ESFP bị frustrate bởi "phải làm theo đúng quy trình" không có lý do thực tế.',
    signalToWatch:
      'Họ bắt đầu ít đùa và ít tương tác = đang căng thẳng hoặc có gì đó trong đội không ổn.',
    selfCheck: 'Bạn có đang contribute vào không khí tích cực của đội không?',
  },
  {
    bossType: 'ENFP',
    howTheyThink:
      'Sếp ENFP có nhiều ý tưởng và muốn đội cùng excited về possibilities. Họ có thể thay đổi hướng khi có ý tưởng mới — đây là style, không phải thiếu consistency.',
    whatTheyNeed: [
      'Đội engage với ý tưởng, không chỉ execute',
      'Cảm giác mọi người đang phát triển và học được gì đó',
      'Không bị kéo xuống bởi detail quá sớm',
    ],
    howToApproach: [
      'Khi sếp share ý tưởng: build on it trước, filter sau',
      'Khi cần bring them back to reality: frame như "để làm được việc này, mình cần xử lý X trước"',
      'Check-in về energy và direction thường xuyên — họ appreciate sự tương tác',
    ],
    sampleScripts: [
      'Em rất thích hướng mình đang đi. Em có một ý nữa muốn chia sẻ — anh/chị nghe thử xem có hợp không nhé?',
      'Dạo này em hơi đuối với phần việc này. Em muốn nói thật để mình tìm cách, chứ không muốn cố mà mất lửa.',
      'Em cần một chút rõ ràng về ưu tiên tuần này — nhiều việc hay quá nên em muốn chắc mình làm đúng thứ quan trọng nhất.',
    ],
    whatToAvoid:
      'Đừng respond với "nhưng sẽ không work vì..." ngay lập tức. ENFP cần không gian explore trước khi evaluate.',
    signalToWatch:
      'Họ bắt đầu ít share ý tưởng mới = đang bored hoặc disengaged với team/project.',
    selfCheck:
      'Bạn có đang giúp sếp land ideas vào thực tế, hay chỉ execute hoặc chỉ challenge?',
  },
  {
    bossType: 'ENTP',
    howTheyThink:
      "Sếp ENTP thách thức ý tưởng để làm chúng tốt hơn — devil's advocate là tool, không phải attack. Họ respect người có thể argue back bằng logic.",
    whatTheyNeed: [
      'Team không sụp đổ khi bị thách thức — có thể bảo vệ ý kiến',
      'Ý tưởng mới, không phải cách cũ được wrap khác',
      'Intellectual engagement, không chỉ execution',
    ],
    howToApproach: [
      'Khi bị challenge: argue back cụ thể, không rút lui',
      'Khi đề xuất: expect sẽ bị hỏi ngược — chuẩn bị sẵn',
      'Debate và discussion = tốt với ENTP, không phải conflict',
    ],
    sampleScripts: [
      'Em biết điểm yếu của ý mình là [X] — em đã có cách xử lý [Y]. Anh/chị thấy còn lỗ hổng nào không?',
      'Em không đồng ý ở [X] vì [lý do cụ thể] — anh/chị thử bẻ gãy ý em xem, em sẵn sàng defend hoặc đổi nếu logic đứng ạ.',
      'Trước khi mình chốt, em muốn thử một góc nhìn khác — anh/chị cho em 3 phút?',
    ],
    whatToAvoid:
      'Đừng agree với mọi thứ sếp nói chỉ để tránh conflict. ENTP không respect sự vâng lời — họ muốn team thật sự suy nghĩ.',
    signalToWatch:
      'Họ ngừng challenge bạn = hoặc họ đã convinced, hoặc đã give up kỳ vọng vào bạn.',
    selfCheck: 'Lần gần nhất sếp challenge ý kiến của bạn — bạn phản ứng thế nào?',
  },
  {
    bossType: 'ESTJ',
    howTheyThink:
      'Sếp ESTJ coi trọng kết quả, deadline, và professional conduct. Họ clear về expectation — và expect bạn cũng clear về trách nhiệm của mình.',
    whatTheyNeed: [
      'Deadline được giữ — không phải hầu hết, mà tất cả',
      'Update proactive, không phải đợi bị hỏi',
      'Professional conduct trong mọi tình huống',
    ],
    howToApproach: [
      'Báo cáo đúng format, đúng thời hạn',
      'Khi có rủi ro miss deadline: báo sớm + kèm plan — không đợi đến ngày cuối',
      'Khi không đồng ý: nêu concern cụ thể, professional, không emotional',
    ],
    sampleScripts: [
      'Việc này có nguy cơ trễ [ngày]. Em báo sớm và đề xuất plan [A/B] — anh/chị chọn hướng xử lý giúp em.',
      'Em nhận trách nhiệm phần [X] đã miss. Bước tiếp theo em sẽ [Y] trước [deadline].',
      'Anh/chị ơi, em muốn confirm lại deadline và format báo cáo phần [X] — em sẽ gửi draft vào [ngày] để anh/chị review đúng quy trình ạ.',
    ],
    whatToAvoid:
      'Đừng bào chữa khi sai — nhận trách nhiệm và nêu plan fix. ESTJ evaluate bạn qua cách bạn xử lý failure, không chỉ success.',
    signalToWatch:
      'Họ bắt đầu cc thêm người vào email với bạn = đang document hoặc escalate.',
    selfCheck: 'Deadline gần nhất bạn có — bạn có update sếp proactively chưa?',
  },
  {
    bossType: 'ESFJ',
    howTheyThink:
      'Sếp ESFJ quan tâm sâu đến sự hài hòa trong đội và wellbeing của từng người. Họ nhớ rất nhiều về mọi người — và expect được reciprocate.',
    whatTheyNeed: [
      'Không khí đội tích cực, không có drama ngầm',
      'Biết mọi người đang ổn — cả về công việc lẫn cá nhân',
      'Được appreciate khi họ bỏ công sức cho đội',
    ],
    howToApproach: [
      'Check-in thường xuyên, chia sẻ cả update cá nhân nhẹ (không chỉ work)',
      'Khi có tension trong đội: nói với sếp sớm thay vì để tự xử',
      'Appreciate explicitly khi sếp làm gì đó cho đội',
    ],
    sampleScripts: [
      'Anh/chị ơi, em muốn hỏi nhanh: mọi người trong đội có ổn không ạ? Em sẵn sàng giúp giữ không khí tốt nếu anh/chị cần.',
      'Anh/chị ơi, em thấy team đang có chút căng thẳng gần đây ở [X] — em muốn báo sớm để mình cùng giữ mọi người ổn, không để drama ngầm kéo dài ạ.',
      'Em cảm ơn anh/chị đã [việc cụ thể cho đội]. Em muốn hỏi riêng: mình có cách nào em support đội tốt hơn khi anh/chị rảnh không ạ?',
    ],
    whatToAvoid:
      'Đừng bỏ qua "việc nhỏ" như birthday, sự kiện team — ESFJ đặt nhiều ý nghĩa vào đây.',
    signalToWatch:
      'Họ hỏi thăm ít hơn bình thường = đang căng thẳng hoặc có gì đó trong đội làm họ không ổn.',
    selfCheck:
      'Bạn có biết sếp đang căng thẳng về gì không — hay bạn chỉ biết phần công việc của mình?',
  },
  {
    bossType: 'ENFJ',
    howTheyThink:
      'Sếp ENFJ lead bằng vision và care thật sự về sự phát triển của từng người trong đội. Họ invest vào bạn — và cần biết sự đầu tư đó đang có ý nghĩa.',
    whatTheyNeed: [
      'Thấy team đang grow và phát triển',
      'Phản hồi ngược — sếp muốn biết mình đang dẫn dắt tốt không',
      'Cảm giác mọi người đang đi cùng một hướng và care về nó',
    ],
    howToApproach: [
      'Share learning và growth của bạn với sếp — họ genuinely muốn nghe',
      'Khi có concern về hướng đi: nêu sớm, không chờ đến cuối',
      'Khi sếp hỏi "bạn thấy thế nào?" — trả lời thật, không chỉ "tốt ạ"',
    ],
    sampleScripts: [
      'Em học được [X] tuần này nhờ anh/chị — em muốn chia sẻ và hỏi thêm hướng phát triển.',
      'Em có concern thật về hướng [Y] — em nói sớm vì em quan tâm đến việc mình đang đi cùng nhau.',
      'Khi anh/chị hỏi em thấy thế nào — em nói thật: em thấy [quan sát], em đề xuất [X].',
    ],
    whatToAvoid:
      'Đừng chỉ nói những gì sếp muốn nghe — ENFJ detect được và disappointed hơn.',
    signalToWatch:
      'Họ bắt đầu ít hỏi về bạn cá nhân hơn = đang overwhelmed hoặc disengaged.',
    selfCheck: 'Sếp đã hỏi về career goals của bạn — bạn có chia sẻ thật không?',
  },
  {
    bossType: 'ENTJ',
    howTheyThink:
      'Sếp ENTJ biết họ muốn đi đâu và expect team follow với tốc độ cao. Họ delegate rộng — nhưng expect ownership thật sự, không phải chỉ execution.',
    whatTheyNeed: [
      'Bạn own kết quả, không chỉ task',
      'Không cần micromanage — bạn tự figure out how',
      'Khi có vấn đề: mang solution, không mang vấn đề',
    ],
    howToApproach: [
      'Khi nhận task: xác nhận rõ success looks like gì — không assume',
      'Khi hit obstacle: xử lý hoặc đề xuất plan trước khi escalate',
      'Khi không đồng ý với quyết định: nêu concern cụ thể, một lần, rõ ràng',
    ],
    sampleScripts: [
      'Em xác nhận: thành công với task này là [X] đúng không ạ? Em muốn chốt trước khi làm.',
      'Em gặp obstacle ở [Y] — em đề xuất [plan]. Em escalate vì cần quyết định của anh/chị.',
      'Anh/chị ơi, em đang gặp obstacle ở [Z] — em đã thử [A] và [B], em thấy [B] promising hơn. Em định làm [C], anh/chị có veto không ạ?',
    ],
    whatToAvoid:
      "Đừng cần sếp hold your hand qua từng bước. ENTJ delegate vì expect bạn capable — proving you're not là fastest way mất trust.",
    signalToWatch:
      'Họ bắt đầu hỏi chi tiết về việc bạn làm = đang lo ngại về execution.',
    selfCheck: 'Task gần nhất bạn nhận — bạn có own kết quả hay chỉ own process?',
  },
]
