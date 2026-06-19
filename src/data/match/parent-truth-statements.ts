// parent-truth-statements.ts
// Task 1 — CÂU NÓI THẬT × 4 NỖI ĐAU ("Hiểu Bố Mẹ")
// Content agent · 17/06/2026 · brief Master duyệt 02:12
// ngôi "bạn" · honest, không phán xét bố mẹ HAY con · giữ "vừa thương vừa ngột" · dịch hết token EN
// overworry: để NGỎ "lo = thương vụng về" vs "lo = giữ con gần / kiểm soát" (G6)

export const PARENT_TRUTH_STATEMENTS: Record<string, string[]> = {
  // Ép cưới / ép nghề / ép quyết định lớn
  pressure: [
    'Bố mẹ không cố giới hạn bạn. Họ đang dùng tấm bản đồ duy nhất họ có — tấm bản đồ vẽ từ thời mà ổn định là chuyện sống còn, không phải một lựa chọn.',
    'Câu "con phải làm nghề này" hiếm khi thật sự về nghề. Nó thường về một nỗi sợ: nếu con chọn sai, họ không còn đủ sức đỡ con thêm một lần nữa.',
    'Hiểu vì sao họ ép không có nghĩa là bạn phải làm theo. Hai điều đó tách nhau ra được — và cả hai đều có thể đúng cùng lúc.',
  ],

  // Không chịu nghe / độc thoại
  unheard: [
    'Nhiều khi không phải bố mẹ không chịu nghe. Là hai người đang nói hai thứ ngôn ngữ — một bên lớn lên với "phải lo cho chắc", một bên lớn lên với "được chọn điều mình muốn".',
    'Khi bố mẹ nói mãi một điều, đôi khi đó không phải cứng đầu. Đó có thể là cách duy nhất họ biết để nói rằng họ vẫn đang lo.',
    'Bạn muốn được lắng nghe. Có thể họ cũng vậy. Cả hai đang chờ người kia hiểu mình trước — nên đôi khi không ai thật sự nghe được ai.',
  ],

  // Lo thái quá / kiểm soát qua lo lắng
  overworry: [
    'Có những nỗi lo không thật sự về bạn — mà về một thế giới cũ, nơi mọi thứ có thể mất trong một ngày. Một cái đầu từng phải lo sinh tồn không dễ phân biệt giữa lo thật và lo theo thói quen.',
    'Lo lắng có thể là thương vụng về. Cũng có lúc nó là cách giữ bạn ở gần. Bạn không cần quyết ngay nó là gì — chỉ cần thấy rằng nó không phải lúc nào cũng nói đúng về con người bạn hôm nay.',
  ],

  // Khó gần / ít nói / khoảng cách cảm xúc
  distance: [
    'Không ai dạy bố mẹ bạn cách nói "bố mẹ thương con". Nên họ nấu ăn. Họ lo tiền. Họ thức khi bạn ốm. Đó là tất cả những từ họ có.',
    'Khoảng cách không phải lúc nào cũng là vô cảm. Đôi khi đó là một người thương rất nhiều nhưng chưa từng được học cách nói điều đó ra.',
  ],
}
