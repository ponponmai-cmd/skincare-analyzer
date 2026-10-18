import { ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { shopLinks } from "@/lib/shopping";
import type { Product } from "@/lib/types";
import { cn } from "cn";

export function ShopLinks({ product, className }: { product: Product; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {shopLinks(product).map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", className: "h-9 px-3" }))}
        >
          {link.label}
          <ExternalLink className="size-3.5" />
        </a>
      ))}
    </div>
  );
}
