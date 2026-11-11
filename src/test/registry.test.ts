// src/test/registry.test.ts
/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Registry Integrity Tests – Part 3.1
 */

import { describe, it, expect } from 'vitest';
import { ALL_ARCHIVE_RECORDS, SEED_ARCHIVE_RECORDS, validateRegistryDuplicates } from '../data/records/index';

describe('Master Archive Registry Suite', () => {
  it('exposes both the new ALL_ARCHIVE_RECORDS and backward‑compatible SEED_ARCHIVE_RECORDS', () => {
    expect(ALL_ARCHIVE_RECORDS.length).toBe(SEED_ARCHIVE_RECORDS.length);
    expect(ALL_ARCHIVE_RECORDS).toBe(SEED_ARCHIVE_RECORDS);
  });

  it('detects no duplicate IDs in the active registry', () => {
    const duplicateErrors = validateRegistryDuplicates();
    expect(duplicateErrors.length).toBe(0);
  });

  it('ensures that each record in the master registry has a valid ID', () => {
    for (const record of ALL_ARCHIVE_RECORDS) {
      expect(record.id).toBeTruthy();
      expect(typeof record.id).toBe('string');
      expect(record.id.trim()).toBe(record.id);
    }
  });
});
