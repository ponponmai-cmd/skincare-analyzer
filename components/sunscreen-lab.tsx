"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products } from "@/lib/products";
import { sunscreenScenarios } from "@/lib/guides";
import { formatUnitPrice } from "@/lib/format";
import { whiteCastLabel } from "@/lib/labels";
import { cn } from "cn";

type SortKey = "price" | "spf" | "name";

export function SunscreenLab() {
  const [sort, setSort] = useState<SortKey>("price");
  const [active, setActive] = useState<string>(sunscreenScenarios[0].id);

  const rows = useMemo(() => {
    const copy = products.filter((product) => product.category === "sunscreen");
    copy.sort((a, b) => {
      if (sort === "name") return a.nameZh.localeCompare(b.nameZh, "zh-Hant");
      if (sort === "spf") return (b.spf ?? 0) - (a.spf ?? 0);
      return a.priceTwd / a.volume - b.priceTwd / b.volume;
    });
    return copy;
  }, [sort]);

  const scenario = sunscreenScenarios.find((item) => item.id === active) ?? sunscreenScenarios[0];

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {sunscreenScenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "border border-border bg-card p-4 text-left",
              active === item.id && "border-cinnabar",
            )}
          >
            <p className="font-serif text-xl">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.summary}</p>
          </button>
        ))}
      </div>

      <section className="mt-8 border border-border bg-card p-5">
        <p className="font-mono text-[11px] tracking-[0.14em] text-cinnabar uppercase">
          這個場合我會先看
        </p>
        <h2 className="mt-2 font-serif text-3xl">
          <Link href={`/products/${scenario.pick}`} className="hover:text-cinnabar">
            {products.find((product) => product.slug === scenario.pick)?.nameZh}
          </Link>
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7">{scenario.caution}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {scenario.also.map((slug) => {
            const product = products.find((item) => item.slug === slug);
            if (!product) return null;
            return (
              <Link
                key={slug}
                href={`/products/${slug}`}
                className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
              >
                也看 {product.nameZh}
              </Link>
            );
          })}
          <Link
            href={`/dupes?product=${scenario.pick}`}
            className={cn(buttonVariants({ className: "h-9 px-3" }))}
          >
            找這瓶的替代
          </Link>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        <SortButton current={sort} value="price" onChange={setSort}>
          單價由低到高
        </SortButton>
        <SortButton current={sort} value="spf" onChange={setSort}>
          SPF 由高到低
        </SortButton>
        <SortButton current={sort} value="name" onChange={setSort}>
          名稱
        </SortButton>
      </div>

      <div className="mt-4 hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>產品</TableHead>
              <TableHead>標示</TableHead>
              <TableHead>單價</TableHead>
              <TableHead>泛白</TableHead>
              <TableHead>抗水</TableHead>
              <TableHead>酒精</TableHead>
              <TableHead>香料</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((product) => (
              <TableRow key={product.slug} className={product.slug === scenario.pick ? "bg-accent" : ""}>
                <TableCell className="whitespace-normal">
                  <Link href={`/products/${product.slug}`} className="font-medium hover:text-cinnabar">
                    {product.brandZh} {product.nameZh}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{product.texture}</p>
                </TableCell>
                <TableCell className="whitespace-normal">
                  SPF {product.spf} {product.pa}
                </TableCell>
                <TableCell className="whitespace-normal">{formatUnitPrice(product)}</TableCell>
                <TableCell className="whitespace-normal">
                  {product.whiteCast ? whiteCastLabel[product.whiteCast] : "—"}
                </TableCell>
                <TableCell>{product.waterResistant ? "有" : "不主打"}</TableCell>
                <TableCell>{product.dryingAlcohol ? "明顯" : "否"}</TableCell>
                <TableCell>{product.fragrance ? "有" : "無"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {rows.map((product) => (
          <article key={product.slug} className="border border-border p-4">
            <Link href={`/products/${product.slug}`} className="font-serif text-xl">
              {product.nameZh}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              SPF {product.spf} {product.pa} · {formatUnitPrice(product)}
            </p>
            <p className="mt-2 text-sm leading-6">
              {product.whiteCast ? whiteCastLabel[product.whiteCast] : ""}
              {product.waterResistant ? " · 有抗水" : " · 不主打抗水"}
              {product.dryingAlcohol ? " · 酒精明顯" : ""}
              {product.fragrance ? " · 有香" : " · 無香"}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function SortButton({
  current,
  value,
  onChange,
  children,
}: {
  current: SortKey;
  value: SortKey;
  onChange: (value: SortKey) => void;
  children: string;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={current === value ? "default" : "outline"}
      className="h-8"
      onClick={() => onChange(value)}
    >
      {children}
    </Button>
  );
}
