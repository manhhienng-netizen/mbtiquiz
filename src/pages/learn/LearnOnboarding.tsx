import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { calculateAge, parseBirthDateInput } from '@tncb/core/age-gate'
import {
  AGE_GROUP_THEME,
  COLORS,
  LAYOUT,
  type AgeGroupId,
} from '@tncb/data/design-tokens'
import {
  isValidAgeGroupParam,
  learnGroupFromBirthDate,
  USER_PROFILE_KEY,
  type UserProfile,
} from '../../lib/learn-age-groups'

function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate()
}

export default function LearnOnboarding() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paramAge = searchParams.get('age')

  const [selectedGroup, setSelectedGroup] = useState<AgeGroupId | null>(() =>
    isValidAgeGroupParam(paramAge) ? paramAge : null,
  )
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isValidAgeGroupParam(paramAge)) {
      setSelectedGroup(paramAge)
    }
  }, [paramAge])

  const theme = selectedGroup ? AGE_GROUP_THEME[selectedGroup] : null

  const dobString = useMemo(() => {
    if (!day || !month || !year) return ''
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
  }, [day, month, year])

  const parsedDate = useMemo(
    () => (dobString ? parseBirthDateInput(dobString) : null),
    [dobString],
  )

  const suggestedGroup = parsedDate ? learnGroupFromBirthDate(parsedDate) : null
  const age = parsedDate ? calculateAge(parsedDate) : null
  const matches =
    parsedDate &&
    selectedGroup &&
    suggestedGroup !== null &&
    suggestedGroup === selectedGroup

  const mismatch =
    parsedDate && selectedGroup && suggestedGroup && suggestedGroup !== selectedGroup

  const outOfRange = parsedDate && suggestedGroup === null

  if (!selectedGroup || !theme) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: COLORS.background.cream }}
      >
        <p className="text-stone-600 text-center mb-4">
          Chưa chọn nhóm tuổi. Hãy quay lại trang chủ.
        </p>
        <Link
          to="/learn"
          className="font-medium underline"
          style={{ color: COLORS.primary[700] }}
        >
          Về trang chủ
        </Link>
      </div>
    )
  }

  const maxDay = month && year ? daysInMonth(Number(month), Number(year)) : 31
  const years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - 5 - i)

  function handleContinue() {
    if (!selectedGroup) return
    setError(null)
    if (!parsedDate) {
      setError('Em nhập đầy đủ và đúng ngày sinh (ngày/tháng/năm).')
      return
    }
    if (outOfRange) {
      setError(
        'Tuổi này chưa nằm trong nhóm 6–22 tuổi của TNCB Learn. Bố/mẹ có thể liên hệ khi có phiên bản phù hợp hơn.',
      )
      return
    }
    if (mismatch && suggestedGroup) {
      setError('Ngày sinh không khớp nhóm tuổi đã chọn. Em có thể đổi sang nhóm gợi ý bên dưới.')
      return
    }

    const profile: UserProfile = {
      ageGroup: selectedGroup,
      dob: dobString,
      onboardedAt: new Date().toISOString(),
    }
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))

    if (age !== null && age < 16) {
      navigate(
        `/learn/consent?age=${selectedGroup}&dob=${encodeURIComponent(dobString)}`,
      )
      return
    }
    navigate(`/quiz/${selectedGroup}`)
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
        <Link
          to="/learn"
          className="text-sm font-medium mb-6 inline-block"
          style={{ color: COLORS.stone[500] }}
        >
          ← Quay lại
        </Link>

        <h1
          className="text-2xl font-semibold mb-2"
          style={{
            fontFamily: 'Lexend, system-ui, sans-serif',
            color: COLORS.stone[900],
          }}
        >
          Bắt đầu cùng {theme.label}
        </h1>
        <p className="text-sm mb-6" style={{ color: COLORS.stone[600] }}>
          Xác nhận nhóm tuổi và ngày sinh để em có trải nghiệm phù hợp.
        </p>

        <div
          className="rounded-2xl p-4 mb-6 flex items-center gap-4"
          style={{
            backgroundColor: COLORS.background.white,
            border: `2px solid ${theme.border}`,
            borderRadius: LAYOUT.borderRadius.lg,
          }}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
            style={{ backgroundColor: theme.bg }}
          >
            {theme.icon}
          </span>
          <div>
            <p
              className="font-semibold text-lg"
              style={{
                fontFamily: 'Lexend, system-ui, sans-serif',
                color: theme.textDark,
              }}
            >
              {theme.label}
            </p>
            <p className="text-sm" style={{ color: theme.accent }}>
              {theme.ageRange} · {theme.tagline}
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-5 mb-4"
          style={{
            backgroundColor: COLORS.background.white,
            borderRadius: LAYOUT.borderRadius.lg,
            boxShadow: '0 1px 3px rgba(28, 25, 23, 0.06)',
          }}
        >
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: COLORS.stone[700] }}
          >
            Ngày sinh của em
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <span className="text-xs text-stone-500">Ngày</span>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm bg-white"
                style={{ borderColor: COLORS.stone[300] }}
              >
                <option value="">—</option>
                {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={String(d)}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-xs text-stone-500">Tháng</span>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm bg-white"
                style={{ borderColor: COLORS.stone[300] }}
              >
                <option value="">—</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={String(m)}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-xs text-stone-500">Năm</span>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2.5 text-sm bg-white"
                style={{ borderColor: COLORS.stone[300] }}
              >
                <option value="">—</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {parsedDate && age !== null && (
            <p className="mt-3 text-sm" style={{ color: COLORS.stone[600] }}>
              Tuổi hiện tại: <strong>{age}</strong> tuổi
            </p>
          )}
        </div>

        {mismatch && suggestedGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl p-4 mb-4"
            style={{
              backgroundColor: COLORS.amber[50],
              border: `1px solid ${COLORS.amber[200]}`,
            }}
          >
            <p className="text-sm" style={{ color: COLORS.amber[900] }}>
              Theo ngày sinh, nhóm phù hợp hơn là{' '}
              <strong>{AGE_GROUP_THEME[suggestedGroup].label}</strong> (
              {AGE_GROUP_THEME[suggestedGroup].ageRange}).
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedGroup(suggestedGroup)
                setError(null)
                navigate(`/learn/onboarding?age=${suggestedGroup}`, { replace: true })
              }}
              className="mt-3 text-sm font-semibold underline"
              style={{ color: AGE_GROUP_THEME[suggestedGroup].accent }}
            >
              Đổi sang {AGE_GROUP_THEME[suggestedGroup].label}
            </button>
          </motion.div>
        )}

        {error && (
          <p
            className="text-sm mb-4 rounded-xl px-3 py-2"
            style={{
              backgroundColor: '#FEF2F2',
              color: COLORS.error,
            }}
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={!matches}
          className="w-full min-h-12 rounded-xl font-semibold text-white transition-opacity disabled:opacity-40"
          style={{ backgroundColor: theme.accent }}
        >
          Tiếp tục
        </button>

        {matches && age !== null && (
          <p className="mt-3 text-center text-xs" style={{ color: COLORS.stone[500] }}>
            {age < 16
              ? 'Em dưới 16 tuổi — bước tiếp theo cần sự đồng ý của bố/mẹ.'
              : 'Em sẽ vào bài khảo sát ngay sau bước này.'}
          </p>
        )}
      </motion.div>
    </div>
  )
}
