/**
 * M2a — Port + merge 136 cặp compat + understand → match-pair-content.ts
 * Chạy: npx tsx scripts/m2a-transform-match-pair-content.mts
 * Nguồn READ-ONLY từ app cũ TNCB.
 */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SOURCE_ROOT =
  'C:/dev/tiemnangcuaban/tiemnangcuaban/packages/data/src'

const compatUrl = pathToFileURL(join(SOURCE_ROOT, 'mbti-compatibility-data.ts'))
const understandUrl = pathToFileURL(
  join(SOURCE_ROOT, 'match-understand-each-other-data.ts'),
)

const { MBTI_COMPATIBILITY_MATRIX } = await import(compatUrl.href)
const { UNDERSTAND_EACH_OTHER } = await import(understandUrl.href)

export interface MatchPairContent {
  pairKey: string
  tenCap: string
  texture: 'golden_pair' | 'growth_pair' | 'challenge_pair' | 'contrast_pair'
  dongLuc: string
  vungDeHop: string
  vungMaSat: string
  canDeY: string[]
  cachDiQua: string[]
  funFact?: string
  coverage: 'full' | 'compat-only'
}

/** Cụm dài trước, ngắn sau — retone EN code-mix → VN tự nhiên. */
const RETONE_PHRASES: [RegExp | string, string][] = [
  [/Total respect và no need to explain everything — efficient, deep bond/gi, 'Hoàn toàn tôn trọng và không cần giải thích mọi thứ — hiệu quả, gắn kết sâu'],
  [/Total respect and no need to explain everything/gi, 'Hoàn toàn tôn trọng và không cần giải thích mọi thứ'],
  [/expressing concerns is an act of love, not disruption/gi, 'bày tỏ lo ngại là hành động quan tâm, không phải phá vỡ hòa khí'],
  [/honest conversations as acts of love and trust, not confrontation/gi, 'trò chuyện thẳng thắn như hành động tin tưởng và quan tâm, không phải đối đầu'],
  [/Create tradition of checking in about how the relationship is going/gi, 'Tạo thói quen trò chuyện kiểm tra xem hai bạn đang thế nào'],
  [/Create simple check-in ritual — "how are we doing\?" once a month is enough/gi, 'Tạo thói quen trò chuyện kiểm tra đơn giản — "hai bạn đang thế nào?" một lần mỗi tháng là đủ'],
  [/ISTP: learn ISFJ's caring gestures as love language\. ISFJ: don't take ISTP's reserved style as indifference/gi, 'ISTP: hiểu cử chỉ quan tâm của ISFJ là cách họ thể hiện quan tâm. ISFJ: đừng hiểu phong cách kín đáo của ISTP là thờ ơ'],
  [/Warmest và most nurturing relationship — both know how to care deeply/gi, 'Mối đồng hành ấm áp và nuôi dưỡng nhất — cả hai đều biết chăm sóc sâu sắc'],
  [/Safe và nurturing — both feel accepted without judgment/gi, 'An toàn và nuôi dưỡng — cả hai cảm thấy được chấp nhận không bị phán xét'],
  [/Neither is very assertive — difficult conversations may be perpetually deferred/gi, 'Cả hai đều không hay khẳng định — những cuộc trò chuyện khó có thể bị hoãn mãi'],
  [/Most stable couple — commitment và follow-through from both sides/gi, 'Cặp ổn định nhất — cam kết và theo sát đến cùng từ cả hai phía'],
  [/May get too comfortable — growth requires occasional discomfort/gi, 'Có thể quá thoải mái — phát triển cần đôi khi chịu khó một chút'],
  [/Introduce one new experience quarterly — keep relationship fresh/gi, 'Mỗi quý thử một trải nghiệm mới — giữ đồng hành luôn tươi mới'],
  [/ISTP bring competence; ISFJ bring care — can balance each other/gi, 'ISTP mang năng lực; ISFJ mang sự chăm sóc — có thể bù trừ cho nhau'],
  [/ISFJ needs emotional connection; ISTP uncomfortable với emotional intensity/gi, 'ISFJ cần kết nối cảm xúc; ISTP không thoải mái với cường độ cảm xúc cao'],
  [/Cả hai đều very conflict-avoidant — important conversations may not happen/gi, 'Cả hai đều rất né tránh va chạm — những cuộc trò chuyện quan trọng có thể không xảy ra'],
  [/ISTJ bring stability; ISFP bring authenticity — potential balance/gi, 'ISTJ mang ổn định; ISFP mang sự chân thật — tiềm năng cân bằng'],
  [/ISTJ's rigidity may feel stifling to ISFP; ISFP's unpredictability may frustrate ISTJ/gi, 'Sự cứng nhắc của ISTJ có thể khiến ISFP ngột ngạt; sự khó đoán của ISFP có thể làm ISTJ bực'],
  [/ISTJ: allow ISFP creative freedom\. ISFP: give ISTJ predictability where possible/gi, 'ISTJ: cho ISFP tự do sáng tạo. ISFP: cho ISTJ khả năng đoán trước khi có thể'],
  [/Neither puts pressure on the other — easygoing và comfortable/gi, 'Không ai gây áp lực cho người kia — thoải mái và dễ chịu'],
  [/Cả hai đều not expressive verbally — feelings may go unshared/gi, 'Cả hai đều ít bày tỏ bằng lời — cảm xúc có thể không được chia sẻ'],
  [/Extremely stable — both honor commitments completely/gi, 'Cực kỳ ổn định — cả hai giữ cam kết hoàn toàn'],
  [/Too similar — may lack growth-inducing difference/gi, 'Quá giống nhau — có thể thiếu khác biệt kích thích phát triển'],
  [/Both competent và reliable — trust comes easily/gi, 'Cả hai đều giỏi và đáng tin — sự tin tưởng đến dễ dàng'],
  [/ISTJ wants plans; ISTP wants flexibility — procedural tension/gi, 'ISTJ muốn kế hoạch; ISTP muốn linh hoạt — căng thẳng về quy trình'],
  [/ISTJ: let ISTP improvise on non-critical things\. ISTP: give ISTJ advance notice on changes/gi, 'ISTJ: để ISTP ứng biến với việc không quan trọng. ISTP: báo trước cho ISTJ khi có thay đổi'],
  [/No drama — both easygoing và respect each other's autonomy/gi, 'Không kịch — cả hai thoải mái và tôn trọng không gian riêng của nhau'],
  [/Cả hai đều very unexpressive — relationship can drift without explicit check-ins/gi, 'Cả hai đều rất ít bày tỏ — đồng hành có thể trôi dần nếu không trò chuyện kiểm tra rõ ràng'],
  [/Agree that expressing concerns is an act of love, not disruption/gi, 'Đồng ý rằng bày tỏ lo ngại là hành động quan tâm, không phải phá vỡ hòa khí'],
  [/Take turns being the one who brings up hard topics/gi, 'Luân phiên là người đề cập chủ đề khó'],
  [/Intentionally seek new experiences — try one thing neither has done before each month/gi, 'Chủ động tìm trải nghiệm mới — mỗi tháng thử một việc cả hai chưa từng làm'],
  [/Cả hai đều avoid conflict — vấn đề dễ bị suppressed/gi, 'Cả hai đều tránh va chạm — vấn đề dễ bị dìm xuống'],
  [/Cả hai đều people-pleasers — conflict thật có thể bị suppressed quá lâu/gi, 'Cả hai đều hay chiều lòng người khác — va chạm thật có thể bị dìm quá lâu'],
  [/ENTP: báo trước "tôi đang devil's advocate, không phải phê bình bạn\." ENFJ: hỏi intention trước khi defensive/gi, 'ENTP: báo trước "tôi đang lập luận phản biện, không phải phê bình bạn." ENFJ: hỏi ý định trước khi phòng thủ'],
  [/Đặt "conflict check-in" định kỳ — space an toàn để nói điều khó nói trước khi quá muộn/gi, 'Đặt trò chuyện kiểm tra va chạm định kỳ — không gian an toàn để nói điều khó nói trước khi quá muộn'],
  [/ESTJ bring execution và reliability; ENFJ bring warmth và human connection/gi, 'ESTJ mang khả năng triển khai và độ tin cậy; ENFJ mang sự ấm áp và kết nối con người'],
  [/ESTJ có thể thấy ENFJ quá emotional; ENFJ có thể thấy ESTJ lạnh lùng — dễ miscommunicate/gi, 'ESTJ có thể thấy ENFJ quá cảm xúc; ENFJ có thể thấy ESTJ lạnh lùng — dễ hiểu nhầm nhau'],
  [/ESTJ: validate cảm xúc trước khi đưa solution\. ENFJ: đưa ra concern với data khi cần/gi, 'ESTJ: công nhận cảm xúc trước khi đưa giải pháp. ENFJ: nêu lo ngại kèm dữ liệu khi cần'],
  [/Hai leader trong một relationship — ai lùi khi cần\? Dễ cạnh tranh authority/gi, 'Hai người dẫn dắt trong một mối đồng hành — ai lùi khi cần? Dễ cạnh tranh quyền lực'],
  [/ENTP debate vì yêu thích — ENFJ có thể cảm thấy bị tấn công dù không có ý đó/gi, 'ENTP tranh luận vì thích — ENFJ có thể cảm thấy bị tấn công dù không có ý đó'],
  [/ENFJ cần kế hoạch và commitment; ESFP thích tự phát — dễ frustrate nhau về timeline/gi, 'ENFJ cần kế hoạch và cam kết; ESFP thích tự phát — dễ làm nhau bực về mốc thời gian'],
  [/ESFP kéo ENFJ ra khỏi overthinking; ENFJ giúp ESFP tìm thêm ý nghĩa trong cuộc sống/gi, 'ESFP kéo ENFJ ra khỏi suy nghĩ quá đà; ENFJ giúp ESFP tìm thêm ý nghĩa trong cuộc sống'],
  [/Cả hai đều muốn cho — ai sẽ nhận\? Dễ rơi vào kiệt sức khi cả hai đều drain năng lượng phục vụ nhau/gi, 'Cả hai đều muốn cho — ai sẽ nhận? Dễ kiệt sức khi cả hai đều rút cạn năng lượng để phục vụ nhau'],
  [/Cả hai đều muốn cho đi và chăm sóc — ai sẽ là người nhận\? Dễ kiệt sức khi cả hai drain nhau qua việc over-give/gi, 'Cả hai đều muốn cho đi và chăm sóc — ai sẽ nhận? Dễ kiệt sức khi cả hai rút cạn nhau vì cho đi quá mức'],
  [/can feel cold if not intentional/gi, 'có thể cảm thấy lạnh lùng nếu không chủ ý'],
  [/value competence và depth/gi, 'coi trọng năng lực và chiều sâu'],
  [/highest natural tôn trọng for each other/gi, 'sự tôn trọng tự nhiên cao nhất dành cho nhau'],
  [/Deep intellectual connection — never boring, always growing together/gi, 'Kết nối trí tuệ sâu sắc — không bao giờ nhàm, luôn cùng phát triển'],
  [/Cả hai đều introverted và not expressive — sự ấm áp phải be intentional/gi, 'Cả hai đều hướng nội và ít bày tỏ — sự ấm áp cần được chủ ý'],
  [/cancel kế hoạch last minute/gi, 'hủy kế hoạch phút chót'],
  [/push for cam kết/gi, 'thúc ép cam kết'],
  [/human connection/gi, 'kết nối con người'],
  [/influence environment/gi, 'tác động đến môi trường'],
  [/qua lens khác nhau/gi, 'qua góc nhìn khác nhau'],
  [/values của mình bị challenge/gi, 'giá trị của mình bị thách thức'],
  [/pronounce judgment/gi, 'phán xét'],
  [/honest conversation/gi, 'trò chuyện thẳng thắn'],
  [/enjoy now/gi, 'tận hưởng hiện tại'],
  [/act of love/gi, 'hành động quan tâm'],
  [/genuine enthusiasm/gi, 'hứng thú thật sự'],
  [/people-focused/gi, 'tập trung con người'],
  [/social chemistry/gi, 'hòa hợp xã giao'],
  [/học navigate cùng nhau, không fix nhau/gi, 'học đi cùng nhau, không ép nhau thay đổi'],
  [/không fix nhau/gi, 'không ép nhau thay đổi'],
  [/chỉ cần vent, không cần giải pháp/gi, 'chỉ cần trút bầu tâm sự, không cần giải pháp'],
  [/navigate cùng nhau/gi, 'đi cùng nhau'],
  [/deep bond/gi, 'gắn kết sâu'],
  [/expressively emotional/gi, 'biểu lộ cảm xúc'],
  [/over-give/gi, 'cho đi quá mức'],
  [/burn out/gi, 'kiệt sức'],
  [/check-in/gi, 'trò chuyện kiểm tra'],
  [/follow-through/gi, 'theo sát đến cùng'],
  [/people-pleasers/gi, 'hay chiều lòng người khác'],
  [/miscommunicate/gi, 'hiểu nhầm nhau'],
  [/overthinking/gi, 'suy nghĩ quá đà'],
  [/conflict-avoidant/gi, 'né tránh va chạm'],
  [/easygoing/gi, 'thoải mái'],
  [/unexpressive/gi, 'ít bày tỏ'],
  [/spontaneous/gi, 'tự phát'],
  [/predictability/gi, 'khả năng đoán trước'],
  [/disappointment/gi, 'thất vọng'],
  [/acknowledge/gi, 'công nhận'],
  [/consensus/gi, 'đồng thuận'],
  [/dismiss/gi, 'bác bỏ'],
  [/devil's advocate/gi, 'lập luận phản biện'],
  [/think out loud/gi, 'nghĩ thành tiếng'],
  [/genuinely/gi, 'thật sự'],
  [/intellectually worthy/gi, 'đáng tranh luận về mặt trí tuệ'],
  [/honest discussion/gi, 'thảo luận thẳng thắn'],
  [/big picture/gi, 'bức tranh lớn'],
  [/proven methods/gi, 'cách đã được chứng minh'],
  [/love language/gi, 'cách thể hiện quan tâm'],
  [/relationship/gi, 'đồng hành'],
  [/partner/gi, 'người kia'],
  [/\bcouple\b/gi, 'cặp'],
  [/\brelationship\b/gi, 'đồng hành'],
  [/\boverwhelmed\b/gi, 'quá tải'],
  [/\boverwhelmed\b/gi, 'quá tải'],
  [/\bsupport\b/gi, 'hỗ trợ'],
  [/\bdrain\b/gi, 'rút cạn'],
  [/\babsorb\b/gi, 'gánh'],
  [/\bokay\b/gi, 'ổn'],
  [/\bplan\b/gi, 'kế hoạch'],
  [/\bplans\b/gi, 'kế hoạch'],
  [/\bexpect\b/gi, 'mong đợi'],
  [/\bprocess\b/gi, 'xử lý'],
  [/\befficient\b/gi, 'hiệu quả'],
  [/\brespect\b/gi, 'tôn trọng'],
  [/\bschedule\b/gi, 'sắp xếp lịch'],
  [/\bcommitment\b/gi, 'cam kết'],
  [/\bconflict\b/gi, 'va chạm'],
  [/\bleader\b/gi, 'người dẫn dắt'],
  [/\bleaders\b/gi, 'người dẫn dắt'],
  [/\bleadership\b/gi, 'vai trò dẫn dắt'],
  [/\bdebate\b/gi, 'tranh luận'],
  [/\bvalidate\b/gi, 'công nhận'],
  [/\bsolution\b/gi, 'giải pháp'],
  [/\bstructure\b/gi, 'cấu trúc'],
  [/\bflexible\b/gi, 'linh hoạt'],
  [/\bflexibility\b/gi, 'linh hoạt'],
  [/\bpressure\b/gi, 'áp lực'],
  [/\bcontrol\b/gi, 'kiểm soát'],
  [/\bfeelings\b/gi, 'cảm xúc'],
  [/\bfeeling\b/gi, 'cảm xúc'],
  [/\bdomain\b/gi, 'lĩnh vực'],
  [/\bcompeting\b/gi, 'cạnh tranh'],
  [/\bconcern\b/gi, 'lo ngại'],
  [/\bconcerns\b/gi, 'lo ngại'],
  [/\bimpact\b/gi, 'tác động'],
  [/\bstrategic\b/gi, 'chiến lược'],
  [/\bagree\b/gi, 'đồng ý'],
  [/\bexplore\b/gi, 'khám phá'],
  [/\bsignal\b/gi, 'báo hiệu'],
  [/\bframe\b/gi, 'đặt khung'],
  [/\bharmony\b/gi, 'hòa khí'],
  [/\bsuppressing\b/gi, 'dập tắt'],
  [/\bsuppressed\b/gi, 'bị dìm'],
  [/\binitiate\b/gi, 'khởi xướng'],
  [/\bvision\b/gi, 'tầm nhìn'],
  [/\bstability\b/gi, 'ổn định'],
  [/\bavoid\b/gi, 'tránh'],
  [/\bboth\b/gi, 'cả hai'],
  [/\bneither\b/gi, 'không ai'],
  [/\bbring\b/gi, 'mang'],
  [/\bbalance\b/gi, 'cân bằng'],
  [/\bauthentic\b/gi, 'chân thật'],
  [/\bauthenticity\b/gi, 'sự chân thật'],
  [/\bassertive\b/gi, 'khẳng định'],
  [/\bperpetually\b/gi, 'mãi'],
  [/\bdeferred\b/gi, 'bị hoãn'],
  [/\bcompetent\b/gi, 'giỏi'],
  [/\breliable\b/gi, 'đáng tin'],
  [/\btrust\b/gi, 'tin tưởng'],
  [/\bautonomy\b/gi, 'không gian riêng'],
  [/\bexplicit\b/gi, 'rõ ràng'],
  [/\bintensity\b/gi, 'cường độ'],
  [/\bindifference\b/gi, 'thờ ơ'],
  [/\breserved\b/gi, 'kín đáo'],
  [/\brigidity\b/gi, 'sự cứng nhắc'],
  [/\bstifling\b/gi, 'ngột ngạt'],
  [/\bunpredictability\b/gi, 'sự khó đoán'],
  [/\bfrustrate\b/gi, 'làm bực'],
  [/\bartistic\b/gi, 'nghệ thuật'],
  [/\bsystematic\b/gi, 'có hệ thống'],
  [/\bstructured\b/gi, 'có cấu trúc'],
  [/\bpractical\b/gi, 'thực tế'],
  [/\bnurturing\b/gi, 'nuôi dưỡng'],
  [/\bgentle\b/gi, 'dịu dàng'],
  [/\bcaring\b/gi, 'quan tâm'],
  [/\bwarmth\b/gi, 'sự ấm áp'],
  [/\bexecution\b/gi, 'triển khai'],
  [/\breliability\b/gi, 'độ tin cậy'],
  [/\bemotional\b/gi, 'cảm xúc'],
  [/\bauthority\b/gi, 'quyền lực'],
  [/\bintention\b/gi, 'ý định'],
  [/\bdefensive\b/gi, 'phòng thủ'],
  [/\bdisruption\b/gi, 'phá vỡ hòa khí'],
  [/\bdata\b/gi, 'dữ liệu'],
  [/\bmove on\b/gi, 'đi tiếp'],
  [/\bask for help\b/gi, 'nhờ giúp'],
  [/\bassume\b/gi, 'cho rằng'],
  [/\btreat\b/gi, 'coi'],
  [/\bdesignate\b/gi, 'phân loại'],
  [/\bzones\b/gi, 'vùng'],
  [/\bcommitted\b/gi, 'cam kết'],
  [/\bvariable\b/gi, 'biến số'],
  [/\bhealth\b/gi, 'sức khỏe'],
  [/\bvalid\b/gi, 'hợp lệ'],
  [/\bsoft\b/gi, 'mềm yếu'],
  [/\brespond\b/gi, 'phản hồi'],
  [/\balone\b/gi, 'một mình'],
  [/\bplay\b/gi, 'đóng vai'],
  [/\battack\b/gi, 'tấn công'],
  [/\bperson\b/gi, 'con người'],
  [/\bidea\b/gi, 'ý tưởng'],
  [/\bideas\b/gi, 'ý tưởng'],
  [/\bworth\b/gi, 'đáng'],
  [/\bargue\b/gi, 'tranh luận'],
  [/\bfind\b/gi, 'thấy'],
  [/\bshow\b/gi, 'thể hiện'],
  [/\bworth\b/gi, 'đáng'],
  [/\bprefer\b/gi, 'thích'],
  [/\bproven\b/gi, 'đã được chứng minh'],
  [/\bmethods\b/gi, 'cách làm'],
  [/\bbuild up\b/gi, 'tích tụ'],
  [/\bwork\b/gi, 'hiệu quả'],
  [/\bchange\b/gi, 'thay đổi'],
  [/\btrust\b/gi, 'tin tưởng'],
  [/\bshare\b/gi, 'chia sẻ'],
  [/\bcriticize\b/gi, 'chỉ trích'],
  [/\bnavigate\b/gi, 'đi cùng'],
  [/\bvent\b/gi, 'trút bầu tâm sự'],
  [/\bfix\b/gi, 'ép thay đổi'],
]

const EN_EXCLUDE = new Set([
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP',
  'Fe', 'Fi', 'Te', 'Ti', 'Ne', 'Ni', 'Se', 'Si', 'MBTI', 'ISP', 'ISJ', 'IST', 'SP',
  'Extraverted', 'Introverted', 'Thinking', 'Feeling', 'functions', 'function',
  'dominant', 'stack', 'type', 'types', 'percent', 'rare',
])

/** ≥12 từ Latin (≥3 ký tự) sau khi loại MBTI/terms — báo polish sau. */
function hasHeavyEnglish(text: string): boolean {
  const words = text.match(/\b[a-zA-Z]{3,}\b/g) ?? []
  const count = words.filter((w) => !EN_EXCLUDE.has(w) && !EN_EXCLUDE.has(w.toUpperCase())).length
  return count >= 18
}

function canonicalPairKey(typeA: string, typeB: string): string {
  return [typeA.trim().toUpperCase(), typeB.trim().toUpperCase()].sort().join('+')
}

function retone(text: string): string {
  let out = text
  for (const [from, to] of RETONE_PHRASES) {
    out = typeof from === 'string' ? out.split(from).join(to) : out.replace(from, to)
  }
  // Dọn khoảng trắng thừa sau khi xóa "the"
  out = out.replace(/\s{2,}/g, ' ').replace(/\s+([,.;:!?])/g, '$1').trim()
  return out
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function limitSentences(text: string, max: number): string {
  const parts = splitSentences(text)
  if (parts.length <= max) return text.trim()
  return parts.slice(0, max).join(' ')
}

function buildCanDeY(navigateTip: string, triggers: string[] | undefined): string[] {
  const fromTip = splitSentences(retone(navigateTip))
  const fromTriggers = (triggers ?? []).map((t) => retone(t))
  const merged = [...fromTip, ...fromTriggers]
  const seen = new Set<string>()
  const out: string[] = []
  for (const item of merged) {
    const key = item.toLowerCase()
    if (!item || seen.has(key)) continue
    seen.add(key)
    out.push(item)
    if (out.length >= 5) break
  }
  return out
}

function buildVungMaSat(watchOut: string, conflictPattern?: string): string {
  const base = retone(watchOut)
  if (!conflictPattern) return base
  const extra = retone(conflictPattern)
  if (base.toLowerCase().includes(extra.slice(0, 40).toLowerCase())) return limitSentences(base, 2)
  return limitSentences(`${base} ${extra}`, 2)
}

function escapeTsString(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function serializeRecord(data: Record<string, MatchPairContent>): string {
  const lines: string[] = []
  const keys = Object.keys(data).sort()
  for (const key of keys) {
    const e = data[key]!
    lines.push(`  '${key}': {`)
    lines.push(`    pairKey: '${e.pairKey}',`)
    lines.push(`    tenCap: '${escapeTsString(e.tenCap)}',`)
    lines.push(`    texture: '${e.texture}',`)
    lines.push(`    dongLuc: '${escapeTsString(e.dongLuc)}',`)
    lines.push(`    vungDeHop: '${escapeTsString(e.vungDeHop)}',`)
    lines.push(`    vungMaSat: '${escapeTsString(e.vungMaSat)}',`)
    lines.push(`    canDeY: [`)
    for (const c of e.canDeY) lines.push(`      '${escapeTsString(c)}',`)
    lines.push(`    ],`)
    lines.push(`    cachDiQua: [`)
    for (const c of e.cachDiQua) lines.push(`      '${escapeTsString(c)}',`)
    lines.push(`    ],`)
    if (e.funFact) lines.push(`    funFact: '${escapeTsString(e.funFact)}',`)
    lines.push(`    coverage: '${e.coverage}',`)
    lines.push(`  },`)
  }
  return lines.join('\n')
}

// Canonical hóa understand map
const understandByCanonical = new Map<string, (typeof UNDERSTAND_EACH_OTHER)[string]>()
for (const [rawKey, value] of Object.entries(UNDERSTAND_EACH_OTHER)) {
  const [a, b] = rawKey.split('+')
  const canon = canonicalPairKey(a!, b!)
  understandByCanonical.set(canon, value)
}

const result: Record<string, MatchPairContent> = {}
const dedupeWarnings: string[] = []
const heavyEnglishPairs = new Set<string>()

for (const entry of MBTI_COMPATIBILITY_MATRIX) {
  const pairKey = canonicalPairKey(entry.typeA, entry.typeB)
  if (result[pairKey]) {
    dedupeWarnings.push(pairKey)
    continue
  }

  const understand = understandByCanonical.get(pairKey)
  const coverage: MatchPairContent['coverage'] = understand ? 'full' : 'compat-only'

  const content: MatchPairContent = {
    pairKey,
    tenCap: retone(entry.label),
    texture: entry.compatibilityType,
    dongLuc: retone(entry.reason),
    vungDeHop: retone(entry.strengths),
    vungMaSat: buildVungMaSat(entry.watchOut, understand?.commonConflictPattern),
    canDeY: buildCanDeY(entry.navigateTip, understand?.conflictTriggers),
    cachDiQua: understand ? understand.navigationTips.map(retone) : [],
    coverage,
  }
  if (understand?.funFact) content.funFact = retone(understand.funFact)

  const allText = [
    content.tenCap,
    content.dongLuc,
    content.vungDeHop,
    content.vungMaSat,
    ...content.canDeY,
    ...content.cachDiQua,
    content.funFact ?? '',
  ].join(' ')
  if (hasHeavyEnglish(allText)) heavyEnglishPairs.add(pairKey)

  result[pairKey] = content
}

const fullCount = Object.values(result).filter((r) => r.coverage === 'full').length
const compatOnly = Object.values(result).filter((r) => r.coverage === 'compat-only')
const compatOnlyKeys = compatOnly.map((r) => r.pairKey).sort()

const outputPath = join(ROOT, 'src/lib/match/match-pair-content.ts')
const fileContent = `/**
 * MA M2a — Nội dung per-pair cho Match Assistant (136 cặp).
 * Key canonical khớp M1 getCompatSignal().pairKey = [a,b].sort().join("+").
 * // TODO(M4): wire getPairContent() vào router / persona inject.
 *
 * Generated by scripts/m2a-transform-match-pair-content.mts — không sửa tay.
 */

export interface MatchPairContent {
  pairKey: string
  tenCap: string
  texture: 'golden_pair' | 'growth_pair' | 'challenge_pair' | 'contrast_pair'
  dongLuc: string
  vungDeHop: string
  vungMaSat: string
  canDeY: string[]
  cachDiQua: string[]
  funFact?: string
  coverage: 'full' | 'compat-only'
}

export const MATCH_PAIR_CONTENT: Record<string, MatchPairContent> = {
${serializeRecord(result)}
}

/** Tra nội dung cặp theo pairKey canonical. // TODO(M4): gọi từ MA router. */
export function getPairContent(pairKey: string): MatchPairContent | null {
  return MATCH_PAIR_CONTENT[pairKey] ?? null
}
`

writeFileSync(outputPath, fileContent, 'utf8')

// Report
const sample = result['ENFP+INTJ']
console.log('=== M2a TRANSFORM REPORT ===')
console.log(`Total pairKeys: ${Object.keys(result).length}`)
console.log(`full: ${fullCount}`)
console.log(`compat-only: ${compatOnly.length}`)
console.log('compat-only pairKeys:', compatOnlyKeys.join(', '))
console.log(`Dedupe needed: ${dedupeWarnings.length > 0 ? dedupeWarnings.join(', ') : 'none'}`)
console.log(`Heavy English after retone (${heavyEnglishPairs.size}):`, [...heavyEnglishPairs].sort().join(', ') || 'none')
console.log('\n--- getPairContent("ENFP+INTJ") ---')
console.log(JSON.stringify(sample, null, 2))
console.log(`\nWrote ${outputPath}`)
