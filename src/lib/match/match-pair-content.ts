/**
 * MA M2a — Nội dung per-pair cho Match Assistant (136 cặp).
 * Key canonical khớp M1 getCompatSignal().pairKey = [a,b].sort().join("+").
 * Wired M4-core via build-match-compat-inject.ts.
 *
 * Retone thủ công 16/06/2026 từ generator output.
 * Generator m2a-transform-match-pair-content.mts: RETIRED.
 * Sửa trực tiếp file này hoặc 13 file VN source (không chạy lại generator).
 * 136 cặp VN · 0 EN-leak · 0 lẫn type · Master verify 16/06/2026
 */

import { MATCH_PAIR_CONTENT_VN_ENFJ } from './match-pair-content-vn-enfj'
import { MATCH_PAIR_CONTENT_VN_ENFP } from './match-pair-content-vn-enfp'
import { MATCH_PAIR_CONTENT_VN_ENFP_PART2 } from './match-pair-content-vn-enfp-part2'
import { MATCH_PAIR_CONTENT_VN_ENTJ } from './match-pair-content-vn-entj'
import { MATCH_PAIR_CONTENT_VN_ENTP } from './match-pair-content-vn-entp'
import { MATCH_PAIR_CONTENT_VN_ESFJ } from './match-pair-content-vn-esfj'
import { MATCH_PAIR_CONTENT_VN_ESFP } from './match-pair-content-vn-esfp'
import { MATCH_PAIR_CONTENT_VN_ESTJ } from './match-pair-content-vn-estj'
import { MATCH_PAIR_CONTENT_VN_ESTP } from './match-pair-content-vn-estp'
import { MATCH_PAIR_CONTENT_VN_INFJ } from './match-pair-content-vn-infj'
import { MATCH_PAIR_CONTENT_VN_INFP } from './match-pair-content-vn-infp'
import { MATCH_PAIR_CONTENT_VN_INTJ } from './match-pair-content-vn-intj'
import { MATCH_PAIR_CONTENT_VN_TAIL } from './match-pair-content-vn-tail'

export interface MatchPairContent {
  pairKey: string
  tenCap: string
  texture: 'golden_pair' | 'growth_pair' | 'challenge_pair' | 'contrast_pair'
  dongLuc: string
  vungDeHop: string
  vungMaSat: string
  canDeY: string[]
  cachDiQua: string[]
  funFact?: string
  coverage: 'full' | 'compat-only'
}

export const MATCH_PAIR_CONTENT: Record<string, MatchPairContent> = {
  ...MATCH_PAIR_CONTENT_VN_ENFJ,
  ...MATCH_PAIR_CONTENT_VN_ENFP,
  ...MATCH_PAIR_CONTENT_VN_ENFP_PART2,
  ...MATCH_PAIR_CONTENT_VN_ENTJ,
  ...MATCH_PAIR_CONTENT_VN_ENTP,
  ...MATCH_PAIR_CONTENT_VN_ESFJ,
  ...MATCH_PAIR_CONTENT_VN_ESFP,
  ...MATCH_PAIR_CONTENT_VN_ESTJ,
  ...MATCH_PAIR_CONTENT_VN_ESTP,
  ...MATCH_PAIR_CONTENT_VN_INFJ,
  ...MATCH_PAIR_CONTENT_VN_INFP,
  ...MATCH_PAIR_CONTENT_VN_INTJ,
  ...MATCH_PAIR_CONTENT_VN_TAIL,
}

/** Tra nội dung cặp theo pairKey canonical. */
export function getPairContent(pairKey: string): MatchPairContent | null {
  return MATCH_PAIR_CONTENT[pairKey] ?? null
}
