/**
 * Paste vào F12 Console trên /assistant/chat, /work/chat, hoặc /match/chat
 * Copy output và gửi PM/dev.
 */
;(function chatLayoutInspector() {
  const path = location.pathname
  const vv = window.visualViewport

  const pick = (el, label) => {
    if (!el) return { label, found: false }
    const r = el.getBoundingClientRect()
    const s = getComputedStyle(el)
    return {
      label,
      tag: el.tagName.toLowerCase(),
      className: el.className || null,
      rect: {
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        height: Math.round(r.height),
        gapToViewportBottom: Math.round((vv?.height ?? innerHeight) - r.bottom),
      },
      style: {
        position: s.position,
        display: s.display,
        flex: s.flex,
        flexDirection: s.flexDirection,
        height: s.height,
        minHeight: s.minHeight,
        maxHeight: s.maxHeight,
        overflow: s.overflow,
      },
    }
  }

  const textarea = document.querySelector('textarea')
  const sendBtn = [...document.querySelectorAll('button')].find((b) =>
    (b.textContent || '').trim() === 'Gửi',
  )
  const switcher = document.querySelector('nav[aria-label="Chuyển đồng hành"]')
  const homeBtn = document.querySelector('button[aria-label="Về trang chính"]')

  let shell = null
  for (const el of document.querySelectorAll('div')) {
    const h = getComputedStyle(el).height
    if (h === '100dvh' || h.includes('100dvh')) {
      shell = el
      break
    }
  }

  const inputBar = sendBtn?.closest('div')?.parentElement ?? null
  const chatRoot =
    textarea?.closest('div[style*="flex-direction"]') ??
    textarea?.parentElement?.parentElement?.parentElement

  const viewport = {
    innerWidth,
    innerHeight,
    visualViewport: vv
      ? {
          width: Math.round(vv.width),
          height: Math.round(vv.height),
          offsetTop: Math.round(vv.offsetTop),
          offsetLeft: Math.round(vv.offsetLeft),
          scale: vv.scale,
        }
      : null,
    dvh100px: (() => {
      const t = document.createElement('div')
      t.style.cssText = 'position:fixed;top:0;left:-9999px;height:100dvh;width:1px;'
      document.body.appendChild(t)
      const px = Math.round(t.getBoundingClientRect().height)
      t.remove()
      return px
    })(),
    svh100px: (() => {
      const t = document.createElement('div')
      t.style.cssText = 'position:fixed;top:0;left:-9999px;height:100svh;width:1px;'
      document.body.appendChild(t)
      const px = Math.round(t.getBoundingClientRect().height)
      t.remove()
      return px
    })(),
  }

  const report = {
    path,
    timestamp: new Date().toISOString(),
    viewport,
    elements: [
      pick(shell, 'shell (first height:100dvh)'),
      pick(chatRoot, 'chat flex root (ancestor of textarea)'),
      pick(switcher, 'AssistantSwitcher nav'),
      pick(inputBar, 'input bar wrapper'),
      pick(textarea, 'textarea'),
      pick(sendBtn, 'Gửi button'),
      pick(homeBtn, 'HomeButton'),
    ],
    diagnosis: [],
  }

  const vh = vv?.height ?? innerHeight
  const inputBottom = inputBar?.getBoundingClientRect().bottom ?? sendBtn?.getBoundingClientRect().bottom
  if (inputBottom != null) {
    const gap = Math.round(vh - inputBottom)
    if (gap > 8) {
      report.diagnosis.push(
        `⚠️ Input cách đáy viewport ${gap}px — layout KHÔNG chạm đáy màn (void đen)`,
      )
    } else if (gap < -4) {
      report.diagnosis.push(
        `⚠️ Input tràn dưới viewport ${-gap}px — bị clip / overflow`,
      )
    } else {
      report.diagnosis.push('✅ Input sát đáy viewport (±8px)')
    }
  }

  if (viewport.dvh100px < vh - 8) {
    report.diagnosis.push(
      `⚠️ 100dvh (${viewport.dvh100px}px) < visual viewport (${Math.round(vh)}px) — đúng pattern void đen`,
    )
  }

  if (switcher && inputBar) {
    const sB = switcher.getBoundingClientRect().bottom
    const iT = inputBar.getBoundingClientRect().top
    if (Math.abs(sB - iT) > 2) {
      report.diagnosis.push(`⚠️ Switcher và input bar không khớp (gap ${Math.round(iT - sB)}px)`)
    }
  }

  console.log('%c[Chat Layout Inspector]', 'font-weight:bold;color:#7F77DD', report)
  console.table(
    report.elements.filter((e) => e.found !== false).map((e) => ({
      part: e.label,
      bottom: e.rect?.bottom,
      height: e.rect?.height,
      gapBottom: e.rect?.gapToViewportBottom,
      position: e.style?.position,
      heightCSS: e.style?.height,
      display: e.style?.display,
    })),
  )

  return report
})()
