/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Registry & Query Engine
 */

import { CONSTITUTION_METADATA } from './constitutionMetadata';
import { CONSTITUTION_PARTS } from './parts';
import { CONSTITUTION_CHAPTERS } from './chapters';
import { CONSTITUTION_ARTICLES } from './articles';
import { CONSTITUTION_SCHEDULES } from './schedules';
import { CONSTITUTION_AMENDMENTS } from './amendments';
import { CONSTITUTIONAL_SOURCES } from './constitutionalSources';
import { CONSTITUTIONAL_MAPPINGS } from './constitutionalMappings';
import {
  CONSTITUTION_COVERAGE_REGISTER,
  getCoverageEntryById,
  getCoverageEntryByNumber,
  getCoverageStatistics,
} from './coverageRegister';
import type {
  ConstitutionalArticle,
  ConstitutionalPart,
  ConstitutionalChapter,
  ConstitutionalSchedule,
  ConstitutionalAmendment,
  ConstitutionalMappingEntry,
  ConstitutionalMetadata,
  ConstitutionalArticleCoverageEntry,
} from '../../types/constitution';

export type {
  ConstitutionalArticle,
  ConstitutionalPart,
  ConstitutionalChapter,
  ConstitutionalSchedule,
  ConstitutionalAmendment,
  ConstitutionalMappingEntry,
  ConstitutionalMetadata,
  ConstitutionalArticleCoverageEntry,
};

export {
  CONSTITUTION_METADATA,
  CONSTITUTION_PARTS,
  CONSTITUTION_CHAPTERS,
  CONSTITUTION_ARTICLES,
  CONSTITUTION_SCHEDULES,
  CONSTITUTION_AMENDMENTS,
  CONSTITUTIONAL_SOURCES,
  CONSTITUTIONAL_MAPPINGS,
  CONSTITUTION_COVERAGE_REGISTER,
  getCoverageEntryById,
  getCoverageEntryByNumber,
  getCoverageStatistics,
};

// =========================================================================
// QUERY HELPERS
// =========================================================================

export function getArticleById(id: string): ConstitutionalArticle | undefined {
  const existing = CONSTITUTION_ARTICLES.find(a => a.id === id);
  if (existing) return existing;

  // Fallback to Coverage Register to guarantee functioning detail page for all 280+ provisions
  const coverage = getCoverageEntryById(id);
  if (coverage) {
    const isOmitted = coverage.title.en.toLowerCase().includes('omitted') || coverage.title.en.toLowerCase().includes('repealed');
    return {
      id: coverage.articleId,
      articleNumber: coverage.articleNumber,
      partId: coverage.partId,
      chapterId: coverage.chapterId,
      title: coverage.title,
      originalStatutoryEnglish: isOmitted
        ? `[This provision was ${coverage.title.en.includes('Repealed') ? 'repealed' : 'omitted'} by Constitutional Amendment Act. Historical text cataloged in archival register.]`
        : `[Statutory text of Article ${coverage.articleNumber} is currently undergoing source verification against the official Gazette of Pakistan / Pakistan Code repository.]`,
      urduText: isOmitted
        ? `[یہ آئینی شق ترمیم کے ذریعے حذف یا منسوخ کر دی گئی ہے۔] `
        : `[آرٹیکل ${coverage.articleNumber} کا باضابطہ گزٹ متن قانونی تصدیق کے مراحل میں ہے۔]`,
      urduStatus: 'unverified',
      clauses: [],
      easyExplanation: {
        en: coverage.editorialNotes,
        ur: coverage.title.ur + ' — ' + (isOmitted ? 'یہ شق حذف شدہ ہے' : 'اس شق کا تفصیلی جائزہ جاری ہے'),
      },
      landmarkPrecedents: [],
      amendmentHistory: [],
      relatedArticleIds: [],
      thematicCategories: ['Constitutional Governance', 'Statutory Register'],
      sourceCitationId: coverage.sourceCitationStatus === 'source_verified' ? 'SRC-CONST-PAKCODE-2024' : 'SRC-CONST-NA-ENG-2024',
      status: isOmitted ? 'omitted' : 'active',
      editorialNotes: coverage.editorialNotes,
      lastReviewedAt: coverage.lastReviewedDate,
    };
  }

  return undefined;
}

export function getArticleByNumber(num: string): ConstitutionalArticle | undefined {
  const normalized = num.trim().toLowerCase();
  const existing = CONSTITUTION_ARTICLES.find(
    a => a.articleNumber.toLowerCase() === normalized || a.id.toLowerCase() === `pk-const-a${normalized}`
  );
  if (existing) return existing;

  const coverage = getCoverageEntryByNumber(num);
  if (coverage) {
    return getArticleById(coverage.articleId);
  }
  return undefined;
}


export function getArticlesByPart(partId: string): ConstitutionalArticle[] {
  return CONSTITUTION_ARTICLES.filter(a => a.partId === partId);
}

export function getMappingsForArticle(articleId: string): ConstitutionalMappingEntry[] {
  return CONSTITUTIONAL_MAPPINGS.filter(m => m.articleId === articleId);
}

export function getMappingsForRecord(recordId: string): ConstitutionalMappingEntry[] {
  return CONSTITUTIONAL_MAPPINGS.filter(m => m.archiveRecordId === recordId);
}

export function getAmendmentById(id: string): ConstitutionalAmendment | undefined {
  return CONSTITUTION_AMENDMENTS.find(amd => amd.id === id);
}

// =========================================================================
// INTEGRITY & REFERENTIAL VALIDATOR
// =========================================================================

export function validateConstitutionIntegrity(): string[] {
  const errors: string[] = [];
  const articleIdSet = new Set<string>();
  const partIdSet = new Set<string>(CONSTITUTION_PARTS.map(p => p.id));
  const sourceIdSet = new Set<string>(CONSTITUTIONAL_SOURCES.map(s => s.sourceId));

  // 1. Validate Article IDs and Part links
  for (const article of CONSTITUTION_ARTICLES) {
    if (articleIdSet.has(article.id)) {
      errors.push(`Duplicate Article ID detected: ${article.id}`);
    }
    articleIdSet.add(article.id);

    if (!partIdSet.has(article.partId)) {
      errors.push(`Article ${article.id} references non-existent Part ID: ${article.partId}`);
    }

    if (!sourceIdSet.has(article.sourceCitationId)) {
      errors.push(`Article ${article.id} references non-existent Source ID: ${article.sourceCitationId}`);
    }

    // Validate clause IDs
    const clauseIdSet = new Set<string>();
    for (const clause of article.clauses) {
      if (clauseIdSet.has(clause.id)) {
        errors.push(`Duplicate Clause ID ${clause.id} in Article ${article.id}`);
      }
      clauseIdSet.add(clause.id);
      if (clause.articleId !== article.id) {
        errors.push(`Clause ${clause.id} articleId mismatch: expected ${article.id}, got ${clause.articleId}`);
      }
    }
  }

  // 2. Validate Mapping Referentials
  const mappingIdSet = new Set<string>();
  for (const map of CONSTITUTIONAL_MAPPINGS) {
    if (mappingIdSet.has(map.mappingId)) {
      errors.push(`Duplicate Mapping ID: ${map.mappingId}`);
    }
    mappingIdSet.add(map.mappingId);

    if (!articleIdSet.has(map.articleId)) {
      errors.push(`Mapping ${map.mappingId} references non-existent Article ID: ${map.articleId}`);
    }
  }

  return errors;
}
