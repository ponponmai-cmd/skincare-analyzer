import { ingredientName } from "./catalog";
import { ingredients } from "./ingredients";
import { products } from "./products";
import type { Ingredient, KeyActive, Product } from "./types";

export type LookupKind = "empty" | "product" | "ingredient" | "brand" | "vague" | "none";

export interface LookupResult {
  query: string;
  kind: LookupKind;
  products: Product[];
  ingredients: Ingredient[];
  activesByProduct: Record<string, KeyActive[]>;
  brandMatched: boolean;
}

const brandAliases: Record<string, string[]> = {
  "Paula's Choice": ["寶拉", "寶拉珍選"],
  SkinCeuticals: ["修麗可", "杜克"],
  "La Roche-Posay": ["理膚", "理膚寶水", "理膚泉"],
  Biore: ["碧柔", "蜜妮"],
  CeraVe: ["適樂膚", "适乐肤"],
  "Drunk Elephant": ["醉象"],
  "Hada Labo": ["肌研"],
  Rohto: ["樂敦"],
  Anessa: ["安耐曬", "安热沙"],
  "The Ordinary": ["the ordinary"],
  "Beauty of Joseon": ["朝鮮美女"],
  Isntree: ["伊思樹"],
  Illiyoon: ["一理潤"],
};

const productAliases: Record<string, string[]> = {
  "skinceuticals-ce-ferulic": ["ce ferulic", "cef", "色修"],
  "anessa-milk": ["金鑽", "金瓶"],
  "lala-retro": ["lala", "拉拉霜"],
  protini: ["protini"],
  "hada-labo-premium": ["極潤"],
  differin: ["達芙寧"],
  "uvmune-400": ["uvmune"],
  "biore-aqua-rich": ["含水防曬"],
};

const vagueQueries = new Set(["防曬", "防曬乳", "防曬霜", "精華", "精華液", "乳液", "乳霜", "化妝水", "保養品"]);

function compact(value: string) {
  return value
    .toLowerCase()
    .replace(/['’!]/g, "")
    .replace(/[跟和與的了是有]/g, "")
    .replace(/[%+./,_()（）\-–—\s]/g, "");
}

function termHit(queryCompact: string, term: string) {
  const termCompact = compact(term);
  if (termCompact.length < 2 || queryCompact.length < 2) return 0;
  if (queryCompact.includes(termCompact)) return termCompact.length;
  if (queryCompact.length >= 4 && termCompact.includes(queryCompact)) return queryCompact.length;
  return 0;
}

function bestHit(queryCompact: string, terms: string[]) {
  return terms.reduce((best, term) => Math.max(best, termHit(queryCompact, term)), 0);
}

function containsAlias(queryCompact: string, aliases: string[]) {
  return aliases.some((alias) => {
    const value = compact(alias);
    return value.length >= 2 && queryCompact.includes(value);
  });
}

function ingredientTerms(ingredient: Ingredient) {
  return [ingredient.nameZh, ingredient.nameEn, ingredient.inci, ...ingredient.aliases];
}

function matchedIngredients(queryCompact: string) {
  return ingredients.filter((ingredient) => {
    return ingredientTerms(ingredient).some((term) => {
      const termCompact = compact(term);
      if (termCompact.length < 2) return false;
      if (/^[a-z0-9]{2,3}$/.test(termCompact)) {
        const pattern = new RegExp(`(?:^|[^a-z0-9])${termCompact}(?:[^a-z0-9]|$)`);
        return pattern.test(queryCompact);
      }
      return queryCompact.includes(termCompact);
    });
  });
}

function isHero(product: Product, active: KeyActive) {
  const peak = Math.max(...product.keyActives.map((item) => item.centrality));
  return active.centrality >= 4 || (active.centrality >= 3 && active.centrality === peak);
}

export function lookupVerdict(rawQuery: string): LookupResult {
  const query = rawQuery.trim();
  const queryCompact = compact(query);
  const empty: LookupResult = {
    query,
    kind: "empty",
    products: [],
    ingredients: [],
    activesByProduct: {},
    brandMatched: false,
  };
  if (queryCompact.length < 2) return empty;

  if (vagueQueries.has(queryCompact)) {
    return { ...empty, kind: "vague" };
  }

  const foundIngredients = matchedIngredients(queryCompact);
  const ingredientSlugs = new Set(foundIngredients.map((item) => item.slug));

  const scored = products.map((product) => {
    const aliases = productAliases[product.slug] ?? [];
    const nameScore = bestHit(queryCompact, [product.name, product.nameZh, ...aliases]);
    const nameHit = nameScore >= 4 || containsAlias(queryCompact, aliases);
    const brandScore = bestHit(queryCompact, [
      product.brand,
      product.brandZh,
      ...(brandAliases[product.brand] ?? []),
    ]);
    const actives = product.keyActives.filter((active) => ingredientSlugs.has(active.ingredient));
    return { product, nameScore, nameHit, brandScore, actives };
  });

  const named = scored.filter((item) => item.nameHit);
  const branded = scored.filter((item) => item.brandScore >= 2);
  const withIngredient = scored.filter((item) => item.actives.length > 0);
  const heroes = withIngredient.filter((item) =>
    item.actives.some((active) => isHero(item.product, active)),
  );
  const queryIsIngredient = foundIngredients.some((ingredient) =>
    ingredientTerms(ingredient).some((term) => compact(term) === queryCompact),
  );

  let chosen = named;
  let kind: LookupKind = "product";

  if (queryIsIngredient && branded.length > 0) {
    chosen = withIngredient.filter((item) => item.brandScore >= 2);
    kind = "ingredient";
  } else if (queryIsIngredient) {
    chosen = heroes;
    kind = "ingredient";
  } else if (named.length > 0) {
    chosen = named;
    kind = "product";
  } else if (foundIngredients.length > 0 && branded.length > 0) {
    chosen = withIngredient.filter((item) => item.brandScore >= 2);
    kind = "ingredient";
  } else if (foundIngredients.length > 0) {
    chosen = heroes;
    kind = "ingredient";
  } else if (branded.length > 0) {
    chosen = branded;
    kind = "brand";
  } else {
    chosen = [];
    kind = "none";
  }

  chosen = [...chosen].sort((a, b) => {
    const aPeak = Math.max(0, ...a.actives.map((active) => active.centrality));
    const bPeak = Math.max(0, ...b.actives.map((active) => active.centrality));
    if (kind === "ingredient" && bPeak !== aPeak) return bPeak - aPeak;
    if (b.nameScore !== a.nameScore) return b.nameScore - a.nameScore;
    return a.product.priceTwd / a.product.volume - b.product.priceTwd / b.product.volume;
  });

  const limited = chosen.slice(0, 6);
  return {
    query,
    kind: limited.length === 0 && foundIngredients.length > 0 ? "ingredient" : kind,
    products: limited.map((item) => item.product),
    ingredients: kind === "product" ? [] : foundIngredients.slice(0, 3),
    activesByProduct: Object.fromEntries(limited.map((item) => [item.product.slug, item.actives])),
    brandMatched: branded.length > 0,
  };
}

export function activeLabel(active: KeyActive) {
  return `${ingredientName(active.ingredient)} ${active.note}`.trim();
}
