import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AssistantShell, {
  assistantCardStyle,
  assistantGhostBtn,
  assistantInputStyle,
  assistantPrimaryBtn,
} from '../components/AssistantShell'
import {
  getUserMemory,
  parseNotesList,
  saveUserMemory,
  serializeNotesList,
} from '../lib/assistant-memory'

export default function AssistantGoals() {
  const navigate = useNavigate()
  const [goal, setGoal] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [newNote, setNewNote] = useState('')
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    const mem = getUserMemory()
    setGoal(mem.goal)
    setNotes(parseNotesList(mem.notes))
  }, [])

  const isEmpty = !goal.trim() && notes.length === 0

  function handleAddNote() {
    const text = newNote.trim()
    if (!text) return
    setNotes((prev) => [...prev, text])
    setNewNote('')
  }

  function handleRemoveNote(index: number) {
    setNotes((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSave() {
    saveUserMemory({
      goal: goal.trim(),
      notes: serializeNotesList(notes),
    })
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 2000)
  }

  return (
    <AssistantShell title="Mục tiêu của bạn">
      {isEmpty ? (
        <div style={{ ...assistantCardStyle, marginBottom: '16px' }}>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            Bạn chưa ghi mục tiêu hay ghi chú nào. Thêm vài dòng để trợ lý hiểu bạn
            hơn khi trò chuyện — không bắt buộc nhé.
          </p>
        </div>
      ) : null}

      <section style={{ marginBottom: '20px' }}>
        <label
          htmlFor="assistant-goal"
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '8px',
          }}
        >
          Mục tiêu đang tập
        </label>
        <textarea
          id="assistant-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Ví dụ: tập trung hơn khi làm việc, nói chuyện với sếp rõ ràng hơn..."
          rows={4}
          style={{ ...assistantInputStyle, resize: 'vertical', minHeight: '96px' }}
        />
      </section>

      <section style={{ marginBottom: '20px' }}>
        <span
          style={{
            display: 'block',
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '8px',
          }}
        >
          Ghi chú (trợ lý nhớ khi chat)
        </span>

        {notes.length === 0 ? (
          <p
            style={{
              margin: '0 0 12px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Chưa có ghi chú.
          </p>
        ) : (
          <ul
            style={{
              listStyle: 'none',
              margin: '0 0 12px',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {notes.map((note, index) => (
              <li
                key={`${index}-${note.slice(0, 12)}`}
                style={{
                  ...assistantCardStyle,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: '10px 12px',
                }}
              >
                <span
                  style={{
                    flex: 1,
                    fontSize: '14px',
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,0.88)',
                  }}
                >
                  {note}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveNote(index)}
                  aria-label="Xóa ghi chú"
                  style={{
                    ...assistantGhostBtn,
                    padding: '4px 10px',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddNote()
              }
            }}
            placeholder="Thêm ghi chú..."
            style={{ ...assistantInputStyle, flex: 1 }}
          />
          <button
            type="button"
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            style={{
              ...assistantGhostBtn,
              opacity: newNote.trim() ? 1 : 0.5,
            }}
          >
            Thêm
          </button>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button type="button" onClick={handleSave} style={assistantPrimaryBtn}>
          Lưu
        </button>
        <button
          type="button"
          onClick={() => navigate('/assistant/weekly')}
          style={assistantGhostBtn}
        >
          Nhìn lại tuần
        </button>
        <button
          type="button"
          onClick={() => navigate('/assistant/chat')}
          style={assistantGhostBtn}
        >
          Về chat
        </button>
      </div>

      {savedFlash ? (
        <p
          style={{
            marginTop: '12px',
            fontSize: '13px',
            color: '#A8E63D',
            fontWeight: 600,
          }}
        >
          Đã lưu.
        </p>
      ) : null}
    </AssistantShell>
  )
}
