import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TNCB_TYPE_CONTENT } from '../data/tncb-mbti-content'
import { ATMOSPHERIC_OVERLAY_LIGHT } from '../components/AtmosphericPage'
import { pickRandomBackground } from '../utils/sessionBackground'

const PAGE_FONT = "'Be Vietnam Pro', system-ui, sans-serif"

const TYPE_GROUPS = [
  {
    group: 'Nhà phân tích',
    types: [
      { code: 'INTJ', tagline: TNCB_TYPE_CONTENT['INTJ'].nickname },
      { code: 'INTP', tagline: TNCB_TYPE_CONTENT['INTP'].nickname },
      { code: 'ENTJ', tagline: TNCB_TYPE_CONTENT['ENTJ'].nickname },
      { code: 'ENTP', tagline: TNCB_TYPE_CONTENT['ENTP'].nickname },
    ],
  },
  {
    group: 'Nhà ngoại giao',
    types: [
      { code: 'INFJ', tagline: TNCB_TYPE_CONTENT['INFJ'].nickname },
      { code: 'INFP', tagline: TNCB_TYPE_CONTENT['INFP'].nickname },
      { code: 'ENFJ', tagline: TNCB_TYPE_CONTENT['ENFJ'].nickname },
      { code: 'ENFP', tagline: TNCB_TYPE_CONTENT['ENFP'].nickname },
    ],
  },
  {
    group: 'Người bảo vệ',
    types: [
      { code: 'ISTJ', tagline: TNCB_TYPE_CONTENT['ISTJ'].nickname },
      { code: 'ISFJ', tagline: TNCB_TYPE_CONTENT['ISFJ'].nickname },
      { code: 'ESTJ', tagline: TNCB_TYPE_CONTENT['ESTJ'].nickname },
      { code: 'ESFJ', tagline: TNCB_TYPE_CONTENT['ESFJ'].nickname },
    ],
  },
  {
    group: 'Nhà thám hiểm',
    types: [
      { code: 'ISTP', tagline: TNCB_TYPE_CONTENT['ISTP'].nickname },
      { code: 'ISFP', tagline: TNCB_TYPE_CONTENT['ISFP'].nickname },
      { code: 'ESTP', tagline: TNCB_TYPE_CONTENT['ESTP'].nickname },
      { code: 'ESFP', tagline: TNCB_TYPE_CONTENT['ESFP'].nickname },
    ],
  },
]

const routeBtnStyle = {
  flex: 1,
  padding: '20px 16px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 16,
  color: '#fff',
  fontSize: 15,
  textAlign: 'center' as const,
  cursor: 'pointer',
  fontFamily: PAGE_FONT,
  lineHeight: 1.4,
}

export default function StartRouting() {
  const navigate = useNavigate()
  const [showPicker, setShowPicker] = useState(false)
  const bgFile = useMemo(() => pickRandomBackground(), [])
  const bgUrl = `/assets/backgrounds/${bgFile}`

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        background: '#07070D',
        overflow: showPicker ? 'auto' : 'hidden',
        fontFamily: PAGE_FONT,
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 18%',
        }}
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          background: ATMOSPHERIC_OVERLAY_LIGHT,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        {!showPicker ? (
          <div
            style={{
              minHeight: '100dvh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 24px',
            }}
          >
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#fff',
                textAlign: 'center',
                lineHeight: 1.35,
                margin: '0 0 32px',
              }}
            >
              Bạn đã biết
              <br />
              type MBTI của mình chưa?
            </h1>

            <div
              style={{
                display: 'flex',
                gap: 12,
                width: '100%',
                maxWidth: 360,
              }}
            >
              <button
                type="button"
                onClick={() => navigate('/quiz')}
                style={routeBtnStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                Chưa —
                <br />
                cho tôi khám phá
              </button>
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                style={routeBtnStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
              >
                Rồi,
                <br />
                tôi là...
              </button>
            </div>

            <p
              style={{
                marginTop: 24,
                fontSize: 13,
                color: 'rgba(255,255,255,0.35)',
                textAlign: 'center',
              }}
            >
              Nhẹ nhàng, không phán xét
            </p>
          </div>
        ) : (
          <div
            style={{
              padding: '24px 16px 40px',
              maxWidth: 400,
              margin: '0 auto',
              opacity: 1,
              animation: 'startPickerIn 300ms ease',
            }}
          >
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                marginBottom: 20,
              }}
            >
              ← Quay lại
            </button>

            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#fff',
                textAlign: 'center',
                margin: '0 0 8px',
              }}
            >
              Chọn type của bạn
            </h2>

            {TYPE_GROUPS.map((group) => (
              <div key={group.group}>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.3)',
                    textAlign: 'center',
                    margin: '20px 0 10px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  {group.group}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                  }}
                >
                  {group.types.map((type) => (
                    <button
                      key={type.code}
                      type="button"
                      onClick={() =>
                        navigate(
                          `/explore?mbtiType=${type.code}&source=self-select`,
                        )
                      }
                      style={{
                        padding: '14px 12px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12,
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontFamily: PAGE_FONT,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          'rgba(192,184,212,0.5)'
                        e.currentTarget.style.background =
                          'rgba(192,184,212,0.08)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background =
                          'rgba(255,255,255,0.04)'
                      }}
                    >
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: '#fff',
                        }}
                      >
                        {type.code}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'rgba(255,255,255,0.5)',
                          marginTop: 4,
                          lineHeight: 1.3,
                        }}
                      >
                        {type.tagline}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes startPickerIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
