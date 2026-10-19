import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ProsSearchForm } from "@/components/pros-search";
import { ingredients } from "@/lib/ingredients";
import { products } from "@/lib/products";
import { requireProduct } from "@/lib/catalog";
import { formatTwd, formatUnitPrice } from "@/lib/format";
import { priceNeighbors } from "@/lib/similarity";
import { verdictLabel } from "@/lib/labels";
import { cn } from "cn";

const anchors = [
  "skii-fte",
  "estee-anr",
  "skinceuticals-ce-ferulic",
  "skinceuticals-discoloration",
  "kiehls-ufc",
  "drwu-hyaluronic",
];

const goalChips = ["美白淡斑", "抗皺細紋", "緊實拉提", "痘痘粉刺", "保濕", "修護敏感", "泛紅", "控油毛孔", "防曬", "身體光滑", "身體緊緻"];

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
            <ProsSearchForm
              placeholder="想要的效果、成分或產品。例如美白、魚腥草、青春露"
              className="mt-8 max-w-xl"
            />
            <div className="mt-4 flex max-w-xl flex-wrap gap-2">
              {goalChips.map((goal) => (
                <Link
                  key={goal}
                  href={`/pros?q=${encodeURIComponent(goal)}`}
                  className="border border-border px-3 py-1.5 text-sm hover:border-cinnabar hover:text-cinnabar"
                >
                  {goal}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/analyze" className={cn(buttonVariants({ className: "h-10 px-4" }))}>
                貼成分表解析
              </Link>
              <Link href="/dupes" className={cn(buttonVariants({ variant: "outline", className: "h-10 px-4" }))}>
                找平價替代
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
            ["成分表解析", "貼上整串成分，逐項翻譯，標出功效成分排在哪裡、1% 線之後的點綴、香料與互相衝突的組合。", "/analyze"],
            ["產品連結", "韓國、台灣、日本、歐美的瓶子放在一起，配方接近就用每毫升價格排。缺的成分會寫出來。", "/dupes"],
            ["不當冤大頭", "每一瓶都能先用 Google 看商品，再連去蝦皮、酷澎、momo，不用先登入。把看到的價格填進去，立刻知道每毫升貴不貴。", "/products"],
          ].map(([title, body, href]) => (
            <Link key={title} href={href} className="border border-border p-5 hover:border-cinnabar">
              <h3 className="font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["醫師選品", "適合台灣人肌膚的產品，依抗皺、美白、緊緻等目的排名：先看實際效果，再看值不值得與銷量。", "/picks"],
            ["宣稱查核", "專櫃、精品、醫美品牌的主打宣稱，一條條對照醫學期刊：有證據、部分成立，還是沒有可信證據。", "/claims"],
            ["知名熱銷", "momo 銷量破千、大廠牌、成分清楚的瓶子。", "/products?tier=bestseller"],
            ["奢華款看成分", "買不起也可以先看：貴婦品牌裝了什麼、怎麼用、有沒有便宜的近親。", "/products?tier=luxury"],
            ["身體乳", "想讓身體更光滑、更緊緻：尿素、水楊酸、果酸與 A 醇身體乳。", "/products?goal=body-smooth"],
          ].map(([title, body, href]) => (
            <Link key={title} href={href} className="border border-border bg-card p-5 hover:border-cinnabar">
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
