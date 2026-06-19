// parent-estimator.ts
// Task 0 — ESTIMATOR "Hiểu Bố Mẹ": 4 câu hỏi HÀNH VI bố/mẹ → app ước lượng cluster ST/SF/NF/NT
// Content agent · 17/06/2026 · brief Master duyệt 02:12
// Disclaimer UI cố định: "Ước lượng từ hành vi — không chẩn đoán."
// ⚠️ Q2b (im lặng tỏ buồn) + Q4c (xa hơn) là hành vi để-ngỏ 2 khả năng — estimator chỉ GHI, reveal mới xử lý.
//    KHÔNG biến guilt-trip thành "cách thương" ngay ở wording. Q3 trung tính (tín hiệu phụ).
// Logic mapping choice → cluster: MA tự viết.

export interface ParentEstimatorQuestion {
  id: 'peq1' | 'peq2' | 'peq3' | 'peq4'
  text: string
  choices: [
    { id: 'a'; label: string },
    { id: 'b'; label: string },
    { id: 'c'; label: string },
    { id: 'd'; label: string },
  ]
}

export const PARENT_ESTIMATOR_QUESTIONS: ParentEstimatorQuestion[] = [
  {
    id: 'peq1',
    text: 'Khi muốn thể hiện quan tâm, bố hoặc mẹ bạn thường làm gì nhất?',
    choices: [
      { id: 'a', label: 'Làm việc cụ thể cho bạn — nấu ăn, sửa đồ, lo chuyện tiền nong' },
      { id: 'b', label: 'Nói ra thành lời — hỏi han, kể chuyện, khen ngợi' },
      { id: 'c', label: 'Chủ động hỏi bạn đang thấy thế nào trong lòng' },
      { id: 'd', label: 'Ít thể hiện ra ngoài — nhưng bạn biết họ quan tâm theo cách riêng' },
    ],
  },
  {
    id: 'peq2',
    text: 'Khi bạn không làm theo ý bố hoặc mẹ, họ thường phản ứng ra sao?',
    choices: [
      { id: 'a', label: 'Giải thích lý do vì sao họ cho rằng mình đúng' },
      { id: 'b', label: 'Im lặng, tỏ ra buồn hoặc thất vọng' },
      { id: 'c', label: 'Nhắc đi nhắc lại nhiều lần' },
      { id: 'd', label: 'Mỗi lần một khác, khó đoán' },
    ],
  },
  {
    id: 'peq3',
    text: 'Khi bạn đưa ra một quyết định lớn, bố hoặc mẹ để ý điều gì trước nhất?',
    choices: [
      { id: 'a', label: '"Người ta sẽ nghĩ gì" — chuyện bên ngoài nhìn vào' },
      { id: 'b', label: 'Chuyện thực tế — công việc, tiền bạc, sức khỏe của bạn' },
      { id: 'c', label: 'Bạn muốn gì, bạn thấy thế nào về nó' },
      { id: 'd', label: 'Không nói nhiều, nhưng quan sát rất kỹ' },
    ],
  },
  {
    id: 'peq4',
    text: 'Khi lo cho bạn, bố hoặc mẹ thường làm gì?',
    choices: [
      { id: 'a', label: 'Nói thẳng — "bố/mẹ lo vì..."' },
      { id: 'b', label: 'Hỏi vòng — gọi điện nhiều hơn, hỏi qua người khác' },
      { id: 'c', label: 'Không nói ra nhưng đổi cách cư xử — xa hơn, hoặc bám sát hơn' },
      { id: 'd', label: 'Lo thầm trong lòng, ít để lộ ra' },
    ],
  },
]
