/**
 * PA KB — ENTERTAINMENT LIBRARY (đầy đủ)
 * Ngày: 18/06/2026 · Review: Master PM
 * Source: Datamine Gemini · 420+ items
 * Tag: [R] peer-reviewed · [P] practitioner consensus
 * 
 * FRAME trong app: "Phù hợp với type bạn" — KHÔNG "nghiên cứu chứng minh"
 * Data là [P] practitioner consensus · honest với user
 * 
 * NOTE: Ngày Mai trong NF digital → giờ đúng: 13h-20h30 · Thứ Tư đến Chủ Nhật
 */

// ─── TYPES ────────────────────────────────────────────────

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

export interface EntFilm {
  title: string
  year: number
  genre: string
  platform: string
  whyThisGroup: string
  mbtiSpecific: string[]
}

export interface EntBook {
  title: string
  author: string
  vnTitle: string
  available: boolean
  whyThisGroup: string
  readingStyle: string
}

export interface EntMusicGenre {
  genre: string
  mood: string
  examples: string[]
  whyThisGroup: string
}

export interface EntMusic {
  genres: EntMusicGenre[]
  internationalArtists: string[]
  vietnameseArtists: string[]
}

export interface EntPodcast {
  name: string
  host: string
  language: 'EN' | 'VI'
  topic: string
  episodeLength: string
  whyThisGroup: string
}

export interface EntDigital {
  name: string
  type: string
  platform: string
  whyThisGroup: string
  category?: 'entertainment' | 'support'
  hours?: string
  phone?: string
  note?: string
}

export interface EntGroupData {
  films: EntFilm[]
  books: EntBook[]
  music: EntMusic
  podcasts: EntPodcast[]
  digital: EntDigital[]
  expandSuggestions: string[]
}

// ─── ENTERTAINMENT LIBRARY ────────────────────────────────

export const ENTERTAINMENT_LIBRARY: Record<MbtiGroup, EntGroupData> = {
  NT: {
    films: [
      // 10 Phim Quốc Tế
      { title: "Arrival (Hành Trình Của Ngôn Ngữ)", year: 2016, genre: "Sci-fi / Linguistic thriller", platform: "Netflix VN", whyThisGroup: "[R] Cấu trúc phi tuyến tính và giả thuyết ngôn ngữ Sapir-Whorf kích thích khả năng phân tích hệ thống của NT.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "Oppenheimer", year: 2023, genre: "Biography / Historical drama", platform: "Netflix VN", whyThisGroup: "[P] Sự phức tạp trong thế giới nội tâm nhà vật lý lý thuyết và các quyết định chiến lược vĩ mô đồng điệu với NT.", mbtiSpecific: ["INTJ", "ENTJ"] },
      { title: "Inception (Kẻ Đánh Cắp Giấc Mơ)", year: 2010, genre: "Sci-fi / Action Thriller", platform: "Netflix VN", whyThisGroup: "[R] Hệ thống logic nhiều tầng của giấc mơ đòi hỏi tư duy phân tích sâu sắc để bóc tách cốt truyện.", mbtiSpecific: ["INTP", "INTJ"] },
      { title: "The Prestige (Ảo Thuật Gia Đấu Trí)", year: 2006, genre: "Mystery / Sci-fi", platform: "Netflix VN", whyThisGroup: "[P] Cuộc đấu trí chiến thuật giữa hai ảo thuật gia thỏa mãn nhu cầu tìm kiếm mô thức ẩn của NT.", mbtiSpecific: ["INTJ", "ENTP"] },
      { title: "Ex Machina", year: 2014, genre: "Sci-fi / Psychological Thriller", platform: "Netflix VN", whyThisGroup: "[R] Câu hỏi triết học về trí tuệ nhân tạo và bài kiểm tra Turing kích hoạt tư duy trừu tượng của NT.", mbtiSpecific: ["INTP", "INTJ"] },
      { title: "Interstellar (Hố Đen Tử Thần)", year: 2014, genre: "Sci-fi / Epic", platform: "Netflix VN", whyThisGroup: "[P] Vật lý thiên văn thực chứng và giả thuyết không-thời gian kích thích trí tò mò vô hạn của NT.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "The Matrix (Ma Trận)", year: 1999, genre: "Sci-fi / Action", platform: "Netflix VN", whyThisGroup: "[R] Bản chất thực tại giả lập và câu hỏi triết học hiện sinh kích hoạt tư duy phản biện cao độ.", mbtiSpecific: ["INTP", "ENTP"] },
      { title: "Moneyball (Trò Chơi Tiền Bạc)", year: 2011, genre: "Drama / Sport", platform: "Netflix VN", whyThisGroup: "[P] Dùng phân tích dữ liệu thống kê để thay đổi hệ thống truyền thống truyền cảm hứng cho ENTJ.", mbtiSpecific: ["ENTJ", "INTJ"] },
      { title: "Tenet", year: 2020, genre: "Sci-fi / Action", platform: "Netflix VN", whyThisGroup: "[R] Khái niệm nghịch đảo thời gian đòi hỏi khả năng lập bản đồ nhận thức phức tạp.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "The Social Network", year: 2010, genre: "Biography / Drama", platform: "Netflix VN", whyThisGroup: "[P] Xây dựng đế chế số từ dòng mã đầu tiên phản ánh khát vọng kiến tạo hệ thống của NT.", mbtiSpecific: ["ENTJ", "ENTP"] },
      // 5 Series
      { title: "Sherlock", year: 2010, genre: "Mystery / Crime Drama", platform: "Netflix VN", whyThisGroup: "[R] Phương pháp suy luận logic phi thường của Sherlock Holmes là hình mẫu lý tưởng của NT.", mbtiSpecific: ["INTP", "INTJ"] },
      { title: "Westworld", year: 2016, genre: "Sci-fi / Mystery", platform: "HBO GO", whyThisGroup: "[P] Vòng lặp lập trình, tự thức tỉnh của robot và mê cung ý thức kích thích tư duy giải mã của NT.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "Black Mirror", year: 2011, genre: "Sci-fi / Anthology", platform: "Netflix VN", whyThisGroup: "[R] Phân tích tác động tiêu cực của công nghệ lên cấu trúc xã hội tương lai thu hút bộ óc chiến lược.", mbtiSpecific: ["ENTP", "INTJ"] },
      { title: "Mindhunter", year: 2017, genre: "Crime Thriller / Psychological", platform: "Netflix VN", whyThisGroup: "[P] Hệ thống hoá tâm lý học tội phạm qua phỏng vấn khoa học kích hoạt tư duy lý tính.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "Dark", year: 2017, genre: "Sci-fi / Thriller Mystery", platform: "Netflix VN", whyThisGroup: "[R] Mạng lưới nhân vật qua nhiều mốc thời gian đòi hỏi tư duy logic không gian cực kỳ sắc bén.", mbtiSpecific: ["INTJ", "INTP"] },
      // 5 Phim Châu Á
      { title: "Stranger (Khu Rừng Bí Mật)", year: 2017, genre: "Legal Thriller / Crime", platform: "Netflix VN", whyThisGroup: "[P] Nhân vật hoạt động bằng lý trí logic thuần tuý, bóc tách mạng lưới tham nhũng.", mbtiSpecific: ["INTJ", "ISTJ"] },
      { title: "Alice in Borderland", year: 2020, genre: "Sci-fi / Survival Thriller", platform: "Netflix VN", whyThisGroup: "[R] Trò chơi trí tuệ đòi hỏi toán học, lý thuyết trò chơi và logic tối đa.", mbtiSpecific: ["INTP", "ENTP"] },
      { title: "Death Note (Cuốn Sổ Tử Thần)", year: 2006, genre: "Anime / Thriller Mystery", platform: "Netflix VN", whyThisGroup: "[P] Cuộc chiến cân não giữa L và Light Yagami là đỉnh cao tư duy chiến thuật đối kháng.", mbtiSpecific: ["INTJ", "ENTP"] },
      { title: "Liar Game", year: 2007, genre: "Psychological / Thriller", platform: "YouTube", whyThisGroup: "[R] Lý thuyết trò chơi và tâm lý học đám đông là món ăn tinh thần hoàn hảo cho ENTP.", mbtiSpecific: ["ENTP", "INTP"] },
      { title: "The Bad Kids", year: 2020, genre: "Mystery / Drama", platform: "iQIYI VN", whyThisGroup: "[P] Phân tích tâm lý lạnh lùng và nước đi logic tinh vi của nhân vật trẻ tuổi kích thích tư duy NT.", mbtiSpecific: ["INTJ", "INTP"] },
      // 5 Phim VN
      { title: "Thám Tử Kiên: Kỳ Án Không Đầu", year: 2025, genre: "Kinh dị / Trinh thám", platform: "Netflix VN", whyThisGroup: "[P] Trinh thám cổ trang giải mã hiện tượng dưới góc độ logic thu hút trí tò mò NT.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "Địa Đạo: Mặt Trời Trong Bóng Tối", year: 2025, genre: "Lịch sử / Chiến tranh", platform: "Rạp VN", whyThisGroup: "[R] Thiết kế chiến thuật phòng thủ phức tạp và khoa học quân sự kích thích tư duy kiến trúc NT.", mbtiSpecific: ["ENTJ", "INTJ"] },
      { title: "Người Bất Tử", year: 2018, genre: "Kỳ ảo / Tâm lý", platform: "Netflix VN", whyThisGroup: "[P] Giả thuyết về sự bất tử và hệ quả triết học mang tính hệ thống cao.", mbtiSpecific: ["INTJ", "INTP"] },
      { title: "Song Lang", year: 2018, genre: "Chính kịch / Nghệ thuật", platform: "Netflix VN", whyThisGroup: "[R] Cấu trúc kịch bản đối xứng tinh tế kích hoạt tư duy biểu tượng của INTJ.", mbtiSpecific: ["INTJ"] },
      { title: "Tử Chiến Trên Không", year: 2025, genre: "Hành động / Tội phạm", platform: "Rạp VN", whyThisGroup: "[P] Kế hoạch không chiến phức tạp và ứng dụng công nghệ thỏa mãn tư duy logic công nghệ.", mbtiSpecific: ["ENTJ", "ENTP"] },
      // 5 Documentary
      { title: "AlphaGo", year: 2017, genre: "Science / Technology", platform: "YouTube", whyThisGroup: "[R] Đối đầu giữa AI và nhà vô địch cờ vây là minh chứng cho vẻ đẹp của thuật toán.", mbtiSpecific: ["INTP", "INTJ"] },
      { title: "Inside Bill's Brain", year: 2019, genre: "Biography", platform: "Netflix VN", whyThisGroup: "[P] Bill Gates giải quyết vấn đề toàn cầu bằng tư duy hệ thống và phân tích dữ liệu.", mbtiSpecific: ["INTJ", "ENTJ"] },
      { title: "The Social Dilemma", year: 2020, genre: "Social / Tech", platform: "Netflix VN", whyThisGroup: "[R] Bóc trần cấu trúc thuật toán thao túng hành vi người dùng dưới góc nhìn kỹ thuật.", mbtiSpecific: ["INTP", "ENTP"] },
      { title: "Cosmos: A Spacetime Odyssey", year: 2014, genre: "Science / Astronomy", platform: "Disney+ VN", whyThisGroup: "[P] Bức tranh vĩ mô về vũ trụ và lịch sử khoa học kích hoạt thế giới quan lý tính của NT.", mbtiSpecific: ["INTP", "INTJ"] },
      { title: "Fyre: The Greatest Party That Never Happened", year: 2019, genre: "Investigation", platform: "Netflix VN", whyThisGroup: "[R] Phân tích sự sụp đổ hệ thống của dự án lừa đảo marketing kích thích tư duy phản biện ENTP.", mbtiSpecific: ["ENTP", "ENTJ"] },
    ],
    books: [
      { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", vnTitle: "Sapiens: Lược Sử Loài Người", available: true, whyThisGroup: "[R] Góc nhìn vĩ mô kết hợp khảo cổ, sinh học, kinh tế để lý giải cấu trúc xã hội loài người.", readingStyle: "Đọc chậm · Phân tích" },
      { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", vnTitle: "Tư Duy Nhanh Và Chậm", available: true, whyThisGroup: "[P] Bản đồ khoa học về hai hệ thống nhận thức, lý tưởng tối ưu hóa tư duy quyết định.", readingStyle: "Nghiên cứu · Tham chiếu" },
      { title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", vnTitle: "Gödel, Escher, Bach: Sợi Chỉ Vàng Vô Tận", available: true, whyThisGroup: "[R] Kết hợp toán học, nghệ thuật và âm nhạc để giải mã ý thức và hệ thống tự quy chiếu.", readingStyle: "Đọc sâu · Nghiên cứu" },
      { title: "Zero to One", author: "Peter Thiel", vnTitle: "Từ Không Đến Một", available: true, whyThisGroup: "[P] Triết lý kiến tạo độc quyền từ tư duy phản nguyên lý đám đông.", readingStyle: "Tham khảo · Đọc nhanh" },
      { title: "The Grand Design", author: "Stephen Hawking", vnTitle: "Bản Thiết Kế Vĩ Đại", available: true, whyThisGroup: "[R] Mô hình vật lý lý thuyết giải thích sự tồn tại vũ trụ không cần yếu tố siêu nhiên.", readingStyle: "Nghiên cứu · Chiêm nghiệm" },
      { title: "Outliers", author: "Malcolm Gladwell", vnTitle: "Những Kẻ Xuất Chúng", available: true, whyThisGroup: "[P] Bóc tách các yếu tố hệ thống ẩn đằng sau thành công của các cá nhân kiệt xuất.", readingStyle: "Đọc trung bình · Phân tích" },
      { title: "A Brief History of Time", author: "Stephen Hawking", vnTitle: "Lược Sử Thời Gian", available: true, whyThisGroup: "[R] Vỡ lòng về vũ trụ học giúp NT định hình tư duy về không-thời gian.", readingStyle: "Đọc chậm · Suy ngẫm" },
      { title: "Superintelligence", author: "Nick Bostrom", vnTitle: "Siêu Trí Tuệ", available: true, whyThisGroup: "[P] Triết học và kỹ thuật về tương lai AI và kiểm soát rủi ro hiện sinh.", readingStyle: "Nghiên cứu · Đọc sâu" },
      { title: "The Selfish Gene", author: "Richard Dawkins", vnTitle: "Gen Vị Kỷ", available: true, whyThisGroup: "[R] Hành vi tiến hoá dưới góc nhìn lấy gen làm trung tâm, mô hình lý thuyết hoàn hảo cho NT.", readingStyle: "Đọc chậm · Phân tích" },
      { title: "The Black Swan", author: "Nassim Nicholas Taleb", vnTitle: "Thiên Nga Đen", available: true, whyThisGroup: "[P] Phân tích tác động của sự kiện không thể dự báo và tư duy trong môi trường bất định.", readingStyle: "Nghiên cứu · Phản biện" },
      { title: "The Three-Body Problem", author: "Lưu Từ Hân", vnTitle: "Tam Thể", available: true, whyThisGroup: "[R] Đỉnh cao sci-fi cứng với giả thuyết vật lý vĩ mô và lý thuyết trò chơi vũ trụ.", readingStyle: "Đọc chậm · Tưởng tượng" },
      { title: "Foundation", author: "Isaac Asimov", vnTitle: "Nền Móng", available: true, whyThisGroup: "[P] Tâm lý-lịch sử học dùng toán học dự báo tương lai thiên hà cực kỳ hấp dẫn NT.", readingStyle: "Đọc chậm · Hệ thống" },
      { title: "Dune", author: "Frank Herbert", vnTitle: "Xứ Cát", available: true, whyThisGroup: "[R] Mạng lưới chính trị, sinh thái và tôn giáo đòi hỏi phân tích đa chiều.", readingStyle: "Đọc sâu · Thưởng thức" },
      { title: "1984", author: "George Orwell", vnTitle: "Một Chín Tám Tư", available: true, whyThisGroup: "[R] Phân tích sắc bén cấu trúc kiểm soát xã hội và ngôn ngữ thao túng kích thích phản biện.", readingStyle: "Đọc chậm · Suy ngẫm" },
      { title: "The Martian", author: "Andy Weir", vnTitle: "Người Về Từ Sao Hỏa", available: true, whyThisGroup: "[R] Giải bài toán sinh tồn bằng khoa học thực nghiệm và kỹ thuật thuần tuý.", readingStyle: "Đọc nhanh · Thư giãn" },
      { title: "Crime and Punishment", author: "Fyodor Dostoevsky", vnTitle: "Tội Ác Và Hình Phạt", available: true, whyThisGroup: "[P] Mổ xẻ tâm lý lý tính của Raskolnikov về thuyết siêu nhân thỏa mãn triết học sâu sắc.", readingStyle: "Đọc chậm · Thấu cảm" },
      { title: "Sherlock Holmes", author: "Arthur Conan Doyle", vnTitle: "Những Cuộc Phiêu Lưu Của Sherlock Holmes", available: true, whyThisGroup: "[P] Vụ án giải quyết hoàn toàn bằng suy luận logic thực chứng.", readingStyle: "Thư giãn · Phân tích" },
      { title: "Brave New World", author: "Aldous Huxley", vnTitle: "Thế Giới Mới Tươi Đẹp", available: true, whyThisGroup: "[P] Xã hội tương lai vận hành tối ưu bằng kỹ thuật sinh học và phân tầng logic.", readingStyle: "Đọc trung bình · Chiêm nghiệm" },
      { title: "Khuyến Học", author: "Fukuzawa Yukichi", vnTitle: "Khuyến Học", available: true, whyThisGroup: "[P] Tư duy độc lập dân tộc qua giáo dục thực nghiệp và tinh thần khoa học lý tính.", readingStyle: "Đọc chậm · Chiêm nghiệm" },
      { title: "Tư Duy Hệ Thống", author: "Lại Thế Luyện", vnTitle: "Tư Duy Hệ Thống", available: true, whyThisGroup: "[R] Hướng dẫn tư duy hệ thống áp dụng vào môi trường làm việc VN.", readingStyle: "Nghiên cứu · Thực hành" },
      { title: "Principles", author: "Ray Dalio", vnTitle: "Những Nguyên Tắc", available: true, whyThisGroup: "[R] Hệ thống hoá cuộc đời thành thuật toán và nguyên tắc vận hành logic tối ưu hoá.", readingStyle: "Tham chiếu · Thực hành" },
      { title: "Deep Work", author: "Cal Newport", vnTitle: "Làm Việc Sâu", available: true, whyThisGroup: "[P] Phương pháp khoa học đạt trạng thái tập trung cao độ tối ưu hoá năng suất trí tuệ.", readingStyle: "Đọc nhanh · Thực hành" },
      { title: "The Obstacle Is the Way", author: "Ryan Holiday", vnTitle: "Trở Ngại Là Đường Đi", available: true, whyThisGroup: "[R] Triết lý Khắc kỷ giúp NT kiểm soát cảm xúc tiêu cực qua lăng kính lý trí thuần tuý.", readingStyle: "Đọc trung bình · Chiêm nghiệm" },
      { title: "Văn Minh Việt Nam", author: "Nguyễn Văn Huyên", vnTitle: "Văn Minh Việt Nam", available: true, whyThisGroup: "[P] Nghiên cứu lịch sử và nhân học khoa học, hệ thống dữ liệu chặt chẽ đầu tiên của VN.", readingStyle: "Tham khảo · Nghiên cứu" },
      { title: "Sự Kiến Tạo Xã Hội", author: "Peter L. Berger", vnTitle: "Sự Kiến Tạo Xã Hội", available: true, whyThisGroup: "[R] Cách thức thể chế xã hội và tri thức được hình thành dưới lăng kính cấu trúc luận.", readingStyle: "Nghiên cứu · Học thuật" },
    ],
    music: {
      genres: [
        { genre: "Math Rock", mood: "Tập trung trí tuệ cao độ / Lập trình", examples: ["What Burns Never Returns", "Chinchilla", "Animals"], whyThisGroup: "[R] Cấu trúc nhịp bất đối xứng phức tạp hoạt động như bài toán kích thích tư duy NT." },
        { genre: "Synthwave / Outrun", mood: "Sáng tạo ý tưởng / Làm việc đêm", examples: ["Resonance", "Nightcall", "Tech Noir"], whyThisGroup: "[P] Âm hưởng điện tử retro mang tính tương lai giúp NT vào trạng thái flow state." },
        { genre: "Progressive Metal", mood: "Giải phóng năng lượng / Tư duy chiến thuật", examples: ["Lateralus", "Metropolis Pt. 1", "Octavarium"], whyThisGroup: "[R] Chương nhạc dài, kỹ thuật phức tạp và chủ đề triết học kích thích trí óc logic NT." },
        { genre: "Neo-Classical Ambient", mood: "Suy ngẫm sâu / Viết lách", examples: ["Flight from the City", "Opus 23", "Experience"], whyThisGroup: "[P] Cấu trúc cổ điển tối giản và không gian âm thanh điện tử nuôi dưỡng tư duy trực giác." },
        { genre: "IDM (Intelligent Dance Music)", mood: "Nghiên cứu / Đọc sách khoa học", examples: ["Windowlicker", "Flim", "Vordhosbn"], whyThisGroup: "[R] Tiết tấu thử nghiệm phi truyền thống kích thích kết nối thần kinh tư duy phi tuyến tính." },
      ],
      internationalArtists: ["Muse", "Daft Punk", "Tool", "Aphex Twin", "Radiohead", "Max Richter", "Pink Floyd", "Dream Theater", "Haken", "Animals As Leaders"],
      vietnameseArtists: ["Vũ Thanh Vân", "Ngọt", "Thịnh Suy", "Tùng", "buitruonglinh", "Kimmese", "Suboi", "Đá Số Tới", "Cá Hồi Hoang", "Hạc San"],
    },
    podcasts: [
      { name: "The Lex Fridman Podcast", host: "Lex Fridman", language: "EN", topic: "AI, Science, Philosophy, Technology", episodeLength: "dài (60p+)", whyThisGroup: "[R] Đối thoại sâu với nhà khoa học hàng đầu về AI, vũ trụ và triết học nhân tạo." },
      { name: "Oddly Normal", host: "Oddly Normal Team", language: "VI", topic: "Lịch sử, kinh tế, văn hoá dưới góc nhìn khoa học", episodeLength: "trung (30-45p)", whyThisGroup: "[P] Phân tích hiện tượng xã hội bằng mô hình dữ liệu và tư duy phản biện đa chiều." },
      { name: "Amateur Psychology", host: "Nguyễn Đoàn Minh Thư", language: "VI", topic: "Giải mã hành vi bằng nghiên cứu khoa học", episodeLength: "ngắn (15-20p)", whyThisGroup: "[R] Thí nghiệm thực chứng giải thích thiên kiến nhận thức, thỏa mãn tư duy logic NT." },
      { name: "Have A Sip", host: "Thùy Minh", language: "VI", topic: "Phỏng vấn chuyên sâu người nổi tiếng và học giả", episodeLength: "dài (60p+)", whyThisGroup: "[P] Khai thác thế giới quan và tư duy hệ thống của các khách mời trí thức." },
      { name: "Huberman Lab", host: "Dr. Andrew Huberman", language: "EN", topic: "Thần kinh học và tối ưu hoá sinh học", episodeLength: "dài (60p+)", whyThisGroup: "[R] Giao thức tối ưu hoá dựa trên nghiên cứu khoa học thần kinh thực chứng." },
      { name: "The Jordan B. Peterson Podcast", host: "Dr. Jordan B. Peterson", language: "EN", topic: "Tâm lý học, triết học hiện sinh", episodeLength: "dài (60p+)", whyThisGroup: "[P] Phân tích cấu trúc biểu tượng văn hoá và tâm lý học lâm sàng bằng logic chặt chẽ." },
      { name: "The Portal", host: "Eric Weinstein", language: "EN", topic: "Toán học, vật lý lý thuyết, kinh tế học dị biệt", episodeLength: "dài (60p+)", whyThisGroup: "[P] Giả thuyết độc đáo về cấu trúc vũ trụ và mô hình kinh tế ngoài hệ thống chính thống." },
      { name: "Bản Nhiều Chữ", host: "Vietcetera Team", language: "VI", topic: "Bàn luận sách hàn lâm, triết học và xã hội", episodeLength: "trung (30-45p)", whyThisGroup: "[R] Bóc tách sách khó dưới góc nhìn lý tính, kích thích tư duy học thuật của NT." },
      { name: "The Sean Carroll Mindscape", host: "Sean Carroll", language: "EN", topic: "Vật lý lý thuyết, triết học, văn hoá tri thức", episodeLength: "dài (60p+)", whyThisGroup: "[P] Nhà vật lý vũ trụ trò chuyện với các bộ óc vĩ đại nhất thế giới hiện đại." },
      { name: "Hacker Noon Podcast", host: "HackerNoon Editors", language: "EN", topic: "Công nghệ, AI, phần mềm", episodeLength: "trung (30-45p)", whyThisGroup: "[R] Cập nhật xu hướng kiến trúc phần mềm và tương lai web phi tập trung cho NT yêu công nghệ." },
    ],
    digital: [
      { name: "Portal 2", type: "Game", platform: "PC / Console", whyThisGroup: "[R] Giải đố vật lý không gian đòi hỏi tư duy logic hệ thống và định vị 3D xuất sắc." },
      { name: "Factorio", type: "Game", platform: "PC", whyThisGroup: "[P] Thiết kế và tối ưu hoá dây chuyền sản xuất tự động khổng lồ, trò chơi lý tưởng cho INTJ." },
      { name: "Civilization VI", type: "Game", platform: "PC / Mobile", whyThisGroup: "[R] Chiến thuật vĩ mô đòi hỏi hoạch định dài hạn và lý thuyết trò chơi ngoại giao." },
      { name: "Duolingo", type: "App", platform: "Mobile", whyThisGroup: "[R] Hệ thống hoá ngôn ngữ qua thuật toán lặp lại ngắt quãng tối ưu nhận thức." },
      { name: "Anki", type: "App", platform: "PC / Mobile", whyThisGroup: "[P] Ghi nhớ flashcard bằng thuật toán SuperMemo cho học thuật phức tạp." },
      { name: "Baba Is You", type: "Game", platform: "PC / Mobile", whyThisGroup: "[R] Giải đố lập trình logic thay đổi luật chơi bằng thay đổi cấu trúc từ vựng ngữ nghĩa." },
      { name: "Complexity Explorer", type: "App", platform: "Web", whyThisGroup: "[P] Nền tảng học của Viện Santa Fe về khoa học hệ thống phức tạp và động lực học phi tuyến." },
      { name: "Reddit r/intj / r/intp", type: "Community", platform: "Web / App", whyThisGroup: "[R] Thảo luận toàn cầu về giả thuyết khoa học, triết học và chủ đề lý tính cao độ." },
      { name: "Discord - Vietnam Tech Community", type: "Community", platform: "App", whyThisGroup: "[P] Kỹ sư phần mềm và nhà nghiên cứu AI VN trao đổi về kiến trúc hệ thống." },
      { name: "Allegal Learn", type: "App", platform: "Web", whyThisGroup: "[P] Giả lập tình huống tranh tụng pháp lý thực tế bằng AI giúp NT rèn lập luận logic." },
    ],
    expandSuggestions: [
      "Thử xem phim hài lãng mạn thuần tuý như 'About Time' để kích hoạt trí tuệ cảm xúc và xoa dịu tâm trí lý tính.",
      "Viết thơ tự do hoặc vẽ tranh màu nước không theo quy tắc để giải phóng bán cầu não phải.",
      "Thử một buổi yoga chậm và cảm nhận luồng khí qua cơ thể, tạm thời ngắt kết nối với suy nghĩ phân tích.",
    ],
  },

  NF: {
    films: [
      { title: "Eternal Sunshine of the Spotless Mind", year: 2004, genre: "Drama / Romance", platform: "Netflix VN", whyThisGroup: "[P] Khám phá ký ức và tình yêu phức tạp — character-driven, emotional journey.", mbtiSpecific: ["INFP", "INFJ"] },
      { title: "Her", year: 2013, genre: "Drama / Sci-fi", platform: "Netflix VN", whyThisGroup: "[P] Kết nối cảm xúc và ý nghĩa trong mối quan hệ hiện đại.", mbtiSpecific: ["INFJ", "INFP"] },
      { title: "Arrival", year: 2016, genre: "Sci-fi / Drama", platform: "Netflix VN", whyThisGroup: "[P] Thời gian, ngôn ngữ và tình yêu — ý nghĩa sâu sắc.", mbtiSpecific: ["INFJ", "INTJ"] },
      { title: "The Perks of Being a Wallflower", year: 2012, genre: "Drama / Coming-of-age", platform: "Netflix VN", whyThisGroup: "[P] Nội tâm và trưởng thành — hành trình cảm xúc tinh tế.", mbtiSpecific: ["INFP", "INFJ"] },
      { title: "Call Me By Your Name", year: 2017, genre: "Drama / Romance", platform: "Netflix VN", whyThisGroup: "[P] Cảm xúc tinh tế và sâu sắc — first love và ký ức.", mbtiSpecific: ["INFP", "ENFP"] },
      { title: "Our Times", year: 2015, genre: "Romance / Drama (Asia)", platform: "Netflix VN", whyThisGroup: "[P] Hoài niệm và kết nối cảm xúc — youth romance châu Á.", mbtiSpecific: ["INFP", "ENFP"] },
      { title: "A Silent Voice", year: 2016, genre: "Anime / Drama (Asia)", platform: "Netflix VN", whyThisGroup: "[P] Empathy và sự tha thứ — redemption qua kết nối con người.", mbtiSpecific: ["INFJ", "INFP"] },
      { title: "Tro Tàn Rực Rỡ", year: 2022, genre: "Drama (VN)", platform: "Rạp VN / Streaming", whyThisGroup: "[P] Cảm xúc tinh tế, chiều sâu nhân vật — điện ảnh VN nghệ thuật.", mbtiSpecific: ["INFJ", "INFP"] },
      { title: "Mắt Biếc", year: 2019, genre: "Romance / Drama (VN)", platform: "Netflix VN", whyThisGroup: "[P] Hoài niệm và tình cảm sâu lắng — văn học VN lên màn ảnh.", mbtiSpecific: ["INFP", "ENFP"] },
      { title: "I Am Not Your Guru (Tony Robbins)", year: 2016, genre: "Documentary", platform: "Netflix VN", whyThisGroup: "[P] Hành trình nội tâm và chuyển hóa — documentary về ý nghĩa.", mbtiSpecific: ["ENFJ", "INFJ"] },
    ],
    books: [
      { title: "The Alchemist", author: "Paulo Coelho", vnTitle: "Nhà Giả Kim", available: true, whyThisGroup: "[P] Hành trình tìm ý nghĩa sâu sắc.", readingStyle: "Đọc chậm · Chiêm nghiệm" },
      { title: "Man's Search for Meaning", author: "Viktor Frankl", vnTitle: "Đi Tìm Lẽ Sống", available: true, whyThisGroup: "[P] Ý nghĩa cuộc sống giữa khổ đau.", readingStyle: "Đọc chậm · Suy ngẫm" },
      { title: "The Untethered Soul", author: "Michael A. Singer", vnTitle: "Linh Hồn Không Ràng Buộc", available: true, whyThisGroup: "[P] Tự do nội tâm và quan sát cảm xúc.", readingStyle: "Đọc chậm · Thực hành" },
      { title: "Educated", author: "Tara Westover", vnTitle: "Educated", available: true, whyThisGroup: "[P] Memoir về bản sắc và trưởng thành.", readingStyle: "Đọc trung bình · Cảm xúc" },
      { title: "The Gifts of Imperfection", author: "Brené Brown", vnTitle: "Những Món Quà Của Sự Không Hoàn Hảo", available: true, whyThisGroup: "[P] Authenticity và vulnerability.", readingStyle: "Đọc nhanh · Thực hành" },
      { title: "Norwegian Wood", author: "Haruki Murakami", vnTitle: "Rừng Na Uy", available: true, whyThisGroup: "[P] Cảm xúc tinh tế và hoài niệm.", readingStyle: "Đọc chậm · Thưởng thức" },
      { title: "Pachinko", author: "Min Jin Lee", vnTitle: "Pachinko", available: true, whyThisGroup: "[P] Câu chuyện gia đình và bản sắc sâu sắc.", readingStyle: "Đọc chậm · Cảm xúc" },
    ],
    music: {
      genres: [
        { genre: "Indie folk", mood: "Suy ngẫm / Viết nhật ký", examples: ["Holocene", "Skinny Love"], whyThisGroup: "[P] Acoustic và cảm xúc sâu phù hợp NF." },
        { genre: "Acoustic", mood: "Thư giãn / Chiêm nghiệm", examples: ["Fast Car", "The Night We Met"], whyThisGroup: "[P] Gần gũi, chân thật — không ồn ào." },
        { genre: "Classical crossover", mood: "Tập trung nhẹ / Đọc sách", examples: ["River Flows in You", "Comptine"], whyThisGroup: "[P] Không lời, nuôi dưỡng nội tâm." },
        { genre: "Ambient", mood: "Meditation / Ngủ", examples: ["Weightless", "An Ending"], whyThisGroup: "[P] Không gian âm thanh cho cảm xúc NF." },
        { genre: "Singer-songwriter", mood: "Storytelling / Cảm xúc", examples: ["The A Team", "Yellow"], whyThisGroup: "[P] Lời ca như nhật ký — NF kết nối sâu." },
      ],
      internationalArtists: ["Bon Iver", "Sufjan Stevens", "Phoebe Bridgers", "Hozier", "Novo Amor"],
      vietnameseArtists: ["Hà Anh Tuấn", "Mỹ Tâm", "Trịnh Công Sơn (nhạc xưa)", "Vũ Cát Tường"],
    },
    podcasts: [
      { name: "On Being with Krista Tippett", host: "Krista Tippett", language: "EN", topic: "Ý nghĩa, triết học và tâm linh", episodeLength: "dài (60p+)", whyThisGroup: "[P] Đối thoại sâu về ý nghĩa cuộc sống." },
      { name: "The Moth", host: "The Moth", language: "EN", topic: "Storytelling cá nhân", episodeLength: "trung (20-30p)", whyThisGroup: "[P] Kết nối con người qua câu chuyện thật." },
      { name: "Unlocking Us with Brené Brown", host: "Brené Brown", language: "EN", topic: "Vulnerability và authentic living", episodeLength: "trung (30-45p)", whyThisGroup: "[P] Authenticity và cảm xúc sâu." },
      { name: "Hidden Brain", host: "Shankar Vedantam", language: "EN", topic: "Tâm lý học hành vi", episodeLength: "trung (30-45p)", whyThisGroup: "[P] Hiểu con người qua khoa học hành vi." },
    ],
    digital: [
      { name: "Spotify", type: "App", platform: "Mobile / Web", whyThisGroup: "[P] Playlist mood-based phù hợp cảm xúc NF.", category: "entertainment" },
      { name: "Kurzgesagt", type: "Channel", platform: "YouTube", whyThisGroup: "[P] Triết học và ý nghĩa cuộc sống visually.", category: "entertainment" },
      { name: "TED Talks (Empathy)", type: "Playlist", platform: "YouTube / TED App", whyThisGroup: "[P] Góc nhìn đa chiều về con người.", category: "entertainment" },
      {
        name: "Ngày Mai",
        type: "Hỗ trợ tâm lý",
        platform: "Hotline",
        whyThisGroup: "[P] Hỗ trợ tâm lý phi lợi nhuận — không phải giải trí.",
        category: "support",
        hours: "13h-20h30 · T4-CN",
        phone: "096 306 1414",
        note: "Đường dây hỗ trợ tâm lý · không phải nội dung giải trí.",
      },
    ],
    expandSuggestions: [
      "Thử viết nhật ký sau khi xem phim — NF thường có cảm xúc sâu cần xử lý qua chữ viết.",
      "Book club với 2-3 người thân → kết nối sâu hơn qua câu chuyện.",
    ],
  },

  ST: {
    films: [
      { title: "Whiplash", year: 2014, genre: "Drama / Music", platform: "Netflix VN", whyThisGroup: "[P] Kỷ luật, kỹ năng và cái giá của xuất sắc.", mbtiSpecific: ["ISTJ", "ESTJ"] },
      { title: "The Social Network", year: 2010, genre: "Biography / Drama", platform: "Netflix VN", whyThisGroup: "[P] Xây dựng, chiến lược và hệ quả thực tế.", mbtiSpecific: ["ENTJ", "ESTJ"] },
      { title: "Ford v Ferrari", year: 2019, genre: "Biography / Sport", platform: "Disney+ VN", whyThisGroup: "[P] Kỹ năng thực chiến và cạnh tranh.", mbtiSpecific: ["ISTP", "ESTP"] },
      { title: "Moneyball", year: 2011, genre: "Drama / Sport", platform: "Netflix VN", whyThisGroup: "[P] Data-driven thinking và chiến lược.", mbtiSpecific: ["ISTJ", "ENTJ"] },
      { title: "Top Gun: Maverick", year: 2022, genre: "Action", platform: "Paramount+ / Rạp", whyThisGroup: "[P] Action, kỹ năng và thực tế.", mbtiSpecific: ["ESTP", "ISTP"] },
      { title: "Free Solo", year: 2018, genre: "Documentary / Sport", platform: "Disney+ VN", whyThisGroup: "[P] Kỹ năng đỉnh cao và kiểm soát rủi ro.", mbtiSpecific: ["ISTP", "ESTP"] },
      { title: "Đất Rừng Phương Nam", year: 2023, genre: "Action / History (VN)", platform: "Rạp VN", whyThisGroup: "[P] Hành động và bối cảnh lịch sử thực tế.", mbtiSpecific: ["ISTJ", "ESTP"] },
    ],
    books: [
      { title: "Atomic Habits", author: "James Clear", vnTitle: "Thói Quen Atomic", available: true, whyThisGroup: "[P] Hệ thống thói quen thực tế.", readingStyle: "Đọc nhanh · Thực hành" },
      { title: "The Art of War", author: "Sun Tzu", vnTitle: "Binh Pháp Tôn Tử", available: true, whyThisGroup: "[P] Chiến lược và tư duy thực dụng.", readingStyle: "Tham khảo · Áp dụng" },
      { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", vnTitle: "Tư Duy Nhanh Và Chậm", available: true, whyThisGroup: "[P] Cách não bộ ra quyết định.", readingStyle: "Nghiên cứu · Phân tích" },
      { title: "Can't Hurt Me", author: "David Goggins", vnTitle: "Can't Hurt Me", available: true, whyThisGroup: "[P] Kỷ luật và vượt giới hạn.", readingStyle: "Đọc nhanh · Động lực" },
      { title: "The Goal", author: "Eliyahu Goldratt", vnTitle: "Mục Tiêu", available: true, whyThisGroup: "[P] Tư duy hệ thống và hiệu quả.", readingStyle: "Đọc trung bình · Thực hành" },
    ],
    music: {
      genres: [
        { genre: "Rock", mood: "Năng lượng / Làm việc", examples: ["Back in Black", "Smells Like Teen Spirit"], whyThisGroup: "[P] ST thích nhịp điệu mạnh, thực tế." },
        { genre: "Hip-hop", mood: "Động lực / Workout", examples: ["Lose Yourself", "HUMBLE."], whyThisGroup: "[P] Lời có chiều sâu và drive." },
        { genre: "Electronic", mood: "Tập trung / Gym", examples: ["Strobe", "One More Time"], whyThisGroup: "[P] Nhịp ổn định cho hiệu suất." },
        { genre: "Workout beats", mood: "Cardio / HIIT", examples: ["Eye of the Tiger", "Till I Collapse"], whyThisGroup: "[P] Kích hoạt năng lượng thể chất ST." },
      ],
      internationalArtists: ["Eminem", "Kendrick Lamar", "The Weeknd", "AC/DC"],
      vietnameseArtists: ["Đen Vâu", "RPT MCK", "Bích Phương"],
    },
    podcasts: [
      { name: "Lex Fridman Podcast", host: "Lex Fridman", language: "EN", topic: "Kỹ thuật, AI và tư duy chuyên sâu", episodeLength: "dài (60p+)", whyThisGroup: "[P] Phỏng vấn chuyên gia thực chiến." },
      { name: "How I Built This", host: "Guy Raz", language: "EN", topic: "Startup và founder stories", episodeLength: "trung (30-45p)", whyThisGroup: "[P] Xây dựng thực tế từ founder." },
      { name: "Stuff You Should Know", host: "Josh Clark & Chuck Bryant", language: "EN", topic: "Facts thú vị giải thích thực tế", episodeLength: "trung (30-45p)", whyThisGroup: "[P] Kiến thức dễ áp dụng." },
      { name: "The Tim Ferriss Show", host: "Tim Ferriss", language: "EN", topic: "Performance và kỹ năng", episodeLength: "dài (60p+)", whyThisGroup: "[P] Tối ưu từ người giỏi nhất." },
    ],
    digital: [
      { name: "Veritasium", type: "Channel", platform: "YouTube", whyThisGroup: "[P] Khoa học và kỹ thuật giải thích trực quan.", category: "entertainment" },
      { name: "Mark Rober", type: "Channel", platform: "YouTube", whyThisGroup: "[P] Engineering và problem-solving thực tế.", category: "entertainment" },
      { name: "Coursera / edX", type: "Platform", platform: "Web", whyThisGroup: "[P] Kỹ năng cụ thể áp dụng ngay.", category: "entertainment" },
      { name: "Reddit r/DIY, r/woodworking", type: "Community", platform: "Web / App", whyThisGroup: "[P] Cộng đồng làm thủ công và kỹ năng thực hành.", category: "entertainment" },
    ],
    expandSuggestions: [
      "Thử 1 sport cạnh tranh mới — ST phát triển khi có challenge thực tế.",
      "Podcast kỹ thuật chuyên sâu hơn theo nghề của bạn.",
    ],
  },

  SF: {
    films: [
      { title: "About Time", year: 2013, genre: "Romance / Drama", platform: "Netflix VN", whyThisGroup: "[P] Gia đình, hiện tại và kết nối ấm áp.", mbtiSpecific: ["ISFJ", "ESFJ"] },
      { title: "Julie & Julia", year: 2009, genre: "Drama / Food", platform: "Netflix VN", whyThisGroup: "[P] Đam mê nấu ăn và tự khám phá.", mbtiSpecific: ["ISFP", "ESFP"] },
      { title: "Paddington 2", year: 2017, genre: "Family / Comedy", platform: "Netflix VN", whyThisGroup: "[P] Ấm áp, cộng đồng và lòng tốt.", mbtiSpecific: ["ISFJ", "ESFJ"] },
      { title: "Spirited Away", year: 2001, genre: "Anime / Fantasy (Asia)", platform: "Netflix VN", whyThisGroup: "[P] Kỳ diệu và tình cảm sâu sắc.", mbtiSpecific: ["ISFP", "INFP"] },
      { title: "Always Be My Maybe", year: 2019, genre: "Romance / Comedy", platform: "Netflix VN", whyThisGroup: "[P] Romance và kết nối nhẹ nhàng.", mbtiSpecific: ["ESFP", "ENFP"] },
      { title: "Bố Già", year: 2021, genre: "Drama / Family (VN)", platform: "Netflix VN", whyThisGroup: "[P] Gia đình và tình cảm VN.", mbtiSpecific: ["ISFJ", "ESFJ"] },
      { title: "Em Và Trịnh", year: 2022, genre: "Biography / Music (VN)", platform: "Rạp VN / Streaming", whyThisGroup: "[P] Âm nhạc và kết nối cảm xúc VN.", mbtiSpecific: ["ISFP", "ESFJ"] },
    ],
    books: [
      { title: "The House on Mango Street", author: "Sandra Cisneros", vnTitle: "The House on Mango Street", available: true, whyThisGroup: "[P] Cộng đồng và bản sắc nhẹ nhàng.", readingStyle: "Đọc chậm · Cảm xúc" },
      { title: "Big Magic", author: "Elizabeth Gilbert", vnTitle: "Big Magic", available: true, whyThisGroup: "[P] Sáng tạo và cuộc sống đầy đủ.", readingStyle: "Đọc nhanh · Truyền cảm hứng" },
      { title: "The Year of Magical Thinking", author: "Joan Didion", vnTitle: "The Year of Magical Thinking", available: true, whyThisGroup: "[P] Cảm xúc và kết nối con người.", readingStyle: "Đọc chậm · Thấu cảm" },
      { title: "Salt Fat Acid Heat", author: "Samin Nosrat", vnTitle: "Salt Fat Acid Heat", available: true, whyThisGroup: "[P] Ẩm thực và niềm vui cuộc sống.", readingStyle: "Thực hành · Thưởng thức" },
      { title: "Năm Ngón Tay", author: "Phan Thị Vàng Anh", vnTitle: "Năm Ngón Tay", available: true, whyThisGroup: "[P] Truyện ngắn VN giàu cảm xúc.", readingStyle: "Đọc chậm · Cảm xúc" },
    ],
    music: {
      genres: [
        { genre: "Pop", mood: "Vui / Xã hội", examples: ["Shake It Off", "Blinding Lights"], whyThisGroup: "[P] Catchy và dễ chia sẻ với bạn bè." },
        { genre: "R&B", mood: "Cảm xúc / Chill", examples: ["All of Me", "Stay"], whyThisGroup: "[P] Warm và relatable." },
        { genre: "Vietnamese pop", mood: "Kết nối / Hoài niệm", examples: ["Lạc Trôi", "Người Ấy"], whyThisGroup: "[P] Gần gũi văn hóa VN." },
        { genre: "Chill/lofi", mood: "Thư giãn / Làm việc nhẹ", examples: ["lofi hip hop", "Chillhop"], whyThisGroup: "[P] Nền nhạc dễ chịu cho SF." },
        { genre: "Dance", mood: "Party / Năng lượng", examples: ["Uptown Funk", "Levitating"], whyThisGroup: "[P] SF thích movement và fun." },
      ],
      internationalArtists: ["Taylor Swift", "Adele", "Ed Sheeran", "Bruno Mars", "Dua Lipa"],
      vietnameseArtists: ["Sơn Tùng M-TP", "Hoàng Yến Chibi", "HIEUTHUHAI", "tlinh"],
    },
    podcasts: [
      { name: "Armchair Expert with Dax Shepard", host: "Dax Shepard", language: "EN", topic: "Trò chuyện ấm áp và câu chuyện con người", episodeLength: "dài (60p+)", whyThisGroup: "[P] Feel-good stories và kết nối cộng đồng." },
      { name: "The Moth", host: "The Moth", language: "EN", topic: "Storytelling cá nhân", episodeLength: "trung (20-30p)", whyThisGroup: "[P] Kết nối qua narrative thật." },
      { name: "Stuff You Should Know", host: "Josh Clark & Chuck Bryant", language: "EN", topic: "Curious facts dễ tiếp cận", episodeLength: "trung (30-45p)", whyThisGroup: "[P] Thú vị, không áp lực học thuật." },
    ],
    digital: [
      { name: "TikTok (cooking, lifestyle)", type: "App", platform: "Mobile", whyThisGroup: "[P] Visual, nhanh, phù hợp nhịp sống SF.", category: "entertainment" },
      { name: "Instagram (food & travel)", type: "App", platform: "Mobile", whyThisGroup: "[P] Cảm hứng visual và cộng đồng.", category: "entertainment" },
      { name: "Pinterest", type: "App", platform: "Web / Mobile", whyThisGroup: "[P] Ý tưởng DIY, decor và ẩm thực.", category: "entertainment" },
      { name: "Joshua Weissman", type: "Channel", platform: "YouTube", whyThisGroup: "[P] Nấu ăn vui vẻ và accessible.", category: "entertainment" },
    ],
    expandSuggestions: [
      "Thử cooking class cùng bạn bè — SF thích trải nghiệm xã hội + kỹ năng mới.",
      "Podcast về ẩm thực hoặc du lịch VN.",
    ],
  },
}

// ─── HELPERS ─────────────────────────────────────────────

/** Map MBTI type → group */
export function getEntertainmentGroup(mbtiType: string): MbtiGroup {
  const NT = ['INTJ','INTP','ENTJ','ENTP']
  const NF = ['INFJ','INFP','ENFJ','ENFP']
  const ST = ['ISTJ','ISTP','ESTJ','ESTP']
  if (NT.includes(mbtiType)) return 'NT'
  if (NF.includes(mbtiType)) return 'NF'
  if (ST.includes(mbtiType)) return 'ST'
  return 'SF'
}

/** Lấy gợi ý phim theo group */
export function getFilmsByGroup(group: MbtiGroup): EntFilm[] {
  return ENTERTAINMENT_LIBRARY[group]?.films ?? []
}

/** Lấy gợi ý sách theo group */
export function getBooksByGroup(group: MbtiGroup): EntBook[] {
  return ENTERTAINMENT_LIBRARY[group]?.books ?? []
}

/** Lấy digital theo group */
export function getDigitalByGroup(group: MbtiGroup): EntDigital[] {
  return ENTERTAINMENT_LIBRARY[group]?.digital ?? []
}

export function getEntertainmentDigital(group: MbtiGroup): EntDigital[] {
  return getDigitalByGroup(group).filter((d) => d.category !== 'support')
}

export function getSupportDigital(group: MbtiGroup): EntDigital[] {
  return getDigitalByGroup(group).filter((d) => d.category === 'support')
}

/** Lấy expand suggestion ngẫu nhiên */
export function getExpandSuggestion(group: MbtiGroup): string {
  const suggestions = ENTERTAINMENT_LIBRARY[group]?.expandSuggestions ?? []
  return suggestions[Math.floor(Math.random() * suggestions.length)] ?? ''
}
