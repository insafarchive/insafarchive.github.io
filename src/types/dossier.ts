/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Archival Dossier Schema — Version 1.0.0
 * Implements the 13-Point Dossier Standard
 */

import type {
  BilingualText,
  SourceCitation,
  EvidentiaryClaim,
  EvidenceMediaItem,
  EditorialStatus,
  VerificationStatus,
} from './archive';

export type DossierDomain =
  | 'constitutional_legal'
  | 'major_public_events'
  | 'journalism_press_freedom'
  | 'historical_institutional'
  | 'energy_public_finance'
  | 'due_process_rights';

export interface DossierActor {
  actorId: string;
  name: BilingualText;
  roleType:
    | 'institution'
    | 'judicial_body'
    | 'public_official'
    | 'political_party'
    | 'journalist'
    | 'law_enforcement'
    | 'civilian'
    | 'corporate_entity';
  neutralDescription: BilingualText;
  officialDesignation?: BilingualText;
}

export interface DossierChronologyItem {
  date: string; // ISO format: YYYY-MM-DD or YYYY-MM
  dateDisplay: BilingualText;
  title: BilingualText;
  description: BilingualText;
  sourceIds: string[]; // references to sources
  location?: BilingualText;
}

export interface OfficialPosition {
  positionId: string;
  institutionOrParty: BilingualText;
  statementDate?: string;
  summary: BilingualText;
  sourceId: string;
  isDenialOrDefense?: boolean;
}

export interface CourtFindingItem {
  findingId: string;
  courtName: BilingualText;
  caseCitation: string;
  orderDate: string;
  benchMembers?: BilingualText[];
  rulingSummary: BilingualText;
  operativeQuotations?: BilingualText;
  sourceId: string;
}

export interface DossierPrivacyReview {
  hasSensitivePersonalData: boolean;
  piiRedacted: boolean;
  allegationsDistinguishedFromFindings: boolean;
  officialDenialsIncluded: boolean;
  riskAssessment: 'low' | 'medium' | 'high_scrutiny';
  lastReviewedDate: string;
  reviewerNotes?: string;
}

/**
 * 13-Point Archival Dossier Specification
 */
export interface ArchivalDossier {
  // 1. Identity & Routing
  id: string; // e.g. "dos-pk-legal-military-courts-2023"
  slug: string;
  domain: DossierDomain;
  title: BilingualText;
  
  // 2. Overview & Scope (Point 1 & 2)
  overview: BilingualText;
  scopeAndTerminology: BilingualText;
  
  // 3. Chronology (Point 3)
  chronology: DossierChronologyItem[];
  
  // 4. Key Actors & Institutions (Point 4)
  keyActors: DossierActor[];
  
  // 5. Claim-by-Claim Evidence Table (Point 5)
  claims: EvidentiaryClaim[];
  
  // 6. Official Positions & Responses (Point 6)
  officialPositions: OfficialPosition[];
  
  // 7. Court Proceedings & Findings (Point 7)
  courtFindings?: CourtFindingItem[];
  
  // 8. Media & Document Archive (Point 8)
  mediaArchive: EvidenceMediaItem[];
  
  // 9. Related Constitutional Provisions (Point 9)
  constitutionalProvisions: string[]; // e.g. ["PK-CONST-A009", "PK-CONST-A010A"]
  
  // 10. Related Records (Point 10)
  relatedRecordIds: string[]; // references to ArchiveRecord IDs
  
  // 11. Unresolved Questions & Known Limitations (Point 11)
  unresolvedQuestions: BilingualText[];
  
  // 12. Sources & Verification Notes (Point 12)
  sources: SourceCitation[];
  
  // 13. Editorial & Verification Status (Point 13)
  editorialStatus: EditorialStatus;
  verificationStatus: VerificationStatus;
  privacyReview: DossierPrivacyReview;

  // 14. Legal Proceeding Status & Disclosure (Part 5.3)
  legalProceedingStatus?: LegalProceedingStatus;
  hasActiveReportingBan?: boolean;
  pendingProceedingsNotice?: BilingualText;
  lastLegalStatusChecked?: string; // Date (YYYY-MM-DD)
  
  // UI Display & Navigation
  featuredRecordId: string;
  recordCount: number;
  iconName: string;
  tagColor: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export type LegalProceedingStatus =
  | 'ongoing'
  | 'pending_appeal'
  | 'stayed'
  | 'concluded'
  | 'under_investigation'
  | 'unresolved'
  | 'unknown';

export type ClaimClassification =
  | 'documented_fact'
  | 'official_position'
  | 'judicial_finding'
  | 'commission_finding'
  | 'reported_allegation'
  | 'contested_claim'
  | 'editorial_analysis'
  | 'unresolved_question';

export type ClaimVerificationState =
  | 'primary_source_supported'
  | 'multiple_sources_corroborated'
  | 'secondary_source_only'
  | 'partially_supported'
  | 'contradicted'
  | 'source_unavailable'
  | 'requires_human_review';

export type ClaimAuditStatus =
  | 'supported_by_primary_source'
  | 'supported_by_secondary_source'
  | 'partially_supported'
  | 'source_unavailable'
  | 'citation_missing'
  | 'requires_legal_review';

export type LegalDecisionType =
  | 'interim_order'
  | 'final_judgment'
  | 'majority_opinion'
  | 'dissenting_opinion'
  | 'procedural_direction'
  | 'observations'
  | 'binding_holding'
  | 'allegation_recorded_by_court'
  | 'finding_actually_made';

export interface ClaimSourceAuditEntry {
  claimId: string;
  dossierId: string;
  exactStatement?: BilingualText; // Part 5.3 exact statement
  claimText: BilingualText; // backward-compatible alias
  claimClassification: ClaimClassification | string;
  supportingSourceIds: string[];
  contradictoryOrQualifyingSourceIds?: string[]; // Part 5.3 disclosure of contradictory/qualifying evidence
  sourceType: string;
  publisher: string;
  publisherOrIssuingAuthority?: string;
  sourceTitle?: string;
  exactReference: string;
  officialUrlOrPath?: string;
  officialUrl?: string;
  archivedUrl?: string;
  localDocumentPath?: string;
  publicationOrJudgmentDate?: string;
  publicationDate?: string;
  judgmentDate?: string;
  pageParagraphOrSection?: string;
  pageNumber?: string | number;
  paragraphNumber?: string | number;
  quotedOrSummarizedPassage?: string;
  accessOrCaptureDate?: string;
  accessDate?: string;
  supportsClaim?: string[];
  limitations?: string;
  whatEvidenceEstablishes?: string; // Part 5.3 exact field
  whatSourceSupports: string; // backward-compatible alias
  whatEvidenceDoesNotEstablish?: string; // Part 5.3 exact field
  whatSourceDoesNotEstablish?: string; // backward-compatible alias
  tier: 'primary' | 'secondary' | 'commentary';
  verificationStatus?: ClaimVerificationState; // Part 5.3 exact field
  auditStatus: ClaimAuditStatus; // backward-compatible alias
  reviewerNotes: string;
  lastReviewDate?: string; // Part 5.3 review date
  lastLegalStatusChecked?: string; // Date (YYYY-MM-DD) when legal status was last verified
  legalUpdateSensitivity?: 'high_pending_appeal' | 'medium_active_trials' | 'low_settled_precedent' | 'not_applicable';
  sourceAvailability?: 'accessible' | 'archived_copy_available' | 'unavailable' | 'broken_link' | 'not_checked';
  authenticityStatus?: 'official_document' | 'publisher_verified' | 'corroborated' | 'unverified' | 'disputed';
}

export interface LegalCitationAuditEntry {
  citationId: string;
  dossierId: string;
  caseTitle: string;
  court: string;
  caseNumber: string;
  judgmentDate: string;
  reportCitation?: string;
  decisionType: LegalDecisionType;
  proceduralStatus: string;
  actualHoldingCited: string;
  verifiedAgainstJudgmentText: boolean;
  inspectionType?: 'inspected' | 'catalogued';
  legalReviewStatus: 'verified_holding' | 'requires_legal_review' | 'stayed_on_appeal';
  reviewerNotes: string;
  lastLegalStatusChecked?: string; // Date (YYYY-MM-DD)
}
