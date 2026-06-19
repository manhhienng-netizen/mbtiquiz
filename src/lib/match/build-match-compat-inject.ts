import {
  getCompatSignal,
  type BlockKey,
  type Element,
} from './compat-signal'
import { getBlocksForKeys } from './match-block-content'
import { getPairContent } from './match-pair-content'

const ELEMENTS = new Set<Element>(['Kim', 'Mộc', 'Thủy', 'Hỏa', 'Thổ'])

export function parseUserElement(raw: string | null | undefined): Element | undefined {
  if (!raw) return undefined
  const trimmed = raw.trim()
  return ELEMENTS.has(trimmed as Element) ? (trimmed as Element) : undefined
}

export interface MatchCompatInjectInput {
  userType: string
  partnerType: string
  userElement?: Element
}

export interface MatchCompatInjectMeta {
  mode: 'pair' | 'block' | 'none'
  pairKey: string | null
  blockKeys: string[]
}

const TEXTURE_TONE_HINT: Record<
  'golden_pair' | 'growth_pair' | 'challenge_pair' | 'contrast_pair',
  string
> = {
  golden_pair: 'ấm, bổ sung, năng lượng cân bằng',
  growth_pair: 'kích thích phát triển, đôi khi căng nhưng có ích',
  challenge_pair: 'ma sát có thể mạnh, cần chủ động điều chỉnh',
  contrast_pair: 'khác biệt rõ, cần thấu hiểu phong cách đối phương',
}

const FUN_FACT_SKIP_RE =
  /golden\s*pair|growth\s*pair|challenge\s*pair|contrast\s*pair|\[P community\]|\[S\]/i

function buildPairInjectBlock(
  pairKey: string,
  includeCachDiQua: boolean,
): string | null {
  const content = getPairContent(pairKey)
  if (!content) return null

  const lines = [
    '[NGỮ CẢNH TƯƠNG HỢP — tham khảo để compose, KHÔNG đọc nguyên văn, KHÔNG nói %/điểm]',
    `Cặp nội bộ: ${pairKey}`,
    `Tone tham khảo (diễn đạt bằng lời Việt, KHÔNG gọi tên loại cặp): ${TEXTURE_TONE_HINT[content.texture]}`,
    `Động lực: ${content.dongLuc}`,
    `Vùng dễ hợp: ${content.vungDeHop}`,
    `Vùng ma sát: ${content.vungMaSat}`,
    `Điều cần để ý: ${content.canDeY.join(' · ')}`,
  ]

  if (includeCachDiQua && content.cachDiQua.length > 0) {
    lines.push(`Cách đi qua: ${content.cachDiQua.join(' · ')}`)
  }
  if (content.funFact && !FUN_FACT_SKIP_RE.test(content.funFact)) {
    lines.push(`Ghi chú (diễn đạt lại tiếng Việt, không copy): ${content.funFact}`)
  }
  lines.push('[/NGỮ CẢNH TƯƠNG HỢP — không đọc nguyên văn cho user]')
  return lines.join('\n')
}

function buildBlockInjectBlock(blockKeys: BlockKey[]): string | null {
  const blocks = getBlocksForKeys(blockKeys)
  if (blocks.length === 0) return null

  const lines = [
    '[NGỮ CẢNH TƯƠNG HỢP — block fallback, tham khảo để compose, KHÔNG đọc nguyên văn, KHÔNG nói %/điểm]',
    ...blocks.map(
      (b) =>
        `[${b.key} · ${b.tieuDe}]\nĐộng lực: ${b.dongLuc}\nĐiều cần để ý: ${b.canDeY}`,
    ),
    '[/NGỮ CẢNH TƯƠNG HỢP — không đọc nguyên văn cho user]',
  ]
  return lines.join('\n\n')
}

/** Build compat inject cho nhánh NORMAL. null = không inject. */
export function buildMatchCompatInjectBlock(
  input: MatchCompatInjectInput,
): { block: string | null; meta: MatchCompatInjectMeta } {
  const signal = getCompatSignal({
    userType: input.userType,
    partner: input.partnerType,
    userElement: input.userElement,
  })

  let block: string | null = null
  let mode: MatchCompatInjectMeta['mode'] = 'none'

  if (signal.coverage === 'full' && signal.pairKey) {
    const pair = getPairContent(signal.pairKey)
    if (pair && pair.coverage === 'full') {
      block = buildPairInjectBlock(signal.pairKey, true)
      mode = 'pair'
    }
  }

  if (!block) {
    block = buildBlockInjectBlock(signal.blockKeys as BlockKey[])
    mode = block ? 'block' : 'none'
  }

  if (block && signal.elementNote.trim()) {
    block = appendElementNote(block, signal.elementNote)
  }

  return {
    block,
    meta: {
      mode,
      pairKey: signal.pairKey,
      blockKeys: signal.blockKeys,
    },
  }
}

export function appendElementNote(
  block: string,
  elementNote: string,
): string {
  if (!elementNote.trim()) return block
  return `${block}\nNgũ hành (nếu liên quan, nói nhẹ): ${elementNote.trim()}`
}
