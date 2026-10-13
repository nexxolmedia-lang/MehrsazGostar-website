import { Link, NavLink } from 'react-router-dom';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import { navItems } from './navigation';
import { useModalDialog } from '../hooks/useModalDialog';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({ open, onClose, onOpenSearch }: MobileMenuProps) {
  const ref = useModalDialog(open, onClose);

  return (
    <dialog ref={ref} id="mobile-menu" className={styles.sheet} aria-label="منوی اصلی">
      <div className={styles.top}>
        <Logo />
        <button type="button" className={styles.close} onClick={() => ref.current?.close()}>
          <X aria-hidden="true" strokeWidth={1.75} />
          <span className="visually-hidden">بستن منو</span>
        </button>
      </div>

      <button
        type="button"
        className={styles.search}
        onClick={() => {
          ref.current?.close();
          onOpenSearch();
        }}
      >
        <Search aria-hidden="true" strokeWidth={1.75} />
        جستجوی محصول
      </button>

      <nav aria-label="منوی موبایل" className={styles.nav}>
        <ul role="list">
          <li>
            <NavLink to="/" end className={styles.link}>
              صفحه اصلی
              <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
            </NavLink>
          </li>
          {navItems.map((item) => (
            <li key={item.to}>
              {item.to.includes('#') ? (
                <Link to={item.to} className={styles.link} onClick={() => ref.current?.close()}>
                  {item.label}
                  <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
                </Link>
              ) : (
                <NavLink to={item.to} className={styles.link}>
                  {item.label}
                  <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.bottom}>
        <p className={styles.note}>برای فروشگاه‌ها، پخش‌کننده‌ها و تعمیرگاه‌ها</p>
        <ButtonLink to="/wholesale" size="lg" block arrow>
          درخواست همکاری عمده
        </ButtonLink>
      </div>
    </dialog>
  );
}
