import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'

export type ReportReason =
  | 'spam'
  | 'harassment'
  | 'fake_profile'
  | 'inappropriate_content'
  | 'other'

export const REPORT_REASON_LABELS: Record<ReportReason, string> = {
  spam: 'Spam / quảng cáo',
  harassment: 'Quấy rối / đe dọa',
  fake_profile: 'Hồ sơ giả mạo',
  inappropriate_content: 'Nội dung không phù hợp',
  other: 'Lý do khác',
}

const DEMO_BLOCKED_KEY = 'p2p_demo_blocked'

export async function blockUser(
  blockerId: string,
  blockedId: string,
): Promise<{ error?: string }> {
  if (!hasSupabaseEnv) {
    const blocked: string[] = JSON.parse(localStorage.getItem(DEMO_BLOCKED_KEY) ?? '[]')
    if (!blocked.includes(blockedId)) {
      blocked.push(blockedId)
      localStorage.setItem(DEMO_BLOCKED_KEY, JSON.stringify(blocked))
    }
    return {}
  }

  const { error } = await getSupabaseClient()
    .from('blocked_users')
    .upsert(
      { blocker_id: blockerId, blocked_id: blockedId },
      { onConflict: 'blocker_id,blocked_id' },
    )

  return { error: error?.message }
}

export async function unblockUser(
  blockerId: string,
  blockedId: string,
): Promise<void> {
  if (!hasSupabaseEnv) {
    const blocked: string[] = JSON.parse(localStorage.getItem(DEMO_BLOCKED_KEY) ?? '[]')
    localStorage.setItem(
      DEMO_BLOCKED_KEY,
      JSON.stringify(blocked.filter((id) => id !== blockedId)),
    )
    return
  }

  await getSupabaseClient()
    .from('blocked_users')
    .delete()
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId)
}

export async function isBlocked(blockerId: string, blockedId: string): Promise<boolean> {
  if (!hasSupabaseEnv) {
    const blocked: string[] = JSON.parse(localStorage.getItem(DEMO_BLOCKED_KEY) ?? '[]')
    return blocked.includes(blockedId)
  }

  const { data } = await getSupabaseClient()
    .from('blocked_users')
    .select('blocked_id')
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId)
    .maybeSingle()

  return Boolean(data)
}

export async function getBlockedIds(blockerId: string): Promise<string[]> {
  if (!hasSupabaseEnv) {
    return JSON.parse(localStorage.getItem(DEMO_BLOCKED_KEY) ?? '[]') as string[]
  }

  const { data } = await getSupabaseClient()
    .from('blocked_users')
    .select('blocked_id')
    .eq('blocker_id', blockerId)

  return (data ?? []).map((r) => r.blocked_id as string)
}

export async function reportUser(
  reporterId: string,
  reportedId: string,
  reason: ReportReason,
): Promise<{ error?: string }> {
  if (!hasSupabaseEnv) {
    console.log('[P2P Demo] Report:', { reporterId, reportedId, reason })
    await blockUser(reporterId, reportedId)
    return {}
  }

  const { error } = await getSupabaseClient()
    .from('reports')
    .insert({ reporter_id: reporterId, reported_id: reportedId, reason })

  if (error) return { error: error.message }

  await blockUser(reporterId, reportedId)

  const { error: rpcError } = await getSupabaseClient().rpc('increment_report_count', {
    target_user_id: reportedId,
  })

  if (rpcError) {
    const { data: profile } = await getSupabaseClient()
      .from('dating_profiles')
      .select('report_count')
      .eq('user_id', reportedId)
      .single()

    if (profile) {
      const nextCount = (profile.report_count ?? 0) + 1
      await getSupabaseClient()
        .from('dating_profiles')
        .update({
          report_count: nextCount,
          is_active: nextCount < 3,
        })
        .eq('user_id', reportedId)
    }
  }

  return {}
}

export async function unmatchAndBlock(
  userId: string,
  matchId: string,
  otherUserId: string,
): Promise<{ error?: string }> {
  if (!hasSupabaseEnv) {
    const matches: string[] = JSON.parse(
      localStorage.getItem('p2p_demo_matches') ?? '[]',
    )
    localStorage.setItem(
      'p2p_demo_matches',
      JSON.stringify(matches.filter((id) => id !== matchId)),
    )
    await blockUser(userId, otherUserId)
    return {}
  }

  const { error } = await getSupabaseClient()
    .from('matches')
    .update({ status: 'unmatched' })
    .eq('id', matchId)

  if (error) return { error: error.message }

  await blockUser(userId, otherUserId)

  return {}
}
