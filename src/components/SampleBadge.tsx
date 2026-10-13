import type { ReactNode } from 'react';
import { FlaskConical } from 'lucide-react';
import styles from './SampleBadge.module.css';

interface SampleBadgeProps {
  label?: string;
  className?: string;
}

/** Marks illustrative content. Uses text + icon, never color alone. */
export function SampleBadge({ label = 'داده نمونه', className }: SampleBadgeProps) {
  return (
    <span className={`${styles.badge} ${className ?? ''}`}>
      <FlaskConical aria-hidden="true" strokeWidth={1.75} />
      {label}
    </span>
  );
}

interface SampleNoteProps {
  children: ReactNode;
  className?: string;
}

export function SampleNote({ children, className }: SampleNoteProps) {
  return (
    <p className={`${styles.note} ${className ?? ''}`}>
      <SampleBadge />
      <span>{children}</span>
    </p>
  );
}
