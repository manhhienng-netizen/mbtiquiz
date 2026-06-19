import { useEffect, useState } from 'react'
import {
  FREE_CASE_LIMIT,
  ROLEPLAY_COUNT_KEY,
  ROLEPLAY_SEEN_KEY,
  getConsequence,
  getRandomCases,
  getTypeFeedback,
  type CaseRole,
  type RolePlayCase,
} from '../data/roleplay-case-studies'
import { WORK_LEVEL_LABELS, type WorkLevel } from '../db/tncb-db'

type Phase = 'IDLE' | 'READING' | 'CHOOSING' | 'RESULT'

export interface RolePlayGameProps {
  mbtiType: string
  occupation: string
  level: WorkLevel
  role: CaseRole
  onGate: () => void
}

const cardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(168,230,61,0.2)',
  borderRadius: 12,
  padding: '16px',
  marginBottom: 12,
} as const

const labelStyle = {
  color: '#A8E63D',
  fontSize: 13,
  fontWeight: 700,
  margin: '0 0 8px',
} as const

const btnPrimary = {
  width: '100%',
  padding: '14px',
  marginTop: 8,
  background: 'rgba(168,230,61,0.15)',
  border: '1px solid rgba(168,230,61,0.4)',
  borderRadius: 14,
  color: '#A8E63D',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  fontFamily: 'inherit',
} as const

function readPlayedCount(): number {
  return parseInt(localStorage.getItem(ROLEPLAY_COUNT_KEY) ?? '0', 10) || 0
}

function readSeenIds(): string[] {
  try {
    const raw = localStorage.getItem(ROLEPLAY_SEEN_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export default function RolePlayGame({
  mbtiType,
  occupation,
  level,
  role,
  onGate,
}: RolePlayGameProps) {
  const [phase, setPhase] = useState<Phase>('IDLE')
  const [cases, setCases] = useState<RolePlayCase[]>([])
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | null>(null)
  const [playedCount, setPlayedCount] = useState(readPlayedCount)
  const [seen, setSeen] = useState<string[]>(readSeenIds)

  useEffect(() => {
    if (readPlayedCount() >= FREE_CASE_LIMIT) {
      onGate()
    }
  }, [onGate])

  const currentCase = cases[currentCaseIndex]

  const handleStart = () => {
    const count = readPlayedCount()
    const seenIds = readSeenIds()
    if (count >= FREE_CASE_LIMIT) {
      onGate()
      return
    }
    const pool = getRandomCases(role, FREE_CASE_LIMIT - count, seenIds)
    if (pool.length === 0) {
      onGate()
      return
    }
    setPlayedCount(count)
    setSeen(seenIds)
    setCases(pool)
    setCurrentCaseIndex(0)
    setSelectedChoice(null)
    setPhase('READING')
  }

  const handleChoice = (choiceId: 'A' | 'B' | 'C') => {
    setSelectedChoice(choiceId)
    setPhase('RESULT')
  }

  const handleNext = () => {
    if (!currentCase) return

    const newCount = playedCount + 1
    localStorage.setItem(ROLEPLAY_COUNT_KEY, String(newCount))
    const newSeen = [...seen, currentCase.id]
    localStorage.setItem(ROLEPLAY_SEEN_KEY, JSON.stringify(newSeen))
    setPlayedCount(newCount)
    setSeen(newSeen)

    if (newCount >= FREE_CASE_LIMIT) {
      onGate()
      return
    }

    const remaining = cases.filter((c) => !newSeen.includes(c.id))
    if (remaining.length > 0) {
      const nextIndex = cases.findIndex(
        (c, i) => i > currentCaseIndex && !newSeen.includes(c.id)
      )
      setCurrentCaseIndex(nextIndex >= 0 ? nextIndex : cases.indexOf(remaining[0]!))
      setPhase('READING')
      setSelectedChoice(null)
    } else {
      onGate()
    }
  }

  const roleLabel = role === 'NV' ? 'Nhân viên' : 'Quản lý'

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 20,
          background: 'rgba(168,230,61,0.1)',
          border: '1px solid rgba(168,230,61,0.3)',
          color: '#A8E63D',
          fontSize: 12,
          marginBottom: 16,
        }}
      >
        🎭 Đang role play
      </div>

      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 16px',
        }}
      >
        {occupation} · {WORK_LEVEL_LABELS[level]} · {roleLabel}
      </p>

      {phase === 'IDLE' && (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            {playedCount > 0
              ? `Bạn đã chơi ${playedCount}/${FREE_CASE_LIMIT} tình huống. Tiếp tục luyện tập?`
              : '5 tình huống thực tế — chọn cách xử lý và xem hậu quả.'}
          </p>
          <button type="button" onClick={handleStart} style={btnPrimary}>
            Bắt đầu →
          </button>
        </div>
      )}

      {phase === 'READING' && currentCase && (
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              margin: '0 0 12px',
              color: '#fff',
            }}
          >
            {currentCase.title}
          </h2>
          <p
            style={{
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: 8,
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {currentCase.hook}
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              marginBottom: 20,
            }}
          >
            {currentCase.setup}
          </p>
          <button type="button" onClick={() => setPhase('CHOOSING')} style={btnPrimary}>
            Bạn sẽ làm gì? →
          </button>
        </div>
      )}

      {phase === 'CHOOSING' && currentCase && (
        <div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 16,
            }}
          >
            Chọn cách xử lý:
          </p>
          {currentCase.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => handleChoice(choice.id)}
              style={{
                width: '100%',
                padding: '14px 16px',
                marginBottom: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(168,230,61,0.2)',
                borderRadius: 12,
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ color: '#A8E63D', fontWeight: 700, marginRight: 8 }}>
                {choice.id}.
              </span>
              <span style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                {choice.action}
              </span>
            </button>
          ))}
        </div>
      )}

      {phase === 'RESULT' && currentCase && selectedChoice && (
        <div>
          {(() => {
            const consequence = getConsequence(currentCase, selectedChoice)
            const feedback = getTypeFeedback(currentCase, mbtiType)
            return (
              <>
                {consequence && (
                  <div style={cardStyle}>
                    <p style={labelStyle}>💥 Ngay lúc đó</p>
                    <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
                      {consequence.immediate}
                    </p>
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        marginTop: 8,
                        marginBottom: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      ⏳ Về sau: {consequence.later}
                    </p>
                  </div>
                )}

                {feedback && (
                  <div style={cardStyle}>
                    <p style={labelStyle}>🔍 Góc nhìn theo tính cách bạn</p>
                    <p style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: 0 }}>
                      {feedback.text}
                    </p>
                  </div>
                )}

                <div
                  style={{
                    borderLeft: '2px solid #A8E63D',
                    paddingLeft: 16,
                    marginTop: 16,
                    color: 'rgba(255,255,255,0.6)',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                  }}
                >
                  {currentCase.mirrorMoment}
                </div>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 13,
                    textAlign: 'center',
                    marginTop: 16,
                  }}
                >
                  Tình huống {playedCount + 1} / {FREE_CASE_LIMIT}
                </p>
                <button type="button" onClick={handleNext} style={btnPrimary}>
                  {playedCount + 1 >= FREE_CASE_LIMIT
                    ? 'Xem kết quả →'
                    : 'Tình huống tiếp →'}
                </button>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
