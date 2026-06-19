/**
 * batch2-procrastination-by-type.ts
 * TNCB Self-Directed Growth — Procrastination Patterns & Break-through theo Type
 *
 * Sources chính:
 *   - MBTI × Procrastination study (Liu et al. 2024, wepub.org, college students) [R]
 *   - Big Five × Procrastination (Van Eerde 2003, ScienceDirect, N=438) [R]
 *   - Conscientiousness = strongest predictor of procrastination [R] (multiple studies)
 *   - Fear of failure, perfectionism, avoidant coping research [R]
 *   - Ferrari (1992) — 3 fears: rejection, success, failure [R]
 *   - Solomon & Rothblum (1984) — procrastination × perfectionism [R]
 *   - Temporal motivation theory (Steel 2007) [R]
 *   - Clockify.me MBTI productivity synthesis [P]
 *   - truity.com INTP procrastination analysis [P]
 *   - PsychologyJunkie type-specific procrastination patterns [P]
 *   - BJ Fogg Tiny Habits: applied to personality types [S]
 *
 * KEY RESEARCH FINDINGS:
 * - INTP, ENTP, INFP = most likely to procrastinate [R — Liu 2024]
 * - ESFP, ISFJ, ENFJ = least likely to procrastinate [R — Liu 2024]
 * - NP types procrastinate due to overthinking [R]
 * - J types' efficiency focus reduces delay [R]
 * - Conscientiousness inversely correlated: low C → high procrastination [R multiple]
 * - Openness × procrastination: complex (creative exploration vs focus)
 */

export interface ProcrastinationProfile {
  rootCause: string
  emotionalTrigger: string
  patterns: string[]
  strategies: {
    strategy: string
    why_works_for_type: string
    micro_action: string
  }[]
  warningSigns: string[]
  likelinessToProcrastinate: 'very_high' | 'high' | 'moderate' | 'low' | 'very_low'
  source: string
  confidence: '[R]' | '[P]' | '[S]'
}

export const PROCRASTINATION_BY_TYPE: Record<string, ProcrastinationProfile> = {

  INTJ: {
    rootCause: 'Cầu toàn + sợ lộ ra tư duy chưa hoàn hảo. Chưa có "cách tiếp cận tối ưu" → không bắt đầu.',
    emotionalTrigger: 'Uncertainty về cách làm tốt nhất. Cảm giác rằng nếu làm ngay sẽ không đạt chuẩn tự đặt.',
    patterns: [
      'Vòng lặp nghiên cứu — tiếp tục tìm hiểu thay vì bắt đầu vì "cần biết thêm"',
      'Thay thế bằng lập kế hoạch — lên kế hoạch chi tiết thay cho làm thực sự',
      'Nâng chuẩn — tự nâng bar mỗi khi gần hoàn thành',
    ],
    strategies: [
      {
        strategy: 'Prototype mindset',
        why_works_for_type: 'INTJ respect systems. Frame task là "v0.1 prototype cần iterate" giảm perfectionism pressure mà không vi phạm standards của họ.',
        micro_action: 'Gõ "BẢN NHÁP v0.1 — sẽ sửa lại" ở đầu tài liệu trước khi viết bất cứ điều gì.',
      },
      {
        strategy: 'Time-boxed exploration',
        why_works_for_type: 'Giới hạn research phase bằng timer cứng. INTJ respect constraints khi tự họ đặt ra.',
        micro_action: 'Đặt hẹn giờ 20 phút: "Sau 20 phút này, mình BẮT ĐẦU viết dù chưa nghiên cứu xong."',
      },
      {
        strategy: 'Minimum viable version',
        why_works_for_type: 'INTJ có Te — cần output. Reframe: output tệ vẫn tốt hơn không có output.',
        micro_action: 'Viết "câu trả lời tối thiểu khả dụng" cho task trong 5 phút — có thể sai, không sao.',
      },
    ],
    warningSigns: [
      'Mở > 10 tabs research cho một task nhỏ',
      '"Mình sẽ làm khi hiểu rõ hơn về X"',
      'Outline chi tiết 3 trang cho task 30 phút',
    ],
    likelinessToProcrastinate: 'high',
    source: 'INTJ perfectionism patterns [P]. Big Five — low neuroticism but high standards paradox [R]. Liu et al. 2024 MBTI procrastination study [R].',
    confidence: '[S]',
  },

  INFJ: {
    rootCause: 'Cầu toàn + sợ không đủ ý nghĩa. Việc phải cảm thấy "xứng đáng" mới bắt đầu.',
    emotionalTrigger: 'Overwhelm từ caring too much. Cảm giác task không đủ quan trọng, hoặc ngược lại — quá quan trọng đến mức paralysis.',
    patterns: [
      'Khoảng cách tầm nhìn–thực tế — thấy kết quả lý tưởng quá rõ, thực tế thì chưa đủ tốt',
      'Hấp thụ cảm xúc — bị phân tán bởi người khác cần họ',
      'Xoáy phức tạp — suy nghĩ quá hệ quả của việc đến mức đứng im',
    ],
    strategies: [
      {
        strategy: 'Meaning anchor',
        why_works_for_type: 'INFJ motivated by purpose. Kết nối task với "ai sẽ benefit" kích hoạt Fe và làm họ act.',
        micro_action: 'Viết 1 câu: "Việc này giúp [người cụ thể] vì [lý do cụ thể]" trước khi bắt đầu.',
      },
      {
        strategy: 'Imperfect beginning ritual',
        why_works_for_type: 'INFJ cần "permission" to be imperfect. Ritual signaling cho não rằng draft mode is OK.',
        micro_action: 'Viết tay lên giấy: "Đây chỉ là bản nháp. Được phép chưa hoàn hảo." Rồi bắt đầu.',
      },
      {
        strategy: 'Energy protection blocks',
        why_works_for_type: 'INFJ procrastinate một phần vì drained bởi Fe obligations. Clear calendar block = permission.',
        micro_action: 'Chặn 90 phút "không làm phiền" ngay bây giờ trong lịch, đặt điện thoại sang phòng khác.',
      },
    ],
    warningSigns: [
      '"Mình sẽ làm khi có đúng mood/inspiration"',
      'Spending time helping others as avoidance',
      'Journaling về task thay vì làm task',
    ],
    likelinessToProcrastinate: 'high',
    source: 'INFJ perfectionism + meaning-seeking patterns [P]. Fear of failure research [R].',
    confidence: '[S]',
  },

  INTP: {
    rootCause: 'Cầu toàn + sợ lộ ra sự chưa hoàn chỉnh. Cần "mô hình tư duy đầy đủ" trước khi có kết quả.',
    emotionalTrigger: 'Shame avoidance — sợ rằng output sẽ reveal flawed thinking. Procrastination = self-protection.',
    patterns: [
      'Tinh chỉnh mãi — liên tục cải thiện ý tưởng trong đầu, không bao giờ giao',
      'Đi lạc hướng thú vị — bị cuốn vào vấn đề liên quan thú vị hơn',
      'Tê liệt phân tích — mọi hướng đều có đánh đổi nên không chọn được',
    ],
    strategies: [
      {
        strategy: 'Externalise thinking',
        why_works_for_type: 'INTP hoạt động tốt nhất khi ideas ra ngoài đầu. Writing it out = making it real và workable.',
        micro_action: 'Đặt hẹn giờ 5 phút: đổ mọi suy nghĩ về việc lên giấy/tài liệu — không sửa, chỉ đổ ra.',
      },
      {
        strategy: 'Done is a data point',
        why_works_for_type: 'INTP respect empirical evidence. Reframe: finishing = collecting data, not passing/failing a test.',
        micro_action: 'Nói to: "Cái này là giả thuyết. Mình sẽ kiểm chứng bằng cách hoàn thành và xem phản hồi."',
      },
      {
        strategy: 'Constraint-based creativity',
        why_works_for_type: 'INTP procrastinate khi có infinite options. Hard constraints (time/scope) paradoxically free them.',
        micro_action: 'Tự đặt ràng buộc: "Chỉ có 25 phút và chỉ được dùng 3 câu để giải thích X."',
      },
    ],
    warningSigns: [
      '"Mình gần hiểu rồi, cần thêm một ít thời gian"',
      'Reading papers/articles thay vì làm task',
      'Redesigning the approach completely khi gần xong',
    ],
    likelinessToProcrastinate: 'very_high',
    source: 'Liu et al. 2024 [R]: INTP là type procrastinate nhiều nhất. Truity INTP fear of failure [P]. Ferrari 1992 shame avoidance [R].',
    confidence: '[R]',
  },

  ENTJ: {
    rootCause: 'Thiếu kiên nhẫn + coi thường việc dưới tiêu chuẩn. Trì hoãn khi việc cảm thấy thấp hơn hoặc không rõ.',
    emotionalTrigger: 'Frustration với inefficiency. Resistance khi không có clear authority hoặc vision.',
    patterns: [
      'Tránh ủy quyền — không giao nhưng cũng không làm vì không muốn "lãng phí thời gian"',
      'Khóa tầm nhìn — chờ điều kiện "hoàn hảo" trước khi thực thi',
      'Lập kế hoạch tầng dưới thay vì tập trung việc hiện tại',
    ],
    strategies: [
      {
        strategy: 'Strategy session framing',
        why_works_for_type: 'ENTJ thích "strategic decisions." Reframe boring task là strategic move.',
        micro_action: 'Hỏi: "Việc này phục vụ chiến lược nào?" Viết câu trả lời rồi bắt đầu.',
      },
      {
        strategy: 'Command mode',
        why_works_for_type: 'ENTJ respond to self-commands. Clear directive from self → action.',
        micro_action: 'Nói to (hoặc trong đầu): "Lệnh: bắt đầu [việc] trong 60 giây. GO."',
      },
      {
        strategy: 'Impact tracking',
        why_works_for_type: 'ENTJ motivated by measurable results. Visibility of impact = fuel.',
        micro_action: 'Ghi: "Hoàn thành việc này = [kết quả cụ thể] trước [ngày]." Cam kết nhìn thấy được.',
      },
    ],
    warningSigns: [
      '"Task này không đáng để mình làm"',
      'Endless restructuring của how the work should be done',
      'Waiting for someone else to take initiative',
    ],
    likelinessToProcrastinate: 'moderate',
    source: 'ENTJ procrastination patterns [P]. High conscientiousness → lower procrastination [R].',
    confidence: '[S]',
  },

  ENTP: {
    rootCause: 'Chán + tê liệt vì quá nhiều lựa chọn. Việc mất tính mới → não ngắt kết nối.',
    emotionalTrigger: 'Boredom và feeling of wasted potential. "Mình có thể làm nhiều thứ hay hơn cái này."',
    patterns: [
      'Hội chứng vật mới — bắt đầu mọi thứ, hoàn thành ít',
      'Vòng phản biện — tranh với chính mình đến mức không quyết định được',
      'Tìm thử thách — tạo độ phức tạp giả để việc nhàm chán thú vị hơn',
    ],
    strategies: [
      {
        strategy: 'Gamify the constraint',
        why_works_for_type: 'ENTP thích challenge và competition. Make the boring task into a game.',
        micro_action: 'Thử thách: "Mình có thể xong X trong [thời gian ngắn hơn bình thường] không? BẮT ĐẦU."',
      },
      {
        strategy: 'Teaching framing',
        why_works_for_type: 'ENTP love explaining và debating. "Sau khi làm, mình sẽ explain cho ai đó" → engagement.',
        micro_action: 'Tự hỏi: "Mình sẽ giải thích điều gì học được từ việc này cho người khác?" Rồi bắt đầu.',
      },
      {
        strategy: 'Minimum viable draft',
        why_works_for_type: 'ENTP good at improvisation. Remove "perfect first draft" expectation → flow.',
        micro_action: 'Viết tệ nhất có thể trong 5 phút, gọi nó là "bản nháp xấu" — sau đó cải thiện.',
      },
    ],
    warningSigns: [
      'Bắt đầu project mới khi cái cũ chưa xong',
      '"Ý tưởng này hay hơn — mình sẽ làm cái này thay"',
      'Debate internally về approach thay vì pick one và go',
    ],
    likelinessToProcrastinate: 'very_high',
    source: 'Liu et al. 2024 [R]: ENTP high procrastination. NP types overthink [R]. Clockify ENTP analysis [P].',
    confidence: '[R]',
  },

  ENFJ: {
    rootCause: 'Nhận quá nhiều việc + nghĩa vụ với người khác chiếm hết thời gian và năng lượng trước khi làm việc của mình.',
    emotionalTrigger: 'Guilt về saying no. "Người ta cần mình hơn task cần mình."',
    patterns: [
      'Thay thế bằng giúp người — dành thời gian cho vấn đề người khác như cách trì hoãn',
      'Duy trì hòa khí — tránh việc có thể gây xung đột',
      'Suy nghĩ quá tác động — lo việc kết quả ảnh hưởng người khác thế nào',
    ],
    strategies: [
      {
        strategy: 'Serve-through-completing',
        why_works_for_type: 'ENFJ cần to see how completing task helps people. Make the link explicit.',
        micro_action: 'Viết: "Bằng cách hoàn thành X, mình giúp được [ai] vì [lý do]."',
      },
      {
        strategy: 'Scheduled deep focus as commitment',
        why_works_for_type: 'ENFJ giữ commitments với người khác tốt. Make focus time a commitment to self.',
        micro_action: 'Nói với ai đó: "Từ 9-11h sáng mình cần tập trung — đừng nhắn tin mình nhé." → trách nhiệm.',
      },
    ],
    warningSigns: [
      'Spend 2h helping colleagues, then rush own work',
      '"Mình sẽ làm sau khi giúp X xong"',
      'Check messages/emails every 15 phút khi làm việc',
    ],
    likelinessToProcrastinate: 'low',
    source: 'Liu et al. 2024 [R]: ENFJ ít procrastinate. ENFJ patterns [P].',
    confidence: '[R]',
  },

  ENFP: {
    rootCause: 'Việc cảm thấy nhàm chán / vô nghĩa. ENFP cần thấy khả năng thú vị mới hành động.',
    emotionalTrigger: 'Boredom và disconnection từ purpose hoặc excitement.',
    patterns: [
      'Chờ cảm hứng — "mình sẽ làm khi có cảm hứng"',
      'Phân tán bởi dự án mới — bắt đầu việc thú vị thay thế',
      'Suy nghĩ quá ý nghĩa — đặt câu hỏi việc có đáng làm không',
    ],
    strategies: [
      {
        strategy: 'Find the exciting angle',
        why_works_for_type: 'ENFP motivated by possibility. Reframe task trong big picture exciting context.',
        micro_action: 'Viết 1 câu: "Việc này kết nối với [mục tiêu thú vị] vì..." rồi bắt đầu ngay.',
      },
      {
        strategy: 'External accountability partner',
        why_works_for_type: 'ENFP thường motivated by people. Telling someone → commitment.',
        micro_action: 'Nhắn bạn: "Mình sẽ xong [việc] lúc 3h chiều. Nhắc mình nhé!" → hành động ngay.',
      },
      {
        strategy: 'First 2 minutes only',
        why_works_for_type: 'ENFP có low initiation energy nhưng high flow potential. Starting is hardest.',
        micro_action: 'Tự nói: "Mình chỉ làm 2 phút rồi dừng được." Sau 2 phút thường tiếp tục.',
      },
    ],
    warningSigns: [
      '"Mình chưa đủ inspired để làm tốt cái này"',
      'Scroll mạng xã hội khi nên đang làm',
      'Brainstorm project mới thay vì finish project cũ',
    ],
    likelinessToProcrastinate: 'very_high',
    source: 'Liu et al. 2024 [R]: high for NP types. ENFP procrastination research [P]. Clockify analysis [P].',
    confidence: '[S]',
  },

  ISTJ: {
    rootCause: 'Cảm giác nghĩa vụ quá tải so với sức chứa. Trì hoãn khi choáng ngợp bởi quá nhiều cam kết.',
    emotionalTrigger: 'Stress từ conflicting duties. Không biết nên làm cái nào trước.',
    patterns: [
      'Tê liệt xung đột nghĩa vụ — cảm thấy phải làm tất cả nên không làm gì',
      'Cầu toàn chi tiết — sa lầu vào chi tiết nhỏ thay vì tiến lên',
      'Tránh việc lạ — trì hoãn việc cần cách tiếp cận mới',
    ],
    strategies: [
      {
        strategy: 'Priority list first',
        why_works_for_type: 'ISTJ work well với explicit prioritization. Written list = permission to ignore others.',
        micro_action: 'Viết 3 việc theo thứ tự ưu tiên. Chỉ làm #1. Chặn mọi thứ khác.',
      },
      {
        strategy: 'Established procedure',
        why_works_for_type: 'ISTJ comfortable với proven methods. Create personal "ritual" để start work.',
        micro_action: 'Định nghi thức bắt đầu: "Cà phê → mở tài liệu → đặt hẹn giờ 45 phút → bắt đầu." Làm mỗi ngày.',
      },
    ],
    warningSigns: [
      'List endless tasks thay vì actually starting',
      'Reorganize workspace thay vì working',
      '"Mình sẽ làm khi finish [obligation khác] trước"',
    ],
    likelinessToProcrastinate: 'low',
    source: 'Liu et al. 2024 [R]: J types ít procrastinate. High conscientiousness → low procrastination [R multiple].',
    confidence: '[R]',
  },

  ISFJ: {
    rootCause: 'Sợ không đủ tốt cho người khác. Trì hoãn khi việc có cược cảm xúc.',
    emotionalTrigger: 'Anxiety về disappointing people. Cầu toàn về việc how others will receive output.',
    patterns: [
      'Người khác trước — ưu tiên nhu cầu mọi người trước của mình',
      'Chuẩn bị quá mức — dành quá nhiều thời gian chuẩn bị để trì hoãn bắt đầu',
      'Tránh việc có xung đột — việc có thể làm ai đó buồn',
    ],
    strategies: [
      {
        strategy: 'For-whom anchor',
        why_works_for_type: 'ISFJ motivated by concrete care for specific people.',
        micro_action: 'Viết tên người sẽ hưởng lợi từ việc này. Làm vì họ, không vì nghĩa vụ trừu tượng.',
      },
      {
        strategy: 'Imperfect help is still help',
        why_works_for_type: 'ISFJ cần permission to deliver non-perfect output. "Done and imperfect" = still helpful.',
        micro_action: 'Tự nhủ: "Email 80% đúng gửi đúng hạn tốt hơn email hoàn hảo gửi trễ."',
      },
    ],
    warningSigns: [
      'Over-preparing để delay submitting',
      'Helping everyone else trước khi làm việc của mình',
      'Re-reading/editing quá nhiều lần',
    ],
    likelinessToProcrastinate: 'very_low',
    source: 'Liu et al. 2024 [R]: ISFJ ít procrastinate nhất. High conscientiousness + agreeableness [R].',
    confidence: '[R]',
  },

  INFP: {
    rootCause: 'Lệch giá trị. Không thể giả vờ động lực cho việc cảm thấy vô nghĩa.',
    emotionalTrigger: 'Existential disengagement — "tại sao mình làm điều này anyway?"',
    patterns: [
      'Khủng hoảng ý nghĩa — đặt câu hỏi liên quan việc đến mức đứng im',
      'Chờ thời điểm hoàn hảo — "mình sẽ làm khi cảm thấy đúng"',
      'Tránh sáng tạo — làm việc thú vị thay việc cần làm',
    ],
    strategies: [
      {
        strategy: 'Values link',
        why_works_for_type: 'INFP chỉ act khi task connects to deep values. Make connection explicit, even for admin tasks.',
        micro_action: 'Viết: "Làm [việc nhàm] cho phép mình [làm việc phù hợp giá trị]." Ví dụ: "Làm báo cáo → giữ việc → nuôi mèo 🐱."',
      },
      {
        strategy: 'Tiny step permission',
        why_works_for_type: 'INFP overwhelmed bởi full task. Giving permission to just start tiny reduces anxiety.',
        micro_action: '"Mình chỉ cần viết tiêu đề và 3 bullet points. Đó là tất cả."',
      },
      {
        strategy: 'Ambient accountability',
        why_works_for_type: 'INFP thường work better khi có "witness" dù không tương tác. Body-doubling effect.',
        micro_action: 'Làm việc ở quán cà phê, thư viện, hoặc tham gia phiên làm việc chung online.',
      },
    ],
    warningSigns: [
      '"Mình không cảm thấy connected với task này"',
      'Journal về why task is difficult thay vì actually doing it',
      'Productive elsewhere nhưng không với task này',
    ],
    likelinessToProcrastinate: 'very_high',
    source: 'Liu et al. 2024 [R]: INFP high procrastination. Values-motivation research [R].',
    confidence: '[R]',
  },

  ESFJ: {
    rootCause: 'Nghĩa vụ xã hội chiếm hết thời gian. Trì hoãn việc cá nhân khi quá tập trung vào người khác.',
    emotionalTrigger: 'Guilt về "wasting time on self" khi others need help.',
    patterns: [
      'Giúp người như cách tránh việc',
      'Tìm duyệt trước khi bắt đầu — cần người khác xác nhận cách làm',
      'Điều phối nhóm hơn tiến độ cá nhân',
    ],
    strategies: [
      {
        strategy: 'Team benefit framing',
        why_works_for_type: 'ESFJ motivated by group good. Show how personal task benefits the team.',
        micro_action: 'Viết: "Mình hoàn thành X để cả nhóm có thể [kết quả tốt]."',
      },
      {
        strategy: 'Scheduled self-time',
        why_works_for_type: 'ESFJ giữ scheduled commitments tốt. Book "work time" như một meeting.',
        micro_action: 'Chặn lịch: "9-10h: Việc X — không available." Coi như cuộc họp quan trọng.',
      },
    ],
    warningSigns: [
      'Respond to every message ngay lập tức khi đang làm việc',
      '"Mình sẽ làm sau khi check xem mọi người ổn không"',
      'Coordination tasks done, personal output tasks delayed',
    ],
    likelinessToProcrastinate: 'low',
    source: 'Liu et al. 2024 [R]: ESFJ ít procrastinate. High conscientiousness + social orientation patterns [P].',
    confidence: '[S]',
  },

  ESFP: {
    rootCause: 'Chán việc không kích thích. ESFP cần năng lượng và chuyển động — công việc bàn làm kiệt sức.',
    emotionalTrigger: 'Restlessness và physical urge to be doing something active/social.',
    patterns: [
      'Tìm phân tán — bất kỳ kích thích giác quan nào hơn việc nhàm',
      'Trì hoãn xã giao — tìm người nói chuyện thay vì làm',
      'Vội vàng phút chót — dùng adrenaline deadline thay vì làm đều',
    ],
    strategies: [
      {
        strategy: 'Movement integration',
        why_works_for_type: 'ESFP cần physical activity. Make work physically active where possible.',
        micro_action: 'Làm việc khi đứng, đi lại, hoặc sau 10 phút vận động để kích hoạt.',
      },
      {
        strategy: 'Deadline creation',
        why_works_for_type: 'ESFP often thrive under real deadline pressure. Create artificial urgent deadlines.',
        micro_action: 'Nhắn bạn: "Mình sẽ gửi X cho bạn trước 3h chiều hôm nay." → giờ nó thật sự.',
      },
    ],
    warningSigns: [
      'Rearranging desk, cleaning, anything physical instead of focusing',
      '"Mình sẽ làm sau khi nói chuyện với [người] này"',
      'Wait until last possible moment then rush',
    ],
    likelinessToProcrastinate: 'low',
    source: 'Liu et al. 2024 [R]: ESFP ít procrastinate nhất. Se orientation = action-bias [P].',
    confidence: '[R]',
  },

  ESTJ: {
    rootCause: 'Bạn hay trì hoãn những việc đòi hỏi tinh tế về cảm xúc — vùng bạn ít thoải mái nhất.',
    emotionalTrigger: 'Discomfort với ambiguity. Tasks không có clear "right way" make ESTJ freeze.',
    patterns: [
      'Chờ ủy quyền — đợi người khác làm trước khi bước vào',
      'Cầu toàn quy trình — làm lại cách cấu trúc việc trước khi làm',
      'Tránh quyết định khó về cảm xúc',
    ],
    strategies: [
      {
        strategy: 'Process first, then execute',
        why_works_for_type: 'ESTJ need defined process. Allow 5 min to define approach, then execute.',
        micro_action: 'Viết kế hoạch 3 bước cho việc (tối đa 5 phút), rồi ngay lập tức bắt đầu bước 1.',
      },
      {
        strategy: 'Accountability metric',
        why_works_for_type: 'ESTJ respond to measurable outcomes. Create visible progress metric.',
        micro_action: 'Định nghĩa: "Xong = [kết quả cụ thể, đo được]." Ghi ra trước khi bắt đầu.',
      },
    ],
    warningSigns: [
      'Restructure task scope repeatedly instead of starting',
      '"Mình cần thêm information trước khi có thể decide"',
      'Delegate và then micromanage instead of just doing',
    ],
    likelinessToProcrastinate: 'low',
    source: 'High conscientiousness → low procrastination [R]. ESTJ patterns [P].',
    confidence: '[S]',
  },

  ESTP: {
    rootCause: 'Chán việc phân tích/lập kế hoạch. Cần hành động và kết quả cụ thể NGAY.',
    emotionalTrigger: 'Impatience và frustration với slow, theoretical tasks.',
    patterns: [
      'Thay thế bằng hành động — làm việc năng động thay việc tư duy',
      'Chờ khủng hoảng — phát huy dưới áp lực, tạo áp lực bằng cách trì hoãn',
      'Tìm đường tắt — tìm cách nhanh nhất dù vấn đề cần kiên nhẫn',
    ],
    strategies: [
      {
        strategy: 'Rapid prototype',
        why_works_for_type: 'ESTP thích doing. Make even analytical tasks hands-on và immediate.',
        micro_action: 'Thay vì lập kế hoạch, thử ngay và điều chỉnh: "Thử cách A ngay, xem kết quả, sửa."',
      },
      {
        strategy: 'Stakes creation',
        why_works_for_type: 'ESTP motivated by risk and competition. Create real consequences.',
        micro_action: 'Cá cược với bạn: "Nếu mình không xong trước 5h, mình mời cà phê." Cược thật = hành động thật.',
      },
    ],
    warningSigns: [
      'Handle every other "urgent" thing except the important one',
      '"Mình sẽ figure it out when the time comes"',
      'Tangible tasks done, abstract/planning tasks untouched',
    ],
    likelinessToProcrastinate: 'moderate',
    source: 'ESTP action-orientation [P]. Se function = present-moment bias [P].',
    confidence: '[P]',
  },

  ISTP: {
    rootCause: 'Trì hoãn việc đòi hỏi gắn kết cảm xúc hoặc biểu diễn xã giao kéo dài.',
    emotionalTrigger: 'Disinterest. Nếu task không genuinely interesting → minimum effort.',
    patterns: [
      'Bộ lọc hứng thú — chỉ làm việc thật sự thú vị',
      'Thay thế bằng mò mẫm — làm vấn đề thú vị nhưng ưu tiên thấp hơn',
      'Trì hoãn giao tiếp — hoãn email/cuộc gọi cần xử lý quan hệ',
    ],
    strategies: [
      {
        strategy: 'Make it a technical puzzle',
        why_works_for_type: 'ISTP engaged by problems. Reframe any task as technical challenge to solve.',
        micro_action: 'Hỏi: "Cách hiệu quả nhất để hoàn thành việc này là gì?" Rồi làm.',
      },
      {
        strategy: 'Minimal sufficient standard',
        why_works_for_type: 'ISTP respect efficiency. Permission to do just enough — no gold-plating.',
        micro_action: 'Định nghĩa: "Xong việc = [kết quả tối thiểu chấp nhận được]." Nhắm đúng mức đó.',
      },
    ],
    warningSigns: [
      'Fix unrelated technical problem instead of the task at hand',
      '"Mình sẽ làm khi có đủ motivation"',
      'Emails/reports overdue while hands-on work is done',
    ],
    likelinessToProcrastinate: 'moderate',
    source: 'ISTP Ti-Se orientation — interest-driven action [P].',
    confidence: '[P]',
  },

  ISFP: {
    rootCause: 'Bạn trì hoãn khi việc lệch giá trị, hoặc khi kết quả chưa đủ đẹp và thật với bạn.',
    emotionalTrigger: 'Sense that "this isn\'t right yet" — cannot submit until it feels authentic.',
    patterns: [
      'Chờ chân thật — không nộp khi chưa cảm thấy "đúng với bản thân"',
      'Cầu toàn thẩm mỹ — làm lại đến khi trông/cảm thấy đúng',
      'Tê liệt vì áp lực — deadline gây lo lắng chặn dòng chảy',
    ],
    strategies: [
      {
        strategy: 'Expression framing',
        why_works_for_type: 'ISFP motivated by authentic expression. Reframe any task as personal expression.',
        micro_action: 'Hỏi: "Nếu đây là cách mình thể hiện bản thân, mình sẽ bắt đầu ở đâu?" Rồi bắt đầu từ đó.',
      },
      {
        strategy: 'Private draft space',
        why_works_for_type: 'ISFP need safety to be imperfect. Private space = no judgment = flow.',
        micro_action: 'Tạo tài liệu "bản nháp riêng" không ai thấy. Soạn thảo ở đó trước.',
      },
    ],
    warningSigns: [
      '"Cái này chưa đủ tốt / chưa đúng cảm giác"',
      'Redoing creative work many times but not moving to next step',
      'Task feels forced → delay until "right moment"',
    ],
    likelinessToProcrastinate: 'high',
    source: 'ISFP Fi-Se orientation — authenticity-driven [P]. Values-motivation research [R].',
    confidence: '[S]',
  },
}

// ─────────────────────────────────────────────────────────────
// CROSS-TYPE UNIVERSAL STRATEGIES
// ─────────────────────────────────────────────────────────────

export const UNIVERSAL_STRATEGIES = [
  {
    strategy: '2-minute rule (David Allen)',
    applicable_to: 'All types',
    mechanism: 'Nếu task dưới 2 phút → làm ngay. Loại bỏ task khỏi mental queue giảm cognitive load.',
    best_for: 'ISTJ, ESTJ, ESFJ — types với nhiều small tasks',
    source: 'David Allen "Getting Things Done" (2001). Widely validated in productivity research.',
    confidence: '[P]' as const,
  },
  {
    strategy: 'Implementation intentions (if-then planning)',
    applicable_to: 'All types — especially J types',
    mechanism: '"Khi X xảy ra, mình sẽ làm Y." Specific trigger + specific action reduces decision friction.',
    best_for: 'ISTJ, ISFJ, ESTJ, ESFJ — all J types',
    source: 'Gollwitzer (1999) meta-analysis: implementation intentions double goal achievement rates [R].',
    confidence: '[R]' as const,
  },
  {
    strategy: 'Body doubling',
    applicable_to: 'Especially effective for NP types và introverts',
    mechanism: 'Presence of another person (silent or working) increases task completion. Common in ADHD communities.',
    best_for: 'INFP, INTP, ENFP — types that struggle with solo sustained work',
    source: 'ADHD community practice. Some research support (Juarez et al. 2016 [P]).',
    confidence: '[P]' as const,
  },
  {
    strategy: 'Temptation bundling (Katy Milkman)',
    applicable_to: 'Sensing/Perceiving types',
    mechanism: 'Pair dreaded task với something enjoyable (podcast while doing admin). Makes aversive task palatable.',
    best_for: 'ESFP, ESTP, ENFP — pleasure-seeking types',
    source: 'Milkman et al. (2021) PNAS: temptation bundling increases exercise attendance [R]. Applied to procrastination.',
    confidence: '[R]' as const,
  },
  {
    strategy: 'Emotional acceptance (Pychyl/Sirois)',
    applicable_to: 'Feeling types especially',
    mechanism: 'Procrastination = emotion regulation. Accept the discomfort rather than avoiding it → reduces avoidance.',
    best_for: 'INFP, INFJ, ISFP, ENFP — types that procrastinate from emotion avoidance',
    source: 'Sirois & Pychyl (2013) "Procrastination and the Priority of Short-Term Mood Regulation." [R]',
    confidence: '[R]' as const,
  },
]

// Key research finding for TNCB
export const RESEARCH_SUMMARY = {
  mbtiProcrastinationRanking: {
    highestProcrastinators: ['INTP', 'ENTP', 'INFP', 'ENFP'],
    lowestProcrastinators: ['ESFP', 'ISFJ', 'ENFJ', 'ISTJ'],
    mechanism: 'NP types overthink; J types efficiency focus reduces delay',
    source: 'Liu et al. (2024) wepub.org — MBTI × procrastination study, Chinese college students',
    confidence: '[R]' as const,
    limitation: 'Single university sample (China) — generalizability limited. But aligns with Big Five data.',
  },
  bigFiveProcrastinationPredictors: {
    strongest: 'Low Conscientiousness → highest procrastination (multiple studies, consistent finding)',
    secondary: 'High Neuroticism → more passive procrastination',
    openness: 'Complex relationship — high Openness may increase procrastination via distraction/overthinking',
    source: 'Van Eerde (2003) ScienceDirect meta-analysis. Multiple replication studies 2020-2023.',
    confidence: '[R]' as const,
  },
}

export const BATCH2_NOTES = `
KEY RESEARCH USED:

1. Liu et al. (2024) MBTI × Procrastination [R]:
   Most procrastinate: INTP, ENTP, INFP
   Least procrastinate: ESFP, ISFJ, ENFJ
   Mechanism: NP overthink; J efficiency focus
   Limitation: Single Chinese university sample

2. Big Five × Procrastination — Conscientiousness [R]:
   Van Eerde (2003) meta-analysis. Conscientiousness = strongest, consistent predictor.
   Low C → high procrastination across multiple studies 1990s-2023.

3. Fear of failure + perfectionism [R]:
   Ferrari (1992), Solomon & Rothblum (1984).
   Shame avoidance = core mechanism for NT perfectionist types.

4. Emotion regulation as procrastination [R]:
   Sirois & Pychyl (2013): procrastination = short-term mood regulation strategy.
   Best explains F types (INFP, ENFP, ISFP) procrastination.

5. Implementation intentions [R]:
   Gollwitzer (1999): if-then planning doubles goal achievement.
   Applied to J types especially.

GAPS:
- Type-specific procrastination mechanisms: mostly [P]/[S] — no large-scale MBTI procrastination studies
- Liu 2024 is small/single-sample — treat as [R] with caveat
- Micro-actions: synthesized from BJ Fogg Tiny Habits + type psychology [S]
- All type-specific strategies: [P]/[S] — not directly validated for specific MBTI types
`
