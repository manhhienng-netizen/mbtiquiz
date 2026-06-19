// child-adult-estimator.ts
// Đợt 3 MẺ C — ESTIMATOR CON TRƯỞNG THÀNH (18+) · 4 câu HÀNH VI → cluster thô ST/SF/NF/NT
// Content agent · 17/06/2026 · user = BỐ MẸ · treat con như NGƯỜI LỚN bình đẳng
// Disclaimer UI cố định: "Ước lượng từ hành vi — không chẩn đoán."
// Logic mapping → MA

export interface ChildAdultEstimatorQuestion {
  id: 'caq1' | 'caq2' | 'caq3' | 'caq4'
  text: string
  choices: [
    { id: 'a'; label: string },
    { id: 'b'; label: string },
    { id: 'c'; label: string },
    { id: 'd'; label: string },
  ]
}

export const CHILD_ADULT_ESTIMATOR_QUESTIONS: ChildAdultEstimatorQuestion[] = [
  {
    id: 'caq1',
    text: 'Khi con trưởng thành của bạn ra một quyết định lớn, con thường dựa vào đâu?',
    choices: [
      { id: 'a', label: 'Cân nhắc lý lẽ, lợi hại thực tế' },
      { id: 'b', label: 'Việc nó ảnh hưởng tới người con quan tâm' },
      { id: 'c', label: 'Giá trị và điều con thấy có ý nghĩa' },
      { id: 'd', label: 'Cảm nhận tình huống rồi linh hoạt điều chỉnh' },
    ],
  },
  {
    id: 'caq2',
    text: 'Khi có chuyện không vui trong đời sống riêng, con thường...',
    choices: [
      { id: 'a', label: 'Tự xử lý, ít chia sẻ với gia đình' },
      { id: 'b', label: 'Kể cho người thân thiết, cần được đồng cảm' },
      { id: 'c', label: 'Ngẫm một mình về ý nghĩa của nó' },
      { id: 'd', label: 'Bắt tay xử lý ngay, ít nói nhiều' },
    ],
  },
  {
    id: 'caq3',
    text: 'Con bạn xây dựng cuộc sống riêng theo hướng nào là chính?',
    choices: [
      { id: 'a', label: 'Mục tiêu, sự nghiệp, nền tảng vững chắc' },
      { id: 'b', label: 'Các mối quan hệ và sự gắn kết' },
      { id: 'c', label: 'Sống đúng với con người và lý tưởng của mình' },
      { id: 'd', label: 'Trải nghiệm, tự do, không gò theo khuôn' },
    ],
  },
  {
    id: 'caq4',
    text: 'Khi bạn và con bất đồng quan điểm sống, con thường...',
    choices: [
      { id: 'a', label: 'Tranh luận thẳng, đưa lý lẽ' },
      { id: 'b', label: 'Tránh va chạm để giữ hòa khí' },
      { id: 'c', label: 'Giữ vững giá trị riêng dù không cãi' },
      { id: 'd', label: 'Làm theo cách của con, ít giải thích' },
    ],
  },
]
