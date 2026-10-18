import { matchTerm, type RowMatch } from "./analyzer";
import { products } from "./products";
import { fullInci } from "./sources";
import type { Product } from "./types";

export interface InciItem {
  key: string;
  raw: string;
  label: string;
  meaningful: boolean;
  active: boolean;
}

const fillerRole = /防腐|pH|螯合|溶劑|增稠|乳化/;
const fillerCore = new Set(["phenoxyethanol", "fragrance", "alcohol-denat", "glycerin"]);

function stripDose(raw: string) {
  return raw.replace(/\s*\d+(?:\.\d+)?\s*%\s*$/, "").trim();
}

function describe(raw: string, match: RowMatch): InciItem {
  const clean = stripDose(raw);
  if (match.kind === "core") {
    return {
      key: `core:${match.ingredient.slug}`,
      raw,
      label: match.ingredient.nameZh,
      meaningful: !fillerCore.has(match.ingredient.slug),
      active: match.ingredient.category !== "base" && !fillerCore.has(match.ingredient.slug),
    };
  }
  if (match.kind === "dict") {
    const filler =
      match.entry.inci === "Water" || fillerRole.test(match.entry.role) || (match.entry.flags ?? []).length > 0;
    return { key: `dict:${match.entry.inci}`, raw, label: match.entry.zh, meaningful: !filler, active: false };
  }
  const key = clean.toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]/g, "");
  return { key: `raw:${key}`, raw, label: clean, meaningful: !/^(water|aqua)$/.test(key), active: false };
}

const cache = new Map<string, InciItem[]>();

export function inciItems(product: Product): { items: InciItem[]; complete: boolean } {
  const list = fullInci(product.slug);
  if (list.length === 0) {
    const items = product.keyActives.map((active) => {
      const match: RowMatch = { kind: "unknown" };
      return {
        ...describe(active.ingredient, match),
        key: `core:${active.ingredient}`,
        label: active.note,
        meaningful: true,
        active: true,
      };
    });
    return { items, complete: false };
  }
  const cached = cache.get(product.slug);
  if (cached) return { items: cached, complete: true };
  const seen = new Set<string>();
  const items = list
    .map((raw) => describe(raw, matchTerm(stripDose(raw))))
    .filter((item) => (seen.has(item.key) ? false : (seen.add(item.key), true)));
  for (const active of product.keyActives) {
    if (!seen.has(`core:${active.ingredient}`)) {
      items.push({ key: `core:${active.ingredient}`, raw: active.note, label: active.note, meaningful: true, active: true });
    }
  }
  cache.set(product.slug, items);
  return { items, complete: true };
}

function group(product: Product) {
  if (product.category === "body") return "body";
  if (product.category === "sunscreen") return "sun";
  return "face";
}

const unit = (product: Product) => product.priceTwd / product.volume;

export interface OverlapMatch {
  product: Product;
  shared: InciItem[];
  sharedActives: string[];
  meetsThreshold: boolean;
  cheaper: boolean;
}

export function findDupes(source: Product, threshold: number, minimum = 2, maximum = 3): OverlapMatch[] {
  const sourceItems = inciItems(source).items;
  const sourceKeys = new Map(sourceItems.filter((item) => item.meaningful).map((item) => [item.key, item]));
  const sourceActives = new Set(source.keyActives.map((active) => active.ingredient));

  const scored = products
    .filter((product) => product.slug !== source.slug && group(product) === group(source))
    .map((product) => {
      const items = inciItems(product).items;
      const shared = items.filter((item) => item.meaningful && sourceKeys.has(item.key));
      const sharedActives = product.keyActives
        .map((active) => active.ingredient)
        .filter((slug) => sourceActives.has(slug));
      const sameCategory = product.category === source.category;
      const score = shared.length + sharedActives.length * 2 + (sameCategory ? 1 : 0);
      return {
        product,
        shared,
        sharedActives,
        meetsThreshold: shared.length >= threshold,
        cheaper: unit(product) < unit(source),
        score,
        relevant: sharedActives.length > 0 || (sameCategory && shared.length > 0),
      };
    })
    .filter((item) => item.relevant);

  const rank = (a: (typeof scored)[number], b: (typeof scored)[number]) =>
    Number(b.meetsThreshold) - Number(a.meetsThreshold) || b.score - a.score || unit(a.product) - unit(b.product);

  const cheaper = scored.filter((item) => item.cheaper).sort(rank);
  const picked = cheaper.slice(0, maximum).filter((item, index) => index < minimum || item.meetsThreshold);
  if (picked.length < minimum) {
    const rest = scored.filter((item) => !item.cheaper).sort(rank);
    picked.push(...rest.slice(0, minimum - picked.length));
  }
  return picked.map(({ product, shared, sharedActives, meetsThreshold, cheaper: isCheaper }) => ({
    product,
    shared,
    sharedActives,
    meetsThreshold,
    cheaper: isCheaper,
  }));
}
