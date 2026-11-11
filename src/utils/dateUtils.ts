/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Bilingual Date & Temporal Precision Formatting
 */

import type { ArchiveDate } from '../types/archive';

const MONTH_NAMES_UR = [
  'جنوری',
  'فروری',
  'مارچ',
  'اپریل',
  'مئی',
  'جون',
  'جولائی',
  'اگست',
  'ستمبر',
  'اکتوبر',
  'نومبر',
  'دسمبر',
];

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Parses and formats an ArchiveDate object into localized bilingual strings
 */
export function formatArchiveDate(
  dateObj: ArchiveDate | undefined | null,
  lang: 'en' | 'ur' = 'en'
): string {
  if (!dateObj) return lang === 'ur' ? 'غیر دستیاب' : 'Unavailable';
  if (dateObj.formattedDisplay && dateObj.formattedDisplay[lang]) {
    return dateObj.formattedDisplay[lang];
  }

  const { dateString, precision } = dateObj;
  if (!dateString) return '';

  const parts = dateString.split('-');
  const year = parts[0];
  const monthIdx = parts[1] ? parseInt(parts[1], 10) - 1 : -1;
  const day = parts[2] ? parseInt(parts[2], 10) : null;

  if (precision === 'year' || parts.length === 1) {
    return lang === 'ur' ? `${year}ء` : `${year}`;
  }

  if (precision === 'month' || parts.length === 2) {
    if (monthIdx >= 0 && monthIdx < 12) {
      return lang === 'ur'
        ? `${MONTH_NAMES_UR[monthIdx]} ${year}ء`
        : `${MONTH_NAMES_EN[monthIdx]} ${year}`;
    }
    return year;
  }

  // Full day
  if (monthIdx >= 0 && monthIdx < 12 && day !== null) {
    return lang === 'ur'
      ? `${day} ${MONTH_NAMES_UR[monthIdx]} ${year}ء`
      : `${MONTH_NAMES_EN[monthIdx]} ${day}, ${year}`;
  }

  return dateString;
}

/**
 * Extracts a numeric year for sorting and filtering
 */
export function extractNumericYear(dateObj: ArchiveDate | undefined | null): number {
  if (!dateObj || !dateObj.dateString) return 0;
  const yearStr = dateObj.dateString.slice(0, 4);
  const parsed = parseInt(yearStr, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Creates a standard ArchiveDate from a date string
 */
export function createArchiveDate(dateStr: string, precision: ArchiveDate['precision'] = 'day'): ArchiveDate {
  const parts = dateStr.split('-');
  const year = parts[0];
  const monthIdx = parts[1] ? parseInt(parts[1], 10) - 1 : -1;
  const day = parts[2] ? parseInt(parts[2], 10) : null;

  let en = dateStr;
  let ur = dateStr;

  if (parts.length === 1 || precision === 'year') {
    en = year;
    ur = `${year}ء`;
  } else if (parts.length === 2 || precision === 'month') {
    if (monthIdx >= 0 && monthIdx < 12) {
      en = `${MONTH_NAMES_EN[monthIdx]} ${year}`;
      ur = `${MONTH_NAMES_UR[monthIdx]} ${year}ء`;
    }
  } else if (parts.length === 3 && day !== null && monthIdx >= 0 && monthIdx < 12) {
    en = `${MONTH_NAMES_EN[monthIdx]} ${day}, ${year}`;
    ur = `${day} ${MONTH_NAMES_UR[monthIdx]} ${year}ء`;
  }

  return {
    dateString: dateStr,
    precision,
    formattedDisplay: { en, ur },
  };
}
