import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { calculateAge, parseBirthDateInput } from '@tncb/core/age-gate'
import {
  AGE_GROUP_THEME,
  COLORS,
  LAYOUT,
} from '@tncb/data/design-tokens'
import {
  isValidAgeGroupParam,
  PARENT_CONSENT_KEY,
  USER_PROFILE_KEY,
  type ParentConsentRecord,
  type UserProfile,
} from '../../lib/learn-age-groups'

function ShieldIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke={COLORS.primary[600]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export default function LearnParentalConsent() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const ageParam = searchParams.get('age')
  const dobParam = searchParams.get('dob')

  const [parentConsent, setParentConsent] = useState(false)
  const [childConsent, setChildConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ageGroup = isValidAgeGroupParam(ageParam) ? ageParam : null
  const theme = ageGroup ? AGE_GROUP_THEME[ageGroup] : null

  const parsedDob = useMemo(() => {
    if (!dobParam) return null
    return parseBirthDateInput(decodeURIComponent(dobParam))
  }, [dobParam])

  const age = parsedDob ? calculateAge(parsedDob) : null
  const needsChildConsent = age !== null && age >= 7

  useEffect(() => {
    if (ageGroup && age !== null && age >= 16) {
      navigate(`/quiz/${ageGroup}`, { replace: true })
    }
  }, [age, ageGroup, navigate])

  if (!ageGroup || !theme || !dobParam) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: COLORS.background.cream }}
      >
        <p className="text-stone-600 text-center mb-4">
          Thiếu thông tin. Em làm lại bước nhập ngày sinh nhé.
        </p>
        <Link
          to="/learn/onboarding"
          className="font-medium underline"
          style={{ color: COLORS.primary[700] }}
        >
          Quay lại Onboarding
        </Link>
      </div>
    )
  }

  if (age !== null && age >= 16) {
    return null
  }

  function handleStart() {
    if (!ageGroup || !dobParam) return
    setError(null)
    if (!parentConsent) {
      setError('Bố/mẹ cần đọc và đồng ý trước khi em tiếp tục.')
      return
    }
    if (needsChildConsent && !childConsent) {
      setError('Em cũng cần đồng ý để tiếp tục (theo quy định bảo vệ trẻ em).')
      return
    }

    const dob = decodeURIComponent(dobParam)
    const profile: UserProfile = {
      ageGroup: ageGroup,
      dob,
      onboardedAt: new Date().toISOString(),
    }
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))

    const consent: ParentConsentRecord = {
      consentedAt: new Date().toISOString(),
      parentConsent: true,
      ...(needsChildConsent ? { childConsent: true } : {}),
    }
    localStorage.setItem(PARENT_CONSENT_KEY, JSON.stringify(consent))

    navigate(`/quiz/${ageGroup}`)
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.background.cream }}
    >
      <motion.div
        className="mx-auto px-4 py-8 sm:py-10"
        style={{ maxWidth: LAYOUT.maxWidth }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{
            backgroundColor: COLORS.background.white,
            borderRadius: LAYOUT.borderRadius.lg,
            boxShadow: '0 1px 3px rgba(28, 25, 23, 0.06)',
          }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full mb-4"
            style={{ backgroundColor: COLORS.primary[50] }}
          >
            <ShieldIcon />
          </div>

          <h1
            className="text-xl sm:text-2xl font-semibold leading-snug"
            style={{
              fontFamily: 'Lexend, system-ui, sans-serif',
              color: COLORS.stone[900],
            }}
          >
            Em cần sự đồng ý của bố/mẹ để tiếp tục
          </h1>

          <p className="mt-3 text-sm leading-relaxed" style={{ color: COLORS.stone[600] }}>
            TNCB Learn giúp em khám phá điểm mạnh và định hướng học tập — chỉ trên
            thiết bị này, không gửi cho bên thứ ba. Kết quả lưu cục bộ để em xem lại;
            bố/mẹ có thể xem cùng khi em muốn chia sẻ.
          </p>

          <ul
            className="mt-4 space-y-2 text-sm"
            style={{ color: COLORS.stone[700] }}
          >
            <li>· Không bán hoặc chia sẻ dữ liệu cá nhân</li>
            <li>· Không chẩn đoán y khoa hay tâm lý</li>
            <li>· Em có thể dừng và xóa dữ liệu trên máy bất cứ lúc nào</li>
          </ul>

          <div
            className="mt-5 rounded-xl px-3 py-2 text-sm"
            style={{
              backgroundColor: theme.bg,
              color: theme.textDark,
              border: `1px solid ${theme.border}`,
            }}
          >
            Nhóm <strong>{theme.label}</strong> · {theme.ageRange}
          </div>

          <div className="mt-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={parentConsent}
                onChange={(e) => setParentConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-stone-300"
                style={{ accentColor: theme.accent }}
              />
              <span className="text-sm" style={{ color: COLORS.stone[800] }}>
                Bố/mẹ đã đọc và đồng ý cho em sử dụng TNCB Learn
              </span>
            </label>

            {needsChildConsent && (
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={childConsent}
                  onChange={(e) => setChildConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-stone-300"
                  style={{ accentColor: theme.accent }}
                />
                <span className="text-sm" style={{ color: COLORS.stone[800] }}>
                  Em cũng đồng ý tham gia (đồng ý kép theo Luật 91/2025)
                </span>
              </label>
            )}
          </div>

          {error && (
            <p
              className="mt-4 text-sm rounded-lg px-3 py-2"
              style={{ backgroundColor: '#FEF2F2', color: COLORS.error }}
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleStart}
            className="mt-6 w-full min-h-12 rounded-xl font-semibold text-white"
            style={{ backgroundColor: theme.accent }}
          >
            Bắt đầu khám phá
          </button>
        </div>

        <Link
          to={`/onboarding?age=${ageGroup}`}
          className="mt-6 block text-center text-sm"
          style={{ color: COLORS.stone[500] }}
        >
          ← Sửa ngày sinh
        </Link>
      </motion.div>
    </div>
  )
}
