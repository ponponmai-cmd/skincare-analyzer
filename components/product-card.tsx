import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { SaveCompareButton } from "@/components/compare-store";
import { ProductImage } from "@/components/product-image";
import { Stars } from "@/components/stars";
import { TierBadges } from "@/components/tier-badges";
import { formatTwd, formatUnitPrice, formatVolume } from "@/lib/format";
import { productCategoryLabel } from "@/lib/labels";
import type { Product } from "@/lib/types";
import { cn } from "cn";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-cinnabar uppercase">
          {productCategoryLabel[product.category]}
        </p>
        <p className="text-xs text-muted-foreground">{product.brandZh}</p>
      </div>
      <div className="mt-3 flex gap-3">
        <Link href={`/products/${product.slug}`} className="shrink-0" tabIndex={-1} aria-hidden>
          <ProductImage product={product} className="w-20" />
        </Link>
        <div className="min-w-0">
          <h3 className="font-serif text-xl leading-tight">
            <Link href={`/products/${product.slug}`} className="hover:text-cinnabar">
              {product.nameZh}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{product.name}</p>
          <Stars slug={product.slug} showLabel={false} className="mt-1" />
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <TierBadges product={product} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6">{product.summary}</p>
      <div className="mt-auto pt-4">
        <p className="font-serif text-xl">{formatUnitPrice(product)}</p>
        <p className="text-xs text-muted-foreground">
          {formatTwd(product.priceTwd)}／{formatVolume(product)} · 參考市價
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={`/products/${product.slug}`}
            className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
          >
            看配方
          </Link>
          <SaveCompareButton slug={product.slug} />
        </div>
      </div>
    </article>
  );
}
