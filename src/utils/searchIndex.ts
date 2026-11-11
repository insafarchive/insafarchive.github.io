import { CaseRecord, CaseIndexEntry, ProceduralStatus, ArchiveCategory, Province, CourtLevel, RecordType, EditorialReviewStatus, Language } from '../types';
import { normalizeSearchText, extractMatchSnippet } from './urduNormalize';

export interface FilterState {
  query: string;
  status: ProceduralStatus | 'all';
  province: Province | 'all';
  courtLevel: CourtLevel | 'all';
  category: ArchiveCategory | 'all';
  recordType: RecordType | 'all';
  reviewStatus: EditorialReviewStatus | 'all';
  year: string; // e.g. "all" | "2024" | "2023" | etc.
  hasDocumentsOnly: boolean;
  hasVideoOnly: boolean;
  sortBy: 'updated_desc' | 'incident_desc' | 'incident_asc' | 'filing_desc' | 'title_asc';
  page: number;
}

export const initialFilterState: FilterState = {
  query: '',
  status: 'all',
  province: 'all',
  courtLevel: 'all',
  category: 'all',
  recordType: 'all',
  reviewStatus: 'all',
  year: 'all',
  hasDocumentsOnly: false,
  hasVideoOnly: false,
  sortBy: 'updated_desc',
  page: 1,
};

/**
 * Builds lightweight searchable index entries from rich CaseRecords.
 */
export function buildCaseIndexEntry(record: CaseRecord): CaseIndexEntry {
  return {
    id: record.id,
    slug: record.slug,
    caseNumber: record.caseNumber,
    title: record.title,
    summary: record.summary,
    proceduralStatus: record.proceduralStatus,
    categories: record.categories,
    province: record.location.province,
    district: record.location.district,
    courtLevel: record.courtLevel,
    court: record.court,
    lastUpdated: record.lastUpdated,
    incidentDate: record.incidentDate,
    filingDate: record.filingDate,
    recordType: record.recordType,
    editorialReviewStatus: record.editorialReviewStatus,
    hasDocuments: record.connectedDocuments && record.connectedDocuments.length > 0,
    hasVideo: record.videoEvidence && record.videoEvidence.length > 0,
    tags: record.tags || [],
    isDemonstrationData: record.isDemonstrationData,
  };
}

/**
 * Performs search and multi-faceted filtering on CaseRecords.
 */
export function searchAndFilterCases(
  records: CaseRecord[],
  filters: FilterState,
  lang: Language
): {
  results: CaseRecord[];
  totalCount: number;
  highlightMap: Map<string, string>; // Case ID -> match snippet
} {
  const highlightMap = new Map<string, string>();
  const normalizedQuery = normalizeSearchText(filters.query);
  const queryTokens = normalizedQuery.split(' ').filter(Boolean);

  const filtered = records.filter((caseItem) => {
    // 1. Text Search across bilingual fields
    if (queryTokens.length > 0) {
      const partyNames = caseItem.parties
        .map((p) => (p.redacted ? '' : `${p.name.en} ${p.name.ur}`))
        .join(' ');

      const provisions = (caseItem.statutoryProvisions || []).join(' ');
      const tags = (caseItem.tags || []).join(' ');
      const districtCity = `${caseItem.location.district || ''} ${caseItem.location.city || ''}`;

      const fullSearchCorpus = normalizeSearchText(
        `${caseItem.id} ${caseItem.caseNumber} ${caseItem.title.en} ${caseItem.title.ur} ${caseItem.summary.en} ${caseItem.summary.ur} ${caseItem.factualBackground.en} ${caseItem.factualBackground.ur} ${caseItem.court?.en || ''} ${caseItem.court?.ur || ''} ${partyNames} ${districtCity} ${provisions} ${tags}`
      );

      const matchesAll = queryTokens.every((token) => fullSearchCorpus.includes(token));
      if (!matchesAll) return false;

      // Extract highlight snippet for UI display
      const activeText =
        caseItem.summary[lang] || caseItem.title[lang] || caseItem.factualBackground[lang];
      const { snippet } = extractMatchSnippet(activeText, filters.query);
      highlightMap.set(caseItem.id, snippet);
    }

    // 2. Status Filter
    if (filters.status !== 'all' && caseItem.proceduralStatus !== filters.status) {
      return false;
    }

    // 3. Province Filter
    if (filters.province !== 'all' && caseItem.location.province !== filters.province) {
      return false;
    }

    // 4. Court Level Filter
    if (filters.courtLevel !== 'all' && caseItem.courtLevel !== filters.courtLevel) {
      return false;
    }

    // 5. Category Filter (multi-category support)
    if (filters.category !== 'all' && !caseItem.categories.includes(filters.category)) {
      return false;
    }

    // 6. Record Type Filter
    if (filters.recordType !== 'all' && caseItem.recordType !== filters.recordType) {
      return false;
    }

    // 7. Editorial Review Status Filter
    if (filters.reviewStatus !== 'all' && caseItem.editorialReviewStatus !== filters.reviewStatus) {
      return false;
    }

    // 8. Incident Year Filter
    if (filters.year !== 'all') {
      const dateToCheck = caseItem.incidentDate || caseItem.filingDate;
      if (!dateToCheck || !dateToCheck.startsWith(filters.year)) {
        return false;
      }
    }

    // 9. Document and Video Toggles
    if (filters.hasDocumentsOnly && (!caseItem.connectedDocuments || caseItem.connectedDocuments.length === 0)) {
      return false;
    }
    if (filters.hasVideoOnly && (!caseItem.videoEvidence || caseItem.videoEvidence.length === 0)) {
      return false;
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'updated_desc':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      case 'incident_desc': {
        const da = a.incidentDate || a.filingDate || '1970-01-01';
        const db = b.incidentDate || b.filingDate || '1970-01-01';
        return new Date(db).getTime() - new Date(da).getTime();
      }
      case 'incident_asc': {
        const da = a.incidentDate || a.filingDate || '9999-12-31';
        const db = b.incidentDate || b.filingDate || '9999-12-31';
        return new Date(da).getTime() - new Date(db).getTime();
      }
      case 'filing_desc': {
        const da = a.filingDate || '1970-01-01';
        const db = b.filingDate || '1970-01-01';
        return new Date(db).getTime() - new Date(da).getTime();
      }
      case 'title_asc':
        return a.title[lang].localeCompare(b.title[lang]);
      default:
        return 0;
    }
  });

  return {
    results: filtered,
    totalCount: filtered.length,
    highlightMap,
  };
}

/**
 * Encodes current filter state into URL hash search parameters for sharing.
 */
export function filtersToQueryString(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.query) params.set('q', filters.query);
  if (filters.status !== 'all') params.set('status', filters.status);
  if (filters.province !== 'all') params.set('province', filters.province);
  if (filters.courtLevel !== 'all') params.set('court', filters.courtLevel);
  if (filters.category !== 'all') params.set('cat', filters.category);
  if (filters.recordType !== 'all') params.set('type', filters.recordType);
  if (filters.reviewStatus !== 'all') params.set('review', filters.reviewStatus);
  if (filters.year !== 'all') params.set('year', filters.year);
  if (filters.hasDocumentsOnly) params.set('docs', '1');
  if (filters.hasVideoOnly) params.set('video', '1');
  if (filters.sortBy !== 'updated_desc') params.set('sort', filters.sortBy);
  if (filters.page > 1) params.set('page', filters.page.toString());

  const str = params.toString();
  return str ? `?${str}` : '';
}

/**
 * Decodes URL search parameters into FilterState.
 */
export function queryStringToFilters(searchStr: string): Partial<FilterState> {
  const clean = searchStr.startsWith('?') ? searchStr.slice(1) : searchStr;
  const params = new URLSearchParams(clean);
  const partial: Partial<FilterState> = {};

  if (params.has('q')) partial.query = params.get('q') || '';
  if (params.has('status')) partial.status = params.get('status') as any;
  if (params.has('province')) partial.province = params.get('province') as any;
  if (params.has('court')) partial.courtLevel = params.get('court') as any;
  if (params.has('cat')) partial.category = params.get('cat') as any;
  if (params.has('type')) partial.recordType = params.get('type') as any;
  if (params.has('review')) partial.reviewStatus = params.get('review') as any;
  if (params.has('year')) partial.year = params.get('year') || 'all';
  if (params.has('docs')) partial.hasDocumentsOnly = params.get('docs') === '1';
  if (params.has('video')) partial.hasVideoOnly = params.get('video') === '1';
  if (params.has('sort')) partial.sortBy = params.get('sort') as any;
  if (params.has('page')) partial.page = parseInt(params.get('page') || '1', 10) || 1;

  return partial;
}
