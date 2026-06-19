import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getInviteByCode, type InviteRecord } from '../lib/p2p/invite-service'
import {
  getCard,
  SITUATION_LABELS,
  AVAILABLE_SITUATIONS,
  type RelationshipCard,
  type SituationKey,
} from '../lib/p2p/relationship-diagnostic'
import {
  getOpeningQuestions,
  getRandomBridgeQuestions,
} from '../lib/p2p/opening-questions'
import type { MBTIType } from '../data/quiz-types'

function isMbtiType(value: string | undefined): value is MBTIType {
  return /^[IE][NS][FT][JP]$/.test(value ?? '')
}

export default function ComparePage() {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const [invite, setInvite] = useState<InviteRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSituation, setActiveSituation] = useState<SituationKey>('conflict')

  useEffect(() => {
    if (!code) {
      setLoading(false)
      return
    }

    void getInviteByCode(code).then((data) => {
      setInvite(data)
      setLoading(false)
    })
  }, [code])

  const inviterType = isMbtiType(invite?.inviter_persona?.mbtiType)
    ? invite.inviter_persona.mbtiType
    : undefined
  const inviteeType = isMbtiType(invite?.invitee_persona?.mbtiType)
    ? invite.invitee_persona.mbtiType
    : undefined

  const inviterCard: RelationshipCard | undefined = inviterType
    ? getCard(inviterType, activeSituation)
    : undefined
  const inviteeCard: RelationshipCard | undefined = inviteeType
    ? getCard(inviteeType, activeSituation)
    : undefined

  const openingQuestions = useMemo(() => {
    if (inviterType && inviteeType) {
      return [...getOpeningQuestions(inviterType, inviteeType)]
    }
    const { questions } = getRandomBridgeQuestions(3)
    return questions
  }, [inviterType, inviteeType])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <p className="text-white/50 text-sm">Đang tải kết quả...</p>
      </div>
    )
  }

  if (!invite || invite.status !== 'completed') {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 gap-4 text-center">
        <p className="text-white/70">Người bạn mời chưa hoàn thành quiz.</p>
        <p className="text-white/40 text-sm">
          Khi họ xong, bạn sẽ thấy trang so sánh ở đây.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="text-white/40 text-sm underline mt-2"
        >
          Kiểm tra lại
        </button>
      </div>
    )
  }

  const inviter = invite.inviter_persona
  const invitee = invite.invitee_persona

  const inviterLifePath = inviter?.lifePathNumber ?? inviter?.lifePath
  const inviteeLifePath = invitee?.lifePathNumber ?? invitee?.lifePath

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-4 py-8 flex flex-col gap-6">
      <div className="text-center">
        <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
          So sánh tương hợp
        </p>
        <h1 className="text-white text-xl font-semibold">
          {inviter?.name ?? 'Bạn'} & {invitee?.name ?? 'Người bạn mời'}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
          <p className="text-white/40 text-xs uppercase tracking-wide">
            {inviter?.name ?? 'Bạn'}
          </p>
          <p className="text-white font-semibold text-lg">{inviter?.mbtiType ?? '—'}</p>
          {inviter?.element && (
            <p className="text-white/60 text-sm">{inviter.element}</p>
          )}
          {inviterLifePath != null && (
            <p className="text-white/60 text-sm">Số chủ đạo {inviterLifePath}</p>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
          <p className="text-white/40 text-xs uppercase tracking-wide">
            {invitee?.name ?? 'Người bạn mời'}
          </p>
          <p className="text-white font-semibold text-lg">{invitee?.mbtiType ?? '—'}</p>
          {invitee?.element && (
            <p className="text-white/60 text-sm">{invitee.element}</p>
          )}
          {inviteeLifePath != null && (
            <p className="text-white/60 text-sm">Số chủ đạo {inviteeLifePath}</p>
          )}
        </div>
      </div>

      {(inviterCard || inviteeCard) && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
              Phong cách quan hệ
            </p>
            <p className="text-white/50 text-xs">Xu hướng — không phán tuyệt đối</p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {AVAILABLE_SITUATIONS.map((sit) => (
              <button
                key={sit}
                type="button"
                onClick={() => setActiveSituation(sit)}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                  activeSituation === sit
                    ? 'bg-white/15 text-white'
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                }`}
              >
                {SITUATION_LABELS[sit]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 min-w-0">
              <p className="text-white/40 text-xs uppercase tracking-wide">
                {inviter?.name ?? 'Bạn'}
              </p>
              {inviterCard ? (
                <>
                  <p className="text-white/80 text-xs leading-relaxed font-medium">
                    {inviterCard.signal}
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed">{inviterCard.insight}</p>
                  <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
                    <p className="text-white/40 text-xs italic leading-relaxed">
                      {inviterCard.selfAsk}
                    </p>
                    <p className="text-white/30 text-xs leading-relaxed">
                      👁 {inviterCard.watchFor}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-white/30 text-xs">Chưa có data cho type này.</p>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 min-w-0">
              <p className="text-white/40 text-xs uppercase tracking-wide">
                {invitee?.name ?? 'Người bạn mời'}
              </p>
              {inviteeCard ? (
                <>
                  <p className="text-white/80 text-xs leading-relaxed font-medium">
                    {inviteeCard.signal}
                  </p>
                  <p className="text-white/55 text-xs leading-relaxed">{inviteeCard.insight}</p>
                  <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
                    <p className="text-white/40 text-xs italic leading-relaxed">
                      {inviteeCard.selfAsk}
                    </p>
                    <p className="text-white/30 text-xs leading-relaxed">
                      👁 {inviteeCard.watchFor}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-white/30 text-xs">Chưa có data cho type này.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {openingQuestions.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-white/40 text-xs uppercase tracking-wide">
            Gợi ý câu hỏi mở đầu
          </p>
          <div className="flex flex-col gap-2">
            {openingQuestions.map((q, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <p className="text-white/70 text-sm leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
          <p className="text-white/25 text-xs">
            Câu hỏi phù hợp với cặp{' '}
            {inviterType && inviteeType
              ? `${inviterType} × ${inviteeType}`
              : 'của hai bạn'}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate('/discover')}
        className="w-full bg-white/10 border border-white/20 text-white/80 font-medium py-4 rounded-2xl text-sm active:scale-95 transition-transform"
      >
        Khám phá kết nối trên TNCB
      </button>
    </div>
  )
}
