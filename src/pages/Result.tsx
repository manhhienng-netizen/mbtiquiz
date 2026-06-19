import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CollapsibleSection from '../components/CollapsibleSection'
import AtmosphericPage from '../components/AtmosphericPage'
import CharacterCard from '../components/CharacterCard'
import ElementCard from '../components/ElementCard'
import LifePathCard from '../components/LifePathCard'
import MBTITypeCard from '../components/MBTITypeCard'
import PageSpinner from '../components/PageSpinner'
import ShareSheet from '../components/ShareSheet'
import TraitDrawer from '../components/TraitDrawer'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTNCBData } from '../hooks/useTNCBData'
import {
  clearAllData,
  quizResultFromDexie,
  syncQuizResultToDexie,
} from '../db/tncb-db'
import { getArchetypeVisual } from '../data/archetype-visual'
import { getCombinationPhrase } from '../data/tncb-combination-phrases'
import { NHAT_CHU_CONTENT } from '../data/tncb-nhatchu-content'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import {
  type Gender,
  type Identity,
  type MBTIType,
  QUIZ_RESULT_KEY,
  type QuizResult,
} from '../data/quiz-types'
import { computeCharacter } from '../engine/character-engine'
import { buildShareCardData } from '../utils/buildShareCardData'

const DEFAULT_PCC = { EI: 50, SN: 50, TF: 50, JP: 50 }

const COMPANIONS = [
  { icon: '/assets/icons/PA.png', label: 'Đồng hành\ncá nhân', route: '/assistant/chat', accent: '#7F77DD' },
  { icon: '/assets/icons/WA.png', label: 'Đồng hành\ncông việc', route: '/work/chat', accent: '#A8E63D' },
  { icon: '/assets/icons/MA.png', label: 'Đồng hành\ntâm tính', route: '/match/chat', accent: '#E88B9E' },
] as const

function encodeSharePart(value: string | number): string {
  return encodeURIComponent(String(value))
}

function decodeSharePart(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

export function buildShareParam(result: QuizResult): string {
  const parts = [
    result.mbtiType ?? 'INFP',
    result.identity ?? 'A',
    encodeSharePart(result.nhatChu ?? 'none'),
    encodeSharePart(result.element ?? 'none'),
    encodeSharePart(result.lifePath ?? 0),
  ]
  if (result.gender) {
    parts.push(encodeSharePart(result.gender))
    parts.push(encodeSharePart(result.genderPreference ?? 'none'))
  }
  return parts.join('-')
}

function buildCombinationDisplay(result: QuizResult) {
  const mbtiContent = TNCB_TYPE_CONTENT[result.mbtiType ?? 'INFP']
  const nhatChuContent = result.nhatChu
    ? NHAT_CHU_CONTENT[result.nhatChu]
    : null
  const combinationPhrase =
    result.nhatChu && result.lifePath
      ? getCombinationPhrase(result.nhatChu, result.lifePath)
      : ''

  return {
    mbtiNickname: mbtiContent?.nickname ?? result.mbtiType ?? 'INFP',
    nhatChuNickname: nhatChuContent?.nickname ?? '',
    combinationPhrase,
  }
}

export function buildShareUrl(result: QuizResult): string {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : ''
  const param = buildShareParam(result)
  return `${origin}/result?p=${param}`
}

export function parseShareParam(p: string): Partial<QuizResult> {
  const [
    mbtiType,
    identity,
    nhatChuRaw,
    elementRaw,
    lifePathRaw,
    genderRaw,
    genderPreferenceRaw,
  ] = p.split('-')

  const nhatChu = decodeSharePart(nhatChuRaw ?? '')
  const element = decodeSharePart(elementRaw ?? '')
  const lifePath = Number(decodeSharePart(lifePathRaw ?? ''))
  const gender = genderRaw ? decodeSharePart(genderRaw) : undefined
  const genderPreference = genderPreferenceRaw
    ? decodeSharePart(genderPreferenceRaw)
    : undefined

  const parsed: Partial<QuizResult> = {
    mbtiType: mbtiType as MBTIType,
    identity: identity as Identity,
    nhatChu: nhatChu === 'none' ? undefined : nhatChu,
    element:
      element === 'none' ? undefined : (element as QuizResult['element']),
    lifePath: lifePath || undefined,
  }

  if (gender && gender !== 'none') {
    parsed.gender = gender as Gender
    if (genderPreference && genderPreference !== 'none') {
      parsed.genderPreference = genderPreference as 'male' | 'female'
    }
  }

  return parsed
}

function loadQuizResultFromStorage(searchParam: string | null): QuizResult | null {
  const raw = localStorage.getItem(QUIZ_RESULT_KEY)
  if (raw) {
    try {
      return JSON.parse(raw) as QuizResult
    } catch {
      return null
    }
  }

  if (searchParam) {
    const parsed = parseShareParam(searchParam)
    if (!parsed.mbtiType) return null
    return {
      mbtiType: parsed.mbtiType,
      identity: parsed.identity ?? 'A',
      pcc: DEFAULT_PCC,
      completedAt: new Date().toISOString(),
      nhatChu: parsed.nhatChu,
      element: parsed.element,
      lifePath: parsed.lifePath,
      gender: parsed.gender,
      genderPreference: parsed.genderPreference,
    }
  }

  return null
}

const RESULT_FONT = "'Be Vietnam Pro', system-ui, sans-serif"

function RevealWrapper({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={isVisible ? 'reveal-visible' : 'reveal-hidden'}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function SpiritualSummaryCard({ result }: { result: QuizResult }) {
  return (
    <div
      style={{
        fontFamily: RESULT_FONT,
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 20,
        padding: '20px 24px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <p style={{ color: '#B8A0D4', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
        ✦ Tâm Linh
      </p>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.95)',
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {result.fullName ?? 'Kết quả Tâm Linh'}
      </h1>
      {result.birthDate && (
        <p style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,0.40)' }}>
          Sinh: {result.birthDate}
        </p>
      )}
      <dl style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {result.element && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <dt style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13 }}>Ngũ hành</dt>
            <dd style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 13 }}>
              {result.element}
            </dd>
          </div>
        )}
        {result.lifePath != null && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <dt style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13 }}>Số chủ đạo</dt>
            <dd style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 13 }}>
              {result.lifePath}
            </dd>
          </div>
        )}
        {result.canYear && result.chiYear && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <dt style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13 }}>Can Chi năm</dt>
            <dd style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 13 }}>
              {result.canYear} {result.chiYear}
            </dd>
          </div>
        )}
        {result.nhatChu && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <dt style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13 }}>Nhật Chủ</dt>
            <dd style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 13 }}>
              {result.nhatChu}
            </dd>
          </div>
        )}
        {result.cungMenh && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <dt style={{ color: 'rgba(255,255,255,0.40)', fontSize: 13 }}>Chi năm</dt>
            <dd style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600, fontSize: 13 }}>
              {result.cungMenh}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}

export default function Result() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { mbtiHistory, spiritual, loading: dexieLoading } = useTNCBData()
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [resultResolved, setResultResolved] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [traitDrawerOpen, setTraitDrawerOpen] = useState(false)
  const [traitDrawerIndex, setTraitDrawerIndex] = useState(0)

  useEffect(() => {
    if (dexieLoading) return

    const fromStorage = loadQuizResultFromStorage(searchParams.get('p'))
    if (fromStorage) {
      setQuizResult(fromStorage)
      setResultResolved(true)
      return
    }

    const latestMbti = mbtiHistory[mbtiHistory.length - 1]
    const fromDexie = quizResultFromDexie(latestMbti, spiritual)
    setQuizResult(fromDexie)
    setResultResolved(true)
  }, [dexieLoading, mbtiHistory, spiritual, searchParams])

  useEffect(() => {
    if (!quizResult) return
    void syncQuizResultToDexie(quizResult)
  }, [quizResult])

  const spiritualOnly =
    !!quizResult?.spiritualOnly || (!!quizResult && !quizResult.mbtiType)

  const character = useMemo(() => {
    if (!quizResult || spiritualOnly || !quizResult.mbtiType) return null
    return computeCharacter(quizResult)
  }, [quizResult, spiritualOnly])

  useEffect(() => {
    if (!resultResolved) return
    if (!quizResult) {
      setContentReady(false)
      navigate('/')
      return
    }
    setContentReady(false)
    const id = window.setTimeout(() => setContentReady(true), 300)
    return () => window.clearTimeout(id)
  }, [quizResult, resultResolved, navigate])

  if (!resultResolved || dexieLoading) {
    return (
      <AtmosphericPage overlay="light" contentStyle={{ fontFamily: RESULT_FONT }}>
        <div className="max-w-lg mx-auto px-4 py-16 flex justify-center">
          <PageSpinner label="Đang tải kết quả..." />
        </div>
      </AtmosphericPage>
    )
  }

  if (!quizResult) return null
  if (!spiritualOnly && !character) return null

  if (!contentReady) {
    return (
      <AtmosphericPage overlay="light" contentStyle={{ fontFamily: RESULT_FONT }}>
        <div className="max-w-lg mx-auto px-4 py-16 flex justify-center">
          <PageSpinner
            label={
              spiritualOnly ? 'Đang tải Tâm Linh...' : 'Đang tổng hợp Character...'
            }
          />
        </div>
      </AtmosphericPage>
    )
  }

  const handleRetake = () => {
    const ok = window.confirm(
      'Xóa toàn bộ kết quả để làm lại? Dữ liệu trên máy bạn sẽ bị xóa.',
    )
    if (!ok) return
    localStorage.removeItem(QUIZ_RESULT_KEY)
    void clearAllData().then(() => navigate('/quiz'))
  }

  const showSpiritualCta =
    !spiritualOnly && (!quizResult.lifePath || !quizResult.element)

  const visual = character
    ? getArchetypeVisual(character.archetypeKey)
    : null

  const combinationDisplay =
    quizResult && character && !spiritualOnly
      ? buildCombinationDisplay(quizResult)
      : null

  return (
    <AtmosphericPage overlay="light" contentStyle={{ fontFamily: RESULT_FONT }}>
      <div className="max-w-lg mx-auto px-4 py-8 sm:py-10">
        {spiritualOnly && (
          <div
            className="mb-4 rounded-xl p-4"
            style={{
              background: 'rgba(184,160,212,0.08)',
              border: '1px solid rgba(184,160,212,0.25)',
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              Bạn chưa làm quiz MBTI
            </p>
            <button
              type="button"
              onClick={() => navigate('/quiz')}
              className="w-full min-h-11 py-2.5 font-semibold rounded-xl transition-colors"
              style={{
                background: '#7C3AED',
                color: '#fff',
              }}
            >
              Làm quiz ngay →
            </button>
          </div>
        )}

        {spiritualOnly ? (
          <SpiritualSummaryCard result={quizResult} />
        ) : (
          character && (
            <>
              <RevealWrapper>
                <CharacterCard
                  character={character}
                  mbtiType={quizResult.mbtiType!}
                  identity={quizResult.identity ?? 'A'}
                  element={quizResult.element}
                  nhatChu={quizResult.nhatChu}
                  lifePath={quizResult.lifePath}
                  gender={quizResult.gender}
                  genderPreference={quizResult.genderPreference}
                  mbtiNickname={combinationDisplay?.mbtiNickname ?? ''}
                  combinationPhrase={combinationDisplay?.combinationPhrase ?? ''}
                  onTraitClick={(index) => {
                    setTraitDrawerIndex(index)
                    setTraitDrawerOpen(true)
                  }}
                />
              </RevealWrapper>

              {visual && (
                <TraitDrawer
                  isOpen={traitDrawerOpen}
                  onClose={() => setTraitDrawerOpen(false)}
                  traitKeys={character.coreTraits}
                  initialIndex={traitDrawerIndex}
                  archetypeColor={visual.color}
                />
              )}
              {quizResult.mbtiType && (
                <RevealWrapper>
                  <div className="mt-4">
                    <CollapsibleSection title={`MBTI — ${quizResult.mbtiType}`}>
                      <MBTITypeCard
                        mbtiType={quizResult.mbtiType}
                        identity={quizResult.identity ?? 'A'}
                        element={quizResult.element}
                        gender={quizResult.gender}
                        genderPreference={quizResult.genderPreference}
                      />
                    </CollapsibleSection>
                  </div>
                </RevealWrapper>
              )}
              {quizResult.lifePath != null && (
                <RevealWrapper>
                  <div className="mt-4">
                    <CollapsibleSection title="Số học">
                      <LifePathCard
                        lifePath={quizResult.lifePath}
                        fullName={quizResult.fullName}
                      />
                    </CollapsibleSection>
                  </div>
                </RevealWrapper>
              )}
              {quizResult.element && (
                <RevealWrapper>
                  <div className="mt-4">
                    <CollapsibleSection
                      title={
                        quizResult.nhatChu
                          ? 'Ngũ hành · Nhật chủ'
                          : 'Ngũ hành'
                      }
                    >
                      <ElementCard
                        element={quizResult.element}
                        nhatChu={quizResult.nhatChu}
                      />
                    </CollapsibleSection>
                  </div>
                </RevealWrapper>
              )}

            </>
          )
        )}

        {spiritualOnly && quizResult.lifePath != null && (
          <div className="mt-4">
            <CollapsibleSection title="Số học">
              <LifePathCard
                lifePath={quizResult.lifePath}
                fullName={quizResult.fullName}
              />
            </CollapsibleSection>
          </div>
        )}

        {spiritualOnly && quizResult.element && (
          <div className="mt-4">
            <CollapsibleSection
              title={
                quizResult.nhatChu ? 'Ngũ hành · Nhật chủ' : 'Ngũ hành'
              }
            >
              <ElementCard
                element={quizResult.element}
                nhatChu={quizResult.nhatChu}
              />
            </CollapsibleSection>
          </div>
        )}

        {showSpiritualCta && (
          <div
            className="mt-4 rounded-xl p-4 sm:p-5"
            style={{
              background: 'rgba(255,191,0,0.08)',
              border: '1px solid rgba(255,191,0,0.2)',
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              ✨ Khám phá thêm qua Tâm Linh
            </p>
            <p
              style={{
                marginTop: 4,
                fontSize: 14,
                color: 'rgba(255,255,255,0.60)',
                lineHeight: 1.5,
              }}
            >
              Góc nhìn Đông & Tây phương về khi bạn phát triển
            </p>
            <button
              type="button"
              onClick={() => navigate('/explore')}
              className="mt-4 w-full min-h-11 py-2.5 font-semibold rounded-xl transition-colors"
              style={{
                background: 'rgba(255,191,0,0.85)',
                color: '#0A0A0F',
              }}
            >
              Nhập tên + ngày sinh →
            </button>
          </div>
        )}

        {!spiritualOnly && character && (
          <>
            <ShareSheet
              isOpen={shareOpen}
              onClose={() => setShareOpen(false)}
              cardData={buildShareCardData(quizResult, character)}
              shareUrl={buildShareUrl(quizResult)}
            />
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="w-full min-h-12 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors mt-4"
              style={{
                border: '1px solid rgba(184,160,212,0.35)',
                color: '#B8A0D4',
                background: 'rgba(184,160,212,0.06)',
              }}
            >
              📤 Chia sẻ thẻ
            </button>

            <p
              className="text-center uppercase tracking-[0.12em] mt-8 mb-5"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '1.5px',
              }}
            >
              Chọn bạn đồng hành
            </p>

            <div
              style={{
                display: 'flex',
                gap: 10,
                padding: '0 20px',
                justifyContent: 'center',
              }}
            >
              {COMPANIONS.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => navigate(c.route)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    padding: '12px 8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${c.accent}33`,
                    borderRadius: 14,
                    cursor: 'pointer',
                    maxWidth: 120,
                  }}
                >
                  <img
                    src={c.icon}
                    alt={c.label.replace('\n', ' ')}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: 'contain',
                      mixBlendMode: 'screen',
                    }}
                    draggable={false}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.7)',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    {c.label.split('\n').map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-3">
          <button
            type="button"
            onClick={handleRetake}
            className="w-full py-3 text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.40)' }}
          >
            Làm lại
          </button>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: 'rgba(255,255,255,0.30)' }}
        >
          Kết quả mang tính tham khảo, không phải chẩn đoán khoa học.
        </p>
      </div>
    </AtmosphericPage>
  )
}
