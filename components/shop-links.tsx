import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { coupangUrl, shopeeUrl } from "@/lib/shopping";
import type { Product } from "@/lib/types";
import { cn } from "cn";

export function ShopLinks({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <a
        href={shopeeUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
      >
        到蝦皮搜尋
        <ExternalLink className="size-3.5" />
      </a>
      <a
        href={coupangUrl(product)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
      >
        到酷澎搜尋
        <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
}
