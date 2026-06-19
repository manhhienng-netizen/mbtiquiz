import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface ChatMessage {
  id: string
  matchId: string
  senderId: string
  content: string
  sentAt: string
  readAt?: string
}

export const P2P_DEMO_MESSAGES_EVENT = 'p2p-demo-messages-updated'

function demoMessagesKey(matchId: string): string {
  return `p2p_demo_msgs_${matchId}`
}

function notifyDemoMessagesUpdated(matchId: string): void {
  window.dispatchEvent(
    new CustomEvent(P2P_DEMO_MESSAGES_EVENT, { detail: { matchId } }),
  )
  window.dispatchEvent(
    new StorageEvent('storage', { key: demoMessagesKey(matchId) }),
  )
}

export async function getMessages(matchId: string): Promise<ChatMessage[]> {
  if (!hasSupabaseEnv) {
    return getDemoMessages(matchId)
  }

  const { data, error } = await getSupabaseClient()
    .from('messages')
    .select('id, match_id, sender_id, content, sent_at, read_at')
    .eq('match_id', matchId)
    .order('sent_at', { ascending: true })
    .limit(100)

  if (error || !data) return []

  return data.map((m) => ({
    id: m.id as string,
    matchId: m.match_id as string,
    senderId: m.sender_id as string,
    content: m.content as string,
    sentAt: m.sent_at as string,
    readAt: (m.read_at as string | null) ?? undefined,
  }))
}

export async function sendMessage(
  matchId: string,
  senderId: string,
  content: string,
): Promise<{ message?: ChatMessage; error?: string }> {
  if (!hasSupabaseEnv) {
    return sendDemoMessage(matchId, senderId, content)
  }

  const { data, error } = await getSupabaseClient()
    .from('messages')
    .insert({ match_id: matchId, sender_id: senderId, content })
    .select()
    .single()

  if (error) return { error: error.message }

  return {
    message: {
      id: data.id as string,
      matchId: data.match_id as string,
      senderId: data.sender_id as string,
      content: data.content as string,
      sentAt: data.sent_at as string,
      readAt: (data.read_at as string | null) ?? undefined,
    },
  }
}

export async function markAsRead(matchId: string, userId: string): Promise<void> {
  if (!hasSupabaseEnv) {
    markDemoAsRead(matchId, userId)
    return
  }

  await getSupabaseClient()
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('match_id', matchId)
    .neq('sender_id', userId)
    .is('read_at', null)
}

export function subscribeToMessages(
  matchId: string,
  onNewMessage: (msg: ChatMessage) => void,
): RealtimeChannel | null {
  if (!hasSupabaseEnv) return null

  const channel = getSupabaseClient()
    .channel(`match-${matchId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `match_id=eq.${matchId}`,
      },
      (payload) => {
        const row = payload.new as {
          id: string
          match_id: string
          sender_id: string
          content: string
          sent_at: string
          read_at: string | null
        }
        onNewMessage({
          id: row.id,
          matchId: row.match_id,
          senderId: row.sender_id,
          content: row.content,
          sentAt: row.sent_at,
          readAt: row.read_at ?? undefined,
        })
      },
    )
    .subscribe()

  return channel
}

export function unsubscribeChannel(channel: RealtimeChannel | null): void {
  if (channel) void getSupabaseClient().removeChannel(channel)
}

function getDemoMessages(matchId: string): ChatMessage[] {
  const key = demoMessagesKey(matchId)
  return JSON.parse(localStorage.getItem(key) ?? '[]') as ChatMessage[]
}

function sendDemoMessage(
  matchId: string,
  senderId: string,
  content: string,
): { message: ChatMessage } {
  const key = demoMessagesKey(matchId)
  const msgs: ChatMessage[] = JSON.parse(localStorage.getItem(key) ?? '[]')

  const message: ChatMessage = {
    id: `demo_msg_${Date.now()}`,
    matchId,
    senderId,
    content,
    sentAt: new Date().toISOString(),
  }

  msgs.push(message)
  localStorage.setItem(key, JSON.stringify(msgs))
  notifyDemoMessagesUpdated(matchId)

  setTimeout(() => {
    const botReplies = [
      'Ừ, mình cũng vậy!',
      'Thật sao? Kể thêm đi bạn',
      'Haha nghe hay đấy',
      'Mình cũng hay như vậy 😄',
      'Bạn thích gì ngoài điều đó không?',
    ]
    const botMsg: ChatMessage = {
      id: `demo_msg_${Date.now()}_bot`,
      matchId,
      senderId: `demo_other_${matchId}`,
      content: botReplies[Math.floor(Math.random() * botReplies.length)]!,
      sentAt: new Date().toISOString(),
    }
    const updated: ChatMessage[] = JSON.parse(localStorage.getItem(key) ?? '[]')
    updated.push(botMsg)
    localStorage.setItem(key, JSON.stringify(updated))
    notifyDemoMessagesUpdated(matchId)
  }, 1500)

  return { message }
}

function markDemoAsRead(matchId: string, userId: string): void {
  const key = demoMessagesKey(matchId)
  const msgs: ChatMessage[] = JSON.parse(localStorage.getItem(key) ?? '[]')
  const updated = msgs.map((m) =>
    m.senderId !== userId && !m.readAt
      ? { ...m, readAt: new Date().toISOString() }
      : m,
  )
  localStorage.setItem(key, JSON.stringify(updated))
}
