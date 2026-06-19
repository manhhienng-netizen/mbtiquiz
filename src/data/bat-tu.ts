export interface NhatChuProfile {
  description: string;
  traits: string[];
  careers: string[];
}

export const NHAT_CHU_DATA: Record<string, NhatChuProfile> = {
  Giáp: {
    description: "Mộc Dương — khởi đầu mạnh mẽ, thích phát triển và mở rộng.",
    traits: ["Sáng tạo", "Tiên phong", "Linh hoạt"],
    careers: ["Khởi nghiệp", "Giáo dục", "Môi trường"],
  },
  Ất: {
    description: "Mộc Âm — mềm mại, kiên trì, phát triển từ từ bền vững.",
    traits: ["Nhẹ nhàng", "Kiên trì", "Hợp tác"],
    careers: ["Nghệ thuật", "Tư vấn", "Chăm sóc"],
  },
  Bính: {
    description: "Hỏa Dương — năng lượng mạnh, rực rỡ, lãnh đạo bằng cảm hứng.",
    traits: ["Nhiệt huyết", "Tự tin", "Hào phóng"],
    careers: ["Marketing", "Lãnh đạo", "Biểu diễn"],
  },
  Đinh: {
    description: "Hỏa Âm — ánh lửa bền, tinh tế, sâu sắc.",
    traits: ["Tinh tế", "Trực giác", "Tập trung"],
    careers: ["Nghiên cứu", "Thiết kế", "Tâm lý"],
  },
  Mậu: {
    description: "Thổ Dương — núi đá, ổn định, trách nhiệm lớn.",
    traits: ["Ổn định", "Đáng tin", "Bao dung"],
    careers: ["Quản lý", "BĐS", "Hành chính"],
  },
  Kỷ: {
    description: "Thổ Âm — đất màu mỡ, nuôi dưỡng, chăm sóc chi tiết.",
    traits: ["Chu đáo", "Thực tế", "Kiên nhẫn"],
    careers: ["Kế toán", "Y tế", "Nông nghiệp"],
  },
  Canh: {
    description: "Kim Dương — sắc bén, quyết đoán, công lý.",
    traits: ["Quyết đoán", "Công bằng", "Mạnh mẽ"],
    careers: ["Kỹ thuật", "Pháp luật", "Quân sự"],
  },
  Tân: {
    description: "Kim Âm — trang sức, tinh xảo, thẩm mỹ.",
    traits: ["Tinh xảo", "Chuẩn mực", "Tỉ mỉ"],
    careers: ["Thiết kế", "Tài chính", "Chế tác"],
  },
  Nhâm: {
    description: "Thủy Dương — đại dương, uyển chuyển, trí tuệ sâu.",
    traits: ["Thông minh", "Linh hoạt", "Thích nghi"],
    careers: ["Thương mại", "IT", "Du lịch"],
  },
  Quý: {
    description: "Thủy Âm — mưa nhỏ, thấm sâu, trực giác.",
    traits: ["Nhạy cảm", "Sâu sắc", "Sáng tạo"],
    careers: ["Văn học", "Tâm lý", "Nghiên cứu"],
  },
};

export const DAI_VAN_POSITIVE_FRAMING =
  "Giai đoạn này là cơ hội để chuẩn bị, học hỏi và củng cố nền tảng — hãy hành động có kế hoạch thay vì lo lắng.";
