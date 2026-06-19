// child-young-roleplay-a.ts
// Đợt 3 MẺ A — ROLE-PLAY A "TÔI XỬ THẾ NÀO" · CON NHỎ (3-11) · 9 case (3 nhóm × 3)
// Content agent · 17/06/2026 · user = BỐ MẸ · ngôi "bạn"
// 3 choices đều có lý · hệ quả 2 chiều (cả "ngoan/dập được" cũng có cái mất)
// mirrorMoment về BỐ MẸ — "Bạn phản ứng vậy để bảo vệ điều gì?", KHÔNG "con đang cần gì"
// KHÔNG choice xấu-hổ-hóa / dập-cảm-xúc được khen · "khí chất" giữ là bình thường
// Nhóm: TANTRUM (ăn vạ/bướng) · SHY (nhút nhát) · BIGFEELINGS (khóc/nhạy cảm)

export interface ChildYoungRolePlayA {
  id: string
  group: 'TANTRUM' | 'SHY' | 'BIGFEELINGS'
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

export const CHILD_YOUNG_ROLEPLAY_A: ChildYoungRolePlayA[] = [
  // ═══════════════ TANTRUM (A01–A03) ═══════════════
  {
    id: 'RP_CHILD_Y_A_01',
    group: 'TANTRUM',
    title: 'Ăn vạ chỗ đông người',
    hook: 'Giữa siêu thị, con lăn ra khóc đòi món đồ. Mọi người nhìn.',
    setup: 'Con gào lên, bạn thấy nóng mặt vì ánh mắt xung quanh. Một phần bạn muốn dập cho nhanh, một phần biết con đang thật sự mất kiểm soát.',
    choices: [
      { id: 'c1', label: 'Dọa hoặc mua đại cho con nín ngay' },
      { id: 'c2', label: 'Mặc kệ con khóc, kéo con đi tiếp' },
      { id: 'c3', label: 'Ngồi xuống ngang tầm con, gọi tên cảm xúc: "Con đang tức vì không có món đó hả?"' },
    ],
    consequences: {
      c1: {
        immediate: 'Con nín. Bạn thoát khỏi ánh mắt người ta. Nhẹ nhõm tức thì.',
        later: 'Con học được rằng khóc to là cách lấy được đồ — và lần sau cơn ăn vạ sẽ lớn hơn.',
      },
      c2: {
        immediate: 'Bạn không nhượng bộ. Nhưng con khóc dữ hơn vì thấy mình bị bỏ lại giữa cơn hoảng.',
        later: 'Con có thể thôi đòi, nhưng cũng học rằng lúc mất kiểm soát nhất thì không có ai bên cạnh.',
      },
      c3: {
        immediate: 'Khó hơn và lâu hơn, ngay giữa chốn đông. Nhưng việc gọi tên cảm xúc giúp con dần hạ nhiệt.',
        later: 'Lặp lại nhiều lần, con học được rằng cảm xúc có tên gọi — và đó là bước đầu để con tự dịu lại mà không cần gào.',
      },
    },
    mirrorMoment: 'Khi con ăn vạ nơi đông người, điều khiến bạn nóng nhất — là con, hay là ánh mắt người xung quanh nhìn vào bạn?',
  },
  {
    id: 'RP_CHILD_Y_A_02',
    group: 'TANTRUM',
    title: 'Cuộc chiến cái áo',
    hook: 'Sắp muộn giờ. Con nhất định không chịu mặc áo.',
    setup: 'Bạn đang vội, con thì càng giục càng chống. Mỗi giây trôi qua, bạn càng bực, và con càng cứng đầu hơn.',
    choices: [
      { id: 'c1', label: 'Quát lớn, mặc áo cho con bằng được' },
      { id: 'c2', label: 'Bỏ cuộc, để con thắng cho nhanh' },
      { id: 'c3', label: 'Cho con một lựa chọn nhỏ: "Con mặc áo xanh hay áo đỏ?"' },
    ],
    consequences: {
      c1: {
        immediate: 'Xong việc, kịp giờ. Nhưng cả hai cùng bước ra cửa với một mớ cảm xúc xấu.',
        later: 'Mỗi lần mặc áo thành một trận. Con học rằng ý mình không được tính, chỉ có sức mạnh của bố mẹ.',
      },
      c2: {
        immediate: 'Nhanh gọn, hết cãi. Nhưng con hiểu rằng cứ chống đủ lâu là được buông.',
        later: 'Sự nhường này lặp lại dễ làm con khó nghe ở những việc thật sự quan trọng sau này.',
      },
      c3: {
        immediate: 'Con thấy mình có một chút quyền quyết, nên bớt chống. Việc mặc áo trở lại đúng nhịp.',
        later: 'Cho lựa chọn nhỏ trong khuôn khổ bạn đặt giúp con tập tự chủ mà vẫn theo nề nếp — đỡ dần những trận giằng co.',
      },
    },
    mirrorMoment: 'Khi con chống lại, bạn cần con "nghe lời" hay cần con "làm xong việc" — và hai cái đó có phải lúc nào cũng là một?',
  },
  {
    id: 'RP_CHILD_Y_A_03',
    group: 'TANTRUM',
    title: 'Cái gì cũng "không"',
    hook: 'Dạo này con nói "không" với gần như mọi thứ bạn đề nghị.',
    setup: 'Ăn cơm: không. Đi tắm: không. Cất đồ chơi: không. Bạn thấy mệt và bắt đầu nghĩ con đang hư đi.',
    choices: [
      { id: 'c1', label: 'Siết kỷ luật chặt hơn, phạt mỗi lần con cãi' },
      { id: 'c2', label: 'Nhượng bộ cho yên nhà' },
      { id: 'c3', label: 'Hiểu đây là tuổi con tập nói "tôi", và chọn vài trận đáng giữ thay vì ép mọi thứ' },
    ],
    consequences: {
      c1: {
        immediate: 'Con tạm im. Nhà có vẻ trật tự lại.',
        later: 'Cái "tôi" đang lớn của con bị dập có thể quay vào trong — thành lì ngầm, hoặc thành một đứa trẻ ngại nói ý mình.',
      },
      c2: {
        immediate: 'Bớt căng thẳng tức thì. Nhưng con quen với việc "không" là có tác dụng.',
        later: 'Không có ranh giới nào, con thấy bất an vì không biết đâu là giới hạn — và thử nhiều hơn để dò.',
      },
      c3: {
        immediate: 'Bạn thả những trận nhỏ, giữ vài việc thật sự cần. Bớt đối đầu mà vẫn có nề nếp.',
        later: 'Con được tập nói ý mình ở chỗ an toàn, và vẫn học được giới hạn ở chỗ quan trọng. Giai đoạn "không" này rồi sẽ qua.',
      },
    },
    mirrorMoment: 'Khi con nói "không" liên tục, bạn đọc đó là con hư đi, hay con đang tập làm một người riêng — và cách đọc đó đổi phản ứng của bạn thế nào?',
  },

  // ═══════════════ SHY (A04–A06) ═══════════════
  {
    id: 'RP_CHILD_Y_A_04',
    group: 'SHY',
    title: 'Không chịu chào',
    hook: 'Có khách tới nhà. Con nép sau lưng bạn, không chào.',
    setup: 'Khách cười: "Sao nhút nhát thế?" Bạn thấy ngượng, muốn con dạn dĩ hơn, và bị thôi thúc phải thúc con ra chào.',
    choices: [
      { id: 'c1', label: 'Ép con chào ngay: "Chào đi con, hư nào!"' },
      { id: 'c2', label: 'Xin lỗi khách thay con: "Cháu nó nhát lắm"' },
      { id: 'c3', label: 'Để con quan sát một lúc, không ép: "Khi nào con sẵn sàng thì chào cô nhé"' },
    ],
    consequences: {
      c1: {
        immediate: 'Con lí nhí chào cho xong. Khách hài lòng.',
        later: 'Bị ép lúc đang ngại khiến con càng gắn việc gặp người với sự xấu hổ — và lần sau nép kỹ hơn.',
      },
      c2: {
        immediate: 'Bạn gỡ được tình huống ngượng. Con được "tha".',
        later: 'Nhãn "nhát lắm" nói trước mặt con dễ thành điều con tin về mình — và sống đúng theo cái nhãn đó.',
      },
      c3: {
        immediate: 'Không khí bớt căng. Con có khoảng để quan sát, và thường tự chào sau vài phút.',
        later: 'Được tôn trọng nhịp làm quen, con dần dạn lên theo cách của mình — bền hơn là bị ép dạn.',
      },
    },
    mirrorMoment: 'Khi con không chào, bạn lo cho con, hay lo người ta nghĩ bạn dạy con chưa khéo — và điều đó dẫn dắt phản ứng của bạn ra sao?',
  },
  {
    id: 'RP_CHILD_Y_A_05',
    group: 'SHY',
    title: 'Đứng ngoài cuộc chơi',
    hook: 'Ở sân chơi, đám trẻ chạy nhảy. Con bạn đứng ngoài nhìn.',
    setup: 'Bạn muốn con nhập hội cho vui, cho dạn. Nhưng con cứ bám lấy bạn, chưa muốn vào.',
    choices: [
      { id: 'c1', label: 'Đẩy con vào: "Ra chơi với các bạn đi, đứng đây làm gì"' },
      { id: 'c2', label: 'So sánh: "Nhìn bạn kia dạn chưa, con thì..."' },
      { id: 'c3', label: 'Ngồi cạnh con cùng quan sát, để con vào khi con thấy sẵn sàng' },
    ],
    consequences: {
      c1: {
        immediate: 'Con miễn cưỡng bước vào, hoặc khóc và bám chặt hơn.',
        later: 'Bị đẩy khi chưa sẵn sàng dạy con rằng cảm giác dè dặt của mình không được tính — con tin mình ít hơn.',
      },
      c2: {
        immediate: 'Câu so sánh không làm con dạn lên, chỉ làm con thấy mình thua.',
        later: 'So sánh lặp lại gieo vào con ý nghĩ "mình kém" — đúng thứ khiến con càng ngại bước ra.',
      },
      c3: {
        immediate: 'Có bạn ngồi cạnh làm "bến an toàn", con quan sát đủ rồi thường tự bước vào.',
        later: 'Con học rằng dạn dĩ là điều có thể đến từ từ — và rằng bạn tin con sẽ tự làm được khi sẵn sàng.',
      },
    },
    mirrorMoment: 'Khi thấy con đứng ngoài, bạn sốt ruột vì con, hay vì hình ảnh một đứa trẻ "dạn dĩ" mà bạn mong con thành?',
  },
  {
    id: 'RP_CHILD_Y_A_06',
    group: 'SHY',
    title: 'Sợ thử cái mới',
    hook: 'Lớp học mới, hoạt động mới — con dứt khoát từ chối, chưa gì đã "con không làm đâu".',
    setup: 'Bạn biết con sẽ thích nếu thử, nhưng con đã đóng cửa trước cả khi bắt đầu. Bạn vừa tiếc cho con, vừa sốt ruột.',
    choices: [
      { id: 'c1', label: 'Bắt con phải thử bằng được, "thử rồi mới biết"' },
      { id: 'c2', label: 'Chiều con, thôi không thử nữa' },
      { id: 'c3', label: 'Chia nhỏ: cho con đứng xem trước, không phải tham gia ngay' },
    ],
    consequences: {
      c1: {
        immediate: 'Con tham gia trong nước mắt, hoặc chống tới cùng.',
        later: 'Bị ép vào cái mới khi đang sợ dễ làm con gắn "cái mới" với "đáng sợ" — và sợ thử nhiều hơn về sau.',
      },
      c2: {
        immediate: 'Con nhẹ nhõm. Bạn tránh được một trận.',
        later: 'Lùi mỗi lần con sợ khiến thế giới của con nhỏ dần — con bỏ lỡ những thứ con vốn có thể yêu.',
      },
      c3: {
        immediate: 'Chỉ cần đứng xem, con thấy an toàn. Quan sát đủ, nhiều khi con tự xin vào.',
        later: 'Tách "thử" thành từng bước nhỏ giúp con dạn dần — con học rằng cái mới có thể tiếp cận từ từ, không phải nhảy ùm vào.',
      },
    },
    mirrorMoment: 'Khi con từ chối thử, bạn thường thúc hay buông — và đằng sau lựa chọn đó là điều bạn muốn cho con, hay nỗi sốt ruột của riêng bạn?',
  },

  // ═══════════════ BIGFEELINGS (A07–A09) ═══════════════
  {
    id: 'RP_CHILD_Y_A_07',
    group: 'BIGFEELINGS',
    title: 'Khóc vì chuyện "nhỏ"',
    hook: 'Cái bánh quy gãy đôi. Con khóc như thể cả thế giới sụp đổ.',
    setup: 'Với bạn đây là chuyện cỏn con. Nhưng con khóc thật, đau thật, và bạn không hiểu sao con làm quá đến vậy.',
    choices: [
      { id: 'c1', label: 'Gạt đi: "Có cái bánh gãy thôi mà, khóc gì"' },
      { id: 'c2', label: 'Vội đổi cái bánh mới cho con nín' },
      { id: 'c3', label: 'Công nhận trước: "Con tiếc cái bánh lành hả? Ừ, tiếc thật" rồi mới cùng con xử lý' },
    ],
    consequences: {
      c1: {
        immediate: 'Con có thể nín vì cụt hứng. Nhưng con nhận tín hiệu rằng cảm xúc của mình là vô lý.',
        later: 'Bị nói "có gì đâu" nhiều lần, con học cách giấu cảm xúc — chứ không phải hiểu hay điều tiết được nó.',
      },
      c2: {
        immediate: 'Con nín ngay khi có bánh mới. Êm.',
        later: 'Con học rằng mỗi khó chịu đều phải được xóa ngay bằng một thứ thay thế — thay vì học cách đi qua cảm giác tiếc.',
      },
      c3: {
        immediate: 'Được gọi đúng tên cảm giác, con thấy mình được hiểu, và dịu nhanh hơn bạn nghĩ.',
        later: 'Con dần học rằng cảm xúc lớn rồi sẽ qua, và mình có thể đi qua nó — một kỹ năng theo con suốt đời.',
      },
    },
    mirrorMoment: 'Khi con khóc vì chuyện bạn thấy nhỏ, điều gì trong bạn muốn nó dừng lại nhanh — sự bất tiện, hay cảm giác bất lực vì không hiểu?',
  },
  {
    id: 'RP_CHILD_Y_A_08',
    group: 'BIGFEELINGS',
    title: 'Khóc mãi không dừng',
    hook: 'Con đã khóc một lúc lâu mà chưa dừng được. Bạn bắt đầu hết kiên nhẫn.',
    setup: 'Bạn đã dỗ, đã giải thích, đã chờ. Con vẫn khóc. Bên trong bạn là một mớ vừa thương vừa kiệt sức.',
    choices: [
      { id: 'c1', label: 'Quát cho con sợ mà nín' },
      { id: 'c2', label: 'Bỏ ra chỗ khác, để con khóc một mình cho chán thì thôi' },
      { id: 'c3', label: 'Ở lại bên con, im lặng, cho con biết bạn vẫn ở đây cho đến khi con dịu' },
    ],
    consequences: {
      c1: {
        immediate: 'Con nín vì sợ. Tiếng khóc dừng.',
        later: 'Con học rằng cảm xúc lớn sẽ bị trừng phạt — nên lần sau con nén lại, hoặc bùng dữ hơn khi không nén nổi.',
      },
      c2: {
        immediate: 'Bạn có khoảng lặng. Nhưng con khóc giữa lúc cần người nhất mà không có ai.',
        later: 'Với một đứa trẻ nhạy cảm, bị để một mình lúc cao trào dễ thành cảm giác "lúc con tệ nhất thì không ai ở đây".',
      },
      c3: {
        immediate: 'Con không nín ngay, nhưng sự có mặt lặng lẽ của bạn là điểm tựa để con từ từ hạ xuống.',
        later: 'Con học được rằng cảm xúc dữ đến mấy cũng có người ở cùng — nền tảng cho việc con tự trấn an mình sau này.',
      },
    },
    mirrorMoment: 'Khi con khóc mãi và bạn cạn kiên nhẫn, bạn đang cần con dừng lại vì con, hay vì chính bạn cũng đang quá tải?',
  },
  {
    id: 'RP_CHILD_Y_A_09',
    group: 'BIGFEELINGS',
    title: 'Dễ tổn thương vì lời nói',
    hook: 'Một câu trêu của anh chị hay bạn bè, con buồn rũ cả buổi.',
    setup: 'Con nhạy hơn những đứa trẻ khác — một lời nói thường cũng đủ làm con tổn thương sâu. Bạn lo con sẽ khổ vì quá mong manh.',
    choices: [
      { id: 'c1', label: 'Bảo con "phải mạnh mẽ lên, đừng để ý mấy câu đó"' },
      { id: 'c2', label: 'Đi mắng người trêu con để con hả' },
      { id: 'c3', label: 'Công nhận cảm giác của con, rồi cùng con nghĩ cách đáp lại lần sau' },
    ],
    consequences: {
      c1: {
        immediate: 'Con cố nuốt vào. Bề ngoài có vẻ ổn.',
        later: 'Câu "đừng để ý" dạy con rằng sự nhạy cảm của mình là sai — con học giấu nó thay vì học dùng nó.',
      },
      c2: {
        immediate: 'Con thấy được bênh. Nhưng con không học được cách tự đứng cho mình.',
        later: 'Luôn có bạn ra mặt thay, con khó dần lên một sức bền của riêng mình khi bạn không ở đó.',
      },
      c3: {
        immediate: 'Được công nhận, con bớt đau. Cùng nghĩ cách đáp giúp con thấy mình có thể làm gì đó.',
        later: 'Con học rằng nhạy cảm không phải điểm yếu — và rằng con có thể vừa cảm sâu vừa tự bảo vệ được mình.',
      },
    },
    mirrorMoment: 'Khi con dễ tổn thương, bạn muốn con "cứng lên" — điều đó đến từ điều tốt cho con, hay từ nỗi lo của bạn rằng con sẽ khổ vì giống một phần nào đó trong chính bạn?',
  },
]
