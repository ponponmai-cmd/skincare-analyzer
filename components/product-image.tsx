"use client";

import { useState } from "react";
import { productImage } from "@/lib/media";
import type { Product } from "@/lib/types";
import { cn } from "cn";

export function ProductImage({ product, className }: { product: Product; className?: string }) {
  const image = productImage(product.slug);
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return (
      <div
        className={cn(
          "grid aspect-square place-items-center border border-border bg-muted p-2 text-center font-serif text-sm text-muted-foreground",
          className,
        )}
        aria-hidden
      >
        {product.brandZh}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.url}
      alt={`${product.brandZh} ${product.nameZh}`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={cn("aspect-square border border-border bg-white object-contain p-1", className)}
      title={`圖片來源：${image.source}`}
    />
  );
}
