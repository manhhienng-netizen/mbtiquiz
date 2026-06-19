import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'

export interface P2PUser {
  id: string
  phone: string
}

function normalizePhoneForSupabase(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (phone.startsWith('+')) return `+${digits}`
  if (digits.startsWith('84')) return `+${digits}`
  return `+84${digits.replace(/^0/, '')}`
}

// Gửi OTP (Supabase thật hoặc demo)
export async function sendPhoneOtp(phone: string): Promise<{ error?: string }> {
  if (!hasSupabaseEnv) {
    console.log('[P2P Demo] OTP gửi tới', phone, '→ dùng bất kỳ token ≥4 ký tự')
    return {}
  }
  const { error } = await getSupabaseClient().auth.signInWithOtp({
    phone: normalizePhoneForSupabase(phone),
  })
  return { error: error?.message }
}

// Verify OTP
export async function verifyPhoneOtp(
  phone: string,
  token: string,
): Promise<{ user?: P2PUser; error?: string }> {
  if (!hasSupabaseEnv) {
    if (token.length < 4) return { error: 'Mã xác nhận phải có ít nhất 4 ký tự' }
    const demoUser: P2PUser = { id: `demo_${phone.replace(/\D/g, '')}`, phone }
    localStorage.setItem('p2p_demo_user', JSON.stringify(demoUser))
    return { user: demoUser }
  }
  const normalizedPhone = normalizePhoneForSupabase(phone)
  const { data, error } = await getSupabaseClient().auth.verifyOtp({
    phone: normalizedPhone,
    token,
    type: 'sms',
  })
  if (error || !data.user) return { error: error?.message ?? 'Xác nhận thất bại' }
  return { user: { id: data.user.id, phone: normalizedPhone } }
}

// Lấy user hiện tại
export async function getCurrentP2PUser(): Promise<P2PUser | null> {
  if (!hasSupabaseEnv) {
    const raw = localStorage.getItem('p2p_demo_user')
    return raw ? (JSON.parse(raw) as P2PUser) : null
  }
  const { data } = await getSupabaseClient().auth.getUser()
  if (!data.user) return null
  const phone = data.user.phone ?? ''
  return { id: data.user.id, phone }
}

// Đăng xuất
export async function signOutP2P(): Promise<void> {
  if (!hasSupabaseEnv) {
    localStorage.removeItem('p2p_demo_user')
    return
  }
  await getSupabaseClient().auth.signOut()
}

// Upsert profiles row (tạo nếu chưa có)
export async function ensureProfile(user: P2PUser): Promise<void> {
  if (!hasSupabaseEnv) return
  await getSupabaseClient()
    .from('profiles')
    .upsert({ id: user.id, phone: user.phone }, { onConflict: 'id' })
}
