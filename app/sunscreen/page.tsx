import type { Metadata } from "next";
import { PageIntro } from "@/components/marks";
import { SunscreenLab } from "@/components/sunscreen-lab";

export const metadata: Metadata = {
  title: "防曬比較",
  description: "依油肌、乾肌、敏感、戶外與色斑比較防曬，而不是只看 SPF 數字。",
};

export default function SunscreenPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <PageIntro
        kicker="防曬"
        title="防曬的成分是過濾劑。"
        lede="米糠、積雪草、玻尿酸可以讓你願意每天擦，但它們不決定 SPF。選的時候看場合：通勤、流汗、敏感、有沒有色斑。顏面要塗够，大約兩指長；戶外每兩小時補一次。標示的係數是在足量下測出來的。"
      />
      <div className="mt-8">
        <SunscreenLab />
      </div>
    </div>
  );
}
