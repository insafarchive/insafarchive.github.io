/**
 * Unit Tests for Urdu & Arabic Normalization Engine
 */

import { describe, it, expect } from 'vitest';
import { normalizeText, isUrduText, tokenizeSearchQuery, matchesQuery } from '../utils/urduNormalize';

describe('Urdu Normalization Engine', () => {
  it('unifies Persian/Arabic yeh variations to standard Urdu yeh', () => {
    // Arabic Yeh (ي), Alef Maksura (ى), Yeh with Hamza (ئ), Bari Yeh (ے)
    expect(normalizeText('علی')).toBe(normalizeText('على'));
    expect(normalizeText('پاکستاني')).toBe(normalizeText('پاکستانی'));
  });

  it('unifies Kaf variations', () => {
    // Arabic Kaf (ك) to Urdu Kaf (ک)
    expect(normalizeText('كتاب')).toBe(normalizeText('کتاب'));
    expect(normalizeText('محكمہ')).toBe(normalizeText('محکمہ'));
  });

  it('unifies Heh and Teh Marbuta variations', () => {
    // Teh Marbuta (ة / ۃ) and Heh (ہ / ه / ھ)
    expect(normalizeText('جامعة')).toBe(normalizeText('جامعہ'));
    expect(normalizeText('فیصلہ')).toBe(normalizeText('فیصله'));
  });

  it('strips Arabic and Urdu diacritics / tashkeel', () => {
    const textWithTashkeel = 'اِنْصَافْ آرْکَائِیو';
    const textClean = 'انصاف آرکائیو';
    expect(normalizeText(textWithTashkeel)).toBe(normalizeText(textClean));
  });

  it('detects Urdu / Arabic unicode text accurately', () => {
    expect(isUrduText('ارشد شریف')).toBe(true);
    expect(isUrduText('Supreme Court of Pakistan')).toBe(false);
    expect(isUrduText('SMC 8/2022 کیس')).toBe(true);
  });

  it('tokenizes search queries and strips punctuation', () => {
    const query = 'ارشد شریف: کینیا (2022)۔';
    const tokens = tokenizeSearchQuery(query);
    expect(tokens).toContain('ارشد');
    expect(tokens).toContain('شریف');
    expect(tokens).toContain('کینیا');
    expect(tokens).toContain('2022');
  });

  it('fuzzy matches normalized tokens in target text', () => {
    const target = 'سپریم کورٹ آف پاکستان کا تاریخی فیصلہ برائے 2023ء';
    const tokens = tokenizeSearchQuery('سپريم كورت');
    expect(matchesQuery(target, tokens)).toBe(true);
  });
});
