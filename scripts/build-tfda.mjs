// Converts TFDA open data (data.gov.tw 173682/173683/173684/173685) into lib/data/tfda.json.
// Refresh the raw files with: node scripts/build-tfda.mjs --download
import { readFileSync, writeFileSync } from "node:fs";

const datasets = [
  { id: "173685", info: 199, list: "限用成分" },
  { id: "173682", info: 201, list: "防腐劑" },
  { id: "173683", info: 202, list: "防曬劑" },
  { id: "173684", info: 203, list: "禁用成分" },
];

if (process.argv.includes("--download")) {
  for (const set of datasets) {
    const url = `https://data.fda.gov.tw/opendata/exportDataList.do?method=ExportData&InfoId=${set.info}&logType=5`;
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    writeFileSync(`scripts/tfda/${set.id}.json`, await response.text());
  }
}

const clean = (value) =>
  (value ?? "")
    .normalize("NFKC")
    .replace(/\r\n|\n|\t/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*\/\s*\//g, " /")
    .trim();

export const keyOf = (name) =>
  name
    .toLowerCase()
    .replace(/\(\d\)/g, "")
    .replace(/\[[^\]]*\]|\((inn|inci)\)/g, "")
    .replace(/[^a-z0-9]/g, "");

function names(...fields) {
  const out = new Set();
  for (const field of fields) {
    for (const part of (field ?? "").split(/\/|\r?\n|;|、|；/)) {
      const text = part.replace(/\(\d\)/g, "").replace(/\((INN|INCI)\)|\[(INN|INCI)\]/gi, "");
      const alternatives = [...text.matchAll(/[（(]([^（）()]+)[）)]/g)].map((match) => match[1]);
      const base = text.replace(/[（(][^（）()]*[）)]/g, " ").replace(/[（(][^（）()]*[）)]/g, " ");
      for (const candidate of [base, ...alternatives]) {
        if (/[\u3400-\u9fff]/.test(candidate)) continue;
        const name = candidate.replace(/,?\s*(and )?(its|their) (salts|esters|compounds|derivatives)( and [a-z ]+)?/gi, "").trim();
        const key = keyOf(name);
        if (key.length >= 4 && !/^\d+(and)?\d*$/.test(key)) out.add(key);
      }
    }
  }
  return [...out];
}

const entries = [];
const limits = {};
const banned = {};
for (const set of datasets) {
  const rows = JSON.parse(readFileSync(`scripts/tfda/${set.id}.json`, "utf8"));
  for (const row of rows) {
    if (set.list === "禁用成分") {
      const name = clean(row["成分名稱"]);
      if (/Bovine Spongiform/i.test(name)) continue;
      for (const key of names(row["成分名稱"])) banned[key] = name.slice(0, 50);
      continue;
    }
    const entry = {
      list: set.list,
      scope: clean(row["產品類型／使用範圍"]) || undefined,
      limit: clean(row["限量標準"]) || undefined,
      rule: clean(row["限制規定"]) || undefined,
      warning: clean(row["應刊載之注意事項"]) || undefined,
    };
    const index = entries.push(entry) - 1;
    for (const key of names(row["INCI名"], row["成分名"])) {
      (limits[key] ??= []).push(index);
    }
  }
}

writeFileSync(
  "lib/data/tfda.json",
  `${JSON.stringify({ source: "衛生福利部食品藥物管理署 政府資料開放平臺", fetchedAt: new Date().toISOString().slice(0, 10), entries, limits, banned })}\n`,
);
console.log("limits", Object.keys(limits).length, "banned", Object.keys(banned).length);
