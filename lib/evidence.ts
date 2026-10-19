import type { ClaimVerdict, Product } from "./types";

export type BrandGroup = "luxury" | "counter" | "derm" | "drugstore" | "indie";

export const brandGroupLabel: Record<BrandGroup, string> = {
  luxury: "精品專櫃",
  counter: "一般專櫃",
  derm: "醫美・藥妝品牌",
  drugstore: "開架大廠",
  indie: "新興・網路品牌",
};

export const brandGroupNote: Record<BrandGroup, string> = {
  luxury: "單瓶數千元起，賣的是品牌、香氣與質地。",
  counter: "百貨專櫃或品牌門市，中高價位。",
  derm: "在藥局、醫美診所或強調皮膚科背景的品牌。",
  drugstore: "大集團的開架品牌，研發資源多、價格親民。",
  indie: "韓國、網路起家或主打單一成分的品牌。",
};

const groups: Record<string, BrandGroup> = {
  "La Mer": "luxury",
  "Clé de Peau Beauté": "luxury",
  Chanel: "luxury",
  Dior: "luxury",
  Guerlain: "luxury",
  "Helena Rubinstein": "luxury",
  "SK-II": "luxury",
  Sulwhasoo: "luxury",
  Lancôme: "counter",
  "Estée Lauder": "counter",
  Clinique: "counter",
  "Kiehl's": "counter",
  Shiseido: "counter",
  "Elizabeth Arden": "counter",
  Clarins: "counter",
  belif: "counter",
  Laneige: "counter",
  "Drunk Elephant": "counter",
  Murad: "derm",
  SkinCeuticals: "derm",
  "La Roche-Posay": "derm",
  Avène: "derm",
  Bioderma: "derm",
  Vichy: "derm",
  Eucerin: "derm",
  CeraVe: "derm",
  Cetaphil: "derm",
  Physiogel: "derm",
  "DR.WU": "derm",
  Neogence: "derm",
  Obagi: "derm",
  "iS Clinical": "derm",
  Medik8: "derm",
  "Cell Fusion C": "derm",
  Heliocare: "derm",
  ISDIN: "derm",
  "Dr.G": "derm",
  Aestura: "derm",
  "Dr.Jart+": "derm",
  Medicube: "derm",
  Differin: "derm",
  EltaMD: "derm",
  Vanicream: "derm",
  "Paula's Choice": "derm",
  Embryolisse: "derm",
  "First Aid Beauty": "derm",
  Olay: "drugstore",
  "L'Oréal Paris": "drugstore",
  Garnier: "drugstore",
  Neutrogena: "drugstore",
  NIVEA: "drugstore",
  Vaseline: "drugstore",
  Aveeno: "drugstore",
  Biore: "drugstore",
  Anessa: "drugstore",
  Allie: "drugstore",
  "Skin Aqua": "drugstore",
  "Hada Labo": "drugstore",
  Rohto: "drugstore",
  "Curél": "drugstore",
  MINON: "drugstore",
  KOSÉ: "drugstore",
  Canmake: "drugstore",
  Innisfree: "drugstore",
  Illiyoon: "drugstore",
  AmLactin: "drugstore",
  "Gold Bond": "drugstore",
  "Bio-Oil": "drugstore",
  NARUKO: "drugstore",
};

export function brandGroup(product: Product): BrandGroup {
  return groups[product.brand] ?? "indie";
}

export const verdictLabel: Record<ClaimVerdict, string> = {
  supported: "有證據",
  partial: "部分成立",
  weak: "證據薄弱",
  unsupported: "沒有可信證據",
};

export const verdictNote: Record<ClaimVerdict, string> = {
  supported: "主成分在這個濃度有可靠的人體研究。",
  partial: "方向對，但濃度、幅度或研究品質不夠撐起整句宣稱。",
  weak: "只有品牌自家或很小的研究。",
  unsupported: "沒有可信的人體證據，或和皮膚生理不符。",
};

export const verdictRank: Record<ClaimVerdict, number> = { supported: 0, partial: 1, weak: 2, unsupported: 3 };

export const verdictClass: Record<ClaimVerdict, string> = {
  supported: "border-emerald-700/50 bg-emerald-50 text-emerald-900",
  partial: "border-sky-700/50 bg-sky-50 text-sky-900",
  weak: "border-amber-700/50 bg-amber-50 text-amber-900",
  unsupported: "border-destructive/60 bg-red-50 text-destructive",
};

export const efficacyLabel: Record<number, string> = {
  5: "研究級效果",
  4: "效果明確",
  3: "有幫助",
  2: "效果有限",
  1: "宣稱大於實際",
};

export const efficacyCriteria =
  "實際效果只看這瓶對它主打問題的真實作用：主成分有沒有人體隨機試驗、濃度有沒有到研究的有效範圍。不看價格、不看品牌名氣。5 分是研究級的成分與濃度，1 分是主打宣稱幾乎沒有可信證據。";

export function productEfficacy(product: Product) {
  return product.efficacy ?? 3;
}

export function claimTally(product: Product) {
  const tally: Record<ClaimVerdict, number> = { supported: 0, partial: 0, weak: 0, unsupported: 0 };
  for (const claim of product.claims ?? []) tally[claim.verdict] += 1;
  return tally;
}

export function headlineVerdict(product: Product): ClaimVerdict | undefined {
  const claims = product.claims ?? [];
  if (!claims.length) return undefined;
  const ranks = claims.map((claim) => verdictRank[claim.verdict]);
  const average = ranks.reduce((sum, value) => sum + value, 0) / ranks.length;
  const order: ClaimVerdict[] = ["supported", "partial", "weak", "unsupported"];
  return order[Math.min(3, Math.round(average))];
}

export function pickScore(product: Product, concern: Product["concerns"][number]) {
  const position = product.concerns.indexOf(concern);
  return productEfficacy(product) - (position >= 2 ? 1 : 0);
}

export const defaultProductStudy =
  "沒有找到這瓶產品本身發表在醫學期刊的人體試驗；品牌公布的數據多為自家委託測試。";
