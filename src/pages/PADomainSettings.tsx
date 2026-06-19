import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import {
  ALL_PA_DOMAINS,
  PA_ACCENT,
  PA_DOMAIN_META,
  type PADomain,
} from '../data/pa-domains'
import { getPAPrefs, savePAPrefs } from '../db/tncb-db'

export default function PADomainSettings() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<PADomain[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void getPAPrefs().then((prefs) => {
      setSelected(prefs.selectedDomains)
      setLoading(false)
    })
  }, [])

  const toggleDomain = useCallback(async (domain: PADomain) => {
    const next = selected.includes(domain)
      ? selected.filter((item) => item !== domain)
      : [...selected, domain]

    if (next.length === 0) return

    setSelected(next)
    const prefs = await getPAPrefs()
    await savePAPrefs({
      ...prefs,
      selectedDomains: next,
    })
  }, [selected])

  if (loading) {
    return (
      <AtmosphericPage
        overlay="light"
        contentStyle={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Đang tải…</p>
      </AtmosphericPage>
    )
  }

  return (
    <AtmosphericPage
      overlay="light"
      style={{
        fontFamily: "'Be Vietnam Pro', sans-serif",
        color: '#fff',
      }}
      contentStyle={{
        minHeight: '100dvh',
        padding: '48px 20px 32px',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      <button
        type="button"
        onClick={() => navigate('/assistant')}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 20,
          padding: 0,
        }}
      >
        ← Cá nhân
      </button>

      <h1
        style={{
          fontSize: 22,
          fontWeight: 700,
          margin: '0 0 8px',
          lineHeight: 1.3,
        }}
      >
        Bạn muốn tôi đồng hành ở những mảng nào?
      </h1>
      <p
        style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.55)',
          marginBottom: 20,
        }}
      >
        Bật/tắt chủ đề — lưu ngay khi thay đổi.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}
      >
        {ALL_PA_DOMAINS.map((domain) => {
          const meta = PA_DOMAIN_META[domain]
          const isOn = selected.includes(domain)
          return (
            <button
              key={domain}
              type="button"
              onClick={() => void toggleDomain(domain)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 6,
                padding: '14px 12px',
                borderRadius: 14,
                border: isOn
                  ? `1px solid ${PA_ACCENT}`
                  : '1px solid rgba(255,255,255,0.1)',
                background: isOn
                  ? 'rgba(127,119,221,0.12)'
                  : 'rgba(255,255,255,0.03)',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'inherit',
                opacity: isOn ? 1 : 0.72,
              }}
            >
              <span style={{ fontSize: 24 }} aria-hidden>
                {meta.icon}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.88)',
                }}
              >
                {meta.name}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.35,
                }}
              >
                {meta.sub}
              </span>
            </button>
          )
        })}
      </div>

      {selected.length === 1 ? (
        <p
          style={{
            marginTop: 16,
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          Cần giữ ít nhất một chủ đề.
        </p>
      ) : null}
    </AtmosphericPage>
  )
}
