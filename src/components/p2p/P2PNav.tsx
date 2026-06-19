import { useLocation, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  {
    path: '/discover',
    icon: '/assets/icons/P2P.png',
    label: 'Khám phá',
    blend: 'screen' as const,
  },
  {
    path: '/matches',
    icon: '/assets/icons/MA.png',
    label: 'Matches',
    blend: 'screen' as const,
  },
]

export default function P2PNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isP2PRoute = ['/discover', '/matches', '/chat'].some((r) =>
    pathname.startsWith(r),
  )
  if (!isP2PRoute) return null

  if (pathname.startsWith('/chat/')) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0F]/95 backdrop-blur border-t border-white/8 flex safe-area-bottom z-40">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path
        return (
          <button
            key={item.path}
            type="button"
            onClick={() => navigate(item.path)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
              isActive ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            <img
              src={item.icon}
              alt=""
              aria-hidden
              className="w-6 h-6 object-contain"
              style={{
                mixBlendMode: item.blend,
                opacity: isActive ? 1 : 0.65,
              }}
            />
            <span className="text-xs">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
