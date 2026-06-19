import {
  getSituationalNudge,
  type SituationKey,
} from '../data/situational-nudges'
import { hasSelfBurnoutSignal } from './crisis-detect'

/** Thứ tự ưu tiên khi nhiều keyword trùng — cụ thể trước, chung sau */
const SITUATION_DETECT_ORDER: SituationKey[] = [
  'presentation_tmr',
  'new_match',
  'conflict_work',
  'burnout',
  'setback',
  'celebration',
  'stressed',
  'monday_morning',
  'friday_reflection',
  'health_reminder',
]

export const SITUATION_KEYWORDS: Record<SituationKey, readonly string[]> = {
  new_match: ['mới match', 'vừa match', 'crush', 'người mới', 'hẹn hò mới', 'match trên'],
  presentation_tmr: [
    'thuyết trình',
    'present',
    'pitch',
    'phỏng vấn ngày mai',
    'phỏng vấn mai',
    'demo mai',
    'thuyết trình mai',
  ],
  stressed: ['căng thẳng', 'áp lực', 'stress', 'overwhelmed', 'quá tải', 'ngợp'],
  conflict_work: [
    'cãi nhau',
    'mâu thuẫn',
    'xích mích',
    'cãi với sếp',
    'cãi với đồng nghiệp',
    'conflict',
  ],
  burnout: ['kiệt sức', 'burnout', 'chán việc', 'mệt mỏi kéo dài', 'cạn kiệt'],
  celebration: [
    'ăn mừng',
    'thành công rồi',
    'vừa đạt',
    'vừa win',
    'promotion',
    'được thăng',
  ],
  setback: ['thất bại', 'thất vọng', 'trượt', 'bị từ chối', 'fail', 'sụp đổ'],
  monday_morning: ['thứ hai', 'thứ 2', 'monday', 'đầu tuần', 'sáng thứ hai'],
  friday_reflection: [
    'cuối tuần',
    'thứ sáu',
    'thứ 6',
    'friday',
    'nhìn lại tuần',
    'tổng kết tuần',
  ],
  health_reminder: [
    'sức khỏe',
    'ngủ kém',
    'không ngủ được',
    'mất ngủ',
    'tập thể dục',
    'đau đầu kéo',
  ],
}

function normalizeForMatch(text: string): string {
  return text.toLowerCase().trim()
}

export function detectSituation(message: string): SituationKey | null {
  const normalized = normalizeForMatch(message)

  for (const key of SITUATION_DETECT_ORDER) {
    const keywords = SITUATION_KEYWORDS[key]
    if (!keywords.some((kw) => normalized.includes(kw))) continue
    // Kiệt sức bản thân → PROTECTIVE/crisis, không inject situational burnout
    if (key === 'burnout' && hasSelfBurnoutSignal(message)) return null
    return key
  }

  return null
}

export function buildSituationalContext(
  mbtiType: string,
  situation: SituationKey,
): string | null {
  const entry = getSituationalNudge(mbtiType, situation)
  if (!entry) return null

  return [
    '[GỢI Ý NỘI BỘ cho tình huống — KHÔNG đọc lại nguyên văn, KHÔNG copy emoji/tiêu đề.',
    'Diễn đạt lại bằng lời của bạn, lồng tự nhiên vào câu trả lời]:',
    `${entry.headline} ${entry.body} ${entry.actionPrompt}`,
    '[/GỢI Ý NỘI BỘ — không đọc lại nguyên văn cho user]',
  ].join('\n')
}
