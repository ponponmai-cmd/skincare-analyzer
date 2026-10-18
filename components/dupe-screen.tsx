"use client";

import { useSearchParams } from "next/navigation";
import { DupeColumns } from "@/components/dupe-columns";
import { DupePicker } from "@/components/dupe-picker";
import { DupeTable } from "@/components/dupe-table";
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

export function DupeScreen() {
  const params = useSearchParams();
  const product =
    getProduct(params.get("product") ?? "") ?? getProduct("skinceuticals-ce-ferulic");
  if (!product) return null;

  return (
    <>
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
      <DupeTable product={product} />
      <h2 className="mt-12 font-serif text-3xl">逐瓶說明：差在哪裡</h2>
      <div className="mt-6">
        <DupeColumns product={product} />
      </div>
    </>
  );
}
