import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import { SearchDialog } from './SearchDialog';
import { MobileMenu } from './MobileMenu';
import { useScrolled } from '../hooks/useScrolled';
import { navItems } from './navigation';
import styles from './Header.module.css';

export function Header() {
  const scrolled = useScrolled();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close overlays on navigation.
  useEffect(() => {
    setSearchOpen(false);
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // "/" keyboard shortcut opens search (unless typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) && !target.isContentEditable) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="مهرساز گستر — صفحه اصلی">
          <Logo />
        </Link>

        <nav className={styles.nav} aria-label="منوی اصلی">
          <ul role="list" className={styles.navList}>
            {navItems.map((item) =>
              item.to.includes('#') ? (
                <li key={item.to}>
                  <Link to={item.to} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.searchTrigger}
            onClick={() => setSearchOpen(true)}
            aria-haspopup="dialog"
          >
            <Search aria-hidden="true" strokeWidth={1.75} />
            <span className={styles.searchLabel}>جستجوی محصول</span>
            <kbd className={styles.kbd} aria-hidden="true">
              /
            </kbd>
          </button>
          <ButtonLink to="/wholesale" size="sm" className={styles.cta}>
            همکاری عمده
          </ButtonLink>
          <button
            type="button"
            className={styles.menuTrigger}
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu aria-hidden="true" strokeWidth={1.75} />
            <span className="visually-hidden">باز کردن منو</span>
          </button>
        </div>
      </div>

      <SearchDialog open={searchOpen} onClose={closeSearch} />
      <MobileMenu open={menuOpen} onClose={closeMenu} onOpenSearch={() => setSearchOpen(true)} />
    </header>
  );
}
