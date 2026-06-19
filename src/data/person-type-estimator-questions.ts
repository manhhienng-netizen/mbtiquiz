import {
  ESTIMATOR_QUESTIONS,
  type EstimatorQuestion,
} from './boss-type-estimator'

export type PersonEstimatorSubject = 'subordinate' | 'colleague'

const SUBJECT_LABEL: Record<PersonEstimatorSubject, string> = {
  subordinate: 'Nhân viên này',
  colleague: 'Đồng nghiệp này',
}

export function buildPersonEstimatorQuestions(
  subject: PersonEstimatorSubject,
): EstimatorQuestion[] {
  const label = SUBJECT_LABEL[subject]
  const lower = label.toLowerCase()

  return ESTIMATOR_QUESTIONS.map((q, index) => {
    if (index === 0) {
      return {
        ...q,
        text: `${label} chủ yếu làm mảng nào?`,
      }
    }
    return {
      ...q,
      text: q.text
        .replace(/Sếp bạn/g, label)
        .replace(/sếp bạn/g, lower),
    }
  })
}
