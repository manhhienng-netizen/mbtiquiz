const MBTI_RE = /\b[EI][NS][TF][JP]\b/gi

const PARTNER_CTX =
  /người ấy|anh ấy|cô ấy|chồng|vợ|người yêu|crush|bạn ấy|đối phương|người kia|bạn trai|bạn gái|người đó|ông ấy|bà ấy/i

const COMPAT_CTX =
  /hợp không|hợp nhau|tương hợp|có hợp|hợp với|hợp với nhau/i

const SAME_AS_USER_CTX = /cũng|giống tôi|giống mình|như tôi|như mình|same type/i

const SELF_TYPE_CTX =
  /(?:tôi|mình|em)\s+(?:là\s+)?[EI][NS][TF][JP]\b|(?:tôi|mình)\s+[EI][NS][TF][JP]\b/i

function isValidMbtiType(type: string): boolean {
  if (type.length !== 4) return false
  const e = type.toUpperCase()
  return (
    (e[0] === 'E' || e[0] === 'I') &&
    (e[1] === 'N' || e[1] === 'S') &&
    (e[2] === 'T' || e[2] === 'F') &&
    (e[3] === 'J' || e[3] === 'P')
  )
}

function extractMbtiTypes(text: string): string[] {
  const found = text.match(MBTI_RE) ?? []
  const unique = new Set<string>()
  for (const raw of found) {
    const t = raw.toUpperCase()
    if (isValidMbtiType(t)) unique.add(t)
  }
  return [...unique]
}

function detectPartnerTypeInMessage(
  text: string,
  userType: string,
): string | null {
  const types = extractMbtiTypes(text)
  if (types.length === 0) return null

  const hasPartnerCtx = PARTNER_CTX.test(text)
  const hasCompatCtx = COMPAT_CTX.test(text)
  if (!hasPartnerCtx && !hasCompatCtx) return null

  const user = userType.toUpperCase()

  if (types.length === 1) {
    const only = types[0]!
    if (hasPartnerCtx) return only
    if (hasCompatCtx) {
      if (only !== user) return only
      if (SAME_AS_USER_CTX.test(text)) return only
      if (SELF_TYPE_CTX.test(text)) return null
      return null
    }
  }

  const nonUser = types.filter((t) => t !== user)
  if (nonUser.length === 1) return nonUser[0]!
  if (nonUser.length === 0 && types.length >= 2 && hasPartnerCtx) {
    return types.find((t) => t === user) ?? null
  }

  return null
}

/**
 * UNDER-inject > WRONG-inject: chỉ trả partnerType khi ngữ cảnh rõ.
 * // TODO: đoán-mềm từ mô tả tính cách (chưa làm M4-core).
 */
export function resolvePartnerType(
  userMessages: string[],
  userType: string,
  storedPartnerType: string | null,
): string | null {
  for (let i = userMessages.length - 1; i >= 0; i--) {
    const detected = detectPartnerTypeInMessage(userMessages[i]!, userType)
    if (detected) return detected
  }
  return storedPartnerType
}

export function shouldPersistPartnerType(
  userMessages: string[],
  userType: string,
): string | null {
  for (let i = userMessages.length - 1; i >= 0; i--) {
    const detected = detectPartnerTypeInMessage(userMessages[i]!, userType)
    if (detected) return detected
  }
  return null
}
