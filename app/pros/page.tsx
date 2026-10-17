import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/marks";
import { ProsResults } from "@/components/pros-search";

export const metadata: Metadata = {
  title: "優缺點",
  description: "輸入廠牌和品名，或輸入成分，查看收錄產品的優點與缺點。",
};

export default function ProsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="優缺點"
        title="打廠牌和品名，或打一個成分。"
        lede="膚鑑只評論資料庫裡收錄的瓶子。對到產品時，列出那一瓶的優點和缺點。對到成分時，列出以那個成分當主軸的產品。沒有收錄的瓶子，不會臨時編一套評價。"
      />
      <Suspense fallback={<p className="mt-8 text-sm">對照優缺點…</p>}>
        <ProsResults />
      </Suspense>
    </div>
  );
}
