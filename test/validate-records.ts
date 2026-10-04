import { allCaseRecords } from '../src/data/cases/index';
import { validateBatch, validateMediaRecord, validateProposedSubmission } from '../src/utils/validator';
import { normalizeSearchText, matchesSearchQuery } from '../src/utils/urduNormalize';
import { searchAndFilterCases, initialFilterState } from '../src/utils/searchIndex';
import { translations } from '../src/data/translations';
import { ProceduralStatus, ArchiveCategory } from '../src/types';
import fs from 'fs';
import path from 'path';

console.log('--------------------------------------------------');
console.log('RUNNING INSAF ARCHIVE VERIFICATION & TEST SUITE');
console.log('--------------------------------------------------');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, errorDetail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
    if (errorDetail) console.error(`       Detail: ${errorDetail}`);
    failedTests++;
  }
}

// 1. Data Schema & Batch Validation
const validation = validateBatch(allCaseRecords);
assert(
  validation.valid,
  'All 10 case records pass strict schema validation with zero critical errors',
  validation.errors.join('; ')
);
assert(
  validation.duplicateIds.length === 0,
  'All case records have unique, stable IDs with zero duplicates',
  validation.duplicateIds.join(', ')
);

// 2. Bilingual Completeness
let bilingualOk = true;
let bilingualErrors: string[] = [];
for (const c of allCaseRecords) {
  if (!c.title.en || !c.title.ur) {
    bilingualOk = false;
    bilingualErrors.push(`Case ${c.id} missing title translation`);
  }
  if (!c.summary.en || !c.summary.ur) {
    bilingualOk = false;
    bilingualErrors.push(`Case ${c.id} missing summary translation`);
  }
  if (!c.factualBackground?.en || !c.factualBackground?.ur) {
    bilingualOk = false;
    bilingualErrors.push(`Case ${c.id} missing factualBackground translation`);
  }
}
assert(bilingualOk, 'All case records contain complete Urdu & English prose', bilingualErrors.join('; '));

// 3. Status Labels & Procedural Distinctness
const requiredStatuses: ProceduralStatus[] = [
  'reported',
  'under_investigation',
  'pending_trial',
  'bail_granted',
  'acquitted',
  'convicted',
  'dismissed',
  'appealed',
  'disposed_of',
  'unknown',
];

const allStatusesPresent = requiredStatuses.every(
  (st) => translations.statuses[st] && translations.statuses[st].en && translations.statuses[st].ur
);
assert(allStatusesPresent, 'All 10 legally distinct procedural statuses are defined with bilingual translations');

// 4. Archive Categories (12 Required Categories)
const requiredCategories: ArchiveCategory[] = [
  'court_judgments',
  'criminal_proceedings',
  'civil_litigation',
  'bail_acquittal',
  'arrest_detention',
  'alleged_police_misconduct',
  'human_rights',
  'missing_persons',
  'labour_poverty',
  'women_children',
  'public_interest_political',
  'video_evidence',
];

const allCategoriesPresent = requiredCategories.every(
  (cat) => translations.categories[cat] && translations.categories[cat].en && translations.categories[cat].ur
);
assert(allCategoriesPresent, 'All 12 configurable archive categories are defined with bilingual translations');

// 5. Urdu Text Normalization Tests
// Yeh variant normalization: Arabic Yeh (ي), Alef Maksura (ى), Barree Yeh (ے) -> Chhoti Yeh (ی)
const normalizedYeh = normalizeSearchText('عدالتی فیصلے');
const normalizedArabicYeh = normalizeSearchText('عدالتي فيصلے');
assert(
  normalizedYeh === normalizedArabicYeh,
  'Urdu normalization correctly unifies Arabic Yeh (ي) and Barree Yeh (ے) with standard Urdu Yeh (ی)'
);

// Diacritics stripping: Zabar, Zer, Pesh, Tashdeed
const withHarkat = normalizeSearchText('مُقَدَّمَہ');
const plainUrdu = normalizeSearchText('مقدمہ');
assert(
  withHarkat === plainUrdu,
  'Urdu normalization correctly strips Harkat/Aarab (Zabar, Zer, Pesh, Tashdeed)'
);

// Search query token matching
const matchResult = matchesSearchQuery(
  'سپریم کورٹ آف پاکستان کا تاریخی فیصلہ',
  'فیصلہ سپریم'
);
assert(matchResult, 'Bilingual search query successfully matches multiple out-of-order Urdu tokens');

// 6. Multi-Faceted Filtering
const bailFilterResult = searchAndFilterCases(
  allCaseRecords,
  { ...initialFilterState, status: 'bail_granted' },
  'en'
);
assert(
  bailFilterResult.results.length > 0 &&
    bailFilterResult.results.every((c) => c.proceduralStatus === 'bail_granted'),
  'Filtering by status "bail_granted" returns only cases with bail granted'
);

const punjabFilterResult = searchAndFilterCases(
  allCaseRecords,
  { ...initialFilterState, province: 'punjab' },
  'en'
);
assert(
  punjabFilterResult.results.length > 0 &&
    punjabFilterResult.results.every((c) => c.location.province === 'punjab'),
  'Filtering by province "punjab" returns only cases located in Punjab'
);

// 7. Privacy Safeguards
let privacyProtectedCount = 0;
for (const c of allCaseRecords) {
  for (const p of c.parties) {
    if (p.isProtectedOrMinor) {
      privacyProtectedCount++;
      assert(
        p.redacted === true,
        `Party "${p.id}" flagged as minor/protected must have redacted=true`
      );
    }
  }
}
assert(
  privacyProtectedCount > 0,
  `Privacy protection safeguards verified on ${privacyProtectedCount} protected/minor parties`
);

// 8. Phase 3: Media & Evidence Archive Validation
const { allMediaRecords } = await import('../src/data/media/index');

assert(
  allMediaRecords.length >= 10,
  `Media repository contains ${allMediaRecords.length} structured evidence and media records`
);

// Unique Media IDs
const mediaIds = new Set<string>();
let mediaDuplicates = 0;
for (const m of allMediaRecords) {
  if (mediaIds.has(m.id)) {
    mediaDuplicates++;
  }
  mediaIds.add(m.id);
}
assert(mediaDuplicates === 0, 'All media records have unique, stable IDs');

// Bilingual titles and descriptions
let mediaBilingualOk = true;
let mediaBilingualErrors: string[] = [];
for (const m of allMediaRecords) {
  if (!m.title.en || !m.title.ur) {
    mediaBilingualOk = false;
    mediaBilingualErrors.push(`Media ${m.id} missing title translation`);
  }
  if (!m.description?.en || !m.description?.ur) {
    mediaBilingualOk = false;
    mediaBilingualErrors.push(`Media ${m.id} missing description translation`);
  }
}
assert(mediaBilingualOk, 'All media records contain complete Urdu & English titles and descriptions', mediaBilingualErrors.join('; '));

// Associated case IDs refer to existing cases
const knownCaseIds = new Set(allCaseRecords.map((c) => c.id));
let caseLinkOk = true;
let brokenLinks: string[] = [];
for (const m of allMediaRecords) {
  for (const cId of m.associatedCaseIds) {
    if (!knownCaseIds.has(cId)) {
      caseLinkOk = false;
      brokenLinks.push(`Media ${m.id} links to unknown case ID: ${cId}`);
    }
  }
}
assert(caseLinkOk, 'All media records reference valid, documented case IDs in the archive', brokenLinks.join('; '));

// Video embed metadata validity
let videoMetadataOk = true;
const videoItems = allMediaRecords.filter((m) => m.mediaType === 'youtube_video');
for (const v of videoItems) {
  if (!v.videoMetadata?.youtubeId || v.videoMetadata.youtubeId.length !== 11) {
    videoMetadataOk = false;
  }
  if (v.videoMetadata?.timestamps) {
    for (const ts of v.videoMetadata.timestamps) {
      if (ts.timeInSeconds < 0 || !ts.timecode.includes(':')) {
        videoMetadataOk = false;
      }
    }
  }
}
assert(videoMetadataOk, `All ${videoItems.length} YouTube video records contain valid 11-char IDs and compliant timestamp structures`);

// 9. Phase 4: Media Record Invariant Validation via validateMediaRecord
const existingMediaIds = new Set(allMediaRecords.map((m) => m.id));
let mediaInvariantOk = true;
let mediaInvariantErrors: string[] = [];
for (const m of allMediaRecords) {
  const result = validateMediaRecord(m, new Set(), knownCaseIds);
  if (result.errors.length > 0) {
    mediaInvariantOk = false;
    mediaInvariantErrors.push(...result.errors);
  }
}
assert(
  mediaInvariantOk,
  'validateMediaRecord confirms all 10 registered media records adhere to strict schema invariants',
  mediaInvariantErrors.join('; ')
);

// 10. Phase 4: validateMediaRecord catches corrupt / invalid media structures
const corruptMediaMissingId = validateMediaRecord({
  title: { en: 'Test', ur: 'ٹیسٹ' },
  mediaType: 'youtube_video',
  associatedCaseIds: ['PK-SC-2024-0102'],
});
assert(
  corruptMediaMissingId.errors.some((e) => e.includes('Missing or empty stable media ID')),
  'validateMediaRecord correctly catches missing media ID'
);

const corruptMediaInvalidType = validateMediaRecord({
  id: 'MED-INVALID-01',
  title: { en: 'Test', ur: 'ٹیسٹ' },
  mediaType: 'unsupported_type',
  associatedCaseIds: ['PK-SC-2024-0102'],
});
assert(
  corruptMediaInvalidType.errors.some((e) => e.includes('Invalid or missing `mediaType`')),
  'validateMediaRecord correctly catches invalid mediaType'
);

const corruptMediaUnknownCase = validateMediaRecord(
  {
    id: 'MED-DANGLING-01',
    title: { en: 'Test', ur: 'ٹیسٹ' },
    description: { en: 'Desc', ur: 'تفصیل' },
    sourcePublisher: { en: 'Court', ur: 'عدالت' },
    sourceUrl: 'https://example.com',
    mediaType: 'document',
    verificationStatus: 'verified_official_record',
    associatedCaseIds: ['PK-NONEXISTENT-9999'],
  },
  new Set(),
  knownCaseIds
);
assert(
  corruptMediaUnknownCase.errors.some((e) => e.includes('References unknown associated case ID')),
  'validateMediaRecord correctly catches dangling/unknown associatedCaseId'
);

const corruptYouTubeId = validateMediaRecord({
  id: 'MED-VID-BAD-01',
  title: { en: 'Test', ur: 'ٹیسٹ' },
  description: { en: 'Desc', ur: 'تفصیل' },
  sourcePublisher: { en: 'Court', ur: 'عدالت' },
  sourceUrl: 'https://youtube.com',
  mediaType: 'youtube_video',
  verificationStatus: 'verified_official_record',
  associatedCaseIds: ['PK-SC-2024-0102'],
  videoMetadata: {
    youtubeId: 'too_short', // not 11 chars!
  },
});
assert(
  corruptYouTubeId.errors.some((e) => e.includes('must be exactly 11 characters')),
  'validateMediaRecord correctly catches invalid YouTube video ID format'
);

// 11. Phase 4: validateProposedSubmission checks proposed submissions
// A. Conflict detection on duplicate case ID
const duplicateCaseSubmission = validateProposedSubmission(
  {
    type: 'new_case',
    proposedId: 'PK-SC-2024-0102', // Already exists!
    title: { en: 'Test Case', ur: 'ٹیسٹ کیس' },
    caseNumber: 'Const P 99',
    court: { en: 'SC', ur: 'عدالت' },
    courtLevel: 'supreme_court',
    province: 'federal',
    proceduralStatus: 'pending_trial',
    category: 'court_judgments',
    summary: { en: 'Summary', ur: 'خلاصہ' },
    parties: [],
    sources: 'https://example.com',
    contributorName: 'Advocate Ali',
    checklistConfirmed: true,
  },
  allCaseRecords,
  allMediaRecords
);
assert(
  duplicateCaseSubmission.errors.some((e) => e.includes('conflicts with an existing published case')),
  'validateProposedSubmission rejects new case proposals conflicting with existing stable IDs'
);

// B. Unredacted minor rejection
const minorUnredactedSubmission = validateProposedSubmission(
  {
    type: 'new_case',
    proposedId: 'PK-LHC-2024-9999',
    title: { en: 'Juvenile Matter', ur: 'کمسن مقدمہ' },
    caseNumber: 'Crl 99',
    court: { en: 'LHC', ur: 'ہائی کورٹ' },
    courtLevel: 'high_court',
    province: 'punjab',
    proceduralStatus: 'pending_trial',
    category: 'women_children',
    summary: { en: 'Summary', ur: 'خلاصہ' },
    parties: [
      { id: 'pty-min', name: { en: 'Hamza (Child)', ur: 'حمزہ' }, role: 'accused', isProtectedOrMinor: true, redacted: false },
    ],
    sources: 'https://example.com',
    contributorName: 'Advocate Tariq',
    checklistConfirmed: true,
  },
  allCaseRecords,
  allMediaRecords
);
assert(
  minorUnredactedSubmission.errors.some((e) => e.includes('is flagged as protected/minor but is not marked as redacted')),
  'validateProposedSubmission rejects submissions with unredacted minor parties'
);

// C. Case correction targeting non-existent case ID
const nonExistentCorrection = validateProposedSubmission(
  {
    type: 'case_correction',
    caseId: 'PK-FICTION-0000',
    affectedSection: 'Procedural Status',
    currentText: 'Pending',
    proposedReplacement: 'Bail granted',
    reason: 'New bail order',
    supportingEvidence: 'PLD 2024 SC 1',
    affectsProceduralStatus: true,
    proposedStatus: 'bail_granted',
    contributorName: 'Legal Counsel',
    checklistConfirmed: true,
  },
  allCaseRecords,
  allMediaRecords
);
assert(
  nonExistentCorrection.errors.some((e) => e.includes('does not exist in the active archive')),
  'validateProposedSubmission rejects corrections targeting non-existent case IDs'
);

// D. Media submission linking to non-existent case
const nonExistentMediaCaseLink = validateProposedSubmission(
  {
    type: 'media_submission',
    associatedCaseIds: ['PK-GHOST-9999'],
    mediaType: 'youtube_video',
    title: { en: 'Hearing', ur: 'سماعت' },
    sourcePublisher: { en: 'Court Channel', ur: 'عدالتی نشریات' },
    sourceUrl: 'https://youtube.com/watch?v=12345678901',
    eventDate: '2024-04-10',
    verificationStatus: 'verified_official_record',
    description: { en: 'Desc', ur: 'تفصیل' },
    contributorName: 'Court Reporter',
    checklistConfirmed: true,
  },
  allCaseRecords,
  allMediaRecords
);
assert(
  nonExistentMediaCaseLink.errors.some((e) => e.includes('does not exist in the published archive')),
  'validateProposedSubmission rejects media submissions with unlinked/ghost case IDs'
);

// 12. Phase 4: Published Dataset Isolation & Hygiene
// Ensure that the public production dataset only includes approved records
let datasetIsolated = true;
for (const c of allCaseRecords) {
  if ((c as any).isDraft || (c as any).submissionStatus === 'draft') {
    datasetIsolated = false;
  }
}
assert(
  datasetIsolated,
  'Production case repository contains strictly approved records with zero bundled draft/unreviewed submissions'
);

// 13. Phase 4: Contributor Guidance Bilingual Translations Completeness
const cp = translations.contributePage;
assert(
  Boolean(cp.title.en && cp.title.ur && cp.subtitle.en && cp.subtitle.ur),
  'Contributor guidance page headers are fully translated in English and Urdu'
);

const requiredFlowStages = [
  'draft',
  'submitted',
  'under_review',
  'changes_requested',
  'approved',
  'published',
  'rejected',
] as const;
const flowStagesOk = requiredFlowStages.every(
  (stage) => cp.statusFlow[stage] && cp.statusFlow[stage].en && cp.statusFlow[stage].ur
);
assert(
  flowStagesOk,
  'All 7 submission status flow stages have complete bilingual names and descriptions'
);

const requiredRoles = ['super_admin', 'reviewer', 'contributor', 'public_reader'] as const;
const rolesOk = requiredRoles.every(
  (r) => cp.roles[r] && cp.roles[r].title.en && cp.roles[r].title.ur
);
assert(
  rolesOk,
  'All 4 trust & permission roles are defined with complete bilingual descriptions'
);

// 14. Phase 5: Source URLs and Asset Paths Quality Audit
let malformedUrls: string[] = [];
for (const c of allCaseRecords) {
  for (const s of (c.sources || [])) {
    if (s.url && !s.url.startsWith('http://') && !s.url.startsWith('https://')) {
      malformedUrls.push(`Case ${c.id} source URL malformed: ${s.url}`);
    }
  }
  for (const d of (c.connectedDocuments || [])) {
    if (d.sourceUrl && !d.sourceUrl.startsWith('http://') && !d.sourceUrl.startsWith('https://')) {
      malformedUrls.push(`Case ${c.id} document URL malformed: ${d.sourceUrl}`);
    }
  }
}
for (const m of allMediaRecords) {
  if (
    m.sourceUrl &&
    !m.sourceUrl.startsWith('http://') &&
    !m.sourceUrl.startsWith('https://') &&
    !m.sourceUrl.startsWith('./assets/') &&
    !m.sourceUrl.startsWith('/assets/') &&
    !m.sourceUrl.startsWith('/src/')
  ) {
    malformedUrls.push(`Media ${m.id} source URL malformed: ${m.sourceUrl}`);
  }
}
assert(
  malformedUrls.length === 0,
  'All documented source URLs and media paths conform to valid http/https or safe relative asset paths',
  malformedUrls.join('; ')
);

// 15. Phase 5: Cross-Referenced Related Case IDs Integrity
let brokenCaseCrossReferences: string[] = [];
for (const c of allCaseRecords) {
  for (const relId of c.relatedCaseIds) {
    if (!knownCaseIds.has(relId)) {
      brokenCaseCrossReferences.push(`Case ${c.id} references non-existent related case: ${relId}`);
    }
  }
}
assert(
  brokenCaseCrossReferences.length === 0,
  'All cross-referenced relatedCaseIds point strictly to existing published cases in the archive',
  brokenCaseCrossReferences.join('; ')
);

// 16. Phase 5: Privacy Protection Safeguards & Juvenile Identity Redactions
let unredactedMinorCount = 0;
for (const c of allCaseRecords) {
  for (const p of c.parties) {
    if (p.isProtectedOrMinor && (!p.redacted || p.name.en.length === 0 || p.name.ur.length === 0)) {
      unredactedMinorCount++;
    }
  }
}
assert(
  unredactedMinorCount === 0,
  'Statutory privacy protections verified: zero unredacted minors or vulnerable parties in production data'
);

// 17. Phase 5: Procedural Distinction: Bail Granted vs. Final Acquittal
const bailTranslation = translations.statuses.bail_granted;
const acquittalTranslation = translations.statuses.acquitted;
assert(
  Boolean(
    bailTranslation &&
    acquittalTranslation &&
    bailTranslation.en !== acquittalTranslation.en &&
    translations.methodologyPage.bailNotAcquittal?.en
  ),
  'Procedural status distinction enforced: bail orders strictly separated from acquittals with explicit legal notices'
);

// 18. Phase 5: Static SEO & Deployment Assets Verification
const robotsPath = path.resolve('public/robots.txt');
const sitemapPath = path.resolve('public/sitemap.xml');
const notFoundPath = path.resolve('public/404.html');

const seoAssetsExist =
  fs.existsSync(robotsPath) &&
  fs.existsSync(sitemapPath) &&
  fs.existsSync(notFoundPath);

assert(
  seoAssetsExist,
  'Static SEO deployment files exist in public directory (robots.txt, sitemap.xml, 404.html)'
);

// 19. Phase 5: Sitemap XML Structure & Case Coverage
let sitemapCoversAllCases = false;
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  sitemapCoversAllCases =
    sitemapContent.includes('<?xml') &&
    sitemapContent.includes('<urlset') &&
    allCaseRecords.every((c) => sitemapContent.includes(c.id));
}
assert(
  sitemapCoversAllCases,
  'Sitemap.xml contains valid XML structure and references all 10 published case URLs'
);

// 20. Phase 5: Editorial Methodology & Presumption of Innocence Charter Content
const meth = translations.methodologyPage;
assert(
  Boolean(
    meth.presumptionOfInnocence?.en &&
    meth.presumptionOfInnocence?.ur &&
    meth.presumptionOfInnocence.en.includes('presumed innocent')
  ),
  'Editorial charter bilingual translations enforce Article 10-A presumption of innocence and archival neutrality'
);

// 21. Phase 5: GitHub Pages Base Path Compatibility Check
const viteConfigContent = fs.readFileSync(path.resolve('vite.config.ts'), 'utf-8');
assert(
  viteConfigContent.includes("base: './'"),
  'Build configuration maintains relative base ("./") for GitHub Pages repository subpaths and custom domains'
);

// 22. Phase 6: Super Admin Dashboard Bilingual Translations Integrity
const adm = translations.adminDashboard;
const adminTabsValid =
  Boolean(adm) &&
  ['overview', 'cases', 'caseForm', 'media', 'review', 'export'].every(
    (tab) => adm.tabs[tab as keyof typeof adm.tabs]?.en && adm.tabs[tab as keyof typeof adm.tabs]?.ur
  );
const adminActionsValid =
  Boolean(adm) &&
  ['saveDraft', 'previewCase', 'clearDraft', 'exportJson', 'addNewCase', 'addMedia', 'reviewDiff', 'copyMarkdown'].every(
    (act) => adm.actions[act as keyof typeof adm.actions]?.en && adm.actions[act as keyof typeof adm.actions]?.ur
  );
assert(
  adminTabsValid && adminActionsValid && Boolean(adm.disclaimer?.en && adm.disclaimer?.ur),
  'Phase 6: Super Admin Dashboard has complete bilingual translations for all tabs, actions, and isolation notices'
);

// 23. Phase 6: Admin Routing & 404 Forwarding Configuration
const notFoundHtml = fs.readFileSync(notFoundPath, 'utf-8');
const adminRouteConfigured = notFoundHtml.includes("'admin'") && notFoundHtml.includes("'dataValidator'");
assert(
  adminRouteConfigured,
  'Phase 6: GitHub Pages 404 handler correctly routes /admin/ subpath to application staging router'
);

// 24. Phase 6: Zero Secret Leakage Security Invariant
const configFiles = ['src/config/repository.ts', 'src/pages/AdminDashboardView.tsx'];
let secretsFound = false;
for (const file of configFiles) {
  const fileContent = fs.readFileSync(path.resolve(file), 'utf-8');
  if (/(ghp_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9_]{82}|AIza[0-9A-Za-z-_]{35})/.test(fileContent)) {
    secretsFound = true;
  }
}
assert(
  !secretsFound,
  'Phase 6: Zero token/secret leakage verified in admin dashboard and repository configurations'
);

console.log('--------------------------------------------------');
console.log(`TOTAL TESTS: ${passedTests + failedTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('--------------------------------------------------');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('All tests passed cleanly!');
  process.exit(0);
}
