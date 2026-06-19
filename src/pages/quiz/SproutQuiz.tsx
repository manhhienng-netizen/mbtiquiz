import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SPROUT_QUESTIONS,
  type SproutColor,
  type SproutColorOption,
} from '@tncb/data/sprout-color-quiz-data'
import {
  AGE_GROUP_THEME,
  COLORS,
  FONTS,
  LAYOUT,
} from '@tncb/data/design-tokens'
import SproutIllustration from '../../components/sprout/SproutIllustration'
import {
  emptySproutScores,
  sproutColorTokens,
  sproutResultFromScores,
} from '../../utils/sprout-quiz-ui'
import { saveSproutLearnResult } from '../../utils/sprout-quiz-storage'

const TOTAL = SPROUT_QUESTIONS.length
const ADVANCE_MS = 500

type Phase = 'intro' | 'quiz'

export default function SproutQuiz() {
  const navigate = useNavigate()
  const theme = AGE_GROUP_THEME.SPROUT
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [phase, setPhase] = useState<Phase>('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<SproutColor[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAdvancing, setIsAdvancing] = useState(false)

  const question = SPROUT_QUESTIONS[questionIndex]
  const progress = phase === 'quiz' ? (questionIndex + 1) / TOTAL : 0

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [])

  const finishQuiz = useCallback(
    (allAnswers: SproutColor[]) => {
      const scores = emptySproutScores()
      for (const color of allAnswers) {
        scores[color] += 1
      }
      const resultColor = sproutResultFromScores(scores)
      saveSproutLearnResult({
        ageGroup: 'SPROUT',
        resultColor,
        scores,
        completedAt: new Date().toISOString(),
      })
      navigate('/result/SPROUT', { replace: true })
    },
    [navigate],
  )

  const handleOptionClick = useCallback(
    (option: SproutColorOption, optionIndex: number) => {
      if (isAdvancing || phase !== 'quiz') return

      setSelectedOption(optionIndex)
      setIsAdvancing(true)

      if (advanceTimer.current) clearTimeout(advanceTimer.current)
      advanceTimer.current = setTimeout(() => {
        const nextAnswers = [...answers, option.color]
        setAnswers(nextAnswers)
        setSelectedOption(null)
        setIsAdvancing(false)

        if (questionIndex >= TOTAL - 1) {
          finishQuiz(nextAnswers)
          return
        }
        setQuestionIndex((i) => i + 1)
      }, ADVANCE_MS)
    },
    [answers, finishQuiz, isAdvancing, phase, questionIndex],
  )

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background.cream }}
    >
      {phase === 'quiz' && (
        <div
          className="sticky top-0 z-10 h-1"
          style={{ backgroundColor: COLORS.stone[200] }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: COLORS.primary[500] }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      )}

      <div
        className="mx-auto px-4 py-6 sm:py-8"
        style={{ maxWidth: LAYOUT.maxWidth }}
      >
        {phase === 'intro' ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl p-6 sm:p-8 text-center"
            style={{
              backgroundColor: COLORS.background.white,
              borderRadius: LAYOUT.borderRadius.lg,
            }}
          >
            <span className="text-4xl mb-4 block" aria-hidden>
              {theme.icon}
            </span>
            <h1
              className="text-2xl sm:text-3xl font-semibold leading-snug"
              style={{
                fontFamily: FONTS.heading,
                color: COLORS.stone[900],
              }}
            >
              Sắc màu thế mạnh
            </h1>
            <p
              className="mt-4 text-lg sm:text-xl leading-relaxed"
              style={{
                fontFamily: FONTS.body,
                color: COLORS.stone[700],
              }}
            >
              Bố/mẹ đọc câu hỏi — con chọn câu trả lời
            </p>
            <p
              className="mt-3 text-base"
              style={{ color: COLORS.stone[500] }}
            >
              {TOTAL} câu · con chỉ vào hình con thích nhất
            </p>
            <button
              type="button"
              onClick={() => setPhase('quiz')}
              className="mt-8 w-full min-h-14 rounded-xl text-lg font-semibold text-white"
              style={{ backgroundColor: theme.accent }}
            >
              Bắt đầu
            </button>
          </motion.div>
        ) : (
          <>
            <p
              className="text-center text-sm font-medium mb-4"
              style={{ color: COLORS.primary[700] }}
            >
              Bố/mẹ đọc câu hỏi — con chọn câu trả lời
            </p>
            <p
              className="text-center text-sm mb-5"
              style={{ color: COLORS.stone[500] }}
            >
              Câu {questionIndex + 1} / {TOTAL}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl p-5 sm:p-6 mb-5"
                style={{
                  backgroundColor: COLORS.background.white,
                  borderRadius: LAYOUT.borderRadius.lg,
                }}
              >
                <div className="flex justify-center mb-4">
                  <SproutIllustration
                    illustrationKey={question.illustration}
                    size="lg"
                  />
                </div>
                <h2
                  className="text-xl sm:text-2xl font-semibold leading-snug text-center"
                  style={{
                    fontFamily: FONTS.heading,
                    color: COLORS.stone[900],
                  }}
                >
                  {question.questionText}
                </h2>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${question.id}-opts`}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="grid grid-cols-2 gap-3 sm:gap-4"
              >
                {question.options.map((option, idx) => (
                  <OptionCard
                    key={`${question.id}-${idx}`}
                    option={option}
                    selected={selectedOption === idx}
                    disabled={isAdvancing}
                    onSelect={() => handleOptionClick(option, idx)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

function OptionCard({
  option,
  selected,
  disabled,
  onSelect,
}: {
  option: SproutColorOption
  selected: boolean
  disabled: boolean
  onSelect: () => void
}) {
  const tokens = sproutColorTokens(option.color)

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      animate={{ scale: selected ? 1.03 : 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center gap-2 p-3 sm:p-4 min-h-[120px] sm:min-h-[140px] text-center rounded-xl disabled:opacity-70"
      style={{
        backgroundColor: tokens.light,
        borderRadius: LAYOUT.borderRadius.md,
        border: selected
          ? `3px solid ${tokens.hex}`
          : `2px solid transparent`,
        boxShadow: selected ? `0 0 0 1px ${tokens.hex}33` : undefined,
      }}
    >
      <SproutIllustration illustrationKey={option.illustrationKey} size="sm" />
      <span
        className="text-sm sm:text-base leading-snug line-clamp-5"
        style={{
          fontFamily: FONTS.body,
          color: tokens.text,
        }}
      >
        {option.text}
      </span>
    </motion.button>
  )
}
