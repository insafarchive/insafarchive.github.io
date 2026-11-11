/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Privacy & Publication Isolation Unit Tests
 */

import { describe, it, expect } from 'vitest';
import { isPubliclyPublished, filterPublicRecords, sanitizeRecordForPublicExport, importArchiveRecordsJson } from '../utils/privacyFilter';
import type { ArchiveRecord } from '../types/archive';

const sampleValidRecord: ArchiveRecord = {
  schemaVersion: '1.0.0',
  id: 'rec-test-pub-1',
  slug: 'test-public-record',
  domain: 'legal',
  recordType: 'court_case',
  title: { en: 'Public Case Record', ur: 'عوامی کیس ریکارڈ' },
  summary: { en: 'Public summary', ur: 'عوامی خلاصہ' },
  narrative: { en: 'Public narrative description', ur: 'عوامی تفصیلی بیانیہ' },
  date: {
    dateString: '2023-01-01',
    precision: 'day',
    formattedDisplay: { en: 'January 1, 2023', ur: '1 جنوری 2023ء' },
  },
  claims: [
    {
      claimId: 'clm-pub-1',
      findingType: 'documented_fact',
      assertion: { en: 'Fact assertion', ur: 'دستاویزی حقیقت' },
      sourceIds: ['src-pub-1'],
    },
  ],
  sources: [
    {
      sourceId: 'src-pub-1',
      sourceType: 'court_judgment',
      title: { en: 'Judgment Document', ur: 'عدالتی فیصلہ' },
      language: 'en',
      verificationStatus: 'primary_source',
    },
  ],
  evidenceMedia: [],
  relationships: [],
  categories: ['Legal'],
  tags: { en: ['Test'], ur: ['ٹیسٹ'] },
  verificationStatus: 'verified',
  editorialStatus: 'published',
  privacyClassification: 'public',
  privacyFlags: {},
  version: 1,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

describe('Privacy Model & Authoritative Publication Filter', () => {
  it('allows published public record to pass isPubliclyPublished', () => {
    expect(isPubliclyPublished(sampleValidRecord)).toBe(true);
  });

  it('strictly excludes draft records from publication', () => {
    const draftRecord: ArchiveRecord = { ...sampleValidRecord, editorialStatus: 'draft' };
    expect(isPubliclyPublished(draftRecord)).toBe(false);
  });

  it('strictly excludes records marked under_review, submitted, or rejected', () => {
    const underReview: ArchiveRecord = { ...sampleValidRecord, editorialStatus: 'under_review' };
    const submitted: ArchiveRecord = { ...sampleValidRecord, editorialStatus: 'submitted' };
    const rejected: ArchiveRecord = { ...sampleValidRecord, editorialStatus: 'rejected' };
    const archived: ArchiveRecord = { ...sampleValidRecord, editorialStatus: 'archived' };

    expect(isPubliclyPublished(underReview)).toBe(false);
    expect(isPubliclyPublished(submitted)).toBe(false);
    expect(isPubliclyPublished(rejected)).toBe(false);
    expect(isPubliclyPublished(archived)).toBe(false);
  });

  it('strictly blocks restricted_editorial and do_not_publish classifications', () => {
    const restricted: ArchiveRecord = { ...sampleValidRecord, privacyClassification: 'restricted_editorial' };
    const doNotPublish: ArchiveRecord = { ...sampleValidRecord, privacyClassification: 'do_not_publish' };

    expect(isPubliclyPublished(restricted)).toBe(false);
    expect(isPubliclyPublished(doNotPublish)).toBe(false);
  });

  it('strictly blocks records containing confidential privilege or minors', () => {
    const confidential: ArchiveRecord = {
      ...sampleValidRecord,
      privacyFlags: { containsConfidentialPrivilege: true },
    };
    const minorRecord: ArchiveRecord = {
      ...sampleValidRecord,
      privacyFlags: { isMinor: true },
    };

    expect(isPubliclyPublished(confidential)).toBe(false);
    expect(isPubliclyPublished(minorRecord)).toBe(false);
  });

  it('filters an array of mixed records down to only strictly public records', () => {
    const mixedList: ArchiveRecord[] = [
      sampleValidRecord,
      { ...sampleValidRecord, id: 'rec-2', editorialStatus: 'draft' },
      { ...sampleValidRecord, id: 'rec-3', privacyClassification: 'do_not_publish' },
      { ...sampleValidRecord, id: 'rec-4', editorialStatus: 'published', privacyClassification: 'public' },
    ];

    const result = filterPublicRecords(mixedList);
    expect(result.length).toBe(2);
    expect(result.map(r => r.id)).toEqual(['rec-test-pub-1', 'rec-4']);
  });

  it('sanitizes public export by stripping editorial notes and internal review metadata', () => {
    const recordWithNotes: ArchiveRecord = {
      ...sampleValidRecord,
      editorialNotes: 'Internal confidential review note: verified by senior counsel.',
      reviewedBy: 'Editor A',
    };

    const sanitized = sanitizeRecordForPublicExport(recordWithNotes);
    expect(sanitized.editorialNotes).toBeUndefined();
    expect(sanitized.id).toBe(sampleValidRecord.id);
  });

  it('safely validates JSON import and rejects invalid or corrupted payloads', () => {
    const validJson = JSON.stringify([sampleValidRecord]);
    const importResult = importArchiveRecordsJson(validJson);
    expect(importResult.success).toBe(true);
    expect(importResult.importedCount).toBe(1);

    const invalidJson = JSON.stringify([{ id: 'bad-rec' }]);
    const failResult = importArchiveRecordsJson(invalidJson);
    expect(failResult.success).toBe(false);
    expect(failResult.errors?.length).toBeGreaterThan(0);
  });
});
