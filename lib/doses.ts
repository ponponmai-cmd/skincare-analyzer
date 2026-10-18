export interface DoseGuide {
  minimum: string;
  sweetSpot: string;
  tooMuch?: string;
  timeToSee: string;
  note?: string;
}

export const doseGuide: Record<string, DoseGuide> = {
  niacinamide: {
    minimum: "2%",
    sweetSpot: "4%–5%",
    tooMuch: "10% 以上效果沒有更好，刺、紅的人變多",
    timeToSee: "出油 2–4 週；暗沉與斑 8–12 週",
  },
  "ascorbic-acid": {
    minimum: "8%–10%",
    sweetSpot: "10%–20%，pH 3.5 以下",
    tooMuch: "超過 20% 不會更有效，只會更刺",
    timeToSee: "提亮 4 週；淡斑、細紋 12 週",
    note: "要不透光、密封包裝，變深黃就失效。",
  },
  "ethyl-ascorbic-acid": {
    minimum: "1%–2%",
    sweetSpot: "2%–5%",
    timeToSee: "8–12 週",
    note: "衍生物要在皮膚裡轉換，人體數據比左旋 C 少。",
  },
  "ascorbyl-glucoside": {
    minimum: "2%",
    sweetSpot: "2%–5%",
    timeToSee: "8–12 週",
  },
  "ferulic-acid": { minimum: "0.5%", sweetSpot: "0.5%（與維生素 C、E 一起）", timeToSee: "看搭配的維生素 C" },
  tocopherol: { minimum: "0.5%", sweetSpot: "1%（與維生素 C 一起）", timeToSee: "看搭配的維生素 C" },
  retinol: {
    minimum: "0.1%",
    sweetSpot: "入門 0.1%–0.3%；耐受後 0.5%–1%",
    tooMuch: "一開始就用 1% 很容易脫皮、泛紅",
    timeToSee: "膚質 4–8 週；細紋 3–6 個月",
    note: "每週兩到三晚開始。標示「A 醇複合」的產品，總濃度不等於純視黃醇。",
  },
  retinal: {
    minimum: "0.05%",
    sweetSpot: "0.05%–0.1%",
    tooMuch: "0.2% 以上對新手偏強",
    timeToSee: "4–12 週，通常比同濃度 A 醇快",
    note: "A 醛只差一步就變成 A 酸，作用約為 A 醇的十倍強度，所以濃度看起來很低。",
  },
  adapalene: { minimum: "0.1%", sweetSpot: "0.1%", tooMuch: "0.3% 是醫師處方強度", timeToSee: "痘痘 8–12 週" },
  hpr: { minimum: "0.2%", sweetSpot: "0.2%–2%（原料液濃度）", timeToSee: "8–12 週", note: "常見「2% Granactive」是原料溶液，實際 HPR 約十分之一。" },
  bakuchiol: { minimum: "0.5%", sweetSpot: "0.5%–1%", timeToSee: "12 週" },
  "hyaluronic-acid": { minimum: "0.1%", sweetSpot: "0.1%–2%", tooMuch: "高濃度不會更保濕，乾燥環境反而可能更緊", timeToSee: "當下就有感" },
  glycerin: { minimum: "3%", sweetSpot: "5%–10%", timeToSee: "當下；屏障改善 2–4 週" },
  ceramide: { minimum: "看配方總量", sweetSpot: "神經醯胺：膽固醇：脂肪酸約 3:1:1", timeToSee: "2–4 週", note: "單一神經醯胺的百分比意義不大，比例和整瓶脂質組合更重要。" },
  panthenol: { minimum: "1%", sweetSpot: "2%–5%", timeToSee: "數天到 2 週" },
  centella: { minimum: "不公開", sweetSpot: "看到羥基積雪草苷或積雪草苷更好", timeToSee: "2–4 週", note: "多數產品只寫萃取物比例，活性物含量不明。" },
  urea: { minimum: "2%", sweetSpot: "臉 2%–5%；身體粗糙 10%", tooMuch: "20% 以上是厚皮、腳跟用", timeToSee: "粗糙、雞皮 2–4 週" },
  "salicylic-acid": { minimum: "0.5%", sweetSpot: "1%–2%", tooMuch: "台灣保養品上限 2%", timeToSee: "粉刺 4–8 週" },
  "glycolic-acid": {
    minimum: "5%",
    sweetSpot: "5%–10%，pH 3–4",
    tooMuch: "超過 10% 屬換膚等級，在家不建議",
    timeToSee: "光滑 1–2 週；暗沉 4–8 週",
  },
  "lactic-acid": { minimum: "5%", sweetSpot: "5%–12%", timeToSee: "2–6 週" },
  "mandelic-acid": { minimum: "5%", sweetSpot: "5%–10%", tooMuch: "15% 以上先讓皮膚適應", timeToSee: "4–8 週" },
  pha: { minimum: "4%", sweetSpot: "4%–10%", timeToSee: "4–8 週" },
  "azelaic-acid": { minimum: "10%", sweetSpot: "10%–20%", tooMuch: "15%–20% 多為藥品", timeToSee: "痘痘與泛紅 4–8 週；斑 12 週" },
  "tranexamic-acid": { minimum: "2%", sweetSpot: "2%–5%", timeToSee: "8–12 週" },
  "alpha-arbutin": { minimum: "1%", sweetSpot: "1%–2%", tooMuch: "法規上限約 2%", timeToSee: "8–12 週" },
  "kojic-acid": { minimum: "1%", sweetSpot: "1%", tooMuch: "較高濃度過敏機率升高", timeToSee: "8–12 週" },
  licorice: { minimum: "0.1%（光甘草定）", sweetSpot: "依萃取物", timeToSee: "8 週以上" },
  peptides: {
    minimum: "依胜肽種類，多為 ppm 等級",
    sweetSpot: "原料液常見 2%–10%",
    timeToSee: "8–12 週",
    note: "標示「10% 胜肽」通常是胜肽原料液的比例，純胜肽遠低於此。",
  },
  adenosine: { minimum: "0.04%", sweetSpot: "0.04%–0.1%", timeToSee: "8–12 週" },
  "benzoyl-peroxide": { minimum: "2.5%", sweetSpot: "2.5%–5%", tooMuch: "10% 不比 5% 有效，卻更乾更刺", timeToSee: "2–6 週" },
  "zinc-oxide": { minimum: "看 SPF 標示", sweetSpot: "SPF30 以上、足量塗抹", timeToSee: "每天都在發揮" },
  "titanium-dioxide": { minimum: "看 SPF 標示", sweetSpot: "SPF30 以上、足量塗抹", timeToSee: "每天都在發揮" },
  "iron-oxides": { minimum: "有色防曬才有", sweetSpot: "越遮得住可見光越好", timeToSee: "肝斑者 8–12 週" },
  heartleaf: { minimum: "不公開", sweetSpot: "看標示萃取比例", timeToSee: "當下鎮靜感" },
  propolis: { minimum: "不公開", sweetSpot: "看標示萃取比例", timeToSee: "2–4 週" },
  galactomyces: { minimum: "不公開", sweetSpot: "標示 90% 以上屬於高比例", timeToSee: "保濕當下；透亮 4 週" },
  pdrn: { minimum: "不公開", sweetSpot: "外用無公認有效濃度", timeToSee: "未確立" },
  allantoin: { minimum: "0.1%", sweetSpot: "0.2%–2%", timeToSee: "數天" },
  "tea-tree": { minimum: "5%（研究用凝膠）", sweetSpot: "5%", tooMuch: "純精油直接點在臉上容易刺激", timeToSee: "4–12 週" },
  ubiquinone: { minimum: "約 0.3%", sweetSpot: "0.3%–1%", timeToSee: "12 週，效果有限" },
  "snail-mucin": { minimum: "不公開", sweetSpot: "標示 90% 以上屬於高比例", timeToSee: "保濕當下" },
};
