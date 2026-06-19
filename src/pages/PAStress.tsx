import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  STRESS_DISCLAIMER,
  getMbtiGroup,
  getStressTechniques,
  getImmediateTechnique,
  STRESS_RECOGNITION,
  WHEN_TO_SEEK_HELP,
} from '../lib/pa-stress'

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAStress() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((r) => setMbtiType(r?.mbtiType ?? null))
  }, [])

  const group = mbtiType ? getMbtiGroup(mbtiType) : null
  const recognition = group ? STRESS_RECOGNITION[group] : null
  const techniques = group ? getStressTechniques(group) : null
  const immediate = group ? getImmediateTechnique(group) : null

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />
      <div style={{ padding: '8px 16px 32px' }}>
        <ModuleHeader icon="🧘" label="STRESS" title="Nhận diện & điều tiết" sub={mbtiType ?? undefined} />
        <Disclaimer text={STRESS_DISCLAIMER} />

        {recognition ? (
          <>
            <Section title="Dấu hiệu theo nhóm">
              <div style={card}>
                {recognition.stressTypes.map((t) => (
                  <div key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>• {t}</div>
                ))}
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '8px 0 0' }}>{recognition.vietnameseContext}</p>
              </div>
            </Section>
            {immediate ? (
              <Section title="Kỹ thuật ngay">
                <div style={{ ...card, borderColor: PA_ACCENT_RGBA(0.3), background: PA_ACCENT_RGBA(0.08) }}>
                  <div style={{ fontWeight: 600, color: '#fff' }}>{immediate.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{immediate.steps}</div>
                </div>
              </Section>
            ) : null}
            {techniques ? (
              <Section title="Ngắn & dài hạn">
                {techniques.shortTerm.slice(0, 3).map((t) => (
                  <div key={t} style={card}><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</div></div>
                ))}
              </Section>
            ) : null}
          </>
        ) : null}

        <Section title="Khi nào cần hỗ trợ chuyên nghiệp">
          {WHEN_TO_SEEK_HELP.clinicalSigns.map((s) => (
            <div key={s} style={card}><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{s}</div></div>
          ))}
          {WHEN_TO_SEEK_HELP.resources.map((r) => (
            <div key={r.name} style={card}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{r.name}</div>
              <div style={{ fontSize: 13, color: PA_ACCENT_RGBA(0.85) }}>{r.phone}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{r.hours} · {r.scope}</div>
            </div>
          ))}
        </Section>
      </div>
    </PaShell>
  )
}

function ModuleHeader({ icon, label, title, sub }: { icon: string; label: string; title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: PA_ACCENT_RGBA(0.7), marginBottom: 8 }}>{label}</div>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>{icon} {title}</h1>
      {sub ? <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{sub}</p> : null}
    </div>
  )
}

function Disclaimer({ text }: { text: string }) {
  return (
    <div style={{ ...card, borderColor: 'rgba(255,200,100,0.25)', background: 'rgba(255,200,100,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 16 }}>
      {text}
    </div>
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
