/**
 * TNCB NGŨ HÀNH — ELEMENT CONTENT
 * Distilled từ raw data để hiển thị trong ElementCard
 * Cập nhật: 22/05/2026 18:00
 *
 * Tone: ngôi thứ 2, kết hợp Đông phương với ngôn ngữ hiện đại
 * Shape: ElementContent interface
 */

export interface ElementContent {
  element: "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"
  nickname: string
  tagline: string
  quote: {
    text: string
    author: string
  }
  overview: string
  sections: Array<{
    heading: string
    content: string
  }>
  coreContradiction: string
  inOneSentence: string
}

export const ELEMENT_CONTENT: Record<string, ElementContent> = {

  Kim: {
    element: "Kim",
    nickname: "Lưỡi Kiếm Biết Suy Nghĩ",
    tagline: "Bạn sắc bén không phải để tấn công — mà vì bạn không chịu được sự không rõ ràng.",
    quote: {
      text: "Vàng thật không sợ lửa.",
      author: "Tục ngữ Việt Nam",
    },
    overview: `Bạn không phụ thuộc vào cảm hứng để làm việc — bạn có kỷ luật, và kỷ luật đó bền hơn cảm hứng của bất kỳ ai. Khi người khác còn đang cân nhắc, bạn đã quyết định. Khi người khác đang than vãn, bạn đã tìm ra cách. Nhưng có một thứ bạn ít nói đến: lớp giáp bằng "nguyên tắc" và "tiêu chuẩn" đó — đôi khi không phải để bảo vệ lý tưởng, mà để bảo vệ một chỗ trong bạn không muốn bị nhìn thấy là dễ tổn thương.`,
    sections: [
      {
        heading: "Sắc bén và kiên định",
        content: `Bạn cắt thẳng vào vấn đề, không vòng vo, không xã giao thừa. Đây không phải thô lỗ — đây là cách bạn tôn trọng thời gian của mọi người, kể cả của mình. Như thanh kiếm được tôi luyện qua lửa, bạn trở nên rõ ràng và vững chắc hơn sau mỗi thử thách, không phải mềm đi.`,
      },
      {
        heading: "Trong công việc",
        content: `Bạn làm việc tốt nhất ở những nơi cần sự chính xác và trách nhiệm — nơi mà "gần đúng" không phải là chấp nhận được. Bạn giữ lời hứa, theo đuổi đến cùng, và ít khi hiểu tại sao người khác lại không làm được như vậy. Điểm cần chú ý: bạn đôi khi giữ tiêu chuẩn cao đến mức cả nhóm cảm thấy mệt theo — không phải vì bạn sai, mà vì không phải ai cũng có cùng mức chịu đựng.`,
      },
      {
        heading: "Trong quan hệ",
        content: `Bạn yêu bằng hành động cụ thể, không phải bằng lời. Bạn bảo vệ người thân kiên quyết, lo toan chu đáo — nhưng ít khi nói ra. Người hiểu bạn biết rằng sự hiện diện ổn định của bạn chính là hình thức yêu thương sâu nhất. Người không hiểu sẽ nghĩ bạn lạnh. Cả hai đều không sai hoàn toàn.`,
      },
    ],
    coreContradiction: `Bạn khao khát sự hoàn hảo và công bằng — nhưng chính tiêu chuẩn đó tạo ra khoảng cách với mọi người và với chính mình. Bạn muốn gần gũi nhưng lại dựng lên lớp giáp. Muốn được yêu thương nhưng thể hiện bằng sự phán xét thay vì sự ấm áp.`,
    inOneSentence: `Bạn là người mà mọi thứ hoạt động được khi có mặt bạn — nhưng ít ai biết điều đó tốn bao nhiêu từ phía bạn.`,
  },

  Mộc: {
    element: "Mộc",
    nickname: "Cây Xanh Không Biết Mệt",
    tagline: "Bạn luôn tìm thấy lý do để vươn lên — ngay cả khi đất dưới chân chưa đủ màu mỡ.",
    quote: {
      text: "Cây ngay không sợ chết đứng.",
      author: "Tục ngữ Việt Nam",
    },
    overview: `Bạn có khả năng phục hồi mà nhiều người phải ghen tị — vấp ngã xong, bạn đứng dậy tự nhiên như cây sau bão. Không phải vì bạn không đau, mà vì cơ thể bạn đã quen hướng về phía ánh sáng. Ý tưởng đến với bạn dễ dàng, tầm nhìn của bạn xa hơn phần lớn người xung quanh — nhưng có một điều bạn hay bỏ qua: rễ. Cây phát triển nhanh nhưng không có rễ sâu thì gió lớn một cái là ngã.`,
    sections: [
      {
        heading: "Sức sống và tầm nhìn",
        content: `Bạn nhìn thấy điểm mạnh ở những nơi người khác chỉ thấy hiện trạng. Đây là món quà thật — không phải ai cũng sống được trong tương lai đủ rõ để hành động ở hiện tại. Nhưng đôi khi sự lạc quan của bạn là cơ chế trốn tránh: "mọi thứ rồi sẽ ổn" đôi khi là câu thần chú che đậy nỗi sợ phải đối mặt với thứ gì đó đang không ổn ngay lúc này.`,
      },
      {
        heading: "Trong công việc",
        content: `Bạn xuất sắc ở giai đoạn đầu — ý tưởng, khởi động, truyền cảm hứng. Năng lượng bạn mang vào một dự án mới là thứ người khác không dễ có. Thách thức là giai đoạn giữa — khi kích thích ban đầu qua đi và còn lại là công việc lặp đi lặp lại. Rễ sâu hay không phụ thuộc vào việc bạn có ở lại được trong những giai đoạn không hào hứng đó không.`,
      },
      {
        heading: "Trong quan hệ",
        content: `Bạn nuôi dưỡng người xung quanh tự nhiên — nhưng bạn cần được "tưới" lại. Bạn cần sự công nhận, không gian phát triển, và cảm giác mối quan hệ đang tiến về phía trước. Khi cảm thấy bị kìm hãm hoặc trì trệ, bạn bắt đầu rút dần mà đôi khi không nói ra — và người kia không hiểu tại sao.`,
      },
    ],
    coreContradiction: `Bạn nuôi dưỡng người khác như cây cho bóng mát, cho quả, cho oxy — nhưng bạn hay quên rằng cây cũng cần được tưới. Sự lạc quan là sức mạnh, nhưng cũng là cách bạn tránh dừng lại để nhìn vào những vết thương chưa lành.`,
    inOneSentence: `Bạn là người mà có mặt thì cả nhóm thấy có thể, vắng mặt thì mọi người mới nhận ra bầu không khí đã thay đổi từ lúc nào.`,
  },

  Thủy: {
    element: "Thủy",
    nickname: "Dòng Chảy Không Tên",
    tagline: "Bạn thích nghi với mọi hình dạng — và đôi khi điều đó khiến bạn quên mình thật ra có hình dạng gì.",
    quote: {
      text: "Thượng thiện nhược thủy — Điều thiện tối thượng giống như nước: lợi vạn vật mà không tranh.",
      author: "Lão Tử, Đạo Đức Kinh",
    },
    overview: `Bạn có chiều sâu mà người khác mất nhiều năm mới bắt đầu nhìn thấy. Bề mặt bạn có thể phẳng lặng — nhưng bên dưới là cả một thế giới đang chuyển động. Bạn đọc phòng nhanh, cảm nhận người khác sâu, và thích nghi với hầu hết mọi hoàn cảnh mà không mất quá nhiều năng lượng. Điều ít ai biết là: chính vì bạn quá giỏi hòa vào mọi thứ, đôi khi bạn và người xung quanh đều không biết bạn thật sự muốn gì.`,
    sections: [
      {
        heading: "Chiều sâu và uyển chuyển",
        content: `Bạn không đối đầu trực tiếp — bạn tìm đường vòng, lách quanh, tích tụ sức mạnh theo thời gian. Đây là trí tuệ, không phải yếu đuối. Nhưng khi bạn dùng sự uyển chuyển này để tránh những xung đột cần thiết, nó chuyển thành cái bẫy. Nước đứng yên quá lâu sẽ trở thành nước tù.`,
      },
      {
        heading: "Trong công việc",
        content: `Bạn kết nối được với nhiều loại người khác nhau — đây là tài sản thật trong bất kỳ môi trường nào. Bạn lắng nghe tốt, nhạy bén với ngầm hiểu, và hiếm khi bỏ lỡ những tín hiệu mà người khác không nhận ra. Điểm cần chú ý: bạn đôi khi thấy quá nhiều góc độ đến mức khó quyết định dứt khoát — và sự do dự đó có giá của nó.`,
      },
      {
        heading: "Trong quan hệ",
        content: `Bạn yêu sâu và trung thành khi đã xác định. Sức hút tự nhiên của bạn thu hút người khác mà bạn không cần cố. Nhưng vì bạn liên tục điều chỉnh để phù hợp với đối tác, đôi khi người thân cảm thấy gần gũi với bạn mà vẫn không chắc họ đang yêu ai — bạn thật hay bạn đang phản chiếu họ.`,
      },
    ],
    coreContradiction: `Bạn có chiều sâu nội tâm vô hạn nhưng lại rất khó để người khác chạm đến chiều sâu đó — vì bạn liên tục thay đổi hình dạng để phù hợp với môi trường, đến mức người khác và đôi khi chính bạn không biết mình thực sự là ai. Ai cũng cảm thấy gần bạn, nhưng ít ai thực sự biết bạn.`,
    inOneSentence: `Bạn là người mà mọi người đều cảm thấy hiểu — cho đến khi họ nhận ra mình chỉ đang nhìn thấy phần bạn cho phép họ thấy.`,
  },

  Hỏa: {
    element: "Hỏa",
    nickname: "Ngọn Lửa Giữa Ban Ngày",
    tagline: "Bạn không cần cố gắng tỏa sáng — bạn cứ có mặt là phòng đã ấm hơn rồi.",
    quote: {
      text: "Một ngọn nến không mất gì khi thắp sáng ngọn nến khác.",
      author: "Lawrence G. Lovasik",
    },
    overview: `Bạn đến và không khí thay đổi — không phải vì bạn cố, mà vì nhiệt huyết của bạn là thật và người ta cảm nhận được. Bạn dũng cảm theo cách không phải ai cũng có: không phải không sợ, mà là sợ mà vẫn đi. Nhưng ngọn lửa cháy mạnh nhất cũng tắt nhanh nhất nếu không được cung cấp nhiên liệu đúng cách — và bạn thường quên điều này khi đang cháy hết mình vì người khác.`,
    sections: [
      {
        heading: "Nhiệt huyết và can đảm",
        content: `Bạn hành động khi người khác còn đang cân nhắc. Bạn lên tiếng khi người khác im. Bạn không thoải mái với sự đứng yên — không phải vì thiếu kiên nhẫn, mà vì bạn nhìn thấy khả năng và cảm thấy không thể bỏ qua nó. Điều cần chú ý: ngọn lửa bốc đồng đôi khi thắp sáng nhưng cũng đôi khi thiêu.`,
      },
      {
        heading: "Trong công việc",
        content: `Bạn truyền cảm hứng — đây không phải kỹ năng học được, đây là bản chất. Người ta muốn theo bạn không phải vì bạn có kế hoạch hoàn hảo mà vì bạn làm họ tin rằng mình có thể. Thách thức là giai đoạn hậu-hứng-khởi: khi nhiệt tình đã lên đỉnh điểm và bắt đầu xuống, bạn cần học cách giữ ngọn lửa vừa đủ, không phải cháy hết rồi tắt.`,
      },
      {
        heading: "Trong quan hệ",
        content: `Yêu bạn không bao giờ nhàm. Bạn hào phóng, nhiệt tình và làm cho người thân cảm thấy mình đặc biệt — khi bạn đang để ý đến họ. Điểm cần chú ý: bạn đôi khi quá bận tỏa sáng đến mức không nhận ra người bên cạnh đang cần một thứ khác — không phải nhiệt, mà là sự bình yên.`,
      },
    ],
    coreContradiction: `Bạn tỏa sáng nhất khi cho đi — nhưng lại không biết cách nạp lại năng lượng. Bạn là mặt trời của nhiều người nhưng bên trong có thể đang lạnh. Người mang lại nhiệt huyết cho người khác thường xuyên cảm thấy mình đang cháy ra mà không biết tại sao.`,
    inOneSentence: `Bạn là người mà mọi người nhớ đến khi cần được kéo ra khỏi vùng an toàn — và thường quên hỏi liệu bạn có đang ổn không.`,
  },

  Thổ: {
    element: "Thổ",
    nickname: "Mảnh Đất Không Bỏ Ai",
    tagline: "Bạn là nơi người khác có thể đứng — và đôi khi bạn quên rằng mình cũng cần chỗ để đứng.",
    quote: {
      text: "Đất không bao giờ từ chối hạt giống.",
      author: "Triết lý Ngũ Hành",
    },
    overview: `Bạn là người mà mọi người tìm đến khi cần ai đó thật sự ở đó — không phải ai nói hay, mà là ai ở lại. Bạn không hứa nhiều, nhưng những gì bạn hứa thì thực. Sự ổn định của bạn không phải do bạn không cảm thấy gì — mà là bạn đã học cách không để cảm xúc xáo trộn mọi thứ. Nhưng đôi khi, sự ổn định đó không phải trí tuệ — đó là nỗi sợ thay đổi được ngụy trang rất tốt.`,
    sections: [
      {
        heading: "Điềm tĩnh và đáng tin",
        content: `Bạn là neo trong những lúc bão. Khi mọi người hoảng loạn, bạn vẫn nghĩ được. Khi người khác dao động, bạn giữ nguyên. Đây không phải vô cảm — đây là sức mạnh. Nhưng bạn cần phân biệt giữa điềm tĩnh thật (có nền tảng bên trong) và điềm tĩnh giả (đang giữ chặt mọi thứ vì sợ không kiểm soát được nếu buông).`,
      },
      {
        heading: "Trong công việc",
        content: `Bạn xây dựng dài hạn theo nghĩa đen — không nóng vội, không bỏ giữa chừng, không để cảm xúc nhất thời phá vỡ kế hoạch. Đây là tài sản thật trong bất kỳ tổ chức nào. Điểm cần chú ý: bạn đôi khi bỏ lỡ cơ hội vì quá cẩn trọng, hoặc giữ nguyên một cách làm đã lỗi thời vì ngại thay đổi hệ thống quen thuộc.`,
      },
      {
        heading: "Trong quan hệ",
        content: `Bạn là người bạn đời thực tế và trung thành nhất có thể tìm được — bạn lo cơm, lo nhà, lo những thứ người ta hay coi thường cho đến khi thiếu nó. Điều bạn cần học là: tình cảm đôi khi cần được nói ra, không chỉ được làm ra. Và thỉnh thoảng, người thân cần bạn hiện diện về mặt cảm xúc nhiều hơn là giải quyết vấn đề.`,
      },
    ],
    coreContradiction: `Bạn là nền tảng cho mọi người xung quanh — nhưng chính bạn thường không biết mình cần gì, muốn gì, vì đã quen dung hòa người khác trước. Sự bao dung của bạn đôi khi không phải lòng tốt thuần túy — mà là nỗi sợ xung đột, sợ mất ổn định, dẫn đến việc nuốt nhẫn mọi thứ vào trong. Đất nuôi dưỡng tất cả nhưng đất cũng cần được nghỉ ngơi.`,
    inOneSentence: `Bạn là người mà mọi thứ vẫn chạy được khi có mặt bạn — và mọi người chỉ nhận ra điều đó khi bạn không còn ở đó nữa.`,
  },

}
