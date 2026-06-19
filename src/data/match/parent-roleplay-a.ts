// parent-roleplay-a.ts
// Task 2 — ROLE-PLAY A "TÔI XỬ THẾ NÀO" ("Hiểu Bố Mẹ") · 15 case
// Content agent · 17/06/2026 · brief Master duyệt 02:12
// User là CHÍNH MÌNH · 3 choices đều có lý · consequences 2 chiều (cả "ngoan" cũng có cái mất)
// mirrorMoment về HÀNH ĐỘNG/GIÁ TRỊ của USER — KHÔNG hỏi "bố mẹ cần gì" (đó là role-play B)
// KHÔNG choice "cắt đứt/bỏ mặc" được khen · setup trung tính với bố mẹ
// MA PM review trước khi wire vào ParentInsight

export interface ParentRolePlayA {
  id: string
  group: 'PRESSURE' | 'UNHEARD' | 'OVERWORRY' | 'DISTANCE' | 'OTHER'
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

export const PARENT_ROLEPLAY_A: ParentRolePlayA[] = [
  // ═══════════════ PRESSURE (A01–A03) ═══════════════
  {
    id: 'RP_PARENT_A_01',
    group: 'PRESSURE',
    title: 'Nghề họ chọn cho bạn',
    hook: 'Bữa cơm. Bố/mẹ lại nhắc về công việc "ổn định".',
    setup: 'Bạn đang theo một hướng đi mà bạn tin. Bố/mẹ thì muốn bạn chọn con đường an toàn hơn, và lần này họ nói thẳng: "Làm cái nghề đó thì sau này sống bằng gì?"',
    choices: [
      { id: 'c1', label: 'Gật cho qua, để yên bữa cơm' },
      { id: 'c2', label: 'Giải thích kỹ vì sao bạn chọn hướng này' },
      { id: 'c3', label: 'Nói thẳng: "Con biết bố/mẹ lo. Nhưng đây là việc con muốn tự chịu trách nhiệm."' },
    ],
    consequences: {
      c1: {
        immediate: 'Bữa cơm yên. Nhưng bạn nuốt xuống một điều mình rất muốn nói.',
        later: 'Lần sau họ lại nhắc, vì im lặng của bạn bị hiểu là chưa quyết. Khoảng cách dày thêm một chút.',
      },
      c2: {
        immediate: 'Bạn nói nhiều, họ nghe ít. Lý lẽ của bạn va vào một nỗi lo mà lý lẽ khó chạm tới.',
        later: 'Có thể họ hiểu hơn một phần. Cũng có thể cuộc nói chuyện thành tranh cãi, và cả hai cùng mệt.',
      },
      c3: {
        immediate: 'Câu nói vừa công nhận nỗi lo của họ vừa giữ lằn ranh của bạn. Họ có thể chưa hài lòng, nhưng nghe được.',
        later: 'Rủi ro là họ buồn một thời gian. Nhưng bạn không phải chọn giữa "ngoan" và "thật" — bạn giữ được cả hai.',
      },
    },
    mirrorMoment: 'Khi bạn gật cho qua hoặc tranh đến cùng, bạn thường đang cố bảo vệ điều gì cho chính mình?',
  },
  {
    id: 'RP_PARENT_A_02',
    group: 'PRESSURE',
    title: 'Câu hỏi "bao giờ cưới"',
    hook: 'Họ hàng vừa về. Bố/mẹ quay sang: "Con tính bao giờ?"',
    setup: 'Lại câu hỏi quen thuộc. Bạn chưa sẵn sàng, hoặc chưa muốn theo cái lịch mà bố/mẹ mong. Nhưng họ hỏi với một vẻ sốt ruột thật, không chỉ là nói cho có.',
    choices: [
      { id: 'c1', label: 'Cười trừ, hứa "từ từ rồi tính"' },
      { id: 'c2', label: 'Nói rõ bạn không muốn bị giục về chuyện này' },
      { id: 'c3', label: 'Hỏi ngược: "Bố/mẹ lo điều gì khi thấy con chưa cưới?"' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ tạm yên. Nhưng lời hứa mơ hồ đó sẽ quay lại trong lần gặp tới.',
        later: 'Mỗi dịp họ hàng tụ họp lại thành một lần né tránh. Bạn mệt dần với việc cười trừ.',
      },
      c2: {
        immediate: 'Bạn dựng được ranh giới. Nhưng nói thẳng kiểu này dễ làm họ thấy bị gạt ra.',
        later: 'Ranh giới rõ thì đỡ bị giục, nhưng nếu nói lúc nóng, họ có thể nghe thành "con không cần lời khuyên của bố mẹ".',
      },
      c3: {
        immediate: 'Câu hỏi kéo cuộc nói chuyện ra khỏi "bao giờ" sang "vì sao". Bạn có thể nghe được nỗi lo thật.',
        later: 'Chưa chắc họ thôi giục, nhưng cả hai bước ra khỏi vòng hỏi–né, và bạn hiểu thêm điều đứng sau câu hỏi.',
      },
    },
    mirrorMoment: 'Khi bị giục, phản ứng đầu tiên của bạn là né, là chống, hay là hỏi lại — và điều đó nói gì về cách bạn giữ mình?',
  },
  {
    id: 'RP_PARENT_A_03',
    group: 'PRESSURE',
    title: 'Bước đi lớn',
    hook: 'Bạn vừa nói ra dự định lớn — chuyển đi xa, đổi hướng. Bố/mẹ im một lúc.',
    setup: 'Bạn đã cân nhắc kỹ và muốn làm. Bố/mẹ phản đối — không phải vì không thương, mà vì với họ, bước này quá nhiều rủi ro. "Ở yên đây không tốt hơn sao?"',
    choices: [
      { id: 'c1', label: 'Hoãn lại, chờ họ nguôi rồi tính' },
      { id: 'c2', label: 'Cứ quyết định, báo cho có' },
      { id: 'c3', label: 'Vẫn đi, nhưng cùng họ dựng một kế hoạch để họ bớt lo' },
    ],
    consequences: {
      c1: {
        immediate: 'Không khí dịu lại. Nhưng cơ hội có thể trôi qua, và bạn mang theo một nỗi ấm ức khó gọi tên.',
        later: 'Nếu bạn hoãn vì thương mà không nói rõ, sau này dễ thành trách ngầm "vì bố mẹ mà con bỏ lỡ".',
      },
      c2: {
        immediate: 'Bạn giữ được quyết định. Nhưng "báo cho có" khiến họ thấy bị gạt khỏi cuộc đời bạn.',
        later: 'Bạn được tự do, nhưng có thể đánh đổi bằng một khoảng lặng dài giữa hai bên.',
      },
      c3: {
        immediate: 'Khó hơn và lâu hơn. Nhưng việc rủ họ vào kế hoạch cho họ thấy bạn không hề bỏ rơi họ.',
        later: 'Họ vẫn lo, nhưng lo cùng bạn thay vì cản bạn. Bạn vừa được đi, vừa không phải đi một mình về mặt tình cảm.',
      },
    },
    mirrorMoment: 'Giữa "được tự quyết" và "được họ yên tâm", bạn thường ưu tiên cái nào — và cái nào bạn thật sự cần?',
  },

  // ═══════════════ UNHEARD (A04–A06) ═══════════════
  {
    id: 'RP_PARENT_A_04',
    group: 'UNHEARD',
    title: 'Nói mà như không',
    hook: 'Bạn vừa cố giải thích một lựa chọn. Bố/mẹ ngắt: "Thôi, bố/mẹ biết rồi."',
    setup: 'Bạn muốn họ thật sự hiểu chứ không chỉ nghe qua. Nhưng giữa chừng, họ đã chuyển sang nói điều họ định nói từ đầu, như thể phần của bạn không lọt vào.',
    choices: [
      { id: 'c1', label: 'Thôi, không nói nữa' },
      { id: 'c2', label: 'Nói to hơn, cố cho họ nghe hết' },
      { id: 'c3', label: 'Dừng lại: "Con chưa nói xong. Bố/mẹ nghe con thêm một chút được không?"' },
    ],
    consequences: {
      c1: {
        immediate: 'Cuộc nói chuyện kết thúc nhanh. Nhưng bạn rời đi với cảm giác mình vô hình.',
        later: 'Càng im, họ càng tin là họ đã hiểu đúng — và lần sau lại ngắt lời, vì không biết bạn còn điều chưa nói.',
      },
      c2: {
        immediate: 'Âm lượng lên, nội dung tụt xuống. Dễ thành ai nói to hơn người đó thắng.',
        later: 'Nếu thành quen, mỗi cuộc nói chuyện biến thành một trận, và điều cần nói vẫn không ai nghe.',
      },
      c3: {
        immediate: 'Một câu nhẹ nhưng rõ. Có thể họ khựng lại — lần đầu được nhắc rằng bạn chưa nói hết.',
        later: 'Không phải lúc nào cũng hiệu quả ngay, nhưng nó tập cho cả hai một nhịp mới: nghe hết rồi mới đáp.',
      },
    },
    mirrorMoment: 'Khi thấy mình không được nghe, bạn rút lui hay đẩy mạnh hơn — và thói quen đó đến từ đâu?',
  },
  {
    id: 'RP_PARENT_A_05',
    group: 'UNHEARD',
    title: 'Bài giảng quen thuộc',
    hook: 'Bạn kể một chuyện. Vài câu sau, nó thành một bài giảng bạn đã nghe nhiều lần.',
    setup: 'Bạn chỉ muốn được kể, được sẻ chia. Nhưng bố/mẹ lập tức chuyển sang dạy dỗ, khuyên nhủ — đúng cái phản xạ khiến bạn ngại mở lời từ đầu.',
    choices: [
      { id: 'c1', label: 'Ngồi nghe cho hết, gật gật' },
      { id: 'c2', label: 'Ngắt: "Con không cần lời khuyên, con chỉ muốn kể thôi"' },
      { id: 'c3', label: 'Nói trước nhu cầu: "Con kể chuyện này, bố/mẹ nghe giúp con nhé, chưa cần khuyên gì đâu"' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ thấy đã làm tròn vai. Bạn thì lần sau bớt muốn kể.',
        later: 'Càng ít kể, họ càng ít biết về bạn — rồi lại trách "sao con chẳng nói gì với bố mẹ".',
      },
      c2: {
        immediate: 'Bạn nói đúng nhu cầu của mình, nhưng câu ngắt giữa chừng dễ làm họ chạnh lòng.',
        later: 'Họ học được rằng bạn không thích bị khuyên — nhưng có thể kèm cảm giác bị chê là "khuyên dở".',
      },
      c3: {
        immediate: 'Báo trước "chỉ cần nghe" giúp họ biết vai của mình. Đỡ ngượng cho cả hai.',
        later: 'Với thế hệ quen "thương là dạy", cần nhắc vài lần. Nhưng đây là cách dạy lại nhau một kiểu lắng nghe mới.',
      },
    },
    mirrorMoment: 'Bạn thường im để giữ hòa khí, hay nói để được là chính mình — và mỗi lựa chọn đó khiến bạn mất gì?',
  },
  {
    id: 'RP_PARENT_A_06',
    group: 'UNHEARD',
    title: 'Lái sang chuyện khác',
    hook: 'Bạn vừa chạm tới một chuyện khó nói. Bố/mẹ liền lái sang "con người ta".',
    setup: 'Bạn mở lòng về một điều đang nặng. Thay vì ở lại với nó, bố/mẹ chuyển ngay sang so sánh hoặc một chủ đề an toàn hơn — như thể họ không biết phải đỡ chuyện này thế nào.',
    choices: [
      { id: 'c1', label: 'Theo họ lái sang, gác chuyện của mình lại' },
      { id: 'c2', label: 'Kéo về: "Con đang nói chuyện của con mà bố/mẹ"' },
      { id: 'c3', label: 'Nói nhỏ điều mình cần: "Con chỉ cần bố/mẹ ngồi đây với con một lát thôi"' },
    ],
    consequences: {
      c1: {
        immediate: 'Chuyện trôi qua êm. Nhưng điều bạn định nói vẫn nằm nguyên đó, chưa được chạm tới.',
        later: 'Bạn học được rằng chỗ này không an toàn để mở lòng — và lần sau giữ kín nhiều hơn.',
      },
      c2: {
        immediate: 'Bạn kéo cuộc nói chuyện về, nhưng giọng hơi gắt dễ làm họ thủ thế.',
        later: 'Có khi họ hiểu ra, có khi họ thấy bị trách là "không quan tâm" — dù thật ra họ chỉ đang lúng túng.',
      },
      c3: {
        immediate: 'Bạn không đòi họ giải quyết, chỉ xin sự có mặt. Đó là điều họ làm được, kể cả khi không biết nói gì.',
        later: 'Việc hạ kỳ vọng xuống "chỉ cần ở đây" thường mở ra nhiều hơn là đòi họ phải hiểu ngay.',
      },
    },
    mirrorMoment: 'Khi bị lái khỏi điều mình cần, bạn chọn theo cho dễ hay nói ra cho thật — và bạn đang bảo vệ điều gì khi làm vậy?',
  },

  // ═══════════════ OVERWORRY (A07–A09) ═══════════════
  {
    id: 'RP_PARENT_A_07',
    group: 'OVERWORRY',
    title: 'Cuộc gọi thứ năm trong ngày',
    hook: 'Điện thoại lại sáng. Vẫn là câu "ăn cơm chưa, đi đâu đấy".',
    setup: 'Bố/mẹ gọi nhiều, hỏi những điều rất nhỏ. Bạn biết là họ quan tâm, nhưng tần suất này khiến bạn thấy ngột, như đang bị theo dõi hơn là được thương.',
    choices: [
      { id: 'c1', label: 'Bắt máy, trả lời ngắn cho xong' },
      { id: 'c2', label: 'Bơ bớt vài cuộc, nhắn lại sau' },
      { id: 'c3', label: 'Đề xuất một nhịp: "Mỗi tối con gọi bố/mẹ một lần kể chuyện trong ngày, được không?"' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ yên tâm trong chốc lát. Nhưng bên trong bạn còn đọng lại một chút bực.',
        later: 'Trả lời ngắn không làm họ bớt gọi — vì cái họ cần là cảm giác kết nối, không phải thông tin.',
      },
      c2: {
        immediate: 'Bạn được khoảng thở. Nhưng một cuộc gọi nhỡ với người hay lo dễ thành một nỗi lo lớn hơn.',
        later: 'Nếu họ không hiểu vì sao bạn bơ, sự im lặng của bạn có thể nuôi thêm đúng cái lo mà bạn muốn giảm.',
      },
      c3: {
        immediate: 'Bạn cho họ một điểm hẹn chắc chắn để bám vào, thay vì gọi rải rác vì bất an.',
        later: 'Một nhịp cố định thường làm dịu sự lo — vì họ biết chắc sẽ được nghe tin bạn, không phải đi tìm.',
      },
    },
    mirrorMoment: 'Khi thấy bị quan tâm quá mức, bạn thường rút đi để giữ khoảng riêng — khoảng riêng đó với bạn quan trọng vì điều gì?',
  },
  {
    id: 'RP_PARENT_A_08',
    group: 'OVERWORRY',
    title: 'Cấm vì nguy hiểm',
    hook: 'Bạn định làm một việc bình thường. Bố/mẹ gạt phắt: "Đừng, nguy hiểm lắm."',
    setup: 'Với bạn, đây là chuyện bình thường nhiều người vẫn làm. Với bố/mẹ, nó là rủi ro không cần thiết. Họ phản ứng mạnh hơn hẳn mức bạn nghĩ là hợp lý.',
    choices: [
      { id: 'c1', label: 'Thôi không làm nữa cho họ yên' },
      { id: 'c2', label: 'Cứ làm, không kể để khỏi bị cản' },
      { id: 'c3', label: 'Làm, nhưng cho họ thấy bạn đã tính tới an toàn thế nào' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ nhẹ nhõm. Nhưng bạn lại bỏ một việc mình thật sự muốn, chỉ để dập một nỗi lo không phải của mình.',
        later: 'Nhường mãi kiểu này dễ làm thế giới của bạn nhỏ dần theo nỗi sợ của họ.',
      },
      c2: {
        immediate: 'Bạn được tự do, không phải nghe cản. Nhưng bạn đang sống một phần đời mà họ không được biết.',
        later: 'Giấu để tránh xung đột có thể tiện trước mắt, nhưng nó dựng một bức tường ngầm giữa hai bên.',
      },
      c3: {
        immediate: 'Việc cho họ thấy bạn có chuẩn bị không làm nỗi sợ biến mất, nhưng cho nó một chỗ bám thực tế.',
        later: 'Dần dần, họ học được rằng bạn biết tự lo — và phản xạ "cấm" có thể nhẹ đi theo thời gian.',
      },
    },
    mirrorMoment: 'Trước nỗi sợ của bố mẹ, bạn thường co lại hay giấu đi — và bạn đang cố tránh điều gì khi làm vậy?',
  },
  {
    id: 'RP_PARENT_A_09',
    group: 'OVERWORRY',
    title: 'Hỏi qua người khác',
    hook: 'Một người họ hàng nhắn: "Bố/mẹ mày hỏi dạo này mày sao đấy."',
    setup: 'Bố/mẹ không hỏi thẳng bạn, mà dò la qua người khác. Bạn thấy khó chịu — vừa như bị soi, vừa thấy lạ vì sao họ không hỏi mình trực tiếp.',
    choices: [
      { id: 'c1', label: 'Mặc kệ, coi như không biết' },
      { id: 'c2', label: 'Trách họ: "Sao bố/mẹ không hỏi thẳng con?"' },
      { id: 'c3', label: 'Chủ động kể cho họ một ít, trước khi họ phải đi hỏi' },
    ],
    consequences: {
      c1: {
        immediate: 'Không có va chạm. Nhưng vòng dò la đó vẫn tiếp tục sau lưng bạn.',
        later: 'Càng ít thông tin từ bạn, họ càng đi hỏi vòng — và bạn càng thấy bị soi.',
      },
      c2: {
        immediate: 'Bạn nói trúng điều khó chịu. Nhưng lời trách dễ làm họ ngượng và chối.',
        later: 'Họ có thể nhận ra, hoặc thấy bị bắt lỗi vì một việc họ làm chỉ vì không biết hỏi thẳng thế nào.',
      },
      c3: {
        immediate: 'Khi bạn chủ động hé một phần, họ bớt phải đi đường vòng để biết bạn ổn.',
        later: 'Hỏi vòng thường là vì không quen hỏi thẳng. Bạn kể trước một ít có thể tập cho cả hai nói thẳng hơn.',
      },
    },
    mirrorMoment: 'Khi thấy bị "soi", bạn thường đóng lại hay mở ra — và lựa chọn đó nói gì về cách bạn giữ ranh giới?',
  },

  // ═══════════════ DISTANCE (A10–A12) ═══════════════
  {
    id: 'RP_PARENT_A_10',
    group: 'DISTANCE',
    title: 'Bữa cơm lặng',
    hook: 'Bạn về thăm sau mấy tháng. Bố/mẹ ít nói, chỉ lúi húi nấu món bạn thích.',
    setup: 'Bạn muốn gần hơn, muốn có một cuộc trò chuyện thật. Nhưng không khí cứ ngượng ngập, và bố/mẹ thì biểu lộ sự quan tâm qua mâm cơm hơn là qua lời nói.',
    choices: [
      { id: 'c1', label: 'Ăn cho xong, rồi ai về phòng nấy' },
      { id: 'c2', label: 'Cố gợi chuyện, hỏi han nhiều' },
      { id: 'c3', label: 'Ở lại bếp phụ họ, nói chuyện vu vơ trong lúc làm' },
    ],
    consequences: {
      c1: {
        immediate: 'Không ai phải gắng. Nhưng cơ hội gần nhau của chuyến về trôi qua lặng lẽ.',
        later: 'Mỗi lần về thành một lần ngồi cạnh mà vẫn xa — và cả hai cùng tiếc mà không nói.',
      },
      c2: {
        immediate: 'Bạn cố kéo gần, nhưng hỏi dồn dập dễ làm người ít nói thấy bị "phỏng vấn".',
        later: 'Nếu họ chỉ trả lời nhát gừng, bạn dễ nản và kết luận sai rằng "nói chuyện với bố mẹ chẳng được gì".',
      },
      c3: {
        immediate: 'Cùng làm một việc giúp lời nói đến tự nhiên hơn — với người ngại nói, cạnh nhau dễ hơn đối diện nhau.',
        later: 'Những câu vu vơ trong bếp thường mở đường cho những câu thật. Gần nhau qua việc làm là ngôn ngữ họ quen.',
      },
    },
    mirrorMoment: 'Khi muốn gần mà thấy ngượng, bạn thường lùi lại hay gắng quá — và điều gì khiến bạn ngại bước tới?',
  },
  {
    id: 'RP_PARENT_A_11',
    group: 'DISTANCE',
    title: 'Câu chưa từng nói',
    hook: 'Bạn muốn nói "con thương bố/mẹ". Mở miệng ra, lại thấy ngượng.',
    setup: 'Nhà bạn không có thói quen nói thẳng tình cảm. Bạn thương thật, nhưng câu đó nghe lạ lẫm đến mức bạn không biết phải nói lúc nào, kiểu gì cho không gượng.',
    choices: [
      { id: 'c1', label: 'Thôi, để bụng — chắc họ cũng biết' },
      { id: 'c2', label: 'Cứ nói thẳng ra, dù ngượng' },
      { id: 'c3', label: 'Nói qua một hành động — mua món họ thích, nhắn một tin nhỏ' },
    ],
    consequences: {
      c1: {
        immediate: 'Không có gì ngượng xảy ra. Nhưng điều bạn muốn trao vẫn ở lại trong lòng bạn.',
        later: '"Chắc họ cũng biết" là điều ta hay nghĩ — cho đến một ngày không còn cơ hội để nói nữa.',
      },
      c2: {
        immediate: 'Có thể họ sững lại, đáp lúng túng. Nhưng một câu thật, dù vụng, vẫn chạm tới.',
        later: 'Lần đầu khó nhất. Sau đó, có khi chính họ cũng học được cách nói lại điều tương tự.',
      },
      c3: {
        immediate: 'Một hành động nhỏ nói hộ lời khó nói, theo đúng ngôn ngữ mà cả nhà quen.',
        later: 'Bắt đầu bằng hành động dễ hơn, và dần dần mở đường cho cả những lời nói thẳng về sau.',
      },
    },
    mirrorMoment: 'Điều gì khiến nói "con thương bố/mẹ" khó với bạn — và bạn đang chờ điều gì để nói được?',
  },
  {
    id: 'RP_PARENT_A_12',
    group: 'DISTANCE',
    title: 'Im lặng kéo dài',
    hook: 'Sau lần cãi, bố/mẹ không nói gì với bạn đã mấy ngày.',
    setup: 'Một cuộc cãi để lại sự im lặng nặng nề. Bạn không biết họ đang giận, đang buồn, hay đang chờ bạn lên tiếng trước — và bạn cũng không chắc mình nên làm gì.',
    choices: [
      { id: 'c1', label: 'Chờ họ nói trước, mình không xuống nước' },
      { id: 'c2', label: 'Làm như không có gì, nói chuyện bình thường' },
      { id: 'c3', label: 'Chủ động: "Hôm trước hai bố/mẹ con căng quá. Con vẫn muốn nói chuyện lại với bố/mẹ."' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn giữ được cái lý của mình. Nhưng nếu cả hai cùng chờ, im lặng có thể kéo rất dài.',
        later: 'Với người khó mở lời, "chờ họ trước" đôi khi là chờ một điều không đến — rồi cả hai cùng quên mất lý do ban đầu.',
      },
      c2: {
        immediate: 'Không khí có vẻ tan băng. Nhưng điều gây ra trận cãi vẫn nằm đó, chưa được chạm tới.',
        later: 'Bỏ qua mà không nói lại dễ khiến cùng chuyện đó bùng lên lần sau, lớn hơn.',
      },
      c3: {
        immediate: 'Bạn không nhận hết lỗi, cũng không đổ lỗi — chỉ mở lại cánh cửa. Với người ngại nói, đó là một lối thoát.',
        later: 'Là người bắc cầu trước không có nghĩa là bạn sai. Nó thường là điều phá vỡ thế bế tắc mà cả hai đang kẹt.',
      },
    },
    mirrorMoment: 'Trong im lặng, giữ thể diện và nối lại kết nối — bạn thường chọn cái nào, và vì sao cái đó quan trọng với bạn?',
  },

  // ═══════════════ OTHER (A13–A15) ═══════════════
  {
    id: 'RP_PARENT_A_13',
    group: 'OTHER',
    title: '"Con nhà người ta"',
    hook: 'Lại một câu so sánh. "Nhìn con nhà cô A kìa..."',
    setup: 'Bố/mẹ đem bạn ra so với người khác. Bạn biết có thể họ không cố ý làm bạn đau, nhưng câu đó vẫn cứa vào đúng chỗ bạn vốn đã tự ti.',
    choices: [
      { id: 'c1', label: 'Im, nuốt vào trong' },
      { id: 'c2', label: 'Phản lại: "Vậy bố/mẹ thích con nhà người ta hơn à?"' },
      { id: 'c3', label: 'Nói thật cảm giác: "Nghe so sánh vậy con buồn. Con đang cố theo cách của con."' },
    ],
    consequences: {
      c1: {
        immediate: 'Câu chuyện qua đi. Nhưng vết cứa đó ở lại, và cộng dồn với những lần trước.',
        later: 'Im mãi khiến họ tưởng lời so sánh "có tác dụng", nên còn lặp lại — trong khi nó chỉ làm bạn mòn đi.',
      },
      c2: {
        immediate: 'Bạn bật lại cho hả. Nhưng câu hỏi gắt dễ thành một trận cãi mới, chệch khỏi điều bạn thật sự đau.',
        later: 'Họ có thể chống chế "bố/mẹ có ý gì đâu" — và cái đau thật của bạn lại trôi mất trong cuộc cãi.',
      },
      c3: {
        immediate: 'Bạn nói về cảm giác của mình, không quy tội. Họ có chỗ để nghe mà không phải phòng thủ.',
        later: 'Khi họ biết câu đó làm bạn đau thế nào, nhiều người sẽ bớt lại — vì làm bạn đau chưa bao giờ là điều họ muốn.',
      },
    },
    mirrorMoment: 'Khi bị so sánh, bạn thấy mình kém đi hay thấy cần chứng minh — và bạn thật sự muốn được công nhận điều gì?',
  },
  {
    id: 'RP_PARENT_A_14',
    group: 'OTHER',
    title: 'Chuyện tiền nong',
    hook: 'Bố/mẹ nhắc tới tiền — gửi về, lo cho nhà, hoặc một khoản họ mong bạn góp.',
    setup: 'Tiền với gia đình bạn không chỉ là tiền — nó gắn với bổn phận, với "báo hiếu". Bạn vừa muốn lo cho bố/mẹ, vừa thấy áp lực khi kỳ vọng vượt quá sức mình.',
    choices: [
      { id: 'c1', label: 'Cố gồng cho đủ, không nói gì về khó khăn của mình' },
      { id: 'c2', label: 'Từ chối thẳng, nói mình không kham nổi' },
      { id: 'c3', label: 'Nói thật mức mình lo được, và thật lòng muốn lo trong khả năng đó' },
    ],
    consequences: {
      c1: {
        immediate: 'Họ yên tâm, thấy con có hiếu. Nhưng bạn âm thầm gánh quá sức mình.',
        later: 'Gồng mãi mà không nói dễ dẫn tới kiệt sức, hoặc một ngày vỡ ra thành trách móc cả hai bên.',
      },
      c2: {
        immediate: 'Bạn bảo vệ được giới hạn của mình. Nhưng từ chối thẳng dễ bị nghe thành "con không lo cho bố mẹ".',
        later: 'Với gia đình coi trọng báo hiếu, một lời "không" trơn dễ để lại vết — trừ khi đi kèm sự giải thích.',
      },
      c3: {
        immediate: 'Bạn vừa giữ tấm lòng muốn lo, vừa thành thật về giới hạn. Khó hơn, nhưng thật hơn.',
        later: 'Một mức rõ ràng và chân thành thường bền hơn cả việc gồng quá sức lẫn việc từ chối lạnh lùng.',
      },
    },
    mirrorMoment: 'Giữa "lo cho bố mẹ" và "lo cho chính mình", bạn thường nghiêng về đâu — và bạn sợ điều gì nếu nghiêng về phía kia?',
  },
  {
    id: 'RP_PARENT_A_15',
    group: 'OTHER',
    title: 'Can vào chuyện riêng',
    hook: 'Bố/mẹ góp ý vào chuyện rất riêng của bạn — người yêu, cách sống, cách bạn nuôi con.',
    setup: 'Bạn đã là người lớn, có cuộc sống riêng. Nhưng bố/mẹ vẫn can vào sâu, với một vẻ đương nhiên — như thể đó là chuyện chung của cả nhà, không phải việc riêng của bạn.',
    choices: [
      { id: 'c1', label: 'Nghe cho qua, rồi vẫn làm theo ý mình' },
      { id: 'c2', label: 'Nói thẳng đây là việc riêng, mong họ đừng can' },
      { id: 'c3', label: 'Đặt ranh giới mềm: "Con nghe góp ý của bố/mẹ, nhưng việc này con sẽ tự quyết."' },
    ],
    consequences: {
      c1: {
        immediate: 'Tránh được va chạm trước mắt. Nhưng việc "nghe rồi làm khác" dễ bị phát hiện và thành chuyện lớn hơn.',
        later: 'Họ vẫn can, vì chưa bao giờ được nghe rõ đâu là ranh giới của bạn.',
      },
      c2: {
        immediate: 'Bạn dựng được ranh giới. Nhưng "đừng can" nói trống dễ chạm vào tự ái của họ.',
        later: 'Với bố mẹ quen coi chuyện con là chuyện chung, câu này cần nói khéo, nếu không dễ thành "con đẩy bố mẹ ra".',
      },
      c3: {
        immediate: 'Bạn vừa tôn trọng họ ("con nghe"), vừa giữ quyền quyết ("con tự quyết"). Một ranh giới có cả hai.',
        later: 'Ranh giới mềm mà rõ thường được tôn trọng dần — vì nó không bắt họ phải im, chỉ đặt lại vai trò.',
      },
    },
    mirrorMoment: 'Khi bị can vào chuyện riêng, bạn thường né hay dựng tường — và bạn đang cố giữ điều gì là của riêng mình?',
  },
]
