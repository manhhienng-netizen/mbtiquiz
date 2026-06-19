import {
  L1_UNIFIED_NARRATIVES,
  type L1Narrative,
} from '../data/l1-unified-narratives'

export interface L1ReportInput {
  mbtiType: string
  nguHanhLabel: string
  nguHanhCore: string
  lifePath: number
  lifePathTheme: string
  nhatChuLabel: string
  nhatChuImage: string
}

export interface L1ReportFilled extends L1Narrative {
  mbtiType: string
}

export function buildL1Report(input: L1ReportInput): L1ReportFilled | null {
  const template = L1_UNIFIED_NARRATIVES[input.mbtiType]
  if (!template) return null

  const fill = (text: string): string =>
    text
      .replace(/\{\{NGU_HANH_LABEL\}\}/g, input.nguHanhLabel)
      .replace(/\{\{NGU_HANH_CORE\}\}/g, input.nguHanhCore)
      .replace(/\{\{LIFE_PATH\}\}/g, String(input.lifePath))
      .replace(/\{\{LIFE_PATH_THEME\}\}/g, input.lifePathTheme)
      .replace(/\{\{NHAT_CHU_LABEL\}\}/g, input.nhatChuLabel)
      .replace(/\{\{NHAT_CHU_IMAGE\}\}/g, input.nhatChuImage)

  return {
    mbtiType: input.mbtiType,
    title: fill(template.title),
    intro: fill(template.intro),
    body: template.body.map(fill) as L1Narrative['body'],
    nguHanhHook: fill(template.nguHanhHook),
    soHocHook: fill(template.soHocHook),
    nhatChuHook: fill(template.nhatChuHook),
    closing: fill(template.closing),
  }
}

/** Fail-safe: rendered copy must not leak raw placeholders. */
export function reportHasUnfilledPlaceholders(report: L1ReportFilled): boolean {
  const chunks = [
    report.title,
    report.intro,
    ...report.body,
    report.nguHanhHook,
    report.soHocHook,
    report.nhatChuHook,
    report.closing,
  ]
  return chunks.some((text) => /\{\{[A-Z_]+\}\}/.test(text))
}
