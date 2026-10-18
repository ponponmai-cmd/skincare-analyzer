import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DupeColumns } from "@/components/dupe-columns";
import { DupeTable } from "@/components/dupe-table";
import { ProductImage } from "@/components/product-image";
import { Stars } from "@/components/stars";
import { TierBadges } from "@/components/tier-badges";
import { howToUseFor } from "@/lib/how-to-use";
import { ratingCriteria } from "@/lib/ratings";
import { productSource } from "@/lib/sources";
import { InciExplainTable } from "@/components/inci-explain-table";
import { explainInci, tfdaSource } from "@/lib/inci-explain";
import { PriceCheck } from "@/components/price-check";
import { productOrigin } from "@/lib/shopping";
import { SaveCompareButton } from "@/components/compare-store";
import { PregnancyBadge } from "@/components/marks";
import { buttonVariants } from "@/components/ui/button";
import { getProduct, ingredientName } from "@/lib/catalog";
import { products } from "@/lib/products";
import { formatTwd, formatUnitPrice, formatVolume } from "@/lib/format";
import {
  ageLabel,
  concernLabel,
  originLabel,
  productCategoryLabel,
  skinLabel,
  whiteCastLabel,
} from "@/lib/labels";
import { cn } from "cn";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "找不到產品" };
  return {
    title: `${product.brandZh} ${product.nameZh}`,
    description: product.summary,
  };
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-16">讀取產品…</div>}>
      <ProductScreen params={params} />
    </Suspense>
  );
}

async function ProductScreen({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
        <ProductImage product={product} className="w-40 md:w-full" />
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">
            {originLabel[productOrigin(product)]} · {productCategoryLabel[product.category]} · {product.brand}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            {product.nameZh}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {product.brandZh} · {product.name}
          </p>
          <div className="mt-3" title={ratingCriteria}>
            <Stars slug={product.slug} className="text-base" />
          </div>
          <p className="mt-4 max-w-3xl text-base leading-7">{product.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <TierBadges product={product} />
            <PregnancyBadge pregnancy={product.pregnancy} />
            {product.concerns.map((concern) => (
              <span key={concern} className="border border-border px-2 py-0.5 text-xs">
                {concernLabel[concern]}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 border border-border bg-card p-5 md:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">參考價格</p>
          <p className="font-serif text-3xl">{formatTwd(product.priceTwd)}</p>
          <p className="text-sm text-muted-foreground">{formatVolume(product)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">容量單價</p>
          <p className="font-serif text-3xl">{formatUnitPrice(product)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">質地</p>
          <p className="text-sm leading-6">{product.texture}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.fragrance ? "有香料或明顯氣味" : "無香精"}
            {" · "}
            {product.dryingAlcohol ? "變性酒精明顯" : "酒精不是主軸"}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <SaveCompareButton slug={product.slug} />
        <Link
          href={`/dupes?product=${product.slug}`}
          className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
        >
          只看這瓶的替代
        </Link>
      </div>

      <blockquote className="mt-8 max-w-3xl border-l-2 border-cinnabar pl-4 text-sm leading-7">
        {product.expertNote}
      </blockquote>

      <div id="price" className="mt-8 scroll-mt-24">
        <PriceCheck product={product} />
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="font-serif text-2xl">優點</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {product.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-2xl">限制</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {product.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 border border-border bg-card p-5">
        <h2 className="font-serif text-2xl">怎麼用</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6">
          {howToUseFor(product).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {product.officialUrl ? (
          <p className="mt-3 text-sm">
            <a href={product.officialUrl} target="_blank" rel="noopener noreferrer" className="text-cinnabar underline">
              品牌官網產品頁
            </a>
          </p>
        ) : null}
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl">拿來對照的主成份</h2>
        <ul className="mt-3 divide-y divide-border border-y border-border">
          {product.keyActives.map((active) => (
            <li key={active.ingredient} className="flex items-center justify-between gap-3 py-3 text-sm">
              <Link href={`/ingredients/${active.ingredient}`} className="hover:text-cinnabar">
                {ingredientName(active.ingredient)}
              </Link>
              <span className="text-muted-foreground">{active.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.formulaNote}</p>
      </section>

      <FullInci slug={product.slug} actives={product.keyActives.map((active) => active.ingredient)} />

      {product.spf ? (
        <section className="mt-8 grid gap-3 border border-border p-5 text-sm leading-6 md:grid-cols-4">
          <p>SPF {product.spf}</p>
          <p>{product.pa}</p>
          <p>{product.whiteCast ? whiteCastLabel[product.whiteCast] : ""}</p>
          <p>{product.waterResistant ? "有抗水設計" : "不主打抗水"}</p>
          {product.sunscreenNote ? (
            <p className="md:col-span-4 text-muted-foreground">{product.sunscreenNote}</p>
          ) : null}
        </section>
      ) : null}

      <p className="mt-6 text-sm text-muted-foreground">
        膚質：{product.skinTypes.map((type) => skinLabel[type]).join("、")}。參考年紀：
        {product.ages.map((age) => ageLabel[age]).join("、")}。
      </p>

      <DupeTable product={product} />

      <section className="mt-12">
        <h2 className="font-serif text-3xl">和其他瓶子的關係</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          便宜的排前面，但只有配方或工作說得通才會出現。重疊分數不是評分，是主成份覆蓋了多少。
        </p>
        <div className="mt-6">
          <DupeColumns product={product} />
        </div>
      </section>
    </div>
  );
}

function FullInci({ slug, actives }: { slug: string; actives: string[] }) {
  const inci = productSource(slug)?.inci;
  if (!inci) {
    return (
      <p className="mt-6 text-sm leading-6 text-muted-foreground">
        這瓶的完整成分表還沒取得，請以包裝或官網為準。可以把包裝上的成分表貼到{" "}
        <Link href="/analyze" className="text-cinnabar underline">
          成分表解析
        </Link>
        ，一樣會列出每個成分的功效與注意事項。
      </p>
    );
  }
  const rows = inci.list.map((raw, index) => {
    const explanation = explainInci(raw);
    return {
      ...explanation,
      position: index + 1,
      highlight: Boolean(explanation.ingredientSlug && actives.includes(explanation.ingredientSlug)),
    };
  });
  return (
    <section className="mt-10">
      <h2 className="font-serif text-3xl">完整成分表：每個成分在做什麼</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        依成分表順序排列，越前面通常含量越高。紅字是這瓶的主成分。「台灣規定」來自食藥署公告的成分使用限制，合法販售的產品都必須在上限以內。
      </p>
      <div className="mt-4">
        <InciExplainTable rows={rows} />
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        成分表來源：
        <a href={inci.url} target="_blank" rel="noopener noreferrer" className="underline">
          INCIDecoder · {inci.title}
        </a>
        （海外版與台灣版偶有差異，以包裝為準）。法規來源：
        <a href={tfdaSource.url} target="_blank" rel="noopener noreferrer" className="underline">
          {tfdaSource.name}
        </a>
        。灰色字的功效是依成分類別推估。
        <Link href={`/analyze?inci=${encodeURIComponent(inci.list.join(", "))}`} className="ml-2 text-cinnabar underline">
          用成分表解析再看一次
        </Link>
      </p>
    </section>
  );
}
