import type { ChatMessage } from './assistant-storage'
import { loadChat, type GroupKey } from './assistant-storage'
import {
  getUserMemory,
  parseNotesList,
  saveUserMemory,
  serializeNotesList,
} from './assistant-memory'
import { detectCrisis } from './crisis-detect'
import { getLLM } from './llm-client'
import { buildGroupVoiceBlock } from './system-prompt'

const WEEKLY_KEY = 'tncb_assistant_weekly'
const WEEK_MS = 7 * 24 * 60 * 60 * 1000
const MIN_MESSAGES = 6
/** ~3000 token ước lượng cho user transcript */
const USER_CONTENT_CHAR_CAP = 12_000

export interface WeeklyInsightRecord {
  weekOf: string
  themes: string[]
  observation: string
  action: string
  ts: number
  hadCrisis: boolean
}

export interface WeeklyParsedInsight {
  themes: string[]
  observation: string
  action: string
  facts: string[]
}

export interface WeekWindowData {
  weekOf: string
  messages: ChatMessage[]
  hadCrisis: boolean
  enoughForSummary: boolean
}

const MARKERS = {
  themes: '###CHỦ ĐỀ###',
  observation: '###QUAN SÁT###',
  action: '###VIỆC NHỎ###',
  facts: '###FACTS###',
} as const

export function getWeekOfMonday(date = new Date()): string {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? 6 : day - 1
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d.toISOString().slice(0, 10)
}

function isConversational(msg: ChatMessage): boolean {
  return !msg.isOpening && msg.content.trim().length > 0
}

export function getWeekWindowData(now = Date.now()): WeekWindowData {
  const cutoff = now - WEEK_MS
  const weekOf = getWeekOfMonday(new Date(now))
  const all = loadChat()
  const messages = all.filter((m) => m.ts >= cutoff && isConversational(m))

  let hadCrisis = false
  for (let i = 0; i < all.length; i++) {
    const m = all[i]!
    if (m.ts < cutoff) continue
    if (m.role === 'user' && detectCrisis(m.content)) {
      hadCrisis = true
      break
    }
    if (m.crisisSupport) {
      hadCrisis = true
      break
    }
  }

  return {
    weekOf,
    messages,
    hadCrisis,
    enoughForSummary: messages.length >= MIN_MESSAGES,
  }
}

function formatTranscriptForLlm(messages: ChatMessage[]): string {
  const userFirst = [...messages].sort((a, b) => {
    if (a.role === b.role) return a.ts - b.ts
    return a.role === 'user' ? -1 : 1
  })

  const lines: string[] = []
  let total = 0

  for (const m of userFirst) {
    const line = `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content.trim()}`
    if (total + line.length > USER_CONTENT_CHAR_CAP) break
    lines.push(line)
    total += line.length + 1
  }

  if (lines.length < messages.length) {
    lines.push('(... một số tin cũ hơn trong tuần đã rút gọn ...)')
  }

  return lines.join('\n\n')
}

export function buildWeeklySystemPrompt(
  displayName: string,
  mbtiType: string,
  group: GroupKey,
  hadCrisis: boolean,
): string {
  const crisisBlock = hadCrisis
    ? 'Tuần có lúc rất nặng — KHÔNG nhắc lại chi tiết chuyện đau/tự hại; chỉ thừa nhận nhẹ tuần khó, có thể nhắc nhẹ gọi 115 (cấp cứu) hoặc 113 (công an).'
    : ''

  return [
    `Bạn giúp ${displayName} (${mbtiType}) nhìn lại tuần qua từ các đoạn chat.`,
    'Mục tiêu: giúp HỌ thấy rõ tuần mình + bước tiếp NGOÀI ĐỜI — KHÔNG kéo ở lại app.',
    `Giọng:\n${buildGroupVoiceBlock(group)}`,
    "Ngôi 'bạn'. Honest, KHÔNG nịnh, KHÔNG phán xét.",
    "CẤM 'tiềm năng', 'hành trình', 'bứt phá'; KHÔNG bịa điều user chưa nói;",
    "KHÔNG giục 'quay lại nói chuyện với mình', 'nhắn cho mình', 'mở app'.",
    crisisBlock,
    'Trả về ĐÚNG format, giữ nguyên marker:',
    '###CHỦ ĐỀ###',
    '- (2-3 chủ đề nổi lên, chạm cả cảm xúc, mỗi dòng 1 ý ngắn)',
    '###QUAN SÁT###',
    '(1 quan sát thật, ấm nhưng thẳng, 1-2 câu)',
    '###VIỆC NHỎ###',
    '(1 việc nhỏ cụ thể ngoài đời cho tuần tới)',
    '###FACTS###',
    '- (sự thật BỀN đáng nhớ, CHỈ từ điều user thực sự nói; không có thì để trống)',
  ]
    .filter(Boolean)
    .join('\n')
}

export function parseWeeklyInsight(raw: string): WeeklyParsedInsight {
  const text = raw.trim()
  const empty: WeeklyParsedInsight = {
    themes: [],
    observation: '',
    action: '',
    facts: [],
  }
  if (!text) return empty

  const sliceBetween = (startMarker: string, endMarkers: string[]): string => {
    const start = text.indexOf(startMarker)
    if (start < 0) return ''
    let end = text.length
    for (const em of endMarkers) {
      const idx = text.indexOf(em, start + startMarker.length)
      if (idx >= 0 && idx < end) end = idx
    }
    return text.slice(start + startMarker.length, end).trim()
  }

  const themesRaw = sliceBetween(MARKERS.themes, [
    MARKERS.observation,
    MARKERS.action,
    MARKERS.facts,
  ])
  const observation = sliceBetween(MARKERS.observation, [MARKERS.action, MARKERS.facts])
  const action = sliceBetween(MARKERS.action, [MARKERS.facts])
  const factsRaw = sliceBetween(MARKERS.facts, [])

  const themes = themesRaw
    .split('\n')
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)

  const facts = factsRaw
    .split('\n')
    .map((line) => line.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean)

  return {
    themes,
    observation,
    action,
    facts,
  }
}

export async function generateWeeklyInsight(
  displayName: string,
  mbtiType: string,
  group: GroupKey,
  window: WeekWindowData,
): Promise<WeeklyParsedInsight> {
  const system = buildWeeklySystemPrompt(
    displayName,
    mbtiType,
    group,
    window.hadCrisis,
  )
  const userContent = [
    'Các tin nhắn trong 7 ngày qua:',
    formatTranscriptForLlm(window.messages),
  ].join('\n\n')

  const raw = await getLLM().chat(
    [
      { role: 'system', content: system },
      { role: 'user', content: userContent },
    ],
    { temperature: 0.6, maxTokens: 700 },
  )

  return parseWeeklyInsight(raw)
}

export function loadWeeklyRecords(): WeeklyInsightRecord[] {
  try {
    const raw = localStorage.getItem(WEEKLY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as WeeklyInsightRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveWeeklyRecord(record: WeeklyInsightRecord): void {
  const rest = loadWeeklyRecords().filter((r) => r.weekOf !== record.weekOf)
  rest.unshift(record)
  localStorage.setItem(WEEKLY_KEY, JSON.stringify(rest))
}

export function mergeFactsIntoNotes(selectedFacts: string[]): string[] {
  const mem = getUserMemory()
  const existing = parseNotesList(mem.notes)
  const lower = new Set(existing.map((n) => n.toLowerCase()))

  for (const fact of selectedFacts) {
    const t = fact.trim()
    if (!t || lower.has(t.toLowerCase())) continue
    existing.push(t)
    lower.add(t.toLowerCase())
  }

  const capped = existing.slice(-10)
  saveUserMemory({
    ...mem,
    notes: serializeNotesList(capped),
  })
  return capped
}
