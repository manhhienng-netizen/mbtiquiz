// TODO: learn-mbti-questions not needed in Quiz MVP
type MbtiDirection = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
function getQuizQuestion(
  _id: number,
): { optionA: { direction: MbtiDirection }; optionB: { direction: MbtiDirection } } | undefined {
  return undefined;
}
import { getPCC, type QuizResult } from "./calculateResult";

type ScoreKey = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

const DIM_KEYS = ["EI", "SN", "TF", "JP"] as const;

export function directionFromChoice(
  questionId: number,
  choice: "A" | "B",
): MbtiDirection | null {
  const q = getQuizQuestion(questionId);
  if (!q) return null;
  return choice === "A" ? q.optionA.direction : q.optionB.direction;
}

/** Learn quiz: binary A/B answers → MBTI type (no A/T identity items). */
export function calculateLearnResult(answers: Record<number, "A" | "B">): QuizResult {
  const scores: Record<ScoreKey, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  Object.entries(answers).forEach(([id, choice]) => {
    const dir = directionFromChoice(Number(id), choice);
    if (dir && dir in scores) {
      scores[dir as ScoreKey] += 1;
    }
  });

  const E_pct = Math.round((scores.E / (scores.E + scores.I || 1)) * 100);
  const N_pct = Math.round((scores.N / (scores.N + scores.S || 1)) * 100);
  const T_pct = Math.round((scores.T / (scores.T + scores.F || 1)) * 100);
  const J_pct = Math.round((scores.J / (scores.J + scores.P || 1)) * 100);

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

  return {
    type,
    identity: "A",
    fullCode: `${type}-A`,
    percentages: {
      E: E_pct,
      I: 100 - E_pct,
      N: N_pct,
      S: 100 - N_pct,
      T: T_pct,
      F: 100 - T_pct,
      J: J_pct,
      P: 100 - J_pct,
      A: 50,
      T_id: 50,
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
      a: 0,
      t_id: 0,
    },
  };
}
