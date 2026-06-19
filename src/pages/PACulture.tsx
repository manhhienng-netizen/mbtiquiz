import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  CULTURE_DISCLAIMER,
  getMbtiGroup,
  getPhilosophiesByGroup,
  getRandomPhilosophy,
  LIFE_RITUALS,
} from '../lib/pa-culture'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PACulture() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [philosophy, setPhilosophy] = useState<ReturnType<typeof getRandomPhilosophy>>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => {
      const type = r?.mbtiType ?? null
      setMbtiType(type)
      if (type) setPhilosophy(getRandomPhilosophy(getMbtiGroup(type)))
    })
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const philosophies = group ? getPhilosophiesByGroup(group) : []

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="VĂN HÓA" title="Triết lý & nghi lễ" sub={mbtiType ?? undefined} />
        <Disclaimer text={CULTURE_DISCLAIMER} />

        {philosophy ? (
          <Section title="Triết lý hôm nay">
            <div style={{ ...card, borderColor: PA_ACCENT_RGBA(0.3), background: PA_ACCENT_RGBA(0.08) }}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{philosophy.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{philosophy.corePrinciples[0]}</div>
            </div>
          </Section>
        ) : null}

        {philosophies.length > 0 ? (
          <Section title="Triết lý phù hợp">
            {philosophies.slice(0, 4).map((p) => (
              <div key={p.name} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{p.whyThisGroup}</div>
              </div>
            ))}
          </Section>
        ) : null}

        <Section title="Nghi lễ đời sống">
          {LIFE_RITUALS.slice(0, 4).map((r) => (
            <div key={r.ritual} style={card}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{r.ritual}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{r.meaning}</div>
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
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>🏛️ {title}</h1>
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
