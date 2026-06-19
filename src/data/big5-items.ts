export type Big5Dim = 'O' | 'C' | 'E' | 'A' | 'N'

export interface Big5Item {
  id: number
  dim: Big5Dim
  reverse: boolean
  text_vn: string
}

/** IPIP-50 (Goldberg broad markers) — 10 items × 5 domains, VN */
export const BIG5_ITEMS: Big5Item[] = [
  // O — Cởi mở (1–10)
  { id: 1, dim: 'O', reverse: false, text_vn: 'Tôi thường là người làm bầu không khí sôi động.' },
  { id: 2, dim: 'O', reverse: true, text_vn: 'Tôi không nói nhiều.' },
  { id: 3, dim: 'O', reverse: false, text_vn: 'Tôi cảm thấy thoải mái khi ở cùng mọi người.' },
  { id: 4, dim: 'O', reverse: true, text_vn: 'Tôi thường đứng phía sau, không nổi bật.' },
  { id: 5, dim: 'O', reverse: false, text_vn: 'Tôi hay chủ động bắt chuyện.' },
  { id: 6, dim: 'O', reverse: true, text_vn: 'Tôi thường không có nhiều điều để nói.' },
  { id: 7, dim: 'O', reverse: false, text_vn: 'Tôi trò chuyện với nhiều người khác nhau trong các buổi tiệc.' },
  { id: 8, dim: 'O', reverse: true, text_vn: 'Tôi không thích thu hút sự chú ý về phía mình.' },
  { id: 9, dim: 'O', reverse: false, text_vn: 'Tôi không ngại trở thành tâm điểm chú ý.' },
  { id: 10, dim: 'O', reverse: true, text_vn: 'Tôi thường im lặng khi ở cạnh người lạ.' },

  // C — Tận tâm (11–20)
  { id: 11, dim: 'C', reverse: false, text_vn: 'Tôi ít khi bận tâm đến người khác.' },
  { id: 12, dim: 'C', reverse: true, text_vn: 'Tôi quan tâm đến mọi người.' },
  { id: 13, dim: 'C', reverse: false, text_vn: 'Tôi hay nói lời xúc phạm người khác.' },
  { id: 14, dim: 'C', reverse: true, text_vn: 'Tôi đồng cảm với cảm xúc của người khác.' },
  { id: 15, dim: 'C', reverse: false, text_vn: 'Tôi không quan tâm đến người khác.' },
  { id: 16, dim: 'C', reverse: true, text_vn: 'Tôi hay làm cho mọi người cảm thấy dễ chịu.' },
  { id: 17, dim: 'C', reverse: false, text_vn: 'Tôi thực sự không quan tâm đến người khác.' },
  { id: 18, dim: 'C', reverse: true, text_vn: 'Tôi thích người khác.' },
  { id: 19, dim: 'C', reverse: false, text_vn: 'Tôi xúc phạm người khác.' },
  { id: 20, dim: 'C', reverse: false, text_vn: 'Tôi có trái tim mềm yếu.' },

  // E — Hướng ngoại (21–30)
  { id: 21, dim: 'E', reverse: false, text_vn: 'Tôi luôn chuẩn bị kỹ càng.' },
  { id: 22, dim: 'E', reverse: true, text_vn: 'Tôi hay để đồ đạc bừa bãi.' },
  { id: 23, dim: 'E', reverse: false, text_vn: 'Tôi chú ý đến từng chi tiết.' },
  { id: 24, dim: 'E', reverse: true, text_vn: 'Tôi hay làm mọi thứ trở nên lộn xộn.' },
  { id: 25, dim: 'E', reverse: false, text_vn: 'Tôi làm xong việc nhà ngay lập tức.' },
  { id: 26, dim: 'E', reverse: true, text_vn: 'Tôi thường quên để đồ về đúng chỗ của nó.' },
  { id: 27, dim: 'E', reverse: false, text_vn: 'Tôi thích sự ngăn nắp.' },
  { id: 28, dim: 'E', reverse: true, text_vn: 'Tôi hay trốn tránh trách nhiệm của mình.' },
  { id: 29, dim: 'E', reverse: false, text_vn: 'Tôi làm việc theo lịch trình.' },
  { id: 30, dim: 'E', reverse: true, text_vn: 'Tôi rất kỹ tính trong công việc.' },

  // A — Hòa hợp (31–40)
  { id: 31, dim: 'A', reverse: false, text_vn: 'Tôi dễ bị căng thẳng.' },
  { id: 32, dim: 'A', reverse: true, text_vn: 'Tôi thư thái trong phần lớn thời gian.' },
  { id: 33, dim: 'A', reverse: false, text_vn: 'Tôi hay lo lắng về nhiều thứ.' },
  { id: 34, dim: 'A', reverse: true, text_vn: 'Tôi hiếm khi thấy buồn chán.' },
  { id: 35, dim: 'A', reverse: false, text_vn: 'Tôi dễ bị xáo trộn tâm trạng.' },
  { id: 36, dim: 'A', reverse: true, text_vn: 'Tôi dễ bị tức giận.' },
  { id: 37, dim: 'A', reverse: false, text_vn: 'Tâm trạng của tôi thay đổi nhiều.' },
  { id: 38, dim: 'A', reverse: true, text_vn: 'Tôi thường xuyên thay đổi cảm xúc thất thường.' },
  { id: 39, dim: 'A', reverse: false, text_vn: 'Tôi dễ bị bực bội.' },
  { id: 40, dim: 'A', reverse: true, text_vn: 'Tôi thường thấy buồn chán.' },

  // N — Nhạy cảm cảm xúc (41–50)
  { id: 41, dim: 'N', reverse: false, text_vn: 'Tôi có vốn từ vựng phong phú.' },
  { id: 42, dim: 'N', reverse: true, text_vn: 'Tôi khó hiểu những ý tưởng trừu tượng.' },
  { id: 43, dim: 'N', reverse: false, text_vn: 'Tôi có trí tưởng tượng sống động.' },
  { id: 44, dim: 'N', reverse: true, text_vn: 'Tôi không hứng thú với những ý tưởng trừu tượng.' },
  { id: 45, dim: 'N', reverse: false, text_vn: 'Tôi có những ý tưởng xuất sắc.' },
  { id: 46, dim: 'N', reverse: true, text_vn: 'Tôi không có trí tưởng tượng tốt.' },
  { id: 47, dim: 'N', reverse: false, text_vn: 'Tôi tiếp thu mọi thứ nhanh.' },
  { id: 48, dim: 'N', reverse: false, text_vn: 'Tôi hay dùng những từ ngữ khó.' },
  { id: 49, dim: 'N', reverse: false, text_vn: 'Tôi dành thời gian suy ngẫm về mọi việc.' },
  { id: 50, dim: 'N', reverse: false, text_vn: 'Tôi luôn đầy ắp ý tưởng.' },
]
