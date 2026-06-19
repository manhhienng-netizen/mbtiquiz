import { solarToLunar } from "../lunar-converter";
import { CAN, CHI, NGU_HANH_FROM_CAN } from "./canchi";
import { parseDob } from "./numerology";

export interface TruPillar {
  can: string;
  chi: string;
}

export interface BatTuResult {
  namTru: TruPillar;
  thangTru: TruPillar;
  ngayTru: TruPillar;
  gioTru: TruPillar | null;
  nhatChu: string;
  nhatChuElement: string;
  nguHanhCount: Record<string, number>;
  dungThan: string[];
  daiVanHienTai: string;
  daiVanAge: number;
  daiVanNote: string;
  hasHour: boolean;
}

const ELEMENTS = ["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"] as const;

function countElements(pillars: TruPillar[]): Record<string, number> {
  const count: Record<string, number> = { Kim: 0, Mộc: 0, Thủy: 0, Hỏa: 0, Thổ: 0 };
  pillars.forEach((p) => {
    const e = NGU_HANH_FROM_CAN[p.can];
    if (e) count[e] = (count[e] ?? 0) + 1;
  });
  return count;
}

function calcDungThan(count: Record<string, number>, nhatElement: string): string[] {
  const sorted = [...ELEMENTS].sort((a, b) => (count[a] ?? 0) - (count[b] ?? 0));
  const weakest = sorted.filter((e) => (count[e] ?? 0) <= 1 && e !== nhatElement);
  if (weakest.length) return weakest.slice(0, 2);
  const sinh: Record<string, string> = { Kim: "Thủy", Thủy: "Mộc", Mộc: "Hỏa", Hỏa: "Thổ", Thổ: "Kim" };
  return [sinh[nhatElement] ?? "Hỏa"];
}

function calcDaiVan(
  birthYear: number,
  gender: "male" | "female",
  monthCan: string,
  monthChi: string,
): { label: string; startAge: number } {
  const isYangYear = birthYear % 2 === 0;
  const forward =
    (gender === "male" && isYangYear) || (gender === "female" && !isYangYear);
  const canIdx = CAN.indexOf(monthCan as (typeof CAN)[number]);
  const chiIdx = CHI.indexOf(monthChi as (typeof CHI)[number]);
  const step = forward ? 1 : -1;
  const age = 8 + ((new Date().getFullYear() - birthYear) % 10);
  const can = CAN[((canIdx + step * 3 + 10) % 10 + 10) % 10]!;
  const chi = CHI[((chiIdx + step * 3 + 12) % 12 + 12) % 12]!;
  return { label: `${can} ${chi}`, startAge: Math.max(1, age) };
}

export function calculateBatTu(
  dob: string,
  birthHour?: number,
  gender: "male" | "female" = "male",
): BatTuResult {
  const parsed = parseDob(dob);
  const day = parsed?.day ?? 1;
  const month = parsed?.month ?? 1;
  const year = parsed?.year ?? 2000;

  const lunar = solarToLunar({
    year,
    month,
    day,
    hour: birthHour !== undefined && !Number.isNaN(birthHour) ? birthHour : undefined,
  });

  const namTru: TruPillar = {
    can: lunar.canYear,
    chi: lunar.chiYear,
  };
  const thangTru: TruPillar = {
    can: lunar.canMonth,
    chi: lunar.chiMonth,
  };
  const ngayTru: TruPillar = {
    can: lunar.canDay,
    chi: lunar.chiDay,
  };

  let gioTru: TruPillar | null = null;
  const hasHour = birthHour !== undefined && !Number.isNaN(birthHour);
  if (hasHour) {
    gioTru = { can: lunar.canHour ?? "Giáp", chi: lunar.chiHour ?? "Ngọ" };
  }

  const nhatChu = ngayTru.can;
  const nhatChuElement = NGU_HANH_FROM_CAN[nhatChu] ?? "Thổ";
  const pillars = [namTru, thangTru, ngayTru, ...(gioTru ? [gioTru] : [])];
  const nguHanhCount = countElements(pillars);
  const dungThan = calcDungThan(nguHanhCount, nhatChuElement);
  const daiVan = calcDaiVan(lunar.lunarYear, gender, thangTru.can, thangTru.chi);

  return {
    namTru,
    thangTru,
    ngayTru,
    gioTru,
    nhatChu,
    nhatChuElement,
    nguHanhCount,
    dungThan,
    daiVanHienTai: daiVan.label,
    daiVanAge: daiVan.startAge,
    daiVanNote:
      "Giai đoạn này là cơ hội để chuẩn bị, học hỏi và củng cố nền tảng — hãy hành động có kế hoạch.",
    hasHour,
  };
}
