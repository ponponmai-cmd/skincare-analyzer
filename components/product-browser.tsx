"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
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

export function ProductBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const [concern, setConcern] = useState<Concern | "all">("all");
  const [age, setAge] = useState<AgeBand | "all">("all");
  const [origin, setOrigin] = useState<Origin | "all">("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products
      .filter((product) => {
        if (origin !== "all" && productOrigin(product) !== origin) return false;
        if (category !== "all" && product.category !== category) return false;
        if (concern !== "all" && !product.concerns.includes(concern)) return false;
        if (age !== "all" && !product.ages.includes(age)) return false;
        if (!needle) return true;
        return productHaystack(product).includes(needle);
      })
      .sort((a, b) => a.priceTwd / a.volume - b.priceTwd / b.volume);
  }, [query, category, concern, age, origin]);

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
        label="想處理的事"
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
        <p className="text-sm text-muted-foreground">
          {results.length} 項，依每毫升或每克價格由低到高
        </p>
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
