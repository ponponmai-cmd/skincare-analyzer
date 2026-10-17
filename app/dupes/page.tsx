import type { Metadata } from "next";
import { Suspense } from "react";
import { DupeScreen } from "@/components/dupe-screen";
import { PageIntro } from "@/components/marks";

export const metadata: Metadata = {
  title: "平價替代",
  description: "用關鍵成分與每毫升價格，找出保養品之間說得清的替代關係。",
};

export default function DupesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="平價替代"
        title="便宜可以，但要把少掉的部分說出來。"
        lede="不同廠牌常常做同一件事。有的是同一組分子，有的只是工作類似。膚鑑先看主成份覆蓋，再看每毫升價格。低於八成單價才算明顯更便宜。"
      />
      <Suspense fallback={<p className="mt-8 text-sm">對照配方中…</p>}>
        <DupeScreen />
      </Suspense>
    </div>
  );
}
