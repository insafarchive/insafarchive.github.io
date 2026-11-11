/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Schema Validation & Non-Fabrication Rule Engine
 */

import type { ArchiveRecord } from '../types/archive';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Validates an ArchiveRecord against the rigorous archival standard.
 * Enforces bilingual integrity, schema versioning, and non-fabrication constraints.
 */
export function validateArchiveRecord(record: Partial<ArchiveRecord>): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Identification
  if (!record.id || record.id.trim() === '') {
    errors.push({ field: 'id', message: 'Record ID is required.', severity: 'error' });
  } else if (!/^[a-zA-Z0-9-_]+$/.test(record.id)) {
    errors.push({
      field: 'id',
      message: 'Record ID must be alphanumeric with hyphens or underscores (e.g. rec-pk-2022-case-101 or IA-AR-000001).',
      severity: 'error',
    });
  }

  // 2. Bilingual Titles
  if (!record.title?.en || record.title.en.trim() === '') {
    errors.push({ field: 'title.en', message: 'English title is required.', severity: 'error' });
  }
  if (!record.title?.ur || record.title.ur.trim() === '') {
    errors.push({ field: 'title.ur', message: 'Urdu title is required for bilingual archival parity.', severity: 'error' });
  }

  // 3. Bilingual Summaries
  if (!record.summary?.en || record.summary.en.trim() === '') {
    errors.push({ field: 'summary.en', message: 'English summary is required.', severity: 'error' });
  }
  if (!record.summary?.ur || record.summary.ur.trim() === '') {
    warnings.push({ field: 'summary.ur', message: 'Urdu summary is missing or pending translation.', severity: 'warning' });
  }

  // 4. Domain & Record Type
  if (!record.domain) {
    errors.push({ field: 'domain', message: 'Archive domain is required.', severity: 'error' });
  }
  if (!record.recordType) {
    errors.push({ field: 'recordType', message: 'Record type is required.', severity: 'error' });
  }

  // 5. Temporal Anchor
  if (!record.date?.dateString) {
    errors.push({ field: 'date.dateString', message: 'Record date is required.', severity: 'error' });
  }

  // 6. Non-Fabrication & Source Validation Rules
  const sourceIdSet = new Set((record.sources || []).map(s => s.sourceId));

  if (!record.sources || record.sources.length === 0) {
    warnings.push({
      field: 'sources',
      message: 'Record has no primary or secondary source citations attached.',
      severity: 'warning',
    });
  }

  // Validate sources
  (record.sources || []).forEach((source, sIdx) => {
    if (!source.sourceId) {
      errors.push({
        field: `sources[${sIdx}].sourceId`,
        message: 'Source must have a unique sourceId.',
        severity: 'error',
      });
    }
    if (!source.title?.en && !source.title?.ur) {
      errors.push({
        field: `sources[${sIdx}].title`,
        message: 'Source must have a title in English or Urdu.',
        severity: 'error',
      });
    }
  });

  // Check claims: Strict Non-Fabrication Rule
  (record.claims || []).forEach((claim, idx) => {
    if (!claim.assertion?.en && !claim.assertion?.ur) {
      errors.push({
        field: `claims[${idx}]`,
        message: 'Claim must have an assertion in English or Urdu.',
        severity: 'error',
      });
    }

    // Strict Rule: Every claim MUST cite at least one source
    if (!claim.sourceIds || claim.sourceIds.length === 0) {
      errors.push({
        field: `claims[${idx}].sourceIds`,
        message: `Claim "${claim.assertion?.en?.slice(0, 30) || idx}" must reference at least one verified source ID to prevent unverified assertions.`,
        severity: 'error',
      });
    } else {
      claim.sourceIds.forEach(srcId => {
        if (!sourceIdSet.has(srcId)) {
          errors.push({
            field: `claims[${idx}].sourceIds`,
            message: `Claim references non-existent sourceId: "${srcId}".`,
            severity: 'error',
          });
        }
      });
    }
  });

  // 7. Privacy & Classification
  if (!record.privacyClassification) {
    errors.push({ field: 'privacyClassification', message: 'Privacy classification is required.', severity: 'error' });
  }
  if (!record.editorialStatus) {
    errors.push({ field: 'editorialStatus', message: 'Editorial status is required.', severity: 'error' });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates dataset-level integrity across an entire repository of records
 */
export function validateDatasetIntegrity(records: ArchiveRecord[]): {
  isValid: boolean;
  errors: string[];
  duplicateIds: string[];
  brokenRelationships: Array<{ sourceRecordId: string; targetRecordId: string; predicate: string }>;
  recordValidationErrors: Array<{ recordId: string; errors: ValidationError[] }>;
} {
  const seenIds = new Set<string>();
  const duplicateIds: string[] = [];
  const recordMap = new Map<string, ArchiveRecord>();
  const recordValidationErrors: Array<{ recordId: string; errors: ValidationError[] }> = [];
  const brokenRelationships: Array<{ sourceRecordId: string; targetRecordId: string; predicate: string }> = [];

  // Pass 1: Individual record schema & duplicate ID detection
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (seenIds.has(record.id)) {
      duplicateIds.push(record.id);
    }
    seenIds.add(record.id);
    recordMap.set(record.id, record);

    const validation = validateArchiveRecord(record);
    if (!validation.isValid) {
      recordValidationErrors.push({ recordId: record.id, errors: validation.errors });
    }
  }

  // Pass 2: Cross-record relationship target validation
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    if (record.relationships) {
      for (let r = 0; r < record.relationships.length; r++) {
        const rel = record.relationships[r];
        if (!recordMap.has(rel.targetRecordId)) {
          brokenRelationships.push({
            sourceRecordId: record.id,
            targetRecordId: rel.targetRecordId,
            predicate: rel.predicate,
          });
        }
      }
    }
  }

  const errors: string[] = [];
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate IDs detected: ${duplicateIds.join(', ')}`);
  }
  if (brokenRelationships.length > 0) {
    errors.push(
      `Broken relationships: ${brokenRelationships.map(b => `${b.sourceRecordId} -> ${b.targetRecordId}`).join(', ')}`
    );
  }
  if (recordValidationErrors.length > 0) {
    errors.push(
      `Record validation errors in: ${recordValidationErrors.map(r => r.recordId).join(', ')}`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    duplicateIds,
    brokenRelationships,
    recordValidationErrors,
  };
}
