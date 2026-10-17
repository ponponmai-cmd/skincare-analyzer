import type { Product } from "./types";

export function formatTwd(value: number) {
  return `NT$${Math.round(value).toLocaleString("zh-Hant")}`;
}

export function unitPrice(product: Product) {
  return product.priceTwd / product.volume;
}

export function formatUnitPrice(product: Product) {
  const unit = product.volumeUnit === "g" ? "克" : "毫升";
  return `${formatTwd(unitPrice(product))}／${unit}`;
}

export function formatVolume(product: Product) {
  return `${product.volume}${product.volumeUnit}`;
}

export function formatMoney(value: number) {
  const rounded = Math.round(value);
  return `${rounded < 0 ? "-" : ""}${formatTwd(Math.abs(rounded))}`;
}
