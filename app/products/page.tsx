import type { Metadata } from "next";
import { PageIntro } from "@/components/marks";
import { ProductBrowser } from "@/components/product-browser";

export const metadata: Metadata = {
  title: "產品",
  description: "依種類、功效與年紀瀏覽保養品，並用每毫升價格看貴在哪裡。",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="產品"
        title="瓶子是配方的結果，不是配方本身。"
        lede="每一項都標了參考價格、容量、關鍵成分與它不適合誰。用「加入比較」最多帶三瓶去並排。價格是 2026 年 10 月的參考市價。"
      />
      <div className="mt-8">
        <ProductBrowser />
      </div>
    </div>
  );
}
