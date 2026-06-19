import { useParams } from 'react-router-dom'
import { SPROUT_COLOR_META } from '@tncb/data/sprout-color-quiz-data'
import { COLORS, FONTS, LAYOUT } from '@tncb/data/design-tokens'
import {
  LEARN_RESULTS_KEY,
  type SproutLearnResult,
} from '../utils/sprout-quiz-storage'
import PlaceholderPage from './PlaceholderPage'

function readSproutResult(): SproutLearnResult | null {
  try {
    const raw = localStorage.getItem(LEARN_RESULTS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SproutLearnResult
    if (parsed.ageGroup !== 'SPROUT' || !parsed.resultColor) return null
    return parsed
  } catch {
    return null
  }
}

export default function LearnResult() {
  const { ageGroup } = useParams<{ ageGroup: string }>()

  if (ageGroup !== 'SPROUT') {
    return <PlaceholderPage title={`Result — ${ageGroup ?? '?'}`} />
  }

  const result = readSproutResult()
  if (!result) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: COLORS.background.cream }}
      >
        <p style={{ color: COLORS.stone[600] }}>Chưa có kết quả quiz.</p>
      </div>
    )
  }

  const meta = SPROUT_COLOR_META[result.resultColor]

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background.cream }}
    >
      <div
        className="mx-auto px-4 py-8"
        style={{ maxWidth: LAYOUT.maxWidth }}
      >
        <div
          className="rounded-2xl p-6 sm:p-8 text-center"
          style={{
            backgroundColor: COLORS.background.white,
            borderRadius: LAYOUT.borderRadius.lg,
          }}
        >
          <span className="text-5xl block mb-4" aria-hidden>
            {meta.emoji}
          </span>
          <h1
            className="text-2xl sm:text-3xl font-semibold"
            style={{
              fontFamily: FONTS.heading,
              color: COLORS.stone[900],
            }}
          >
            {meta.nameShort}
          </h1>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{
              fontFamily: FONTS.body,
              color: COLORS.stone[700],
            }}
          >
            {meta.tagline}
          </p>
          <ul className="mt-6 text-left space-y-3">
            {meta.strengths.map((s) => (
              <li
                key={s}
                className="text-base leading-relaxed"
                style={{ color: COLORS.stone[600] }}
              >
                · {s}
              </li>
            ))}
          </ul>
          <p
            className="mt-6 text-xs"
            style={{ color: COLORS.stone[400] }}
          >
            Placeholder · SPROUT result · {result.completedAt.slice(0, 10)}
          </p>
        </div>
      </div>
    </div>
  )
}
