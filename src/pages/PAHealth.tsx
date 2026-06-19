import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  getSportsForType,
  getHealthNudge,
  getHealthStyle,
  getMbtiGroup,
  HEALTH_DISCLAIMER,
  HEART_RATE_ZONES,
} from '../lib/pa-health'

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAHealth() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [nudge, setNudge] = useState('')

  useEffect(() => {
    void getLatestMBTI().then((record) => {
      const type = record?.mbtiType ?? null
      setMbtiType(type)
      if (type) setNudge(getHealthNudge(type))
    })
  }, [])

  const profile = mbtiType ? getSportsForType(mbtiType) : null
  const groupStyle = mbtiType ? getHealthStyle(getMbtiGroup(mbtiType)) : null

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />

      <div style={{ padding: '8px 16px 32px' }}>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: PA_ACCENT_RGBA(0.7),
              marginBottom: 8,
            }}
          >
            SỨC KHỎE
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>
            Vận động & thói quen
          </h1>
          {mbtiType ? (
            <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              [R] based on personality-exercise research · {mbtiType}
            </p>
          ) : null}
        </div>

        <div
          style={{
            ...cardStyle,
            borderColor: 'rgba(255,200,100,0.25)',
            background: 'rgba(255,200,100,0.06)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
          }}
        >
          {HEALTH_DISCLAIMER}
        </div>

        {nudge ? (
          <div
            style={{
              ...cardStyle,
              borderColor: PA_ACCENT_RGBA(0.3),
              background: PA_ACCENT_RGBA(0.08),
              marginTop: 12,
            }}
          >
            <div style={{ fontSize: 13, color: '#fff', lineHeight: 1.45 }}>{nudge}</div>
          </div>
        ) : null}

        {groupStyle ? (
          <section style={{ marginTop: 22, marginBottom: 22 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
              Phong cách nhóm {profile?.group}
            </h2>
            <div style={cardStyle}>
              <StyleRow label="Động lực" value={groupStyle.coreMotivation} />
              <StyleRow label="Điểm mạnh" value={groupStyle.strengths} />
              <StyleRow label="Bẫy" value={groupStyle.trap} />
              <StyleRow label="Chiến lược" value={groupStyle.strategy} />
              <StyleRow label="Giấc ngủ" value={groupStyle.sleepPattern} />
            </div>
          </section>
        ) : null}

        {profile && profile.sports.length > 0 ? (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
              🏃 Môn phù hợp ({profile.sports.length})
            </h2>
            {profile.sports.map((sport) => (
              <div key={sport.name} style={cardStyle}>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                  {sport.name}
                  <span style={{ fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.45)', marginLeft: 8 }}>
                    {sport.category} · {sport.difficulty}
                    {sport.availableVN ? ' · có ở VN' : ''}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
                  {sport.whyThisGroup}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
            ❤️ Vùng nhịp tim (tham khảo)
          </h2>
          {HEART_RATE_ZONES.map((z) => (
            <div key={z.zone} style={cardStyle}>
              <div style={{ fontWeight: 600, color: '#fff' }}>
                Zone {z.zone}: {z.name} ({z.percentHRmax})
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                {z.purpose} · {z.weeklyMinutes}
              </div>
            </div>
          ))}
        </section>
      </div>
    </PaShell>
  )
}

function StyleRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: PA_ACCENT_RGBA(0.7) }}>{label}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.45 }}>{value}</div>
    </div>
  )
}
