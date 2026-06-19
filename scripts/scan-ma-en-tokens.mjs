import fs from 'fs'
import path from 'path'

const root = path.resolve('.')

const files = [
  'src/data/match/spouse-truth-statements.ts',
  'src/data/match/spouse-roleplay-a.ts',
  'src/data/match/spouse-roleplay-b.ts',
  'src/data/match/parent-truth-statements.ts',
  'src/data/match/parent-roleplay-a.ts',
  'src/data/match/parent-roleplay-b.ts',
  'src/data/match/parent-static-content.ts',
  'src/data/match/child-static-content.ts',
  'src/data/match/child/child-young-truth-statements.ts',
  'src/data/match/child/child-young-roleplay-a.ts',
  'src/data/match/child/child-young-roleplay-b.ts',
  'src/data/match/child/child-teen-truth-statements.ts',
  'src/data/match/child/child-teen-roleplay-a.ts',
  'src/data/match/child/child-teen-roleplay-b.ts',
  'src/data/match/child/child-teen-safety.ts',
  'src/data/match/child/child-adult-truth-statements.ts',
  'src/data/match/child/child-adult-roleplay-a.ts',
  'src/data/match/child/child-adult-roleplay-b.ts',
  'src/lib/match/build-match-system-prompt.ts',
  'src/pages/match/SpouseInsight.tsx',
  'src/pages/match/ParentInsight.tsx',
  'src/pages/match/ChildInsight.tsx',
]

for (const f of fs.readdirSync(path.join(root, 'src/lib/match'))) {
  if (f.startsWith('match-pair-content')) {
    files.push(`src/lib/match/${f}`)
  }
}

const EN_WORDS = new Set(
  'and the with for from that this your you they their them when what where which while will would could should have has been being are was were not but can may might must need want like just also very more most some such than then into over after before about between through during without within against among because though although however therefore instead rather maybe perhaps often always never sometimes usually really actually probably certainly definitely absolutely completely totally especially particularly generally specifically basically essentially finally already still even only both each every other another same different new old good bad best worst better worse great small large long short high low first last next back down out off away here there now today type role coach check mindset growth phase feedback stress burnout team work boss peer fire cut skip submit okay yes no self love life feel think know make take give come go see say tell ask use find help try start stop keep let put set run move play turn show call hold bring leave mean become happen seem look hear read write speak talk listen understand remember forget believe hope wish fear worry care trust respect support share open close change learn grow build break fix solve deal handle manage control avoid accept reject deny agree disagree argue fight win lose fail succeed choose decide plan expect imagine create design develop improve reduce increase add remove include exclude allow prevent protect attack defend risk safe danger problem issue solution answer question reason result effect cause impact influence relationship connection distance conflict peace happy sad angry calm quiet loud hard easy simple complex clear confuse true false real fake right wrong fair unfair normal strange weird special common rare important necessary optional possible impossible likely unlikely enough too much many few little all none any everyone someone anyone nobody something anything nothing everything place time way thing person people child parent family friend partner spouse husband wife mother father son daughter teen adult young school home house room phone message text email social media online offline app chat match insight mirror moment choice option label button screen page step level layer case pool static dynamic random default unknown better same'.split(
    ' ',
  ),
)

const MBTI = /^[EI][SN][TF][JP]$/i
const SKIP_LITERAL =
  /^(RP_|c[123]|eq|peq|cyq|ctq|caq|better|same|new|young|teen|adult|spouse|parent|unknown|heavy|setup|chose|mirror|hook|insight|checkin|estimator|select|roleplay|safety|select-lua|roleplay-select|roleplay-a|roleplay-b|TANTRUM|SHY|BIGFEELINGS|DISTANCE|PRESSURE|CONFLICT|CHOICES|ADULTHOOD|SILENCE|MONEY|PARENTING|OTHER|UNHEARD|OVERWORRY|ST|SF|NF|NT|buong|nhutnhat|haykhoc|hieudong|likhongnghe|khepkin|apluchoc|noiloan|khaclua|xacach|batdong|itvenha|pressure|unheard|overworry|distance)$/i

const VN_LOAN_OK = new Set([
  'team',
  'chat',
  'match',
  'app',
  'online',
  'offline',
  'email',
  'stress',
  'feedback',
  'type',
  'check',
  'teen',
  'coach',
])

function extractStrings(content) {
  const strings = []
  const patterns = [
    /'((?:\\'|[^'])*)'/g,
    /"((?:\\"|[^"])*)"/g,
    /`((?:\\`|[^`])*)`/g,
  ]
  for (const re of patterns) {
    re.lastIndex = 0
    let m
    while ((m = re.exec(content))) {
      strings.push({ text: m[1], index: m.index })
    }
  }
  return strings
}

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length
}

function isLikelyEnglishToken(w) {
  const lower = w.toLowerCase()
  if (MBTI.test(w)) return false
  if (SKIP_LITERAL.test(w)) return false
  if (w.length < 3) return false
  if (/^\d+$/.test(w)) return false

  if (EN_WORDS.has(lower)) return true

  // Capitalized English-looking word inside Vietnamese sentence
  if (/^[A-Z][a-z]{2,}$/.test(w) && !VN_LOAN_OK.has(lower)) return true

  // all-lowercase English word 4+ chars not in Vietnamese context
  if (/^[a-z]{4,}$/.test(w) && EN_WORDS.has(lower)) return true

  return false
}

function findEnglishInString(str) {
  const words = str.match(/[A-Za-z][A-Za-z'-]{2,}/g) || []
  return [...new Set(words.filter(isLikelyEnglishToken))]
}

function shouldSkipString(str) {
  if (!str || str.length < 3) return true
  if (str.includes('@/') || str.includes('../')) return true
  if (/^RP_/.test(str)) return true
  if (/^[A-Z]{2,}\+[A-Z]{2,}$/.test(str)) return true
  if (/^(c1|c2|c3)$/.test(str)) return true
  if (/^#[0-9A-Fa-f]{3,8}$/.test(str)) return true
  if (/^\/match\//.test(str)) return true
  if (/^text-(white|sm|xs|lg|xl|2xl)/.test(str)) return true
  if (/^(min-h-screen|px-4|py-6|max-w-md|mx-auto|space-y|flex|grid|rounded|opacity|font-|mb-|mt-|p-|w-full|items-|gap-|border|hover:|transition)/.test(str)) return true
  return false
}

const summary = {}

for (const file of files) {
  const full = path.join(root, file)
  if (!fs.existsSync(full)) {
    summary[file] = { status: 'NOT FOUND', hits: [] }
    continue
  }

  let content = fs.readFileSync(full, 'utf8')
  const original = content

  if (file.includes('build-match-system-prompt')) {
    // Keep only lines that look user-facing exports, drop SYSTEM prompt blocks
    const lines = content.split('\n')
    content = lines
      .filter((l) => !/SYSTEM_PROMPT|system prompt|Bạn là trợ lý/i.test(l))
      .join('\n')
  }

  if (file.includes('match-pair-content')) {
    content = content
      .split('\n')
      .filter((l) => /dongLuc:|vungMaSat:/.test(l))
      .join('\n')
  }

  const strings = extractStrings(content)
  const fileHits = []

  for (const s of strings) {
    if (shouldSkipString(s.text)) continue
    const hits = findEnglishInString(s.text)
    if (!hits.length) continue
    const line = lineOf(original, s.index)
    const preview =
      s.text.length > 90 ? `${s.text.slice(0, 90)}...` : s.text
    for (const word of hits) {
      fileHits.push({ line, word, preview })
    }
  }

  summary[file] = { status: fileHits.length ? 'HITS' : 'CLEAN', hits: fileHits }
}

let total = 0
for (const [file, data] of Object.entries(summary)) {
  console.log(`FILE: ${file}`)
  if (data.status === 'NOT FOUND') {
    console.log('  → FILE NOT FOUND')
    continue
  }
  if (data.status === 'CLEAN') {
    console.log('  → SẠCH ✅')
    continue
  }

  const seen = new Set()
  for (const h of data.hits) {
    const key = `${h.line}|${h.word}`
    if (seen.has(key)) continue
    seen.add(key)
    console.log(`  Line ~${h.line}: "${h.word}" trong "${h.preview}"`)
  }
  console.log(`  → ${seen.size} token(s)`)
  total += seen.size
}

console.log('\n=== TỔNG KẾT ===')
for (const [file, data] of Object.entries(summary)) {
  if (data.status === 'CLEAN' || data.status === 'NOT FOUND') {
    console.log(`${file}: 0`)
  } else {
    const seen = new Set(data.hits.map((h) => `${h.line}|${h.word}`))
    console.log(`${file}: ${seen.size}`)
  }
}
console.log(`TỔNG: ${total} token EN`)
