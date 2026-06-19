// ============================================================
// design-tokens.ts
// TNCB Learn · Brand design system
// ============================================================
// CÁCH DÙNG:
//   import { COLORS, FONTS, AGE_GROUP_THEME } from '@tncb/data/design-tokens'
//   const theme = AGE_GROUP_THEME['SPARK']
//   // theme.bg, theme.accent, theme.border...
// ============================================================

// ─── CORE PALETTE ─────────────────────────────────────────

export const COLORS = {
  // Primary — teal/emerald (growth, potential)
  primary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },

  // Accent — amber (warmth, encouragement)
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Neutrals — warm stone (not cold gray)
  stone: {
    50: '#FAFAF9',
    100: '#F5F5F4',
    200: '#E7E5E4',
    300: '#D6D3D1',
    400: '#A8A29E',
    500: '#78716C',
    600: '#57534E',
    700: '#44403C',
    800: '#292524',
    900: '#1C1917',
  },

  // Background
  background: {
    cream: '#FFFBEB',
    warm: '#FAFAF9',
    white: '#FFFFFF',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // 4 SPROUT colors (mapped to MBTI temperaments)
  sprout: {
    xanhLa:    { hex: '#10B981', light: '#ECFDF5', text: '#065F46', mbtiGroup: 'NT' as const },
    xanhDuong: { hex: '#3B82F6', light: '#EFF6FF', text: '#1E40AF', mbtiGroup: 'NF' as const },
    vang:      { hex: '#EAB308', light: '#FEFCE8', text: '#854D0E', mbtiGroup: 'SJ' as const },
    cam:       { hex: '#F97316', light: '#FFF7ED', text: '#9A3412', mbtiGroup: 'SP' as const },
  },

  // MBTI group colors (for SPARK/RISE/LAUNCH)
  mbtiGroups: {
    analysts:  { bg: '#FAF5FF', accent: '#8B5CF6', text: '#581C87', border: '#E9D5FF' },
    diplomats: { bg: '#ECFDF5', accent: '#10B981', text: '#065F46', border: '#A7F3D0' },
    sentinels: { bg: '#EFF6FF', accent: '#3B82F6', text: '#1E40AF', border: '#BFDBFE' },
    explorers: { bg: '#FFF7ED', accent: '#F59E0B', text: '#92400E', border: '#FDE68A' },
  },
} as const

// ─── TYPOGRAPHY ───────────────────────────────────────────

export const FONTS = {
  heading: '"Lexend", system-ui, sans-serif',
  body: '"Be Vietnam Pro", system-ui, sans-serif',
  mono: 'ui-monospace, "Cascadia Code", monospace',
} as const

// ─── AGE GROUP THEMES ─────────────────────────────────────

export type AgeGroupId = 'SPROUT' | 'BLOOM' | 'SPARK' | 'RISE' | 'LAUNCH'

export interface AgeGroupTheme {
  id: AgeGroupId
  label: string
  ageRange: string
  icon: string
  tagline: string
  bg: string
  accent: string
  border: string
  textDark: string
}

export const AGE_GROUP_THEME: Record<AgeGroupId, AgeGroupTheme> = {
  SPROUT: {
    id: 'SPROUT',
    label: 'Sprout',
    ageRange: '6 – 8 tuổi',
    icon: '🌱',
    tagline: '4 sắc màu tiềm năng',
    bg: '#F0FDF4',
    accent: '#16A34A',
    border: '#BBF7D0',
    textDark: '#166534',
  },
  BLOOM: {
    id: 'BLOOM',
    label: 'Bloom',
    ageRange: '9 – 12 tuổi',
    icon: '🌸',
    tagline: '24 phẩm chất của em',
    bg: '#ECFDF5',
    accent: '#059669',
    border: '#A7F3D0',
    textDark: '#065F46',
  },
  SPARK: {
    id: 'SPARK',
    label: 'Spark',
    ageRange: '13 – 15 tuổi',
    icon: '⚡',
    tagline: 'Khám phá tính cách',
    bg: '#FFF7ED',
    accent: '#EA580C',
    border: '#FED7AA',
    textDark: '#9A3412',
  },
  RISE: {
    id: 'RISE',
    label: 'Rise',
    ageRange: '16 – 18 tuổi',
    icon: '🚀',
    tagline: 'Định hướng nghề nghiệp',
    bg: '#F0F9FF',
    accent: '#0284C7',
    border: '#BAE6FD',
    textDark: '#0C4A6E',
  },
  LAUNCH: {
    id: 'LAUNCH',
    label: 'Launch',
    ageRange: '19 – 22 tuổi',
    icon: '🎓',
    tagline: 'Career path thực tế',
    bg: '#FAF5FF',
    accent: '#9333EA',
    border: '#E9D5FF',
    textDark: '#581C87',
  },
} as const

// ─── LAYOUT CONSTANTS ─────────────────────────────────────

export const LAYOUT = {
  maxWidth: '680px',
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
} as const
