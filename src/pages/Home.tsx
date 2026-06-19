import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModuleCarousel, { MODULES } from '../components/ModuleCarousel'
import { getLatestMBTI } from '../db/tncb-db'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import { pickRandomBackground } from '../utils/sessionBackground'

const HOME_FONT = "'Be Vietnam Pro', system-ui, sans-serif"

export default function Home() {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const [headerText, setHeaderText] = useState('Trang chủ')
  const bgFile = useMemo(() => pickRandomBackground(), [])
  const bgUrl = `/assets/backgrounds/${bgFile}`

  useEffect(() => {
    void getLatestMBTI().then((result) => {
      const type = result?.mbtiType?.trim()
      if (!type) {
        setHeaderText('Trang chủ')
        return
      }
      const nickname = TNCB_TYPE_CONTENT[type]?.nickname
      setHeaderText(nickname ? `${type} · ${nickname}` : type)
    })
  }, [])

  const activeModule = MODULES[activeIndex]
  const currentAccent = activeModule.accent

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#07070D',
        overflow: 'hidden',
        fontFamily: HOME_FONT,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 18%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: -80,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(192,184,212,0.15) 0%, rgba(192,184,212,0.04) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: `linear-gradient(180deg,
            rgba(7,7,13,0.25) 0%,
            rgba(7,7,13,0.55) 30%,
            rgba(7,7,13,0.85) 55%,
            rgba(7,7,13,1) 75%)`,
        }}
      />

      <div
        className="min-h-screen flex flex-col"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="max-w-lg mx-auto w-full px-4 py-8 flex-1 flex flex-col">
          <h1
            className="text-center text-lg font-semibold mb-2"
            style={{ color: 'rgba(255,255,255,.95)' }}
          >
            Trang chủ TNCB
          </h1>

          <p
            className="text-center text-sm mb-8"
            style={{ color: 'rgba(255,255,255,.6)' }}
          >
            {headerText}
          </p>

          <ModuleCarousel
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
          />

          <div
            style={{
              marginTop: 40,
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 16,
              padding: '20px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: 8 }}>
              {'emoji' in activeModule && activeModule.emoji ? (
                <span style={{ fontSize: 40, lineHeight: 1 }} aria-hidden>
                  {activeModule.emoji}
                </span>
              ) : 'icon' in activeModule ? (
                <img
                  src={activeModule.icon}
                  alt={activeModule.label}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: 'contain',
                    borderRadius: '50%',
                  }}
                />
              ) : null}
            </div>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>
              {activeModule.label}
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,.6)',
                marginTop: 4,
              }}
            >
              {activeModule.desc}
            </p>
            <button
              type="button"
              onClick={() => navigate(activeModule.route)}
              className="w-full transition-colors"
              style={{
                marginTop: 16,
                background: `${currentAccent}33`,
                border: `1px solid ${currentAccent}80`,
                color: currentAccent,
                borderRadius: 12,
                padding: 12,
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Mở
            </button>
          </div>

          <div
            className="flex justify-center"
            style={{ gap: 8, marginTop: 16 }}
          >
            {MODULES.map((mod, i) => (
              <button
                key={mod.id}
                type="button"
                aria-label={`Chọn ${mod.label}`}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  padding: 0,
                  border: 'none',
                  cursor: 'pointer',
                  background: i === activeIndex ? currentAccent : 'rgba(255,255,255,.2)',
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>

          <footer className="flex justify-center" style={{ marginTop: 32 }}>
            <button
              type="button"
              onClick={() => navigate('/quiz')}
              className="text-sm transition-colors hover:text-white/60"
              style={{ color: 'rgba(255,255,255,.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Làm lại quiz
            </button>
          </footer>
        </div>
      </div>
    </div>
  )
}
