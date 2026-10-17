import type { Metadata } from "next";
import { Suspense } from "react";
import { DupeColumns } from "@/components/dupe-columns";
import { DupePicker } from "@/components/dupe-picker";
import { PageIntro } from "@/components/marks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/catalog";
import { formatUnitPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "平價替代",
  description: "用關鍵成分與每毫升價格，找出保養品之間說得清的替代關係。",
};

export default function DupesPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-16">對照配方中…</div>}>
      <DupeScreen searchParams={searchParams} />
    </Suspense>
  );
}

async function DupeScreen({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const query = await searchParams;
  const requested = getProduct(query.product ?? "");
  const product = requested ?? getProduct("skinceuticals-ce-ferulic");
  if (!product) return null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="平價替代"
        title="便宜可以，但要把少掉的部分說出來。"
        lede="不同廠牌常常做同一件事。有的是同一組分子，有的只是工作類似。膚鑑先看主成份覆蓋，再看每毫升價格。低於八成單價才算明顯更便宜。"
      />
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <DupePicker current={product.slug} />
        <Dialog>
          <DialogTrigger render={<Button variant="outline" className="h-10" />}>
            這個關係怎麼判
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">接近，不是複製</DialogTitle>
              <DialogDescription className="text-sm leading-6">
                成分接近代表關鍵分子重疊高。只重疊一部分，就會列出缺的那個。做的事接近，表示想解決的皮膚問題類似，但過濾劑或脂質系統不是同一派。範圍更大，表示貴的那瓶把你的成份包進去又加了別的主軸。
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        {product.brandZh} {product.nameZh} 現在是 {formatUnitPrice(product)}。
      </p>
      <div className="mt-6">
        <DupeColumns product={product} />
      </div>
    </div>
  );
}
