import type { GroupName } from "./colors";

export interface PersonalityType {
  name: string;
  nameVi: string;
  group: GroupName;
  tagline: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  famousPeople: string[];
  color: string;
}

export const PERSONALITY_DATA: Record<string, PersonalityType> = {
  INTJ: {
    name: "Architect",
    nameVi: "Kiến trúc sư",
    group: "Analysts",
    tagline: "Imaginative and strategic thinkers, with a plan for everything.",
    description:
      "INTJs là những người có tư duy chiến lược và trí tưởng tượng phong phú. Họ có kế hoạch cho mọi thứ và luôn tự tin vào cái nhìn của mình. Họ độc lập, quyết đoán và có xu hướng ít chia sẻ cảm xúc.",
    strengths: ["Chiến lược & có tầm nhìn xa", "Tự tin và quyết đoán", "Độc lập và sáng tạo", "Tư duy phân tích sắc bén"],
    weaknesses: ["Có thể bị xem là kiêu ngạo", "Khó chịu khi kế hoạch thay đổi", "Đôi khi thiếu linh hoạt cảm xúc"],
    careers: ["Kỹ sư phần mềm", "Nhà khoa học", "Luật sư", "Giám đốc điều hành", "Kiến trúc sư"],
    famousPeople: ["Elon Musk", "Friedrich Nietzsche", "Michelle Obama"],
    color: "#8B5CF6",
  },
  INTP: {
    name: "Logician",
    nameVi: "Nhà logic",
    group: "Analysts",
    tagline: "Innovative inventors with an unquenchable thirst for knowledge.",
    description:
      "INTPs là những nhà tư tưởng sáng tạo với khát vọng kiến thức không bao giờ thỏa mãn. Họ yêu thích lý thuyết, thích phân tích các ý tưởng phức tạp và tìm kiếm sự hiểu biết sâu sắc.",
    strengths: ["Phân tích logic xuất sắc", "Sáng tạo và đổi mới", "Tư duy khách quan", "Ham học hỏi"],
    weaknesses: ["Thiếu quyết đoán", "Khó diễn đạt cảm xúc", "Có thể bị xa cách với thực tế"],
    careers: ["Lập trình viên", "Nhà toán học", "Triết gia", "Nhà nghiên cứu", "Nhà phân tích dữ liệu"],
    famousPeople: ["Albert Einstein", "Bill Gates", "Larry Page"],
    color: "#8B5CF6",
  },
  ENTJ: {
    name: "Commander",
    nameVi: "Chỉ huy",
    group: "Analysts",
    tagline: "Bold, imaginative and strong-willed leaders, always finding a way.",
    description:
      "ENTJs là những nhà lãnh đạo bẩm sinh, táo bạo và có ý chí mạnh mẽ. Họ luôn tìm ra con đường hoặc tự tạo ra nó. Họ hiệu quả cao và luôn hướng đến mục tiêu.",
    strengths: ["Lãnh đạo tự nhiên", "Quyết đoán và hiệu quả", "Tự tin và chiến lược", "Có khả năng truyền cảm hứng"],
    weaknesses: ["Có thể thiếu kiên nhẫn", "Đôi khi quá thống trị", "Ít quan tâm đến cảm xúc người khác"],
    careers: ["CEO / Giám đốc", "Luật sư", "Chính trị gia", "Doanh nhân", "Quản lý cấp cao"],
    famousPeople: ["Steve Jobs", "Napoleon Bonaparte", "Margaret Thatcher"],
    color: "#8B5CF6",
  },
  ENTP: {
    name: "Debater",
    nameVi: "Tranh luận viên",
    group: "Analysts",
    tagline: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    description:
      "ENTPs là những người thông minh và tò mò, không thể cưỡng lại thách thức trí tuệ. Họ giỏi nhìn thấy tiềm năng trong mọi ý tưởng và thích tranh luận để tìm ra sự thật.",
    strengths: ["Sáng tạo và linh hoạt", "Tư duy nhanh nhạy", "Giỏi tranh luận", "Nhiều ý tưởng độc đáo"],
    weaknesses: ["Dễ bỏ dở ý tưởng giữa chừng", "Có thể gây tranh cãi không cần thiết", "Thiếu kiên nhẫn với chi tiết"],
    careers: ["Doanh nhân", "Luật sư", "Kỹ sư", "Nhà báo điều tra", "Cố vấn chiến lược"],
    famousPeople: ["Mark Twain", "Thomas Edison", "Celine Dion"],
    color: "#8B5CF6",
  },
  INFJ: {
    name: "Advocate",
    nameVi: "Người ủng hộ",
    group: "Diplomats",
    tagline: "Quiet and mystical, yet very inspiring and tireless idealists.",
    description:
      "INFJs là những người lý tưởng không biết mệt mỏi, bình tĩnh nhưng đầy cảm hứng. Họ có tầm nhìn sâu sắc về con người và thế giới, luôn muốn tạo ra sự khác biệt tích cực.",
    strengths: ["Đồng cảm sâu sắc", "Sáng tạo và có tầm nhìn", "Kiên định với giá trị", "Truyền cảm hứng cho người khác"],
    weaknesses: ["Quá lý tưởng hóa", "Dễ kiệt sức cảm xúc", "Khó chấp nhận phê bình"],
    careers: ["Nhà tâm lý học", "Nhà văn", "Giáo viên", "Cố vấn", "Bác sĩ"],
    famousPeople: ["Martin Luther King Jr.", "Nelson Mandela", "Mother Teresa"],
    color: "#10B981",
  },
  INFP: {
    name: "Mediator",
    nameVi: "Hòa giải viên",
    group: "Diplomats",
    tagline: "Poetic, kind and altruistic people, always eager to help a good cause.",
    description:
      "INFPs là những người thơ ca, tử tế và vị tha, luôn sẵn sàng giúp đỡ các mục tiêu tốt đẹp. Họ có thế giới nội tâm phong phú và coi trọng sự chân thực.",
    strengths: ["Sáng tạo và giàu trí tưởng tượng", "Đồng cảm và vị tha", "Trung thành và chân thành", "Linh hoạt và cởi mở"],
    weaknesses: ["Quá nhạy cảm", "Khó đưa ra quyết định thực tế", "Có xu hướng trốn tránh xung đột"],
    careers: ["Nhà văn / Nghệ sĩ", "Nhà tâm lý học", "Giáo viên", "Nhà hoạt động xã hội", "Nhà thiết kế"],
    famousPeople: ["J.R.R. Tolkien", "William Shakespeare", "Princess Diana"],
    color: "#10B981",
  },
  ENFJ: {
    name: "Protagonist",
    nameVi: "Người dẫn dắt",
    group: "Diplomats",
    tagline: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    description:
      "ENFJs là những nhà lãnh đạo đầy sức lôi cuốn và truyền cảm hứng. Họ có khả năng thiên bẩm trong việc hiểu và kết nối với người khác.",
    strengths: ["Lãnh đạo và truyền cảm hứng", "Đồng cảm tự nhiên", "Kỹ năng giao tiếp xuất sắc", "Nhiệt huyết và tận tâm"],
    weaknesses: ["Quá hi sinh bản thân", "Nhạy cảm với phê bình", "Khó chia sẻ vấn đề cá nhân"],
    careers: ["Giáo viên / Giảng viên", "Chính trị gia", "Huấn luyện viên", "Nhà tâm lý học", "Quản lý nhân sự"],
    famousPeople: ["Barack Obama", "Oprah Winfrey", "John Cusack"],
    color: "#10B981",
  },
  ENFP: {
    name: "Campaigner",
    nameVi: "Người vận động",
    group: "Diplomats",
    tagline: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    description:
      "ENFPs là những tâm hồn tự do đầy nhiệt huyết, sáng tạo và hòa đồng. Họ luôn tìm thấy lý do để mỉm cười và truyền năng lượng tích cực cho những người xung quanh.",
    strengths: ["Nhiệt huyết và sáng tạo", "Hòa đồng và truyền cảm hứng", "Tò mò và cởi mở", "Đồng cảm sâu sắc"],
    weaknesses: ["Dễ mất tập trung", "Khó hoàn thành dự án dài hạn", "Quá lạc quan đôi khi"],
    careers: ["Diễn viên / Nghệ sĩ", "Nhà báo", "Huấn luyện viên", "Marketing", "Nhà tư vấn"],
    famousPeople: ["Robin Williams", "Mark Twain", "Walt Disney"],
    color: "#10B981",
  },
  ISTJ: {
    name: "Logistician",
    nameVi: "Nhà hậu cần",
    group: "Sentinels",
    tagline: "Practical and fact-minded individuals, whose reliability cannot be doubted.",
    description:
      "ISTJs là những người thực tế và dựa vào sự kiện, sự đáng tin cậy của họ không thể bị nghi ngờ. Họ là những người công nhân chăm chỉ, tận tâm với trách nhiệm.",
    strengths: ["Đáng tin cậy và trách nhiệm cao", "Tổ chức và ngăn nắp", "Kiên nhẫn và kiên trì", "Trung thực và thẳng thắn"],
    weaknesses: ["Kháng thay đổi", "Đôi khi quá cứng nhắc", "Khó diễn đạt cảm xúc"],
    careers: ["Kế toán / Kiểm toán", "Quản lý dự án", "Luật sư", "Quân đội / Cảnh sát", "Kỹ sư"],
    famousPeople: ["Queen Elizabeth II", "Warren Buffett", "George Washington"],
    color: "#3B82F6",
  },
  ISFJ: {
    name: "Defender",
    nameVi: "Người bảo vệ",
    group: "Sentinels",
    tagline: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    description:
      "ISFJs là những người bảo vệ ấm áp và tận tâm, luôn sẵn sàng bảo vệ những người thân yêu. Họ là những người chăm sóc tự nhiên với trí nhớ tuyệt vời về chi tiết.",
    strengths: ["Tận tâm và chăm chỉ", "Ấm áp và quan tâm người khác", "Đáng tin cậy và kiên nhẫn", "Chú ý đến chi tiết"],
    weaknesses: ["Hay lo lắng thái quá", "Khó nói không", "Đôi khi bị khai thác vì tốt bụng"],
    careers: ["Y tá / Bác sĩ", "Giáo viên", "Nhân viên xã hội", "Quản trị văn phòng", "Chăm sóc khách hàng"],
    famousPeople: ["Mother Teresa", "Queen Mary I", "Vin Diesel"],
    color: "#3B82F6",
  },
  ESTJ: {
    name: "Executive",
    nameVi: "Giám đốc điều hành",
    group: "Sentinels",
    tagline: "Excellent administrators, unsurpassed at managing things or people.",
    description:
      "ESTJs là những nhà quản trị xuất sắc, không ai sánh bằng trong việc quản lý công việc hoặc con người. Họ tin vào truyền thống, trật tự và luôn tổ chức mọi thứ hiệu quả.",
    strengths: ["Tổ chức và quản lý xuất sắc", "Tận tâm và đáng tin cậy", "Quyết đoán và trực tiếp", "Lãnh đạo tự nhiên"],
    weaknesses: ["Kém linh hoạt", "Khó chấp nhận quan điểm khác biệt", "Đôi khi quá phán xét"],
    careers: ["Quản lý / Giám đốc", "Luật sư", "Cảnh sát / Quân đội", "Kế toán", "Giáo viên"],
    famousPeople: ["Henry Ford", "Judge Judy", "Sonia Sotomayor"],
    color: "#3B82F6",
  },
  ESFJ: {
    name: "Consul",
    nameVi: "Lãnh sự",
    group: "Sentinels",
    tagline: "Extraordinarily caring, social and popular people, always eager to help.",
    description:
      "ESFJs là những người quan tâm phi thường, hòa đồng và được yêu quý, luôn sẵn sàng giúp đỡ. Họ có nhu cầu mạnh mẽ được cảm thấy hữu ích và được đánh giá cao.",
    strengths: ["Quan tâm và tử tế", "Kỹ năng xã hội xuất sắc", "Đáng tin cậy và tận tâm", "Thực tế và có tổ chức"],
    weaknesses: ["Quá chú trọng đến ý kiến người khác", "Khó chấp nhận thay đổi", "Hay lo lắng thái quá"],
    careers: ["Y tá / Giáo viên", "Nhân viên xã hội", "Chăm sóc sức khỏe", "Quản lý sự kiện", "PR"],
    famousPeople: ["Taylor Swift", "Bill Clinton", "Jennifer Garner"],
    color: "#3B82F6",
  },
  ISTP: {
    name: "Virtuoso",
    nameVi: "Nghệ nhân",
    group: "Explorers",
    tagline: "Bold and practical experimenters, masters of all kinds of tools.",
    description:
      "ISTPs là những người thực nghiệm táo bạo và thực tế, bậc thầy về mọi loại công cụ. Họ thích tự mình khám phá cách thức hoạt động của mọi thứ.",
    strengths: ["Kỹ năng thực hành xuất sắc", "Bình tĩnh trong khủng hoảng", "Linh hoạt và ứng biến tốt", "Tự lập và hiệu quả"],
    weaknesses: ["Dễ chán và thiếu kiên nhẫn", "Khó cam kết dài hạn", "Đôi khi quá tách biệt về cảm xúc"],
    careers: ["Kỹ sư cơ khí", "Lập trình viên", "Thợ thủ công", "Phi công", "Phẫu thuật viên"],
    famousPeople: ["Clint Eastwood", "Michael Jordan", "Kobe Bryant"],
    color: "#F59E0B",
  },
  ISFP: {
    name: "Adventurer",
    nameVi: "Nhà thám hiểm",
    group: "Explorers",
    tagline: "Flexible and charming artists, always ready to explore something new.",
    description:
      "ISFPs là những nghệ sĩ linh hoạt và quyến rũ, luôn sẵn sàng khám phá điều mới. Họ sống trong hiện tại và yêu thích vẻ đẹp trong cuộc sống hàng ngày.",
    strengths: ["Sáng tạo và nhạy cảm", "Linh hoạt và cởi mở", "Đồng cảm và ấm áp", "Chân thực với bản thân"],
    weaknesses: ["Dễ bị stress", "Khó lập kế hoạch dài hạn", "Tránh xung đột"],
    careers: ["Nghệ sĩ / Thiết kế", "Nhạc sĩ", "Chăm sóc sức khỏe", "Đầu bếp", "Nhiếp ảnh gia"],
    famousPeople: ["Michael Jackson", "Marilyn Monroe", "Britney Spears"],
    color: "#F59E0B",
  },
  ESTP: {
    name: "Entrepreneur",
    nameVi: "Doanh nhân",
    group: "Explorers",
    tagline: "Smart, energetic and very perceptive people, who enjoy living on the edge.",
    description:
      "ESTPs là những người thông minh, năng động và rất nhạy bén, thích sống ở ranh giới. Họ hành động trước, suy nghĩ sau và thích ứng xuất sắc trong mọi tình huống.",
    strengths: ["Nhanh nhẹn và thích nghi tốt", "Năng động và quyết đoán", "Thực tế và kết quả cao", "Sức lôi cuốn tự nhiên"],
    weaknesses: ["Thiếu kiên nhẫn với lý thuyết", "Có thể liều lĩnh", "Khó cam kết"],
    careers: ["Doanh nhân", "Cảnh sát / Cứu hộ", "Bán hàng", "Diễn viên", "Vận động viên"],
    famousPeople: ["Donald Trump", "Madonna", "Ernest Hemingway"],
    color: "#F59E0B",
  },
  ESFP: {
    name: "Entertainer",
    nameVi: "Người giải trí",
    group: "Explorers",
    tagline: "Spontaneous, energetic and enthusiastic – life is never boring around them.",
    description:
      "ESFPs là những người tự phát, năng động và nhiệt tình – cuộc sống không bao giờ nhàm chán khi có họ. Họ yêu thích sự chú ý và mang lại niềm vui cho mọi người.",
    strengths: ["Vui vẻ và truyền năng lượng", "Hòa đồng và quyến rũ", "Thực tế và quan tâm người khác", "Linh hoạt và tự nhiên"],
    weaknesses: ["Dễ phân tâm", "Tránh xung đột và vấn đề khó", "Sống trong hiện tại, ít kế hoạch"],
    careers: ["Diễn viên / Ca sĩ", "Nhân viên sự kiện", "Giáo viên mầm non", "Bán hàng", "Chăm sóc khách hàng"],
    famousPeople: ["Adele", "Jamie Oliver", "Katy Perry"],
    color: "#F59E0B",
  },
};

export const TYPE_CODES = Object.keys(PERSONALITY_DATA);

export const TYPE_SUMMARIES: Record<string, { nameVi: string; group: GroupName }> = Object.fromEntries(
  Object.entries(PERSONALITY_DATA).map(([code, p]) => [code, { nameVi: p.nameVi, group: p.group }]),
);
