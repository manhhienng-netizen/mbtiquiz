// child-young-estimator.ts
// Đợt 3 MẺ A — ESTIMATOR CON NHỎ (3-11) · 4 câu HÀNH VI → ước lượng KHÍ CHẤT (easy/difficult/slow-to-warm-up)
// Content agent · 17/06/2026 · brief Master 02:57 · user = BỐ MẸ
// Disclaimer UI cố định: "Ước lượng từ hành vi — không chẩn đoán."
// ⚠️ KHÔNG biến khí chất thành nhãn bệnh (difficult ≠ ADHD). Nếu lo về phát triển → hướng bác sĩ nhi.
// Logic mapping choice → cluster khí chất: MA tự viết.

export interface ChildYoungEstimatorQuestion {
  id: 'cyq1' | 'cyq2' | 'cyq3' | 'cyq4'
  text: string
  choices: [
    { id: 'a'; label: string },
    { id: 'b'; label: string },
    { id: 'c'; label: string },
    { id: 'd'; label: string },
  ]
}

export const CHILD_YOUNG_ESTIMATOR_QUESTIONS: ChildYoungEstimatorQuestion[] = [
  {
    id: 'cyq1',
    text: 'Khi gặp người lạ, nơi lạ hoặc món ăn mới, con bạn thường thế nào?',
    choices: [
      { id: 'a', label: 'Hào hứng, lao vào thử ngay' },
      { id: 'b', label: 'Phản ứng mạnh — khóc, la, từ chối gay gắt' },
      { id: 'c', label: 'Nép lại quan sát một lúc lâu rồi mới dần tham gia' },
      { id: 'd', label: 'Tùy hôm, khó đoán trước' },
    ],
  },
  {
    id: 'cyq2',
    text: 'Khi con vui hoặc buồn, con thường thể hiện ra sao?',
    choices: [
      { id: 'a', label: 'Vừa phải, và dễ dịu lại' },
      { id: 'b', label: 'Rất mạnh — cười to, khóc lớn, khó dừng' },
      { id: 'c', label: 'Nhẹ nhàng, ít lộ ra ngoài' },
      { id: 'd', label: 'Lúc mạnh lúc nhẹ, không theo quy luật nào' },
    ],
  },
  {
    id: 'cyq3',
    text: 'Khi nếp sinh hoạt thay đổi (đổi giờ ngủ, đổi chỗ, đổi lớp), con bạn...',
    choices: [
      { id: 'a', label: 'Thích nghi nhanh, vài hôm là quen' },
      { id: 'b', label: 'Phản ứng dữ, mất khá lâu mới ổn lại' },
      { id: 'c', label: 'Cần thời gian, làm quen từ từ nếu không bị giục' },
      { id: 'd', label: 'Mỗi lần một khác' },
    ],
  },
  {
    id: 'cyq4',
    text: 'Mức năng lượng thường ngày của con bạn ra sao?',
    choices: [
      { id: 'a', label: 'Vừa phải — ngồi yên được khi cần' },
      { id: 'b', label: 'Rất cao — luôn chạy nhảy, khó ngồi yên' },
      { id: 'c', label: 'Trầm, thích chơi nhẹ nhàng, lặng lẽ' },
      { id: 'd', label: 'Lúc bùng lúc lắng, thất thường' },
    ],
  },
]
