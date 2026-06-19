// src/data/growth-zone-content.ts
// Growth Zone content — Archetype-based + LP/Element/NhatChu enrichment
// Generated: 28/05/2026

export interface GrowthZoneData {
  coreShadow: string // Bẫy tâm lý đặc trưng của archetype
  coreParadox: string // Nghịch lý cốt lõi — 1 câu
  lifePathInsights: Record<number, string> // LP → 1 câu insight
  elementInsights: Record<string, string> // Element → 1 câu insight
}

export const GROWTH_BY_ARCHETYPE: Record<string, GrowthZoneData> = {
  strategic_architect: {
    coreShadow:
      'Bạn xây được hệ thống mà người khác không nhìn ra — nhưng chính sự hoàn hảo trong tư duy đó đang cô lập bạn khỏi những người bạn muốn kết nối nhất. Không phải bạn thiếu cảm xúc — bạn đang dùng trí tuệ như một bức tường, và bức tường đó vừa bảo vệ vừa giam cầm.',
    coreParadox:
      'Bạn nhìn thấy mọi thứ rõ hơn bất kỳ ai — nhưng chính sự rõ ràng đó khiến bạn không thể hiểu tại sao người khác lại không thấy, và sự không hiểu đó dần trở thành khoảng cách không ai muốn nhưng không ai biết cách thu hẹp.',
    lifePathInsights: {
      1: 'Bạn không cần ai cho phép — nhưng "không cần ai" đã trở thành câu thần chú che đi một nỗi cô đơn mà bạn chưa thừa nhận.',
      4: 'Workaholism của bạn không phải tham vọng — đó là tiếng ồn bạn tạo ra để không phải ngồi yên với phần mình chưa hiểu.',
      7: 'Số học xác nhận bạn đi tìm sự thật — nhưng sự thật duy nhất bạn đang né là chính mình khi không có hệ thống nào để ẩn vào.',
      8: 'Bạn biết cách tạo ra quyền lực — nhưng câu hỏi là bạn có biết mình là ai khi quyền lực đó không còn không.',
    },
    elementInsights: {
      Kim: 'Sức mạnh thực sự không phải là không bị tổn thương — mà là dám để người khác thấy bạn đang tổn thương mà không sụp đổ.',
      Giáp: 'Bạn bẻ gãy mọi rào cản bằng sức mạnh — nhưng cây đại thụ không gãy vì thiếu sức mạnh, mà vì không biết uốn cong khi cần.',
      Canh: 'Lưỡi kiếm sắc bén nhất cũng không thể tự mài chính nó — bạn cần người khác, và học cách để được mài là bài học lớn nhất bạn đang trốn tránh.',
      Mậu: 'Bạn là núi — vững và bao chứa. Nhưng núi cũng cô đơn nhất, và núi không tự hỏi mình cô đơn vì không có ngôn ngữ cho điều đó.',
    },
  },

  empathetic_leader: {
    coreShadow:
      'Bạn nhìn thấy điểm mạnh của người khác rõ hơn họ thấy ở chính mình — và điều đó đẹp, cho đến khi bạn nhận ra mình đã đầu tư quá nhiều vào người chưa sẵn sàng thay đổi, rồi lặng lẽ oán giận họ vì điều đó. Sự hy sinh của bạn đến kèm một kỳ vọng ẩn: được nhận ra là đã hy sinh.',
    coreParadox:
      'Bạn giỏi làm người khác cảm thấy được lắng nghe — nhưng chính bạn lại hiếm khi được lắng nghe thật sự, một phần vì bạn quá giỏi chuyển hướng khỏi mình trước khi ai kịp hỏi.',
    lifePathInsights: {
      2: 'Bạn tạo ra hòa bình cho cả phòng trong khi gánh hết bất hòa vào bên trong — và gọi đó là "bình tĩnh".',
      11: 'Bạn soi sáng người khác bằng trực giác — nhưng người soi sáng hay đứng trong bóng tối của chính mình, sợ rằng nếu bước vào ánh sáng, người ta sẽ thấy mình cũng không hoàn hảo.',
      22: 'Bạn mang tầm nhìn lớn cho tập thể — nhưng tầm nhìn càng lớn thì ranh giới cá nhân càng cần rõ, nếu không bạn sẽ kiệt sức khi cố cứu tất cả mọi người cùng lúc.',
      6: 'Bạn cho đi tất cả mà không nói kỳ vọng — rồi tích lũy oán giận khi kỳ vọng đó không được đáp ứng. Đây không phải tình yêu vô điều kiện, đây là hợp đồng bạn ký mà người kia không biết tồn tại.',
      9: 'Yêu nhân loại luôn dễ hơn yêu một người cụ thể đang đứng trước mặt, vì nhân loại không đòi hỏi sự hiện diện thực sự.',
      33: 'Bạn dạy tình yêu vô điều kiện — nhưng chưa áp dụng điều đó cho chính mình, và đó là lý do bạn cứ cạn kiệt.',
    },
    elementInsights: {
      Mộc: 'Bạn nuôi dưỡng người khác như cây cho bóng mát — nhưng cây cũng cần được tưới, và bạn hay quên điều đó đến khi rễ đã khô từ lâu.',
      Hỏa: 'Bạn là nguồn nhiệt của nhiều người — nhưng lửa không tự nạp lại, và bên trong bạn có thể đang lạnh hơn ai biết.',
      Đinh: 'Khao khát kết nối sâu sắc — nhưng chỉ có thể cháy sáng khi được bảo vệ. Mâu thuẫn này không có lời giải sạch.',
    },
  },

  creative_pioneer: {
    coreShadow:
      'Bạn có thể bắt đầu mười thứ cùng lúc và làm tất cả đều trông nhiều triển vọng — nhưng mỗi lần bỏ dở, bạn gọi đó là "tìm hướng mới" thay vì gọi đúng tên: sợ xem mình thực sự có đủ tốt không khi đi đến cùng. Sự phân tán là cơ chế phòng thủ được ngụy trang rất khéo.',
    coreParadox:
      'Bạn chạm được chiều sâu cảm xúc của người khác qua tác phẩm — nhưng đang né tránh ngồi yên với chiều sâu cảm xúc của chính mình, vì ở đó có những thứ không đẹp và không sáng tạo chút nào.',
    lifePathInsights: {
      3: 'Bạn dùng sự vui vẻ và hài hước như lớp sơn phủ lên những thứ chưa được xử lý — và bạn làm điều đó rất tốt đến mức đôi khi chính bạn cũng không biết mình đang che giấu gì.',
      5: 'Lựa chọn cảm thấy như cái chết — nên bạn không chọn, bạn di chuyển. Cuộc sống rộng nhưng đang mỏng dần.',
      11: 'Bạn biết điều gì đó trước khi có bằng chứng — nhưng trực giác mạnh nhất bạn đang cố không nghe là trực giác về bản thân mình.',
      22: 'Bạn nhìn thấy những thứ có thể được xây dựng ở quy mô mà người khác không dám nghĩ đến — nhưng tầm nhìn lớn mà không hành động thì chỉ là gánh nặng, không phải quà tặng.',
    },
    elementInsights: {
      Hỏa: 'Bạn cháy sáng khi có cảm hứng — nhưng lửa không điều tiết nhiên liệu thì không phải lửa mạnh, đó là lửa rơm. Cháy nhanh, tắt nhanh.',
      Ất: 'Bạn mềm mại và thích nghi tốt — nhưng khi không có cột để leo, bạn loay hoay không biết mình thật sự muốn vươn tới đâu.',
      Nhâm: 'Bạn rộng lớn như đại dương — nhưng đại dương không có bờ thì không có hình dạng, và hình dạng là thứ biến ý tưởng thành tác phẩm thật.',
      Thủy: 'Sáng tạo của bạn chảy đến mọi nơi — nhưng nước không có bờ thì không có hình dạng, và hình dạng là thứ biến ý tưởng thành tác phẩm thật.',
    },
  },

  resilient_builder: {
    coreShadow:
      'Bạn xây được những thứ tồn tại — nhưng đến một lúc nào đó bạn nhận ra mình đang sống bên trong hệ thống mình xây, không phải bên trong cuộc đời mình muốn. Kỷ luật của bạn thật — nhưng nó cũng là cách bạn tránh né sự im lặng bên trong, nơi có những câu hỏi bạn chưa sẵn sàng đối mặt.',
    coreParadox:
      'Bạn xây nền móng cho mọi người — nhưng nền móng cảm xúc của chính mình thường là thứ cuối cùng được chú ý, và bạn thường không nhận ra điều đó cho đến khi nó đã nứt.',
    lifePathInsights: {
      1: 'Bạn tự mở đường một mình rất giỏi — nhưng "không cần ai" đôi khi là câu nói của người cô đơn nhất.',
      4: 'Bạn xây nền móng đủ vững để mọi thứ đứng được — nhưng đến lúc nào đó bạn bắt đầu bảo vệ nền móng đó như bảo vệ bản sắc, không phải như bảo vệ công cụ, và sự khác biệt đó rất quan trọng.',
      8: 'Bạn nhầm giá trị bản thân với những gì bạn xây dựng được — và đây là lý do mỗi lần thất bại không chỉ là mất tiền, mà là mất bản sắc.',
    },
    elementInsights: {
      Thổ: 'Bạn nuôi dưỡng và bao chứa tất cả — nhưng đất im lặng lâu ngày thành tắc nghẽn. Bao dung không có giới hạn không phải đức tính, đó là nỗi sợ xung đột được đặt tên lại.',
      Mậu: 'Núi không tự hỏi mình cô đơn. Đây không phải điểm mạnh — đây là điểm mù.',
      Kim: 'Tiêu chuẩn cao của bạn không sai — nhưng nó đang tạo ra khoảng cách với người bạn muốn gần, và bạn thường đổ lỗi cho họ vì không đủ tiêu chuẩn thay vì nhìn lại tiêu chuẩn đó.',
    },
  },

  healing_teacher: {
    coreShadow:
      'Bạn có khả năng làm người khác cảm thấy được thấy và được hiểu — và bạn làm điều đó thật, không phải diễn. Nhưng phía sau là một người đang chăm sóc mọi người mà không có ai chăm sóc lại, và thay vì nói ra, bạn tiếp tục cho đến khi cạn kiệt rồi rút lui đột ngột — rồi cảm thấy tội lỗi vì đã rút lui.',
    coreParadox:
      'Bạn dạy người khác cách chữa lành — nhưng áp dụng cùng lòng trắc ẩn đó cho chính mình là điều bạn thấy khó hơn bất cứ điều gì bạn từng dạy.',
    lifePathInsights: {
      2: 'Bạn hòa giải xung đột của người khác trong khi nuốt xung đột của chính mình vào trong. Hòa bình bề mặt là xung đột chưa được giải quyết.',
      6: 'Bạn cho đi từ nơi thật — nhưng cho đi liên tục mà không có ranh giới không phải tình yêu vô điều kiện, đó là cạn kiệt được đặt tên đẹp hơn.',
      9: 'Bạn quan tâm đến người xa dễ hơn người gần — vì người gần thì thấy được bạn khi bạn không còn năng lượng để "làm lành".',
    },
    elementInsights: {
      Kỷ: 'Bạn nuôi dưỡng như đất vườn — nhưng đất cũng cần được nghỉ ngơi và được cày xới. Sự cạn kiệt của bạn không phải điểm yếu, đó là tín hiệu bạn đang bỏ qua.',
      Thổ: 'Im lặng và nhẫn nhịn lâu ngày thành tắc nghẽn — và tắc nghẽn không biểu hiện bằng giận dữ mà bằng sự trống rỗng dần dần.',
      Ất: 'Bạn tìm được con đường đến mọi người — nhưng câu hỏi là bạn có đang leo vì muốn hay vì không biết cách tồn tại mà không leo.',
    },
  },

  connector_catalyst: {
    coreShadow:
      'Bạn làm cho mọi người cảm thấy được chào đón, được thấy, được thuộc về — và điều đó thật và quý. Nhưng giá trị của bạn với chính mình lại được đo bằng phản hồi từ bên ngoài: bao nhiêu người thích bạn, bao nhiêu người cần bạn, bao nhiêu người nhớ đến bạn. Khi phản hồi đó giảm — dù không có lý do cụ thể — bạn bắt đầu nghi ngờ toàn bộ bản thân mình.',
    coreParadox:
      'Bạn kết nối người khác với nhau rất giỏi — nhưng khi một mình, bạn không chắc mình kết nối được với chính mình không.',
    lifePathInsights: {
      2: 'Bạn dễ mất bản thân trong nhóm — không phải vì bạn yếu, mà vì bạn giỏi thích nghi đến mức không nhận ra mình đã thích nghi thành ai khác.',
      3: 'LP 3 khuếch đại điều bạn đã có sẵn — khao khát được yêu mến — đến mức bạn bắt đầu nhầm "được nhiều người biết đến" với "được hiểu thật sự", và hai thứ đó không giống nhau, dù cảm giác ban đầu trông như nhau.',
      6: 'Sự ấm áp của bạn thật — nhưng nó kèm theo một hợp đồng ẩn: được chào đón lại, được cần đến, được nhớ. Khi hợp đồng đó không được thực hiện, bạn không biết nó đang gây đau vì bạn chưa thừa nhận nó tồn tại.',
    },
    elementInsights: {
      Mộc: 'Bạn vươn đến mọi người như cành cây vươn ra nắng — nhưng cây cần rễ chắc trước khi vươn xa, và rễ của bạn là biết mình muốn gì khi không có ai nhìn.',
      Hỏa: 'Bạn tỏa sáng — nhưng cần khán giả để cháy. Điều gì xảy ra khi không có ai nhìn?',
      Tân: 'Giá trị của bạn không phụ thuộc vào việc ai đó nhìn thấy — nhưng bạn vẫn chưa thực sự tin điều đó ở tầng sâu nhất.',
      Bính: 'Ánh sáng bạn mang lại cho người khác thật. Câu hỏi là bạn có đang soi sáng cho chính mình không.',
    },
  },

  deep_seeker: {
    coreShadow:
      'Bạn đi tìm sự thật ở khắp nơi — triết học, tâm lý, hệ thống, mô hình. Nhưng có một vùng bạn đang né tránh có hệ thống: chính mình khi không có gì để phân tích, không có câu hỏi để trả lời, không có lý thuyết để ẩn vào. Sự cô đơn của bạn không phải vì thiếu người — mà vì bạn đã trí tuệ hóa cả nỗi cô đơn đó thành "sự khôn ngoan".',
    coreParadox:
      'Bạn tìm kiếm sự thật sâu nhất của vũ trụ — nhưng sự thật về chính mình là thứ duy nhất bạn chưa dám nhìn thẳng vào mắt.',
    lifePathInsights: {
      7: 'Cô đơn của bạn không phải sự khôn ngoan — đó là nỗi sợ được hợp lý hóa rất tốt. Sự thật sâu nhất không nằm ở cuốn sách tiếp theo bạn đọc.',
      11: 'Bạn soi sáng người khác — nhưng đứng dưới ánh sáng đó, bạn cảm thấy exposed hơn là được thấy, và đó là lý do bạn hay ở phía sau màn.',
      4: 'Bạn tìm kiếm nền tảng vững chắc trong tri thức — nhưng tri thức không thể thay thế sự hiện diện, và sự hiện diện là thứ bạn đang tránh.',
    },
    elementInsights: {
      Quý: 'Chiều sâu của bạn là thật — nhưng chiều sâu vô ích nếu không ai chạm đến được, và bạn đang giữ quá nhiều bên trong đến mức chính bạn cũng bắt đầu nghẹt thở.',
      Đinh: 'Thế giới nội tâm của bạn phong phú hơn bất kỳ ai xung quanh biết — và đó chính xác là vấn đề.',
      Thủy: 'Bạn chảy được đến mọi chiều sâu của kiến thức — nhưng bề sâu mà không có bờ thì không phải chiều sâu, đó là sự lạc lối có học thức.',
    },
  },
}

// Composer: lấy đúng insight theo LP và Element của user
export function buildGrowthZoneDisplay(
  archetypeKey: string,
  lifePathNumber?: number,
  element?: string, // "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ"
  nhatChu?: string, // "Giáp" | "Ất" | "Bính" | "Đinh" | "Mậu" | "Kỷ" | "Canh" | "Tân" | "Nhâm" | "Quý"
): {
  coreShadow: string
  coreParadox: string
  lpInsight?: string
  elementInsight?: string
} {
  const data = GROWTH_BY_ARCHETYPE[archetypeKey]
  if (!data)
    return {
      coreShadow: '',
      coreParadox: '',
    }

  // LP insight: dùng nhatChu nếu có element-specific mapping,
  // fallback sang element nếu không có nhatChu match
  const lpInsight = lifePathNumber ? data.lifePathInsights[lifePathNumber] : undefined

  // Element insight: ưu tiên Nhật Chủ (cụ thể hơn),
  // fallback sang Ngũ Hành chung
  const elementInsight = nhatChu
    ? data.elementInsights[nhatChu] ?? (element ? data.elementInsights[element] : undefined)
    : element
      ? data.elementInsights[element]
      : undefined

  return {
    coreShadow: data.coreShadow,
    coreParadox: data.coreParadox,
    lpInsight,
    elementInsight,
  }
}
