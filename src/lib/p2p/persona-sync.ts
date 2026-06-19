import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'
import { getLatestMBTI, getSpiritualResult } from '../../db/tncb-db'

export interface DatingPersonaPayload {
  mbtiType?: string
  element?: string
  lifePath?: number
  nhatChu?: string
  canChi?: string
}

export async function readDexiePersona(): Promise<DatingPersonaPayload> {
  const payload: DatingPersonaPayload = {}

  try {
    const mbti = await getLatestMBTI()
    if (mbti?.mbtiType) payload.mbtiType = mbti.mbtiType

    const spiritual = await getSpiritualResult()
    if (spiritual) {
      if (spiritual.element) payload.element = spiritual.element
      if (spiritual.lifePath) payload.lifePath = spiritual.lifePath
      if (spiritual.nhatChu) payload.nhatChu = spiritual.nhatChu
      if (spiritual.canYear && spiritual.chiYear) {
        payload.canChi = `${spiritual.canYear} ${spiritual.chiYear}`
      }
    }
  } catch {
    // Dexie chưa có data → payload rỗng, không crash
  }

  return payload
}

export function isPersonaSufficientForMatch(payload: DatingPersonaPayload): boolean {
  return Boolean(payload.mbtiType)
}

export async function syncPersonaToCloud(userId: string): Promise<{ error?: string }> {
  const payload = await readDexiePersona()

  if (!hasSupabaseEnv) {
    console.log('[P2P Demo] Persona payload:', payload)
    return {}
  }

  const { error } = await getSupabaseClient()
    .from('dating_profiles')
    .update({ payload, updated_at: new Date().toISOString() })
    .eq('user_id', userId)

  return { error: error?.message }
}
