export type AgeGroup = "blocked" | "junior" | "teen" | "adult";

/** Whole years since birth date (Gregorian). */
export function calculateAge(birthDate: Date, at: Date = new Date()): number {
  let age = at.getFullYear() - birthDate.getFullYear();
  const monthDiff = at.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

/**
 * Junior 13–15 · Teen 16–17 · Adult 18+
 * blocked: under 13 (cannot use app)
 */
export function getAgeGroup(birthDate: Date): AgeGroup {
  const age = calculateAge(birthDate);
  if (age < 13) return "blocked";
  if (age <= 15) return "junior";
  if (age <= 17) return "teen";
  return "adult";
}

export function parseBirthDateInput(value: string): Date | null {
  const m = value.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    return null;
  }
  return d;
}
