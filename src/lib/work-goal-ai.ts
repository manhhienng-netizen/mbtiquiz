// Work Goal AI — phân tích lộ trình kỹ năng · gợi xử khó khăn

import { callLLM } from './llm-adapter'
import type { SkillRoadmap, SkillStep } from './work-goal'

const GOAL_SYSTEM_PROMPT = `
Bạn là trợ lý phát triển kỹ năng công sở.
Phân tích mục tiêu nghề nghiệp → đề xuất kỹ năng cần luyện theo thứ tự ưu tiên.

GUARDRAIL BẮT BUỘC:
- Mục tiêu chỉ về KỸ NĂNG của bản thân user (không "sa thải ai, loại bỏ ai, kỷ luật ai")
- Nếu mục tiêu chứa "sa thải/loại/kỷ luật" → từ chối, gợi user đặt mục tiêu kỹ năng
- Không phán xét người khác trong lộ trình
- Ngôi "bạn" · tiếng Việt tự nhiên · không từ cấm (tiềm năng/hành trình/bứt phá)
`.trim()

const FORBIDDEN_GOAL = ['sa thải', 'loại bỏ', 'kỷ luật ai', 'đuổi việc', 'fire']

const ARENA_ROLES = new Set(['MG', 'KH', 'DT', 'VT'])

function cleanJson(raw: string): string {
  return raw
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/,(\s*[}\]])/g, '$1')
}

function extractJson(raw: string): string | null {
  const match = raw.match(/\{[\s\S]*\}/)
  return match?.[0] ?? null
}

function normalizeRole(role: unknown): string | undefined {
  if (typeof role !== 'string') return undefined
  const upper = role.toUpperCase()
  if (upper === 'NONE' || upper === 'NULL' || upper === '') return undefined
  return ARENA_ROLES.has(upper) ? upper : undefined
}

function normalizeScenario(scenario: unknown): string | undefined {
  if (typeof scenario !== 'string' || !scenario.trim()) return undefined
  return scenario.trim().toLowerCase()
}

function normalizeSkills(raw: unknown): SkillStep[] | null {
  if (!Array.isArray(raw)) return null
  const skills: SkillStep[] = []
  for (const item of raw) {
    if (!item || typeof item !== 'object') continue
    const o = item as Record<string, unknown>
    if (typeof o.skill !== 'string' || typeof o.why !== 'string') continue
    skills.push({
      order: typeof o.order === 'number' ? o.order : skills.length + 1,
      skill: o.skill.trim(),
      why: o.why.trim(),
      role: normalizeRole(o.role),
      scenario: normalizeScenario(o.scenario),
    })
  }
  return skills.length >= 1 ? skills.sort((a, b) => a.order - b.order) : null
}

export function isForbiddenGoalText(goalText: string): boolean {
  const lower = goalText.toLowerCase()
  return FORBIDDEN_GOAL.some((w) => lower.includes(w))
}

export async function analyzeGoal(goalText: string): Promise<SkillRoadmap | null> {
  if (isForbiddenGoalText(goalText)) return null

  const prompt = `
Mục tiêu của tôi: "${goalText}"

Đề xuất 3-5 kỹ năng cần luyện theo thứ tự ưu tiên để đạt mục tiêu này.
Mỗi kỹ năng: tên ngắn gọn + lý do cần + gợi ý role luyện (MG=quản lý/KH=khách hàng/DT=đối tác/VT=chuyển vai/none).

Trả về JSON:
{
  "skills": [
    { "order": 1, "skill": "...", "why": "...", "role": "MG", "scenario": "conflict" },
    ...
  ]
}
`.trim()

  try {
    const raw = await callLLM(prompt, GOAL_SYSTEM_PROMPT)
    const json = extractJson(raw)
    if (!json) return null
    const parsed = JSON.parse(cleanJson(json)) as { skills?: unknown }
    const skills = normalizeSkills(parsed.skills)
    if (!skills) return null
    return { skills, generatedAt: new Date().toISOString() }
  } catch {
    return null
  }
}

export async function analyzeChallengeAndSuggestPortal(
  goalText: string,
  challengeText: string,
): Promise<{
  suggestion: string
  portalRole?: string
  portalScenario?: string
} | null> {
  if (!challengeText.trim()) return null

  const prompt = `
Mục tiêu: "${goalText}"
Khó khăn đang gặp: "${challengeText}"

Gợi 1-2 câu cách xử lý thực tế · role sân tập liên quan nhất (MG/KH/DT/VT/none).

JSON:
{ "suggestion": "...", "portalRole": "MG", "portalScenario": "conflict" }
`.trim()

  try {
    const raw = await callLLM(prompt, GOAL_SYSTEM_PROMPT)
    const json = extractJson(raw)
    if (!json) return null
    const parsed = JSON.parse(cleanJson(json)) as {
      suggestion?: string
      portalRole?: string
      portalScenario?: string
    }
    if (!parsed.suggestion?.trim()) return null
    return {
      suggestion: parsed.suggestion.trim(),
      portalRole: normalizeRole(parsed.portalRole),
      portalScenario: normalizeScenario(parsed.portalScenario),
    }
  } catch {
    return null
  }
}
