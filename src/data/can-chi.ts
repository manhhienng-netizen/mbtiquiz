/**
 * CAN CHI FULL DATA
 * packages/data/src/can-chi-full-data.ts
 *
 * Bao gồm:
 * 1. 60 Hoa Giáp — tên + ngũ hành + luận giải
 * 2. 12 Con Giáp — tính cách + điểm mạnh/yếu + tình duyên + sự nghiệp
 * 3. Ngũ Hành năm → tính cách + màu + hướng + nghề
 * 4. Tương hợp 12 con giáp (78 cặp unique)
 * 5. Helper functions
 */

// ============================================================
// BẢNG CAN + CHI
// ============================================================

export const THIEN_CAN_VI = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý']
export const DIA_CHI_VI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
export const CON_GIAP = ['Chuột', 'Trâu', 'Hổ', 'Mèo', 'Rồng', 'Rắn', 'Ngựa', 'Dê', 'Khỉ', 'Gà', 'Chó', 'Heo']

export const CAN_NGUHANH: Record<string, string> = {
  'Giáp': 'Mộc', 'Ất': 'Mộc',
  'Bính': 'Hỏa', 'Đinh': 'Hỏa',
  'Mậu': 'Thổ', 'Kỷ': 'Thổ',
  'Canh': 'Kim', 'Tân': 'Kim',
  'Nhâm': 'Thủy', 'Quý': 'Thủy',
}

export const CHI_NGUHANH: Record<string, string> = {
  'Tý': 'Thủy', 'Sửu': 'Thổ', 'Dần': 'Mộc', 'Mão': 'Mộc',
  'Thìn': 'Thổ', 'Tỵ': 'Hỏa', 'Ngọ': 'Hỏa', 'Mùi': 'Thổ',
  'Thân': 'Kim', 'Dậu': 'Kim', 'Tuất': 'Thổ', 'Hợi': 'Thủy',
}

// ============================================================
// PHẦN 1 — 60 HOA GIÁP
// ============================================================

export interface HoaGiapInfo {
  stt: number
  canChi: string
  can: string
  chi: string
  nguhanhCan: string
  nguhanhChi: string
  nguhanhNap: string        // Ngũ hành nạp âm — đặc trưng của Hoa Giáp
  tenGoiNapAm: string       // Tên gọi Nạp Âm (VD: "Hải Trung Kim")
  luanGiaiNgan: string      // 1-2 câu đặc trưng
  namDuong: number[]        // Một số năm dương lịch tương ứng gần đây
}

export const HOA_GIAP: HoaGiapInfo[] = [
  // ── Giáp Tý ──────────────────────────────────────────────
  { stt: 1, canChi: 'Giáp Tý', can: 'Giáp', chi: 'Tý', nguhanhCan: 'Mộc', nguhanhChi: 'Thủy', nguhanhNap: 'Kim', tenGoiNapAm: 'Hải Trung Kim', luanGiaiNgan: 'Kim trong biển cả — tài năng ẩn sâu, cần đúng thời điểm mới phát lộ. Bền bỉ và có tầm nhìn xa.', namDuong: [1924, 1984, 2044] },
  { stt: 2, canChi: 'Ất Sửu', can: 'Ất', chi: 'Sửu', nguhanhCan: 'Mộc', nguhanhChi: 'Thổ', nguhanhNap: 'Kim', tenGoiNapAm: 'Hải Trung Kim', luanGiaiNgan: 'Kim trong biển cả — kiên định, chịu đựng tốt, thành công đến muộn nhưng bền vững.', namDuong: [1925, 1985, 2045] },
  { stt: 3, canChi: 'Bính Dần', can: 'Bính', chi: 'Dần', nguhanhCan: 'Hỏa', nguhanhChi: 'Mộc', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Lô Trung Hỏa', luanGiaiNgan: 'Lửa trong lò — năng lượng mạnh mẽ được kiểm soát, lãnh đạo tự nhiên, dũng cảm và quyết đoán.', namDuong: [1926, 1986, 2046] },
  { stt: 4, canChi: 'Đinh Mão', can: 'Đinh', chi: 'Mão', nguhanhCan: 'Hỏa', nguhanhChi: 'Mộc', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Lô Trung Hỏa', luanGiaiNgan: 'Lửa trong lò — tinh tế và sâu sắc, tài năng nghệ thuật và khả năng truyền cảm hứng đặc biệt.', namDuong: [1927, 1987, 2047] },
  { stt: 5, canChi: 'Mậu Thìn', can: 'Mậu', chi: 'Thìn', nguhanhCan: 'Thổ', nguhanhChi: 'Thổ', nguhanhNap: 'Mộc', tenGoiNapAm: 'Đại Lâm Mộc', luanGiaiNgan: 'Mộc đại lâm — rừng cây lớn, mạnh mẽ và che chở, tầm nhìn rộng lớn, thích hợp vị trí lãnh đạo.', namDuong: [1928, 1988, 2048] },
  { stt: 6, canChi: 'Kỷ Tỵ', can: 'Kỷ', chi: 'Tỵ', nguhanhCan: 'Thổ', nguhanhChi: 'Hỏa', nguhanhNap: 'Mộc', tenGoiNapAm: 'Đại Lâm Mộc', luanGiaiNgan: 'Mộc đại lâm — đất màu mỡ sinh rừng xanh, bền bỉ xây dựng từng ngày, kết quả bền lâu.', namDuong: [1929, 1989, 2049] },
  { stt: 7, canChi: 'Canh Ngọ', can: 'Canh', chi: 'Ngọ', nguhanhCan: 'Kim', nguhanhChi: 'Hỏa', nguhanhNap: 'Thổ', tenGoiNapAm: 'Lộ Bàng Thổ', luanGiaiNgan: 'Đất bên đường — rộng rãi và thực dụng, sẵn sàng phục vụ, dễ thích nghi với nhiều hoàn cảnh.', namDuong: [1930, 1990, 2050] },
  { stt: 8, canChi: 'Tân Mùi', can: 'Tân', chi: 'Mùi', nguhanhCan: 'Kim', nguhanhChi: 'Thổ', nguhanhNap: 'Thổ', tenGoiNapAm: 'Lộ Bàng Thổ', luanGiaiNgan: 'Đất bên đường — rộng lượng và bao dung, nhạy cảm với vẻ đẹp, tạo ra sự hài hòa.', namDuong: [1931, 1991, 2051] },
  { stt: 9, canChi: 'Nhâm Thân', can: 'Nhâm', chi: 'Thân', nguhanhCan: 'Thủy', nguhanhChi: 'Kim', nguhanhNap: 'Kim', tenGoiNapAm: 'Kiếm Phong Kim', luanGiaiNgan: 'Kim sắc bén như kiếm — sắc sảo, quyết đoán, nhìn thẳng vào vấn đề và giải quyết nhanh.', namDuong: [1932, 1992, 2052] },
  { stt: 10, canChi: 'Quý Dậu', can: 'Quý', chi: 'Dậu', nguhanhCan: 'Thủy', nguhanhChi: 'Kim', nguhanhNap: 'Kim', tenGoiNapAm: 'Kiếm Phong Kim', luanGiaiNgan: 'Kim sắc bén — trực giác nhạy và tinh tế, tư duy sắc sảo, có khả năng nhìn thấu vấn đề.', namDuong: [1933, 1993, 2053] },
  { stt: 11, canChi: 'Giáp Tuất', can: 'Giáp', chi: 'Tuất', nguhanhCan: 'Mộc', nguhanhChi: 'Thổ', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Sơn Đầu Hỏa', luanGiaiNgan: 'Lửa trên núi cao — tỏa sáng rực rỡ, lý tưởng cao, ảnh hưởng rộng, truyền cảm hứng cho nhiều người.', namDuong: [1934, 1994, 2054] },
  { stt: 12, canChi: 'Ất Hợi', can: 'Ất', chi: 'Hợi', nguhanhCan: 'Mộc', nguhanhChi: 'Thủy', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Sơn Đầu Hỏa', luanGiaiNgan: 'Lửa trên núi — ánh sáng lan tỏa, nhân hậu và bao dung, luôn tìm cách giúp đỡ người khác.', namDuong: [1935, 1995, 2055] },
  { stt: 13, canChi: 'Bính Tý', can: 'Bính', chi: 'Tý', nguhanhCan: 'Hỏa', nguhanhChi: 'Thủy', nguhanhNap: 'Thủy', tenGoiNapAm: 'Giản Hạ Thủy', luanGiaiNgan: 'Nước trong suối nhỏ — linh hoạt và thích nghi, trí tuệ sáng suốt, tìm đường qua mọi chướng ngại.', namDuong: [1936, 1996, 2056] },
  { stt: 14, canChi: 'Đinh Sửu', can: 'Đinh', chi: 'Sửu', nguhanhCan: 'Hỏa', nguhanhChi: 'Thổ', nguhanhNap: 'Thủy', tenGoiNapAm: 'Giản Hạ Thủy', luanGiaiNgan: 'Nước trong suối — kiên nhẫn và bền bỉ, âm thầm xây dựng, thành công qua nỗ lực lâu dài.', namDuong: [1937, 1997, 2057] },
  { stt: 15, canChi: 'Mậu Dần', can: 'Mậu', chi: 'Dần', nguhanhCan: 'Thổ', nguhanhChi: 'Mộc', nguhanhNap: 'Thổ', tenGoiNapAm: 'Thành Đầu Thổ', luanGiaiNgan: 'Đất trên thành lũy — vững chắc và bảo vệ, trách nhiệm cao, là chỗ dựa tin cậy cho người xung quanh.', namDuong: [1938, 1998, 2058] },
  { stt: 16, canChi: 'Kỷ Mão', can: 'Kỷ', chi: 'Mão', nguhanhCan: 'Thổ', nguhanhChi: 'Mộc', nguhanhNap: 'Thổ', tenGoiNapAm: 'Thành Đầu Thổ', luanGiaiNgan: 'Đất trên thành — ổn định và trung thành, biết cách nuôi dưỡng mối quan hệ bền vững.', namDuong: [1939, 1999, 2059] },
  { stt: 17, canChi: 'Canh Thìn', can: 'Canh', chi: 'Thìn', nguhanhCan: 'Kim', nguhanhChi: 'Thổ', nguhanhNap: 'Kim', tenGoiNapAm: 'Bạch Lạp Kim', luanGiaiNgan: 'Kim như bạch lạp (đất sáng) — thuần khiết và chính trực, tiêu chuẩn cao, không thỏa hiệp với điều sai.', namDuong: [1940, 2000, 2060] },
  { stt: 18, canChi: 'Tân Tỵ', can: 'Tân', chi: 'Tỵ', nguhanhCan: 'Kim', nguhanhChi: 'Hỏa', nguhanhNap: 'Kim', tenGoiNapAm: 'Bạch Lạp Kim', luanGiaiNgan: 'Kim bạch lạp — tinh xảo và có chiều sâu, nhạy cảm với vẻ đẹp, thẩm mỹ tinh tế.', namDuong: [1941, 2001, 2061] },
  { stt: 19, canChi: 'Nhâm Ngọ', can: 'Nhâm', chi: 'Ngọ', nguhanhCan: 'Thủy', nguhanhChi: 'Hỏa', nguhanhNap: 'Mộc', tenGoiNapAm: 'Dương Liễu Mộc', luanGiaiNgan: 'Mộc như liễu rủ — uyển chuyển và thích nghi, tư duy sáng tạo, dễ kết nối với nhiều người.', namDuong: [1942, 2002, 2062] },
  { stt: 20, canChi: 'Quý Mùi', can: 'Quý', chi: 'Mùi', nguhanhCan: 'Thủy', nguhanhChi: 'Thổ', nguhanhNap: 'Mộc', tenGoiNapAm: 'Dương Liễu Mộc', luanGiaiNgan: 'Mộc liễu rủ — mềm mại mà kiên cường, trực giác nhạy bén, nghệ thuật và nhân văn.', namDuong: [1943, 2003, 2063] },
  { stt: 21, canChi: 'Giáp Thân', can: 'Giáp', chi: 'Thân', nguhanhCan: 'Mộc', nguhanhChi: 'Kim', nguhanhNap: 'Thủy', tenGoiNapAm: 'Tuyền Trung Thủy', luanGiaiNgan: 'Nước trong suối ngầm — trí tuệ sâu sắc ẩn bên trong, tư duy chiến lược, kiên trì không ngừng.', namDuong: [1944, 2004, 2064] },
  { stt: 22, canChi: 'Ất Dậu', can: 'Ất', chi: 'Dậu', nguhanhCan: 'Mộc', nguhanhChi: 'Kim', nguhanhNap: 'Thủy', tenGoiNapAm: 'Tuyền Trung Thủy', luanGiaiNgan: 'Nước suối ngầm — tinh tế và sâu lắng, tài năng ẩn, phát triển bền vững và lặng lẽ.', namDuong: [1945, 2005, 2065] },
  { stt: 23, canChi: 'Bính Tuất', can: 'Bính', chi: 'Tuất', nguhanhCan: 'Hỏa', nguhanhChi: 'Thổ', nguhanhNap: 'Thổ', tenGoiNapAm: 'Ốc Thượng Thổ', luanGiaiNgan: 'Đất trên mái nhà — che chở và bảo vệ, có trách nhiệm cao với gia đình và cộng đồng.', namDuong: [1946, 2006, 2066] },
  { stt: 24, canChi: 'Đinh Hợi', can: 'Đinh', chi: 'Hợi', nguhanhCan: 'Hỏa', nguhanhChi: 'Thủy', nguhanhNap: 'Thổ', tenGoiNapAm: 'Ốc Thượng Thổ', luanGiaiNgan: 'Đất trên mái — nhân hậu và bao dung, tấm lòng rộng mở, tạo ra nơi chốn bình yên cho người khác.', namDuong: [1947, 2007, 2067] },
  { stt: 25, canChi: 'Mậu Tý', can: 'Mậu', chi: 'Tý', nguhanhCan: 'Thổ', nguhanhChi: 'Thủy', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Tích Lịch Hỏa', luanGiaiNgan: 'Lửa sấm sét — năng lượng bùng phát, đột phá và táo bạo, tạo ra thay đổi nhanh và mạnh mẽ.', namDuong: [1948, 2008, 2068] },
  { stt: 26, canChi: 'Kỷ Sửu', can: 'Kỷ', chi: 'Sửu', nguhanhCan: 'Thổ', nguhanhChi: 'Thổ', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Tích Lịch Hỏa', luanGiaiNgan: 'Lửa sấm sét — tiềm năng lớn bên trong vẻ ngoài bình lặng, khi cần có thể tạo ra ảnh hưởng rộng lớn.', namDuong: [1949, 2009, 2069] },
  { stt: 27, canChi: 'Canh Dần', can: 'Canh', chi: 'Dần', nguhanhCan: 'Kim', nguhanhChi: 'Mộc', nguhanhNap: 'Mộc', tenGoiNapAm: 'Tùng Bách Mộc', luanGiaiNgan: 'Mộc tùng bách — vươn cao và bền vững, phẩm giá cao quý, vượt qua thử thách như cây thông qua gió bão.', namDuong: [1950, 2010, 2070] },
  { stt: 28, canChi: 'Tân Mão', can: 'Tân', chi: 'Mão', nguhanhCan: 'Kim', nguhanhChi: 'Mộc', nguhanhNap: 'Mộc', tenGoiNapAm: 'Tùng Bách Mộc', luanGiaiNgan: 'Mộc tùng bách — phong thái thanh cao, kiên định trước cám dỗ, tiêu chuẩn sống cao.', namDuong: [1951, 2011, 2071] },
  { stt: 29, canChi: 'Nhâm Thìn', can: 'Nhâm', chi: 'Thìn', nguhanhCan: 'Thủy', nguhanhChi: 'Thổ', nguhanhNap: 'Thủy', tenGoiNapAm: 'Trường Lưu Thủy', luanGiaiNgan: 'Nước chảy dài — bao quát và linh hoạt, tư duy rộng mở, thành công qua sự kiên trì liên tục.', namDuong: [1952, 2012, 2072] },
  { stt: 30, canChi: 'Quý Tỵ', can: 'Quý', chi: 'Tỵ', nguhanhCan: 'Thủy', nguhanhChi: 'Hỏa', nguhanhNap: 'Thủy', tenGoiNapAm: 'Trường Lưu Thủy', luanGiaiNgan: 'Nước chảy dài — sâu sắc và bền bỉ, nhạy cảm và đồng cảm, hiểu người khác sâu.', namDuong: [1953, 2013, 2073] },
  { stt: 31, canChi: 'Giáp Ngọ', can: 'Giáp', chi: 'Ngọ', nguhanhCan: 'Mộc', nguhanhChi: 'Hỏa', nguhanhNap: 'Kim', tenGoiNapAm: 'Sa Trung Kim', luanGiaiNgan: 'Kim trong cát — tài năng ẩn giấu, cần khai phá đúng cách mới phát huy, tiềm năng lớn đang chờ đợi.', namDuong: [1954, 2014, 2074] },
  { stt: 32, canChi: 'Ất Mùi', can: 'Ất', chi: 'Mùi', nguhanhCan: 'Mộc', nguhanhChi: 'Thổ', nguhanhNap: 'Kim', tenGoiNapAm: 'Sa Trung Kim', luanGiaiNgan: 'Kim trong cát — không phô trương, tài năng và giá trị bộc lộ dần theo thời gian và thử thách.', namDuong: [1955, 2015, 2075] },
  { stt: 33, canChi: 'Bính Thân', can: 'Bính', chi: 'Thân', nguhanhCan: 'Hỏa', nguhanhChi: 'Kim', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Sơn Hạ Hỏa', luanGiaiNgan: 'Lửa dưới chân núi — năng lượng bùng cháy từ nền tảng vững chắc, lãnh đạo bằng sức mạnh và ổn định.', namDuong: [1956, 2016, 2076] },
  { stt: 34, canChi: 'Đinh Dậu', can: 'Đinh', chi: 'Dậu', nguhanhCan: 'Hỏa', nguhanhChi: 'Kim', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Sơn Hạ Hỏa', luanGiaiNgan: 'Lửa dưới núi — sâu sắc và bền vững, tài năng tinh tế, nghệ thuật và trực giác mạnh.', namDuong: [1957, 2017, 2077] },
  { stt: 35, canChi: 'Mậu Tuất', can: 'Mậu', chi: 'Tuất', nguhanhCan: 'Thổ', nguhanhChi: 'Thổ', nguhanhNap: 'Mộc', tenGoiNapAm: 'Bình Địa Mộc', luanGiaiNgan: 'Mộc đồng bằng — tăng trưởng ổn định và bền vững, gốc rễ sâu chắc, xây dựng từng bước vững chắc.', namDuong: [1958, 2018, 2078] },
  { stt: 36, canChi: 'Kỷ Hợi', can: 'Kỷ', chi: 'Hợi', nguhanhCan: 'Thổ', nguhanhChi: 'Thủy', nguhanhNap: 'Mộc', tenGoiNapAm: 'Bình Địa Mộc', luanGiaiNgan: 'Mộc đồng bằng — rộng rãi và đều đặn, nuôi dưỡng và chăm sóc người xung quanh một cách kiên nhẫn.', namDuong: [1959, 2019, 2079] },
  { stt: 37, canChi: 'Canh Tý', can: 'Canh', chi: 'Tý', nguhanhCan: 'Kim', nguhanhChi: 'Thủy', nguhanhNap: 'Thổ', tenGoiNapAm: 'Bích Thượng Thổ', luanGiaiNgan: 'Đất trên tường — vững chắc và bảo vệ, cứng rắn nhưng che chở, khả năng chịu đựng phi thường.', namDuong: [1960, 2020, 2080] },
  { stt: 38, canChi: 'Tân Sửu', can: 'Tân', chi: 'Sửu', nguhanhCan: 'Kim', nguhanhChi: 'Thổ', nguhanhNap: 'Thổ', tenGoiNapAm: 'Bích Thượng Thổ', luanGiaiNgan: 'Đất trên tường — tinh tế trong sự bền vững, thẩm mỹ và chất lượng, xây dựng vẻ đẹp lâu dài.', namDuong: [1961, 2021, 2081] },
  { stt: 39, canChi: 'Nhâm Dần', can: 'Nhâm', chi: 'Dần', nguhanhCan: 'Thủy', nguhanhChi: 'Mộc', nguhanhNap: 'Kim', tenGoiNapAm: 'Kim Bạch Kim', luanGiaiNgan: 'Kim sáng như vàng bạc — sắc sảo và có giá trị, trực giác chiến lược xuất sắc, dẫn đầu bằng trí tuệ.', namDuong: [1962, 2022, 2082] },
  { stt: 40, canChi: 'Quý Mão', can: 'Quý', chi: 'Mão', nguhanhCan: 'Thủy', nguhanhChi: 'Mộc', nguhanhNap: 'Kim', tenGoiNapAm: 'Kim Bạch Kim', luanGiaiNgan: 'Kim sáng — sự tinh tế và nhạy cảm kết hợp với giá trị thật sự, thường được người khác trân trọng muộn.', namDuong: [1963, 2023, 2083] },
  { stt: 41, canChi: 'Giáp Thìn', can: 'Giáp', chi: 'Thìn', nguhanhCan: 'Mộc', nguhanhChi: 'Thổ', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Phúc Đăng Hỏa', luanGiaiNgan: 'Lửa đèn phúc — chiếu sáng và hướng dẫn người khác, lý tưởng cao, sứ mệnh truyền cảm hứng.', namDuong: [1964, 2024, 2084] },
  { stt: 42, canChi: 'Ất Tỵ', can: 'Ất', chi: 'Tỵ', nguhanhCan: 'Mộc', nguhanhChi: 'Hỏa', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Phúc Đăng Hỏa', luanGiaiNgan: 'Lửa đèn phúc — ấm áp và lan tỏa, nghệ thuật và tâm hồn phong phú, đem lại may mắn cho người xung quanh.', namDuong: [1965, 2025, 2085] },
  { stt: 43, canChi: 'Bính Ngọ', can: 'Bính', chi: 'Ngọ', nguhanhCan: 'Hỏa', nguhanhChi: 'Hỏa', nguhanhNap: 'Thủy', tenGoiNapAm: 'Thiên Hà Thủy', luanGiaiNgan: 'Nước sông thiên hà — bao la và hào phóng, tầm nhìn vũ trụ, sức ảnh hưởng rộng lớn.', namDuong: [1966, 2026, 2086] },
  { stt: 44, canChi: 'Đinh Mùi', can: 'Đinh', chi: 'Mùi', nguhanhCan: 'Hỏa', nguhanhChi: 'Thổ', nguhanhNap: 'Thủy', tenGoiNapAm: 'Thiên Hà Thủy', luanGiaiNgan: 'Nước thiên hà — nhân hậu và đại lượng, khả năng bao dung và thấu hiểu đặc biệt sâu sắc.', namDuong: [1967, 2027, 2087] },
  { stt: 45, canChi: 'Mậu Thân', can: 'Mậu', chi: 'Thân', nguhanhCan: 'Thổ', nguhanhChi: 'Kim', nguhanhNap: 'Thổ', tenGoiNapAm: 'Đại Dịch Thổ', luanGiaiNgan: 'Đất đại dịch — ổn định và mạnh mẽ, có thể tiếp nhận mọi thay đổi mà không bị lung lay.', namDuong: [1968, 2028, 2088] },
  { stt: 46, canChi: 'Kỷ Dậu', can: 'Kỷ', chi: 'Dậu', nguhanhCan: 'Thổ', nguhanhChi: 'Kim', nguhanhNap: 'Thổ', tenGoiNapAm: 'Đại Dịch Thổ', luanGiaiNgan: 'Đất đại dịch — sự bao la và tiếp nhận, kiên nhẫn không giới hạn, nuôi dưỡng với sự khéo léo.', namDuong: [1969, 2029, 2089] },
  { stt: 47, canChi: 'Canh Tuất', can: 'Canh', chi: 'Tuất', nguhanhCan: 'Kim', nguhanhChi: 'Thổ', nguhanhNap: 'Kim', tenGoiNapAm: 'Thoa Xuyến Kim', luanGiaiNgan: 'Kim trang sức — giá trị thật sự, được trân trọng và công nhận, sự thành thạo và hoàn thiện.', namDuong: [1970, 2030, 2090] },
  { stt: 48, canChi: 'Tân Hợi', can: 'Tân', chi: 'Hợi', nguhanhCan: 'Kim', nguhanhChi: 'Thủy', nguhanhNap: 'Kim', tenGoiNapAm: 'Thoa Xuyến Kim', luanGiaiNgan: 'Kim trang sức — vẻ đẹp và giá trị, nhạy cảm với nghệ thuật, tài năng phát huy trong môi trường tốt.', namDuong: [1971, 2031, 2091] },
  { stt: 49, canChi: 'Nhâm Tý', can: 'Nhâm', chi: 'Tý', nguhanhCan: 'Thủy', nguhanhChi: 'Thủy', nguhanhNap: 'Mộc', tenGoiNapAm: 'Tang Đố Mộc', luanGiaiNgan: 'Mộc dâu tằm — tuy nhỏ nhưng quý giá, kiên trì và nhẫn nại, tạo ra kết quả đặc biệt theo thời gian.', namDuong: [1972, 2032, 2092] },
  { stt: 50, canChi: 'Quý Sửu', can: 'Quý', chi: 'Sửu', nguhanhCan: 'Thủy', nguhanhChi: 'Thổ', nguhanhNap: 'Mộc', tenGoiNapAm: 'Tang Đố Mộc', luanGiaiNgan: 'Mộc dâu tằm — tài năng nuôi dưỡng người khác, đóng góp âm thầm nhưng không thể thiếu.', namDuong: [1973, 2033, 2093] },
  { stt: 51, canChi: 'Giáp Dần', can: 'Giáp', chi: 'Dần', nguhanhCan: 'Mộc', nguhanhChi: 'Mộc', nguhanhNap: 'Thủy', tenGoiNapAm: 'Đại Khê Thủy', luanGiaiNgan: 'Nước suối lớn — tràn đầy năng lượng và chảy mạnh, tư duy chiến lược, tiên phong không ngại rủi ro.', namDuong: [1974, 2034, 2094] },
  { stt: 52, canChi: 'Ất Mão', can: 'Ất', chi: 'Mão', nguhanhCan: 'Mộc', nguhanhChi: 'Mộc', nguhanhNap: 'Thủy', tenGoiNapAm: 'Đại Khê Thủy', luanGiaiNgan: 'Nước suối lớn — uyển chuyển và phong phú, tài năng đa dạng, kết nối và nuôi dưỡng mọi thứ xung quanh.', namDuong: [1975, 2035, 2095] },
  { stt: 53, canChi: 'Bính Thìn', can: 'Bính', chi: 'Thìn', nguhanhCan: 'Hỏa', nguhanhChi: 'Thổ', nguhanhNap: 'Thổ', tenGoiNapAm: 'Sa Trung Thổ', luanGiaiNgan: 'Đất trong cát — thực dụng và thích nghi, tìm cách phát triển trong mọi hoàn cảnh dù khó khăn.', namDuong: [1976, 2036, 2096] },
  { stt: 54, canChi: 'Đinh Tỵ', can: 'Đinh', chi: 'Tỵ', nguhanhCan: 'Hỏa', nguhanhChi: 'Hỏa', nguhanhNap: 'Thổ', tenGoiNapAm: 'Sa Trung Thổ', luanGiaiNgan: 'Đất trong cát — tinh tế và kiên trì, tài năng thường bộc lộ muộn nhưng bền vững theo thời gian.', namDuong: [1977, 2037, 2097] },
  { stt: 55, canChi: 'Mậu Ngọ', can: 'Mậu', chi: 'Ngọ', nguhanhCan: 'Thổ', nguhanhChi: 'Hỏa', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Thiên Thượng Hỏa', luanGiaiNgan: 'Lửa trên trời — rực rỡ và bao quát, tầm nhìn vĩ đại, ảnh hưởng đến nhiều người và có sứ mệnh lớn.', namDuong: [1978, 2038, 2098] },
  { stt: 56, canChi: 'Kỷ Mùi', can: 'Kỷ', chi: 'Mùi', nguhanhCan: 'Thổ', nguhanhChi: 'Thổ', nguhanhNap: 'Hỏa', tenGoiNapAm: 'Thiên Thượng Hỏa', luanGiaiNgan: 'Lửa trên trời — ấm áp và lan tỏa rộng, tấm lòng rộng lớn, ảnh hưởng tích cực đến cộng đồng.', namDuong: [1979, 2039, 2099] },
  { stt: 57, canChi: 'Canh Thân', can: 'Canh', chi: 'Thân', nguhanhCan: 'Kim', nguhanhChi: 'Kim', nguhanhNap: 'Mộc', tenGoiNapAm: 'Thạch Lựu Mộc', luanGiaiNgan: 'Mộc lựu đá — kiên cường trong nghịch cảnh, tài năng nảy sinh từ khó khăn, sức bền đặc biệt.', namDuong: [1980, 2040, 2100] },
  { stt: 58, canChi: 'Tân Dậu', can: 'Tân', chi: 'Dậu', nguhanhCan: 'Kim', nguhanhChi: 'Kim', nguhanhNap: 'Mộc', tenGoiNapAm: 'Thạch Lựu Mộc', luanGiaiNgan: 'Mộc lựu đá — vẻ đẹp và sức mạnh ẩn trong vỏ cứng, tinh tế và bền bỉ, giá trị thật sự bộc lộ qua thử thách.', namDuong: [1981, 2041, 2101] },
  { stt: 59, canChi: 'Nhâm Tuất', can: 'Nhâm', chi: 'Tuất', nguhanhCan: 'Thủy', nguhanhChi: 'Thổ', nguhanhNap: 'Thủy', tenGoiNapAm: 'Đại Hải Thủy', luanGiaiNgan: 'Nước đại dương — bao la và sâu thẳm, chứa đựng tất cả, trí tuệ vô hạn và lòng bao dung không biên giới.', namDuong: [1982, 2042, 2102] },
  { stt: 60, canChi: 'Quý Hợi', can: 'Quý', chi: 'Hợi', nguhanhCan: 'Thủy', nguhanhChi: 'Thủy', nguhanhNap: 'Thủy', tenGoiNapAm: 'Đại Hải Thủy', luanGiaiNgan: 'Nước đại dương — kết thúc và khởi đầu chu kỳ, sự hoàn thành và tái sinh, trí tuệ tích lũy cả một vòng 60 năm.', namDuong: [1983, 2043, 2103] },
]

// Helper: lấy Hoa Giáp từ năm dương lịch
export function getHoaGiapFromYear(year: number): HoaGiapInfo {
  // Năm 1924 = Giáp Tý (stt 1)
  const idx = ((year - 1924) % 60 + 60) % 60
  return HOA_GIAP[idx]
}

// Helper: lấy Can Năm từ năm DL
export function getCanNam(year: number): string {
  const idx = ((year - 1924) % 10 + 10) % 10
  return THIEN_CAN_VI[idx]
}

// Helper: lấy Chi Năm từ năm DL
export function getChiNam(year: number): string {
  const idx = ((year - 1924) % 12 + 12) % 12
  return DIA_CHI_VI[idx]
}

// Helper: lấy Con Giáp từ năm DL
export function getConGiap(year: number): string {
  const idx = ((year - 1924) % 12 + 12) % 12
  return CON_GIAP[idx]
}

// ============================================================
// PHẦN 2 — 12 CON GIÁP
// ============================================================

export interface ConGiapProfile {
  chi: string
  conGiap: string
  nguhanhChi: string
  tenGoiThanThien: string
  tinhCach: string        // 3-4 câu
  diemManh: string[]      // 4 bullet
  diemYeu: string[]       // 3 bullet
  phongCachLamViec: string
  tinhDuyen: string
  ngheNghiep: string[]
  mauSacHop: string[]
  soHop: number[]
  conGiapHop: string[]    // Tam hợp + Lục hợp
  conGiapXung: string[]   // Xung
  affirmation: string
}

export const CON_GIAP_DATA: Record<string, ConGiapProfile> = {

  'Tý': {
    chi: 'Tý', conGiap: 'Chuột',
    nguhanhChi: 'Thủy',
    tenGoiThanThien: 'Chuột — Trí Tuệ Nhanh Nhạy',
    tinhCach: 'Người tuổi Tý có trí thông minh lanh lợi và khả năng quan sát tinh tế. Họ có thể đánh giá tình huống nhanh chóng và luôn tìm được cách thoát ra khỏi khó khăn. Thích nghi nhanh với môi trường mới, nhưng cũng hay lo lắng và thiếu kiên nhẫn. Ẩn trong vẻ ngoài nhỏ bé là trí tuệ và tham vọng không nhỏ.',
    diemManh: ['Trí tuệ nhanh nhạy và khả năng ứng biến tuyệt vời', 'Quan sát tinh tế — nhận ra cơ hội trước người khác', 'Tiết kiệm và quản lý tài chính giỏi', 'Linh hoạt và thích nghi tốt với môi trường mới'],
    diemYeu: ['Hay lo lắng thái quá và đôi khi nhỏ mọn', 'Thiếu kiên nhẫn với quá trình chậm chạp', 'Đôi khi quá tính toán trong các mối quan hệ'],
    phongCachLamViec: 'Tuổi Tý làm việc hiệu quả trong môi trường đòi hỏi sự nhanh nhẹn và linh hoạt. Họ giỏi xử lý nhiều việc cùng lúc và tìm ra giải pháp sáng tạo. Không thích bị kiểm soát chặt chẽ — cần không gian để tự phát huy.',
    tinhDuyen: 'Tuổi Tý yêu thận trọng và chọn lọc — không dễ mở lòng nhưng khi đã yêu thì chu đáo và quan tâm. Cần người đủ thông minh để theo kịp và đủ kiên nhẫn để đợi họ tin tưởng.',
    ngheNghiep: ['Tài chính / Đầu tư', 'Công nghệ thông tin', 'Nghiên cứu / Phân tích', 'Truyền thông', 'Kinh doanh'],
    mauSacHop: ['Đen', 'Xanh navy', 'Trắng'],
    soHop: [3, 8],
    conGiapHop: ['Thìn (Tam hợp)', 'Thân (Tam hợp)', 'Sửu (Lục hợp)'],
    conGiapXung: ['Ngọ'],
    affirmation: 'Trí tuệ và linh hoạt của tôi mở ra mọi cánh cửa cơ hội.',
  },

  'Sửu': {
    chi: 'Sửu', conGiap: 'Trâu',
    nguhanhChi: 'Thổ',
    tenGoiThanThien: 'Trâu — Kiên Nhẫn Bền Bỉ',
    tinhCach: 'Người tuổi Sửu mang tính cách của con trâu — cần mẫn, kiên nhẫn và đáng tin cậy tuyệt đối. Họ không nói nhiều nhưng làm nhiều, và những gì đã cam kết thì nhất định hoàn thành. Bảo thủ trong quan điểm nhưng lại là người bạn đời, người bạn trung thành nhất. Thành công thường đến muộn nhưng rất bền vững.',
    diemManh: ['Kiên nhẫn và bền bỉ phi thường — không bỏ cuộc giữa chừng', 'Trung thành và đáng tin cậy tuyệt đối', 'Làm việc cần mẫn và kỷ luật cao', 'Thực dụng và quản lý tốt nguồn lực'],
    diemYeu: ['Bảo thủ và khó tiếp thu ý kiến mới', 'Chậm thích nghi với thay đổi', 'Đôi khi cứng nhắc và thiếu linh hoạt'],
    phongCachLamViec: 'Tuổi Sửu là trụ cột đáng tin cậy trong mọi tổ chức. Họ không cần hào quang nhưng đảm bảo mọi việc được hoàn thành đúng hạn và chất lượng. Môi trường ổn định với quy trình rõ ràng phù hợp nhất.',
    tinhDuyen: 'Tuổi Sửu yêu ít nhưng yêu sâu — một khi đã chọn người, ít khi thay đổi. Thể hiện tình cảm qua hành động thực tế hơn lời nói. Cần đối phương nhận ra tình yêu ẩn trong sự quan tâm bình dị hàng ngày.',
    ngheNghiep: ['Nông nghiệp / Xây dựng', 'Y tế / Dược', 'Tài chính / Kế toán', 'Hành chính', 'Kỹ thuật'],
    mauSacHop: ['Vàng', 'Nâu đất', 'Xanh lá'],
    soHop: [2, 7],
    conGiapHop: ['Tỵ (Tam hợp)', 'Dậu (Tam hợp)', 'Tý (Lục hợp)'],
    conGiapXung: ['Mùi'],
    affirmation: 'Sự kiên trì của tôi xây dựng những thứ bền vững mà người khác không thể.',
  },

  'Dần': {
    chi: 'Dần', conGiap: 'Hổ',
    nguhanhChi: 'Mộc',
    tenGoiThanThien: 'Hổ — Dũng Mãnh Oai Phong',
    tinhCach: 'Người tuổi Dần mang khí chất của chúa sơn lâm — oai phong, dũng cảm và không thể bị khuất phục. Họ sinh ra để dẫn đầu và thường tìm được vị trí lãnh đạo dù không cố ý. Nhiệt huyết cao, hành động quyết đoán, nhưng cũng dễ bốc đồng. Không chịu được bất công và sẵn sàng bảo vệ người yếu.',
    diemManh: ['Lãnh đạo tự nhiên — thu hút người đi theo', 'Dũng cảm và quyết đoán trong mọi tình huống', 'Nhiệt huyết cao, truyền cảm hứng cho người xung quanh', 'Bảo vệ mạnh mẽ những người họ yêu thương'],
    diemYeu: ['Bốc đồng và đôi khi hành động trước khi suy nghĩ', 'Khó chịu khi bị kiểm soát hoặc giới hạn', 'Tự ái cao, khó thừa nhận sai lầm'],
    phongCachLamViec: 'Tuổi Dần không phù hợp với vai trò phụ tá — họ cần được trao quyền và trách nhiệm thực sự. Môi trường cạnh tranh và thách thức là sân chơi lý tưởng của họ.',
    tinhDuyen: 'Tuổi Dần yêu mãnh liệt và bảo vệ — người bạn đời luôn cảm thấy an toàn. Nhưng cần người đủ bản lĩnh để không bị áp đảo bởi cá tính mạnh mẽ của họ.',
    ngheNghiep: ['Quân sự / An ninh', 'Chính trị / Lãnh đạo', 'Doanh nhân', 'Pháp lý', 'Thể thao tranh tài'],
    mauSacHop: ['Xanh lá', 'Xanh dương', 'Vàng'],
    soHop: [1, 6],
    conGiapHop: ['Ngọ (Tam hợp)', 'Tuất (Tam hợp)', 'Hợi (Lục hợp)'],
    conGiapXung: ['Thân'],
    affirmation: 'Sức mạnh và lòng dũng cảm của tôi mở đường cho những điều vĩ đại.',
  },

  'Mão': {
    chi: 'Mão', conGiap: 'Mèo',
    nguhanhChi: 'Mộc',
    tenGoiThanThien: 'Mèo — Tinh Tế Duyên Dáng',
    tinhCach: 'Người tuổi Mão có vẻ duyên dáng và tinh tế tự nhiên — họ có mặt ở đâu là nơi đó dễ chịu và duyên dáng hơn. Nhạy cảm và có khiếu thẩm mỹ cao, ghét sự thô lỗ và bạo lực. Thông minh và biết cách đạt được điều mình muốn mà không cần đối đầu trực tiếp. Ngoại giao khéo léo là điểm mạnh đặc biệt.',
    diemManh: ['Tinh tế, duyên dáng và có sức hút tự nhiên', 'Khiếu thẩm mỹ và nghệ thuật xuất sắc', 'Ngoại giao và khéo léo trong ứng xử', 'Trực giác về con người rất nhạy bén'],
    diemYeu: ['Đôi khi quá thận trọng và do dự', 'Né tránh xung đột có thể dẫn đến vấn đề tích tụ', 'Dễ bị ảnh hưởng bởi môi trường tiêu cực'],
    phongCachLamViec: 'Tuổi Mão làm việc tốt trong môi trường hài hòa và thẩm mỹ. Xuất sắc trong các vai trò cần sự tinh tế và khả năng giao tiếp. Không phù hợp với môi trường ồn ào và áp lực liên tục.',
    tinhDuyen: 'Tuổi Mão yêu lãng mạn và tinh tế — mỗi khoảnh khắc được chắt chiu. Cần môi trường tình cảm an toàn và tôn trọng để phát triển mối quan hệ sâu sắc.',
    ngheNghiep: ['Nghệ thuật / Thiết kế', 'Ngoại giao / PR', 'Giáo dục', 'Y tế / Chăm sóc', 'Tư vấn'],
    mauSacHop: ['Xanh lá nhạt', 'Hồng', 'Trắng'],
    soHop: [3, 8],
    conGiapHop: ['Mùi (Tam hợp)', 'Hợi (Tam hợp)', 'Tuất (Lục hợp)'],
    conGiapXung: ['Dậu'],
    affirmation: 'Sự tinh tế và duyên dáng của tôi tạo ra vẻ đẹp trong mọi nơi tôi đến.',
  },

  'Thìn': {
    chi: 'Thìn', conGiap: 'Rồng',
    nguhanhChi: 'Thổ',
    tenGoiThanThien: 'Rồng — Khí Phách Hào Hùng',
    tinhCach: 'Người tuổi Thìn mang khí chất của rồng — hào phóng, tự tin và đầy sức sống. Họ không ngại thách thức và thường theo đuổi những mục tiêu lớn hơn người bình thường. Cuộc đời thường có nhiều biến chuyển thăng trầm, nhưng họ có sức phục hồi phi thường. Tài năng đa dạng và thường có sức hút khó cưỡng.',
    diemManh: ['Tài năng đa dạng và sức hút cá nhân mạnh mẽ', 'Dũng cảm theo đuổi mục tiêu lớn', 'Sức phục hồi phi thường sau thất bại', 'Hào phóng và rộng lượng với người xung quanh'],
    diemYeu: ['Cuộc đời hay có biến động, thiếu ổn định', 'Đôi khi quá tự tin dẫn đến sai lầm', 'Có xu hướng mâu thuẫn nội tâm'],
    phongCachLamViec: 'Tuổi Thìn cần sân khấu xứng tầm với tài năng của mình. Họ làm tốt trong vai trò đòi hỏi sự sáng tạo và táo bạo. Môi trường nhỏ hẹp và bị kiểm soát sẽ kìm hãm tiềm năng của họ.',
    tinhDuyen: 'Tình duyên tuổi Thìn thường có nhiều biến chuyển — đến muộn hoặc trải qua nhiều giai đoạn. Khi đúng người, họ yêu hết lòng và trung thành. Cần người đủ bản lĩnh theo kịp nhịp sống của họ.',
    ngheNghiep: ['Doanh nhân / Khởi nghiệp', 'Chính trị / Lãnh đạo', 'Nghệ thuật / Giải trí', 'Nghiên cứu / Khám phá', 'Tài chính lớn'],
    mauSacHop: ['Vàng đất', 'Xanh lá', 'Tím'],
    soHop: [4, 9],
    conGiapHop: ['Tý (Tam hợp)', 'Thân (Tam hợp)', 'Dậu (Lục hợp)'],
    conGiapXung: ['Tuất'],
    affirmation: 'Tôi sinh ra để bay cao — mỗi thử thách là bàn đạp cho sự vĩ đại.',
  },

  'Tỵ': {
    chi: 'Tỵ', conGiap: 'Rắn',
    nguhanhChi: 'Hỏa',
    tenGoiThanThien: 'Rắn — Trí Tuệ Thâm Sâu',
    tinhCach: 'Người tuổi Tỵ có chiều sâu trí tuệ và trực giác đặc biệt sắc bén. Họ quan sát nhiều hơn nói, suy nghĩ trước khi hành động, và hiểu người khác sâu hơn người khác hiểu về họ. Bí ẩn và khó đoán là đặc điểm nổi bật. Có tài năng chiến lược và thường thành công trong các kế hoạch dài hạn.',
    diemManh: ['Trực giác sắc bén và trí tuệ phân tích sâu', 'Chiến lược dài hạn và kiên nhẫn phi thường', 'Quan sát tinh tế — biết người trước khi người biết mình', 'Quyết đoán khi đã quyết định'],
    diemYeu: ['Quá bí ẩn khiến người khác khó tiếp cận', 'Đôi khi ghen tuông và chiếm hữu thái quá', 'Khó tha thứ khi bị phản bội'],
    phongCachLamViec: 'Tuổi Tỵ làm việc tốt trong các lĩnh vực đòi hỏi tư duy chiến lược và phân tích sâu. Không cần được nhìn thấy — họ thích làm việc ẩn và để kết quả tự nói lên.',
    tinhDuyen: 'Tuổi Tỵ yêu sâu và chiếm hữu — khi đã yêu, họ đầu tư hoàn toàn. Cần người đủ tự tin và minh bạch để không kích thích sự ghen tuông của họ.',
    ngheNghiep: ['Nghiên cứu / Phân tích', 'Tài chính / Đầu tư', 'Tâm lý / Tư vấn', 'Y học', 'Chiến lược kinh doanh'],
    mauSacHop: ['Đỏ', 'Vàng', 'Đen'],
    soHop: [2, 7],
    conGiapHop: ['Sửu (Tam hợp)', 'Dậu (Tam hợp)', 'Thân (Lục hợp)'],
    conGiapXung: ['Hợi'],
    affirmation: 'Trí tuệ và trực giác của tôi nhìn thấy điều người khác không thể.',
  },

  'Ngọ': {
    chi: 'Ngọ', conGiap: 'Ngựa',
    nguhanhChi: 'Hỏa',
    tenGoiThanThien: 'Ngựa — Tự Do Phóng Khoáng',
    tinhCach: 'Người tuổi Ngọ mang tinh thần tự do không thể giam cầm — năng động, phóng khoáng và luôn tiến về phía trước. Họ ghét sự gò bó và routine nhàm chán. Nhiệt huyết và lạc quan cao, dễ truyền cảm hứng cho người khác. Thích nghi nhanh và luôn tìm cách mới để tiến thêm một bước.',
    diemManh: ['Năng lượng cao và sức sống mãnh liệt', 'Tự do, phóng khoáng — không bị giam cầm bởi rào cản', 'Lạc quan và truyền cảm hứng tự nhiên', 'Hành động quyết đoán và nhanh chóng'],
    diemYeu: ['Thiếu kiên nhẫn và hay thay đổi hướng đi', 'Khó duy trì cam kết dài hạn trong một số lĩnh vực', 'Đôi khi bốc đồng và thiếu suy xét'],
    phongCachLamViec: 'Tuổi Ngọ cần công việc năng động với sự đa dạng liên tục. Không phù hợp với công việc lặp đi lặp lại trong văn phòng nhỏ. Xuất sắc trong sales, truyền thông và các vai trò cần sự di chuyển và giao tiếp.',
    tinhDuyen: 'Tuổi Ngọ yêu rực rỡ và cuồng nhiệt — mỗi ngày là một cuộc phiêu lưu. Cần người đủ tự do và bản lĩnh để theo kịp nhịp sống sôi động của họ.',
    ngheNghiep: ['Sales / Kinh doanh', 'Truyền thông / Marketing', 'Du lịch / Khám phá', 'Thể thao / Giải trí', 'Chính trị'],
    mauSacHop: ['Đỏ', 'Cam', 'Xanh lá'],
    soHop: [1, 6],
    conGiapHop: ['Dần (Tam hợp)', 'Tuất (Tam hợp)', 'Mùi (Lục hợp)'],
    conGiapXung: ['Tý'],
    affirmation: 'Tôi tự do và mạnh mẽ — không gì có thể ngăn tôi tiến về phía trước.',
  },

  'Mùi': {
    chi: 'Mùi', conGiap: 'Dê',
    nguhanhChi: 'Thổ',
    tenGoiThanThien: 'Dê — Nhân Hậu Từ Bi',
    tinhCach: 'Người tuổi Mùi mang tâm hồn nhân hậu và thẩm mỹ tinh tế. Họ quan tâm đến người khác một cách chân thành và có tài năng sáng tạo đặc biệt. Môi trường hài hòa và đẹp đẽ rất quan trọng với họ — bất hòa và bạo lực làm họ khó chịu sâu sắc. Thường được người yêu thương và bảo vệ.',
    diemManh: ['Nhân hậu và quan tâm chân thành', 'Thẩm mỹ và sáng tạo nghệ thuật', 'Nuôi dưỡng và giữ gìn mối quan hệ tốt', 'Trực giác và cảm xúc phong phú'],
    diemYeu: ['Đôi khi quá nhạy cảm và dễ bị tổn thương', 'Khó đưa ra quyết định mạnh mẽ khi cần', 'Hay phụ thuộc vào người khác quá nhiều'],
    phongCachLamViec: 'Tuổi Mùi làm việc tốt trong môi trường hài hòa và sáng tạo. Xuất sắc trong các vai trò chăm sóc và nghệ thuật. Không phù hợp với môi trường cạnh tranh khắc nghiệt.',
    tinhDuyen: 'Tuổi Mùi yêu chân thành và nuôi dưỡng — đối phương luôn cảm thấy được quan tâm. Cần người đủ mạnh để bảo vệ họ và không lợi dụng lòng tốt.',
    ngheNghiep: ['Nghệ thuật / Thiết kế', 'Y tế / Chăm sóc', 'Giáo dục', 'Ẩm thực / Hospitality', 'Tư vấn'],
    mauSacHop: ['Xanh lá nhạt', 'Hồng', 'Vàng'],
    soHop: [3, 8],
    conGiapHop: ['Mão (Tam hợp)', 'Hợi (Tam hợp)', 'Ngọ (Lục hợp)'],
    conGiapXung: ['Sửu'],
    affirmation: 'Tình yêu thương và sự sáng tạo của tôi làm đẹp thế giới xung quanh.',
  },

  'Thân': {
    chi: 'Thân', conGiap: 'Khỉ',
    nguhanhChi: 'Kim',
    tenGoiThanThien: 'Khỉ — Thông Minh Đa Tài',
    tinhCach: 'Người tuổi Thân nổi bật với trí thông minh nhanh nhạy và sự đa tài. Họ học hỏi nhanh, thích nghi tốt và có khả năng giải quyết vấn đề sáng tạo. Vui vẻ và hài hước, dễ gây thiện cảm với mọi người. Đôi khi quá thông minh đến mức hay tự tạo phức tạp cho bản thân.',
    diemManh: ['Trí thông minh nhanh nhạy và đa tài', 'Linh hoạt và thích nghi xuất sắc', 'Hài hước và vui vẻ — tạo không khí tích cực', 'Giải quyết vấn đề sáng tạo và hiệu quả'],
    diemYeu: ['Đôi khi thiếu kiên trì vì quá dễ bỏ thứ cũ', 'Hay phân tán vì quá nhiều hướng quan tâm', 'Đôi khi cơ hội chủ nghĩa'],
    phongCachLamViec: 'Tuổi Thân cần môi trường đa dạng và không nhàm chán. Họ giỏi trong các vai trò đòi hỏi sáng tạo và xử lý vấn đề mới. Không phù hợp với công việc đơn điệu lặp lại.',
    tinhDuyen: 'Tuổi Thân yêu vui vẻ và năng động — mỗi ngày phải có điều mới. Cần người đủ thú vị để giữ sự chú ý lâu dài và đủ ổn định để là điểm neo.',
    ngheNghiep: ['Công nghệ / Lập trình', 'Kinh doanh / Trade', 'Truyền thông', 'Nghiên cứu', 'Giải trí'],
    mauSacHop: ['Trắng', 'Xanh lá', 'Vàng'],
    soHop: [4, 9],
    conGiapHop: ['Tý (Tam hợp)', 'Thìn (Tam hợp)', 'Tỵ (Lục hợp)'],
    conGiapXung: ['Dần'],
    affirmation: 'Trí tuệ và sự linh hoạt của tôi tìm được con đường qua mọi thử thách.',
  },

  'Dậu': {
    chi: 'Dậu', conGiap: 'Gà',
    nguhanhChi: 'Kim',
    tenGoiThanThien: 'Gà — Tinh Tế Cầu Toàn',
    tinhCach: 'Người tuổi Dậu có óc quan sát tinh tường và tiêu chuẩn cao trong mọi việc. Họ chú ý đến từng chi tiết nhỏ và không thể chấp nhận sự cẩu thả. Thẳng thắn đến mức đôi khi gây phật lòng, nhưng luôn với ý định tốt. Có khiếu thẩm mỹ cao và thường xuất hiện ăn mặc gọn gàng, chỉnh tề.',
    diemManh: ['Tinh tế, chú ý chi tiết và tiêu chuẩn cao', 'Thẳng thắn và trung thực — không nói một đằng làm một nẻo', 'Tổ chức và kỷ luật tốt', 'Thẩm mỹ và gu ăn mặc xuất sắc'],
    diemYeu: ['Cầu toàn đôi khi gây stress cho bản thân và người khác', 'Hay chỉ trích — khó thoả mãn', 'Đôi khi quá cứng nhắc về tiêu chuẩn'],
    phongCachLamViec: 'Tuổi Dậu làm việc tốt trong các lĩnh vực đòi hỏi sự chính xác và chú ý chi tiết. Họ là người đảm bảo chất lượng tuyệt vời. Không phù hợp với môi trường ẩu và thiếu tiêu chuẩn.',
    tinhDuyen: 'Tuổi Dậu có tiêu chuẩn cao về người bạn đời — điều này vừa tốt vừa là thách thức. Khi đã chọn, họ là người bạn đời tận tụy và chu đáo về mọi mặt.',
    ngheNghiep: ['Pháp lý / Kiểm toán', 'Y tế / Dược', 'Thiết kế', 'Giáo dục', 'Tài chính chính xác'],
    mauSacHop: ['Trắng', 'Bạc', 'Vàng nhạt'],
    soHop: [2, 7],
    conGiapHop: ['Sửu (Tam hợp)', 'Tỵ (Tam hợp)', 'Thìn (Lục hợp)'],
    conGiapXung: ['Mão'],
    affirmation: 'Sự tinh tế và cầu toàn của tôi tạo ra những kết quả xuất sắc.',
  },

  'Tuất': {
    chi: 'Tuất', conGiap: 'Chó',
    nguhanhChi: 'Thổ',
    tenGoiThanThien: 'Chó — Trung Thành Nghĩa Hiệp',
    tinhCach: 'Người tuổi Tuất mang tinh thần trung thành và nghĩa hiệp — sẵn sàng bảo vệ người thân đến cùng. Công bằng và không thể chịu đựng sự bất công. Trực tiếp và thẳng thắn, đôi khi đến mức khó chịu với người thích vòng vo. Một khi đã kết nối, trung thành tuyệt đối.',
    diemManh: ['Trung thành và nghĩa hiệp — bảo vệ người thân tuyệt đối', 'Công bằng và chính trực cao', 'Đáng tin cậy — lời hứa là cam kết', 'Thực dụng và xử lý tốt các tình huống khó'],
    diemYeu: ['Hay lo lắng và pessimistic đôi khi', 'Khó tha thứ khi bị phản bội', 'Đôi khi quá cứng nhắc về quan điểm'],
    phongCachLamViec: 'Tuổi Tuất làm việc tốt trong môi trường đòi hỏi sự chính trực và trách nhiệm. Họ là trụ cột đáng tin trong mọi tổ chức. Không phù hợp với môi trường gian lận hay thiếu nguyên tắc.',
    tinhDuyen: 'Tuổi Tuất yêu trung thành và sâu sắc — một khi đã cho đi trái tim, hiếm khi lấy lại. Cần người xứng đáng với sự trung thành đó và không bao giờ phản bội.',
    ngheNghiep: ['An ninh / Quân sự', 'Pháp lý / Tư pháp', 'Y tế cấp cứu', 'Xã hội / Từ thiện', 'Lãnh đạo tổ chức'],
    mauSacHop: ['Vàng đất', 'Đỏ', 'Xanh lá'],
    soHop: [1, 6],
    conGiapHop: ['Dần (Tam hợp)', 'Ngọ (Tam hợp)', 'Mão (Lục hợp)'],
    conGiapXung: ['Thìn'],
    affirmation: 'Sự trung thành và chính trực của tôi là nền tảng vững chắc cho mọi mối quan hệ.',
  },

  'Hợi': {
    chi: 'Hợi', conGiap: 'Heo',
    nguhanhChi: 'Thủy',
    tenGoiThanThien: 'Heo — Phúc Đức Bao Dung',
    tinhCach: 'Người tuổi Hợi mang phúc khí và tấm lòng bao dung rộng lớn. Họ không phán xét và sẵn sàng tha thứ dễ dàng. Hào phóng và thích chia sẻ — ngôi nhà của họ thường là nơi mọi người muốn ghé lại. Thưởng thức cuộc sống và biết cách tìm niềm vui trong những điều bình dị.',
    diemManh: ['Bao dung và không phán xét — dễ tha thứ', 'Hào phóng và thích chia sẻ tự nhiên', 'Trung thực và không thích gian lận', 'Biết cách hưởng thụ và tìm niềm vui cuộc sống'],
    diemYeu: ['Dễ bị lợi dụng lòng tốt', 'Đôi khi quá tin người và ngây thơ', 'Có xu hướng lười biếng khi quá thoải mái'],
    phongCachLamViec: 'Tuổi Hợi làm việc tốt trong môi trường hài hòa và có mục đích nhân văn. Không thích cạnh tranh khắc nghiệt. Xuất sắc trong các vai trò chăm sóc và phục vụ cộng đồng.',
    tinhDuyen: 'Tuổi Hợi yêu chân thành và không điều kiện — nhưng cần học cách chọn người xứng đáng. Tránh xu hướng ở lại mối quan hệ không lành mạnh vì không nỡ bỏ.',
    ngheNghiep: ['Y tế / Chăm sóc', 'Giáo dục', 'Ẩm thực / Hospitality', 'Từ thiện / NGO', 'Nghệ thuật'],
    mauSacHop: ['Xanh navy', 'Đen', 'Vàng'],
    soHop: [4, 9],
    conGiapHop: ['Mão (Tam hợp)', 'Mùi (Tam hợp)', 'Dần (Lục hợp)'],
    conGiapXung: ['Tỵ'],
    affirmation: 'Tấm lòng bao dung của tôi thu hút phúc khí và may mắn vào cuộc sống.',
  },
}

// ============================================================
// PHẦN 3 — NGŨ HÀNH NĂM (theo Nạp Âm của Hoa Giáp)
// ============================================================

export interface NguhanhNamProfile {
  nguhanh: string
  tinhCachChung: string     // 2-3 câu
  diemManh: string[]
  diemYeu: string[]
  ngheNghiep: string[]
  mauSacHop: string[]
  huongHop: string[]
  toNguyenSo: number        // Số may mắn tổng quát
}

export const NGUHANH_NAM_DATA: Record<string, NguhanhNamProfile> = {
  'Kim': {
    nguhanh: 'Kim',
    tinhCachChung: 'Người mang Ngũ Hành Kim (năm sinh) có tính cách cứng rắn, quyết đoán và chính trực. Họ đặt ra tiêu chuẩn cao và kiên trì theo đuổi mục tiêu với ý chí thép. Công bằng và không thỏa hiệp với điều sai.',
    diemManh: ['Quyết đoán và dứt khoát', 'Chính trực cao', 'Kiên trì và bền bỉ', 'Tổ chức tốt'],
    diemYeu: ['Đôi khi quá cứng nhắc', 'Khó thỏa hiệp', 'Thiếu linh hoạt cảm xúc'],
    ngheNghiep: ['Pháp lý', 'Tài chính', 'Kỹ thuật', 'Quản lý', 'Quân sự / An ninh'],
    mauSacHop: ['Trắng', 'Bạc', 'Xám', 'Vàng nhạt'],
    huongHop: ['Tây', 'Tây Bắc'],
    toNguyenSo: 4,
  },
  'Mộc': {
    nguhanh: 'Mộc',
    tinhCachChung: 'Người mang Ngũ Hành Mộc (năm sinh) có tính cách phóng khoáng, sáng tạo và hướng đến phát triển. Họ yêu thích sự tự do và có tầm nhìn xa. Nhân hậu và biết cách nuôi dưỡng mối quan hệ.',
    diemManh: ['Sáng tạo và phóng khoáng', 'Nhân hậu và quan tâm', 'Tầm nhìn dài hạn', 'Linh hoạt thích nghi'],
    diemYeu: ['Đôi khi thiếu thực dụng', 'Dễ bị phân tâm bởi ý tưởng mới', 'Có xu hướng lý tưởng hóa'],
    ngheNghiep: ['Giáo dục', 'Thiết kế / Nghệ thuật', 'Môi trường / Nông nghiệp', 'Y học', 'Văn học'],
    mauSacHop: ['Xanh lá', 'Xanh dương', 'Nâu đất'],
    huongHop: ['Đông', 'Đông Nam'],
    toNguyenSo: 3,
  },
  'Thủy': {
    nguhanh: 'Thủy',
    tinhCachChung: 'Người mang Ngũ Hành Thủy (năm sinh) có trí tuệ linh hoạt và khả năng thích nghi phi thường. Họ nhạy cảm, đồng cảm và có chiều sâu tư duy. Như nước, họ có thể điều chỉnh theo mọi hoàn cảnh.',
    diemManh: ['Trí tuệ linh hoạt', 'Đồng cảm và nhạy cảm', 'Thích nghi nhanh', 'Tư duy chiều sâu'],
    diemYeu: ['Đôi khi thiếu kiên định', 'Dễ bị ảnh hưởng bởi môi trường', 'Khó đưa ra quyết định dứt khoát'],
    ngheNghiep: ['Nghiên cứu', 'Tâm lý / Tư vấn', 'Thương mại', 'Nghệ thuật', 'Công nghệ'],
    mauSacHop: ['Đen', 'Xanh navy', 'Xanh dương nhạt'],
    huongHop: ['Bắc'],
    toNguyenSo: 1,
  },
  'Hỏa': {
    nguhanh: 'Hỏa',
    tinhCachChung: 'Người mang Ngũ Hành Hỏa (năm sinh) tràn đầy nhiệt huyết, năng lượng và tinh thần lạc quan. Họ có sức hút tự nhiên và tài năng truyền cảm hứng. Nhanh nhẹn và quyết đoán, sẵn sàng dẫn đầu.',
    diemManh: ['Nhiệt huyết và năng lượng cao', 'Sức hút và truyền cảm hứng', 'Quyết đoán nhanh', 'Lạc quan và tích cực'],
    diemYeu: ['Đôi khi bốc đồng', 'Thiếu kiên nhẫn với quá trình chậm', 'Dễ kiệt sức khi cháy hết năng lượng'],
    ngheNghiep: ['Truyền thông / Marketing', 'Giáo dục', 'Nghệ thuật biểu diễn', 'Lãnh đạo', 'Sales'],
    mauSacHop: ['Đỏ', 'Cam', 'Hồng', 'Tím'],
    huongHop: ['Nam'],
    toNguyenSo: 9,
  },
  'Thổ': {
    nguhanh: 'Thổ',
    tinhCachChung: 'Người mang Ngũ Hành Thổ (năm sinh) có tính cách ổn định, thực dụng và đáng tin cậy. Họ là nền tảng vững chắc cho mọi người xung quanh. Kiên nhẫn và bền bỉ, xây dựng từng bước chắc chắn.',
    diemManh: ['Ổn định và đáng tin cậy', 'Thực dụng và thực tế', 'Kiên nhẫn bền bỉ', 'Quản lý tài chính tốt'],
    diemYeu: ['Đôi khi quá thận trọng', 'Chậm thích nghi', 'Có xu hướng bảo thủ'],
    ngheNghiep: ['Bất động sản', 'Nông nghiệp', 'Xây dựng', 'Hành chính', 'Y tế'],
    mauSacHop: ['Vàng đất', 'Nâu', 'Be', 'Xanh lá đậm'],
    huongHop: ['Trung tâm', 'Tây Nam', 'Đông Bắc'],
    toNguyenSo: 5,
  },
}

// ============================================================
// PHẦN 4 — TƯƠNG HỢP 12 CON GIÁP (78 cặp unique)
// ============================================================

export interface ConGiapCompatRow {
  score: number
  loai: 'tam_hop' | 'luc_hop' | 'xung' | 'hinh' | 'trung_hoa'
  label: string
  dynamic: string
  advice: string
}

// Nhóm Tam Hợp
const TAM_HOP = [
  ['Tý', 'Thìn', 'Thân'],
  ['Sửu', 'Tỵ', 'Dậu'],
  ['Dần', 'Ngọ', 'Tuất'],
  ['Mão', 'Mùi', 'Hợi'],
]

// Cặp Lục Hợp
const LUC_HOP = [
  ['Tý', 'Sửu'], ['Dần', 'Hợi'], ['Mão', 'Tuất'],
  ['Thìn', 'Dậu'], ['Tỵ', 'Thân'], ['Ngọ', 'Mùi'],
]

// Cặp Xung (trực tiếp đối nhau)
const XUNG = [
  ['Tý', 'Ngọ'], ['Sửu', 'Mùi'], ['Dần', 'Thân'],
  ['Mão', 'Dậu'], ['Thìn', 'Tuất'], ['Tỵ', 'Hợi'],
]

// Nhóm Hình (không hòa hợp dù không xung)
const HINH = [
  ['Dần', 'Tỵ'], ['Tỵ', 'Thân'],
  ['Sửu', 'Tuất'], ['Tuất', 'Mùi'],
]

export function getConGiapCompat(chiA: string, chiB: string): ConGiapCompatRow {
  if (chiA === chiB) return {
    score: 65, loai: 'trung_hoa',
    label: 'Cùng con giáp',
    dynamic: 'Hiểu nhau sâu sắc nhất vì cùng bản chất, nhưng dễ khuếch đại điểm yếu của nhau.',
    advice: 'Nhận ra điểm yếu chung và chủ động bổ trợ nhau.',
  }

  for (const group of TAM_HOP) {
    if (group.includes(chiA) && group.includes(chiB)) return {
      score: 88, loai: 'tam_hop',
      label: 'Tam Hợp — Duyên phận',
      dynamic: 'Tam Hợp là kết hợp đẹp nhất — ba năng lượng tương hỗ tạo ra tổng thể mạnh hơn từng phần.',
      advice: 'Đây là cặp tự nhiên — hãy nuôi dưỡng mối quan hệ này.',
    }
  }

  for (const pair of LUC_HOP) {
    if (pair.includes(chiA) && pair.includes(chiB)) return {
      score: 82, loai: 'luc_hop',
      label: 'Lục Hợp — Bổ sung nhau',
      dynamic: 'Lục Hợp mang lại sự hài hòa và bổ sung — điểm mạnh người này bù đắp điểm yếu người kia.',
      advice: 'Tôn trọng sự khác biệt — chính sự bổ sung tạo nên sức mạnh.',
    }
  }

  for (const pair of XUNG) {
    if (pair.includes(chiA) && pair.includes(chiB)) return {
      score: 42, loai: 'xung',
      label: 'Xung — Cần nỗ lực',
      dynamic: 'Tứ Hành Xung tạo ra ma sát và căng thẳng — hai năng lượng đối lập nhau cơ bản.',
      advice: 'Không phải không thể — nhưng cần hiểu nhau sâu và nỗ lực nhiều hơn các cặp khác.',
    }
  }

  for (const pair of HINH) {
    if (pair.includes(chiA) && pair.includes(chiB)) return {
      score: 52, loai: 'hinh',
      label: 'Hình — Dễ hiểu lầm',
      dynamic: 'Hình có thể tạo ra hiểu lầm và va chạm về cách tiếp cận — không xung nhưng khó ăn khớp ngay.',
      advice: 'Cần thời gian để hiểu nhau — giao tiếp trực tiếp và rõ ràng là chìa khóa.',
    }
  }

  return {
    score: 68, loai: 'trung_hoa',
    label: 'Trung hòa',
    dynamic: 'Không có quan hệ đặc biệt — cần thời gian xây dựng kết nối và tìm điểm chung.',
    advice: 'Tìm điểm tương đồng trong giá trị và mục tiêu sống.',
  }
}

// Pre-computed bảng 78 cặp unique (display-ready)
export const CON_GIAP_COMPAT_TABLE: Record<string, ConGiapCompatRow> = (() => {
  const result: Record<string, ConGiapCompatRow> = {}
  const chiList = DIA_CHI_VI
  for (let i = 0; i < chiList.length; i++) {
    for (let j = i; j < chiList.length; j++) {
      const key = `${chiList[i]}+${chiList[j]}`
      result[key] = getConGiapCompat(chiList[i], chiList[j])
    }
  }
  return result
})()

const CON_GIAP_EMOJI: Record<string, string> = {
  Chuột: '🐭', Trâu: '🐂', Hổ: '🐯', Mèo: '🐱', Rồng: '🐲', Rắn: '🐍',
  Ngựa: '🐴', Dê: '🐐', Khỉ: '🐵', Gà: '🐔', Chó: '🐕', Heo: '🐷',
}

/** Legacy export used by @tncb/core spiritual-engine */
export const ZODIAC_DATA: Record<
  string,
  {
    name: string;
    emoji: string;
    description: string;
    compatibility: string[];
    conflict: string[];
  }
> = Object.fromEntries(
  Object.entries(CON_GIAP_DATA).map(([chi, profile]) => [
    chi,
    {
      name: profile.conGiap,
      emoji: CON_GIAP_EMOJI[profile.conGiap] ?? '✨',
      description: profile.tinhCach,
      compatibility: profile.conGiapHop,
      conflict: profile.conGiapXung,
    },
  ]),
)

const NGUHANH_ELEMENT_EMOJI: Record<string, string> = {
  Kim: '⚔️', Mộc: '🌳', Thủy: '💧', Hỏa: '🔥', Thổ: '🏔️',
}

/** Legacy shape for CanChiResult UI */
export const NGU_HANH_DATA: Record<
  string,
  {
    name: string;
    emoji: string;
    description: string;
    traits: string[];
    luckyColors: string[];
    luckyDirection: string;
    luckyNumbers: number[];
  }
> = Object.fromEntries(
  Object.entries(NGUHANH_NAM_DATA).map(([key, profile]) => [
    key,
    {
      name: profile.nguhanh,
      emoji: NGUHANH_ELEMENT_EMOJI[key] ?? '☯️',
      description: profile.tinhCachChung,
      traits: profile.diemManh,
      luckyColors: profile.mauSacHop,
      luckyDirection: profile.huongHop.join(', '),
      luckyNumbers: [profile.toNguyenSo],
    },
  ]),
)
