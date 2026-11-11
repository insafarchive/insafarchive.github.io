export type Language = 'en' | 'ur';

export type ProceduralStatus =
  | 'reported'
  | 'under_investigation'
  | 'pending_trial'
  | 'bail_granted'
  | 'acquitted'
  | 'convicted'
  | 'dismissed'
  | 'appealed'
  | 'disposed_of'
  | 'unknown';

export type ArchiveCategory =
  | 'court_judgments'
  | 'criminal_proceedings'
  | 'civil_litigation'
  | 'bail_acquittal'
  | 'arrest_detention'
  | 'alleged_police_misconduct'
  | 'human_rights'
  | 'missing_persons'
  | 'labour_poverty'
  | 'women_children'
  | 'public_interest_political'
  | 'video_evidence';

export type CourtLevel =
  | 'supreme_court'
  | 'high_court'
  | 'district_sessions'
  | 'special_tribunal'
  | 'magistrate_court'
  | 'unknown';

export type Province =
  | 'punjab'
  | 'sindh'
  | 'khyber_pakhtunkhwa'
  | 'balochistan'
  | 'islamabad_ict'
  | 'gilgit_baltistan'
  | 'azad_kashmir'
  | 'federal'
  | 'unknown';

export type RecordType =
  | 'court_case'
  | 'judgment'
  | 'incident_report'
  | 'custodial_inquiry'
  | 'public_interest';

export type EditorialReviewStatus =
  | 'verified_official_record'
  | 'corroborated_reporting'
  | 'preliminary_documentation'
  | 'under_editorial_review';

export type EvidentiaryNature =
  | 'allegation'
  | 'party_statement'
  | 'official_record'
  | 'court_finding';

export type MediaType =
  | 'youtube_video'
  | 'document'
  | 'image'
  | 'audio'
  | 'external_source';

export type CertifiedCopyStatus =
  | 'certified_official'
  | 'official_public_link'
  | 'secondary_reproduction'
  | 'unverified_submission';

export interface LocalizedString {
  en: string;
  ur: string;
}

export interface Party {
  id: string;
  name: LocalizedString;
  role:
    | 'petitioner'
    | 'appellant'
    | 'respondent'
    | 'accused'
    | 'complainant'
    | 'state'
    | 'victim'
    | 'witness'
    | 'amicus_curiae';
  isProtectedOrMinor?: boolean;
  redacted?: boolean;
  notes?: LocalizedString;
}

export interface EvidentiaryItem {
  id: string;
  claimOrFact: LocalizedString;
  nature: EvidentiaryNature;
  sourceName: LocalizedString;
  sourceUrl?: string;
  date?: string;
  citation?: string;
  verifiedByCourt?: boolean;
}

export interface ProceduralMilestone {
  id: string;
  date: string;
  event: LocalizedString;
  bench?: LocalizedString;
  proceduralOutcome: LocalizedString;
  statusEffect: ProceduralStatus;
  documentId?: string;
  mediaId?: string;
}

export interface ConnectedDocument {
  id: string;
  title: LocalizedString;
  docketNumber: string;
  court: LocalizedString;
  date: string;
  citationFormat: string; // e.g. "2024 SCMR 189" or "Crl. Misc. No. 412/2023"
  docType: 'order_sheet' | 'judgment' | 'petition' | 'fir_record' | 'bail_order';
  certifiedCopy: boolean;
  pagesCount: number;
  extractText: LocalizedString;
  bench?: LocalizedString;
  sourceUrl?: string;
  certifiedCopyStatus?: CertifiedCopyStatus;
}

export interface VideoEvidenceItem {
  id: string;
  title: LocalizedString;
  youtubeId: string;
  channel: string;
  recordedDate: string;
  duration: string;
  verificationNotes: LocalizedString;
  keyTranscriptPoints: LocalizedString[];
  verificationBadge: 'certified_stream' | 'official_briefing' | 'verified_reporting';
  relatedCaseId?: string;
}

export interface VideoTimestamp {
  timeInSeconds: number;
  timecode: string; // e.g. "04:12"
  label: LocalizedString;
  note?: LocalizedString;
}

export interface VideoMetadata {
  youtubeId: string;
  duration?: string;
  timestamps?: VideoTimestamp[];
  privacyEnhancedEmbedUrl?: string;
  embedAllowed?: boolean;
}

export interface DocumentMetadata {
  docType: 'court_order' | 'judgment' | 'fir_copy' | 'official_notice' | 'inquiry_report' | 'legal_brief';
  citationFormat?: string;
  certifiedCopyStatus: CertifiedCopyStatus;
  pagesCount?: number;
  paragraphReference?: string;
  downloadAuthorized?: boolean;
  extractText?: LocalizedString;
  pdfUrl?: string;
}

export interface ImageMetadata {
  alt: LocalizedString;
  caption?: LocalizedString;
  resolution?: string;
  isAuthorizedPublicRecord?: boolean;
  thumbnailUrl?: string;
  largeUrl?: string;
}

export interface MediaItem {
  id: string; // e.g. "MED-VID-01" or "MED-DOC-02"
  title: LocalizedString;
  mediaType: MediaType;
  associatedCaseIds: string[];
  associatedCaseSlugs?: string[];
  sourceUrl: string;
  sourcePublisher: LocalizedString;
  publicationDate?: string; // Date broadcast or published online
  eventDate?: string; // Date of the hearing/incident itself (stored separately!)
  dateAdded?: string;
  description: LocalizedString;
  contextNotes?: LocalizedString;
  videoMetadata?: VideoMetadata;
  documentMetadata?: DocumentMetadata;
  imageMetadata?: ImageMetadata;
  verificationStatus: EditorialReviewStatus;
  editorialReviewDate?: string;
  copyrightNotice?: LocalizedString;
  visibility: 'public' | 'redacted' | 'restricted';
  privacyNotes?: LocalizedString;
  isDemonstrationData?: boolean;
  tags?: string[];
  category?: ArchiveCategory;
}

export interface SourceReference {
  id: string;
  type: 'court_transcript' | 'police_fir' | 'official_gazette' | 'press_report' | 'bar_council' | 'human_rights_report';
  title: LocalizedString;
  issuingInstitution?: LocalizedString;
  publicationDate?: string;
  url?: string;
  verificationNotes?: LocalizedString;
}

export interface CaseRecord {
  id: string; // Stable unique ID e.g. "PK-SC-2024-0102"
  slug: string;
  title: LocalizedString;
  caseNumber: string; // e.g. "Const. P. 102/2024"
  summary: LocalizedString;
  factualBackground: LocalizedString;
  recordType: RecordType;
  categories: ArchiveCategory[];
  location: {
    province: Province;
    district?: string;
    city?: string;
    incidentLocation?: LocalizedString;
  };
  incidentDate?: string;
  incidentDateRange?: {
    start?: string;
    end?: string;
    approximate?: boolean;
  };
  filingDate?: string;
  court?: LocalizedString;
  courtLevel?: CourtLevel;
  bench?: LocalizedString;
  statutoryProvisions?: string[];
  parties: Party[];
  proceduralStatus: ProceduralStatus;
  proceduralStatusNotes?: LocalizedString;
  legalQuestion?: LocalizedString;
  timeline: ProceduralMilestone[];
  evidenceItems: EvidentiaryItem[];
  connectedDocuments: ConnectedDocument[];
  videoEvidence: VideoEvidenceItem[];
  mediaItems?: MediaItem[];
  sources: SourceReference[];
  lastUpdated: string;
  editorialReviewStatus: EditorialReviewStatus;
  incompleteNotice?: boolean;
  unverifiedNotice?: boolean;
  relatedCaseIds: string[];
  tags: string[];
  isDemonstrationData?: boolean;
  featured?: boolean;
}

// Lightweight index entry for ultra-fast archive search and listing
export interface CaseIndexEntry {
  id: string;
  slug: string;
  caseNumber: string;
  title: LocalizedString;
  summary: LocalizedString;
  proceduralStatus: ProceduralStatus;
  categories: ArchiveCategory[];
  province: Province;
  district?: string;
  courtLevel?: CourtLevel;
  court?: LocalizedString;
  lastUpdated: string;
  incidentDate?: string;
  filingDate?: string;
  recordType: RecordType;
  editorialReviewStatus: EditorialReviewStatus;
  hasDocuments: boolean;
  hasVideo: boolean;
  tags: string[];
  isDemonstrationData?: boolean;
}

export interface HumanRightsReport {
  id: string;
  title: LocalizedString;
  publisher: LocalizedString;
  publicationDate: string;
  documentType: 'annual_report' | 'fact_finding' | 'legal_brief' | 'special_inquiry';
  topics: ArchiveCategory[];
  executiveSummary: LocalizedString;
  keyFindings: LocalizedString[];
  sourceUrl: string;
  pagesCount: number;
}

export interface CorrectionRequest {
  caseOrDocReference: string;
  applicantName: string;
  applicantEmail: string;
  applicantRole: 'legal_counsel' | 'party_to_case' | 'journalist' | 'researcher' | 'public_citizen';
  claimedErrorDescription: string;
  supportingDocumentUrlOrCitation: string;
  timestamp: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  recordCount: number;
  duplicateIds: string[];
}

export type SubmissionStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'changes_requested'
  | 'approved'
  | 'published'
  | 'rejected';

export type ContributorRole =
  | 'super_admin'
  | 'reviewer'
  | 'contributor'
  | 'public_reader';

export type SubmissionType = 'new_case' | 'case_correction' | 'media_submission';

export interface ProposedCaseSubmission {
  type: 'new_case';
  proposedId?: string;
  title: LocalizedString;
  caseNumber: string;
  court: LocalizedString;
  courtLevel: CourtLevel;
  province: Province;
  proceduralStatus: ProceduralStatus;
  category: ArchiveCategory;
  summary: LocalizedString;
  factualBackground?: LocalizedString;
  parties: Party[];
  evidenceBreakdown?: {
    allegations: string;
    defensePosition: string;
    officialRecords: string;
    judicialFindings: string;
  };
  sources: string;
  incidentDate?: string;
  filingDate?: string;
  contributorName: string;
  contributorEmail?: string;
  contributorAffiliation?: string;
  checklistConfirmed: boolean;
}

export interface ProposedCorrectionSubmission {
  type: 'case_correction';
  caseId: string;
  caseTitle?: string;
  affectedSection: string;
  currentText: string;
  proposedReplacement: string;
  reason: string;
  supportingEvidence: string;
  affectsProceduralStatus: boolean;
  proposedStatus?: ProceduralStatus;
  contributorName: string;
  contributorEmail?: string;
  contributorAffiliation?: string;
  checklistConfirmed: boolean;
}

export interface ProposedMediaSubmission {
  type: 'media_submission';
  associatedCaseIds: string[];
  mediaType: MediaType;
  title: LocalizedString;
  sourcePublisher: LocalizedString;
  sourceUrl: string;
  eventDate: string;
  publicationDate?: string;
  verificationStatus: EditorialReviewStatus;
  description: LocalizedString;
  videoTimestampsText?: string;
  copyrightNotice?: string;
  contributorName: string;
  contributorEmail?: string;
  contributorAffiliation?: string;
  checklistConfirmed: boolean;
}

export type ProposedSubmission =
  | ProposedCaseSubmission
  | ProposedCorrectionSubmission
  | ProposedMediaSubmission;

