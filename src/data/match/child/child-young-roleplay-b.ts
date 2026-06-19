// child-young-roleplay-b.ts
// Đợt 3 MẺ A — ROLE-PLAY B "LÀ CON NHỎ MỘT LÚC" · CON NHỎ (3-11) · 9 case · pair A01-A09
// Content agent · 17/06/2026 · user = BỐ MẸ ngồi vào ghế con · ngôi "bạn" (khi quay về góc bố mẹ)
// CHOICELESS — reveal TĨNH, KHÔNG MCQ, KHÔNG dialogue AI
// ⚠️ THẤU CẢM, KHÔNG để bố mẹ phán xét từ ghế con. Frame: "điều con cảm thấy lúc đó có thể là..."
// reveal "có thể/thường" · noiSo (1 câu) · checkIn trả về con thật
// Nền: khí chất (Thomas & Chess) + T6-01 con nhỏ ("không có từ cho cảm giác này")

export interface ChildYoungRolePlayB {
  id: string
  pairWithA: string
  group: 'TANTRUM' | 'SHY' | 'BIGFEELINGS'
  title: string
  hook: string
  setup: string
  reveal: string
  noiSo: string
  checkIn: string
}

export const CHILD_YOUNG_ROLEPLAY_B: ChildYoungRolePlayB[] = [
  // ═══════════════ TANTRUM (B01–B03) ═══════════════
  {
    id: 'RP_CHILD_Y_B_01',
    pairWithA: 'RP_CHILD_Y_A_01',
    group: 'TANTRUM',
    title: 'Cơn lớn hơn con',
    hook: 'Bạn là đứa trẻ đang lăn ra khóc giữa siêu thị.',
    setup: 'Bạn muốn món đồ đó ghê gớm. Một thứ gì đó dâng lên trong ngực, to và nóng, và bạn không biết phải làm gì với nó ngoài việc gào lên.',
    reveal: 'Ở tuổi này, một đứa trẻ thường chưa có đủ từ để gọi tên cái đang xảy ra bên trong. Cơn giận hay thèm muốn đến quá lớn, lớn hơn cả khả năng con hiểu hay kìm nó. Khóc và gào, lúc đó, có thể là cách duy nhất con biết để nói "con đang quá tải" — không phải để làm khó bạn.',
    noiSo: 'Cảm giác bị một thứ gì đó trong chính mình cuốn đi mà không ai gọi tên giúp.',
    checkIn: 'Lần sau khi con ăn vạ, thử gọi tên cảm xúc giúp con: "Con đang tức lắm hả?" Đặt được tên cho cơn bão thường giúp con dịu nhanh hơn là bắt con nín.',
  },
  {
    id: 'RP_CHILD_Y_B_02',
    pairWithA: 'RP_CHILD_Y_A_02',
    group: 'TANTRUM',
    title: 'Muốn được tự làm',
    hook: 'Bạn là đứa trẻ nhất định không chịu mặc áo.',
    setup: 'Người lớn cứ làm mọi thứ cho bạn, quyết mọi thứ thay bạn. Hôm nay bạn muốn được tự quyết một điều — dù chỉ là cái áo — và bạn bám lấy nó.',
    reveal: 'Quanh tuổi này, một đứa trẻ thường bắt đầu cần cảm giác "con tự làm được". Chống lại không hẳn là hư — đôi khi đó là cách non nớt đầu tiên con tập nói "con là một người riêng, con cũng có ý của con". Cuộc chiến cái áo, nhìn từ trong, có thể là con đang giành một chút quyền làm chủ đời mình.',
    noiSo: 'Cảm giác mọi thứ đều bị người khác quyết, không có chỗ nào là của riêng mình.',
    checkIn: 'Thử cho con một lựa chọn nhỏ trong khuôn khổ bạn đặt — "áo xanh hay áo đỏ". Con thường hợp tác hơn khi thấy mình được quyết một phần.',
  },
  {
    id: 'RP_CHILD_Y_B_03',
    pairWithA: 'RP_CHILD_Y_A_03',
    group: 'TANTRUM',
    title: 'Tập nói "con"',
    hook: 'Bạn là đứa trẻ đang nói "không" với gần như mọi thứ.',
    setup: 'Không phải bạn ghét tắm hay ghét ăn. Chỉ là từ "không" cho bạn một cảm giác lạ mà thích: cảm giác rằng bạn có thể tự mình quyết một điều gì đó.',
    reveal: 'Giai đoạn "cái gì cũng không" thường là một bước phát triển bình thường, không phải con hư đi. Đứa trẻ đang phát hiện ra rằng mình là một người tách biệt với bố mẹ, và "không" là công cụ đầu tiên để thử cái ranh giới đó. Nó mệt cho bạn, nhưng thường là dấu hiệu con đang lớn lên đúng cách.',
    noiSo: 'Cảm giác mình chưa thật sự là một người riêng, nên phải thử xem mình có quyền gì.',
    checkIn: 'Thử chọn vài "trận" thật sự cần giữ, và thả những trận nhỏ. Cho con nói "không" ở chỗ an toàn giúp con tập tự chủ mà vẫn học được giới hạn ở chỗ quan trọng.',
  },

  // ═══════════════ SHY (B04–B06) ═══════════════
  {
    id: 'RP_CHILD_Y_B_04',
    pairWithA: 'RP_CHILD_Y_A_04',
    group: 'SHY',
    title: 'Muốn biến mất',
    hook: 'Bạn là đứa trẻ đang nép sau lưng bố/mẹ, không chào khách.',
    setup: 'Có người lạ đang nhìn bạn, chờ bạn nói. Mọi con mắt dồn vào, và bạn chỉ muốn nấp thật kỹ cho đến khi mọi thứ qua đi.',
    reveal: 'Có những đứa trẻ sinh ra cần quan sát thật kỹ trước khi bước vào — đó là khí chất, không phải yếu đuối. Khi bị thúc chào hoặc bị gọi là "nhát" ngay trước mặt người khác, điều con cảm thấy thường là muốn biến mất. Sự dè dặt đó không phải hư; con chỉ đang cần thêm một chút thời gian mà người lớn quên cho.',
    noiSo: 'Cảm giác bị cả phòng nhìn vào khi mình chưa kịp sẵn sàng.',
    checkIn: 'Lần sau, thử nói nhẹ: "Khi nào con sẵn sàng thì chào cô nhé" — rồi để con đó. Được tôn trọng nhịp của mình, con thường tự bước ra sau vài phút.',
  },
  {
    id: 'RP_CHILD_Y_B_05',
    pairWithA: 'RP_CHILD_Y_A_05',
    group: 'SHY',
    title: 'Đứng nhìn trước đã',
    hook: 'Bạn là đứa trẻ đang đứng ngoài, nhìn các bạn chơi.',
    setup: 'Bạn không phải không muốn chơi. Bạn chỉ cần nhìn một lúc trước đã — xem luật chơi thế nào, ai hiền ai dữ — rồi mới thấy đủ an toàn để bước vào.',
    reveal: 'Với một đứa trẻ chậm làm quen, đứng ngoài quan sát thường không phải là không hòa đồng. Đó là cách con kiểm tra xem chỗ này có an toàn không trước khi tham gia. Bị đẩy vào hay bị so với "bạn kia dạn hơn" thường làm con co lại thêm, vì điều con cần là thời gian, không phải một cú hích.',
    noiSo: 'Cảm giác bị xô vào giữa cuộc chơi khi mình còn chưa kịp thấy an toàn.',
    checkIn: 'Thử ngồi cạnh con cùng nhìn một lúc, làm "bến an toàn" cho con. Quan sát đủ rồi, con thường tự bước vào — theo cách của con.',
  },
  {
    id: 'RP_CHILD_Y_B_06',
    pairWithA: 'RP_CHILD_Y_A_06',
    group: 'SHY',
    title: 'Cái mới làm con sợ',
    hook: 'Bạn là đứa trẻ vừa nói "con không làm đâu" trước một hoạt động mới.',
    setup: 'Mọi thứ ở đây đều lạ. Bạn không biết sẽ ra sao, có làm được không, có ai cười mình không. Nói "không" cho bạn một chỗ trốn khỏi cái bất định đó.',
    reveal: 'Một đứa trẻ cẩn trọng thường từ chối cái mới trước cả khi thử, không phải vì lười mà vì cái chưa biết làm con thấy bất an. "Con không làm đâu" có thể là cách con tự bảo vệ mình khỏi nguy cơ thất bại trước mặt người khác. Khi được tiếp cận từ từ, nhiều khi con lại là đứa thích nhất.',
    noiSo: 'Sợ làm không được và bị thấy là mình kém trước mọi người.',
    checkIn: 'Thử chia nhỏ: cho con đứng xem trước, không phải tham gia ngay. Khi cái mới được tiếp cận từng bước, con dạn lên dần — và học được rằng mình có thể thử mà không cần nhảy ùm vào.',
  },

  // ═══════════════ BIGFEELINGS (B07–B09) ═══════════════
  {
    id: 'RP_CHILD_Y_B_07',
    pairWithA: 'RP_CHILD_Y_A_07',
    group: 'BIGFEELINGS',
    title: 'Với con, nó không nhỏ',
    hook: 'Bạn là đứa trẻ đang khóc vì cái bánh gãy đôi.',
    setup: 'Người lớn bảo "có gì đâu". Nhưng với bạn lúc này, cái bánh lành lặn đó là cả thế giới, và việc nó vỡ ra là một mất mát thật sự.',
    reveal: 'Điều người lớn thấy nhỏ có thể rất lớn với một đứa trẻ, vì con chưa có thước đo để biết cái gì "đáng" buồn bao nhiêu. Với những đứa trẻ cảm xúc mạnh, nỗi tiếc một cái bánh là thật như mọi nỗi tiếc khác. Bị nói "có gì đâu mà khóc" thường khiến con thấy cảm xúc của mình là sai, chứ không giúp con hiểu nó.',
    noiSo: 'Cảm giác điều mình thấy rất thật lại bị người mình tin nói là vô lý.',
    checkIn: 'Thử công nhận trước khi xử lý: "Con tiếc cái bánh lành hả? Ừ, tiếc thật." Được gọi đúng tên cảm giác, con thường dịu nhanh hơn là khi bị bảo đừng buồn.',
  },
  {
    id: 'RP_CHILD_Y_B_08',
    pairWithA: 'RP_CHILD_Y_A_08',
    group: 'BIGFEELINGS',
    title: 'Con cũng không dừng được',
    hook: 'Bạn là đứa trẻ đã khóc một lúc lâu mà không dừng được.',
    setup: 'Bạn cũng muốn ngừng. Nhưng cơn khóc như một cái gì đó tự chạy, lớn hơn cả bạn, và bạn không biết cách tắt nó đi.',
    reveal: 'Khi một đứa trẻ khóc mãi không dừng, thường không phải con cố tình kéo dài. Phần não giúp con tự trấn an còn đang lớn — con chưa có khả năng tự kéo mình ra khỏi cơn như người lớn. Lúc đó, một người ở lại bên cạnh, im lặng và bình tĩnh, thường là cái "phanh" mà con chưa tự có.',
    noiSo: 'Cảm giác bị cuốn đi trong chính cảm xúc của mình mà không ai ở đó để bám vào.',
    checkIn: 'Thử ở lại bên con, không cần nói nhiều, chỉ cho con biết bạn vẫn ở đây đến khi con dịu. Sự có mặt bình tĩnh của bạn dạy con rằng cảm xúc lớn đến mấy cũng có người cùng đi qua.',
  },
  {
    id: 'RP_CHILD_Y_B_09',
    pairWithA: 'RP_CHILD_Y_A_09',
    group: 'BIGFEELINGS',
    title: 'Con cảm mọi thứ mạnh hơn',
    hook: 'Bạn là đứa trẻ buồn rũ cả buổi vì một câu trêu.',
    setup: 'Người ta bảo "đùa thôi mà". Nhưng câu nói đó cứa vào bạn thật, và bạn không hiểu sao mình không gạt nó đi nhẹ nhàng như những đứa khác.',
    reveal: 'Có những đứa trẻ cảm nhận mọi thứ mạnh hơn — niềm vui đậm hơn, và lời làm đau cũng cứa sâu hơn. Đó là khí chất nhạy cảm, không phải con yếu đuối hay làm quá. Bị bảo "phải mạnh lên, đừng để ý" thường dạy con rằng sự nhạy cảm của mình là một lỗi — trong khi nó vốn có thể thành sự tinh tế và đồng cảm sau này.',
    noiSo: 'Cảm giác mình "có gì đó sai" vì cảm nhận mọi thứ mạnh hơn người khác.',
    checkIn: 'Thử công nhận cảm giác của con, rồi cùng con nghĩ một câu để đáp lại lần sau. Con học được rằng nhạy cảm không phải điểm yếu — và rằng con có thể vừa cảm sâu vừa tự đứng cho mình.',
  },
]
