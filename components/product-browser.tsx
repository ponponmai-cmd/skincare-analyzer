"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { goals } from "@/lib/goals";
import { goalProducts } from "@/lib/lookup";
import { isBestSeller, momoSales } from "@/lib/media";
import { productRating } from "@/lib/ratings";
import { productHaystack } from "@/lib/catalog";
import {
  ageLabel,
  ageOrder,
  concernLabel,
  concernOrder,
  originLabel,
  originOrder,
  productCategoryLabel,
  productCategoryOrder,
} from "@/lib/labels";
import { productOrigin } from "@/lib/shopping";
import type { AgeBand, Concern, Origin, ProductCategory } from "@/lib/types";

type Tier = "all" | "bestseller" | "luxury" | "budget";
type Sort = "unit" | "fit" | "rating" | "sales";

const tierOptions: readonly (readonly [Tier, string])[] = [
  ["all", "全部"],
  ["bestseller", "知名熱銷（momo 銷量破千）"],
  ["budget", "平價（NT$600 以下）"],
  ["luxury", "奢華款"],
];

const sortOptions: readonly (readonly [Sort, string])[] = [
  ["fit", "最對症"],
  ["unit", "單價低"],
  ["rating", "星等高"],
  ["sales", "銷量高"],
];

export function ProductBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [concern, setConcern] = useState<Concern | "all">("all");
  const [age, setAge] = useState<AgeBand | "all">("all");
  const [origin, setOrigin] = useState<Origin | "all">("all");
  const params = useSearchParams();
  const initialGoal = goals.some((item) => item.id === params.get("goal")) ? params.get("goal")! : "all";
  const initialTier = tierOptions.find(([value]) => value === params.get("tier"))?.[0] ?? "all";
  const [goal, setGoal] = useState<string>(initialGoal);
  const [tier, setTier] = useState<Tier>(initialTier);
  const [sort, setSort] = useState<Sort>(initialGoal === "all" ? "unit" : "fit");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const goalHit = goal === "all" ? null : goals.find((item) => item.id === goal);
    const goalRank = goalHit ? new Map(goalProducts(goalHit).map((product, index) => [product.slug, index])) : null;
    const filtered = products
      .filter((product) => {
        if (goalRank && !goalRank.has(product.slug)) return false;
        if (tier === "bestseller" && !isBestSeller(product.slug)) return false;
        if (tier === "luxury" && product.tier !== "luxury") return false;
        if (tier === "budget" && product.priceTwd > 600) return false;
        if (origin !== "all" && productOrigin(product) !== origin) return false;
        if (category !== "all" && product.category !== category) return false;
        if (concern !== "all" && !product.concerns.includes(concern)) return false;
        if (age !== "all" && !product.ages.includes(age)) return false;
        if (!needle) return true;
        return productHaystack(product).includes(needle);
      })
      ;
    const unit = (product: (typeof products)[number]) => product.priceTwd / product.volume;
    return filtered.sort((a, b) => {
      if (sort === "fit" && goalRank) return (goalRank.get(a.slug) ?? 0) - (goalRank.get(b.slug) ?? 0);
      if (sort === "rating") return productRating(b.slug) - productRating(a.slug) || unit(a) - unit(b);
      if (sort === "sales") return momoSales(b.slug) - momoSales(a.slug) || unit(a) - unit(b);
      return unit(a) - unit(b);
    });
  }, [query, category, concern, age, origin, goal, tier, sort]);

  return (
    <div>
      <label className="grid gap-1 text-sm">
        <span className="text-muted-foreground">搜尋品牌或產品</span>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="例如：修麗可、COSRX、達爾膚、傳明酸"
          className="h-10 bg-card"
        />
      </label>
      <ChipRow
        label="想處理的問題"
        value={goal}
        onChange={(value) => {
          setGoal(value);
          if (value !== "all") {
            setConcern("all");
            setSort("fit");
          } else if (sort === "fit") setSort("unit");
        }}
        options={[["all", "全部"], ...goals.map((item) => [item.id, item.short] as const)]}
      />
      <ChipRow
        label="知名度與價位"
        value={tier}
        onChange={setTier}
        options={tierOptions}
      />
      <ChipRow
        label="產地"
        value={origin}
        onChange={setOrigin}
        options={[["all", "全部"], ...originOrder.map((item) => [item, originLabel[item]] as const)]}
      />
      <ChipRow
        label="種類"
        value={category}
        onChange={setCategory}
        options={[
          ["all", "全部"],
          ...productCategoryOrder.map(
            (item) => [item, productCategoryLabel[item]] as const,
          ),
        ]}
      />
      <ChipRow
        label="標示功效"
        value={concern}
        onChange={setConcern}
        options={[
          ["all", "全部"],
          ...concernOrder.map((item) => [item, concernLabel[item]] as const),
        ]}
      />
      <ChipRow
        label="年紀"
        value={age}
        onChange={setAge}
        options={[["all", "全部"], ...ageOrder.map((item) => [item, ageLabel[item]] as const)]}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{results.length} 項 · 排序</span>
          {sortOptions
            .filter(([value]) => value !== "fit" || goal !== "all")
            .map(([value, text]) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={sort === value ? "secondary" : "ghost"}
                className="h-7 px-2"
                onClick={() => setSort(value)}
              >
                {text}
              </Button>
            ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-8"
          onClick={() => {
            setQuery("");
            setCategory("all");
            setConcern("all");
            setAge("all");
            setOrigin("all");
            setGoal("all");
            setTier("all");
            setSort("unit");
          }}
        >
          清除
        </Button>
      </div>
      {results.length === 0 ? (
        <p className="mt-6 border border-dashed border-border p-6 text-sm leading-6">
          沒有符合的產品。放寬年紀或功效後再看。收錄是對照組，不是全市場目錄。
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChipRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly (readonly [T, string])[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="mt-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {options.map(([option, text]) => (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={value === option ? "default" : "outline"}
            className="h-8"
            onClick={() => onChange(option)}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
}
