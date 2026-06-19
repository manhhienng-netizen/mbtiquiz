import { QUIZ_RESULT_KEY, type QuizResult } from '../data/quiz-types'
import { ELEMENT_CONTENT, type ElementContent } from '../data/tncb-element-content'
import { NHAT_CHU_CONTENT } from '../data/tncb-nhatchu-content'
import { NUMEROLOGY_QUICK } from '../data/numerology'
import {
  getLatestMBTI,
  getSpiritualResult,
  quizResultFromDexie,
} from '../db/tncb-db'
import type { L1ReportInput } from './build-l1-report'

function elementCoreTrait(element: ElementContent): string {
  const afterDash = element.tagline.split('—')[1]?.trim()
  if (afterDash) {
    return afterDash.replace(/\.$/, '').toLowerCase()
  }
  return element.nickname.toLowerCase()
}

async function loadQuizResultForL1(): Promise<QuizResult | null> {
  const mbti = await getLatestMBTI()
  const spiritual = await getSpiritualResult()
  const fromDexie = quizResultFromDexie(mbti, spiritual)
  if (fromDexie?.mbtiType) return fromDexie

  const raw = localStorage.getItem(QUIZ_RESULT_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as QuizResult
    return parsed.mbtiType ? parsed : null
  } catch {
    return null
  }
}

export async function buildL1ReportInput(): Promise<L1ReportInput | null> {
  const result = await loadQuizResultForL1()
  if (!result?.mbtiType || !result.element || !result.lifePath || !result.nhatChu) {
    return null
  }

  const nguHanh = ELEMENT_CONTENT[result.element]
  const lp = NUMEROLOGY_QUICK[result.lifePath]
  const nc = NHAT_CHU_CONTENT[result.nhatChu]

  if (!nguHanh || !lp || !nc) return null

  const theme = lp.oneLineDesc
  const lifePathTheme =
    theme.length > 0
      ? theme.charAt(0).toLowerCase() + theme.slice(1)
      : lp.keyword.toLowerCase()

  return {
    mbtiType: result.mbtiType,
    nguHanhLabel: nguHanh.element,
    nguHanhCore: elementCoreTrait(nguHanh),
    lifePath: result.lifePath,
    lifePathTheme,
    nhatChuLabel: `${nc.can} ${nc.element}`,
    nhatChuImage: nc.naturalImage,
  }
}
