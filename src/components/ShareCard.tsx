import { forwardRef, type CSSProperties } from 'react'
import { getArchetypeVisual } from '../data/archetype-visual'
import ConstellationSVG from './ConstellationSVG'

const figureBaseStyle: CSSProperties = {
  position: 'absolute',
  bottom: '-5%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '180%',
  height: 'auto',
  maxWidth: 'none',
  display: 'block',
  objectFit: 'contain',
  objectPosition: 'center bottom',
}

export interface ShareCardProps {
  archetypeKey: string
  mbtiNickname: string
  combinationPhrase?: string
  mbtiType: string
  identity: 'A' | 'T'
  inOneSentence: string
  coreTraitLabels: string[]
  nhatChu?: string
  element?: string
  lifePath?: number
  gender?: string
  genderPreference?: string
}

const SLUG_MAP: Record<string, string> = {
  Giáp: 'giap',
  Ất: 'at',
  Bính: 'binh',
  Đinh: 'dinh',
  Mậu: 'mau',
  Kỷ: 'ky',
  Canh: 'canh',
  Tân: 'tan',
  Nhâm: 'nham',
  Quý: 'quy',
  Kim: 'kim',
  Mộc: 'moc',
  Thủy: 'thuy',
  Hỏa: 'hoa',
  Thổ: 'tho',
}

function toSlug(vn: string): string {
  return SLUG_MAP[vn] || vn.toLowerCase()
}

function getTitleSize(text: string): number {
  if (text.length <= 12) return 28
  if (text.length <= 18) return 24
  if (text.length <= 24) return 21
  return 18
}

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>((props, ref) => {
  const {
    archetypeKey,
    mbtiNickname,
    combinationPhrase,
    mbtiType,
    identity,
    inOneSentence,
    coreTraitLabels,
    nhatChu,
    element,
    lifePath,
    gender,
    genderPreference,
  } = props

  const visual = getArchetypeVisual(archetypeKey)

  const bgPath =
    nhatChu && element
      ? `/assets/backgrounds/bg-${toSlug(nhatChu)}-${toSlug(element)}.webp`
      : visual.illustration

  const genderKey =
    gender === 'other' ? genderPreference || 'male' : gender || 'male'
  const figurePath = `/assets/figures/layer3-${mbtiType.toLowerCase()}-${genderKey}.webp`

  return (
    <div
      ref={ref}
      style={{
        width: 390,
        height: 844,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
      }}
    >
      <img
        src={bgPath}
        alt=""
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.88,
        }}
        onError={(e) => {
          e.currentTarget.src = visual.illustration
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '57%',
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.85) 50%, #0A0A0A 100%)',
        }}
      />

      <img
        src={figurePath}
        alt=""
        crossOrigin="anonymous"
        style={{
          ...figureBaseStyle,
          filter: 'blur(16px)',
          opacity: 0.3,
        }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />

      <img
        src={figurePath}
        alt=""
        crossOrigin="anonymous"
        style={figureBaseStyle}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />

      {lifePath ? (
        <ConstellationSVG lifePath={lifePath} width={390} height={420} />
      ) : null}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.94) 45%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div
          style={{
            color: 'rgba(255,255,255,0.98)',
            fontSize: getTitleSize(mbtiNickname),
            fontWeight: 800,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {mbtiNickname}
        </div>

        {combinationPhrase ? (
          <div
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.3,
              marginTop: 2,
            }}
          >
            {combinationPhrase}
          </div>
        ) : null}

        <div
          style={{
            color: 'rgba(255,255,255,0.61)',
            fontSize: 13,
            fontStyle: 'italic',
            lineHeight: 1.5,
            marginTop: 4,
          }}
        >
          &ldquo;{inOneSentence}&rdquo;
        </div>

        <div
          style={{
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.12)',
            margin: '4px 0',
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              color: 'rgba(255,255,255,0.90)',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {mbtiType}-{identity}
          </span>
          {element ? (
            <>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                ·
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                {element}
              </span>
            </>
          ) : null}
          {nhatChu ? (
            <>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                ·
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                {nhatChu}
              </span>
            </>
          ) : null}
          {lifePath ? (
            <>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
                ·
              </span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                Số {lifePath}
              </span>
            </>
          ) : null}
        </div>

        {coreTraitLabels.length > 0 ? (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {coreTraitLabels.slice(0, 3).map((t, i) => (
              <span
                key={i}
                style={{
                  color: 'rgba(255,255,255,0.57)',
                  fontSize: 10,
                  border: '1px solid rgba(255,255,255,0.20)',
                  borderRadius: 18,
                  padding: '3px 10px',
                  background: 'rgba(255,255,255,0.055)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <span style={{ color: 'rgba(255,255,255,0.29)', fontSize: 10 }}>
            tncb.app
          </span>
        </div>
      </div>
    </div>
  )
})

ShareCard.displayName = 'ShareCard'
export default ShareCard
