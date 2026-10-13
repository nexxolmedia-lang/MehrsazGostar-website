import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CircleCheck, X } from 'lucide-react';
import { categories, type Product } from '../data/products';
import { iranianMobile, maxLength, minLength, required, validate, type FieldValidator } from '../lib/validators';
import { toPersianDigits } from '../lib/persian';
import { Button, ButtonLink } from './Button';
import { SampleBadge } from './SampleBadge';
import styles from './InquiryForm.module.css';

type FieldName = 'fullName' | 'company' | 'phone' | 'city' | 'businessType' | 'message';

type Values = Record<FieldName, string> & { interests: string[] };

const MESSAGE_MAX = 600;

export const businessTypes = [
  'فروشگاه لوازم یدکی',
  'عمده‌فروش / پخش‌کننده',
  'تعمیرگاه یا مرکز خدمات خودرو',
  'نمایندگی خودرو',
  'سایر',
];

const rules: Record<FieldName, FieldValidator[]> = {
  fullName: [required('نام و نام خانوادگی را وارد کنید.'), minLength(3, 'نام باید دست‌کم ۳ حرف باشد.')],
  company: [required('نام فروشگاه یا شرکت را وارد کنید.')],
  phone: [required('شماره موبایل را وارد کنید.'), iranianMobile('شماره موبایل معتبر نیست؛ ۱۱ رقم و با ۰۹ شروع شود.')],
  city: [required('شهر را وارد کنید.')],
  businessType: [required('نوع کسب‌وکار را انتخاب کنید.')],
  message: [maxLength(MESSAGE_MAX, `توضیحات حداکثر ${toPersianDigits(MESSAGE_MAX)} نویسه است.`)],
};

const fieldOrder: FieldName[] = ['fullName', 'company', 'phone', 'city', 'businessType', 'message'];

interface InquiryFormProps {
  product?: Product;
}

export function InquiryForm({ product }: InquiryFormProps) {
  const [values, setValues] = useState<Values>({
    fullName: '',
    company: '',
    phone: '',
    city: '',
    businessType: '',
    message: '',
    interests: product ? [product.category] : [],
  });
  const [linkedProduct, setLinkedProduct] = useState<Product | undefined>(product);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'demo-complete'>('idle');
  const [summaryCount, setSummaryCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;

  useEffect(() => {
    if (status === 'demo-complete') resultRef.current?.focus();
  }, [status]);

  const setField = (name: FieldName, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validate(value, rules[name]) ?? undefined }));
  };

  const blurField = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validate(values[name], rules[name]) ?? undefined }));
  };

  const toggleInterest = (slug: string) =>
    setValues((v) => ({
      ...v,
      interests: v.interests.includes(slug) ? v.interests.filter((s) => s !== slug) : [...v.interests, slug],
    }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const name of fieldOrder) {
      const error = validate(values[name], rules[name]);
      if (error) nextErrors[name] = error;
    }
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fieldOrder.map((n) => [n, true])));
    const invalid = fieldOrder.filter((n) => nextErrors[n]);
    setSummaryCount(invalid.length);
    if (invalid.length) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(invalid[0]))}`)?.focus();
      return;
    }
    // Demo only: nothing is sent or stored.
    setStatus('submitting');
    window.setTimeout(() => setStatus('demo-complete'), 900);
  };

  if (status === 'demo-complete') {
    return (
      <DemoResult
        headingRef={resultRef}
        values={values}
        product={linkedProduct}
        onEdit={() => {
          setStatus('idle');
          setSummaryCount(0);
        }}
      />
    );
  }

  const hints: Partial<Record<FieldName, string>> = {
    phone: 'مثلاً ۰۹۱۲ ۰۰۰ ۰۰۰۰',
    message: `کد قطعه، تعداد تقریبی یا مدل خودرو را بنویسید. ${toPersianDigits(values.message.length)} از ${toPersianDigits(MESSAGE_MAX)} نویسه`,
  };

  const fieldProps = (name: FieldName) => ({
    id: id(name),
    name,
    value: values[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': [errors[name] ? id(`${name}-error`) : '', hints[name] ? id(`${name}-hint`) : ''].filter(Boolean).join(' ') || undefined,
    onBlur: () => blurField(name),
  });

  return (
    <form ref={formRef} className={styles.form} onSubmit={submit} noValidate aria-describedby={id('demo-note')}>
      <p id={id('demo-note')} className={styles.demoNote}>
        <SampleBadge label="فرم نمایشی" />
        <span>این فرم در نسخه‌ی نمایشی به جایی ارسال نمی‌شود.</span>
      </p>

      {summaryCount > 0 && (
        <div className={styles.summary} role="alert">
          <AlertCircle aria-hidden="true" strokeWidth={1.75} />
          {toPersianDigits(summaryCount)} مورد نیاز به اصلاح دارد.
        </div>
      )}

      {linkedProduct && (
        <div className={styles.linked}>
          <span className={styles.linkedLabel}>محصول مورد نظر</span>
          <span className={styles.linkedName}>
            {linkedProduct.name}
            {linkedProduct.code && (
              <>
                {' '}
                <bdi className="ltr">{linkedProduct.code}</bdi>
              </>
            )}
          </span>
          <button type="button" className={styles.linkedRemove} onClick={() => setLinkedProduct(undefined)}>
            <X aria-hidden="true" strokeWidth={1.75} />
            <span className="visually-hidden">حذف محصول از درخواست</span>
          </button>
        </div>
      )}

      <div className={styles.grid}>
        <Field label="نام و نام خانوادگی" htmlFor={id('fullName')} error={errors.fullName} errorId={id('fullName-error')} required>
          <input type="text" autoComplete="name" {...fieldProps('fullName')} onChange={(e) => setField('fullName', e.target.value)} />
        </Field>

        <Field label="نام فروشگاه یا شرکت" htmlFor={id('company')} error={errors.company} errorId={id('company-error')} required>
          <input type="text" autoComplete="organization" {...fieldProps('company')} onChange={(e) => setField('company', e.target.value)} />
        </Field>

        <Field
          label="شماره موبایل"
          htmlFor={id('phone')}
          error={errors.phone}
          errorId={id('phone-error')}
          hint={hints.phone}
          hintId={id('phone-hint')}
          required
        >
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className={styles.ltrInput}
            {...fieldProps('phone')}
            onChange={(e) => setField('phone', e.target.value)}
          />
        </Field>

        <Field label="شهر" htmlFor={id('city')} error={errors.city} errorId={id('city-error')} required>
          <input type="text" autoComplete="address-level2" {...fieldProps('city')} onChange={(e) => setField('city', e.target.value)} />
        </Field>

        <Field
          label="نوع کسب‌وکار"
          htmlFor={id('businessType')}
          error={errors.businessType}
          errorId={id('businessType-error')}
          required
          wide
        >
          <select {...fieldProps('businessType')} onChange={(e) => setField('businessType', e.target.value)}>
            <option value="">انتخاب کنید</option>
            {businessTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        <fieldset className={`${styles.fieldset} ${styles.wide}`}>
          <legend className={styles.label}>
            محصولات مورد نظر <span className={styles.optional}>(اختیاری)</span>
          </legend>
          <div className={styles.checks}>
            {categories.map((c) => (
              <label key={c.slug} className={styles.check}>
                <input
                  type="checkbox"
                  checked={values.interests.includes(c.slug)}
                  onChange={() => toggleInterest(c.slug)}
                />
                <span>{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <Field
          label="توضیحات"
          optional
          htmlFor={id('message')}
          error={errors.message}
          errorId={id('message-error')}
          hint={hints.message}
          hintId={id('message-hint')}
          wide
        >
          <textarea rows={4} {...fieldProps('message')} onChange={(e) => setField('message', e.target.value)} />
        </Field>
      </div>

      <div className={styles.footer}>
        <Button type="submit" size="lg" loading={status === 'submitting'} disabled={status === 'submitting'} arrow>
          {status === 'submitting' ? 'در حال بررسی…' : 'ثبت درخواست همکاری'}
        </Button>
        <p className={styles.footerNote}>فیلدهای ستاره‌دار الزامی هستند.</p>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  hint?: string;
  hintId?: string;
  required?: boolean;
  optional?: boolean;
  wide?: boolean;
  children: ReactNode;
}

function Field({ label, htmlFor, error, errorId, hint, hintId, required: isRequired, optional, wide, children }: FieldProps) {
  return (
    <div className={`${styles.field} ${wide ? styles.wide : ''} ${error ? styles.invalid : ''}`}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
        {isRequired && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
        {isRequired && <span className="visually-hidden"> (الزامی)</span>}
        {optional && <span className={styles.optional}> (اختیاری)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {hint && error && (
        <p id={hintId} className="visually-hidden">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          <AlertCircle aria-hidden="true" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}

interface DemoResultProps {
  headingRef: RefObject<HTMLHeadingElement | null>;
  values: Values;
  product?: Product;
  onEdit: () => void;
}

function DemoResult({ headingRef, values, product, onEdit }: DemoResultProps) {
  const interestNames = categories.filter((c) => values.interests.includes(c.slug)).map((c) => c.name);
  return (
    <div className={styles.result} role="status">
      <div className={styles.resultIcon} aria-hidden="true">
        <CircleCheck strokeWidth={1.5} />
      </div>
      <SampleBadge label="نمونه نمایشی" />
      <h2 ref={headingRef} tabIndex={-1} className={styles.resultTitle}>
        نمونه نمایشی: درخواست ارسال نشد
      </h2>
      <p className={styles.resultText}>
        فرم به‌درستی تکمیل شد، اما این نسخه به هیچ سامانه‌ای متصل نیست؛ اطلاعات واردشده جایی ارسال یا ذخیره نشد.
      </p>

      <dl className={styles.resultSummary}>
        <div>
          <dt>نام</dt>
          <dd>{values.fullName}</dd>
        </div>
        <div>
          <dt>فروشگاه / شرکت</dt>
          <dd>{values.company}</dd>
        </div>
        <div>
          <dt>شهر</dt>
          <dd>{values.city}</dd>
        </div>
        <div>
          <dt>نوع کسب‌وکار</dt>
          <dd>{values.businessType}</dd>
        </div>
        {product && (
          <div>
            <dt>محصول</dt>
            <dd>{product.name}</dd>
          </div>
        )}
        {interestNames.length > 0 && (
          <div>
            <dt>دسته‌های مورد نظر</dt>
            <dd>{interestNames.join('، ')}</dd>
          </div>
        )}
      </dl>

      <div className={styles.nextStep}>
        <p className={styles.nextStepLabel}>گام بعدی در نسخه‌ی نهایی (فرایند پیشنهادی)</p>
        <p>
          درخواست برای تیم فروش عمده‌ی مهرساز گستر ثبت می‌شود و پس از بررسی، برای هماهنگی قیمت و شرایط همکاری با شماره‌ی
          واردشده تماس گرفته می‌شود.
        </p>
      </div>

      <div className={styles.resultActions}>
        <ButtonLink to="/products" arrow>
          ادامه در کاتالوگ
        </ButtonLink>
        <Button variant="secondary" onClick={onEdit}>
          ویرایش درخواست
        </Button>
      </div>
      <p className={styles.footerNote}>
        <Link to="/">بازگشت به صفحه اصلی</Link>
      </p>
    </div>
  );
}
