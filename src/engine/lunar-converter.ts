/**
 * LUNAR CONVERTER
 * Chuyen doi duong lich -> am lich cho Tam Linh module.
 */
// @ts-expect-error lunar-javascript types
import { Solar } from "lunar-javascript";

export interface LunarDate {
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeapMonth: boolean;
  canYear: string;
  chiYear: string;
  canMonth: string;
  chiMonth: string;
  canDay: string;
  chiDay: string;
  canHour?: string;
  chiHour?: string;
  gioBatTu?: string;
}

export interface SolarInput {
  year: number;
  month: number;
  day: number;
  hour?: number;
}

const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"] as const;

const STEM_MAP: Record<string, string> = {
  甲: "Giáp",
  乙: "Ất",
  丙: "Bính",
  丁: "Đinh",
  戊: "Mậu",
  己: "Kỷ",
  庚: "Canh",
  辛: "Tân",
  壬: "Nhâm",
  癸: "Quý",
};

const BRANCH_MAP: Record<string, string> = {
  子: "Tý",
  丑: "Sửu",
  寅: "Dần",
  卯: "Mão",
  辰: "Thìn",
  巳: "Tỵ",
  午: "Ngọ",
  未: "Mùi",
  申: "Thân",
  酉: "Dậu",
  戌: "Tuất",
  亥: "Hợi",
};

function normalizeCan(raw: string): string {
  return STEM_MAP[raw] ?? raw;
}

function normalizeChi(raw: string): string {
  return BRANCH_MAP[raw] ?? raw;
}

function getChiFromHour(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  if (h >= 23 || h < 1) return "Tý";
  if (h < 3) return "Sửu";
  if (h < 5) return "Dần";
  if (h < 7) return "Mão";
  if (h < 9) return "Thìn";
  if (h < 11) return "Tỵ";
  if (h < 13) return "Ngọ";
  if (h < 15) return "Mùi";
  if (h < 17) return "Thân";
  if (h < 19) return "Dậu";
  if (h < 21) return "Tuất";
  return "Hợi";
}

function getCanHour(canDay: string, chiHour: string): string {
  const canDayIndex = CAN.indexOf(canDay as (typeof CAN)[number]);
  const chiHourIndex = CHI.indexOf(chiHour as (typeof CHI)[number]);
  if (canDayIndex < 0 || chiHourIndex < 0) return "Giáp";
  const startCanForHour = [0, 2, 4, 6, 8][canDayIndex % 5]!;
  const canHourIndex = (startCanForHour + chiHourIndex) % 10;
  return CAN[canHourIndex]!;
}

export function solarToLunar(input: SolarInput): LunarDate {
  const hour = input.hour ?? 12;
  const solar = Solar.fromYmdHms(input.year, input.month, input.day, hour, 0, 0);
  const lunar = solar.getLunar();
  const eightChar = lunar.getEightChar();

  const lunarYear = lunar.getYear();
  const lunarMonth = Math.abs(lunar.getMonth());
  const lunarDay = lunar.getDay();
  const isLeapMonth = lunar.getMonth() < 0;

  const canYear = normalizeCan(eightChar.getYearGan());
  const chiYear = normalizeChi(eightChar.getYearZhi());
  const canMonth = normalizeCan(eightChar.getMonthGan());
  const chiMonth = normalizeChi(eightChar.getMonthZhi());
  const canDay = normalizeCan(eightChar.getDayGan());
  const chiDay = normalizeChi(eightChar.getDayZhi());

  const result: LunarDate = {
    lunarYear,
    lunarMonth,
    lunarDay,
    isLeapMonth,
    canYear,
    chiYear,
    canMonth,
    chiMonth,
    canDay,
    chiDay,
  };

  if (input.hour !== undefined) {
    const chiHour = getChiFromHour(input.hour);
    result.chiHour = chiHour;
    result.canHour = getCanHour(canDay, chiHour);
    result.gioBatTu = chiHour;
  }

  return result;
}

export function getNhatChu(year: number, month: number, day: number): string {
  return solarToLunar({ year, month, day }).canDay;
}

export function getCanChiNam(
  year: number,
  month: number,
  day: number,
): { can: string; chi: string; lunarYear: number } {
  const lunar = solarToLunar({ year, month, day });
  return { can: lunar.canYear, chi: lunar.chiYear, lunarYear: lunar.lunarYear };
}

export function getLunarMonth(year: number, month: number, day: number): number {
  return solarToLunar({ year, month, day }).lunarMonth;
}
