/**
 * DAILY PRACTICES DATA
 * packages/data/src/daily-practices-data.ts
 *
 * Ma trận: 16 MBTI type × 3 time slots (morning / practice / evening)
 * Mỗi slot: { doThis, avoidThis, nudgeText, duration }
 *
 * Nguồn: Tổng hợp từ WORK_TIPS + MORNING_STYLES (16p-distilled)
 * + nghiên cứu hành vi theo type
 *
 * Dùng cho: Assistant zero-API nudge rotation
 * Rotation: mỗi type có 3-4 variant/slot → không lặp trong 2 tuần
 */

export interface PracticeSlot {
  id?: string             // Pack 1 tip id — generated if omitted
  doThis: string          // Hành động cụ thể, ngắn gọn
  avoidThis: string       // Điều nên tránh
  nudgeText: string       // Câu nudge ready-to-send cho user
  durationMin: number     // Thời gian gợi ý (phút)
  category: 'mindset' | 'action' | 'social' | 'body' | 'reflection'
}

export interface TypeDailyPractice {
  mbtiType: string
  morning: PracticeSlot[]   // 4 variants rotate
  practice: PracticeSlot[]  // 4 variants (giữa ngày hoặc bất cứ lúc nào)
  evening: PracticeSlot[]   // 4 variants rotate
}

export const DAILY_PRACTICES: Record<string, TypeDailyPractice> = {

  // ═══════════════════════════════════════════════════════════
  // INTJ — Kiến trúc sư
  // ═══════════════════════════════════════════════════════════
  INTJ: {
    mbtiType: 'INTJ',
    morning: [
      { doThis: 'Viết 3 mục tiêu ưu tiên cho ngày — không hơn 3', avoidThis: 'Mở email/mạng xã hội trước khi viết xong', nudgeText: '🎯 Sáng nay: Chọn đúng 3 thứ quan trọng nhất. Những thứ khác phải chờ.', durationMin: 5, category: 'mindset' },
      { doThis: 'Đọc 10 phút nội dung chuyên sâu trong lĩnh vực đang quan tâm', avoidThis: 'Scroll news hoặc social media aimless', nudgeText: '📖 10 phút đầu ngày với 1 bài đọc có chiều sâu — não INTJ cần được nuôi.', durationMin: 10, category: 'mindset' },
      { doThis: 'Review plan hôm qua — ghi lại 1 điều đã học được', avoidThis: 'Bắt đầu việc mới trước khi đóng việc cũ', nudgeText: '🔍 Nhìn lại hôm qua 5 phút trước khi bước vào hôm nay.', durationMin: 5, category: 'reflection' },
      { doThis: 'Thiết lập "deep work block" 90 phút không bị gián đoạn', avoidThis: 'Để thông báo điện thoại bật khi đang làm việc quan trọng', nudgeText: '🔕 Tắt thông báo. 90 phút không ai được phá. Đây là giờ vàng của bạn.', durationMin: 3, category: 'action' },
    ],
    practice: [
      { doThis: 'Đặt 1 câu hỏi thật sự tò mò cho đồng nghiệp hoặc ai đó hôm nay', avoidThis: 'Chỉ nói chuyện khi cần thiết về công việc', nudgeText: '💬 Hôm nay thử hỏi 1 câu không liên quan đến việc. Kết nối nhỏ, ảnh hưởng lớn.', durationMin: 5, category: 'social' },
      { doThis: 'Rời bàn làm việc 10 phút — đi bộ không nhìn điện thoại', avoidThis: 'Ăn trưa trước màn hình', nudgeText: '🚶 Não INTJ cần nghỉ để xử lý. 10 phút đi bộ = 1 giờ hiệu quả hơn.', durationMin: 10, category: 'body' },
      { doThis: 'Identify 1 assumption trong kế hoạch hiện tại cần được test', avoidThis: 'Tiếp tục build trên foundation chưa được validate', nudgeText: '⚡ Hôm nay: Tìm 1 assumption quan trọng nhất và test nó.', durationMin: 15, category: 'mindset' },
      { doThis: 'Chia sẻ 1 insight hoặc ý tưởng với 1 người — dù chỉ qua tin nhắn', avoidThis: 'Giữ mọi ý tưởng trong đầu vì "chưa hoàn chỉnh"', nudgeText: '💡 Ý tưởng chưa được chia sẻ không tồn tại. Gửi 1 câu cho ai đó hôm nay.', durationMin: 5, category: 'social' },
    ],
    evening: [
      { doThis: 'Viết 3 dòng: đã làm gì, học được gì, ngày mai bắt đầu từ đâu', avoidThis: 'Tiếp tục làm việc sau 21h vì "chỉ thêm 1 chút"', nudgeText: '📝 3 dòng nhật ký trước khi ngủ. Não bạn cần đóng cửa đúng giờ.', durationMin: 5, category: 'reflection' },
      { doThis: 'Đọc sách giấy 20 phút — không màn hình', avoidThis: 'Scroll điện thoại trong giường', nudgeText: '📚 Sách giấy trước ngủ. Não INTJ không tắt được nếu còn nhìn màn hình.', durationMin: 20, category: 'body' },
      { doThis: 'Review weekly goal: đang đúng track không? Cần điều chỉnh gì?', avoidThis: 'Để week trôi qua mà không đánh giá lại', nudgeText: '📊 Cuối tuần: 10 phút review — đang đúng hướng không? Cần pivot không?', durationMin: 10, category: 'reflection' },
      { doThis: 'Gọi hoặc nhắn tin cho 1 người thân — không phải về công việc', avoidThis: 'Kết thúc ngày mà không có kết nối thật sự với ai', nudgeText: '❤️ Nhắn tin cho 1 người quan trọng. Không phải về việc. Chỉ để hỏi thăm.', durationMin: 10, category: 'social' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // INTP — Nhà logic học
  // ═══════════════════════════════════════════════════════════
  INTP: {
    mbtiType: 'INTP',
    morning: [
      { doThis: 'Viết 1 câu hỏi hoặc vấn đề muốn suy nghĩ trong ngày', avoidThis: 'Bắt đầu ngày mà không có hướng suy nghĩ', nudgeText: '🧩 Câu hỏi nào bạn muốn suy ngẫm hôm nay? Viết nó ra.', durationMin: 3, category: 'mindset' },
      { doThis: 'Đọc hoặc nghe 1 thứ ngoài vùng comfort — lĩnh vực xa lạ', avoidThis: 'Chỉ đọc thứ đã biết mình thích', nudgeText: '🌐 Sáng nay: 1 bài đọc về lĩnh vực bạn không biết gì. INTP học giỏi nhất khi bị surprise.', durationMin: 15, category: 'mindset' },
      { doThis: 'Set 1 deadline cụ thể cho 1 task đang dở — không negotiate với bản thân', avoidThis: 'Bắt đầu ngày mà không có commitment cụ thể', nudgeText: '⏰ 1 deadline. Cụ thể. Không thương lượng. Ghi vào ngay bây giờ.', durationMin: 3, category: 'action' },
      { doThis: 'Stretch nhẹ 5 phút — INTP hay quên cơ thể tồn tại buổi sáng', avoidThis: 'Từ giường thẳng đến bàn phím', nudgeText: '🧘 5 phút kéo giãn trước khi ngồi vào bàn. Não cần máu, máu cần cơ thể.', durationMin: 5, category: 'body' },
    ],
    practice: [
      { doThis: 'Explain 1 concept đang nghiên cứu bằng ngôn ngữ đơn giản — tự nói to hoặc viết', avoidThis: 'Tin rằng mình hiểu mà chưa thử diễn đạt lại', nudgeText: '🗣️ Nếu không giải thích được đơn giản, bạn chưa hiểu thật. Thử ngay hôm nay.', durationMin: 10, category: 'mindset' },
      { doThis: 'Hoàn thành 1 task nhỏ đang dở — đừng bắt đầu cái mới', avoidThis: 'Bắt đầu thứ thú vị hơn khi cái cũ chưa xong', nudgeText: '✅ 1 thứ đang dở. Hoàn thành nó. Sau đó mới được mở thứ mới.', durationMin: 30, category: 'action' },
      { doThis: 'Uống đủ nước — đặt ly nước cạnh bàn', avoidThis: 'Ngồi 4 giờ mà không đứng lên', nudgeText: '💧 Đã uống đủ nước chưa? Đặt ly nước cạnh bàn trước khi tiếp tục.', durationMin: 1, category: 'body' },
      { doThis: 'Hỏi ý kiến 1 người về project đang làm — thật sự lắng nghe', avoidThis: 'Hỏi ý kiến để confirm thứ mình đã nghĩ', nudgeText: '👂 Hỏi 1 người về idea bạn đang có — và thật sự lắng nghe góc nhìn khác.', durationMin: 15, category: 'social' },
    ],
    evening: [
      { doThis: 'Viết 1 điều đã hoàn thành hôm nay — dù nhỏ', avoidThis: 'Chỉ thấy những thứ chưa xong', nudgeText: '🎯 1 điều đã hoàn thành hôm nay. Ghi lại. INTP hay quên credit bản thân.', durationMin: 3, category: 'reflection' },
      { doThis: 'Đặt điện thoại cách giường 1 mét khi ngủ', avoidThis: 'Rabbit hole YouTube/Wikipedia trước ngủ', nudgeText: '📵 Điện thoại ra khỏi tầm tay. Não bạn cần offline để process.', durationMin: 1, category: 'body' },
      { doThis: 'Nhắn 1 tin cảm ơn hoặc acknowledge ai đó hôm nay giúp bạn', avoidThis: 'Kết thúc ngày mà không express appreciation', nudgeText: '🙏 Ai đó đã giúp bạn hôm nay? 1 tin nhắn ngắn. Kết nối quan trọng hơn bạn nghĩ.', durationMin: 3, category: 'social' },
      { doThis: 'Review 1 idea từ tuần này — có gì cần test hoặc thực hiện không?', avoidThis: 'Để ideas nằm trong đầu mãi mà không có action', nudgeText: '💡 1 idea từ tuần này. Nó cần được test chưa? Lên kế hoạch nhỏ nhất có thể.', durationMin: 10, category: 'reflection' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ENTJ — Chỉ huy
  // ═══════════════════════════════════════════════════════════
  ENTJ: {
    mbtiType: 'ENTJ',
    morning: [
      { doThis: 'Review mục tiêu tuần — 5 phút alignment trước khi dive vào việc', avoidThis: 'Bắt đầu respond email/message ngay khi thức dậy', nudgeText: '⚡ 5 phút review weekly goals trước khi mở email. Đừng để người khác set agenda của bạn.', durationMin: 5, category: 'mindset' },
      { doThis: 'Identify 1 bottleneck trong team hoặc project — sẽ giải quyết hôm nay', avoidThis: 'Làm việc bận rộn mà không tackle vấn đề gốc', nudgeText: '🔓 Bottleneck lớn nhất của team hôm nay là gì? Giải quyết nó trước.', durationMin: 5, category: 'action' },
      { doThis: 'Tập thể dục ít nhất 20 phút — ENTJ cần energy cao suốt ngày', avoidThis: 'Bỏ tập vì "bận quá"', nudgeText: '💪 20 phút tập thể dục = 3 giờ productivity cao hơn. Đây là toán học, không phải ý kiến.', durationMin: 20, category: 'body' },
      { doThis: 'Viết 1 câu intention về cách muốn lãnh đạo hôm nay', avoidThis: 'Lao vào kết quả mà không nghĩ về process', nudgeText: '🧭 Hôm nay muốn là leader như thế nào? 1 câu. Viết trước khi gặp bất kỳ ai.', durationMin: 3, category: 'mindset' },
    ],
    practice: [
      { doThis: 'Hỏi 1 thành viên team: "Tôi có thể giúp gì hôm nay không?"', avoidThis: 'Assume team đang ổn mà không check in', nudgeText: '👥 "Tôi có thể giúp gì không?" — 1 câu hỏi này build trust mạnh hơn bất kỳ speech nào.', durationMin: 5, category: 'social' },
      { doThis: 'Cho phép bản thân nghỉ 10 phút không làm gì — thực sự không làm gì', avoidThis: 'Làm việc liên tục từ sáng đến tối mà không recharge', nudgeText: '⏸️ 10 phút không làm gì. ENTJ hay nghĩ đây là lãng phí — thực ra đây là đầu tư.', durationMin: 10, category: 'body' },
      { doThis: 'Acknowledge 1 người cụ thể về contribution của họ hôm nay', avoidThis: 'Chỉ nói khi có vấn đề, im lặng khi mọi thứ ổn', nudgeText: '✨ Ai xứng đáng được ghi nhận hôm nay? Nói thẳng, cụ thể, ngay bây giờ.', durationMin: 3, category: 'social' },
      { doThis: 'Đặt 1 câu hỏi thay vì đưa ra giải pháp ngay — lắng nghe trước', avoidThis: 'Ngắt lời hoặc kết luận trước khi người khác nói xong', nudgeText: '🤐 Hôm nay: 1 tình huống thay vì đưa giải pháp, hãy hỏi trước. Kết quả sẽ surprise bạn.', durationMin: 10, category: 'social' },
    ],
    evening: [
      { doThis: 'Hard stop lúc 20h — không reply email sau giờ đó', avoidThis: 'Work đến 23h rồi wonder tại sao mệt mỏi', nudgeText: '🛑 Hard stop 20h. ENTJ hay confuse exhaustion với weakness — không phải vậy.', durationMin: 1, category: 'body' },
      { doThis: 'Viết 1 điều hôm nay đã làm tốt với tư cách leader', avoidThis: 'Chỉ focus vào những gì cần cải thiện', nudgeText: '🏆 1 điều làm tốt hôm nay với tư cách leader. Ghi lại. Không phải kiêu ngạo — là data.', durationMin: 5, category: 'reflection' },
      { doThis: 'Dành 15 phút cho bản thân — không phải cho mục tiêu nào', avoidThis: 'Coi entertainment là waste of time', nudgeText: '🎮 15 phút cho bản thân. Không phải vì productive — vì bạn là con người, không phải machine.', durationMin: 15, category: 'body' },
      { doThis: 'Nghe ai đó kể chuyện mà không suggest giải pháp', avoidThis: 'Turn mọi cuộc trò chuyện thành problem-solving session', nudgeText: '👂 Tối nay: ai đó muốn kể chuyện? Chỉ nghe. Không fix. Chỉ nghe.', durationMin: 15, category: 'social' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ENTP — Nhà biện luận
  // ═══════════════════════════════════════════════════════════
  ENTP: {
    mbtiType: 'ENTP',
    morning: [
      { doThis: 'Viết list những thứ đang dở — chọn 1 để hoàn thành hôm nay', avoidThis: 'Bắt đầu thứ mới khi đang có 5 thứ chưa xong', nudgeText: '📋 Hôm nay hoàn thành 1 thứ đang dở trước khi bắt đầu bất cứ thứ gì mới.', durationMin: 5, category: 'action' },
      { doThis: 'Đọc 1 quan điểm hoàn toàn đối lập với mình và tìm điểm đúng trong đó', avoidThis: 'Chỉ consume content confirm bias', nudgeText: '🔄 Đọc 1 quan điểm trái chiều sáng nay. ENTP mạnh nhất khi hiểu cả 2 phía.', durationMin: 10, category: 'mindset' },
      { doThis: 'Cam kết 1 deadline với 1 người khác — không phải chỉ với bản thân', avoidThis: 'Deadline chỉ mình biết dễ bị push', nudgeText: '📅 Nói deadline với 1 người hôm nay. External accountability là cách ENTP finish.', durationMin: 3, category: 'action' },
      { doThis: 'Tập thể dục — đổi loại hình mỗi tuần để không chán', avoidThis: 'Skip tập vì "không inspired"', nudgeText: '🏃 Tập thể dục hôm nay. Đổi hình thức nếu chán — ENTP cần variety ngay cả khi tập.', durationMin: 20, category: 'body' },
    ],
    practice: [
      { doThis: 'Nghe trọn vẹn 1 cuộc trò chuyện mà không ngắt lời', avoidThis: 'Finish người khác câu hoặc jump to conclusion', nudgeText: '👂 1 cuộc hội thoại hôm nay: để người kia nói hết. Không ngắt. Thử xem sao.', durationMin: 15, category: 'social' },
      { doThis: 'Focus vào 1 task 25 phút không mở tab mới', avoidThis: 'Multi-tab, multi-task, kết quả cuối không xong gì', nudgeText: '⏱️ Pomodoro 25 phút: 1 tab, 1 task. ENTP ghét điều này nhưng nó hoạt động.', durationMin: 25, category: 'action' },
      { doThis: 'Hỏi "Điều này giúp gì cho mục tiêu lớn hơn?" trước khi bắt đầu việc mới', avoidThis: 'Làm theo hứng mà không check alignment', nudgeText: '🎯 Trước việc mới hỏi: "Cái này giúp gì cho goal lớn hơn?" Nếu không trả lời được, đừng làm.', durationMin: 2, category: 'mindset' },
      { doThis: 'Acknowledge 1 insight hay từ người khác trong conversation hôm nay', avoidThis: 'Always be the smartest person in the room', nudgeText: '💡 Ai đó nói gì thú vị hôm nay? Acknowledge nó. ENTP earn respect bằng trí tuệ, không phải solo.', durationMin: 3, category: 'social' },
    ],
    evening: [
      { doThis: 'Review: đã complete gì hôm nay? Không phải started — completed', avoidThis: 'Tính những thứ đã bắt đầu là "đã làm"', nudgeText: '✅ Hôm nay hoàn thành bao nhiêu thứ thực sự? Chỉ tính completed, không phải started.', durationMin: 5, category: 'reflection' },
      { doThis: 'Viết 1 ý tưởng vào notebook — sau đó đóng notebook lại', avoidThis: 'Để ý tưởng tiếp tục spin trong đầu khi ngủ', nudgeText: '📓 Capture 1 ý tưởng vào giấy tối nay. Não bạn mới chịu nghỉ khi đã ghi ra.', durationMin: 5, category: 'reflection' },
      { doThis: 'Dành 20 phút cho 1 người quan trọng — full presence, no phone', avoidThis: 'Ở gần người thân nhưng đang ở đâu đó trong đầu', nudgeText: '🔗 20 phút full presence với người quan trọng. Phone úp xuống. ENTP giỏi connect nhưng hay distracted.', durationMin: 20, category: 'social' },
      { doThis: 'Ngủ đủ giấc — 7-8 tiếng là target, không phải 5', avoidThis: 'Sacrifice sleep vì "có thứ thú vị hơn"', nudgeText: '😴 ENTP hay under-sleep vì life is exciting. Nhưng thiếu ngủ = ý tưởng kém hơn. Đi ngủ.', durationMin: 1, category: 'body' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // INFJ — Nhà tiên tri
  // ═══════════════════════════════════════════════════════════
  INFJ: {
    mbtiType: 'INFJ',
    morning: [
      { doThis: 'Ngồi yên 5 phút — không phone, không âm nhạc, chỉ thở', avoidThis: 'Bắt đầu ngày bằng thông báo và tin tức', nudgeText: '🌅 5 phút im lặng trước khi ngày bắt đầu. INFJ cần nạp năng lượng trong yên tĩnh.', durationMin: 5, category: 'mindset' },
      { doThis: 'Viết 1 điều đang grateful về hôm nay — cụ thể, không chung chung', avoidThis: 'Skip gratitude vì "không có gì đặc biệt"', nudgeText: '🙏 Sáng nay: 1 điều cụ thể đang grateful. "Tôi biết ơn vì..." — điền vào.', durationMin: 3, category: 'reflection' },
      { doThis: 'Set intention: hôm nay muốn ảnh hưởng tích cực đến ai?', avoidThis: 'Vào ngày mà không có mục đích rõ ràng', nudgeText: '💚 Hôm nay muốn mang lại điều gì tốt cho ai? 1 người, 1 điều cụ thể.', durationMin: 3, category: 'mindset' },
      { doThis: 'Check in với cơ thể: mệt ở mức nào 1-10? Điều chỉnh kế hoạch nếu cần', avoidThis: 'Push through khi cơ thể đang cần nghỉ', nudgeText: '📊 Mức năng lượng sáng nay 1-10? Nếu dưới 6, adjust kế hoạch ngay bây giờ.', durationMin: 2, category: 'body' },
    ],
    practice: [
      { doThis: 'Nói ra 1 boundary cần thiết — với ai đó hoặc với chính mình', avoidThis: 'Chịu đựng tình huống không ổn vì ngại làm phiền người khác', nudgeText: '🛡️ Hôm nay có 1 boundary cần đặt ra không? Nói nó. INFJ hay im lặng đến khi kiệt sức.', durationMin: 5, category: 'action' },
      { doThis: 'Dành 15 phút cho creative project cá nhân — không phải cho ai khác', avoidThis: 'Dùng hết năng lượng cho người khác trước khi nghĩ đến bản thân', nudgeText: '🎨 15 phút cho dự án của riêng bạn hôm nay. Không phải vì ai — vì bạn cần nó.', durationMin: 15, category: 'action' },
      { doThis: 'Nói "không" với 1 request không align với priority hôm nay', avoidThis: 'Nói có với mọi thứ vì không nỡ từ chối', nudgeText: '"Không" là 1 câu hoàn chỉnh. Hôm nay thử dùng nó 1 lần.', durationMin: 2, category: 'action' },
      { doThis: 'Đi bộ 10 phút ngoài trời — một mình', avoidThis: 'Ở trong nhà cả ngày khi cảm thấy overwhelmed', nudgeText: '🌿 10 phút ngoài trời. Một mình. INFJ recharge trong thiên nhiên và im lặng.', durationMin: 10, category: 'body' },
    ],
    evening: [
      { doThis: 'Journaling 10 phút — xử lý cảm xúc và suy nghĩ trong ngày', avoidThis: 'Giữ mọi thứ trong đầu cho đến khi overwhelm', nudgeText: '📔 10 phút viết ra những gì đang trong đầu. Não INFJ cần được empty ra trước khi ngủ.', durationMin: 10, category: 'reflection' },
      { doThis: 'Đánh giá: hôm nay đã chăm sóc bản thân ở mức nào?', avoidThis: 'Kết thúc ngày chỉ đếm mình đã giúp được ai', nudgeText: '💚 Hôm nay chăm sóc bản thân chưa? Không phải người khác — bạn.', durationMin: 3, category: 'reflection' },
      { doThis: 'Tắt tất cả notification 1 giờ trước khi ngủ', avoidThis: 'Absorb cảm xúc và energy người khác qua mạng xã hội trước ngủ', nudgeText: '📵 1 giờ before bed: airplane mode. INFJ cần buffer zone trước khi ngủ.', durationMin: 1, category: 'body' },
      { doThis: 'Nhớ lại 1 khoảnh khắc hôm nay mình đã tạo ra ảnh hưởng tích cực', avoidThis: 'Chỉ thấy những gì chưa làm được', nudgeText: '✨ Khoảnh khắc nào hôm nay bạn đã tạo ra điều tốt? Dù nhỏ — nhớ lại và ghi.', durationMin: 3, category: 'reflection' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // INFP — Người hòa giải
  // ═══════════════════════════════════════════════════════════
  INFP: {
    mbtiType: 'INFP',
    morning: [
      { doThis: 'Viết 3 dòng sáng tạo tự do — không phán xét, không edit', avoidThis: 'Chờ "inspiration" trước khi viết', nudgeText: '✍️ 3 dòng sáng tạo tự do. Không cần hay. Không cần đúng. Chỉ cần viết.', durationMin: 5, category: 'action' },
      { doThis: 'Nhắc nhở bản thân về 1 giá trị cốt lõi — và hôm nay sẽ sống nó như thế nào', avoidThis: 'Sống theo kỳ vọng người khác mà quên giá trị bản thân', nudgeText: '💜 Giá trị quan trọng nhất của bạn là gì? Hôm nay sẽ biểu hiện nó như thế nào?', durationMin: 3, category: 'mindset' },
      { doThis: 'Uống 1 ly nước và ăn gì đó trước 9h', avoidThis: 'Skip bữa sáng vì "không đói"', nudgeText: '🥣 Ăn gì đó buổi sáng. INFP hay forget cơ thể cần fuel khi đang trong thế giới nội tâm.', durationMin: 10, category: 'body' },
      { doThis: 'Nghe 1 bài nhạc phù hợp với mood muốn có cho ngày hôm nay', avoidThis: 'Để mood ngày được decide bởi random notifications', nudgeText: '🎵 Chọn 1 bài nhạc cho ngày hôm nay. Bạn có quyền set tone cho chính mình.', durationMin: 5, category: 'mindset' },
    ],
    practice: [
      { doThis: 'Hoàn thành 1 task dù nhỏ trước khi chuyển sang thứ thú vị hơn', avoidThis: 'Nhảy sang thứ inspire hơn khi gặp phần nhàm', nudgeText: '✅ Hoàn thành 1 thứ nhỏ trước. Sau đó mới được theo inspiration. Deal?', durationMin: 20, category: 'action' },
      { doThis: 'Chia sẻ 1 điều đang làm với ai đó — dù chỉ là "tôi đang làm X"', avoidThis: 'Làm một mình cho đến khi hoàn hảo mới show', nudgeText: '💬 Chia sẻ WIP với 1 người. INFP hay ẩn cho đến khi "sẵn sàng" — sẵn sàng không bao giờ đến.', durationMin: 5, category: 'social' },
      { doThis: 'Nhận 1 compliment hoặc feedback tích cực mà không minimize nó', avoidThis: '"Ôi không có gì đâu" khi người ta khen', nudgeText: '🌸 Khi được khen hôm nay, thử chỉ nói "Cảm ơn." — không minimize, không giải thích.', durationMin: 1, category: 'mindset' },
      { doThis: 'Di chuyển cơ thể 10 phút — đi bộ, nhảy, yoga bất cứ gì', avoidThis: 'Ngồi 4 giờ vì đang trong "zone" sáng tạo', nudgeText: '🚶 10 phút di chuyển. Creativity của INFP cao hơn sau khi body được move.', durationMin: 10, category: 'body' },
    ],
    evening: [
      { doThis: 'Ghi lại 1 điều sáng tạo đã xảy ra hôm nay — dù nhỏ nhất', avoidThis: 'Kết thúc ngày mà không nhận ra beauty xung quanh', nudgeText: '🌙 1 khoảnh khắc đẹp hoặc sáng tạo hôm nay. Ghi xuống. Đừng để nó trôi qua.', durationMin: 3, category: 'reflection' },
      { doThis: 'Permit bản thân feel feelings — không judge, không fix ngay', avoidThis: 'Suppress cảm xúc vì "không có lý do cụ thể"', nudgeText: '💭 Đang cảm thấy gì tối nay? Chỉ nhận ra và ghi xuống. Không cần fix. Chỉ cần biết.', durationMin: 5, category: 'reflection' },
      { doThis: 'Chuẩn bị 1 thứ cho ngày mai — giảm quyết định sáng sớm', avoidThis: 'Để mọi quyết định sáng mai cho sáng mai', nudgeText: '🌛 Chuẩn bị 1 thứ cho ngày mai trước khi ngủ. INFP morning brain cần ít decisions hơn.', durationMin: 5, category: 'action' },
      { doThis: 'Nhắn tin hoặc gọi cho 1 người có ý nghĩa — không vì lý do gì', avoidThis: 'Muốn connect nhưng sợ làm phiền nên không làm', nudgeText: '❤️ Nhắn 1 tin cho người bạn nhớ tới tối nay. Họ muốn nghe từ bạn hơn bạn nghĩ.', durationMin: 5, category: 'social' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ENFJ — Người hướng dẫn
  // ═══════════════════════════════════════════════════════════
  ENFJ: {
    mbtiType: 'ENFJ',
    morning: [
      { doThis: 'Check in với bản thân trước khi check in với người khác: bạn ổn không?', avoidThis: 'Bắt đầu ngày bằng cách lo cho người khác trước bản thân', nudgeText: '☀️ Trước khi hỏi người khác ổn không — bạn ổn không? Thật sự?', durationMin: 3, category: 'mindset' },
      { doThis: 'Ăn sáng đủ chất — tự chăm sóc bản thân là điều kiện để chăm sóc người khác', avoidThis: 'Skip ăn sáng vì bận giúp hoặc plan cho người khác', nudgeText: '🍳 Ăn sáng đủ. ENFJ không thể đổ đầy bình người khác khi bình mình đang cạn.', durationMin: 15, category: 'body' },
      { doThis: 'Set 1 boundary cho ngày hôm nay — sẽ không làm gì hoặc không để ai đó làm gì', avoidThis: 'Vào ngày mà không có boundary nào', nudgeText: '🛡️ 1 boundary cho hôm nay. Viết ra. Giữ nó.', durationMin: 3, category: 'mindset' },
      { doThis: '5 phút quiet time — không ai cần bạn trong 5 phút đó', avoidThis: 'Immediately available cho mọi người từ khi thức dậy', nudgeText: '🤫 5 phút chỉ cho bạn. Trước khi cả thế giới cần bạn — 5 phút này là của riêng.', durationMin: 5, category: 'body' },
    ],
    practice: [
      { doThis: 'Delegate 1 task thay vì tự làm vì "làm nhanh hơn"', avoidThis: 'Overload bản thân vì không muốn burden người khác', nudgeText: '🤝 Delegate 1 task hôm nay. Không phải vì lười — vì giúp người khác grow.', durationMin: 5, category: 'action' },
      { doThis: 'Nói trực tiếp về nhu cầu của bản thân với 1 người', avoidThis: 'Mong người khác đoán hoặc tự nhận ra', nudgeText: '💬 Nói nhu cầu của bạn thẳng cho 1 người hôm nay. ENFJ hay gợi ý thay vì nói thẳng.', durationMin: 5, category: 'social' },
      { doThis: 'Cho phép mình không có giải pháp cho vấn đề của ai đó — chỉ cần present', avoidThis: 'Feel guilty khi không thể fix mọi vấn đề người khác mang đến', nudgeText: '👂 Hôm nay: có thể chỉ lắng nghe mà không cần giải pháp. Bạn không cần fix everything.', durationMin: 10, category: 'mindset' },
      { doThis: 'Tập thể dục — năng lượng tốt giúp ENFJ serve người khác tốt hơn', avoidThis: 'Không tập vì dành thời gian đó cho người khác', nudgeText: '💪 Tập thể dục hôm nay — vì ENFJ serve người khác tốt nhất khi mình khỏe.', durationMin: 20, category: 'body' },
    ],
    evening: [
      { doThis: 'Hỏi bản thân: hôm nay mình được nhận gì? (Không chỉ cho đi)', avoidThis: 'Kết thúc ngày chỉ đếm mình đã giúp được bao nhiêu người', nudgeText: '⚖️ Hôm nay bạn đã cho và nhận cân bằng chưa? Nếu chưa — đó là pattern cần notice.', durationMin: 3, category: 'reflection' },
      { doThis: 'Viết 1 điều đang proud về bản thân — không phải về việc đã giúp ai', avoidThis: 'Chỉ thấy giá trị qua mắt người khác', nudgeText: '🌟 1 điều proud về BẠN — không phải về ai bạn đã giúp. Về chính bạn.', durationMin: 3, category: 'reflection' },
      { doThis: 'Disconnect khỏi group chat và notifications 1 giờ', avoidThis: 'Available 24/7 cho mọi người kể cả trước khi ngủ', nudgeText: '📵 1 giờ offline trước ngủ. ENFJ cần space để recharge — không phải selfish.', durationMin: 1, category: 'body' },
      { doThis: 'Reflect: hôm nay có ai appreciate bạn đúng cách không? Nếu không — đó có ổn không?', avoidThis: 'Tiếp tục give mà không nhận được appreciation tương xứng', nudgeText: '💭 Được appreciate hôm nay chưa? Nếu không — hãy acknowledge rằng bạn xứng đáng được nhận.', durationMin: 5, category: 'reflection' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ENFP — Nhà vận động
  // ═══════════════════════════════════════════════════════════
  ENFP: {
    mbtiType: 'ENFP',
    morning: [
      { doThis: 'Chọn 1 priority cho ngày — chỉ 1. Những thứ khác là bonus', avoidThis: 'List 10 thứ muốn làm rồi không hoàn thành cái nào', nudgeText: '🎯 1 thứ quan trọng nhất hôm nay. Chỉ 1. Nếu hoàn thành, ngày thắng lợi.', durationMin: 3, category: 'mindset' },
      { doThis: 'Nhảy 5 phút hoặc bất cứ điều gì để wake up cơ thể', avoidThis: 'Bắt đầu ngày bằng phone ngay khi thức dậy', nudgeText: '💃 Wake up body trước khi wake up brain. 5 phút nhảy hoặc bất cứ gì vui vẻ.', durationMin: 5, category: 'body' },
      { doThis: 'Review commitment hôm qua — đã giữ không? Nếu chưa — đang ở đâu?', avoidThis: 'Carry commitment cũ mà không acknowledge', nudgeText: '📋 Hôm qua commit gì không? Đang ở đâu rồi? Honest check-in với bản thân.', durationMin: 5, category: 'reflection' },
      { doThis: 'Ăn sáng ngồi yên — không phone, không scroll', avoidThis: 'Multitask trong khi ăn sáng', nudgeText: '🥞 Ăn sáng mà không nhìn điện thoại. ENFP brain cần ít stimulation hơn buổi sáng.', durationMin: 10, category: 'body' },
    ],
    practice: [
      { doThis: 'Hoàn thành 1 thứ "không thú vị" trước khi làm thứ mình muốn', avoidThis: 'Làm thứ inspire trước, xử lý admin sau — thường là không bao giờ sau', nudgeText: '🐸 "Eat the frog" — làm thứ nhàm chán nhất trước. Sau đó sống thoải mái.', durationMin: 20, category: 'action' },
      { doThis: 'Deep conversation với 1 người về topic có ý nghĩa', avoidThis: 'Surface chat với 5 người mà không kết nối thật sự với ai', nudgeText: '💫 1 conversation có chiều sâu hôm nay. ENFP charge qua kết nối thật sự, không phải số lượng.', durationMin: 30, category: 'social' },
      { doThis: 'Viết idea mới vào notepad — nhưng không bắt đầu làm ngay', avoidThis: 'Abandon project đang có để chạy theo idea mới', nudgeText: '📝 Idea mới? Ghi vào. Nhưng đừng bắt đầu. Finish cái đang có trước.', durationMin: 3, category: 'action' },
      { doThis: 'Uống nước và ăn gì đó giữa ngày — nhớ cơ thể tồn tại', avoidThis: 'Quên ăn uống khi đang excited về project', nudgeText: '💧 Ăn gì chưa? Uống nước chưa? ENFP hay forget cơ thể khi đang excited.', durationMin: 10, category: 'body' },
    ],
    evening: [
      { doThis: 'Celebrate 1 win hôm nay — dù nhỏ', avoidThis: 'Jump ngay sang tomorrow goals mà không acknowledge hôm nay', nudgeText: '🎉 Hôm nay có gì tốt? Celebrate nó trước khi plan ngày mai. ENFP cần fuel từ wins.', durationMin: 3, category: 'reflection' },
      { doThis: 'Viết down 3 commitments ngày mai — không hơn', avoidThis: 'Plan 15 thứ ngày mai lúc đang excited buổi tối', nudgeText: '📅 3 commitments ngày mai. Không hơn. ENFP hay overcommit khi đang high energy tối.', durationMin: 5, category: 'action' },
      { doThis: 'Gọi hoặc gặp 1 người để share excitement về gì đó đang làm', avoidThis: 'Giữ excitement trong bụng đến khi deflate', nudgeText: '🌈 Share excitement về gì đó đang làm với 1 người tối nay. ENFP cần đồng minh.', durationMin: 15, category: 'social' },
      { doThis: 'Wind down với thứ gì đó nhẹ nhàng — không stimulating', avoidThis: 'Consume exciting content trước ngủ rồi wonder tại sao không ngủ được', nudgeText: '🌙 Wind down với gì đó nhẹ. ENFP brain cần time để decelerate trước khi ngủ.', durationMin: 20, category: 'body' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ISTJ — Người hậu cần
  // ═══════════════════════════════════════════════════════════
  ISTJ: {
    mbtiType: 'ISTJ',
    morning: [
      { doThis: 'Review task list và prioritize theo importance, không chỉ urgency', avoidThis: 'Làm thứ urgent mà quên thứ important', nudgeText: '📋 Sáng nay: phân biệt urgent vs important. Đừng để urgent steal ngày của bạn.', durationMin: 5, category: 'action' },
      { doThis: 'Tập thể dục theo routine — đều đặn quan trọng hơn intensity', avoidThis: 'Skip tập khi không "perfect time"', nudgeText: '🏃 Tập thể dục theo routine hôm nay. ISTJ excel ở consistency — áp dụng cho health.', durationMin: 20, category: 'body' },
      { doThis: 'Thử làm 1 điều nhỏ khác với routine — chỉ 1', avoidThis: 'Mọi thứ đều theo pattern cố định không bao giờ thay đổi', nudgeText: '🔄 1 điều nhỏ hôm nay: làm khác với routine thường ngày. Nhỏ thôi, nhưng thử.', durationMin: 5, category: 'mindset' },
      { doThis: 'Check calendar và prepare trước cho meeting hoặc task quan trọng nhất', avoidThis: 'Go into meeting không chuẩn bị', nudgeText: '📆 5 phút chuẩn bị cho task/meeting quan trọng nhất hôm nay. ISTJ prepare = ISTJ perform.', durationMin: 5, category: 'action' },
    ],
    practice: [
      { doThis: 'Nói ra 1 concern hoặc observation sớm thay vì chờ đến khi vấn đề lớn', avoidThis: 'Giữ concern trong đầu và chỉ deal khi bắt buộc', nudgeText: '💬 Có concern gì chưa nói không? Nói sớm = vấn đề nhỏ. Im lặng quá = vấn đề lớn.', durationMin: 5, category: 'social' },
      { doThis: 'Acknowledge effort của người khác — không chỉ kết quả', avoidThis: 'Chỉ nhận xét khi có vấn đề về output', nudgeText: '👏 Ai đó đang cố gắng hôm nay? Acknowledge effort, không chỉ result.', durationMin: 3, category: 'social' },
      { doThis: 'Cho phép bản thân take break 10 phút mà không cảm thấy tội lỗi', avoidThis: 'Work through fatigue vì còn task chưa xong', nudgeText: '⏸️ 10 phút break. Không phải lazy — là maintenance. Máy cũng cần nghỉ.', durationMin: 10, category: 'body' },
      { doThis: 'Flexible với 1 thứ hôm nay — nếu không thể theo plan, pivot không catastrophize', avoidThis: 'Day ruined vì 1 thứ không theo kế hoạch', nudgeText: '🌊 Nếu 1 thứ không theo plan hôm nay — ổn thôi. Adjust và tiếp tục.', durationMin: 2, category: 'mindset' },
    ],
    evening: [
      { doThis: 'Review ngày: đã hoàn thành gì, còn gì cần carry over?', avoidThis: 'Kết thúc ngày mà không close loop', nudgeText: '✅ Review và close loop ngày hôm nay. ISTJ cần ending rõ ràng để thật sự nghỉ.', durationMin: 5, category: 'reflection' },
      { doThis: 'Chia sẻ 1 điều thú vị với người thân — không phải về công việc', avoidThis: 'Chỉ nói chuyện work hoặc logistics ở nhà', nudgeText: '🏠 Chia sẻ 1 điều thú vị với người ở nhà. Không phải về việc. Về bạn thích gì.', durationMin: 10, category: 'social' },
      { doThis: 'Prepare kế hoạch cụ thể cho ngày mai — đặt đồ sẵn sàng', avoidThis: 'Để sáng mai decide mọi thứ', nudgeText: '🌛 Chuẩn bị cho ngày mai trước khi ngủ. ISTJ prepared = ISTJ confident.', durationMin: 10, category: 'action' },
      { doThis: 'Đọc sách hoặc làm gì đó enjoy — không phải productive', avoidThis: 'Coi rest là waste of time', nudgeText: '📚 Rest và enjoy là productive. ISTJ hay forget that rest is part of performance.', durationMin: 20, category: 'body' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ISFJ — Người bảo hộ
  // ═══════════════════════════════════════════════════════════
  ISFJ: {
    mbtiType: 'ISFJ',
    morning: [
      { doThis: 'Chọn 1 thứ cho MÌNH hôm nay — không phải cho ai khác', avoidThis: 'Lên kế hoạch ngày hoàn toàn xung quanh người khác', nudgeText: '💛 Hôm nay có 1 thứ cho BẠN không? Không phải cho ai. Chọn 1 thứ.', durationMin: 3, category: 'mindset' },
      { doThis: 'Stretch hoặc yoga nhẹ 10 phút — cơ thể cần được take care of', avoidThis: 'Skip self-care routine vì có người cần mình', nudgeText: '🧘 10 phút cho cơ thể trước khi ngày bắt đầu. Bạn không thể care người khác nếu cơ thể mình không ổn.', durationMin: 10, category: 'body' },
      { doThis: 'Viết 1 điều đang lo lắng — và 1 điều bạn có thể làm về nó', avoidThis: 'Mang anxiety cả ngày mà không process', nudgeText: '📝 Đang lo lắng gì sáng nay? Viết ra + 1 action nhỏ có thể làm. Anxiety thích được acknowledge.', durationMin: 5, category: 'reflection' },
      { doThis: 'Set 1 gentle intention — không phải goal cứng', avoidThis: 'Pressure bản thân với list dài việc cần làm hoàn hảo', nudgeText: '🌸 Intention nhẹ nhàng cho ngày hôm nay. Không phải goal cứng. Chỉ là hướng đi.', durationMin: 3, category: 'mindset' },
    ],
    practice: [
      { doThis: 'Nói "Tôi cần giúp đỡ với..." với 1 người hôm nay', avoidThis: 'Làm mọi thứ một mình vì không muốn làm phiền', nudgeText: '🙋 Hôm nay thử nói "Tôi cần giúp đỡ" với 1 người. Đây là strength, không phải weakness.', durationMin: 5, category: 'social' },
      { doThis: 'Nhận compliment hoặc thank you mà không deflect', avoidThis: '"Không có gì đâu" "Ai cũng làm vậy thôi"', nudgeText: '🌟 Khi được cảm ơn hôm nay: "Cảm ơn" — và dừng lại. Không deflect. Nhận nó.', durationMin: 1, category: 'mindset' },
      { doThis: 'Nói ra 1 preference hoặc opinion của bản thân trong cuộc trò chuyện', avoidThis: 'Luôn defer đến preference của người khác', nudgeText: '🗣️ Hôm nay có ít nhất 1 lần nói "Tôi thích..." hoặc "Ý kiến tôi là...". Tiếng nói của bạn quan trọng.', durationMin: 2, category: 'social' },
      { doThis: 'Ăn trưa đúng giờ và ngồi ăn đàng hoàng', avoidThis: 'Skip hoặc vừa ăn vừa làm việc', nudgeText: '🥗 Ăn trưa đúng giờ, ngồi yên, không multitask. ISFJ hay bỏ bê bản thân khi chăm người khác.', durationMin: 30, category: 'body' },
    ],
    evening: [
      { doThis: 'Viết 3 điều đang appreciate về bản thân hôm nay', avoidThis: 'Kết thúc ngày chỉ nhớ những gì chưa làm được', nudgeText: '💛 3 điều bạn appreciate về BẠN hôm nay. Không phải về việc bạn đã làm cho ai.', durationMin: 5, category: 'reflection' },
      { doThis: 'Cho phép bản thân nghỉ ngơi mà không feel guilty', avoidThis: 'Cảm thấy cần justify rest bằng productivity', nudgeText: '🛋️ Nghỉ ngơi mà không cần xin phép. ISFJ deserves rest như mọi người khác.', durationMin: 30, category: 'body' },
      { doThis: 'Check in: có ai đang take advantage of kindness của bạn không?', avoidThis: 'Tiếp tục give mà không notice pattern không lành mạnh', nudgeText: '🔍 Honest check: ai đang receive nhiều hơn họ give trong mối quan hệ với bạn? Notice nó.', durationMin: 5, category: 'reflection' },
      { doThis: 'Wind down với ritual dễ chịu — bath, tea, nhạc nhẹ', avoidThis: 'Tiếp tục làm việc cho người khác đến tận khi ngủ', nudgeText: '🍵 Evening ritual cho MÌNH. Tea, bath, nhạc nhẹ — bất cứ gì làm bạn relax. Not optional.', durationMin: 20, category: 'body' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ESTJ — Giám đốc điều hành
  // ═══════════════════════════════════════════════════════════
  ESTJ: {
    mbtiType: 'ESTJ',
    morning: [
      { doThis: 'Review KPIs và milestones — đang đúng track không?', avoidThis: 'Bắt đầu ngày mà không có cái nhìn tổng thể', nudgeText: '📊 5 phút review KPIs sáng nay. ESTJ performs best khi biết score đang ở đâu.', durationMin: 5, category: 'action' },
      { doThis: 'Tập thể dục theo schedule — không improvise', avoidThis: 'Skip vì "có việc urgent hơn"', nudgeText: '💪 Tập thể dục theo schedule. ESTJ biết discipline builds performance — áp dụng cho health.', durationMin: 25, category: 'body' },
      { doThis: 'Set tone ngày: hôm nay muốn lead team như thế nào?', avoidThis: 'Vào ngày mà không có conscious leadership intention', nudgeText: '🧭 Hôm nay muốn lead như thế nào? 1 từ. Viết xuống trước khi gặp ai.', durationMin: 3, category: 'mindset' },
      { doThis: 'Xác nhận với team: ai làm gì, cần gì, blockers ở đâu', avoidThis: 'Assume mọi người biết và đang làm đúng', nudgeText: '👥 Quick sync với team sáng nay. Clarity = productivity. Không sync = surprises.', durationMin: 15, category: 'action' },
    ],
    practice: [
      { doThis: 'Hỏi 1 câu hỏi mở trước khi đưa ra giải pháp', avoidThis: 'Jump straight to solution mode', nudgeText: '🎯 Trước khi solve: hỏi "Bạn đang gặp vấn đề gì?" Đôi khi người khác chỉ cần được nghe.', durationMin: 5, category: 'social' },
      { doThis: 'Acknowledge khi mình sai — nhanh, rõ ràng, và move on', avoidThis: 'Defend position khi đã rõ ràng là cần adjust', nudgeText: '🔄 Nếu sai hôm nay, admit nhanh và rõ ràng. ESTJ tôn trọng nhất khi có thể làm điều này.', durationMin: 2, category: 'mindset' },
      { doThis: 'Dành 5 phút truly listening — không plan response trong đầu', avoidThis: 'Đang nghe nhưng đang think về response tiếp theo', nudgeText: '👂 5 phút truly listen. Không plan response. ESTJ thường think về next step thay vì present.', durationMin: 10, category: 'social' },
      { doThis: 'Stretch và bước ra ngoài 10 phút giữa ngày', avoidThis: 'Ngồi 6 giờ không đứng vì "quá bận"', nudgeText: '🚶 Ra ngoài 10 phút. ESTJ performance long-term cần short-term recovery.', durationMin: 10, category: 'body' },
    ],
    evening: [
      { doThis: 'Hard close at end of day — viết tomorrow priorities và đóng computer', avoidThis: 'Work spill sang dinner và evening', nudgeText: '🔒 Hard close cuối ngày. Write tomorrow top 3, close computer. Done là done.', durationMin: 5, category: 'action' },
      { doThis: 'Hỏi người thân: họ đang như thế nào — và thật sự lắng nghe', avoidThis: 'Switch từ work mode sang logistics mode ngay ở nhà', nudgeText: '❤️ Hỏi người thân "Bạn đang như thế nào?" và lắng nghe. Không solve. Chỉ nghe.', durationMin: 15, category: 'social' },
      { doThis: 'Reflect: hôm nay có treat ai không fair không?', avoidThis: 'Bỏ qua friction trong team mà không reflect', nudgeText: '🪞 Hôm nay có moment nào với ai chưa ổn không? Honest reflection. Ngày mai có thể better.', durationMin: 5, category: 'reflection' },
      { doThis: 'Đọc hoặc xem gì đó entirely unrelated to work', avoidThis: 'Consume work content trước khi ngủ', nudgeText: '📺 Xem/đọc gì đó không liên quan đến work tối nay. ESTJ cần off mode thật sự.', durationMin: 30, category: 'body' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ESFJ — Nhà lãnh sự
  // ═══════════════════════════════════════════════════════════
  ESFJ: {
    mbtiType: 'ESFJ',
    morning: [
      { doThis: 'Check in với bản thân trước khi check in với người khác', avoidThis: 'Immediately care về người khác trước khi care bản thân', nudgeText: '🌅 Trước khi hỏi người khác — bạn đang như thế nào thật sự?', durationMin: 3, category: 'mindset' },
      { doThis: 'Chuẩn bị 1 thứ tốt cho bản thân — không phải cho ai khác', avoidThis: 'Morning routine hoàn toàn về chuẩn bị cho người khác', nudgeText: '☕ Hôm nay làm 1 thứ tốt cho BẠN trong morning routine. Không phải cho ai khác.', durationMin: 10, category: 'body' },
      { doThis: 'Set 1 personal goal cho ngày — không liên quan đến giúp ai', avoidThis: 'Ngày hoàn toàn được define bởi người cần bạn', nudgeText: '🎯 1 personal goal cho hôm nay. Không phải giúp ai — là cho bạn.', durationMin: 3, category: 'mindset' },
      { doThis: 'Ăn sáng đủ chất và không vội vàng', avoidThis: 'Hy sinh bữa sáng để lo cho người khác xong trước', nudgeText: '🥞 Ăn sáng đàng hoàng. Mọi thứ khác chờ 15 phút được.', durationMin: 15, category: 'body' },
    ],
    practice: [
      { doThis: 'Nói không với 1 request không align với priority của mình', avoidThis: 'Nói có với mọi thứ vì sợ làm thất vọng', nudgeText: '🛡️ "Không" với 1 request hôm nay. Người xứng đáng với bạn sẽ hiểu.', durationMin: 2, category: 'action' },
      { doThis: 'Chia sẻ opinion của mình trong group dù nó khác với đa số', avoidThis: 'Agree với đám đông để giữ hòa khí', nudgeText: '💬 Ý kiến bạn trong group hôm nay — dù khác số đông. ESFJ có insight quý giá khi dám nói.', durationMin: 5, category: 'social' },
      { doThis: 'Đi bộ hoặc tập thể dục — dành time cho cơ thể mình', avoidThis: 'Bỏ tập vì có người cần mình', nudgeText: '🚶 Tập thể dục. Cơ thể bạn cũng cần được care như những người bạn care.', durationMin: 20, category: 'body' },
      { doThis: 'Tự cho bản thân break — không cần justify với ai', avoidThis: 'Feel guilty khi nghỉ ngơi vì "có việc cần làm"', nudgeText: '⏸️ Break time. Không cần xin phép. Không cần explain. Just rest.', durationMin: 10, category: 'body' },
    ],
    evening: [
      { doThis: 'Reflect: hôm nay bạn đã care cho bản thân như bạn care người khác không?', avoidThis: 'Only count hôm nay tốt không dựa trên số người được giúp', nudgeText: '⚖️ Hôm nay bạn đã care bản thân chưa? Không phải chỉ care người khác.', durationMin: 3, category: 'reflection' },
      { doThis: 'Ghi nhận 1 điều mình đã làm tốt cho MÌNH hôm nay', avoidThis: 'Chỉ count achievement dựa trên người khác happy', nudgeText: '🌟 1 điều bạn đã làm tốt cho MÌNH hôm nay. Không phải cho ai khác.', durationMin: 3, category: 'reflection' },
      { doThis: 'Nói thẳng về 1 nhu cầu hoặc cảm xúc với người thân', avoidThis: 'Giữ trong lòng và mong họ đoán', nudgeText: '💌 Nói thẳng với 1 người tối nay: "Tôi đang cần..." hoặc "Tôi cảm thấy...". Đừng mong họ đoán.', durationMin: 10, category: 'social' },
      { doThis: 'Self-care ritual nhỏ trước ngủ — vì bạn xứng đáng', avoidThis: 'Skip self-care vì dành thời gian cho người khác', nudgeText: '🛁 Self-care tối nay. Bath, skincare, gì cũng được. ESFJ xứng đáng được take care of.', durationMin: 15, category: 'body' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ISTP — Nhà kỹ xảo
  // ═══════════════════════════════════════════════════════════
  ISTP: {
    mbtiType: 'ISTP',
    morning: [
      { doThis: 'Check 1 system hoặc process trong cuộc sống — có gì cần optimize không?', avoidThis: 'Accept broken system mà không try to fix', nudgeText: '🔧 Sáng nay: có system nào trong cuộc sống cần tune up? ISTP giỏi nhất ở đây.', durationMin: 5, category: 'action' },
      { doThis: 'Tập thể dục — ISTP cần physical activity để thinking sharp', avoidThis: 'Skip vì không thấy immediate value', nudgeText: '⚡ Tập thể dục sáng nay. ISTP thinking clearest sau khi body được work out.', durationMin: 20, category: 'body' },
      { doThis: 'Xác định 1 problem cụ thể sẽ solve hôm nay', avoidThis: 'Vào ngày không có concrete challenge', nudgeText: '🎯 Problem cụ thể nào sẽ được solved hôm nay? ISTP cần concrete challenge để engage.', durationMin: 3, category: 'mindset' },
      { doThis: 'Communicate plan ngày với 1 người liên quan — dù ngắn', avoidThis: 'Operate độc lập mà không update ai', nudgeText: '📱 Update ngắn cho 1 người liên quan về hôm nay. ISTP hay disappear vào work mode.', durationMin: 2, category: 'social' },
    ],
    practice: [
      { doThis: 'Explain làm gì cho ai đó bằng ngôn ngữ đơn giản', avoidThis: 'Work solo và không update ai về progress', nudgeText: '🗣️ Explain progress cho ai đó hôm nay. Không phải để check in — để connect.', durationMin: 5, category: 'social' },
      { doThis: 'Hỏi người khác về experience của họ — thật sự tò mò', avoidThis: 'Chỉ connect khi có practical need', nudgeText: '❓ Hôm nay hỏi 1 người về experience của họ. Tò mò thật sự. ISTP giỏi learn từ data — kể cả human data.', durationMin: 10, category: 'social' },
      { doThis: 'Take break và đứng dậy khỏi bàn mỗi giờ', avoidThis: 'Ngồi 5 giờ không đứng vì đang in flow', nudgeText: '🚶 Đứng dậy mỗi giờ. ISTP hay không nhận ra đã ngồi 4 tiếng.', durationMin: 5, category: 'body' },
      { doThis: 'Document solution hoặc insight — share với team', avoidThis: 'Giữ knowledge trong đầu mà không share', nudgeText: '📝 Document 1 solution hoặc insight hôm nay. ISTP knowledge có giá trị — share nó.', durationMin: 10, category: 'action' },
    ],
    evening: [
      { doThis: 'Reflect: hôm nay có kết nối với ai thật sự không?', avoidThis: 'Kết thúc ngày chỉ về technical achievement', nudgeText: '🔗 Hôm nay có kết nối thật với ai không? Không phải về việc — về người.', durationMin: 3, category: 'reflection' },
      { doThis: 'Express 1 điều appreciate về ai đó trong ngày', avoidThis: 'Assume người khác biết mình appreciate họ', nudgeText: '🙏 Ai đó làm gì tốt hôm nay? Nói với họ. ISTP rarely expresses — nhưng nó quan trọng.', durationMin: 3, category: 'social' },
      { doThis: 'Enjoy something — hobby, game, build gì đó — không phải productive', avoidThis: 'Rest bằng cách scroll vô nghĩa', nudgeText: '🛠️ Làm gì đó bạn enjoy tối nay. Build, game, hobby — bất cứ gì nạp energy cho bạn.', durationMin: 30, category: 'body' },
      { doThis: 'Note down 1 lesson learned từ problem hôm nay', avoidThis: 'Solve problem xong và không extract lesson', nudgeText: '💡 1 lesson từ hôm nay. ISTP giỏi solve nhưng hay skip extracting knowledge.', durationMin: 3, category: 'reflection' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ISFP — Nhà thám hiểm
  // ═══════════════════════════════════════════════════════════
  ISFP: {
    mbtiType: 'ISFP',
    morning: [
      { doThis: 'Chú ý 1 điều đẹp trong môi trường xung quanh khi thức dậy', avoidThis: 'Bắt đầu ngày bằng phone và noise', nudgeText: '🌸 1 điều đẹp khi thức dậy sáng nay. ISFP thấy đẹp tốt nhất khi chú ý.', durationMin: 2, category: 'mindset' },
      { doThis: 'Tập thể dục hoặc dance theo nhạc — kết nối với cơ thể', avoidThis: 'Bắt đầu ngày không có physical movement', nudgeText: '💃 Move cơ thể sáng nay theo cách bạn thích. Dance, yoga, walk — theo mood.', durationMin: 15, category: 'body' },
      { doThis: 'Set gentle intention cho ngày — 1 từ hoặc 1 cảm giác', avoidThis: 'Approach ngày với rigid schedule', nudgeText: '🎨 1 từ cho ngày hôm nay. Không phải goal — là feeling hoặc quality bạn muốn mang.', durationMin: 2, category: 'mindset' },
      { doThis: 'Ăn sáng enjoy — không vội, chú ý hương vị', avoidThis: 'Vừa ăn vừa xem điện thoại', nudgeText: '🍊 Ăn sáng chậm và enjoy từng miếng. ISFP experience life fully khi present.', durationMin: 15, category: 'body' },
    ],
    practice: [
      { doThis: 'Làm 1 thứ sáng tạo trong 15 phút — không cần hoàn hảo', avoidThis: 'Không làm vì "không có hứng" hoặc "chưa sẵn sàng"', nudgeText: '✨ 15 phút sáng tạo hôm nay. Không cần perfect. Không cần hứng. Chỉ cần bắt đầu.', durationMin: 15, category: 'action' },
      { doThis: 'Show appreciation cho ai đó bằng hành động cụ thể', avoidThis: 'Feel appreciation nhưng không express', nudgeText: '💌 Ai đó deserves appreciation hôm nay? Express it. Không bằng lời — bằng hành động nhỏ.', durationMin: 10, category: 'social' },
      { doThis: 'Assert 1 preference hoặc choice của mình', avoidThis: 'Defer cho người khác vì ngại', nudgeText: '🗣️ "Tôi thích..." hoặc "Tôi chọn..." — 1 lần hôm nay. Ý kiến bạn có giá trị.', durationMin: 2, category: 'social' },
      { doThis: 'Hoàn thành 1 task practical dù nhỏ', avoidThis: 'Tránh practical tasks vì không inspire', nudgeText: '✅ 1 practical task hôm nay. Nhỏ thôi. ISFP cần occasional structure để feel grounded.', durationMin: 20, category: 'action' },
    ],
    evening: [
      { doThis: 'Reflect: hôm nay có điều gì đẹp đã xảy ra?', avoidThis: 'Kết thúc ngày chỉ nhớ những thứ không ổn', nudgeText: '🌙 1 điều đẹp hôm nay. ISFP notice beauty naturally — hãy capture nó.', durationMin: 3, category: 'reflection' },
      { doThis: 'Share 1 điều authentic về ngày với người thân hoặc bạn bè', avoidThis: 'Giữ experiences cho riêng mình', nudgeText: '💬 Share 1 thứ authentic về ngày hôm nay với ai đó. ISFP hay keep inside — share adds connection.', durationMin: 10, category: 'social' },
      { doThis: 'Creative wind-down — draw, music, journal, bất cứ gì', avoidThis: 'Scroll passively trước ngủ', nudgeText: '🎨 Kết thúc ngày bằng thứ gì đó creative và calming. ISFP recharges qua beauty và expression.', durationMin: 20, category: 'body' },
      { doThis: 'Viết 1 điều self-compassion — không tự blame cho mistakes', avoidThis: 'Replay mistakes của ngày trước khi ngủ', nudgeText: '💛 1 câu self-compassion trước ngủ. ISFP hay harsh với bản thân. Nhẹ nhàng hơn nhé.', durationMin: 3, category: 'reflection' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ESTP — Doanh nhân
  // ═══════════════════════════════════════════════════════════
  ESTP: {
    mbtiType: 'ESTP',
    morning: [
      { doThis: 'Tập thể dục intense — ESTP cần burn energy sáng sớm', avoidThis: 'Bắt đầu ngày bằng meetings hoặc passive scroll', nudgeText: '🏋️ Workout intense sáng nay. ESTP performs best khi đã burn energy trước 9h.', durationMin: 25, category: 'body' },
      { doThis: 'Identify top opportunity hoặc challenge sẽ tackle hôm nay', avoidThis: 'React to day as it comes mà không có focus', nudgeText: '🎯 Opportunity hoặc challenge lớn nhất hôm nay là gì? Đó là nơi ESTP cần be.', durationMin: 3, category: 'mindset' },
      { doThis: 'Check 1 long-term goal — vẫn đang đi đúng hướng không?', avoidThis: 'Chỉ focus short-term wins mà không check big picture', nudgeText: '🗺️ Quick check: long-term goal của bạn đang ở đâu? ESTP hay forget big picture.', durationMin: 5, category: 'reflection' },
      { doThis: 'Eat breakfast — fuel for high energy day', avoidThis: 'Skip breakfast vì "không có giờ"', nudgeText: '⚡ Ăn sáng. ESTP cần fuel cho high-energy day. Không thể sprint on empty.', durationMin: 10, category: 'body' },
    ],
    practice: [
      { doThis: 'Nghe hết trước khi respond — đặc biệt với người slower', avoidThis: 'Cut off người đang nói vì đã biết họ muốn nói gì', nudgeText: '👂 Nghe hết trước khi nói. ESTP hay know answer trước — nhưng đôi khi sai.', durationMin: 5, category: 'social' },
      { doThis: 'Think about consequence của action ngày hôm nay cho 1 tuần sau', avoidThis: 'Make decision purely based on right now', nudgeText: '🔮 Quyết định hôm nay sẽ ảnh hưởng gì trong 1 tuần? Quick check trước khi act.', durationMin: 3, category: 'mindset' },
      { doThis: 'Express genuine appreciation cho ai đó — không phải vì cần gì', avoidThis: 'Chỉ appreciate khi có transaction', nudgeText: '🙏 Appreciate ai đó hôm nay — không phải vì cần gì từ họ. Just because.', durationMin: 3, category: 'social' },
      { doThis: 'Write down top 3 wins của tuần — track progress', avoidThis: 'Forget wins và only focus on next challenge', nudgeText: '🏆 Top 3 wins tuần này. ESTP chạy nhanh đến mức không count victories — count them.', durationMin: 5, category: 'reflection' },
    ],
    evening: [
      { doThis: 'Slow down và have real conversation với 1 người — không nói về deal/work', avoidThis: 'Every conversation là networking hoặc deal', nudgeText: '💬 Conversation tối nay: không phải về deal, không phải về opportunities. Về con người.', durationMin: 20, category: 'social' },
      { doThis: 'Reflect: có ai bị affected tiêu cực bởi action của mình hôm nay không?', avoidThis: 'Only think về outcome của bản thân', nudgeText: '🪞 Ai bị ảnh hưởng bởi hành động của bạn hôm nay? Honest look. Any amends cần thiết?', durationMin: 5, category: 'reflection' },
      { doThis: 'Wind down — body cần recovery sau high-energy day', avoidThis: 'Keep going until crash', nudgeText: '🌙 Wind down. ESTP cần recovery sau high-intensity day. Performance tomorrow depends on rest tonight.', durationMin: 30, category: 'body' },
      { doThis: 'Save 1% của earnings hôm nay — build long-term habit', avoidThis: 'Spend everything because "more will come"', nudgeText: '💰 Để dành 1 thứ nhỏ hôm nay. ESTP biết hustle — cần learn save cũng vậy.', durationMin: 2, category: 'action' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // ESFP — Người biểu diễn
  // ═══════════════════════════════════════════════════════════
  ESFP: {
    mbtiType: 'ESFP',
    morning: [
      { doThis: 'Dance hoặc sing theo bài hát yêu thích — wake up mood', avoidThis: 'Bắt đầu ngày với news hoặc drama', nudgeText: '🎵 Bật bài hát yêu thích và dance/sing 1 phút. Best way ESFP wakes up properly.', durationMin: 3, category: 'body' },
      { doThis: 'Check 1 financial commitment của tuần — đang đúng budget không?', avoidThis: 'Avoid looking at finances entirely', nudgeText: '💳 Quick finance check sáng nay. ESFP hay avoid — nhưng 5 phút prevent problems lớn.', durationMin: 5, category: 'action' },
      { doThis: 'Set 1 small commitment cho ngày — và giữ nó', avoidThis: 'Để ngày hoàn toàn theo mood', nudgeText: '📌 1 commitment nhỏ cho hôm nay. Giữ nó. ESFP build trust với bản thân qua small keeps.', durationMin: 2, category: 'mindset' },
      { doThis: 'Ăn sáng đủ và đẹp — food presentation matters', avoidThis: 'Skip breakfast vì late', nudgeText: '🥞 Ăn sáng ngon và đẹp mắt. ESFP thích beauty — áp dụng cho bữa sáng của mình.', durationMin: 15, category: 'body' },
    ],
    practice: [
      { doThis: 'Complete 1 boring but necessary task trước 12h', avoidThis: 'Postpone admin tasks đến "sau"', nudgeText: '🐸 Boring task nhất: hoàn thành trước 12h. ESFP sẽ much happier cả ngày sau khi done.', durationMin: 30, category: 'action' },
      { doThis: 'Listen deeply to 1 person — full attention, no phone', avoidThis: 'Multitask trong conversation', nudgeText: '👂 1 conversation: full attention. No phone. ESFP connects best khi truly present.', durationMin: 15, category: 'social' },
      { doThis: 'Uống đủ nước — set reminder nếu cần', avoidThis: 'Forget to hydrate khi busy socializing', nudgeText: '💧 Uống nước. ESFP hay forget because so busy with people and fun.', durationMin: 1, category: 'body' },
      { doThis: 'Nói ra 1 honest opinion hoặc feedback', avoidThis: 'Only say what people want to hear', nudgeText: '💬 Honest opinion hôm nay. ESFP giỏi make people feel good — đôi khi cần nói thật hơn.', durationMin: 5, category: 'social' },
    ],
    evening: [
      { doThis: 'Review ngày: đã giữ commitment không? Không phán xét — chỉ data', avoidThis: 'Avoid reflecting because might feel bad', nudgeText: '📊 Commitment hôm nay: kept or not? Data only, no judgment. Learning, not beating self up.', durationMin: 5, category: 'reflection' },
      { doThis: 'Chuẩn bị 1-2 thứ cho ngày mai trong khi đang có energy', avoidThis: 'Leave everything for morning rush', nudgeText: '🌙 Chuẩn bị 1-2 thứ cho ngày mai. Future ESFP sẽ grateful. Morning rush không phải fun.', durationMin: 10, category: 'action' },
      { doThis: 'Share genuine moment của ngày với người thân', avoidThis: 'Only share highlight reel, not real moments', nudgeText: '❤️ Share 1 real moment của ngày với người thân. Không phải highlight — real.', durationMin: 10, category: 'social' },
      { doThis: 'Wind down với calming activity — baths, gentle music', avoidThis: 'Party hoặc exciting activity right before sleep', nudgeText: '🛁 Calming activity trước ngủ. ESFP cần transition từ high energy to rest. Không thể jump direct.', durationMin: 20, category: 'body' },
    ],
  },
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getPracticeSlotId(
  mbtiType: string,
  slot: 'morning' | 'practice' | 'evening',
  index: number,
  practice?: PracticeSlot,
): string {
  return practice?.id ?? `pack1-${mbtiType.toLowerCase()}-${slot}-${index}`
}

// Lấy nudge theo type + slot + ngày trong tuần (để rotate)
export function getDailyNudge(
  mbtiType: string,
  slot: 'morning' | 'practice' | 'evening',
  dayIndex: number  // 0-6 (Sun-Sat)
): PracticeSlot | null {
  const profile = DAILY_PRACTICES[mbtiType]
  if (!profile) return null
  const slots = profile[slot]
  return slots[dayIndex % slots.length]
}

// Lấy tất cả nudge của 1 ngày
export function getDayPractices(mbtiType: string, dayIndex: number) {
  return {
    morning: getDailyNudge(mbtiType, 'morning', dayIndex),
    practice: getDailyNudge(mbtiType, 'practice', dayIndex),
    evening: getDailyNudge(mbtiType, 'evening', dayIndex),
  }
}
