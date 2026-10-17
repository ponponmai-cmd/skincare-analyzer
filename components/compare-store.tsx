"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

const KEY = "fugen-compare";
const EVENT = "fugen-compare-change";

export function readCompare() {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string").slice(0, 3);
  } catch {
    return [];
  }
}

export function writeCompare(ids: string[]) {
  localStorage.setItem(KEY, JSON.stringify(ids.slice(0, 3)));
  window.dispatchEvent(new Event(EVENT));
}

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(readCompare());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function toggle(slug: string) {
    const current = readCompare();
    const next = current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug].slice(-3);
    writeCompare(next);
  }

  return {
    ids,
    toggle,
    clear: () => writeCompare([]),
  };
}

export function SaveCompareButton({ slug }: { slug: string }) {
  const { ids, toggle } = useCompare();
  const active = ids.includes(slug);
  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      className="h-9 px-3"
      onClick={() => toggle(slug)}
    >
      {active ? "已加入比較" : "加入比較"}
    </Button>
  );
}

export function CompareTray() {
  const { ids, clear } = useCompare();
  if (ids.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm">
          已選 {ids.length} / 3。比較只放三瓶，多了就會把最早的換掉。
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="h-9" onClick={clear}>
            清空
          </Button>
          <Link
            href={`/compare?with=${ids.join("|")}`}
            className={cn(buttonVariants({ className: "h-9 px-3" }))}
          >
            開始並排
          </Link>
        </div>
      </div>
    </div>
  );
}
