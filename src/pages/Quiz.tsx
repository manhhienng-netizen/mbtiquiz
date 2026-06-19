import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import Phase3Prompt from '../components/Phase3Prompt'
import PhasePreview from '../components/PhasePreview'
import QuizCard from '../components/QuizCard'
import { QUIZ_RESULT_KEY, type QuizResult } from '../data/quiz-types'
import {
  mapCharacterToCurrentRecord,
  saveCurrentCharacter,
  saveMBTIResult,
} from '../db/tncb-db'
import { computeCharacter } from '../engine/character-engine'
import {
  acceptPhase3,
  answerQuestion,
  computeResult,
  continueFromPhase2Preview,
  estimateTotalQuestions,
  getPhaseLabel,
  getPreviewKey,
  initQuizState,
  skipPhase3,
  type AdaptiveQuizState,
  type LikertValue,
} from '../engine/adaptive-quiz-engine'
import { ATMOSPHERIC_OVERLAY_LIGHT } from '../components/AtmosphericPage'
import {
  clearSessionBackground,
  pickRandomBackground,
} from '../utils/sessionBackground'
import { tryCompleteInviteFlow } from '../lib/p2p/invite-service'

const QUIZ_FONT = "'Be Vietnam Pro', sans-serif"

function QuizShell({
  header,
  children,
}: {
  header?: ReactNode
  children: ReactNode
}) {
  const bgFile = useMemo(() => pickRandomBackground(), [])
  const bgUrl = `/assets/backgrounds/${bgFile}`

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#07070D',
        fontFamily: QUIZ_FONT,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: ATMOSPHERIC_OVERLAY_LIGHT,
        }}
      />
      {header}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '0 20px',
          paddingTop: header ? '8vh' : 0,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>{children}</div>
      </div>
    </div>
  )
}

export default function Quiz() {
  const navigate = useNavigate()
  const [state, setState] = useState<AdaptiveQuizState>(() => initQuizState())
  const [transitioning, setTransitioning] = useState(false)
  const [pendingResult, setPendingResult] = useState<ReturnType<
    typeof computeResult
  > | null>(null)
  const [showExitBanner, setShowExitBanner] = useState(false)

  const saveAndShowBanner = useCallback(async (quizState: AdaptiveQuizState) => {
    const result = computeResult(quizState)
    localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result))
    clearSessionBackground()

    if (result.mbtiType && result.identity && result.pcc) {
      const quizResult: QuizResult = {
        ...result,
        completedAt: result.completedAt,
      }
      const character = computeCharacter(quizResult)
      await saveMBTIResult({
        mbtiType: result.mbtiType,
        identity: result.identity,
        pcc: result.pcc,
        archetypeKey: character.archetypeKey,
        archetypeLabel: character.archetypeLabel,
        coreTraitLabels: character.coreTraitLabels,
        convergenceScore: character.convergenceScore,
      })
      await saveCurrentCharacter(mapCharacterToCurrentRecord(character))
    }

    setPendingResult(result)
    setShowExitBanner(true)
  }, [])

  useEffect(() => {
    if (state.isComplete && !showExitBanner && !state.showPhase3Prompt) {
      void saveAndShowBanner(state)
    }
  }, [state.isComplete, state.showPhase3Prompt, showExitBanner, saveAndShowBanner, state])

  const handleAnswer = (value: LikertValue) => {
    if (!state.currentQuestion || transitioning) return
    setTransitioning(true)
    const questionId = state.currentQuestion.id
    window.setTimeout(() => {
      setState((prev) => answerQuestion(prev, questionId, value))
      setTransitioning(false)
    }, 180)
  }

  const handleContinuePreview = () => {
    setState((prev) => continueFromPhase2Preview(prev))
  }

  const handleAcceptPhase3 = () => {
    setState((prev) => acceptPhase3(prev))
  }

  const handleSkipPhase3 = () => {
    const next = skipPhase3(state)
    setState(next)
    void saveAndShowBanner(next)
  }

  const goExplore = () => {
    navigate('/explore')
  }

  const goResult = () => {
    void tryCompleteInviteFlow(navigate).then((redirected) => {
      if (!redirected) navigate('/result')
    })
  }

  const currentNumber = state.answers.length + 1
  const totalEstimate = estimateTotalQuestions(state)
  const progressPercent = Math.min(
    100,
    (currentNumber / Math.max(totalEstimate, 1)) * 100,
  )

  const showQuestionHeader =
    !state.showPhase2Preview &&
    !state.showPhase3Prompt &&
    !!state.currentQuestion

  const questionHeader = showQuestionHeader ? (
    <div
      style={{
        position: 'relative',
        zIndex: 20,
        padding: '52px 24px 0',
      }}
    >
      <p
        style={{
          margin: '0 0 20px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
        }}
      >
        Khám phá
      </p>

      <div
        style={{
          height: 2,
          borderRadius: 2,
          background: 'rgba(255,255,255,0.12)',
          marginBottom: 8,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            borderRadius: 2,
            background:
              'linear-gradient(to right, rgba(255,255,255,0.8), rgba(255,255,255,0.4))',
            transition: 'width 0.25s ease',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          Câu {currentNumber}
        </span>
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.08em',
          }}
        >
          ~{totalEstimate}
        </span>
      </div>

      <span
        style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20,
          padding: '3px 12px',
          fontSize: 10,
          color: 'rgba(255,255,255,0.40)',
        }}
      >
        {getPhaseLabel(state.phase)}
      </span>
    </div>
  ) : null

  if (showExitBanner && pendingResult) {
    return (
      <QuizShell>
        <div
          style={{
            textAlign: 'center',
            padding: '28px 24px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: 24,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.92)',
              margin: '0 0 4px',
            }}
          >
            {pendingResult.mbtiType}-{pendingResult.identity}
          </p>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.50)',
              margin: '0 0 24px',
            }}
          >
            Quiz hoàn thành!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              type="button"
              onClick={goExplore}
              style={{
                width: '100%',
                minHeight: 48,
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.90)',
                color: '#07070D',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
              }}
            >
              Khám phá tiềm năng đầy đủ
            </button>
            <button
              type="button"
              onClick={goResult}
              style={{
                width: '100%',
                minHeight: 48,
                padding: '12px 24px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.70)',
                fontWeight: 500,
                fontSize: 14,
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 12,
                cursor: 'pointer',
              }}
            >
              Xem kết quả thôi
            </button>
          </div>
        </div>
      </QuizShell>
    )
  }

  return (
    <QuizShell header={questionHeader}>
      {state.showPhase2Preview && (
        <PhasePreview
          previewKey={getPreviewKey(state.dimensions)}
          onContinue={handleContinuePreview}
        />
      )}

      {state.showPhase3Prompt && !state.showPhase2Preview && (
        <Phase3Prompt onAccept={handleAcceptPhase3} onSkip={handleSkipPhase3} />
      )}

      {!state.showPhase2Preview &&
        !state.showPhase3Prompt &&
        state.currentQuestion && (
          <div style={{ position: 'relative', width: '100%' }}>
            <QuizCard
              question={state.currentQuestion}
              onAnswer={handleAnswer}
              disabled={transitioning}
            />
            {transitioning && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 24,
                  background: 'rgba(7,7,13,0.45)',
                  backdropFilter: 'blur(4px)',
                }}
                aria-hidden
              >
                <PageSpinner label="" />
              </div>
            )}
          </div>
        )}

      {!state.showPhase2Preview &&
        !state.showPhase3Prompt &&
        !state.currentQuestion &&
        !state.isComplete && (
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.40)',
              fontSize: 14,
            }}
          >
            Đang tải câu hỏi...
          </p>
        )}
    </QuizShell>
  )
}
