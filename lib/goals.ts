import type { Concern, RoleId } from "./types";

export interface Goal {
  id: string;
  title: string;
  concern: Concern;
  keywords: string[];
  advice: string;
  seeDoctor: string;
  scope?: "face" | "body";
  lead?: string[];
  short: string;
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
    short: "美白淡斑",
    title: "美白、淡斑、痘疤黑印",
    concern: "pigment",
    keywords: ["美白", "淡斑", "斑點", "亮白", "提亮", "暗沉", "黑斑", "曬斑", "肝斑", "痘疤", "痘印", "黑印", "膚色不均", "勻亮", "透亮"],
    advice:
      "淡斑的第一名永遠是每天足量防曬；沒有防曬，任何精華都只是在跟太陽拔河。精華裡證據最好的是菸鹼醯胺、傳明酸、杜鵑花酸、維生素 C 與視黃醇。至少用八到十二週再判斷。",
    seeDoctor: "斑在幾個月內變大、顏色不均、邊緣不規則，或兩頰對稱的肝斑一直退不掉，先給皮膚科看。",
  },
  {
    id: "acne",
    short: "痘痘粉刺",
    title: "痘痘、粉刺、黑頭",
    concern: "acne",
    keywords: ["痘", "痘痘", "青春痘", "粉刺", "閉鎖粉刺", "黑頭", "白頭", "抗痘", "爆痘", "痘肌", "毛孔阻塞"],
    advice:
      "粉刺與黑頭先看水楊酸、杜鵑花酸與 A 酸類；紅腫發炎的痘看過氧化苯。茶樹、魚腥草、蜂膠是輔助，不是主力。不要同時開三瓶酸。",
    seeDoctor: "有紅腫大顆、會痛的囊腫，或痘疤開始凹陷，請直接看皮膚科；口服或處方藥能少留很多疤。",
  },
  {
    id: "wrinkles",
    short: "抗皺細紋",
    title: "抗皺、細紋、抗老",
    concern: "aging",
    keywords: ["抗老", "細紋", "皺紋", "抗皺", "法令紋", "老化", "凍齡", "魚尾紋", "抬頭紋", "表情紋"],
    advice:
      "有長期證據的順序是：防曬、視黃醇（A 醇、A 醛、阿達帕林）、維生素 C。胜肽、PDRN、酵母可以加，但不能取代前三名。細紋三到六個月才看得出差別。",
    seeDoctor: "深的皺紋、表情紋，保養品的效果有天花板；肉毒或填充要找合格醫師評估。",
  },
  {
    id: "firming",
    short: "緊實拉提",
    title: "緊實、拉提、鬆弛",
    concern: "aging",
    lead: ["retinol", "retinal", "peptides", "ascorbic-acid", "adenosine", "hpr"],
    keywords: ["緊實", "緊緻", "拉提", "提拉", "鬆弛", "下垂", "彈力", "輪廓", "垮", "v臉"],
    advice:
      "先說實話：擦的產品沒辦法把下垂的組織拉回去。保養品能做的，是讓膠原流失慢一點、皮膚表面更緊密：每天防曬、晚上 A 醇或 A 醛、早上維生素 C，胜肽與腺苷當溫和輔助。「拉提」宣稱多半是成膜劑造成的暫時緊繃感。",
    seeDoctor: "明顯鬆弛、下垂、雙下巴，需要的是電波、超音波、埋線或手術這類療程，請找合格醫師評估，不要在保養品上花冤枉錢。",
  },
  {
    id: "hydration",
    short: "保濕",
    title: "保濕、缺水、乾燥",
    concern: "hydration",
    keywords: ["保濕", "缺水", "很乾", "乾燥", "乾肌", "脫皮", "補水", "水潤", "緊繃"],
    advice:
      "補水（玻尿酸、甘油、酵母濾液）要接鎖水（神經醯胺乳霜、凡士林、角鯊烷）。只擦補水精華，冬天常常更乾。",
    seeDoctor: "乾到紅癢、脫屑成片、反覆發作，可能是濕疹或異位性皮膚炎，需要醫師用藥。",
  },
  {
    id: "barrier",
    short: "修護敏感",
    title: "修護、敏感、屏障受損",
    concern: "barrier",
    keywords: ["修護", "敏感", "屏障", "刺痛", "過敏", "受損", "換季", "敏弱", "爛臉"],
    advice:
      "停掉酸類、A 醇與香料，剩下溫和洗面、神經醯胺乳霜與防曬，至少兩週。泛醇、積雪草、尿囊素是好配角。",
    seeDoctor: "停掉刺激產品兩週還是紅、癢、腫，可能是接觸性皮膚炎或酒糟，要找醫師。",
  },
  {
    id: "redness",
    short: "泛紅",
    title: "泛紅、鎮靜",
    concern: "redness",
    keywords: ["泛紅", "臉紅", "紅腫", "鎮靜", "舒緩", "退紅", "曬後", "酒糟", "發炎"],
    advice:
      "先減法：無香、無酒精、少刷酸。菸鹼醯胺、杜鵑花酸、積雪草、魚腥草都常用。每天防曬也能減少泛紅。",
    seeDoctor: "臉中央持續泛紅、潮紅、長小紅疹，可能是酒糟，有處方藥可以控制。",
  },
  {
    id: "oil",
    short: "控油毛孔",
    title: "控油、毛孔",
    concern: "oil",
    keywords: ["控油", "出油", "很油", "毛孔", "粗大", "油光", "油肌", "毛孔粗大"],
    advice:
      "菸鹼醯胺能讓出油少一點；水楊酸清毛孔裡的油栓；A 醇長期能讓毛孔看起來細一點。過度清潔反而更油。",
    seeDoctor: "出油合併大量痘痘，或突然變得非常油，可能和荷爾蒙有關，可以請醫師評估。",
  },
  {
    id: "sun",
    short: "防曬",
    title: "防曬",
    concern: "sun",
    keywords: ["防曬", "防晒", "曬黑", "防紫外線", "uv", "spf"],
    advice:
      "選你願意每天擦足量的那一瓶。臉約兩指長，戶外兩小時補擦。有斑選含氧化鐵的有色防曬。",
    seeDoctor: "曬後起水泡、或對防曬反覆過敏，請醫師協助找過敏原。",
  },
  {
    id: "body-smooth",
    short: "身體光滑",
    title: "身體光滑：粗糙、雞皮膚、手肘膝蓋",
    concern: "hydration",
    scope: "body",
    lead: ["urea", "salicylic-acid", "glycolic-acid", "lactic-acid"],
    keywords: ["身體光滑", "光滑", "雞皮", "雞皮膚", "毛孔角化", "身體粗糙", "粗糙", "手肘", "膝蓋", "疙瘩"],
    advice:
      "讓身體變光滑，靠的是「軟化角質 + 保濕」：10% 尿素、果酸（甘醇酸、乳酸）或水楊酸身體霜。洗澡後皮膚還微濕時擦，每天持續四週以上；不要用顆粒磨砂膏用力搓，越搓越粗。",
    seeDoctor: "雞皮膚變紅、發癢、化膿，或大片乾癢脫屑，可能是毛囊炎或濕疹，請給醫師看。",
  },
  {
    id: "body-firm",
    short: "身體緊緻",
    title: "身體緊緻：鬆弛、紋路、橘皮",
    concern: "aging",
    scope: "body",
    lead: ["retinol", "ubiquinone", "glycolic-acid", "ceramide"],
    keywords: ["身體緊緻", "身體緊實", "橘皮", "妊娠紋", "肥胖紋", "身體鬆弛", "手臂鬆", "蝴蝶袖", "肚皮"],
    advice:
      "身體乳能讓皮膚看起來比較平滑、有光澤，但不能燃脂、也不能讓鬆弛的皮膚明顯變緊。證據比較好的是 A 醇身體乳（改善曬傷老化的紋理）與果酸。真正有感的是肌力訓練、體重穩定與身體也擦防曬。妊娠紋在孕期不能用 A 醇。",
    seeDoctor: "妊娠紋早期（紅紫色）或明顯鬆弛，醫美的雷射、電波效果比保養品明確，請找合格醫師。",
  },
  {
    id: "body-moist",
    short: "身體保濕",
    title: "身體保濕：乾、癢、脫屑",
    concern: "hydration",
    scope: "body",
    lead: ["urea", "ceramide", "glycerin", "petrolatum"],
    keywords: ["身體乳", "身體乳液", "身體保濕", "身體乾", "身體癢", "小腿乾", "冬季癢", "乾癢"],
    advice:
      "洗澡水不要太熱、時間不要太長，擦乾後三分鐘內擦身體乳。很乾很癢選尿素或神經醯胺；只是一般保濕，高甘油的平價身體乳就夠。敏感、異位體質選無香。",
    seeDoctor: "癢到睡不著、抓破流湯、或全身起疹，需要醫師用藥。",
  },
  {
    id: "body-bright",
    short: "身體亮白",
    title: "身體亮白：暗沉、膝蓋手肘黑",
    concern: "pigment",
    scope: "body",
    lead: ["niacinamide", "glycolic-acid", "lactic-acid", "urea"],
    keywords: ["身體美白", "身體亮白", "身體暗沉", "腋下黑", "膝蓋黑", "手肘黑", "屁股黑", "身體曬黑"],
    advice:
      "身體暗沉多半是日曬和摩擦。菸鹼醯胺身體乳與果酸身體乳有幫助，但露出的手臂、小腿每天擦防曬才留得住。腋下、膝蓋的黑多半來自摩擦與粗糙，先軟化角質。",
    seeDoctor: "頸後、腋下突然變黑變厚像絲絨，可能和血糖、荷爾蒙有關，請就醫檢查。",
  },
];

function compact(value: string) {
  return value.toLowerCase().replace(/[\s,.，。、]/g, "");
}

export function matchGoal(query: string): Goal | undefined {
  const value = compact(query);
  if (!value) return undefined;
  const wantsBody = /身體|body|身體乳/.test(value);
  let best: { goal: Goal; length: number } | undefined;
  for (const goal of goals) {
    for (const keyword of goal.keywords) {
      const key = compact(keyword);
      const bonus = wantsBody && goal.scope === "body" ? 10 : 0;
      if (value.includes(key) && (!best || key.length + bonus > best.length)) {
        best = { goal, length: key.length + bonus };
      }
    }
  }
  return best?.goal;
}

export function goalById(id: string) {
  return goals.find((goal) => goal.id === id);
}

