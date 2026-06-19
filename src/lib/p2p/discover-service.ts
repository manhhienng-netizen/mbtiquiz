import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'
import { calculateCompat, type PersonaPayload } from './compat-engine'

export interface DiscoverProfile {
  userId: string
  displayName: string
  bio: string
  photos: string[]
  gender: string
  payload: PersonaPayload
  compatScore: number
  selfieVerified: boolean
  createdAt: string
}

export interface MyPrefs {
  userId: string
  lookingFor: string
  minAge: number
  maxAge: number
  myPayload: PersonaPayload
}

interface DatingProfileRow {
  user_id: string
  display_name: string
  bio: string | null
  photos: string[] | null
  gender: string | null
  payload: PersonaPayload | null
  selfie_verified: boolean | null
  created_at: string
  report_count: number | null
}

type RankedProfile = DiscoverProfile & { _rankScore: number }

export async function getDiscoverDeck(prefs: MyPrefs): Promise<DiscoverProfile[]> {
  if (!hasSupabaseEnv) {
    return getDemoDiscoverDeck(prefs)
  }

  const { data: swipedData } = await getSupabaseClient()
    .from('swipes')
    .select('to_user_id')
    .eq('from_user_id', prefs.userId)

  const swipedIds = new Set(
    (swipedData ?? []).map((s: { to_user_id: string }) => s.to_user_id),
  )
  swipedIds.add(prefs.userId)

  const [blockedResult, blockedByResult] = await Promise.all([
    getSupabaseClient()
      .from('blocked_users')
      .select('blocked_id')
      .eq('blocker_id', prefs.userId),
    getSupabaseClient()
      .from('blocked_users')
      .select('blocker_id')
      .eq('blocked_id', prefs.userId),
  ])

  const blockedIds = new Set<string>([
    ...(blockedResult.data ?? []).map((b: { blocked_id: string }) => b.blocked_id),
    ...(blockedByResult.data ?? []).map((b: { blocker_id: string }) => b.blocker_id),
  ])

  let query = getSupabaseClient()
    .from('dating_profiles')
    .select(
      'user_id, display_name, bio, photos, gender, payload, selfie_verified, created_at, report_count',
    )
    .eq('is_active', true)
    .eq('is_paused', false)
    .lt('report_count', 3)
    .limit(100)

  if (prefs.lookingFor !== 'any') {
    query = query.eq('gender', prefs.lookingFor)
  }

  const { data: candidates, error } = await query
  if (error || !candidates) return []

  const filtered = (candidates as DatingProfileRow[])
    .filter((c) => !swipedIds.has(c.user_id) && !blockedIds.has(c.user_id))
    .map((c): RankedProfile => {
      const compat = calculateCompat(prefs.myPayload, c.payload ?? {})
      const completeness = scoreCompleteness(c)
      const recencyScore = getRecencyScore(c.created_at)
      const rankScore = Math.round(
        compat.total * 0.5 +
        completeness * 0.2 +
        recencyScore * 0.2 +
        (c.selfie_verified ? 100 : 0) * 0.1,
      )
      return {
        userId: c.user_id,
        displayName: c.display_name,
        bio: c.bio ?? '',
        photos: c.photos ?? [],
        gender: c.gender ?? '',
        payload: c.payload ?? {},
        compatScore: compat.total,
        selfieVerified: c.selfie_verified ?? false,
        createdAt: c.created_at,
        _rankScore: rankScore,
      }
    })
    .sort((a, b) => b._rankScore - a._rankScore)
    .slice(0, 20)
    .map(({ _rankScore: _omit, ...rest }) => rest)

  return filtered
}

function scoreCompleteness(profile: DatingProfileRow): number {
  let score = 0
  if ((profile.photos?.length ?? 0) >= 2) score += 40
  else if ((profile.photos?.length ?? 0) >= 1) score += 20
  if ((profile.bio?.length ?? 0) >= 50) score += 30
  else if ((profile.bio?.length ?? 0) >= 20) score += 15
  if (profile.payload?.mbtiType) score += 20
  if (profile.payload?.element) score += 10
  return Math.min(score, 100)
}

function getRecencyScore(createdAt: string): number {
  const days = (Date.now() - new Date(createdAt).getTime()) / 86400000
  if (days < 7) return 100
  if (days < 30) return 70
  if (days < 90) return 40
  return 20
}

const MBTI_TYPES = [
  'INFJ', 'ENTP', 'INTJ', 'ENFP', 'ISTP', 'ESFJ', 'ENTJ', 'INFP', 'ISTJ', 'ENFJ',
  'INTP', 'ESFP', 'ISFJ', 'ESTP', 'ISFP', 'ESTJ', 'INTJ', 'ENFP', 'INFJ', 'ENTP',
]
const ELEMENTS = ['Hỏa', 'Thủy', 'Mộc', 'Kim', 'Thổ']
const CAN_CHI_LIST = [
  'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Đinh Mão', 'Mậu Thìn',
  'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi', 'Nhâm Thân', 'Quý Dậu',
]

const DEMO_NAMES_FEMALE = [
  'Minh Anh', 'Thùy Linh', 'Hà My', 'Bảo Châu', 'Ngọc Anh',
  'Phương Thảo', 'Khánh Linh', 'Thu Trang', 'Mai Lan', 'Hoài Thu',
]
const DEMO_NAMES_MALE = [
  'Minh Khoa', 'Tuấn Anh', 'Bảo Long', 'Hoàng Nam', 'Đức Anh',
  'Việt Hùng', 'Trung Kiên', 'Thanh Tùng', 'Quốc Bảo', 'Hải Đăng',
]

function getDemoSwipedIds(userId: string): Set<string> {
  const swipes: Record<string, string> = JSON.parse(
    localStorage.getItem('p2p_demo_swipes') ?? '{}',
  )
  const ids = new Set<string>()
  for (const key of Object.keys(swipes)) {
    const [from, to] = key.split(':')
    if (from === userId) ids.add(to)
  }
  return ids
}

function getDemoDiscoverDeck(prefs: MyPrefs): DiscoverProfile[] {
  const swipedIds = getDemoSwipedIds(prefs.userId)
  const blockedIds = new Set<string>(
    JSON.parse(localStorage.getItem('p2p_demo_blocked') ?? '[]') as string[],
  )
  const profiles: DiscoverProfile[] = []

  for (let i = 0; i < 20; i++) {
    const userId = `demo_profile_${i}`
    if (swipedIds.has(userId)) continue
    if (blockedIds.has(userId)) continue

    const isFemale = i < 10
    const gender = isFemale ? 'female' : 'male'
    if (prefs.lookingFor !== 'any' && prefs.lookingFor !== gender) continue

    const payload: PersonaPayload = {
      mbtiType: MBTI_TYPES[i],
      element: ELEMENTS[i % 5],
      lifePath: (i % 9) + 1,
      canChi: CAN_CHI_LIST[i % 10],
    }
    const compat = calculateCompat(prefs.myPayload, payload)

    profiles.push({
      userId,
      displayName: isFemale ? DEMO_NAMES_FEMALE[i]! : DEMO_NAMES_MALE[i - 10]!,
      bio: `Mình là ${payload.mbtiType}, ${payload.element}. Thích đọc sách, du lịch và những cuộc trò chuyện thật sự có chiều sâu.`,
      photos: [`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=0A0A0F`],
      gender,
      payload,
      compatScore: compat.total,
      selfieVerified: i % 3 === 0,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    })
  }

  return profiles.sort((a, b) => b.compatScore - a.compatScore)
}
