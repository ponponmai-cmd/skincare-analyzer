import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/marks";
import { ProsResults } from "@/components/pros-search";

export const metadata: Metadata = {
  title: "查詢",
  description: "輸入想要的效果、一個成分，或廠牌加品名，查看功效、優缺點與不同公司的對照產品。",
};

export default function ProsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="查詢"
        title="打你想要的效果、一個成分，或廠牌加品名。"
        lede="打「美白」「痘痘」「毛孔粗大」，會列出該先認識的成分，和不同公司做得到這件事的產品，可依韓國、台灣、日本、歐美篩選。打成分會先看到功效與作用方式。打產品會看到那一瓶的優缺點、平價替代，以及蝦皮、酷澎比價。"
      />
      <Suspense fallback={<p className="mt-8 text-sm">查詢中…</p>}>
        <ProsResults />
      </Suspense>
    </div>
  );
}
