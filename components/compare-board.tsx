"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProduct, ingredientName } from "@/lib/catalog";
import { formatTwd, formatUnitPrice, formatVolume } from "@/lib/format";
import {
  pregnancyLabel,
  productCategoryLabel,
  verdictLabel,
  whiteCastLabel,
} from "@/lib/labels";
import { compareProducts } from "@/lib/similarity";
import { products } from "@/lib/products";
import type { Product } from "@/lib/types";

export function CompareBoard() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = (params.get("with") ?? "").split("|");
  const slots = [raw[0] ?? "", raw[1] ?? "", raw[2] ?? ""];
  const selected = slots
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));
  const items = products.map((product) => ({
    value: product.slug,
    label: `${product.brandZh} · ${product.nameZh}`,
  }));

  function update(index: number, value: string | null) {
    const next = [...slots];
    next[index] = value ?? "";
    const query = next.join("|").replace(/\|+$/g, "");
    router.replace(query ? `/compare?with=${query}` : "/compare", { scroll: false });
  }

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-3">
        {slots.map((slot, index) => (
          <label key={index} className="grid gap-1 text-sm">
            <span className="text-muted-foreground">第 {index + 1} 瓶</span>
            <Select
              items={[{ value: "none", label: "空位" }, ...items]}
              value={slot || "none"}
              onValueChange={(value) => update(index, !value || value === "none" ? "" : value)}
            >
              <SelectTrigger className="h-10 w-full! bg-card">
                <SelectValue placeholder="選擇產品" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">空位</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.slug} value={product.slug}>
                    {product.brandZh} · {product.nameZh}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        ))}
      </div>

      {selected.length < 2 ? (
        <p className="mt-8 border border-dashed border-border p-6 text-sm leading-6">
          至少選兩瓶。也可以從產品頁的「加入比較」把已經看過的帶過來。
        </p>
      ) : (
        <>
          <div className="mt-8 hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-36">項目</TableHead>
                  {selected.map((product) => (
                    <TableHead key={product.slug} className="whitespace-normal">
                      <Link href={`/products/${product.slug}`} className="font-serif text-base text-foreground">
                        {product.nameZh}
                      </Link>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <Row label="品牌" cells={selected.map((product) => product.brandZh)} />
                <Row
                  label="價格"
                  cells={selected.map(
                    (product) => `${formatTwd(product.priceTwd)}／${formatVolume(product)}`,
                  )}
                />
                <Row label="單價" cells={selected.map((product) => formatUnitPrice(product))} />
                <Row
                  label="種類"
                  cells={selected.map((product) => productCategoryLabel[product.category])}
                />
                <Row label="質地" cells={selected.map((product) => product.texture)} />
                <Row
                  label="香料"
                  cells={selected.map((product) => (product.fragrance ? "有" : "無"))}
                />
                <Row
                  label="變性酒精"
                  cells={selected.map((product) => (product.dryingAlcohol ? "靠前或明顯" : "不是重點"))}
                />
                <Row
                  label="孕期"
                  cells={selected.map((product) => pregnancyLabel[product.pregnancy])}
                />
                <Row
                  label="主成份"
                  cells={selected.map((product) =>
                    product.keyActives
                      .map((active) => `${ingredientName(active.ingredient)} ${active.note}`)
                      .join("、"),
                  )}
                />
                <Row
                  label="防曬"
                  cells={selected.map((product) =>
                    product.spf
                      ? `SPF ${product.spf} ${product.pa ?? ""}／${product.whiteCast ? whiteCastLabel[product.whiteCast] : ""}／${product.waterResistant ? "有抗水" : "不主打抗水"}`
                      : "—",
                  )}
                />
                <Row label="值得留下" cells={selected.map((product) => product.strengths.join(" "))} />
                <Row label="代價" cells={selected.map((product) => product.weaknesses.join(" "))} />
              </TableBody>
            </Table>
          </div>
          <div className="mt-8 grid gap-4 md:hidden">
            {selected.map((product) => (
              <article key={product.slug} className="border border-border p-4">
                <h2 className="font-serif text-2xl">{product.nameZh}</h2>
                <p className="mt-2 text-sm leading-6">{formatUnitPrice(product)}</p>
                <p className="mt-2 text-sm leading-6">{product.expertNote}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-3">
            {selected.slice(1).map((product) => {
              const comparison = compareProducts(selected[0], product);
              return (
                <p key={product.slug} className="text-sm leading-6">
                  以 {selected[0].nameZh} 為準看 {product.nameZh}：
                  {verdictLabel[comparison.verdict]}，重疊 {comparison.score}。
                  {comparison.missing.length > 0
                    ? ` 沒有一起過來的是 ${comparison.missing.map((item) => ingredientName(item.ingredient)).join("、")}。`
                    : ""}
                </p>
              );
            })}
          </div>
        </>
      )}
      <div className="mt-6">
        <Button type="button" variant="outline" onClick={() => router.replace("/compare")}>
          清空並排
        </Button>
      </div>
    </div>
  );
}

function Row({ label, cells }: { label: string; cells: string[] }) {
  return (
    <TableRow>
      <TableCell className="align-top font-medium whitespace-nowrap">{label}</TableCell>
      {cells.map((cell, index) => (
        <TableCell key={`${label}-${index}`} className="align-top whitespace-normal text-sm leading-6">
          {cell}
        </TableCell>
      ))}
    </TableRow>
  );
}
