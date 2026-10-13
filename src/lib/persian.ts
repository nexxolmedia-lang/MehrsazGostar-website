const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/** Convert Persian and Arabic-Indic digits to Latin digits. */
export function toLatinDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (d) => {
    const persian = PERSIAN_DIGITS.indexOf(d);
    return String(persian >= 0 ? persian : ARABIC_INDIC_DIGITS.indexOf(d));
  });
}

/** Convert Latin digits to Persian digits (for numbers shown in prose). */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/**
 * Normalize text for search matching:
 * - Arabic ي/ى → Persian ی, Arabic ك → Persian ک, ة → ه, أ/إ/آ → ا
 * - Persian/Arabic-Indic digits → Latin digits
 * - ZWNJ (half-space), ZWJ and bidi marks → space; tatweel and diacritics removed
 * - Latin lowercase; hyphens/underscores/slashes → space; whitespace collapsed
 */
export function normalizeForSearch(input: string): string {
  return toLatinDigits(input)
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/[ً-ٰٟ]/g, '') // harakat
    .replace(/ـ/g, '') // tatweel
    .replace(/[‌‍‎‏‪-‮⁦-⁩]/g, ' ')
    .replace(/[-_/\\.,،؛:()]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Same as normalizeForSearch, with all whitespace removed (handles "چراغ‌ها" vs "چراغها" vs "HL-101" vs "hl101"). */
export function compactForSearch(input: string): string {
  return normalizeForSearch(input).replace(/\s+/g, '');
}

/** Format a count in Persian digits, e.g. formatCount(8, 'محصول') → "۸ محصول". */
export function formatCount(count: number, noun: string): string {
  return `${toPersianDigits(count)} ${noun}`;
}
