import { useId } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hideLabel?: boolean;
}

export function SearchBox({ label, value, onChange, placeholder, hideLabel }: SearchBoxProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={hideLabel ? 'visually-hidden' : styles.label}>
        {label}
      </label>
      <div className={styles.control}>
        <Search className={styles.icon} aria-hidden="true" strokeWidth={1.75} />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="search"
          className={styles.input}
        />
        {value && (
          <button type="button" className={styles.clear} onClick={() => onChange('')}>
            <X aria-hidden="true" strokeWidth={1.75} />
            <span className="visually-hidden">پاک کردن جستجو</span>
          </button>
        )}
      </div>
    </div>
  );
}
