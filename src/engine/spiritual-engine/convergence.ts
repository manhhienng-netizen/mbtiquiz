import type { MBTIResult } from "../personality-engine/calculateResult";
import type { BatTuResult } from "./battu";
import type { CanChiResult } from "./canchi";
import type { NumerologyResult } from "./numerology";
import {
  buildCharacterProfile,
  characterToConvergenceList,
  type CharacterProfile,
} from "./character-profile";

export interface MbtiTraits {
  type: string;
  fullCode: string;
  isThinking: boolean;
  isFeeling: boolean;
  isIntuitive: boolean;
  isSensing: boolean;
  isJudging: boolean;
  isPerceiving: boolean;
  isExtravert: boolean;
  isIntrovert: boolean;
}

export interface ConvergenceResult {
  trait: string;
  label: string;
  systems: string[];
  confidence: number;
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

export function mbtiFromType(type: string, identity: "A" | "T" = "A"): MbtiTraits {
  return {
    type,
    fullCode: `${type}-${identity}`,
    isExtravert: type[0] === "E",
    isIntrovert: type[0] === "I",
    isIntuitive: type[1] === "N",
    isSensing: type[1] === "S",
    isThinking: type[2] === "T",
    isFeeling: type[2] === "F",
    isJudging: type[3] === "J",
    isPerceiving: type[3] === "P",
  };
}

function traitsToMBTIResult(mbti: MbtiTraits): MBTIResult {
  const identity = mbti.fullCode.endsWith("-T") ? "T" : "A";
  const pct = (v: boolean) => (v ? 58 : 42);
  return {
    type: mbti.type,
    identity,
    fullCode: mbti.fullCode,
    percentages: {
      E: pct(mbti.isExtravert),
      I: pct(mbti.isIntrovert),
      N: pct(mbti.isIntuitive),
      S: pct(mbti.isSensing),
      T: pct(mbti.isThinking),
      F: pct(mbti.isFeeling),
      J: pct(mbti.isJudging),
      P: pct(mbti.isPerceiving),
      A: identity === "A" ? 58 : 42,
      T_id: identity === "T" ? 58 : 42,
    },
    pcc: { EI: "Moderate", SN: "Moderate", TF: "Moderate", JP: "Moderate" },
    needsConfirmation: false,
    confirmedDims: ["EI", "SN", "TF", "JP"],
    rawScores: { e: 0, i: 0, n: 0, s: 0, t: 0, f: 0, j: 0, p: 0, a: 0, t_id: 0 },
  };
}

export function findCharacterProfile(
  mbti: MbtiTraits | MBTIResult,
  numerology: NumerologyResult,
  canChi: CanChiResult,
  batTu?: BatTuResult,
): CharacterProfile {
  const mbtiResult = "pcc" in mbti ? mbti : traitsToMBTIResult(mbti);
  return buildCharacterProfile(mbtiResult, numerology, canChi, batTu);
}

/** Backward-compatible list for ConvergenceCard */
export function findConvergences(
  mbti: MbtiTraits,
  numerology: NumerologyResult,
  canChi: CanChiResult,
  batTu?: BatTuResult,
): ConvergenceResult[] {
  const profile = findCharacterProfile(mbti, numerology, canChi, batTu);
  const list = characterToConvergenceList(profile);
  const unique = [
    ...profile.uniqueFromMbti,
    ...profile.uniqueFromNum,
    ...profile.uniqueFromElem,
  ];
  for (const trait of unique) {
    const systems: string[] = [];
    if (profile.uniqueFromMbti.includes(trait)) systems.push("MBTI");
    if (profile.uniqueFromNum.includes(trait)) systems.push("Số học");
    if (profile.uniqueFromElem.includes(trait)) systems.push("Ngũ Hành");
    if (systems.length === 1) {
      list.push({
        trait,
        label: TRAIT_LABELS[trait] ?? trait,
        systems,
        confidence: 0.33,
      });
    }
  }
  return list.sort((a, b) => b.confidence - a.confidence);
}
