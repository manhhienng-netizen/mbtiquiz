/**
 * Apply approved Vietnamese translations from work-viet-hoa-content-30052026.md
 * to work-competency.ts and work-procrastination.ts (B2C fields only).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const MD_PATH =
  process.env.VIET_HOA_MD ||
  path.join(process.env.USERPROFILE || '', 'Downloads', 'work-viet-hoa-content-30052026.md')

const MBTI_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP',
]

function parseBulletList(text) {
  const items = []
  const re = /^- '((?:\\'|[^'])*)'/gm
  let m
  while ((m = re.exec(text)) !== null) {
    items.push(m[1].replace(/\\'/g, "'"))
  }
  return items
}

function parseSingleQuoted(text) {
  const m = text.match(/^'((?:\\'|[^'])*)'/)
  return m ? m[1].replace(/\\'/g, "'") : null
}

function fixGenuinely(s) {
  return s
    .replace(/\bgenuinely\b/gi, 'thật sự')
    .replace(/\bgenuine\b/gi, 'chân thật')
}

function formatStringArray(items, indent = '      ') {
  return items
    .map((s) => `${indent}'${s.replace(/'/g, "\\'")}',`)
    .join('\n')
}

function formatString(s, indent = '      ') {
  return `${indent}'${s.replace(/'/g, "\\'")}',`
}

function getTypeBlock(content, type, nextType) {
  const start = content.indexOf(`  ${type}: {`)
  if (start === -1) throw new Error(`Type block not found: ${type}`)
  let end = -1
  if (nextType) {
    end = content.indexOf(`  ${nextType}: {`, start + 1)
  } else {
    // Last type in map — close before export/interface comment or closing brace
    const markers = [
      '\n}\n\n//',
      '\n}\r\n\r\n//',
      '\n}\n//',
      '\n}\r\n//',
    ]
    for (const m of markers) {
      end = content.indexOf(m, start + 1)
      if (end !== -1) break
    }
    if (end === -1) {
      const close = content.indexOf('\n}', start + 1)
      end = close !== -1 ? close : content.length
    }
  }
  if (end === -1) throw new Error(`End not found for: ${type}`)
  return { start, end, block: content.slice(start, end) }
}

function replaceFieldInBlock(block, fieldName, replacement, isArray = true) {
  if (isArray) {
    const re = new RegExp(
      `(${fieldName}:\\s*\\[)\\s*[\\s\\S]*?(\\],)`,
    )
    if (!re.test(block)) throw new Error(`Field ${fieldName} not found in block`)
    return block.replace(re, `$1\n${replacement}\n    $2`)
  }
  const re = new RegExp(`(${fieldName}:\\s*)'[\\s\\S]*?',`)
  if (!re.test(block)) throw new Error(`Field ${fieldName} not found in block`)
  return block.replace(re, `$1'${replacement.replace(/'/g, "\\'")}',`)
}

function parsePart1(md) {
  const part1 = md.split('## PHẦN 2')[0].split('## PHẦN 1')[1]
  const map = {}
  for (const type of MBTI_TYPES) {
    const re = new RegExp(`### ${type}\\s*\\n([\\s\\S]*?)(?=\\n---\\n|$)`)
    const m = part1.match(re)
    if (!m) throw new Error(`Part1 section missing: ${type}`)
    const section = m[1]
    const blind = section.match(/\*\*workplaceBlindSpots:\*\*\s*\n([\s\S]*?)(?=\n\*\*)/)
    const daily = section.match(/\*\*dailyManifestations:\*\*\s*\n([\s\S]*?)(?=\n\*\*)/)
    const dev = section.match(/\*\*developmentPriority:\*\*\s*\n([\s\S]*?)(?=\n\*\*)/)
    const best = section.match(/\*\*managerInsights\.bestAssignment:\*\*\s*\n- '([^']+)'/)
    if (!blind || !daily || !dev || !best) {
      throw new Error(`Part1 fields incomplete: ${type}`)
    }
    map[type] = {
      workplaceBlindSpots: parseBulletList(blind[1]).map(fixGenuinely),
      dailyManifestations: parseBulletList(daily[1]).map(fixGenuinely),
      developmentPriority: parseBulletList(dev[1]).map(fixGenuinely),
      bestAssignment: fixGenuinely(best[1]),
    }
  }
  return map
}

function parsePart2(md) {
  const part2 = md.split('## PHẦN 3')[0].split('## PHẦN 2')[1]
  const map = {}
  for (const type of MBTI_TYPES) {
    const overviewRe = new RegExp(
      `\\*\\*${type} overview:\\*\\*\\s*\\n'((?:\\\\'|[^'])*)'`,
    )
    const bestRe = new RegExp(
      `\\*\\*${type} bestAssignments:\\*\\*\\s*\\n([\\s\\S]*?)(?=\\n---|\\n\\*\\*|$)`,
    )
    const om = part2.match(overviewRe)
    const bm = part2.match(bestRe)
    if (!om || !bm) throw new Error(`Part2 fields missing: ${type}`)
    map[type] = {
      overview: fixGenuinely(om[1].replace(/\\'/g, "'")),
      bestAssignments: parseBulletList(bm[1]).map(fixGenuinely),
    }
  }
  return map
}

const PROC_TYPES = [
  'INTJ', 'INFJ', 'INTP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'INFP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP', 'ISTP', 'ISFP',
]

function parsePart3(md) {
  const part3 = md.split('## GHI CHÚ')[0].split('## PHẦN 3')[1]
  const map = {}
  for (const type of PROC_TYPES) {
    const re = new RegExp(`### ${type}\\s*\\n([\\s\\S]*?)(?=\\n---\\n|$)`)
    const m = part3.match(re)
    if (!m) throw new Error(`Part3 section missing: ${type}`)
    const section = m[1]
    const rootM = section.match(/\*\*rootCause:\*\*\s*'((?:\\'|[^'])*)'/)
    const patM = section.match(/\*\*patterns:\*\*\s*\n([\s\S]*?)(?=\n\*\*strategies)/)
    if (!rootM || !patM) throw new Error(`Part3 root/patterns missing: ${type}`)
    const microActions = []
    const microRe = /\*\*strategies\[(\d+)\]\.micro_action:\*\*\s*'((?:\\'|[^'])*)'/g
    let mm
    while ((mm = microRe.exec(section)) !== null) {
      microActions[Number(mm[1])] = fixGenuinely(mm[2].replace(/\\'/g, "'"))
    }
    map[type] = {
      rootCause: fixGenuinely(rootM[1].replace(/\\'/g, "'")),
      patterns: parseBulletList(patM[1]).map(fixGenuinely),
      microActions,
    }
  }
  return map
}

function applyCompetencyMap(content, part1) {
  const mapStart = content.indexOf('export const MBTI_COMPETENCY_MAP')
  const mapEnd = content.indexOf('// ============================================================\n// PHẦN 2')
  let section = content.slice(mapStart, mapEnd)

  for (let i = 0; i < MBTI_TYPES.length; i++) {
    const type = MBTI_TYPES[i]
    const next = MBTI_TYPES[i + 1]
    const { start, end, block } = getTypeBlock(section, type, next)
    const d = part1[type]
    let newBlock = replaceFieldInBlock(
      block,
      'workplaceBlindSpots',
      formatStringArray(d.workplaceBlindSpots),
    )
    newBlock = replaceFieldInBlock(
      newBlock,
      'dailyManifestations',
      formatStringArray(d.dailyManifestations),
    )
    newBlock = replaceFieldInBlock(
      newBlock,
      'developmentPriority',
      formatStringArray(d.developmentPriority),
    )
    newBlock = replaceFieldInBlock(
      newBlock,
      'bestAssignment',
      d.bestAssignment,
      false,
    )
    section = section.slice(0, start) + newBlock + section.slice(end)
  }
  return content.slice(0, mapStart) + section + content.slice(mapEnd)
}

function applyCoachingGuide(content, part2) {
  const guideStart = content.indexOf('export const MANAGER_COACHING_GUIDE')
  const guideEnd = content.indexOf('export const HR_INSIGHT_RULES')
  if (guideEnd === -1) {
    throw new Error('HR_INSIGHT_RULES anchor not found')
  }
  let section = content.slice(guideStart, guideEnd)

  for (let i = 0; i < MBTI_TYPES.length; i++) {
    const type = MBTI_TYPES[i]
    const next = MBTI_TYPES[i + 1]
    const { start, end, block } = getTypeBlock(section, type, next)
    const d = part2[type]
    let newBlock = replaceFieldInBlock(block, 'overview', d.overview, false)
    newBlock = replaceFieldInBlock(
      newBlock,
      'bestAssignments',
      formatStringArray(d.bestAssignments, '      '),
    )
    section = section.slice(0, start) + newBlock + section.slice(end)
  }
  return content.slice(0, guideStart) + section + content.slice(guideEnd)
}

function applyProcrastination(content, part3) {
  for (let i = 0; i < PROC_TYPES.length; i++) {
    const type = PROC_TYPES[i]
    const next = PROC_TYPES[i + 1]
    const { start, end, block } = getTypeBlock(content, type, next)
    const d = part3[type]
    let newBlock = replaceFieldInBlock(block, 'rootCause', d.rootCause, false)
    newBlock = replaceFieldInBlock(
      newBlock,
      'patterns',
      formatStringArray(d.patterns),
    )
    // micro_action inside strategies array — match escaped quotes in source strings
    const microRe = /micro_action: '((?:\\'|[^'])*)'/g
    let idx = 0
    newBlock = newBlock.replace(microRe, () => {
      const s = d.microActions[idx++]
      if (!s) throw new Error(`micro_action missing ${type} index ${idx - 1}`)
      return `micro_action: '${s.replace(/'/g, "\\'")}'`
    })
    if (idx !== d.microActions.length) {
      console.warn(`Warning ${type}: applied ${idx} micro_actions, expected ${d.microActions.length}`)
    }
    content = content.slice(0, start) + newBlock + content.slice(end)
  }
  return content
}

async function main() {
  let part1, part2, part3
  const docsMd = path.join(ROOT, 'docs', 'work-viet-hoa-content-30052026.md')

  if (fs.existsSync(MD_PATH)) {
    const md = fs.readFileSync(MD_PATH, 'utf8')
    part1 = parsePart1(md)
    part2 = parsePart2(md)
    part3 = parsePart3(md)
    console.log('Source: MD file at', MD_PATH)
  } else if (fs.existsSync(docsMd)) {
    const md = fs.readFileSync(docsMd, 'utf8')
    part1 = parsePart1(md)
    part2 = parsePart2(md)
    part3 = parsePart3(md)
    console.log('Source: MD file at', docsMd)
  } else {
    const embedded = await import('./work-viet-hoa-translations.mjs')
    part1 = embedded.part1
    part2 = embedded.part2
    part3 = embedded.part3
    console.log('Source: embedded translations (work-viet-hoa-translations.mjs)')
  }

  const competencyPath = path.join(ROOT, 'src/data/work-competency.ts')
  const procPath = path.join(ROOT, 'src/data/work-procrastination.ts')

  let competency = fs.readFileSync(competencyPath, 'utf8')
  competency = applyCompetencyMap(competency, part1)
  competency = applyCoachingGuide(competency, part2)
  fs.writeFileSync(competencyPath, competency)

  let proc = fs.readFileSync(procPath, 'utf8')
  proc = applyProcrastination(proc, part3)
  fs.writeFileSync(procPath, proc)

  console.log('Applied translations:')
  console.log('  -', competencyPath)
  console.log('  -', procPath)
  console.log('Types competency:', Object.keys(part1).length)
  console.log('Types coaching:', Object.keys(part2).length)
  console.log('Types procrastination:', Object.keys(part3).length)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
