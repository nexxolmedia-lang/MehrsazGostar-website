import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SearchBox } from '../components/SearchBox';
import { FilterBar } from '../components/FilterBar';
import { ProductCard } from '../components/ProductCard';
import { SampleNote } from '../components/SampleBadge';
import { Button, ButtonLink } from '../components/Button';
import { categories, getCategory, type CategorySlug, type LightSource } from '../data/products';
import { filterProducts } from '../lib/search';
import { formatCount } from '../lib/persian';
import { useProducts } from '../hooks/useProducts';
import styles from './Catalog.module.css';

const isCategory = (v: string | null): v is CategorySlug => !!v && categories.some((c) => c.slug === v);
const isSource = (v: string | null): v is LightSource => v === 'LED' || v === 'halogen';

export function Catalog() {
  const [params, setParams] = useSearchParams();
  const { products, loading } = useProducts();

  const urlQuery = params.get('q') ?? '';
  const category = isCategory(params.get('cat')) ? (params.get('cat') as CategorySlug) : null;
  const lightSource = isSource(params.get('source')) ? (params.get('source') as LightSource) : null;

  const update = (key: 'q' | 'cat' | 'source', value: string | null) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );
  };

  // The search input owns its text (URL updates are async, so binding the input to the URL drops
  // keystrokes). Results filter immediately; the URL follows after a short pause.
  const [query, setQuery] = useState(urlQuery);
  const syncedQuery = useRef(urlQuery);

  useEffect(() => {
    // External change (header search, clear filters, back/forward): adopt the URL value.
    if (urlQuery !== syncedQuery.current) {
      syncedQuery.current = urlQuery;
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    if (query === syncedQuery.current) return;
    const timer = window.setTimeout(() => {
      syncedQuery.current = query;
      update('q', query || null);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [query]);

  const clearAll = () => {
    syncedQuery.current = '';
    setQuery('');
    setParams({}, { replace: true, preventScrollReset: true });
  };

  const hasFilters = Boolean(query.trim() || category || lightSource);

  const results = useMemo(
    () => filterProducts(products, { query, category, lightSource }),
    [products, query, category, lightSource],
  );

  const categoryCounts = useMemo(() => {
    const base = filterProducts(products, { query, category: null, lightSource });
    const counts = { all: base.length } as Record<CategorySlug | 'all', number>;
    for (const c of categories) counts[c.slug] = base.filter((p) => p.category === c.slug).length;
    return counts;
  }, [products, query, lightSource]);

  const activeCategory = category ? getCategory(category) : null;

  return (
    <>
      <PageMeta
        title={activeCategory ? `${activeCategory.name} — کاتالوگ محصولات` : 'کاتالوگ محصولات'}
        description="کاتالوگ چراغ جلو، چراغ عقب، مه‌شکن، لامپ و قطعات روشنایی خودرو؛ جستجو با نام، کد یا پایه لامپ."
      />

      <section className={styles.head} aria-labelledby="catalog-title">
        <div className={`container ${styles.headGrid}`}>
          <div>
            <Breadcrumbs items={[{ label: 'صفحه اصلی', to: '/' }, { label: 'محصولات' }]} />
            <h1 id="catalog-title" className={`t-page-title ${styles.title}`}>
              کاتالوگ محصولات
            </h1>
            <p className={`t-lead ${styles.intro}`}>
              محصول مورد نیاز را با نام، کد قطعه یا پایه‌ی لامپ جستجو کنید، یا از دسته‌بندی و منبع نور برای محدود کردن
              نتایج کمک بگیرید.
            </p>
          </div>
          <SampleNote className={styles.sampleNote}>
            محصولات، کدها، مشخصات و تصاویر این کاتالوگ نمونه‌ی نمایشی هستند و پس از دریافت اطلاعات تأییدشده‌ی مهرساز گستر
            جایگزین می‌شوند.
          </SampleNote>
        </div>
      </section>

      <section className={styles.body} aria-label="فهرست محصولات">
        <div className="container">
          <div className={styles.toolbar}>
            <div className={styles.search}>
              <SearchBox
                label="جستجو در کاتالوگ"
                value={query}
                onChange={setQuery}
                placeholder="نام، کد یا پایه لامپ — مثلاً H7"
              />
            </div>
            <FilterBar
              category={category}
              lightSource={lightSource}
              categoryCounts={categoryCounts}
              onCategoryChange={(v) => update('cat', v)}
              onLightSourceChange={(v) => update('source', v)}
            />
          </div>

          <div className={styles.resultsBar}>
            <p className={styles.resultsCount} role="status" aria-live="polite">
              {loading ? (
                'در حال بارگذاری محصولات…'
              ) : (
                <>
                  <strong>{formatCount(results.length, 'محصول')}</strong>
                  {hasFilters && (
                    <span className={styles.resultsContext}>
                      {query.trim() && <> برای «{query.trim()}»</>}
                      {activeCategory && <> در {activeCategory.name}</>}
                      {lightSource && <> · منبع نور {lightSource === 'LED' ? <bdi className="ltr">LED</bdi> : 'هالوژن'}</>}
                    </span>
                  )}
                </>
              )}
            </p>
            {hasFilters && !loading && (
              <Button variant="tertiary" size="sm" onClick={clearAll}>
                پاک کردن همه فیلترها
              </Button>
            )}
          </div>

          {loading ? (
            <ul role="list" className={styles.grid} aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <CardSkeleton />
                </li>
              ))}
            </ul>
          ) : results.length > 0 ? (
            <ul role="list" className={styles.grid}>
              {results.map((product, i) => (
                <li key={product.slug}>
                  <ProductCard product={product} headingLevel="h2" priority={i < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState query={query.trim()} onReset={clearAll} />
          )}
        </div>
      </section>
    </>
  );
}

function CardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonMedia} />
      <div className={styles.skeletonBody}>
        <span style={{ inlineSize: '35%' }} />
        <span style={{ inlineSize: '75%', blockSize: '1.1rem' }} />
        <span style={{ inlineSize: '55%' }} />
      </div>
    </div>
  );
}

function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className={styles.empty}>
      <SearchX className={styles.emptyIcon} aria-hidden="true" strokeWidth={1.25} />
      <h2 className={styles.emptyTitle}>محصولی با این مشخصات پیدا نشد</h2>
      <p className={styles.emptyText}>
        {query ? (
          <>
            برای «{query}» نتیجه‌ای در فهرست فعلی وجود ندارد.{' '}
          </>
        ) : null}
        املای دیگری را امتحان کنید، فیلترها را کم کنید یا کد قطعه را بدون خط تیره بنویسید. اگر قطعه‌ی خاصی مد نظرتان
        است، آن را در درخواست همکاری عمده ثبت کنید.
      </p>
      <div className={styles.emptyActions}>
        <Button variant="secondary" onClick={onReset}>
          نمایش همه محصولات
        </Button>
        <ButtonLink to="/wholesale" variant="tertiary" arrow>
          درخواست قطعه‌ی خاص
        </ButtonLink>
      </div>
      <p className={styles.emptyHint}>
        دسته‌ها:{' '}
        {categories.map((c, i) => (
          <span key={c.slug}>
            <Link to={`/products?cat=${c.slug}`}>{c.name}</Link>
            {i < categories.length - 1 ? '، ' : ''}
          </span>
        ))}
      </p>
    </div>
  );
}
