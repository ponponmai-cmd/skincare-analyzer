"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EvidenceBadge } from "@/components/marks";
import { Button } from "@/components/ui/button";
import { analyze, displayName, type AnalyzedRow } from "@/lib/analyzer";
import { ingredientName } from "@/lib/catalog";
import { formatUnitPrice } from "@/lib/format";
import { inciFlagLabel, inciFlagNote, type InciFlag } from "@/lib/inci-dictionary";
import { concernLabel, ingredientCategoryLabel, irritancyLabel, originLabel } from "@/lib/labels";
import { productOrigin } from "@/lib/shopping";
import type { Ingredient, IngredientCategory } from "@/lib/types";
import { cn } from "cn";

const samples = [
  {
    label: "範例：維生素 C 精華",
    text: "Water, Ethoxydiglycol, Ascorbic Acid, Glycerin, Propylene Glycol, Laureth-23, Tocopherol, Ferulic Acid, Phenoxyethanol, Triethanolamine, Sodium Hyaluronate",
  },
  {
    label: "範例：有香料的抗老乳霜",
    text: "Water, Glycerin, Cetearyl Alcohol, Caprylic/Capric Triglyceride, Niacinamide, Dimethicone, Butyrospermum Parkii (Shea) Butter, Ceramide NP, Phenoxyethanol, Fragrance (Parfum), Linalool, Limonene, Sodium Hyaluronate, Retinol, Glycolic Acid",
  },
  {
    label: "範例：中文成分表",
    text: "水、丁二醇、菸鹼醯胺、傳明酸、甘油、1,2-己二醇、玻尿酸鈉、尿囊素、苯氧乙醇、乙基己基甘油",
  },
];

const warnFlags: InciFlag[] = ["fragrance", "allergen", "essential-oil", "drying-alcohol", "cooling", "harsh-surfactant", "comedogenic"];

export function InciAnalyzer() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState("");
  const analysis = useMemo(() => (submitted.trim() ? analyze(submitted) : null), [submitted]);

  return (
    <div className="mt-8">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(text);
        }}
      >
        <label htmlFor="inci" className="text-sm text-muted-foreground">
          全成分（用逗號、頓號或換行分開都可以）
        </label>
        <textarea
          id="inci"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={6}
          placeholder="例如：Water, Glycerin, Niacinamide, Butylene Glycol, Phenoxyethanol…"
          className="mt-2 w-full resize-y border border-input bg-card p-3 text-sm leading-6 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button type="submit" className="h-10 px-5" disabled={!text.trim()}>
            解析成分表
          </Button>
          {samples.map((sample) => (
            <Button
              key={sample.label}
              type="button"
              variant="outline"
              className="h-10"
              onClick={() => {
                setText(sample.text);
                setSubmitted(sample.text);
              }}
            >
              {sample.label}
            </Button>
          ))}
        </div>
      </form>

      {!analysis ? (
        <p className="mt-8 max-w-2xl text-sm leading-6 text-muted-foreground">
          小提醒：台灣法規要求成分依含量由多到少排列，含量 1% 以下的可以任意排序。所以「排在哪裡」本身就是資訊，這是只看安全分數的網站不會告訴你的。
        </p>
      ) : analysis.rows.length === 0 ? (
        <p className="mt-8 text-sm">沒有讀到成分。請確認有用逗號或頓號分開。</p>
      ) : (
        <AnalysisView analysis={analysis} />
      )}
    </div>
  );
}

function AnalysisView({ analysis }: { analysis: ReturnType<typeof analyze> }) {
  const warnings = warnFlags.filter((flag) => analysis.flagCounts[flag]?.length);
  const active = new Set(analysis.actives.map((row) => row.position));

  return (
    <div className="mt-10 grid gap-10">
      <section>
        <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">總結</p>
        <h2 className="mt-2 font-serif text-3xl">
          {analysis.rows.length} 項成分，認得 {analysis.recognized} 項
        </h2>
        {analysis.concerns.length > 0 ? (
          <p className="mt-3 text-sm leading-6">
            這瓶主要在處理：
            {analysis.concerns.slice(0, 4).map((item, index) => (
              <span key={item.concern}>
                {index > 0 ? "、" : ""}
                <Link href={`/pros?q=${encodeURIComponent(concernLabel[item.concern])}`} className="text-cinnabar">
                  {concernLabel[item.concern]}
                </Link>
              </span>
            ))}
          </p>
        ) : (
          <p className="mt-3 text-sm leading-6">沒有找到膚鑑收錄的功效成分。可能是基礎保濕配方，或成分名稱寫法不同。</p>
        )}
        {analysis.onePercentLine !== null ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            第 {analysis.onePercentLine + 1} 項是防腐劑（法規上限多在 1% 以下），排在它後面的成分，濃度通常也在 1% 以下。
          </p>
        ) : null}
      </section>

      {analysis.actives.length > 0 ? (
        <section>
          <h3 className="font-serif text-2xl">有功效的成分</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {analysis.actives.map((row) => {
              if (row.match.kind !== "core") return null;
              const ingredient = row.match.ingredient;
              return (
                <div key={row.position} className="border border-border bg-card p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/ingredients/${ingredient.slug}`} className="font-serif text-xl hover:text-cinnabar">
                      {ingredient.nameZh}
                    </Link>
                    <EvidenceBadge evidence={ingredient.evidence} />
                    <span className="text-xs text-muted-foreground">第 {row.position} 項</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ingredientCategoryLabel[ingredient.category]} · 刺激度 {irritancyLabel[ingredient.irritancy]}
                  </p>
                  <p className="mt-2 text-sm leading-6">{ingredient.functions.join("、")}</p>
                  {row.belowOnePercent && doseCritical(ingredient) ? (
                    <p className="mt-2 text-sm leading-6 text-cinnabar">
                      排在 1% 線之後。若它是包裝上的主打，濃度可能遠低於研究常用的 {ingredient.typicalRange}
                    </p>
                  ) : row.belowOnePercent && minimumPercent(ingredient.typicalRange) <= 1 ? (
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      排在 1% 線之後，但這個成分本來就在低濃度發揮作用（{ingredient.typicalRange}）。
                    </p>
                  ) : (
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">研究常用濃度：{ingredient.typicalRange}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {warnings.length > 0 ||
      analysis.conflicts.length > 0 ||
      analysis.pregnancy.avoid.length > 0 ||
      analysis.pregnancy.caution.length > 0 ||
      analysis.strongIrritants.length > 0 ? (
        <section>
          <h3 className="font-serif text-2xl">要留意的地方</h3>
          <ul className="mt-4 grid gap-3">
            {analysis.conflicts.map((conflict) => (
              <Warning key={`${conflict.first.slug}-${conflict.second.slug}`} title={`${conflict.first.nameZh} + ${conflict.second.nameZh} 在同一瓶`}>
                {conflict.reason}
              </Warning>
            ))}
            {analysis.pregnancy.avoid.length > 0 ? (
              <Warning title="孕期與哺乳期避免" strong>
                含 {analysis.pregnancy.avoid.map((item) => item.nameZh).join("、")}。
              </Warning>
            ) : null}
            {analysis.pregnancy.caution.length > 0 ? (
              <Warning title="孕期先問醫師">
                含 {analysis.pregnancy.caution.map((item) => item.nameZh).join("、")}。
              </Warning>
            ) : null}
            {analysis.strongIrritants.length > 0 ? (
              <Warning title="刺激度偏高">
                {analysis.strongIrritants.map((item) => item.nameZh).join("、")}。第一次用從隔天晚上開始。
              </Warning>
            ) : null}
            {warnings.map((flag) => (
              <Warning key={flag} title={`${inciFlagLabel[flag]}：${analysis.flagCounts[flag]?.join("、")}`}>
                {inciFlagNote[flag]}
              </Warning>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h3 className="font-serif text-2xl">要留意的地方</h3>
          <p className="mt-2 text-sm">沒有看到香料、精油、揮發性酒精或明顯衝突的組合。</p>
        </section>
      )}

      {analysis.similar.length > 0 ? (
        <section>
          <h3 className="font-serif text-2xl">收錄產品裡，成分最接近的</h3>
          <p className="mt-1 text-sm text-muted-foreground">比對的是主要功效成分，不是整串成分表。越接近越前面，再依每毫升價格排序。</p>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {analysis.similar.map((item) => (
              <li key={item.product.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {originLabel[productOrigin(item.product)]} · {item.product.brandZh} · 重疊 {Math.round(item.coverage * 100)}%
                  </p>
                  <Link href={`/products/${item.product.slug}`} className="font-serif text-lg hover:text-cinnabar">
                    {item.product.nameZh}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    共同成分：{item.shared.map((slug) => ingredientName(slug)).join("、")}
                  </p>
                </div>
                <span className="font-serif text-lg">{formatUnitPrice(item.product)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h3 className="font-serif text-2xl">逐項翻譯</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th className="py-2 pr-3 font-normal">#</th>
                <th className="py-2 pr-3 font-normal">成分表寫法</th>
                <th className="py-2 pr-3 font-normal">中文</th>
                <th className="py-2 pr-3 font-normal">用途</th>
                <th className="py-2 font-normal">提醒</th>
              </tr>
            </thead>
            <tbody>
              {analysis.rows.map((row) => (
                <Row key={row.position} row={row} isActive={active.has(row.position)} line={analysis.onePercentLine} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Row({ row, isActive, line }: { row: AnalyzedRow; isActive: boolean; line: number | null }) {
  const role =
    row.match.kind === "core"
      ? row.match.ingredient.functions.join("、")
      : row.match.kind === "dict"
        ? row.match.entry.role
        : "膚鑑還沒收錄";
  const note = row.match.kind === "dict" ? row.match.entry.note : undefined;
  return (
    <tr
      className={cn(
        "border-b border-border align-top",
        line !== null && row.position === line + 2 && "border-t-2 border-t-cinnabar",
      )}
    >
      <td className="py-2 pr-3 text-muted-foreground">{row.position}</td>
      <td className="py-2 pr-3">{row.raw}</td>
      <td className={cn("py-2 pr-3", isActive && "font-medium text-cinnabar")}>
        {row.match.kind === "core" ? (
          <Link href={`/ingredients/${row.match.ingredient.slug}`} className="underline-offset-2 hover:underline">
            {displayName(row)}
          </Link>
        ) : row.match.kind === "dict" ? (
          displayName(row)
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>
      <td className="py-2 pr-3">
        {role}
        {note ? <span className="block text-xs text-muted-foreground">{note}</span> : null}
      </td>
      <td className="py-2">
        <div className="flex flex-wrap gap-1">
          {row.flags.map((flag) => (
            <span
              key={flag}
              className={cn(
                "border px-1.5 text-xs",
                flag === "preservative" ? "border-border text-muted-foreground" : "border-cinnabar/60 text-cinnabar",
              )}
            >
              {inciFlagLabel[flag]}
            </span>
          ))}
          {row.belowOnePercent ? <span className="text-xs text-muted-foreground">約 ≤1%</span> : null}
        </div>
      </td>
    </tr>
  );
}

const doseCriticalCategories = new Set<IngredientCategory>([
  "brightening",
  "exfoliant",
  "antioxidant",
  "retinoid",
  "antimicrobial",
]);

function doseCritical(ingredient: Ingredient) {
  const minimum = minimumPercent(ingredient.typicalRange);
  return doseCriticalCategories.has(ingredient.category) && Number.isFinite(minimum) && minimum > 1;
}

function minimumPercent(range: string) {
  const match = range.match(/(\d+(?:\.\d+)?)\s*%?\s*[–-]|(\d+(?:\.\d+)?)\s*%/);
  const value = match ? Number(match[1] ?? match[2]) : Number.NaN;
  return Number.isNaN(value) ? Number.POSITIVE_INFINITY : value;
}

function Warning({ title, children, strong }: { title: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <li className={cn("border-l-4 bg-card p-4", strong ? "border-destructive" : "border-cinnabar/60")}>
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{children}</p>
    </li>
  );
}
