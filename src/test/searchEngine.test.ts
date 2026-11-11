/**
 * Unit Tests for Bilingual Search & Faceted Filter Engine
 */

import { describe, it, expect } from 'vitest';
import { searchArchive } from '../utils/searchEngine';
import { SEED_ARCHIVE_RECORDS } from '../data/seedRecords';

describe('Search & Faceted Filter Engine', () => {
  it('finds records by English query', () => {
    const results = searchArchive(SEED_ARCHIVE_RECORDS, { query: 'Kenya' });
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('rec-pk-2022-arshad-sharif-killing');
  });

  it('finds records by Urdu query with character variants', () => {
    // Search with Arabic kaf/yeh variant: ارشد شريف
    const results = searchArchive(SEED_ARCHIVE_RECORDS, { query: 'ارشد شريف' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(r => r.id.includes('arshad-sharif'))).toBe(true);
  });

  it('filters by domain accurately', () => {
    const legalResults = searchArchive(SEED_ARCHIVE_RECORDS, { domain: 'legal' });
    expect(legalResults.every(r => r.domain === 'legal')).toBe(true);

    const economicResults = searchArchive(SEED_ARCHIVE_RECORDS, { domain: 'economic_public_policy' });
    expect(economicResults.every(r => r.domain === 'economic_public_policy')).toBe(true);
  });

  it('filters by year range accurately', () => {
    const results2022to2024 = searchArchive(SEED_ARCHIVE_RECORDS, { yearFrom: 2022, yearTo: 2024 });
    expect(results2022to2024.length).toBeGreaterThan(0);
    expect(results2022to2024.some(r => r.id === 'rec-pk-2022-arshad-sharif-killing')).toBe(true);
  });
});
