import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MaShell from '../components/MaShell'
import MaTopBar from '../components/MaTopBar'

const MA_ACCENT = '#E88B9E'

function hexToRgba(hex: string, op: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${op})`
}

const CONTEXTS = [
  { id: 'spouse', label: 'Với vợ/chồng', icon: '💑', maContext: 'spouse' },
  { id: 'parent', label: 'Với bố/mẹ', icon: '👴', maContext: 'parent' },
  { id: 'child-young', label: 'Với con', icon: '👶', maContext: 'child-young' },
] as const

export default function MatchSanTap() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('maContext') || searchParams.get('module') === 'MA') {
      navigate(`/match/san-tap/session?${searchParams.toString()}`, {
        replace: true,
      })
    }
  }, [navigate, searchParams])

  const handleSelect = (ctx: (typeof CONTEXTS)[number]) => {
    const params = new URLSearchParams({
      module: 'MA',
      maContext: ctx.maContext,
    })
    navigate(`/match/san-tap/session?${params.toString()}`)
  }

  return (
    <MaShell>
      <MaTopBar backLabel="Tâm tính" backRoute="/match" />

      <div style={{ padding: '8px 16px 32px' }}>
        <div style={{ padding: '20px 8px 28px' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: hexToRgba(MA_ACCENT, 0.7),
              marginBottom: 8,
            }}
          >
            SÂN TẬP · TÂM TÍNH
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#fff',
            }}
          >
            Bạn muốn luyện tập với ai?
          </h1>
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 14,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Chọn ngữ cảnh để vào tình huống phù hợp.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CONTEXTS.map((ctx) => (
            <button
              key={ctx.id}
              type="button"
              onClick={() => handleSelect(ctx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: hexToRgba(MA_ACCENT, 0.08),
                border: `1px solid ${hexToRgba(MA_ACCENT, 0.28)}`,
                borderRadius: 14,
                padding: '18px 20px',
                cursor: 'pointer',
                transition: 'all 180ms ease',
                fontFamily: 'inherit',
                textAlign: 'left',
                width: '100%',
              }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{ctx.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>
                  {ctx.label}
                </div>
                {ctx.id === 'child-young' ? (
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.45)',
                      marginTop: 3,
                    }}
                  >
                    Chọn độ tuổi ở bước tiếp theo
                  </div>
                ) : null}
              </div>
              <span
                style={{
                  fontSize: 18,
                  color: hexToRgba(MA_ACCENT, 0.5),
                  flexShrink: 0,
                }}
              >
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </MaShell>
  )
}
