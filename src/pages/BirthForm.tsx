import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import BirthFormFields, {
  type BirthFormSubmitData,
} from '../components/BirthFormFields'
import SpiritualLoading from '../components/SpiritualLoading'
import type { Element, MBTIType, QuizResult } from '../data/quiz-types'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import {
  mapCharacterToCurrentRecord,
  saveCurrentCharacter,
  saveMBTIResult,
  savePersona,
  saveSpiritualResult,
} from '../db/tncb-db'
import { computeCharacter } from '../engine/character-engine'
import { calculateSpiritualData } from '../engine/spiritual-calculator'
import { tryCompleteInviteFlow } from '../lib/p2p/invite-service'

type BirthFormStep = 'form' | 'loading' | 'done'

const NGUYEN_HANH = new Set<string>(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'])

const VALID_MBTI_TYPES = new Set<string>([
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
])

const SELF_SELECT_PCC = { EI: 50, SN: 50, TF: 50, JP: 50 }

function toElement(value: string): Element | undefined {
  return NGUYEN_HANH.has(value) ? (value as Element) : undefined
}

function mergeSpiritualIntoResult(
  existing: Partial<QuizResult>,
  spiritual: ReturnType<typeof calculateSpiritualData>,
): Partial<QuizResult> {
  return {
    ...existing,
    fullName: spiritual.fullName,
    birthDate: spiritual.birthDate,
    birthHour: spiritual.birthHour ?? undefined,
    lunarYear: spiritual.lunarYear,
    canYear: spiritual.canYear,
    chiYear: spiritual.chiYear,
    nhatChu: spiritual.nhatChu,
    element: toElement(spiritual.element),
    cungMenh: spiritual.cungMenh ?? undefined,
    lifePath: spiritual.lifePath,
    gender: spiritual.gender,
    genderPreference: spiritual.genderPreference,
    completedAt: existing.completedAt ?? new Date().toISOString(),
  }
}

export default function BirthForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState<BirthFormStep>('form')
  const [loadingName, setLoadingName] = useState('')
  const pendingRef = useRef<BirthFormSubmitData | null>(null)

  useEffect(() => {
    const mbtiType = searchParams.get('mbtiType')
    const source = searchParams.get('source')

    if (!mbtiType || source !== 'self-select' || !VALID_MBTI_TYPES.has(mbtiType)) {
      return
    }

    let cancelled = false

    void (async () => {
      await savePersona({ mbtiType, typeSource: 'self-select' })

      const quizResult: QuizResult = {
        mbtiType: mbtiType as MBTIType,
        identity: 'A',
        pcc: SELF_SELECT_PCC,
        completedAt: new Date().toISOString(),
      }
      const character = computeCharacter(quizResult)

      await saveMBTIResult({
        mbtiType,
        identity: 'A',
        pcc: SELF_SELECT_PCC,
        archetypeKey: character.archetypeKey,
        archetypeLabel: character.archetypeLabel,
        coreTraitLabels: character.coreTraitLabels,
        convergenceScore: character.convergenceScore,
      })
      await saveCurrentCharacter(mapCharacterToCurrentRecord(character))

      if (cancelled) return

      const raw = localStorage.getItem(QUIZ_RESULT_KEY)
      const existing: Partial<QuizResult> = raw
        ? (JSON.parse(raw) as Partial<QuizResult>)
        : {}
      const payload: Partial<QuizResult> = {
        ...existing,
        mbtiType: mbtiType as MBTIType,
        identity: 'A',
        pcc: SELF_SELECT_PCC,
        completedAt: new Date().toISOString(),
      }
      delete payload.spiritualOnly
      localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(payload))
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams])

  const finishWithData = useCallback(
    async (data: BirthFormSubmitData) => {
      const day = parseInt(data.day, 10)
      const month = parseInt(data.month, 10)
      const year = parseInt(data.year, 10)

      const spiritual = calculateSpiritualData(
        data.fullName,
        day,
        month,
        year,
        data.birthHour,
        data.gender,
        data.genderPreference,
      )

      const raw = localStorage.getItem(QUIZ_RESULT_KEY)
      const existing: Partial<QuizResult> = raw
        ? (JSON.parse(raw) as Partial<QuizResult>)
        : {}

      const merged = mergeSpiritualIntoResult(existing, spiritual)
      const payload: Partial<QuizResult> = { ...merged }
      if (!existing.mbtiType) {
        payload.spiritualOnly = true
        delete payload.mbtiType
        delete payload.identity
        delete payload.pcc
      }
      localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(payload))

      await saveSpiritualResult({
        fullName: spiritual.fullName,
        birthDate: spiritual.birthDate,
        birthHour: spiritual.birthHour ?? '',
        lunarYear: spiritual.lunarYear,
        canYear: spiritual.canYear,
        chiYear: spiritual.chiYear,
        nhatChu: spiritual.nhatChu,
        element: spiritual.element,
        cungMenh: spiritual.cungMenh ?? '',
        lifePath: spiritual.lifePath,
      })

      if (existing.mbtiType && merged.mbtiType) {
        const character = computeCharacter(merged as QuizResult)
        await saveCurrentCharacter(mapCharacterToCurrentRecord(character))
      }

      setStep('done')
      const redirected = await tryCompleteInviteFlow(navigate)
      if (!redirected) navigate('/result')
    },
    [navigate],
  )

  const handleSubmit = (data: BirthFormSubmitData) => {
    pendingRef.current = data
    setLoadingName(data.fullName)
    setStep('loading')

    window.setTimeout(() => {
      const pending = pendingRef.current
      if (pending) void finishWithData(pending)
    }, 1500)
  }

  return (
    <AtmosphericPage
      overlay="light"
      contentStyle={{
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: '#fff',
      }}
    >
      <div className="max-w-lg mx-auto px-4 py-8 sm:py-10">
        {step === 'form' && (
          <BirthFormFields onSubmit={handleSubmit} isLoading={false} />
        )}

        {step === 'loading' && <SpiritualLoading name={loadingName} />}

        {step === 'done' && (
          <p className="text-center text-[rgba(255,255,255,0.50)]">
            Đang chuyển đến kết quả...
          </p>
        )}
      </div>
    </AtmosphericPage>
  )
}
