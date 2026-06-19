// scale-tint-content-10062026.ts
// Content prose 4 bậc × 3 mảng — PM WA viết từ datamine (10/06/2026)
// Format: { note, selfAsk, safeguard? }
// Cursor wire vào src/data/self-coaching-lens.ts field scaleTint
// KHÔNG sửa nội dung này mà không báo PM WA

export const SCALE_TINT_CONTENT = {
  SOLO: {
    giaTriNghe: {
      note: `Làm một mình có nghĩa là bạn định nghĩa thành công cho chính mình — không ai giao KPI, không ai xác nhận bạn đang đi đúng hướng. Điều này là tự do thật, và cũng là gánh nặng thật. Thu nhập không đều không chỉ là vấn đề tài chính — nó thường khiến bạn phải tự hỏi "mình có đang giỏi không" vào đúng lúc tệ nhất.`,
      selfAsk: `Thước đo thành công của bạn năm nay là gì — và ai (ngoài bạn) cũng đồng ý với thước đo đó?`,
    },

    phatTrien: {
      note: `Khi làm SOLO, bạn học nhanh vì mọi thứ đều là stretch — không có ai làm thay. Nhưng thiếu một điều: không có peer giỏi hơn để học theo, không có ai thấy bạn làm việc và nói "cách này chưa ổn". Phát triển ở bậc này thường xảy ra — hoặc bị chặn — vì thiếu vòng phản hồi từ bên ngoài, không phải thiếu cơ hội.`,
      selfAsk: `Người cuối cùng thật sự thấy bạn làm việc và cho phản hồi có giá trị là ai? Đó là bao lâu trước?`,
    },

    moiTruong: {
      note: `Cô đơn của người làm SOLO không phải thiếu bạn bè — mà thiếu người cùng nghề hiểu công việc của bạn là gì. Tự do không cấu trúc là điều bạn chọn, nhưng không có ai đặt deadline bên ngoài cũng có nghĩa là không có gì kéo bạn ra khỏi đầu mình khi mọi thứ bắt đầu xoáy vào nhau.`,
      selfAsk: `Khi công việc đang tệ, bạn thường nói chuyện với ai? Người đó có thật sự hiểu bậc bạn đang làm không?`,
      safeguard: `Nếu cảm giác cô đơn này kéo dài và nặng hơn, những gì ở đây không đủ để giải quyết — cần người thật, không phải nội dung.`,
    },
  },

  STARTUP: {
    giaTriNghe: {
      note: `Ở giai đoạn này, impact cá nhân thường rõ hơn bất kỳ bậc nào khác — bạn làm gì có thể thay đổi sản phẩm, thay đổi đội. Nhưng khi công ty lớn lên, mission hay thay đổi mà không được nói thẳng. Điều dễ xảy ra: bạn tự blame "mình mất lửa" trong khi thực ra là công ty đang trở thành thứ khác so với lúc bạn vào.`,
      selfAsk: `Khi nào lần cuối bạn thật sự hứng thú với công việc ở đây? Điều gì đã thay đổi từ đó đến nay?`,
    },

    phatTrien: {
      note: `Startup dạy nhanh vì bạn học qua osmosis — ngồi cạnh người giỏi, được kéo vào quyết định thật, không có chương trình training bài bản. Nhưng osmosis phụ thuộc vào người — khi người đó bận, thăng chức, hoặc rời đi, cỗ máy học đó dừng lại mà không báo trước.`,
      selfAsk: `Ai là người bạn học nhiều nhất 6 tháng qua? Người đó còn tiếp cận được như trước không?`,
    },

    moiTruong: {
      note: `Làm startup có "chaos tax" — hỗn độn là đặc thù, không phải bug. Nhưng có một loại kiệt sức ít được gọi tên: khi mission của công ty drift dần khỏi thứ bạn join vì, và bạn vẫn đang cố commit như ngày đầu vì "phải vậy". Burnout từ giá trị lệch nhau thường bị nhầm với "không đủ cứng đầu".`,
      selfAsk: `Lý do bạn vào đây lúc đầu — nó còn là lý do bạn ở lại không, hay bạn đang ở lại vì lý do khác?`,
    },
  },

  VUA: {
    giaTriNghe: {
      note: `Ở quy mô vừa, bạn thường không còn thấy rõ dấu ấn cá nhân trong kết quả — việc lớn hơn, nhiều người hơn, và impact của bạn bị hòa vào chuỗi. Đây là giai đoạn nhiều người thầm nhớ cái cũ — tự chủ cao hơn, rõ hơn — nhưng không ai nói ra vì nghe có vẻ không "professional".`,
      selfAsk: `Điều gì từ môi trường trước bạn vẫn nhớ hoặc tiếc? Điều đó nói lên gì về thứ bạn cần?`,
    },

    phatTrien: {
      note: `Quy mô vừa có cơ hội stretch thật — nhưng phân bổ không đều, phụ thuộc nhiều vào manager của bạn. Một giả định hay xảy ra: "làm tốt thì sẽ được thấy". Nhưng ở bậc này, visibility cần được quản lý chủ động — người không biết bạn muốn gì sẽ không nghĩ đến bạn khi có cơ hội.`,
      selfAsk: `Manager của bạn có biết bạn muốn phát triển theo hướng nào trong 1-2 năm tới không? Nếu không, ai biết điều đó?`,
    },

    moiTruong: {
      note: `Quy mô vừa thường là giai đoạn tổ chức đang hình thành quy trình — nhiều friction không phải vì ai sai, mà vì cấu trúc đang thay đổi. Điều khó là phân biệt "process này cản trở thật" và "process này mình chưa quen" — phản ứng sai với từng loại tốn rất nhiều năng lượng.`,
      selfAsk: `Quy trình hoặc cơ chế nào đang ngốn nhiều năng lượng nhất? Nếu nó biến mất, công việc có thật sự khác không?`,
    },
  },

  CORP: {
    giaTriNghe: {
      note: `Ở corp, scale của tổ chức có thể tạo ra ý nghĩa thật — impact của bạn chạm đến nhiều người hơn bất kỳ bậc nào. Nhưng có một loại kiệt sức ít được gọi tên: làm thứ không thấy đáng, không phải vì quá nhiều việc, mà vì quá ít ý nghĩa. Người ở corp thường không cho phép mình cảm thấy burnout vì "workload không nặng như startup" — nhưng cơ chế kiệt sức không hỏi workload.`,
      selfAsk: `Bao nhiêu phần trăm thời gian bạn thấy đang làm thứ đáng làm? Không cần hoành tráng — chỉ đáng.`,
      safeguard: `Nếu con số đó gần không và kéo dài, đây không phải thứ nội dung có thể giải quyết — cần nói chuyện người thật.`,
    },

    phatTrien: {
      note: `Corp thường có nhiều training hơn bất kỳ bậc nào — nhưng training không phải phát triển. Phát triển thật xảy ra khi bạn được kéo vào quyết định thật và được người giỏi thấy làm việc. Một điểm mù phổ biến: có mentor (người cho lời khuyên) nhưng thiếu sponsor — người đủ ảnh hưởng để nhắc tên bạn khi bạn không có mặt trong phòng.`,
      selfAsk: `Ai biết tên bạn khi có cơ hội tốt ở đây — không phải manager trực tiếp, mà người đủ ảnh hưởng để mention bạn?`,
    },

    moiTruong: {
      note: `Văn hóa thật của team và culture statement của công ty đôi khi là hai thứ khác nhau hoàn toàn. Người không phân biệt được thường nỗ lực sai chỗ — cố thay đổi thứ không thay đổi được, hoặc không nhận ra thứ có thể thay đổi. Kiệt sức ở corp thường đến từ thiếu kiểm soát và thiếu công bằng cảm nhận — không phải từ nhiều việc.`,
      selfAsk: `Ba tính từ tả văn hóa của team bạn. Ba tính từ tả culture statement công ty. Giống nhau bao nhiêu?`,
      safeguard: `Nếu values mismatch nặng và kéo dài, nội dung này không đủ để resolve — cần nói chuyện người thật hoặc xem xét lại context.`,
    },
  },
} as const

export type ScaleBand = keyof typeof SCALE_TINT_CONTENT
export type ScaleField = 'giaTriNghe' | 'phatTrien' | 'moiTruong'
export type ScaleTintEntry = {
  note: string
  selfAsk: string
  safeguard?: string
}

export const SCALE_BAND_LABELS: Record<ScaleBand, string> = {
  SOLO: 'Freelancer',
  STARTUP: 'Startup',
  VUA: 'Công ty vừa',
  CORP: 'Tập đoàn',
}

export const SCALE_BAND_OPTIONS: {
  value: ScaleBand
  label: string
}[] = [
  { value: 'SOLO', label: 'Tự làm / Freelancer' },
  { value: 'STARTUP', label: 'Startup / SME dưới 50 người' },
  { value: 'VUA', label: 'Công ty vừa 50–500 người' },
  { value: 'CORP', label: 'Tập đoàn / Corp trên 500 người' },
]
