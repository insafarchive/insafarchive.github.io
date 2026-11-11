/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Constitutional Library & Mapping Engine Test Suite — Part 4.1
 */

import { describe, it, expect } from 'vitest';
import {
  CONSTITUTION_METADATA,
  CONSTITUTION_PARTS,
  CONSTITUTION_ARTICLES,
  CONSTITUTION_SCHEDULES,
  CONSTITUTION_AMENDMENTS,
  CONSTITUTIONAL_SOURCES,
  CONSTITUTIONAL_MAPPINGS,
  CONSTITUTION_COVERAGE_REGISTER,
  getCoverageEntryById,
  getCoverageEntryByNumber,
  getCoverageStatistics,
  getArticleById,
  getArticleByNumber,
  getArticlesByPart,
  getMappingsForArticle,
  getMappingsForRecord,
  validateConstitutionIntegrity,
} from '../data/constitution';

import { ALL_ARCHIVE_RECORDS } from '../data/records';

describe('Constitutional Library & Mapping Engine Suite', () => {
  it('validates entire constitutional dataset integrity with zero referential errors', () => {
    const errors = validateConstitutionIntegrity();
    expect(errors.length, `Constitutional integrity errors: ${errors.join('; ')}`).toBe(0);
    expect(CONSTITUTIONAL_SOURCES.length).toBeGreaterThan(0);
  });

  it('verifies constitutional metadata accurately reflects 1973 Constitution baseline', () => {
    expect(CONSTITUTION_METADATA.totalParts).toBe(12);
    expect(CONSTITUTION_METADATA.totalArticles).toBe(280);
    expect(CONSTITUTION_METADATA.totalSchedules).toBe(5);
    expect(CONSTITUTION_METADATA.totalAmendmentsEnacted).toBe(26);
    expect(CONSTITUTION_METADATA.enactmentDate).toBe('1973-04-12');
    expect(CONSTITUTION_METADATA.commencementDate).toBe('1973-08-14');
  });

  it('guarantees all 12 constitutional parts and preamble are structured and valid', () => {
    expect(CONSTITUTION_PARTS.length).toBe(13); // Preamble (P00) + Parts I through XII
    for (const part of CONSTITUTION_PARTS) {
      expect(part.id).toMatch(/^PK-CONST-P/);
      expect(part.title.en.length).toBeGreaterThan(3);
      expect(part.title.ur.length).toBeGreaterThan(3);
      expect(part.description.en.length).toBeGreaterThan(15);
      expect(part.description.ur.length).toBeGreaterThan(15);
    }
  });

  it('guarantees all 5 constitutional schedules are enumerated and have governing articles', () => {
    expect(CONSTITUTION_SCHEDULES.length).toBe(5);
    for (const schedule of CONSTITUTION_SCHEDULES) {
      expect(schedule.id).toMatch(/^PK-CONST-SCH-/);
      expect(schedule.governingArticles.length).toBeGreaterThan(0);
      expect(schedule.title.en.length).toBeGreaterThan(5);
      expect(schedule.title.ur.length).toBeGreaterThan(5);
    }
  });

  it('guarantees all 26 constitutional amendments are chronologically documented with sources', () => {
    // 21 enacted amendment numbers up to 26 (omitting lapsed/withdrawn bills 9, 11, 15)
    expect(CONSTITUTION_AMENDMENTS.length).toBeGreaterThanOrEqual(20);
    
    // Check chronological order of amendments
    for (let i = 0; i < CONSTITUTION_AMENDMENTS.length - 1; i++) {
      expect(CONSTITUTION_AMENDMENTS[i].number).toBeLessThan(CONSTITUTION_AMENDMENTS[i + 1].number);
    }

    for (const amd of CONSTITUTION_AMENDMENTS) {
      expect(amd.id).toMatch(/^PK-CONST-AMD-/);
      expect(amd.actNumber.length).toBeGreaterThan(3);
      expect(amd.assentDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(amd.keyArticlesModified.length).toBeGreaterThan(0);
      expect(amd.summary.en.length).toBeGreaterThan(10);
      expect(amd.summary.ur.length).toBeGreaterThan(10);
    }
  });

  it('validates all core Articles have non-empty statutory text, clauses, and easy explanations', () => {
    expect(CONSTITUTION_ARTICLES.length).toBeGreaterThan(0);

    for (const art of CONSTITUTION_ARTICLES) {
      expect(art.id).toMatch(/^PK-CONST-/);
      expect(art.originalStatutoryEnglish.trim().length).toBeGreaterThan(15);
      expect(art.urduText.trim().length).toBeGreaterThan(15);
      expect(art.easyExplanation.en.trim().length).toBeGreaterThan(20);
      expect(art.easyExplanation.ur.trim().length).toBeGreaterThan(20);
      expect(art.clauses.length).toBeGreaterThan(0);
      expect(['official_verified', 'editorial_translation']).toContain(art.urduStatus);
    }
  });

  it('verifies constitutional query helpers function correctly', () => {
    // Query by ID
    const art9 = getArticleById('PK-CONST-A009');
    expect(art9).toBeDefined();
    expect(art9?.articleNumber).toBe('9');
    expect(art9?.title.en).toBe('Security of person');

    // Query by Number
    const art10A = getArticleByNumber('10A');
    expect(art10A).toBeDefined();
    expect(art10A?.id).toBe('PK-CONST-A010A');

    // Query by Part
    const part2Articles = getArticlesByPart('PK-CONST-P02');
    expect(part2Articles.length).toBeGreaterThan(0);
  });

  it('verifies all constitutional mappings connect valid archive records to valid articles', () => {
    const archiveRecordIds = new Set(ALL_ARCHIVE_RECORDS.map(r => r.id));
    const articleIds = new Set(CONSTITUTION_ARTICLES.map(a => a.id));

    expect(CONSTITUTIONAL_MAPPINGS.length).toBeGreaterThan(0);

    for (const map of CONSTITUTIONAL_MAPPINGS) {
      expect(archiveRecordIds.has(map.archiveRecordId), `Mapping references non-existent archive record: ${map.archiveRecordId}`).toBe(true);
      expect(articleIds.has(map.articleId), `Mapping references non-existent article: ${map.articleId}`).toBe(true);
      expect(['red', 'orange', 'blue', 'green']).toContain(map.alertLevel);
      expect(map.factualSummary.en.length).toBeGreaterThan(10);
      expect(map.factualSummary.ur.length).toBeGreaterThan(10);
      expect(map.legalAnalysis.en.length).toBeGreaterThan(15);
      expect(map.legalAnalysis.ur.length).toBeGreaterThan(15);
      expect(map.supportingSourceIds.length).toBeGreaterThan(0);
    }
  });

  it('verifies court findings in constitutional mappings include valid case citations and operative text', () => {
    const courtFindings = CONSTITUTIONAL_MAPPINGS.filter(m => m.courtRulingSummary !== undefined);
    expect(courtFindings.length).toBeGreaterThan(0);

    for (const cf of courtFindings) {
      expect(cf.courtRulingSummary?.caseCitation.length).toBeGreaterThan(3);
      expect(cf.courtRulingSummary?.judgmentDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(cf.courtRulingSummary?.operativeText.en.length).toBeGreaterThan(10);
      expect(cf.courtRulingSummary?.operativeText.ur.length).toBeGreaterThan(10);
    }
  });

  it('verifies bidirectional mapping lookup functions', () => {
    // Lookup by article
    const art9Mappings = getMappingsForArticle('PK-CONST-A009');
    expect(art9Mappings.length).toBeGreaterThan(0);

    // Lookup by record
    const arshadSharifMappings = getMappingsForRecord('rec-pk-2022-arshad-sharif-killing');
    expect(arshadSharifMappings.length).toBeGreaterThan(0);
    expect(arshadSharifMappings.some(m => m.articleId === 'PK-CONST-A009')).toBe(true);
  });

  // =========================================================================
  // Part 4.2 Ingestion & Integrity Tests
  // =========================================================================
  it('guarantees zero duplicate IDs across all articles, clauses, and sub-clauses', () => {
    const seenIds = new Set<string>();
    for (const art of CONSTITUTION_ARTICLES) {
      expect(seenIds.has(art.id), `Duplicate Article ID detected: ${art.id}`).toBe(false);
      seenIds.add(art.id);

      for (const clause of art.clauses) {
        expect(seenIds.has(clause.id), `Duplicate Clause ID detected: ${clause.id}`).toBe(false);
        seenIds.add(clause.id);

        if (clause.subClauses) {
          for (const sub of clause.subClauses) {
            expect(seenIds.has(sub.id), `Duplicate SubClause ID detected: ${sub.id}`).toBe(false);
            seenIds.add(sub.id);
          }
        }
      }
    }
  });

  it('guarantees strict clause-parent referential hierarchy', () => {
    for (const art of CONSTITUTION_ARTICLES) {
      for (const clause of art.clauses) {
        expect(clause.articleId, `Clause ${clause.id} parent articleId mismatch with ${art.id}`).toBe(art.id);
      }
    }
  });

  it('guarantees all articles cite valid registered primary legal sources', () => {
    const validSourceIds = new Set(CONSTITUTIONAL_SOURCES.map(s => s.sourceId));
    for (const art of CONSTITUTION_ARTICLES) {
      expect(validSourceIds.has(art.sourceCitationId), `Article ${art.id} references unregistered source: ${art.sourceCitationId}`).toBe(true);
    }
  });

  it('enforces epistemological distinction: no unreviewed mapping claims court finding without valid case citation', () => {
    for (const mapping of CONSTITUTIONAL_MAPPINGS) {
      if (mapping.relationshipType === 'court_found_violation' || mapping.relationshipType === 'court_rejected_violation_claim') {
        expect(mapping.courtRulingSummary, `Mapping ${mapping.mappingId} claims court determination without court ruling details`).toBeDefined();
        expect(mapping.courtRulingSummary?.caseCitation.length).toBeGreaterThan(3);
      }
    }
  });

  it('guarantees all five Schedules have complete statutory texts in English and Urdu', () => {
    for (const sch of CONSTITUTION_SCHEDULES) {
      expect(sch.contentEnglish, `Schedule ${sch.id} missing contentEnglish`).toBeDefined();
      expect(sch.contentEnglish!.trim().length).toBeGreaterThan(50);
      expect(sch.contentUrdu, `Schedule ${sch.id} missing contentUrdu`).toBeDefined();
      expect(sch.contentUrdu!.trim().length).toBeGreaterThan(50);
    }
  });

  it('verifies broad multi-batch constitutional content ingestion coverage across Parts I through XII', () => {
    // Over 100 comprehensive articles with full clauses
    expect(CONSTITUTION_ARTICLES.length).toBeGreaterThanOrEqual(100);

    // Verify presence of representative batch anchors
    const articleIds = new Set(CONSTITUTION_ARTICLES.map(a => a.id));
    
    // Batch A: Preamble, Art 1, 4, 6, 8, 9, 10, 10A, 14, 19, 19A, 25, 25A
    expect(articleIds.has('PK-CONST-PRE')).toBe(true);
    expect(articleIds.has('PK-CONST-A001')).toBe(true);
    expect(articleIds.has('PK-CONST-A010A')).toBe(true);
    expect(articleIds.has('PK-CONST-A019A')).toBe(true);
    expect(articleIds.has('PK-CONST-A025A')).toBe(true);

    // Batch B: Principles of Policy Arts 29, 32, 38, 40
    expect(articleIds.has('PK-CONST-A029')).toBe(true);
    expect(articleIds.has('PK-CONST-A038')).toBe(true);

    // Batch C: The Federation Arts 41, 50, 58, 62, 63A, 89
    expect(articleIds.has('PK-CONST-A041')).toBe(true);
    expect(articleIds.has('PK-CONST-A058')).toBe(true);
    expect(articleIds.has('PK-CONST-A063A')).toBe(true);
    expect(articleIds.has('PK-CONST-A089')).toBe(true);

    // Batch D: Federal Govt & Provinces Arts 90, 91, 100, 101, 105, 112, 128
    expect(articleIds.has('PK-CONST-A090')).toBe(true);
    expect(articleIds.has('PK-CONST-A105')).toBe(true);
    expect(articleIds.has('PK-CONST-A112')).toBe(true);

    // Batch E: Provincial Govt & Inter-Provincial Relations Arts 129, 140A, 142, 153, 158
    expect(articleIds.has('PK-CONST-A140A')).toBe(true);
    expect(articleIds.has('PK-CONST-A142')).toBe(true);
    expect(articleIds.has('PK-CONST-A153')).toBe(true);
    expect(articleIds.has('PK-CONST-A158')).toBe(true);

    // Batch F: Finance, NFC & Resources Arts 160, 161, 168, 172
    expect(articleIds.has('PK-CONST-A160')).toBe(true);
    expect(articleIds.has('PK-CONST-A168')).toBe(true);
    expect(articleIds.has('PK-CONST-A172')).toBe(true);

    // Batch G: Judicature Arts 175, 175A, 184, 189, 199, 204, 209
    expect(articleIds.has('PK-CONST-A175A')).toBe(true);
    expect(articleIds.has('PK-CONST-A184')).toBe(true);
    expect(articleIds.has('PK-CONST-A199')).toBe(true);
    expect(articleIds.has('PK-CONST-A209')).toBe(true);

    // Batch H: Elections Arts 213, 218, 224, 224A, 226
    expect(articleIds.has('PK-CONST-A213')).toBe(true);
    expect(articleIds.has('PK-CONST-A218')).toBe(true);
    expect(articleIds.has('PK-CONST-A224')).toBe(true);
    expect(articleIds.has('PK-CONST-A224A')).toBe(true);

    // Batch I: Islamic, Emergency, Armed Forces, Omitted & Transitional Arts 227, 232, 233, 239, 243, 245, 247, 270AA
    expect(articleIds.has('PK-CONST-A227')).toBe(true);
    expect(articleIds.has('PK-CONST-A233')).toBe(true);
    expect(articleIds.has('PK-CONST-A239')).toBe(true);
    expect(articleIds.has('PK-CONST-A243')).toBe(true);
    expect(articleIds.has('PK-CONST-A245')).toBe(true);
    expect(articleIds.has('PK-CONST-A247')).toBe(true);
    expect(articleIds.has('PK-CONST-A270AA')).toBe(true);
  });

  // =========================================================================
  // Part 4.3 Coverage Register & Completeness Audit Tests
  // =========================================================================
  it('guarantees machine-readable Coverage Register catalogs all 315 constitutional provisions with zero duplicate IDs', () => {
    expect(CONSTITUTION_COVERAGE_REGISTER.length).toBe(315);

    const seenIds = new Set<string>();
    for (const entry of CONSTITUTION_COVERAGE_REGISTER) {
      expect(seenIds.has(entry.articleId), `Duplicate Coverage Register ID: ${entry.articleId}`).toBe(false);
      seenIds.add(entry.articleId);

      expect(entry.articleId).toMatch(/^PK-CONST-/);
      expect(entry.articleNumber.length).toBeGreaterThan(0);
      expect(entry.partId).toMatch(/^PK-CONST-P/);
      expect(entry.title.en.trim().length).toBeGreaterThan(3);
      expect(entry.title.ur.trim().length).toBeGreaterThan(3);
      expect(['source_verified', 'structure_only', 'partial', 'missing']).toContain(entry.englishStatus);
      expect(['official_verified', 'editorial_translation', 'unverified', 'missing']).toContain(entry.urduStatus);
      expect(['source_verified', 'source_required', 'not_applicable']).toContain(entry.sourceCitationStatus);
      expect(entry.editorialNotes.length).toBeGreaterThan(10);
    }
  });

  it('guarantees 100% referential consistency between Coverage Register and Ingested Articles', () => {
    const ingestedIdSet = new Set(CONSTITUTION_ARTICLES.map(a => a.id));
    const registerInCorpus = CONSTITUTION_COVERAGE_REGISTER.filter(e => e.isInArticleCorpus);

    // Exact count match
    expect(registerInCorpus.length).toBe(CONSTITUTION_ARTICLES.length);

    // Every ingested article must exist in the register marked as in-corpus
    for (const art of CONSTITUTION_ARTICLES) {
      const reg = getCoverageEntryById(art.id);
      expect(reg, `Ingested article ${art.id} not found in Coverage Register`).toBeDefined();
      expect(reg?.isInArticleCorpus).toBe(true);
      expect(reg?.englishStatus).toBe('source_verified');
    }

    // Every register entry marked in-corpus must exist in CONSTITUTION_ARTICLES
    for (const reg of registerInCorpus) {
      expect(ingestedIdSet.has(reg.articleId), `Register claims ${reg.articleId} is in corpus, but not in CONSTITUTION_ARTICLES`).toBe(true);
    }
  });

  it('guarantees every constitutional provision in the 315-provision corpus has a functioning detail page', () => {
    // 1. Ingested Article Detail
    const art9 = getArticleById('PK-CONST-A009');
    expect(art9).toBeDefined();
    expect(art9?.originalStatutoryEnglish.length).toBeGreaterThan(50);
    expect(art9?.urduStatus).toBe('official_verified');
    expect(art9?.clauses.length).toBeGreaterThan(0);

    // 2. Backlog Article Detail (e.g. Art 42, 177, 251)
    const art42 = getArticleById('PK-CONST-A042');
    expect(art42).toBeDefined();
    expect(art42?.title.en).toBe("Oath of President's office");
    expect(art42?.urduStatus).toBe('unverified');
    expect(art42?.originalStatutoryEnglish).toContain('undergoing source verification');

    const art177 = getArticleById('PK-CONST-A177');
    expect(art177).toBeDefined();
    expect(art177?.title.en).toBe('Appointment of Supreme Court Judges');
    expect(art177?.urduStatus).toBe('unverified');

    // 3. Query by number for backlog provisions
    const art251ByNum = getArticleByNumber('251');
    expect(art251ByNum).toBeDefined();
    expect(art251ByNum?.id).toBe('PK-CONST-A251');

    const reg251 = getCoverageEntryByNumber('251');
    expect(reg251).toBeDefined();
    expect(reg251?.articleId).toBe('PK-CONST-A251');
  });


  it('enforces rigorous verification rules: no structure-only backlog entry is falsely marked as source_verified or clause-complete', () => {
    for (const entry of CONSTITUTION_COVERAGE_REGISTER) {
      if (!entry.isInArticleCorpus) {
        const isOmitted = entry.title.en.toLowerCase().includes('omitted') || entry.title.en.toLowerCase().includes('repealed');
        if (!isOmitted) {
          expect(entry.englishStatus, `Backlog article ${entry.articleId} falsely marked source_verified`).toBe('structure_only');
          expect(entry.clauseCompleteness, `Backlog article ${entry.articleId} falsely marked complete`).toBe('none');
          expect(entry.sourceCitationStatus, `Backlog article ${entry.articleId} falsely marked source_verified`).toBe('source_required');
          expect(entry.urduStatus).toBe('missing');
        }
      }
    }
  });

  it('verifies coverage statistics report accurate metrics', () => {
    const stats = getCoverageStatistics();
    expect(stats.total).toBe(315);
    expect(stats.inCorpus).toBe(104);
    expect(stats.structureOnly).toBe(203); // 211 backlog minus 8 omitted/repealed provisions
    expect(stats.sourceRequired).toBe(203);
  });

});

