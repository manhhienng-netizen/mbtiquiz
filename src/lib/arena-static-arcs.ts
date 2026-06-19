// STATIC_ARC_POOL — tập tĩnh cho free tier (tập 1 · 0 API cost)
// B6.5: 4 tập thật — Tâm (MG) · Hằng (KH) · Khoa (DT) · Minh (VT)

import type { ArcState } from './arena-arc'
import type { CaseRole, RolePlayCase } from '../data/roleplay-case-studies'

const STUB_ARC_TAM: RolePlayCase[] = [
  {
    id: 'arc-tam-01',
    role: 'MG',
    title: 'Tâm nhận thêm việc',
    tags: ['static-arc', 'tutorial'],
    hook: 'Tâm là nhân viên cứng của bạn. Hôm nay bạn cần giao thêm một dự án gấp, nhưng Tâm đang ôm nhiều việc.',
    setup: 'Bạn biết Tâm làm được, nhưng cậu ấy đang ôm khá nhiều việc rồi. Deadline dự án mới là tuần sau.',
    choices: [
      { id: 'A', label: 'Giao thẳng', action: 'Giao luôn vì tin Tâm làm được' },
      { id: 'B', label: 'Hỏi trước', action: 'Hỏi Tâm đang ôm bao nhiêu việc trước khi giao' },
      { id: 'C', label: 'San việc', action: 'San bớt việc cũ của Tâm cho người khác rồi mới giao' },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Tâm nhận nhưng im lặng.',
        later: 'Tuần sau Tâm trễ cả 2 việc, bắt đầu mệt mỏi.',
      },
      {
        choiceId: 'B',
        immediate: 'Tâm thành thật nói đang làm không xuể.',
        later: 'Hai bên cùng sắp xếp lại ưu tiên, Tâm tin tưởng hơn.',
      },
      {
        choiceId: 'C',
        immediate: 'Tâm nhẹ gánh, nhận việc mới.',
        later: 'Người nhận việc cũ lại thấy bị đùn việc, cần giải thích thêm.',
      },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Bạn chú trọng kết quả — nhớ xem người làm đang ôm bao nhiêu việc thật.' },
      { group: 'SF', text: 'Bạn quan tâm cảm xúc Tâm — đừng ngại hỏi thẳng bao nhiêu việc.' },
      { group: 'NF', text: 'Bạn tin Tâm làm tốt — nhớ gắn việc mới với chỗ cậu ấy muốn đi.' },
      { group: 'NT', text: 'Bạn hay chỉnh cách chia việc — xem lại team đang làm thế nào.' },
    ],
    mirrorMoment:
      'Bạn có hay giao việc cho người làm được nhất mà quên họ cũng có giới hạn không?',
  },
  {
    id: 'arc-tam-02',
    role: 'MG',
    title: 'Tâm bắt đầu trễ',
    tags: ['static-arc'],
    hook: 'Sau lần giao việc trước, Tâm bắt đầu có dấu hiệu trễ deadline. Cậu ấy vẫn nói "em ổn".',
    setup: 'Bạn để ý Tâm ở lại muộn liên tục. Chất lượng công việc bắt đầu giảm nhẹ.',
    choices: [
      { id: 'A', label: 'Nhắc deadline', action: 'Nhắc Tâm về deadline và hỏi khi nào xong' },
      { id: 'B', label: 'Hỏi thật', action: 'Hỏi riêng Tâm có thật sự ổn không' },
      { id: 'C', label: 'Chờ thêm', action: 'Tin Tâm tự xoay sở, không can thiệp' },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Tâm gật, hứa xong.',
        later: 'Tâm cố nốt nhưng kiệt sức dần, không nói ra.',
      },
      {
        choiceId: 'B',
        immediate: 'Tâm ngập ngừng rồi thừa nhận đang quá nhiều việc.',
        later: 'Bạn kịp điều chỉnh trước khi Tâm kiệt sức hẳn.',
      },
      {
        choiceId: 'C',
        immediate: 'Tâm tự xoay, tạm ổn.',
        later: 'Vài tuần sau Tâm xin nghỉ phép dài vì đuối.',
      },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Trễ deadline là dấu hiệu — nhưng chuyện thật thường nằm ở người, không phải số trên bảng.' },
      { group: 'SF', text: 'Bạn cảm nhận Tâm đang gồng — tin vào trực giác đó.' },
      { group: 'NF', text: 'Bạn thấy Tâm cần được lắng nghe hơn là bị nhắc.' },
      { group: 'NT', text: '"Em ổn" thường không đủ để tin — hỏi thêm hoặc nhìn việc làm.' },
    ],
    mirrorMoment: 'Khi ai đó nói "em ổn", bạn tin lời nói hay tin điều bạn quan sát?',
  },
  {
    id: 'arc-tam-03',
    role: 'MG',
    title: 'Tâm và quyết định cuối',
    tags: ['static-arc'],
    hook: 'Dự án sắp đến hạn. Tâm thừa nhận không kịp một phần. Sếp trên hỏi bạn về tiến độ.',
    setup: 'Bạn có thể che cho Tâm, đẩy trách nhiệm, hoặc nói thật và cùng tìm cách.',
    choices: [
      { id: 'A', label: 'Nhận thay', action: 'Nhận trách nhiệm trễ về mình trước sếp trên' },
      { id: 'B', label: 'Nói thật cùng nhau', action: 'Trình bày thật tình hình và phương án cùng Tâm' },
      { id: 'C', label: 'Đẩy cho Tâm', action: 'Nói rõ phần trễ là do Tâm xử lý chưa tốt' },
    ],
    consequences: [
      {
        choiceId: 'A',
        immediate: 'Sếp trên ghi nhận bạn dám nhận.',
        later: 'Tâm biết ơn nhưng cũng quen được che, ít tự chịu trách nhiệm.',
      },
      {
        choiceId: 'B',
        immediate: 'Sếp trên thấy bạn minh bạch.',
        later: 'Tâm học được cách đối diện, quan hệ tin cậy hơn.',
      },
      {
        choiceId: 'C',
        immediate: 'Bạn tránh được trách nhiệm trước mắt.',
        later: 'Tâm mất niềm tin, bắt đầu giữ khoảng cách với bạn.',
      },
    ],
    typeFeedback: [
      {
        group: 'ST',
        text: 'Rạch ròi trách nhiệm thì cần, nhưng cách bạn quy lỗi cho ai sẽ ảnh hưởng về lâu dài.',
      },
      { group: 'SF', text: 'Bạn muốn bảo vệ Tâm — cân nhắc giữa che chở và để cậu ấy trưởng thành.' },
      { group: 'NF', text: 'Đây là lúc quan hệ hai bạn sẽ đi hướng nào — chọn điều bạn muốn xây.' },
      { group: 'NT', text: 'Nói thật về lâu dài thường có lợi hơn che đậy trước mắt.' },
    ],
    mirrorMoment:
      'Khi cấp dưới mắc lỗi, bạn bảo vệ họ, bảo vệ mình, hay bảo vệ sự thật?',
  },
]

const STATIC_ARC_HANG: RolePlayCase[] = [
  {
    id: 'arc-hang-01',
    role: 'KH',
    title: 'Chị Hằng đổi yêu cầu',
    tags: ['static-arc', 'tutorial'],
    hook: 'Chị Hằng — khách hàng quan trọng — nhắn lúc 4 giờ chiều: "Em ơi đổi tông màu sang xanh nhé, chị thấy hợp hơn", dù mai là hạn giao.',
    setup: 'Bạn đã làm xong theo bản yêu cầu cũ. Đổi bây giờ tốn thêm nửa ngày. Chị Hằng là khách quen, hay đổi ý nhưng trả tiền đúng hạn.',
    choices: [
      { id: 'A', label: 'Đổi luôn', action: 'Đồng ý đổi ngay để chị Hằng vui' },
      { id: 'B', label: 'Hỏi rõ', action: 'Hỏi chị Hằng lý do đổi và đề xuất giữ bản cũ nếu hợp lý' },
      { id: 'C', label: 'Báo chi phí', action: 'Đồng ý đổi nhưng báo rõ phát sinh thời gian/chi phí' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Chị Hằng cảm ơn rối rít.', later: 'Chị quen việc đổi ý không mất gì, lần sau đổi nhiều hơn.' },
      { choiceId: 'B', immediate: 'Chị Hằng giải thích, hóa ra chỉ là cảm tính nhất thời.', later: 'Hai bên hiểu nhau hơn, nhưng chị hơi ngại vì bị "hỏi vặn".' },
      { choiceId: 'C', immediate: 'Chị Hằng hơi bất ngờ nhưng chấp nhận.', later: 'Ranh giới rõ ràng, chị tôn trọng hơn nhưng quan hệ bớt "thân tình".' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Bạn coi trọng hiệu quả — nói rõ chi phí từ đầu giúp mọi thứ rành mạch.' },
      { group: 'SF', text: 'Bạn muốn giữ chị Hằng vui — cân nhắc giữa chiều khách và làm bền lâu.' },
      { group: 'NF', text: 'Bạn thấy quan hệ dài hạn — đặt ranh giới cũng là tôn trọng nhau.' },
      { group: 'NT', text: 'Mỗi lần "miễn phí đổi ý" tạo tiền lệ — về sau khách sẽ đòi thêm.' },
    ],
    mirrorMoment: 'Khi khách quen yêu cầu thêm, bạn sợ mất lòng hay sợ tạo tiền lệ?',
  },
  {
    id: 'arc-hang-02',
    role: 'KH',
    title: 'Chị Hằng đổi tiếp',
    tags: ['static-arc'],
    hook: 'Vài ngày sau, chị Hằng lại nhắn đổi thêm một chi tiết nữa — lần này gần sát giờ in ấn.',
    setup: 'Cách bạn xử lần trước quyết luôn cách chị sẽ đòi hỏi lần này. Lịch in đã đặt, đổi nữa sẽ trễ.',
    choices: [
      { id: 'A', label: 'Chiều tiếp', action: 'Lại đổi để giữ hòa khí' },
      { id: 'B', label: 'Gợi gói sửa', action: 'Đề xuất gói chỉnh sửa có giới hạn lần để chị chủ động' },
      { id: 'C', label: 'Giữ lịch', action: 'Giải thích lịch in không lùi được, hẹn đổi đợt sau' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Kịp đổi nhưng bạn phải hủy lịch in, đặt lại.', later: 'Chi phí in tăng, bạn gánh phần chênh để giữ khách.' },
      { choiceId: 'B', immediate: 'Chị Hằng thấy hợp lý, chọn gói 3 lần sửa.', later: 'Quan hệ chuyên nghiệp hơn, nhưng cần bạn theo dõi số lần chặt chẽ.' },
      { choiceId: 'C', immediate: 'Chị Hằng hơi hụt hẫng nhưng hiểu.', later: 'Bạn giữ được lịch và chi phí, chị học cách quyết sớm hơn.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Quy trình rõ (gói sửa) bảo vệ cả hai bên khỏi phát sinh vô tận.' },
      { group: 'SF', text: 'Bạn ngại làm chị buồn — nhưng chiều mãi khiến chính bạn chịu thiệt.' },
      { group: 'NF', text: 'Bạn tìm giải pháp đôi bên cùng thoải mái — gói sửa là hướng đó.' },
      { group: 'NT', text: 'Thỏa thuận rõ phần sửa giúp đoán được chi phí và thời gian.' },
    ],
    mirrorMoment: 'Bạn có đang âm thầm gánh chi phí cho sự nể nang của mình không?',
  },
  {
    id: 'arc-hang-03',
    role: 'KH',
    title: 'Chị Hằng xin giảm giá',
    tags: ['static-arc'],
    hook: 'Cuối dự án, chị Hằng nói: "Em ơi lần này nhiều việc quá, chị thấy hơi quá ngân sách, em giảm cho chị chút nhé?"',
    setup: 'Phần "nhiều việc" phần lớn do chị đổi ý. Giảm giá ảnh hưởng lợi nhuận; không giảm có thể mất khách quen.',
    choices: [
      { id: 'A', label: 'Giảm luôn', action: 'Giảm giá để giữ quan hệ' },
      { id: 'B', label: 'Giải thích', action: 'Cho chị xem bảng phát sinh do đổi ý, đề xuất giữ giá' },
      { id: 'C', label: 'Giảm có điều kiện', action: 'Giảm nhẹ lần này, kèm thỏa thuận rõ cho dự án sau' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Chị Hằng vui, cảm ơn.', later: 'Chị mặc định lần sau cũng xin giảm; bạn khó giữ giá.' },
      { choiceId: 'B', immediate: 'Chị im lặng đọc bảng, hơi ngượng.', later: 'Chị hiểu giá trị công việc hơn, nhưng có thể thấy "sòng phẳng quá".' },
      { choiceId: 'C', immediate: 'Chị Hằng đồng ý điều kiện cho lần sau.', later: 'Bạn vừa giữ khách vừa lập được nguyên tắc rõ cho lần sau.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Số liệu phát sinh là căn cứ rõ — dùng nó thay vì cảm tính.' },
      { group: 'SF', text: 'Bạn muốn giữ tình — nhưng giá trị công việc cũng cần được tôn trọng.' },
      { group: 'NF', text: 'Thỏa thuận có điều kiện giữ được cả quan hệ lẫn nguyên tắc.' },
      { group: 'NT', text: 'Nhượng bộ không điều kiện tạo kỳ vọng sai cho lần làm việc sau.' },
    ],
    mirrorMoment: 'Giữa "giữ khách" và "giữ giá trị công việc", bạn ưu tiên điều gì — và vì sao?',
  },
  {
    id: 'arc-hang-04',
    role: 'KH',
    title: 'Chị Hằng giới thiệu khách mới',
    tags: ['static-arc'],
    hook: 'Chị Hằng giới thiệu một khách lớn cho bạn, nhưng nói nhỏ: "Khách này khó tính lắm, em chiều chị thế nào thì chiều bạn chị vậy nhé."',
    setup: 'Đây là cơ hội lớn. Nhưng "chiều như chị" có thể nghĩa là lặp lại vòng đổi-ý vô giới hạn với một khách còn khó hơn.',
    choices: [
      { id: 'A', label: 'Nhận mọi điều kiện', action: 'Đồng ý chiều hết để không mất cơ hội và lòng chị Hằng' },
      { id: 'B', label: 'Đặt khung từ đầu', action: 'Cảm ơn chị, nhưng nói rõ cách làm việc chuyên nghiệp của bạn với khách mới' },
      { id: 'C', label: 'Từ chối khéo', action: 'Cảm ơn và xin hẹn dịp khác nếu thấy chưa phù hợp năng lực hiện tại' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Chị Hằng hài lòng, kết nối ngay.', later: 'Bạn rơi vào vòng chiều chuộng với 2 khách cùng lúc, kiệt sức và lợi nhuận mỏng.' },
      { choiceId: 'B', immediate: 'Chị hơi bất ngờ, khách mới thì đánh giá cao sự rõ ràng.', later: 'Bạn dựng được uy tín chuyên nghiệp, dù chị Hằng cảm thấy bạn "cứng" hơn xưa.' },
      { choiceId: 'C', immediate: 'Chị Hằng tiếc nhưng tôn trọng.', later: 'Bạn giữ được năng lượng cho việc hiện tại, nhưng bỏ lỡ cơ hội mở rộng.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Khung làm việc rõ từ đầu tiết kiệm rất nhiều rắc rối về sau.' },
      { group: 'SF', text: 'Lòng biết ơn chị Hằng là thật — nhưng đừng để nó quyết hết cách bạn làm.' },
      { group: 'NF', text: 'Chỉ nên nhận khi vừa sức và vừa cách bạn muốn làm — đừng nhận hết mọi thứ.' },
      { group: 'NT', text: 'Nhận thêm khách mà không đặt điều kiện rõ thì rủi ro tăng gấp đôi, còn lợi nhuận thì chưa chắc.' },
    ],
    mirrorMoment: 'Khi một cơ hội đến kèm điều kiện khiến bạn phải thành người dễ dãi hơn, bạn đánh đổi tới đâu?',
  },
]

const STATIC_ARC_KHOA: RolePlayCase[] = [
  {
    id: 'arc-khoa-01',
    role: 'DT',
    title: 'Agency giao trễ',
    tags: ['static-arc', 'tutorial'],
    hook: 'Anh Khoa bên agency hẹn giao bản thiết kế 5 giờ chiều. Đến 7 giờ tối vẫn chưa có, mai bạn phải trình sếp.',
    setup: 'Anh Khoa là đối tác lâu năm, làm tốt nhưng hay trễ. Bạn cần bản này gấp nhưng cũng không muốn căng với họ.',
    choices: [
      { id: 'A', label: 'Giục gấp', action: 'Nhắn giục liên tục, yêu cầu giao ngay trong tối' },
      { id: 'B', label: 'Hỏi tình hình', action: 'Gọi hỏi anh Khoa đang vướng gì và cần gì để xong' },
      { id: 'C', label: 'Tự xoay', action: 'Tự làm bản tạm để mai có cái trình, không phiền anh Khoa' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Anh Khoa giao lúc 11 giờ đêm, có vài lỗi do làm vội.', later: 'Anh Khoa thấy áp lực, lần sau làm máy móc đúng giờ nhưng kém sáng tạo.' },
      { choiceId: 'B', immediate: 'Anh Khoa thật ra kẹt vì bản yêu cầu chưa rõ một điểm.', later: 'Hai bên gỡ được nút thắt, quan hệ tin cậy hơn nhưng tối nay vẫn trễ.' },
      { choiceId: 'C', immediate: 'Bạn có bản tạm để trình.', later: 'Anh Khoa quen được bạn "cứu", càng ỷ lại về sau.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Hỏi nguyên nhân cụ thể thường hiệu quả hơn là chỉ giục tiến độ.' },
      { group: 'SF', text: 'Bạn ngại làm anh Khoa khó xử — nhưng im lặng tự gánh không bền.' },
      { group: 'NF', text: 'Hiểu vướng mắc thật của đối tác mở ra giải pháp tốt hơn ép buộc.' },
      { group: 'NT', text: '"Tự xoay" xong việc trước mắt, nhưng về sau thành ra chẳng ai rõ phần việc là của mình.' },
    ],
    mirrorMoment: 'Khi đối tác trễ, bạn giục kết quả hay tìm hiểu nguyên nhân?',
  },
  {
    id: 'arc-khoa-02',
    role: 'DT',
    title: 'Lỗi lặp lại',
    tags: ['static-arc'],
    hook: 'Lần này anh Khoa giao đúng giờ, nhưng bản thiết kế sai một chi tiết thương hiệu mà bạn đã dặn kỹ.',
    setup: 'Lỗi rõ ràng thuộc về agency. Buổi họp với sếp là sáng mai. Bắt lỗi gắt có thể làm rạn quan hệ.',
    choices: [
      { id: 'A', label: 'Nói thẳng lỗi', action: 'Chỉ rõ lỗi và yêu cầu sửa ngay, nhấn mạnh đã dặn trước' },
      { id: 'B', label: 'Cùng rà lại', action: 'Gọi anh Khoa cùng rà bản yêu cầu, xác định chỗ hiểu lệch' },
      { id: 'C', label: 'Tự sửa nhanh', action: 'Tự sửa chi tiết đó cho kịp họp, nói với anh Khoa sau' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Anh Khoa sửa ngay nhưng thấy bị "bắt lỗi" hơi gắt.', later: 'Chất lượng đảm bảo, nhưng anh Khoa giữ khoảng cách, ít chủ động đề xuất.' },
      { choiceId: 'B', immediate: 'Hóa ra bản yêu cầu có một câu gây hiểu nhầm.', later: 'Cả hai cải thiện cách viết yêu cầu, lỗi tương tự ít lặp lại.' },
      { choiceId: 'C', immediate: 'Kịp họp, mọi thứ trôi chảy.', later: 'Anh Khoa không biết mình sai ở đâu nên có thể lặp lại lần sau.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Sửa lỗi quan trọng — nhưng tìm gốc lỗi (bản yêu cầu) ngăn nó tái diễn.' },
      { group: 'SF', text: 'Cách bạn chỉ lỗi ảnh hưởng đến việc đối tác có còn cởi mở không.' },
      { group: 'NF', text: 'Rà lại cùng nhau dễ biến lỗi thành chỗ hai bên hiểu nhau hơn.' },
      { group: 'NT', text: 'Tự sửa mà không báo lại thì mất luôn cơ hội để lần sau làm tốt hơn.' },
    ],
    mirrorMoment: 'Khi đối tác sai, bạn muốn họ "biết lỗi" hay muốn lỗi "không lặp lại"?',
  },
  {
    id: 'arc-khoa-03',
    role: 'DT',
    title: 'Agency xin tăng phí',
    tags: ['static-arc'],
    hook: 'Anh Khoa đề nghị tăng phí 20% cho giai đoạn tới: "Việc thực tế nhiều hơn dự kiến, bên anh đang lỗ."',
    setup: 'Một phần việc phát sinh do yêu cầu từ phía bạn. Đổi agency lúc này thì rủi ro, giữ thì chi phí đội lên.',
    choices: [
      { id: 'A', label: 'Đồng ý tăng', action: 'Chấp nhận mức tăng để giữ đối tác quen việc' },
      { id: 'B', label: 'Thương lượng', action: 'Rà lại phần phát sinh từng bên, thương lượng mức công bằng' },
      { id: 'C', label: 'Giữ giá cũ', action: 'Yêu cầu giữ giá theo hợp đồng, phần phát sinh tính riêng' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Anh Khoa cảm kích.', later: 'Bạn chi phí đội lên; lần sau agency cũng dễ đề xuất tăng tiếp.' },
      { choiceId: 'B', immediate: 'Hai bên ngồi lại, chia rõ phần ai gây phát sinh.', later: 'Mức phí công bằng hơn, nhưng mất thời gian và cần số liệu rõ ràng.' },
      { choiceId: 'C', immediate: 'Anh Khoa hơi căng nhưng theo đúng hợp đồng.', later: 'Bạn kiểm soát được chi phí, nhưng agency làm vừa đủ, ít "đi xa hơn".' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Hợp đồng và số liệu phát sinh là căn cứ thương lượng vững nhất.' },
      { group: 'SF', text: 'Bạn thông cảm anh Khoa lỗ — nhưng công bằng hai chiều mới bền.' },
      { group: 'NF', text: 'Ngồi thương lượng đàng hoàng giữ được cả quan hệ lẫn ngân sách.' },
      { group: 'NT', text: 'Tách bạch rõ phần nào do ai gây ra, tránh trả tiền cho phần không phải của mình.' },
    ],
    mirrorMoment: 'Khi đối tác xin thêm vì khó khăn của họ, bạn phân biệt thế nào giữa cảm thông và bị tận dụng?',
  },
  {
    id: 'arc-khoa-04',
    role: 'DT',
    title: 'Đổi hay giữ đối tác',
    tags: ['static-arc'],
    hook: 'Một agency mới chào giá rẻ hơn 30% và cam kết đúng hạn. Nhưng anh Khoa vừa cùng bạn vượt qua một dự án khó, hiểu rõ thương hiệu của bạn.',
    setup: 'Đây là quyết định lớn: rẻ hơn hay quen biết nhau lâu năm. Cả hai hướng đều có cái mất rõ ràng.',
    choices: [
      { id: 'A', label: 'Đổi sang mới', action: 'Chọn agency mới vì chi phí và cam kết tốt hơn' },
      { id: 'B', label: 'Giữ anh Khoa', action: 'Ở lại với anh Khoa vì sự thấu hiểu và quan hệ đã xây' },
      { id: 'C', label: 'Thử song song', action: 'Giao một phần việc nhỏ cho agency mới để so sánh thực tế trước khi quyết' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Tiết kiệm chi phí ngay.', later: 'Agency mới mất vài tháng để hiểu thương hiệu; vài lỗi nhận diện xảy ra giai đoạn đầu.' },
      { choiceId: 'B', immediate: 'Anh Khoa cảm động, làm hết mình.', later: 'Bạn trả chi phí cao hơn thị trường, đôi khi tự hỏi mình có đang "trả cho quá khứ".' },
      { choiceId: 'C', immediate: 'Bạn có kết quả thật để so sánh.', later: 'Quản lý hai đối tác cùng lúc tốn công, và anh Khoa có thể cảm thấy bị "thử".' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Thử có kiểm soát để có kết quả thật trước khi quyết lớn.' },
      { group: 'SF', text: 'Lòng trung thành đáng quý — nhưng cân nhắc nó với lợi ích chung của công việc.' },
      { group: 'NF', text: 'Quan hệ lâu năm đáng quý theo cách khó nói thành tiền, nhưng đừng để nó che mất lựa chọn tốt hơn.' },
      { group: 'NT', text: 'Chi phí để đối tác mới hiểu thương hiệu thường bị bỏ quên khi so giá.' },
    ],
    mirrorMoment: 'Khi chọn giữa "rẻ và mới" với "đắt và hiểu mình", bạn coi mối quen biết lâu năm đáng bao nhiêu?',
  },
]

const STATIC_ARC_MINH: RolePlayCase[] = [
  {
    id: 'arc-minh-01',
    role: 'VT',
    title: 'Minh vẫn coi bạn ngang hàng',
    tags: ['static-arc', 'tutorial'],
    hook: 'Bạn vừa lên trưởng nhóm. Minh — đồng nghiệp cũ chơi thân — vẫn nhờ bạn "duyệt nhanh giùm cái này như mọi khi nhé", bỏ qua quy trình mới.',
    setup: 'Minh giỏi và thân với bạn. Nhưng nếu bạn phá lệ cho Minh, cả nhóm sẽ thấy và bắt chước.',
    choices: [
      { id: 'A', label: 'Duyệt nhanh', action: 'Duyệt giùm như cũ để giữ tình bạn' },
      { id: 'B', label: 'Nói rõ vai trò', action: 'Giải thích vai trò mới và mong Minh theo quy trình chung' },
      { id: 'C', label: 'Linh hoạt lần này', action: 'Duyệt lần này nhưng nói rõ từ sau theo quy trình' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Minh vui, mọi thứ như cũ.', later: 'Vài người trong nhóm thấy, bắt đầu xin "ngoại lệ" tương tự.' },
      { choiceId: 'B', immediate: 'Minh hơi hụt hẫng, thấy bạn "đổi khác".', later: 'Nhóm thấy bạn công bằng, nhưng bạn cần thời gian hàn gắn với Minh.' },
      { choiceId: 'C', immediate: 'Minh ổn với thỏa thuận.', later: 'Ranh giới hơi mờ; Minh có thể thử "lần này nữa thôi" lần sau.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Quy trình áp dụng nhất quán giúp cả nhóm rõ luật chơi.' },
      { group: 'SF', text: 'Bạn quý tình bạn với Minh — nhưng công bằng với cả nhóm cũng là cách giữ Minh lâu dài.' },
      { group: 'NF', text: 'Nói rõ vai trò không phải phản bội tình bạn, mà là nói lại cho rõ tình bạn giờ khác.' },
      { group: 'NT', text: 'Một ngoại lệ cho người thân tạo tiền lệ khó kiểm soát cho cả nhóm.' },
    ],
    mirrorMoment: 'Khi lên vai trò mới, bạn sợ mất tình bạn cũ hay sợ không công bằng với cả nhóm?',
  },
  {
    id: 'arc-minh-02',
    role: 'VT',
    title: 'Minh lách quy trình',
    tags: ['static-arc'],
    hook: 'Minh vẫn quen làm tắt cho nhanh, bỏ qua vài bước để xong sớm, khiến số liệu báo cáo của nhóm bắt đầu lệch.',
    setup: 'Cách Minh làm nhanh nhưng khiến số liệu nhóm không còn khớp nhau. Bạn chịu trách nhiệm trước sếp trên.',
    choices: [
      { id: 'A', label: 'Nhắc riêng', action: 'Gặp riêng Minh, khẳng định tôn trọng kinh nghiệm nhưng quy trình là bắt buộc' },
      { id: 'B', label: 'Cùng cải tiến', action: 'Nhờ Minh cùng chỉnh quy trình cho vừa nhanh vừa đúng chuẩn' },
      { id: 'C', label: 'Chỉ ra số liệu', action: 'Đưa Minh xem chỗ số liệu lệch, hỏi cách khắc phục' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Minh đồng ý nhưng thái độ xa cách hơn.', later: 'Quy trình được đảm bảo, nhưng bạn cần xây lại quan hệ riêng với Minh.' },
      { choiceId: 'B', immediate: 'Minh hào hứng đóng góp, thấy được coi trọng.', later: 'Minh có thể tự ý sửa quy trình theo ý mình, cần bạn giữ cho khớp với người khác.' },
      { choiceId: 'C', immediate: 'Minh nhận ra vấn đề, tự sửa để giữ uy tín.', later: 'Quan hệ giữ tự nhiên, nhưng Minh vẫn lách nếu thấy lỗi không gây hậu quả ngay.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Số liệu lệch là tín hiệu rõ — dùng nó thay vì cảm tính.' },
      { group: 'SF', text: 'Bạn muốn giữ hòa khí với Minh — nhưng tránh né vấn đề khiến nó lớn hơn.' },
      { group: 'NF', text: 'Mời Minh cùng chỉnh quy trình hay hơn là chỉ ra lệnh.' },
      { group: 'NT', text: 'Để Minh tự thấy hậu quả với cả nhóm thường hiệu quả hơn ra lệnh.' },
    ],
    mirrorMoment: 'Với người giỏi nhưng phá luật, bạn ưu tiên giữ hiệu quả của họ hay giữ cho mọi người làm cùng một chuẩn?',
  },
  {
    id: 'arc-minh-03',
    role: 'VT',
    title: 'Minh phản đối trong họp',
    tags: ['static-arc'],
    hook: 'Trong cuộc họp nhóm, Minh công khai phản đối một quyết định của bạn: "Hồi xưa mình đâu làm thế, sao giờ phức tạp vậy?"',
    setup: 'Cả nhóm đang nhìn. Cách bạn phản ứng quyết luôn người mới làm trưởng trông ra sao — và quan hệ với Minh.',
    choices: [
      { id: 'A', label: 'Trả lời ngay', action: 'Giải thích lý do quyết định ngay tại chỗ, giữ vững lập trường' },
      { id: 'B', label: 'Ghi nhận, hẹn bàn', action: 'Ghi nhận ý Minh, đề nghị bàn kỹ sau họp để không kéo dài' },
      { id: 'C', label: 'Mời cả nhóm góp', action: 'Mở cho cả nhóm thảo luận luôn về điểm Minh nêu' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Bạn giữ được thế, nhưng Minh thấy bị bác giữa đám đông.', later: 'Nhóm thấy bạn quyết đoán, nhưng Minh có thể âm thầm bất mãn.' },
      { choiceId: 'B', immediate: 'Cuộc họp không bị sa lầy, Minh được tôn trọng.', later: 'Buổi nói chuyện riêng sau đó gỡ được nhiều khúc mắc, nếu bạn thực sự làm.' },
      { choiceId: 'C', immediate: 'Thảo luận sôi nổi nhưng họp kéo dài, lệch nội dung họp.', later: 'Nhóm thấy được lắng nghe, nhưng vài người thấy bạn thiếu quyết đoán.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Giữ nội dung họp quan trọng — xử lý mâu thuẫn cá nhân nên tách riêng.' },
      { group: 'SF', text: 'Bị phản đối công khai chạm tự ái — đừng để cảm xúc tức thời quyết định phản ứng.' },
      { group: 'NF', text: 'Ghi nhận trước, bàn sâu sau, vừa giữ thể diện Minh vừa giữ tiến độ.' },
      { group: 'NT', text: 'Phân biệt người thật lòng góp ý với người cố ý thử bạn — hai kiểu xử khác hẳn nhau.' },
    ],
    mirrorMoment: 'Khi bị thách thức công khai, bạn phản ứng để bảo vệ cái tôi hay để bảo vệ quyết định?',
  },
  {
    id: 'arc-minh-04',
    role: 'VT',
    title: 'Minh và lằn ranh cuối',
    tags: ['static-arc'],
    hook: 'Minh phạm một lỗi quy trình nghiêm trọng gây hậu quả thật cho dự án. Đúng lúc bạn cần đánh giá nhân sự cuối kỳ. Minh nhắn: "Mày hiểu tao mà, đúng không?"',
    setup: 'Nể tình bạn thì bất công với người khác và sai vai trò. Xử nghiêm thì có thể mất một người bạn. Không có lựa chọn nào không mất gì.',
    choices: [
      { id: 'A', label: 'Xử theo quy định', action: 'Đánh giá đúng mức độ lỗi như với bất kỳ ai, giải thích thẳng với Minh' },
      { id: 'B', label: 'Giảm nhẹ vì tình', action: 'Ghi nhận lỗi nhưng giảm nhẹ đánh giá vì quan hệ và đóng góp cũ' },
      { id: 'C', label: 'Cho cơ hội kèm điều kiện', action: 'Đánh giá đúng lỗi nhưng kèm lộ trình khắc phục rõ ràng cho Minh' },
    ],
    consequences: [
      { choiceId: 'A', immediate: 'Minh sốc, thấy bị "phản bội".', later: 'Nhóm thấy bạn công bằng tuyệt đối, nhưng tình bạn với Minh tổn thương sâu, khó lành.' },
      { choiceId: 'B', immediate: 'Minh nhẹ nhõm, biết ơn.', later: 'Người khác cảm nhận sự thiên vị; uy tín công bằng của bạn bị nghi ngờ.' },
      { choiceId: 'C', immediate: 'Minh vừa bị nhắc vừa thấy còn đường đi.', later: 'Bạn giữ được nguyên tắc lẫn cơ hội cho Minh, nhưng phải theo sát lộ trình thật sự.' },
    ],
    typeFeedback: [
      { group: 'ST', text: 'Đánh giá đúng lỗi kèm lộ trình khắc phục vừa giữ chuẩn vừa xây dựng.' },
      { group: 'SF', text: 'Tình bạn quý — nhưng thiên vị làm tổn thương cả nhóm lẫn chính Minh về lâu dài.' },
      { group: 'NF', text: 'Vừa công bằng vừa tốt với Minh được nếu có lộ trình rõ ràng.' },
      { group: 'NT', text: 'Một ngoại lệ vì tình thân làm xói mòn cách đánh giá chung của nhóm.' },
    ],
    mirrorMoment: 'Khi vai trò buộc bạn chọn giữa tình bạn và sự công bằng, bạn bảo vệ điều gì — và bạn sống được với cái giá nào?',
  },
]

export const STATIC_ARC_POOL: ArcState[] = [
  {
    arcNumber: 1,
    source: 'static',
    context: {
      arcId: 'static-tam',
      role: 'MG',
      episodeNumber: 1,
      characters: { subordinate: 'Tâm — nhân viên cứng, hay nói "em ổn"' },
      previousOutcome: '',
      difficultyLevel: 1,
      isComplete: false,
    },
    episodes: STUB_ARC_TAM.map((c, i) => ({
      episodeNumber: i + 1,
      case: c,
      outcome: '',
    })),
  },
  {
    arcNumber: 1,
    source: 'static',
    context: {
      arcId: 'static-hang',
      role: 'KH',
      episodeNumber: 1,
      characters: {
        client: 'Chị Hằng — khách quen, hay đổi yêu cầu phút chót, trả tiền đúng hạn',
      },
      previousOutcome: '',
      difficultyLevel: 1,
      isComplete: false,
    },
    episodes: STATIC_ARC_HANG.map((c, i) => ({
      episodeNumber: i + 1,
      case: c,
      outcome: '',
    })),
  },
  {
    arcNumber: 1,
    source: 'static',
    context: {
      arcId: 'static-khoa',
      role: 'DT',
      episodeNumber: 1,
      characters: { partner: 'Anh Khoa — agency lâu năm, làm tốt nhưng hay trễ' },
      previousOutcome: '',
      difficultyLevel: 1,
      isComplete: false,
    },
    episodes: STATIC_ARC_KHOA.map((c, i) => ({
      episodeNumber: i + 1,
      case: c,
      outcome: '',
    })),
  },
  {
    arcNumber: 1,
    source: 'static',
    context: {
      arcId: 'static-minh',
      role: 'VT',
      episodeNumber: 1,
      characters: {
        colleague: 'Minh — đồng nghiệp cũ chơi thân, giỏi, bạn vừa lên trưởng nhóm',
      },
      previousOutcome: '',
      difficultyLevel: 1,
      isComplete: false,
    },
    episodes: STATIC_ARC_MINH.map((c, i) => ({
      episodeNumber: i + 1,
      case: c,
      outcome: '',
    })),
  },
]

export function getStaticArc(index: number = 0): ArcState | null {
  const arc = STATIC_ARC_POOL[index]
  if (!arc) return null
  return structuredClone(arc)
}

/** Tập 1 tĩnh theo role */
export function getStaticArcForRole(role: CaseRole): ArcState | null {
  const map: Record<string, string> = {
    MG: 'static-tam',
    KH: 'static-hang',
    DT: 'static-khoa',
    VT: 'static-minh',
  }
  const arcId = map[role]
  const arc = arcId
    ? STATIC_ARC_POOL.find((a) => a.context.arcId === arcId)
    : undefined
  if (arc) return structuredClone(arc)
  return STATIC_ARC_POOL[0] ? structuredClone(STATIC_ARC_POOL[0]) : null
}
