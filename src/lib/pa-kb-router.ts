import { getPAPrefs } from '../db/tncb-db'
import type { PADomain } from '../data/pa-domains'

const DOMAIN_KB_HINT: Partial<Record<PADomain, string>> = {
  stress: 'User quan tâm đến stress và cân bằng cảm xúc. Khi liên quan: gợi kỹ thuật từ STRESS_TECHNIQUES.',
  'tai-chinh': 'User quan tâm tài chính cá nhân. Khi liên quan: warn bẫy tài chính VN, không tư vấn đầu tư.',
  'phat-trien': 'User quan tâm phát triển bản thân. Khi liên quan: gợi learning platform và thói quen phù hợp type.',
  'an-vi': 'User quan tâm ẩm thực. Khi liên quan: gợi món VN phù hợp nhóm, không tư vấn y tế.',
  'xa-hoi': 'User quan tâm kỹ năng xã hội. Khi liên quan: gợi script mở lời và ranh giới phù hợp type.',
  'van-hoa': 'User quan tâm văn hóa và triết học. Khi liên quan: gợi triết lý phù hợp type (không ép tôn giáo).',
  'lich-su': 'User quan tâm lịch sử. Khi liên quan: kết nối bước ngoặt lịch sử với góc nhìn type.',
  'suc-khoe': 'User quan tâm sức khỏe. Khi liên quan: gợi kiểu tập phù hợp type, không tư vấn y tế.',
  'giai-tri': 'User quan tâm giải trí. Khi liên quan: gợi phim/sách phù hợp nhóm type.',
  'du-lich': 'User quan tâm du lịch. Khi liên quan: gợi kiểu du lịch và cảnh báo bẫy phổ biến.',
  'phap-luat': 'User quan tâm pháp luật. Khi liên quan: nhắc quyền lợi, không tư vấn pháp lý cụ thể.',
  'moi-truong': 'User quan tâm môi trường. Khi liên quan: gợi hành động xanh thực tế, không moralize.',
}

export async function getDomainKBHint(_mbtiType: string): Promise<string> {
  const prefs = await getPAPrefs()
  const domains = prefs.selectedDomains ?? ['ban-than']

  const topDomains = domains
    .filter((d) => d !== 'ban-than')
    .slice(0, 2)

  const hints = topDomains
    .map((d) => DOMAIN_KB_HINT[d])
    .filter(Boolean)

  return hints.length > 0
    ? `Lĩnh vực user quan tâm:\n${hints.join('\n')}`
    : ''
}
