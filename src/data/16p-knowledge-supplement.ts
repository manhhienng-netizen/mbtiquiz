/**
 * 16PERSONALITIES KNOWLEDGE — SUPPLEMENT
 * Bổ sung cho 16p-knowledge-distilled.ts
 * Nguồn fetch: 4 articles mới (2026)
 *
 * PHẦN 7: CONFLICT RESOLUTION — Match + Work
 * PHẦN 8: HEALTH HABITS — Assistant wellness nudges
 * PHẦN 9: TEAM BUILDING QUESTIONS — Work module
 */

// ============================================================
// PHẦN 7: CONFLICT RESOLUTION
// Nguồn:
//   /articles/exploring-relationship-conflict-through-the-lens-of-personality-type
//   /articles/back-to-harmony-resolving-relationship-conflicts-with-thinking-personality-types
//   /articles/a-path-to-peace-resolving-relationship-conflicts-with-feeling-personality-types
// ============================================================

/**
 * BỘ TỨ NGUY HIỂM (Four Horsemen - Gottman Institute)
 * Nghiên cứu trên hàng triệu cặp đôi — phân biệt được couple healthy vs unhealthy
 * ~80% couples có conflict patterns ổn định; 69% vấn đề không bao giờ giải quyết được
 * → Chấp nhận điều đó, học cách navigate thay vì "fix"
 */
export const FOUR_HORSEMEN = {
  defensiveness: {
    mô_tả: "Phản ứng tự vệ: phủ nhận trách nhiệm, đổ lỗi ngược lại",
    tỉ_lệ: "81% mọi người dùng defensiveness khi conflict — phổ biến nhất",
    theo_type: {
      // Thinking types cao hơn — dễ justify logic của mình
      T_types: "Dễ defend bằng logic: 'Tôi làm đúng vì...'",
      F_types: "Dễ defend bằng cảm xúc: 'Anh/chị không hiểu tôi cảm thấy thế nào'",
    },
    antidote: "Nhận trách nhiệm — lắng nghe concern của đối phương trước khi phản biện",
    ví_dụ_tốt: "Thay 'Tôi làm vậy vì...' → 'Tôi hiểu điều đó làm bạn cảm thấy X. Phần của tôi trong chuyện này là...'",
  },

  criticism: {
    mô_tả: "Chỉ trích con người, không phải hành vi: tấn công tính cách/phẩm chất",
    theo_role: {
      Analysts: "79% Analysts dùng criticism — cao nhất trong 4 roles",
      Diplomats: "70% — nhưng thường wrap trong ngôn ngữ mềm hơn",
      Sentinels: "Ít hơn — nhưng có thể rigid với tiêu chuẩn",
      Explorers: "Ít nhất — hay stonewall hơn là criticize",
    },
    theo_trait: "Thinking > Feeling trong việc criticize (79% vs 70%)",
    antidote: "Dùng 'I statement' thay vì 'You statement'",
    ví_dụ_sai: "'Em không bao giờ giúp việc nhà. Em lười và ích kỷ.'",
    ví_dụ_tốt: "'Anh cảm thấy overwhelmed khi thấy việc nhà tích đống. Mình có thể chia nhau không?'",
  },

  contempt: {
    mô_tả: "Khinh thường: chế giễu, coi thường, condescending — toxic nhất",
    theo_trait: "Thinking types: 32% dùng contempt; Feeling types: 20%",
    tại_sao: "T types khó empathize hơn trong lúc conflict → dễ slip into superiority",
    antidote: "Biểu đạt sự trân trọng thay vì khinh thường",
    ví_dụ_tốt: "Thay vì chế giễu sở thích mới → 'Tuyệt khi thấy bạn hứng thú với thứ mới. Mình có thể cùng xem ngân sách không?'",
  },

  stonewalling: {
    mô_tả: "Đóng băng: im lặng, rút lui, không phản hồi",
    theo_role: {
      Explorers: "49% — cao nhất trong 4 roles (ISTP, ISFP, ESTP, ESFP)",
      lý_do: "SP types bị overwhelm bởi emotional intensity → instinctively withdraw",
    },
    theo_trait: {
      Introvert: "Cao hơn Extravert — cần process nội tâm trước",
      Turbulent: "Cao hơn Assertive — cảm xúc mạnh → escape để tránh overwhelm",
    },
    antidote: "Xin nghỉ 20 phút (soothing activity), cam kết quay lại",
    khác_biệt_với_avoidance: "Break = tạm dừng có cam kết; Stonewalling = rút lui không hẹn ngày quay lại",
  },
}

/**
 * CONFLICT STYLE THEO TRAIT — Dùng cho Match compatibility insights
 */
export const CONFLICT_BY_TRAIT = {
  // Thinking vs Feeling — căng thẳng phổ biến nhất trong relationships
  T_in_conflict: {
    phản_ứng_tự_nhiên: [
      "Muốn tách cảm xúc ra khỏi vấn đề",
      "Focus vào facts của những gì đã xảy ra",
      "Cần sắp xếp mọi thứ theo logic trước khi open up",
      "Argumentative responses thực ra che giấu cảm xúc như insecurity hoặc hurt",
      "Defensiveness có thể là remorse không biết cách express",
    ],
    cách_tiếp_cận_hiệu_quả: [
      "Đừng demand họ show specific emotional response — sẽ force fake emotionality",
      "Lay out facts rõ ràng → mời họ cùng tìm giải pháp (speaks to their logic)",
      "Cho họ không gian process — đừng assault bằng emotion liên tục",
      "Actions của họ speak louder than words — tin vào điều đó",
      "Tình yêu của T types có thể là acts of service hoặc practical support",
    ],
    sai_lầm_phổ_biến: "Nghĩ rằng T types không quan tâm vì không biểu lộ cảm xúc rõ",
  },

  F_in_conflict: {
    phản_ứng_tự_nhiên: [
      "Cảm xúc là gateway — phải được acknowledge trước khi có thể lý trí",
      "Dù cite sự kiện, thực ra đang nói về cảm xúc của mình",
      "Cần biết rằng cảm xúc của mình quan trọng với đối phương",
      "Strong emotions có thể contagious — đối phương dễ bị drawn in",
    ],
    cách_tiếp_cận_hiệu_quả: [
      "Genuinely tìm hiểu emotional state của họ trước khi vào problem-solving",
      "Verbally affirm tình cảm và sự tôn trọng ngay cả trong lúc conflict",
      "Lắng nghe và nói chuyện respectfully — họ sense được what's in your heart",
      "Reaffirm điều tốt đẹp giữa hai người để có thể move forward",
      "Đừng expect họ 'downplay' cảm xúc — đó là phần cốt lõi của họ",
    ],
    sai_lầm_phổ_biến: "Vào problem-solving mode trước khi F type đã được nghe và hiểu",
  },

  E_vs_I: {
    Extravert: "76% prefer confronting conflict head-on; cần verbalize ngay",
    Introvert: "59% prefer head-on; nhiều người muốn tránh hoặc xử lý nội tâm trước",
    tension: "E muốn talk it out ngay; I cần time để process — cần negotiate timing",
  },

  stats_đáng_chú_ý: {
    ENTP: "87% ENTP thấy conflict là bình thường — cao nhất; 83% prefer confronting head-on",
    ISFJ: "49% ISFJ prefer avoiding conflict — cao nhất trong các type",
    Explorers_stonewall: "49% Explorers stonewall — cao nhất trong 4 roles",
    universal: "80% mọi người đồng ý conflict là bình thường, không phải dấu hiệu dysfunction",
    perpetual: "69% relationship problems không bao giờ được giải quyết — vì personality differences",
  },
}

/**
 * CONFLICT RESOLUTION PLAYBOOK — Dùng cho Work module (team conflict) + Match
 */
export const CONFLICT_RESOLUTION_PLAYBOOK = {
  // 4 bước phổ quát
  universal_steps: [
    "1. PAUSE — Nếu bị overwhelm, xin break 20 phút (commit quay lại, không stonewall)",
    "2. ACKNOWLEDGE — Xác nhận cảm xúc của đối phương trước khi defend bản thân",
    "3. I STATEMENT — 'Tôi cảm thấy X khi Y xảy ra' thay vì 'Bạn luôn/không bao giờ Z'",
    "4. COLLABORATE — Cùng tìm giải pháp thay vì prove ai đúng ai sai",
  ],

  // Khi đối diện với từng loại person
  when_working_with: {
    T_partner: [
      "Lay out facts rõ ràng, không emotional flooding",
      "Cho họ time và space để process",
      "Invite họ vào problem-solving: 'Mình cùng tìm cách giải quyết không?'",
      "Appreciate actions của họ dù không nói nhiều bằng lời",
    ],
    F_partner: [
      "Bắt đầu bằng acknowledging cảm xúc: 'Tôi hiểu điều này làm bạn cảm thấy...'",
      "Đừng jump to solutions trước khi họ cảm thấy được nghe",
      "Verbal affirmation quan trọng — nói ra thay vì chỉ nghĩ",
      "Patience với emotional processing — nó là phần của resolution, không phải obstacle",
    ],
    I_partner: [
      "Đừng force immediate response",
      "Cho họ time để think và formulate",
      "Follow up sau 1-2 giờ hoặc hẹn thời gian cụ thể để quay lại",
    ],
    E_partner: [
      "Engage với conversation sớm — họ cần verbalize để process",
      "Đừng im lặng quá lâu, họ sẽ fill the void (đôi khi không tốt)",
      "Redirect năng lượng vào constructive direction",
    ],
    Explorer_stonewaller: [
      "Nhận ra stonewalling là overwhelm, không phải lack of care",
      "Propose break rõ ràng: 'Mình nghỉ 20 phút rồi quay lại được không?'",
      "Tránh pursue khi họ đang withdraw — sẽ làm worse",
    ],
  },

  // Cho Work module — conflict giữa đồng nghiệp
  workplace_conflict: {
    T_T_conflict: "Dễ bị stuck vào 'ai đúng về mặt logic' — cần neutral facilitator hoặc data",
    F_F_conflict: "Cảm xúc leo thang nhanh — cần tạo space để both sides feel heard trước",
    T_F_conflict: "T muốn giải quyết vấn đề; F muốn giải quyết cảm xúc trước — cần cả hai",
    key_insight: "Ratio tích cực:tiêu cực = 5:1 trong healthy relationships (Gottman) — apply cho cả work teams",
  },
}

// ============================================================
// PHẦN 8: HEALTH HABITS BY ROLE
// Nguồn: /articles/how-to-stick-with-your-health-goals-by-personality-type
// ============================================================

/**
 * HEALTH MOTIVATION STRATEGY THEO ROLE
 * Dùng cho Assistant wellness nudges — mỗi type cần approach khác nhau
 */
export const HEALTH_BY_ROLE = {
  Analysts: {
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
    core_motivation: "Hiểu WHY — data và research là fuel",
    strength: "Skepticism giúp tránh fad diets và bad advice",
    trap: "Skepticism quá mức → tự nói mình ra khỏi positive changes ('Does it really matter if I skip this workout?')",
    strategy: "Research kỹ về health change muốn thực hiện → giữ statistics sẵn để boost motivation",
    nudge_style: "Đưa data cụ thể, không advice mơ hồ. VD: 'Nghiên cứu X cho thấy resistance training giảm Y% risk...'",
    bonus: "Nếu ai đó đưa ra fad advice, research để chứng minh họ sai — double motivation",
    stat: "72% readers nghĩ họ exercise ít hơn nên; 51% lo lắng nhiều về sức khỏe",
  },

  Diplomats: {
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
    core_motivation: "Feel the joy — cảm xúc tích cực là fuel",
    strength: "Nhạy cảm với cảm xúc → khi exercise feel good thật sự, motivation tự nhiên",
    trap: "'Power through' không work — nếu hoạt động feel awful, họ sẽ quit. Bounce back khó sau negative experiences",
    strategy: "Biến environment của health habits thành beautiful và uplifting — nhạc đẹp, bạn đồng hành, không gian dễ chịu",
    nudge_style: "Gắn với cảm xúc: 'Sau buổi đi bộ hôm nay, bạn cảm thấy thế nào?' thay vì 'Bạn đã đạt mục tiêu steps chưa?'",
    bonus: "Pause để notice joy trong cơ thể — warm in chest, lightness in step — và cultivate feeling đó",
  },

  Sentinels: {
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
    core_motivation: "Be the example — sense of duty và accountability",
    strength: "Sentinels giỏi maintain resolutions nhất — hơn 50% đã maintain indefinitely",
    trap: "Strong sense of duty → deprioritize sức khỏe khi stress ('Phải làm thêm giờ, không có thời gian gym')",
    strategy: "Frame health như example-setting: 'Mình chăm sóc bản thân có phải là cách mình muốn người thân noi theo không?'",
    nudge_style: "Accountability partner hoạt động tốt — họ motivated bởi việc giữ lời hứa",
    bonus: "Không cần feel như cần accountability — nhưng biết ai đó đang xem sẽ boost motivation",
  },

  Explorers: {
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
    core_motivation: "Break the rules — conventional wisdom là thứ để phá",
    strength: "Willingness to go against conventional wisdom → find habits that actually work for them",
    trap: "Least likely role để maintain healthy lifestyle — 'rules' of healthy living feel restrictive",
    strategy: "Frame health goals bằng rules chúng phá vỡ: 'Tôi không cần chạy bộ để fit — tôi sẽ làm weightlifting thay'",
    nudge_style: "Đừng list rules. List options và cho họ chọn cái unconventional: 'Yoga, boxing, dance, hay leo núi?'",
    bonus: "Check với doctor trước khi thay đổi lớn — đây là 1 rule họ nên follow",
    key_insight: "Healthy lifestyle không written in stone — let Explorers find their own version",
  },
}

/**
 * HEALTH NUDGE TEMPLATES — Theo type, ready-to-use
 */
export const HEALTH_NUDGES: Record<string, string[]> = {
  INTJ: [
    "📊 Research shows: người tập 150 phút/tuần sống trung bình 4.5 năm lâu hơn. Đủ data để bắt đầu chưa?",
    "🧠 Bộ não INTJ cần downtime như CPU cần cooling. 7-8 giờ ngủ = 23% tăng cognitive performance.",
    "⚡ Skip workout hôm nay = okay. Skip liên tiếp 3 ngày = habit loop break. Data nói vậy.",
  ],
  INTP: [
    "🔬 Có 47 lý thuyết về optimal morning routine. Nhưng thực ra chỉ cần 1 điều: uống đủ nước.",
    "💡 Thử experiment: sáng mai uống 500ml nước trước khi làm gì khác. Track cảm giác. Report lại.",
    "🛌 Bạn đang nghĩ đến 3 giờ sáng? Melatonin xuất hiện lúc 10pm và giảm khi nhìn màn hình. Fact.",
  ],
  ENTJ: [
    "⏰ Leaders giỏi nhất schedule rest như schedule meetings. Khi nào recovery time trong lịch tuần này?",
    "📈 Peak performance cần recovery. 1 buổi tập quá sức = 3 ngày giảm hiệu suất. Math không ủng hộ overtraining.",
    "🎯 Mục tiêu sức khỏe tuần này là gì? Cụ thể, đo được, có deadline?",
  ],
  ENTP: [
    "🚀 Challenge: 30 ngày không tập theo routine truyền thống. Tự thiết kế regimen riêng. Ai dám?",
    "🔄 Boring workout = quit workout. Đổi 1 activity tuần này — thử điều chưa từng thử.",
    "💬 Bạn đang debate với bản thân về việc có nên tập không. Câu trả lời: cứ đi, debate trong lúc chạy bộ.",
  ],
  INFJ: [
    "🌅 Buổi sáng yên tĩnh của bạn là sacred time. 10 phút stretch nhẹ vào lúc đó — không phải workout, là ritual.",
    "🎵 Tạo playlist đặc biệt chỉ để tập thể dục. Nghe playlist đó = signal cho não là 'giờ recharge'.",
    "🌿 Walks in nature tốt cho INFJ hơn gym — thiên nhiên + movement + solitude = triple recharge.",
  ],
  INFP: [
    "✨ Exercise không phải punishment, là cách honor bản thân. Tìm movement bạn genuinely enjoy.",
    "🎨 Thay vì 'tập gym', thử: dance class, yoga thơ, bơi lội, leo núi — điều gì feel like play?",
    "💜 Self-compassion > self-discipline với INFP. Miss 1 buổi = okay. Miss 3 buổi = check-in gentle, không judge.",
  ],
  ENFJ: [
    "👥 Mời ai đó cùng tập với bạn tuần này — bạn sẽ motivated hơn khi giúp người khác giữ commitment.",
    "⚠️ Nhắc nhở: bạn đang chăm sóc mọi người. Ai đang chăm sóc bạn? Schedule me-time ngay hôm nay.",
    "🌟 Healthy ENFJ = người có thể tiếp tục give. Empty cup không pour được. Recharge là nhiệm vụ.",
  ],
  ENFP: [
    "🎉 Thử challenge 7 ngày: mỗi ngày 1 form of movement khác nhau. Boring = quit ngay.",
    "🎵 Workout playlist = mandatory. Không có nhạc = không có workout cho ENFP. Scientific fact (theo ENFP).",
    "⚡ Bắt đầu nhỏ đến mức buồn cười: 5 phút. Dễ đến mức không thể không làm. ENFP cần quick wins.",
  ],
  ISTJ: [
    "📅 Đặt workout vào lịch như meeting. Fixed time = không phải quyết định mỗi ngày = dễ hơn.",
    "✅ Streak counter hoạt động tốt với ISTJ. App nào bạn đang dùng để track habits?",
    "😤 Nhắc nhở: rest day là part of the plan, không phải vi phạm plan. Schedule nó vào.",
  ],
  ISFJ: [
    "👨‍👩‍👧 Frame sức khỏe như example cho người thân: 'Mình muốn con thấy ba/mẹ tự chăm sóc bản thân.'",
    "🤝 Accountability partner giúp ISFJ nhiều — không phải vì cần, mà vì không muốn làm người kia thất vọng.",
    "🛁 Self-care reminder: bạn không thể pour from empty cup. Hôm nay bạn đã làm gì cho bản thân?",
  ],
  ESTJ: [
    "📊 Treat sức khỏe như KPI: sleep 7.5h, steps 8000, water 2L. Track tuần này.",
    "🏆 Bạn set example cho team. Healthy leader = healthy team culture. Bắt đầu từ bản thân.",
    "⏱️ 30 phút workout = 2% of your day. ROI: better focus, ít sick days, longer career. Math đơn giản.",
  ],
  ESFJ: [
    "👫 Propose group walk với friends hoặc family tuần này — vừa social vừa healthy.",
    "💪 Nhắc nhở: chăm sóc bản thân không phải ích kỷ. Đó là cách bạn tiếp tục chăm sóc người khác.",
    "🎊 Celebrate small health wins với người thân — sharing makes it real và keeps momentum.",
  ],
  ISTP: [
    "🔧 Treat cơ thể như machine cần maintenance. Minimal effective dose: gì ít nhất mà hiệu quả nhất?",
    "⚡ 5 phút calisthenics buổi sáng. Không setup, không gear, không commute. Pure efficiency.",
    "🎯 Pick 1 physical skill để master: handstand, pull-up, 5km run. Skill > routine cho ISTP.",
  ],
  ISFP: [
    "🌸 Tìm movement cảm thấy như art: dance, yoga, bơi lội, leo núi. Không phải exercise, là expression.",
    "☀️ Morning: cửa sổ mở, ánh sáng tự nhiên, stretch nhẹ. Đủ để body biết ngày mới bắt đầu.",
    "🎵 Right music = right movement. Tạo playlist cho energy level từng thời điểm trong ngày.",
  ],
  ESTP: [
    "🏃 High-intensity, short duration = ESTP sweet spot. 20 phút HIIT > 60 phút chạy bộ nhàm chán.",
    "🎮 Gamify: workout challenge với bạn bè, app có leaderboard, bet nhỏ về ai achieve goal trước.",
    "⚡ Energy drink habit? Try: cold water + 5 min walk trước tiên. Thường đủ. Save energy drink cho emergency.",
  ],
  ESFP: [
    "💃 Dance class, Zumba, hoặc bất kỳ thứ gì có nhạc và người khác = ESFP natural habitat.",
    "🎉 Make getting ready for workout = event. Outfit, playlist, hype yourself. The process = the motivation.",
    "📸 Share healthy habits với bạn bè — accountability qua social energy, không phải guilt.",
  ],
}

// ============================================================
// PHẦN 9: TEAM BUILDING QUESTIONS — Work module
// Nguồn: /articles/40-fun-team-building-questions-to-reveal-personality-types-and-work-styles
// ============================================================

/**
 * 40 CÂU HỎI TEAM BUILDING — Đã dịch và categorize
 * Dùng cho: Work module icebreakers, team check-in, onboarding
 * Key insight: MIT research — teams perform better với meaningful conversations, không chỉ quick check-ins
 */
export const TEAM_BUILDING_QUESTIONS = {

  // Nhóm 1: Tâm lý an toàn & trust
  psychological_safety: {
    mục_đích: "Mời vulnerability nhẹ nhàng, xây camaraderie và trust",
    tiết_lộ: "Cách khác nhau personalities muốn connect và được recognize",
    câu_hỏi: [
      "Nếu phong cách làm việc của bạn có warning label, nó sẽ viết gì?",
      "Project mơ ước của bạn là gì? Loại mà thứ Hai sáng cảm thấy exciting?",
      "Bạn giỏi điều gì bất ngờ mà không có trong job title?",
      "Nếu có một superpower dành riêng cho công việc, bạn chọn gì và tại sao?",
      "Giá trị nào bạn không thể compromise ở nơi làm việc?",
      "Loại tương tác nào khiến bạn cảm thấy được trân trọng?",
      "Ai đã ảnh hưởng nhiều nhất đến cách bạn tiếp cận công việc?",
      "Nếu công việc có theme song phát khi bạn hoàn thành gì đó, đó là bài nào?",
    ],
  },

  // Nhóm 2: Tư duy chiến lược — N vs S indicator
  strategic_thinking: {
    mục_đích: "Khám phá cách mọi người approach challenges và tương lai",
    tiết_lộ: "N types → conceptual, big-picture; S types → concrete, practical, past experience",
    câu_hỏi: [
      "Nếu team có thể giải quyết 1 vấn đề trong năm tới, đó là gì và tại sao?",
      "Bạn đã nhận ra pattern nào mà người khác có thể bỏ qua?",
      "Điều gì trong ngành bây giờ có vẻ bình thường nhưng sẽ ridiculous sau 5 năm?",
      "Ý tưởng unconventional nào bạn muốn explore nhất?",
      "Nếu có thể redesign 1 khía cạnh cách làm việc của team, bạn thay đổi gì?",
      "Thách thức nào bạn đang vật lộn mà team có thể giúp giải quyết?",
      "Nếu bạn là villain muốn sabotage team, điểm yếu nào bạn khai thác?",
      "Experiment nào bạn đã thử và hoàn toàn thất bại? Chuyện gì đã xảy ra?",
      "Nếu có thể download 1 skill vào não mọi người kiểu Matrix, đó là skill gì?",
    ],
  },

  // Nhóm 3: Kết nối thực tế hàng ngày — S vs N + J vs P
  day_to_day: {
    mục_đích: "Nhận ra strengths tự nhiên và cách engage với thực tế",
    tiết_lộ: "S → concrete examples; N → patterns & possibilities; J → structured; P → adaptive",
    câu_hỏi: [
      "Lời khuyên công việc tốt nhất bạn từng nhận và thực sự hữu ích là gì?",
      "Small win của tuần này là gì? Tại sao đó là 'win'?",
      "Tool hoặc kỹ thuật nào bạn dùng mà người khác có thể thấy hữu ích?",
      "Kể về lần mọi thứ đổ vỡ và bạn phải tự figure out.",
      "Gần đây bạn học được gì thay đổi cách bạn làm việc?",
      "Cải tiến quy trình nào bạn muốn thấy được thực hiện?",
      "Mô tả ngày làm việc hoàn hảo của bạn — từ cà phê đầu tiên đến log off.",
    ],
  },

  // Nhóm 4: Phong cách ra quyết định — T vs F indicator
  decision_making: {
    mục_đích: "Khám phá cách người ta evaluate options và make choices",
    tiết_lộ: "T → logic, efficiency, fairness qua rules; F → values, relationships, morale",
    câu_hỏi: [
      "Khi đối mặt vấn đề phức tạp, bước đầu tiên của bạn là gì?",
      "Bạn cần thông tin gì trước khi đưa ra quyết định quan trọng?",
      "Bạn đã từng chắc chắn về điều gì cho đến khi numbers prove bạn sai chưa?",
      "Principle nào bạn consistently apply khi đánh giá các lựa chọn?",
      "Nếu là giám khảo cooking show, bạn ưu tiên: kỹ thuật hay tâm huyết?",
      "Phải chọn giữa 2 lựa chọn tốt nhưng ai đó sẽ không hài lòng — bạn làm gì?",
      "Factors nào ngoài metrics rõ ràng ảnh hưởng đến lựa chọn của bạn?",
      "Kể về lần quyết định 'đúng trên giấy' nhưng cảm thấy sai vì impact lên mọi người.",
      "Bạn biết solution cảm thấy đúng thế nào — khác với chỉ trông đúng?",
    ],
  },

  // Nhóm 5: Work style preferences — I/E + J/P + A/T
  work_style: {
    mục_đích: "Khám phá cách người ta respond to pressure và communicate ideas",
    tiết_lộ: "I/E: processing style; J/P: structure preference; A/T: stress response",
    câu_hỏi: [
      "Sau meeting cường độ cao, bạn cần gì để recharge?",
      "Khi có ý tưởng chưa hoàn chỉnh, bạn talk it out với người khác hay tự làm việc một mình trước?",
      "Ritual trước meeting của bạn là gì? Hay bạn chỉ show up và wing it?",
      "Khi bị stuck, bạn immediately reach out hay ngồi với vấn đề một lúc?",
      "Vừa xong presentation lớn. Điều đầu tiên bạn nghĩ là gì?",
      "Bạn là nhân vật chính trong phim công việc. Bạn là action hero không gì lay ngã được hay underdog kiên định?",
      "Mối quan hệ của bạn với cụm 'good enough' là gì?",
    ],
  },
}

/**
 * READING THE ANSWERS — Hướng dẫn đọc signal từ câu trả lời
 * Dùng cho manager/HR khi sử dụng team building questions
 */
export const ANSWER_SIGNALS = {
  I_signals: ["Pause trước khi trả lời", "Câu trả lời đã được suy nghĩ kỹ", "Prefer viết hơn nói", "Think first, then share"],
  E_signals: ["Respond ngay lập tức", "Brainstorm real-time", "Câu trả lời evolve khi đang nói", "Think out loud"],
  N_signals: ["Big-picture meaning", "Patterns và future implications", "Conceptual, idea-driven", "Câu hỏi 'What if'"],
  S_signals: ["Anchor vào lived experience", "Practical details", "Proven methods", "Concrete examples từ quá khứ"],
  T_signals: ["Nhấn mạnh logic, efficiency, fairness", "Objective metrics", "'Điều gì có lý nhất'"],
  F_signals: ["Nhấn mạnh values, relationships, morale", "Stakeholder impact", "'Điều gì cảm thấy đúng'"],
  J_signals: ["Step-by-step answers", "Clear priorities", "Comfortable với closure", "Plans và timelines"],
  P_signals: ["Flexible framing", "Openness to options", "Multiple possible routes", "Adapt midstream"],
  A_signals: ["Steady và confident về setbacks", "Emphasize learning và forward motion", "Self-trust"],
  T_turbulent_signals: ["Doubt hoặc worry", "High standards", "Track risks carefully", "Drive to do better"],

  responsible_use: [
    "Tìm broad patterns qua nhiều lần, không phán xét từ 1 câu trả lời",
    "Share observations như invitation cho deeper conversation, không phán quyết",
    "Psychological safety first — goal là hiểu, không phải categorize",
    "Không có trait nào superior — diversity là strength",
    "Mỗi người có thể 'answer out of type' — spectrum, không phải binary",
  ],
}

/**
 * TEAM BUILDING QUICK-USE GUIDE
 * Format: Tuần nào, dùng câu nào
 */
export const TEAM_BUILDING_ROTATION = {
  week_1: { category: "psychological_safety", câu_số: [1, 5], mục_tiêu: "Trust foundation" },
  week_2: { category: "work_style", câu_số: [1, 2], mục_tiêu: "I/E động lực hiểu nhau" },
  week_3: { category: "decision_making", câu_số: [4, 5], mục_tiêu: "T/F dynamics" },
  week_4: { category: "strategic_thinking", câu_số: [1, 3], mục_tiêu: "N/S tư duy hiểu nhau" },
  month_2: { category: "day_to_day", mục_tiêu: "Practical strengths & habits" },
  ongoing: "Rotate qua tất cả 5 categories để build complete picture của team",
}

// ============================================================
// MAPPING VÀO TNCB MODULES
// ============================================================

/**
 * Dùng ngay:
 *
 * TNCB Match:
 *   → FOUR_HORSEMEN → conflict_patterns field trong compatibility report
 *   → CONFLICT_BY_TRAIT.T_in_conflict / F_in_conflict → "Cách resolve xung đột với partner type X"
 *   → CONFLICT_RESOLUTION_PLAYBOOK.when_working_with → situational nudge khi user báo conflict
 *
 * TNCB Work:
 *   → TEAM_BUILDING_QUESTIONS → seed cho Work.icebreaker_bank
 *   → CONFLICT_RESOLUTION_PLAYBOOK.workplace_conflict → HR Guide conflict section
 *   → ANSWER_SIGNALS → Manager guide: đọc personality từ meeting behavior
 *   → TEAM_BUILDING_ROTATION → Work feature: "Câu hỏi tuần này cho team"
 *
 * TNCB Assistant (wellness):
 *   → HEALTH_BY_ROLE → seed cho health_tips theo role
 *   → HEALTH_NUDGES → lookup table, inject theo mbti
 *   → health strategy: Analysts=data, Diplomats=joy, Sentinels=duty, Explorers=rebel
 */
