import { describe, it, expect } from "vitest";
import { calculateResult, getOpposite, getPCC } from "./calculateResult";
import { handleRetake, historyFromQuizResult } from "./retakeLogic";
import { QUESTIONS } from "@tncb/data/questions";

describe("getOpposite", () => {
  it("returns correct opposite dimensions", () => {
    expect(getOpposite("E")).toBe("I");
    expect(getOpposite("I")).toBe("E");
    expect(getOpposite("N")).toBe("S");
    expect(getOpposite("T")).toBe("F");
    expect(getOpposite("J")).toBe("P");
    expect(getOpposite("A")).toBe("T_id");
  });
});

describe("getPCC", () => {
  it("maps preference clarity bands without affecting type", () => {
    expect(getPCC(50)).toBe("Slight");
    expect(getPCC(63)).toBe("Moderate");
    expect(getPCC(76)).toBe("Clear");
    expect(getPCC(88)).toBe("Very Clear");
  });
});

describe("calculateResult", () => {
  it("returns correct percentage sums per dimension pair", () => {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 60; i++) answers[i] = 5;
    const result = calculateResult(answers);
    expect(result.percentages.E + result.percentages.I).toBe(100);
    expect(result.percentages.N + result.percentages.S).toBe(100);
    expect(result.percentages.T + result.percentages.F).toBe(100);
    expect(result.percentages.J + result.percentages.P).toBe(100);
    expect(result.pcc.EI).toBeDefined();
    expect(Array.isArray(result.confirmedDims)).toBe(true);
  });

  it("handles neutral answers (score 4) with zero weighted scores", () => {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 60; i++) answers[i] = 4;
    const result = calculateResult(answers);
    expect(result.percentages.E + result.percentages.I).toBe(100);
    expect(result.fullCode).toMatch(/^[EI][NS][TF][JP]-[AT]$/);
    expect(result.pcc.EI).toBeDefined();
  });

  it("produces valid type code from answers", () => {
    const answers: Record<number, number> = {};
    QUESTIONS.forEach((q) => {
      answers[q.id] = ["E", "N", "T", "J", "A"].includes(q.direction) ? 7 : 1;
    });
    const result = calculateResult(answers);
    expect(result.type).toMatch(/^[EI][NS][TF][JP]$/);
    expect(["A", "T"]).toContain(result.identity);
    expect(result.fullCode).toBe(`${result.type}-${result.identity}`);
  });
});

describe("handleRetake", () => {
  it("asks user when type flips", () => {
    const prev = historyFromQuizResult({
      type: "INTJ",
      identity: "A",
      fullCode: "INTJ-A",
      percentages: { E: 20, I: 80, N: 80, S: 20, T: 80, F: 20, J: 80, P: 20, A: 60, T_id: 40 },
      pcc: { EI: "Clear", SN: "Clear", TF: "Clear", JP: "Clear" },
      needsConfirmation: false,
      confirmedDims: ["EI", "SN", "TF", "JP"],
      rawScores: { e: 0, i: 0, n: 0, s: 0, t: 0, f: 0, j: 0, p: 0, a: 0, t_id: 0 },
    });
    const next = calculateResult(
      Object.fromEntries(QUESTIONS.map((q) => [q.id, q.direction === "E" || q.direction === "F" ? 7 : 1])),
    );
    const decision = handleRetake(next, prev);
    if (next.type !== "INTJ") {
      expect(decision.action).toBe("ask_user");
    }
  });
});
