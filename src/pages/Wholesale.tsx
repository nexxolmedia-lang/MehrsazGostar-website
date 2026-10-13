import { useSearchParams } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InquiryForm } from '../components/InquiryForm';
import { getProduct } from '../data/products';
import { toPersianDigits } from '../lib/persian';
import styles from './Wholesale.module.css';

const audiences = ['فروشگاه‌های لوازم یدکی', 'عمده‌فروشان و پخش‌کننده‌ها', 'تعمیرگاه‌ها و مراکز خدمات خودرو'];

const process = [
  { title: 'ثبت درخواست', text: 'مشخصات کسب‌وکار و محصولات مورد نیاز را در همین فرم وارد می‌کنید.' },
  { title: 'بررسی نیاز', text: 'درخواست بر اساس دسته‌بندی، کد محصول و حجم مورد نظر بررسی می‌شود.' },
  { title: 'تماس و هماهنگی', text: 'قیمت عمده، موجودی و شرایط همکاری از طریق تماس مستقیم هماهنگ می‌شود.' },
];

export function Wholesale() {
  const [params] = useSearchParams();
  const product = getProduct(params.get('product') ?? '');

  return (
    <>
      <PageMeta
        title="همکاری عمده"
        description="درخواست همکاری عمده با مهرساز گستر برای فروشگاه‌های لوازم یدکی، پخش‌کننده‌ها و تعمیرگاه‌ها."
      />

      <div className={styles.page}>
        <div className={`container ${styles.grid}`}>
          <header className={styles.intro}>
            <Breadcrumbs items={[{ label: 'صفحه اصلی', to: '/' }, { label: 'همکاری عمده' }]} />
            <h1 className={`t-page-title ${styles.title}`}>
              تأمین عمده،
              <br />
              با مشخصات روشن.
            </h1>
            <p className={`t-lead ${styles.lead}`}>
              اگر قطعات روشنایی خودرو را برای فروش یا نصب تهیه می‌کنید، نیاز خود را یک‌بار و دقیق ثبت کنید تا قیمت و
              شرایط همکاری بر همان اساس اعلام شود.
            </p>
          </header>

          <aside className={styles.aside} aria-label="درباره همکاری عمده">
            <section aria-labelledby="audience-title" className={styles.block}>
              <h2 id="audience-title" className={styles.blockTitle}>
                مناسب برای
              </h2>
              <ul role="list" className={styles.audience}>
                {audiences.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="process-title" className={styles.block}>
              <h2 id="process-title" className={styles.blockTitle}>
                پس از ثبت درخواست
                <span className={styles.blockNote}>فرایند پیشنهادی</span>
              </h2>
              <ol role="list" className={styles.process}>
                {process.map((step, i) => (
                  <li key={step.title}>
                    <span className={styles.processIndex} aria-hidden="true">
                      {toPersianDigits(i + 1)}
                    </span>
                    <div>
                      <h3 className={styles.processTitle}>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="tips-title" className={styles.block}>
              <h2 id="tips-title" className={styles.blockTitle}>
                برای پاسخ دقیق‌تر
              </h2>
              <p className={styles.tips}>
                کد قطعه یا نام دقیق محصول، تعداد تقریبی و — در صورت نیاز به بررسی سازگاری — مدل و سال خودرو را در
                توضیحات بنویسید.
              </p>
            </section>
          </aside>

          <section className={styles.formCard} aria-labelledby="form-title">
            <h2 id="form-title" className={styles.formTitle}>
              فرم درخواست همکاری
            </h2>
            <InquiryForm key={product?.slug ?? 'none'} product={product} />
          </section>
        </div>
      </div>
    </>
  );
}
