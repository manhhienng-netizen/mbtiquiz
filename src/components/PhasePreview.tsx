import { PREVIEW_MESSAGES } from '../data/mbti-quiz-data'

export type PreviewKey = 'I_N' | 'I_S' | 'E_N' | 'E_S' | 'uncertain'

export interface PhasePreviewProps {
  previewKey: PreviewKey
  onContinue: () => void
}

export default function PhasePreview({
  previewKey,
  onContinue,
}: PhasePreviewProps) {
  const message = PREVIEW_MESSAGES[previewKey] ?? PREVIEW_MESSAGES.uncertain

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        textAlign: 'center',
        padding: '28px 24px',
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        borderRadius: 24,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        animation: 'questionIn 0.25s ease both',
      }}
    >
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.90)',
          lineHeight: 1.3,
          margin: '0 0 16px',
        }}
      >
        {message.heading}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.6,
          margin: '0 0 16px',
        }}
      >
        {message.body}
      </p>
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.45)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 12,
          padding: '12px 16px',
          margin: '0 0 24px',
          lineHeight: 1.5,
        }}
      >
        {message.curiosityHook}
      </p>
      <button
        type="button"
        onClick={onContinue}
        style={{
          width: '100%',
          minHeight: 48,
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.90)',
          color: '#07070D',
          fontWeight: 700,
          fontSize: 14,
          border: 'none',
          borderRadius: 12,
          cursor: 'pointer',
        }}
      >
        Tiếp tục khám phá →
      </button>
    </div>
  )
}
