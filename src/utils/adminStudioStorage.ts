/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Admin Editorial Studio Storage & Validation Utilities — Version 1.0.0
 * Device-Local Draft Persistence, Collision-Safe ID Generation, Validation & Export Handlers
 */

import type {
  StudioDraftBundle,
  StudioDossierDraft,
  StudioClaimDraft,
  StudioSourceDraft,
  StudioMediaDraft,
  StudioExportBundle,
  ValidationSummary,
  FieldValidationError,
} from '../types/adminStudio';
import { ALL_ARCHIVAL_DOSSIERS } from '../data/dossiers/dossiersData';
import { CLAIM_SOURCE_AUDIT_DATA } from '../data/dossiers/dossierAudits';

export const LOCAL_STORAGE_STUDIO_BUNDLE = 'insaf_archive_admin_studio_bundle_v1';

/**
 * Returns an empty studio draft bundle structure.
 */
export function createEmptyBundle(): StudioDraftBundle {
  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    dossiers: [],
    claims: [],
    sources: [],
    media: [],
    queue: [],
  };
}

function getStorageBackend(): Storage | null {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage;
  }
  if (typeof localStorage !== 'undefined') {
    return localStorage;
  }
  return null;
}

/**
 * Checks whether browser LocalStorage is accessible and functioning.
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const storage = getStorageBackend();
    if (!storage) return false;
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads the browser-local studio bundle from LocalStorage.
 * Honest disclosure: Device-local only, no server synchronization.
 * Recovers gracefully from malformed or corrupted storage entries.
 */
export function loadStudioBundle(): StudioDraftBundle {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('[AdminStudio] LocalStorage is unavailable; operating in memory-only mode.');
      return createEmptyBundle();
    }
    const storage = getStorageBackend();
    if (!storage) return createEmptyBundle();
    const raw = storage.getItem(LOCAL_STORAGE_STUDIO_BUNDLE);
    if (!raw) return createEmptyBundle();
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return {
        version: '1.0.0',
        lastUpdated: typeof parsed.lastUpdated === 'string' ? parsed.lastUpdated : new Date().toISOString(),
        dossiers: Array.isArray(parsed.dossiers)
          ? parsed.dossiers.filter((d: any) => d && typeof d === 'object' && typeof d.id === 'string' && d.id.trim().length > 0)
          : [],
        claims: Array.isArray(parsed.claims)
          ? parsed.claims.filter((c: any) => c && typeof c === 'object' && typeof c.claimId === 'string' && c.claimId.trim().length > 0)
          : [],
        sources: Array.isArray(parsed.sources)
          ? parsed.sources.filter((s: any) => s && typeof s === 'object' && typeof s.sourceId === 'string' && s.sourceId.trim().length > 0)
          : [],
        media: Array.isArray(parsed.media)
          ? parsed.media.filter((m: any) => m && typeof m === 'object' && typeof m.mediaId === 'string' && m.mediaId.trim().length > 0)
          : [],
        queue: Array.isArray(parsed.queue)
          ? parsed.queue.filter((q: any) => q && typeof q === 'object' && typeof q.queueId === 'string' && q.queueId.trim().length > 0)
          : [],
      };
    }
    return createEmptyBundle();
  } catch (err) {
    console.warn('[AdminStudio] Malformed local storage bundle detected, recovering with empty draft bundle:', err);
    return createEmptyBundle();
  }
}

/**
 * Saves the browser-local studio bundle to LocalStorage.
 * Handles quota or permission exceptions without crashing the application.
 */
export function saveStudioBundle(bundle: StudioDraftBundle): boolean {
  try {
    if (!isLocalStorageAvailable()) return false;
    const storage = getStorageBackend();
    if (!storage) return false;
    const updated = {
      ...bundle,
      lastUpdated: new Date().toISOString(),
    };
    storage.setItem(LOCAL_STORAGE_STUDIO_BUNDLE, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('[AdminStudio] Failed to save local draft bundle to LocalStorage:', err);
    return false;
  }
}

/**
 * Collision-safe ID generator for dossiers, claims, sources, and media records.
 */
export function generateStableId(
  prefix: 'dos' | 'clm' | 'src' | 'med',
  seedText: string,
  existingIds: Set<string> = new Set()
): string {
  const cleanSeed = seedText
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 36);

  let candidate = cleanSeed.length > 0 ? `${prefix}-pk-${cleanSeed}` : `${prefix}-pk-item-${Date.now().toString(36)}`;

  // If collision detected, append deterministic or random suffix
  let counter = 1;
  const baseCandidate = candidate;
  while (existingIds.has(candidate)) {
    candidate = `${baseCandidate}-${counter}`;
    counter++;
  }

  return candidate;
}

/**
 * Gathers all registered IDs across canonical repository records.
 */
export function getCanonicalIdSets(): {
  dossierIds: Set<string>;
  claimIds: Set<string>;
  sourceIds: Set<string>;
  slugs: Set<string>;
} {
  const dossierIds = new Set<string>();
  const claimIds = new Set<string>();
  const sourceIds = new Set<string>();
  const slugs = new Set<string>();

  for (const d of ALL_ARCHIVAL_DOSSIERS) {
    dossierIds.add(d.id);
    slugs.add(d.slug);
    if (d.claims) {
      for (const c of d.claims) claimIds.add(c.claimId);
    }
    if (d.sources) {
      for (const s of d.sources) sourceIds.add(s.sourceId);
    }
  }

  for (const a of CLAIM_SOURCE_AUDIT_DATA) {
    claimIds.add(a.claimId);
    for (const sId of a.supportingSourceIds) sourceIds.add(sId);
  }

  return { dossierIds, claimIds, sourceIds, slugs };
}

/**
 * Validates a single Dossier Draft against Part 5.3 & 5.4 editorial standards.
 */
export function validateDossierDraft(
  draft: StudioDossierDraft,
  existingDossierIds: Set<string> = new Set(),
  existingSlugs: Set<string> = new Set()
): ValidationSummary {
  const errors: FieldValidationError[] = [];

  // 1. Stable ID
  if (!draft.id || draft.id.trim().length === 0) {
    errors.push({
      field: 'id',
      messageEn: 'Dossier ID is required and must be stable.',
      messageUr: 'فائل کا شناختی کوڈ (ID) لازمی ہے۔',
      severity: 'error',
    });
  } else if (!/^[a-z0-9-]+$/.test(draft.id)) {
    errors.push({
      field: 'id',
      messageEn: 'Dossier ID may only contain lowercase letters, numbers, and hyphens.',
      messageUr: 'شناختی کوڈ میں صرف چھوٹے انگریزی حروف، اعداد اور ہائفن ہونے چاہئیں۔',
      severity: 'error',
    });
  } else if (draft.isNewRecord && existingDossierIds.has(draft.id)) {
    errors.push({
      field: 'id',
      messageEn: `Dossier ID '${draft.id}' collides with an existing canonical or draft dossier.`,
      messageUr: `یہ شناختی کوڈ '${draft.id}' پہلے سے موجود ہے۔`,
      severity: 'error',
    });
  }

  // 2. Slug
  if (!draft.slug || draft.slug.trim().length === 0) {
    errors.push({
      field: 'slug',
      messageEn: 'Dossier slug is required for URL routing.',
      messageUr: 'یو آر ایل سلگ (Slug) لازمی ہے۔',
      severity: 'error',
    });
  } else if (draft.isNewRecord && existingSlugs.has(draft.slug)) {
    errors.push({
      field: 'slug',
      messageEn: `Slug '${draft.slug}' is already taken by another dossier.`,
      messageUr: `یہ سلگ '${draft.slug}' پہلے سے زیرِ استعمال ہے۔`,
      severity: 'error',
    });
  }

  // 3. Bilingual Title
  if (!draft.title?.en || draft.title.en.trim().length < 5) {
    errors.push({
      field: 'title.en',
      messageEn: 'English title must be at least 5 characters long.',
      messageUr: 'انگریزی عنوان کم از کم 5 حروف پر مشتمل ہونا چاہیے۔',
      severity: 'error',
    });
  }
  if (!draft.title?.ur || draft.title.ur.trim().length < 5) {
    errors.push({
      field: 'title.ur',
      messageEn: 'Urdu title is mandatory; machine-generated fallback is prohibited.',
      messageUr: 'اردو عنوان لازمی ہے؛ مشینی ترجمے کا خودکار سہارا ممنوع ہے۔',
      severity: 'error',
    });
  }

  // 4. Bilingual Overview
  if (!draft.overview?.en || draft.overview.en.trim().length < 20) {
    errors.push({
      field: 'overview.en',
      messageEn: 'English overview must be at least 20 characters long.',
      messageUr: 'انگریزی خلاصہ کم از کم 20 حروف کا ہونا چاہیے۔',
      severity: 'error',
    });
  }
  if (!draft.overview?.ur || draft.overview.ur.trim().length < 20) {
    errors.push({
      field: 'overview.ur',
      messageEn: 'Urdu overview is mandatory; must reflect substantive English content.',
      messageUr: 'اردو خلاصہ لازمی ہے اور مفہوم کے مطابق ہونا چاہیے۔',
      severity: 'error',
    });
  }

  // 5. Pending Proceedings Notice Requirement
  const isSubJudice = ['ongoing', 'pending_appeal', 'stayed', 'under_investigation', 'unresolved'].includes(
    draft.legalProceedingStatus
  );
  if (isSubJudice) {
    if (!draft.pendingProceedingsNotice?.en || draft.pendingProceedingsNotice.en.trim().length === 0) {
      errors.push({
        field: 'pendingProceedingsNotice.en',
        messageEn: 'Sub judice / non-concluded proceedings require a prominent English pending-proceedings notice.',
        messageUr: 'زیرِ سماعت مقدمات کے لیے انگریزی میں باضابطہ نوٹس لازمی ہے۔',
        severity: 'error',
      });
    }
    if (!draft.pendingProceedingsNotice?.ur || draft.pendingProceedingsNotice.ur.trim().length === 0) {
      errors.push({
        field: 'pendingProceedingsNotice.ur',
        messageEn: 'Sub judice / non-concluded proceedings require a prominent Urdu pending-proceedings notice.',
        messageUr: 'زیرِ سماعت مقدمات کے لیے اردو میں باضابطہ نوٹس لازمی ہے۔',
        severity: 'error',
      });
    }
  }

  // 6. Active Reporting Ban
  if (draft.hasActiveReportingBan && (draft.editorialStatus === 'approved' || draft.editorialStatus === 'published')) {
    errors.push({
      field: 'hasActiveReportingBan',
      messageEn: 'An active court reporting ban or gag order strictly blocks Approved or Published status.',
      messageUr: 'عدالتی ممانعت یا پابندی کی صورت میں مواد شائع یا منظور نہیں کیا جا سکتا۔',
      severity: 'error',
    });
  }

  // 7. Legal Status Freshness
  if (draft.lastLegalStatusChecked) {
    const checkDate = new Date(draft.lastLegalStatusChecked);
    const now = new Date();
    const daysAgo = Math.floor((now.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysAgo > 365) {
      errors.push({
        field: 'lastLegalStatusChecked',
        messageEn: `Legal status check is ${daysAgo} days old (>365 days). Requires docket re-check.`,
        messageUr: `قانونی صورتحال کی آخری تصدیق ${daysAgo} دن پرانی ہے۔ نئی جانچ درکار ہے۔`,
        severity: 'warning',
      });
    }
  } else {
    errors.push({
      field: 'lastLegalStatusChecked',
      messageEn: 'Date of last legal status docket check is required.',
      messageUr: 'قانونی صورتحال کی آخری جانچ کی تاریخ درج کرنا لازمی ہے۔',
      severity: 'error',
    });
  }

  // 8. Privacy Check
  if (draft.privacyReview.hasSensitivePersonalData && !draft.privacyReview.piiRedacted) {
    errors.push({
      field: 'privacyReview.piiRedacted',
      messageEn: 'Sensitive personal data detected without confirmed PII redaction.',
      messageUr: 'حساس ذاتی ڈیٹا موجود ہے جس کا مٹایا جانا تصدیق شدہ نہیں ہے۔',
      severity: 'error',
    });
  }

  const totalErrors = errors.filter(e => e.severity === 'error').length;
  const totalWarnings = errors.filter(e => e.severity === 'warning').length;

  return {
    isValid: totalErrors === 0,
    totalErrors,
    totalWarnings,
    errors,
  };
}

/**
 * Validates a single Claim Draft.
 */
export function validateClaimDraft(
  draft: StudioClaimDraft,
  validDossierIds: Set<string>,
  validSourceIds: Set<string>,
  existingClaimIds: Set<string> = new Set()
): ValidationSummary {
  const errors: FieldValidationError[] = [];

  // 1. Claim ID
  if (!draft.claimId || draft.claimId.trim().length === 0) {
    errors.push({
      field: 'claimId',
      messageEn: 'Claim ID is required and must be stable.',
      messageUr: 'دعوے کا شناختی کوڈ (Claim ID) لازمی ہے۔',
      severity: 'error',
    });
  } else if (!/^[a-z0-9-]+$/.test(draft.claimId)) {
    errors.push({
      field: 'claimId',
      messageEn: 'Claim ID may only contain lowercase letters, numbers, and hyphens.',
      messageUr: 'دعوے کے کوڈ میں صرف چھوٹے حروف، اعداد اور ہائفن ہو سکتے ہیں۔',
      severity: 'error',
    });
  } else if (draft.isNewRecord && existingClaimIds.has(draft.claimId)) {
    errors.push({
      field: 'claimId',
      messageEn: `Claim ID '${draft.claimId}' collides with an existing claim.`,
      messageUr: `یہ کلیم آئی ڈی '${draft.claimId}' پہلے سے موجود ہے۔`,
      severity: 'error',
    });
  }

  // 2. Parent Dossier
  if (!draft.dossierId || draft.dossierId.trim().length === 0) {
    errors.push({
      field: 'dossierId',
      messageEn: 'Parent Dossier ID is required.',
      messageUr: 'متعلقہ فائل (Dossier ID) کا انتخاب لازمی ہے۔',
      severity: 'error',
    });
  } else if (!validDossierIds.has(draft.dossierId)) {
    errors.push({
      field: 'dossierId',
      messageEn: `Parent Dossier ID '${draft.dossierId}' does not exist in canonical or draft dossiers.`,
      messageUr: `منتخب کردہ فائل '${draft.dossierId}' موجود نہیں ہے۔`,
      severity: 'error',
    });
  }

  // 3. Bilingual Statement
  if (!draft.statement?.en || draft.statement.en.trim().length < 10) {
    errors.push({
      field: 'statement.en',
      messageEn: 'English claim statement must be at least 10 characters long.',
      messageUr: 'انگریزی بیان کم از کم 10 حروف پر مشتمل ہونا چاہیے۔',
      severity: 'error',
    });
  }
  if (!draft.statement?.ur || draft.statement.ur.trim().length < 10) {
    errors.push({
      field: 'statement.ur',
      messageEn: 'Urdu claim statement is mandatory.',
      messageUr: 'اردو دعویٰ متن لازمی ہے۔',
      severity: 'error',
    });
  }

  // 4. Supporting Sources
  if (!draft.supportingSourceIds || draft.supportingSourceIds.length === 0) {
    errors.push({
      field: 'supportingSourceIds',
      messageEn: 'Every material claim must reference at least one supporting source ID.',
      messageUr: 'ہر دعوے کے لیے کم از کم ایک مصدقہ ماخذ کا حوالہ لازمی ہے۔',
      severity: 'error',
    });
  } else {
    for (const sId of draft.supportingSourceIds) {
      if (!validSourceIds.has(sId)) {
        errors.push({
          field: 'supportingSourceIds',
          messageEn: `Supporting source ID '${sId}' does not exist in repository or draft sources.`,
          messageUr: `حوالہ شدہ ماخذ '${sId}' موجودہ ریکارڈز میں نہیں ملا۔`,
          severity: 'error',
        });
      }
    }
  }

  // 5. Allegation Conflation Guard
  const isAllegationClass = draft.claimClassification === 'official_position' || draft.claimClassification === 'reported_allegation';
  const textSuggestsJudicialFinding =
    /supreme court held|high court declared|court convicted|judicially determined/i.test(draft.statement?.en || '');
  if (isAllegationClass && textSuggestsJudicialFinding) {
    errors.push({
      field: 'claimClassification',
      messageEn: 'Allegations or official statements cannot describe an assertion as a judicial finding.',
      messageUr: 'سرکاری مؤقف یا الزام کو عدالتی فیصلے کے طور پر پیش نہیں کیا جا سکتا۔',
      severity: 'error',
    });
  }

  // 6. Evidentiary Bounds
  if (!draft.whatEvidenceEstablishes || draft.whatEvidenceEstablishes.trim().length < 5) {
    errors.push({
      field: 'whatEvidenceEstablishes',
      messageEn: 'Must specify what the cited evidence establishes.',
      messageUr: 'یہ واضح کرنا لازمی ہے کہ شواہد سے کیا ثابت ہوتا ہے۔',
      severity: 'error',
    });
  }
  if (!draft.whatEvidenceDoesNotEstablish || draft.whatEvidenceDoesNotEstablish.trim().length < 5) {
    errors.push({
      field: 'whatEvidenceDoesNotEstablish',
      messageEn: 'Must specify what the cited evidence does not establish (evidentiary limitations).',
      messageUr: 'یہ واضح کرنا لازمی ہے کہ شواہد سے کیا ثابت نہیں ہوتا (حدود)۔',
      severity: 'error',
    });
  }

  const totalErrors = errors.filter(e => e.severity === 'error').length;
  const totalWarnings = errors.filter(e => e.severity === 'warning').length;

  return {
    isValid: totalErrors === 0,
    totalErrors,
    totalWarnings,
    errors,
  };
}

/**
 * Validates a single Source Draft.
 */
export function validateSourceDraft(
  draft: StudioSourceDraft,
  existingSourceIds: Set<string> = new Set()
): ValidationSummary {
  const errors: FieldValidationError[] = [];

  // 1. Source ID
  if (!draft.sourceId || draft.sourceId.trim().length === 0) {
    errors.push({
      field: 'sourceId',
      messageEn: 'Source ID is required and must be stable.',
      messageUr: 'ماخذ کا شناختی کوڈ (Source ID) لازمی ہے۔',
      severity: 'error',
    });
  } else if (!/^[a-z0-9-]+$/.test(draft.sourceId)) {
    errors.push({
      field: 'sourceId',
      messageEn: 'Source ID may only contain lowercase letters, numbers, and hyphens.',
      messageUr: 'ماخذ کے کوڈ میں صرف چھوٹے حروف، اعداد اور ہائفن ہو سکتے ہیں۔',
      severity: 'error',
    });
  } else if (draft.isNewRecord && existingSourceIds.has(draft.sourceId)) {
    errors.push({
      field: 'sourceId',
      messageEn: `Source ID '${draft.sourceId}' collides with an existing source record.`,
      messageUr: `یہ ماخذ آئی ڈی '${draft.sourceId}' پہلے سے موجود ہے۔`,
      severity: 'error',
    });
  }

  // 2. Title
  if (!draft.title?.en || draft.title.en.trim().length < 3) {
    errors.push({
      field: 'title.en',
      messageEn: 'Source title (English) must be at least 3 characters long.',
      messageUr: 'ماخذ کا انگریزی عنوان کم از کم 3 حروف پر مشتمل ہونا چاہیے۔',
      severity: 'error',
    });
  }

  // 3. Publisher / Issuing Authority
  if (!draft.publisherOrIssuingAuthority || draft.publisherOrIssuingAuthority.trim().length < 2) {
    errors.push({
      field: 'publisherOrIssuingAuthority',
      messageEn: 'Publisher or issuing authority must be identified.',
      messageUr: 'ناشر یا جاری کنندہ اتھارٹی کا نام درج کرنا لازمی ہے۔',
      severity: 'error',
    });
  }

  // 4. URL Validation & Anti-Fabrication Check
  const urlPattern = /^https?:\/\/.+/i;
  const placeholderPattern = /example\.com|foo\.bar|todo|test\.com|placeholder/i;

  if (draft.officialUrl && draft.officialUrl.trim().length > 0) {
    if (!urlPattern.test(draft.officialUrl)) {
      errors.push({
        field: 'officialUrl',
        messageEn: 'Official URL must be a valid HTTP/HTTPS address.',
        messageUr: 'باضابطہ ویب ایڈریس درست HTTP/HTTPS فارمیٹ میں ہونا چاہیے۔',
        severity: 'error',
      });
    } else if (placeholderPattern.test(draft.officialUrl)) {
      errors.push({
        field: 'officialUrl',
        messageEn: 'Placeholder or invented URLs are forbidden.',
        messageUr: 'فرضی یا عارضی یو آر ایل کا اندراج سخت ممنوع ہے۔',
        severity: 'error',
      });
    }
  }

  if (draft.archivedUrl && draft.archivedUrl.trim().length > 0) {
    if (!urlPattern.test(draft.archivedUrl)) {
      errors.push({
        field: 'archivedUrl',
        messageEn: 'Archived URL must be a valid HTTP/HTTPS address (e.g. Archive.org / Perma.cc).',
        messageUr: 'محفوظ شدہ یو آر ایل درست فارمیٹ میں ہونا چاہیے۔',
        severity: 'error',
      });
    }
  }

  // 5. Local Document Path Privacy Warning
  if (draft.localDocumentPath && draft.localDocumentPath.trim().length > 0) {
    errors.push({
      field: 'localDocumentPath',
      messageEn: 'Privacy Warning: Ensure local document path contains no unredacted personal files or private paths.',
      messageUr: 'رازداری کا انتباہ: یقینی بنائیں کہ مقامی فائل میں غیر متعلقہ ذاتی معلومات شامل نہیں۔',
      severity: 'warning',
    });
  }

  // 6. Source Availability vs Authenticity Consistency
  if (draft.sourceAvailability === 'not_checked' && draft.authenticityStatus === 'official_document') {
    errors.push({
      field: 'authenticityStatus',
      messageEn: "A source marked 'not_checked' cannot be designated 'official_document' until verified.",
      messageUr: 'غیر جانچ شدہ ماخذ کو باضابطہ تصدیق شدہ قرار نہیں دیا جا سکتا۔',
      severity: 'error',
    });
  }

  const totalErrors = errors.filter(e => e.severity === 'error').length;
  const totalWarnings = errors.filter(e => e.severity === 'warning').length;

  return {
    isValid: totalErrors === 0,
    totalErrors,
    totalWarnings,
    errors,
  };
}

/**
 * Validates a Media / Document Draft.
 */
export function validateMediaDraft(
  draft: StudioMediaDraft,
  validDossierIds: Set<string>,
  existingMediaIds: Set<string> = new Set()
): ValidationSummary {
  const errors: FieldValidationError[] = [];

  // 1. Media ID
  if (!draft.mediaId || draft.mediaId.trim().length === 0) {
    errors.push({
      field: 'mediaId',
      messageEn: 'Media ID is required.',
      messageUr: 'میڈیا کا شناختی کوڈ لازمی ہے۔',
      severity: 'error',
    });
  } else if (!/^[a-z0-9-]+$/.test(draft.mediaId)) {
    errors.push({
      field: 'mediaId',
      messageEn: 'Media ID may only contain lowercase letters, numbers, and hyphens.',
      messageUr: 'میڈیا کوڈ میں صرف چھوٹے حروف، اعداد اور ہائفن ہو سکتے ہیں۔',
      severity: 'error',
    });
  } else if (draft.isNewRecord && existingMediaIds.has(draft.mediaId)) {
    errors.push({
      field: 'mediaId',
      messageEn: `Media ID '${draft.mediaId}' collides with an existing record.`,
      messageUr: `یہ میڈیا آئی ڈی '${draft.mediaId}' پہلے سے موجود ہے۔`,
      severity: 'error',
    });
  }

  // 2. Title
  if (!draft.title?.en || draft.title.en.trim().length < 3) {
    errors.push({
      field: 'title.en',
      messageEn: 'English title is required.',
      messageUr: 'انگریزی عنوان لازمی ہے۔',
      severity: 'error',
    });
  }

  // 3. Parent Dossier
  if (!draft.associatedDossierId || !validDossierIds.has(draft.associatedDossierId)) {
    errors.push({
      field: 'associatedDossierId',
      messageEn: 'Must associate with a valid existing Dossier ID.',
      messageUr: 'متعلقہ فائل (Dossier ID) سے جوڑنا لازمی ہے۔',
      severity: 'error',
    });
  }

  // 4. Local File Warning
  if (draft.localDocumentPath && draft.localDocumentPath.trim().length > 0) {
    errors.push({
      field: 'localDocumentPath',
      messageEn: 'Privacy Warning: Static site does not upload local files. Never export files containing unredacted PII.',
      messageUr: 'مقامی فائل پبلک ذخیرے میں خودکار اپلوڈ نہیں ہوتی؛ ذاتی ڈیٹا کی رازداری یقینی بنائیں۔',
      severity: 'warning',
    });
  }

  const totalErrors = errors.filter(e => e.severity === 'error').length;
  const totalWarnings = errors.filter(e => e.severity === 'warning').length;

  return {
    isValid: totalErrors === 0,
    totalErrors,
    totalWarnings,
    errors,
  };
}

/**
 * Compiles a full export bundle from the local studio draft state.
 */
export function buildExportBundle(bundle: StudioDraftBundle): StudioExportBundle {
  return {
    archiveName: 'Insaf Archive (انصاف آرکائیو)',
    bundleVersion: '1.0.0',
    exportedAt: new Date().toISOString(),
    honestSecurityDisclosure: {
      isDeviceLocal: true,
      isServerAuthoritative: false,
      noticeEn:
        'This bundle represents device-local draft proposals. It requires peer review and GitHub PR approval before merging into the authoritative public repository.',
      noticeUr:
        'یہ بنڈل مقامی ڈیوائس پر تیار کردہ تجاویز پر مشتمل ہے۔ مرکزی آرکائیو میں شامل کرنے کے لیے گٹ ہب پی آر کے ذریعے ادارتی جانچ لازمی ہے۔',
    },
    summary: {
      totalChanges: bundle.queue.length,
      dossierCount: bundle.dossiers.length,
      claimCount: bundle.claims.length,
      sourceCount: bundle.sources.length,
      mediaCount: bundle.media.length,
    },
    changes: bundle.queue,
    payloadData: {
      dossiers: bundle.dossiers,
      claims: bundle.claims,
      sources: bundle.sources,
      media: bundle.media,
    },
  };
}

/**
 * Generates human-readable Markdown summary of proposed changes.
 */
export function generateMarkdownReviewSummary(bundle: StudioDraftBundle): string {
  const lines: string[] = [
    `# Editorial Proposal Review Summary — Insaf Archive (انصاف آرکائیو)`,
    `**Exported Date:** ${new Date().toISOString()}`,
    `**Device-Local Draft:** Yes (Pending GitHub Pull Request Approval)`,
    ``,
    `## Change Summary Overview`,
    `- **Total Queued Operations:** ${bundle.queue.length}`,
    `- **Dossiers Modified/Created:** ${bundle.dossiers.length}`,
    `- **Claims Modified/Created:** ${bundle.claims.length}`,
    `- **Sources Modified/Created:** ${bundle.sources.length}`,
    `- **Media Items Recorded:** ${bundle.media.length}`,
    ``,
    `## Queued Changes Table`,
    `| Type | Record ID | Operation | Reason | Validation Status |`,
    `|---|---|---|---|---|`,
  ];

  for (const item of bundle.queue) {
    const errorCount = item.validationErrors.filter(e => e.severity === 'error').length;
    const valText = errorCount === 0 ? '✓ Validated' : `⚠ ${errorCount} Errors`;
    lines.push(
      `| \`${item.recordType}\` | \`${item.recordId}\` | **${item.changeType.toUpperCase()}** | ${item.reasonForChange || 'N/A'} | ${valText} |`
    );
  }

  lines.push(``);
  lines.push(`## Proposed Dossiers Detail`);
  for (const d of bundle.dossiers) {
    lines.push(`### Dossier: \`${d.id}\` (${d.title.en})`);
    lines.push(`- **Slug:** \`${d.slug}\``);
    lines.push(`- **Domain:** \`${d.domain}\``);
    lines.push(`- **Legal Status:** \`${d.legalProceedingStatus}\``);
    lines.push(`- **Editorial Status:** \`${d.editorialStatus}\``);
    if (d.pendingProceedingsNotice?.en) {
      lines.push(`- **Pending Proceedings Notice:** ${d.pendingProceedingsNotice.en}`);
    }
    lines.push(`- **Last Checked:** ${d.lastLegalStatusChecked}`);
    lines.push(``);
  }

  lines.push(`## Proposed Claims Detail`);
  for (const c of bundle.claims) {
    lines.push(`- **Claim \`${c.claimId}\` (Dossier: \`${c.dossierId}\`):** ${c.statement.en}`);
    lines.push(`  - *Classification:* \`${c.claimClassification}\` | *Verification:* \`${c.verificationStatus}\``);
    lines.push(`  - *Sources:* \`${c.supportingSourceIds.join(', ')}\``);
    lines.push(`  - *Establishes:* ${c.whatEvidenceEstablishes}`);
    lines.push(`  - *Does Not Establish:* ${c.whatEvidenceDoesNotEstablish}`);
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(
    `> **Honest Security & Governance Notice:** This proposal was prepared in the browser-local Admin Editorial Studio. Static GitHub Pages cannot mutate live archive code. To publish these changes, open a GitHub Pull Request with this payload.`
  );

  return lines.join('\n');
}

/**
 * Generates a GitHub Issue title and body for proposed changes.
 */
export function generateGitHubIssuePayload(bundle: StudioDraftBundle): { title: string; body: string } {
  const title = `[EDITORIAL SUBMISSION]: ${bundle.queue.length} Record Updates (${bundle.dossiers.map(d => d.id).join(', ') || 'Mixed Records'})`;

  const bodyLines = [
    `### Insaf Archive — Structured Editorial Proposal`,
    ``,
    `**Submission Date:** ${new Date().toISOString()}`,
    `**Local Queue Items:** ${bundle.queue.length}`,
    ``,
    `#### Summary of Changes:`,
  ];

  for (const item of bundle.queue) {
    bodyLines.push(`- **${item.changeType.toUpperCase()}** \`${item.recordType}\` [\`${item.recordId}\`]: ${item.reasonForChange}`);
  }

  bodyLines.push(``);
  bodyLines.push(`#### Full Machine-Readable JSON Payload:`);
  bodyLines.push('```json');
  bodyLines.push(JSON.stringify(buildExportBundle(bundle), null, 2));
  bodyLines.push('```');
  bodyLines.push(``);
  bodyLines.push(`- [x] I confirm all claims distinguish allegations from court findings.`);
  bodyLines.push(`- [x] I confirm that unredacted private personal information (PII) has been excluded.`);
  bodyLines.push(`- [x] I confirm that cited sources exist and have verifiable provenance.`);

  return { title, body: bodyLines.join('\n') };
}

/**
 * Generates Pull Request checklist markdown.
 */
export function generatePullRequestChecklist(bundle: StudioDraftBundle): string {
  return [
    `# Insaf Archive — Pull Request Checklist`,
    `### PR Target: \`main\` branch`,
    ``,
    `## Verification Gates`,
    `- [ ] All ${bundle.dossiers.length} proposed dossiers pass bilingual title and summary validation.`,
    `- [ ] All ${bundle.claims.length} proposed claims link to existing source IDs without fabrication.`,
    `- [ ] No official statements or executive positions are misclassified as judicial findings.`,
    `- [ ] Ongoing and sub judice proceedings contain prominent pending notices.`,
    `- [ ] Personal data (CNIC, residential addresses, private bystander identities) has been redacted.`,
    `- [ ] Automated validation commands pass cleanly:`,
    `  - \`npm run test\``,
    `  - \`npm run validate-data\``,
    `  - \`npm run typecheck\``,
    `  - \`npm run build\``,
    ``,
    `## Proposed File Changes:`,
    `- \`src/data/dossiers/dossiersData.ts\` (Updates to canonical dossiers)`,
    `- \`src/data/dossiers/dossierAudits.ts\` (Updates to claim audit registry)`,
  ].join('\n');
}

/**
 * Validates and imports single or bundled JSON string safely.
 */
export function importAndValidateJson(
  jsonText: string
): {
  success: boolean;
  data?: unknown;
  type?: 'bundle' | 'dossier' | 'claim' | 'source' | 'media';
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err) {
    return {
      success: false,
      errors: [`Malformed JSON: ${(err as Error).message}`],
      warnings: [],
    };
  }

  if (!parsed || typeof parsed !== 'object') {
    return {
      success: false,
      errors: ['Imported JSON must be a non-null object.'],
      warnings: [],
    };
  }

  const obj = parsed as Record<string, unknown>;

  // Check if it's an export bundle
  if (obj.bundleVersion === '1.0.0' && obj.payloadData && typeof obj.payloadData === 'object') {
    return {
      success: true,
      data: obj,
      type: 'bundle',
      errors: [],
      warnings: ['Importing a full bundle will merge records into your browser-local draft store.'],
    };
  }

  // Check if single dossier
  if ('id' in obj && 'domain' in obj && 'title' in obj && 'overview' in obj) {
    return {
      success: true,
      data: obj,
      type: 'dossier',
      errors: [],
      warnings: [],
    };
  }

  // Check if single claim
  if ('claimId' in obj && 'statement' in obj) {
    return {
      success: true,
      data: obj,
      type: 'claim',
      errors: [],
      warnings: [],
    };
  }

  // Check if single source
  if ('sourceId' in obj && 'publisherOrIssuingAuthority' in obj) {
    return {
      success: true,
      data: obj,
      type: 'source',
      errors: [],
      warnings: [],
    };
  }

  // Check if single media
  if ('mediaId' in obj && 'associatedDossierId' in obj) {
    return {
      success: true,
      data: obj,
      type: 'media',
      errors: [],
      warnings: [],
    };
  }

  errors.push('Unrecognized schema structure. JSON does not match bundle, dossier, claim, source, or media draft schemas.');
  return { success: false, errors, warnings };
}
