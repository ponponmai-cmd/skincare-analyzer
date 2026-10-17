import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareBoard } from "@/components/compare-board";
import { PageIntro } from "@/components/marks";

export const metadata: Metadata = {
  title: "並排比較",
  description: "最多三瓶保養品並排，對照價格、主成份與限制。",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="並排"
        title="一次只看三瓶。"
        lede="把價格、主成份、香料、酒精、孕期與防曬條件放在同一張表。網址可以分享，比較不會被廣告順序帶著走。"
      />
      <div className="mt-8">
        <Suspense fallback={<p className="text-sm">準備比較表…</p>}>
          <CompareBoard />
        </Suspense>
      </div>
    </div>
  );
}
