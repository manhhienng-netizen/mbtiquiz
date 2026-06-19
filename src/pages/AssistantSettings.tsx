import { useEffect, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import AssistantShell, {
  assistantCardStyle,
  assistantDangerBtn,
  assistantGhostBtn,
} from '../components/AssistantShell'
import { clearUserMemory } from '../lib/assistant-memory'
import { clearPaMemory } from '../db/tncb-db'
import {
  clearChat,
  loadConfig,
  saveConfig,
  type GroupKey,
} from '../lib/assistant-storage'
import { ACTIVE_PROVIDER } from '../lib/llm-client'
import { clearSummaryState } from '../lib/memory-service'

const GROUPS: { key: GroupKey; label: string; emoji: string }[] = [
  { key: 'sincere', label: 'Chân thành', emoji: '🤝' },
  { key: 'maverick', label: 'Người Giời', emoji: '😏' },
]

const pillBase: CSSProperties = {
  padding: '10px 14px',
  borderRadius: '20px',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: 'rgba(255,255,255,0.65)',
  transition: 'all 0.15s ease',
  fontFamily: 'inherit',
}

const pillActive: CSSProperties = {
  background: 'rgba(168,230,61,0.15)',
  border: '1px solid rgba(168,230,61,0.45)',
  color: '#A8E63D',
}

export default function AssistantSettings() {
  const navigate = useNavigate()
  const [group, setGroup] = useState<GroupKey>('sincere')
  const [clearedMsg, setClearedMsg] = useState<string | null>(null)

  useEffect(() => {
    setGroup(loadConfig().group)
  }, [])

  function handleGroupChange(key: GroupKey) {
    setGroup(key)
    saveConfig({ group: key })
  }

  function handleClearChat() {
    const ok = window.confirm(
      'Xóa toàn bộ lịch sử chat trên máy này? Bạn không thể hoàn tác.',
    )
    if (!ok) return
    clearChat()
    setClearedMsg('Đã xóa lịch sử chat.')
    window.setTimeout(() => setClearedMsg(null), 3000)
  }

  function handleClearPaMemory() {
    const ok = window.confirm(
      'Xóa thông tin fact đã chia sẻ với Trợ lý (nghề, sở thích, mục tiêu...)?',
    )
    if (!ok) return
    void clearPaMemory().then(() => {
      setClearedMsg('Đã xóa thông tin đã chia sẻ.')
      window.setTimeout(() => setClearedMsg(null), 3000)
    })
  }

  function handleClearMemory() {
    const ok = window.confirm(
      'Xóa mục tiêu, ghi chú và tóm tắt hội thoại? Chat vẫn giữ tin nhắn cũ cho đến khi bạn xóa riêng.',
    )
    if (!ok) return
    clearUserMemory()
    clearSummaryState()
    setClearedMsg('Đã xóa memory và tóm tắt.')
    window.setTimeout(() => setClearedMsg(null), 3000)
  }

  return (
    <AssistantShell title="Cài đặt trợ lý">
      <section style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '15px',
            fontWeight: 700,
            margin: '0 0 8px',
          }}
        >
          Giọng mặc định
        </h2>
        <p
          style={{
            margin: '0 0 12px',
            fontSize: '13px',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Chat mới (hoặc khi mở lại trang chat) sẽ dùng giọng này.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => handleGroupChange(g.key)}
              style={{
                ...pillBase,
                ...(group === g.key ? pillActive : {}),
              }}
            >
              {g.emoji} {g.label}
            </button>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '15px',
            fontWeight: 700,
            margin: '0 0 12px',
          }}
        >
          Dữ liệu trên máy
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button type="button" onClick={handleClearChat} style={assistantDangerBtn}>
            Xóa lịch sử chat
          </button>
          <button type="button" onClick={handleClearMemory} style={assistantDangerBtn}>
            Xóa memory (mục tiêu + ghi chú + tóm tắt)
          </button>
          <button type="button" onClick={handleClearPaMemory} style={assistantGhostBtn}>
            Xóa thông tin đã chia sẻ với Trợ lý
          </button>
        </div>
        {clearedMsg ? (
          <p
            style={{
              marginTop: '10px',
              fontSize: '13px',
              color: '#A8E63D',
            }}
          >
            {clearedMsg}
          </p>
        ) : null}
      </section>

      {import.meta.env.DEV ? (
        <section style={{ ...assistantCardStyle, marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '13px',
              fontWeight: 700,
              margin: '0 0 6px',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            DEV
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            ACTIVE_PROVIDER: <code>{ACTIVE_PROVIDER}</code> (read-only)
          </p>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => navigate('/assistant/chat')}
        style={assistantGhostBtn}
      >
        Về chat
      </button>
    </AssistantShell>
  )
}
