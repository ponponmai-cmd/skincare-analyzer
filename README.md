# 膚鑑

保養品的成分對照所。用中英名稱、INCI、功效證據、優缺點，以及每毫升價格，看出貴價品和較便宜產品之間到底重疊多少。

這是成分教育，不是診療，也不是即時報價。配方會改版。

## 本地執行

```bash
npm install
npm run dev
```

開發伺服器會開在 [http://127.0.0.1:43123](http://127.0.0.1:43123)。

## 公開網站

推到 `main` 之後，`.github/workflows/pages.yml` 會自動建置靜態版並發布到 GitHub Pages：[ponponmai-cmd.github.io/skincare-analyzer](https://ponponmai-cmd.github.io/skincare-analyzer/)。

本地重現同一份靜態版：

```bash
PAGES_BASE_PATH=/skincare-analyzer npx next build
```

輸出在 `out/`。

## 裡頭有什麼

- 查詢：輸入想處理的問題（美白、抗皺、緊實拉提、痘痘、身體光滑…）、成分（含別名，例如 A醛＝視黃醛、左旋C、B5、CICA），或廠牌加品名（也認得小黑瓶、小棕瓶、乳霜之王等暱稱）
- 成分頁：功效、機制，以及「一瓶要有多少才看得到效果」：最低有效濃度、最佳範圍、太多會怎樣、多久看得到
- 產品頁：產品照片、值得留下星等（1–5 顆）、奢華款與 momo 銷量標示、怎麼用、完整成分表，以及冤大頭檢查：先用 Google 看商品，再連到蝦皮、酷澎、momo（不用先登入）
- 平價替代成分對照表：自己設定至少重複幾樣成分（預設 3），至少列兩瓶替代品，逐項比對原本那瓶的完整成分
- 產品瀏覽：依想處理的問題、知名熱銷（momo 銷量破千）、平價、奢華款、產地、種類、年紀篩選，可依對症、單價、星等、銷量排序
- 身體乳：光滑（尿素、水楊酸、果酸）、緊緻（A 醇）、保濕、亮白
- 成分表解析：貼上整串全成分，逐項翻譯與標註
- 年紀：每個年紀的早晚保養，加上一週晚上的排法（活性夜／修護夜）與逐步做法
- 面膜與急救：曬後、熬夜、乾到脫皮、爆痘、敏感、刷酸後等 12 種狀況該敷什麼、避開什麼、何時看醫師
- 防曬、並排比較、判讀法

資料整理於 2026-10，價格是台灣常見通路的參考市價。

## 資料來源與更新

- 完整成分表與產品照片：[INCIDecoder](https://incidecoder.com)（海外版成分可能與台灣版略有差異）
- momo 銷量與售價：momo 搜尋結果頁公開資訊
- 霓淨思產品：品牌官網
- 蝦皮與酷澎會擋程式讀取，所以只提供經 Google 的搜尋連結，不顯示它們的銷量

重新抓取：

```bash
npx tsx scripts/fetch-sources.ts            # 全部產品
npx tsx scripts/fetch-sources.ts lamer-creme  # 指定產品
```

抓錯時在 `scripts/source-overrides.json` 指定 INCIDecoder 網址代號、momo 必須包含或排除的字。結果寫到 `lib/data/sources.json` 與 `lib/data/media.json`。

資料檔：`lib/ingredients*.ts`、`lib/ingredient-aliases.ts`（成分與別名），`lib/products*.ts`（產品），`lib/doses.ts`（有效濃度），`lib/ratings.ts`（星等），`lib/goals.ts`（想處理的問題），`lib/night-routines.ts`、`lib/masks.ts`（晚間保養與面膜）。
