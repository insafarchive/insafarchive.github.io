/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Claims, Sources & Evidentiary Classification Unit Tests
 */

import { describe, it, expect } from 'vitest';
import type { EvidentiaryClaim, SourceCitation, ArchiveRecord } from '../types/archive';
import { validateArchiveRecord } from '../utils/schemaValidator';

describe('Claims & Sources Evidentiary Integrity', () => {
  const baseRecord: ArchiveRecord = {
    schemaVersion: '1.0.0',
    id: 'rec-test-evidentiary-01',
    slug: 'evidentiary-test',
    domain: 'human_rights',
    recordType: 'human_rights_incident',
    title: { en: 'Evidentiary Test Incident', ur: 'شواہد ٹیسٹ واقعہ' },
    summary: { en: 'Summary of incident testing evidentiary propositions.', ur: 'واقعہ کا خلاصہ برائے جانچ شواہد۔' },
    narrative: { en: 'Detailed procedural and factual narrative.', ur: 'تفصیلی اور قانونی بیانیہ۔' },
    date: {
      dateString: '2023-08-10',
      precision: 'day',
      formattedDisplay: { en: 'August 10, 2023', ur: '10 اگست 2023ء' },
    },
    claims: [],
    sources: [],
    evidenceMedia: [],
    relationships: [],
    categories: ['Human Rights'],
    tags: { en: ['Test'], ur: ['ٹیسٹ'] },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: '2023-08-10T00:00:00Z',
    updatedAt: '2023-08-10T00:00:00Z',
  };

  it('validates explicit differentiation between court_finding, allegation, and police_finding', () => {
    const primarySource: SourceCitation = {
      sourceId: 'src-court-judgment-01',
      sourceType: 'court_judgment',
      title: { en: 'High Court Bail Order', ur: 'ہائی کورٹ ضمانت آرڈر' },
      documentIdentifier: 'Cr. Misc 1234/2023',
      language: 'en',
      verificationStatus: 'primary_source',
    };

    const newspaperSource: SourceCitation = {
      sourceId: 'src-press-report-01',
      sourceType: 'reputable_journalism',
      title: { en: 'Press Report on Allegation', ur: 'اخباری رپورٹ' },
      originalUrl: 'https://dawn.com/news/12345',
      language: 'en',
      verificationStatus: 'source_reviewed',
    };

    const courtClaim: EvidentiaryClaim = {
      claimId: 'clm-court-01',
      findingType: 'court_finding',
      assertion: {
        en: 'High Court granted post-arrest bail noting lack of incriminating physical evidence.',
        ur: 'ہائی کورٹ نے ٹھوس مادی شواہد کی عدم موجودگی پر بعد از گرفتاری ضمانت منظور کی۔',
      },
      sourceIds: ['src-court-judgment-01'],
      attributedParty: { en: 'High Court Bench', ur: 'ہائی کورٹ بینچ' },
    };

    const allegationClaim: EvidentiaryClaim = {
      claimId: 'clm-allegation-01',
      findingType: 'allegation',
      assertion: {
        en: 'Complainant alleged unlawful assembly outside government premises.',
        ur: 'مدعی نے سرکاری عمارت کے باہر غیر قانونی اجتماع کا الزام عائد کیا۔',
      },
      sourceIds: ['src-press-report-01'],
      attributedParty: { en: 'Complainant Statement in FIR', ur: 'مدعی کا بیان' },
    };

    const record: ArchiveRecord = {
      ...baseRecord,
      sources: [primarySource, newspaperSource],
      claims: [courtClaim, allegationClaim],
    };

    const validation = validateArchiveRecord(record);
    expect(validation.isValid).toBe(true);

    // Verify claims are structurally distinct
    expect(record.claims[0].findingType).toBe('court_finding');
    expect(record.claims[1].findingType).toBe('allegation');
    expect(record.claims[0].findingType).not.toEqual(record.claims[1].findingType);
  });

  it('permits physical court records and gazettes without URLs without forcing fake URLs', () => {
    const physicalCourtFile: SourceCitation = {
      sourceId: 'src-physical-file-492',
      sourceType: 'high_court_record',
      title: {
        en: 'Sessions Court Trial Docket Case No. 492/2022',
        ur: 'سیشن کورٹ ٹرائل مثل مقدمہ نمبر 492/2022',
      },
      publisher: { en: 'Sessions Division Islamabad', ur: 'سیشن ڈویژن اسلام آباد' },
      documentIdentifier: 'Sessions Case 492/2022, Page 45-48',
      language: 'ur',
      verificationStatus: 'primary_source',
      // Notice: originalUrl is intentionally omitted
    };

    const claim: EvidentiaryClaim = {
      claimId: 'clm-docket-01',
      findingType: 'documented_fact',
      assertion: {
        en: 'Physical trial docket records the formal charge sheet submission on 15 September 2022.',
        ur: 'عدالتی مثل کے مطابق 15 ستمبر 2022ء کو باضابطہ چالان پیش کیا گیا۔',
      },
      sourceIds: ['src-physical-file-492'],
    };

    const record: ArchiveRecord = {
      ...baseRecord,
      sources: [physicalCourtFile],
      claims: [claim],
    };

    const validation = validateArchiveRecord(record);
    expect(validation.isValid).toBe(true);
    expect(record.sources[0].originalUrl).toBeUndefined();
    expect(record.sources[0].documentIdentifier).toBe('Sessions Case 492/2022, Page 45-48');
  });

  it('supports explicit source verification statuses including broken_link and access_restricted', () => {
    const archivedSource: SourceCitation = {
      sourceId: 'src-broken-archived',
      sourceType: 'reputable_journalism',
      title: { en: 'Historical Investigation (Archived)', ur: 'تحقیقاتی رپورٹ (محفوظ شدہ)' },
      originalUrl: 'https://example.com/dead-link-2015',
      archiveUrl: 'https://web.archive.org/web/2015/https://example.com/dead-link-2015',
      language: 'en',
      verificationStatus: 'broken_link',
    };

    const record: ArchiveRecord = {
      ...baseRecord,
      sources: [archivedSource],
      claims: [
        {
          claimId: 'clm-archived-01',
          findingType: 'investigative_finding',
          assertion: { en: 'Documented via Internet Archive snapshot.', ur: 'انٹرنیٹ آرکائیو کے ذریعے دستاویزی تصدیق۔' },
          sourceIds: ['src-broken-archived'],
        },
      ],
    };

    const validation = validateArchiveRecord(record);
    expect(validation.isValid).toBe(true);
    expect(record.sources[0].verificationStatus).toBe('broken_link');
    expect(record.sources[0].archiveUrl).toBeDefined();
  });
});
