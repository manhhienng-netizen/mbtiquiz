import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  SOCIAL_DISCLAIMER,
  getMbtiGroup,
  getSocialStyle,
  getBoundaryScriptsByGroup,
  getOpeningScripts,
} from '../lib/pa-social'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PASocial() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => setMbtiType(r?.mbtiType ?? null))
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const style = group ? getSocialStyle(group) : null
  const scripts = group ? getBoundaryScriptsByGroup(group) : []
  const openings = group ? getOpeningScripts(group) : []

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="XÃ HỘI" title="Kết bạn & ranh giới" sub={mbtiType ?? undefined} />
        <Disclaimer text={SOCIAL_DISCLAIMER} />

        {style ? (
          <Section title="Phong cách xã hội">
            <div style={card}>
              <Row label="Nguồn năng lượng" value={style.energySource} />
              <Row label="Kết bạn" value={style.friendshipStyle} />
              <Row label="Cô đơn đô thị" value={`${style.urbanLonelinessRisk} — ${style.urbanLonelinessNote}`} />
            </div>
          </Section>
        ) : null}

        {openings.length > 0 ? (
          <Section title="Mở đầu hội thoại">
            {openings.slice(0, 3).map((o) => (
              <div key={o.context} style={card}>
                <div style={{ fontSize: 12, color: PA_ACCENT_RGBA(0.8) }}>{o.context}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>{o.script}</div>
              </div>
            ))}
          </Section>
        ) : null}

        {scripts.length > 0 ? (
          <Section title="Script ranh giới">
            {scripts.slice(0, 4).map((s) => (
              <div key={s.situation} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{s.situation}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{s.script}</div>
              </div>
            ))}
          </Section>
        ) : null}
      </div>
    </PaShell>
  )
}

function Header({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: PA_ACCENT_RGBA(0.7), marginBottom: 8 }}>{label}</div>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>🤝 {title}</h1>
      {sub ? <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{sub}</p> : null}
    </div>
  )
}

function Disclaimer({ text }: { text: string }) {
  return (
    <div style={{ ...card, borderColor: 'rgba(255,200,100,0.25)', background: 'rgba(255,200,100,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 16 }}>{text}</div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 22 }}>
      <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>{title}</h2>
      {children}
    </section>
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
