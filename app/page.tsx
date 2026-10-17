import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ingredients } from "@/lib/ingredients";
import { products } from "@/lib/products";
import { requireProduct } from "@/lib/catalog";
import { formatTwd, formatUnitPrice } from "@/lib/format";
import { priceNeighbors } from "@/lib/similarity";
import { verdictLabel } from "@/lib/labels";
import { cn } from "cn";

const anchors = [
  "skinceuticals-ce-ferulic",
  "skinceuticals-discoloration",
  "paulas-retinol-1",
  "lala-retro",
  "supergoop-unseen",
  "anessa-milk",
];

export default function HomePage() {
  const featured = requireProduct("skinceuticals-ce-ferulic");
  const alternatives = priceNeighbors(featured).cheaper.slice(0, 2);
  const sunscreenCount = products.filter((product) => product.category === "sunscreen").length;

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">
              成分對照所
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] md:text-6xl">
              貴的那一瓶，
              <br />
              到底貴在成分。
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              膚鑑用皮膚科讀標籤的方式整理保養品：中英名稱、INCI、它實際在做的事、證據到哪裡、以及什麼情況下不該用。不同廠牌若只是把相近配方賣出很大價差，這裡會指出較便宜的那瓶少了什麼。
            </p>
            <form action="/pros" className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row">
              <Input
                name="q"
                placeholder="廠牌與品名，或成分。例如安耐曬、菸鹼醯胺"
                aria-label="廠牌、品名或成分"
                className="h-10 bg-card px-3"
              />
              <button type="submit" className={cn(buttonVariants({ className: "h-10 px-4" }))}>
                看優缺點
              </button>
            </form>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/dupes" className={cn(buttonVariants({ variant: "outline", className: "h-10 px-4" }))}>
                找平價替代
              </Link>
              <Link
                href="/sunscreen"
                className={cn(buttonVariants({ variant: "outline", className: "h-10 px-4" }))}
              >
                先看防曬
              </Link>
            </div>
          </div>
          <div className="border border-border bg-card p-5">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              一則判讀
            </p>
            <h2 className="mt-2 font-serif text-2xl">{featured.nameZh}</h2>
            <p className="mt-2 text-sm leading-6">{featured.expertNote}</p>
            <p className="mt-4 font-serif text-3xl">{formatUnitPrice(featured)}</p>
            <p className="text-xs text-muted-foreground">
              {formatTwd(featured.priceTwd)}／{featured.volume}
              {featured.volumeUnit}
            </p>
            <ul className="mt-4 space-y-3">
              {alternatives.map((item) => (
                <li key={item.product.slug} className="border-t border-border pt-3">
                  <Link href={`/products/${item.product.slug}`} className="font-medium hover:text-cinnabar">
                    {item.product.brand} {item.product.nameZh}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {formatUnitPrice(item.product)} · {verdictLabel[item.comparison.verdict]}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/compare?with=skinceuticals-ce-ferulic|timeless-cef|melano-cc"
              className="mt-4 inline-block text-sm text-cinnabar"
            >
              三瓶並排
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-3xl">先把三件事分開</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["成分", "中文、英文、INCI、功效、優點、代價、孕期與證據。", "/ingredients"],
            ["產品連結", "同一工作若配方接近，就用每毫升價格排。缺的成分會寫出來。", "/dupes"],
            ["場合", "年紀改變的是耐受與優先順序。防曬則要看過濾劑，不看植物故事。", "/ages"],
          ].map(([title, body, href]) => (
            <Link key={title} href={href} className="border border-border p-5 hover:border-cinnabar">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl">貴價品的近親</h2>
            <Link href="/dupes" className="text-sm text-cinnabar">
              全部替代
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {anchors.map((slug) => {
              const source = requireProduct(slug);
              const cheaper = priceNeighbors(source).cheaper[0];
              if (!cheaper) return null;
              return (
                <article key={slug} className="border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">{source.brandZh}</p>
                  <h3 className="font-serif text-2xl">{source.nameZh}</h3>
                  <p className="mt-3 text-sm leading-6">
                    較便宜的一邊是{" "}
                    <Link href={`/products/${cheaper.product.slug}`} className="text-cinnabar">
                      {cheaper.product.brandZh} {cheaper.product.nameZh}
                    </Link>
                    ，{formatUnitPrice(cheaper.product)}，{verdictLabel[cheaper.comparison.verdict]}。
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-serif text-4xl">{ingredients.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">會改變選擇的成分，含中英與 INCI</p>
        </div>
        <div>
          <p className="font-serif text-4xl">{products.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">用來對照的產品，不是商場全目錄</p>
        </div>
        <div>
          <p className="font-serif text-4xl">{sunscreenCount}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <Link href="/sunscreen" className="text-cinnabar">
              支防曬
            </Link>
            ，依場合而不是依廣告詞
          </p>
        </div>
      </section>
    </div>
  );
}
