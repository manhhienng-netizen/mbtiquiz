import { useLocation } from 'react-router-dom'
import { ASSISTANT_SWITCHER_HEIGHT } from './AssistantSwitcher'
import HomeButton from './HomeButton'
import { useHomeNav } from '../contexts/HomeNavContext'

const HIDDEN_PATHS = new Set(['/home'])

const SAFE_BOTTOM = 'max(12px, env(safe-area-inset-bottom, 0px))'

function isQuizFlowPath(pathname: string): boolean {
  if (pathname === '/explore') return true
  if (pathname === '/quiz') return true
  if (pathname.startsWith('/quiz/')) return true
  return false
}

function isAssistantChatPath(pathname: string): boolean {
  return (
    pathname === '/assistant/chat' ||
    pathname === '/work/chat' ||
    pathname === '/match/chat'
  )
}

function isChatInputPath(pathname: string): boolean {
  return isAssistantChatPath(pathname) || pathname.startsWith('/chat/')
}

function isP2PNavPath(pathname: string): boolean {
  return pathname === '/discover' || pathname === '/matches'
}

/** Float above bottom bars so 🏠 never covers Gửi, P2PNav, or swipe actions. */
function getHomeButtonBottom(pathname: string): string {
  if (isP2PNavPath(pathname)) {
    return `calc(64px + ${SAFE_BOTTOM})`
  }
  if (isChatInputPath(pathname)) {
    const inputBar = 72
    const switcher = isAssistantChatPath(pathname) ? ASSISTANT_SWITCHER_HEIGHT : 0
    return `calc(${inputBar + switcher}px + ${SAFE_BOTTOM})`
  }
  return `max(16px, env(safe-area-inset-bottom, 0px))`
}

export default function HomeButtonGate() {
  const { pathname } = useLocation()
  const { suppressHomeButton } = useHomeNav()

  if (HIDDEN_PATHS.has(pathname)) return null
  if (isQuizFlowPath(pathname)) return null
  if (suppressHomeButton) return null

  return <HomeButton bottom={getHomeButtonBottom(pathname)} />
}
