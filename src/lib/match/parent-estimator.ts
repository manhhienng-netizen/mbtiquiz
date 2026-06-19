// parent-estimator.ts — ước lượng cluster bố/mẹ từ hành vi quan sát được
// KHÔNG show kết quả cho user · chỉ dùng nội bộ để load content
// Disclaimer bắt buộc: "Ước lượng từ hành vi — không chẩn đoán"

import type { ParentCluster } from '../../data/match/parent-static-content'

export {
  PARENT_ESTIMATOR_QUESTIONS,
  type ParentEstimatorQuestion,
} from '../../data/match/parent-estimator-questions'

type Answers = Record<string, string>

export function estimateParentCluster(answers: Answers): ParentCluster {
  let st = 0
  let sf = 0
  let nf = 0
  let nt = 0

  if (answers.peq1 === 'a') st += 2
  if (answers.peq1 === 'b') sf += 1
  if (answers.peq1 === 'c') nf += 2
  if (answers.peq1 === 'd') st += 1

  if (answers.peq2 === 'a') nt += 2
  if (answers.peq2 === 'b') sf += 1
  if (answers.peq2 === 'c') st += 2

  if (answers.peq3 === 'a') sf += 1
  if (answers.peq3 === 'b') st += 1
  if (answers.peq3 === 'c') nf += 1
  if (answers.peq3 === 'd') nt += 1

  if (answers.peq4 === 'a') nt += 2
  if (answers.peq4 === 'b') sf += 2
  if (answers.peq4 === 'c') st += 1
  if (answers.peq4 === 'd') nf += 1

  const max = Math.max(st, sf, nf, nt)
  if (max < 2) return 'unknown'

  if (max === st) return 'ST'
  if (max === sf) return 'SF'
  if (max === nf) return 'NF'
  return 'NT'
}
