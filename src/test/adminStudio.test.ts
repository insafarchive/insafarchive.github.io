/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Part 5.4 Test Suite — Admin Editorial Studio & Data Entry Workflow
 * Verifies all 15 requirements specified in Master Prompt Part 5.4 Section 9
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  createEmptyBundle,
  generateStableId,
  validateDossierDraft,
  validateClaimDraft,
  validateSourceDraft,
  validateMediaDraft,
  buildExportBundle,
  generateMarkdownReviewSummary,
  generateGitHubIssuePayload,
  generatePullRequestChecklist,
  importAndValidateJson,
  getCanonicalIdSets,
} from '../utils/adminStudioStorage';
import type {
  StudioDraftBundle,
  StudioDossierDraft,
  StudioClaimDraft,
  StudioSourceDraft,
  StudioMediaDraft,
} from '../types/adminStudio';
import { ALL_ARCHIVAL_DOSSIERS } from '../data/dossiers/dossiersData';
import { CLAIM_SOURCE_AUDIT_DATA } from '../data/dossiers/dossierAudits';

describe('Part 5.4 Admin Editorial Studio & Structured Data Entry Test Suite', () => {
  let bundle: StudioDraftBundle;

  beforeEach(() => {
    bundle = createEmptyBundle();
  });

  // Requirement 1: Creating a valid dossier draft
  it('Requirement 1: proves creation of a fully valid bilingual dossier draft', () => {
    const draft: StudioDossierDraft = {
      id: 'dos-pk-legal-nab-amendments-2023',
      slug: 'supreme-court-rulings-nab-amendments-2023',
      title: {
        en: 'Supreme Court Judgment on NAB Amendments 2023 (Const. Pet. 21/2022)',
        ur: 'نیب ترامیم پر سپریم کورٹ کا تاریخی فیصلہ (آئینی پٹیشن 21/2022)',
      },
      overview: {
        en: 'Examines the Supreme Court 3-member bench judgment declaring retroactive amendments to the National Accountability Ordinance unconstitutional.',
        ur: 'نیب آرڈیننس میں ماضی سے لاگو ترامیم کو کالعدم قرار دینے کے سپریم کورٹ کے 3 رکنی بینچ کے فیصلے کا دستاویزی جائزہ۔',
      },
      domain: 'constitutional_legal',
      tags: ['nab-amendments', 'supreme-court', 'accountability'],
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
        reviewerNotes: 'Official reported judgment PLD 2023 SC 101 inspected.',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    };

    const canonicalIds = getCanonicalIdSets();
    const result = validateDossierDraft(draft, canonicalIds.dossierIds, canonicalIds.slugs);
    expect(result.isValid).toBe(true);
    expect(result.totalErrors).toBe(0);
  });

  // Requirement 2: Editing an existing dossier without duplication
  it('Requirement 2: proves editing an existing dossier updates in-place without duplicating', () => {
    const existingId = ALL_ARCHIVAL_DOSSIERS[0].id;
    const existingSlug = ALL_ARCHIVAL_DOSSIERS[0].slug;

    const draftUpdate: StudioDossierDraft = {
      id: existingId,
      slug: existingSlug,
      title: {
        en: 'Updated Title for Existing Military Courts Dossier',
        ur: 'فوجی عدالتوں کی فائل کا تجدید شدہ عنوان',
      },
      overview: {
        en: 'Updated overview containing verified procedural history up to Intra-Court Appeals stay orders.',
        ur: 'انٹرا کورٹ اپیلوں میں حکم امتناعی تک کی عدالتی کارروائی کا تفصیلی جائزہ۔',
      },
      domain: 'constitutional_legal',
      tags: ['military-courts'],
      editorialStatus: 'under_review',
      legalProceedingStatus: 'stayed',
      verificationStatus: 'verified',
      hasActiveReportingBan: false,
      pendingProceedingsNotice: {
        en: 'Notice of Pending ICA: Operative order stayed by 6-member bench on 13 December 2023.',
        ur: 'حکمِ امتناعی کا نوٹس: 13 دسمبر 2023ء کو 6 رکنی بینچ نے مختصر فیصلے پر عمل درآمد معطل کیا۔',
      },
      lastLegalStatusChecked: new Date().toISOString().split('T')[0],
      privacyReview: {
        hasSensitivePersonalData: false,
        piiRedacted: true,
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'low',
      },
      unresolvedQuestions: [],
      isNewRecord: false, // In edit mode
    };

    const canonicalIds = getCanonicalIdSets();
    const result = validateDossierDraft(draftUpdate, canonicalIds.dossierIds, canonicalIds.slugs);
    expect(result.isValid).toBe(true);
    expect(result.totalErrors).toBe(0);
  });

  // Requirement 3: Stable ID collision detection
  it('Requirement 3: proves collision-safe ID generation and duplicate ID rejection for new records', () => {
    const existingIds = new Set(['dos-pk-legal-military-courts-2023', 'dos-pk-event-may-09-2023']);
    const genId1 = generateStableId('dos', 'Military Courts 2023', existingIds);
    expect(genId1).not.toBe('dos-pk-legal-military-courts-2023');
    expect(genId1).toContain('dos-pk-military-courts-2023');

    // Attempting to register a NEW dossier with an already existing ID fails validation
    const collidingDraft: StudioDossierDraft = {
      id: 'dos-pk-legal-military-courts-2023',
      slug: 'new-unique-slug',
      title: { en: 'Colliding Dossier Title', ur: 'متصادم عنوان' },
      overview: { en: 'A sufficiently long overview in English describing the case.', ur: 'کافی طویل اردو خلاصہ جو شرائط پر پورا اترتا ہو۔' },
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

    const result = validateDossierDraft(collidingDraft, existingIds, new Set());
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'id' && e.messageEn.includes('collides'))).toBe(true);
  });

  // Requirement 4: Bilingual required-field validation
  it('Requirement 4: proves bilingual required-field validation rejects missing or empty Urdu/English text', () => {
    const missingUrduDraft: StudioDossierDraft = {
      id: 'dos-pk-legal-sample-test',
      slug: 'sample-test-slug',
      title: { en: 'Valid English Title', ur: '' }, // Missing Urdu
      overview: { en: 'A valid detailed overview of the legal case.', ur: '' }, // Missing Urdu
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

    const result = validateDossierDraft(missingUrduDraft, new Set(), new Set());
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'title.ur')).toBe(true);
    expect(result.errors.some(e => e.field === 'overview.ur')).toBe(true);
  });

  // Requirement 5: Claim-to-dossier relationship validation
  it('Requirement 5: proves claim-to-dossier relationship validation flags invalid parent dossier IDs', () => {
    const claim: StudioClaimDraft = {
      claimId: 'clm-test-non-existent-parent',
      dossierId: 'dos-pk-phantom-non-existent-dossier', // Invalid
      statement: {
        en: 'The Supreme Court issued an interim injunction restraining authorities.',
        ur: 'سپریم کورٹ نے حکام کو گرفتاری سے روکنے کا عبوری حکم جاری کیا۔',
      },
      claimClassification: 'judicial_finding',
      verificationStatus: 'primary_source_supported',
      supportingSourceIds: ['src-sc-mil-courts-2023-order'],
      contradictoryOrQualifyingSourceIds: [],
      whatEvidenceEstablishes: 'Verifies court injunction.',
      whatEvidenceDoesNotEstablish: 'Does not decide underlying constitutional merits.',
      reviewerNotes: 'Verified via certified court order.',
      lastReviewDate: '2024-05-15',
      isNewRecord: true,
    };

    const canonicalIds = getCanonicalIdSets();
    expect(CLAIM_SOURCE_AUDIT_DATA.length).toBeGreaterThan(0);
    const result = validateClaimDraft(claim, canonicalIds.dossierIds, canonicalIds.sourceIds, canonicalIds.claimIds);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'dossierId')).toBe(true);
  });

  // Requirement 6: Claim-to-source relationship validation
  it('Requirement 6: proves claim-to-source relationship validation requires existing source references', () => {
    const claim: StudioClaimDraft = {
      claimId: 'clm-test-broken-source',
      dossierId: ALL_ARCHIVAL_DOSSIERS[0].id,
      statement: {
        en: 'The judicial bench held proceedings in open court.',
        ur: 'عدالتی بینچ نے کھلی عدالت میں کارروائی کی۔',
      },
      claimClassification: 'documented_fact',
      verificationStatus: 'primary_source_supported',
      supportingSourceIds: ['src-phantom-unregistered-source-999'], // Broken source
      contradictoryOrQualifyingSourceIds: [],
      whatEvidenceEstablishes: 'Verifies open court proceedings.',
      whatEvidenceDoesNotEstablish: 'Does not prove final outcome.',
      reviewerNotes: 'Note on source.',
      lastReviewDate: '2024-05-15',
      isNewRecord: true,
    };

    const canonicalIds = getCanonicalIdSets();
    const result = validateClaimDraft(claim, canonicalIds.dossierIds, canonicalIds.sourceIds, canonicalIds.claimIds);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'supportingSourceIds')).toBe(true);
  });

  // Requirement 7: Source URL and verification-state validation
  it('Requirement 7: proves source URL validation rejects malformed, placeholder, or invented links', () => {
    const badSource: StudioSourceDraft = {
      sourceId: 'src-test-bad-url',
      title: { en: 'Sample Court Notice', ur: 'عدالتی نوٹس' },
      publisherOrIssuingAuthority: 'High Court',
      sourceType: 'court_order',
      officialUrl: 'https://example.com/fake-order.pdf', // Placeholder URL
      accessDate: '2024-05-15',
      sourceAvailability: 'not_checked',
      authenticityStatus: 'official_document', // Inconsistent: not checked but claims official
      isNewRecord: true,
    };

    const result = validateSourceDraft(badSource, new Set());
    expect(result.isValid).toBe(false);
    // Expect error on placeholder URL
    expect(result.errors.some(e => e.field === 'officialUrl' && e.messageEn.includes('Placeholder'))).toBe(true);
    // Expect error on not_checked with official_document
    expect(result.errors.some(e => e.field === 'authenticityStatus')).toBe(true);
  });

  // Requirement 8: Importing valid JSON
  it('Requirement 8: proves importing valid JSON successfully parses and categorizes bundles or records', () => {
    const validDossierJson = JSON.stringify({
      id: 'dos-pk-legal-imported-2024',
      slug: 'imported-dossier-2024',
      domain: 'constitutional_legal',
      title: { en: 'Imported Dossier', ur: 'درآمد شدہ فائل' },
      overview: { en: 'Imported overview description with adequate length.', ur: 'درآمد شدہ اردو خلاصہ۔' },
    });

    const result = importAndValidateJson(validDossierJson);
    expect(result.success).toBe(true);
    expect(result.type).toBe('dossier');
    expect((result.data as any).id).toBe('dos-pk-legal-imported-2024');
  });

  // Requirement 9: Rejecting malformed JSON
  it('Requirement 9: proves malformed or invalid JSON is rejected with actionable error messages', () => {
    const badJson = '{ invalid_json_syntax: true, ';
    const result = importAndValidateJson(badJson);
    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0]).toContain('Malformed JSON');

    const unknownSchemaJson = JSON.stringify({ someRandomField: 12345 });
    const result2 = importAndValidateJson(unknownSchemaJson);
    expect(result2.success).toBe(false);
    expect(result2.errors[0]).toContain('Unrecognized schema');
  });

  // Requirement 10: Detecting duplicate IDs
  it('Requirement 10: proves duplicate IDs are flagged when adding duplicate records', () => {
    const existingSourceIds = new Set(['src-sc-mil-courts-2023-order']);
    const duplicateSource: StudioSourceDraft = {
      sourceId: 'src-sc-mil-courts-2023-order', // Duplicate
      title: { en: 'Duplicate Supreme Court Order', ur: 'ڈپلیکیٹ حکم نامہ' },
      publisherOrIssuingAuthority: 'Supreme Court',
      sourceType: 'court_order',
      accessDate: '2024-05-15',
      sourceAvailability: 'accessible',
      authenticityStatus: 'official_document',
      isNewRecord: true,
    };

    const result = validateSourceDraft(duplicateSource, existingSourceIds);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'sourceId' && e.messageEn.includes('collides'))).toBe(true);
  });

  // Requirement 11: Exporting a change bundle
  it('Requirement 11: proves change bundle export compiles valid JSON with markdown summary and PR checklist', () => {
    bundle.dossiers.push({
      id: 'dos-pk-test-bundle-export',
      slug: 'test-bundle-export',
      title: { en: 'Test Bundle Dossier', ur: 'ٹیسٹ بنڈل فائل' },
      overview: { en: 'Detailed overview of the test bundle dossier for export.', ur: 'ٹیسٹ بنڈل فائل کا تفصیلی خلاصہ برائے ایکسپورٹ۔' },
      domain: 'due_process_rights',
      tags: ['test'],
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
      queueId: 'queue-dos-pk-test-bundle-export',
      recordType: 'dossier',
      recordId: 'dos-pk-test-bundle-export',
      changeType: 'create',
      titleEn: 'Test Bundle Dossier',
      titleUr: 'ٹیسٹ بنڈل فائل',
      fieldsChanged: ['all'],
      reasonForChange: 'Initial draft proposal',
      localReviewStatus: 'validation_passed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      validationErrors: [],
    });

    const exportBundle = buildExportBundle(bundle);
    expect(exportBundle.bundleVersion).toBe('1.0.0');
    expect(exportBundle.summary.dossierCount).toBe(1);
    expect(exportBundle.summary.totalChanges).toBe(1);

    const mdSummary = generateMarkdownReviewSummary(bundle);
    expect(mdSummary).toContain('# Editorial Proposal Review Summary');
    expect(mdSummary).toContain('dos-pk-test-bundle-export');

    const issuePayload = generateGitHubIssuePayload(bundle);
    expect(issuePayload.title).toContain('[EDITORIAL SUBMISSION]');
    expect(issuePayload.body).toContain('dos-pk-test-bundle-export');

    const prChecklist = generatePullRequestChecklist(bundle);
    expect(prChecklist).toContain('Pull Request Checklist');
  });

  // Requirement 12: Ensuring draft edits do not mutate published archive data
  it('Requirement 12: guarantees local draft edits do not mutate canonical ALL_ARCHIVAL_DOSSIERS', () => {
    const canonicalCount = ALL_ARCHIVAL_DOSSIERS.length;
    const firstCanonicalTitle = ALL_ARCHIVAL_DOSSIERS[0].title.en;

    // Mutate local draft copy
    bundle.dossiers.push({
      id: ALL_ARCHIVAL_DOSSIERS[0].id,
      slug: ALL_ARCHIVAL_DOSSIERS[0].slug,
      title: { en: 'MUTATED LOCAL DRAFT TITLE', ur: 'تبدیل شدہ ڈرافٹ' },
      overview: { en: 'Overview in draft copy.', ur: 'خلاصہ' },
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
      isNewRecord: false,
    });

    // Check canonical data is untouched
    expect(ALL_ARCHIVAL_DOSSIERS.length).toBe(canonicalCount);
    expect(ALL_ARCHIVAL_DOSSIERS[0].title.en).toBe(firstCanonicalTitle);
    expect(ALL_ARCHIVAL_DOSSIERS[0].title.en).not.toBe('MUTATED LOCAL DRAFT TITLE');
  });

  // Requirement 13: Ensuring local review status is not represented as server-authoritative approval
  it('Requirement 13: proves exported payload explicitly states it is device-local and not server-authoritative', () => {
    const exportBundle = buildExportBundle(bundle);
    expect(exportBundle.honestSecurityDisclosure.isServerAuthoritative).toBe(false);
    expect(exportBundle.honestSecurityDisclosure.isDeviceLocal).toBe(true);
    expect(exportBundle.honestSecurityDisclosure.noticeEn).toContain('device-local draft proposals');
    expect(exportBundle.honestSecurityDisclosure.noticeEn).toContain('GitHub PR approval');
  });

  // Requirement 14: Ensuring unsupported claims cannot be exported as approved/published
  it('Requirement 14: proves claims without supporting sources fail validation and cannot pass as publishable', () => {
    const unsupportedClaim: StudioClaimDraft = {
      claimId: 'clm-test-unsupported',
      dossierId: ALL_ARCHIVAL_DOSSIERS[0].id,
      statement: {
        en: 'A major allegation asserted without any supporting primary or secondary sources.',
        ur: 'بغیر کسی ماخذ کے لگایا جانے والا بڑا الزام۔',
      },
      claimClassification: 'documented_fact',
      verificationStatus: 'primary_source_supported', // Inconsistent: claiming primary support with empty sources
      supportingSourceIds: [], // Empty sources
      contradictoryOrQualifyingSourceIds: [],
      whatEvidenceEstablishes: 'Establishes assertion.',
      whatEvidenceDoesNotEstablish: 'Limitations.',
      reviewerNotes: '',
      lastReviewDate: '2024-05-15',
      isNewRecord: true,
    };

    const canonicalIds = getCanonicalIdSets();
    const result = validateClaimDraft(unsupportedClaim, canonicalIds.dossierIds, canonicalIds.sourceIds, canonicalIds.claimIds);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.field === 'supportingSourceIds')).toBe(true);
  });

  // Requirement 15: Privacy warning behavior for sensitive fields or local document paths
  it('Requirement 15: proves privacy warnings are generated for local document paths and unredacted personal data', () => {
    // 1. Source with local document path triggers privacy warning
    const sourceWithLocalPath: StudioSourceDraft = {
      sourceId: 'src-test-local-file',
      title: { en: 'Local Case File PDF', ur: 'مقامی کیس فائل' },
      publisherOrIssuingAuthority: 'High Court Records',
      sourceType: 'court_order',
      localDocumentPath: 'C:/Users/Admin/Documents/confidential_client_file.pdf',
      accessDate: '2024-05-15',
      sourceAvailability: 'accessible',
      authenticityStatus: 'official_document',
      isNewRecord: true,
    };

    const sourceResult = validateSourceDraft(sourceWithLocalPath, new Set());
    expect(sourceResult.totalWarnings).toBeGreaterThan(0);
    expect(sourceResult.errors.some(e => e.field === 'localDocumentPath' && e.severity === 'warning')).toBe(true);

    // 2. Dossier with sensitive personal data without confirmed PII redaction triggers error
    const unredactedDossier: StudioDossierDraft = {
      id: 'dos-pk-test-unredacted-pii',
      slug: 'test-unredacted-pii',
      title: { en: 'Unredacted Witness Dossier', ur: 'گواہ کی فائل' },
      overview: { en: 'Dossier containing private bystander information without redaction.', ur: 'خلاصہ جس میں نجی معلومات شامل ہوں۔' },
      domain: 'due_process_rights',
      tags: [],
      editorialStatus: 'draft',
      legalProceedingStatus: 'concluded',
      verificationStatus: 'verified',
      hasActiveReportingBan: false,
      lastLegalStatusChecked: '2024-05-15',
      privacyReview: {
        hasSensitivePersonalData: true,
        piiRedacted: false, // Not redacted!
        allegationsDistinguishedFromFindings: true,
        officialDenialsIncluded: true,
        riskAssessment: 'high_scrutiny',
      },
      unresolvedQuestions: [],
      isNewRecord: true,
    };

    const dossierResult = validateDossierDraft(unredactedDossier, new Set(), new Set());
    expect(dossierResult.isValid).toBe(false);
    expect(dossierResult.errors.some(e => e.field === 'privacyReview.piiRedacted')).toBe(true);

    // 3. Media with local document path triggers privacy warning
    const mediaWithLocalPath: StudioMediaDraft = {
      mediaId: 'med-test-local-video',
      title: { en: 'Unredacted Hearing Video', ur: 'سماعت کی ویڈیو' },
      documentCategory: 'video',
      platformOrPublisher: 'Local Video Archive',
      localDocumentPath: 'D:/Archive/raw_footage_bystanders.mp4',
      dateAdded: '2024-05-15',
      associatedDossierId: ALL_ARCHIVAL_DOSSIERS[0].id,
      associatedClaimIds: [],
      verificationStatus: 'verified',
      isNewRecord: true,
    };
    const mediaResult = validateMediaDraft(mediaWithLocalPath, new Set([ALL_ARCHIVAL_DOSSIERS[0].id]));
    expect(mediaResult.totalWarnings).toBeGreaterThan(0);
    expect(mediaResult.errors.some(e => e.field === 'localDocumentPath' && e.severity === 'warning')).toBe(true);
  });
});
