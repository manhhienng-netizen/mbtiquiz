const fs = require('fs')

const SRC_R123 = [
  'C:/Users/duong/Downloads/relationship-diagnostic-r1-conflict-12062026-1800.ts',
  'C:/Users/duong/Downloads/relationship-diagnostic-r2-intimacy-12062026-1830.ts',
  'C:/Users/duong/Downloads/relationship-diagnostic-r3-attachment-12062026-1900.ts',
]
const SRC_R48 = 'C:/Users/duong/Downloads/relationship-diagnostic-r4-r8-12062026-1930.ts'
const OUT = 'C:/dev/mbtiquiz/src/lib/p2p/relationship-diagnostic.ts'

function extractArray(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`)
  if (start < 0) throw new Error(`Missing ${exportName}`)
  const eq = src.indexOf('=', start)
  const bracket = src.indexOf('[', eq)
  let depth = 0
  let end = bracket
  for (let i = bracket; i < src.length; i++) {
    if (src[i] === '[') depth++
    if (src[i] === ']') {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  return src.slice(bracket, end)
}

function fixTypos(text) {
  return text
    .replace(/entertian/g, 'làm họ vui')
    .replace(/physical affection hơn/g, 'thân thiết hơn qua tiếp xúc')
}

const r123Names = ['CONFLICT_CARDS', 'INTIMACY_CARDS', 'ATTACHMENT_CARDS']
const r123 = SRC_R123.map((file, i) => {
  const src = fs.readFileSync(file, 'utf8')
  return { name: r123Names[i], body: fixTypos(extractArray(src, r123Names[i])) }
})

const r48Src = fs.readFileSync(SRC_R48, 'utf8')
const r48Names = [
  'REPAIR_CARDS',
  'APPRECIATION_CARDS',
  'ALONE_CARDS',
  'GROWTH_CARDS',
  'DEALBREAKER_CARDS',
]
const r48 = r48Names.map((name) => ({
  name,
  body: fixTypos(extractArray(r48Src, name)),
}))

const all = [...r123, ...r48]

const header = `/**
 * TNCB — Relationship Diagnostic (Layer D)
 * 8 situations × 16 types = 128 cards (R1–R8)
 */

export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'

export type SituationKey =
  | 'conflict' | 'intimacy' | 'attachment'
  | 'repair' | 'appreciation' | 'alone'
  | 'growth' | 'dealbreaker'

export const SITUATION_LABELS: Record<SituationKey, string> = {
  conflict: 'Khi có xung đột',
  intimacy: 'Nhịp gần gũi',
  attachment: 'Dấu hiệu gắn kết',
  repair: 'Hàn gắn',
  appreciation: 'Nhận & cho tình cảm',
  alone: 'Không gian riêng',
  growth: 'Kỳ vọng phát triển',
  dealbreaker: 'Giới hạn của bạn',
}

export interface RelationshipCard {
  type: MBTIType
  situation: SituationKey
  signal: string
  insight: string
  selfAsk: string
  watchFor: string
}

${all.map(({ name, body }) => `const ${name}: RelationshipCard[] = ${body}`).join('\n\n')}

export const RELATIONSHIP_CARDS: RelationshipCard[] = [
${all.map(({ name }) => `  ...${name},`).join('\n')}
]

export function getCard(
  type: MBTIType,
  situation: SituationKey,
): RelationshipCard | undefined {
  return RELATIONSHIP_CARDS.find((c) => c.type === type && c.situation === situation)
}

export function getCardsForType(type: MBTIType): RelationshipCard[] {
  return RELATIONSHIP_CARDS.filter((c) => c.type === type)
}

export const AVAILABLE_SITUATIONS: SituationKey[] = [
  'conflict',
  'intimacy',
  'attachment',
  'repair',
  'appreciation',
  'alone',
  'growth',
  'dealbreaker',
]
`

fs.writeFileSync(OUT, header, 'utf8')
const count = (header.match(/situation: '/g) || []).length
console.log('Wrote', OUT, 'card entries:', count)
