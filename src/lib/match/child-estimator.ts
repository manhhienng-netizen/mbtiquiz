// child-estimator.ts — 3 hàm ước lượng, re-export questions
// Disclaimer bắt buộc: "Ước lượng từ hành vi — không chẩn đoán"

import type {
  MbtiCluster,
  YoungCluster,
} from '../../data/match/child-static-content'

export {
  CHILD_YOUNG_ESTIMATOR_QUESTIONS,
  type ChildYoungEstimatorQuestion,
} from '../../data/match/child/child-young-estimator'

export {
  CHILD_TEEN_ESTIMATOR_QUESTIONS,
  type ChildTeenEstimatorQuestion,
} from '../../data/match/child/child-teen-estimator'

export {
  CHILD_ADULT_ESTIMATOR_QUESTIONS,
  type ChildAdultEstimatorQuestion,
} from '../../data/match/child/child-adult-estimator'

type Answers = Record<string, string>

function scoreTemperamentChoice(choice: string | undefined): {
  easy: number
  difficult: number
  slow: number
} {
  if (choice === 'a') return { easy: 2, difficult: 0, slow: 0 }
  if (choice === 'b') return { easy: 0, difficult: 2, slow: 0 }
  if (choice === 'c') return { easy: 0, difficult: 0, slow: 2 }
  if (choice === 'd') return { easy: 1, difficult: 1, slow: 1 }
  return { easy: 0, difficult: 0, slow: 0 }
}

export function estimateYoungCluster(answers: Answers): YoungCluster {
  let easy = 0
  let difficult = 0
  let slow = 0

  for (const qId of ['cyq1', 'cyq2', 'cyq3', 'cyq4']) {
    const s = scoreTemperamentChoice(answers[qId])
    easy += s.easy
    difficult += s.difficult
    slow += s.slow
  }

  const max = Math.max(easy, difficult, slow)
  if (max < 2) return 'unknown'
  if (max === easy) return 'easy'
  if (max === difficult) return 'difficult'
  return 'slow'
}

export function estimateTeenCluster(answers: Answers): MbtiCluster {
  let st = 0
  let sf = 0
  let nf = 0
  let nt = 0

  if (answers.ctq1 === 'a') nt += 1
  if (answers.ctq1 === 'b') sf += 2
  if (answers.ctq1 === 'c') nf += 1
  if (answers.ctq1 === 'd') sf += 1

  if (answers.ctq2 === 'a') nt += 2
  if (answers.ctq2 === 'b') sf += 1
  if (answers.ctq2 === 'c') nf += 2
  if (answers.ctq2 === 'd') sf += 1

  if (answers.ctq3 === 'a') st += 2
  if (answers.ctq3 === 'b') sf += 2
  if (answers.ctq3 === 'c') nf += 2
  if (answers.ctq3 === 'd') nt += 1

  if (answers.ctq4 === 'a') nt += 2
  if (answers.ctq4 === 'b') sf += 2
  if (answers.ctq4 === 'c') nf += 2
  if (answers.ctq4 === 'd') st += 1

  const max = Math.max(st, sf, nf, nt)
  if (max < 2) return 'unknown'
  if (max === st) return 'ST'
  if (max === sf) return 'SF'
  if (max === nf) return 'NF'
  return 'NT'
}

export function estimateAdultCluster(answers: Answers): MbtiCluster {
  let st = 0
  let sf = 0
  let nf = 0
  let nt = 0

  if (answers.caq1 === 'a') nt += 2
  if (answers.caq1 === 'b') sf += 2
  if (answers.caq1 === 'c') nf += 2
  if (answers.caq1 === 'd') sf += 1

  if (answers.caq2 === 'a') nt += 1
  if (answers.caq2 === 'b') sf += 2
  if (answers.caq2 === 'c') nf += 2
  if (answers.caq2 === 'd') st += 2

  if (answers.caq3 === 'a') st += 2
  if (answers.caq3 === 'b') sf += 2
  if (answers.caq3 === 'c') nf += 2
  if (answers.caq3 === 'd') nt += 1

  if (answers.caq4 === 'a') nt += 2
  if (answers.caq4 === 'b') sf += 2
  if (answers.caq4 === 'c') nf += 1
  if (answers.caq4 === 'd') st += 1

  const max = Math.max(st, sf, nf, nt)
  if (max < 2) return 'unknown'
  if (max === st) return 'ST'
  if (max === sf) return 'SF'
  if (max === nf) return 'NF'
  return 'NT'
}
