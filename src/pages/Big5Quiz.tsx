import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BIG5_ITEMS } from '../data/big5-items'
import { getLatestMBTI, saveBig5Profile } from '../db/tncb-db'
import {
  BIG5_DIM_LABELS,
  getBig5BarColor,
  getBig5Level,
  getBig5LevelLabelVi,
  scoreBig5,
  type Big5Dim,
  type Big5Profile,
} from '../lib/big5-scoring'

type Screen = 'intro' | 'quiz' | 'result'

const ITEMS_PER_PAGE = 10
const PAGE_COUNT = 5

const glassCard = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: 16,
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
} as const

const LIKERT_LABELS = [
  'Hoàn toàn không đồng ý',
  '',
  '',
  '',
  'Hoàn toàn đồng ý',
] as const

const RESULT_DIMS: Big5Dim[] = ['O', 'C', 'E', 'A', 'N']

function LikertRow({
  value,
  onChange,
}: {
  value: number | undefined
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: 'rgba(255,255,255,0.4)',
          marginBottom: 8,
        }}
      >
        <span>{LIKERT_LABELS[0]}</span>
        <span>{LIKERT_LABELS[4]}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`${n}`}
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                border: selected
                  ? '1px solid rgba(168,230,61,0.5)'
                  : '1px solid rgba(255,255,255,0.12)',
                background: selected
                  ? 'rgba(168,230,61,0.18)'
                  : 'rgba(255,255,255,0.04)',
                color: selected ? '#A8E63D' : 'rgba(255,255,255,0.75)',
                fontSize: 15,
                fontWeight: selected ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {n}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ResultBar({ dim, score }: { dim: Big5Dim; score: number }) {
  const level = getBig5Level(score)
  const pct = ((score - 1) / 4) * 100

  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
          gap: 8,
        }}
      >
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
          {BIG5_DIM_LABELS[dim]}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
          {getBig5LevelLabelVi(level)}
        </span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: 4,
            background: getBig5BarColor(dim),
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  )
}

export default function Big5Quiz() {
  const navigate = useNavigate()
  const [screen, setScreen] = useState<Screen>('intro')
  const [page, setPage] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [profile, setProfile] = useState<Big5Profile | null>(null)
  const [saving, setSaving] = useState(false)

  const pageItems = useMemo(() => {
    const start = page * ITEMS_PER_PAGE
    return BIG5_ITEMS.slice(start, start + ITEMS_PER_PAGE)
  }, [page])

  const pageComplete = pageItems.every((item) => answers[item.id] != null)

  async function handleFinish() {
    const scored = scoreBig5(answers)
    setProfile(scored)
    setSaving(true)
    try {
      await saveBig5Profile(scored)
    } finally {
      setSaving(false)
      setScreen('result')
    }
  }

  function handleNext() {
    if (page < PAGE_COUNT - 1) {
      setPage((p) => p + 1)
      return
    }
    void handleFinish()
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#0A0A0F',
        color: '#fff',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        padding: '20px 16px',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}
    >
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {screen === 'intro' ? (
          <div style={{ ...glassCard, padding: 24 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 700,
                margin: '0 0 8px',
                color: 'rgba(255,255,255,0.92)',
              }}
            >
              Trắc nghiệm Big Five
            </h1>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
              50 câu · khoảng 5 phút
            </p>
            <p
              style={{
                margin: '0 0 16px',
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.72)',
              }}
            >
              Đây là phần bổ sung tùy chọn — bạn có thể bỏ qua bất cứ lúc nào.
            </p>
            <p
              style={{
                margin: '0 0 24px',
                fontSize: 13,
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.55)',
                fontStyle: 'italic',
              }}
            >
              Câu trả lời thành thật nhất là cần nhất — đặc biệt với những câu về cảm
              xúc.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="button"
                onClick={() => setScreen('quiz')}
                style={{
                  padding: '14px 20px',
                  borderRadius: 14,
                  border: 'none',
                  background: '#A8E63D',
                  color: '#0A0A0F',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Bắt đầu
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 14,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Bỏ qua
              </button>
            </div>
          </div>
        ) : null}

        {screen === 'quiz' ? (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                  Trang {page + 1}/{PAGE_COUNT}
                </span>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: 13,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  Bỏ qua
                </button>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${((page + 1) / PAGE_COUNT) * 100}%`,
                    height: '100%',
                    background: 'rgba(168,230,61,0.5)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {pageItems.map((item, idx) => (
                <div key={item.id} style={{ ...glassCard, padding: 16 }}>
                  <p
                    style={{
                      margin: '0 0 14px',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: 'rgba(255,255,255,0.88)',
                    }}
                  >
                    {page * ITEMS_PER_PAGE + idx + 1}. {item.text_vn}
                  </p>
                  <LikertRow
                    value={answers[item.id]}
                    onChange={(v) =>
                      setAnswers((prev) => ({ ...prev, [item.id]: v }))
                    }
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {page > 0 ? (
                <button
                  type="button"
                  onClick={() => setPage((p) => p - 1)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 14,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  ← Quay lại
                </button>
              ) : null}
              <button
                type="button"
                disabled={!pageComplete || saving}
                onClick={handleNext}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: 14,
                  border: 'none',
                  background:
                    !pageComplete || saving
                      ? 'rgba(168,230,61,0.25)'
                      : '#A8E63D',
                  color:
                    !pageComplete || saving
                      ? 'rgba(255,255,255,0.4)'
                      : '#0A0A0F',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: !pageComplete || saving ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {saving
                  ? 'Đang lưu...'
                  : page < PAGE_COUNT - 1
                    ? 'Tiếp theo'
                    : 'Hoàn thành'}
              </button>
            </div>
          </div>
        ) : null}

        {screen === 'result' && profile ? (
          <div style={{ ...glassCard, padding: 24 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                margin: '0 0 20px',
                color: 'rgba(255,255,255,0.92)',
              }}
            >
              Hồ sơ Big Five của bạn
            </h1>

            {RESULT_DIMS.map((dim) => (
              <ResultBar key={dim} dim={dim} score={profile[dim]} />
            ))}

            <p
              style={{
                margin: '20px 0 12px',
                fontSize: 12,
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Điểm được so sánh với dữ liệu toàn cầu — chưa có chuẩn VN. Kết quả phản
              ánh xu hướng, không phải chẩn đoán.
            </p>
            <p
              style={{
                margin: '0 0 24px',
                fontSize: 11,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Điểm Hòa hợp và Nhạy cảm cảm xúc có thể bị ảnh hưởng bởi văn hóa — không
              phải điểm tuyệt đối.
            </p>

            <button
              type="button"
              onClick={async () => {
                const mbti = await getLatestMBTI()
                navigate(mbti?.mbtiType ? '/result' : '/home')
              }}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: 14,
                border: 'none',
                background: '#A8E63D',
                color: '#0A0A0F',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ← Quay lại
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
