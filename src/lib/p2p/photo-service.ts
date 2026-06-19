import { getSupabaseClient, hasSupabaseEnv } from './supabase-client'

const BUCKET = 'dating-photos'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function uploadDatingPhoto(
  file: File,
  userId: string,
): Promise<{ url?: string; error?: string }> {
  if (file.size > MAX_FILE_SIZE) return { error: 'Ảnh không được vượt quá 5MB' }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: 'Chỉ chấp nhận JPEG, PNG, WebP' }
  }

  if (!hasSupabaseEnv) {
    const url = URL.createObjectURL(file)
    return { url }
  }

  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${userId}/${Date.now()}.${ext}`

  const { error } = await getSupabaseClient().storage.from(BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type,
  })
  if (error) return { error: error.message }

  const { data } = getSupabaseClient().storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl }
}

export async function deleteDatingPhoto(url: string): Promise<void> {
  if (!hasSupabaseEnv) return
  const match = url.match(/dating-photos\/(.+)$/)
  if (!match) return
  await getSupabaseClient().storage.from(BUCKET).remove([match[1]])
}
