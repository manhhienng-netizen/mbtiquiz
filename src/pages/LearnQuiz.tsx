import { Navigate, useParams } from 'react-router-dom'
import PlaceholderPage from './PlaceholderPage'
import SproutQuiz from './quiz/SproutQuiz'
import { isValidAgeGroupParam } from '../lib/learn-age-groups'

const PLACEHOLDER_GROUPS = ['BLOOM', 'SPARK', 'RISE', 'LAUNCH'] as const

export default function LearnQuiz() {
  const { ageGroup } = useParams<{ ageGroup: string }>()

  if (ageGroup === 'SPROUT') {
    return <SproutQuiz />
  }

  if (
    ageGroup &&
    PLACEHOLDER_GROUPS.includes(
      ageGroup as (typeof PLACEHOLDER_GROUPS)[number],
    )
  ) {
    return <PlaceholderPage title={`Quiz — ${ageGroup}`} />
  }

  if (ageGroup && !isValidAgeGroupParam(ageGroup)) {
    return <Navigate to="/learn" replace />
  }

  return <Navigate to="/learn" replace />
}
