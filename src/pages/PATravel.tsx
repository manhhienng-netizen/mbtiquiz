import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import {
  getTravelTypeSpec,
  getCompatiblePairs,
  getChallengingPairs,
  getRegionTraps,
  VN_TRAVEL_TRAPS_BY_REGION,
  VN_TRAVEL_TRAPS_GENERAL,
  TOURIST_RIGHTS_URL,
  TOURIST_RIGHTS_PHONE,
} from '../lib/pa-travel'

const REGION_LABELS: Record<string, string> = {
  hanoi: 'Hà Nội',
  danang: 'Đà Nẵng',
  nhatrang: 'Nha Trang',
  dalat: 'Đà Lạt',
  phuquoc: 'Phú Quốc',
  hcmc: 'TP.HCM',
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PATravel() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [savedRegion, setSavedRegion] = useState<string>('')

  useEffect(() => {
    void getLatestMBTI().then((record) => {
      setMbtiType(record?.mbtiType ?? null)
    })
  }, [])

  const spec = mbtiType ? getTravelTypeSpec(mbtiType) : null
  const goodPairs = mbtiType ? getCompatiblePairs(mbtiType) : []
  const hardPairs = mbtiType ? getChallengingPairs(mbtiType) : []
  const regionTraps = savedRegion
    ? getRegionTraps(savedRegion as keyof typeof VN_TRAVEL_TRAPS_BY_REGION)
    : []

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
            DU LỊCH
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>
            Điểm đến & tips
          </h1>
          {mbtiType ? (
            <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              Phong cách {mbtiType}
            </p>
          ) : null}
        </div>

        {spec ? (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
              ✈️ Gợi ý cho bạn
            </h2>
            <div style={cardStyle}>
              <Field label="VN" value={spec.perfectDestinationVN} />
              <Field label="Quốc tế" value={spec.perfectDestinationIntl} />
              <Field label="Tránh" value={spec.avoidDestination} />
              <Field label="Thời lượng" value={spec.idealTripLength} />
              <Field label="Đi cùng ai" value={spec.travelCompanion} />
              <Field label="Must-do" value={spec.mustDo} />
            </div>
          </section>
        ) : null}

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
            ⚠️ Bẫy theo vùng
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
            Chọn điểm đến để xem cảnh báo phổ biến
          </p>
          <select
            value={savedRegion}
            onChange={(e) => setSavedRegion(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              fontSize: 14,
              marginBottom: 12,
              fontFamily: 'inherit',
            }}
          >
            <option value="">— Chọn vùng —</option>
            {Object.entries(REGION_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          {savedRegion && regionTraps.length > 0 ? (
            <div
              style={{
                ...cardStyle,
                borderColor: 'rgba(255,180,80,0.35)',
                background: 'rgba(255,180,80,0.08)',
              }}
            >
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                Bạn sắp đến {REGION_LABELS[savedRegion]} — {regionTraps.length} bẫy phổ biến
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                {regionTraps.map((trap) => (
                  <li key={trap} style={{ marginBottom: 6 }}>
                    {trap}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>

        {goodPairs.length > 0 || hardPairs.length > 0 ? (
          <section style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
              🤝 Đi cùng type khác
            </h2>
            {goodPairs.map((p) => (
              <div key={p.pair} style={cardStyle}>
                <div style={{ fontWeight: 600, color: PA_ACCENT_RGBA(0.9), marginBottom: 4 }}>
                  ✓ {p.pair}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{p.rationale}</div>
              </div>
            ))}
            {hardPairs.map((p) => (
              <div key={p.pair} style={cardStyle}>
                <div style={{ fontWeight: 600, color: 'rgba(255,180,100,0.95)', marginBottom: 4 }}>
                  ⚡ {p.pair}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
                  {p.conflict}
                </div>
                <div style={{ fontSize: 13, color: PA_ACCENT_RGBA(0.85) }}>
                  → {p.resolution}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        <section style={{ marginBottom: 22 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
            🛡️ Bẫy chung (2025–2026)
          </h2>
          {VN_TRAVEL_TRAPS_GENERAL.map((t) => (
            <div key={t.trap} style={cardStyle}>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>{t.trap}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{t.details}</div>
            </div>
          ))}
        </section>

        <div style={{ ...cardStyle, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
          Quyền lợi du khách:{' '}
          <a href={TOURIST_RIGHTS_URL} target="_blank" rel="noreferrer" style={{ color: PA_ACCENT_RGBA(0.9) }}>
            tourism.gov.vn
          </a>
          {' · '}
          <a href="tel:+842439421060" style={{ color: PA_ACCENT_RGBA(0.9) }}>
            {TOURIST_RIGHTS_PHONE}
          </a>
        </div>
      </div>
    </PaShell>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: PA_ACCENT_RGBA(0.7), marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.45 }}>{value}</div>
    </div>
  )
}
