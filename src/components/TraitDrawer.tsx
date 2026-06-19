import { useCallback, useEffect, useRef, useState } from 'react'
import { getTraitDetail } from '../data/trait-detail-content'

export interface TraitDrawerProps {
  isOpen: boolean
  onClose: () => void
  traitKeys: string[]
  initialIndex?: number
  archetypeColor: string
}

export default function TraitDrawer({
  isOpen,
  onClose,
  traitKeys,
  initialIndex = 0,
  archetypeColor,
}: TraitDrawerProps) {
  const [index, setIndex] = useState(initialIndex)
  const touchStartY = useRef<number | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) setIndex(initialIndex)
  }, [isOpen, initialIndex])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const goPrev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : traitKeys.length - 1))
  }, [traitKeys.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i < traitKeys.length - 1 ? i + 1 : 0))
  }, [traitKeys.length])

  if (!isOpen || traitKeys.length === 0) return null

  const traitKey = traitKeys[index]!
  const detail = getTraitDetail(traitKey)
  const showNav = traitKeys.length > 1

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Đóng"
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="trait-drawer-title"
        className="relative w-full max-w-lg rounded-t-2xl shadow-xl max-h-[88vh] flex flex-col animate-slide-up-sheet"
        style={{ background: '#14141A', border: '1px solid rgba(255,255,255,0.10)' }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0]?.clientY ?? null
        }}
        onTouchEnd={(e) => {
          if (touchStartY.current == null) return
          const endY = e.changedTouches[0]?.clientY ?? touchStartY.current
          if (endY - touchStartY.current > 72) onClose()
          touchStartY.current = null
        }}
      >
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.30)' }} aria-hidden />
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-3 right-3 w-9 h-9 rounded-full"
          style={{
            border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {showNav && (
          <div className="flex items-center justify-between px-4 pb-2 shrink-0">
            <button
              type="button"
              onClick={goPrev}
              className="min-h-10 px-3 text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.68)' }}
              aria-label="Điểm mạnh trước"
            >
              ← Trước
            </button>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {index + 1} / {traitKeys.length}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="min-h-10 px-3 text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.68)' }}
              aria-label="Điểm mạnh sau"
            >
              Sau →
            </button>
          </div>
        )}

        <div className="overflow-y-auto px-5 pb-8 pt-2">
          {detail ? (
            <>
              <p
                className="text-xs font-semibold tracking-wide uppercase mb-1"
                style={{ color: archetypeColor }}
              >
                ✦ Điểm mạnh cốt lõi
              </p>
              <h2 id="trait-drawer-title" className="text-xl font-bold leading-tight" style={{ color: 'rgba(255,255,255,0.94)' }}>
                {detail.label}
              </h2>

              <section className="mt-5">
                <h3 className="text-xs font-semibold uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  Hiện tại
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
                  {detail.currentState}
                </p>
              </section>

              <section className="mt-4">
                <h3 className="text-xs font-semibold uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  Khi phát triển
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
                  {detail.potential}
                </p>
              </section>

              <section className="mt-4">
                <h3 className="text-xs font-semibold uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  Mạnh nhất khi
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
                  {detail.strengthWhen}
                </p>
              </section>

              <section className="mt-4">
                <h3 className="text-xs font-semibold uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.52)' }}>
                  Cần chú ý
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.80)' }}>
                  {detail.watchOut}
                </p>
              </section>

              {detail.famousExamples.length > 0 && (
                <section className="mt-4">
                  <h3 className="text-xs font-semibold uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.52)' }}>
                    Được cho là có nét tương đồng
                  </h3>
                  <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    (phỏng đoán dựa trên hành vi công khai — chưa xác thực)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {detail.famousExamples.map((name) => (
                      <span
                        key={name}
                        className="text-xs px-3 py-1.5 rounded-full"
                        style={{
                          border: '1px solid rgba(255,255,255,0.14)',
                          color: 'rgba(255,255,255,0.72)',
                          background: 'rgba(255,255,255,0.04)',
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </>
          ) : (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Không tìm thấy nội dung trait.
            </p>
          )}
        </div>

        <div className="shrink-0 px-5 pb-4 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.10)' }} />
      </div>
    </div>
  )
}
