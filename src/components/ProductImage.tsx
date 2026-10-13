import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { ProductImage as ProductImageData } from '../data/products';
import styles from './ProductImage.module.css';

interface ProductImageProps {
  image?: ProductImageData;
  /** Fallback alt text when the image is missing. */
  name: string;
  size?: 'card' | 'detail' | 'feature';
  priority?: boolean;
  /** Sizes hint for responsive photography (used once real srcSet images exist). */
  sizes?: string;
  className?: string;
}

/**
 * Consistent product framing: fixed 4:3 frame, neutral light field, object-fit: contain.
 * Handles loading, missing-image and failed-image states, and labels temporary renderings.
 */
export function ProductImage({ image, name, size = 'card', priority, sizes, className }: ProductImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const missing = !image || status === 'error';

  return (
    <div className={`${styles.frame} ${styles[size]} ${className ?? ''}`} data-status={missing ? 'missing' : status}>
      {missing ? (
        <div className={styles.missing} role="img" aria-label={`تصویر «${name}» در دسترس نیست`}>
          <ImageOff aria-hidden="true" strokeWidth={1.25} />
          <span>تصویر محصول در دسترس نیست</span>
        </div>
      ) : (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.srcSet ? sizes : undefined}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          ref={(el) => {
            // Cached images may finish before React attaches onLoad.
            if (el?.complete && el.naturalWidth > 0 && status === 'loading') setStatus('loaded');
          }}
        />
      )}
      {!missing && image.isPlaceholder && <span className={styles.tag}>رندر نمایشی</span>}
    </div>
  );
}
