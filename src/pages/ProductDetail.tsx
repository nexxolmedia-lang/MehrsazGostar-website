import { Link, useParams } from 'react-router-dom';
import { Info } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { SpecTable } from '../components/SpecTable';
import { SpecValue } from '../components/SpecValue';
import { SampleBadge, SampleNote } from '../components/SampleBadge';
import { ButtonLink } from '../components/Button';
import { getCategory, getProduct, getRelatedProducts, type Product } from '../data/products';
import { NotFound } from './NotFound';
import styles from './ProductDetail.module.css';

export function ProductDetail() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  if (!product) return <NotFound variant="product" />;
  return <ProductView key={product.slug} product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 4);
  const keySpecs = product.specs.filter((s) => s.highlight);
  const inquiryLink = `/wholesale?product=${product.slug}`;

  return (
    <>
      <PageMeta
        title={product.name}
        description={`${product.name}${product.code ? ` (${product.code})` : ''} — ${product.summary} مشخصات فنی و درخواست قیمت عمده.`}
      />

      <div className={styles.page}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'صفحه اصلی', to: '/' },
              { label: 'محصولات', to: '/products' },
              ...(category ? [{ label: category.name, to: `/products?cat=${category.slug}` }] : []),
              { label: product.name },
            ]}
          />

          <article className={styles.product} aria-labelledby="product-title">
            <div className={styles.media}>
              <ProductImage
                image={product.image}
                name={product.name}
                size="detail"
                priority
                className={styles.image}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>

            <div className={styles.info}>
              {category && (
                <Link to={`/products?cat=${category.slug}`} className={styles.category}>
                  {category.name}
                </Link>
              )}
              <h1 id="product-title" className={styles.title}>
                {product.name}
              </h1>

              <div className={styles.identity}>
                {product.code ? (
                  <span>
                    کد محصول: <bdi className={`ltr ${styles.code}`}>{product.code}</bdi>
                  </span>
                ) : (
                  <span>کد محصول ثبت نشده است</span>
                )}
                <SampleBadge />
              </div>

              <p className={styles.summary}>{product.summary}</p>

              {keySpecs.length > 0 && (
                <dl className={styles.keySpecs}>
                  {keySpecs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>
                        <SpecValue spec={spec} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className={styles.inquiry}>
                <p className={styles.priceLabel}>
                  قیمت عمده
                  <span>پس از استعلام اعلام می‌شود</span>
                </p>
                <ButtonLink to={inquiryLink} size="lg" block arrow>
                  استعلام قیمت عمده
                </ButtonLink>
                <ButtonLink to="/products" variant="secondary" size="lg" block>
                  بازگشت به کاتالوگ
                </ButtonLink>
                <p className={styles.inquiryNote}>
                  نام و کد این محصول به‌صورت خودکار در فرم درخواست قرار می‌گیرد.
                </p>
              </div>
            </div>
          </article>

          <div className={styles.details}>
            <section className={styles.specs} aria-labelledby="specs-title">
              <div className={styles.blockHead}>
                <h2 id="specs-title" className={styles.blockTitle}>
                  مشخصات فنی
                </h2>
                <SampleBadge />
              </div>
              <SpecTable specs={product.specs} caption={`مشخصات فنی ${product.name}`} />
              <p className={styles.description}>{product.description}</p>
            </section>

            <section className={styles.compat} aria-labelledby="compat-title">
              <div className={styles.blockHead}>
                <h2 id="compat-title" className={styles.blockTitle}>
                  سازگاری با خودرو
                </h2>
                {product.compatibility && <SampleBadge />}
              </div>
              {product.compatibility && product.compatibility.length > 0 ? (
                <>
                  <ul role="list" className={styles.compatList}>
                    {product.compatibility.map((c) => (
                      <li key={c.vehicle}>
                        <span className={styles.vehicle}>{c.vehicle}</span>
                        {c.years && (
                          <span className={styles.years}>
                            سال‌های <bdi className="ltr">{c.years}</bdi>
                          </span>
                        )}
                        {c.note && <span className={styles.compatNote}>{c.note}</span>}
                      </li>
                    ))}
                  </ul>
                  <SampleNote className={styles.compatDisclaimer}>
                    این فهرست فقط ساختار نمایش سازگاری را نشان می‌دهد و نام خودروها نمونه است.
                  </SampleNote>
                </>
              ) : (
                <div className={styles.compatEmpty}>
                  <Info aria-hidden="true" strokeWidth={1.5} />
                  <div>
                    <p className={styles.compatEmptyTitle}>اطلاعات سازگاری در دسترس نیست</p>
                    <p>
                      برای این محصول سازگاری تأییدشده‌ای ثبت نشده است. مدل و سال خودرو را در{' '}
                      <Link to={inquiryLink}>درخواست استعلام</Link> بنویسید تا پیش از سفارش بررسی شود.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className={styles.stickyBar}>
        <div className={styles.stickyText}>
          <span className={styles.stickyName}>{product.name}</span>
          <span className={styles.stickyPrice}>قیمت عمده: پس از استعلام</span>
        </div>
        <ButtonLink to={inquiryLink} size="sm">
          استعلام قیمت
        </ButtonLink>
      </div>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-title">
          <div className="container">
            <div className={styles.relatedHead}>
              <h2 id="related-title" className="t-section">
                محصولات مرتبط
              </h2>
              <ButtonLink to="/products" variant="tertiary" arrow>
                همه محصولات
              </ButtonLink>
            </div>
            <ul role="list" className={styles.relatedGrid}>
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
