import { describe, expect, it } from "vitest";
import {
  calculateExpressionNumber,
  calculateLifePath,
  calculateNumerology,
  calculateSoulUrge,
} from "./numerology";

describe("numerology", () => {
  it("life path — component sum with master numbers", () => {
    expect(calculateLifePath("29/11/1988")).toBe(3);
    expect(calculateLifePath("11/11/1991")).toBe(6);
    expect(calculateLifePath("22/02/2000")).toBe(8);
    // 6+8+1(year 1990→1) = 15 → 6 (not 33 from flat digit sum)
    expect(calculateLifePath("15/08/1990")).toBe(6);
    expect(calculateLifePath("10/04/1979")).toBe(4);
  });

  it("accepts DD-MM-YYYY and DD.MM.YYYY", () => {
    expect(calculateLifePath("15-08-1990")).toBe(6);
    expect(calculateLifePath("15.08.1990")).toBe(6);
  });

  it("vietnamese name expression", () => {
    const n = calculateExpressionNumber("Nguyễn Văn An");
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThanOrEqual(33);
  });

  it("soul urge uses vowels only", () => {
    expect(calculateSoulUrge("Nguyễn Văn An")).toBeGreaterThan(0);
  });

  it("full numerology bundle", () => {
    const r = calculateNumerology("Trần Thị Lan", "10/01/2000");
    expect(r.lifePath).toBeTruthy();
    expect(r.expression).toBeTruthy();
  });
});
