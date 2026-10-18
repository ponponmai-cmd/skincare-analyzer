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

export function sourcesFetchedAt() {
  const dates = Object.values(sources).map((item) => item.fetchedAt);
  return dates.sort().at(-1) ?? "";
}
