import { CaseRecord, CaseIndexEntry } from '../../types';
import { buildCaseIndexEntry } from '../../utils/searchIndex';

import { case01 } from './case-01-pk-sc-2024-0102';
import { case02 } from './case-02-pk-lhc-2023-0451';
import { case03 } from './case-03-pk-ihc-2023-0892';
import { case04 } from './case-04-pk-shc-2022-0019';
import { case05 } from './case-05-pk-phc-2023-0056';
import { case06 } from './case-06-pk-bhc-2024-0033';
import { case07 } from './case-07-pk-atc-2023-0118';
import { case08 } from './case-08-pk-ihc-2024-0210';
import { case09 } from './case-09-pk-lhc-2024-0315';
import { case10 } from './case-10-pk-sc-2023-0941';

/**
 * Primary registry of documented demonstration cases.
 * In production, this can be hydrated from a static JSON manifest generated at build time.
 */
export const allCaseRecords: CaseRecord[] = [
  case01,
  case02,
  case03,
  case04,
  case05,
  case06,
  case07,
  case08,
  case09,
  case10,
];

// Map lookup by ID
export const caseMapById = new Map<string, CaseRecord>(
  allCaseRecords.map((c) => [c.id, c])
);

// Map lookup by slug
export const caseMapBySlug = new Map<string, CaseRecord>(
  allCaseRecords.map((c) => [c.slug, c])
);

/**
 * Pre-computed lightweight index entries for fast listing and searching
 * without passing full case dossier text payloads to simple list views.
 */
export const caseIndexEntries: CaseIndexEntry[] = allCaseRecords.map(buildCaseIndexEntry);

/**
 * Helper to retrieve a case record by either ID or slug.
 */
export function getCaseByIdOrSlug(idOrSlug: string): CaseRecord | undefined {
  return caseMapById.get(idOrSlug) || caseMapBySlug.get(idOrSlug);
}

// Re-export for backward compatibility with Phase 1 components
export const demonstrationCases = allCaseRecords;
