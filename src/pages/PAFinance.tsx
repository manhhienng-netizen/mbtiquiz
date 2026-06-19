import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  FINANCE_DISCLAIMER,
  getMbtiGroup,
  getFinanceStyle,
  getTrapsByGroup,
  BUDGET_RULE_5030,
  FINANCIAL_CRISIS_SUPPORT,
  TGPL_HOTLINE,
  TGPL_URL,
} from '../lib/pa-finance'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAFinance() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => setMbtiType(r?.mbtiType ?? null))
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const style = group ? getFinanceStyle(group) : null
  const traps = group ? getTrapsByGroup(group) : []

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="TÀI CHÍNH" title="Ngân sách & bẫy" sub={mbtiType ?? undefined} />
        <Disclaimer text={FINANCE_DISCLAIMER} />

        {style ? (
          <section style={{ marginBottom: 22 }}>
            <h2 style={h2}>Phong cách {group}</h2>
            <div style={card}>
              <Row label="Cách tiếp cận" value={style.coreApproach} />
              <Row label="Điểm mạnh" value={style.strengths.join(' · ')} />
              <Row label="Bẫy" value={style.traps[0] ?? ''} />
              <Row label="Chiến lược" value={style.strategy} />
            </div>
          </section>
        ) : null}

        <section style={{ marginBottom: 22 }}>
          <h2 style={h2}>Quy tắc 50/30/20</h2>
          <div style={card}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{BUDGET_RULE_5030.description}</div>
          </div>
        </section>

        {traps.length > 0 ? (
          <section style={{ marginBottom: 22 }}>
            <h2 style={h2}>Bẫy phổ biến ({traps.length})</h2>
            {traps.slice(0, 6).map((t) => (
              <div key={t.name} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{t.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{t.description}</div>
              </div>
            ))}
          </section>
        ) : null}

        <section>
          <h2 style={h2}>Hỗ trợ khủng hoảng</h2>
          <div style={card}>
            TGPL:{' '}
            <a href={`tel:${TGPL_HOTLINE.replace(/\s/g, '')}`} style={{ color: PA_ACCENT_RGBA(0.9) }}>{TGPL_HOTLINE}</a>
            {' · '}
            <a href={TGPL_URL} target="_blank" rel="noreferrer" style={{ color: PA_ACCENT_RGBA(0.9) }}>tgpl.moj.gov.vn</a>
          </div>
          {FINANCIAL_CRISIS_SUPPORT.mentalHealth.slice(0, 3).map((r) => (
            <div key={r.name} style={card}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{r.name}</div>
              <div style={{ fontSize: 13, color: PA_ACCENT_RGBA(0.85) }}>{r.phone}</div>
            </div>
          ))}
        </section>
      </div>
    </PaShell>
  )
}

const h2: React.CSSProperties = { fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }

function Header({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: PA_ACCENT_RGBA(0.7), marginBottom: 8 }}>{label}</div>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>💰 {title}</h1>
      {sub ? <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{sub}</p> : null}
    </div>
  )
}

function Disclaimer({ text }: { text: string }) {
  return (
    <div style={{ ...card, borderColor: 'rgba(255,200,100,0.25)', background: 'rgba(255,200,100,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 16 }}>{text}</div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: PA_ACCENT_RGBA(0.7) }}>{label}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.45 }}>{value}</div>
    </div>
  )
}
