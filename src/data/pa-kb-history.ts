/**
 * PA KB — HISTORY & CIVILIZATION DATA
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 4
 *
 * Tiếp cận: lịch sử từ góc giải quyết vấn đề (problem-solving)
 * "Điểm tối" của văn minh: nhìn thẳng · không che giấu · không phán xét quá mức
 * Historical empathy: không đánh giá quá khứ bằng chuẩn mực hiện đại
 * Chính trị đương đại: KHÔNG đề cập
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── TYPES ────────────────────────────────────────────────

export interface TurningPoint {
  event: string
  period: string
  location: string
  macroImpact: string
  howWeFeelItToday: string
  whatIfNotHappened: string
  mbtiPerspective: Record<MbtiGroup, string>
}

export interface BigIdea {
  idea: string
  thinker: string
  field: 'science' | 'social' | 'economics' | 'art' | 'psychology'
  revolution: string
  everydayImpact: string
  legitimateCritique: string
  mbtiFit: MbtiGroup[]
}

export interface Civilization {
  name: string
  period: string
  geography: string
  contributions: string[]
  humanNatureView: string
  naturalWorldView: string
  timeView: string
  whatWeCanLearn: string
  darkSide: string
}

export interface EverydayHistory {
  topic: string
  period: string
  civilization: string
  description: string
  modernParallel: string
  source: string
}

// ─── 20 BƯỚC NGOẶT VĂN MINH ──────────────────────────────

export const TURNING_POINTS: TurningPoint[] = [
  {
    event: "Cách mạng Nông nghiệp",
    period: "10.000 TCN",
    location: "Lưỡng Hà (Iraq ngày nay) · Trung Hoa · Đông Nam Á",
    macroImpact: "Chuyển từ săn bắt hái lượm sang định canh; tạo thặng dư lương thực, khai sinh các thành bang đầu tiên.",
    howWeFeelItToday: "Chế độ ăn dựa trên ngũ cốc · sự tồn tại của các thành phố hàng triệu dân · bệnh lây từ gia súc sang người",
    whatIfNotHappened: "Loài người mãi là những nhóm du mục nhỏ phụ thuộc hoàn toàn vào tự nhiên, dân số toàn cầu dưới 10 triệu.",
    mbtiPerspective: {
      NT: "Hệ thống hóa nguồn cung cấp năng lượng sinh học dài hạn cho giống loài — cuộc cách mạng logistics đầu tiên",
      NF: "Cái giá phải trả: mất đi sự tự do du mục và đa dạng thực phẩm · bất bình đẳng giai cấp bắt đầu",
      ST: "Tối ưu hóa sản lượng thực phẩm bằng kỹ thuật canh tác có tổ chức",
      SF: "Nền tảng cộng đồng làng xã và sự gắn kết gia đình định cư",
    },
  },
  {
    event: "Phát minh chữ viết",
    period: "3.200 TCN",
    location: "Lưỡng Hà (chữ hình nêm) · Ai Cập (hieroglyphs) · Trung Hoa (giáp cốt văn)",
    macroImpact: "Ghi chép ký ức tập thể vượt không gian và thời gian; bệ đỡ cho luật pháp, khoa học và văn học.",
    howWeFeelItToday: "Sự tồn tại của sách, internet, văn bản pháp lý, tài khoản ngân hàng và hồ sơ lịch sử",
    whatIfNotHappened: "Tri thức bị thất truyền sau mỗi thế hệ; xã hội vận hành dựa trên trí nhớ truyền miệng ngắn hạn; không có khoa học tích lũy.",
    mbtiPerspective: {
      NT: "Công cụ lưu trữ và chia sẻ tri thức trừu tượng vượt biên giới không gian-thời gian",
      NF: "Ngôn ngữ cảm xúc và thơ ca được ghi lại · văn học nhân loại bắt đầu từ đây",
      ST: "Chuẩn hóa dữ liệu vật lý và thiết lập quy trình quản lý hành chính chính xác",
      SF: "Kể chuyện và truyền thống văn hoá được bảo tồn cho các thế hệ sau",
    },
  },
  {
    event: "Phát minh đồng tiền",
    period: "Thế kỷ VII TCN",
    location: "Lydia (Thổ Nhĩ Kỳ ngày nay)",
    macroImpact: "Trừu tượng hoá giá trị vật chất; thiết lập sự tin tưởng tài chính giữa những người xa lạ; mở rộng giao thương quy mô lớn.",
    howWeFeelItToday: "Hoạt động mua bán hằng ngày, thanh toán số, giao dịch chứng khoán toàn cầu, tiền mã hoá",
    whatIfNotHappened: "Nền kinh tế bị bó hẹp trong trao đổi hiện vật thủ công; không thể thực hiện giao thương quy mô lớn; toàn cầu hóa bất khả thi.",
    mbtiPerspective: {
      NT: "Phát minh ra hệ thống trao đổi giá trị toán học trừu tượng hiệu quả nhất lịch sử",
      NF: "Mặt trái: tiền bạc bắt đầu định giá những thứ không nên có giá (tình cảm, đạo đức)",
      ST: "Công cụ tối ưu hoá giao dịch thương mại và tích lũy tài sản",
      SF: "Quà tặng và lòng biết ơn dần bị thương mại hoá — mặt trái của tiền tệ",
    },
  },
  {
    event: "Dân chủ Athens",
    period: "508 TCN",
    location: "Athens, Hy Lạp",
    macroImpact: "Thí nghiệm đầu tiên về quyền công dân tham gia quyết định chính sách. Nền tảng triết học phương Tây về quyền cá nhân.",
    howWeFeelItToday: "Bầu cử · quyền công dân · phân quyền · triết lý tự do cá nhân phương Tây",
    whatIfNotHappened: "Các nền văn minh tiếp tục vận hành theo chế độ quân chủ tuyệt đối, không có khái niệm quyền công dân hiện đại.",
    mbtiPerspective: {
      NT: "Thiết kế hệ thống phi tập trung quản trị xã hội bằng đối thoại lý tính",
      NF: "Lý tưởng về phẩm giá con người và quyền được lắng nghe",
      ST: "Quy tắc rõ ràng, minh bạch về quyền và trách nhiệm công dân",
      SF: "Cộng đồng cùng nhau quyết định tương lai của chính mình",
    },
  },
  {
    event: "In ấn Gutenberg",
    period: "1440",
    location: "Mainz, Đức",
    macroImpact: "Dân chủ hóa tri thức; bẻ gãy sự độc quyền thông tin của giai cấp tăng lữ quý tộc; khai sinh Cách mạng Khoa học.",
    howWeFeelItToday: "Sự phổ cập giáo dục; báo chí độc lập; ý thức công dân; internet là bước tiến tiếp theo của cùng một logic",
    whatIfNotHappened: "Tri thức mãi nằm trong tay số ít người giàu; Cách mạng Khoa học và Cải cách Tôn giáo không thể bùng nổ.",
    mbtiPerspective: {
      NT: "Nhân bản tri thức quy mô lớn lần đầu tiên trong lịch sử",
      NF: "Giải phóng tiếng nói của con người khỏi sự kiểm duyệt của quyền lực",
      ST: "Chuẩn hoá thông tin và quy trình truyền dạy kỹ thuật",
      SF: "Lan toả thông tin và kết nối xã hội ở quy mô rộng lớn chưa từng có",
    },
  },
  {
    event: "Thuyết vi trùng (Germ Theory)",
    period: "Thế kỷ XIX",
    location: "Pháp (Pasteur) · Đức (Koch)",
    macroImpact: "Phát hiện ra thế giới vi sinh vật; thay đổi toàn bộ y học lâm sàng và vệ sinh phòng bệnh; tuổi thọ trung bình tăng từ 35 lên 70+.",
    howWeFeelItToday: "Thói quen rửa tay xà phòng; quy trình tiệt trùng bệnh viện; vaccine; kháng sinh",
    whatIfNotHappened: "Các dịch bệnh thông thường vẫn có thể tàn sát 1/3 dân số thành phố trong vài tuần. Phẫu thuật = bản án tử hình.",
    mbtiPerspective: {
      NT: "Giải mã nguyên nhân sâu xa của các cuộc khủng hoảng sinh học ẩn giấu bằng thực nghiệm",
      NF: "Chúng ta không bị bệnh vì 'ý chí yếu' hay 'nghiệp chướng' — mà do vi sinh vật",
      ST: "Framework thực tiễn để ngăn chặn bệnh tật bằng quy trình vệ sinh cụ thể",
      SF: "Bảo vệ người thân bằng các thói quen vệ sinh hằng ngày đơn giản",
    },
  },
  {
    event: "Cách mạng Xanh (Green Revolution)",
    period: "Thế kỷ XX (1940s-1970s)",
    location: "Toàn cầu — do Norman Borlaug dẫn đầu",
    macroImpact: "Sử dụng phân bón hóa học và giống lai năng suất cao để tăng gấp đôi sản lượng lương thực, giải quyết nạn đói quy mô lớn.",
    howWeFeelItToday: "Giá thực phẩm rẻ tương đối; 8 tỷ người được nuôi sống; nhưng cũng: ô nhiễm đất và nước, mất đa dạng sinh học",
    whatIfNotHappened: "Hàng tỷ người tại châu Á và châu Phi chết đói do tốc độ tăng dân số vượt sản lượng đất đai.",
    mbtiPerspective: {
      NT: "Tối ưu hoá sinh học của hệ thống nông nghiệp bằng công nghệ di truyền và hoá học",
      NF: "Mặt trái: đánh đổi đa dạng sinh học và sức khoẻ đất dài hạn để lấy năng suất ngắn hạn",
      ST: "Quy trình canh tác có hệ thống, có thể nhân rộng quy mô lớn",
      SF: "Đủ ăn cho mọi người — nhu cầu cơ bản nhất được đáp ứng",
    },
  },
  {
    event: "Kháng sinh và Vaccine",
    period: "Thế kỷ XX (Penicillin 1928 · Polio vaccine 1955)",
    location: "UK (Fleming) · USA (Salk)",
    macroImpact: "Kiểm soát các bệnh nhiễm khuẩn từng là nguyên nhân tử vong hàng đầu; dân số toàn cầu tăng từ 2 tỷ lên 8 tỷ trong 100 năm.",
    howWeFeelItToday: "Tuổi thọ trung bình toàn cầu từ 47 (1950) lên 73 (2025); bại liệt gần như xóa sổ; sởi kiểm soát được",
    whatIfNotHappened: "Vết thương nhỏ, đau tai hay viêm phổi vẫn là bản án tử hình như thế kỷ XIX.",
    mbtiPerspective: {
      NT: "Chiến thắng của phương pháp thực nghiệm khoa học trước bệnh tật",
      NF: "Cứu sống hàng tỷ người — thành tựu nhân đạo lớn nhất lịch sử nhân loại",
      ST: "Quy trình điều trị chuẩn hóa, có thể áp dụng toàn cầu",
      SF: "Giữ gìn người thân khỏi những cái chết không đáng",
    },
  },
  {
    event: "Phong trào Quyền phụ nữ",
    period: "Thế kỷ XIX-XX",
    location: "Toàn cầu — UK, USA, Pháp dẫn đầu",
    macroImpact: "Quyền bầu cử, quyền giáo dục, quyền lao động và quyền kiểm soát cơ thể; GDP toàn cầu tăng khi phụ nữ tham gia kinh tế.",
    howWeFeelItToday: "Phụ nữ đi làm, bầu cử, học đại học, lãnh đạo doanh nghiệp — những điều hiển nhiên chỉ 150 năm trước không tồn tại",
    whatIfNotHappened: "50% dân số bị loại khỏi nền kinh tế, khoa học và chính trị; nhân loại mất đi một nửa tiềm năng trí tuệ.",
    mbtiPerspective: {
      NT: "Bất bình đẳng = phi hiệu quả hệ thống · loại bỏ 50% tài năng là sai lầm tối ưu hoá",
      NF: "Phẩm giá con người không phụ thuộc vào giới tính — lý tưởng nhân văn cơ bản nhất",
      ST: "Quyền lao động và hợp đồng bình đẳng không phân biệt giới tính",
      SF: "Mẹ của tôi, chị gái tôi, con gái tôi xứng đáng có những quyền này",
    },
  },
  {
    event: "Internet",
    period: "Cuối thế kỷ XX (1991 — World Wide Web)",
    location: "USA (ARPANET 1969) · CERN Switzerland (Tim Berners-Lee 1991)",
    macroImpact: "Kết nối thông tin toàn cầu thành một thực thể thời gian thực; khai sinh xã hội thông tin và kinh tế số.",
    howWeFeelItToday: "Làm việc từ xa · giao dịch xuyên biên giới · mạng xã hội · FOMO · spam · deepfake · AI",
    whatIfNotHappened: "Thế giới vận hành chậm chạp bằng thư tín bưu điện; không có chuyển đổi số; tri thức toàn cầu không được dân chủ hoá.",
    mbtiPerspective: {
      NT: "Thiết lập bộ não toàn cầu (Global Brain) phi tập trung — công cụ học tập tối thượng",
      NF: "Kết nối con người vượt biên giới · nhưng cũng: bong bóng lọc (filter bubble) chia rẽ xã hội",
      ST: "Tự động hoá giao dịch và quy trình làm việc chưa từng có",
      SF: "Kết nối gia đình và bạn bè cách nhau nửa vòng trái đất",
    },
  },
  {
    event: "Trí tuệ nhân tạo (AI)",
    period: "Đầu thế kỷ XXI (GPT-3 2020 · ChatGPT 2022)",
    location: "USA · UK · Trung Quốc",
    macroImpact: "Tự động hoá tư duy, phân tích dữ liệu quy mô lớn và hỗ trợ ra quyết định phức tạp trong thời gian thực.",
    howWeFeelItToday: "Trợ lý ảo · dịch thuật thời gian thực · camera AI giám sát · deepfake · tự động hoá việc làm · y tế AI",
    whatIfNotHappened: "Con người vẫn phải thủ công xử lý hàng tỷ tác vụ lặp đi lặp lại; khoa học y tế tiến chậm hơn nhiều thập kỷ.",
    mbtiPerspective: {
      NT: "Công cụ tối thượng để tối ưu hoá và dự đoán các hệ thống xã hội phức tạp",
      NF: "Lo ngại về tự động hoá việc làm và đạo đức AI · ai chịu trách nhiệm khi AI sai?",
      ST: "Tăng năng suất lao động · nhưng cần quy trình kiểm soát chất lượng đầu ra AI",
      SF: "AI có thể giúp người thân già cả được chăm sóc tốt hơn · nhưng không thể thay thế kết nối người",
    },
  },
  {
    event: "Phong trào Phi thực dân hóa",
    period: "Thế kỷ XX (1945-1975)",
    location: "Châu Á · châu Phi · Trung Đông",
    macroImpact: "Khoảng 50 quốc gia giành độc lập từ các đế quốc châu Âu; tái định hình bản đồ chính trị thế giới hiện đại.",
    howWeFeelItToday: "Tất cả các quốc gia có chủ quyền trên bản đồ thế giới ngày nay · di sản thực dân vẫn còn trong bất bình đẳng kinh tế toàn cầu",
    whatIfNotHappened: "Phần lớn châu Á và châu Phi vẫn là thuộc địa của châu Âu · không có UN, không có tổ chức quốc tế bình đẳng.",
    mbtiPerspective: {
      NT: "Hệ thống thuộc địa phi hiệu quả về đạo đức và dài hạn kinh tế — không bền vững",
      NF: "Phẩm giá tự quyết dân tộc là quyền không thể thương lượng",
      ST: "Chuyển giao quyền lực có hệ thống và trật tự tốt hơn cho ổn định dài hạn",
      SF: "Người dân VN, Ấn Độ, Ai Cập... cuối cùng được làm chủ đất nước của mình",
    },
  },
  {
    event: "Toàn cầu hóa",
    period: "Thế kỷ XX-XXI (hậu 1990)",
    location: "Toàn cầu",
    macroImpact: "Dòng chảy tự do của hàng hóa, vốn, thông tin và một phần lao động qua biên giới; giảm nghèo nhanh nhất lịch sử nhưng cũng tăng bất bình đẳng nội bộ.",
    howWeFeelItToday: "iPhone lắp ở Trung Quốc · cà phê VN xuất khẩu toàn cầu · đại dịch COVID lây ra toàn cầu trong vài tuần",
    whatIfNotHappened: "Mỗi quốc gia tự cung tự cấp · hàng hoá đắt hơn nhiều · nhưng tăng trưởng kinh tế chậm hơn.",
    mbtiPerspective: {
      NT: "Hệ thống phân phối lao động và sản xuất tối ưu theo lợi thế so sánh",
      NF: "Phát triển kinh tế có thể đi kèm với mất bản sắc văn hoá và bóc lột lao động",
      ST: "Chuỗi cung ứng toàn cầu tạo hiệu quả nhưng cũng tạo rủi ro phụ thuộc",
      SF: "Âm nhạc · phim ảnh · ẩm thực thế giới trở nên dễ tiếp cận hơn bao giờ hết",
    },
  },
  {
    event: "Phát minh bánh xe và kim loại",
    period: "3.500-3.000 TCN",
    location: "Lưỡng Hà · Caucasus",
    macroImpact: "Bánh xe = vận chuyển và giao thương hiệu quả. Kim loại = công cụ nông nghiệp bền hơn đá và vũ khí chiến tranh.",
    howWeFeelItToday: "Mọi phương tiện giao thông · máy móc · cơ cấu truyền động đều dựa trên bánh xe",
    whatIfNotHappened: "Giao thương đường dài bất khả thi; nông nghiệp kém hiệu quả hơn nhiều; đế chế quy mô lớn không tồn tại được.",
    mbtiPerspective: {
      NT: "Cơ học ứng dụng đầu tiên giải quyết vấn đề vận chuyển và sản xuất",
      NF: "Kim loại tạo ra cả công cụ nông nghiệp và vũ khí chiến tranh — hai mặt của cùng một phát minh",
      ST: "Công cụ cụ thể tăng năng suất lao động ngay lập tức và có thể đo lường",
      SF: "Giao thương = gặp gỡ văn hoá · gia vị và câu chuyện di chuyển cùng hàng hoá",
    },
  },
  {
    event: "Cách mạng Khoa học",
    period: "Thế kỷ XVI-XVII",
    location: "Châu Âu (Copernicus · Galileo · Newton · Kepler)",
    macroImpact: "Phương pháp thực nghiệm và toán học hóa tự nhiên; phá vỡ quyền uy tôn giáo về tri thức tự nhiên; nền tảng khoa học hiện đại.",
    howWeFeelItToday: "Vật lý · hoá học · y học · kỹ thuật · tất cả đều dựa trên phương pháp khoa học Galileo và Newton",
    whatIfNotHappened: "Không có Cách mạng Công nghiệp, không có y học hiện đại, không có điện và internet.",
    mbtiPerspective: {
      NT: "Phát minh ra phương pháp học hỏi từ tự nhiên bằng thực nghiệm — công cụ tri thức tối thượng",
      NF: "Giải phóng con người khỏi những nỗi sợ về tự nhiên không được giải thích",
      ST: "Quy trình kiểm chứng có hệ thống · loại bỏ ý kiến sai không có bằng chứng",
      SF: "Y học cứu sống người thân · nông nghiệp cải tiến nuôi sống gia đình",
    },
  },
  {
    event: "Cách mạng Công nghiệp",
    period: "Thế kỷ XVIII-XIX",
    location: "Anh Quốc lan ra toàn châu Âu và Bắc Mỹ",
    macroImpact: "Máy móc thay thế cơ bắp người và gia súc; đô thị hóa quy mô lớn; GDP tăng theo hàm mũ; nhưng cũng: ô nhiễm và bất bình đẳng mới.",
    howWeFeelItToday: "Mọi sản phẩm sản xuất hàng loạt · kinh tế thị trường hiện đại · ô nhiễm carbon gây biến đổi khí hậu",
    whatIfNotHappened: "Thế giới vẫn nông nghiệp thủ công; không có đô thị hàng triệu dân; không có biến đổi khí hậu nhưng cũng không có y tế hiện đại.",
    mbtiPerspective: {
      NT: "Tối đa hóa năng suất lao động bằng cơ giới hóa — logic kinh tế thuần túy",
      NF: "Mặt trái nhân đạo: lao động trẻ em, công nhân 16 giờ/ngày, xóa sổ nghề thủ công truyền thống",
      ST: "Quy trình sản xuất chuẩn hóa, có thể mở rộng quy mô",
      SF: "Kết nối vùng miền bằng đường sắt · hàng hóa giá rẻ cho mọi gia đình",
    },
  },
  {
    event: "Bộ Luật Hammurabi",
    period: "1754 TCN",
    location: "Babylon, Lưỡng Hà (Iraq ngày nay)",
    macroImpact: "Bộ luật thành văn đầu tiên và hoàn chỉnh nhất còn tồn tại; thiết lập nguyên tắc: quyền lực phải được giới hạn và có thể đọc được.",
    howWeFeelItToday: "Mọi hệ thống pháp luật hiện đại đều dựa trên ý tưởng 'luật thành văn có thể tra cứu'",
    whatIfNotHappened: "Quyền lực mãi là tùy tiện và không có giới hạn; không có nền tảng cho khái niệm 'nhà nước pháp quyền'.",
    mbtiPerspective: {
      NT: "Hệ thống hoá quy tắc xã hội để giảm thiểu xung đột và chi phí giao dịch",
      NF: "Luật pháp phân biệt giai cấp cực đoan (hình phạt khác nhau tùy vị thế) — mặt tối cần nhìn thẳng",
      ST: "Quy trình giải quyết tranh chấp rõ ràng, không phụ thuộc vào ý chí một người",
      SF: "Người thường cũng có thể biết mình được và không được làm gì",
    },
  },
  {
    event: "Điện (Nhà máy điện đầu tiên)",
    period: "1882",
    location: "New York (Edison) · London (Edison)",
    macroImpact: "Năng lượng có thể truyền từ xa và biến đổi thành ánh sáng, nhiệt, cơ năng; nền tảng cho công nghiệp hiện đại.",
    howWeFeelItToday: "Điện = không khí thứ hai của đời sống hiện đại. Mất điện 1 giờ = khủng hoảng đô thị.",
    whatIfNotHappened: "Không có bệnh viện hiện đại, không có internet, không có điều hòa, không có tủ lạnh.",
    mbtiPerspective: {
      NT: "Hệ thống phân phối năng lượng phổ quát, biến đổi được sang mọi dạng năng lượng khác",
      NF: "Ánh đèn điện kéo dài ngày học tập và đọc sách — giải phóng tri thức khỏi ánh mặt trời",
      ST: "Cơ sở hạ tầng có thể mở rộng quy mô vô hạn",
      SF: "Ánh sáng buổi tối = thêm thời gian cho gia đình · an toàn hơn trong đêm tối",
    },
  },
  {
    event: "Phong trào Nhân quyền và Quyền dân sự",
    period: "Thế kỷ XVIII-XX",
    location: "Mỹ · Pháp · Toàn cầu",
    macroImpact: "Tuyên ngôn Nhân quyền (1789) · Phong trào Dân quyền Mỹ (1950-60s) · Tuyên ngôn Nhân quyền LHQ (1948)",
    howWeFeelItToday: "Quyền tự do ngôn luận · quyền không bị tra tấn · quyền giáo dục — được coi là hiển nhiên nhưng chỉ 200 năm tuổi",
    whatIfNotHappened: "Nô lệ hoá một nhóm người để phục vụ nhóm khác vẫn được pháp luật bảo vệ.",
    mbtiPerspective: {
      NT: "Phân biệt chủng tộc và kỳ thị = phi logic về mặt nhân loại học và kinh tế",
      NF: "Phẩm giá bình đẳng của mọi con người là nền tảng đạo đức không thể thương lượng",
      ST: "Hệ thống luật pháp cần phản ánh bình đẳng thực chất, không chỉ hình thức",
      SF: "Mọi con người trong gia đình nhân loại đều xứng đáng được yêu thương và tôn trọng",
    },
  },
  {
    event: "Vaccine đầu tiên (Jenner - đậu mùa)",
    period: "1796",
    location: "Anh Quốc (Edward Jenner)",
    macroImpact: "Lần đầu tiên loài người chủ động lập trình hệ miễn dịch để phòng bệnh; đậu mùa được tuyên bố xóa sổ năm 1980.",
    howWeFeelItToday: "Vaccine COVID · vaccine cúm mùa · trẻ em không còn chết vì bại liệt",
    whatIfNotHappened: "Đậu mùa tiếp tục giết 30% số người nhiễm, gây mù lòa cho nhiều người sống sót.",
    mbtiPerspective: {
      NT: "Giải pháp phòng bệnh hệ thống bằng cách huấn luyện trước hệ miễn dịch",
      NF: "Tiêm chủng = hành động yêu thương cộng đồng, bảo vệ những người không thể tự bảo vệ",
      ST: "Chi phí-hiệu quả: vaccine rẻ hơn điều trị bệnh gấp hàng trăm lần",
      SF: "Giữ trẻ em sống sót để lớn lên — điều đơn giản nhưng chỉ 200 năm trước là không tưởng",
    },
  },
]

// ─── Ý TƯỞNG LỚN THAY ĐỔI NHẬN THỨC ─────────────────────

export const BIG_IDEAS: BigIdea[] = [
  {
    idea: "Thuyết Tiến hoá (Darwin)",
    thinker: "Charles Darwin",
    field: "science",
    revolution: "Phá vỡ tư tưởng con người được tạo ra riêng biệt; định vị lại con người là một mắt xích trong cây tiến hóa tự nhiên.",
    everydayImpact: "Hiểu tại sao kháng sinh mất tác dụng (vi khuẩn tiến hoá), tại sao chúng ta có những phản xạ sợ hãi phi lý trong thế giới hiện đại.",
    legitimateCritique: "Thuyết Darwin xã hội bị lạm dụng để bào chữa cho chủ nghĩa đế quốc bóc lột và phân biệt chủng tộc — Darwin bản thân phản đối điều này.",
    mbtiFit: ["NT"],
  },
  {
    idea: "Thuyết Tương đối (Einstein)",
    thinker: "Albert Einstein",
    field: "science",
    revolution: "Không gian và thời gian không tuyệt đối mà tương đối, liên kết với khối lượng và năng lượng qua E=mc².",
    everydayImpact: "GPS hoạt động nhờ tính đến hiệu ứng tương đối thời gian. Không có thuyết tương đối, GPS sai 10km mỗi ngày.",
    legitimateCritique: "Einstein từ chối cơ học lượng tử dù bản thân đã đặt nền móng cho nó — 'Chúa không chơi xúc xắc'. Thực ra Chúa có thể chơi xúc xắc.",
    mbtiFit: ["NT"],
  },
  {
    idea: "Phân tâm học (Freud) và Tâm lý học Phân tích (Jung)",
    thinker: "Sigmund Freud · Carl Jung",
    field: "psychology",
    revolution: "Phát hiện ra thế giới vô thức định hình hành vi con người ngoài tầm kiểm soát lý trí. Jung thêm khái niệm Nguyên Mẫu (Archetypes) tập thể.",
    everydayImpact: "Mọi hình thức trị liệu tâm lý hiện đại đều có nguồn gốc từ Freud và Jung, dù đã phát triển xa hơn nhiều.",
    legitimateCritique: "Thiếu tính thực chứng khoa học, khó kiểm chứng bằng thực nghiệm. Nhiều lý thuyết Freud đã bị bác bỏ (penis envy, hysteria thuần túy).",
    mbtiFit: ["NF", "NT"],
  },
  {
    idea: "Kinh tế học Thị trường (Adam Smith)",
    thinker: "Adam Smith",
    field: "economics",
    revolution: "Khi mỗi cá nhân theo đuổi lợi ích tự thân trong thị trường cạnh tranh, 'bàn tay vô hình' phân bổ nguồn lực xã hội tối ưu.",
    everydayImpact: "Giá cả phản ánh thông tin khan hiếm và ưu tiên của hàng triệu người — không cần ai lên kế hoạch tập trung.",
    legitimateCritique: "Bỏ qua vấn đề ngoại tác (ô nhiễm môi trường), hàng hoá công cộng và bất bình đẳng giai cấp. Thị trường tự do thuần túy không tồn tại trong thực tế.",
    mbtiFit: ["NT", "ST"],
  },
  {
    idea: "Chủ nghĩa Nữ quyền (Feminism)",
    thinker: "Mary Wollstonecraft · Simone de Beauvoir · Betty Friedan",
    field: "social",
    revolution: "Phụ nữ không phải 'tự nhiên' kém nam giới — sự bất bình đẳng là sản phẩm của cấu trúc xã hội và văn hoá.",
    everydayImpact: "Phụ nữ đi học, đi làm, bầu cử, lãnh đạo doanh nghiệp — những điều hiển nhiên chỉ 150 năm trước không tồn tại.",
    legitimateCritique: "Các trường phái nữ quyền đôi khi tranh luận gay gắt nhau về ưu tiên (giai cấp vs giới tính vs chủng tộc).",
    mbtiFit: ["NF", "NT"],
  },
]

// ─── 13 VĂN MINH LỚN ─────────────────────────────────────

export const CIVILIZATIONS: Civilization[] = [
  {
    name: "Ai Cập cổ đại",
    period: "3100 TCN - 30 TCN",
    geography: "Dọc sông Nile, Bắc Phi",
    contributions: ["Kim tự tháp — kỳ tích kiến trúc 4.500 năm tuổi", "Thuật ướp xác bảo tồn sinh học", "Chữ tượng hình Hieroglyphs", "Hệ thống thủy lợi dọc sông Nile", "Giấy papyrus"],
    humanNatureView: "Con người là một phần của trật tự vũ trụ vĩnh cửu (Ma'at — công lý vũ trụ); phận người là phục vụ các vị thần và Pharaon",
    naturalWorldView: "Tự nhiên xoay quanh sự tuần hoàn sống-chết-tái sinh của dòng nước sông Nile; mỗi năm lũ lụt là tái sinh",
    timeView: "Thời gian là tiến trình chuẩn bị cho cuộc sống sau cái chết ở cõi vĩnh hằng; thế giới bên kia quan trọng hơn cuộc sống hiện tại",
    whatWeCanLearn: "Kỹ thuật quản lý nguồn nước quy mô lớn · tư duy dài hạn 100 năm (Kim tự tháp xây cả đời Pharaon) · nghệ thuật bảo tồn",
    darkSide: "Chế độ quân chủ chuyên chế tuyệt đối bóc lột sức lao động của nông dân và nô lệ phục vụ lăng mộ Pharaon",
  },
  {
    name: "Lưỡng Hà (Mesopotamia)",
    period: "3500 TCN - 539 TCN",
    geography: "Giữa sông Tigris và Euphrates (Iraq ngày nay)",
    contributions: ["Bộ luật Hammurabi — thành văn đầu tiên", "Phát minh bánh xe", "Hệ thống toán học cơ số 60 (60 phút, 60 giây)", "Chữ hình nêm", "Hệ thống tưới tiêu nhân tạo"],
    humanNatureView: "Con người do thần linh tạo ra để lao dịch; con người vừa có tự do ý chí vừa phục tùng số phận (Me) do thần định",
    naturalWorldView: "Tự nhiên là thế lực hỗn loạn, lũ lụt tàn khốc cần được chế ngự bằng đê đập; thần linh kiểm soát tự nhiên",
    timeView: "Thời gian tuyến tính của sự trỗi dậy và sụp đổ của các thành bang; lịch sử là câu chuyện về chiến thắng và thất bại",
    whatWeCanLearn: "Luật pháp thành văn bình đẳng hơn không thành văn · hệ thống toán học cơ số 60 vẫn dùng đến nay · quản lý đô thị có kế hoạch",
    darkSide: "Luật phân biệt giai cấp cực đoan (hình phạt dựa trên vị thế xã hội); các cuộc chiến tranh hủy diệt liên miên giữa các thành bang",
  },
  {
    name: "Hy Lạp cổ đại",
    period: "800 TCN - 31 TCN",
    geography: "Bán đảo Hy Lạp, Địa Trung Hải",
    contributions: ["Dân chủ Athens", "Triết học phương Tây (Socrates · Plato · Aristotle)", "Toán học Euclid · Pythagoras", "Thế vận hội Olympic", "Nhà hát và kịch bản"],
    humanNatureView: "Con người là động vật chính trị (Aristotle: 'Zôon Politikon'); lý tính là thuộc tính cao nhất phân biệt người với thú; Arete (xuất sắc đức hạnh) là mục tiêu",
    naturalWorldView: "Tự nhiên có trật tự lý tính có thể khám phá bằng tư duy; đằng sau hiện tượng là các nguyên lý bất biến",
    timeView: "Thời gian tuần hoàn theo chu kỳ; thế giới là vĩnh cửu không có điểm bắt đầu hay kết thúc (Aristotle); lịch sử là sự lặp lại các mẫu",
    whatWeCanLearn: "Phương pháp Socrates đặt câu hỏi · tư duy hệ thống Aristotle · lý tưởng về đức hạnh và xuất sắc · nền tảng khoa học phương Tây",
    darkSide: "Nô lệ hóa 30-40% dân số Athens; phụ nữ bị loại khỏi đời sống công cộng; dân chủ chỉ cho nam công dân Athens",
  },
  {
    name: "La Mã cổ đại",
    period: "753 TCN - 476 sau CN",
    geography: "Ý · Địa Trung Hải · Tây Âu · Bắc Phi",
    contributions: ["Hệ thống pháp luật La Mã — nền tảng luật Châu Âu", "Kỹ thuật xây dựng (cầu vòm · đường La Mã)", "Quản trị đế chế đa văn hoá", "Ngôn ngữ Latin — mẹ của các ngôn ngữ Latin hiện đại"],
    humanNatureView: "Con người có thể đạt đức hạnh Stoic qua kỷ luật ý chí; pháp luật là biểu hiện của lý tính phổ quát",
    naturalWorldView: "Tự nhiên là tài nguyên cần được khai thác và kiểm soát bằng kỹ thuật; không gian địa lý là thứ cần chinh phục",
    timeView: "Lịch sử tuyến tính và có mục đích: La Mã là đỉnh cao của sự tiến bộ loài người; các thế kỷ trước dẫn đến La Mã, La Mã sẽ tồn tại vĩnh cửu",
    whatWeCanLearn: "Quản trị đa văn hoá · hệ thống luật pháp thành văn · kỹ thuật xây dựng hạ tầng · tổ chức quân sự chuyên nghiệp",
    darkSide: "Nô lệ hóa quy mô lớn; các cuộc chiến chinh phục tàn bạo; thực dân hoá các nền văn hoá địa phương",
  },
  {
    name: "Trung Hoa cổ đại (Nhà Hán · Đường · Tống · Minh)",
    period: "221 TCN - 1912",
    geography: "Đồng bằng sông Hoàng Hà và Dương Tử, Đông Á",
    contributions: ["Giấy · in ấn · la bàn · thuốc súng (Tứ Đại Phát Minh)", "Hệ thống thi cử quan lại dựa trên năng lực", "Lụa · đồ sứ · trà", "Con đường Tơ Lụa kết nối Đông-Tây", "Triết học Nho · Lão · Phật tích hợp"],
    humanNatureView: "Con người về bản chất tốt lành (Mạnh Tử) và có thể hoàn thiện qua giáo dục và tu thân; nghĩa vụ gia đình-xã hội là trên hết",
    naturalWorldView: "Tự nhiên là đối tác cần hài hoà, không phải kẻ thù cần chinh phục; Âm Dương cân bằng",
    timeView: "Thời gian tuần hoàn theo các triều đại: hưng thịnh → suy tàn → hưng thịnh; lịch sử là bài học cho hiện tại",
    whatWeCanLearn: "Thi cử năng lực tạo tầng lớp quan liêu chuyên nghiệp · tư duy dài hạn · hài hoà với tự nhiên · triết học ứng dụng đời sống",
    darkSide: "Hệ thống gia trưởng khắt khe; chân bó phụ nữ; các triều đại sau đóng cửa không tiếp thu kỹ thuật phương Tây",
  },
  {
    name: "Ấn Độ cổ đại",
    period: "2600 TCN - Thế kỷ XVIII",
    geography: "Tiểu lục địa Ấn Độ",
    contributions: ["Hệ thống chữ số thập phân và số 0 — nền tảng toán học hiện đại", "Yoga và Ayurveda", "Phật giáo và Ấn Độ giáo", "Triết học Vedanta", "Vải cotton và gia vị thương mại"],
    humanNatureView: "Linh hồn (Atman) là một phần của Brahman vĩ đại; con người có thể đạt giải thoát (Moksha) qua tu tập · trách nhiệm (Dharma) là quy định theo vị thế xã hội",
    naturalWorldView: "Vũ trụ là biểu hiện của Brahman; tự nhiên là Maya (ảo giác) che giấu Thực Tại tối cao; cần nhìn thấu qua ảo giác để giác ngộ",
    timeView: "Thời gian tuần hoàn theo các Yuga vĩ đại (hàng triệu năm); chúng ta đang trong Kali Yuga (thời kỳ thoái hoá); trước đó là Satya Yuga (Kỷ Vàng)",
    whatWeCanLearn: "Toán học số 0 và hệ thập phân · Yoga như thực hành tâm thân · triết học về ý thức và vô ngã · y học Ayurveda",
    darkSide: "Hệ thống Varna/Jati (đẳng cấp) phân biệt và tước quyền nhóm Dalit (Untouchables) qua hàng nghìn năm",
  },
  {
    name: "Maya cổ đại",
    period: "2000 TCN - 1697",
    geography: "Trung Mỹ (Mexico · Guatemala · Belize · Honduras)",
    contributions: ["Lịch Maya chính xác tuyệt vời", "Toán học cơ số 20 và phát minh độc lập số 0", "Chữ viết Maya phức tạp", "Kiến trúc đền tháp bậc thang đồ sộ", "Thiên văn học không cần kính viễn vọng"],
    humanNatureView: "Con người được tạo ra từ ngô (lương thực thiêng liêng); có nghĩa vụ duy trì sự cân bằng vũ trụ thông qua nghi lễ và cúng tế",
    naturalWorldView: "Thiên nhiên đầy rẫy thần linh; mỗi cây cỏ, mỗi sự kiện thiên văn đều có ý nghĩa tâm linh; con người là người giao liên giữa các cõi",
    timeView: "Thời gian tuần hoàn theo các chu kỳ lịch vĩ đại; vũ trụ đã trải qua nhiều kỷ tạo dựng và hủy diệt",
    whatWeCanLearn: "Thiên văn học chính xác không cần công nghệ hiện đại · toán học trừu tượng phức tạp · quy hoạch đô thị sống với rừng nhiệt đới",
    darkSide: "Nghi lễ hiến tế người sống quy mô lớn; phá rừng làm nông nghiệp quá mức dẫn đến sụp đổ sinh thái",
  },
  {
    name: "Hồi giáo thời Vàng (Islamic Golden Age)",
    period: "800-1300 sau CN",
    geography: "Baghdad · Cairo · Cordoba · Trung Đông và Bắc Phi",
    contributions: ["Đại số học (Algebra — từ 'Al-jabr' tiếng Ả Rập)", "Quang học Ibn al-Haytham", "Y học Ibn Sina (Avicenna) — 800 năm trước phương Tây", "Bảo tồn và dịch thuật triết học Hy Lạp", "Thiên văn học · thuật toán (Algorithm — từ tên Al-Khwarizmi)"],
    humanNatureView: "Con người là đại diện (Khalifa) của Allah trên trái đất; tìm kiếm tri thức là bổn phận tôn giáo ('Hãy đọc!' — lời đầu tiên Allah mặc khải)",
    naturalWorldView: "Tự nhiên là sách thứ hai của Allah; khoa học và tôn giáo không mâu thuẫn mà bổ sung nhau",
    timeView: "Thời gian tuyến tính từ Sáng Tạo đến Ngày Phán Xét; lịch sử là sự tiến triển dưới sự hướng dẫn của Allah",
    whatWeCanLearn: "Tìm kiếm tri thức từ mọi nguồn (kể cả không cùng tôn giáo) · khoa học thực nghiệm kết hợp toán học · bệnh viện công đầu tiên · dịch thuật tri thức đa văn hoá",
    darkSide: "Mở rộng bằng chinh phục quân sự; sụp đổ Đế chế Abbasid dưới tay Mông Cổ (1258) kết thúc thời kỳ vàng",
  },
  {
    name: "Phục Hưng châu Âu (Renaissance)",
    period: "Thế kỷ XIV-XVII",
    geography: "Bắc Ý (Florence · Venice · Rome) · lan ra toàn châu Âu",
    contributions: ["Hội họa viễn cận pháp (Perspective)", "Giải phẫu học hiện đại (Leonardo da Vinci)", "Thuyết nhật tâm (Copernicus · Galileo)", "Văn học nhân văn (Dante · Petrarch · Shakespeare)", "In ấn Gutenberg"],
    humanNatureView: "Con người là trung tâm của vũ trụ (Humanism); có khả năng vô hạn để hiểu và kiến tạo thế giới; dignity và tự do cá nhân là giá trị cao nhất",
    naturalWorldView: "Tự nhiên có thể được quan sát, đo lường và mô phỏng bằng nghệ thuật và khoa học; thực tế có cấu trúc toán học",
    timeView: "Tái sinh (Re-naissance) của trí tuệ Hy Lạp-La Mã sau 'Đêm Trường Trung Cổ'; thời đại của tiến bộ không ngừng",
    whatWeCanLearn: "Tư duy liên ngành (Leonardo là nghệ sĩ-khoa học-kỹ sư) · quan sát tự nhiên trực tiếp thay vì chỉ đọc sách · phẩm giá con người độc lập với tôn giáo",
    darkSide: "Sự phục hưng chủ yếu dành cho nam giới tầng lớp trên; sự chinh phục châu Mỹ bắt đầu cùng thời kỳ",
  },
  {
    name: "Đế quốc Aztec",
    period: "1300-1521",
    geography: "Trung Mexico (Tenochtitlan — nay là Mexico City)",
    contributions: ["Tenochtitlan — đô thị lớn nhất thế giới năm 1500 (250.000 dân)", "Hệ thống thủy lợi và nông nghiệp chinampas (đảo nổi)", "Thiên văn học lịch Mặt trời", "Y học thảo dược tinh vi", "Cacao và chocolate"],
    humanNatureView: "Con người có nghĩa vụ duy trì năng lượng Mặt trời và sự cân bằng vũ trụ qua các nghi lễ hiến tế",
    naturalWorldView: "Tự nhiên đầy thần linh đòi hỏi sự tôn kính và cúng tế; Mặt trời cần được nuôi dưỡng bằng máu người",
    timeView: "Vũ trụ đã trải qua bốn kỷ trước và bị hủy diệt; chúng ta đang trong kỷ thứ năm (có thể kết thúc bất kỳ lúc nào)",
    whatWeCanLearn: "Quy hoạch đô thị phức tạp · nông nghiệp bền vững trong điều kiện khắc nghiệt · y học thảo dược · chocolate và cacao",
    darkSide: "Hiến tế người hàng năm quy mô lớn (ước tính hàng nghìn người/năm); chinh phục và thu thuế các bộ tộc lân cận",
  },
  {
    name: "Nhật Bản thời Edo",
    period: "1603-1868",
    geography: "Quần đảo Nhật Bản",
    contributions: ["Kiến trúc vườn thiền Zen", "Nghệ thuật Ukiyo-e và in bản khắc gỗ", "Kiếm đạo · Trà đạo · Hoa đạo như triết học sống", "Tơ lụa và thủ công mỹ nghệ tinh xảo", "Hệ thống giáo dục phổ cập sớm nhất châu Á"],
    humanNatureView: "Con người có nghĩa vụ với vị thế xã hội của mình (Bushido cho samurai · bổn phận với chủ nhân); sự xuất sắc (Shokunin Kishitsu) là đức hạnh cao nhất",
    naturalWorldView: "Thiên nhiên là đối tác tâm linh cần được tôn kính (Mono no Aware — vẻ đẹp buồn của sự vô thường); mùa là những vị thần",
    timeView: "Thời gian tuần hoàn theo các mùa và sự vô thường (Wabi-sabi); trân trọng khoảnh khắc hiện tại trước khi tan biến",
    whatWeCanLearn: "Kaizen (cải tiến liên tục 1%) · Ikigai (mục đích sống) · Wabi-sabi (chấp nhận không hoàn hảo) · Thủ công nghề truyền thống với tiêu chuẩn xuất sắc",
    darkSide: "Chế độ đẳng cấp cứng nhắc (Samurai · Nông dân · Thợ thủ công · Thương nhân); đóng cửa hoàn toàn với thế giới bên ngoài 200 năm (Sakoku)",
  },
  {
    name: "Triều Tiên Joseon",
    period: "1392-1897",
    geography: "Bán đảo Triều Tiên",
    contributions: ["Chữ Hangul — bảng chữ cái khoa học nhất thế giới (Sejong Đại đế, 1443)", "Hệ thống thi cử quan lại Gwageo", "Đồ sứ celadon tinh xảo", "Y học cổ truyền Đông y phát triển độc lập", "In ấn bằng kim loại 200 năm trước Gutenberg"],
    humanNatureView: "Con người có thể hoàn thiện qua học tập Nho giáo; hiếu thảo và trung thành là đức hạnh cao nhất; tri thức là con đường đến quyền lực",
    naturalWorldView: "Tự nhiên là nguồn cảm hứng thi ca và hội họa; hài hoà với tự nhiên phản ánh hài hoà xã hội",
    timeView: "Thời gian tuyến tính của các triều đại; lịch sử là bài học đạo đức cho cai trị hiện tại",
    whatWeCanLearn: "Chữ Hangul là mẫu mực thiết kế ngôn ngữ khoa học · thi cử năng lực vượt xuất thân · in ấn kim loại tiên tiến · đề cao tri thức",
    darkSide: "Phân biệt đẳng cấp cứng nhắc (Yangban quý tộc vs Baekjeong tiện dân); phụ nữ bị hạn chế nghiêm ngặt trong không gian riêng tư (Naeoe)",
  },
  {
    name: "Việt Nam các triều đại (Lý · Trần · Lê · Nguyễn)",
    period: "1009-1945",
    geography: "Đồng bằng sông Hồng và ven biển Đông",
    contributions: ["Hệ thống đê điều chống lũ sông Hồng", "Văn học chữ Nôm (Truyện Kiều - Nguyễn Du)", "Luật Hồng Đức (bảo vệ phần quyền phụ nữ thế kỷ XV)", "Nghệ thuật múa rối nước", "Kiến trúc tháp Chăm · chùa Một Cột", "Chiến thuật quân sự nhân dân thắng quân đông"],
    humanNatureView: "Con người gắn liền bổn phận gia tộc và làng xã ('Phép vua thua lệ làng'); tập thể quan trọng hơn cá nhân; đạo hiếu là nền tảng",
    naturalWorldView: "Ruộng đồng sông nước cần được hài hoà và đùm bọc lẫn nhau; tự nhiên là nguồn sống cần được tôn trọng",
    timeView: "Tuần hoàn theo các mùa vụ nông nghiệp và sự hưng vong của triều đại; lịch sử là nguồn cảm hứng và bài học giữ nước",
    whatWeCanLearn: "Chiến thuật kháng chiến toàn dân linh hoạt · tư duy pháp lý tiến bộ thế kỷ XV (Luật Hồng Đức) · sức sống văn hoá dưới áp lực đồng hoá",
    darkSide: "Sự kìm kẹp của tư tưởng phụ quyền Nho giáo giai đoạn muộn; bảo thủ đóng cửa từ chối kỹ thuật phương Tây của triều Nguyễn dẫn đến mất nước",
  },
]

// ─── LỊCH SỬ TỪ GÓC NGƯỜI THƯỜNG ─────────────────────────

export const EVERYDAY_HISTORY: EverydayHistory[] = [
  {
    topic: "Người nông dân thời Trung Cổ sống như thế nào",
    period: "Thế kỷ X-XIV",
    civilization: "Châu Âu",
    description: "Người nông dân thức dậy trước mặt trời mọc để làm việc trên đất của lãnh chúa theo chế độ phong kiến. Bữa ăn đạm bạc chủ yếu là bánh mì đen làm từ lúa mạch, cháo yến mạch và bia loãng (an toàn hơn nước giếng ô nhiễm). Họ không sở hữu đất đai, phải nộp phần lớn hoa lợi cho lãnh chúa và giáo hội. Mặc dù cuộc sống đầy rẫy dịch bệnh, người nông dân tìm thấy sự an ủi trong các ngày lễ tôn giáo hằng tháng — khoảng thời gian hiếm hoi được nghỉ ngơi và tham gia các trò chơi cộng đồng.",
    modernParallel: "Tỷ lệ trả lại cho 'lãnh chúa' (nhà nước, chủ nhà, ngân hàng) không khác nhiều — người lao động hiện đại cũng trả 30-50% thu nhập cho các nghĩa vụ bắt buộc.",
    source: "[P] Synthesized from medieval history scholarship",
  },
  {
    topic: "Phụ nữ thời La Mã có quyền gì",
    period: "27 TCN - 476 sau CN",
    civilization: "La Mã cổ đại",
    description: "Phụ nữ La Mã không có tư cách pháp lý độc lập — luôn dưới quyền kiểm soát của một người đàn ông (Patria Potestas: cha → chồng). Không có quyền bầu cử, không được đảm nhận chức vụ công, không tự đứng tên sở hữu tài sản lớn. Tuy nhiên, so với Hy Lạp, họ tự do hơn nhiều: được tham gia bữa tiệc công cộng, đi xem kịch, quản lý việc nhà và có tầm ảnh hưởng chính trị gián tiếp qua các mối quan hệ gia tộc.",
    modernParallel: "Phụ nữ VN hiện đại có đầy đủ quyền pháp lý nhưng áp lực xã hội về kết hôn sớm, chăm lo gia đình còn tồn tại — sự thay đổi pháp luật nhanh hơn thay đổi kỳ vọng xã hội.",
    source: "[P] Based on Roman law and social history scholarship",
  },
  {
    topic: "Trẻ em thời Victoria học gì",
    period: "1837-1901",
    civilization: "Anh Quốc thời Cách mạng Công nghiệp",
    description: "Bức tranh phân cực: trẻ em tầng lớp trên được gia sư dạy tiếng Latin, lịch sử và nghi lễ quý tộc. Trẻ em nghèo phải lao động 12-14 tiếng hằng ngày trong hầm mỏ hoặc nhà máy dệt. Chỉ đến Luật Giáo dục tiểu học 1870, trường công lập miễn phí mới bắt đầu. Giáo dục thời kỳ này tập trung vào kỷ luật sắt và học thuộc lòng để đào tạo công nhân cho bộ máy công nghiệp.",
    modernParallel: "Hệ thống giáo dục VN hiện đại vẫn đang chuyển dịch từ 'học thuộc lòng để thi' sang 'phát triển tư duy sáng tạo' — một quá trình thay đổi thế kỷ.",
    source: "[P] Based on Victorian education and labor history",
  },
  {
    topic: "Người Maya tính lịch như thế nào",
    period: "200-900 sau CN (Thời kỳ cổ điển)",
    civilization: "Maya, Trung Mỹ",
    description: "Người Maya cổ đại phát triển thiên văn học chính xác kinh ngạc mà không cần kính viễn vọng. Họ tính chu kỳ quỹ đạo Trái Đất quanh Mặt Trời là 365.242 ngày (sai số chưa đầy 0.0002 ngày so với hiện đại). Lịch Tzolkin (260 ngày) kết hợp với lịch Haab (365 ngày) tạo thành Vòng Lịch (Calendar Round) chi phối gieo trồng, lễ hội và quyết định chính trị. Các quan sát thiên văn được thực hiện từ các tòa nhà được thiết kế như kính viễn vọng kiến trúc.",
    modernParallel: "Tư duy khoa học đỉnh cao có thể nảy nở từ hệ hình văn hoá hoàn toàn khác phương Tây — không có con đường 'tiến bộ' duy nhất.",
    source: "[P] Based on Maya archaeology and astronomy scholarship",
  },
  {
    topic: "Buôn bán dọc Con đường Tơ Lụa diễn ra thế nào",
    period: "130 TCN - 1453 sau CN",
    civilization: "Kết nối Trung Hoa - Trung Á - Ba Tư - Roma",
    description: "Con đường Tơ Lụa không phải là một con đường duy nhất mà là mạng lưới các tuyến thương mại và văn hoá nối liền châu Á với châu Âu. Thương nhân hiếm khi đi suốt đoạn đường — hàng hoá được chuyển tay nhiều lần qua các trạm dừng. Không chỉ lụa và gia vị: Phật giáo, Hồi giáo, công nghệ in ấn, thuốc súng và dịch hạch đều di chuyển theo con đường này. Đây là hệ thống internet đầu tiên của loài người.",
    modernParallel: "Toàn cầu hoá ngày nay là Con đường Tơ Lụa số — Amazon, Alibaba, container shipping là những 'trạm dừng' hiện đại.",
    source: "[P] Based on Silk Road historical scholarship",
  },
]

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getTurningPointsByGroup(group: MbtiGroup): TurningPoint[] {
  return TURNING_POINTS.filter(tp => tp.mbtiPerspective[group] !== undefined)
}

export function getRandomTurningPoint(): TurningPoint {
  return TURNING_POINTS[Math.floor(Math.random() * TURNING_POINTS.length)]
}

export function getCivilizationByName(name: string): Civilization | null {
  return CIVILIZATIONS.find(c => c.name.includes(name)) ?? null
}
