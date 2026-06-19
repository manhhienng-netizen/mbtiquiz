export type PADomain =
  | 'ban-than'
  | 'suc-khoe'
  | 'stress'
  | 'muc-tieu'
  | 'phap-luat'
  | 'giai-tri'
  | 'du-lich'
  | 'phat-trien'
  | 'tai-chinh'
  | 'an-vi'
  | 'xa-hoi'
  | 'moi-truong'
  | 'van-hoa'
  | 'lich-su'

export const PA_ACCENT = '#7F77DD'

export const ALL_PA_DOMAINS: PADomain[] = [
  'ban-than',
  'suc-khoe',
  'stress',
  'muc-tieu',
  'phap-luat',
  'giai-tri',
  'du-lich',
  'phat-trien',
  'tai-chinh',
  'an-vi',
  'xa-hoi',
  'moi-truong',
  'van-hoa',
  'lich-su',
]

export const PA_DOMAIN_META: Record<
  PADomain,
  { icon: string; name: string; sub: string }
> = {
  'ban-than': {
    icon: '🧠',
    name: 'Hiểu bản thân',
    sub: 'Điểm mạnh · cảm xúc · phát triển',
  },
  'suc-khoe': {
    icon: '🏃',
    name: 'Sức khỏe',
    sub: 'Vận động · giấc ngủ · thói quen',
  },
  stress: {
    icon: '🧘',
    name: 'Stress',
    sub: 'Nhận diện · điều tiết · hỗ trợ',
  },
  'muc-tieu': {
    icon: '🎯',
    name: 'Mục tiêu sống',
    sub: 'Kế hoạch · lộ trình · theo dõi',
  },
  'phap-luat': {
    icon: '⚖️',
    name: 'Pháp luật',
    sub: 'Quyền lợi · tình huống thực tế',
  },
  'giai-tri': {
    icon: '🎬',
    name: 'Giải trí',
    sub: 'Phim · sách · nhạc · podcast',
  },
  'du-lich': {
    icon: '✈️',
    name: 'Du lịch',
    sub: 'Điểm đến · tips · kiểu phù hợp bạn',
  },
  'phat-trien': {
    icon: '📚',
    name: 'Phát triển bản thân',
    sub: 'Kỹ năng · ngôn ngữ · kiến thức',
  },
  'tai-chinh': {
    icon: '💰',
    name: 'Tài chính cá nhân',
    sub: 'Ngân sách · tiết kiệm · tránh bẫy',
  },
  'an-vi': {
    icon: '🍜',
    name: 'Ẩm thực',
    sub: 'Món ăn · dinh dưỡng · công thức',
  },
  'xa-hoi': {
    icon: '🤝',
    name: 'Xã hội',
    sub: 'Kết bạn · ranh giới · conflict',
  },
  'moi-truong': {
    icon: '🌍',
    name: 'Môi trường',
    sub: 'Sống xanh · bền vững',
  },
  'van-hoa': {
    icon: '🏛️',
    name: 'Văn hóa',
    sub: 'Triết lý · tôn giáo · nghi lễ',
  },
  'lich-su': {
    icon: '📜',
    name: 'Lịch sử',
    sub: 'Bước ngoặt · ý tưởng lớn',
  },
}

export const DOMAIN_ROUTES: Partial<Record<PADomain, string>> = {
  'ban-than': '/assistant/chat',
  'suc-khoe': '/assistant/health',
  stress: '/assistant/stress',
  'phap-luat': '/assistant/legal',
  'giai-tri': '/assistant/entertainment',
  'du-lich': '/assistant/travel',
  'phat-trien': '/assistant/self-dev',
  'tai-chinh': '/assistant/finance',
  'an-vi': '/assistant/food',
  'xa-hoi': '/assistant/social',
  'moi-truong': '/assistant/environment',
  'van-hoa': '/assistant/culture',
  'lich-su': '/assistant/history',
}

export function isDomainAvailable(domain: PADomain): boolean {
  return domain in DOMAIN_ROUTES
}

export type Q1Choice =
  | 'ban-than'
  | 'cuoc-song'
  | 'giai-tri-kham-pha'
  | 'phat-trien'

export const Q1_OPTIONS: { id: Q1Choice; label: string }[] = [
  { id: 'ban-than', label: 'Hiểu bản thân' },
  { id: 'cuoc-song', label: 'Cuộc sống thực tế' },
  { id: 'giai-tri-kham-pha', label: 'Giải trí & Khám phá' },
  { id: 'phat-trien', label: 'Phát triển' },
]

export const Q2_BY_Q1: Record<
  Exclude<Q1Choice, 'ban-than'>,
  { id: string; label: string; domains: PADomain[] }[]
> = {
  'cuoc-song': [
    { id: 'phap-luat', label: 'Pháp luật', domains: ['phap-luat'] },
    { id: 'tai-chinh', label: 'Tài chính', domains: ['tai-chinh'] },
    { id: 'suc-khoe', label: 'Sức khỏe', domains: ['suc-khoe'] },
    { id: 'du-lich', label: 'Du lịch', domains: ['du-lich'] },
    { id: 'stress', label: 'Stress', domains: ['stress'] },
    { id: 'an-vi', label: 'Ẩm thực', domains: ['an-vi'] },
  ],
  'giai-tri-kham-pha': [
    { id: 'phim', label: 'Phim & Series', domains: ['giai-tri'] },
    { id: 'sach', label: 'Sách', domains: ['giai-tri'] },
    { id: 'du-lich', label: 'Du lịch', domains: ['du-lich', 'giai-tri'] },
    { id: 'hobby', label: 'Hobby mới', domains: ['giai-tri', 'phat-trien'] },
    { id: 'van-hoa', label: 'Văn hóa', domains: ['van-hoa'] },
    { id: 'lich-su', label: 'Lịch sử', domains: ['lich-su'] },
  ],
  'phat-trien': [
    {
      id: 'tu-duy',
      label: 'Tư duy & Kỹ năng',
      domains: ['phat-trien'],
    },
    {
      id: 'suc-khoe-the-chat',
      label: 'Sức khỏe & Thể chất',
      domains: ['phat-trien', 'suc-khoe'],
    },
    {
      id: 'tai-chinh',
      label: 'Tài chính',
      domains: ['phat-trien', 'tai-chinh'],
    },
    { id: 'ngon-ngu', label: 'Ngôn ngữ', domains: ['phat-trien'] },
    { id: 'xa-hoi', label: 'Xã hội', domains: ['xa-hoi'] },
    { id: 'moi-truong', label: 'Môi trường', domains: ['moi-truong'] },
  ],
}

export function needsQ2(q1: Q1Choice[]): boolean {
  return q1.some((choice) => choice !== 'ban-than')
}

export function getQ2Options(q1: Q1Choice[]) {
  const options: { id: string; label: string; domains: PADomain[] }[] = []
  const seen = new Set<string>()

  for (const choice of q1) {
    if (choice === 'ban-than') continue
    for (const opt of Q2_BY_Q1[choice]) {
      if (!seen.has(opt.id)) {
        seen.add(opt.id)
        options.push(opt)
      }
    }
  }

  return options
}

export function mapOnboardingToDomains(
  q1: Q1Choice[],
  q2Ids: string[],
): PADomain[] {
  const domains = new Set<PADomain>(['ban-than'])

  if (q1.includes('giai-tri-kham-pha')) {
    domains.add('giai-tri')
  }
  if (q1.includes('phat-trien')) {
    domains.add('phat-trien')
  }

  const q2Options = getQ2Options(q1)
  for (const opt of q2Options) {
    if (q2Ids.includes(opt.id)) {
      for (const domain of opt.domains) {
        domains.add(domain)
      }
    }
  }

  return ALL_PA_DOMAINS.filter((domain) => domains.has(domain))
}

export function isValidPADomain(value: string): value is PADomain {
  return ALL_PA_DOMAINS.includes(value as PADomain)
}
