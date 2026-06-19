interface ConstellationProps {
  lifePath: number
  width: number
  height: number
}

const PATTERNS: Record<number, [number, number][]> = {
  1: [[50, 30]],
  2: [
    [35, 25],
    [65, 35],
  ],
  3: [
    [50, 15],
    [30, 45],
    [70, 45],
  ],
  4: [
    [30, 20],
    [70, 20],
    [70, 50],
    [30, 50],
  ],
  5: [
    [50, 10],
    [25, 30],
    [35, 55],
    [65, 55],
    [75, 30],
  ],
  6: [
    [50, 10],
    [25, 25],
    [75, 25],
    [25, 50],
    [75, 50],
    [50, 60],
  ],
  7: [
    [20, 15],
    [35, 10],
    [50, 20],
    [60, 15],
    [45, 35],
    [55, 45],
    [40, 55],
  ],
  8: [
    [50, 10],
    [70, 20],
    [75, 40],
    [60, 55],
    [40, 55],
    [25, 40],
    [30, 20],
    [50, 30],
  ],
  9: [
    [50, 8],
    [68, 18],
    [75, 38],
    [65, 55],
    [50, 62],
    [35, 55],
    [25, 38],
    [32, 18],
    [50, 30],
  ],
  11: [
    [40, 20],
    [40, 50],
    [60, 20],
    [60, 50],
  ],
  22: [
    [50, 10],
    [70, 35],
    [50, 60],
    [30, 35],
  ],
  33: [
    [50, 10],
    [70, 25],
    [70, 50],
    [50, 60],
    [30, 50],
    [30, 25],
  ],
}

export default function ConstellationSVG({
  lifePath,
  width,
  height,
}: ConstellationProps) {
  const coords = PATTERNS[lifePath]
  if (!coords) return null

  const stars = coords.map(([px, py]) => ({
    x: (px / 100) * width,
    y: (py / 100) * height,
  }))

  const gradientId = `starGlow-${lifePath}`

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.35,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0%" stopColor="rgba(210,200,255,0.4)" />
          <stop offset="100%" stopColor="rgba(210,200,255,0)" />
        </radialGradient>
      </defs>

      {stars.length > 1 &&
        stars.map((s, i) => {
          const next = stars[(i + 1) % stars.length]
          if (lifePath === 1) return null
          return (
            <g key={`line-${i}`}>
              <line
                x1={s.x}
                y1={s.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(0,0,0,0.2)"
                strokeWidth={4}
              />
              <line
                x1={s.x}
                y1={s.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(220,210,255,0.14)"
                strokeWidth={4}
              />
              <line
                x1={s.x}
                y1={s.y}
                x2={next.x}
                y2={next.y}
                stroke="rgba(240,230,255,0.25)"
                strokeWidth={2}
              />
            </g>
          )
        })}

      {stars.map((s, i) => (
        <g key={`star-${i}`}>
          <circle cx={s.x} cy={s.y} r={12} fill="rgba(0,0,0,0.25)" />
          <circle cx={s.x} cy={s.y} r={18} fill={`url(#${gradientId})`} />
          <circle cx={s.x} cy={s.y} r={5} fill="rgba(255,255,255,0.82)" />
          <circle cx={s.x} cy={s.y} r={2.5} fill="rgba(255,255,255,1)" />
        </g>
      ))}
    </svg>
  )
}
