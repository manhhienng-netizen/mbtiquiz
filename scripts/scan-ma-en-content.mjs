import fs from 'fs'
import path from 'path'

const MBTI_TYPES = new Set(
  'ENFJ ENFP ENTJ ENTP ESTJ ESTP ESFJ ESFP INFJ INFP INTJ INTP ISTJ ISTP ISFJ ISFP'.split(
    ' ',
  ),
)

const EN_PATTERNS = [
  /\bonline\b/gi,
  /\bteen\b/gi,
  /\btype\b/gi,
  /\bMatch Chat\b/gi,
  /\bmindset\b/gi,
  /\bcoach\b/gi,
  /\bgrowth\b/gi,
  /\bfeedback\b/gi,
  /\bcheck-in\b/gi,
  /\bburnout\b/gi,
  /\bstress\b/gi,
  /\bADHD\b/gi,
  /\bPFC\b/gi,
  /\bbuild\b/gi,
  /\bdifficult\b/gi,
  /\beasy\b/gi,
  /\bpeer\b/gi,
  /\bfire\b/gi,
  /\bcut off\b/gi,
  /\bNext\b/g,
  /\bBack\b/g,
  /\bgolden pair\b/gi,
  /\bgrowth pair\b/gi,
]

const SKIP_WORDS = new Set(
  'hook setup title label group pair icon sublabel primary fallback better same young teen adult spouse parent unknown heavy chose mirror insight checkin estimator select roleplay safety distance pressure conflict choices adulthood tantrum unheard overworry silence parenting money argue buong nhutnhat haykhoc hieudong likhongnghe khepkin apluchoc noiloan khaclua xacach batdong itvenha shy bigfeelings'.split(
    ' ',
  ),
)

function extractQuotedStrings(line) {
  const out = []
  for (const m of line.matchAll(/'([^']*)'|"([^"]*)"/g)) {
    out.push(m[1] ?? m[2])
  }
  return out
}

function scanFile(filePath, lineFilter = null) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const hits = []

  lines.forEach((line, i) => {
    if (lineFilter && !lineFilter(line)) return
    if (line.trim().startsWith('//')) return
    if (/^\s*(import|export type|export interface|type |interface )/.test(line))
      return

    for (const s of extractQuotedStrings(line)) {
      if (/^RP_/.test(s) || /^c[123]$/.test(s)) continue
      if (s.includes('@/') || s.includes('../')) continue

      for (const re of EN_PATTERNS) {
        re.lastIndex = 0
        const m = re.exec(s)
        if (m) {
          hits.push({
            line: i + 1,
            word: m[0],
            text: s.length > 90 ? `${s.slice(0, 90)}...` : s,
          })
        }
      }

      const words = s.match(/\b[A-Za-z]{3,}\b/g) || []
      for (const w of words) {
        const up = w.toUpperCase()
        if (MBTI_TYPES.has(up)) continue
        if (SKIP_WORDS.has(w.toLowerCase())) continue
        if (/^(Khi|Hai|Con|Cho|Sao|Nhi|Gia|can|Theo|Chuy|Kho|Ngh|Nghe|Ranh|Trong|Sau|Xong|Nhanh|Giai|Quy|Thuy|Xin|Mang|Quen|Im|Can)$/i.test(w))
          continue
        hits.push({
          line: i + 1,
          word: w,
          text: s.length > 90 ? `${s.slice(0, 90)}...` : s,
        })
      }
    }
  })

  const seen = new Set()
  return hits.filter((h) => {
    const k = `${h.line}|${h.word}|${h.text}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

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
  'src/lib/build-match-system-prompt.ts',
  'src/pages/match/SpouseInsight.tsx',
  'src/pages/match/ParentInsight.tsx',
  'src/pages/match/ChildInsight.tsx',
]

for (const f of fs
  .readdirSync('src/lib/match')
  .filter((x) => x.startsWith('match-pair-content'))) {
  files.push(`src/lib/match/${f}`)
}

const summary = {}
for (const f of files) {
  if (!fs.existsSync(f)) {
    summary[f] = { status: 'NOT_FOUND', hits: [] }
    continue
  }
  const filter = f.includes('match-pair-content')
    ? (l) => /dongLuc:|vungMaSat:/.test(l)
    : null
  const hits = scanFile(f, filter)
  summary[f] = { status: hits.length ? 'HITS' : 'CLEAN', hits }
}

let total = 0
for (const [file, data] of Object.entries(summary)) {
  console.log(`FILE: ${file}`)
  if (data.status === 'NOT_FOUND') {
    console.log('  → FILE NOT FOUND')
    continue
  }
  if (data.status === 'CLEAN') {
    console.log('  → SẠCH ✅')
    continue
  }
  for (const h of data.hits) {
    console.log(`  Line ~${h.line}: "${h.word}" trong "${h.text}"`)
  }
  console.log(`  → ${data.hits.length} token(s)`)
  total += data.hits.length
}

console.log('\n=== TỔNG KẾT ===')
for (const [file, data] of Object.entries(summary)) {
  const n = data.hits?.length ?? 0
  console.log(`${file}: ${data.status === 'NOT_FOUND' ? 'N/A' : n}`)
}
console.log(`TỔNG (không tính MBTI): ${total}`)
