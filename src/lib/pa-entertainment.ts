// PA Giải trí: phim/sách/hobby cá nhân theo MBTI
// LOẠI TRỪ: teambuilding công sở (→ WA) · kế hoạch vui chơi gia đình (→ MA)
// Frame: "Phù hợp với type bạn" — KHÔNG claim "nghiên cứu chứng minh" ([P] data)
export {
  getEntertainmentGroup,
  getFilmsByGroup,
  getBooksByGroup,
  getExpandSuggestion,
  getDigitalByGroup,
  getEntertainmentDigital,
  getSupportDigital,
  type MbtiGroup,
  type EntFilm,
  type EntBook,
  type EntDigital,
  type EntGroupData,
} from '../data/pa-kb-entertainment'

import {
  getEntertainmentGroup,
  getFilmsByGroup,
  getBooksByGroup,
  getExpandSuggestion,
  getEntertainmentDigital,
  getSupportDigital,
  ENTERTAINMENT_LIBRARY,
} from '../data/pa-kb-entertainment'

export function getEntertainmentForType(mbtiType: string) {
  const group = getEntertainmentGroup(mbtiType)
  return {
    group,
    films: getFilmsByGroup(group),
    books: getBooksByGroup(group),
    music: ENTERTAINMENT_LIBRARY[group]?.music,
    podcasts: ENTERTAINMENT_LIBRARY[group]?.podcasts ?? [],
    digital: getEntertainmentDigital(group),
    supportDigital: getSupportDigital(group),
    expandSuggestion: getExpandSuggestion(group),
  }
}
