import data from "./data/sources.json";

export interface ProductSource {
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

const sources = data as Record<string, ProductSource>;

export function productSource(slug: string): ProductSource | undefined {
  return sources[slug];
}

export function fullInci(slug: string) {
  return sources[slug]?.inci?.list ?? [];
}

export function productImage(slug: string) {
  return sources[slug]?.image;
}

export function momoSales(slug: string) {
  return sources[slug]?.momo?.sales ?? 0;
}

export function isBestSeller(slug: string) {
  return momoSales(slug) >= 1000;
}

export function sourcesFetchedAt() {
  const dates = Object.values(sources).map((item) => item.fetchedAt);
  return dates.sort().at(-1) ?? "";
}
