import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  SOCIAL_DISCLAIMER,
  getMbtiGroup,
  getEnvironmentStyle,
  PRACTICAL_GREEN_ACTIONS,
  VN_ENV_ORGANIZATIONS,
} from '../lib/pa-social'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAEnvironment() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => setMbtiType(r?.mbtiType ?? null))
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const envStyle = group ? getEnvironmentStyle(group) : null

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="MÔI TRƯỜNG" title="Sống xanh & bền vững" sub={mbtiType ?? undefined} />
        <Disclaimer text={SOCIAL_DISCLAIMER} />

        {envStyle ? (
          <Section title="Phong cách môi trường">
            <div style={card}>
              <Row label="Động lực" value={envStyle.motivation} />
              <Row label="Cách tiếp cận" value={envStyle.approach} />
              <Row label="Rào cản" value={envStyle.barriers} />
            </div>
          </Section>
        ) : null}

        <Section title="Hành động thực tế">
          {PRACTICAL_GREEN_ACTIONS.home.slice(0, 3).map((a) => (
            <div key={a} style={card}><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>🏠 {a}</div></div>
          ))}
          {PRACTICAL_GREEN_ACTIONS.food.slice(0, 2).map((a) => (
            <div key={a} style={card}><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>🥗 {a}</div></div>
          ))}
        </Section>

        <Section title="Tổ chức VN">
          {VN_ENV_ORGANIZATIONS.slice(0, 4).map((o) => (
            <div key={o.name} style={card}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{o.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{o.focus}</div>
            </div>
          ))}
        </Section>
      </div>
    </PaShell>
  )
}

function Header({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: PA_ACCENT_RGBA(0.7), marginBottom: 8 }}>{label}</div>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>🌍 {title}</h1>
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
