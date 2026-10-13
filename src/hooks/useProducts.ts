import { useEffect, useState } from 'react';
import { products, type Product } from '../data/products';

let loaded = false;

/**
 * Data access seam. Today it resolves the local sample dataset (with a short simulated latency on
 * the first load so the loading state is visible); later it can call the real catalog API.
 */
export function useProducts(): { products: Product[]; loading: boolean } {
  const [loading, setLoading] = useState(!loaded);

  useEffect(() => {
    if (loaded) return;
    const timer = window.setTimeout(() => {
      loaded = true;
      setLoading(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, []);

  return { products: loading ? [] : products, loading };
}
