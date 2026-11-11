/**
 * Unit Tests for Schema Validator & Non-Fabrication Constraint Engine
 */

import { describe, it, expect } from 'vitest';
import { validateArchiveRecord } from '../utils/schemaValidator';
import type { ArchiveRecord } from '../types/archive';

describe('Schema Validator & Non-Fabrication Rules', () => {
  it('validates a complete, compliant ArchiveRecord successfully', () => {
    const validRecord: Partial<ArchiveRecord> = {
      id: 'rec-pk-2023-test-case',
      domain: 'legal',
      recordType: 'court_case',
      title: { en: 'Test Case Title', ur: 'ٹیسٹ کیس عنوان' },
      summary: { en: 'English summary', ur: 'اردو خلاصہ' },
      narrative: { en: 'Detailed narrative', ur: 'تفصیلی بیانیہ' },
      date: {
        dateString: '2023-05-09',
        precision: 'day',
        formattedDisplay: { en: 'May 9, 2023', ur: '9 مئی 2023ء' },
      },
      claims: [
        {
          claimId: 'clm-1',
          findingType: 'documented_fact',
          assertion: { en: 'Court issued notice', ur: 'عدالت نے نوٹس جاری کیا' },
          sourceIds: ['src-1'],
        },
      ],
      sources: [
        {
          sourceId: 'src-1',
          sourceType: 'supreme_court_record',
          title: { en: 'SC Order Sheet', ur: 'سپریم کورٹ آرڈر شیٹ' },
          language: 'both',
          verificationStatus: 'primary_source',
          verificationTier: 'primary_verified',
        },
      ],
      editorialStatus: 'published',
      privacyClassification: 'public',
    };

    const result = validateArchiveRecord(validRecord);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('fails when bilingual titles are missing', () => {
    const invalidRecord: Partial<ArchiveRecord> = {
      id: 'rec-pk-2023-missing-titles',
      domain: 'legal',
      recordType: 'court_case',
      title: { en: 'Only English Title', ur: '' },
      summary: { en: 'Summary', ur: 'خلاصہ' },
      date: { dateString: '2023-01-01', precision: 'day', formattedDisplay: { en: '2023', ur: '2023' } },
      claims: [],
      sources: [],
      editorialStatus: 'draft',
      privacyClassification: 'public',
    };

    const result = validateArchiveRecord(invalidRecord);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'title.ur')).toBe(true);
  });

  it('strictly enforces non-fabrication: claims referencing missing sources trigger errors', () => {
    const unverifiedRecord: Partial<ArchiveRecord> = {
      id: 'rec-pk-2023-unverified-claim',
      domain: 'legal',
      recordType: 'court_case',
      title: { en: 'Unverified Assertions', ur: 'غیر مصدقہ بیانات' },
      summary: { en: 'Summary', ur: 'خلاصہ' },
      date: { dateString: '2023-01-01', precision: 'day', formattedDisplay: { en: '2023', ur: '2023' } },
      claims: [
        {
          claimId: 'clm-fake',
          findingType: 'allegation',
          assertion: { en: 'Unsupported allegation without citation', ur: 'بغیر ماخذ الزام' },
          sourceIds: ['src-non-existent-source'],
        },
      ],
      sources: [], // No sources present
      editorialStatus: 'draft',
      privacyClassification: 'public',
    };

    const result = validateArchiveRecord(unverifiedRecord);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field.includes('sourceIds'))).toBe(true);
  });
});
