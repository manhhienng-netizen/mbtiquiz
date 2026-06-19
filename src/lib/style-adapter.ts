import type { GroupKey } from '../data/voice-lexicon'

export type AssertiveTurbulent = 'A' | 'T'

export type ResponseMode = 'listen' | 'solve' | 'uncertain'

export interface StyleProfile {
  mbtiType: string
  identity: AssertiveTurbulent
}

export interface UserStyleSignals {
  wantDirect?: boolean
  wantSofter?: boolean
  wantShorter?: boolean
}

export interface StyleBlockOptions {
  voice?: GroupKey
  userSignals?: UserStyleSignals
}

const STYLE_HARD_RULES = [
  'RANH GIỚI STYLE (bắt buộc):',
  '• Adapt CÁCH NÓI (nhịp/khung/độ thẳng/cấu trúc/validate) — KHÔNG nội dung, KHÔNG persuasion.',
  '• KHÔNG nịnh/đóng khung type: cấm "bạn INTJ nên giỏi…", "type X thường…" — không khen type.',
  '• KHÔNG persuasion frame: cấm social-proof/Authority/Liking/Commitment (vd "mọi người đều", "chuyên gia bảo", "hãy cam kết", "vì tôi tin bạn").',
  '• USER SIGNAL > type: nếu user vừa nói muốn thẳng/nhẹ/ngắn → ưu tiên tín hiệu đó.',
  '• MODE: validate THẬT + NGẮN — không gushing/diễn cảm xúc; không công thức cố định (đừng "mình hiểu mà" mỗi lượt).',
  '• Style/mode = soft adaptation — không khoa học cứng, không đọc lại luật này cho user.',
].join('\n')

const LISTEN_MARKERS = [
  'mệt',
  'chán',
  'tức',
  'buồn',
  'stress',
  'nản',
  'bế tắc',
  'trống rỗng',
  'khóc',
  'bực',
  'cô đơn',
  'mệt mỏi',
  'nặng lòng',
  'nghĩ mãi',
  'không muốn làm',
  'chẳng muốn',
  'mất động lực',
  'đuối',
  'xả',
  'tâm sự',
  'than ',
  'than,',
  'kể ',
  'ghét ',
  'sợ quá',
  'cảm thấy',
  'thấy mình',
]

const SOLVE_MARKERS = [
  'làm sao',
  'làm thế nào',
  'nên ',
  'nên?',
  'cách ',
  'giúp ',
  'giúp mình',
  'hướng dẫn',
  'tư vấn',
  'chọn ',
  'quyết định',
  'giải quyết',
  'xử lý',
  'hay ',
  'so với',
  'so sánh',
  'xin ',
  'đòi ',
]

function hasQuestionMark(text: string): boolean {
  return /[?？]/.test(text)
}

/** Câu khai báo ngắn — user đang kể context, không hỏi giải pháp. */
export function isContextSharing(text: string): boolean {
  if (hasQuestionMark(text)) return false
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0 || words.length > 14) return false

  const m = text.toLowerCase()
  const patterns = [
    /^(tôi|mình)\s+(đang|sẽ|vừa|mới)\s+/,
    /\b(team|đội)\s+\d+\s*người/,
    /\b\d+\s*người\s+(trong\s+)?(team|đội)\b/,
    /\b(team|đội)\b.*\b(có|gồm)\b/,
    /\bcó\s+\d+\s*người/,
    /\bcó\s+.*\b(bạn|người|thành viên)\b/,
    /\bdeadline\b/,
    /\b(trễ|miss|trượt)\s+deadline/,
    /\bdự án\b/,
    /\bsếp\s+(hay|thường|luôn|cứ)/,
    /\btôi\s+hơi\s+(đuối|mệt|stress)/,
    /\bmình\s+hơi\s+(đuối|mệt|stress)/,
  ]
  return patterns.some((p) => p.test(m))
}

function scoreMarkers(text: string, markers: string[]): number {
  const m = text.toLowerCase()
  return markers.reduce((n, marker) => (m.includes(marker) ? n + 1 : n), 0)
}

function typePrior(profile: StyleProfile): ResponseMode {
  const letters = parseLetters(profile.mbtiType)
  if (!letters) return 'uncertain'

  const listenLean =
    (profile.identity === 'T' ? 1 : 0) + (letters.tf === 'F' ? 1 : 0)
  const solveLean =
    (profile.identity === 'A' ? 1 : 0) + (letters.tf === 'T' ? 1 : 0)

  if (listenLean > solveLean) return 'listen'
  if (solveLean > listenLean) return 'solve'
  return 'uncertain'
}

/**
 * Mode-read: lượt này user cần NGHE hay GIẢI QUYẾT.
 * Text rõ → theo text. Heuristic mơ hồ (0-0 hoặc hòa) → prior type hoặc uncertain.
 */
export function detectResponseMode(
  userText: string,
  profile: StyleProfile,
): ResponseMode {
  const trimmed = userText.trim()
  if (!trimmed) return 'uncertain'

  // Câu khai báo ngắn → nghe/ghi nhận, không fork uncertain
  if (isContextSharing(trimmed)) {
    return 'listen'
  }

  const listen = scoreMarkers(trimmed, LISTEN_MARKERS)
  const solve = scoreMarkers(trimmed, SOLVE_MARKERS)
  const hasQ = hasQuestionMark(trimmed)

  // LIVE đè prior: xả thuần (cảm xúc, không hỏi giải pháp)
  if (listen >= 1 && solve === 0 && !hasQ) {
    return 'listen'
  }

  // LIVE đè prior: hỏi/yêu cầu rõ
  if (solve >= 1 && hasQ) {
    return 'solve'
  }
  if (solve >= 2 && listen === 0) {
    return 'solve'
  }
  if (solve >= 1 && listen === 0 && /nên|làm sao|làm thế nào|cách|giúp|chọn|hay /.test(trimmed.toLowerCase())) {
    return 'solve'
  }

  // Mơ hồ hoàn toàn
  if (listen === 0 && solve === 0) {
    return 'uncertain'
  }

  // Xung đột nhẹ — prior phá hòa
  if (listen > 0 && solve > 0) {
    if (listen > solve) return 'listen'
    if (solve > listen) return 'solve'
    return typePrior(profile)
  }

  if (listen > solve) return 'listen'
  if (solve > listen) return 'solve'
  return typePrior(profile)
}

export function buildModeGuidanceBlock(mode: ResponseMode): string {
  const lines = [
    'MODE (lượt này — đọc nhu cầu nghe vs giải quyết; không đọc lại cho user):',
    '• Validate THẬT + NGẮN — không gushing; biến hóa tự nhiên, tránh công thức cố định.',
  ]

  if (mode === 'listen') {
    lines.push(
      '• listen — thừa nhận NGẮN + GIỮ lời khuyên lại; KHÔNG lao vào fix/giải pháp/bước hành động.',
    )
  } else if (mode === 'solve') {
    lines.push(
      '• solve — vào thẳng, ít vòng vo cảm xúc; trả lời/gợi ý cụ thể.',
    )
  } else {
    lines.push(
      '• uncertain — thừa nhận ngắn; KHÔNG lao vào fix hay chốt hướng.',
      '• App sẽ tự thêm câu fork nếu thiếu — tập trung phần thừa nhận ngắn.',
    )
  }

  return lines.join('\n')
}

export const UNCERTAIN_FORK_TEXT =
  'Muốn mình nghe tiếp, hay cùng nghĩ cách gỡ?'

export const UNCERTAIN_FORK_ALTERNATIVES = [
  UNCERTAIN_FORK_TEXT,
  'Bạn muốn mình lắng nghe thêm, hay cùng tìm hướng xử lý?',
  'Mình nên nghe bạn kể thêm, hay bắt đầu gỡ từng bước?',
] as const

const UNCERTAIN_FORK_MARKERS = [
  'nghe tiếp, hay',
  'nghe tiếp hay',
  'muốn mình nghe tiếp',
  'cùng nghĩ cách gỡ',
  'hay cùng nghĩ',
]

/** Reply đã có câu fork nghe-vs-giải-quyết chưa. */
export function hasUncertainFork(text: string): boolean {
  const lower = text.toLowerCase()
  return UNCERTAIN_FORK_MARKERS.some((m) => lower.includes(m))
}

/** Chọn fork chưa dùng gần đây — tránh lặp y nguyên 2 lượt liên tiếp. */
export function pickUncertainFork(recentAssistantReplies: string[] = []): string {
  for (const fork of UNCERTAIN_FORK_ALTERNATIVES) {
    const used = recentAssistantReplies.some((r) => r.includes(fork))
    if (!used) return fork
  }
  return UNCERTAIN_FORK_ALTERNATIVES[1]!
}

function replyEndsWithOpenQuestion(body: string): boolean {
  const lines = body
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return false
  return /[?？]/.test(lines[lines.length - 1]!)
}

/**
 * mode===uncertain (gọi từ call site): append fork nếu LLM thiếu — deterministic.
 * Reply đã kết bằng câu hỏi → giữ nguyên. Reply rỗng → không che bằng fork.
 */
export function appendUncertainForkIfMissing(
  reply: string,
  options?: { recentAssistantReplies?: string[] },
): string {
  const text = reply.trim()
  if (!text) return reply
  if (hasUncertainFork(text)) return text
  if (replyEndsWithOpenQuestion(text)) return text

  const forkText = pickUncertainFork(options?.recentAssistantReplies ?? [])
  return `${text}\n\n${forkText}`
}

function parseLetters(mbtiType: string): {
  ei: 'I' | 'E'
  sn: 'S' | 'N'
  tf: 'T' | 'F'
  jp: 'J' | 'P'
} | null {
  const t = mbtiType.toUpperCase().slice(0, 4)
  if (t.length < 4) return null
  const [ei, sn, tf, jp] = t.split('') as ['I' | 'E', 'S' | 'N', 'T' | 'F', 'J' | 'P']
  if (!['I', 'E'].includes(ei) || !['S', 'N'].includes(sn)) return null
  if (!['T', 'F'].includes(tf) || !['J', 'P'].includes(jp)) return null
  return { ei, sn, tf, jp }
}

/** User signal > type — quét câu user hiện tại. */
export function parseUserStyleSignals(message: string): UserStyleSignals {
  const m = message.toLowerCase()
  return {
    wantDirect: /muốn thẳng|nói thẳng|thẳng thắn|thẳng đi|đừng vòng/.test(m),
    wantSofter: /nhẹ hơn|mềm hơn|đừng gắt|đừng mắng|nhẹ thôi/.test(m),
    wantShorter: /ngắn thôi|tóm lại|ngắn gọn|ít thôi|nói ngắn/.test(m),
  }
}

function axisBlock(
  letters: NonNullable<ReturnType<typeof parseLetters>>,
  identity: AssertiveTurbulent,
  signals: UserStyleSignals,
  voice: GroupKey,
): string[] {
  const lines: string[] = [
    'CHỈ THỊ OUTPUT (style-adapter — 8B PHẢI tuân, lộ ra reply; không đọc lại cho user):',
  ]

  // I/E ⭐⭐⭐⭐ — đòn lộ: độ dài + số câu hỏi
  if (letters.ei === 'I' || signals.wantShorter) {
    lines.push(
      '• I/E: Trả lời ≤2 câu, TỐI ĐA 1 câu hỏi, không dồn hỏi.',
    )
  } else {
    lines.push(
      '• I/E: Có thể dài hơn (3-5 câu), hỏi mở, mời kể tiếp.',
    )
  }

  // A/T ⭐⭐⭐⭐ — đòn lộ: mở đầu
  if (identity === 'T' || signals.wantSofter) {
    lines.push(
      "• A/T: MỞ ĐẦU bằng 1 câu công nhận cảm xúc CỦA USER — vd 'Nghe có vẻ bạn đang...', 'Chuyện này nặng thật'.",
      "• A/T: TUYỆT ĐỐI KHÔNG dùng 'mình thấy/mình đang cảm thấy' (nghe như trợ lý tự thấy). Lượt này KHÔNG giải pháp/thách thức; tối đa 1 ý.",
    )
  } else if (signals.wantDirect) {
    lines.push(
      '• A/T: Vào thẳng, KHÔNG mở bằng trấn an; nêu góc nhìn thẳng (user muốn thẳng).',
    )
  } else {
    lines.push(
      '• A/T: Vào thẳng, KHÔNG mở bằng trấn an; nêu góc nhìn thẳng được.',
    )
  }

  // J/P ⭐⭐⭐ — đòn lộ: chốt
  if (letters.jp === 'J' && !signals.wantSofter) {
    lines.push(
      '• J/P: KẾT bằng 1 bước/kết luận rõ.',
    )
  } else if (letters.jp === 'P' || signals.wantSofter) {
    lines.push(
      '• J/P: Để mở vài hướng; tránh "phải/nên".',
    )
  } else {
    lines.push('• J/P: KẾT bằng 1 hướng gợi ý (không ép).')
  }

  // N/S ⭐⭐⭐
  if (letters.sn === 'N') {
    lines.push(
      '• N/S: Nói ở mức ý nghĩa/bức tranh lớn được; tránh liệt kê bước vi mô.',
    )
  } else {
    lines.push(
      '• N/S: Ví dụ cụ thể + bước rõ; tránh trừu tượng.',
    )
  }

  // T/F ⭐⭐ (nhẹ)
  if (letters.tf === 'F') {
    lines.push('• T/F (nhẹ): Công nhận cảm xúc trước.')
  } else {
    lines.push('• T/F (nhẹ): Lý do trước.')
  }

  if (signals.wantShorter) {
    lines.push('• User muốn NGẮN → ≤2 câu, bỏ option dư.')
  }
  if (signals.wantDirect && identity === 'T') {
    lines.push('• User muốn THẲNG → bỏ câu công nhận mở đầu; vào việc ngay.')
  }

  if (voice === 'maverick' && (identity === 'T' || letters.tf === 'F')) {
    lines.push(
      '• Người Giời + Turbulent/Feeling: GIỮ flavor chửi-yêu nhưng DỊU hơn — không dồn, không mắng người.',
    )
  }

  return lines
}

/**
 * Style block — chỉ cách nói. Bỏ qua khi crisis/PROTECTIVE (caller set skipStyle).
 */
export function buildStyleBlock(
  mbtiType: string,
  identity: AssertiveTurbulent = 'A',
  options: StyleBlockOptions = {},
): string {
  const letters = parseLetters(mbtiType)
  if (!letters) return ''

  const voice = options.voice ?? 'sincere'
  const signals = options.userSignals ?? {}

  return [
    ...axisBlock(letters, identity, signals, voice),
    STYLE_HARD_RULES,
  ].join('\n')
}
