"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductImage } from "@/components/product-image";
import { Stars } from "@/components/stars";
import { Button } from "@/components/ui/button";
import { formatTwd, formatUnitPrice, formatVolume } from "@/lib/format";
import { findDupes, inciItems, type InciItem } from "@/lib/overlap";
import { productSource } from "@/lib/sources";
import type { Product } from "@/lib/types";
import { cn } from "cn";

export function DupeTable({ product }: { product: Product }) {
  const [threshold, setThreshold] = useState(3);
  const dupes = useMemo(() => findDupes(product, threshold), [product, threshold]);
  const columns = [product, ...dupes.map((item) => item.product)];
  const itemsByColumn = columns.map((column) => inciItems(column));
  const positions = itemsByColumn.map(({ items }) => new Map(items.map((item, index) => [item.key, index + 1])));

  const rows: InciItem[] = [...itemsByColumn[0].items];
  const seen = new Set(rows.map((row) => row.key));
  for (const { items } of itemsByColumn.slice(1)) {
    for (const item of items) {
      if (item.active && !seen.has(item.key)) {
        seen.add(item.key);
        rows.push(item);
      }
    }
  }
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? rows : rows.slice(0, 18);

  return (
    <section className="mt-10">
      <h2 className="font-serif text-3xl">平價替代成分對照表</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        至少列出兩瓶。「重複」只算有意義的成分：不算水、防腐劑、酸鹼調整劑、溶劑、增稠劑與香料，也不算幾乎每瓶都有的甘油。數字是該成分在成分表的第幾項，越前面通常含量越高。
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm">至少重複</span>
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={threshold === value ? "default" : "outline"}
            className="h-8 w-9"
            onClick={() => setThreshold(value)}
            aria-pressed={threshold === value}
          >
            {value}
          </Button>
        ))}
        <span className="text-sm">樣成分</span>
      </div>

      {dupes.length === 0 ? (
        <p className="mt-6 border border-dashed border-border p-6 text-sm leading-6">
          收錄產品裡還找不到做同一件事的瓶子。可以把它的成分表貼到{" "}
          <Link href="/analyze" className="text-cinnabar">
            成分表解析
          </Link>
          ，再看看有哪些成分值得找。
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto border border-border">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="align-top">
                <th className="w-48 border-b border-border bg-card p-3 text-left font-normal text-muted-foreground">成分</th>
                {columns.map((column, index) => {
                  const dupe = index === 0 ? undefined : dupes[index - 1];
                  return (
                    <th key={column.slug} className={cn("border-b border-l border-border p-3 text-left font-normal", index === 0 ? "bg-cinnabar/5" : "bg-card")}>
                      <p className="text-xs text-cinnabar">{index === 0 ? "你原本想買" : `替代 ${index}`}</p>
                      <ProductImage product={column} className="mt-2 w-20" />
                      <Link href={`/products/${column.slug}`} className="mt-2 block font-serif text-base leading-5 hover:text-cinnabar">
                        {column.brandZh} {column.nameZh}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatTwd(column.priceTwd)}／{formatVolume(column)}
                      </p>
                      <p className="font-serif text-lg">{formatUnitPrice(column)}</p>
                      <Stars slug={column.slug} showLabel={false} />
                      {dupe ? (
                        <p className={cn("mt-1 text-xs", dupe.meetsThreshold ? "text-sage" : "text-cinnabar")}>
                          重複 {dupe.shared.length} 樣{dupe.meetsThreshold ? "" : `，未達 ${threshold} 樣`}
                          {dupe.cheaper ? "" : "（沒有更便宜的，列最接近的）"}
                        </p>
                      ) : null}
                      {!itemsByColumn[index].complete ? (
                        <p className="mt-1 text-xs text-muted-foreground">完整成分表未取得，只比對主成分</p>
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => {
                const hits = positions.map((map) => map.get(row.key));
                const shared = row.meaningful && hits.filter(Boolean).length > 1;
                return (
                  <tr key={row.key} className={cn("border-b border-border", shared && "bg-sage/10")}>
                    <td className="p-2 pl-3">
                      <span className={cn(row.active && "font-medium text-cinnabar")}>{row.label}</span>
                      {row.label !== row.raw ? <span className="block text-xs text-muted-foreground">{row.raw}</span> : null}
                    </td>
                    {hits.map((position, index) => (
                      <td key={columns[index].slug} className="border-l border-border p-2 text-center">
                        {position ? <span>✓ 第 {position} 項</span> : <span className="text-muted-foreground">—</span>}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {rows.length > 18 ? (
        <Button type="button" variant="outline" className="mt-3 h-9" onClick={() => setShowAll((value) => !value)}>
          {showAll ? "收起" : `顯示全部 ${rows.length} 項成分`}
        </Button>
      ) : null}
      <SourceNote slugs={columns.map((column) => column.slug)} />
    </section>
  );
}

function SourceNote({ slugs }: { slugs: string[] }) {
  const links = slugs
    .map((slug) => productSource(slug)?.inci)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  if (links.length === 0) return null;
  return (
    <p className="mt-3 text-xs leading-5 text-muted-foreground">
      完整成分表來源：
      {links.map((item, index) => (
        <span key={item.url}>
          {index > 0 ? "、" : ""}
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline">
            {item.title}
          </a>
        </span>
      ))}
      （INCIDecoder，可能與台灣販售版本略有差異，以包裝為準）。
    </p>
  );
}
