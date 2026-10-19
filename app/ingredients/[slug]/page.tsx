import { DoseCard } from "@/components/dose-card";
import { RefList } from "@/components/evidence-blocks";
import { ingredientRefs } from "@/lib/references";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EvidenceBadge, Irritancy, PageIntro, PregnancyBadge } from "@/components/marks";
import { Separator } from "@/components/ui/separator";
import { getIngredient, ingredientName, productsContaining } from "@/lib/catalog";
import { ingredients } from "@/lib/ingredients";
import { formatUnitPrice } from "@/lib/format";
import {
  ageLabel,
  concernLabel,
  ingredientCategoryLabel,
} from "@/lib/labels";

export function generateStaticParams() {
  return ingredients.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getIngredient(slug);
  if (!item) return { title: "找不到成分" };
  return {
    title: `${item.nameZh} ${item.nameEn}`,
    description: item.summary,
  };
}

export default function IngredientPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-16">讀取成分…</div>}>
      <IngredientScreen params={params} />
    </Suspense>
  );
}

async function IngredientScreen({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getIngredient(slug);
  if (!item) notFound();
  const usedBy = productsContaining(item.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro kicker={ingredientCategoryLabel[item.category]} title={item.nameZh} lede={item.summary} />
      <p className="mt-4 font-mono text-sm text-muted-foreground">
        {item.nameEn} · {item.inci}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <EvidenceBadge evidence={item.evidence} />
        <PregnancyBadge pregnancy={item.pregnancy} />
        <span className="inline-flex items-center border border-border px-2 text-xs">
          <Irritancy level={item.irritancy} />
        </span>
      </div>
      {item.aliases.length > 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">也叫做 {item.aliases.join("、")}</p>
      ) : null}

      <DoseCard slug={item.slug} className="mt-8" />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-2xl">它在做什麼</h2>
            <p className="mt-3 text-sm leading-7">{item.mechanism}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.evidenceNote}</p>
          </section>
          <div className="grid gap-6 md:grid-cols-2">
            <section>
              <h2 className="font-serif text-2xl">值得留下的理由</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {item.strengths.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-2xl">代價與限制</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6">
                {item.weaknesses.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <aside className="h-fit border border-border bg-card p-5 text-sm leading-6">
          <p className="font-mono text-[11px] tracking-[0.14em] text-cinnabar uppercase">使用</p>
          <p className="mt-3">{item.howToUse}</p>
          <Separator className="my-4" />
          <p className="text-muted-foreground">常見範圍</p>
          <p>{item.typicalRange}</p>
          <Separator className="my-4" />
          <p className="text-muted-foreground">孕期</p>
          <p>{item.pregnancyNote}</p>
          <Separator className="my-4" />
          <p className="text-muted-foreground">年紀</p>
          <p>{item.ageNote}</p>
          <p className="mt-2 text-muted-foreground">
            {item.ages.map((age) => ageLabel[age]).join("、")}
          </p>
          <p className="mt-3 text-muted-foreground">
            {item.concerns.map((concern) => concernLabel[concern]).join("、") || "不是功效軸"}
          </p>
        </aside>
      </div>

      {ingredientRefs[item.slug]?.length ? (
        <section className="mt-10 border border-border bg-card p-5">
          <h2 className="font-serif text-2xl">醫學期刊怎麼說</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            每篇都附 PubMed 連結。橘字標示由廠商或原料商執行、資助的研究，可信度要打折看。
          </p>
          <RefList ids={ingredientRefs[item.slug]} className="mt-4" />
        </section>
      ) : null}

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">常一起出現</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {item.pairsWith.map((pair) => (
              <li key={pair}>
                <Link href={`/ingredients/${pair}`} className="hover:text-cinnabar">
                  {ingredientName(pair)}
                </Link>
              </li>
            ))}
            {item.pairsWith.length === 0 ? <li className="text-muted-foreground">沒有固定搭配。</li> : null}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl">不要在同一晚硬疊</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {item.cautionWith.map((pair) => (
              <li key={pair.slug}>
                <Link href={`/ingredients/${pair.slug}`} className="hover:text-cinnabar">
                  {ingredientName(pair.slug)}
                </Link>
                ：{pair.reason}
              </li>
            ))}
            {item.cautionWith.length === 0 ? (
              <li className="text-muted-foreground">沒有特別需要錯開的常見活性。</li>
            ) : null}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-2xl">收錄產品裡誰含有它</h2>
        {usedBy.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            對照組裡還沒有把這個成分當成主軸的產品。它仍值得認識，因為標籤上會看到。
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {usedBy.map((product) => {
              const active = product.keyActives.find((entry) => entry.ingredient === item.slug);
              return (
                <li key={product.slug} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link href={`/products/${product.slug}`} className="hover:text-cinnabar">
                    {product.brandZh} {product.nameZh}
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    {active?.note} · {formatUnitPrice(product)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
