/**
 * TNCB Match — Nhánh C "Kết nối thực"
 * P2P owns this component · UI PM imports into slot C
 * Reuse: invite-service.ts (createInvite)
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentP2PUser } from '../../lib/p2p/auth-service'
import { createInvite } from '../../lib/p2p/invite-service'
import {
  isPersonaSufficientForMatch,
  readDexiePersona,
} from '../../lib/p2p/persona-sync'

const LOCAL_ID_KEY = 'tncb_local_id'

async function resolveInviterUserId(): Promise<string> {
  const user = await getCurrentP2PUser()
  if (user) return user.id

  let localId = localStorage.getItem(LOCAL_ID_KEY)
  if (!localId) {
    localId = `local_${Date.now()}`
    localStorage.setItem(LOCAL_ID_KEY, localId)
  }
  return localId
}

export default function P2PInviteEntry() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [inviteUrl, setInviteUrl] = useState<string | null>(null)

  const handleCreateInvite = async () => {
    if (loading) return
    setLoading(true)
    try {
      const persona = await readDexiePersona()
      if (!isPersonaSufficientForMatch(persona)) {
        navigate('/quiz')
        return
      }

      const userId = await resolveInviterUserId()
      const result = await createInvite(userId, persona)
      if (!result) throw new Error('Không tạo được link')

      setInviteUrl(result.url)

      try {
        await navigator.clipboard.writeText(result.url)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 3000)
      } catch {
        // Clipboard blocked — link vẫn hiện để copy thủ công
      }
    } catch (err) {
      console.error('createInvite error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (!inviteUrl) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Khám phá tâm tính cùng tôi',
          text: 'Làm quiz tính cách để chúng ta so sự tương hợp nhé!',
          url: inviteUrl,
        })
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(inviteUrl)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 3000)
      } catch {
        // Clipboard blocked
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
          Kết nối thực
        </p>
        <p className="text-white/70 text-sm leading-relaxed">
          Ai đó là tri kỷ của bạn ngoài kia →
        </p>
        <p className="text-white/40 text-xs mt-1 leading-relaxed">
          Mời họ làm quiz · cả hai cùng khám phá sự tương hợp
        </p>
      </div>

      {!inviteUrl && (
        <button
          type="button"
          onClick={() => void handleCreateInvite()}
          disabled={loading}
          className="w-full text-left px-5 py-4
                     bg-[#7EB8D8]/10 border border-[#7EB8D8]/30
                     rounded-2xl text-[#7EB8D8] text-sm font-medium
                     hover:bg-[#7EB8D8]/15 active:scale-[0.98]
                     transition-all disabled:opacity-50"
        >
          {loading ? 'Đang tạo link...' : '✦ Tạo link mời'}
        </button>
      )}

      {inviteUrl && (
        <div className="flex flex-col gap-3">
          <div
            className="bg-white/5 border border-white/10 rounded-xl
                          px-4 py-3 flex items-center gap-3"
          >
            <span className="text-white/40 text-xs flex-1 truncate">
              {inviteUrl}
            </span>
            <button
              type="button"
              onClick={() => void handleShare()}
              className="text-[#7EB8D8] text-xs font-medium flex-shrink-0
                         hover:text-[#7EB8D8]/80 transition-colors"
            >
              {linkCopied ? 'Đã copy ✓' : 'Chia sẻ'}
            </button>
          </div>

          {linkCopied && (
            <p className="text-[#7EB8D8]/60 text-xs text-center">
              Link đã copy — gửi cho người bạn muốn so tâm tính
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              setInviteUrl(null)
              setLinkCopied(false)
            }}
            className="text-white/30 text-xs text-center
                       hover:text-white/50 transition-colors"
          >
            Tạo link khác
          </button>
        </div>
      )}

      <p className="text-white/25 text-xs leading-relaxed">
        Người nhận tự làm quiz và xem kết quả của họ trước.
        So sánh chỉ hiện sau khi cả hai hoàn thành.
      </p>
    </div>
  )
}
