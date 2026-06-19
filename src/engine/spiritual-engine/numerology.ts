export const MASTER_NUMBERS = [11, 22, 33] as const;

const LETTER_TO_NUMBER: Record<string, number> = {
  a: 1,
  ă: 1,
  â: 1,
  b: 2,
  c: 3,
  d: 4,
  đ: 4,
  e: 5,
  ê: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 1,
  k: 2,
  l: 3,
  m: 4,
  n: 5,
  o: 6,
  ô: 6,
  ơ: 6,
  p: 7,
  q: 8,
  r: 9,
  s: 1,
  t: 2,
  u: 3,
  ư: 3,
  v: 4,
  w: 5,
  x: 6,
  y: 7,
  z: 8,
};

const VOWELS = new Set(["a", "e", "i", "o", "u", "ă", "â", "ê", "ô", "ơ", "ư"]);

export function reduceToSingleDigit(sum: number): number {
  let n = sum;
  while (n > 9 && !MASTER_NUMBERS.includes(n as (typeof MASTER_NUMBERS)[number])) {
    n = String(n)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return n;
}

/** Tone marks only — keep horn/breve/circumflex that define ă â ê ô ơ ư */
const TONE_MARKS = /[\u0300\u0301\u0303\u0309\u0323]/g;

function mapBaseWithMarks(base: string, marks: string): string {
  const hasBreve = marks.includes("\u0306");
  const hasCircumflex = marks.includes("\u0302");
  const hasHorn = marks.includes("\u031b");
  if (base === "a" && hasBreve) return "ă";
  if (base === "a" && hasCircumflex) return "â";
  if (base === "e" && hasCircumflex) return "ê";
  if (base === "o" && hasCircumflex) return "ô";
  if (base === "o" && hasHorn) return "ơ";
  if (base === "u" && hasHorn) return "ư";
  return base;
}

function normalizeName(name: string): string {
  const VN_SPECIAL = "ăâđêôơư";
  return name
    .toLowerCase()
    .split("")
    .map((char) => {
      if (VN_SPECIAL.includes(char)) return char;
      const decomposed = char.normalize("NFD");
      const base = decomposed.charAt(0);
      if (!/^[a-z]$/.test(base)) return "";
      const marks = decomposed.slice(1).replace(TONE_MARKS, "");
      return mapBaseWithMarks(base, marks);
    })
    .join("");
}

export function parseDob(dob: string): { day: number; month: number; year: number } | null {
  const m = dob.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return null;
  return { day: +m[1]!, month: +m[2]!, year: +m[3]! };
}

function sumDigits(str: string): number {
  return str.split("").map(Number).reduce((a, b) => a + b, 0);
}

export function calculateLifePath(dob: string): number {
  const normalized = dob.replace(/[-.]/g, "/");
  const parts = normalized.split("/");
  if (parts.length !== 3) return 1;

  const day = reduceToSingleDigit(sumDigits(parts[0]));
  const month = reduceToSingleDigit(sumDigits(parts[1]));
  const year = reduceToSingleDigit(sumDigits(parts[2]));

  return reduceToSingleDigit(day + month + year);
}

export function calculateExpressionNumber(fullName: string): number {
  const normalized = normalizeName(fullName);
  const sum = normalized.split("").reduce((acc, char) => acc + (LETTER_TO_NUMBER[char] ?? 0), 0);
  return reduceToSingleDigit(sum || 1);
}

export function calculateSoulUrge(fullName: string): number {
  const normalized = normalizeName(fullName);
  const sum = normalized
    .split("")
    .filter((c) => VOWELS.has(c))
    .reduce((acc, c) => acc + (LETTER_TO_NUMBER[c] ?? 0), 0);
  return reduceToSingleDigit(sum || 1);
}

export function calculatePersonalityNumber(fullName: string): number {
  const normalized = normalizeName(fullName);
  const sum = normalized
    .split("")
    .filter((c) => !VOWELS.has(c))
    .reduce((acc, c) => acc + (LETTER_TO_NUMBER[c] ?? 0), 0);
  return reduceToSingleDigit(sum || 1);
}

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
}

export function calculateNumerology(fullName: string, dob: string): NumerologyResult {
  return {
    lifePath: calculateLifePath(dob),
    expression: calculateExpressionNumber(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonalityNumber(fullName),
  };
}
