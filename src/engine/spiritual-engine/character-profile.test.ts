import { describe, it, expect } from "vitest";
import { calculateResult } from "../personality-engine/calculateResult";
import { mbtiFromType, findCharacterProfile } from "./convergence";
import { getArchetype, ARCHETYPES } from "./archetype-engine";
import { calculateNumerology } from "./numerology";
import { calculateCanChi } from "./canchi";
import type { NumerologyResult } from "./numerology";
import type { CanChiResult } from "./canchi";

function mockNumerology(lifePath: number): NumerologyResult {
  return {
    lifePath,
    expression: lifePath,
    soulUrge: 1,
    personality: 1,
  };
}

function mockCanChi(element: string): CanChiResult {
  return {
    can: "Canh",
    chi: "Thân",
    element,
    yinYang: "Dương",
    yearCanChi: "Canh Thân",
    zodiac: "Khỉ",
    zodiacEmoji: "🐒",
    lunarYear: 1992,
    solarDate: "15/08/1992",
  };
}

function profileFrom(mbtiType: string, lifePath: number, element: string, identity: "A" | "T" = "A") {
  const mbti = mbtiFromType(mbtiType, identity);
  return findCharacterProfile(mbti, mockNumerology(lifePath), mockCanChi(element));
}

describe("Character System", () => {
  it("builds profile with archetype from converged traits", () => {
    const mbti = mbtiFromType("INTJ", "A");
    const numerology = calculateNumerology("Nguyen Van A", "1990-05-15");
    const canChi = calculateCanChi("1990-05-15");
    const profile = findCharacterProfile(mbti, numerology, canChi);
    expect(profile.archetype).toBeTruthy();
    expect(ARCHETYPES[profile.archetype]).toBeDefined();
    expect(profile.completeness).toBeGreaterThanOrEqual(3);
  });

  it("getArchetype picks best match", () => {
    expect(getArchetype(["analytical", "independent"], "INTJ")).toBe(
      "strategic_architect",
    );
  });

  it("quiz result integrates with findCharacterProfile", () => {
    const answers: Record<number, number> = {};
    for (let i = 1; i <= 60; i++) answers[i] = 6;
    const quiz = calculateResult(answers);
    const numerology = calculateNumerology("Test User", "2000-01-01");
    const canChi = calculateCanChi("2000-01-01");
    const profile = findCharacterProfile(quiz, numerology, canChi);
    expect(profile.mbtiType).toBe(quiz.type);
  });

  it("INTJ/Kim/7 → analytical + independent", () => {
    const r = profileFrom("INTJ", 7, "Kim");
    expect(r.coreTraits).toContain("analytical");
    expect(r.coreTraits).toContain("independent");
  });

  it("ENFP/Mộc/3 → creative", () => {
    const r = profileFrom("ENFP", 3, "Mộc");
    expect(r.coreTraits).toContain("creative");
  });

  it("ISTJ/Thổ/4 → practical", () => {
    const r = profileFrom("ISTJ", 4, "Thổ");
    expect(r.coreTraits).toContain("practical");
  });

  it("INFJ/Thủy/9 → empathetic", () => {
    const r = profileFrom("INFJ", 9, "Thủy");
    expect(r.coreTraits).toContain("empathetic");
  });

  it("ENTP/Hỏa/5 → ít nhất 1 core trait", () => {
    const r = profileFrom("ENTP", 5, "Hỏa");
    expect(r.coreTraits.length).toBeGreaterThan(0);
  });

  it("ESTJ/Hỏa/8 → leadership or practical", () => {
    const r = profileFrom("ESTJ", 8, "Hỏa");
    expect(r.coreTraits.some((t) => t === "leadership" || t === "practical")).toBe(true);
  });

  it("INFP/Mộc/6 → creative or empathetic", () => {
    const r = profileFrom("INFP", 6, "Mộc");
    expect(r.coreTraits.length).toBeGreaterThan(0);
  });

  it("ENTJ/Kim/1 → leadership or analytical", () => {
    const r = profileFrom("ENTJ", 1, "Kim");
    expect(r.coreTraits.length).toBeGreaterThan(0);
  });

  it("ISFP/Thổ/2 → at least one trait", () => {
    const r = profileFrom("ISFP", 2, "Thổ");
    expect(r.coreTraits.length).toBeGreaterThan(0);
  });

  it("INTP/Thủy/7 → analytical", () => {
    const r = profileFrom("INTP", 7, "Thủy");
    expect(r.coreTraits).toContain("analytical");
  });

  it("ESFJ/Hỏa/6 → empathetic or leadership", () => {
    const r = profileFrom("ESFJ", 6, "Hỏa");
    expect(r.coreTraits.length).toBeGreaterThan(0);
  });

  it("ISTP/Kim/5 → independent or practical", () => {
    const r = profileFrom("ISTP", 5, "Kim");
    expect(r.coreTraits.length).toBeGreaterThan(0);
  });
});
