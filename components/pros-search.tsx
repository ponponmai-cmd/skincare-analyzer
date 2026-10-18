"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SaveCompareButton } from "@/components/compare-store";
import { EvidenceBadge, PregnancyBadge } from "@/components/marks";
import { DoseCard } from "@/components/dose-card";
import { ProductImage } from "@/components/product-image";
import { ShopLinks } from "@/components/shop-links";
import { Stars } from "@/components/stars";
import { TierBadges } from "@/components/tier-badges";
import { doseGuide } from "@/lib/doses";
import { howToUseFor } from "@/lib/how-to-use";
import { isBestSeller } from "@/lib/media";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productsContaining } from "@/lib/catalog";
import { formatTwd, formatUnitPrice, formatVolume } from "@/lib/format";
import { originLabel, originOrder, productCategoryLabel } from "@/lib/labels";
import { activeLabel, lookupVerdict, type LookupResult } from "@/lib/lookup";
import { productOrigin } from "@/lib/shopping";
import type { Ingredient, Origin, Product } from "@/lib/types";
import { cn } from "cn";

const examples = ["美白", "抗皺", "緊實拉提", "痘痘", "保濕", "身體光滑", "身體緊緻", "A醛", "菸鹼醯胺", "小黑瓶", "安耐曬"];

export function ProsSearchForm({
  defaultValue = "",
  placeholder,
  className,
}: {
  defaultValue?: string;
  placeholder: string;
  className?: string;
}) {
  const router = useRouter();
  return (
    <form
      key={defaultValue}
      className={cn("flex flex-col gap-2 sm:flex-row", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const value = String(new FormData(event.currentTarget).get("q") ?? "").trim();
        router.push(value ? `/pros?q=${encodeURIComponent(value)}` : "/pros");
      }}
    >
      <Input
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-label="想要的效果、成分或產品"
        className="h-10 bg-card px-3"
      />
      <button type="submit" className={cn(buttonVariants({ className: "h-10 px-4" }))}>
        查詢
      </button>
    </form>
  );
}

export function ProsResults() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  const result = lookupVerdict(query);

  return (
    <>
      <ProsSearchForm
        defaultValue={query}
        placeholder="例如：美白、痘痘、菸鹼醯胺、青春露、安耐曬"
        className="mt-8 max-w-2xl"
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {examples.map((example) => (
          <Link
            key={example}
            href={`/pros?q=${encodeURIComponent(example)}`}
            className="border border-border px-2 py-1 text-xs text-muted-foreground hover:border-cinnabar hover:text-foreground"
          >
            {example}
          </Link>
        ))}
      </div>

      {result.kind === "empty" ? (
        <p className="mt-10 max-w-2xl text-sm leading-6 text-muted-foreground">
          先輸入兩個字以上。可以打想要的效果（美白、痘痘、保濕），一個成分，或廠牌加品名。
        </p>
      ) : null}

      {result.kind === "vague" ? (
        <p className="mt-10 max-w-2xl text-sm leading-6">
          「{result.query}」太寬，幾乎每一瓶都能套上。請加上你想要的效果或成分，例如「保濕精華」或「菸鹼醯胺」。
        </p>
      ) : null}

      {result.kind === "none" ? (
        <p className="mt-10 max-w-2xl text-sm leading-6">
          資料庫裡還沒有「{result.query}」。可以改打效果、廠牌、品名或成分名。手上有成分表，也可以貼到{" "}
          <Link href="/analyze" className="text-cinnabar">
            成分表解析
          </Link>
          。沒有收錄的產品，膚鑑不會替它編優缺點。
        </p>
      ) : null}

      {result.kind === "goal" ? <GoalResults result={result} /> : null}

      {result.kind === "ingredient"
        ? result.ingredients.map((ingredient) => (
            <IngredientVerdict key={ingredient.slug} ingredient={ingredient} />
          ))
        : null}

      {result.kind !== "goal" && result.products.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-serif text-3xl">
            {result.kind === "product"
              ? result.products.length > 1
                ? "這幾瓶都對得上"
                : "對到這一瓶"
              : result.kind === "brand"
                ? "這個廠牌目前收錄的產品"
                : "以這個成分當主軸的產品"}
          </h2>
          {result.kind === "ingredient" ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              只列出把它放在配方主軸的瓶子。配角裡帶一點同一個成分的，不放進來冒充。
            </p>
          ) : null}
          <div className="mt-6 space-y-8">
            {result.products.map((product) => (
              <ProductVerdict
                key={product.slug}
                product={product}
                activeNotes={(result.activesByProduct[product.slug] ?? []).map(activeLabel)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {result.kind === "ingredient" && result.products.length === 0 ? (
        <p className="mt-10 max-w-2xl text-sm leading-6">
          {result.brandMatched
            ? "這個廠牌的收錄產品裡，這個成分不是主軸。"
            : "資料庫裡還沒有以這個成分當主軸的產品。"}
        </p>
      ) : null}
    </>
  );
}

function GoalResults({ result }: { result: LookupResult }) {
  const [origin, setOrigin] = useState<Origin | "all">("all");
  const [tier, setTier] = useState<"all" | "bestseller" | "luxury">("all");
  const goal = result.goal;
  if (!goal) return null;
  const shown = result.products.filter(
    (product) =>
      (origin === "all" || productOrigin(product) === origin) &&
      (tier === "all" ||
        (tier === "bestseller" ? isBestSeller(product.slug) : product.tier === "luxury")),
  );
  const counts = Object.fromEntries(
    originOrder.map((item) => [
      item,
      result.products.filter((product) => productOrigin(product) === item).length,
    ]),
  ) as Record<Origin, number>;

  return (
    <div className="mt-10">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">你想要的效果</p>
      <h2 className="mt-2 font-serif text-3xl md:text-4xl">{goal.title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7">{goal.advice}</p>
      <p className="mt-3 max-w-3xl border-l-2 border-cinnabar pl-4 text-sm leading-6 text-muted-foreground">
        {goal.seeDoctor}
      </p>

      <section className="mt-10">
        <h3 className="font-serif text-2xl">先看這些成分</h3>
        <p className="mt-1 text-sm text-muted-foreground">由證據比較好、比較常用的排前面。點進去看濃度、用法與孕期。</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {result.ingredients.slice(0, 8).map((ingredient) => (
            <Link
              key={ingredient.slug}
              href={`/ingredients/${ingredient.slug}`}
              className="border border-border bg-card p-4 hover:border-cinnabar"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif text-xl">{ingredient.nameZh}</span>
                <EvidenceBadge evidence={ingredient.evidence} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{ingredient.inci}</p>
              <p className="mt-2 text-sm leading-6">{ingredient.functions.join("、")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {doseGuide[ingredient.slug]
                  ? `要看到效果：至少 ${doseGuide[ingredient.slug].minimum}，最好 ${doseGuide[ingredient.slug].sweetSpot}`
                  : `常見濃度：${ingredient.typicalRange}`}
                {" · "}收錄產品 {productsContaining(ingredient.slug).length} 瓶
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-serif text-2xl">做得到這件事的產品（{result.products.length}）</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          越對題的排越前面，同樣對題的再依每毫升價格由低到高。不同公司、成分接近的，會在產品頁的平價替代裡對照。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip active={origin === "all"} onClick={() => setOrigin("all")}>
            全部 {result.products.length}
          </FilterChip>
          {originOrder
            .filter((item) => counts[item] > 0)
            .map((item) => (
              <FilterChip key={item} active={origin === item} onClick={() => setOrigin(item)}>
                {originLabel[item]} {counts[item]}
              </FilterChip>
            ))}
          <span className="mx-1 self-center text-border">|</span>
          <FilterChip active={tier === "bestseller"} onClick={() => setTier(tier === "bestseller" ? "all" : "bestseller")}>
            知名熱銷
          </FilterChip>
          <FilterChip active={tier === "luxury"} onClick={() => setTier(tier === "luxury" ? "all" : "luxury")}>
            奢華款
          </FilterChip>
        </div>
        {shown.length === 0 ? (
          <p className="mt-4 border border-dashed border-border p-4 text-sm">這個篩選下沒有產品，換一個條件看看。</p>
        ) : null}
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {shown.map((product) => (
            <li key={product.slug} className="grid gap-3 py-4 md:grid-cols-[auto_1fr_auto] md:items-center">
              <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden className="hidden md:block">
                <ProductImage product={product} className="w-16" />
              </Link>
              <div>
                <p className="text-xs text-muted-foreground">
                  {originLabel[productOrigin(product)]} · {productCategoryLabel[product.category]} · {product.brandZh}
                </p>
                <Link href={`/products/${product.slug}`} className="font-serif text-xl hover:text-cinnabar">
                  {product.nameZh}
                </Link>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Stars slug={product.slug} showLabel={false} />
                  <TierBadges product={product} />
                </div>
                <p className="mt-1 text-sm leading-6">
                  <span className="text-sage">＋</span> {product.strengths[0]}
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  <span className="text-cinnabar">－</span> {product.weaknesses[0]}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <p className="text-sm">
                  <span className="font-serif text-lg">{formatUnitPrice(product)}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {formatTwd(product.priceTwd)}／{formatVolume(product)}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/pros?q=${encodeURIComponent(`${product.brandZh} ${product.nameZh}`)}`}
                    className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
                  >
                    優缺點
                  </Link>
                  <Link
                    href={`/products/${product.slug}#price`}
                    className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
                  >
                    比價
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-1.5 text-sm",
        active ? "border-cinnabar bg-cinnabar text-white" : "border-border hover:border-cinnabar",
      )}
    >
      {children}
    </button>
  );
}

function ProductVerdict({
  product,
  activeNotes,
}: {
  product: Product;
  activeNotes: string[];
}) {
  return (
    <article className="border border-border bg-card p-5">
      <div className="flex gap-4">
        <ProductImage product={product} className="w-24 shrink-0 md:w-32" />
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">
            {originLabel[productOrigin(product)]} · {product.brand}
          </p>
          <h3 className="mt-2 font-serif text-3xl">{product.nameZh}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.brandZh} · {product.name}
          </p>
          <Stars slug={product.slug} className="mt-2" />
        </div>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6">{product.summary}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        {formatTwd(product.priceTwd)}／{formatVolume(product)} · {formatUnitPrice(product)}
        {product.spf ? ` · SPF ${product.spf}${product.pa ? ` ${product.pa}` : ""}` : ""}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <TierBadges product={product} />
        <PregnancyBadge pregnancy={product.pregnancy} />
      </div>
      {activeNotes.length > 0 ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">對到的成分：{activeNotes.join("、")}</p>
      ) : null}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section>
          <h4 className="font-serif text-2xl">優點</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {product.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="font-serif text-2xl">缺點</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {product.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <p className="mt-6 max-w-3xl border-l-2 border-cinnabar pl-4 text-sm leading-7">{product.expertNote}</p>
      <section className="mt-6">
        <h4 className="font-serif text-2xl">怎麼用</h4>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-6">
          {howToUseFor(product).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <div className="mt-5 flex flex-wrap gap-2">
        <SaveCompareButton slug={product.slug} />
        <Link
          href={`/products/${product.slug}`}
          className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
        >
          完整產品頁
        </Link>
        <Link
          href={`/dupes?product=${product.slug}`}
          className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
        >
          看較便宜的替代
        </Link>
        <Link
          href={`/products/${product.slug}#price`}
          className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
        >
          冤大頭檢查
        </Link>
      </div>
      <ShopLinks product={product} className="mt-2" />
    </article>
  );
}

function IngredientVerdict({ ingredient }: { ingredient: Ingredient }) {
  return (
    <article className="mt-8 border border-border p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-serif text-2xl">{ingredient.nameZh}</h3>
        <EvidenceBadge evidence={ingredient.evidence} />
        <PregnancyBadge pregnancy={ingredient.pregnancy} />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {ingredient.nameEn} · {ingredient.inci}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6">{ingredient.summary}</p>
      <h4 className="mt-6 font-serif text-2xl">功效</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {ingredient.functions.map((item) => (
          <span key={item} className="border border-cinnabar/40 px-2 py-0.5 text-sm">
            {item}
          </span>
        ))}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-6">{ingredient.mechanism}</p>
      <DoseCard slug={ingredient.slug} className="mt-4 max-w-3xl" compact />
      <dl className="mt-4 grid max-w-3xl gap-3 text-sm leading-6 md:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">常見濃度</dt>
          <dd>{ingredient.typicalRange}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">怎麼用</dt>
          <dd>{ingredient.howToUse}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="text-muted-foreground">證據</dt>
          <dd>{ingredient.evidenceNote}</dd>
        </div>
      </dl>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section>
          <h4 className="font-serif text-2xl">優點</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {ingredient.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="font-serif text-2xl">缺點</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {ingredient.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <Link href={`/ingredients/${ingredient.slug}`} className="mt-5 inline-block text-sm text-cinnabar">
        看這個成分的完整說明
      </Link>
    </article>
  );
}
