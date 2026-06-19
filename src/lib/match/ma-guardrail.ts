// ma-guardrail.ts — Guardrail MA cho sân tập AI-driven
// Step 1: G1-G6 (vợ/chồng · bố mẹ · con nhỏ · con trưởng thành)
// Step 2: CHILD-SAFETY teen — crisis tiers + CS1-CS6 rules
// Interface khớp arena-case-generator.runGuardrail: { pass; reason? }

import {
  CHILD_TEEN_ROLEPLAY_A,
  type ChildTeenRolePlayA,
} from '../../data/match/child/child-teen-roleplay-a'
import { CHILD_ADULT_ROLEPLAY_A } from '../../data/match/child/child-adult-roleplay-a'
import { CHILD_YOUNG_ROLEPLAY_A } from '../../data/match/child/child-young-roleplay-a'
import { PARENT_ROLEPLAY_A } from '../../data/match/parent-roleplay-a'
import { SPOUSE_ROLEPLAY_A } from '../../data/match/spouse-roleplay-a'

/** Khớp pattern WA: arena-case-generator.runGuardrail */
export interface GuardrailResult {
  pass: boolean
  reason?: string
}

export type MAWeaknessSignal =
  | 'empathy_gap'
  | 'perspective_lack'
  | 'reactivity'
  | 'avoidance'
  | 'unknown'

export type MAContext =
  | 'spouse'
  | 'parent'
  | 'child-young'
  | 'child-adult'
  | 'child-teen'

export type MAChoiceId = 'c1' | 'c2' | 'c3'

export interface MAChoiceRecord {
  caseId: string
  choice: MAChoiceId
  context: MAContext
}

export const TEEN_USE_STATIC_POOL = false

// ── TEEN CRISIS PATTERNS ──────────────────────────────────
// PRIMARY: trigger ngay → fallback pool tĩnh + isCrisis: true
export const TEEN_CRISIS_PRIMARY = [
  'muốn chết',
  'không muốn sống',
  'tự làm đau',
  'tự hại',
  'không còn muốn',
  'biến mất mãi',
  'chán sống',
  'không muốn tồn tại',
  'bỏ tất cả',
  'không ai cần mình',
  'mọi người tốt hơn nếu không có mình',
  'muốn ngủ không thức dậy',
  'hết muốn cố',
  'không thiết nữa',
] as const

// SECONDARY: không block cứng · serve case nhẹ hơn từ pool tĩnh · không isCrisis
export const TEEN_CRISIS_SECONDARY = [
  'không ai quan tâm',
  'không ai hiểu mình',
  'mệt mỏi với tất cả',
] as const

export type TeenCrisisLevel = 'primary' | 'secondary' | null

export function checkTeenCrisisLevel(
  context: string,
  freeformInput?: string,
): TeenCrisisLevel {
  const text = (context + ' ' + (freeformInput ?? '')).toLowerCase()
  if (TEEN_CRISIS_PRIMARY.some((p) => text.includes(p))) return 'primary'
  if (TEEN_CRISIS_SECONDARY.some((p) => text.includes(p))) return 'secondary'
  return null
}

export const MA_GUARDRAIL_RULES = `
BẠN LÀ AI SINH CASE CHO SÂN TẬP QUAN HỆ (TNCB Match).
TUÂN THỦ TUYỆT ĐỐI 6 GUARDRAIL SAU:

G1 — KHÔNG NÓI HỘ NGƯỜI VẮNG NHƯ CHẮC:
  Khi setup/consequence nhắc đến người vắng (vợ/chồng/bố mẹ/con):
  → Dùng "có thể / thường / nhiều người" KHÔNG "chắc chắn họ nghĩ..."

G2 — KHÔNG BÀO CHỮA ÁP ĐẶT:
  Nếu case đề cập hành vi kiểm soát/áp đặt của người kia:
  → Consequence + feedback KHÔNG frame "họ có lý, nên nghe"
  → Frame "hiểu bối cảnh ≠ đồng tình với hành vi"

G3 — TRẢ VỀ NGƯỜI THẬT:
  MirrorMoment hoặc feedback cuối mỗi case:
  → Phải có câu dẫn về hành động thực ("thử nói với họ..." / "thử hỏi xem...")
  → KHÔNG: "app đã giải thích đủ rồi" (app không thay thế người thật)

G4 — NỖI SỢ THỨ 5 (bối cảnh bố mẹ):
  Nếu case chạm đến "bố mẹ nhận ra mình sai":
  → KHÔNG frame "vậy là bố mẹ sai rồi"
  → Frame "họ đang mang điều đó một mình"

G5 — KHÔNG CỔ XÚY CẮT ĐỨT:
  Consequence hoặc mirror KHÔNG BAO GIỜ kết bằng:
  "giữ khoảng cách" / "đặt ranh giới rồi đi" / "cut off"
  → VN context: giữ kết nối trong khác biệt

G6 — KHÔNG GOM GUILT-TRIP THÀNH THƯƠNG:
  Nếu case mô tả hành vi guilt-trip (im lặng trừng phạt, làm người kia thấy có lỗi):
  → KHÔNG label đó là "vì thương"
  → Để ngỏ: "có thể là thương vụng về, cũng có thể là kiểm soát qua cảm xúc"

NGOÀI RA:
  ❌ Cấm từ: tiềm năng / hành trình / bứt phá
  ❌ Không % · không khẳng định type người vắng · ngôi "bạn"
  ✅ Tiếng Việt tự nhiên (không dịch cứng)
  ✅ Consequence 2 chiều (cả choice "ngoan" cũng có cái mất)
  ✅ 3 choices khác nhau về CHIẾN LƯỢC (không na ná nhau)
`

// ── CHILD-SAFETY RULES (append khi maCtx === 'child-teen') ──
export const MA_CHILD_SAFETY_RULES = `

CHILD-SAFETY TEEN — BẮT BUỘC (áp thêm vào G1-G6 phía trên):

CS1: KHÔNG mô tả chi tiết tự hại (phương pháp / liều lượng / công cụ).
     Gói gọn: "con đang trải qua giai đoạn rất khó" — không chi tiết hóa.

CS3: Choice kiểm soát (đọc điện thoại/tin nhắn trộm · cài theo dõi · cấm không giải thích)
     KHÔNG được có consequence tích cực hoàn toàn.
     Consequence PHẢI honest: "nếu con phát hiện, niềm tin mất — khó lấy lại."

CS4: KHÔNG phán xét teen ("hư/nổi loạn/cố tình phá").
     Frame: hành vi = thông điệp cần giải mã.
     mirrorMoment hỏi về BỐ/MẸ (user), không phán xét teen.

CS5: KHÔNG catastrophize teen behavior bình thường.
     Case tập trung tình huống hàng ngày — không phải khủng hoảng.

CS6: TUYỆT ĐỐI không mention "111" hay bất kỳ hotline trong case.
     Nguồn hỗ trợ chỉ ở UI safety section — không trong case AI sinh.
` as const

const BANNED_WORDS = ['tiềm năng', 'hành trình', 'bứt phá']

const G1_FAIL_PATTERNS = [
  'chắc chắn họ',
  'họ chắc chắn',
  'chắc chắn là họ',
  'họ nhất định',
]

const G2_FAIL_PATTERNS = [
  'có lý, nên nghe',
  'nên nghe theo',
  'họ đúng, bạn nên',
  'họ có lý',
  'nên nghe lời',
]

const G3_FAIL_PATTERNS = [
  'app đã giải thích',
  'ứng dụng đã giải thích',
  'app đã nói đủ',
]

const G4_FAIL_PATTERNS = [
  'bố mẹ sai',
  'vậy là bố mẹ sai',
  'bố mẹ đã sai',
]

const G5_FAIL_PATTERNS = [
  'giữ khoảng cách',
  'đặt ranh giới rồi đi',
  'cut off',
  'cắt đứt',
  'bỏ mặc họ',
]

const G6_FAIL_PATTERNS = [
  'đó là vì thương',
  'vì thương nên im',
  'im lặng vì thương',
  'làm vậy vì thương',
]

type FewShotCase = {
  id: string
  group: string
  title: string
  hook: string
  setup: string
  choices: unknown
  consequences: unknown
  mirrorMoment: string
}

const FEW_SHOT_BY_CONTEXT: Record<Exclude<MAContext, 'child-teen'>, FewShotCase[]> =
  {
    spouse: [SPOUSE_ROLEPLAY_A[0]!, SPOUSE_ROLEPLAY_A[2]!],
    parent: [PARENT_ROLEPLAY_A[0]!, PARENT_ROLEPLAY_A[3]!],
    'child-young': [CHILD_YOUNG_ROLEPLAY_A[0]!, CHILD_YOUNG_ROLEPLAY_A[3]!],
    'child-adult': [CHILD_ADULT_ROLEPLAY_A[0]!, CHILD_ADULT_ROLEPLAY_A[3]!],
  }

export function getMAFewShot(context: MAContext): FewShotCase[] {
  if (context === 'child-teen') return []
  return FEW_SHOT_BY_CONTEXT[context]
}

export function getMAFewShotJson(context: MAContext): string {
  return JSON.stringify(getMAFewShot(context), null, 2)
}

export function detectMAWeakness(
  choiceHistory: MAChoiceRecord[],
): MAWeaknessSignal {
  if (choiceHistory.length === 0) return 'unknown'

  const recent = choiceHistory.slice(-4)
  const counts = { c1: 0, c2: 0, c3: 0 }
  for (const entry of recent) {
    counts[entry.choice] += 1
  }

  if (counts.c1 >= 3) return 'reactivity'
  if (counts.c2 >= 3) return 'avoidance'
  if (counts.c1 >= 2 && counts.c2 === 0) return 'reactivity'
  if (counts.c2 >= 2 && counts.c1 === 0) return 'avoidance'
  if (counts.c3 === 0 && recent.length >= 2) return 'empathy_gap'
  if (counts.c1 >= 2 && counts.c3 >= 1) return 'perspective_lack'

  return 'unknown'
}

export function buildMANextCasePrompt(params: {
  context: MAContext
  weakness: MAWeaknessSignal
  painId: string
  previousChoices: string[]
  fewShotCases?: string
}): string {
  const fewShot =
    params.fewShotCases ?? getMAFewShotJson(params.context)
  const childSafetyAddition =
    params.context === 'child-teen' ? MA_CHILD_SAFETY_RULES : ''

  return `
${MA_GUARDRAIL_RULES}${childSafetyAddition}

CONTEXT HIỆN TẠI: ${params.context} · Chủ đề: ${params.painId}
ĐIỂM CẦN RÈN: ${params.weakness}
LỊCH SỬ USER: ${params.previousChoices.join(', ') || '(chưa có)'}

CASE MẪU (giữ đúng tone + format này):
${fewShot}

SINH 1 CASE MỚI cho context và weakness trên.
Format GIỐNG HỆT case mẫu (id/group/title/hook/setup/choices/consequences/mirrorMoment).
mirrorMoment HỎI VỀ USER (bố/mẹ/người trong quan hệ) — KHÔNG hỏi về người vắng.
Trả về JSON thuần, không markdown.
  `.trim()
}

function matchesAny(lower: string, patterns: string[]): string | undefined {
  return patterns.find((p) => lower.includes(p))
}

/** Kiểm tra output AI sinh case — pattern giống arena-case-generator.runGuardrail */
export function runMAGuardrail(caseJson: string): GuardrailResult {
  const lower = caseJson.toLowerCase()

  const banned = BANNED_WORDS.find((w) => lower.includes(w))
  if (banned) return { pass: false, reason: `banned-word:${banned}` }

  const g1 = matchesAny(lower, G1_FAIL_PATTERNS)
  if (g1) return { pass: false, reason: 'g1-certainty-about-absent' }

  const g2 = matchesAny(lower, G2_FAIL_PATTERNS)
  if (g2) return { pass: false, reason: 'g2-coercion-justified' }

  const g3 = matchesAny(lower, G3_FAIL_PATTERNS)
  if (g3) return { pass: false, reason: 'g3-app-replaces-human' }

  const g4 = matchesAny(lower, G4_FAIL_PATTERNS)
  if (g4) return { pass: false, reason: 'g4-parent-blame-frame' }

  const g5 = matchesAny(lower, G5_FAIL_PATTERNS)
  if (g5) return { pass: false, reason: 'g5-cut-off' }

  const g6 = matchesAny(lower, G6_FAIL_PATTERNS)
  if (g6) return { pass: false, reason: 'g6-guilt-trip-as-love' }

  return { pass: true }
}

type StaticCase = ChildTeenRolePlayA

export type TeenRolePlayGroup = StaticCase['group']

/**
 * Teen: pool tĩnh, không AI.
 */
export function serveFromStaticPool<T extends { id: string }>(
  pool: T[],
  servedIds: string[] = [],
): T | null {
  if (pool.length === 0) return null
  const remaining = pool.filter((c) => !servedIds.includes(c.id))
  const source = remaining.length > 0 ? remaining : pool
  return source[Math.floor(Math.random() * source.length)] ?? null
}

export function serveTeenStaticCase(
  servedIds: string[] = [],
  groupFilter?: TeenRolePlayGroup,
): StaticCase | null {
  let pool = CHILD_TEEN_ROLEPLAY_A
  if (groupFilter) {
    const filtered = pool.filter((c) => c.group === groupFilter)
    if (filtered.length > 0) pool = filtered
  }
  return serveFromStaticPool(pool, servedIds)
}

/**
 * Wire vào nextCaseAdaptive khi session.context === 'match' (Step sau — chưa đụng arena-session).
 *
 * if (session.context === 'match') {
 *   if (session.maContext === 'child-teen' || TEEN_USE_STATIC_POOL) {
 *     return serveTeenStaticCase(session.servedCaseIds)
 *   }
 *   const weakness = detectMAWeakness(session.choiceHistory)
 *   const prompt = buildMANextCasePrompt({ ... })
 *   const raw = await llmAdapter.generate(prompt)
 *   const guardrailResult = runMAGuardrail(jsonMatch[0])
 *   ...
 * }
 */
