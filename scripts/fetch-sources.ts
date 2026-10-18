import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { products } from "../lib/products";
import type { Product } from "../lib/types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36";
const OUT = "lib/data/sources.json";
const MEDIA = "lib/data/media.json";
const OVERRIDES = "scripts/source-overrides.json";
const today = new Date().toISOString().slice(0, 10);

type Sources = Record<string, ProductSource>;
interface ProductSource {
  inci?: { url: string; title: string; list: string[] };
  image?: { url: string; source: string };
  momo?: {
    url: string;
    name: string;
    price: number;
    sales: number;
    salesText: string;
    rating?: string;
    ratingTimes?: string;
    image?: string;
  };
  fetchedAt: string;
}
interface Override {
  incidecoder?: string | null;
  momoQuery?: string;
  momoMustInclude?: string[];
  momoExclude?: string[];
  momoSkip?: boolean;
  image?: { url: string; source: string };
}

const overrides: Record<string, Override> = existsSync(OVERRIDES)
  ? JSON.parse(readFileSync(OVERRIDES, "utf8"))
  : {};
const previous: Sources = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
const only = process.argv.slice(2);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function get(url: string) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": UA, "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8" } });
      if (response.ok) return await response.text();
      if (response.status === 404) return "";
    } catch {}
    await sleep(2000 * (attempt + 1));
  }
  return "";
}

function decode(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function words(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9%+ ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 2);
}

async function findIncidecoder(product: Product) {
  const query = `${product.brand} ${product.name}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w%+ .'-]/g, " ");
  const html = await get(`https://incidecoder.com/search?query=${encodeURIComponent(query)}`);
  const results = [...html.matchAll(/href="\/products\/([^"]+)" class="klavika simpletextlistitem">([^<]+)/g)].map(
    (match) => ({ slug: match[1], title: decode(match[2]) }),
  );
  const brandWords = words(product.brand);
  const nameWords = words(product.name);
  let best: { slug: string; title: string; score: number } | undefined;
  for (const result of results) {
    const titleWords = new Set(words(result.title));
    if (!brandWords.some((word) => titleWords.has(word) || result.slug.includes(word))) continue;
    const hits = nameWords.filter((word) => titleWords.has(word)).length;
    const score = hits / Math.max(nameWords.length, 1) - (titleWords.size - hits) * 0.02;
    if (!best || score > best.score) best = { ...result, score };
  }
  return best && best.score >= 0.5 ? best.slug : undefined;
}

async function readIncidecoder(slug: string) {
  const url = `https://incidecoder.com/products/${slug}`;
  const html = await get(url);
  if (!html) return undefined;
  const start = html.indexOf('id="ingredlist-short"');
  if (start === -1) return undefined;
  const end = html.indexOf("</div>", html.indexOf("</div>", start) + 6);
  const block = html.slice(start, end === -1 ? start + 20000 : end);
  const list = [...block.matchAll(/class="ingred-link[^"]*"[^>]*>([^<]+)</g)].map((match) => decode(match[1]));
  const title = decode(html.match(/<title>([^<]+)/)?.[1] ?? slug).replace(/ ingredients \(Explained\)$/, "");
  const image = html.match(/<img src="(https:\/\/incidecoder-content[^"]+_front_photo[^"]*)"/)?.[1];
  return { url, title, list: [...new Set(list)], image };
}

function bigrams(value: string) {
  const clean = value.replace(/[\s【】\[\]（）()|｜/、,，.]/g, "").toLowerCase();
  const grams = new Set<string>();
  for (let index = 0; index < clean.length - 1; index++) grams.add(clean.slice(index, index + 2));
  return grams;
}

function parseSales(text: string) {
  const match = text.replace(/,/g, "").match(/(\d+(?:\.\d+)?)(萬)?/);
  if (!match) return 0;
  return Number(match[1]) * (match[2] ? 10000 : 1);
}

async function readMomo(product: Product, override?: Override) {
  const brandName = product.brandZh !== product.brand ? product.brandZh : product.brand;
  const query = override?.momoQuery ?? `${brandName} ${product.nameZh.replace(/（[^）]*）/g, "")}`;
  const html = await get(`https://www.momoshop.com.tw/search/searchShop.jsp?keyword=${encodeURIComponent(query)}`);
  const text = html.replace(/\\"/g, '"').replace(/\\u003e/g, ">").replace(/\\u0026/g, "&");
  const items = [...text.matchAll(/"goodsName":"([^"]+)"[\s\S]*?"goodsPrice":"\$\$([\d,]+)"[\s\S]*?"imgUrl":"([^"]+)"[\s\S]*?"totalSalesInfo":\{"text":"([^"]*)"[\s\S]*?"goodsUrl":"([^"]+)"(?:[\s\S]*?"rating":"([^"]*)","ratingTimes":"([^"]*)")?/g)];
  const brandKeys = [product.brand, product.brandZh].map((value) => value.toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]/g, ""));
  const target = bigrams(product.nameZh);
  let best: ProductSource["momo"] & { score: number } | undefined;
  for (const item of items) {
    const name = item[1];
    const flat = name.toLowerCase().replace(/[^a-z0-9\u3400-\u9fff]/g, "");
    if (!brandKeys.some((key) => key.length >= 2 && flat.includes(key))) continue;
    if (override?.momoMustInclude && !override.momoMustInclude.every((word) => name.includes(word))) continue;
    if (override?.momoExclude?.some((word) => name.includes(word))) continue;
    const grams = bigrams(name);
    const overlap = [...target].filter((gram) => grams.has(gram)).length / Math.max(target.size, 1);
    if (overlap < 0.45) continue;
    const sales = parseSales(item[4]);
    const isSet = /組|\+|套組|禮盒|買\d送/.test(name);
    const score = overlap + Math.log10(sales + 1) * 0.05 - (isSet ? 0.15 : 0);
    if (!best || score > best.score) {
      best = {
        url: item[5].split("&Area=")[0],
        name,
        price: Number(item[2].replace(/,/g, "")),
        sales,
        salesText: item[4],
        rating: item[6] || undefined,
        ratingTimes: item[7]?.replace(/[()]/g, "") || undefined,
        image: item[3],
        score,
      };
    }
  }
  if (!best) return undefined;
  delete (best as { score?: number }).score;
  return best as ProductSource["momo"];
}

function writeMedia(result: Sources) {
  const media: Record<string, { image?: string; imageSource?: string; sales?: number; salesText?: string }> = {};
  for (const [slug, entry] of Object.entries(result)) {
    media[slug] = {
      image: entry.image?.url,
      imageSource: entry.image?.source,
      sales: entry.momo?.sales || undefined,
      salesText: entry.momo?.salesText || undefined,
    };
  }
  writeFileSync(MEDIA, `${JSON.stringify(media)}\n`);
}

async function main() {
  mkdirSync("lib/data", { recursive: true });
  const result: Sources = { ...previous };
  for (const product of products) {
    if (only.length && !only.includes(product.slug)) continue;
    const override = overrides[product.slug];
    const entry: ProductSource = { fetchedAt: today };

    const inciSlug =
      override?.incidecoder === null ? undefined : override?.incidecoder ?? (await findIncidecoder(product));
    await sleep(700);
    if (inciSlug) {
      const page = await readIncidecoder(inciSlug);
      await sleep(700);
      if (page && page.list.length > 0) {
        entry.inci = { url: page.url, title: page.title, list: page.list };
        if (page.image) entry.image = { url: page.image, source: "INCIDecoder" };
      }
    }

    entry.momo = override?.momoSkip ? undefined : await readMomo(product, override);
    await sleep(700);
    if (override?.image) entry.image = override.image;
    if (!entry.image && entry.momo?.image) entry.image = { url: entry.momo.image, source: "momo" };

    result[product.slug] = entry;
    console.log(
      product.slug.padEnd(30),
      (entry.inci ? `INCI ${entry.inci.list.length} ${entry.inci.title}` : "INCI -").slice(0, 70).padEnd(72),
      entry.momo ? `momo ${entry.momo.salesText || "-"} $${entry.momo.price} ${entry.momo.name.slice(0, 40)}` : "momo -",
    );
    writeFileSync(OUT, `${JSON.stringify(result, null, 1)}\n`);
  }
  writeMedia(result);
}

if (process.argv[2] === "--media-only") writeMedia(previous);
else main();
