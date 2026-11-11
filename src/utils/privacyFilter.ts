/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Privacy Boundaries & Publication Safety Engine
 */

import type { ArchiveRecord } from '../types/archive';
import { validateArchiveRecord } from './schemaValidator';

/**
 * Single Authoritative Rule: Is a record safe and approved for public publication?
 * The public site and public exports MUST ONLY expose records passing this predicate.
 */
export function isPubliclyPublished(record: ArchiveRecord | null | undefined): boolean {
  if (!record) return false;

  // 1. Must have editorialStatus === 'published'
  if (record.editorialStatus !== 'published') {
    return false;
  }

  // 2. Must not be classified as do_not_publish or restricted_editorial
  if (
    record.privacyClassification === 'do_not_publish' ||
    record.privacyClassification === 'restricted_editorial'
  ) {
    return false;
  }

  // 3. Check critical privacy flags
  if (
    record.privacyFlags?.containsConfidentialPrivilege ||
    record.privacyFlags?.isMinor
  ) {
    return false;
  }

  return true;
}

/**
 * Filters any list of records to strictly only publicly published records
 */
export function filterPublicRecords(records: ArchiveRecord[]): ArchiveRecord[] {
  return records.filter(isPubliclyPublished);
}

/**
 * Sanitizes a record for public JSON export, removing internal editorial notes
 */
export function sanitizeRecordForPublicExport(record: ArchiveRecord): ArchiveRecord {
  const sanitized: ArchiveRecord = {
    ...record,
    // Strip internal editorial scratch notes
    editorialNotes: undefined,
  };

  return sanitized;
}

/**
 * Generates clean, verified, public-only JSON export
 */
export function exportPublicArchiveJson(records: ArchiveRecord[]): string {
  const publicRecords = filterPublicRecords(records).map(sanitizeRecordForPublicExport);
  return JSON.stringify(publicRecords, null, 2);
}

/**
 * Safely imports and validates archival records from JSON string
 */
export function importArchiveRecordsJson(
  jsonStr: string
): { success: boolean; records?: ArchiveRecord[]; errors?: string[]; importedCount?: number } {
  try {
    const parsed = JSON.parse(jsonStr);
    const recordsArray = Array.isArray(parsed) ? parsed : [parsed];
    const errors: string[] = [];
    const validRecords: ArchiveRecord[] = [];
    const seenIds = new Set<string>();

    for (let i = 0; i < recordsArray.length; i++) {
      const rec = recordsArray[i];
      if (!rec || typeof rec !== 'object') {
        errors.push(`Item at index ${i} is not a valid JSON object.`);
        continue;
      }

      if (seenIds.has(rec.id)) {
        errors.push(`Duplicate ID detected: "${rec.id}" at index ${i}.`);
        continue;
      }
      seenIds.add(rec.id);

      const validation = validateArchiveRecord(rec);
      if (!validation.isValid) {
        errors.push(
          `Record "${rec.id || i}" failed validation: ${validation.errors.map(e => e.message).join(', ')}`
        );
      } else {
        // Enforce schema version
        rec.schemaVersion = '1.0.0';
        validRecords.push(rec as ArchiveRecord);
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    return {
      success: true,
      records: validRecords,
      importedCount: validRecords.length,
    };
  } catch (err: unknown) {
    return {
      success: false,
      errors: [`Malformed JSON: ${err instanceof Error ? err.message : String(err)}`],
    };
  }
}
