/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Backward-Compatibility & Legacy Schema Migration Adapter
 */

import type { ArchiveRecord, SourceCitation } from '../types/archive';

export interface LegacyCaseRecord {
  id?: string;
  caseId?: string;
  title?: string | { en: string; ur: string };
  caseTitle?: string;
  urduTitle?: string;
  caseNumber?: string;
  court?: string;
  courtName?: string;
  bench?: string[];
  petitioner?: string;
  respondent?: string;
  filingDate?: string;
  decisionDate?: string;
  status?: string;
  summary?: string | { en: string; ur: string };
  summaryEn?: string;
  summaryUr?: string;
  description?: string | { en: string; ur: string };
  judgmentText?: string;
  citation?: string;
  sourceUrl?: string;
  sources?: string[];
  tags?: string[];
  isPublished?: boolean;
  associatedMediaIds?: string[];
}

export interface LegacyMediaRecord {
  id?: string;
  mediaId?: string;
  title?: string | { en: string; ur: string };
  urduTitle?: string;
  type?: 'video' | 'photo' | 'document' | 'audio' | 'dataset';
  mediaType?: 'video' | 'photo' | 'document';
  url?: string;
  fileUrl?: string;
  caseId?: string;
  date?: string;
  description?: string;
  source?: string;
}

/**
 * Converts a legacy CaseRecord into a compliant ArchiveRecord v1.0.0
 */
export function adaptLegacyCaseRecord(legacy: LegacyCaseRecord): ArchiveRecord {
  const recordId = legacy.id || legacy.caseId || `case-${Date.now()}`;
  const dateStr = legacy.decisionDate || legacy.filingDate || '2000-01-01';

  const titleEn =
    typeof legacy.title === 'object'
      ? legacy.title.en
      : legacy.title || legacy.caseTitle || 'Archival Legal Case';
  const titleUr =
    typeof legacy.title === 'object'
      ? legacy.title.ur
      : legacy.urduTitle || legacy.title || legacy.caseTitle || 'عدالتی مقدمہ و فیصلہ';

  const summaryEn =
    typeof legacy.summary === 'object'
      ? legacy.summary.en
      : legacy.summaryEn ||
        (typeof legacy.summary === 'string' ? legacy.summary : undefined) ||
        `Legal case proceeding regarding ${titleEn}.`;
  const summaryUr =
    typeof legacy.summary === 'object'
      ? legacy.summary.ur
      : legacy.summaryUr ||
        (typeof legacy.summary === 'string' ? legacy.summary : undefined) ||
        `عدالتی کارروائی برائے ${titleUr}`;

  const narrativeEn =
    typeof legacy.description === 'object'
      ? legacy.description.en
      : legacy.judgmentText ||
        (typeof legacy.description === 'string' ? legacy.description : undefined) ||
        legacy.summaryEn ||
        'Record migrated from legacy court registry.';
  const narrativeUr =
    typeof legacy.description === 'object'
      ? legacy.description.ur
      : (typeof legacy.description === 'string' ? legacy.description : undefined) ||
        legacy.summaryUr ||
        'سابقہ عدالتی ریکارڈ سے منتقل شدہ۔';

  const courtNameStr = legacy.court || legacy.courtName || 'Supreme Court of Pakistan';

  // Parse legacy sources array if provided
  const sources: SourceCitation[] = [];
  if (Array.isArray(legacy.sources) && legacy.sources.length > 0) {
    legacy.sources.forEach((srcStr, sIdx) => {
      const isUrl = srcStr.startsWith('http://') || srcStr.startsWith('https://');
      sources.push({
        sourceId: `src-${recordId}-${sIdx + 1}`,
        sourceType: 'court_judgment',
        title: {
          en: isUrl ? `${courtNameStr} Web Order` : srcStr,
          ur: isUrl ? `${courtNameStr} عدالتی دستاویز` : srcStr,
        },
        originalUrl: isUrl ? srcStr : undefined,
        documentIdentifier: !isUrl ? srcStr : legacy.caseNumber,
        language: 'both',
        verificationStatus: 'source_reviewed',
        verificationTier: 'primary_verified',
      });
    });
  } else {
    sources.push({
      sourceId: `src-${recordId}-doc`,
      sourceType: 'supreme_court_record',
      title: {
        en: legacy.citation || `${courtNameStr} Record`,
        ur: legacy.citation || 'عدالتی ریکارڈ',
      },
      documentIdentifier: legacy.caseNumber || legacy.citation,
      originalUrl: legacy.sourceUrl,
      language: 'both',
      verificationStatus: 'primary_source',
      verificationTier: 'primary_verified',
    });
  }

  return {
    schemaVersion: '1.0.0',
    id: recordId,
    slug: recordId.replace('rec-pk-legal-', ''),
    domain: 'legal',
    recordType: 'court_case',
    title: {
      en: titleEn,
      ur: titleUr,
    },
    summary: {
      en: summaryEn,
      ur: summaryUr,
    },
    narrative: {
      en: narrativeEn,
      ur: narrativeUr,
    },
    date: {
      dateString: dateStr,
      precision: dateStr.length === 4 ? 'year' : 'day',
      formattedDisplay: { en: dateStr, ur: dateStr },
    },
    dates: {
      filingDate: legacy.filingDate
        ? { dateString: legacy.filingDate, precision: 'day', formattedDisplay: { en: legacy.filingDate, ur: legacy.filingDate } }
        : undefined,
      judgmentDate: legacy.decisionDate
        ? { dateString: legacy.decisionDate, precision: 'day', formattedDisplay: { en: legacy.decisionDate, ur: legacy.decisionDate } }
        : undefined,
    },
    claims: [
      {
        claimId: `clm-${recordId}-01`,
        findingType: 'court_finding',
        assertion: {
          en: legacy.status || 'Judgment pronounced in open court.',
          ur: legacy.status || 'عدالت کی جانب سے فیصلہ سنایا گیا۔',
        },
        sourceIds: [sources[0].sourceId],
      },
    ],
    sources,
    evidenceMedia: [],
    relationships: [],
    categories: ['Legal', 'Legacy Case'],
    tags: {
      en: legacy.tags || ['Court Case', courtNameStr],
      ur: ['عدالتی مقدمہ', 'قانونی دستاویز'],
    },
    domainMetadata: {
      legal: {
        caseNumber: legacy.caseNumber,
        courtName: { en: courtNameStr, ur: courtNameStr },
        bench: legacy.bench?.map(b => ({ en: b, ur: b })),
        petitioners: legacy.petitioner ? [{ en: legacy.petitioner, ur: legacy.petitioner }] : undefined,
        respondents: legacy.respondent ? [{ en: legacy.respondent, ur: legacy.respondent }] : undefined,
      },
    },
    verificationStatus: 'verified',
    editorialStatus: legacy.isPublished !== false ? 'published' : 'draft',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Converts a legacy MediaRecord into a compliant ArchiveRecord v1.0.0
 */
export function adaptLegacyMediaRecord(legacy: LegacyMediaRecord): ArchiveRecord {
  const recordId = legacy.id || legacy.mediaId || `media-${Date.now()}`;
  const dateStr = legacy.date || '2020-01-01';
  const titleEn = typeof legacy.title === 'object' ? legacy.title.en : legacy.title || 'Archival Evidence Media';
  const titleUr =
    typeof legacy.title === 'object'
      ? legacy.title.ur
      : legacy.urduTitle || (typeof legacy.title === 'string' ? legacy.title : 'دستاویزی شواہد و میڈیا');

  const rawType = legacy.type || legacy.mediaType || 'document';
  const mediaUrl = legacy.url || legacy.fileUrl || 'https://example.com/media';

  const sourceId = `src-${recordId}`;

  return {
    schemaVersion: '1.0.0',
    id: recordId,
    slug: recordId.replace('rec-pk-media-', ''),
    domain: 'evidence_media',
    recordType: rawType === 'video' ? 'video_record' : rawType === 'photo' ? 'photograph_record' : 'court_document',
    title: {
      en: titleEn,
      ur: titleUr,
    },
    summary: {
      en: legacy.description || `Archival documentary media: ${titleEn}`,
      ur: titleUr,
    },
    narrative: {
      en: legacy.description || 'Archival media item preserved in the documentary repository.',
      ur: 'آرکائیو ریکارڈ میں محفوظ میڈیا دستاویز۔',
    },
    date: {
      dateString: dateStr,
      precision: 'day',
      formattedDisplay: { en: dateStr, ur: dateStr },
    },
    claims: [
      {
        claimId: `clm-${recordId}-01`,
        findingType: 'documented_fact',
        assertion: {
          en: `Archival media preserved with provenance from ${legacy.source || 'Primary Archive'}.`,
          ur: `شواہد اور میڈیا کا باضابطہ دستاویزی ریکارڈ۔`,
        },
        sourceIds: [sourceId],
      },
    ],
    sources: [
      {
        sourceId,
        sourceType: rawType === 'video' ? 'video' : rawType === 'photo' ? 'photograph' : 'document_pdf' as any,
        title: { en: titleEn, ur: titleUr },
        originalUrl: mediaUrl,
        publisher: legacy.source ? { en: legacy.source, ur: legacy.source } : undefined,
        language: 'both',
        verificationStatus: 'source_located',
        verificationTier: 'secondary_corroborated',
      },
    ],
    evidenceMedia: [
      {
        mediaId: recordId,
        mediaType: rawType === 'video' ? 'video' : rawType === 'photo' ? 'photograph' : 'document_pdf',
        title: { en: titleEn, ur: titleUr },
        fileUrl: mediaUrl,
        mimeType: rawType === 'video' ? 'video/mp4' : rawType === 'photo' ? 'image/jpeg' : 'application/pdf',
        privacy: 'public',
      },
    ],
    relationships: legacy.caseId
      ? [
          {
            relationshipId: `rel-${recordId}-to-case`,
            targetRecordId: legacy.caseId,
            predicate: 'documentedBy',
          },
        ]
      : [],
    categories: ['Evidence', 'Media'],
    tags: {
      en: ['Archival Media', rawType],
      ur: ['میڈیا ریکارڈ', 'شواہد'],
    },
    verificationStatus: 'verified',
    editorialStatus: 'published',
    privacyClassification: 'public',
    privacyFlags: {},
    version: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
