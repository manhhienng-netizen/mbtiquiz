import { useMemo, useState, type CSSProperties } from 'react'
import { getCasesByType, type CaseStudy } from '../data/manager-case-studies'
import {
  getGuidanceCard,
  SITUATIONS,
  type SituationId,
} from '../data/manager-diagnostic'
import { MANAGER_COACHING_B2B, type MbtiType } from '../data/manager-coaching-b2b'
import { buildPersonEstimatorQuestions } from '../data/person-type-estimator-questions'
import PersonTypeEstimator from './PersonTypeEstimator'
import WorkGuidanceInsight from './WorkGuidanceInsight'

const MBTI_TYPES = Object.keys(MANAGER_COACHING_B2B) as MbtiType[]

const SUBORDINATE_SITUATION_IDS = new Set<SituationId>(['S1', 'S2', 'S4', 'S5'])

const SUBORDINATE_SITUATIONS = SITUATIONS.filter((s) =>
  SUBORDINATE_SITUATION_IDS.has(s.id),
)

const SITUATION_ICON_IMG: Partial<Record<SituationId, string>> = {
  S1: '/assets/icons/situation-feedback.png',
  S2: '/assets/icons/situation-motivation.png',
  S4: '/assets/icons/situation-expectation.png',
  S5: '/assets/icons/situation-quit.png',
}

const situationIconStyle: CSSProperties = {
  width: 20,
  height: 20,
  objectFit: 'contain',
  mixBlendMode: 'screen',
  flexShrink: 0,
  marginRight: 8,
  marginTop: 2,
}

type PickerPhase = 'entry' | 'estimator' | 'picker'

const estimatorQuestions = buildPersonEstimatorQuestions('subordinate')

function findCaseStudy(type: string, situationId: SituationId): CaseStudy | undefined {
  return getCasesByType(type).find(
    (c) => c.situation === situationId && c.employeeType === type,
  )
}

export default function UnderstandSubordinateSection({
  embedded = false,
}: {
  embedded?: boolean
} = {}) {
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

  const situationLabel =
    SUBORDINATE_SITUATIONS.find((s) => s.id === situationId)?.label ?? ''

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
    <section id="hieu-cap-duoi" style={{ marginTop: embedded ? 0 : '32px' }}>
      {!embedded ? (
        <>
          <SectionDivider />

          <h2 style={sectionTitleStyle}>Hiểu cấp dưới</h2>
          <p style={sectionDescStyle}>
            Góc 1-1 — cách bạn dẫn dắt và hỗ trợ một nhân viên cụ thể. Khác với quản lý
            đội: đây là về người đó, không phải phối hợp nhiều type.
          </p>
        </>
      ) : null}

      {!personType && pickerPhase === 'entry' ? (
        <EntryButtons
          onEstimate={() => setPickerPhase('estimator')}
          onKnownType={skipToPicker}
          estimateLabel="Đoán type nhân viên"
          knownLabel="Tôi đã biết type nhân viên"
        />
      ) : null}

      {pickerPhase === 'estimator' && !personType ? (
        <PersonTypeEstimator
          questions={estimatorQuestions}
          resultSubjectLabel="nhân viên này"
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
        <TypePicker
          label="Type của nhân viên"
          hint="Không chắc? Hỏi trực tiếp tốt hơn giả định type"
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
          <div style={pickerLabelStyle}>Đang xảy ra chuyện gì với nhân viên này?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SUBORDINATE_SITUATIONS.map((sit) => {
              const selected = situationId === sit.id
              return (
                <button
                  key={sit.id}
                  type="button"
                  onClick={() => setSituationId(selected ? null : sit.id)}
                  style={situationButtonStyle(selected)}
                >
                  <img
                    src={SITUATION_ICON_IMG[sit.id]}
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
        <p style={emptyHintStyle}>Chọn type nhân viên để xem gợi ý theo tình huống</p>
      )}

      {guidance && personType && situationId ? (
        <WorkGuidanceInsight
          guidance={guidance}
          mode="subordinate"
          situationLabel={situationLabel}
          personType={personType}
          cardKey={`${personType}-${situationId}`}
          caseStudy={caseStudy}
        />
      ) : null}
    </section>
  )
}

function SectionDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        marginBottom: '28px',
      }}
    />
  )
}

function EntryButtons({
  onEstimate,
  onKnownType,
  estimateLabel,
  knownLabel,
}: {
  onEstimate: () => void
  onKnownType: () => void
  estimateLabel: string
  knownLabel: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <button type="button" onClick={onEstimate} style={primaryEntryStyle}>
        {estimateLabel}
      </button>
      <button type="button" onClick={onKnownType} style={secondaryEntryStyle}>
        {knownLabel}
      </button>
    </div>
  )
}

function TypePicker({
  label,
  hint,
  types,
  selected,
  suggestedTypes,
  showAllTypes,
  onSelect,
  onShowAll,
}: {
  label: string
  hint: string
  types: MbtiType[]
  selected: MbtiType | null
  suggestedTypes: MbtiType[]
  showAllTypes: boolean
  onSelect: (type: MbtiType) => void
  onShowAll: () => void
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={pickerLabelStyle}>{label}</div>
      <p style={pickerHintStyle}>{hint}</p>

      {!showAllTypes && suggestedTypes.length > 0 ? (
        <p style={suggestedHintStyle}>Gợi ý từ estimator — hoặc xem đủ 16 type</p>
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
              style={typePillStyle(isSelected, isSuggested)}
            >
              {type}
            </button>
          )
        })}
      </div>

      {suggestedTypes.length > 0 && !showAllTypes ? (
        <button type="button" onClick={onShowAll} style={linkButtonStyle}>
          Xem tất cả 16 type
        </button>
      ) : null}
    </div>
  )
}

const sectionTitleStyle: CSSProperties = {
  margin: '0 0 6px',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: 1.3,
}

const sectionDescStyle: CSSProperties = {
  margin: '0 0 20px',
  fontSize: '14px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.50)',
}

const pickerLabelStyle: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.55)',
  marginBottom: '4px',
}

const pickerHintStyle: CSSProperties = {
  margin: '0 0 10px',
  fontSize: '12px',
  lineHeight: 1.5,
  color: 'rgba(255,255,255,0.38)',
}

const suggestedHintStyle: CSSProperties = {
  margin: '0 0 10px',
  fontSize: '12px',
  lineHeight: 1.5,
  color: 'rgba(168,230,61,0.65)',
}

const emptyHintStyle: CSSProperties = {
  margin: '0 0 24px',
  fontSize: '13px',
  lineHeight: 1.6,
  color: 'rgba(255,255,255,0.38)',
  fontStyle: 'italic',
}

const primaryEntryStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(168,230,61,0.40)',
  background: 'rgba(168,230,61,0.10)',
  color: '#A8E63D',
  fontSize: '13px',
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const secondaryEntryStyle: CSSProperties = {
  padding: '10px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.70)',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

const linkButtonStyle: CSSProperties = {
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
}

function typePillStyle(selected: boolean, suggested: boolean): CSSProperties {
  return {
    padding: '6px 10px',
    borderRadius: '8px',
    border: selected
      ? '1px solid rgba(168,230,61,0.45)'
      : suggested
        ? '1px solid rgba(168,230,61,0.28)'
        : '1px solid rgba(255,255,255,0.10)',
    background: selected
      ? 'rgba(168,230,61,0.12)'
      : suggested
        ? 'rgba(168,230,61,0.06)'
        : 'rgba(255,255,255,0.04)',
    color: selected ? '#A8E63D' : 'rgba(255,255,255,0.65)',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}

function situationButtonStyle(selected: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '12px 14px',
    borderRadius: '12px',
    border: selected
      ? '1px solid rgba(168,230,61,0.40)'
      : '1px solid rgba(255,255,255,0.10)',
    background: selected ? 'rgba(168,230,61,0.08)' : 'rgba(255,255,255,0.03)',
    color: 'rgba(255,255,255,0.80)',
    fontSize: '14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}
