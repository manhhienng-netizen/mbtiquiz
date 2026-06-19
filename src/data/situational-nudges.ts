/**
 * SITUATIONAL NUDGES DATA
 * packages/data/src/situational-nudges-data.ts
 *
 * Ma trận: 16 MBTI type × 10 tình huống sự kiện
 * Dùng cho: Assistant event-based nudge (khi user flag 1 sự kiện cụ thể)
 *
 * 10 situations:
 *   new_match         — vừa match với ai đó
 *   presentation_tmr  — ngày mai có thuyết trình/phỏng vấn
 *   stressed          — đang bị stress/overwhelmed
 *   conflict_work     — có mâu thuẫn với đồng nghiệp/sếp
 *   burnout           — cảm thấy kiệt sức kéo dài
 *   celebration       — vừa đạt được điều gì đó tốt
 *   setback           — vừa thất bại/thất vọng
 *   monday_morning    — năng lượng đầu tuần thấp
 *   friday_reflection — cuối tuần nhìn lại
 *   health_reminder   — nhắc nhở sức khỏe định kỳ
 */

export type SituationKey =
  | 'new_match'
  | 'presentation_tmr'
  | 'stressed'
  | 'conflict_work'
  | 'burnout'
  | 'celebration'
  | 'setback'
  | 'monday_morning'
  | 'friday_reflection'
  | 'health_reminder'

export interface SituationalNudge {
  headline: string        // 1 dòng tiêu đề, có thể có emoji
  body: string           // 2-3 câu thực chất, không sáo rỗng
  actionPrompt: string   // 1 hành động cụ thể có thể làm ngay
  toneNote: string       // ghi chú tone cho AI khi expand (không hiển thị user)
}

export type TypeSituationalNudges = Record<SituationKey, SituationalNudge>

export const SITUATIONAL_NUDGES: Record<string, TypeSituationalNudges> = {

  // ─────────────────────────────────────────────────────────
  // INTJ — Kiến Trúc Sư
  // ─────────────────────────────────────────────────────────
  INTJ: {
    new_match: {
      headline: '🔍 Match mới — đừng phân tích quá sớm',
      body: 'Bạn có xu hướng muốn "đọc" người kia ngay từ đầu. Nhưng dữ liệu ban đầu luôn thiếu — hãy để thêm thông tin trước khi kết luận. Một cuộc trò chuyện tốt tốt hơn 10 lần suy luận.',
      actionPrompt: 'Hỏi 1 câu mở về điều người kia đang theo đuổi — không phải thông tin hồ sơ.',
      toneNote: 'Thẳng thắn, không sáo rỗng. INTJ ghét lời khuyên chung chung.',
    },
    presentation_tmr: {
      headline: '📊 Chuẩn bị xong rồi — giờ cần dừng lại',
      body: 'INTJ thường over-prepare đến mức làm mình căng hơn cần thiết. Nếu đã chuẩn bị kỹ, thêm 2 tiếng nữa chỉ tăng lo lắng, không tăng kết quả. Não cần nghỉ để perform tốt.',
      actionPrompt: 'Đặt giờ dừng chuẩn bị — và giữ đúng. Sau đó làm điều gì đó không liên quan.',
      toneNote: 'Dựa trên logic, không phải động viên cảm xúc.',
    },
    stressed: {
      headline: '🧠 Não đang quá tải — không phải lúc giải quyết thêm',
      body: 'Khi INTJ stress, phản ứng đầu tiên thường là cố kiểm soát thêm. Nhưng đây là lúc cần làm ngược lại — ra khỏi đầu và để hệ thống tự reset. Stress thường đến từ ôm quá nhiều thứ cùng lúc.',
      actionPrompt: 'Viết ra 3 thứ đang chiếm không gian đầu nhất — chọn 1 thứ để gác lại đến ngày mai.',
      toneNote: 'Không an ủi. Đưa ra framework để phân tích lại tình huống.',
    },
    conflict_work: {
      headline: '⚔️ Xung đột — bạn có thể đúng nhưng vẫn thua',
      body: 'INTJ hay thắng về logic nhưng thua về ảnh hưởng vì bỏ qua phần cảm xúc của người kia. Người ta không thay đổi vì bị chứng minh sai — họ thay đổi khi cảm thấy được hiểu. Chiến lược khác nhau.',
      actionPrompt: 'Trước lần nói chuyện tiếp theo, xác định 1 điểm hợp lý trong lập trường của họ — dù nhỏ.',
      toneNote: 'Strategic framing. INTJ phản hồi tốt với "đây là cách hiệu quả hơn".',
    },
    burnout: {
      headline: '🔋 Pin xuống 0 — hệ thống cần maintenance',
      body: 'Bạn build được nhiều thứ lớn nhưng hay bỏ qua dấu hiệu burnout vì không muốn dừng. Đây là tín hiệu cần đọc nghiêm túc — không phải yếu đuối. Máy tính hiệu suất cao nhất cũng cần restart.',
      actionPrompt: 'Xác định 1 thứ có thể delegate hoặc gác lại 1 tuần mà không sụp đổ.',
      toneNote: 'Logic về hiệu suất dài hạn. Không dùng ngôn ngữ cảm xúc.',
    },
    celebration: {
      headline: '🎯 Làm được rồi — dừng lại 5 phút để nhận ra điều đó',
      body: 'INTJ thường chuyển ngay sang mục tiêu tiếp theo mà chưa kịp ghi nhận thành quả. Não cần khoảnh khắc "checkpoint" để củng cố pattern thành công — không chỉ để tận hưởng.',
      actionPrompt: 'Ghi 1 câu về điều bạn làm đúng trong quá trình này — không phải may mắn hay hoàn cảnh.',
      toneNote: 'Frame là data collection, không phải celebration cảm xúc.',
    },
    setback: {
      headline: '📉 Thất bại là data — không phải định nghĩa',
      body: 'Hệ thống tốt nhất cũng có lần sai. Câu hỏi quan trọng không phải "tại sao tôi thất bại" mà là "biến số nào mình đã đánh giá sai". Phân tích đúng sẽ cho output tốt hơn tự trách.',
      actionPrompt: 'Viết 1 câu: "Biến số tôi đánh giá sai là ___, lần sau tôi sẽ kiểm tra ___."',
      toneNote: 'Post-mortem framework. INTJ cần cấu trúc để xử lý thất bại.',
    },
    monday_morning: {
      headline: '📅 Tuần mới — chọn 1 mục tiêu thực sự quan trọng',
      body: 'Không phải list dài. Chỉ 1 thứ mà nếu hoàn thành tuần này, tuần này sẽ thành công — dù có gì xảy ra đi nữa. Clarity về priority làm INTJ hoạt động tốt nhất.',
      actionPrompt: 'Điền vào: "Tuần này thành công nếu tôi hoàn thành ___."',
      toneNote: 'Crisp, task-oriented. Không cần warm-up.',
    },
    friday_reflection: {
      headline: '🔎 Cuối tuần — systems check',
      body: 'Không phải nhìn lại để tự trách hay để tự hào — để calibrate. Điều gì hiệu quả? Điều gì không? Tuần sau cần điều chỉnh gì? 10 phút reflection có thể tiết kiệm nhiều giờ tuần sau.',
      actionPrompt: 'Trả lời 3 câu: Hiệu quả nhất là gì? Không hiệu quả là gì? Thay đổi 1 thứ tuần sau là gì?',
      toneNote: 'Analytical recap. INTJ thích cấu trúc review.',
    },
    health_reminder: {
      headline: '🧬 Body = hardware — cần maintenance định kỳ',
      body: 'INTJ hay ưu tiên trí tuệ và bỏ qua thể xác cho đến khi cơ thể buộc dừng lại. Research rõ ràng: cognitive performance giảm mạnh khi thiếu ngủ, ít vận động. Đây là input/output, không phải "sức khỏe" theo nghĩa chung chung.',
      actionPrompt: 'Kiểm tra: đêm qua ngủ đủ chưa? Hôm nay đã đứng dậy khỏi ghế chưa?',
      toneNote: 'Performance framing. Dữ liệu và logic, không phải lời khuyên sức khỏe chung.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // INTP — Nhà Tư Duy
  // ─────────────────────────────────────────────────────────
  INTP: {
    new_match: {
      headline: '🧩 Match mới — câu hỏi thú vị hơn câu trả lời',
      body: 'Đừng cố phân loại người kia ngay. Tiếp cận như một hệ thống thú vị cần khám phá — câu hỏi hay thường dẫn đến kết nối thật hơn câu trả lời hoàn hảo.',
      actionPrompt: 'Nghĩ ra 1 câu hỏi mà bạn thực sự tò mò — không phải câu hỏi "bình thường".',
      toneNote: 'Intellectual curiosity framing. INTP ghét small talk nhưng thích rabbit holes.',
    },
    presentation_tmr: {
      headline: '🎤 Ngày mai thuyết trình — đơn giản hóa là kỹ năng',
      body: 'INTP thường chuẩn bị quá nhiều layer và khó biết dừng ở đâu. Người nghe cần 1 ý rõ, không cần toàn bộ framework. Bước cuối: cắt 30% và kiểm tra xem ý chính còn nguyên không.',
      actionPrompt: 'Tóm tắt toàn bộ nội dung trong 2 câu — nếu không làm được, cần đơn giản hóa thêm.',
      toneNote: 'Đề cao sự clarity. INTP biết nhiều nhưng cần help với packaging.',
    },
    stressed: {
      headline: '🌀 Đang bị cuốn — bước ra khỏi vòng lặp',
      body: 'INTP hay bị mắc kẹt trong analysis loop khi stress — phân tích vấn đề thay vì giải quyết. Nhận ra loop đang chạy là bước đầu tiên để thoát ra.',
      actionPrompt: 'Viết ra điều đang vòng vòng trong đầu — đặt bút xuống — làm 1 việc vật lý nhỏ.',
      toneNote: 'Metacognition approach. INTP nhận ra pattern sẽ có thể tự điều chỉnh.',
    },
    conflict_work: {
      headline: '💬 Xung đột — bạn thấy logic, họ thấy threat',
      body: 'Khi INTP trình bày lý lẽ và người kia phản ứng cảm xúc — đó không phải họ phi lý. Đó là hai hệ thống đang chạy khác ngôn ngữ. Dịch sang ngôn ngữ của họ trước khi argue.',
      actionPrompt: 'Thử paraphrase lập trường của người kia cho đến khi họ nói "đúng" — rồi mới tiếp tục.',
      toneNote: 'Systems thinking về communication. Không moralize.',
    },
    burnout: {
      headline: '💤 Kiệt sức kiểu INTP — không hứng thú với mọi thứ',
      body: 'INTP burnout không giống burnout thông thường — không phải quá nhiều việc mà là quá ít ý nghĩa. Khi không còn thấy thú vị, não shut down. Cần tìm lại spark, không phải nghỉ ngơi thêm.',
      actionPrompt: 'Nhớ lại 1 thứ gần đây khiến bạn thực sự tò mò — dù chỉ 5 phút. Quay lại đó.',
      toneNote: 'Re-engagement over rest. INTP cần stimulation, không phải relaxation.',
    },
    celebration: {
      headline: '✅ Xong rồi — nhớ đóng tab này lại',
      body: 'INTP hay quên celebrate vì đã chuyển sang vấn đề tiếp theo. Closing loops quan trọng cho não — nó cho phép bạn fully engage với thứ tiếp theo mà không bị drag back.',
      actionPrompt: 'Nói với 1 người về điều vừa hoàn thành — không phải khoe, là để closure.',
      toneNote: 'Functional framing. Celebration as system hygiene.',
    },
    setback: {
      headline: '🔬 Thất bại đáng giá hơn thành công ngẫu nhiên',
      body: 'Thất bại có predictable cause thường dạy nhiều hơn thành công may mắn. INTP có công cụ tốt để phân tích — dùng nó đúng lúc này thay vì để cảm xúc lấn át.',
      actionPrompt: 'Hypothesis: "Tôi thất bại vì ___. Để test điều này, lần sau tôi sẽ ___."',
      toneNote: 'Scientific detachment. INTP handle failure tốt hơn khi framed as experiment.',
    },
    monday_morning: {
      headline: '🗓️ Thứ Hai — chọn 1 vấn đề thú vị để giải tuần này',
      body: 'Không phải task list. Là 1 câu hỏi hoặc vấn đề khiến bạn muốn làm việc. INTP làm việc tốt nhất khi có intellectual hook, không phải obligation.',
      actionPrompt: 'Tuần này bạn muốn trả lời câu hỏi nào? Viết xuống.',
      toneNote: 'Curiosity-driven framing. Không phải productivity framework cứng nhắc.',
    },
    friday_reflection: {
      headline: '📚 Tuần này học được gì?',
      body: 'Câu hỏi đúng cho INTP cuối tuần không phải "làm được bao nhiêu" mà là "hiểu thêm được gì". Learning là output quan trọng nhất.',
      actionPrompt: 'Viết 1 điều bạn hiểu khác đi so với đầu tuần — dù nhỏ.',
      toneNote: 'Knowledge accumulation framing. INTP đánh giá cao intellectual growth.',
    },
    health_reminder: {
      headline: '🏃 Vận động = CPU cooling cho não',
      body: 'Các nghiên cứu cho thấy 20 phút vận động tăng BDNF — protein liên quan trực tiếp đến learning và problem-solving. INTP làm việc với não — cần bảo trì não.',
      actionPrompt: 'Làm 1 thứ vật lý trong 20 phút hôm nay. Sau đó quay lại vấn đề đang nghĩ.',
      toneNote: 'Neurological framing. Evidence-based.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ENTJ — Chỉ Huy
  // ─────────────────────────────────────────────────────────
  ENTJ: {
    new_match: {
      headline: '🤝 Match mới — leader biết lắng nghe trước',
      body: 'ENTJ hay vào cuộc với nhiều năng lượng và định hướng ngay từ đầu. Nhưng người giỏi nhất về kết nối thường là người hỏi nhiều nhất, không phải nói nhiều nhất. Thử lần này.',
      actionPrompt: 'Đặt mục tiêu: trong 15 phút đầu, hỏi nhiều hơn nói. Xem điều gì xảy ra.',
      toneNote: 'Challenge-based. ENTJ respond well với "thử thách" hơn là "lời khuyên".',
    },
    presentation_tmr: {
      headline: '🎯 Ngày mai — bạn đã sẵn sàng hơn bạn nghĩ',
      body: 'ENTJ chuẩn bị kỹ và thường execute tốt dưới áp lực. Điều duy nhất cần check: bạn có đang nói cho đúng audience không? Adjust message cho người nghe, không phải chỉ optimize nội dung.',
      actionPrompt: 'Review lại: người quyết định trong phòng đó cần nghe gì nhất để say yes?',
      toneNote: 'Strategic framing. ENTJ cần tactical insight hơn emotional support.',
    },
    stressed: {
      headline: '⚡ Stress = dấu hiệu đang ôm quá nhiều',
      body: 'ENTJ không quen delegate vì tin làm nhanh hơn giải thích cho người khác. Nhưng đây chính là bẫy — bạn là bottleneck của hệ thống. Giải phóng bản thân = giải phóng toàn đội.',
      actionPrompt: 'Nhìn list việc — chọn 1 thứ người khác có thể làm được 80% tốt như bạn. Delegate ngay.',
      toneNote: 'Systems efficiency. ENTJ nghe được khi framed là bottleneck, không phải "cần nghỉ".',
    },
    conflict_work: {
      headline: '🧭 Conflict — thắng trận có thể thua chiến tranh',
      body: 'ENTJ giỏi argue và thường đúng. Nhưng người bị thuyết phục bằng force sẽ execute kém hơn người genuinely aligned. Đôi khi để người kia "thắng" nhỏ để win lớn hơn.',
      actionPrompt: 'Xác định: mục tiêu thực sự ở đây là gì? Alignment hay correctness?',
      toneNote: 'Long-game strategy. ENTJ nghĩ dài hạn khi được remind.',
    },
    burnout: {
      headline: '🔴 Burnout — hệ thống của bạn cần refactor',
      body: 'ENTJ burnout thường không phải do làm nhiều — mà do làm không đúng thứ. Khi năng lượng cạn, kiểm tra xem bạn đang spend time vào what vs. where your leverage is highest.',
      actionPrompt: 'Liệt kê 5 việc chiếm nhiều time nhất. Đánh dấu việc nào thực sự cần bạn.',
      toneNote: 'ROI on time framing. Strategic, not emotional.',
    },
    celebration: {
      headline: '🏆 Milestone — acknowledge team trước khi next step',
      body: 'ENTJ hay skip celebration để tiến thẳng. Nhưng team cần khoảnh khắc này để recharge và stay motivated. Đây không phải luxury — đây là leadership.',
      actionPrompt: 'Ghi nhận 1 người trong team đã đóng góp quan trọng cho kết quả này — nói với họ cụ thể.',
      toneNote: 'Leadership responsibility framing. ENTJ cần reminder về team dynamics.',
    },
    setback: {
      headline: '📊 Thất bại — phân tích ngay khi còn nhớ rõ',
      body: 'Window để extract learning tốt nhất là trong 48 giờ đầu. ENTJ cần action plan, không phải thời gian để "cảm thấy tốt hơn". Phân tích → adjust → move forward.',
      actionPrompt: 'Viết post-mortem ngắn: quyết định nào sai? Thông tin nào thiếu? Sẽ làm gì khác?',
      toneNote: 'Action-oriented. ENTJ xử lý failure tốt nhất khi có clear next steps.',
    },
    monday_morning: {
      headline: '📌 Thứ Hai — set the pace for the week',
      body: 'Cách bạn bắt đầu tuần ảnh hưởng đến cả team. Clarity về priorities từ sớm tránh được nhiều meetings không cần thiết sau đó.',
      actionPrompt: 'Communicate 3 priorities tuần này cho team trước 10 giờ sáng.',
      toneNote: 'Leadership-first. ENTJ energized khi leading others.',
    },
    friday_reflection: {
      headline: '📈 Tuần này — kết quả so với mục tiêu?',
      body: 'Không phải để tự phán xét — là để calibrate. Gap giữa expected và actual cho biết cần adjust prediction hay execution.',
      actionPrompt: 'So sánh Monday priorities với kết quả thực tế. Nhận xét 1 câu về từng mục.',
      toneNote: 'Performance review framing. ENTJ thích data-driven reflection.',
    },
    health_reminder: {
      headline: '💪 Body performance ảnh hưởng executive function',
      body: 'Sleep deprivation giảm decision quality rõ rệt — thứ ENTJ cần nhất. Không phải compromise, là optimization.',
      actionPrompt: 'Kiểm tra: tuần này trung bình ngủ mấy tiếng? Target 7h tối thiểu tuần sau.',
      toneNote: 'Performance optimization, not wellness lecture.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ENTP — Người Tranh Luận
  // ─────────────────────────────────────────────────────────
  ENTP: {
    new_match: {
      headline: '🎲 Match mới — đừng test họ quá sớm',
      body: 'ENTP hay bắt đầu bằng cách challenge người kia để xem phản ứng. Nhưng không phải ai cũng biết đây là cách bạn kết nối — một số người sẽ rút lui trước khi bạn thấy họ thật sự.',
      actionPrompt: 'Lần này thử tìm điểm đồng thuận trước — save debate cho sau khi đã có trust.',
      toneNote: 'Gentle reframe. ENTP cần reminder về impact của style lên người khác.',
    },
    presentation_tmr: {
      headline: '🎙️ Ngày mai — structure giúp ý tưởng của bạn land',
      body: 'ENTP có ý tưởng tốt nhưng đôi khi nhảy từ point này sang point khác quá nhanh. Người nghe cần road map. Bỏ 15 phút xây skeleton trước khi tùy hứng.',
      actionPrompt: 'Outline 3 điểm chính theo thứ tự — practice nói transition giữa chúng.',
      toneNote: 'Structure as amplifier, not constraint.',
    },
    stressed: {
      headline: '🌪️ Quá nhiều options — thu hẹp lại',
      body: 'ENTP stress hay do thấy quá nhiều hướng có thể đi và không chọn được. Paradox of choice. Đôi khi quyết định nhanh một hướng và iterate tốt hơn phân tích vô tận.',
      actionPrompt: 'Coin flip test: tung đồng xu cho 2 lựa chọn — xem bạn muốn kết quả nào. Đó là câu trả lời.',
      toneNote: 'Anti-analysis-paralysis. ENTP cần permission to decide.',
    },
    conflict_work: {
      headline: '🤺 Xung đột — winning argument ≠ winning relationship',
      body: 'ENTP rất giỏi argue và biết mình giỏi. Nhưng người "thua" tranh luận thường không thay đổi quan điểm — chỉ im lặng. Influence > debate.',
      actionPrompt: 'Thay vì prove they\'re wrong, thử: "Tôi hiểu bạn đang lo về ___. Còn điều gì nữa không?"',
      toneNote: 'Reframe debate as influence strategy.',
    },
    burnout: {
      headline: '🔋 Boredom burnout — cần stimulus mới',
      body: 'ENTP ít bị burnout do overwork mà thường do understimulation — làm mãi 1 thứ không còn thú vị. Đây là tín hiệu cần inject novelty, không phải nghỉ ngơi.',
      actionPrompt: 'Tìm 1 angle hoàn toàn mới cho vấn đề đang làm — hoặc thêm 1 constraint vào để thú vị hơn.',
      toneNote: 'Novelty as fuel. ENTP recharges through new problems.',
    },
    celebration: {
      headline: '🎉 Làm được rồi — share energy với người xung quanh',
      body: 'ENTP celebrate tốt — hãy dùng moment này để cũng celebrate team. Năng lượng tích cực của bạn là infectious khi bạn choose to direct nó.',
      actionPrompt: 'Invite ít nhất 1 người để share khoảnh khắc này — không phải brag, là connect.',
      toneNote: 'Social energy amplification.',
    },
    setback: {
      headline: '🔁 Thất bại = iteration, không phải kết thúc',
      body: 'ENTP naturally pivot tốt. Vấn đề là đôi khi pivot trước khi extract đủ learning từ failure. Dừng 10 phút để note lại trước khi chuyển hướng.',
      actionPrompt: 'Viết 3 bullet: đã thử gì, kết quả thực tế là gì, hypothesis tiếp theo là gì.',
      toneNote: 'Iteration framing. ENTP comfortable với failure khi có next step.',
    },
    monday_morning: {
      headline: '🚀 Tuần mới — chọn 1 experiment để chạy',
      body: 'Không phải task list nhàm. Tuần này bạn sẽ test giả thuyết gì? ENTP làm việc tốt nhất khi có intellectual stakes.',
      actionPrompt: 'Câu hỏi: "Tuần này tôi sẽ test xem ___." Điền vào.',
      toneNote: 'Experiment framing. Gamify the week.',
    },
    friday_reflection: {
      headline: '🧪 Cuối tuần — experiment results?',
      body: 'Nếu đầu tuần bạn set một hypothesis, giờ là lúc check kết quả. Không cần hoàn hảo — chỉ cần honest.',
      actionPrompt: 'Hypothesis của tuần là gì? Kết quả thực tế? Rút ra được gì?',
      toneNote: 'Closing experiment loops. ENTP thích thấy cycle hoàn chỉnh.',
    },
    health_reminder: {
      headline: '🏃 Exercise = nhân viên mới cho não bạn',
      body: 'Aerobic exercise tạo new neurons ở hippocampus — vùng liên quan đến creativity và connection-making. ENTP muốn ý tưởng mới? Đây là shortcut sinh học.',
      actionPrompt: 'Thử workout trước khi bắt đầu brainstorm lần sau — note xem quality ý tưởng có khác không.',
      toneNote: 'Biohacking framing. ENTP thích thử nghiệm trên bản thân.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // INFJ — Người Ủng Hộ
  // ─────────────────────────────────────────────────────────
  INFJ: {
    new_match: {
      headline: '🌊 Match mới — allow connection to develop naturally',
      body: 'INFJ hay "scan" người mới rất nhanh và đôi khi kết luận sớm — tốt hay không tốt. Nhưng người ta thường reveal phần tốt nhất sau thời gian. Allow thêm data points.',
      actionPrompt: 'Cuộc trò chuyện này: focus vào 1 điều thực sự ấn tượng về người kia — ghi nhận.',
      toneNote: 'Gentle curiosity framing. INFJ cần permission to be present.',
    },
    presentation_tmr: {
      headline: '💫 Ngày mai — bạn có điều gì đó thật sự muốn nói',
      body: 'INFJ làm tốt nhất khi connect với why — lý do thực sự bạn muốn người kia nghe điều này. Kết nối với purpose của bạn trước, kỹ thuật sẽ follow.',
      actionPrompt: 'Viết 1 câu: "Tôi muốn người nghe rời phòng này với cảm giác/hiểu biết ___."',
      toneNote: 'Purpose-driven framing. INFJ perform khi connected to meaning.',
    },
    stressed: {
      headline: '🌿 Đang overwhelmed — về với bản thân trước',
      body: 'INFJ hấp thụ cảm xúc của người xung quanh đến mức đôi khi không phân biệt được đâu là stress của mình đâu là của người khác. Cần tạo khoảng cách để "sort" lại.',
      actionPrompt: 'Dành 15 phút một mình — không phone, không social. Chỉ ngồi và notice bạn đang cảm thấy gì.',
      toneNote: 'Restoration framing. INFJ cần solitude as recharge, not isolation.',
    },
    conflict_work: {
      headline: '🕊️ Xung đột — bạn thấy điều người khác không thấy',
      body: 'INFJ thường biết resolution ngay từ đầu nhưng không biết cách bring người khác đến đó mà không áp đặt. Dẫn bằng câu hỏi tốt hơn câu trả lời.',
      actionPrompt: 'Thay vì đưa ra giải pháp, thử: "Điều gì quan trọng nhất với bạn trong tình huống này?"',
      toneNote: 'Socratic leadership. INFJ có diplomatic intelligence.',
    },
    burnout: {
      headline: '🔮 Burnout INFJ — ý nghĩa đang cạn, không phải năng lượng',
      body: 'INFJ burn out khi công việc mất đi connection với purpose. Nghỉ ngơi không giải quyết vấn đề gốc. Cần reconnect với lý do tại sao bạn làm điều này.',
      actionPrompt: 'Nhớ lại 1 khoảnh khắc công việc này có ý nghĩa. Điều gì tạo ra khoảnh khắc đó?',
      toneNote: 'Meaning restoration, not rest prescription.',
    },
    celebration: {
      headline: '✨ Làm được — allow yourself to receive this',
      body: 'INFJ hay minimize thành công của mình hoặc chuyển focus sang "còn nhiều việc phải làm". Học cách nhận sự ghi nhận cũng là kỹ năng quan trọng.',
      actionPrompt: 'Nói với mình 1 câu không bắt đầu bằng "nhưng" hay "vẫn còn". Chỉ ghi nhận điều đã làm được.',
      toneNote: 'Permission to receive. INFJ tend to deflect praise.',
    },
    setback: {
      headline: '🌱 Thất vọng — cảm xúc này cũng cần được xử lý',
      body: 'INFJ hay phân tích thất bại rất sâu nhưng đôi khi bỏ qua việc actually process cảm xúc đi kèm. Cả hai đều cần thiết để move forward hoàn toàn.',
      actionPrompt: 'Viết ra cảm xúc thật sự đang có — không cần giải thích tại sao hay rút ra bài học ngay.',
      toneNote: 'Emotional processing first. INFJ cần validate feelings trước analysis.',
    },
    monday_morning: {
      headline: '🌅 Tuần mới — connect với meaning trước khi bắt đầu',
      body: 'INFJ làm tốt nhất khi biết công việc tuần này kết nối với điều gì lớn hơn. Dù nhỏ — tìm ra thread đó.',
      actionPrompt: 'Câu hỏi: Tuần này, việc tôi làm sẽ giúp ai hoặc tạo ra điều gì tốt hơn?',
      toneNote: 'Purpose anchoring. INFJ cần meaning hook để start strong.',
    },
    friday_reflection: {
      headline: '🌙 Cuối tuần — bạn đã give đủ cho bản thân chưa?',
      body: 'INFJ thường kiểm tra xem đã làm đủ cho người khác chưa. Lần này, kiểm tra ngược lại — bạn đã receive đủ, rest đủ, exist vì bản thân đủ chưa?',
      actionPrompt: 'Đánh giá 1-5: tuần này bạn chăm sóc bản thân được mấy điểm? Tuần sau muốn thay đổi gì?',
      toneNote: 'Self-care check. INFJ tend to neglect self in service of others.',
    },
    health_reminder: {
      headline: '🧘 Cơ thể cần attention như mọi thứ khác bạn care about',
      body: 'INFJ hay bỏ qua cơ thể khi đang trong mental/emotional world. Nhưng physical wellbeing ảnh hưởng trực tiếp đến clarity của trực giác và khả năng empathy.',
      actionPrompt: 'Check in với cơ thể: đang đói không? Căng vai cổ không? Uống nước chưa?',
      toneNote: 'Body awareness as intuition support.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // INFP — Người Hòa Giải
  // ─────────────────────────────────────────────────────────
  INFP: {
    new_match: {
      headline: '🌸 Match mới — chia sẻ một phần thật của bạn',
      body: 'INFP thường để người kia nói trước và observe từ xa. Nhưng authentic connection cần 2 chiều. Chia sẻ 1 điều thật về bản thân tạo ra invitation để người kia cũng mở lòng.',
      actionPrompt: 'Chia sẻ 1 điều bạn thực sự quan tâm — không phải small talk, là điều có ý nghĩa với bạn.',
      toneNote: 'Vulnerability as bridge. INFP connects deeply but needs push to initiate.',
    },
    presentation_tmr: {
      headline: '🎨 Ngày mai — bạn có story, đừng chỉ có slides',
      body: 'INFP truyền đạt tốt nhất khi share personal perspective và meaning. Đừng cố présenter như robot — inject cái nhìn của bạn vào, đó là điều khiến bài của bạn khác biệt.',
      actionPrompt: 'Thêm 1 moment personal vào bài — điều này có ý nghĩa với bạn như thế nào.',
      toneNote: 'Authentic voice encouragement.',
    },
    stressed: {
      headline: '🌀 Overwhelmed — bạn không cần fix mọi thứ ngay',
      body: 'INFP carry nặng cảm xúc — của mình và của người khác. Khi stress, ranh giới giữa hai loại này mờ đi. Cần clarity về đâu là trách nhiệm thực sự của bạn.',
      actionPrompt: 'Viết ra: thứ nào trong list lo lắng này thực sự là của bạn vs. của người khác?',
      toneNote: 'Boundary clarification without judgment.',
    },
    conflict_work: {
      headline: '🕊️ Xung đột — cảm xúc của bạn cũng hợp lệ',
      body: 'INFP hay suppress lập trường của mình để giữ hòa khí. Nhưng unspoken resentment build up và nổ to hơn sau này. Nói sớm, nhẹ nhàng, rõ ràng — tốt hơn dồn nén.',
      actionPrompt: '"Tôi muốn chia sẻ 1 điều tôi đang cảm thấy về tình huống này — bạn có thể nghe không?"',
      toneNote: 'Gentle assertiveness. INFP cần permission to speak up.',
    },
    burnout: {
      headline: '🌾 Kiệt sức — bạn đã give quá nhiều',
      body: 'INFP burnout khi đặt nhu cầu của người khác lên trên quá lâu. Đây không phải lúc cần inspire thêm — cần nghỉ và fill lại bình năng lượng từ những thứ nuôi dưỡng bạn.',
      actionPrompt: 'Làm 1 thứ chỉ vì bạn thích — không có mục đích nào khác.',
      toneNote: 'Permission to receive without giving.',
    },
    celebration: {
      headline: '🌟 Bạn làm được điều đúng theo cách của bạn',
      body: 'INFP hay so sánh achievement của mình với người khác hoặc với tiêu chuẩn tưởng tượng. Celebrate theo giá trị của bạn — không phải theo external benchmark.',
      actionPrompt: 'Viết lý do tại sao achievement này có ý nghĩa với bạn — theo ngôn ngữ của bạn.',
      toneNote: 'Values-based celebration. INFP cần internal validation.',
    },
    setback: {
      headline: '🌧️ Thất vọng — allow it, don\'t amplify it',
      body: 'INFP feel deeply — thất vọng có thể trở thành vòng xoáy tự trách. Cảm nhận cảm xúc là cần thiết, nhưng biết khi nào để step out cũng quan trọng.',
      actionPrompt: 'Set timer 15 phút để fully feel. Khi chuông reo: viết 1 điều nhỏ bạn làm được đúng.',
      toneNote: 'Contain then redirect. INFP need structure around processing.',
    },
    monday_morning: {
      headline: '🌱 Thứ Hai — kết nối với 1 giá trị bạn đang sống tuần này',
      body: 'INFP có energy khi biết công việc align với giá trị cốt lõi. Dù công việc nhỏ hay lớn — tìm thread kết nối với điều bạn thực sự tin vào.',
      actionPrompt: 'Tuần này bạn đang sống theo giá trị nào? (ví dụ: chân thực, sáng tạo, quan tâm..)',
      toneNote: 'Values anchoring for motivation.',
    },
    friday_reflection: {
      headline: '🌙 Cuối tuần — bạn đã là chính mình được bao nhiêu?',
      body: 'Không phải productivity — là authenticity. Những khoảnh khắc nào bạn cảm thấy thật sự là mình? Những khoảnh khắc nào bạn bị mask?',
      actionPrompt: 'Nhớ lại 1 moment trong tuần bạn cảm thấy alive và genuine. Điều gì tạo ra nó?',
      toneNote: 'Authenticity reflection. INFP values being over doing.',
    },
    health_reminder: {
      headline: '🌿 Chăm sóc cơ thể như bạn chăm sóc người khác',
      body: 'INFP hay treat người khác tốt hơn treat bản thân. Thử approach self-care theo cách bạn sẽ care cho người bạn yêu quý.',
      actionPrompt: 'Điều người bạn thân nhất sẽ nói bạn cần làm cho cơ thể tuần này là gì?',
      toneNote: 'Compassion redirect inward.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ENFJ — Người Dẫn Đường
  // ─────────────────────────────────────────────────────────
  ENFJ: {
    new_match: {
      headline: '🌟 Match mới — bạn có năng lượng thu hút, dùng để lắng nghe',
      body: 'ENFJ tự nhiên tạo ra môi trường người khác muốn chia sẻ. Sử dụng điều đó để truly listen — không phải để figure out cách help ngay.',
      actionPrompt: 'Trong 30 phút đầu: chỉ hỏi và lắng nghe. Resist urge to advise.',
      toneNote: 'Facilitate connection over fixing.',
    },
    presentation_tmr: {
      headline: '🎤 Ngày mai — bạn biết cách read the room',
      body: 'ENFJ có intuition tốt về audience. Trust nó. Prepare content nhưng allow yourself to adapt dựa trên energy của phòng.',
      actionPrompt: 'Chuẩn bị 1 anecdote personal có thể insert vào bất kỳ đâu nếu cảm thấy audience đang disconnect.',
      toneNote: 'Confidence in social intelligence.',
    },
    stressed: {
      headline: '💚 Đang lo cho mọi người — ai đang lo cho bạn?',
      body: 'ENFJ hay last to ask for help. Nhưng helping from empty tank không hiệu quả và không sustainable. Cho phép người khác support bạn.',
      actionPrompt: 'Gọi hoặc nhắn cho 1 người và nói thật: "Tôi đang stress và cần được nghe."',
      toneNote: 'Vulnerability and receiving support.',
    },
    conflict_work: {
      headline: '⚖️ Xung đột — bạn thấy cả 2 phía, đừng quên phía mình',
      body: 'ENFJ xuất sắc ở việc understand multiple perspectives đến mức hay bỏ quên lập trường của chính mình. Mediate, nhưng cũng có voice.',
      actionPrompt: 'Sau khi nghe cả 2 phía: "Từ góc nhìn của tôi, điều tôi cần là ___."',
      toneNote: 'Assert own position while mediating.',
    },
    burnout: {
      headline: '🌊 Burnout ENFJ — đã give quá nhiều, quá lâu',
      body: 'Burnout của ENFJ thường invisible với người xung quanh vì bạn vẫn smile và function. Nhưng bên trong tank trống rỗng. Acknowledge điều này — với chính mình trước.',
      actionPrompt: 'Honest self-check: 1-10, tank của bạn hiện tại đang ở mức mấy?',
      toneNote: 'Internal acknowledgment before external help.',
    },
    celebration: {
      headline: '🎊 Celebrate — và invite người bạn đã giúp để celebrate cùng',
      body: 'ENFJ thích ý nghĩa cộng đồng trong thành công. Đây là lúc tạo ra khoảnh khắc shared joy.',
      actionPrompt: 'Share achievement này với người đã đồng hành cùng bạn.',
      toneNote: 'Shared celebration. ENFJ energized by collective joy.',
    },
    setback: {
      headline: '🌱 Thất bại — bạn sẽ turn này thành lesson cho người khác',
      body: 'ENFJ naturally find meaning through sharing. Processing failure by imagining how this will help someone else understand something tương tự.',
      actionPrompt: 'Bài học từ thất bại này là gì? Ai có thể benefit từ bài học đó?',
      toneNote: 'Meaning-making through teaching.',
    },
    monday_morning: {
      headline: '🌅 Thứ Hai — set intention cho người bạn muốn serve tuần này',
      body: 'ENFJ energized bởi biết mình đang tạo ra tác động cho ai. Bắt đầu tuần với điều đó trong đầu.',
      actionPrompt: 'Người nào trong team hoặc cuộc sống bạn muốn thực sự help tuần này?',
      toneNote: 'Service-oriented motivation.',
    },
    friday_reflection: {
      headline: '💚 Tuần này — bạn đã impact ai?',
      body: 'Không phải task list — là người. ENFJ đo thành công theo meaningful connections và positive impact.',
      actionPrompt: 'Kể tên 1 người bạn đã thực sự help tuần này — dù nhỏ.',
      toneNote: 'Impact-based reflection.',
    },
    health_reminder: {
      headline: '🛡️ Bạn không thể pour from empty cup',
      body: 'ENFJ biết điều này về người khác nhưng hay forget áp dụng cho mình. Recharge là prerequisite để continue giving.',
      actionPrompt: 'Schedule 1 block thời gian chỉ cho bạn trong tuần tới — protect nó như appointment quan trọng.',
      toneNote: 'Self-care as mission-critical.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ENFP — Người Vận Động
  // ─────────────────────────────────────────────────────────
  ENFP: {
    new_match: {
      headline: '✨ Match mới — năng lượng của bạn là asset, calibrate nó',
      body: 'ENFP mang lại excitement tự nhiên trong kết nối. Nhưng intensity quá sớm có thể overwhelm người introvert hoặc reserved. Read their energy và match nó.',
      actionPrompt: 'Notice pace của người kia — adjust energy của bạn để complement, không phải dominate.',
      toneNote: 'Social attunement over natural enthusiasm.',
    },
    presentation_tmr: {
      headline: '🎉 Ngày mai — bạn là bài thuyết trình hay nhất của mình',
      body: 'ENFP thuyết phục khi authentic và passionate. Đừng cố script quá nhiều — know your key points, rồi let personality carry the rest.',
      actionPrompt: 'Practice speaking từng section một lần — không đọc, không memorize, chỉ nói tự nhiên.',
      toneNote: 'Authenticity over polish.',
    },
    stressed: {
      headline: '🌪️ Nhiều thứ cùng lúc — chọn 1 và bắt đầu từ đó',
      body: 'ENFP stress khi thấy quá nhiều thứ cần làm mà không biết bắt đầu từ đâu. Trick không phải prioritize — là just start bất kỳ thứ gì và momentum sẽ come.',
      actionPrompt: 'Chọn task nhỏ nhất trong list — set timer 25 phút — bắt đầu ngay bây giờ.',
      toneNote: 'Action over planning. ENFP unstick through movement.',
    },
    conflict_work: {
      headline: '💬 Xung đột — enthusiasm của bạn có thể intimidate người khác',
      body: 'ENFP thường không có ý xấu nhưng energy cao có thể khiến người khác cảm thấy bị lấn át. Slow down, lower voice — không phải để be less, mà để be heard.',
      actionPrompt: 'Trong cuộc nói chuyện tiếp theo về xung đột này: nói chậm hơn 20%, pause nhiều hơn.',
      toneNote: 'Calibration, not suppression.',
    },
    burnout: {
      headline: '🍃 Năng lượng xuống thấp — bạn cần inspiration input',
      body: 'ENFP burnout khi thiếu novelty và connection. Nghỉ ngơi passive không đủ — cần gặp người interesting, đọc thứ gì đó mới, hoặc explore idea ngoài vùng comfort.',
      actionPrompt: 'Tìm 1 podcast, article, hoặc người có perspective hoàn toàn khác bạn — consume ngay hôm nay.',
      toneNote: 'Inspiration as fuel, not rest.',
    },
    celebration: {
      headline: '🎊 YES! Celebrate to the fullest — bạn giỏi cái này',
      body: 'ENFP sinh ra để celebrate. Đừng minimize hay chuyển topic ngay. Sit with this win.',
      actionPrompt: 'Share với 3 người bạn quan tâm. Make it a moment.',
      toneNote: 'Full permission to celebrate big.',
    },
    setback: {
      headline: '🌈 Thất vọng OK — next chapter vẫn đang được viết',
      body: 'ENFP naturally resilient nhưng đôi khi catastrophize trong moment. Remind yourself: bạn đã vượt qua thứ khó hơn trước đây. Điều này cũng sẽ pass.',
      actionPrompt: 'Nhớ lại 1 thất bại trước mà bây giờ nhìn lại thấy bình thường hoặc thậm chí tốt. Cái này có thể vậy không?',
      toneNote: 'Resilience recall. ENFP có track record tốt nhưng hay quên.',
    },
    monday_morning: {
      headline: '🌅 Tuần mới — excitement là fuel, focus là multiplier',
      body: 'ENFP có nhiều ý tưởng. Tuần này, pick 1 và go deep thay vì start 5 things. Excitement bạn có đủ rồi — cần add thêm follow-through.',
      actionPrompt: 'Từ tất cả thứ muốn làm tuần này, chọn 1. Commit publicly với 1 người.',
      toneNote: 'Focus encouragement. Not limiting but channeling.',
    },
    friday_reflection: {
      headline: '🔮 Cuối tuần — những kết nối nào có ý nghĩa?',
      body: 'ENFP đo một tuần tốt bằng meaningful connections và moments of aliveness. Nhìn lại tuần qua theo lens đó.',
      actionPrompt: 'Khoảnh khắc nào trong tuần bạn cảm thấy most alive? Nhân tố nào tạo ra điều đó?',
      toneNote: 'Aliveness-based reflection.',
    },
    health_reminder: {
      headline: '⚡ Body fuels the enthusiasm bạn sống nhờ nó',
      body: 'ENFP energy levels directly affect mood và creativity. Sleep, hydration, movement không phải optional — là infrastructure của lifestyle bạn muốn có.',
      actionPrompt: 'Rate 1-10: sleep, hydration, movement tuần này. Cái nào thấp nhất — improve đó tuần sau.',
      toneNote: 'Energy management as lifestyle.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ISTJ — Người Hậu Cần
  // ─────────────────────────────────────────────────────────
  ISTJ: {
    new_match: {
      headline: '📋 Match mới — không cần checklist, cần presence',
      body: 'ISTJ hay approach người mới bằng tư duy đánh giá và so sánh với tiêu chuẩn. Thử lần này: just be present và curious mà không có agenda.',
      actionPrompt: 'Không cần đánh giá gì trong cuộc gặp này. Chỉ notice điều bạn thấy thú vị.',
      toneNote: 'Presence over evaluation. Rare nudge for ISTJ.',
    },
    presentation_tmr: {
      headline: '✅ Bạn đã chuẩn bị kỹ — trust the preparation',
      body: 'ISTJ thường overprepare và sau đó lo lắng về những thứ ngoài tầm kiểm soát. Nếu đã chuẩn bị đúng cách, giờ cần nghỉ ngơi để execute tốt.',
      actionPrompt: 'Review checklist lần cuối — check xong, close máy tính, nghỉ ngơi.',
      toneNote: 'Completion signal. ISTJ cần clear stop point.',
    },
    stressed: {
      headline: '🗂️ Stress = có thứ gì đó nằm ngoài hệ thống của bạn',
      body: 'ISTJ stress khi có unexpected element không fit vào structure. Thay vì resist, tìm cách incorporate nó vào — update hệ thống thay vì fight với thực tế.',
      actionPrompt: 'Cụ thể hóa: điều gì đang làm bạn stress? Có thể tạo process hay checklist cho nó không?',
      toneNote: 'Systematize the unexpected.',
    },
    conflict_work: {
      headline: '📝 Xung đột — document và facts, nhưng đừng bỏ qua phần người',
      body: 'ISTJ mạnh về facts và procedures. Nhưng conflict giải quyết nhanh hơn khi người kia cảm thấy được nghe, không chỉ được đúng.',
      actionPrompt: 'Trước khi nêu fact, hỏi: "Bạn đang cảm thấy thế nào về tình huống này?"',
      toneNote: 'Human element reminder for ISTJ.',
    },
    burnout: {
      headline: '⚙️ Hệ thống cần maintenance — bạn cũng vậy',
      body: 'ISTJ duty-driven đến mức tiếp tục ngay cả khi cần dừng. Scheduled maintenance prevents breakdown — áp dụng logic này với bản thân.',
      actionPrompt: 'Schedule 1 block rest vào calendar như 1 appointment — không cancel.',
      toneNote: 'Maintenance framing. ISTJ respect scheduled obligations.',
    },
    celebration: {
      headline: '🏅 Nhiệm vụ hoàn thành — acknowledge điều đó',
      body: 'ISTJ hay move on ngay mà không ghi nhận. Nhưng brain cần signal "done" để fully close loop và prepare cho task tiếp theo.',
      actionPrompt: 'Check off list, nói thành lời "xong", cho mình 5 phút không làm gì.',
      toneNote: 'Completion ritual for satisfaction.',
    },
    setback: {
      headline: '🔧 Lỗi xảy ra — phân tích nguyên nhân và update process',
      body: 'ISTJ handle failure tốt nhất khi có systematic approach. Không phải tự trách — là tìm root cause và prevent repeat.',
      actionPrompt: 'Root cause analysis: Failure → Cause → Process change → Prevention measure.',
      toneNote: 'Process improvement framing.',
    },
    monday_morning: {
      headline: '📅 Thứ Hai — plan tuần và protect thời gian focus',
      body: 'ISTJ cần structure để productive nhất. Dành 15 phút đầu tuần để map out schedule sẽ save hours sau đó.',
      actionPrompt: 'Block thời gian cho 3 task quan trọng nhất tuần này trên calendar ngay bây giờ.',
      toneNote: 'Planning as foundation. ISTJ thrives with structure.',
    },
    friday_reflection: {
      headline: '📊 Cuối tuần — commitments vs. completion?',
      body: 'ISTJ tự đánh giá bằng how well they delivered on commitments. Review tuần theo frame đó.',
      actionPrompt: 'Đầu tuần bạn commit những gì? Hoàn thành được bao nhiêu? Gap ở đâu?',
      toneNote: 'Commitment tracking. ISTJ values reliability.',
    },
    health_reminder: {
      headline: '🏃 Bảo trì cơ thể là responsibility, không phải luxury',
      body: 'ISTJ respect obligations. Frame health as an obligation to your future self và the people depending on you.',
      actionPrompt: 'Lên lịch checkup hoặc activity sức khỏe như meeting — với ngày và giờ cụ thể.',
      toneNote: 'Duty-based health motivation.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ISFJ — Người Bảo Vệ
  // ─────────────────────────────────────────────────────────
  ISFJ: {
    new_match: {
      headline: '🌷 Match mới — bạn care, hãy also let them care back',
      body: 'ISFJ tự nhiên quan tâm người khác. Nhưng kết nối thật cần 2 chiều — allow người mới này cơ hội để also show up for you.',
      actionPrompt: 'Chia sẻ 1 điều bạn đang cần hoặc enjoy — không phải chỉ hỏi về người kia.',
      toneNote: 'Reciprocity encouragement.',
    },
    presentation_tmr: {
      headline: '💼 Ngày mai — bạn đã serve người khác đủ lâu để biết cách này',
      body: 'ISFJ practical knowledge và reliability là strengths thật sự. Đừng underestimate — những gì bạn chia sẻ xuất phát từ experience thật.',
      actionPrompt: 'Nhớ lại 1 lần bạn đã actually help ai đó với knowledge này — bring đó vào bài.',
      toneNote: 'Confidence in practical wisdom.',
    },
    stressed: {
      headline: '🤗 Đang lo cho quá nhiều người — check-in với chính mình trước',
      body: 'ISFJ carry người khác đến khi không còn carry được nữa. Check: trong tất cả lo lắng hiện tại, phần nào thực sự là của bạn?',
      actionPrompt: 'Viết list lo lắng — đánh dấu cái nào là việc của bạn, cái nào là của người khác.',
      toneNote: 'Responsibility boundary check.',
    },
    conflict_work: {
      headline: '🗣️ Xung đột — lần này nói ra thay vì absorb',
      body: 'ISFJ hay absorb xung đột và keep peace at personal cost. Nhưng unspoken tension không biến mất — nó accumulate. Nói sớm, nhẹ nhàng, cụ thể.',
      actionPrompt: '"Có điều tôi muốn nói thật lòng — bạn có sẵn sàng nghe không?"',
      toneNote: 'Gentle assertiveness script.',
    },
    burnout: {
      headline: '🌸 Kiệt sức — bạn không thể give what you don\'t have',
      body: 'ISFJ tiếp tục serve ngay khi empty. Nhưng empty serving ảnh hưởng đến quality của care bạn give. Rest là điều kiện để tiếp tục help tốt.',
      actionPrompt: 'Điều gì truly restores bạn? Schedule nó trong 48 giờ tới.',
      toneNote: 'Rest as care prerequisite.',
    },
    celebration: {
      headline: '🌺 Bạn đã làm được — nhận nó vào',
      body: 'ISFJ hay deflect compliments và achievement. Thực hành: nhận sự ghi nhận mà không immediately redirect sang người khác.',
      actionPrompt: 'Khi ai đó chúc mừng bạn: nói "Cảm ơn, tôi vui vì điều đó" — và dừng lại ở đó.',
      toneNote: 'Receiving practice for ISFJ.',
    },
    setback: {
      headline: '🌱 Thất bại — bạn đã try best trong hoàn cảnh đó',
      body: 'ISFJ hay blame mình khi things go wrong dù lý do ngoài tầm kiểm soát. Distinguish: điều gì thực sự trong tầm kiểm soát của bạn và điều gì không?',
      actionPrompt: 'Viết 2 cột: "Tôi kiểm soát được" vs. "Tôi không kiểm soát được". Focus improvement ở cột 1.',
      toneNote: 'Locus of control exercise.',
    },
    monday_morning: {
      headline: '🌻 Thứ Hai — bạn cần gì từ tuần này?',
      body: 'ISFJ hay plan tuần quanh người khác cần gì. Lần này thêm 1 câu: bạn cần gì từ tuần này?',
      actionPrompt: 'Điền vào: "Tuần này tôi cần ___ để feel okay." Đảm bảo điều đó có trong schedule.',
      toneNote: 'Self-need acknowledgment.',
    },
    friday_reflection: {
      headline: '💝 Cuối tuần — bạn đã nhận cũng như đã cho?',
      body: 'ISFJ reflection thường về "tôi đã help đủ chưa". Thêm câu hỏi: "Tôi đã allow mình nhận support chưa?"',
      actionPrompt: 'Ai đã care cho bạn tuần này? Bạn đã accept sự quan tâm đó chưa?',
      toneNote: 'Receiving awareness.',
    },
    health_reminder: {
      headline: '🌿 Chăm sóc bản thân giống cách bạn chăm người khác',
      body: 'ISFJ detail-oriented trong caring cho người khác. Apply same attention to yourself — những gì cơ thể đang nói với bạn hôm nay?',
      actionPrompt: 'Body scan nhanh: đầu? Vai? Bụng? Chân? Notice và respond to 1 tín hiệu.',
      toneNote: 'Care-as-practice for self.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ESTJ — Người Quản Lý
  // ─────────────────────────────────────────────────────────
  ESTJ: {
    new_match: {
      headline: '🤝 Match mới — efficiency sau, connection trước',
      body: 'ESTJ hay move toward common ground và practical topics ngay. Nhưng emotional connection thường precede productive collaboration. Invest vào người trước khi invest vào agenda.',
      actionPrompt: 'Hỏi về story của người kia — không phải goals hay background professional.',
      toneNote: 'Human first reminder.',
    },
    presentation_tmr: {
      headline: '📊 Ngày mai — structure xuất sắc, nhớ thêm human touch',
      body: 'ESTJ deliver clear và organized presentations. Thêm 1 element: 1 story cụ thể hoặc example real làm content land tốt hơn với audience.',
      actionPrompt: 'Chèn 1 example cụ thể vào section quan trọng nhất — real case, không phải hypothetical.',
      toneNote: 'Humanize the structure.',
    },
    stressed: {
      headline: '📋 Overwhelmed — triage, không phải panic',
      body: 'ESTJ handle stress tốt nhất với clear priority order. Khi quá nhiều thứ cùng lúc, step back và categorize: urgent+important, urgent, important, neither.',
      actionPrompt: 'Viết tất cả tasks đang có — phân loại vào 4 quadrants. Focus vào urgent+important only hôm nay.',
      toneNote: 'Eisenhower matrix. ESTJ loves proven frameworks.',
    },
    conflict_work: {
      headline: '⚖️ Xung đột — rules và fairness là đúng, delivery là key',
      body: 'ESTJ đúng về policy và procedure. Nhưng cách deliver có thể tạo ra resistance dù nội dung đúng. Soften delivery, không soften standards.',
      actionPrompt: 'Trước khi state the rule, acknowledge impact: "Tôi hiểu điều này không thoải mái, và đây là lý do tại sao cần thiết..."',
      toneNote: 'Empathy before enforcement.',
    },
    burnout: {
      headline: '🔋 Hệ thống chạy quá công suất — maintenance window',
      body: 'ESTJ push through mọi thứ vì duty. Nhưng sustained overwork giảm effectiveness — contrary to ESTJ goals. Schedule recovery là responsible, không phải weakness.',
      actionPrompt: 'Block "maintenance time" trong calendar tuần này — treat như critical meeting.',
      toneNote: 'Efficiency argument for rest.',
    },
    celebration: {
      headline: '✅ Mục tiêu đạt được — debrief và celebrate',
      body: 'ESTJ giỏi debrief nhưng hay skip celebration. Team cần cả hai. Celebrate first, then debrief.',
      actionPrompt: 'Tổ chức 1 moment celebration nhỏ với team trước khi move vào lessons learned.',
      toneNote: 'Process order: celebrate then learn.',
    },
    setback: {
      headline: '📉 Kết quả không như kế hoạch — adjust và continue',
      body: 'ESTJ handle setback well khi có clear corrective action. Focus ít hơn vào blame, nhiều hơn vào what changes next iteration.',
      actionPrompt: 'After-action review: kế hoạch là gì, kết quả là gì, điều chỉnh gì cho lần sau.',
      toneNote: 'Military-style AAR. ESTJ respects structured review.',
    },
    monday_morning: {
      headline: '📌 Tuần mới — brief team trước 10 giờ',
      body: 'ESTJ leadership hiệu quả nhất khi team có clarity về priorities sớm. Direction từ bạn giúp mọi người save time cả ngày.',
      actionPrompt: 'Gửi brief message/email cho team: priorities tuần này là gì, cần gì từ ai.',
      toneNote: 'Command and clarity.',
    },
    friday_reflection: {
      headline: '📊 Cuối tuần — commitments delivered?',
      body: 'ESTJ tự đánh giá bằng delivery on commitments. Honest review + acknowledge both wins và gaps.',
      actionPrompt: 'List commitments đầu tuần. Check: delivered, partial, missed. Note lý do cho missed.',
      toneNote: 'Accountability review. ESTJ holds self to standards.',
    },
    health_reminder: {
      headline: '💪 Physical performance affects leadership performance',
      body: 'ESTJ lead by example. Physical fitness là visible commitment bạn make — và affects decision quality.',
      actionPrompt: 'Schedule exercise vào calendar tuần tới như scheduled task, không để "nếu có thời gian".',
      toneNote: 'Leadership and discipline framing.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ESFJ — Người Chăm Sóc
  // ─────────────────────────────────────────────────────────
  ESFJ: {
    new_match: {
      headline: '💖 Match mới — warmth bạn có là genuine asset',
      body: 'ESFJ tạo ra comfort tự nhiên. Trust điều đó — không cần perform hay overthink. Cứ là bạn.',
      actionPrompt: 'Nhớ lại 1 điều genuine bạn muốn biết về người này — hỏi nó.',
      toneNote: 'Authenticity over performance.',
    },
    presentation_tmr: {
      headline: '🌟 Ngày mai — bạn giỏi read room và adapt',
      body: 'ESFJ có social attunement tốt. Use nó: notice khi audience engaging hay disengaging và respond accordingly.',
      actionPrompt: 'Practice 1 lần với 1 người — xin feedback về energy và connection, không phải nội dung.',
      toneNote: 'Social intelligence as presenting strength.',
    },
    stressed: {
      headline: '🤝 Đang lo cho nhiều người — ai đang lo cho bạn?',
      body: 'ESFJ thường last to ask for support. Nhưng letting others support bạn cũng là gift cho họ — không phải burden.',
      actionPrompt: 'Reach out cho 1 người bạn trust và nói thật bạn đang feel như thế nào.',
      toneNote: 'Permission to receive support.',
    },
    conflict_work: {
      headline: '💬 Xung đột — harmony không phải lúc nào cũng mean agreement',
      body: 'ESFJ muốn mọi người happy và đôi khi agree khi không thực sự agree. Healthy disagreement expressed với respect ≠ conflict — nó là honest connection.',
      actionPrompt: '"Tôi appreciate góc nhìn đó, và tôi cũng có perspective khác muốn share..."',
      toneNote: 'Diplomatic disagreement script.',
    },
    burnout: {
      headline: '🌸 Kiệt sức — bạn không thể care well khi empty',
      body: 'ESFJ care quality drops khi drained. Recharging không phải selfish — nó ensures bạn có thể continue caring effectively.',
      actionPrompt: 'Gì restores bạn nhất? Schedule nó trong 24 giờ tới.',
      toneNote: 'Care quality argument for self-care.',
    },
    celebration: {
      headline: '🎊 Celebrate — and make it about us, not just you',
      body: 'ESFJ thích collective celebration. Create moment này cho cả nhóm.',
      actionPrompt: 'Đề xuất celebration nhỏ với những người đã đồng hành trong journey này.',
      toneNote: 'Community celebration.',
    },
    setback: {
      headline: '🌱 Thất bại — đừng personalize nó quá nhiều',
      body: 'ESFJ hay take failures personally, đặc biệt khi liên quan đến relationships. Separate: điều gì thực sự về bạn vs. circumstance vs. người khác?',
      actionPrompt: '3 cột: "Do tôi", "Do hoàn cảnh", "Do người khác". Honest allocation.',
      toneNote: 'Depersonalization of failure.',
    },
    monday_morning: {
      headline: '🌅 Thứ Hai — check in với team, không chỉ task',
      body: 'ESFJ leadership qua connection. Sáng Thứ Hai: hỏi team đang như thế nào trước khi dive vào work.',
      actionPrompt: 'Gửi 1 message cho team: "Tuần mới rồi — ai cần gì để bắt đầu tốt?"',
      toneNote: 'Relational leadership.',
    },
    friday_reflection: {
      headline: '💝 Cuối tuần — relationships flourish hay wilt?',
      body: 'ESFJ measure success qua relationship health. Nhìn lại: mối quan hệ nào cần attention tuần tới?',
      actionPrompt: 'Nghĩ về 3 relationship quan trọng nhất — mỗi cái đang ở trạng thái nào?',
      toneNote: 'Relationship health check.',
    },
    health_reminder: {
      headline: '🌺 Bạn xứng đáng được chăm sóc như bạn chăm sóc người khác',
      body: 'ESFJ give tiêu chuẩn cao cho người khác. Apply same standard to yourself.',
      actionPrompt: 'Hôm nay: làm 1 thứ purely vì nó tốt cho bạn — không phải cho ai khác.',
      toneNote: 'Deserving care.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ESTP — Người Khởi Xướng
  // ─────────────────────────────────────────────────────────
  ESTP: {
    new_match: {
      headline: '⚡ Match mới — slow down enough to let connection form',
      body: 'ESTP naturally move fast và sometimes move on before real connection forms. Invest thêm time vào depth, không chỉ breadth.',
      actionPrompt: 'Đặt mục tiêu: ít nhất 1 hour uninterrupted quality time với người này trước khi judge.',
      toneNote: 'Depth over pace.',
    },
    presentation_tmr: {
      headline: '🎤 Ngày mai — improvisation là skill, nhưng bones cần có',
      body: 'ESTP làm tốt với spontaneity nhưng cần solid structure để fall back. Chuẩn bị key points — rồi free-form từ đó.',
      actionPrompt: 'Write 3 must-say points. Practice chúng. Phần còn lại: improvise.',
      toneNote: 'Structure as safety net, not constraint.',
    },
    stressed: {
      headline: '🏃 Đang bị overwhelmed — move to unblock',
      body: 'ESTP unstick through action, không phải thinking. Khi stuck, làm bất cứ thứ gì tạo ra momentum — ngay cả thứ nhỏ.',
      actionPrompt: 'Chọn 1 task có thể complete trong 10 phút — do it now. Momentum will follow.',
      toneNote: 'Action as stress relief.',
    },
    conflict_work: {
      headline: '🗣️ Xung đột — direct là good, blunt có thể cost',
      body: 'ESTP thẳng thắn — điều đó valuable. Nhưng delivery affects reception. Same message, softer packaging, better result.',
      actionPrompt: 'Trước khi nói điều muốn nói, thêm: "Tôi muốn honest với bạn vì tôi respect bạn..."',
      toneNote: 'Reframe directness as respect.',
    },
    burnout: {
      headline: '🔴 Energy drop — cần genuine downtime, không phải distraction',
      body: 'ESTP hay fill downtime với stimulation — new experience, activity, social. Nhưng real recovery đôi khi cần stillness. Không phải boring — là recharging.',
      actionPrompt: 'Thử 30 phút không screens, không social, không activity. Just be.',
      toneNote: 'Stillness as recovery.',
    },
    celebration: {
      headline: '🎯 Nailed it — share the win, make it memorable',
      body: 'ESTP celebrate well. Go all in — you\'ve earned it.',
      actionPrompt: 'Plan 1 way to mark này properly — không phải just move on.',
      toneNote: 'Full celebration permission.',
    },
    setback: {
      headline: '🔄 Missed — adapt and go again',
      body: 'ESTP resilient and quick to pivot. Nhưng extract learning trước khi pivot để không repeat same mistake.',
      actionPrompt: '30 seconds: what went wrong? 30 seconds: what\'s different next time? Then go.',
      toneNote: 'Quick debrief, then action.',
    },
    monday_morning: {
      headline: '⚡ Thứ Hai — identify the biggest opportunity this week',
      body: 'ESTP thrives on spotting and seizing opportunities. Frame tuần không phải là tasks mà là opportunities.',
      actionPrompt: 'Opportunity tuần này là gì? Làm sao để move on it ngay hôm nay?',
      toneNote: 'Opportunity hunting framing.',
    },
    friday_reflection: {
      headline: '🏆 Tuần này — điều bạn làm tốt nhất là gì?',
      body: 'ESTP learn từ wins cũng như losses. Identify khoảnh khắc bạn at your best và note what conditions created it.',
      actionPrompt: 'Best moment tuần này là gì? Bạn đã ở trong state gì? Tái tạo điều kiện đó.',
      toneNote: 'Peak performance analysis.',
    },
    health_reminder: {
      headline: '💪 Physical performance là competitive advantage',
      body: 'ESTP competitive — frame fitness trong context đó. You perform better in everything when body is performing.',
      actionPrompt: 'Chọn 1 physical challenge nhỏ cho tuần tới — track it.',
      toneNote: 'Competition framing for health.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ESFP — Người Biểu Diễn
  // ─────────────────────────────────────────────────────────
  ESFP: {
    new_match: {
      headline: '🎉 Match mới — authentic fun beats performed fun',
      body: 'ESFP naturally fun và energetic. Nhưng đôi khi perform để impress thay vì just being genuinely yourself. Người đúng sẽ thích bạn thật, không phải bạn show.',
      actionPrompt: 'Chia sẻ 1 thứ bạn actually nervous hoặc uncertain về — authentic vulnerability connects.',
      toneNote: 'Genuine over performed.',
    },
    presentation_tmr: {
      headline: '🌟 Ngày mai — bạn là experience, không phải just presenter',
      body: 'ESFP create experiences tự nhiên. Đừng dồn hết vào content — dồn vào how audience FEELS khi ở trong phòng đó.',
      actionPrompt: 'Nghĩ về 1 element có thể làm audience smile, laugh, hoặc ah-ha.',
      toneNote: 'Experience design, not presentation design.',
    },
    stressed: {
      headline: '🌈 Bị overwhelmed — reach out, không phải run',
      body: 'ESFP đôi khi escape stress bằng cách tìm fun thay vì address vấn đề. Fun sau khi đã deal with root cause lành mạnh hơn fun để avoid.',
      actionPrompt: 'Name 1 thứ cụ thể đang stress bạn. Nói với 1 người về nó. Sau đó mới có fun.',
      toneNote: 'Address then release.',
    },
    conflict_work: {
      headline: '💬 Xung đột — serious conversations cũng cần your presence',
      body: 'ESFP giỏi lighten mood nhưng đôi khi dùng humor để avoid heavy conversations. Đôi khi cần sit in the difficulty, không làm nó nhẹ đi.',
      actionPrompt: 'Cho phép conversation này uncomfortable nếu nó cần — resist urge to joke it away.',
      toneNote: 'Sit with discomfort.',
    },
    burnout: {
      headline: '🔋 Năng lượng xuống — cần người, không phải entertainment',
      body: 'ESFP recharge qua connection thật. Scrolling social hay passive entertainment không đủ. Cần real people, real interaction.',
      actionPrompt: 'Gọi cho 1 người bạn muốn gặp — plan something concrete.',
      toneNote: 'Real connection over consumption.',
    },
    celebration: {
      headline: '🎊 CELEBRATE! Bạn làm cái này rất tốt',
      body: 'ESFP born to celebrate. Go full out — you know how to make moments.',
      actionPrompt: 'Kéo mọi người lại, create the moment. Bạn biết phải làm gì.',
      toneNote: 'Full permission to lead celebration.',
    },
    setback: {
      headline: '🌧️ Thất vọng — feel it, share it, bounce back',
      body: 'ESFP resilient nhưng đôi khi skip the feeling stage để return to positive too fast. It\'s okay to be sad for a bit.',
      actionPrompt: 'Nói với ai đó thật sự nghe bạn về thứ đang cảm thấy — không cần solution ngay.',
      toneNote: 'Feel before bounce.',
    },
    monday_morning: {
      headline: '🌅 Thứ Hai — ai bạn muốn brighten tuần này?',
      body: 'ESFP energized bởi positive impact trên người khác. Identify target và go.',
      actionPrompt: 'Ai đang cần energy tốt từ bạn tuần này? Plan 1 cách cụ thể để show up.',
      toneNote: 'Impact-oriented start.',
    },
    friday_reflection: {
      headline: '💫 Tuần này — moments of genuine joy?',
      body: 'ESFP thrives on joy. Note những moments genuine happiness — bạn đang tạo đủ chúng chưa?',
      actionPrompt: 'Khoảnh khắc happy nhất tuần này là gì? Tăng tần suất thứ đó tuần sau.',
      toneNote: 'Joy tracking.',
    },
    health_reminder: {
      headline: '🏃 Vận động = more energy cho everything you love',
      body: 'ESFP thích active lifestyle anyway. Frame health không phải là chore mà là amplifier cho everything fun.',
      actionPrompt: 'Tìm physical activity bạn actually enjoy — schedule ngay tuần tới.',
      toneNote: 'Fun movement.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ISTP — Thợ Thủ Công
  // ─────────────────────────────────────────────────────────
  ISTP: {
    new_match: {
      headline: '🔧 Match mới — tìm shared interest trước khi deep conversation',
      body: 'ISTP kết nối tốt qua shared activity hoặc topic hơn là abstract conversation. Đề xuất làm gì đó cùng nhau.',
      actionPrompt: 'Hỏi: "Bạn thường làm gì vào cuối tuần?" — tìm overlap với interest của bạn.',
      toneNote: 'Activity-based connection.',
    },
    presentation_tmr: {
      headline: '🎯 Ngày mai — competence sẽ show, đừng over-explain',
      body: 'ISTP thường biết nhiều hơn say. Trust that — present với confidence, don\'t over-qualify everything.',
      actionPrompt: 'Review bài: xóa tất cả "có thể", "có lẽ", "tôi không chắc" không cần thiết.',
      toneNote: 'Confidence in competence.',
    },
    stressed: {
      headline: '🛠️ Problem mode — fix what you can, accept what you can\'t',
      body: 'ISTP muốn fix mọi thứ nhưng không phải mọi thứ đều fixable. Distinguish: actionable vs. not. Focus energy vào actionable.',
      actionPrompt: 'List problems. Mark A (can fix) và B (cannot fix). Focus 100% vào A.',
      toneNote: 'Actionable distinction.',
    },
    conflict_work: {
      headline: '🗣️ Xung đột — nói ít nhưng nói đúng lúc quan trọng',
      body: 'ISTP thường im lặng trong conflict nhưng observe nhiều. Đôi khi 1 observation đúng lúc từ bạn có thể reframe cả situation.',
      actionPrompt: 'Observe first. Khi thấy insight rõ: state nó ngắn gọn, confident.',
      toneNote: 'Timely precision over constant input.',
    },
    burnout: {
      headline: '⚡ Low energy — cần project mới để engage',
      body: 'ISTP burnout thường do boredom hoặc repetition. New challenge hoặc skill là best recharge.',
      actionPrompt: 'Có gì bạn muốn build, fix, hoặc learn không? Start something today.',
      toneNote: 'Engagement through novelty.',
    },
    celebration: {
      headline: '✅ Done — quiet satisfaction is valid',
      body: 'ISTP không cần grand celebration. Nhưng acknowledge your own competence — internally, intentionally.',
      actionPrompt: 'Nói với chính mình: "Tôi làm điều này tốt." Không cần ai nghe.',
      toneNote: 'Internal acknowledgment.',
    },
    setback: {
      headline: '🔩 Lỗi xảy ra — troubleshoot và rebuild',
      body: 'ISTP handle failure như technical problem: find root cause, fix, test again. Apply same logic.',
      actionPrompt: 'Diagnose: what failed và tại sao? Hypothesis về fix? Test next time.',
      toneNote: 'Technical problem-solving mindset.',
    },
    monday_morning: {
      headline: '🛠️ Thứ Hai — gì cần được built hoặc fixed tuần này?',
      body: 'ISTP energized bởi concrete problems. Identify the most interesting/important one.',
      actionPrompt: 'Problem hoặc project cụ thể nhất bạn muốn tackle tuần này là gì?',
      toneNote: 'Problem-first framing.',
    },
    friday_reflection: {
      headline: '⚙️ Cuối tuần — gì đã work, gì chưa?',
      body: 'ISTP assess bằng function. What worked well? What needs adjustment?',
      actionPrompt: 'Nhìn lại tuần: 1 thing worked, 1 thing didn\'t, 1 adjustment for next.',
      toneNote: 'Functional assessment.',
    },
    health_reminder: {
      headline: '🏋️ Body maintenance = equipment maintenance',
      body: 'ISTP respect well-maintained equipment. Your body is the primary tool.',
      actionPrompt: 'What maintenance does your body need this week? Schedule it.',
      toneNote: 'Equipment metaphor.',
    },
  },

  // ─────────────────────────────────────────────────────────
  // ISFP — Người Phiêu Lưu
  // ─────────────────────────────────────────────────────────
  ISFP: {
    new_match: {
      headline: '🎨 Match mới — share something you\'ve created or care about',
      body: 'ISFP expresses best through what they make or love. Showing something real connects better than talking about yourself abstractly.',
      actionPrompt: 'Share 1 thứ bạn đã tạo ra, 1 nơi bạn thích, hoặc 1 experience có ý nghĩa với bạn.',
      toneNote: 'Expression through sharing.',
    },
    presentation_tmr: {
      headline: '🌺 Ngày mai — values của bạn là điểm khác biệt',
      body: 'ISFP mang perspective genuine và values-driven vào mọi thứ. Đó là điều khiến bài của bạn không giống ai khác.',
      actionPrompt: 'Identify điều bạn thực sự care về trong topic này — inject nó vào bài.',
      toneNote: 'Values as differentiator.',
    },
    stressed: {
      headline: '🌿 Overwhelmed — nature hoặc beauty có thể reset',
      body: 'ISFP restore qua sensory experience — nature, art, music, beauty. Đây không phải escape, là genuine recharge.',
      actionPrompt: '20 phút: ra ngoài, nghe nhạc yêu thích, hoặc làm thứ gì đó đẹp. Không guilt.',
      toneNote: 'Sensory restoration.',
    },
    conflict_work: {
      headline: '🌸 Xung đột — cảm xúc của bạn là data, không phải weakness',
      body: 'ISFP feel deeply và đôi khi dismiss feelings của mình trong professional settings. But your emotional read thường accurate.',
      actionPrompt: '"Tôi cảm thấy ___ về tình huống này, và tôi muốn share tại sao."',
      toneNote: 'Validate then express feelings.',
    },
    burnout: {
      headline: '🍃 Kiệt sức — về với thứ gì đó genuinely yours',
      body: 'ISFP burnout khi mất connection với authentic self và values. Return to creative expression, solitude, hoặc nature.',
      actionPrompt: 'Thứ nào ISFP nhất bạn chưa làm lâu rồi? Làm hôm nay.',
      toneNote: 'Return to authentic expression.',
    },
    celebration: {
      headline: '✨ Bạn đã express điều thật sự — đó là success',
      body: 'ISFP define success bằng authenticity, không phải achievement. Nếu bạn đã true to yourself, đó là win.',
      actionPrompt: 'Ghi nhận 1 cách bạn đã authentic trong quá trình này.',
      toneNote: 'Authenticity as success metric.',
    },
    setback: {
      headline: '🌱 Thất vọng — sit with it, đừng judge nó',
      body: 'ISFP feel deeply — thất vọng là legitimate emotion. Allow nó mà không cần immediately find silver lining.',
      actionPrompt: 'Cho mình time và space để cảm nhận điều này. Journal nếu helps.',
      toneNote: 'Feeling validation without rush.',
    },
    monday_morning: {
      headline: '🎨 Thứ Hai — gì inspire bạn tuần này?',
      body: 'ISFP work best khi connected to something beautiful, meaningful, hoặc creative. Find that thread for the week.',
      actionPrompt: '1 thứ bạn excited để create hoặc explore tuần này là gì?',
      toneNote: 'Inspiration-based motivation.',
    },
    friday_reflection: {
      headline: '🌙 Cuối tuần — bạn đã true to yourself không?',
      body: 'ISFP wellbeing tied to authenticity. Những moment nào bạn felt genuinely yourself?',
      actionPrompt: 'Khoảnh khắc authentic nhất tuần này là gì? Tạo ra nhiều hơn điều đó.',
      toneNote: 'Authenticity tracking.',
    },
    health_reminder: {
      headline: '🌺 Your body feels beauty too',
      body: 'ISFP attuned to sensory experience. Movement cũng có thể là aesthetic experience — dance, walk in nature, yoga.',
      actionPrompt: 'Tìm form movement bạn actually find beautiful hoặc enjoyable.',
      toneNote: 'Aesthetic movement.',
    },
  },
}

/**
 * Helper: Lấy nudge theo type và situation
 */
export function getSituationalNudge(
  mbtiType: string,
  situation: SituationKey
): SituationalNudge | null {
  return SITUATIONAL_NUDGES[mbtiType]?.[situation] ?? null
}

/**
 * Helper: Lấy toàn bộ nudges của 1 type
 */
export function getAllSituationalNudges(mbtiType: string): TypeSituationalNudges | null {
  return SITUATIONAL_NUDGES[mbtiType] ?? null
}

/**
 * Danh sách situation labels (cho UI dropdown)
 */
export const SITUATION_LABELS: Record<SituationKey, string> = {
  new_match: '🤝 Vừa match với ai đó',
  presentation_tmr: '🎤 Ngày mai có thuyết trình / phỏng vấn',
  stressed: '😰 Đang bị stress / overwhelmed',
  conflict_work: '⚡ Có mâu thuẫn với đồng nghiệp / sếp',
  burnout: '🔋 Cảm thấy kiệt sức kéo dài',
  celebration: '🎊 Vừa đạt được điều gì đó tốt',
  setback: '😔 Vừa thất bại / thất vọng',
  monday_morning: '📅 Thứ Hai — năng lượng đầu tuần thấp',
  friday_reflection: '🌙 Cuối tuần — nhìn lại',
  health_reminder: '💪 Nhắc nhở sức khỏe',
}
