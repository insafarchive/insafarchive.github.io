/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Urdu & Arabic Character Normalization Engine
 */

// Diacritics (Harakat / Tashkeel) regex pattern
const TASHKEEL_REGEX = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0617-\u061A]/g;

// Persian/Arabic to standard Urdu character mapping
const CHAR_MAP: Record<string, string> = {
  // Alif variations
  'آ': 'ا',
  'أ': 'ا',
  'إ': 'ا',
  'ٱ': 'ا',
  
  // Yeh variations
  'ي': 'ی',
  'ى': 'ی',
  'ئ': 'ی',
  'ے': 'ی',
  'ۍ': 'ی',
  'ې': 'ی',
  
  // Kaf variations
  'ك': 'ک',
  'ڪ': 'ک',
  
  // Gaf variations
  'گ': 'گ',
  
  // Heh variations
  'ة': 'ہ',
  'ۃ': 'ہ',
  'ۀ': 'ہ',
  'ھ': 'ہ',
  'ۂ': 'ہ',
  'ه': 'ہ',
  
  // Waw variations
  'ؤ': 'و',
  'ۇ': 'و',
  'ۄ': 'و',
  
  // Noon variations for search flexibility
  'ں': 'ن',

  // Cross-keyboard retroflex to dental mapping for Arabic keyboard search compatibility
  'ٹ': 'ت',
  'ڈ': 'د',
  'ڑ': 'ر',
  
  // Zero-width non-joiner & joiner
  '\u200C': ' ',
  '\u200D': '',
  '\u200E': '', // LTR mark
  '\u200F': '', // RTL mark
};

/**
 * Normalizes text for search index generation and comparison.
 * Works seamlessly across Urdu, Arabic, Persian, and English text.
 */
export function normalizeText(text: string | null | undefined): string {
  if (!text) return '';

  let normalized = text
    .toLowerCase()
    .trim();

  // 1. Remove diacritics / tashkeel
  normalized = normalized.replace(TASHKEEL_REGEX, '');

  // 2. Unify character graphemes
  let result = '';
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    result += CHAR_MAP[char] || char;
  }

  // 3. Normalize Urdu punctuation to spaces/clean tokens
  result = result
    .replace(/[۔،؛؟«»"'()[\]{}<>:/\-_#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return result;
}

/**
 * Checks if a string contains Arabic/Urdu unicode characters
 */
export function isUrduText(text: string): boolean {
  if (!text) return false;
  // Arabic & Urdu Unicode Range
  const urduRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return urduRegex.test(text);
}

/**
 * Splits query into normalized search tokens
 */
export function tokenizeSearchQuery(query: string): string[] {
  const normalized = normalizeText(query);
  if (!normalized) return [];
  return normalized.split(' ').filter(token => token.length > 0);
}

/**
 * Fuzzy matches token in target text
 */
export function matchesQuery(targetText: string, queryTokens: string[]): boolean {
  if (queryTokens.length === 0) return true;
  const normalizedTarget = normalizeText(targetText);
  return queryTokens.every(token => normalizedTarget.includes(token));
}
