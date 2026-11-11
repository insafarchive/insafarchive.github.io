import {
  CaseRecord,
  ProceduralStatus,
  ArchiveCategory,
  Province,
  CourtLevel,
  ValidationResult,
  MediaItem,
  MediaType,
  EditorialReviewStatus,
  ProposedSubmission,
} from '../types';

const VALID_STATUSES: ProceduralStatus[] = [
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

const VALID_CATEGORIES: ArchiveCategory[] = [
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

const VALID_PROVINCES: Province[] = [
  'punjab',
  'sindh',
  'khyber_pakhtunkhwa',
  'balochistan',
  'islamabad_ict',
  'gilgit_baltistan',
  'azad_kashmir',
  'federal',
  'unknown',
];

const VALID_MEDIA_TYPES: MediaType[] = [
  'youtube_video',
  'document',
  'image',
  'audio',
  'external_source',
];

const VALID_EDITORIAL_STATUSES: EditorialReviewStatus[] = [
  'verified_official_record',
  'corroborated_reporting',
  'preliminary_documentation',
  'under_editorial_review',
];

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates a single CaseRecord against schema invariants.
 */
export function validateCaseRecord(record: any, existingIds: Set<string> = new Set()): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!record || typeof record !== 'object') {
    return { errors: ['Record must be a valid JSON object.'], warnings: [] };
  }

  // 1. Stable ID
  if (!record.id || typeof record.id !== 'string' || record.id.trim() === '') {
    errors.push('Missing or empty stable ID (`id`).');
  } else if (existingIds.has(record.id)) {
    errors.push(`Duplicate ID detected: "${record.id}". Case IDs must be strictly unique.`);
  }

  // 2. Slug
  if (!record.slug || typeof record.slug !== 'string' || record.slug.trim() === '') {
    errors.push('Missing or empty URL slug (`slug`).');
  }

  // 3. Case Number
  if (!record.caseNumber || typeof record.caseNumber !== 'string') {
    warnings.push(`Case ${record.id || 'unknown'}: Missing case docket number or FIR reference.`);
  }

  // 4. Bilingual Titles
  if (!record.title || typeof record.title !== 'object') {
    errors.push(`Case ${record.id || 'unknown'}: Missing bilingual title object.`);
  } else {
    if (!record.title.en || typeof record.title.en !== 'string' || record.title.en.trim() === '') {
      errors.push(`Case ${record.id}: Missing English title (\`title.en\`).`);
    }
    if (!record.title.ur || typeof record.title.ur !== 'string' || record.title.ur.trim() === '') {
      errors.push(`Case ${record.id}: Missing Urdu title (\`title.ur\`).`);
    }
  }

  // 5. Bilingual Summary
  if (!record.summary || typeof record.summary !== 'object') {
    errors.push(`Case ${record.id}: Missing bilingual summary object.`);
  } else {
    if (!record.summary.en || typeof record.summary.en !== 'string') {
      errors.push(`Case ${record.id}: Missing English summary (\`summary.en\`).`);
    }
    if (!record.summary.ur || typeof record.summary.ur !== 'string') {
      errors.push(`Case ${record.id}: Missing Urdu summary (\`summary.ur\`).`);
    }
  }

  // 6. Factual Background
  if (!record.factualBackground || typeof record.factualBackground !== 'object') {
    warnings.push(`Case ${record.id}: Missing detailed factual background.`);
  }

  // 7. Procedural Status
  if (!record.proceduralStatus || !VALID_STATUSES.includes(record.proceduralStatus)) {
    errors.push(
      `Case ${record.id}: Invalid procedural status "${record.proceduralStatus}". Allowed: ${VALID_STATUSES.join(', ')}`
    );
  }

  // 8. Categories
  if (!Array.isArray(record.categories) || record.categories.length === 0) {
    errors.push(`Case ${record.id}: \`categories\` must be a non-empty array.`);
  } else {
    for (const cat of record.categories) {
      if (!VALID_CATEGORIES.includes(cat)) {
        errors.push(`Case ${record.id}: Invalid category "${cat}". Allowed: ${VALID_CATEGORIES.join(', ')}`);
      }
    }
  }

  // 9. Location & Province
  if (!record.location || typeof record.location !== 'object') {
    errors.push(`Case ${record.id}: Missing location object.`);
  } else if (!VALID_PROVINCES.includes(record.location.province)) {
    errors.push(
      `Case ${record.id}: Invalid province "${record.location.province}". Allowed: ${VALID_PROVINCES.join(', ')}`
    );
  }

  // 10. Date format checks
  if (record.filingDate && !ISO_DATE_REGEX.test(record.filingDate)) {
    warnings.push(`Case ${record.id}: \`filingDate\` "${record.filingDate}" is not in ISO YYYY-MM-DD format.`);
  }
  if (record.incidentDate && !ISO_DATE_REGEX.test(record.incidentDate)) {
    warnings.push(`Case ${record.id}: \`incidentDate\` "${record.incidentDate}" is not in ISO YYYY-MM-DD format.`);
  }
  if (!record.lastUpdated || !ISO_DATE_REGEX.test(record.lastUpdated)) {
    warnings.push(`Case ${record.id}: \`lastUpdated\` should be a valid ISO YYYY-MM-DD date.`);
  }

  // 11. Parties Privacy and Representation
  if (!Array.isArray(record.parties) || record.parties.length === 0) {
    warnings.push(`Case ${record.id}: No parties recorded.`);
  } else {
    record.parties.forEach((party: any, idx: number) => {
      if (!party.name || (!party.name.en && !party.name.ur)) {
        errors.push(`Case ${record.id}: Party at index ${idx} is missing a name.`);
      }
      if (party.isProtectedOrMinor && !party.redacted) {
        warnings.push(
          `Case ${record.id}: Party "${party.name?.en || idx}" is flagged as minor/protected but not marked as redacted.`
        );
      }
    });
  }

  // 12. Evidentiary Items Attribution
  if (Array.isArray(record.evidenceItems)) {
    record.evidenceItems.forEach((ev: any, idx: number) => {
      if (ev.nature === 'allegation' && (!ev.sourceName || (!ev.sourceName.en && !ev.sourceName.ur))) {
        warnings.push(`Case ${record.id}: Allegation at index ${idx} is missing source attribution.`);
      }
    });
  }

  return { errors, warnings };
}

/**
 * Validates an entire batch of records.
 */
export function validateBatch(records: any[], existingArchiveIds: Set<string> = new Set()): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const seenIdsInBatch = new Set<string>();
  const duplicateIds: string[] = [];

  if (!Array.isArray(records)) {
    return {
      valid: false,
      errors: ['Input must be a JSON array of case records.'],
      warnings: [],
      recordCount: 0,
      duplicateIds: [],
    };
  }

  for (const record of records) {
    if (record && record.id) {
      if (seenIdsInBatch.has(record.id)) {
        duplicateIds.push(record.id);
        allErrors.push(`Duplicate ID within imported batch: "${record.id}"`);
      }
      seenIdsInBatch.add(record.id);
    }

    const { errors, warnings } = validateCaseRecord(record, existingArchiveIds);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    recordCount: records.length,
    duplicateIds,
  };
}

/**
 * Validates a single MediaItem against schema invariants.
 */
export function validateMediaRecord(
  record: any,
  existingMediaIds: Set<string> = new Set(),
  knownCaseIds: Set<string> = new Set()
): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!record || typeof record !== 'object') {
    return { errors: ['Media record must be a valid JSON object.'], warnings: [] };
  }

  // 1. Stable Media ID
  if (!record.id || typeof record.id !== 'string' || record.id.trim() === '') {
    errors.push('Missing or empty stable media ID (`id`).');
  } else if (existingMediaIds.has(record.id)) {
    errors.push(`Duplicate media ID detected: "${record.id}". Media IDs must be strictly unique.`);
  }

  // 2. Media Type
  if (!record.mediaType || !VALID_MEDIA_TYPES.includes(record.mediaType)) {
    errors.push(
      `Media ${record.id || 'unknown'}: Invalid or missing \`mediaType\` "${record.mediaType}". Allowed: ${VALID_MEDIA_TYPES.join(', ')}`
    );
  }

  // 3. Associated Case IDs
  if (!Array.isArray(record.associatedCaseIds) || record.associatedCaseIds.length === 0) {
    errors.push(`Media ${record.id}: \`associatedCaseIds\` must be a non-empty array of stable case IDs.`);
  } else if (knownCaseIds.size > 0) {
    for (const cId of record.associatedCaseIds) {
      if (!knownCaseIds.has(cId)) {
        errors.push(`Media ${record.id}: References unknown associated case ID "${cId}".`);
      }
    }
  }

  // 4. Bilingual Titles
  if (!record.title || typeof record.title !== 'object') {
    errors.push(`Media ${record.id}: Missing bilingual title object.`);
  } else {
    if (!record.title.en || typeof record.title.en !== 'string' || record.title.en.trim() === '') {
      errors.push(`Media ${record.id}: Missing English title (\`title.en\`).`);
    }
    if (!record.title.ur || typeof record.title.ur !== 'string' || record.title.ur.trim() === '') {
      errors.push(`Media ${record.id}: Missing Urdu title (\`title.ur\`).`);
    }
  }

  // 5. Bilingual Description
  if (!record.description || typeof record.description !== 'object') {
    errors.push(`Media ${record.id}: Missing bilingual description object.`);
  } else {
    if (!record.description.en || typeof record.description.en !== 'string') {
      errors.push(`Media ${record.id}: Missing English description (\`description.en\`).`);
    }
    if (!record.description.ur || typeof record.description.ur !== 'string') {
      errors.push(`Media ${record.id}: Missing Urdu description (\`description.ur\`).`);
    }
  }

  // 6. Source Publisher
  if (!record.sourcePublisher || typeof record.sourcePublisher !== 'object') {
    errors.push(`Media ${record.id}: Missing bilingual \`sourcePublisher\` object.`);
  }

  // 7. Source URL
  if (!record.sourceUrl || typeof record.sourceUrl !== 'string' || record.sourceUrl.trim() === '') {
    errors.push(`Media ${record.id}: Missing source URL.`);
  } else if (
    !record.sourceUrl.startsWith('http://') &&
    !record.sourceUrl.startsWith('https://') &&
    !record.sourceUrl.startsWith('/src/') &&
    !record.sourceUrl.startsWith('./assets/') &&
    !record.sourceUrl.startsWith('/assets/') &&
    !record.sourceUrl.startsWith('assets/')
  ) {
    errors.push(`Media ${record.id}: Source URL must be a valid http, https, or repository asset path.`);
  }

  // 8. Verification Status
  if (!record.verificationStatus || !VALID_EDITORIAL_STATUSES.includes(record.verificationStatus)) {
    errors.push(
      `Media ${record.id}: Invalid verificationStatus "${record.verificationStatus}". Allowed: ${VALID_EDITORIAL_STATUSES.join(', ')}`
    );
  }

  // 9. Separate Dates: eventDate vs publicationDate
  if (record.eventDate && !ISO_DATE_REGEX.test(record.eventDate)) {
    warnings.push(`Media ${record.id}: \`eventDate\` "${record.eventDate}" is not in ISO YYYY-MM-DD format.`);
  }
  if (record.publicationDate && !ISO_DATE_REGEX.test(record.publicationDate)) {
    warnings.push(`Media ${record.id}: \`publicationDate\` "${record.publicationDate}" is not in ISO YYYY-MM-DD format.`);
  }

  // 10. YouTube Video Specific Metadata
  if (record.mediaType === 'youtube_video') {
    if (!record.videoMetadata || typeof record.videoMetadata !== 'object') {
      errors.push(`Media ${record.id}: YouTube video must include \`videoMetadata\`.`);
    } else {
      if (!record.videoMetadata.youtubeId || typeof record.videoMetadata.youtubeId !== 'string') {
        errors.push(`Media ${record.id}: Missing YouTube video ID.`);
      } else if (record.videoMetadata.youtubeId.length !== 11) {
        errors.push(`Media ${record.id}: YouTube ID "${record.videoMetadata.youtubeId}" must be exactly 11 characters.`);
      }

      if (Array.isArray(record.videoMetadata.timestamps)) {
        for (const [idx, ts] of record.videoMetadata.timestamps.entries()) {
          if (typeof ts.timeInSeconds !== 'number' || ts.timeInSeconds < 0) {
            errors.push(`Media ${record.id}: Timestamp at index ${idx} must have non-negative \`timeInSeconds\`.`);
          }
          if (!ts.timecode || typeof ts.timecode !== 'string') {
            errors.push(`Media ${record.id}: Timestamp at index ${idx} is missing \`timecode\`.`);
          }
        }
      }
    }
  }

  return { errors, warnings };
}

/**
 * Validates an entire batch of media records.
 */
export function validateBatchMedia(
  records: any[],
  existingMediaIds: Set<string> = new Set(),
  knownCaseIds: Set<string> = new Set()
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const seenIdsInBatch = new Set<string>();
  const duplicateIds: string[] = [];

  if (!Array.isArray(records)) {
    return {
      valid: false,
      errors: ['Input must be a JSON array of media records.'],
      warnings: [],
      recordCount: 0,
      duplicateIds: [],
    };
  }

  for (const record of records) {
    if (record && record.id) {
      if (seenIdsInBatch.has(record.id)) {
        duplicateIds.push(record.id);
        allErrors.push(`Duplicate ID within imported media batch: "${record.id}"`);
      }
      seenIdsInBatch.add(record.id);
    }

    const { errors, warnings } = validateMediaRecord(record, existingMediaIds, knownCaseIds);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    recordCount: records.length,
    duplicateIds,
  };
}

/**
 * Validates a proposed contributor submission (New Case, Case Correction, or Media).
 */
export function validateProposedSubmission(
  submission: ProposedSubmission,
  existingCases: CaseRecord[],
  existingMedia: MediaItem[] = []
): { valid: boolean; errors: string[]; warnings: string[]; type: string } {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!submission || typeof submission !== 'object') {
    return { valid: false, errors: ['Submission payload is empty or invalid.'], warnings: [], type: 'unknown' };
  }

  const existingCaseIds = new Set(existingCases.map((c) => c.id));
  const existingMediaIds = new Set(existingMedia.map((m) => m.id));

  // Contributor details & checklist verification
  if (!submission.contributorName || submission.contributorName.trim() === '') {
    errors.push('Contributor name / legal affiliation must be provided.');
  }
  if (!submission.checklistConfirmed) {
    errors.push('Verification and statutory privacy checklist must be acknowledged.');
  }

  switch (submission.type) {
    case 'new_case': {
      // Check ID conflict if provided
      if (submission.proposedId && existingCaseIds.has(submission.proposedId)) {
        errors.push(`Proposed ID "${submission.proposedId}" conflicts with an existing published case in the archive.`);
      }

      // Bilingual Title
      if (!submission.title?.en || submission.title.en.trim() === '') {
        errors.push('English title is required for a new case.');
      }
      if (!submission.title?.ur || submission.title.ur.trim() === '') {
        errors.push('Urdu title is required for a new case.');
      }

      // Case Number
      if (!submission.caseNumber || submission.caseNumber.trim() === '') {
        warnings.push('Case docket number or FIR reference was not specified.');
      }

      // Status
      if (!VALID_STATUSES.includes(submission.proceduralStatus)) {
        errors.push(`Invalid procedural status "${submission.proceduralStatus}".`);
      }

      // Category
      if (!VALID_CATEGORIES.includes(submission.category)) {
        errors.push(`Invalid category "${submission.category}".`);
      }

      // Province
      if (!VALID_PROVINCES.includes(submission.province)) {
        errors.push(`Invalid province "${submission.province}".`);
      }

      // Summary
      if (!submission.summary?.en || submission.summary.en.trim() === '') {
        errors.push('English summary is required.');
      }
      if (!submission.summary?.ur || submission.summary.ur.trim() === '') {
        errors.push('Urdu summary is required.');
      }

      // Sources
      if (!submission.sources || submission.sources.trim() === '') {
        errors.push('Primary source links or citations are required to substantiate the record.');
      }

      // Check minors in parties
      if (Array.isArray(submission.parties)) {
        for (const p of submission.parties) {
          if (p.isProtectedOrMinor && !p.redacted) {
            errors.push(`Party "${p.name?.en || 'unnamed'}" is flagged as protected/minor but is not marked as redacted.`);
          }
        }
      }
      break;
    }

    case 'case_correction': {
      if (!submission.caseId || !existingCaseIds.has(submission.caseId)) {
        errors.push(`Target case ID "${submission.caseId}" does not exist in the active archive.`);
      }
      if (!submission.affectedSection || submission.affectedSection.trim() === '') {
        errors.push('Target section or field requiring correction must be specified.');
      }
      if (!submission.currentText || submission.currentText.trim() === '') {
        errors.push('Current text on the live website must be quoted.');
      }
      if (!submission.proposedReplacement || submission.proposedReplacement.trim() === '') {
        errors.push('Proposed replacement text must be provided.');
      }
      if (!submission.reason || submission.reason.trim() === '') {
        errors.push('Factual or procedural rationale for the correction is required.');
      }
      if (!submission.supportingEvidence || submission.supportingEvidence.trim() === '') {
        errors.push('Supporting documentary evidence or citation is required for corrections.');
      }
      if (submission.affectsProceduralStatus && submission.proposedStatus) {
        if (!VALID_STATUSES.includes(submission.proposedStatus)) {
          errors.push(`Invalid proposed procedural status "${submission.proposedStatus}".`);
        }
      }
      break;
    }

    case 'media_submission': {
      if (!Array.isArray(submission.associatedCaseIds) || submission.associatedCaseIds.length === 0) {
        errors.push('At least one associated case ID must be designated.');
      } else {
        for (const cId of submission.associatedCaseIds) {
          if (!existingCaseIds.has(cId)) {
            errors.push(`Associated case ID "${cId}" does not exist in the published archive.`);
          }
        }
      }
      if (!VALID_MEDIA_TYPES.includes(submission.mediaType)) {
        errors.push(`Invalid mediaType "${submission.mediaType}".`);
      }
      if (!submission.title?.en || !submission.title?.ur) {
        errors.push('Bilingual title (English & Urdu) is required for media submissions.');
      }
      if (!submission.sourcePublisher?.en || !submission.sourcePublisher?.ur) {
        errors.push('Bilingual source publisher / issuing authority is required.');
      }
      if (!submission.sourceUrl || submission.sourceUrl.trim() === '') {
        errors.push('Source URL is required.');
      }
      if (!submission.eventDate || !ISO_DATE_REGEX.test(submission.eventDate)) {
        errors.push('Event / hearing date must be in ISO YYYY-MM-DD format.');
      }
      if (!submission.description?.en || !submission.description?.ur) {
        errors.push('Bilingual contextual description is required.');
      }
      break;
    }

    default:
      errors.push(`Unrecognized submission type: "${(submission as any).type}"`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    type: submission.type,
  };
}
