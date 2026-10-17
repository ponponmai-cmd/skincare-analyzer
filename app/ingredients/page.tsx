import type { Metadata } from "next";
import { PageIntro } from "@/components/marks";
import { IngredientBrowser } from "@/components/ingredient-browser";

export const metadata: Metadata = {
  title: "成分圖譜",
  description: "保養成分的中英名稱、INCI、功效、優缺點與證據等級。",
};

export default function IngredientsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="成分"
        title="先認識分子，再認識瓶子。"
        lede="這裡收的是會改變你怎麼買的成分：視黃醇、酸類、淡斑、屏障脂質、防曬過濾劑，以及香料、酒精這種用來讀標籤的詞。每一則都有中文、英文、INCI、功效、優點、代價。"
      />
      <div className="mt-8">
        <IngredientBrowser />
      </div>
    </div>
  );
}
