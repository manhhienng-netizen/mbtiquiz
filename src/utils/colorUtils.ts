import type { CSSProperties } from 'react'

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export const ELEMENT_ACCENT: Record<string, string> = {
  Kim: '#C0B8D4',
  Mộc: '#8BC4A0',
  Thủy: '#7EB8D8',
  Hỏa: '#E8A088',
  Thổ: '#D4B880',
  default: '#B8A0D4',
}

export const ELEMENT_GRADIENTS: Record<string, string> = {
  Kim: 'linear-gradient(160deg, #0F0F14 0%, #1A1520 100%)',
  Mộc: 'linear-gradient(160deg, #0F0F14 0%, #0F1A14 100%)',
  Thủy: 'linear-gradient(160deg, #0F0F14 0%, #0F1420 100%)',
  Hỏa: 'linear-gradient(160deg, #0F0F14 0%, #1A1014 100%)',
  Thổ: 'linear-gradient(160deg, #0F0F14 0%, #1A1810 100%)',
  default: 'linear-gradient(160deg, #0F0F14 0%, #161420 100%)',
}

export const LIFEPATH_ACCENT: Record<number, string> = {
  1: '#E8A088',
  2: '#8BC4A0',
  3: '#D4B880',
  4: '#7EB8D8',
  5: '#C0B8D4',
  6: '#8BC4A0',
  7: '#D0C8E0',
  8: '#7EB8D8',
  9: '#E8A088',
  11: '#FFD700',
  22: '#FFD700',
  33: '#FFD700',
}

export const MBTI_GROUP_GLOW: Record<string, string> = {
  // NT — Analysts: cobalt xanh tím
  INTJ: '#3B5BDB',
  INTP: '#3B5BDB',
  ENTJ: '#3B5BDB',
  ENTP: '#3B5BDB',

  // NF — Diplomats: teal xanh lá
  INFJ: '#0CA678',
  INFP: '#0CA678',
  ENFJ: '#0CA678',
  ENFP: '#0CA678',

  // SJ — Sentinels: navy vàng
  ISTJ: '#1864AB',
  ISFJ: '#1864AB',
  ESTJ: '#1864AB',
  ESFJ: '#1864AB',

  // SP — Explorers: cam đỏ
  ISTP: '#C92A2A',
  ISFP: '#C92A2A',
  ESTP: '#C92A2A',
  ESFP: '#C92A2A',
}

const SLUG_MAP: Record<string, string> = {
  Giáp: 'giap',
  Ất: 'at',
  Bính: 'binh',
  Đinh: 'dinh',
  Mậu: 'mau',
  Kỷ: 'ky',
  Canh: 'canh',
  Tân: 'tan',
  Nhâm: 'nham',
  Quý: 'quy',
  Kim: 'kim',
  Mộc: 'moc',
  Thủy: 'thuy',
  Hỏa: 'hoa',
  Thổ: 'tho',
}

export function toSlug(vn: string): string {
  return SLUG_MAP[vn] || vn.toLowerCase()
}

export function getElementAccent(element?: string): string {
  return ELEMENT_ACCENT[element ?? ''] ?? ELEMENT_ACCENT.default
}

export function getElementGradient(element?: string): string {
  return ELEMENT_GRADIENTS[element ?? ''] ?? ELEMENT_GRADIENTS.default
}

export function getLifePathAccent(lifePath: number): string {
  return LIFEPATH_ACCENT[lifePath] ?? ELEMENT_ACCENT.default
}

export function resolveGenderKey(
  gender?: string,
  genderPreference?: string,
): 'male' | 'female' {
  if (gender === 'other') {
    return genderPreference === 'female' ? 'female' : 'male'
  }
  if (gender === 'female') return 'female'
  return 'male'
}

export const ELEMENT_TO_LAYER1: Record<string, string> = {
  Hỏa: 'hoa',
  Kim: 'kim',
  Mộc: 'moc',
  Thổ: 'tho',
  Thủy: 'thuy',
}

export const NHATCHU_TO_LAYER2: Record<string, string> = {
  Ất: 'at',
  Bính: 'binh',
  Canh: 'canh',
  Đinh: 'dinh',
  Giáp: 'giap',
  Kỷ: 'ky',
  Mậu: 'mau',
  Nhâm: 'nham',
  Quý: 'quy',
  Tân: 'tan',
}

export function getLayer1Path(element: string): string | null {
  const slug = ELEMENT_TO_LAYER1[element]
  return slug ? `/assets/layer1/${slug}.webp` : null
}

export function getLayer2Path(nhatChu: string): string | null {
  const slug = NHATCHU_TO_LAYER2[nhatChu]
  return slug ? `/assets/layer2/${slug}.webp` : null
}

export function buildBackgroundPath(nhatChu: string, element: string): string {
  return `/assets/backgrounds/bg-${toSlug(nhatChu)}-${toSlug(element)}.webp`
}

export function buildFigurePath(
  mbtiType: string,
  gender?: string,
  genderPreference?: string,
): string {
  const genderKey = resolveGenderKey(gender, genderPreference)
  return `/assets/figures/layer3-${mbtiType.toLowerCase()}-${genderKey}.webp`
}

export const CARD_SURFACE_STYLE: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 20,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
}

export function dividerStyle(accentColor: string): CSSProperties {
  return {
    height: 1,
    background: `linear-gradient(to right, transparent, ${hexToRgba(accentColor, 0.3)}, transparent)`,
    margin: '20px 0',
    border: 'none',
  }
}
