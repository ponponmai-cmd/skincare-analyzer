import type { Product } from "./types";

const noStudy = "沒有找到這瓶產品本身發表在醫學期刊的人體試驗；品牌公布的數據多為自家委託測試。";

export const productEvidence: Record<string, Pick<Product, "efficacy" | "claims" | "productStudy" | "asiaFit">> = {
  "skinceuticals-ce-ferulic": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：強效抗氧化，和防曬一起用能加強對抗日曬傷害",
        verdict: "supported",
        why: "15% 左旋 C＋1% 維生素 E＋0.5% 阿魏酸這組比例，有人體皮膚照光研究顯示光保護力約加倍；但作者 Pinnell 是這個配方的發明人，而且它是加強防曬、不是取代防曬。",
        refs: ["lin2005", "pinnell2001"],
      },
      {
        claim: "品牌宣稱：改善細紋、提升緊緻",
        verdict: "partial",
        why: "外用左旋 C 改善光老化有資料，但多是小型研究；這瓶本身的抗皺數據來自品牌，效果比 A 醇慢也小。",
        refs: ["telang2013", "alniaimi2017"],
      },
      {
        claim: "品牌宣稱：提亮膚色、淡化暗沉",
        verdict: "partial",
        why: "左旋 C 能抑制黑色素生成，方向正確；但淡斑幅度的研究不如菸鹼醯胺、杜鵑花酸多，肝斑仍要靠防曬與淡斑藥。",
        refs: ["telang2013"],
      },
    ],
    productStudy:
      "有。Lin 等人 2005 年的研究測的就是這個 15% 左旋 C＋1% 維生素 E＋0.5% 阿魏酸配方：加入阿魏酸後更穩定，皮膚對日光的保護力從約 4 倍提高到約 8 倍。這是小型照光試驗，看的是曬傷與 DNA 傷害指標，不是長期抗老或淡斑試驗；作者 Pinnell 是配方發明人。",
    asiaFit:
      "水狀質地，台灣夏天不悶；白天疊在防曬下，對容易曬黑、留痘疤黑印的膚質有加分。但 pH 很低，屏障受損或泛紅的人容易刺；開封後放陰涼處，變深色就別用。",
  },
  "timeless-cef": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：20% 維生素 C 加維生素 E 與阿魏酸，抗氧化、提亮、改善細紋",
        verdict: "partial",
        why: "成分骨架與修麗可 CE 相同，成分表標 20% 左旋 C、1% 阿魏酸，左旋 C 在 20% 時皮膚吸收最好；但這瓶本身沒有臨床試驗，修麗可那篇研究不能直接套用，穩定度也看批次。",
        refs: ["pinnell2001", "lin2005"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "清爽水狀，濕熱天也用得下去；但 20% 比 15% 更刺，亞洲人角質較薄，易泛紅的人先隔天用。台灣高溫會加速氧化，冷藏、變色就丟。",
  },
  "paulas-c15": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：15% 維生素 C 讓膚色更亮、更均勻",
        verdict: "partial",
        why: "15% 左旋 C 在研究的有效範圍，方向正確；但淡斑幅度的證據有限，品牌沒有公開 pH，這瓶本身也沒有發表的試驗。",
        refs: ["pinnell2001", "telang2013"],
      },
      {
        claim: "品牌宣稱：加了阿魏酸與維生素 E，抗氧化更強、更穩定",
        verdict: "partial",
        why: "阿魏酸加維生素 E 幫左旋 C 穩定、加強光保護的研究，用的是 15% C＋1% E＋0.5% 阿魏酸；這瓶的維生素 E 排在成分表很後面，比例不同，不能說是同等效果。",
        refs: ["lin2005"],
      },
      {
        claim: "品牌宣稱：改善細紋",
        verdict: "partial",
        why: "左旋 C 抗老有小型研究支持；配方裡的胜肽量少、證據也弱，效果主要仍靠左旋 C 本身與每天防曬。",
        refs: ["alniaimi2017", "gorouhi2009"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "輕薄好疊防曬，適合台灣夏天白天用；15% 對多數人比 20% 好留住，但敏感、泛紅肌仍會刺。20 ml 小瓶在濕熱環境下比較不會放到氧化。",
  },
  "melano-cc": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：抑制黑色素生成，預防斑點與雀斑（日本醫藥部外品）",
        verdict: "partial",
        why: "主成分是原型維生素 C，另有幾種維生素 C 衍生物；左旋 C 淡斑方向有研究，但這瓶沒有公開濃度與 pH，衍生物進入皮膚的證據也弱。",
        refs: ["telang2013", "pinnell2001"],
      },
      {
        claim: "品牌宣稱：預防痘痘與痘疤",
        verdict: "weak",
        why: "配方有殺菌成分異丙基甲基苯酚與維生素 B6，但對痘痘幾乎沒有人體研究；痘疤黑印要淡，防曬與杜鵑花酸、菸鹼醯胺的證據較好。",
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "清爽精華，日本藥妝本來就針對亞洲人在意的斑點與痘疤黑印；成分表有乙醇與香料，屏障差的人可能刺。可以點擦黑印或全臉薄擦，白天一定防曬。",
  },
  "the-ordinary-niacinamide": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：減少瑕疵、控油、改善毛孔外觀",
        verdict: "partial",
        why: "菸鹼醯胺能降低皮脂分泌、抗發炎，有人體研究；但主要研究用 2–5%（多由 P&G 進行），10% 不代表效果加倍，鋅的外用證據也有限。",
        refs: ["draelos2006", "shalita1995"],
      },
      {
        claim: "品牌宣稱：改善暗沉、讓膚色更均勻",
        verdict: "supported",
        why: "5% 菸鹼醯胺淡斑、改善蠟黃有隨機半臉試驗（P&G 研究），這瓶 10% 已超過有效濃度。",
        refs: ["hakozaki2002", "bissett2005"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "對 T 字出油、痘疤黑印多的台灣膚質很對題；但 10% 有些人會泛紅刺癢，濕熱天疊防曬容易搓屑，先薄擦、等乾再上防曬。",
  },
  "paulas-niacinamide": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：縮小毛孔外觀、控油",
        verdict: "partial",
        why: "2% 菸鹼醯胺降低皮脂的研究在日本受試者身上做（P&G 研究人員參與）；毛孔「變小」多半是出油變少、看起來較細，毛孔結構本身不會改變。",
        refs: ["draelos2006"],
      },
      {
        claim: "品牌宣稱：淡化暗沉，讓膚色更均勻",
        verdict: "supported",
        why: "5% 菸鹼醯胺淡斑有隨機半臉試驗（P&G 研究），這瓶 10% 已超過有效濃度；另有乙醯葡萄糖胺、甘草等配角。",
        refs: ["hakozaki2002", "bissett2005"],
      },
      {
        claim: "品牌宣稱：改善細紋、強化屏障",
        verdict: "partial",
        why: "5% 菸鹼醯胺 12 週改善細紋與彈性有研究（P&G），但幅度小於 A 醇；屏障改善的資料多是小型研究。",
        refs: ["bissett2005"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "質地比 The Ordinary 順，疊防曬不太搓屑，適合台灣油性、混合肌白天用；10% 仍可能讓敏感肌泛紅，第一週隔天擦。",
  },
  "skinceuticals-discoloration": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：淡化頑固色斑與痘疤黑印",
        verdict: "partial",
        why: "5% 菸鹼醯胺淡斑有隨機試驗（P&G 研究），3% 傳明酸外用只有小型研究、系統回顧認為還沒被證實；另外 INCIDecoder 版成分表沒有列出品牌宣傳的麴酸，以瓶身為準。",
        refs: ["hakozaki2002", "kim2016", "taraz2017"],
      },
      {
        claim: "品牌宣稱：改善肝斑",
        verdict: "partial",
        why: "外用傳明酸對肝斑的資料主要是 23 人、沒有安慰劑對照的研究（資生堂研究人員參與）；肝斑的基礎是每天防曬（最好含氧化鐵）加淡斑藥。",
        refs: ["kim2016", "ogbechie2017", "castanedo2014"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "乳液狀不黏，台灣夏天可以早晚用；針對亞洲人最在意的斑點與痘疤黑印，刺激也比酸類低。但沒有每天足量防曬（肝斑最好用有色防曬），效果很快被曬回去。",
  },
  "naturium-txa": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：5% 傳明酸淡化色斑、均勻膚色",
        verdict: "partial",
        why: "傳明酸外用有小型研究（多用 2–3%），系統回顧認為還沒被充分證實；配方另有麴酸與菸鹼醯胺，但濃度未公開。",
        refs: ["kim2016", "taraz2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "水性精華很清爽，適合台灣濕熱天；對痘疤黑印、曬斑是合理的平價選擇，麴酸偶爾會刺或過敏。肝斑要搭配含氧化鐵的防曬。",
  },
  "the-ordinary-azelaic": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：讓膚色更均勻、減少瑕疵",
        verdict: "partial",
        why: "杜鵑花酸對痘痘、色素、酒糟都有證據，但研究多用 15–20% 的藥品濃度；10% 方向對、力道較弱。",
        refs: ["schulte2015", "verallo1989", "zaenglein2016"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "對亞洲人常見的痘疤黑印、肝斑很對題，刺激也比酸類、A 醇低；但矽油懸浮質地厚、易搓屑，濕熱天疊防曬會悶，建議晚上用。初期刺癢通常幾週內緩解。",
  },
  "paulas-azelaic": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：改善泛紅、讓膚色均勻",
        verdict: "partial",
        why: "杜鵑花酸對酒糟的丘疹膿皰有高確定性證據，但對持續泛紅幫助有限；研究多用 15–20%，這瓶是 10%。",
        refs: ["vanzuuren2019", "schulte2015"],
      },
      {
        claim: "品牌宣稱：減少痘痘與瑕疵",
        verdict: "partial",
        why: "美國痤瘡指引把杜鵑花酸列為外用選項（藥品是 20%）；這瓶 10%，另加少量水楊酸，濃度未公開。",
        refs: ["zaenglein2016"],
      },
      {
        claim: "品牌宣稱：淡化色斑",
        verdict: "partial",
        why: "20% 杜鵑花酸對東南亞與拉丁裔肝斑患者的效果優於 2% 對苯二酚；10% 力道較弱，需要更久，也要嚴格防曬。",
        refs: ["verallo1989"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "乳液質地比懸浮液好推，台灣夏天白天也能薄擦；對痘疤黑印、泛紅是好選擇。含少量水楊酸，孕期使用前先問醫師。",
  },
  "cerave-retinol": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：淡化痘疤痕跡、讓毛孔看起來更細",
        verdict: "partial",
        why: "視黃醇改善膚質與光老化有隨機試驗，但研究用 0.4% 左右；這瓶濃度未公開，排在成分表中後段，效果應較溫和。凹洞痘疤擦保養品沒有用。",
        refs: ["kafi2007", "kang1995"],
      },
      {
        claim: "品牌宣稱：含 3 種神經醯胺，溫和不刺激",
        verdict: "partial",
        why: "神經醯胺有助屏障，配方也有菸鹼醯胺緩衝，方向合理（相關回顧由高德美研究人員撰寫）；但溫和多半也因為視黃醇濃度不高。",
        refs: ["meckfessel2014"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "輕乳質地，濕熱天晚上用不悶；刺激低，適合亞洲人當第一瓶 A 醇，比較不會因為脫皮發炎而留黑印。",
  },
  "the-ordinary-retinol": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：改善細紋、光老化與膚質",
        verdict: "supported",
        why: "0.4% 視黃醇 24 週改善細紋、增加膠原有隨機試驗，濃度和這瓶 0.5% 相近；這瓶本身沒有試驗，油狀基底的穩定度也沒公開。",
        refs: ["kafi2007", "kang1995"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "純油狀，台灣夏天油肌擦起來容易悶、長粉刺，乾肌或冷氣房反而舒服；0.5% 對亞洲薄角質新手偏強，從每週兩晚開始，避免脫皮發炎後反黑。",
  },
  "lrp-retinol-b3": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：減少細紋、撫平膚質",
        verdict: "partial",
        why: "純視黃醇加少量 A 醇棕櫚酸酯，方向有隨機試驗支持；但品牌沒有公開視黃醇濃度，不能和 0.3–0.5% 的研究直接比。",
        refs: ["kafi2007", "kang1995"],
      },
      {
        claim: "品牌宣稱：菸鹼醯胺讓 A 醇更溫和，適合敏感肌",
        verdict: "partial",
        why: "菸鹼醯胺有改善屏障與泛紅的資料（P&G 研究），方向合理；但配方的變性酒精排第 4 位、又有香料，對敏感肌未必溫和。",
        refs: ["bissett2005"],
      },
      {
        claim: "品牌宣稱：含腺苷，抗皺",
        verdict: "partial",
        why: "含腺苷產品改善魚尾紋的研究由萊雅（理膚寶水母公司）進行，這瓶的腺苷濃度也沒公開。",
        refs: ["abella2006"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "輕乳質地，台灣夏天也不悶；但變性酒精排在前段、還有香料，屏障受損或易泛紅的亞洲膚質先局部試擦。",
  },
  "paulas-retinol-1": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：1% 視黃醇，強效改善皺紋與鬆弛",
        verdict: "partial",
        why: "視黃醇改善細紋有隨機試驗（0.4%），1% 在有效範圍以上；但「鬆弛」是組織下垂，擦的產品改善有限，高濃度也代表更多脫皮。",
        refs: ["kafi2007", "kong2016"],
      },
      {
        claim: "品牌宣稱：改善膚質粗糙與色素不均",
        verdict: "supported",
        why: "視黃醇會引起和 A 酸方向相同的表皮變化，能讓膚質變平滑、斑點變淡，只是比 A 酸慢、幅度較小。",
        refs: ["kang1995", "kong2016"],
      },
      {
        claim: "品牌宣稱：加了胜肽、甘草等舒緩成分，降低刺激",
        verdict: "weak",
        why: "胜肽與植物萃取在這裡量少，降低刺激的人體證據有限；1% 視黃醇的刺激主要還是要靠降低使用頻率來控制。",
        refs: ["gorouhi2009"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "乳霜狀精華在濕熱天晚上仍可接受；但 1% 對亞洲薄角質、易反黑膚質是高強度，脫皮發炎容易留下暗沉，先用穩 0.3–0.5% 再升級。",
  },
  "the-ordinary-granactive": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：比視黃醇更溫和的新一代 A 類，抗老",
        verdict: "weak",
        why: "HPR（羥基頻哪酮視黃酸酯）的人體研究很少，多為原料商資料；成分表另有少量視黃醇。溫和是真的，但效果不能換算成同濃度的視黃醇。",
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "乳液質地清爽，台灣夏天也好用；刺激低，適合怕 A 醇脫皮、易泛紅反黑的人當入門，但期待值要放低。",
  },
  "the-ordinary-peptides": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：多種胜肽改善細紋、讓肌膚緊緻",
        verdict: "weak",
        why: "胜肽的人體研究多半規模小、由廠商執行；乙醯基六胜肽（Argireline）的人體部分人數很少、沒有詳細對照。",
        refs: ["gorouhi2009", "blanes2002", "robinson2005"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "水性略黏，濕熱天可接受；刺激極低，敏感肌或孕期可以當配角，但不要把它當抗老主力。",
  },
  protini: {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：多種訊號胜肽與生長因子，提升緊緻與彈性",
        verdict: "weak",
        why: "胜肽研究多為小型、廠商執行；配方裡 sh-寡肽、多肽這類類生長因子分子很大，難穿過健康皮膚，外用生長因子也缺乏雙盲研究。",
        refs: ["gorouhi2009", "bos2000", "mehta2007"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "乳霜偏潤，台灣夏天油肌可能太厚，冷氣房或冬天比較適合；刺激低，但抗老效果有限、每毫升又貴。",
  },
  "cerave-cream": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：3 種神經醯胺，修護肌膚屏障",
        verdict: "supported",
        why: "神經醯胺、膽固醇、脂肪酸是角質層屏障的主要脂質，外用能幫助修護（回顧作者來自高德美）；配方齊全，另有白軟石蠟幫忙封閉。",
        refs: ["meckfessel2014", "ghadially1992"],
      },
      {
        claim: "品牌宣稱：長效保濕",
        verdict: "supported",
        why: "甘油加白軟石蠟是便宜又有效的保濕組合；凡士林能滲入角質層縫隙，幫助受損屏障恢復。",
        refs: ["ghadially1992"],
      },
      {
        claim: "品牌宣稱：適合濕疹、異位性皮膚炎的乾燥肌",
        verdict: "partial",
        why: "神經醯胺為主的修護霜能改善異位性皮膚炎兒童的症狀，但那篇研究用的不是這罐；Cochrane 回顧也認為沒有證據顯示哪一款保濕劑特別好。",
        refs: ["chamlin2002", "vanzuuren2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "厚霜在台灣夏天白天容易悶，油肌可能長粉刺，比較適合晚上、冬天或冷氣房乾燥時；對刷酸、A 醇造成的乾燥脫皮是很好的修復底。",
  },
  "illiyoon-ato": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：神經醯胺修護乾燥、敏感肌屏障",
        verdict: "supported",
        why: "成分表標示類神經醯胺約 0.63%，再加膽固醇與脂肪酸，符合屏障脂質的思路；外用神經醯胺修護屏障有研究，但這罐本身沒有發表試驗。",
        refs: ["meckfessel2014", "chamlin2002"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "質地潤，台灣夏天白天油肌可能太多，晚上或冬天很合適；無香，適合異位、乾敏體質全家用。",
  },
  "lrp-double-repair": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：雙重修護肌膚屏障",
        verdict: "partial",
        why: "有神經醯胺 NP 與菸鹼醯胺，方向正確；但只有一種神經醯胺、沒有膽固醇，屏障脂質不如三元組完整。",
        refs: ["meckfessel2014", "bissett2005"],
      },
      {
        claim: "品牌宣稱：益生元溫泉水，舒緩敏感",
        verdict: "weak",
        why: "溫泉水與益生元的人體證據多為品牌自家研究；舒緩感主要來自無香、溫和的配方本身。",
      },
      {
        claim: "品牌宣稱：長效保濕",
        verdict: "supported",
        why: "甘油排第 2 位，加上油脂與神經醯胺，保濕本身有效；但 Cochrane 回顧沒有找到哪一款保濕劑特別好。",
        refs: ["vanzuuren2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "介於乳液和輕霜，台灣夏天白天也能疊防曬不悶；無香，適合敏感、易泛紅的亞洲膚質；乾燥冬夜可能不夠封閉。",
  },
  "vanicream-cream": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：不含常見刺激物，適合敏感肌",
        verdict: "supported",
        why: "成分只有 11 種，沒有香料、染料與羊毛脂；主角白軟石蠟能滲入角質層縫隙，幫助受損屏障恢復。",
        refs: ["ghadially1992", "vanzuuren2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "很厚，台灣濕熱夏天擦臉容易悶痘，比較適合冬天、冷氣房、身體或局部乾裂；對什麼都過敏的乾敏肌是安全牌。",
  },
  "lala-retro": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：多種植物油與神經醯胺，修護屏障、長效保濕",
        verdict: "partial",
        why: "神經醯胺、膽固醇、脂肪酸都有，但排在一串植物油之後、量不高；保濕效果主要來自甘油與油脂。",
        refs: ["meckfessel2014"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "打發霜看起來輕，但植物油多，台灣夏天油肌可能悶；比較適合乾肌在冷氣房或冬天用。",
  },
  "hada-labo-premium": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：多種玻尿酸深層保濕",
        verdict: "partial",
        why: "玻尿酸能吸水、讓角質層變軟，有人體研究；但「深層」只到角質層，水分要靠後面的乳霜鎖住。",
        refs: ["pavicic2011"],
      },
      {
        claim: "品牌宣稱：無香料、無色素、無酒精，溫和低刺激",
        verdict: "supported",
        why: "成分表確實沒有香料、色素與乙醇，以保濕劑為主，刺激風險低。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "濃稠化妝水，台灣夏天油肌可能覺得黏，擦一層就好；冷氣房乾燥或冬天很好用。",
  },
  differin: {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：治療痘痘、清除粉刺",
        verdict: "supported",
        why: "阿達帕林是外用 A 酸類藥品，能清粉刺、抗發炎，國際指引列為痘痘第一線治療。美國可在藥局直接買（OTC），台灣屬處方藥。",
        refs: ["thielitz2008", "zaenglein2016"],
      },
      {
        claim: "品牌宣稱：預防新的痘痘冒出來",
        verdict: "supported",
        why: "A 酸類能減少毛孔角化堵塞，也適合長期維持治療；通常要持續用兩三個月才看得出效果。",
        refs: ["thielitz2008"],
      },
      {
        claim: "品牌宣稱：改善膚質與膚色不均",
        verdict: "partial",
        why: "0.1% 與 0.3% 阿達帕林改善曬斑與光老化有試驗；但凹洞痘疤擦藥幫助有限，痘疤黑印也要配合防曬。",
        refs: ["kang2003"],
      },
    ],
    productStudy:
      "這是藥品，不是保養品：0.1% 阿達帕林凝膠是以藥品臨床試驗取得核准的痤瘡用藥，外用 A 酸類的療效有多個隨機對照試驗（Thielitz 2008 整理）；Kang 2003 也測試了 0.1%、0.3% 阿達帕林凝膠改善光老化。在美國是非處方藥（OTC），在台灣屬處方藥，要由醫師開立。",
    asiaFit:
      "凝膠清爽，台灣夏天也不悶；但初期乾燥、脫皮、泛紅很常見，亞洲膚色發炎後容易留黑印，要從隔晚薄擦開始、白天嚴格防曬。台灣需醫師處方，孕期避免。",
  },
  "uvmune-400": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ 高係數防曬，預防曬傷與光老化",
        verdict: "supported",
        why: "每天擦防曬能減緩皮膚老化，有 4.5 年的隨機試驗；前提是擦足量（全臉約兩指長）並按時補擦。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：Mexoryl 400 防護超長波 UVA",
        verdict: "partial",
        why: "Mexoryl 400 能吸收 380–400 nm 的超長波 UVA，實驗室數據清楚；但多擋這一段對淡斑、抗老有多少額外好處，還沒有長期人體試驗。",
      },
      {
        claim: "品牌宣稱：預防色斑形成",
        verdict: "partial",
        why: "擋紫外線能預防曬斑，但可見光也會讓亞洲人膚色變深；這瓶沒有氧化鐵，肝斑患者最好改用或加用有色防曬。",
        refs: ["castanedo2014", "mahmoud2010"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "極清爽、不泛白，適合台灣濕熱天、油肌與戶外活動；變性酒精排第 2 位又有香料，乾敏、屏障受損的人容易刺。",
  },
  "anessa-milk": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ PA++++，高效防曬、預防曬黑與光老化",
        verdict: "supported",
        why: "成分表有約 10.4% 氧化鋅加多種有機濾劑，防護力高；每天擦防曬減緩老化有長期隨機試驗。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：遇汗、遇水防護力更強，適合戶外",
        verdict: "partial",
        why: "成膜抗水配方確實適合流汗與戲水，但「遇水更強」的數據是品牌自家測試；抗水防曬擦汗、戲水後仍要補擦。",
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "為日本、台灣這種濕熱夏天與戶外流汗設計，耐汗度好；含酒精與香料，乾敏肌可能刺，卸妝要確實。輕微泛白對亞洲膚色通常不明顯。",
  },
  "biore-aqua-rich": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ PA++++，水感好推的日常防曬",
        verdict: "supported",
        why: "每天規律擦防曬能減緩光老化；這瓶清爽到讓人願意擦足量，這正是防曬有效的關鍵。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：添加玻尿酸、蜂王乳等保養成分",
        verdict: "weak",
        why: "這些成分排在成分表最後段、量很少，不影響防護力，也不是選它的理由。",
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "台灣油肌與通勤族的經典清爽款，夏天不黏不泛白；含酒精與香料，乾敏肌可能刺，也不抗水，戶外流汗要換抗水款。",
  },
  "boj-relief-sun": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ PA++++ 日常防護",
        verdict: "supported",
        why: "用的是光穩定的新一代有機濾劑，防護力好；每天擦防曬減緩老化有長期隨機試驗。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：米萃取與益生菌，防曬同時保養",
        verdict: "weak",
        why: "米萃取與各種發酵成分排在成分表後段、量少，保養效果沒有人體證據；選它的理由是濾劑與膚感，不是米。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "略潤的乳霜質地，冷氣房與混合偏乾肌很舒服；台灣夏天油肌中午可能泛油光。無香、不泛白，敏感肌接受度高。",
  },
  "round-lab-birch": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ PA++++ 日常防護",
        verdict: "supported",
        why: "使用光穩定的新一代有機濾劑；每天擦防曬減緩老化有長期隨機試驗。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：白樺樹汁保濕，擦了不乾",
        verdict: "partial",
        why: "保濕感主要來自甘油、玻尿酸等成分，白樺樹汁本身沒有人體證據；防護力來自濾劑。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "潤澤型，乾肌或冷氣房舒服，但台灣夏天油肌可能太亮；含少量松針與洋甘菊精油，對香料敏感的人留意。",
  },
  "isntree-watery-sun": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ PA++++ 日常防護",
        verdict: "supported",
        why: "濾劑組合包含光穩定的新式 UVA 濾劑；每天擦防曬減緩老化有長期隨機試驗。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：多種玻尿酸，保濕不黏膩",
        verdict: "partial",
        why: "玻尿酸保濕有研究，但在這瓶都排在後段、量少，主要是改善膚感，不增加防護力。",
        refs: ["pavicic2011"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "凝膠清爽、無香，很適合台灣濕熱天的油肌與混合肌；不抗水，戶外流汗要補擦或換抗水款。",
  },
  "skin1004-sun": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：SPF50+ PA++++ 日常防護",
        verdict: "supported",
        why: "使用光穩定的新一代有機濾劑；每天擦防曬減緩老化有長期隨機試驗。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：積雪草舒緩，敏感肌也能用",
        verdict: "partial",
        why: "積雪草有抗發炎、促修復的資料，但多為實驗室與小型研究；成分表標示約 0.98%，舒緩是加分，無香、無酒精才是敏感肌好用的主因。",
        refs: ["bylka2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "精華質地輕、不泛白，台灣夏天油肌、敏感肌都好用；不抗水、沒有氧化鐵，戶外和肝斑要另外加強。",
  },
  "eltamd-uv-clear": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：SPF 46 廣譜防曬",
        verdict: "supported",
        why: "9% 氧化鋅加 7.5% 甲氧基肉桂酸乙基己酯，日常防護足夠；每天擦防曬減緩老化有長期隨機試驗。",
        refs: ["hughes2013"],
      },
      {
        claim: "品牌宣稱：適合痘痘肌、玫瑰斑與敏感肌",
        verdict: "partial",
        why: "氧化鋅加菸鹼醯胺方向合理，菸鹼醯胺有抗發炎、抗痘的研究（4% 凝膠），但這瓶濃度未公開，本身也沒有發表試驗。",
        refs: ["shalita1995"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "輕薄、無香，台灣痘痘肌、泛紅肌好接受；不抗水、價格高，略泛白對亞洲膚色通常可以接受。",
  },
  "supergoop-unseen": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：SPF 40 廣譜防曬，每天擦預防光老化",
        verdict: "partial",
        why: "每天擦防曬減緩老化有長期試驗；但這瓶靠 3% 阿伏苯宗擋 UVA，長波 UVA 防護不如新一代濾劑，SPF 也低於日韓常見的 50+。",
        refs: ["hughes2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "矽感透明、不泛白，台灣夏天當妝前很舒服；但不抗水、UVA 濾劑較舊，戶外或有肝斑的人不是首選。",
  },
  "cerave-mineral": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：100% 礦物防曬，溫和適合敏感肌",
        verdict: "supported",
        why: "氧化鋅、二氧化鈦很少引起過敏，加上無香與神經醯胺，刺激風險低；本站沒有取得這瓶完整成分表，依品牌公開資料判斷。",
      },
      {
        claim: "品牌宣稱：有色配方，自然修飾膚色",
        verdict: "supported",
        why: "有色防曬的氧化鐵能擋部分可見光；研究顯示對肝斑，同時擋可見光比只擋紫外線淡斑效果更好。",
        refs: ["castanedo2014", "mahmoud2010"],
      },
      {
        claim: "品牌宣稱：SPF 50 廣譜防曬",
        verdict: "supported",
        why: "每天擦防曬減緩老化有長期試驗；礦物防曬較厚，要擦足量才有標示的防護。",
        refs: ["hughes2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "有色、偏厚，台灣夏天油肌可能悶，色號少、對黃皮膚未必合；但對肝斑、孕期色斑與敏感肌，有色礦物防曬很有價值。",
  },
  "lrp-mineral": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：100% 礦物濾劑，適合敏感肌",
        verdict: "supported",
        why: "礦物濾劑刺激性低、無香；INCIDecoder 版成分表沒有列出活性濾劑（美國版另列在 Drug Facts），百分比以瓶身為準。",
      },
      {
        claim: "品牌宣稱：有色配方，修飾膚色",
        verdict: "supported",
        why: "成分表有三種氧化鐵，能擋部分可見光；對肝斑，同時擋可見光比只擋紫外線淡斑效果更好。",
        refs: ["castanedo2014", "mahmoud2010"],
      },
      {
        claim: "品牌宣稱：抗水",
        verdict: "partial",
        why: "抗水是在標準測試下維持一段時間的防護，流汗、擦臉後仍要補擦。",
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "有色流體比厚霜好推，但台灣夏天油肌仍可能悶、色號未必合黃皮膚；對肝斑、敏感與泛紅肌是對的方向。",
  },
  "cosrx-snail-96": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：修護受損肌膚、淡化痘疤",
        verdict: "weak",
        why: "高濃度蝸牛分泌物在一個 25 人小研究改善細紋，但受試者自評沒有差別；修護與淡疤沒有可靠的人體證據。保濕效果則是真的。",
        refs: ["fabi2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽凝露，台灣夏天油肌也用得住，可以取代乳液當白天保濕；無香溫和，但對蝸牛或塵蟎過敏的人留意。",
  },
  "cosrx-bha": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：清除黑頭、改善毛孔堵塞",
        verdict: "weak",
        why: "甜菜鹼水楊酸鹽的人體研究很少，力道比 2% 水楊酸弱；痤瘡指引支持的是水楊酸本身。",
        refs: ["zaenglein2016"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽水狀，適合台灣 T 字出油、黑頭多的人；刺激比一般 BHA 低，配方也有菸鹼醯胺，敏感肌可以先從它試。",
  },
  "cosrx-galactomyces": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：均勻膚色、提亮",
        verdict: "partial",
        why: "真正有淡斑證據的是排第 2 位的菸鹼醯胺（濃度未公開；P&G 研究用 2–5%）；半乳糖酵母樣菌發酵濾液本身沒有獨立的人體淡斑研究。",
        refs: ["hakozaki2002"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "水感很輕，台灣夏天任何膚質都好用；對暗沉、痘疤黑印有輕度幫助，刺激低。",
  },
  "skii-fte": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：Pitera 讓肌膚晶瑩剔透",
        verdict: "weak",
        why: "Pitera 是半乳糖酵母樣菌發酵濾液，晶透感主要來自保濕；沒有在醫學期刊看到獨立、有對照的人體試驗。",
      },
      {
        claim: "品牌宣稱：同時改善膚質、細紋、斑點、毛孔等多種問題",
        verdict: "weak",
        why: "配方只有發酵濾液加保濕與防腐成分，沒有已知的抗老或淡斑主力；品牌數據為自家測試。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清水狀，台灣夏天任何膚質都清爽好用、刺激低；但它的保濕效果，平價酵母精華或玻尿酸化妝水大致做得到。",
  },
  "cosrx-retinol-01": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：0.1% 純視黃醇，改善細紋與膚質，適合新手",
        verdict: "partial",
        why: "視黃醇改善光老化有隨機試驗，但多用 0.3–0.4% 以上；0.1% 適合建立耐受，效果較慢、較小。",
        refs: ["kafi2007", "kang1995"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "乳霜偏潤，台灣夏天油肌可能稍悶；0.1% 刺激低，適合怕脫皮反黑的亞洲新手。",
  },
  "anua-heartleaf-toner": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：77% 魚腥草鎮靜泛紅、舒緩痘痘肌",
        verdict: "weak",
        why: "魚腥草的抗發炎資料以實驗室研究為主，對痘痘與泛紅沒有可靠的人體試驗；舒服感主要來自溫和、無香的配方。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清水狀，台灣濕熱天任何膚質都清爽；適合曬後或刷酸後濕敷，但真的在長痘要用有證據的成分。",
  },
  "anua-niacinamide-txa": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：10% 菸鹼醯胺＋4% 傳明酸，淡化黑斑與痘疤",
        verdict: "partial",
        why: "菸鹼醯胺淡斑有隨機試驗（P&G 研究），傳明酸外用證據仍不足；而且 INCIDecoder 版成分表沒有列出這兩個主成分，請以瓶身成分表為準。",
        refs: ["hakozaki2002", "taraz2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "乳狀精華好疊，台灣夏天也能用；對痘疤黑印、暗沉對題，但含柑橘精油與香料，敏感肌留意，白天一定防曬。",
  },
  "torriden-dive-in": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：低分子玻尿酸深層補水",
        verdict: "partial",
        why: "玻尿酸能保濕，低分子量讓眼周細紋暫時變淺有一篇研究；但「深層」只到角質層，還需要乳霜鎖水。",
        refs: ["pavicic2011"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "水感、無香，台灣夏天油肌可以只用它加防曬；冷氣房或冬天要再加乳霜。",
  },
  "boj-glow-serum": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：蜂膠＋菸鹼醯胺，舒緩痘痘、提亮光澤",
        verdict: "partial",
        why: "2% 菸鹼醯胺能降低皮脂分泌（P&G 研究人員參與），對出油有幫助；蜂膠抗痘的人體證據很少，配方裡的茶樹與甜菜鹼水楊酸鹽量也很少。",
        refs: ["draelos2006"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "黏稠但吸收後不油，台灣夏天混合肌可接受；對蜂產品過敏的人避開。",
  },
  "aestura-atobarrier": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：修護敏感、異位肌的屏障",
        verdict: "supported",
        why: "類神經醯胺、膽固醇、脂肪酸的屏障脂質組合合理，外用神經醯胺能幫助修護；這罐本身沒有發表在期刊的試驗。",
        refs: ["meckfessel2014", "chamlin2002"],
      },
      {
        claim: "品牌宣稱：長效保濕",
        verdict: "supported",
        why: "甘油、角鯊烷加脂質，保濕本身有效；但 Cochrane 回顧沒有找到哪一款保濕劑特別好。",
        refs: ["vanzuuren2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "韓系質地比美系厚霜清爽，台灣夏天也能薄擦；無香，適合異位、敏感肌與冷氣房乾燥。",
  },
  "lrp-cicaplast": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：5% 維生素 B5 修護受損肌膚",
        verdict: "supported",
        why: "泛醇能幫助屏障修復與傷口癒合（研究有拜耳人員參與），5% 是合理濃度；厚膏也有封閉保護的作用。",
        refs: ["proksch2017"],
      },
      {
        claim: "品牌宣稱：積雪草苷舒緩泛紅刺激",
        verdict: "partial",
        why: "積雪草成分有抗發炎、促修復的資料，但多為實驗室與小型研究，這瓶濃度也未公開。",
        refs: ["bylka2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "厚膏狀，台灣夏天整臉擦容易悶痘；適合局部乾裂、A 醇脫皮處，冬天或冷氣房更好用。",
  },
  "skin1004-centella-ampoule": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：積雪草鎮靜、修護敏感泛紅",
        verdict: "weak",
        why: "積雪草有促進修復、抗發炎的資料，但多為實驗室與小型臨床；這瓶濃度未公開。",
        refs: ["bylka2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽水感，台灣夏天油肌、敏感肌都好用；持續泛紅灼熱可能是酒糟，要看醫師。",
  },
  "medicube-pdrn": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：醫美成分 PDRN，修護、讓肌膚彈潤",
        verdict: "weak",
        why: "PDRN 的臨床資料主要來自注射與傷口癒合，不是擦的保養品；分子很大，難穿過健康皮膚。",
        refs: ["squadrito2017", "bos2000"],
      },
      {
        claim: "品牌宣稱：膠原蛋白補充彈力",
        verdict: "unsupported",
        why: "擦的水解膠原蛋白與去端肽膠原分子太大，進不到真皮，不能補充皮膚的膠原，只能在表面保濕。",
        refs: ["bos2000"],
      },
      {
        claim: "品牌宣稱：多種胜肽撫平細紋",
        verdict: "weak",
        why: "胜肽研究多小型、由廠商執行；配方裡真正有證據的是排第 3 位的菸鹼醯胺，但濃度未公開。",
        refs: ["gorouhi2009", "bissett2005"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "保濕精華質地，台灣夏天也不悶、刺激低，但含香料；對亞洲人在意的斑點與細紋，防曬與 A 醇遠比它有效。",
  },
  "klairs-vitamin-drop": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：5% 維生素 C 溫和提亮",
        verdict: "partial",
        why: "左旋 C 提亮有研究，但皮膚吸收在接近 20% 時最好，5% 力道有限；溫和是真的。",
        refs: ["pinnell2001", "telang2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽，台灣夏天好用；刺激比高濃度 C 低，但含柑橘與薰衣草精油，對香料敏感的人留意。",
  },
  "drg-green-mild-sun": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：純物理防曬，敏感肌溫和",
        verdict: "supported",
        why: "成分表的濾劑只看到氧化鋅（排第 2 位），刺激性低、無香；氧化鋅本身也能擋到較長波的 UVA。",
      },
      {
        claim: "品牌宣稱：SPF50+ PA++++ 日常防護",
        verdict: "supported",
        why: "每天擦防曬減緩老化有長期隨機試驗；礦物防曬要擦足量才有標示的防護。",
        refs: ["hughes2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "略泛白，對黃皮膚通常可接受；乳霜在台灣夏天油肌可能偏潤，不抗水；沒有氧化鐵，肝斑要另外補有色防曬。",
  },
  "naruko-tea-tree": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：茶樹控油、抗痘、減少粉刺",
        verdict: "partial",
        why: "5% 茶樹油凝膠能減少痘痘，比過氧化苯慢但副作用少；這瓶茶樹與水楊酸濃度都未公開，本站也沒有取得完整成分表。",
        refs: ["bassett1990", "zaenglein2016"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽凝露，很適合台灣濕熱天的油痘肌；茶樹精油可能過敏，紅腫大顆的發炎痘要看醫師。",
  },
  "drwu-mandelic-18": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：杏仁酸代謝老廢角質，改善粉刺與毛孔",
        verdict: "partial",
        why: "杏仁酸屬於果酸類，能去角質，但專門的高品質人體研究很少；美國痤瘡指引列的是水楊酸、杜鵑花酸等，沒有杏仁酸。",
        refs: ["zaenglein2016"],
      },
      {
        claim: "品牌宣稱：亮白、淡化暗沉",
        verdict: "partial",
        why: "去角質能讓膚色看起來較亮，但 18% 杏仁酸淡斑沒有可靠試驗；膚色較深的人刺激發炎後反而容易留黑印。",
        refs: ["davis2010"],
      },
      {
        claim: "品牌宣稱：分子大、比其他果酸溫和",
        verdict: "partial",
        why: "杏仁酸分子比甘醇酸大、滲透較慢，一般比較不刺；但 18% 是高濃度，第一次用仍容易刺痛。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽精華，台灣油肌粉刺族接受度高；但 18% 對亞洲薄角質偏強，刺激發炎容易反黑，白天一定防曬。",
  },
  "drwu-hyaluronic": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：多種玻尿酸強效保濕",
        verdict: "partial",
        why: "玻尿酸能保濕有研究，但只停在角質層，效果和其他玻尿酸精華差不多。",
        refs: ["pavicic2011"],
      },
      {
        claim: "品牌宣稱：溫和，敏感肌也能用",
        verdict: "supported",
        why: "成分表沒有香料與乙醇，以保濕劑為主，刺激風險低。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "水感，台灣夏天油肌可以只用它加防曬；冷氣房要再擦乳液鎖水。",
  },
  "neogence-ha": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：玻尿酸原液深層補水",
        verdict: "partial",
        why: "玻尿酸能保濕有研究，但只到角質層；「原液」不代表濃度高，本站也沒有取得完整成分表。",
        refs: ["pavicic2011"],
      },
      {
        claim: "品牌宣稱：改善乾燥，適合所有膚質",
        verdict: "partial",
        why: "玻尿酸刺激低、多數人用得住；但它只吸水不鎖水，冷氣房單擦反而可能更乾。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清水狀，台灣夏天任何膚質都清爽；冷氣房或冬天要接乳液或乳霜。",
  },
  "curel-cream": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：神經醯胺機能成分，修護乾燥敏感肌",
        verdict: "partial",
        why: "花王的類神經醯胺排在成分表第 3 位，外用神經醯胺類能幫助屏障；但這類合成神經醯胺的研究多為花王自家，這瓶本身也沒有發表試驗。",
        refs: ["meckfessel2014"],
      },
      {
        claim: "品牌宣稱：低刺激，敏感肌可用",
        verdict: "supported",
        why: "成分表沒有香料與乙醇，成分短，刺激風險低。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "柔軟乳霜不太油，台灣夏天乾敏肌也能用；冷氣房乾燥很適合。",
  },
  "kiehls-ufc": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：冰河醣蛋白長效保濕",
        verdict: "weak",
        why: "保濕主要來自甘油與角鯊烷；所謂冰河醣蛋白（假交替單胞菌發酵萃取）排在成分表後段，沒有獨立的人體研究。",
      },
      {
        claim: "品牌宣稱：適合各種膚質的長時間保濕",
        verdict: "partial",
        why: "甘油、角鯊烷與植物油組成的保濕霜，保濕本身有效；但沒有證據顯示它比平價保濕霜更好。",
        refs: ["vanzuuren2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "輕乳霜在台灣夏天混合肌可以接受，油痘肌可能稍悶；冷氣房、冬天好用。",
  },
  "estee-anr": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：夜間修護，對抗多種老化跡象",
        verdict: "weak",
        why: "主要成分是比菲德氏菌發酵溶胞物、玻尿酸與三胜肽；發酵溶胞物的研究（萊雅）看的是降低敏感、不是抗老，抗老數據多為品牌自家。",
        refs: ["gueniche2010", "gorouhi2009"],
      },
      {
        claim: "品牌宣稱：配合肌膚夜間節律修護",
        verdict: "weak",
        why: "與晝夜節律同步修護的說法，只有品牌自家研究，沒有獨立的人體試驗。",
      },
      {
        claim: "品牌宣稱：保濕，讓肌膚更光滑",
        verdict: "supported",
        why: "玻尿酸與多種保濕劑確實能保濕、讓膚觸變光滑；但這是平價精華也做得到的事。",
        refs: ["pavicic2011"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "滑順精華，台灣夏天也不悶，多數人用得住；但對斑點、皺紋不是主力。",
  },
  "paulas-bha": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：疏通毛孔，減少粉刺與黑頭",
        verdict: "partial",
        why: "美國痤瘡指引把水楊酸列為外用選項，但證據強度不如 A 酸類與過氧化苯；對粉刺黑頭幫助最大，對發炎痘有限。",
        refs: ["zaenglein2016"],
      },
      {
        claim: "品牌宣稱：讓毛孔看起來更小",
        verdict: "partial",
        why: "毛孔外觀變細來自清掉堵塞與角質，毛孔大小本身不會改變。",
      },
      {
        claim: "品牌宣稱：改善膚色不均與細紋",
        verdict: "weak",
        why: "水楊酸不是淡斑或抗老成分，這部分沒有好的人體證據。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "水狀清爽，很適合台灣 T 字出油、粉刺多的人；會乾會刺，乾敏肌先每週兩三次。",
  },
  "ordinary-salicylic": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：2% 水楊酸改善粉刺與毛孔堵塞",
        verdict: "partial",
        why: "美國痤瘡指引把水楊酸列為外用選項，2% 是常用濃度；證據強度不如 A 酸類與過氧化苯。",
        refs: ["zaenglein2016"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "小瓶水狀，適合台灣油肌局部點擦；會乾，先從隔天用。",
  },
  "neogence-retinol-18": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：1.8% A 醇類複方，快速淡紋、緊緻",
        verdict: "partial",
        why: "視黃醇與視黃醛改善皺紋有研究，但 1.8% 是多種 A 類（含較弱的 A 醇酯）的合計，個別濃度未公開，不能等同 1.8% 純視黃醇。",
        refs: ["kafi2007", "creidi1998"],
      },
      {
        claim: "品牌宣稱：8.5% 菸鹼醯胺提亮、均勻膚色",
        verdict: "supported",
        why: "5% 菸鹼醯胺淡斑有隨機試驗（P&G 研究），8.5% 已超過有效濃度。",
        refs: ["hakozaki2002", "bissett2005"],
      },
      {
        claim: "品牌宣稱：加補骨脂酚與神經醯胺，降低 A 醇刺激",
        verdict: "partial",
        why: "0.5% 補骨脂酚改善光老化、比較不刺激，但這瓶濃度未公開；神經醯胺有助屏障。",
        refs: ["dhaliwal2019", "meckfessel2014"],
      },
    ],
    productStudy: noStudy,
    asiaFit:
      "乳狀精華晚上用不悶，菸鹼醯胺對亞洲人在意的斑點有加分；但 A 類總量高，新手容易脫皮泛紅、發炎後反黑，要慢慢加頻率。",
  },
  "neogence-peptide-10": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：三波緊緻拉提",
        verdict: "unsupported",
        why: "擦的產品無法改變下垂的組織，緊繃感多半來自成膜劑；胜肽研究看的是細紋，不是拉提。",
        refs: ["gorouhi2009"],
      },
      {
        claim: "品牌宣稱：10% 多胜肽撫平細紋",
        verdict: "weak",
        why: "官網列的六胜肽、四胜肽、三胜肽，人體研究多半小型、由廠商執行；10% 通常是胜肽原料液的比例，不是純胜肽。",
        refs: ["blanes2002", "robinson2005", "gorouhi2009"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "保濕精華質地，台灣夏天也不悶、刺激低，適合怕 A 醇的人；但對鬆弛下垂別抱期待。",
  },
  "neogence-retinol-body": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：0.3% A 醇緊緻身體肌膚",
        verdict: "partial",
        why: "0.4% 視黃醇擦上臂 24 週改善細紋、增加膠原，這瓶 0.3% 接近；但能改善的是紋理與粗糙，不是鬆弛。",
        refs: ["kafi2007"],
      },
      {
        claim: "品牌宣稱：改善粗糙、暗沉",
        verdict: "partial",
        why: "視黃醇會引起類似 A 酸的表皮變化，讓膚質較平滑；身體暗沉主要仍要靠防曬。",
        refs: ["kang1995"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "身體乳質地，台灣夏天晚上擦可以接受；手臂、小腿白天要防曬，否則容易曬黑。孕期避免。",
  },
  "paulas-retinal-pro": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：A 醛比 A 醇更快見效，改善皺紋",
        verdict: "partial",
        why: "0.05% 視黃醛 44 週改善魚尾紋、耐受性好有研究；但「比 A 醇快」缺乏直接對照，這瓶也沒有公開濃度。",
        refs: ["creidi1998"],
      },
      {
        claim: "品牌宣稱：改善膚質粗糙與色素不均",
        verdict: "partial",
        why: "A 類改善光老化的方向有證據，但濃度未公開，無法判斷是否落在研究範圍。",
        refs: ["creidi1998", "kang1995"],
      },
      {
        claim: "品牌宣稱：高效但溫和",
        verdict: "partial",
        why: "視黃醛的刺激比 A 酸低，但仍會乾、脫皮；新手要慢慢增加頻率。",
        refs: ["creidi1998"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "輕乳質地，台灣夏天晚上用不悶；對亞洲人的斑點、細紋都有幫助，但新手容易脫皮發炎後反黑，白天要防曬。",
  },
  "avene-retinal-blemish": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：A 醛速效淨痘、減少粉刺",
        verdict: "partial",
        why: "外用 A 酸類是痘痘第一線治療，但證據來自處方 A 酸與阿達帕林；保養品視黃醛的抗痘研究很少，這瓶也沒有公開濃度。",
        refs: ["thielitz2008", "zaenglein2016"],
      },
      {
        claim: "品牌宣稱：淡化痘疤痕跡",
        verdict: "partial",
        why: "A 類能加速角質更新，讓痘疤黑印淡得快一點；凹洞痘疤保養品無法改善，而且刺激過度反而讓黑印更深。",
        refs: ["davis2010"],
      },
      {
        claim: "品牌宣稱：溫和，適合敏感的痘痘肌",
        verdict: "weak",
        why: "溫和的說法來自品牌自家測試；視黃醛仍可能造成乾燥脫皮。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽凝露很適合台灣濕熱天的油痘肌；粉刺型痘痘可以試，大顆發炎痘要看醫師。孕期避免。",
  },
  "ordinary-glycolic-7": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：去角質、提亮、改善膚質",
        verdict: "partial",
        why: "甘醇酸能去角質讓膚色變亮；長期改善光老化的研究用的是 25% 果酸而且規模小，7% 化妝水力道溫和得多。",
        refs: ["ditre1996"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "水狀清爽，台灣夏天好用；但會增加日曬敏感度，亞洲人刺激後容易反黑，白天一定防曬，不要和 A 醇同一晚。",
  },
  "lamer-creme": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：神奇活性精萃（Miracle Broth）修護、再生肌膚",
        verdict: "weak",
        why: "海藻發酵精萃的功效只有品牌自家資料，沒有獨立的人體試驗；保濕與修護感主要來自礦物油、凡士林與甘油。",
      },
      {
        claim: "品牌宣稱：撫平細紋、讓肌膚更緊緻",
        verdict: "weak",
        why: "配方沒有視黃醇、菸鹼醯胺這類抗老主力；細紋看起來變淺，多是保濕後的暫時效果。",
      },
      {
        claim: "品牌宣稱：舒緩乾燥",
        verdict: "partial",
        why: "礦物油加凡士林的封閉型基底對乾燥確實有效；但含香料與萊姆、尤加利等成分，敏感肌反而可能被刺激。",
        refs: ["ghadially1992"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "非常厚重，台灣濕熱夏天油肌容易悶痘，比較適合冬天、冷氣房與乾肌；含香料，敏感肌留意。",
  },
  "lancome-genifique": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：益生菌發酵精萃，喚醒年輕肌膚",
        verdict: "weak",
        why: "比菲德氏菌發酵溶胞物有研究，但看的是降低敏感、不是抗老（萊雅研究）；其他抗老數據為品牌自家測試。",
        refs: ["gueniche2010"],
      },
      {
        claim: "品牌宣稱：改善細紋",
        verdict: "partial",
        why: "配方有腺苷，含腺苷產品改善魚尾紋的研究由萊雅（蘭蔻母公司）進行；這瓶腺苷濃度未公開。",
        refs: ["abella2006"],
      },
      {
        claim: "品牌宣稱：保濕、提升光澤",
        verdict: "supported",
        why: "甘油與玻尿酸確實能保濕，讓膚觸與光澤變好；但平價玻尿酸精華也做得到。",
        refs: ["pavicic2011"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "精華清爽，台灣夏天好用；但變性酒精排第 4 位、含香料，敏感肌留意。對斑點皺紋不是主力。",
  },
  "shiseido-ultimune": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：提升肌膚防禦力（肌膚免疫力）",
        verdict: "weak",
        why: "「肌膚免疫力」是行銷說法，只有品牌自家研究；沒有獨立人體試驗證明擦這瓶能改變皮膚的免疫功能。",
      },
      {
        claim: "品牌宣稱：改善乾燥、粗糙等多種肌膚問題",
        verdict: "partial",
        why: "甘油、雙甘油、海藻糖等保濕基底對乾燥確實有效；植物萃取的額外功效沒有人體證據。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽質地很適合台灣濕熱天；但變性酒精排第 4 位、含香料，乾敏肌可能刺。",
  },
  "sulwhasoo-first-care": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：漢方草本精華，抗老、強化肌膚",
        verdict: "weak",
        why: "成分表上是地黃、芍藥、麥冬等多種草本萃取，抗老效果沒有獨立人體研究；配方有腺苷，但濃度未公開，相關研究也是萊雅做的別款產品。",
        refs: ["abella2006"],
      },
      {
        claim: "品牌宣稱：第一道精華，提升後續保養的吸收",
        verdict: "unsupported",
        why: "沒有可信證據顯示先擦它能讓後面的保養品吸收更多；「好吸收」的感覺多半來自酒精揮發與成膜。",
      },
      {
        claim: "品牌宣稱：保濕潤澤",
        verdict: "partial",
        why: "甜菜鹼、丁二醇等保濕劑有效；但變性酒精排第 2 位，乾肌反而可能更乾。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "質地滑潤，台灣夏天也不會太油；但變性酒精排第 2 位、漢方香氣重，敏感肌要小心。",
  },
  "cpb-la-creme": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：啟動肌膚自我修復力，全面抗老",
        verdict: "weak",
        why: "沒有公開濃度的抗老主力，只有少量 A 醇醋酸酯（較弱的 A 醇酯）與品牌專利複方；抗老數據為品牌自家。",
      },
      {
        claim: "品牌宣稱：淡化暗沉、提升光采",
        verdict: "weak",
        why: "含資生堂的美白成分甲氧基水楊酸鉀（4MSK），研究幾乎都是品牌自家；沒有看到獨立的人體試驗。",
      },
      {
        claim: "品牌宣稱：滋潤保濕",
        verdict: "supported",
        why: "甘油、角鯊烷、凡士林等保濕封閉成分對乾燥有效；但這是便宜成分就做得到的事。",
        refs: ["ghadially1992"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "濃潤乳霜，台灣夏天油肌太厚，適合乾肌冬天或冷氣房晚上；含香料。",
  },
  "cerave-sa-cream": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：水楊酸溫和去角質，改善粗糙與雞皮膚",
        verdict: "partial",
        why: "配方其實同時有尿素（排第 2 位）、乳酸與水楊酸，去角質加保濕對粗糙有效；尿素的證據最完整，但三者濃度都未公開。",
        refs: ["pan2013"],
      },
      {
        claim: "品牌宣稱：3 種神經醯胺修護屏障",
        verdict: "partial",
        why: "有神經醯胺與膽固醇，方向正確（回顧作者來自高德美）；但量不高，主要是緩衝去角質的乾燥。",
        refs: ["meckfessel2014"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "乳霜偏潤，台灣夏天擦手臂大腿可以接受；毛孔角化在亞洲很常見，持續用四週後才看得出效果，露出部位要防曬。",
  },
  "eucerin-urea-10": {
    efficacy: 5,
    claims: [
      {
        claim: "品牌宣稱：10% 尿素改善極乾、粗糙、脫屑",
        verdict: "supported",
        why: "尿素對乾燥、角化有大量研究，安全、副作用少，10% 是常用的有效濃度。",
        refs: ["pan2013"],
      },
      {
        claim: "品牌宣稱：添加神經醯胺，修護屏障",
        verdict: "partial",
        why: "神經醯胺 NP 方向正確，但排在中後段、量不高；這瓶的主力是尿素。",
        refs: ["meckfessel2014"],
      },
      {
        claim: "品牌宣稱：舒緩乾癢",
        verdict: "supported",
        why: "規律保濕能減少乾燥與濕疹發作；尿素加甘油的保濕力明確。",
        refs: ["vanzuuren2017", "pan2013"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "身體乳質地在台灣夏天也不太黏；冬天小腿乾裂、冷氣房乾癢很適合，抓破處會刺。",
  },
  "neutrogena-norwegian-body": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：挪威配方深層保濕",
        verdict: "supported",
        why: "甘油與礦物油是便宜又有效的保濕成分，保濕劑能減少乾燥問題；「深層」只到角質層。",
        refs: ["vanzuuren2017"],
      },
      {
        claim: "品牌宣稱：低敏，適合乾燥敏感肌",
        verdict: "partial",
        why: "這個版本成分短、無香，刺激風險低；但通路上也有含香料的版本，要看瓶身。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "吸收快，台灣夏天也能用；冷氣房乾燥、冬天很實用，便宜大瓶。",
  },
  "vaseline-gluta-hya": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：穀胱甘肽亮白身體肌膚",
        verdict: "weak",
        why: "外用穀胱甘肽的研究用的是 2% 氧化型、由原料廠進行；這瓶的穀胱甘肽排在成分表後段，量很少。",
        refs: ["watanabe2014"],
      },
      {
        claim: "品牌宣稱：菸鹼醯胺淡化暗沉",
        verdict: "partial",
        why: "菸鹼醯胺淡斑有隨機試驗（P&G，臉部 2–5%）；這瓶排在第 5 位、濃度未公開，身體暗沉也主要來自日曬。",
        refs: ["hakozaki2002"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽不黏，台灣夏天好用，但有香料；想讓手臂變白，每天防曬比任何身體乳都重要。",
  },
  "nivea-q10-body": {
    efficacy: 2,
    claims: [
      {
        claim: "品牌宣稱：Q10 緊緻肌膚、提升彈性",
        verdict: "weak",
        why: "Q10 能進入表皮、降低氧化的資料以實驗室為主，而且是妮維雅母公司做的；擦的身體乳無法改善鬆弛或橘皮。",
        refs: ["hoppe1999"],
      },
      {
        claim: "品牌宣稱：保濕滋潤",
        verdict: "supported",
        why: "甘油與油脂組成的保濕基底對乾燥有效；但成分表有變性酒精。",
        refs: ["vanzuuren2017"],
      },
    ],
    productStudy: noStudy,
    asiaFit: "身體乳質地，台灣夏天可以接受；含變性酒精與香料，乾敏肌可能刺。「緊緻」別期待太多。",
  },
  "curel-body-lotion": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：神經醯胺機能成分，修護乾燥敏感肌",
        verdict: "supported",
        why: "有類神經醯胺，加上神經醯胺 NP、AP、EOP、膽固醇與凡士林，屏障配方完整。",
        refs: ["meckfessel2014", "ghadially1992"],
      },
      {
        claim: "品牌宣稱：低刺激，全家都能用",
        verdict: "supported",
        why: "成分表沒有香料與乙醇，刺激風險低。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "清爽乳液，台灣夏天也不黏；適合異位、乾敏體質與冷氣房乾癢。",
  },
  "paulas-body-aha": {
    efficacy: 4,
    claims: [
      {
        claim: "品牌宣稱：10% 果酸讓身體肌膚光滑、改善粗糙與光老化",
        verdict: "partial",
        why: "果酸去角質讓粗糙皮膚變平滑很確定；改善光老化的研究用的是 25% 果酸而且規模小，10% 力道較弱。",
        refs: ["ditre1996"],
      },
      {
        claim: "品牌宣稱：淡化暗沉、色素不均",
        verdict: "partial",
        why: "去角質能讓膚色較亮，但淡斑主要靠防曬；果酸還會增加曬傷敏感度。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "身體乳質地，台灣夏天可用；果酸增加日曬敏感，亞洲人刺激後容易反黑，露出部位要防曬。",
  },
  "kiehls-creme-de-corps": {
    efficacy: 3,
    claims: [
      {
        claim: "品牌宣稱：可可脂、乳油木果脂等滋潤極乾肌膚",
        verdict: "supported",
        why: "角鯊烷、甘油與植物脂的保濕力確實好；但沒有證據顯示比平價身體乳更好。",
        refs: ["vanzuuren2017"],
      },
      {
        claim: "品牌宣稱：溫和，適合全身使用",
        verdict: "partial",
        why: "沒有香料，但成分表有二苯甲酮-3（一種防曬劑）與多種對羥基苯甲酸酯，少數人可能過敏。",
      },
    ],
    productStudy: noStudy,
    asiaFit: "濃潤，台灣夏天會黏，冬天或冷氣房乾燥時比較適合。",
  },
};
