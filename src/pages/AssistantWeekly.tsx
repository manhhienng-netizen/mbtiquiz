import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageSpinner from '../components/PageSpinner'
import AssistantShell, {
  assistantCardStyle,
  assistantGhostBtn,
  assistantPrimaryBtn,
} from '../components/AssistantShell'
import { getCrisisSupportText } from '../lib/crisis-detect'
import { loadConfig, type GroupKey } from '../lib/assistant-storage'
import { getCurrentCharacter, getLatestMBTI } from '../db/tncb-db'
import {
  generateWeeklyInsight,
  getWeekWindowData,
  loadWeeklyRecords,
  mergeFactsIntoNotes,
  saveWeeklyRecord,
  type WeeklyParsedInsight,
  type WeeklyInsightRecord,
} from '../lib/weekly-insight'

function CrisisHotlineBlock() {
  return (
    <div
      style={{
        ...assistantCardStyle,
        marginTop: '12px',
        border: '1px solid rgba(255,255,255,0.14)',
        fontSize: '13px',
        lineHeight: 1.55,
        color: 'rgba(255,255,255,0.75)',
      }}
    >
      {getCrisisSupportText()}
    </div>
  )
}

function InsightSections({
  themes,
  observation,
  action,
}: {
  themes: string[]
  observation: string
  action: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <section style={assistantCardStyle}>
        <h2 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 700 }}>
          Chủ đề nổi lên
        </h2>
        {themes.length > 0 ? (
          <ul
            style={{
              margin: 0,
              paddingLeft: '18px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.88)',
            }}
          >
            {themes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
            (chưa có)
          </p>
        )}
      </section>

      <section style={assistantCardStyle}>
        <h2 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700 }}>
          Quan sát
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.88)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {observation.trim() || '(chưa có)'}
        </p>
      </section>

      <section style={assistantCardStyle}>
        <h2 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700 }}>
          Việc nhỏ tuần tới
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.88)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {action.trim() || '(chưa có)'}
        </p>
      </section>
    </div>
  )
}

export default function AssistantWeekly() {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState('bạn')
  const [mbtiType, setMbtiType] = useState('')
  const [group, setGroup] = useState<GroupKey>('sincere')
  const [windowData, setWindowData] = useState(() => getWeekWindowData())
  const [pastRecords, setPastRecords] = useState<WeeklyInsightRecord[]>([])
  const [currentInsight, setCurrentInsight] = useState<WeeklyParsedInsight | null>(
    null,
  )
  const [hadCrisisDisplay, setHadCrisisDisplay] = useState(false)
  const [selectedFacts, setSelectedFacts] = useState<Set<number>>(new Set())
  const [notesSavedFlash, setNotesSavedFlash] = useState(false)

  const currentWeekRecord = useMemo(
    () => pastRecords.find((r) => r.weekOf === windowData.weekOf) ?? null,
    [pastRecords, windowData.weekOf],
  )

  const olderWeekRecords = useMemo(
    () => pastRecords.filter((r) => r.weekOf !== windowData.weekOf),
    [pastRecords, windowData.weekOf],
  )

  useEffect(() => {
    async function init() {
      const mbti = await getLatestMBTI()
      if (!mbti?.mbtiType) {
        navigate('/quiz', { replace: true })
        return
      }
      const character = await getCurrentCharacter()
      setMbtiType(mbti.mbtiType)
      setDisplayName(character?.archetypeLabel ?? mbti.archetypeLabel ?? 'bạn')
      setGroup(loadConfig().group)
      setWindowData(getWeekWindowData())
      setPastRecords(loadWeeklyRecords())
      setPageLoading(false)
    }
    void init()
  }, [navigate])

  const handleGenerate = useCallback(async () => {
    setError(null)
    setNotesSavedFlash(false)
    const win = getWeekWindowData()
    setWindowData(win)

    if (!win.enoughForSummary) {
      setCurrentInsight(null)
      return
    }

    setGenerating(true)
    try {
      const parsed = await generateWeeklyInsight(
        displayName,
        mbtiType,
        group,
        win,
      )
      setCurrentInsight(parsed)
      setHadCrisisDisplay(win.hadCrisis)
      setSelectedFacts(new Set())

      const record: WeeklyInsightRecord = {
        weekOf: win.weekOf,
        themes: parsed.themes,
        observation: parsed.observation,
        action: parsed.action,
        ts: Date.now(),
        hadCrisis: win.hadCrisis,
      }
      saveWeeklyRecord(record)
      setPastRecords(loadWeeklyRecords())
    } catch {
      setError('Không tạo được tổng kết — kiểm tra Ollama đang chạy nhé.')
    } finally {
      setGenerating(false)
    }
  }, [displayName, mbtiType, group])

  function toggleFact(index: number) {
    setSelectedFacts((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  function handleSaveFacts() {
    if (!currentInsight?.facts.length) return
    const picked = currentInsight.facts.filter((_, i) => selectedFacts.has(i))
    if (picked.length === 0) return
    mergeFactsIntoNotes(picked)
    setNotesSavedFlash(true)
    window.setTimeout(() => setNotesSavedFlash(false), 2500)
  }

  const showSections =
    currentInsight ??
    (currentWeekRecord
      ? {
          themes: currentWeekRecord.themes,
          observation: currentWeekRecord.observation,
          action: currentWeekRecord.action,
          facts: [],
        }
      : null)

  const showCrisis =
    hadCrisisDisplay ||
    (currentWeekRecord?.hadCrisis && !currentInsight)

  if (pageLoading) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0F',
        }}
      >
        <PageSpinner />
      </div>
    )
  }

  return (
    <AssistantShell title="Nhìn lại tuần">
      <p
        style={{
          margin: '0 0 16px',
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        Tổng kết từ chat 7 ngày qua — gợi ý bước tiếp ngoài đời, không kéo bạn ở lại
        app.
      </p>

      <button
        type="button"
        onClick={() => void handleGenerate()}
        disabled={generating}
        style={{
          ...assistantPrimaryBtn,
          width: '100%',
          marginBottom: '16px',
          opacity: generating ? 0.7 : 1,
          cursor: generating ? 'wait' : 'pointer',
        }}
      >
        {generating ? 'Đang tổng kết...' : 'Tổng kết tuần'}
      </button>

      {!windowData.enoughForSummary && !generating ? (
        <div style={{ ...assistantCardStyle, marginBottom: '16px' }}>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
            Tuần này mình chưa trò chuyện đủ để tổng kết.
          </p>
        </div>
      ) : null}

      {error ? (
        <p style={{ color: 'rgba(255,160,160,0.95)', fontSize: '14px' }}>{error}</p>
      ) : null}

      {showSections ? (
        <>
          <InsightSections
            themes={showSections.themes}
            observation={showSections.observation}
            action={showSections.action}
          />
          {showCrisis ? <CrisisHotlineBlock /> : null}
        </>
      ) : null}

      {currentInsight && currentInsight.facts.length > 0 ? (
        <section style={{ ...assistantCardStyle, marginTop: '16px' }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700 }}>
            Sự thật đáng nhớ (chọn để lưu vào ghi chú)
          </h2>
          <p
            style={{
              margin: '0 0 12px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            Chỉ những dòng bạn tick mới vào ghi chú ở Mục tiêu.
          </p>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {currentInsight.facts.map((fact, index) => (
              <li key={`${index}-${fact.slice(0, 20)}`}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,0.88)',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedFacts.has(index)}
                    onChange={() => toggleFact(index)}
                    style={{ marginTop: '4px', flexShrink: 0 }}
                  />
                  <span>{fact}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleSaveFacts}
            disabled={selectedFacts.size === 0}
            style={{
              ...assistantPrimaryBtn,
              marginTop: '14px',
              opacity: selectedFacts.size === 0 ? 0.5 : 1,
            }}
          >
            Lưu vào ghi chú
          </button>
          {notesSavedFlash ? (
            <p style={{ marginTop: '10px', fontSize: '13px', color: '#A8E63D' }}>
              Đã lưu vào ghi chú — xem tại Mục tiêu.
            </p>
          ) : null}
        </section>
      ) : null}

      {olderWeekRecords.length > 0 ? (
        <section style={{ marginTop: '24px' }}>
          <h2
            style={{
              fontSize: '15px',
              fontWeight: 700,
              margin: '0 0 12px',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Các tuần trước
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {olderWeekRecords.map((r) => (
                <details key={r.weekOf} style={assistantCardStyle}>
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    Tuần từ {r.weekOf}
                  </summary>
                  <div style={{ marginTop: '12px' }}>
                    <InsightSections
                      themes={r.themes}
                      observation={r.observation}
                      action={r.action}
                    />
                    {r.hadCrisis ? <CrisisHotlineBlock /> : null}
                  </div>
                </details>
              ))}
          </div>
        </section>
      ) : null}

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => navigate('/assistant/goals')}
          style={assistantGhostBtn}
        >
          Mục tiêu & ghi chú
        </button>
        <button
          type="button"
          onClick={() => navigate('/assistant/chat')}
          style={assistantGhostBtn}
        >
          Về chat
        </button>
      </div>
    </AssistantShell>
  )
}
