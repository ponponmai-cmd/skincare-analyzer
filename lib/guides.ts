import type { AgeGuide } from "./types";

export const ageGuides: AgeGuide[] = [
  {
    id: "teens",
    title: "青春期",
    years: "大約 12–19 歲",
    physiology:
      "皮脂腺很活躍，粉刺比細紋重要。屏障還沒有被保養習慣養厚，卻很容易被過度清潔與酸類刷薄。",
    priority: "溫和清潔、保濕、每天防曬。有粉刺再加一個主活性，不要同時開三條線。",
    morning: [
      {
        step: "溫和洗面乳",
        why: "洗掉油脂即可，搓到緊繃代表屏障已經被你洗傷。",
        productSlugs: [],
      },
      {
        step: "清爽保濕",
        why: "即使出油也需要保濕。缺水會讓你想再洗一次。",
        productSlugs: ["cerave-cream"],
      },
      {
        step: "清爽防曬",
        why: "這個年紀最值得買的抗老產品就是防曬。要清到你願意塗滿整臉。",
        productSlugs: ["biore-aqua-rich", "isntree-watery-sun"],
      },
    ],
    evening: [
      {
        step: "清潔",
        why: "有防曬與出油就需要洗乾淨，不需要二次去角質洗面乳。",
        productSlugs: [],
      },
      {
        step: "一個痘痘活性",
        why: "粉刺可考慮水楊酸或杜鵑花酸。紅腫痘多、持續不退，讓皮膚科決定要不要用阿達帕林，而不是再買一支 A 醇精華。",
        productSlugs: ["the-ordinary-azelaic", "differin"],
      },
      {
        step: "保濕",
        why: "酸類與藥品都會乾。保濕是讓你續得下去的部分。",
        productSlugs: ["cerave-cream"],
      },
    ],
    start: ["每天防曬", "無香保濕", "有粉刺時單一酸類或由醫師決定的外用藥"],
    delay: [
      "1% 視黃醇",
      "高濃度甘醇酸",
      "高濃度原型維生素 C",
      "以抗老為名的香氛精華",
    ],
    mistakes: [
      "把冒痘當成角質厚，每天刷酸。",
      "用妝前隔離代替防曬，又只抹顴骨。",
      "同時使用水楊酸、過氧化苯、視黃醇，三天後屏障先投降。",
    ],
    picks: [
      {
        slug: "isntree-watery-sun",
        why: "無香、輕、價格低，比貴婦防曬更容易每天塗够。",
      },
      {
        slug: "the-ordinary-azelaic",
        why: "同時碰到粉刺與痘疤色素。質地不好，但方向比美白精華對。",
      },
      {
        slug: "cerave-cream",
        why: "屏障底霜。厚的話只擦乾的位置，不必全臉厚敷。",
      },
    ],
  },
  {
    id: "20s",
    title: "二十多歲",
    years: "大約 20–29 歲",
    physiology:
      "膠原蛋白還在，最會留下痕跡的外力是紫外線。這個階段的抗老幾乎等於防曬做對，再加上你願意長期留在臉上的抗氧化與低頻率視黃醇。",
    priority: "每天足量防曬，早上抗氧化，晚上開始低頻率視黃醇，屏障不要為了活性犧牲。",
    morning: [
      {
        step: "抗氧化",
        why: "原型維生素 C 放在防曬前。刺就換低一點的濃度，不必從 20% 開始。",
        productSlugs: ["melano-cc", "timeless-cef"],
      },
      {
        step: "保濕",
        why: "讓後續防曬好推。油肌可以很薄。",
        productSlugs: ["lrp-double-repair"],
      },
      {
        step: "防曬",
        why: "通勤用清爽乳即可。中午在戶外，要補，或改抗水劑型。",
        productSlugs: ["biore-aqua-rich", "boj-relief-sun"],
      },
    ],
    evening: [
      {
        step: "視黃醇，低頻率",
        why: "每週兩到三晚就夠入門。重點是三個月後還在用。",
        productSlugs: ["cerave-retinol", "the-ordinary-retinol"],
      },
      {
        step: "屏障乳霜",
        why: "視黃醇的脫皮要用脂質接住，不是再加一種酸。",
        productSlugs: ["cerave-cream", "illiyoon-ato"],
      },
    ],
    start: ["每天防曬", "可以接受的維生素 C", "每週兩晚的視黃醇", "菸鹼醯胺"],
    delay: ["1% 視黃醇每天擦", "果酸與視黃醇同一晚", "胜肽乳霜當主力"],
    mistakes: [
      "買了很貴的精華，防曬仍用兩滴。",
      "一開始就追 1% 或 20% 維生素 C，刺到停用。",
      "把胜肽或蝸牛黏液當成這個年紀的抗老本體。",
    ],
    picks: [
      {
        slug: "melano-cc",
        why: "原型 C、價格低，適合先建立早上抗氧化的習慣。",
      },
      {
        slug: "cerave-retinol",
        why: "百分比不公開，但比較適合第一次接觸視黃醇。",
      },
      {
        slug: "the-ordinary-niacinamide",
        why: "出油與暗沉的便宜配角。結塊就換質地，不必換更高百分比。",
      },
    ],
  },
  {
    id: "30s",
    title: "三十多歲",
    years: "大約 30–39 歲",
    physiology:
      "更新速度變慢，色素開始固定，表情紋還不是皺紋的全部。這個年紀最常見的錯誤是同時加維生素 C、果酸、視黃醇，然後用更多精華治療自己造成的敏感。",
    priority: "視黃醇變成習慣，色素用傳明酸或杜鵑花酸，防曬開始在意長波 UVA。",
    morning: [
      {
        step: "維生素 C 或淡斑精華",
        why: "兩者可擇一先做穩。敏感就不要早上 C、晚上高濃度 A 又夾果酸。",
        productSlugs: ["paulas-c15", "naturium-txa"],
      },
      {
        step: "保濕",
        why: "輕乳即可，把厚度留給晚上。",
        productSlugs: ["lrp-double-repair"],
      },
      {
        step: "防曬",
        why: "有色斑就看有沒有氧化鐵。常常戶外再考慮長波 UVA 較完整的劑型。",
        productSlugs: ["uvmune-400", "lrp-mineral", "round-lab-birch"],
      },
    ],
    evening: [
      {
        step: "視黃醇",
        why: "從每週三晚走到大多數晚上。0.5% 穩定之後才考慮 1%。",
        productSlugs: ["the-ordinary-retinol", "lrp-retinol-b3"],
      },
      {
        step: "修護",
        why: "神經醯胺乳霜是流程的一部分，不是獎賞。",
        productSlugs: ["illiyoon-ato", "cerave-cream"],
      },
    ],
    start: ["穩定的視黃醇", "針對色素的傳明酸或杜鵑花酸", "看場合選擇的防曬"],
    delay: ["把預算主要放在胜肽乳霜", "氫醌或處方沒有醫師就自行長期使用"],
    mistakes: [
      "早上高濃度 C、晚上果酸加視黃醇，三週後只剩下紅。",
      "色斑一直換美白精華，防曬仍是透明、而且塗很薄。",
      "看到 1% 就換成每天使用。",
    ],
    picks: [
      {
        slug: "the-ordinary-retinol",
        why: "0.5% 是這個年紀很有用的公開濃度，價格允許你慢慢用。",
      },
      {
        slug: "naturium-txa",
        why: "淡斑複方的平價版本。要連擦兩個月，不是擦一週。",
      },
      {
        slug: "lrp-mineral",
        why: "一旦有固定色斑，有色礦物防曬比另一支精華優先。",
      },
    ],
  },
  {
    id: "40s",
    title: "四十多歲",
    years: "大約 40–49 歲",
    physiology:
      "皮脂與屏障脂質下降，同樣的視黃醇比三十歲時更容易乾。色素、細紋、乾燥會同時出現，所以流程要變少，而不是變多。",
    priority: "晚上把脂質補够，視黃醇維持在耐受範圍，白天用能顧到色素的防曬。頸部與手背使用同一瓶。",
    morning: [
      {
        step: "保濕再防曬",
        why: "很乾就先給水與乳，再防曬。防曬本身選潤一點的，你才塗得够。",
        productSlugs: ["hada-labo-premium", "round-lab-birch"],
      },
      {
        step: "有色斑時改有色防曬",
        why: "氧化鐵處理可見光。色號不對就換色號，不要因此放棄。",
        productSlugs: ["lrp-mineral", "cerave-mineral"],
      },
    ],
    evening: [
      {
        step: "視黃醇",
        why: "可以是 0.5%，也可以在已經耐受時用 1%。中間隔晚仍是正常策略。",
        productSlugs: ["lrp-retinol-b3", "paulas-retinol-1"],
      },
      {
        step: "較潤的屏障霜",
        why: "神經醯胺、膽固醇、脂肪酸這組比再疊一層玻尿酸重要。",
        productSlugs: ["illiyoon-ato", "cerave-cream"],
      },
    ],
    start: ["固定的視黃醇節奏", "較潤的無香乳霜", "有色或長波 UVA 較完整的防曬"],
    delay: ["高濃度果酸常規", "香氛抗老霜", "一次換掉全部產品"],
    mistakes: [
      "乾燥就停掉視黃醇，改買胜肽霜，卻沒有把乳霜加厚。",
      "脖子不擦防曬，臉卻用很積極的淡斑。",
      "把生長因子與植物幹細胞當成這個年紀的必要支出。",
    ],
    picks: [
      {
        slug: "illiyoon-ato",
        why: "晚上的脂質霜，價格允許厚塗。",
      },
      {
        slug: "paulas-retinol-1",
        why: "只給已經耐受 0.5% 的人。否則先留在較低濃度。",
      },
      {
        slug: "cerave-mineral",
        why: "有色、含氧化鐵、價格相對可每天用在臉與頸側。",
      },
    ],
  },
  {
    id: "50plus",
    title: "五十歲以後",
    years: "50 歲以上",
    physiology:
      "更乾，刺激閾值更低。有些細紋、乾燥與色斑和荷爾蒙有關，不是缺一瓶精華。保養能做的是屏障、防曬，以及你仍然耐受的視黃醇。",
    priority: "先讓皮膚舒服到願意每天保護它。視黃醇放慢，不必停。醫學問題交給醫師，而不是交給生長因子霜。",
    morning: [
      {
        step: "化妝水後接乳霜",
        why: "玻尿酸負責吸水，乳霜負責把水留下。只擦化妝水會更乾。",
        productSlugs: ["hada-labo-premium", "cerave-cream"],
      },
      {
        step: "防曬，連頸側一起",
        why: "這個年紀防曬的報酬率仍然高於任何精華。",
        productSlugs: ["round-lab-birch", "lrp-mineral"],
      },
    ],
    evening: [
      {
        step: "視黃醇，頻率可以更低",
        why: "每週三晚、用得完，好過每天 1% 然後停兩個月。",
        productSlugs: ["lrp-retinol-b3", "the-ordinary-retinol"],
      },
      {
        step: "厚一點的無香修護",
        why: "必要時在最乾的位置再加一層白軟石蠟類產品。",
        productSlugs: ["illiyoon-ato", "vanicream-cream"],
      },
    ],
    start: ["無香的屏障保養", "每天防曬", "低頻率但仍持續的視黃醇"],
    delay: ["香精很多的抗老系列", "高濃度酸類換膚", "把不適感當成效果"],
    mistakes: [
      "停掉所有活性，只靠油，結果光老化繼續。",
      "反過來疊太多新精華，屏障先壞。",
      "用保養品處理其實該就醫的皮膚病，例如快速變化的色素或持續濕疹。",
    ],
    picks: [
      {
        slug: "hada-labo-premium",
        why: "便宜的保濕第一步，後面一定要接乳霜。",
      },
      {
        slug: "vanicream-cream",
        why: "什麼都刺的時候，回到惰性封閉。",
      },
      {
        slug: "lrp-retinol-b3",
        why: "比 1% 容易留在這個年紀的流程裡。",
      },
    ],
  },
];

export const sunscreenScenarios = [
  {
    id: "oily",
    title: "油肌通勤",
    summary: "你需要的是願意塗滿整臉的清爽感。防護夠、不泛白、價格低到捨得用。",
    pick: "biore-aqua-rich",
    also: ["isntree-watery-sun"],
    caution: "蜜妮含水精華有酒精與香氣。會刺就改伊思樹，不要改去更厚的抗水乳。",
  },
  {
    id: "dry",
    title: "乾肌日常",
    summary: "防曬太乾會讓你用量不足。選潤一點的日常乳，比在乾臉上硬塗清爽凝膠實際。",
    pick: "round-lab-birch",
    also: ["boj-relief-sun"],
    caution: "這兩瓶都不適合游泳。潤是優點，出汗後仍要補擦。",
  },
  {
    id: "sensitive",
    title: "敏感或孕期想保守",
    summary: "無機過濾劑、無香、配方短。有色斑時優先有氧化鐵的色調，而不是完全透明。",
    pick: "cerave-mineral",
    also: ["lrp-mineral"],
    caution: "色號不貼臉就會塗很少。塗很少的礦物防曬，防護會低於你願意塗滿的透明乳。",
  },
  {
    id: "outdoor",
    title: "流汗、海邊、長時間戶外",
    summary: "看抗水與成膜，不要看米糠或玻尿酸。補擦仍然必要。",
    pick: "anessa-milk",
    also: ["uvmune-400"],
    caution: "安耐曬有香氣。UVMune 的酒精感明顯，但長波 UVA 是它的強項。",
  },
  {
    id: "pigment",
    title: "有色斑，要顧可見光",
    summary: "透明防曬幾乎不擋可見光。黃褐斑與深膚色的色素，優先有氧化鐵的防曬。",
    pick: "lrp-mineral",
    also: ["cerave-mineral", "uvmune-400"],
    caution: "UVMune 的長波 UVA 很強，但若沒有氧化鐵，可見光這段仍是缺口。兩者解決的不是同一段光譜。",
  },
  {
    id: "budget",
    title: "預算優先",
    summary: "每天塗够的平價防曬，勝過一週只用兩次的貴防曬。",
    pick: "isntree-watery-sun",
    also: ["biore-aqua-rich", "boj-relief-sun"],
    caution: "便宜的日常乳不要拿去代替海邊的抗水防曬。場合不對時，省下的錢會以曬傷還回來。",
  },
] as const;
