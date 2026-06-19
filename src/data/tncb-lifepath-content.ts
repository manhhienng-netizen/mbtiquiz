/**
 * TNCB NUMEROLOGY — LIFE PATH CONTENT
 * Distilled từ raw data để hiển thị trong app
 * Cập nhật: 22/05/2026 17:30
 *
 * Tone: ngôi thứ 2, như người bạn thân nói thật
 * Shape: LifePathContent interface
 */

export interface LifePathContent {
  hookLine: string       // 1 câu gây tò mò, ngôi thứ 2, không cliché
  deepDesc: string       // 3-4 câu "wow đúng thật" — cốt lõi nhân cách
  inLife: string         // 2-3 câu biểu hiện trong cuộc sống thực hàng ngày
  giftAndBurden: string  // 2 câu: món quà + gánh nặng thật sự
}

export const LIFE_PATH_CONTENT: Record<number, LifePathContent> = {

  1: {
    hookLine: "Bạn không cần ai cho phép — và đây vừa là sức mạnh, vừa là gánh nặng lớn nhất của bạn.",
    deepDesc: "Bạn mở đường, không đi theo vết. Khi cả phòng đang chờ ai đó quyết định, bạn đã biết câu trả lời từ trước — vấn đề là bạn có nói ra không. Sự độc lập của bạn không phải tính cách, đó là cấu trúc nội tâm: bạn cảm thấy sống thật khi được tự dẫn dắt. Nhưng cái mà người khác gọi là ego, thực ra là lớp giáp che đi một nỗi sợ rất thật: sợ bị nhìn thấy là cần người khác.",
    inLife: "Bạn thường là người đề xuất đầu tiên trong cuộc họp, người cuối cùng bỏ cuộc khi dự án lung lay, và người khó chịu nhất khi bị yêu cầu chờ đợi quyết định của người khác. Bạn cũng là người hay làm một mình không phải vì không có ai — mà vì giải thích còn lâu hơn tự làm.",
    giftAndBurden: "Món quà: bạn có thể bắt đầu từ không và thật sự đi đến đích — không phải ai cũng có điều này. Gánh nặng: tiêu chuẩn bạn đặt ra cho bản thân cao đến mức thất bại với chính mình là loại cô đơn nặng nhất.",
  },

  2: {
    hookLine: "Bạn cảm nhận được sự căng thẳng trong phòng trước khi nó bùng phát — và thường là người duy nhất làm gì đó với nó.",
    deepDesc: "Bạn không lãnh đạo bằng tiếng ồn — bạn lãnh đạo bằng sự kết nối. Người ta không biết tại sao họ cảm thấy được lắng nghe khi ở cạnh bạn, nhưng họ biết rằng mình cảm thấy như vậy. Cái giá bạn trả là bạn thường thấy mọi góc độ của một vấn đề đến mức không biết chọn phía nào — và trong khi đang giữ hòa bình cho người khác, bên trong bạn đang tích lũy những thứ chưa được nói.",
    inLife: "Bạn thường là người nhận tin nhắn lúc 2 giờ sáng từ bạn bè — và bạn trả lời. Bạn cũng là người nói 'có' trước khi kịp nghĩ xem mình có muốn không. Và đôi khi bạn ngồi một mình sau một ngày giúp đỡ mọi người, tự hỏi tại sao mình cảm thấy trống.",
    giftAndBurden: "Món quà: bạn tạo ra sự hài hòa theo cách mà người khác không nhận ra là kỹ năng — nhưng đó là kỹ năng hiếm nhất trong bất kỳ nhóm nào. Gánh nặng: bạn biết cách làm cho người khác cảm thấy được lắng nghe, nhưng chính bạn thì hiếm khi cảm thấy điều đó.",
  },

  3: {
    hookLine: "Bạn là người mà mọi người đều yêu trong tiệc — nhưng không ai thực sự biết bạn ở đó đang cảm thấy gì.",
    deepDesc: "Bạn có khả năng biến không khí nặng nề thành nhẹ nhàng chỉ bằng cách xuất hiện. Ý tưởng đến với bạn không phải như công việc mà như hơi thở — tự nhiên, liên tục, đôi khi nhiều đến mức bạn không biết bắt đầu từ đâu. Nhưng đây là thứ ít ai biết: phía sau nụ cười đó thường là người đang tránh né một cảm xúc nào đó bằng cách tạo ra vui vẻ. Sự vui vẻ của bạn đôi khi là lớp giáp, không phải trạng thái thật.",
    inLife: "Bạn bắt đầu nhiều thứ hơn số thứ bạn hoàn thành — và bạn biết điều đó, dù không hay nói ra. Bạn cũng là người mà khi ai đó khen bạn giỏi, bạn cảm thấy tốt trong vài giây rồi lại nghi ngờ. Sự xác nhận từ bên ngoài quan trọng hơn bạn muốn thừa nhận.",
    giftAndBurden: "Món quà: bạn làm cho cuộc sống của người xung quanh đẹp hơn, vui hơn, có màu sắc hơn — đây không phải điều nhỏ. Gánh nặng: bạn giỏi giúp người khác tìm tiếng nói, nhưng tiếng nói thật của chính bạn — tiếng nói của nỗi đau, nỗi sợ — thường bị chôn vùi dưới lớp biểu diễn.",
  },

  4: {
    hookLine: "Bạn là người làm cho mọi thứ thật sự hoạt động — và thường là người ít được cảm ơn nhất vì điều đó.",
    deepDesc: "Khi ai đó hỏi ai đã biến ý tưởng thành thực tế có thể đứng vững, câu trả lời thường là bạn. Bạn không ồn ào, không hào nhoáng — nhưng hãy lấy bạn ra khỏi bất kỳ dự án nào và xem cấu trúc sụp đổ ra sao. Sự cứng nhắc mà người ta đôi khi gán cho bạn thực ra không phải tính cách — đó là cơ chế phòng thủ trước một nỗi sợ rất cụ thể: sợ mọi thứ mất kiểm soát.",
    inLife: "Bạn là người lên danh sách trước khi đi siêu thị, người nhớ deadline của người khác tốt hơn của họ, và người cảm thấy bất an khi kế hoạch thay đổi đột xuất. Bạn cũng là người khi không làm việc thì không biết mình là ai — nghỉ ngơi với bạn thường cảm thấy như lãng phí hơn là hồi phục.",
    giftAndBurden: "Món quà: bạn xây được những thứ tồn tại — không phải ai cũng có kỷ luật và độ tin cậy để làm điều đó. Gánh nặng: bạn xây nền tảng cho người khác trong khi nền tảng cảm xúc của chính mình thường bị bỏ lơ — và bạn thường không nhận ra điều đó cho đến khi quá muộn.",
  },

  5: {
    hookLine: "Bạn không sợ cam kết — bạn sợ rằng chọn một thứ nghĩa là mất tất cả những thứ còn lại.",
    deepDesc: "Bạn sống rộng hơn hầu hết mọi người — nhiều thành phố, nhiều nghề, nhiều vòng tròn bạn bè. Không phải vì thiếu chiều sâu, mà vì tâm trí bạn liên tục nhìn thấy khả năng ở khắp nơi và không muốn bỏ lỡ bất kỳ thứ gì. Nhưng có một thứ bạn đang né tránh bằng cách luôn di chuyển: cảm giác khó chịu khi phải ở lại với chính mình đủ lâu để thật sự cảm nhận.",
    inLife: "Bạn là người mà bạn bè gọi khi cần người tháp tùng đi đâu đó ngẫu hứng — và bạn sẵn sàng ngay lập tức. Bạn cũng là người có nhiều dự án dang dở hơn dự án hoàn thành, và thường giải thích điều đó bằng 'tôi đang tìm hướng mới'. Đôi khi đúng. Đôi khi không.",
    giftAndBurden: "Món quà: bạn thích nghi với mọi hoàn cảnh và tìm thấy lối ra khi người khác bị kẹt — đây là kỹ năng sống không thể dạy được. Gánh nặng: sự tìm kiếm tự do không ngừng của bạn có thể trở thành nhà tù của chính bạn — bạn không bao giờ đủ tự do vì 'đủ' đòi hỏi phải dừng lại và cảm nhận.",
  },

  6: {
    hookLine: "Bạn cho đi mà không nói — và sau đó ngạc nhiên khi người khác không biết bạn đang cần gì.",
    deepDesc: "Bạn là người mà mọi người muốn gần khi họ cần được chăm sóc — không phải vì bạn nói những điều đúng, mà vì bạn ở đó theo cách thật. Nhưng có một hợp đồng ẩn trong cách bạn yêu: bạn cho đi tất cả, kỳ vọng người khác sẽ tự hiểu và trân trọng mà không cần bạn nói ra. Khi điều đó không xảy ra — và thường là không xảy ra — bạn không nói, chỉ tích lũy.",
    inLife: "Bạn là người nhớ ngày sinh nhật, người nấu ăn khi ai đó ốm, người giải quyết xung đột trong nhóm mà không ai nhờ. Bạn cũng là người hay kiệt sức mà không biết tại sao — vì bạn đã quen không tính đến chính mình trong phương trình.",
    giftAndBurden: "Món quà: bạn tạo ra cảm giác được thuộc về cho người xung quanh — đây là thứ mà rất nhiều người đang tìm kiếm cả cuộc đời. Gánh nặng: bạn dạy người khác về tình yêu không điều kiện trong khi chính bạn đặt điều kiện ẩn lên mọi sự cho đi — và điều kiện đó là: 'hãy nhận ra mà không cần tôi phải nói'.",
  },

  7: {
    hookLine: "Bạn hiểu thế giới sâu hơn hầu hết mọi người — và đôi khi điều đó làm bạn cô đơn hơn hầu hết mọi người.",
    deepDesc: "Bộ não bạn không nghỉ. Không phải lo lắng — là tìm kiếm. Bạn nhìn thấy câu hỏi ở nơi người khác thấy câu trả lời, nhìn thấy mô hình ẩn ở nơi người khác thấy hỗn loạn. Nhưng có một chỗ bạn né tránh đào sâu vào: chính mình. Bạn dùng sự vượt trội trí tuệ như lá chắn chống lại sự thân mật — vì thân mật đòi hỏi phải để người khác nhìn thấy bạn, không chỉ nghe bạn nói.",
    inLife: "Bạn là người tra Google lúc 1 giờ sáng về một chủ đề không liên quan đến bất cứ thứ gì đang xảy ra trong cuộc sống — chỉ vì tò mò. Bạn cũng là người trong nhóm bạn mà mọi người hỏi để hiểu sâu hơn, nhưng hiếm khi ai hỏi bạn 'dạo này bạn thế nào' — và bạn cũng ít khi nói.",
    giftAndBurden: "Món quà: bạn đi đến chiều sâu của bất cứ thứ gì bạn chạm vào — đây là điều tạo ra những tư tưởng, phát hiện và tác phẩm có giá trị thật. Gánh nặng: bạn tìm kiếm sự thật của vũ trụ trong khi né tránh sự thật về chính mình — và người đi tìm kiếm mà không bao giờ trở về vẫn là người lạc lối.",
  },

  8: {
    hookLine: "Bạn biết cách tạo ra quyền lực — nhưng câu hỏi là bạn có biết mình là ai khi không còn nó không.",
    deepDesc: "Bạn bước vào một căn phòng và ngay lập tức đọc được ai đang nắm quyền, cơ hội nằm đâu, và cần định vị mình thế nào. Không phải thao túng — đó là bản năng. Nhưng có một thứ bạn nhầm lẫn từ rất lâu: bạn không phải là những gì bạn thành tích. Khi thất bại xảy ra — và với số 8, karma đảm bảo nó sẽ xảy ra — bạn không mất tiền, bạn mất bản sắc. Đây là nỗi đau thật sự của số 8.",
    inLife: "Bạn là người mà người ta gọi khi cần quyết định lớn — và bạn thích điều đó. Bạn cũng là người khó buông kiểm soát, ngay cả khi biết rõ mình đang kiểm soát quá mức. Đôi khi bạn giành chiến thắng nhưng mất người — và bạn không chắc mình có thể đổi chiều đó không.",
    giftAndBurden: "Món quà: bạn có thể xây dựng những thứ lớn và thật — không phải ai cũng có kỷ luật và tầm nhìn để làm điều đó. Gánh nặng: bạn có thể xây cả một đế chế rồi phát hiện ra đó là nhà tù — có mọi thứ ngoại trừ khả năng tận hưởng chúng.",
  },

  9: {
    hookLine: "Bạn yêu nhân loại sâu sắc — nhưng đôi khi dễ hơn để yêu nhân loại hơn là yêu người đang đứng trước mặt bạn.",
    deepDesc: "Bạn nhìn thế giới không như nó đang là mà như nó có thể trở thành — và điều đó làm bạn không thể thờ ơ trước sự bất công. Nhưng có một shadow mà số 9 hay mang: dùng ngôn ngữ của tình yêu vũ trụ để trốn tránh sự thân mật cụ thể, bừa bộn trong các mối quan hệ thực sự. Và đôi khi, sự hy sinh của bạn kèm theo một kỳ vọng ẩn — được nhận ra là đã hy sinh.",
    inLife: "Bạn là người cảm thấy cần làm gì đó khi đọc tin tức về bất công — không phải biểu diễn, là thật. Bạn cũng là người đôi khi giữ khoảng cách với người thân mà không giải thích được tại sao, trong khi lại dễ dàng cởi mở với người lạ. Và bạn đang ôm giữ một số thứ — mối quan hệ, bản sắc, ký ức — đã lâu hơn mức cần thiết.",
    giftAndBurden: "Món quà: bạn nhìn thấy bức tranh lớn mà người khác không thể — và bạn quan tâm đến nó đủ để làm gì đó. Gánh nặng: bạn mang trí tuệ của cả một quá trình dài — nhưng bài học cuối cùng lại là bài học cơ bản nhất: học cách bao gồm chính mình trong lòng trắc ẩn mà bạn dành cho người khác.",
  },

  11: {
    hookLine: "Bạn biết điều gì đó trước khi có bằng chứng — và đây là món quà khiến bạn vừa thấy rõ nhất, vừa nghi ngờ bản thân nhất.",
    deepDesc: "Trực giác của bạn không phải cảm giác mơ hồ — nó là thông tin thật, chỉ đến theo cách khác. Bạn cảm nhận được thứ ẩn dưới bề mặt: nỗi đau người khác chưa nói ra, điểm mạnh chưa được khai thác, mâu thuẫn chưa được giải quyết. Nhưng khoảng cách giữa những gì bạn 'thấy' và những gì bạn có thể thực sự làm được — đó là nguồn gốc của lo âu mãn tính mà nhiều người mang số 11 sống cùng mỗi ngày.",
    inLife: "Bạn là người mà người ta hay nói 'em cảm thấy anh/chị hiểu em hơn em hiểu em' — và bạn không chắc mình làm gì để tạo ra điều đó. Bạn cũng là người dễ bị quá tải bởi môi trường ồn ào, đám đông, hoặc cảm xúc tiêu cực của người khác — và sau đó cần nhiều thời gian hơn người bình thường để phục hồi.",
    giftAndBurden: "Món quà: bạn truyền cảm hứng mà không cần cố gắng — sự hiện diện của bạn làm người khác muốn trở nên thật hơn với chính họ. Gánh nặng: bạn sợ ánh sáng của chính mình — bạn biết mình khác biệt từ nhỏ, và điều đó thường có nghĩa là bị hiểu lầm trước khi được hiểu.",
  },

  22: {
    hookLine: "Bạn nhìn thấy những thứ có thể được xây dựng ở quy mô mà người khác không dám nghĩ đến — và điều đó đôi khi làm bạn tê liệt.",
    deepDesc: "Bạn không chỉ có ý tưởng — bạn có bản thiết kế. Không phải bản thiết kế cho một dự án nhỏ, mà cho những thứ có thể thay đổi nhiều người trong nhiều năm. Đây là năng lực thật, không phải ảo tưởng. Nhưng cũng chính vì tầm nhìn quá lớn, bạn đôi khi bị kẹt giữa 'điều mình thấy có thể' và 'điều mình thật sự dám làm'. Khoảng cách đó là nơi lo âu của số 22 sinh sống.",
    inLife: "Bạn là người mà khi tham gia một dự án, tự nhiên bắt đầu nhìn thấy cách nó có thể lớn hơn — và đôi khi điều đó làm người khác hứng thú, đôi khi làm họ choáng ngợp. Bạn cũng là người cảm thấy tội lỗi khi không làm gì 'đủ lớn' — như thể nghỉ ngơi hay làm điều nhỏ là phung phí điểm mạnh của mình.",
    giftAndBurden: "Món quà: bạn có thể biến tầm nhìn thành thực tế ở quy mô mà hầu hết người chỉ dám mơ — đây là sự kết hợp hiếm giữa khả năng nhìn xa và kỷ luật thực thi. Gánh nặng: bạn thường đặt 'đại dự án' lên trên bản thân mình — và quên rằng giá trị của bạn không đến từ những gì bạn xây dựng mà từ bạn là ai.",
  },

  33: {
    hookLine: "Bạn cho đi từ nơi sâu nhất — nhưng câu hỏi là bạn có đang cho đi từ sự sung mãn, hay từ nỗi sợ bị bỏ lại nếu không cho?",
    deepDesc: "Bạn dạy không phải bằng lời mà bằng cách sống — và điều đó có sức mạnh mà bạn thường không nhận ra. Người ở gần bạn cảm thấy muốn trở nên tốt hơn, không phải vì bạn bảo họ nên — mà vì bạn hiện diện theo cách khiến điều đó trở nên tự nhiên. Nhưng shadow của số 33 không phải là ích kỷ — đó là sự hy sinh đến cạn kiệt, rồi dùng sự cạn kiệt đó như bằng chứng của sự thánh thiện.",
    inLife: "Bạn là người mà khi ai đó trong nhóm đang đau, bạn cảm nhận được trước khi họ nói — và bạn hành động. Bạn cũng là người sau một thời gian dài cho đi, đôi khi đột ngột rút lui hoàn toàn — không phải vì bạn ngừng quan tâm, mà vì bạn đã không còn gì để cho. Và bạn thường xấu hổ về điều đó thay vì nhận ra đây là dấu hiệu cần được nạp lại.",
    giftAndBurden: "Món quà: sự hiện diện của bạn chữa lành — đây không phải ẩn dụ, đây là điều thật mà người xung quanh bạn cảm nhận được. Gánh nặng: bạn được thiết kế để dạy tình yêu vô điều kiện — nhưng bạn thường là người cuối cùng nhận được tình yêu đó từ chính mình.",
  },

}
