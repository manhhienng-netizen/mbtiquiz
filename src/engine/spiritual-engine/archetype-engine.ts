export interface ArchetypeDef {
  label: string;
  tagline: string;
  coreTraits: string[];
  description: string;
  growsAt: string[];
  famousExamples: Array<{ name: string; context: string }>;
}

export const ARCHETYPES: Record<string, ArchetypeDef> = {
  strategic_architect: {
    label: "Kiến trúc sư chiến lược",
    tagline: "Tư duy hệ thống + Ý chí độc lập",
    coreTraits: ["analytical", "independent"],
    description: "Những người định hình lại hệ thống và ngành công nghiệp.",
    growsAt: ["Công nghệ", "Tài chính", "Chiến lược", "Nghiên cứu"],
    famousExamples: [
      { name: "Elon Musk", context: "Kiến trúc hệ thống công nghiệp mới" },
      { name: "Christopher Nolan", context: "Tư duy cấu trúc trong nghệ thuật" },
    ],
  },
  empathetic_leader: {
    label: "Lãnh đạo truyền cảm hứng",
    tagline: "Năng lực kết nối + Tầm nhìn dẫn dắt",
    coreTraits: ["leadership", "empathetic"],
    description: "Kéo cả tập thể đi cùng bằng niềm tin và cảm hứng.",
    growsAt: ["Giáo dục", "Nhân sự", "Tư vấn", "Tổ chức phi lợi nhuận"],
    famousExamples: [
      { name: "Nelson Mandela", context: "Lãnh đạo qua đồng cảm và tầm nhìn" },
    ],
  },
  creative_pioneer: {
    label: "Người tiên phong sáng tạo",
    tagline: "Trực giác mạnh + Cảm xúc sâu",
    coreTraits: ["creative", "empathetic"],
    description: "Tạo ra thứ chưa từng tồn tại, từ cảm xúc thật và trực giác.",
    growsAt: ["Nghệ thuật", "Thiết kế", "Viết lách", "Âm nhạc"],
    famousExamples: [
      { name: "Frida Kahlo", context: "Sáng tạo từ chiều sâu cảm xúc" },
    ],
  },
  execution_master: {
    label: "Bậc thầy thực thi",
    tagline: "Thực tế + Kỷ luật + Trách nhiệm",
    coreTraits: ["practical", "leadership"],
    description: "Biến ý tưởng thành hiện thực. Backbone của mọi tổ chức.",
    growsAt: ["Quản lý dự án", "Vận hành", "Kỹ thuật", "Y tế"],
    famousExamples: [
      { name: "Tim Cook", context: "Thực thi và vận hành ở quy mô toàn cầu" },
    ],
  },
  independent_thinker: {
    label: "Nhà tư tưởng độc lập",
    tagline: "Chiều sâu nội tâm + Tư duy độc lập",
    coreTraits: ["analytical", "independent"],
    description: "Tìm ra sự thật mà đám đông bỏ qua.",
    growsAt: ["Khoa học", "Triết học", "Nghiên cứu", "Công nghệ"],
    famousExamples: [
      { name: "Albert Einstein", context: "Tư duy độc lập thay đổi vật lý học" },
    ],
  },
  connector_builder: {
    label: "Người kết nối & xây dựng",
    tagline: "Năng lượng xã hội + Thực tế",
    coreTraits: ["empathetic", "practical"],
    description: "Xây dựng cộng đồng và mạng lưới bền vững.",
    growsAt: ["Kinh doanh", "Bán hàng", "PR", "Quản lý cộng đồng"],
    famousExamples: [
      { name: "Richard Branson", context: "Xây dựng đế chế qua kết nối con người" },
    ],
  },
  visionary_rebel: {
    label: "Người tiên phong đột phá",
    tagline: "Tầm nhìn xa + Không theo lối mòn",
    coreTraits: ["visionary", "independent"],
    description: "Thách thức status quo và mở ra con đường chưa ai đi.",
    growsAt: ["Startup", "Khoa học đột phá", "Chính sách"],
    famousExamples: [
      { name: "Steve Jobs", context: "Tầm nhìn sản phẩm vượt thời đại" },
    ],
  },
};

export function getArchetype(coreTraits: string[], _mbtiType: string): string {
  let best = "independent_thinker";
  let bestScore = 0;

  for (const [key, arch] of Object.entries(ARCHETYPES)) {
    const score = arch.coreTraits.filter((t) => coreTraits.includes(t)).length;
    if (score > bestScore) {
      bestScore = score;
      best = key;
    }
  }

  return best;
}

export function getArchetypeDef(key: string): ArchetypeDef | undefined {
  return ARCHETYPES[key];
}
