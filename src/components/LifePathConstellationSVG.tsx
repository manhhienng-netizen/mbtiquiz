import { CONSTELLATION_PATTERNS } from '../utils/constellationPatterns'
import { LIFEPATH_ACCENT } from '../utils/colorUtils'

interface LifePathConstellationProps {
  lifePathNumber: number
  width?: number
  height?: number
  opacity?: number
}

export function ConstellationSVG({
  lifePathNumber,
  width = 300,
  height = 100,
  opacity = 0.5,
}: LifePathConstellationProps) {
  const pattern = CONSTELLATION_PATTERNS[lifePathNumber]
  if (!pattern) return null

  const accentColor = LIFEPATH_ACCENT[lifePathNumber] ?? '#B8A0D4'

  const toX = (xPct: number) => (xPct / 100) * width
  const toY = (yPct: number) => (yPct / 100) * height

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity, display: 'block' }}
      aria-hidden
    >
      {pattern.lines.map(([from, to], i) => (
        <line
          key={`line-${i}`}
          x1={toX(pattern.stars[from][0])}
          y1={toY(pattern.stars[from][1])}
          x2={toX(pattern.stars[to][0])}
          y2={toY(pattern.stars[to][1])}
          stroke={accentColor}
          strokeWidth={0.8}
          strokeOpacity={0.35}
        />
      ))}
      {pattern.stars.map(([x, y], i) => (
        <circle
          key={`star-${i}`}
          cx={toX(x)}
          cy={toY(y)}
          r={i === 0 ? 2.5 : 1.5}
          fill={accentColor}
          className={i === 0 ? 'star-pulse-large' : `star-pulse-${i % 9}`}
        />
      ))}
    </svg>
  )
}
