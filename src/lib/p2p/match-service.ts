import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'
import type { PersonaPayload } from './compat-engine'

export interface MatchWithProfile {
  matchId: string
  matchedAt: string
  status: 'active' | 'unmatched'
  otherUser: {
    userId: string
    displayName: string
    photos: string[]
    mbtiType?: string
    element?: string
  }
  lastMessage?: {
    content: string
    sentAt: string
    senderId: string
  }
  unreadCount: number
}

interface DemoMessage {
  id: string
  content: string
  sentAt: string
  senderId: string
  readAt?: string
}

interface MatchRow {
  id: string
  user1_id: string
  user2_id: string
  matched_at: string
  status: 'active' | 'unmatched'
}

interface DatingProfileRow {
  user_id: string
  display_name: string
  photos: string[] | null
  payload: PersonaPayload | null
}

export async function getMyMatches(userId: string): Promise<MatchWithProfile[]> {
  if (!hasSupabaseEnv) {
    return getDemoMatches(userId)
  }

  const { data: matches, error } = await getSupabaseClient()
    .from('matches')
    .select('id, user1_id, user2_id, matched_at, status')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .eq('status', 'active')
    .order('matched_at', { ascending: false })

  if (error || !matches) return []

  const [blockedResult, blockedByResult] = await Promise.all([
    getSupabaseClient()
      .from('blocked_users')
      .select('blocked_id')
      .eq('blocker_id', userId),
    getSupabaseClient()
      .from('blocked_users')
      .select('blocker_id')
      .eq('blocked_id', userId),
  ])

  const blockedIds = new Set<string>([
    ...(blockedResult.data ?? []).map((b: { blocked_id: string }) => b.blocked_id),
    ...(blockedByResult.data ?? []).map((b: { blocker_id: string }) => b.blocker_id),
  ])

  const result: MatchWithProfile[] = []

  for (const match of matches as MatchRow[]) {
    const otherId = match.user1_id === userId ? match.user2_id : match.user1_id
    if (blockedIds.has(otherId)) continue

    const { data: profile } = await getSupabaseClient()
      .from('dating_profiles')
      .select('user_id, display_name, photos, payload')
      .eq('user_id', otherId)
      .single()

    const typedProfile = profile as DatingProfileRow | null

    const { data: lastMsg } = await getSupabaseClient()
      .from('messages')
      .select('content, sent_at, sender_id')
      .eq('match_id', match.id)
      .order('sent_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    const { count: unreadCount } = await getSupabaseClient()
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('match_id', match.id)
      .neq('sender_id', userId)
      .is('read_at', null)

    const last = lastMsg as {
      content: string
      sent_at: string
      sender_id: string
    } | null

    result.push({
      matchId: match.id,
      matchedAt: match.matched_at,
      status: match.status,
      otherUser: {
        userId: otherId,
        displayName: typedProfile?.display_name ?? 'Người dùng',
        photos: typedProfile?.photos ?? [],
        mbtiType: typedProfile?.payload?.mbtiType,
        element: typedProfile?.payload?.element,
      },
      lastMessage: last
        ? {
            content: last.content,
            sentAt: last.sent_at,
            senderId: last.sender_id,
          }
        : undefined,
      unreadCount: unreadCount ?? 0,
    })
  }

  return result
}

function getDemoMatches(userId: string): MatchWithProfile[] {
  const matchIds: string[] = JSON.parse(
    localStorage.getItem('p2p_demo_matches') ?? '[]',
  )

  const DEMO_NAMES = ['Minh Anh', 'Thùy Linh', 'Hà My', 'Bảo Châu', 'Hoàng Nam']
  const MBTI_TYPES = ['INFJ', 'ENTP', 'ISFP', 'ENTJ', 'INTP']
  const ELEMENTS = ['Hỏa', 'Thủy', 'Mộc', 'Kim', 'Thổ']

  const blockedIds = new Set<string>(
    JSON.parse(localStorage.getItem('p2p_demo_blocked') ?? '[]') as string[],
  )

  return matchIds.slice(0, 10).map((matchId, i) => {
    const msgKey = `p2p_demo_msgs_${matchId}`
    const msgs: DemoMessage[] = JSON.parse(localStorage.getItem(msgKey) ?? '[]')
    const lastMsg = msgs[msgs.length - 1]
    const unread = msgs.filter((m) => m.senderId !== userId && !m.readAt).length

    return {
      matchId,
      matchedAt: new Date(Date.now() - i * 3600000).toISOString(),
      status: 'active' as const,
      otherUser: {
        userId: `demo_profile_${i}`,
        displayName: DEMO_NAMES[i % DEMO_NAMES.length]!,
        photos: [
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}&backgroundColor=0A0A0F`,
        ],
        mbtiType: MBTI_TYPES[i % MBTI_TYPES.length],
        element: ELEMENTS[i % ELEMENTS.length],
      },
      lastMessage: lastMsg
        ? {
            content: lastMsg.content,
            sentAt: lastMsg.sentAt,
            senderId: lastMsg.senderId,
          }
        : undefined,
      unreadCount: unread,
    }
  }).filter((m) => !blockedIds.has(m.otherUser.userId))
}
