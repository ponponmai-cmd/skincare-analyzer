import type { Metadata } from "next";
import Link from "next/link";
import { ClaimList, EfficacyMeter, RefList, VerdictBadge } from "@/components/evidence-blocks";
import { PageIntro } from "@/components/marks";
import {
  brandGroup,
  brandGroupLabel,
  brandGroupNote,
  claimTally,
  productEfficacy,
  verdictClass,
  verdictLabel,
  verdictNote,
  type BrandGroup,
} from "@/lib/evidence";
import { formatUnitPrice } from "@/lib/format";
import { products } from "@/lib/products";
import { allReferences } from "@/lib/references";
import type { ClaimVerdict, Product } from "@/lib/types";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "宣稱查核：大品牌的保養品真的有效嗎",
  description:
    "把專櫃、精品、醫美與開架品牌的主打宣稱，一條一條對照醫學期刊：有證據、部分成立、證據薄弱，還是沒有可信證據。",
};

const groupOrder: BrandGroup[] = ["luxury", "counter", "derm", "drugstore", "indie"];
const verdictOrder: ClaimVerdict[] = ["supported", "partial", "weak", "unsupported"];

const lessons = [
  {
    title: "擦的膠原蛋白、生長因子、外泌體",
    body: "分子太大，很難穿過健康的角質層，進不到真皮去「補」膠原蛋白。它們在表面能保濕，但不能取代 A 醇或維生素 C。",
  },
  {
    title: "「拉提」「V 臉」「立即緊緻」",
    body: "擦的產品無法把下垂的組織拉回去。立即的緊繃感多半來自成膜劑，洗掉就沒了。明顯鬆弛要找醫師做療程。",
  },
  {
    title: "「臨床實證 28 天」",
    body: "大多是品牌委託的自評問卷或小型試驗，沒有對照組、沒有發表在期刊。看到數字，先問：誰做的、跟什麼比、有沒有發表。",
  },
  {
    title: "真正有證據的不貴",
    body: "防曬、視黃醇、菸鹼醯胺、杜鵑花酸、維生素 C、神經醯胺與尿素，都有開架或藥妝價位的版本。",
  },
];

function tallyOf(list: Product[]) {
  const tally: Record<ClaimVerdict, number> = { supported: 0, partial: 0, weak: 0, unsupported: 0 };
  for (const product of list) {
    const each = claimTally(product);
    for (const verdict of verdictOrder) tally[verdict] += each[verdict];
  }
  return tally;
}

function TallyBar({ tally }: { tally: Record<ClaimVerdict, number> }) {
  const total = verdictOrder.reduce((sum, verdict) => sum + tally[verdict], 0);
  if (!total) return null;
  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden border border-border">
        {verdictOrder.map((verdict) =>
          tally[verdict] ? (
            <span
              key={verdict}
              className={cn("h-full border-r last:border-r-0", verdictClass[verdict])}
              style={{ width: `${(tally[verdict] / total) * 100}%` }}
              title={`${verdictLabel[verdict]} ${tally[verdict]} 條`}
            />
          ) : null,
        )}
      </div>
      <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {verdictOrder.map((verdict) => (
          <span key={verdict}>
            {verdictLabel[verdict]} {tally[verdict]}（{Math.round((tally[verdict] / total) * 100)}%）
          </span>
        ))}
      </p>
    </div>
  );
}

function ProductClaims({ product }: { product: Product }) {
  const tally = claimTally(product);
  return (
    <details className="group border-b border-border">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1.5 py-3 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <span className="font-serif text-lg leading-snug group-open:text-cinnabar">{product.nameZh}</span>
          <span className="ml-2 text-xs text-muted-foreground">{formatUnitPrice(product)}</span>
        </span>
        <EfficacyMeter value={productEfficacy(product)} />
        <span className="flex flex-wrap gap-1">
          {verdictOrder.map((verdict) =>
            tally[verdict] ? (
              <span key={verdict} className={cn("border px-1.5 py-0.5 text-xs", verdictClass[verdict])}>
                {verdictLabel[verdict]} {tally[verdict]}
              </span>
            ) : null,
          )}
        </span>
      </summary>
      <div className="pb-4">
        <ClaimList claims={product.claims ?? []} />
        <Link href={`/products/${product.slug}#evidence`} className="mt-2 inline-block text-sm text-cinnabar underline">
          看完整成分與文獻
        </Link>
      </div>
    </details>
  );
}

export default function ClaimsPage() {
  const checked = products.filter((product) => product.claims?.length);
  const overall = tallyOf(checked);
  const totalClaims = verdictOrder.reduce((sum, verdict) => sum + overall[verdict], 0);
  const grouped = groupOrder
    .map((group) => {
      const list = checked.filter((product) => brandGroup(product) === group);
      const brands = [...new Set(list.map((product) => product.brand))]
        .map((brand) => ({
          brand,
          brandZh: list.find((product) => product.brand === brand)?.brandZh ?? brand,
          items: list
            .filter((product) => product.brand === brand)
            .sort((a, b) => productEfficacy(b) - productEfficacy(a)),
        }))
        .sort((a, b) => b.items.length - a.items.length || a.brand.localeCompare(b.brand));
      return { group, list, brands };
    })
    .filter((entry) => entry.list.length);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="宣稱查核"
        title="品牌說有效，醫學期刊怎麼說？"
        lede={`把 ${checked.length} 瓶產品、共 ${totalClaims} 條品牌主打宣稱，一條一條對照皮膚科與醫學期刊的研究。不是說貴的都沒用，而是讓你知道錢花在哪裡。`}
      />

      <section className="mt-8 grid gap-4 border border-border bg-card p-5 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="font-serif text-2xl">四種結論</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6">
            {verdictOrder.map((verdict) => (
              <li key={verdict} className="flex items-start gap-2">
                <VerdictBadge verdict={verdict} />
                <span className="text-muted-foreground">{verdictNote[verdict]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl">全部宣稱的結果</h2>
          <div className="mt-3">
            <TallyBar tally={overall} />
          </div>
          <div className="mt-5 space-y-3">
            {grouped.map(({ group, list }) => (
              <div key={group}>
                <p className="text-sm">
                  <Link href={`#${group}`} className="font-medium hover:text-cinnabar">
                    {brandGroupLabel[group]}
                  </Link>
                  <span className="ml-2 text-xs text-muted-foreground">{list.length} 瓶</span>
                </p>
                <TallyBar tally={tallyOf(list)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lessons.map((lesson) => (
          <article key={lesson.title} className="border border-border p-4">
            <h3 className="font-serif text-lg leading-snug">{lesson.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{lesson.body}</p>
          </article>
        ))}
      </section>

      <div className="mt-12 space-y-14">
        {grouped.map(({ group, brands, list }) => (
          <section key={group} id={group} className="scroll-mt-24 border-t-2 border-foreground pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-serif text-3xl">{brandGroupLabel[group]}</h2>
              <p className="text-sm text-muted-foreground">
                {brands.length} 個品牌 · {list.length} 瓶
              </p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{brandGroupNote[group]}點開產品看每一條宣稱的理由與文獻。</p>
            <div className="mt-5 grid gap-x-8 gap-y-6 lg:grid-cols-2">
              {brands.map(({ brand, brandZh, items }) => (
                <div key={brand}>
                  <h3 className="border-b border-foreground pb-1 text-sm font-medium">
                    {brandZh}
                    {brandZh !== brand ? <span className="ml-2 text-xs text-muted-foreground">{brand}</span> : null}
                  </h3>
                  {items.map((product) => (
                    <ProductClaims key={product.slug} product={product} />
                  ))}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section id="references" className="mt-16 scroll-mt-24 border-t-2 border-foreground pt-6">
        <h2 className="font-serif text-3xl">引用的醫學文獻</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          共 {allReferences.length} 篇，每篇都附 PubMed 連結。依證據等級排序：系統回顧與指引最前，接著是隨機對照試驗。由廠商資助或廠商研究員發表的研究會特別標出來，但不代表結果是假的。
        </p>
        <RefList ids={allReferences.map((reference) => reference.id)} className="mt-6 max-w-4xl" />
      </section>
    </div>
  );
}
