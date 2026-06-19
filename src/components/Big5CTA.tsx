import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadBig5ForB2B } from '../lib/big5-b2b-helper'

export function Big5CTA() {
  const [hasBig5, setHasBig5] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true
    loadBig5ForB2B()
      .then((data) => {
        if (mounted) setHasBig5(!!data)
      })
      .catch(() => {
        if (mounted) setHasBig5(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  if (hasBig5 === null) return null
  if (hasBig5) return null

  return (
    <div
      style={{
        margin: '0 0 12px 0',
        padding: '10px 14px',
        borderRadius: 10,
        background: 'rgba(168,230,61,0.06)',
        border: '1px solid rgba(168,230,61,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        Làm Big Five (5 phút) → mở khóa gợi ý theo phong cách quản lý của bạn
      </p>
      <Link
        to="/big5"
        style={{
          flexShrink: 0,
          padding: '6px 14px',
          borderRadius: 8,
          background: '#A8E63D',
          color: '#0A0A0F',
          fontWeight: 600,
          fontSize: 13,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Làm ngay →
      </Link>
    </div>
  )
}
