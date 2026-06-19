import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import type { MbtiType } from '../data/manager-coaching-b2b'
import WorkShareCard, {
  WORK_SHARE_CARD_HEIGHT,
  WORK_SHARE_CARD_WIDTH,
} from './WorkShareCard'

interface WorkShareSheetProps {
  isOpen: boolean
  onClose: () => void
  mbtiType: MbtiType
}

const PREVIEW_SCALE = 0.45

export default function WorkShareSheet({
  isOpen,
  onClose,
  mbtiType,
}: WorkShareSheetProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)

  async function exportPng(): Promise<string> {
    if (!cardRef.current) throw new Error('Card ref missing')
    return toPng(cardRef.current, {
      width: WORK_SHARE_CARD_WIDTH,
      height: WORK_SHARE_CARD_HEIGHT,
      pixelRatio: 2,
      cacheBust: true,
    })
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      const dataUrl = await exportPng()
      const link = document.createElement('a')
      link.download = `work-profile-${mbtiType.toLowerCase()}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error('Work share export failed:', e)
    } finally {
      setDownloading(false)
    }
  }

  async function handleShare() {
    setSharing(true)
    try {
      const dataUrl = await exportPng()
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File(
        [blob],
        `work-profile-${mbtiType.toLowerCase()}.png`,
        { type: 'image/png' },
      )

      if (
        typeof navigator.share === 'function' &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: 'Phong cách làm việc của bạn',
          text: 'Xem phong cách làm việc theo MBTI trên tncb.app',
        })
      } else {
        await handleDownload()
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        console.error('Work share failed:', e)
      }
    } finally {
      setSharing(false)
    }
  }

  if (!isOpen) return null

  const busy = downloading || sharing

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#121218',
          borderRadius: '20px 20px 0 0',
          borderTop: '1px solid rgba(168,230,61,0.15)',
          padding: '20px 24px 36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 40,
            height: 4,
            backgroundColor: 'rgba(255,255,255,0.18)',
            borderRadius: 2,
            margin: '0 auto 16px',
          }}
        />

        <h2
          style={{
            margin: '0 0 4px',
            fontSize: 17,
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          Chia sẻ phong cách làm việc
        </h2>
        <p
          style={{
            margin: '0 0 18px',
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            textAlign: 'center',
          }}
        >
          Ảnh ngang 1200×630 — phù hợp LinkedIn / Facebook
        </p>

        {/* Off-screen export target */}
        <div
          style={{
            position: 'absolute',
            left: -9999,
            top: -9999,
            width: WORK_SHARE_CARD_WIDTH,
            height: WORK_SHARE_CARD_HEIGHT,
          }}
        >
          <div ref={cardRef}>
            <WorkShareCard mbtiType={mbtiType} />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              width: WORK_SHARE_CARD_WIDTH * PREVIEW_SCALE,
              height: WORK_SHARE_CARD_HEIGHT * PREVIEW_SCALE,
              borderRadius: 10,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
              border: '1px solid rgba(168,230,61,0.2)',
            }}
          >
            <div
              style={{
                transform: `scale(${PREVIEW_SCALE})`,
                transformOrigin: 'top left',
                width: WORK_SHARE_CARD_WIDTH,
                height: WORK_SHARE_CARD_HEIGHT,
              }}
            >
              <WorkShareCard mbtiType={mbtiType} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void handleDownload()}
          disabled={busy}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#A8E63D',
            color: '#0A0A0F',
            border: 'none',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 10,
            cursor: busy ? 'wait' : 'pointer',
            opacity: busy ? 0.7 : 1,
            fontFamily: 'inherit',
          }}
        >
          {downloading ? 'Đang tạo ảnh...' : 'Tải ảnh'}
        </button>

        <button
          type="button"
          onClick={() => void handleShare()}
          disabled={busy}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: 'rgba(168,230,61,0.08)',
            color: '#A8E63D',
            border: '1px solid rgba(168,230,61,0.35)',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 600,
            cursor: busy ? 'wait' : 'pointer',
            opacity: busy ? 0.7 : 1,
            fontFamily: 'inherit',
          }}
        >
          {sharing ? 'Đang chia sẻ...' : 'Chia sẻ'}
        </button>
      </div>
    </div>
  )
}
