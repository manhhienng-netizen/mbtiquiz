import {
  LEGAL_LABOR,
  LEGAL_PERSONAL_SAFETY,
  LEGAL_TRAFFIC,
} from '../data/pa-submodule-data'

export interface LegalCase {
  id: string
  title: string
  context: string
  userRights: string[]
  legalBasis: string
  practicalStep: string
  disclaimer: string
  lastUpdated: string
  commonMistake?: string
  csgtKhongDuoc?: string[]
  [key: string]: unknown
}

// KB_LEGAL_STATUS: seed (14 cases) · validate engine trước · expand dần
// PA Pháp luật: giao thông · lao động cá nhân · tiêu dùng · gia đình · an toàn cá nhân
// LOẠI TRỪ: luật doanh nghiệp (→ WA) · tranh chấp ly hôn phức tạp (cần luật sư)
// DISCLAIMER bắt buộc mọi content · KHÔNG tư vấn pháp lý cụ thể
export const LEGAL_ALL: LegalCase[] = [
  ...LEGAL_TRAFFIC,
  ...LEGAL_LABOR,
  ...LEGAL_PERSONAL_SAFETY,
] as LegalCase[]

export type LegalGroup = 'giao-thong' | 'lao-dong' | 'an-toan'

export function getLegalCasesByGroup(group: LegalGroup): LegalCase[] {
  if (group === 'giao-thong') return LEGAL_TRAFFIC as LegalCase[]
  if (group === 'lao-dong') return LEGAL_LABOR as LegalCase[]
  return LEGAL_PERSONAL_SAFETY as LegalCase[]
}

export function getLegalCaseById(id: string): LegalCase | undefined {
  return LEGAL_ALL.find((c) => c.id === id)
}

export function getLegalRestrictions(legalCase: LegalCase): string[] {
  if (legalCase.csgtKhongDuoc?.length) return legalCase.csgtKhongDuoc

  const bayThuongGap = legalCase.bayThuongGap
  if (Array.isArray(bayThuongGap) && bayThuongGap.length > 0) {
    return bayThuongGap as string[]
  }

  const bayCuaNhaTro = legalCase.bayCuaNhaTro
  if (Array.isArray(bayCuaNhaTro) && bayCuaNhaTro.length > 0) {
    return bayCuaNhaTro as string[]
  }

  if (legalCase.commonMistake) return [legalCase.commonMistake]
  return []
}
