import { describe, expect, it } from "vitest";
import {
  PHASE1_QUESTIONS,
  calculateDimensionScore,
  getMBTIType,
  isDimensionAmbiguous,
  MIN_PER_DIM,
} from "./mbti-quiz-data";

describe("mbti-quiz-data", () => {
  it("has 8 phase-1 hook questions (2 per dimension)", () => {
    expect(PHASE1_QUESTIONS).toHaveLength(8);
    expect(MIN_PER_DIM.TF).toBe(5);
  });

  it("scores A/B as poles for adaptive algorithm", () => {
    const answers = PHASE1_QUESTIONS.map((q) => ({
      questionId: q.id,
      value: 1 as const,
    }));
    const ei = calculateDimensionScore(answers, "EI", PHASE1_QUESTIONS);
    expect(ei).toBeLessThan(50);
    expect(isDimensionAmbiguous(ei)).toBe(false);
  });

  it("getMBTIType maps dimension scores", () => {
    const type = getMBTIType({ EI: 20, NS: 80, TF: 40, JP: 60 });
    expect(type).toMatch(/^[EISTJFP]{4}$/);
  });
});
