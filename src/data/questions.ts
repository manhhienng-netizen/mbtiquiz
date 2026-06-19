export type Dimension = "EI" | "SN" | "TF" | "JP" | "AT";
export type Direction = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P" | "A" | "T_id";

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  direction: Direction;
}

export const QUESTIONS: Question[] = [
  { id: 1, text: "Bạn thích tham gia các buổi tiệc hoặc sự kiện đông người.", dimension: "EI", direction: "E" },
  { id: 2, text: "Bạn cần thời gian một mình để nạp lại năng lượng sau khi giao tiếp.", dimension: "EI", direction: "I" },
  { id: 3, text: "Bạn dễ dàng bắt chuyện với người lạ.", dimension: "EI", direction: "E" },
  { id: 4, text: "Bạn thích làm việc trong không gian yên tĩnh, ít bị làm phiền.", dimension: "EI", direction: "I" },
  { id: 5, text: "Bạn cảm thấy hứng khởi hơn khi ở trong nhóm lớn.", dimension: "EI", direction: "E" },
  { id: 6, text: "Bạn thường suy nghĩ kỹ trước khi nói.", dimension: "EI", direction: "I" },
  { id: 7, text: "Bạn thích là trung tâm của sự chú ý.", dimension: "EI", direction: "E" },
  { id: 8, text: "Bạn cảm thấy mệt mỏi sau những cuộc trò chuyện dài.", dimension: "EI", direction: "I" },
  { id: 9, text: "Bạn chủ động liên lạc với bạn bè thay vì chờ họ liên lạc trước.", dimension: "EI", direction: "E" },
  { id: 10, text: "Bạn có xu hướng có ít bạn thân thay vì nhiều người quen.", dimension: "EI", direction: "I" },
  { id: 11, text: "Bạn thường nói nhiều hơn lắng nghe trong cuộc trò chuyện.", dimension: "EI", direction: "E" },
  { id: 12, text: "Bạn thích làm việc độc lập hơn là làm theo nhóm.", dimension: "EI", direction: "I" },
  { id: 13, text: "Bạn tin vào dữ liệu và bằng chứng cụ thể hơn là linh cảm.", dimension: "SN", direction: "S" },
  { id: 14, text: "Bạn thường nghĩ về các khả năng tương lai hơn là thực tế hiện tại.", dimension: "SN", direction: "N" },
  { id: 15, text: "Bạn thích làm theo quy trình đã được chứng minh.", dimension: "SN", direction: "S" },
  { id: 16, text: "Bạn dễ bị cuốn vào những ý tưởng trừu tượng và lý thuyết.", dimension: "SN", direction: "N" },
  { id: 17, text: "Bạn chú ý đến chi tiết và thực tế hơn là bức tranh toàn cảnh.", dimension: "SN", direction: "S" },
  { id: 18, text: "Bạn hay tưởng tượng ra những tình huống 'nếu như...'.", dimension: "SN", direction: "N" },
  { id: 19, text: "Bạn thích học qua kinh nghiệm thực tế hơn là lý thuyết.", dimension: "SN", direction: "S" },
  { id: 20, text: "Bạn thường nhìn thấy mối liên hệ giữa những thứ tưởng chừng không liên quan.", dimension: "SN", direction: "N" },
  { id: 21, text: "Bạn tập trung vào hiện tại hơn là lo lắng về tương lai xa.", dimension: "SN", direction: "S" },
  { id: 22, text: "Bạn bị hấp dẫn bởi các ý tưởng mới và chưa được khám phá.", dimension: "SN", direction: "N" },
  { id: 23, text: "Bạn thích công việc có quy trình rõ ràng, từng bước cụ thể.", dimension: "SN", direction: "S" },
  { id: 24, text: "Bạn thường sáng tạo và nghĩ ra những cách tiếp cận mới lạ.", dimension: "SN", direction: "N" },
  { id: 25, text: "Khi đưa ra quyết định, bạn dựa vào logic hơn là cảm xúc.", dimension: "TF", direction: "T" },
  { id: 26, text: "Bạn dễ đồng cảm và bị ảnh hưởng bởi cảm xúc của người khác.", dimension: "TF", direction: "F" },
  { id: 27, text: "Bạn nghĩ sự thật quan trọng hơn là tránh làm tổn thương cảm xúc.", dimension: "TF", direction: "T" },
  { id: 28, text: "Bạn đặt sự hòa hợp trong nhóm lên trên việc đúng về mặt logic.", dimension: "TF", direction: "F" },
  { id: 29, text: "Bạn thường phân tích vấn đề một cách khách quan và không thiên vị.", dimension: "TF", direction: "T" },
  { id: 30, text: "Bạn cảm thấy không thoải mái khi phải chỉ trích người khác.", dimension: "TF", direction: "F" },
  { id: 31, text: "Bạn đôi khi bị coi là lạnh lùng hoặc thiếu tế nhị.", dimension: "TF", direction: "T" },
  { id: 32, text: "Bạn quan tâm nhiều đến cảm xúc và tâm trạng của những người xung quanh.", dimension: "TF", direction: "F" },
  { id: 33, text: "Bạn ưu tiên hiệu quả hơn sự đồng thuận của mọi người.", dimension: "TF", direction: "T" },
  { id: 34, text: "Bạn thường đưa ra quyết định dựa trên giá trị cá nhân hơn là phân tích.", dimension: "TF", direction: "F" },
  { id: 35, text: "Bạn thích tranh luận trực tiếp để tìm ra sự thật.", dimension: "TF", direction: "T" },
  { id: 36, text: "Bạn rất nhạy cảm với lời phê bình, dù chỉ mang tính xây dựng.", dimension: "TF", direction: "F" },
  { id: 37, text: "Bạn thích lập kế hoạch chi tiết trước khi bắt đầu.", dimension: "JP", direction: "J" },
  { id: 38, text: "Bạn thích giữ nhiều lựa chọn mở thay vì cam kết sớm.", dimension: "JP", direction: "P" },
  { id: 39, text: "Bạn cảm thấy khó chịu khi công việc bị bỏ dở chưa xong.", dimension: "JP", direction: "J" },
  { id: 40, text: "Bạn làm việc tốt nhất khi có deadline gần kề.", dimension: "JP", direction: "P" },
  { id: 41, text: "Bạn thích có lịch trình cụ thể hơn là ứng biến.", dimension: "JP", direction: "J" },
  { id: 42, text: "Bạn dễ thích nghi và thoải mái với sự thay đổi đột ngột.", dimension: "JP", direction: "P" },
  { id: 43, text: "Bạn thường hoàn thành nhiệm vụ đúng hạn hoặc sớm hơn.", dimension: "JP", direction: "J" },
  { id: 44, text: "Bạn thích bắt đầu nhiều dự án mới hơn là hoàn thiện dự án cũ.", dimension: "JP", direction: "P" },
  { id: 45, text: "Bạn thấy không gian ngăn nắp, có trật tự giúp bạn làm việc tốt hơn.", dimension: "JP", direction: "J" },
  { id: 46, text: "Bạn có xu hướng làm việc theo cảm hứng hơn là theo kế hoạch.", dimension: "JP", direction: "P" },
  { id: 47, text: "Bạn thích các quy tắc và cấu trúc rõ ràng trong công việc.", dimension: "JP", direction: "J" },
  { id: 48, text: "Bạn thường đưa ra quyết định vào phút chót.", dimension: "JP", direction: "P" },
  { id: 49, text: "Bạn thường tự tin vào các quyết định của mình.", dimension: "AT", direction: "A" },
  { id: 50, text: "Bạn hay lo lắng và suy nghĩ nhiều về những sai lầm đã qua.", dimension: "AT", direction: "T_id" },
  { id: 51, text: "Bạn ít bị căng thẳng kể cả trong tình huống áp lực cao.", dimension: "AT", direction: "A" },
  { id: 52, text: "Bạn thường đặt tiêu chuẩn rất cao cho bản thân.", dimension: "AT", direction: "T_id" },
  { id: 53, text: "Bạn không bận tâm nhiều đến ý kiến của người khác về mình.", dimension: "AT", direction: "A" },
  { id: 54, text: "Bạn dễ cảm thấy bất an hoặc hoài nghi về năng lực của mình.", dimension: "AT", direction: "T_id" },
  { id: 55, text: "Bạn thường cảm thấy hài lòng với những gì mình đã đạt được.", dimension: "AT", direction: "A" },
  { id: 56, text: "Bạn nhạy cảm với những thay đổi trong tâm trạng và cảm xúc.", dimension: "AT", direction: "T_id" },
  { id: 57, text: "Bạn không dễ bị stress hay bị cuốn vào vòng xoáy tiêu cực.", dimension: "AT", direction: "A" },
  { id: 58, text: "Bạn thường xuyên cảm thấy áp lực để thành công hơn nữa.", dimension: "AT", direction: "T_id" },
  { id: 59, text: "Bạn cảm thấy vững vàng và tự chủ ngay cả khi bị chỉ trích.", dimension: "AT", direction: "A" },
  { id: 60, text: "Bạn hay tự phê phán và muốn cải thiện bản thân liên tục.", dimension: "AT", direction: "T_id" },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
