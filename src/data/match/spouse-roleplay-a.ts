// spouse-roleplay-a.ts
// TASK 2 — Role-play A "TÔI XỬ THẾ NÀO" · 15 case · module "Hiểu Người Thân" đợt 1: vợ/chồng
// Content agent · brief MA PM 16/06/2026 11:00
// User là chính mình · 3 choices đều có lý, không choice nào "rõ ràng đúng" · consequences 2 chiều
// mirrorMoment mở, không gợi đáp án · ngôi "bạn" · setup trung lập không phán xét vợ/chồng
// MA PM review trước khi wire vào RolePlayGame shell

export interface SpouseRolePlayA {
  id: string
  group: 'CONFLICT' | 'SILENCE' | 'MONEY' | 'PARENTING' | 'OTHER'
  title: string
  hook: string
  setup: string
  choices: [
    { id: 'c1'; label: string },
    { id: 'c2'; label: string },
    { id: 'c3'; label: string },
  ]
  consequences: {
    c1: { immediate: string; later: string }
    c2: { immediate: string; later: string }
    c3: { immediate: string; later: string }
  }
  mirrorMoment: string
}

export const SPOUSE_ROLEPLAY_A: SpouseRolePlayA[] = [
  // ═══════════════ CONFLICT (A01–A03) ═══════════════
  {
    id: 'RP_SPOUSE_A_01',
    group: 'CONFLICT',
    title: 'Cãi về bát đĩa chưa rửa',
    hook: 'Lần thứ ba tuần này. Cùng một câu nói đó.',
    setup: 'Vợ/chồng bạn về đến nhà, nhìn vào bếp, thở dài. "Sao cứ để bát như vậy mãi." Không phải lần đầu. Bạn biết câu tiếp theo sẽ là gì.',
    choices: [
      { id: 'c1', label: 'Xin lỗi và rửa ngay' },
      { id: 'c2', label: 'Giải thích hôm nay bận' },
      { id: 'c3', label: 'Hỏi thẳng: "Bạn đang nói về bát hay điều gì khác?"' },
    ],
    consequences: {
      c1: {
        immediate: 'Không khí dịu lại. Họ có vẻ hài lòng, nhưng vẫn im lặng.',
        later: 'Tuần sau lại xảy ra. Cảm giác như bạn đang quản lý không khí, chứ không giải quyết được gì.',
      },
      c2: {
        immediate: 'Bắt đầu một vòng giải thích — bào chữa — phán xét. Không ai thắng.',
        later: 'Cả hai mệt. Bát vẫn chưa rửa. Khoảng cách thêm một chút.',
      },
      c3: {
        immediate: 'Có thể họ ngạc nhiên. Có thể tức hơn. Nhưng cũng có thể, lần đầu tiên, có gì đó thật được nói ra.',
        later: 'Rủi ro cao, nhưng nếu đúng hướng: đây là cuộc trò chuyện đáng ra nên có từ lâu.',
      },
    },
    mirrorMoment:
      'Nước đi bạn vừa chọn — bạn hay phản ứng kiểu đó khi bị nhắc một việc lặp lại, hay lần này khác thường?',
  },
  {
    id: 'RP_SPOUSE_A_02',
    group: 'CONFLICT',
    title: 'Quyết định lớn, hai hướng',
    hook: 'Một cơ hội chuyển nơi ở. Bạn muốn. Họ chần chừ.',
    setup: 'Có một lựa chọn lớn trước mặt — đổi chỗ ở, đổi công việc. Bạn thấy rõ vì sao nên làm. Họ thì cứ đặt câu hỏi, và bạn bắt đầu thấy như họ đang cản.',
    choices: [
      { id: 'c1', label: 'Thuyết phục bằng lý lẽ chắc hơn' },
      { id: 'c2', label: 'Tạm gác lại, chờ họ sẵn sàng' },
      { id: 'c3', label: 'Hỏi điều gì khiến họ lo nhất' },
    ],
    consequences: {
      c1: {
        immediate: 'Lý lẽ của bạn vững, nhưng họ càng thủ thế. Cuộc bàn thành cuộc tranh.',
        later: 'Có thể bạn thắng lý nhưng họ theo trong miễn cưỡng — và điều đó quay lại sau này.',
      },
      c2: {
        immediate: 'Căng thẳng hạ xuống. Nhưng bạn mang theo một nỗi ấm ức không nói.',
        later: 'Cơ hội có thể trôi qua. Bạn không chắc mình rộng lượng hay chỉ đang nén lại.',
      },
      c3: {
        immediate: 'Cuộc nói chuyện chậm lại. Bạn nghe được một nỗi lo bạn chưa từng biết họ có.',
        later: 'Quyết định chưa chắc dễ hơn, nhưng giờ hai người cùng giải một bài, không kéo hai đầu.',
      },
    },
    mirrorMoment:
      'Bạn đang bảo vệ điều gì khi phản ứng như vậy — tốc độ quyết định, không khí ổn, hay được nghe hết nỗi lo?',
  },
  {
    id: 'RP_SPOUSE_A_03',
    group: 'CONFLICT',
    title: 'Bị nhắc đi nhắc lại',
    hook: 'Lại một lời nhắc nữa về điều bạn vừa định làm.',
    setup: 'Họ nhắc bạn về một việc — lần thứ mấy trong ngày. Bạn đã định làm rồi. Lời nhắc làm bạn thấy như mình bị xem là không đáng tin.',
    choices: [
      { id: 'c1', label: 'Làm ngay cho xong chuyện' },
      { id: 'c2', label: 'Nói "anh/chị biết rồi" hơi gắt' },
      { id: 'c3', label: 'Nói bạn thấy thế nào khi bị nhắc nhiều' },
    ],
    consequences: {
      c1: {
        immediate: 'Việc xong, họ thôi nhắc. Nhưng trong bạn còn đọng lại một chút khó chịu.',
        later: 'Lần sau họ vẫn nhắc, vì cách này chưa nói cho họ biết bạn cảm thấy ra sao.',
      },
      c2: {
        immediate: 'Họ im, hoặc nhắc lại to hơn. Một việc nhỏ thành một lằn ranh.',
        later: 'Họ học được rằng nhắc bạn là chạm vào mìn — và có thể nhắc kỹ hơn vì lo.',
      },
      c3: {
        immediate: 'Hơi ngượng lúc đầu. Nhưng bạn nói về cảm giác, không đổ lỗi — và họ có chỗ để nghe.',
        later: 'Có thể họ nhận ra việc nhắc nhiều đến từ lo lắng của chính họ, không phải từ bạn.',
      },
    },
    mirrorMoment:
      'Khi bị nhắc đi nhắc lại, bạn hay làm ngay, phản ứng gắt hay nói cảm giác — lần này bạn chọn theo thói quen hay theo điều bạn thật sự cần?',
  },

  // ═══════════════ SILENCE (A04–A06) ═══════════════
  {
    id: 'RP_SPOUSE_A_04',
    group: 'SILENCE',
    title: 'Im lặng sau cãi',
    hook: 'Cãi xong hôm qua. Sáng nay họ vẫn không nói gì.',
    setup: 'Sau cuộc cãi tối qua, họ rút vào im lặng. Bữa sáng trôi qua không một câu. Bạn không biết nên phá vỡ khoảng lặng hay để yên.',
    choices: [
      { id: 'c1', label: 'Chủ động bắt chuyện như không có gì' },
      { id: 'c2', label: 'Đợi họ lên tiếng trước' },
      { id: 'c3', label: 'Nói: "Mình chưa ổn, nhưng mình vẫn ở đây"' },
    ],
    consequences: {
      c1: {
        immediate: 'Không khí nhẹ đi bề ngoài. Nhưng điều tối qua vẫn nằm đó, chưa được chạm tới.',
        later: 'Có thể tiện cho hôm nay, nhưng cùng chuyện đó sẽ quay lại lần sau, lớn hơn.',
      },
      c2: {
        immediate: 'Khoảng lặng kéo dài. Mỗi người chờ người kia, và sự chờ đó tự nó thành một bức tường.',
        later: 'Nếu cả hai cùng giỏi chờ, im lặng có thể kéo nhiều ngày — và quên cả lý do ban đầu.',
      },
      c3: {
        immediate: 'Bạn không giả vờ ổn, cũng không ép họ nói. Bạn chỉ cho họ biết bạn chưa rời đi.',
        later: 'Họ có thể chưa đáp ngay, nhưng câu đó thường mở cửa cho lúc họ sẵn sàng.',
      },
    },
    mirrorMoment:
      'Sau cãi, bạn thường muốn quay lại nhanh, chờ họ mở lời hay nói rằng mình vẫn ở đây — hướng nào là mặc định của bạn?',
  },
  {
    id: 'RP_SPOUSE_A_05',
    group: 'SILENCE',
    title: 'Cửa cảm xúc đóng lại',
    hook: 'Họ về nhà, mệt, và không muốn nói gì cả.',
    setup: 'Họ bước vào, đặt đồ xuống, ngồi nhìn vào điện thoại. Bạn hỏi "có chuyện gì không", họ đáp "không có gì" — nhưng rõ ràng có.',
    choices: [
      { id: 'c1', label: 'Hỏi tiếp cho ra chuyện' },
      { id: 'c2', label: 'Để họ yên hoàn toàn' },
      { id: 'c3', label: 'Ngồi cạnh, không hỏi, chỉ ở đó' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ có thể mở ra — hoặc đóng chặt hơn vì thấy bị truy. Tùy hôm nay họ còn bao nhiêu sức.',
        later: 'Nếu đúng lúc, họ thấy được quan tâm. Nếu sai lúc, họ học cách né câu hỏi của bạn.',
      },
      c2: {
        immediate: 'Họ có khoảng thở. Nhưng cũng có thể hiểu thành bạn không buồn hỏi.',
        later: 'Tôn trọng khoảng riêng là tốt — trừ khi nó dần thành thói quen ai về phòng nấy.',
      },
      c3: {
        immediate: 'Không lời nào, nhưng họ biết bạn ở đó. Sự có mặt im lặng đôi khi nói nhiều hơn câu hỏi.',
        later: 'Có người mở lòng dễ hơn khi không bị hỏi — chỉ cần biết có người sẵn sàng nghe.',
      },
    },
    mirrorMoment:
      'Khi họ nói "không có gì", bạn vừa chọn hỏi tiếp, buông hay ngồi cạnh — điều gì khiến bạn tin hướng đó là đủ cho hôm nay?',
  },
  {
    id: 'RP_SPOUSE_A_06',
    group: 'SILENCE',
    title: 'Lạnh nhạt không tên',
    hook: 'Mấy hôm nay họ khác. Không cãi, chỉ xa.',
    setup: 'Không có trận cãi nào, nhưng vài ngày qua họ trả lời ngắn, ít chạm vào bạn, như đang ở sau một lớp kính. Bạn không biết mình đã làm gì.',
    choices: [
      { id: 'c1', label: 'Hỏi thẳng "mình có làm gì sai không?"' },
      { id: 'c2', label: 'Cư xử bình thường, chờ qua' },
      { id: 'c3', label: 'Nói bạn để ý thấy khoảng cách này' },
    ],
    consequences: {
      c1: {
        immediate: 'Có thể họ nói ra, có thể đáp "không có gì". Câu hỏi này đặt trọng tâm vào lỗi của bạn.',
        later: 'Nếu chuyện không phải do bạn, họ có thể thấy khó nói thật vì sợ làm bạn áy náy thêm.',
      },
      c2: {
        immediate: 'Mọi thứ trôi qua êm bề ngoài. Lớp kính vẫn ở đó, mỏng nhưng không tan.',
        later: 'Khoảng cách không tên dễ dày lên khi không ai gọi nó ra — mỗi người tự diễn giải theo cách mình.',
      },
      c3: {
        immediate: 'Bạn không buộc tội, không truy lỗi — chỉ nói điều mình quan sát thấy. Họ có chỗ để đáp lại nhẹ nhàng.',
        later: 'Gọi tên khoảng cách thường làm nó co lại, vì nó không còn là điều cả hai cùng giả vờ không thấy.',
      },
    },
    mirrorMoment:
      'Bạn vừa hỏi "mình sai đâu", giả vờ bình thường hay gọi tên khoảng cách — cách nào bạn hay dùng khi không chắc chuyện gì đang xảy ra?',
  },

  // ═══════════════ MONEY (A07–A09) ═══════════════
  {
    id: 'RP_SPOUSE_A_07',
    group: 'MONEY',
    title: 'Món đồ đắt không bàn',
    hook: 'Một khoản chi lớn vừa hiện ra — bạn không hề biết trước.',
    setup: 'Bạn thấy một khoản chi đáng kể mà họ quyết một mình. Với bạn, đây là việc lẽ ra phải bàn. Với họ, có thể đó là tiền họ tự thấy mình có quyền dùng.',
    choices: [
      { id: 'c1', label: 'Nói rõ bạn thấy bị gạt ra ngoài' },
      { id: 'c2', label: 'Bỏ qua để tránh cãi' },
      { id: 'c3', label: 'Đề xuất một mốc cần bàn trước khi chi' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ có thể thấy bị kiểm soát và phản ứng lại. Nhưng cảm giác của bạn được nói ra, không nén.',
        later: 'Nếu nói được mà không quy tội, đây thành ranh giới chung — không phải một bên thắng.',
      },
      c2: {
        immediate: 'Yên ổn ngay. Nhưng bên trong bạn ghi lại một dấu, và những dấu này có xu hướng cộng dồn.',
        later: 'Lần sau có thể lại xảy ra. Im lặng giờ thường thành bùng nổ về một chuyện nhỏ sau này.',
      },
      c3: {
        immediate: 'Chuyển từ "bạn đã sai" sang "mình làm thế nào cho lần sau". Họ dễ tham gia hơn là phòng thủ.',
        later: 'Một thỏa thuận rõ ràng giảm va chạm — miễn là cả hai cùng thấy nó công bằng, không phải luật của một người.',
      },
    },
    mirrorMoment:
      'Phản ứng vừa rồi của bạn đang bảo vệ ranh giới, sự yên tĩnh hay một thỏa thuận chung — cái nào quan trọng hơn với bạn lúc này?',
  },
  {
    id: 'RP_SPOUSE_A_08',
    group: 'MONEY',
    title: 'Tiết kiệm hay tận hưởng',
    hook: 'Họ muốn một chuyến đi. Bạn nhìn vào khoản tiết kiệm.',
    setup: 'Họ đề xuất một việc tốn kém để cả nhà tận hưởng. Bạn nghĩ tới những thứ chưa chắc chắn phía trước. Cùng một khoản tiền, hai người thấy hai thứ hoàn toàn khác.',
    choices: [
      { id: 'c1', label: 'Từ chối, ưu tiên an toàn' },
      { id: 'c2', label: 'Đồng ý dù trong lòng lo' },
      { id: 'c3', label: 'Nói về điều mỗi người đang sợ mất' },
    ],
    consequences: {
      c1: {
        immediate: 'Khoản tiết kiệm an toàn. Nhưng họ có thể thấy như niềm vui luôn bị hoãn vô thời hạn.',
        later: 'Đôi khi sự thận trọng giữ được tiền nhưng làm mòn cảm giác hai người cùng sống, không chỉ cùng tồn tại.',
      },
      c2: {
        immediate: 'Họ vui. Bạn cười, nhưng nỗi lo vẫn chạy ngầm trong đầu suốt chuyến.',
        later: 'Nếu bạn đồng ý mà không nói nỗi lo, niềm vui chung dễ kèm theo một sự ấm ức bạn giấu kỹ.',
      },
      c3: {
        immediate: 'Cuộc nói chuyện sâu hơn dự định. Bạn nghe được vì sao tận hưởng quan trọng với họ đến vậy.',
        later: 'Hiểu nỗi sợ của nhau không giải quyết ngay con số, nhưng nó đổi cách hai người ra quyết định về sau.',
      },
    },
    mirrorMoment:
      'Bạn vừa chọn giữa an toàn, đồng ý lo lắng hay nói thẳng nỗi sợ — điều nào trong ba đó thường là nước đi đầu tiên của bạn về tiền?',
  },
  {
    id: 'RP_SPOUSE_A_09',
    group: 'MONEY',
    title: 'Tiền và người thân',
    hook: 'Người nhà cần một khoản. Hai người không cùng ý.',
    setup: 'Một người thân cần giúp đỡ tài chính. Một trong hai bạn thấy phải giúp, người kia thấy cần giữ ranh giới. Cả hai đều có lý do từ chính gia đình mình.',
    choices: [
      { id: 'c1', label: 'Giữ lập trường của bạn đến cùng' },
      { id: 'c2', label: 'Nhường theo ý họ cho yên' },
      { id: 'c3', label: 'Tìm một mức cả hai chịu được' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn bảo vệ được điều mình tin. Nhưng họ có thể thấy giá trị gia đình của họ bị xem nhẹ.',
        later: 'Thắng lần này có thể để lại một vết về chuyện "gia đình ai quan trọng hơn" — vết đó dai dẳng.',
      },
      c2: {
        immediate: 'Tránh được căng thẳng trước mắt. Nhưng nếu bạn không thật sự đồng ý, lòng bạn không yên.',
        later: 'Nhường mà không thông thường quay lại lúc khác, dưới dạng một chuyện chẳng liên quan.',
      },
      c3: {
        immediate: 'Khó hơn, lâu hơn. Nhưng cả hai cùng cho đi một phần, thay vì một người nuốt trọn.',
        later: 'Một mức chung giữ được cả mối quan hệ vợ chồng lẫn cách mỗi người đối với gia đình mình.',
      },
    },
    mirrorMoment:
      'Một tuần sau, bạn nghĩ mình sẽ hài lòng hơn với lập trường vừa chọn, hay vẫn còn ấm ức vì một phần trong bạn không được nói?',
  },

  // ═══════════════ PARENTING (A10–A12) ═══════════════
  {
    id: 'RP_SPOUSE_A_10',
    group: 'PARENTING',
    title: 'Kỷ luật trước mặt con',
    hook: 'Con phạm lỗi. Bạn nghiêm, họ bênh — ngay trước mặt con.',
    setup: 'Con làm sai. Bạn đang nói nghiêm thì họ chen vào bênh con. Bạn thấy bị kéo xuống vai trò "người xấu", và con đang nhìn cả hai.',
    choices: [
      { id: 'c1', label: 'Giữ nguyên thái độ nghiêm' },
      { id: 'c2', label: 'Nhịn, để họ xử lý' },
      { id: 'c3', label: 'Tạm dừng, nói chuyện riêng với họ trước' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn giữ được nguyên tắc, nhưng con thấy bố mẹ chống nhau — và học được rằng có thể chạy sang một bên.',
        later: 'Nếu cứ xử trước mặt con, con dần biết khai thác khe hở giữa hai người.',
      },
      c2: {
        immediate: 'Tránh được cảnh con thấy bố mẹ cãi. Nhưng bạn thấy nguyên tắc của mình bị bỏ rơi.',
        later: 'Nhịn nhiều lần mà không bàn lại sau sẽ làm bạn thấy đơn độc trong việc dạy con.',
      },
      c3: {
        immediate: 'Con chờ một chút. Hai người thống nhất sau cánh cửa, rồi quay ra với một giọng chung.',
        later: 'Con học được rằng bố mẹ là một đội — và hai người tránh biến con thành nơi phân xử.',
      },
    },
    mirrorMoment:
      'Trước mặt con, bạn ưu tiên nguyên tắc, tránh cãi hay dừng để bàn sau — điều bạn đang cố không làm hỏng là gì?',
  },
  {
    id: 'RP_SPOUSE_A_11',
    group: 'PARENTING',
    title: 'Thời gian cho con',
    hook: 'Họ trách bạn dành ít thời gian cho con.',
    setup: 'Họ nói bạn mải việc, ít ở bên con. Bạn thấy mình đang làm việc cũng vì gia đình. Hai người nhìn cùng một sự vắng mặt theo hai nghĩa khác nhau.',
    choices: [
      { id: 'c1', label: 'Giải thích áp lực công việc của bạn' },
      { id: 'c2', label: 'Nhận lỗi và hứa sẽ thay đổi' },
      { id: 'c3', label: 'Hỏi con đang thiếu điều gì cụ thể' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ hiểu hơn về áp lực của bạn — hoặc nghe thành một cái cớ nữa.',
        later: 'Lý do dù thật vẫn không thay được cảm giác thiếu vắng mà con và họ đang mang.',
      },
      c2: {
        immediate: 'Họ nhẹ lòng vì thấy được lắng nghe. Nhưng một lời hứa chung chung dễ phai.',
        later: 'Nếu hứa mà lịch không đổi, lần trách sau sẽ nặng hơn vì kèm theo "đã hứa rồi".',
      },
      c3: {
        immediate: 'Câu chuyện chuyển từ "bạn sai" sang "con cần gì". Cụ thể hơn, ít phòng thủ hơn.',
        later: 'Một thay đổi nhỏ nhưng đều — như một buổi cố định mỗi tuần — thường đáng hơn lời hứa lớn.',
      },
    },
    mirrorMoment:
      'Khi bị trách về thời gian với con, bạn hay giải thích, hứa hay hỏi cụ thể — cách nào giúp bạn cảm thấy được nhìn thấy mà không chỉ bị phán xét?',
  },
  {
    id: 'RP_SPOUSE_A_12',
    group: 'PARENTING',
    title: 'Ép học hay để con thở',
    hook: 'Một người muốn con học thêm. Người kia muốn con được chơi.',
    setup: 'Chuyện học của con thành điểm va. Một người lo con thua bạn bè, người kia lo con mất tuổi thơ. Mỗi nỗi lo đều có gốc rễ thật.',
    choices: [
      { id: 'c1', label: 'Bảo vệ quan điểm của bạn cho con' },
      { id: 'c2', label: 'Theo ý người kia để tránh căng' },
      { id: 'c3', label: 'Cùng hỏi con thấy thế nào' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn làm điều mình tin là đúng cho con. Người kia thấy nỗi lo của họ bị gạt đi.',
        later: 'Nếu một người luôn thắng chuyện con cái, người kia dần rút khỏi việc nuôi dạy — không tốt cho ai.',
      },
      c2: {
        immediate: 'Hết căng trước mắt. Nhưng bạn mang theo cảm giác đã không lên tiếng cho điều con cần.',
        later: 'Nhường trong chuyện con cái mà không thật lòng thường để lại ấm ức khó gọi tên.',
      },
      c3: {
        immediate: 'Con được hỏi — điều hiếm khi xảy ra giữa lúc người lớn tranh luận. Câu trả lời có thể bất ngờ.',
        later: 'Đưa con vào không bỏ hết quyết định cho con, mà giúp hai người thấy đứa trẻ thật, không phải đứa trẻ trong đầu mỗi người.',
      },
    },
    mirrorMoment:
      'Bạn đang bảo vệ tương lai con, bình yên trong nhà hay tiếng nói của chính mình — lần này điều nào nặng nhất?',
  },

  // ═══════════════ OTHER (A13–A15) ═══════════════
  {
    id: 'RP_SPOUSE_A_13',
    group: 'OTHER',
    title: 'Hai nhu cầu xã hội',
    hook: 'Cuối tuần đến. Họ muốn ra ngoài, bạn muốn ở nhà.',
    setup: 'Họ háo hức rủ bạn bè, tụ tập. Bạn chỉ muốn một buổi tối yên tĩnh ở nhà. Không ai sai, nhưng cuối tuần nào cũng thành một cuộc thương lượng nhỏ.',
    choices: [
      { id: 'c1', label: 'Đi cùng dù bạn thấy đuối' },
      { id: 'c2', label: 'Ở nhà, để họ đi một mình' },
      { id: 'c3', label: 'Đề xuất chia: lần này lần kia' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ vui vì có bạn đi cùng. Nhưng bạn về nhà cạn pin và hơi bực mà không rõ với ai.',
        later: 'Luôn chiều theo có thể giữ hòa khí, nhưng dần làm bạn thấy nhu cầu của mình không được tính tới.',
      },
      c2: {
        immediate: 'Bạn được nghỉ. Họ đi, nhưng có thể thấy thiếu bạn, hoặc thấy hai người ngày càng tách.',
        later: 'Mỗi người sống đúng nhịp mình là tốt — trừ khi nó dần thành hai cuộc sống song song.',
      },
      c3: {
        immediate: 'Không ai được trọn vẹn ý mình, nhưng cả hai đều được tính tới. Một sự công bằng dễ chịu.',
        later: 'Khi cả hai biết nhịp của nhau được tôn trọng, việc từ chối một lần không còn bị hiểu thành từ chối nhau.',
      },
    },
    mirrorMoment:
      'Cuối tuần, bạn hay hy sinh pin để đi cùng, ở nhà một mình hay chia lịch — mặc định của bạn là gì, và lần này có khớp không?',
  },
  {
    id: 'RP_SPOUSE_A_14',
    group: 'OTHER',
    title: 'Cần một khoảng riêng',
    hook: 'Bạn cần chút thời gian một mình. Họ thấy bị bỏ rơi.',
    setup: 'Bạn muốn một khoảng lặng riêng để hồi lại. Nhưng mỗi lần bạn lùi vào không gian của mình, họ có vẻ tổn thương, như thể bạn đang đẩy họ ra.',
    choices: [
      { id: 'c1', label: 'Bỏ khoảng riêng để họ yên tâm' },
      { id: 'c2', label: 'Giữ khoảng riêng, mặc họ hiểu sao thì hiểu' },
      { id: 'c3', label: 'Giải thích khoảng riêng không phải rời xa họ' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ yên tâm hơn. Nhưng bạn không được nạp lại, và sự cạn kiệt sẽ lộ ra cách khác.',
        later: 'Bỏ điều mình cần để trấn an người kia thường dẫn tới kiệt sức — rồi cáu gắt mà không hiểu vì sao.',
      },
      c2: {
        immediate: 'Bạn có khoảng thở. Nhưng nếu không nói gì, họ tự diễn giải sự lùi lại đó theo hướng xấu nhất.',
        later: 'Khoảng riêng không được giải thích dễ bị hiểu thành lạnh nhạt, dù bạn không hề có ý đó.',
      },
      c3: {
        immediate: 'Hơi khó nói, nhưng bạn tách bạch được "cần một mình" khỏi "không cần họ". Họ có chỗ để bớt lo.',
        later: 'Khi họ hiểu khoảng riêng nạp lại năng lượng cho bạn — kể cả cho họ — họ ít thấy nó là mối đe dọa.',
      },
    },
    mirrorMoment:
      'Khi cần một mình, bạn thường bỏ luôn nhu cầu đó, giữ im lặng hay giải thích trước — cách nào giúp bạn hồi pin mà vẫn ở trong quan hệ?',
  },
  {
    id: 'RP_SPOUSE_A_15',
    group: 'OTHER',
    title: 'Gia đình bên kia',
    hook: 'Gia đình họ can vào. Bạn thấy ngộp, họ thấy bình thường.',
    setup: 'Gia đình bên họ tham gia khá sâu vào chuyện của hai người. Với bạn, đó là vượt ranh giới. Với họ, đó là cách gia đình họ vẫn thể hiện sự quan tâm.',
    choices: [
      { id: 'c1', label: 'Nói thẳng bạn thấy bị lấn ranh giới' },
      { id: 'c2', label: 'Chịu đựng để giữ hòa khí' },
      { id: 'c3', label: 'Cùng họ thống nhất một ranh giới chung' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn nói được điều thật, nhưng họ dễ thấy như bạn đang chê gia đình họ.',
        later: 'Đụng tới gia đình gốc luôn nhạy cảm — nói thẳng mà không khéo dễ thành "bên anh, bên em".',
      },
      c2: {
        immediate: 'Hòa khí giữ được. Nhưng cảm giác ngộp của bạn không biến mất, chỉ bị nén xuống.',
        later: 'Chịu đựng lâu mà không nói thường tích lại, rồi bùng ra vào một dịp chẳng ai ngờ.',
      },
      c3: {
        immediate: 'Khó, vì đòi họ đứng giữa bạn và gia đình họ. Nhưng nếu làm được, ranh giới đó là của cả hai.',
        later: 'Một ranh giới hai người cùng dựng vững hơn nhiều so với một người tự bảo vệ mình.',
      },
    },
    mirrorMoment:
      'Bạn vừa nói thẳng, chịu đựng hay mời họ cùng đứng về một phía — với ranh giới gia đình, bạn hay bắt đầu từ đâu?',
  },
]
