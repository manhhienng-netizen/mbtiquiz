import { COLORS } from '@tncb/data/design-tokens'
import type { SproutColor } from '@tncb/data/sprout-color-quiz-data'

export const SPROUT_TALLY_ORDER: SproutColor[] = [
  'xanh_duong',
  'vang',
  'xanh_la',
  'cam',
]

export function emptySproutScores(): Record<SproutColor, number> {
  return { xanh_duong: 0, vang: 0, xanh_la: 0, cam: 0 }
}

/** Highest score; tie → first in SPROUT_TALLY_ORDER */
export function sproutResultFromScores(
  scores: Record<SproutColor, number>,
): SproutColor {
  let best = SPROUT_TALLY_ORDER[0]
  let max = scores[best]
  for (const color of SPROUT_TALLY_ORDER) {
    if (scores[color] > max) {
      max = scores[color]
      best = color
    }
  }
  return best
}

export function sproutColorTokens(color: SproutColor) {
  const map = {
    xanh_la: COLORS.sprout.xanhLa,
    xanh_duong: COLORS.sprout.xanhDuong,
    vang: COLORS.sprout.vang,
    cam: COLORS.sprout.cam,
  } as const
  return map[color]
}
