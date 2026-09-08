import { CountryLocale } from '@/types/financial';

/**
 * Formats a raw number as currency based on US ($) or UK (£) locale.
 */
export function formatCurrency(amount: number, locale: CountryLocale = 'US', compact: boolean = false): string {
  const currencyCode = locale === 'UK' ? 'GBP' : 'USD';
  const formatter = new Intl.NumberFormat(locale === 'UK' ? 'en-GB' : 'en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
    notation: compact ? 'compact' : 'standard',
  });
  return formatter.format(amount);
}

/**
 * Formats a percentage value (e.g. 5.5 -> 5.5%).
 */
export function formatPercent(rate: number, decimalPlaces: number = 1): string {
  return `${rate.toFixed(decimalPlaces)}%`;
}

/**
 * Returns month & year count formatted nicely (e.g., "3 years, 4 months" or "38 months").
 */
export function formatDuration(totalMonths: number): string {
  if (totalMonths <= 0) return '0 months';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  if (years === 0) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
  if (months === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  return `${years} ${years === 1 ? 'year' : 'years'}, ${months} ${months === 1 ? 'month' : 'months'}`;
}

/**
 * Converts months into estimated future month/year date string.
 */
export function getFutureDateString(monthsFromNow: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Integer Cents / Pence helper to avoid floating point precision issues in monthly interest accumulation.
 */
export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function fromCents(cents: number): number {
  return cents / 100;
}
