import { describe, expect, it } from "vitest";
import { tinhCanNgay, DUNG_THAN_MATRIX, getMuaFromMonth } from "@tncb/data/tam-linh";

/** Tham chiếu lichaz.com / xemngayamlich.com (2026-05). */
const QA_CAN_NGAY = [
  { day: 1, month: 1, year: 2000, expected: "Mậu Ngọ" },
  { day: 15, month: 8, year: 1990, expected: "Nhâm Tý" },
  { day: 20, month: 3, year: 1995, expected: "Canh Tuất" },
  { day: 5, month: 12, year: 1988, expected: "Giáp Ngọ" },
  { day: 29, month: 2, year: 1992, expected: "Ất Hợi" },
  { day: 1, month: 1, year: 1985, expected: "Canh Tý" },
  { day: 31, month: 10, year: 2001, expected: "Đinh Mão" },
  { day: 14, month: 7, year: 1997, expected: "Đinh Tỵ" },
  { day: 9, month: 9, year: 2009, expected: "Đinh Tỵ" },
  { day: 25, month: 4, year: 1980, expected: "Mậu Thìn" },
] as const;

describe("tinhCanNgay QA", () => {
  it.each(QA_CAN_NGAY)(
    "$day/$month/$year → $expected",
    ({ day, month, year, expected }) => {
      expect(tinhCanNgay(day, month, year).canChi).toBe(expected);
    },
  );
});

describe("DUNG_THAN_MATRIX lookup", () => {
  it("returns row for nhật chủ + mùa", () => {
    const { canNgay } = tinhCanNgay(15, 8, 1990);
    const mua = getMuaFromMonth(8);
    expect(canNgay).toBe("Nhâm");
    expect(mua).toBe("Thu");
    expect(DUNG_THAN_MATRIX[canNgay]?.[mua]?.dungThan).toBeTruthy();
  });
});
