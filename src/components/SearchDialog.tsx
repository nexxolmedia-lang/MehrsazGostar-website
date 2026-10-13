import { useId, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { categories, products } from '../data/products';
import { searchProducts } from '../lib/search';
import { toPersianDigits } from '../lib/persian';
import { useModalDialog } from '../hooks/useModalDialog';
import styles from './SearchDialog.module.css';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const MAX_SUGGESTIONS = 5;

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const ref = useModalDialog(open, onClose);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputId = useId();
  const resultsId = useId();

  const results = useMemo(() => (query.trim() ? searchProducts(products, query) : []), [query]);

  const goToCatalog = () => {
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    setQuery('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    goToCatalog();
  };

  return (
    <dialog ref={ref} className={styles.dialog} aria-labelledby={inputId}>
      <div className={styles.panel}>
        <form role="search" className={styles.form} onSubmit={submit}>
          <label htmlFor={inputId} className="visually-hidden">
            جستجوی محصول با نام، کد یا دسته‌بندی
          </label>
          <Search className={styles.icon} aria-hidden="true" strokeWidth={1.75} />
          <input
            id={inputId}
            className={styles.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="نام محصول، کد یا پایه لامپ…"
            autoComplete="off"
            enterKeyHint="search"
            aria-controls={resultsId}
            autoFocus
          />
          <button type="button" className={styles.close} onClick={() => ref.current?.close()}>
            <X aria-hidden="true" strokeWidth={1.75} />
            <span className="visually-hidden">بستن جستجو</span>
          </button>
        </form>

        <div id={resultsId} className={styles.body} aria-live="polite">
          {!query.trim() && (
            <div>
              <p className={styles.groupLabel}>دسته‌بندی‌ها</p>
              <ul role="list" className={styles.chips}>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link to={`/products?cat=${c.slug}`} className={styles.chip}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={styles.hint}>
                مثلاً جستجو کنید: <span className="ltr">H7</span>، «مه‌شکن» یا <span className="ltr">DEMO-HL-101</span>
              </p>
            </div>
          )}

          {query.trim() && results.length > 0 && (
            <>
              <p className={styles.groupLabel}>
                {toPersianDigits(results.length)} نتیجه
                <span className={styles.sample}> · داده نمونه</span>
              </p>
              <ul role="list" className={styles.results}>
                {results.slice(0, MAX_SUGGESTIONS).map((p) => (
                  <li key={p.slug}>
                    <Link to={`/products/${p.slug}`} className={styles.result}>
                      <span className={styles.thumb} aria-hidden="true">
                        {p.image && <img src={p.image.src} alt="" width={64} height={48} />}
                      </span>
                      <span className={styles.resultText}>
                        <span className={styles.resultName}>{p.name}</span>
                        {p.code && <span className={`ltr ${styles.resultCode}`}>{p.code}</span>}
                      </span>
                      <ArrowLeft className={styles.resultArrow} aria-hidden="true" strokeWidth={1.75} />
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="button" className={styles.all} onClick={goToCatalog}>
                مشاهده همه نتایج در کاتالوگ
                <ArrowLeft aria-hidden="true" strokeWidth={1.75} />
              </button>
            </>
          )}

          {query.trim() && results.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>نتیجه‌ای برای «{query.trim()}» پیدا نشد.</p>
              <p className={styles.hint}>
                املای دیگری را امتحان کنید یا <Link to="/products">همه محصولات</Link> را ببینید.
              </p>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
