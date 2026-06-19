/**
 * TNCB Safety Resources — Nguồn hỗ trợ đã verify
 * Verify date: 10/06/2026 | Version: 1.1
 *
 * ⚠️ ĐÂY LÀ SINGLE SOURCE OF TRUTH — import từ đây, không hardcode ở nơi khác
 * ⚠️ Mọi thay đổi số điện thoại chỉ cần sửa file này
 *
 * Nguyên tắc dùng trong app:
 * - Chỉ dùng số nhà nước/công: 115 (cấp cứu), 113 (công an)
 * - Không hardcode hotline tư nhân — hướng dẫn chung: cơ sở y tế gần nhất
 * - KHÔNG đưa số quốc tế (NEDA/Beat) trừ khi ghi rõ "quốc tế, tiếng Anh"
 * - ED → bác sĩ tâm lý/tâm thần, không phải hotline crisis thông thường
 * - LGBTQ+ crisis → 115 hoặc 113, không phải ICS (giờ hành chính)
 */

// ─── KHẨN CẤP NHÀ NƯỚC ────────────────────────────────────────

/**
 * Cấp cứu y tế — 24/7 toàn quốc
 * Dùng khi: người đang tự làm hại thể lý / mất ý thức / khủng hoảng cần can thiệp y tế ngay
 */
export const EMERGENCY_AMBULANCE = "115"

/**
 * Cảnh sát — 24/7 toàn quốc
 * Dùng khi: nguy hiểm khẩn cấp, bạo hành thể lý đang xảy ra
 */
export const EMERGENCY_POLICE = "113"

/** Hướng dẫn chung — không hardcode số tư nhân. */
export const GENERAL_MEDICAL_GUIDANCE =
  "đến cơ sở y tế hoặc bệnh viện gần nhất"

/**
 * Tổng đài Bảo vệ Trẻ em — 24/7 miễn phí
 * Bộ LĐTBXH. Dùng khi: trẻ em bị xâm hại, bạo hành
 */
export const CHILD_PROTECTION = "111"

// ─── BỆNH VIỆN TÂM THẦN ───────────────────────────────────────

/**
 * BV Tâm thần TP.HCM
 * Giờ: T2–T6, 7h30–11h30 (tham vấn trực tuyến). Có phí (BHYT hỗ trợ).
 */
export const HOSPITAL_PSYCH_HCM = "19001267"

/**
 * BV Tâm thần Hà Nội
 * Giờ: T2–T7, 7h30–11h30. Có phí (BHYT hỗ trợ).
 */
export const HOSPITAL_PSYCH_HN = "0967301616"

/**
 * BV Tâm thần TW1 Hà Nội
 * Giờ: giờ hành chính. Có phí (BHYT hỗ trợ).
 */
export const HOSPITAL_PSYCH_TW1_HN = "024 3385 3227"

// ─── BẠO HÀNH / QUAN HỆ NGUY HIỂM ────────────────────────────

/**
 * Đường dây Bạo lực Gia đình — Hội Nông dân VN — 24/7 miễn phí
 * UNFPA hỗ trợ. Tư vấn bạo lực giới, kết nối nơi lánh nạn.
 */
export const DOMESTIC_VIOLENCE_HOIND = "1800 1768"

// ─── HỖ TRỢ LGBTQ+ ────────────────────────────────────────────

/**
 * Trung tâm ICS (LGBTI+)
 * ⚠️ KHÔNG phải crisis line 24/7 — giờ hành chính T2–T6, 10h–18h
 * Hỗ trợ cộng đồng LGBTI+: tư vấn, kết nối dịch vụ.
 * Khi khủng hoảng → dùng EMERGENCY_AMBULANCE hoặc EMERGENCY_POLICE
 */
export const LGBTQ_ICS = "+84 28 3620 6797"
export const LGBTQ_ICS_EMAIL = "info@ics.org.vn"

// ─── RỐI LOẠN ĂN UỐNG (ED) ────────────────────────────────────

/**
 * ⚠️ Không có hotline ED chuyên biệt tại VN (tính đến 01/06/2026)
 * → Hướng user đến bác sĩ tâm lý/tâm thần tại BV (xem HOSPITAL_PSYCH_* ở trên)
 * → Nguồn quốc tế (tiếng Anh) nếu cần:
 */
export const ED_NEDA_INTL = "1-800-931-2237" // Mỹ — tiếng Anh
export const ED_NEDA_WEB = "nationaleatingdisorders.org"
export const ED_BEAT_INTL_ADULT = "0808 801 0677" // UK — tiếng Anh
export const ED_NOTE = "Chưa có hotline ED chuyên biệt tại VN — hướng đến bác sĩ tâm lý/tâm thần"

// ─── OBJECT TỔNG HỢP — dùng để render UI ─────────────────────

export interface SafetyResource {
  name: string
  contact: string
  hours: string
  isFree: boolean
  isAvailable24h: boolean
  isVN: boolean
  notes?: string
}

export const SAFETY_RESOURCES: Record<string, SafetyResource> = {
  emergency_ambulance: {
    name: "Cấp cứu",
    contact: EMERGENCY_AMBULANCE,
    hours: "24/7",
    isFree: true,
    isAvailable24h: true,
    isVN: true,
    notes: "Tự làm hại thể lý, mất ý thức, khủng hoảng cần can thiệp y tế ngay",
  },
  emergency_police: {
    name: "Cảnh sát",
    contact: EMERGENCY_POLICE,
    hours: "24/7",
    isFree: true,
    isAvailable24h: true,
    isVN: true,
    notes: "Nguy hiểm khẩn cấp, bạo lực đang xảy ra",
  },
  child_protection: {
    name: "Tổng đài Bảo vệ Trẻ em",
    contact: CHILD_PROTECTION,
    hours: "24/7",
    isFree: true,
    isAvailable24h: true,
    isVN: true,
    notes: "Trẻ em bị xâm hại hoặc bạo hành",
  },
  hospital_hcm: {
    name: "BV Tâm thần TP.HCM",
    contact: HOSPITAL_PSYCH_HCM,
    hours: "T2–T6, 7h30–11h30",
    isFree: false,
    isAvailable24h: false,
    isVN: true,
    notes: "Tư vấn tâm lý tâm thần. Có phí (BHYT hỗ trợ)",
  },
  hospital_hn: {
    name: "BV Tâm thần Hà Nội",
    contact: HOSPITAL_PSYCH_HN,
    hours: "T2–T7, 7h30–11h30",
    isFree: false,
    isAvailable24h: false,
    isVN: true,
    notes: "Khám điều trị tâm thần. Có phí (BHYT hỗ trợ)",
  },
  domestic_violence: {
    name: "Bạo lực / nguy hiểm",
    contact: EMERGENCY_POLICE,
    hours: "24/7",
    isFree: true,
    isAvailable24h: true,
    isVN: true,
    notes: `Liên hệ công an ${EMERGENCY_POLICE} hoặc ${GENERAL_MEDICAL_GUIDANCE}`,
  },
  domestic_violence_2: {
    name: "Đường dây Bạo lực Gia đình",
    contact: DOMESTIC_VIOLENCE_HOIND,
    hours: "24/7",
    isFree: true,
    isAvailable24h: true,
    isVN: true,
    notes: "Bạo lực giới và gia đình",
  },
  lgbtq_ics: {
    name: "Trung tâm ICS (LGBTI+)",
    contact: LGBTQ_ICS,
    hours: "T2–T6, 10h–18h",
    isFree: true,
    isAvailable24h: false,
    isVN: true,
    notes: "Hỗ trợ cộng đồng LGBTI+. Không phải crisis line 24/7",
  },
}

// ─── HELPER FUNCTIONS ─────────────────────────────────────────

/**
 * Trả về message chuẩn cho crisis — chỉ số nhà nước + hướng dẫn chung.
 */
export function getCrisisMessage(): string {
  return `Nếu bạn đang trong khủng hoảng, gọi ${EMERGENCY_AMBULANCE} (cấp cứu) hoặc ${EMERGENCY_POLICE} (công an) — và có thể ${GENERAL_MEDICAL_GUIDANCE} để được hỗ trợ.`
}

/** Text UI block crisis (PA/WA/MA) — cùng nguồn SSOT, gọi function không cache string cũ. */
export function getCrisisSupportText(): string {
  return getCrisisMessage()
}

/**
 * Trả về message cho bạo hành — không số tư nhân.
 */
export function getDomesticViolenceMessage(): string {
  return `Nếu bạn đang gặp nguy hiểm, liên hệ công an ${EMERGENCY_POLICE} hoặc ${GENERAL_MEDICAL_GUIDANCE}.`
}

/**
 * Trả về message redirect ED về chuyên gia
 */
export function getEDMessage(): string {
  return "Hiện chưa có hotline chuyên biệt về rối loạn ăn uống tại VN. Bước phù hợp nhất là gặp bác sĩ tâm lý hoặc tâm thần tại bệnh viện."
}

/**
 * Trả về số và tên theo tình huống
 */
export type SituationType =
  | "crisis"
  | "self_harm"
  | "domestic_violence"
  | "child_abuse"
  | "ed"
  | "mental_health"
  | "lgbtq"

export function getResourceForSituation(situation: SituationType): {
  primary: string
  primaryName: string
  fallback?: string
  message: string
} {
  switch (situation) {
    case "crisis":
    case "self_harm":
      return {
        primary: EMERGENCY_AMBULANCE,
        primaryName: "Cấp cứu",
        fallback: EMERGENCY_POLICE,
        message: getCrisisMessage(),
      }
    case "domestic_violence":
      return {
        primary: EMERGENCY_POLICE,
        primaryName: "Công an",
        fallback: EMERGENCY_AMBULANCE,
        message: getDomesticViolenceMessage(),
      }
    case "child_abuse":
      return {
        primary: CHILD_PROTECTION,
        primaryName: "Tổng đài 111",
        message: `Tổng đài bảo vệ trẻ em: ${CHILD_PROTECTION} (miễn phí, 24/7).`,
      }
    case "ed":
      return {
        primary: HOSPITAL_PSYCH_HCM,
        primaryName: "BV Tâm thần TP.HCM",
        message: getEDMessage(),
      }
    case "mental_health":
      return {
        primary: HOSPITAL_PSYCH_HCM,
        primaryName: "BV Tâm thần TP.HCM",
        message: `Để được hỗ trợ chuyên môn, liên hệ BV Tâm thần TP.HCM: ${HOSPITAL_PSYCH_HCM} (T2–T6, 7h30–11h30) hoặc BV Tâm thần Hà Nội: ${HOSPITAL_PSYCH_HN} (T2–T7, 7h30–11h30).`,
      }
    case "lgbtq":
      return {
        primary: LGBTQ_ICS,
        primaryName: "ICS (LGBTI+)",
        fallback: EMERGENCY_AMBULANCE,
        message: `Hỗ trợ cộng đồng LGBTI+: ICS ${LGBTQ_ICS} (T2–T6, 10h–18h). Nếu đang khủng hoảng: gọi ${EMERGENCY_AMBULANCE} hoặc ${EMERGENCY_POLICE}, hoặc ${GENERAL_MEDICAL_GUIDANCE}.`,
      }
  }
}
