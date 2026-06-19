/**
 * 16PERSONALITIES KNOWLEDGE BASE — Distilled for TNCB
 * Sources: 16personalities.com (articles, theory, blog)
 * Mục đích: Seed data cho daily-practices.ts, situational-nudges.ts, HR Guide
 * Cập nhật: 2026
 *
 * LƯU Ý: Toàn bộ nội dung đã được paraphrase và tái cấu trúc sang tiếng Việt.
 * Không sao chép nguyên văn từ nguồn gốc. Dùng làm tham khảo nội bộ cho TNCB.
 */

// ============================================================
// PHẦN 1: FRAMEWORK — 5 CHIỀU TÍNH CÁCH (NERIS Model)
// Nguồn: /articles/our-theory
// ============================================================

export const NERIS_FRAMEWORK = {
  dimensions: {
    energy: {
      name: "Năng lượng",
      poles: {
        I: {
          label: "Hướng nội (Introverted)",
          core: "Nạp năng lượng từ sự cô đơn, nhạy cảm với kích thích bên ngoài",
          strength: "Lắng nghe sâu, tự chi省, tập trung cao",
          challenge: "Dễ kiệt sức khi tương tác xã hội kéo dài",
          stat: "80% Introvert thấy thời gian một mình thú vị hơn thời gian với người khác",
        },
        E: {
          label: "Hướng ngoại (Extraverted)",
          core: "Nạp năng lượng từ tương tác xã hội, thích khám phá môi trường",
          strength: "Chủ động, giao tiếp tốt, truyền năng lượng cho người khác",
          challenge: "Khó chịu khi bị một mình, dễ hành động thiếu suy nghĩ",
          stat: "87% Extravert tin mình có tố chất lãnh đạo",
        },
      },
    },
    mind: {
      name: "Tư duy",
      poles: {
        N: {
          label: "Trực giác (Intuitive)",
          core: "Tập trung vào khả năng, ý nghĩa ẩn, tương lai",
          strength: "Sáng tạo, cởi mở, thích khám phá ý tưởng mới",
          challenge: "Dễ bỏ qua thực tế, thiếu kiên nhẫn với chi tiết",
        },
        S: {
          label: "Thực tế (Observant)",
          core: "Tập trung vào hiện thực, dữ kiện, những gì đã xảy ra",
          strength: "Thực dụng, đáng tin cậy, chú ý chi tiết",
          challenge: "Khó thích nghi với thay đổi đột ngột, ít mạo hiểm",
        },
      },
    },
    nature: {
      name: "Bản chất",
      poles: {
        T: {
          label: "Lý trí (Thinking)",
          core: "Ra quyết định dựa trên logic, khách quan, hiệu quả",
          strength: "Phân tích sắc bén, không bị cảm xúc chi phối",
          challenge: "Dễ bị coi là lạnh lùng, khó đồng cảm",
          workplace: "Ưu tiên hiệu quả hơn sự hài lòng của mọi người",
        },
        F: {
          label: "Cảm xúc (Feeling)",
          core: "Ra quyết định dựa trên giá trị, đồng cảm, hòa hợp",
          strength: "Đồng cảm cao, xây dựng mối quan hệ tốt",
          challenge: "Dễ bị tổn thương, khó đưa ra quyết định khó",
          workplace: "Ưu tiên hòa hợp nhóm hơn kết quả tức thì",
        },
      },
    },
    tactics: {
      name: "Chiến thuật",
      poles: {
        J: {
          label: "Ngăn nắp (Judging)",
          core: "Thích kế hoạch, cấu trúc, sự chắc chắn",
          strength: "Tổ chức tốt, đáng tin cậy, hoàn thành đúng hạn",
          challenge: "Khó linh hoạt, căng thẳng khi kế hoạch thay đổi",
          habit: "Thích đặt báo thức sớm hơn là thức khuya khi có deadline",
        },
        P: {
          label: "Linh hoạt (Prospecting)",
          core: "Thích ứng biến, giữ lựa chọn mở, tự phát",
          strength: "Linh hoạt, sáng tạo trong tình huống bất ngờ",
          challenge: "Hay trì hoãn, khó duy trì thói quen",
          habit: "Thích ngẫu hứng hơn lên kế hoạch trước",
        },
      },
    },
    identity: {
      name: "Bản sắc",
      poles: {
        A: {
          label: "Tự tin (Assertive)",
          core: "Tự tin vào quyết định, ít lo lắng về hiệu suất",
          strength: "Bình tĩnh dưới áp lực, không tự phán xét quá mức",
          challenge: "Đôi khi thiếu động lực để cải thiện",
        },
        T: {
          label: "Cầu toàn (Turbulent)",
          core: "Nhạy cảm với thất bại, luôn tìm cách hoàn thiện",
          strength: "Động lực cao, luôn muốn tốt hơn",
          challenge: "Dễ stress, tự chỉ trích quá mức",
          note: "Turbulent types thường dùng shortcuts/workarounds hơn vì áp lực hiệu suất",
        },
      },
    },
  },

  roles: {
    Analysts: {
      types: ["INTJ", "INTP", "ENTJ", "ENTP"],
      core: "Lý trí + Trực giác — tư duy hệ thống, độc lập, chiến lược",
      strength: "Tranh luận trí tuệ, khoa học, công nghệ",
      challenge: "Kết nối cảm xúc, quan hệ xã hội",
      workStyle: "Hiệu quả > hài lòng mọi người, thích làm việc thông minh hơn cần cù",
    },
    Diplomats: {
      types: ["INFJ", "INFP", "ENFJ", "ENFP"],
      core: "Cảm xúc + Trực giác — đồng cảm, lý tưởng, hợp tác",
      strength: "Tư vấn, lãnh đạo truyền cảm hứng, hòa giải",
      challenge: "Quyết định khó, đặt giới hạn, không lấy lòng tất cả",
      workStyle: "Quan tâm tác động đến con người, dễ kiệt sức vì người khác",
    },
    Sentinels: {
      types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
      core: "Thực tế + Ngăn nắp — trật tự, ổn định, trách nhiệm",
      strength: "Hành chính, logistics, tuân thủ quy trình",
      challenge: "Linh hoạt với thay đổi, sáng tạo ngoài khuôn khổ",
      workStyle: "Đáng tin cậy, làm đúng hạn, tuân thủ quy tắc",
    },
    Explorers: {
      types: ["ISTP", "ISFP", "ESTP", "ESFP"],
      core: "Thực tế + Linh hoạt — thực hành, tự phát, thích nghi",
      strength: "Xử lý khủng hoảng, kỹ năng thực hành, bán hàng",
      challenge: "Kế hoạch dài hạn, ổn định, bỏ qua chi tiết tẻ nhạt",
      workStyle: "Hành động trước, sửa sau — thích giải quyết vấn đề tức thì",
    },
  },

  strategies: {
    ConfidentIndividualism: {
      pattern: "I___-A",
      core: "Tự lực, tin tưởng bản thân, ít quan tâm ý kiến người khác",
    },
    PeopleMastery: {
      pattern: "E___-A",
      core: "Tự tin trong giao tiếp xã hội, chủ động kết nối",
    },
    ConstantImprovement: {
      pattern: "I___-T",
      core: "Hoàn hảo chủ nghĩa, hay lo lắng về hiệu suất, luôn muốn tốt hơn",
    },
    SocialEngagement: {
      pattern: "E___-T",
      core: "Năng động xã hội nhưng nhạy cảm với phản hồi, cần được công nhận",
    },
  },
}

// ============================================================
// PHẦN 2: GROWTH AREAS — Vùng phát triển theo từng type
// Nguồn: /articles/quick-guide-to-personality-types-and-personal-growth-goals
// ============================================================

export const GROWTH_AREAS: Record<string, {
  coreChallenge: string
  growthFocus: string
  practicalStart: string
  avoidTrap: string
}> = {
  INTJ: {
    coreChallenge: "Khó kết nối cảm xúc và hình thành mối quan hệ",
    growthFocus: "Trí tuệ cảm xúc, kỹ năng xã hội, lắng nghe không phán xét",
    practicalStart: "Thử 1 hoạt động xã hội mới thay vì corner quen thuộc",
    avoidTrap: "Áp tiêu chuẩn của mình lên người khác",
  },
  INTP: {
    coreChallenge: "Khó tin tưởng, hy sinh, gắn kết cộng đồng",
    growthFocus: "Xây dựng sự thuộc về, học cách cho đi và nhận lại",
    practicalStart: "Tham gia 1 nhóm/lớp học với mục đích tương tác, không chỉ học",
    avoidTrap: "Suy nghĩ quá mức — 47 cách nhìn một vấn đề không giúp giải quyết nó",
  },
  ENTJ: {
    coreChallenge: "Ít nhạy cảm với cảm xúc người khác, ít tự phản chiếu nội tâm",
    growthFocus: "Đồng cảm chủ động, lắng nghe tích cực",
    practicalStart: "Thực hành active listening — hỏi cảm xúc trước khi đưa giải pháp",
    avoidTrap: "Phán xét người khác vì không đáp ứng tiêu chuẩn — thay bằng vai trò mentor",
  },
  ENTP: {
    coreChallenge: "Thiếu ổn định, hay trì hoãn, thay đổi liên tục",
    growthFocus: "Xây dựng ít nhất 1-2 thứ ổn định như nền tảng",
    practicalStart: "Thiết lập 1 thói quen sáng duy nhất và duy trì 30 ngày",
    avoidTrap: "Tranh luận mọi thứ — đôi khi hợp tác quan trọng hơn đúng",
  },
  INFJ: {
    coreChallenge: "Dễ rơi vào pleasing người khác, xung đột nội tâm giữa lý tưởng và thực tế",
    growthFocus: "Assertiveness — sống đúng với bản thân mà không làm tổn thương người khác",
    practicalStart: "Nhận diện 1 điều bạn muốn nói nhưng đang im — nói ra",
    avoidTrap: "Giả định mọi người sẽ tự tìm ra — đôi khi cần chủ động hướng dẫn",
  },
  INFP: {
    coreChallenge: "Thiếu tự tin, khó hành động vì sợ thất bại",
    growthFocus: "Xây dựng confidence thông qua hành động nhỏ, không chờ 'sẵn sàng'",
    practicalStart: "Chú ý cách bạn nói chuyện với chính mình — thay self-criticism bằng self-compassion",
    avoidTrap: "Đến từ emotional place trong công việc — bước lùi, xem xét cảm xúc trước khi phản ứng",
  },
  ENFJ: {
    coreChallenge: "Chăm sóc mọi người nhưng bỏ quên bản thân, compassion fatigue",
    growthFocus: "Tạo ranh giới để tự phục hồi — 'Tôi không thể rót từ chiếc cốc rỗng'",
    practicalStart: "Lên lịch 'me time' cụ thể mỗi tuần — không thương lượng",
    avoidTrap: "Tránh conflict 'cần thiết' — đôi khi đối đầu là cần thiết và đúng đắn",
  },
  ENFP: {
    coreChallenge: "Thiếu kỷ luật tự giác, dễ phân tâm, khó duy trì cam kết",
    growthFocus: "Hiểu rằng kỷ luật trong 1 vài thứ = tự do trong nhiều thứ khác",
    practicalStart: "Chọn 1 việc boring nhưng quan trọng và làm đến cùng tuần này",
    avoidTrap: "Mất tập trung — có nhiều ý tưởng hay nhưng dừng lại khi cần giao việc hiện tại",
  },
  ISTJ: {
    coreChallenge: "Quá cứng nhắc, dễ focus vào lỗi người khác hơn điểm mạnh",
    growthFocus: "Từ bi, tha thứ, tolerance — người khác có cách làm việc khác không kém hiệu quả",
    practicalStart: "Tuần này, khen 1 đồng nghiệp trước khi đưa ra phản hồi",
    avoidTrap: "Bị cuốn theo áp lực của người có ảnh hưởng — tìm điều nuôi dưỡng bạn thật sự",
  },
  ISFJ: {
    coreChallenge: "Sống quá thận trọng, bỏ lỡ cơ hội vì ngại rủi ro",
    growthFocus: "Đưa thêm tự phát vào cuộc sống — healthy risk, không phải liều lĩnh",
    practicalStart: "Làm 1 điều không có trong kế hoạch tuần này — nhỏ thôi",
    avoidTrap: "Không chăm sóc bản thân vì quá bận chăm sóc người khác — đặt lịch 'me time'",
  },
  ESTJ: {
    coreChallenge: "Quá tập trung vào mục tiêu, bỏ qua con người và hành trình",
    growthFocus: "Mở rộng ngôn ngữ cảm xúc, tôn trọng cách người khác xử lý cảm xúc",
    practicalStart: "Nhìn lại 1 ngày làm việc hôm nay — điều gì thú vị, không phải chỉ điều gì đạt được",
    avoidTrap: "Quên làm quen với đồng nghiệp — họ không chỉ là quân cờ",
  },
  ESFJ: {
    coreChallenge: "Quá phụ thuộc vào điều đã biết, ngại thay đổi",
    growthFocus: "Thêm tò mò vào suy nghĩ — khám phá thay vì chỉ xác nhận điều đã biết",
    practicalStart: "Đọc 1 bài về chủ đề bạn không quen và share với ai đó",
    avoidTrap: "Trở thành 'cảnh sát quy tắc' với đồng nghiệp — trừ khi đó là công việc bạn",
  },
  ISTP: {
    coreChallenge: "Quá độc lập, bỏ qua kết nối xã hội và dài hạn",
    growthFocus: "Học kỹ năng kết nối như một kỹ năng — có thể luyện tập và cải thiện",
    practicalStart: "Check-in với 1 đồng nghiệp ngẫu nhiên hôm nay — không có mục đích cụ thể",
    avoidTrap: "Quên hỏi trước khi làm — 'xin phép dễ hơn xin tha thứ' không phải luôn đúng",
  },
  ISFP: {
    coreChallenge: "Thiếu mục đích rõ ràng, dễ trở nên lơ lửng không phương hướng",
    growthFocus: "Tìm 1 điều để thức dậy vì — passion có thể là ngọn đèn",
    practicalStart: "Viết ra 3 điều bạn muốn làm trước khi chết — không quan trọng nhỏ hay lớn",
    avoidTrap: "Chia sẻ lý do đằng sau sản phẩm/hành động của mình — câu chuyện là một phần của quà tặng",
  },
  ESTP: {
    coreChallenge: "Thích rủi ro đến mức thiếu ổn định chiến lược",
    growthFocus: "Học đánh giá chi phí rủi ro một cách có ý thức — không phải không mạo hiểm, mà mạo hiểm thông minh",
    practicalStart: "Trước quyết định lớn tiếp theo — dừng 10 phút viết ra downside thực sự",
    avoidTrap: "Bulldozing — năng lượng mạnh + quyết đoán dễ làm người khác cảm thấy bị áp đảo",
  },
  ESFP: {
    coreChallenge: "Sống cho hiện tại, thiếu chuẩn bị cho tương lai",
    growthFocus: "Học yêu 'drudgery' của việc chăm sóc tương lai — hành chính nhàm chán bây giờ = tự do sau",
    practicalStart: "Hôm nay xử lý 1 việc boring bạn đang trì hoãn — 15 phút",
    avoidTrap: "Bỏ qua chi tiết nhàm chán — họ quan trọng và thường là điều quyết định thành công",
  },
}

// ============================================================
// PHẦN 3: MORNING ROUTINE — Thói quen buổi sáng theo type
// Nguồn: /articles/morning-routine-styles-by-personality-type
// ============================================================

export const MORNING_STYLES: Record<string, {
  label: string
  description: string
  naturalPattern: string
  nudge: string
}> = {
  INTJ: {
    label: "Kỹ sư hệ thống",
    description: "Có protocol buổi sáng được tối ưu hóa — cà phê đúng giờ, ăn sáng giống nhau mỗi ngày",
    naturalPattern: "Cứng nhắc nhưng hiệu quả — mọi thứ đã được test và tinh chỉnh",
    nudge: "Đừng nói chuyện với INTJ trước khi họ uống xong cà phê ☕",
  },
  INTP: {
    label: "Người đến muộn",
    description: "Không phải người buổi sáng — khoảng cách từ chuông báo thức đến khi hoàn toàn tỉnh táo có thể chứa vừa một giấc ngủ ngắn",
    naturalPattern: "Nằm scroll điện thoại → cuối cùng dậy → tắm nhanh → ra ngoài",
    nudge: "INTP cần đặt cà phê gần giường 🛏️",
  },
  ENTJ: {
    label: "Tướng quân trước bình minh",
    description: "Dậy trước chuông, tập thể dục trước khi người khác mở mắt, check email trong khi ăn sáng đã chuẩn bị từ Chủ nhật",
    naturalPattern: "7 giờ sáng = đã có lợi thế cả ngày",
    nudge: "ENTJ: buổi sáng không phải để thức dậy, mà để bắt đầu lead 🏃",
  },
  ENTP: {
    label: "Người ứng biến",
    description: "Không có cấu trúc nhưng đầy tự tin — bắt đầu pha cà phê, bị distract bởi ý tưởng, quay lại 15 phút sau",
    naturalPattern: "Chìa khóa? Ở đâu đó. Túi? Đang tìm. Entryway được tạo ra trong hỗn loạn có kiểm soát",
    nudge: "ENTP: set 1 reminder cho chìa khóa thôi là đủ 🗝️",
  },
  INFJ: {
    label: "Người thực hành yên tĩnh",
    description: "Không vội vàng nếu có thể — trà nóng, vài phút viết nhật ký, nhìn ra cửa sổ trước khi bước vào thế giới",
    naturalPattern: "Nhịp điệu nhất quán — không cần ai nhắc, bản thân đã dậy đúng giờ",
    nudge: "INFJ cần buổi sáng để 'thu thập' bản thân trước khi ra ngoài 🌅",
  },
  INFP: {
    label: "Người thức chậm",
    description: "Quá trình từ ngủ sang thức kéo dài hơn bất kỳ type nào — dreamworld thật sự thú vị hơn",
    naturalPattern: "Cần nhạc hoặc podcast đẹp để chuyển đổi — ăn sáng khi nào thì ăn",
    nudge: "INFP: chuẩn bị playlist buổi sáng tối hôm trước 🎵",
  },
  ENFJ: {
    label: "Người truyền động lực buổi sáng",
    description: "Dậy sẵn sàng làm việc — và có thể giúp mọi người xung quanh làm việc. Ăn sáng cho cả nhà, check xem ai cần gì",
    naturalPattern: "Năng lượng buổi sáng quyết định năng lượng cả ngày — workout hoặc playlist vui",
    nudge: "ENFJ: nhớ cũng làm điều gì đó cho bản thân, không chỉ cho người khác 🌟",
  },
  ENFP: {
    label: "DJ tâm trạng",
    description: "Không có routine cố định vì làm đi làm lại một thứ = nhàm chán. Nhưng nhạc là bắt buộc",
    naturalPattern: "Toast vào lò rồi quên — có thể tự phát sắp xếp lại phòng tắm lúc 7:15",
    nudge: "ENFP: đặt báo thức 'cho bánh mì' 🍞",
  },
  ISTJ: {
    label: "Người cài đồng hồ",
    description: "Cùng một chuông, cùng thứ tự, cùng mọi thứ mỗi ngày. Cà phê hẹn giờ trước khi dậy. Chìa khóa luôn ở 1 chỗ",
    naturalPattern: "Tại sao lại thay đổi thứ đã hoạt động hoàn hảo trong 10 năm?",
    nudge: "ISTJ: đã perfection rồi — chỉ cần nói 'cảm ơn' với bản thân 🔑",
  },
  ISFJ: {
    label: "Neo nhà",
    description: "Cẩn thận và quan tâm — chuẩn bị bữa trưa cho mọi người, check thời tiết, đảm bảo không ai thiếu gì khi ra ngoài",
    naturalPattern: "Routine ấm áp và dự đoán được — luôn có trà nóng",
    nudge: "ISFJ: hôm nay ai đó nên chuẩn bị thứ gì đó cho bạn 🫖",
  },
  ESTJ: {
    label: "Huấn luyện viên",
    description: "Buổi sáng cấu trúc nhất trong 16 type — giờ ngủ cố định, chuông cố định, không thương lượng",
    naturalPattern: "Đã trả lời 2 email và review lịch trước khi cả nhà thức",
    nudge: "ESTJ: đôi khi ngủ thêm 30 phút cũng okay 📅",
  },
  ESFJ: {
    label: "Người dậy sớm vui vẻ",
    description: "Dậy trước chuông nhờ đồng hồ sinh học. Cảm giác về ngày bắt đầu từ buổi sáng — không thể vội vàng",
    naturalPattern: "Check-in với mọi người: 'Ngủ ngon không?' + cà phê + texting nếu ở một mình",
    nudge: "ESFJ: buổi sáng tốt = ngày tốt — đừng để ai rush bạn ☀️",
  },
  ISTP: {
    label: "Người 5 phút phẳng",
    description: "Không type nào làm buổi sáng với ít nghi lễ hơn ISTP. Cà phê đen, thức ăn optional, không nhạc",
    naturalPattern: "Ra khỏi nhà trong thời gian người khác chọn ngũ cốc",
    nudge: "ISTP: đôi khi ăn sáng thật sự cải thiện hiệu suất 🥚",
  },
  ISFP: {
    label: "Hoa nở chậm",
    description: "Cần buổi sáng nhẹ nhàng — dậy sớm cảm giác sai về mặt vật lý. Trà phải đúng nhiệt độ, ánh sáng phải vừa phải",
    naturalPattern: "Chuyển đổi qua các giác quan — mọi thứ từ ánh sáng đến nhiệt độ đều là phần của quá trình",
    nudge: "ISFP: chuẩn bị tách trà tối hôm trước để sáng chỉ cần rót nước ☕",
  },
  ESTP: {
    label: "Người pit-stop",
    description: "Buổi sáng = trạm dừng — xử lý thiết yếu, ra ngoài. Ăn sáng = cầm tay đi",
    naturalPattern: "Energy drink > pour-over. Không nghi lễ, không routine. Speed run",
    nudge: "ESTP: không cần chuẩn bị gì tối hôm trước — nhưng ít nhất biết chìa khóa ở đâu 🚀",
  },
  ESFP: {
    label: "Ngôi sao buổi sáng",
    description: "Chuẩn bị = màn trình diễn mở đầu. Tắm = hát. Gương = buổi biểu diễn đầy đủ. Nhạc = bật to để nhảy",
    naturalPattern: "Muốn ngủ thêm VÀ muốn có thời gian cho 'cả quy trình' — tạo ra tension hàng ngày",
    nudge: "ESFP: bạn luôn trông tuyệt — quy trình thắng 🎭",
  },
}

// ============================================================
// PHẦN 4: WORK DO'S & DON'TS — Gợi ý công việc theo type
// Nguồn: /articles/using-your-personality-type-to-improve-your-work-life-this-year
// ============================================================

export const WORK_TIPS: Record<string, {
  doMore: string[]
  doLess: string[]
}> = {
  INTJ: {
    doMore: [
      "Chủ động tiếp cận đồng nghiệp — tính độc lập không có nghĩa là một mình",
      "Coi mỗi người trong team là một 'research project' thú vị",
      "Tìm giá trị trong cách làm việc khác của người khác",
    ],
    doLess: [
      "Áp tiêu chuẩn của mình lên người khác (trừ khi trong job description)",
      "Dismiss ý kiến người khác trước khi nghe xong",
    ],
  },
  INTP: {
    doMore: [
      "Lắng nghe cẩn thận hơn — đặc biệt với các chủ đề 'mềm' về con người",
      "Tò mò về cảm xúc người khác, không chỉ về logic",
    ],
    doLess: [
      "Overthink — đôi khi 1 câu trả lời đơn giản tốt hơn 47 góc nhìn",
      "Biến mọi cuộc thảo luận thành bài tập tư duy lý thuyết",
    ],
  },
  ENTJ: {
    doMore: [
      "Thỉnh thoảng giảm cường độ để người khác theo kịp — đó cũng là leadership",
      "Đóng vai mentor thay vì chỉ trích khi ai đó làm sai",
    ],
    doLess: [
      "Phán xét người không đáp ứng tiêu chuẩn của bạn",
      "Coi team như quân cờ phục vụ mục tiêu của bạn",
    ],
  },
  ENTP: {
    doMore: [
      "Lắng nghe feedback đủ lâu trước khi phản bác",
      "Nhận ra không phải mọi thứ đều cần được thách thức",
    ],
    doLess: [
      "Tranh luận chỉ vì thích tranh luận — đôi khi hợp tác quan trọng hơn đúng",
      "Challenge mọi quyết định trong meeting",
    ],
  },
  INFJ: {
    doMore: [
      "Tiếp cận workplace với Zen-like objectivity — xem thứ đang tồn tại, không chỉ thứ nên tồn tại",
      "Chủ động hướng dẫn khi người khác cần — đừng giả định họ tự tìm ra",
    ],
    doLess: [
      "Giả định rằng tôn trọng sự tự chủ = không bao giờ đưa ra guidance",
      "Sống với quá nhiều 'nên' và kỳ vọng không thực tế",
    ],
  },
  INFP: {
    doMore: [
      "Assertiveness — yêu cầu điều bạn cần, đó không phải là aggressive",
      "Bước lùi trước khi phản ứng từ emotional place",
    ],
    doLess: [
      "Nhầm lẫn gentleness với weakness — bạn có thể tử tế VÀ mạnh mẽ",
      "Để cảm xúc tức thời quyết định hành động dài hạn",
    ],
  },
  ENFJ: {
    doMore: [
      "Mở rộng kỹ năng và exposure — không chỉ là one-trick pony",
      "Đứng lên trong conflict khi cần thiết — không phải mọi xung đột đều nên tránh",
    ],
    doLess: [
      "Tránh mọi xung đột — đôi khi xung đột cần thiết để đạt kết quả tốt",
      "Quá tập trung vào 1 khía cạnh công việc",
    ],
  },
  ENFP: {
    doMore: [
      "Chú ý đến chi tiết nhỏ — 1 chi tiết bỏ qua có thể phá vỡ cả project",
      "Thực hành mindfulness để quay về hiện tại khi bị cuốn vào ý tưởng",
    ],
    doLess: [
      "Để ý tưởng mới trở thành distraction khỏi việc đang làm",
      "Share ý tưởng chưa được filter trong mọi cuộc họp",
    ],
  },
  ISTJ: {
    doMore: [
      "Xây dựng 1-2 mối quan hệ thân thiết tại nơi làm việc — không cần là người vui tính nhất",
      "Tự hỏi: 'Điều gì thật sự nuôi dưỡng mình?' thay vì chỉ làm theo kỳ vọng",
    ],
    doLess: [
      "Bị cuốn theo áp lực của người có ảnh hưởng — đặt câu hỏi thay vì chỉ tuân theo",
      "Identify người với lỗi lầm họ mắc",
    ],
  },
  ISFJ: {
    doMore: [
      "Đặt lịch 'me time' cụ thể — không ai có thể give from empty cup",
      "Hỏi đồng nghiệp cần gì thay vì tự gánh mọi thứ",
    ],
    doLess: [
      "Nghĩ rằng bạn nên làm được tất cả mọi thứ",
      "Bám chặt vào phương pháp cũ khi môi trường đã thay đổi",
    ],
  },
  ESTJ: {
    doMore: [
      "Dành thời gian tìm hiểu về người trong team — họ không chỉ là nguồn lực",
      "Tìm điều thú vị trong công việc hôm nay, không chỉ kết quả đạt được",
    ],
    doLess: [
      "Quên dừng lại để nhận ra hành trình",
      "Bỏ qua cảm xúc như thứ không quan trọng",
    ],
  },
  ESFJ: {
    doMore: [
      "Communicate rõ ràng hơn về ý định khi cân bằng giữa kết quả và hòa hợp",
      "Để người khác giúp bạn thay vì tự làm tất cả",
    ],
    doLess: [
      "Trở thành 'cảnh sát tiêu chuẩn' — mọi người có cách làm việc khác nhau",
      "Dồn mọi tiêu chuẩn của bạn lên người khác",
    ],
  },
  ISTP: {
    doMore: [
      "Nói ra kết quả bạn đã làm được — ISTP thường giải quyết xong việc mà không ai biết; thỉnh thoảng cập nhật tiến độ giúp người khác thấy giá trị công việc của bạn",
      "Check-in với team thường xuyên hơn — hỏi trước khi làm",
    ],
    doLess: [
      "Hoạt động hoàn toàn độc lập mà không update người xung quanh",
      "Giả định 'xin lỗi dễ hơn xin phép' luôn đúng",
    ],
  },
  ISFP: {
    doMore: [
      "Tìm kiếm feedback về ý tưởng trước khi đi quá xa",
      "Hỏi 'tại sao' nhiều hơn 'như thế nào' khi tiếp cận task",
    ],
    doLess: [
      "Để 'thú vị' là tiêu chí duy nhất — một thứ có thể vừa sáng tạo vừa thiếu thực tế",
      "Quên chia sẻ lý do đằng sau hành động — câu chuyện là phần của giá trị",
    ],
  },
  ESTP: {
    doMore: [
      "Tăng cường empathy — networking tốt nhưng cần sâu hơn nữa",
      "Cho người khác thời gian xử lý trước khi action",
    ],
    doLess: [
      "Bulldoze — năng lượng mạnh có thể khiến người khác cảm thấy bị áp đảo",
      "Quá tập trung vào short-term wins mà bỏ qua chiến lược dài hạn",
    ],
  },
  ESFP: {
    doMore: [
      "Để curiosity khám phá tương lai — đặt câu hỏi về 2, 5, 10 năm nữa",
      "Lên kế hoạch cụ thể cho những điều bạn muốn trong tương lai",
    ],
    doLess: [
      "Bỏ qua chi tiết tẻ nhạt — tiền, thời gian, các con số nhỏ thường là thứ quyết định",
      "Tránh việc planning vì nó 'không vui'",
    ],
  },
}

// ============================================================
// PHẦN 5: STRESS TRIGGERS & COPING — Theo nhóm Role
// Nguồn: /articles/stress-and-the-personality-types-who-work-at-home
//        /articles/how-personality-shapes-the-way-we-handle-stress-a-study
// ============================================================

export const STRESS_PATTERNS: Record<string, {
  triggers: string[]
  signs: string[]
  coping: string[]
  avoid: string[]
}> = {
  // Analysts
  INTJ: {
    triggers: ["Công việc không hiệu quả", "Người làm việc kém", "Thiếu kiểm soát", "Bị gián đoạn"],
    signs: ["Rút khỏi mọi tương tác không cần thiết", "Trở nên lạnh lùng hơn bình thường", "Cầu toàn đến mức tê liệt — không bắt đầu được vì chưa hoàn hảo"],
    coping: ["Tạo một nghi thức nhỏ khi kết thúc ngày — đi bộ, nghe nhạc, ghi lại 1 điều xong — để não chuyển trạng thái", "Tắt thiết bị kỹ thuật số sau giờ làm", "Hoạt động thể chất nhẹ"],
    avoid: ["Làm thêm giờ khi stress — tăng thêm áp lực", "Cô lập hoàn toàn"],
  },
  INTP: {
    triggers: ["Áp lực xã hội", "Deadline không rõ ràng", "Phải quyết định nhanh", "Bị ép thừa nhận sai khi chưa thuyết phục về logic"],
    signs: ["Suy nghĩ lặp vòng không dứt", "Trì hoãn mọi thứ", "Dễ cáu với người xung quanh"],
    coping: ["Tắt thiết bị sau giờ làm — cho não thoát khỏi vòng lặp phân tích", "Hoạt động thể chất để thoát khỏi đầu", "Đặt deadline cứng cho bản thân — kể cả khi chưa thấy đủ chắc chắn"],
    avoid: ["Lướt tìm kiếm vô mục đích như cách trốn quyết định", "Tránh né cuộc trò chuyện cần thiết"],
  },
  ENTJ: {
    triggers: ["Thiếu kiểm soát", "Kết quả không như kỳ vọng", "Đội nhóm không hiệu quả", "Thời gian nghỉ bị ép buộc"],
    signs: ["Kiểm soát chi tiết hơn bình thường — khó để team tự xử lý", "Nói thẳng hơn bình thường đến mức gay gắt", "Không dừng được dù đã quá giờ — cảm giác dừng là lãng phí"],
    coping: ["Thiết lập thời gian cứng để dừng làm việc", "Kế hoạch nghỉ ngơi rõ ràng như kế hoạch công việc", "Dành thời gian không có kế hoạch — không phải lịch trống, là thật sự không có mục tiêu rõ ràng"],
    avoid: ["Tiếp tục ép bản thân không có khoảng nghỉ thật sự", "Bỏ qua tín hiệu của team"],
  },
  ENTP: {
    triggers: ["Công việc lặp lại", "Không được thử thách", "Thiếu tự chủ", "Bị ép vào lịch trình cứng nhắc không có lý do rõ"],
    signs: ["Tranh luận mọi thứ", "Dễ chán và phân tâm", "Tự tạo ra vấn đề mới để kích thích — dù chưa cần giải quyết"],
    coping: ["Luyện nghe đến cuối trước khi phản bác — giảm tranh luận bốc đồng", "Tạo 'thử thách nhỏ' trong công việc lặp lại"],
    avoid: ["Kéo xung đột không cần thiết vì chán", "Tranh luận vô nghĩa với đồng nghiệp"],
  },

  // Diplomats
  INFJ: {
    triggers: ["Cảm giác mình không đủ — không giúp được đủ nhiều", "Xung đột mà không giải quyết được", "Thiếu ý nghĩa trong công việc"],
    signs: ["Bỏ việc của mình để giúp người khác — kể cả khi đang bận thật sự", "Trở nên khép kín bất thường — ít chia sẻ hơn, khó tiếp cận hơn dù bình thường rất cởi mở", "Tự phán xét nặng nề hơn bình thường — lặp lại những thứ đã làm sai"],
    coping: ["Thời gian một mình thật sự — không scroll, không trả lời tin nhắn", "Xác định rõ khi nào mình có thể giúp và khi nào không — nói ra thay vì nuốt vào", "Tìm ý nghĩa trong công việc hiện tại"],
    avoid: ["Bỏ nhu cầu của mình liên tục mà không nhận ra", "Nhận mọi yêu cầu giúp đỡ dù đang cạn kiệt"],
  },
  INFP: {
    triggers: ["Xung đột giá trị", "Cảm giác không ai thật sự hiểu mình", "Áp lực làm thứ trái với bản thân"],
    signs: ["Tự chỉ trích tăng mạnh — so sánh mình với kỳ vọng lý tưởng", "Rút khỏi giao tiếp — ít nói hơn, trả lời ngắn hơn", "Công việc mất ý nghĩa — làm được nhưng không thấy tại sao"],
    coping: ["Đối xử với bản thân như với bạn bè — không chỉ trích khi không hoàn hảo", "Tìm điều có ý nghĩa trong ngày", "Nghệ thuật hoặc sáng tạo như lối thoát"],
    avoid: ["Dùng tiêu chuẩn hoàn hảo để đánh giá mình trong lúc đã mệt", "Tránh né xung đột cần thiết"],
  },
  ENFJ: {
    triggers: ["Cảm giác không thể giúp được mọi người", "Xung đột không giải quyết", "Bị phụ thuộc quá mức"],
    signs: ["Kiệt sức vì cho đi liên tục mà không nạp lại — nhưng vẫn tiếp tục vì không muốn từ chối", "Hy sinh nhu cầu bản thân mà không nói ra — rồi mệt mỏi một mình"],
    coping: ["Xác định trước khi nào mình có thể giúp và khi nào cần từ chối — không đợi đến lúc cạn kiệt", "Lên lịch thời gian cho mình như lịch họp — không hủy", "Nhờ người khác giúp"],
    avoid: ["Tiếp tục giả vờ ổn khi đã đuối", "Nhận mọi trách nhiệm chăm sóc người khác"],
  },
  ENFP: {
    triggers: ["Thói quen lặp lại nhàm chán", "Thiếu sáng tạo", "Cảm giác bị giam cầm", "Deadline cứng nhắc"],
    signs: ["Khó tập trung vào bất cứ thứ gì quá 10 phút", "Bắt đầu thêm dự án mới thay vì hoàn thành cái đang dang dở", "Lo sợ bỏ lỡ tăng mạnh — sợ bỏ lỡ mọi thứ cùng lúc"],
    coping: ["Chỉ check thông báo vào 2-3 khung giờ cố định — không liên tục", "Dừng lại 5 phút, thở, quay về việc trước mắt — không cần thiền dài", "Cắt việc lớn thành từng phần 25-30 phút có điểm kết thúc rõ"],
    avoid: ["Lướt mạng vô mục đích như cách thoát khỏi cảm giác choáng ngợp", "Nhận thêm dự án khi đã quá tải"],
  },

  // Sentinels
  ISTJ: {
    triggers: ["Sự vô tổ chức", "Thay đổi bất ngờ", "Kế hoạch bị phá vỡ", "Người làm việc thiếu trách nhiệm"],
    signs: ["Cứng nhắc hơn", "Chỉ trích người khác nhiều hơn bình thường — tiêu chuẩn tăng lên", "Tự hỏi tại sao mình lại stress — rồi stress thêm vì cảm thấy không nên stress"],
    coping: ["Đặt ngày nghỉ rõ ràng trong lịch và giữ chúng", "Làm thứ mình thích như nghỉ cuối tuần nhỏ"],
    avoid: ["Cảm thấy tội lỗi vì có cảm xúc phức tạp", "Làm thêm để 'giải quyết' stress"],
  },
  ISFJ: {
    triggers: ["Áp lực từ mọi phía", "Cảm giác cô đơn trong trách nhiệm", "Thiếu sự ghi nhận", "Sợ xung đột"],
    signs: ["Tránh nhờ người khác dù đang quá tải — vì sợ làm phiền", "Nhận thêm việc thay vì từ chối — dù đã đầy", "Stress ngầm tích tụ"],
    coping: ["Tạo nghi thức nhỏ khi kết thúc ngày — để não biết đây là điểm dừng", "Tập thể dục nhẹ", "Cho phép bản thân nhận sự giúp đỡ"],
    avoid: ["Nói 'mình ổn' khi không ổn — rồi gánh một mình", "Không nhờ giúp vì sợ trở thành gánh nặng cho người khác"],
  },
  ESTJ: {
    triggers: ["Thiếu cấu trúc", "Người không theo quy trình", "Mục tiêu không rõ ràng", "Kết quả tệ"],
    signs: ["Kiểm soát chi tiết hơn — khó tin tưởng người khác tự xử lý", "Cứng nhắc hơn bình thường", "Khó nhìn thấy điều tốt đang diễn ra — chỉ thấy những gì chưa xong"],
    coping: ["Dừng lại và liệt kê 3 thứ đang chạy tốt — dù nhỏ", "Dành thời gian kết nối với từng người trong team — không chỉ về công việc"],
    avoid: ["Thêm việc vào danh sách như cách kiểm soát cảm giác mất kiểm soát", "Bỏ qua các dấu hiệu team đang mệt hoặc không ổn"],
  },
  ESFJ: {
    triggers: ["Sự hòa hợp bị phá vỡ", "Mọi người không hài lòng", "Bị chỉ trích", "Không thể giúp được"],
    signs: ["Nhận thêm việc liên tục — khó nói không dù đã quá tải", "Để ý kiến người khác ảnh hưởng quá nhiều đến cảm giác của mình", "Kiệt sức vì lo cho người khác quá nhiều — nhưng không ai lo ngược lại"],
    coping: ["Giao việc cho người khác — không phải tất cả đều cần bạn tự làm", "Nói rõ giới hạn của mình trước khi đạt đến điểm cạn kiệt", "Nghỉ ngơi không phải là bỏ mặc người khác — đó là điều kiện để bạn tiếp tục giúp được"],
    avoid: ["Tiếp tục nhận thêm vì sợ người khác thất vọng", "Quyết định dựa hoàn toàn vào cảm xúc tức thì"],
  },

  // Explorers
  ISTP: {
    triggers: ["Quan liêu", "Cuộc họp không cần thiết", "Bị ép vào tình huống xã giao", "Thiếu tự chủ"],
    signs: ["Rút khỏi mọi tương tác xã hội — kể cả những người thường gần", "Mỉa mai hơn bình thường — hay nói mỉa", "Bỏ qua deadline"],
    coping: ["Tìm dự án cụ thể để giải quyết", "Thời gian một mình với dự án cụ thể — không cần phải xã giao hay giải thích", "Hoạt động thể chất"],
    avoid: ["Biến mất hoàn toàn khỏi team — không báo, không cập nhật", "Bỏ qua tín hiệu người khác cần mình"],
  },
  ISFP: {
    triggers: ["Xung đột", "Áp lực phải giống mọi người", "Cảm giác không được chấp nhận"],
    signs: ["Rút lui khỏi mọi người — ít xuất hiện, ít chia sẻ hơn", "Mất cảm hứng sáng tạo — thứ thường làm bạn hứng khởi cảm thấy nhạt", "Khó quyết định ngay cả những việc nhỏ"],
    coping: ["Làm gì đó bằng tay — vẽ, nấu ăn, cắm hoa — không cần hoàn hảo, chỉ cần làm", "Thiên nhiên", "Thời gian với người tin tưởng"],
    avoid: ["Cô lập hoàn toàn mà không báo ai", "Nuốt cảm xúc vào trong và giả vờ ổn"],
  },
  ESTP: {
    triggers: ["Bị chặn không hành động được — giấy tờ, phê duyệt, chờ đợi", "Quá nhiều cuộc họp/lý thuyết", "Thói quen lặp lại nhàm chán"],
    signs: ["Ra quyết định bốc đồng hơn — hành động trước khi nghĩ", "Tìm kích thích mạnh để giảm căng thẳng — rủi ro cao hơn bình thường", "Va chạm với người có thẩm quyền nhiều hơn bình thường"],
    coping: ["Chuyển năng lượng vào hành động", "Đặt deadline ngắn cho bản thân", "Vận động thể chất mạnh — cần xả năng lượng ra ngoài"],
    avoid: ["Chấp nhận rủi ro cao không kiểm soát vì chán hoặc để xả stress", "Va chạm không cần thiết với đồng nghiệp hoặc sếp"],
  },
  ESFP: {
    triggers: ["Cảm giác bị bỏ qua hoặc không được ghi nhận", "Cô đơn", "Chi tiết tẻ nhạt", "Tương lai bất định"],
    signs: ["Tìm kiếm sự xác nhận từ người khác nhiều hơn bình thường", "Chìm vào giải trí để thoát khỏi cảm giác choáng ngợp", "Tránh lên kế hoạch — mọi thứ cảm thấy quá nặng để xử lý"],
    coping: ["Gặp người mình thích — không nhất thiết phải nói về vấn đề, chỉ cần có mặt", "Chia việc lớn thành bước nhỏ — thêm yếu tố vui vào từng bước", "Ghi nhận và ăn mừng ngay cả những tiến bộ nhỏ"],
    avoid: ["Dùng giải trí như cách trốn tránh hoàn toàn thay vì nạp lại", "Bỏ qua các vấn đề thực tế vì không muốn đối mặt"],
  },
}

// ============================================================
// PHẦN 6: URL REFERENCE — Danh sách articles đã khai thác
// Để team biết source và có thể fetch thêm
// ============================================================

export const ARTICLE_SOURCES = {
  framework: "https://www.16personalities.com/articles/our-theory",
  growth: "https://www.16personalities.com/articles/quick-guide-to-personality-types-and-personal-growth-goals",
  morning: "https://www.16personalities.com/articles/morning-routine-styles-by-personality-type",
  workLife: "https://www.16personalities.com/articles/using-your-personality-type-to-improve-your-work-life-this-year",
  stressHome: "https://www.16personalities.com/articles/stress-and-the-personality-types-who-work-at-home",
  stressStudy: "https://www.16personalities.com/articles/how-personality-shapes-the-way-we-handle-stress-a-study",
  health: "https://www.16personalities.com/articles/where-your-personality-and-your-health-meet",
  healthGoals: "https://www.16personalities.com/articles/how-to-stick-with-your-health-goals-by-personality-type",
  conflictRelationship: "https://www.16personalities.com/articles/exploring-relationship-conflict-through-the-lens-of-personality-type",
  conflictThinking: "https://www.16personalities.com/articles/back-to-harmony-resolving-relationship-conflicts-with-thinking-personality-types",
  conflictFeeling: "https://www.16personalities.com/articles/a-path-to-peace-resolving-relationship-conflicts-with-feeling-personality-types",
  mothersDayReminders: "https://www.16personalities.com/articles/mothers-day-reminders-for-all-16-personality-types",

  // CÒN CÓ THỂ FETCH TIẾP:
  todo: [
    "https://www.16personalities.com/intj-personality",
    "https://www.16personalities.com/infj-personality",
    // ... 16 type pages
    "https://www.16personalities.com/intjs-at-work",
    "https://www.16personalities.com/infjs-at-work",
    // ... 16 type at-work pages
    "https://www.16personalities.com/articles/creatures-of-habit",
    "https://www.16personalities.com/articles/how-to-make-2021-your-year-by-personality-type",
    "https://www.16personalities.com/articles/getting-along-with-the-new-person-at-work-by-personality-type",
    "https://www.16personalities.com/articles/40-fun-team-building-questions-to-reveal-personality-types-and-work-styles",
  ],
}

/**
 * HƯỚNG DẪN SỬ DỤNG CHO TNCB:
 *
 * 1. GROWTH_AREAS → dùng cho `growthAreas[]` trong user_persona
 *    → inject vào persona_compressed: "Đang tập: {growthAreas[0]}"
 *
 * 2. WORK_TIPS → seed data cho `daily-practices.ts`
 *    → doLess[] → thingsToAvoid
 *    → doMore[] → dailyPractices
 *
 * 3. MORNING_STYLES → seed data cho nudge sáng
 *    → nudge field → morning nudge template
 *
 * 4. STRESS_PATTERNS → seed data cho:
 *    → HR Guide (coping strategies cho manager)
 *    → situational-nudges.ts (event: feeling_burnout)
 *
 * 5. NERIS_FRAMEWORK → reference cho quiz design + bảng tổng hợp Character
 */
