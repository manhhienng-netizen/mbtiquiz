import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toPng } from 'html-to-image'
import ShareCard, { type ShareCardProps } from './ShareCard'

interface ShareSheetProps {
  isOpen: boolean
  onClose: () => void
  cardData: ShareCardProps
  shareUrl: string
}

export default function ShareSheet({
  isOpen,
  onClose,
  cardData,
  shareUrl,
}: ShareSheetProps) {
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function handleDownload() {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(cardRef.current, {
        width: 390,
        height: 844,
        pixelRatio: 2.77,
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = `tncb-${cardData.archetypeKey}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error('Export failed:', e)
    } finally {
      setDownloading(false)
    }
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleOpenReport() {
    onClose()
    navigate('/report')
  }

  const secondaryActionStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#FFFFFF',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
  } as const

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#1A1A1A',
          borderRadius: '20px 20px 0 0',
          padding: '20px 24px 40px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 40,
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: 2,
            margin: '0 auto 20px',
          }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -9999,
              top: -9999,
              width: 390,
              height: 844,
            }}
          >
            <div ref={cardRef}>
              <ShareCard {...cardData} />
            </div>
          </div>

          <div
            style={{
              width: 120,
              height: 260,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                transform: 'scale(0.308)',
                transformOrigin: 'top left',
                width: 390,
                height: 844,
              }}
            >
              <ShareCard {...cardData} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#7C3AED',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 12,
            cursor: downloading ? 'wait' : 'pointer',
            opacity: downloading ? 0.7 : 1,
          }}
        >
          {downloading ? 'Đang tạo ảnh...' : '💾 Lưu ảnh về máy'}
        </button>

        <button
          type="button"
          onClick={handleOpenReport}
          style={{ ...secondaryActionStyle, marginBottom: 12 }}
        >
          📄 Báo cáo đầy đủ
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          style={secondaryActionStyle}
        >
          {copied ? '✓ Đã copy!' : '🔗 Copy link kết quả'}
        </button>
      </div>
    </div>
  )
}
