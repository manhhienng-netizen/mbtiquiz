// Match Goal AI — re-frame mục tiêu quan hệ · sinh checklist hành động USER

import { callLLM } from './llm-adapter'
import type { MAMilestone, MARelationshipType } from './match-goal'

const MA_GOAL_SYSTEM_PROMPT = `
Bạn là trợ lý quan hệ gia đình và đôi lứa.
Frame: "hiểu hơn · kết nối khác đi" — KHÔNG hướng user "sửa người kia".

GUARDRAIL BẮT BUỘC:
- Nếu mục tiêu hướng THAY ĐỔI người kia → reframedGoal đổi sang "Tôi có thể làm gì để hiểu/kết nối hơn với [họ]?"
- Nếu mục tiêu đã hướng về USER → reframedGoal = rawGoal (giữ nguyên)
- Milestones = HÀNH ĐỘNG CỦA USER, không phải thay đổi của người kia
- Ngôi "bạn" · tiếng Việt tự nhiên · không từ cấm (tiềm năng/hành trình/bứt phá)
`.trim()

const REL_TYPES = new Set<MARelationshipType>([
  'vo-chong',
  'bo-me',
  'con',
  'other',
])

function cleanJson(raw: string): string {
  return raw
    .replace(/```json|```/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/,(\s*[}\]])/g, '$1')
    .trim()
}

function extractJson(raw: string): string | null {
  const match = raw.match(/\{[\s\S]*\}/)
  return match?.[0] ?? null
}

function normalizeRelationship(value: unknown): MARelationshipType {
  if (typeof value === 'string' && REL_TYPES.has(value as MARelationshipType)) {
    return value as MARelationshipType
  }
  return 'other'
}

function normalizeMilestones(raw: unknown): MAMilestone[] {
  if (!Array.isArray(raw)) return []
  const milestones: MAMilestone[] = []
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i]
    if (!item || typeof item !== 'object') continue
    const o = item as Record<string, unknown>
    if (typeof o.action !== 'string' || !o.action.trim()) continue
    milestones.push({
      id: typeof o.id === 'string' ? o.id : `m${i + 1}`,
      action: o.action.trim(),
      done: o.done === true,
    })
  }
  return milestones.slice(0, 5)
}

export async function analyzeMAGoal(rawGoal: string): Promise<{
  reframedGoal: string
  relationship: MARelationshipType
  milestones: MAMilestone[]
  sanTapScenario?: string
}> {
  const prompt = `
Phân tích mục tiêu quan hệ sau và trả về JSON.

MỤC TIÊU: "${rawGoal}"

NHIỆM VỤ:
1. Nếu mục tiêu hướng về THAY ĐỔI người kia ("vợ bớt lo/thay đổi/phải..."):
   → reframedGoal: đổi sang "Tôi có thể làm gì để hiểu/kết nối hơn với [họ]?"
   Ví dụ: "Tôi muốn vợ bớt lo lắng" → "Tôi có thể làm gì để hiểu nỗi lo của vợ và kết nối tốt hơn?"

2. Nếu mục tiêu đã hướng về USER → giữ nguyên (reframedGoal = rawGoal)
   Ví dụ: "Tôi muốn gần hơn với bố" → giữ nguyên

3. Detect relationship: vo-chong / bo-me / con / other

4. Sinh 3-5 milestones = HÀNH ĐỘNG CỦA USER (không phải thay đổi của người kia)
   ✅ "Thử hỏi bố về điều bố tự hào nhất trong cuộc đời"
   ✅ "Lần sau vợ lo lắng — nghe trọn vẹn 3 phút trước khi đưa ra giải pháp"
   ❌ "Bố phải hiểu tôi hơn"

5. sanTapScenario: 1 từ gợi ý scenario sân tập (argue/silence/distance/pressure/...)

Trả về JSON THUẦN (không markdown):
{
  "reframedGoal": "...",
  "relationship": "vo-chong|bo-me|con|other",
  "milestones": [
    { "id": "m1", "action": "...", "done": false },
    ...
  ],
  "sanTapScenario": "..."
}
`.trim()

  try {
    const raw = await callLLM(prompt, MA_GOAL_SYSTEM_PROMPT)
    const json = extractJson(raw)
    if (!json) throw new Error('no json')
    const parsed = JSON.parse(cleanJson(json)) as {
      reframedGoal?: string
      relationship?: unknown
      milestones?: unknown
      sanTapScenario?: string
    }
    const reframedGoal =
      typeof parsed.reframedGoal === 'string' && parsed.reframedGoal.trim()
        ? parsed.reframedGoal.trim()
        : rawGoal
    return {
      reframedGoal,
      relationship: normalizeRelationship(parsed.relationship),
      milestones: normalizeMilestones(parsed.milestones),
      sanTapScenario:
        typeof parsed.sanTapScenario === 'string'
          ? parsed.sanTapScenario.trim().toLowerCase()
          : undefined,
    }
  } catch {
    return {
      reframedGoal: rawGoal,
      relationship: 'other',
      milestones: [],
    }
  }
}
