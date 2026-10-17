import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/marks";
import { ageGuides } from "@/lib/guides";
import { getProduct } from "@/lib/catalog";
import { ageLabel } from "@/lib/labels";

export const metadata: Metadata = {
  title: "年紀",
  description: "依皮膚生理而不是抗老年齡標語，安排清潔、保濕、活性與防曬。",
};

export default function AgesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="年紀"
        title="年齡改變的是優先順序，不是你該買的系列名稱。"
        lede="青春期先處理油與粉刺。二十多歲把防曬做成習慣。三十歲以後視黃醇與色素才值得占預算。四十歲以後脂質變少，五十歲以後先讓屏障舒服。每個年紀都要防曬。"
      />
      <nav className="mt-8 flex gap-2 overflow-x-auto">
        {ageGuides.map((guide) => (
          <Link
            key={guide.id}
            href={`#${guide.id}`}
            className="border border-border px-3 py-2 text-sm whitespace-nowrap hover:border-cinnabar"
          >
            {ageLabel[guide.id]}
          </Link>
        ))}
      </nav>
      <div className="mt-10 space-y-16">
        {ageGuides.map((guide) => (
          <article key={guide.id} id={guide.id} className="scroll-mt-24">
            <p className="font-mono text-[11px] tracking-[0.14em] text-cinnabar uppercase">
              {guide.years}
            </p>
            <h2 className="mt-2 font-serif text-4xl">{guide.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7">{guide.physiology}</p>
            <p className="mt-3 max-w-3xl text-sm leading-7">{guide.priority}</p>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Routine title="早上" steps={guide.morning} />
              <Routine title="晚上" steps={guide.evening} />
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Bullet title="可以開始" items={guide.start} />
              <Bullet title="先不要" items={guide.delay} />
              <Bullet title="常見走錯" items={guide.mistakes} />
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {guide.picks.map((pick) => {
                const product = getProduct(pick.slug);
                if (!product) return null;
                return (
                  <Link
                    key={pick.slug}
                    href={`/products/${pick.slug}`}
                    className="border border-border p-4 hover:border-cinnabar"
                  >
                    <p className="text-xs text-muted-foreground">{product.brandZh}</p>
                    <h3 className="font-serif text-xl">{product.nameZh}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{pick.why}</p>
                  </Link>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Routine({
  title,
  steps,
}: {
  title: string;
  steps: { step: string; why: string; productSlugs: string[] }[];
}) {
  return (
    <section className="border border-border p-5">
      <h3 className="font-serif text-2xl">{title}</h3>
      <ol className="mt-4 space-y-4">
        {steps.map((step, index) => (
          <li key={step.step}>
            <p className="text-sm font-medium">
              {index + 1}. {step.step}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.why}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {step.productSlugs.map((slug) => {
                const product = getProduct(slug);
                if (!product) return null;
                return (
                  <Link key={slug} href={`/products/${slug}`} className="text-sm text-cinnabar">
                    {product.nameZh}
                  </Link>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Bullet({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="font-serif text-xl">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
