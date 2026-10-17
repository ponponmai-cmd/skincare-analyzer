import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cinnabar uppercase">404</p>
      <h1 className="mt-3 font-serif text-4xl">這頁不在成分表裡。</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        連結可能過期，或這個成分還沒被收進對照組。
      </p>
      <Link href="/ingredients" className={cn(buttonVariants({ className: "mt-6 h-10 px-4" }))}>
        回成分圖譜
      </Link>
    </div>
  );
}
