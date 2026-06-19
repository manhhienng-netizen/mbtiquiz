import { useCallback, useEffect, useRef } from 'react'

export const MODULES = [
  {
    id: 'pa',
    icon: '/assets/icons/PA.png',
    label: 'Cá nhân',
    desc: 'Trò chuyện về đời sống & tâm linh',
    route: '/assistant',
    accent: '#7F77DD',
  },
  {
    id: 'wa',
    icon: '/assets/icons/WA.png',
    label: 'Công việc',
    desc: 'Hỗ trợ nghề nghiệp & phát triển bản thân',
    route: '/work',
    accent: '#A8E63D',
  },
  {
    id: 'ma',
    icon: '/assets/icons/MA.png',
    label: 'Tâm tính',
    desc: 'Khám phá quan hệ & tương hợp',
    route: '/match',
    accent: '#E88B9E',
  },
  {
    id: 'san-tap',
    emoji: '🏋️',
    label: 'Sân tập',
    desc: 'Luyện phản xạ qua tình huống thực',
    route: '/san-tap',
    accent: '#A8E63D',
  },
  {
    id: 'result',
    icon: '/assets/icons/Result.png',
    label: 'Kết quả',
    desc: 'Kết quả tính cách đầy đủ của bạn',
    route: '/result',
    accent: '#C0B8D4',
  },
] as const

const SWIPE_THRESHOLD = 25
const ANGLE_STEP = 360 / MODULES.length

interface ModuleCarouselProps {
  activeIndex: number
  onActiveIndexChange: (index: number) => void
}

export default function ModuleCarousel({
  activeIndex,
  onActiveIndexChange,
}: ModuleCarouselProps) {
  const touchStartX = useRef<number | null>(null)

  const goNext = useCallback(() => {
    onActiveIndexChange((activeIndex + 1) % MODULES.length)
  }, [activeIndex, onActiveIndexChange])

  const goPrev = useCallback(() => {
    onActiveIndexChange((activeIndex - 1 + MODULES.length) % MODULES.length)
  }, [activeIndex, onActiveIndexChange])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return
    if (deltaX < 0) goNext()
    else goPrev()
  }

  return (
    <div
      style={{
        position: 'relative',
        width: 200,
        height: 200,
        margin: '0 auto',
        perspective: 600,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(.25,.8,.25,1)',
          transform: `rotateY(${activeIndex * -ANGLE_STEP}deg)`,
        }}
      >
        {MODULES.map((mod, i) => {
          const isActive = i === activeIndex
          const modAccent = mod.accent
          return (
            <button
              key={mod.id}
              type="button"
              aria-label={mod.label}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onActiveIndexChange(i)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(130px) translateX(-50%) translateY(-50%) scale(${isActive ? 1 : 0.7})`,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.04)',
                border: `1px solid ${isActive ? `${modAccent}B3` : `${modAccent}40`}`,
                boxShadow: isActive ? `0 0 24px ${modAccent}40` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition:
                  'border-color 0.3s, box-shadow 0.3s, transform 0.5s cubic-bezier(.25,.8,.25,1)',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              {'emoji' in mod && mod.emoji ? (
                <span
                  aria-hidden
                  style={{
                    fontSize: 32,
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {mod.emoji}
                </span>
              ) : 'icon' in mod ? (
                <img
                  src={mod.icon}
                  alt=""
                  style={{
                    width: 56,
                    height: 56,
                    objectFit: 'contain',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
