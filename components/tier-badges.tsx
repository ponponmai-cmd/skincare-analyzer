import { Badge } from "@/components/ui/badge";
import { isBestSeller, momoSalesText } from "@/lib/media";
import type { Product } from "@/lib/types";

export function TierBadges({ product }: { product: Product }) {
  const sales = momoSalesText(product.slug);
  return (
    <>
      {product.tier === "luxury" ? <Badge className="bg-amber-700 text-white hover:bg-amber-700">奢華款</Badge> : null}
      {isBestSeller(product.slug) && sales ? (
        <Badge variant="outline" title="momo 搜尋結果顯示的總銷量">
          momo {sales.replace("總銷量", "銷量 ")}
        </Badge>
      ) : null}
    </>
  );
}
