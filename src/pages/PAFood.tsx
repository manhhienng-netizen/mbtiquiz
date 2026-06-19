import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  FOOD_DISCLAIMER,
  getMbtiGroup,
  getDishByGroup,
  getRecipesByGroup,
  FOOD_STYLE_BY_GROUP,
} from '../lib/pa-food'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAFood() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => setMbtiType(r?.mbtiType ?? null))
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const style = group ? FOOD_STYLE_BY_GROUP[group] : null
  const dishes = group ? getDishByGroup(group) : []
  const recipes = group ? getRecipesByGroup(group) : []

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <Header label="ẨM THỰC" title="Món ăn & dinh dưỡng" sub={mbtiType ?? undefined} />
        <Disclaimer text={FOOD_DISCLAIMER} />

        {style ? (
          <Section title={`Phong cách ${group}`}>
            <div style={card}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 8px' }}>{style.relationship}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{style.eatingOut}</p>
            </div>
          </Section>
        ) : null}

        {dishes.length > 0 ? (
          <Section title="Món VN gợi ý">
            {dishes.slice(0, 5).map((d) => (
              <div key={d.name} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{d.name}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{d.description}</div>
              </div>
            ))}
          </Section>
        ) : null}

        {recipes.length > 0 ? (
          <Section title="Công thức">
            {recipes.slice(0, 3).map((r) => (
              <div key={r.name} style={card}>
                <div style={{ fontWeight: 600, color: '#fff' }}>{r.name}</div>
                <div style={{ fontSize: 12, color: PA_ACCENT_RGBA(0.8) }}>{r.time} phút · {r.difficulty}</div>
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
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>🍜 {title}</h1>
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
