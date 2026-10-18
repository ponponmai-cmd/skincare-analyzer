import { inciDictionary, type InciEntry, type InciFlag } from "./inci-dictionary";
import { inciDictionaryMore } from "./inci-dictionary-more";
import { ingredients } from "./ingredients";
import { products } from "./products";
import type { Concern, Ingredient, Product } from "./types";

export type RowMatch =
  | { kind: "core"; ingredient: Ingredient }
  | { kind: "dict"; entry: InciEntry }
  | { kind: "unknown" };

export interface AnalyzedRow {
  position: number;
  raw: string;
  match: RowMatch;
  flags: InciFlag[];
  belowOnePercent: boolean;
}

export interface Conflict {
  first: Ingredient;
  second: Ingredient;
  reason: string;
}

export interface SimilarProduct {
  product: Product;
  coverage: number;
  shared: string[];
}

export interface Analysis {
  rows: AnalyzedRow[];
  recognized: number;
  actives: AnalyzedRow[];
  concerns: { concern: Concern; count: number }[];
  flagCounts: Partial<Record<InciFlag, string[]>>;
  pregnancy: { avoid: Ingredient[]; caution: Ingredient[] };
  strongIrritants: Ingredient[];
  conflicts: Conflict[];
  similar: SimilarProduct[];
  onePercentLine: number | null;
}

const ubiquitous = new Set(["glycerin", "hyaluronic-acid"]);

const noContainment = new Set(["water", "aqua", "alcohol", "oil", "extract", "acid", "butter"]);

const onePercentMarkers = new Set([
  "phenoxyethanol",
  "chlorphenesin",
  "methylparaben",
  "propylparaben",
  "potassiumsorbate",
  "sodiumbenzoate",
]);

const coreFlags: Record<string, InciFlag[]> = {
  fragrance: ["fragrance"],
  "alcohol-denat": ["drying-alcohol"],
  "tea-tree": ["essential-oil"],
  phenoxyethanol: ["preservative"],
};

function key(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^a-z0-9\u3400-\u9fff]/g, "");
}

function withoutParens(value: string) {
  return value.replace(/[（(][^)）]*[)）]/g, " ");
}

type Candidate = { match: RowMatch; key: string };

const exactIndex = new Map<string, RowMatch>();
const containIndex: Candidate[] = [];

function register(term: string, match: RowMatch, allowOverride = false) {
  for (const variant of [term, withoutParens(term)]) {
    const k = key(variant);
    if (k.length === 0) continue;
    if (allowOverride || !exactIndex.has(k)) exactIndex.set(k, match);
    const isCjk = /[\u3400-\u9fff]/.test(k);
    if (!noContainment.has(k) && (isCjk ? k.length >= 3 : k.length >= 6)) {
      containIndex.push({ match, key: k });
    }
  }
}

for (const entry of [...inciDictionary, ...inciDictionaryMore]) {
  const match: RowMatch = { kind: "dict", entry };
  [entry.inci, entry.zh, ...(entry.aliases ?? [])].forEach((term) => register(term, match));
}
for (const ingredient of ingredients) {
  const match: RowMatch = { kind: "core", ingredient };
  [ingredient.inci, ingredient.nameEn, ingredient.nameZh, ...ingredient.aliases].forEach((term) =>
    register(term, match, true),
  );
}
containIndex.sort((a, b) => b.key.length - a.key.length);

export function splitList(text: string) {
  return text
    .replace(/\r/g, "")
    .replace(/^[^:：\n]{0,20}(ingredients|成分|全成分)[^:：\n]{0,10}[:：]/i, "")
    .split(/,(?!\d)|[，、;；\n•·|]/)
    .map((item) => item.replace(/^[\s*\-–—\d.]+(?=[a-zA-Z\u3400-\u9fff])/, "").trim())
    .map((item) => item.replace(/[.。]+$/, "").trim())
    .filter((item) => item.length > 0);
}

export function matchTerm(raw: string): RowMatch {
  for (const variant of [raw, withoutParens(raw)]) {
    const exact = exactIndex.get(key(variant));
    if (exact) return exact;
  }
  for (const piece of raw.split(/[/|\\]/)) {
    const exact = exactIndex.get(key(piece)) ?? exactIndex.get(key(withoutParens(piece)));
    if (exact) return exact;
  }
  const k = key(raw);
  const hit = containIndex.find((candidate) => k.includes(candidate.key));
  return hit ? hit.match : { kind: "unknown" };
}

function flagsFor(match: RowMatch): InciFlag[] {
  if (match.kind === "dict") return match.entry.flags ?? [];
  if (match.kind === "core") return coreFlags[match.ingredient.slug] ?? [];
  return [];
}

function displayName(row: AnalyzedRow) {
  if (row.match.kind === "core") return row.match.ingredient.nameZh;
  if (row.match.kind === "dict") return row.match.entry.zh;
  return row.raw;
}

export function analyze(text: string): Analysis {
  const items = splitList(text);
  let onePercentLine: number | null = null;
  const rows: AnalyzedRow[] = items.map((raw, index) => {
    const match = matchTerm(raw);
    const markerKey =
      match.kind === "dict"
        ? key(match.entry.inci)
        : match.kind === "core"
          ? key(match.ingredient.inci)
          : key(raw);
    const below = onePercentLine !== null;
    if (onePercentLine === null && onePercentMarkers.has(markerKey)) onePercentLine = index;
    return { position: index + 1, raw, match, flags: flagsFor(match), belowOnePercent: below };
  });

  const seen = new Set<string>();
  const actives = rows.filter((row) => {
    if (row.match.kind !== "core") return false;
    const ingredient = row.match.ingredient;
    if (ingredient.category === "base" || seen.has(ingredient.slug)) return false;
    seen.add(ingredient.slug);
    return true;
  });
  const activeIngredients = actives.map((row) => (row.match as { ingredient: Ingredient }).ingredient);

  const concernCount = new Map<Concern, number>();
  for (const ingredient of activeIngredients) {
    for (const concern of ingredient.concerns) {
      concernCount.set(concern, (concernCount.get(concern) ?? 0) + 1);
    }
  }

  const flagCounts: Partial<Record<InciFlag, string[]>> = {};
  for (const row of rows) {
    for (const flag of row.flags) {
      (flagCounts[flag] ??= []).push(displayName(row));
    }
  }

  const present = new Set(activeIngredients.map((item) => item.slug));
  const conflicts: Conflict[] = [];
  const pairSeen = new Set<string>();
  for (const ingredient of activeIngredients) {
    for (const caution of ingredient.cautionWith) {
      const other = activeIngredients.find((item) => item.slug === caution.slug);
      const pairKey = [ingredient.slug, caution.slug].sort().join("|");
      if (other && !pairSeen.has(pairKey)) {
        pairSeen.add(pairKey);
        conflicts.push({ first: ingredient, second: other, reason: caution.reason });
      }
    }
  }

  const distinctive = [...present].filter((slug) => !ubiquitous.has(slug));
  const listActives = distinctive.length > 0 ? new Set(distinctive) : present;
  const similar = products
    .map((product) => {
      const total = product.keyActives.reduce((sum, active) => sum + active.centrality, 0);
      const sharedActives = product.keyActives.filter((active) => present.has(active.ingredient));
      const covered = sharedActives.reduce((sum, active) => sum + active.centrality, 0);
      const productCoverage = total ? covered / total : 0;
      const listCoverage =
        sharedActives.filter((active) => listActives.has(active.ingredient)).length /
        Math.max(1, listActives.size);
      const coverage =
        productCoverage + listCoverage === 0
          ? 0
          : (2 * productCoverage * listCoverage) / (productCoverage + listCoverage);
      return {
        product,
        coverage,
        shared: sharedActives.map((active) => active.ingredient),
      };
    })
    .filter((item) => item.coverage >= 0.4)
    .sort(
      (a, b) =>
        b.coverage - a.coverage ||
        a.product.priceTwd / a.product.volume - b.product.priceTwd / b.product.volume,
    )
    .slice(0, 6);

  return {
    rows,
    recognized: rows.filter((row) => row.match.kind !== "unknown").length,
    actives,
    concerns: [...concernCount.entries()]
      .map(([concern, count]) => ({ concern, count }))
      .sort((a, b) => b.count - a.count),
    flagCounts,
    pregnancy: {
      avoid: activeIngredients.filter((item) => item.pregnancy === "avoid"),
      caution: activeIngredients.filter((item) => item.pregnancy === "caution"),
    },
    strongIrritants: activeIngredients.filter((item) => item.irritancy >= 3),
    conflicts,
    similar,
    onePercentLine,
  };
}

export { displayName };
