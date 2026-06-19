import { useEffect, useState } from 'react'
import PaShell, { PA_ACCENT_RGBA } from '../components/PaShell'
import PaTopBar from '../components/PaTopBar'
import { getLatestMBTI } from '../db/tncb-db'
import { getEntertainmentForType } from '../lib/pa-entertainment'

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 14,
  padding: '14px 16px',
  marginBottom: 10,
}

export default function PAEntertainment() {
  const [mbtiType, setMbtiType] = useState<string | null>(null)

  useEffect(() => {
    void getLatestMBTI().then((record) => {
      setMbtiType(record?.mbtiType ?? null)
    })
  }, [])

  const data = mbtiType ? getEntertainmentForType(mbtiType) : null
  const hasContent = data && (data.films.length > 0 || data.books.length > 0)

  return (
    <PaShell>
      <PaTopBar backLabel="Cá nhân" backRoute="/assistant" />

      <div style={{ padding: '8px 16px 32px' }}>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: PA_ACCENT_RGBA(0.7),
              marginBottom: 8,
            }}
          >
            GIẢI TRÍ
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>
            Phim · sách · podcast
          </h1>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            Phù hợp với type bạn{mbtiType ? ` · ${mbtiType}` : ''}
          </p>
        </div>

        {!mbtiType ? (
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
            Làm quiz MBTI để nhận gợi ý cá nhân hóa.
          </p>
        ) : !hasContent ? (
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
            Thư viện nhóm {data?.group} đang được cập nhật. Quay lại sớm nhé.
          </p>
        ) : (
          <>
            {data!.films.length > 0 ? (
              <section style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
                  🎬 Phim ({data!.films.length})
                </h2>
                {data!.films.slice(0, 8).map((film) => (
                  <div key={film.title} style={cardStyle}>
                    <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                      {film.title} ({film.year})
                    </div>
                    <div style={{ fontSize: 12, color: PA_ACCENT_RGBA(0.8), marginBottom: 6 }}>
                      {film.genre} · {film.platform}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
                      {film.whyThisGroup}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}

            {data!.books.length > 0 ? (
              <section style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
                  📚 Sách ({data!.books.length})
                </h2>
                {data!.books.slice(0, 6).map((book) => (
                  <div key={book.title} style={cardStyle}>
                    <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>
                      {book.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                      {book.author} · {book.vnTitle}
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.45 }}>
                      {book.whyThisGroup}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}

            {data!.podcasts.length > 0 ? (
              <section style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
                  🎧 Podcast
                </h2>
                {data!.podcasts.slice(0, 4).map((pod) => (
                  <div key={pod.name} style={cardStyle}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{pod.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      {pod.host} · {pod.language} · {pod.episodeLength}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}

            {data!.digital.length > 0 ? (
              <section style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
                  🎮 Digital
                </h2>
                {data!.digital.slice(0, 4).map((item) => (
                  <div key={item.name} style={cardStyle}>
                    <div style={{ fontWeight: 600, color: '#fff' }}>
                      {item.name} · {item.type}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                      {item.platform}
                    </div>
                  </div>
                ))}
              </section>
            ) : null}

            {data!.supportDigital.length > 0 ? (
              <section style={{ marginBottom: 22 }}>
                <h2 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 10 }}>
                  🆘 Hỗ trợ (không phải giải trí)
                </h2>
                {data!.supportDigital.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      ...cardStyle,
                      borderColor: 'rgba(255,200,100,0.3)',
                      background: 'rgba(255,200,100,0.06)',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
                      {item.note ?? item.whyThisGroup}
                    </div>
                    {item.phone ? (
                      <div style={{ fontSize: 13, color: PA_ACCENT_RGBA(0.9), marginTop: 6 }}>
                        {item.phone}{item.hours ? ` · ${item.hours}` : ''}
                      </div>
                    ) : null}
                  </div>
                ))}
              </section>
            ) : null}

            {data!.expandSuggestion ? (
              <div
                style={{
                  ...cardStyle,
                  borderColor: PA_ACCENT_RGBA(0.3),
                  background: PA_ACCENT_RGBA(0.08),
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: PA_ACCENT_RGBA(0.85), marginBottom: 6 }}>
                  Thử điều mới
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.45 }}>
                  {data!.expandSuggestion}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </PaShell>
  )
}
