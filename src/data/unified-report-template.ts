// File: unified-report-template.ts
// 16 MBTI × 6-section narrative cho Unified Report (Life Path + ngũ hành + nhật chủ)
// Viết bởi content agent · 13/06/2026 · từ prompt PA PM
// PA PM review guardrail trước khi Cursor wire
//
// LƯU Ý SLOT: phần cố định để slot dynamic dạng [lp_keyword] [element] [element_trait] [nhatchu_trait].
// Nickname type được viết inline (type-specific, cố định) — khớp ví dụ mẫu INTJ trong prompt.

export interface UnifiedReportTemplate {
  opening: string
  thinking: string
  energy: string
  relationships: string
  strengthsAndGrowth: string
  closing: string
}

const CLOSING = `Không có type nào tốt hơn type nào — chỉ có hiểu mình rõ hơn.`

export const UNIFIED_REPORT_TEMPLATES: Record<string, UnifiedReportTemplate> = {
  // ─────────────────────────────────────────────
  INTJ: {
    opening: `Bạn là Kiến trúc sư — người xây xong cả công trình trong đầu trước khi ai khác còn đang tìm bút vẽ sơ đồ. Con đường đời [lp_keyword] của bạn thêm vào đó chiều sâu: bạn không chỉ xây cho bản thân, bạn muốn những gì mình tạo ra còn đứng vững sau khi bạn không còn ở đó nữa.`,
    thinking: `Bạn xử lý thế giới bằng cách tìm pattern ẩn — thấy kết nối mà người khác bỏ qua, nhận ra điều gì sắp xảy ra trước khi nó xảy ra. Quyết định của bạn nhìn có vẻ lạnh lùng, nhưng thực ra đã được kiểm tra kỹ trong đầu rồi — bạn chỉ không nói ra quá trình đó.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại năng lượng trong không gian yên tĩnh — không phải vì ngại người, mà vì tiếng ồn xã hội làm nhiễu những suy nghĩ bạn đang dựng. Một mình với bạn không phải cô đơn, đó là lúc làm việc thật sự.`,
    relationships: `Bạn không bày tỏ tình cảm bằng lời, bạn bày tỏ bằng hành động: giải quyết vấn đề cho người kia, nhớ chi tiết quan trọng, làm sẵn điều gì đó trước khi họ kịp nhận ra mình cần. [nhatchu_trait] thêm vào đó: bạn chọn kết nối chậm nhưng bền, ít người nhưng sâu.`,
    strengthsAndGrowth: `Bạn có xu hướng nhìn xa và giữ tiêu chuẩn cao — hai thứ giúp bạn tạo ra những gì đáng giá. Bạn cũng có xu hướng kiên định đến mức khó bị lung lay, điều đó che chắn bạn khỏi nhiều sai lầm vội vàng. Vùng cần ý thức: bạn hay kỳ vọng người khác tự hiểu mà không cần giải thích, trong khi người ta thật sự cần nghe bạn nói ra.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  INTP: {
    opening: `Bạn là Nhà tư duy — người luôn hỏi "nhưng tại sao lại thế?" khi mọi người đã gật đầu cho qua. Con đường đời [lp_keyword] của bạn nói thêm một điều: bạn không tìm câu trả lời để dừng lại, bạn tìm để mở ra câu hỏi tiếp theo.`,
    thinking: `Bạn mổ xẻ mọi thứ thành các mảnh logic, rồi ráp lại theo cách của riêng mình — thường tìm ra lỗ hổng trong lập luận mà người khác chưa thấy. Bạn thoải mái với "chưa biết" hơn hầu hết mọi người, vì với bạn một lý thuyết chưa hoàn chỉnh thú vị hơn một kết luận vội vàng.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại bằng những khoảng lặng để đầu óc được lang thang tự do, không lịch trình, không ai chờ câu trả lời. Quá nhiều tương tác liên tục khiến bạn cạn nhanh, kể cả khi bạn quý người đối diện.`,
    relationships: `Bạn kết nối qua ý tưởng nhiều hơn qua cảm xúc bộc lộ — một cuộc trò chuyện sâu về điều cả hai cùng tò mò là cách bạn thể hiện sự gần gũi. [nhatchu_trait] thêm vào đó: bạn trung thành theo kiểu lặng lẽ, nhưng đôi khi quên nói ra điều người kia cần được nghe.`,
    strengthsAndGrowth: `Bạn có xu hướng tư duy độc lập và nhìn vấn đề từ góc không ai nghĩ tới — điều đó làm bạn khó bị dắt mũi. Bạn cũng có xu hướng công bằng và khách quan ngay cả khi bất lợi cho mình. Vùng cần ý thức: bạn hay phân tích mãi mà chần chừ hành động, và đôi khi xử lý cảm xúc của người khác như một bài toán cần giải thay vì điều cần được lắng nghe.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ENTJ: {
    opening: `Bạn là Nhà chỉ huy — người nhìn vào một mớ hỗn loạn và thấy ngay nó nên được sắp xếp ra sao. Con đường đời [lp_keyword] của bạn cộng thêm vào đó: bạn không chỉ muốn thắng, bạn muốn xây thứ gì đó đủ lớn để đáng với công sức mình bỏ ra.`,
    thinking: `Bạn nghĩ theo mục tiêu và lộ trình — thấy đích đến, rồi tự động dựng các bước đi tới đó. Bạn ra quyết định nhanh và dứt khoát, vì với bạn một quyết định ổn được thực thi hôm nay tốt hơn quyết định hoàn hảo mãi chưa ra.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại năng lượng khi va vào thử thách thật và những người dám tranh luận sòng phẳng với mình. Sự trì trệ làm bạn mệt nhanh hơn cả khối lượng công việc lớn.`,
    relationships: `Bạn thể hiện sự quan tâm bằng cách kéo người mình thương đi lên — đầu tư vào họ, thúc họ tiến bộ, mở đường cho họ. [nhatchu_trait] thêm vào đó: bạn bảo vệ người thân quyết liệt, dù đôi khi sự thẳng thắn của bạn bị hiểu nhầm là khắt khe.`,
    strengthsAndGrowth: `Bạn có xu hướng dẫn dắt tự nhiên và biến ý tưởng thành kết quả — người ta tin tưởng đi theo bạn vì bạn thật sự đưa con thuyền tới đích. Bạn cũng có xu hướng nhìn thẳng vấn đề thay vì né tránh. Vùng cần ý thức: trong lúc tập trung vào kết quả, bạn dễ lướt qua cảm xúc của người xung quanh, và đôi khi điều người ta cần không phải giải pháp mà là được lắng nghe.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ENTP: {
    opening: `Bạn là Người tranh luận — người có thể nhìn một ý tưởng từ năm góc khác nhau trước khi người ta kịp xong góc đầu tiên. Con đường đời [lp_keyword] của bạn thêm vào đó: trí tò mò của bạn không phải để gây rối, mà để tìm ra cách tốt hơn cái mọi người đang mặc định là đúng.`,
    thinking: `Bạn nghĩ bằng cách kết nối những thứ tưởng chừng không liên quan — và thường thấy khả năng ở nơi người khác chỉ thấy giới hạn. Bạn phản biện không phải để thắng, mà vì cọ xát ý tưởng là cách bạn kiểm tra xem nó có đứng vững không.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại bằng những cuộc trò chuyện bốc lửa và môi trường có cái gì đó mới để khám phá. Sự lặp lại và quy trình cứng nhắc rút cạn năng lượng của bạn nhanh nhất.`,
    relationships: `Bạn kéo người khác vào thế giới ý tưởng của mình — với bạn, được tranh luận vui vẻ và nghĩ chung là một dạng thân mật. [nhatchu_trait] thêm vào đó: bạn mang lại sự sống động cho mối quan hệ, nhưng cần học giữ lửa khi giai đoạn mới mẻ ban đầu lắng xuống.`,
    strengthsAndGrowth: `Bạn có xu hướng linh hoạt và nghĩ ra giải pháp ngay giữa lúc rối — ít ai nhanh trí trong thế bí như bạn. Bạn cũng có xu hướng cởi mở, ít định kiến với cái khác mình. Vùng cần ý thức: bạn dễ hứng khởi với cái mới rồi bỏ dở cái cũ chưa xong, và đôi khi tranh luận cho vui mà không nhận ra người kia đã thấy bị công kích.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  INFJ: {
    opening: `Bạn là Người cố vấn — người cảm được điều chưa nói ra trong một căn phòng trước khi ai mở lời. Con đường đời [lp_keyword] của bạn cộng thêm: bạn không sống cho riêng mình, bạn luôn mang theo một câu hỏi thầm lặng "điều này có ý nghĩa gì lớn hơn không?"`,
    thinking: `Bạn xử lý thế giới qua trực giác về con người — ghép những tín hiệu nhỏ thành một bức tranh về động cơ và chiều sâu của người khác, thường chính xác đến mức chính bạn cũng khó giải thích. Bạn nghĩ bằng ý nghĩa, không chỉ bằng dữ kiện.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại trong sự yên tĩnh và những kết nối sâu một-một. Đám đông và xã giao bề mặt khiến bạn cạn nhanh, vì bạn hấp thụ cảm xúc xung quanh nhiều hơn bạn nhận ra.`,
    relationships: `Bạn cho đi sâu và lắng nghe thật — người ta thường mở lòng với bạn những điều họ không kể với ai. [nhatchu_trait] thêm vào đó: bạn gắn bó chọn lọc, và một khi đã tin ai thì tin trọn vẹn, đôi khi đến mức quên giữ lại phần cho chính mình.`,
    strengthsAndGrowth: `Bạn có xu hướng thấu hiểu người khác và đứng vững trên giá trị của mình — đó là sự kết hợp hiếm và mạnh. Bạn cũng có xu hướng theo đuổi điều mình tin là đúng đến cùng. Vùng cần ý thức: bạn hay cho đi đến cạn rồi âm thầm kỳ vọng được đáp lại tương xứng, và dễ rút lui im lặng thay vì nói rõ khi tổn thương.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  INFP: {
    opening: `Bạn là Người hòa giải — người mang trong mình một thế giới nội tâm phong phú mà ít ai nhìn thấy hết. Con đường đời [lp_keyword] của bạn thêm vào: bạn đo mọi thứ bằng việc nó có thật với mình hay không, chứ không phải nó có hợp với số đông hay không.`,
    thinking: `Bạn xử lý mọi thứ qua bộ lọc giá trị nội tâm — trước một lựa chọn, câu hỏi đầu tiên của bạn không phải "cái nào hiệu quả" mà "cái nào đúng với con người mình". Bạn nhìn ra điều tốt đẹp tiềm ẩn trong người và việc mà người khác đã sớm bỏ qua.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại trong không gian riêng nơi bạn được là chính mình mà không phải gồng. Xung đột và môi trường giả tạo bào mòn bạn rất nhanh, kể cả khi bên ngoài bạn vẫn tỏ ra ổn.`,
    relationships: `Bạn yêu thương sâu và chân thành — khi đã quan tâm ai, bạn quan tâm bằng cả tấm lòng. [nhatchu_trait] thêm vào đó: bạn khao khát kết nối thật, ghét sự hời hợt, nhưng cũng dễ lý tưởng hóa người kia rồi hụt hẫng khi thực tế khác đi.`,
    strengthsAndGrowth: `Bạn có xu hướng đồng cảm và sống đúng với giá trị của mình ngay cả khi điều đó bất tiện — sự chân thật đó là thứ người khác quý ở bạn. Bạn cũng có xu hướng nhìn thấy điều tốt ở người khác. Vùng cần ý thức: bạn hay tránh xung đột đến mức nuốt cảm xúc vào trong, và dễ trì hoãn hành động khi nó chưa "đúng cảm hứng".`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ENFJ: {
    opening: `Bạn là Người chủ xướng — người tự nhiên nhìn ra điều tốt nhất trong người khác và biết cách gọi nó dậy. Con đường đời [lp_keyword] của bạn cộng thêm: bạn đo thành công của mình một phần bằng việc người quanh bạn có lớn lên hay không.`,
    thinking: `Bạn nghĩ qua lăng kính con người — đọc cảm xúc, nhu cầu và động lực của cả nhóm gần như theo phản xạ, rồi điều phối để mọi người cùng tiến. Bạn nhìn thấy bức tranh chung về nơi một tập thể có thể đi tới.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại khi được kết nối và tạo tác động thật lên người khác. Nhưng vì bạn hấp thụ cảm xúc của mọi người, bạn cũng cần khoảng lặng để không bị cuốn cạn mà không nhận ra.`,
    relationships: `Bạn cho đi nhiều và đầu tư hết mình vào người mình thương — bạn nhớ điều họ cần, nâng đỡ họ những lúc khó. [nhatchu_trait] thêm vào đó: bạn tạo cảm giác ấm áp và được thấu hiểu cho người bên cạnh, đôi khi đến mức quên hỏi xem chính mình đang cần gì.`,
    strengthsAndGrowth: `Bạn có xu hướng truyền cảm hứng và gắn kết người khác lại với nhau — ít ai khiến người quanh mình muốn trở nên tốt hơn như bạn. Bạn cũng có xu hướng tận tâm và đáng tin. Vùng cần ý thức: bạn hay đặt nhu cầu người khác trước mình đến mức kiệt sức, và đôi khi quá cần được người ta công nhận để thấy mình đủ tốt.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ENFP: {
    opening: `Bạn là Người truyền cảm hứng — người bước vào đâu là mang theo năng lượng và khả năng đến đó. Con đường đời [lp_keyword] của bạn thêm vào: bạn không chạy theo một con đường định sẵn, bạn đi theo nơi nào còn sống động và còn ý nghĩa với mình.`,
    thinking: `Bạn nghĩ bằng kết nối và khả năng — nhìn một con người hay một tình huống là thấy ngay nó có thể trở thành cái gì. Ý tưởng đến với bạn theo chùm, và bạn giỏi nhìn ra sợi dây liên kết giữa những thứ tưởng chừng rời rạc.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại qua con người, trải nghiệm mới và những cuộc trò chuyện chạm tới điều sâu. Sự đơn điệu và gò bó khiến bạn héo nhanh hơn bất cứ thứ gì.`,
    relationships: `Bạn mang sự nồng nhiệt và quan tâm chân thành vào quan hệ — bạn khiến người khác cảm thấy mình thú vị và được nhìn thấy. [nhatchu_trait] thêm vào đó: bạn gắn bó nhanh và sâu, nhưng cần học ở lại khi cảm giác phấn khích ban đầu lắng xuống và phần việc bền bỉ bắt đầu.`,
    strengthsAndGrowth: `Bạn có xu hướng nhiệt thành và khơi dậy điều tốt nhất ở người khác — sự ấm áp của bạn là thật và lan tỏa. Bạn cũng có xu hướng thích nghi nhanh và nhìn ra cơ hội. Vùng cần ý thức: bạn dễ bắt đầu nhiều thứ mà khó kết thúc, và đôi khi trốn những cảm xúc khó bằng cách lao vào điều mới mẻ tiếp theo.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ISTJ: {
    opening: `Bạn là Người trách nhiệm — người mà khi đã nhận việc thì người khác có thể yên tâm gác lại. Con đường đời [lp_keyword] của bạn cộng thêm: với bạn, giữ lời và làm tới nơi tới chốn không phải nghĩa vụ, đó là cách bạn thể hiện mình là ai.`,
    thinking: `Bạn xử lý thế giới bằng dữ kiện và kinh nghiệm thực tế — bạn tin vào cái đã được kiểm chứng hơn là lý thuyết nghe hay. Bạn để ý chi tiết người khác bỏ sót và dựng nên một trật tự đáng tin từ những mảnh rời rạc.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại trong sự yên tĩnh và những thói quen quen thuộc cho bạn cảm giác chủ động. Sự hỗn loạn và những thay đổi đột ngột không báo trước làm bạn căng thẳng nhiều hơn bạn để lộ.`,
    relationships: `Bạn thể hiện tình cảm bằng sự có mặt đều đặn và đáng tin — bạn xuất hiện đúng lúc, làm đúng điều đã hứa, không phô trương. [nhatchu_trait] thêm vào đó: bạn trung thành bền bỉ, dù đôi khi quên rằng người thân cũng cần nghe lời nói chứ không chỉ thấy hành động.`,
    strengthsAndGrowth: `Bạn có xu hướng đáng tin và kiên trì — người ta dựa vào bạn vì bạn không bỏ cuộc giữa chừng. Bạn cũng có xu hướng thực tế, ít bị cuốn theo thứ hào nhoáng. Vùng cần ý thức: bạn hay bám vào cách làm quen thuộc đến mức bỏ lỡ cách tốt hơn, và đôi khi khắt khe với người làm khác mình mà chưa kịp hiểu vì sao họ làm vậy.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ISFJ: {
    opening: `Bạn là Người nuôi dưỡng — người âm thầm để ý xem ai đang cần gì, rồi lặng lẽ làm điều đó trước khi được nhờ. Con đường đời [lp_keyword] của bạn thêm vào: bạn tìm thấy ý nghĩa trong việc chăm sóc và giữ gìn những thứ quan trọng cho người mình thương.`,
    thinking: `Bạn ghi nhớ chi tiết về con người một cách lạ thường — ai thích gì, ai từng nói gì, ai đang lặng lẽ chịu đựng. Bạn xử lý qua kinh nghiệm thực tế và sự tinh tế với nhu cầu người khác, thường thấy điều cần làm trước khi người ta kịp nói.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại trong không gian quen thuộc và ấm cúng, bên một vài người làm bạn thấy an toàn. Cho đi quá nhiều mà không có khoảng dừng khiến bạn cạn dần mà ít khi than.`,
    relationships: `Bạn yêu thương qua hành động chăm sóc cụ thể — bạn là chỗ dựa thầm lặng mà người khác chỉ thật sự nhận ra giá trị khi vắng bạn. [nhatchu_trait] thêm vào đó: bạn tận tụy và bền bỉ, nhưng dễ ngại nói ra mong muốn của mình vì sợ làm phiền.`,
    strengthsAndGrowth: `Bạn có xu hướng chu đáo và đáng tin cậy — sự quan tâm của bạn cụ thể và thật, không phải lời nói suông. Bạn cũng có xu hướng kiên nhẫn và bao dung. Vùng cần ý thức: bạn hay hy sinh nhu cầu của mình đến mức kiệt sức, và dễ giữ tổn thương trong lòng thay vì nói ra, để rồi nó âm ỉ.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ESTJ: {
    opening: `Bạn là Nhà điều hành — người biến mớ rối thành kế hoạch rõ ràng và đảm bảo nó được làm tới cùng. Con đường đời [lp_keyword] của bạn cộng thêm: bạn tin vào trật tự, trách nhiệm, và việc mỗi người làm đúng phần của mình.`,
    thinking: `Bạn nghĩ theo hệ thống và kết quả cụ thể — thấy việc cần làm, dựng quy trình, và thực thi dứt khoát. Bạn dựa vào điều đã được chứng minh hiệu quả hơn là phỏng đoán, và bạn ra quyết định nhanh khi đã có đủ dữ kiện.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại khi mọi thứ chạy trơn tru và bạn thấy tiến triển rõ ràng. Sự mơ hồ kéo dài và những lời hứa không ai chịu trách nhiệm làm bạn bực bội nhanh.`,
    relationships: `Bạn thể hiện sự quan tâm bằng cách lo liệu chu toàn cho người thân — bạn gánh trách nhiệm, giữ mọi thứ ổn định để người mình thương không phải lo. [nhatchu_trait] thêm vào đó: bạn bảo vệ gia đình vững vàng, dù đôi khi sự thẳng thắn bị hiểu là cứng nhắc.`,
    strengthsAndGrowth: `Bạn có xu hướng tổ chức tốt và đưa mọi việc về đích — người ta tin tưởng giao bạn những thứ quan trọng. Bạn cũng có xu hướng dám đứng ra chịu trách nhiệm. Vùng cần ý thức: bạn hay áp tiêu chuẩn của mình lên người khác mà chưa hỏi hoàn cảnh họ, và đôi khi lướt qua cảm xúc vì quá tập trung vào việc cần xong.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ESFJ: {
    opening: `Bạn là Người quan tâm — người giữ cho cả nhóm gắn kết và để ý xem có ai bị bỏ lại phía sau không. Con đường đời [lp_keyword] của bạn thêm vào: bạn tìm thấy ý nghĩa trong việc tạo ra sự hòa hợp và chăm lo cho những người thuộc về mình.`,
    thinking: `Bạn xử lý thế giới qua con người và những nhu cầu thực tế của họ — bạn đọc được không khí một tập thể và biết cần làm gì để mọi người cảm thấy thoải mái. Bạn nhớ chi tiết và dựa vào điều đã từng hiệu quả với người thật, việc thật.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại qua kết nối, qua cảm giác mình giúp được ai đó và được ở giữa những người quan trọng với mình. Sự lạnh nhạt và mâu thuẫn chưa giải quyết làm bạn bất an.`,
    relationships: `Bạn yêu thương rất cụ thể — bạn nhớ ngày quan trọng, để ý người kia ăn uống đủ chưa, có mặt khi cần. [nhatchu_trait] thêm vào đó: bạn tận tâm và ấm áp, nhưng đôi khi cần được trấn an rằng mình vẫn được yêu, được cần.`,
    strengthsAndGrowth: `Bạn có xu hướng chu đáo và gắn kết mọi người — sự ấm áp của bạn khiến người khác thấy được quan tâm thật. Bạn cũng có xu hướng đáng tin và tận tụy. Vùng cần ý thức: bạn hay đặt sự hài hòa lên trên cả nhu cầu của mình, và dễ phụ thuộc vào sự công nhận của người khác để thấy mình ổn.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ISTP: {
    opening: `Bạn là Nghệ nhân — người ít nói nhưng tay làm được mọi thứ, hiểu cơ chế vận hành của sự vật bằng bản năng. Con đường đời [lp_keyword] của bạn cộng thêm: bạn tin vào cái mình tự tay kiểm chứng hơn là điều người ta bảo bạn phải tin.`,
    thinking: `Bạn nghĩ bằng cách tháo rời và xem mọi thứ hoạt động ra sao — bạn giỏi nhất khi có vấn đề thực tế trước mặt để giải. Bạn giữ cái đầu lạnh giữa khủng hoảng, xử lý điều đang xảy ra ngay lúc này thay vì lo lắng những gì có thể.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại trong không gian và sự tự do làm theo cách của mình, không bị ai giám sát từng bước. Những ràng buộc xã giao và đòi hỏi cảm xúc liên tục làm bạn ngộp.`,
    relationships: `Bạn thể hiện tình cảm bằng việc giúp đỡ thiết thực và sự có mặt thoải mái — bạn ít nói lời hoa mỹ nhưng sẽ xuất hiện khi người ta thật sự cần. [nhatchu_trait] thêm vào đó: bạn cần khoảng riêng trong quan hệ, và sự tôn trọng không gian đó với bạn là một dạng tin tưởng.`,
    strengthsAndGrowth: `Bạn có xu hướng bình tĩnh và thực tế — khi mọi người rối, bạn là người bắt tay vào sửa. Bạn cũng có xu hướng độc lập và xoay xở giỏi. Vùng cần ý thức: bạn hay rút lui khi cảm xúc trở nên phức tạp, và đôi khi người thân cần bạn nói ra điều mình nghĩ, không chỉ lặng lẽ làm.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ISFP: {
    opening: `Bạn là Nghệ sĩ — người cảm nhận thế giới qua vẻ đẹp, cảm giác và sự chân thật, hơn là qua lý lẽ. Con đường đời [lp_keyword] của bạn thêm vào: bạn sống theo điều mình cảm thấy đúng trong khoảnh khắc, và bạn quý sự tự do được là chính mình.`,
    thinking: `Bạn xử lý thế giới qua trải nghiệm trực tiếp và giá trị bên trong — bạn ít nói về niềm tin của mình nhưng sống rất kiên định theo nó. Bạn nhạy với chi tiết, với không khí, với những gì đẹp và thật mà người khác lướt qua.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng nội, bạn nạp lại trong không gian yên và những hoạt động cho phép bạn được hiện diện trọn vẹn với hiện tại. Áp lực phải tuân theo khuôn mẫu của người khác làm bạn ngột ngạt.`,
    relationships: `Bạn yêu thương lặng lẽ mà sâu — bạn thể hiện bằng những cử chỉ nhỏ tinh tế và sự hiện diện ấm áp hơn là lời tuyên bố. [nhatchu_trait] thêm vào đó: bạn gắn bó chân thành, nhưng dễ giữ cảm xúc trong lòng thay vì nói ra khi có gì không ổn.`,
    strengthsAndGrowth: `Bạn có xu hướng chân thật và sống đúng với mình — bạn không giả tạo, và người ta cảm được điều đó. Bạn cũng có xu hướng nhạy cảm với cái đẹp và với người khác. Vùng cần ý thức: bạn hay tránh xung đột bằng cách im lặng rút lui, và dễ trì hoãn những việc cần kế hoạch dài hơi vì chúng kéo bạn khỏi hiện tại.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ESTP: {
    opening: `Bạn là Người thực thi — người hành động trong khi người khác còn đang họp bàn. Con đường đời [lp_keyword] của bạn cộng thêm: bạn học bằng cách lao vào làm, và bạn sống động nhất khi có thử thách thật trước mặt.`,
    thinking: `Bạn nghĩ nhanh và nhạy với thực tế đang diễn ra — bạn đọc tình huống ngay lập tức và biết cần làm gì lúc này. Bạn giải quyết vấn đề bằng hành động cụ thể, ít lý thuyết, và xoay chuyển linh hoạt khi tình thế thay đổi.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại qua hành động, qua con người và những trải nghiệm có nhịp độ. Sự chờ đợi, họp hành lê thê và lý thuyết suông làm bạn bồn chồn nhanh nhất.`,
    relationships: `Bạn thể hiện tình cảm bằng sự sống động và những trải nghiệm cùng nhau — bạn khiến người bên cạnh thấy cuộc sống vui và thật hơn. [nhatchu_trait] thêm vào đó: bạn nồng nhiệt và hào phóng, nhưng cần học ngồi lại với những cuộc trò chuyện sâu mà bạn dễ né.`,
    strengthsAndGrowth: `Bạn có xu hướng quyết đoán và bình tĩnh dưới áp lực — khi cần ai đó ra tay ngay, đó là bạn. Bạn cũng có xu hướng thực tế và thích nghi giỏi. Vùng cần ý thức: bạn hay hành động trước khi cân nhắc hệ quả dài hạn, và đôi khi né những cảm xúc khó bằng cách lao vào việc tiếp theo.`,
    closing: CLOSING,
  },

  // ─────────────────────────────────────────────
  ESFP: {
    opening: `Bạn là Người trình diễn — người mang niềm vui và sự ấm áp vào bất cứ đâu mình đến. Con đường đời [lp_keyword] của bạn thêm vào: bạn sống trọn trong hiện tại và có khả năng làm cho người quanh mình cảm thấy được sống động hơn.`,
    thinking: `Bạn xử lý thế giới qua trải nghiệm trực tiếp và cảm nhận về con người — bạn nắm bắt không khí, đọc cảm xúc người khác nhanh và biết cách làm họ thoải mái. Bạn học và quyết bằng cách bắt tay vào thực tế, không qua lý thuyết khô khan.`,
    energy: `Hành [element] cho bạn [element_trait]. Là người hướng ngoại, bạn nạp lại qua con người, niềm vui chung và những khoảnh khắc đáng nhớ. Sự cô lập kéo dài và bầu không khí nặng nề rút cạn năng lượng của bạn nhanh.`,
    relationships: `Bạn yêu thương nồng nhiệt và hết mình — bạn hào phóng với sự quan tâm, với thời gian, với niềm vui bạn mang lại cho người mình thương. [nhatchu_trait] thêm vào đó: bạn sống tình cảm và chân thành, nhưng đôi khi cần học đối diện những phần khó của quan hệ thay vì lướt qua cho nhẹ.`,
    strengthsAndGrowth: `Bạn có xu hướng ấm áp và mang năng lượng tích cực cho người khác — sự hiện diện của bạn làm không gian sáng lên. Bạn cũng có xu hướng linh hoạt và sống thật với cảm xúc. Vùng cần ý thức: bạn hay tránh những điều khó chịu bằng cách hướng về niềm vui trước mắt, và đôi khi lơ là kế hoạch dài hạn cho đến khi nó thành chuyện gấp.`,
    closing: CLOSING,
  },
}

export function buildUnifiedReport(persona: {
  mbtiType: string
  lifePath: number
  element: string
  nhatChu: string
  typeNickname: string
  lpKeyword: string
  elementTrait: string
  nhatChuTrait: string
}): UnifiedReportTemplate | null {
  const template = UNIFIED_REPORT_TEMPLATES[persona.mbtiType]
  if (!template) return null

  // Replace slots
  const fill = (text: string) =>
    text
      .replace(/\[lp_keyword\]/g, persona.lpKeyword)
      .replace(/\[element\]/g, persona.element)
      .replace(/\[element_trait\]/g, persona.elementTrait)
      .replace(/\[nhatchu_trait\]/g, persona.nhatChuTrait)
      .replace(/\[type_nickname\]/g, persona.typeNickname)

  return {
    opening: fill(template.opening),
    thinking: template.thinking,
    energy: fill(template.energy),
    relationships: fill(template.relationships),
    strengthsAndGrowth: template.strengthsAndGrowth,
    closing: template.closing,
  }
}
