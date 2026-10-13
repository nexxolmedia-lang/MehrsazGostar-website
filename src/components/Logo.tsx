import styles from './Logo.module.css';

interface LogoProps {
  tone?: 'ink' | 'light';
}

/**
 * Temporary wordmark for the prototype — to be replaced by the official Mehrsaz Gostar logo.
 * The mark: a lens (circle) emitting three measured beams toward the reading direction.
 */
export function Logo({ tone = 'ink' }: LogoProps) {
  return (
    <span className={`${styles.logo} ${tone === 'light' ? styles.light : ''}`}>
      <svg className={styles.mark} viewBox="0 0 40 28" aria-hidden="true" focusable="false">
        <circle cx="26" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <circle cx="26" cy="14" r="3.4" fill="currentColor" />
        <path d="M2 9h9M0 14h11M2 19h9" stroke="var(--logo-beam)" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className={styles.text}>
        <span className={styles.name}>مهرساز گستر</span>
        <span className={styles.tagline}>روشنایی خودرو</span>
      </span>
    </span>
  );
}
