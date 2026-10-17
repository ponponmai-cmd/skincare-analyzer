import type { Metadata } from "next";
import { InciAnalyzer } from "@/components/inci-analyzer";
import { PageIntro } from "@/components/marks";

export const metadata: Metadata = {
  title: "成分表解析",
  description: "貼上任何保養品的全成分表，逐項看中文名、用途、香料與刺激提醒，估計 1% 線，並找出收錄產品裡成分最接近的瓶子。",
};

export default function AnalyzePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="成分表解析"
        title="把整串成分表貼進來。"
        lede="從包裝、蝦皮或酷澎商品頁複製全成分，中英文都可以。膚鑑會逐項翻譯和標註，指出真正有功效的成分排在哪裡、可能只是點綴的有哪些、同一瓶裡會互相打架的組合，再找出收錄產品裡成分最接近、可能更便宜的瓶子。"
      />
      <InciAnalyzer />
    </div>
  );
}
