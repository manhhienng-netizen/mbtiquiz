// child-adult-roleplay-b.ts
// Đợt 3 MẺ C — ROLE-PLAY B "LÀ CON TRƯỞNG THÀNH MỘT LÚC" · CON 18+ · 9 case · pair A01-A09
// Content agent · 17/06/2026 · user = BỐ MẸ ngồi vào ghế con đã trưởng thành · ngôi "bạn" (khi quay về góc bố mẹ)
// CHOICELESS — reveal TĨNH, KHÔNG MCQ, KHÔNG dialogue AI
// ⚠️ THẤU CẢM, con là NGƯỜI LỚN bình đẳng · reuse hố thế hệ từ module bố mẹ (lật góc: con sinh sau, thế giới khác)
// reveal "có thể/thường" · noiSo · checkIn trả về con thật · từ "quản" → "đồng hành"
// Nhóm: CHOICES · DISTANCE · ADULTHOOD

export interface ChildAdultRolePlayB {
  id: string
  pairWithA: string
  group: 'CHOICES' | 'DISTANCE' | 'ADULTHOOD'
  title: string
  hook: string
  setup: string
  reveal: string
  noiSo: string
  checkIn: string
}

export const CHILD_ADULT_ROLEPLAY_B: ChildAdultRolePlayB[] = [
  // ═══════════════ CHOICES (B01–B03) ═══════════════
  {
    id: 'RP_CHILD_AD_B_01',
    pairWithA: 'RP_CHILD_AD_A_01',
    group: 'CHOICES',
    title: 'Con đã cân nhắc rồi',
    hook: 'Bạn là người con trưởng thành vừa báo một quyết định nghề nghiệp.',
    setup: 'Bạn đã nghĩ về việc này lâu, cân đo kỹ, và quyết. Khi bố mẹ phản đối, bạn vừa hiểu nỗi lo của họ, vừa thấy nhói: hình như trong mắt họ, bạn vẫn chưa bao giờ đủ lớn để tự lo cho đời mình.',
    reveal: 'Một người con trưởng thành chọn con đường riêng thường đã cân nhắc nhiều hơn bố mẹ kịp thấy. Họ lớn lên trong một thế giới khác — nơi "ổn định" và "rủi ro" được đo bằng thước khác thời của bố mẹ. Phản đối có thể đến từ thương thật, nhưng điều con cần ở tuổi này thường là được tin rằng mình đủ sức chịu trách nhiệm cho lựa chọn của chính mình.',
    noiSo: 'Sợ rằng dù làm gì, trong mắt bố mẹ mình vẫn mãi là đứa trẻ chưa đủ lớn để tự quyết.',
    checkIn: 'Thử nói cho con một lần điều bạn lo, rồi để con tự quyết. Cho con biết bạn vẫn ở đây nếu cần — sự tin tưởng đó thường giữ con quay lại bàn với bạn hơn là lời ngăn cản.',
  },
  {
    id: 'RP_CHILD_AD_B_02',
    pairWithA: 'RP_CHILD_AD_A_02',
    group: 'CHOICES',
    title: 'Người con thương',
    hook: 'Bạn là người con vừa đưa người mình thương về ra mắt.',
    setup: 'Bạn thấy ở người ấy những điều khiến bạn yên lòng, những điều có thể bố mẹ chưa kịp thấy. Khi bố mẹ tỏ ra lo ngại, bạn thấy mình bị kẹt giữa hai phía mình đều thương.',
    reveal: 'Khi một người con đã chọn bạn đời, họ thường thấy ở người kia những điều bố mẹ chưa có thời gian để thấy. Nỗi lo của bố mẹ có thể thật, nhưng bị buộc phải chọn giữa người mình yêu và gia đình là một thế kẹt rất đau. Điều con mong thường không phải bố mẹ lập tức ưng — mà là người kia được cho một cơ hội công bằng để bố mẹ hiểu.',
    noiSo: 'Sợ rằng mình sẽ phải chọn — và dù chọn bên nào cũng mất một phần mình thương.',
    checkIn: 'Thử nói thật nỗi lo của bạn một cách tôn trọng, rồi cho mối quan hệ của con một cơ hội thật. Giữ cửa mở giúp bạn vẫn ở trong đời con dù chuyện tình sau này thế nào.',
  },
  {
    id: 'RP_CHILD_AD_B_03',
    pairWithA: 'RP_CHILD_AD_A_03',
    group: 'CHOICES',
    title: 'Con sống ổn theo cách của con',
    hook: 'Bạn là người con đang sống một lối khác nếp quen — chưa cưới, không sinh con, hay một lựa chọn khác.',
    setup: 'Bạn sống ổn, thấy đúng với mình. Nhưng mỗi lần về, bạn lại thấy ánh mắt lo lắng hoặc câu nhắc quen thuộc — và bạn mệt vì phải giải thích mãi rằng mình không hề lạc đường.',
    reveal: 'Một người con sống khác hình dung của bố mẹ thường không phải đang đi lạc — họ đang dựng một cuộc đời hợp với con người và thời đại của mình. Cái mệt lớn nhất nhiều khi không phải bản thân lựa chọn, mà là việc phải liên tục chứng minh mình ổn. Điều con mong thường là được hỏi để hiểu, thay vì bị nhắc phải trở về một khuôn "bình thường".',
    noiSo: 'Sợ rằng bố mẹ sẽ không bao giờ chấp nhận mình như mình đang là, mà chỉ chấp nhận một phiên bản mình lẽ ra phải thành.',
    checkIn: 'Thử hỏi để hiểu lựa chọn của con trước khi đánh giá nó. Khi con thấy được nhìn như một người lớn có lý do riêng, con giữ bạn lại như người để chia sẻ — không phải người để né.',
  },

  // ═══════════════ DISTANCE (B04–B06) ═══════════════
  {
    id: 'RP_CHILD_AD_B_04',
    pairWithA: 'RP_CHILD_AD_A_04',
    group: 'DISTANCE',
    title: 'Không phải con quên',
    hook: 'Bạn là người con dạo này ít gọi, ít kể hơn.',
    setup: 'Đời sống của bạn cuốn lấy bạn — công việc, các mối quan hệ, trăm thứ phải lo. Bạn vẫn thương bố mẹ, vẫn nghĩ đến, nhưng ngày trôi qua và cuộc gọi cứ bị đẩy lại "để mai".',
    reveal: 'Một người con ít gọi về không nhất thiết là bớt thương. Người lớn nào cũng có một đời sống riêng kéo mình đi nhiều hướng — và việc con tự đứng được trên đôi chân mình vốn là điều bố mẹ từng mong. Bên dưới sự thưa thớt đó, nhiều khi con vẫn mang một nỗi áy náy thầm mà con không biết nói thế nào cho khỏi gượng.',
    noiSo: 'Sợ rằng mình đang làm bố mẹ buồn, nhưng cũng đuối quá để xoay xở cho trọn cả hai bên.',
    checkIn: 'Thử giữ liên lạc nhẹ nhàng, không kèm trách móc. Một lời hỏi han không mang sức nặng thường khiến con thấy gọi về là điều dễ chịu — và chủ động hơn theo thời gian.',
  },
  {
    id: 'RP_CHILD_AD_B_05',
    pairWithA: 'RP_CHILD_AD_A_05',
    group: 'DISTANCE',
    title: 'Con cũng nhớ nhà',
    hook: 'Bạn là người con đã lâu chưa về nhà.',
    setup: 'Bạn nhớ nhà, nhớ bữa cơm, nhớ bố mẹ. Nhưng đường về xa, việc thì nhiều, và đôi khi bạn ngại — vì lần nào về cũng có một câu trách chờ sẵn khiến chuyến về thành nặng nề.',
    reveal: 'Một người con ít về không phải lúc nào cũng vì nhà hết quan trọng. Cuộc sống người lớn kéo con đi, và con thường mang sẵn một nỗi nhớ lẫn áy náy. Nhưng nếu mỗi lần về đều gắn với bị trách, lần sau con dễ ngại hơn. Điều kéo con quay lại thường không phải lời trách vì sao lâu không về — mà là cảm giác về nhà được nhẹ nhõm.',
    noiSo: 'Sợ rằng về nhà sẽ lại thành một lần bị trách, nên thà cứ lần lữa.',
    checkIn: 'Thử nói thật là bạn nhớ con, không kèm trách, và làm chuyến về nhẹ nhàng. Khi về nhà là một niềm vui chứ không phải nghĩa vụ kèm trách móc, con tự thu xếp về nhiều hơn.',
  },
  {
    id: 'RP_CHILD_AD_B_06',
    pairWithA: 'RP_CHILD_AD_A_06',
    group: 'DISTANCE',
    title: 'Con không cố đẩy bố mẹ ra',
    hook: 'Bạn là người con đã xây một đời sống riêng — công việc, bạn bè, gia đình nhỏ.',
    setup: 'Bạn đã dựng được một cuộc đời của riêng mình. Bạn tự hào về điều đó, nhưng cũng loay hoay: làm sao giữ bố mẹ trong đời mình mà không bị kéo trở lại làm đứa trẻ cần được quản.',
    reveal: 'Khi một người con xây được đời sống riêng, đó thường là điều bố mẹ từng mong — dù nó cũng khiến bố mẹ thấy mình đứng bên rìa. Con thường không cố đẩy bố mẹ ra; con chỉ đang tìm cách giữ họ trong một thế giới mới, theo một vai khác. Điều con cần là bố mẹ nhận một chỗ mới — người đồng hành đáng tin — thay vì cố giữ chỗ trung tâm như xưa.',
    noiSo: 'Sợ rằng nếu để bố mẹ vào sâu, mình lại bị kéo về làm đứa trẻ phải nghe lời, mất cái đời sống mình vừa dựng.',
    checkIn: 'Thử tôn trọng thế giới riêng của con và tìm một vai trò mới hợp với nó. Khi ở bên bạn không còn là bị lấn, con thường chủ động kéo bạn vào đời mình.',
  },

  // ═══════════════ ADULTHOOD (B07–B09) ═══════════════
  {
    id: 'RP_CHILD_AD_B_07',
    pairWithA: 'RP_CHILD_AD_A_07',
    group: 'ADULTHOOD',
    title: 'Con đã tự lo được lâu rồi',
    hook: 'Bạn là người con vừa được bố mẹ dặn dò như hồi còn nhỏ.',
    setup: 'Bạn biết bố mẹ dặn vì thương. Nhưng bạn đã tự lo cho mình nhiều năm, đã xoay xở qua bao việc một mình — và mỗi lời nhắc lại như nói rằng họ vẫn chưa thấy bạn đã lớn.',
    reveal: 'Với một người con đã trưởng thành, những lời dặn dò kiểu cũ — dù xuất phát từ thương — có thể vọng lên như một thông điệp: "con vẫn chưa đủ lớn để tự lo". Con không phủ nhận tình thương đó; con chỉ mong được công nhận là đã trưởng thành. Cùng một sự quan tâm, nói theo kiểu hai người lớn trò chuyện thường được con đón nhận hơn nhiều.',
    noiSo: 'Sợ rằng trong mắt bố mẹ, mình sẽ mãi là đứa trẻ không bao giờ tự lo nổi.',
    checkIn: 'Thử chuyển từ dặn dò sang hỏi ý con, như nói chuyện giữa hai người lớn. Được trò chuyện ngang hàng, con mở lòng hơn — và tìm đến bạn để bàn vì thấy được tôn trọng.',
  },
  {
    id: 'RP_CHILD_AD_B_08',
    pairWithA: 'RP_CHILD_AD_A_08',
    group: 'ADULTHOOD',
    title: 'Con hỏi vì coi trọng bố mẹ',
    hook: 'Bạn là người con đã hỏi ý bố mẹ, rồi cuối cùng làm theo cách khác.',
    setup: 'Bạn hỏi ý bố mẹ thật lòng, vì bạn coi trọng góc nhìn của họ. Nhưng quyết định cuối cùng phải là của bạn — vì bạn là người sống với nó mỗi ngày. Bạn thấy bố mẹ buồn, và bạn áy náy.',
    reveal: 'Khi một người con hỏi ý rồi vẫn quyết theo cách của mình, việc hỏi tự nó thường đã là một sự coi trọng. Con muốn nghe góc nhìn của bố mẹ — nhưng quyết định cuối phải là của con, vì con là người gánh hệ quả. Nếu mỗi lần hỏi đều buộc phải nghe theo, con sẽ thôi hỏi. Hiểu rằng góp ý và quyết định là hai việc khác nhau giúp bố mẹ vẫn là người con tìm đến.',
    noiSo: 'Sợ rằng nếu không làm theo lời bố mẹ thì bị xem là xem nhẹ họ — nên lần sau thà đừng hỏi.',
    checkIn: 'Thử đón nhận việc con hỏi ý như một sự coi trọng, dù quyết định cuối là của con. Khi hỏi bạn không còn nghĩa là phải nghe theo, con vẫn giữ bạn là người để bàn.',
  },
  {
    id: 'RP_CHILD_AD_B_09',
    pairWithA: 'RP_CHILD_AD_A_09',
    group: 'ADULTHOOD',
    title: 'Ranh giới không phải để đẩy bố mẹ ra',
    hook: 'Bạn là người con vừa đặt một ranh giới — về chuyện riêng, hay cách bạn nuôi con của mình.',
    setup: 'Bạn nói điều đó một cách lịch sự nhưng dứt khoát. Không phải bạn muốn đẩy bố mẹ ra — bạn chỉ cần một không gian người lớn của riêng mình. Nhưng nhìn vẻ hẫng của bố mẹ, bạn thấy nặng lòng.',
    reveal: 'Khi một người con đặt ranh giới, điều đó thường không phải để đẩy bố mẹ ra khỏi đời mình — mà để giữ một không gian người lớn cần có. Trong nhiều gia đình, ranh giới giữa "việc của con" và "việc của nhà" gần như không có, nên một lời như vậy dễ bị đọc thành bất hiếu. Nhưng con vẫn cần bố mẹ; con chỉ đang xin một kiểu quan hệ mới giữa hai người lớn.',
    noiSo: 'Sợ rằng chỉ vì muốn tự quyết chuyện của mình mà bị xem là đứa con bất hiếu, quay lưng với gia đình.',
    checkIn: 'Thử tôn trọng ranh giới của con và cho con biết bạn vẫn ở đây nếu con cần. Tôn trọng mà vẫn giữ cửa mở giúp con tin rằng đến với bạn là an toàn — và con thường tự kéo bạn lại gần hơn.',
  },
]
