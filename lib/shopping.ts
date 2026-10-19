import type { Origin, Product } from "./types";

const brandOrigin: Record<string, Origin> = {
  COSRX: "korea",
  Anua: "korea",
  Torriden: "korea",
  "Beauty of Joseon": "korea",
  Aestura: "korea",
  Skin1004: "korea",
  Medicube: "korea",
  "Dear, Klairs": "korea",
  "Dr.G": "korea",
  "Round Lab": "korea",
  Isntree: "korea",
  Illiyoon: "korea",
  Sulwhasoo: "korea",
  Innisfree: "korea",
  Laneige: "korea",
  belif: "korea",
  Purito: "korea",
  "Dr.Jart+": "korea",
  "Some By Mi": "korea",
  Missha: "korea",
  "Cell Fusion C": "korea",
  "AXIS-Y": "korea",
  numbuzin: "korea",
  NARUKO: "taiwan",
  "DR.WU": "taiwan",
  Neogence: "taiwan",
  "SK-II": "japan",
  "Curél": "japan",
  Anessa: "japan",
  Biore: "japan",
  "Hada Labo": "japan",
  Rohto: "japan",
  Shiseido: "japan",
  "Clé de Peau Beauté": "japan",
  KOSÉ: "japan",
  MINON: "japan",
  Allie: "japan",
  "Skin Aqua": "japan",
  Canmake: "japan",
};

export function productOrigin(product: Product): Origin {
  return brandOrigin[product.brand] ?? "western";
}

function searchTerm(product: Product) {
  return `${product.brandZh === product.brand ? product.brand : product.brandZh} ${product.nameZh}`;
}

function google(query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function shopLinks(product: Product) {
  const term = searchTerm(product);
  return [
    { label: "Google 比價", href: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(term)}` },
    { label: "Google 找蝦皮", href: google(`${term} site:shopee.tw`) },
    { label: "Google 找酷澎", href: google(`${term} site:tw.coupang.com`) },
    { label: "到 momo 搜尋", href: `https://www.momoshop.com.tw/search/searchShop.jsp?keyword=${encodeURIComponent(term)}` },
  ];
}

export type PriceVerdict = "low" | "fair" | "high" | "overpay";

export function judgePrice(product: Product, priceTwd: number, volume: number) {
  const reference = product.priceTwd / product.volume;
  const seen = priceTwd / volume;
  const ratio = seen / reference;
  const verdict: PriceVerdict =
    ratio < 0.7 ? "low" : ratio <= 1.1 ? "fair" : ratio <= 1.35 ? "high" : "overpay";
  return { reference, seen, ratio, verdict };
}
