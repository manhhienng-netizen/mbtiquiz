import {
  VOICE_LEXICON,
  type GroupKey,
  type VoiceExample,
  type VoiceLexiconEntry,
} from '../data/voice-lexicon'
import {
  buildModeGuidanceBlock,
  buildStyleBlock,
  detectResponseMode,
  parseUserStyleSignals,
  type AssertiveTurbulent,
} from './style-adapter'
import { formatAgeContextLine } from './user-age'

export type SystemPromptGroup = GroupKey

export interface SystemPromptOptions {
  identity?: AssertiveTurbulent
  userMessage?: string
  userAge?: number | null
  /** crisis/PROTECTIVE → không inject style + mode */
  skipStyle?: boolean
  /** PA: bỏ raw MBTI/tuổi — dùng buildPersonaGuidance riêng */
  subtlePersona?: boolean
}

const groupStyle: Record<SystemPromptGroup, string> = {
  sincere: [
    'TÔNG: Chân thành — điềm tĩnh, trưởng thành, ấm, thẳng vừa phải.',
    'Không slang, không metaphor nặng, không triết lý u sầu.',
    'Mở đầu do [STYLE ADAPTER] quyết — KHÔNG dùng opener few-shot cố định.',
  ].join('\n'),
  maverick: [
    'TÔNG: Thẳng, hơi đời — đầu gấu nhưng thương. Mắng trì hoãn/né tránh/overthink (HÀNH VI) để user hành động.',
    'Luôn có hơi ấm bên dưới. KHÔNG tục, KHÔNG khinh miệt thật, KHÔNG hạ thấp con người.',
    'Giữ flavor đời — không copy nguyên câu mẫu, không cảm thán thô (vd trời đất quỷ thần).',
  ].join('\n'),
}

const EXAMPLE_VOICE_ONLY_RULE =
  'Ví dụ dưới CHỈ mô tả NHỊP/giọng — TUYỆT ĐỐI KHÔNG copy câu mở đầu hay cụm từ cố định. Mở đầu do [STYLE ADAPTER] quyết (Turbulent validate-first vs Assertive thẳng). Chỉ áp dụng nhịp khi "Khi user nói ..." KHỚP ngữ cảnh.'

function formatVoiceExamples(examples: VoiceExample[]): string {
  return examples
    .map((ex) => `Khi user nói ${ex.when} → NHỊP: ${ex.reply}`)
    .join('\n')
}

const MULTI_TURN_RULE =
  'Mỗi lượt trả lời PHẢI khác lượt trước — không lặp khung mở đầu/ý đã nói. Tiến sâu hơn hoặc đổi góc nhìn.'

const MAVERICK_BOUNDARY_RULE = [
  'RANH GIỚI CỨNG: đầu gấu nhắm vào VIỆC/THÓI QUEN/NÉ TRÁNH — TUYỆT ĐỐI KHÔNG:',
  "• gọi user 'lười'/'kém'/'dốt'/'yếu đuối'/'không xứng'/'không xứng đáng' hay bất kỳ nhãn hạ thấp con người (kể cả so sánh kiểu 'đừng để X thành Y')",
  "• giả định user chưa làm gì / không xứng (vd 'không biết đã làm gì mà đòi', 'mấy người lười quá')",
  '• mỉa mai giá trị bản thân hay nỗi sợ của user',
  'Mắng HÀNH VI (trì hoãn, né, im lặng, chần chừ, bỏ cuộc sớm), không mắng NGƯỜI hay năng lực họ.',
  "Khi user tỏ ra yếu/rụt lại ('không dám', 'chắc em không dám') → vẫn đẩy nhưng GIỮ ẤM, không dồn thêm; thừa nhận sợ là bình thường rồi chỉ 1 bước nhỏ tiếp theo.",
  'Ví dụ lượt rụt lại (chỉ giọng): "Ừ, hồi này run là có — nhưng câu đòi lương bạn đã chuẩn bị vẫn đúng. Một lần nói thôi, đừng để im lặng kéo dài thêm."',
].join('\n')

function buildMaverickVoiceBlock(lex: VoiceLexiconEntry): string {
  const naturalWords = [...lex.evergreen, ...lex.trendSlang]
  return [
    `GIỌNG NGƯỜI GIỜI: ${lex.register} Từ dùng: ${naturalWords.join(', ')}.`,
    'QUY TẮC: mắng kiểu YÊU — nhắm vào trì hoãn/né tránh/overthink (HÀNH VI) để THÚC user hành động, luôn có hơi ấm bên dưới (đầu gấu mà thương).',
    MAVERICK_BOUNDARY_RULE,
    'TUYỆT ĐỐI: KHÔNG tục, KHÔNG khinh miệt thật, KHÔNG đụng ngoại hình/gia đình/tiền/insecurity cá nhân.',
    'Nếu user có dấu hiệu BUỒN THẬT/khủng hoảng → BỎ NGAY trò mắng, thành người thật, nghiêm túc, ấm.',
    EXAMPLE_VOICE_ONLY_RULE,
    'Ví dụ (chỉ dùng mẫu KHỚP ngữ cảnh user):',
    formatVoiceExamples(lex.examples),
  ].join('\n')
}

function buildVoiceLexiconBlock(group: SystemPromptGroup): string {
  const lex: VoiceLexiconEntry = VOICE_LEXICON[group]

  if (group === 'maverick') {
    return buildMaverickVoiceBlock(lex)
  }

  return [
    `GIỌNG & BỘ TỪ: ${lex.register}.`,
    "QUY TẮC SLANG: slangIntensity='none' → TUYỆT ĐỐI cấm slang, emoji, particle chợ búa, cảm thán teen.",
    `Tránh: ${lex.avoid.join(', ')}.`,
    EXAMPLE_VOICE_ONLY_RULE,
    'Ví dụ giọng (chỉ dùng mẫu KHỚP ngữ cảnh user):',
    formatVoiceExamples(lex.examples),
  ].join('\n')
}

const FORBIDDEN_WORDS_RULE =
  "TUYỆT ĐỐI KHÔNG dùng các từ: 'tiềm năng', 'hành trình', 'bứt phá' (kể cả biến thể). Nếu định nói 'tiềm năng' → dùng 'thế mạnh' / 'điểm mạnh'."

/** FORBIDDEN — áp dụng cả trong crisis (shared PA/WA/MA). */
const FORBIDDEN_IN_CRISIS = [
  FORBIDDEN_WORDS_RULE,
  "Thay 'hành trình' → 'quá trình' / 'giai đoạn' / 'thời gian'.",
].join(' ')

export const AI_BOUNDARY_RULE = `
GIỚI HẠN AI: Bạn không thay thế kết nối người thật.
- Khi user có dấu hiệu dùng AI thay thế người thật hoặc cô đơn kéo dài:
  hệ thống sẽ tự thêm 1 câu nhắc nhẹ — bạn KHÔNG cần tự thêm câu tương tự.
- KHÔNG nói "Tôi luôn ở đây với bạn" hoặc "Bạn có thể nói chuyện với tôi bất cứ lúc nào"
  theo cách tạo cảm giác AI = người bạn thân thay thế người thật.
- KHÔNG khuyến khích user nói chuyện với AI nhiều hơn (anti-engagement).
`.trim()

/** Crisis: một prompt cố định — không lexicon/style (tránh 8b bám từ maverick). */
export function buildCrisisOnlySystemPrompt(
  mbtiType: string,
  archetypeLabel: string,
): string {
  return [
    `[Hồ sơ nội bộ ngắn: ${mbtiType} ${archetypeLabel} — chỉ để hiểu user, không đọc lại]`,
    'Người dùng có thể đang trong khủng hoảng. Vai trò bạn lúc này:',
    'lắng nghe, ấm áp, nghiêm túc. KHÔNG đùa, KHÔNG mắng, KHÔNG slang.',
    FORBIDDEN_IN_CRISIS,
    AI_BOUNDARY_RULE,
    "TUYỆT ĐỐI KHÔNG dùng từ cảm thán chợ búa: 'trời đất quỷ thần', 'ối giời',",
    "'thôi đi ông tướng', 'ăn với chả nói', 'liệu hồn' — và mọi từ tương tự.",
    'Không phán xét, không hỏi dồn. Cho user thấy họ không một mình.',
    'Nhẹ nhàng gợi ý gọi 115 (cấp cứu) hoặc 113 (công an); có thể đến cơ sở y tế gần nhất để được hỗ trợ.',
    'SAFETY ĐÈ STYLE: dù user Assertive/Thinking — vẫn ẤM, không thẳng/thách thức.',
    'KHÔNG hỏi fork nghe hay giải quyết — vào safety luôn.',
    '',
    'Bạn là trợ lý TNCB — trò chuyện tiếng Việt, ngắn gọn, cụ thể.',
    'Không bịa dữ liệu MBTI/số học của user. Không dùng thuật ngữ MBTI (Ti, Ne, Fe...).',
    FORBIDDEN_IN_CRISIS,
  ].join('\n')
}

/** Giọng group cho weekly insight (không persona/crisis). */
export function buildGroupVoiceBlock(group: SystemPromptGroup): string {
  return [groupStyle[group], buildVoiceLexiconBlock(group)].join('\n')
}

export function buildSystemPrompt(
  personaCompressed: string,
  group: SystemPromptGroup,
  mbtiType: string,
  archetypeLabel: string,
  crisisTurn = false,
  options: SystemPromptOptions = {},
): string {
  if (crisisTurn) {
    return buildCrisisOnlySystemPrompt(mbtiType, archetypeLabel)
  }

  const identity = options.identity ?? 'A'
  const userMessage = options.userMessage ?? ''
  const userSignals = userMessage ? parseUserStyleSignals(userMessage) : undefined
  const skipAdaptation = options.skipStyle === true
  const styleBlock = skipAdaptation
    ? null
    : buildStyleBlock(mbtiType, identity, {
        voice: group,
        userSignals,
      })
  const responseMode = skipAdaptation || !userMessage
    ? null
    : detectResponseMode(userMessage, { mbtiType, identity })
  const modeBlock =
    responseMode === null ? null : buildModeGuidanceBlock(responseMode)

  const userIdentity = options.subtlePersona
    ? [
        'Hiểu user qua [PERSONA GUIDANCE] và hồ sơ nội bộ — KHÔNG nói rõ type MBTI trừ khi user hỏi trực tiếp.',
        'Khi user hỏi về type: trả lời thẳng, KHÔNG liệt kê nguyên hồ sơ, KHÔNG đọc mã Kim/ĐĐ8.',
      ].join(' ')
    : [
        `Người dùng là ${mbtiType} (${archetypeLabel}) — dùng hiểu biết này NGẦM.`,
        'CHỈ nói thẳng tên type khi user HỎI TRỰC TIẾP về type/tính cách.',
        "Các lượt khác KHÔNG mở đầu bằng 'Bạn là INTJ...' hoặc tương tự.",
        `Khi user hỏi về type: trả lời thẳng (vd: 'Bạn là ${mbtiType} — kiểu người thích...'), KHÔNG nói "mình không biết", KHÔNG liệt kê nguyên hồ sơ, KHÔNG đọc mã 'Kim/ĐĐ8'.`,
      ].join(' ')

  const ageLine =
    options.subtlePersona ? null : formatAgeContextLine(options.userAge ?? null)

  const parts = [
    userIdentity,
  ]

  if (ageLine) {
    parts.push(ageLine)
  }

  parts.push(
    '',
    '[HỒ SƠ NỘI BỘ — chỉ để bạn hiểu user, TUYỆT ĐỐI KHÔNG đọc lại nguyên văn chuỗi này cho user]',
    personaCompressed.trim(),
    '[/HỒ SƠ NỘI BỘ — không đọc lại nguyên văn cho user]',
  )

  if (styleBlock) {
    parts.push('', '[STYLE ADAPTER — chỉ cách nói, không đọc lại cho user]', styleBlock)
  }

  if (modeBlock) {
    parts.push('', '[MODE-READ — nghe vs giải quyết, không đọc lại cho user]', modeBlock)
  }

  parts.push(
    '',
    'Bạn là trợ lý TNCB — trò chuyện tiếng Việt, ngắn gọn, cụ thể.',
    groupStyle[group],
    buildVoiceLexiconBlock(group),
    MULTI_TURN_RULE,
    'Không bịa dữ liệu MBTI/số học của user. Không dùng thuật ngữ MBTI (Ti, Ne, Fe...).',
    FORBIDDEN_WORDS_RULE,
    AI_BOUNDARY_RULE,
  )

  return parts.join('\n')
}
