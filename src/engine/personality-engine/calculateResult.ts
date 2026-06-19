// @ts-nocheck — Legacy Learn A/B engine; MVP uses adaptive-quiz-engine + mbti-quiz-data (Likert).
import { QUESTIONS, type Direction } from "@tncb/data/mbti-quiz-data";

export type PCC = "Slight" | "Moderate" | "Clear" | "Very Clear";

export interface Percentages {
  E: number;
  I: number;
  N: number;
  S: number;
  T: number;
  F: number;
  J: number;
  P: number;
  A: number;
  T_id: number;
}

/** PCI = Preference Clarity Category — flag only, does not change type direction (MBTI Manual). */
export interface QuizResult {
  type: string;
  identity: "A" | "T";
  fullCode: string;
  percentages: Percentages;
  pcc: { EI: PCC; SN: PCC; TF: PCC; JP: PCC };
  needsConfirmation: boolean;
  confirmedDims: string[];
  rawScores: {
    e: number;
    i: number;
    n: number;
    s: number;
    t: number;
    f: number;
    j: number;
    p: number;
    a: number;
    t_id: number;
  };
}

/** Alias used by Character / retake flows */
export type MBTIResult = QuizResult;

type ScoreKey = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P" | "A" | "T_id";

const DIM_KEYS = ["EI", "SN", "TF", "JP"] as const;

/** Dominant-side % (50–100) → clarity 0–100 for PCC bands */
export function getPCC(dominantPercent: number): PCC {
  const pref = Math.abs(dominantPercent - 50) * 2;
  if (pref <= 25) return "Slight";
  if (pref <= 50) return "Moderate";
  if (pref <= 75) return "Clear";
  return "Very Clear";
}

export function getOpposite(dir: Direction): ScoreKey {
  const map: Record<Direction, ScoreKey> = {
    E: "I",
    I: "E",
    S: "N",
    N: "S",
    T: "F",
    F: "T",
    J: "P",
    P: "J",
    A: "T_id",
    T_id: "A",
  };
  return map[dir];
}

export function calculateResult(answers: Record<number, number>): QuizResult {
  const scores: Record<ScoreKey, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
    A: 0,
    T_id: 0,
  };

  QUESTIONS.forEach((q) => {
    const score = answers[q.id] ?? 4;
    const weight = score - 4;

    if (weight > 0) {
      scores[q.direction as ScoreKey] += weight;
    } else if (weight < 0) {
      const opposite = getOpposite(q.direction);
      scores[opposite] += Math.abs(weight);
    }
  });

  const E_pct = Math.round((scores.E / (scores.E + scores.I || 1)) * 100);
  const N_pct = Math.round((scores.N / (scores.N + scores.S || 1)) * 100);
  const T_pct = Math.round((scores.T / (scores.T + scores.F || 1)) * 100);
  const J_pct = Math.round((scores.J / (scores.J + scores.P || 1)) * 100);
  const A_pct = Math.round((scores.A / (scores.A + scores.T_id || 1)) * 100);

  const pcc = {
    EI: getPCC(E_pct),
    SN: getPCC(N_pct),
    TF: getPCC(T_pct),
    JP: getPCC(J_pct),
  };

  const confirmedDims = DIM_KEYS.filter((d) => pcc[d] !== "Slight");
  const needsConfirmation = DIM_KEYS.some((d) => pcc[d] === "Slight");

  const type =
    (E_pct >= 50 ? "E" : "I") +
    (N_pct >= 50 ? "N" : "S") +
    (T_pct >= 50 ? "T" : "F") +
    (J_pct >= 50 ? "J" : "P");

  const identity: "A" | "T" = A_pct >= 50 ? "A" : "T";

  return {
    type,
    identity,
    fullCode: `${type}-${identity}`,
    percentages: {
      E: E_pct,
      I: 100 - E_pct,
      N: N_pct,
      S: 100 - N_pct,
      T: T_pct,
      F: 100 - T_pct,
      J: J_pct,
      P: 100 - J_pct,
      A: A_pct,
      T_id: 100 - A_pct,
    },
    pcc,
    needsConfirmation,
    confirmedDims,
    rawScores: {
      e: scores.E,
      i: scores.I,
      n: scores.N,
      s: scores.S,
      t: scores.T,
      f: scores.F,
      j: scores.J,
      p: scores.P,
      a: scores.A,
      t_id: scores.T_id,
    },
  };
}

export function parseTypeFromQuery(typeParam: string | null): string | null {
  if (!typeParam) return null;
  const match = typeParam.match(/^([EI][NS][TF][JP])-([AT])$/i);
  if (!match) return null;
  return `${match[1]!.toUpperCase()}-${match[2]!.toUpperCase()}`;
}
