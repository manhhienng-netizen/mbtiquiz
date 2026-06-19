/**
 * PA KB — CULTURE & PHILOSOPHY DATA
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 4
 *
 * Tiếp cận: học thuật · tôn trọng tất cả · không phán xét
 * KHÔNG đưa quan điểm tôn giáo "đúng/sai"
 * Tôn giáo = hệ thống tri thức nhân loại · không phải công cụ cải đạo
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── TYPES ────────────────────────────────────────────────

export interface Philosophy {
  name: string
  origin: string
  civilization: string
  corePrinciples: string[]
  modernApplication: string
  bestFor: MbtiGroup[]
  whyThisGroup: string
  resourcesVN: string[]
}

export interface Religion {
  name: string
  branches: string[]
  origin: string
  founder: string
  era: string
  scripture: string
  coreBelief: string
  afterlife: string
  ethics: string
  customs: string[]
  culturalInfluence: string
  bestFor: MbtiGroup[]
  commonMisconception: string
}

export interface Ritual {
  culture: string
  ritual: string
  meaning: string
  modernAdaptation: string
  whatWeCanLearn: string
}

// ─── 8 TRIẾT LÝ SỐNG LỚN ─────────────────────────────────

export const PHILOSOPHIES: Philosophy[] = [
  {
    name: "Stoicism (Chủ nghĩa Khắc Kỷ)",
    origin: "Hy Lạp - La Mã cổ đại",
    civilization: "Marcus Aurelius · Seneca · Epictetus",
    corePrinciples: [
      "Phân biệt điều kiểm soát được (suy nghĩ · hành động) và không thể (kết quả · đánh giá người khác)",
      "Amor Fati: yêu thương và chấp nhận số phận như nó vốn là",
      "Premeditatio Malorum: chuẩn bị tinh thần cho điều tồi tệ nhất để không bị bất ngờ",
      "Tức thì sống đúng lúc này — không hối tiếc quá khứ, không lo âu tương lai",
    ],
    modernApplication: "Giữ bình tĩnh trước khủng hoảng công sở · trung hoà cảm xúc tiêu cực khi dính phạt nguội oan · không để phản ứng cảm xúc làm hỏng quyết định quan trọng",
    bestFor: ["NT", "ST"],
    whyThisGroup: "NT và ST đề cao tính logic và kiểm soát nội tâm · Stoicism cung cấp framework lý tính để quản lý cảm xúc",
    resourcesVN: ["Sách: 'Suy tưởng' (Marcus Aurelius) — có bản tiếng Việt", "Podcast: Tri Kỷ Cảm Xúc (tập về Khắc Kỷ)", "Sách: 'Obstacle Is the Way' (Ryan Holiday) — trên Fonos"],
  },
  {
    name: "Phật giáo Chánh niệm",
    origin: "Ấn Độ cổ đại",
    civilization: "Thích Ca Mâu Ni · thế kỷ VI TCN",
    corePrinciples: [
      "Tứ diệu đế: Khổ đế · Tập đế · Diệt đế · Đạo đế",
      "Bát chánh đạo: con đường giải thoát qua 8 thực hành đúng đắn",
      "Vô thường (Anicca): mọi thứ đều thay đổi, không có gì là vĩnh cửu",
      "Vô ngã (Anatta): không có một 'bản ngã' cố định và tách biệt",
      "Sống trọn vẹn trong hiện tại · không bám víu quá khứ, lo sợ tương lai",
    ],
    modernApplication: "Thiền ăn · thiền đi bộ ngắn giữa các giờ làm việc áp lực · cắt giảm dòng overthinking của NT · chữa lành emotional exhaustion cho NF",
    bestFor: ["NF", "SF"],
    whyThisGroup: "NF và SF nhạy cảm cảm xúc và khao khát an yên · Phật giáo cung cấp framework giải quyết khổ đau không phán xét",
    resourcesVN: ["Sách: 'Nẻo về ý dẫn' (Thích Nhất Hạnh)", "Podcast: Pháp Thoại Thầy Minh Niệm", "App: Insight Timer (có hướng dẫn thiền tiếng Việt)"],
  },
  {
    name: "Đạo giáo (Taoism)",
    origin: "Trung Hoa cổ đại",
    civilization: "Lão Tử · Trang Tử",
    corePrinciples: [
      "Vô Vi: hành động thuận tự nhiên, không gượng ép, không can thiệp thái quá",
      "Sự hài hoà Âm Dương: mọi thứ đều có mặt đối lập bổ sung nhau",
      "Tôn trọng tính giản đơn, nguyên bản (Phác): bản chất tự nhiên trước khi bị xã hội định hình",
      "Nước (Thủy): mềm mại nhưng có thể bào mòn đá — sức mạnh trong sự uyển chuyển",
    ],
    modernApplication: "Chấp nhận biến động thị trường lao động mà không kháng cự · không gượng ép các mối quan hệ độc hại · flow state trong công việc sáng tạo",
    bestFor: ["NT", "NF"],
    whyThisGroup: "INTP/ENTP yêu thích tự do và tính linh hoạt cao · INFP/ISFP tìm kiếm sự hoà hợp với tự nhiên",
    resourcesVN: ["Sách: 'Đạo Đức Kinh' (Lão Tử) — nhiều bản dịch tiếng Việt", "Podcast: Oddly Normal (tập về Đạo giáo)", "Sách: 'The Tao of Pooh' (Benjamin Hoff)"],
  },
  {
    name: "Existentialism (Triết học Hiện sinh)",
    origin: "Châu Âu hiện đại",
    civilization: "Sartre · Camus · Kierkegaard · Beauvoir",
    corePrinciples: [
      "Sự tồn tại có trước bản chất: con người không có mục đích được định sẵn, tự kiến tạo ý nghĩa",
      "Tự do tuyệt đối đi liền trách nhiệm tối thượng: không thể đổ lỗi hoàn toàn cho hoàn cảnh",
      "Absurdism (Camus): cuộc sống vốn vô nghĩa nhưng ta vẫn chọn sống và tìm ý nghĩa trong đó",
      "Chân xác (Authenticity): sống đúng với bản thân thay vì vai trò xã hội áp đặt",
    ],
    modernApplication: "Vượt qua khủng hoảng công việc vô nghĩa bằng cách chủ động thiết lập mục tiêu cá nhân ngoài giờ làm việc · không sống theo kịch bản người khác viết cho mình",
    bestFor: ["NF", "NT"],
    whyThisGroup: "INFP/ENFP cần định nghĩa giá trị bản thân độc lập · ENTP yêu thích tranh biện về bản chất tồn tại",
    resourcesVN: ["Sách: 'Dịch hạch' (Camus) — có bản tiếng Việt", "Podcast: Amateur Psychology (tập về hiện sinh)", "Sách: 'Hiện hữu và hư vô' (Sartre) — học thuật hơn"],
  },
  {
    name: "Ikigai",
    origin: "Nhật Bản",
    civilization: "Triết lý sống đặc trưng Okinawa",
    corePrinciples: [
      "Điểm giao thoa 4 vòng tròn: Điều bạn thích · Điều bạn giỏi · Xã hội cần · Kiếm ra tiền",
      "Tập trung vào quá trình hành động nhỏ hằng ngày, không phải đích đến vĩ đại",
      "Không vội vàng nghỉ hưu sớm: có mục đích sống = sống lâu hơn",
      "Bình tĩnh · không vội · không căng thẳng về sự hoàn hảo",
    ],
    modernApplication: "Định vị lại lộ trình nghề nghiệp trung hạn sau đại học · tránh cảm giác lãng phí tiềm năng · tìm điểm giao nhau giữa đam mê và giá trị kinh tế thực tế",
    bestFor: ["NF", "NT"],
    whyThisGroup: "INFJ/ENFJ cần mục tiêu dài hạn mang tính nhân văn · INTJ cần hệ thống hoá mục tiêu sống",
    resourcesVN: ["Sách: 'Ikigai - Chất Nhật trong từng khoảnh khắc' — trên Fonos", "Podcast: Have A Sip (các khách mời chia sẻ về ikigai)"],
  },
  {
    name: "Sisu",
    origin: "Phần Lan",
    civilization: "Khái niệm văn hoá đặc trưng người Phần Lan",
    corePrinciples: [
      "Ý chí kiên cường nội tâm vô hạn vượt qua giới hạn lý trí",
      "Quyết tâm hành động ngay cả khi cơ hội bằng không và tình huống tuyệt vọng",
      "Biến nghịch cảnh thành chất xúc tác phát triển thay vì lý do bỏ cuộc",
      "Không phải là sự vui vẻ biểu diễn — là sức mạnh thầm lặng và lầm lũi",
    ],
    modernApplication: "Vượt qua giai đoạn vỡ nợ tài chính hoặc khởi nghiệp thất bại bằng sự bền bỉ hành động · không cần động lực từ bên ngoài",
    bestFor: ["ST", "NT"],
    whyThisGroup: "ISTJ/ESTJ/INTJ cần nghị lực hành động độc lập và cứng rắn không phụ thuộc cảm xúc",
    resourcesVN: ["Sách: 'Sisu - Vượt qua tất cả' — trên Voiz FM", "Podcast: Giang Ơi Radio (các tập về vượt khó)"],
  },
  {
    name: "Hygge",
    origin: "Đan Mạch",
    civilization: "Triết lý sống đặc trưng Bắc Âu",
    corePrinciples: [
      "Tạo dựng sự ấm cúng, an yên và bình yên từ những điều nhỏ bé hằng ngày",
      "Ưu tiên kết nối gần gũi chất lượng với người thân yêu hơn là số lượng",
      "Tận hưởng khoảnh khắc hiện tại thay vì luôn hướng tới một mục tiêu tương lai",
      "Candlelight · trà ấm · chăn mền mềm = tự tạo sanctuary trong cuộc sống bận rộn",
    ],
    modernApplication: "Tổ chức các buổi tối nấu ăn cùng bạn bè thân thiết, cam kết không dùng điện thoại · tạo không gian ấm cúng trong căn hộ nhỏ đô thị",
    bestFor: ["SF", "NF"],
    whyThisGroup: "ESFJ/ISFJ/ENFJ khao khát sự ấm áp, an toàn cảm xúc và kết nối chất lượng",
    resourcesVN: ["Sách: 'Hygge - Sống an nhiên như người Đan Mạch' — có bản tiếng Việt", "Podcast: Tri Kỷ Cảm Xúc (tập về slow living)"],
  },
  {
    name: "Nunchi",
    origin: "Hàn Quốc",
    civilization: "Nghệ thuật đọc không khí xã hội đặc trưng văn hoá Hàn",
    corePrinciples: [
      "Nghệ thuật thấu thị cảm xúc xã hội nhanh chóng và chính xác",
      "Đọc bầu không khí xung quanh không cần lời nói",
      "Điều chỉnh hành vi, lời nói và năng lượng phù hợp với bối cảnh",
      "Nhanh nhạy = biết khi nào nói, khi nào im lặng và khi nào cần rời đi",
    ],
    modernApplication: "Đọc vị nhanh các mối quan hệ quyền lực và tâm trạng sếp/đồng nghiệp trong công sở đô thị để hành xử khôn ngoan · tránh nói sai lúc sai chỗ",
    bestFor: ["NF", "SF"],
    whyThisGroup: "INFJ/ENFJ/ESFJ đề cao trí tuệ cảm xúc và sự hài hoà tập thể",
    resourcesVN: ["Sách: 'Sức mạnh của Nunchi' — trên Fonos", "Podcast: Have A Sip (tập về trí tuệ cảm xúc xã hội)"],
  },
]

// ─── 11 TÔN GIÁO LỚN NHƯ HỆ THỐNG TRI THỨC ─────────────

export const RELIGIONS: Religion[] = [
  {
    name: "Phật giáo",
    branches: ["Nguyên Thuỷ (Theravada)", "Đại Thừa (Mahayana)", "Kim Cương Thừa (Vajrayana)", "Thiền Tông (Zen)"],
    origin: "Ấn Độ cổ đại",
    founder: "Thích Ca Mâu Ni (Siddhartha Gautama)",
    era: "Thế kỷ VI TCN",
    scripture: "Tam Tạng Kinh (Tipitaka): Kinh - Luật - Luận",
    coreBelief: "Cuộc sống là bể khổ do ham muốn vô bờ bến · con người có thể đạt giải thoát (Niết Bàn) bằng tu tập Bát chánh đạo. Vũ trụ vận hành theo quy luật Duyên khởi (vạn vật phụ thuộc lẫn nhau).",
    afterlife: "Luân hồi: cái chết là rã rời ngũ uẩn để bước vào vòng tái sinh mới dựa trên Nghiệp (Karma) đã gieo. Mục tiêu cuối cùng là thoát khỏi vòng luân hồi (Niết Bàn).",
    ethics: "Bát chánh đạo: Chánh kiến · Chánh tư duy · Chánh ngữ · Chánh nghiệp · Chánh mạng · Chánh tinh tấn · Chánh niệm · Chánh định",
    customs: ["Lễ Phật đản (sinh nhật Đức Phật)", "Lễ Vu Lan báo hiếu", "Lễ vía Quan Âm", "Thiền định hằng ngày", "Phóng sinh"],
    culturalInfluence: "Kiến trúc chùa chiền Á Đông · điêu khắc tượng Phật · ẩm thực chay tịnh bảo vệ sinh thái · nghệ thuật thơ Thiền · văn học Phật giáo VN",
    bestFor: ["NF", "SF"],
    commonMisconception: "Phật giáo KHÔNG phải là yếm thế, tránh đời hay thờ cúng thần linh cầu tài lộc. Bản chất là hệ thống rèn luyện chánh tư duy và lòng từ bi thực hành.",
  },
  {
    name: "Thiên Chúa giáo",
    branches: ["Công giáo (Catholicism)", "Tin Lành (Protestantism)", "Chính Thống giáo (Orthodox)"],
    origin: "Trung Đông (Palestine cổ đại)",
    founder: "Chúa Jesus Christ",
    era: "Thế kỷ I sau Công nguyên",
    scripture: "Kinh Thánh: Cựu Ước (Torah + Ngôn sứ) và Tân Ước (4 Phúc Âm + thư tín)",
    coreBelief: "Thiên Chúa là Đấng Tạo Hóa duy nhất, tạo ra vũ trụ và con người bằng tình yêu. Loài người mang tội lỗi nguyên tổ nhưng được cứu rỗi nhờ cái chết và phục sinh của Chúa Jesus.",
    afterlife: "Phán xét sau khi chết: linh hồn lên Thiên đàng (hiện diện cùng Thiên Chúa) hoặc xuống Địa ngục (cắt đứt kết nối với Ngài). Niềm tin vào sự phục sinh thể xác.",
    ethics: "Mười điều răn · Luật yêu thương (yêu Chúa hết lòng và yêu người thân như mình) · Bảy nhân đức · Giáo lý Công đồng Vatican II",
    customs: ["Lễ Giáng sinh (25/12)", "Lễ Phục sinh", "Lễ Rửa tội (Baptism)", "Hôn lễ tại nhà thờ", "Lễ Misa/礼拜 hằng tuần"],
    culturalInfluence: "Kiến trúc thánh đường Gothic và Baroque tráng lệ · âm nhạc thánh ca · hội họa Phục hưng (Michelangelo · Leonardo) · hệ thống đại học phương Tây",
    bestFor: ["NF", "SF"],
    commonMisconception: "Khoa học và Thiên Chúa giáo không triệt tiêu lẫn nhau. Nhiều nhà khoa học vĩ đại lịch sử (Mendel, Pascal, Galileo) là tín đồ mộ đạo.",
  },
  {
    name: "Hồi giáo",
    branches: ["Sunni (đa số)", "Shia", "Sufi (huyền học)"],
    origin: "Bán đảo Ả Rập (Mecca)",
    founder: "Thiên sứ Muhammad",
    era: "Thế kỷ VII sau Công nguyên",
    scripture: "Kinh Qur'an (được mặc khải cho Muhammad) + Hadith (lời dạy và hành vi của Muhammad)",
    coreBelief: "Chỉ có một Thiên Chúa duy nhất (Allah) và Muhammad là vị thiên sứ cuối cùng. Con người sinh ra thuần khiết, có nhiệm vụ phụng sự Allah thông qua Năm Cột Trụ.",
    afterlife: "Ngày Phán Xét Cuối Cùng: tất cả linh hồn được phán xét dựa trên hành vi thiện ác lúc sinh thời, vào Thiên đường (Jannah) hoặc Địa ngục (Jahannam).",
    ethics: "Năm Cột Trụ: Shahadah (tuyên xưng đức tin) · Salah (5 lần cầu nguyện/ngày) · Zakat (bố thí) · Sawm (ăn chay Ramadan) · Hajj (hành hương Mecca)",
    customs: ["Lễ hội Eid al-Fitr (kết thúc Ramadan)", "Lễ hội Eid al-Adha", "Cầu nguyện 5 lần/ngày", "Ăn chay tháng Ramadan", "Thánh lễ Jumu'ah thứ Sáu"],
    culturalInfluence: "Kiến trúc đền thờ mái vòm đặc trưng · nghệ thuật thư pháp Ả Rập · họa tiết hình học Arabesque · Thời kỳ Vàng Hồi giáo đóng góp toán học, thiên văn, y học",
    bestFor: ["ST", "NT"],
    commonMisconception: "Hồi giáo không dung dưỡng bạo lực. Từ 'Islam' và 'Salam' (hòa bình) có cùng nguồn gốc từ tiếng Ả Rập. Chủ nghĩa khủng bố nhân danh Hồi giáo bị chính người Hồi giáo phê phán mạnh mẽ.",
  },
  {
    name: "Ấn Độ giáo (Hinduism)",
    branches: ["Vaishnavism", "Shaivism", "Shaktism", "Smartism"],
    origin: "Ấn Độ cổ đại",
    founder: "Không có người sáng lập duy nhất — hình thành từ nhiều truyền thống hợp lưu",
    era: "1500 TCN trở về trước (nền văn minh Indus)",
    scripture: "Vedas · Upanishads · Bhagavad Gita · Puranas",
    coreBelief: "Brahman là Thực Tại tối cao, vũ trụ và mọi linh hồn (Atman) đều là biểu hiện của Brahman. Karma định hình luân hồi (Samsara) cho đến khi đạt Moksha (giải thoát).",
    afterlife: "Luân hồi dựa trên Karma: linh hồn (Atman) tái sinh vào các dạng sống khác nhau. Moksha là sự hoà nhập trở lại với Brahman, chấm dứt vòng tái sinh.",
    ethics: "Dharma (nghĩa vụ theo vai trò xã hội) · Artha (thịnh vượng vật chất) · Kama (niềm vui và tình yêu) · Moksha (giải thoát) — bốn mục tiêu cuộc đời người Hindu",
    customs: ["Lễ Diwali (Ánh sáng)", "Lễ Holi (Màu sắc)", "Lễ Navaratri", "Nghi lễ Puja hằng ngày", "Yoga như tu tập tâm linh"],
    culturalInfluence: "Yoga và thiền định toàn cầu · toán học số 0 từ Ấn Độ · kiến trúc đền thờ Angkor Wat · triết học Vedanta ảnh hưởng phương Tây",
    bestFor: ["NF", "NT"],
    commonMisconception: "Ấn Độ giáo không phải là 'thờ nhiều thần' đơn giản — các vị thần đại diện cho các khía cạnh khác nhau của một Thực Tại tối cao duy nhất (Brahman).",
  },
  {
    name: "Do Thái giáo (Judaism)",
    branches: ["Orthodox", "Conservative", "Reform", "Reconstructionist"],
    origin: "Trung Đông cổ đại (Canaan)",
    founder: "Abraham (tổ phụ) · Moses (người nhận Torah tại Sinai)",
    era: "Hơn 3.000 năm trước",
    scripture: "Tanakh (Torah + Nevi'im + Ketuvim) · Talmud (bình luận Torah)",
    coreBelief: "Mối giao ước đặc biệt giữa Thiên Chúa duy nhất và dân tộc Do Thái. Đề cao việc học hỏi, thảo luận và tranh biện kinh điển hằng ngày để tiệm cận chân lý.",
    afterlife: "Không nhấn mạnh vào cuộc sống sau cái chết như các tôn giáo khác. Tập trung vào trách nhiệm đạo đức ở thế giới này để hoàn thiện thế giới (Tikkun Olam).",
    ethics: "Torah: 613 điều răn · Mười Điều Răn · Mitzvot (nghĩa vụ đạo đức) · Tzedakah (công bằng/từ thiện) · Tikkun Olam (sửa chữa thế giới)",
    customs: ["Lễ Vượt Qua (Passover)", "Lễ Đền Tạ (Yom Kippur)", "Lễ Ánh Sáng (Hanukkah)", "Bar/Bat Mitzvah (lễ trưởng thành)", "Sabbath mỗi thứ Bảy"],
    culturalInfluence: "Văn hoá tranh luận sắc sảo Talmudic · tính gắn kết gia đình cực cao · ẩm thực Kosher · đóng góp khoa học (25% Nobel Prize từ người gốc Do Thái)",
    bestFor: ["NT", "NF"],
    commonMisconception: "Do Thái giáo không truyền đạo rộng rãi và không khuyến khích cải đạo. Đây là tôn giáo mang tính gia tộc và giao ước lịch sử cụ thể.",
  },
  {
    name: "Đạo giáo (Taoism)",
    branches: ["Đạo giáo Triết học (Philosophical Taoism)", "Đạo giáo Tôn giáo (Religious Taoism)"],
    origin: "Trung Hoa cổ đại",
    founder: "Lão Tử (Laozi) · Trang Tử (Zhuangzi)",
    era: "Thế kỷ IV-VI TCN",
    scripture: "Đạo Đức Kinh (Tao Te Ching) · Nam Hoa Kinh (Zhuangzi)",
    coreBelief: "Đạo (Tao) là nguyên lý bao trùm toàn vũ trụ, không thể định nghĩa bằng ngôn ngữ. Sống hài hoà với Đạo qua Vô Vi (hành động thuận tự nhiên) và đơn giản hóa cuộc sống.",
    afterlife: "Hoà nhập lại với Đạo khi chết. Triết học Taoism ít tập trung vào kiếp sau — nhấn mạnh hơn vào việc sống trọn vẹn và hoà hợp trong hiện tại.",
    ethics: "Vô Vi · Từ bi (lòng nhân ái tự nhiên) · Kiệm ước (tiết kiệm, không lãng phí) · Không ganh đua (khiêm tốn và nhường nhịn)",
    customs: ["Tết Trung Nguyên", "Lễ Thanh Minh", "Thực hành Tai Chi và Qi Gong", "Fengshui (phong thuỷ)"],
    culturalInfluence: "Kung Fu và võ thuật Trung Hoa · Fengshui trong kiến trúc · Đông Y (Trung y) · thơ thiên nhiên Đường Tống · trà đạo Nhật Bản",
    bestFor: ["NT", "NF"],
    commonMisconception: "Đạo giáo không phải là mê tín dị đoan hay phong thuỷ thương mại. Triết học Taoism là hệ thống tư duy sâu sắc về bản chất vũ trụ và cách sống hài hoà.",
  },
  {
    name: "Nho giáo (Confucianism)",
    branches: ["Nho giáo cổ điển", "Tân Nho giáo (Neo-Confucianism)"],
    origin: "Trung Hoa cổ đại",
    founder: "Khổng Tử (Confucius)",
    era: "Thế kỷ VI-V TCN",
    scripture: "Tứ Thư (Đại Học · Trung Dung · Luận Ngữ · Mạnh Tử) và Ngũ Kinh",
    coreBelief: "Xã hội hài hoà dựa trên năm mối quan hệ chính (quân-thần · phụ-tử · phu-phụ · huynh-đệ · bằng hữu) và thực hành năm đức hạnh: Nhân · Lễ · Nghĩa · Trí · Tín.",
    afterlife: "Nho giáo tập trung vào đời sống xã hội hiện tại, ít bàn về thế giới bên kia. Thờ cúng tổ tiên là cách duy trì kết nối với người đã khuất.",
    ethics: "Nhân (lòng nhân ái) · Lễ (nghi lễ và phép tắc) · Nghĩa (chính nghĩa) · Trí (tri thức) · Tín (lòng trung thực) · Trung (trung thành) · Hiếu (hiếu thảo)",
    customs: ["Thi cử và học tập suốt đời", "Kính trọng người lớn tuổi", "Thờ cúng tổ tiên", "Tết Nguyên Đán (năm mới Âm lịch)"],
    culturalInfluence: "Hệ thống thi cử quan lại Đông Á · văn hoá học tập cực cao Hàn-Nhật-Việt · tính kỷ luật và cần cù lao động Đông Á · kiến trúc đền Văn Miếu",
    bestFor: ["ST", "SF"],
    commonMisconception: "Nho giáo không phải là tôn giáo theo nghĩa thờ phụng siêu nhiên — đây là hệ thống đạo đức và triết lý xã hội tập trung vào quan hệ con người.",
  },
  {
    name: "Thần đạo (Shinto)",
    branches: ["Shrine Shinto", "Sect Shinto", "Folk Shinto"],
    origin: "Nhật Bản",
    founder: "Không có người sáng lập duy nhất — hình thành từ tín ngưỡng tự nhiên bản địa Nhật",
    era: "Trước thế kỷ I — tồn tại từ thời thượng cổ",
    scripture: "Kojiki và Nihon Shoki (sử ký thần thoại Nhật Bản)",
    coreBelief: "Kami (thần linh) hiện diện trong mọi vật: thiên nhiên, tổ tiên và các hiện tượng đặc biệt. Con người vốn tốt lành, sự thuần khiết và hài hoà với tự nhiên là mục tiêu tâm linh.",
    afterlife: "Linh hồn (tama) tiếp tục tồn tại sau cái chết, có thể trở thành Kami được thờ phụng nếu sống cuộc đời đức hạnh.",
    ethics: "Thanh sạch (harae) · Sự thành thật (makoto) · Hài hoà với tự nhiên · Tôn kính tổ tiên và Kami",
    customs: ["Lễ đầu năm mới Hatsumode tại đền", "Lễ hội Matsuri", "Nghi lễ thanh tẩy Misogi", "Lễ 7-5-3 (Shichigosan) cho trẻ em"],
    culturalInfluence: "Kiến trúc đền Torii đặc trưng Nhật · nghệ thuật Ikebana (cắm hoa) · Sado (trà đạo) · văn hoá tôn trọng thiên nhiên trong thiết kế Nhật",
    bestFor: ["NF", "SF"],
    commonMisconception: "Shinto không phải là Quốc gia Thần đạo (State Shinto) — phong trào chính trị thế kỷ XIX-XX bóp méo tôn giáo dân gian bản địa để phục vụ chủ nghĩa quân phiệt.",
  },
  {
    name: "Sikh giáo",
    branches: ["Không có nhánh lớn — hệ thống thống nhất cao"],
    origin: "Punjab, Ấn Độ",
    founder: "Guru Nanak Dev Ji",
    era: "Thế kỷ XV",
    scripture: "Guru Granth Sahib (Kinh Sikh)",
    coreBelief: "Một Thiên Chúa duy nhất (Waheguru) không hình tướng, hiện diện trong mọi vật. Bình đẳng tuyệt đối giữa mọi người bất kể giới tính, giai cấp, tôn giáo. Phục vụ cộng đồng là thờ phụng Thiên Chúa.",
    afterlife: "Linh hồn trải qua nhiều vòng tái sinh cho đến khi hoà nhập với Waheguru (Mukti). Đạt Mukti qua tưởng nhớ tên Thiên Chúa và sống đời đức hạnh.",
    ethics: "Seva (phục vụ vị tha) · Simran (tưởng nhớ Thiên Chúa) · Sangat (cộng đồng tâm linh) · Kirat Karni (lao động lương thiện) · Vand Chhakna (chia sẻ với người khác)",
    customs: ["Langar (bữa ăn cộng đồng miễn phí cho tất cả mọi người)", "Lễ Baisakhi (Năm mới Sikh)", "Đội khăn Dastar và 5K (5 biểu tượng Sikh)", "Cầu nguyện Ardas"],
    culturalInfluence: "Langar = bếp ăn từ thiện đầu tiên trong lịch sử phục vụ mọi người không phân biệt · giá trị bình đẳng giới từ thế kỷ XV · trung tâm tâm linh Golden Temple (Harmandir Sahib)",
    bestFor: ["NF", "SF"],
    commonMisconception: "Sikh giáo không phải là nhánh của Hồi giáo hay Ấn Độ giáo — đây là tôn giáo độc lập có nguồn gốc và triết lý riêng biệt hoàn toàn.",
  },
  {
    name: "Tín ngưỡng dân gian Việt Nam",
    branches: ["Thờ cúng tổ tiên", "Đạo Mẫu (Tam Phủ · Tứ Phủ)", "Thờ Thần Hoàng Bản Thổ", "Tín ngưỡng Tứ bất tử VN"],
    origin: "Việt Nam",
    founder: "Không có người sáng lập duy nhất — hình thành từ đời sống nông nghiệp lúa nước",
    era: "Hàng nghìn năm trước — từ thời Hùng Vương dựng nước",
    scripture: "Truyền khẩu qua ca dao · huyền thoại · gia phả · văn chầu Đạo Mẫu",
    coreBelief: "Uống nước nhớ nguồn: kết nối tâm linh bền bỉ giữa người sống và người đã khuất. Tổ tiên vẫn dõi theo và bảo hộ con cháu. Vạn vật hữu linh: mỗi vùng đất đều có Thần Hoàng bản thổ.",
    afterlife: "Linh hồn tồn tại ở cõi âm, cần được cúng tế để tránh đói lạnh. Người mất được thờ cúng để trở thành tổ tiên phù hộ con cháu.",
    ethics: "Hiếu thảo (nghĩa vụ với tổ tiên) · Đoàn kết cộng đồng làng xã · Hài hoà với thiên nhiên · Uống nước nhớ nguồn",
    customs: ["Giỗ tổ tiên hằng năm", "Nghi lễ Lên đồng (Hầu đồng) Đạo Mẫu", "Lễ hội Đình làng", "Tết Nguyên Đán · Tết Thanh Minh · Tết Trung nguyên"],
    culturalInfluence: "Nghệ thuật hát văn Đạo Mẫu · kiến trúc đình chùa làng xã · văn hoá ẩm thực cúng kiến · gắn kết gia đình và cộng đồng truyền thống VN",
    bestFor: ["SF", "NF"],
    commonMisconception: "Thờ cúng tổ tiên và Đạo Mẫu không phải mê tín dị đoan lạc hậu. Đây là hệ thống lưu giữ ký ức lịch sử, đạo lý nhân văn và liệu pháp tâm lý cộng đồng của người Việt.",
  },
  {
    name: "Tín ngưỡng thần thoại dân gian (Norse · Greek · Celtic)",
    branches: ["Norse mythology (Bắc Âu)", "Greek mythology (Hy Lạp)", "Celtic mythology (Anh-Ireland-Pháp cổ)"],
    origin: "Châu Âu cổ đại",
    founder: "Không có người sáng lập — hình thành từ truyền miệng",
    era: "Trước Công nguyên đến thế kỷ X",
    scripture: "Norse: Edda (Prose · Poetic) · Greek: Iliad · Odyssey của Homer · Celtic: truyền miệng",
    coreBelief: "Thần linh giống con người: có cảm xúc, yêu ghét, sai lầm và thần chết. Vũ trụ vận hành theo Số Mệnh (Fate/Wyrd) mà ngay cả thần linh cũng phải tuân theo.",
    afterlife: "Norse: Valhalla (thiên đường cho chiến binh) · Hel (cõi người chết thông thường). Greek: Olympus · Elysian Fields · Hades. Celtic: Tir na nÓg (đảo thanh xuân vĩnh cửu).",
    ethics: "Norse: Dũng cảm · Vinh dự · Lòng trung thành · Sự thực. Greek: Arete (đức hạnh · xuất sắc) · Sophrosyne (tiết độ). Celtic: Valour · Hospitality · Truth",
    customs: ["Norse: Blót (lễ hiến tế mùa vụ)", "Greek: Thế vận hội Olympic (426 TCN)", "Celtic: Samhain (tiền thân Halloween)", "Lễ Yule (Đông chí Bắc Âu)"],
    culturalInfluence: "Tên các ngày trong tuần tiếng Anh (Tuesday=Tyr · Wednesday=Odin · Thursday=Thor · Friday=Frigg) · Marvel Cinematic Universe · hội họa và điêu khắc Hy Lạp cổ điển",
    bestFor: ["NT", "NF"],
    commonMisconception: "Các thần thoại này không phải là 'tôn giáo sai' hay 'truyện cổ tích trẻ em' — đây là hệ thống giải thích vũ trụ, đạo đức và số phận của các nền văn hoá cổ đại tinh tế.",
  },
]

// ─── PHONG TỤC ĐỜI NGƯỜI ─────────────────────────────────

export const LIFE_RITUALS: Ritual[] = [
  {
    culture: "Việt Nam",
    ritual: "Lễ đầy tháng và thôi nôi",
    meaning: "Tạ ơn Mụ Bà đã nặn ra đứa trẻ; chính thức giới thiệu thành viên mới với tổ tiên và cộng đồng làng xã.",
    modernAdaptation: "Tổ chức tiệc gia đình ấm cúng, lập tài khoản đầu tư xanh dài hạn cho con thay vì tặng vàng cất giữ.",
    whatWeCanLearn: "Sự sinh tồn và phát triển của cá nhân luôn cần sự bảo bọc nâng đỡ của mạng lưới gia đình và xã hội.",
  },
  {
    culture: "Do Thái",
    ritual: "Lễ Bar/Bat Mitzvah (lễ trưởng thành)",
    meaning: "Đánh dấu tuổi 13 trưởng thành: đứa trẻ chính thức chịu trách nhiệm pháp lý và đạo đức trước mọi hành vi của mình.",
    modernAdaptation: "Học sinh tự lập dự án phục vụ cộng đồng độc lập hoặc tự quản lý tài khoản tài chính cá nhân nhỏ đầu tiên.",
    whatWeCanLearn: "Trưởng thành không đo bằng tuổi tác sinh học, mà bằng sự sẵn sàng chịu trách nhiệm hoàn toàn trước các quyết định cá nhân.",
  },
  {
    culture: "Nhật Bản",
    ritual: "Lễ thành hôn Shinto (Shinzen Shiki)",
    meaning: "Nghi lễ kết hôn tôn nghiêm trước các vị thần Shinto, uống chén rượu thề Kamidoko để gắn kết hai linh hồn.",
    modernAdaptation: "Giảm quy mô tiệc cưới xa hoa, tập trung vào nghi lễ cam kết riêng tư sâu sắc và viết thỏa thuận tiền hôn nhân minh bạch.",
    whatWeCanLearn: "Hôn nhân là khế ước tâm linh và thực tế bền bỉ, đòi hỏi sự tôn trọng không gian riêng tư của nhau.",
  },
  {
    culture: "Mexico",
    ritual: "Ngày hội người chết (Dia de los Muertos)",
    meaning: "Chào đón linh hồn người quá cố trở về sum họp vui vẻ bằng âm nhạc, nến, hoa cúc vạn thọ và các câu chuyện hài hước.",
    modernAdaptation: "Lập không gian tưởng niệm số lưu trữ thước phim đẹp; gia đình quây quần kể về bài học người đi trước để lại.",
    whatWeCanLearn: "Con người chỉ thực sự chết đi khi bị lãng quên trong trái tim người sống. Cái chết không phải là sự chấm dứt hoàn toàn.",
  },
  {
    culture: "Ấn Độ (Hindu)",
    ritual: "Lễ hỏa táng (Antyesti)",
    meaning: "Nghi lễ cuối cùng giải phóng linh hồn khỏi thân xác để bắt đầu hành trình tái sinh. Con cả đốt lửa hỏa táng để báo hiếu.",
    modernAdaptation: "Tổ chức không gian tưởng niệm ấm cúng, đọc những kỷ niệm đẹp, tạo quỹ từ thiện mang tên người đã mất.",
    whatWeCanLearn: "Cái chết là quá trình chuyển tiếp, không phải kết thúc. Sự chấp nhận vô thường giúp sống trọn vẹn hơn.",
  },
  {
    culture: "Madagascar (Malagasy)",
    ritual: "Famadihana (Lễ chuyển xương)",
    meaning: "Mỗi 5-7 năm, đào mộ người thân, gói lại trong lụa mới, nhảy múa cùng hài cốt và chia sẻ tin tức cuộc sống với người đã khuất.",
    modernAdaptation: "Ngày giỗ tổ tiên trở thành buổi gia đình sum họp thật sự: kể chuyện về người đã mất, xem ảnh cũ, nấu món họ yêu thích.",
    whatWeCanLearn: "Các nền văn hoá khác nhau có cách riêng biết để duy trì kết nối với người đã khuất và xử lý nỗi đau mất mát — không có cách nào là 'sai'.",
  },
]

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getPhilosophiesByGroup(group: MbtiGroup): Philosophy[] {
  return PHILOSOPHIES.filter(p => p.bestFor.includes(group))
}

export function getReligionsByGroup(group: MbtiGroup): Religion[] {
  return RELIGIONS.filter(r => r.bestFor.includes(group))
}

export function getRandomPhilosophy(group: MbtiGroup): Philosophy | null {
  const list = getPhilosophiesByGroup(group)
  return list[Math.floor(Math.random() * list.length)] ?? null
}
