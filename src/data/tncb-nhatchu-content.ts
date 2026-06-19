/**
 * TNCB NHẬT CHỦ — 10 THIÊN CAN CONTENT
 * Distilled từ raw data để hiển thị trong ElementCard Layer 2
 * Cập nhật: 23/05/2026 10:00
 *
 * Tone: ngôi thứ 2, hình ảnh thiên nhiên Đông phương + ngôn ngữ hiện đại
 * Context: hiển thị sau Ngũ Hành như "chiều sâu hơn"
 */

export interface NhatChuContent {
  can: string
  element: string
  polarity: "Dương" | "Âm"
  naturalImage: string
  nickname: string
  tagline: string
  overview: string
  sections: Array<{
    heading: string
    content: string
  }>
  coreContradiction: string
  inOneSentence: string
}

export const NHAT_CHU_CONTENT: Record<string, NhatChuContent> = {

  Giáp: {
    can: "Giáp",
    element: "Mộc",
    polarity: "Dương",
    naturalImage: "Cây đại thụ đứng thẳng vươn tận trời — gốc rễ sâu, thân vững, không uốn cong",
    nickname: "Cây Đại Thụ",
    tagline: "Cùng mệnh Mộc — nhưng bạn là loại Mộc không biết cách uốn cong, dù gió có mạnh đến đâu.",
    overview: `Bạn là cây đại thụ — thẳng, cao và kiên định theo nghĩa đen. Khi người khác đang tìm cách vòng quanh vấn đề, bạn đã đi thẳng vào. Không phải vì bạn không thấy lối đi khác — mà vì với bạn, đường thẳng là đường duy nhất xứng đáng đi. Đây là sức mạnh thật, không phải cố chấp. Nhưng cây thẳng quá đôi khi gãy trước cây biết uốn — và bạn biết điều này, dù ít khi thừa nhận.`,
    sections: [
      {
        heading: "Thẳng như cây đứng",
        content: `Bạn không giỏi giả vờ, không giỏi nói nước đôi, và không thấy lý do gì để làm vậy. Nguyên tắc với bạn không phải quy tắc áp đặt — đó là cấu trúc bạn tin vào. Khi bạn thấy điều gì đúng, bạn đi thẳng vào, dù con đường đó không phổ biến. Điều này làm bạn đáng tin — và đôi khi làm bạn cô đơn.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn không phù hợp với vai trò hỗ trợ im lặng — bạn cần được đứng đầu hoặc ít nhất là được tự quyết trong phần việc của mình. Tư duy dài hạn là điểm mạnh thật: bạn thấy được 5 năm sau khi người khác còn đang lo tuần tới. Điểm cần chú ý: bạn đôi khi bị lợi dụng vì quá thẳng thắn và tin vào thiện chí của người khác.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn yêu bằng sự bảo vệ — không phải bằng lời. Người bạn chọn được bảo vệ kiên quyết, được đồng hành bền bỉ, được biết rằng bạn sẽ không bỏ đi khi khó. Điều bạn cần học: đôi khi người thân không cần được bảo vệ — họ chỉ cần được nghe. Và "nghe" đòi hỏi bạn bỏ kiếm xuống trước.`,
      },
    ],
    coreContradiction: `Bạn là người thẳng thắn nhất — nhưng chính sự thẳng thắn đó làm bạn thường xuyên bị hiểu lầm. Bạn muốn kết nối thật nhưng không biết cách uốn lượn để đến gần. Bạn muốn được ấm áp nhưng lại đứng thẳng như cây một mình giữa rừng.`,
    inOneSentence: `Bạn là người mà người khác tìm đến khi cần ai đó không bao giờ bỏ cuộc — và thường quên hỏi liệu bạn có mệt không.`,
  },

  Ất: {
    can: "Ất",
    element: "Mộc",
    polarity: "Âm",
    naturalImage: "Cây dây leo, hoa cỏ mềm mại — uốn quanh chướng ngại, không đối đầu trực tiếp",
    nickname: "Dây Leo Kiên Trì",
    tagline: "Cùng mệnh Mộc — nhưng bạn không đâm thẳng vào tường, bạn tìm cách leo qua.",
    overview: `Bạn là dây leo — mềm mại bên ngoài, kiên trì bên trong. Trong khi Giáp Mộc đâm thẳng, bạn tìm đường vòng. Không phải vì bạn yếu hơn — mà vì bạn biết rằng đường vòng đôi khi đến đích nhanh hơn, và ít gãy hơn. Không ai nhận ra cây leo đã lên tới đỉnh tường cho đến khi nó đã ở đó từ lâu. Đây là sức mạnh thầm lặng của bạn.`,
    sections: [
      {
        heading: "Mềm mà không yếu",
        content: `Bạn đọc phòng nhanh, cảm nhận người khác tốt, và tìm được con đường trong hầu hết mọi hoàn cảnh mà không cần đối đầu. Đây không phải thủ đoạn — đây là trí tuệ. Nhưng sự linh hoạt đó đôi khi là cơ chế trốn tránh: bạn uốn quanh xung đột thay vì đối mặt, và đôi khi điều cần thiết là đứng thẳng dù không thoải mái.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn xây mạng lưới, không xây lũy thành. Kết nối tự nhiên, được lòng người, và tiến dần từng bước nhỏ đến khi đạt mục tiêu mà không ai kịp nhận ra. Điểm cần chú ý: bạn cần có cột để leo — tức là cần môi trường và người có định hướng rõ ràng. Khi không có, bạn dễ mất phương hướng.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn dịu dàng, nhạy cảm và giỏi làm người khác cảm thấy được hiểu. Nhưng có một câu hỏi bạn cần tự hỏi thường xuyên hơn: bạn đang yêu người kia, hay đang leo theo hướng người kia muốn bạn leo? Ranh giới giữa uyển chuyển và mất bản sắc ở bạn rất mỏng.`,
      },
    ],
    coreContradiction: `Bạn giỏi thích nghi đến mức đôi khi không phân biệt được đâu là giá trị thật của mình và đâu là giá trị đã "leo theo" từ người khác. Câu hỏi khó nhất với bạn: nếu không có ai để làm hài lòng, bạn thực sự muốn gì?`,
    inOneSentence: `Bạn có thể vươn tới bất cứ đâu — nhưng đôi khi bạn cần dừng lại và hỏi: đây có phải chỗ bạn thật sự muốn đến không?`,
  },

  Bính: {
    can: "Bính",
    element: "Hỏa",
    polarity: "Dương",
    naturalImage: "Mặt trời — chiếu sáng vô tư, sưởi ấm vạn vật mà không phân biệt",
    nickname: "Mặt Trời Giữa Ngày",
    tagline: "Cùng mệnh Hỏa — nhưng bạn là loại Hỏa chiếu sáng cả thế giới, không chỉ một góc phòng.",
    overview: `Bạn là mặt trời — không cần được yêu cầu, tự nhiên tỏa ra. Bạn bước vào và không khí thay đổi, không phải vì bạn cố, mà vì nhiệt huyết của bạn là thật và người ta cảm nhận được. Hào phóng theo nghĩa đen: cho đi mà không tính toán, như mặt trời không hỏi ai xứng đáng được ấm. Nhưng mặt trời cũng có một điều không tự biết: ngay cả ngày흐, nó vẫn là lý do duy nhất chúng ta có thể nhìn thấy gì.`,
    sections: [
      {
        heading: "Ánh sáng không cần lý do",
        content: `Bạn truyền cảm hứng mà không cần cố gắng — đây không phải kỹ năng học được, đây là bản chất. Người ta muốn theo bạn không phải vì bạn có kế hoạch hoàn hảo, mà vì bạn làm họ tin rằng mình có thể. Điểm cần chú ý: bạn cần sứ mệnh lớn để phát huy — không gian nhỏ hoặc vai trò hỗ trợ làm bạn tắt dần.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn xuất sắc ở bất kỳ vai trò nào có tầm nhìn và khán giả. Không phải vì cần chú ý — mà vì ánh sáng cần không gian để lan ra. Hành trình của bạn là học cách chiếu sáng mà không cần xác nhận liên tục rằng mình đang chiếu sáng. Câu hỏi quan trọng: tôi đang làm điều này vì sứ mệnh, hay vì cần được nhìn thấy?`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn yêu nhiệt tình, hào phóng và làm người thân cảm thấy được sưởi ấm. Nguy cơ: ánh sáng của bạn mạnh đến mức đôi khi vô tình dập tắt ánh sáng của người bên cạnh. Người phù hợp với bạn không cần bạn chiếu vào họ — họ cần được cùng bạn nhìn về một hướng.`,
      },
    ],
    coreContradiction: `Bạn tỏa sáng nhất trong 10 Can — nhưng lại rất nhạy cảm với việc bị bỏ qua hay không được công nhận. Người tự tin nhất lại thường xuyên lo sợ ánh sáng của mình không đủ mạnh. Đây là mâu thuẫn mà ngay cả bạn cũng hiếm khi nói ra.`,
    inOneSentence: `Bạn là người mà mọi người nhớ đến khi cần được kéo ra khỏi vùng tối — nhưng ít ai hỏi liệu bạn có đang tự soi sáng cho mình không.`,
  },

  Đinh: {
    can: "Đinh",
    element: "Hỏa",
    polarity: "Âm",
    naturalImage: "Ngọn nến, lửa bếp, ánh đèn — ấm áp và tập trung, chiếu sáng có chủ ý",
    nickname: "Ngọn Nến Không Tắt",
    tagline: "Cùng mệnh Hỏa — nhưng bạn không chiếu sáng cả thế giới, bạn chiếu sáng đúng người cần ánh sáng.",
    overview: `Bạn là ngọn nến — không rực rỡ như mặt trời, nhưng ấm áp và có chủ đích. Bính chiếu cho tất cả, bạn chiếu cho người ở gần. Sự khác biệt đó không nhỏ: ánh nến thân mật hơn ánh mặt trời, và đôi khi người ta cần đúng điều đó. Bạn nhìn thấy chiều sâu trong người khác mà người khác chưa nhìn thấy ở mình — và đây là tài năng hiếm.`,
    sections: [
      {
        heading: "Ánh sáng chiều sâu",
        content: `Bạn tinh tế, chú ý đến chi tiết, và nhìn thấy điều ẩn khuất mà người khác bỏ qua. Trực giác của bạn không phải linh cảm mơ hồ — đó là kết quả của việc quan sát kỹ và suy nghĩ sâu. Nhưng ngọn nến mỏng manh: bạn dễ bị "thổi tắt" bởi sự phê bình thô thiển hoặc môi trường quá khắc nghiệt.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn làm tốt nhất khi được làm việc trong không gian có chiều sâu và không bị gián đoạn. Giảng dạy, tư vấn, viết lách, nghiên cứu — bất cứ thứ gì cho phép bạn đi vào bên trong của một vấn đề thay vì phải trình bày bề mặt liên tục. Cầu toàn đôi khi làm bạn trì hoãn — không phải vì lười, mà vì sợ ra đời khi chưa đủ tốt.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn nhớ những chi tiết nhỏ về người mình quan tâm — ngày đặc biệt, sở thích nhỏ, những điều họ chỉ nói một lần. Đây là hình thức yêu thương sâu nhất của bạn. Điều bạn cần: đối tác đủ kiên nhẫn để không làm tắt ngọn nến bằng sự ồn ào — và đủ tinh tế để nhận ra rằng bạn đang cháy sáng ngay cả khi không nói gì.`,
      },
    ],
    coreContradiction: `Bạn muốn chạm đến người khác ở chiều sâu nhất — nhưng lại cần được bảo vệ khỏi thế giới ồn ào mới có thể cháy sáng. Sự mâu thuẫn giữa khao khát kết nối sâu sắc và nhu cầu bảo vệ ngọn lửa nội tâm là điều bạn sống với mỗi ngày.`,
    inOneSentence: `Bạn là người mà khi ở gần, người ta cảm thấy được nhìn thấy thật sự — và thường không biết tại sao.`,
  },

  Mậu: {
    can: "Mậu",
    element: "Thổ",
    polarity: "Dương",
    naturalImage: "Núi cao, thành lũy — vững chắc, bất động, là ranh giới và nơi tựa nương",
    nickname: "Ngọn Núi Im Lặng",
    tagline: "Cùng mệnh Thổ — nhưng bạn là loại Thổ không ai lay chuyển được, dù họ có muốn.",
    overview: `Bạn là núi — không phải vì kiêu ngạo, mà vì đó là bản chất. Bạn đứng yên trong khi mọi thứ xung quanh biến động, và người ta tìm đến bạn chính vì điều đó. Sức mạnh của bạn không ồn ào — nó nằm ở sự hiện diện: bạn ở đó, vững, và điều đó đủ rồi. Nhưng núi cũng có giá của nó: khó tiếp cận, khó biết bên trong chứa gì.`,
    sections: [
      {
        heading: "Vững như núi đứng",
        content: `Bạn chứa đựng những gì người khác không thể — áp lực, mâu thuẫn, bí mật, trách nhiệm. Không phải vì bạn không cảm thấy, mà vì bạn có sức chứa mà người khác không có. Điểm cần chú ý: bạn không linh hoạt theo nghĩa thực — bạn không thay đổi đơn giản vì không thấy lý do cần thay đổi. Điều này đôi khi là sức mạnh, đôi khi là bức tường.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn làm tốt nhất ở những vai trò cần sự ổn định dài hạn và tin cậy tuyệt đối. Bạn không tỏa sáng nhanh, nhưng bạn không sụp đổ. Trong khủng hoảng, bạn là người mọi người tìm đến. Điểm cần chú ý: bạn cần lực từ bên ngoài để phát triển — không có áp lực thích hợp, bạn dễ đứng yên quá lâu.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn trung thành, ổn định và là chỗ dựa vững chắc nhất người thân có thể tìm được. Nhưng cảm xúc của bạn bị chôn sâu như khoáng sản trong núi — có đó, nhưng không ai thấy nếu không đào vào. Học cách để người thân "leo vào" là quá trình dài của bạn — và nó bắt đầu từ việc nói ra, dù chỉ một chút.`,
      },
    ],
    coreContradiction: `Bạn là núi — vững nhất, bền nhất, ôm chứa nhiều nhất. Nhưng cũng là thứ khó tiếp cận nhất. Bạn muốn được biết đến và tin tưởng — nhưng lại khó để người khác thực sự hiểu những gì ẩn bên trong. Núi ôm chứa nhiều nhất nhưng cũng cô đơn nhất.`,
    inOneSentence: `Bạn là người mà mọi người dựa vào — nhưng ít ai hỏi liệu núi có cần gì không.`,
  },

  Kỷ: {
    can: "Kỷ",
    element: "Thổ",
    polarity: "Âm",
    naturalImage: "Đất ruộng phì nhiêu, đất vườn — mềm mại, nuôi dưỡng, chứa đựng hạt giống",
    nickname: "Đất Vườn Kiên Nhẫn",
    tagline: "Cùng mệnh Thổ — nhưng bạn không phải núi bất động, bạn là đất sẵn sàng nuôi bất cứ thứ gì được gieo xuống.",
    overview: `Bạn là đất ruộng — mềm mại, chịu đựng và sẵn sàng nuôi dưỡng. Không cứng như núi Mậu, không bất động — bạn nhận hạt giống, giữ ẩm, và chờ đợi. Sự kiên nhẫn của bạn không phải thụ động — đó là hiểu biết rằng thứ gì tốt cũng cần thời gian. Nhưng đất mềm cũng có giá của nó: dễ bị chà đạp, dễ bị cuốn trôi nếu không có ranh giới.`,
    sections: [
      {
        heading: "Nuôi dưỡng trong lặng lẽ",
        content: `Bạn tốt bụng theo nghĩa thật — không phô trương, không đòi ghi nhận, chỉ làm. Bạn cẩn thận trong lập kế hoạch, tỉ mỉ trong chi tiết, và không hành động bốc đồng. Điểm cần chú ý: sự cẩn thận của bạn đôi khi vượt qua ranh giới thành ngờ vực — và sự ngờ vực đó có thể làm bạn giữ lại những gì đáng lẽ phải cho đi.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn xuất sắc trong lập kế hoạch, nuôi dưỡng dự án và người — bất cứ thứ gì cần sự kiên nhẫn và chú tâm liên tục. Nhưng bạn đôi khi cân nhắc quá lâu đến mức để tuột mất cơ hội. Đất màu mỡ nhất vẫn cần được cày xới — bạn cần ai đó hoặc điều gì đó kéo bạn ra khỏi chỗ đứng quen thuộc.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn ân cần, chu đáo và kiên nhẫn với người mình quan tâm. Nhưng sự đa nghi tinh tế của bạn đôi khi tạo ra sự kiểm soát nhẹ nhàng mà đối tác không nhận ra ban đầu — và bạn cũng không nhận ra mình đang làm. Câu hỏi cần tự hỏi: bạn đang thận trọng vì yêu, hay vì sợ?`,
      },
    ],
    coreContradiction: `Bạn muốn giúp đỡ và hỗ trợ — nhưng sự thận trọng thái quá đôi khi làm bạn giữ lại chính những thứ đáng lẽ phải cho đi. Đất tốt không phải đất không bao giờ bị cào xới — mà là đất biết khi nào cần mở ra.`,
    inOneSentence: `Bạn là người mà mọi thứ nảy mầm được khi có bạn — nhưng bạn thường quên rằng đất cũng cần được nghỉ ngơi.`,
  },

  Canh: {
    can: "Canh",
    element: "Kim",
    polarity: "Dương",
    naturalImage: "Kiếm thép, rìu, đá quý thô — mạnh mẽ, chưa được mài giũa, chờ được tôi luyện",
    nickname: "Lưỡi Kiếm Chưa Mài",
    tagline: "Cùng mệnh Kim — nhưng bạn là loại Kim chưa được tôi luyện xong, và đó chính xác là lý do bạn còn nhiều dư địa phát triển nhất.",
    overview: `Bạn là kiếm thép — cứng rắn, sắc bén theo bản năng, và chưa được mài giũa hết. Không phải điểm yếu — đó là dư địa chưa được khai thác. Cổ nhân nói Canh Kim cần Đinh Hỏa để thành kiếm báu: bạn trở nên xuất sắc nhất không phải trong tiện nghi mà trong thử thách, không phải trong sự tán dương mà trong sự rèn giũa thật sự.`,
    sections: [
      {
        heading: "Sắc bén và trực tiếp",
        content: `Bạn cắt qua sự lộn xộn và tạo ra sự rõ ràng — không phải vì thích gây khó chịu mà vì bạn không chịu được sự mập mờ. Lời nói của bạn thẳng và đôi khi gây thương tổn không cố ý — không phải vì thiếu tình cảm mà vì bạn không quen dùng vỏ bọc. Đây là điểm mạnh và điểm yếu cùng lúc.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn làm tốt nhất trong áp lực và môi trường đòi hỏi quyết định nhanh, tiêu chuẩn cao. Không có lửa thì Canh chỉ là quặng thô — quá trình của bạn là tìm được những thử thách đúng mức để tôi luyện mình. Điểm cần chú ý: bạn biết rằng cần mềm hơn đôi khi, nhưng khó làm theo — không phải không hiểu mà không thấy cần.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn trung thành và bảo vệ mạnh — một khi đã chọn ai, bạn bảo vệ người đó đến cùng. Nhưng bạn cần đối tác đủ mạnh để không bị "cắt" bởi sự thẳng thắn của mình, và đủ trực tiếp để không chơi trò ẩn ý. Bạn không giỏi đọc tín hiệu ngầm — nói thẳng với bạn luôn tốt hơn.`,
      },
    ],
    coreContradiction: `Bạn là lưỡi kiếm sắc nhất — nhưng một lưỡi kiếm không thể tự mài chính nó. Bạn cần người khác để trở nên xuất sắc, nhưng lại không dễ dàng chấp nhận sự "mài giũa" đó. Học cách để được rèn là dấu hiệu của trưởng thành, không phải điểm yếu — đây là bài học lớn nhất của bạn.`,
    inOneSentence: `Bạn là người mà thử thách không làm gãy mà làm sắc hơn — nhưng chỉ khi bạn chịu vào lò lửa.`,
  },

  Tân: {
    can: "Tân",
    element: "Kim",
    polarity: "Âm",
    naturalImage: "Trang sức tinh xảo, ngọc quý đã mài giũa — đẹp, tinh tế và mỏng manh bên ngoài",
    nickname: "Ngọc Quý Đã Mài",
    tagline: "Cùng mệnh Kim — nhưng bạn không cần được tôi luyện thêm, bạn đã là trang sức rồi.",
    overview: `Bạn là trang sức tinh xảo — đã được gọt giũa, lấp lánh và có thẩm mỹ tự nhiên mà ít người có. Bên ngoài mỏng manh, nhưng bên trong kiên cường hơn người ta nghĩ. Bạn có tiêu chuẩn cao và gu tinh tế — không phải vì kiêu ngạo mà vì bạn thật sự nhận ra giá trị và sự khác biệt mà người khác bỏ qua. Nhưng trang sức tồn tại để được đeo, được nhìn — và đây là nơi mâu thuẫn của bạn bắt đầu.`,
    sections: [
      {
        heading: "Tinh tế và cầu toàn",
        content: `Bạn nhận ra giá trị thật của mọi thứ — con người, tác phẩm, khoảnh khắc. Đây là tài năng thật. Nhưng tiêu chuẩn cao của bạn đôi khi làm ít thứ đủ tốt, và ít người đủ tốt. Không phải vì bạn sai — mà vì bạn cần học cách phân biệt giữa tiêu chuẩn thật sự và tiêu chuẩn dùng để giữ khoảng cách an toàn.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn xuất sắc ở bất kỳ lĩnh vực nào đòi hỏi sự tinh tế, thẩm mỹ và chú ý đến chi tiết. Bạn không làm ẩu — bạn làm đúng, hoặc không làm. Điểm cần chú ý: cầu toàn đôi khi dẫn đến trì hoãn — bạn không ra đời sản phẩm không phải vì lười mà vì sợ không đạt tiêu chuẩn của chính mình.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn yêu tinh tế, lãng mạn và tạo ra những khoảnh khắc có ý nghĩa. Nhưng bạn cần được trân trọng theo cách bạn hiểu trân trọng — không phải bất kỳ cách nào cũng được. Người phù hợp với bạn biết cách nhìn thấy giá trị thật của bạn mà không cần bạn liên tục chứng minh nó.`,
      },
    ],
    coreContradiction: `Bạn có giá trị nội tại sâu sắc — nhưng lại phụ thuộc vào sự công nhận bên ngoài để cảm thấy mình có giá trị. Ngọc quý không cần ai biết đến mới là ngọc quý — đây là điều bạn biết trong đầu nhưng chưa thật sự tin ở tim.`,
    inOneSentence: `Bạn là người mà ai ở gần đủ lâu đều nhận ra mình đang ở cạnh thứ gì đó hiếm — nhưng bạn lại thường lo rằng không ai nhận ra.`,
  },

  Nhâm: {
    can: "Nhâm",
    element: "Thủy",
    polarity: "Dương",
    naturalImage: "Đại dương, sông lớn — mênh mông, sâu thẳm, không thể bị giới hạn",
    nickname: "Đại Dương Không Bờ",
    tagline: "Cùng mệnh Thủy — nhưng bạn là loại Thủy không ai đo được chiều sâu, và cũng không ai giới hạn được chiều rộng.",
    overview: `Bạn là đại dương — không phải vì hào nhoáng mà vì thật sự rộng lớn theo nghĩa nội tâm. Bạn kết nối mọi thứ — hệ thống, con người, ý tưởng — theo cách mà người khác không thấy được sợi dây liên kết cho đến khi bạn chỉ ra. Tầm nhìn của bạn xa và rộng. Nhưng đại dương không có bờ thì cũng không biết mình ở đâu.`,
    sections: [
      {
        heading: "Rộng lớn và kết nối",
        content: `Bạn thấy bức tranh lớn mà người khác không thấy, và kết nối những điểm mà người khác nghĩ không liên quan. Đây là trí tuệ chiến lược thật — không phải ảo tưởng. Nhưng bề rộng mà thiếu chiều sâu là nguy cơ lớn nhất của bạn: bạn có thể chảy quá nhiều hướng cùng một lúc đến mức không đi đến đâu thật sự sâu.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn làm tốt nhất ở những vai trò cần tầm nhìn hệ thống và khả năng kết nối điểm xa nhau. Khám phá, chiến lược, truyền thông — bất cứ thứ gì cho phép bạn di chuyển tự do trong ý tưởng. Điểm cần chú ý: cam kết dài hạn với một thứ duy nhất đòi hỏi bạn có "bờ" — và bờ không phải hạn chế, đó là hướng.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn thú vị, sâu sắc và không bao giờ nhàm. Nhưng đại dương không ở lại một chỗ đủ lâu để tạo chiều sâu — và đây là thứ bạn cần học trong các mối quan hệ. Người kết nối tốt nhất lại thường cảm thấy khó kết nối thực sự ở chiều sâu cá nhân.`,
      },
    ],
    coreContradiction: `Bạn là đại dương — kết nối tất cả nhưng không ở lại đủ lâu với bất cứ thứ gì. Câu hỏi cốt lõi: bạn đang di chuyển vì tò mò, hay vì sợ phải đứng yên với chính mình?`,
    inOneSentence: `Bạn là người mà mọi người cảm thấy có thể nói chuyện — nhưng ít ai biết mình đã chạm được đến phần thật của bạn chưa.`,
  },

  Quý: {
    can: "Quý",
    element: "Thủy",
    polarity: "Âm",
    naturalImage: "Mưa nhẹ, sương sớm, suối ngầm — thấm sâu, âm thầm nuôi dưỡng",
    nickname: "Suối Ngầm Vô Hình",
    tagline: "Cùng mệnh Thủy — nhưng bạn không phải đại dương rộng lớn, bạn là thứ thấm sâu nhất và vô hình nhất.",
    overview: `Bạn là mưa nhẹ, sương sớm, suối ngầm — thứ yếu nhất về bề ngoài nhưng thấm sâu nhất về bản chất. Cổ nhân nói Quý Thủy yếu nhất nhưng nếu gặp đúng điều kiện có thể "dịch chuyển Càn Khôn" — đây là hình ảnh chính xác về bạn. Bạn không ồn ào, không chiếm không gian, nhưng bạn nuôi dưỡng theo cách không ai thay thế được.`,
    sections: [
      {
        heading: "Chiều sâu trong lặng lẽ",
        content: `Bạn giữ kín nhiều — không phải bí ẩn cố tình mà vì thế giới nội tâm của bạn quá phong phú đến mức khó diễn đạt ra ngoài. Trực giác của bạn sắc, cảm xúc của bạn sâu, và những gì bạn thấy về người khác thường đúng hơn những gì họ thấy về bản thân. Nhưng nếu không tìm được kênh để phát tiết, bạn dễ bị nghẹt bởi chính chiều sâu của mình.`,
      },
      {
        heading: "Trong công việc & sứ mệnh",
        content: `Bạn làm tốt nhất khi được làm một mình với chiều sâu — nghiên cứu, viết lách nội tâm, tư vấn, nghệ thuật. Không phải môi trường ồn ào, không phải ánh đèn sân khấu. Bạn cần tìm ra kênh phù hợp để những gì bên trong được chảy ra có ý nghĩa — suối ngầm cần tìm đường ra biển.`,
      },
      {
        heading: "Trong tình cảm & kết nối",
        content: `Bạn yêu sâu và trung thành — nhưng người thân cần kiên nhẫn "đào" vào mới chạm đến chiều sâu thực sự của bạn. Bạn không biểu đạt ra ngoài đủ để người khác biết bạn đang cảm gì. Điều bạn cần học: chia sẻ chiều sâu của mình không phải đánh mất nó — đó là món quà cho người bạn chọn để tin tưởng.`,
      },
    ],
    coreContradiction: `Bạn mang trong mình những giấc mơ và chiều sâu lớn nhất — nhưng lại ít khả năng nhất để biểu hiện chúng ra thế giới. Chúa tể của chiều sâu, nhưng chiều sâu không có ích nếu không ai chạm đến được. Câu hỏi cốt lõi: bạn đang giữ kín vì khôn ngoan, hay vì sợ bị nhìn thấy thực sự?`,
    inOneSentence: `Bạn là người mà ai đủ kiên nhẫn để biết thật sự đều không muốn rời — nhưng ít ai biết cách bắt đầu.`,
  },

}
