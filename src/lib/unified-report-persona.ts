import { ELEMENT_CONTENT } from '../data/tncb-element-content'
import { LIFE_PATH_CONTENT } from '../data/tncb-lifepath-content'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import { NHAT_CHU_CONTENT } from '../data/tncb-nhatchu-content'
import type { QuizResult } from '../data/quiz-types'
import { buildUnifiedReport } from '../data/unified-report-template'

export function buildReportFromQuizResult(result: QuizResult) {
  if (!result.mbtiType) return null

  const mbtiType = result.mbtiType
  const lifePath = result.lifePath ?? 1
  const element = result.element ?? 'Kim'
  const nhatChu = result.nhatChu ?? 'Giáp'

  const typeNickname = TNCB_TYPE_CONTENT[mbtiType]?.nickname ?? mbtiType
  const lpKeyword = LIFE_PATH_CONTENT[lifePath]
    ? `số ${lifePath}`
    : `số ${lifePath}`
  const elementTrait =
    ELEMENT_CONTENT[element]?.inOneSentence ??
    'năng lượng riêng mà bạn mang theo suốt đời'
  const nhatChuTrait =
    NHAT_CHU_CONTENT[nhatChu]?.inOneSentence ??
    'cách bạn chọn kết nối với người khác'

  return buildUnifiedReport({
    mbtiType,
    lifePath,
    element,
    nhatChu,
    typeNickname,
    lpKeyword,
    elementTrait,
    nhatChuTrait,
  })
}
