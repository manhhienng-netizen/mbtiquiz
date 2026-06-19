import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  SELF_DEV_DISCLAIMER,
  getMbtiGroup,
  getHobbies,
  getPlatformsByGroup,
  getHRZones,
} from '../lib/pa-self-dev'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PASelfDev() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => setMbtiType(r?.mbtiType ?? null))
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const hobbies = mbtiType ? getHobbies(mbtiType) : null
  const platforms = group ? getPlatformsByGroup(group) : []

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="PHÁT TRIỂN" title="Kỹ năng & học tập" sub={mbtiType ?? undefined} />
        <Disclaimer text={SELF_DEV_DISCLAIMER} />

        {platforms.length > 0 ? (
          <Section title="Nền tảng học tập">
            {platforms.slice(0, 5).map((p) => (
              <div key={p.name} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: PA_ACCENT_RGBA(0.8) }}>{p.type} · {p.cost}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>{p.why}</div>
              </div>
            ))}
          </Section>
        ) : null}

        {hobbies ? (
          <Section title="Hobby gợi ý">
            {hobbies.primary.slice(0, 4).map((name) => (
              <div key={name} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{name}</div>
              </div>
            ))}
          </Section>
        ) : null}

        <Section title="Vùng nhịp tim (tham khảo · 30 tuổi)">
          {(() => {
            const hr = getHRZones(30, 'male')
            const rows = [
              ['Zone 1', hr.zone1_recovery],
              ['Zone 2', hr.zone2_fatBurn],
              ['Zone 3', hr.zone3_aerobic],
            ] as const
            return rows.map(([label, z]) => (
              <div key={label} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{label}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{z.pct} · {z.min}-{z.max} bpm</div>
              </div>
            ))
          })()}
        </Section>
      </div>
    </PaShell>
  )
}

function Header({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: PA_ACCENT_RGBA(0.7), marginBottom: 8 }}>{label}</div>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>📚 {title}</h1>
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
