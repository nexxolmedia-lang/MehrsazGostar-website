import { toLatinDigits } from './persian';

/** Strip spaces, dashes and parentheses and normalize digits. */
export function normalizePhone(value: string): string {
  return toLatinDigits(value).replace(/[\s\-()‌]/g, '');
}

/**
 * Iranian mobile numbers: 09XXXXXXXXX, optionally written with +98 / 0098 / 98 instead of the leading 0.
 */
export function isIranianMobile(value: string): boolean {
  return /^(?:\+98|0098|98|0)9\d{9}$/.test(normalizePhone(value));
}

export type FieldValidator = (value: string) => string | null;

export const required =
  (message: string): FieldValidator =>
  (value) =>
    value.trim() ? null : message;

export const minLength =
  (min: number, message: string): FieldValidator =>
  (value) =>
    value.trim().length >= min ? null : message;

export const maxLength =
  (max: number, message: string): FieldValidator =>
  (value) =>
    value.trim().length <= max ? null : message;

export const iranianMobile =
  (message: string): FieldValidator =>
  (value) =>
    !value.trim() || isIranianMobile(value) ? null : message;

/** Run validators in order and return the first error. */
export function validate(value: string, validators: FieldValidator[]): string | null {
  for (const v of validators) {
    const error = v(value);
    if (error) return error;
  }
  return null;
}
