import type { ProductSpec } from '../data/products';
import { SpecValue } from './SpecValue';
import styles from './SpecTable.module.css';

interface SpecTableProps {
  specs: ProductSpec[];
  caption: string;
}

/** Two-column key/value table: always fits narrow screens (values wrap, codes stay isolated). */
export function SpecTable({ specs, caption }: SpecTableProps) {
  return (
    <table className={styles.table}>
      <caption className="visually-hidden">{caption}</caption>
      <tbody>
        {specs.map((spec) => (
          <tr key={spec.label}>
            <th scope="row">{spec.label}</th>
            <td>
              <SpecValue spec={spec} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
