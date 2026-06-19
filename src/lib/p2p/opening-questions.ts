/**
 * TNCB — Opening Questions (408 câu · 136 cặp MBTI × 3)
 * Port từ: tiemnangcuaban/packages/data/src/match-opening-questions-data.ts
 * Nguyên tắc: không yes/no · reveal personality · phù hợp cognitive style
 * Nguồn gốc: Aron 36 Questions · Gottman Love Maps · School of Life · MBTI theory
 * Chuẩn hóa: 100% tiếng Việt (loại bỏ code-switch)
 */

import type { MBTIType } from '../../data/quiz-types'

/** Key = 2 MBTI types, alphabet-sorted, joined với '+'. Ví dụ: "ENFP+INTJ" */
export type MBTIPairKey = string

/** Map 136 cặp → mảng 3 câu hỏi mở */
export type OpeningQuestionsMap = Record<MBTIPairKey, [string, string, string]>

/** 3 câu fallback khi cặp không có trong map */
export const DEFAULT_OPENING_QUESTIONS: [string, string, string] = [
  'Điều gì đang chiếm nhiều suy nghĩ của bạn nhất gần đây?',
  'Khoảnh khắc nào trong tuần vừa rồi khiến bạn cảm thấy thực sự sống động?',
  'Nếu có thể học thêm 1 kỹ năng mới ngay lúc này, bạn sẽ chọn gì?',
]

/**
 * Tạo pairKey từ 2 MBTI type — luôn alphabet-sorted
 * getOpeningQuestions("INTJ", "ENFP") === getOpeningQuestions("ENFP", "INTJ")
 */
export function makePairKey(typeA: MBTIType, typeB: MBTIType): MBTIPairKey {
  return [typeA, typeB].sort().join('+')
}

/**
 * Lấy 3 câu hỏi cho cặp type.
 * Nếu không tìm thấy key → trả DEFAULT_OPENING_QUESTIONS.
 */
export function getOpeningQuestions(
  typeA: MBTIType,
  typeB: MBTIType,
): [string, string, string] {
  const key = makePairKey(typeA, typeB)
  return OPENING_QUESTIONS[key] ?? DEFAULT_OPENING_QUESTIONS
}

/**
 * Lấy N câu random (không trùng nhau) cho cặp type.
 */
export function getRandomOpeningQuestions(
  typeA: MBTIType,
  typeB: MBTIType,
  count: number = 3,
  usedIndices: Set<number> = new Set(),
): { questions: string[]; indices: number[] } {
  const pool = getOpeningQuestions(typeA, typeB)
  const available = pool
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => !usedIndices.has(i))

  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[available[i], available[j]] = [available[j], available[i]]
  }

  const selected = available.slice(0, count)
  return {
    questions: selected.map(({ q }) => q),
    indices: selected.map(({ i }) => i),
  }
}

// ─── DATA (136 cặp × 3 câu = 408 câu) ───────────────────────────────────────

export const OPENING_QUESTIONS: OpeningQuestionsMap = {
  'ENFJ+ENFJ': [
    'Điều gì đang khiến bạn muốn tạo ra sự thay đổi cho người xung quanh nhất lúc này?',
    'Bạn thường nhận ra "mình đang sống đúng với mình nhất" trong tình huống nào?',
    'Câu chuyện của người nào đã thay đổi cách bạn nhìn thế giới?',
  ],

  'ENFJ+ENFP': [
    'Điều gì bạn đang học được từ cuộc sống mà không ai dạy bạn?',
    'Khoảnh khắc nào gần đây làm bạn thấy "cuộc sống thật đáng sống"?',
    'Nếu bạn có thể lan tỏa 1 ý tưởng đến mọi người xung quanh, đó là gì?',
  ],

  'ENFJ+ENTJ': [
    'Điều gì bạn muốn xây dựng trong 5 năm tới mà cần người khác tin vào?',
    'Bạn thường biết mình đang ở đúng vai khi cảm thấy điều gì?',
    'Quyết định nào trong cuộc đời bạn nghĩ đã định hình con người bạn nhất?',
  ],

  'ENFJ+ENTP': [
    'Ý tưởng nào bạn từng có mà người xung quanh chưa hiểu ngay nhưng sau đó đã thấy đúng?',
    'Điều gì trong xã hội hiện tại bạn nghĩ cần thay đổi nhất và tại sao?',
    'Khi nào bạn cảm thấy "cuộc tranh luận này thú vị hơn là gây căng thẳng"?',
  ],

  'ENFJ+ESFJ': [
    'Điều gì khiến bạn cảm thấy "mình đang thực sự có mặt" cho người quan trọng?',
    'Khoảnh khắc nào bạn nhận ra mình đang cần được chăm sóc thay vì chăm sóc người khác?',
    'Cộng đồng hay nhóm người nào đã tạo ra ảnh hưởng lớn nhất với bạn?',
  ],

  'ENFJ+ESFP': [
    'Trải nghiệm nào gần đây làm bạn nhớ lại lý do tại sao cuộc sống thú vị?',
    'Điều gì bạn làm không phải vì nó hiệu quả mà vì nó làm bạn vui?',
    'Khi gặp người mới, điều gì thường khiến bạn muốn biết thêm về họ?',
  ],

  'ENFJ+ESTJ': [
    'Điều gì bạn đã xây dựng được mà bạn tự hào nhất — không cần phải là thứ lớn?',
    'Khi có trách nhiệm lớn, bạn thường tìm thấy năng lượng từ đâu?',
    'Điều gì trong công việc hoặc cuộc sống bạn muốn làm tốt hơn và đang thử?',
  ],

  'ENFJ+ESTP': [
    'Khoảnh khắc nào bạn phải hành động ngay mà không có đủ thời gian suy nghĩ — và kết quả thế nào?',
    'Điều gì bạn đang muốn thử mà chưa có cơ hội?',
    'Bạn thường biết một người đáng tin cậy khi quan sát điều gì?',
  ],

  'ENFJ+INFJ': [
    'Điều gì bạn cảm nhận về người khác trước khi họ nói ra — và bạn có đúng không?',
    'Khi nào bạn thấy "mình hiểu người này ở một tầng mà họ chưa nói"?',
    'Điều gì bạn muốn thế giới hiểu hơn về con người?',
  ],

  'ENFJ+INFP': [
    'Giá trị nào bạn không bao giờ muốn đánh đổi dù hoàn cảnh thay đổi?',
    'Điều gì làm bạn cảm thấy "mình đang sống đúng với bản thân nhất"?',
    'Có câu chuyện hoặc nhân vật nào bạn thấy mình trong đó không?',
  ],

  'ENFJ+INTJ': [
    'Điều gì bạn đang muốn hiểu sâu hơn mà cảm thấy chưa có đủ câu trả lời?',
    'Khi bạn thấy một vấn đề xã hội, bạn thường nghĩ đến giải pháp hay nghĩ đến người bị ảnh hưởng trước?',
    'Điều gì bạn đã thay đổi quan điểm hoàn toàn trong vài năm qua?',
  ],

  'ENFJ+INTP': [
    'Ý tưởng nào bạn đang khám phá mà chưa biết nó sẽ dẫn đến đâu?',
    'Khi nào bạn cảm thấy "người này đang nói điều mà mình đã cảm nhận nhưng chưa diễn đạt được"?',
    'Điều gì bạn muốn học không phải vì nó hữu ích mà vì nó thú vị?',
  ],

  'ENFJ+ISFJ': [
    'Điều gì bạn thường làm cho người quan trọng mà họ có thể không để ý?',
    'Khoảnh khắc nào bạn cảm thấy "mình đang ở đúng nơi, đúng lúc"?',
    'Truyền thống hoặc thói quen nào bạn muốn giữ lại và truyền đi?',
  ],

  'ENFJ+ISFP': [
    'Điều gì trong cuộc sống hàng ngày đang khiến bạn chú ý đến vẻ đẹp?',
    'Khi bạn cảm thấy chân thật nhất, bạn thường đang làm gì?',
    'Có thứ gì bạn muốn tạo ra hoặc thể hiện nhưng chưa có đủ không gian?',
  ],

  'ENFJ+ISTJ': [
    'Điều gì bạn đã cam kết và giữ được mà bạn tự hào?',
    'Khi có quyết định khó, bạn thường quay lại điều gì như là "kim chỉ nam"?',
    'Điều gì trong cuộc sống bạn muốn tin tưởng và không cần thay đổi?',
  ],

  'ENFJ+ISTP': [
    'Khi bạn phải giải quyết vấn đề phức tạp, bạn thường tiếp cận từ đâu?',
    'Điều gì bạn thường quan sát mà người khác hay bỏ qua?',
    'Bạn thường biết mình đang làm điều gì đó đúng khi cảm thấy thế nào?',
  ],

  'ENFP+ENFP': [
    'Ý tưởng nào đang sống trong đầu bạn mà bạn chưa biết phải làm gì với nó?',
    'Điều gì gần đây khiến bạn hào hứng theo cách mà bạn khó giải thích?',
    'Khi nào bạn cảm thấy "mình thực sự muốn biết thêm về người này"?',
  ],

  'ENFP+ENTJ': [
    'Nếu tài nguyên không phải là giới hạn, bạn sẽ xây dựng điều gì?',
    'Điều gì bạn thấy cần thay đổi và đang làm gì về nó?',
    'Khoảnh khắc nào bạn nhận ra mình đang thực sự trong "trạng thái đắm chìm"?',
  ],

  'ENFP+ENTP': [
    'Điều gì bạn tin là đúng mà phần lớn mọi người xung quanh chưa đồng ý?',
    'Ý tưởng nào từng "điên rồ" nhưng sau đó hóa ra có lý?',
    'Khi nào bạn cảm thấy "cuộc trò chuyện này đang đi đến chỗ thú vị"?',
  ],

  'ENFP+ESFJ': [
    'Điều gì bạn làm cho người khác mà bạn cảm thấy không cần được cảm ơn?',
    'Khoảnh khắc nào bạn thấy "mình đang ở đúng chỗ, đúng người"?',
    'Điều gì trong cuộc sống đang mang lại niềm vui thuần túy cho bạn?',
  ],

  'ENFP+ESFP': [
    'Trải nghiệm nào gần đây khiến bạn muốn kể cho mọi người nghe?',
    'Điều gì bạn thường bắt đầu vì tò mò mà sau đó không thể dừng?',
    'Khi đi đến nơi mới, điều gì bạn thường chú ý đầu tiên?',
  ],

  'ENFP+ESTJ': [
    'Điều gì bạn đã xây dựng được mà bạn cảm thấy tự hào nhất — kể cả nếu không ai biết?',
    'Khi có vấn đề phức tạp, bạn thường muốn nói về nó hay muốn giải quyết nó trước?',
    'Điều gì bạn đã thay đổi quan điểm sau khi trải nghiệm thực tế?',
  ],

  'ENFP+ESTP': [
    'Điều gì bạn thường làm theo bản năng mà sau đó mới hiểu tại sao đó là đúng?',
    'Khoảnh khắc nào bạn cảm thấy "mình đang thực sự sống"?',
    'Điều gì bạn muốn thử mà vẫn chưa dám?',
  ],

  'ENFP+INFJ': [
    'Điều gì bạn cảm nhận về người khác từ rất sớm mà khó diễn đạt thành lời?',
    'Ý tưởng hoặc tầm nhìn nào bạn mang theo nhưng chưa chia sẻ hết?',
    'Khi nào bạn cảm thấy "người này hiểu mình theo cách khác thường"?',
  ],

  'ENFP+INFP': [
    'Điều gì bạn tìm kiếm trong một cuộc trò chuyện thực sự tốt?',
    'Có ý tưởng hoặc câu chuyện nào đang ám ảnh bạn theo nghĩa tốt không?',
    'Điều gì bạn biết về bản thân mà người khác có thể bất ngờ nếu biết?',
  ],

  'ENFP+INTJ': [
    'Dự án hoặc ý tưởng nào đang chiếm nhiều suy nghĩ của bạn gần đây?',
    'Điều gì làm bạn thực sự mất ngủ vì hứng khởi — không phải vì lo lắng?',
    'Nếu được làm lại 1 quyết định trong 5 năm qua, bạn sẽ chọn gì và tại sao?',
  ],

  'ENFP+INTP': [
    'Khái niệm hoặc hệ thống nào bạn đang tìm hiểu mà cảm thấy có thể giải thích nhiều thứ?',
    'Điều gì bạn biết về một lĩnh vực mà ít người xung quanh biết?',
    'Khi nào bạn cảm thấy "mình đang nghĩ về điều gì đó theo cách hoàn toàn mới"?',
  ],

  'ENFP+ISFJ': [
    'Điều gì bạn muốn giữ lại từ quá khứ mà bạn sợ sẽ bị quên đi?',
    'Khi bạn quan tâm đến ai, điều gì bạn thường làm mà họ có thể không để ý?',
    'Điều gì trong cuộc sống hàng ngày đang tạo ra ý nghĩa nhỏ cho bạn?',
  ],

  'ENFP+ISFP': [
    'Điều gì đang truyền cảm hứng bạn mà bạn chưa biết phải làm gì với nó?',
    'Khi nào bạn cảm thấy "mình đang thực sự là mình nhất"?',
    'Có gì bạn đang tạo ra hoặc thể hiện dù không ai biết không?',
  ],

  'ENFP+ISTJ': [
    'Điều gì bạn đã cam kết với bản thân và giữ được mà bạn tự hào?',
    'Khi gặp điều mới, bạn thường cảm thấy hào hứng hay cẩn thận trước?',
    'Điều gì bạn nghĩ quan trọng mà thế hệ trẻ đang bỏ qua?',
  ],

  'ENFP+ISTP': [
    'Khi bạn cần giải quyết vấn đề khó, bạn thường tin tưởng điều gì nhất — bản năng hay phân tích?',
    'Điều gì bạn học được từ làm thực tế mà không sách nào dạy?',
    'Bạn thường biết mình đã hiểu điều gì đó khi có cảm giác như thế nào?',
  ],

  'ENTJ+ENTJ': [
    'Điều gì bạn đang xây dựng mà cần người tin vào trước khi thấy kết quả?',
    'Quyết định nào trong cuộc đời bạn muốn đã đưa ra sớm hơn?',
    'Điều gì bạn đã phải bỏ đi những điều đã học sai để trở thành phiên bản tốt hơn của mình?',
  ],

  'ENTJ+ENTP': [
    'Ý tưởng nào đang tranh luận với nhau trong đầu bạn mà chưa ra được người thắng?',
    'Điều gì bạn thấy rõ mà ít người xung quanh đang chú ý?',
    'Khi nào bạn thấy "đây là cuộc trò chuyện đang đi đến chỗ thực sự thú vị"?',
  ],

  'ENTJ+ESFJ': [
    'Điều gì bạn muốn tạo ra cho người xung quanh mà không phải chỉ cho bản thân?',
    'Khi có trách nhiệm với người khác, điều gì bạn luôn muốn giữ vững?',
    'Điều gì bạn đã học được về lãnh đạo từ người không ở vị trí cao?',
  ],

  'ENTJ+ESFP': [
    'Điều gì bạn đang muốn trải nghiệm mà chưa có cơ hội?',
    'Khoảnh khắc nào bạn nghĩ "cần phải thích cái này hơn là phân tích nó"?',
    'Điều gì bạn làm cho bản thân mà không phải vì năng suất?',
  ],

  'ENTJ+ESTJ': [
    'Điều gì bạn đã xây dựng được mà bạn nghĩ sẽ tồn tại lâu dài?',
    'Khi có xung đột về cách làm đúng, bạn thường giải quyết như thế nào?',
    'Điều gì bạn đã thay đổi trong tiếp cận của mình sau một thất bại?',
  ],

  'ENTJ+ESTP': [
    'Điều gì bạn quyết định ngay và sau đó biết mình đã đúng?',
    'Khoảnh khắc nào trong cuộc sống bạn cảm thấy "mình đang đúng chỗ"?',
    'Điều gì bạn thường để ý về một cơ hội mà người khác bỏ qua?',
  ],

  'ENTJ+INFJ': [
    'Tầm nhìn nào bạn đang ấp ủ mà chưa nhiều người biết?',
    'Điều gì bạn cảm nhận về tương lai mà bạn muốn người khác hiểu hơn?',
    'Khi nào bạn cảm thấy "mình đang đi đúng hướng" dù người khác nghi ngờ?',
  ],

  'ENTJ+INFP': [
    'Điều gì bạn muốn tạo ra không phải vì nó sinh lời mà vì nó có ý nghĩa?',
    'Giá trị nào bạn không thể đánh đổi dù hoàn cảnh thay đổi?',
    'Điều gì đang truyền cảm hứng bạn theo cách khó giải thích?',
  ],

  'ENTJ+INTJ': [
    'Chiến lược nào bạn đang áp dụng cho cuộc sống mà không phải chỉ cho công việc?',
    'Điều gì bạn đã phải hy sinh để đạt được điều bạn muốn nhất?',
    'Khi nhìn lại 5 năm qua, điều gì bạn thấy mình đã làm đúng mà không phải may mắn?',
  ],

  'ENTJ+INTP': [
    'Khung hoặc mô hình nào bạn dùng để hiểu rõ các tình huống phức tạp?',
    'Điều gì bạn muốn hiểu sâu hơn mà cảm thấy chưa có đủ dữ liệu?',
    'Khi nào bạn thấy "cái này cần được suy nghĩ kỹ hơn trước khi hành động"?',
  ],

  'ENTJ+ISFJ': [
    'Điều gì bạn đã cam kết và theo đuổi dù không dễ dàng?',
    'Khi có trách nhiệm lớn, bạn thường tìm hỗ trợ từ đâu?',
    'Điều gì bạn muốn được nhớ đến vì nó khi nhìn lại?',
  ],

  'ENTJ+ISFP': [
    'Điều gì bạn tạo ra hoặc đang tạo ra mà chỉ bạn mới quan tâm đủ sâu?',
    'Khi nào bạn cảm thấy "mình đang chân thật nhất"?',
    'Điều gì trong cuộc sống bạn muốn trải nghiệm chậm hơn?',
  ],

  'ENTJ+ISTJ': [
    'Điều gì bạn đã chứng minh không phải bằng lời mà bằng kết quả?',
    'Khi gặp cách làm không hiệu quả, bạn thường tiếp cận như thế nào?',
    'Điều gì bạn đã thay đổi sau khi nhận ra mình đã sai?',
  ],

  'ENTJ+ISTP': [
    'Khi có vấn đề thực tế phức tạp, bạn thường đến giải pháp bằng con đường nào?',
    'Điều gì bạn thường tìm ra bằng cách làm thay vì lên kế hoạch?',
    'Bạn thường biết ai đó giỏi thật sự hay giỏi trên giấy từ đâu?',
  ],

  'ENTP+ENTP': [
    'Có ý tưởng nào đang tranh luận với chính nó trong đầu bạn không?',
    'Điều gì bạn đã tranh luận đủ lâu để đổi phe và thấy mình đúng hơn?',
    'Khi nào bạn thấy "cuộc trò chuyện này đang đi đến chỗ không ai biết trước"?',
  ],

  'ENTP+ESFJ': [
    'Điều gì bạn để ý về cách người ta tương tác với nhau mà bạn muốn thay đổi?',
    'Khi nào bạn cảm thấy "mình nên lắng nghe thêm thay vì nói"?',
    'Điều gì bạn quan tâm sâu sắc mà cần nhiều thời gian để thuyết phục người khác hiểu?',
  ],

  'ENTP+ESFP': [
    'Trải nghiệm nào gần đây khiến bạn nhìn điều quen thuộc theo góc mới?',
    'Điều gì bạn làm ngay mà không cần nhiều lên kế hoạch?',
    'Khi gặp người mới, bạn thường tò mò về điều gì nhất?',
  ],

  'ENTP+ESTJ': [
    'Điều gì bạn thấy không hiệu quả nhưng mọi người vẫn đang làm — và sẽ thay thế bằng gì?',
    'Khi có vấn đề cần giải quyết ngay, bạn thường tin quy trình hay tin bản năng?',
    'Điều gì bạn đã tranh luận mạnh mẽ và sau đó thấy mình sai — và học được gì?',
  ],

  'ENTP+ESTP': [
    'Cơ hội nào bạn nhận ra ngay và hành động — kết quả thế nào?',
    'Điều gì bạn thích khám phá trong lý thuyết và điều gì bạn thích khám phá bằng hành động?',
    'Khi nào bạn biết mình đã có đủ thông tin để hành động?',
  ],

  'ENTP+INFJ': [
    'Điều gì bạn tin là đúng mà hầu hết người xung quanh không đồng ý?',
    'Có lý thuyết hoặc ý tưởng nào bạn đang khám phá mà chưa chia sẻ với ai?',
    'Bạn thường thấy mình nghĩ khác người trong tình huống nào nhất?',
  ],

  'ENTP+INFP': [
    'Điều gì bạn quan tâm sâu sắc nhất mà đôi khi khó giải thích cho người không quan tâm?',
    'Ý tưởng nào đang thay đổi cách bạn nhìn về điều mình đã biết?',
    'Khi nào bạn cảm thấy "có người thực sự hiểu góc nhìn của mình"?',
  ],

  'ENTP+INTJ': [
    'Ý tưởng nào bạn muốn thử mà chưa có đủ điều kiện?',
    'Điều gì bạn biết cần làm khác đi nhưng chưa thực hiện?',
    'Khi nhìn 10 năm tới, điều gì bạn thấy rõ mà người khác đang bỏ qua?',
  ],

  'ENTP+INTP': [
    'Hệ thống hoặc mẫu nào bạn thấy trong cuộc sống mà ít người để ý?',
    'Điều gì bạn đang lập bản đồ ra trong đầu để hiểu rõ thế giới?',
    'Khi nào bạn thấy "cái nhìn này là hoàn chỉnh đủ để làm việc với"?',
  ],

  'ENTP+ISFJ': [
    'Truyền thống hoặc cách làm nào bạn thực sự tin vào dù không phải hợp thời?',
    'Điều gì bạn quan tâm sâu sắc mà không cần nó phải ấn tượng với người khác?',
    'Khi nào bạn cảm thấy "mình đang đóng góp thực sự"?',
  ],

  'ENTP+ISFP': [
    'Điều gì bạn tạo hoặc thể hiện mà chỉ mình bạn mới thực sự hiểu ý nghĩa của nó?',
    'Khi nào bạn cảm thấy "mình đang đúng với giá trị của mình nhất"?',
    'Điều gì đang đẹp trong cuộc sống của bạn mà bạn chưa chia sẻ với ai?',
  ],

  'ENTP+ISTJ': [
    'Điều gì bạn đã chứng minh bằng kết quả thực tế thay vì bằng tranh luận?',
    'Khi nào bạn thấy "cái này đã hiệu quả — không cần thay đổi nữa"?',
    'Điều gì trong quá khứ bạn muốn giữ gìn vì nó thực sự có giá trị?',
  ],

  'ENTP+ISTP': [
    'Khi có vấn đề kỹ thuật hoặc thực tế, bạn thường tìm giải pháp bằng cách nào?',
    'Điều gì bạn tìm ra bằng thử nghiệm mà không phải từ lý thuyết?',
    'Khi nào bạn biết mình đã hiểu đủ để hành động?',
  ],

  'ESFJ+ESFJ': [
    'Điều gì bạn làm cho người khác mà bạn cảm thấy đó là sứ mệnh của mình?',
    'Khoảnh khắc nào bạn cảm thấy cộng đồng mình đang là một phần có ý nghĩa nhất?',
    'Điều gì bạn muốn những người thân yêu nhớ về bạn?',
  ],

  'ESFJ+ESFP': [
    'Khoảnh khắc nào trong tuần này làm bạn thực sự cười hoặc thấy vui?',
    'Điều gì bạn thường làm tự phát mà sau đó thấy đó là quyết định đúng?',
    'Khi ở cùng bạn bè, điều gì bạn thường muốn tạo ra — trải nghiệm hay kỷ niệm?',
  ],

  'ESFJ+ESTJ': [
    'Điều gì bạn đã cam kết và theo đuổi đến cùng mà bạn cảm thấy tự hào nhất?',
    'Khi có xung đột trong nhóm, bạn thường muốn giải quyết theo hướng nào?',
    'Điều gì bạn muốn xây dựng để người xung quanh lợi ích lâu dài?',
  ],

  'ESFJ+ESTP': [
    'Điều gì bạn làm ngay khi cơ hội xuất hiện?',
    'Khoảnh khắc nào gần đây bạn cảm thấy "mình đang thực sự sống"?',
    'Điều gì bạn thường để ý về người mới gặp đầu tiên?',
  ],

  'ESFJ+INFJ': [
    'Điều gì bạn làm cho người khác mà bạn không cần được cảm ơn?',
    'Khi bạn cảm nhận được ai đó đang khó khăn, bạn thường muốn làm gì đầu tiên?',
    'Điều gì bạn tin sâu sắc về cách con người nên quan tâm cho nhau?',
  ],

  'ESFJ+INFP': [
    'Điều gì bạn làm không vì kỳ vọng của người khác mà vì nó cảm thấy đúng?',
    'Khi bạn quan tâm sâu sắc đến ai, điều gì bạn thường muốn thể hiện?',
    'Có câu chuyện hoặc nhân vật nào bạn thấy một phần của mình trong đó không?',
  ],

  'ESFJ+INTJ': [
    'Khi bạn quan tâm đến ai, điều gì bạn thường làm cụ thể để thể hiện điều đó?',
    'Điều gì bạn biết về người mà bạn thường không nói thành lời nhưng hành động theo?',
    'Điều gì bạn muốn thế giới hiểu hơn về cách con người đối xử nhau?',
  ],

  'ESFJ+INTP': [
    'Điều gì bạn đang tò mò về mà bạn chưa có đủ câu trả lời?',
    'Khi bạn muốn giúp ai đó, bạn thường tiếp cận theo hướng nào?',
    'Điều gì bạn làm đơn giản vì nó thú vị dù không ai biết?',
  ],

  'ESFJ+ISFJ': [
    'Điều gì bạn muốn tạo cho những người bạn yêu mà không cần được ghi nhận?',
    'Khoảnh khắc nào bạn cảm thấy "đây là lý do mình làm điều mình làm"?',
    'Điều gì bạn muốn giữ lại từ cách người xưa sống?',
  ],

  'ESFJ+ISFP': [
    'Điều gì đang đẹp trong cuộc sống hàng ngày của bạn mà bạn trân trọng?',
    'Khi bạn quan tâm đến ai, bạn thường thể hiện theo cách nào?',
    'Điều gì bạn làm vì nó cảm thấy đúng dù không ai yêu cầu?',
  ],

  'ESFJ+ISTJ': [
    'Điều gì bạn đã giữ lời hứa dù rất khó?',
    'Truyền thống hoặc thói quen nào bạn muốn truyền đi cho thế hệ sau?',
    'Điều gì trong cuộc sống bạn muốn ổn định và không thay đổi?',
  ],

  'ESFJ+ISTP': [
    'Điều gì bạn thường làm được tốt mà không cần nhiều lời?',
    'Khi có vấn đề thực tế, bạn thường tìm giải pháp thế nào?',
    'Điều gì bạn tôn trọng ở người khác mà không liên quan đến kỹ năng giao tiếp?',
  ],

  'ESFP+ESFP': [
    'Điều gì đang phấn khích bạn ngay lúc này mà bạn muốn chia sẻ?',
    'Khoảnh khắc gần đây nào làm bạn cười thực sự?',
    'Điều gì bạn làm tự phát mà sau đó thấy đó là điểm nhấn của ngày?',
  ],

  'ESFP+ESTJ': [
    'Điều gì bạn làm được tốt mà bạn biết nó có kết quả cụ thể?',
    'Khi có mục tiêu, bạn thường thích lên kế hoạch nó hay tìm ra trong lúc làm?',
    'Điều gì bạn đã trải qua mà sau này nhìn lại thấy nó khiến bạn mạnh mẽ hơn?',
  ],

  'ESFP+ESTP': [
    'Điều gì bạn thường lao vào ngay mà không suy nghĩ quá nhiều?',
    'Khoảnh khắc nào bạn cảm thấy "mình đang trong trạng thái tập trung cao"?',
    'Điều gì bạn thích khám phá bằng cách thực sự trải nghiệm?',
  ],

  'ESFP+INFJ': [
    'Điều gì bạn trải nghiệm hôm nay mà bạn muốn dừng lại và thực sự trân trọng?',
    'Khi nào bạn cảm thấy "khoảnh khắc này cần được nhớ"?',
    'Điều gì đang mang lại niềm vui thuần túy trong cuộc sống của bạn?',
  ],

  'ESFP+INFP': [
    'Điều gì bạn thể hiện về bản thân qua những gì bạn làm hoặc tạo?',
    'Khi nào bạn cảm thấy "mình đang thực sự là mình"?',
    'Điều gì đang truyền cảm hứng bạn theo cách mà bạn khó giải thích?',
  ],

  'ESFP+INTJ': [
    'Khi bạn làm điều gì đó ngay mà không lên kế hoạch, điều gì thúc đẩy bạn?',
    'Điều gì bạn thích nhất về cuộc sống mà không liên quan đến lên kế hoạch tương lai?',
    'Khoảnh khắc nào bạn cảm thấy "cứ thích đi, không cần phân tích"?',
  ],

  'ESFP+INTP': [
    'Điều gì bạn học được bằng cách trải nghiệm mà không phải bằng cách đọc?',
    'Khi bạn tìm hiểu điều mới, bạn thích thực hành hay nghiên cứu?',
    'Điều gì thú vị về cuộc sống mà bạn muốn khám phá thêm?',
  ],

  'ESFP+ISFJ': [
    'Điều gì bạn làm cho người khác mà bạn cảm thấy đó là tự nhiên nhất với mình?',
    'Khi có người cần hỗ trợ, bạn thường muốn giúp theo cách nào?',
    'Điều gì trong cuộc sống hàng ngày đang tạo ra ý nghĩa cho bạn?',
  ],

  'ESFP+ISFP': [
    'Điều gì đang mang lại niềm vui thuần túy trong cuộc sống của bạn ngay lúc này?',
    'Khi bạn muốn thể hiện điều gì đó, bạn thường làm theo cách nào?',
    'Điều gì bạn trân trọng về cuộc sống mà không cần ai công nhận?',
  ],

  'ESFP+ISTJ': [
    'Điều gì bạn đã giữ được dù nhiều người xung quanh thay đổi?',
    'Khi nào bạn cảm thấy "cái này quan trọng và mình muốn nhớ"?',
    'Điều gì bạn tôn trọng ở người đã xây dựng được thứ gì đó bền vững?',
  ],

  'ESFP+ISTP': [
    'Điều gì bạn làm được tốt mà không cần nhiều lời để giải thích?',
    'Khi có hoạt động vui, bạn thường thích làm cùng người khác hay một mình?',
    'Điều gì bạn thích về việc làm điều gì đó với tay hoặc cơ thể?',
  ],

  'ESTJ+ESTJ': [
    'Điều gì bạn đã xây dựng được mà bạn biết là bền vững?',
    'Khi có bất đồng về cách làm đúng, bạn thường tiếp cận thế nào?',
    'Điều gì bạn muốn chứng minh qua hành động thay vì lời nói?',
  ],

  'ESTJ+ESTP': [
    'Khi có cơ hội, bạn thường hành động ngay hay đánh giá trước?',
    'Điều gì bạn quyết định nhanh và biết mình đúng?',
    'Điều gì bạn tôn trọng ở người có thể thực hiện tốt dưới áp lực?',
  ],

  'ESTJ+INFJ': [
    'Điều gì bạn đã cam kết với và không bao giờ đặt câu hỏi?',
    'Khi bạn thấy người cần giúp, điều gì bạn thường làm cụ thể?',
    'Điều gì bạn muốn được nhớ đến khi nhìn lại cuộc đời mình?',
  ],

  'ESTJ+INFP': [
    'Điều gì bạn quan tâm sâu sắc mà không phải ai cũng hiểu ngay?',
    'Khi nào bạn cảm thấy công việc bạn đang làm có ý nghĩa thực sự?',
    'Điều gì bạn muốn tạo ra mà tồn tại lâu hơn bạn?',
  ],

  'ESTJ+INTJ': [
    'Điều gì bạn đang tối ưu trong cuộc sống mà không phải chỉ trong công việc?',
    'Khi nhìn 5 năm tới, điều gì bạn muốn đã được hoàn thành?',
    'Quyết định nào khó nhất bạn đã đưa ra và bạn đã tiếp cận như thế nào?',
  ],

  'ESTJ+INTP': [
    'Điều gì bạn muốn có khung tốt hơn để đưa ra quyết định tốt hơn?',
    'Khi có vấn đề phức tạp, bạn thường tin phân tích hay tin kinh nghiệm?',
    'Điều gì bạn đang đang cố to tìm ra mà chưa có đủ dữ liệu?',
  ],

  'ESTJ+ISFJ': [
    'Điều gì bạn đã giữ lời hứa dù rất khó và bạn tự hào về điều đó?',
    'Khi bạn quan tâm đến cộng đồng, điều gì bạn thường muốn đóng góp?',
    'Truyền thống hoặc cách làm nào bạn muốn truyền lại?',
  ],

  'ESTJ+ISFP': [
    'Điều gì bạn tạo ra hoặc thể hiện dù không ai yêu cầu?',
    'Khi nào bạn cảm thấy "đây là lúc mình cần dừng và trân trọng"?',
    'Điều gì trong cuộc sống đang đẹp theo cách riêng của nó?',
  ],

  'ESTJ+ISTJ': [
    'Điều gì bạn đã chứng minh qua hành động nhất quán thay vì thuyết phục mọi người?',
    'Khi có cách làm mới so với phương pháp đã chứng minh, bạn thường quyết định thế nào?',
    'Điều gì bạn muốn xây dựng để tồn tại lâu hơn bạn?',
  ],

  'ESTJ+ISTP': [
    'Khi có vấn đề thực tế, bạn thường tiếp cận từ hệ thống hay từ thực hành?',
    'Điều gì bạn tôn trọng ở người có thể tìm ra cách giải quyết mà không cần nhiều nguồn lực?',
    'Khi nào bạn biết cách làm nào là đúng một cách rõ ràng?',
  ],

  'ESTP+ESTP': [
    'Điều gì bạn hành động on ngay khi thấy cơ hội mà không cần suy nghĩ quá nhiều?',
    'Khoảnh khắc nào gần đây bạn cảm thấy "mình đang sống động nhất"?',
    'Điều gì bạn thường để ý ngay về môi trường hoặc người xung quanh?',
  ],

  'ESTP+INFJ': [
    'Điều gì về cuộc sống thực tế đang thú vị với bạn ngay lúc này?',
    'Khi bạn phải hành động ngay, điều gì bạn dựa vào nhất?',
    'Điều gì bạn đã học từ trải nghiệm mà không phải từ suy ngẫm?',
  ],

  'ESTP+INFP': [
    'Điều gì bạn trải nghiệm mà sau đó khiến bạn cảm nhận sâu sắc về điều gì đó?',
    'Khi bạn đưa ra quyết định nhanh, điều gì bạn tin tưởng?',
    'Điều gì trong cuộc sống đang quan trọng với bạn theo cách bạn không mong đợi?',
  ],

  'ESTP+INTJ': [
    'Khi bạn cần hành động ngay, điều gì hướng dẫn bạn nhất?',
    'Điều gì bạn đã chứng minh bằng hành động mà không cần nhiều lên kế hoạch?',
    'Khi cơ hội xuất hiện, bạn thường để ý điều gì đầu tiên?',
  ],

  'ESTP+INTP': [
    'Điều gì bạn thích tìm ra bằng cách thử trực tiếp hơn là phân tích?',
    'Khi có vấn đề, bạn thường tin bản năng hay tin dữ liệu?',
    'Điều gì bạn đã học nhanh nhất khi đang làm dở?',
  ],

  'ESTP+ISFJ': [
    'Điều gì bạn làm ngay để giúp khi có người cần?',
    'Khi nào bạn cảm thấy "mình đã đóng góp điều gì thực sự"?',
    'Điều gì bạn quan tâm đến mà không cần nó kịch tính hay hoành tráng?',
  ],

  'ESTP+ISFP': [
    'Điều gì bạn làm ngay lập tức khi có cơ hội?',
    'Khi nào bạn cảm thấy "đây là lúc mình cần cứ tận hưởng"?',
    'Điều gì bạn thể hiện hoặc tạo theo cách riêng của mình?',
  ],

  'ESTP+ISTJ': [
    'Điều gì bạn đã làm đúng bằng hành động trước và phân tích sau?',
    'Khi có phương pháp đã chứng minh so với mới tiếp cận, bạn thường nghiêng về nào?',
    'Điều gì bạn đã nhất quán về dù không phải lúc nào cũng dễ?',
  ],

  'ESTP+ISTP': [
    'Điều gì bạn xử lý tốt nhất khi mọi thứ trở nên thực tế và nhanh?',
    'Khi có vấn đề, bạn thường tin tưởng thực hành hay tin tưởng suy nghĩ?',
    'Điều gì bạn thích về lao vào giữa việc đang làm?',
  ],

  'INFJ+INFJ': [
    'Điều gì bạn cảm nhận về thế giới mà bạn không biết ai để nói?',
    'Khi nào bạn cảm thấy "đây là cuộc trò chuyện mà mình đã tìm kiếm"?',
    'Điều gì bạn tin sâu sắc sắc mà không thay đổi dù qua nhiều năm?',
  ],

  'INFJ+INFP': [
    'Điều gì bạn biết về bản thân mà người khác hiếm khi hiểu ngay?',
    'Khi nào bạn cảm thấy "đây là cuộc sống mình muốn sống"?',
    'Điều gì bạn muốn đóng góp cho thế giới theo cách chỉ bạn mới có thể?',
  ],

  'INFJ+INTJ': [
    'Điều gì bạn tin là đúng mà ít người xung quanh đang chú ý?',
    'Có lý thuyết hoặc ý tưởng nào bạn đang khám phá mà chưa chia sẻ với ai?',
    'Bạn thường thấy mình nghĩ khác người trong tình huống nào nhất?',
  ],

  'INFJ+INTP': [
    'Có ý tưởng hoặc khung nào bạn đang khám phá mà bạn chưa biết nó sẽ dẫn đến đến đâu?',
    'Điều gì bạn hiểu về con người mà bạn không biết cách diễn đạt thành lời?',
    'Khi nào bạn cảm thấy "cái nhìn này thay đổi cách mình thấy mọi thứ"?',
  ],

  'INFJ+ISFJ': [
    'Điều gì bạn quan tâm sâu sắc đến người khác mà bạn không cần nói thành lời để hành động theo?',
    'Khi nào bạn cảm thấy "mình đang đóng góp đúng cách"?',
    'Điều gì bạn muốn giữ gìn và nuôi dưỡng trong thế giới đang thay đổi?',
  ],

  'INFJ+ISFP': [
    'Điều gì bạn cảm nhận sâu mà khó diễn đạt thành lời?',
    'Khi nào bạn cảm thấy "mình đang thể hiện bản thân đúng nhất"?',
    'Điều gì đang đẹp trong cuộc sống của bạn mà bạn trân trọng?',
  ],

  'INFJ+ISTJ': [
    'Điều gì bạn cam kết với không phải vì thuận tiện mà vì nó đúng?',
    'Khi nào bạn cảm thấy "mình đang đúng với giá trị của mình nhất"?',
    'Điều gì bạn muốn đáng tin và không thay đổi trong cuộc sống?',
  ],

  'INFJ+ISTP': [
    'Điều gì bạn quan sát mà bạn không nói thành lời nhưng biết là quan trọng?',
    'Khi bạn có hiểu biết về ai đó, bạn thường làm gì với nó?',
    'Điều gì bạn hiểu về con người mà khó giải thích theo lý luận đơn thuần?',
  ],

  'INFP+INFP': [
    'Điều gì bạn giữ trong thế giới bên trong mà ít người biết về?',
    'Khi nào bạn cảm thấy "mình đang được thấy thực sự"?',
    'Điều gì đang quan trọng nhất với bạn mà không cần giải thích với ai?',
  ],

  'INFP+INTJ': [
    'Điều gì bạn tin sâu sắc mà không cần bằng chứng để giữ vững?',
    'Khi bạn tìm hiểu điều gì, bạn thường bắt đầu từ đâu?',
    'Điều gì bạn muốn thay đổi trong thế giới theo cách chỉ bạn thấy rõ?',
  ],

  'INFP+INTP': [
    'Điều gì bạn quan tâm sâu sắc mà không phải ai cũng hiểu tại sao?',
    'Có ý tưởng hoặc câu chuyện nào đang sống trong đầu bạn mà chưa được thể hiện?',
    'Khi nào bạn cảm thấy "cuộc trò chuyện này thật sự chân thật"?',
  ],

  'INFP+ISFJ': [
    'Điều gì bạn làm cho người khác không phải vì nghĩa vụ mà vì quan tâm thật sự?',
    'Khi nào bạn cảm thấy "mình đang đúng chỗ, đúng lúc"?',
    'Điều gì bạn muốn người quan trọng với mình biết về bạn?',
  ],

  'INFP+ISFP': [
    'Điều gì bạn thể hiện không phải bằng lời mà bằng cách bạn sống?',
    'Khi nào bạn cảm thấy "đây là mình, không phải biểu diễn"?',
    'Điều gì đang đẹp theo cách riêng của nó trong cuộc sống bạn?',
  ],

  'INFP+ISTJ': [
    'Điều gì bạn đã nhất quán về dù không phải lúc nào cũng dễ?',
    'Khi bạn quan tâm đến điều gì, điều gì thể hiện đó thay vì chỉ nói?',
    'Điều gì bạn tôn trọng ở người đã giữ được điều gì đó quan trọng qua thời gian?',
  ],

  'INFP+ISTP': [
    'Điều gì bạn biết một cách thầm lặng mà không cần nói to thể hiện?',
    'Khi có vấn đề, bạn thường tin cảm nhận hay tin phân tích?',
    'Điều gì bạn làm khi muốn thể hiện điều gì sâu nhưng không tìm được lời?',
  ],

  'INTJ+INTJ': [
    'Điều gì bạn đang xây dựng trong dài hạn mà ít người biết về?',
    'Khi nào bạn cảm thấy "mình đang đúng hướng đi"?',
    'Điều gì bạn muốn hiểu sâu hơn mà chưa có đủ câu trả lời?',
  ],

  'INTJ+INTP': [
    'Khung nào bạn đang dùng để hiểu thế giới tốt hơn?',
    'Điều gì bạn đang xây dựng hoặc phát triển trong suy nghĩ mà chưa chia sẻ với nhiều người?',
    'Khi nào bạn cảm thấy "cái này cần được suy nghĩ kỹ hơn"?',
  ],

  'INTJ+ISFJ': [
    'Điều gì bạn đã cam kết với mà không thay đổi dù hoàn cảnh thay đổi?',
    'Khi bạn quan tâm đến ai, điều gì bạn thường làm mà không nói?',
    'Điều gì bạn muốn đáng tin trong cuộc sống?',
  ],

  'INTJ+ISFP': [
    'Điều gì đang đẹp theo cách riêng của nó mà bạn trân trọng?',
    'Khi nào bạn cảm thấy "đây là khoảnh khắc cần được chậm lại"?',
    'Điều gì bạn tạo không phải vì nó hiệu quả mà vì nó có ý nghĩa?',
  ],

  'INTJ+ISTJ': [
    'Điều gì bạn đã chứng minh qua hành động nhất quán?',
    'Khi có quyết định khó, bạn thường cân nhắc các yếu tố như thế nào?',
    'Điều gì bạn muốn được biết đến vì theo cách không cần thông báo?',
  ],

  'INTJ+ISTP': [
    'Khi có vấn đề, bạn thường tiếp cận từ hệ thống hay từ cơ chế?',
    'Điều gì bạn đã tìm ra bằng cách làm mà không phải lên kế hoạch?',
    'Khi nào bạn biết mình đã hiểu đủ để hành động?',
  ],

  'INTP+INTP': [
    'Khung hoặc lý thuyết nào bạn đang phát triển để hiểu rõ thế giới?',
    'Điều gì bạn đang khám phá mà chưa biết nó sẽ dẫn đến đến đâu?',
    'Khi nào bạn cảm thấy "cái nhìn này là mới"?',
  ],

  'INTP+ISFJ': [
    'Điều gì bạn quan tâm đến mà không cần lý giải vì sao?',
    'Khi bạn giúp ai, điều gì bạn thường làm theo cách riêng?',
    'Điều gì trong cuộc sống bạn muốn ổn định?',
  ],

  'INTP+ISFP': [
    'Điều gì bạn biết thầm lặng mà không cần thể hiện to?',
    'Khi bạn trân trọng điều gì, bạn thường để ý điều gì đầu tiên?',
    'Điều gì bạn tìm trong trải nghiệm thực tế mà không phải trong lý thuyết?',
  ],

  'INTP+ISTJ': [
    'Điều gì bạn đã chứng minh đáng tin qua thời gian?',
    'Khi có phương pháp mới so với cách đã chứng minh, bạn thường tiếp cận thế nào?',
    'Điều gì bạn muốn hiểu sâu sắc mà không phải là hợp thời?',
  ],

  'INTP+ISTP': [
    'Điều gì bạn tìm ra bằng cách thực hành mà không phải lý thuyết thuần túy?',
    'Khi có vấn đề, bạn thường thích phân tích hay thử nghiệm?',
    'Điều gì bạn biết sau khi đã làm việc qua cụ thể?',
  ],

  'ISFJ+ISFJ': [
    'Điều gì bạn làm cho người khác mà bạn biết là quan tâm nhưng không cần khoe?',
    'Khoảnh khắc nào trong cuộc sống thường ngày đang tạo ra ấm áp cho bạn?',
    'Điều gì bạn muốn giữ gìn và truyền lại?',
  ],

  'ISFJ+ISFP': [
    'Điều gì bạn trân trọng theo cách thầm lặng mà không cần công nhận?',
    'Khi bạn quan tâm, điều gì bạn thường làm thay vì nói?',
    'Điều gì đang có ý nghĩa trong cuộc sống hàng ngày của bạn?',
  ],

  'ISFJ+ISTJ': [
    'Điều gì bạn đã cam kết và không lung lay?',
    'Khi bạn quan tâm đến ai, điều gì bạn thường làm cụ thể?',
    'Điều gì bạn muốn đáng tin và có thể dự đoán trong cuộc sống?',
  ],

  'ISFJ+ISTP': [
    'Điều gì bạn làm mà không cần nói nhiều khi cần chăm sóc điều gì đó?',
    'Khi bạn giúp ai, bạn thường thích làm việc thực tế hay hỗ trợ cảm xúc?',
    'Điều gì bạn tin tưởng về cách mọi thứ công việc?',
  ],

  'ISFP+ISFP': [
    'Điều gì bạn thể hiện về bản thân mà không phải qua lời?',
    'Khi nào bạn cảm thấy "mình đang đúng với bản thân nhất"?',
    'Điều gì đang đẹp trong cuộc sống của bạn mà bạn trân trọng thầm lặng?',
  ],

  'ISFP+ISTJ': [
    'Điều gì bạn làm không phải vì nghĩa vụ mà vì nó cảm thấy đúng?',
    'Khi bạn cam kết với điều gì, điều gì bạn tin tưởng về quyết định đó?',
    'Điều gì trong cuộc sống bạn muốn nhất quán về?',
  ],

  'ISFP+ISTP': [
    'Điều gì bạn xử lý thầm lặng mà không cần nhiều giải thích?',
    'Khi bạn làm đồ hoặc sửa đồ, bạn thường thích phần nào nhất?',
    'Điều gì bạn trân trọng về người có thể cứ là chính mình, không phải làm màu?',
  ],

  'ISTJ+ISTJ': [
    'Điều gì bạn đã chứng minh đáng tin về qua nhiều năm?',
    'Khi có thay đổi, điều gì bạn thường muốn giữ ổn định?',
    'Điều gì bạn đã xây dựng mà bạn muốn tồn tại lâu hơn bạn?',
  ],

  'ISTJ+ISTP': [
    'Điều gì bạn thích làm theo cách có hệ thống so với tìm ra trong lúc làm?',
    'Khi có vấn đề thực tế, bạn thường tiếp cận từ đâu?',
    'Điều gì bạn đã làm tốt nhất quán mà không cần sự chú ý?',
  ],

  'ISTP+ISTP': [
    'Điều gì bạn xử lý tốt nhất khi cần tìm ra trong thời gian thực?',
    'Khi bạn làm điều gì đó bằng tay, điều gì bạn thích nhất?',
    'Điều gì bạn biết bằng cách đã làm mà không phải bằng cách đọc?',
  ],
}

/**
 * Bridge questions — 20 câu dùng khi không biết type đối phương
 * Design: experience-anchored + recency + open-interpretation
 * S answer: chi tiết cụ thể · N answer: cảm xúc/ý nghĩa
 * Backing: bridge principle [P] + dating opener specificity [S]
 */
export const BRIDGE_QUESTIONS: string[] = [
  'Kể về một bữa ăn gần đây khiến bạn nhớ mãi — vì món ăn hay vì điều gì khác?',
  'Gần đây có nơi nào bạn đến mà muốn quay lại không — chỗ đó có gì?',
  'Bài hát nào dạo này bạn nghe đi nghe lại — và nó hợp với tâm trạng gì của bạn?',
  'Lần gần nhất bạn cười thật to là vì chuyện gì?',
  'Có thứ gì bạn mới học hoặc thử gần đây — dù nhỏ thôi — khiến bạn thấy thú vị?',
  'Cuối tuần lý tưởng của bạn dạo này trông như thế nào?',
  'Có món đồ nào bạn giữ lâu rồi mà không nỡ bỏ — vì sao?',
  'Gần đây có ai đó nói hoặc làm điều gì khiến bạn nhớ không?',
  'Một buổi tối bình thường của bạn thường kết thúc thế nào?',
  'Nơi nào khiến bạn cảm thấy thoải mái nhất để là chính mình?',
  'Có thói quen nhỏ nào trong ngày mà bạn thật sự trân trọng không?',
  'Lần gần đây bạn thay đổi suy nghĩ về một điều gì đó — chuyện gì vậy?',
  'Gần đây có quyết định nhỏ nào bạn vui vì đã chọn đúng không?',
  'Có điều gì bạn đang chờ đợi trong thời gian tới không — dù nhỏ?',
  'Lần gần nhất bạn làm điều gì đó lần đầu tiên là gì?',
  'Có nơi nào trong thành phố bạn hay lui tới một mình không — chỗ đó có gì?',
  'Gần đây bạn đọc, xem, hay nghe thứ gì khiến bạn nghĩ nhiều?',
  'Có thói quen nào bạn đang cố xây dựng hoặc bỏ gần đây không?',
  'Khoảnh khắc nào trong tuần vừa rồi khiến bạn thấy thoải mái nhất?',
  'Có điều gì bạn biết mình thích nhưng ít khi có dịp làm không?',
]

/**
 * Lấy N câu bridge random, không trùng với usedIndices trong session.
 * Dùng khi: không biết type đối phương, hoặc mix 1 bridge + 2 specific.
 */
export function getRandomBridgeQuestions(
  count: number = 2,
  usedIndices: Set<number> = new Set(),
): { questions: string[]; indices: number[] } {
  const available = BRIDGE_QUESTIONS.map((q, i) => ({ q, i })).filter(
    ({ i }) => !usedIndices.has(i),
  )

  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[available[i], available[j]] = [available[j], available[i]]
  }

  const selected = available.slice(0, count)
  return {
    questions: selected.map(({ q }) => q),
    indices: selected.map(({ i }) => i),
  }
}
