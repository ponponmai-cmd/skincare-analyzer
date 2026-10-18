import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marks";
import { getProduct } from "@/lib/catalog";
import { maskBasics, maskSituations } from "@/lib/masks";

export const metadata: Metadata = {
  title: "面膜與急救",
  description: "曬傷、熬夜、乾到脫皮、爆痘、敏感泛紅：每種狀況該敷什麼面膜、找什麼成分、要避開什麼，什麼時候該看醫師。",
};

export default function MasksPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="面膜與急救"
        title="先看皮膚現在怎麼了，再決定敷什麼。"
        lede="面膜是短時間的補救，不是治療。每種狀況列出要找的成分、該避開的東西、怎麼敷，以及什麼情況要直接看醫師。"
      />

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="狀況">
        {maskSituations.map((item) => (
          <Link
            key={item.id}
            href={`#${item.id}`}
            className="border border-border px-3 py-1.5 text-sm hover:border-cinnabar hover:text-cinnabar"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      <section className="mt-8 border border-border bg-card p-5">
        <h2 className="font-serif text-2xl">敷面膜的基本規則</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6">
          {maskBasics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {maskSituations.map((item) => (
          <article key={item.id} id={item.id} className="scroll-mt-24 border border-border p-5">
            <h2 className="font-serif text-2xl">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{item.signs}</p>
            <p className="mt-4 text-sm leading-6">
              <span className="font-medium text-cinnabar">敷什麼：</span>
              {item.mask}
            </p>
            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">找這些成分</p>
                <p className="mt-1 flex flex-wrap gap-1.5">
                  {item.lookFor.map((word) => (
                    <span key={word} className="border border-sage/60 bg-sage/10 px-2 py-0.5 text-xs">
                      {word}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">先避開</p>
                <ul className="mt-1 space-y-0.5 text-xs leading-5">
                  {item.avoid.map((word) => (
                    <li key={word}>✕ {word}</li>
                  ))}
                </ul>
              </div>
            </div>
            <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm leading-6">
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-sm">
              <span className="text-muted-foreground">頻率：</span>
              {item.frequency}
            </p>
            {item.alternative ? (
              <p className="mt-2 text-sm leading-6">
                <span className="text-muted-foreground">{item.alternative.text}</span>
                {item.alternative.productSlugs.map((slug, index) => {
                  const product = getProduct(slug);
                  if (!product) return null;
                  return (
                    <span key={slug}>
                      {index > 0 ? "、" : " "}
                      <Link href={`/products/${slug}`} className="text-cinnabar">
                        {product.brandZh} {product.nameZh}
                      </Link>
                    </span>
                  );
                })}
              </p>
            ) : null}
            <p className="mt-4 border-l-2 border-cinnabar pl-3 text-sm leading-6">
              <span className="font-medium">要看醫師：</span>
              {item.doctor}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
