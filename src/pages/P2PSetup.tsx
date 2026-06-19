import AtmosphericPage from '../components/AtmosphericPage'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSpiritualResult, saveAttachmentSignal } from '../db/tncb-db'
import {
  scoreAttachment,
  type AttachmentAnswers,
} from '../lib/p2p/attachment-scoring'
import { sendPhoneOtp, verifyPhoneOtp, ensureProfile } from '../lib/p2p/auth-service'
import { uploadDatingPhoto } from '../lib/p2p/photo-service'
import {
  readDexiePersona,
  isPersonaSufficientForMatch,
  syncPersonaToCloud,
} from '../lib/p2p/persona-sync'
import { getSupabaseClient, hasSupabaseEnv } from '../lib/p2p/supabase-client'
import { useP2PAuth } from '../context/P2PAuthContext'
import { RelationshipDiagnostic } from '../components/p2p/RelationshipDiagnostic'
import type { MBTIType } from '../lib/p2p/relationship-diagnostic'
import { ATTACHMENT_QUESTIONS } from '../lib/p2p/attachment-questions'
import {
  LIFE_STAGE_QUESTIONS,
  VALUES_QUESTIONS,
  SAFETY_EDUCATION_STRINGS,
  P2P_SIGNUP_DATE_KEY,
  getDailySafetyTip,
} from '../lib/p2p/content-strings-safety-lifestage-values'

type Step = 'phone' | 'otp' | 'info' | 'photos'

const STEPS: Step[] = ['phone', 'otp', 'info', 'photos']

const GENDER_LABELS: Record<string, string> = {
  male: 'Nam',
  female: 'Nữ',
  other: 'Khác',
}

const LOOKING_LABELS: Record<string, string> = {
  male: 'Nam',
  female: 'Nữ',
  any: 'Tất cả',
}

const ATTACHMENT_MCQ_QUESTIONS = [
  {
    key: 'q1' as const,
    question: 'Khi chưa nhận hồi âm từ ai đó quan trọng, bạn thường:',
    options: [
      'Tiếp tục việc của mình — họ chắc bận',
      'Nhắn thêm 1 tin để check',
      'Bắt đầu lo dù biết không cần',
      'Tùy mối quan hệ',
    ],
  },
  {
    key: 'q2' as const,
    question: 'Khi cảm xúc trở nên nặng nề trong cuộc trò chuyện, bạn thường:',
    options: [
      'Nói thẳng ra luôn',
      'Cần thời gian một mình trước',
      'Đổi chủ đề cho nhẹ hơn',
      'Tùy cảm giác lúc đó',
    ],
  },
  {
    key: 'q3' as const,
    question: 'Trong mối quan hệ, điều bạn cần nhất là:',
    options: [
      'Biết người kia luôn ở đó',
      'Không gian để là chính mình',
      'Cả 2 đều quan trọng như nhau',
      'Chưa chắc',
    ],
  },
]

export default function P2PSetup() {
  const navigate = useNavigate()
  const { refresh } = useP2PAuth()

  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [userId, setUserId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [displayName, setDisplayName] = useState('')
  const [gender, setGender] = useState('')
  const [lookingFor, setLookingFor] = useState('')
  const [minAge, setMinAge] = useState(18)
  const [maxAge, setMaxAge] = useState(99)

  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [bio, setBio] = useState('')

  const [noPersonaWarning, setNoPersonaWarning] = useState(false)
  const [mbtiType, setMbtiType] = useState<MBTIType | null>(null)
  const [attachmentAnswers, setAttachmentAnswers] = useState<Record<string, string>>({})
  const [attachmentMCQ, setAttachmentMCQ] = useState<Partial<AttachmentAnswers>>({})
  const [mcqDismissed, setMcqDismissed] = useState(false)
  const [mcqSaved, setMcqSaved] = useState(false)
  const [lifeStageAnswers, setLifeStageAnswers] = useState<
    Record<number, string | string[]>
  >({})
  const [valuesAnswers, setValuesAnswers] = useState<Record<number, string>>({})
  const [safetyTip, setSafetyTip] = useState<string | null>(null)
  const [ageChecked, setAgeChecked] = useState(false)
  const [agePassed, setAgePassed] = useState(true)
  const [receiptsEnabled, setReceiptsEnabled] = useState(true)

  useEffect(() => {
    if (!userId) return

    if (!hasSupabaseEnv) {
      const profile = JSON.parse(localStorage.getItem('p2p_dating_profile') ?? '{}') as {
        read_receipts_enabled?: boolean
      }
      setReceiptsEnabled(profile.read_receipts_enabled ?? true)
      return
    }

    void getSupabaseClient()
      .from('dating_profiles')
      .select('read_receipts_enabled')
      .eq('user_id', userId)
      .single()
      .then(({ data: row }) => {
        if (row) setReceiptsEnabled(row.read_receipts_enabled ?? true)
      })
  }, [userId])

  async function handleToggleReceipts(enabled: boolean) {
    setReceiptsEnabled(enabled)
    if (!userId) return

    if (!hasSupabaseEnv) {
      const profile = JSON.parse(localStorage.getItem('p2p_dating_profile') ?? '{}')
      localStorage.setItem(
        'p2p_dating_profile',
        JSON.stringify({ ...profile, read_receipts_enabled: enabled }),
      )
      return
    }

    await getSupabaseClient()
      .from('dating_profiles')
      .update({ read_receipts_enabled: enabled })
      .eq('user_id', userId)
  }

  useEffect(() => {
    async function checkAge() {
      try {
        const spiritual = await getSpiritualResult()
        if (spiritual?.birthDate) {
          const birth = new Date(spiritual.birthDate)
          const age = Math.floor(
            (Date.now() - birth.getTime()) / (365.25 * 24 * 3600 * 1000),
          )
          setAgePassed(age >= 18)
        }
      } catch {
        // Dexie lỗi → không block
      }
      setAgeChecked(true)
    }
    void checkAge()
  }, [])

  useEffect(() => {
    void readDexiePersona().then((p) => {
      if (!isPersonaSufficientForMatch(p)) setNoPersonaWarning(true)
      if (p.mbtiType) setMbtiType(p.mbtiType as MBTIType)
    })
  }, [])

  useEffect(() => {
    const raw = localStorage.getItem(P2P_SIGNUP_DATE_KEY)
    if (!raw) return
    const signupDate = new Date(raw)
    if (Number.isNaN(signupDate.getTime())) return
    setSafetyTip(getDailySafetyTip(signupDate))
  }, [])

  async function handleSendOtp() {
    setError('')
    if (!phone.match(/^(\+84|0)[0-9]{9}$/)) {
      setError('Nhập số điện thoại Việt Nam hợp lệ (VD: 0901234567)')
      return
    }
    setLoading(true)
    const { error: otpError } = await sendPhoneOtp(phone)
    setLoading(false)
    if (otpError) {
      setError(otpError)
      return
    }
    setStep('otp')
  }

  async function handleVerifyOtp() {
    setError('')
    setLoading(true)
    const { user, error: verifyError } = await verifyPhoneOtp(phone, otp)
    if (verifyError || !user) {
      setLoading(false)
      setError(verifyError ?? 'Xác nhận thất bại')
      return
    }
    await ensureProfile(user)
    if (!localStorage.getItem(P2P_SIGNUP_DATE_KEY)) {
      localStorage.setItem(P2P_SIGNUP_DATE_KEY, new Date().toISOString())
    }
    setUserId(user.id)
    await refresh()
    setLoading(false)
    setStep('info')
  }

  function handleSaveInfo() {
    setError('')
    if (!displayName.trim()) {
      setError('Nhập tên hiển thị')
      return
    }
    if (!gender) {
      setError('Chọn giới tính')
      return
    }
    if (!lookingFor) {
      setError('Chọn đối tượng tìm kiếm')
      return
    }
    const relationshipType = lifeStageAnswers[0]
    const goals = lifeStageAnswers[1]
    if (!relationshipType || typeof relationshipType !== 'string') {
      setError('Chọn mục tiêu mối quan hệ')
      return
    }
    if (!Array.isArray(goals) || goals.length < 1) {
      setError('Chọn ít nhất 1 mục tiêu trong 3 năm tới')
      return
    }
    setStep('photos')
  }

  async function handleUploadPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    const { url, error: uploadError } = await uploadDatingPhoto(file, userId)
    setLoading(false)
    e.target.value = ''
    if (uploadError) {
      setError(uploadError)
      return
    }
    if (url) setPhotoUrls((prev) => [...prev, url])
  }

  async function handleAttachmentMCQSubmit() {
    const { q1, q2, q3 } = attachmentMCQ
    if (!q1 || !q2 || !q3) return

    const signal = scoreAttachment({ q1, q2, q3 })
    await saveAttachmentSignal({
      attachmentAnxiety: signal.anxietySignal,
      attachmentAvoidance: signal.avoidanceSignal,
    })
    setMcqSaved(true)
    setMcqDismissed(true)
  }

  async function handleFinish() {
    setError('')
    if (photoUrls.length < 1) {
      setError('Thêm ít nhất 1 ảnh')
      return
    }
    if (bio.trim().length < 20) {
      setError('Bio cần ít nhất 20 ký tự')
      return
    }

    setLoading(true)
    const persona = await readDexiePersona()

    const valuesProfile = Object.fromEntries(
      Object.entries(valuesAnswers)
        .filter(([, answer]) => answer.trim())
        .map(([idx, answer]) => [`values_${parseInt(idx, 10) + 1}`, answer]),
    )

    const profileData = {
      user_id: userId,
      display_name: displayName.trim(),
      bio: bio.trim(),
      photos: photoUrls,
      gender,
      looking_for: lookingFor,
      min_age: minAge,
      max_age: maxAge,
      payload: persona,
      attachment_answers: attachmentAnswers,
      life_stage_answers: {
        relationshipType: lifeStageAnswers[0],
        goals: lifeStageAnswers[1],
      },
      values_answers: valuesProfile,
      read_receipts_enabled: receiptsEnabled,
      is_active: true,
    }

    if (hasSupabaseEnv) {
      const { error: saveError } = await getSupabaseClient()
        .from('dating_profiles')
        .upsert(profileData, { onConflict: 'user_id' })
      if (saveError) {
        setError(saveError.message)
        setLoading(false)
        return
      }
      await syncPersonaToCloud(userId)
    } else {
      localStorage.setItem('p2p_dating_profile', JSON.stringify(profileData))
    }

    await refresh()
    setLoading(false)
    navigate('/discover')
  }

  const stepIndex = STEPS.indexOf(step)

  if (!ageChecked) {
    return (
      <AtmosphericPage overlay="medium" contentClassName="flex items-center justify-center min-h-screen">
        <div className="text-white/40 text-sm">Đang kiểm tra...</div>
      </AtmosphericPage>
    )
  }

  if (!agePassed) {
    return (
      <AtmosphericPage overlay="medium" contentClassName="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-4">
        <div className="text-4xl">🔞</div>
        <h2 className="text-white font-bold text-xl">Tính năng dành cho 18+</h2>
        <p className="text-white/50 text-sm">
          Khám phá kết nối chỉ dành cho người dùng từ 18 tuổi trở lên.
        </p>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-white/60 text-sm hover:border-white/40 hover:text-white transition-colors"
        >
          ← Trang chủ
        </button>
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage overlay="medium" contentClassName="text-white flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          <img
            src="/assets/icons/p2p-setup.png"
            alt=""
            width={44}
            height={44}
            style={{ mixBlendMode: 'screen', objectFit: 'contain' }}
            draggable={false}
          />
        </div>
        <div className="flex gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded ${
                stepIndex >= i ? 'bg-white' : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {safetyTip && (
          <div className="bg-blue-900/20 border border-blue-700/40 rounded-lg p-3 text-sm text-blue-200/90">
            <span className="text-blue-300/70 text-xs uppercase tracking-wide block mb-1">
              Tip an toàn
            </span>
            {safetyTip}
          </div>
        )}

        {noPersonaWarning && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 text-sm text-yellow-300">
            Bạn chưa làm quiz tính cách.{' '}
            <a href="/quiz" className="underline">
              Làm quiz
            </a>{' '}
            để matching chính xác hơn.
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Số điện thoại</h1>
            <p className="text-white/60 text-sm">
              Dùng để đăng nhập · không hiển thị với người khác
            </p>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0901234567"
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-white/40"
            />
            {!hasSupabaseEnv && (
              <p className="text-white/40 text-xs">
                Demo mode · OTP bất kỳ ≥4 ký tự sẽ pass
              </p>
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="button"
              onClick={() => void handleSendOtp()}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Nhập mã OTP</h1>
            <p className="text-white/60 text-sm">Mã đã gửi tới {phone}</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-white/40 text-center text-2xl tracking-widest"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="button"
              onClick={() => void handleVerifyOtp()}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Đang xác nhận...' : 'Xác nhận'}
            </button>
            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-white/40 text-sm"
            >
              Đổi số khác
            </button>
          </div>
        )}

        {step === 'info' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Thông tin cơ bản</h1>

            <div>
              <label className="text-white/60 text-sm block mb-1">Tên hiển thị</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Tên bạn muốn người khác thấy"
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">Giới tính</label>
              <div className="flex gap-2">
                {(['male', 'female', 'other'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      gender === g
                        ? 'bg-white text-black border-white'
                        : 'border-white/20 text-white/60'
                    }`}
                  >
                    {GENDER_LABELS[g]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">Tìm kiếm</label>
              <div className="flex gap-2">
                {(['male', 'female', 'any'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setLookingFor(g)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      lookingFor === g
                        ? 'bg-white text-black border-white'
                        : 'border-white/20 text-white/60'
                    }`}
                  >
                    {LOOKING_LABELS[g]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">
                Độ tuổi mong muốn: {minAge}–{maxAge}
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  min={18}
                  max={maxAge}
                  value={minAge}
                  onChange={(e) => setMinAge(Number(e.target.value))}
                  className="w-20 bg-white/10 rounded-lg px-3 py-2 text-white border border-white/10"
                />
                <span className="text-white/40">đến</span>
                <input
                  type="number"
                  min={minAge}
                  max={99}
                  value={maxAge}
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                  className="w-20 bg-white/10 rounded-lg px-3 py-2 text-white border border-white/10"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-5">
              <div>
                <p className="text-sm text-white/40 uppercase tracking-wide mb-1">
                  Giai đoạn cuộc sống
                </p>
                <p className="text-white/60 text-sm mb-4">Bắt buộc · giúp gợi ý phù hợp hơn</p>
              </div>

              {LIFE_STAGE_QUESTIONS.map((q, idx) => {
                const isSingle = !q.maxSelections || q.maxSelections === 1
                return (
                  <div key={q.question}>
                    <p className="text-white/80 text-sm mb-1">{q.question}</p>
                    {q.subtext && (
                      <p className="text-white/40 text-xs mb-2">{q.subtext}</p>
                    )}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const selected = isSingle
                          ? lifeStageAnswers[idx] === opt
                          : (lifeStageAnswers[idx] as string[] | undefined)?.includes(opt)

                        return (
                          <label
                            key={opt}
                            className={`flex items-start gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                              selected
                                ? 'border-white/30 bg-white/10'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                          >
                            <input
                              type={isSingle ? 'radio' : 'checkbox'}
                              name={`life-stage-${idx}`}
                              value={opt}
                              checked={Boolean(selected)}
                              onChange={() => {
                                if (isSingle) {
                                  setLifeStageAnswers((prev) => ({ ...prev, [idx]: opt }))
                                  return
                                }
                                setLifeStageAnswers((prev) => {
                                  const answers = (prev[idx] as string[]) ?? []
                                  if (answers.includes(opt)) {
                                    return {
                                      ...prev,
                                      [idx]: answers.filter((a) => a !== opt),
                                    }
                                  }
                                  if (answers.length >= (q.maxSelections ?? 2)) return prev
                                  return { ...prev, [idx]: [...answers, opt] }
                                })
                              }}
                              className="mt-0.5"
                            />
                            <span className="text-white/70 text-sm">{opt}</span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="button"
              onClick={handleSaveInfo}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg"
            >
              Tiếp theo
            </button>
          </div>
        )}

        {step === 'photos' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Ảnh & giới thiệu</h1>

            <div>
              <label className="text-white/60 text-sm block mb-2">
                Ảnh ({photoUrls.length}/6) · tối thiểu 1 ảnh
              </label>
              <div className="grid grid-cols-3 gap-2">
                {photoUrls.map((url, i) => (
                  <div
                    key={url}
                    className="aspect-square rounded-lg overflow-hidden bg-white/10 relative"
                  >
                    <img src={url} className="w-full h-full object-cover" alt="" />
                    <button
                      type="button"
                      onClick={() =>
                        setPhotoUrls((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="absolute top-1 right-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photoUrls.length < 6 && (
                  <label className="aspect-square rounded-lg border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                    <span className="text-white/40 text-2xl">+</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => void handleUploadPhoto(e)}
                      disabled={loading}
                    />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="text-white/60 text-sm block mb-1">
                Giới thiệu ({bio.length}/300) · tối thiểu 20 ký tự
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                rows={4}
                placeholder="Vài dòng về bạn..."
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 border border-white/10 focus:outline-none focus:border-white/40 resize-none"
              />
            </div>

            {mbtiType && (
              <div className="mt-2">
                <RelationshipDiagnostic mbtiType={mbtiType} />
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-sm text-white/40 uppercase tracking-wide mb-1">
                Giá trị & ưu tiên
              </p>
              <p className="text-white/60 text-sm mb-4">
                Tùy chọn · bạn có thể bỏ qua và hoàn thành bên dưới
              </p>

              {VALUES_QUESTIONS.map((q, idx) => (
                <div key={q.question} className="mb-5">
                  <p className="text-white/80 text-sm mb-2">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-start gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                          valuesAnswers[idx] === opt
                            ? 'border-white/30 bg-white/10'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`values-${idx}`}
                          value={opt}
                          checked={valuesAnswers[idx] === opt}
                          onChange={() =>
                            setValuesAnswers((prev) => ({ ...prev, [idx]: opt }))
                          }
                          className="mt-0.5"
                        />
                        <span className="text-white/70 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm text-white/40 uppercase tracking-wide mb-1">
                Phong cách quan hệ
              </p>
              <p className="text-white/60 text-sm mb-4">
                3 câu hỏi nhỏ giúp PA hiểu bạn hơn — không có đáp án đúng sai.
              </p>

              {ATTACHMENT_QUESTIONS.map((q) => (
                <div key={q.id} className="mb-5">
                  <p className="text-white/80 text-sm mb-2">{q.text}</p>
                  <textarea
                    value={attachmentAnswers[q.id] ?? ''}
                    onChange={(e) =>
                      setAttachmentAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    placeholder={q.placeholder}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm placeholder-white/20 resize-none focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              ))}
            </div>

            {!mcqDismissed && (
              <div className="mt-8">
                <p className="text-sm text-white/40 uppercase tracking-wide mb-1">
                  Cách bạn kết nối với người thân
                </p>
                <p className="text-white/50 text-xs mb-5 leading-relaxed">
                  3 câu ngắn — không có đáp án đúng sai. Có thể bỏ qua.
                </p>

                {ATTACHMENT_MCQ_QUESTIONS.map(({ key, question, options }) => (
                  <div key={key} className="mb-6">
                    <p className="text-white/75 text-sm mb-3 leading-relaxed">{question}</p>
                    <div className="flex flex-col gap-2">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setAttachmentMCQ((prev) => ({ ...prev, [key]: opt }))
                          }
                          className={`text-left text-sm px-4 py-3 rounded-xl border transition-colors ${
                            attachmentMCQ[key] === opt
                              ? 'bg-white/15 border-white/30 text-white'
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 mt-2">
                  {attachmentMCQ.q1 && attachmentMCQ.q2 && attachmentMCQ.q3 && (
                    <button
                      type="button"
                      onClick={() => void handleAttachmentMCQSubmit()}
                      className="flex-1 bg-white/10 border border-white/20 text-white/80 font-medium py-3 rounded-xl text-sm active:scale-95 transition-transform"
                    >
                      Lưu
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setMcqDismissed(true)}
                    className="text-white/30 text-sm px-4 py-3 hover:text-white/50 transition-colors"
                  >
                    Bỏ qua
                  </button>
                </div>
              </div>
            )}

            {mcqSaved && (
              <p className="text-white/30 text-xs mt-4 text-center">
                Đã lưu — cảm ơn bạn ✓
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between py-4 border-b border-white/10">
                <div>
                  <p className="text-white/80 text-sm">Hiện trạng thái đã đọc</p>
                  <p className="text-white/40 text-xs mt-0.5">
                    Tắt: cả hai không thấy &quot;đã đọc&quot; của nhau
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleToggleReceipts(!receiptsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    receiptsEnabled ? 'bg-[#7EB8D8]' : 'bg-white/20'
                  }`}
                  aria-label="Bật/tắt trạng thái đã đọc"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                      receiptsEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <h3 className="text-white/80 text-sm font-medium mb-3 mt-4">
                Hướng dẫn an toàn khi hẹn hò
              </h3>
              <ul className="space-y-2">
                {SAFETY_EDUCATION_STRINGS.map((tip) => (
                  <li key={tip} className="text-white/50 text-sm leading-relaxed flex gap-2">
                    <span className="text-white/30 shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="button"
              onClick={() => void handleFinish()}
              disabled={loading}
              className="w-full bg-white text-black font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Đang lưu...' : 'Vào khám phá →'}
            </button>
          </div>
        )}
      </div>
    </AtmosphericPage>
  )
}
