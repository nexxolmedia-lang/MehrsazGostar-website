import { categories, lightSourceLabels, type CategorySlug, type LightSource, type Product } from '../data/products';
import { compactForSearch, normalizeForSearch } from './persian';

interface IndexedProduct {
  product: Product;
  text: string;
  compact: string;
}

const indexCache = new WeakMap<Product, IndexedProduct>();

function indexProduct(product: Product): IndexedProduct {
  const cached = indexCache.get(product);
  if (cached) return cached;
  const category = categories.find((c) => c.slug === product.category);
  const raw = [
    product.name,
    product.code ?? '',
    product.summary,
    category?.name ?? '',
    product.lightSource ? lightSourceLabels[product.lightSource] : '',
    ...product.specs.map((s) => s.value),
    ...(product.keywords ?? []),
  ].join(' ');
  const entry = { product, text: normalizeForSearch(raw), compact: compactForSearch(raw) };
  indexCache.set(product, entry);
  return entry;
}

/** Every query token must match (in spaced or compact form). Name/code matches rank first. */
export function searchProducts(list: Product[], query: string): Product[] {
  const normalized = normalizeForSearch(query);
  if (!normalized) return list;
  const tokens = normalized.split(' ');
  const compactQuery = normalized.replace(/\s+/g, '');

  const scored: { product: Product; score: number }[] = [];
  for (const product of list) {
    const entry = indexProduct(product);
    const allTokens = tokens.every((t) => entry.text.includes(t) || entry.compact.includes(t));
    if (!allTokens && !entry.compact.includes(compactQuery)) continue;
    const head = compactForSearch(`${product.name} ${product.code ?? ''}`);
    const score = head.includes(compactQuery) ? 2 : 1;
    scored.push({ product, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.product);
}

export interface CatalogFilters {
  query: string;
  category: CategorySlug | null;
  lightSource: LightSource | null;
}

export function filterProducts(list: Product[], filters: CatalogFilters): Product[] {
  const byFacet = list.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.lightSource || p.lightSource === filters.lightSource),
  );
  return searchProducts(byFacet, filters.query);
}
