import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  HISTORY_DISCLAIMER,
  getMbtiGroup,
  getTurningPointsByGroup,
  getRandomTurningPoint,
} from '../lib/pa-history'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAHistory() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [spotlight, setSpotlight] = useState<ReturnType<typeof getRandomTurningPoint> | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => {
      setMbtiType(r?.mbtiType ?? null)
      setSpotlight(getRandomTurningPoint())
    })
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const turningPoints = group ? getTurningPointsByGroup(group) : []

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="LỊCH SỬ" title="Bước ngoặt & ý tưởng lớn" sub={mbtiType ?? undefined} />
        <Disclaimer text={HISTORY_DISCLAIMER} />

        {spotlight ? (
          <Section title="Bước ngoặt spotlight">
            <div style={{ ...card, borderColor: PA_ACCENT_RGBA(0.3), background: PA_ACCENT_RGBA(0.08) }}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{spotlight.event} ({spotlight.period})</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{spotlight.macroImpact}</div>
            </div>
          </Section>
        ) : null}

        {turningPoints.length > 0 ? (
          <Section title={`Góc nhìn ${group}`}>
            {turningPoints.slice(0, 5).map((tp) => (
              <div key={tp.event} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{tp.event} · {tp.period}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>
                  {group ? tp.mbtiPerspective[group] : tp.macroImpact}
                </div>
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
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>📜 {title}</h1>
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
