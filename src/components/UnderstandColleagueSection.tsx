import { useMemo, useState } from 'react'
import { getCasesByType, type CaseStudy, type SituationId } from '../data/manager-case-studies'
import { getGuidanceCard } from '../data/manager-diagnostic'
import { MANAGER_COACHING_B2B, type MbtiType } from '../data/manager-coaching-b2b'
import { buildPersonEstimatorQuestions } from '../data/person-type-estimator-questions'
import { getWorkPeerCompatibility } from '../lib/work-peer-compat'
import PersonTypeEstimator from './PersonTypeEstimator'
import WorkGuidanceInsight from './WorkGuidanceInsight'

const MBTI_TYPES = Object.keys(MANAGER_COACHING_B2B) as MbtiType[]

const COLLEAGUE_SITUATIONS: {
  id: SituationId
  label: string
  desc: string
  iconImg: string
}[] = [
  {
    id: 'S4',
    iconImg: '/assets/icons/situation-conflict.png',
    label: 'Bất đồng ý kiến',
    desc: 'Kết quả hoặc cách làm không khớp — cần thống nhất',
  },
  {
    id: 'S8',
    iconImg: '/assets/icons/situation-collaborate.png',
    label: 'Phối hợp dự án',
    desc: 'Cùng deliver — xây nền hợp tác ngang hàng',
  },
  {
    id: 'S1',
    iconImg: '/assets/icons/situation-tension.png',
    label: 'Trao đổi căng',
    desc: 'Khó nói thẳng mà không tạo friction',
  },
]

const situationIconStyle = {
  width: 20,
  height: 20,
  objectFit: 'contain' as const,
  mixBlendMode: 'screen' as const,
  flexShrink: 0,
  marginRight: 8,
  marginTop: 2,
}

type PickerPhase = 'entry' | 'estimator' | 'picker'

const estimatorQuestions = buildPersonEstimatorQuestions('colleague')

function findCaseStudy(type: string, situationId: SituationId): CaseStudy | undefined {
  return getCasesByType(type).find(
    (c) => c.situation === situationId && c.employeeType === type,
  )
}

type UnderstandColleagueSectionProps = {
  mbtiType: MbtiType
  embedded?: boolean
}

export default function UnderstandColleagueSection({
  mbtiType,
  embedded = false,
}: UnderstandColleagueSectionProps) {
  const [pickerPhase, setPickerPhase] = useState<PickerPhase>('entry')
  const [suggestedTypes, setSuggestedTypes] = useState<MbtiType[]>([])
  const [showAllTypes, setShowAllTypes] = useState(false)
  const [personType, setPersonType] = useState<MbtiType | null>(null)
  const [situationId, setSituationId] = useState<SituationId | null>(null)

  const pickerTypes =
    showAllTypes || suggestedTypes.length === 0 ? MBTI_TYPES : suggestedTypes

  const guidance = useMemo(() => {
    if (!personType || !situationId) return null
    return getGuidanceCard(personType, situationId)
  }, [personType, situationId])

  const caseStudy = useMemo(() => {
    if (!personType || !situationId) return undefined
    return findCaseStudy(personType, situationId)
  }, [personType, situationId])

  const peerCompatNote = useMemo(() => {
    if (!personType) return null
    return getWorkPeerCompatibility(mbtiType, personType)
  }, [mbtiType, personType])

  const situationLabel =
    COLLEAGUE_SITUATIONS.find((s) => s.id === situationId)?.label ?? ''

  function selectPersonType(type: MbtiType) {
    setPersonType(type)
    setPickerPhase('picker')
  }

  function skipToPicker() {
    setShowAllTypes(true)
    setPickerPhase('picker')
  }

  const showTypePicker = pickerPhase === 'picker' || personType != null

  return (
    <section id="hieu-dong-nghiep" style={{ marginTop: embedded ? 0 : '32px' }}>
      {!embedded ? (
        <>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
              marginBottom: '28px',
            }}
          />

          <h2
            style={{
              margin: '0 0 6px',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Hiểu đồng nghiệp
          </h2>
          <p
            style={{
              margin: '0 0 20px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Góc ngang hàng — hợp tác và ranh giới với một đồng nghiệp cụ thể. Không có quyền
            lực quản lý — trao đổi và tôn trọng cách làm khác.
          </p>
        </>
      ) : null}

      {!personType && pickerPhase === 'entry' ? (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <button
            type="button"
            onClick={() => setPickerPhase('estimator')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(168,230,61,0.40)',
              background: 'rgba(168,230,61,0.10)',
              color: '#A8E63D',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Đoán type đồng nghiệp
          </button>
          <button
            type="button"
            onClick={skipToPicker}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.70)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Tôi đã biết type đồng nghiệp
          </button>
        </div>
      ) : null}

      {pickerPhase === 'estimator' && !personType ? (
        <PersonTypeEstimator
          questions={estimatorQuestions}
          resultSubjectLabel="đồng nghiệp này"
          onComplete={(result) => {
            setSuggestedTypes(result.topTypes)
            if (result.confidence === 'thấp') {
              setShowAllTypes(true)
              setPickerPhase('picker')
            }
          }}
          onSelectType={selectPersonType}
          onShowFullPicker={() => {
            setShowAllTypes(true)
            setPickerPhase('picker')
          }}
          onSkip={skipToPicker}
        />
      ) : null}

      {showTypePicker ? (
        <TypePickerBlock
          types={pickerTypes}
          selected={personType}
          suggestedTypes={suggestedTypes}
          showAllTypes={showAllTypes}
          onSelect={(type) => {
            setPersonType(personType === type ? null : type)
            if (personType === type) setSituationId(null)
          }}
          onShowAll={() => setShowAllTypes(true)}
        />
      ) : null}

      {personType ? (
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '8px',
            }}
          >
            Tình huống với đồng nghiệp này?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {COLLEAGUE_SITUATIONS.map((sit) => {
              const selected = situationId === sit.id
              return (
                <button
                  key={sit.id}
                  type="button"
                  onClick={() => setSituationId(selected ? null : sit.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: selected
                      ? '1px solid rgba(168,230,61,0.40)'
                      : '1px solid rgba(255,255,255,0.10)',
                    background: selected
                      ? 'rgba(168,230,61,0.08)'
                      : 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.80)',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <img
                    src={sit.iconImg}
                    alt={sit.label}
                    style={situationIconStyle}
                  />
                  <span>
                    <span
                      style={{
                        display: 'block',
                        fontWeight: 700,
                        color: selected ? '#A8E63D' : 'rgba(255,255,255,0.85)',
                      }}
                    >
                      {sit.label}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        marginTop: '2px',
                        color: 'rgba(255,255,255,0.45)',
                        fontWeight: 400,
                      }}
                    >
                      {sit.desc}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <p
          style={{
            margin: '0 0 24px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.38)',
            fontStyle: 'italic',
          }}
        >
          Chọn type đồng nghiệp để xem gợi ý phối hợp
        </p>
      )}

      {personType && peerCompatNote && !situationId ? (
        <article
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '14px',
            padding: '16px',
            marginBottom: '16px',
          }}
        >
          <p
            style={{
              margin: '0 0 6px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#A8E63D',
            }}
          >
            Quan hệ 2 kiểu
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {peerCompatNote}
          </p>
        </article>
      ) : null}

      {guidance && personType && situationId ? (
        <WorkGuidanceInsight
          guidance={guidance}
          mode="colleague"
          situationLabel={situationLabel}
          personType={personType}
          cardKey={`${personType}-${situationId}`}
          peerCompatNote={peerCompatNote}
          caseStudy={caseStudy}
        />
      ) : null}
    </section>
  )
}

function TypePickerBlock({
  types,
  selected,
  suggestedTypes,
  showAllTypes,
  onSelect,
  onShowAll,
}: {
  types: MbtiType[]
  selected: MbtiType | null
  suggestedTypes: MbtiType[]
  showAllTypes: boolean
  onSelect: (type: MbtiType) => void
  onShowAll: () => void
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: '4px',
        }}
      >
        Type của đồng nghiệp
      </div>
      <p
        style={{
          margin: '0 0 10px',
          fontSize: '12px',
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.38)',
        }}
      >
        Hỏi trực tiếp tốt hơn giả định type
      </p>

      {!showAllTypes && suggestedTypes.length > 0 ? (
        <p
          style={{
            margin: '0 0 10px',
            fontSize: '12px',
            lineHeight: 1.5,
            color: 'rgba(168,230,61,0.65)',
          }}
        >
          Gợi ý từ estimator — hoặc xem đủ 16 type
        </p>
      ) : null}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: suggestedTypes.length > 0 && !showAllTypes ? '10px' : 0,
        }}
      >
        {types.map((type) => {
          const isSelected = selected === type
          const isSuggested = suggestedTypes.includes(type)
          return (
            <button
              key={type}
              type="button"
              onClick={() => onSelect(type)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: isSelected
                  ? '1px solid rgba(168,230,61,0.45)'
                  : isSuggested
                    ? '1px solid rgba(168,230,61,0.28)'
                    : '1px solid rgba(255,255,255,0.10)',
                background: isSelected
                  ? 'rgba(168,230,61,0.12)'
                  : isSuggested
                    ? 'rgba(168,230,61,0.06)'
                    : 'rgba(255,255,255,0.04)',
                color: isSelected ? '#A8E63D' : 'rgba(255,255,255,0.65)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {type}
            </button>
          )
        })}
      </div>

      {suggestedTypes.length > 0 && !showAllTypes ? (
        <button
          type="button"
          onClick={onShowAll}
          style={{
            marginTop: '10px',
            padding: 0,
            border: 'none',
            background: 'none',
            color: 'rgba(255,255,255,0.45)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Xem tất cả 16 type
        </button>
      ) : null}
    </div>
  )
}
