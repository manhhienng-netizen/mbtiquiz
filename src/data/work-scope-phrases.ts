export const WORK_SCOPE_PHRASES = {
  scopeNudge: [
    'Chủ đề này /assistant/chat có thể giúp sâu hơn — mình ở đây tập trung về công việc.',
    'Nghe có vẻ là chuyện đời sống hơn — /assistant/chat sẽ phù hợp hơn cho chủ đề này.',
  ],

  welcomeTip: [
    '(WA tập trung: nghề nghiệp · xử lý tình huống công việc · phát triển kỹ năng — /assistant/chat cho chuyện đời sống)',
  ],

  idlePrompt: [
    'Bạn đang xử lý tình huống gì trong công việc gần đây không?',
    'Có vấn đề nào ở công việc bạn đang muốn nghĩ qua không?',
    'Gần đây có gì ở công việc đang cần xử lý không?',
  ],
} as const

export type WorkScopePhraseKey = keyof typeof WORK_SCOPE_PHRASES

export function pickScopePhrase(
  key: WorkScopePhraseKey,
  recentReplies: string[] = [],
): string {
  const list = [...WORK_SCOPE_PHRASES[key]]
  const unused = list.filter(
    (p) => !recentReplies.some((r) => r.includes(p.slice(0, 20))),
  )
  const pool = unused.length > 0 ? unused : list
  return pool[Math.floor(Math.random() * pool.length)]!
}
