/**
 * TNCB SHARE CARD — COMBINATION PHRASES v2
 * Nhật Chủ × LifePath = 1 phrase dùng trong ShareCard
 * Cập nhật: 23/05/2026 23:59
 *
 * Công thức: "của [Nhật Chủ biến thể + LifePath essence]"
 * Số lượng: 120 combo (10 Can × 12 LP)
 * v2: Review và điều chỉnh 18 combo từ v1
 */

export const COMBINATION_PHRASES: Record<string, Record<number, {
  phrase: string
  rationale: string
  changed?: boolean  // true = đã chỉnh từ v1
}>> = {

  // ============================================================
  // GIÁP — Cây Đại Thụ (thẳng, cứng, tiên phong, không uốn cong)
  // ============================================================
  "Giáp": {
    1:  {
      phrase: "của Đại thụ Tự lên đón Nắng",
      rationale: "Giáp = tiên phong không uốn cong + LP1 = tự mở đường → cây không cần ai chỉ hướng vẫn vươn thẳng",
    },
    2:  {
      phrase: "của  Đại Thụ có cội nguồn tinh tế",
      rationale: "Tension: Giáp = cứng thẳng + LP2 = cảm nhận tinh tế → thân cây thẳng nhưng rễ sâu cảm nhận được đất bên dưới",
      changed: true,
    },
    3:  {
      phrase: "của Thân nghiêm nghị mà Lá Cành Vui vẻ",
      rationale: "Tension: Giáp = nghiêm túc + LP3 = tạo không khí nhẹ → thân cứng nhưng cành lá phía trên vẫn rung rinh trong gió",
      changed: true,
    },
    4:  {
      phrase: "của Cây Vững trãi Không Bao Giờ suy chuyển",
      rationale: "Hòa hợp: Giáp = bền bỉ kiên định + LP4 = làm mọi thứ hoạt động → cây và đất đều vững, không có gì sụp được",
    },
    5:  {
      phrase: "của Cây Kiên định Giữa nẻo đường nhiều lối",
      rationale: "Tension: Giáp = một hướng duy nhất + LP5 = sợ chọn → cây đứng thẳng giữa ngã tư mà không biết rẽ hướng nào",
    },
    6:  {
      phrase: "của Cây Bao dung tỏa Bóng thầm lặng lẽ",
      rationale: "Hòa hợp: Giáp = hành động không lời + LP6 = cho đi không nói → cây cho bóng mát mà không yêu cầu ai nhớ ơn",
    },
    7:  {
      phrase: "của Cây cô đơn trên đỉnh cao vời vợi",
      rationale: "Hòa hợp: Giáp = đứng riêng không cần ai + LP7 = cô đơn hơn người → cây cao nhất nhìn xa nhất nhưng cũng cô đơn nhất",
    },
    8:  {
      phrase: "của Cây Vững vàng Rễ sâu không dò nổi",
      rationale: "Hòa hợp: Giáp = kiên định + LP8 = quyền lực bản sắc → gốc rễ là nơi quyền lực thật sự nằm, không ai chạm được",
    },
    9:  {
      phrase: "của Cây Che chắn nhưng lại chẳng nhớ Mình",
     rationale: "Tension: Giáp = cá nhân mạnh + LP9 = yêu nhân loại né thân mật → cây hướng ra rừng lớn nhưng quên chăm sóc chính thân mình",
    },
    11: {
      phrase: "của Cây Biết Bão Trước khi cơn giớ Đến",
      rationale: "Tension: Giáp = logic thực tế + LP11 = biết trước khi có bằng chứng → rễ cảm nhận được rung động mà người khác chưa thấy",
    },
    22: {
      phrase: "của Cây Lớn Đủ Làm Nên Cả Rừng",
      rationale: "Hòa hợp: Giáp = tầm nhìn dài hạn + LP22 = bản thiết kế quy mô lớn → một cây đủ vững để trở thành nền tảng cho cả khu rừng",
      changed: true,
    },
    33: {
      phrase: "của Cây Cho Hết chẳng Giữ gì ở Lại",
      rationale: "Hòa hợp: Giáp = hành động không đòi lại + LP33 = hy sinh không cần công nhận → cây cho tất cả bóng, quả, oxy mà không đếm",
    },
  },

  // ============================================================
  // ẤT — Dây Leo Kiên Trì (mềm mại, leo quanh, âm thầm)
  // ============================================================
  "Ất": {
    1:  {
      phrase: "của Dây Leo biết Tự mở lấy Đường",
      rationale: "Tension: Ất = cần cột để leo + LP1 = tự mở đường → dây leo tự tìm hướng mà không cần chỗ bám sẵn",
    },
    2:  {
      phrase: "của Cây Leo tìm Đọc mạch ẩn ngầm  ",
      rationale: "Hòa hợp: Ất = cảm nhận môi trường tinh tế + LP2 = thấy thứ người khác không thấy → leo bằng cách đọc từng khe hở của bức tường",
    },
    3:  {
      phrase: "của Hoa Cỏ làm mềm từng Kẽ Đá",
      rationale: "Hòa hợp: Ất = mềm mại kiên trì + LP3 = biến nặng thành nhẹ → hoa cỏ len lỏi vào kẽ đá và làm mềm cả khung cảnh",
    },
    4:  {
      phrase: "của Dây Leo Bám Chắc thầm Từng Bước",
      rationale: "Hòa hợp: Ất = kiên trì âm thầm + LP4 = làm mọi thứ thật hoạt động → không ồn ào nhưng mỗi bước bám chắc, không bao giờ trụt",
    },
    5:  {
      phrase: "của Dây Leo tỏa muôn phương tìm Hướng",
      rationale: "Hòa hợp: Ất = mơ hồ về lập trường + LP5 = sợ chọn → vươn ra nhiều hướng cùng lúc, chưa biết bám vào đâu",
    },
    6:  {
      phrase: "của Hoa Leo âm thầm tô điểm vật",
      rationale: "Hòa hợp: Ất = nuôi dưỡng âm thầm + LP6 = cho đi không nói → phủ kín bờ rào, làm đẹp mà không cần ai nhận ra",
    },
    7:  {
      phrase: "của Dây Leo che phủ kín chẳng thể tìm thấy Gốc",
      rationale: "Hòa hợp: Ất = âm thầm ẩn khuất + LP7 = chiều sâu cô đơn → lên đến đỉnh nhưng gốc rễ thật không ai biết ở đâu",
    },
    8:  {
      phrase: "của Dây Leo Biết Chọn Cột Đúng vươn cao",
      rationale: "Tension: Ất = phụ thuộc + LP8 = quyền lực bản sắc → chọn cột để leo không phải vì yếu mà vì khôn ngoan",
    },
    9:  {
      phrase: "của Hoa Cỏ Phủ nhẹ nhàng khắp chốn",
      rationale: "Hòa hợp: Ất = lan rộng không áp đặt + LP9 = yêu rộng né thân mật → phủ rộng khắp nơi nhưng không bao giờ đè nặng",
    },
    11: {
      phrase: "của Dây Leo tinh tế cảm môi trường",
      rationale: "Hòa hợp: Ất = đọc môi trường tinh tế + LP11 = biết trước → tìm được kẽ hở trước khi ai chỉ ra vì cảm nhận được rung động",
    },
    22: {
      phrase: "của Dây Leo Phủ Cả đại Công Trình",
      rationale: "Tension: Ất = nhỏ bé âm thầm + LP22 = tầm nhìn quy mô lớn → từ dây leo nhỏ nhưng phủ được cả một công trình lớn",
    },
    33: {
      phrase: "của Hoa Leo Nở chẳng phải để ai nhìn",
      rationale: "Hòa hợp: Ất = kiên trì không đòi công nhận + LP33 = hy sinh không cần ai biết → nở hoa ở góc khuất mà không cần ai thấy",
    },
  },

  // ============================================================
  // BÍNH — Mặt Trời Giữa Ngày (rộng lớn, hào phóng, chiếu tất cả)
  // ============================================================
  "Bính": {
    1:  {
      phrase: "của Mặt Trời tự rẽ mây tỏa sáng",
      rationale: "Hòa hợp: Bính = tự nhiên tỏa sáng + LP1 = tự mở đường → mặt trời không cần ai cho phép mới mọc",
    },
    2:  {
      phrase: "của Ánh sáng lan tỏa từng góc khuất",
      rationale: "Tension: Bính = hào phóng rộng lớn + LP2 = cảm nhận tinh tế → ánh sáng rộng nhưng biết nhìn thấy thứ ẩn sau bóng tối",
    },
    3:  {
      phrase: "của Nắng lên Làm Nhẹ Cả Bầu Trời",
      rationale: "Hòa hợp: Bính = tỏa ấm + LP3 = biến nặng thành nhẹ → nắng xuất hiện và cả bầu trời cảm thấy nhẹ hơn",
    },
    4:  {
      phrase: "của Ánh sáng tự do Trong quy luật Thiên nhiên",
      rationale: "Tension: Bính = tự do hào phóng + LP4 = kỷ luật hệ thống → mặt trời hào phóng nhưng mọc đúng giờ mỗi ngày",
    },
    5:  {
      phrase: "của Nắng Muốn mình chiếu sáng Khắp Nơi",
      rationale: "Hòa hợp: Bính = chiếu sáng không phân biệt + LP5 = sợ bỏ lỡ → chiếu tất cả mọi hướng vì không muốn góc nào bị bỏ qua",
    },
    6:  {
      phrase: "của Tỏa sáng vô điều kiện",
      rationale: "Hòa hợp: Bính = hào phóng vô điều kiện + LP6 = cho đi không nói → sưởi ấm mọi thứ mà không chờ ai nói cảm ơn",
    },
    7:  {
      phrase: "của Mặt Trời Một Mình Trên Cao",
      rationale: "Tension: Bính = cần khán giả + LP7 = cô đơn hơn người → tỏa sáng cho tất cả nhưng chính nó thì luôn ở một mình",
      changed: true,
    },
    8:  {
      phrase: "của Mặt Trời Không gì Che khuất",
      rationale: "Hòa hợp: Bính = quyền uy tự nhiên + LP8 = bản sắc quyền lực → không ai tắt được mặt trời, đó là quyền lực không cần xây dựng",
    },
    9:  {
      phrase: "của Nắng Chiếu Cả Nhân Loại",
      rationale: "Hòa hợp: Bính = không phân biệt + LP9 = yêu nhân loại → chiếu cho tất cả, không phân biệt ai xứng đáng",
    },
    11: {
      phrase: "của Ánh sáng Trước Bình Minh",
      rationale: "Hòa hợp: Bính = ánh sáng + LP11 = biết trước → nắng biết mình sẽ mọc trước khi trời sáng hẳn",
    },
    22: {
      phrase: "của Ánh sáng Soi rọi toàn bộ Bản Đồ Lớn",
      rationale: "Hòa hợp: Bính = tầm nhìn rộng + LP22 = bản thiết kế quy mô lớn → chỉ nắng mới soi được toàn bộ bản đồ cùng lúc",
    },
    33: {
      phrase: "của Ánh sáng soi tận hiến",
      rationale: "Hòa hợp: Bính = hào phóng không giữ lại + LP33 = hy sinh không cần công nhận → mỗi ngày cho hết ánh sáng rồi lặn",
    },
  },

  // ============================================================
  // ĐINH — Ngọn Nến Không Tắt (tinh tế, có chủ đích, ấm gần)
  // ============================================================
  "Đinh": {
    1:  {
      phrase: "của Ngọn Nến tự thân thắp lửa",
      rationale: "Tension: Đinh = cần được bảo vệ + LP1 = không cần ai cho phép → nến học cách tự thắp, không chờ ai mồi lửa",
      changed: true,
    },
    2:  {
      phrase: "của Ngọn Nến soi sáng hồn Người",
      rationale: "Hòa hợp: Đinh = nhìn thấy chiều sâu + LP2 = cảm nhận tinh tế → ánh nến đủ gần để thấy cả bóng tối phía sau người đứng trước mình",
    },
    3:  {
      phrase: "của Lửa Nhỏ sưởi Ấm Cả Căn Phòng",
      rationale: "Hòa hợp: Đinh = ấm áp thân mật + LP3 = biến nặng thành nhẹ → ngọn nến nhỏ nhưng đủ để cả phòng bớt nặng nề",
    },
    4:  {
      phrase: "của ngọn Nến Cháy Đều bền bỉ",
      rationale: "Hòa hợp: Đinh = kiên nhẫn tỉ mỉ + LP4 = làm mọi thứ hoạt động → nến không cháy vọt rồi tắt, cháy đều và đáng tin",
    },
    5:  {
      phrase: "của Nến luôn Biết nơi mình chiếu",
      rationale: "Tension: Đinh = có chủ đích + LP5 = sợ chọn một hướng → nến muốn chiếu có chủ đích nhưng gió cứ thay đổi hướng",
    },
    6:  {
      phrase: "của Lửa Giữ Ấm Âm thầm không quản thiệt ",
      rationale: "Hòa hợp: Đinh = ấm áp thầm lặng + LP6 = cho đi không nói → nến sưởi ấm cả đêm mà không kể mình đã cháy bao nhiêu",
    },
    7:  {
      phrase: "của Ngọn Nến Một Mình Trong Tối",
      rationale: "Hòa hợp: Đinh = cần bảo vệ nội tâm + LP7 = cô đơn sâu sắc → nến chiếu sáng nhưng chính nó ngồi trong bóng tối của mình",
    },
    8:  {
      phrase: "của Lửa Nhỏ nhưng Không Ai Dập Được",
      rationale: "Tension: Đinh = mỏng manh bên ngoài + LP8 = giữ bản sắc → ngọn nến nhỏ nhưng không ai thổi tắt được dễ dàng",
    },
    9:  {
      phrase: "của ngọn Nến Thắp Cho Người Xa",
      rationale: "Tension: Đinh = ấm gần không ấm xa + LP9 = yêu nhân loại né thân mật → muốn chiếu xa nhưng bản chất chỉ sưởi được người ở gần",
    },
    11: {
      phrase: "của Ngọn Nến thắp trước khi Trời Tối",
      rationale: "Hòa hợp: Đinh = trực giác sâu + LP11 = biết trước → cảm nhận được bóng tối sắp đến trước khi người khác thấy",
    },
    22: {
      phrase: "của Nến Nhỏ đủ Soi Bản đồ Lớn",
      rationale: "Tension: Đinh = chiếu sáng vùng nhỏ + LP22 = tầm nhìn quy mô lớn → ngọn nến nhỏ nhưng đủ sáng để đọc được bản thiết kế khổng lồ",
      changed: true,
    },
    33: {
      phrase: "của Lửa nhỏ Cháy Hết Mình Vì Người",
      rationale: "Hòa hợp: Đinh = hiến dâng + LP33 = hy sinh không cần công nhận → cháy đến giọt sáp cuối cùng không giữ lại gì",
    },
  },

  // ============================================================
  // MẬU — Ngọn Núi Im Lặng (bất động, bao chứa, ranh giới rõ)
  // ============================================================
  "Mậu": {
    1:  {
      phrase: "của Núi yên lặng vẫn Tự Mình Đứng Đó",
      rationale: "Hòa hợp: Mậu = không cần ai + LP1 = tự mở đường → núi không cần ai xây, tự đứng đó từ trước khi có người",
    },
    2:  {
      phrase: "của Núi lặng yên lắng Nghe lòng Đất chuyển",
      rationale: "Tension: Mậu = bề ngoài im lặng + LP2 = cảm nhận tinh tế → trông bất động nhưng rễ đá cảm nhận được rung động bên dưới",
    },
    3:  {
      phrase: "của ngọn Núi để Tìm Về nhẹ nhõm",
      rationale: "Tension: Mậu = nghiêm nghị + LP3 = tạo không khí nhẹ → núi không vui vẻ nhưng người ta tìm đến vì ở đây cảm thấy nhẹ lòng",
      changed: true,
    },
    4:  {
      phrase: "của Núi Giữ Vững mọi vật vận hành",
      rationale: "Hòa hợp: Mậu = bền bỉ + LP4 = làm mọi thứ hoạt động → núi không thay đổi qua bốn mùa, đó là lý do mọi thứ xung quanh vẫn vận hành",
    },
    5:  {
      phrase: "của Núi Đứng Giữa Ngã Đường",
      rationale: "Tension: Mậu = một chỗ duy nhất + LP5 = sợ chọn → núi bất động giữa ngã tư, mọi hướng đều chia từ đây",
    },
    6:  {
      phrase: "của Núi Che Gió không cần ai phải biết",
      rationale: "Hòa hợp: Mậu = bảo vệ không lời + LP6 = cho đi không nói → che chắn gió bão cho thung lũng mà không bao giờ đòi biết ơn",
    },
    7:  {
      phrase: "của Núi Một Mình trong Mây",
      rationale: "Hòa hợp: Mậu = cô đơn trong bất động + LP7 = cô đơn hơn người → đỉnh núi cao nhất thường bị mây che, cô đơn hoàn toàn",
    },
    8:  {
      phrase: "của Ngọn Núi đầy quyền lực",
      rationale: "Hòa hợp: Mậu = quyền lực tự nhiên + LP8 = bản sắc quyền lực → không cần tuyên bố, núi đứng ở đó là quyền lực",
    },
    9:  {
      phrase: "của Ngọn Núi chứa cả đất trời ",
      rationale: "Hòa hợp: Mậu = bao chứa lớn + LP9 = yêu nhân loại → đứng đó bao chứa cả chân trời, không phân biệt ai",
    },
    11: {
      phrase: "của Núi Cảm trước cơn Địa Chấn",
      rationale: "Tension: Mậu = bề ngoài cứng + LP11 = biết trước → đá biết cảm địa chấn trước khi người đo được",
    },
    22: {
      phrase: "của Núi Làm điểm tựa Cho Thành trì",
      rationale: "Hòa hợp: Mậu = nền tảng + LP22 = bản thiết kế quy mô lớn → không có núi thì không có thành phố lớn",
    },
    33: {
      phrase: "của Núi Hy sinh Không Đòi Lại",
      rationale: "Hòa hợp: Mậu = bao dung + LP33 = hy sinh không cần công nhận → cho chỗ trú ngụ, cho tài nguyên, không bao giờ đòi lại",
    },
  },

  // ============================================================
  // KỶ — Đất Vườn Kiên Nhẫn (nuôi dưỡng, linh hoạt, thấm sâu)
  // ============================================================
  "Kỷ": {
    1:  {
      phrase: "của mảnh Đất Tự thân Nên Màu Mỡ",
      rationale: "Tension: Kỷ = cần nắng nước + LP1 = tự mở đường → đất học cách tự nuôi mình mà không cần chờ ai tưới",
    },
    2:  {
      phrase: "của Đất Biết Hạt Nào Sẽ Nảy",
      rationale: "Hòa hợp: Kỷ = thấm sâu cảm nhận + LP2 = thấy thứ người khác không thấy → biết hạt giống nào sẽ nảy mầm trước khi ai nhìn ra",
    },
    3:  {
      phrase: "của Khu Vườn Làm Người Ta Muốn Ở",
      rationale: "Hòa hợp: Kỷ = nuôi dưỡng + LP3 = biến không khí nặng thành nhẹ → vườn không ồn ào nhưng người ta vào là muốn ngồi lại",
    },
    4:  {
      phrase: "của Đất Giữ Rễ Qua Mưa Bão",
      rationale: "Hòa hợp: Kỷ = kiên nhẫn bền bỉ + LP4 = làm mọi thứ thật hoạt động → giữ chặt rễ cây qua mọi mưa bão",
    },
    5:  {
      phrase: "của Đất Vườn Chưa Biết Trồng Gì",
      rationale: "Hòa hợp: Kỷ = linh hoạt nhưng thiếu quyết đoán + LP5 = sợ chọn → màu mỡ nhưng chưa quyết định sẽ nuôi loại cây nào",
    },
    6:  {
      phrase: "của Đất Nuôi Hết Mà chẳng giữ lại Chi",
      rationale: "Hòa hợp: Kỷ = nuôi dưỡng + LP6 = cho đi không nói → cho đi chất dinh dưỡng không giữ lại gì, không đòi cây cảm ơn",
    },
    7:  {
      phrase: "của Đất Chứa Điều Thâm sâu không ai biết",
      rationale: "Hòa hợp: Kỷ = thấm sâu + LP7 = chiều sâu cô đơn → bên dưới mặt đất có những thứ chưa ai đào đến",
    },
    8:  {
      phrase: "của Đất Vườn Biết Định Giá Chính Mình",
      rationale: "Tension: Kỷ = khiêm tốn + LP8 = quyền lực bản sắc → đất mềm nhưng biết mình có giá trị, không phải ai cũng trồng được ở đây",
    },
    9:  {
      phrase: "của Đất Nuôi Khắp Không Phân biệt Cỏ Cây",
      rationale: "Hòa hợp: Kỷ = bao dung + LP9 = yêu nhân loại → nuôi cây dại cũng như cây quý, không phán xét",
    },
    11: {
      phrase: "của Đất Biết Rễ Nào Sắp Đến",
      rationale: "Hòa hợp: Kỷ = cảm nhận sâu + LP11 = biết trước → cảm nhận được rễ cây mới sắp xuyên qua trước khi thấy mầm",
    },
    22: {
      phrase: "của Đất Nền tảng Cho Công Trình kỳ vĩ",
      rationale: "Tension: Kỷ = nhỏ bé nuôi dưỡng + LP22 = tầm nhìn khổng lồ → đất vườn nhỏ nhưng là nền tảng cho công trình vĩ đại",
      changed: true,
    },
    33: {
      phrase: "của Đất Cho Đến lúc bạc Màu",
      rationale: "Hòa hợp: Kỷ = nuôi dưỡng + LP33 = hy sinh không cần ai biết → cho hết chất dinh dưỡng rồi khô cằn mà không kêu ca",
    },
  },

  // ============================================================
  // CANH — Lưỡi Kiếm Chưa Mài (mạnh mẽ, trực tiếp, cần thử thách)
  // ============================================================
  "Canh": {
    1:  {
      phrase: "của Thanh Kiếm Tự Mình Tìm Đường tiến",
      rationale: "Hòa hợp: Canh = tiên phong + LP1 = tự mở đường → kiếm không chờ ai dùng, tự tìm mục tiêu để cắt qua",
    },
    2:  {
      phrase: "của Lưỡi Kiếm Nghĩ trước khi Hành Động",
      rationale: "Tension: Canh = trực tiếp cứng rắn + LP2 = cảm nhận tinh tế → sắc nhưng học được rằng đôi khi cần dừng lại và nghe trước khi cắt",
    },
    3:  {
      phrase: "của Kiếm Cắt xua tan Luồng Khí nặng ",
      rationale: "Hòa hợp: Canh = cắt thẳng vào + LP3 = biến nặng thành nhẹ → một nhát kiếm đúng chỗ làm tan biến sự nặng nề",
    },
    4:  {
      phrase: "của lưỡi Kiếm Không Bao Giờ Gỉ sét",
      rationale: "Hòa hợp: Canh = bền bỉ + LP4 = làm mọi thứ hoạt động → kiếm được chăm sóc đúng cách, không bao giờ mất sắc",
    },
    5:  {
      phrase: "của Kiếm Chưa Biết dụng ra sao",
      rationale: "Tension: Canh = trực tiếp + LP5 = sợ chọn một hướng → sắc nhưng chưa quyết định nên cắt hướng nào",
    },
    6:  {
      phrase: "của Kiếm Bảo Vệ Không cần Hỏi Lý Do",
      rationale: "Hòa hợp: Canh = bảo vệ + LP6 = cho đi không nói → ra khỏi vỏ để bảo vệ mà không hỏi ai có xứng đáng không",
    },
    7:  {
      phrase: "của Gươm Sắc luôn kiếm tìm Đối Thủ",
      rationale: "Hòa hợp: Canh = mạnh nhưng cô đơn + LP7 = cô đơn hơn người → sắc nhất nhưng cũng khó tìm được người xứng tầm",
      changed: true,
    },
    8:  {
      phrase: "của Kiếm Giữ Được Đạo Của Mình",
      rationale: "Hòa hợp: Canh = bản sắc mạnh + LP8 = bản sắc quyền lực → kiếm biết ai cầm cán, không để ai đổi hướng lưỡi",
    },
    9:  {
      phrase: "của thanh Kiếm Bảo Vệ tất cả ",
      rationale: "Tension: Canh = cụ thể trực tiếp + LP9 = yêu nhân loại → sẵn sàng bảo vệ cả những người chưa biết mặt",
    },
    11: {
      phrase: "của Kiếm Biết Trận nào đang Đến",
      rationale: "Tension: Canh = phản xạ + LP11 = biết trước bằng trực giác → cứng nhưng cảm nhận được nguy hiểm trước khi nhìn thấy nó",
    },
    22: {
      phrase: "của Thanh Kiếm Tiên phong",
      rationale: "Hòa hợp: Canh = mạnh mẽ tiên phong + LP22 = tầm nhìn quy mô lớn → không chỉ cắt cho mình, mở đường cho cả đoàn người đi sau",
    },
    33: {
      phrase: "của Kiếm Cắt Gánh Nặng Cho Người",
      rationale: "Hòa hợp: Canh = hành động + LP33 = hy sinh không cần công nhận → cắt đứt gánh nặng của người khác mà không cần ai biết ai làm",
    },
  },

  // ============================================================
  // TÂN — Ngọc Quý Đã Mài (tinh tế, cầu toàn, sắc bén lặng lẽ)
  // ============================================================
  "Tân": {
    1:  {
      phrase: "của Ngọc Tự Mình Tỏa Ánh Sáng",
      rationale: "Tension: Tân = cần được công nhận + LP1 = không cần ai cho phép → ngọc học cách tự phát sáng mà không cần ai chiếu đèn",
    },
    2:  {
      phrase: "của Ngọc Thấy Được Vẻ Đẹp Ẩn",
      rationale: "Hòa hợp: Tân = thẩm mỹ tinh tế + LP2 = thấy thứ người khác không thấy → nhìn ra vẻ đẹp trong những thứ người khác cho là thô",
    },
    3:  {
      phrase: "của Ngọc Làm Sáng toàn thể Phục trang",
      rationale: "Hòa hợp: Tân = tinh tế tạo vẻ đẹp + LP3 = biến nặng thành nhẹ → một viên ngọc đúng chỗ làm cả bộ trang phục trở nên hoàn hảo",
      changed: true,
    },
    4:  {
      phrase: "của Ngọc Mài Đến Từng Góc Cạnh",
      rationale: "Hòa hợp: Tân = cầu toàn + LP4 = kỷ luật hệ thống → mài từng góc cạnh có hệ thống, không bỏ qua chi tiết nào",
    },
    5:  {
      phrase: "của Ngọc Chưa Chọn Được Khung",
      rationale: "Tension: Tân = cầu toàn + LP5 = sợ chọn → đã mài xong nhưng chưa quyết định đặt vào khung nào",
    },
    6:  {
      phrase: "của Ngọc Sáng Vì được Người Mang",
      rationale: "Hòa hợp: Tân = tỏa sáng khi được trân trọng + LP6 = cho đi không nói → sáng nhất khi được người khác mang",
    },
    7:  {
      phrase: "của Ngọc báu ẩn Quý khó dò",
      rationale: "Hòa hợp: Tân = chiều sâu bên trong + LP7 = sâu hơn bề mặt → vẻ đẹp bề ngoài là lớp đầu tiên, bên dưới còn nhiều lớp không ai thấy hết",
    },
    8:  {
      phrase: "của Ngọc Biết Giá trị Của Mình",
      rationale: "Hòa hợp: Tân = học cách tự định giá + LP8 = bản sắc quyền lực → ngọc không cần ai định giá, nó biết mình đáng bao nhiêu",
    },
    9:  {
      phrase: "của Ngọc Sáng Lên Vì Nhiều Người",
      rationale: "Tension: Tân = tinh tế cá nhân + LP9 = yêu nhân loại → tinh tế nhưng muốn ánh sáng chạm đến nhiều người hơn",
    },
    11: {
      phrase: "của Ngọc Biết Mình Là Ngọc quý ",
      rationale: "Tension: Tân = cần xác nhận + LP11 = biết trước khi có bằng chứng → học cách biết mình có giá trị mà không cần ai chứng minh",
    },
    22: {
      phrase: "của Ngọc trám Đỉnh Công Trình Vĩ Đại",
      rationale: "Hòa hợp: Tân = hoàn hảo + LP22 = tầm nhìn quy mô lớn → ngọc là chi tiết cuối cùng trên đỉnh một công trình vĩ đại",
      changed: true,
    },
    33: {
      phrase: "của Ngọc Sáng Không Cần Ai nhận Thấy",
      rationale: "Tension: Tân = cần công nhận + LP33 = hy sinh không cần ai biết → học được bài học lớn nhất: ngọc sáng dù không ai nhìn",
    },
  },

  // ============================================================
  // NHÂM — Đại Dương Không Bờ (rộng lớn, không kiểm soát, chứa tất cả)
  // ============================================================
  "Nhâm": {
    1:  {
      phrase: "của Đại Dương Tự Mình cuộn sóng Lên",
      rationale: "Hòa hợp: Nhâm = sức mạnh tự nhiên + LP1 = tự mở đường → thủy triều dâng không cần ai cho phép",
    },
    2:  {
      phrase: "của Đại Dương Nghe Được tận Đáy sâu",
      rationale: "Tension: Nhâm = rộng nhưng thiếu chiều sâu cá nhân + LP2 = cảm nhận tinh tế → học cách nghe được tiếng vọng từ đáy của chính mình",
    },
    3:  {
      phrase: "của Sóng Làm mòn Bờ Đá Nặng",
      rationale: "Hòa hợp: Nhâm = uyển chuyển + LP3 = biến nặng thành nhẹ → sóng mài mòn nhẹ nhàng cho đến khi đá tròn lại",
      changed: true,
    },
    4:  {
      phrase: "của Đại Dương Giữ Được Hải Trình",
      rationale: "Tension: Nhâm = tự do không bờ + LP4 = kỷ luật hệ thống → rộng lớn nhưng học cách giữ hải trình, không chảy vô định",
    },
    5:  {
      phrase: "của Sóng Không Biết Về Bờ Nào ",
      rationale: "Hòa hợp: Nhâm = không thể kiểm soát + LP5 = sợ chọn → lan ra mọi hướng vì không chọn được bờ nào để vào",
    },
    6:  {
      phrase: "của Đại Dương dưỡng Nuôi Hết Đòi hỏi",
      rationale: "Hòa hợp: Nhâm = chứa đựng tất cả + LP6 = cho đi không nói → nuôi tất cả sinh vật mà không yêu cầu gì",
    },
    7:  {
      phrase: "của Đại Dương Không Ai Chạm Đáy lòng",
      rationale: "Hòa hợp: Nhâm = sâu thẳm + LP7 = chiều sâu cô đơn → đáy không ai chạm đến được, cô đơn ở độ sâu tuyệt đối",
    },
    8:  {
      phrase: "của Đại Dương Không Ai Cai Trị",
      rationale: "Hòa hợp: Nhâm = không thể kiểm soát + LP8 = bản sắc quyền lực → không ai thật sự cai trị được đại dương",
    },
    9:  {
      phrase: "của Sóng Chạm Hết Mọi Bờ",
      rationale: "Hòa hợp: Nhâm = không phân biệt + LP9 = yêu nhân loại → sóng chạm mọi bờ biển, không bỏ sót lục địa nào",
    },
    11: {
      phrase: "của Đại Dương Cảm Được Bão cơn Xa",
      rationale: "Hòa hợp: Nhâm = rộng lớn cảm nhận + LP11 = biết trước → cảm được bão từ ngàn hải lý trước khi nó đến",
    },
    22: {
      phrase: "của Đại Dương Kết Nối Mọi Lục Địa",
      rationale: "Hòa hợp: Nhâm = kết nối tất cả + LP22 = tầm nhìn quy mô lớn → chỉ đại dương mới kết nối được tất cả các lục địa cùng lúc",
    },
    33: {
      phrase: "của cơn Sóng luôn Nâng Thuyền bình đẳng",
      rationale: "Hòa hợp: Nhâm = hào phóng + LP33 = hy sinh không cần công nhận → nâng tất cả thuyền lên mà không hỏi ai xứng đáng",
    },
  },

  // ============================================================
  // QUÝ — Suối Ngầm Vô Hình (thấm sâu, vô hình, nuôi dưỡng lặng lẽ)
  // ============================================================
  "Quý": {
    1:  {
      phrase: "của Suối Ngầm Tự Tìm được Lối Ra",
      rationale: "Hòa hợp: Quý = âm thầm kiên trì + LP1 = tự mở đường → suối ngầm không chờ ai đào, tự tìm đường xuyên qua đá",
    },
    2:  {
      phrase: "của Suối chảy băng vào miền Ẩn Khuất",
      rationale: "Hòa hợp: Quý = thấm vào mọi ngóc ngách + LP2 = thấy thứ người khác không thấy → sương thấm vào từng khe hở, thấy những gì nắng không chiếu được",
    },
    3:  {
      phrase: "của Suối Nhẹ nhàng Làm Dịu Buổi Trưa",
      rationale: "Hòa hợp: Quý = nhẹ nhàng + LP3 = biến nặng thành nhẹ → mưa nhỏ đúng lúc làm tan biến sự ngột ngạt",
    },
    4:  {
      phrase: "của Suối Chảy Đều Không Ngừng không Cạn",
      rationale: "Hòa hợp: Quý = kiên nhẫn bền bỉ + LP4 = làm mọi thứ hoạt động → suối ngầm không ồn ào nhưng chảy đều, không bao giờ cạn",
    },
    5:  {
      phrase: "của Sương Chưa Biết Đọng Ở Đâu",
      rationale: "Tension: Quý = âm thầm + LP5 = sợ chọn → sương bay khắp nơi chưa biết sẽ đọng lại trên lá nào",
    },
    6:  {
      phrase: "của Mưa Nuôi Đất Không Kể công",
      rationale: "Hòa hợp: Quý = nuôi dưỡng lặng lẽ + LP6 = cho đi không nói → thấm vào đất suốt đêm, không cần ai biết đang làm gì",
    },
    7:  {
      phrase: "của Suối Ngầm Chỉ Mình Thấu hiểu",
      rationale: "Hòa hợp: Quý = vô hình + LP7 = cô đơn chiều sâu → chảy ở chỗ không ai thấy, chỉ nó biết nó đang ở đâu",
    },
    8:  {
      phrase: "của Suối Ngầm Biết Sức Mình quyền lực",
      rationale: "Tension: Quý = yếu bề ngoài + LP8 = quyền lực bản sắc → nước thấm lâu sẽ mòn đá, đó là quyền lực thật sự",
    },
    9:  {
      phrase: "của Mưa Thấm Đều khắp Mặt Đất",
      rationale: "Hòa hợp: Quý = không phân biệt + LP9 = yêu nhân loại → thấm đều khắp nơi, không bỏ sót mảnh đất nào",
    },
    11: {
      phrase: "của Sương Mai Biết Trước Ánh Bình Minh",
      rationale: "Hòa hợp: Quý = nhạy cảm sâu + LP11 = biết trước → sương xuất hiện trước khi mặt trời mọc, biết bình minh đến trước khi ai thấy",
    },
    22: {
      phrase: "của Giọt Nước Tạo Nên Đại Dương",
      rationale: "Tension: Quý = nhỏ bé âm thầm + LP22 = tầm nhìn khổng lồ → từng giọt nước nhỏ là phần của đại dương",
    },
    33: {
      phrase: "của Suối Ngầm Không Tên Nuôi Rừng rậm ",
      rationale: "Hòa hợp: Quý = vô hình nuôi dưỡng + LP33 = hy sinh không cần công nhận → nuôi cả khu rừng mà không cái cây nào biết tên nó",
    },
  },
}

/**
 * Helper: lấy phrase cho ShareCard
 * @param nhatChu - "Giáp" | "Ất" | ...
 * @param lifePathNumber - 1 | 2 | ... | 33
 */
export function getCombinationPhrase(
  nhatChu: string,
  lifePathNumber: number
): string {
  return COMBINATION_PHRASES[nhatChu]?.[lifePathNumber]?.phrase ?? ""
}
