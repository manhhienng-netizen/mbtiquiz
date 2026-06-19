// parent-roleplay-b.ts
// Task 3 — ROLE-PLAY B "LÀ BỐ/MẸ MỘT LÚC" ⭐ ("Hiểu Bố Mẹ") · 15 case
// Content agent · 17/06/2026 · brief Master duyệt 02:12
// CHOICELESS — reveal TĨNH, KHÔNG MCQ, KHÔNG dialogue AI · pairWithA khớp A01-A15
// reveal 60-80 chữ · "có thể/thường/nhiều người thế hệ đó" — KHÔNG nói-hộ-bố-mẹ-như-chắc
// G2: kết về HIỂU BỐI CẢNH, KHÔNG về ĐỒNG TÌNH quyết định
// G4: nỗi sợ "mình đã sai" → "họ đang mang điều đó một mình", KHÔNG "vậy bố mẹ sai rồi"
// G5: checkIn KHÔNG bao giờ kết "nếu không được thì giữ khoảng cách"
// G6 ⭐: guilt-trip (im lặng trừng phạt / làm con thấy có lỗi) → để NGỎ, KHÔNG gom thành "vì thương"
// MA PM review (G1-G6 sống còn) trước khi wire

export interface ParentRolePlayB {
  id: string
  pairWithA: string
  group: 'PRESSURE' | 'UNHEARD' | 'OVERWORRY' | 'DISTANCE' | 'OTHER'
  title: string
  hook: string
  setup: string
  reveal: string
  noiSo: string
  checkIn: string
}

export const PARENT_ROLEPLAY_B: ParentRolePlayB[] = [
  // ═══════════════ PRESSURE (B01–B03) ═══════════════
  {
    id: 'RP_PARENT_B_01',
    pairWithA: 'RP_PARENT_A_01',
    group: 'PRESSURE',
    title: 'Tấm bản đồ cũ',
    hook: 'Bạn là bố/mẹ. Con vừa nói nó muốn theo một hướng đi bạn thấy bấp bênh.',
    setup: 'Bạn nhìn con và thấy lại chính mình thời trẻ — những năm phải lo từng bữa. Bạn không có chữ nào để nói nỗi sợ đó, nên buột ra: "Làm cái nghề đó thì sau này sống bằng gì?"',
    reveal: 'Nhiều người thế hệ đó lớn lên trong thời mà ổn định là chuyện sống còn, không phải một lựa chọn. Khi họ ép con theo con đường an toàn, thường không phải vì coi nhẹ ước muốn của con — mà vì họ đang bảo vệ con bằng tấm bản đồ duy nhất họ có. Hiểu được tấm bản đồ đó không có nghĩa là con phải đi theo nó.',
    noiSo: 'Sợ rằng nếu con chọn sai, họ không còn đủ sức đỡ con thêm một lần nữa.',
    checkIn: 'Thử hỏi bố/mẹ về thời họ trẻ — họ từng sợ điều gì nhất về chuyện tiền nong, công việc. Có khi câu trả lời nói cho bạn biết nỗi lo hôm nay đến từ đâu.',
  },
  {
    id: 'RP_PARENT_B_02',
    pairWithA: 'RP_PARENT_A_02',
    group: 'PRESSURE',
    title: 'Sợ con một mình',
    hook: 'Bạn là bố/mẹ. Họ hàng vừa về, bạn lại hỏi con chuyện cưới xin.',
    setup: 'Bạn không định giục cho bằng được. Nhưng mỗi lần nghĩ tới lúc mình không còn nữa, một nỗi lo dâng lên — và nó bật ra thành câu: "Con tính bao giờ?"',
    reveal: 'Câu "lấy chồng/vợ đi" thường không hẳn về hôn nhân. Với nhiều người thế hệ trước, nó có thể là cách nói một nỗi sợ khó gọi tên: sợ con cô đơn, và sợ một ngày họ không còn ở đó để lo cho con nữa. Họ giục bằng cái ngôn ngữ duy nhất họ biết — dù điều thật bên dưới mềm hơn câu nói nhiều.',
    noiSo: 'Sợ con sẽ một mình khi họ không còn đó để trông chừng.',
    checkIn: 'Lần tới khi bị giục, thử hỏi nhẹ: "Bố/mẹ lo điều gì khi thấy con chưa cưới?" — và nghe xem điều thật nằm ở đâu, thay vì chỉ nghe câu giục.',
  },
  {
    id: 'RP_PARENT_B_03',
    pairWithA: 'RP_PARENT_A_03',
    group: 'PRESSURE',
    title: 'Niềm tin không giải thích được',
    hook: 'Bạn là bố/mẹ. Con vừa báo một bước đi lớn, và bạn thấy ruột gan nóng ran.',
    setup: 'Bạn không phản đối để cản con. Bạn chỉ thấy quá nhiều rủi ro mà con chưa thấy. Bạn muốn nói cho rõ, nhưng cuối cùng chỉ thốt ra được: "Ở yên đây không tốt hơn sao?"',
    reveal: 'Khi bố mẹ nói "nghe lời bố/mẹ đi", đôi khi điều thật bên dưới là: "Tôi không biết giải thích sao cho con hiểu — nhưng tôi tin đây là đúng." Niềm tin đó hình thành từ một thế giới khác, nơi liều lĩnh có thể trả giá đắt. Hiểu vì sao họ lo không có nghĩa là quyết định của con sai — chỉ là họ đang nhìn nó qua một lăng kính cũ.',
    noiSo: 'Sợ con bước hụt vào một thế giới mà họ không còn hiểu để bảo vệ con.',
    checkIn: 'Thử kể cho bố/mẹ nghe bạn đã cân nhắc những gì — không phải để xin phép, mà để họ thấy bạn không hề liều, và bớt phải lo một mình.',
  },

  // ═══════════════ UNHEARD (B04–B06) ═══════════════
  {
    id: 'RP_PARENT_B_04',
    pairWithA: 'RP_PARENT_A_04',
    group: 'UNHEARD',
    title: 'Hai ngôn ngữ',
    hook: 'Bạn là bố/mẹ. Con đang giải thích điều gì đó, và bạn thấy mình không theo kịp.',
    setup: 'Con nói về "được chọn", về "điều con muốn". Bạn nghe mà thấy lạ — hồi bạn bằng tuổi con, đâu có cái gọi là chọn. Bạn ngắt lời, không phải vì không quan tâm, mà vì bạn không biết đáp thế nào.',
    reveal: 'Cái mà ta hay gọi là "bố mẹ không chịu nghe" nhiều khi không phải vậy. Đó có thể là hai người đang nói hai thứ ngôn ngữ: một bên lớn lên với "phải lo cho chắc", một bên với "được chọn điều mình muốn". Không hẳn ai cố tình không nghe — mà cả hai đang thiếu một người phiên dịch giữa hai thế giới.',
    noiSo: 'Sợ rằng nếu công nhận thế giới của con, họ phải thừa nhận thế giới của mình đã lỗi thời.',
    checkIn: 'Thử diễn lại điều bạn muốn nói bằng ngôn ngữ của họ — bằng chuyện cụ thể, chuyện thực tế — rồi xem họ có nghe được khác đi không.',
  },
  {
    id: 'RP_PARENT_B_05',
    pairWithA: 'RP_PARENT_A_05',
    group: 'UNHEARD',
    title: 'Thương kiểu dạy dỗ',
    hook: 'Bạn là bố/mẹ. Con vừa kể một chuyện, và bạn lập tức muốn khuyên.',
    setup: 'Con kể, bạn nghe được vài câu thì lo. Phản xạ của bạn là chỉ cho con cách đúng — vì với bạn, dạy con tránh sai chính là thương. Bạn không nhận ra con chỉ đang muốn được kể.',
    reveal: 'Nhiều người thế hệ trước được nuôi lớn bằng một ý niệm: thương con là dạy con, là chỉ cho con đường đúng. Khi họ biến câu chuyện của con thành bài giảng, thường không phải vì xem nhẹ con — mà vì đó là cách duy nhất họ biết để thể hiện rằng họ quan tâm. Họ chưa từng được làm mẫu cho một kiểu thương chỉ cần lắng nghe.',
    noiSo: 'Sợ rằng nếu không dạy, không nhắc, họ đã không làm tròn vai một người cha, người mẹ.',
    checkIn: 'Lần tới, thử nói trước: "Con kể chuyện này, bố/mẹ nghe giúp con thôi nhé." Cho họ biết lần này, lắng nghe đã là cách thương rồi.',
  },
  {
    id: 'RP_PARENT_B_06',
    pairWithA: 'RP_PARENT_A_06',
    group: 'UNHEARD',
    title: 'Phép tính cũ',
    hook: 'Bạn là bố/mẹ. Con vừa chạm tới một chuyện nặng, và bạn thấy mình lúng túng.',
    setup: 'Con mở lòng về một điều khó. Bạn không biết đỡ thế nào — chỗ đó với bạn xa lạ. Thế là bạn lái sang chuyện quen thuộc hơn, hoặc nhắc tới "con người ta", để tìm lại mặt đất dưới chân.',
    reveal: 'Khi bố mẹ so sánh con với người khác, nhiều khi đó không phải để con thấy mình kém. Với người từng sống qua thiếu thốn, "con người ta hơn" có thể là một tín hiệu báo động cũ — một phép tính để đo xem con có "an toàn" không. Họ đang chạy lại một phản xạ sinh tồn, không phải cố tình làm con đau.',
    noiSo: 'Sợ rằng con đang tụt lại, và họ không kịp nhận ra để kéo con lên.',
    checkIn: 'Thử nói cho bố/mẹ biết câu so sánh làm bạn thấy thế nào — và kể họ nghe bạn đang cố gắng theo cách của riêng bạn ra sao.',
  },

  // ═══════════════ OVERWORRY (B07–B09) ═══════════════
  {
    id: 'RP_PARENT_B_07',
    pairWithA: 'RP_PARENT_A_07',
    group: 'OVERWORRY',
    title: 'Cái lo không tắt',
    hook: 'Bạn là bố/mẹ. Đã gọi cho con mấy lần hôm nay, mà vẫn thấy chưa yên.',
    setup: 'Bạn biết con bận, biết mình gọi nhiều. Nhưng cứ chưa nghe tiếng con là trong ngực lại nhói lên một nỗi bất an cũ. Bạn bấm gọi thêm lần nữa.',
    reveal: 'Lo lắng kiểu này có thể đến từ một cái đầu từng phải lo sinh tồn — nơi mọi thứ có thể mất trong một ngày, và phản xạ đó chưa tắt. Cũng có khi, gọi nhiều là cách họ giữ con ở gần. Bạn không cần quyết ngay nó là gì. Nhưng cũng đừng vội gom mọi cuộc gọi về một chữ "thương" — có nỗi lo nói về con người thật của bạn hôm nay, có nỗi lo thì không.',
    noiSo: 'Sợ rằng nếu lơi ra một chút, điều mình sợ nhất sẽ xảy ra đúng vào lúc mình không trông chừng.',
    checkIn: 'Thử cho bố/mẹ một điểm hẹn chắc chắn — "mỗi tối con gọi kể chuyện trong ngày". Nếu có điểm tựa đó mà họ vẫn gọi dồn, thì đó là điều đáng được nói thẳng ra, nhẹ nhàng.',
  },
  {
    id: 'RP_PARENT_B_08',
    pairWithA: 'RP_PARENT_A_08',
    group: 'OVERWORRY',
    title: 'Thế giới từng nguy hiểm',
    hook: 'Bạn là bố/mẹ. Con định làm một việc, và bạn lập tức gạt đi: "Đừng, nguy hiểm lắm."',
    setup: 'Với con, đó là chuyện bình thường. Với bạn, mọi rủi ro đều thật, vì bạn từng sống qua những lúc một sơ sẩy nhỏ trả giá rất lớn. Bạn phản ứng mạnh trước cả khi kịp nghĩ.',
    reveal: 'Câu "đừng làm, nguy hiểm" của nhiều người thế hệ trước thường vọng ra từ một thời mà thế giới đã thật sự nguy hiểm với họ. Phản xạ cảnh giác đó được rèn từ những năm khó khăn, và nó không tự tắt chỉ vì hoàn cảnh đã đổi. Hiểu phản xạ đó từ đâu ra không có nghĩa là con phải sống nhỏ lại theo nó.',
    noiSo: 'Sợ mất con theo đúng cái cách mà thời của họ, người ta vẫn mất nhau.',
    checkIn: 'Thử cho bố/mẹ thấy bạn đã lường trước an toàn thế nào — không phải để xin phép, mà để cái phản xạ cảnh giác của họ có một chỗ bám thực tế và dịu xuống.',
  },
  {
    id: 'RP_PARENT_B_09',
    pairWithA: 'RP_PARENT_A_09',
    group: 'OVERWORRY',
    title: 'Hỏi vòng vì không biết hỏi thẳng',
    hook: 'Bạn là bố/mẹ. Bạn muốn biết con dạo này thế nào, nhưng lại đi hỏi người khác.',
    setup: 'Bạn lo, nhưng ngại hỏi thẳng con — sợ con thấy phiền, sợ chạm vào chuyện con không muốn nói. Thế là bạn dò la qua họ hàng, qua bạn bè con, để yên tâm hơn một chút.',
    reveal: 'Hỏi vòng thường không phải để soi con. Với người chưa quen hỏi thẳng về cảm xúc, đi đường vòng có thể là cách an toàn duy nhất họ biết để biết con có ổn không. Họ thiếu một thứ ngôn ngữ mà thời của họ không ai dạy: cách hỏi thẳng "con đang thế nào trong lòng?" mà không thấy ngượng.',
    noiSo: 'Sợ rằng nếu hỏi thẳng, con sẽ đóng cửa lại — nên thà hỏi vòng còn hơn không biết gì.',
    checkIn: 'Thử chủ động kể cho bố/mẹ một ít về cuộc sống của bạn, trước khi họ phải đi hỏi người khác. Khi được nghe thẳng từ bạn, họ bớt phải đi đường vòng.',
  },

  // ═══════════════ DISTANCE (B10–B12) ═══════════════
  {
    id: 'RP_PARENT_B_10',
    pairWithA: 'RP_PARENT_A_10',
    group: 'DISTANCE',
    title: 'Nấu ăn thay vì nói',
    hook: 'Bạn là bố/mẹ. Con vừa về thăm sau mấy tháng.',
    setup: 'Con ngồi đó. Bạn muốn nói nhiều thứ — nhưng không biết bắt đầu từ đâu. Bạn đứng dậy, vào bếp, nấu món con thích.',
    reveal: 'Nhiều người lớn lên trong thế hệ thiếu thốn không được dạy cách nói "bố/mẹ nhớ con" hay "bố/mẹ thương con". Không phải họ không cảm thấy — mà chưa bao giờ có ai làm mẫu cho họ cách nói ra. Gian bếp là nơi họ biết cách yêu. Mâm cơm là câu họ không thốt được thành lời.',
    noiSo: 'Sợ rằng nếu nói thẳng ra, nó sẽ thành lạ lẫm — hoặc con sẽ không hiểu.',
    checkIn: 'Lần sau khi bố/mẹ nấu thêm cho bạn ăn, thử nhìn đó như một câu nói — và đáp lại bằng cách ở lại thêm một chút, ăn thêm một bát.',
  },
  {
    id: 'RP_PARENT_B_11',
    pairWithA: 'RP_PARENT_A_11',
    group: 'DISTANCE',
    title: 'Câu họ cũng chưa từng nói được',
    hook: 'Bạn là bố/mẹ. Bạn thương con, nhưng câu "bố/mẹ thương con" chưa bao giờ ra khỏi miệng.',
    setup: 'Bạn nhìn con và lòng đầy. Nhưng nói thành lời thì ngượng — vì chính bạn cũng chưa từng nghe câu đó từ cha mẹ mình. Bạn chỉ biết thương theo cách: lo cho con đủ ăn, đủ mặc, đủ ấm.',
    reveal: 'Khoảng cách trong nhiều gia đình không phải là vô cảm, mà là thiếu một thứ ngôn ngữ. Người chưa từng được nghe "bố/mẹ thương con" thường cũng không biết cách nói câu đó ra. Họ thương bằng hành động — vì đó là tất cả những từ họ có. Im lặng của họ, nhiều khi, đầy hơn ta tưởng.',
    noiSo: 'Sợ rằng nói ra điều trong lòng sẽ thành vụng về, lạ lẫm — nên thà giữ kín mà thương.',
    checkIn: 'Đôi khi người mở lời trước không nhất thiết phải là họ. Thử nói với bố/mẹ một câu thật, dù nhỏ và ngượng — có khi đó là câu họ vẫn chờ mà chưa biết cách bắt đầu.',
  },
  {
    id: 'RP_PARENT_B_12',
    pairWithA: 'RP_PARENT_A_12',
    group: 'DISTANCE',
    title: 'Im lặng sau cãi',
    hook: 'Bạn là bố/mẹ. Sau lần cãi với con, đã mấy ngày bạn không nói gì.',
    setup: 'Bạn không biết phải mở lời lại thế nào. Một phần trong bạn buồn, một phần thấy mình đúng, một phần chỉ đơn giản là không có từ để làm lành. Thế là bạn im.',
    reveal: 'Im lặng kéo dài có thể là một người không có từ nào để làm lành — cả đời chưa ai dạy họ cách nối lại sau va chạm. Nhưng cũng có khi, im lặng là một cách để con thấy có lỗi, để con xuống nước trước. Bạn không cần kết luận ngay nó là gì. Nếu sự im lặng đó được dùng để con thấy mình sai, thì đó là điều nên được nói thẳng ra — chứ không nên đọc thành tình thương.',
    noiSo: 'Sợ rằng nếu mở lời trước, mình thành người thua — hoặc đơn giản là không biết bắt đầu lại từ đâu.',
    checkIn: 'Thử mở lại một lối nhỏ: "Hôm trước hai bố/mẹ con căng quá, con vẫn muốn nói chuyện lại." Nếu sự im lặng cứ quay lại như một cách trừng phạt, bạn được phép gọi tên nó ra, nhẹ nhàng mà thẳng.',
  },

  // ═══════════════ OTHER (B13–B15) ═══════════════
  {
    id: 'RP_PARENT_B_13',
    pairWithA: 'RP_PARENT_A_13',
    group: 'OTHER',
    title: 'So để biết con có ổn không',
    hook: 'Bạn là bố/mẹ. Bạn vừa buột miệng so con với "con nhà người ta".',
    setup: 'Bạn không định làm con đau. Nhưng nhìn con của người khác có vẻ "ổn", bạn lại lo cho con mình, và nỗi lo bật ra thành một câu so sánh — trước cả khi bạn kịp nghĩ nó nghe ra sao.',
    reveal: 'So sánh con với người khác, với nhiều người thế hệ trước, có thể không phải để hạ con xuống. Đó thường là một cách đo cũ — đo xem con mình có "an toàn", có theo kịp người ta không. Với người từng sống trong thiếu thốn, "thua người ta" nghe như một mối nguy thật. Câu so sánh làm con đau, nhưng điều bên dưới nó thường là nỗi lo, không phải sự chê bai.',
    noiSo: 'Sợ rằng con đang tụt lại phía sau, và họ là người có lỗi vì không lo đủ cho con.',
    checkIn: 'Thử cho bố/mẹ biết câu so sánh chạm vào bạn thế nào — và để họ thấy bạn vẫn đang đi, chỉ là đi theo một con đường khác với "con nhà người ta".',
  },
  {
    id: 'RP_PARENT_B_14',
    pairWithA: 'RP_PARENT_A_14',
    group: 'OTHER',
    title: 'Tuổi già và chữ hiếu',
    hook: 'Bạn là bố/mẹ. Bạn nhắc tới chuyện tiền nong, chuyện con lo cho nhà.',
    setup: 'Bạn không muốn thành gánh nặng cho con. Nhưng tuổi già đến gần, và bạn lớn lên trong một thế giới mà về già là con cái chăm. Nỗi lo đó khó nói, nên nó hiện ra thành chuyện tiền.',
    reveal: 'Với nhiều người thế hệ trước, chuyện con lo cho cha mẹ không chỉ là tiền — nó gắn với cả một ý niệm về bổn phận và về tuổi già. Trong một thế giới ít chỗ dựa lúc về già, "con phải lo" có thể là cách họ nói nỗi sợ cô đơn lúc không còn tự lo được. Hiểu nỗi sợ đó không có nghĩa là con phải gồng quá sức mình — thương thật và giới hạn thật có thể đi cùng nhau.',
    noiSo: 'Sợ rằng lúc yếu nhất, mình sẽ không còn ai bên cạnh.',
    checkIn: 'Thử nói thật với bố/mẹ mức bạn lo được, kèm một lời cho họ yên tâm rằng bạn vẫn ở đây. Điều họ sợ thường là bị bỏ lại, nhiều hơn là một con số cụ thể.',
  },
  {
    id: 'RP_PARENT_B_15',
    pairWithA: 'RP_PARENT_A_15',
    group: 'OTHER',
    title: 'Chuyện con vẫn là chuyện chung',
    hook: 'Bạn là bố/mẹ. Bạn góp ý vào chuyện riêng của con với một vẻ rất đương nhiên.',
    setup: 'Với bạn, con vẫn là con, và chuyện của con là chuyện của cả nhà — bạn lớn lên như thế. Khi con nói "đây là việc riêng của con", bạn thấy hẫng, như bị đẩy ra khỏi một thứ bạn vẫn nghĩ là chung.',
    reveal: 'Trong nhiều gia đình, ranh giới giữa "việc của con" và "việc của nhà" gần như không có — vì cả một thế hệ lớn lên với ý niệm rằng gia đình là một khối. Khi bố mẹ can vào sâu, thường không phải để giành quyền, mà vì với họ, buông con ra nghe như mất con. Hiểu được điều đó không có nghĩa là họ nên can — chỉ là việc bạn dựng ranh giới sẽ đụng vào một nỗi sợ rất cũ của họ.',
    noiSo: 'Sợ rằng nếu để con hoàn toàn tự quyết, họ sẽ mất chỗ của mình trong đời con.',
    checkIn: 'Thử cho bố/mẹ biết rằng dựng một ranh giới không phải đẩy họ ra — "Con vẫn cần bố/mẹ, chỉ là việc này con muốn tự quyết." Cho họ thấy họ không bị mất con.',
  },
]
