/**
 * SAMPLE DATASET — ILLUSTRATIVE ONLY.
 *
 * Every product, code, specification and compatibility entry below is placeholder content
 * created for the Nexxol Media sales prototype. None of it describes a real Mehrsaz Gostar
 * product. Replace with verified catalog data before any public use.
 *
 * Numeral policy: spec values, product codes and years use Latin digits (rendered LTR-isolated);
 * prose uses Persian digits.
 */

import { productImages, type ProductImageKey } from './images';

export type CategorySlug = 'headlamps' | 'tail-lamps' | 'fog-lamps' | 'bulbs' | 'signal';
export type LightSource = 'LED' | 'halogen';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Representative image used on the homepage category index. */
  image: string;
}

export interface ProductImage {
  src: string;
  /** Optional responsive sources for real photography (e.g. "/img/x-640.webp 640w, ..."). */
  srcSet?: string;
  alt: string;
  width: number;
  height: number;
  /** True while the image is a temporary rendering rather than a real product photo. */
  isPlaceholder: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
  /** Render the value as an isolated LTR Latin string (codes, units, standards). */
  ltr?: boolean;
  /** Show on product cards. */
  highlight?: boolean;
}

export interface Compatibility {
  vehicle: string;
  years?: string;
  note?: string;
}

export interface Product {
  slug: string;
  name: string;
  code?: string;
  category: CategorySlug;
  lightSource?: LightSource;
  summary: string;
  description: string;
  image?: ProductImage;
  specs: ProductSpec[];
  /** Present only when compatibility data exists. Never inferred. */
  compatibility?: Compatibility[];
  featured?: boolean;
  /** Extra search aliases (English terms, common spellings). */
  keywords?: string[];
  /** Always true in this prototype. */
  isSample: true;
}

export const categories: Category[] = [
  {
    slug: 'headlamps',
    name: 'چراغ جلو',
    description: 'مجموعه‌های اپتیکی جلو؛ پروژکتوری و رفلکتوری، با منبع نور LED یا هالوژن.',
    image: productImages.headlampReflector,
  },
  {
    slug: 'tail-lamps',
    name: 'چراغ عقب',
    description: 'چراغ‌های خطر، ترمز و دنده‌عقب در طرح‌های نواری و چندبخشی.',
    image: productImages.tailLampBar,
  },
  {
    slug: 'fog-lamps',
    name: 'مه‌شکن',
    description: 'روشنایی کم‌ارتفاع برای دید بهتر در مه، باران و گرد و غبار.',
    image: productImages.fogLampRound,
  },
  {
    slug: 'bulbs',
    name: 'لامپ و LED',
    description: 'منابع نور جایگزین با پایه‌های استاندارد برای چراغ‌های موجود.',
    image: productImages.bulbLedH7,
  },
  {
    slug: 'signal',
    name: 'راهنما و چراغ‌های جانبی',
    description: 'راهنمای آینه، چراغ ترمز سوم و چراغ‌های علامت‌دهی.',
    image: productImages.mirrorIndicator,
  },
];

const placeholder = (key: ProductImageKey, alt: string): ProductImage => ({
  src: productImages[key],
  alt,
  width: 800,
  height: 600,
  isPlaceholder: true,
});

export const products: Product[] = [
  {
    slug: 'projector-headlamp-led',
    name: 'چراغ جلو پروژکتوری LED',
    code: 'DEMO-HL-101',
    category: 'headlamps',
    lightSource: 'LED',
    featured: true,
    summary: 'مجموعه چراغ جلو با دو ماژول پروژکتور و نوار نور روز یکپارچه.',
    description:
      'این مجموعه‌ی نمونه، ساختار رایج چراغ‌های جلوی پروژکتوری را نشان می‌دهد: دو ماژول عدسی برای نور پایین و بالا، نوار نور روز (DRL) در امتداد لبه‌ی پایین و بخش راهنما در گوشه‌ی داخلی. مشخصات این صفحه صرفاً برای نمایش قالب است.',
    image: placeholder('headlampProjector', 'رندر نمایشی چراغ جلو پروژکتوری با دو عدسی و نوار نور روز'),
    specs: [
      { label: 'منبع نور', value: 'LED', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true, highlight: true },
      { label: 'توان مصرفی', value: '2 × 25W', ltr: true },
      { label: 'دمای رنگ', value: '6000K', ltr: true },
      { label: 'جنس لنز', value: 'پلی‌کربنات با پوشش ضدخش' },
      { label: 'درجه حفاظت', value: 'IP67', ltr: true },
      { label: 'سمت نصب', value: 'چپ و راست (فروش جفتی)' },
    ],
    compatibility: [
      { vehicle: 'خودروی سواری نمونه الف', years: '1395–1400' },
      { vehicle: 'خودروی سواری نمونه ب', years: '1398–1402', note: 'نیازمند سوکت تبدیل (نمونه)' },
    ],
    keywords: ['headlamp', 'headlight', 'projector', 'چراغ اصلی', 'زنون'],
    isSample: true,
  },
  {
    slug: 'reflector-headlamp-halogen',
    name: 'چراغ جلو رفلکتوری هالوژن',
    code: 'DEMO-HL-102',
    category: 'headlamps',
    lightSource: 'halogen',
    summary: 'چراغ جلو با بازتابنده‌ی چندوجهی و لامپ دوکنتاکت.',
    description:
      'نمونه‌ای از چراغ جلوی رفلکتوری که نور لامپ هالوژن را با بازتابنده‌ی چندوجهی توزیع می‌کند. این ساختار در بسیاری از خودروهای پرتیراژ رایج است. مشخصات این صفحه نمونه است.',
    image: placeholder('headlampReflector', 'رندر نمایشی چراغ جلو رفلکتوری با بازتابنده چندوجهی'),
    specs: [
      { label: 'منبع نور', value: 'هالوژن', highlight: true },
      { label: 'پایه لامپ', value: 'H4', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true },
      { label: 'توان لامپ', value: '60/55W', ltr: true },
      { label: 'جنس لنز', value: 'پلی‌کربنات' },
      { label: 'سمت نصب', value: 'راست' },
    ],
    keywords: ['headlamp', 'headlight', 'reflector', 'h4', 'چراغ اصلی'],
    isSample: true,
  },
  {
    slug: 'led-bar-tail-lamp',
    name: 'چراغ عقب LED نواری',
    code: 'DEMO-TL-201',
    category: 'tail-lamps',
    lightSource: 'LED',
    summary: 'چراغ عقب کشیده با نوار LED پیوسته برای چراغ خطر و ترمز.',
    description:
      'طرح نواری با یک خط نور پیوسته که چراغ خطر و ترمز را در یک بدنه‌ی کم‌ارتفاع ترکیب می‌کند. بخش دنده‌عقب در مرکز قرار دارد. اطلاعات این صفحه نمونه است.',
    image: placeholder('tailLampBar', 'رندر نمایشی چراغ عقب نواری با خط نور LED قرمز'),
    specs: [
      { label: 'منبع نور', value: 'LED', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true, highlight: true },
      { label: 'عملکردها', value: 'خطر، ترمز، دنده‌عقب' },
      { label: 'رنگ لنز', value: 'قرمز دودی' },
      { label: 'درجه حفاظت', value: 'IP65', ltr: true },
    ],
    keywords: ['tail lamp', 'taillight', 'rear', 'خطر', 'ترمز'],
    isSample: true,
  },
  {
    slug: 'three-section-tail-lamp',
    name: 'چراغ عقب سه‌بخشی',
    code: 'DEMO-TL-202',
    category: 'tail-lamps',
    lightSource: 'halogen',
    featured: true,
    summary: 'چراغ عقب با بخش‌های مجزای خطر، راهنما و دنده‌عقب.',
    description:
      'ساختار کلاسیک سه‌بخشی با لنز منشوری برای پخش یکنواخت نور. هر بخش لامپ جداگانه دارد و تعویض آن ساده است. مشخصات نمونه است.',
    image: placeholder('tailLampClassic', 'رندر نمایشی چراغ عقب سه‌بخشی قرمز، کهربایی و سفید'),
    specs: [
      { label: 'منبع نور', value: 'هالوژن', highlight: true },
      { label: 'پایه لامپ', value: 'P21/5W · PY21W', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true },
      { label: 'عملکردها', value: 'خطر، ترمز، راهنما، دنده‌عقب' },
      { label: 'سمت نصب', value: 'چپ' },
    ],
    keywords: ['tail lamp', 'taillight', 'rear', 'راهنما'],
    isSample: true,
  },
  {
    slug: 'round-led-fog-lamp',
    name: 'مه‌شکن گرد LED',
    code: 'DEMO-FL-301',
    category: 'fog-lamps',
    lightSource: 'LED',
    featured: true,
    summary: 'مه‌شکن گرد با لنز فرنل و براکت نصب فلزی.',
    description:
      'مه‌شکن گرد با الگوی نوری پهن و کم‌ارتفاع که برای نصب در سپر جلو طراحی شده است. لنز فرنل نور را در عرض جاده پخش می‌کند. مشخصات این صفحه نمونه است.',
    image: placeholder('fogLampRound', 'رندر نمایشی مه‌شکن گرد با لنز فرنل و براکت'),
    specs: [
      { label: 'منبع نور', value: 'LED', ltr: true, highlight: true },
      { label: 'قطر', value: '90 mm', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true },
      { label: 'توان مصرفی', value: '15W', ltr: true },
      { label: 'درجه حفاظت', value: 'IP67', ltr: true },
    ],
    compatibility: [{ vehicle: 'خودروی شاسی‌بلند نمونه ج', years: '1399–1403' }],
    keywords: ['fog lamp', 'fog light', 'مه شکن', 'پرژکتور'],
    isSample: true,
  },
  {
    slug: 'rectangular-fog-lamp',
    name: 'مه‌شکن مستطیلی هالوژن',
    code: 'DEMO-FL-302',
    category: 'fog-lamps',
    lightSource: 'halogen',
    summary: 'مه‌شکن مستطیلی با لامپ H11 قابل تعویض.',
    description:
      'مه‌شکن مستطیلی با بازتابنده‌ی هالوژن و لامپ قابل تعویض از پشت. برای این محصول نمونه هنوز تصویری ثبت نشده است تا حالت «تصویر در دسترس نیست» نیز در قالب دیده شود.',
    specs: [
      { label: 'منبع نور', value: 'هالوژن', highlight: true },
      { label: 'پایه لامپ', value: 'H11', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true },
      { label: 'ابعاد', value: '160 × 60 mm', ltr: true },
    ],
    keywords: ['fog lamp', 'fog light', 'h11', 'مه شکن'],
    isSample: true,
  },
  {
    slug: 'h7-led-bulb',
    name: 'لامپ LED پایه H7',
    code: 'DEMO-BL-401',
    category: 'bulbs',
    lightSource: 'LED',
    featured: true,
    summary: 'لامپ LED با هیت‌سینک آلومینیومی و فن خنک‌کننده.',
    description:
      'لامپ LED جایگزین با پایه‌ی H7، تراشه‌های دوطرفه و فن کوچک برای خنک‌کاری. پیش از نصب، سازگاری با چراغ و قوانین محلی باید بررسی شود. مشخصات این صفحه نمونه است.',
    image: placeholder('bulbLedH7', 'رندر نمایشی لامپ LED با هیت‌سینک و فن'),
    specs: [
      { label: 'پایه لامپ', value: 'H7', ltr: true, highlight: true },
      { label: 'منبع نور', value: 'LED', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '9–16V', ltr: true },
      { label: 'توان مصرفی', value: '30W', ltr: true },
      { label: 'دمای رنگ', value: '6500K', ltr: true },
      { label: 'خنک‌کاری', value: 'فن و هیت‌سینک آلومینیومی' },
    ],
    keywords: ['bulb', 'h7', 'led bulb', 'لامپ ال ای دی'],
    isSample: true,
  },
  {
    slug: 'h4-halogen-bulb',
    name: 'لامپ هالوژن پایه H4',
    code: 'DEMO-BL-402',
    category: 'bulbs',
    lightSource: 'halogen',
    summary: 'لامپ دوکنتاکت نور بالا و پایین با حباب کوارتز.',
    description:
      'لامپ هالوژن دو رشته‌ای برای چراغ‌هایی که نور بالا و پایین را از یک لامپ تأمین می‌کنند. مشخصات این صفحه نمونه است.',
    image: placeholder('bulbHalogenH4', 'رندر نمایشی لامپ هالوژن با حباب شیشه‌ای و پایه فلزی'),
    specs: [
      { label: 'پایه لامپ', value: 'H4 (P43t)', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true, highlight: true },
      { label: 'توان', value: '60/55W', ltr: true },
      { label: 'جنس حباب', value: 'کوارتز' },
    ],
    keywords: ['bulb', 'h4', 'halogen', 'لامپ'],
    isSample: true,
  },
  {
    slug: 'mirror-turn-signal',
    name: 'راهنمای آینه بغل LED',
    code: 'DEMO-SG-501',
    category: 'signal',
    lightSource: 'LED',
    summary: 'راهنمای کشیده‌ی آینه با ردیف LED کهربایی.',
    description:
      'راهنمای باریک قاب آینه با ردیف LED و لنز دودی. این قطعه معمولاً همراه قاب آینه یا به‌صورت جداگانه عرضه می‌شود. مشخصات این صفحه نمونه است.',
    image: placeholder('mirrorIndicator', 'رندر نمایشی راهنمای آینه بغل با ردیف LED کهربایی'),
    specs: [
      { label: 'منبع نور', value: 'LED', ltr: true, highlight: true },
      { label: 'رنگ نور', value: 'کهربایی', highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true },
      { label: 'سمت نصب', value: 'راست' },
    ],
    keywords: ['indicator', 'turn signal', 'mirror', 'راهنما', 'آینه'],
    isSample: true,
  },
  {
    slug: 'third-brake-light',
    name: 'چراغ ترمز سوم LED',
    code: 'DEMO-SG-502',
    category: 'signal',
    lightSource: 'LED',
    summary: 'چراغ ترمز کشیده‌ی سقفی با ردیف LED قرمز.',
    description:
      'چراغ ترمز سوم برای نصب در بالای شیشه‌ی عقب یا روی اسپویلر، با ردیف LED و پایه‌ی نصب. اطلاعات این صفحه نمونه است.',
    image: placeholder('thirdBrakeLight', 'رندر نمایشی چراغ ترمز سوم با ردیف LED قرمز'),
    specs: [
      { label: 'منبع نور', value: 'LED', ltr: true, highlight: true },
      { label: 'طول', value: '380 mm', ltr: true, highlight: true },
      { label: 'ولتاژ کاری', value: '12V', ltr: true },
      { label: 'درجه حفاظت', value: 'IP65', ltr: true },
    ],
    keywords: ['brake light', 'third brake', 'stop', 'ترمز'],
    isSample: true,
  },
];

export const lightSourceLabels: Record<LightSource, string> = {
  LED: 'LED',
  halogen: 'هالوژن',
};

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

/** Same-category products first, then others, excluding the current one. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = products.filter((p) => p.category !== product.category && p.lightSource === product.lightSource);
  return [...same, ...others].slice(0, limit);
}
