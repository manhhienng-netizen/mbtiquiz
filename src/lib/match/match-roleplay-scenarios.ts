export interface RelationshipScenario {
  id: 'rp1' | 'rp2' | 'rp3' | 'rp4' | 'rp5'
  title: string
  situation: string
  partnerPersona: string
  openingLine: string
  exitTriggers: string[]
  debrief: string
}

export const RELATIONSHIP_SCENARIOS: RelationshipScenario[] = [
  {
    id: 'rp1',
    title: 'Nói điều bothering mà không gây phòng thủ',
    situation:
      'Bạn cần nói với người thân về điều gì đó đang làm bạn khó chịu — lần đầu tiên đề cập.',
    partnerPersona: `Đóng vai người bạn thân/người yêu đang nghe lần đầu.
Phản ứng tự nhiên: hơi phòng thủ nhẹ nếu bị nói thẳng, mở hơn nếu được nói khéo.
Không dramatic, không attack back — chỉ phản ứng người thật khi bị surprise.`,
    openingLine: 'Ừ... bạn muốn nói chuyện gì vậy?',
    exitTriggers: [
      'thoát',
      'kết thúc',
      'xong rồi',
      'dừng lại',
      'stop roleplay',
      'thôi',
      'ra khỏi',
    ],
    debrief:
      'Lần này bạn mở đầu thế nào? Phần nào cảm thấy tự nhiên, phần nào còn gượng?',
  },
  {
    id: 'rp2',
    title: 'Hàn gắn sau khi cãi nhau',
    situation:
      'Hai người vừa có cuộc cãi vã. Bạn là người muốn hàn gắn và nhìn về phía trước.',
    partnerPersona: `Đóng vai người vừa qua conflict — còn hơi lạnh, chưa hoàn toàn ready.
Không slam door, nhưng cũng chưa warm lại ngay.
Mở dần nếu bạn tiếp cận đúng cách — không phán xét, không replay lỗi cũ.`,
    openingLine: '...Bạn muốn nói chuyện à?',
    exitTriggers: [
      'thoát',
      'kết thúc',
      'xong rồi',
      'dừng lại',
      'stop roleplay',
      'thôi',
      'ra khỏi',
    ],
    debrief:
      'Điều gì giúp cuộc trò chuyện ấm lại? Điều gì bạn muốn thử khác đi?',
  },
  {
    id: 'rp3',
    title: 'Đặt ranh giới mà không đẩy người đi',
    situation:
      'Bạn cần nói với người thân về một điều bạn cần — không gian, thời gian, hoặc giới hạn nào đó.',
    partnerPersona: `Đóng vai người thân đang lắng nghe.
Phản ứng tự nhiên: hơi ngạc nhiên, có thể hơi hurt nếu cảm thấy bị reject.
Không aggressive — chỉ cần reassurance rằng bạn vẫn care.`,
    openingLine: 'Sao bạn có vẻ muốn nói gì đó vậy?',
    exitTriggers: [
      'thoát',
      'kết thúc',
      'xong rồi',
      'dừng lại',
      'stop roleplay',
      'thôi',
      'ra khỏi',
    ],
    debrief:
      'Bạn nói ranh giới mà không làm người kia cảm thấy bị từ chối không? Phần nào cần điều chỉnh?',
  },
  {
    id: 'rp4',
    title: 'Nói về nhu cầu khác nhau',
    situation:
      'Hai người có kỳ vọng khác nhau về điều gì đó trong quan hệ. Bạn muốn nói thẳng mà không thành tranh luận.',
    partnerPersona: `Đóng vai người có kỳ vọng khác — không biết mình đang không khớp với bạn.
Khi nghe, có thể defensive nhẹ hoặc ngạc nhiên.
Mở ra nếu cảm thấy được tôn trọng, không bị blame.`,
    openingLine: 'Bạn muốn nói về chuyện gì vậy?',
    exitTriggers: [
      'thoát',
      'kết thúc',
      'xong rồi',
      'dừng lại',
      'stop roleplay',
      'thôi',
      'ra khỏi',
    ],
    debrief:
      'Hai người có hiểu nhau hơn không? Điều gì helped, điều gì làm defensive tăng lên?',
  },
  {
    id: 'rp5',
    title: 'Sau khi niềm tin bị tổn thương',
    situation:
      'Đã có điều gì đó làm niềm tin bị rạn nứt. Bạn muốn rebuild — thật sự, không chỉ xin lỗi qua loa.',
    partnerPersona: `Đóng vai người bị tổn thương — còn guarded, chưa tin ngay.
Không hostile, nhưng cần thấy sự thay đổi thật, không chỉ lời nói.
Mở dần nếu bạn consistent và không defensive.`,
    openingLine: 'Ừ... bạn muốn nói gì?',
    exitTriggers: [
      'thoát',
      'kết thúc',
      'xong rồi',
      'dừng lại',
      'stop roleplay',
      'thôi',
      'ra khỏi',
    ],
    debrief:
      'Trust không rebuild trong 1 cuộc trò chuyện — nhưng lần này bạn đặt nền móng tốt không?',
  },
]

export function getRelationshipScenario(
  id: string,
): RelationshipScenario | undefined {
  return RELATIONSHIP_SCENARIOS.find((s) => s.id === id)
}
