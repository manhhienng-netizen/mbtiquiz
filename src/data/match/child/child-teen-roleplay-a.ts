// child-teen-roleplay-a.ts
// Đợt 3 MẺ B — ROLE-PLAY A "TÔI XỬ THẾ NÀO" · TEEN (12-18) · 9 case (3 nhóm × 3)
// Content agent · 17/06/2026 · user = BỐ MẸ · ngôi "bạn"
// 3 choices đều có lý · hệ quả 2 chiều · mirrorMoment về BỐ MẸ
// ⚠️ KHÔNG choice "kiểm soát chặt hơn / đọc tin nhắn / giám sát" được khen như giải pháp
// ⭐ "Nổi loạn" = bình thường giữ xuyên suốt
// Nhóm: DISTANCE (lì/khép kín) · PRESSURE (học/so sánh) · CONFLICT (nổi loạn/cãi)

export interface ChildTeenRolePlayA {
  id: string
  group: 'DISTANCE' | 'PRESSURE' | 'CONFLICT'
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

export const CHILD_TEEN_ROLEPLAY_A: ChildTeenRolePlayA[] = [
  // ═══════════════ DISTANCE (A01–A03) ═══════════════
  {
    id: 'RP_CHILD_T_A_01',
    group: 'DISTANCE',
    title: 'Cánh cửa đóng',
    hook: 'Con đi học về, chào một câu rồi vào phòng, đóng cửa.',
    setup: 'Dạo này con ở trong phòng nhiều hơn hẳn. Bạn thấy hụt, và một phần lo con đang giấu chuyện gì đó.',
    choices: [
      { id: 'c1', label: 'Vào phòng hỏi cho ra, "có chuyện gì phải nói với bố/mẹ"' },
      { id: 'c2', label: 'Để mặc con, nghĩ "lớn rồi, kệ nó"' },
      { id: 'c3', label: 'Tôn trọng cửa đóng, nhưng giữ một nhịp gần: rủ con ăn khuya, đi dạo' },
    ],
    consequences: {
      c1: {
        immediate: 'Con trả lời nhát gừng cho xong, hoặc khó chịu vì bị truy.',
        later: 'Càng bị truy, con càng đóng kỹ. Con học rằng mở cửa ra là bị hỏi, nên thà cứ đóng.',
      },
      c2: {
        immediate: 'Không va chạm. Nhà yên.',
        later: 'Buông hẳn dễ bị con hiểu là bạn không còn quan tâm — và khoảng cách thành thật, không chỉ là cánh cửa.',
      },
      c3: {
        immediate: 'Con vẫn cần khoảng riêng, nhưng thấy bạn không biến mất. Cánh cửa khép lại không thành bức tường.',
        later: 'Tôn trọng không gian mà vẫn giữ cầu nối giúp con biết: con được là chính mình, và nhà vẫn ở đó khi con muốn quay lại.',
      },
    },
    mirrorMoment: 'Khi con đóng cửa, bạn lo cho con, hay lo mình đang mất dần con — và nỗi lo nào đang điều khiển tay bạn gõ cửa?',
  },
  {
    id: 'RP_CHILD_T_A_02',
    group: 'DISTANCE',
    title: '"Bình thường ạ"',
    hook: 'Bạn hỏi hôm nay thế nào. Con đáp gọn: "Bình thường ạ."',
    setup: 'Mọi câu hỏi đều nhận lại một từ. Bạn muốn biết con đang sống ra sao, nhưng con như khóa lại sau những câu trả lời cụt.',
    choices: [
      { id: 'c1', label: 'Hỏi dồn cho con phải nói nhiều hơn' },
      { id: 'c2', label: 'Thôi không hỏi nữa, thấy hỏi cũng vô ích' },
      { id: 'c3', label: 'Đổi cách: kể chuyện của bạn trước, không hỏi, để con góp lời khi muốn' },
    ],
    consequences: {
      c1: {
        immediate: 'Con càng đáp ngắn, hoặc cáu lên vì thấy bị "hỏi cung".',
        later: 'Hỏi dồn dạy con rằng trò chuyện với bố mẹ là một cuộc tra hỏi — nên con đóng kỹ hơn.',
      },
      c2: {
        immediate: 'Bạn thôi mệt vì hỏi mãi không được gì.',
        later: 'Ngừng hẳn, con quen với việc nhà là nơi không ai hỏi — rồi một ngày bạn không còn biết gì về đời con.',
      },
      c3: {
        immediate: 'Không bị hỏi, con bớt thủ thế. Đôi khi con buông một câu góp chuyện lúc bạn không ngờ.',
        later: 'Kể trước thay vì hỏi tạo một không khí an toàn — con dần mở ra theo nhịp của con, không phải vì bị ép.',
      },
    },
    mirrorMoment: 'Khi con trả lời cụt, bạn cần thông tin về con, hay cần cảm giác con vẫn để bạn vào đời nó — và hai cái đó dẫn bạn tới cách hỏi nào?',
  },
  {
    id: 'RP_CHILD_T_A_03',
    group: 'DISTANCE',
    title: 'Bạn bè trước, nhà sau',
    hook: 'Cuối tuần con lại xin đi với bạn. Ở nhà với gia đình thành lựa chọn cuối.',
    setup: 'Con dành thời gian cho bạn bè nhiều hơn cho nhà. Bạn thấy chạnh lòng, như mình đang bị cho ra rìa.',
    choices: [
      { id: 'c1', label: 'Cấm bớt, bắt con ở nhà nhiều hơn' },
      { id: 'c2', label: 'Giận dỗi, trách con "chỉ biết bạn bè"' },
      { id: 'c3', label: 'Chấp nhận bạn bè là nhu cầu thật của tuổi này, và giữ vài điểm hẹn gia đình nhẹ nhàng' },
    ],
    consequences: {
      c1: {
        immediate: 'Con ở nhà, nhưng cơ thể ở đây còn lòng để chỗ khác.',
        later: 'Cấm bạn bè ở tuổi này dễ cắt một nguồn con đang cần để lớn — và đẩy con ra xa bạn hơn, không gần hơn.',
      },
      c2: {
        immediate: 'Con thấy có lỗi, hoặc thấy nặng nề và né về nhà hơn.',
        later: 'Trách móc biến nhà thành nơi mang cảm giác tội lỗi — đúng thứ khiến con muốn ở ngoài nhiều hơn.',
      },
      c3: {
        immediate: 'Con được đi với bạn mà không phải áy náy. Bạn giữ được vài khoảnh khắc chung không gượng.',
        later: 'Hiểu bạn bè là việc bình thường của tuổi teen giúp con không phải chọn giữa bạn và nhà — và nhà vẫn là chỗ con muốn về.',
      },
    },
    mirrorMoment: 'Khi con ưu tiên bạn bè, bạn thấy mình bị bỏ rơi — cảm giác đó là về con, hay về một nỗi sợ cũ hơn của riêng bạn?',
  },

  // ═══════════════ PRESSURE (A04–A06) ═══════════════
  {
    id: 'RP_CHILD_T_A_04',
    group: 'PRESSURE',
    title: 'Bảng điểm đi xuống',
    hook: 'Điểm con kỳ này tụt hẳn. Bạn thấy vừa lo vừa thất vọng.',
    setup: 'Con vốn học được, giờ điểm xuống mà không rõ lý do. Bạn muốn con khá lên, và nỗi lo bật ra thành lời trách.',
    choices: [
      { id: 'c1', label: 'Trách và siết: học thêm, cấm giải trí' },
      { id: 'c2', label: 'Thất vọng ra mặt, "bố/mẹ trông chờ ở con hơn thế"' },
      { id: 'c3', label: 'Hỏi trước điều gì đang xảy ra, trước khi kết luận con lười' },
    ],
    consequences: {
      c1: {
        immediate: 'Con cúi đầu nhận. Lịch học dày thêm.',
        later: 'Nếu điểm xuống vì con đang đuối về tinh thần, siết chặt làm con kiệt thêm — và che mất cái gốc thật.',
      },
      c2: {
        immediate: 'Con im, mang theo cảm giác mình làm bố mẹ thất vọng.',
        later: 'Sợ làm bạn thất vọng có thể khiến con giấu khó khăn kỹ hơn — lần sau đuối, con càng không dám nói.',
      },
      c3: {
        immediate: 'Con thấy được hỏi thay vì bị kết tội, nên dễ nói ra điều thật đang cản con.',
        later: 'Khi nguyên nhân thật lộ ra — mệt, áp lực, chuyện bạn bè — bạn xử đúng gốc, và con học rằng vấp ngã có thể nói với bạn.',
      },
    },
    mirrorMoment: 'Khi điểm con xuống, điều bạn thất vọng là cho con, hay vì nó chạm vào kỳ vọng bạn đặt nơi con — và con đọc được điều nào?',
  },
  {
    id: 'RP_CHILD_T_A_05',
    group: 'PRESSURE',
    title: '"Con nhà người ta"',
    hook: 'Bạn buột miệng so con với một bạn khác giỏi hơn.',
    setup: 'Bạn nghĩ so sánh sẽ làm con cố hơn. Nhưng con im bặt, mặt đanh lại, và không khí lập tức nặng nề.',
    choices: [
      { id: 'c1', label: 'Nói tiếp cho con "thấy mà cố gắng"' },
      { id: 'c2', label: 'Im luôn, coi như con tự hiểu' },
      { id: 'c3', label: 'Dừng lại, công nhận con đang đi theo cách riêng của con' },
    ],
    consequences: {
      c1: {
        immediate: 'Con có thể gắng lên vì tự ái. Nhưng bên trong là cảm giác mình không đủ.',
        later: 'Ở tuổi đang hỏi "mình là ai", so sánh thường gieo lo âu chứ không gieo động lực — con học cách thấy mình thua.',
      },
      c2: {
        immediate: 'Không khí đỡ căng. Nhưng câu so sánh đã kịp cứa vào.',
        later: 'Không nói lại khiến con tự kết luận rằng bạn thật sự thấy con kém người ta — và mang nó âm thầm.',
      },
      c3: {
        immediate: 'Con thấy được nhìn nhận như chính con, không phải bản sao của ai. Vai con giãn ra.',
        later: 'Được công nhận con đường riêng giúp con xây một cái "tôi" vững — thứ chống đỡ tốt hơn nhiều so với nỗi sợ thua kém.',
      },
    },
    mirrorMoment: 'Khi so con với người khác, bạn muốn con tiến lên — hay đang vô tình trút nỗi lo của mình lên con bằng một phép so sánh?',
  },
  {
    id: 'RP_CHILD_T_A_06',
    group: 'PRESSURE',
    title: 'Mùa thi căng',
    hook: 'Gần kỳ thi lớn. Con căng như dây đàn, cáu gắt, mất ngủ.',
    setup: 'Con đang gồng qua giai đoạn áp lực nhất. Bạn vừa muốn con đạt kết quả tốt, vừa thấy con đang đuối thấy rõ.',
    choices: [
      { id: 'c1', label: 'Nhắc về tầm quan trọng của kỳ thi để con "tập trung hơn"' },
      { id: 'c2', label: 'Gánh hộ mọi việc, chỉ để con học, không động tới chuyện gì khác' },
      { id: 'c3', label: 'Cho con biết kết quả thế nào bạn vẫn ở đây, và giúp con giữ sức' },
    ],
    consequences: {
      c1: {
        immediate: 'Con thấy áp lực dâng thêm, dù bạn chỉ muốn nhắc.',
        later: 'Chồng thêm sức nặng lên lúc con đã căng dễ đẩy con tới kiệt sức — kết quả đôi khi tệ hơn, không tốt hơn.',
      },
      c2: {
        immediate: 'Con được rảnh tay để học. Trông như đang giúp.',
        later: 'Nếu kèm thông điệp ngầm "cả nhà trông vào kỳ thi này", con gánh thêm nỗi sợ làm cả nhà thất vọng.',
      },
      c3: {
        immediate: 'Con thấy nhẹ một phần khi biết tình thương của bạn không treo trên điểm số.',
        later: 'Biết mình được thương dù kết quả ra sao giúp con bớt sợ — và thường nhờ vậy mà làm bài tỉnh táo hơn.',
      },
    },
    mirrorMoment: 'Trong mùa thi của con, bạn ưu tiên kết quả con đạt hay sức con còn lại sau đó — và con cảm nhận được điều bạn ưu tiên là gì?',
  },

  // ═══════════════ CONFLICT (A07–A09) ═══════════════
  {
    id: 'RP_CHILD_T_A_07',
    group: 'CONFLICT',
    title: 'Cãi tay đôi',
    hook: 'Con cãi lại, giọng gắt, nói trống không. Bạn thấy bị hỗn.',
    setup: 'Một chuyện nhỏ thành to. Con phản ứng mạnh hơn hẳn mức bạn nghĩ là hợp lý, và bạn thấy máu nóng dồn lên.',
    choices: [
      { id: 'c1', label: 'Áp đảo lại cho con biết trên dưới' },
      { id: 'c2', label: 'Im và bỏ đi để khỏi to chuyện' },
      { id: 'c3', label: 'Tạm dừng lúc nóng, hẹn nói lại khi cả hai bình tĩnh' },
    ],
    consequences: {
      c1: {
        immediate: 'Con im vì sợ uy. Trận cãi dừng.',
        later: 'Thắng bằng quyền uy dạy con rằng to tiếng hơn là thắng — và lần sau con hoặc bùng dữ hơn, hoặc đóng lại hẳn.',
      },
      c2: {
        immediate: 'Tránh được trận lớn. Nhưng chuyện gây cãi vẫn nằm nguyên đó.',
        later: 'Bỏ đi mà không quay lại khiến con không học được cách sửa sau va chạm — chỉ học cách né.',
      },
      c3: {
        immediate: 'Cắt cơn nóng giúp cả hai khỏi nói điều sẽ tiếc. Con thấy bạn không bỏ cuộc, chỉ tạm dừng.',
        later: 'Quay lại nói khi đã nguội dạy con một điều quý: bất đồng không phá vỡ quan hệ, và con người ta sửa được sau khi cãi.',
      },
    },
    mirrorMoment: 'Khi con cãi lại, điều bị chạm trong bạn là sự an toàn của con, hay cái uy của bạn bị thách thức — và điều đó đẩy bạn phản ứng thế nào?',
  },
  {
    id: 'RP_CHILD_T_A_08',
    group: 'CONFLICT',
    title: 'Đòi tự do',
    hook: 'Con đòi đi chơi khuya hơn, ăn mặc theo ý con, chọn bạn theo ý con.',
    setup: 'Con muốn nới ranh giới. Bạn thấy có cái hợp lý, có cái lo. Con thì cho rằng bạn đang giữ con quá chặt.',
    choices: [
      { id: 'c1', label: 'Giữ nguyên luật cũ, "còn ở nhà này thì theo nếp nhà"' },
      { id: 'c2', label: 'Buông hết cho con tự do, tránh cãi' },
      { id: 'c3', label: 'Cùng con thương lượng: nới chỗ được, giữ chỗ cần, kèm lý do rõ' },
    ],
    consequences: {
      c1: {
        immediate: 'Luật được giữ. Con ấm ức, thấy không được tin.',
        later: 'Siết cứng ở tuổi cần tập tự do dễ khiến con giành tự do bằng cách giấu giếm — bạn mất tầm nhìn vào đời con.',
      },
      c2: {
        immediate: 'Hết cãi. Con được tất cả những gì con đòi.',
        later: 'Không còn ranh giới nào, con thiếu cái khung để tự định hướng — và thấy bất an dù ngoài mặt là thắng.',
      },
      c3: {
        immediate: 'Con thấy được lắng nghe và được tin một phần. Bạn vẫn giữ được điều thật sự quan trọng.',
        later: 'Tập thương lượng dạy con tự do đi kèm trách nhiệm — và giữ được kênh để con vẫn bàn với bạn thay vì lén làm.',
      },
    },
    mirrorMoment: 'Khi con đòi nới ranh giới, bạn phân biệt được đâu là lo thật cho con và đâu là khó buông của bạn không — ranh giới nào là cho con, ranh giới nào là cho bạn?',
  },
  {
    id: 'RP_CHILD_T_A_09',
    group: 'CONFLICT',
    title: 'Cái điện thoại',
    hook: 'Con dán mắt vào điện thoại nhiều giờ. Bạn lo và muốn biết con làm gì trong đó.',
    setup: 'Màn hình chiếm phần lớn thời gian của con. Bạn vừa lo nội dung, vừa lo con xa rời đời thực — và bị cám dỗ muốn kiểm tra máy con.',
    choices: [
      { id: 'c1', label: 'Đọc trộm tin nhắn, theo dõi xem con xem gì' },
      { id: 'c2', label: 'Tịch thu, cấm dùng cho xong' },
      { id: 'c3', label: 'Hỏi để hiểu con dùng nó làm gì, rồi cùng con đặt vài quy ước (không dùng trước ngủ, không trong phòng ngủ)' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn biết được vài thứ. Cảm giác kiểm soát được tình hình.',
        later: 'Nếu con phát hiện, niềm tin vỡ — con sẽ giấu kỹ hơn, dùng cách bạn không lần ra. Bạn mất chính cái cửa sổ mình muốn giữ.',
      },
      c2: {
        immediate: 'Màn hình tắt. Con bị cắt khỏi nó ngay.',
        later: 'Với nhiều teen, bạn bè online cũng là bạn bè thật — cấm sạch dễ cắt một nguồn kết nối con cần, và đẩy con chống lại bạn.',
      },
      c3: {
        immediate: 'Con thấy được hỏi như một người, không bị soi như một nghi phạm. Dễ hé ra con thật sự làm gì trong đó.',
        later: 'Hiểu trước, rồi cùng đặt cấu trúc, thường hiệu quả hơn cấm tiệt — và giữ được lòng tin để con vẫn nói với bạn.',
      },
    },
    mirrorMoment: 'Khi muốn kiểm tra điện thoại con, bạn đang tìm sự an tâm cho mình hay sự an toàn cho con — và việc xem lén có thật sự cho bạn hiểu con, hay chỉ cho bạn thấy con làm gì?',
  },
]
