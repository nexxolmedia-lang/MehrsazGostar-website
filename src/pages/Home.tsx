import { useId, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { ButtonLink, Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { SampleBadge } from '../components/SampleBadge';
import { productImages } from '../data/images';
import { categories, getFeaturedProducts, getProduct, getProductsByCategory } from '../data/products';
import { formatCount, toPersianDigits } from '../lib/persian';
import styles from './Home.module.css';

const heroProduct = getProduct('projector-headlamp-led')!;

const exampleSearches = [
  { label: 'H7', to: '/products?q=H7', ltr: true },
  { label: 'مه‌شکن', to: '/products?cat=fog-lamps' },
  { label: 'LED', to: '/products?source=LED', ltr: true },
  { label: 'چراغ عقب', to: '/products?cat=tail-lamps' },
];

const principles = [
  {
    title: 'مشخصات، نه ادعا',
    text: 'برای هر محصول فقط مشخصاتی نمایش داده می‌شود که اطلاعات آن موجود است. اگر داده‌ای در دسترس نباشد، صفحه این را صریحاً اعلام می‌کند.',
  },
  {
    title: 'سازگاری، فقط با داده‌ی ثبت‌شده',
    text: 'سازگاری با خودرو از روی ظاهر یا حدس تعیین نمی‌شود؛ تنها وقتی نمایش داده می‌شود که در اطلاعات محصول ثبت شده باشد.',
  },
  {
    title: 'کد محصول، زبان مشترک',
    text: 'هر قطعه با کد مشخص شناسایی می‌شود تا جستجو، استعلام و سفارش عمده بدون ابهام انجام شود.',
  },
  {
    title: 'استعلام ساختاریافته',
    text: 'درخواست همکاری با نوع کسب‌وکار، شهر و محصولات مورد نیاز ثبت می‌شود تا پاسخ دقیق و قابل پیگیری باشد.',
  },
];

const wholesaleSteps = [
  { title: 'ثبت درخواست', text: 'مشخصات کسب‌وکار و محصولات مورد نیاز را در فرم وارد می‌کنید.' },
  { title: 'بررسی نیاز', text: 'درخواست بر اساس دسته‌بندی، کد محصول و حجم مورد نظر بررسی می‌شود.' },
  { title: 'هماهنگی شرایط', text: 'قیمت عمده و شرایط همکاری از طریق تماس مستقیم هماهنگ می‌شود.' },
];

export function Home() {
  const featured = getFeaturedProducts();
  const [primaryCategory, ...otherCategories] = categories;

  return (
    <>
      <PageMeta
        title="مهرساز گستر"
        description="کاتالوگ چراغ‌ها و قطعات روشنایی خودرو مهرساز گستر؛ جستجو با نام، کد یا دسته‌بندی و درخواست همکاری عمده."
      />

      {/* ---------- Hero ---------- */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className="eyebrow">قطعات روشنایی خودرو</p>
            <h1 id="hero-title" className={`t-hero ${styles.heroTitle}`}>
              <span>نور دقیق.</span>
              <span className={styles.heroTitleLight}>انتخاب مطمئن.</span>
            </h1>
            <p className={`t-lead ${styles.heroLead}`}>
              کاتالوگ چراغ‌ها و قطعات روشنایی خودرو با مشخصات فنی شفاف. محصول مورد نیازتان را با نام، کد یا دسته‌بندی
              پیدا کنید و برای خرید عمده مستقیم درخواست بدهید.
            </p>
            <div className={styles.heroActions}>
              <ButtonLink to="/products" size="lg" arrow>
                مشاهده محصولات
              </ButtonLink>
              <ButtonLink to="/wholesale" size="lg" variant="secondary">
                همکاری عمده
              </ButtonLink>
            </div>
          </div>

          <figure className={styles.heroVisual}>
            <div className={styles.heroStage}>
              <div className={styles.heroImageWrap}>
                <img
                  src={heroProduct.image!.src}
                  alt={heroProduct.image!.alt}
                  width={800}
                  height={600}
                  fetchPriority="high"
                  className={styles.heroImage}
                />
                <span
                  className={styles.sweep}
                  style={{ ['--sweep-mask' as string]: `url("${heroProduct.image!.src}")` }}
                  aria-hidden="true"
                />
                <ul className={styles.callouts} aria-hidden="true">
                  <li className={styles.callout} style={{ left: '30.75%', top: '53.7%', height: '21%' }} data-side="down">
                    <span>عدسی پروژکتور</span>
                  </li>
                  <li className={styles.callout} style={{ left: '46%', top: '17%', height: '18.9%' }} data-side="up">
                    <span>
                      نوار نور روز <bdi className="ltr">DRL</bdi>
                    </span>
                  </li>
                  <li className={styles.callout} style={{ left: '75%', top: '15%', height: '28%' }} data-side="up">
                    <span>بخش راهنما</span>
                  </li>
                </ul>
              </div>
            </div>
            <figcaption className={styles.heroCaption}>
              <span>
                <bdi className="ltr">{heroProduct.code}</bdi> · {heroProduct.name}
              </span>
              <span className={styles.heroCaptionNote}>رندر نمایشی موقت، جایگزین عکس واقعی محصول</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- Product finder ---------- */}
      <ProductFinder />

      {/* ---------- Categories ---------- */}
      <section id="categories" className={styles.categories} aria-labelledby="categories-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <div>
              <p className="eyebrow">دسته‌بندی‌ها</p>
              <h2 id="categories-title" className="t-section">
                از چراغ جلو تا راهنما
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              محصولات در پنج خانواده‌ی اصلی مرتب شده‌اند تا مسیر پیدا کردن قطعه، از نوع چراغ شروع شود.
            </p>
          </header>

          <div className={styles.categoryGrid}>
            <Link to={`/products?cat=${primaryCategory.slug}`} className={`${styles.categoryFeature} reveal`}>
              <div className={styles.categoryFeatureMedia}>
                <img src={primaryCategory.image} alt="" width={800} height={600} loading="lazy" />
              </div>
              <div className={styles.categoryFeatureBody}>
                <span className={styles.categoryCount}>
                  {formatCount(getProductsByCategory(primaryCategory.slug).length, 'محصول نمونه')}
                </span>
                <h3 className="t-category">{primaryCategory.name}</h3>
                <p>{primaryCategory.description}</p>
                <span className={styles.categoryAction}>
                  مشاهده‌ی دسته
                  <ArrowLeft aria-hidden="true" strokeWidth={1.75} />
                </span>
              </div>
            </Link>

            <ul role="list" className={styles.categoryList}>
              {otherCategories.map((category) => (
                <li key={category.slug} className="reveal">
                  <Link to={`/products?cat=${category.slug}`} className={styles.categoryRow}>
                    <span className={styles.categoryThumb} aria-hidden="true">
                      <img src={category.image} alt="" width={800} height={600} loading="lazy" />
                    </span>
                    <span className={styles.categoryRowText}>
                      <span className={styles.categoryRowName}>{category.name}</span>
                      <span className={styles.categoryRowDesc}>{category.description}</span>
                    </span>
                    <span className={styles.categoryRowCount}>
                      {formatCount(getProductsByCategory(category.slug).length, 'محصول')}
                    </span>
                    <ArrowLeft className={styles.categoryRowArrow} aria-hidden="true" strokeWidth={1.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Featured products ---------- */}
      <section className={styles.featured} aria-labelledby="featured-title">
        <div className="container">
          <header className={`${styles.sectionHead} reveal`}>
            <div>
              <p className="eyebrow">منتخب کاتالوگ</p>
              <h2 id="featured-title" className="t-section">
                محصولاتی برای شروع
              </h2>
            </div>
            <div className={styles.featuredHeadSide}>
              <SampleBadge />
              <ButtonLink to="/products" variant="tertiary" arrow>
                همه محصولات
              </ButtonLink>
            </div>
          </header>

          <div className={styles.featuredGrid}>
            <div className={`${styles.featuredLead} reveal`}>
              <ProductCard product={featured[0]} variant="feature" />
            </div>
            {featured.slice(1).map((product) => (
              <div key={product.slug} className={`${styles.featuredItem} reveal`}>
                <ProductCard product={product} />
              </div>
            ))}
            <aside className={`${styles.featuredAside} reveal`} aria-labelledby="custom-request">
              <h3 id="custom-request" className={styles.asideTitle}>
                قطعه‌ی مورد نظرتان را پیدا نکردید؟
              </h3>
              <p>
                کد قطعه، نام محصول یا مشخصات خودرو را در درخواست همکاری بنویسید تا بررسی شود.
              </p>
              <ButtonLink to="/wholesale" variant="secondary" arrow>
                ثبت درخواست
              </ButtonLink>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- Approach / credibility ---------- */}
      <section id="approach" className={styles.approach} aria-labelledby="approach-title">
        <div className={`container ${styles.approachGrid}`}>
          <div className={`${styles.approachHead} reveal`}>
            <p className="eyebrow eyebrow--on-ink">رویکرد ما</p>
            <h2 id="approach-title" className={`t-section ${styles.approachTitle}`}>
              شفافیت، پیش از فروش.
            </h2>
            <p className={styles.approachLead}>
              در خرید قطعات روشنایی، یک مشخصه‌ی اشتباه یعنی برگشت کالا و از دست رفتن اعتماد. این کاتالوگ بر چند اصل
              ساده بنا شده است.
            </p>
            <BeamRule />
          </div>

          <ol className={styles.principles} role="list">
            {principles.map((p, i) => (
              <li key={p.title} className={`${styles.principle} reveal`}>
                <span className={styles.principleIndex} aria-hidden="true">
                  {toPersianDigits(`0${i + 1}`)}
                </span>
                <div>
                  <h3 className={styles.principleTitle}>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={`${styles.verifiedSlot} reveal`}>
            <p className={styles.verifiedLabel}>جای اطلاعات تأییدشده</p>
            <p>
              سابقه‌ی فعالیت، گواهینامه‌ها و همکاران تجاری مهرساز گستر پس از دریافت و تأیید اطلاعات رسمی در این بخش
              نمایش داده می‌شود.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Wholesale ---------- */}
      <section className={styles.wholesale} aria-labelledby="wholesale-title">
        <div className="container">
          <div className={styles.wholesalePanel}>
            <div className={styles.wholesaleText}>
              <p className="eyebrow">برای فروشگاه‌ها، پخش‌کننده‌ها و تعمیرگاه‌ها</p>
              <h2 id="wholesale-title" className={`t-section ${styles.wholesaleTitle}`}>
                همکاری عمده،
                <br />
                با یک درخواست روشن.
              </h2>
              <ol className={styles.steps} role="list">
                {wholesaleSteps.map((step, i) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {toPersianDigits(i + 1)}
                    </span>
                    <div>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className={styles.wholesaleActions}>
                <ButtonLink to="/wholesale" size="lg" arrow>
                  ثبت درخواست همکاری
                </ButtonLink>
                <span className={styles.wholesaleNote}>فرایند پیشنهادی؛ پس از تأیید شرکت نهایی می‌شود.</span>
              </div>
            </div>
            <div className={styles.wholesaleVisual} aria-hidden="true">
              <img src={productImages.tailLampBar} alt="" width={800} height={600} loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductFinder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const inputId = useId();
  const selectId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category) params.set('cat', category);
    const qs = params.toString();
    navigate(qs ? `/products?${qs}` : '/products');
  };

  return (
    <section className={styles.finder} aria-labelledby="finder-title">
      <div className="container">
        <div className={styles.finderPanel}>
          <h2 id="finder-title" className={styles.finderTitle}>
            دنبال چه قطعه‌ای هستید؟
          </h2>
          <form role="search" className={styles.finderForm} onSubmit={submit}>
            <div className={styles.finderField}>
              <label htmlFor={inputId} className={styles.finderLabel}>
                نام، کد یا پایه لامپ
              </label>
              <div className={styles.finderInputWrap}>
                <Search aria-hidden="true" strokeWidth={1.75} />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثلاً چراغ جلو پروژکتوری"
                  autoComplete="off"
                  enterKeyHint="search"
                />
              </div>
            </div>
            <div className={`${styles.finderField} ${styles.finderSelectField}`}>
              <label htmlFor={selectId} className={styles.finderLabel}>
                دسته‌بندی
              </label>
              <select id={selectId} value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">همه دسته‌ها</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" size="lg" className={styles.finderSubmit}>
              جستجو
            </Button>
          </form>
          <div className={styles.finderExamples}>
            <span>نمونه جستجو:</span>
            <ul role="list">
              {exampleSearches.map((s) => (
                <li key={s.label}>
                  <Link to={s.to} className={styles.finderChip}>
                    {s.ltr ? <bdi className="ltr">{s.label}</bdi> : s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Decorative optical-bench rule: measured ticks with one luminous mark. */
function BeamRule() {
  return (
    <svg className={styles.beamRule} viewBox="0 0 320 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <line x1="0" y1="12" x2="320" y2="12" stroke="currentColor" strokeOpacity=".35" />
      {Array.from({ length: 17 }, (_, i) => (
        <line
          key={i}
          x1={i * 20}
          x2={i * 20}
          y1={i % 4 === 0 ? 4 : 8}
          y2={i % 4 === 0 ? 20 : 16}
          stroke="currentColor"
          strokeOpacity={i % 4 === 0 ? 0.6 : 0.3}
        />
      ))}
      <rect x="296" y="9" width="24" height="6" rx="3" fill="var(--brand-ice)" />
    </svg>
  );
}
