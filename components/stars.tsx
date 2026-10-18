import { Star } from "lucide-react";
import { productRating } from "@/lib/ratings";
import { cn } from "cn";

export function Stars({ slug, className, showLabel = true }: { slug: string; className?: string; showLabel?: boolean }) {
  const value = productRating(slug);
  return (
    <span
      className={cn("inline-flex items-center gap-1 text-sm", className)}
      aria-label={`值得留下 ${value} 顆星（滿分 5 顆）`}
      title={`值得留下 ${value}／5`}
    >
      {showLabel ? <span className="text-muted-foreground">值得留下</span> : null}
      <span className="inline-flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <Star
            key={index}
            className={cn("size-4", index <= value ? "fill-cinnabar text-cinnabar" : "text-border")}
            aria-hidden
          />
        ))}
      </span>
    </span>
  );
}
