import { useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { useHomeNav } from '../contexts/HomeNavContext'

export type AssistantSwitcherId = 'personal' | 'work' | 'match'

export const ASSISTANT_SWITCHER_HEIGHT = 44

interface AssistantSwitcherProps {
  active: AssistantSwitcherId
  crisisActive?: boolean
}

const ASSISTANTS: {
  id: AssistantSwitcherId
  icon: string
  label: string
  route: string
  blend: 'screen'
}[] = [
  {
    id: 'personal',
    icon: '/assets/icons/PA.png',
    label: 'Cá nhân',
    route: '/assistant/chat',
    blend: 'screen',
  },
  {
    id: 'work',
    icon: '/assets/icons/WA.png',
    label: 'Công việc',
    route: '/work/chat',
    blend: 'screen',
  },
  {
    id: 'match',
    icon: '/assets/icons/MA.png',
    label: 'Tâm tính',
    route: '/match/chat',
    blend: 'screen',
  },
]

const navStyle: CSSProperties = {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'stretch',
  height: ASSISTANT_SWITCHER_HEIGHT,
  borderTop: '1px solid rgba(255,255,255,0.06)',
  background: 'rgba(10,10,15,0.88)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  zIndex: 40,
}

const buttonBase: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  padding: '6px 4px',
  margin: 0,
  border: 'none',
  borderBottom: '2px solid transparent',
  background: 'none',
  cursor: 'pointer',
  fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
  transition: 'color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease',
  minWidth: 0,
}

export function hasActiveCrisisSupport(
  messages: ReadonlyArray<{
    role: string
    crisisSupport?: boolean
    content: string
  }>,
): boolean {
  return messages.some(
    (m) =>
      m.role === 'assistant' && m.crisisSupport && m.content.trim() !== '',
  )
}

export default function AssistantSwitcher({
  active,
  crisisActive = false,
}: AssistantSwitcherProps) {
  const navigate = useNavigate()
  const { suppressHomeButton } = useHomeNav()

  if (suppressHomeButton || crisisActive) return null

  return (
    <nav
      style={navStyle}
      aria-label="Chuyển đồng hành"
    >
      {ASSISTANTS.map((assistant) => {
        const isActive = assistant.id === active
        return (
          <button
            key={assistant.id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              if (!isActive) navigate(assistant.route)
            }}
            style={{
              ...buttonBase,
              color: isActive
                ? 'rgba(255,255,255,0.92)'
                : 'rgba(255,255,255,0.5)',
              borderBottomColor: isActive
                ? 'rgba(127,119,221,0.85)'
                : 'transparent',
              opacity: isActive ? 1 : 0.85,
            }}
          >
            <img
              src={assistant.icon}
              alt=""
              aria-hidden
              style={{
                width: 24,
                height: 24,
                objectFit: 'contain',
                mixBlendMode: assistant.blend,
                opacity: isActive ? 1 : 0.65,
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 600 : 500,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}
            >
              {assistant.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
