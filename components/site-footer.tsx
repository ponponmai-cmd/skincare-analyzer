import Link from "next/link";
import { DATA_AS_OF } from "@/lib/labels";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-xl">膚鑑不是診療</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            成分、價格與替代關係整理於 {DATA_AS_OF}，依品牌公開資料與台灣常見通路的參考價格。配方會改版，價格不是即時報價。這裡不診斷、不開藥，也不能取代皮膚科醫師。孕期、用藥中、或皮膚正在生病，先問你的醫師。
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/method" className="hover:text-cinnabar">
            分數怎麼來的
          </Link>
          <Link href="/dupes" className="hover:text-cinnabar">
            找平價替代
          </Link>
          <Link href="/sunscreen" className="hover:text-cinnabar">
            防曬怎麼選
          </Link>
        </div>
      </div>
    </footer>
  );
}
