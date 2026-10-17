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

- 查詢：輸入想要的效果（美白、痘痘、保濕、毛孔…）、成分，或廠牌加品名。效果會列出該先認識的成分與做得到的產品，可依韓國、台灣、日本、歐美篩選
- 成分表解析：貼上整串全成分（中英文皆可），逐項翻譯，標出功效成分位置、估計 1% 線、香料與過敏原、孕期與互相衝突的組合，並找出成分最接近的收錄產品
- 成分圖譜：中文、英文、INCI、機制、優點、代價、孕期與證據
- 產品頁：參考價格、主成份、更便宜／同價／更貴的近親，以及「冤大頭檢查」：一鍵到蝦皮、酷澎搜尋，填入看到的價格換算每毫升並判斷貴不貴
- 平價替代：先選一瓶，再看少了什麼
- 並排：最多三瓶
- 防曬：依通勤、乾肌、敏感、戶外、色斑與預算
- 年紀：青春期到五十歲以後的優先順序

資料整理於 2026-10，價格是台灣常見通路的參考市價。蝦皮與酷澎不開放程式抓取，網站不顯示即時價格，只提供搜尋連結與單位價判斷。

資料檔：`lib/ingredients.ts`、`lib/ingredients-extra.ts`（成分），`lib/products.ts`、`lib/products-extra.ts`（產品），`lib/inci-dictionary.ts`（成分表解析用的基礎成分字典），`lib/goals.ts`（效果查詢）。
