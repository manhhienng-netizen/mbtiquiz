import MaShell from '../MaShell'
import MaTopBar from '../MaTopBar'

const MA_ACCENT = '#E88B9E'

interface MatchComingSoonShellProps {
  iconSrc: string
  title: string
  description: string
}

export default function MatchComingSoonShell({
  iconSrc,
  title,
  description,
}: MatchComingSoonShellProps) {
  return (
    <MaShell>
      <MaTopBar backLabel="Quan hệ" backRoute="/match/relationships" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: 'calc(100dvh - 56px)',
          padding: '0 24px 40px',
        }}
      >
        <img
          src={iconSrc}
          alt=""
          width={64}
          height={64}
          style={{ mixBlendMode: 'screen', objectFit: 'contain', marginBottom: 16 }}
          draggable={false}
          aria-hidden
        />
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            margin: '0 0 8px',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.6)',
            margin: '0 0 24px',
            maxWidth: 300,
          }}
        >
          {description}
        </p>
        <div
          style={{
            padding: '12px 24px',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 500,
            background: 'rgba(232,139,158,0.15)',
            border: '1px solid rgba(232,139,158,0.3)',
            color: MA_ACCENT,
          }}
        >
          Sắp có · Đang phát triển
        </div>
      </div>
    </MaShell>
  )
}
