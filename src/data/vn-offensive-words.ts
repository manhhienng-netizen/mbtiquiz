/**
 * TNCB — VN Offensive Word List (tự curate, không dùng blue-eyes-vn)
 * Lưu ở dạng ĐÃ NORMALIZE (không dấu, lowercase) để O(1) lookup
 * Update định kỳ khi có slang mới
 *
 * License: tự viết, không copy từ nguồn license chưa rõ
 */

export const DIRECT_WORDS = new Set<string>([
  'dit',
  'dit me',
  'dit ca me',
  'dit ke me',
  'dit con me',
  'lon',
  'cac',
  'buoi',
  'dai',
  'fuck',
  'shit',
  'bitch',

  'vai ca lon',
  'vai lon',
  'ca lon',
  'ca lon gi the',
  'do ngu',
  'thang ngu',
  'con ngu',
  'do dien',
  'thang dien',
  'o dit',
  'thang cho',

  'do bong',
  'thang bong',
  'do gay',
  'thang gay',
  'do les',

  'lam tinh',
  'quan he tinh duc',
  'dit nhau',
  'bu cac',
  'mut lon',
])

export const OFFENSIVE_PHRASES: RegExp[] = [
  /\bdit\b/,
  /\bdit\s+\w+/,
  /\blon\s+gi\b/,
  /\bbu\s+cac\b/,
  /\bthang\s+cho\b/,
  /\bdo\s+cho\b/,
  /\bcon\s+cho\b.*\b(ngu|dien|dit)\b/,
]

export const CONTEXT_PAIRS: Array<{
  triggers: string[]
  word: string
}> = [
  { triggers: ['do', 'thang', 'con', 'may', 'thu'], word: 'cho' },
  { triggers: ['do', 'thang', 'con'], word: 'lon' },
  { triggers: ['do', 'thang', 'may'], word: 'ngu' },
  { triggers: ['thang', 'con', 'do'], word: 'dien' },
]

export const WHITELIST = new Set<string>([
  'cac ban',
  'cac em',
  'con nguoi',
  'con cho meo',
  'nuoi cho',
  'cho meo',
  'cho vat',
  'carbon copy',
  'cc:',
  'lon xuong',
  'lon tuoi',
  'lon khi',
])
