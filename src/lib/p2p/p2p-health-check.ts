import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'

/**
 * Chạy trong console F12 để verify P0:
 * import('./src/lib/p2p/p2p-health-check').then(m => m.runP2PHealthCheck())
 */
export async function runP2PHealthCheck() {
  console.group('P2P Health Check P0')

  // 1. Kiểm tra env
  console.log('Supabase env:', hasSupabaseEnv ? '✅ có' : '⚠️ chưa có (demo mode)')

  if (!hasSupabaseEnv) {
    console.warn('Thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY → chạy demo mode ở P1')
    console.groupEnd()
    return
  }

  // 2. Kiểm tra connect
  try {
    const { error } = await getSupabaseClient().from('dating_profiles').select('count').limit(0)
    if (error) {
      console.error('❌ Supabase connect lỗi:', error.message)
      console.log('→ Kiểm tra: schema đã chạy chưa? URL/key đúng chưa?')
    } else {
      console.log('✅ Supabase connect OK')
    }
  } catch (e) {
    console.error('❌ Network error:', e)
  }

  // 3. Kiểm tra các bảng tồn tại
  const tables = ['profiles', 'dating_profiles', 'swipes', 'matches', 'messages', 'blocked_users', 'reports']
  for (const table of tables) {
    const { error } = await getSupabaseClient().from(table).select('count').limit(0)
    console.log(`  ${table}:`, error ? `❌ ${error.message}` : '✅')
  }

  console.groupEnd()
}
