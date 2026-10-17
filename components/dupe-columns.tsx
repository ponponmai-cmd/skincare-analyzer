import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ingredientName } from "@/lib/catalog";
import { formatUnitPrice } from "@/lib/format";
import { verdictLabel } from "@/lib/labels";
import { priceNeighbors, verdictExplanation, type Neighbor } from "@/lib/similarity";
import type { Product } from "@/lib/types";
import { cn } from "cn";

export function DupeColumns({ product }: { product: Product }) {
  const neighbors = priceNeighbors(product);
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Column
        title="明顯更便宜"
        empty="沒有便宜到值得換、而且還說得上話的同類型產品。差太遠的我不拿來湊數。"
        source={product}
        items={neighbors.cheaper}
      />
      <Column
        title="價格接近的近親"
        empty="這個價位帶沒有另一瓶配方靠近的產品。"
        source={product}
        items={neighbors.peers}
      />
      <Column
        title="你可能多付的那幾瓶"
        empty="沒有明顯更貴、又和它相似的瓶子。"
        source={product}
        items={neighbors.pricier}
      />
      {neighbors.otherFormat.length > 0 ? (
        <div className="lg:col-span-3">
          <Column
            title="不同劑型，但主成份重疊"
            empty=""
            source={product}
            items={neighbors.otherFormat}
          />
        </div>
      ) : null}
    </div>
  );
}

function Column({
  title,
  empty,
  source,
  items,
}: {
  title: string;
  empty: string;
  source: Product;
  items: Neighbor[];
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{empty}</p>
      ) : (
        <div className="mt-3 grid gap-3">
          {items.map((item) => (
            <NeighborCard key={item.product.slug} source={source} neighbor={item} />
          ))}
        </div>
      )}
    </section>
  );
}

function NeighborCard({ source, neighbor }: { source: Product; neighbor: Neighbor }) {
  const { product, comparison } = neighbor;
  const waterGap =
    source.waterResistant && product.waterResistant === false
      ? "抗水沒有一起被替代。戶外流汗時，這瓶不是同一種工具。"
      : null;

  return (
    <article className="border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="outline">
          {comparison.concentrationGap && comparison.verdict === "close"
            ? "同成分，濃度不同"
            : verdictLabel[comparison.verdict]}
        </Badge>
        <span className="font-mono text-xs text-muted-foreground">
          重疊 {comparison.score}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-xl leading-tight">
        <Link href={`/products/${product.slug}`} className="hover:text-cinnabar">
          {product.brandZh} {product.nameZh}
        </Link>
      </h3>
      <p className="mt-2 font-serif text-lg">{formatUnitPrice(product)}</p>
      <p className="text-xs text-muted-foreground">你這瓶是 {formatUnitPrice(source)}</p>
      <p className="mt-3 text-sm leading-6">
        {verdictExplanation(comparison.verdict, comparison.concentrationGap)}
      </p>
      {waterGap ? <p className="mt-2 text-sm leading-6 text-cinnabar">{waterGap}</p> : null}
      <GapList
        title="對得上"
        items={comparison.exact.map((item) => {
          const name = ingredientName(item.ingredient);
          if (item.sourceNote === item.targetNote) return `${name}（${item.sourceNote}）`;
          return `${name}：你這瓶 ${item.sourceNote}，對方 ${item.targetNote}`;
        })}
      />
      <GapList
        title="相關、但不是同一分子"
        items={comparison.analogs.map(
          (item) =>
            `${ingredientName(item.from)} → ${ingredientName(item.to)}`,
        )}
      />
      <GapList
        title="對方沒有的重點"
        items={comparison.missing.map(
          (item) => `${ingredientName(item.ingredient)}（${item.note}）`,
        )}
      />
      <GapList
        title="對方多出來的主軸"
        items={comparison.extras
          .filter((item) => item.centrality >= 3)
          .map((item) => `${ingredientName(item.ingredient)}（${item.note}）`)}
      />
      <Link
        href={`/compare?with=${source.slug}|${product.slug}`}
        className={cn(buttonVariants({ variant: "outline", className: "mt-4 h-9 px-3" }))}
      >
        兩瓶並排
      </Link>
    </article>
  );
}

function GapList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-3">
      <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
        {title}
      </p>
      <ul className="mt-1 space-y-1 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
