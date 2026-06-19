import { Link } from 'react-router-dom'
import CollapsibleSection from './CollapsibleSection'
import type { ScaleBand } from '../data/scale-tint-content'
import {
  getRoleTransitionVnContext,
  ROLE_TRANSITION_CARDS,
  ROLE_TRANSITION_TYPE_TINT,
} from '../data/role-transition-cards'
import type { MbtiType } from '../data/manager-coaching-b2b'

type RoleTransitionSectionProps = {
  mbtiType: MbtiType
  scaleBand?: ScaleBand | null
  embedded?: boolean
}

function TransitionCardBody({
  body,
  selfAsk,
  contextLabel,
}: {
  body: string
  selfAsk: string
  contextLabel?: string
}) {
  return (
    <>
      {contextLabel ? (
        <p
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '6px',
          }}
        >
          {contextLabel}
        </p>
      ) : null}
      <p
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '13px',
          lineHeight: 1.6,
          marginBottom: '8px',
        }}
      >
        {body}
      </p>
      <p
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '12px',
          fontStyle: 'italic',
        }}
      >
        Tự hỏi: {selfAsk}
      </p>
    </>
  )
}

export default function RoleTransitionSection({
  mbtiType,
  scaleBand = null,
  embedded = false,
}: RoleTransitionSectionProps) {
  const typeTint = ROLE_TRANSITION_TYPE_TINT[mbtiType]
  const vnContext = getRoleTransitionVnContext(scaleBand)
  const nestedSize = embedded ? 'sm' : 'md'

  return (
    <section id="chuyen-vai-tro" style={{ marginTop: embedded ? 0 : '32px' }}>
      {!embedded ? (
        <>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
              marginBottom: '28px',
            }}
          />

          <h2
            style={{
              margin: '0 0 6px',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            Chuyển vai trò
          </h2>
          <p
            style={{
              margin: '0 0 20px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.50)',
            }}
          >
            Từ làm giỏi sang dẫn tốt — hướng dẫn chuyển đổi vai trò
          </p>
        </>
      ) : null}

      <div
        style={{
          padding: embedded ? 0 : '20px',
          background: embedded ? 'none' : 'rgba(255,255,255,0.03)',
          border: embedded ? 'none' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: embedded ? 0 : '16px',
        }}
      >
        {!embedded ? (
          <>
            <p
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px',
              }}
            >
              Bạn vừa được bổ nhiệm?
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '14px',
                marginBottom: '16px',
              }}
            >
              Chuyển từ làm giỏi sang dẫn tốt là bước chuyển lớn — và ít ai chuẩn bị
              cho.
            </p>
          </>
        ) : null}

        {ROLE_TRANSITION_CARDS.map((rtCard) => (
          <CollapsibleSection
            key={rtCard.id}
            title={rtCard.title}
            variant="list"
            size={nestedSize}
          >
            <TransitionCardBody
              body={rtCard.body}
              selfAsk={rtCard.selfAsk}
              contextLabel={rtCard.context === 'VN' ? 'Bối cảnh VN' : undefined}
            />
          </CollapsibleSection>
        ))}

        {typeTint ? (
          <CollapsibleSection
            icon="✨"
            iconImg="/assets/icons/vai-tro-by-type.png"
            title={`Theo type của bạn (${mbtiType})`}
            variant="list"
            size={nestedSize}
          >
            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '13px',
                lineHeight: 1.6,
                marginBottom: '8px',
              }}
            >
              <span style={{ fontWeight: 600 }}>Điểm mạnh: </span>
              {typeTint.strength}
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                lineHeight: 1.6,
                marginBottom: '8px',
              }}
            >
              <span style={{ fontWeight: 600 }}>Cần ý thức: </span>
              {typeTint.watchOut}
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px',
                fontStyle: 'italic',
              }}
            >
              Tự hỏi: {typeTint.selfAsk}
            </p>
          </CollapsibleSection>
        ) : null}

        {vnContext ? (
          <CollapsibleSection
            icon="🇻🇳"
            iconImg="/assets/icons/vai-tro-context.png"
            title="Bối cảnh làm việc"
            variant="list"
            size={nestedSize}
          >
            <TransitionCardBody
              body={vnContext.note}
              selfAsk={vnContext.selfAsk}
              contextLabel={vnContext.context}
            />
          </CollapsibleSection>
        ) : null}

        <p
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '12px',
            marginTop: '12px',
          }}
        >
          Hỏi sâu hơn về vai trò mới →{' '}
          <Link
            to="/work/chat"
            style={{
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'underline',
            }}
          >
            trợ lý công việc
          </Link>
        </p>
      </div>
    </section>
  )
}
