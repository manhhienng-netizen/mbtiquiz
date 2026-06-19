/**
 * TNCB — Relationship Diagnostic (Layer D)
 * 8 situations × 16 types = 128 cards (R1–R8)
 */

export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export type SituationKey =
  | 'conflict' | 'intimacy' | 'attachment'
  | 'repair' | 'appreciation' | 'alone'
  | 'growth' | 'dealbreaker'

export const SITUATION_LABELS: Record<SituationKey, string> = {
  conflict: 'Khi có xung đột',
  intimacy: 'Nhịp gần gũi',
  attachment: 'Dấu hiệu gắn kết',
  repair: 'Hàn gắn',
  appreciation: 'Nhận & cho tình cảm',
  alone: 'Không gian riêng',
  growth: 'Kỳ vọng phát triển',
  dealbreaker: 'Giới hạn của bạn',
}

export interface RelationshipCard {
  type: MBTIType
  situation: SituationKey
  signal: string
  insight: string
  selfAsk: string
  watchFor: string
}

const CONFLICT_CARDS: RelationshipCard[] = [

  // ─── NT GROUP (Analysts) ────────────────────────────────

  {
    type: 'INTJ',
    situation: 'conflict',
    signal: 'Với INTJ, xung đột thường kích hoạt chế độ phân tích — bạn rút vào bên trong để sắp xếp logic và tìm nguyên nhân gốc rễ trước khi sẵn sàng nói chuyện.',
    insight: 'INTJ cần hiểu "tại sao" xung đột xảy ra trước khi có thể xử lý bất kỳ điều gì khác. Im lặng không phải vô cảm — đó là cách INTJ process. Nhưng partner không nhìn thấy quá trình đó, nên dễ đọc nhầm thành thờ ơ hoặc trừng phạt.',
    selfAsk: 'Khi bạn im lặng sau xung đột, bạn đang thật sự xử lý — hay đang tránh một cuộc trò chuyện khó?',
    watchFor: 'Khi bạn đã "resolve" xong trong đầu nhưng chưa nói ra, partner vẫn đang ở giữa xung đột và không biết bạn đã ổn.',
  },

  {
    type: 'INTP',
    situation: 'conflict',
    signal: 'Với INTP, xung đột dễ chuyển thành debate — bạn tập trung vào việc phân tích ai đúng về mặt logic hơn là xử lý cảm xúc đang có trong phòng.',
    insight: 'INTP xử lý cảm xúc qua ngôn ngữ lý trí — điều này không có nghĩa là họ không quan tâm, mà là cách họ tiếp cận vấn đề. Khi bị đẩy vào góc cảm xúc mà họ chưa sẵn sàng, INTP thường thoát bằng cách intellectualize — phân tích tình huống thay vì ở lại với cảm giác. Partner muốn được nghe và thấu hiểu, không phải được phân tích.',
    selfAsk: 'Trong xung đột gần nhất, bạn đang thật sự cố gắng hiểu cảm xúc của đối phương — hay đang cố chứng minh rằng mình đúng?',
    watchFor: 'Khi bạn nói "về mặt logic thì..." trong lúc đối phương đang khóc hoặc tức giận, đó là tín hiệu debate-mode đã lấn át empathy-mode.',
  },

  {
    type: 'ENTJ',
    situation: 'conflict',
    signal: 'Với ENTJ, xung đột là vấn đề cần giải quyết ngay — bạn muốn đặt mọi thứ ra bàn, tìm giải pháp, và đóng lại câu chuyện trong một lần.',
    insight: 'ENTJ có năng lượng cao và khả năng direct communication rất mạnh — trong xung đột, điều này thể hiện ra là nói thẳng, muốn accountability rõ ràng, và không thoải mái với sự mơ hồ kéo dài. Tốc độ resolve của ENTJ có thể nhanh hơn nhiều so với tốc độ đối phương cần để thật sự cảm thấy được nghe.',
    selfAsk: 'Khi xung đột "xong" theo góc nhìn của bạn, bạn có biết chắc đối phương cũng cảm thấy như vậy không?',
    watchFor: 'Khi bạn đã đề xuất giải pháp và đối phương vẫn chưa phản hồi tích cực — có thể họ chưa được nghe, không phải họ không đồng ý với giải pháp.',
  },

  {
    type: 'ENTP',
    situation: 'conflict',
    signal: 'Với ENTP, xung đột thường mở ra như một cuộc thảo luận — bạn argue để tư duy, khám phá góc nhìn, không nhất thiết để thắng, nhưng partner không phải lúc nào cũng biết điều đó.',
    insight: 'ENTP thấy bất đồng là điều bình thường — dữ liệu từ 16personalities cho thấy 87% ENTP coi conflict là phần tự nhiên của mối quan hệ, cao nhất trong 16 types. Nhưng năng lượng tranh luận của ENTP có thể cảm giác như tấn công với người có style khác, đặc biệt là F types. Ranh giới giữa "khám phá ý tưởng" và "khiến đối phương cảm thấy bị tấn công" thường mỏng hơn ENTP nhận ra.',
    selfAsk: 'Trong xung đột vừa rồi, bạn đang tranh luận vì thực sự muốn tìm ra điều đúng — hay vì cảm giác phải "win" cuộc đối thoại đó?',
    watchFor: 'Khi đối phương im lặng đột ngột giữa chừng — thường không phải họ đồng ý, mà là họ đã mệt hoặc cảm thấy bị áp đảo.',
  },

  // ─── NF GROUP (Diplomats) ────────────────────────────────

  {
    type: 'INFJ',
    situation: 'conflict',
    signal: 'Với INFJ, xung đột kích hoạt khả năng absorb cảm xúc — bạn cảm nhận được cả cảm xúc của mình lẫn của đối phương cùng lúc, và cần thời gian một mình để tách chúng ra.',
    insight: 'INFJ có khả năng empathy sâu nhưng đây cũng là nguồn gốc của sự kiệt sức trong xung đột — họ đang xử lý cảm xúc của hai người cùng một lúc. Silence sau xung đột của INFJ không phải stonewalling có chủ đích, mà là họ đang overwhelmed và cần không gian để tách cảm xúc bản thân ra khỏi cảm xúc của đối phương. Kéo dài quá lâu thì silence có thể trở thành khoảng cách thật.',
    selfAsk: 'Sau xung đột, khi bạn cần im lặng một mình, bạn có cho đối phương biết "tôi cần thời gian, không phải tôi đang phạt bạn" không?',
    watchFor: 'Khi silence của bạn kéo dài hơn vài giờ mà không có bất kỳ tín hiệu nào — đối phương đang ở trong trạng thái lo lắng, không phải ổn.',
  },

  {
    type: 'INFP',
    situation: 'conflict',
    signal: 'Với INFP, xung đột thường không chỉ là bất đồng về sự kiện — nó chạm vào giá trị, và phản ứng của bạn có thể mạnh hơn nhiều so với vẻ bề ngoài bình thường gợi ý.',
    insight: 'INFP gắn bản thân sâu với những gì họ tin là đúng — khi những giá trị đó bị đặt câu hỏi hoặc bị tấn công (dù vô ý), đây không còn là bất đồng thông thường nữa. Trước khi INFP có thể nghe bất kỳ giải pháp hay lý lẽ nào, họ cần được xác nhận rằng cảm xúc của mình có giá trị. Bỏ qua bước này thường khiến xung đột leo thang thay vì giải quyết.',
    selfAsk: 'Lần gần nhất bạn phản ứng mạnh trong xung đột — điều gì thật sự bị chạm đến, sự kiện hay một giá trị nào đó của bạn?',
    watchFor: 'Khi bạn im lặng và rút lui sau xung đột — đối phương thường không biết mức độ ảnh hưởng, vì bề ngoài bạn trông có vẻ "bình thường".',
  },

  {
    type: 'ENFJ',
    situation: 'conflict',
    signal: 'Với ENFJ, xung đột kích hoạt nhu cầu hòa giải ngay — bạn muốn restore harmony nhanh, và đôi khi nhượng bộ trước khi thật sự được nghe.',
    insight: 'ENFJ đặt sức khỏe của mối quan hệ lên cao — điều này thường là điểm mạnh, nhưng trong xung đột nó có thể tạo ra vấn đề: ENFJ có thể đồng ý hoặc xin lỗi sớm để "kết thúc" căng thẳng, trong khi phần cảm xúc thật của họ chưa được xử lý. Theo thời gian, những cảm xúc không được nói ra này tích lũy lại.',
    selfAsk: 'Trong xung đột gần nhất bạn "hòa giải" nhanh — bạn có thật sự ổn, hay bạn chỉ muốn căng thẳng kết thúc?',
    watchFor: 'Khi bạn nói "thôi không sao" nhưng sau đó vẫn nhắc lại chuyện đó — đó là tín hiệu phần cảm xúc thật chưa được nói ra lần đầu.',
  },

  {
    type: 'ENFP',
    situation: 'conflict',
    signal: 'Với ENFP, xung đột thường đến nhanh và mạnh — bạn cần express cảm xúc ngay, và sau khi nói ra thì bạn có thể move on tương đối nhanh.',
    insight: 'ENFP xử lý cảm xúc ra ngoài — nói ra là cách họ process, không phải escalate. Vấn đề nảy sinh khi đối phương chưa process xong mà ENFP đã "ổn rồi", tạo ra khoảng cách: một người đang tiếp tục carry xung đột trong khi người kia đã chuyển sang chủ đề khác. Đây không phải thiếu quan tâm — là sự khác biệt về tốc độ xử lý.',
    selfAsk: 'Sau một xung đột mà bạn cảm thấy đã xong, bạn có kiểm tra xem đối phương cũng cảm thấy như vậy chưa?',
    watchFor: 'Khi bạn đã chuyển sang vui vẻ và đối phương vẫn còn lạnh — họ có thể vẫn đang ở giữa xung đột trong khi bạn đã thoát ra.',
  },

  // ─── ST GROUP (Sentinels — SJ) ───────────────────────────

  {
    type: 'ISTJ',
    situation: 'conflict',
    signal: 'Với ISTJ, xung đột cần được xử lý theo thứ tự — bạn cần thời gian để review sự kiện, sắp xếp suy nghĩ, rồi mới sẵn sàng trình bày rõ ràng.',
    insight: 'ISTJ không tránh xung đột — họ chuẩn bị cho nó. Approach của ISTJ là có lý, trình bày facts, và tìm giải pháp cụ thể. Nhưng khoảng thời gian "cần để suy nghĩ" của ISTJ thường bị đọc nhầm là thờ ơ hoặc phủ nhận vấn đề. Bị push để resolve ngay trước khi sẵn sàng thường dẫn đến ISTJ nói ít đi, không nhiều hơn.',
    selfAsk: 'Khi bạn cần thời gian để suy nghĩ sau xung đột, bạn có nói với đối phương là bạn đang process chứ không phải đang né — không?',
    watchFor: 'Khi đối phương cố push bạn vào cuộc trò chuyện trước khi bạn sẵn sàng — phản ứng tự nhiên của bạn là đóng lại, không phải mở ra.',
  },

  {
    type: 'ISFJ',
    situation: 'conflict',
    signal: 'Với ISFJ, xung đột kích hoạt xu hướng tránh né — bạn ưu tiên harmony và dễ nói "không sao" trước khi thật sự cảm thấy như vậy.',
    insight: 'ISFJ rất nhạy cảm với sự gián đoạn trong mối quan hệ — dữ liệu cho thấy 49% ISFJ prefer avoiding conflict, cao nhất trong các types. Sự kiên nhẫn và nhường nhịn của ISFJ là điểm mạnh, nhưng trong xung đột nó có thể tạo ra vòng lặp: nói "ổn" trong khi chưa ổn → cảm xúc tích lũy → đến lúc nào đó bùng ra không tương xứng với sự kiện.',
    selfAsk: 'Lần gần nhất bạn nói "không sao" sau một xung đột — bạn thật sự ổn, hay bạn chỉ không muốn làm tình huống phức tạp hơn?',
    watchFor: 'Khi bạn im lặng và tránh chủ đề sau một xung đột nhỏ — đối phương thường không biết bạn còn đang carry điều đó.',
  },

  {
    type: 'ESTJ',
    situation: 'conflict',
    signal: 'Với ESTJ, xung đột cần được đặt ra rõ ràng, giải quyết có accountability, và không để kéo dài — bạn trực tiếp, muốn kết quả cụ thể, và không thoải mái với sự mơ hồ.',
    insight: 'ESTJ communicate trực tiếp trong xung đột — đây là điểm mạnh trong nhiều bối cảnh, nhưng với partner có style khác (đặc biệt là F types) thì sự thẳng thắn này có thể cảm giác như harsh hoặc thiếu empathy. ESTJ thường đã "xong" cảm xúc về một xung đột trước khi nói ra — nhưng đối phương nhận được sự thẳng thắn mà không thấy phần care đằng sau.',
    selfAsk: 'Khi bạn trình bày vấn đề trong xung đột, bạn bắt đầu bằng sự kiện và giải pháp — hay bạn dành một chút thời gian để acknowledge cảm xúc của đối phương trước?',
    watchFor: 'Khi đối phương im lặng hoặc defensive sau khi bạn trình bày rõ ràng — thường không phải họ không nghe, mà là họ cần được acknowledge trước khi nghe.',
  },

  {
    type: 'ESFJ',
    situation: 'conflict',
    signal: 'Với ESFJ, xung đột chạm sâu vào cảm giác về mối quan hệ — bạn muốn hòa giải nhanh, check-in nhiều, và cần biết rằng quan hệ vẫn ổn chứ không chỉ vấn đề được giải quyết.',
    insight: 'ESFJ đầu tư nhiều vào sức khỏe của mối quan hệ — xung đột với họ không chỉ là bất đồng về sự kiện mà còn là tín hiệu về trạng thái kết nối. Sau khi resolve nội dung, ESFJ vẫn cần được reassure rằng quan hệ vẫn warm và ổn. Nếu đối phương chỉ giải quyết "vấn đề" mà không reconnect, ESFJ vẫn carry cảm giác chưa xong.',
    selfAsk: 'Khi bạn check-in nhiều lần sau xung đột, bạn đang tìm kiếm điều gì — xác nhận rằng vấn đề được giải quyết, hay xác nhận rằng người kia vẫn quan tâm đến bạn?',
    watchFor: 'Khi đối phương nói "ổn rồi, không cần nhắc lại nữa" — với họ là xong, với bạn có thể vẫn chưa đủ reassurance.',
  },

  // ─── SF GROUP (Explorers — SP) ───────────────────────────

  {
    type: 'ISTP',
    situation: 'conflict',
    signal: 'Với ISTP, xung đột kích hoạt nhu cầu không gian vật lý — bạn không muốn nói khi đang nóng, và việc rút lui là cách bạn tự điều tiết, không phải từ chối kết nối.',
    insight: 'ISTP và các SP types chiếm tỷ lệ stonewalling cao nhất (49% theo dữ liệu) — nhưng "stonewalling" của ISTP thường là coping mechanism khi overwhelmed, không phải ý định trừng phạt đối phương. Khi được không gian thật sự, ISTP thường quay lại với cái đầu rõ ràng hơn và khả năng nói chuyện thực tế hơn. Vấn đề là đối phương không phải lúc nào cũng biết cuộc trò chuyện đó sẽ xảy ra.',
    selfAsk: 'Khi bạn cần không gian sau xung đột, bạn có nói với đối phương là bạn sẽ quay lại — hay bạn chỉ đơn giản là biến mất?',
    watchFor: 'Khi bạn rút lui mà không nói gì, đối phương đang ở trong trạng thái không biết phải đợi bao lâu và điều gì sẽ xảy ra tiếp theo.',
  },

  {
    type: 'ISFP',
    situation: 'conflict',
    signal: 'Với ISFP, cảm xúc trong xung đột thường rất mạnh nhưng ít khi được express bằng lời — bạn thường cần không gian và thời gian, và dễ biểu lộ qua hành động hơn là nói trực tiếp.',
    insight: 'ISFP cảm nhận xung đột rất sâu — nhưng ngôn ngữ tự nhiên của họ là hành động và sự hiện diện, không phải phân tích lời nói. Khi bị push phải "nói ra ngay", ISFP thường không có ngôn ngữ cho điều đó trong thời điểm đó và có thể im lặng hoặc rút lui. Đối phương thường đọc nhầm đây là không quan tâm, trong khi thực ra là đang overwhelmed.',
    selfAsk: 'Khi bạn không thể tìm ra lời để nói trong xung đột, bạn có cách nào khác để cho đối phương biết bạn đang ở đâu về cảm xúc không?',
    watchFor: 'Khi bạn rút lui và "cần thời gian" — nếu không có tín hiệu gì cho đối phương, họ đang ngồi chờ trong trạng thái không biết.',
  },

  {
    type: 'ESTP',
    situation: 'conflict',
    signal: 'Với ESTP, xung đột cần được đặt ra ngay và giải quyết nhanh — bạn blunt, trực tiếp, không thích kéo dài drama, và muốn move on sớm.',
    insight: 'ESTP deal with conflict head-on là điểm mạnh — nhưng tốc độ và sự trực tiếp của họ có thể overwhelming với người cần nhiều thời gian hơn để process. Khi ESTP đã "xong" và muốn move on, đối phương có thể vẫn còn đang ở giữa xung đột. ESTP thường không nhận ra đây là vấn đề vì với họ, việc address nhanh là tôn trọng thời gian của cả hai.',
    selfAsk: 'Sau khi bạn address xong một xung đột, bạn có đợi tín hiệu từ đối phương rằng họ cũng sẵn sàng move on — hay bạn tự assume rằng mọi thứ đã xong?',
    watchFor: 'Khi bạn đã chuyển sang chủ đề khác và đối phương vẫn lặng lẽ — họ có thể vẫn đang process, không phải đã ổn.',
  },

  {
    type: 'ESFP',
    situation: 'conflict',
    signal: 'Với ESFP, cảm xúc trong xung đột thường intense nhưng không kéo dài — bạn muốn express nhanh, reconnect nhanh, và không thích để căng thẳng đóng băng không gian giữa hai người.',
    insight: 'ESFP xử lý xung đột bằng cảm xúc trực tiếp và mong muốn kết nối trở lại nhanh — đây là điểm mạnh khi đối phương có cùng nhịp độ. Vấn đề nảy sinh khi ESFP đã sẵn sàng reconnect trong khi đối phương vẫn cần thêm thời gian để xử lý, hoặc chưa cảm thấy vấn đề được giải quyết đầy đủ. ESFP có thể đọc nhầm sự im lặng tiếp theo là "vẫn còn giận" trong khi thực ra đối phương đang process.',
    selfAsk: 'Khi bạn muốn reconnect sau xung đột, bạn có hỏi đối phương "bạn đã sẵn sàng chưa" — hay bạn assume rằng cả hai đều đã ổn?',
    watchFor: 'Khi đối phương chưa warmup lại cùng tốc độ với bạn — thường là họ cần thêm thời gian, không phải họ vẫn đang giận.',
  },

]

const INTIMACY_CARDS: RelationshipCard[] = [

  // ─── NT GROUP (Analysts) ────────────────────────────────

  {
    type: 'INTJ',
    situation: 'intimacy',
    signal: 'Với INTJ, sự gần gũi thật sự đến chậm — không phải vì thiếu quan tâm, mà vì bạn cần tin tưởng được xây dựng qua hành động nhất quán trước khi sẵn sàng mở ra.',
    insight: 'INTJ không dễ dàng cho phép ai vào vùng nội tâm — họ quan sát trước, thử nghiệm độ tin cậy, và chỉ mở ra khi có đủ bằng chứng rằng đây là người an toàn. Điều này không phải lạnh lùng, mà là cách INTJ bảo vệ thứ quan trọng nhất với họ: chiều sâu nội tâm. Khi INTJ thật sự gắn kết, sự kết nối đó thường rất sâu và bền.',
    selfAsk: 'Điều gì cụ thể khiến bạn cảm thấy đủ an toàn để mở ra với ai đó — và bạn có nói điều đó với đối phương không?',
    watchFor: 'Khi bạn chưa nói ra nhưng đã "quyết định" trong đầu rằng đối phương chưa đủ trust — họ không có cơ hội để chứng minh.',
  },

  {
    type: 'INTP',
    situation: 'intimacy',
    signal: 'Với INTP, sự gần gũi thường bắt đầu từ trí tuệ — bạn kết nối sâu nhất qua những cuộc trò chuyện thật sự thú vị, nơi cả hai cùng khám phá ý tưởng mà không ai bị phán xét.',
    insight: 'INTP không tự nhiên dùng ngôn ngữ cảm xúc để kết nối — nhưng điều đó không có nghĩa là họ không muốn gần gũi. Khi INTP tìm thấy ai đó có thể tranh luận, khám phá, và không bao giờ bị "kết luận" xong, đó là dấu hiệu họ đã thật sự kết nối. Vấn đề là đối phương đôi khi cần nhiều hơn là cuộc trò chuyện hay — họ cần cảm thấy được care về cảm xúc.',
    selfAsk: 'Ngoài việc chia sẻ ý tưởng, bạn có những cách nào khác để cho người thân biết bạn quan tâm đến họ, không chỉ đến những gì họ nghĩ?',
    watchFor: 'Khi mối quan hệ cảm giác rất "hay" về mặt trí tuệ nhưng đối phương vẫn cảm thấy xa cách — có thể phần cảm xúc chưa được nuôi dưỡng.',
  },

  {
    type: 'ENTJ',
    situation: 'intimacy',
    signal: 'Với ENTJ, sự gần gũi gắn liền với respect — bạn kết nối sâu nhất với người bạn thật sự nể, và mối quan hệ tốt nhất là nơi cả hai cùng thách thức và phát triển nhau.',
    insight: 'ENTJ không cần nhiều người thân — họ cần ít người nhưng thật. Sự gần gũi với ENTJ đến qua việc chia sẻ tầm nhìn, cùng vượt qua thử thách, và cảm giác người kia hiểu họ ở tầng tham vọng và năng lực. ENTJ có thể rất intense trong mối quan hệ khi đã committed — điều quan trọng là họ cũng cần học cách hiện diện trong những khoảnh khắc nhỏ, không chỉ trong "dự án lớn" của cuộc sống.',
    selfAsk: 'Trong mối quan hệ thân thiết nhất của bạn, bạn có dành thời gian cho những khoảnh khắc bình thường — hay chủ yếu kết nối qua mục tiêu và kế hoạch?',
    watchFor: 'Khi đối phương cảm thấy như "đồng minh trong dự án" hơn là người được yêu — sự gần gũi thật sự có thể đang thiếu.',
  },

  {
    type: 'ENTP',
    situation: 'intimacy',
    signal: 'Với ENTP, sự gần gũi đến qua sự cởi mở và chấp nhận sự không hoàn hảo — bạn kết nối sâu nhất với người có thể thấy bạn ở nhiều góc độ khác nhau và không đóng khung bạn vào một phiên bản.',
    insight: 'ENTP thường có nhiều lớp — bề ngoài năng động và tự tin, nhưng bên trong thường có sự không chắc chắn mà họ hiếm khi cho ai thấy. Họ kết nối sâu khi tìm được người có thể ở với tất cả những phiên bản đó, không chỉ phiên bản "hay nhất". ENTP cần đối phương không biến thành audience — mà thành người cùng trong không gian đó.',
    selfAsk: 'Bạn có người nào trong cuộc sống thật sự thấy bạn khi bạn không ở trạng thái tốt nhất — và bạn có để họ thấy không?',
    watchFor: 'Khi bạn thấy dễ nói chuyện với mọi người nhưng ít ai thật sự biết bạn sâu — có thể bạn đang giữ sự gần gũi ở mức độ rộng thay vì sâu.',
  },

  // ─── NF GROUP (Diplomats) ────────────────────────────────

  {
    type: 'INFJ',
    situation: 'intimacy',
    signal: 'Với INFJ, sự gần gũi thật sự đòi hỏi cả hai điều cùng lúc: cảm thấy được hiểu sâu và cảm thấy giá trị của hai người align — thiếu một trong hai, kết nối vẫn cảm giác là bề mặt.',
    insight: 'INFJ có khả năng kết nối cảm xúc nhanh — nhưng đó không phải sự gần gũi thật sự với họ. INFJ đặt ra (thường không nói ra) một tiêu chuẩn ngầm: người này có thật sự nhìn thấy tôi, không phải hình ảnh tôi chiếu ra không? Quá trình đó cần thời gian và thường không tuyến tính. Khi INFJ thật sự mở ra, họ gần như hoàn toàn — nhưng khi rút lui, ranh giới cũng rất rõ.',
    selfAsk: 'Người thân nhất trong cuộc sống của bạn hiện tại — họ biết gì về bạn mà hầu hết mọi người không biết?',
    watchFor: 'Khi bạn cảm thấy gần gũi với ai nhưng vẫn giữ một phần quan trọng của mình lại — đó có thể là self-protection, hoặc là tín hiệu connection chưa đủ sâu để bạn tin.',
  },

  {
    type: 'INFP',
    situation: 'intimacy',
    signal: 'Với INFP, sự gần gũi đến khi bạn cảm thấy có thể là chính mình hoàn toàn — không cần lọc, không cần perform, không sợ bị phán xét vì những thứ quan trọng với mình.',
    insight: 'INFP thường có một thế giới nội tâm phong phú mà ít người được phép vào. Họ có thể rất dễ kết nối ở tầng bề mặt — ấm áp, lắng nghe tốt, dễ nói chuyện — nhưng sự gần gũi thật sự với INFP là khi họ chia sẻ phần đó. Điều cần để điều đó xảy ra: cảm giác an toàn rằng sự mềm mỏng và lý tưởng của họ sẽ không bị chế giễu.',
    selfAsk: 'Bạn có người nào bạn có thể chia sẻ thứ gì đó thật sự quan trọng với mình mà không sợ bị coi là "quá" không?',
    watchFor: 'Khi bạn cảm thấy đơn độc trong một mối quan hệ đang tồn tại — thường là phần sâu nhất của bạn chưa được nhìn thấy.',
  },

  {
    type: 'ENFJ',
    situation: 'intimacy',
    signal: 'Với ENFJ, sự gần gũi thường đến khá nhanh — bạn tự nhiên mở ra, quan tâm, và đầu tư vào người khác; nhưng sự gần gũi thật sự đòi hỏi đối phương cũng có thể nhìn thấy bạn, không chỉ nhận từ bạn.',
    insight: 'ENFJ rất giỏi kết nối và chăm sóc người khác — điều này đôi khi tạo ra một sự mất cân bằng trong mối quan hệ: họ biết rất nhiều về đối phương trong khi đối phương biết ít về họ hơn nhiều. ENFJ cần học cách nhận sự quan tâm và cho phép người khác chăm sóc lại, không chỉ tiếp tục là người cho đi.',
    selfAsk: 'Trong mối quan hệ thân thiết nhất của bạn, ai biết về những lúc bạn cảm thấy khó khăn, mệt mỏi, hoặc nghi ngờ bản thân?',
    watchFor: 'Khi mọi người trong cuộc sống bạn cảm thấy gần bạn nhưng bạn vẫn cảm thấy cô đơn — có thể bạn đang give nhiều mà chưa học cách receive.',
  },

  {
    type: 'ENFP',
    situation: 'intimacy',
    signal: 'Với ENFP, sự gần gũi có thể đến rất nhanh và rất mạnh — bạn kết nối bằng cả trái tim, và khi tìm được người "thật" thì ranh giới từ xa lạ đến thân thiết có thể rất ngắn.',
    insight: 'ENFP có khả năng tạo ra cảm giác kết nối tức thì — năng lượng ấm áp, tò mò về đối phương, sẵn sàng chia sẻ. Điều cần cẩn thận: cường độ kết nối của ENFP đôi khi vượt trước mức đối phương đã thật sự sẵn sàng. Cảm giác thân thiết nhanh không phải lúc nào cũng có nghĩa là gắn kết sâu — cần thời gian để biết.',
    selfAsk: 'Trong những mối quan hệ cảm giác rất kết nối ngay từ đầu, bạn có dành thời gian để thật sự biết người đó qua nhiều hoàn cảnh khác nhau không?',
    watchFor: 'Khi cường độ cảm xúc lớn hơn thời gian thực sự đã có cùng nhau — đôi khi bạn đang kết nối với hình ảnh bạn chiếu lên người đó hơn là người đó thật sự là ai.',
  },

  // ─── ST GROUP (Sentinels — SJ) ───────────────────────────

  {
    type: 'ISTJ',
    situation: 'intimacy',
    signal: 'Với ISTJ, sự gần gũi xây dựng qua thời gian và bằng chứng cụ thể — bạn tin tưởng người chứng minh sự đáng tin qua hành động nhất quán, không phải qua lời nói.',
    insight: 'ISTJ không thể hiện sự gần gũi bằng ngôn ngữ cảm xúc phong phú — nhưng tình cảm của họ thể hiện rất rõ qua hành động: nhớ những chi tiết nhỏ, luôn ở đó khi cần, làm những việc thiết thực để hỗ trợ. Đối phương cần học cách đọc ngôn ngữ đó thay vì chờ đợi verbal expression. Từ phía ISTJ, thỉnh thoảng nói ra cũng giúp đối phương không phải đoán.',
    selfAsk: 'Người thân trong cuộc sống của bạn có biết rằng bạn quan tâm đến họ — hay bạn assume họ tự hiểu qua những gì bạn làm?',
    watchFor: 'Khi đối phương hỏi "bạn có còn quan tâm không" dù bạn vẫn đang làm mọi thứ — đó là tín hiệu họ cần verbal confirmation, không chỉ hành động.',
  },

  {
    type: 'ISFJ',
    situation: 'intimacy',
    signal: 'Với ISFJ, sự gần gũi xây dựng qua sự chăm sóc lặp đi lặp lại — bạn kết nối qua việc nhớ những chi tiết nhỏ, làm những điều cụ thể, và tạo ra không gian ấm áp cho người bạn thương.',
    insight: 'ISFJ thể hiện tình cảm qua hành động chăm sóc — nấu ăn, nhớ sinh nhật, hỏi thăm sức khỏe, ở đó khi cần. Đây là ngôn ngữ tình yêu tự nhiên của họ, và họ cũng thường cảm thấy được yêu nhất khi nhận lại những điều tương tự. Vấn đề đôi khi xảy ra khi ISFJ chờ người khác nhận ra nhu cầu của mình thay vì nói ra — và cảm thấy thất vọng khi không được đáp lại.',
    selfAsk: 'Những điều bạn cần trong mối quan hệ — đối phương biết những điều đó qua lời bạn nói, hay họ phải tự đoán?',
    watchFor: 'Khi bạn đang give nhiều mà không nhận lại và cảm thấy kiệt sức — thường là vì nhu cầu của bạn chưa được nói ra rõ ràng.',
  },

  {
    type: 'ESTJ',
    situation: 'intimacy',
    signal: 'Với ESTJ, sự gần gũi đến khi có sự rõ ràng và tin cậy — bạn kết nối tốt nhất với người bạn biết rõ họ là ai, họ muốn gì, và bạn có thể tin vào sự nhất quán của họ.',
    insight: 'ESTJ thể hiện tình cảm qua việc làm: giúp đỡ thiết thực, ổn định, bảo vệ, đảm bảo mọi thứ hoạt động tốt. Đây là cách họ care và cũng là cách họ muốn được care lại. Phần khó hơn là phần cảm xúc — ESTJ thường không tự nhiên nói về cảm xúc của mình, và có thể không nhận ra đối phương cần điều đó để cảm thấy gần gũi.',
    selfAsk: 'Khi bạn muốn ai đó biết bạn quan tâm đến họ, bạn thường làm gì — và bạn có biết họ cần nhận sự quan tâm theo cách nào không?',
    watchFor: 'Khi bạn đang làm rất nhiều để support đối phương nhưng họ vẫn cảm thấy "xa" — có thể họ cần cảm xúc được nói ra, không chỉ hành động.',
  },

  {
    type: 'ESFJ',
    situation: 'intimacy',
    signal: 'Với ESFJ, sự gần gũi thường đến khá tự nhiên — bạn ấm áp, quan tâm, và tạo ra không gian an toàn cho người khác; điều bạn cần là cảm giác được đáp lại và được trân trọng.',
    insight: 'ESFJ đầu tư nhiều vào mối quan hệ và thường rất attuned với cảm xúc của người khác. Sự gần gũi với ESFJ không chỉ là chia sẻ nhiều — nó cần có sự đáp lại rõ ràng. Khi ESFJ không nhận được dấu hiệu rằng đối phương cũng đang đầu tư, họ có thể bắt đầu lo ngại về trạng thái của mối quan hệ ngay cả khi mọi thứ thật ra vẫn ổn.',
    selfAsk: 'Khi bạn cảm thấy lo lắng về một mối quan hệ, bạn tìm kiếm điều gì cụ thể để reassure bản thân — và bạn có thể nói điều đó với đối phương không?',
    watchFor: 'Khi bạn check-in nhiều lần và tìm kiếm sự xác nhận liên tục — đối phương có thể cảm thấy overwhelmed trong khi bạn chỉ đang cần reassurance.',
  },

  // ─── SF GROUP (Explorers — SP) ───────────────────────────

  {
    type: 'ISTP',
    situation: 'intimacy',
    signal: 'Với ISTP, sự gần gũi đến từ từ và qua hành động — bạn không thoải mái với verbal intimacy sớm, nhưng khi bạn chọn ở lại và tiếp tục show up, đó là cách bạn nói rằng mối quan hệ này quan trọng.',
    insight: 'ISTP không thể hiện sự gắn kết qua lời nói hoặc cảm xúc bề mặt — họ thể hiện qua sự hiện diện thực tế và hành động cụ thể. Với ISTP, sự gần gũi cũng cần không gian — nghịch lý là họ kết nối tốt hơn khi không bị áp lực phải "express" hoặc "commit" sớm. Đối phương cần đủ kiên nhẫn để không push, và tin vào tín hiệu hành động thay vì chờ lời nói.',
    selfAsk: 'Người thân nhất trong cuộc sống của bạn biết điều đó qua điều gì cụ thể — và bạn đã nói ra hay họ phải tự đọc?',
    watchFor: 'Khi đối phương cảm thấy không chắc về vị trí của họ trong cuộc sống của bạn dù bạn vẫn ở đó — có thể một vài lời nói ra sẽ thay đổi nhiều.',
  },

  {
    type: 'ISFP',
    situation: 'intimacy',
    signal: 'Với ISFP, sự gần gũi đến khi bạn cảm thấy được accept hoàn toàn như mình đang là — không cần phải khác đi, không cần phải giải thích, không sợ bị phán xét.',
    insight: 'ISFP thường có chiều sâu cảm xúc lớn mà ít người nhìn thấy vì họ không tự nhiên nói ra. Họ kết nối qua sự hiện diện và shared experience — ở cạnh nhau làm điều gì đó, không nhất thiết phải nói nhiều. Điều ISFP cần nhất để mở ra: cảm giác rằng người kia thật sự thấy họ và không có agenda để thay đổi họ.',
    selfAsk: 'Bạn có ai trong cuộc sống mà bạn cảm thấy hoàn toàn là mình — không cần điều chỉnh hay giải thích gì không?',
    watchFor: 'Khi bạn adjust bản thân nhiều để phù hợp với kỳ vọng của người kia — đó là tín hiệu sự gần gũi chưa đến từ nơi thật sự an toàn.',
  },

  {
    type: 'ESTP',
    situation: 'intimacy',
    signal: 'Với ESTP, sự gần gũi đến qua shared experience và năng lượng thật — bạn kết nối sâu nhất khi cùng làm, cùng trải nghiệm, cùng cười, không phải khi ngồi phân tích mối quan hệ.',
    insight: 'ESTP sống nhiều trong hiện tại — sự gần gũi của họ thể hiện qua sự hiện diện trực tiếp và năng lượng đầu tư vào lúc đó. Họ không tự nhiên với những cuộc trò chuyện về "mình đang đi đến đâu" hoặc "chúng ta đang ở giai đoạn nào" — điều đó không có nghĩa là họ không committed, mà là họ process kết nối theo cách khác. Đối phương cần học cách đọc sự hiện diện thay vì chỉ nghe lời.',
    selfAsk: 'Người quan trọng với bạn trong cuộc sống — họ biết điều đó qua điều gì, và bạn có nói ra đủ để họ thật sự biết không?',
    watchFor: 'Khi mối quan hệ cảm giác rất vui và kết nối khi ở cạnh nhau nhưng không rõ ràng khi không — có thể cần thêm một chút explicitness về những gì cả hai đang xây dựng.',
  },

  {
    type: 'ESFP',
    situation: 'intimacy',
    signal: 'Với ESFP, sự gần gũi đến qua niềm vui, sự ấm áp, và những khoảnh khắc thật — bạn kết nối bằng cả người, và khi ai đó thật sự thấy được cả phần vui lẫn phần dễ tổn thương của bạn, đó là gần gũi thật sự.',
    insight: 'ESFP toả ra năng lượng kết nối tự nhiên — nhưng đằng sau đó thường có một phần dễ bị tổn thương mà họ ít cho ai thấy. Họ kết nối sâu khi tìm được người không chỉ yêu thích "phiên bản vui vẻ" mà còn ở đó khi họ không ở trạng thái tốt nhất. ESFP cần đối phương đủ ổn định và không rời đi khi năng lượng xuống.',
    selfAsk: 'Người thân nhất với bạn có nhìn thấy bạn khi bạn mệt, buồn, hoặc không chắc chắn — không chỉ khi bạn đang ở phiên bản tốt nhất?',
    watchFor: 'Khi bạn cảm thấy cần duy trì năng lượng cao để người kia vẫn quan tâm đến mình — đó là tín hiệu sự gần gũi thật sự chưa được thiết lập.',
  },

]

const ATTACHMENT_CARDS: RelationshipCard[] = [

  // ─── NT GROUP (Analysts) ────────────────────────────────

  {
    type: 'INTJ',
    situation: 'attachment',
    signal: 'Với INTJ, dấu hiệu gắn kết thường không ồn ào — bạn bắt đầu chia sẻ suy nghĩ chưa hoàn chỉnh, hỏi ý kiến về thứ bạn đang nghĩ, và để người kia thấy quá trình bạn suy nghĩ thay vì chỉ kết luận cuối.',
    insight: 'INTJ bảo vệ thế giới nội tâm rất kỹ — nên khi họ bắt đầu "think out loud" với ai đó, đó là tín hiệu gắn kết mạnh hơn nhiều lời nói hoa mỹ. Chiều ngược lại: khi INTJ rút lui, họ không disappear hoàn toàn — họ trở lại chế độ "chỉ chia sẻ kết luận, không chia sẻ quá trình." Bề ngoài vẫn functional, nhưng cửa bên trong đã đóng lại.',
    selfAsk: 'Người bạn đang gần nhất trong cuộc sống — họ có được nghe bạn nghĩ to không, hay họ chỉ thấy phiên bản đã được chỉnh sửa?',
    watchFor: 'Khi bạn bắt đầu trả lời ngắn lại, không hỏi thêm, và chỉ chia sẻ những gì cần thiết — người kia thường không nhận ra bạn đang rút lui vì bề ngoài bạn vẫn lịch sự và ổn.',
  },

  {
    type: 'INTP',
    situation: 'attachment',
    signal: 'Với INTP, dấu hiệu gắn kết rõ nhất là bạn bắt đầu nhắn tin hay gọi mà không có lý do cụ thể — chỉ vì nghĩ đến họ, thấy thứ gì đó hay và muốn share ngay, hoặc kéo họ vào một cuộc thảo luận không cần thiết.',
    insight: 'INTP không phải người chủ động kết nối theo kiểu xã giao — nên khi họ initiate contact mà không có "lý do logic", đó thật ra là lý do lớn nhất. Chiều rút lui của INTP tinh tế hơn: họ vẫn reply, vẫn lịch sự, nhưng câu trả lời trở nên ngắn hơn, ít hỏi ngược lại hơn, và cuộc trò chuyện không còn đi về đâu nữa.',
    selfAsk: 'Lần gần nhất bạn chủ động liên lạc với ai đó không phải vì có việc cần — bạn nhắn gì, và với ai?',
    watchFor: 'Khi bạn reply đúng câu hỏi nhưng không hỏi thêm và không mở thêm chủ đề mới — người kia cảm thấy cuộc trò chuyện "okay" nhưng không biết tại sao cảm giác xa hơn trước.',
  },

  {
    type: 'ENTJ',
    situation: 'attachment',
    signal: 'Với ENTJ, dấu hiệu gắn kết rõ nhất là bạn bắt đầu đưa người đó vào kế hoạch — không phải hỏi "bạn muốn đi đâu" mà là "tháng sau mình đi X nhé" — và bắt đầu hỏi ý kiến họ về những quyết định quan trọng.',
    insight: 'ENTJ đặt thời gian và năng lượng vào những gì thật sự quan trọng với họ — nên khi ai đó xuất hiện trong kế hoạch và được hỏi ý kiến, đó là cách ENTJ nói "bạn quan trọng với tôi." Chiều rút lui: ENTJ bắt đầu politely efficient — trả lời đúng, không overtime, không chủ động. Với ENTJ, "không có gì sai" đôi khi chính là tín hiệu có gì đó đã thay đổi.',
    selfAsk: 'Trong 3 tháng gần nhất, ai là người bạn chủ động đưa vào kế hoạch của mình — không phải vì cần, mà vì muốn họ ở đó?',
    watchFor: 'Khi bạn trở nên "professional" với người thân — lịch sự, hiệu quả, không friction — nhưng cũng không còn energy thật trong tương tác, đó thường là tín hiệu rút lui.',
  },

  {
    type: 'ENTP',
    situation: 'attachment',
    signal: 'Với ENTP, dấu hiệu gắn kết rõ nhất là bạn mang người đó vào trong đầu khi không có họ ở đó — thấy tin tức gì hay, nghe ý tưởng nào thú vị, gặp tình huống buồn cười là nghĩ "phải kể cho người này nghe."',
    insight: 'ENTP kết nối qua chia sẻ thế giới trí tuệ — khi họ muốn share liên tục với ai đó, người đó đã được vào "inner circle." Chiều rút lui của ENTP thường không phải là lạnh lùng mà là... phân tán. Họ bắt đầu ít specifically nghĩ đến người kia, ít tag, ít "nghĩ đến mày khi thấy cái này." Họ vẫn vui khi gặp — nhưng kết nối không còn organic.',
    selfAsk: 'Khi bạn thấy điều gì đó hay trong tuần này, ai là người bạn muốn chia sẻ đầu tiên — và tại sao là người đó?',
    watchFor: 'Khi bạn vẫn enjoy cuộc trò chuyện nhưng không còn spontaneously nghĩ đến người kia giữa các cuộc gặp — kết nối đang nhạt dần dù chưa có biến cố nào.',
  },

  // ─── NF GROUP (Diplomats) ────────────────────────────────

  {
    type: 'INFJ',
    situation: 'attachment',
    signal: 'Với INFJ, dấu hiệu gắn kết thường đến qua sự chú ý chi tiết — bạn nhớ những thứ nhỏ người kia đã nói từ lâu, hỏi thăm đúng lúc, và bắt đầu chia sẻ những góc khuất mà bình thường bạn không kể với ai.',
    insight: 'INFJ quan sát kỹ và nhớ lâu với người họ care — đó vừa là cách họ thể hiện gắn kết vừa là cách họ invest. Chiều rút lui của INFJ thường im lặng hơn là conflict: họ vẫn present nhưng bắt đầu giữ lại những thứ quan trọng, trả lời ở tầng bề mặt, và dần dần trở thành người lịch sự thay vì người gần gũi. "Door slam" của INFJ không phải lúc nào cũng sầm một cái — đôi khi nó đóng từ từ trong nhiều tuần.',
    selfAsk: 'Có ai trong cuộc sống mà bạn từng rất gần nhưng giờ chỉ còn ở mức lịch sự — bạn có biết cửa đóng lúc nào không?',
    watchFor: 'Khi bạn đang rút lui khỏi một mối quan hệ, người kia thường không nhận ra vì bạn vẫn hiện diện và lịch sự — họ chỉ cảm thấy có gì đó "khác" mà không giải thích được.',
  },

  {
    type: 'INFP',
    situation: 'attachment',
    signal: 'Với INFP, dấu hiệu gắn kết rõ nhất là bạn bắt đầu chia sẻ những thứ thật sự quan trọng với mình — không phải chuyện bề mặt mà là ý tưởng, nỗi sợ, điều bạn đang tin hoặc đang nghi ngờ.',
    insight: 'INFP không chia sẻ chiều sâu đó với nhiều người — nên khi họ bắt đầu kể về những gì thật sự có ý nghĩa với mình, đó là tín hiệu gắn kết mạnh. Chiều rút lui: INFP trở nên vague hơn, trả lời chung chung, và dần dần chuyển từ chia sẻ thật sang chia sẻ an toàn. Trong VN context, INFP rút lui thường biểu hiện qua việc "bận hơn" hoặc reply chậm hơn — không phải conflict công khai.',
    selfAsk: 'Người bạn đang gần nhất biết những gì về bạn mà người khác không biết — và bạn có chia sẻ thêm hay đang giữ lại nhiều hơn gần đây?',
    watchFor: 'Khi bạn trả lời "bình thường" hay "không có gì" cho câu hỏi về cảm xúc — người kia có thể không nhận ra đây là tín hiệu bạn đã rút vào trong.',
  },

  {
    type: 'ENFJ',
    situation: 'attachment',
    signal: 'Với ENFJ, dấu hiệu gắn kết thường thể hiện qua việc bạn over-invest — nhớ chi tiết về cuộc sống của người kia, chủ động hỏi thăm đúng thời điểm, và dành năng lượng không tương xứng với mức độ quen biết.',
    insight: 'ENFJ care rộng nhưng gắn kết sâu thể hiện qua mức độ đầu tư cụ thể — người nào được ENFJ nhớ tên bạn bè, nhớ ngày quan trọng, và chủ động check-in, đó là người ENFJ thật sự attached. Chiều rút lui của ENFJ tinh tế và thường không ai nhận ra: họ vẫn care, vẫn hỏi thăm — nhưng bắt đầu maintain distance cảm xúc trong khi vẫn functional. Họ cho đi ít hơn một chút mỗi lần, không ai để ý cho đến khi khoảng cách đã lớn.',
    selfAsk: 'Ai đó trong cuộc sống mà bạn vẫn hỏi thăm vì thói quen nhưng không còn thật sự muốn biết câu trả lời — bạn có nhận ra sự khác biệt đó không?',
    watchFor: 'Khi bạn rút lui khỏi ai đó, người kia thường không biết vì bạn vẫn "nice" — sự im lặng thật đến từ phần cảm xúc, không phải hành vi bề ngoài.',
  },

  {
    type: 'ENFP',
    situation: 'attachment',
    signal: 'Với ENFP, dấu hiệu gắn kết rõ và dễ thấy — bạn hype người đó lên với người khác, kéo họ vào các cuộc phiêu lưu mới, và nhắn tin bất kỳ lúc nào có điều gì vui mà không cần lý do.',
    insight: 'ENFP gắn kết bằng năng lượng và sự hứng thú — khi họ enthusiastic về ai đó, mọi người xung quanh đều biết. Chiều rút lui của ENFP thường biểu hiện qua sự distracted hơn là lạnh lùng: họ vẫn warm khi gặp nhưng bắt đầu bỏ lỡ những tín hiệu nhỏ, reply chậm hơn, và năng lượng khi ở cùng không còn như trước. Không phải giả tạo — họ chỉ đang đầu tư attention vào chỗ khác.',
    selfAsk: 'Trong 2 tuần gần nhất, ai là người bạn nhắn tin nhiều nhất mà không có lý do cụ thể — và ai là người bạn ít nghĩ đến hơn trước?',
    watchFor: 'Khi bạn vẫn "oke bình thường" khi gặp nhưng không còn spontaneously nghĩ đến họ — người kia thường cảm nhận được sự thay đổi năng lượng đó dù không nói ra.',
  },

  // ─── ST GROUP (Sentinels — SJ) ───────────────────────────

  {
    type: 'ISTJ',
    situation: 'attachment',
    signal: 'Với ISTJ, dấu hiệu gắn kết thể hiện qua sự đáng tin cậy nhất quán — bạn xuất hiện đúng giờ, nhớ chi tiết thực tế, và bắt đầu tích hợp người đó vào lịch trình và thói quen của mình.',
    insight: 'ISTJ thể hiện gắn kết qua hành động có thể đo được — ai được ISTJ ưu tiên trong lịch trình, được nhắc đến trong kế hoạch, và được giúp đỡ việc thực tế, đó là người ISTJ attached. Chiều rút lui của ISTJ không ồn ào: họ vẫn thực hiện nghĩa vụ nhưng bắt đầu không "volunteer" thêm nữa. Từ chủ động → thụ động. Từ "để tôi giúp" → "bảo tôi nếu cần gì."',
    selfAsk: 'Ai trong cuộc sống bạn sẵn sàng thay đổi kế hoạch của mình để phù hợp với họ — và bạn có nhận ra đó là tín hiệu gắn kết không?',
    watchFor: 'Khi bạn bắt đầu chỉ làm đúng những gì được yêu cầu và không tự nguyện thêm gì — người kia thường không nhận ra đây là tín hiệu rút lui vì bạn vẫn "làm đủ."',
  },

  {
    type: 'ISFJ',
    situation: 'attachment',
    signal: 'Với ISFJ, dấu hiệu gắn kết thể hiện qua sự chăm sóc chi tiết và không được yêu cầu — bạn nhớ người kia thích gì, tránh gì, đang lo gì, và hành động dựa trên những chi tiết đó trước khi họ hỏi.',
    insight: 'ISFJ thể hiện tình cảm qua những hành động nhỏ liên tục — mang đồ ăn người kia thích, nhắn hỏi thăm đúng lúc, nhớ điều nhỏ từ cuộc trò chuyện cũ. Chiều rút lui: ISFJ bắt đầu respond thay vì initiate. Họ vẫn là người tốt và lịch sự, nhưng năng lượng chủ động chăm sóc giảm xuống rõ rệt — từ người luôn nhớ trước sang người chỉ hồi đáp khi được nhắc.',
    selfAsk: 'Ai đó bạn đang chăm sóc gần đây — bạn làm vì muốn, hay vì thói quen, hay vì cảm thấy cần phải làm?',
    watchFor: 'Khi bạn rút lui, bạn không nói ra và không tạo conflict — người kia chỉ dần nhận ra bạn "ít chủ động hơn" nhưng không hiểu tại sao.',
  },

  {
    type: 'ESTJ',
    situation: 'attachment',
    signal: 'Với ESTJ, dấu hiệu gắn kết rõ nhất là bạn bắt đầu dành thời gian và nguồn lực cụ thể — không chỉ khi thuận tiện mà khi cần thiết, kể cả khi bận, kể cả khi không được yêu cầu.',
    insight: 'ESTJ quản lý thời gian và nguồn lực có chủ đích — nên khi họ consistently ưu tiên ai đó trong lịch, đó là tín hiệu gắn kết thật. Chiều rút lui của ESTJ thường biểu hiện qua sự "busy" tăng lên và availability giảm xuống. Họ không nói "tôi đang rút lui" — họ chỉ bắt đầu có ít thời gian hơn, và khi có thì năng lượng ít đầu tư hơn.',
    selfAsk: 'Ai là người bạn sẵn sàng tìm thời gian dù lịch đang bận — và điều gì khiến bạn ưu tiên người đó?',
    watchFor: 'Khi "bận" trở thành câu trả lời mặc định với ai đó mà trước đây bạn vẫn tìm được thời gian — đó thường không phải về lịch trình.',
  },

  {
    type: 'ESFJ',
    situation: 'attachment',
    signal: 'Với ESFJ, dấu hiệu gắn kết rõ và dễ thấy — bạn nói về người đó với người khác, tích hợp họ vào vòng tròn xã hội của mình, và tìm cách tạo ra những khoảnh khắc chung.',
    insight: 'ESFJ gắn kết qua sự kết nối cộng đồng — khi họ giới thiệu ai đó với bạn bè, đưa vào nhóm, và tạo cơ hội gặp gỡ, đó là cách họ nói "người này quan trọng với tôi." Chiều rút lui: ESFJ bắt đầu không còn "kể về bạn" cho người khác nữa, không còn tạo cơ hội gặp gỡ, và dần dần người kia biến ra khỏi vòng tròn xã hội mà không có sự kiện nào đánh dấu.',
    selfAsk: 'Ai đó bạn từng kể với nhiều người nhưng gần đây ít nhắc đến — bạn có để ý sự thay đổi đó không?',
    watchFor: 'Khi bạn rút lui ai đó ra khỏi vòng tròn xã hội của mình, họ thường cảm nhận được sự cô lập dần dần nhưng không biết chính xác điều gì đã thay đổi.',
  },

  // ─── SF GROUP (Explorers — SP) ───────────────────────────

  {
    type: 'ISTP',
    situation: 'attachment',
    signal: 'Với ISTP, dấu hiệu gắn kết không đến qua lời nói — nó đến qua sự hiện diện tự nguyện: bạn chọn ở lại, chọn tham gia, và bắt đầu chia sẻ không gian vật lý và dự án của mình với người đó.',
    insight: 'ISTP không gắn kết bằng verbal expression — họ gắn kết bằng cách cho phép người kia vào không gian của mình. Được mời tham gia vào dự án, được dẫn đến chỗ ISTP thích, được thấy ISTP trong "mode tự nhiên" — đó là tín hiệu gắn kết mạnh. Chiều rút lui: ISTP đơn giản là có mặt ít hơn. Không drama, không giải thích — chỉ là less available, và không tự nguyện tạo cơ hội gặp nhau.',
    selfAsk: 'Ai là người bạn comfortable chia sẻ không gian yên tĩnh của mình mà không cần phải "làm họ vui" họ?',
    watchFor: 'Khi bạn bắt đầu không tự tạo ra cơ hội gặp nhau nữa — người kia thường không nhận ra đây là rút lui vì không có dấu hiệu rõ ràng, chỉ là bạn "bận hơn."',
  },

  {
    type: 'ISFP',
    situation: 'attachment',
    signal: 'Với ISFP, dấu hiệu gắn kết thường tinh tế và qua hành động nhỏ — bạn bắt đầu chia sẻ những thứ bạn thật sự thích (âm nhạc, nơi chốn, trải nghiệm), và dần dần để người kia thấy phần của bạn thường không ai thấy.',
    insight: 'ISFP thể hiện tình cảm qua sự chia sẻ thế giới riêng — khi họ dẫn người kia đến chỗ họ thích, cho nghe nhạc họ yêu, hoặc kể về thứ gì đó có ý nghĩa với họ, đó là cách họ mở cửa. Chiều rút lui: ISFP bắt đầu không còn chia sẻ những thứ đó nữa — giữ thế giới riêng lại cho mình và tương tác chỉ ở tầng an toàn hơn.',
    selfAsk: 'Ai đó bạn đã chia sẻ thứ gì đó thật sự có ý nghĩa với mình gần đây — và khi nào là lần cuối bạn làm điều đó?',
    watchFor: 'Khi bạn rút lui, người kia thường không nhận ra ngay vì bạn vẫn friendly — họ chỉ dần thấy những cuộc trò chuyện không còn đi đến đâu thật sự.',
  },

  {
    type: 'ESTP',
    situation: 'attachment',
    signal: 'Với ESTP, dấu hiệu gắn kết rõ và trực tiếp — bạn kéo người đó vào những gì bạn đang làm, chủ động tạo cơ hội ở cạnh nhau, và bắt đầu share những khoảnh khắc thật thay vì chỉ highlight.',
    insight: 'ESTP gắn kết qua shared experience trong thời gian thực — ai được ESTP kéo vào kế hoạch, được mời tham gia adventure, và được thấy trong trạng thái không perfect, người đó đang được gắn kết với. Chiều rút lui: ESTP bắt đầu not include người kia trong kế hoạch, giữ cuộc sống theo compartments, và tương tác trở nên lighter — vui nhưng không sâu.',
    selfAsk: 'Ai là người bạn muốn có mặt khi bạn đang làm điều gì đó thật sự thú vị — không phải vì cần họ, mà vì muốn họ ở đó?',
    watchFor: 'Khi bạn bắt đầu không tự nhiên nghĩ đến việc "kéo người này theo" nữa — kết nối đang nhạt dần ngay cả khi tương tác bề mặt vẫn tốt.',
  },

  {
    type: 'ESFP',
    situation: 'attachment',
    signal: 'Với ESFP, dấu hiệu gắn kết rõ và ấm áp — bạn tự nhiên thân thiết hơn qua tiếp xúc, kể chuyện nhiều hơn, và bắt đầu chia sẻ cả những phần không hoàn hảo thay vì chỉ phần vui vẻ.',
    insight: 'ESFP thể hiện tình cảm qua sự hiện diện đầy đủ và không filtered — khi họ để người kia thấy cả lúc mệt, lúc không chắc, lúc không ở trạng thái tốt nhất, đó là gắn kết thật. Chiều rút lui của ESFP thường biểu hiện qua việc "vui nhưng shallow hơn" — vẫn năng lượng, vẫn cười, nhưng không còn chia sẻ chiều sâu, và bắt đầu maintain safe distance cảm xúc trong khi bề mặt vẫn warm.',
    selfAsk: 'Ai là người bạn comfortable ở cạnh khi bạn không ở trạng thái tốt nhất — và bạn có cho họ thấy điều đó không?',
    watchFor: 'Khi bạn vẫn vui vẻ và dễ chịu với ai đó nhưng không còn chia sẻ phần không hoàn hảo — người kia thường cảm thấy "có gì đó khác" mà không giải thích được là gì.',
  },

]

const REPAIR_CARDS: RelationshipCard[] = [

  // ─── NT ───
  {
    type: 'INTJ',
    situation: 'repair',
    signal: 'Với INTJ, hàn gắn thường bắt đầu bằng một phân tích — bạn muốn hiểu điều gì đã thật sự sai, đề xuất cách để nó không lặp lại, rồi coi đó là sự hòa giải.',
    insight: 'INTJ tiếp cận repair như một vấn đề cần giải pháp bền vững — với họ, "xin lỗi" mà không có cơ chế ngăn lặp lại thì chưa đủ. Nhưng đối phương đôi khi cần sự kết nối cảm xúc trước khi cần giải pháp. Một bản phân tích đúng về mặt logic có thể vẫn để lại cảm giác lạnh nếu thiếu bước acknowledge cảm xúc.',
    selfAsk: 'Khi bạn muốn hàn gắn, bạn dành thời gian để hiểu đối phương cảm thấy thế nào — hay bạn nhảy thẳng vào "lần sau mình làm thế này"?',
    watchFor: 'Khi bạn đã đưa ra giải pháp hợp lý nhưng đối phương vẫn lạnh — họ thường đang chờ bạn thừa nhận cảm xúc, không phải chờ thêm một kế hoạch.',
  },
  {
    type: 'INTP',
    situation: 'repair',
    signal: 'Với INTP, hàn gắn thường đến qua việc bạn lặng lẽ quay lại như chưa có chuyện gì — bạn không giỏi mở lời về cảm xúc, nên thường repair bằng cách hành động bình thường trở lại.',
    insight: 'INTP thấy việc nói lại về xung đột là không thoải mái — nên xu hướng tự nhiên của họ là "để nó trôi qua" và tương tác bình thường như tín hiệu hòa giải. Vấn đề là với người cần lời nói rõ ràng, sự im lặng quay lại này có thể bị đọc là "phớt lờ vấn đề" thay vì "đã ổn rồi."',
    selfAsk: 'Lần gần nhất bạn "để mọi thứ trôi qua" sau xung đột — đối phương có thật sự biết bạn đã ổn, hay họ chỉ đoán?',
    watchFor: 'Khi bạn quay lại bình thường nhưng đối phương vẫn dè dặt — họ có thể chưa nhận được tín hiệu rõ ràng rằng chuyện đã được khép lại.',
  },
  {
    type: 'ENTJ',
    situation: 'repair',
    signal: 'Với ENTJ, hàn gắn nghĩa là giải quyết dứt điểm và tiến lên — bạn muốn đặt vấn đề ra, thống nhất cách xử lý, rồi đóng lại và không quay lại nữa.',
    insight: 'ENTJ không thích để xung đột treo lơ lửng — họ muốn resolve rõ ràng và move forward với năng lượng. Sức mạnh này có mặt trái: ENTJ có thể coi xung đột là "đã xử lý xong" trước khi đối phương cảm thấy thật sự được nghe. Tốc độ đóng vấn đề của ENTJ có thể nhanh hơn tốc độ chữa lành cảm xúc của người kia.',
    selfAsk: 'Khi bạn tuyên bố một vấn đề "đã xong", bạn có kiểm tra xem đối phương cũng cảm thấy như vậy — hay bạn quyết định điều đó cho cả hai?',
    watchFor: 'Khi cùng một chủ đề cứ quay lại dù bạn nghĩ đã giải quyết — đó là tín hiệu lần "xong" trước đó chỉ xong với một phía.',
  },
  {
    type: 'ENTP',
    situation: 'repair',
    signal: 'Với ENTP, hàn gắn thường đến qua hài hước và đổi không khí — bạn dùng một câu đùa, một góc nhìn mới, hoặc một sự thật để phá tan căng thẳng và reconnect.',
    insight: 'ENTP repair bằng cách thay đổi năng lượng — humor và sự nhẹ nhõm là công cụ tự nhiên của họ. Điều này hiệu quả với nhiều người nhưng có thể phản tác dụng nếu dùng quá sớm: đối phương đang muốn cảm xúc được công nhận thì một câu đùa có thể cảm giác như đang né tránh hoặc coi nhẹ chuyện.',
    selfAsk: 'Khi bạn dùng hài hước để phá băng sau xung đột, bạn đang giúp cả hai reconnect — hay đang giúp bản thân tránh một cuộc trò chuyện khó?',
    watchFor: 'Khi câu đùa của bạn khiến đối phương căng hơn thay vì nhẹ đi — đó là tín hiệu họ cần được nghe trước, cười sau.',
  },

  // ─── NF ───
  {
    type: 'INFJ',
    situation: 'repair',
    signal: 'Với INFJ, hàn gắn cần cảm giác rằng mối quan hệ thật sự được khôi phục ở tầng sâu — không chỉ vấn đề được giải quyết mà còn sự kết nối được tái lập.',
    insight: 'INFJ cần repair toàn diện — họ không thể "move on" khi vẫn cảm thấy có vết nứt chưa được chữa trong sự kết nối. Họ thường cần một cuộc trò chuyện thật, nơi cả hai cùng hiểu điều gì đã xảy ra và tại sao. Nếu repair quá nhanh và hời hợt, INFJ có thể nói "ổn rồi" nhưng vẫn âm thầm đánh giá lại độ an toàn của mối quan hệ.',
    selfAsk: 'Sau khi "làm hòa", bạn có thật sự cảm thấy mối quan hệ đã được khôi phục — hay bạn vẫn đang lặng lẽ quan sát xem có an toàn để mở lại không?',
    watchFor: 'Khi bạn nói "không sao đâu" nhưng bên trong vẫn giữ khoảng cách — đối phương nghĩ đã xong trong khi bạn vẫn đang chữa lành.',
  },
  {
    type: 'INFP',
    situation: 'repair',
    signal: 'Với INFP, hàn gắn cần bạn cảm thấy được hiểu — không phải được giải thích đúng/sai, mà được công nhận rằng cảm xúc và góc nhìn của bạn có giá trị.',
    insight: 'INFP không thể repair khi vẫn cảm thấy bị hiểu lầm về điều quan trọng với mình. Họ cần đối phương thật sự lắng nghe, không phải để phản biện mà để hiểu. Khi điều đó xảy ra, INFP có khả năng tha thứ sâu. Nhưng nếu bị push để "làm hòa" trước khi được hiểu, sự hòa giải đó thường không thật và vết nứt vẫn còn.',
    selfAsk: 'Khi bạn làm hòa với ai đó, điều gì khiến bạn cảm thấy "đã thật sự xong" — và bạn có nói cho họ biết bạn cần điều đó không?',
    watchFor: 'Khi bạn đồng ý làm hòa nhưng vẫn cảm thấy gì đó chưa ổn — thường là vì bạn chưa cảm thấy được hiểu, chỉ cảm thấy xung đột đã dừng.',
  },
  {
    type: 'ENFJ',
    situation: 'repair',
    signal: 'Với ENFJ, bạn thường là người chủ động hàn gắn — bạn không chịu được khoảng cách kéo dài, nên thường initiate repair sớm, đôi khi trước cả khi cảm xúc của mình được xử lý.',
    insight: 'ENFJ ưu tiên khôi phục sự kết nối và thường gánh vác trách nhiệm làm hòa. Đây là điểm mạnh, nhưng có mặt trái: ENFJ có thể repair quá nhanh để "kết thúc sự khó chịu" trong khi nhu cầu thật của họ chưa được nói ra. Theo thời gian, việc luôn là người làm hòa và luôn nhường có thể tích lũy thành sự mệt mỏi âm thầm.',
    selfAsk: 'Khi bạn chủ động làm hòa, bạn đang khôi phục kết nối thật — hay đang vội kết thúc sự căng thẳng vì nó khiến bạn khó chịu?',
    watchFor: 'Khi bạn luôn là người xin lỗi trước dù không phải lúc nào cũng là phía sai — đó là tín hiệu nhu cầu của bạn đang bị bỏ lại phía sau.',
  },
  {
    type: 'ENFP',
    situation: 'repair',
    signal: 'Với ENFP, hàn gắn thường đến qua sự ấm áp và mong muốn reconnect nhanh — bạn muốn xóa khoảng cách, ôm lấy nhau (theo nghĩa đen hoặc nghĩa bóng) và quay lại trạng thái kết nối.',
    insight: 'ENFP khó chịu với sự xa cách kéo dài — nên họ thường initiate reconnect bằng năng lượng ấm áp. Điều này tuyệt vời khi đối phương cùng nhịp, nhưng có thể vội với người cần thời gian. ENFP đôi khi muốn "đã ổn rồi nhé" trước khi vấn đề thật sự được xử lý, dẫn đến cùng một chuyện quay lại sau đó.',
    selfAsk: 'Khi bạn muốn reconnect nhanh sau xung đột, bạn có chắc vấn đề đã được nói đến đủ — hay bạn đang ưu tiên cảm giác kết nối hơn việc giải quyết?',
    watchFor: 'Khi bạn đã "ổn rồi" và đối phương vẫn cần nói thêm — họ có thể thấy bạn đang rush qua phần khó để về lại phần vui.',
  },

  // ─── SJ ───
  {
    type: 'ISTJ',
    situation: 'repair',
    signal: 'Với ISTJ, hàn gắn thường thể hiện qua hành động hơn lời nói — bạn quay lại làm tròn trách nhiệm, làm điều gì đó thiết thực, và khôi phục trật tự bình thường như cách nói "mình ổn lại rồi."',
    insight: 'ISTJ không tự nhiên với những cuộc trò chuyện "mình cần nói về cảm xúc" — họ repair bằng cách restore độ tin cậy và sự ổn định. Đối phương cần học cách đọc tín hiệu này. Nhưng với người cần verbal acknowledgment, sự im lặng repair của ISTJ có thể cảm giác chưa đủ — đôi khi một câu nói rõ cũng giúp ích nhiều.',
    selfAsk: 'Khi bạn muốn làm hòa qua hành động, đối phương có hiểu được ý nghĩa đằng sau — hay họ vẫn chờ một lời nói rõ ràng?',
    watchFor: 'Khi bạn đã quay lại bình thường nhưng đối phương vẫn dè dặt — họ có thể cần nghe bạn nói "anh/em ổn rồi", không chỉ thấy bạn hành động bình thường.',
  },
  {
    type: 'ISFJ',
    situation: 'repair',
    signal: 'Với ISFJ, hàn gắn thường đến qua chăm sóc — bạn nấu món họ thích, làm điều gì đó tử tế, hoặc đơn giản trở lại với sự ấm áp như cách nói "mình muốn ổn lại."',
    insight: 'ISFJ repair qua acts of care — đây là ngôn ngữ tự nhiên của họ. Nhưng ISFJ cũng có xu hướng "làm hòa bề mặt" trong khi vẫn giữ lại cảm xúc tổn thương bên trong, đặc biệt nếu họ cảm thấy mình là phía bị tổn thương. Sự dịu lại bên ngoài không phải lúc nào cũng có nghĩa là vết thương bên trong đã lành.',
    selfAsk: 'Khi bạn làm hòa bằng cách chăm sóc, bạn đã thật sự buông được tổn thương — hay bạn đang giữ nó lại trong khi vẫn tỏ ra ổn?',
    watchFor: 'Khi bạn dịu lại bên ngoài nhưng vẫn nhắc lại chuyện cũ sau này — đó là tín hiệu phần tổn thương chưa được nói ra và xử lý lần đầu.',
  },
  {
    type: 'ESTJ',
    situation: 'repair',
    signal: 'Với ESTJ, hàn gắn nghĩa là làm rõ ràng và đặt lại kỳ vọng — bạn muốn xác định điều gì cần thay đổi, thống nhất quy tắc đi tiếp, rồi coi vấn đề đã được xử lý.',
    insight: 'ESTJ repair bằng cách thiết lập sự rõ ràng và accountability — với họ, biết "lần sau mình làm thế nào" là cách khép lại vấn đề. Phần khó hơn là phần cảm xúc: ESTJ có thể giải quyết được "vấn đề" mà vẫn để lại cảm xúc chưa được chạm đến, và đối phương cần phần đó được acknowledge để cảm thấy thật sự xong.',
    selfAsk: 'Khi bạn làm rõ "lần sau mình làm thế nào" sau xung đột, bạn có dành chỗ cho việc đối phương cảm thấy thế nào — hay chỉ tập trung vào quy tắc đi tiếp?',
    watchFor: 'Khi bạn đã thống nhất giải pháp nhưng không khí vẫn nặng — đó thường là vì cảm xúc chưa được acknowledge, không phải vì giải pháp chưa đủ tốt.',
  },
  {
    type: 'ESFJ',
    situation: 'repair',
    signal: 'Với ESFJ, hàn gắn cần khôi phục cảm giác ấm áp trong mối quan hệ — bạn không chỉ cần vấn đề được giải quyết mà còn cần biết hai người vẫn "ổn với nhau" ở tầng cảm xúc.',
    insight: 'ESFJ repair qua sự reconnect cảm xúc và reassurance — họ cần cảm thấy mối quan hệ vẫn warm và an toàn sau xung đột. Họ thường chủ động làm hòa và check-in nhiều. Mặt trái: nhu cầu reassurance mạnh có thể khiến ESFJ tiếp tục "kiểm tra" sau khi đối phương đã coi chuyện là xong, tạo cảm giác chưa khép lại.',
    selfAsk: 'Sau khi làm hòa, điều bạn thật sự cần để cảm thấy yên tâm là gì — và đối phương có biết điều đó không?',
    watchFor: 'Khi bạn vẫn cần check "mình ổn rồi đúng không" nhiều lần — đối phương có thể thấy mệt vì với họ chuyện đã khép, trong khi bạn vẫn cần reassurance.',
  },

  // ─── SP ───
  {
    type: 'ISTP',
    situation: 'repair',
    signal: 'Với ISTP, hàn gắn thường đến qua việc quay lại làm việc bình thường cùng nhau — bạn không muốn dig up lại chuyện đã qua, và sự hiện diện trở lại là cách bạn nói "ổn rồi."',
    insight: 'ISTP repair bằng hành động và sự hiện diện, không bằng phân tích lại xung đột. Với họ, đào lại chuyện cũ thường khiến mọi thứ tệ hơn chứ không tốt hơn. Nhưng với người cần xử lý bằng lời, sự "move on im lặng" này có thể cảm giác như vấn đề bị bỏ qua thay vì được giải quyết.',
    selfAsk: 'Khi bạn muốn move on mà không nói lại về chuyện đã xảy ra, đối phương có thật sự cảm thấy đã xong — hay họ cần ít nhất một câu thừa nhận?',
    watchFor: 'Khi bạn đã quay lại bình thường nhưng đối phương vẫn muốn "nói cho rõ" — họ chưa khép được nếu chưa được xử lý bằng lời.',
  },
  {
    type: 'ISFP',
    situation: 'repair',
    signal: 'Với ISFP, hàn gắn thường đến qua những cử chỉ nhẹ nhàng hơn là lời nói — một hành động quan tâm, sự ấm áp trở lại, hoặc đơn giản là không còn rút lui nữa.',
    insight: 'ISFP cảm nhận xung đột sâu nhưng không giỏi diễn đạt bằng lời — nên repair của họ thường tinh tế và phi ngôn ngữ. Họ cần thời gian để cảm xúc lắng xuống trước khi có thể reconnect. Đối phương cần kiên nhẫn và đọc được những tín hiệu nhẹ thay vì chờ một cuộc trò chuyện thẳng thắn về xung đột.',
    selfAsk: 'Khi bạn muốn làm hòa, bạn thể hiện điều đó qua đâu — và đối phương có nhận ra được những tín hiệu nhẹ đó không?',
    watchFor: 'Khi bạn đã sẵn sàng reconnect bằng cử chỉ nhưng đối phương vẫn chờ lời nói — họ có thể bỏ lỡ tín hiệu hòa giải của bạn.',
  },
  {
    type: 'ESTP',
    situation: 'repair',
    signal: 'Với ESTP, hàn gắn đến nhanh và trực tiếp — bạn muốn address, clear, rồi quay lại làm điều gì đó vui cùng nhau, không để chuyện cũ kéo dài.',
    insight: 'ESTP repair bằng cách đối diện thẳng và reconnect qua action — với họ, kéo dài drama là lãng phí thời gian sống. Tốc độ này hiệu quả với người cùng nhịp nhưng có thể vội với người cần xử lý cảm xúc lâu hơn. ESTP đôi khi coi "đã nói rồi, xong" trong khi đối phương vẫn đang tiêu hóa.',
    selfAsk: 'Khi bạn muốn nhanh chóng quay lại "vui vẻ như cũ", đối phương đã sẵn sàng cùng bạn — hay họ vẫn cần thêm thời gian?',
    watchFor: 'Khi bạn đã chuyển sang hoạt động vui và đối phương vẫn lặng lẽ — họ có thể chưa khép được chuyện ở tốc độ của bạn.',
  },
  {
    type: 'ESFP',
    situation: 'repair',
    signal: 'Với ESFP, hàn gắn đến qua sự ấm áp và reconnect cảm xúc — bạn muốn xóa nhanh khoảng cách, làm lành bằng tình cảm, và quay lại trạng thái gần gũi.',
    insight: 'ESFP không chịu được sự lạnh nhạt kéo dài — họ thường initiate reconnect bằng năng lượng ấm áp và physical affection. Điều này giúp nhiều mối quan hệ phục hồi nhanh, nhưng cũng có thể bỏ qua phần xử lý vấn đề thật sự. ESFP đôi khi ưu tiên cảm giác "ổn lại" hơn việc đảm bảo chuyện không lặp lại.',
    selfAsk: 'Khi bạn vội xóa khoảng cách sau xung đột, vấn đề gốc đã được nói đến — hay bạn đang ưu tiên cảm giác gần gũi trở lại?',
    watchFor: 'Khi cùng một chuyện cứ lặp lại dù lần nào cũng "làm lành" được — đó là tín hiệu phần giải quyết vấn đề đang bị bỏ qua sau phần reconnect cảm xúc.',
  },

]

const APPRECIATION_CARDS: RelationshipCard[] = [

  // ─── NT ───
  {
    type: 'INTJ',
    situation: 'appreciation',
    signal: 'Với INTJ, bạn cảm thấy được trân trọng nhất khi ai đó công nhận tư duy và năng lực của bạn một cách cụ thể — không phải khen chung chung, mà thấy được điều bạn thật sự giỏi.',
    insight: 'INTJ ít coi trọng lời khen xã giao nhưng rất trân trọng sự công nhận có chiều sâu — khi ai đó thật sự hiểu giá trị của ý tưởng họ. Bản thân INTJ lại thường thể hiện tình cảm qua việc giải quyết vấn đề cho người kia hoặc đầu tư thời gian quý giá của mình. Đối phương cần học rằng "anh ấy/cô ấy dành thời gian cho mình" chính là tuyên ngôn tình cảm.',
    selfAsk: 'Bạn thể hiện sự quan tâm qua việc làm gì cho người thân — và họ có nhận ra đó là cách bạn nói "tôi quan tâm" không?',
    watchFor: 'Khi đối phương phàn nàn bạn "không nói lời yêu thương" — họ có thể đang không đọc được ngôn ngữ qua-hành-động của bạn, nhưng cũng có thể họ thật sự cần nghe bằng lời.',
  },
  {
    type: 'INTP',
    situation: 'appreciation',
    signal: 'Với INTP, bạn cảm nhận tình cảm rõ nhất qua những cuộc trò chuyện sâu — khi ai đó thật sự engage với ý tưởng của bạn và dành thời gian khám phá cùng bạn.',
    insight: 'INTP thể hiện và nhận tình cảm qua sự kết nối trí tuệ và thời gian chất lượng — một cuộc trò chuyện dài về điều thú vị với họ có giá trị hơn nhiều lời khen. Họ thường thể hiện care theo cách khó thấy: nghĩ giải pháp cho vấn đề của người kia, nhớ những chi tiết trí tuệ. Đối phương cần học đọc ngôn ngữ thầm lặng này.',
    selfAsk: 'Cách bạn thể hiện quan tâm với ai đó — họ có hiểu đó là tình cảm, hay họ cần một dạng biểu hiện rõ ràng hơn?',
    watchFor: 'Khi đối phương cảm thấy thiếu sự ấm áp dù bạn đang đầu tư nhiều suy nghĩ cho họ — có thể họ cần biểu hiện cụ thể hơn là sự quan tâm thầm lặng.',
  },
  {
    type: 'ENTJ',
    situation: 'appreciation',
    signal: 'Với ENTJ, bạn cảm thấy được trân trọng khi ai đó công nhận điều bạn đạt được và đứng cùng phía với tầm nhìn của bạn — sự tôn trọng và tin tưởng có giá trị hơn lời ngọt ngào.',
    insight: 'ENTJ trân trọng sự công nhận năng lực và lòng tin vào khả năng của họ — đó là ngôn ngữ tình cảm họ hiểu nhất. Họ thể hiện tình cảm qua việc đầu tư vào sự thành công của người kia: mở đường, giải quyết vấn đề, cung cấp nguồn lực. Đối phương cần hiểu rằng "anh ấy/cô ấy lo cho tương lai của mình" là một dạng yêu thương sâu.',
    selfAsk: 'Bạn thường thể hiện tình cảm bằng cách giúp người kia thành công hơn — họ có cảm nhận đó là tình yêu, hay họ cần thêm sự dịu dàng?',
    watchFor: 'Khi đối phương nói họ cần bạn "hiện diện" thay vì "giải quyết" — đó là tín hiệu họ cần một kênh tình cảm khác với kênh tự nhiên của bạn.',
  },
  {
    type: 'ENTP',
    situation: 'appreciation',
    signal: 'Với ENTP, bạn cảm thấy được trân trọng khi ai đó thấy được sự độc đáo trong cách bạn nghĩ và enjoy năng lượng của bạn — không cố làm bạn "ổn định lại" hay đóng khung bạn.',
    insight: 'ENTP trân trọng việc được chấp nhận trọn vẹn với sự tò mò và năng động của mình — bị nhìn nhận là "quá nhiều" làm họ tổn thương. Họ thể hiện tình cảm qua việc chia sẻ thế giới ý tưởng, kéo người kia vào những điều thú vị, và làm cuộc sống của họ phong phú hơn. Quà của ENTP thường là trải nghiệm và sự kích thích, không phải vật chất.',
    selfAsk: 'Cách bạn làm phong phú cuộc sống của người thân — họ có nhận ra đó là tình cảm, hay họ cần thêm sự ổn định và hiện diện đều đặn?',
    watchFor: 'Khi đối phương cần sự nhất quán hơn là sự thú vị — đó là dấu hiệu kênh tình cảm của bạn và họ đang khác nhau.',
  },

  // ─── NF ───
  {
    type: 'INFJ',
    situation: 'appreciation',
    signal: 'Với INFJ, bạn cảm thấy được trân trọng khi ai đó thấy con người thật của bạn — không phải vai trò bạn đóng, không phải những gì bạn làm cho họ, mà chính bạn.',
    insight: 'INFJ dành nhiều cho người khác và thường ít được nhìn thấy ngược lại — nên được ai đó thật sự "thấy mình" là ngôn ngữ tình cảm mạnh nhất với họ. Họ thể hiện tình cảm qua sự thấu hiểu sâu và lời nói có ý nghĩa. Đối phương cần biết rằng INFJ cần nghe rằng họ quan trọng, không chỉ rằng họ hữu ích.',
    selfAsk: 'Người thân của bạn trân trọng bạn vì bạn là ai, hay vì những gì bạn làm cho họ — và bạn có cảm nhận được sự khác biệt đó không?',
    watchFor: 'Khi bạn được cảm ơn nhiều vì "luôn ở đó cho mọi người" nhưng ít được hỏi "còn bạn thì sao" — đó là tín hiệu bạn đang được trân trọng vì vai trò hơn là con người.',
  },
  {
    type: 'INFP',
    situation: 'appreciation',
    signal: 'Với INFP, bạn cảm thấy được trân trọng qua những lời nói chân thành chạm vào điều quan trọng với bạn — và qua cảm giác được chấp nhận hoàn toàn như mình đang là.',
    insight: 'INFP trân trọng sự authenticity trong tình cảm — một lời khen sáo rỗng còn tệ hơn im lặng, nhưng một lời nói thật chạm đến giá trị của họ thì có sức nặng lớn. Họ thể hiện tình cảm qua sự quan tâm tinh tế và những cử chỉ mang ý nghĩa cá nhân. Số lượng không quan trọng bằng sự chân thật.',
    selfAsk: 'Loại lời nói hoặc cử chỉ nào khiến bạn cảm thấy thật sự được yêu thương — và đối phương có biết điều cụ thể đó không?',
    watchFor: 'Khi bạn nhận được nhiều biểu hiện tình cảm nhưng vẫn cảm thấy trống — có thể chúng không chạm vào điều thật sự có ý nghĩa với bạn.',
  },
  {
    type: 'ENFJ',
    situation: 'appreciation',
    signal: 'Với ENFJ, bạn cho đi tình cảm rất nhiều nhưng thường khó nhận lại — bạn cảm thấy được trân trọng nhất khi ai đó chủ động chăm sóc bạn mà không cần bạn yêu cầu.',
    insight: 'ENFJ thể hiện tình cảm qua sự chăm sóc và đầu tư vào người khác — nhưng họ thường ở vị trí người cho, ít khi được chăm sóc lại. Được ai đó nhận ra nhu cầu của mình và đáp ứng mà không cần mình lên tiếng là điều ENFJ khao khát nhưng hiếm khi nói ra. Họ cần học cách để người khác chăm sóc mình.',
    selfAsk: 'Lần gần nhất ai đó chăm sóc bạn theo cách bạn thường chăm sóc người khác — bạn có để họ làm điều đó, hay bạn gạt đi?',
    watchFor: 'Khi bạn luôn là người cho và thấy khó chịu khi nhận — đó là tín hiệu bạn đang chặn một kênh tình cảm quan trọng của chính mình.',
  },
  {
    type: 'ENFP',
    situation: 'appreciation',
    signal: 'Với ENFP, bạn cảm thấy được trân trọng qua sự nhiệt thành thật sự — khi ai đó hào hứng về bạn, về ý tưởng của bạn, và dành sự chú ý đầy đủ khi ở cùng bạn.',
    insight: 'ENFP trân trọng cả lời nói lẫn thời gian chất lượng — họ cần cảm thấy mình thú vị và được nhìn thấy thật sự. Sự chú ý hời hợt làm họ tổn thương hơn họ thể hiện. Họ cho đi tình cảm rộng rãi và ấm áp, và thường mong đợi sự đáp lại với cùng cường độ. Đối phương ít biểu cảm có thể vô tình khiến ENFP cảm thấy không đủ.',
    selfAsk: 'Khi bạn cảm thấy không được trân trọng đủ, đó là vì thiếu biểu hiện thật sự — hay vì đối phương thể hiện tình cảm theo cách khác bạn?',
    watchFor: 'Khi đối phương yêu bạn theo cách thầm lặng và bạn cần sự nhiệt thành rõ ràng — khoảng cách giữa hai kênh có thể khiến bạn nghi ngờ tình cảm dù nó vẫn ở đó.',
  },

  // ─── SJ ───
  {
    type: 'ISTJ',
    situation: 'appreciation',
    signal: 'Với ISTJ, bạn thể hiện và cảm nhận tình cảm qua hành động đáng tin cậy — làm tròn việc của mình, hỗ trợ thiết thực, và sự hiện diện ổn định nói nhiều hơn lời.',
    insight: 'ISTJ trân trọng acts of service và sự nhất quán — với họ, ai đó làm điều thiết thực cho mình đều đặn là biểu hiện tình cảm rõ nhất. Họ thể hiện tình cảm theo cùng cách: lo cho những điều cụ thể, có mặt khi cần, giữ lời. Họ có thể không nói "anh/em yêu em/anh" nhiều, nhưng họ thể hiện điều đó mỗi ngày qua những việc làm.',
    selfAsk: 'Những việc bạn làm để chăm lo cho người thân — họ có hiểu đó là cách bạn nói "tôi yêu bạn" không?',
    watchFor: 'Khi đối phương nói họ cần nghe lời yêu thương bằng lời — đó là một kênh khác với kênh hành động tự nhiên của bạn, và họ thật sự cần nó.',
  },
  {
    type: 'ISFJ',
    situation: 'appreciation',
    signal: 'Với ISFJ, bạn thể hiện tình cảm qua sự chăm sóc tỉ mỉ — và bạn cảm thấy được trân trọng nhất khi sự chăm sóc đó được nhận ra và cảm ơn, không bị coi là hiển nhiên.',
    insight: 'ISFJ cho đi qua hành động chăm sóc liên tục và thường âm thầm — nhưng họ rất cần sự công nhận. Cảm giác bị coi là "đương nhiên" là một trong những điều làm ISFJ tổn thương nhất. Họ ít khi đòi hỏi sự công nhận, nhưng nó nuôi dưỡng họ. Một lời cảm ơn cụ thể có sức nặng lớn hơn ISFJ thể hiện.',
    selfAsk: 'Khi sự chăm sóc của bạn không được nhận ra, bạn có nói ra điều đó — hay bạn âm thầm tổn thương và tiếp tục cho đi?',
    watchFor: 'Khi bạn bắt đầu cảm thấy oán giận vì "làm nhiều mà không ai để ý" — đó là tín hiệu bạn cần sự công nhận mà chưa nói ra nhu cầu đó.',
  },
  {
    type: 'ESTJ',
    situation: 'appreciation',
    signal: 'Với ESTJ, bạn thể hiện tình cảm qua việc gánh vác và bảo vệ — và cảm thấy được trân trọng khi sự đóng góp và trách nhiệm của bạn được công nhận.',
    insight: 'ESTJ thể hiện tình cảm qua acts of service ở quy mô lớn — lo cho gia đình, đảm bảo mọi thứ vận hành, gánh vác trách nhiệm. Họ trân trọng khi điều đó được ghi nhận, không bị coi là đương nhiên. Phần khó hơn với ESTJ là kênh cảm xúc trực tiếp — họ có thể cần nỗ lực để nói và nhận tình cảm bằng lời.',
    selfAsk: 'Bạn thể hiện tình yêu qua việc gánh vác cho người thân — bạn có dành chỗ cho những biểu hiện tình cảm mềm mại hơn không?',
    watchFor: 'Khi đối phương cần sự dịu dàng và hiện diện cảm xúc thay vì thêm sự lo toan thực tế — đó là kênh bạn ít quen, nhưng họ có thể đang cần nó.',
  },
  {
    type: 'ESFJ',
    situation: 'appreciation',
    signal: 'Với ESFJ, bạn cho đi tình cảm rộng rãi qua chăm sóc và lời nói ấm áp — và cảm thấy được trân trọng khi nhận lại sự ấm áp, lời cảm ơn, và dấu hiệu rằng bạn quan trọng.',
    insight: 'ESFJ vừa cho words of affirmation vừa cho acts of service — và họ cần nhận lại tương tự. Họ rất attuned với việc người khác có hài lòng không, và sự công nhận tình cảm nuôi dưỡng họ trực tiếp. Mặt cần để ý: ESFJ đôi khi gắn giá trị bản thân với việc được người khác hài lòng, nên thiếu công nhận có thể ảnh hưởng sâu hơn bề ngoài.',
    selfAsk: 'Khi bạn cần được trân trọng, bạn nói ra điều đó — hay bạn cho đi nhiều hơn với hy vọng được đáp lại?',
    watchFor: 'Khi tâm trạng của bạn phụ thuộc nhiều vào việc người khác có thể hiện sự trân trọng hay không — đó là tín hiệu giá trị bản thân đang gắn quá chặt với phản hồi bên ngoài.',
  },

  // ─── SP ───
  {
    type: 'ISTP',
    situation: 'appreciation',
    signal: 'Với ISTP, bạn thể hiện tình cảm qua hành động và sự hiện diện thực tế — sửa giúp một thứ, làm cùng một việc, ở đó khi cần, nói nhiều hơn bất kỳ lời nào.',
    insight: 'ISTP thể hiện care qua acts of service mang tính thực tế và qua việc dành thời gian làm điều gì đó cùng nhau. Họ không tự nhiên với lời nói tình cảm và có thể thấy verbal affection hơi gượng. Đối phương cần học đọc ngôn ngữ hành động này. Quality time với ISTP thường là cùng làm, không phải cùng nói.',
    selfAsk: 'Cách bạn ở cạnh và giúp đỡ người thân — họ có hiểu đó là tình cảm, hay họ cần một biểu hiện rõ ràng hơn?',
    watchFor: 'Khi đối phương cần nghe lời hoặc cần physical affection mà bạn thể hiện qua việc-làm — khoảng cách giữa hai ngôn ngữ có thể khiến họ cảm thấy thiếu.',
  },
  {
    type: 'ISFP',
    situation: 'appreciation',
    signal: 'Với ISFP, bạn thể hiện tình cảm qua những cử chỉ tinh tế và mang dấu ấn cá nhân — và cảm thấy được trân trọng khi ai đó để ý đến những điều nhỏ có ý nghĩa với bạn.',
    insight: 'ISFP thể hiện tình cảm qua sự chăm chút thẩm mỹ và những cử chỉ đầy ý nghĩa cá nhân — một bài hát, một món quà chọn kỹ, một khoảnh khắc đẹp được tạo ra. Họ cũng cảm nhận tình cảm qua physical presence và sự chấp nhận. Họ ít nói về cảm xúc nhưng cảm nhận rất sâu, nên sự tinh tế từ đối phương có giá trị lớn.',
    selfAsk: 'Những cử chỉ nhỏ bạn làm để thể hiện tình cảm — đối phương có nhận ra ý nghĩa đằng sau chúng không?',
    watchFor: 'Khi đối phương bỏ lỡ những tín hiệu tinh tế của bạn và bạn không nói ra — họ có thể không biết bạn đang thể hiện tình cảm.',
  },
  {
    type: 'ESTP',
    situation: 'appreciation',
    signal: 'Với ESTP, bạn thể hiện tình cảm qua trải nghiệm chung và sự hiện diện sôi nổi — rủ đi đâu đó, làm điều gì đó cùng nhau, tạo những khoảnh khắc đáng nhớ.',
    insight: 'ESTP thể hiện và nhận tình cảm qua quality time mang tính trải nghiệm và đôi khi qua physical touch. Họ sống trong hiện tại, nên những khoảnh khắc chung thật sự có giá trị với họ hơn lời hứa về tương lai. Đối phương cần hiểu rằng "đi cùng anh/em" là một lời mời vào thế giới tình cảm của ESTP.',
    selfAsk: 'Cách bạn rủ người thân vào trải nghiệm của mình — họ có hiểu đó là tình cảm, hay họ cần thêm những biểu hiện lặng lẽ hơn?',
    watchFor: 'Khi đối phương cần sự sâu lắng và hiện diện yên tĩnh thay vì năng lượng và hành động — đó là kênh khác với kênh tự nhiên của bạn.',
  },
  {
    type: 'ESFP',
    situation: 'appreciation',
    signal: 'Với ESFP, bạn cho đi tình cảm ấm áp và trực tiếp — qua lời nói, physical affection, và sự hiện diện đầy đủ; và bạn cảm nhận tình cảm rõ nhất khi nhận lại điều tương tự.',
    insight: 'ESFP thường thoải mái với nhiều kênh tình cảm cùng lúc — lời nói, tiếp xúc, thời gian chung. Họ cho đi rộng rãi và mong đợi sự đáp lại nồng nhiệt. Sự lạnh nhạt hoặc xa cách làm họ tổn thương rõ. Đối phương có style kín đáo hơn cần biết rằng ESFP cần biểu hiện tình cảm cụ thể để cảm thấy an tâm.',
    selfAsk: 'Khi bạn cảm thấy thiếu sự ấm áp, đó là vì đối phương thật sự xa cách — hay vì họ thể hiện tình cảm theo cách kín đáo hơn bạn?',
    watchFor: 'Khi bạn cần biểu hiện rõ ràng còn đối phương yêu theo cách thầm lặng — khoảng cách này có thể khiến bạn nghi ngờ dù tình cảm vẫn ở đó.',
  },

]

const ALONE_CARDS: RelationshipCard[] = [

  // ─── NT ───
  {
    type: 'INTJ',
    situation: 'alone',
    signal: 'Với INTJ, không gian một mình không phải lựa chọn mà là nhu cầu cơ bản — bạn cần thời gian không bị gián đoạn để suy nghĩ, và thiếu nó khiến bạn cạn kiệt nhanh.',
    insight: 'INTJ xử lý thế giới qua tư duy nội tâm sâu — họ cần khoảng lặng để làm điều đó, và sự gián đoạn liên tục làm họ kiệt sức hơn nhiều người nhận ra. Đây không phải từ chối người kia. Trong quan hệ, INTJ cần đối phương hiểu rằng thời gian một mình của họ nuôi dưỡng họ và làm họ trở thành phiên bản tốt hơn khi quay lại.',
    selfAsk: 'Khi bạn cần không gian, bạn có nói rõ với đối phương rằng đó là nhu cầu của bạn — hay bạn để họ tự suy diễn và lo lắng?',
    watchFor: 'Khi bạn rút vào không gian riêng mà không giải thích, đối phương dễ đọc nhầm là bạn đang xa cách hoặc giận — một câu nói rõ sẽ tránh được nhiều hiểu lầm.',
  },
  {
    type: 'INTP',
    situation: 'alone',
    signal: 'Với INTP, bạn cần nhiều không gian đầu óc — không chỉ ở một mình về thể chất mà cả không bị áp lực phải tương tác hoặc đáp ứng cảm xúc liên tục.',
    insight: 'INTP cần không gian để đi vào thế giới ý tưởng của mình mà không bị kéo ra. Áp lực phải "có mặt" về mặt cảm xúc liên tục làm họ mệt. Họ có thể ở cạnh người kia nhưng vẫn cần được "ở trong đầu mình." Đối phương cần hiểu rằng sự im lặng và rút vào suy nghĩ của INTP không phải là rút lui khỏi mối quan hệ.',
    selfAsk: 'Khi bạn cần thu mình vào suy nghĩ, đối phương có hiểu đó là cách bạn vận hành — hay họ cảm thấy bị bỏ rơi?',
    watchFor: 'Khi bạn "có mặt mà vắng mặt" — ngồi cùng nhưng tâm trí ở nơi khác — đối phương có thể cảm thấy cô đơn ngay cả khi bạn đang ở đó.',
  },
  {
    type: 'ENTJ',
    situation: 'alone',
    signal: 'Với ENTJ, không gian riêng thường là thời gian để làm việc, lập kế hoạch, và theo đuổi mục tiêu — bạn nạp lại bằng productivity nhiều hơn bằng nghỉ ngơi thụ động.',
    insight: 'ENTJ là người hướng ngoại nhưng vẫn cần không gian — thường để tập trung vào những dự án và mục tiêu quan trọng với họ. Họ recharge qua cảm giác tiến lên, không phải qua sự nhàn rỗi. Trong quan hệ, đối phương cần hiểu rằng khi ENTJ đầu tư vào công việc, đó không phải họ ưu tiên công việc hơn quan hệ — đó là cách họ vận hành.',
    selfAsk: 'Khi bạn dồn năng lượng vào mục tiêu cá nhân, đối phương có cảm thấy được ưu tiên trong những lúc khác — hay họ luôn ở sau công việc?',
    watchFor: 'Khi không gian "làm việc" của bạn lấn dần vào thời gian dành cho người thân — họ có thể bắt đầu cảm thấy mình ở vị trí thứ hai.',
  },
  {
    type: 'ENTP',
    situation: 'alone',
    signal: 'Với ENTP, không gian riêng thường là tự do để theo đuổi sự tò mò mới — bạn cần khoảng trống để khám phá ý tưởng và dự án mà không cần giải thích cho ai.',
    insight: 'ENTP cần sự tự do hơn là sự cô đơn — không gian để chạy theo những hứng thú mới mà không bị ràng buộc. Cảm giác bị "kiểm soát" hoặc phải báo cáo mọi thứ làm họ ngột ngạt. Đối phương cần hiểu rằng ENTP cần room to roam về mặt trí tuệ, và điều đó không có nghĩa là họ kém cam kết.',
    selfAsk: 'Khi bạn cần tự do khám phá, bạn có giúp đối phương hiểu rằng đó không phải sự xa cách — hay bạn chỉ biến mất rồi xuất hiện lại?',
    watchFor: 'Khi bạn theo đuổi hứng thú mới mà không thông tin gì, đối phương có thể cảm thấy bị bỏ lại — sự minh bạch nhẹ nhàng giú́p họ an tâm.',
  },

  // ─── NF ───
  {
    type: 'INFJ',
    situation: 'alone',
    signal: 'Với INFJ, không gian một mình là cách bạn phục hồi sau khi hấp thụ cảm xúc của người khác — bạn cần thời gian để tách cảm xúc của mình ra khỏi của mọi người xung quanh.',
    insight: 'INFJ hấp thụ năng lượng cảm xúc của môi trường một cách sâu sắc — và cần thời gian một mình để "giải nhiễm" và tìm lại chính mình. Đây là nhu cầu sống còn, không phải sự ích kỷ. Sau khi tương tác nhiều, INFJ có thể cần rút lui hoàn toàn một thời gian. Đối phương cần hiểu đây là cách INFJ duy trì khả năng kết nối sâu.',
    selfAsk: 'Khi bạn cần rút lui để phục hồi, bạn có cho đối phương biết đây là về nhu cầu nạp lại của bạn — không phải về họ?',
    watchFor: 'Khi bạn rút lui sau khi bị overwhelmed, đối phương có thể nghĩ họ đã làm gì sai — sự rõ ràng giúp họ không tự trách.',
  },
  {
    type: 'INFP',
    situation: 'alone',
    signal: 'Với INFP, không gian một mình là nơi bạn xử lý cảm xúc và quay về với thế giới nội tâm của mình — bạn cần thời gian này để hiểu bản thân đang cảm thấy gì.',
    insight: 'INFP có thế giới nội tâm phong phú cần được nuôi dưỡng trong yên tĩnh. Họ thường không biết mình cảm thấy gì cho đến khi có không gian để xử lý. Quá nhiều kích thích bên ngoài làm họ mất kết nối với chính mình. Đối phương cần hiểu rằng INFP rút vào không phải để xa rời mà để quay lại với phiên bản trọn vẹn hơn.',
    selfAsk: 'Khi bạn cần thời gian một mình để xử lý cảm xúc, đối phương có hiểu đây là nhu cầu của bạn — hay họ cảm thấy bị đẩy ra?',
    watchFor: 'Khi bạn rút vào trong và im lặng, đối phương dễ đọc nhầm là có chuyện gì với họ — một lời nhắn ngắn giúp họ yên tâm.',
  },
  {
    type: 'ENFJ',
    situation: 'alone',
    signal: 'Với ENFJ, bạn ít khi cho mình không gian riêng vì luôn hướng về người khác — nhưng bạn thật sự cần nó để không kiệt sức từ việc liên tục chăm lo cho mọi người.',
    insight: 'ENFJ thường khó cho phép bản thân thời gian một mình vì cảm giác có trách nhiệm với người khác. Nhưng thiếu không gian phục hồi, họ dễ rơi vào kiệt sức và oán giận âm thầm. Học cách rút lui để nạp lại — mà không cảm thấy tội lỗi — là điều quan trọng với ENFJ. Đối phương có thể giúp bằng cách chủ động khuyến khích họ chăm sóc bản thân.',
    selfAsk: 'Khi nào là lần cuối bạn dành thời gian cho riêng mình mà không cảm thấy có lỗi với ai đó?',
    watchFor: 'Khi bạn bắt đầu cảm thấy mệt mỏi và hơi oán giận dù không ai làm gì sai — đó là tín hiệu bạn đã cho đi quá nhiều mà chưa nạp lại.',
  },
  {
    type: 'ENFP',
    situation: 'alone',
    signal: 'Với ENFP, nhu cầu không gian riêng đến và đi thất thường — bạn yêu kết nối nhưng thỉnh thoảng cần rút vào để xử lý cảm xúc hoặc theo đuổi cảm hứng riêng.',
    insight: 'ENFP nạp lại chủ yếu qua kết nối, nhưng vẫn có những lúc cần rút vào — thường khi cảm xúc dồn nén hoặc khi có cảm hứng sáng tạo cần không gian. Vì ENFP thường rất hiện diện và ấm áp, sự rút lui đột ngột có thể làm đối phương bối rối. Nhịp điệu này là bình thường với ENFP nhưng cần được giải thích.',
    selfAsk: 'Khi bạn đột nhiên cần không gian sau giai đoạn rất kết nối, bạn có giải thích sự thay đổi đó — hay đối phương phải tự đoán?',
    watchFor: 'Khi bạn chuyển từ rất gần sang cần khoảng cách mà không báo trước, đối phương có thể nghĩ họ đã làm gì sai.',
  },

  // ─── SJ ───
  {
    type: 'ISTJ',
    situation: 'alone',
    signal: 'Với ISTJ, không gian riêng thường gắn với routine và sự yên tĩnh có cấu trúc — bạn nạp lại qua thời gian một mình làm những việc quen thuộc theo cách của mình.',
    insight: 'ISTJ phục hồi qua sự yên tĩnh và predictability — họ có những thói quen cá nhân giúp họ tái cân bằng. Điều làm ISTJ mệt không phải solitude mà là những đòi hỏi bất ngờ phá vỡ trật tự của họ. Trong quan hệ, đối phương cần tôn trọng những khoảng lặng có cấu trúc này thay vì coi chúng là sự lạnh nhạt.',
    selfAsk: 'Những khoảng thời gian yên tĩnh theo thói quen của bạn — đối phương có hiểu đó là cách bạn nạp lại không?',
    watchFor: 'Khi đối phương muốn lấp đầy mọi khoảng trống bằng tương tác, bạn có thể cảm thấy mệt — nhưng nếu không nói ra, họ sẽ tiếp tục.',
  },
  {
    type: 'ISFJ',
    situation: 'alone',
    signal: 'Với ISFJ, bạn hiếm khi đòi hỏi không gian riêng vì luôn ưu tiên người khác — nhưng bạn thật sự cần những khoảng lặng để phục hồi sau khi chăm lo cho mọi người.',
    insight: 'ISFJ thường đặt nhu cầu của người khác lên trước và quên mất nhu cầu nạp lại của chính mình. Họ cần thời gian yên tĩnh để phục hồi, nhưng thường thấy khó đòi hỏi điều đó vì sợ làm người khác thất vọng. Thiếu không gian này, ISFJ dễ kiệt sức âm thầm và tích lũy mệt mỏi mà không nói ra.',
    selfAsk: 'Khi bạn cần nghỉ ngơi, bạn có cho phép bản thân điều đó — hay bạn tiếp tục chăm lo cho mọi người đến khi cạn?',
    watchFor: 'Khi bạn bắt đầu cảm thấy quá tải nhưng vẫn không nói "tôi cần nghỉ" — đó là tín hiệu bạn đang bỏ qua nhu cầu của chính mình.',
  },
  {
    type: 'ESTJ',
    situation: 'alone',
    signal: 'Với ESTJ, không gian riêng thường là thời gian để xử lý công việc và trách nhiệm theo cách của mình — bạn recharge qua cảm giác kiểm soát và hoàn thành.',
    insight: 'ESTJ hướng ngoại nhưng vẫn cần khoảng riêng để xử lý những việc cần làm và lấy lại cảm giác trật tự. Họ thường không nghỉ ngơi theo nghĩa thụ động — họ nạp lại bằng cách giải quyết và tổ chức. Đối phương cần hiểu rằng những lúc ESTJ tập trung vào "việc của mình" là một phần nhịp điệu bình thường, không phải sự lạnh nhạt.',
    selfAsk: 'Khi bạn tập trung vào việc riêng để lấy lại cân bằng, đối phương có hiểu điều đó — hay họ cảm thấy bị gạt ra?',
    watchFor: 'Khi bạn dùng "việc cần làm" như cách mặc định để có không gian, đối phương có thể không phân biệt được lúc nào bạn thật sự bận và lúc nào bạn cần riêng tư.',
  },
  {
    type: 'ESFJ',
    situation: 'alone',
    signal: 'Với ESFJ, bạn nạp lại chủ yếu qua kết nối, nhưng vẫn cần những lúc riêng để không kiệt sức từ việc liên tục lo cho người khác và đọc cảm xúc xung quanh.',
    insight: 'ESFJ là người hướng ngoại lấy năng lượng từ tương tác, nhưng họ cũng dễ over-extend vì luôn chú ý đến nhu cầu của mọi người. Thỉnh thoảng họ cần rút lui để không cạn kiệt. Vì ESFJ thường rất hiện diện, nhu cầu không gian này có thể bất ngờ với đối phương. Học cách nói "tôi cần chút thời gian" mà không thấy có lỗi là điều quan trọng.',
    selfAsk: 'Khi bạn cần một chút thời gian cho riêng mình, bạn có nói ra — hay bạn tiếp tục cho đến khi quá tải?',
    watchFor: 'Khi bạn bắt đầu thấy mệt từ việc lo cho mọi người nhưng vẫn không cho mình nghỉ — đó là tín hiệu bạn đang bỏ qua giới hạn của chính mình.',
  },

  // ─── SP ───
  {
    type: 'ISTP',
    situation: 'alone',
    signal: 'Với ISTP, không gian riêng là nhu cầu lớn và không thương lượng — bạn cần sự tự do để làm việc của mình theo nhịp của mình, và cảm thấy ngột ngạt khi bị bám sát.',
    insight: 'ISTP coi trọng sự độc lập cao — họ cần không gian vật lý và tinh thần để theo đuổi sở thích và xử lý mọi thứ một mình. Cảm giác bị "giám sát" hoặc phải báo cáo làm họ rút lui mạnh. Đối phương cần hiểu rằng cho ISTP không gian không phải là mất kết nối — ngược lại, nó là điều kiện để ISTP có thể ở lại thoải mái.',
    selfAsk: 'Đối phương có hiểu rằng nhu cầu không gian của bạn là về cách bạn vận hành, không phải về mức độ bạn quan tâm đến họ không?',
    watchFor: 'Khi bạn rút lui để có không gian mà không nói gì, đối phương dễ đọc nhầm là bạn đang xa rời — dù với bạn đó chỉ là nhu cầu bình thường.',
  },
  {
    type: 'ISFP',
    situation: 'alone',
    signal: 'Với ISFP, không gian riêng là nơi bạn quay về với cảm xúc và thế giới riêng của mình — bạn cần thời gian một mình để xử lý và tìm lại sự cân bằng nội tâm.',
    insight: 'ISFP cần không gian để kết nối lại với cảm xúc và sở thích của mình — họ xử lý nội tâm và cần yên tĩnh để làm điều đó. Bị đòi hỏi phải tương tác hoặc giải thích cảm xúc liên tục làm họ cạn kiệt. Họ thường lặng lẽ rút lui khi cần, và đối phương cần học cách cho họ khoảng trống đó mà không lo lắng.',
    selfAsk: 'Khi bạn cần rút vào để xử lý cảm xúc, bạn có cho đối phương một dấu hiệu rằng bạn sẽ quay lại — hay bạn chỉ lặng lẽ biến mất?',
    watchFor: 'Khi bạn cần không gian và im lặng rút lui, đối phương có thể cảm thấy bị đẩy ra — một tín hiệu nhỏ rằng bạn vẫn ổn sẽ giúp họ yên tâm.',
  },
  {
    type: 'ESTP',
    situation: 'alone',
    signal: 'Với ESTP, không gian riêng thường là sự tự do để hành động và di chuyển — bạn nạp lại qua hoạt động và trải nghiệm hơn là qua sự yên tĩnh.',
    insight: 'ESTP ít cần solitude theo kiểu yên lặng — họ recharge qua action, stimulation và sự tự do làm điều mình muốn. Điều làm ESTP ngột ngạt không phải là thiếu thời gian một mình mà là cảm giác bị bó buộc, bị lên lịch quá dày, hoặc bị kiểm soát. Đối phương cần hiểu rằng ESTP cần room to move, không phải room to be alone.',
    selfAsk: 'Khi bạn cần sự tự do để hành động, đối phương có hiểu đó là cách bạn nạp lại — hay họ cảm thấy bị bỏ lại phía sau?',
    watchFor: 'Khi bạn cần "đi đâu đó làm gì đó" để giải tỏa, đối phương có thể nghĩ bạn đang trốn tránh họ thay vì hiểu đó là cách bạn cân bằng.',
  },
  {
    type: 'ESFP',
    situation: 'alone',
    signal: 'Với ESFP, bạn nạp lại chủ yếu qua kết nối và trải nghiệm, nhưng cũng có những lúc cần rút vào khi cảm xúc trở nên nặng nề và bạn cần xử lý một mình.',
    insight: 'ESFP lấy năng lượng từ con người và trải nghiệm, nhưng khi cảm xúc tiêu cực dồn lại, họ có thể cần rút vào — điều này bất ngờ với cả họ lẫn người xung quanh vì bình thường họ rất sôi nổi. Sự rút lui của ESFP thường là tín hiệu họ đang xử lý điều gì đó khó, không phải họ hết quan tâm. Họ thường quay lại với năng lượng bình thường sau khi xử lý xong.',
    selfAsk: 'Khi bạn đột nhiên cần rút vào dù bình thường rất sôi nổi, bạn có cho đối phương biết bạn đang xử lý chuyện gì đó — hay họ phải tự đoán?',
    watchFor: 'Khi bạn im lặng rút lui sau giai đoạn vui vẻ, đối phương dễ hoảng vì sự thay đổi đột ngột — một lời giải thích ngắn giúp họ hiểu.',
  },

]

const GROWTH_CARDS: RelationshipCard[] = [

  // ─── NT ───
  {
    type: 'INTJ',
    situation: 'growth',
    signal: 'Với INTJ, bạn kỳ vọng một mối quan hệ thúc đẩy tư duy của mình — bạn muốn đối phương đủ sắc để thách thức ý tưởng của bạn, không phải chỉ đồng ý với mọi điều.',
    insight: 'INTJ trân trọng người có thể đứng ngang hàng về mặt trí tuệ và đẩy họ suy nghĩ sâu hơn — sự đồng thuận dễ dàng làm họ chán. Họ muốn cùng nhau phát triển theo hướng có chủ đích. Mặt cần để ý: INTJ đôi khi áp tiêu chuẩn cao của mình lên đối phương và quên rằng người kia có thể có định nghĩa phát triển khác.',
    selfAsk: 'Khi bạn muốn đối phương "phát triển", đó là theo hướng họ chọn — hay theo tiêu chuẩn bạn đặt ra cho họ?',
    watchFor: 'Khi đối phương cảm thấy như đang bị đánh giá theo chuẩn của bạn thay vì được hỗ trợ theo hướng của họ — đó là tín hiệu kỳ vọng đang thành áp lực.',
  },
  {
    type: 'INTP',
    situation: 'growth',
    signal: 'Với INTP, bạn kỳ vọng một mối quan hệ tôn trọng sự độc lập trí tuệ của mình — bạn muốn được tự do khám phá và suy nghĩ mà không bị áp đặt phải phát triển theo lịch của ai.',
    insight: 'INTP coi sự phát triển là điều cá nhân và tự định hướng — họ muốn đối phương là người cùng khám phá, không phải người quản lý sự tiến bộ của họ. Áp lực phải "phát triển" theo cách người khác kỳ vọng làm họ phản kháng. Họ phát triển tốt nhất khi được chấp nhận và có không gian, không phải khi bị push.',
    selfAsk: 'Trong quan hệ, điều gì khiến bạn cảm thấy được hỗ trợ phát triển — và điều gì khiến bạn cảm thấy như đang bị quản lý?',
    watchFor: 'Khi đối phương muốn bạn thay đổi theo timeline của họ, bạn có xu hướng rút vào và trì hoãn nhiều hơn — đôi khi cần nói ra nhịp độ thật của mình.',
  },
  {
    type: 'ENTJ',
    situation: 'growth',
    signal: 'Với ENTJ, bạn kỳ vọng một mối quan hệ nơi cả hai cùng tiến lên — bạn muốn đối phương có tham vọng và mục tiêu của riêng họ, không phải đứng yên trong khi bạn phát triển.',
    insight: 'ENTJ thường nhìn quan hệ như một liên minh hướng tới mục tiêu chung — họ trân trọng đối phương có drive và direction riêng. Mặt cần để ý: ENTJ có thể vô tình áp đặt định nghĩa "thành công" của mình lên đối phương, hoặc trở thành người liên tục "tối ưu hóa" mối quan hệ. Đôi khi điều quan hệ cần không phải là phát triển mà là sự hiện diện.',
    selfAsk: 'Khi bạn muốn đối phương "phát triển hơn", bạn có chắc đó là điều họ muốn — hay đó là điều bạn muốn cho họ?',
    watchFor: 'Khi đối phương cảm thấy không bao giờ "đủ tốt" so với kỳ vọng phát triển của bạn — đó là tín hiệu sự thúc đẩy đã thành áp lực.',
  },
  {
    type: 'ENTP',
    situation: 'growth',
    signal: 'Với ENTP, bạn kỳ vọng một mối quan hệ giữ được sự thú vị và liên tục mở ra điều mới — sự trì trệ và lặp lại làm bạn bồn chồn hơn hầu hết mọi người.',
    insight: 'ENTP cần cảm giác mối quan hệ vẫn đang sống và phát triển — họ enjoy cùng nhau khám phá ý tưởng, thử điều mới, thách thức lẫn nhau. Mặt cần để ý: ENTP đôi khi nhầm "ổn định" với "nhàm chán" và có thể tạo ra sự xáo trộn không cần thiết chỉ để giữ mọi thứ thú vị. Sự ổn định không phải lúc nào cũng là dấu hiệu của sự đình trệ.',
    selfAsk: 'Khi mối quan hệ trở nên ổn định, bạn coi đó là nền tảng vững chắc — hay là dấu hiệu của sự nhàm chán cần phá vỡ?',
    watchFor: 'Khi bạn tạo ra sự xáo trộn để "giữ mọi thứ thú vị", đối phương có thể cảm thấy mất an toàn — đôi khi sự bình yên là điều quan hệ cần.',
  },

  // ─── NF ───
  {
    type: 'INFJ',
    situation: 'growth',
    signal: 'Với INFJ, bạn kỳ vọng cùng nhau phát triển về chiều sâu — bạn muốn một mối quan hệ nơi cả hai tiến hóa về sự thấu hiểu, giá trị và ý nghĩa, không chỉ song song tồn tại.',
    insight: 'INFJ nhìn quan hệ như một không gian cho sự tiến hóa chung — họ trân trọng người sẵn sàng nhìn vào bên trong và phát triển cùng. Mặt cần để ý: INFJ có thể có một hình ảnh lý tưởng về "chúng ta nên trở thành gì" và thất vọng khi thực tế không khớp. Đôi khi đối phương phát triển theo cách khác với hình dung của INFJ, và điều đó vẫn ổn.',
    selfAsk: 'Hình dung của bạn về việc "cùng nhau phát triển" — đối phương có chia sẻ tầm nhìn đó, hay đó chủ yếu là kỳ vọng của bạn?',
    watchFor: 'Khi bạn thất vọng vì đối phương không phát triển theo hướng bạn hình dung — đó có thể là khoảng cách giữa lý tưởng của bạn và con người thật của họ.',
  },
  {
    type: 'INFP',
    situation: 'growth',
    signal: 'Với INFP, bạn kỳ vọng một mối quan hệ ủng hộ sự phát triển đích thực của mình — không phải ép bạn thành ai khác, mà giúp bạn trở thành phiên bản chân thật hơn của chính mình.',
    insight: 'INFP coi phát triển là việc sống đúng với giá trị và bản chất của mình ngày càng trọn vẹn hơn. Họ muốn đối phương ủng hộ điều đó, không phải áp đặt một hình mẫu. INFP nhạy cảm với cảm giác bị muốn thay đổi thành người khác. Họ phát triển tốt nhất trong sự chấp nhận, và phản kháng khi cảm thấy bị "sửa chữa".',
    selfAsk: 'Trong quan hệ, bạn cảm thấy được ủng hộ là chính mình hơn — hay được kỳ vọng trở thành một phiên bản khác?',
    watchFor: 'Khi bạn cảm thấy phải bảo vệ con người thật của mình trong quan hệ — đó là tín hiệu sự chấp nhận có thể đang thiếu.',
  },
  {
    type: 'ENFJ',
    situation: 'growth',
    signal: 'Với ENFJ, bạn tự nhiên muốn giúp đối phương phát triển — nhưng kỳ vọng này đôi khi nghiêng về việc bạn đầu tư vào sự trưởng thành của họ nhiều hơn họ yêu cầu.',
    insight: 'ENFJ có bản năng nuôi dưỡng và phát triển người khác — họ thấy tiềm năng và muốn giúp người kia đạt tới nó. Mặt cần để ý: ranh giới giữa "hỗ trợ phát triển" và "muốn thay đổi người kia theo hình dung của mình" có thể mờ. Đôi khi đối phương chỉ muốn được chấp nhận như họ đang là, không phải được "phát triển".',
    selfAsk: 'Khi bạn giúp đối phương phát triển, đó là điều họ chủ động muốn — hay là điều bạn thấy tốt cho họ?',
    watchFor: 'Khi đối phương phản kháng sự giúp đỡ của bạn — có thể họ đang cảm thấy bị thay đổi thay vì được chấp nhận.',
  },
  {
    type: 'ENFP',
    situation: 'growth',
    signal: 'Với ENFP, bạn kỳ vọng một mối quan hệ truyền cảm hứng và mở ra khả năng — bạn muốn cùng nhau khám phá, mơ ước, và trở thành phiên bản tốt hơn qua sự kết nối.',
    insight: 'ENFP nhìn quan hệ như một nguồn cảm hứng và khả năng — họ muốn cùng người kia mơ về điều có thể và ủng hộ nhau theo đuổi nó. Mặt cần để ý: ENFP có thể yêu "tiềm năng" của một người hoặc một mối quan hệ hơn thực tế của nó, và thất vọng khi thực tế không bắt kịp giấc mơ. Sự phát triển thật thường chậm hơn sự hứng khởi.',
    selfAsk: 'Khi bạn hào hứng về việc "chúng ta có thể trở thành gì", bạn có đang yêu con người thật của họ — hay phiên bản lý tưởng bạn hình dung?',
    watchFor: 'Khi sự hào hứng ban đầu nguội đi vì thực tế không khớp với hình dung — đó có thể là khoảng cách giữa tiềm năng bạn thấy và con người họ đang là.',
  },

  // ─── SJ ───
  {
    type: 'ISTJ',
    situation: 'growth',
    signal: 'Với ISTJ, bạn coi phát triển là sự cải thiện ổn định và có kiểm soát — bạn kỳ vọng một mối quan hệ vững chắc trước, rồi mới nói đến chuyện thay đổi và phát triển.',
    insight: 'ISTJ trân trọng sự ổn định như nền tảng — với họ, phát triển nên là quá trình từ từ và đáng tin, không phải những thay đổi lớn đột ngột. Họ kỳ vọng đối phương cũng đáng tin và nhất quán. Mặt cần để ý: sự ưu tiên ổn định của ISTJ có thể khiến họ kháng lại những thay đổi mà đối phương cần, và "cách mình vẫn làm" không phải lúc nào cũng là cách tốt nhất.',
    selfAsk: 'Khi đối phương muốn thay đổi điều gì đó trong quan hệ, phản ứng đầu tiên của bạn là cân nhắc — hay là bảo vệ cách mọi thứ vẫn vậy?',
    watchFor: 'Khi đối phương cảm thấy mọi đề xuất thay đổi đều gặp sự kháng cự — đó là tín hiệu sự ưu tiên ổn định của bạn có thể đang chặn sự phát triển họ cần.',
  },
  {
    type: 'ISFJ',
    situation: 'growth',
    signal: 'Với ISFJ, bạn kỳ vọng một mối quan hệ phát triển qua sự chăm sóc và gắn bó sâu dần theo thời gian — sự ổn định và an toàn quan trọng hơn sự thay đổi nhanh.',
    insight: 'ISFJ coi phát triển là sự gắn bó ngày càng sâu và sự chăm sóc lẫn nhau ngày càng tốt hơn. Họ ưu tiên giữ gìn những gì tốt đẹp hơn là theo đuổi điều mới. Mặt cần để ý: ISFJ có thể hy sinh sự phát triển của bản thân để duy trì sự ổn định cho mối quan hệ, và đôi khi giữ mọi thứ "như cũ" ngay cả khi sự thay đổi sẽ tốt cho cả hai.',
    selfAsk: 'Khi nghĩ về phát triển trong quan hệ, bạn có tính đến sự phát triển của riêng mình — hay chủ yếu là giữ gìn và chăm lo cho mối quan hệ?',
    watchFor: 'Khi bạn liên tục đặt sự ổn định của quan hệ lên trên nhu cầu phát triển của bản thân — đó là tín hiệu bạn có thể đang bỏ quên chính mình.',
  },
  {
    type: 'ESTJ',
    situation: 'growth',
    signal: 'Với ESTJ, bạn kỳ vọng phát triển có mục tiêu rõ ràng và kết quả đo được — bạn muốn cả hai cùng tiến bộ một cách thực tế, không phải mơ hồ.',
    insight: 'ESTJ tiếp cận phát triển như tiếp cận mục tiêu: cụ thể, có kế hoạch, có trách nhiệm. Họ kỳ vọng đối phương cũng nghiêm túc về việc cải thiện. Mặt cần để ý: cách tiếp cận thực tế này có thể bỏ lỡ phần phát triển cảm xúc và tinh thần khó đo được. Không phải mọi sự phát triển trong quan hệ đều có thể đặt thành mục tiêu và kiểm tra tiến độ.',
    selfAsk: 'Khi bạn nghĩ về phát triển trong quan hệ, bạn có dành chỗ cho những thay đổi không đo được — như sự thấu hiểu hay gần gũi cảm xúc?',
    watchFor: 'Khi bạn tiếp cận sự phát triển của quan hệ như một dự án cần quản lý, đối phương có thể cảm thấy bị đánh giá thay vì được đồng hành.',
  },
  {
    type: 'ESFJ',
    situation: 'growth',
    signal: 'Với ESFJ, bạn kỳ vọng cùng nhau phát triển trong sự hòa hợp — bạn muốn một mối quan hệ nơi cả hai cùng tiến lên mà vẫn giữ được sự ấm áp và kết nối.',
    insight: 'ESFJ coi phát triển là điều nên xảy ra cùng nhau và trong sự đồng thuận — họ không thoải mái với sự phát triển tạo ra khoảng cách hoặc xung đột. Họ thường đầu tư vào việc giúp cả hai và những người xung quanh cùng tốt lên. Mặt cần để ý: ESFJ có thể tránh những thay đổi cần thiết nếu chúng đe dọa sự hòa hợp ngắn hạn.',
    selfAsk: 'Khi sự phát triển đòi hỏi một cuộc trò chuyện khó hoặc một thay đổi gây xáo trộn, bạn có sẵn sàng — hay bạn ưu tiên giữ hòa khí?',
    watchFor: 'Khi bạn tránh nêu ra điều cần thay đổi vì sợ làm mất hòa khí — đó là tín hiệu sự hòa hợp đang được ưu tiên hơn sự phát triển thật.',
  },

  // ─── SP ───
  {
    type: 'ISTP',
    situation: 'growth',
    signal: 'Với ISTP, bạn kỳ vọng được tự do phát triển theo cách riêng của mình — bạn không muốn một mối quan hệ liên tục "làm việc về bản thân" hay đặt ra agenda phát triển chung.',
    insight: 'ISTP coi phát triển là việc cá nhân và thực tế — họ học và thay đổi qua trải nghiệm, không qua những cuộc trò chuyện về "chúng ta cần phát triển thế nào". Áp lực phải liên tục cải thiện mối quan hệ làm họ ngột ngạt. Họ trân trọng đối phương cho họ không gian để là chính mình và tin vào quá trình tự nhiên của họ.',
    selfAsk: 'Trong quan hệ, điều gì khiến bạn cảm thấy được tôn trọng cách phát triển riêng — và điều gì khiến bạn cảm thấy bị push?',
    watchFor: 'Khi đối phương muốn liên tục "nói về mối quan hệ" và cải thiện nó, bạn có xu hướng rút lui — đôi khi cần cho họ biết bạn vận hành khác.',
  },
  {
    type: 'ISFP',
    situation: 'growth',
    signal: 'Với ISFP, bạn kỳ vọng một mối quan hệ cho bạn không gian để phát triển theo nhịp riêng — bạn thay đổi qua trải nghiệm và cảm nhận, không qua áp lực hay kế hoạch.',
    insight: 'ISFP phát triển một cách hữu cơ và theo cảm nhận — họ cần sự tự do để khám phá và thay đổi theo cách của mình. Bị áp đặt một hướng phát triển hoặc một timeline làm họ phản kháng lặng lẽ. Họ trân trọng đối phương chấp nhận con người hiện tại của họ trong khi vẫn cho họ room để trở thành.',
    selfAsk: 'Khi bạn phát triển theo nhịp riêng, đối phương có kiên nhẫn với điều đó — hay họ muốn bạn thay đổi nhanh hơn?',
    watchFor: 'Khi bạn cảm thấy bị thúc phải phát triển theo cách của người khác, bạn có xu hướng rút lui thầm lặng thay vì nói ra sự khó chịu.',
  },
  {
    type: 'ESTP',
    situation: 'growth',
    signal: 'Với ESTP, bạn coi phát triển là điều xảy ra qua hành động và trải nghiệm thực tế — bạn kỳ vọng một mối quan hệ năng động, không phải một mối quan hệ liên tục phân tích bản thân.',
    insight: 'ESTP phát triển qua việc làm, thử, và trải nghiệm trực tiếp — họ ít kiên nhẫn với những cuộc trò chuyện dài về cảm xúc và sự phát triển. Họ muốn một mối quan hệ sống động và thực tế. Mặt cần để ý: cách tiếp cận hành động này đôi khi bỏ qua phần phát triển cảm xúc mà mối quan hệ cần để bền vững.',
    selfAsk: 'Khi mối quan hệ cần một cuộc trò chuyện sâu về cảm xúc thay vì một hoạt động chung, bạn có sẵn sàng ở lại với nó không?',
    watchFor: 'Khi bạn chuyển hướng từ những cuộc trò chuyện cảm xúc sang hành động, đối phương có thể cảm thấy phần sâu của quan hệ đang bị né tránh.',
  },
  {
    type: 'ESFP',
    situation: 'growth',
    signal: 'Với ESFP, bạn kỳ vọng một mối quan hệ phát triển qua những trải nghiệm chung và niềm vui — bạn muốn cùng nhau lớn lên mà không biến mọi thứ thành quá nặng nề.',
    insight: 'ESFP coi phát triển là điều nên đi kèm với niềm vui và sự sống động — họ học và thay đổi qua trải nghiệm và kết nối, không qua sự nghiêm trọng hóa. Mặt cần để ý: ESFP đôi khi tránh những cuộc trò chuyện khó hoặc những phần phát triển đòi hỏi đối diện với điều không thoải mái, vì xu hướng giữ mọi thứ nhẹ nhàng.',
    selfAsk: 'Khi sự phát triển đòi hỏi đối diện với điều khó chịu, bạn có ở lại với nó — hay bạn chuyển hướng về điều vui vẻ hơn?',
    watchFor: 'Khi bạn dùng niềm vui để tránh những phần nặng nề nhưng cần thiết, đối phương có thể cảm thấy không thể đi sâu cùng bạn.',
  },

]

const DEALBREAKER_CARDS: RelationshipCard[] = [

  // ─── NT ───
  {
    type: 'INTJ',
    situation: 'dealbreaker',
    signal: 'Với INTJ, điều khó chấp nhận nhất thường là bị coi thường về mặt trí tuệ — bị bác bỏ ý kiến mà không lắng nghe, hoặc bị đối xử như thể suy nghĩ của bạn không quan trọng.',
    insight: 'INTJ đầu tư sâu vào tư duy của mình — nên sự thiếu tôn trọng trí tuệ chạm vào điều cốt lõi với họ. Họ cũng khó chấp nhận sự thiếu nhất quán giữa lời nói và hành động, hoặc người không chịu suy nghĩ độc lập. Đây là về hành vi cụ thể, không phải về việc người kia "kém". Hiểu ranh giới này giúp INTJ biết mình thật sự cần gì.',
    selfAsk: 'Ranh giới nào của bạn xuất phát từ giá trị thật sự — và ranh giới nào có thể chỉ là tiêu chuẩn quá cao bạn đang áp lên người khác?',
    watchFor: 'Khi bạn dismiss ai đó nhanh vì họ không đạt chuẩn trí tuệ của bạn — đôi khi đó là ranh giới thật, đôi khi là sự thiếu kiên nhẫn cần xem lại.',
  },
  {
    type: 'INTP',
    situation: 'dealbreaker',
    signal: 'Với INTP, điều khó chấp nhận nhất thường là bị áp đặt và mất tự do tư duy — bị đòi hỏi phải tin điều gì đó không có lý, hoặc bị kiểm soát cách mình suy nghĩ và sống.',
    insight: 'INTP cần sự tự do trí tuệ và không gian cá nhân như điều kiện cơ bản. Sự kiểm soát, áp đặt niềm tin, hoặc đòi hỏi cảm xúc liên tục mà không cho không gian là những điều chạm vào ranh giới của họ. Đây là về kiểu tương tác cụ thể, không phải về việc đối phương là người tốt hay xấu.',
    selfAsk: 'Ranh giới nào với bạn là thật sự không thể thương lượng — và đâu là chỗ bạn có thể linh hoạt mà không mất chính mình?',
    watchFor: 'Khi bạn coi mọi đòi hỏi về sự hiện diện cảm xúc là "kiểm soát" — đôi khi đó là nhu cầu hợp lý của đối phương, không phải vi phạm ranh giới.',
  },
  {
    type: 'ENTJ',
    situation: 'dealbreaker',
    signal: 'Với ENTJ, điều khó chấp nhận nhất thường là sự thiếu trung thực và thiếu năng lực giữ cam kết — bạn không thể tin một người nói một đằng làm một nẻo.',
    insight: 'ENTJ vận hành dựa trên sự tin cậy và trách nhiệm — nên sự thiếu nhất quán, không giữ lời, hoặc thiếu drive làm họ mất niềm tin. Họ cũng khó với những người không tôn trọng thời gian và năng lực của họ. Đây là về hành vi cụ thể có thể quan sát, không phải về giá trị con người. Biết ranh giới này giúp ENTJ chọn đúng người để đầu tư.',
    selfAsk: 'Khi bạn coi điều gì đó là không thể chấp nhận, đó là vi phạm giá trị thật sự — hay là người kia không đáp ứng tiêu chuẩn hiệu suất của bạn?',
    watchFor: 'Khi bạn đánh giá đối phương qua "năng lực" trong những việc không phải về năng lực — đó là chỗ tiêu chuẩn của bạn có thể đang lấn vào vùng không phù hợp.',
  },
  {
    type: 'ENTP',
    situation: 'dealbreaker',
    signal: 'Với ENTP, điều khó chấp nhận nhất thường là sự đóng kín và cứng nhắc — một người không chịu nghe góc nhìn khác, không có sự tò mò, hoặc cố làm bạn nhỏ lại.',
    insight: 'ENTP cần sự cởi mở và không gian để là chính mình với tất cả năng lượng và ý tưởng. Sự kiểm soát, óc bảo thủ tuyệt đối, hoặc nỗ lực "thuần hóa" họ chạm vào ranh giới. Họ cũng khó với sự nhàm chán và thiếu kích thích trí tuệ kéo dài. Đây là về kiểu tương tác, không phải về việc người kia có giá trị hay không.',
    selfAsk: 'Đâu là ranh giới thật sự của bạn — và đâu là lúc bạn gọi sự ổn định là "nhàm chán" để biện minh cho việc muốn rời đi?',
    watchFor: 'Khi bạn dán nhãn "cứng nhắc" cho người chỉ đơn giản cần sự ổn định — đó là chỗ cần phân biệt ranh giới thật với sự bồn chồn của bản thân.',
  },

  // ─── NF ───
  {
    type: 'INFJ',
    situation: 'dealbreaker',
    signal: 'Với INFJ, điều khó chấp nhận nhất thường là sự giả dối và thiếu chiều sâu — một người không sống thật với chính mình, hoặc liên tục làm tổn thương người khác mà không thấy vấn đề.',
    insight: 'INFJ trân trọng sự authenticity và đạo đức sâu sắc — nên sự giả tạo, thao túng, hoặc thiếu lương tâm chạm vào ranh giới cốt lõi của họ. Họ cũng khó duy trì với sự hời hợt kéo dài. Đây là về hành vi cụ thể quan sát được. Khi INFJ nhận ra ranh giới này, họ thường đã cho rất nhiều cơ hội trước đó.',
    selfAsk: 'Ranh giới của bạn dựa trên hành vi thật của người kia — hay dựa trên hình ảnh lý tưởng bạn từng có về họ và giờ thất vọng?',
    watchFor: 'Khi bạn "đóng cửa" với ai đó hoàn toàn và đột ngột — đảm bảo đó là phản ứng với hành vi thật, không phải với khoảng cách giữa họ và lý tưởng của bạn.',
  },
  {
    type: 'INFP',
    situation: 'dealbreaker',
    signal: 'Với INFP, điều khó chấp nhận nhất thường là sự thiếu chân thật và bị xâm phạm giá trị cốt lõi — bị đòi hỏi phải phản bội điều mình tin, hoặc bị invalidate liên tục về cảm xúc.',
    insight: 'INFP gắn bản thân sâu với giá trị và sự authenticity — nên việc bị ép sống trái với chính mình, hoặc bị coi nhẹ những điều có ý nghĩa với mình, chạm vào ranh giới nền tảng. Họ cũng khó với sự độc ác hoặc thiếu lòng trắc ẩn. Đây là về hành vi cụ thể, không phải về việc gắn nhãn người kia.',
    selfAsk: 'Khi điều gì đó cảm thấy không thể chấp nhận, đó là vi phạm giá trị thật của bạn — hay là sự khác biệt mà bạn đang coi là vi phạm?',
    watchFor: 'Khi bạn coi mọi bất đồng về giá trị là deal-breaker — đôi khi đó là ranh giới thật, đôi khi là sự khó chấp nhận người khác mình.',
  },
  {
    type: 'ENFJ',
    situation: 'dealbreaker',
    signal: 'Với ENFJ, điều khó chấp nhận nhất thường là sự thiếu trân trọng và bị lợi dụng — cho đi rất nhiều nhưng gặp người chỉ nhận mà không bao giờ đáp lại hoặc ghi nhận.',
    insight: 'ENFJ đầu tư sâu vào người khác — nên bị coi là đương nhiên, bị lợi dụng lòng tốt, hoặc gặp sự vô ơn kéo dài chạm vào ranh giới của họ. Họ cũng khó với sự độc ác với người yếu thế. Mặt cần để ý: ENFJ đôi khi chịu đựng quá lâu trước khi thừa nhận ranh giới đã bị vi phạm, vì xu hướng muốn "cứu" mối quan hệ.',
    selfAsk: 'Khi một mối quan hệ liên tục lấy đi nhiều hơn cho lại, bạn có nhận ra ranh giới đã bị vượt qua — hay bạn tiếp tục cho với hy vọng nó sẽ thay đổi?',
    watchFor: 'Khi bạn biết một mối quan hệ không lành mạnh nhưng vẫn ở lại vì nghĩ mình có thể thay đổi nó — đó là chỗ lòng tốt của bạn có thể đang chống lại chính bạn.',
  },
  {
    type: 'ENFP',
    situation: 'dealbreaker',
    signal: 'Với ENFP, điều khó chấp nhận nhất thường là sự kìm hãm và thiếu chân thật — bị làm cho nhỏ lại, bị kiểm soát, hoặc gặp người sống giả tạo và thiếu lòng tốt.',
    insight: 'ENFP cần sự tự do để là chính mình và trân trọng sự authenticity sâu sắc. Sự kiểm soát, thao túng, hoặc nỗ lực dập tắt năng lượng và lý tưởng của họ chạm vào ranh giới. Họ cũng khó với sự độc ác và thiếu trắc ẩn. Đây là về hành vi cụ thể quan sát được, không phải về việc người kia có đáng giá hay không.',
    selfAsk: 'Đâu là ranh giới thật sự về giá trị của bạn — và đâu là lúc cảm giác "bị kìm hãm" thật ra là nhu cầu hợp lý của đối phương về sự cam kết?',
    watchFor: 'Khi bạn coi mọi giới hạn hoặc kỳ vọng là "kìm hãm tự do" — đôi khi đó là vi phạm thật, đôi khi là sự né tránh cam kết bình thường.',
  },

  // ─── SJ ───
  {
    type: 'ISTJ',
    situation: 'dealbreaker',
    signal: 'Với ISTJ, điều khó chấp nhận nhất thường là sự thiếu đáng tin và không giữ lời — một người liên tục thất hứa, vô trách nhiệm, hoặc không tôn trọng cam kết.',
    insight: 'ISTJ xây dựng quan hệ trên sự tin cậy và trách nhiệm — nên sự thiếu nhất quán, không giữ lời, hoặc vô trách nhiệm với những điều quan trọng chạm vào ranh giới nền tảng của họ. Trong VN context, sự thiếu tôn trọng gia đình và trách nhiệm chung cũng nặng. Đây là về hành vi cụ thể, có thể quan sát qua thời gian.',
    selfAsk: 'Ranh giới của bạn về sự đáng tin cậy là thật sự cần thiết — hay đôi khi bạn quá cứng nhắc về cách người khác phải làm mọi thứ?',
    watchFor: 'Khi bạn coi cách làm khác mình là "vô trách nhiệm" — cần phân biệt giữa sự thiếu đáng tin thật và sự khác biệt về phong cách.',
  },
  {
    type: 'ISFJ',
    situation: 'dealbreaker',
    signal: 'Với ISFJ, điều khó chấp nhận nhất thường là sự bội bạc và thiếu tôn trọng những gì bạn đã cho — gặp người coi sự chăm sóc của bạn là đương nhiên, hoặc phản bội lòng tin.',
    insight: 'ISFJ cho đi nhiều và âm thầm — nên sự vô ơn, bội bạc, hoặc lợi dụng lòng tốt chạm sâu vào ranh giới của họ. Sự thiếu tôn trọng với gia đình và những giá trị họ giữ cũng nặng trong VN context. Mặt cần để ý: ISFJ thường chịu đựng rất lâu và ít nói ra trước khi ranh giới thật sự bị vi phạm.',
    selfAsk: 'Khi một mối quan hệ liên tục làm bạn tổn thương, bạn có cho phép mình thừa nhận điều đó — hay bạn tiếp tục chịu đựng và hy vọng?',
    watchFor: 'Khi bạn tích lũy tổn thương âm thầm thay vì nói ra ranh giới sớm — đến lúc bạn rời đi, đối phương có thể không hiểu chuyện gì đã xảy ra.',
  },
  {
    type: 'ESTJ',
    situation: 'dealbreaker',
    signal: 'Với ESTJ, điều khó chấp nhận nhất thường là sự thiếu trách nhiệm và bất tôn trọng — một người không gánh phần của mình, không giữ lời, hoặc coi thường các cam kết chung.',
    insight: 'ESTJ coi trọng trách nhiệm, trật tự và cam kết — nên sự vô trách nhiệm, thiếu tôn trọng, hoặc không đáng tin chạm vào ranh giới của họ. Trong VN context, sự thiếu tôn trọng gia đình và nghĩa vụ chung cũng quan trọng. Đây là về hành vi cụ thể. Mặt cần để ý: ESTJ đôi khi nhầm "không làm theo cách của tôi" với "vô trách nhiệm".',
    selfAsk: 'Khi bạn coi điều gì đó là không thể chấp nhận, đó là vi phạm trách nhiệm thật — hay là người kia làm khác cách bạn cho là đúng?',
    watchFor: 'Khi bạn áp tiêu chuẩn "phải làm thế này" lên những việc có thể làm nhiều cách — đó là chỗ ranh giới thật và sự cứng nhắc dễ lẫn vào nhau.',
  },
  {
    type: 'ESFJ',
    situation: 'dealbreaker',
    signal: 'Với ESFJ, điều khó chấp nhận nhất thường là sự lạnh nhạt và thiếu tôn trọng trong mối quan hệ — bị đối xử vô tâm, bị coi nhẹ, hoặc gặp người không quan tâm đến cảm xúc của bạn.',
    insight: 'ESFJ đầu tư vào sự ấm áp và kết nối — nên sự lạnh lùng kéo dài, vô tâm, hoặc thiếu tôn trọng tình cảm chạm vào ranh giới của họ. Sự thiếu tôn trọng gia đình và vòng tròn xã hội cũng nặng. Mặt cần để ý: ESFJ đôi khi chịu đựng sự đối xử không tốt vì sợ mất mối quan hệ hoặc sợ làm xáo trộn sự hòa hợp.',
    selfAsk: 'Khi bạn bị đối xử không tốt, bạn có thừa nhận ranh giới đã bị vượt qua — hay bạn cố giữ hòa khí và bỏ qua?',
    watchFor: 'Khi bạn liên tục bào chữa cho sự đối xử không tốt để giữ mối quan hệ — đó là tín hiệu nỗi sợ mất kết nối đang lấn át ranh giới của bạn.',
  },

  // ─── SP ───
  {
    type: 'ISTP',
    situation: 'dealbreaker',
    signal: 'Với ISTP, điều khó chấp nhận nhất thường là sự kiểm soát và mất tự do — bị giám sát, bị đòi hỏi báo cáo mọi thứ, hoặc bị tước đi không gian cá nhân.',
    insight: 'ISTP coi sự độc lập là điều kiện cơ bản — nên sự kiểm soát, bám dính quá mức, hoặc đòi hỏi cảm xúc liên tục mà không cho không gian chạm vào ranh giới của họ. Họ cũng khó với drama không cần thiết và sự thiếu thực tế. Đây là về kiểu tương tác cụ thể, không phải về việc đối phương là người thế nào.',
    selfAsk: 'Đâu là nhu cầu tự do thật sự của bạn — và đâu là lúc bạn gọi sự gần gũi bình thường là "kiểm soát" để giữ khoảng cách?',
    watchFor: 'Khi bạn coi mọi nhu cầu kết nối của đối phương là "bám dính" — cần phân biệt giữa sự kiểm soát thật và nhu cầu gần gũi hợp lý.',
  },
  {
    type: 'ISFP',
    situation: 'dealbreaker',
    signal: 'Với ISFP, điều khó chấp nhận nhất thường là bị ép buộc và mất sự tự chủ — bị kiểm soát cách sống, bị coi nhẹ giá trị, hoặc bị đối xử thiếu tôn trọng.',
    insight: 'ISFP cần sự tự do để sống đúng với giá trị và bản chất của mình — nên sự kiểm soát, áp đặt, hoặc thiếu tôn trọng cách họ là chạm vào ranh giới nền tảng. Họ cũng khó với sự độc ác và thiếu lòng tốt. Mặt cần để ý: ISFP thường tránh xung đột đến khi không chịu được, rồi rút lui đột ngột — nên ranh giới có thể bị vi phạm lâu trước khi họ hành động.',
    selfAsk: 'Khi điều gì đó vượt ranh giới của bạn, bạn có nói ra sớm — hay bạn im lặng chịu đựng đến khi phải rời đi?',
    watchFor: 'Khi bạn tích lũy sự khó chịu trong im lặng rồi rút lui đột ngột — đối phương có thể không hiểu ranh giới nào đã bị vượt qua.',
  },
  {
    type: 'ESTP',
    situation: 'dealbreaker',
    signal: 'Với ESTP, điều khó chấp nhận nhất thường là sự gò bó và thiếu trung thực — bị kiểm soát quá mức, bị bó buộc, hoặc gặp người không thẳng thắn và chơi trò tâm lý.',
    insight: 'ESTP cần sự tự do hành động và trân trọng sự thẳng thắn — nên sự kiểm soát, gò bó, hoặc thao túng vòng vo chạm vào ranh giới của họ. Họ cũng khó với sự thiếu sức sống và drama kéo dài. Đây là về hành vi cụ thể. Mặt cần để ý: ESTP đôi khi nhầm nhu cầu cam kết bình thường với sự "gò bó".',
    selfAsk: 'Đâu là ranh giới thật sự của bạn về tự do — và đâu là lúc cảm giác "bị gò bó" thật ra là sự né tránh cam kết?',
    watchFor: 'Khi bạn gọi mọi kỳ vọng về sự ổn định là "gò bó" — cần phân biệt giữa sự kiểm soát thật và nhu cầu cam kết hợp lý của đối phương.',
  },
  {
    type: 'ESFP',
    situation: 'dealbreaker',
    signal: 'Với ESFP, điều khó chấp nhận nhất thường là sự lạnh lùng và kiểm soát — bị đối xử vô cảm, bị làm cho cảm thấy "quá nhiều", hoặc bị tước đi sự sống động và niềm vui.',
    insight: 'ESFP cần sự ấm áp, tự do, và được chấp nhận trọn vẹn — nên sự lạnh lùng kéo dài, kiểm soát, hoặc nỗ lực làm họ "trầm xuống" chạm vào ranh giới của họ. Họ cũng khó với sự độc ác và phán xét. Mặt cần để ý: ESFP đôi khi tránh đối diện với vấn đề thật trong quan hệ vì xu hướng giữ mọi thứ nhẹ nhàng.',
    selfAsk: 'Khi điều gì đó thật sự sai trong mối quan hệ, bạn có đối diện với nó — hay bạn chuyển hướng về điều vui vẻ và để vấn đề tích lại?',
    watchFor: 'Khi bạn tránh thừa nhận một ranh giới bị vi phạm vì không muốn làm mọi thứ nặng nề — vấn đề không biến mất, chỉ tích lại cho đến khi bùng.',
  },

]

export const RELATIONSHIP_CARDS: RelationshipCard[] = [
  ...CONFLICT_CARDS,
  ...INTIMACY_CARDS,
  ...ATTACHMENT_CARDS,
  ...REPAIR_CARDS,
  ...APPRECIATION_CARDS,
  ...ALONE_CARDS,
  ...GROWTH_CARDS,
  ...DEALBREAKER_CARDS,
]

export function getCard(
  type: MBTIType,
  situation: SituationKey,
): RelationshipCard | undefined {
  return RELATIONSHIP_CARDS.find((c) => c.type === type && c.situation === situation)
}

export function getCardsForType(type: MBTIType): RelationshipCard[] {
  return RELATIONSHIP_CARDS.filter((c) => c.type === type)
}

export const AVAILABLE_SITUATIONS: SituationKey[] = [
  'conflict',
  'intimacy',
  'attachment',
  'repair',
  'appreciation',
  'alone',
  'growth',
  'dealbreaker',
]
