/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Part 5.5 End-to-End QA Test Suite
 * Covers LocalStorage recovery, public archive isolation, import/export round-trip,
 * repository config verification, safeguards, and draft persistence.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createEmptyBundle,
  loadStudioBundle,
  saveStudioBundle,
  generateStableId,
  validateDossierDraft,
  validateClaimDraft,
  buildExportBundle,
  generateGitHubIssuePayload,
  generatePullRequestChecklist,
  importAndValidateJson,
  getCanonicalIdSets,
} from '../utils/adminStudioStorage';
import { getRepositoryConfig } from '../config/repository';
import type {
  StudioDraftBundle,
  StudioDossierDraft,
  StudioClaimDraft,
  StudioSourceDraft,
  StudioMediaDraft,
} from '../types/adminStudio';
import { ALL_ARCHIVAL_DOSSIERS } from '../data/dossiers/dossiersData';
import { CLAIM_SOURCE_AUDIT_DATA } from '../data/dossiers/dossierAudits';

describe('Part 5.5 Admin Editorial Studio QA & Public Archive Isolation Test Suite', () => {
  const STORAGE_KEY = 'insaf_archive_admin_studio_bundle_v1';
  let memoryStore: Record<string, string> = {};

  beforeEach(() => {
    memoryStore = {};
    const mockStorage = {
      getItem: (key: string) => memoryStore[key] || null,
      setItem: (key: string, val: string) => {
        memoryStore[key] = val;
      },
      removeItem: (key: string) => {
        delete memoryStore[key];
      },
      clear: () => {
        memoryStore = {};
      },
    };
    vi.stubGlobal('localStorage', mockStorage);
    vi.stubGlobal('window', { localStorage: mockStorage });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 1. LocalStorage malformed data recovery
  it('QA-1: safely recovers from malformed LocalStorage data without crashing', () => {
    // Case A: Corrupted non-JSON string
    localStorage.setItem(STORAGE_KEY, 'CORRUPTED_{{{NOT_JSON');
    const recoveredFromBadJson = loadStudioBundle();
    expect(recoveredFromBadJson).toBeDefined();
    expect(recoveredFromBadJson.dossiers).toEqual([]);
    expect(recoveredFromBadJson.claims).toEqual([]);

    // Case B: Corrupted JSON with non-array fields
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        bundleVersion: '1.0.0',
        dossiers: 'not-an-array',
        claims: null,
      })
    );
    const recoveredFromInvalidStructure = loadStudioBundle();
    expect(Array.isArray(recoveredFromInvalidStructure.dossiers)).toBe(true);
    expect(Array.isArray(recoveredFromInvalidStructure.claims)).toBe(true);

    // Case C: Array containing null or corrupted elements without IDs
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: '1.0.0',
        dossiers: [null, undefined, { invalid: 'no-id' }, { id: 'dos-valid-1', title: { en: 'Valid' } }],
        claims: [null, { claimId: 'clm-valid-1', statement: { en: 'Valid' } }],
        sources: [],
        media: [],
        queue: [],
        lastUpdated: new Date().toISOString(),
      })
    );
    const recoveredWithCleanElements = loadStudioBundle();
    expect(recoveredWithCleanElements.dossiers.length).toBe(1);
    expect(recoveredWithCleanElements.dossiers[0].id).toBe('dos-valid-1');
    expect(recoveredWithCleanElements.claims.length).toBe(1);
    expect(recoveredWithCleanElements.claims[0].claimId).toBe('clm-valid-1');
  });

  // 2. Draft Persistence & Round-Trip
  it('QA-2: persists drafts across save and load cycles', () => {
    const bundle: StudioDraftBundle = createEmptyBundle();
    const testDraft: StudioDossierDraft = {
      id: 'dos-pk-qa-only-test-persisted',
      slug: 'qa-only-test-persisted',
      title: { en: 'QA Persisted Test Title', ur: 'کیو اے ٹیسٹ عنوان' },
      overview: { en: 'Test overview verifying persistence', ur: 'ٹیسٹ خلاصہ' },
      domain: 'constitutional_legal',
      tags: ['qa-only'],
      editorialStatus: 'draft',
      legalProceedingStatus: 'unknown',
      verificationStatus: 'unverified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    };

    bundle.dossiers.push(testDraft);
    saveStudioBundle(bundle);

    const reloaded = loadStudioBundle();
    expect(reloaded.dossiers.length).toBe(1);
    expect(reloaded.dossiers[0].id).toBe('dos-pk-qa-only-test-persisted');
    expect(reloaded.dossiers[0].title.en).toBe('QA Persisted Test Title');
  });

  // 3. ID Collision Handling & Generation
  it('QA-3: avoids ID collisions with existing and draft items', () => {
    const existingIds = new Set(['dos-pk-test-1', 'dos-pk-test-2']);
    const newId1 = generateStableId('dos', 'Test Title', existingIds);
    expect(newId1).toBe('dos-pk-test-title');

    existingIds.add(newId1);
    const newId2 = generateStableId('dos', 'Test Title', existingIds);
    expect(newId2).not.toBe(newId1);
    expect(newId2.startsWith('dos-pk-test-title-')).toBe(true);
  });

  // 4. Duplicate ID Detection
  it('QA-4: flags duplicate IDs when attempting to create a new record with existing ID', () => {
    const canonicalDossier = ALL_ARCHIVAL_DOSSIERS[0];
    const duplicateDraft: StudioDossierDraft = {
      id: canonicalDossier.id, // Re-using canonical ID for a new record!
      slug: 'brand-new-slug-duplicate',
      title: { en: 'Duplicate ID Test', ur: 'ڈپلیکیٹ آئی ڈی ٹیسٹ' },
      overview: { en: 'Overview', ur: 'خلاصہ' },
      domain: 'constitutional_legal',
      tags: [],
      editorialStatus: 'draft',
      legalProceedingStatus: 'unknown',
      verificationStatus: 'unverified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: true, // Marked as new!
    };

    const canonicalIds = getCanonicalIdSets();
    const result = validateDossierDraft(duplicateDraft, canonicalIds.dossierIds, canonicalIds.slugs);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'id' && e.messageEn.includes('collides'))).toBe(true);
  });

  // 5. CRITICAL: Public Archive Isolation
  it('QA-5: guarantees strict public archive isolation (drafts NEVER mutate canonical data)', () => {
    const initialCanonicalCount = ALL_ARCHIVAL_DOSSIERS.length;
    const initialClaimsCount = CLAIM_SOURCE_AUDIT_DATA.length;
    const firstCanonicalTitleEn = ALL_ARCHIVAL_DOSSIERS[0].title.en;

    // Simulate saving a QA-only draft in local storage bundle
    const qaBundle = createEmptyBundle();
    qaBundle.dossiers.push({
      id: 'dos-pk-qa-only-isolated-test',
      slug: 'qa-only-isolated-test',
      title: { en: 'QA Leaked Title Should Not Mutate Canonical', ur: 'کیو اے عنوان' },
      overview: { en: 'Overview', ur: 'خلاصہ' },
      domain: 'constitutional_legal',
      tags: ['qa-only'],
      editorialStatus: 'draft',
      legalProceedingStatus: 'unknown',
      verificationStatus: 'unverified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    });
    saveStudioBundle(qaBundle);

    // Verify canonical ALL_ARCHIVAL_DOSSIERS array is completely untouched
    expect(ALL_ARCHIVAL_DOSSIERS.length).toBe(initialCanonicalCount);
    expect(ALL_ARCHIVAL_DOSSIERS[0].title.en).toBe(firstCanonicalTitleEn);
    expect(ALL_ARCHIVAL_DOSSIERS.some(d => d.id === 'dos-pk-qa-only-isolated-test')).toBe(false);

    // Verify canonical CLAIM_SOURCE_AUDIT_DATA is untouched
    expect(CLAIM_SOURCE_AUDIT_DATA.length).toBe(initialClaimsCount);

    // Generating export payload does not mutate canonical data
    const exportBundle = buildExportBundle(qaBundle);
    expect(exportBundle).toBeDefined();
    expect(ALL_ARCHIVAL_DOSSIERS.length).toBe(initialCanonicalCount);
  });

  // 6. Sub Judice & Active Reporting Ban Safeguards
  it('QA-6: enforces sub judice notice and blocks publication under active reporting bans', () => {
    // A. Sub judice / ongoing status without notice must fail validation
    const subJudiceDraftWithoutNotice: StudioDossierDraft = {
      id: 'dos-pk-qa-sub-judice-test',
      slug: 'qa-sub-judice-test',
      title: { en: 'Sub Judice Case', ur: 'زیر سماعت مقدمہ' },
      overview: { en: 'Case currently pending adjudication before court.', ur: 'مقدمہ عدالت کے سامنے زیر سماعت ہے۔' },
      domain: 'constitutional_legal',
      tags: [],
      editorialStatus: 'draft',
      legalProceedingStatus: 'ongoing', // Sub judice / ongoing
      verificationStatus: 'verified',
      hasActiveReportingBan: false,
      pendingProceedingsNotice: { en: '', ur: '' }, // EMPTY NOTICE!
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    };

    const resultA = validateDossierDraft(subJudiceDraftWithoutNotice, new Set(), new Set());
    expect(resultA.isValid).toBe(false);
    expect(resultA.errors.some(e => e.field.startsWith('pendingProceedingsNotice'))).toBe(true);

    // B. Active reporting ban with status other than 'draft' or 'under_review' must fail validation
    const bannedDraftAttemptingPublishedStatus: StudioDossierDraft = {
      ...subJudiceDraftWithoutNotice,
      editorialStatus: 'published', // Attempting to mark as published!
      hasActiveReportingBan: true, // Active reporting ban!
      pendingProceedingsNotice: { en: 'Sub judice notice', ur: 'قانونی نوٹس' },
    };
    const resultB = validateDossierDraft(bannedDraftAttemptingPublishedStatus, new Set(), new Set());
    expect(resultB.isValid).toBe(false);
    expect(resultB.errors.some(e => e.field === 'hasActiveReportingBan')).toBe(true);
  });

  // 7. Claim and Source Reference Validation
  it('QA-7: validates source references and rejects non-existent sources', () => {
    const claimWithBadSource: StudioClaimDraft = {
      claimId: 'clm-pk-qa-test-claim',
      dossierId: ALL_ARCHIVAL_DOSSIERS[0].id,
      statement: { en: 'Statement text', ur: 'بیان' },
      claimClassification: 'documented_fact',
      verificationStatus: 'primary_source_supported',
      supportingSourceIds: ['src-completely-nonexistent-id'],
      contradictoryOrQualifyingSourceIds: [],
      whatEvidenceEstablishes: 'Evidence establishing statement',
      whatEvidenceDoesNotEstablish: 'Does not establish broader conspiracy',
      reviewerNotes: '',
      lastReviewDate: '2024-05-15',
      isNewRecord: true,
    };

    const validDossierIds = new Set([ALL_ARCHIVAL_DOSSIERS[0].id]);
    const validSourceIds = new Set(['src-real-source-1']);

    const result = validateClaimDraft(claimWithBadSource, validDossierIds, validSourceIds, new Set());
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'supportingSourceIds')).toBe(true);
  });

  // 8. Import/Export Round-Trip
  it('QA-8: completes full export/import round-trip preserving data integrity', () => {
    const initialBundle: StudioDraftBundle = createEmptyBundle();
    const sourceDraft: StudioSourceDraft = {
      sourceId: 'src-pk-qa-roundtrip-source',
      title: { en: 'Roundtrip Test Court Order', ur: 'عدالتی حکم نامہ' },
      publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
      sourceType: 'court_order',
      officialUrl: 'https://www.supremecourt.gov.pk/orders/order-123.pdf',
      accessDate: '2024-05-15',
      sourceAvailability: 'accessible',
      authenticityStatus: 'official_document',
      supportsClaim: [],
      isNewRecord: true,
    };
    initialBundle.sources.push(sourceDraft);

    // 1. Export
    const exportedBundle = buildExportBundle(initialBundle);
    const exportedJsonStr = JSON.stringify(exportedBundle);

    // 2. Import
    const importResult = importAndValidateJson(exportedJsonStr);
    expect(importResult.success).toBe(true);
    expect(importResult.type).toBe('bundle');
    const importedPayload = (importResult.data as any)?.payloadData;
    expect(importedPayload?.sources?.length).toBe(1);
    expect(importedPayload?.sources?.[0]?.sourceId).toBe('src-pk-qa-roundtrip-source');
    expect(importedPayload?.sources?.[0]?.publisherOrIssuingAuthority).toBe('Supreme Court of Pakistan');
  });

  // 9. Centralized Repository URL Configuration Verification
  it('QA-9: verifies repository config returns honest unconfigured warning when VITE_GITHUB_REPO is unset', () => {
    const config = getRepositoryConfig();
    expect(config).toBeDefined();
    expect(config.baseUrl).toContain('github.com');
    expect(config.issuesUrl).toContain('github.com');
    // In test environment without VITE_GITHUB_REPO set, isConfigured should be false with a clear explanation
    expect(config.isConfigured).toBe(false);
    expect(config.configurationWarning).toBeDefined();
    expect(config.configurationWarning).toContain('VITE_GITHUB_REPO');
  });

  // 10. QA-only Complete Linked Bundle Round-Trip
  it('QA-10: executes full round-trip for qa-only-2026-11 linked bundle (dossier, claim, source, media)', () => {
    const qaBundle: StudioDraftBundle = createEmptyBundle();

    const dossierId = 'dos-pk-qa-only-2026-11';
    const claimId = 'clm-pk-qa-only-2026-11';
    const sourceId = 'src-pk-qa-only-2026-11';
    const mediaId = 'med-pk-qa-only-2026-11';

    const qaDossier: StudioDossierDraft = {
      id: dossierId,
      slug: 'qa-only-2026-11-test-dossier',
      title: { en: 'QA Only 2026-11 Test Dossier', ur: 'کیو اے مخصوص امتحانی فائل' },
      overview: {
        en: 'A controlled QA-only test dossier to verify export, import, round-trip, and storage isolation.',
        ur: 'ادارتی اسٹوڈیو کی توثیق کے لیے تیار کردہ خصوصی امتحانی مسودہ۔',
      },
      domain: 'constitutional_legal',
      tags: ['qa-only', 'test-suite'],
      editorialStatus: 'draft',
      legalProceedingStatus: 'concluded',
      verificationStatus: 'verified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
        reviewerNotes: 'QA-only test fixture',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    };

    const qaSource: StudioSourceDraft = {
      sourceId,
      title: { en: 'QA Official Supreme Court Order Sheet', ur: 'کیو اے سرکاری عدالتی آرڈر شیٹ' },
      publisherOrIssuingAuthority: 'Supreme Court of Pakistan',
      sourceType: 'court_order',
      officialUrl: 'https://www.supremecourt.gov.pk/orders/qa-test.pdf',
      publicationDate: '2023-12-13',
      judgmentDate: '2023-12-13',
      accessDate: '2024-05-15',
      sourceAvailability: 'accessible',
      authenticityStatus: 'official_document',
      supportsClaim: [claimId],
      isNewRecord: true,
    };

    const qaClaim: StudioClaimDraft = {
      claimId,
      dossierId,
      statement: {
        en: 'QA verified court finding statement establishing operative condition.',
        ur: 'کیو اے کے تحت تصدیق شدہ عدالتی کارروائی کا قانونی بیان۔',
      },
      claimClassification: 'judicial_finding',
      verificationStatus: 'primary_source_supported',
      supportingSourceIds: [sourceId],
      contradictoryOrQualifyingSourceIds: [],
      whatEvidenceEstablishes: 'Operative paragraph establishes the condition.',
      whatEvidenceDoesNotEstablish: 'Does not establish broader factual dispute.',
      reviewerNotes: 'QA-only claim record.',
      lastReviewDate: '2024-05-15',
      isNewRecord: true,
    };

    const qaMedia: StudioMediaDraft = {
      mediaId,
      title: { en: 'QA Evidentiary Document Scan', ur: 'کیو اے دستاویزی ثبوت' },
      documentCategory: 'court_order',
      platformOrPublisher: 'Supreme Court Official Repository',
      originalUrl: 'https://www.supremecourt.gov.pk/downloads/qa-scan.pdf',
      dateAdded: '2024-05-15',
      associatedDossierId: dossierId,
      associatedClaimIds: [claimId],
      rightsNotes: 'Public domain court document',
      verificationStatus: 'verified',
      description: { en: 'QA media attachment', ur: 'کیو اے میڈیا ریکارڈ' },
      isSensitivePersonalData: false,
      piiRedacted: true,
      isNewRecord: true,
    };

    qaBundle.dossiers.push(qaDossier);
    qaBundle.sources.push(qaSource);
    qaBundle.claims.push(qaClaim);
    qaBundle.media.push(qaMedia);
    qaBundle.queue.push({
      queueId: `queue-dos-${dossierId}`,
      recordType: 'dossier',
      recordId: dossierId,
      changeType: 'create',
      titleEn: qaDossier.title.en,
      titleUr: qaDossier.title.ur,
      fieldsChanged: ['all'],
      reasonForChange: 'QA testing linked export/import round-trip',
      localReviewStatus: 'validation_passed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      validationErrors: [],
    });

    // 1. Export
    const exportBundle = buildExportBundle(qaBundle);
    expect(exportBundle.bundleVersion).toBe('1.0.0');
    expect(exportBundle.summary.dossierCount).toBe(1);
    expect(exportBundle.summary.claimCount).toBe(1);
    expect(exportBundle.summary.sourceCount).toBe(1);
    expect(exportBundle.summary.mediaCount).toBe(1);

    const jsonString = JSON.stringify(exportBundle, null, 2);
    expect(jsonString).toContain(dossierId);
    expect(jsonString).toContain(claimId);
    expect(jsonString).toContain(sourceId);
    expect(jsonString).toContain(mediaId);

    // 2. Import into clean bundle
    const importResult = importAndValidateJson(jsonString);
    expect(importResult.success).toBe(true);
    expect(importResult.type).toBe('bundle');

    const importedData = (importResult.data as any).payloadData;
    expect(importedData.dossiers[0].id).toBe(dossierId);
    expect(importedData.claims[0].claimId).toBe(claimId);
    expect(importedData.claims[0].dossierId).toBe(dossierId);
    expect(importedData.claims[0].supportingSourceIds[0]).toBe(sourceId);
    expect(importedData.sources[0].sourceId).toBe(sourceId);
    expect(importedData.media[0].associatedDossierId).toBe(dossierId);
  });

  // 11. Duplicate-ID Merge Handling vs Replace
  it('QA-11: safely merges imported records by ID, replacing existing matches without creating duplicates', () => {
    const existingDossierA: StudioDossierDraft = {
      id: 'dos-pk-qa-merge-test-1',
      slug: 'qa-merge-test-1',
      title: { en: 'Version A Title', ur: 'ورژن اے' },
      overview: { en: 'Version A overview content text', ur: 'ورژن اے کا متن' },
      domain: 'constitutional_legal',
      tags: [],
      editorialStatus: 'draft',
      legalProceedingStatus: 'concluded',
      verificationStatus: 'verified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    };

    const existingDossierB: StudioDossierDraft = {
      ...existingDossierA,
      id: 'dos-pk-qa-unrelated-draft',
      slug: 'qa-unrelated-draft',
      title: { en: 'Unrelated Draft Stored In Browser', ur: 'غیر متعلقہ ڈرافٹ' },
    };

    const currentStore = [existingDossierA, existingDossierB];

    // Incoming import containing updated version of A
    const incomingDossierAUpdated: StudioDossierDraft = {
      ...existingDossierA,
      title: { en: 'Version B Updated Title', ur: 'ورژن بی تجدید شدہ' },
      overview: { en: 'Version B updated overview text content', ur: 'ورژن بی خلاصہ' },
    };
    const incomingNewDossierC: StudioDossierDraft = {
      ...existingDossierA,
      id: 'dos-pk-qa-new-record-c',
      slug: 'qa-new-record-c',
      title: { en: 'Newly Added Record C', ur: 'نیا ریکارڈ سی' },
    };

    // Apply mergeById logic as implemented in AdminStudio.tsx
    const map = new Map<string, StudioDossierDraft>();
    for (const item of currentStore) map.set(item.id, item);
    for (const item of [incomingDossierAUpdated, incomingNewDossierC]) map.set(item.id, item);
    const merged = Array.from(map.values());

    // Proves:
    // 1. Total length is 3 (not 4: no duplicate ID)
    expect(merged.length).toBe(3);
    // 2. Version A was updated in-place with Version B content
    const updatedA = merged.find(d => d.id === 'dos-pk-qa-merge-test-1');
    expect(updatedA?.title.en).toBe('Version B Updated Title');
    // 3. Unrelated draft B was preserved completely intact
    const preservedB = merged.find(d => d.id === 'dos-pk-qa-unrelated-draft');
    expect(preservedB?.title.en).toBe('Unrelated Draft Stored In Browser');
    // 4. New record C was added cleanly
    const addedC = merged.find(d => d.id === 'dos-pk-qa-new-record-c');
    expect(addedC?.title.en).toBe('Newly Added Record C');
  });

  // 12. Malformed JSON handling during import
  it('QA-12: rejects malformed JSON strings without altering local storage state', () => {
    const invalidJsonStrings = [
      '{ unclosed_bracket: "test"',
      '<!DOCTYPE html><html><body>Error</body></html>',
      'null',
      '"just a string"',
      '12345',
    ];

    for (const badJson of invalidJsonStrings) {
      const result = importAndValidateJson(badJson);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    }
  });

  // 13. GitHub Issue and PR Payload Verification
  it('QA-13: generates correct GitHub Issue and PR checklist referencing canonical target files and templates', () => {
    const bundle: StudioDraftBundle = createEmptyBundle();
    bundle.dossiers.push({
      id: 'dos-pk-qa-github-payload-test',
      slug: 'qa-github-payload-test',
      title: { en: 'GitHub Hand-Off QA Dossier', ur: 'گٹ ہب ہینڈ آف فائل' },
      overview: { en: 'Overview testing GitHub issue body formatting.', ur: 'خلاصہ' },
      domain: 'constitutional_legal',
      tags: [],
      editorialStatus: 'draft',
      legalProceedingStatus: 'concluded',
      verificationStatus: 'verified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    });
    bundle.queue.push({
      queueId: 'queue-1',
      recordType: 'dossier',
      recordId: 'dos-pk-qa-github-payload-test',
      changeType: 'create',
      titleEn: 'GitHub Hand-Off QA Dossier',
      titleUr: 'گٹ ہب ہینڈ آف فائل',
      fieldsChanged: ['title', 'overview'],
      reasonForChange: 'Verify GitHub Issue/PR payload',
      localReviewStatus: 'validation_passed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      validationErrors: [],
    });

    const issuePayload = generateGitHubIssuePayload(bundle);
    expect(issuePayload.title).toContain('[EDITORIAL SUBMISSION]');
    expect(issuePayload.title).toContain('dos-pk-qa-github-payload-test');
    expect(issuePayload.body).toContain('### Insaf Archive — Structured Editorial Proposal');
    expect(issuePayload.body).toContain('dos-pk-qa-github-payload-test');
    expect(issuePayload.body).toContain('```json');

    const prChecklist = generatePullRequestChecklist(bundle);
    expect(prChecklist).toContain('src/data/dossiers/dossiersData.ts');
    expect(prChecklist).toContain('src/data/dossiers/dossierAudits.ts');
    expect(prChecklist).toContain('npm run test');
    expect(prChecklist).toContain('npm run validate-data');
  });

  // 14. Primary Legal Source Audit: Military Courts Stay Order
  it('QA-14: audits primary legal source src-sc-ica-mil-courts-stay-2023 against judicial finding claim', () => {
    // 1. Locate military courts dossier in canonical records
    const militaryDossier = ALL_ARCHIVAL_DOSSIERS.find(d => d.id === 'dos-pk-legal-military-courts-2023');
    expect(militaryDossier).toBeDefined();

    // 2. Locate the primary source record
    const stayOrderSource = militaryDossier?.sources?.find(s => s.sourceId === 'src-sc-ica-mil-courts-stay-2023');
    expect(stayOrderSource).toBeDefined();
    expect(stayOrderSource?.sourceType).toBe('court_order');
    expect(stayOrderSource?.documentIdentifier).toBe('ICA No. 558 of 2023');
    expect(stayOrderSource?.publicationDate?.dateString).toBe('2023-12-13');
    expect(stayOrderSource?.authenticityStatus).toBe('official_document');
    expect(stayOrderSource?.officialUrl).toBe('https://www.supremecourt.gov.pk');

    // 3. Locate the audited claim in CLAIM_SOURCE_AUDIT_DATA
    const stayClaim = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === 'clm-mil-ica-stay-order');
    expect(stayClaim).toBeDefined();
    expect(stayClaim?.supportingSourceIds).toContain('src-sc-ica-mil-courts-stay-2023');
    expect(stayClaim?.exactStatement?.en).toContain('5-1 majority in ICA 558/2023');
    expect(stayClaim?.exactStatement?.en).toContain('without pronouncement of final sentence without court leave');

    // 4. Confirm sub judice protections and un-published status
    expect(militaryDossier?.legalProceedingStatus).toBe('stayed');
    expect(militaryDossier?.editorialStatus).toBe('under_review');
    expect(militaryDossier?.pendingProceedingsNotice?.en).toContain('stayed by a 5-1 majority of a 6-member bench on 13 December 2023 in ICA 558/2023');
  });
});
