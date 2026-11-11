/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Constitutional Schema Definitions — Version 1.0.0
 * The Constitution of the Islamic Republic of Pakistan (1973)
 */

import type { BilingualText } from './archive';

export type ConstitutionalStatus = 'active' | 'repealed' | 'omitted' | 'substituted';

export type UrduVerificationStatus = 'official_verified' | 'editorial_translation' | 'unverified';

export type ConstitutionalRelationshipType =
  | 'potential_constitutional_concern'
  | 'constitutional_question'
  | 'alleged_violation'
  | 'officially_disputed'
  | 'court_examined'
  | 'court_found_violation'
  | 'court_rejected_violation_claim'
  | 'constitutional_compliance'
  | 'historical_constitutional_context'
  | 'mentions'
  | 'contextual_relation'
  | 'court_considered'
  | 'court_applied'
  | 'court_interpreted';

export type ConstitutionalAlertLevel = 'red' | 'orange' | 'blue' | 'green';

export type ConstitutionalReviewStatus = 'suggested' | 'under_review' | 'approved' | 'rejected';

export type CoverageTextStatus =
  | 'missing'
  | 'structure_only'
  | 'partial'
  | 'text_added_unverified'
  | 'source_verified'
  | 'editorially_reviewed';

export type CoverageUrduStatus =
  | 'missing'
  | 'structure_only'
  | 'partial'
  | 'unverified'
  | 'editorial_translation'
  | 'official_verified';

export type CoverageClauseStatus =
  | 'complete'
  | 'partial'
  | 'unparsed'
  | 'none';

/**
 * Machine-readable Article Coverage Register Item
 */
export interface ConstitutionalArticleCoverageEntry {
  articleId: string; // e.g. "PK-CONST-A009"
  articleNumber: string; // e.g. "9", "Preamble", "10A"
  partId: string;
  chapterId?: string;
  title: BilingualText;
  englishStatus: CoverageTextStatus;
  urduStatus: CoverageUrduStatus;
  clauseCompleteness: CoverageClauseStatus;
  sourceCitationStatus: 'source_verified' | 'source_required' | 'not_applicable';
  verificationStatus: CoverageTextStatus;
  historicalVersionStatus: 'verified' | 'unverified' | 'none';
  lastReviewedDate: string; // YYYY-MM-DD
  editorialNotes: string;
  isInArticleCorpus: boolean;
}


/**
 * Precedent reference linking to landmark Supreme Court interpretations
 */
export interface LandmarkPrecedentRef {
  citation: string; // e.g. "PLD 2019 SC 64" or "PLD 1988 SC 416"
  caseName: BilingualText;
  judgmentDate: string; // YYYY-MM-DD
  benchSummary?: BilingualText;
  principleEstablished: BilingualText;
  courtName: BilingualText;
  primarySourceUrl?: string;
}

/**
 * Sub-clause entity (e.g. (a), (b), (c))
 */
export interface ConstitutionalSubClause {
  id: string; // e.g. "PK-CONST-A010-C01-SC-A"
  subClauseIdentifier: string; // e.g. "(a)", "(b)"
  text: BilingualText;
}

/**
 * Clause entity (e.g. (1), (2), (3))
 */
export interface ConstitutionalClause {
  id: string; // e.g. "PK-CONST-A010-C01"
  articleId: string;
  clauseNumber: string; // e.g. "(1)", "(2)"
  text: BilingualText;
  subClauses?: ConstitutionalSubClause[];
  provisos?: BilingualText[];
  explanations?: BilingualText[];
}

/**
 * Amendment record for an individual Article
 */
export interface ArticleAmendmentRecord {
  amendmentId: string; // e.g. "PK-CONST-AMD-18"
  amendmentNumber: number; // e.g. 18
  actTitle: BilingualText;
  year: number;
  effectiveDate: string; // ISO-8601
  summaryOfChange: BilingualText;
  typeOfChange: 'inserted' | 'substituted' | 'amended' | 'omitted' | 'repealed';
  previousWording?: string;
  newWording?: string;
}

/**
 * Historical text version before a specific amendment
 */
export interface HistoricalArticleVersion {
  versionId: string;
  validFrom: string; // ISO-8601
  validUntil: string; // ISO-8601
  amendedBy: string; // Amendment ID
  statutoryEnglish: string;
  urduText?: string;
  notes?: string;
}

/**
 * Master Constitutional Article Entity
 */
export interface ConstitutionalArticle {
  id: string; // Permanent stable ID (e.g. "PK-CONST-A009", "PK-CONST-PRE")
  articleNumber: string; // e.g. "Preamble", "1", "9", "10A", "184"
  partId: string; // Reference to ConstitutionalPart.id
  chapterId?: string; // Reference to ConstitutionalChapter.id
  
  title: BilingualText; // Official heading
  originalStatutoryEnglish: string; // Verbatim legal text as currently consolidated
  urduText: string; // Statutory or verified translation
  urduStatus: UrduVerificationStatus; // 'official_verified' vs 'editorial_translation'
  
  clauses: ConstitutionalClause[];
  provisos?: BilingualText[];
  explanations?: BilingualText[];
  
  easyExplanation: BilingualText; // Educational plain-language summary (marked non-statutory)
  landmarkPrecedents: LandmarkPrecedentRef[];
  amendmentHistory: ArticleAmendmentRecord[];
  historicalVersions?: HistoricalArticleVersion[];
  
  relatedArticleIds: string[]; // Cross-references
  thematicCategories: string[]; // e.g. ["Fundamental Rights", "Liberty", "Due Process"]
  
  sourceCitationId: string; // Reference to Source Register
  status: ConstitutionalStatus;
  editorialNotes?: string;
  lastReviewedAt: string; // ISO-8601
}

/**
 * Chapter inside a Constitutional Part
 */
export interface ConstitutionalChapter {
  id: string; // e.g. "PK-CONST-P02-CH01"
  partId: string;
  chapterNumber: string; // e.g. "1", "2"
  title: BilingualText;
  articleRange: {
    start: string;
    end: string;
  };
  description?: BilingualText;
}

/**
 * One of the 12 Parts of the Constitution
 */
export interface ConstitutionalPart {
  id: string; // e.g. "PK-CONST-P01"
  partNumber: string; // Roman numeral e.g. "I", "II", "VII"
  title: BilingualText;
  articleRange: {
    start: string;
    end: string;
  };
  description: BilingualText;
  chapters?: ConstitutionalChapter[];
}

/**
 * One of the 5 Schedules
 */
export interface ConstitutionalSchedule {
  id: string; // e.g. "PK-CONST-SCH-01"
  scheduleNumber: string; // "First", "Second", "Third", "Fourth", "Fifth"
  title: BilingualText;
  governingArticles: string[]; // e.g. ["PK-CONST-A008", "PK-CONST-A042"]
  summary: BilingualText;
  contentEnglish?: string;
  contentUrdu?: string;
}

/**
 * Constitutional Amendment Act (1st to 26th)
 */
export interface ConstitutionalAmendment {
  id: string; // e.g. "PK-CONST-AMD-18"
  number: number; // 1 to 26
  title: BilingualText;
  actNumber: string; // e.g. "Act X of 2010"
  assentDate: string; // ISO-8601
  commencementDate: string; // ISO-8601
  summary: BilingualText;
  keyArticlesModified: string[]; // e.g. ["PK-CONST-A010A", "PK-CONST-A019A", "PK-CONST-A025A"]
  sourceId: string;
}

/**
 * Bidirectional Mapping Entry connecting an Archive Record to a Constitutional Article
 */
export interface ConstitutionalMappingEntry {
  mappingId: string; // e.g. "PK-CMAP-AS-KILLING-A009"
  archiveRecordId: string; // e.g. "rec-pk-2022-arshad-sharif-killing"
  articleId: string; // e.g. "PK-CONST-A009"
  clauseId?: string; // Optional specific clause (e.g. "PK-CONST-A010-C01")
  
  relationshipType: ConstitutionalRelationshipType;
  alertLevel: ConstitutionalAlertLevel;
  
  factualSummary: BilingualText; // Specific factual issue engaging this Article
  legalAnalysis: BilingualText; // Epistemological justification
  
  courtRulingSummary?: {
    courtName: BilingualText;
    caseCitation: string;
    judgmentDate: string;
    findingOutcome: 'violation_found' | 'claim_rejected' | 'guidelines_issued' | 'pending';
    operativeText: BilingualText;
  };
  
  supportingClaimIds: string[]; // references EvidentiaryClaim.claimId in ArchiveRecord
  supportingSourceIds: string[]; // references SourceCitation.sourceId
  
  applicablePeriod?: {
    startDate?: string;
    endDate?: string;
    historicalEra?: string;
  };
  
  reviewStatus: ConstitutionalReviewStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  editorialNotes?: string;
}

/**
 * Metadata record for the Constitutional Library
 */
export interface ConstitutionalMetadata {
  officialTitle: BilingualText;
  enactmentDate: string;
  commencementDate: string;
  totalParts: number;
  totalArticles: number;
  totalSchedules: number;
  totalAmendmentsEnacted: number;
  latestAmendmentEnacted: string;
  primaryCustodian: BilingualText;
  lastUpdated: string;
}
