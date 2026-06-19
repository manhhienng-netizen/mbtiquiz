import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import PageSpinner from '../components/PageSpinner'
import { clearWorkChat } from '../lib/work-assistant-storage'
import {
  SCALE_BAND_OPTIONS,
  type ScaleBand,
} from '../data/scale-tint-content'
import {
  defaultWorkUserId,
  getWorkProfile,
  saveWorkProfile,
  WORK_LEVEL_LABELS,
  type WorkLevel,
} from '../db/tncb-db'

const LEVELS: WorkLevel[] = ['fresher', 'junior', 'senior', 'lead', 'manager']

export default function WorkSettings() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [occupation, setOccupation] = useState('')
  const [level, setLevel] = useState<WorkLevel>('junior')
  const [scaleBand, setScaleBand] = useState<ScaleBand | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const profile = await getWorkProfile(defaultWorkUserId())
      if (profile) {
        setOccupation(profile.occupation)
        setLevel(profile.level)
        setScaleBand(profile.scaleBand ?? null)
      }
      setLoading(false)
    }
    void load()
  }, [])

  async function handleSave() {
    if (!occupation.trim() || saving) return
    setSaving(true)
    try {
      await saveWorkProfile({
        userId: defaultWorkUserId(),
        occupation: occupation.trim(),
        level,
        ...(scaleBand ? { scaleBand } : {}),
        updatedAt: Date.now(),
      })
      navigate('/work')
    } finally {
      setSaving(false)
    }
  }

  function handleClearChat() {
    clearWorkChat()
    alert('Đã xóa lịch sử chat công việc.')
  }

  if (loading) {
    return (
      <AtmosphericPage
        overlay="medium"
        contentStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageSpinner label="Đang tải..." />
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage
      overlay="medium"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{ padding: '52px 20px 32px' }}
    >
      <button
        type="button"
        onClick={() => navigate('/work')}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '20px',
          padding: 0,
        }}
      >
        ← Làm việc
      </button>

      <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 24px' }}>
        Cài đặt Work Assistant
      </h2>

      <label
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '8px',
        }}
      >
        Nghề nghiệp
      </label>
      <input
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        placeholder="Nghề của bạn"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px 14px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.04)',
          color: '#fff',
          fontSize: '14px',
          fontFamily: 'inherit',
          outline: 'none',
          marginBottom: '20px',
        }}
      />

      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '10px',
        }}
      >
        Cấp độ
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {LEVELS.map((lv) => (
          <button
            key={lv}
            type="button"
            onClick={() => setLevel(lv)}
            style={{
              textAlign: 'left',
              padding: '12px 14px',
              borderRadius: '12px',
              border:
                level === lv
                  ? '1px solid rgba(168,230,61,0.45)'
                  : '1px solid rgba(255,255,255,0.10)',
              background:
                level === lv ? 'rgba(168,230,61,0.10)' : 'rgba(255,255,255,0.03)',
              color: level === lv ? '#A8E63D' : 'rgba(255,255,255,0.80)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
            }}
          >
            {WORK_LEVEL_LABELS[lv]}
          </button>
        ))}
      </div>

      <div
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.45)',
          marginBottom: '10px',
        }}
      >
        Quy mô tổ chức bạn đang làm
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {SCALE_BAND_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setScaleBand(opt.value)}
            style={{
              textAlign: 'left',
              padding: '12px 14px',
              borderRadius: '12px',
              border:
                scaleBand === opt.value
                  ? '1px solid rgba(168,230,61,0.45)'
                  : '1px solid rgba(255,255,255,0.10)',
              background:
                scaleBand === opt.value
                  ? 'rgba(168,230,61,0.10)'
                  : 'rgba(255,255,255,0.03)',
              color:
                scaleBand === opt.value ? '#A8E63D' : 'rgba(255,255,255,0.80)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
            }}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setScaleBand(null)}
          style={{
            textAlign: 'left',
            padding: '12px 14px',
            borderRadius: '12px',
            border:
              scaleBand === null
                ? '1px solid rgba(168,230,61,0.45)'
                : '1px solid rgba(255,255,255,0.10)',
            background:
              scaleBand === null ? 'rgba(168,230,61,0.10)' : 'rgba(255,255,255,0.03)',
            color: scaleBand === null ? '#A8E63D' : 'rgba(255,255,255,0.55)',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '14px',
          }}
        >
          Bỏ qua
        </button>
      </div>

      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={!occupation.trim() || saving}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '14px',
          border: 'none',
          background:
            !occupation.trim() || saving ? 'rgba(168,230,61,0.25)' : '#A8E63D',
          color: !occupation.trim() || saving ? 'rgba(255,255,255,0.4)' : '#0A0A0F',
          fontSize: '15px',
          fontWeight: 700,
          cursor: !occupation.trim() || saving ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          marginBottom: '16px',
        }}
      >
        {saving ? 'Đang lưu...' : 'Lưu'}
      </button>

      <button
        type="button"
        onClick={handleClearChat}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(255,255,255,0.03)',
          color: 'rgba(255,255,255,0.65)',
          fontSize: '14px',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Xóa lịch sử chat công việc
      </button>
    </AtmosphericPage>
  )
}
