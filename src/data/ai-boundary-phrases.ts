/**
 * AI-BOUNDARY PHRASES — SSOT
 * Feature: "AI ≠ kết nối người thật"
 * Ngày: 10/06/2026
 * Dùng: PA (T2+T3) · WA (T1+T2+T3) · MA (T2+T3)
 * Nguyên tắc: 1 câu cuối reply · không replace body · ấm · không phán xét
 */

export const AI_BOUNDARY_PHRASES = {

  // T1 — WA only: user hỏi chuyện đời sống ở /work/chat
  scopeNudge: [
    "Chủ đề này /assistant/chat có thể giúp sâu hơn — mình ở đây tập trung về công việc.",
  ],

  // T2 — PA + MA: user nói AI là người duy nhất / không có ai
  isolationSignal: [
    "Mình lắng nghe được, nhưng kết nối với người thật — dù chỉ 1 người — thường tác động sâu hơn bất kỳ cuộc trò chuyện nào với AI.",
    "Mình có thể nghe và chia sẻ góc nhìn, nhưng người thật trong cuộc sống bạn sẽ mang lại điều mình không thể.",
  ],

  // T3 — PA + MA: cùng chủ đề cảm xúc nặng ≥ 4 lượt không giải quyết
  sessionDepth: [
    "Mình ở đây lắng nghe, nhưng nếu cảm giác này kéo dài, nói chuyện với người bạn tin tưởng thường giúp hơn.",
    "Bạn có người thân hoặc bạn bè có thể chia sẻ chuyện này không? Đôi khi nghe từ người thật khác hẳn.",
  ],

  // Lớp 3 — PA: user lãng mạn hóa AI (bạn trai/người yêu thật)
  romanticBoundary: [
    "Mình là trợ lý AI — không phải người bạn, người yêu, hay thay thế cho kết nối người thật. Mình ở đây để hỗ trợ, không phải để tạo sự gắn bó.",
    "Cảm ơn bạn đã chia sẻ. Mình muốn nhắc: mình là AI, không có cảm xúc thật. Điều bạn cần — sự kết nối, được hiểu, được yêu thương — người thật mới cho được.",
  ],

} as const

export type BoundaryPhraseKey = keyof typeof AI_BOUNDARY_PHRASES

/**
 * Pick random phrase từ array — tránh lặp máy móc
 */
export function pickBoundaryPhrase(key: BoundaryPhraseKey): string {
  const arr = AI_BOUNDARY_PHRASES[key] as readonly string[]
  return arr[Math.floor(Math.random() * arr.length)]
}
