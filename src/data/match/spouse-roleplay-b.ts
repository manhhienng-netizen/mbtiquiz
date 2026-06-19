// spouse-roleplay-b.ts
// TASK 3 — Role-play B "LÀ HỌ MỘT LÚC" ⭐ signature feature · 15 case pair A01–A15
// Content agent · brief MA PM 16/06/2026 11:00
// User đóng vai NGƯỜI KIA · choices = CẢM NHẬN (không phải hành động)
// reveal 60-80 chữ "thường/có thể", KHÔNG gắn 1 choice, dẫn về THẤU CẢM (không "bạn đúng họ sai")
// checkIn TRẢ VỀ NGƯỜI THẬT · G1-G5 guardrail · ngôi "bạn"
// MA PM review (G1-G5 sống còn) trước khi wire

export interface SpouseRolePlayB {
  id: string
  pairWithA: string
  group: 'CONFLICT' | 'SILENCE' | 'MONEY' | 'PARENTING' | 'OTHER'
  title: string
  hook: string
  setup: string
  choices: [
    { id: 'c1'; label: string },
    { id: 'c2'; label: string },
    { id: 'c3'; label: string },
  ]
  reveal: string
  nhuCau: string
  checkIn: string
}

export const SPOUSE_ROLEPLAY_B: SpouseRolePlayB[] = [
  // ═══════════════ CONFLICT (B01–B03) ═══════════════
  {
    id: 'RP_SPOUSE_B_01',
    pairWithA: 'RP_SPOUSE_A_01',
    group: 'CONFLICT',
    title: 'Từ phía kia bếp',
    hook: 'Bạn là vợ/chồng. Vừa về đến nhà sau một ngày dài.',
    setup: 'Bạn thấy bát chưa rửa lần nữa. Không phải lần đầu. Bạn biết họ bận — nhưng lần này bạn không chắc mình đang phàn nàn về bát hay về điều gì khác.',
    choices: [
      { id: 'c1', label: 'Nhẹ nhõm vì cuối cùng cũng nói ra' },
      { id: 'c2', label: 'Tự thấy hơi quá nhưng không dừng được' },
      { id: 'c3', label: 'Thật ra muốn được hỏi "bạn ổn không?"' },
    ],
    reveal: 'Phàn nàn về bát đĩa thường là cách nói "Hôm nay tôi mệt và tôi cần bạn ở đây với tôi." Không hẳn về bát. Nhưng đó là câu dễ nói nhất khi người ta chưa biết cách nói câu kia ra.',
    nhuCau: 'Được thấy và được đỡ — không phải được phục vụ.',
    checkIn: 'Thử hỏi họ: "Hôm nay bạn thấy thế nào, thật sự?" — rồi nghe mà chưa vội giải thích.',
  },
  {
    id: 'RP_SPOUSE_B_02',
    pairWithA: 'RP_SPOUSE_A_02',
    group: 'CONFLICT',
    title: 'Người đang chần chừ',
    hook: 'Bạn là vợ/chồng. Trước mặt là một quyết định lớn.',
    setup: 'Họ thấy rõ vì sao nên làm và đang hào hứng. Bạn cũng thấy điểm hay, nhưng có gì đó trong bạn cứ kéo lại, và bạn chưa gọi được tên nó.',
    choices: [
      { id: 'c1', label: 'Lo nhưng ngại nói ra kẻo bị chê yếu đuối' },
      { id: 'c2', label: 'Thấy mình đang cản niềm vui của họ' },
      { id: 'c3', label: 'Cần thêm thời gian, không phải cần từ chối' },
    ],
    reveal: 'Người chần chừ trước một thay đổi lớn thường không phản đối điều đó — họ đang sợ một thứ chưa nói được thành lời. Cái "chậm lại" nhiều khi là cách họ tìm chỗ đứng vững trước khi nhảy, chứ không phải muốn kéo người kia xuống.',
    nhuCau: 'Được an tâm rằng nỗi lo của mình có chỗ, trước khi bước.',
    checkIn: 'Thử hỏi họ: "Điều gì khiến bạn lo nhất ở chuyện này?" — và đón nhận câu trả lời như một thông tin, không phải một rào cản.',
  },
  {
    id: 'RP_SPOUSE_B_03',
    pairWithA: 'RP_SPOUSE_A_03',
    group: 'CONFLICT',
    title: 'Người hay nhắc',
    hook: 'Bạn là vợ/chồng. Bạn vừa nhắc họ một việc, lần nữa.',
    setup: 'Bạn biết họ sẽ làm. Nhưng có điều gì đó khiến bạn vẫn nhắc — như thể nếu không nhắc, một nỗi lo trong bạn không chịu yên.',
    choices: [
      { id: 'c1', label: 'Sợ việc bị quên rồi đổ lên mình' },
      { id: 'c2', label: 'Nhắc cho bớt lo, chứ không nghi ngờ họ' },
      { id: 'c3', label: 'Quen gánh, khó để việc cho người khác' },
    ],
    reveal: 'Nhắc đi nhắc lại thường không phải vì không tin người kia, mà vì người nhắc đang mang một nỗi lo họ chưa đặt xuống được. Với nhiều người, kiểm soát chi tiết nhỏ là cách xoa dịu một cảm giác bất an lớn hơn ở bên trong.',
    nhuCau: 'Được nhẹ gánh — và tin rằng buông ra thì mọi thứ vẫn ổn.',
    checkIn: 'Thử hỏi họ: "Có phải bạn đang ôm nhiều thứ quá không?" — thay vì chỉ thấy lời nhắc làm phiền.',
  },

  // ═══════════════ SILENCE (B04–B06) ═══════════════
  {
    id: 'RP_SPOUSE_B_04',
    pairWithA: 'RP_SPOUSE_A_04',
    group: 'SILENCE',
    title: 'Người đang im lặng',
    hook: 'Bạn là vợ/chồng. Sáng nay sau trận cãi tối qua.',
    setup: 'Bạn ngồi ở bàn ăn, không nói gì. Không phải vì bạn còn giận lắm — mà vì bạn chưa biết mở miệng thế nào để không lại làm hỏng thêm.',
    choices: [
      { id: 'c1', label: 'Sợ nói ra lại châm thêm một trận' },
      { id: 'c2', label: 'Cần thời gian để hết nóng trong người' },
      { id: 'c3', label: 'Muốn họ ra dấu rằng quay lại thì vẫn an toàn' },
    ],
    reveal: 'Im lặng sau một trận cãi thường là cách tự bảo vệ, không phải trừng phạt. Nhiều người rút vào yên lặng vì sợ rằng lời nói lúc này sẽ khó rút lại — họ đang chờ cơ thể nguội xuống, chứ không cố ý đẩy người kia ra xa.',
    nhuCau: 'Một khoảng an toàn để quay lại mà không bị truy.',
    checkIn: 'Thử nói với họ: "Mình chưa cần nói ngay, nhưng mình ở đây khi bạn sẵn sàng." — rồi để khoảng lặng đó được yên.',
  },
  {
    id: 'RP_SPOUSE_B_05',
    pairWithA: 'RP_SPOUSE_A_05',
    group: 'SILENCE',
    title: 'Người nói "không có gì"',
    hook: 'Bạn là vợ/chồng. Vừa về nhà, kiệt sức.',
    setup: 'Họ hỏi bạn có chuyện gì không. Bạn đáp "không có gì" — dù rõ ràng là có. Không phải bạn giấu, chỉ là bạn chưa đủ sức gói nó thành lời lúc này.',
    choices: [
      { id: 'c1', label: 'Chưa biết bắt đầu kể từ đâu' },
      { id: 'c2', label: 'Quá mệt để mở ra cả câu chuyện' },
      { id: 'c3', label: 'Chỉ cần ngồi cạnh ai đó một lát' },
    ],
    reveal: '"Không có gì" thường không có nghĩa là "đừng quan tâm" — nó hay là "tôi chưa biết bắt đầu từ đâu" hoặc "tôi mệt đến mức không gói nổi thành lời". Với nhiều người, được ngồi cạnh trong yên lặng lúc này còn dễ chịu hơn bị hỏi thêm.',
    nhuCau: 'Được ở gần mà không phải giải trình.',
    checkIn: 'Thử ngồi cạnh họ và nói: "Không cần kể gì đâu, mình ngồi đây chút thôi." — xem khoảng lặng đó có mở ra điều gì không.',
  },
  {
    id: 'RP_SPOUSE_B_06',
    pairWithA: 'RP_SPOUSE_A_06',
    group: 'SILENCE',
    title: 'Người sau lớp kính',
    hook: 'Bạn là vợ/chồng. Mấy hôm nay bạn thấy mình xa cách.',
    setup: 'Không có trận cãi nào. Nhưng vài ngày qua bạn trả lời ngắn, ít chạm vào họ. Có một điều gì đó trong bạn chưa được gỡ, và bạn cũng chưa chắc nó là gì.',
    choices: [
      { id: 'c1', label: 'Đang xử lý một chuyện chưa liên quan tới họ' },
      { id: 'c2', label: 'Chờ xem họ có nhận ra mình khác không' },
      { id: 'c3', label: 'Sợ nói ra thì thành chuyện to' },
    ],
    reveal: 'Một khoảng cách không tên thường không phải lúc nào cũng vì người kia. Có khi người ta đang mang một điều riêng — mệt mỏi, một nỗi lo cũ — và chưa biết cách mang nó ra ánh sáng. Sự xa cách đó nhiều khi là dấu hiệu cần được hỏi, chứ không phải bị bỏ mặc.',
    nhuCau: 'Được nhận ra và được hỏi nhẹ nhàng, không bị truy.',
    checkIn: 'Thử nói: "Mấy hôm nay mình thấy có khoảng cách giữa hai đứa, mình không chắc vì sao — bạn thì sao?" rồi nghe.',
  },

  // ═══════════════ MONEY (B07–B09) ═══════════════
  {
    id: 'RP_SPOUSE_B_07',
    pairWithA: 'RP_SPOUSE_A_07',
    group: 'MONEY',
    title: 'Người vừa chi khoản lớn',
    hook: 'Bạn là vợ/chồng. Bạn vừa quyết một khoản chi đáng kể.',
    setup: 'Bạn không định giấu. Với bạn, đây là khoản bạn thấy mình có quyền dùng. Bạn không nghĩ nó là chuyện phải xin phép — nhưng giờ thấy người kia có vẻ tổn thương.',
    choices: [
      { id: 'c1', label: 'Thấy mình bị coi như không đáng tin' },
      { id: 'c2', label: 'Cần một khoảng tự chủ của riêng mình' },
      { id: 'c3', label: 'Không nghĩ chuyện này lớn đến vậy' },
    ],
    reveal: 'Người tự quyết một khoản chi thường không cố gạt người kia ra — họ đang giữ một cảm giác tự chủ mà với họ rất quan trọng. Khác biệt ở đây thường không phải về lòng tin, mà về chỗ mỗi người vạch ranh giới giữa "tiền chung" và "phần của tôi".',
    nhuCau: 'Giữ được một khoảng tự chủ mà không bị xem là vô trách nhiệm.',
    checkIn: 'Thử hỏi họ: "Với bạn, khoản nào là chung cần bàn, khoản nào là riêng?" — để vạch ranh giới cùng nhau, không áp đặt.',
  },
  {
    id: 'RP_SPOUSE_B_08',
    pairWithA: 'RP_SPOUSE_A_08',
    group: 'MONEY',
    title: 'Người muốn tận hưởng',
    hook: 'Bạn là vợ/chồng. Bạn vừa đề xuất một chuyến đi tốn kém.',
    setup: 'Bạn nhìn thấy khoản tiết kiệm, nhưng bạn cũng thấy thời gian đang trôi. Với bạn, để dành mãi mà không sống thì tiền để làm gì. Người kia thì lập tức nghĩ tới những bất trắc.',
    choices: [
      { id: 'c1', label: 'Sợ cứ hoãn mãi rồi chẳng bao giờ sống' },
      { id: 'c2', label: 'Muốn cả hai có ký ức chung trước khi quá muộn' },
      { id: 'c3', label: 'Thấy người kia chỉ lo, không cho phép mình vui' },
    ],
    reveal: 'Người muốn chi để tận hưởng thường không tiêu xài bừa — họ đang sợ một kiểu mất mát khác: những năm tháng trôi qua mà chưa thật sự sống. Với họ, "an toàn" mà không có niềm vui chung cũng là một dạng nghèo. Đó là một nỗi sợ khác, không phải sự vô lo.',
    nhuCau: 'Được sống, được có ký ức chung — không chỉ tích lũy.',
    checkIn: 'Thử hỏi họ: "Chuyến đi này có ý nghĩa gì với bạn?" — có thể câu trả lời không phải về tiền.',
  },
  {
    id: 'RP_SPOUSE_B_09',
    pairWithA: 'RP_SPOUSE_A_09',
    group: 'MONEY',
    title: 'Người muốn giúp nhà',
    hook: 'Bạn là vợ/chồng. Người thân của bạn đang cần giúp.',
    setup: 'Với bạn, giúp người nhà lúc khó là điều không phải bàn — đó là cách bạn được dạy về gia đình. Người kia lại muốn giữ ranh giới, và bạn thấy như họ không hiểu gốc gác của mình.',
    choices: [
      { id: 'c1', label: 'Thấy có lỗi nếu không giúp người nhà' },
      { id: 'c2', label: 'Sợ bị xem là người vô tình với gia đình' },
      { id: 'c3', label: 'Mang theo cách gia đình mình vẫn đối với nhau' },
    ],
    reveal: 'Người muốn giúp gia đình thường đang sống theo một quy ước họ lớn lên cùng — nơi giúp nhau lúc khó là điều hiển nhiên. Với họ, từ chối không chỉ là chuyện tiền mà chạm vào lòng tự trọng và bổn phận. Khác biệt ở đây thường là hai cách hiểu về gia đình, không phải ai rộng lượng hơn ai.',
    nhuCau: 'Được sống đúng với giá trị gia đình mình mà không bị phán xét.',
    checkIn: 'Thử hỏi họ: "Với bạn, giúp nhà mang ý nghĩa gì?" — để hiểu gốc rễ trước khi bàn con số.',
  },

  // ═══════════════ PARENTING (B10–B12) ═══════════════
  {
    id: 'RP_SPOUSE_B_10',
    pairWithA: 'RP_SPOUSE_A_10',
    group: 'PARENTING',
    title: 'Người vừa bênh con',
    hook: 'Bạn là vợ/chồng. Con vừa bị nói nghiêm, và bạn chen vào.',
    setup: 'Bạn thấy con bị mắng và có gì đó trong bạn lập tức muốn che cho con. Bạn không định chống lại người kia trước mặt con — nó cứ bật ra trước khi bạn kịp nghĩ.',
    choices: [
      { id: 'c1', label: 'Sợ con tổn thương như mình từng tổn thương' },
      { id: 'c2', label: 'Thấy cách mắng hơi nặng với con' },
      { id: 'c3', label: 'Phản xạ che con, không kịp nghĩ tới bạn đời' },
    ],
    reveal: 'Người hay bênh con giữa lúc con bị mắng thường đang phản ứng từ một chỗ rất cũ trong chính họ — có thể là nỗi tổn thương thời nhỏ họ không muốn con phải chịu. Đó thường không phải chống lại người kia, mà là một phản xạ bảo vệ bật ra trước cả suy nghĩ.',
    nhuCau: 'Biết con được an toàn về mặt cảm xúc — như điều họ từng cần.',
    checkIn: 'Thử hỏi nhau khi không có con: "Hồi nhỏ, bị bố mẹ xử lý lúc làm sai khiến mỗi đứa mình thấy thế nào?"',
  },
  {
    id: 'RP_SPOUSE_B_11',
    pairWithA: 'RP_SPOUSE_A_11',
    group: 'PARENTING',
    title: 'Người trách bạn xa con',
    hook: 'Bạn là vợ/chồng. Bạn vừa nói họ dành ít thời gian cho con.',
    setup: 'Bạn thấy con thiếu vắng bố/mẹ, và bạn là người đỡ phần đó mỗi ngày. Lời trách của bạn không hẳn về giờ giấc — nó mang theo cả sự mệt mỏi khi gánh phần lớn một mình.',
    choices: [
      { id: 'c1', label: 'Thấy mình đang gánh phần nuôi con một mình' },
      { id: 'c2', label: 'Lo con lớn lên thiếu một người' },
      { id: 'c3', label: 'Muốn được san sẻ, không phải đổ lỗi' },
    ],
    reveal: 'Lời trách "bạn ít ở bên con" thường mang hai tầng: lo cho con, và một sự mệt mỏi khi gánh phần lớn một mình. Người nói nhiều khi không trách để buộc tội, mà đang xin được san sẻ — họ cũng đuối, và họ nhớ người kia ở bên, không chỉ con nhớ.',
    nhuCau: 'Được san sẻ gánh nặng và được bạn đời quay về.',
    checkIn: 'Thử hỏi họ: "Bạn đang đuối ở đâu nhất? Mình đỡ phần nào được?" — nghe cả nỗi mệt phía sau lời trách.',
  },
  {
    id: 'RP_SPOUSE_B_12',
    pairWithA: 'RP_SPOUSE_A_12',
    group: 'PARENTING',
    title: 'Người muốn con học hơn',
    hook: 'Bạn là vợ/chồng. Bạn muốn con học thêm, người kia muốn con được chơi.',
    setup: 'Bạn lo con thua thiệt nếu không cố ngay từ bây giờ. Với bạn, đẩy con học là một cách thương con. Người kia thì lo con mất tuổi thơ — và hai nỗi lo cứ va vào nhau.',
    choices: [
      { id: 'c1', label: 'Sợ con sau này thiếu cơ hội vì mình lơ là' },
      { id: 'c2', label: 'Thấy ép học là cách mình biết để thương con' },
      { id: 'c3', label: 'Mang theo áp lực mình từng chịu thời đi học' },
    ],
    reveal: 'Người muốn con học nhiều hơn thường không vô tâm với tuổi thơ của con — họ đang sợ con sau này thiếu cơ hội, và với họ, đẩy con cố gắng là một cách thương. Đôi khi nỗi lo đó mang theo cả áp lực chính họ từng chịu. Đây là hai cách thương khác nhau, không phải một người thương con hơn.',
    nhuCau: 'Biết mình đang trang bị cho con, không bỏ rơi tương lai của con.',
    checkIn: 'Thử hỏi nhau: "Điều mình sợ nhất cho con sau này là gì?" — có thể hai nỗi sợ bổ sung cho nhau hơn là chống nhau.',
  },

  // ═══════════════ OTHER (B13–B15) ═══════════════
  {
    id: 'RP_SPOUSE_B_13',
    pairWithA: 'RP_SPOUSE_A_13',
    group: 'OTHER',
    title: 'Người muốn ra ngoài',
    hook: 'Bạn là vợ/chồng. Cuối tuần, bạn muốn gặp gỡ bạn bè.',
    setup: 'Bạn háo hức được ra ngoài, gặp người này người kia. Bạn rủ họ đi cùng. Khi họ chỉ muốn ở nhà, một phần trong bạn thấy hơi hụt, như thể niềm vui của bạn không được chia.',
    choices: [
      { id: 'c1', label: 'Được nạp năng lượng khi ở giữa mọi người' },
      { id: 'c2', label: 'Muốn có họ bên cạnh trong niềm vui đó' },
      { id: 'c3', label: 'Hơi tủi khi đi chơi mà thiếu người kia' },
    ],
    reveal: 'Người thích ra ngoài thường được nạp lại năng lượng từ sự kết nối — và khi rủ người kia, họ không chỉ muốn có bạn đi cùng, mà muốn chia sẻ niềm vui đó. Lời rủ nhiều khi là cách họ nói "mình muốn có bạn trong những khoảnh khắc vui của mình", chứ không phải đòi hỏi.',
    nhuCau: 'Được kết nối và được chia sẻ niềm vui với người mình thương.',
    checkIn: 'Thử nói với họ: "Mình không phải lúc nào cũng đi được, nhưng mình muốn hiểu — đi chơi cùng nhau có ý nghĩa gì với bạn?"',
  },
  {
    id: 'RP_SPOUSE_B_14',
    pairWithA: 'RP_SPOUSE_A_14',
    group: 'OTHER',
    title: 'Người thấy bị bỏ lại',
    hook: 'Bạn là vợ/chồng. Họ vừa lùi vào khoảng riêng của họ.',
    setup: 'Mỗi lần họ rút vào không gian của mình, một cảm giác cũ trong bạn dấy lên — như thể bạn đang bị đẩy ra. Bạn biết có thể họ chỉ cần nghỉ, nhưng phần thấy bị bỏ lại vẫn lên tiếng.',
    choices: [
      { id: 'c1', label: 'Sợ khoảng cách này là dấu hiệu xấu' },
      { id: 'c2', label: 'Chạm vào một nỗi sợ bị bỏ rơi cũ' },
      { id: 'c3', label: 'Muốn được trấn an rằng mình vẫn quan trọng' },
    ],
    reveal: 'Người thấy tổn thương khi bạn đời cần khoảng riêng thường đang chạm vào một nỗi sợ bị bỏ lại có gốc rễ sâu hơn tình huống này. Họ thường không muốn tước khoảng riêng của bạn — họ chỉ cần một dấu hiệu rằng lùi lại không có nghĩa là rời đi. Đây là nhu cầu được trấn an, không phải đòi kiểm soát.',
    nhuCau: 'Được trấn an rằng khoảng riêng của bạn không phải là rời xa họ.',
    checkIn: 'Thử nói trước khi bạn cần khoảng riêng: "Mình cần một chút một mình để hồi lại, rồi mình quay lại với bạn." — cho họ một điểm tựa.',
  },
  {
    id: 'RP_SPOUSE_B_15',
    pairWithA: 'RP_SPOUSE_A_15',
    group: 'OTHER',
    title: 'Người ở giữa hai bên',
    hook: 'Bạn là vợ/chồng. Gia đình bạn tham gia khá sâu, và người kia thấy ngộp.',
    setup: 'Với bạn, sự can dự của gia đình là cách họ thể hiện quan tâm — bạn lớn lên trong đó và thấy bình thường. Khi người kia nói thấy bị lấn ranh giới, bạn vừa muốn bảo vệ gia đình mình, vừa kẹt ở giữa.',
    choices: [
      { id: 'c1', label: 'Thấy khó xử giữa gia đình và bạn đời' },
      { id: 'c2', label: 'Thấy gia đình mình bị hiểu lầm là xâm phạm' },
      { id: 'c3', label: 'Sợ phải chọn một bên' },
    ],
    reveal: 'Người có gia đình can dự sâu thường thấy đó là biểu hiện của tình thương, vì họ lớn lên trong cách yêu thương kiểu đó. Khi bị nói tới ranh giới, họ dễ thấy như phải chọn giữa gia đình gốc và bạn đời — một thế đứng rất khó. Họ thường không cố để bạn khó chịu, mà đang kẹt giữa hai điều họ đều thương.',
    nhuCau: 'Không phải chọn phe — mà được giúp đứng cùng một phía với bạn đời.',
    checkIn: 'Thử nói: "Mình không muốn bạn phải chọn giữa mình và gia đình. Mình muốn tụi mình cùng nghĩ ra một cách." — rồi cùng tìm.',
  },
]
