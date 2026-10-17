"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EvidenceBadge } from "@/components/marks";
import { ingredients } from "@/lib/ingredients";
import {
  evidenceLabel,
  ingredientCategoryLabel,
  ingredientCategoryOrder,
} from "@/lib/labels";
import type { Evidence, IngredientCategory } from "@/lib/types";
import Link from "next/link";

const evidenceOptions: Evidence[] = ["strong", "moderate", "limited", "context"];

export function IngredientBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<IngredientCategory | "all">("all");
  const [evidence, setEvidence] = useState<Evidence | "all">("all");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ingredients.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (evidence !== "all" && item.evidence !== evidence) return false;
      if (!needle) return true;
      return [item.nameZh, item.nameEn, item.inci, ...item.aliases, ...item.functions]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query, category, evidence]);

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="grid gap-1 text-sm">
          <span className="text-muted-foreground">搜尋中文、英文或 INCI</span>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：菸鹼醯胺、retinol、氧化鋅"
            className="h-10 bg-card"
          />
        </label>
        <Button
          type="button"
          variant="outline"
          className="h-10 self-end"
          onClick={() => {
            setQuery("");
            setCategory("all");
            setEvidence("all");
          }}
        >
          清除條件
        </Button>
      </div>
      <ChipRow
        label="類別"
        value={category}
        options={[
          ["all", "全部"],
          ...ingredientCategoryOrder.map(
            (item) => [item, ingredientCategoryLabel[item]] as const,
          ),
        ]}
        onChange={setCategory}
      />
      <ChipRow
        label="證據"
        value={evidence}
        options={[
          ["all", "全部"],
          ...evidenceOptions.map((item) => [item, evidenceLabel[item]] as const),
        ]}
        onChange={setEvidence}
      />
      <p className="mt-4 text-sm text-muted-foreground">{results.length} 個成分</p>
      {results.length === 0 ? (
        <p className="mt-6 border border-dashed border-border p-6 text-sm leading-6">
          沒有符合的成分。試試 INCI 英文，或先清除類別。本站收的是會改變購買決定的成分，不是全宇宙原料字典。
        </p>
      ) : (
        <div className="mt-4 divide-y divide-border border-y border-border">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/ingredients/${item.slug}`}
              className="grid gap-2 py-4 hover:bg-card md:grid-cols-[1.2fr_1fr_auto] md:items-center"
            >
              <span>
                <span className="block font-serif text-2xl">{item.nameZh}</span>
                <span className="text-sm text-muted-foreground">{item.nameEn}</span>
              </span>
              <span className="font-mono text-xs leading-5 text-muted-foreground">
                {item.inci}
              </span>
              <span className="flex flex-wrap gap-2 md:justify-end">
                <EvidenceBadge evidence={item.evidence} />
              </span>
            </Link>
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
