"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const links = [
  ["/pros", "查詢"],
  ["/picks", "醫師選品"],
  ["/claims", "宣稱查核"],
  ["/analyze", "成分表解析"],
  ["/ingredients", "成分"],
  ["/products", "產品"],
  ["/dupes", "平價替代"],
  ["/compare", "並排"],
  ["/sunscreen", "防曬"],
  ["/ages", "年紀"],
  ["/masks", "面膜急救"],
  ["/method", "判讀法"],
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {links.map(([href, label]) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "text-sm text-muted-foreground hover:text-foreground",
              active && "text-foreground",
            )}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center border-2 border-cinnabar font-serif text-lg text-cinnabar">
            膚
          </span>
          <span>
            <span className="block font-serif text-lg leading-none">膚鑑</span>
            <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
              Fugen
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-3.5 xl:flex">
          <NavLinks />
        </nav>
        <Sheet>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center border border-border xl:hidden"
            aria-label="開啟選單"
          >
            <Menu className="size-4" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="font-serif text-2xl">目錄</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 px-4">
              <NavLinks />
              <p className="text-xs text-muted-foreground">目前頁面 {pathname}</p>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
