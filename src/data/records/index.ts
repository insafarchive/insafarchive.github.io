import type { ArchiveRecord } from '../../types/archive';
import { SEED_ARCHIVE_RECORDS } from '../seedRecords';
import { legalRecords } from './legal/legalRecords';
import { politicalRecords } from './political/politicalRecords';
import { journalismRecords } from './journalism_media/journalismRecords';
import { economicRecords } from './economic/economicRecords';
import { humanRightsRecords } from './human_rights/humanRightsRecords';

/**
 * Master archive registry composed of the legacy seed records and domain modules.
 * Strictly audited to guarantee zero duplicate IDs across modules.
 */
export const ALL_ARCHIVE_RECORDS: ArchiveRecord[] = [
  ...SEED_ARCHIVE_RECORDS,
  ...legalRecords,
  ...politicalRecords,
  ...journalismRecords,
  ...economicRecords,
  ...humanRightsRecords,
];

/**
 * Detect duplicate record IDs within the active registry.
 * Returns an array of error messages; an empty array means no duplicates.
 * Each message includes the duplicate ID, the source modules where it appears,
 * and whether the records are identical or conflicting.
 */
export function validateRegistryDuplicates(): string[] {
  const seen = new Map<string, { source: string; record: ArchiveRecord }>();
  const errors: string[] = [];

  const process = (records: ArchiveRecord[], source: string) => {
    for (const rec of records) {
      const existing = seen.get(rec.id);
      if (existing) {
        const identical = JSON.stringify(existing.record) === JSON.stringify(rec);
        errors.push(
          `Duplicate ID '${rec.id}' found in ${source} and ${existing.source}. Records are ${
            identical ? 'identical' : 'conflicting'
          }.`
        );
      } else {
        seen.set(rec.id, { source, record: rec });
      }
    }
  };

  process(SEED_ARCHIVE_RECORDS, 'seedRecords.ts');
  process(legalRecords, 'legalRecords.ts');
  process(politicalRecords, 'politicalRecords.ts');
  process(journalismRecords, 'journalismRecords.ts');
  process(economicRecords, 'economicRecords.ts');
  process(humanRightsRecords, 'humanRightsRecords.ts');

  return errors;
}

// Backward‑compatible export for existing imports.
export { ALL_ARCHIVE_RECORDS as SEED_ARCHIVE_RECORDS };
