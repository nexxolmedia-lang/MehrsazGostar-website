import type { ProductSpec } from '../data/products';

/** Latin specs (codes, units, standards) are isolated LTR so they never reorder inside RTL text. */
export function SpecValue({ spec }: { spec: ProductSpec }) {
  return spec.ltr ? <bdi className="ltr">{spec.value}</bdi> : <>{spec.value}</>;
}
