import { unitPrice } from "./format";
import { products } from "./products";
import type {
  ActiveGap,
  AnalogGap,
  PairComparison,
  Product,
  Verdict,
} from "./types";

const ANALOGS: { ids: string[]; factor: number }[] = [
  {
    ids: ["ascorbic-acid", "ethyl-ascorbic-acid", "ascorbyl-glucoside"],
    factor: 0.48,
  },
  { ids: ["retinol", "retinal"], factor: 0.64 },
  { ids: ["retinol", "retinal", "adapalene"], factor: 0.5 },
  { ids: ["retinol", "hpr"], factor: 0.34 },
  { ids: ["retinal", "hpr"], factor: 0.34 },
  { ids: ["retinol", "bakuchiol"], factor: 0.26 },
  { ids: ["zinc-oxide", "titanium-dioxide"], factor: 0.42 },
  {
    ids: ["avobenzone", "uvinul-a-plus", "mexoryl-400", "tinosorb-s"],
    factor: 0.32,
  },
];

function analogMatch(sourceId: string, targetIds: string[]) {
  let best: { id: string; factor: number } | null = null;
  for (const group of ANALOGS) {
    if (!group.ids.includes(sourceId)) continue;
    for (const id of targetIds) {
      if (id === sourceId || !group.ids.includes(id)) continue;
      if (!best || group.factor > best.factor) {
        best = { id, factor: group.factor };
      }
    }
  }
  return best;
}

function roleRatio(source: Product, target: Product) {
  const ids = new Set([
    ...source.roles.map((role) => role.id),
    ...target.roles.map((role) => role.id),
  ]);
  let overlap = 0;
  let union = 0;
  for (const id of ids) {
    const left = source.roles.find((role) => role.id === id)?.weight ?? 0;
    const right = target.roles.find((role) => role.id === id)?.weight ?? 0;
    overlap += Math.min(left, right);
    union += Math.max(left, right);
  }
  return union === 0 ? 0 : overlap / union;
}

function coverage(source: Product, target: Product) {
  const targetIds = target.keyActives.map((active) => active.ingredient);
  let points = 0;
  let max = 0;
  const exact: PairComparison["exact"] = [];
  const analogs: AnalogGap[] = [];
  const missing: ActiveGap[] = [];

  for (const active of source.keyActives) {
    max += active.centrality;
    const hit = target.keyActives.find(
      (item) => item.ingredient === active.ingredient,
    );
    if (hit) {
      const coverageFactor = Math.min(1, hit.centrality / active.centrality);
      points += active.centrality * coverageFactor;
      exact.push({
        ingredient: active.ingredient,
        sourceNote: active.note,
        targetNote: hit.note,
      });
      continue;
    }
    const related = analogMatch(active.ingredient, targetIds);
    if (related) {
      const relatedActive = target.keyActives.find(
        (item) => item.ingredient === related.id,
      );
      points += active.centrality * related.factor;
      analogs.push({
        from: active.ingredient,
        to: related.id,
        factor: related.factor,
        fromNote: active.note,
        toNote: relatedActive?.note ?? "",
      });
      continue;
    }
    missing.push({
      ingredient: active.ingredient,
      note: active.note,
      centrality: active.centrality,
    });
  }

  const extras: ActiveGap[] = target.keyActives
    .filter(
      (active) =>
        !source.keyActives.some((item) => item.ingredient === active.ingredient),
    )
    .map((active) => ({
      ingredient: active.ingredient,
      note: active.note,
      centrality: active.centrality,
    }));

  return {
    ratio: max === 0 ? 0 : points / max,
    exact,
    analogs,
    missing,
    extras,
  };
}

function verdictFor(
  ratio: number,
  roles: number,
  missing: ActiveGap[],
  extras: ActiveGap[],
): Verdict {
  const missingImportant = missing.some((item) => item.centrality >= 3);
  const significantExtra = extras.some((item) => item.centrality >= 4);
  if (ratio >= 0.82 && !missingImportant && !significantExtra) return "close";
  if (ratio >= 0.82 && !missingImportant && significantExtra) return "broader";
  if (ratio >= 0.48) return "partial";
  if (roles >= 0.58) return "same-job";
  return "different";
}

export function compareProducts(source: Product, target: Product): PairComparison {
  const covered = coverage(source, target);
  const roles = roleRatio(source, target);
  const sameCategory = source.category === target.category;
  const score = Math.round(
    (0.64 * covered.ratio + 0.36 * roles) * (sameCategory ? 100 : 72),
  );
  const concentrationGap = covered.exact.some((item) => {
    const left = item.sourceNote.match(/\d+(?:\.\d+)?%/);
    const right = item.targetNote.match(/\d+(?:\.\d+)?%/);
    return Boolean(left && right && left[0] !== right[0]);
  });

  return {
    score,
    activeRatio: covered.ratio,
    roleRatio: roles,
    sameCategory,
    verdict: verdictFor(covered.ratio, roles, covered.missing, covered.extras),
    concentrationGap,
    exact: covered.exact,
    analogs: covered.analogs,
    missing: covered.missing,
    extras: covered.extras,
  };
}

export interface Neighbor {
  product: Product;
  comparison: PairComparison;
}

const RANK: Record<Verdict, number> = {
  close: 0,
  partial: 1,
  broader: 2,
  "same-job": 3,
  different: 4,
};

function useful(comparison: PairComparison) {
  return comparison.verdict !== "different";
}

function targetHasDifferentHero(source: Product, target: Product) {
  const shared = new Set(source.keyActives.map((active) => active.ingredient));
  const sharedWeight = target.keyActives
    .filter((active) => shared.has(active.ingredient))
    .reduce((max, active) => Math.max(max, active.centrality), 0);
  return target.keyActives.some(
    (active) =>
      !shared.has(active.ingredient) &&
      active.centrality >= 4 &&
      active.centrality > sharedWeight,
  );
}

export function priceNeighbors(source: Product) {
  const sourcePrice = unitPrice(source);
  const related = products
    .filter((product) => product.slug !== source.slug)
    .map((product) => ({
      product,
      comparison: compareProducts(source, product),
    }))
    .filter((item) => {
      if (!useful(item.comparison)) return false;
      if (item.comparison.verdict === "broader" && item.comparison.roleRatio < 0.45) {
        return false;
      }
      if (
        item.comparison.verdict !== "same-job" &&
        targetHasDifferentHero(source, item.product)
      ) {
        return false;
      }
      return true;
    });

  const sameKind = related.filter((item) => item.comparison.sameCategory);
  const cheaper = sameKind
    .filter((item) => unitPrice(item.product) <= sourcePrice * 0.8)
    .sort(sortNeighbors);
  const peers = sameKind
    .filter((item) => {
      const price = unitPrice(item.product);
      return price > sourcePrice * 0.8 && price < sourcePrice * 1.25;
    })
    .sort(sortNeighbors);
  const pricier = sameKind
    .filter((item) => unitPrice(item.product) >= sourcePrice * 1.25)
    .sort(sortNeighbors);
  const otherFormat = related
    .filter(
      (item) =>
        !item.comparison.sameCategory && item.comparison.activeRatio >= 0.45,
    )
    .sort(sortNeighbors);

  return {
    cheaper: cheaper.slice(0, 4),
    peers: peers.slice(0, 3),
    pricier: pricier.slice(0, 3),
    otherFormat: otherFormat.slice(0, 2),
  };
}

function sortNeighbors(a: Neighbor, b: Neighbor) {
  const byVerdict = RANK[a.comparison.verdict] - RANK[b.comparison.verdict];
  if (byVerdict !== 0) return byVerdict;
  const byScore = b.comparison.score - a.comparison.score;
  if (byScore !== 0) return byScore;
  return unitPrice(a.product) - unitPrice(b.product);
}

export function verdictExplanation(verdict: Verdict, concentrationGap: boolean) {
  if (verdict === "close" && concentrationGap) {
    return "關鍵成分是同一類分子，但標示的濃度或劑型不一樣。這可以是台階，不是複製品。";
  }
  if (verdict === "close") {
    return "關鍵成分高度重疊。價差多半來自品牌、質地、保存與它背後有沒有被研究過的那個比例。";
  }
  if (verdict === "broader") {
    return "這瓶涵蓋你手上的主成份，但另外加了一條很重的功效軸。你多付的是那些加項。";
  }
  if (verdict === "partial") {
    return "有共同主成份，也有明確缺的那一塊。便宜可以換，但要知道你放棄了什麼。";
  }
  if (verdict === "same-job") {
    return "兩邊想處理的皮膚問題接近，配方卻不是同一派。這是另一條路，不是縮小版。";
  }
  return "重疊太低，放在一起比較容易看走眼。";
}
