import { MORNING_STYLES, GROWTH_AREAS, STRESS_PATTERNS, WORK_TIPS } from "./16p-knowledge-distilled";
import { HEALTH_BY_ROLE, HEALTH_NUDGES, CONFLICT_BY_TRAIT } from "./16p-knowledge-supplement";
import { getEmployeeGroup } from "./types";

export interface TypeDataBundle {
  morningLabel: string;
  morningNudge: string;
  thingsToAvoid: string[];
  dailyPractices: string[];
  growthFocus: string;
  practicalStart: string;
  avoidTrap: string;
  stressSigns: string[];
  stressCoping: string[];
  healthNudges: string[];
  healthStyle?: string;
  conflictStyle: string;
}

export function buildTypeData(mbtiType: string, _role?: string): TypeDataBundle {
  const morning = MORNING_STYLES[mbtiType];
  const growth = GROWTH_AREAS[mbtiType];
  const tips = WORK_TIPS[mbtiType];
  const stress = STRESS_PATTERNS[mbtiType];
  const health = HEALTH_NUDGES[mbtiType] ?? [];
  const group = getEmployeeGroup(mbtiType);
  const healthRole = HEALTH_BY_ROLE[group];

  const isThinking = mbtiType.length >= 3 && mbtiType[2] === "T";
  const conflictEntry = isThinking ? CONFLICT_BY_TRAIT.T_in_conflict : CONFLICT_BY_TRAIT.F_in_conflict;
  const conflictStyle = conflictEntry.sai_lầm_phổ_biến;

  return {
    morningLabel: morning?.label ?? "Bắt đầu ngày",
    morningNudge: morning?.nudge ?? "Chọn một việc quan trọng làm trước.",
    thingsToAvoid: tips?.doLess ?? [],
    dailyPractices: tips?.doMore ?? [],
    growthFocus: growth?.growthFocus ?? "",
    practicalStart: growth?.practicalStart ?? "",
    avoidTrap: growth?.avoidTrap ?? "",
    stressSigns: stress?.signs ?? [],
    stressCoping: stress?.coping ?? [],
    healthNudges: health,
    healthStyle: healthRole?.nudge_style,
    conflictStyle,
  };
}
