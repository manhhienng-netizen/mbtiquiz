import { getCompatSignal } from './match/compat-signal'
import { getBlocksForKeys } from './match/match-block-content'
import { getPairContent } from './match/match-pair-content'

/**
 * Mô tả quan hệ 2 kiểu (ngang hàng) — không % score.
 * Dùng match-pair-content (136 cặp) khi có; fallback block content.
 */
export function getWorkPeerCompatibility(
  userType: string,
  colleagueType: string,
): string | null {
  const signal = getCompatSignal({
    userType,
    partner: colleagueType,
  })

  if (signal.pairKey) {
    const content = getPairContent(signal.pairKey)
    if (content) {
      return [
        `Kiểu của bạn và đồng nghiệp này thường ${content.dongLuc}`,
        `Dễ hợp ở: ${content.vungDeHop}`,
        `Cần điều chỉnh ở: ${content.vungMaSat}`,
      ].join(' ')
    }
  }

  if (signal.blockKeys.length > 0) {
    const blocks = getBlocksForKeys(signal.blockKeys.slice(0, 2))
    if (blocks.length > 0) {
      return blocks
        .map((b) => `${b.tieuDe}: ${b.dongLuc}`)
        .join(' ')
    }
  }

  return null
}
