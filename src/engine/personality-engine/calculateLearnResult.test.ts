import { describe, expect, it } from "vitest";
import { calculateLearnResult } from "./calculateLearnResult";

describe("calculateLearnResult", () => {
  it("produces MBTI type from A/B answers", () => {
    const answers: Record<number, "A" | "B"> = {};
    for (let id = 1; id <= 4; id++) answers[id] = "B";
    for (let id = 5; id <= 8; id++) answers[id] = "B";
    for (let id = 9; id <= 12; id++) answers[id] = "A";
    for (let id = 13; id <= 16; id++) answers[id] = "A";
    const r = calculateLearnResult(answers);
    expect(r.type).toMatch(/^[EI][NS][TF][JP]$/);
    expect(r.fullCode).toContain("-A");
  });
});
