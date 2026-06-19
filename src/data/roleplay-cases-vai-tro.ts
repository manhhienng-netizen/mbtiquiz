// roleplay-cases-vai-tro-16062026-1420.ts
// TNCB Work — Case Study Chuyển Vai Trò
// 16/06/2026 · Master PM
// 5 case VT-01→05 · pattern CaseStudyCard step reveal
// Merge vào roleplay-case-studies.ts · role: 'VT'

export const VAI_TRO_CASES = [

  {
    id: 'VT-01',
    role: 'VT',
    title: 'Sếp Bạn Bè Cũ',
    tags: ['peer-to-boss', 'friendship', 'authority', 'VN-context'],
    hook: `Ba tháng trước bạn và Hùng cùng than thở về sếp cũ trong giờ ăn trưa. Tuần này bạn là sếp mới của Hùng.\n\nHôm nay là buổi 1-1 đầu tiên. Hùng ngồi xuống, cười: "Thôi ông/bà boss, bắt đầu đi."`,
    setup: `Câu đó có thể là joke. Hoặc Hùng đang test xem bạn có thay đổi không. Hoặc cả hai.\n\nNếu quá formal → mất người bạn, tạo awkwardness kéo dài. Nếu quá casual → khó set authority khi cần — và sẽ cần.\n\nBạn mở đầu buổi 1-1 này thế nào?`,
    choices: [
      {
        id: 'A',
        label: 'Nói thẳng về sự thay đổi',
        action: '"Mình cũng thấy kỳ nha Hùng. Mình vẫn là bạn — nhưng mình cũng cần cả hai mình rõ hơn về một số thứ trong công việc. Hùng có muốn nói về điều đó không?"',
      },
      {
        id: 'B',
        label: 'Giữ tone thân thiện, vào việc',
        action: '"Ha đúng rồi. Thôi mình nói về Q4 của Hùng đi — Hùng đang cảm thấy thế nào về project hiện tại?"',
      },
      {
        id: 'C',
        label: 'Set authority rõ ngay',
        action: '"Mình muốn buổi hôm nay nói về kỳ vọng của mình với team — bao gồm Hùng. Có một số thứ thay đổi từ bây giờ."',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Hùng bất ngờ, gật đầu: "Ừ mình cũng đang nghĩ về điều đó." Conversation trở nên thật hơn.',
        later: 'Hai người có norm rõ hơn — Hùng biết khi nào là "bạn" và khi nào là "sếp-nhân viên." Vẫn awkward đôi chỗ, nhưng có nền tảng.',
      },
      {
        choiceId: 'B',
        immediate: 'Hùng thoải mái. Buổi 1-1 diễn ra bình thường.',
        later: 'Ba tuần sau bạn cần góp ý Hùng về kết quả bàn giao không đạt. Hùng phản ứng như đang nói chuyện với bạn bè: "Ý mày là sao, mày biết tao làm tốt mà." Chưa có nền tảng để xử lý.',
      },
      {
        choiceId: 'C',
        immediate: 'Hùng ngồi thẳng lại, vẻ ngạc nhiên. Lắng nghe nhưng mắt ít warm hơn.',
        later: 'Hùng formal hơn — nhưng cũng distant hơn. Bạn có authority, mất người đồng minh tự nhiên trong team.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn C — rõ ràng ngay từ đầu. Đúng về intent nhưng "kỳ vọng" trong buổi 1-1 đầu với bạn cũ nghe như HR script. Hùng sẽ cảm thấy mất người bạn, không phải có thêm sếp tốt.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — giữ friendship, để transition tự xảy ra. Pleasant hôm nay nhưng tạo cuộc trò chuyện khó hơn sau này. Transition peer-to-boss cần được nói ra — càng muộn càng khó.',
      },
      {
        group: 'NF',
        text: 'Bạn muốn chọn A — thật, ấm, thừa nhận thực tế. Đúng hướng. Điều cần lưu ý: "Hùng có muốn nói không?" trao quyền cho Hùng — đây là điểm mạnh của A.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là role transition problem cần giải quyết một lần rõ ràng. A hiệu quả nhất. Điều cần lưu ý: đừng chỉ solve cái role — giữ cái người.',
      },
    ],
    mirrorMoment: 'Bạn đã từng phải thay đổi cách relate với ai đó khi vai trò thay đổi chưa? Điều gì giúp transition đó dễ hơn — hay khó hơn?',
  },

  {
    id: 'VT-02',
    role: 'VT',
    title: 'Chuyên Gia Giỏi Không Muốn Làm Sếp',
    tags: ['expert-to-manager', 'identity', 'reluctant-leader', 'craft'],
    hook: `Bạn là developer giỏi nhất team. Sếp vừa thông báo bạn được lên team lead — 8 người, bắt đầu tháng sau.\n\nVấn đề: bạn không muốn làm team lead. Bạn muốn code.`,
    setup: `Từ chối thì sợ mất cơ hội, mất lòng sếp. Nhận thì sẽ dành phần lớn thời gian họp, review, và xử lý người — không phải làm thứ bạn giỏi và thích.\n\nSếp đang chờ câu trả lời.\n\nBạn nói gì?`,
    choices: [
      {
        id: 'A',
        label: 'Nói thật lo ngại, thương lượng điều kiện',
        action: '"Cảm ơn anh/chị tin tưởng. Em thật sự muốn hỏi thẳng: em có thể vẫn giữ 60% thời gian cho technical work không? Em lo nhất là xa rời kỹ thuật — đó là thứ em làm tốt nhất."',
      },
      {
        id: 'B',
        label: 'Nhận, thử xem thế nào',
        action: '"Dạ em nhận. Em sẽ cố gắng hết sức." (trong đầu: để xem thử vài tháng có hợp không)',
      },
      {
        id: 'C',
        label: 'Từ chối thẳng',
        action: '"Cảm ơn anh/chị, nhưng em nghĩ mình phù hợp hơn ở vị trí technical. Em muốn tiếp tục đóng góp theo hướng đó."',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Sếp suy nghĩ, rồi nói: "Anh/chị cũng không muốn mất kỹ thuật của em. Mình thử structure lại xem sao."',
        later: 'Thương lượng ra được vai trò "tech lead + chuyên gia kỹ thuật" — 40% quản lý, 60% code. Không hoàn hảo nhưng bạn kiểm soát được đánh đổi.',
      },
      {
        choiceId: 'B',
        immediate: 'Sếp vui. Bạn bắt đầu nhận lịch họp từ ngày hôm sau.',
        later: 'Tháng thứ 2: bạn code ít hơn 80%. Tháng thứ 4: bạn nhớ cảm giác giải quyết một bug khó mà không còn cơ hội làm. Chưa biết mình có muốn ở lại không.',
      },
      {
        choiceId: 'C',
        immediate: 'Sếp gật đầu, hơi ngạc nhiên. "Ừ được, anh/chị hiểu."',
        later: 'Lần sau có promotion khác, sếp không offer bạn nữa — không phải vì giận, mà vì "em ấy không muốn leadership." Bạn được làm thứ mình thích, nhưng career ceiling thấp hơn.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng phân tích đánh đổi và chọn cách tối ưu. A cho bạn negotiate điều kiện dựa trên data thật (bạn muốn gì). Điều cần lưu ý: "60% technical" là số cụ thể — sếp có thể negotiate được.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng nhận (B) vì không muốn làm sếp thất vọng. Điều cần lưu ý: nhận khi không muốn thường dẫn đến làm không hết mình — và team cảm nhận được điều đó.',
      },
      {
        group: 'NF',
        text: 'Bạn cảm thấy xung đột giữa muốn phát triển và muốn giữ công việc ý nghĩa. A là cách nói thật về điều đó. Điều cần lưu ý: leadership không nhất thiết có nghĩa là xa rời kỹ thuật — có thể negotiate.',
      },
      {
        group: 'NT',
        text: 'Bạn biết rõ mình muốn gì và C là câu trả lời thẳng nhất. Điều cần lưu ý: C đóng cửa, A mở ra negotiation. Nếu bạn thật sự không muốn bất kỳ management nào — C đúng. Nếu chỉ lo mất kỹ thuật — A là cách thử.',
      },
    ],
    mirrorMoment: 'Bạn có role hoặc trách nhiệm nào đang làm mà thật ra không muốn không? Bạn đã nói ra điều đó chưa — hay đang chịu đựng?',
  },

  {
    id: 'VT-03',
    role: 'VT',
    title: 'Manager Mới — Team Chưa Tin',
    tags: ['new-manager', 'credibility', 'trust-building', 'outsider'],
    hook: `Tuần đầu làm manager mới của team 6 người. Bạn được hire từ ngoài vào — team đã có người nội bộ ứng tuyển vị trí này và không được chọn.\n\nTrong buổi họp team đầu tiên, không khí lạnh. Câu hỏi đến rất ít. Sau buổi họp, bạn thấy 2 người đứng nói chuyện và dừng lại khi bạn đi qua.`,
    setup: `Bạn biết team chưa tin mình — hợp lý thôi. Bạn chưa prove gì cả, và người họ muốn làm sếp không được chọn.\n\nNếu bạn cố tỏ ra authority ngay → càng tạo khoảng cách. Nếu bạn quá dễ tính → họ không coi trọng.\n\nTuần đầu này bạn ưu tiên làm gì?`,
    choices: [
      {
        id: 'A',
        label: 'Gặp riêng từng người — nghe trước',
        action: 'Xếp lịch 1-1 với từng thành viên trong tuần đầu: "Mình muốn hiểu bạn đang làm gì, thách thức là gì, và bạn cần gì từ mình — mình nghe là chính."',
      },
      {
        id: 'B',
        label: 'Prove năng lực bằng việc cụ thể',
        action: 'Tìm 1 vấn đề team đang stuck và giải quyết ngay trong tuần đầu — cho team thấy bạn làm được việc.',
      },
      {
        id: 'C',
        label: 'Set kỳ vọng và quy trình rõ từ đầu',
        action: 'Gửi email tóm tắt cách bạn sẽ lead team — tần suất họp, cách báo cáo, kỳ vọng — để mọi người biết họ đang làm việc với ai.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Từng cuộc 1-1: ban đầu ngắn và formal. Đến người thứ 4, một người bắt đầu nói thật về friction trong team.',
        later: 'Cuối tuần 2, bạn có bức tranh rõ về team. Một vài người bắt đầu chủ động hơn. Người được đề cử nội bộ vẫn giữ khoảng cách nhưng không thù địch.',
      },
      {
        choiceId: 'B',
        immediate: 'Bạn giải quyết một technical issue team stuck 2 tuần trong 1 ngày. Team ngạc nhiên.',
        later: 'Credibility kỹ thuật được thiết lập nhanh. Nhưng một số người vẫn chưa biết bạn lead thế nào — chỉ biết bạn giỏi kỹ thuật.',
      },
      {
        choiceId: 'C',
        immediate: 'Email được đọc. Không có reply.',
        later: 'Team biết quy trình nhưng vẫn chưa biết bạn là ai. Sự lạnh lùng không giảm — vì email không tạo được connection.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn B hoặc C — prove năng lực hoặc set quy trình. Cả hai hợp lý nhưng bỏ qua bước đầu tiên quan trọng nhất: nghe. A cho bạn context để B và C hiệu quả hơn.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn A — kết nối trước, build trust. Đúng hướng. Điều cần lưu ý: trong 1-1, đừng chỉ nghe — ghi lại và follow up. Điều đó cho thấy bạn nghiêm túc với những gì họ nói.',
      },
      {
        group: 'NF',
        text: 'Bạn muốn mọi người thật sự tin tưởng bạn, không chỉ chấp nhận. A là bước đúng đắn. Điều cần lưu ý: trust xây dựng qua nhiều tháng, không phải tuần đầu. Kiên nhẫn với quá trình.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy A cho nhiều data nhất để quyết định các bước tiếp theo. Đúng về logic. Điều cần lưu ý: trong 1-1, đừng phân tích quá nhiều — nghe và acknowledge cảm xúc của người kia trước.',
      },
    ],
    mirrorMoment: 'Bạn đã từng là "người mới" trong một nhóm đã có culture riêng chưa? Điều gì khiến bạn bắt đầu tin tưởng người dẫn dắt nhóm đó?',
  },

  {
    id: 'VT-04',
    role: 'VT',
    title: 'Team Lớn Hơn Kỹ Năng',
    tags: ['stretch-role', 'overwhelm', 'ask-for-help', 'impostor'],
    hook: `Bạn vừa được giao quản lý team 12 người — gấp đôi team cũ. Sếp nói "tin em làm được." Tuần đầu bạn nhận ra: mình chưa bao giờ manage nhiều hơn 5 người.\n\nThứ Tư, có 3 mâu thuẫn trong team cùng lúc, 1 người xin nghỉ phép dài, và deadline project lớn vào thứ Sáu.`,
    setup: `Bạn thật sự quá tải. Nhưng nếu admit với sếp → sếp có thể nghĩ mình không đủ năng lực. Nếu cứ cố xử lý một mình → chất lượng sẽ kém.\n\nBạn làm gì?`,
    choices: [
      {
        id: 'A',
        label: 'Nói thật với sếp, xin hỗ trợ',
        action: '"Anh/chị ơi, tuần này em đang xoay xở nhiều thứ cùng lúc và thấy một số chỗ chưa chắc mình xử lý tốt nhất. Em muốn hỏi anh/chị kinh nghiệm xử lý [vấn đề cụ thể] — anh/chị có 15 phút không?"',
      },
      {
        id: 'B',
        label: 'Prioritize và bỏ bớt',
        action: 'Tự sắp xếp ưu tiên: deadline thứ Sáu là số 1, mâu thuẫn xử lý sau deadline, người xin nghỉ duyệt ngay để nhẹ đầu.',
      },
      {
        id: 'C',
        label: 'Làm hết, thức khuya nếu cần',
        action: 'Cố xử lý tất cả — họp với từng người đang có mâu thuẫn, giải quyết xin nghỉ, review kết quả bàn giao. Tối về mới nghỉ.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Sếp không thất vọng. Nói: "Ừ mình cũng thấy em đang bị kéo căng — đây là cách anh/chị handle lần đầu manage team lớn..."',
        later: 'Bạn có thêm cách tiếp cận để xử lý. Sếp bắt đầu hỏi thăm chủ động hơn. Relationship tốt hơn vì bạn đã thành thật đúng lúc.',
      },
      {
        choiceId: 'B',
        immediate: 'Bạn focus được. Deadline qua được. Conflict tạm gác.',
        later: 'Conflict không tự giải quyết — tuần sau vẫn còn, có thêm một người bực bội vì cảm thấy bị bỏ qua. Triage đúng nhưng cần follow up.',
      },
      {
        choiceId: 'C',
        immediate: 'Bạn xử lý được tất cả — chất lượng không cao nhất nhưng đủ.',
        later: 'Cuối tháng bạn kiệt sức. Pattern "làm hết một mình" không bền khi team 12 người. Một số quyết định tuần đó cần sửa lại.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn B — sắp xếp ưu tiên, prioritize. Đúng về ngắn hạn. Điều cần lưu ý: mâu thuẫn không biến mất khi bạn ignore — cần lịch follow up cụ thể sau deadline.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn C — không muốn ai cảm thấy bị bỏ qua. Điều cần lưu ý: bạn không thể là "người giải quyết hết" cho 12 người. Học cách giao việc là kỹ năng quan trọng nhất của role này.',
      },
      {
        group: 'NF',
        text: 'Bạn nhận ra mình quá tải và muốn làm đúng. A là bước dũng cảm và đúng đắn. Điều cần lưu ý: xin hỗ trợ không phải yếu đuối — đó là cách manager giỏi xây dựng mạng lưới hỗ trợ.',
      },
      {
        group: 'NT',
        text: 'Bạn phân tích nhanh và thấy A cho ROI cao nhất — thêm kiến thức + strengthen relationship với sếp. Điều cần lưu ý: khi hỏi sếp, hãy đến với vấn đề cụ thể, không phải "em không biết phải làm gì."',
      },
    ],
    mirrorMoment: 'Lần gần nhất bạn thật sự quá tải trong công việc — bạn xin giúp đỡ hay cố tự xử lý? Kết quả thế nào?',
  },

  {
    id: 'VT-05',
    role: 'VT',
    title: 'Trở Về Chuyên Môn Sau Khi Làm Sếp',
    tags: ['manager-to-IC', 'identity', 'perception', 'step-back'],
    hook: `Bạn làm manager 2 năm và quyết định trở về làm chuyên gia độc lập — công ty đồng ý, vị trí chuyên gia kỹ thuật cấp cao chờ bạn. Bạn thật sự muốn điều này.\n\nNhưng ngày đầu quay lại, đồng nghiệp cũ nhìn bạn với ánh mắt lạ. Một người hỏi thẳng: "Sao bạn xuống vậy?"`,
    setup: `"Xuống" — câu đó vang lại trong đầu bạn cả buổi sáng.\n\nBạn biết mình đã chọn đúng. Nhưng phải giải thích với người ngoài mãi cũng mệt. Và không biết team mới sẽ nhìn mình thế nào.\n\nBạn trả lời câu hỏi đó thế nào?`,
    choices: [
      {
        id: 'A',
        label: 'Nói thật, ngắn gọn',
        action: '"Mình chọn chứ không phải bị xuống. Mình làm tốt hơn khi được đi sâu vào kỹ thuật — đó là thứ mình muốn làm tiếp."',
      },
      {
        id: 'B',
        label: 'Giải thích dài hơn',
        action: '"Không phải xuống — mình thấy làm chuyên gia kỹ thuật phù hợp hơn với mình lúc này. Làm manager cũng có cái hay nhưng mình thích đóng góp theo hướng kỹ thuật hơn."',
      },
      {
        id: 'C',
        label: 'Không giải thích nhiều',
        action: '"Ừ thay đổi một chút." Rồi chuyển sang chủ đề khác.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Người hỏi gật đầu: "À ừ, nghe hợp lý." Conversation tiếp tục bình thường.',
        later: 'Bạn không phải giải thích lại nhiều lần. Câu trả lời rõ và tự tin → người khác không còn thắc mắc nhiều.',
      },
      {
        choiceId: 'B',
        immediate: 'Người nghe hiểu hơn. Nhưng bạn giải thích nhiều hơn cần.',
        later: 'Mỗi lần có người hỏi, bạn lại giải thích dài. Sau vài tuần bắt đầu cảm thấy mình phải "giải thích" lựa chọn của mình — dù không ai thật sự yêu cầu.',
      },
      {
        choiceId: 'C',
        immediate: 'Chủ đề qua nhanh. Người hỏi không hỏi thêm.',
        later: 'Không ai biết lý do thật. Một số người tiếp tục cho rằng bạn "bị" không làm được manager. Bạn không sửa được suy đoán đó.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — thẳng, rõ, không cần giải thích nhiều. Đúng. Điều cần lưu ý: tự tin trong câu trả lời quan trọng hơn nội dung — nếu bạn nghe như đang defensive, người kia sẽ nghe ra điều đó.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — muốn người kia thật sự hiểu. Điều cần lưu ý: không phải ai hỏi cũng cần hiểu sâu. A đủ cho đa số. B dành cho người thật sự quan tâm.',
      },
      {
        group: 'NF',
        text: 'Bạn có thể bị ảnh hưởng bởi cách người khác nhìn nhận lựa chọn của mình. Điều cần lưu ý: bạn không cần mọi người đồng ý — chỉ cần bạn rõ với chính mình. A giúp bạn giữ được sự rõ ràng đó.',
      },
      {
        group: 'NT',
        text: 'Bạn đã phân tích kỹ trước khi quyết định — và quyết định đúng. A là cách communicate quyết định đó hiệu quả nhất. Điều cần lưu ý: người hỏi thường không thật sự muốn analysis dài — họ chỉ muốn biết bạn ổn.',
      },
    ],
    mirrorMoment: 'Bạn có lựa chọn nào trong công việc mà bạn biết là đúng với mình nhưng khó giải thích với người khác không? Bạn xử lý điều đó thế nào?',
  },

]

// ─────────────────────────────────────────────
// MERGE INSTRUCTION (cho WA PM)
// ─────────────────────────────────────────────
// 1. Cập nhật CaseRole: thêm 'VT'
//    export type CaseRole = 'NV' | 'MG' | 'KH' | 'DT' | 'VT'
//
// 2. Spread vào ROLEPLAY_CASES:
//    export const ROLEPLAY_CASES = [...existing, ...VAI_TRO_CASES]
//
// 3. Dùng trong /work/self/vai-tro:
//    getCasesByRole('VT') → 5 cases
//    Wrap bằng RolePlayCaseCard (progressive reveal 5 bước - Gap 3 pattern)
//
// TOTAL POOL SAU MERGE: 26 cases
//   6 NV + 5 MG + 4 KH + 4 DT + 5 VT + 2 datamine mẫu
