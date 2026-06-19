/**
 * KB REGISTRY — chuẩn hóa topical KB (không gồm work-comm cases / batch2 body trùng).
 */
import {
  getLeadershipTriggers,
  LEADERSHIP_ENTRIES,
  LEADERSHIP_KB_META,
} from '../data/kb-leadership'
import { KB_LIFE } from '../data/kb-life'
import { KB_LIFESKILLS } from '../data/kb-lifeskills'
import { KB_RELATIONSHIPS } from '../data/kb-relationships'
import { KB_SAVOIRFAIRE } from '../data/kb-savoirfaire'
import { KB_SELFPROTECTION } from '../data/kb-selfprotection'
import type { SituationType } from '../data/tncb-resources-vn-safety'

export type KBZone = 'GU' | 'PROTECTIVE'

export type KBName =
  | 'life'
  | 'lifeskills'
  | 'relationships'
  | 'savoirfaire'
  | 'selfprotection'
  | 'leadership'

export interface RegistryKBEntry {
  id: string
  kbName: KBName
  triggers: string[]
  zone: KBZone
  body: string
  why?: string
  source?: string
  level?: string
  traits?: string[]
  ageTags?: string[]
  domain?: string
  label: string
  /** KB-level age gate — skip entry khi userAge < ageGate (null age = không lọc). */
  ageGate?: number
  /** PROTECTIVE: redirect qua tncb-resources-vn-safety */
  safetySituation?: SituationType
}

const LIFESKILLS_SKIP_IDS = new Set(['rel-s01', 'rel-s02'])

const SAFETY_BY_ID: Partial<Record<string, SituationType>> = {
  'life-24': 'ed',
  'rel-21': 'domestic_violence',
  'rel-22': 'domestic_violence',
  'rel-23': 'domestic_violence',
  'safe-14': 'domestic_violence',
}

function inferSafetySituation(
  kbName: KBName,
  id: string,
  zone: KBZone,
  domain?: string,
): SituationType | undefined {
  if (zone !== 'PROTECTIVE') return undefined
  const mapped = SAFETY_BY_ID[id]
  if (mapped) return mapped
  if (kbName === 'relationships' && domain === 'safety') return 'domestic_violence'
  if (id === 'fin-05') return undefined
  return undefined
}

interface LegacyTopicalEntry {
  id: string
  name: string
  triggers: string[]
  zone: KBZone
  content: string
  why: string
  level: string
  trait?: string
  domain: string
}

function inferAgeTags(e: LegacyTopicalEntry): string[] | undefined {
  const haystack = [e.name, e.domain, ...e.triggers, e.content.slice(0, 400)]
    .join(' ')
    .toLowerCase()

  const tags: string[] = []

  const isMoneyMgmt =
    /quản lý tiền|ngân sách|tiết kiệm|lương|vay tiền|tài chính cá nhân/.test(haystack)
  const isLeadership =
    !isMoneyMgmt &&
    /(?:^|[\s,.])lãnh đạo|leadership|quản lý team|quản lý nhân|manage team|dẫn dắt nhóm|quản lý cấp|people manager/.test(
      haystack,
    )
  const isParenting =
    /parenting|nuôi con|con nhỏ|làm cha|làm mẹ|mẹ bầu|dạy con|con cái nhỏ|giai đoạn cha mẹ|vừa sinh con/.test(
      haystack,
    )

  if (isLeadership) tags.push('25+')
  if (isParenting) tags.push('parenting')

  return tags.length ? tags : undefined
}

function fromLegacy(kbName: KBName, e: LegacyTopicalEntry): RegistryKBEntry {
  return {
    id: e.id,
    kbName,
    triggers: e.triggers,
    zone: e.zone,
    body: e.content,
    why: e.why,
    level: e.level,
    traits: e.trait ? [e.trait] : undefined,
    domain: e.domain,
    label: e.name,
    ageTags: inferAgeTags(e),
    safetySituation: inferSafetySituation(kbName, e.id, e.zone, e.domain),
  }
}

function fromLeadership(): RegistryKBEntry[] {
  return LEADERSHIP_ENTRIES.map((e) => ({
    id: e.id,
    kbName: 'leadership' as const,
    triggers: getLeadershipTriggers(e.id),
    zone: e.zone,
    body: e.body,
    why: e.traitHint,
    traits: [e.traitHint],
    domain: e.domain,
    label: e.label,
    ageTags: [e.ageTag],
    ageGate: LEADERSHIP_KB_META.ageGate,
  }))
}

function buildRegistry(): RegistryKBEntry[] {
  const life = KB_LIFE.map((e) => fromLegacy('life', e))
  const skills = KB_LIFESKILLS.filter((e) => !LIFESKILLS_SKIP_IDS.has(e.id)).map((e) =>
    fromLegacy('lifeskills', e),
  )
  const rel = KB_RELATIONSHIPS.map((e) => fromLegacy('relationships', e))
  const savoir = KB_SAVOIRFAIRE.map((e) => fromLegacy('savoirfaire', e))
  const safe = KB_SELFPROTECTION.map((e) => fromLegacy('selfprotection', e))
  const leadership = fromLeadership()
  return [...life, ...skills, ...rel, ...savoir, ...safe, ...leadership]
}

export const KB_REGISTRY: RegistryKBEntry[] = buildRegistry()

export function getRegistryEntry(kbName: KBName, id: string): RegistryKBEntry | undefined {
  return KB_REGISTRY.find((e) => e.kbName === kbName && e.id === id)
}
