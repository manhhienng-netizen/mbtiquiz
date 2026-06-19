/**
 * MA M2b — 12 block fallback content cho Match Assistant.
 * Dùng khi không đủ type đối phương hoặc cặp thiếu per-pair content (M2a).
 * BlockKey khớp M1 compat-signal.ts.
 * Wired M4-core via build-match-compat-inject.ts.
 */

import type { BlockKey } from './compat-signal'

export type { BlockKey }

export interface MatchBlockContent {
  key: BlockKey
  tieuDe: string
  dongLuc: string
  canDeY: string
}

export const MATCH_BLOCK_CONTENT: Record<BlockKey, MatchBlockContent> = {
  B1_NN: {
    key: 'B1_NN',
    tieuDe: 'Cả hai thiên trực giác',
    dongLuc:
      "Cả hai bạn sống với ý tưởng, khả năng và bức tranh lớn. Dễ hợp ở tầm nhìn và những cuộc trò chuyện 'nếu như' kéo dài không chán.",
    canDeY:
      'Cả hai dễ bỏ qua chi tiết thực tế và việc cụ thể — ai sẽ lo phần mặt đất? Thử thống nhất một người hoặc một cái lịch giữ phần thực thi.',
  },
  B2_SS: {
    key: 'B2_SS',
    tieuDe: 'Cả hai thực tế',
    dongLuc:
      'Cả hai bám chi tiết, trải nghiệm cụ thể, điều làm được thật. Dễ hiểu nhau ở lối sống thực tế và đáng tin.',
    canDeY:
      'Khi cần đổi mới hoặc nhìn xa, cả hai có thể ngại rời vùng quen. Thỉnh thoảng chủ động thử cái mới cùng nhau.',
  },
  B3_NxS: {
    key: 'B3_NxS',
    tieuDe: 'Trực giác gặp thực tế',
    dongLuc:
      'Một người nói khái niệm và khả năng, người kia cần ví dụ cụ thể và bằng chứng. Khi dịch được cho nhau, hai góc nhìn này bù nhau rất tốt.',
    canDeY:
      "Không phải ai đúng ai sai — là hai ngôn ngữ khác nhau. Người thiên trực giác: cho ví dụ thực tế. Người thiên thực tế: hỏi 'ý đằng sau là gì' thay vì gạt đi.",
  },
  B4_TxF: {
    key: 'B4_TxF',
    tieuDe: 'Lý gặp tình',
    dongLuc:
      'Một người quyết bằng logic và hiệu quả, người kia bằng giá trị và cảm xúc của người trong cuộc. Hai cách này có thể đỡ cho nhau khi hiểu nhau.',
    canDeY:
      "Dễ hiểu nhầm: một bên thấy bên kia 'cảm tính', bên kia thấy 'lạnh'. Người thiên lý: nói cả lý do bạn quan tâm, không chỉ kết luận. Người thiên cảm: nói rõ điều bạn cần, đừng để người kia đoán.",
  },
  B5_TT: {
    key: 'B5_TT',
    tieuDe: 'Cả hai thiên lý trí',
    dongLuc:
      'Cả hai ưu tiên lý lẽ, thẳng thắn, hiệu quả. Tranh luận không làm hỏng quan hệ — với hai bạn nó là một cách kết nối.',
    canDeY:
      "Dễ thiếu phần ấm và ghi nhận cảm xúc. Đôi khi dừng lại hỏi 'bạn ổn không' trước khi nhảy vào phân tích.",
  },
  B6_FF: {
    key: 'B6_FF',
    tieuDe: 'Cả hai thiên cảm xúc',
    dongLuc:
      'Cả hai coi trọng hòa khí, cảm xúc và sự ấm áp. Quan hệ thường dễ chịu, nhiều đồng cảm.',
    canDeY:
      'Cả hai dễ né xung đột để giữ hòa, rồi tích tụ. Tập nói thẳng điều khó chịu sớm và nhẹ, trước khi nó lớn lên.',
  },
  B7_JxP: {
    key: 'B7_JxP',
    tieuDe: 'Kế hoạch gặp linh hoạt',
    dongLuc:
      'Một người thích chốt sớm và có kế hoạch, người kia thích để mở và ứng biến. Đúng lúc, hai nhịp này cân nhau.',
    canDeY:
      "Va ở nhịp: một bên thấy bên kia 'thiếu cam kết', bên kia thấy 'cứng nhắc'. Thỏa thuận cái gì cần chốt để một người yên tâm, và cái gì để mở được để người kia thở.",
  },
  B8_JJ: {
    key: 'B8_JJ',
    tieuDe: 'Cả hai thích rõ ràng',
    dongLuc:
      'Cả hai thích kế hoạch, kết cấu, quyết sớm. Việc chung thường chạy trơn và đúng hẹn.',
    canDeY:
      'Khi cả hai cùng chắc và không ai muốn nhường, dễ bế tắc ở chuyện ai quyết. Thống nhất trước ai cầm trịch mảng nào.',
  },
  B9_PP: {
    key: 'B9_PP',
    tieuDe: 'Cả hai thích để mở',
    dongLuc:
      'Cả hai linh hoạt, ứng biến, ít áp lực lịch. Ở cạnh nhau thường thoải mái, dễ thở.',
    canDeY:
      'Dễ cùng trôi, không ai chốt, việc và quyết định bị treo. Thỉnh thoảng cố tình đặt một hạn rõ cho việc quan trọng.',
  },
  B10_ExI: {
    key: 'B10_ExI',
    tieuDe: 'Hướng ngoại gặp hướng nội',
    dongLuc:
      'Một người nạp năng lượng từ giao tiếp và ra ngoài, người kia từ yên tĩnh và ở một mình. Hiểu rồi thì hai bạn nhắc nhau cân bằng.',
    canDeY:
      'Va ở nhu cầu xã giao: một bên thấy thiếu kết nối, bên kia thấy quá tải. Không phải xa cách — chỉ là cách sạc pin khác nhau. Thương lượng liều lượng ra ngoài và ở nhà.',
  },
  B11_II: {
    key: 'B11_II',
    tieuDe: 'Cả hai hướng nội',
    dongLuc:
      "Cả hai cần không gian riêng và suy nghĩ trước khi nói. Hiểu nhau ở nhu cầu yên tĩnh, không phải lúc nào cũng 'bật'.",
    canDeY:
      'Dễ cùng im, ít chủ động ra ngoài hoặc nói ra điều trong lòng. Tập chủ động chia sẻ, đừng đợi người kia hỏi mới nói.',
  },
  B12_EE: {
    key: 'B12_EE',
    tieuDe: 'Cả hai hướng ngoại',
    dongLuc:
      'Cả hai sôi nổi, nạp năng lượng qua giao tiếp, thích cùng ra ngoài. Năng lượng chung thường cao.',
    canDeY:
      'Dễ thiếu khoảng lặng và không gian riêng, và đôi khi cùng nói mà ít lắng nghe. Chừa thời gian để nghe nhau và những lúc tĩnh.',
  },
}

/** Tra 1 block theo key. // TODO(M4): gọi từ MA router. */
export function getBlockContent(key: BlockKey): MatchBlockContent {
  return MATCH_BLOCK_CONTENT[key]
}

/** Map theo thứ tự keys; key lạ → bỏ qua. // TODO(M4): gọi từ MA router. */
export function getBlocksForKeys(keys: BlockKey[]): MatchBlockContent[] {
  const out: MatchBlockContent[] = []
  for (const key of keys) {
    const block = MATCH_BLOCK_CONTENT[key as BlockKey]
    if (block) out.push(block)
  }
  return out
}
