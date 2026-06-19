// l1-unified-narratives.ts
// 16 L1 Unified Report narratives · spec PA PM 15/06/2026 14:00
// Cấu trúc 6 sections: title / intro / body[4] / nguHanhHook / soHocHook / nhatChuHook / closing
// Placeholder GIỮ NGUYÊN cho runtime fill từ Dexie:
//   {{NGU_HANH_LABEL}} {{NGU_HANH_CORE}} · {{LIFE_PATH}} {{LIFE_PATH_THEME}} · {{NHAT_CHU_LABEL}} {{NHAT_CHU_IMAGE}}
// body[0]=cách nghĩ (type-specific) · body[1]=năng lượng+ngũ hành · body[2]=quan hệ+nhật chủ · body[3]=mạnh+vùng ý thức ("có xu hướng")
// closing CỐ ĐỊNH cho cả 16 type · ngôi "bạn" · không tên type · không tên hàm cognitive
// PA PM review từ cấm + ngôi + placeholder trước khi wire

export interface L1Narrative {
  title: string
  intro: string
  body: [string, string, string, string]
  nguHanhHook: string
  soHocHook: string
  nhatChuHook: string
  closing: string
}

const CLOSING = 'Đọc đến đây, điều nào bạn thấy đúng nhất — và điều nào bạn chưa sẵn sàng đồng ý?'

export const L1_UNIFIED_NARRATIVES: Record<string, L1Narrative> = {
  // ══════════════ NHÓM 1 — NT ══════════════

  INTJ: {
    title: 'Bạn xây xong công trình trong đầu trước khi người khác còn tìm bút.',
    intro: `Bạn không làm theo bản năng — bạn làm theo hệ thống mà bạn đã kiểm tra kỹ trong im lặng. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — không phải ngẫu nhiên mà bạn thường thấy rõ hơn người khác điều gì sẽ xảy ra tiếp theo.`,
    body: [
      `Bạn xử lý thế giới bằng cách tìm cấu trúc ẩn bên dưới bề mặt — thấy kết nối mà người khác bỏ qua, nhận ra mâu thuẫn trước khi nó bùng phát. Quyết định của bạn có vẻ lạnh, nhưng thực ra đã trải qua nhiều vòng kiểm tra nội tâm mà bạn không bao giờ nói ra hết.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn nạp lại năng lượng trong không gian yên tĩnh — không phải vì ngại người, mà vì tiếng ồn xã hội làm nhiễu những suy nghĩ bạn đang xây dựng.`,
      `Bạn không bày tỏ tình cảm bằng lời — bạn bày tỏ bằng hành động: giải quyết vấn đề trước khi được nhờ, nhớ chi tiết quan trọng mà người kia đã nói một lần. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó chiều kiên định: bạn chọn kết nối chậm nhưng một khi đã chọn, hiếm khi bỏ.`,
      `Bạn có xu hướng nhìn xa và giữ tiêu chuẩn cao — hai thứ giúp bạn tạo ra những thứ đáng giá lâu dài. Bạn cũng có xu hướng kỳ vọng người khác hiểu mà không cần giải thích — trong khi người thật sự cần nghe bạn nói ra.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — thứ nâng tầm cái logic của bạn thành thứ gì đó người khác thật sự cảm nhận được.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — một lớp chiều sâu nữa dưới những gì bạn đã biết về mình.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó nói lên thứ mà MBTI không đặt tên được: cái cách bạn đứng vững khi mọi thứ xung quanh lung lay.`,
    closing: CLOSING,
  },

  INTP: {
    title: 'Bạn tháo rời mọi thứ ra để hiểu nó — kể cả khi không ai nhờ.',
    intro: `Bạn ít tin vào "xưa nay vẫn vậy" và hay tin vào thứ mình tự kiểm chứng được. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — lý do bạn bị cuốn vào những câu hỏi mà người khác đã sớm bỏ qua.`,
    body: [
      `Bạn xử lý thế giới bằng cách lật lại giả định và tìm nguyên lý bên dưới. Khi người khác chấp nhận một câu trả lời, bạn vẫn hỏi "nhưng có thật là vậy không" — không phải để gây sự, mà vì một lập luận chưa chặt làm bạn khó chịu thật sự.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn cần khoảng riêng để ý tưởng kịp thành hình — một cuộc trò chuyện hay nhất với bạn đôi khi diễn ra trong chính đầu bạn trước đã.`,
      `Bạn gắn kết qua sự tò mò chung hơn là qua lời lẽ tình cảm — một cuộc bàn luận sâu về điều cả hai cùng thắc mắc, với bạn, đã là một dạng gần gũi. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó cách bạn lặng lẽ trung thành theo kiểu ít ai để ý.`,
      `Bạn có xu hướng cởi mở trí tuệ và sẵn sàng đổi ý khi có lý lẽ tốt hơn — điều rất hiếm. Bạn cũng có xu hướng phân tích đến mức trì hoãn hành động, vì một ý tưởng trong đầu luôn gọn gàng hơn một việc làm dở ngoài đời.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm nền cho cách bạn lặng lẽ quan sát trước khi lên tiếng.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — soi thêm một góc vào điều bạn vẫn đi tìm mà ít khi gọi tên.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó hé lộ cách bạn phản ứng ở tầng bản năng, bên dưới mọi lớp phân tích.`,
    closing: CLOSING,
  },

  ENTJ: {
    title: 'Bạn nhìn vào mớ hỗn loạn và thấy ngay nó nên được sắp xếp ra sao.',
    intro: `Bạn thấy đích trước, rồi dựng đường đi tới đó trong khi người khác còn đang bàn nên làm gì. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — một lớp nữa dưới cái khí thế dẫn dắt vốn có ở bạn.`,
    body: [
      `Bạn xử lý thế giới bằng mục tiêu và lộ trình: thấy kết quả cần đạt, bạn tự động tổ chức nguồn lực và loại bỏ những gì cản đường. Bạn quyết nhanh và dứt khoát, vì với bạn, một lựa chọn đủ tốt làm hôm nay đáng hơn một lựa chọn hoàn hảo mãi nằm trên giấy.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn rõ ràng hơn khi nói ra và bắt tay vào việc — năng lượng của bạn lớn lên giữa hành động, không phải trong lúc chờ đợi.`,
      `Bạn thể hiện sự quan tâm bằng cách kéo người mình thương đi lên — đầu tư vào họ, mở đường cho họ, bảo vệ họ quyết liệt. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó cái cốt vững mà người gần bạn dựa vào, ngay cả khi lời bạn nói ra nghe có vẻ thẳng.`,
      `Bạn có xu hướng biến ý tưởng thành kết quả và dám gánh phần khó về mình — điều khiến người ta tin tưởng đi theo bạn. Bạn cũng có xu hướng thúc người khác tiến nhanh như chính mình, mà quên hỏi xem họ có cùng tốc độ không.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — hòa cùng cái khí thế dẫn dắt vốn đã sẵn trong cách bạn xuất hiện.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đặt cạnh khả năng tổ chức của bạn một chiều mà người ngoài ít khi đoán được.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó nói lên cách bạn phản ứng khi mọi thứ vượt khỏi kế hoạch.`,
    closing: CLOSING,
  },

  ENTP: {
    title: 'Bạn nhìn một ý tưởng từ năm góc trước khi người khác xong góc đầu tiên.',
    intro: `Mỗi quy tắc với bạn là một lời mời tranh luận, mỗi giả định là một thứ đáng lật lại. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — chạm vào cái trí tò mò mà chính bạn cũng hiếm khi để ý.`,
    body: [
      `Bạn xử lý thế giới bằng cách nối những thứ tưởng chừng chẳng liên quan: một mẩu chuyện, một ý nói nửa chừng, trong đầu bạn ráp lại thành một khả năng mới. Bạn thấy cánh cửa ở những bức tường người khác đã quay lưng — đó là điều khiến ở gần bạn không bao giờ chán.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn nghĩ rõ nhất khi được nói ra thành tiếng và bật ý tưởng với người khác — sự trao đổi sống động là cách năng lượng bạn được nạp lại.`,
      `Bạn mang vào quan hệ sự sống động và kéo người khác vào thế giới ý tưởng của mình — với bạn, được nghĩ chung là một dạng thân mật. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó điều bạn thật sự cần bên dưới những màn tranh luận sôi nổi.`,
      `Bạn có xu hướng nhanh trí và ứng biến giỏi khi mọi thứ rối — bạn tìm ra lối thoát ngay tại chỗ. Bạn cũng có xu hướng yêu phần khởi đầu hơn phần kết thúc, dễ bỏ lại một việc dở dang khi đã bị một ý tưởng mới cuốn đi.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm màu cho cách bạn xoay chuyển giữa các khả năng.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — chạm vào trí tò mò của bạn theo một hướng bạn ít khi để ý.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn cần gì bên dưới lớp năng lượng luôn hướng ra ngoài.`,
    closing: CLOSING,
  },

  // ══════════════ NHÓM 2 — NF ══════════════

  INFJ: {
    title: 'Bạn cảm được điều chưa ai nói ra trong một căn phòng.',
    intro: `Bạn đọc được bầu không khí trước khi ai kịp mở lời — biết ai đang ổn, ai đang gồng. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đồng điệu với cái khao khát ý nghĩa luôn chạy ngầm trong bạn.`,
    body: [
      `Bạn hiểu con người qua một dạng trực giác khó giải thích: ghép những tín hiệu nhỏ — một ánh mắt, một quãng lặng, một câu lệch tông — thành bức tranh về điều người ta thật sự đang trải qua. Bạn nghĩ bằng ý nghĩa, không chỉ bằng dữ kiện.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn cần khoảng lặng để gạn lại những cảm xúc đã hấp thụ trong ngày — nếu không, thế giới của người khác dễ tràn vào và lấp đầy chỗ của chính bạn.`,
      `Bạn gắn bó chọn lọc và sâu — khi đã tin ai, bạn tin trọn vẹn, và người ta mở lòng với bạn những điều họ không kể với ai. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó cách bạn tự bảo vệ mình khi cảm xúc trở nên quá nặng.`,
      `Bạn có xu hướng thấu hiểu sâu nhưng vẫn đứng vững trên điều mình tin — một sự kết hợp hiếm. Bạn cũng có xu hướng cho đi đến cạn rồi âm thầm mong được đáp lại, mà ít khi nói ra điều mình cần.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm dày thêm chiều sâu mà người khác cảm được ở bạn trước cả khi quen.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đồng điệu với cái khao khát ý nghĩa luôn có trong bạn.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn dựa vào đâu khi cảm xúc trở nên quá nặng.`,
    closing: CLOSING,
  },

  INFP: {
    title: 'Bạn đo mọi thứ bằng việc nó có thật với mình hay không.',
    intro: `Bên ngoài bạn có thể trầm lặng, nhưng bên trong là cả một dòng cảm xúc và niềm tin chảy không ngừng. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — chạm đúng vào điều bạn vẫn lặng lẽ đi tìm.`,
    body: [
      `Bạn xử lý thế giới qua giá trị nội tâm: trước một lựa chọn, câu hỏi đầu tiên không phải "cái nào hiệu quả" mà "cái nào đúng với mình". Bạn nhìn ra điều tốt đẹp còn ẩn trong người và việc mà người khác đã sớm bỏ qua.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn cần không gian riêng để cảm xúc lắng lại thành điều rõ ràng — đám đông quá lâu thường rút cạn bạn theo cách khó nói thành lời.`,
      `Bạn yêu sâu và chân thành — khi đã quan tâm ai, bạn quan tâm bằng cả tấm lòng. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó cách bạn giữ mình trong một thế giới hay đòi bạn phải gồng.`,
      `Bạn có xu hướng sống đúng với điều mình tin kể cả khi nó bất tiện — sự chân thật đó người ta cảm được. Bạn cũng có xu hướng tránh xung đột đến mức nuốt cảm xúc vào trong, chịu đựng nhiều hơn mình nên chịu.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — hòa vào cái cách bạn cảm nhận trước khi lý luận.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — chạm vào điều bạn vẫn đi tìm mà ít khi gọi tên.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn giữ mình ra sao khi thế giới đòi bạn phải gồng.`,
    closing: CLOSING,
  },

  ENFJ: {
    title: 'Bạn gọi dậy điều tốt nhất trong người khác mà không cần cố.',
    intro: `Bạn nhìn ra điều người khác có thể trở thành, rồi khiến họ tin vào điều đó. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — hòa vào mong muốn tạo ảnh hưởng tốt lên người khác vốn có trong bạn.`,
    body: [
      `Bạn đọc con người gần như theo phản xạ: cảm được nhu cầu và cảm xúc của cả một nhóm, rồi điều phối để mọi người cùng tiến mà không ai bị bỏ lại. Bạn thấy bức tranh chung về nơi một tập thể có thể đi tới và biết phải chạm vào ai để cả nhóm chuyển động.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn sống động nhất khi ở giữa người khác và nâng đỡ họ — nhưng cũng vì thế bạn dễ quên hỏi chính mình đang cần gì.`,
      `Bạn cho đi nhiều và đầu tư hết mình — nhớ điều người kia cần, có mặt những lúc khó. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó chỗ bạn tựa vào khi đã cho đi đến mức không còn gì cho mình.`,
      `Bạn có xu hướng khiến người khác muốn trở nên tốt hơn bằng niềm tin chân thành bạn đặt vào họ. Bạn cũng có xu hướng đặt nhu cầu người khác trước mình đến mức cạn kiệt mà không nhận ra.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm nên cái sức hút mà người quanh bạn cảm thấy nhưng khó gọi tên.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — hòa vào mong muốn tạo ảnh hưởng tốt lên người khác.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn dựa vào đâu khi đã cho đi đến cạn.`,
    closing: CLOSING,
  },

  ENFP: {
    title: 'Bạn mang theo năng lượng và khả năng tới bất cứ đâu mình đến.',
    intro: `Bạn nhìn người khác và thấy ngay điều họ có thể trở thành; bạn nhìn một tình huống và thấy mười hướng đi. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đồng điệu với cách bạn đi theo nơi nào còn sống động và còn ý nghĩa.`,
    body: [
      `Bạn nghĩ bằng kết nối và khả năng: ý tưởng đến với bạn theo chùm, và bạn giỏi nhìn ra sợi dây giữa những thứ rời rạc. Bạn nhìn một con người không phải như họ đang là, mà như họ có thể trở thành — và sự nhiệt thành đó của bạn có thật.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn được nạp lại qua tương tác và trải nghiệm mới — thế giới bên ngoài là nơi bạn tìm thấy cảm hứng để mang về.`,
      `Bạn mang vào quan hệ sự nồng nhiệt và gắn bó nhanh, sâu. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó điều bạn thật sự cần bên dưới lớp năng lượng luôn hướng ra ngoài.`,
      `Bạn có xu hướng khơi dậy điều tốt nhất ở người khác bằng sự ấm áp chân thành. Bạn cũng có xu hướng bắt đầu nhiều thứ mà khó kết thúc, vì cái mới luôn hấp dẫn hơn việc hoàn tất cái cũ.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — tạo nên cái nhịp riêng trong cách bạn cuốn người khác theo.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đồng điệu với cách bạn đi theo nơi nào còn sống động.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn cần gì bên dưới lớp năng lượng hướng ra ngoài.`,
    closing: CLOSING,
  },

  // ══════════════ NHÓM 3 — SJ + SP ══════════════

  ISTJ: {
    title: 'Khi bạn đã nhận việc, người khác có thể yên tâm gác lại.',
    intro: `Bạn không hứa nhiều, nhưng điều bạn hứa thì bạn làm. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đặt cạnh tính trách nhiệm của bạn một chiều ít người đoán ra từ vẻ điềm tĩnh.`,
    body: [
      `Bạn xử lý thế giới bằng dữ kiện và kinh nghiệm đã kiểm chứng: tin vào cái đã chứng minh hơn lý thuyết nghe hay, để ý chi tiết người khác bỏ sót. Từ những mảnh rời rạc, bạn dựng nên một trật tự đáng tin — thứ giữ cho mọi thứ quanh bạn không sụp.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn làm việc tốt nhất trong sự yên ổn và đều đặn — bạn không cần ồn ào để thấy mình có ích.`,
      `Bạn thể hiện tình cảm bằng sự có mặt đều đặn và đáng tin — xuất hiện đúng lúc, làm đúng điều đã nói, không phô trương. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó chỗ bạn tựa vào khi những thứ quen thuộc bỗng đổi thay.`,
      `Bạn có xu hướng kiên trì và làm tới nơi ngay cả khi không ai nhìn — lý do người ta giao bạn những việc không được phép sai. Bạn cũng có xu hướng bám vào cách làm quen thuộc đến mức đôi khi bỏ lỡ một cách tốt hơn.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm nền cho cái cảm giác an toàn mà người quanh bạn dựa vào.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đặt cạnh tính trách nhiệm của bạn một chiều ít người đoán ra.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn tựa vào đâu khi mọi thứ quen thuộc đổi thay.`,
    closing: CLOSING,
  },

  ISFJ: {
    title: 'Bạn âm thầm để ý ai cần gì, rồi lặng lẽ làm trước khi được nhờ.',
    intro: `Bạn nhớ những điều người khác quên — ai thích gì, ai đang lặng lẽ chịu đựng. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đồng điệu với mong muốn chở che và gìn giữ luôn có trong bạn.`,
    body: [
      `Bạn xử lý thế giới qua kinh nghiệm thật và sự tinh tế với nhu cầu của người xung quanh: nhớ những chi tiết nhỏ chạm tới cảm xúc — lời ai đó nói lúc buồn, ngày quan trọng với người khác — và thường thấy điều cần làm trước khi họ kịp lên tiếng.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn chăm sóc người khác trong âm thầm và cần khoảng lặng riêng để hồi lại sau khi đã cho đi nhiều.`,
      `Bạn yêu bằng hành động chăm sóc cụ thể, ngày qua ngày, đáng tin. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó nơi bạn tìm về khi đã cho đi đến cạn.`,
      `Bạn có xu hướng kiên nhẫn và bao dung, ở lại với người khác qua những giai đoạn khó mà nhiều người đã sớm rời đi. Bạn cũng có xu hướng hy sinh nhu cầu của mình đến mức kiệt sức mà vẫn không than.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — hòa vào cái cách bạn lặng lẽ giữ gìn những gì quan trọng.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đồng điệu với mong muốn chở che và gìn giữ.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn tìm về đâu khi đã cho đi đến cạn.`,
    closing: CLOSING,
  },

  ESTJ: {
    title: 'Bạn biến mớ rối thành kế hoạch rõ ràng và đảm bảo nó được làm tới cùng.',
    intro: `Bạn tin vào trật tự, trách nhiệm, và việc mỗi người làm đúng phần của mình. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đặt cạnh khả năng điều hành của bạn một chiều ít ai đoán ra.`,
    body: [
      `Bạn xử lý thế giới bằng hệ thống và kết quả cụ thể: thấy việc cần làm, bạn dựng quy trình và thực thi dứt khoát, dựa vào điều đã chứng minh hiệu quả. Bạn quyết nhanh khi đã đủ dữ kiện — không phải nóng vội, mà vì ghét cảnh mọi người chờ trong mơ hồ.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn rõ ràng và mạnh nhất khi đứng ra tổ chức người và việc — năng lượng của bạn lớn lên giữa lúc bắt tay vào hành động.`,
      `Bạn lo liệu chu toàn cho người thân — gánh trách nhiệm, giữ mọi thứ ổn định để họ không phải lo. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó cách bạn phản ứng khi mọi thứ vượt khỏi tầm kiểm soát của mình.`,
      `Bạn có xu hướng đưa mọi việc về đích và dám chịu trách nhiệm khi trục trặc — không đẩy phần khó cho người khác. Bạn cũng có xu hướng áp tiêu chuẩn của mình lên người khác mà chưa hỏi hoàn cảnh của họ.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm nền cho cái uy vững mà người quanh bạn dựa vào.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đặt cạnh khả năng điều hành của bạn một chiều ít ai đoán ra.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn phản ứng ra sao khi mọi thứ vượt khỏi kiểm soát.`,
    closing: CLOSING,
  },

  ESFJ: {
    title: 'Bạn giữ cho cả nhóm gắn kết và để ý xem có ai bị bỏ lại phía sau.',
    intro: `Bạn là người làm cho một tập thể có cảm giác như một gia đình. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đồng điệu với mong muốn tạo ra sự gắn kết luôn có trong bạn.`,
    body: [
      `Bạn xử lý thế giới qua con người và nhu cầu thật của họ: đọc được không khí một tập thể và biết cần làm gì để mọi người thấy thoải mái — một câu hỏi đúng lúc, một sự có mặt. Bạn nhớ chi tiết và dựa vào điều đã từng hiệu quả với người thật, việc thật.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn được nạp lại qua sự gần gũi và kết nối — nhưng cũng vì thế, sự im lặng hay xa cách của người khác dễ làm bạn chông chênh.`,
      `Bạn yêu rất cụ thể và chu đáo — lo cho người mình thương từng điều nhỏ. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó chỗ bạn dựa vào khi không còn được ai trấn an.`,
      `Bạn có xu hướng khiến người khác thấy được quan tâm thật sự và là chất keo giữ mọi người lại gần nhau. Bạn cũng có xu hướng đặt sự hài hòa lên trên cả nhu cầu của mình, ngại làm phật lòng đến mức nuốt cảm giác thật vào trong.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — hòa vào cái cách bạn giữ mọi người lại gần nhau.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đồng điệu với mong muốn tạo ra sự gắn kết.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn dựa vào đâu khi không còn được ai trấn an.`,
    closing: CLOSING,
  },

  ISTP: {
    title: 'Bạn ít nói, nhưng tay làm được gần như mọi thứ.',
    intro: `Bạn hiểu cách mọi thứ vận hành bằng một thứ bản năng khó dạy. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đặt cạnh sự tự lập của bạn một chiều ít người nhìn ra từ vẻ kiệm lời.`,
    body: [
      `Bạn xử lý thế giới bằng cách tháo rời và xem mọi thứ hoạt động ra sao: bạn giỏi nhất khi có một vấn đề thật trước mặt để giải. Bạn giữ cái đầu lạnh giữa khủng hoảng, xử lý điều đang xảy ra ngay lúc này thay vì lo những gì có thể.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn cần khoảng riêng và sự tự do không bị quản — đó là nơi bạn thấy mình là chính mình nhất.`,
      `Bạn thể hiện tình cảm bằng việc giúp đỡ thiết thực và sự có mặt thoải mái — ít lời hoa mỹ nhưng sẽ xuất hiện khi người ta thật sự cần. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó nơi bạn lui về khi cảm xúc trở nên quá rắc rối.`,
      `Bạn có xu hướng thực tế, độc lập và xoay xở giỏi — khi mọi người hoảng, bạn bắt tay vào sửa. Bạn cũng có xu hướng rút lui khi cảm xúc trở nên phức tạp, vì một người đang buồn không có "phần để sửa" rõ ràng.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm nền cho cái cách bạn xử lý mọi việc mà không cần ồn ào.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đặt cạnh sự tự lập của bạn một chiều ít người nhìn ra.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn lui về đâu khi cảm xúc trở nên quá rắc rối.`,
    closing: CLOSING,
  },

  ISFP: {
    title: 'Bạn cảm nhận thế giới qua vẻ đẹp, cảm giác và sự chân thật.',
    intro: `Bạn sống theo điều mình cảm thấy đúng trong khoảnh khắc, hơn là theo một kế hoạch định sẵn. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đồng điệu với mong muốn được sống thật với mình luôn có trong bạn.`,
    body: [
      `Bạn xử lý thế giới qua trải nghiệm trực tiếp và giá trị bên trong: nhạy với chi tiết, với không khí, với những gì đẹp và thật mà người khác lướt qua. Bạn không cần phân tích để biết điều gì hợp với mình — bạn cảm được nó.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng nội, bạn cần khoảng riêng để trở về với cảm giác thật của mình — bên ngoài bạn dịu dàng, nhưng chạm tới điều bạn coi trọng, bạn cứng hơn người ta tưởng.`,
      `Bạn yêu lặng lẽ mà sâu — thể hiện bằng những cử chỉ nhỏ tinh tế hơn là lời tuyên bố. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó cách bạn giữ mình khi thế giới đòi bạn phải lên tiếng.`,
      `Bạn có xu hướng chân thật và không giả tạo — người ta thấy thoải mái khi ở cạnh vì bạn không gồng, không diễn. Bạn cũng có xu hướng tránh xung đột bằng cách im lặng rút lui, giữ trong lòng thay vì nói ra.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — hòa vào cái cách bạn cảm nhận thế giới trước khi lý giải nó.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đồng điệu với mong muốn được sống thật với mình.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn giữ mình ra sao khi thế giới đòi bạn lên tiếng.`,
    closing: CLOSING,
  },

  ESTP: {
    title: 'Bạn hành động trong khi người khác còn đang họp bàn.',
    intro: `Bạn học bằng cách lao vào làm, không phải bằng cách đọc về nó. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đặt cạnh bản năng hành động của bạn một chiều ít ai đoán ra.`,
    body: [
      `Bạn nghĩ nhanh và nhạy với thực tế đang diễn ra: đọc tình huống ngay lập tức, thấy cơ hội ở nơi người khác thấy bế tắc, xoay chuyển linh hoạt khi tình thế đổi. Bạn giải quyết vấn đề bằng hành động cụ thể, và thường đúng vì bản năng của bạn được mài qua kinh nghiệm thật.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, bạn sống động nhất khi có việc thật trước mặt và người thật xung quanh — năng lượng của bạn đến từ hành động, không phải từ ngồi yên.`,
      `Bạn thể hiện tình cảm bằng sự sống động và những trải nghiệm cùng nhau — khiến người bên cạnh thấy cuộc sống vui và thật hơn. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó điều bạn cần bên dưới lớp năng lượng luôn hướng về phía trước.`,
      `Bạn có xu hướng quyết đoán dưới áp lực — bình tĩnh, dứt khoát, không tê liệt vì sợ sai. Bạn cũng có xu hướng hành động trước khi cân nhắc hệ quả dài hạn, dễ bỏ qua những thứ chỉ lộ ra sau này.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — làm màu cho cái cách bạn lao vào hành động.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đặt cạnh bản năng hành động của bạn một chiều ít ai đoán ra.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn cần gì bên dưới lớp năng lượng hướng về phía trước.`,
    closing: CLOSING,
  },

  ESFP: {
    title: 'Bạn mang niềm vui và sự ấm áp vào bất cứ đâu mình đến.',
    intro: `Bạn sống trọn trong hiện tại, nắm bắt niềm vui ở nơi người khác lo lắng về ngày mai. Con đường đời {{LIFE_PATH}} thêm vào đó chiều {{LIFE_PATH_THEME}} — đồng điệu với cách bạn sống trọn khoảnh khắc và mang nó tới người khác.`,
    body: [
      `Bạn xử lý thế giới qua trải nghiệm trực tiếp và cảm nhận về con người: nắm bắt không khí, đọc cảm xúc người khác nhanh, và biết cách làm họ thoải mái. Bạn học và quyết bằng cách bắt tay vào thực tế, với một sự nhạy bén với khoảnh khắc mà ít ai theo kịp.`,
      `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}}. Là người hướng ngoại, sự hiện diện của người khác làm bạn sáng lên — bạn được nạp lại qua kết nối và niềm vui chung.`,
      `Bạn yêu nồng nhiệt và hết mình — hào phóng với sự quan tâm, thời gian và niềm vui bạn mang lại. Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — thêm vào đó điều bạn thật sự cảm bên dưới lớp vui tươi bạn cho người khác thấy.`,
      `Bạn có xu hướng mang năng lượng tích cực cho người khác và kéo họ ra khỏi cái đầu nặng nề để cùng tận hưởng điều đang ở đây. Bạn cũng có xu hướng tránh những điều khó chịu bằng cách hướng về niềm vui trước mắt, trong khi có những điều cần được nhìn thẳng.`,
    ],
    nguHanhHook: `Hành {{NGU_HANH_LABEL}} cho bạn {{NGU_HANH_CORE}} — tạo nên cái nhịp riêng trong cách bạn lan tỏa năng lượng.`,
    soHocHook: `Con đường đời {{LIFE_PATH}} mang theo {{LIFE_PATH_THEME}} — đồng điệu với cách bạn sống trọn trong hiện tại.`,
    nhatChuHook: `Nhật chủ {{NHAT_CHU_LABEL}}, {{NHAT_CHU_IMAGE}} — hình ảnh đó cho biết bạn thật sự cảm gì bên dưới lớp vui tươi.`,
    closing: CLOSING,
  },
}
