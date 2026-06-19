// child-teen-roleplay-b.ts
// Đợt 3 MẺ B — ROLE-PLAY B "LÀ TEEN MỘT LÚC" · TEEN (12-18) · 9 case · pair A01-A09
// Content agent · 17/06/2026 · user = BỐ MẸ ngồi vào ghế con teen · ngôi "bạn" (khi quay về góc bố mẹ)
// CHOICELESS — reveal TĨNH, KHÔNG MCQ, KHÔNG dialogue AI
// ⚠️ THẤU CẢM, KHÔNG để bố mẹ đọc reveal thành "thấy chưa, nó chỉ làm quá". Frame "điều con trải qua có thể là..."
// ⭐ "Nổi loạn"/tách rời = phát triển bình thường · não tái cấu trúc (dịch hết, KHÔNG token EN)
// reveal "có thể/thường" · noiSo · checkIn trả về con thật

export interface ChildTeenRolePlayB {
  id: string
  pairWithA: string
  group: 'DISTANCE' | 'PRESSURE' | 'CONFLICT'
  title: string
  hook: string
  setup: string
  reveal: string
  noiSo: string
  checkIn: string
}

export const CHILD_TEEN_ROLEPLAY_B: ChildTeenRolePlayB[] = [
  // ═══════════════ DISTANCE (B01–B03) ═══════════════
  {
    id: 'RP_CHILD_T_B_01',
    pairWithA: 'RP_CHILD_T_A_01',
    group: 'DISTANCE',
    title: 'Căn phòng là của con',
    hook: 'Bạn là đứa con tuổi teen vừa về phòng, đóng cửa lại.',
    setup: 'Bạn thương bố mẹ. Nhưng cả ngày bị nhìn, bị hỏi, bị nhắc — bạn cần một chỗ chỉ có mình bạn, nơi bạn được là chính mình mà không ai dõi theo.',
    reveal: 'Ở tuổi này, một đứa trẻ thường đang xây một cái "tôi" riêng — và việc đó cần không gian, theo đúng nhịp phát triển bình thường. Đóng cửa phòng có thể không phải là đẩy bố mẹ ra khỏi đời mình, mà là cần một chỗ để lớn lên thành một người riêng. Cần khoảng cách không có nghĩa là hết cần bố mẹ.',
    noiSo: 'Sợ rằng nếu không có chỗ nào của riêng mình, mình sẽ không bao giờ biết mình thật sự là ai.',
    checkIn: 'Thử tôn trọng cánh cửa đóng, nhưng giữ một nhịp gần nhẹ nhàng — rủ con ăn khuya, đi dạo. Cho con thấy con được riêng tư mà vẫn không bị bỏ rơi.',
  },
  {
    id: 'RP_CHILD_T_B_02',
    pairWithA: 'RP_CHILD_T_A_02',
    group: 'DISTANCE',
    title: 'Không biết bắt đầu từ đâu',
    hook: 'Bạn là đứa con vừa đáp "bình thường ạ" cho qua.',
    setup: 'Trong ngày của bạn có nhiều thứ rối. Nhưng để kể ra thì dài, khó, và bạn sợ vừa mở miệng đã bị hỏi tiếp hoặc bị khuyên. Nên "bình thường ạ" là cách dễ nhất.',
    reveal: 'Một câu trả lời cụt đôi khi không phải vì con không muốn chia sẻ. Có thể con chưa biết gọi tên điều đang rối trong mình, hoặc đã quen rằng mở lời ra là bị hỏi dồn, bị khuyên. Im, lúc đó, an toàn hơn nói. Khoảng lặng này thường không phải con khép lòng vĩnh viễn — chỉ là con chưa thấy đủ an toàn để mở.',
    noiSo: 'Sợ rằng nói thật ra sẽ bị phán xét, hoặc bị biến thành một bài học khác.',
    checkIn: 'Thử kể chuyện của bạn trước, không hỏi gì cả, để con góp lời khi con muốn. Một không khí không-bị-hỏi thường mở con ra hơn là thêm một câu hỏi.',
  },
  {
    id: 'RP_CHILD_T_B_03',
    pairWithA: 'RP_CHILD_T_A_03',
    group: 'DISTANCE',
    title: 'Cần bạn bè để biết mình là ai',
    hook: 'Bạn là đứa con lại xin đi với bạn bè cuối tuần.',
    setup: 'Bạn vẫn thương nhà. Nhưng ở bên bạn bè, bạn được thử làm những phiên bản khác nhau của mình, được cười kiểu khác, nói kiểu khác — những thứ bạn đang cần để hiểu mình là ai.',
    reveal: 'Ở tuổi này, bạn bè thường không chỉ là vui chơi — đó là nơi một đứa trẻ thử nghiệm xem mình là ai bên ngoài vai trò "con của bố mẹ". Ưu tiên bạn bè là một phần bình thường của việc lớn lên, không phải dấu hiệu con quay lưng với gia đình. Con vẫn cần nhà — chỉ là con cũng cần một thế giới của riêng con cùng lúc.',
    noiSo: 'Sợ rằng nếu chỉ sống trong khuôn của gia đình, mình sẽ không bao giờ biết mình là ai ngoài kia.',
    checkIn: 'Thử để con đi với bạn mà không kèm cảm giác có lỗi, và giữ vài điểm hẹn gia đình nhẹ. Khi không bị bắt chọn giữa bạn và nhà, nhà vẫn là nơi con muốn về.',
  },

  // ═══════════════ PRESSURE (B04–B06) ═══════════════
  {
    id: 'RP_CHILD_T_B_04',
    pairWithA: 'RP_CHILD_T_A_04',
    group: 'PRESSURE',
    title: 'Đuối mà không dám nói',
    hook: 'Bạn là đứa con vừa bị điểm kém hơn hẳn mọi khi.',
    setup: 'Bạn cũng không hiểu hết vì sao. Có thể bạn mệt, bạn rối, có chuyện gì đó đang đè lên. Nhưng nhìn vẻ thất vọng của bố mẹ, bạn càng không dám nói rằng mình đang đuối.',
    reveal: 'Điểm số đi xuống ở tuổi này có thể không phải vì con lười. Đôi khi con đang học giữa lúc trong người ngổn ngang — mệt, lo, hoặc một chuyện con chưa gọi tên được. Nỗi sợ làm bố mẹ thất vọng có thể lớn đến mức con thà im còn hơn thừa nhận mình đang chật vật. Khi đó, một câu hỏi nhẹ thường mở được nhiều hơn một lời trách.',
    noiSo: 'Sợ rằng mình làm bố mẹ thất vọng, và nếu nói ra mình đuối thì sẽ còn tệ hơn.',
    checkIn: 'Thử hỏi điều gì đang xảy ra trước khi kết luận con lười. Khi con thấy được hỏi thay vì bị kết tội, con dễ nói ra cái gốc thật — và bạn xử đúng chỗ.',
  },
  {
    id: 'RP_CHILD_T_B_05',
    pairWithA: 'RP_CHILD_T_A_05',
    group: 'PRESSURE',
    title: 'Chưa biết mình giỏi gì',
    hook: 'Bạn là đứa con vừa bị đem ra so với một bạn giỏi hơn.',
    setup: 'Bạn nghe câu so sánh và thấy mình co lại. Không phải bạn không cố. Chỉ là bạn vẫn đang mò mẫm xem mình hợp với cái gì, giỏi cái gì — và câu đó như đóng đinh rằng bạn chưa đủ.',
    reveal: 'Khi bị so sánh đúng vào tuổi đang hỏi "mình là ai", điều con cảm thấy thường không phải động lực mà là một thông điệp ngầm: "mình sai, mình không đủ". Con chưa biết mình giỏi gì không có nghĩa là con không cố — con đang trong quá trình tìm ra. So sánh lúc này dễ làm con lo lắng hơn là cố gắng hơn.',
    noiSo: 'Sợ rằng mình mãi không bằng người ta, và sẽ không bao giờ tìm ra chỗ của riêng mình.',
    checkIn: 'Thử dừng lại và công nhận con đang đi theo cách riêng của con. Được nhìn nhận như chính mình giúp con xây một cái "tôi" vững hơn nhiều so với việc bị đặt cạnh người khác.',
  },
  {
    id: 'RP_CHILD_T_B_06',
    pairWithA: 'RP_CHILD_T_A_06',
    group: 'PRESSURE',
    title: 'Gồng qua mùa thi',
    hook: 'Bạn là đứa con đang căng mình qua kỳ thi lớn.',
    setup: 'Bạn thấy cả nhà trông vào kỳ thi này. Bạn vừa muốn làm tốt, vừa sợ làm mọi người thất vọng — và nỗi sợ đó nặng gần bằng chính bài vở.',
    reveal: 'Teen thường đối mặt với áp lực học hành lớn nhất đúng vào lúc bộ não còn đang xây lại cấu trúc từ bên trong — một sự kết hợp rất khó. Cáu gắt, mất ngủ, căng thẳng ở giai đoạn này có thể không phải con yếu đuối, mà là con đang gồng quá sức trong điều kiện ngặt nghèo. Nỗi sợ làm cả nhà thất vọng nhiều khi đè lên con nặng hơn cả kỳ thi.',
    noiSo: 'Sợ rằng nếu thi không tốt, mình sẽ làm cả nhà thất vọng và mọi công sức thành vô nghĩa.',
    checkIn: 'Thử cho con biết kết quả thế nào bạn vẫn ở đây, và giúp con giữ sức. Biết tình thương không treo trên điểm số thường giúp con bớt sợ — và làm bài tỉnh táo hơn.',
  },

  // ═══════════════ CONFLICT (B07–B09) ═══════════════
  {
    id: 'RP_CHILD_T_B_07',
    pairWithA: 'RP_CHILD_T_A_07',
    group: 'CONFLICT',
    title: 'Bùng trước khi kịp nghĩ',
    hook: 'Bạn là đứa con vừa cãi lại, giọng gắt, rồi thấy hối.',
    setup: 'Một câu của bố mẹ chạm vào đâu đó, và phản ứng bật ra trước cả khi bạn kịp suy nghĩ. Lời nói ra to và gắt hơn ý bạn — nhưng lúc đó bạn không phanh lại được.',
    reveal: 'Ở tuổi teen, phần não giúp dừng lại trước khi phản ứng vẫn đang được xây — theo đúng nghĩa đen, đến tận ngoài 20 tuổi. Trong khi đó, phần cảm xúc lại đang ở đỉnh. Con bùng lên trước khi kịp nghĩ thường không phải cố tình hỗn — mà là cái "phanh" trong não con chưa lắp xong. Con cũng thường thấy hối sau đó, dù không phải lúc nào cũng nói ra.',
    noiSo: 'Sợ rằng những lúc mất kiểm soát đó chứng minh mình là một đứa con tệ.',
    checkIn: 'Thử tạm dừng lúc nóng, hẹn nói lại khi cả hai bình tĩnh. Việc quay lại sau cơn dạy con rằng bất đồng không phá vỡ quan hệ — và rằng con người ta sửa được sau khi cãi.',
  },
  {
    id: 'RP_CHILD_T_B_08',
    pairWithA: 'RP_CHILD_T_A_08',
    group: 'CONFLICT',
    title: 'Không muốn giả vờ là con nhỏ nữa',
    hook: 'Bạn là đứa con đang đòi được tự do hơn.',
    setup: 'Bạn thấy mình đã lớn, đã tự quyết được nhiều thứ. Nhưng ở nhà, bạn vẫn bị đối xử như hồi bé. Bạn đòi nới ranh giới không phải để chống bố mẹ — mà để được sống đúng với tuổi mình.',
    reveal: 'Đòi tự do ở tuổi này thường là một phần bình thường của việc lớn lên, không phải nổi loạn để chống lại bố mẹ. Con cần tập tự quyết để học cách tự đứng sau này. Điều con thường mong là: vẫn cần bố mẹ, nhưng không phải giả vờ mình còn bé nữa — cả hai cùng lúc. Hiểu điều đó không có nghĩa là buông hết, mà là cùng con vẽ lại ranh giới cho hợp tuổi.',
    noiSo: 'Sợ rằng mình sẽ mãi không được tin là đã lớn, và không bao giờ được tự đứng trên đôi chân mình.',
    checkIn: 'Thử cùng con thương lượng: nới chỗ được, giữ chỗ cần, kèm lý do rõ. Tự do đi kèm trách nhiệm dạy con nhiều hơn, và giữ được kênh để con vẫn bàn với bạn thay vì lén làm.',
  },
  {
    id: 'RP_CHILD_T_B_09',
    pairWithA: 'RP_CHILD_T_A_09',
    group: 'CONFLICT',
    title: 'Trong cái màn hình đó',
    hook: 'Bạn là đứa con đang dán mắt vào điện thoại.',
    setup: 'Trong cái màn hình đó là bạn bè bạn, là chỗ bạn được cười, được thuộc về, được là một phiên bản của mình mà ở nhà bạn không thể hiện ra. Nó không chỉ là giải trí — nó là một phần đời sống của bạn.',
    reveal: 'Với nhiều teen, thế giới trong điện thoại không tách khỏi đời thật — bạn bè online cũng là bạn bè thật, và đó có thể là nơi con thử làm chính mình. Con dùng máy nhiều đôi khi không phải để trốn khỏi gia đình, mà vì đó là nơi con kết nối. Bị đọc lén hay bị cấm tiệt thường làm con thấy bị xâm phạm — và đẩy con giấu kỹ hơn, xa hơn.',
    noiSo: 'Sợ rằng khoảng riêng cuối cùng của mình cũng bị soi, và không còn chỗ nào được là chính mình.',
    checkIn: 'Thử hỏi để hiểu con dùng nó làm gì, rồi cùng con đặt vài quy ước. Hiểu trước, rồi cùng đặt cấu trúc, thường giữ được lòng tin tốt hơn là cấm hay soi.',
  },
]
