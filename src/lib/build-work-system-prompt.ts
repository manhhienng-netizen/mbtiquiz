import type { GroupKey } from '../data/voice-lexicon'
import type { WorkLevel } from '../db/tncb-db'
import { WORK_LEVEL_LABELS } from '../db/tncb-db'
import {
  AI_BOUNDARY_RULE,
  buildCrisisOnlySystemPrompt,
  buildGroupVoiceBlock,
} from './system-prompt'
import {
  buildModeGuidanceBlock,
  buildStyleBlock,
  detectResponseMode,
  isContextSharing,
  parseUserStyleSignals,
  type AssertiveTurbulent,
} from './style-adapter'
import { formatAgeContextLine } from './user-age'
import { DISC_LABELS } from '../data/disc-items'
import type { DiscProfile, DiscLetter } from './disc-scoring'

export interface WorkSystemPromptParams {
  mbtiType: string
  occupation: string | null
  level: WorkLevel | null
  age: number | null
  voice: GroupKey
  identity: AssertiveTurbulent
  userMessage: string
  crisisTurn: boolean
  skipStyle: boolean
  commBlock: string | null
  kbBlock: string | null
  situationalBlock: string | null
  summaryBlock: string | null
  /** Số message trước câu user hiện tại trong history gửi LLM (0 = single-turn). */
  priorTurnCount?: number
  /** RP2 — inject sau PERSONA, trước KB. */
  roleplayBlock?: string | null
  /** RP2 — không inject comm/leadership KB khi role-play. */
  skipKBInject?: boolean
  /** DISC phong cách làm việc — optional. */
  discProfile?: DiscProfile | null
  /** Big Five C calibration — optional [C_HIGH] / [C_LOW]. */
  cNote?: string | null
}

const WORK_RULES = [
  '[RULES — CỨNG]',
  '- Ngôi "bạn", tiếng Việt',
  '- Honest, không nịnh, không "hành trình/tiềm năng/bứt phá"',
  '- KHÔNG mention tên sách/framework (BATNA/SBI/GROW/RACI/Gottman/Voss...)',
  '- KHÔNG dùng placeholder trong ngoặc vuông như [tên], [cụ thể], [X], [gợi ý].',
  '  Cần ví dụ → viết cụ thể thật; không có info → "người đó"/"việc này" tự nhiên, không để chỗ trống [].',
  '- Trả lời tiếng Việt thuần. Tránh chèn từ Anh giữa câu (passively/actively...) trừ thuật ngữ quen: deadline, email, team, 1-1, OK.',
  '- Comm/tư vấn cụ thể: 3–5 câu HOÀN CHỈNH (kết thúc trọn ý); chat ngắn khác: 2–4 đoạn',
  '- Công việc là scope chính nhưng KHÔNG từ chối cứng câu ngoài scope',
  '- Mỗi lượt khác lượt trước — đa dạng cách mở đầu, KHÔNG lặp cùng 1 từ mở ("Ừ", "Được") nhiều lượt liên tiếp.',
  '- Không bắt buộc công thức "bước đầu tiên là..." ở cuối mỗi câu trả lời.',
].join('\n')

function buildPersonaBlock(params: WorkSystemPromptParams): string {
  const lines = [
    '[PERSONA]',
    'Bạn là trợ lý công việc của người dùng.',
    `Type: ${params.mbtiType} — dùng NGẦM để tư vấn sát; KHÔNG nhồi "vì bạn là ${params.mbtiType}" vào mỗi câu.`,
  ]

  if (params.occupation?.trim()) {
    const levelLabel = params.level ? WORK_LEVEL_LABELS[params.level] : ''
    lines.push(
      `Nghề: ${params.occupation.trim()}${levelLabel ? ` · Cấp độ: ${levelLabel}` : ''}`,
      '→ Bám ngữ cảnh nghề khi gợi ý (impact đo được, stakeholder, deliverable) — không đọc lại metadata cho user.',
    )
  }

  const ageLine = formatAgeContextLine(params.age)
  if (ageLine) {
    lines.push(ageLine)
  }

  return lines.join('\n')
}

function buildInjectedKBBlock(
  commBlock: string | null,
  kbBlock: string | null,
  situationalBlock: string | null,
): string | null {
  const parts: string[] = []
  if (commBlock) parts.push(commBlock)
  else if (kbBlock) parts.push(kbBlock)
  else if (situationalBlock) parts.push(situationalBlock)

  if (parts.length === 0) return null
  return [
    '[KIẾN THỨC THAM CHIẾU — các Ý CHÍNH cần truyền tải, không phải văn bản để chép]',
    'Diễn đạt lại bằng lời của bạn theo GIỌNG [VOICE] bên dưới — KHÔNG copy câu mẫu/email mẫu nguyên văn.',
    'KB = nói CÁI GÌ (lời khuyên). VOICE = nói THẾ NÀO (mở đầu, độ sắc, nhịp).',
    ...parts,
  ].join('\n\n')
}

/** Delivery contrast khi có comm KB — shape giọng SAU nội dung KB. */
function buildWorkCommDeliveryBlock(voice: GroupKey): string {
  if (voice === 'sincere') {
    return [
      '[DELIVERY — Chân thành 🤝]',
      'Ấm, thẳng, đồng cảm trước rồi mới vào việc. Ngôi "mình/bạn".',
      'Mở đầu ghi nhận cảm giác người hỏi — không châm biếm, không slang.',
      'Cùng lời khuyên với giọng khác: delivery mềm, cân bằng, thấu hiểu hơn.',
    ].join('\n')
  }
  return [
    '[DELIVERY — Người Giời 😏]',
    'Sắc = thẳng + gọi tên cái vô lý — KHÔNG phải chêm ẩn dụ lạ/tiếng lóng gượng.',
    'Ví dụ ĐÚNG: "Bị cắt lời hoài đúng là bực — nhưng im lặng thì họ tưởng bạn đồng ý."',
    'Ví dụ SAI (tránh): "giữ cái đầu gấu", "thuê họ không phải đấu họ", "đốp chéo" — ẩn dụ cọc cạch.',
    'Vẫn tử tế, thẳng và hơi tưng — KHÔNG cố nhồi slang. KHÔNG cay nghiệt, KHÔNG mắng user.',
  ].join('\n')
}

/** Giọng Người Giời — áp mọi lượt work chat (không chỉ comm). */
function buildMaverickToneBlock(): string {
  return [
    '[NGƯỜI GIỜI — nhịp]',
    '- Thẳng, sắc, hơi tưng — không ẩn dụ gượng, không slang cọc cạch.',
    '- Đa dạng mở đầu: tránh lặp "Ừ," / "Ừ, bước đầu tiên là..." mọi lượt.',
  ].join('\n')
}

function buildMultiTurnBlock(
  priorTurnCount: number,
  userMessage: string,
): string | null {
  if (priorTurnCount < 2) return null

  const lines = [
    '[MULTI-TURN — user đang bổ sung context qua nhiều lượt]',
    '- Tổng hợp TOÀN BỘ thông tin user đã nói (số người, deadline, vấn đề nhân sự...) — không chỉ câu cuối.',
    '- KHÔNG lặp lại nguyên văn full advice lượt trước nếu user chỉ thêm fact mới.',
  ]

  if (isContextSharing(userMessage)) {
    lines.push(
      '- Lượt này user KỂ THÊM fact ngắn: ghi nhận fact đó (1-2 câu), mời nói tiếp hoặc hỏi 1 điểm làm rõ — KHÔNG generate lại full kế hoạch/stakeholder/deliverable.',
    )
  } else if (userMessage.trim()) {
    lines.push(
      '- Lượt này user hỏi giải pháp: trả lời dựa trên CẢ context đã tích lũy (nhắc lại fact quan trọng như số người, vấn đề đã nêu).',
    )
  }

  return lines.join('\n')
}

const DISC_STYLE_NOTES: Record<DiscLetter, string> = {
  D: 'Giao tiếp ngắn gọn, bottom-line trước, không dài dòng. Acknowledge kết quả.',
  I: 'Acknowledge thành tích, tone energetic. OK để conversational hơn một chút.',
  S: 'Patient, reassuring. Không rush. Validate trước khi suggest.',
  C: 'Data-driven, cụ thể, có lý do. Tránh vague. Cung cấp số liệu hoặc ví dụ rõ.',
}

function buildDiscStyleBlock(discProfile: DiscProfile): string {
  const discStyleNote = DISC_STYLE_NOTES[discProfile.primary]
  return [
    '[DISC_STYLE]',
    `Phong cách làm việc user: ${DISC_LABELS[discProfile.primary]} (${discProfile.blend}). ${discStyleNote}`,
    '[/DISC_STYLE]',
  ].join('\n')
}

export function buildWorkSystemPrompt(params: WorkSystemPromptParams): string {
  if (params.crisisTurn) {
    return buildCrisisOnlySystemPrompt(params.mbtiType, 'Trợ lý công việc')
  }

  const userSignals = params.userMessage
    ? parseUserStyleSignals(params.userMessage)
    : undefined
  const styleBlock = params.skipStyle
    ? null
    : buildStyleBlock(params.mbtiType, params.identity, {
        voice: params.voice,
        userSignals,
      })
  const responseMode =
    params.skipStyle || !params.userMessage
      ? null
      : detectResponseMode(params.userMessage, {
          mbtiType: params.mbtiType,
          identity: params.identity,
        })
  const modeBlock =
    responseMode === null ? null : buildModeGuidanceBlock(responseMode)

  const parts = [buildPersonaBlock(params)]

  if (params.roleplayBlock) {
    parts.push('', params.roleplayBlock)
  }

  if (styleBlock) {
    parts.push('', '[STYLE]', styleBlock)
  }
  if (modeBlock) {
    parts.push('', modeBlock)
  }

  if (!params.skipKBInject) {
    const injected = buildInjectedKBBlock(
      params.commBlock,
      params.kbBlock,
      params.situationalBlock,
    )
    if (injected) {
      parts.push('', injected)
    }
  }

  parts.push('', '[VOICE]', buildGroupVoiceBlock(params.voice))
  if (params.voice === 'maverick') {
    parts.push('', buildMaverickToneBlock())
  }
  if (params.commBlock) {
    parts.push('', buildWorkCommDeliveryBlock(params.voice))
  }
  const multiTurn = buildMultiTurnBlock(
    params.priorTurnCount ?? 0,
    params.userMessage,
  )
  if (multiTurn) {
    parts.push('', multiTurn)
  }

  if (params.discProfile) {
    parts.push('', buildDiscStyleBlock(params.discProfile))
  }

  if (params.cNote) {
    parts.push('', params.cNote)
  }

  parts.push('', WORK_RULES, '', AI_BOUNDARY_RULE)

  if (params.summaryBlock) {
    parts.push('', `[Tóm tắt hội thoại trước]: ${params.summaryBlock}`)
  }

  return parts.join('\n')
}
