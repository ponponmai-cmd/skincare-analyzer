import type { Metadata } from "next";
import Link from "next/link";
import { EfficacyMeter, RefList, VerdictBadge } from "@/components/evidence-blocks";
import { PageIntro } from "@/components/marks";
import { ProductImage } from "@/components/product-image";
import { Stars } from "@/components/stars";
import { ingredientName } from "@/lib/catalog";
import { efficacyCriteria, efficacyLabel, headlineVerdict, pickScore } from "@/lib/evidence";
import { formatUnitPrice } from "@/lib/format";
import { goals, type Goal } from "@/lib/goals";
import { originLabel } from "@/lib/labels";
import { goalProducts } from "@/lib/lookup";
import { momoSales, momoSalesText } from "@/lib/media";
import { productRating } from "@/lib/ratings";
import { asianSkinRefs } from "@/lib/references";
import { productOrigin } from "@/lib/shopping";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "醫師選品：適合台灣人肌膚的產品",
  description:
    "依保養目的排出適合台灣濕熱氣候與亞洲膚質的產品：先看實際效果與醫學證據，再看值不值得與銷量。每瓶都有完整成分表可以查。",
};

const visible = 10;

const asianSkinPoints = [
  "亞洲人的角質層屏障不比白人差，但對刺激的反應（刺痛、泛紅）常常比較快，新的酸類或 A 醇要從低濃度、隔天用開始。",
  "膚色較深的亞洲肌膚，發炎後很容易留下黑印（發炎後色素沉著），所以治痘、刷酸都要溫和，而且一定要防曬。",
  "台灣人的皺紋通常比白人晚出現，但斑點、肝斑出現得早，抗老的重點常常是「斑」而不是「紋」。",
  "肝斑在東亞女性很常見，可見光也會讓它變深；含氧化鐵的有色防曬比一般防曬更能保護。",
  "台灣夏天濕熱、冬天冷氣房乾燥：夏天選清爽乳液與凝露，冬天或冷氣房再換成乳霜。",
];

function pickList(goal: Goal) {
  const scope = goal.scope ?? "face";
  return goalProducts(goal)
    .filter((product) => goal.concern === "sun" || scope === "body" || product.category !== "sunscreen")
    .sort(
      (a, b) =>
        pickScore(b, goal.concern) - pickScore(a, goal.concern) ||
        productRating(b.slug) - productRating(a.slug) ||
        momoSales(b.slug) - momoSales(a.slug) ||
        a.priceTwd / a.volume - b.priceTwd / b.volume,
    );
}

function mainActives(product: Product) {
  return [...product.keyActives]
    .sort((a, b) => b.centrality - a.centrality)
    .slice(0, 3)
    .map((active) => ingredientName(active.ingredient))
    .join("、");
}

function PickRow({ product, rank }: { product: Product; rank: number }) {
  const verdict = headlineVerdict(product);
  const sales = momoSalesText(product.slug);
  return (
    <li className="grid grid-cols-[2rem_3.5rem_1fr] gap-x-3 gap-y-2 border-b border-border py-4 md:grid-cols-[2rem_3.5rem_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1.3fr)]">
      <span className="font-serif text-2xl leading-none text-cinnabar tabular-nums">{rank}</span>
      <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden>
        <ProductImage product={product} className="w-14" />
      </Link>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {product.brandZh} · {originLabel[productOrigin(product)]}
        </p>
        <h3 className="font-serif text-lg leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-cinnabar">
            {product.nameZh}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatUnitPrice(product)}
          {sales ? ` · momo ${sales}` : ""}
        </p>
      </div>
      <div className="col-span-3 col-start-1 grid gap-1 text-sm md:col-span-1 md:col-start-auto">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-xs text-muted-foreground">實際效果</span>
          <EfficacyMeter value={product.efficacy ?? 3} />
        </p>
        <Stars slug={product.slug} className="text-xs" />
        {verdict ? (
          <p className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">品牌宣稱</span>
            <VerdictBadge verdict={verdict} />
          </p>
        ) : null}
      </div>
      <div className="col-span-3 col-start-1 text-sm leading-6 md:col-span-1 md:col-start-auto">
        <p>
          <span className="text-muted-foreground">主成分：</span>
          {mainActives(product)}
        </p>
        {product.asiaFit ? <p className="mt-1 text-muted-foreground">{product.asiaFit}</p> : null}
      </div>
    </li>
  );
}

function GoalSection({ goal }: { goal: Goal }) {
  const list = pickList(goal);
  const top = list.slice(0, visible);
  const rest = list.slice(visible);
  return (
    <section id={goal.id} className="scroll-mt-24 border-t-2 border-foreground pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-3xl">{goal.title}</h2>
        <p className="text-sm text-muted-foreground">共 {list.length} 項可以比較</p>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7">{goal.advice}</p>
      <p className="mt-2 max-w-3xl border-l-2 border-cinnabar pl-3 text-sm leading-6 text-muted-foreground">
        {goal.seeDoctor}
      </p>
      {list.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">這個目的目前還沒有收錄的產品。</p>
      ) : (
        <>
          <ol className="mt-4 border-t border-border">
            {top.map((product, index) => (
              <PickRow key={product.slug} product={product} rank={index + 1} />
            ))}
          </ol>
          {rest.length ? (
            <details className="group mt-2">
              <summary className="cursor-pointer py-3 text-sm text-cinnabar">
                看其餘 {rest.length} 項（第 {visible + 1}–{list.length} 名）
              </summary>
              <ol>
                {rest.map((product, index) => (
                  <PickRow key={product.slug} product={product} rank={visible + index + 1} />
                ))}
              </ol>
            </details>
          ) : null}
        </>
      )}
    </section>
  );
}

export default function PicksPage() {
  const face = goals.filter((goal) => (goal.scope ?? "face") === "face");
  const body = goals.filter((goal) => goal.scope === "body");
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="醫師選品"
        title="先看有沒有效，再看賣得好不好。"
        lede="以皮膚科醫師的角度，替台灣的濕熱氣候與亞洲膚質排出每種保養目的的產品。排序先看「實際效果」（主成分的人體研究與濃度），再看值不值得留下，最後才參考 momo 銷量。每一瓶都查得到完整成分表。"
      />

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="保養目的">
        {[...face, ...body].map((goal) => (
          <Link
            key={goal.id}
            href={`#${goal.id}`}
            className="border border-border px-3 py-1.5 text-sm hover:border-cinnabar hover:text-cinnabar"
          >
            {goal.short}
          </Link>
        ))}
      </nav>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="border border-border bg-card p-5">
          <h2 className="font-serif text-2xl">台灣人的肌膚，和歐美研究不一樣的地方</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6">
            {asianSkinPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-cinnabar">根據哪些研究</summary>
            <RefList ids={asianSkinRefs} className="mt-3" />
          </details>
        </section>
        <section className="border border-border p-5">
          <h2 className="font-serif text-2xl">怎麼看這份清單</h2>
          <dl className="mt-3 space-y-3 text-sm leading-6">
            <div>
              <dt className="font-medium">實際效果（1–5 格）</dt>
              <dd className="text-muted-foreground">{efficacyCriteria}</dd>
              <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {[5, 4, 3, 2, 1].map((value) => (
                  <EfficacyMeter key={value} value={value} />
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-medium">值得留下（星等）</dt>
              <dd className="text-muted-foreground">加上價格與好不好用；效果好但太貴，星等會比較低。</dd>
            </div>
            <div>
              <dt className="font-medium">品牌宣稱</dt>
              <dd className="text-muted-foreground">
                品牌主打的效果，對照醫學期刊後的結論。逐條理由在每個產品頁，也可以到
                <Link href="/claims" className="mx-1 text-cinnabar underline">
                  宣稱查核
                </Link>
                一次看完。
              </dd>
            </div>
            <div>
              <dt className="font-medium">一定要先做的事</dt>
              <dd className="text-muted-foreground">
                不管哪個目的，每天足量防曬都是證據最強的一步；清單裡的精華與乳霜是第二步。
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="mt-12 space-y-14">
        {face.map((goal) => (
          <GoalSection key={goal.id} goal={goal} />
        ))}
        <div className="border border-border bg-card p-5 text-sm leading-6">
          <h2 className="font-serif text-2xl">身體保養為什麼比較少</h2>
          <p className="mt-2 text-muted-foreground">
            身體乳真正做過人體研究、成分表也公開的產品不多；大部分「緊緻」「燃脂」「淡紋」身體產品沒有可信證據。下面只列成分有根據的，數量比臉部少是刻意的。
          </p>
        </div>
        {body.map((goal) => (
          <GoalSection key={goal.id} goal={goal} />
        ))}
      </div>

      <p className="mt-12 text-xs leading-5 text-muted-foreground">
        實際效果分級：{[5, 4, 3, 2, 1].map((value) => `${value} ${efficacyLabel[value]}`).join("、")}。
        成分表多取自 INCIDecoder，海外版與台灣版可能略有差異；價格為台灣常見通路參考價，銷量取自 momo 頁面顯示的數字。
      </p>
    </div>
  );
}
