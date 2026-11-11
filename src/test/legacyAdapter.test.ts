/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Legacy Record Backward Compatibility & Migration Unit Tests
 */

import { describe, it, expect } from 'vitest';
import { adaptLegacyCaseRecord, adaptLegacyMediaRecord } from '../utils/legacyAdapter';
import type { LegacyCaseRecord, LegacyMediaRecord } from '../utils/legacyAdapter';
import { validateArchiveRecord } from '../utils/schemaValidator';

describe('Legacy Adapters & Schema Backward Compatibility', () => {
  it('correctly adapts a legacy CaseRecord to Schema v1.0.0 ArchiveRecord', () => {
    const legacyCase: LegacyCaseRecord = {
      id: 'legacy-case-101',
      title: {
        en: 'Legacy Military Courts Petition',
        ur: 'فوجی عدالتوں کے خلاف پرانی پٹیشن',
      },
      caseNumber: 'CP 12/2023',
      court: 'Supreme Court of Pakistan',
      filingDate: '2023-05-15',
      status: 'Decided',
      summary: {
        en: 'Constitutional challenge to military courts.',
        ur: 'فوجی عدالتوں کے خلاف آئینی درخواست۔',
      },
      description: {
        en: 'Detailed procedural description of the petitions challenging civilian trials.',
        ur: 'عام شہریوں کے کورٹ مارشل کے خلاف تفصیلی عدالتی کارروائی۔',
      },
      sources: ['PLD 2023 SC 500', 'https://supremecourt.gov.pk/order12'],
      tags: ['Constitution', 'Military Courts'],
      isPublished: true,
    };

    const adapted = adaptLegacyCaseRecord(legacyCase);

    expect(adapted.schemaVersion).toBe('1.0.0');
    expect(adapted.id).toBe('legacy-case-101');
    expect(adapted.domain).toBe('legal');
    expect(adapted.recordType).toBe('court_case');
    expect(adapted.editorialStatus).toBe('published');
    expect(adapted.privacyClassification).toBe('public');
    expect(adapted.sources.length).toBe(2);
    expect(adapted.sources[0].verificationStatus).toBe('source_reviewed');

    // Physical reference without URL works seamlessly
    expect(adapted.sources[0].originalUrl).toBeUndefined();
    expect(adapted.sources[0].documentIdentifier).toBe('PLD 2023 SC 500');

    // URL source is populated correctly
    expect(adapted.sources[1].originalUrl).toBe('https://supremecourt.gov.pk/order12');

    // Verify it passes full schema validation
    const validation = validateArchiveRecord(adapted);
    expect(validation.isValid).toBe(true);
  });

  it('correctly adapts a legacy MediaRecord to Schema v1.0.0 ArchiveRecord', () => {
    const legacyMedia: LegacyMediaRecord = {
      id: 'legacy-doc-202',
      title: 'Fact Finding Report 2022',
      type: 'document',
      url: 'https://archive.org/details/report-2022',
      date: '2022-12-06',
      description: 'Official 592-page inquiry report regarding investigation proceedings.',
      source: 'Federal Investigation Agency',
    };

    const adapted = adaptLegacyMediaRecord(legacyMedia);

    expect(adapted.schemaVersion).toBe('1.0.0');
    expect(adapted.id).toBe('legacy-doc-202');
    expect(adapted.domain).toBe('evidence_media');
    expect(adapted.recordType).toBe('court_document');
    expect(adapted.evidenceMedia.length).toBe(1);
    expect(adapted.evidenceMedia[0].fileUrl).toBe('https://archive.org/details/report-2022');
    expect(adapted.sources.length).toBe(1);

    const validation = validateArchiveRecord(adapted);
    expect(validation.isValid).toBe(true);
  });
});
