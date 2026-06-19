import type { MBTIResult } from "../personality-engine/calculateResult";
import type { BatTuResult } from "./battu";
import type { CanChiResult } from "./canchi";
import type { NumerologyResult } from "./numerology";
import { getArchetype, getArchetypeDef } from "./archetype-engine";
import type { ConvergenceResult } from "./convergence";

export interface CharacterProfile {
  archetype: string;
  archetypeLabel: string;
  archetypeTagline: string;
  coreTraits: string[];
  uniqueFromMbti: string[];
  uniqueFromNum: string[];
  uniqueFromElem: string[];
  growthZone: string[];
  mbtiType: string;
  identity: "A" | "T";
  lifePath: number;
  element: string;
  nhatChu?: string;
  hasBattu: boolean;
  completeness: number;
}

const TRAIT_LABELS: Record<string, string> = {
  analytical: "Tư duy phân tích",
  creative: "Sáng tạo & trực giác",
  leadership: "Lãnh đạo & quyết đoán",
  empathetic: "Đồng cảm & nhân văn",
  practical: "Thực tế & kỷ luật",
  independent: "Độc lập & chiều sâu",
  visionary: "Tầm nhìn & đột phá",
};

const NHAT_CHU_KIM = ["Canh", "Tân"];
const NHAT_CHU_MOC = ["Giáp", "Ất"];
const NHAT_CHU_THUY = ["Nhâm", "Quý"];
const NHAT_CHU_HOA = ["Bính", "Đinh"];
const NHAT_CHU_THO = ["Mậu", "Kỷ"];

const TRAIT_MATRIX: Record<
  string,
  {
    mbti: (m: MBTIResult) => boolean;
    numerology: (n: NumerologyResult) => boolean;
    element: (c: CanChiResult) => boolean;
    battu: ((b: BatTuResult) => boolean) | null;
  }
> = {
  analytical: {
    mbti: (m) => m.type.includes("T") && m.type.includes("N"),
    numerology: (n) => [7, 11, 22].includes(n.lifePath),
    element: (c) => c.element === "Kim",
    battu: (b) => NHAT_CHU_KIM.includes(b.nhatChu),
  },
  creative: {
    mbti: (m) => m.type.includes("N") && m.type.includes("F"),
    numerology: (n) => [3, 6].includes(n.lifePath),
    element: (c) => c.element === "Mộc",
    battu: (b) => NHAT_CHU_MOC.includes(b.nhatChu),
  },
  leadership: {
    mbti: (m) => m.type.startsWith("E") && m.type.endsWith("J"),
    numerology: (n) => [1, 8].includes(n.lifePath),
    element: (c) => c.element === "Hỏa",
    battu: (b) => NHAT_CHU_HOA.includes(b.nhatChu),
  },
  empathetic: {
    mbti: (m) => m.type.includes("F") && m.type.startsWith("I"),
    numerology: (n) => [2, 6, 9].includes(n.lifePath),
    element: (c) => c.element === "Thủy",
    battu: (b) => NHAT_CHU_THUY.includes(b.nhatChu),
  },
  practical: {
    mbti: (m) => m.type.includes("S") && m.type.endsWith("J"),
    numerology: (n) => [4, 8].includes(n.lifePath),
    element: (c) => c.element === "Thổ",
    battu: (b) => NHAT_CHU_THO.includes(b.nhatChu),
  },
  independent: {
    mbti: (m) => m.type.startsWith("I") && m.type.includes("T"),
    numerology: (n) => [1, 7].includes(n.lifePath),
    element: (c) => c.element === "Kim",
    battu: null,
  },
  visionary: {
    mbti: (m) => m.type.startsWith("E") && m.type.includes("N"),
    numerology: (n) => [3, 11, 33].includes(n.lifePath),
    element: (c) => c.element === "Hỏa",
    battu: null,
  },
};

export function getGrowthZone(mbtiType: string): string[] {
  const zones: string[] = [];
  if (mbtiType[0] === "I") zones.push("Mở rộng mạng lưới và chia sẻ ý tưởng");
  if (mbtiType[0] === "E") zones.push("Lắng nghe sâu và không vội kết luận");
  if (mbtiType[2] === "T") zones.push("Đồng cảm và nhận diện cảm xúc người khác");
  if (mbtiType[2] === "F") zones.push("Ra quyết định dựa trên logic khi cần");
  if (mbtiType[3] === "J") zones.push("Linh hoạt khi kế hoạch thay đổi");
  if (mbtiType[3] === "P") zones.push("Kỷ luật hoàn thành cam kết dài hạn");
  return zones.slice(0, 4);
}

export function buildCharacterProfile(
  mbti: MBTIResult,
  numerology: NumerologyResult,
  canChi: CanChiResult,
  batTu?: BatTuResult,
): CharacterProfile {
  const hasBattu = !!batTu;
  const coreTraits: string[] = [];
  const uniqueFromMbti: string[] = [];
  const uniqueFromNum: string[] = [];
  const uniqueFromElem: string[] = [];

  for (const [trait, checks] of Object.entries(TRAIT_MATRIX)) {
    const signals = [
      checks.mbti(mbti),
      checks.numerology(numerology),
      checks.element(canChi),
      hasBattu && checks.battu ? checks.battu(batTu!) : false,
    ];
    const confirmed = signals.filter(Boolean).length;

    if (confirmed >= 2) {
      coreTraits.push(trait);
    } else {
      if (signals[0]) uniqueFromMbti.push(trait);
      if (signals[1]) uniqueFromNum.push(trait);
      if (signals[2]) uniqueFromElem.push(trait);
    }
  }

  const growthZone = getGrowthZone(mbti.type);
  const archetype = getArchetype(coreTraits, mbti.type);
  const archDef = getArchetypeDef(archetype);

  return {
    archetype,
    archetypeLabel: archDef?.label ?? archetype,
    archetypeTagline: archDef?.tagline ?? "",
    coreTraits,
    uniqueFromMbti,
    uniqueFromNum,
    uniqueFromElem,
    growthZone,
    mbtiType: mbti.type,
    identity: mbti.identity,
    lifePath: numerology.lifePath,
    element: canChi.element,
    nhatChu: batTu?.nhatChu,
    hasBattu,
    completeness: hasBattu ? 4 : 3,
  };
}

/** Legacy list shape for ConvergenceCard UI */
export function characterToConvergenceList(profile: CharacterProfile): ConvergenceResult[] {
  return profile.coreTraits.map((trait) => ({
    trait,
    label: TRAIT_LABELS[trait] ?? trait,
    systems: ["MBTI", "Số học", "Ngũ Hành"].slice(0, profile.completeness >= 4 ? 3 : 2),
    confidence: profile.completeness >= 4 ? 1 : 0.67,
  }));
}
