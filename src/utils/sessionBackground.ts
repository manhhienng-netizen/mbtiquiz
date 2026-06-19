const NHAT_CHU = ['giap', 'at', 'binh', 'dinh', 'mau', 'ky', 'canh', 'tan', 'nham', 'quy']
const NGU_HANH = ['hoa', 'thuy', 'moc', 'kim', 'tho']

export const SESSION_BG_KEY = 'tncb_session_bg'

export const BG_LIST = NHAT_CHU.flatMap((nc) =>
  NGU_HANH.map((nh) => `bg-${nc}-${nh}.webp`),
)

export function pickRandomBackground(): string {
  return BG_LIST[Math.floor(Math.random() * BG_LIST.length)]
}

export function getSessionBackgroundFile(): string {
  const cached = localStorage.getItem(SESSION_BG_KEY)
  if (cached && BG_LIST.includes(cached)) return cached
  const random = pickRandomBackground()
  localStorage.setItem(SESSION_BG_KEY, random)
  return random
}

export function getSessionBackgroundUrl(): string {
  return `/assets/backgrounds/${getSessionBackgroundFile()}`
}

export function clearSessionBackground(): void {
  localStorage.removeItem(SESSION_BG_KEY)
}
