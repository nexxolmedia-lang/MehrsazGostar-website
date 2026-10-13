import { PageMeta } from '../components/PageMeta';
import { ButtonLink } from '../components/Button';
import styles from './NotFound.module.css';

export function NotFound({ variant = 'page' }: { variant?: 'page' | 'product' }) {
  const isProduct = variant === 'product';
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <PageMeta
        title={isProduct ? 'محصول پیدا نشد' : 'صفحه پیدا نشد'}
        description="صفحه‌ی درخواستی در دسترس نیست. از کاتالوگ محصولات یا صفحه‌ی اصلی ادامه دهید."
      />
      <div className={`container ${styles.inner}`}>
        <svg className={styles.mark} viewBox="0 0 240 80" aria-hidden="true" focusable="false">
          <circle cx="200" cy="40" r="26" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="40" r="8" fill="currentColor" />
          <path d="M160 30H96M160 40H60M160 50H96" stroke="var(--brand-titanium)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 8" />
        </svg>
        <p className="eyebrow">خطای ۴۰۴</p>
        <h1 id="nf-title" className={`t-page-title ${styles.title}`}>
          {isProduct ? 'این محصول در کاتالوگ نیست.' : 'این مسیر به جایی روشن نمی‌رسد.'}
        </h1>
        <p className={`t-lead ${styles.text}`}>
          {isProduct
            ? 'ممکن است نشانی اشتباه باشد یا محصول از فهرست نمونه حذف شده باشد. از کاتالوگ برای پیدا کردن قطعه‌ی مشابه استفاده کنید.'
            : 'نشانی واردشده وجود ندارد یا جابه‌جا شده است. از یکی از مسیرهای زیر ادامه دهید.'}
        </p>
        <div className={styles.actions}>
          <ButtonLink to="/products" size="lg" arrow>
            مشاهده محصولات
          </ButtonLink>
          <ButtonLink to="/" size="lg" variant="secondary">
            صفحه اصلی
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
