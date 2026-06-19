/**
 * PA KB — HEALTH & FITNESS DATA
 * Ngày: 18/06/2026 · Review: Master PM
 * Source: Datamine Gemini · MBTI_HEALTH · 60 môn thể thao
 * 
 * ⚠️ DISCLAIMER bắt buộc mọi nơi hiển thị:
 * "Thông tin tham khảo · không thay thế tư vấn y tế
 *  Có bệnh tim mạch → tham khảo bác sĩ trước khi bắt đầu"
 * 
 * NOTE: "UCL 2025" citation → frame "[R] based on personality-exercise research"
 * KHÔNG cite tên paper cụ thể (chưa verify URL)
 * 
 * NOTE: "cold shower" Huberman → frame [P/S] "một số người thấy hiệu quả"
 * KHÔNG frame là "nghiên cứu chứng minh"
 */

// ─── TYPES ────────────────────────────────────────────────

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

export interface Sport {
  name: string
  category: 'cardio' | 'strength' | 'flexibility' | 'team' | 'outdoor'
  difficulty: 'dễ' | 'trung bình' | 'khó'
  equipment: string
  availableVN: boolean
  whyThisGroup: string
  dropoutRisk: string
  bestFor: string[]
}

export interface HeartRateZone {
  zone: number
  name: string
  percentHRmax: string
  purpose: string
  weeklyMinutes: string
}

export interface HealthStyle {
  coreMotivation: string
  strengths: string
  trap: string
  strategy: string
  nudgeStyle: string
  dropoutRisk: string
  sleepPattern: string
  sleepBarriers: string[]
  sleepTips: string[]
}

// ─── HEART RATE FORMULAS ──────────────────────────────────

export const HEART_RATE_FORMULAS = {
  maxHR: {
    simple: "HRmax = 220 - tuổi",
    tanaka: "HRmax = 208 - (0.7 × tuổi) [Tanaka 2001, chính xác hơn cho người 40+]",
    note: "Công thức đơn giản phù hợp đa số người khoẻ mạnh. Dùng Tanaka nếu 40+ tuổi.",
  },
  karvonen: {
    formula: "Target HR = HRrest + (HRmax - HRrest) × %intensity",
    description: "Karvonen Formula — dùng nhịp tim nghỉ ngơi, chính xác nhất cho cardio training",
    example: "Người 30 tuổi, HRrest 65bpm, tập Zone 3 (70-80%):\nHRmax = 190 · HRreserve = 125 · Target = 65 + (125 × 0.75) ≈ 159 bpm",
  },
  disclaimer: "⚠️ Không áp dụng cho người có bệnh tim mạch · Tham khảo bác sĩ trước khi bắt đầu chương trình tập luyện mới",
}

export const HEART_RATE_ZONES: HeartRateZone[] = [
  { zone: 1, name: "Warm-up / Phục hồi", percentHRmax: "50-60%", purpose: "Khởi động · phục hồi sau tập nặng", weeklyMinutes: "30-60 phút · không giới hạn" },
  { zone: 2, name: "Fat burn / Aerobic nhẹ", percentHRmax: "60-70%", purpose: "Đốt mỡ · nền aerobic · chạy bộ thư giãn", weeklyMinutes: "150+ phút/tuần (WHO khuyến nghị)" },
  { zone: 3, name: "Aerobic / Cardio", percentHRmax: "70-80%", purpose: "Cải thiện sức bền tim mạch · zone hiệu quả nhất", weeklyMinutes: "75-150 phút/tuần" },
  { zone: 4, name: "Anaerobic / HIIT", percentHRmax: "80-90%", purpose: "Tăng VO₂max · đốt calo cao · HIIT", weeklyMinutes: "20-40 phút · 2-3 lần/tuần tối đa" },
  { zone: 5, name: "Max effort", percentHRmax: "90-100%", purpose: "Sprint · bộc phát tối đa · chỉ dùng ngắn", weeklyMinutes: "Dưới 10 phút · người luyện nâng cao" },
]

// ─── MBTI HEALTH STYLE ────────────────────────────────────

export const MBTI_HEALTH_STYLE: Record<MbtiGroup, HealthStyle> = {
  NT: {
    coreMotivation: "Hiểu WHY — data và research là fuel",
    strengths: "Skepticism giúp tránh fad diets và lời khuyên sai. Thích optimize bằng data.",
    trap: "Skepticism quá mức → tự nói mình ra khỏi positive changes. Overthink thay vì bắt đầu.",
    strategy: "Research kỹ health change muốn làm, giữ statistics để boost motivation. Nếu ai đưa fad advice, research để chứng minh sai — double motivation.",
    nudgeStyle: "Đưa data cụ thể: 'Nghiên cứu X cho thấy resistance training giảm Y% risk...' · Không advice mơ hồ.",
    dropoutRisk: "[R] NT bỏ cuộc vì boredom — cần challenge liên tục và variety. Solo training phù hợp hơn team.",
    sleepPattern: "Hay thức khuya vì absorbed in projects · Introvert NT cần recharge qua ngủ đủ giấc",
    sleepBarriers: ["Overthinking trước khi ngủ", "Blue light từ screen khuya", "Không có wind-down routine"],
    sleepTips: ["Journaling 10 phút dump thoughts trước khi ngủ", "App Sleep Cycle track quality", "No screens 30 phút trước ngủ · đọc sách thay thế"],
  },
  NF: {
    coreMotivation: "Feel the joy — cảm xúc tích cực là fuel",
    strengths: "Nhạy cảm với cảm xúc → khi exercise feel good thật sự, motivation tự nhiên bền vững.",
    trap: "'Power through' không work với NF. Nếu hoạt động feel awful, họ quit. Bounce back khó sau negative experiences.",
    strategy: "Biến environment thành beautiful và uplifting — nhạc đẹp, bạn đồng hành, không gian dễ chịu. Pause để notice joy trong cơ thể.",
    nudgeStyle: "Gắn với cảm xúc: 'Sau buổi đi bộ hôm nay, bạn cảm thấy thế nào?' thay vì 'Bạn đã đạt mục tiêu steps chưa?'",
    dropoutRisk: "[R] NF bỏ khi môi trường toxic hoặc mất ý nghĩa. Cần community và sense of purpose trong tập luyện.",
    sleepPattern: "Nhạy cảm với môi trường ngủ · Empathy fatigue ảnh hưởng giấc ngủ sau ngày cảm xúc nặng",
    sleepBarriers: ["Replay tương tác xã hội trong đầu", "Lo lắng về người khác trước khi ngủ", "Môi trường ngủ không comfortable"],
    sleepTips: ["Breathing exercises 4-7-8 để calm nervous system", "Lavender aromatherapy", "Journaling cảm ơn 3 điều tốt trong ngày"],
  },
  ST: {
    coreMotivation: "Results và kỹ năng cụ thể — thấy progression rõ ràng",
    strengths: "Kỷ luật thực hành · Không bị ảnh hưởng cảm xúc khi tập · Consistency cao.",
    trap: "Overtrain vì muốn kết quả nhanh. Không lắng nghe body signals. Skip rest days.",
    strategy: "Track metrics rõ ràng. Progression overload có kế hoạch. Rest days là part of the plan, không phải weakness.",
    nudgeStyle: "Checklist cụ thể: '3 sets × 12 reps, tăng 2.5kg so với tuần trước'. Milestone rõ ràng theo tuần.",
    dropoutRisk: "[R] ST bỏ cuộc khi không thấy result đủ nhanh hoặc bị chấn thương vì overtrain.",
    sleepPattern: "Tốt hơn khi có sleep schedule cứng. ST-J đặc biệt cần routine ngủ nhất quán.",
    sleepBarriers: ["Cortisol cao sau tập nặng buổi tối", "Caffeine uống quá muộn", "Work stress chưa xử lý"],
    sleepTips: ["Không tập HIIT sau 8pm", "Magnesium glycinate trước khi ngủ (verify với bác sĩ)", "Consistent sleep/wake time dù cuối tuần"],
  },
  SF: {
    coreMotivation: "Social connection và chăm sóc người thân — tập vì muốn có energy cho gia đình",
    strengths: "Consistency khi có accountability partner. Thích activities vui · Gym với bạn bè.",
    trap: "Bỏ cuộc khi mất bạn tập hoặc social element. Caretaker burnout — quên chăm sóc bản thân.",
    strategy: "Frame sức khoẻ như example: 'Mình chăm sóc bản thân là cách mình muốn con noi theo.' Accountability partner quan trọng.",
    nudgeStyle: "Accountability: 'Bạn tập cùng ai tuần này?' · Gợi group activities · Social proof.",
    dropoutRisk: "[R] SF bỏ khi mất bạn tập hoặc không còn social element trong routine.",
    sleepPattern: "Chịu ảnh hưởng từ môi trường xã hội · SF-P dễ thức muộn vì social activities",
    sleepBarriers: ["Khó từ chối social obligations buổi tối", "Lo lắng cho gia đình trước khi ngủ", "Phone checking tin nhắn khuya"],
    sleepTips: ["Group sleep challenge với bạn bè (accountability)", "Family wind-down routine cùng nhau", "Phone out of bedroom hoặc Do Not Disturb"],
  },
}

// ─── 60 SPORTS BY GROUP ───────────────────────────────────

export const SPORTS_BY_GROUP: Record<MbtiGroup, Sport[]> = {
  NT: [
    // Cardio
    { name: "Chạy bộ (solo)", category: "cardio", difficulty: "dễ", equipment: "Giày chạy", availableVN: true, whyThisGroup: "[R] Solo · data-driven (app đo pace/HR) · có thể nghe podcast · không cần team.", dropoutRisk: "Boring nếu không có challenge mới — thêm hill repeats hoặc race goals.", bestFor: ["INTJ", "INTP"] },
    { name: "Bơi lội", category: "cardio", difficulty: "trung bình", equipment: "Kính bơi · áo tắm", availableVN: true, whyThisGroup: "[R] Meditative · solo · kiểm tra kỹ thuật từng stroke · ít distraction.", dropoutRisk: "Cần bể bơi tiện lợi — bơi công cộng VN có thể không đủ sạch.", bestFor: ["INTP", "INTJ"] },
    { name: "Leo núi / Hiking", category: "outdoor", difficulty: "trung bình", equipment: "Giày leo núi · balo", availableVN: true, whyThisGroup: "[P] Challenge thể chất + khám phá địa hình + không cần team.", dropoutRisk: "Cần lên kế hoạch — không thể làm daily routine.", bestFor: ["INTJ", "ENTP"] },
    { name: "Đạp xe solo", category: "cardio", difficulty: "dễ", equipment: "Xe đạp", availableVN: true, whyThisGroup: "[P] Khám phá địa hình · data (Strava) · solo pace.", dropoutRisk: "Giao thông VN có thể nguy hiểm — cần lộ trình an toàn.", bestFor: ["INTP", "ENTP"] },
    { name: "Jump rope HIIT", category: "cardio", difficulty: "trung bình", equipment: "Dây nhảy", availableVN: true, whyThisGroup: "[R] Hiệu quả cao · có thể đo số liệu · không cần phòng gym.", dropoutRisk: "Nhàm nếu không tăng độ khó.", bestFor: ["INTJ", "ENTJ"] },
    // Strength
    { name: "Calisthenics", category: "strength", difficulty: "trung bình", equipment: "Thanh kéo xà (có ở công viên VN)", availableVN: true, whyThisGroup: "[P] Progress rõ ràng · không cần gym · có hệ thống học từng skill.", dropoutRisk: "Cần kiên nhẫn giai đoạn đầu chậm kết quả.", bestFor: ["INTP", "INTJ"] },
    { name: "Gym (strength training)", category: "strength", difficulty: "trung bình", equipment: "Phòng gym", availableVN: true, whyThisGroup: "[R] Quantifiable progress · có thể optimize program theo data.", dropoutRisk: "Crowded gym VN — chọn giờ vắng hoặc home gym.", bestFor: ["ENTJ", "INTJ"] },
    { name: "Rock climbing (bouldering)", category: "strength", difficulty: "khó", equipment: "Phòng leo núi nhân tạo", availableVN: true, whyThisGroup: "[R] Problem-solving vật lý · progression route rõ ràng · solo được.", dropoutRisk: "Phòng bouldering chưa nhiều tại VN ngoài HCM/HN.", bestFor: ["INTP", "ENTP"] },
    { name: "Kettlebell training", category: "strength", difficulty: "trung bình", equipment: "Kettlebell", availableVN: true, whyThisGroup: "[P] Efficient · full body · có thể tập nhà · nhiều progression.", dropoutRisk: "Cần học kỹ thuật đúng để tránh chấn thương.", bestFor: ["INTJ", "ENTJ"] },
    { name: "Powerlifting (squat/deadlift/bench)", category: "strength", difficulty: "khó", equipment: "Phòng gym có barbell", availableVN: true, whyThisGroup: "[R] Quantifiable strength gains · có thể compete · systematic program.", dropoutRisk: "Cần coach tốt tại VN để kỹ thuật đúng.", bestFor: ["ENTJ", "INTJ"] },
    // Flexibility
    { name: "Yoga Yin (chậm, sâu)", category: "flexibility", difficulty: "dễ", equipment: "Thảm yoga", availableVN: true, whyThisGroup: "[P] Giúp NT reconnect với cơ thể · counterbalance việc ngồi nhiều.", dropoutRisk: "Cảm thấy quá chậm — thử Vinyasa thay thế.", bestFor: ["INTJ", "INTP"] },
    { name: "Mobility training", category: "flexibility", difficulty: "dễ", equipment: "Foam roller · thảm", availableVN: true, whyThisGroup: "[R] Injury prevention · data-driven (range of motion tracking).", dropoutRisk: "Ít drama — phải gắn vào routine khác.", bestFor: ["INTJ", "ENTJ"] },
    // Team (NT ít thích nhưng có lợi)
    { name: "Cờ tướng / Cờ vua (mental fitness)", category: "team", difficulty: "trung bình", equipment: "Bàn cờ", availableVN: true, whyThisGroup: "[P] NT xem mental fitness là exercise — strategic depth infinite.", dropoutRisk: "Không phải physical exercise — cần balance với vận động.", bestFor: ["INTJ", "INTP"] },
    { name: "Tennis (solo drilling)", category: "team", difficulty: "khó", equipment: "Vợt · sân", availableVN: true, whyThisGroup: "[P] Có thể tập solo drilling · technique-focused · competitive.", dropoutRisk: "Cần đối thủ cùng level — khó tìm.", bestFor: ["ENTJ", "ENTP"] },
    // Outdoor
    { name: "Trail running", category: "outdoor", difficulty: "khó", equipment: "Giày trail", availableVN: true, whyThisGroup: "[R] Problem-solving terrain · solo · data (elevation, pace) · VN có nhiều trail.", dropoutRisk: "Cần di chuyển ra ngoài thành phố — không phải daily.", bestFor: ["INTJ", "ENTP"] },
  ],
  NF: [
    { name: "Yoga Vinyasa", category: "flexibility", difficulty: "trung bình", equipment: "Thảm yoga", availableVN: true, whyThisGroup: "[R] Kết nối movement với breath và intention · mindful · có cộng đồng.", dropoutRisk: "Cần lớp với năng lượng tốt — studio phù hợp quan trọng với NF.", bestFor: ["INFJ", "INFP"] },
    { name: "Dance (contemporary/salsa/ballet)", category: "flexibility", difficulty: "trung bình", equipment: "Studio", availableVN: true, whyThisGroup: "[R] Biểu đạt cảm xúc qua movement · social · artistic.", dropoutRisk: "Cần studio và thầy giỏi — chi phí cao hơn.", bestFor: ["ENFP", "ISFP"] },
    { name: "Hiking thiên nhiên", category: "outdoor", difficulty: "trung bình", equipment: "Giày đi bộ", availableVN: true, whyThisGroup: "[P] Thiên nhiên + movement + solitude = triple recharge cho NF.", dropoutRisk: "Cần lên kế hoạch — không daily routine.", bestFor: ["INFJ", "INFP"] },
    { name: "Bơi lội (buổi sáng sớm)", category: "cardio", difficulty: "trung bình", equipment: "Kính bơi", availableVN: true, whyThisGroup: "[P] Meditative · không ồn ào · movement trong không gian riêng tư.", dropoutRisk: "Bể bơi đông hoặc ồn ào sẽ demotivate NF.", bestFor: ["INFJ", "INFP"] },
    { name: "Tai chi / Khí công", category: "flexibility", difficulty: "dễ", equipment: "Không cần", availableVN: true, whyThisGroup: "[R] Slow · mindful · có tính tâm linh · phổ biến tại công viên VN buổi sáng.", dropoutRisk: "Ít variety — có thể boring sau vài tháng.", bestFor: ["INFJ", "ENFJ"] },
    { name: "Pilates", category: "flexibility", difficulty: "trung bình", equipment: "Thảm / Studio", availableVN: true, whyThisGroup: "[P] Mind-body connection · grace · precision · không aggressive.", dropoutRisk: "Phí studio cao tại VN.", bestFor: ["INFJ", "ENFJ"] },
    { name: "Chạy bộ nhóm (running club)", category: "cardio", difficulty: "dễ", equipment: "Giày chạy", availableVN: true, whyThisGroup: "[R] Community + movement · các Running Club VN rất active.", dropoutRisk: "Nếu group toxic hoặc quá competitive, NF sẽ quit.", bestFor: ["ENFJ", "ENFP"] },
    { name: "Đạp xe khám phá", category: "cardio", difficulty: "dễ", equipment: "Xe đạp", availableVN: true, whyThisGroup: "[P] Khám phá · aesthetic · không áp lực performance.", dropoutRisk: "Giao thông VN — cần lộ trình an toàn.", bestFor: ["ENFP", "INFP"] },
    { name: "Volunteer hiking / dọn rác thiên nhiên", category: "outdoor", difficulty: "dễ", equipment: "Không cần", availableVN: true, whyThisGroup: "[P] Purpose-driven movement · cộng đồng ý nghĩa · NF cần meaning trong hoạt động.", dropoutRisk: "Không regular — thỉnh thoảng mới có event.", bestFor: ["ENFJ", "INFJ"] },
    { name: "Barre", category: "flexibility", difficulty: "trung bình", equipment: "Studio", availableVN: true, whyThisGroup: "[P] Ballet-inspired · graceful · small group · aesthetic.", dropoutRisk: "Ít phổ biến tại VN ngoài thành phố lớn.", bestFor: ["INFP", "ISFP"] },
    { name: "Yoga Yin + meditation", category: "flexibility", difficulty: "dễ", equipment: "Thảm", availableVN: true, whyThisGroup: "[R] Stress release · parasympathetic activation · introspection.", dropoutRisk: "Cần discipline để tự tập nhà.", bestFor: ["INFJ", "INFP"] },
    { name: "Badminton (nhóm bạn)", category: "team", difficulty: "dễ", equipment: "Vợt cầu", availableVN: true, whyThisGroup: "[P] Social · light · phổ biến VN · không áp lực.", dropoutRisk: "Cần nhóm bạn ổn định — nếu nhóm tan, NF bỏ.", bestFor: ["ENFJ", "ENFP"] },
    { name: "Zumba", category: "cardio", difficulty: "dễ", equipment: "Studio", availableVN: true, whyThisGroup: "[P] Joy-based movement · music · cộng đồng vui vẻ.", dropoutRisk: "Cần instructor năng lượng tốt.", bestFor: ["ENFP", "ENFJ"] },
    { name: "Martial arts (Aikido/Taichi)", category: "team", difficulty: "khó", equipment: "Võ đường", availableVN: true, whyThisGroup: "[P] Philosophy + movement · respectful community · non-competitive.", dropoutRisk: "Commitment lớn — cần tìm võ đường phù hợp.", bestFor: ["INFJ", "INTJ"] },
    { name: "Stand-up paddleboard (SUP)", category: "outdoor", difficulty: "trung bình", equipment: "Board (thuê)", availableVN: true, whyThisGroup: "[P] Thiên nhiên · balance · meditative · có ở Hội An/Đà Nẵng/Phú Quốc.", dropoutRisk: "Cần đến vùng biển — không daily.", bestFor: ["INFP", "ENFP"] },
  ],
  ST: [
    { name: "Gym (powerlifting/bodybuilding)", category: "strength", difficulty: "khó", equipment: "Phòng gym", availableVN: true, whyThisGroup: "[R] Quantifiable results · technical progression · can compete.", dropoutRisk: "Overtrain vì muốn kết quả nhanh — cần plan rest days.", bestFor: ["ISTP", "ESTJ"] },
    { name: "Võ thuật (Muay Thai/Boxing/MMA)", category: "team", difficulty: "khó", equipment: "Phòng tập võ", availableVN: true, whyThisGroup: "[R] Technical skill + physical challenge · clear progression belts.", dropoutRisk: "Chấn thương nếu không học kỹ thuật đúng.", bestFor: ["ISTP", "ESTP"] },
    { name: "Bóng đá", category: "team", difficulty: "trung bình", equipment: "Sân bóng", availableVN: true, whyThisGroup: "[R] Competitive · teamwork có mục đích rõ · cực phổ biến VN.", dropoutRisk: "Cần schedule consistent với team.", bestFor: ["ESTJ", "ESTP"] },
    { name: "Chạy bộ (có target: race, PB)", category: "cardio", difficulty: "dễ", equipment: "Giày chạy", availableVN: true, whyThisGroup: "[P] ST cần target cụ thể — đăng ký 10K/half marathon để có mục tiêu.", dropoutRisk: "Boring nếu không có race goal.", bestFor: ["ISTJ", "ESTJ"] },
    { name: "Calisthenics (street workout)", category: "strength", difficulty: "khó", equipment: "Xà (công viên)", availableVN: true, whyThisGroup: "[P] Technical skill progression · no cost · visible strength.", dropoutRisk: "Plateau sau 6 tháng nếu không có program.", bestFor: ["ISTP", "ESTP"] },
    { name: "Bơi lội (competitive)", category: "cardio", difficulty: "trung bình", equipment: "Bể bơi", availableVN: true, whyThisGroup: "[R] Kỹ thuật từng stroke có thể optimize · lap time tracking.", dropoutRisk: "Cần bể bơi sạch và consistent schedule.", bestFor: ["ISTJ", "ISTP"] },
    { name: "Leo núi / Đổ đèo xe máy", category: "outdoor", difficulty: "khó", equipment: "Giày leo / Xe máy", availableVN: true, whyThisGroup: "[P] Physical challenge + kỹ năng cơ học · ST thích challenge thực địa.", dropoutRisk: "Nguy hiểm nếu không chuẩn bị đúng.", bestFor: ["ISTP", "ESTP"] },
    { name: "Gym cardio (treadmill có data)", category: "cardio", difficulty: "dễ", equipment: "Phòng gym", availableVN: true, whyThisGroup: "[P] Data-driven · controlled environment · consistent pace.", dropoutRisk: "Boring nếu không có music/podcast.", bestFor: ["ISTJ", "ESTJ"] },
    { name: "Bóng chuyền", category: "team", difficulty: "trung bình", equipment: "Sân bóng chuyền", availableVN: true, whyThisGroup: "[R] Team coordination · competitive · phổ biến VN.", dropoutRisk: "Cần team stable.", bestFor: ["ESTJ", "ESTP"] },
    { name: "Cầu lông", category: "team", difficulty: "dễ", equipment: "Vợt cầu", availableVN: true, whyThisGroup: "[P] Competitive · quick rallies · kỹ thuật nhiều để học · phổ biến VN.", dropoutRisk: "Ít, vì casual game dễ tổ chức.", bestFor: ["ISTP", "ESTJ"] },
    { name: "HIIT (interval training)", category: "cardio", difficulty: "khó", equipment: "Không cần", availableVN: true, whyThisGroup: "[R] Efficient · time-based · clear intervals · measurable output.", dropoutRisk: "Overtraining nếu không có rest days.", bestFor: ["ESTJ", "ESTP"] },
    { name: "CrossFit", category: "strength", difficulty: "khó", equipment: "Phòng CrossFit", availableVN: true, whyThisGroup: "[R] Competitive community · WOD data · functional fitness.", dropoutRisk: "Phí cao · risk injury nếu không có coach tốt.", bestFor: ["ESTP", "ENTJ"] },
    { name: "Yoga (power yoga)", category: "flexibility", difficulty: "trung bình", equipment: "Thảm", availableVN: true, whyThisGroup: "[P] ST cần đây như stretch/recovery — không phải primary workout.", dropoutRisk: "Bỏ nếu cảm thấy quá chậm.", bestFor: ["ISTJ", "ISTP"] },
    { name: "Đạp xe địa hình (MTB)", category: "outdoor", difficulty: "khó", equipment: "Xe MTB", availableVN: true, whyThisGroup: "[P] Technical terrain · speed · VN có nhiều trail MTB.", dropoutRisk: "Chi phí xe MTB cao.", bestFor: ["ISTP", "ESTP"] },
    { name: "Bóng rổ", category: "team", difficulty: "trung bình", equipment: "Sân bóng rổ", availableVN: true, whyThisGroup: "[R] Competitive · quick game · phổ biến VN thành phố.", dropoutRisk: "Cần pickup game — phụ thuộc người khác.", bestFor: ["ESTP", "ESTJ"] },
  ],
  SF: [
    { name: "Zumba / Dance fitness", category: "cardio", difficulty: "dễ", equipment: "Studio", availableVN: true, whyThisGroup: "[R] Social · music · joy-based · không cảm giác như 'tập thể dục'.", dropoutRisk: "Nếu mất bạn tập — SF quit.", bestFor: ["ESFP", "ESFJ"] },
    { name: "Yoga (nhóm, studio ấm áp)", category: "flexibility", difficulty: "dễ", equipment: "Studio", availableVN: true, whyThisGroup: "[P] Community · caring instructor · self-care vibe phù hợp SF.", dropoutRisk: "Studio không có vibe tốt — SF sẽ không quay lại.", bestFor: ["ISFJ", "ESFJ"] },
    { name: "Đi bộ cùng bạn / gia đình", category: "cardio", difficulty: "dễ", equipment: "Không cần", availableVN: true, whyThisGroup: "[R] Social + movement · sustainable nhất với SF · connection là motivation.", dropoutRisk: "Ít — vì gắn với người quan trọng.", bestFor: ["ISFJ", "ESFJ"] },
    { name: "Badminton (nhóm bạn)", category: "team", difficulty: "dễ", equipment: "Vợt cầu", availableVN: true, whyThisGroup: "[P] Casual · social · phổ biến VN · không cần commitment cao.", dropoutRisk: "Nếu nhóm tan — SF bỏ.", bestFor: ["ESFJ", "ISFP"] },
    { name: "Aerobics nhóm", category: "cardio", difficulty: "dễ", equipment: "Studio", availableVN: true, whyThisGroup: "[P] Group energy · instructor caring · structured but fun.", dropoutRisk: "Phụ thuộc instructor tốt.", bestFor: ["ESFJ", "ESFP"] },
    { name: "Bơi lội (gia đình)", category: "cardio", difficulty: "dễ", equipment: "Hồ bơi", availableVN: true, whyThisGroup: "[P] Fun activity với con cái · không aggressive · cooling trong nắng VN.", dropoutRisk: "Cần hồ bơi an toàn sạch sẽ.", bestFor: ["ISFJ", "ESFJ"] },
    { name: "Cầu lông (casual)", category: "team", difficulty: "dễ", equipment: "Vợt cầu", availableVN: true, whyThisGroup: "[P] Social · không áp lực · buổi tối cùng hàng xóm/bạn bè.", dropoutRisk: "Ít, rất casual và dễ tổ chức.", bestFor: ["ESFP", "ESFJ"] },
    { name: "Pilates nhóm nhỏ", category: "flexibility", difficulty: "trung bình", equipment: "Studio", availableVN: true, whyThisGroup: "[P] Caring community · body awareness · self-care ritual.", dropoutRisk: "Phí studio cao.", bestFor: ["ISFJ", "ISFP"] },
    { name: "Bóng đá (phong trào)", category: "team", difficulty: "trung bình", equipment: "Sân bóng", availableVN: true, whyThisGroup: "[R] Team bonding · community · phổ biến VN · không cần competitive.", dropoutRisk: "Cần team stable và atmosphere vui vẻ.", bestFor: ["ESFP", "ESFJ"] },
    { name: "Đạp xe (gia đình/nhóm bạn)", category: "cardio", difficulty: "dễ", equipment: "Xe đạp", availableVN: true, whyThisGroup: "[P] Social ride · khám phá cùng nhau · không áp lực pace.", dropoutRisk: "Cần nhóm consistent.", bestFor: ["ISFP", "ESFP"] },
    { name: "Nhảy (K-pop dance, social dance)", category: "flexibility", difficulty: "trung bình", equipment: "Studio / không cần", availableVN: true, whyThisGroup: "[P] Biểu đạt · vui · social · trend mạnh VN.", dropoutRisk: "Cần lớp học phù hợp age/level.", bestFor: ["ESFP", "ISFP"] },
    { name: "Gym (cùng bạn)", category: "strength", difficulty: "trung bình", equipment: "Phòng gym", availableVN: true, whyThisGroup: "[P] SF cần gym buddy để consistent · accountability qua relationship.", dropoutRisk: "Bỏ nếu bạn tập nghỉ.", bestFor: ["ESFJ", "ISFJ"] },
    { name: "Hiking ngắn (half day)", category: "outdoor", difficulty: "dễ", equipment: "Giày đi bộ", availableVN: true, whyThisGroup: "[P] Thiên nhiên · picnic · nhóm bạn · không quá mệt.", dropoutRisk: "Cần organize — không spontaneous.", bestFor: ["ISFP", "ESFJ"] },
    { name: "Tập yoga tại nhà (video online)", category: "flexibility", difficulty: "dễ", equipment: "Thảm", availableVN: true, whyThisGroup: "[P] Convenient · morning self-care ritual · nhiều channel VN.", dropoutRisk: "Thiếu accountability nếu không có group.", bestFor: ["ISFJ", "ISFP"] },
    { name: "Bóng chuyền bãi biển", category: "team", difficulty: "trung bình", equipment: "Bãi biển", availableVN: true, whyThisGroup: "[P] Fun · team · outdoor · VN có nhiều bãi biển.", dropoutRisk: "Chỉ khi đi biển — không regular.", bestFor: ["ESFP", "ESFJ"] },
  ],
}

// ─── HEALTH NUDGES (từ project knowledge đã có, merge vào đây) ────

export const HEALTH_NUDGES: Record<string, string[]> = {
  INTJ: [
    "📊 Research shows: người tập 150 phút/tuần sống trung bình 4.5 năm lâu hơn. Đủ data để bắt đầu chưa?",
    "🧠 Bộ não INTJ cần downtime như CPU cần cooling. 7-8 giờ ngủ = 23% tăng cognitive performance.",
    "⚡ Skip workout hôm nay = okay. Skip liên tiếp 3 ngày = habit loop break. Data nói vậy.",
  ],
  INTP: [
    "🔬 Có 47 lý thuyết về optimal morning routine. Nhưng thực ra chỉ cần 1 điều: uống đủ nước.",
    "💡 Thử experiment: sáng mai uống 500ml nước trước khi làm gì khác. Track cảm giác.",
    "🛌 Melatonin xuất hiện lúc 10pm và giảm khi nhìn màn hình. Fact.",
  ],
  ENTJ: [
    "⏰ Leaders giỏi nhất schedule rest như schedule meetings.",
    "📈 Peak performance cần recovery. 1 buổi tập quá sức = 3 ngày giảm hiệu suất.",
    "🎯 Mục tiêu sức khỏe tuần này là gì? Cụ thể, đo được, có deadline?",
  ],
  ENTP: [
    "🚀 Challenge: 30 ngày không tập theo routine truyền thống. Tự thiết kế regimen riêng.",
    "🔄 Boring workout = quit workout. Đổi 1 activity tuần này.",
    "💬 Đang debate với bản thân về việc có nên tập không? Cứ đi, debate trong lúc chạy bộ.",
  ],
  INFJ: [
    "🌅 10 phút stretch nhẹ vào buổi sáng yên tĩnh — không phải workout, là ritual.",
    "🎵 Tạo playlist đặc biệt chỉ để tập. Nghe playlist = signal cho não là 'giờ recharge'.",
    "🌿 Walks in nature tốt cho INFJ hơn gym — thiên nhiên + movement + solitude = triple recharge.",
  ],
  INFP: [
    "✨ Exercise không phải punishment, là cách honor bản thân. Tìm movement bạn genuinely enjoy.",
    "🎨 Thay vì 'tập gym', thử: dance class, yoga thơ, bơi lội — điều gì feel like play?",
    "💜 Self-compassion > self-discipline. Miss 1 buổi = okay. Miss 3 buổi = check-in gentle.",
  ],
  ENFJ: [
    "👥 Mời ai đó cùng tập với bạn tuần này.",
    "⚠️ Healthy ENFJ = người có thể tiếp tục give. Empty cup không pour được.",
    "🌟 Recharge là nhiệm vụ, không phải ích kỷ.",
  ],
  ENFP: [
    "🎉 Challenge 7 ngày: mỗi ngày 1 form of movement khác nhau. Boring = quit ngay.",
    "🎵 Workout playlist = mandatory cho ENFP.",
    "⚡ Bắt đầu nhỏ đến mức buồn cười: 5 phút. ENFP cần quick wins.",
  ],
  ISTJ: [
    "📅 Đặt workout vào lịch như meeting. Fixed time = không phải quyết định mỗi ngày.",
    "✅ Streak counter hoạt động tốt với ISTJ.",
    "😤 Rest day là part of the plan, không phải vi phạm plan.",
  ],
  ISFJ: [
    "👨‍👩‍👧 Frame sức khỏe: 'Mình muốn con thấy ba/mẹ tự chăm sóc bản thân.'",
    "🤝 Accountability partner giúp ISFJ nhiều.",
    "🛁 Self-care reminder: bạn không thể pour from empty cup.",
  ],
  ESTJ: [
    "📊 Treat sức khỏe như KPI: sleep 7.5h, steps 8000, water 2L.",
    "🏆 Healthy leader = healthy team culture.",
    "⏱️ 30 phút workout = 2% of your day. ROI: better focus, ít sick days.",
  ],
  ESFJ: [
    "👫 Propose group walk với friends/family tuần này.",
    "💪 Chăm sóc bản thân không phải ích kỷ — đó là cách tiếp tục chăm sóc người khác.",
    "🌺 1 buổi massage hay spa = đầu tư cho wellbeing, không phải xa xỉ.",
  ],
  ISTP: [
    "🔧 Treat body như machine cần maintenance. Không maintain = breakdown sớm.",
    "⚙️ Tìm activity có kỹ thuật để master — boring = quit. Cần challenge technical.",
    "📍 Solo training > group training. Pace của mình = efficiency tối đa.",
  ],
  ISFP: [
    "🎨 Find movement that feels beautiful — dance, yoga, swimming, không phải gym.",
    "🌸 Tập outdoor > indoor. Thiên nhiên = recharge cho ISFP.",
    "💚 Nhạc phù hợp có thể thay đổi hoàn toàn trải nghiệm workout.",
  ],
  ESTP: [
    "⚡ ESTP cần intensity — moderate workout = boring. HIIT, martial arts, competitive sports.",
    "🏆 Đăng ký competition gần nhất. Deadline = motivation.",
    "🔥 Variety là key — đổi activity mỗi 4-6 tuần.",
  ],
  ESFP: [
    "🎉 Make it social. Gym với bạn > gym solo. Always.",
    "🎵 Music + movement = ESFP's natural state.",
    "✨ Nếu không fun, sẽ quit. Tìm workout feel như party.",
  ],
}

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getSportsByGroup(group: MbtiGroup): Sport[] {
  return SPORTS_BY_GROUP[group] ?? []
}

export function getHealthStyle(group: MbtiGroup): HealthStyle {
  return MBTI_HEALTH_STYLE[group]
}

export function getHealthNudge(mbtiType: string): string {
  const nudges = HEALTH_NUDGES[mbtiType] ?? []
  return nudges[Math.floor(Math.random() * nudges.length)] ?? ''
}

export function calculateTargetHR(age: number, restHR: number, intensity: number): number {
  const maxHR = 220 - age
  const hrReserve = maxHR - restHR
  return Math.round(restHR + hrReserve * intensity)
}
