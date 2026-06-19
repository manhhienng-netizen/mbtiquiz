import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'

export type SwipeAction = 'like' | 'pass'

export interface SwipeResult {
  recorded: boolean
  isMatch: boolean
  matchId?: string
  error?: string
}

export async function recordSwipe(
  fromUserId: string,
  toUserId: string,
  action: SwipeAction,
): Promise<SwipeResult> {
  if (!hasSupabaseEnv) {
    return recordDemoSwipe(fromUserId, toUserId, action)
  }

  const { error: swipeError } = await getSupabaseClient()
    .from('swipes')
    .upsert(
      { from_user_id: fromUserId, to_user_id: toUserId, action },
      { onConflict: 'from_user_id,to_user_id' },
    )

  if (swipeError) {
    return { recorded: false, isMatch: false, error: swipeError.message }
  }

  if (action === 'like') {
    const { data: reciprocal } = await getSupabaseClient()
      .from('swipes')
      .select('id')
      .eq('from_user_id', toUserId)
      .eq('to_user_id', fromUserId)
      .eq('action', 'like')
      .maybeSingle()

    if (reciprocal) {
      const [u1, u2] = [fromUserId, toUserId].sort()
      const { data: match, error: matchError } = await getSupabaseClient()
        .from('matches')
        .upsert(
          { user1_id: u1, user2_id: u2, status: 'active' },
          { onConflict: 'user1_id,user2_id' },
        )
        .select('id')
        .single()

      if (matchError) return { recorded: true, isMatch: false }
      return { recorded: true, isMatch: true, matchId: match.id }
    }
  }

  return { recorded: true, isMatch: false }
}

function recordDemoSwipe(
  fromUserId: string,
  toUserId: string,
  action: SwipeAction,
): SwipeResult {
  const key = 'p2p_demo_swipes'
  const swipes: Record<string, SwipeAction> = JSON.parse(
    localStorage.getItem(key) ?? '{}',
  )
  swipes[`${fromUserId}:${toUserId}`] = action
  localStorage.setItem(key, JSON.stringify(swipes))

  if (action === 'like') {
    const reciprocalKey = `${toUserId}:${fromUserId}`
    if (
      swipes[reciprocalKey] === 'like' ||
      (toUserId.startsWith('demo_profile') && Math.random() < 0.3)
    ) {
      const matchId = `demo_match_${fromUserId}_${toUserId}`
      const matches: string[] = JSON.parse(
        localStorage.getItem('p2p_demo_matches') ?? '[]',
      )
      if (!matches.includes(matchId)) {
        matches.push(matchId)
        localStorage.setItem('p2p_demo_matches', JSON.stringify(matches))
      }
      return { recorded: true, isMatch: true, matchId }
    }
  }

  return { recorded: true, isMatch: false }
}
