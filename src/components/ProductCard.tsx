import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCategory, type Product } from '../data/products';
import { ProductImage } from './ProductImage';
import { SpecValue } from './SpecValue';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  variant?: 'standard' | 'feature';
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
}

export function ProductCard({ product, variant = 'standard', headingLevel: Heading = 'h3', priority }: ProductCardProps) {
  const category = getCategory(product.category);
  const keySpecs = product.specs.filter((s) => s.highlight).slice(0, 2);
  const isFeature = variant === 'feature';

  return (
    <article className={`${styles.card} ${isFeature ? styles.feature : ''}`}>
      <ProductImage
        image={product.image}
        name={product.name}
        size={isFeature ? 'feature' : 'card'}
        priority={priority}
        className={styles.media}
        sizes={isFeature ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 600px) 50vw, 100vw'}
      />
      <div className={styles.body}>
        <div className={styles.meta}>
          {category && <span className={styles.category}>{category.name}</span>}
          {product.code && <span className={`ltr ${styles.code}`}>{product.code}</span>}
        </div>
        <Heading className={styles.title}>
          <Link to={`/products/${product.slug}`} className={styles.link}>
            {product.name}
          </Link>
        </Heading>
        {isFeature && <p className={styles.summary}>{product.summary}</p>}
        {keySpecs.length > 0 && (
          <dl className={styles.specs}>
            {keySpecs.map((spec) => (
              <div key={spec.label} className={styles.spec}>
                <dt>{spec.label}</dt>
                <dd>
                  <SpecValue spec={spec} />
                </dd>
              </div>
            ))}
          </dl>
        )}
        <span className={styles.action} aria-hidden="true">
          مشاهده مشخصات
          <ArrowLeft strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}
