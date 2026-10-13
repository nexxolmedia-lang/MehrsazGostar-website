import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'onInk';
type Size = 'sm' | 'md' | 'lg';

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
}

export function buttonClass({ variant = 'primary', size = 'md', block, className }: StyleOptions = {}) {
  return [styles.button, styles[variant], size !== 'md' && styles[size], block && styles.block, className]
    .filter(Boolean)
    .join(' ');
}

function Content({ children, arrow, loading }: { children: ReactNode; arrow?: boolean; loading?: boolean }) {
  return (
    <>
      {loading && <LoaderCircle className={styles.spinner} aria-hidden="true" />}
      <span>{children}</span>
      {arrow && !loading && <ArrowLeft className={styles.arrow} aria-hidden="true" strokeWidth={1.75} />}
    </>
  );
}

type ButtonLinkProps = LinkProps & StyleOptions & { arrow?: boolean };

export function ButtonLink({ variant, size, block, className, arrow, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClass({ variant, size, block, className })} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleOptions & { arrow?: boolean; loading?: boolean };

export function Button({ variant, size, block, className, arrow, loading, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, block, className })}
      aria-busy={loading || undefined}
      {...rest}
    >
      <Content arrow={arrow} loading={loading}>
        {children}
      </Content>
    </button>
  );
}
