/**
 * Filter + sort Layer Q chips theo Big Five N+A
 * Không sửa content — chỉ sắp xếp ưu tiên
 */

export interface Big5NA {
  N: number
  A: number
}

/** Dexie big5Profile lưu thang 1–5 → chuẩn hóa 0–100 */
export function big5ScoreToPercent(score: number): number {
  return ((score - 1) / 4) * 100
}

export function big5ProfileToNA(profile: { N: number; A: number }): Big5NA {
  return {
    N: big5ScoreToPercent(profile.N),
    A: big5ScoreToPercent(profile.A),
  }
}

export function calibrateChips(
  questions: string[],
  big5NA: Big5NA | null,
): string[] {
  if (!big5NA || questions.length <= 1) return questions

  const { N, A } = big5NA

  const score = (q: string): number => {
    let s = 0
    const lower = q.toLowerCase()

    const isExperience = /đã từng|gần đây|lần|kỷ niệm|hôm qua|tuần|tháng/.test(lower)
    const isScenario = /nếu|giả sử|thử tưởng tượng|sẽ làm gì/.test(lower)
    const isOpinion = /thấy|nghĩ|theo bạn|quan điểm|bạn có|bạn thấy/.test(lower)
    const isValues = /quan trọng|ý nghĩa|điều gì|giá trị|tin vào/.test(lower)

    if (N > 60 && isExperience) s += 2
    if (N > 60 && isScenario) s -= 1
    if (N < 40 && isScenario) s += 1

    if (A < 40 && isOpinion) s += 2
    if (A < 40 && isValues) s -= 1
    if (A > 60 && isValues) s += 2

    return s
  }

  return [...questions].sort((a, b) => score(b) - score(a))
}
