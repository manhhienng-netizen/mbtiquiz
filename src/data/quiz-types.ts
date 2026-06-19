// src/data/quiz-types.ts

export type MBTIType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type Identity = "A" | "T";

export type Element = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export type Gender = "male" | "female" | "other";

export interface PCC {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
}

export interface QuizResult {
  mbtiType?: MBTIType;
  identity?: Identity;
  pcc?: PCC;
  completedAt: string;
  /** Set when user submitted birth form without completing MBTI quiz */
  spiritualOnly?: boolean;
  // Tâm Linh (optional)
  gender?: Gender;
  /** When gender is "other", figure preference for ShareCard */
  genderPreference?: "male" | "female";
  fullName?: string;
  birthDate?: string;
  birthHour?: string;
  lunarYear?: number;
  canYear?: string;
  chiYear?: string;
  nhatChu?: string;
  element?: Element;
  cungMenh?: string;
  lifePath?: number;
  // Character (computed)
  archetype?: string;
  coreTraits?: string[];
  growthZone?: string[];
}

export const QUIZ_RESULT_KEY = "mbtiquiz_result";
