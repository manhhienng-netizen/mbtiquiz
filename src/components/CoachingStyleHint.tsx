import { useEffect, useState, type CSSProperties } from 'react'
import { getDiscContent, type DiscType } from '../data/disc-content'
import {
  getCATip,
  loadBig5ForB2B,
  type Big5CATip,
} from '../lib/big5-b2b-helper'
import { loadDiscProfile } from '../lib/disc-db-helper'

const accent = '#A8E63D'

const hintStyle: CSSProperties = {
  marginBottom: '16px',
  padding: '12px 16px',
  borderRadius: '12px',
  background: 'rgba(168,230,61,0.05)',
  border: '1px solid rgba(168,230,61,0.20)',
}

export function CoachingStyleHint() {
  const [primary, setPrimary] = useState<DiscType | null>(null)
  const [caTip, setCaTip] = useState<Big5CATip | null>(null)

  useEffect(() => {
    let mounted = true

    loadDiscProfile()
      .then((profile) => {
        if (mounted && profile) setPrimary(profile.primary)
      })
      .catch(() => {})

    loadBig5ForB2B()
      .then((data) => {
        if (mounted && data) setCaTip(getCATip(data.C, data.A))
      })
      .catch(() => {})

    return () => {
      mounted = false
    }
  }, [])

  if (!primary && !caTip) return null

  const discProfile = primary ? getDiscContent(primary) : null

  return (
    <div style={hintStyle}>
      {discProfile ? (
        <>
          <p
            style={{
              margin: '0 0 6px',
              fontSize: '12px',
              fontWeight: 600,
              color: accent,
            }}
          >
            💼 Coaching theo phong cách {discProfile.label} của bạn
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.80)',
            }}
          >
            {discProfile.managerTip}
          </p>
        </>
      ) : null}

      {caTip ? (
        <div
          style={{
            marginTop: discProfile ? 12 : 0,
            paddingTop: discProfile ? 12 : 0,
            borderTop: discProfile
              ? '1px solid rgba(255,255,255,0.08)'
              : undefined,
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: accent,
              marginBottom: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            🎯 Phong cách quản lý của bạn
          </p>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: 8,
              lineHeight: 1.6,
            }}
          >
            {caTip.headline}
          </p>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              marginBottom: 6,
            }}
          >
            <span style={{ color: accent }}>→ </span>
            {caTip.reinforce}
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.6,
              marginBottom: 6,
            }}
          >
            <span style={{ color: 'rgba(255,200,0,0.8)' }}>⚠ </span>
            {caTip.watchOut}
          </div>
          <div
            style={{
              marginTop: 8,
              padding: '10px 12px',
              borderRadius: 8,
              background: 'rgba(168,230,61,0.08)',
              border: '1px solid rgba(168,230,61,0.2)',
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: accent,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Hành vi cụ thể tuần này
            </p>
            <p
              style={{
                fontSize: 13,
                color: '#fff',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {caTip.coachingBehavior}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
