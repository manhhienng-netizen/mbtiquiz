/**
 * TNCB MBTI TYPE DESCRIPTIONS — Viết lại theo tone TNCB
 * Cập nhật: 22/05/2026 15:30
 *
 * Schema: document "Viết lại content MBTI theo tone TNCB"
 * Giọng: người bạn thân, honest, không self-help cliché
 */

export interface TNCBTypeContent {
  type: string
  nickname: string
  tagline: string
  quote: { text: string; author: string }
  overview: string
  sections: Array<{ heading: string; content: string }>
  coreContradiction: string
  inOneSentence: string
}

export const TNCB_TYPE_CONTENT: Record<string, TNCBTypeContent> = {

  // ============================================================
  // ANALYSTS (NT)
  // ============================================================

  INTJ: {
    type: "INTJ",
    nickname: "Người hoạch định chiến lược",
    tagline: "Người vừa có \"đôi mắt diều hâu\" nhìn bao quát từ trên cao, vừa có \"bàn tay kỹ sư\" để ráp nối từng bánh răng vận hành một cách logic.",
    quote: {
      text: "Tư duy tạo nên sự vĩ đại của con người. Con người là cây sậy yếu ớt nhất trong tự nhiên, nhưng là cây sậy biết suy nghĩ.",
      author: "Blaise Pascal",
    },
    overview: `Trong một căn phòng đầy người, INTJ thường là người im lặng nhất — và đang nghĩ nhiều nhất. Họ không thiếu ý kiến, họ chỉ không thấy đáng nói nếu chưa chắc chắn. Bộ não của họ không bao giờ thật sự tắt — nó chỉ chuyển sang chế độ xử lý ngầm, liên tục phân tích, dự báo, và tối ưu. Điều khiến INTJ trở nên thú vị không phải là họ thông minh — mà là họ đủ kiên nhẫn để biến trí thông minh đó thành thứ gì đó thật.`,
    sections: [
      {
        heading: "Bộ máy chiến lược",
        content: `INTJ không nghĩ theo kiểu tuyến tính — họ nghĩ theo hệ thống. Một quyết định nhỏ với họ là một nút trong mạng lưới hệ quả lan rộng nhiều năm. Đây là lý do họ hiếm khi bị bất ngờ — và cũng là lý do họ đôi khi khó chịu khi người khác không nhìn thấy những gì họ thấy rõ mồn một.`,
      },
      {
        heading: "Cái giá của tiêu chuẩn cao",
        content: `INTJ có tiêu chuẩn cao với bản thân — và vô tình cũng áp lên người khác. Không phải ác ý, chỉ là họ thấy khoảng cách giữa "hiện tại" và "có thể" quá rõ để bỏ qua. Kết quả: người thân đôi khi cảm thấy không bao giờ đủ, còn INTJ thì không hiểu tại sao lại có vấn đề.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `INTJ không yêu bằng lời — họ yêu bằng hành động có tính toán. Họ nhớ chi tiết bạn nói từ 3 tháng trước, giải quyết vấn đề trước khi bạn kịp nhận ra có vấn đề, và thầm lặng đặt bạn vào ưu tiên hàng đầu. Nhưng nếu bạn chờ họ nói "anh/em yêu em/anh" bằng cách thông thường — bạn có thể chờ lâu.`,
      },
    ],
    coreContradiction: `Muốn kết nối thật sự với người khác — nhưng không chịu được sự hời hợt. Kết quả: thường ở một mình không phải vì muốn, mà vì chưa tìm được người xứng đáng để mở ra.`,
    inOneSentence: `Người duy nhất trong phòng đang nghĩ về 10 năm sau trong khi mọi người bàn về tuần tới.`,
  },

  INTP: {
    type: "INTP",
    nickname: "Nhà tư duy bản chất",
    tagline: "Người có khả năng giải mã và sửa chữa mọi nút thắt phức tạp nhất từ phần lõi.",
    quote: {
      text: "Điều quan trọng là đừng ngừng đặt câu hỏi. Sự tò mò tự nó có lý do tồn tại.",
      author: "Albert Einstein",
    },
    overview: `INTP sống nhiều hơn trong đầu mình so với trong thực tế — và họ không thấy đây là vấn đề. Khi người khác đang ở trong cuộc trò chuyện, INTP đang đồng thời chạy ba luồng suy nghĩ song song, một trong số đó có thể hoàn toàn không liên quan. Điều kỳ lạ là họ vẫn nghe — họ chỉ đang xử lý theo cách riêng. Người hiểu INTP sẽ biết rằng im lặng của họ không phải thờ ơ — đó là dấu hiệu họ đang thật sự cân nhắc.`,
    sections: [
      {
        heading: "Mê cung của ý tưởng",
        content: `INTP không học để biết — họ học vì không học thì không chịu được. Sự tò mò của họ không có điểm đến cố định: bắt đầu từ triết học lượng tử, kết thúc ở lịch sử ngôn ngữ học vào lúc 3 giờ sáng. Không phải vì thiếu tập trung, mà vì mỗi câu hỏi mở ra một câu hỏi khác thú vị hơn.`,
      },
      {
        heading: "Tê liệt vì phân tích",
        content: `INTP biết rõ mình cần làm gì — nhưng thường bị kẹt giữa vô số phương án có thể. Họ không lười, họ đang tối ưu hoá. Vấn đề là quá trình tối ưu đôi khi kéo dài hơn bản thân hành động. Deadline là thứ duy nhất thật sự khiến họ dừng phân tích và bắt tay vào làm.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `INTP quan tâm — theo cách khó nhìn thấy. Họ không gửi tin nhắn hỏi thăm hàng ngày, nhưng nếu bạn có vấn đề, họ sẽ nghĩ về giải pháp cho bạn trong lúc tắm, lúc ăn, và có thể lúc ngủ. Họ cần người bạn đời chịu được sự im lặng thoải mái — và không hiểu nhầm sự thiếu biểu đạt cảm xúc là thiếu tình cảm.`,
      },
    ],
    coreContradiction: `Muốn được hiểu sâu — nhưng hiếm khi chịu giải thích đến nơi đến chốn. Thường kết thúc bằng cảm giác cô đơn trí tuệ dù xung quanh không thiếu người.`,
    inOneSentence: `Người có thể giải thích lý thuyết tương đối trong 5 phút nhưng không biết cách nói "tôi nhớ bạn".`,
  },

  ENTJ: {
    type: "ENTJ",
    nickname: "Nhà lãnh đạo quyết liệt",
    tagline: "Người biến những chiến lược vĩ mô thành kết quả thực tế bằng kỷ luật và tốc độ tối đa.",
    quote: {
      text: "Thời gian của bạn có hạn, đừng lãng phí nó để sống cuộc đời của người khác.",
      author: "Steve Jobs",
    },
    overview: `ENTJ bước vào phòng và tự động bắt đầu xem mọi thứ có thể được tổ chức lại tốt hơn như thế nào. Không phải kiêu ngạo — đó là phản xạ. Họ nhìn thấy cấu trúc, thấy inefficiency, thấy điểm mạnh chưa được khai thác. Vấn đề là họ thấy những thứ này nhanh đến mức người khác đôi khi cảm thấy mình chỉ là một biến số trong bảng kế hoạch của ENTJ.`,
    sections: [
      {
        heading: "Máy tạo ra kết quả",
        content: `ENTJ không làm việc — họ chinh phục. Mục tiêu với họ không phải đích đến mà là đường đua. Khó khăn không làm họ nản — nó làm họ hứng. Khi gặp tường, ENTJ không than — họ hỏi tường đó dày bao nhiêu và tìm cách đi xuyên qua theo đúng nghĩa đen.`,
      },
      {
        heading: "Điểm mù cảm xúc",
        content: `ENTJ hiểu logic của cảm xúc — nhưng không phải cảm xúc. Họ biết rằng mọi người cần được công nhận, cần được lắng nghe, cần cảm thấy an toàn. Nhưng trong thực tế, khi deadline đến, những thứ đó trở thành "sẽ xử lý sau". Và "sau" thường không đến.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `Yêu một ENTJ nghĩa là chấp nhận rằng họ sẽ cố gắng optimize cả mối quan hệ. Không phải thiếu tình cảm — họ chỉ muốn mọi thứ hoạt động tốt nhất có thể, kể cả tình yêu. Người phù hợp với ENTJ là người đủ mạnh để không bị cuốn vào quỹ đạo của họ — mà đứng vững ở bên cạnh.`,
      },
    ],
    coreContradiction: `Cần sự công nhận và phản hồi từ người khác — nhưng thường hành xử như thể không cần ai. Mâu thuẫn này ít khi được thừa nhận, ngay cả với chính mình.`,
    inOneSentence: `Người luôn có kế hoạch dự phòng cho kế hoạch dự phòng — nhưng không có kế hoạch cho việc nghỉ ngơi.`,
  },

  ENTP: {
    type: "ENTP",
    nickname: "Nhà đột phá tư duy",
    tagline: "Người giữ cho tổ chức không bị ngủ quên trên chiến thắng và luôn tự tiến hóa trước khi bị thị trường đào thải.",
    quote: {
      text: "Hãy đi theo con đường của người tư duy độc lập. Hãy để ý tưởng đối mặt với rủi ro của sự tranh cãi.",
      author: "Thomas J. Watson",
    },
    overview: `ENTP tranh luận không phải để thắng — họ tranh luận để xem ý tưởng có đứng vững được không. Nếu bạn đưa ra một luận điểm và họ phản bác, đó thường là dấu hiệu họ thấy bạn đủ sắc sảo để tranh luận nghiêm túc. Nguy hiểm là không phải ai cũng hiểu điều này. Và ENTP thường không dừng lại đúng lúc để giải thích.`,
    sections: [
      {
        heading: "Phòng thí nghiệm ý tưởng",
        content: `ENTP không theo đuổi ý tưởng — họ chơi với chúng. Một ý tưởng tốt với họ không phải là ý tưởng đúng, mà là ý tưởng thú vị đến mức đáng đào sâu. Họ có thể bảo vệ một quan điểm trong 20 phút, rồi chuyển sang bảo vệ quan điểm đối lập với cùng mức độ nhiệt tình — và không thấy mâu thuẫn gì.`,
      },
      {
        heading: "Khoảng cách giữa ý tưởng và thực hiện",
        content: `ENTP giỏi khởi đầu hơn kết thúc. Phần hào hứng nhất với họ là lúc ý tưởng còn mới — khi mọi thứ còn là khả năng. Khi bước vào giai đoạn thực thi lặp lại, năng lượng tụt nhanh. Điểm mạnh lớn nhất của họ cũng là điểm yếu lớn nhất: họ quá giỏi tìm cái mới đến mức khó ở lại với cái cũ đủ lâu.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ENTP yêu bằng trí tuệ trước tiên. Người hấp dẫn họ là người dám đặt câu hỏi lại những gì họ nói, không phải người đồng ý. Nhưng họ cần học rằng không phải mọi cuộc trò chuyện với người thân đều là buổi debate — và đôi khi người ta chỉ cần được lắng nghe, không cần được phân tích.`,
      },
    ],
    coreContradiction: `Ghét sự nhàm chán — nhưng sự nhàm chán là thứ cần thiết để hoàn thành bất cứ điều gì có ý nghĩa. Cuộc chiến nội tâm giữa "thú vị" và "có giá trị" không bao giờ thật sự kết thúc.`,
    inOneSentence: `Người thông minh nhất trong phòng — và người hay bỏ lỡ deadline nhất trong phòng.`,
  },

  // ============================================================
  // DIPLOMATS (NF)
  // ============================================================

  INFJ: {
    type: "INFJ",
    nickname: "Người xây dựng di sản",
    tagline: "Người không chỉ xây dựng một dự án hay một công ty, mà đang xây dựng một di sản.",
    quote: {
      text: "Hãy đối xử với mọi người như thể họ là những gì họ nên là, và bạn giúp họ trở thành những gì họ có khả năng.",
      author: "Johann Wolfgang von Goethe",
    },
    overview: `INFJ hiểu người khác theo cách khó giải thích. Không phải vì họ có thông tin nhiều hơn — mà vì họ đọc được những thứ ẩn dưới bề mặt: ngữ điệu, cách ngừng lại, thứ người ta không nói. Món quà này có giá của nó: INFJ thường mang cảm xúc của người khác như mang của mình, và không phải lúc nào cũng biết đặt xuống. Họ là type hiếm nhất — và thường cảm thấy lạc lõng nhất trong thế giới bình thường.`,
    sections: [
      {
        heading: "Trực giác như la bàn",
        content: `INFJ không suy luận bước-một-bước — họ nhảy thẳng đến kết luận rồi mới dò ngược lại xem tại sao. Đây là lý do trực giác của họ đôi khi đúng đến mức đáng sợ và đôi khi sai hoàn toàn. Khi cả hai xảy ra, INFJ khó phân biệt đâu là insight thật và đâu là projection của chính mình.`,
      },
      {
        heading: "Burnout trong im lặng",
        content: `INFJ không hay nói mình đang mệt. Họ tiếp tục — vì còn người cần họ, vì còn việc phải làm, vì từ chối cảm thấy như phụ lòng tin. Burnout của INFJ không bùng nổ — nó rỉ ra từ từ, đến khi họ thức dậy một ngày không còn cảm xúc gì nữa và không hiểu tại sao.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `INFJ cho nhiều — nhưng hiếm khi cầu nhiều. Họ giỏi đọc nhu cầu của người khác đến mức thường quên mất mình cũng có nhu cầu. Người phù hợp với INFJ không cần hoàn hảo — chỉ cần đủ hiện diện để thỉnh thoảng hỏi "hôm nay em/anh thế nào?" và thật sự muốn nghe câu trả lời.`,
      },
    ],
    coreContradiction: `Muốn được hiểu thật sự — nhưng sợ để người khác thấy hết. Kết quả: thân với nhiều người, nhưng thật sự mở lòng với rất ít.`,
    inOneSentence: `Người nhìn thấy điểm mạnh của bạn rõ hơn bạn — và đôi khi vì điều đó mà tự làm khổ mình.`,
  },

  INFP: {
    type: "INFP",
    nickname: "Người chân tâm chính trực",
    tagline: "Người dùng thế giới nội tâm vững chãi làm điểm tựa định hình mọi hành động ra thế giới bên ngoài.",
    quote: {
      text: "Không phải tất cả vàng đều lấp lánh; không phải tất cả những người lang thang đều lạc đường.",
      author: "J. R. R. Tolkien",
    },
    overview: `INFP trông có vẻ nhẹ nhàng — nhưng bên trong là cả một vũ trụ. Họ cảm nhận mọi thứ ở tần số sâu hơn người bình thường: một bài nhạc có thể khiến họ khóc không vì lý do cụ thể nào, một sự bất công nhỏ có thể ám ảnh họ cả tuần. Điều này không phải yếu đuối — đó là độ nhạy cảm không phải ai cũng có khả năng gánh được.`,
    sections: [
      {
        heading: "Lý tưởng và thực tế",
        content: `INFP có hình dung rõ về thế giới nên như thế nào — và thường xuyên thất vọng khi thực tế không khớp. Họ không phải người bi quan; họ là người lý tưởng quá mức. Khoảng cách giữa "nên" và "là" là nguồn đau lớn nhất của họ — và đôi khi cũng là nguồn sáng tạo lớn nhất.`,
      },
      {
        heading: "Hành động hay mơ mộng",
        content: `INFP có nhiều ý tưởng hơn hành động. Không phải vì lười — mà vì mỗi ý tưởng gắn với một phần bản sắc, và nếu thực hiện mà thất bại, cảm giác như mất một phần mình. Sự tê liệt này không ai thấy vì INFP không nói ra. Họ chỉ im lặng và tiếp tục mơ.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `INFP yêu sâu — nhưng yêu người thật hay yêu phiên bản lý tưởng của người đó? Ranh giới này đôi khi mờ với họ. Họ cần người bạn đời kiên nhẫn: kiên nhẫn với sự nhạy cảm, với những khoảng lặng cần thiết, và với việc đôi khi INFP cần thời gian riêng không phải vì ghét bạn mà vì cần nạp lại cho chính mình.`,
      },
    ],
    coreContradiction: `Muốn tạo ra ý nghĩa — nhưng sợ thất bại đến mức đôi khi không bắt đầu. Khoảng cách giữa điều có thể làm và thực hiện là nơi INFP hay bị mắc kẹt lâu nhất.`,
    inOneSentence: `Người cảm nhận được nỗi đau của người lạ qua một đoạn văn — nhưng không biết cách nói với bạn bè rằng mình đang không ổn.`,
  },

  ENFJ: {
    type: "ENFJ",
    nickname: "Nhà lãnh đạo nhân tâm",
    tagline: "Người không dùng mệnh lệnh để ép buộc, mà dùng sự thấu hiểu và lòng quan tâm để thu phục lòng người.",
    quote: {
      text: "Khi cả thế giới im lặng, ngay cả một giọng nói cũng trở nên mạnh mẽ.",
      author: "Malala Yousafzai",
    },
    overview: `ENFJ bước vào một căn phòng và bắt đầu đọc phòng — ai đang không ổn, ai cần được kéo vào cuộc trò chuyện, ai cần không gian. Họ làm điều này tự động, không cần nghĩ, và thường không nhận ra mình đang làm. Phần đáng lo không phải là họ quan tâm quá nhiều — mà là họ thường quên mình cũng cần được ai đó quan tâm lại.`,
    sections: [
      {
        heading: "Năng lượng truyền cảm hứng",
        content: `ENFJ giỏi nhìn thấy điểm mạnh của người khác và làm cho người ta tin vào điều đó. Không phải bằng lời khen rỗng tuếch — mà bằng sự thấu hiểu cụ thể đủ để người ta cảm thấy được nhìn thấy thật sự. Đây là tài năng hiếm. Nhưng nó cũng khiến ENFJ dễ bị người khác lợi dụng — dù vô tình hay cố ý.`,
      },
      {
        heading: "Kiểm soát ẩn",
        content: `ENFJ giúp đỡ từ trái tim — nhưng đôi khi kèm theo một hình dung ngầm về người kia "nên" trở thành ai. Khi người ta không đi theo hướng đó, ENFJ thất vọng. Không phải tức giận — chỉ là nỗi buồn lặng lẽ vì cảm thấy mình đã đầu tư mà không được đáp lại. Ranh giới giữa giúp đỡ và kỳ vọng ở ENFJ rất mỏng.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `Yêu một ENFJ nghĩa là được chăm sóc theo cách bạn không nghĩ mình cần — và đôi khi nhiều hơn bạn muốn. Họ cần người nhắc nhở rằng "anh/em cũng có thể cần giúp đỡ đôi khi". Và cần người đủ mạnh để nói "không" với họ mà không làm họ cảm thấy bị từ chối.`,
      },
    ],
    coreContradiction: `Sống vì người khác — đến mức đôi khi không biết mình thật sự muốn gì cho bản thân. Câu hỏi "em/anh muốn gì?" đôi khi là câu hỏi khó nhất với họ.`,
    inOneSentence: `Người nhớ sinh nhật của tất cả mọi người — nhưng thường ăn sinh nhật của mình một mình.`,
  },

  ENFP: {
    type: "ENFP",
    nickname: "Người truyền đam mê",
    tagline: "Người dùng ngọn lửa nhiệt huyết của chính mình để kết nối lòng người và đánh thức sức mạnh hành động trong tập thể.",
    quote: {
      text: "Tôi không quan tâm bạn làm gì để kiếm sống. Tôi muốn biết điều gì làm bạn khao khát.",
      author: "Oriah Mountain Dreamer",
    },
    overview: `ENFP không giả vờ hứng thú — họ thật sự thấy thế giới đầy điều thú vị đến mức khó ngồi yên. Người mới gặp nghĩ họ hời hợt; người biết họ lâu biết họ có chiều sâu đáng ngạc nhiên. Điều họ tìm kiếm không phải là vui — họ tìm kiếm ý nghĩa. Và họ sẵn sàng bỏ rất nhiều thứ để theo đuổi nó.`,
    sections: [
      {
        heading: "Kết nối đến từng người",
        content: `ENFP có khả năng làm cho người đối diện cảm thấy mình là người thú vị nhất trong phòng — và thường là thật, không phải xã giao. Họ hỏi câu hỏi người khác không hỏi, nhớ chi tiết người khác bỏ qua, và thật sự muốn hiểu bạn là ai chứ không phải bạn đang làm gì.`,
      },
      {
        heading: "Hoàn thành là kẻ thù",
        content: `ENFP khởi đầu rất tốt — kết thúc là vấn đề. Không phải vì thiếu năng lực, mà vì khi ý tưởng không còn mới, năng lượng rơi. Họ có thể có 10 dự án dở dang và không cảm thấy tệ về điều đó cho đến khi nhìn lại và thấy không có gì được hoàn thành.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ENFP yêu bằng toàn bộ con người — cường độ cao, hiện diện đầy đủ, cảm xúc thật. Điều này có thể áp lực với người ít biểu đạt hơn. Họ cần người bạn đời không ngại depth, không ngại những cuộc trò chuyện lúc 2 giờ sáng về ý nghĩa cuộc đời — và biết cách kéo họ lại khi bay quá xa.`,
      },
    ],
    coreContradiction: `Luôn kết nối với mọi người — nhưng thường cảm thấy không ai thật sự hiểu mình đến cùng. Càng hướng ngoại, càng cô đơn theo cách khó diễn đạt.`,
    inOneSentence: `Người có thể trở thành bạn thân của bạn trong 3 tiếng — nhưng cần cả năm để thật sự tin tưởng bạn.`,
  },

  // ============================================================
  // SENTINELS (SJ)
  // ============================================================

  ISTJ: {
    type: "ISTJ",
    nickname: "Người giữ nền vững chãi",
    tagline: "Người mà cả hệ thống có thể dựa vào khi mọi thứ lung lay.",
    quote: {
      text: "Tôi sẽ sợ hơn khi không sử dụng bất kỳ khả năng nào được trao cho mình.",
      author: "Denzel Washington",
    },
    overview: `ISTJ không gây ấn tượng bằng sự hào nhoáng — họ gây ấn tượng bằng sự đáng tin. Không nói to, không hứa hẹn lớn, nhưng những gì họ cam kết thì họ làm. Đây là type mà người ta nhận ra giá trị khi khủng hoảng xảy ra — không phải ở thời điểm bình thường. Và đôi khi ISTJ lặng lẽ buồn vì điều đó.`,
    sections: [
      {
        heading: "Xương sống vô hình",
        content: `ISTJ là người giữ cho mọi thứ vận hành — thường không ai nhận ra. Họ không kêu ca, không đòi công nhận, chỉ tiếp tục làm những gì cần làm. Đây là sức mạnh thật — nhưng cũng là lý do họ hay bị giao thêm việc hơn mức công bằng, vì người ta biết họ sẽ làm và sẽ làm tốt.`,
      },
      {
        heading: "Quy tắc không phải ngục tù",
        content: `ISTJ không theo quy tắc vì sợ — họ theo vì tin vào tính hiệu quả của hệ thống. Khi ai đó phá vỡ quy tắc và mọi thứ vẫn ổn, ISTJ không vui — họ lo lắng về lần sau. Không phải cứng nhắc, mà là nhìn thấy rủi ro người khác không thấy.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ISTJ không nói yêu bằng lời nhiều — nhưng nếu bạn ốm, họ ở đó. Nếu bạn có deadline, họ nhắc nhở. Nếu bạn cần ai đó tin cậy, họ là người gọi đúng. Người hiểu ISTJ biết rằng sự hiện diện ổn định của họ là hình thức yêu thương sâu sắc nhất.`,
      },
    ],
    coreContradiction: `Cho đi nhiều — nhưng hiếm khi nói mình cần gì. Không phải vì không cần, mà vì cảm thấy thể hiện nhu cầu là yếu đuối. Kết quả: đôi khi cô đơn ngay trong mối quan hệ.`,
    inOneSentence: `Người mà bạn không nghĩ đến — cho đến ngày bạn thật sự cần một người đáng tin.`,
  },

  ISFJ: {
    type: "ISFJ",
    nickname: "Người bảo vệ thầm lặng",
    tagline: "Người mang chiếc áo giáp sắt bên ngoài để chống đỡ bão giông, nhưng giữ sự dịu dàng và tử tế bên trong để nuôi dưỡng những người xung quanh.",
    quote: {
      text: "Tình yêu chỉ phát triển bằng cách chia sẻ. Bạn chỉ có thể có nhiều hơn bằng cách cho đi.",
      author: "Brian Tracy",
    },
    overview: `ISFJ nhớ ngày sinh nhật của bạn, nhớ bạn không thích ngò, nhớ lần bạn kể chuyện buồn cách đây ba tháng — và hỏi thăm mà không cần bạn nhắc. Loại sự quan tâm này không phải ai cũng có, và không phải ai cũng nhận ra giá trị của nó. ISFJ thường là người mà người ta chỉ thực sự trân trọng khi họ vắng mặt.`,
    sections: [
      {
        heading: "Ký ức cảm xúc",
        content: `ISFJ có trí nhớ đặc biệt về những gì quan trọng với người khác. Không phải sự kiện lớn — mà là những chi tiết nhỏ: bạn thích uống cà phê không đường, bạn sợ đám đông, bạn từng nói mình muốn đi Đà Lạt vào mùa đông. Họ lưu trữ những thứ này và dùng đúng lúc. Không phải thao túng — đó là yêu thương theo cách họ biết.`,
      },
      {
        heading: "Ranh giới bị xói mòn",
        content: `ISFJ không giỏi nói không — không phải vì thiếu ý chí, mà vì từ chối cảm thấy như gây tổn thương. Kết quả: họ thường gánh nhiều hơn mức mình có thể chịu, mỉm cười và tiếp tục, đến khi cạn kiệt và không biết tại sao. Người xung quanh thường không nhận ra vì ISFJ không kêu.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `Yêu một ISFJ nghĩa là được chăm sóc theo những cách bạn không nghĩ mình muốn cho đến khi bạn có. Điều họ cần lại là thứ họ ít khi nhận được: ai đó chủ động hỏi "em/anh cần gì?" — và không để họ trả lời "không có gì".`,
      },
    ],
    coreContradiction: `Cho đi liên tục mà không nói mình mệt — đến khi mệt thật rồi thì không còn sức để nói nữa. Sự kiên nhẫn của họ thường bị hiểu nhầm là không có nhu cầu.`,
    inOneSentence: `Người mà ngôi nhà ấm áp nhất khi có họ — nhưng họ thường không biết mình quan trọng như thế nào.`,
  },

  ESTJ: {
    type: "ESTJ",
    nickname: "Nhà tối ưu trật tự",
    tagline: "Người dùng tư duy cấu trúc để dẹp bỏ hỗn loạn, thiết lập trật tự và biến mọi nguồn lực thành hiệu suất.",
    quote: {
      text: "Trật tự tốt là nền tảng của mọi thứ.",
      author: "Edmund Burke",
    },
    overview: `ESTJ không phức tạp hóa những gì có thể đơn giản — và không dung túng những người làm vậy. Họ biết điều gì cần làm, biết ai nên làm, và biết khi nào cần xong. Trong thế giới mà nhiều người mơ hồ về trách nhiệm, ESTJ là người hiếm hoi dám nói thẳng và làm đúng lời.`,
    sections: [
      {
        heading: "Hệ thống chạy, kết quả có",
        content: `ESTJ không tin vào may mắn — họ tin vào quy trình. Với họ, nếu mọi thứ được tổ chức đúng, kết quả sẽ đến. Điểm mạnh này làm họ xuất sắc trong quản lý, vận hành, và bất cứ thứ gì cần sự nhất quán. Điểm yếu: đôi khi quy trình trở thành mục tiêu thay vì phương tiện.`,
      },
      {
        heading: "Khó với cái mới",
        content: `ESTJ tôn trọng những gì đã được chứng minh. Điều này nghĩa là họ đôi khi chậm thích nghi với thay đổi — không phải vì thiếu năng lực, mà vì họ cần bằng chứng trước khi tin. "Mới" không tự động là "tốt hơn" với ESTJ.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ESTJ yêu bằng trách nhiệm: lo chu đáo, đáng tin, luôn ở đó. Nhưng họ đôi khi quên rằng người thân không cần người quản lý — họ cần người bạn đồng hành. Học cách lắng nghe mà không lập tức giải quyết là quá trình dài của nhiều ESTJ.`,
      },
    ],
    coreContradiction: `Cứng rắn với cái sai — nhưng đôi khi định nghĩa "sai" quá hẹp. Khoảng cách giữa tiêu chuẩn và sự kiểm soát ở ESTJ rất mỏng, và không phải lúc nào họ cũng nhận ra mình đã vượt qua.`,
    inOneSentence: `Người bạn muốn tổ chức sự kiện — nhưng đừng cãi với họ về cách sắp xếp bàn ghế.`,
  },

  ESFJ: {
    type: "ESFJ",
    nickname: "Người gắn kết cộng đồng",
    tagline: "Người dùng sự kiên nhẫn và lòng bao dung để nuôi dưỡng con người, dẹp bỏ xung đột và gắn kết tập thể thành một khối bền vững.",
    quote: {
      text: "Năng lượng tích cực lan tỏa đến một người sẽ được tất cả chúng ta cảm nhận.",
      author: "Deborah Day",
    },
    overview: `ESFJ chú ý đến những thứ người khác bỏ qua: ai chưa được giới thiệu, ai đang đứng một mình, ai cần thêm nước. Không phải vì họ lo lắng — mà vì sự hòa hợp của nhóm là thứ họ cảm nhận như nhiệt độ phòng. Khi có gì không ổn, họ biết trước khi ai nói ra. Và họ sẽ xử lý trước khi bạn kịp nhận ra có vấn đề.`,
    sections: [
      {
        heading: "Nền tảng của cộng đồng",
        content: `ESFJ là người giữ cho các mối quan hệ sống — bằng cách nhớ, bằng cách kiểm tra, bằng cách xuất hiện. Họ không cần lý do đặc biệt để hỏi thăm bạn. Sự kiên định này, theo thời gian, là thứ xây dựng lòng tin thật sự trong cộng đồng.`,
      },
      {
        heading: "Sự công nhận là nhiên liệu",
        content: `ESFJ cần biết mình đang làm đúng — không phải vì bất an, mà vì họ đầu tư nhiều cảm xúc vào việc làm cho người khác hài lòng. Khi không được phản hồi, họ tự hỏi. Khi bị chỉ trích trực tiếp, họ cảm thấy nặng hơn người khác nhiều. Không phải yếu đuối — chỉ là họ thật sự quan tâm.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ESFJ yêu bằng hành động cụ thể: nấu ăn, nhớ ngày đặc biệt, ở đó khi bạn cần. Điều họ cần là người bạn đời thừa nhận những điều nhỏ đó — không phải quà to, chỉ cần nói "cảm ơn, anh/em để ý thật". Sự công nhận chân thành là ngôn ngữ tình yêu của ESFJ.`,
      },
    ],
    coreContradiction: `Sống để làm người khác vui — nhưng đôi khi không biết ranh giới giữa quan tâm và cần được chấp nhận. Không phải ai nhờ giúp đỡ cũng nghĩa là họ muốn ESFJ can thiệp vào cuộc sống của họ.`,
    inOneSentence: `Người mà nhóm bạn nào cũng cần một — nhưng thường không ai nói ra điều đó với họ.`,
  },

  // ============================================================
  // EXPLORERS (SP)
  // ============================================================

  ISTP: {
    type: "ISTP",
    nickname: "Nghệ nhân thực chiến",
    tagline: "Người dùng đôi bàn tay thạo nghề để giải quyết thực tế, và dùng tư duy tự do để không bao giờ bị đóng khung trong bất kỳ giới hạn nào.",
    quote: {
      text: "Tôi muốn sống một cuộc đời khác biệt. Tôi muốn có những thách thức thú vị.",
      author: "Harrison Ford",
    },
    overview: `ISTP không giải thích nhiều — họ chỉ làm. Khi người khác đang họp bàn về vấn đề, ISTP đã thử ba phương án và loại hai. Họ học bằng tay, bằng thực nghiệm, bằng thất bại nhanh và thử lại nhanh hơn. Đây không phải sự liều lĩnh — đây là phương pháp luận của họ.`,
    sections: [
      {
        heading: "Bình tĩnh trong hỗn loạn",
        content: `ISTP giỏi nhất khi mọi thứ đang sụp đổ. Họ không bị cuốn vào cảm xúc của khủng hoảng — họ đánh giá tình hình, tìm điểm kiểm soát, và hành động. Đây là lý do họ thường là người bình tĩnh nhất trong phòng khi mọi người hoảng loạn — và đôi khi cũng là lý do người ta nghĩ họ vô cảm.`,
      },
      {
        heading: "Tự do là không thể thương lượng",
        content: `ISTP không theo lịch vì lịch nói phải theo — họ theo lịch nếu lịch đó có ý nghĩa. Cấu trúc quá cứng nhắc làm họ ngạt thở. Điều này đôi khi gây ra ma sát trong môi trường có nhiều quy trình — không phải vì ISTP không tôn trọng hệ thống, mà vì họ cần hiểu tại sao hệ thống tồn tại trước khi tuân theo.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ISTP không phải người dễ đọc cảm xúc. Họ quan tâm — nhưng theo cách hành động: sửa cái bạn cần sửa, ở đó khi bạn cần người ở đó, không hỏi nhiều nhưng không bao giờ biến mất. Người hiểu ngôn ngữ tình yêu này sẽ cảm thấy rất an toàn bên ISTP. Người không hiểu sẽ nghĩ ISTP lạnh lùng.`,
      },
    ],
    coreContradiction: `Muốn kết nối — nhưng không muốn giải thích bản thân. Muốn được hiểu — nhưng không chịu nói. Sự mâu thuẫn này tự giải quyết được khi họ tìm được người đủ kiên nhẫn để ở lại mà không đòi hỏi nhiều lời.`,
    inOneSentence: `Người sửa được bất cứ thứ gì — trừ sự kỳ vọng rằng mình phải giải thích cách mình làm.`,
  },

  ISFP: {
    type: "ISFP",
    nickname: "Người sống trọn hiện tại",
    tagline: "Người không chỉ tồn tại để đạt mục tiêu, mà đang thực sự \"sống\" và cảm nhận cuộc đời bằng một trái tim rộng mở.",
    quote: {
      text: "Tôi thay đổi trong suốt một ngày. Tôi thức dậy và tôi là một người, và khi tôi đi ngủ tôi biết chắc mình là người khác.",
      author: "Bob Dylan",
    },
    overview: `ISFP không cố gắng ấn tượng bạn — họ chỉ đang là chính mình, và đôi khi điều đó ấn tượng hơn bất cứ thứ gì được tính toán. Họ sống trong khoảnh khắc hiện tại theo nghĩa đen: không hoạch định quá xa, không lo lắng quá nhiều, tìm thấy ý nghĩa trong những thứ nhỏ — một bữa ăn ngon, ánh sáng lúc hoàng hôn, một bài nhạc đúng tâm trạng.`,
    sections: [
      {
        heading: "Nghệ sĩ của cuộc sống",
        content: `ISFP có mắt thẩm mỹ tự nhiên — không phải chỉ về nghệ thuật, mà về cách cuộc sống nên được sống. Họ chú ý đến texture, màu sắc, cảm xúc trong không gian. Điều này làm cho thế giới quanh họ thường đẹp hơn — nhưng cũng làm cho họ đặc biệt nhạy cảm với sự thô ráp, áp lực, và sự bất chân thật.`,
      },
      {
        heading: "Tránh xung đột đến mức tự hại",
        content: `ISFP không thích xung đột — không phải vì họ không có quan điểm, mà vì xung đột cảm thấy như phá vỡ thứ gì đó. Kết quả: họ thường nuốt bực bội, im lặng khi cần lên tiếng, rời đi thay vì đối mặt. Điều này bảo vệ hòa bình ngắn hạn nhưng tích tụ dài hạn.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ISFP yêu bằng sự hiện diện — họ ở đó, thật sự ở đó, không xao lãng, không agenda. Điều họ cần là người tôn trọng không gian của họ, không đòi hỏi giải thích cho mỗi cảm xúc, và không cố thay đổi họ thành phiên bản "ổn định hơn".`,
      },
    ],
    coreContradiction: `Muốn được chấp nhận hoàn toàn — nhưng hiếm khi cho người khác thấy đủ để được chấp nhận. Lớp vỏ bình thản bên ngoài che giấu một nội tâm nhạy cảm không phải ai cũng biết đến.`,
    inOneSentence: `Người sống đẹp nhất trong những khoảnh khắc mà người khác hay bỏ lỡ.`,
  },

  ESTP: {
    type: "ESTP",
    nickname: "Nhà hành động táo bạo",
    tagline: "Người có cái đầu lạnh để đọc thế trận trong vài giây và tinh thần thép để thực hiện những cú đặt cược thay đổi hoàn toàn cục diện.",
    quote: {
      text: "Cuộc sống hoặc là một cuộc phiêu lưu táo bạo, hoặc không là gì cả.",
      author: "Helen Keller",
    },
    overview: `ESTP không đợi — họ bắt đầu. Trong khi người khác đang phân tích, họ đã thử. Trong khi người khác đang họp, họ đã có kết quả. Không phải liều lĩnh — họ đọc phòng, đọc người, đọc tình huống nhanh đến mức quyết định của họ trông có vẻ bốc đồng nhưng thực ra được thông tin từ hàng nghìn quan sát nhỏ mà người khác không để ý.`,
    sections: [
      {
        heading: "Trực giác trong thực tế",
        content: `ESTP nhận ra thay đổi trong nét mặt, ngữ điệu, cách người ta di chuyển. Họ đọc phòng trong vài giây và điều chỉnh theo tức thì. Đây là lý do họ xuất sắc trong bán hàng, đàm phán, và bất cứ thứ gì đòi hỏi đọc người nhanh và phản ứng chính xác.`,
      },
      {
        heading: "Hệ quả dài hạn",
        content: `ESTP sống tốt trong hiện tại — nhưng đôi khi quá tốt đến mức tương lai không được nghĩ đến. Họ xử lý vấn đề ngay khi nó xảy ra thay vì ngăn nó xảy ra. Điều này hiệu quả trong nhiều tình huống — nhưng trong tài chính, sức khỏe, hay mối quan hệ, nó có thể tạo ra những hệ quả tích lũy không dễ giải quyết sau này.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `ESTP cuốn hút — không ai phủ nhận điều đó. Họ vui vẻ, năng động, và làm cho cuộc sống thú vị hơn. Điều họ cần học là không phải mọi vấn đề đều cần được giải quyết, đôi khi người thân chỉ cần được lắng nghe. Và lắng nghe không phải là chờ đến lượt mình nói.`,
      },
    ],
    coreContradiction: `Muốn tự do tuyệt đối — nhưng cũng muốn kết nối sâu. Hai thứ này không dễ tồn tại cùng nhau, và ESTP thường phải chọn một ở những thời điểm quan trọng.`,
    inOneSentence: `Người làm cho căn phòng sống động lên — nhưng đôi khi rời đi trước khi bữa tiệc kết thúc.`,
  },

  ESFP: {
    type: "ESFP",
    nickname: "Đại sứ niềm vui",
    tagline: "Người tồn tại như một nguồn năng lượng thuần khiết — kết nối và thắp sáng khoảnh khắc hiện tại cho bất kỳ ai gặp gỡ.",
    quote: {
      text: "Hãy sống cho từng giây mà không do dự.",
      author: "Elton John",
    },
    overview: `ESFP không cố gắng làm cho không khí nhẹ hơn — họ chỉ đang là chính mình, và điều đó có tác dụng phụ làm cho mọi người xung quanh cảm thấy tốt hơn. Họ yêu cuộc sống không phải vì không biết cuộc sống khó — mà vì họ chọn tập trung vào những gì tốt trong khi nó còn đó. Đây là sự lạc quan có ý thức, không phải ngây thơ.`,
    sections: [
      {
        heading: "Hiện tại là đủ",
        content: `ESFP không hoạch định nhiều — không phải vì thiếu khả năng, mà vì họ tin rằng khoảnh khắc hiện tại xứng đáng được sống đầy đủ hơn là được dùng để lo lắng về tương lai. Điều này tạo ra sự tự do và niềm vui thật — nhưng đôi khi cũng tạo ra những vấn đề mà người khác nghĩ đáng lý họ phải thấy trước.`,
      },
      {
        heading: "Sâu hơn vẻ ngoài",
        content: `ESFP bị đánh giá thấp về chiều sâu vì sự vui vẻ của họ. Nhưng dưới lớp năng lượng đó là người quan tâm sâu sắc đến con người, nhạy cảm với cảm xúc của người khác, và thường cảm thấy nhiều hơn những gì họ cho thấy. Họ không chia sẻ nỗi buồn dễ dàng — không phải vì không có, mà vì không muốn là gánh nặng.`,
      },
      {
        heading: "Trong các mối quan hệ",
        content: `Yêu một ESFP là được sống với người làm cho cuộc sống thường ngày trở nên đáng nhớ. Điều họ cần là người không cố biến họ thành "nghiêm túc hơn" hay "thực tế hơn" — mà chấp nhận rằng cách họ đang là đã là đủ rồi.`,
      },
    ],
    coreContradiction: `Mang lại niềm vui cho mọi người — nhưng thường một mình xử lý những khoảnh khắc không vui. Sự vui vẻ của họ đôi khi là lớp giáp, không phải bản chất thật.`,
    inOneSentence: `Người làm cho đám tang cũng có khoảnh khắc cười — và không ai phàn nàn điều đó.`,
  },
}
