export const GROUP_COLORS = {
  Analysts: { bg: "#8B5CF6", light: "#EDE9FE", text: "#5B21B6" },
  Diplomats: { bg: "#10B981", light: "#D1FAE5", text: "#065F46" },
  Sentinels: { bg: "#3B82F6", light: "#DBEAFE", text: "#1E40AF" },
  Explorers: { bg: "#F59E0B", light: "#FEF3C7", text: "#92400E" },
} as const;

export type GroupName = keyof typeof GROUP_COLORS;

export const TYPE_GROUP: Record<string, GroupName> = {
  INTJ: "Analysts",
  INTP: "Analysts",
  ENTJ: "Analysts",
  ENTP: "Analysts",
  INFJ: "Diplomats",
  INFP: "Diplomats",
  ENFJ: "Diplomats",
  ENFP: "Diplomats",
  ISTJ: "Sentinels",
  ISFJ: "Sentinels",
  ESTJ: "Sentinels",
  ESFJ: "Sentinels",
  ISTP: "Explorers",
  ISFP: "Explorers",
  ESTP: "Explorers",
  ESFP: "Explorers",
};

export const GROUP_LABELS: Record<GroupName, string> = {
  Analysts: "Nhà phân tích",
  Diplomats: "Nhà ngoại giao",
  Sentinels: "Người canh giữ",
  Explorers: "Nhà thám hiểm",
};
