/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Admin Editorial Studio & Structured Data Entry Types — Version 1.0.0
 * Supports Dossiers, Claims, Sources, Media/Documents, Local Queue, & GitHub PR/Issue Workflows
 */

import type { BilingualText, EditorialStatus, VerificationStatus, SourceType } from './archive';
import type {
  DossierDomain,
  LegalProceedingStatus,
  ClaimClassification,
  ClaimVerificationState,
} from './dossier';

export type StudioTab =
  | 'dossiers'
  | 'claims'
  | 'sources'
  | 'media'
  | 'review_queue'
  | 'export_github';

export interface FieldValidationError {
  field: string;
  messageEn: string;
  messageUr: string;
  severity: 'error' | 'warning';
}

/**
 * Editorial Studio Dossier Draft
 */
export interface StudioDossierDraft {
  id: string;
  slug: string;
  title: BilingualText;
  overview: BilingualText;
  domain: DossierDomain;
  tags: string[];
  eventDate?: string;
  location?: BilingualText;
  editorialStatus: EditorialStatus;
  legalProceedingStatus: LegalProceedingStatus;
  verificationStatus: VerificationStatus;
  hasActiveReportingBan: boolean;
  pendingProceedingsNotice?: BilingualText;
  lastLegalStatusChecked: string;
  privacyReview: {
    hasSensitivePersonalData: boolean;
    piiRedacted: boolean;
    allegationsDistinguishedFromFindings: boolean;
    officialDenialsIncluded: boolean;
    riskAssessment: 'low' | 'medium' | 'high_scrutiny';
    reviewerNotes?: string;
  };
  unresolvedQuestions: BilingualText[];
  isNewRecord?: boolean;
}

/**
 * Editorial Studio Claim Draft
 */
export interface StudioClaimDraft {
  claimId: string;
  dossierId: string;
  statement: BilingualText;
  claimClassification: ClaimClassification;
  verificationStatus: ClaimVerificationState;
  supportingSourceIds: string[];
  contradictoryOrQualifyingSourceIds: string[];
  whatEvidenceEstablishes: string;
  whatEvidenceDoesNotEstablish: string;
  reviewerNotes: string;
  lastReviewDate: string;
  isNewRecord?: boolean;
}

/**
 * Editorial Studio Source Draft
 */
export interface StudioSourceDraft {
  sourceId: string;
  dossierId?: string;
  title: BilingualText;
  publisherOrIssuingAuthority: string;
  sourceType: SourceType;
  officialUrl?: string;
  archivedUrl?: string;
  localDocumentPath?: string;
  publicationDate?: string;
  judgmentDate?: string;
  accessDate: string;
  pageNumber?: string;
  paragraphNumber?: string;
  exactReference?: string;
  quotedOrSummarizedPassage?: string;
  supportsClaim?: string[];
  limitations?: string;
  sourceAvailability: 'accessible' | 'archived_copy_available' | 'unavailable' | 'broken_link' | 'not_checked';
  authenticityStatus: 'official_document' | 'publisher_verified' | 'corroborated' | 'unverified' | 'disputed';
  reviewerNotes?: string;
  isNewRecord?: boolean;
}

/**
 * Editorial Studio Media / Document Draft
 */
export interface StudioMediaDraft {
  mediaId: string;
  title: BilingualText;
  documentCategory:
    | 'court_order'
    | 'official_notification'
    | 'inquiry_report'
    | 'photograph'
    | 'video'
    | 'interview_report'
    | 'document_pdf';
  platformOrPublisher: string;
  originalUrl?: string;
  archivedUrl?: string;
  localDocumentPath?: string;
  eventDate?: string;
  publicationDate?: string;
  dateAdded: string;
  associatedDossierId: string;
  associatedClaimIds: string[];
  rightsNotes?: string;
  verificationStatus: 'verified' | 'unverified' | 'disputed';
  description?: BilingualText;
  isSensitivePersonalData?: boolean;
  piiRedacted?: boolean;
  privacyNotes?: string;
  isNewRecord?: boolean;
}

export type ChangeType = 'create' | 'update' | 'withdraw';
export type LocalReviewStatus = 'draft_saved' | 'validation_passed' | 'validation_failed' | 'ready_for_pr' | 'pr_submitted';

/**
 * Item in the local Review Queue
 */
export interface StudioReviewQueueItem {
  queueId: string;
  recordType: 'dossier' | 'claim' | 'source' | 'media';
  recordId: string;
  changeType: ChangeType;
  titleEn: string;
  titleUr: string;
  fieldsChanged: string[];
  reasonForChange: string;
  supportingSourceIds?: string[];
  privacyNotes?: string;
  localReviewStatus: LocalReviewStatus;
  createdAt: string;
  updatedAt: string;
  validationErrors: FieldValidationError[];
}

/**
 * Master local storage bundle holding active drafts
 */
export interface StudioDraftBundle {
  version: '1.0.0';
  lastUpdated: string;
  dossiers: StudioDossierDraft[];
  claims: StudioClaimDraft[];
  sources: StudioSourceDraft[];
  media: StudioMediaDraft[];
  queue: StudioReviewQueueItem[];
}

/**
 * Exportable Change Payload
 */
export interface StudioExportBundle {
  archiveName: 'Insaf Archive (انصاف آرکائیو)';
  bundleVersion: '1.0.0';
  exportedAt: string;
  honestSecurityDisclosure: {
    isDeviceLocal: true;
    isServerAuthoritative: false;
    noticeEn: 'This bundle represents device-local draft proposals. It requires peer review and GitHub PR approval before merging into the authoritative public repository.';
    noticeUr: 'یہ بنڈل مقامی ڈیوائس پر تیار کردہ تجاویز پر مشتمل ہے۔ مرکزی آرکائیو میں شامل کرنے کے لیے گٹ ہب پی آر کے ذریعے ادارتی جانچ لازمی ہے۔';
  };
  summary: {
    totalChanges: number;
    dossierCount: number;
    claimCount: number;
    sourceCount: number;
    mediaCount: number;
  };
  changes: StudioReviewQueueItem[];
  payloadData: {
    dossiers: StudioDossierDraft[];
    claims: StudioClaimDraft[];
    sources: StudioSourceDraft[];
    media: StudioMediaDraft[];
  };
}

export interface ValidationSummary {
  isValid: boolean;
  totalErrors: number;
  totalWarnings: number;
  errors: FieldValidationError[];
}
