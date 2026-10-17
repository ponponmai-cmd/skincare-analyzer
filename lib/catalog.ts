import { ingredients } from "./ingredients";
import { products } from "./products";
import type { Ingredient, Product } from "./types";

export function getIngredient(slug: string) {
  return ingredients.find((item) => item.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function requireProduct(slug: string) {
  const product = getProduct(slug);
  if (!product) {
    throw new Error(`未知產品：${slug}`);
  }
  return product;
}

export function productsContaining(slug: string) {
  return products
    .filter((product) =>
      product.keyActives.some((active) => active.ingredient === slug),
    )
    .sort((a, b) => a.priceTwd / a.volume - b.priceTwd / b.volume);
}

export function ingredientName(slug: string) {
  return getIngredient(slug)?.nameZh ?? slug;
}

export function searchIngredients(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return ingredients;
  return ingredients.filter((item) => haystack(item).includes(needle));
}

function haystack(item: Ingredient) {
  return [item.nameZh, item.nameEn, item.inci, item.summary, ...item.aliases, ...item.functions]
    .join(" ")
    .toLowerCase();
}

export function productHaystack(product: Product) {
  return [
    product.brand,
    product.brandZh,
    product.name,
    product.nameZh,
    product.summary,
    product.texture,
    ...product.keyActives.map((active) => ingredientName(active.ingredient)),
  ]
    .join(" ")
    .toLowerCase();
}
