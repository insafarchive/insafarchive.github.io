/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Bilingual Search & Filtering Engine
 */

import type { ArchiveRecord, ArchiveSearchFilter } from '../types/archive';
import { normalizeText, tokenizeSearchQuery, matchesQuery } from './urduNormalize';
import { extractNumericYear } from './dateUtils';

export interface SearchMatch {
  record: ArchiveRecord;
  score: number;
  highlightMatches?: string[];
}

/**
 * Searches and filters records across English and Urdu fields, metadata, claims, sources, and tags.
 */
export function searchArchive(
  records: ArchiveRecord[],
  filter: ArchiveSearchFilter
): ArchiveRecord[] {
  const queryTokens = filter.query ? tokenizeSearchQuery(filter.query) : [];

  return records
    .map(record => {
      // 1. Check strict filters
      if (filter.domain && filter.domain !== 'all' && record.domain !== filter.domain) {
        return null;
      }

      if (filter.recordType && filter.recordType !== 'all' && record.recordType !== filter.recordType) {
        return null;
      }

      if (filter.verificationStatus && filter.verificationStatus !== 'all' && record.verificationStatus !== filter.verificationStatus) {
        return null;
      }

      const recYear = extractNumericYear(record.date);
      if (filter.yearFrom && recYear > 0 && recYear < filter.yearFrom) {
        return null;
      }
      if (filter.yearTo && recYear > 0 && recYear > filter.yearTo) {
        return null;
      }

      if (filter.findingType && filter.findingType !== 'all') {
        const hasFinding = record.claims.some(c => c.findingType === filter.findingType);
        if (!hasFinding) return null;
      }

      if (filter.sourceType && filter.sourceType !== 'all') {
        const hasSourceType = record.sources.some(s => s.sourceType === filter.sourceType);
        if (!hasSourceType) return null;
      }

      if (filter.location && filter.location.trim() !== '') {
        const locNorm = normalizeText(filter.location);
        const cityNorm = normalizeText(record.location?.city?.en || '') + ' ' + normalizeText(record.location?.city?.ur || '');
        const provinceNorm = normalizeText(record.location?.provinceState?.en || '') + ' ' + normalizeText(record.location?.provinceState?.ur || '');
        const countryNorm = normalizeText(record.location?.country?.en || '') + ' ' + normalizeText(record.location?.country?.ur || '');
        if (!cityNorm.includes(locNorm) && !provinceNorm.includes(locNorm) && !countryNorm.includes(locNorm)) {
          return null;
        }
      }

      if (filter.tag && filter.tag.trim() !== '') {
        const tagNorm = normalizeText(filter.tag);
        const allTags = [
          ...(record.tags?.en || []),
          ...(record.tags?.ur || []),
          ...record.categories,
        ].map(t => normalizeText(t));
        if (!allTags.some(t => t.includes(tagNorm))) {
          return null;
        }
      }

      // If no query string, record passes with default relevance score based on date
      if (queryTokens.length === 0) {
        return { record, score: recYear || 100 };
      }

      // Calculate score based on matches in various fields
      let score = 0;
      const cleanQuery = filter.query?.toLowerCase().trim() || '';

      // 1. Exact ID match (Highest Priority)
      if (record.id.toLowerCase() === cleanQuery) {
        score += 1000;
        return { record, score };
      }

      // 2. English & Urdu Title
      const enTitleNorm = normalizeText(record.title.en);
      if (matchesQuery(enTitleNorm, queryTokens)) {
        score += 200;
      }

      const urTitleNorm = normalizeText(record.title.ur);
      if (matchesQuery(urTitleNorm, queryTokens)) {
        score += 200;
      }

      // 3. Document identifiers in sources (e.g. Case Number, FIR, Gazette)
      for (let s = 0; s < record.sources.length; s++) {
        const src = record.sources[s];
        if (src.documentIdentifier) {
          const docIdNorm = normalizeText(src.documentIdentifier);
          if (matchesQuery(docIdNorm, queryTokens)) {
            score += 150;
            break;
          }
        }
      }

      // 4. Summaries
      const enSumNorm = normalizeText(record.summary.en);
      if (matchesQuery(enSumNorm, queryTokens)) {
        score += 80;
      }

      const urSumNorm = normalizeText(record.summary.ur);
      if (matchesQuery(urSumNorm, queryTokens)) {
        score += 80;
      }

      // 5. Tags & Categories
      if (record.categories) {
        for (let c = 0; c < record.categories.length; c++) {
          if (matchesQuery(normalizeText(record.categories[c]), queryTokens)) {
            score += 40;
            break;
          }
        }
      }

      if (record.tags) {
        const enTags = record.tags.en;
        for (let t = 0; t < enTags.length; t++) {
          if (matchesQuery(normalizeText(enTags[t]), queryTokens)) {
            score += 40;
            break;
          }
        }
        const urTags = record.tags.ur;
        for (let t = 0; t < urTags.length; t++) {
          if (matchesQuery(normalizeText(urTags[t]), queryTokens)) {
            score += 40;
            break;
          }
        }
      }

      // 6. Narrative
      if (score === 0) {
        const enNarrativeNorm = normalizeText(record.narrative.en);
        if (matchesQuery(enNarrativeNorm, queryTokens)) {
          score += 30;
        } else {
          const urNarrativeNorm = normalizeText(record.narrative.ur);
          if (matchesQuery(urNarrativeNorm, queryTokens)) {
            score += 30;
          }
        }
      }

      if (score > 0) {
        return { record, score };
      }

      return null;
    })
    .filter((item): item is { record: ArchiveRecord; score: number } => item !== null)
    .sort((a, b) => b.score - a.score)
    .map(item => item.record);
}

/**
 * Execute search alias for searchArchive
 */
export const executeSearch = searchArchive;
