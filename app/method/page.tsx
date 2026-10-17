import type { Metadata } from "next";
import { PageIntro } from "@/components/marks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "判讀法",
  description: "膚鑑如何用成分、證據與每毫升價格比較保養品。",
};

const items = [
  {
    value: "split",
    title: "成分頁和產品頁必須分開",
    body: "菸鹼醯胺是一個分子。某品牌的 10% 精華是一個配方。把兩者寫在同一段廣告裡，價格就會黏到分子上。膚鑑先解釋分子的證據與代價，再把產品放回那個分子下面。",
  },
  {
    value: "price",
    title: "比每毫升，不比瓶身標價",
    body: "30 ml 賣 1,500 與 20 ml 賣 1,200 不是同一件事。乳霜若以克計，單價只作密度對照。低於對照品單價的八成，才標成明顯更便宜，避免 5% 的價差被說成平替。",
  },
  {
    value: "gap",
    title: "替代一定要寫少了什麼",
    body: "同一組維生素 C、E、阿魏酸，可以說成分接近。只有原型 C、沒有那組比例，就只能說部分重疊。韓系日常防曬和美國妝前防曬常常只是工作類似，過濾劑世代不同。抗水也不會因為便宜就自動繼承。",
  },
  {
    value: "evidence",
    title: "證據分四等",
    body: "人體證據充足，指這個用途有清楚的人體資料，例如防曬過濾劑、視黃醇的光老化外觀、杜鵑花酸對痘痘。有人體資料，指有效但看濃度與劑型。證據有限，指不該用它定高價。用來讀標籤，指香料、防腐與酒精，它們不是功效。",
  },
  {
    value: "age",
    title: "年紀是生理，不是系列名",
    body: "不會因為滿二十五歲就該買抗老系列。青春期的優先是不要把屏障刷破。二十多歲的抗老幾乎等於防曬。色素與視黃醇的預算在三十歲以後更合理。愈乾，乳霜裡的脂質愈比新精華重要。",
  },
  {
    value: "sun",
    title: "防曬單獨比",
    body: "SPF 是足量下的 UVB。UVA 要看 PA、歐規圓環或美國的 Broad Spectrum，還要看過濾劑世代。可見光要看氧化鐵。植物萃取不參與這些數字。塗不够的高係數，低於塗得滿的普通係數。",
  },
];

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <PageIntro
        kicker="判讀法"
        title="網站如果不能指出差距，就只是另一本型錄。"
        lede="這是膚鑑的編輯規則。它對齊的是讀成分表的臨床習慣：先問這個瓶子在賣哪一個分子、證據到哪、你會不會因為刺激而停用、以及更便宜的選項少掉哪一塊。"
      />
      <Accordion multiple defaultValue={["split"]} className="mt-8">
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="font-serif text-xl">{item.title}</AccordionTrigger>
            <AccordionContent className="text-sm leading-7">{item.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="mt-8 text-sm leading-7 text-muted-foreground">
        本站不收生長因子、幹細胞與未公開濃度的「獨家複合物」當主力，因為那些名字目前撐不起和視黃醇、防曬同一級的承諾。藥品資訊只用來對照，不構成用藥建議。
      </p>
    </div>
  );
}
