import type { CategorySlug, LightSource } from '../data/products';
import { categories, lightSourceLabels } from '../data/products';
import { toPersianDigits } from '../lib/persian';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  category: CategorySlug | null;
  lightSource: LightSource | null;
  /** Result counts per category given the other active filters. */
  categoryCounts: Record<CategorySlug | 'all', number>;
  onCategoryChange: (value: CategorySlug | null) => void;
  onLightSourceChange: (value: LightSource | null) => void;
}

const sources: (LightSource | null)[] = [null, 'LED', 'halogen'];

export function FilterBar({ category, lightSource, categoryCounts, onCategoryChange, onLightSourceChange }: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.group} role="group" aria-labelledby="filter-category-label">
        <span id="filter-category-label" className={styles.groupLabel}>
          دسته‌بندی
        </span>
        <div className={styles.scroller}>
          <ul role="list" className={styles.chips}>
            <li>
              <button
                type="button"
                className={styles.chip}
                aria-pressed={category === null}
                onClick={() => onCategoryChange(null)}
              >
                همه
                <span className={styles.count}>{toPersianDigits(categoryCounts.all)}</span>
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  className={styles.chip}
                  aria-pressed={category === c.slug}
                  onClick={() => onCategoryChange(category === c.slug ? null : c.slug)}
                >
                  {c.name}
                  <span className={styles.count}>{toPersianDigits(categoryCounts[c.slug])}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.group} role="group" aria-labelledby="filter-source-label">
        <span id="filter-source-label" className={styles.groupLabel}>
          منبع نور
        </span>
        <div className={styles.segmented}>
          {sources.map((s) => (
            <button
              key={s ?? 'all'}
              type="button"
              className={styles.segment}
              aria-pressed={lightSource === s}
              onClick={() => onLightSourceChange(s)}
            >
              {s === null ? 'همه' : s === 'LED' ? <bdi className="ltr">LED</bdi> : lightSourceLabels[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
