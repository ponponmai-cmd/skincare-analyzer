import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SaveCompareButton } from "@/components/compare-store";
import { EvidenceBadge, PageIntro, PregnancyBadge } from "@/components/marks";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatTwd, formatUnitPrice, formatVolume } from "@/lib/format";
import { activeLabel, lookupVerdict } from "@/lib/lookup";
import type { Ingredient, Product } from "@/lib/types";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "優缺點",
  description: "輸入廠牌和品名，或輸入成分，查看收錄產品的優點與缺點。",
};

const examples = ["修麗可 C E Ferulic", "寶拉 菸鹼醯胺", "安耐曬", "煙醯胺", "神經醯胺", "醉象"];

export default function ProsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-16">對照優缺點…</div>}>
      <ProsScreen searchParams={searchParams} />
    </Suspense>
  );
}

async function ProsScreen({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q ?? "";
  const result = lookupVerdict(query);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="優缺點"
        title="打廠牌和品名，或打一個成分。"
        lede="膚鑑只評論資料庫裡收錄的瓶子。對到產品時，列出那一瓶的優點和缺點。對到成分時，列出以那個成分當主軸的產品。沒有收錄的瓶子，不會臨時編一套評價。"
      />
      <form action="/pros" className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row">
        <Input
          name="q"
          defaultValue={query}
          placeholder="例如：修麗可 C E Ferulic，或菸鹼醯胺"
          aria-label="廠牌、品名或成分"
          className="h-10 bg-card px-3"
        />
        <button type="submit" className={cn(buttonVariants({ className: "h-10 px-4" }))}>
          看優缺點
        </button>
      </form>
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
          先輸入兩個字以上。可以是廠牌加品名，也可以只打成分。
        </p>
      ) : null}

      {result.kind === "vague" ? (
        <p className="mt-10 max-w-2xl text-sm leading-6">
          「{result.query}」太寬，幾乎每一瓶都能套上。請加上廠牌或成分，例如「安耐曬」或「氧化鋅」。防曬也可以直接看{" "}
          <Link href="/sunscreen" className="text-cinnabar">
            依場合比較
          </Link>
          。
        </p>
      ) : null}

      {result.kind === "none" ? (
        <p className="mt-10 max-w-2xl text-sm leading-6">
          資料庫裡還沒有「{result.query}」。可以改打廠牌、品名，或一個成分名。沒有收錄的產品，膚鑑不會替它編優缺點。
        </p>
      ) : null}

      {result.products.length > 0 ? (
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

      {result.ingredients.length > 0 && result.products.length === 0 ? (
        <p className="mt-10 max-w-2xl text-sm leading-6">
          {result.brandMatched
            ? "這個廠牌的收錄產品裡，這個成分不是主軸。下面先給成分本身的優缺點。"
            : "資料庫裡沒有以這個成分當主軸的產品。下面是成分本身的優缺點。"}
        </p>
      ) : null}

      {result.ingredients.map((ingredient) => (
        <IngredientVerdict key={ingredient.slug} ingredient={ingredient} />
      ))}
    </div>
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
      <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">
        {product.brand}
      </p>
      <h3 className="mt-2 font-serif text-3xl">{product.nameZh}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {product.brandZh} · {product.name}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-6">{product.summary}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        {formatTwd(product.priceTwd)}／{formatVolume(product)} · {formatUnitPrice(product)}
        {product.spf ? ` · SPF ${product.spf}${product.pa ? ` ${product.pa}` : ""}` : ""}
      </p>
      <div className="mt-3">
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
      </div>
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
