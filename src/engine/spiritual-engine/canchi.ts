import { getCanChiNam } from "../lunar-converter";
import { ZODIAC_DATA } from "@tncb/data/can-chi-full-data";

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"] as const;

export const NGU_HANH_FROM_CAN: Record<string, string> = {
  Giáp: "Mộc",
  Ất: "Mộc",
  Bính: "Hỏa",
  Đinh: "Hỏa",
  Mậu: "Thổ",
  Kỷ: "Thổ",
  Canh: "Kim",
  Tân: "Kim",
  Nhâm: "Thủy",
  Quý: "Thủy",
};

export const YIN_YANG_FROM_CAN: Record<string, string> = {
  Giáp: "Dương",
  Ất: "Âm",
  Bính: "Dương",
  Đinh: "Âm",
  Mậu: "Dương",
  Kỷ: "Âm",
  Canh: "Dương",
  Tân: "Âm",
  Nhâm: "Dương",
  Quý: "Âm",
};

const TUONG_SINH: Record<string, string> = {
  Mộc: "Hỏa",
  Hỏa: "Thổ",
  Thổ: "Kim",
  Kim: "Thủy",
  Thủy: "Mộc",
};

const TUONG_KHAC: Record<string, string> = {
  Mộc: "Thổ",
  Thổ: "Thủy",
  Thủy: "Hỏa",
  Hỏa: "Kim",
  Kim: "Mộc",
};

export interface CanChiResult {
  can: string;
  chi: string;
  element: string;
  yinYang: string;
  yearCanChi: string;
  zodiac: string;
  zodiacEmoji: string;
  lunarYear: number;
  solarDate: string;
}

export interface ElementCompatibility {
  type: "sinh" | "khac" | "binh";
  label: string;
  desc: string;
  score: number;
}

function parseDobParts(dob: string): { day: number; month: number; year: number } | null {
  const slash = dob.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (slash) {
    return { day: +slash[1]!, month: +slash[2]!, year: +slash[3]! };
  }
  const iso = dob.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) {
    return { day: +iso[3]!, month: +iso[2]!, year: +iso[1]! };
  }
  return null;
}

export function getLunarYearFromDob(dob: string): number {
  const parts = parseDobParts(dob);
  if (!parts) return new Date().getFullYear();
  const { day, month, year } = parts;
  return getCanChiNam(year, month, day).lunarYear;
}

export function calculateCanChi(dob: string): CanChiResult {
  const parts = parseDobParts(dob);
  if (!parts) {
    const y = new Date().getFullYear();
    const can = CAN[(y - 4) % 10]!;
    const chi = CHI[(y - 4) % 12]!;
    return buildResult(can, chi, y, dob);
  }
  const { day, month, year } = parts;
  const { can, chi, lunarYear } = getCanChiNam(year, month, day);
  return buildResult(can, chi, lunarYear, `${day}/${month}/${year}`);
}

function buildResult(can: string, chi: string, lunarYear: number, solarDate: string): CanChiResult {
  const element = NGU_HANH_FROM_CAN[can] ?? "Thổ";
  const yinYang = YIN_YANG_FROM_CAN[can] ?? "Dương";
  const zodiacProfile = ZODIAC_DATA[chi];
  return {
    can,
    chi,
    element,
    yinYang,
    yearCanChi: `${can} ${chi}`,
    zodiac: zodiacProfile?.name ?? chi,
    zodiacEmoji: zodiacProfile?.emoji ?? "",
    lunarYear,
    solarDate,
  };
}

export function getCompatibility(element1: string, element2: string): ElementCompatibility {
  if (TUONG_SINH[element1] === element2) {
    return {
      type: "sinh",
      label: "Tương sinh",
      desc: `${element1} sinh ${element2}`,
      score: 90,
    };
  }
  if (TUONG_KHAC[element1] === element2) {
    return {
      type: "khac",
      label: "Tương khắc",
      desc: `${element1} khắc ${element2}`,
      score: 40,
    };
  }
  if (element1 === element2) {
    return { type: "binh", label: "Đồng hành", desc: "Cùng mệnh", score: 70 };
  }
  return { type: "binh", label: "Bình hòa", desc: "Trung tính", score: 65 };
}
