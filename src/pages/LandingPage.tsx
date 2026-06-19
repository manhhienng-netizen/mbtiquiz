import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ATMOSPHERIC_OVERLAY_LIGHT } from '../components/AtmosphericPage'
import { pickRandomBackground } from '../utils/sessionBackground'

const TOP_FIGS = [
  'layer3-entj-female.webp',
  'layer3-infj-male.webp',
  'layer3-esfj-female.webp',
  'layer3-estp-male.webp',
  'layer3-intj-male.webp',
  'layer3-enfj-female.webp',
  'layer3-istj-male.webp',
  'layer3-esfp-female.webp',
]

const RIGHT_FIGS = [
  'layer3-enfp-female.webp',
  'layer3-isfp-male.webp',
  'layer3-intp-female.webp',
  'layer3-estj-male.webp',
  'layer3-enfj-male.webp',
  'layer3-istp-female.webp',
  'layer3-entj-male.webp',
  'layer3-isfj-female.webp',
]

const BOTTOM_FIGS = [
  'layer3-isfj-male.webp',
  'layer3-entp-female.webp',
  'layer3-esfp-male.webp',
  'layer3-infp-female.webp',
  'layer3-estj-female.webp',
  'layer3-enfp-male.webp',
  'layer3-istp-male.webp',
  'layer3-infj-female.webp',
]

const LEFT_FIGS = [
  'layer3-isfp-female.webp',
  'layer3-esfj-male.webp',
  'layer3-infp-male.webp',
  'layer3-intp-male.webp',
  'layer3-estp-female.webp',
  'layer3-istj-female.webp',
  'layer3-entp-male.webp',
  'layer3-intj-female.webp',
]

const CW = 52
const CH = 76

type Slot = { x: number; y: number; src: string }

function BorderFigures() {
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === 'undefined' ? 375 : window.innerWidth,
    height: typeof window === 'undefined' ? 740 : window.innerHeight,
  }))

  useEffect(() => {
    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const slots = useMemo(() => {
    const computed: Slot[] = []
    const W = viewport.width > 375 ? 375 : viewport.width
    const H = viewport.height
    const xStep = (W - CW) / 7
    const yStart = CH + 10
    const yEnd = H - CH - CH - 10
    const yStep = (yEnd - yStart) / 7

    TOP_FIGS.forEach((fig, i) => {
      computed.push({
        x: Math.round(i * xStep),
        y: 2,
        src: `/assets/figures/${fig}`,
      })
    })

    RIGHT_FIGS.forEach((fig, i) => {
      computed.push({
        x: W - CW - 2,
        y: Math.round(yStart + i * yStep),
        src: `/assets/figures/${fig}`,
      })
    })

    BOTTOM_FIGS.forEach((fig, i) => {
      computed.push({
        x: Math.round((7 - i) * xStep),
        y: H - CH - 2,
        src: `/assets/figures/${fig}`,
      })
    })

    LEFT_FIGS.forEach((fig, i) => {
      computed.push({
        x: 2,
        y: Math.round(yStart + (7 - i) * yStep),
        src: `/assets/figures/${fig}`,
      })
    })

    return computed
  }, [viewport.height, viewport.width])

  return (
    <>
      {slots.map((s, i) => (
        <img
          key={`${s.src}-${i}`}
          src={s.src}
          alt=""
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: CW,
            height: CH,
            objectFit: 'contain',
            zIndex: 10,
            pointerEvents: 'none',
            animation: 'figIn 1s ease both',
            animationDelay: `${0.02 + i * 0.03}s`,
          }}
        />
      ))}
    </>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const bgFile = useMemo(() => pickRandomBackground(), [])
  const bgUrl = `/assets/backgrounds/${bgFile}`

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        overflow: 'hidden',
        background: '#07070D',
        fontFamily: "'Be Vietnam Pro', sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 18%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: ATMOSPHERIC_OVERLAY_LIGHT,
        }}
      />

      <BorderFigures />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 11,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 54% 48% at 50% 42%, rgba(7,7,13,1) 0%, rgba(7,7,13,0.95) 18%, rgba(7,7,13,0.7) 32%, rgba(7,7,13,0.2) 48%, rgba(7,7,13,0) 60%, rgba(7,7,13,0) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          zIndex: 20,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -52%)',
          textAlign: 'center',
          width: 252,
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: '#fff',
            margin: 0,
            textShadow: '0 0 60px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,1)',
          }}
        >
          Bạn là ai
        </h1>

        <p
          style={{
            fontSize: 29,
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.18,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.50)',
            margin: '0 0 20px',
            textShadow: '0 0 40px rgba(0,0,0,0.9)',
          }}
        >
          trong vũ trụ này?
        </p>

        <div
          style={{
            width: 24,
            height: 1,
            background: 'rgba(255,255,255,0.18)',
            margin: '0 auto 12px',
          }}
        />

        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.30)',
            margin: '0 0 5px',
          }}
        >
          MBTI · Số học · Ngũ Hành · Nhật Chủ
        </p>

        <p
          style={{
            fontSize: 11,
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.22)',
            margin: '0 0 22px',
          }}
        >
          4 chiều sâu — 1 chân dung hoàn chỉnh
        </p>

        <button
          type="button"
          onClick={() => navigate('/start')}
          style={{
            display: 'inline-block',
            padding: '10px 30px',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.70)',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 30,
            cursor: 'pointer',
          }}
        >
          Khám phá ngay →
        </button>
      </div>
    </div>
  )
}
