import { Link } from 'react-router-dom';
import { categories } from '../data/products';
import { Logo } from './Logo';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo tone="light" />
          <p className={styles.statement}>
            کاتالوگ چراغ‌ها و قطعات روشنایی خودرو، با مشخصات روشن و مسیر مستقیم برای همکاری عمده.
          </p>
        </div>

        <nav aria-labelledby="footer-catalog" className={styles.col}>
          <h2 id="footer-catalog" className={styles.heading}>
            کاتالوگ
          </h2>
          <ul role="list">
            <li>
              <Link to="/products">همه محصولات</Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/products?cat=${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-business" className={styles.col}>
          <h2 id="footer-business" className={styles.heading}>
            همکاری
          </h2>
          <ul role="list">
            <li>
              <Link to="/wholesale">درخواست همکاری عمده</Link>
            </li>
            <li>
              <Link to="/#approach">رویکرد کاتالوگ</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>اطلاعات تماس</h2>
          <p className={styles.pending}>
            نشانی، تلفن و ساعات پاسخ‌گویی پس از تأیید اطلاعات رسمی مهرساز گستر در این بخش درج می‌شود.
          </p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© مهرساز گستر</p>
        <p>
          نسخه‌ی نمایشی، طراحی‌شده توسط <span lang="en" className="ltr">Nexxol Media</span> · محصولات، مشخصات، تصاویر و
          نشانه‌ی این صفحه نمونه و موقت هستند.
        </p>
      </div>
    </footer>
  );
}
