import data from "./data/media.json";

interface Media {
  image?: string;
  imageSource?: string;
  sales?: number;
  salesText?: string;
}

const media = data as Record<string, Media>;

export function productImage(slug: string) {
  const entry = media[slug];
  return entry?.image ? { url: entry.image, source: entry.imageSource ?? "" } : undefined;
}

export function momoSales(slug: string) {
  return media[slug]?.sales ?? 0;
}

export function momoSalesText(slug: string) {
  return media[slug]?.salesText;
}

export function isBestSeller(slug: string) {
  return momoSales(slug) >= 1000;
}
