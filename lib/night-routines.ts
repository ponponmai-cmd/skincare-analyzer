import type { AgeBand } from "./types";

export interface NightStep {
  step: string;
  how: string;
  productSlugs?: string[];
}

export interface NightPlan {
  summary: string;
  week: { day: string; kind: "active" | "repair" | "acid"; label: string }[];
  activeNight: NightStep[];
  repairNight: NightStep[];
  ifIrritated: string;
  extra: string[];
}

const days = ["一", "二", "三", "四", "五", "六", "日"];

function week(pattern: ("active" | "repair" | "acid")[], labels: Record<"active" | "repair" | "acid", string>) {
  return pattern.map((kind, index) => ({ day: `週${days[index]}`, kind, label: labels[kind] }));
}

const cleanse: NightStep = {
  step: "卸防曬、洗臉",
  how: "有擦防曬或妝，先用卸妝油或卸妝乳在乾臉上按摩 30 秒，加水乳化後沖掉，再用溫和洗面乳洗 20–30 秒。水溫接近體溫，不要用熱水。毛巾按乾，不要來回擦。",
};

export const nightPlans: Record<AgeBand, NightPlan> = {
  teens: {
    summary: "晚上的重點只有三件：洗乾淨、處理粉刺、保濕。一次只用一個「痘痘活性」，其他晚上讓皮膚休息。",
    week: week(["acid", "repair", "acid", "repair", "acid", "repair", "repair"], {
      acid: "痘痘活性夜",
      repair: "只保濕",
      active: "痘痘活性夜",
    }),
    activeNight: [
      cleanse,
      {
        step: "等臉全乾 3–5 分鐘",
        how: "濕的皮膚吸收快、也比較會刺。擦乾後等一下再上活性。",
      },
      {
        step: "一個痘痘活性",
        how: "水楊酸或杜鵑花酸擇一，擦在容易長粉刺的 T 字、下巴，一元硬幣大小。第一週隔天擦就好。",
        productSlugs: ["cosrx-bha", "the-ordinary-azelaic"],
      },
      {
        step: "清爽保濕",
        how: "全臉薄擦一層乳液或凝露。出油也要擦，缺水反而更油。",
        productSlugs: ["cerave-cream", "torriden-dive-in"],
      },
    ],
    repairNight: [
      cleanse,
      { step: "化妝水或保濕精華（可省）", how: "乾的人拍一層玻尿酸化妝水；不乾可以直接跳過。", productSlugs: ["hada-labo-premium"] },
      { step: "保濕", how: "乳液或乳霜，嘴角、鼻翼乾的位置多擦一點。", productSlugs: ["cerave-cream"] },
    ],
    ifIrritated: "刺痛、脫皮、發紅，就停掉痘痘活性 3–5 天，只洗臉加保濕。紅腫大顆痘或會留疤，請看皮膚科，比自己換產品快。",
    extra: ["不要擠痘痘，尤其是下巴和鼻子周圍。", "枕頭套一週換一次，手機螢幕常擦。", "睡前不要再厚敷面膜或面霜「悶」痘痘。"],
  },
  "20s": {
    summary: "二十多歲的晚上開始放入 A 醇，但要慢慢來。一週分成「A 醇夜」和「修護夜」，酸類另外排，不要同一晚。",
    week: week(["active", "repair", "active", "repair", "acid", "repair", "repair"], {
      active: "A 醇夜",
      repair: "修護夜",
      acid: "酸類夜（可省）",
    }),
    activeNight: [
      cleanse,
      { step: "等臉全乾 5 分鐘", how: "A 醇擦在濕臉上比較刺。可以先刷牙、吹頭髮再回來。" },
      {
        step: "A 醇，豌豆大小",
        how: "取一顆豌豆大小，點在額頭、兩頰、下巴再推開。避開眼頭、鼻翼、嘴角。新手先 0.1%–0.3%。",
        productSlugs: ["cerave-retinol", "the-ordinary-retinol"],
      },
      { step: "保濕乳霜", how: "等 1–2 分鐘再擦乳霜。容易乾的人可以「三明治」：先薄擦乳霜、A 醇、再一層乳霜。", productSlugs: ["cerave-cream", "lrp-double-repair"] },
    ],
    repairNight: [
      cleanse,
      { step: "保濕精華", how: "玻尿酸或積雪草精華 2–3 滴，按壓全臉。", productSlugs: ["torriden-dive-in", "skin1004-centella-ampoule"] },
      { step: "乳霜", how: "珍珠大小，乾的位置疊第二層。", productSlugs: ["cerave-cream"] },
    ],
    ifIrritated: "A 醇擦完會刺、隔天脫皮：改成每週 2 晚，或改用三明治擦法。刺痛超過 3 天，先停一週只做修護夜。",
    extra: ["A 醇和果酸、水楊酸不要同一晚。", "白天一定要防曬，不然 A 醇做的事會被曬掉。", "熬夜後的晚上跳過 A 醇，改修護夜。"],
  },
  "30s": {
    summary: "三十歲的晚上是抗老的主場。A 醇（或 A 醛）是主角，胜肽和保濕是配角，一週 1 次溫和酸類讓表面更平滑。",
    week: week(["active", "repair", "active", "acid", "active", "repair", "repair"], {
      active: "A 醇／A 醛夜",
      repair: "修護夜",
      acid: "溫和酸類夜",
    }),
    activeNight: [
      cleanse,
      { step: "等臉全乾 5 分鐘", how: "眼周先擦一點保濕霜或凡士林，保護最薄的地方。" },
      {
        step: "A 醇或 A 醛",
        how: "豌豆大小全臉。用了半年以上不刺，可以從 0.3% A 醇升級到 0.5%–1%，或換成 A 醛。",
        productSlugs: ["the-ordinary-retinol", "lrp-retinol-b3", "paulas-retinal-pro"],
      },
      { step: "保濕乳霜", how: "選含神經醯胺的乳霜，可以減少 A 醇的乾燥。", productSlugs: ["cerave-cream", "illiyoon-ato"] },
    ],
    repairNight: [
      cleanse,
      { step: "胜肽或保濕精華", how: "胜肽精華 2–3 滴，按壓全臉，脖子也擦。", productSlugs: ["the-ordinary-peptides", "neogence-peptide-10"] },
      { step: "乳霜", how: "珍珠大小。冬天或冷氣房可以換成厚一點的乳霜。", productSlugs: ["lrp-double-repair", "kiehls-ufc"] },
    ],
    ifIrritated: "臉頰紅、刺：A 醇退回每週 2 晚，酸類夜先取消。泛紅超過兩週沒退，可能是酒糟或濕疹，請看皮膚科。",
    extra: ["酸類夜不要再擦 A 醇。PHA 或杏仁酸比較溫和。", "脖子和手背也是會老的地方，A 醇用剩的推到脖子即可（脖子更薄，頻率減半）。", "睡前 2 小時不要大量喝水或吃很鹹，早上比較不浮腫。"],
  },
  "40s": {
    summary: "四十歲以後皮膚變乾、修復變慢。A 醇照樣是主角，但要搭較滋潤的乳霜；修護夜比重增加。",
    week: week(["active", "repair", "active", "repair", "active", "repair", "acid"], {
      active: "A 醇夜",
      repair: "修護夜",
      acid: "溫和酸類夜（皮膚粗才用）",
    }),
    activeNight: [
      cleanse,
      { step: "保濕化妝水", how: "倒在手心拍兩次，乾的人可以先上一層，再等乾。", productSlugs: ["hada-labo-premium"] },
      {
        step: "A 醇",
        how: "豌豆大小全臉。四十歲以後皮膚比較乾，先用乳霜型 A 醇。",
        productSlugs: ["cerave-retinol", "lrp-retinol-b3", "neogence-retinol-18"],
      },
      { step: "滋潤乳霜", how: "選含神經醯胺、膽固醇、脂肪酸的乳霜，乾的地方厚一點。", productSlugs: ["lrp-double-repair", "curel-cream"] },
    ],
    repairNight: [
      cleanse,
      { step: "保濕或胜肽精華", how: "2–3 滴全臉加脖子。", productSlugs: ["neogence-peptide-10", "drwu-hyaluronic"] },
      { step: "厚一點的修護霜", how: "珍珠大小再多一點。特別乾的位置最後點一點凡士林或修復霜封住。", productSlugs: ["lrp-cicaplast", "kiehls-ufc"] },
    ],
    ifIrritated: "脫皮、緊繃：改成每週 2 晚 A 醇，乳霜換更厚的。眼周乾紋可以晚上點一點修復霜或凡士林。",
    extra: ["卸妝不要用含酒精的卸妝水大力擦。", "睡覺枕頭選絲質或棉質，側睡的人臉頰壓痕會比較少。", "更年期前後皮膚突然變敏感，修護夜要增加。"],
  },
  "50plus": {
    summary: "五十歲以後先讓皮膚舒服：屏障修護是每晚的基本，A 醇用較低頻率維持。乾癢、泛紅比細紋更值得先處理。",
    week: week(["active", "repair", "repair", "active", "repair", "repair", "repair"], {
      active: "A 醇夜（低頻率）",
      repair: "修護夜",
      acid: "修護夜",
    }),
    activeNight: [
      { ...cleanse, how: "用卸妝乳或溫和的乳狀洗面乳，不要用起很多泡的洗面乳。洗完 3 分鐘內就上保養。" },
      { step: "保濕精華", how: "玻尿酸或甘油精華先墊一層。", productSlugs: ["drwu-hyaluronic"] },
      { step: "低濃度 A 醇", how: "0.1%–0.3% 就夠，豌豆大小，每週 2 晚。", productSlugs: ["cerave-retinol"] },
      { step: "滋潤修護霜", how: "全臉厚擦，脖子、手背一起。", productSlugs: ["lrp-double-repair", "curel-cream"] },
    ],
    repairNight: [
      { ...cleanse, how: "用卸妝乳或溫和的乳狀洗面乳。洗完 3 分鐘內就上保養。" },
      { step: "保濕精華", how: "玻尿酸、甘油、積雪草或泛醇（B5）都可以。", productSlugs: ["drwu-hyaluronic", "skin1004-centella-ampoule"] },
      { step: "厚修護霜", how: "全臉厚擦。嘴角、眼周、鼻翼最後點一點凡士林或 B5 修復霜。", productSlugs: ["lrp-cicaplast", "vanicream-cream"] },
    ],
    ifIrritated: "又乾又癢、抓出紅疹：先停 A 醇，只做修護夜，洗澡水不要太熱。超過兩週沒好轉或有破皮，請看皮膚科。",
    extra: ["臥室開冷氣或暖氣時可以放加濕器。", "身體也要擦乳液，小腿最容易乾癢。", "新的斑、會長大或流血的斑，請給皮膚科看，不要只擦淡斑精華。"],
  },
};
