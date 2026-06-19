/**
 * PA KB — SOCIAL SKILLS & ENVIRONMENT DATA
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 9
 *
 * [P] "50 giờ/200 giờ kết bạn" — Dunbar/Hall research, cite là [P] practitioner
 * ⚠️ RANH GIỚI: PA "Kỹ năng xã hội đời thường" (KHÔNG phải WA/MA)
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── SOCIAL STYLE BY GROUP ────────────────────────────────

export interface SocialStyle {
  energySource: string
  friendshipStyle: string
  friendshipStrength: string
  friendshipChallenge: string
  urbanLonelinessRisk: 'Cao' | 'Trung bình' | 'Thấp'
  urbanLonelinessNote: string
  rejectReaction: string
}

export const SOCIAL_STYLE_BY_GROUP: Record<MbtiGroup, SocialStyle> = {
  NT: {
    energySource: "Không gian yên tĩnh độc lập · recharge qua suy nghĩ một mình",
    friendshipStyle: "Kết bạn qua chia sẻ ý tưởng khoa học · dự án chung · sở thích chuyên sâu",
    friendshipStrength: "Khách quan, trung thực, tin cậy · không gây drama",
    friendshipChallenge: "Khô khan · né tránh biểu đạt cảm xúc · khó small talk",
    urbanLonelinessRisk: "Trung bình",
    urbanLonelinessNote: "NT tự thoải mái với không gian một mình · nguy cơ thấp hơn NF/SF nhưng dễ bị cô lập tri thức",
    rejectReaction: "Rút lui vào thế giới lý trí · phân tích nguyên nhân một cách tách biệt · không biểu lộ",
  },
  NF: {
    energySource: "Kết nối sâu với nội tâm hoặc trò chuyện một-một với tri kỷ",
    friendshipStyle: "Kết bạn bằng sự thấu cảm · biết lắng nghe chân thành · kết nối qua giá trị",
    friendshipStrength: "Empathy sâu · hỗ trợ cảm xúc tuyệt vời · tạo không gian an toàn cho người khác",
    friendshipChallenge: "Kỳ vọng quá cao về độ thuần khiết tình bạn · dễ tổn thương sâu trước sự thờ ơ",
    urbanLonelinessRisk: "Cao",
    urbanLonelinessNote: "NF nhạy cảm với môi trường xã hội · xa gia đình + thiếu kết nối sâu = cô đơn mạn tính",
    rejectReaction: "Tự dằn vặt · rụt rè · hoài nghi giá trị bản thân · cần thời gian dài để hồi phục",
  },
  ST: {
    energySource: "Hoạt động thể chất thực tế · thói quen ngăn nắp · kết quả cụ thể",
    friendshipStyle: "Kết bạn qua cùng làm việc · CLB kỹ năng · hành động chung có mục tiêu",
    friendshipStrength: "Đáng tin cậy · thực tế · giữ lời hứa · không drama",
    friendshipChallenge: "Khó thấu hiểu khủng hoảng cảm xúc phức tạp của người khác",
    urbanLonelinessRisk: "Thấp",
    urbanLonelinessNote: "ST có thể hoạt động độc lập tốt · ít phụ thuộc quan hệ xã hội để tái nạp năng lượng",
    rejectReaction: "Nhanh chóng gạt bỏ cảm xúc tiêu cực · tập trung vào mục tiêu công việc bận rộn",
  },
  SF: {
    energySource: "Ở giữa đám đông vui vẻ ấm áp · kết nối xã hội rộng rãi",
    friendshipStyle: "Kết bạn cực kỳ nhanh nhờ tính cách thân thiện cởi mở · dễ tạo ấn tượng tốt",
    friendshipStrength: "Network rộng · warm · tạo không khí vui vẻ · chăm sóc người khác",
    friendshipChallenge: "Khó duy trì chiều sâu dài lâu · dễ bị cuốn vào drama không đáng có",
    urbanLonelinessRisk: "Cao",
    urbanLonelinessNote: "SF cần người xung quanh · mất kết nối xã hội = năng lượng tụt nhanh · dễ FOMO",
    rejectReaction: "Hoang mang, hụt hẫng · cố gắng lấp đầy bằng hoạt động xã hội náo nhiệt khác",
  },
}

// ─── WHERE TO FIND FRIENDS BY GROUP ──────────────────────

export const FRIENDSHIP_SPACES: Record<MbtiGroup, string[]> = {
  NT: [
    "Câu lạc bộ cờ vua · diễn đàn lập trình",
    "Hackathon công nghệ · Tech Meetup HCM/HN",
    "Discord cộng đồng học thuật · tranh biện",
    "Workshop khoa học · TEDx local talks",
  ],
  NF: [
    "Hội nhóm thiện nguyện bảo tồn động vật hoang dã",
    "Workshop viết lách chữa lành · lớp yoga chánh niệm",
    "Retreat thiền định · book club nhỏ",
    "Cộng đồng nghệ thuật sáng tạo · cosplay group",
  ],
  ST: [
    "Câu lạc bộ chạy bộ · thể thao bán chuyên",
    "Maker Space · lớp học kỹ năng thực hành",
    "CLB võ thuật · phòng gym có community",
    "Hội sửa xe · cộng đồng cơ khí DIY",
  ],
  SF: [
    "Lớp học nấu ăn gia đình · workshop làm bánh",
    "Hội nhóm nuôi thú cưng · thiện nguyện cộng đồng",
    "CLB nhảy hiện đại · K-pop dance",
    "Facebook Group Hội Yêu Bếp · Hội làm vườn ban công",
  ],
}

// ─── FRIENDSHIP OPENING SCRIPTS (tiếng Việt tự nhiên) ────

export const OPENING_SCRIPTS: Record<MbtiGroup, { context: string; script: string }[]> = {
  NT: [
    {
      context: "Tại workshop khoa học dữ liệu",
      script: "Chào bạn, mình thấy bạn rất chú ý đến phần tối ưu hoá mô hình hồi quy vừa rồi. Bạn có đang triển khai thuật toán này cho dự án cá nhân nào không, mình có thể trao đổi một chút về logic của nó được chứ?",
    },
    {
      context: "Tại cộng đồng cờ vua",
      script: "Cách bạn xử lý thế cờ ở nước đó khá thú vị, mình không nghĩ đến hướng đó. Bạn thường học khai cuộc từ nguồn nào vậy?",
    },
  ],
  NF: [
    {
      context: "Tại sự kiện bảo tồn môi trường",
      script: "Chào bạn, mình thấy bức tranh thông điệp bảo vệ động vật hoang dã của bạn có chiều sâu quá. Bạn thường tham gia các hoạt động cộng đồng này lâu chưa, cảm xúc của bạn thế nào khi cùng mọi người lan toả giá trị xanh?",
    },
    {
      context: "Tại book club",
      script: "Cách bạn đọc cuốn sách đó khác hoàn toàn với mình. Mình tò mò bạn thường đọc để tìm kiếm điều gì, có phải chỉ thông tin không hay còn gì khác?",
    },
  ],
  ST: [
    {
      context: "Tại phòng tập gym/chạy bộ",
      script: "Chào bạn, form chạy bộ của bạn nhìn rất chuẩn và giữ nhịp thở đều quá. Bạn có mục tiêu tham gia giải chạy marathon nào sắp tới không, có thể chia sẻ cho mình chút kinh nghiệm tập luyện không?",
    },
    {
      context: "Tại maker space",
      script: "Bạn đang làm dự án gì vậy? Mình thấy cách bạn hàn mạch đó nhìn rất gọn. Bạn học electronics tự học hay có khoá nào không?",
    },
  ],
  SF: [
    {
      context: "Tại workshop làm bánh thủ công",
      script: "Chào bạn, chiếc bánh của bạn trang trí nhìn bắt mắt và ấm cúng quá! Bạn có bí quyết gì để phối màu kem mịn màng như vậy không, chỉ cho mình với để bữa tới mình làm tặng gia đình xem sao.",
    },
    {
      context: "Tại lớp nấu ăn",
      script: "Mùi món của bạn làm ngon ghê! Bạn thường nấu ở nhà hay chỉ học lớp thôi? Cuối tuần nhóm mình hay tổ chức nấu ăn cùng, bạn có muốn tham gia không?",
    },
  ],
}

// ─── FRIENDSHIP TIMELINE ──────────────────────────────────

export const FRIENDSHIP_TIMELINE = {
  acquaintance: { hours: 50, activities: ["Cùng làm dự án nhỏ", "Đi bộ ngoài trời cùng", "Chia sẻ khó khăn thực tế"] },
  closeFriend: { hours: 200, activities: ["Cùng trải qua thử thách lớn", "Chia sẻ điều chưa nói với ai", "Hỗ trợ nhau trong khủng hoảng"] },
  trapsToAvoid: ["Ghosting (cắt liên lạc đột ngột)", "Surface-level friendship mãi mãi", "Toxic friend thao túng tâm lý"],
  source: "[P] Dunbar/Hall research on friendship formation · practitioner consensus",
}

// ─── NETWORKING BY GROUP ──────────────────────────────────

export const NETWORKING_GUIDE: Record<MbtiGroup, { approach: string; online: string; maintenance: string }> = {
  NT: {
    approach: "Đóng góp tri thức chuyên môn sâu · viết bài phân tích hệ thống trên LinkedIn · tham gia giải quyết bài toán công nghệ phức tạp",
    online: "LinkedIn chuyên sâu · GitHub contributions · Discord kỹ thuật · Spiderum bài viết học thuật",
    maintenance: "Chia sẻ article hay · comment phân tích · không cần check-in thường xuyên",
  },
  NF: {
    approach: "Kết nối qua giá trị nhân văn cốt lõi · tham gia xây dựng dự án cộng đồng · lý tưởng sống chung",
    online: "Facebook Groups ý nghĩa · LinkedIn storytelling · Instagram values-based",
    maintenance: "Gửi tài liệu phù hợp với mối quan tâm · hỏi thăm nhân dịp đặc biệt · không cần đi ăn mới duy trì",
  },
  ST: {
    approach: "Giúp đỡ xử lý vấn đề kỹ thuật thực tế · tối ưu hoá quy trình · có qua có lại rõ ràng sòng phẳng",
    online: "LinkedIn recommendations · GitHub profile · các forum kỹ thuật",
    maintenance: "Checkin khi có dự án chung · chia sẻ tool hữu ích · rõ ràng về mutual benefit",
  },
  SF: {
    approach: "Quan hệ cá nhân ấm áp chân thành · giới thiệu cơ hội cho người xung quanh · chăm sóc mạng lưới bằng sự tinh tế",
    online: "Facebook · Zalo group · Instagram stories hỏi thăm",
    maintenance: "Hỏi thăm nhân dịp lễ Tết · nhớ ngày sinh nhật · gửi quà nhỏ",
  },
}

// ─── BOUNDARY SCRIPTS (ranh giới) ─────────────────────────

export interface BoundaryScript {
  situation: string
  naturalReaction: string
  betterApproach: string
  script: string
  mostDifficultFor: MbtiGroup[]
}

export const BOUNDARY_SCRIPTS: BoundaryScript[] = [
  {
    situation: "Người quen hỏi vay tiền tiêu dùng cá nhân",
    naturalReaction: "Cho vay vì ngại từ chối (NF/SF) hoặc cho vay không có kế hoạch",
    betterApproach: "Từ chối lịch sự nhưng rõ ràng · không giải thích dài dòng",
    script: "Mình rất thông cảm với hoàn cảnh hiện tại của bạn. Tuy nhiên, hiện tại mình đã có kế hoạch phân bổ tài chính cố định cho các khoản chi phí sinh hoạt gia đình và đầu tư dài hạn nên không thể trích ra khoản tiền mặt này được. Bạn thử liên hệ các tổ chức tín dụng chính thống xem sao nhé.",
    mostDifficultFor: ["NF", "SF"],
  },
  {
    situation: "Người thân can thiệp sâu vào chuyện hôn nhân, đời tư",
    naturalReaction: "Im lặng chịu đựng · hoặc bực bội nhưng không nói thẳng",
    betterApproach: "Cảm ơn quan tâm · khẳng định đang tự xử lý · đóng chủ đề",
    script: "Cháu rất cảm ơn sự quan tâm và lo lắng của cô/bác dành cho cháu ạ. Cháu biết mọi người đều mong cháu sớm ổn định cuộc sống. Hiện tại cháu đang tập trung toàn bộ năng lượng để hoàn thành các mục tiêu công việc. Khi nào có kế hoạch cụ thể chắc chắn cháu sẽ chia sẻ với cả nhà.",
    mostDifficultFor: ["NF", "SF"],
  },
  {
    situation: "Đồng nghiệp nhờ làm việc ngoài giờ thường xuyên không có thù lao",
    naturalReaction: "Nhận làm vì sợ xung đột · mệt mỏi dần theo thời gian",
    betterApproach: "Lịch sự nhưng rõ ràng về giới hạn thời gian · đề xuất giải pháp thay thế",
    script: "Em luôn sẵn sàng phối hợp cùng team để hoàn thành công việc chung trong giờ làm việc quy định. Tuy nhiên, tối nay em đã có lịch trình cá nhân quan trọng không thể dời lại được. Để đảm bảo chất lượng tốt nhất, em xin phép sẽ tập trung xử lý dứt điểm đầu việc này ngay khi bắt đầu giờ làm việc sáng mai sếp nhé.",
    mostDifficultFor: ["NF", "SF"],
  },
]

// ─── DAILY CONFLICT SCRIPTS ───────────────────────────────

export const CONFLICT_SCRIPTS = [
  {
    situation: "Hàng xóm karaoke ồn ào lúc nửa đêm",
    betterApproach: "Gặp trực tiếp ban ngày · hoặc báo ban quản lý/công an phường",
    script: "Anh chị ơi, giờ cũng đã muộn rồi, mai nhà em có người lớn tuổi phải đi khám bệnh sớm và các cháu phải đi học. Anh chị vui lòng vặn nhỏ âm lượng lại hoặc hẹn buổi khác ban ngày hát tiếp để mọi người xung quanh nghỉ ngơi nhé. Em cảm ơn anh chị rất nhiều.",
  },
  {
    situation: "Đặt đồ ăn qua app bị giao sai món",
    betterApproach: "Chụp ảnh bằng chứng · khiếu nại đúng quy trình app · không chửi shipper",
    script: "Chào bộ phận hỗ trợ, mã đơn hàng của tôi bị giao sai so với món đã đặt. Tôi gửi kèm hình ảnh thực tế món nhận được và hóa đơn đối chiếu. Nhờ kiểm tra và tiến hành hoàn tiền hoặc giao lại đúng món giúp tôi theo đúng quy trình nhé. Cảm ơn các bạn.",
  },
  {
    situation: "Bị xúc phạm công kích trên mạng xã hội",
    betterApproach: "Không phản hồi · chặn tài khoản · báo cáo vi phạm nền tảng",
    script: "Không cần script · silence + block + report là đủ",
  },
  {
    situation: "Bạn bè liên tục hủy kế hoạch sát giờ hẹn (lần 3+)",
    betterApproach: "Nói thẳng lịch sự · tôn trọng thời gian nhau · đề xuất điều chỉnh",
    script: "Mình rất trân trọng những buổi gặp mặt với bạn. Tuy nhiên, việc bạn hủy hẹn sát giờ lần này là lần thứ 3 liên tiếp làm ảnh hưởng nhiều đến lịch trình của mình. Nếu bạn đang có giai đoạn bận rộn quá, tụi mình có thể thư thư ra rồi hẹn lại khi nào bạn chắc chắn sắp xếp được thời gian nhé.",
  },
  {
    situation: "Bị hiểu nhầm trong nhóm chat công việc/gia đình",
    betterApproach: "Đưa ra khỏi group chat · gọi điện hoặc gặp trực tiếp để làm rõ",
    script: "Mọi người ơi, em thấy nội dung trao đổi vừa rồi đang có vài điểm chưa thống nhất. Để không làm phiền không gian chung của nhóm, em xin phép được gọi điện trực tiếp hoặc gặp anh/chị trưởng nhóm trong 5 phút để tụi mình làm rõ nhanh nhé.",
  },
]

// ─── ENVIRONMENT DATA ─────────────────────────────────────

export const ENVIRONMENT_STYLE: Record<MbtiGroup, {
  motivation: string
  strengths: string[]
  barriers: string
  approach: string
  minimalism30DayChallenge: string
}> = {
  NT: {
    motivation: "Data khoa học về biến đổi khí hậu · chỉ số carbon footprint · hệ thống tư duy môi trường",
    strengths: ["Phân tích hệ thống tìm giải pháp công nghệ xanh", "Thiết lập quy trình tiết kiệm năng lượng hiệu quả", "Không bị marketing greenwashing dắt mũi"],
    barriers: "Thất vọng trước sự thiếu đồng bộ của hệ thống rác thải đô thị",
    approach: "Cung cấp số liệu cụ thể về carbon savings · tập trung tối ưu hoá từ căn hộ cá nhân",
    minimalism30DayChallenge: "'Cai nghiện tin tức độc hại': chỉ follow tối đa 3 nguồn học thuật chất lượng · xoá app không dùng · dành thời gian deep thinking",
  },
  NF: {
    motivation: "Lòng trắc ẩn với muôn thú · thấu cảm thiên nhiên · bảo vệ cho thế hệ tương lai",
    strengths: ["Ăn chay có ý thức", "Giảm rác thải nhựa kiên trì", "Ủng hộ sản phẩm thủ công fair trade"],
    barriers: "Eco-anxiety: lo lắng quá mức đến tê liệt hành động",
    approach: "Kết nối với cộng đồng hành động thực tế có năng lượng tích cực · bình thường hoá cảm xúc lo âu",
    minimalism30DayChallenge: "KonMari: cho đi đồ cũ còn tốt · capsule wardrobe tối giản thân thiện môi trường · chỉ giữ thứ 'spark joy' thật sự",
  },
  ST: {
    motivation: "'Tiết kiệm tài nguyên = tiết kiệm tiền bạc' · data hiệu quả tài chính cụ thể",
    strengths: ["Repair > replace: sửa thay vì mua mới", "Bảo trì thiết bị định kỳ tối ưu hiệu suất", "Không theo trend môi trường không có kết quả"],
    barriers: "Ít hứng thú với phong trào mang tính khẩu hiệu lý thuyết",
    approach: "Số liệu chứng minh hiệu quả tiết kiệm chi phí · LED giảm 60% tiền điện · vòi tiết kiệm giảm 30-50% nước",
    minimalism30DayChallenge: "Practical utility: thanh lý sửa chữa thiết bị hỏng lâu trong kho · số hoá tài liệu giấy lên cloud · chỉ giữ thứ dùng thường xuyên",
  },
  SF: {
    motivation: "Bảo vệ sức khoẻ người thân · giáo dục thế hệ tương lai · không gian sống xanh mát",
    strengths: ["Lan toả năng lượng tích cực", "Tổ chức dọn rác bãi biển cùng cộng đồng", "Mua rau củ địa phương sạch"],
    barriers: "Tiêu dùng theo trào lưu mạng xã hội",
    approach: "Biến thói quen xanh thành trải nghiệm gia đình vui vẻ gắn kết · không phải obligation nặng nề",
    minimalism30DayChallenge: "Social connection space: dọn đồ trang trí bám bụi · giữ góc nhỏ ấm cúng đón khách · tập trung trải nghiệm chung > vật chất tích trữ",
  },
}

export const PRACTICAL_GREEN_ACTIONS = {
  home: [
    "Tắt hoàn toàn thiết bị standby: tiết kiệm 8-10% điện/tháng",
    "Thay bóng LED: tiết kiệm 60% điện chiếu sáng",
    "Điều hoà 25-26°C + quạt gió: tối ưu điện + sức khoẻ hô hấp",
    "Vòi sen tiết kiệm nước: giảm 30-50% nước sử dụng",
    "Tái sử dụng nước giặt: lau nhà · rửa nhà vệ sinh · tưới cây",
    "Phân loại rác: hữu cơ (thức ăn thừa) vs tái chế (nhựa · lon · giấy)",
    "Compost Bokashi trong căn hộ nhỏ: không mùi · cho cây ban công",
    "Mua thực phẩm local: giảm carbon từ vận chuyển đường dài",
  ],
  transport: [
    "Xe máy điện: giảm 70% chi phí nhiên liệu/km vs xăng",
    "Xe đạp điện nội thành: lộ trình ngắn < 5km",
    "Metro/xe buýt điện: cho lịch trình cố định",
    "Carbon offset khi bay: chỉ có giá trị nếu dự án được xác thực độc lập",
  ],
  shopping: [
    "Second-hand: chợ Hoàng Hoa Thám (HCM) · chợ Đông Tác (HN) · app mua bán đồ cũ",
    "Greenwashing alert: cần chứng nhận xanh quốc tế · không chỉ bao bì kraft màu nâu",
    "Giảm nhựa: túi vải · bình nước giữ nhiệt · từ chối ống hút nhựa",
  ],
  food: [
    "Flexitarian: giảm 50% thịt đỏ · thay bằng đạm thực vật · cá nhỏ",
    "Chợ truyền thống > siêu thị: ít bao bì · nông sản địa phương theo mùa",
    "VietGAP/GlobalGAP > organic đắt đỏ: đủ an toàn với giá hợp lý",
  ],
}

export const VN_ENV_ORGANIZATIONS = [
  { name: "GreenHub", focus: "Giảm rác thải nhựa · kinh tế tuần hoàn · phân loại rác tại nguồn", how: "Volunteer · workshop kỹ thuật" },
  { name: "WildAct", focus: "Bảo tồn động vật hoang dã · chống săn bắn trái phép", how: "Giáo dục · truyền thông · volunteer" },
  { name: "Greenlife", focus: "Thu gom rác tái chế đổi cây xanh · phổ biến tại miền Bắc", how: "Tham gia ngày hội đổi rác" },
  { name: "CHANGE", focus: "Chiến dịch thay đổi hành vi môi trường · bảo vệ động vật hoang dã", how: "Volunteer · social media campaigns" },
  { name: "WWF Vietnam", focus: "Bảo tồn đa dạng sinh học · sông Mê Kông", how: "Donation · tình nguyện · adopt a species" },
  { name: "Let's Do It Vietnam", focus: "Dọn sạch rác tự phát khắp cả nước", how: "Đăng ký sự kiện dọn rác địa phương" },
  { name: "Green Seed", focus: "Lối sống xanh · workshop tái chế vải · nến thơm sáp đậu nành", how: "Tham gia workshop" },
  { name: "VNSX (Việt Nam Sạch và Xanh)", focus: "Giáo dục môi trường học sinh · dọn rác đô thị", how: "Volunteer dọn rác" },
  { name: "VEO (Tình nguyện viên vì Giáo dục)", focus: "Du lịch tình nguyện · sinh kế bền vững vùng cao", how: "Đăng ký volunteer tour" },
  { name: "AFEO (Hành động vì Môi trường)", focus: "Trồng rừng phòng hộ đầu nguồn · lối sống xanh đô thị", how: "Tham gia trồng cây · workshop" },
]

export const ECO_PSYCHOLOGY_TRAPS = [
  {
    name: "Eco-anxiety (Lo âu môi trường)",
    description: "Bất lực, tuyệt vọng, lo sợ quá mức trước viễn cảnh ảm đạm → tê liệt hành động",
    solution: "Bình thường hoá cảm xúc này · tập trung hành động nhỏ kiểm soát được · không ôm gánh nặng vấn đề vĩ mô",
  },
  {
    name: "Eco-performatism (Lối sống xanh trình diễn)",
    description: "Chỉ đăng cốc giấy · túi vải · volunteer trips lên mạng xã hội mà không thực hành trong đời sống",
    solution: "Lối sống xanh thực chất = hành động âm thầm bền bỉ nhất quán trong không gian riêng tư mỗi ngôi nhà",
  },
]

export const VN_ENVIRONMENT_CONTEXT = {
  climateVulnerability: "Việt Nam top 5 quốc gia dễ tổn thương nhất do biến đổi khí hậu · đường bờ biển dài",
  mainIssues: [
    "Nước biển dâng · xâm nhập mặn ĐBSCL → đe doạ an ninh lương thực",
    "Bão lũ cực đoan tăng tần suất · nắng nóng kỷ lục",
    "AQI Hà Nội/HCM thường trong top ô nhiễm nhất thế giới (PM2.5 từ xe máy xăng · xây dựng · nhiệt điện)",
    "VN top thải rác nhựa ra biển nhiều nhất thế giới",
    "Tồn dư thuốc BVTV trong rau củ · chất cấm trong thịt gia súc",
  ],
  airQualityProtection: ["Theo dõi AQI hàng ngày (app IQAir · PAM Air)", "Khẩu trang N95 khi ra đường ngày AQI > 150", "Trồng cây lọc không khí trong nhà (lưỡi hổ · trầu bà · lily hoà bình)"],
}

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getSocialStyle(group: MbtiGroup): SocialStyle {
  return SOCIAL_STYLE_BY_GROUP[group]
}

export function getFriendshipSpaces(group: MbtiGroup): string[] {
  return FRIENDSHIP_SPACES[group] ?? []
}

export function getOpeningScripts(group: MbtiGroup) {
  return OPENING_SCRIPTS[group] ?? []
}

export function getBoundaryScriptsByGroup(group: MbtiGroup): BoundaryScript[] {
  return BOUNDARY_SCRIPTS.filter(s => s.mostDifficultFor.includes(group))
}
