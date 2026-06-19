// ============================================================
// work-comm-kb.ts — KB Giao Tiếp Công Sở / Khách Hàng / Deal
// Nguồn: KB batch1 (1.x công sở + 4.x deal) + batch2 (2.x khách + 3.x win-win) + 14 case VN
//   Sách: Crucial Conversations, Difficult Conversations, Never Split the Difference (Voss),
//         Getting to Yes (Fisher&Ury), Cialdini, SBI (CCL), Experience Engineering.
// Pattern: LOOKUP (không RAG) — chỉ inject entry+case KHỚP intent (qwen3:8b context có hạn).
// Dùng: detectCommIntent(msg) → buildCommContext(msg, type) → chèn vào system prompt
//        → Assistant khoác giọng group đang chọn để trả lời. KHÔNG nói tên framework cho user.
// ============================================================

export type CommTopic = 'sep' | 'dong_nghiep' | 'khach_hang' | 'deal' | 'win_win'

export interface KBEntry { id: string; topic: CommTopic; label: string; framework?: string; body: string }
export interface CommCase { id: string; label: string; body: string }
export interface CommIntentRule { keywords: string[]; kbIds: string[]; caseIds: string[] }

// ------------------------------------------------------------
// INTENT MAP — user hỏi gì → entry/case nào
// ------------------------------------------------------------
export const COMM_INTENT_RULES: CommIntentRule[] = [
  // A — SẾP
  { keywords: ['bất đồng với sếp', 'nói khác ý sếp', 'không đồng ý sếp', 'cãi sếp'], kbIds: ['1.1'], caseIds: ['bat-dong-sep'] },
  { keywords: ['xin nghỉ phép', 'xin nghỉ việc', 'nghỉ việc'], kbIds: ['1.2'], caseIds: ['xin-nghi-phep'] },
  { keywords: ['sếp mắng', 'bị mắng', 'góp ý gay gắt', 'bị chê', 'bị góp ý'], kbIds: ['1.5'], caseIds: ['bi-gop-y-gay-gat'] },
  { keywords: ['nhận feedback', 'nhận phê bình', 'bị phê bình'], kbIds: ['1.5'], caseIds: [] },
  // B — ĐỒNG NGHIỆP
  { keywords: ['nhận công', 'cướp công', 'cướp ý tưởng'], kbIds: [], caseIds: ['dong-nghiep-nhan-cong'] },
  { keywords: ['từ chối việc', 'nói không', 'việc ngoài phận sự'], kbIds: ['1.3'], caseIds: ['tu-choi-viec'] },
  { keywords: ['góp ý cho đồng nghiệp', 'góp ý đồng nghiệp', 'feedback đồng nghiệp'], kbIds: ['1.4'], caseIds: [] },
  { keywords: ['xung đột', 'mâu thuẫn đồng nghiệp', 'cãi nhau đồng nghiệp'], kbIds: ['1.8'], caseIds: [] },
  { keywords: ['đùn việc', 'đẩy việc'], kbIds: ['1.3'], caseIds: ['dong-nghiep-dun-viec'] },
  { keywords: ['nghỉ phép lúc bận', 'nghỉ lúc team bận', 'nghỉ lúc đang bận'], kbIds: ['1.2'], caseIds: ['xin-nghi-luc-ban'] },
  { keywords: ['họp', 'phát biểu', 'phát biểu trong họp'], kbIds: ['1.7'], caseIds: [] },
  { keywords: ['email công việc', 'tone tin nhắn', 'viết email'], kbIds: ['1.6'], caseIds: [] },
  // C — KHÁCH HÀNG
  { keywords: ['hiểu nhu cầu khách', 'khách nói không rõ'], kbIds: ['2.1'], caseIds: [] },
  { keywords: ['khách phàn nàn', 'khách giận', 'khách than', 'khách bực'], kbIds: ['2.2', '2.3'], caseIds: ['khach-phan-nan-dung', 'khach-phan-nan-sai'] },
  { keywords: ['khách đòi ngoài', 'ngoài scope', 'ngoài khả năng'], kbIds: ['2.4'], caseIds: ['khach-doi-ngoai-kha-nang'] },
  { keywords: ['nói không với khách', 'từ chối khách'], kbIds: ['2.5'], caseIds: [] },
  { keywords: ['khách im lặng', 'im lặng sau báo giá', 'báo giá xong im', 'khách không rep'], kbIds: ['2.6'], caseIds: ['khach-im-lang-sau-bao-gia'] },
  { keywords: ['khách lần đầu', 'gặp khách', 'build trust', 'tạo niềm tin'], kbIds: ['2.7'], caseIds: [] },
  { keywords: ['giảm giá', 'so đối thủ', 'khách chê đắt', 'chê đắt'], kbIds: ['2.8'], caseIds: ['khach-doi-giam-gia', 'khach-so-doi-thu'] },
  { keywords: ['báo tin xấu', 'báo trễ', 'báo lỗi cho khách', 'trễ deadline khách'], kbIds: ['2.9'], caseIds: ['bao-tin-xau'] },
  { keywords: ['upsell', 'bán thêm', 'bán kèm'], kbIds: ['2.10'], caseIds: [] },
  { keywords: ['khách yêu cầu mâu thuẫn', 'khách khó tính', 'nhanh rẻ tốt'], kbIds: [], caseIds: ['khach-yeu-cau-mau-thuan'] },
  { keywords: ['sếp giao gấp', 'việc gấp', 'giao việc gấp'], kbIds: [], caseIds: ['sep-giao-gap'] },
  // D — DEAL / LƯƠNG
  { keywords: ['tăng lương', 'xin tăng lương'], kbIds: ['4.1'], caseIds: [] },
  { keywords: ['deal lương', 'offer lương', 'thương lượng lương', 'nhận offer'], kbIds: ['4.2'], caseIds: [] },
  { keywords: ['chuẩn bị đàm phán', 'batna', 'phương án dự phòng'], kbIds: ['4.3'], caseIds: [] },
  { keywords: ['lắng nghe trong deal', 'tactical empathy'], kbIds: ['4.4'], caseIds: [] },
  { keywords: ['đọc đối phương', 'khi nào push', 'khi nào lùi'], kbIds: ['4.5'], caseIds: [] },
  { keywords: ['đàm phán bế tắc', 'deal bế tắc'], kbIds: ['4.6'], caseIds: [] },
  { keywords: ['chốt deal', 'closing', 'chốt hợp đồng'], kbIds: ['4.7'], caseIds: [] },
  // E — WIN-WIN
  { keywords: ['win-win', 'win win', 'đàm phán hợp tác'], kbIds: ['3.1'], caseIds: [] },
  { keywords: ['lợi ích thật', 'why đằng sau'], kbIds: ['3.2'], caseIds: [] },
  { keywords: ['phương án cùng lợi', 'expand pie', 'cùng có lợi'], kbIds: ['3.3'], caseIds: [] },
  { keywords: ['đối phương chơi xấu', 'bị ép', 'chơi xấu'], kbIds: ['3.4'], caseIds: [] },
  { keywords: ['yếu thế', 'đàm phán khi yếu'], kbIds: ['3.5'], caseIds: [] },
  { keywords: ['giữ quan hệ sau deal', 'sau deal căng'], kbIds: ['3.6'], caseIds: [] },
  { keywords: ['đàm phán nhiều bên', 'nhiều bên'], kbIds: ['3.7'], caseIds: [] },
  { keywords: ['chia việc', 'chia lợi ích', 'partnership', 'hợp tác chia'], kbIds: ['3.8'], caseIds: [] },
]

/** Trigger bổ sung từ kb-comm-batch2 (body trùng work-comm — chỉ migrate keyword). */
const COMM_BATCH2_EXTRA_RULES: CommIntentRule[] = [
  { keywords: ['khách nói muốn cái này nhưng mình không chắc', 'brief khách không rõ', 'cách hỏi để hiểu khách hơn'], kbIds: ['2.1'], caseIds: [] },
  { keywords: ['khách complain đúng', 'bị khách tức vì mình sai thật', 'xin lỗi khách đúng cách'], kbIds: ['2.2'], caseIds: [] },
  { keywords: ['khách phàn nàn mà mình không có lỗi', 'khách hiểu nhầm rồi tức'], kbIds: ['2.3'], caseIds: [] },
  { keywords: ['khách đòi thêm ngoài hợp đồng', 'nói không với khách mà không awkward'], kbIds: ['2.4'], caseIds: [] },
  { keywords: ['từ chối dự án mới mà không mất mối', 'quá bận không nhận thêm việc', 'cách từ chối khách chuyên nghiệp'], kbIds: ['2.5'], caseIds: [] },
  { keywords: ['gửi báo giá xong im lặng', 'khách chưa rep proposal', 'follow-up khách mà không bị coi là spam'], kbIds: ['2.6'], caseIds: [] },
  { keywords: ['gặp khách lần đầu phải làm gì', 'pitch khách lần đầu'], kbIds: ['2.7'], caseIds: [] },
  { keywords: ['khách so giá với đối thủ rẻ hơn', 'bị ép giảm giá', 'defend giá mà không mất khách'], kbIds: ['2.8'], caseIds: [] },
  { keywords: ['dự án bị trễ phải báo khách', 'có lỗi phải nói với khách', 'thông báo bad news'], kbIds: ['2.9'], caseIds: [] },
  { keywords: ['cách bán thêm cho khách cũ', 'upsell mà không bị ghét', 'đề xuất thêm dịch vụ tự nhiên'], kbIds: ['2.10'], caseIds: [] },
  { keywords: ['cách đàm phán không ai thua', 'bị thua trong đàm phán', 'đàm phán mà giữ được quan hệ'], kbIds: ['3.1'], caseIds: [] },
  { keywords: ['hai bên cứ giữ quan điểm', 'cách thoát bế tắc trong đàm phán'], kbIds: ['3.2'], caseIds: [] },
  { keywords: ['đàm phán bị zero-sum', 'sáng tạo options trong đàm phán'], kbIds: ['3.3'], caseIds: [] },
  { keywords: ['đối tác dùng chiêu trò', 'bị đe dọa trong deal'], kbIds: ['3.4'], caseIds: [] },
  { keywords: ['mình yếu thế hơn trong deal', 'làm sao đàm phán khi không có lợi thế'], kbIds: ['3.5'], caseIds: [] },
  { keywords: ['đàm phán xong mà awkward', 'giữ mối với đối tác sau khi cãi nhau'], kbIds: ['3.6'], caseIds: [] },
  { keywords: ['đàm phán 3 người trở lên', 'làm trung gian giữa các bên'], kbIds: ['3.7'], caseIds: [] },
  { keywords: ['chia lợi ích với partner', 'làm sao chia mà không mất bạn'], kbIds: ['3.8'], caseIds: [] },
]

const ALL_COMM_INTENT_RULES: CommIntentRule[] = [
  ...COMM_INTENT_RULES,
  ...COMM_BATCH2_EXTRA_RULES,
]

// ------------------------------------------------------------
// CÁ NHÂN HÓA THEO TYPE — 16/16 type có tip
// ------------------------------------------------------------
interface TypeCommGroup { types: string[]; tip: string }
export const TYPE_COMM_GROUPS: TypeCommGroup[] = [
  { types: ['INTJ', 'ENTJ'], tip: 'Trước khi gửi phản biện, tự hỏi: câu này GIÚP người ta hay chỉ chứng minh mình đúng?' },
  { types: ['INTP', 'ENTP'], tip: 'Trong đàm phán, đôi khi "đủ tốt" + giữ quan hệ > "tối ưu" + mất thiện chí.' },
  { types: ['INFP', 'INFJ'], tip: 'Dùng cấu trúc nói thẳng có khung để vượt nỗi sợ xung đột, thay vì nuốt vào trong.' },
  { types: ['ENFP', 'ESFP'], tip: 'Trước khi nói "có", dừng 1 nhịp — cam kết được mới gật, kẻo over-commit rồi không giữ lời.' },
  { types: ['ENFJ', 'ESFJ', 'ISFJ'], tip: 'Neo vào GIÁ TRỊ mình tạo ra, không vào nhu cầu cá nhân — đặc biệt khi đòi quyền lợi/tăng lương.' },
  { types: ['ISTP'], tip: 'Nói ra điều mình đang xử lý — im lặng làm người khác đoán sai và thấy xa cách.' },
  {
    types: ['ISTJ'],
    tip: 'Thuyết phục tốt nhất bằng dữ liệu và ví dụ cụ thể — nhưng đặt câu hỏi trước khi đưa ra giải pháp; người nghe cần cảm thấy được hỏi, không phải được chỉ.',
  },
  {
    types: ['ESTJ'],
    tip: 'Nói thẳng và hiệu quả — nhưng trong deal hoặc xung đột, để người kia nói hết trước khi vào giải pháp; một câu "nghe có vẻ khó" đi trước giải pháp đúng thường thắng hơn giải pháp đúng đi một mình.',
  },
  {
    types: ['ESTP'],
    tip: 'Đọc tình huống nhanh và thuyết phục bằng năng lượng thực tế — điểm mạnh đó; nhưng trong deal quan trọng, một lần dừng hỏi "anh/chị muốn gì nhất từ việc này?" thường mở ra nhiều hơn là vào thẳng phương án.',
  },
  {
    types: ['ISFP'],
    tip: 'Đọc cảm xúc người khác tốt — dùng điều đó để chọn đúng thời điểm nói; nhưng điều mình thật sự muốn đề nghị hoặc phản đối cần được nói thành lời, không chỉ nghĩ trong đầu — người kia không đọc được suy nghĩ.',
  },
]

// ------------------------------------------------------------
// KB ENTRIES — body đã distill từ KB gốc
// ------------------------------------------------------------
export const KB_ENTRIES: Record<string, KBEntry> = {
  '1.1': { id:'1.1', topic:'sep', label:'Bất đồng / nói khác ý sếp', body:`Im lặng = phá hoại ngầm (oán giận tích lũy). Xin phép trước khi phản biện, đồng ý điểm chung trước, dùng "em lo ngại điểm X" thay "anh/chị sai", tách ý kiến khỏi con người, im lặng cho sếp phản hồi. Mẫu: "Em đồng ý hướng X, em chỉ lo điểm Y — anh/chị đã tính đến chưa ạ?"` },
  '1.2': { id:'1.2', topic:'sep', label:'Xin nghỉ phép / nghỉ việc', body:`Đừng "xin phép" — thông báo lịch kèm giải pháp bàn giao; sếp chỉ care công việc có bị ảnh hưởng không. Nghỉ việc: nói trực tiếp, cảm ơn trước, lý do ngắn-tích cực, cam kết bàn giao. Mẫu: "Em thông báo nghỉ ngày X, việc Y đã bàn giao cho Z."` },
  '1.3': { id:'1.3', topic:'dong_nghiep', label:'Từ chối việc / nói không', body:`"Không" rõ ràng tốt hơn "có" nửa vời (có mà không làm = phản bội lòng tin). Acknowledge → nói rõ giới hạn (việc cụ thể đang làm) → đưa alternative. Mẫu: "Tuần này mình đang close X, để sau khi bớt bận mình giúp được." Tránh "được để mình xem" rồi quên.` },
  '1.4': { id:'1.4', topic:'dong_nghiep', label:'Góp ý cho đồng nghiệp', framework:'SBI', body:`Tách hành vi khỏi con người: tình huống cụ thể → hành vi quan sát (fact, không phán xét) → tác động → mời họ phản hồi. Riêng tư, không trước team. Mẫu: "Họp hôm qua khi bạn ngắt lời 2 lần, mình thấy bạn ấy không muốn share thêm — bạn nghĩ sao?" Tránh "bạn luôn/không bao giờ".` },
  '1.5': { id:'1.5', topic:'sep', label:'Nhận feedback / phê bình', body:`Phòng thủ là phản xạ — chủ động hạ xuống. Dừng 3 giây → cảm ơn → hỏi ví dụ cụ thể (vague→actionable) → tách sự thật khỏi câu chuyện → chọn 1 điều để sửa. Mẫu: "Em cảm ơn — anh/chị cho em ví dụ cụ thể em nên làm khác không?" Tránh "nhưng..." ngay, tránh đồng ý hết rồi không đổi.` },
  '1.6': { id:'1.6', topic:'dong_nghiep', label:'Email / tin nhắn công việc', body:`Email thiếu tone → người đọc hay hiểu tiêu cực hơn ý người viết; khi nghi ngờ viết ấm hơn. Subject = action+topic, mở bằng context không bằng yêu cầu, 1 email 1 mục đích, kết bằng action item rõ. Tránh "theo như em đã nói trước đó" (passive-aggressive), tránh CC sếp để dọa ngầm.` },
  '1.7': { id:'1.7', topic:'dong_nghiep', label:'Họp / phát biểu', body:`Họp tốt = mục đích rõ trước + action items rõ sau. Nói cụ thể ("đề xuất X vì dữ liệu") không chung chung; bất đồng nói trong họp không sau họp. Chốt: "Action: người phụ trách làm việc đó, deadline cụ thể — đúng không ạ?"` },
  '1.8': { id:'1.8', topic:'dong_nghiep', label:'Xung đột đồng nghiệp', body:`3 lớp xung đột: sự thật / cảm xúc / self-image. Nói riêng (giữ thể diện) → bắt đầu bằng tò mò không buộc tội → tách fact khỏi story ("mình thấy sự việc cụ thể, mình đang hiểu là cách mình đang hiểu — giúp mình hiểu đúng hơn?") → acknowledge cảm xúc → tìm mục tiêu chung. Tránh lôi chuyện cũ, tránh nhờ sếp xử trước khi nói thẳng.` },
  '2.1': { id:'2.1', topic:'khach_hang', label:'Hiểu nhu cầu khách', body:`Khách nói GIẢI PHÁP họ muốn, không nói VẤN ĐỀ thật ("cần website mới" thực ra "không đủ lead"). Nghe xong pause → hỏi "điều gì khiến anh/chị cần X" → paraphrase nhu cầu thật → để khách xác nhận trước khi đề xuất. Tránh nhận brief làm ngay.` },
  '2.2': { id:'2.2', topic:'khach_hang', label:'Khách phàn nàn (khách đúng)', body:`Khách đúng + đang giận = validate trước, fix sau. Để khách nói hết không ngắt → acknowledge → nhận trách nhiệm HÀNH ĐỘNG rõ (không đổ lỗi team) → action plan cụ thể + thời gian → follow-up đúng hẹn. Tránh mọi câu mở đầu "nhưng...". VN: nhận lỗi hành động chứ không nhận lỗi năng lực.` },
  '2.3': { id:'2.3', topic:'khach_hang', label:'Khách phàn nàn (khách sai)', body:`Khách sai về sự thật nhưng đúng về cảm xúc. Validate cảm xúc trước → đưa sự thật nhẹ bằng câu hỏi ("để mình xem có bỏ sót gì") không phải "anh/chị nhầm" → tìm hạt nhân đúng → redirect sang giải pháp. Tránh gửi evidence để chứng minh khách sai (= humiliate).` },
  '2.4': { id:'2.4', topic:'khach_hang', label:'Khách đòi ngoài scope', body:`"Không" phải kèm "Có cho thứ khác" — không bao giờ "không" trần. Acknowledge → giải thích ngắn tại sao không → đưa alternative ngay → để khách chọn. Mẫu: "X ngoài scope hiện tại, nhưng em có thể làm Y, hoặc bàn X như một phase riêng — anh/chị thấy hướng nào hợp hơn?"` },
  '2.5': { id:'2.5', topic:'khach_hang', label:'Nói không với khách', body:`"Có" với mọi thứ = under-deliver = mất trust. Cảm ơn → lý do ngắn trung thực → alternative/referral → mở cửa tương lai. Tránh ghost (tệ nhất ở VN), tránh lý do dài dòng biện minh, tránh "không" mà không alternative.` },
  '2.6': { id:'2.6', topic:'khach_hang', label:'Khách im lặng sau báo giá', body:`Im lặng thường là "đang cân nhắc/so sánh", không phải "không". Follow-up = thêm GIÁ TRỊ không thêm áp lực. Cadence: ngày 2-3 gửi value, ngày 5-7 check-in offer giải đáp, ngày 10-14 nudge time-bound nhẹ. Tránh "anh/chị quyết định chưa", tránh giảm giá tự phát, tránh spam mỗi ngày.` },
  '2.7': { id:'2.7', topic:'khach_hang', label:'Build trust lần đầu', body:`Trust = Warmth (có quan tâm không) + Competence — warmth trước. Hỏi trước nói sau, nhắc tên khách, mirror energy, tìm điểm chung thật. Rule 80/20: khách nói 80%. Tránh pitch ngay câu đầu, tránh giả tạo điểm chung.` },
  '2.8': { id:'2.8', topic:'khach_hang', label:'Khách đòi giảm giá / so đối thủ', body:`Đừng bao giờ giảm giá mà không đổi lại gì — giảm kèm giảm scope. Hỏi "đang so với bên nào, yếu tố nào quan trọng nhất" → reframe giá trị → trade-off nếu phải giảm. Mẫu: "Mình giữ giá vì lý do; nếu ngân sách là X mình điều chỉnh scope bỏ phần Z." Tránh giảm ngay (signal giá inflated), tránh nói xấu đối thủ.` },
  '2.9': { id:'2.9', topic:'khach_hang', label:'Báo tin xấu cho khách', body:`Khách phải nghe tin xấu TỪ BẠN trước, không tự phát hiện. Báo sớm nhất có thể → sự thật trước lý do sau → nhận trách nhiệm → giải pháp kèm theo → hỏi impact. Mẫu: "Em cần báo sớm: phần X trễ thời gian do lý do ngắn. Em đã xử lý, xong trước hạn. Anh/chị cần em ưu tiên phần nào?" Tránh báo phút cuối, che giấu, blame team.` },
  '2.10': { id:'2.10', topic:'khach_hang', label:'Upsell / bán thêm', body:`Upsell tốt = giải quyết vấn đề khách CHƯA BIẾT mình có. Cho giá trị/insight trước MIỄN PHÍ → connect insight với solution → không push → timing SAU khi đã deliver tốt phần hiện tại. Mẫu: "Khi làm dự án em nhận thấy điều mình để ý — mình có thể address với giải pháp đó nếu anh/chị quan tâm." Tránh "anh/chị nên mua thêm" (salesman).` },
  '3.1': { id:'3.1', topic:'win_win', label:'Win-win / tách người khỏi vấn đề', body:`CỨNG với vấn đề, MỀM với con người. 4 nguyên lý: tách người khỏi vấn đề, tập trung lợi ích không lập trường, tạo phương án cùng lợi, dùng tiêu chí khách quan. Mẫu: "Mình cùng muốn mục tiêu chung, bất đồng ở vấn đề — cùng giải quyết vấn đề mà không ảnh hưởng quan hệ." Tránh "split the difference" (= compromise không phải win-win).` },
  '3.2': { id:'3.2', topic:'win_win', label:'Lợi ích vs lập trường', body:`Position = cái họ đòi; Interest = tại sao họ đòi (mỗi position có nhiều interest, nhiều cách thỏa mãn). Hỏi "điều gì đằng sau yêu cầu này quan trọng nhất với anh/chị", "nếu không được X thì lo nhất điều gì". Tránh tranh luận về position (ai cũng đúng từ góc mình).` },
  '3.3': { id:'3.3', topic:'win_win', label:'Tạo phương án cùng lợi (expand pie)', body:`Làm bánh TO HƠN trước khi chia, không chia 50/50. Brainstorm options trước khi đánh giá (tách sáng tạo khỏi đánh giá) → tìm thứ quý với mình rẻ với họ → package deals → "nếu mình thêm X, anh/chị flexible về Y không?" Tránh đánh giá option ngay khi vừa đưa ra.` },
  '3.4': { id:'3.4', topic:'win_win', label:'Đối phương chơi xấu', body:`3 trò: áp lực cảm xúc, ultimatum, nói dối. Nhận diện (không vào game) → gọi tên nhẹ → reframe về interest → có BATNA mạnh để sẵn sàng bước đi. Mẫu: "Mình thấy đang đi vào territory khó productive — cùng step back về mục tiêu chung nhé." Tránh chơi xấu ngược lại, tránh nhượng bộ vì áp lực.` },
  '3.5': { id:'3.5', topic:'win_win', label:'Đàm phán khi yếu thế', body:`Quyền lực = BATNA + thông tin + thời gian; yếu 1 thì bù 2 cái kia. Cải thiện BATNA trước khi vào bàn, thu thập thông tin đối phương, đừng tiết lộ thế yếu, dùng tiêu chí khách quan (data thị trường) làm vũ khí mạnh nhất. Tránh bluff BATNA giả, tránh nhượng hết vì "biết mình yếu".` },
  '3.6': { id:'3.6', topic:'win_win', label:'Giữ quan hệ sau deal căng', body:`Deal kết thúc nhưng quan hệ thì không (VN: quan hệ > contract). Kết deal bằng tổng kết win của CẢ HAI → follow-up 1 tuần sau (hỏi thăm, không business) → giữ đúng cam kết. Tránh ghost sau chốt, tránh "ăn mừng" khi đối phương nhượng nhiều, tránh đổi điều kiện sau bắt tay.` },
  '3.7': { id:'3.7', topic:'win_win', label:'Đàm phán nhiều bên', body:`Phức tạp vì coalition + nhiều interest. Map interest mỗi bên trước → tạo 1 bản nháp chung, mọi người comment rồi iterate → tìm bridging interests → tránh vote majority (bên thua sabotage). Tránh side deals (đàm phán riêng bỏ bên khác = mất trust).` },
  '3.8': { id:'3.8', topic:'win_win', label:'Chia việc / lợi ích partnership', body:`Chia tốt = tiêu chí khách quan + minh bạch ("tôi chia, anh chọn"). Thống nhất tiêu chí TRƯỚC khi chia → transparent mọi con số → trial period → exit clause TRƯỚC khi có vấn đề. Tránh "tin nhau rồi tính" (recipe for disaster), tránh chia 50/50 tự động.` },
  '4.1': { id:'4.1', topic:'deal', label:'Xin tăng lương', body:`Neo vào GIÁ TRỊ tạo ra, không vào nhu cầu cá nhân — sếp tăng vì mất bạn tốn hơn giữ. Chuẩn bị: thành quả đo được (con số) + mức thị trường + 1 con số cụ thể. Dẫn bằng thành quả → đưa số → im lặng. Mẫu: "6 tháng qua em đã đạt kết quả cụ thể, thị trường mức tương đương, em mong con số phản ánh đúng đóng góp." Tránh "em cần vì chi phí sống", tránh so sánh đồng nghiệp, tránh đưa khoảng.` },
  '4.2': { id:'4.2', topic:'deal', label:'Deal lương khi nhận offer', framework:'Ackerman', body:`Bắt đầu thấp hơn target, tăng dần tỷ lệ giảm dần (65→85→95→100%), số lẻ cuối, kèm 1 non-monetary item cuối. VN: kết hợp structure + sự ấm/thiện chí, đừng quá "technique" mất thiện chí. Khi HR offer: dùng câu hỏi ("mức này đã tính đến kinh nghiệm chưa ạ?") + framing hợp tác "mình tìm cách phù hợp cho cả hai".` },
  '4.3': { id:'4.3', topic:'deal', label:'Chuẩn bị trước đàm phán', framework:'BATNA', body:`Quyền lực = khả năng BƯỚC ĐI. Xác định BATNA (option tốt nhất nếu deal fail) cụ thể trước khi vào bàn → research BATNA đối phương → set anchor (số đưa đầu tiên định khung) → xác định giới hạn cứng (dưới mức nào thì bước đi). Tránh vào đàm phán không BATNA, tránh bluff BATNA giả.` },
  '4.4': { id:'4.4', topic:'deal', label:'Lắng nghe trong deal', framework:'Tactical Empathy', body:`Empathy = cho đối phương biết bạn HIỂU (không phải đồng ý) → họ hạ defense → reveal info. 5 công cụ: mirroring (lặp 1-3 từ cuối rồi im), labeling ("có vẻ anh/chị lo về X?"), calibrated question (How/What thay Why), im lặng 4 giây, hướng tới "đúng vậy!". VN: labeling + mirroring rất hợp, tone mềm hơn.` },
  '4.5': { id:'4.5', topic:'deal', label:'Đọc đối phương / push hay lùi', body:`3 kiểu: Analyst (cần data, đừng rush), Accommodator (nói OK nhưng chưa chắc cam kết — confirm cụ thể), Assertive (muốn được nghe trước, dùng mirroring). Tín hiệu LÙI: lặp lập trường y hệt, tone cứng lên, "để tôi suy nghĩ thêm". Tín hiệu PUSH: hỏi chi tiết triển khai, "nếu mình... thì sao", lean forward.` },
  '4.6': { id:'4.6', topic:'deal', label:'Đàm phán bế tắc', framework:'Negotiation Jujitsu', body:`Đối phương cứng lập trường → đừng đẩy ngược → redirect từ position sang interest. Không phản bác position mà hỏi "tại sao điều này quan trọng" → im lặng 5-7 giây (họ tự giải thích) → reframe về mục tiêu chung → "what if" đưa option mới. Mẫu: "Mình chưa nói không — chỉ chưa tìm ra cách cả hai đều được. Cùng nghĩ thêm nhé?"` },
  '4.7': { id:'4.7', topic:'deal', label:'Chốt deal / closing', body:`Deal tốt = cả hai thấy đã "thắng". Không push closing — guide họ tự thấy deal tốt. Tóm tắt điểm đã đồng ý → hỏi commitment cụ thể ("bước tiếp theo là gì", "mình cần làm gì để finalize") → confirm bằng văn bản ngay. Tránh push khi chưa sẵn sàng, tránh chỉ verbal (VN: lời nói gió bay).` },
}

// ------------------------------------------------------------
// CASES — body distill (cách tốt hơn + câu mẫu VN)
// ------------------------------------------------------------
export const COMM_CASES: Record<string, CommCase> = {
  'sep-giao-gap': { id:'sep-giao-gap', label:'Sếp giao việc gấp', body:`Làm rõ mức gấp THẬT + đưa lựa chọn thay vì yes/no. Mẫu: "Dạ em làm được, nhưng tối nay em có việc — em làm sáng sớm mai xong trước 9h được không, hay nhất thiết phải tối nay ạ?" Nếu sếp nói nhất thiết tối nay → đó là thông tin về môi trường, không chỉ tình huống đơn lẻ.` },
  'dong-nghiep-nhan-cong': { id:'dong-nghiep-nhan-cong', label:'Đồng nghiệp nhận công lao', body:`Không đính chính kiểu tranh luận — THÊM thông tin tự nhiên. Trong họp bổ sung chi tiết cụ thể mình làm dưới dạng làm rõ: "Đúng đó anh/chị — phần X em làm theo hướng này vì lý do, nên mới ra kết quả vậy." Tạo thói quen ghi lại đóng góp trước họp (email tóm tắt) để có dấu vết. Im lặng không phải khiêm tốn, là tự làm mình vô hình.` },
  'bat-dong-sep': { id:'bat-dong-sep', label:'Bất đồng với sếp', body:`Hỏi làm rõ trước khi nêu ý kiến khác — framing "em lo điểm này" không "cách anh/chị sai". Mẫu: "Em hiểu hướng này. Em chỉ lo một điểm — vấn đề cụ thể. Anh/chị đã tính đến chưa, hay em đang thiếu thông tin gì không ạ?" Câu "đã tính đến chưa" để cửa mở.` },
  'tu-choi-viec': { id:'tu-choi-viec', label:'Từ chối việc ngoài phận sự', body:`Từ chối VIỆC không từ chối NGƯỜI, lý do thật không xã giao, kèm hướng khác. Mẫu: "Em muốn giúp nhưng tuần này kín lịch với việc đang làm rồi, nhận thêm em lo không làm tốt. Anh/chị thử hỏi người phù hợp xem, hoặc tuần sau được thì em nhận." Từ chối 1 lần đúng cách dễ hơn nhận mãi rồi bùng.` },
  'bi-gop-y-gay-gat': { id:'bi-gop-y-gay-gat', label:'Bị góp ý gay gắt', body:`Lúc đó: bình tĩnh, nhận phần đúng, không bào chữa dài ("Dạ em ghi nhận, em xem lại"). Sau, khi không có người khác, nói riêng về CÁCH họ phản hồi — tách nội dung (lỗi) khỏi hình thức (cách nói): "Lần trước anh/chị góp ý trước mọi người em thấy khó xử; em hiểu anh/chị chỉ ra điểm cần sửa, nhưng lần sau nói riêng thì em tiếp thu tốt hơn." (Lưu ý: vài môi trường không nói riêng được.)` },
  'dong-nghiep-dun-viec': { id:'dong-nghiep-dun-viec', label:'Đồng nghiệp đùn việc', body:`Ngắt pattern sớm, không làm to chuyện — không nhận việc vô thức, từ chối có lý do cụ thể, vẫn giữ sẵn sàng giúp phần thật sự cần. Mẫu: "Lần này mình đang kín rồi, bạn thử tự làm trước xem — kẹt chỗ nào cụ thể thì mình xem giúp chỗ đó." Vẫn tiếp tục sau vài lần → nói thẳng hơn hoặc đưa sếp vào.` },
  'xin-nghi-phep': { id:'xin-nghi-phep', label:'Xin nghỉ phép', body:`` },
  'xin-nghi-luc-ban': { id:'xin-nghi-luc-ban', label:'Xin nghỉ phép lúc team bận', body:`Cách xin quyết định người ta nhớ gì về bạn. Chuẩn bị ai cover gì trước, xin sớm không sát ngày, đưa giải pháp cùng lúc với xin. Mẫu: "Anh/chị ơi, em muốn xin nghỉ hôm đó — em biết đang bận nên em đã xử lý phần gấp / nhờ người phù hợp cover phần còn lại. Anh/chị thấy ổn không, hay cần em điều chỉnh gì ạ?" Để công việc vẫn chạy = lần sau xin dễ hơn.` },
  'khach-doi-giam-gia': { id:'khach-doi-giam-gia', label:'Khách đòi giảm giá', body:`Tách "giảm vô điều kiện" khỏi "điều chỉnh scope cho hợp ngân sách". Hỏi ngân sách thật, đề xuất gói nhỏ hơn. Mẫu: "Bên mình giữ mức này vì chất lượng, thời gian và cam kết. Nhưng nếu ngân sách bạn là X, mình điều chỉnh phạm vi còn Y và bỏ phần Z — bạn thấy phù hợp hơn không?" Giảm kèm điều kiện giữ được giá trị + cho khách cảm giác chủ động chọn.` },
  'bao-tin-xau': { id:'bao-tin-xau', label:'Báo tin xấu cho khách', body:`Báo sớm, ngắn, kèm giải pháp — dù chưa hoàn chỉnh. Khách chịu sự cố tốt hơn chịu im lặng. Thứ tự: nhận → giải thích ngắn → bước tiếp theo → hỏi ổn không. Mẫu: "Chào bạn, mình cần báo sớm: tình huống do lý do thật ngắn. Hiện mình đang xử lý, dự kiến xong trước thời gian. Bạn cần điều chỉnh gì từ phía bạn không?"` },
  'khach-so-doi-thu': { id:'khach-so-doi-thu', label:'Khách so đối thủ', body:`Không cạnh tranh trực tiếp — làm rõ hai bên có thật sự bán thứ giống nhau không (thường không). Đặt câu hỏi để khách tự nhận khác biệt. Mẫu: "Bên X giá đó mình không ngạc nhiên. Bạn đã hỏi họ cụ thể làm gì trong gói chưa? Bên mình khác biệt cụ thể. Cần đúng những thứ đó thì mình nói tiếp; còn không cần thì bên kia có thể là lựa chọn tốt hơn cho bạn." Câu cuối táo bạo nhưng khách hay quay lại.` },
  'khach-phan-nan-dung': { id:'khach-phan-nan-dung', label:'Khách phàn nàn - khách đúng', body:`Nghe hết → xác nhận → nhận trách nhiệm phần mình sai (không hơn không kém) → giải pháp. Không đảo thứ tự. Mẫu: "Mình nghe bạn rồi, hiểu tại sao bạn bực — vấn đề không nên xảy ra. Đây là lỗi từ phía mình. Giờ mình xử lý bằng cách giải pháp cụ thể — bạn thấy được không?" "Đây là lỗi từ phía mình" khó nói nhưng hạ nhiệt nhanh nhất.` },
  'khach-phan-nan-sai': { id:'khach-phan-nan-sai', label:'Khách phàn nàn - khách sai', body:`Xác nhận cảm xúc trước, làm rõ sự thật sau bằng CÂU HỎI không khẳng định. Không phủ nhận cảm giác, cũng không nhận lỗi khi không có. Mẫu: "Mình hiểu bạn không hài lòng — điều đó quan trọng với mình. Theo mình nhớ cam kết ban đầu là X. Bạn kể lại từ góc của bạn được không, để mình xem mình bỏ sót gì?" Nếu nghe xong họ vẫn sai, lúc đó mới nói thẳng — không khí đã khác.` },
  'khach-doi-ngoai-kha-nang': { id:'khach-doi-ngoai-kha-nang', label:'Khách đòi thứ ngoài khả năng', body:`Nói thẳng không thể + giải thích ngắn tại sao + đưa thứ gần nhất làm được; hỏi mục tiêu thật. Mẫu: "Cái này bên mình không làm được vì lý do thật. Nhưng nếu mục tiêu bạn là vấn đề thật, mình có thể làm phương án thay thế — không y chang nhưng giải quyết phần X. Bạn muốn mình giải thích thêm không?" Không có phương án → giới thiệu nơi khác (xây uy tín hơn hứa rồi thất bại).` },
  'khach-im-lang-sau-bao-gia': { id:'khach-im-lang-sau-bao-gia', label:'Khách im lặng sau báo giá', body:`Follow-up là bình thường — vấn đề là CÁCH. Câu hỏi MỞ + thêm giá trị, không hỏi "đọc chưa". Mẫu: "Chào bạn, mình gửi báo giá hôm trước — muốn check xem bạn có câu hỏi gì không, phần nào chưa rõ mình giải thích thêm. Bạn đang cân nhắc điểm gì nhất vậy?" Giả định họ đang cân nhắc (tích cực) thay vì hỏi "có mua không" (áp lực) → biết được vướng mắc thật.` },
  'khach-yeu-cau-mau-thuan': { id:'khach-yeu-cau-mau-thuan', label:'Khách yêu cầu mâu thuẫn', body:`Không phải việc của bạn giải quyết mâu thuẫn — làm khách THẤY đánh đổi và tự chọn. Trình bày trade-off rõ, hỏi ưu tiên. Mẫu (nhanh/rẻ/tốt): "Ba thứ này mình không làm được cùng lúc — bạn ưu tiên thứ tự nào? Nhanh+tốt thì giá cao hơn; nhanh+rẻ thì phần X đơn giản hơn." Mẫu (đổi yêu cầu sau chốt): "Thay đổi này ảnh hưởng thời gian hoặc chi phí cụ thể là X — bạn xác nhận điều chỉnh, hay giữ bản gốc?"` },
}

// ------------------------------------------------------------
// LOGIC
// ------------------------------------------------------------
const norm = (s: string): string => s.toLowerCase().trim()

/** Detect comm-intent. Trả kbIds + caseIds khớp, hoặc null nếu không phải comm. */
export function detectCommIntent(message: string): { kbIds: string[]; caseIds: string[] } | null {
  const m = norm(message)
  const kbIds = new Set<string>(), caseIds = new Set<string>()
  for (const rule of ALL_COMM_INTENT_RULES) {
    if (rule.keywords.some(k => m.includes(norm(k)))) {
      rule.kbIds.forEach(id => kbIds.add(id))
      rule.caseIds.forEach(id => caseIds.add(id))
    }
  }
  if (kbIds.size === 0 && caseIds.size === 0) return null
  return { kbIds: [...kbIds], caseIds: [...caseIds] }
}

/** Tip giao tiếp riêng theo type. null nếu type không có trong TYPE_COMM_GROUPS. */
export function getTypeCommTip(mbtiType: string): string | null {
  const t = mbtiType.toUpperCase().slice(0, 4)
  return TYPE_COMM_GROUPS.find(g => g.types.includes(t))?.tip ?? null
}

const ALL_MBTI_TYPES = [
  'INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISTP', 'ISFJ', 'ISFP',
  'ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ESTJ', 'ESTP', 'ESFJ', 'ESFP',
] as const

/** Dev/eval: đủ 16/16 type tip. */
export function countTypeCommTips(): { covered: number; missing: string[] } {
  const missing = ALL_MBTI_TYPES.filter((t) => getTypeCommTip(t) === null)
  return { covered: ALL_MBTI_TYPES.length - missing.length, missing: [...missing] }
}

/**
 * Build context chèn vào system prompt (chỉ khi có comm-intent). LOOKUP: chỉ entry+case khớp.
 * Trả null nếu không phải comm-intent → caller bỏ qua, trả lời thường.
 */
export function buildCommContext(message: string, mbtiType?: string): string | null {
  const hit = detectCommIntent(message)
  if (!hit) return null
  const parts: string[] = ['[KB NỘI BỘ giao tiếp/deal — dùng để trả lời ĐÚNG, KHÔNG đọc nguyên văn, KHÔNG nói tên framework cho user]']
  for (const id of hit.kbIds) {
    const e = KB_ENTRIES[id]
    if (e?.body) parts.push(`• ${e.label}: ${e.body}`)
  }
  for (const id of hit.caseIds) {
    const c = COMM_CASES[id]
    if (c?.body) parts.push(`• Tình huống mẫu — ${c.label}: ${c.body}`)
  }
  if (parts.length === 1) return null // chỉ có header, không entry/case nào có body
  if (mbtiType) {
    const tip = getTypeCommTip(mbtiType)
    if (tip) parts.push(`[Tip riêng cho ${mbtiType.toUpperCase()}]: ${tip}`)
  }
  parts.push('[QUAN TRỌNG: KB trên là gợi ý NỘI BỘ — chỉ giữ Ý CHÍNH, diễn đạt lại theo GIỌNG [VOICE]. KHÔNG copy câu mẫu/email mẫu nguyên văn. Tip type: lồng tự nhiên. Delivery (mở đầu, độ sắc) do VOICE quyết — KB chỉ quyết nội dung lời khuyên.]')
  return parts.join('\n')
}
