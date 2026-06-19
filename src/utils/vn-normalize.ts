/**
 * TNCB — VN Text Normalization for Profanity Filter
 * Pipeline: lowercase → NFD → strip diacritics → đ→d → leet → bypass chars → collapse space
 * Backing: VN bypass patterns [S] practitioner consensus
 */

const LEET_MAP: Record<string, string> = {
  '@': 'a',
  '3': 'e',
  '0': 'o',
  '1': 'i',
  '4': 'a',
  '$': 's',
  '5': 's',
  '7': 't',
  '!': 'i',
}

/** Expand VN abbreviations TRƯỚC khi normalize */
const ABBREVIATIONS: Record<string, string> = {
  dm: 'dit me',
  'đm': 'dit me',
  vcl: 'vai ca lon',
  vkl: 'vai ca lon',
  clgt: 'ca lon gi the',
  'đcm': 'dit ca me',
  dcm: 'dit ca me',
  vl: 'vai lon',
  cl: 'ca lon',
  dkm: 'dit ke me',
  'đkm': 'dit ke me',
  wtf: 'what the f',
  stfu: 'shut the f up',
}

/**
 * Expand abbreviations trong text (word boundary match)
 * ⚠️ "cc" standalone KHÔNG expand (= carbon copy)
 */
function expandAbbreviations(text: string): string {
  const words = text.split(/\s+/)
  return words
    .map((word) => {
      const lower = word.toLowerCase().replace(/[^a-zđ]/g, '')
      if (lower === 'cc') return word
      return ABBREVIATIONS[lower] ?? word
    })
    .join(' ')
}

/**
 * Normalize text VN cho profanity filter
 */
export function normalizeForFilter(text: string): string {
  return expandAbbreviations(text.toLowerCase())
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[@30$1457!]/g, (c) => LEET_MAP[c] ?? c)
    .replace(/[*.\-_|#^]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}
