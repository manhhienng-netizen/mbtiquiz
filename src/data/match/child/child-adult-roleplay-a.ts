// child-adult-roleplay-a.ts
// Đợt 3 MẺ C — ROLE-PLAY A "TÔI XỬ THẾ NÀO" · CON TRƯỞNG THÀNH (18+) · 9 case (3 nhóm × 3)
// Content agent · 17/06/2026 · user = BỐ MẸ · ngôi "bạn"
// 3 choices · hệ quả 2 chiều · mirrorMoment về BỐ MẸ · từ "quản" → "đồng hành"
// ⚠️ KHÔNG choice "quyết thay con / ép con nghe" được khen · treat con như người lớn bình đẳng
// Nhóm: CHOICES (lựa chọn sống/nghề/bạn đời) · DISTANCE (xa cách/ít về) · ADULTHOOD (tôn trọng người lớn)

export interface ChildAdultRolePlayA {
  id: string
  group: 'CHOICES' | 'DISTANCE' | 'ADULTHOOD'
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

export const CHILD_ADULT_ROLEPLAY_A: ChildAdultRolePlayA[] = [
  // ═══════════════ CHOICES (A01–A03) ═══════════════
  {
    id: 'RP_CHILD_AD_A_01',
    group: 'CHOICES',
    title: 'Con đường con chọn',
    hook: 'Con báo một quyết định nghề nghiệp mà bạn thấy bấp bênh.',
    setup: 'Con đã là người lớn, đã cân nhắc và quyết. Bạn thì thấy quá nhiều rủi ro, và bản năng muốn ngăn con lại trỗi lên.',
    choices: [
      { id: 'c1', label: 'Phản đối mạnh, dùng kinh nghiệm để ngăn con' },
      { id: 'c2', label: 'Im lặng không đồng tình, giữ trong lòng' },
      { id: 'c3', label: 'Nói rõ điều bạn lo, một lần, rồi để con tự quyết' },
    ],
    consequences: {
      c1: {
        immediate: 'Con có thể nhượng bộ, hoặc cãi lại gay gắt rồi vẫn làm theo ý mình.',
        later: 'Ngăn cản một người lớn dễ khiến con thấy không được tin — và lần sau con quyết xong mới báo, hoặc không báo nữa.',
      },
      c2: {
        immediate: 'Tránh được va chạm. Nhưng sự không đồng tình vẫn lơ lửng trong không khí.',
        later: 'Con cảm được sự im lặng nặng nề đó — và mang theo cảm giác làm bạn thất vọng dù bạn không nói.',
      },
      c3: {
        immediate: 'Con nghe được nỗi lo của bạn, và cũng thấy bạn tôn trọng quyền quyết của mình.',
        later: 'Nói một lần rồi buông giúp con biết bạn vẫn ở đây nếu cần — và giữ được kênh để con quay lại bàn với bạn khi có chuyện.',
      },
    },
    mirrorMoment: 'Khi muốn ngăn con, bạn đang bảo vệ con khỏi rủi ro, hay đang giữ cảm giác mình vẫn còn che chở được cho con như xưa?',
  },
  {
    id: 'RP_CHILD_AD_A_02',
    group: 'CHOICES',
    title: 'Người con chọn',
    hook: 'Con đưa về một người bạn đời mà bạn có nhiều lo ngại.',
    setup: 'Con đang hạnh phúc, hoặc ít nhất là chắc chắn về lựa chọn của mình. Bạn thì thấy những điều con chưa thấy, và sợ con sẽ khổ.',
    choices: [
      { id: 'c1', label: 'Phản đối thẳng, đặt điều kiện' },
      { id: 'c2', label: 'Chấp nhận miễn cưỡng nhưng tỏ thái độ' },
      { id: 'c3', label: 'Nói thật nỗi lo một cách tôn trọng, rồi cho mối quan hệ một cơ hội thật' },
    ],
    consequences: {
      c1: {
        immediate: 'Con phòng thủ, bảo vệ người kia, và khoảng cách giữa bạn với con giãn ra.',
        later: 'Ép con chọn giữa bạn và người con yêu thường đẩy con về phía người kia — và đẩy bạn ra khỏi đời con.',
      },
      c2: {
        immediate: 'Bề ngoài chấp nhận, nhưng thái độ lạnh khiến mọi cuộc gặp đều căng.',
        later: 'Con đọc được sự không ưng đó, và dần ngại đưa người kia về — bạn mất chỗ trong một phần lớn đời con.',
      },
      c3: {
        immediate: 'Con thấy bạn thành thật mà vẫn tôn trọng. Người kia được cho một cơ hội công bằng.',
        later: 'Giữ cửa mở giúp bạn vẫn ở trong đời con dù chuyện tình thế nào — và nếu sau này có trục trặc thật, con biết bạn là nơi quay về, không phải nơi bị "đã bảo rồi".',
      },
    },
    mirrorMoment: 'Khi lo về người con chọn, bạn phân biệt được đâu là rủi ro thật và đâu là điều chỉ khác với hình dung của bạn không?',
  },
  {
    id: 'RP_CHILD_AD_A_03',
    group: 'CHOICES',
    title: 'Lối sống khác',
    hook: 'Con sống theo một cách bạn thấy lạ — chưa cưới, không sinh con, hay một lựa chọn khác nếp quen.',
    setup: 'Con sống ổn theo cách của con. Nhưng nó khác xa điều bạn hình dung về một cuộc đời "đủ đầy", và bạn lo, hoặc thấy khó hiểu.',
    choices: [
      { id: 'c1', label: 'Thúc giục con sống theo nếp "bình thường"' },
      { id: 'c2', label: 'Than thở, để con thấy bạn buồn vì điều đó' },
      { id: 'c3', label: 'Hỏi để hiểu lựa chọn của con trước khi đánh giá nó' },
    ],
    consequences: {
      c1: {
        immediate: 'Con thấy không được chấp nhận như con đang là, và dựng tường lên.',
        later: 'Thúc giục lặp lại biến mỗi cuộc gặp thành một lần bị nhắc — con về thưa dần để tránh.',
      },
      c2: {
        immediate: 'Con thấy có lỗi vì làm bạn buồn, dù con không sống sai.',
        later: 'Nỗi buồn dùng như một sức ép âm thầm có thể giữ con gần một thời gian, nhưng để lại oán ngầm và mệt mỏi cho cả hai.',
      },
      c3: {
        immediate: 'Con thấy được nhìn như một người lớn có lý do riêng, không phải một đứa trẻ đi lạc.',
        later: 'Hiểu trước khi đánh giá giúp bạn thấy con vẫn ổn theo cách của con — và con giữ bạn lại như một người con muốn chia sẻ, không phải né.',
      },
    },
    mirrorMoment: 'Khi con sống khác hình dung của bạn, điều khiến bạn khó nhất là lo cho con, hay là buông cái hình dung mà bạn đã giữ bao năm về đời con?',
  },

  // ═══════════════ DISTANCE (A04–A06) ═══════════════
  {
    id: 'RP_CHILD_AD_A_04',
    group: 'DISTANCE',
    title: 'Cuộc gọi thưa dần',
    hook: 'Con ít gọi, ít kể hơn trước. Bạn thấy hụt.',
    setup: 'Con cuốn vào đời sống riêng. Bạn nhớ những ngày con còn kể bạn nghe đủ thứ, và bắt đầu thấy mình bị bỏ lại phía sau.',
    choices: [
      { id: 'c1', label: 'Trách con "bận đến mức không gọi nổi cho bố/mẹ"' },
      { id: 'c2', label: 'Im lặng chờ con chủ động, không gọi trước' },
      { id: 'c3', label: 'Chủ động giữ liên lạc nhẹ nhàng, không kèm trách móc' },
    ],
    consequences: {
      c1: {
        immediate: 'Con gọi vì áy náy. Nhưng cuộc gọi mang theo cảm giác bị bắt lỗi.',
        later: 'Gọi vì tội lỗi không bền — con dần gọi cho tròn bổn phận, chứ không vì muốn nói chuyện với bạn.',
      },
      c2: {
        immediate: 'Bạn giữ được lòng tự trọng. Nhưng nếu cả hai cùng chờ, khoảng lặng kéo dài.',
        later: 'Chờ con trước có thể là chờ một điều không đến — vì con đang cuốn vào đời mình, không phải đang quên bạn.',
      },
      c3: {
        immediate: 'Con nhận được sự quan tâm nhẹ nhõm, không kèm sức nặng. Dễ đáp lại hơn.',
        later: 'Liên lạc không kèm trách móc giúp con thấy gọi về là điều dễ chịu — và con chủ động nhiều hơn theo thời gian.',
      },
    },
    mirrorMoment: 'Khi con ít gọi, bạn cần con báo cáo cuộc sống, hay cần cảm giác mình vẫn quan trọng với con — và cách bạn nhắn cho con thể hiện điều nào?',
  },
  {
    id: 'RP_CHILD_AD_A_05',
    group: 'DISTANCE',
    title: 'Lâu rồi con chưa về',
    hook: 'Đã lâu con chưa về nhà. Bạn vừa nhớ vừa chạnh lòng.',
    setup: 'Con bận, con ở xa, con có trăm lý do. Bạn hiểu, nhưng cái ghế trống mỗi bữa cơm vẫn nhắc bạn rằng con đã có một đời sống không còn xoay quanh nhà.',
    choices: [
      { id: 'c1', label: 'Trách móc mỗi lần con gọi, "có mỗi về nhà cũng khó"' },
      { id: 'c2', label: 'Giấu nỗi nhớ, nói "bố/mẹ ổn, con cứ lo việc con"' },
      { id: 'c3', label: 'Nói thật là bạn nhớ con, không kèm trách, và làm chuyến về nhẹ nhàng' },
    ],
    consequences: {
      c1: {
        immediate: 'Con thấy nặng, hứa về cho qua.',
        later: 'Nếu về nhà gắn với bị trách, con càng ngại về — đúng điều ngược với điều bạn mong.',
      },
      c2: {
        immediate: 'Bạn không làm con áy náy. Nhưng con cũng không biết bạn đang nhớ thế nào.',
        later: 'Giấu mãi, con tưởng bạn không cần — và càng dễ trì hoãn chuyến về vì nghĩ "lúc nào về cũng được".',
      },
      c3: {
        immediate: 'Con cảm được tình thương thật mà không bị đè bằng tội lỗi. Dễ muốn về hơn.',
        later: 'Khi về nhà là một niềm vui chứ không phải một nghĩa vụ kèm trách móc, con tự thu xếp về nhiều hơn.',
      },
    },
    mirrorMoment: 'Khi con ít về, bạn thường biến nỗi nhớ thành lời trách — điều gì khiến nói thẳng "bố/mẹ nhớ con" lại khó hơn là trách con?',
  },
  {
    id: 'RP_CHILD_AD_A_06',
    group: 'DISTANCE',
    title: 'Đời sống riêng của con',
    hook: 'Con có thế giới riêng — công việc, bạn bè, gia đình nhỏ — mà bạn không thuộc về.',
    setup: 'Con đã xây một cuộc đời của riêng con. Bạn thấy mừng, nhưng cũng thấy mình đứng bên rìa một thế giới mà mình từng là trung tâm.',
    choices: [
      { id: 'c1', label: 'Tìm cách chen vào, có mặt nhiều hơn dù con không mời' },
      { id: 'c2', label: 'Rút lui hẳn, nghĩ "con không cần mình nữa"' },
      { id: 'c3', label: 'Tôn trọng thế giới riêng của con, và tìm một vai trò mới phù hợp' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn được tham gia nhiều hơn. Nhưng con thấy bị lấn vào không gian riêng.',
        later: 'Chen vào khi không được mời dễ làm con dựng ranh giới cứng hơn — bạn càng cố gần, con càng giữ khoảng cách.',
      },
      c2: {
        immediate: 'Bạn tránh làm phiền con. Nhưng rút lui hẳn để lại một khoảng trống cho cả hai.',
        later: 'Hiểu lầm "con không cần mình" thành tự rút lui có thể khiến con tưởng bạn không còn quan tâm — cả hai cùng xa đi vì hiểu nhầm.',
      },
      c3: {
        immediate: 'Con thấy được tôn trọng, và bạn vẫn có một chỗ — chỉ là một chỗ khác trước.',
        later: 'Chuyển từ trung tâm sang người đồng hành đáng tin giúp con chủ động kéo bạn vào đời con — vì ở bên bạn không còn là bị lấn.',
      },
    },
    mirrorMoment: 'Khi con có đời sống riêng, bạn thấy mình mất vai trò — hay đang được mời nhận một vai trò mới mà bạn chưa quen?',
  },

  // ═══════════════ ADULTHOOD (A07–A09) ═══════════════
  {
    id: 'RP_CHILD_AD_A_07',
    group: 'ADULTHOOD',
    title: 'Vẫn muốn dặn dò',
    hook: 'Bạn lại dặn con những điều như hồi con còn nhỏ. Con tỏ ra khó chịu.',
    setup: 'Với bạn, con vẫn là con, và dặn dò là thương. Nhưng con đã tự lo cho mình được lâu rồi, và những lời nhắc khiến con thấy không được xem là người lớn.',
    choices: [
      { id: 'c1', label: 'Dặn tiếp, "bố/mẹ nói vì lo cho con thôi"' },
      { id: 'c2', label: 'Tự ái, im luôn không nói gì nữa' },
      { id: 'c3', label: 'Chuyển từ dặn dò sang hỏi ý con, như nói chuyện giữa hai người lớn' },
    ],
    consequences: {
      c1: {
        immediate: 'Con nghe cho qua, hoặc gắt lên vì thấy bị coi như trẻ con.',
        later: 'Giữ vai "bố mẹ dặn con" mãi khiến con né những cuộc trò chuyện — vì với con, chúng không phải đối thoại mà là chỉ dạy.',
      },
      c2: {
        immediate: 'Bạn ngừng dặn. Nhưng sự im lặng tự ái tạo một khoảng lạnh.',
        later: 'Rút lui vì giận dễ làm con bối rối không hiểu mình làm gì sai — khoảng cách lớn lên từ một hiểu lầm nhỏ.',
      },
      c3: {
        immediate: 'Con thấy được nói chuyện ngang hàng, nên mở lòng hơn hẳn.',
        later: 'Hỏi ý thay vì dặn dò mời con vào một mối quan hệ người-lớn-với-người-lớn — và con tìm đến bạn để bàn, vì thấy được tôn trọng.',
      },
    },
    mirrorMoment: 'Khi vẫn muốn dặn con, bạn đang đáp ứng nhu cầu của con, hay nhu cầu của bạn được tiếp tục là người che chở?',
  },
  {
    id: 'RP_CHILD_AD_A_08',
    group: 'ADULTHOOD',
    title: 'Hỏi ý rồi làm khác',
    hook: 'Con hỏi ý bạn, rồi cuối cùng làm theo cách khác. Bạn thấy bị xem nhẹ.',
    setup: 'Con có hỏi bạn thật. Nhưng quyết định cuối cùng lại không theo lời bạn, và bạn thấy như ý kiến của mình chẳng có sức nặng gì.',
    choices: [
      { id: 'c1', label: 'Trách con "hỏi làm gì rồi không nghe"' },
      { id: 'c2', label: 'Lần sau không góp ý nữa, "tự con quyết hết đi"' },
      { id: 'c3', label: 'Hiểu rằng hỏi ý là con coi trọng bạn, dù quyết định cuối là của con' },
    ],
    consequences: {
      c1: {
        immediate: 'Con thấy bị trách vì đã tự quyết — nên lần sau ngại hỏi.',
        later: 'Đòi con phải nghe theo mới là "tôn trọng" khiến con thôi hỏi ý bạn — bạn mất luôn cái cửa con vẫn mở.',
      },
      c2: {
        immediate: 'Bạn rút lui cho đỡ tổn thương. Nhưng con hiểu là bạn không còn muốn tham gia.',
        later: 'Ngừng góp ý vì giận làm con tưởng bạn hết quan tâm — trong khi con vẫn quý lời bạn, chỉ là quyết định là của con.',
      },
      c3: {
        immediate: 'Bạn nhẹ lòng hơn khi thấy việc con hỏi đã là một sự coi trọng.',
        later: 'Hiểu rằng góp ý và quyết định là hai việc khác nhau giúp bạn vẫn là người con tìm đến — vì hỏi bạn không còn nghĩa là phải nghe theo.',
      },
    },
    mirrorMoment: 'Khi con hỏi ý rồi làm khác, bạn cần lời khuyên của mình được thực hiện, hay cần biết tiếng nói của mình vẫn có chỗ trong đời con — và hai cái đó có phải là một?',
  },
  {
    id: 'RP_CHILD_AD_A_09',
    group: 'ADULTHOOD',
    title: 'Con đặt ranh giới',
    hook: 'Con nói rõ một ranh giới — về chuyện riêng, hay cách con nuôi con của con.',
    setup: 'Con lịch sự nhưng dứt khoát: việc này là của con, mong bạn đừng can. Bạn thấy hẫng, như bị đẩy ra khỏi điều mình vẫn nghĩ là chuyện chung.',
    choices: [
      { id: 'c1', label: 'Vượt qua ranh giới đó, vẫn can theo ý mình' },
      { id: 'c2', label: 'Giận dỗi, thấy con "cãi cha mẹ"' },
      { id: 'c3', label: 'Tôn trọng ranh giới, cho con biết bạn vẫn ở đây nếu con cần' },
    ],
    consequences: {
      c1: {
        immediate: 'Bạn được làm theo ý mình lần này. Nhưng con thấy ranh giới của mình không được coi trọng.',
        later: 'Vượt ranh giới của một người lớn dễ làm con dựng tường cao hơn — và giữ khoảng cách để tự bảo vệ không gian của mình.',
      },
      c2: {
        immediate: 'Con thấy bị quy là bất hiếu chỉ vì muốn tự quyết chuyện của mình.',
        later: 'Đọc ranh giới thành "cãi cha mẹ" đẩy con vào thế phải chọn giữa là chính mình và làm bạn vui — một lựa chọn không nên có.',
      },
      c3: {
        immediate: 'Con thấy được tôn trọng như một người lớn, và thấy bạn không hề bỏ rơi mình.',
        later: 'Tôn trọng ranh giới mà vẫn giữ cửa mở giúp con tin rằng đến với bạn là an toàn — và con thường tự kéo bạn lại gần hơn.',
      },
    },
    mirrorMoment: 'Khi con đặt ranh giới, bạn đọc đó là con đẩy bạn ra, hay con đang mời bạn vào một kiểu quan hệ mới giữa hai người lớn — và cách đọc đó đổi phản ứng của bạn thế nào?',
  },
]
