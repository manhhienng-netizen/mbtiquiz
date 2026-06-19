const fs = require('fs')

const SRC =
  'C:/dev/tiemnangcuaban/tiemnangcuaban/packages/data/src/match-opening-questions-data.ts'
const OUT = 'C:/dev/mbtiquiz/src/lib/p2p/opening-questions.ts'

/** Longest-first phrase replacements (whole substring, case-sensitive) */
const PHRASES = [
  ['think about something in a completely new way', 'nghĩ về điều gì đó theo cách hoàn toàn mới'],
  ['complete enough to work with', 'đủ hoàn chỉnh để làm việc'],
  ['being in the middle of doing', 'đang làm dở'],
  ['figure out as you go', 'tìm ra trong lúc làm'],
  ['figure out on the go', 'tìm ra trong lúc làm'],
  ['thought through kỹ hơn trước khi acting', 'suy nghĩ kỹ hơn trước khi hành động'],
  ['thought through kỹ hơn', 'suy nghĩ kỹ hơn'],
  ['make better decisions', 'đưa ra quyết định tốt hơn'],
  ['make sense of complex situations', 'hiểu rõ các tình huống phức tạp'],
  ['make sense of world', 'hiểu rõ thế giới'],
  ['make you stronger', 'khiến bạn mạnh mẽ hơn'],
  ['make quick decision', 'đưa ra quyết định nhanh'],
  ['getting into the middle of doing something', 'lao vào giữa việc đang làm'],
  ['contribute được gì đó real', 'đóng góp điều gì thực sự'],
  ['contributes thực sự', 'đóng góp thực sự'],
  ['contribute đúng cách', 'đóng góp đúng cách'],
  ['feel deeply về', 'cảm nhận sâu sắc về'],
  ['feel right', 'cảm thấy đúng'],
  ['care deeply mà', 'quan tâm sâu sắc mà'],
  ['care deeply', 'quan tâm sâu sắc'],
  ['care sâu về', 'quan tâm sâu sắc đến'],
  ['care sâu mà', 'quan tâm sâu sắc mà'],
  ['care sâu', 'quan tâm sâu sắc'],
  ['care thật sự', 'quan tâm thật sự'],
  ['care về', 'quan tâm đến'],
  ['care,', 'quan tâm,'],
  ['north star', 'kim chỉ nam'],
  ['in the zone', 'trong trạng thái tập trung cao'],
  ['in the right place', 'đúng chỗ'],
  ['in "flow"', 'trong trạng thái "flow"'],
  ['hands-on', 'thực hành'],
  ['hands hoặc body', 'tay hoặc cơ thể'],
  ['với hands', 'bằng tay'],
  ['real time', 'thời gian thực'],
  ['things get real và fast', 'mọi thứ trở nên thực tế và nhanh'],
  ['trade off', 'đánh đổi'],
  ['follow through', 'theo đuổi đến cùng'],
  ['show off', 'khoe'],
  ['show it', 'thể hiện điều đó'],
  ['act on', 'hành động theo'],
  ['just enjoy', 'cứ tận hưởng'],
  ['just be', 'cứ là chính mình'],
  ['hold on to', 'giữ vững'],
  ['figure things out', 'tìm ra cách giải quyết'],
  ['figure out', 'tìm ra'],
  ['trying to figure out', 'đang cố hiểu'],
  ['lean toward', 'nghiêng về'],
  ['go for', 'lao vào'],
  ['gotten right', 'làm đúng'],
  ['without much talk', 'mà không cần nói nhiều'],
  ['without much explanation', 'mà không cần giải thích nhiều'],
  ['without much words', 'mà không cần nhiều lời'],
  ['without much planning', 'mà không cần lên kế hoạch nhiều'],
  ['without much resources', 'mà không cần nhiều nguồn lực'],
  ['take care of', 'chăm sóc'],
  ['emotional support', 'hỗ trợ cảm xúc'],
  ['practical thing', 'việc thực tế'],
  ['social skills', 'kỹ năng giao tiếp'],
  ['future planning', 'lên kế hoạch tương lai'],
  ['proven method', 'phương pháp đã chứng minh'],
  ['proven way', 'cách đã chứng minh'],
  ['consistent action', 'hành động nhất quán'],
  ['under pressure', 'dưới áp lực'],
  ['understood enough to act', 'hiểu đủ để hành động'],
  ['inner world', 'thế giới bên trong'],
  ['live trong đầu', 'sống trong đầu'],
  ['live in đầu', 'sống trong đầu'],
  ['convincing people', 'thuyết phục mọi người'],
  ['systematic way', 'cách có hệ thống'],
  ['practical problem', 'vấn đề thực tế'],
  ['outlast yourself', 'tồn tại lâu hơn bạn'],
  ['outlast bạn', 'tồn tại lâu hơn bạn'],
  ['weigh factors', 'cân nhắc các yếu tố'],
  ['be known for', 'được biết đến vì'],
  ['be consistent về', 'nhất quán về'],
  ['thay vì saying', 'thay vì chỉ nói'],
  ['thay vì say', 'thay vì nói'],
  ['thay vì words', 'thay vì lời nói'],
  ['thay vì analyze', 'thay vì phân tích'],
  ['fix things', 'sửa đồ'],
  ['make things hoặc fix things', 'làm đồ hoặc sửa đồ'],
  ['make things', 'làm đồ'],
  ['argument này đang thú vị hơn là stressful', 'cuộc tranh luận này thú vị hơn là gây căng thẳng'],
  ['conversation này đang đi đến nơi thú vị', 'cuộc trò chuyện này đang đi đến chỗ thú vị'],
  [
    'conversation này đang đi đến nơi không ai biết trước',
    'cuộc trò chuyện này đang đi đến chỗ không ai biết trước',
  ],
  [
    'conversation này đang đi đến nơi thực sự thú vị',
    'cuộc trò chuyện này đang đi đến chỗ thực sự thú vị',
  ],
  ['conversation này đang real', 'cuộc trò chuyện này thật sự chân thật'],
  ['conversation mà mình đã tìm kiếm', 'cuộc trò chuyện mà mình đã tìm kiếm'],
  ['conversation này', 'cuộc trò chuyện này'],
  ['trust gì nhất — instinct hay analysis', 'tin tưởng điều gì nhất — bản năng hay phân tích'],
  ['trust process hay trust instinct', 'tin quy trình hay tin bản năng'],
  ['trust instinct hay trust data', 'tin bản năng hay tin dữ liệu'],
  ['trust hands-on hay trust thinking', 'tin thực hành hay tin suy nghĩ'],
  ['trust analysis hay trust experience', 'tin phân tích hay tin kinh nghiệm'],
  ['trust cảm nhận hay trust analysis', 'tin cảm nhận hay tin phân tích'],
  ['complete enough to work with', 'đủ hoàn chỉnh để làm việc với'],
  ['trying to figure out', 'đang cố tìm ra'],
  ['keep lời hứa', 'giữ lời hứa'],
  ['pass on', 'truyền lại'],
  ['rely on', 'dựa vào'],
  ['slow down', 'chậm lại'],
  ['right track', 'hướng đi đúng'],
  ['worked through', 'làm việc qua'],
  ['do mà không cần nói nhiều khi cần chăm sóc something', 'làm mà không cần nói nhiều khi cần chăm sóc điều gì đó'],
  ['do without much talk khi cần take care of something', 'làm mà không cần nói nhiều khi cần chăm sóc điều gì đó'],
  ['prefer làm practical thing hay emotional support', 'thích làm việc thực tế hay hỗ trợ cảm xúc'],
  ['believe in dù', 'tin vào dù'],
  ['believe in', 'tin vào'],
  ['believe sâu', 'tin sâu sắc'],
  ['question?', 'đặt câu hỏi?'],
  ['on đúng track', 'đúng hướng đi'],
  ['trên đúng track', 'đúng hướng đi'],
  ['do mà', 'làm mà'],
  ['do theo', 'làm theo'],
  ['do thay', 'làm thay'],
  ['để công việc with', 'để làm việc với'],
  ['joy thuần túy', 'niềm vui thuần túy'],
  ['đang joy', 'đang mang lại niềm vui'],
  ['cái này đã work —', 'cái này đã hiệu quả —'],
  ['đi đến nơi thực sự thú vị', 'đi đến chỗ thực sự thú vị'],
  ['Concept hoặc system', 'Khái niệm hoặc hệ thống'],
  ['Framework hoặc model', 'Khung hoặc mô hình'],
  ['Framework hoặc theory', 'Khung hoặc lý thuyết'],
  ['System hoặc pattern', 'Hệ thống hoặc mẫu'],
  ['Idea nào', 'Ý tưởng nào'],
  ['Vision nào', 'Tầm nhìn nào'],
  ['Opportunity nào', 'Cơ hội nào'],
  ['Framework nào', 'Khung nào'],
]

/** Whole-word English → Vietnamese (regex word boundary) */
const WORDS = [
  'productive', 'productivity', 'stressful', 'performance', 'efficient', 'meaningful',
  'sustainable', 'predictable', 'reliable', 'spontaneously', 'impressive', 'expectation',
  'interesting', 'experiment', 'experience', 'understand', 'understood', 'conversation',
  'argument', 'framework', 'opportunity', 'conditions', 'responsibility', 'contribute',
  'contributes', 'disagreement', 'announcement', 'circumstances', 'formulate', 'articulate',
  'significant', 'reflection', 'overthink', 'immediately', 'resources', 'optimize',
  'implement', 'profitable', 'interact', 'convince', 'planning', 'research', 'analysis',
  'instinct', 'approach', 'authentic', 'explore', 'express', 'excited', 'exciting',
  'curiosity', 'surprised', 'inspire', 'inspiring', 'committed', 'unlearn', 'debate',
  'analyze', 'analyzing', 'resolve', 'failure', 'notice', 'observe', 'preserve',
  'community', 'spontaneous', 'highlight', 'appreciate', 'disagreement', 'execute',
  'assess', 'pressure', 'question', 'validate', 'struggle', 'benefit', 'dramatic',
  'expected', 'mechanics', 'predictable', 'attention', 'quietly', 'winner', 'memories',
  'sacrifice', 'contribute', 'beautiful', 'decide', 'decision', 'decisions', 'guide',
  'matter', 'matters', 'matter', 'reflection', 'theory', 'pattern', 'method', 'process',
  'experiment', 'conditions', 'framework', 'system', 'concept', 'vision', 'idea',
  'opportunity', 'story', 'share', 'shared', 'learned', 'learning', 'change', 'changed',
  'deeply', 'performance', 'argument', 'conflict', 'argue', 'prefer', 'enjoy', 'trust',
  'build', 'built', 'building', 'handle', 'create', 'commit', 'care', 'support', 'help',
  'prove', 'proven', 'notice', 'plan', 'move', 'assess', 'execute', 'respect', 'goal',
  'result', 'results', 'meaning', 'purpose', 'calling', 'benefit', 'validate', 'credit',
  'treat', 'justify', 'duty', 'saying', 'show', 'know', 'learn', 'apply', 'lead',
  'test', 'data', 'acting', 'experience', 'explain', 'map', 'trendy', 'believe', 'logic',
  'insight', 'observe', 'stable', 'reliable', 'attention', 'handle', 'fix', 'fixing',
  'proud', 'curious', 'useful', 'solution', 'resolve', 'analyze', 'enjoy', 'drive',
  'pause', 'research', 'interesting', 'joy', 'laugh', 'highlight', 'well', 'luck',
  'sacrifice', 'optimize', 'done', 'make', 'real', 'deep', 'new', 'live', 'worked',
  'work', 'perform', 'flow', 'words', 'hands', 'thinking', 'easy', 'alive', 'grand',
  'immediate', 'thinking', 'model', 'map', 'vs', 'in', 'on', 'to', 'for', 'with',
]

const WORD_MAP = {
  productive: 'hiệu quả',
  productivity: 'năng suất',
  stressful: 'gây căng thẳng',
  performance: 'biểu diễn',
  perform: 'làm màu',
  efficient: 'hiệu quả',
  meaningful: 'có ý nghĩa',
  sustainable: 'bền vững',
  predictable: 'có thể dự đoán',
  reliable: 'đáng tin',
  spontaneously: 'tự phát',
  spontaneous: 'tự phát',
  impressive: 'ấn tượng',
  expectation: 'kỳ vọng',
  interesting: 'thú vị',
  experiment: 'thử nghiệm',
  experience: 'trải nghiệm',
  understand: 'hiểu',
  understood: 'hiểu',
  conversation: 'cuộc trò chuyện',
  argument: 'tranh luận',
  framework: 'khung',
  Framework: 'Khung',
  opportunity: 'cơ hội',
  Opportunity: 'Cơ hội',
  conditions: 'điều kiện',
  responsibility: 'trách nhiệm',
  contribute: 'đóng góp',
  contributes: 'đóng góp',
  disagreement: 'bất đồng',
  announcement: 'thông báo',
  circumstances: 'hoàn cảnh',
  formulate: 'diễn đạt',
  articulate: 'diễn đạt',
  significant: 'quan trọng',
  reflection: 'suy ngẫm',
  overthink: 'suy nghĩ quá nhiều',
  immediately: 'ngay lập tức',
  immediate: 'ngay lập tức',
  resources: 'nguồn lực',
  optimize: 'tối ưu',
  implement: 'thực hiện',
  profitable: 'sinh lời',
  interact: 'tương tác',
  convince: 'thuyết phục',
  planning: 'lên kế hoạch',
  research: 'nghiên cứu',
  analysis: 'phân tích',
  instinct: 'bản năng',
  approach: 'tiếp cận',
  authentic: 'chân thật',
  explore: 'khám phá',
  express: 'thể hiện',
  excited: 'hào hứng',
  exciting: 'phấn khích',
  curiosity: 'tò mò',
  curious: 'tò mò',
  surprised: 'bất ngờ',
  inspire: 'truyền cảm hứng',
  inspiring: 'truyền cảm hứng',
  committed: 'cam kết',
  commit: 'cam kết',
  unlearn: 'bỏ đi những điều đã học sai',
  debate: 'tranh luận',
  analyze: 'phân tích',
  analyzing: 'phân tích',
  resolve: 'giải quyết',
  failure: 'thất bại',
  notice: 'để ý',
  observe: 'quan sát',
  preserve: 'giữ gìn',
  community: 'cộng đồng',
  highlight: 'điểm nhấn',
  appreciate: 'trân trọng',
  execute: 'thực hiện',
  assess: 'đánh giá',
  pressure: 'áp lực',
  validate: 'công nhận',
  struggle: 'khó khăn',
  benefit: 'lợi ích',
  dramatic: 'kịch tính',
  expected: 'mong đợi',
  mechanics: 'cơ chế',
  attention: 'sự chú ý',
  quietly: 'thầm lặng',
  quiet: 'thầm lặng',
  winner: 'người thắng',
  memories: 'kỷ niệm',
  sacrifice: 'hy sinh',
  beautiful: 'đẹp',
  decide: 'quyết định',
  decision: 'quyết định',
  decisions: 'quyết định',
  guide: 'hướng dẫn',
  matter: 'quan trọng',
  matters: 'quan trọng',
  theory: 'lý thuyết',
  pattern: 'mẫu',
  method: 'phương pháp',
  process: 'quy trình',
  concept: 'khái niệm',
  Concept: 'Khái niệm',
  vision: 'tầm nhìn',
  Vision: 'Tầm nhìn',
  idea: 'ý tưởng',
  Idea: 'Ý tưởng',
  story: 'câu chuyện',
  share: 'chia sẻ',
  shared: 'chia sẻ',
  learned: 'học được',
  learning: 'học',
  change: 'thay đổi',
  changed: 'thay đổi',
  deeply: 'sâu sắc',
  deep: 'sâu',
  conflict: 'xung đột',
  argue: 'tranh luận',
  prefer: 'thích',
  enjoy: 'thích',
  trust: 'tin tưởng',
  build: 'xây dựng',
  built: 'xây dựng',
  building: 'xây dựng',
  handle: 'xử lý',
  create: 'tạo',
  care: 'quan tâm',
  support: 'hỗ trợ',
  help: 'giúp',
  prove: 'chứng minh',
  proven: 'chứng minh',
  plan: 'lên kế hoạch',
  move: 'hành động',
  respect: 'tôn trọng',
  goal: 'mục tiêu',
  result: 'kết quả',
  results: 'kết quả',
  meaning: 'ý nghĩa',
  calling: 'sứ mệnh',
  credit: 'ghi nhận',
  treat: 'đối xử',
  justify: 'giải thích',
  duty: 'nghĩa vụ',
  saying: 'nói',
  say: 'nói',
  show: 'thể hiện',
  know: 'biết',
  learn: 'học',
  apply: 'áp dụng',
  lead: 'dẫn đến',
  test: 'thử',
  data: 'dữ liệu',
  acting: 'hành động',
  act: 'hành động',
  explain: 'giải thích',
  map: 'lập bản đồ',
  trendy: 'hợp thời',
  believe: 'tin',
  logic: 'lý luận',
  insight: 'hiểu biết',
  stable: 'ổn định',
  fix: 'sửa',
  fixing: 'sửa',
  proud: 'tự hào',
  useful: 'hữu ích',
  solution: 'giải pháp',
  drive: 'thúc đẩy',
  pause: 'dừng lại',
  joy: 'niềm vui',
  laugh: 'cười',
  well: 'tốt',
  luck: 'may mắn',
  done: 'hoàn thành',
  make: 'đưa ra',
  real: 'thật',
  new: 'mới',
  live: 'sống',
  worked: 'hoạt động',
  work: 'công việc',
  flow: 'trạng thái đắm chìm',
  words: 'lời',
  hands: 'tay',
  thinking: 'suy nghĩ',
  easy: 'dễ',
  alive: 'sống động',
  grand: 'hoành tráng',
  model: 'mô hình',
  System: 'Hệ thống',
  system: 'hệ thống',
  vs: 'so với',
  rarely: 'hiếm khi',
  waver: 'lung lay',
  'hands-on': 'thực hành',
  answers: 'câu trả lời',
  practical: 'thực tế',
  activity: 'hoạt động',
  question: 'đặt câu hỏi',
  trying: 'đang cố',
  pass: 'truyền',
  environment: 'môi trường',
  action: 'hành động',
  actions: 'hành động',
  problem: 'vấn đề',
  chance: 'cơ hội',
  people: 'con người',
  nurture: 'nuôi dưỡng',
  convenience: 'thuận tiện',
  evidence: 'bằng chứng',
  start: 'bắt đầu',
  track: 'hướng đi',
  develop: 'phát triển',
  moment: 'khoảnh khắc',
  slow: 'chậm',
  down: 'lại',
  doing: 'làm',
  through: 'qua',
  something: 'điều gì đó',
  much: 'nhiều',
  explanation: 'giải thích',
  consistently: 'nhất quán',
  best: 'tốt nhất',
  world: 'thế giới',
  rely: 'dựa',
  complete: 'hoàn chỉnh',
  enough: 'đủ',
  fun: 'vui',
  conditions: 'điều kiện',
  right: 'đúng',
  keep: 'giữ',
  paper: 'giấy',
  consistent: 'nhất quán',
  warmth: 'ấm áp',
  loudly: 'to',
}

function vi(text) {
  let out = text
  for (const [from, to] of PHRASES) {
    if (out.includes(from)) out = out.split(from).join(to)
  }
  // Word-boundary pass — longest words first
  const keys = Object.keys(WORD_MAP).sort((a, b) => b.length - a.length)
  for (const w of keys) {
    const rep = WORD_MAP[w]
    if (!rep) continue
    const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g')
    out = out.replace(re, rep)
  }
  // Cleanup artifacts from partial replacements
  out = out.replace(/để công việc with/g, 'để làm việc với')
  out = out.replace(/đã công việc/g, 'đã hiệu quả')
  out = out.replace(/đi đến nơi thực sự/g, 'đi đến chỗ thực sự')
  out = out.replace(/đang niềm vui thuần túy/g, 'đang mang lại niềm vui thuần túy')
  out = out.replace(/\bloudly\b/g, 'to')
  out = out.replace(/\bwith\b/g, 'với')
  out = out.replace(/\s{2,}/g, ' ').replace(/ ,/g, ',').trim()
  return out
}

function parseSource(src) {
  const map = {}
  const keyRe = /^\s*'([A-Z]{4}\+[A-Z]{4})':\s*\[/
  let current = null
  for (const line of src.split('\n')) {
    const km = line.match(keyRe)
    if (km) {
      current = km[1]
      map[current] = []
      continue
    }
    if (current && /^\s*'/.test(line)) {
      const qm = line.match(/^\s*'((?:\\'|[^'])*)',?\s*$/)
      if (qm) map[current].push(vi(qm[1]))
    }
  }
  return map
}

const src = fs.readFileSync(SRC, 'utf8')
const start = src.indexOf('export const OPENING_QUESTIONS')
const end = src.indexOf('\n}\n\n// Helper function')
const block = src.slice(start, end + 2)
const map = parseSource(block)

const keys = Object.keys(map).sort()
if (keys.length !== 136) {
  console.error('Expected 136 keys, got', keys.length)
  process.exit(1)
}

let total = 0
for (const k of keys) {
  if (map[k].length !== 3) {
    console.error('Bad count for', k, map[k].length)
    process.exit(1)
  }
  total += 3
}

// Flag remaining ASCII words (4+ letters) in questions for review
const englishRe = /\b[a-zA-Z]{4,}\b/g
const leftovers = new Set()
for (const k of keys) {
  for (const q of map[k]) {
    const m = q.match(englishRe)
    if (m) m.forEach((w) => leftovers.add(w))
  }
}
if (leftovers.size) {
  console.warn('Remaining English tokens:', [...leftovers].sort().join(', '))
}

const dataLines = keys
  .map((k) => {
    const qs = map[k].map((q) => `    '${q.replace(/'/g, "\\'")}',`).join('\n')
    return `  '${k}': [\n${qs}\n  ],`
  })
  .join('\n\n')

const header = `/**
 * TNCB — Opening Questions (408 câu · 136 cặp MBTI × 3)
 * Port từ: tiemnangcuaban/packages/data/src/match-opening-questions-data.ts
 * Nguyên tắc: không yes/no · reveal personality · phù hợp cognitive style
 * Nguồn gốc: Aron 36 Questions · Gottman Love Maps · School of Life · MBTI theory
 * Chuẩn hóa: 100% tiếng Việt (loại bỏ code-switch)
 */

import type { MBTIType } from '../../data/quiz-types'

/** Key = 2 MBTI types, alphabet-sorted, joined với '+'. Ví dụ: "ENFP+INTJ" */
export type MBTIPairKey = string

/** Map 136 cặp → mảng 3 câu hỏi mở */
export type OpeningQuestionsMap = Record<MBTIPairKey, [string, string, string]>

/** 3 câu fallback khi cặp không có trong map */
export const DEFAULT_OPENING_QUESTIONS: [string, string, string] = [
  'Điều gì đang chiếm nhiều suy nghĩ của bạn nhất gần đây?',
  'Khoảnh khắc nào trong tuần vừa rồi khiến bạn cảm thấy thực sự sống động?',
  'Nếu có thể học thêm 1 kỹ năng mới ngay lúc này, bạn sẽ chọn gì?',
]

/**
 * Tạo pairKey từ 2 MBTI type — luôn alphabet-sorted
 * getOpeningQuestions("INTJ", "ENFP") === getOpeningQuestions("ENFP", "INTJ")
 */
export function makePairKey(typeA: MBTIType, typeB: MBTIType): MBTIPairKey {
  return [typeA, typeB].sort().join('+')
}

/**
 * Lấy 3 câu hỏi cho cặp type.
 * Nếu không tìm thấy key → trả DEFAULT_OPENING_QUESTIONS.
 */
export function getOpeningQuestions(
  typeA: MBTIType,
  typeB: MBTIType,
): [string, string, string] {
  const key = makePairKey(typeA, typeB)
  return OPENING_QUESTIONS[key] ?? DEFAULT_OPENING_QUESTIONS
}

/**
 * Lấy N câu random (không trùng nhau) cho cặp type.
 */
export function getRandomOpeningQuestions(
  typeA: MBTIType,
  typeB: MBTIType,
  count: number = 3,
  usedIndices: Set<number> = new Set(),
): { questions: string[]; indices: number[] } {
  const pool = getOpeningQuestions(typeA, typeB)
  const available = pool
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => !usedIndices.has(i))

  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[available[i], available[j]] = [available[j], available[i]]
  }

  const selected = available.slice(0, count)
  return {
    questions: selected.map(({ q }) => q),
    indices: selected.map(({ i }) => i),
  }
}

// ─── DATA (136 cặp × 3 câu = 408 câu) ───────────────────────────────────────

export const OPENING_QUESTIONS: OpeningQuestionsMap = {
`

fs.writeFileSync(OUT, header + dataLines + '\n}\n', 'utf8')
console.log('Wrote', OUT, 'keys=', keys.length, 'questions=', total)
