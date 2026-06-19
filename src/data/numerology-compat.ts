import { NUMEROLOGY_DATA } from "./numerology";

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

function baseScore(a: number, b: number): number {
  if (a === b) return 72;
  const pa = NUMEROLOGY_DATA[a];
  const pb = NUMEROLOGY_DATA[b];
  if (pa?.compatible.includes(b) || pb?.compatible.includes(a)) return 88;
  const diff = Math.abs(a - b);
  if (diff <= 2) return 70;
  if (diff <= 4) return 58;
  return 48;
}

function buildMatrix(): Record<number, Record<number, number>> {
  const m: Record<number, Record<number, number>> = {};
  for (const a of NUMBERS) {
    m[a] = {};
    for (const b of NUMBERS) {
      m[a][b] = baseScore(a, b);
    }
  }
  return m;
}

export const NUMEROLOGY_COMPATIBILITY: Record<number, Record<number, number>> = buildMatrix();

export function getNumerologyCompat(a: number, b: number): number {
  return NUMEROLOGY_COMPATIBILITY[a]?.[b] ?? 55;
}
