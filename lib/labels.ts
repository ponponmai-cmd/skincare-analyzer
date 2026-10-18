import type {
  AgeBand,
  Concern,
  Evidence,
  IngredientCategory,
  Origin,
  Pregnancy,
  ProductCategory,
  RoleId,
  SkinType,
  Verdict,
  WhiteCast,
} from "./types";

export const DATA_AS_OF = "2026-10";

export const evidenceLabel: Record<Evidence, string> = {
  strong: "人體證據充足",
  moderate: "有人體資料",
  limited: "證據有限",
  context: "用來讀標籤",
};

export const pregnancyLabel: Record<Pregnancy, string> = {
  avoid: "孕期避免",
  caution: "孕期先問醫師",
  compatible: "孕期通常可接受",
};

export const concernLabel: Record<Concern, string> = {
  acne: "痘痘",
  pigment: "色素",
  aging: "光老化",
  barrier: "屏障",
  hydration: "保濕",
  redness: "泛紅",
  oil: "出油",
  sun: "日曬",
};

export const ageLabel: Record<AgeBand, string> = {
  teens: "青春期",
  "20s": "二十多歲",
  "30s": "三十多歲",
  "40s": "四十多歲",
  "50plus": "五十歲以後",
};

export const ingredientCategoryLabel: Record<IngredientCategory, string> = {
  retinoid: "視黃醇家族",
  antioxidant: "抗氧化",
  brightening: "淡斑",
  exfoliant: "去角質酸類",
  humectant: "吸濕保濕",
  barrier: "屏障脂質",
  soothing: "舒緩",
  peptide: "胜肽",
  antimicrobial: "抑菌抗痘",
  filter: "防曬過濾劑",
  base: "基底與標籤詞",
};

export const productCategoryLabel: Record<ProductCategory, string> = {
  serum: "精華",
  moisturizer: "乳霜",
  sunscreen: "防曬",
  toner: "化妝水",
  treatment: "藥品型外用",
  body: "身體乳",
};

export const skinLabel: Record<SkinType, string> = {
  dry: "乾",
  oily: "油",
  combination: "混合",
  sensitive: "敏感",
  normal: "中性",
};

export const roleLabel: Record<RoleId, string> = {
  "vitamin-c": "維生素 C",
  pigment: "淡斑",
  acne: "痘痘",
  retinoid: "視黃醇路線",
  barrier: "屏障修護",
  hydration: "保濕",
  peptide: "胜肽",
  "sun-daily": "日常防曬",
  "sun-outdoor": "戶外抗水",
  "sun-mineral": "無機過濾劑",
  "sun-sensitive": "敏感肌防曬",
};

export const verdictLabel: Record<Verdict, string> = {
  close: "成分接近",
  partial: "只重疊一部分",
  broader: "範圍比你這瓶更大",
  "same-job": "做的事接近",
  different: "不建議互看",
};

export const whiteCastLabel: Record<WhiteCast, string> = {
  none: "幾乎不泛白",
  slight: "輕微泛白",
  visible: "看得到白色或色調",
};

export const irritancyLabel = ["很低", "低", "中等", "偏高", "高"] as const;

export const concernOrder: Concern[] = [
  "sun",
  "acne",
  "pigment",
  "aging",
  "barrier",
  "hydration",
  "redness",
  "oil",
];

export const ageOrder: AgeBand[] = ["teens", "20s", "30s", "40s", "50plus"];

export const ingredientCategoryOrder: IngredientCategory[] = [
  "retinoid",
  "antioxidant",
  "brightening",
  "exfoliant",
  "humectant",
  "barrier",
  "soothing",
  "peptide",
  "antimicrobial",
  "filter",
  "base",
];

export const originLabel: Record<Origin, string> = {
  korea: "韓國",
  taiwan: "台灣",
  japan: "日本",
  western: "歐美",
};

export const originOrder: Origin[] = ["korea", "taiwan", "japan", "western"];

export const productCategoryOrder: ProductCategory[] = [
  "sunscreen",
  "serum",
  "treatment",
  "moisturizer",
  "toner",
  "body",
];
