"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/products";
import { productCategoryLabel, productCategoryOrder } from "@/lib/labels";

export function DupePicker({ current }: { current: string }) {
  const router = useRouter();
  const items = products.map((product) => ({
    value: product.slug,
    label: `${product.brandZh} · ${product.nameZh}`,
  }));

  return (
    <label className="grid w-full max-w-xl gap-2 text-sm">
      <span className="text-muted-foreground">先選你正在考慮的那一瓶</span>
      <Select
        items={items}
        value={current}
        onValueChange={(value) => {
          if (!value) return;
          router.push(`/dupes?product=${value}`);
        }}
      >
        <SelectTrigger className="h-10 w-full! bg-card">
          <SelectValue placeholder="選擇產品" />
        </SelectTrigger>
        <SelectContent>
          {productCategoryOrder.map((category) => (
            <SelectGroup key={category}>
              <SelectLabel>{productCategoryLabel[category]}</SelectLabel>
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <SelectItem key={product.slug} value={product.slug}>
                    {product.brandZh} · {product.nameZh}
                  </SelectItem>
                ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
