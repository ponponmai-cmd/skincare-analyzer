import { getIngredient } from "./catalog";
import type { Product } from "./types";

const base: Record<Product["category"], string> = {
  serum: "洗臉、化妝水之後，取 2–3 滴（約一元硬幣大小）按壓全臉，等半分鐘再上乳液或乳霜。",
  moisturizer: "保養的最後一步，取約一顆珍珠大小，點在額頭、兩頰、下巴後推開；乾的地方可以多疊一層。",
  sunscreen: "早上保養最後一步、出門前 15 分鐘擦。臉加脖子約 1.2 克（兩指長度），流汗、擦汗或戶外每 2 小時補一次。",
  toner: "洗臉後倒在掌心或化妝棉，輕拍到吸收，接著上精華或乳液。",
  treatment: "依仿單或醫師指示，薄薄擦在需要的位置；不要自己加量。",
  body: "洗完澡、皮膚還微濕的 3 分鐘內擦，乾燥的手肘、膝蓋、小腿多擦一層。",
};

export function howToUseFor(product: Product): string[] {
  if (product.howToUse) return [product.howToUse];
  const steps = [base[product.category]];
  const categories = new Set(
    product.keyActives
      .filter((active) => active.centrality >= 3)
      .map((active) => getIngredient(active.ingredient)?.category),
  );
  if (categories.has("retinoid")) {
    steps.push("A 醇／A 醛類只在晚上用。前兩週每週 2–3 晚，皮膚不脫皮再慢慢增加到每晚；當晚不要再疊酸類。");
  }
  if (categories.has("exfoliant") && product.category !== "body") {
    steps.push("酸類晚上用，一週 2–3 次開始。刺痛、脫皮就停幾天，和 A 醇分開不同晚使用。");
  }
  if (product.keyActives.some((active) => active.ingredient === "ascorbic-acid" && active.centrality >= 3)) {
    steps.push("左旋 C 建議早上用，接著一定要擦防曬；開封後放陰涼處，變深褐色就換新。");
  }
  if (categories.has("brightening") || categories.has("exfoliant") || categories.has("retinoid")) {
    steps.push("用這類成分期間，白天防曬是必要的，不然效果會被曬回去。");
  }
  if (product.pregnancy === "avoid") steps.push("懷孕或哺乳期間先不要用。");
  if (product.pregnancy === "caution") steps.push("懷孕或哺乳期間，先問過醫師再用。");
  return steps;
}
