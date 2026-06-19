import { useEffect, useState } from 'react'
import { getLatestMBTI } from '../db/tncb-db'
import { getEntertainmentForType } from '../lib/pa-entertainment'
import { PA_ACCENT_RGBA } from './PaShell'

export default function EntertainmentCard() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((record) => {
      setMbtiType(record?.mbtiType ?? null)
    })
  }, [])

  if (!mbtiType) return null

  const data = getEntertainmentForType(mbtiType)
  const topFilm = data.films[0]
  const topBook = data.books[0]
  const topDigital = data.digital[0]

  if (!topFilm && !topBook && !topDigital) return null

  return (
    <div
      style={{
        background: PA_ACCENT_RGBA(0.08),
        border: `1px solid ${PA_ACCENT_RGBA(0.25)}`,
        borderRadius: 16,
        padding: '16px 14px',
      }}
    >
      <p
        style={{
          margin: '0 0 4px',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: PA_ACCENT_RGBA(0.75),
        }}
      >
        Phù hợp với type bạn
      </p>
      <h3
        style={{
          margin: '0 0 10px',
          fontSize: 15,
          fontWeight: 700,
          color: '#fff',
        }}
      >
        Gợi ý giải trí · {mbtiType}
      </h3>

      {topFilm ? (
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          🎬 {topFilm.title} ({topFilm.year})
        </p>
      ) : null}
      {topBook ? (
        <p style={{ margin: '0 0 8px', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          📚 {topBook.title} — {topBook.author}
        </p>
      ) : null}
      {topDigital ? (
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
          🎮 {topDigital.name} ({topDigital.type})
        </p>
      ) : null}
    </div>
  )
}
