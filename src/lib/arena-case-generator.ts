// Arena Case Generator — B3 AI adaptive case · few-shot + guardrail · fallback pool

import { ROLEPLAY_CASES } from '../data/roleplay-case-studies'
import type {
  CaseRole,
  Choice,
  Consequence,
  MbtiGroup,
  RolePlayCase,
  TypeFeedback,
} from '../data/roleplay-case-studies'
import type { ArcCharacters, NarrativeContext } from './arena-arc'
import { detectCrisis, hasSelfBurnoutSignal } from './crisis-detect'
import { getProgress, type ArenaProgressRole } from './arena-progress'
import { callLLM } from './llm-adapter'

export type AdaptiveCaseRole = Exclude<ArenaProgressRole, 'random'>

export type GeneratedCase = RolePlayCase & {
  isAiGenerated: true
  arcComplete?: boolean
}

const SYSTEM_PROMPT_CASE_GEN = `
Bạn là trợ lý tạo tình huống luyện kỹ năng giao tiếp công sở cho người Việt.
Nhiệm vụ: viết 1 tình huống theo ĐÚNG ĐỊNH DẠNG JSON bên dưới.

NGUYÊN TẮC CỨNG:
- Ngôi "bạn" · tiếng Việt tự nhiên · không từ cấm (tiềm năng/hành trình/bứt phá)
- Không rank người (không "nhân viên này kém hơn") · không khuyên hire/fire
- Không phán type MBTI là tốt/xấu · tất cả neutral
- Không tình huống chạm crisis (burnout nặng/muốn nghỉ việc/tâm lý khủng hoảng)
- 3 lựa chọn KHÁC NHAU chiến lược (không trùng ý)
- Hệ quả honest: không lựa chọn nào "hoàn hảo", mỗi cái có đánh đổi

TIẾNG VIỆT TỰ NHIÊN (bắt buộc):
- Viết như người Việt nói chuyện thật, KHÔNG dịch thô từ tiếng Anh.
- TRÁNH các cụm dịch máy: "đang tải" (theo nghĩa nhiều việc), "vắt chéo quy trình",
  "tối ưu hóa nguồn lực", "đồng bộ hóa", "tận dụng đòn bẩy".
- Khối lượng công việc → nói "nhiều việc / quá nhiều việc / làm không xuể / đuối / ôm việc",
  KHÔNG nói "bị tải / quá tải" theo kiểu dịch.
- Ưu tiên từ thuần Việt đời thường. Thuật ngữ tiếng Anh chỉ giữ khi đã quá phổ biến
  (deadline, KPI, email, team, agency) — còn lại dịch tự nhiên.
- KHÔNG chèn từ tiếng Anh khi có từ Việt tương đương. Cụ thể TRÁNH:
  bottleneck, asset, outsource, standard, brief, deal, trigger, mentor,
  pair-working, leverage, optimize.
  → dùng: nút thắt, sản phẩm, thuê ngoài, tiêu chuẩn, yêu cầu công việc,
    hợp đồng, kích hoạt, người kèm cặp, làm theo cặp, điểm tạo khác biệt.
- CHỈ giữ tiếng Anh: deadline, KPI, email, team, agency (đã phổ biến ở VN).
- Đọc lại câu vừa viết: nếu nghe "Tây" hoặc cứng → viết lại cho mượt.
`.trim()

const SELECTION_KEYWORDS = [
  'sa thải',
  'đuổi việc',
  'loại khỏi',
  'không nên thuê',
  'không thuê',
  'chưa đủ tiêu chuẩn tuyển',
  'fire',
  'không đủ năng lực',
]
const CRISIS_KEYWORDS = [
  'muốn nghỉ hết',
  'không trụ nổi',
  'kiệt sức hoàn toàn',
  'trầm cảm',
  'muốn bỏ việc',
]
const TYPE_JUDGMENT_KEYWORDS = [
  'type này giỏi hơn',
  'type kia kém',
  'MBTI tốt nhất',
  'phù hợp nhất là',
]

const MAX_RETRIES = 2

const ROLE_CONTEXT: Record<AdaptiveCaseRole, string> = {
  MG: 'quản lý 1-1 với nhân viên (góc nhìn người quản lý)',
  KH: 'xử lý khách hàng (không có authority, cần negotiate)',
  DT: 'làm việc với đối tác bên ngoài (ngang hàng, có nghĩa vụ hợp đồng)',
  VT: 'người vừa nhận vai trò mới — đang điều chỉnh cách làm việc, giao tiếp và kỳ vọng với những người xung quanh',
  boss: 'giao tiếp với sếp (góc nhìn nhân viên, không có authority)',
  peer: 'hợp tác với đồng nghiệp ngang hàng (không authority, cần cooperation)',
}

function poolRoleForAdaptive(role: AdaptiveCaseRole): CaseRole {
  if (role === 'boss' || role === 'peer') return 'NV'
  return role
}

function getFewShotPool(role: AdaptiveCaseRole): RolePlayCase[] {
  if (role === 'peer') {
    return ROLEPLAY_CASES.filter(
      (c) =>
        c.title.toLowerCase().includes('đồng nghiệp') ||
        c.tags.some((t) => t.includes('peer')),
    )
  }
  if (role === 'boss') {
    return ROLEPLAY_CASES.filter(
      (c) =>
        c.role === 'NV' &&
        (c.title.toLowerCase().includes('sếp') ||
          ['NV-01', 'NV-03', 'NV-07'].includes(c.id)),
    )
  }
  return ROLEPLAY_CASES.filter((c) => c.role === role)
}

function getFewShotExamples(role: AdaptiveCaseRole): string {
  const samples = getFewShotPool(role).slice(0, 2)
  if (samples.length === 0) return ''

  return samples
    .map(
      (c) => `
VÍ DỤ CASE:
Hook: ${c.hook}
Setup: ${c.setup}
Lựa chọn A: ${c.choices[0]?.action}
Lựa chọn B: ${c.choices[1]?.action}
Lựa chọn C: ${c.choices[2]?.action}
Hệ quả A ngay: ${c.consequences.find((x) => x.choiceId === c.choices[0]?.id)?.immediate}
Mirror: ${c.mirrorMoment}
`,
    )
    .join('\n---\n')
}

async function getWeaknessHint(role: AdaptiveCaseRole): Promise<string> {
  const progress = await getProgress()
  const rp = progress[role]
  if (!rp || rp.choiceLog.length === 0) return ''

  const lastChoice = rp.choiceLog[rp.choiceLog.length - 1]!
  return `Người dùng vừa xử tình huống ${lastChoice.caseId}, chọn "${lastChoice.choiceId}". Sinh case thử thách khía cạnh KHÁC.`
}

function buildCasePrompt(
  role: AdaptiveCaseRole,
  weaknessHint: string,
  fewShot: string,
): string {
  return `
${fewShot ? `CÁC VÍ DỤ MẪU (giữ tone và chất lượng tương tự):\n${fewShot}\n---\n` : ''}

NGỮ CẢNH LOẠI TÌNH HUỐNG: ${ROLE_CONTEXT[role]}
${weaknessHint ? `GỢI Ý TẬP TRUNG: ${weaknessHint}` : ''}

Viết 1 tình huống MỚI (khác với ví dụ mẫu). Trả về ĐÚNG JSON sau, không thêm gì khác:

{
  "hook": "2-3 câu tình huống mở đầu",
  "setup": "bối cảnh ngắn gọn",
  "choices": [
    { "id": "A", "label": "Lựa chọn A", "action": "mô tả hành động" },
    { "id": "B", "label": "Lựa chọn B", "action": "mô tả hành động" },
    { "id": "C", "label": "Lựa chọn C", "action": "mô tả hành động" }
  ],
  "consequences": [
    { "choiceId": "A", "immediate": "hệ quả ngay", "later": "hệ quả sau" },
    { "choiceId": "B", "immediate": "hệ quả ngay", "later": "hệ quả sau" },
    { "choiceId": "C", "immediate": "hệ quả ngay", "later": "hệ quả sau" }
  ],
  "typeFeedback": [
    { "group": "ST", "text": "phản hồi cho nhóm ST" },
    { "group": "SF", "text": "phản hồi cho nhóm SF" },
    { "group": "NF", "text": "phản hồi cho nhóm NF" },
    { "group": "NT", "text": "phản hồi cho nhóm NT" }
  ],
  "mirrorMoment": "câu soi chiếu cuối — câu hỏi để người dùng tự hỏi"
}
`.trim()
}

export function runGuardrail(caseJson: string): { pass: boolean; reason?: string } {
  const lower = caseJson.toLowerCase()
  if (SELECTION_KEYWORDS.some((k) => lower.includes(k))) {
    return { pass: false, reason: 'anti-selection' }
  }
  if (CRISIS_KEYWORDS.some((k) => lower.includes(k))) {
    return { pass: false, reason: 'crisis-detected' }
  }
  if (TYPE_JUDGMENT_KEYWORDS.some((k) => lower.includes(k))) {
    return { pass: false, reason: 'type-judgment' }
  }
  return { pass: true }
}

interface ParsedCasePayload {
  hook?: string
  setup?: string
  choices?: Array<{ id?: string; label?: string; action?: string }>
  consequences?: Array<{ choiceId?: string; immediate?: string; later?: string }>
  typeFeedback?: Array<{ group?: string; text?: string }>
  mirrorMoment?: string
  arcComplete?: boolean
}

function adaptiveRoleForCaseRole(role: CaseRole): AdaptiveCaseRole {
  if (role === 'NV') return 'MG'
  return role
}

function buildArcPrompt(ctx: NarrativeContext, fewShot: string, contextHint?: string): string {
  const charDesc = Object.entries(ctx.characters)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(' · ')

  const difficultyNote = {
    1: 'Level 1 (tutorial): tình huống rõ, 3 lựa chọn phân biệt dễ.',
    2: 'Level 2: KHÔNG có lựa chọn an toàn — mọi lựa chọn đều có cái mất.',
    3: 'Level 3 (khoảnh khắc quyết định): 1 lựa chọn sai kéo câu chuyện theo hướng rất khó.',
  }[ctx.difficultyLevel]

  return `
${fewShot ? `VÍ DỤ MẪU (giữ tone):\n${fewShot}\n---\n` : ''}
${contextHint ? `BỐI CẢNH USER (từ màn nguồn — ưu tiên bám sát):\n${contextHint}\n---\n` : ''}

ĐANG TRONG MỘT TẬP TRUYỆN (narrative arc):
- Tập: ${ctx.arcId} · Case thứ ${ctx.episodeNumber}
- Nhân vật GIỮ NGUYÊN xuyên suốt: ${charDesc}
${ctx.previousOutcome ? `- Chuyện vừa xảy ra (case trước): ${ctx.previousOutcome}` : '- Đây là case mở đầu tập.'}
- ${difficultyNote}

Viết case TIẾP THEO — MOC RA TỪ chuyện vừa xảy ra, KHÔNG phải case độc lập.
Giữ đúng nhân vật + bối cảnh. Câu chuyện phải LIÊN TỤC.

Trả về JSON (thêm field "arcComplete": true nếu đây là cao trào kết tập tự nhiên):
{
  "hook": "...", "setup": "...",
  "choices": [{"id":"A","label":"...","action":"..."},{"id":"B",...},{"id":"C",...}],
  "consequences": [{"choiceId":"A","immediate":"...","later":"..."},...],
  "typeFeedback": [{"group":"ST","text":"..."},{"group":"SF",...},{"group":"NF",...},{"group":"NT",...}],
  "mirrorMoment": "...",
  "arcComplete": false
}
`.trim()
}

function isChoiceId(id: string): id is 'A' | 'B' | 'C' {
  return id === 'A' || id === 'B' || id === 'C'
}

function isMbtiGroup(group: string): group is MbtiGroup {
  return group === 'ST' || group === 'SF' || group === 'NF' || group === 'NT'
}

function normalizeParsedCase(
  parsed: ParsedCasePayload,
  adaptiveRole: AdaptiveCaseRole,
): GeneratedCase | null {
  if (!parsed.hook || !parsed.setup || !parsed.mirrorMoment) return null
  if (!parsed.choices || parsed.choices.length < 3) return null
  if (!parsed.consequences || parsed.consequences.length < 3) return null
  if (!parsed.typeFeedback || parsed.typeFeedback.length < 4) return null

  const choices: Choice[] = []
  for (const raw of parsed.choices.slice(0, 3)) {
    if (!raw.id || !isChoiceId(raw.id) || !raw.label || !raw.action) return null
    choices.push({ id: raw.id, label: raw.label, action: raw.action })
  }

  const consequences: Consequence[] = []
  for (const raw of parsed.consequences) {
    if (!raw.choiceId || !isChoiceId(raw.choiceId) || !raw.immediate || !raw.later) {
      return null
    }
    consequences.push({
      choiceId: raw.choiceId,
      immediate: raw.immediate,
      later: raw.later,
    })
  }

  const typeFeedback: TypeFeedback[] = []
  for (const raw of parsed.typeFeedback) {
    if (!raw.group || !isMbtiGroup(raw.group) || !raw.text) return null
    typeFeedback.push({ group: raw.group, text: raw.text })
  }

  const poolRole = poolRoleForAdaptive(adaptiveRole)
  const hookPreview = parsed.hook.replace(/\s+/g, ' ').trim()
  const title =
    hookPreview.length > 40 ? `${hookPreview.slice(0, 40)}...` : hookPreview

  return {
    id: `AI-${adaptiveRole}-${Date.now()}`,
    role: poolRole,
    title,
    tags: ['ai-generated', adaptiveRole],
    hook: parsed.hook,
    setup: parsed.setup,
    choices,
    consequences,
    typeFeedback,
    mirrorMoment: parsed.mirrorMoment,
    isAiGenerated: true,
  }
}

export async function generateAdaptiveCase(
  role: AdaptiveCaseRole,
  _mbtiType?: string,
): Promise<GeneratedCase | null> {
  const [fewShot, weaknessHint] = await Promise.all([
    Promise.resolve(getFewShotExamples(role)),
    getWeaknessHint(role),
  ])

  const prompt = buildCasePrompt(role, weaknessHint, fewShot)

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callLLM(prompt, SYSTEM_PROMPT_CASE_GEN)

      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (!jsonMatch) continue

      const guardrailResult = runGuardrail(jsonMatch[0])
      if (!guardrailResult.pass) {
        console.warn(`[Arena] Guardrail fail: ${guardrailResult.reason}, retry ${attempt}`)
        continue
      }

      const lastBrace = jsonMatch[0].lastIndexOf('}')
      const trimmed =
        lastBrace >= 0 ? jsonMatch[0].slice(0, lastBrace + 1) : jsonMatch[0]
      const cleaned = trimmed
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
      const parsed = JSON.parse(cleaned) as ParsedCasePayload
      const normalized = normalizeParsedCase(parsed, role)
      if (!normalized) continue

      return normalized
    } catch (e) {
      console.warn('[Arena] Generate attempt failed:', e)
    }
  }

  return null
}

/** Sinh case tiếp THEO arc (premium tập 2+) */
export async function generateArcEpisode(
  ctx: NarrativeContext,
  contextHint?: string,
): Promise<GeneratedCase | null> {
  const adaptiveRole = adaptiveRoleForCaseRole(ctx.role)
  const fewShot = getFewShotExamples(adaptiveRole)
  const prompt = buildArcPrompt(ctx, fewShot, contextHint)

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callLLM(prompt, SYSTEM_PROMPT_CASE_GEN)

      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (!jsonMatch) continue

      const lastBrace = jsonMatch[0].lastIndexOf('}')
      const trimmed =
        lastBrace >= 0 ? jsonMatch[0].slice(0, lastBrace + 1) : jsonMatch[0]
      const cleaned = trimmed
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')

      const guardrailResult = runGuardrail(cleaned)
      if (!guardrailResult.pass) {
        console.warn(`[Arena] Arc guardrail fail: ${guardrailResult.reason}, retry ${attempt}`)
        continue
      }

      const parsed = JSON.parse(cleaned) as ParsedCasePayload
      const normalized = normalizeParsedCase(parsed, adaptiveRole)
      if (!normalized) continue

      const hookPreview = parsed.hook!.replace(/\s+/g, ' ').trim()
      const title =
        hookPreview.length > 40 ? `${hookPreview.slice(0, 40)}...` : hookPreview

      return {
        ...normalized,
        id: `arc-${ctx.arcId}-ep${ctx.episodeNumber}`,
        role: ctx.role,
        title,
        tags: ['ai-arc', ctx.role],
        arcComplete: parsed.arcComplete === true,
      }
    } catch (e) {
      console.warn('[Arena] Arc episode fail:', e)
    }
  }

  return null
}

export interface FreeformResult {
  immediate: string
  later: string
  reflection: string
}

export interface FreeformCaseContext {
  hook: string
  setup: string
  characters?: ArcCharacters
}

const FREEFORM_CRISIS_PHRASES = ['muốn nghỉ việc', 'muốn bỏ việc', 'nghỉ việc luôn', 'bỏ việc luôn']

function isFreeformCrisisInput(text: string): boolean {
  if (detectCrisis(text) || hasSelfBurnoutSignal(text)) return true
  const lower = text.toLowerCase()
  return FREEFORM_CRISIS_PHRASES.some((p) => lower.includes(p))
}

/** Validate freeform input TRƯỚC khi gửi AI */
export function validateFreeformInput(input: string): { valid: boolean; reason?: string } {
  const trimmed = input.trim()
  if (trimmed.length < 5) return { valid: false, reason: 'too-short' }
  if (trimmed.length > 300) return { valid: false, reason: 'too-long' }
  if (isFreeformCrisisInput(trimmed)) return { valid: false, reason: 'crisis' }
  return { valid: true }
}

const SYSTEM_PROMPT_FREEFORM = `
Bạn phân tích cách xử lý công sở của người dùng trong tình huống luyện tập.
Sinh hậu quả theo ĐÚNG cách họ mô tả — không dùng template có sẵn.

NGUYÊN TẮC:
- Tiếng Việt tự nhiên · ngôi "bạn"
- Hậu quả HONEST: mọi cách xử đều có cái được và cái mất
- KHÔNG khen/chê · reflection chỉ soi chiếu, không phán xét
- Không khuyên sa thải/tuyển dụng · không cổ vũ hành vi cực đoan
- Input mơ hồ/gibberish → immediate mô tả "tình huống bị bỏ ngỏ", gợi thử lại rõ hơn
`.trim()

/** Sinh hậu quả theo ĐÚNG cách user xử */
export async function generateFreeformConsequence(
  caseContext: FreeformCaseContext,
  userInput: string,
): Promise<FreeformResult | null> {
  const validation = validateFreeformInput(userInput)
  if (!validation.valid) return null

  const charDesc = caseContext.characters
    ? Object.entries(caseContext.characters)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join(' · ')
    : ''

  const prompt = `
TÌNH HUỐNG:
${caseContext.hook}
${caseContext.setup}
${charDesc ? `Nhân vật: ${charDesc}` : ''}

NGƯỜI DÙNG XỬ LÝ BẰNG CÁCH (lời của chính họ):
"${userInput.trim()}"

Sinh hậu quả phù hợp với ĐÚNG cách xử trên — KHÔNG dùng hậu quả mẫu.
Hậu quả phải HONEST: cách xử nào cũng có cái được và cái mất.
Nếu cách xử mơ hồ/không rõ hành động → hậu quả "tình huống bị bỏ ngỏ" + gợi thử lại.

Trả về JSON:
{
  "immediate": "hậu quả ngay (2-3 câu, theo đúng cách user xử)",
  "later": "hậu quả về sau (2-3 câu)",
  "reflection": "1 câu soi chiếu — KHÔNG khen/chê, chỉ phản chiếu cách xử"
}
`.trim()

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const raw = await callLLM(prompt, SYSTEM_PROMPT_FREEFORM)

      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      if (!jsonMatch) continue

      const lastBrace = jsonMatch[0].lastIndexOf('}')
      const trimmedJson =
        lastBrace >= 0 ? jsonMatch[0].slice(0, lastBrace + 1) : jsonMatch[0]
      const cleaned = trimmedJson
        .replace(/[\u0000-\u001F\u007F]/g, ' ')
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')

      if (!runGuardrail(cleaned).pass) continue

      const parsed = JSON.parse(cleaned) as Partial<FreeformResult>
      if (!parsed.immediate || !parsed.later) continue

      return {
        immediate: parsed.immediate,
        later: parsed.later,
        reflection: parsed.reflection ?? 'Cách bạn xử có điều gì bạn muốn giữ — và điều gì bạn sẵn sàng đánh đổi?',
      }
    } catch (e) {
      console.warn('[Arena] Freeform fail:', e)
    }
  }

  return null
}
