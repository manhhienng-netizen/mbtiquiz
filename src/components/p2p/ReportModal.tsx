import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { REPORT_REASON_LABELS, type ReportReason } from '../../lib/p2p/safety-service'

interface ReportModalProps {
  isOpen: boolean
  targetName: string
  onConfirm: (reason: ReportReason) => Promise<void>
  onClose: () => void
}

export default function ReportModal({
  isOpen,
  targetName,
  onConfirm,
  onClose,
}: ReportModalProps) {
  const [selected, setSelected] = useState<ReportReason | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleConfirm() {
    if (!selected) return
    setLoading(true)
    await onConfirm(selected)
    setLoading(false)
    setSelected(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-end justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1A1A20] border border-white/10 rounded-2xl p-6 w-full max-w-sm space-y-4"
          >
            <div>
              <h3 className="text-white font-semibold">Báo cáo {targetName}</h3>
              <p className="text-white/40 text-sm mt-1">
                Chọn lý do báo cáo. Hồ sơ sẽ bị ẩn sau khi bạn xác nhận.
              </p>
            </div>

            <div className="space-y-2">
              {(Object.entries(REPORT_REASON_LABELS) as [ReportReason, string][]).map(
                ([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelected(value)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                      selected === value
                        ? 'border-white/60 bg-white/10 text-white'
                        : 'border-white/10 text-white/60 hover:border-white/20'
                    }`}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/15 text-white/50 text-sm"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => void handleConfirm()}
                disabled={!selected || loading}
                className="flex-1 py-3 rounded-xl bg-red-500/80 text-white font-semibold text-sm disabled:opacity-40"
              >
                {loading ? 'Đang gửi...' : 'Báo cáo'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
