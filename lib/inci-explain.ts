import { matchTerm, type RowMatch } from "./analyzer";
import { getIngredient } from "./catalog";
import { inciFlagLabel, inciFlagNote } from "./inci-dictionary";
import tfda from "./data/tfda.json";

export interface LegalNote {
  list: string;
  scope?: string;
  limit?: string;
  rule?: string;
  warning?: string;
}

export interface InciExplanation {
  raw: string;
  zh?: string;
  purpose: string;
  cautions: string[];
  notes: string[];
  legal: LegalNote[];
  banned?: string;
  ingredientSlug?: string;
  guessed: boolean;
}

const data = tfda as unknown as {
  entries: LegalNote[];
  limits: Record<string, number[]>;
  banned: Record<string, string>;
};

const tfdaKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

function legalFor(raw: string) {
  const candidates = new Set<string>();
  const plain = raw.replace(/[（(][^)）]*[)）]/g, " ");
  const whole = new Set([tfdaKey(raw), tfdaKey(plain)]);
  for (const value of [raw, plain, ...raw.split(/[/\\|]/), ...plain.split(/[/\\|]/)]) {
    const key = tfdaKey(value);
    if (key.length >= 4) candidates.add(key);
  }
  const isPolymer = /polymer|copolymer/i.test(raw);
  const legal: LegalNote[] = [];
  let banned: string | undefined;
  for (const key of candidates) {
    for (const index of data.limits[key] ?? []) {
      const entry = data.entries[index];
      if (!legal.includes(entry)) legal.push(entry);
    }
    if (!isPolymer && whole.has(key)) banned ??= data.banned[key];
  }
  return { legal, banned };
}

const essentialOilGenus =
  /^(citrus|lavandula|mentha|eucalyptus|rosmarinus|pinus|anthemis|chamomilla|cymbopogon|pelargonium|melaleuca|santalum|cananga|juniperus|cupressus|salvia|origanum|thymus|cinnamomum|syzygium|ocimum|boswellia|pogostemon|vetiveria|jasminum|rosa|aniba|litsea|abies|cedrus)\b/;

const families: [RegExp, string, string[]?][] = [
  [/\b(peel|leaf|flower|bark|wood|root|herb|needle|twig)\s+oil\b/, "精油", ["精油有香氣，較容易引起過敏或刺激，敏感肌留意。"]],
  [/\b(seed|kernel|fruit|nut|germ|bran)?\s*oil\b|\bbutter\b/, "植物油脂：潤膚、補充油分"],
  [/\bwax\b|\bcera\b|ozokerite/, "蠟：增稠、封住水分"],
  [/^ci \d{5}|\b(red|yellow|blue|green|black|violet) \d+\b/, "色素：調整產品顏色", ["色素對功效沒有幫助；對色素過敏的人留意。"]],
  [/glycerides?$|^tri(isostearin|behenin|hydroxystearin)/, "油脂：潤膚、增稠"],
  [/ferment|lysate|\byeast\b|\bfaex\b/, "發酵產物：保濕、調理"],
  [/callus|culture/, "植物細胞培養萃取：抗氧化、調理宣稱"],
  [/extract|juice|\bwater\b|powder|seed ?meal|seedcake|exopolysaccharide/, "植物或天然萃取：多為抗氧化、保濕、舒緩宣稱，通常含量不高"],
  [/protein|collagen|peptide|elastin/, "蛋白、胜肽：保濕、成膜"],
  [/methicone|siloxane|silane|silicone|trisiloxane/, "矽靈：讓質地滑順、形成保護膜"],
  [/^peg|^ppg|ceteth|ceteareth|steareth|laureth|oleth|polysorbate|poloxamer|sorbitan|polyglyceryl|glucoside|glyceryl .*ate$|lecithin/, "乳化、增溶：讓油和水混在一起"],
  [/copolymer|crosspolymer|polymer|polyquaternium|polyester|\bgum\b|starch|cellulose|\bagar\b|hectorite|bentonite|carbomer|taurate/, "增稠、成膜：調整質地"],
  [/gluconate|edta|edetate|phytate|disuccinate/, "螯合：穩定配方"],
  [/citrate|phosphate|hydroxide|carbonate$/, "pH 調節、緩衝"],
  [/alkanes?$|undecane|tridecane|isobutane|dodecane/, "揮發性潤膚：清爽不油"],
  [/(lauric|arachidic|behenic|capric|caprylic) acid/, "脂肪酸：乳化、潤膚"],
  [/(cetyl|cetearyl|isopropyl|octyldodecyl|decyl|ethylhexyl|neopentyl|propylheptyl|isostearyl|myristyl|stearyl|butyl|ethyl|glycol|coco)[- ].*(ate|anoate|anoin|ester|esters)$|esters?$|estolide/, "潤膚酯：讓質地好推、不油膩"],
  [/stearate$|distearate$/, "粉體、增稠"],
];

function guess(raw: string): { purpose: string; cautions: string[] } | undefined {
  const value = raw.toLowerCase().replace(/[\u200b-\u200f\u2060\u00ad]/g, "").trim();
  if (/\boil\b/.test(value) && essentialOilGenus.test(value) && !/seed oil|kernel oil|fruit oil.*(hippophae)/.test(value)) {
    return { purpose: "精油：香氣", cautions: ["精油有香氣，較容易引起過敏或刺激，敏感肌留意。"] };
  }
  for (const [pattern, purpose, cautions] of families) {
    if (pattern.test(value)) {
      const extra = /^citrus/.test(value) && /extract|peel/.test(value) ? ["柑橘類萃取可能帶香氣，敏感肌留意。"] : [];
      return { purpose, cautions: [...(cautions ?? []), ...extra] };
    }
  }
  return undefined;
}

const cautionWords = /過敏|刺|孕|留意|粉刺|光敏|發紅|敏感/;

function fromMatch(match: RowMatch): { zh: string; purpose: string; cautions: string[]; notes?: string[]; ingredientSlug?: string } | undefined {
  if (match.kind === "core") {
    const ingredient = match.ingredient;
    const cautions: string[] = [];
    if (ingredient.pregnancy === "avoid") cautions.push("孕期、哺乳期避免。");
    if (ingredient.pregnancy === "caution") cautions.push("孕期、哺乳期先問醫師。");
    if (ingredient.irritancy >= 3) cautions.push("刺激性較高，從低頻率開始，白天要防曬。");
    else if (ingredient.irritancy === 2) cautions.push("部分人會刺或泛紅。");
    for (const item of ingredient.cautionWith.slice(0, 2)) {
      cautions.push(`別和${getIngredient(item.slug)?.nameZh ?? item.slug}同時用：${item.reason}`);
    }
    if (ingredient.slug === "fragrance") cautions.push("香料是最常見的保養品過敏原，敏感肌與孕期能避就避。");
    if (ingredient.slug === "alcohol-denat") cautions.push("排在前段時，乾敏肌容易刺痛、變乾。");
    return {
      zh: ingredient.nameZh,
      purpose: ingredient.functions.join("、"),
      cautions,
      ingredientSlug: ingredient.slug,
    };
  }
  if (match.kind === "dict") {
    const entry = match.entry;
    const flags = (entry.flags ?? []).filter((flag) => flag !== "preservative");
    const warns = entry.note && cautionWords.test(entry.note);
    const cautions = [
      ...flags.map((flag) => `${inciFlagLabel[flag]}：${inciFlagNote[flag]}`),
      ...(entry.note && warns ? [entry.note] : []),
    ];
    return { zh: entry.zh, purpose: entry.role, cautions, notes: entry.note && !warns ? [entry.note] : [] };
  }
  return undefined;
}

export function explainInci(rawInput: string): InciExplanation {
  const raw = rawInput.replace(/[\u200b-\u200f\u2060\u00ad]/g, "").replace(/\s+/g, " ").trim();
  const term = raw.replace(/\s*\d+(?:\.\d+)?\s*%\s*$/, "");
  const known = fromMatch(matchTerm(term));
  const guessed = known ? undefined : guess(term);
  const { legal, banned } = legalFor(term);
  const cautions = [...(known?.cautions ?? guessed?.cautions ?? [])];
  if (banned) cautions.unshift("台灣規定化粧品不得添加此成分（海外版配方，台灣販售版應不同）。");
  return {
    raw,
    zh: known?.zh,
    purpose: known?.purpose ?? guessed?.purpose ?? "資料庫還沒有這個成分的說明",
    cautions,
    notes: known?.notes ?? [],
    legal,
    banned,
    ingredientSlug: known?.ingredientSlug,
    guessed: !known,
  };
}

export const tfdaSource = {
  name: "衛生福利部食品藥物管理署（政府資料開放平臺）",
  url: "https://data.gov.tw/dataset/173685",
};
