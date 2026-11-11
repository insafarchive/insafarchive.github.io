/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Universal Schema Definitions — Version 1.0.0
 */

export type ArchiveDomain =
  | 'legal'
  | 'human_rights'
  | 'journalism_media'
  | 'political_constitutional'
  | 'historical'
  | 'economic_public_policy'
  | 'people_institutions'
  | 'evidence_media';

export type RecordType =
  // Legal Domain
  | 'court_case'
  | 'court_judgment'
  | 'court_order'
  | 'petition'
  | 'constitutional_petition'
  | 'fir_criminal_proceeding'
  | 'bail_proceeding'
  | 'appeal'
  | 'review'
  | 'suo_motu_proceeding'
  | 'legal_document'
  // Human Rights Domain
  | 'human_rights_incident'
  | 'arrest'
  | 'detention'
  | 'disappearance'
  | 'torture_allegation'
  | 'extrajudicial_killing_allegation'
  | 'religious_minority_incident'
  | 'freedom_of_expression_incident'
  | 'freedom_of_press_incident'
  | 'blasphemy_case_record'
  // Journalism & Media Domain
  | 'journalist_profile'
  | 'journalist_killing'
  | 'journalist_attack'
  | 'journalist_threat'
  | 'journalist_detention'
  | 'media_suppression_incident'
  | 'investigative_report'
  | 'interview_record'
  | 'documentary_record'
  | 'news_investigation'
  // Political & Constitutional Domain
  | 'political_event'
  | 'constitutional_event'
  | 'constitutional_crisis'
  | 'government_decision'
  | 'parliamentary_event'
  | 'election_event'
  | 'change_of_government'
  | 'transfer_of_power'
  | 'military_takeover'
  | 'martial_law_emergency'
  | 'constitutional_amendment'
  // Historical Domain
  | 'historical_event'
  | 'historical_period'
  | 'conflict_event'
  | 'separation_territorial_event'
  | 'state_formation_event'
  | 'major_national_event'
  // Economic & Public Policy Domain
  | 'public_policy'
  | 'economic_policy'
  | 'energy_policy'
  | 'ipp_record'
  | 'tariff_determination'
  | 'subsidy_record'
  | 'circular_debt_record'
  | 'privatization_record'
  | 'soe_institutional_record'
  | 'infrastructure_project'
  // People & Institutions Domain
  | 'person_profile'
  | 'institution_profile'
  | 'government_department'
  | 'political_organization'
  | 'state_institution'
  | 'corporate_entity'
  | 'civil_society_org'
  | 'international_organization'
  // Evidence & Media Domain
  | 'court_document'
  | 'government_document'
  | 'parliamentary_record'
  | 'commission_report'
  | 'audit_report'
  | 'photograph_record'
  | 'video_record'
  | 'audio_record'
  | 'archival_document'
  | 'dataset_record';

export type EditorialStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'changes_requested'
  | 'revision_requested'
  | 'approved'
  | 'published'
  | 'rejected'
  | 'archived'
  | 'withdrawn';

export type EditorialAction =
  | 'submit_for_review'
  | 'request_revision'
  | 'approve'
  | 'publish'
  | 'withdraw'
  | 'correct';

export interface EditorialAuditTrailEntry {
  auditId: string;
  recordId: string;
  previousStatus: EditorialStatus;
  newStatus: EditorialStatus;
  action: EditorialAction;
  reviewerNote: string;
  changeSummary: string;
  timestamp: string; // ISO 8601
  gitReference?: string; // Commit SHA, PR #, or Issue #
}

export type PrivacyClassification =
  | 'public'
  | 'public_sensitive'
  | 'restricted_editorial'
  | 'do_not_publish';

export type VerificationStatus =
  | 'verified'
  | 'corroborated'
  | 'under_investigation'
  | 'disputed'
  | 'unverified';

export type SourceVerificationStatus =
  | 'unverified'
  | 'source_located'
  | 'source_reviewed'
  | 'independently_verified'
  | 'primary_source'
  | 'archived_copy_available'
  | 'broken_link'
  | 'access_restricted';

export type EvidentiaryFindingType =
  | 'documented_fact'
  | 'primary_source_record'
  | 'official_position'
  | 'claim'
  | 'allegation'
  | 'counter_claim'
  | 'denial'
  | 'investigative_finding'
  | 'audit_finding'
  | 'commission_finding'
  | 'police_finding'
  | 'court_finding'
  | 'appellate_court_finding'
  | 'academic_research_finding'
  | 'editorial_note'
  | 'unresolved_question';

export type SourceType =
  | 'supreme_court_record'
  | 'high_court_record'
  | 'government_document'
  | 'gazette'
  | 'parliamentary_record'
  | 'commission_report'
  | 'audit_report'
  | 'police_record'
  | 'fir'
  | 'court_judgment'
  | 'court_order'
  | 'official_statistics'
  | 'academic_research'
  | 'international_organization'
  | 'human_rights_org'
  | 'reputable_journalism'
  | 'interview'
  | 'video'
  | 'photograph'
  | 'social_media'
  | 'archival_material'
  | 'other';

export type RelationshipPredicate =
  | 'relatedTo'
  | 'causedBy'
  | 'followedBy'
  | 'precededBy'
  | 'partOf'
  | 'memberOf'
  | 'involvesPerson'
  | 'involvesInstitution'
  | 'documentedBy'
  | 'reportedBy'
  | 'investigatedBy'
  | 'challengedBy'
  | 'respondedTo'
  | 'contradicts'
  | 'confirms'
  | 'cites'
  | 'sourceFor'
  | 'subjectOf'
  | 'resultedIn'
  | 'appealedAs'
  | 'supersedes'
  | 'successorOf'
  | 'predecessorOf';

export interface BilingualText {
  en: string;
  ur: string;
}

export interface ArchiveDate {
  dateString: string; // ISO-8601 (YYYY-MM-DD, YYYY-MM, or YYYY)
  precision: 'exact_time' | 'day' | 'month' | 'year' | 'decade' | 'approximate';
  formattedDisplay: BilingualText;
  era?: 'CE' | 'BCE';
}

export interface RecordDates {
  eventDate?: ArchiveDate;
  startDate?: ArchiveDate;
  endDate?: ArchiveDate;
  publicationDate?: ArchiveDate;
  documentDate?: ArchiveDate;
  filingDate?: ArchiveDate;
  judgmentDate?: ArchiveDate;
  arrestDate?: ArchiveDate;
  releaseDate?: ArchiveDate;
  deathDate?: ArchiveDate;
  dateAdded?: string;
  dateUpdated?: string;
}

export interface ArchiveLocation {
  city?: BilingualText;
  district?: BilingualText;
  provinceState?: BilingualText;
  country: BilingualText;
  specificVenue?: BilingualText;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type SourceAvailability =
  | 'accessible'
  | 'archived_copy_available'
  | 'unavailable'
  | 'broken_link'
  | 'not_checked';

export type AuthenticityStatus =
  | 'official_document'
  | 'publisher_verified'
  | 'corroborated'
  | 'unverified'
  | 'disputed';

export interface SourceCitation {
  sourceId: string;
  sourceType: SourceType;
  title: BilingualText;
  publisher?: BilingualText;
  publisherOrIssuingAuthority?: BilingualText | string;
  authorOrCreator?: BilingualText;
  publicationDate?: ArchiveDate;
  judgmentDate?: ArchiveDate | string;
  originalUrl?: string; // Optional - physical court files supported without fake URLs
  officialUrl?: string;
  archiveUrl?: string;
  archivedUrl?: string;
  localDocumentPath?: string;
  documentIdentifier?: string; // e.g. "PLD 2023 SC 101", "FIR No. 492/22"
  pageOrParagraph?: string;
  pageNumber?: string | number;
  paragraphNumber?: string | number;
  quotedOrSummarizedPassage?: BilingualText | string;
  supportsClaim?: string[];
  limitations?: BilingualText | string;
  mediaTimestamp?: string;
  language: 'en' | 'ur' | 'both' | 'other';
  verificationStatus: SourceVerificationStatus;
  verificationTier?: 'primary_verified' | 'secondary_corroborated' | 'single_source' | 'unverified';
  sourceAvailability?: SourceAvailability;
  authenticityStatus?: AuthenticityStatus;
  accessDate?: string;
  copyrightNotice?: string;
  notes?: BilingualText;
  reviewerNotes?: string;
}

export interface EvidentiaryClaim {
  claimId: string;
  findingType: EvidentiaryFindingType;
  assertion: BilingualText;
  attributedParty?: BilingualText;
  date?: ArchiveDate;
  sourceIds: string[]; // references to SourceCitation.sourceId (mandatory)
  relatedRecordId?: string;
  corroboratingSourceIds?: string[];
  disputingClaimIds?: string[];
  editorialAssessment?: BilingualText;
}

export interface RecordRelationship {
  relationshipId: string;
  targetRecordId: string;
  predicate: RelationshipPredicate;
  description?: BilingualText;
  weight?: number;
}

export interface EvidenceMediaItem {
  mediaId: string;
  mediaType: 'document_pdf' | 'photograph' | 'video' | 'audio' | 'dataset' | 'transcript';
  title: BilingualText;
  caption?: BilingualText;
  fileUrl: string;
  thumbnailUrl?: string;
  fileSize?: number;
  mimeType: string;
  sha256Checksum?: string;
  sourceId?: string;
  privacy: PrivacyClassification;
}

export interface PrivacyFlags {
  isMinor?: boolean;
  isProtectedWitness?: boolean;
  isSensitivePersonalData?: boolean;
  containsConfidentialPrivilege?: boolean;
  identityUnverified?: boolean;
}

export interface FinancialMetric {
  amount: number;
  currency: 'PKR' | 'USD' | 'EUR' | 'GBP';
  isNominal: boolean;
  fiscalYear?: string;
  paymentCategory:
    | 'capacity_payment'
    | 'energy_payment'
    | 'tariff_adjustment'
    | 'subsidy'
    | 'arrears'
    | 'government_guarantee'
    | 'circular_debt'
    | 'disputed_amount'
    | 'audited_amount'
    | 'estimated_amount';
  sourceId?: string;
  documentPage?: string;
  methodologyNotes?: BilingualText;
}

export interface CorporateOwnership {
  shareholderName: BilingualText;
  ownershipPercentage?: number;
  effectiveDate?: ArchiveDate;
  sourceId?: string;
}

export interface DomainMetadata {
  legal?: {
    caseNumber?: string;
    courtName?: BilingualText;
    bench?: BilingualText[];
    petitioners?: BilingualText[];
    respondents?: BilingualText[];
    statutesCited?: string[];
    disposition?: BilingualText;
  };
  economicIpp?: {
    capacityMw?: number;
    fuelType?: BilingualText;
    tariffModel?: BilingualText;
    commercialOperationDate?: string;
    nepraReference?: string;
    ownership?: CorporateOwnership[];
    financialMetrics?: FinancialMetric[];
    capacityPaymentsDocumented?: Record<string, number>;
  };
  journalistMedia?: {
    organizationAffiliation?: BilingualText[];
    medium?: string[];
    investigationFocus?: BilingualText[];
    threatLevelReported?: string;
    suspectedPerpetratorStatus?: 'unidentified' | 'suspected' | 'charged' | 'convicted' | 'acquitted';
  };
  humanRights?: {
    allegedViolations?: BilingualText[];
    stateBodiesNamed?: BilingualText[];
    custodyStatus?: BilingualText;
    isProvenMisuse?: boolean;
  };
  constitutional?: {
    articlesImpacted?: string[];
    governingEra?: BilingualText;
    regimeType?: 'parliamentary_democracy' | 'military_rule' | 'caretaker' | 'presidential';
  };
  institution?: {
    foundingYear?: number;
    headquarters?: BilingualText;
    jurisdiction?: BilingualText;
    sector?: BilingualText;
  };
}

/**
 * Reusable Person Profile Entity
 */
export interface PersonProfile {
  id: string; // e.g. "IA-PER-0001" or "per-arshad-sharif"
  name: BilingualText;
  aliases?: BilingualText[];
  publicRoles: BilingualText[];
  organizations: BilingualText[];
  biography: BilingualText;
  birthDate?: ArchiveDate;
  deathDate?: ArchiveDate;
  relatedRecordIds: string[];
  sourceIds: string[];
  privacyClassification: PrivacyClassification;
}

/**
 * Reusable Institution Profile Entity
 */
export interface InstitutionProfile {
  id: string; // e.g. "IA-INS-0001" or "ins-supreme-court-pk"
  name: BilingualText;
  aliases?: BilingualText[];
  institutionType:
    | 'apex_court'
    | 'high_court'
    | 'tribunal'
    | 'ministry'
    | 'regulator'
    | 'state_owned_enterprise'
    | 'military_body'
    | 'media_house'
    | 'civil_society';
  establishmentDate?: ArchiveDate;
  dissolutionDate?: ArchiveDate;
  parentInstitutionId?: string;
  predecessorIds?: string[];
  successorIds?: string[];
  officialWebsite?: string;
  relatedRecordIds: string[];
  sourceIds: string[];
  privacyClassification: PrivacyClassification;
}

/**
 * Master ArchiveRecord Specification — Version 1.0.0
 */
export interface ArchiveRecord {
  schemaVersion: '1.0.0';
  id: string; // Unique stable identifier (e.g. "rec-pk-2022-arshad-sharif-killing" or "IA-AR-000001")
  slug: string;
  domain: ArchiveDomain;
  recordType: RecordType;
  
  title: BilingualText;
  summary: BilingualText;
  narrative: BilingualText; // Markdown formatted
  
  date: ArchiveDate;
  endDate?: ArchiveDate;
  dates?: RecordDates;
  location?: ArchiveLocation;
  
  claims: EvidentiaryClaim[];
  sources: SourceCitation[];
  evidenceMedia: EvidenceMediaItem[];
  relationships: RecordRelationship[];
  
  categories: string[];
  tags: {
    en: string[];
    ur: string[];
  };
  
  domainMetadata?: DomainMetadata;
  
  verificationStatus: VerificationStatus;
  editorialStatus: EditorialStatus;
  privacyClassification: PrivacyClassification;
  privacyFlags: PrivacyFlags;
  
  version: number;
  previousVersionId?: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  publishedAt?: string;
  lastReviewedAt?: string;
  reviewedBy?: string;
  editorialNotes?: string;
}

/**
 * Filter & Search Query Options
 */
export interface ArchiveSearchFilter {
  query?: string;
  domain?: ArchiveDomain | 'all';
  recordType?: RecordType | 'all';
  findingType?: EvidentiaryFindingType | 'all';
  verificationStatus?: VerificationStatus | 'all';
  yearFrom?: number;
  yearTo?: number;
  location?: string;
  tag?: string;
  sourceType?: SourceType | 'all';
}
