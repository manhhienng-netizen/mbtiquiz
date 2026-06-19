// DISC content — 4 profiles full + 12 blends
// Marston theory public domain · VN label · honest "xu hướng"

export type DiscType = 'D' | 'I' | 'S' | 'C'

export interface DiscProfileContent {
  type: DiscType
  label: string
  tagline: string
  strengths: string[]
  challenges: string[]
  worksWith: string
  communicate: string
  underPressure: string
  managerTip: string
  bossLens: string
  selfCheck: string
}

export const DISC_PROFILES: Record<DiscType, DiscProfileContent> = {
  D: {
    type: 'D',
    label: 'Quyết đoán',
    tagline: 'Hướng kết quả, ra quyết định nhanh, không ngại va chạm.',
    strengths: [
      'Ra quyết định nhanh và dứt khoát, không bị kẹt trong do dự',
      'Drive công việc về phía trước, đặc biệt khi cần kết quả gấp',
      'Không né tránh vấn đề khó hay cuộc trò chuyện thẳng thắn',
    ],
    challenges: [
      'Có xu hướng đi nhanh đến mức bỏ qua cảm nhận của người xung quanh',
      'Thường thiếu kiên nhẫn với quy trình chậm hoặc chi tiết nhỏ',
    ],
    worksWith:
      'Làm việc tốt với người rõ ràng, đi thẳng vấn đề và tôn trọng tốc độ. ' +
      'Bổ sung tốt bởi người C (tỉ mỉ) để cân bằng tốc độ với độ chính xác.',
    communicate:
      'Nói thẳng vào điểm chính, đưa bottom-line trước. Họ cần kết quả và lựa chọn, ' +
      'không cần dẫn nhập dài. Tránh vòng vo — họ sẽ mất kiên nhẫn.',
    underPressure:
      'Khi căng thẳng, người Quyết đoán hay trở nên gấp gáp và đòi hỏi hơn. ' +
      'Lúc này họ cần không gian để hành động, không phải thêm cuộc họp.',
    managerTip:
      'Cho nhân viên Quyết đoán autonomy rõ ràng và mục tiêu có thử thách. ' +
      'Chấp nhận phong cách nói thẳng của họ — đừng đọc đó là vô lễ. ' +
      'Giao việc theo kết quả, không micromanage cách làm.',
    bossLens:
      'Nếu sếp bạn thuộc nhóm Quyết đoán: present data và bottom line trước, ngắn gọn, ' +
      'không waste time. Chuẩn bị tinh thần sẽ có pushback — đó là cách họ test ý tưởng, ' +
      'không phải bác bỏ bạn. Nói thẳng quan điểm thường được respect hơn vòng vo.',
    selfCheck:
      'Lần gần nhất bạn đẩy nhanh một quyết định — có ai trong nhóm chưa kịp theo không?',
  },

  I: {
    type: 'I',
    label: 'Truyền cảm hứng',
    tagline: 'Năng lượng, kết nối người, thuyết phục bằng nhiệt huyết.',
    strengths: [
      'Tạo năng lượng và không khí tích cực cho cả nhóm',
      'Kết nối người với người, xây quan hệ tự nhiên',
      'Thuyết phục và truyền cảm hứng bằng câu chuyện và nhiệt huyết',
    ],
    challenges: [
      'Có xu hướng nói nhiều hơn lắng nghe khi hào hứng',
      'Thường khó tập trung vào chi tiết và follow-through đến cùng',
    ],
    worksWith:
      'Làm việc tốt với người cởi mở, ghi nhận đóng góp và thích collaborate. ' +
      'Bổ sung tốt bởi người S (kiên định) để biến ý tưởng thành thực thi ổn định.',
    communicate:
      'Engage bằng sự nhiệt tình, chia sẻ tầm nhìn lớn. Ghi nhận thành tích của họ ' +
      'một cách rõ ràng. Không khí thoải mái giúp họ mở lòng hơn không khí formal.',
    underPressure:
      'Khi căng thẳng, người Truyền cảm hứng hay nói nhiều hơn và cần được trấn an. ' +
      'Lúc này họ cần được lắng nghe và kết nối, không phải bị để một mình.',
    managerTip:
      'Khen nhân viên Truyền cảm hứng công khai, cho họ spotlight và cơ hội kết nối. ' +
      'Check-in thường xuyên để giữ năng lượng. Giúp họ neo vào chi tiết và deadline ' +
      'mà không dập tắt sự hào hứng.',
    bossLens:
      'Nếu sếp bạn thuộc nhóm Truyền cảm hứng: pitch ý tưởng bằng sự hào hứng và lợi ích ' +
      'cho con người, không chỉ data khô. Họ ghi nhận năng lượng. Khi cần kéo họ về thực tế, ' +
      'frame như "để biến ý này thành hiện thực, mình cần xử lý X" thay vì phản bác thẳng.',
    selfCheck:
      'Trong cuộc trao đổi gần nhất, bạn nói nhiều hơn hay lắng nghe nhiều hơn?',
  },

  S: {
    type: 'S',
    label: 'Kiên định',
    tagline: 'Ổn định, đáng tin, giữ nhịp và hỗ trợ nhóm.',
    strengths: [
      'Đáng tin cậy — hoàn thành những gì đã cam kết',
      'Giữ sự ổn định và hài hòa cho nhóm, nhất là lúc khó khăn',
      'Lắng nghe kỹ và thật sự hỗ trợ người khác',
    ],
    challenges: [
      'Có xu hướng ngại thay đổi đột ngột, cần thời gian để thích nghi',
      'Thường tránh conflict trực tiếp, đôi khi giữ ý kiến cho riêng mình',
    ],
    worksWith:
      'Làm việc tốt với người nhất quán, tôn trọng và không tạo áp lực dồn dập. ' +
      'Bổ sung tốt bởi người D (quyết đoán) để có người push khi cần quyết định nhanh.',
    communicate:
      'Tiếp cận nhẹ nhàng, cho họ thời gian xử lý trước khi cần câu trả lời. ' +
      'Báo trước thay đổi thay vì đưa ra đột ngột. Hỏi riêng tốt hơn hỏi công khai.',
    underPressure:
      'Khi căng thẳng, người Kiên định hay rút vào trong và tránh va chạm. ' +
      'Lúc này họ cần sự trấn an và môi trường an toàn để nói thật điều đang nghĩ.',
    managerTip:
      'Cho nhân viên Kiên định sự ổn định và báo trước khi có thay đổi. ' +
      'Tạo không gian an toàn để họ nói ý kiến thật — họ thường có quan sát giá trị ' +
      'mà ngại nói ra. Đừng nhầm sự im lặng của họ là đồng ý.',
    bossLens:
      'Nếu sếp bạn thuộc nhóm Kiên định: họ coi trọng sự ổn định và quan hệ tin cậy. ' +
      'Báo trước thay đổi, đừng tạo bất ngờ. Họ có thể không nói thẳng khi không hài lòng — ' +
      'chủ động hỏi để hiểu. Sự nhất quán và đáng tin từ bạn được họ đánh giá cao.',
    selfCheck:
      'Có ý kiến nào gần đây bạn giữ cho riêng mình vì ngại va chạm không?',
  },

  C: {
    type: 'C',
    label: 'Tỉ mỉ',
    tagline: 'Chính xác, logic, coi trọng chất lượng và đúng quy trình.',
    strengths: [
      'Chú ý chi tiết và đảm bảo chất lượng, ít sai sót',
      'Phân tích kỹ và ra quyết định dựa trên logic, không cảm tính',
      'Lập kế hoạch cẩn thận, lường trước rủi ro',
    ],
    challenges: [
      'Có xu hướng phân tích quá kỹ đến mức chậm quyết định',
      'Thường khó hài lòng với "đủ tốt", đôi khi cầu toàn quá mức',
    ],
    worksWith:
      'Làm việc tốt với người tôn trọng quy trình, cung cấp thông tin rõ ràng và chính xác. ' +
      'Bổ sung tốt bởi người I (truyền cảm hứng) để cân bằng phân tích với hành động.',
    communicate:
      'Đưa thông tin cụ thể, có data, giải thích logic. Tránh phát biểu mơ hồ — ' +
      'họ cần độ chính xác. Cho họ thời gian xem xét trước khi đòi quyết định.',
    underPressure:
      'Khi căng thẳng, người Tỉ mỉ hay phân tích quá mức và khó ra quyết định hơn. ' +
      'Lúc này họ cần thông tin rõ ràng và tiêu chí cụ thể, không phải bị giục.',
    managerTip:
      'Cho nhân viên Tỉ mỉ tiêu chí rõ ràng và thời gian để làm đúng. ' +
      'Giải thích lý do đằng sau yêu cầu — họ làm tốt hơn khi hiểu logic. ' +
      'Đừng giục quyết định khi thông tin chưa đủ; nhưng giúp họ tránh phân tích vô tận.',
    bossLens:
      'Nếu sếp bạn thuộc nhóm Tỉ mỉ: chuẩn bị kỹ trước khi trình bày, có data và chi tiết. ' +
      'Họ đánh giá độ chính xác hơn tốc độ. Đừng đưa ước lượng mơ hồ — họ sẽ hỏi tiếp. ' +
      'Khi đề xuất thay đổi, kèm phân tích rủi ro sẽ tăng khả năng được duyệt.',
    selfCheck:
      'Có quyết định nào bạn đang trì hoãn vì muốn thêm thông tin — mà thực ra đã đủ rồi?',
  },
}

export interface DiscBlendContent {
  blend: string
  label: string
  description: string
}

export const DISC_BLENDS: Record<string, DiscBlendContent> = {
  DI: {
    blend: 'DI',
    label: 'Quyết đoán · Truyền cảm hứng',
    description:
      'Bạn vừa hướng kết quả vừa giỏi kéo người khác theo. Dẫn dắt bằng năng lượng và ' +
      'quyết định nhanh. Xu hướng cần ý thức: đôi khi đi quá nhanh khiến nhóm khó theo kịp ' +
      'cả về tốc độ lẫn cảm xúc.',
  },
  DC: {
    blend: 'DC',
    label: 'Quyết đoán · Tỉ mỉ',
    description:
      'Bạn ra quyết định nhanh nhưng dựa trên phân tích, không bốc đồng. Vừa muốn kết quả ' +
      'vừa muốn đúng. Xu hướng cần ý thức: tiêu chuẩn cao với cả bản thân và người khác, ' +
      'đôi khi tạo áp lực mà không nhận ra.',
  },
  ID: {
    blend: 'ID',
    label: 'Truyền cảm hứng · Quyết đoán',
    description:
      'Bạn truyền cảm hứng mạnh và sẵn sàng push để đạt mục tiêu. Năng lượng cao, hướng hành động. ' +
      'Xu hướng cần ý thức: hào hứng và tốc độ đôi khi vượt qua chi tiết và follow-through.',
  },
  IS: {
    blend: 'IS',
    label: 'Truyền cảm hứng · Kiên định',
    description:
      'Bạn kết nối người và giữ quan hệ bền. Vừa tạo năng lượng vừa đáng tin. ' +
      'Xu hướng cần ý thức: đặt sự hài hòa lên cao đến mức ngại đưa ra phản hồi khó hoặc ' +
      'quyết định gây va chạm.',
  },
  SI: {
    blend: 'SI',
    label: 'Kiên định · Truyền cảm hứng',
    description:
      'Bạn ổn định và ấm áp, là chất keo của nhóm. Hỗ trợ người khác một cách tự nhiên. ' +
      'Xu hướng cần ý thức: ưu tiên người khác đến mức quên nhu cầu và ý kiến của chính mình.',
  },
  SC: {
    blend: 'SC',
    label: 'Kiên định · Tỉ mỉ',
    description:
      'Bạn đáng tin và cẩn thận, làm việc chắc chắn và ít sai sót. Giữ nhịp ổn định cho nhóm. ' +
      'Xu hướng cần ý thức: ngại thay đổi và mất nhiều thời gian thích nghi với cái mới.',
  },
  CS: {
    blend: 'CS',
    label: 'Tỉ mỉ · Kiên định',
    description:
      'Bạn chính xác và ổn định, coi trọng chất lượng lẫn sự bền vững. Làm đúng và làm đều. ' +
      'Xu hướng cần ý thức: cầu toàn cộng với ngại thay đổi có thể làm chậm tiến độ nhóm.',
  },
  CD: {
    blend: 'CD',
    label: 'Tỉ mỉ · Quyết đoán',
    description:
      'Bạn phân tích kỹ và quyết định dứt khoát khi đã đủ thông tin. Vừa chính xác vừa hướng kết quả. ' +
      'Xu hướng cần ý thức: tiêu chuẩn cao và thẳng thắn đôi khi khiến người khác thấy khó gần.',
  },
  DS: {
    blend: 'DS',
    label: 'Quyết đoán · Kiên định',
    description:
      'Bạn vừa quyết đoán vừa đáng tin — push kết quả nhưng vẫn giữ sự ổn định. Hiếm gặp và cân bằng. ' +
      'Xu hướng cần ý thức: cân giữa "đẩy nhanh" và "giữ hài hòa" đôi khi tạo căng thẳng nội tâm.',
  },
  IC: {
    blend: 'IC',
    label: 'Truyền cảm hứng · Tỉ mỉ',
    description:
      'Bạn vừa giỏi kết nối vừa coi trọng độ chính xác — hiếm và đa năng. Truyền cảm hứng có cơ sở. ' +
      'Xu hướng cần ý thức: giằng co giữa "muốn vui, linh hoạt" và "muốn đúng, chuẩn xác".',
  },
  D_: {
    blend: 'D',
    label: 'Quyết đoán (thuần)',
    description:
      'Phong cách Quyết đoán nổi trội rõ. Bạn hướng kết quả mạnh mẽ, ra quyết định nhanh ' +
      'và không ngại va chạm. Xem profile Quyết đoán để hiểu sâu hơn.',
  },
  C_: {
    blend: 'C',
    label: 'Tỉ mỉ (thuần)',
    description:
      'Phong cách Tỉ mỉ nổi trội rõ. Bạn coi trọng độ chính xác, phân tích kỹ và làm đúng quy trình. ' +
      'Xem profile Tỉ mỉ để hiểu sâu hơn.',
  },
}

export function getBlendContent(
  primary: DiscType,
  secondary: DiscType,
): DiscBlendContent {
  const key = `${primary}${secondary}`
  if (DISC_BLENDS[key]) return DISC_BLENDS[key]
  const pureKey = `${primary}_`
  if (DISC_BLENDS[pureKey]) return DISC_BLENDS[pureKey]
  return {
    blend: primary,
    label: DISC_PROFILES[primary].label,
    description: DISC_PROFILES[primary].tagline,
  }
}

export function getDiscContent(type: DiscType): DiscProfileContent {
  return DISC_PROFILES[type]
}
