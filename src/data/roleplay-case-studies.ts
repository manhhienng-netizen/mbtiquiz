// roleplay-case-studies.ts
// TNCB Work — Role Play Game Case Study Pool
// 16/06/2026 · Master PM
// 18 cases: 6 NV + 4 MG + 4 KH + 4 DT + 5 VT (VAI_TRO_CASES)
// Usage: getCasesByRole(role) · getRandomCases(role, n) · recordCaseSeen(id)

import { VAI_TRO_CASES } from './roleplay-cases-vai-tro'

export type CaseRole = 'NV' | 'MG' | 'KH' | 'DT' | 'VT' // NV/MG nội bộ · KH khách hàng · DT đối tác · VT chuyển vai trò

export type MbtiGroup = 'ST' | 'SF' | 'NF' | 'NT'

export interface Choice {
  id: 'A' | 'B' | 'C'
  label: string        // label ngắn, vd "Thương lượng scope"
  action: string       // câu nói/hành động cụ thể
}

export interface Consequence {
  choiceId: 'A' | 'B' | 'C'
  immediate: string    // phản ứng ngay lúc đó
  later: string        // hậu quả về sau (1 câu)
}

export interface TypeFeedback {
  group: MbtiGroup
  text: string         // 3-4 câu feedback cho nhóm này
}

export interface RolePlayCase {
  id: string                    // vd "NV-01"
  role: CaseRole
  title: string
  tags: string[]                // vd ["deadline", "hierarchy", "Zalo"]
  hook: string
  setup: string
  choices: Choice[]
  consequences: Consequence[]
  typeFeedback: TypeFeedback[]
  mirrorMoment: string
}

// ─────────────────────────────────────────────
// CASE POOL
// ─────────────────────────────────────────────

export const ROLEPLAY_CASES: RolePlayCase[] = [

  // ══════════════════════════════
  // GÓC NHÂN VIÊN (NV)
  // ══════════════════════════════

  {
    id: 'NV-01',
    role: 'NV',
    title: 'Task Cuối Tuần',
    tags: ['deadline', 'hierarchy', 'Zalo', 'overtime'],
    hook: `Anh Minh gõ vào Zalo lúc 5:47 chiều thứ Sáu: "Em ơi, sếp tổng cần báo cáo Q3 sáng thứ Hai. Anh cần em support phần số liệu nhé. Em có thể không?"\n\nDấu chấm hỏi đó không thật sự là câu hỏi.`,
    setup: `Anh Minh là quản lý trực tiếp của bạn — người hay nói "anh em mình flexible" nhưng chưa bao giờ tự làm thêm cuối tuần. Báo cáo này bạn biết sẽ mất ít nhất 6-8 tiếng. Bạn có kế hoạch với gia đình từ tuần trước.\n\nNếu nhận, bạn mất cuối tuần. Nếu từ chối, bạn không biết anh Minh sẽ nhớ điều này bao lâu.\n\nBạn trả lời thế nào?`,
    choices: [
      {
        id: 'A',
        label: 'Thương lượng scope',
        action: '"Anh ơi, em có thể làm phần revenue và cost đến 9 giờ tối nay. Phần còn lại em cần đến sáng thứ Hai sớm. Anh xem được không?"',
      },
      {
        id: 'B',
        label: 'Nhận nhưng set boundary',
        action: '"Dạ em nhận anh ơi. Anh có thể gửi em outline và data source trước 7 giờ tối không để em sắp xếp?"',
      },
      {
        id: 'C',
        label: 'Im lặng làm',
        action: 'Nhắn "Dạ anh" rồi tắt máy, cố làm hết trong đêm mà không nói thêm gì.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Anh Minh im lặng 10 phút rồi nhắn "Ừ được, em làm phần đó trước đi." Không nhiệt tình, nhưng không phàn nàn.',
        later: 'Báo cáo nộp đúng hạn. Anh Minh bắt đầu estimate workload thực tế hơn — nhưng cũng thận trọng hơn khi "nhờ" bạn những lần sau.',
      },
      {
        choiceId: 'B',
        immediate: 'Anh Minh gửi data lúc 8 giờ tối, kèm thêm 3 yêu cầu mới "nhỏ thôi". Bạn làm đến 1 giờ sáng.',
        later: 'Sếp tổng khen báo cáo trong meeting. Anh Minh forward lời khen nhưng không nhắc bạn. Pattern cuối tuần này tái diễn thêm 2 lần trong quý.',
      },
      {
        choiceId: 'C',
        immediate: 'Anh Minh không hỏi thêm gì — assume là ổn.',
        later: 'Bạn nộp đúng hạn nhưng chất lượng bị ảnh hưởng vì vội. Lần sau anh Minh bắt đầu cc thêm người vào email khi giao việc gấp cho bạn.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — negotiate scope ngay, rõ ràng, hiệu quả. Điều cần lưu ý: anh Minh có thể đọc đây là "em không muốn làm" thay vì "em đang manage workload." Thêm 1 câu acknowledge urgency trước khi negotiate sẽ giảm friction đáng kể.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — nhận để giữ quan hệ, nhưng tìm cách làm nó manageable. Điều cần lưu ý: set boundary qua "anh gửi data trước 7 giờ" là khéo, nhưng khi boundary đó bị breach, bạn có nói gì không? Lần không nói đó mới là lần quan trọng.',
      },
      {
        group: 'NF',
        text: 'Bạn có thể chọn B hoặc C — vừa muốn giúp vừa cảm thấy không công bằng. Điều cần lưu ý: cảm giác đó đúng. Nhưng im lặng làm (C) không giải quyết nó — chỉ tích lại thành resentment cho lần sau.',
      },
      {
        group: 'NT',
        text: 'Bạn phân tích: đây là pattern hay exception? Nếu là pattern, A là cách phá pattern hiệu quả nhất. Điều cần lưu ý: đừng để việc tìm "optimal solution" làm bạn trả lời quá muộn — anh Minh đang chờ ngay lúc này.',
      },
    ],
    mirrorMoment: 'Lần gần nhất bạn nhận việc mà biết mình sẽ hối hận — bạn đã nói gì, hay im lặng? Kết quả thế nào?',
  },

  {
    id: 'NV-02',
    role: 'NV',
    title: 'Đồng Nghiệp Nhận Công',
    tags: ['credit', 'face-saving', 'meeting', 'fairness'],
    hook: `Dự án pitch cho client tuần trước — bạn làm 70% deck, Khoa làm phần intro và present. Hôm nay trong cuộc họp team, sếp nói: "Cảm ơn Khoa đã làm deck rất chất lượng nhé!"\n\nKhoa không đính chính. Nhìn thẳng về phía trước.`,
    setup: `Bạn ngồi ngay cạnh Khoa. Cả team đang nhìn. Sếp đang chờ Khoa phản hồi.\n\nNếu bạn lên tiếng ngay — Khoa mất mặt trước mặt mọi người. Bạn cũng có thể bị nhìn là "nhỏ mọn". Nếu bạn im lặng — credit đã được set, khó sửa lại.\n\nBạn làm gì?`,
    choices: [
      {
        id: 'A',
        label: 'Lên tiếng ngay, nhẹ nhàng',
        action: '"Dạ anh/chị, em cũng có đóng góp một phần vào deck nếu anh/chị muốn biết thêm."',
      },
      {
        id: 'B',
        label: 'Gặp Khoa riêng sau',
        action: 'Để cuộc họp qua, sau đó nói với Khoa 1-1: "Mình cần clarify với sếp về ai đã làm phần nào nhé."',
      },
      {
        id: 'C',
        label: 'Escalate với sếp riêng',
        action: 'Sau họp, xin gặp sếp và kể contributions thật sự của bạn — không mention Khoa.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Khoa đỏ mặt. Sếp nói "Ồ, hai bạn cùng làm à — hay quá." Awkward nhẹ, rồi qua.',
        later: 'Sếp nhớ bạn làm phần lớn. Nhưng Khoa cũng nhớ — và bắt đầu né làm việc chung với bạn sau này.',
      },
      {
        choiceId: 'B',
        immediate: 'Không gì xảy ra. Cuộc họp kết thúc bình thường.',
        later: 'Gặp Khoa — kết quả phụ thuộc vào Khoa. Nếu Khoa tự đính chính với sếp → tốt. Nếu không → bạn vẫn phải deal với sếp sau.',
      },
      {
        choiceId: 'C',
        immediate: 'Không gì xảy ra trong cuộc họp.',
        later: 'Sếp biết sự thật nhưng cũng nhận ra bạn không lên tiếng lúc đó — có thể wonder tại sao.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A hoặc C — facts cần được correct. Điều cần lưu ý: A đúng nhưng tone quan trọng. "Em cũng có đóng góp" (invite) khác với "Khoa không làm phần lớn" (accuse). Cái trước giữ được dignity cho cả hai.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — không muốn Khoa mất mặt công khai, resolve private. Điều cần lưu ý: B work, nhưng bạn cần chủ động gặp Khoa ngay sau họp — không phải chờ xem Khoa có tự đính chính không.',
      },
      {
        group: 'NF',
        text: 'Bạn cảm thấy tình huống không công bằng nhưng cũng không muốn tạo drama. Điều cần lưu ý: câu hỏi thực tế là bạn cần gì — credit với sếp, hay clear communication với Khoa? Câu trả lời đó sẽ tell bạn nên làm gì tiếp.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là information gap — sếp không có đủ thông tin. A là cách correct nhanh nhất. Điều cần lưu ý: correct information ≠ attack Khoa. Framing là "thêm thông tin" không phải "đính chính" sẽ giảm defensive response của cả phòng.',
      },
    ],
    mirrorMoment: 'Bạn đã từng để người khác nhận credit của mình mà không nói gì chưa? Cảm giác sau đó thế nào?',
  },

  {
    id: 'NV-03',
    role: 'NV',
    title: 'Bị Phê Bình Trước Mọi Người',
    tags: ['public-criticism', 'face-saving', 'all-hands', 'dignity'],
    hook: `Giữa buổi all-hands 50 người, chị Lan nhìn thẳng vào bạn: "Báo cáo tuần rồi của bạn A thiếu số liệu so sánh — lần sau cần cẩn thận hơn nhé."\n\nNăm mươi người quay sang nhìn bạn.`,
    setup: `Chị Lan là trưởng phòng, nổi tiếng thẳng thắn — và thường đúng. Báo cáo đó bạn làm đến 11 giờ đêm, và phần số liệu so sánh bị thiếu vì data từ phòng khác gửi trễ. Bạn biết điều đó. Chị Lan có thể không biết.\n\nPhòng họp đang im lặng chờ.\n\nBạn làm gì?`,
    choices: [
      {
        id: 'A',
        label: 'Giải thích ngay tại chỗ',
        action: '"Dạ chị, phần so sánh bị thiếu vì data từ phòng kế toán gửi trễ hơn deadline 2 tiếng. Em sẽ bổ sung và gửi lại trước 5 giờ hôm nay."',
      },
      {
        id: 'B',
        label: 'Nhận và xin gặp riêng',
        action: '"Dạ em hiểu, cảm ơn chị." — rồi xin gặp chị riêng sau buổi họp để giải thích.',
      },
      {
        id: 'C',
        label: 'Nuốt vào, không nói gì',
        action: 'Gật đầu, nhìn xuống bàn, chờ chủ đề tiếp theo.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Chị Lan dừng lại, gật đầu: "Ừ, vậy thì note lại để lần sau follow up sớm hơn." Tension giảm. Một số đồng nghiệp nhìn bạn với vẻ "well done."',
        later: 'Chị Lan bắt đầu hỏi ý kiến bạn trong các meeting nhỏ hơn. Nhưng 2 đồng nghiệp phòng kế toán nghe lại — họ không quên.',
      },
      {
        choiceId: 'B',
        immediate: 'Buổi họp tiếp tục. Chị Lan move on. Không ai nhớ gì thêm.',
        later: 'Gặp riêng chị Lan — chị nghe, gật đầu. Câu chuyện kết thúc clean. Nhưng trong biên bản họp, vẫn ghi là bạn bị nhắc về báo cáo thiếu.',
      },
      {
        choiceId: 'C',
        immediate: 'Không ai nói gì thêm. Họp tiếp tục.',
        later: 'Chị Lan không biết lý do thật. Lần sau có báo cáo quan trọng, chị assign cho người khác — "cho chắc."',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — facts first, giải thích ngay. Logic đúng. Điều cần lưu ý: bắt đầu bằng "em xin lỗi về sự thiếu sót" trước khi giải thích context sẽ hiệu quả hơn — tone quan trọng không kém nội dung.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — không muốn tạo thêm drama, giải quyết riêng tư. Điều cần lưu ý: "nhận lỗi" trước mặt 50 người mà không giải thích có thể được đọc là bạn đồng ý với đánh giá đó — kể cả khi bạn không đồng ý.',
      },
      {
        group: 'NF',
        text: 'Bạn bị kẹt giữa muốn bảo vệ bản thân và không muốn gây căng thẳng. Điều cần lưu ý: câu hỏi thực tế là bạn cần gì — nếu cần chị Lan biết sự thật, gặp riêng (B) là cách ít cost nhất. Relationship 2 người quan trọng hơn việc đúng trước 50 người.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy ngay: đây là information problem, không phải năng lực. A là cách correct thông tin hiệu quả nhất. Điều cần lưu ý: 50 người đang xem cách bạn handle áp lực — không chỉ xem bạn có đúng không.',
      },
    ],
    mirrorMoment: 'Bạn đã từng bị đánh giá không công bằng trước mặt người khác chưa? Lúc đó bạn chọn lên tiếng hay im lặng — và bây giờ nhìn lại, bạn muốn mình đã làm khác không?',
  },

  {
    id: 'NV-05',
    role: 'NV',
    title: 'Đồng Nghiệp Lớn Tuổi Đẩy Việc',
    tags: ['seniority', 'boundary', 'JD', 'workplace-hierarchy'],
    hook: `Anh Hùng — 47 tuổi, làm công ty 15 năm — đặt một xấp tài liệu lên bàn bạn lúc 2 giờ chiều: "Em nhập dữ liệu này vào hệ thống giúp anh với. Em làm nhanh hơn anh."\n\nĐây là lần thứ tư trong tháng này.`,
    setup: `Anh Hùng không phải sếp của bạn, nhưng là người lâu năm nhất phòng. Việc nhập liệu này không trong JD của bạn — và mỗi lần mất khoảng 2 tiếng. Bạn đang có deadline riêng vào cuối ngày hôm nay.\n\nTừ chối anh Hùng — người ngồi cạnh bạn 8 tiếng mỗi ngày — không phải chuyện đơn giản.\n\nBạn nói gì?`,
    choices: [
      {
        id: 'A',
        label: 'Từ chối thẳng',
        action: '"Anh ơi, em có deadline hôm nay nên không support được lần này. Anh có thể nhờ bộ phận hỗ trợ không ạ?"',
      },
      {
        id: 'B',
        label: 'Nhận nhưng set điều kiện',
        action: '"Anh để em xong việc của em trước, khoảng 4 giờ em làm giúp anh được không? Em cần đảm bảo deadline của em trước."',
      },
      {
        id: 'C',
        label: 'Nhận im lặng',
        action: 'Nhận xấp tài liệu, làm thêm giờ để bù việc của mình, không nói gì.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Anh Hùng nhìn bạn một giây, nói "Ừ, thôi được" rồi quay đi. Không tức giận rõ ràng, nhưng không vui.',
        later: 'Anh Hùng ngừng nhờ bạn — nhưng cũng ngừng chia sẻ "insider info" về công ty mà trước đây ông hay kể. Ranh giới được set, relationship thay đổi.',
      },
      {
        choiceId: 'B',
        immediate: 'Anh Hùng gật đầu "Ừ được, 4 giờ anh nhớ." Bạn làm xong việc mình lúc 3:45, bắt đầu nhập liệu cho anh.',
        later: 'Lần sau anh Hùng nhờ lúc 1 giờ chiều — "Em làm luôn được không? 4 giờ hơi muộn." Điều kiện của bạn bắt đầu bị test.',
      },
      {
        choiceId: 'C',
        immediate: 'Anh Hùng cảm ơn, quay về bàn. Bạn làm đến 7 giờ tối để bù.',
        later: 'Tháng sau, anh Hùng mang thêm việc. Bạn đã trở thành "người hay giúp" — trong mắt anh Hùng và cả phòng.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — việc không trong JD, đang có deadline, logic rõ. Điều cần lưu ý: "Anh có thể nhờ bộ phận hỗ trợ không" là câu redirect tốt — cho anh Hùng một đường khác thay vì chỉ đóng cửa.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B hoặc C — không muốn anh Hùng khó chịu. Điều cần lưu ý: B là compromise có cấu trúc, C là không có ranh giới gì cả. Sự khác biệt đó nhỏ hôm nay nhưng lớn dần theo thời gian.',
      },
      {
        group: 'NF',
        text: 'Bạn cảm nhận được sự mệt mỏi của anh Hùng với hệ thống mới — và muốn giúp thật. Điều cần lưu ý: giúp từ vị trí lựa chọn (B có điều kiện) khác với giúp từ vị trí bị kẹt (C). Cái trước bền, cái sau không.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy pattern: lần 4 trong tháng = đây là expectation, không phải nhờ vả. A là cách interrupt pattern hiệu quả nhất. Điều cần lưu ý: nếu chọn A, hãy có sẵn giải pháp thay thế cho anh Hùng — "bộ phận hỗ trợ" là ai, số mấy.',
      },
    ],
    mirrorMoment: 'Trong công việc, bạn thường nói "không" dễ hơn với ai — sếp, đồng nghiệp ngang hàng, hay người lâu năm hơn? Điều gì tạo ra sự khác biệt đó?',
  },

  {
    id: 'NV-07',
    role: 'NV',
    title: 'Biết Sếp Sắp Sai',
    tags: ['pushback', 'data', 'political-risk', 'meeting'],
    hook: `Trong cuộc họp chiến lược, sếp bạn — anh Phong — vừa quyết định tung campaign vào tháng 8. Bạn có data: tháng 8 năm ngoái là tháng thấp nhất của ngành, và 3 competitor đã thử rồi thất bại.\n\nAnh Phong đang nhìn cả team với vẻ "thống nhất rồi nhé."`,
    setup: `Anh Phong là người tự tin vào trực giác, không hay thích bị "dạy lại." Bạn mới vào team 8 tháng. Data bạn có là real — từ báo cáo ngành bạn đọc tối qua — nhưng anh Phong chưa thấy.\n\nNếu bạn không nói gì, campaign có thể thất bại. Nếu bạn lên tiếng sai cách, bạn trở thành "người hay phản biện sếp."\n\nBạn làm gì?`,
    choices: [
      {
        id: 'A',
        label: 'Lên tiếng ngay',
        action: '"Anh Phong ơi, em có một số data về tháng 8 ngành mình em muốn share — mình có thể xem qua trước khi chốt không ạ?"',
      },
      {
        id: 'B',
        label: 'Gặp riêng sau meeting',
        action: 'Để meeting kết thúc, sau đó xin gặp anh Phong 1-1 để trình bày data.',
      },
      {
        id: 'C',
        label: 'Gửi email với data',
        action: 'Sau meeting, soạn email tóm tắt data và gửi cho anh Phong — có cc team.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Anh Phong dừng lại: "Data nào vậy em?" Bạn trình bày. Anh Phong im lặng, rồi nói "Để anh xem lại." Meeting kết thúc không có quyết định cuối.',
        later: 'Campaign dời sang tháng 10. Anh Phong không nhắc lại việc bạn lên tiếng — nhưng bắt đầu hỏi ý kiến bạn trước một số quyết định quan trọng.',
      },
      {
        choiceId: 'B',
        immediate: 'Meeting kết thúc, quyết định tháng 8 được "chốt" trong biên bản.',
        later: 'Gặp riêng anh Phong — anh nghe, suy nghĩ 2 ngày rồi dời campaign. Anh nói với team là "anh review lại" — không nhắc đến bạn. Bạn không được credit, nhưng campaign không fail.',
      },
      {
        choiceId: 'C',
        immediate: 'Email gửi đi. Anh Phong đọc lúc 6 giờ tối, không reply.',
        later: 'Hôm sau anh Phong gọi bạn vào phòng riêng: "Em có thể nói thẳng với anh hơn không, thay vì cc cả team?" Campaign vẫn được dời, nhưng relationship bị sứt mẻ.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A hoặc C — data in hand, nói ngay. A là cách tốt nếu framing đúng: câu hỏi ("mình có thể xem qua không?") thay vì statement ("campaign này sẽ fail") giảm defensive response của anh Phong đáng kể.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — không muốn làm anh Phong bẽ mặt trước team. Đây là đọc tình huống đúng. Điều cần lưu ý: B work, nhưng bạn cần chủ động xin gặp ngay sau meeting — không phải chờ anh ấy hỏi.',
      },
      {
        group: 'NF',
        text: 'Bạn cảm thấy responsibility — nếu campaign fail, team sẽ bị ảnh hưởng. Điều cần lưu ý: cảm giác đó là lý do tốt để lên tiếng. A hoặc B đều work — câu hỏi là bạn có đủ comfortable để làm A không, hay B cho bạn thời gian chuẩn bị tốt hơn.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là information gap, không phải conflict. A là cách fill gap hiệu quả nhất. Điều cần lưu ý: "Em có data về ngành" khác với "campaign này không work" — cái trước invite, cái sau defend.',
      },
    ],
    mirrorMoment: 'Bạn đã từng biết một quyết định sẽ không work nhưng không nói gì chưa? Điều gì khiến bạn im lặng lúc đó?',
  },

  {
    id: 'NV-09',
    role: 'NV',
    title: 'Nhóm Zalo Công Ty',
    tags: ['Zalo', 'focus', 'digital-boundary', 'team-culture'],
    hook: `Nhóm Zalo "Team Marketing" có 23 người. Từ 8 giờ sáng đến 10 giờ đêm, thông báo không ngừng: meme, link bài báo, "cho hỏi chút", poll ăn trưa, và thỉnh thoảng — việc thật.\n\nTuần này bạn miss 2 deadline nhỏ vì bị distracted.`,
    setup: `Mute nhóm thì dễ — nhưng tuần trước, chị Nga hỏi một câu quan trọng trong nhóm lúc 3 giờ chiều, không ai reply vì "ai cũng bận." Sếp không vui.\n\nBạn muốn tập trung làm việc. Bạn cũng không muốn miss thứ quan trọng. Và bạn không muốn là người bị coi là "không hòa đồng."\n\nBạn làm gì?`,
    choices: [
      {
        id: 'A',
        label: 'Nói thẳng trong nhóm',
        action: '"Mọi người ơi, mình để ý nhóm mình có nhiều tin không liên quan công việc — mình có thể lập nhóm riêng cho việc không ạ? Để nhóm này chỉ dùng cho công việc thôi."',
      },
      {
        id: 'B',
        label: 'Mute và tự quản lý',
        action: 'Mute nhóm, đặt lịch check nhóm 3 lần/ngày (9h, 12h, 5h), tự theo dõi.',
      },
      {
        id: 'C',
        label: 'Giữ nguyên, chấp nhận',
        action: 'Không làm gì, cố gắng tự filter trong đầu giữa tin quan trọng và không quan trọng.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: '3 người react tim. 1 người nhắn "ý kiến hay đó." Chị Nga không reply gì. Sếp không comment.',
        later: 'Nhóm phụ được tạo — nhưng sau 2 tuần, tin không liên quan bắt đầu quay lại nhóm chính vì "tiện hơn." Culture không thay đổi nếu không có enforcement từ sếp.',
      },
      {
        choiceId: 'B',
        immediate: 'Không ai biết bạn mute. Buổi chiều đầu tiên yên tĩnh hơn đáng kể.',
        later: 'Bạn miss một tin nhắn lúc 11 giờ sáng về thay đổi brief — check nhóm lúc 12 giờ thì đã muộn. Mute work, nhưng cần kỷ luật check đều đặn.',
      },
      {
        choiceId: 'C',
        immediate: 'Không thay đổi gì. Bạn tiếp tục bị interrupt.',
        later: 'Deadline thứ 3 bị miss. Lần này sếp hỏi lý do.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — vấn đề rõ, giải pháp rõ. Điều cần lưu ý: thay đổi group culture cần buy-in từ leader nhóm. Propose với sếp trước, sau đó sếp announce sẽ hiệu quả hơn nhiều.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B hoặc C — không muốn tạo sóng. Điều cần lưu ý: B là giải pháp tự quản lý hợp lý, nhưng cần commitment thật. Nếu mute mà không có lịch check cố định, B trở thành C với thêm một lớp rủi ro.',
      },
      {
        group: 'NF',
        text: 'Bạn nhìn thấy vấn đề lớn hơn: nhóm này không có norm rõ ràng. A là cách bạn muốn — nhưng framing quan trọng. "Mình có thể lập nhóm riêng không?" (invite) khác với "nhóm mình lộn xộn quá" (judge).',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là system problem. A là giải pháp đúng về hệ thống. Điều cần lưu ý: đúng về giải pháp nhưng bạn cần coalition — đề xuất một mình trong group chat ít khi tạo ra thay đổi thật.',
      },
    ],
    mirrorMoment: 'Có công cụ hoặc kênh liên lạc nào đang lấy nhiều attention của bạn hơn bạn muốn không? Bạn đã làm gì — hay chưa làm gì — với điều đó?',
  },

  // ══════════════════════════════
  // GÓC QUẢN LÝ (MG)
  // ══════════════════════════════

  {
    id: 'MG-01',
    role: 'MG',
    title: 'Nhân Viên Giỏi, Defensive',
    tags: ['feedback', 'high-performer', 'ego', 'coaching'],
    hook: `Linh là nhân viên tốt nhất team của bạn — deadline chưa bao giờ trễ, client yêu thích, đồng nghiệp hay hỏi ý kiến. Hôm nay bạn feedback nhỏ về một slide deck: "Em có thể làm data visualization rõ hơn không?"\n\nLinh nhìn bạn một giây, rồi nói: "Em nghĩ cách này cleaner hơn. Anh/chị có thể nói cụ thể phần nào không clear không?"`,
    setup: `Câu hỏi nghe có vẻ hợp lý. Nhưng tone không phải tone của người muốn nghe — là tone của người đang defend.\n\nNếu bạn press tiếp, có thể làm căng mối quan hệ với người bạn không muốn mất. Nếu bạn retreat, tín hiệu bạn gửi là feedback của bạn không quan trọng.\n\nBạn xử lý thế nào?`,
    choices: [
      {
        id: 'A',
        label: 'Cụ thể hóa feedback',
        action: '"Cụ thể là slide 4 — con số 40% không có context để người xem hiểu so với cái gì. Nếu thêm comparison với Q1 thì rõ hơn."',
      },
      {
        id: 'B',
        label: 'Acknowledge + plant seed',
        action: '"Có thể em đúng. Anh/chị chỉ nghĩ nếu người xem không quen data thì họ sẽ cần thêm context. Em thử test với ai đó ngoài team xem họ hiểu ngay không."',
      },
      {
        id: 'C',
        label: 'Step back',
        action: '"Okay, nếu em tự tin thì được. Anh/chị chỉ muốn check."',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Linh im lặng 2 giây, gật đầu: "Dạ để em xem lại." Không enthusiastic, nhưng không defensive thêm.',
        later: 'Slide được sửa. Nhưng Linh bắt đầu hỏi bạn ít hơn khi có doubts — đề phòng feedback thêm.',
      },
      {
        choiceId: 'B',
        immediate: 'Linh gật đầu, vẻ suy nghĩ. "Cũng có lý anh/chị." Không cam kết sửa, nhưng không defensive.',
        later: 'Linh đi hỏi đồng nghiệp, nhận cùng feedback → tự quyết định sửa. Bạn không cần push — nhưng cần kiên nhẫn.',
      },
      {
        choiceId: 'C',
        immediate: 'Linh nhẹ nhõm. Conversation kết thúc nhẹ nhàng.',
        later: 'Slide không đổi. Linh learn rằng defensiveness work — bạn sẽ step back. Pattern này sẽ tái diễn.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — rõ ràng, cụ thể, efficient. Về mặt content thì đúng. Điều cần lưu ý: với người có cái tôi cao, direct feedback thường kích hoạt resistance nhiều hơn acceptance. Câu hỏi là cách nào faster về dài hạn: push ngay hay plant seed?',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — acknowledge trước, để Linh tự arrive. Điều cần lưu ý: B cần kiên nhẫn thật sự. Nếu Linh không tự sửa sau 3-4 ngày, bạn vẫn phải follow up — B không phải là "xong việc."',
      },
      {
        group: 'NF',
        text: 'Bạn muốn Linh thật sự hiểu và grow, không chỉ sửa slide. B là approach phù hợp. Điều cần lưu ý: đừng để desire for genuine growth làm bạn avoid feedback thật khi cần — có lúc Linh cần nghe thẳng.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là coaching problem, không phải slide problem. B là cách giải quyết đúng root cause — Linh cần learn cách receive feedback. Điều cần lưu ý: process này cần thời gian, không phải một conversation.',
      },
    ],
    mirrorMoment: 'Bạn có ai trong team hiện tại hay defensive khi nhận feedback không? Bạn thường xử lý thế nào với họ?',
  },

  {
    id: 'MG-02',
    role: 'MG',
    title: 'Hai Nhân Viên Giỏi Conflict',
    tags: ['conflict', 'mediation', 'team-dynamics', 'deadline'],
    hook: `Tuấn và Phương — hai nhân viên giỏi nhất team của bạn — không nhìn mặt nhau từ 3 tuần nay. Hôm nay Tuấn xin gặp bạn: "Anh/chị ơi, em không thể tiếp tục làm việc chung project với Phương được nữa."`,
    setup: `Bạn biết cả hai đều đúng một phần: Tuấn làm việc nhanh nhưng hay bỏ qua documentation. Phương cẩn thận nhưng hay block tiến độ vì muốn perfect. Project này cần cả hai — deadline 3 tuần nữa.\n\nNếu bạn can thiệp mạnh, một trong hai có thể cảm thấy bị thiên vị. Nếu bạn không làm gì, deadline sẽ miss.\n\nBạn xử lý thế nào?`,
    choices: [
      {
        id: 'A',
        label: 'Gặp cả hai cùng lúc',
        action: '"Anh/chị muốn ngồi với cả hai bạn để nghe cả hai phía — chiều nay 3 giờ được không?"',
      },
      {
        id: 'B',
        label: 'Gặp từng người riêng',
        action: 'Gặp Phương trước để nghe phía kia, sau đó tự quyết định cách phân chia công việc lại.',
      },
      {
        id: 'C',
        label: 'Tách project, phân công lại',
        action: 'Không mediate, chia project thành 2 phần độc lập — Tuấn làm phần A, Phương làm phần B, giảm overlap.',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Buổi gặp căng. Tuấn và Phương mỗi người trình bày một góc — có vài phút awkward silence. Bạn phải actively facilitate.',
        later: 'Không resolve hoàn toàn, nhưng cả hai có không gian nói. Tuấn và Phương đồng ý một số working norm mới. Project về đích đúng hạn — chất lượng trung bình.',
      },
      {
        choiceId: 'B',
        immediate: 'Phương kể một số điều bạn chưa biết về cách Tuấn communicate trong Slack. Bạn có thêm context.',
        later: 'Bạn phân công lại dựa trên strength. Tuấn biết bạn gặp Phương — hỏi "anh/chị nghe Phương nói gì?" Relationship của bạn với Tuấn bị nghi ngờ nhẹ.',
      },
      {
        choiceId: 'C',
        immediate: 'Tuấn và Phương đều nhẹ nhõm vì không phải làm việc chung.',
        later: '2 phần project không consistent — client feedback là "hai phần A và B có vẻ không cùng một người làm." Conflict giữa Tuấn và Phương không được giải quyết.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn C — tách việc, giải quyết thực tế, move on. Efficient trong ngắn hạn. Điều cần lưu ý: conflict sẽ surface lại ở project tiếp theo nếu không được address. C giải quyết triệu chứng, không phải nguyên nhân.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — nghe đủ phía trước khi quyết định. Điều cần lưu ý: gặp riêng từng người có thể tạo impression bạn "đứng về một phía." Nếu chọn B, hãy transparent với cả hai là bạn đang nghe cả hai.',
      },
      {
        group: 'NF',
        text: 'Bạn muốn chọn A — cả ba ngồi lại, nói thật, resolve. Điều cần lưu ý: A đúng về mặt lý tưởng nhưng cần bạn có kỹ năng facilitate. Chuẩn bị agenda rõ trước buổi gặp sẽ tăng cơ hội thành công.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy conflict này là structural: hai working style không compatible nếu không có norm rõ ràng. C giải quyết ngay, nhưng B cho bạn đủ information để quyết định. Dù chọn cách nào, document working norm sau đó để làm precedent.',
      },
    ],
    mirrorMoment: 'Bạn đã từng phải đứng giữa hai người đều đúng một phần chưa? Bạn đã xử lý thế nào — và nhìn lại, bạn muốn mình làm khác điều gì?',
  },

  {
    id: 'MG-06',
    role: 'MG',
    title: 'Nhân Viên Xin Nghỉ Lý Do Gia Đình',
    tags: ['resignation', 'retention', 'face-saving', 'trust'],
    hook: `Minh — nhân viên bạn train 2 năm, đang handle account lớn nhất phòng — xin gặp bạn thứ Hai sáng. Ngồi xuống, nhìn xuống bàn: "Anh/chị ơi, em muốn xin nghỉ. Ba em bệnh, em cần về quê chăm."\n\nTuần trước bạn thấy Minh update LinkedIn.`,
    setup: `Bạn không biết chắc. Có thể ba Minh thật sự bệnh. Có thể Minh có offer khác và đây là cách tử tế để ra đi. Cả hai đều có thể đúng cùng một lúc.\n\nNếu bạn hỏi thẳng về offer khác, Minh có thể cảm thấy bị nghi ngờ. Nếu bạn chỉ accept "lý do gia đình," bạn mất nhân viên giỏi mà không biết lý do thật.\n\nBạn nói gì?`,
    choices: [
      {
        id: 'A',
        label: 'Hỏi thẳng, nhẹ nhàng',
        action: '"Anh/chị hiểu và tôn trọng quyết định của Minh. Anh/chị muốn hỏi thẳng một câu: ngoài lý do gia đình, có điều gì ở đây khiến Minh muốn thay đổi không? Anh/chị hỏi để hiểu, không phải để giữ."',
      },
      {
        id: 'B',
        label: 'Offer counter không hỏi lý do',
        action: '"Anh/chị tiếc khi nghe điều này. Trước khi Minh quyết định, anh/chị muốn offer Minh remote working 3 tháng để Minh vừa về quê chăm ba vừa tiếp tục làm được không?"',
      },
      {
        id: 'C',
        label: 'Accept gracefully',
        action: '"Anh/chị hiểu Minh. Cảm ơn Minh đã làm việc tốt 2 năm qua. Mình nói chuyện về handover nhé."',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Minh im lặng vài giây, rồi nói: "Thật ra em cũng có một offer khác, anh/chị ạ. Em xin lỗi vì không nói thẳng." Conversation trở nên thật hơn.',
        later: 'Bạn biết lý do thật và có thể quyết định counter hay không dựa trên thực tế. Minh tôn trọng bạn đã hỏi thẳng — dù kết quả vẫn là Minh nghỉ.',
      },
      {
        choiceId: 'B',
        immediate: 'Minh bất ngờ, nói "Để em suy nghĩ anh/chị ơi." Không từ chối ngay.',
        later: 'Minh quay lại hôm sau: "Em quyết định vẫn nghỉ anh/chị ạ." Bạn không biết lý do thật, offer không work, nhưng bạn đã show good faith.',
      },
      {
        choiceId: 'C',
        immediate: 'Minh nhẹ nhõm. "Cảm ơn anh/chị." Cuộc trò chuyện kết thúc nhanh.',
        later: 'Minh handover sạch, ra đi friendly. Bạn không biết lý do thật — và không có thông tin để improve cho người tiếp theo.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn A — information là cần thiết để quyết định đúng. Điều cần lưu ý: "Anh/chị hỏi để hiểu, không phải để giữ" là câu quan trọng nhất — nếu thiếu câu đó, A nghe như interrogation.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn C hoặc B — không muốn Minh uncomfortable. Điều cần lưu ý: C là cách đối xử tốt với Minh, nhưng bạn sẽ tiếp tục không biết tại sao người tốt rời đi. Một cuộc exit conversation ngắn sau khi Minh nghỉ vẫn worth doing.',
      },
      {
        group: 'NF',
        text: 'Bạn cảm nhận được có gì đó không được nói ra. A là cách tạo không gian để Minh nói thật nếu muốn. Điều cần lưu ý: A chỉ work nếu Minh tin bạn sẽ không phán xét — relationship 2 năm qua sẽ quyết định điều đó.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là information problem và retention problem. A cho bạn data để improve. Dù Minh nghỉ vì lý do gì, document lại những gì bạn học được để cải thiện cho người tiếp theo — đó là ROI duy nhất từ một resignation.',
      },
    ],
    mirrorMoment: 'Bạn có biết lý do thật tại sao người cuối cùng rời team bạn nghỉ không? Nếu không — bạn muốn biết không?',
  },

  {
    id: 'MG-10',
    role: 'MG',
    title: 'Quản Lý Bạn Bè Cũ',
    tags: ['peer-to-boss', 'authority', 'friendship', 'transition'],
    hook: `Ba tháng trước bạn và Hùng cùng đi ăn trưa mỗi ngày, chửi sếp cũ cùng nhau. Tuần này bạn là sếp mới của Hùng.\n\nHôm nay là buổi 1-1 đầu tiên. Hùng ngồi xuống, nhìn bạn, cười: "Thôi ông/bà boss, bắt đầu đi."`,
    setup: `Câu nói đó có thể là joke thân thiện. Hoặc có thể là Hùng đang test xem bạn có thay đổi không. Hoặc cả hai.\n\nNếu bạn quá formal, bạn mất người bạn và tạo ra awkwardness sẽ tồn tại mãi. Nếu bạn quá casual, bạn sẽ khó thiết lập authority khi cần — và sẽ cần.\n\nBạn mở đầu buổi 1-1 này thế nào?`,
    choices: [
      {
        id: 'A',
        label: 'Acknowledge thẳng sự thay đổi',
        action: '"Mình cũng thấy weird nha Hùng. Mình vẫn là bạn bè — nhưng mình cũng cần cả hai mình rõ ràng hơn về một số thứ trong công việc. Hùng có muốn nói về điều đó không?"',
      },
      {
        id: 'B',
        label: 'Giữ tone thân thiện, vào việc',
        action: '"Ha, đúng rồi. Thôi, mình nói về Q4 của Hùng đi — Hùng đang cảm thấy thế nào về project hiện tại?"',
      },
      {
        id: 'C',
        label: 'Establish authority sớm',
        action: '"Mình muốn buổi hôm nay mình nói về expectations của mình với team — bao gồm Hùng. Mình sẽ share một số thứ thay đổi từ bây giờ."',
      },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Hùng bất ngờ một chút, rồi gật đầu: "Ừ, mình cũng đang nghĩ về điều đó." Conversation trở nên thật.',
        later: 'Hai người có một số norm rõ ràng hơn — Hùng biết khi nào là "bạn" và khi nào là "nhân viên-sếp." Transition vẫn awkward đôi chỗ, nhưng có nền tảng.',
      },
      {
        choiceId: 'B',
        immediate: 'Hùng thoải mái, vào việc. Buổi 1-1 diễn ra bình thường.',
        later: '3 tuần sau, bạn cần give Hùng feedback về deliverable không đạt. Hùng phản ứng như đang nói chuyện với bạn, không phải với sếp: "Ý mày là sao, mày biết tao làm tốt mà." Moment đó khó xử vì chưa có nền tảng.',
      },
      {
        choiceId: 'C',
        immediate: 'Hùng straighten up, vẻ hơi ngạc nhiên. Lắng nghe, nhưng mắt ít warm hơn.',
        later: 'Hùng bắt đầu formal hơn với bạn ở chỗ làm — nhưng cũng distant hơn. Bạn có authority, nhưng mất người đồng minh tự nhiên trong team.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Bạn có xu hướng chọn C — rõ ràng ngay từ đầu, hiệu quả. Điều cần lưu ý: "Expectations" trong buổi 1-1 đầu tiên với bạn bè cũ nghe như HR script — Hùng sẽ cảm thấy mất người bạn, không phải gain một manager tốt.',
      },
      {
        group: 'SF',
        text: 'Bạn có xu hướng chọn B — giữ friendship, để transition tự xảy ra. Điều cần lưu ý: B pleasant hôm nay nhưng tạo ra cuộc trò chuyện khó hơn nhiều sau này. Transition peer-to-boss cần được address trực tiếp — càng muộn càng khó.',
      },
      {
        group: 'NF',
        text: 'Bạn muốn chọn A — honest, warm, acknowledge reality. Đây là approach đúng với người bạn đang care về. Điều cần lưu ý: "Hùng có muốn nói về điều đó không?" trao quyền cho Hùng — đây là điểm mạnh của A.',
      },
      {
        group: 'NT',
        text: 'Bạn nhìn thấy đây là role transition problem cần solved một lần rõ ràng. A là cách hiệu quả nhất. Điều cần lưu ý: solution đúng, nhưng đây cũng là relationship problem. Đừng chỉ solve cái role — giữ cái người.',
      },
    ],
    mirrorMoment: 'Bạn đã từng phải thay đổi cách relationship với ai đó khi vai trò của bạn thay đổi chưa? Điều gì giúp transition đó dễ hơn — hay khó hơn?',
  },


  // ══════════════════════════════
    // KHÁCH HÀNG (KH)
    // ══════════════════════════════

    {
      id: 'KH-01',
      role: 'KH',
      title: 'Khách Hàng Thêm Việc Ngoài Contract',
      tags: ['scope-creep', 'contract', 'boundary', 'KH-thượng-đế'],
      hook: `Dự án web đang chạy được 3 tuần. Chị Hương — đại diện client — nhắn Zalo: "Bạn ơi, mình thêm một tính năng nhỏ nhé — filter theo khu vực. Không mất nhiều thời gian đâu."\n\n"Tính năng nhỏ" đó bạn biết sẽ mất 2 tuần dev.`,
      setup: `Đây là lần thứ hai chị Hương "thêm nhỏ" ngoài scope ban đầu. Lần trước bạn làm vì "giữ quan hệ." Lần này nếu làm, deadline gốc sẽ trễ 2 tuần — và bạn sẽ phải giải thích với sếp tại sao.\n\nNhưng từ chối khách hàng — đặc biệt người hay nói "mình tin tưởng bên bạn lắm" — không hề đơn giản.\n\nBạn trả lời thế nào?`,
      choices: [
        {
          id: 'A',
          label: 'Báo giá bổ sung',
          action: '"Chị Hương ơi, tính năng này nằm ngoài scope hợp đồng ban đầu — em sẽ estimate và gửi chị báo giá bổ sung trong hôm nay nhé. Nếu chị approve thì mình add vào sprint tiếp theo."',
        },
        {
          id: 'B',
          label: 'Offer trade-off',
          action: '"Chị ơi, em có thể làm tính năng này nhưng mình cần bỏ hoặc đơn giản hóa một feature khác trong scope để giữ deadline. Chị muốn đổi feature nào không?"',
        },
        {
          id: 'C',
          label: 'Nhận và làm',
          action: 'Nhắn "Dạ chị, để em xem" rồi assign cho dev, tự hấp thu thêm giờ vào project.',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Chị Hương im lặng 1 ngày, rồi reply: "Thôi để sau vậy." Không hỏi thêm.',
          later: 'Deadline giữ đúng. Chị Hương lần sau hỏi về scope trước khi request. Relationship vẫn tốt — chị hiểu bạn có process.',
        },
        {
          choiceId: 'B',
          immediate: 'Chị Hương suy nghĩ, hỏi lại "feature nào mình có thể bỏ?" Conversation trở thành prioritization.',
          later: 'Trade-off được đồng ý. Sản phẩm cuối có tính năng filter nhưng bỏ một tính năng ít dùng hơn. Client hài lòng vì cảm thấy được nghe.',
        },
        {
          choiceId: 'C',
          immediate: 'Chị Hương cảm ơn, vui vẻ. Team bắt đầu làm thêm giờ.',
          later: 'Deadline trễ 10 ngày. Bạn giải thích với sếp là "scope thay đổi." Sếp hỏi tại sao không báo sớm hơn. Chị Hương lần sau request thêm 2 tính năng nữa vì "lần trước cũng được mà."',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A — contract là contract, rõ ràng ngay. Logic đúng và bảo vệ team. Điều cần lưu ý: tone quan trọng. "Nằm ngoài scope" nghe defensive — "em sẽ estimate và gửi báo giá" nghe professional và forward-looking hơn nhiều.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn B hoặc C — không muốn chị Hương cảm thấy bị từ chối. Điều cần lưu ý: B là cách tuyệt vời vì vừa accommodate vừa giữ scope. C làm hài lòng ngay hôm nay nhưng tạo expectation "cứ hỏi là được" — khó sửa sau này.',
        },
        {
          group: 'NF',
          text: 'Bạn muốn chị Hương happy và project thành công. Điều cần lưu ý: đôi khi "không" (A) hoặc "đổi" (B) thật sự tốt hơn cho project về dài hạn — cả hai phía. Khách hàng tốt tôn trọng vendor biết manage scope.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy đây là precedent problem: làm lần 2 = lần 3 sẽ đến. A hoặc B đều giải quyết root cause. Điều cần lưu ý: A hiệu quả nhất nếu có template báo giá bổ sung sẵn — đừng để "em estimate" kéo dài quá 24 giờ.',
        },
      ],
      mirrorMoment: 'Bạn đã từng nhận việc ngoài scope vì "giữ quan hệ" chưa? Lần đó kết thúc thế nào — cho bạn, cho team, và cho khách hàng đó?',
    },

    {
      id: 'KH-02',
      role: 'KH',
      title: 'Khách Hàng Deadline Bất Khả Thi',
      tags: ['deadline', 'unreasonable-client', 'negotiation', 'pressure'],
      hook: `Thứ Hai sáng, anh Dũng — giám đốc bên client — gọi video: "Bạn ơi, sếp tôi cần demo cho board tuần này thứ Sáu. Bạn có thể có prototype không?"\n\nThứ Sáu là 4 ngày nữa. Prototype cần ít nhất 3 tuần.`,
      setup: `Anh Dũng không phải người quyết định — anh cũng đang bị sếp ép. Bạn thấy điều đó qua giọng nói. Nếu bạn nói thẳng "không thể," anh Dũng sẽ phải về báo cáo với sếp — không ai muốn là người mang tin xấu.\n\nNhưng nếu bạn hứa rồi không làm kịp — còn tệ hơn.\n\nBạn xử lý thế nào?`,
      choices: [
        {
          id: 'A',
          label: 'Thẳng thắn + offer alternative',
          action: '"Anh Dũng ơi, prototype đầy đủ trong 4 ngày không khả thi — nhưng em có thể làm một clickable mockup của 3 màn chính để board có thể hình dung hướng đi. Anh thấy điều đó có giúp được cho meeting không?"',
        },
        {
          id: 'B',
          label: 'Hỏi để hiểu board cần gì thật sự',
          action: '"Anh ơi, để em hiểu rõ hơn — board cần thấy gì trong buổi demo đó? Nếu em biết mục tiêu của meeting thì có thể có cách support anh tốt hơn."',
        },
        {
          id: 'C',
          label: 'Nhận rồi tính sau',
          action: '"Dạ anh, em sẽ cố gắng hết sức." Cúp máy rồi họp team khẩn.',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Anh Dũng thở phào: "Ừ, clickable mockup cũng được — board cần thấy concept thôi." Deadline thật ra không phải prototype đầy đủ.',
          later: 'Mockup được giao đúng thứ Sáu. Board approve direction. Anh Dũng tin tưởng bạn hơn vì bạn không hứa bừa.',
        },
        {
          choiceId: 'B',
          immediate: 'Anh Dũng giải thích: "Board cần thấy là mình đang có hướng đi, không cần thật nhiều." Requirement thay đổi hoàn toàn.',
          later: 'Bạn làm 5 slide deck thay vì prototype — xong trong 1 ngày. Meeting thành công. Anh Dũng kể với sếp về "vendor flexible và understand business."',
        },
        {
          choiceId: 'C',
          immediate: 'Team họp khẩn. Không ai biết chính xác anh Dũng cần gì — chỉ biết là "thứ Sáu có demo."',
          later: 'Team làm 4 ngày liên tục, prototype bị lỗi vì vội. Demo thứ Sáu không smooth. Anh Dũng xin lỗi board, nói "vendor chưa kịp." Bạn không có cơ hội giải thích.',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A — rõ ràng những gì có thể và không thể, offer alternative. Đây là cách professional nhất. Điều cần lưu ý: alternative phải cụ thể ngay lập tức ("clickable mockup 3 màn") — "em sẽ cố gắng" không phải alternative.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn B — muốn hiểu anh Dũng thật sự cần gì trước khi quyết định. Đây là approach thông minh vì nhiều khi "deadline gấp" xuất phát từ miscommunication về requirement. Điều cần lưu ý: hỏi phải có time limit — B work tốt nhất khi bạn resolve trong 1 call.',
        },
        {
          group: 'NF',
          text: 'Bạn cảm nhận được anh Dũng đang bị áp lực và muốn giúp. Điều cần lưu ý: giúp anh Dũng giải thích với sếp của anh ấy — không phải hứa những gì bạn không thể deliver. A cho anh Dũng một "alternative to present to board" — đó mới là giúp thật.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy ngay: requirement chưa rõ → không thể commit. B là bước đúng đắn nhất — clarify trước, commit sau. Điều cần lưu ý: sau khi clarify (B), nếu requirement vẫn không khả thi → phải nói A. B không phải cách để avoid saying no.',
        },
      ],
      mirrorMoment: 'Bạn đã từng hứa deadline rồi biết ngay là không kịp chưa? Cảm giác đó thế nào — và lần sau bạn xử lý khác không?',
    },

    {
      id: 'KH-03',
      role: 'KH',
      title: 'Khách Hàng Không Hài Lòng Nhưng Không Nói Rõ',
      tags: ['feedback', 'client-satisfaction', 'indirect-communication', 'VN-style'],
      hook: `Sau khi bạn gửi deliverable tuần trước, anh Tài — client lead — chỉ reply: "Ok em, anh xem qua rồi." Không khen, không chê. Từ đó đến nay anh trả lời email chậm hơn thường lệ.\n\nDự án còn 2 tháng nữa.`,
      setup: `Bạn không chắc anh Tài có hài lòng không. Trong văn hóa VN, "ok xem rồi" có thể là thật sự ok — hoặc là cách lịch sự để không nói thẳng không hài lòng.\n\nNếu bạn hỏi thẳng "anh có hài lòng không," anh Tài có thể cảm thấy awkward. Nếu bạn không hỏi, vấn đề tiếp tục âm ỉ — và có thể nổ ra lúc gần deadline.\n\nBạn làm gì?`,
      choices: [
        {
          id: 'A',
          label: 'Hỏi trực tiếp, tạo không gian an toàn',
          action: '"Anh Tài ơi, em muốn check in về deliverable tuần rồi — có phần nào anh muốn mình điều chỉnh không? Em muốn biết sớm để mình còn kịp sửa hướng nếu cần."',
        },
        {
          id: 'B',
          label: 'Xin gặp review chung',
          action: '"Anh ơi, mình schedule 30 phút review deliverable cùng nhau được không? Em muốn nghe feedback trực tiếp của anh để đảm bảo mình đang đi đúng hướng."',
        },
        {
          id: 'C',
          label: 'Tiếp tục làm, chờ anh Tài lên tiếng',
          action: 'Không hỏi. Tiếp tục deliverable tiếp theo với cùng approach, chờ anh Tài phản hồi.',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Anh Tài reply sau 2 tiếng: "Thật ra có một phần anh muốn bạn làm lại — phần data visualization, anh thấy khó đọc quá." Vấn đề được nói ra.',
          later: 'Bạn sửa trong 2 ngày. Anh Tài bắt đầu reply email nhanh hơn. Relationship recover.',
        },
        {
          choiceId: 'B',
          immediate: 'Anh Tài đồng ý meeting. Trong phòng họp, anh dễ nói hơn qua email — kể ra 3 điểm muốn điều chỉnh.',
          later: 'Meeting thành turning point. Bạn note lại rõ ràng và confirm bằng email. Anh Tài cảm thấy được nghe — engagement tăng hẳn.',
        },
        {
          choiceId: 'C',
          immediate: 'Không gì xảy ra. Bạn tiếp tục làm deliverable tiếp theo.',
          later: 'Tuần 8/10 của dự án, anh Tài email cho sếp bạn: "Mình cần discuss về direction của project." Bạn không biết vấn đề đã tích lại từ tuần 3.',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng muốn chọn A — hỏi thẳng, biết thông tin ngay. Điều cần lưu ý: với client VN hay indirect, "có phần nào muốn điều chỉnh không" (mời) nghe ít threatening hơn "anh có hài lòng không" (đánh giá). Cách đặt câu hỏi quyết định anh Tài có nói thật không.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn B — face-to-face dễ nói hơn qua text, đặc biệt với người VN hay indirect. Đây là insight đúng. Điều cần lưu ý: đừng để "schedule meeting" kéo dài quá 2 ngày — càng sớm càng ít tích lũy.',
        },
        {
          group: 'NF',
          text: 'Bạn cảm nhận được có gì đó không ổn và muốn address. Cả A và B đều work — lựa chọn phụ thuộc vào relationship với anh Tài. Điều cần lưu ý: C là lựa chọn bạn muốn tránh nhất — "chờ client lên tiếng" ở VN đôi khi có nghĩa là chờ đến lúc họ escalate.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy signal rõ: reply chậm + không feedback = vấn đề. A là cách thu thập information nhanh nhất. Điều cần lưu ý: frame câu hỏi như "kiểm tra quality" (em muốn đảm bảo đang đúng hướng) thay vì "xin feedback" — cái trước cho anh Tài cảm giác bạn chủ động, cái sau có thể nghe như defensive.',
        },
      ],
      mirrorMoment: 'Bạn có khách hàng hay đối tác nào đang "yên lặng bất thường" không? Bạn có biết lý do không — hay đang để ngỏ?',
    },

    {
      id: 'KH-04',
      role: 'KH',
      title: 'Khách Hàng Yêu Cầu Giảm Giá Sau Khi Ký',
      tags: ['pricing', 'negotiation', 'contract', 'pressure'],
      hook: `Dự án đã ký hợp đồng, bắt đầu được 2 tuần. Chị Mai gọi điện: "Bạn ơi, công ty mình đang cắt giảm budget. Bạn có thể giảm 20% không? Mình vẫn muốn tiếp tục với bên bạn."`,
      setup: `Hợp đồng đã ký, giá đã confirmed. Giảm 20% sẽ ảnh hưởng đến margin và bạn sẽ phải giải thích với sếp tại sao. Nhưng nếu không giảm, chị Mai có thể dừng project — và bạn mất toàn bộ.\n\nChị Mai là khách hàng đã làm 2 project trước đó. Relationship lâu dài.\n\nBạn xử lý thế nào?`,
      choices: [
        {
          id: 'A',
          label: 'Giữ giá, offer giảm scope',
          action: '"Chị Mai ơi, giá trong hợp đồng em không thể thay đổi được — nhưng nếu budget chị bị cắt, mình có thể xem lại scope để phù hợp với budget mới. Chị muốn ngồi lại xem bỏ phần nào không ạ?"',
        },
        {
          id: 'B',
          label: 'Negotiate: giảm ít hơn đổi lấy điều kiện',
          action: '"Chị ơi, em có thể giảm 10% nếu chị có thể thanh toán 50% upfront ngay tuần này — điều đó giúp em về dòng tiền và mình cùng tìm được điểm giữa."',
        },
        {
          id: 'C',
          label: 'Đồng ý giảm để giữ client',
          action: '"Dạ chị, vì mình đã làm việc lâu dài với nhau nên em sẽ support chị. Em giảm được 20% cho lần này."',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Chị Mai suy nghĩ, rồi hỏi "bỏ phần nào thì còn làm được gì?" Conversation chuyển sang prioritization.',
          later: 'Scope giảm 25%, giá giảm 20% tương ứng. Hợp đồng adjust. Cả hai giữ được margin và relationship.',
        },
        {
          choiceId: 'B',
          immediate: 'Chị Mai im lặng, rồi nói "để chị xem với sếp." Gọi lại 1 ngày sau: "Được, chị đồng ý."',
          later: 'Cash flow tốt hơn. Margin giảm nhẹ nhưng chấp nhận được. Chị Mai tôn trọng bạn vì negotiate fair, không cho không.',
        },
        {
          choiceId: 'C',
          immediate: 'Chị Mai cảm ơn, vui vẻ.',
          later: 'Project tiếp theo chị Mai hỏi: "Bạn có thể giảm thêm không, lần trước cũng giảm được mà?" Precedent đã được set.',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A — hợp đồng là hợp đồng, nhưng offer giải pháp thay thế. Đây là approach cứng rắn nhưng fair. Điều cần lưu ý: tone phải warm, không lạnh. "Em không thể" + "nhưng mình có thể xem lại cùng nhau" = professional và relationship-preserving.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn C hoặc B — muốn giữ chị Mai happy và relationship lâu dài. Điều cần lưu ý: C generous nhưng tạo bad precedent. B là điểm giữa tốt — bạn give một thứ (10%) và get một thứ (upfront payment). Give-and-take maintain respect.',
        },
        {
          group: 'NF',
          text: 'Bạn cảm nhận được chị Mai đang thật sự khó khăn về budget và muốn giúp. Điều cần lưu ý: giúp theo cách bền vững. A (reduce scope) hoặc B (negotiate fair) đều là cách giúp thật — chị Mai cũng học được cách làm việc với budget constraint mà không expect vendor absorb toàn bộ.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy đây là negotiation, không phải favor request. B là move tối ưu nhất — give 10%, get upfront, signal bạn là người negotiate fair. Điều cần lưu ý: đừng để B thành drawn-out negotiation. Offer một lần, rõ ràng, chờ quyết định.',
        },
      ],
      mirrorMoment: 'Bạn đã từng giảm giá hoặc nhượng bộ vì "giữ quan hệ" chưa? Nhìn lại, điều đó có tốt cho cả hai phía không?',
    },

    // ══════════════════════════════
    // ĐỐI TÁC (DT)
    // ══════════════════════════════

    {
      id: 'DT-01',
      role: 'DT',
      title: 'Đối Tác Giao Hàng Trễ Ảnh Hưởng Deadline',
      tags: ['partner', 'deadline', 'dependency', 'accountability'],
      hook: `Bên đối tác cam kết giao API documentation vào thứ Tư. Giờ là thứ Tư 4 giờ chiều. Không có email, không có file. Team dev của bạn đang chờ để bắt đầu integration.\n\nBạn nhắn anh Khoa — contact bên đối tác: "Anh ơi, doc đâu rồi ạ?" Anh Khoa reply sau 2 tiếng: "Ừ em, bên anh đang finalize, chiều nay gửi nhé." Bây giờ là 6 giờ tối.`,
      setup: `Deadline của bạn với client là thứ Sáu tuần này. Nếu không có doc hôm nay, team dev cần ít nhất 1.5 ngày để integrate — không còn kịp thứ Sáu.\n\nAnh Khoa không phải người xấu — chỉ là bên anh cũng đang quá tải. Nhưng commitment của anh ảnh hưởng trực tiếp đến commitment của bạn với client.\n\nBạn làm gì ngay lúc này?`,
      choices: [
        {
          id: 'A',
          label: 'Escalate lên cấp cao hơn bên đối tác',
          action: 'Gọi thẳng cho manager của anh Khoa — anh Nam: "Anh Nam ơi, em cần update về API doc — bên em có deadline thứ Sáu và cần doc tối nay để kịp."',
        },
        {
          id: 'B',
          label: 'Cho anh Khoa deadline cứng + consequence',
          action: '"Anh Khoa ơi, em cần doc trước 8 giờ tối nay — nếu không bên em phải báo client là deadline thứ Sáu sẽ trễ, và em sẽ cần note lại trong biên bản dự án. Anh có thể đảm bảo được không?"',
        },
        {
          id: 'C',
          label: 'Tự xử, giảm scope để kịp deadline',
          action: 'Không push thêm anh Khoa. Họp team tìm cách làm integration với partial info, cắt bớt tính năng để kịp thứ Sáu.',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Anh Nam gọi lại trong 30 phút: "Anh xin lỗi, để anh xử lý ngay." Doc được gửi lúc 7:30 tối.',
          later: 'Deadline giữ được. Nhưng anh Khoa biết bạn đã gọi cho sếp anh — lần sau anh thận trọng hơn, nhưng cũng defensive hơn trong communication.',
        },
        {
          choiceId: 'B',
          immediate: 'Anh Khoa reply ngay: "Em ơi, doc xong rồi nhưng cần review nội bộ thêm 30 phút." Gửi lúc 7 giờ.',
          later: 'Deadline giữ được. Anh Khoa hiểu bạn serious về commitment — lần sau giao sớm hơn. Relationship không bị ảnh hưởng nhiều.',
        },
        {
          choiceId: 'C',
          immediate: 'Team làm với partial info. Một số assumption sai, phải làm lại.',
          later: 'Deliver thứ Sáu nhưng có 3 bugs lớn từ wrong assumption. Client phàn nàn. Bạn giải thích "đối tác giao trễ" — client nói "đó là vấn đề internal của bên bạn."',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A hoặc B — escalate hoặc set hard deadline. Cả hai đều hợp lý. Điều cần lưu ý: A hiệu quả nhanh nhưng có relationship cost với anh Khoa. B cho anh Khoa một cơ hội cuối — ít cost hơn nếu anh Khoa deliver.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn C hoặc B — không muốn làm anh Khoa khó chịu hoặc escalate. Điều cần lưu ý: C absorb toàn bộ hậu quả của bên đối tác vào team của bạn — không fair và không bền. B là cách professional nhất để hold partner accountable mà không destroy relationship.',
        },
        {
          group: 'NF',
          text: 'Bạn hiểu anh Khoa đang bận và không muốn thêm áp lực. Điều cần lưu ý: B — khi bạn nói rõ consequence ("phải báo client là trễ") — không phải threat mà là thông tin thật. Bạn đang cho anh Khoa đủ context để prioritize đúng.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy ngay: đây là dependency risk đã hiện thực hóa. B là response tốt nhất — rõ ràng, có consequence cụ thể, cho đối tác cơ hội cuối. Điều cần lưu ý: sau khi resolve, document lại incident và add buffer vào contract khi làm việc với đối tác này lần sau.',
        },
      ],
      mirrorMoment: 'Bạn có phụ thuộc vào bên thứ ba nào mà không có contingency plan nếu họ trễ không? Bạn sẽ làm gì nếu điều đó xảy ra ngày mai?',
    },

    {
      id: 'DT-02',
      role: 'DT',
      title: 'Đối Tác Muốn Thay Đổi Điều Khoản Giữa Chừng',
      tags: ['partner', 'contract-change', 'negotiation', 'trust'],
      hook: `Project đang chạy tháng thứ 2. Chị Linh — bên đối tác — gửi email: "Bên mình muốn điều chỉnh revenue share từ 70/30 thành 60/40 từ tháng sau. Mong bên bạn thông cảm vì chi phí vận hành của mình tăng."\n\nHợp đồng ký 70/30 — bên bạn 70%. Điều này không có trong agreement ban đầu.`,
      setup: `Đây là đối tác cung cấp technology platform — bạn không thể dễ dàng switch. Switching cost ước tính 3 tháng rebuild. Nhưng nếu bạn chấp nhận, margin của bạn giảm đáng kể và bạn tạo tiền lệ "hợp đồng có thể thay đổi giữa chừng."\n\nChị Linh không hostile — chỉ đang cố manage cost của bên cô ấy. Nhưng cách cô ấy handle là unilateral decision, không phải negotiation.\n\nBạn xử lý thế nào?`,
      choices: [
        {
          id: 'A',
          label: 'Giữ contract, yêu cầu negotiate đúng cách',
          action: '"Chị Linh ơi, hợp đồng hiện tại là 70/30 cho đến hết term. Nếu chị muốn renegotiate cho contract mới từ tháng 7, em sẵn sàng ngồi lại bàn — nhưng cho term này mình cần giữ đúng agreement đã ký."',
        },
        {
          id: 'B',
          label: 'Counter-offer có điều kiện',
          action: '"Chị ơi, em hiểu chi phí tăng là khó khăn thật. Nếu chị có thể provide thêm [tính năng X] mà mình đang cần, em có thể xem xét adjust sang 65/35. Không thì mình cần giữ nguyên hợp đồng hiện tại."',
        },
        {
          id: 'C',
          label: 'Chấp nhận để giữ relationship',
          action: '"Dạ chị, bên em hiểu. Mình đồng ý 60/40 từ tháng sau."',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Chị Linh reply sau 1 ngày: "Dạ, để chị confirm lại với team." Sau 3 ngày: "Ok bên mình giữ 70/30 cho term này, mình sẽ discuss về contract mới sau."',
          later: 'Term hiện tại giữ đúng. Khi đến lúc renew, bạn vào negotiation với position rõ ràng. Chị Linh tôn trọng bạn vì bạn biết hold ground.',
        },
        {
          choiceId: 'B',
          immediate: 'Chị Linh suy nghĩ 2 ngày, quay lại: "Tính năng X thì bên mình đang roadmap Q3, chưa chắc." Negotiation mở ra.',
          later: 'Sau 1 tuần negotiate, arrive tại 68/32 + chị Linh commit deliver tính năng X trong Q3. Cả hai đều give và get.',
        },
        {
          choiceId: 'C',
          immediate: 'Chị Linh cảm ơn, "bên mình appreciate sự linh hoạt của bạn."',
          later: 'Tháng sau, chị Linh email: "Bên mình cần adjust thêm payment term — thay vì net 30 thành net 45." Bạn đã set precedent là flexible với unilateral change.',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A — hợp đồng là hợp đồng. Đây là position đúng về mặt legal và principle. Điều cần lưu ý: tone không cần aggressive. "Mình cần giữ đúng agreement" + "nhưng sẵn sàng negotiate cho term mới" là vừa firm vừa forward-looking.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn C hoặc B — không muốn conflict với đối tác. Điều cần lưu ý: B là way to go nếu bạn muốn accommodate — nhưng đi kèm counter, không give không. C giải quyết ngay hôm nay nhưng signal bạn có thể bị leverage tiếp.',
        },
        {
          group: 'NF',
          text: 'Bạn hiểu chị Linh đang khó khăn thật và muốn giúp. Điều cần lưu ý: B cho phép bạn help (bằng cách accept một phần) trong khi vẫn maintain fairness. Đây là "đồng cảm có cấu trúc" — không phải từ chối, không phải give away.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy đây là precedent problem: accept một lần = open door cho lần sau. A là move tốt nhất về dài hạn. Điều cần lưu ý: sau khi giữ được term, chủ động propose renew negotiation sớm — cho chị Linh thấy bạn không phải inflexible, chỉ là cần process đúng.',
        },
      ],
      mirrorMoment: 'Bạn có điều khoản nào trong hợp đồng với đối tác hoặc vendor đang không được thực hiện đúng không? Bạn có đang để ngỏ vì "giữ quan hệ"?',
    },

    {
      id: 'DT-03',
      role: 'DT',
      title: 'Đối Tác Nhận Credit Của Collaboration',
      tags: ['credit', 'partnership', 'PR', 'visibility'],
      hook: `Hai bên vừa ra mắt sản phẩm collaboration thành công. Bên đối tác — công ty lớn hơn — ra press release ghi: "Chúng tôi tự hào ra mắt [sản phẩm] — kết quả của nỗ lực đội ngũ chúng tôi." Tên công ty bạn không được nhắc đến.`,
      setup: `Thỏa thuận ban đầu là "co-marketing" — hai bên cùng được mention. Bạn đã contribute 60% technical work. Press release của họ đang được share rộng rãi trên LinkedIn và báo chí.\n\nNếu bạn lên tiếng, có thể ảnh hưởng relationship với đối tác lớn. Nếu bạn không lên tiếng, team của bạn thấy công sức không được recognize — và bạn mất cơ hội visibility quan trọng.\n\nBạn xử lý thế nào?`,
      choices: [
        {
          id: 'A',
          label: 'Liên hệ ngay, yêu cầu update',
          action: '"Chị ơi, em thấy press release chưa mention tên bên em như thỏa thuận co-marketing. Chị có thể update và share lại không — hoặc bên em có thể tự ra press release riêng mention collaboration này?"',
        },
        {
          id: 'B',
          label: 'Tự ra content của mình',
          action: 'Không contact đối tác. Tự viết LinkedIn post và press release của công ty mình, mention collaboration và technical contribution — không cần xin phép vì đây là thông tin đúng sự thật.',
        },
        {
          id: 'C',
          label: 'Để qua, focus vào next project',
          action: 'Không làm gì. Coi đây là cost of doing business với công ty lớn hơn. Focus vào leverage relationship cho project tiếp theo.',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Chị PM bên đối tác xin lỗi — "bên mình quên mất, để chị fix ngay." Update được post trong 1 ngày.',
          later: 'Tên công ty bạn được mention. Team của bạn thấy bạn advocate cho họ. Relationship với đối tác không bị ảnh hưởng — thực ra tốt hơn vì bạn communicate thẳng thắn.',
        },
        {
          choiceId: 'B',
          immediate: 'Post của bạn được share. Một số người tag cả hai công ty.',
          later: 'Đối tác nhìn thấy — không comment gì nhưng biết bạn đã "self-announce." Lần sau họ careful hơn về co-marketing agreement với bạn.',
        },
        {
          choiceId: 'C',
          immediate: 'Không gì xảy ra với press release.',
          later: 'Một tháng sau, khi pitch client mới, bạn không thể dùng case study này vì không có public record của contribution. Team cảm thấy công sức không được nhìn nhận.',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A — thỏa thuận không được giữ, cần correct ngay. Đây là approach đúng và direct. Điều cần lưu ý: giả định trước đây là "họ quên" không phải "họ cố tình" — tone của A nên là clarification, không phải accusation.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn C — không muốn gây friction với đối tác lớn. Điều cần lưu ý: C có cost thật với team của bạn (morale) và với business (lost visibility). A là cách address mà không phải confrontation — chỉ là nhắc nhở professional.',
        },
        {
          group: 'NF',
          text: 'Bạn lo cho team của mình và muốn công sức được nhìn nhận. Đây là lý do tốt để lên tiếng. Điều cần lưu ý: A là cách advocate cho team của bạn một cách professional nhất. B cũng okay nhưng better to give đối tác cơ hội fix trước khi tự announce.',
        },
        {
          group: 'NT',
          text: 'Bạn nhìn thấy đây là visibility và precedent problem. A giải quyết ngay và signal rõ bạn expect agreements được giữ. Điều cần lưu ý: sau khi resolve, document co-marketing clause rõ hơn trong contract tiếp theo — "partner will be mentioned by name in all public communications related to the project."',
        },
      ],
      mirrorMoment: 'Bạn có contribution nào chưa được recognized — bởi client, đối tác, hoặc nội bộ — mà bạn đang để ngỏ không? Điều gì đang giữ bạn lại?',
    },

    {
      id: 'DT-04',
      role: 'DT',
      title: 'Đối Tác Chia Sẻ Thông Tin Mật',
      tags: ['confidentiality', 'trust', 'NDA', 'ethics'],
      hook: `Trong cuộc họp brainstorm, anh Hào — bên đối tác — vô tình (hoặc không vô tình) kể chi tiết về pricing và strategy của một công ty khác mà anh đang làm việc cùng: "Bên C họ đang plan launch với giá X, anh biết vì anh vừa làm proposal cho họ tuần rồi."\n\nBạn nhận ra công ty C là competitor của bạn.`,
      setup: `Thông tin này valuable — bạn có thể dùng để adjust pricing hoặc timeline launch của mình. Nhưng anh Hào chia sẻ điều này có thể vi phạm NDA của anh với công ty C.\n\nNếu bạn dùng thông tin — bạn có lợi thế cạnh tranh từ nguồn không ethical. Nếu bạn không dùng — bạn đang bỏ qua intelligence quan trọng. Nhưng còn một câu hỏi khác: anh Hào có thể làm điều tương tự với thông tin của bạn không?\n\nBạn phản ứng thế nào trong meeting đó?`,
      choices: [
        {
          id: 'A',
          label: 'Dừng anh Hào lại',
          action: '"Anh Hào ơi, em nghĩ mình không nên tiếp tục phần này — thông tin về bên C có thể là confidential của họ. Mình quay lại focus vào project của mình nhé."',
        },
        {
          id: 'B',
          label: 'Nghe nhưng không dùng, raise sau',
          action: 'Để anh Hào nói, không interrupt. Sau meeting, gặp riêng: "Anh ơi, em muốn mention — thông tin về bên C anh share hôm nay, nếu họ biết sẽ không tốt cho anh. Em sẽ không dùng thông tin đó — và anh cũng nên cẩn thận hơn với client khác."',
        },
        {
          id: 'C',
          label: 'Nghe và note lại để dùng',
          action: 'Không interrupt. Sau meeting, share với team để adjust strategy.',
        },
      ],
      consequences: [
        {
          choiceId: 'A',
          immediate: 'Anh Hào dừng lại, hơi bối rối: "Ừ, anh cũng nghĩ thế. Thôi mình qua phần khác." Meeting tiếp tục.',
          later: 'Anh Hào tôn trọng bạn vì bạn có principle. Đồng thời, anh Hào biết bạn sẽ không exploit thông tin — và ngầm hiểu bạn cũng expect anh ấy giữ thông tin của bạn.',
        },
        {
          choiceId: 'B',
          immediate: 'Anh Hào nghe, im lặng một lúc: "Ừ anh hiểu, cảm ơn em nhắc." Không defensive.',
          later: 'Anh Hào appreciate bạn nói thẳng. Relationship tin tưởng hơn — anh biết bạn là người principled và cũng expect anh ấy phải principled.',
        },
        {
          choiceId: 'C',
          immediate: 'Không gì xảy ra trong meeting.',
          later: 'Bạn adjust pricing dựa trên thông tin. 3 tháng sau, công ty C phát hiện (qua một nguồn khác) rằng strategy của họ bị leak. Họ suspect anh Hào. Anh Hào bị mất hợp đồng với C. Bạn không bị involve trực tiếp — nhưng biết mình đã benefit từ điều không đúng.',
        },
      ],
      typeFeedback: [
        {
          group: 'ST',
          text: 'Bạn có xu hướng chọn A — dừng ngay, clear boundary. Đây là approach đúng và decisive. Điều cần lưu ý: không cần dramatic. "Em nghĩ mình không nên tiếp tục phần này" là đủ — không cần lecture anh Hào về NDA.',
        },
        {
          group: 'SF',
          text: 'Bạn có xu hướng chọn B — không muốn làm anh Hào awkward trước mặt mọi người, nhưng vẫn raise vấn đề. Đây là approach thoughtful. Điều cần lưu ý: B work nếu bạn thật sự không dùng thông tin đó — nếu bạn "nghe nhưng ghi nhớ," thì B chỉ là delayed C.',
        },
        {
          group: 'NF',
          text: 'Bạn cảm thấy uncomfortable ngay khi anh Hào bắt đầu nói — và cảm giác đó đúng. A hoặc B đều phù hợp với bạn. Điều cần lưu ý: câu hỏi "anh Hào có share thông tin của mình với người khác không?" là câu hỏi quan trọng — và A/B đều send signal rõ ràng về điều bạn expect.',
        },
        {
          group: 'NT',
          text: 'Bạn tính ngay lợi-hại: short-term gain (competitive intel) vs long-term risk (trust, ethics, nếu bị biết). C không phải risk-reward tốt. A hoặc B đều bảo vệ bạn và signal rõ về standard bạn expect từ đối tác.',
        },
      ],
      mirrorMoment: 'Bạn đã từng nhận được thông tin "nhạy cảm" từ người khác — về đối thủ, về người khác — mà bạn biết là không nên biết chưa? Bạn đã xử lý thế nào?',
    },

  ...(VAI_TRO_CASES as RolePlayCase[]),

]

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

/** Lấy tất cả case theo role (NV | MG | KH | DT | VT) */
export function getCasesByRole(role: CaseRole): RolePlayCase[] {
  return ROLEPLAY_CASES.filter(c => c.role === role)
}

/** Lấy case theo ngữ cảnh nội bộ (NV/MG) hoặc kinh doanh (KH/DT) */
export function getCasesByContext(context: 'internal' | 'external'): RolePlayCase[] {
  if (context === 'internal') {
    return ROLEPLAY_CASES.filter(c => c.role === 'NV' || c.role === 'MG')
  }
  return ROLEPLAY_CASES.filter(c => c.role === 'KH' || c.role === 'DT')
}

/** Rút ngẫu nhiên n case theo role, tránh trùng với đã chơi */
export function getRandomCases(
  role: CaseRole,
  n: number,
  seenIds: string[] = []
): RolePlayCase[] {
  const pool = getCasesByRole(role).filter(c => !seenIds.includes(c.id))
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

/** Lấy type feedback cho MBTI type cụ thể */
export function getTypeFeedback(
  kase: RolePlayCase,
  mbtiType: string
): TypeFeedback | null {
  const group = getMbtiGroup(mbtiType)
  return kase.typeFeedback.find(f => f.group === group) ?? null
}

/** Map MBTI type → nhóm ST/SF/NF/NT */
export function getMbtiGroup(mbtiType: string): MbtiGroup {
  const type = mbtiType.toUpperCase()
  const isN = type.includes('N')
  const isT = type.includes('T')
  if (!isN && isT) return 'ST'
  if (!isN && !isT) return 'SF'
  if (isN && !isT) return 'NF'
  return 'NT'
}

/** Lấy consequence cho choice đã chọn */
export function getConsequence(
  kase: RolePlayCase,
  choiceId: 'A' | 'B' | 'C'
): Consequence | null {
  return kase.consequences.find(c => c.choiceId === choiceId) ?? null
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Số case free trước khi gate */
export const FREE_CASE_LIMIT = 5

/** Dexie key lưu số case đã chơi */
export const ROLEPLAY_COUNT_KEY = 'rolePlayCount'

/** Dexie key lưu ids case đã chơi (tránh lặp trong session) */
export const ROLEPLAY_SEEN_KEY = 'rolePlaySeenIds'
