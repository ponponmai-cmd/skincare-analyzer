import type { Concern, RoleId } from "./types";

export interface Goal {
  id: string;
  title: string;
  concern: Concern;
  keywords: string[];
  advice: string;
  seeDoctor: string;
}

export const goalLead: Record<Concern, string[]> = {
  pigment: ["niacinamide", "tranexamic-acid", "azelaic-acid", "ascorbic-acid", "retinol", "alpha-arbutin"],
  acne: ["salicylic-acid", "benzoyl-peroxide", "adapalene", "azelaic-acid", "niacinamide"],
  hydration: ["hyaluronic-acid", "glycerin", "ceramide", "petrolatum", "squalane"],
  barrier: ["ceramide", "cholesterol", "fatty-acids", "panthenol", "petrolatum"],
  aging: ["retinol", "retinal", "adapalene", "ascorbic-acid", "peptides"],
  redness: ["azelaic-acid", "niacinamide", "centella", "panthenol"],
  oil: ["niacinamide", "salicylic-acid", "retinol"],
  sun: ["zinc-oxide", "uvinul-a-plus", "tinosorb-s", "iron-oxides", "titanium-dioxide"],
};

export const goalRoles: Record<Concern, RoleId[]> = {
  pigment: ["pigment", "vitamin-c"],
  acne: ["acne", "retinoid"],
  hydration: ["hydration"],
  barrier: ["barrier"],
  aging: ["retinoid", "peptide", "vitamin-c"],
  redness: ["barrier"],
  oil: ["acne"],
  sun: ["sun-daily", "sun-outdoor", "sun-mineral", "sun-sensitive"],
};

export const goals: Goal[] = [
  {
    id: "brightening",
    title: "美白、淡斑、痘疤黑印",
    concern: "pigment",
    keywords: ["美白", "淡斑", "斑點", "亮白", "提亮", "暗沉", "黑斑", "曬斑", "肝斑", "痘疤", "痘印", "黑印", "膚色不均", "勻亮", "透亮"],
    advice:
      "淡斑的第一名永遠是每天足量防曬；沒有防曬，任何精華都只是在跟太陽拔河。精華裡證據最好的是菸鹼醯胺、傳明酸、杜鵑花酸、維生素 C 與視黃醇。至少用八到十二週再判斷。",
    seeDoctor: "斑在幾個月內變大、顏色不均、邊緣不規則，或兩頰對稱的肝斑一直退不掉，先給皮膚科看。",
  },
  {
    id: "acne",
    title: "痘痘、粉刺、黑頭",
    concern: "acne",
    keywords: ["痘", "痘痘", "青春痘", "粉刺", "閉鎖粉刺", "黑頭", "白頭", "抗痘", "爆痘", "痘肌", "毛孔阻塞"],
    advice:
      "粉刺與黑頭先看水楊酸、杜鵑花酸與 A 酸類；紅腫發炎的痘看過氧化苯。茶樹、魚腥草、蜂膠是輔助，不是主力。不要同時開三瓶酸。",
    seeDoctor: "有紅腫大顆、會痛的囊腫，或痘疤開始凹陷，請直接看皮膚科；口服或處方藥能少留很多疤。",
  },
  {
    id: "hydration",
    title: "保濕、缺水、乾燥",
    concern: "hydration",
    keywords: ["保濕", "缺水", "很乾", "乾燥", "乾肌", "脫皮", "補水", "水潤", "緊繃", "乾癢"],
    advice:
      "補水（玻尿酸、甘油、酵母濾液）要接鎖水（神經醯胺乳霜、凡士林、角鯊烷）。只擦補水精華，冬天常常更乾。",
    seeDoctor: "乾到紅癢、脫屑成片、反覆發作，可能是濕疹或異位性皮膚炎，需要醫師用藥。",
  },
  {
    id: "barrier",
    title: "修護、敏感、屏障受損",
    concern: "barrier",
    keywords: ["修護", "敏感", "屏障", "刺痛", "過敏", "受損", "換季", "敏弱", "爛臉"],
    advice:
      "停掉酸類、A 醇與香料，剩下溫和洗面、神經醯胺乳霜與防曬，至少兩週。泛醇、積雪草、尿囊素是好配角。",
    seeDoctor: "停掉刺激產品兩週還是紅、癢、腫，可能是接觸性皮膚炎或酒糟，要找醫師。",
  },
  {
    id: "aging",
    title: "抗老、細紋、緊緻",
    concern: "aging",
    keywords: ["抗老", "細紋", "皺紋", "緊緻", "鬆弛", "抗皺", "法令紋", "老化", "彈力", "凍齡"],
    advice:
      "有長期證據的順序是：防曬、視黃醇（A 醇、A 醛、阿達帕林）、維生素 C。胜肽、PDRN、酵母可以加，但不能取代前三名。",
    seeDoctor: "想處理深的皺紋或鬆弛，保養品的效果有天花板，醫美療程要找合格醫師評估。",
  },
  {
    id: "redness",
    title: "泛紅、鎮靜",
    concern: "redness",
    keywords: ["泛紅", "臉紅", "紅腫", "鎮靜", "舒緩", "退紅", "曬後", "酒糟", "發炎"],
    advice:
      "先減法：無香、無酒精、少刷酸。菸鹼醯胺、杜鵑花酸、積雪草、魚腥草都常用。每天防曬也能減少泛紅。",
    seeDoctor: "臉中央持續泛紅、潮紅、長小紅疹，可能是酒糟，有處方藥可以控制。",
  },
  {
    id: "oil",
    title: "控油、毛孔",
    concern: "oil",
    keywords: ["控油", "出油", "很油", "毛孔", "粗大", "油光", "油肌", "毛孔粗大"],
    advice:
      "菸鹼醯胺能讓出油少一點；水楊酸清毛孔裡的油栓；A 醇長期能讓毛孔看起來細一點。過度清潔反而更油。",
    seeDoctor: "出油合併大量痘痘，或突然變得非常油，可能和荷爾蒙有關，可以請醫師評估。",
  },
  {
    id: "sun",
    title: "防曬",
    concern: "sun",
    keywords: ["防曬", "防晒", "曬黑", "防紫外線", "uv", "spf"],
    advice:
      "選你願意每天擦足量的那一瓶。臉約兩指長，戶外兩小時補擦。有斑選含氧化鐵的有色防曬。",
    seeDoctor: "曬後起水泡、或對防曬反覆過敏，請醫師協助找過敏原。",
  },
];

function compact(value: string) {
  return value.toLowerCase().replace(/[\s,.，。、]/g, "");
}

export function matchGoal(query: string): Goal | undefined {
  const value = compact(query);
  if (!value) return undefined;
  let best: { goal: Goal; length: number } | undefined;
  for (const goal of goals) {
    for (const keyword of goal.keywords) {
      const key = compact(keyword);
      if (value.includes(key) && (!best || key.length > best.length)) {
        best = { goal, length: key.length };
      }
    }
  }
  return best?.goal;
}
