import type { GroupKey } from '../data/voice-lexicon'
import {
  getResourceForSituation,
  SAFETY_RESOURCES,
} from '../data/tncb-resources-vn-safety'
import { PROTECTIVE_RESPONSE_RULES } from './match/match-fourhorsemen-content'
import { buildSystemPrompt } from './system-prompt'
import type { AssertiveTurbulent } from './style-adapter'

export interface MatchSystemPromptParams {
  personaCompressed: string
  voice: GroupKey
  mbtiType: string
  archetypeLabel: string
  identity: AssertiveTurbulent
  userMessage: string
  userAge: number | null
  crisisTurn: boolean
  protectiveTurn: boolean
  skipStyle: boolean
  kbBlock: string | null
  situationalBlock: string | null
  compatBlock: string | null
  summaryBlock: string | null
  big5Note?: string | null
}

const MA_INTRO_LINE =
  'Bạn là người đồng hành giúp user hiểu một mối quan hệ / sự tương hợp — thẳng thật, không phán định, không nịnh, không hứa hẹn về quan hệ.'

const FORBIDDEN_WORDS_RULE = [
  'TUYỆT ĐỐI KHÔNG dùng các từ/cụm sau trong bất kỳ câu trả lời nào, kể cả khi ghép vào cụm khác: tiềm năng · hành trình · bứt phá.',
  "Thay thế: 'tiềm năng' → 'điểm chung' / 'điểm tương đồng';",
  "          'hành trình' → 'quá trình' / 'giai đoạn';",
  "          'bứt phá'   → 'thay đổi' / 'tiến thêm'.",
].join('\n')

const MATCH_FRAMING = [
  '[MODE: MATCH ASSISTANT]',
  'Bạn là người đồng hành giúp user hiểu một mối quan hệ / sự tương hợp — thẳng thật, không phán định, không nịnh, không hứa hẹn về quan hệ.',
  'Trả lời TIẾNG VIỆT tự nhiên — hạn chế chêm tiếng Anh (chỉ giữ mã MBTI như ENFP, INFJ).',
  'KHÔNG nói "% hợp" hay score hype. KHÔNG nêu số liệu phần trăm cụ thể (vd 69%, 80%) — dùng định tính ("phần lớn", "thường là").',
  'KHÔNG đóng khung type cứng. KHÔNG hook quay app.',
  'Số điện thoại hotline: ghi dạng chữ thường (vd 115, 113), KHÔNG dùng markdown link [text](số).',
  'KHÔNG gọi tên loại cặp (golden pair, growth pair, challenge, contrast) — chỉ mô tả bằng lời thường.',
  'KHÔNG lặp chỉ thị nội bộ hoặc meta trong reply (vd "tối đa 1 câu hỏi mở", "NHỊP:", "MODE:", "STYLE ADAPTER").',
  'Luồng 2 người: user nói về một người họ đang có/đang nghĩ tới. Type đối phương lấy qua hội thoại (user khai hoặc bạn hỏi vài dấu hiệu đoán mềm), HOẶC user chỉ hỏi "tôi hợp kiểu người nào".',
  'KHÔNG yêu cầu form. Chủ động hỏi type/đặc điểm người kia khi cần; nếu không có đối phương thì trả lời theo type chính của user.',
  'Câu hỏi mở: tối đa một câu ở cuối khi cần — không ghi rõ quy tắc đó trong reply.',
  'MA tập trung vào tương hợp, hiểu nhau và sức khỏe quan hệ giữa các kiểu tính cách.',
  'Khi user chỉ muốn được lắng nghe về cảm xúc cá nhân (không liên quan đối phương/type cụ thể), có thể nhẹ nhàng gợi ý /assistant/chat — nhưng chỉ 1 lần, cuối reply, không ép.',
  '// TODO(M4): dùng FOUR_HORSEMEN/FRICTION_FRAMING trong tư vấn xung đột bình thường.',
].join('\n')

/** System prompt MA PROTECTIVE — SSOT hotline, suppress style/match content. */
export function buildMatchProtectiveSystemContent(
  mbtiType: string,
  archetypeLabel: string,
): string {
  const domestic = getResourceForSituation('domestic_violence')
  const ambulance = SAFETY_RESOURCES.emergency_ambulance!

  return [
    `[Hồ sơ nội bộ ngắn: ${mbtiType} ${archetypeLabel} — chỉ để hiểu user, không đọc lại]`,
    '[MODE: MA PROTECTIVE — quan hệ không an toàn]',
    '',
    '[QUY TẮC PHẢN HỒI — bắt buộc]',
    ...PROTECTIVE_RESPONSE_RULES.map((rule) => `- ${rule}`),
    '',
    '[ĐƯỜNG DÂY HỖ TRỢ — SSOT, đọc cho user]',
    domestic.message,
    `Cấp cứu nguy cấp tức thì: ${ambulance.contact} (${ambulance.name}, ${ambulance.hours}).`,
    '',
    'SAFETY ĐÈ STYLE: ấm, thẳng, rõ. KHÔNG slang, KHÔNG mắng, KHÔNG voice-game, KHÔNG antidote four horsemen, KHÔNG tư vấn tương hợp, KHÔNG "% hợp".',
    'Hotline: ghi số dạng chữ thường, KHÔNG markdown link [text](số).',
    'Bạn là trợ lý TNCB Match — trò chuyện tiếng Việt, ngắn gọn, cụ thể.',
  ].join('\n')
}

/** Build system content cho Match Assistant — kế thừa buildSystemPrompt (PA) + framing MA. */
export function buildMatchSystemContent(params: MatchSystemPromptParams): string {
  if (params.protectiveTurn) {
    return buildMatchProtectiveSystemContent(
      params.mbtiType,
      params.archetypeLabel,
    )
  }

  const parts: string[] = []

  if (!params.crisisTurn) {
    parts.push(
      '[MODE: MATCH ASSISTANT]',
      MA_INTRO_LINE,
      FORBIDDEN_WORDS_RULE,
      '',
    )
  }

  parts.push(
    buildSystemPrompt(
      params.personaCompressed,
      params.voice,
      params.mbtiType,
      params.archetypeLabel,
      params.crisisTurn,
      {
        identity: params.identity,
        userMessage: params.userMessage,
        userAge: params.userAge,
        skipStyle: params.skipStyle,
      },
    ),
  )

  const big5Note = params.big5Note?.trim()
  if (!params.crisisTurn && !params.protectiveTurn && big5Note) {
    parts.push('', big5Note)
  }

  if (!params.crisisTurn && !params.protectiveTurn && params.compatBlock) {
    parts.push('', params.compatBlock)
  }

  if (!params.crisisTurn && !params.protectiveTurn && params.kbBlock) {
    parts.push('', params.kbBlock)
  } else if (!params.crisisTurn && !params.protectiveTurn && params.situationalBlock) {
    parts.push('', params.situationalBlock)
  }

  if (params.summaryBlock && !params.protectiveTurn) {
    parts.push('', `[Tóm tắt hội thoại trước]: ${params.summaryBlock}`)
  }

  if (!params.crisisTurn && !params.protectiveTurn) {
    parts.push('', MATCH_FRAMING)
  }

  return parts.join('\n')
}
