import { useEffect, useState } from 'react'
import { getLatestMBTI } from '../db/tncb-db'
import { getCurrentSlotNudge, type NudgeTimeSlot } from '../lib/nudge-service'

const SLOT_LABELS: Record<NudgeTimeSlot, string> = {
  morning: 'Buổi sáng',
  practice: 'Hôm nay',
  evening: 'Buổi tối',
}

const FORBIDDEN_WORDS = ['tiềm năng', 'hành trình', 'bứt phá']

function hasForbiddenWord(text: string): boolean {
  const lower = text.toLowerCase()
  return FORBIDDEN_WORDS.some((word) => lower.includes(word))
}

function formatTodayLabel(): string {
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

export default function DailyInsightCard({ onClose }: { onClose?: () => void }) {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    void getLatestMBTI().then((record) => {
      if (!cancelled) setMbtiType(record?.mbtiType ?? null)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!mbtiType) return null

  const { slot, nudge } = getCurrentSlotNudge(mbtiType)
  if (!nudge) return null

  const title = nudge.doThis
  const content = `${nudge.nudgeText}\n${nudge.avoidThis ? `Tránh: ${nudge.avoidThis}` : ''}`.trim()

  if (hasForbiddenWord(title) || hasForbiddenWord(content)) return null

  const slotLabel = SLOT_LABELS[slot]

  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-4 mt-3">
      <p className="text-xs text-amber-400/70 uppercase tracking-wider mb-1">
        ✨ Bài học hôm nay · {slotLabel}
      </p>

      <h3 className="text-sm font-medium text-white/90 mb-2">{title}</h3>

      <p className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{content}</p>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/6">
        <span className="text-xs bg-white/8 text-white/50 px-2 py-0.5 rounded-full">
          {mbtiType}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">{formatTodayLabel()}</span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Đóng
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
