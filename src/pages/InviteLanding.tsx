import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getInviteByCode, type InviteRecord } from '../lib/p2p/invite-service'

export default function InviteLanding() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [invite, setInvite] = useState<InviteRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) {
      setError('Link không hợp lệ.')
      setLoading(false)
      return
    }

    void getInviteByCode(code).then((data) => {
      if (!data) {
        setError('Link không tồn tại hoặc đã hết hạn.')
      } else if (data.status === 'expired') {
        setError('Link này đã hết hạn (sau 7 ngày). Hãy nhờ bạn gửi lại link mới.')
      } else if (data.status === 'completed') {
        navigate(`/compare/${code}`, { replace: true })
        return
      } else {
        setInvite(data)
      }
      setLoading(false)
    })
  }, [code, navigate])

  const handleStart = () => {
    localStorage.setItem('tncb_invite_code', code ?? '')
    navigate('/quiz?invite=true')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <p className="text-white/50 text-sm">Đang tải...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 gap-4">
        <p className="text-white/70 text-center">{error}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-white/40 text-sm underline"
        >
          Về trang chủ
        </button>
      </div>
    )
  }

  const inviterName = invite?.inviter_persona?.name ?? 'Một người bạn'

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 gap-6 text-center">
      <div className="flex flex-col gap-2">
        <p className="text-white/40 text-sm uppercase tracking-wide">Lời mời từ</p>
        <h1 className="text-white text-2xl font-semibold">{inviterName}</h1>
      </div>

      <div className="flex flex-col gap-3 max-w-sm">
        <p className="text-white/70 text-base leading-relaxed">
          muốn khám phá tính cách của bạn và so sánh sự tương hợp.
        </p>
        <p className="text-white/50 text-sm leading-relaxed">
          Làm quiz ~5 phút để xem kết quả của chính bạn trước — sau đó cả hai cùng xem
          trang so sánh.
        </p>
      </div>

      <button
        type="button"
        onClick={handleStart}
        className="mt-2 bg-white text-[#0A0A0F] font-semibold px-8 py-4 rounded-2xl text-base active:scale-95 transition-transform"
      >
        Bắt đầu khám phá tính cách
      </button>

      <p className="text-white/30 text-xs max-w-xs leading-relaxed">
        Bạn tự làm quiz và xem kết quả của mình trước. So sánh chỉ hiển thị sau khi cả
        hai hoàn thành.
      </p>
    </div>
  )
}
