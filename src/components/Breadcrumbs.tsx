import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسیر صفحه" className={styles.breadcrumbs}>
      <ol role="list">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label}>
              {item.to && !last ? <Link to={item.to}>{item.label}</Link> : <span aria-current={last ? 'page' : undefined}>{item.label}</span>}
              {!last && <ChevronLeft aria-hidden="true" strokeWidth={1.5} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
