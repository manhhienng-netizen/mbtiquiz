/**
 * work-competency-data.ts
 * TNCB Work — Employee Development Module
 *
 * Nguồn tham khảo:
 *   - 16personalities.com/[type]-strengths-and-weaknesses (practitioner knowledge)
 *   - CPP.com — MBTI Manual 3rd & 4th Edition (research-backed)
 *   - Gallup Workplace Research (gallup.com/workplace)
 *   - Google Project Oxygen — rework.withgoogle.com (research-backed)
 *   - SHRM HR research library (shrm.org)
 *   - Harvard Business Review personality at work articles (practitioner synthesis)
 *   - Truity TypeFinder Workplace applications (practitioner knowledge)
 *   - Isabel Myers, "Gifts Differing" (MBTI foundational theory)
 *
 * Ghi chú minh bạch:
 *   [R] = Research-backed (có academic/industry citation)
 *   [P] = Practitioner knowledge (tổng hợp từ chuyên gia HR, coaches)
 *   [S] = Synthesis (kết hợp lý thuyết MBTI + quan sát thực tiễn)
 */

// ============================================================
// PHẦN 1 — MBTI × COMPETENCY GAP MAPPING
// ============================================================

export interface CompetencyMap {
  workplaceBlindSpots: string[]
  competencyGaps: {
    leadership: string[]
    individual: string[]
    collaborative: string[]
  }
  dailyManifestations: string[]
  managerInsights: {
    howToMotivate: string
    howToFeedback: string
    avoidDoing: string
    bestAssignment: string
  }
  developmentPriority: string[]
}

export const MBTI_COMPETENCY_MAP: Record<string, CompetencyMap> = {

  // ─────────────────────────────────────────
  // INTJ — Kiến trúc sư
  // ─────────────────────────────────────────
  INTJ: {
    workplaceBlindSpots: [
      'Bác bỏ ý kiến người khác quá nhanh — đặc biệt khi ý kiến đó thiếu logic hoặc không đủ sâu theo tiêu chuẩn của bạn [P]',
      'Kỳ vọng người khác tự hiểu bối cảnh mà không cần giải thích — cách giao tiếp bị coi là "thiếu kiên nhẫn" [P]',
      'Cầu toàn cản trở thực thi — phân tích quá lâu dẫn đến chậm giao việc hoặc không bao giờ "đủ tốt để ra" [S]',
    ],
    competencyGaps: {
      leadership: ['Stakeholder communication — nói chuyện với người kỹ thuật thấp hơn', 'Empathy trong quản lý — nhận ra emotional need của nhân viên', 'Patience with learning curve — chấp nhận người khác học chậm hơn mình'],
      individual: ['Asking for help sớm thay vì tự giải quyết đến bế tắc', 'Documentation — chia sẻ knowledge thay vì giữ trong đầu', 'Managing up — communicate progress lên cấp trên đúng timing'],
      collaborative: ['Active listening — nghe để hiểu thay vì nghe để phản bác', 'Building on others\' ideas — thay vì replace bằng ý tưởng của mình', 'Giving credit — acknowledge contribution của đồng đội'],
    },
    dailyManifestations: [
      'Hay ngắt lời trong họp để sửa lỗi logic trong lập luận của người khác — dù không phải lúc đó [P]',
      'Email và báo cáo rất chi tiết và chính xác — nhưng đôi khi quá dài và thiếu phần tóm tắt cho sếp [P]',
      'Làm việc hiệu quả một mình — nhưng tiến độ trở nên khó đoán khi phụ thuộc vào người khác [S]',
      'Có xu hướng làm phức tạp hóa giải pháp — giải quyết vấn đề 100% trong khi 80% đã đủ dùng [P]',
    ],
    managerInsights: {
      howToMotivate: 'Giải thích WHY đằng sau mọi task và connect với chiến lược lớn — INTJ cần thấy ý nghĩa trước khi cam kết. Cho họ tự quyết định cách thực hiện, chỉ define outcome. [P]',
      howToFeedback: 'Written first, sau đó 1-1. Dùng data và logic: "Kết quả X, nguyên nhân Y, cải thiện bằng Z." Tránh feedback mơ hồ kiểu "cần cải thiện giao tiếp" — phải cụ thể. [P]',
      avoidDoing: 'Không micromanage quy trình — INTJ sẽ demotivate ngay. Không thay đổi goals giữa chừng mà không giải thích lý do. Không bypass họ trong quyết định liên quan đến lĩnh vực họ phụ trách. [P]',
      bestAssignment: 'Giải quyết vấn đề phức tạp độc lập, nghiên cứu sâu và xây chiến lược, đào sâu kỹ thuật, cải thiện hệ thống từ gốc rễ — không phải việc nặng về quan hệ hay thực thi lặp lại. [S]',
    },
    developmentPriority: [
      'Giao tiếp với các bên liên quan — học cách trình bày cho người không chuyên kỹ thuật',
      'Thấu hiểu cảm xúc trong feedback — nhận ra tác động cảm xúc của lời nói',
      'Ủy quyền và tin tưởng — buông bỏ kiểm soát để nhóm phát triển',
      'Đúng hạn thay vì hoàn hảo — giao việc ở mức 80% thay vì trì hoãn đến 100%',
      'Nhờ giúp đỡ — coi đây là điểm mạnh, không phải điểm yếu',
    ],
  },

  // ─────────────────────────────────────────
  // INTP — Nhà logic học
  // ─────────────────────────────────────────
  INTP: {
    workplaceBlindSpots: [
      'Tê liệt vì phân tích — bị cuốn vào chi tiết nhỏ của vấn đề mà không ra được quyết định [P]',
      'Thiếu theo sát đến cùng — hứng khởi ở giai đoạn khám phá nhưng mất động lực khi phải triển khai chi tiết [S]',
      'Coi thường quy ước và quy trình — phá vỡ quy trình vì thấy không logic, dù đôi khi quy trình đó có lý do [P]',
    ],
    competencyGaps: {
      leadership: ['Decision-making dứt khoát dưới áp lực', 'Inspiring action — từ tầm nhìn đến execution', 'Accountability — hold team đến deadline cụ thể'],
      individual: ['Project completion — đưa việc đến finish line', 'Communicating progress — update stakeholder đều đặn', 'Meeting deadlines — thay vì chờ đến khi "hoàn hảo"'],
      collaborative: ['Meeting participation — contribute vào discussion nhóm thay vì im lặng', 'Ghi nhận ý kiến đúng của người khác bằng lời', 'Reducing jargon — explain phức tạp thành đơn giản'],
    },
    dailyManifestations: [
      'Giỏi nhất ở giai đoạn "vẽ kiến trúc" — có thể mất hứng khi bước vào triển khai thực tế [P]',
      'Câu trả lời thường kèm lưu ý và chi tiết — đôi khi người hỏi chỉ cần có/không [P]',
      'Hoạt động tốt nhất với lịch linh hoạt và không bị làm gián đoạn giữa chừng khi đang làm việc sâu [P]',
    ],
    managerInsights: {
      howToMotivate: 'Đưa ra vấn đề phức tạp và thú vị — INTP cần intellectual challenge. Cho phép họ explore cách tiếp cận mới, không ép theo template có sẵn. Công nhận chất lượng tư duy, không chỉ tốc độ. [P]',
      howToFeedback: '1-1 private. Framing là "problem to solve" thay vì "lỗi cần sửa." Họ phản ứng tốt với logic hơn là appeal to emotion: "Cách này có trade-off X, nếu đổi sang Y thì output sẽ tốt hơn vì Z." [P]',
      avoidDoing: 'Không giao task repetitive mà không có learning element — họ sẽ disengage. Không rush quyết định khi họ cần thêm time để think. Không dismiss idea của họ chỉ vì "không thực tế" mà không giải thích tại sao. [P]',
      bestAssignment: 'Nghiên cứu, thiết kế hệ thống, gỡ lỗi phức tạp, phòng thí nghiệm đổi mới, phân tích dữ liệu sâu — không phải vai trò đối diện khách hàng đòi hỏi nhiều trò chuyện xã giao. [S]',
    },
    developmentPriority: [
      'Kỷ luật hoàn thành — thói quen đưa dự án đến đích',
      'Giao tiếp ngắn gọn — nói ngắn hơn, rõ hơn',
      'Ra quyết định khi chưa chắc chắn — quyết định dù chưa đủ thông tin hoàn hảo',
      'Cam kết deadline — coi deadline là cam kết thật sự',
    ],
  },

  // ─────────────────────────────────────────
  // ENTJ — Chỉ huy
  // ─────────────────────────────────────────
  ENTJ: {
    workplaceBlindSpots: [
      'Chiếm ưu thế trong thảo luận — lấn át ý kiến người khác dù không có ý định [P]',
      'Thiếu kiên nhẫn với người học chậm hoặc cần nhiều hỗ trợ hơn [P]',
      'Đưa ra quyết định quá nhanh mà chưa thu thập đủ ý kiến từ nhóm [S]',
    ],
    competencyGaps: {
      leadership: ['Active listening — nghe để empathize, không nghe để respond', 'Developing others — invest time vào coaching thay vì chỉ directing', 'Emotional intelligence — đọc emotional signals của team'],
      individual: ['Flexibility — điều chỉnh khi plan không hoạt động', 'Thừa nhận sai lầm — công khai nhận lỗi khi mắc sai sót', 'Slowing down — đôi khi cần pause hơn là sprint'],
      collaborative: ['Sharing credit rộng rãi', 'Inviting disagreement — tạo safe space để người khác phản bác', 'Following others\' lead khi họ có expertise cao hơn'],
    },
    dailyManifestations: [
      'Họp thường kết thúc với việc cần làm rõ ràng — nhưng đôi khi nhóm chưa hiểu tại sao [P]',
      'Thúc đẩy thực thi mạnh — nhóm có thể cảm thấy áp lực liên tục [P]',
      'Đổi hướng nhanh theo nhận định mới — nhóm khó theo kịp [S]',
    ],
    managerInsights: {
      howToMotivate: 'Challenge họ với mục tiêu lớn và trao quyền thật sự để đạt được. Kết nối công việc với impact chiến lược của tổ chức. ENTJ cần thấy họ đang tạo ra difference, không chỉ execute. [P]',
      howToFeedback: 'Direct và private. Họ appreciate honest, data-driven feedback. Tập trung vào impact lên team và tổ chức, không phải lên cá nhân. Ví dụ: "Quyết định X đã làm 3 người trong team unclear về direction — lần tới loop thêm họ vào trước khi finalize." [P]',
      avoidDoing: 'Không micromanage — họ sẽ resent ngay. Không thay đổi goal mà không explain rationale. Không dùng politics hay indirect communication — ENTJ muốn thẳng thắn. [P]',
      bestAssignment: 'Dẫn dắt dự án phức tạp, vực dậy khu vực kém hiệu quả, xây nhóm mới từ đầu, lãnh đạo liên phòng ban — không phải vai trò hỗ trợ hay hành chính. [S]',
    },
    developmentPriority: [
      'Thấu cảm và đọc cảm xúc — nhận ra cảm xúc nhóm trước khi nó bùng nổ',
      'Phát triển người khác — kiên nhẫn với tốc độ học của người khác',
      'Lắng nghe trước khi quyết định — thu thập ý kiến trước khi cam kết',
      'Dễ tổn thương — chia sẻ sự không chắc chắn khi cần',
    ],
  },

  // ─────────────────────────────────────────
  // ENTP — Người tranh luận
  // ─────────────────────────────────────────
  ENTP: {
    workplaceBlindSpots: [
      'Bỏ dở dự án khi đã giải xong phần thú vị — giai đoạn thực thi bị bỏ lại [P]',
      'Phản biện quỷ quyết đôi khi cản trở đà tiến — nhóm đã thống nhất nhưng ENTP vẫn nêu phản đối [P]',
      'Đánh giá thấp độ phức tạp triển khai — ý tưởng tốt nhưng ước lượng thời gian/nguồn lực thiếu thực tế [S]',
    ],
    competencyGaps: {
      leadership: ['Đảm bảo team thực hiện sau khi định hướng đã được đặt ra', 'Focus — prioritize trong số nhiều ý tưởng hứng khởi', 'Consistency — maintain direction thay vì pivot liên tục'],
      individual: ['Task completion — đưa đến done, không chỉ đến "gần xong"', 'Documentation — capture insight để người khác có thể follow', 'Reliability — meet deadline dù có idea mới xuất hiện'],
      collaborative: ['Know when to stop debating và execute', 'Acknowledge valid points — không phải mọi argument đều cần counter', 'Support others\' vision không chỉ propose ý tưởng của mình'],
    },
    dailyManifestations: [
      'Brainstorming là điểm mạnh nhất — nhưng thường không ở đó khi cần cày chi tiết [P]',
      'Cuộc trò chuyện đầy ý tưởng và năng lượng — đôi khi phân tán tập trung của nhóm [P]',
      'Thuyết phục tốt — đôi khi thuyết phục cả những thứ chưa chắc đúng [S]',
    ],
    managerInsights: {
      howToMotivate: 'Giao vấn đề mới và phức tạp liên tục. Cho phép họ contribute ở giai đoạn problem definition và ideation — là where they shine. Kết nối họ với innovative projects. [P]',
      howToFeedback: 'Framing là intellectual challenge: "Đây là vấn đề cần giải quyết — cách này có impact X, làm thế nào để fix?" Họ phản ứng tốt với debate hơn directive. [P]',
      avoidDoing: 'Không giao task routine không có learning. Không dismiss ideas mà không engage với logic. Không expect họ thích execution detail — pair với executor type. [P]',
      bestAssignment: 'Đổi mới, chiến lược, phát triển kinh doanh, giải quyết vấn đề liên phòng ban, tư vấn — không phải vận hành chi tiết hay chu kỳ triển khai dài. [S]',
    },
    developmentPriority: [
      'Lắng nghe đến cuối trước khi đưa ra phản hồi',
      'Ưu tiên — chọn ít hơn và làm tốt hơn',
      'Giao hàng đều đặn — giữ deadline như cam kết',
      'Lắng nghe để thực thi — nghe feedback mà không tranh luận',
    ],
  },

  // ─────────────────────────────────────────
  // INFJ — Người ủng hộ
  // ─────────────────────────────────────────
  INFJ: {
    workplaceBlindSpots: [
      'Kiệt sức vì hấp thụ stress của nhóm — không nhận ra ranh giới cảm xúc của mình [S]',
      'Tránh xung đột trực tiếp — để vấn đề tích tụ thay vì xử lý sớm [P]',
      'Cầu toàn về quy trình và mối quan hệ — mất thời gian không cần thiết [P]',
    ],
    competencyGaps: {
      leadership: ['Decisive action dù chưa đạt consensus — khi cần move fast', 'Setting firm boundaries với underperformers', 'Delegating trust — không ôm hết vì sợ người khác không care đủ'],
      individual: ['Self-advocacy — nói lên nhu cầu và boundaries của mình', 'Saying no — từ chối request mà không cảm thấy guilt', 'Giải thích lý do đằng sau quyết định — không chỉ ra lệnh'],
      collaborative: ['Direct disagreement — nói không đồng ý thay vì im lặng hay gián tiếp', 'Tolerating imperfect collaboration — không phải mọi team dynamic đều cần fix', 'Sharing credit cho mình — không chỉ nhường spotlight'],
    },
    dailyManifestations: [
      'Kết quả chất lượng cao — nhưng đôi khi trễ deadline vì suy nghĩ quá nhiều [P]',
      'Nhóm tìm đến để được nghe và hỗ trợ — đôi khi trở thành người lắng nghe không chính thức [P]',
      'Có tầm nhìn sâu sắc — nhưng khó diễn đạt cho đối tượng cần kế hoạch cụ thể [S]',
    ],
    managerInsights: {
      howToMotivate: 'Connect công việc với purpose lớn hơn và impact lên con người. Cho thấy cách contribution của họ tạo ra change thật sự. INFJ cần thấy meaning — không chỉ metric. [P]',
      howToFeedback: 'Private, respectful, framed trong context của development. Acknowledge effort và intention trước khi address gap. Tránh public criticism dù nhỏ. [P]',
      avoidDoing: 'Không để họ absorb team conflict một mình. Không assign vào toxic environment. Không ignore khi họ signal burnout — họ thường không ask for help. [P]',
      bestAssignment: 'Cố vấn, chiến lược liên quan đến con người, xây dựng văn hóa, chương trình cố vấn, viết và truyền thông, nghiên cứu trải nghiệm người dùng — không phải đàm phán xung đột cao hay công việc thuần số liệu. [S]',
    },
    developmentPriority: [
      'Đặt ranh giới — bảo vệ năng lượng để bền vững',
      'Giao tiếp thẳng — nói thẳng thay vì ám chỉ',
      'Hành động quyết đoán — tiến hành khi sẵn sàng 70% thay vì chờ 100%',
      'Tự lên tiếng — nói lên nhu cầu của mình',
    ],
  },

  // ─────────────────────────────────────────
  // INFP — Người hòa giải
  // ─────────────────────────────────────────
  INFP: {
    workplaceBlindSpots: [
      'Lý tưởng hóa nơi làm việc và kỳ vọng người khác chia sẻ cùng giá trị — thất vọng khi thực tế khác [P]',
      'Khó thực hiện việc cảm thấy "vô nghĩa" — ảnh hưởng năng suất khi công việc lặp lại [S]',
      'Tránh xung đột → phình to thành bực bội âm thầm [P]',
    ],
    competencyGaps: {
      leadership: ['Accountability over harmony — hold people đến results dù uncomfortable', 'Prioritizing results thay vì feelings khi cần', 'Setting clear expectations — không để ambiguity để avoid conflict'],
      individual: ['Meeting deadlines consistently — discipline khi không inspired', 'Pragmatic problem-solving — giải pháp 80% vs perfect', 'Handling tedious work với same effort'],
      collaborative: ['Direct feedback — nói thật khi không đồng ý thay vì hint', 'Professional disagreement không bị cảm thấy như personal attack', 'Separating ideas from identity khi bị critique'],
    },
    dailyManifestations: [
      'Sản phẩm sáng tạo rất mạnh khi phù hợp giá trị — yếu khi mất kết nối [P]',
      'Mối quan hệ với đồng đội rất sâu — đôi khi quá dính cảm xúc [P]',
      'Có xu hướng hấp thụ phản hồi tiêu cực — cần thời gian phục hồi sau feedback khó [S]',
    ],
    managerInsights: {
      howToMotivate: 'Connect mọi task với bigger purpose và human impact. Để họ thấy cách công việc của họ affect người thật. Cho autonomy về cách thực hiện, không chỉ what. [P]',
      howToFeedback: 'Extremely gentle và private. Start với genuine positive, sau đó development area như "next growth opportunity." Language: "Tôi thấy potential trong bạn ở đây..." tránh tuyệt đối "bạn đã sai khi..." [P]',
      avoidDoing: 'Không assign vào team hoặc project có toxic dynamic. Không public criticism dù nhỏ. Không force vào competitive environment mà không có collaborative element. [P]',
      bestAssignment: 'Công việc sáng tạo, viết lách, nghiên cứu hướng con người, hỗ trợ cố vấn, vai trò văn hóa — không phải thực thi thuần túy hay bán hàng áp lực cao. [S]',
    },
    developmentPriority: [
      'Đặt câu hỏi để hiểu quan điểm trước khi đưa ra phán xét',
      'Kỹ năng feedback thẳng — nói không đồng ý mà không làm tổn thương',
      'Theo dõi các cam kết và deadline tự đặt ra',
      'Chia sẻ sự ghi nhận công khai với những người đóng góp',
    ],
  },

  // ─────────────────────────────────────────
  // ENFJ — Người dẫn đường
  // ─────────────────────────────────────────
  ENFJ: {
    workplaceBlindSpots: [
      'Bỏ bê nhu cầu bản thân khi chăm sóc mọi người — kiệt sức không báo trước [P]',
      'Lạc quan quá mức về năng lực nhóm và tiến độ — đánh giá thấp thách thức thực tế [S]',
      'Tránh đưa tin khó — muốn mọi người vui → để vấn đề trôi qua [P]',
    ],
    competencyGaps: {
      leadership: ['Difficult conversations — deliver bad news và hold people accountable', 'Objective decision-making khi cần choose between people', 'Setting limits on own availability — tránh become bottleneck'],
      individual: ['Self-care routine — maintain performance mà không sacrifice wellbeing', 'Task focus khi không có social element', 'Managing own stress visibility — không let team absorb anxiety của mình'],
      collaborative: ['Accept help — không phải luôn phải là người support', 'Tolerate conflict as productive — không phải mọi disagreement cần mediate ngay', 'Challenge ideas của người mình care about'],
    },
    dailyManifestations: [
      'Mọi người tin tưởng và mở lòng với ENFJ rất nhanh — rủi ro là trở thành người lắng nghe không chính thức [P]',
      'Điều phối họp rất tốt — nhưng đôi khi tránh đưa xung đột nền lên bề mặt [P]',
      'Trực giác về động lực nhóm — đôi khi hành động theo cảm nhận mà chưa xác minh [S]',
    ],
    managerInsights: {
      howToMotivate: 'Show impact lên con người cụ thể, không chỉ metric. Recognition public là rất meaningful. Kết nối họ với mentoring và development opportunities. [P]',
      howToFeedback: 'Warm và private. Frame trong context of growth và potential. ENFJ có thể internalize deeply — ensure message là "development" không phải "failure." [P]',
      avoidDoing: 'Không để họ absorb team\'s emotional weight một mình. Không assign vào toxic team. Không take for granted sự available của họ. [P]',
      bestAssignment: 'Lãnh đạo nhóm, văn hóa và gắn kết, đào tạo và phát triển, vai trò cố vấn, quản lý thay đổi — không phải phân tích đơn lẻ hay công việc cá nhân cô lập. [S]',
    },
    developmentPriority: [
      'Tạo không gian an toàn để nhóm nêu vấn đề',
      'Kỹ năng hội thoại khó — nói sự thật khó với lòng trắc ẩn',
      'Phân tích khách quan — cân bằng cảm xúc với dữ liệu',
      'Kỷ luật công việc cá nhân — không chỉ quản lý nhóm',
    ],
  },

  // ─────────────────────────────────────────
  // ENFP — Người vận động
  // ─────────────────────────────────────────
  ENFP: {
    workplaceBlindSpots: [
      'Bắt đầu nhiều, hoàn thành ít — hứng khởi ở đầu và cuối, mất hứng giữa chừng [P]',
      'Nhận quá nhiều việc — nói đồng ý quá nhiều vì nhiệt huyết, sau đó vật lộn với sức chứa [P]',
      'Không ổn định — chất lượng kết quả không đều tùy tâm trạng và năng lượng [S]',
    ],
    competencyGaps: {
      leadership: ['Consistent follow-through — ensure team deliver dù leader đã moved to next thing', 'Prioritization — focus team vào ít hơn, tốt hơn', 'Detail management — không miss logistics khi excited về vision'],
      individual: ['Completion habit — discipline đưa đến done', 'Meeting commitments — timeline là commitment, không guideline', 'Phân công dựa trên điểm mạnh — không chỉ theo cơ cấu'],
      collaborative: ['Kiểm tra mức độ hiểu — xác nhận team hiểu đúng trước khi tiến hành', 'Điều chỉnh phong cách giao tiếp theo từng người', 'Consistent reliability — show up khi không inspired'],
    },
    dailyManifestations: [
      'Năng lượng và nhiệt huyết của bạn nâng tinh thần cả nhóm [P]',
      'Xây dựng mối quan hệ rất tự nhiên — mạng lưới rộng là lợi thế thật sự [P]',
      'Kết nối sáng tạo giữa các ý tưởng không liên quan — nguồn đổi mới chân thật [P]',
    ],
    managerInsights: {
      howToMotivate: 'Variety, autonomy, và connection với người. Giao project có social component và creative freedom. Recognition warm và public. Link to mission lớn. [P]',
      howToFeedback: 'Conversational và warm. Framing là "mình có thể làm lớn hơn nữa nếu..." Acknowledge enthusiasm trước. ENFP phản ứng rất tốt với positive vision của potential. [P]',
      avoidDoing: 'Không micromanage process. Không assign vào isolated, repetitive work. Không dùng cold, data-only feedback style. [P]',
      bestAssignment: 'Quan hệ khách hàng, dự án sáng tạo, xây dựng cộng đồng, tạo ý tưởng, thương hiệu và truyền thông — không phải vận hành, tuân thủ hay công việc kỹ thuật sâu một mình. [S]',
    },
    developmentPriority: [
      'Kỷ luật hoàn thành — thói quen làm xong việc đã bắt đầu',
      'Quản lý cam kết — nói không trước khi nhận quá nhiều việc',
      'Tập trung và ưu tiên — ít hơn, tốt hơn',
      'Độ tin cậy đều đặn — xuất hiện khi không có năng lượng cao',
    ],
  },

  // ─────────────────────────────────────────
  // ISTJ — Người hậu cần
  // ─────────────────────────────────────────
  ISTJ: {
    workplaceBlindSpots: [
      'Chống thay đổi dù có bằng chứng thay đổi tốt hơn — "đây là cách mọi khi làm" [P]',
      'Quy trình hơn kết quả đôi khi — làm theo thủ tục ngay cả khi không còn phù hợp [S]',
      'Giao tiếp thiếu chủ động — giả định người khác biết những gì họ cần biết [P]',
    ],
    competencyGaps: {
      leadership: ['Cung cấp phản hồi kịp thời — không để dồn lại', 'Ưu tiên phát triển dài hạn của team hơn kết quả ngắn hạn', 'Duy trì bình tĩnh và rõ ràng trong tình huống áp lực cao'],
      individual: ['Innovation thinking — contribute ideas mới ngoài improvements', 'Proactive communication — update stakeholders trước khi được hỏi', 'Cross-functional collaboration — build relationship ngoài team mình'],
      collaborative: ['Chủ động chia sẻ thông tin team cần — không đợi được hỏi', 'Encouraging others\' initiative thay vì chỉ delegate to follow process', 'Xem xét tác động đến con người khi đưa ra quyết định'],
    },
    dailyManifestations: [
      'Cực kỳ đáng tin cậy — deadline luôn được giữ, cam kết luôn được thực hiện [P]',
      'Ghi chép và quy trình rất chắc chắn — kiến thức tích lũy của tổ chức [P]',
      'Chất lượng ổn định — không có ngày tốt / ngày xấu [P]',
    ],
    managerInsights: {
      howToMotivate: 'Clear expectations và stability. Recognize reliability và thoroughness — đây là điểm mạnh thật sự của họ. Provide adequate time để prepare cho thay đổi. [P]',
      howToFeedback: 'Private, specific, và fact-based. Advance notice tốt hơn surprise. Format là facts → impact → expectation: "Deadline X bị miss, affected team Y, going forward cần Z." [P]',
      avoidDoing: 'Không expect họ comfortable với last-minute changes. Không ignore process concerns họ raise — thường có basis. Không bypass họ trong quyết định trong domain của họ. [P]',
      bestAssignment: 'Vận hành, tuân thủ, đảm bảo chất lượng, tài chính, quản lý dự án, kiểm toán — không phải môi trường sáng tạo mơ hồ hay thử nghiệm nhanh. [S]',
    },
    developmentPriority: [
      'Thích ứng và cởi mở với thay đổi',
      'Giao tiếp chủ động — chia sẻ trước khi được hỏi',
      'Tư duy đổi mới — thêm ý tưởng, không chỉ cải thiện',
      'Xây dựng quan hệ ngoài công việc',
    ],
  },

  // ─────────────────────────────────────────
  // ISFJ — Người bảo vệ
  // ─────────────────────────────────────────
  ISFJ: {
    workplaceBlindSpots: [
      'Chiều quá mức người khác — nói đồng ý khi nên từ chối → kiệt sức [P]',
      'Tránh ánh sáng dù đóng góp nhiều — bị đánh giá thấp so với đóng góc thực tế [S]',
      'Khó thích ứng khi quy trình hay mối quan hệ thay đổi đột ngột [P]',
    ],
    competencyGaps: {
      leadership: ['Assertiveness — advocate rõ ràng cho team và resources cần', 'Delegating và trusting — không phải ôm hết để ensure quality', 'Navigating organizational politics — đứng ra khi cần'],
      individual: ['Self-advocacy — communicate achievements của mình', 'Đặt kỳ vọng rõ ràng và thực tế ngay từ đầu', 'Taking initiative — đề xuất thay vì chờ được giao'],
      collaborative: ['Sharing opinions directly khi có conflicts với expectations', 'Accepting help gracefully', 'Expressing disagreement early thay vì comply và resent later'],
    },
    dailyManifestations: [
      'Phục vụ nhóm rất cao — nhưng hiếm khi được ghi nhận vì không tự quảng bá [P]',
      'Trí nhớ bối cảnh xuất sắc — nhớ ngữ cảnh, tiền lệ, mối quan hệ [P]',
      'Hỗ trợ đáng tin cậy — mọi người phụ thuộc vào họ nhiều [P]',
    ],
    managerInsights: {
      howToMotivate: 'Recognize specific contributions explicitly và regularly — ISFJ thường không ask nhưng cần. Connect to impact lên team và people. Provide stability và predictability. [P]',
      howToFeedback: 'Very private và gentle. Acknowledge care và effort genuinely trước. Frame gap như additional growth area, không như deficit. Avoid any public criticism. [P]',
      avoidDoing: 'Không take for granted — nghĩ rằng reliability là default nên không cần thank. Không assign vào chaotic environment liên tục. Không ignore khi họ struggle — họ thường không ask. [P]',
      bestAssignment: 'Chăm sóc khách hàng, hỗ trợ nhân sự, kiểm soát chất lượng, quản lý hành chính, y tế, giáo dục — không phải đàm phán căng thẳng hay sáng tạo mơ hồ. [S]',
    },
    developmentPriority: [
      'Tự lên tiếng và sự hiện diện của đóng góp',
      'Ghi nhận nỗ lực — không chỉ kết quả',
      'Chủ động hành động — chủ động thay vì chờ được giao',
      'Quyết đoán khi bất đồng',
    ],
  },

  // ─────────────────────────────────────────
  // ESTJ — Người quản lý
  // ─────────────────────────────────────────
  ESTJ: {
    workplaceBlindSpots: [
      'Cứng nhắc với quy trình khi tình huống cần ngoại lệ — "luật là luật" [P]',
      'Bác bỏ lo ngại cảm xúc như "không liên quan" — bỏ lỡ tín hiệu quan trọng [S]',
      'Quản lý vi mô khi không tin tưởng nhóm — cản trở sự tự chủ của nhóm [P]',
    ],
    competencyGaps: {
      leadership: ['Empathy leadership — understand emotional needs của team', 'Coaching vs directing — develop, không chỉ assign', 'Đặt câu hỏi để giúp team tự tìm ra giải pháp'],
      individual: ['Duy trì nhất quán giữa lời nói và hành động', 'Cởi mở đón nhận phản hồi về phong cách lãnh đạo của bản thân', 'Flexibility khi plan không work'],
      collaborative: ['Encouraging dissent an toàn', 'Listening to understand, không chỉ evaluate', 'Valuing process của people khác dù khác mình'],
    },
    dailyManifestations: [
      'Họp có chương trình và việc cần làm — thực thi rất hiệu quả [P]',
      'Tiêu chuẩn cao, duy trì đều — nâng chuẩn của nhóm [P]',
      'Tổ chức chắc chắn — nhóm biết rõ kỳ vọng [P]',
    ],
    managerInsights: {
      howToMotivate: 'Clear goals, metrics, và responsibility. Recognize khi họ execute well. Respect their expertise và give authority tương ứng với accountability. [P]',
      howToFeedback: 'Direct, fact-based, với clear expectations going forward. ESTJ appreciate "what happened, why it matters, what to do differently" không embellishment. [P]',
      avoidDoing: 'Không move goalposts không explain. Không undermine authority của họ trong public. Không expect họ prioritize feelings over results một cách tự nhiên — phải develop deliberately. [P]',
      bestAssignment: 'Lãnh đạo vận hành, quản lý dự án, tuân thủ, hệ thống chất lượng, tái cơ cấu tổ chức — không phải môi trường sáng tạo mơ hồ hay bất định cao. [S]',
    },
    developmentPriority: [
      'Trí tuệ cảm xúc — đọc và phản hồi cảm xúc nhóm',
      'Kỷ luật huấn luyện — phát triển người, không chỉ chỉ đạo',
      'Linh hoạt với ngoại lệ — biết khi nào nới quy tắc',
      'Dung nhận thử nghiệm — tạo không gian thử nghiệm',
    ],
  },

  // ─────────────────────────────────────────
  // ESFJ — Người chăm sóc
  // ─────────────────────────────────────────
  ESFJ: {
    workplaceBlindSpots: [
      'Cần được duyệt trước khi hành động độc lập — chậm lại khi cần sự ủng hộ rõ ràng [P]',
      'Tránh sự thật khó để giữ hòa khí — vấn đề không được xử lý [S]',
      'Nhận phản hồi mang tính cá nhân dù nó về công việc, không phải con người [P]',
    ],
    competencyGaps: {
      leadership: ['Difficult decision making khi ảnh hưởng đến people they care about', 'Performance management — hold people accountable dù uncomfortable', 'Xử lý xung đột trực tiếp và kịp thời'],
      individual: ['Hỗ trợ phát triển kỹ năng qua cơ hội thực tế', 'Independent judgment — quyết định mà không need consensus', 'Managing self-criticism productively'],
      collaborative: ['Direct disagreement — nói thẳng khi không đồng ý', 'Duy trì tư duy tích cực khi đối mặt với trở ngại', 'Ghi nhận đóng góp cá nhân trong bối cảnh công việc nhóm'],
    },
    dailyManifestations: [
      'Keo dán xã hội của nhóm — giữ mối quan hệ bền và giao tiếp trôi chảy [P]',
      'Phản hồi nhanh và sẵn sàng giúp — người đầu tiên tình nguyện khi nhóm cần [P]',
      'Tạo môi trường chào đón — mọi người cảm thấy được bao gồm [P]',
    ],
    managerInsights: {
      howToMotivate: 'Recognition warm và public, connected to team impact. Show how work contributes to team wellbeing. Include trong decisions ảnh hưởng đến team culture. [P]',
      howToFeedback: 'Warm, private, with clear positive framing. Emphasize growth và future potential. Language: "Mình thấy bạn rất care về team — đây là cách leverage điều đó tốt hơn." [P]',
      avoidDoing: 'Không public criticism bao giờ. Không exclude khỏi social aspects của team. Không leave them feel unappreciated — impact lớn hơn với type này. [P]',
      bestAssignment: 'Nhân sự, lãnh đạo chăm sóc khách hàng, điều phối nhóm, sự kiện và văn hóa, quản lý cộng đồng — không phải phân tích cá nhân hay đàm phán xung đột cao. [S]',
    },
    developmentPriority: [
      'Tạo điều kiện để mọi người đóng góp trong cuộc họp',
      'Khả năng feedback thẳng — nói khó khi cần',
      'Phán đoán độc lập — hành động mà không cần đồng thuận đầy đủ',
      'Tách hòa khí khỏi hiệu quả',
    ],
  },

  // ─────────────────────────────────────────
  // ISTP — Thợ thủ công
  // ─────────────────────────────────────────
  ISTP: {
    workplaceBlindSpots: [
      'Giao tiếp tiến độ thiếu chủ động — giả định người khác biết mình đang làm gì [P]',
      'Chống cam kết với kế hoạch — thích linh hoạt đến mức có vẻ không đáng tin [S]',
      'Mất hứng khi việc trở nên lặp lại — hiệu suất giảm [P]',
    ],
    competencyGaps: {
      leadership: ['Proactive communication — update team trước khi được hỏi', 'Inspiring và motivating — move beyond task assignment', 'Theo dõi tiến độ và điều chỉnh kế hoạch khi cần'],
      individual: ['Documentation — capture knowledge để scalable', 'Xây dựng mối quan hệ tin tưởng qua các tương tác nhỏ hàng ngày', 'Truyền đạt tầm nhìn rõ ràng, kết nối với mục tiêu của từng người'],
      collaborative: ['Verbalizing thought process — đừng just deliver solution', 'Social participation khi không task-related', 'Patience với discussion-heavy environments'],
    },
    dailyManifestations: [
      'Giải quyết vấn đề thực tế rất mạnh — sửa những thứ người khác không sửa được [P]',
      'Bình tĩnh trong khủng hoảng — không hoảng loạn, chỉ giải quyết [P]',
      'Hiệu quả trực tiếp bắt tay làm — giỏi làm hơn mô tả [P]',
    ],
    managerInsights: {
      howToMotivate: 'Concrete problems và freedom để solve chúng theo cách mình thấy fit. Minimize meetings không necessary. Recognize khi họ solve difficult technical problem. [P]',
      howToFeedback: 'Brief, direct, factual. No extended discussion về feelings. Format: "Behavior X, impact Y, expectation Z." Respect their time. [P]',
      avoidDoing: 'Không drown them trong meetings. Không require detailed planning documentation khi họ prefer jumping in. Không ignore khi họ raise practical concerns. [P]',
      bestAssignment: 'Giải quyết vấn đề kỹ thuật, gỡ sự cố trực tiếp, công việc hiện trường, kỹ thuật, tạo mẫu nhanh — không phải họp dài, chính trị hay tải hành chính. [S]',
    },
    developmentPriority: [
      'Thói quen giao tiếp chủ động',
      'Kỷ luật ghi chép',
      'Góc nhìn lập kế hoạch dài hạn',
      'Tìm kiếm góc nhìn đa dạng trước khi đưa ra quyết định quan trọng',
    ],
  },

  // ─────────────────────────────────────────
  // ISFP — Người phiêu lưu
  // ─────────────────────────────────────────
  ISFP: {
    workplaceBlindSpots: [
      'Đóng góp ít được nhìn thấy — không truyền đạt thành tích, có vẻ vô hình [P]',
      'Tránh xung đột dù cần đứng lên vì mối quan ngại hợp lý [P]',
      'Nhạy cảm với phản hồi — có thể rút lui hoặc mất hứng sau feedback tiêu cực [S]',
    ],
    competencyGaps: {
      leadership: ['Visibility — be seen and heard, không chỉ contributing quietly', 'Assertiveness khi team cần direction', 'Tập trung vào giải pháp thay vì đổ lỗi khi gặp vấn đề'],
      individual: ['Proactive communication — share progress, không chỉ chờ được hỏi', 'Structure và deadline ownership', 'Lên kế hoạch kế nhiệm — chuẩn bị người thay thế khi cần'],
      collaborative: ['Cân bằng nhu cầu cá nhân với mục tiêu chung của team', 'Tạo cơ hội cho thành viên mới thể hiện', 'Duy trì ranh giới lành mạnh trong môi trường làm việc'],
    },
    dailyManifestations: [
      'Chất lượng sáng tạo rất cao khi trong môi trường phù hợp [P]',
      'Hỗ trợ và không phán xét — đồng đội tìm đến khi cần động viên [P]',
      'Đạo đức làm việc vững — đáng tin khi môi trường lành mạnh [P]',
    ],
    managerInsights: {
      howToMotivate: 'Appreciate work genuinely và specifically. Creative freedom trong task. Positive và stable environment. Link to values và real-world impact. [P]',
      howToFeedback: 'Very gentle, always private, start với genuine strengths. Frame như "here\'s how your talent can go further." Never in public. Allow time to process. [P]',
      avoidDoing: 'Không assign vào high-conflict environment. Không ignore emotional signals. Không forget to recognize consistently — they notice absence of appreciation. [P]',
      bestAssignment: 'Thiết kế, thủ công, công việc gần nghệ thuật, chăm sóc khách hàng, vai trò hỗ trợ trị liệu, sở hữu dự án cá nhân — không phải đàm phán xung đột hay vận động công khai. [S]',
    },
    developmentPriority: [
      'Tự lên tiếng và sự hiện diện',
      'Giao tiếp thẳng về mối quan ngại và ý tưởng',
      'Đặt câu hỏi chiến lược hơn là chỉ tập trung vào chi tiết',
      'Khả năng phục hồi trước phản hồi khó',
    ],
  },

  // ─────────────────────────────────────────
  // ESTP — Người khởi xướng
  // ─────────────────────────────────────────
  ESTP: {
    workplaceBlindSpots: [
      'Hành động trước khi lập kế hoạch đủ — tạo vấn đề làm chậm sau này [P]',
      'Chán nhanh với bảo trì dài hạn — nhảy sang việc thú vị tiếp theo [S]',
      'Có thể quá thẳng — thẳng thắn tốt nhưng đôi khi thiếu tinh tế [P]',
    ],
    competencyGaps: {
      leadership: ['Hỗ trợ thành viên team vượt qua thử thách cá nhân', 'Consistent presence — không chỉ khi crisis', 'Developing others systematically'],
      individual: ['Documentation và handoff quality', 'Tổ chức thông tin rõ ràng để team dễ tiếp cận', 'Risk assessment trước khi act'],
      collaborative: ['Slow down để gather input', 'Biết khi nào cần ra quyết định và khi nào cần tham khảo thêm', 'Build consensus, không chỉ move fast'],
    },
    dailyManifestations: [
      'Năng lượng và định hướng hành động giúp nhóm thoát bế tắc [P]',
      'Tương tác khách hàng rất mạnh [P]',
      'Quản lý khủng hoảng bình tĩnh và hiệu quả [P]',
    ],
    managerInsights: {
      howToMotivate: 'Action-oriented challenges với real stakes. Visible results và recognition. Freedom từ excessive bureaucracy. Competition là fuel. [P]',
      howToFeedback: 'Direct, brief, với clear expectation. ESTP respect honesty và không need softening. Focus on what to do differently, không deep feeling discussion. [P]',
      avoidDoing: 'Không assign vào slow-moving, process-heavy environments. Không drown trong meetings không có action. Không ignore practical expertise họ bring. [P]',
      bestAssignment: 'Bán hàng, phát triển kinh doanh, ứng phó khủng hoảng, công việc hiện trường, đàm phán, vận hành nhịp nhanh — không phải chu kỳ nghiên cứu dài hay tuân thủ chi tiết. [S]',
    },
    developmentPriority: [
      'Kỷ luật lập kế hoạch chiến lược',
      'Lắng nghe trước khi hành động',
      'Truyền cảm hứng qua câu chuyện thay vì chỉ đưa ra số liệu',
      'Thói quen đánh giá rủi ro',
    ],
  },

  // ─────────────────────────────────────────
  // ESFP — Người biểu diễn
  // ─────────────────────────────────────────
  ESFP: {
    workplaceBlindSpots: [
      'Ưu tiên vui và gắn kết hơn hiệu quả — tiến độ bị ảnh hưởng [P]',
      'Tránh việc khó chịu nhưng cần thiết — hội thoại khó bị trì hoãn [S]',
      'Bị phân tán bởi cơ hội xã giao — khó duy trì tập trung [P]',
    ],
    competencyGaps: {
      leadership: ['Xây dựng văn hóa học hỏi từ thất bại', 'Difficult decisions ảnh hưởng đến people they like', 'Điều chỉnh kỳ vọng thực tế khi môi trường thay đổi'],
      individual: ['Task completion discipline — không phải chỉ start', 'Tạo điều kiện để team tự chủ và ra quyết định', 'Documentation và planning'],
      collaborative: ['Nhận ra và xử lý tình trạng kiệt sức trong team', 'Tolerating tension mà không rush to resolve prematurely', 'Following through on commitment khi không energized'],
    },
    dailyManifestations: [
      'Tinh thần nhóm rất tốt khi bạn có mặt — năng lượng tích cực lan tỏa [P]',
      'Mối quan hệ khách hàng mạnh [P]',
      'Giúp đỡ thực tế trực tiếp — người đầu tiên nhảy vào [P]',
    ],
    managerInsights: {
      howToMotivate: 'Excitement, variety, và social connection trong work. Public recognition warm. Link to tangible real-world impact. Freedom trong approach. [P]',
      howToFeedback: 'Warm, public recognition often. Private feedback khi cần, framed positively. Short, clear, không lecture. Connect tới future positive outcome. [P]',
      avoidDoing: 'Không isolate vào solo work environment. Không assign long repetitive tasks không variety. Không be consistently critical — họ need positivity to function best. [P]',
      bestAssignment: 'Sự kiện, đối diện khách hàng, điều phối đào tạo, mạng xã hội, đại sứ thương hiệu, gắn kết nhóm — không phải phân tích, tuân thủ hay công việc cá nhân cô lập. [S]',
    },
    developmentPriority: [
      'Trách nhiệm hoàn thành công việc',
      'Kỹ năng hội thoại khó',
      'Cân bằng giữa kết quả ngắn hạn và phát triển dài hạn',
      'Thói quen lập kế hoạch và ghi chép',
    ],
  },

  // ─────────────────────────────────────────
  // ENTJ (đã trên) + ENTP (đã trên) → tiếp ESTJ (đã trên) + ...
  // Remaining 2: INTJ (done), INTP (done)

  // Đã cover đủ 16 type — kiểm tra:
  // I: INTJ INTP INFJ INFP ISTJ ISFJ ISTP ISFP ✓
  // E: ENTJ ENTP ENFJ ENFP ESTJ ESFJ ESTP ESFP ✓
}

// ============================================================
// PHẦN 2 — MANAGER COACHING GUIDE
// ============================================================

export interface ManagerCoachingGuide {
  overview: string
  howToMotivate: string[]
  feedbackStyle: {
    bestTiming: string
    bestFormat: string
    language: string
    example: string
  }
  avoidDoing: string[]
  bestAssignments: string[]
  stressSignals: string[]
  coachingQuestions: string[]
}

export const MANAGER_COACHING_GUIDE: Record<string, ManagerCoachingGuide> = {

  INTJ: {
    overview: 'INTJ cần quyền tự chủ và đủ bối cảnh để hoạt động tốt nhất. Họ làm việc hiệu quả nhất khi hiểu WHY đằng sau mọi task và được trao quyền tự quyết cách thực hiện. Quản lý vi mô là cách nhanh nhất để mất đi năng lực của một INTJ. [P]',
    howToMotivate: [
      'Giải thích mục tiêu chiến lược và kết nối task với bức tranh lớn — họ cần thấy ý nghĩa',
      'Trao quyền tự quyết về cách thực hiện, chỉ define outcome rõ ràng',
      'Công nhận chất lượng tư duy và sự chuẩn bị kỹ lưỡng của họ',
    ],
    feedbackStyle: {
      bestTiming: 'Sau khi họ đã có thời gian xử lý — không ngay sau sự kiện, cho 24-48h để digest',
      bestFormat: 'Written summary trước (để họ prepare), sau đó 1-1 private để discuss',
      language: 'Data và logic thuần túy: "Kết quả X, nguyên nhân khả năng là Y, improvement path là Z"',
      example: '"Presentation tuần rồi mất audience ở phút 10 — data đúng nhưng thiếu so-what cho level VP. Lần tới thêm slide executive summary đầu."',
    },
    avoidDoing: [
      'Micromanage process — chỉ check kết quả, không check quy trình mỗi ngày',
      'Thay đổi goal hoặc priority mà không giải thích rationale cụ thể',
      'Giao task mà không explain tại sao task đó quan trọng với strategy',
    ],
    bestAssignments: [
      'Giải quyết vấn đề phức tạp đòi hỏi nghiên cứu sâu và tự ra quyết định',
      'Chiến lược và kiến trúc của hệ thống hay quy trình',
      'Kiểm tra và cải thiện những gì đang có từ gốc rễ',
    ],
    stressSignals: [
      'Trở nên increasingly critical và dismissive với mọi người xung quanh [P]',
      'Withdraw khỏi team discussion — meetings ít contribute hơn bình thường [P]',
      'Perfectionism tăng lên — deadline bị ảnh hưởng vì không thể "đủ tốt" [P]',
    ],
    coachingQuestions: [
      '"Phần nào của project này bạn tự tin nhất? Phần nào cần thêm support?"',
      '"Nếu được chọn approach khác, bạn sẽ làm gì khác và tại sao?"',
      '"Bạn đang thấy bottleneck nào mà team chưa thấy?"',
      '"Điều gì đang prevent bạn khỏi deliver faster?"',
      '"Bạn cần gì từ tôi để làm tốt nhất trong role này?"',
    ],
  },

  INTP: {
    overview: 'INTP cần tự do trí tuệ và ghét bị giục. Họ suy nghĩ rất sâu về vấn đề và kết quả thường chất lượng cao — nhưng cần hỗ trợ về kỷ luật thực thi và giao tiếp đều đặn. [P]',
    howToMotivate: [
      'Đặt ra vấn đề phức tạp và thú vị để giải quyết — intellectual challenge là fuel',
      'Cho phép thời gian đủ để explore trước khi deliver',
      'Recognize depth of thinking, không chỉ speed of output',
    ],
    feedbackStyle: {
      bestTiming: 'Sau khi họ đã có thời gian suy nghĩ — không under pressure hay emotional moment',
      bestFormat: '1-1 private, format conversational như problem-solving discussion',
      language: 'Logic và systems: "Approach này có trade-off X — nếu optimize cho Y thì Z sẽ xảy ra"',
      example: '"Code này elegant về design nhưng team khó maintain vì thiếu comment — mình cần thêm documentation layer."',
    },
    avoidDoing: [
      'Rush quyết định khi họ đang trong process thinking',
      'Assign repetitive execution task không có learning element',
      'Dismiss complex ideas với "không thực tế" mà không engage với logic',
    ],
    bestAssignments: [
      'Nghiên cứu và phân tích sâu',
      'Thiết kế hệ thống và kiến trúc',
      'Tìm nguyên nhân gốc — gỡ lỗi khó',
    ],
    stressSignals: [
      'Trở nên overly analytical và indecisive — loop trong thinking [P]',
      'Withdrawal và ít communicate hơn bình thường [P]',
      'Cynicism về project hoặc organization direction [P]',
    ],
    coachingQuestions: [
      '"Theo bạn, vấn đề core ở đây là gì — bỏ qua symptoms?"',
      '"Điều gì cản trở bạn khỏi ship cái này?"',
      '"Phần nào bạn muốn explore thêm nếu có thêm time?"',
      '"Bạn cần thông tin gì để comfortable hơn với decision này?"',
    ],
  },

  ENTJ: {
    overview: 'ENTJ thúc đẩy kết quả và lãnh đạo tự nhiên — nhưng cần huấn luyện để phát triển thấu cảm và kiên nhẫn với người khác. Họ hiệu quả nhất khi được trao quyền tương ứng với trách nhiệm và có mục tiêu rõ ràng. [P]',
    howToMotivate: [
      'Challenge với ambitious goals và give real authority để đạt được',
      'Connect với organizational strategy và leadership visibility',
      'Recognize achievement publicly và tangibly',
    ],
    feedbackStyle: {
      bestTiming: 'Sớm và thường xuyên — ENTJ muốn biết ngay để course-correct',
      bestFormat: '1-1 private, direct conversation không cần extensive setup',
      language: 'Impact-focused và direct: "Decision X ảnh hưởng team theo cách Y — đây là expectation going forward"',
      example: '"Meeting của bạn productive nhưng 3 người feel họ không có space để speak up — lần tới thêm explicit invitation cho input."',
    },
    avoidDoing: [
      'Micromanage — cách nhanh nhất để mất ENTJ',
      'Be indirect hoặc political thay vì thẳng thắn',
      'Give authority mà không có real accountability đi kèm',
    ],
    bestAssignments: [
      'Xây dựng hệ thống phản hồi đa chiều hiệu quả',
      'Xây dựng và vực dậy đội nhóm',
      'Phát triển kinh doanh và chiến lược tăng trưởng',
    ],
    stressSignals: [
      'Increasingly domineering trong meetings — cut off người khác [P]',
      'Decisions speed up không sustainably — quality drops [P]',
      'Dismissive ngắn gọn với team members [P]',
    ],
    coachingQuestions: [
      '"Ai trong team cần thêm development support từ bạn?"',
      '"Quyết định nào gần đây bạn muốn revisit nếu có thể?"',
      '"Bạn đang nhận feedback từ team theo cách nào?"',
      '"Điều gì bạn đang học được từ project này về leadership?"',
      '"Ai trong team phản đối bạn nhiều nhất — và họ có điểm gì đúng?"',
    ],
  },

  ENTP: {
    overview: 'ENTP mang đổi mới và năng lượng nhưng cần cơ cấu trách nhiệm để kênh hóa chúng. Họ cần thử thách liên tục để giữ hứng thú và hưởng lợi khi được ghép với người thực thi mạnh. [P]',
    howToMotivate: [
      'Giao vấn đề mới và phức tạp thường xuyên',
      'Include trong strategic discussion và ideation sessions',
      'Create competitive element khi phù hợp — họ thích winning',
    ],
    feedbackStyle: {
      bestTiming: 'Conversational và frequent — không formal performance review lần đầu',
      bestFormat: 'Debate-style discussion — present reasoning, invite counter-argument',
      language: 'Challenge-based: "Approach này có limitation X — làm thế nào bạn sẽ address?"',
      example: '"Idea này strong nhưng timeline estimate thiếu 40% — mình cần bạn defend số đó hoặc revise."',
    },
    avoidDoing: [
      'Assign repetitive execution mà không novel challenge',
      'Dismiss ideas mà không engage với logic của chúng',
      'Expect sustained focus mà không variety',
    ],
    bestAssignments: [
      'Đổi mới và khám phá sản phẩm mới',
      'Phát triển kinh doanh',
      'Giải quyết vấn đề phức tạp liên phòng ban',
    ],
    stressSignals: [
      'Debate everything — kể cả thứ đã decided [P]',
      'Bắt đầu nhiều initiatives cùng lúc, không cái nào finish [P]',
      'Sarcasm và cynicism tăng [P]',
    ],
    coachingQuestions: [
      '"Trong 5 ideas bạn có tuần này, bạn sẽ bet vào cái nào — và tại sao?"',
      '"Bạn cần gì để ship cái bạn đã bắt đầu?"',
      '"Ai là người bạn cần convince để idea này work?"',
      '"Limitation lớn nhất của approach bạn đang propose là gì?"',
    ],
  },

  INFJ: {
    overview: 'INFJ mang góc nhìn sâu và sự quan tâm chân thật — nhưng cần được bảo vệ khỏi kiệt sức và huấn luyện về đặt ranh giới. Họ làm việc tốt nhất trong môi trường có sự an toàn tâm lý cao. [P]',
    howToMotivate: [
      'Connect công việc với mission lớn hơn và human impact cụ thể',
      'Give autonomy về cách và thời gian thực hiện',
      'Check in về wellbeing genuinely — họ thường không ask for help',
    ],
    feedbackStyle: {
      bestTiming: 'Sau khi họ đã settled — không trong peak stress moment',
      bestFormat: 'Private, warm, conversational — không formal review feel',
      language: 'Growth-and-potential framing: "Đây là điều tôi thấy bạn làm tốt, đây là cơ hội tiếp theo"',
      example: '"Report của bạn rất sâu về analysis — thêm executive summary 3 bullet sẽ giúp nó reach broader audience."',
    },
    avoidDoing: [
      'Public criticism dù nhỏ',
      'Assign vào toxic team dynamics kéo dài',
      'Ignore khi họ signal burnout — họ thường không speak up sớm',
    ],
    bestAssignments: [
      'Chiến lược liên quan đến con người và tác động văn hóa',
      'Thiết kế chương trình cố vấn và huấn luyện',
      'Nghiên cứu và viết lách chất lượng cao',
    ],
    stressSignals: [
      'Withdrawal và increasingly quiet trong meetings [P]',
      'Physical fatigue signals — unusually tired [P]',
      'Perfectionism extreme — nothing ever feels good enough [P]',
    ],
    coachingQuestions: [
      '"Bạn đang cảm thấy thế nào về workload hiện tại?"',
      '"Điều gì trong project này đang drain energy của bạn nhất?"',
      '"Nếu bạn có thể change một điều về cách team work, đó là gì?"',
      '"Bạn cần gì từ tôi để feel supported trong month tới?"',
    ],
  },

  INFP: {
    overview: 'INFP cần công việc có ý nghĩa và sự an toàn để thực sự đóng góp. Họ có chiều sâu sáng tạo và thấu cảm thật sự quý giá — cần môi trường giúp họ phát triển thay vì chỉ tồn tại. [P]',
    howToMotivate: [
      'Make visible cách công việc của họ impact real people',
      'Cho creative freedom và autonomy về approach',
      'Khuyến khích sự đổi mới trong giới hạn an toàn',
    ],
    feedbackStyle: {
      bestTiming: 'Khi họ calm và không vừa trải qua stressful moment',
      bestFormat: 'Very gentle, private, với strong positive framing trước',
      language: '"Next growth area" thay vì "problem." Focus on potential: "Tôi thấy bạn có thể..."',
      example: '"Idea của bạn về X rất creative — để bring nó vào practice mình cần thêm timeline cụ thể hơn."',
    },
    avoidDoing: [
      'Public criticism bất kỳ size nào',
      'Assign vào competitive hoặc toxic environment',
      'Give feedback mang tính judgmental về con người',
    ],
    bestAssignments: [
      'Dự án sáng tạo với mục đích rõ ràng',
      'Nghiên cứu hướng con người',
      'Viết lách và nội dung với giọng văn thật của mình',
    ],
    stressSignals: [
      'Increased withdrawal và silence [P]',
      'Emotional reactions stronger than usual [P]',
      'Quality của work drops khi disconnected từ meaning [P]',
    ],
    coachingQuestions: [
      '"Phần nào của công việc này bạn thấy meaningful nhất?"',
      '"Có điều gì đang block bạn khỏi best work không?"',
      '"Bạn cần môi trường như thế nào để làm việc tốt nhất?"',
      '"Bạn thấy gì về khách hàng của chúng ta mà mọi người khác chưa thấy?"',
    ],
  },

  ENFJ: {
    overview: 'ENFJ là nhà lãnh đạo nhóm và người mang văn hóa tự nhiên — nhưng cần hỗ trợ để bền vững. Quản lý phải đảm bảo họ không gánh cảm xúc của cả nhóm một mình. [P]',
    howToMotivate: [
      'Connect tới mission và development của người khác',
      'Public recognition warm và specific',
      'Involve trong mentoring và people development decisions',
    ],
    feedbackStyle: {
      bestTiming: 'Regular, không chờ formal review — họ benefit từ ongoing check-in',
      bestFormat: 'Warm 1-1, conversational, với clear appreciation lead',
      language: 'Future-focus: "Đây là cách talent của bạn có thể có impact lớn hơn..."',
      example: '"Bạn facilitate rất tốt — lần tới thử cố ý pause để hear từ người ít nói hơn trong team."',
    },
    avoidDoing: [
      'Duy trì sự minh bạch về ưu tiên và lý do thay đổi',
      'Assign emotionally heavy work mà không check-in về wellbeing',
      'Ignore khi họ struggle — họ tend to hide personal difficulty',
    ],
    bestAssignments: [
      'Lãnh đạo nhóm và phát triển con người',
      'Quản lý thay đổi có yếu tố con người',
      'Sáng kiến văn hóa và gắn kết',
    ],
    stressSignals: [
      'Smile stays nhưng energy drops — "fine" khi không really fine [P]',
      'Increasingly focused on others\' problems, ignoring own [P]',
      'Small mistakes tăng — overloaded processing [P]',
    ],
    coachingQuestions: [
      '"Bạn đang support ai trong team hiện tại — ai đang support bạn?"',
      '"Điều gì bạn cần để feel fully supported trong role này?"',
      '"Lần cuối bạn prioritize bản thân trước team là khi nào?"',
      '"Conversation khó nhất bạn đang avoid với ai?"',
    ],
  },

  ENFP: {
    overview: 'ENFP mang năng lượng lan tỏa và kết nối sáng tạo — cần cơ cấu và đối tác trách nhiệm để khơi đúng thế mạnh. Họ làm việc tốt nhất khi có mục tiêu rõ, check-in đều đặn và đủ đa dạng để giữ hứng thú. [P]',
    howToMotivate: [
      'Variety, people connection, và creative freedom trong work',
      'Public recognition warm và enthusiastic',
      'Link công việc tới mission và larger impact',
    ],
    feedbackStyle: {
      bestTiming: 'Regular informal check-ins — không chờ formal review',
      bestFormat: 'Conversational, energetic, với clear positive foundation',
      language: 'Potential-focused: "Mình excited về cái này — để làm lớn hơn nữa thì cần..."',
      example: '"Presentation đó có những insight brilliant — mình cần bạn thêm data backup cho 3 claim chính."',
    },
    avoidDoing: [
      'Micromanage process',
      'Assign vào isolated, routine work kéo dài',
      'Use cold, analytical feedback style không có warmth',
    ],
    bestAssignments: [
      'Quan hệ khách hàng và phát triển kinh doanh',
      'Dự án sáng tạo có yếu tố xã hội',
      'Xây dựng cộng đồng và văn hóa',
    ],
    stressSignals: [
      'Energy drops noticeably — unusual quietness [P]',
      'Over-commit dramatically tăng — coping mechanism [P]',
      'Creative output quality drops significantly [P]',
    ],
    coachingQuestions: [
      '"Trong tất cả thứ đang có trên plate, cái nào bạn most excited về?"',
      '"Cái gì đang prevent bạn khỏi finish những gì đã bắt đầu?"',
      '"Bạn cần gì để reliable hơn với deadline?"',
      '"Ai là người bạn muốn work với nhất trong company — tại sao?"',
    ],
  },

  ISTJ: {
    overview: 'ISTJ là nền tảng của sự đáng tin cậy và kiến thức tích lũy. Quản lý cần đảm bảo họ được ghi nhận đúng mức và được chuẩn bị kỹ cho thay đổi thay vì bị bất ngờ. [P]',
    howToMotivate: [
      'Clear expectations, stable environment, và recognition cho reliability',
      'Explain rationale cho change trước khi implement',
      'Respect expertise và experience của họ',
    ],
    feedbackStyle: {
      bestTiming: 'Scheduled và advance notice — không surprise feedback session',
      bestFormat: 'Formal 1-1, structured, với written notes để reference',
      language: 'Facts và evidence: "Behavior X, frequency Y, impact Z, expectation going forward là W"',
      example: '"3 reports tháng qua deliver muộn 2+ ngày — ảnh hưởng đến decision timeline của finance team. Going forward cần flag sớm khi timeline tighten."',
    },
    avoidDoing: [
      'Spring surprise changes mà không advance notice',
      'Dismiss process concerns họ raise mà không investigate',
      'Assign vào ambiguous, rapidly-changing environment mà không support',
    ],
    bestAssignments: [
      'Vận hành và quản lý quy trình',
      'Đảm bảo chất lượng và tuân thủ',
      'Ghi chép và quản lý kiến thức',
    ],
    stressSignals: [
      'Increasingly rigid về process — không tolerate exception dù sensible [P]',
      'Physical symptoms — headache, fatigue từ anxiety [P]',
      'More quiet than usual trong meetings [P]',
    ],
    coachingQuestions: [
      '"Process nào bạn thấy đang outdated hoặc inefficient?"',
      '"Bạn cần thêm thông tin gì để comfortable với change này?"',
      '"Ai trong team có thể learn được nhiều nhất từ experience của bạn?"',
      '"Điều gì bạn muốn thử nhưng chưa có cơ hội?"',
    ],
  },

  ISFJ: {
    overview: 'ISFJ đóng góp âm thầm với độ tin cậy cao — cần quản lý chủ động ghi nhận và tạo cơ hội để họ được nhìn thấy. Cũng cần huấn luyện về tự lên tiếng và đặt ranh giới. [P]',
    howToMotivate: [
      'Recognize specific contributions explicitly và thường xuyên',
      'Create safe space để họ express concerns',
      'Connect work to team wellbeing và people impact',
    ],
    feedbackStyle: {
      bestTiming: 'Regular, gentle check-ins — không chờ formal review lâu',
      bestFormat: 'Very private, warm, với strong appreciation lead',
      language: 'Care-acknowledging: "Tôi thấy effort bạn đã bỏ vào đây — đây là cách chúng ta có thể take it further"',
      example: '"Bạn xử lý complaint của khách rất tốt tuần rồi — để escalate thành best practice thì cần document lại cách bạn handle."',
    },
    avoidDoing: [
      'Phát triển tư duy hệ thống trong team',
      'Public criticism dù very small',
      'Ignore burnout signals — họ thường không ask for help',
    ],
    bestAssignments: [
      'Chăm sóc khách hàng và hỗ trợ',
      'Nhân sự và vận hành con người',
      'Vai trò hướng chất lượng và chăm sóc',
    ],
    stressSignals: [
      'Physical symptoms — trở nên sick hơn bình thường [P]',
      'Increased need for reassurance [P]',
      'Withdraw khỏi social interaction trong team [P]',
    ],
    coachingQuestions: [
      '"Điều gì đang drain energy của bạn nhất tuần này?"',
      '"Có requirement nào không realistic mà bạn chưa speak up?"',
      '"Bạn cảm thấy được appreciated đúng mức cho work của mình không?"',
      '"Ai trong team bạn muốn dạy điều bạn biết?"',
    ],
  },

  ESTJ: {
    overview: 'ESTJ là người thực thi mạnh và tổ chức nhóm — cần phát triển lãnh đạo thấu cảm và linh hoạt. Họ làm tốt nhất với quyền rõ ràng, trách nhiệm và số liệu đo lường. [P]',
    howToMotivate: [
      'Clear goals, metrics, và authority tương ứng',
      'Recognition khi họ deliver excellence',
      'Respect expertise và involve trong decision-making',
    ],
    feedbackStyle: {
      bestTiming: 'Timely — không let issues linger, address when fresh',
      bestFormat: 'Direct 1-1, structured, với clear expectations',
      language: 'Factual impact: "Approach X tạo ra effect Y với team — going forward, Z sẽ more effective"',
      example: '"Meeting style của bạn efficient nhưng 3 người in team feel không có space để pushback — thử thêm "điều gì tôi đang miss?" vào end of each meeting."',
    },
    avoidDoing: [
      'Undermine authority của họ trong public',
      'Move goalposts mà không explain',
      'Ignore emotional dynamics họ dismiss — vẫn quan trọng',
    ],
    bestAssignments: [
      'Lãnh đạo vận hành',
      'Cải thiện quy trình và hệ thống chất lượng',
      'Quản lý nhóm với deliverable rõ ràng',
    ],
    stressSignals: [
      'Increased rigidity và inflexibility [P]',
      'More critical của team performance [P]',
      'Working longer hours mà không sustainable result [P]',
    ],
    coachingQuestions: [
      '"Ai trong team đang struggle — và làm thế nào bạn đang support họ?"',
      '"Decision nào gần đây bạn muốn handle differently?"',
      '"Khi team pushback, bạn xử lý như thế nào?"',
      '"Thứ gì bạn đang làm mà chỉ mình bạn làm được — và cần delegate?"',
    ],
  },

  ESFJ: {
    overview: 'ESFJ là keo dán xã hội và neo hòa khí nhóm — cần hỗ trợ để phát triển ra quyết định khách quan và kỹ năng hội thoại khó. Quản lý phải ghi nhận công khai và bảo vệ họ khỏi bị coi là đương nhiên. [P]',
    howToMotivate: [
      'Public recognition, warm và specific',
      'Involve trong people và culture decisions',
      'Show impact của work trên team wellbeing',
    ],
    feedbackStyle: {
      bestTiming: 'Khi environment calm và positive — không trong high-stress moment',
      bestFormat: 'Very warm, private, với care và appreciation lead strongly',
      language: 'People-impact: "Team feel X vì Y — đây là cách bạn có thể support họ tốt hơn"',
      example: '"Bạn facilitate rất tốt — nhưng mình thấy bạn tend to smooth over disagreement early. Đôi khi để tension exist thêm chút để idea tốt hơn emerge."',
    },
    avoidDoing: [
      'Public criticism bất kỳ',
      'Make feel excluded khỏi social aspects của team',
      'Take available của họ for granted',
    ],
    bestAssignments: [
      'Lãnh đạo nhóm và vai trò văn hóa',
      'Quản lý quan hệ khách hàng',
      'Nhân sự và vận hành con người',
    ],
    stressSignals: [
      'Over-accommodating behavior tăng [P]',
      'Physical signs của fatigue — over-worked [P]',
      'Become clingy hoặc need more reassurance [P]',
    ],
    coachingQuestions: [
      '"Ai trong team bạn worry về nhất và tại sao?"',
      '"Conversation khó nào bạn đang defer mà biết cần có?"',
      '"Bạn cảm thấy được appreciate đúng mức không — nếu không thì thiếu gì?"',
      '"Khi bạn disagree với decision, bạn nói như thế nào?"',
    ],
  },

  ISTP: {
    overview: 'ISTP là người giải quyết vấn đề trực tiếp bắt tay làm tốt nhất — cần ít họp, tối đa quyền tự chủ và mô tả vấn đề rõ ràng. Huấn luyện giao tiếp là ưu tiên phát triển. [P]',
    howToMotivate: [
      'Concrete technical challenges với freedom để solve',
      'Minimize unnecessary meetings và process overhead',
      'Tạo không gian để team thử nghiệm và học hỏi',
    ],
    feedbackStyle: {
      bestTiming: 'Brief và timely — ngay sau relevant event, không delay',
      bestFormat: 'Very short 1-1, direct, không extensive setup',
      language: 'Ultra-concise factual: "Behavior X, impact Y, do Z instead"',
      example: '"Status update hôm qua thiếu — team block vì không biết bạn đang ở đâu với task. 1 dòng Slack update mỗi buổi sáng là đủ."',
    },
    avoidDoing: [
      'Overload với meetings và social obligations',
      'Require detailed planning documents trước khi execute',
      'Micromanage technical approach',
    ],
    bestAssignments: [
      'Gỡ sự cố kỹ thuật và công việc trực tiếp bắt tay làm',
      'Ứng phó khủng hoảng và giải quyết vấn đề nhanh',
      'Dự án kỹ thuật độc lập',
    ],
    stressSignals: [
      'Even more withdrawn than usual [P]',
      'Increasingly blunt — short responses [P]',
      'Physical escape behaviors — leaving desk often [P]',
    ],
    coachingQuestions: [
      '"Vấn đề kỹ thuật nào đang bother bạn nhiều nhất mà chưa ai address?"',
      '"Bạn cần gì để ít bị interrupt hơn khi deep work?"',
      '"Cái gì trong workflow hiện tại là unnecessary và nên cut?"',
      '"Skill nào bạn đang muốn develop tiếp theo?"',
    ],
  },

  ISFP: {
    overview: 'ISFP có chiều sâu sáng tạo và sự quan tâm chân thật — cần quản lý chủ động tạo không gian để họ được nhìn thấy và bảo vệ môi trường. Huấn luyện tự lên tiếng là mảng phát triển then chốt. [P]',
    howToMotivate: [
      'Genuine appreciation cụ thể và thường xuyên',
      'Creative freedom về approach',
      'Stable, positive environment',
    ],
    feedbackStyle: {
      bestTiming: 'Khi họ calm và secure — không stressed moment',
      bestFormat: 'Extremely gentle, private, highly positive lead',
      language: 'Talent-acknowledging: "Bạn có gift ở đây — đây là cách grow it further"',
      example: '"Design của bạn đẹp và user-friendly — để lên next level thì cần document reasoning để team có thể follow."',
    },
    avoidDoing: [
      'Public criticism bất kỳ size',
      'Assign vào high-conflict environments',
      'Xây dựng mối quan hệ với các bộ phận khác trong tổ chức',
    ],
    bestAssignments: [
      'Thiết kế sáng tạo và công việc thẩm mỹ',
      'Chăm sóc khách hàng và hỗ trợ',
      'Công việc kỹ thuật theo nghề thủ công',
    ],
    stressSignals: [
      'Quality drops và becomes perfectionistic simultaneously [P]',
      'Increasing quiet và withdrawal [P]',
      'Seeking more reassurance than usual [P]',
    ],
    coachingQuestions: [
      '"Phần nào của work này bạn thấy satisfying nhất?"',
      '"Có idea nào bạn đang hold back chưa share?"',
      '"Bạn cảm thấy comfortable nói lên khi disagree không?"',
      '"Bạn cần môi trường như thế nào để do best work?"',
    ],
  },

  ESTP: {
    overview: 'ESTP phát triển mạnh trong hành động và thực tế — cần huấn luyện về kiên nhẫn chiến lược và kỷ luật lập kế hoạch. Quản lý phải kênh năng lượng vào thử thách cao, dễ thấy. [P]',
    howToMotivate: [
      'Real-world challenges với tangible impact và recognition',
      'Freedom từ excessive bureaucracy',
      'Competitive elements và visible wins',
    ],
    feedbackStyle: {
      bestTiming: 'Ngay và thẳng thắn — ESTP appreciate immediate, direct feedback',
      bestFormat: 'Brief, direct 1-1 — no softening needed',
      language: 'Action-focused: "Behavior X, impact Y — đây là expectation going forward"',
      example: '"Proposal được submit không có risk analysis — client hỏi và mình không có answer sẵn. Next proposal cần risk section."',
    },
    avoidDoing: [
      'Đưa ra phản hồi xây dựng và có thể thực hiện được',
      'Assign slow, long research cycles mà không action',
      'Over-structure environment',
    ],
    bestAssignments: [
      'Bán hàng và vai trò đối diện khách hàng',
      'Ứng phó khủng hoảng và thực thi nhanh',
      'Phát triển kinh doanh',
    ],
    stressSignals: [
      'Increasingly impulsive decisions [P]',
      'Conflict-seeking behavior [P]',
      'Disengage từ follow-through [P]',
    ],
    coachingQuestions: [
      '"Opportunity lớn nhất bạn thấy trong market mà chúng ta chưa chase là gì?"',
      '"Làm thế nào bạn sẽ approach cái này nếu có unlimited resources?"',
      '"Risk lớn nhất trong plan hiện tại theo bạn là gì?"',
      '"Ai trong team có thể complement style của bạn tốt nhất?"',
    ],
  },

  ESFP: {
    overview: 'ESFP mang niềm vui và năng lượng chân thật — cần cơ cấu và hỗ trợ trách nhiệm để kênh hóa chúng. Quản lý phải cân bằng khích lệ với kỳ vọng rõ ràng. [P]',
    howToMotivate: [
      'Variety, fun, và social connection trong công việc',
      'Public recognition warm và enthusiastic',
      'Nhận ra tín hiệu sớm khi có vấn đề trong team',
    ],
    feedbackStyle: {
      bestTiming: 'Frequent informal — không chờ formal review',
      bestFormat: 'Warm conversation với positive strong lead',
      language: 'Encouraging future-focus: "Bạn giỏi ở đây — để take it further thì..."',
      example: '"Event của bạn rất successful về energy — lần tới add agenda clear hơn để takeaway cụ thể hơn cho team."',
    },
    avoidDoing: [
      'Assign vào isolated, repetitive work',
      'Tạo văn hóa trách nhiệm mà không gây sợ hãi',
      'Phân bổ nguồn lực dựa trên tác động chiến lược',
    ],
    bestAssignments: [
      'Sự kiện và hoạt động trải nghiệm',
      'Vai trò đối diện khách hàng và quan hệ',
      'Gắn kết nhóm và văn hóa',
    ],
    stressSignals: [
      'Unusually quiet hoặc withdrawn [P]',
      'Conflict-avoidance extreme — agreeableness tăng không healthy [P]',
      'Quality của work drops significantly [P]',
    ],
    coachingQuestions: [
      '"Điều gì bạn enjoy nhất về role này — và làm thế nào để có nhiều hơn?"',
      '"Commitment nào bạn đang worry về không deliver được?"',
      '"Bạn cần gì để reliable hơn với timeline?"',
      '"Ai là người bạn muốn collaborate với nhất và tại sao?"',
    ],
  },
}

// ============================================================
// HR INSIGHT RULES — Rule-based, zero AI call
// ============================================================

export interface InsightRule {
  id: string
  condition: string   // description của condition (actual logic trong code)
  insight: string
  priority: number    // 1 = cao nhất
  actionSuggestion: string
}

export const HR_INSIGHT_RULES: InsightRule[] = [
  {
    id: 'high_introvert_ratio',
    condition: 'introvertRatio > 0.65',
    insight: 'Hơn 65% team hướng nội. Họp nhóm lớn thường xuyên có thể gây kiệt sức và reduce contribution. Thử chuyển một số cuộc họp sang async (doc hoặc email) và tạo space cho deep work uninterrupted.',
    priority: 1,
    actionSuggestion: 'Chuyển ít nhất 2 meeting/tuần sang async format. Thêm "no meeting hours" buổi sáng.',
  },
  {
    id: 'high_perceiving_ratio',
    condition: 'perceivingRatio > 0.70',
    insight: 'Team có xu hướng linh hoạt cao (70%+ Perceiving). Deadline cụ thể và milestone rõ ràng sẽ help team hoàn thành đúng hạn hơn. Không phải vì họ không care — mà vì họ cần external structure để prioritize.',
    priority: 2,
    actionSuggestion: 'Implement weekly milestone check-in. Chia project thành smaller deliverables có deadline rõ.',
  },
  {
    id: 'low_type_diversity',
    condition: 'uniqueTypesCount < 4',
    insight: 'Team thiếu đa dạng tính cách — chỉ có số ít nhóm khác nhau. Đây có thể tạo ra blind spots tập thể. Khi tuyển dụng tiếp theo, cân nhắc ưu tiên tính cách bổ sung thay vì "culture fit" giống nhau.',
    priority: 3,
    actionSuggestion: 'Review next 3 job descriptions — xác định type nào team đang thiếu và mention trong JD.',
  },
  {
    id: 'all_thinking_types',
    condition: 'feelingRatio < 0.20',
    insight: 'Team hầu hết là Thinking types. Rất strong về analysis và logic — nhưng có thể thiếu radar về employee morale và customer emotion. Consider thêm F-type voice trong customer và people decisions.',
    priority: 3,
    actionSuggestion: 'Include ít nhất 1 F-type trong customer research và people policy decisions.',
  },
  {
    id: 'all_intuitive_types',
    condition: 'sensingRatio < 0.20',
    insight: 'Team chủ yếu Intuitive types. Excellent về strategy và innovation — nhưng có thể bỏ qua implementation detail và practical constraints. Cân nhắc khi assign implementation roles.',
    priority: 4,
    actionSuggestion: 'Pair intuitive-heavy project team với ít nhất 1 Sensing type cho implementation review.',
  },
  {
    id: 'high_judging_ratio',
    condition: 'judgingRatio > 0.75',
    insight: 'Team 75%+ Judging — very organized và reliable. Risk là team có thể close options quá sớm và resist experimentation. Tạo explicit space cho "ideas không cần commit" trong brainstorm sessions.',
    priority: 5,
    actionSuggestion: 'Add monthly "no-judgment ideation" session — no commitment, pure exploration.',
  },
  {
    id: 'high_extrovert_ratio',
    condition: 'extrovertRatio > 0.70',
    insight: 'Team 70%+ hướng ngoại. Meetings và collaboration thường rất effective — nhưng team có thể undervalue deep thinking và individual work. Intentionally protect focus time.',
    priority: 5,
    actionSuggestion: 'Block 2h/ngày "focus time" cho cả team — no Slack, no meetings.',
  },
  {
    id: 'single_type_dominant',
    condition: 'dominantTypeRatio > 0.40',
    insight: 'Hơn 40% team cùng một type. Rất hiệu quả trong lĩnh vực strong của type đó — nhưng có blind spot tập thể rõ ràng. Specific recommendation tùy type dominant.',
    priority: 2,
    actionSuggestion: 'Xem blind spot của dominant type và intentionally recruit bổ sung.',
  },
  {
    id: 'manager_team_mismatch',
    condition: 'managerTeamMismatchHigh === true',
    insight: 'Manager và phần lớn team có communication style khác biệt đáng kể. Có thể tạo friction không cần thiết. Consider coaching session về communication across types.',
    priority: 2,
    actionSuggestion: 'Schedule team workshop về communication styles — dùng MBTI làm language.',
  },
  {
    id: 'no_ntj_in_leadership',
    condition: 'hasNTJInLeadership === false && teamSize > 10',
    insight: 'Team 10+ người nhưng không có NT hoặc NTJ types trong leadership. Strategic planning và long-term thinking có thể thiếu. Consider khi xác định đào tạo leadership tiếp theo.',
    priority: 6,
    actionSuggestion: 'Review leadership pipeline — identify NT types để develop vào strategic roles.',
  },
]
