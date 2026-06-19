/**
 * PA KB — FOOD & NUTRITION DATA
 * Ngày: 19/06/2026 · Review: Master PM
 * Source: Datamine Gemini · Document 9
 *
 * ⚠️ DISCLAIMER bắt buộc mọi nơi hiển thị:
 * "Thông tin tham khảo · không thay thế tư vấn dinh dưỡng y tế
 *  Người có bệnh nền tham khảo bác sĩ trước khi thay đổi chế độ ăn"
 */

export type MbtiGroup = 'NT' | 'NF' | 'ST' | 'SF'

// ─── FOOD STYLE BY GROUP ──────────────────────────────────

export const FOOD_STYLE_BY_GROUP: Record<MbtiGroup, {
  relationship: string
  strengths: string[]
  traps: string[]
  shoppingStyle: string
  eatingOut: string
}> = {
  NT: {
    relationship: "Ăn = nhiên liệu sinh học tối ưu · phân tích macro/micro · không quan tâm nhiều đến cảm xúc ăn uống",
    strengths: ["Kỷ luật ăn uống dựa trên nhận thức lý trí", "Dễ thiết lập chế độ ăn khoa học", "Không bị marketing thực phẩm dắt mũi"],
    traps: ["Ăn uống đơn điệu · bỏ bữa khi tập trung công việc", "Quá phụ thuộc supplement thay vì thức ăn thật", "Thiếu yếu tố thưởng thức cảm xúc"],
    shoppingStyle: "Mua online · chọn theo nhãn dinh dưỡng rõ ràng · không impulse buy",
    eatingOut: "Chọn quán dựa trên uy tín vệ sinh và minh bạch thông tin · không chọn theo trend mạng xã hội",
  },
  NF: {
    relationship: "Ăn có ý thức · ethical eating · kết nối tinh thần với nguồn gốc thực phẩm",
    strengths: ["Trực giác nhạy bén với nhu cầu cơ thể", "Ăn nhiều rau củ quả tự nhiên", "Tránh thực phẩm chế biến sẵn"],
    traps: ["Emotional eating: dùng đồ ăn xoa dịu stress", "Quá khắt khe → thiếu B12/sắt/kẽm nếu ăn chay cứng nhắc", "Bị ảnh hưởng bởi trend 'organic' không verify"],
    shoppingStyle: "Chợ nông sản địa phương · hữu cơ khi có thể · mua từ người quen biết nguồn gốc",
    eatingOut: "Ưu tiên quán chay · bản địa độc đáo · quán thân thiện môi trường",
  },
  ST: {
    relationship: "Ăn = hiệu quả + tiết kiệm · meal prep cả tuần · không lãng phí",
    strengths: ["Kỷ luật thực hiện thực đơn ăn kiêng/tăng cơ", "Không bị cảm xúc chi phối khi mua sắm", "Tối ưu chi phí thực phẩm"],
    traps: ["Bảo thủ · ít thử thực phẩm mới", "Thiếu đa dạng thực vật · dễ thiếu chất xơ đa dạng", "Boring meal plan → quit sau vài tuần"],
    shoppingStyle: "Danh sách cứng · siêu thị quen · bulk buy nguyên liệu bền lâu",
    eatingOut: "Quán quen chất lượng ổn định · nhanh · không cần ngồi lâu",
  },
  SF: {
    relationship: "Ăn = yêu thương và kết nối · nấu ăn là nghệ thuật chăm sóc",
    strengths: ["Chế độ ăn phong phú hương vị", "Vui khi chia sẻ bữa ăn · tạo không khí ấm cúng"],
    traps: ["Tiệc tùng thường xuyên → calo cao · muối ẩn · đường ẩn nhiều", "Khó kiểm soát portion khi ăn theo cảm xúc", "FOMO trend ẩm thực → chi tiêu ngoài budget"],
    shoppingStyle: "Theo cảm hứng · chợ truyền thống · mắt thấy tươi ngon thì mua",
    eatingOut: "Quán có không gian ấm cúng · lẩu nướng tập thể · buffet gia đình",
  },
}

// ─── 30 MÓN ĂN VN BA MIỀN ────────────────────────────────

export interface VNDish {
  name: string
  region: 'Bắc' | 'Trung' | 'Nam'
  description: string
  nutritionHighlight: string
  bestFor: MbtiGroup[]
  whereToBuy: string
  canCookHome: boolean
  difficulty: 'Dễ' | 'Trung' | 'Khó'
}

export const VN_DISHES: VNDish[] = [
  { name: "Phở Bò", region: "Bắc", description: "Bánh phở, thịt bò tươi, nước dùng ninh từ xương ống và thảo mộc ấm", nutritionHighlight: "Giàu sắt, kẽm, axit amin và collagen tự nhiên", bestFor: ["NF","SF"], whereToBuy: "Tiệm phở chuyên biệt", canCookHome: true, difficulty: "Trung" },
  { name: "Bún Bò Huế", region: "Trung", description: "Sợi bún to, thịt nạm bò, chân giò, chả cua, nước súp sả mắm ruốc", nutritionHighlight: "Giàu protein, canxi và chất kháng viêm từ sả, ớt", bestFor: ["SF","ST"], whereToBuy: "Quán đặc sản miền Trung", canCookHome: true, difficulty: "Khó" },
  { name: "Cơm Tấm Sườn", region: "Nam", description: "Gạo tấm, sườn nướng, bì heo thính, chả trứng hấp, mỡ hành", nutritionHighlight: "Mật độ năng lượng cao, dồi dào đạm và chất béo động vật", bestFor: ["ST","SF"], whereToBuy: "Quán cơm tấm bình dân", canCookHome: true, difficulty: "Trung" },
  { name: "Bánh Mì Kẹp", region: "Nam", description: "Bánh mì vỏ giòn kẹp pa-tê, bơ, xá xíu, đồ chua, ngò rí", nutritionHighlight: "Cân bằng tinh bột, đạm và chất xơ từ rau thơm, đồ chua", bestFor: ["ST","NT"], whereToBuy: "Xe bánh mì đường phố", canCookHome: true, difficulty: "Dễ" },
  { name: "Gỏi Cuốn Tôm", region: "Nam", description: "Bánh tráng cuốn tôm, thịt ba chỉ luộc, bún tươi, hẹ, xà lách", nutritionHighlight: "Ít calo, protein tinh khiết cao, nhiều nước và chất xơ", bestFor: ["NT","NF"], whereToBuy: "Tiệm gỏi cuốn, quán ăn vặt", canCookHome: true, difficulty: "Dễ" },
  { name: "Bún Chả", region: "Bắc", description: "Bún sợi nhỏ, chả viên nướng than hoa, nước mắm đu đủ xanh", nutritionHighlight: "Protein ít béo từ thịt nạc nướng kết hợp chất xơ từ rau", bestFor: ["SF","NF"], whereToBuy: "Quán bún chả chuyên", canCookHome: true, difficulty: "Trung" },
  { name: "Mì Quảng", region: "Trung", description: "Sợi mì dày dai, thịt gà/tôm, nước lèo xâm xấp, bánh tráng nướng", nutritionHighlight: "Cân bằng dinh dưỡng, giàu phốt pho và vitamin nhóm B", bestFor: ["ST","NT"], whereToBuy: "Tiệm ăn miền Trung", canCookHome: true, difficulty: "Trung" },
  { name: "Bánh Xèo", region: "Nam", description: "Vỏ bánh bột gạo nghệ giòn rụm, nhân tôm thịt cuốn rau sống phong phú", nutritionHighlight: "Giàu vitamin C, sắt từ giá đỗ và chất chống oxy hoá từ rau", bestFor: ["SF","NF"], whereToBuy: "Quán bánh xèo Nam Bộ", canCookHome: true, difficulty: "Khó" },
  { name: "Cháo Sườn", region: "Bắc", description: "Gạo tẻ xay ninh nhuyễn mịn, sườn sụn non nạc, hành phi thơm ngậy", nutritionHighlight: "Dễ tiêu hoá, làm dịu niêm mạc dạ dày, dồi dào canxi", bestFor: ["NT","NF"], whereToBuy: "Quán cháo vỉa hè lâu đời", canCookHome: true, difficulty: "Trung" },
  { name: "Bún Riêu Cua", region: "Bắc", description: "Nước dùng cua đồng thanh mát, cà chua, đậu phụ chiên, giấm bỗng", nutritionHighlight: "Cực kỳ giàu canxi hữu cơ, vitamin C và điện giải tự nhiên", bestFor: ["NF","SF"], whereToBuy: "Quán bún riêu cua đồng", canCookHome: true, difficulty: "Khó" },
  { name: "Bánh Cuốn", region: "Bắc", description: "Bánh tráng mỏng nóng, nhân mộc nhĩ thịt băm, hành phi, chả lụa", nutritionHighlight: "Carbohydrate hấp thu nhanh, protein nhẹ nhàng dễ tiêu", bestFor: ["NT","ST"], whereToBuy: "Tiệm bánh cuốn nóng", canCookHome: true, difficulty: "Trung" },
  { name: "Bún Đậu", region: "Bắc", description: "Bún lá ngon, đậu hũ chiên giòn rụm, thịt luộc chấm mắm tôm tỏi ớt", nutritionHighlight: "Giàu protein thực vật, canxi và lợi khuẩn tự nhiên từ mắm", bestFor: ["SF","ST"], whereToBuy: "Quán bún đậu ngõ nhỏ", canCookHome: true, difficulty: "Dễ" },
  { name: "Cao Lầu", region: "Trung", description: "Sợi mì vàng tro dai, thịt xá xíu thái mỏng, da heo chiên giòn dẻo", nutritionHighlight: "Carbohydrate phức hợp, dồi dào chất xơ thô tự nhiên", bestFor: ["NT","ST"], whereToBuy: "Tiệm ăn phố cổ Hội An", canCookHome: false, difficulty: "Khó" },
  { name: "Bánh Khọt", region: "Nam", description: "Vỏ bột gạo chiên giòn, nhân tôm tươi nguyên vỏ, cốt dừa béo ngậy", nutritionHighlight: "Giàu năng lượng, axit béo chuỗi trung bình và khoáng chất", bestFor: ["SF","NF"], whereToBuy: "Tiệm ăn đặc sản Nam Bộ", canCookHome: true, difficulty: "Trung" },
  { name: "Lẩu Mắm", region: "Nam", description: "Nước lèo mắm sặc/linh đậm đà, cá hú, cà tím, các loại rau bông súng", nutritionHighlight: "Phức hợp khoáng chất đa dạng, hỗ trợ hệ vi sinh đường ruột", bestFor: ["SF","ST"], whereToBuy: "Nhà hàng lẩu mắm miền Tây", canCookHome: false, difficulty: "Khó" },
  { name: "Cháo Lòng", region: "Nam", description: "Gạo tẻ ninh nở bung ngon, huyết, lòng heo, gan dồi luộc chín tới", nutritionHighlight: "Hàm lượng sắt, vitamin A và các vitamin nhóm B cực cao", bestFor: ["ST","SF"], whereToBuy: "Quán cháo lòng bình dân", canCookHome: true, difficulty: "Trung" },
  { name: "Nem Lụi", region: "Trung", description: "Thịt heo sả bọc quanh đũa tre nướng, chấm nước lèo tương đậu phộng", nutritionHighlight: "Giàu protein nạc, béo không bão hoà đơn từ đậu phộng", bestFor: ["SF","ST"], whereToBuy: "Quán bánh xèo nem lụi", canCookHome: true, difficulty: "Trung" },
  { name: "Bánh Bèo", region: "Trung", description: "Bột gạo hấp chén nhỏ thanh mát, tôm chấy, da heo chiên giòn dẻo", nutritionHighlight: "Tinh bột dễ tiêu hoá, ít chất béo xấu, thích hợp ăn phụ", bestFor: ["SF","NT"], whereToBuy: "Quán bánh Huế miền Trung", canCookHome: true, difficulty: "Trung" },
  { name: "Cơm Hến", region: "Trung", description: "Cơm nguội, hến xào, tóp mỡ chiên giòn, rau bắp chuối, nước hến nóng", nutritionHighlight: "Rất giàu kẽm, canxi và các khoáng chất vi lượng từ hến", bestFor: ["NT","NF"], whereToBuy: "Quán cơm hến bình dân", canCookHome: false, difficulty: "Khó" },
  { name: "Bún Sứa", region: "Trung", description: "Sứa biển giòn, chả cá thu luộc thanh, nước dùng nấu từ cá liệt ngọt", nutritionHighlight: "Calo cực thấp, dồi dào collagen và gelatin tự nhiên", bestFor: ["NF","NT"], whereToBuy: "Tiệm bún cá sứa", canCookHome: false, difficulty: "Trung" },
  { name: "Bánh Tráng Trộn", region: "Nam", description: "Bánh tráng sợi, khô bò, trứng cút, xoài xanh, rau răm, muối tôm", nutritionHighlight: "Kích thích vị giác mạnh, dồi dào axit hữu cơ từ xoài", bestFor: ["SF","NF"], whereToBuy: "Xe đẩy ăn vặt đô thị", canCookHome: true, difficulty: "Dễ" },
  { name: "Phở Cuốn", region: "Bắc", description: "Bánh phở tấm bọc thịt bò xào tỏi thơm, xà lách, ngò rí chấm mắm tỏi", nutritionHighlight: "Protein nạc hấp thu nhanh, vitamin nhóm B dồi dào", bestFor: ["NT","ST"], whereToBuy: "Tiệm phở cuốn nóng", canCookHome: true, difficulty: "Dễ" },
  { name: "Canh Chua Cá Hú", region: "Nam", description: "Cá hú béo ngậy, dọc mùng, giá đỗ, thơm, nước dùng chua me thanh", nutritionHighlight: "Giàu axit béo omega-3, vitamin C và khoáng chất kali", bestFor: ["NF","SF"], whereToBuy: "Quán cơm gia đình ấm cúng", canCookHome: true, difficulty: "Trung" },
  { name: "Bánh Đa Cua", region: "Bắc", description: "Sợi bánh đa đỏ dai, gạch cua chưng thơm, chả lá lốt, rau muống tươi", nutritionHighlight: "Giàu sắt, canxi, chất xơ và các sắc tố tự nhiên lành mạnh", bestFor: ["ST","SF"], whereToBuy: "Tiệm bánh đa cua Hải Phòng", canCookHome: true, difficulty: "Trung" },
  { name: "Thịt Kho Tàu", region: "Nam", description: "Thịt ba chỉ kho khối lớn với nước dừa tươi ngọt, trứng vịt luộc chín", nutritionHighlight: "Năng lượng dồi dào, giàu vitamin tan trong dầu và chất béo", bestFor: ["ST","SF"], whereToBuy: "Quán cơm phần bình dân", canCookHome: true, difficulty: "Trung" },
  { name: "Nộm Bò Khô", region: "Bắc", description: "Đu đủ xanh bào sợi mỏng, thịt bò khô cay, phổi bò chao giòn, lạc rang", nutritionHighlight: "Chất xơ không hoà tan cao, dồi dào kẽm và protein nạc", bestFor: ["SF","NT"], whereToBuy: "Quán nộm vỉa hè lâu năm", canCookHome: true, difficulty: "Dễ" },
  { name: "Miến Lươn", region: "Bắc", description: "Miến dong, lươn giòn hoặc lươn mềm thơm, rau răm, nước dùng lươn", nutritionHighlight: "Kẽm, sắt cao, miến dong ít làm tăng chỉ số đường huyết", bestFor: ["NT","NF"], whereToBuy: "Quán miến lươn gia truyền", canCookHome: true, difficulty: "Khó" },
  { name: "Gà Nướng Cơm Lam", region: "Trung", description: "Gà đồi nướng mọi nguyên con, cơm nếp thơm dẻo nấu trong ống tre non", nutritionHighlight: "Carbohydrate phức hợp dồi dào, protein nạc chất lượng cao", bestFor: ["ST","SF"], whereToBuy: "Nhà hàng ẩm thực sinh thái", canCookHome: false, difficulty: "Khó" },
  { name: "Bún Quậy", region: "Nam", description: "Sợi bún tươi ép tại chỗ, chả tôm cá quết nhuyễn, nước luộc bún ấm", nutritionHighlight: "Protein tinh khiết cao từ hải sản tươi, không chất bảo quản", bestFor: ["NT","NF"], whereToBuy: "Tiệm bún quậy Phú Quốc", canCookHome: false, difficulty: "Khó" },
  { name: "Lẩu Thả", region: "Nam", description: "Cá mai tươi ngon, thịt luộc, trứng sợi xếp đều trong cánh hoa chuối", nutritionHighlight: "Dồi dào omega-3, khoáng chất biển và chất xơ tự nhiên", bestFor: ["NF","SF"], whereToBuy: "Nhà hàng đặc sản Phan Thiết", canCookHome: false, difficulty: "Khó" },
]

// ─── 20 NỀN ẨM THỰC THẾ GIỚI ─────────────────────────────

export interface WorldCuisine {
  cuisine: string
  country: string
  characteristics: string
  signatureDishes: string[]
  whereInVN: string
  bestFor: MbtiGroup[]
  whyThisGroup: string
}

export const WORLD_CUISINES: WorldCuisine[] = [
  { cuisine: "Nhật Bản", country: "Japan", characteristics: "Tôn trọng vị tự nhiên, tươi sống, tối giản và tinh tế", signatureDishes: ["Sushi", "Sashimi", "Ramen", "Udon"], whereInVN: "Phố Nhật Lê Thánh Tôn (HCM) · Kim Mã (HN)", bestFor: ["NT"], whyThisGroup: "Đánh giá cao sự chuẩn xác, kỷ luật chế biến và khoa học bảo toàn dinh dưỡng" },
  { cuisine: "Địa Trung Hải", country: "Hy Lạp/Ý", characteristics: "Dầu ô-liu, cá béo, ngũ cốc nguyên hạt, thảo mộc tươi", signatureDishes: ["Salad Hy Lạp", "Hummus", "Cá nướng", "Souvlaki"], whereInVN: "Quận Tây Hồ (HN) · Thảo Điền (HCM)", bestFor: ["NF"], whyThisGroup: "Phù hợp triết lý sống xanh, organic, bền vững và nhân văn" },
  { cuisine: "Hàn Quốc", country: "Korea", characteristics: "Đậm đà, cay ấm, lên men tự nhiên, văn hoá nướng chia sẻ", signatureDishes: ["Kimchi", "Tokbokki", "Bulgogi", "Samgyeopsal"], whereInVN: "Phú Mỹ Hưng (HCM) · Trung Hoà (HN)", bestFor: ["SF"], whyThisGroup: "Thoả mãn nhu cầu kết nối, tương tác và bùng nổ giác quan" },
  { cuisine: "Ý", country: "Italy", characteristics: "Chú trọng nguyên liệu thô thượng hạng: phô mai, cà chua, húng tây", signatureDishes: ["Pizza Napoletana", "Spaghetti", "Lasagna", "Risotto"], whereInVN: "Trung tâm các thành phố lớn toàn quốc", bestFor: ["SF"], whyThisGroup: "Đề cao tính gắn kết gia đình, sự nồng ấm và chia sẻ yêu thương" },
  { cuisine: "Thái Lan", country: "Thailand", characteristics: "Cân bằng hoàn hảo năm vị: chua, cay, mặn, ngọt, đắng", signatureDishes: ["Tom Yum", "Pad Thai", "Som Tum", "Green Curry"], whereInVN: "Các trung tâm thương mại lớn, phố ẩm thực", bestFor: ["SF"], whyThisGroup: "Phù hợp với những cá nhân yêu thích sự sôi động, trải nghiệm mới" },
  { cuisine: "Ấn Độ", country: "India", characteristics: "Nghệ thuật sử dụng gia vị phức hợp, dồi dào món chay lành mạnh", signatureDishes: ["Butter Chicken", "Chicken Tikka", "Naan", "Dal"], whereInVN: "Phố Tây Bùi Viện (HCM) · Hàng Buồm (HN)", bestFor: ["NF"], whyThisGroup: "Sự sâu sắc về mặt văn hoá, triết lý Ayurveda dưỡng sinh tự nhiên" },
  { cuisine: "Mexico", country: "Mexico", characteristics: "Sự kết hợp sôi động của ngô, đậu, bơ và các loại sốt salsa tươi", signatureDishes: ["Tacos", "Burritos", "Quesadillas", "Guacamole"], whereInVN: "Các nhà hàng phong cách Latinh đô thị", bestFor: ["SF"], whyThisGroup: "Mang tính lễ hội, dễ ăn bằng tay, kích thích giao tiếp cởi mở" },
  { cuisine: "Pháp", country: "France", characteristics: "Kỹ thuật chế biến cổ điển chuẩn mực, chú trọng các loại sốt tinh tế", signatureDishes: ["Coq au Vin", "Foie Gras", "Crêpes", "Ratatouille"], whereInVN: "Nhà hàng Pháp cổ điển tại trung tâm đô thị", bestFor: ["NT"], whyThisGroup: "Hấp dẫn bởi tính logic, sự khắt khe của kỹ nghệ nấu ăn kinh điển" },
  { cuisine: "Tây Ban Nha", country: "Spain", characteristics: "Văn hoá thưởng thức chậm rãi các món ăn nhỏ Tapas và Paella", signatureDishes: ["Cơm chảo Paella", "Tapas tỏi", "Jamon", "Churros"], whereInVN: "Các quán Tapas Bar tại Hoàn Kiếm, Quận 1", bestFor: ["SF"], whyThisGroup: "Tinh thần tự do, tận hưởng cuộc sống và giao lưu bè bạn cởi mở" },
  { cuisine: "Trung Hoa", country: "China", characteristics: "Âm dương cân bằng, kỹ thuật dùng lửa chảo lớn, Dimsum cầu kỳ", signatureDishes: ["Vịt quay Bắc Kinh", "Dimsum", "Đậu Tứ Xuyên", "Mì Bát Trân"], whereInVN: "Chợ Lớn (Quận 5 - HCM) · tiệm Dimsum HN", bestFor: ["ST"], whyThisGroup: "Tính ổn định, cấu trúc bữa ăn rõ ràng, cân bằng năng lượng vĩ mô" },
  { cuisine: "Thổ Nhĩ Kỳ", country: "Turkey", characteristics: "Ẩm thực Trung Đông mộc mạc, giàu sữa chua và thịt nướng tẩm ướp", signatureDishes: ["Doner Kebab", "Hummus", "Baklava", "Pide"], whereInVN: "Các quầy Kebab đường phố, nhà hàng Halal", bestFor: ["ST"], whyThisGroup: "Tính thực tế cao, tiện lợi, cung cấp protein thô nhanh chóng" },
  { cuisine: "Hy Lạp", country: "Greece", characteristics: "Chú trọng sữa chua Hy Lạp lên men, phô mai feta và thịt nướng mộc", signatureDishes: ["Souvlaki", "Tzatziki", "Gyros", "Moussaka"], whereInVN: "Nhà hàng Địa Trung Hải ven biển hoặc đô thị", bestFor: ["NT"], whyThisGroup: "Chế độ ăn cực sạch, hàm lượng vĩ lượng tối ưu cho vận động" },
  { cuisine: "Hoa Kỳ", country: "USA", characteristics: "Mật độ năng lượng cao, tiện dụng, phục vụ nhanh chóng, béo ngậy", signatureDishes: ["Burgers", "Khoai tây chiên sốt", "Sườn BBQ", "Mac & Cheese"], whereInVN: "Các chuỗi đồ ăn nhanh lớn trên toàn quốc", bestFor: ["ST"], whyThisGroup: "Giải quyết cơn đói nhanh chóng, tối ưu hoá thời gian khi bận rộn" },
  { cuisine: "Anh", country: "UK", characteristics: "Mộc mạc, truyền thống, cung cấp lượng lớn carbohydrate ấm áp", signatureDishes: ["Fish and Chips", "English Breakfast", "Shepherd's Pie"], whereInVN: "Các quán Pub phong cách Anh đô thị", bestFor: ["ST"], whyThisGroup: "Đơn giản, dễ dự đoán, không chứa nhiều gia vị lạ phức tạp" },
  { cuisine: "Nga", country: "Russia", characteristics: "Sự kết hợp của lúa mạch đen, kem chua smetana và thịt hầm ấm", signatureDishes: ["Súp củ cải đỏ Borscht", "Salad Nga", "Bánh đen"], whereInVN: "Cửa hàng thực phẩm nhập khẩu Nga đô thị", bestFor: ["ST"], whyThisGroup: "Sự vững chãi, thực tế, giàu năng lượng kéo dài từ ngũ cốc nguyên cám" },
  { cuisine: "Brazil", country: "Brazil", characteristics: "Văn hoá thịt nướng xiên quay Churrasco dồi dào đạm động vật", signatureDishes: ["Thịt nướng xiên quay", "Sốt Chimichurri", "Feijoada"], whereInVN: "Các nhà hàng Buffet Brazil lớn tại HN, HCM", bestFor: ["ST"], whyThisGroup: "Đáp ứng hoàn hảo nhu cầu nạp macro protein khối lượng lớn sau tập" },
  { cuisine: "Lebanon", country: "Lebanon", characteristics: "Thế giới của rau mùi, chanh, tỏi, đậu chickpea và dầu ô-liu mộc", signatureDishes: ["Falafel chiên", "Tabbouleh", "Baba Ganoush", "Hummus"], whereInVN: "Nhà hàng Trung Đông tại Thảo Điền (HCM)", bestFor: ["NF"], whyThisGroup: "Tinh tế, thuần tự nhiên, giàu chất béo lành mạnh bảo vệ cơ thể" },
  { cuisine: "Đức", country: "Germany", characteristics: "Sự kết hợp mạnh mẽ của xúc xích nướng, thịt heo hầm bia và cải chua", signatureDishes: ["Xúc xích Bratwurst", "Chân giò hầm", "Pretzel", "Sauerbraten"], whereInVN: "Các quán bia tươi phong cách Đức đô thị", bestFor: ["SF"], whyThisGroup: "Phù hợp với không khí hội hè náo nhiệt, giải toả áp lực cuối tuần" },
  { cuisine: "Úc", country: "Australia", characteristics: "Đề cao các món nướng dã ngoại BBQ nhẹ nhàng và trái cây tươi sạch", signatureDishes: ["Thịt nướng BBQ dã ngoại", "Pavlova", "Tim Tam", "Vegemite toast"], whereInVN: "Các nhà hàng Steakhouse phong cách Úc", bestFor: ["NF"], whyThisGroup: "Tinh thần tự do, kết nối sâu sắc với lối sống ngoài trời lành mạnh" },
  { cuisine: "Morocco", country: "Morocco", characteristics: "Cơm hầm Tagine thảo mộc ấm nóng nấu trong nồi đất nung đặc trưng", signatureDishes: ["Tagine gà", "Couscous trộn rau quả khô", "Harira soup"], whereInVN: "Quán ăn Địa Trung Hải, Trung Đông trung tâm", bestFor: ["NF"], whyThisGroup: "Độc đáo về mặt văn hoá, chứa các chất chống oxy hoá tự nhiên quý" },
]

// ─── NUTRITION BASICS ─────────────────────────────────────

export const NUTRITION_BASICS = {
  protein: { role: "Kiến tạo và phục hồi tế bào, cơ bắp", cheapSources: ["Ức gà fillet", "Thịt heo nạc", "Trứng vịt", "Đậu hũ trắng", "Cá nục", "Các loại đậu đỗ"] },
  carbs: { role: "Năng lượng chính cho não và vận động", preferSlow: ["Cơm gạo lứt", "Khoai lang luộc", "Bánh mì nguyên cám", "Bún tươi"] },
  fat: { role: "Hấp thụ vitamin tan trong dầu A/D/E/K · nội tiết tố", goodSources: ["Dầu ô-liu", "Lạc rang", "Hạt điều", "Mỡ cá tự nhiên"] },
  micronutrients: { role: "Bảo vệ cơ thể khỏi oxy hoá · tăng đề kháng", bestSources: ["Rau muống", "Xà lách", "Rau ngót", "Quả chín mùa VN"] },
}

export const NUTRITION_BY_GOAL = {
  energy: "Tránh bữa sáng nhiều đường tinh chế. Thay bằng trứng luộc + khoai lang · uống đủ nước ấm suốt ngày",
  sleep: "Tryptophan + magie vào tối: hạt sen ninh · canh rau nhút · chuối chín · cá hấp · tránh caffeine sau 14h",
  muscle: "Thặng dư calo nhẹ + kháng lực. Đạm rẻ VN: trứng gà luộc · đậu hũ áp chảo · ức gà fillet",
  immunity: "Kẽm + vitamin C + phytoncides: tỏi tươi · hành tây · gừng ấm · rau thơm VN hàng ngày",
  stress: "Cortisol cao → thèm ngọt. Bổ sung vitamin nhóm B: gạo lứt · trứng · bông cải. Tránh fast food nhiều dầu",
}

export const SUPPLEMENTS_TRUTH = [
  { name: "Vitamin D3", evidence: "Rất mạnh [R]", dosage: "1000-2000 IU/ngày", note: "Cần thiết cho dân văn phòng ít tiếp xúc nắng" },
  { name: "Omega-3 (Dầu Cá)", evidence: "Mạnh [R]", dosage: "1-3g EPA+DHA/ngày", note: "Cần thiết nếu ăn ít hơn 2 bữa cá béo/tuần" },
  { name: "Probiotics", evidence: "Trung bình [P]", dosage: "Theo hướng dẫn sản phẩm", note: "Hiệu quả phụ thuộc chủng men · nhiều yếu tố marketing" },
  { name: "Collagen uống", evidence: "Yếu · marketing nhiều [P]", dosage: "N/A", note: "Bị phân rã thành axit amin thường khi hấp thu · không tác dụng trực tiếp lên da" },
  { name: "Sữa hạt", evidence: "Bình thường [P]", dosage: "N/A", note: "Thay thế lactose tốt · KHÔNG thay thế được đạm động vật · đạm rất thấp" },
]

export const EATING_OUT_TIPS = [
  { trap: "MSG dư thừa", symptom: "Khát nước, mệt mỏi, đau đầu nhẹ", solution: "Yêu cầu quán không nêm mì chính trực tiếp vào tô" },
  { trap: "Đường ẩn", symptom: "Ngọt quá mức trong sốt BBQ, salad công nghiệp, món kho", solution: "Chọn món luộc/hấp hoặc yêu cầu sốt để riêng bên cạnh" },
  { trap: "Muối ẩn", symptom: "Dưa muối chua · mắm nêm · nước lèo bún phở · giò chả", solution: "Hạn chế húp hết nước dùng của các món bún phở khi đi ăn tiệm" },
]

// ─── 40 RECIPES BY GROUP (key data only) ─────────────────

export interface Recipe {
  name: string
  time: number // phút
  difficulty: 'Dễ' | 'Trung'
  serves: number
  mainIngredients: string[]
  nutritionHighlight: string
  whyThisGroup: string
}

export const RECIPES_BY_GROUP: Record<MbtiGroup, Recipe[]> = {
  NT: [
    { name: "Ức Gà Áp Chảo Chanh Leo", time: 20, difficulty: "Dễ", serves: 1, mainIngredients: ["Ức gà fillet", "chanh leo", "mật ong", "tỏi", "dầu ô-liu"], nutritionHighlight: "Protein tinh khiết cao, vitamin C hỗ trợ hấp thu sắt", whyThisGroup: "Tối ưu hoá thời gian chuẩn bị và cung cấp năng lượng phục hồi nhanh" },
    { name: "Cá Hồi Hấp Bông Cải Xanh", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Fillet cá hồi", "bông cải xanh", "nước tương", "gừng"], nutritionHighlight: "Omega-3 lành mạnh, sulphoraphane kháng viêm cao", whyThisGroup: "Đơn giản, giữ trọn vẹn giá trị dinh dưỡng bằng phương pháp hấp" },
    { name: "Salad Ức Gà Gạo Lứt", time: 20, difficulty: "Dễ", serves: 1, mainIngredients: ["Ức gà xé", "cơm gạo lứt", "ngô ngọt", "dưa chuột"], nutritionHighlight: "Tinh bột giải phóng chậm, protein dồi dào, dồi dào chất xơ", whyThisGroup: "Meal prep hoàn hảo cho lịch trình làm việc bận rộn" },
    { name: "Đậu Hũ Sốt Nấm Đông Cô", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Đậu hũ trắng", "nấm đông cô", "hành boa-rô", "dầu hào"], nutritionHighlight: "Hàm lượng chất béo bão hoà cực thấp, protein thực vật lành mạnh", whyThisGroup: "Khoa học, giảm tải tối đa hệ tiêu hoá sau làm việc căng thẳng" },
    { name: "Thịt Bò Xào Cần Tây", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Thịt bò nạc", "cần tây", "hành tây", "tỏi tươi"], nutritionHighlight: "Hàm lượng sắt cao, khoáng chất kích thích lưu thông máu", whyThisGroup: "Tăng cường năng lượng trí não tức thì nhờ sắt và kẽm sinh học" },
    { name: "Canh Rong Biển Tôm Khô", time: 15, difficulty: "Dễ", serves: 2, mainIngredients: ["Rong biển khô", "đậu hũ non", "tôm khô ngon"], nutritionHighlight: "Giàu i-ốt, canxi, chất xơ hoà tan giúp mát gan, thải độc", whyThisGroup: "Nhanh chóng, bổ sung điện giải và nước sau tập luyện" },
    { name: "Tôm Rim Sả Tỏi", time: 20, difficulty: "Dễ", serves: 1, mainIngredients: ["Tôm lột vỏ", "sả băm", "tỏi", "nước mắm ngon"], nutritionHighlight: "Protein nạc cao, canxi tự nhiên và kẽm hỗ trợ miễn dịch", whyThisGroup: "Đậm đà, dễ bảo quản trong tủ lạnh cho các bữa ăn tiếp theo" },
    { name: "Mì Chũ Ức Gà Cải Ngọt", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Mì chũ Bắc Giang", "ức gà fillet", "cải ngọt", "cà rốt"], nutritionHighlight: "Carbohydrate phức hợp từ mì gạo truyền thống, protein nạc", whyThisGroup: "Nhanh gọn, đầy đủ 3 nhóm đa lượng thiết yếu trong 1 tô" },
    { name: "Cháo Yến Mạch Thịt Băm", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Yến mạch cán vỡ", "thịt heo nạc băm", "hành lá", "tiêu"], nutritionHighlight: "Beta-glucan từ yến mạch hỗ trợ giảm cholesterol, protein nạc", whyThisGroup: "Cực kỳ ấm bụng, phục hồi dạ dày khi mệt mỏi hoặc thiếu ngủ" },
    { name: "Trứng Cuộn Đậu Hũ Non", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Trứng gà", "đậu hũ non", "hành lá", "tiêu đen"], nutritionHighlight: "Chất đạm hấp thu nhanh, lecithin tốt cho não bộ", whyThisGroup: "Nguyên liệu cực kỳ bình dân, chế biến tối giản không cần kỹ năng cao" },
  ],
  NF: [
    { name: "Canh Đậu Hũ Cà Chua", time: 15, difficulty: "Dễ", serves: 2, mainIngredients: ["Đậu hũ", "cà chua chín", "nấm hương khô", "hành boa-rô"], nutritionHighlight: "Lycopene chống oxy hoá dồi dào, vitamin D tự nhiên từ nấm", whyThisGroup: "Thuần thực vật thanh nhẹ, kết nối tâm hồn với thiên nhiên" },
    { name: "Salad Bơ Đậu Hũ Hạt Điều", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Bơ sáp", "đậu hũ trắng", "xà lách hữu cơ", "hạt điều"], nutritionHighlight: "Chất béo lành mạnh, vitamin E tự nhiên, chất xơ thô dồi dào", whyThisGroup: "Màu sắc tự nhiên tươi sáng, mang lại năng lượng tích cực, an lành" },
    { name: "Soup Bí Đỏ Nước Cốt Dừa", time: 25, difficulty: "Dễ", serves: 2, mainIngredients: ["Bí đỏ hồ lô", "nước cốt dừa", "ngò rí", "tiêu đen"], nutritionHighlight: "Beta-carotene bảo vệ thị lực, axit béo chuỗi trung bình", whyThisGroup: "Món súp nhuyễn mịn, vỗ về cảm xúc sau ngày dài áp lực" },
    { name: "Nấm Đùi Gà Kho Gừng", time: 20, difficulty: "Dễ", serves: 2, mainIngredients: ["Nấm đùi gà", "gừng tươi", "sả", "nước tương", "mật mía"], nutritionHighlight: "Hoạt chất hỗ trợ miễn dịch tự nhiên từ nấm và gừng", whyThisGroup: "Hương vị ấm áp, chữa lành tinh thần trong những ngày mưa ẩm" },
    { name: "Cơm Lứt Trộn Hạt Sen Đậu", time: 30, difficulty: "Trung", serves: 2, mainIngredients: ["Gạo lứt", "hạt sen tươi", "đậu Hà Lan", "cà rốt hạt lựu"], nutritionHighlight: "Giàu tryptophan hỗ trợ giấc ngủ, tinh bột chậm chất lượng cao", whyThisGroup: "Sự kết hợp hài hoà của các loại nông sản bản địa thân thiện môi trường" },
    { name: "Canh Chua Chay Nam Bộ", time: 20, difficulty: "Trung", serves: 2, mainIngredients: ["Đậu hũ", "dọc mùng", "giá đỗ", "thơm", "me chua", "rau ngổ"], nutritionHighlight: "Giàu vitamin C, kali, nước và chất xơ thanh lọc cơ thể", whyThisGroup: "Hương vị chua thanh, kích thích vị giác một cách nhẹ nhàng" },
    { name: "Đậu Hũ Kho Thơm", time: 20, difficulty: "Dễ", serves: 2, mainIngredients: ["Đậu hũ chiên", "dứa chín", "nước tương", "đường phèn", "hành lá"], nutritionHighlight: "Enzyme bromelain từ dứa hỗ trợ phân giải protein, tiêu hoá tốt", whyThisGroup: "Sự kết hợp chua ngọt cổ điển, tạo cảm giác thân thuộc, bình yên" },
    { name: "Salad Rau Mầm Trứng Cút", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Rau mầm cải bắp", "trứng cút luộc", "dầu dấm", "hạt vừng"], nutritionHighlight: "Enzyme sống dồi dào từ rau mầm, choline từ lòng đỏ trứng", whyThisGroup: "Trải nghiệm ăn uống tươi mới, thanh khiết và giàu sức sống" },
    { name: "Cà Rốt Áp Chảo Mật Ong", time: 15, difficulty: "Dễ", serves: 1, mainIngredients: ["Cà rốt hữu cơ", "mật ong rừng", "gừng", "dầu dừa"], nutritionHighlight: "Vitamin A, chất chống oxy hoá bảo vệ màng tế bào", whyThisGroup: "Tôn vinh vị ngọt thanh mộc mạc nguyên bản của củ quả hữu cơ" },
    { name: "Miến Trộn Chay Sợi Dai", time: 20, difficulty: "Dễ", serves: 1, mainIngredients: ["Miến dong", "mộc nhĩ", "cà rốt", "cải thìa", "đậu hũ thái sợi"], nutritionHighlight: "Ít calo, giàu chất xơ, hỗ trợ duy trì cân nặng lành mạnh", whyThisGroup: "Món chay nhẹ nhàng, không gây nặng bụng trước giờ đi ngủ" },
  ],
  ST: [
    { name: "Thịt Nạc Dăm Kho Tiêu", time: 25, difficulty: "Dễ", serves: 2, mainIngredients: ["Thịt nạc dăm", "tiêu đen", "gừng tỏi", "nước mắm ngon"], nutritionHighlight: "Cung cấp lượng lớn protein lành mạnh, ít béo động vật", whyThisGroup: "Dễ làm, dồi dào đạm, lưu trữ trong tủ lạnh được nhiều ngày" },
    { name: "Canh Rau Ngót Thịt Băm", time: 15, difficulty: "Dễ", serves: 2, mainIngredients: ["Rau ngót tươi", "thịt heo nạc băm", "hành khô"], nutritionHighlight: "Cực giàu vitamin A, sắt, vitamin C tự nhiên và chất xơ", whyThisGroup: "Tối ưu chi phí, giải nhiệt cơ thể cực kỳ nhanh chóng và hiệu quả" },
    { name: "Cá Nục Kho Cà Chua", time: 30, difficulty: "Trung", serves: 3, mainIngredients: ["Cá nục tươi", "cà chua", "nước dừa", "hành tỏi"], nutritionHighlight: "Omega-3 dồi dào, canxi từ xương cá nục kho nhừ", whyThisGroup: "Nguồn chất béo có lợi và canxi dồi dào với giá thành cực rẻ" },
    { name: "Trứng Chiên Mộc Nhĩ Thịt", time: 15, difficulty: "Dễ", serves: 2, mainIngredients: ["Trứng vịt", "thịt băm", "mộc nhĩ khô", "hành khô"], nutritionHighlight: "Protein, lecithin, chất xơ không hoà tan từ mộc nhĩ giúp thải độc", whyThisGroup: "Tận dụng nguyên liệu sẵn có trong tủ lạnh, chế biến siêu nhanh" },
    { name: "Súp Lơ Xào Thịt Bò", time: 15, difficulty: "Dễ", serves: 2, mainIngredients: ["Súp lơ xanh/trắng", "thịt bò fillet", "tỏi", "dầu ăn"], nutritionHighlight: "Sắt, kẽm, vitamin C, khoáng chất giúp cơ bắp dẻo dai", whyThisGroup: "Tối ưu hoá vi lượng và đa lượng cho người tập luyện thể chất" },
    { name: "Canh Bí Đao Tôm Đồng", time: 20, difficulty: "Dễ", serves: 2, mainIngredients: ["Bí đao tươi", "tôm đồng giã nhỏ lấy nước", "hành ngò"], nutritionHighlight: "Canxi hữu cơ từ vỏ tôm, nước điện giải tự nhiên giúp mát gan", whyThisGroup: "Đơn giản, thanh mát, hỗ trợ bù nước và khoáng chất tự nhiên" },
    { name: "Thịt Gà Kho Sả Ớt", time: 25, difficulty: "Dễ", serves: 2, mainIngredients: ["Thịt đùi gà bỏ da", "sả", "ớt tươi", "hành tỏi", "nước tương"], nutritionHighlight: "Đạm nạc động vật dồi dào, chất kích thích tuần hoàn cơ thể", whyThisGroup: "Đậm vị, dễ ăn kèm cơm, phù hợp mang đi làm văn phòng hàng ngày" },
    { name: "Đậu Hũ Nhồi Thịt Sốt Cà", time: 25, difficulty: "Trung", serves: 2, mainIngredients: ["Đậu hũ bọc", "thịt nạc vai xay", "cà chua chín", "hành lá"], nutritionHighlight: "Đa dạng nguồn đạm (động vật + thực vật), lycopene tự nhiên", whyThisGroup: "Món ăn truyền thống dồi dào dinh dưỡng, chi phí tiết kiệm tối đa" },
    { name: "Cải Thìa Xào Tỏi", time: 15, difficulty: "Dễ", serves: 2, mainIngredients: ["Cải thìa tươi ngon", "tỏi", "dầu ăn", "muối"], nutritionHighlight: "Vitamin K, canxi, chất xơ thô giúp xương chắc khoẻ", whyThisGroup: "Bữa phụ rau xanh nhanh gọn, duy trì nhu động ruột khoẻ mạnh" },
    { name: "Cháo Sườn Ninh Đỗ Xanh", time: 30, difficulty: "Trung", serves: 2, mainIngredients: ["Sườn non heo", "đỗ xanh cả vỏ", "gạo tẻ thơm"], nutritionHighlight: "Canxi, phốt pho, protein và các chất giải độc từ đậu xanh", whyThisGroup: "Món ăn phục hồi sức lực hoàn hảo sau giờ làm việc quá tải" },
  ],
  SF: [
    { name: "Lẩu Gà Lá Giang", time: 30, difficulty: "Trung", serves: 4, mainIngredients: ["Gà ta chạy đồi", "lá giang chua thanh", "sả", "nấm", "rau muống"], nutritionHighlight: "Protein động vật dồi dào, vitamin C, axit hữu cơ giúp tiêu hoá", whyThisGroup: "Trung tâm kết nối mọi người trong các buổi tụ họp cuối tuần" },
    { name: "Bánh Xèo Miền Tây", time: 30, difficulty: "Trung", serves: 4, mainIngredients: ["Bột bánh xèo nghệ", "tôm", "thịt ba chỉ", "giá đỗ", "rau cải xanh"], nutritionHighlight: "Phức hợp dinh dưỡng đa dạng, dồi dào chất xơ từ rau ăn kèm", whyThisGroup: "Trải nghiệm đổ bánh xèo nóng hổi cùng người thân vô cùng vui vẻ" },
    { name: "Tôm Sú Nướng Muối Ớt", time: 20, difficulty: "Dễ", serves: 3, mainIngredients: ["Tôm sú biển tươi", "muối hột", "ớt xiêm xanh", "tỏi"], nutritionHighlight: "Protein tinh khiết cao, astaxanthin chống oxy hoá mạnh mẽ", whyThisGroup: "Món ăn nướng ngoài trời thơm ngon, kích thích mọi giác quan" },
    { name: "Canh Sườn Nấu Sấu", time: 25, difficulty: "Dễ", serves: 3, mainIngredients: ["Sườn non heo", "quả sấu tươi", "cà chua", "hành ngò"], nutritionHighlight: "Canxi, vitamin C, axit citric tự nhiên hỗ trợ giải độc gan", whyThisGroup: "Món canh mát lành, mang đậm hương vị truyền thống quê nhà" },
    { name: "Thịt Ba Chỉ Cuốn Lá Lốt", time: 25, difficulty: "Dễ", serves: 3, mainIngredients: ["Thịt ba chỉ xay", "lá lốt tươi", "hành khô", "sả băm"], nutritionHighlight: "Đạm và chất béo thơm ngon, tinh dầu lá lốt kháng khuẩn tốt", whyThisGroup: "Hương thơm ngào ngạt khi nướng, mang lại cảm giác sum vầy ấm cúng" },
    { name: "Nem Lụi Nướng Sả", time: 30, difficulty: "Trung", serves: 3, mainIngredients: ["Giò sống", "thịt băm", "sả cây", "rau sống dồi dào"], nutritionHighlight: "Protein dồi dào kết hợp đa dạng vitamin nhóm B, rau thơm", whyThisGroup: "Món cuốn tương tác cao, tạo niềm vui khi tự tay cuốn ăn cùng nhau" },
    { name: "Sườn Xào Chua Ngọt", time: 25, difficulty: "Trung", serves: 2, mainIngredients: ["Sườn heo", "hành tây", "dứa", "cà chua", "giấm", "tỏi"], nutritionHighlight: "Giàu protein, chất béo tốt, vitamin C tự nhiên từ rau củ quả sốt", whyThisGroup: "Món ăn khoái khẩu của cả gia đình, khơi gợi ký ức tuổi thơ ấm áp" },
    { name: "Bún Riêu Cua Sườn Sụn", time: 30, difficulty: "Trung", serves: 3, mainIngredients: ["Cua đồng giã", "sườn sụn", "đậu hũ chiên", "cà chua", "rau bắp chuối"], nutritionHighlight: "Canxi, sắt dồi dào, vitamin nhóm B từ cua đồng tự nhiên", whyThisGroup: "Sự bùng nổ của hương vị truyền thống, thích hợp thết đãi bạn bè" },
    { name: "Gỏi Xoài Khô Cá Lóc", time: 15, difficulty: "Dễ", serves: 3, mainIngredients: ["Xoài keo xanh", "khô cá lóc nướng xé", "rau răm", "lạc rang"], nutritionHighlight: "Axit hữu cơ kích thích tiêu hoá, protein tinh khiết tự nhiên", whyThisGroup: "Món khai vị thanh mát, hoàn hảo cho các buổi trò chuyện cởi mở" },
    { name: "Chè Hạt Sen Nhãn Nhục", time: 25, difficulty: "Dễ", serves: 3, mainIngredients: ["Hạt sen tươi", "nhãn nhục sấy khô", "đường phèn thanh ngọt"], nutritionHighlight: "Tryptophan, khoáng chất giúp an thần, thư giãn mạch máu tốt", whyThisGroup: "Bữa tráng miệng ngọt nhẹ, mang lại giấc ngủ sâu thanh thản" },
  ],
}

// ─── HELPERS ─────────────────────────────────────────────

export function getMbtiGroup(type: string): MbtiGroup {
  if (['INTJ','INTP','ENTJ','ENTP'].includes(type)) return 'NT'
  if (['INFJ','INFP','ENFJ','ENFP'].includes(type)) return 'NF'
  if (['ISTJ','ISTP','ESTJ','ESTP'].includes(type)) return 'ST'
  return 'SF'
}

export function getDishByGroup(group: MbtiGroup): VNDish[] {
  return VN_DISHES.filter(d => d.bestFor.includes(group))
}

export function getRecipesByGroup(group: MbtiGroup): Recipe[] {
  return RECIPES_BY_GROUP[group] ?? []
}

export function getCuisineByGroup(group: MbtiGroup): WorldCuisine[] {
  return WORLD_CUISINES.filter(c => c.bestFor.includes(group))
}
