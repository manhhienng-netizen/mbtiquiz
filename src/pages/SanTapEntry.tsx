import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AtmosphericPage from '../components/AtmosphericPage'
import type { CaseRole } from '../data/roleplay-case-studies'
import { QUIZ_RESULT_KEY } from '../data/quiz-types'
import { getLatestMBTI } from '../db/tncb-db'
import type { ArcState } from '../lib/arena-arc'
import { getActiveArcId, loadArcState } from '../lib/arena-arc-db'
import {
  getCurrentEpisodeIndex,
  isStaticArcFinished,
} from '../lib/arena-session'

const WA_ACCENT = '#A8E63D'

const ROLE_LABELS: Record<CaseRole, string> = {
  NV: 'Nhân viên',
  MG: 'Quản lý',
  KH: 'Khách hàng',
  DT: 'Đối tác',
  VT: 'Chuyển vai',
}

const ARC_ROLES: CaseRole[] = ['NV', 'MG', 'KH', 'DT', 'VT']

function hexToRgba(hex: string, opacity: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${opacity})`
}

function isArcInProgress(state: ArcState): boolean {
  if (state.source === 'ai') return !state.context.isComplete
  return !isStaticArcFinished(state)
}

function buildArcLabel(state: ArcState): string {
  const epIdx = getCurrentEpisodeIndex(state)
  const roleLabel = ROLE_LABELS[state.context.role]
  return `Tập ${state.arcNumber} · ${roleLabel} · Tình huống ${epIdx + 1}`
}

export default function SanTapEntry() {
  const navigate = useNavigate()
  const [mbtiType, setMbtiType] = useState<string | null>(null)
  const [hasArc, setHasArc] = useState(false)
  const [arcLabel, setArcLabel] = useState('')

  useEffect(() => {
    async function load() {
      let type = (await getLatestMBTI())?.mbtiType
      if (!type) {
        const raw = localStorage.getItem(QUIZ_RESULT_KEY)
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as { mbtiType?: string }
            type = parsed.mbtiType
          } catch {
            type = undefined
          }
        }
      }
      setMbtiType(type ?? null)

      for (const role of ARC_ROLES) {
        const arcId = getActiveArcId(role)
        if (!arcId) continue
        const state = await loadArcState(arcId)
        if (!state || !isArcInProgress(state)) continue
        setHasArc(true)
        setArcLabel(buildArcLabel(state))
        break
      }
    }
    void load()
  }, [])

  const handleNew = () => {
    const params = new URLSearchParams({ mode: 'smart' })
    if (mbtiType) params.set('type', mbtiType)
    navigate(`/work/san-tap?${params.toString()}`)
  }

  const handleResume = () => {
    if (hasArc) navigate('/work/san-tap?resume=true')
  }

  return (
    <AtmosphericPage overlay="medium">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          padding: '0 16px',
          fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
          color: '#fff',
        }}
      >
        <div style={{ paddingTop: 16, paddingBottom: 8 }}>
          <button
            type="button"
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: 'rgba(255,255,255,0.6)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'inherit',
            }}
          >
            <span style={{ fontSize: 16 }}>←</span>
            <span>Trang chủ</span>
          </button>
        </div>

        <div style={{ padding: '24px 8px 32px' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: hexToRgba(WA_ACCENT, 0.7),
              marginBottom: 8,
            }}
          >
            SÂN TẬP
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#fff',
            }}
          >
            Luyện phản xạ qua tình huống thực
          </h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            type="button"
            onClick={handleNew}
            style={{
              background: hexToRgba(WA_ACCENT, 0.08),
              border: `1px solid ${hexToRgba(WA_ACCENT, 0.35)}`,
              borderRadius: 16,
              padding: '20px 20px',
              cursor: 'pointer',
              transition: 'all 180ms ease',
              textAlign: 'left',
              fontFamily: 'inherit',
              color: 'inherit',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 10,
              }}
            >
              <img
                src="/assets/icons/santap-new.png"
                alt=""
                aria-hidden
                width={40}
                height={40}
                style={{ mixBlendMode: 'screen', filter: 'brightness(1.8)' }}
              />
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>
                Thử case mới
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.60)',
              }}
            >
              {mbtiType
                ? `Tình huống phù hợp với ${mbtiType}`
                : 'Phù hợp với bạn'}
            </div>
          </button>

          <button
            type="button"
            onClick={handleResume}
            disabled={!hasArc}
            style={{
              background: hasArc
                ? hexToRgba(WA_ACCENT, 0.05)
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${
                hasArc
                  ? hexToRgba(WA_ACCENT, 0.2)
                  : 'rgba(255,255,255,0.08)'
              }`,
              borderRadius: 16,
              padding: '20px 20px',
              cursor: hasArc ? 'pointer' : 'not-allowed',
              opacity: hasArc ? 1 : 0.5,
              transition: 'all 180ms ease',
              textAlign: 'left',
              fontFamily: 'inherit',
              color: 'inherit',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 10,
              }}
            >
              <img
                src="/assets/icons/santap-resume.png"
                alt=""
                aria-hidden
                width={40}
                height={40}
                style={{
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.8)',
                  opacity: hasArc ? 1 : 0.4,
                }}
              />
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: hasArc ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                Tiếp tục
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: hasArc
                  ? 'rgba(255,255,255,0.60)'
                  : 'rgba(255,255,255,0.30)',
              }}
            >
              {hasArc ? arcLabel : 'Chưa có arc đang dở'}
            </div>
          </button>
        </div>
      </div>
    </AtmosphericPage>
  )
}
