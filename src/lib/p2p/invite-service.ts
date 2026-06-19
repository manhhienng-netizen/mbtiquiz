/**
 * TNCB P2P — Invite Link Service
 * Triết lý: cả 2 tự làm quiz → consent → so sánh
 * Không nhập data hộ người khác
 */

import type { NavigateFunction } from 'react-router-dom'
import { getLatestMBTI, getSpiritualResult } from '../../db/tncb-db'
import { getCurrentP2PUser } from './auth-service'
import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'

export interface InvitePersona {
  name?: string
  mbtiType?: string
  element?: string
  lifePath?: number
  lifePathNumber?: number
  nhatChu?: string
  canChi?: string
}

export interface InviteRecord {
  id: string
  invite_code: string
  inviter_user_id: string
  inviter_persona: InvitePersona | null
  invitee_persona: InvitePersona | null
  status: 'pending' | 'completed' | 'expired'
  created_at: string
  expires_at: string
  completed_at: string | null
}

const DEMO_INVITES_KEY = 'tncb_invites'
const INVITE_CODE_KEY = 'tncb_invite_code'
const LOCAL_ID_KEY = 'tncb_local_id'

function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  return Array.from({ length: 8 }, () =>
    chars[Math.floor(Math.random() * chars.length)],
  ).join('')
}

function readDemoInvites(): InviteRecord[] {
  try {
    const raw = localStorage.getItem(DEMO_INVITES_KEY)
    return raw ? (JSON.parse(raw) as InviteRecord[]) : []
  } catch {
    return []
  }
}

function writeDemoInvites(invites: InviteRecord[]): void {
  localStorage.setItem(DEMO_INVITES_KEY, JSON.stringify(invites))
}

function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date()
}

function normalizeInvite(record: InviteRecord): InviteRecord {
  if (isExpired(record.expires_at) && record.status === 'pending') {
    return { ...record, status: 'expired' }
  }
  return record
}

export async function buildInvitePersona(): Promise<InvitePersona> {
  const persona: InvitePersona = {}

  try {
    const mbti = await getLatestMBTI()
    if (mbti?.mbtiType) persona.mbtiType = mbti.mbtiType

    const spiritual = await getSpiritualResult()
    if (spiritual) {
      if (spiritual.fullName) persona.name = spiritual.fullName
      if (spiritual.element) persona.element = spiritual.element
      if (spiritual.lifePath) {
        persona.lifePath = spiritual.lifePath
        persona.lifePathNumber = spiritual.lifePath
      }
      if (spiritual.nhatChu) persona.nhatChu = spiritual.nhatChu
      if (spiritual.canYear && spiritual.chiYear) {
        persona.canChi = `${spiritual.canYear} ${spiritual.chiYear}`
      }
    }
  } catch {
    // Dexie chưa có data
  }

  return persona
}

async function resolveInviterUserId(): Promise<string> {
  const user = await getCurrentP2PUser()
  if (user) return user.id

  let localId = localStorage.getItem(LOCAL_ID_KEY)
  if (!localId) {
    localId = `local_${Date.now()}`
    localStorage.setItem(LOCAL_ID_KEY, localId)
  }
  return localId
}

function createDemoInvite(
  inviterUserId: string,
  inviterPersona: InvitePersona,
): { code: string; url: string } {
  const invite_code = generateInviteCode()
  const now = new Date()
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const record: InviteRecord = {
    id: crypto.randomUUID(),
    invite_code,
    inviter_user_id: inviterUserId,
    inviter_persona: inviterPersona,
    invitee_persona: null,
    status: 'pending',
    created_at: now.toISOString(),
    expires_at: expires.toISOString(),
    completed_at: null,
  }

  const invites = readDemoInvites()
  invites.push(record)
  writeDemoInvites(invites)

  return {
    code: invite_code,
    url: `${window.location.origin}/invite/${invite_code}`,
  }
}

async function shouldUseSupabaseInsert(inviterUserId: string): Promise<boolean> {
  if (!hasSupabaseEnv) return false
  if (inviterUserId.startsWith('local_') || inviterUserId.startsWith('demo_')) {
    return false
  }
  try {
    const { data } = await getSupabaseClient().auth.getUser()
    return Boolean(data.user)
  } catch {
    return false
  }
}

export async function createInvite(
  inviterUserId: string,
  inviterPersona: InvitePersona,
): Promise<{ code: string; url: string } | null> {
  const invite_code = generateInviteCode()
  const url = `${window.location.origin}/invite/${invite_code}`

  if (await shouldUseSupabaseInsert(inviterUserId)) {
    const { error } = await getSupabaseClient().from('invites').insert({
      invite_code,
      inviter_user_id: inviterUserId,
      inviter_persona: inviterPersona,
    })

    if (error) {
      console.error('createInvite error:', error)
      return createDemoInvite(inviterUserId, inviterPersona)
    }

    return { code: invite_code, url }
  }

  return createDemoInvite(inviterUserId, inviterPersona)
}

async function getInviteFromSupabase(code: string): Promise<InviteRecord | null> {
  const { data, error } = await getSupabaseClient()
    .from('invites')
    .select('*')
    .eq('invite_code', code)
    .maybeSingle()

  if (error || !data) return null

  const invite = normalizeInvite(data as InviteRecord)

  if (invite.status === 'expired' && data.status === 'pending') {
    await getSupabaseClient()
      .from('invites')
      .update({ status: 'expired' })
      .eq('invite_code', code)
  }

  return invite
}

function getInviteFromDemo(code: string): InviteRecord | null {
  const invites = readDemoInvites()
  const idx = invites.findIndex((i) => i.invite_code === code)
  if (idx < 0) return null

  const invite = normalizeInvite(invites[idx])
  if (invite.status === 'expired' && invites[idx].status === 'pending') {
    invites[idx] = { ...invites[idx], status: 'expired' }
    writeDemoInvites(invites)
  }

  return invite
}

export async function getInviteByCode(code: string): Promise<InviteRecord | null> {
  if (hasSupabaseEnv) {
    const remote = await getInviteFromSupabase(code)
    if (remote) return remote
  }
  return getInviteFromDemo(code)
}

async function submitInviteeToSupabase(
  code: string,
  inviteePersona: InvitePersona,
): Promise<boolean> {
  const { error } = await getSupabaseClient()
    .from('invites')
    .update({
      invitee_persona: inviteePersona,
      status: 'completed',
      completed_at: new Date().toISOString(),
    })
    .eq('invite_code', code)
    .eq('status', 'pending')

  if (error) {
    console.error('submitInviteePersona error:', error)
    return false
  }
  return true
}

function submitInviteeToDemo(code: string, inviteePersona: InvitePersona): boolean {
  const invites = readDemoInvites()
  const idx = invites.findIndex((i) => i.invite_code === code && i.status === 'pending')
  if (idx < 0) return false

  invites[idx] = {
    ...invites[idx],
    invitee_persona: inviteePersona,
    status: 'completed',
    completed_at: new Date().toISOString(),
  }
  writeDemoInvites(invites)
  return true
}

export async function submitInviteePersona(
  code: string,
  inviteePersona: InvitePersona,
): Promise<boolean> {
  const existing = await getInviteByCode(code)
  if (!existing || existing.status !== 'pending') return false

  if (hasSupabaseEnv) {
    const ok = await submitInviteeToSupabase(code, inviteePersona)
    if (ok) return true
  }

  return submitInviteeToDemo(code, inviteePersona)
}

export async function checkInviteStatus(
  code: string,
): Promise<'pending' | 'completed' | 'expired' | null> {
  const invite = await getInviteByCode(code)
  return invite?.status ?? null
}

export async function tryCompleteInviteFlow(
  navigate: NavigateFunction,
): Promise<boolean> {
  const inviteCode = localStorage.getItem(INVITE_CODE_KEY)
  if (!inviteCode) return false

  const persona = await buildInvitePersona()
  if (!persona.mbtiType) return false

  const success = await submitInviteePersona(inviteCode, persona)
  if (!success) return false

  localStorage.removeItem(INVITE_CODE_KEY)
  navigate(`/compare/${inviteCode}`, { replace: true })
  return true
}

export async function createAndCopyInviteLink(): Promise<boolean> {
  const persona = await buildInvitePersona()
  if (!persona.mbtiType) {
    alert('Hoàn thành quiz trước khi tạo link mời.')
    return false
  }

  const userId = await resolveInviterUserId()
  const result = await createInvite(userId, persona)
  if (!result) {
    alert('Không tạo được link. Thử lại.')
    return false
  }

  try {
    await navigator.clipboard.writeText(result.url)
    alert(`Đã copy link!\n\n${result.url}`)
  } catch {
    alert(`Link mời của bạn:\n\n${result.url}`)
  }

  return true
}
