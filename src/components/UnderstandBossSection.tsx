import { useEffect, useState, type CSSProperties } from 'react'
import { BOSS_INSIGHT_CARDS } from '../data/boss-insight-cards'
import { getDiscContent, type DiscType } from '../data/disc-content'
import { DISC_LABELS } from '../data/disc-items'
import { EMPLOYEE_CASE_STUDIES } from '../data/employee-case-studies'
import type { ScaleBand } from '../data/scale-tint-content'
import {
  getWorkplaceBossTier3A,
  getWorkplaceBossTier3B,
  type KBEntry,
} from '../data/kb-selfprotection'
import { loadDiscProfile } from '../lib/disc-db-helper'
import type { DiscProfile } from '../lib/disc-scoring'
import { MANAGER_COACHING_B2B, type MbtiType } from '../data/manager-coaching-b2b'
import BossInsightCard from './BossInsightCard'
import BossTypeEstimator from './BossTypeEstimator'
import CollapsibleSection from './CollapsibleSection'
import EmployeeCaseStudy from './EmployeeCaseStudy'

const MBTI_TYPES = Object.keys(MANAGER_COACHING_B2B) as MbtiType[]

type PickerPhase = 'entry' | 'estimator' | 'picker'
// estimator phase includes quiz + result screen until user picks or opens full picker

const bossLensCardStyle: CSSProperties = {
  marginTop: '12px',
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '12px',
  background: 'rgba(212,184,128,0.05)',
  border: '1px solid rgba(212,184,128,0.20)',
}

function mbtiToBossDisc(mbtiType: string): DiscType | null {
  const map: Record<string, DiscType> = {
    ENTJ: 'D',
    ESTJ: 'D',
    ESTP: 'D',
    ENFP: 'I',
    ESFP: 'I',
    ENFJ: 'I',
    ENTP: 'I',
    ISFJ: 'S',
    ESFJ: 'S',
    INFJ: 'S',
    ISFP: 'S',
    INTJ: 'C',
    ISTJ: 'C',
    INTP: 'C',
    INFP: 'C',
    ISTP: 'C',
  }
  const base = mbtiType?.toUpperCase().replace(/[-AT].*/, '').trim()
  return map[base] ?? null
}

function BossKnowledgeEntry({ entry }: { entry: KBEntry }) {
  return (
    <CollapsibleSection key={entry.id} title={entry.name} size="sm">
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.78)',
        }}
      >
        {entry.content}
      </p>
    </CollapsibleSection>
  )
}

type UnderstandBossSectionProps = {
  mbtiType?: MbtiType | null
  scaleBand?: ScaleBand | null
  /** Ẩn tiêu đề section khi đã bọc bởi CollapsibleSection ở page cha */
  embedded?: boolean
}

export default function UnderstandBossSection({
  mbtiType: _mbtiType = null,
  scaleBand: _scaleBand = null,
  embedded = false,
}: UnderstandBossSectionProps = {}) {
  const [pickerPhase, setPickerPhase] = useState<PickerPhase>('entry')
  const [, setEstimatorDone] = useState(false)
  const [suggestedTypes, setSuggestedTypes] = useState<MbtiType[]>([])
  const [showAllTypes, setShowAllTypes] = useState(false)
  const [bossType, setBossType] = useState<string | null>(null)
  const [discProfile, setDiscProfile] = useState<DiscProfile | null>(null)

  useEffect(() => {
    loadDiscProfile()
      .then(setDiscProfile)
      .catch(() => setDiscProfile(null))
  }, [])

  const tier3A = getWorkplaceBossTier3A()
  const tier3B = getWorkplaceBossTier3B()
  const card = bossType
    ? BOSS_INSIGHT_CARDS.find((c) => c.bossType === bossType)
    : undefined
  const study = bossType
    ? EMPLOYEE_CASE_STUDIES.find((s) => s.bossType === bossType)
    : undefined

  const pickerTypes =
    showAllTypes || suggestedTypes.length === 0
      ? MBTI_TYPES
      : suggestedTypes

  function selectBossType(type: MbtiType) {
    setBossType(type)
    setEstimatorDone(true)
    setPickerPhase('picker')
  }

  function skipToPicker() {
    setEstimatorDone(true)
    setShowAllTypes(true)
    setPickerPhase('picker')
  }

  const showTypePicker = pickerPhase === 'picker' || bossType != null
  const bossDISC = bossType ? mbtiToBossDisc(bossType) : null
  const bossDiscContent =
    discProfile && bossDISC ? getDiscContent(bossDISC) : null

  return (
    <section id="hieu-sep" style={{ marginTop: embedded ? 0 : '32px' }}>
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
            Hiểu Sếp
          </h2>
          <p
            style={{
              margin: '0 0 20px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Nhận diện phong cách — và biết cách tự bảo vệ mình
          </p>
        </>
      ) : null}

      {!bossType && pickerPhase === 'entry' ? (
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
            Đoán type sếp
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
            Tôi đã biết type sếp
          </button>
        </div>
      ) : null}

      {pickerPhase === 'estimator' && !bossType ? (
        <BossTypeEstimator
          onComplete={(result) => {
            setSuggestedTypes(result.topTypes)
            if (result.confidence === 'thấp') {
              setShowAllTypes(true)
              setPickerPhase('picker')
              setEstimatorDone(true)
            }
          }}
          onSelectType={selectBossType}
          onShowFullPicker={() => {
            setEstimatorDone(true)
            setShowAllTypes(true)
            setPickerPhase('picker')
          }}
          onSkip={() => {
            setEstimatorDone(true)
            setShowAllTypes(true)
            setPickerPhase('picker')
          }}
        />
      ) : null}

      {showTypePicker ? (
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '4px',
            }}
          >
            Type của sếp bạn
          </div>
          <p
            style={{
              margin: '0 0 10px',
              fontSize: '12px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            Không chắc? Cứ bỏ qua — phần dưới vẫn dùng được
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
            {pickerTypes.map((type) => {
              const selected = bossType === type
              const isSuggested = suggestedTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBossType(selected ? null : type)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: selected
                      ? '1px solid rgba(168,230,61,0.45)'
                      : isSuggested
                        ? '1px solid rgba(168,230,61,0.28)'
                        : '1px solid rgba(255,255,255,0.10)',
                    background: selected
                      ? 'rgba(168,230,61,0.12)'
                      : isSuggested
                        ? 'rgba(168,230,61,0.06)'
                        : 'rgba(255,255,255,0.04)',
                    color: selected ? '#A8E63D' : 'rgba(255,255,255,0.65)',
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
              onClick={() => setShowAllTypes(true)}
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
      ) : null}

      {!bossType ? (
        <p
          style={{
            margin: '0 0 24px',
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.38)',
            fontStyle: 'italic',
          }}
        >
          Chọn type sếp để xem gợi ý theo phong cách
        </p>
      ) : null}

      {bossType && card ? (
        <div style={{ marginBottom: '8px' }}>
          <BossInsightCard card={card} />
          {bossDiscContent && discProfile ? (
            <div style={bossLensCardStyle}>
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'rgba(212,184,128,0.85)',
                }}
              >
                <img
                  src="/assets/icons/sep-boss-analysis.png"
                  alt=""
                  style={{
                    width: 18,
                    height: 18,
                    objectFit: 'contain',
                    mixBlendMode: 'screen',
                    verticalAlign: 'middle',
                    marginRight: 4,
                  }}
                />
                Giao tiếp với sếp {bossDiscContent.label} · theo phong cách{' '}
                {DISC_LABELS[discProfile.primary]} của bạn
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                {bossDiscContent.bossLens}
              </p>
              <p
                style={{
                  margin: '8px 0 0',
                  fontSize: '11px',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.38)',
                }}
              >
                Đây là xu hướng chung — mỗi người có thể khác.
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {bossType && study ? <EmployeeCaseStudy study={study} /> : null}

      <CollapsibleSection
        icon="⚡"
        iconImg="/assets/icons/sep-boss-hard.png"
        title="Khi làm việc với sếp khó"
        variant="list"
      >
        {tier3A.map((entry) => (
          <BossKnowledgeEntry key={entry.id} entry={entry} />
        ))}
      </CollapsibleSection>

      <CollapsibleSection
        icon="🛡️"
        iconImg="/assets/icons/sep-self-protect.png"
        title="Tự bảo vệ mình"
        variant="list"
      >
        {tier3B.map((entry) => (
          <BossKnowledgeEntry key={entry.id} entry={entry} />
        ))}
      </CollapsibleSection>
    </section>
  )
}
