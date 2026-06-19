/**
 * TNCB P2P — Content Strings cho:
 * - Safety Education Micro-Copy
 * - Life Stage Questions
 * - Values Questions
 *
 * Datamine 13/06/2026
 * Content agent viết, Cursor wire vào app
 * Không translate, chỉ dùng bản Tiếng Việt
 */

export interface LifeStageQuestion {
  question: string
  subtext?: string
  options: string[]
  maxSelections?: number
}

export interface ValuesQuestion {
  question: string
  options: string[]
}

/**
 * Safety education micro-copy strings
 */
export const SAFETY_EDUCATION_STRINGS = [
  'Trước khi gặp mặt ngoài đời, hãy trò chuyện một thời gian trong app để tìm hiểu kỹ hơn. Cẩn trọng nếu đối phương thúc giục chuyển sang Zalo hay Telegram quá sớm.',
  'Dù bạn có cảm tình tốt đến đâu, đừng vội chuyển tiền hay mua quà tặng cho người chưa gặp mặt. Đó là dấu hiệu bạn cần để ý tới sự an toàn của mình.',
  'Một người chân thành sẵn sàng video call để chứng minh họ là người thật. Nếu đối phương liên tục trì hoãn gọi video với nhiều lý do, bạn nên cẩn thận.',
  'Khi hai người đủ tin tưởng để chia sẻ thông tin cá nhân như số điện thoại hay địa chỉ, hãy dành chút thời gian kiểm tra lại. Tránh vội vàng trước khi thật sự chắc chắn.',
]

/**
 * Life stage questions + options
 */
export const LIFE_STAGE_QUESTIONS: LifeStageQuestion[] = [
  {
    question: 'Bạn đang tìm mối quan hệ như thế nào?',
    options: [
      'Nghiêm túc, hướng đến hôn nhân',
      'Tìm hiểu từ từ, xem phù hợp không',
      'Thoải mái, không có kế hoạch dài hạn',
      'Tôi vẫn đang tự tìm hiểu bản thân',
    ],
    maxSelections: 1,
  },
  {
    question: 'Mục tiêu của bạn trong 3 năm tới?',
    subtext: '(chọn tối đa 2)',
    options: [
      'Sự nghiệp thăng tiến',
      'Mua nhà / xe',
      'Kết hôn / có gia đình',
      'Du lịch / trải nghiệm',
      'Học tập / phát triển bản thân',
      'Tích lũy tài chính',
    ],
    maxSelections: 2,
  },
]

/**
 * Values questions + options
 */
export const VALUES_QUESTIONS: ValuesQuestion[] = [
  {
    question: 'Gia đình hay sự nghiệp, bạn thường ưu tiên cái nào nếu phải chọn?',
    options: [
      'Gia đình quan trọng hơn',
      'Sự nghiệp được ưu tiên',
      'Cố gắng cân bằng cả hai',
      'Tùy từng thời điểm',
    ],
  },
  {
    question: 'Với những quyết định quan trọng, bạn muốn:',
    options: [
      'Tự đưa ra quyết định',
      'Bàn bạc và lắng nghe ý kiến gia đình',
    ],
  },
  {
    question: 'Bạn mong muốn người yêu là:',
    options: [
      'Chỗ dựa giúp bạn có cuộc sống ổn định',
      'Người thúc đẩy bạn liên tục phát triển bản thân',
      'Vừa là nơi nương tựa, vừa là động lực của nhau',
    ],
  },
  {
    question: 'Quan điểm của bạn về tài chính trong mối quan hệ?',
    options: [
      'Giữ độc lập, ai lo phần nấy',
      'Chia sẻ và quản lý chung một phần',
      'Gộp chung hoàn toàn',
    ],
  },
  {
    question: '5 năm nữa, bạn muốn sống ở đâu nhất?',
    options: [
      'Quê nhà bên gia đình',
      'Một thành phố lớn, năng động',
      'Nơi nào cũng được, miễn là cùng người mình yêu',
      'Tôi thích khám phá nhiều nơi, chưa muốn ổn định',
    ],
  },
  {
    question: 'Bạn có sẵn sàng chuyển đến sống ở nơi khác vì tình yêu không?',
    options: [
      'Có, tôi sẵn sàng thay đổi để ở cùng người mình yêu',
      'Không, tôi muốn ổn định ở quê nhà',
      'Tùy hoàn cảnh cụ thể, cần bàn bạc kỹ',
    ],
  },
]

export const P2P_SIGNUP_DATE_KEY = 'p2p_signup_date'

export function getDaysSinceSignup(signupDate: Date): number {
  return Math.floor((Date.now() - signupDate.getTime()) / 86400000)
}

export function getDailySafetyTip(signupDate: Date): string | null {
  const day = getDaysSinceSignup(signupDate)
  if (day < 0 || day >= SAFETY_EDUCATION_STRINGS.length) return null
  return SAFETY_EDUCATION_STRINGS[day]
}
