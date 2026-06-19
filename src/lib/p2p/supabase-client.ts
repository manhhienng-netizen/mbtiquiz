import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

let client: SupabaseClient | null = null

/** Lazy singleton — chỉ init khi env đủ và có code gọi Supabase thật. */
export function getSupabaseClient(): SupabaseClient {
  if (!hasSupabaseEnv) {
    throw new Error(
      'Supabase chưa cấu hình: thiếu VITE_SUPABASE_URL hoặc VITE_SUPABASE_ANON_KEY. ' +
        'Thêm vào .env hoặc dùng demo mode (hasSupabaseEnv === false).',
    )
  }
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}
