"use client";

import Link from "next/link";
import { useState } from "react";
import { ShopLinks } from "@/components/shop-links";
import { Input } from "@/components/ui/input";
import { formatTwd } from "@/lib/format";
import { judgePrice, type PriceVerdict } from "@/lib/shopping";
import { priceNeighbors } from "@/lib/similarity";
import type { Product } from "@/lib/types";
import { cn } from "cn";

const verdictCopy: Record<PriceVerdict, { title: string; body: string; tone: string }> = {
  low: {
    title: "比參考價便宜很多",
    body: "先確認是官方店或蝦皮商城、酷澎直營，看效期和是否為平行輸入。太便宜的熱門品，仿冒和快過期的機率比較高。",
    tone: "border-sage text-foreground",
  },
  fair: {
    title: "價格合理",
    body: "落在一般通路價附近，可以買。",
    tone: "border-sage text-foreground",
  },
  high: {
    title: "有點貴",
    body: "等活動、找組合包，或看看下面的平價替代。",
    tone: "border-cinnabar/60 text-foreground",
  },
  overpay: {
    title: "你可能在當冤大頭",
    body: "這個單位價比常見售價高很多。換一個賣家，或直接看成分接近、更便宜的替代。",
    tone: "border-cinnabar text-cinnabar",
  },
};

export function PriceCheck({ product }: { product: Product }) {
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState(String(product.volume));
  const unit = product.volumeUnit === "g" ? "克" : "毫升";
  const priceValue = Number(price);
  const volumeValue = Number(volume);
  const ready = priceValue > 0 && volumeValue > 0;
  const result = ready ? judgePrice(product, priceValue, volumeValue) : null;
  const cheaper = priceNeighbors(product).cheaper[0];

  return (
    <section className="border border-border bg-card p-5">
      <h3 className="font-serif text-2xl">冤大頭檢查</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        在蝦皮或酷澎看到價格，填進來。組合包請填總價和總容量，膚鑑會換算成每{unit}，跟參考價 {formatTwd(product.priceTwd)}／{product.volume}
        {product.volumeUnit} 比較。
      </p>
      <ShopLinks product={product} className="mt-4" />
      <div className="mt-4 grid max-w-md grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm">
          <span className="text-muted-foreground">看到的價格（元）</span>
          <Input
            inputMode="numeric"
            value={price}
            onChange={(event) => setPrice(event.target.value.replace(/[^\d.]/g, ""))}
            placeholder={String(product.priceTwd)}
            className="h-10 bg-background px-3"
            aria-label="看到的價格"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="text-muted-foreground">總容量（{product.volumeUnit}）</span>
          <Input
            inputMode="numeric"
            value={volume}
            onChange={(event) => setVolume(event.target.value.replace(/[^\d.]/g, ""))}
            className="h-10 bg-background px-3"
            aria-label="總容量"
          />
        </label>
      </div>
      {result ? (
        <div className={cn("mt-4 border-l-4 bg-background p-4", verdictCopy[result.verdict].tone)}>
          <p className="font-serif text-xl">{verdictCopy[result.verdict].title}</p>
          <p className="mt-1 text-sm text-foreground">
            你看到的是每{unit} {formatTwd(result.seen)}，參考價每{unit} {formatTwd(result.reference)}，約參考價的{" "}
            {Math.round(result.ratio * 100)}%。
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{verdictCopy[result.verdict].body}</p>
        </div>
      ) : null}
      {cheaper ? (
        <p className="mt-4 text-sm leading-6">
          成分接近又更便宜的：{" "}
          <Link href={`/products/${cheaper.product.slug}`} className="text-cinnabar">
            {cheaper.product.brandZh} {cheaper.product.nameZh}
          </Link>
          ，每{cheaper.product.volumeUnit === "g" ? "克" : "毫升"}{" "}
          {formatTwd(cheaper.product.priceTwd / cheaper.product.volume)}。
        </p>
      ) : null}
    </section>
  );
}
