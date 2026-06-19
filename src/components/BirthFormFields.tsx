import { useState } from 'react'

import type { Gender } from '../data/quiz-types'



export interface BirthFormSubmitData {

  fullName: string

  gender: Gender

  genderPreference?: 'male' | 'female'

  day: string

  month: string

  year: string

  birthHour: string | null

}



export interface BirthFormFieldsProps {

  onSubmit: (data: BirthFormSubmitData) => void

  isLoading?: boolean

}



const HOUR_OPTIONS: { value: string; label: string }[] = [

  { value: 'Tý', label: 'Tý (23:00–01:00)' },

  { value: 'Sửu', label: 'Sửu (01:00–03:00)' },

  { value: 'Dần', label: 'Dần (03:00–05:00)' },

  { value: 'Mão', label: 'Mão (05:00–07:00)' },

  { value: 'Thìn', label: 'Thìn (07:00–09:00)' },

  { value: 'Tỵ', label: 'Tỵ (09:00–11:00)' },

  { value: 'Ngọ', label: 'Ngọ (11:00–13:00)' },

  { value: 'Mùi', label: 'Mùi (13:00–15:00)' },

  { value: 'Thân', label: 'Thân (15:00–17:00)' },

  { value: 'Dậu', label: 'Dậu (17:00–19:00)' },

  { value: 'Tuất', label: 'Tuất (19:00–21:00)' },

  { value: 'Hợi', label: 'Hợi (21:00–23:00)' },

]



function daysInMonth(month: number, year: number): number {

  return new Date(year, month, 0).getDate()

}



function isValidCalendarDate(day: number, month: number, year: number): boolean {

  if (day < 1 || month < 1 || month > 12) return false

  return day <= daysInMonth(month, year)

}



function toggleButtonClass(selected: boolean, size: 'default' | 'sm' = 'default') {

  return [

    size === 'sm' ? 'min-h-10 py-2 px-4 text-sm' : 'min-h-12 py-3 px-4 flex-1',

    'rounded-xl border font-semibold transition-colors',

    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E63D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]',

    selected

      ? 'border-[#A8E63D] bg-[rgba(168,230,61,0.15)] text-[#A8E63D]'

      : 'border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.75)] hover:border-[rgba(168,230,61,0.35)]',

  ].join(' ')

}



export default function BirthFormFields({

  onSubmit,

  isLoading = false,

}: BirthFormFieldsProps) {

  const [fullName, setFullName] = useState('')

  const [gender, setGender] = useState<Gender | null>(null)

  const [genderPreference, setGenderPreference] = useState<

    'male' | 'female' | null

  >(null)

  const [day, setDay] = useState('')

  const [month, setMonth] = useState('')

  const [year, setYear] = useState('')

  const [birthHour, setBirthHour] = useState('')

  const [errors, setErrors] = useState<{

    fullName?: string

    gender?: string

    genderPreference?: string

    day?: string

    month?: string

    year?: string

  }>({})



  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault()

    const nextErrors: typeof errors = {}



    const trimmedName = fullName.trim()

    if (!trimmedName || trimmedName.split(/\s+/).filter(Boolean).length < 2) {

      nextErrors.fullName = 'Vui lòng nhập họ tên đầy đủ (ít nhất 2 từ)'

    }



    if (!gender) {

      nextErrors.gender = 'Vui lòng chọn giới tính'

    } else if (gender === 'other' && !genderPreference) {

      nextErrors.genderPreference = 'Vui lòng chọn hình ảnh bạn muốn dùng'

    }



    const d = parseInt(day, 10)

    const m = parseInt(month, 10)

    const y = parseInt(year, 10)



    if (!day.trim()) {

      nextErrors.day = 'Vui lòng nhập ngày'

    } else if (Number.isNaN(d) || d < 1 || d > 31) {

      nextErrors.day = 'Ngày phải từ 1 đến 31'

    }



    if (!month.trim()) {

      nextErrors.month = 'Vui lòng nhập tháng'

    } else if (Number.isNaN(m) || m < 1 || m > 12) {

      nextErrors.month = 'Tháng phải từ 1 đến 12'

    }



    if (!year.trim()) {

      nextErrors.year = 'Vui lòng nhập năm'

    } else if (!/^\d{4}$/.test(year.trim())) {

      nextErrors.year = 'Năm sinh phải là 4 chữ số'

    } else if (Number.isNaN(y) || y < 0) {

      nextErrors.year = 'Năm sinh không hợp lệ'

    }



    if (

      !nextErrors.day &&

      !nextErrors.month &&

      !nextErrors.year &&

      !Number.isNaN(d) &&

      !Number.isNaN(m) &&

      !Number.isNaN(y)

    ) {

      if (!isValidCalendarDate(d, m, y)) {

        nextErrors.day = 'Ngày/tháng/năm không hợp lệ (ví dụ: không có 30/2)'

      }

    }



    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return



    onSubmit({

      fullName: trimmedName,

      gender: gender!,

      ...(gender === 'other' && genderPreference

        ? { genderPreference }

        : {}),

      day,

      month,

      year,

      birthHour: birthHour || null,

    })

  }



  const fieldClass = (hasError: boolean) =>

    [

      'w-full border rounded-xl px-4 py-3 text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-[#A8E63D]/50 bg-[rgba(0,0,0,0.25)]',

      hasError ? 'border-red-400/80' : 'border-[rgba(255,255,255,0.15)]',

    ].join(' ')



  return (

    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto" noValidate>

      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">

        Khám phá Tâm Linh

      </h1>

      <p className="text-center text-[rgba(255,255,255,0.55)] text-sm mb-8">

        Can Chi · Nhật Chủ · Số chủ đạo

      </p>



      <div className="space-y-5">

        <div>

          <label

            htmlFor="fullName"

            className="block text-sm font-medium text-[rgba(255,255,255,0.65)] mb-1"

          >

            Họ tên đầy đủ

          </label>

          <input

            id="fullName"

            type="text"

            autoComplete="name"

            placeholder="Nguyễn Văn An"

            value={fullName}

            onChange={(e) => {

              setFullName(e.target.value)

              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }))

            }}

            disabled={isLoading}

            className={fieldClass(!!errors.fullName)}

          />

          {errors.fullName && (

            <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>

          )}

        </div>



        <div>

          <span className="block text-sm font-medium text-[rgba(255,255,255,0.65)] mb-2">

            Giới tính

          </span>

          <div className="flex gap-2" role="group" aria-label="Giới tính">

            {(

              [

                { value: 'male' as const, label: 'Nam' },

                { value: 'female' as const, label: 'Nữ' },

                { value: 'other' as const, label: 'Khác' },

              ] as const

            ).map((opt) => (

              <button

                key={opt.value}

                type="button"

                disabled={isLoading}

                onClick={() => {

                  setGender(opt.value)

                  if (opt.value !== 'other') {

                    setGenderPreference(null)

                  }

                  if (errors.gender) {

                    setErrors((prev) => ({ ...prev, gender: undefined }))

                  }

                }}

                className={toggleButtonClass(gender === opt.value)}

                aria-pressed={gender === opt.value}

              >

                {opt.label}

              </button>

            ))}

          </div>

          {errors.gender && (

            <p className="mt-1 text-sm text-red-400">{errors.gender}</p>

          )}



          {gender === 'other' && (

            <div className="mt-4">

              <span className="block text-sm font-medium text-[rgba(255,255,255,0.65)] mb-2">

                Bạn muốn dùng hình ảnh nào?

              </span>

              <div

                className="flex gap-2 max-w-xs"

                role="group"

                aria-label="Hình ảnh cho ShareCard"

              >

                {(

                  [

                    { value: 'male' as const, label: 'Hình nam' },

                    { value: 'female' as const, label: 'Hình nữ' },

                  ] as const

                ).map((opt) => (

                  <button

                    key={opt.value}

                    type="button"

                    disabled={isLoading}

                    onClick={() => {

                      setGenderPreference(opt.value)

                      if (errors.genderPreference) {

                        setErrors((prev) => ({

                          ...prev,

                          genderPreference: undefined,

                        }))

                      }

                    }}

                    className={toggleButtonClass(

                      genderPreference === opt.value,

                      'sm',

                    )}

                    aria-pressed={genderPreference === opt.value}

                  >

                    {opt.label}

                  </button>

                ))}

              </div>

              {errors.genderPreference && (

                <p className="mt-1 text-sm text-red-400">

                  {errors.genderPreference}

                </p>

              )}

            </div>

          )}

        </div>



        <div>

          <span className="block text-sm font-medium text-[rgba(255,255,255,0.65)] mb-1">

            Ngày sinh

          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

            <div>

              <input

                type="number"

                inputMode="numeric"

                placeholder="DD"

                min={1}

                max={31}

                value={day}

                onChange={(e) => {

                  setDay(e.target.value)

                  if (errors.day) setErrors((prev) => ({ ...prev, day: undefined }))

                }}

                disabled={isLoading}

                aria-label="Ngày"

                className={`${fieldClass(!!errors.day)} text-center`}

              />

              {errors.day && (

                <p className="mt-1 text-xs text-red-400">{errors.day}</p>

              )}

            </div>

            <div>

              <input

                type="number"

                inputMode="numeric"

                placeholder="MM"

                min={1}

                max={12}

                value={month}

                onChange={(e) => {

                  setMonth(e.target.value)

                  if (errors.month) setErrors((prev) => ({ ...prev, month: undefined }))

                }}

                disabled={isLoading}

                aria-label="Tháng"

                className={`${fieldClass(!!errors.month)} text-center`}

              />

              {errors.month && (

                <p className="mt-1 text-xs text-red-400">{errors.month}</p>

              )}

            </div>

            <div>

              <input

                type="number"

                inputMode="numeric"

                placeholder="YYYY"

                value={year}

                onChange={(e) => {

                  setYear(e.target.value)

                  if (errors.year) setErrors((prev) => ({ ...prev, year: undefined }))

                }}

                disabled={isLoading}

                aria-label="Năm"

                className={`${fieldClass(!!errors.year)} text-center`}

              />

              {errors.year && (

                <p className="mt-1 text-xs text-red-400">{errors.year}</p>

              )}

            </div>

          </div>

        </div>



        <div>

          <label

            htmlFor="birthHour"

            className="block text-sm font-medium text-[rgba(255,255,255,0.65)] mb-1"

          >

            Giờ sinh (không bắt buộc)

          </label>

          <select

            id="birthHour"

            value={birthHour}

            onChange={(e) => setBirthHour(e.target.value)}

            disabled={isLoading}

            className={fieldClass(false)}

          >

            <option value="" className="bg-[#1a1a22]">

              Chọn khung giờ

            </option>

            {HOUR_OPTIONS.map((opt) => (

              <option key={opt.value} value={opt.value} className="bg-[#1a1a22]">

                {opt.label}

              </option>

            ))}

          </select>

        </div>



        <p className="text-sm text-[rgba(255,255,255,0.45)] flex gap-2">

          <span className="shrink-0" aria-hidden>

            ⓘ

          </span>

          <span>

            Nhập thật để kết quả chính xác. Thông tin chỉ dùng để tính toán.

          </span>

        </p>



        <p className="text-sm text-[rgba(255,180,120,0.9)] bg-[rgba(255,180,120,0.08)] border border-[rgba(255,180,120,0.2)] rounded-xl px-4 py-3">

          ⚠️ Kết quả mang tính tham khảo, không phải chẩn đoán khoa học.

        </p>



        <button

          type="submit"

          disabled={isLoading}

          className="w-full min-h-12 py-3 bg-[rgba(168,230,61,0.90)] text-[#0A0A0F] font-semibold rounded-xl hover:bg-[#A8E63D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

        >

          {isLoading ? 'Đang xử lý...' : 'Khám phá ngay →'}

        </button>

      </div>

    </form>

  )

}

