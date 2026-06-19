// child-teen-estimator.ts
// Đợt 3 MẺ B — ESTIMATOR TEEN (12-18) · 4 câu HÀNH VI → cluster thô ST/SF/NF/NT
// Content agent · 17/06/2026 · user = BỐ MẸ
// Disclaimer UI cố định: "Ước lượng từ hành vi — không chẩn đoán."
// ⚠️ KHÔNG chẩn đoán · hành vi quan sát được, KHÔNG hỏi để "soi" con
// Logic mapping → MA

export interface ChildTeenEstimatorQuestion {
  id: 'ctq1' | 'ctq2' | 'ctq3' | 'ctq4'
  text: string
  choices: [
    { id: 'a'; label: string },
    { id: 'b'; label: string },
    { id: 'c'; label: string },
    { id: 'd'; label: string },
  ]
}

export const CHILD_TEEN_ESTIMATOR_QUESTIONS: ChildTeenEstimatorQuestion[] = [
  {
    id: 'ctq1',
    text: 'Khi có chuyện không vui, con tuổi teen của bạn thường...',
    choices: [
      { id: 'a', label: 'Tự xử lý một mình, ít kể' },
      { id: 'b', label: 'Tìm bạn bè để nói, hơn là gia đình' },
      { id: 'c', label: 'Cáu kỉnh, dễ bùng rồi mới dịu' },
      { id: 'd', label: 'Khó đoán — lúc kể lúc không' },
    ],
  },
  {
    id: 'ctq2',
    text: 'Khi bạn và con bất đồng, con thường phản ứng ra sao?',
    choices: [
      { id: 'a', label: 'Tranh luận, đòi lý lẽ cho rõ' },
      { id: 'b', label: 'Im lặng, rút về phòng' },
      { id: 'c', label: 'Phản ứng mạnh về cảm xúc rồi mới nói chuyện được' },
      { id: 'd', label: 'Làm theo cho xong nhưng trong lòng không phục' },
    ],
  },
  {
    id: 'ctq3',
    text: 'Điều con bạn để tâm nhất ở tuổi này thường là gì?',
    choices: [
      { id: 'a', label: 'Việc học, mục tiêu, kế hoạch cụ thể' },
      { id: 'b', label: 'Bạn bè và chỗ đứng trong nhóm' },
      { id: 'c', label: 'Ý nghĩa, công bằng, mình là ai' },
      { id: 'd', label: 'Sở thích riêng, thế giới riêng của con' },
    ],
  },
  {
    id: 'ctq4',
    text: 'Khi con tự quyết một việc, con thường dựa vào đâu?',
    choices: [
      { id: 'a', label: 'Lý lẽ và lợi hại tính được' },
      { id: 'b', label: 'Cảm giác và việc nó ảnh hưởng tới người con quý' },
      { id: 'c', label: 'Giá trị riêng, điều con thấy đúng' },
      { id: 'd', label: 'Thử rồi điều chỉnh, không tính trước nhiều' },
    ],
  },
]
