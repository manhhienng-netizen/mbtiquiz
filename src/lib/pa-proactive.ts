import { getPAPrefs } from '../db/tncb-db'
import { PA_DOMAIN_META, type PADomain } from '../data/pa-domains'
import { HOBBIES_BY_TYPE } from '../data/pa-kb-self-dev'
import { getImmediateTechnique } from '../data/pa-kb-stress'
import { getHealthNudge } from '../data/pa-kb-health'
import { getFilmsByGroup } from '../data/pa-kb-entertainment'
import { getTravelTypeSpec } from '../data/pa-kb-travel'
import { getTrapsByGroup } from '../data/pa-kb-finance'
import { getRandomPhilosophy } from '../data/pa-kb-culture'
import { getRandomTurningPoint } from '../data/pa-kb-history'
import { getMBTIGroup } from './pa-mbti-group'
import { openingHasDailyNudge } from './daily-insight-nudge'
import {
  getUnseenPoolTip,
  getUnseenSlotTip,
  type KBTip,
  type NudgeTimeSlot,
  type PracticeSlot,
} from './nudge-service'

export type ProactivePayloadType = 'tip' | 'domain_hint' | 'type_fact'

export interface ProactivePayload {
  greeting: string
  content: string
  type: ProactivePayloadType
}

export interface ProactiveState {
  hasPromise: boolean
  payload: string | null
  payloadType: ProactivePayloadType | null
}

export const EMPTY_PROACTIVE_STATE: ProactiveState = {
  hasPromise: false,
  payload: null,
  payloadType: null,
}

const CONFIRM_SIGNALS = [
  'nói đi',
  'nói đi mà',
  'ok',
  'okay',
  'được',
  'có',
  'ừ',
  'ừa',
  'muốn',
  'nghe đi',
  'cho mình nghe',
  'tiếp đi',
  'mình nghe',
  'tell me',
  'go ahead',
  'sure',
  'yes',
  'yep',
  'nghe',
]

const REMINDER_SIGNALS = [
  'bạn bảo',
  'bạn nói',
  'bạn hứa',
  'lúc nãy bạn',
  'bạn vừa nói',
  'bạn chưa nói',
  'bạn quên rồi',
  'thế còn điều đó',
  'hợp với bạn',
  'muốn nói với mình',
]

export function getTimeOfDay(): NudgeTimeSlot {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 11) return 'morning'
  if (hour >= 11 && hour < 18) return 'practice'
  return 'evening'
}

export function isUserConfirming(message: string): boolean {
  const normalized = message.toLowerCase().trim()
  if (normalized === 'đi') return true
  return CONFIRM_SIGNALS.some((signal) => normalized.includes(signal))
}

export function isUserRemindingPromise(message: string): boolean {
  const normalized = message.toLowerCase()
  return REMINDER_SIGNALS.some((signal) => normalized.includes(signal))
}

export function formatPracticeTip(practice: PracticeSlot): string {
  const parts = [practice.nudgeText]
  if (practice.doThis && !practice.nudgeText.includes(practice.doThis)) {
    parts.unshift(practice.doThis)
  }
  if (practice.avoidThis) {
    parts.push(`Tránh: ${practice.avoidThis}`)
  }
  return parts.join('\n\n').trim()
}

export function formatKBTip(tip: KBTip): string {
  return tip.tip_vn.trim()
}

function getGreetingForTip(timeOfDay: NudgeTimeSlot): string {
  const greetings: Record<NudgeTimeSlot, string> = {
    morning:
      'Chào buổi sáng. Hôm nay mình có một điều muốn chia sẻ với bạn — muốn nghe không?',
    practice: 'Hôm nay có một điều mình nghĩ hợp với bạn — muốn nghe không?',
    evening:
      'Trước khi ngủ, có một điều nhỏ mình muốn gợi ý — muốn nghe không?',
  }
  return greetings[timeOfDay]
}

function getTypeFactForGreeting(mbtiType: string): string | null {
  const hobbies = HOBBIES_BY_TYPE[mbtiType]
  if (!hobbies?.primary?.length) return null
  const hobby =
    hobbies.primary[Math.floor(Math.random() * hobbies.primary.length)]!
  return `Nhiều người ${mbtiType} thấy ${hobby.toLowerCase()} giúp họ nạp năng lượng khá hiệu quả. Bạn có thử chưa?`
}

function getDomainDeliverable(
  domain: PADomain,
  mbtiType: string,
): { label: string; content: string } | null {
  const group = getMBTIGroup(mbtiType)
  const meta = PA_DOMAIN_META[domain]

  switch (domain) {
    case 'suc-khoe': {
      const nudge = getHealthNudge(mbtiType)
      return nudge ? { label: meta.name, content: nudge } : null
    }
    case 'stress': {
      const tech = getImmediateTechnique(group)
      return {
        label: meta.name,
        content: `${tech.name}\n\n${tech.steps}`,
      }
    }
    case 'tai-chinh': {
      const trap = getTrapsByGroup(group)[0]
      return trap
        ? { label: meta.name, content: `${trap.name}: ${trap.description}` }
        : null
    }
    case 'giai-tri': {
      const film = getFilmsByGroup(group)[0]
      return film
        ? {
            label: meta.name,
            content: `🎬 ${film.title} (${film.year}) — ${film.whyThisGroup}`,
          }
        : null
    }
    case 'du-lich': {
      const spec = getTravelTypeSpec(mbtiType)
      return spec
        ? {
            label: meta.name,
            content: `✈️ ${spec.perfectDestinationVN}\n\nMust-do: ${spec.mustDo}`,
          }
        : null
    }
    case 'phat-trien': {
      const hobbies = HOBBIES_BY_TYPE[mbtiType]
      const pick = hobbies?.primary?.[0]
      return pick
        ? { label: meta.name, content: `Gợi ý phát triển: ${pick}.` }
        : null
    }
    case 'van-hoa': {
      const phil = getRandomPhilosophy(group)
      return phil
        ? {
            label: meta.name,
            content: `${phil.name}: ${phil.corePrinciples[0] ?? phil.whyThisGroup}`,
          }
        : null
    }
    case 'lich-su': {
      const tp = getRandomTurningPoint()
      return {
        label: meta.name,
        content: `${tp.event} (${tp.period}): ${tp.macroImpact}`,
      }
    }
    default:
      return null
  }
}

export async function buildProactivePayload(
  mbtiType: string,
): Promise<ProactivePayload | null> {
  const timeOfDay = getTimeOfDay()

  const slotTip = await getUnseenSlotTip(mbtiType, timeOfDay)
  if (slotTip) {
    return {
      greeting: getGreetingForTip(timeOfDay),
      content: formatPracticeTip(slotTip),
      type: 'tip',
    }
  }

  const poolTip = await getUnseenPoolTip(mbtiType, timeOfDay)
  if (poolTip) {
    return {
      greeting: getGreetingForTip(timeOfDay),
      content: formatKBTip(poolTip),
      type: 'tip',
    }
  }

  const prefs = await getPAPrefs()
  const domains = (prefs.selectedDomains ?? []).filter((d) => d !== 'ban-than')
  for (const domain of domains.slice(0, 2)) {
    const deliverable = getDomainDeliverable(domain, mbtiType)
    if (deliverable) {
      return {
        greeting: `Hôm nay mình có một gợi ý về ${deliverable.label} — muốn nghe không?`,
        content: deliverable.content,
        type: 'domain_hint',
      }
    }
  }

  const typeFact = getTypeFactForGreeting(mbtiType)
  if (typeFact) {
    return {
      greeting: `Có một điều về ${mbtiType} mình nghĩ bạn sẽ thấy quen — muốn nghe không?`,
      content: typeFact,
      type: 'type_fact',
    }
  }

  return null
}

export function buildPayloadReply(
  payload: string,
  reminded = false,
): string {
  if (reminded) {
    return `Xin lỗi, mình để bạn chờ.\n\n${payload}`
  }
  return payload
}

export function getSimpleGreeting(): string {
  const greetings = [
    'Chào bạn. Bạn đang nghĩ đến điều gì?',
    'Hôm nay bạn thế nào?',
    'Có gì muốn nói chuyện không?',
  ]
  return greetings[Math.floor(Math.random() * greetings.length)]!
}

export function getReminderFallbackReply(): string {
  return 'Xin lỗi, mình vừa nói chưa rõ. Thực ra mình muốn hỏi — bạn đang nghĩ đến điều gì hôm nay?'
}

export function appendProactiveGreeting(
  openingContent: string,
  greeting: string,
): string {
  const trimmed = openingContent.trimEnd()
  if (openingHasDailyNudge(trimmed)) return trimmed
  return `${trimmed}\n\n${greeting}`
}
