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
  NARUKO: "taiwan",
  "DR.WU": "taiwan",
  Neogence: "taiwan",
  "SK-II": "japan",
  "Curél": "japan",
  Anessa: "japan",
  Biore: "japan",
  "Hada Labo": "japan",
  Rohto: "japan",
};

export function productOrigin(product: Product): Origin {
  return brandOrigin[product.brand] ?? "western";
}

function searchTerm(product: Product) {
  return `${product.brandZh === product.brand ? product.brand : product.brandZh} ${product.nameZh}`;
}

export function shopeeUrl(product: Product) {
  return `https://shopee.tw/search?keyword=${encodeURIComponent(searchTerm(product))}`;
}

export function coupangUrl(product: Product) {
  return `https://www.tw.coupang.com/search?q=${encodeURIComponent(searchTerm(product))}`;
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
