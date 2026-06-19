import { useState } from 'react'
import LegalCaseCard from '../components/LegalCaseCard'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import {
  getLegalCasesByGroup,
  type LegalGroup,
} from '../lib/pa-legal'

const TABS: { id: LegalGroup; label: string }[] = [
  { id: 'giao-thong', label: 'Giao thông' },
  { id: 'lao-dong', label: 'Lao động' },
  { id: 'an-toan', label: 'An toàn' },
]

export default function PALegal() {
  const [group, setGroup] = useState<LegalGroup>('giao-thong')
  const cases = getLegalCasesByGroup(group)

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
            PHÁP LUẬT
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            Quyền lợi & tình huống thực tế
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 18,
            overflowX: 'auto',
          }}
        >
          {TABS.map((tab) => {
            const active = tab.id === group
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGroup(tab.id)}
                style={{
                  flexShrink: 0,
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: `1px solid ${
                    active ? PA_ACCENT_RGBA(0.5) : 'rgba(255,255,255,0.1)'
                  }`,
                  background: active
                    ? PA_ACCENT_RGBA(0.15)
                    : 'rgba(255,255,255,0.03)',
                  color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {cases.map((legalCase) => (
          <LegalCaseCard key={legalCase.id} legalCase={legalCase} />
        ))}
      </div>
    </PaShell>
  )
}
