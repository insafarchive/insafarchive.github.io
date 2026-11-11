/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Editorial Approval Workflow, Safeguards & Audit Trail Engine
 * Master Prompt — Part 5.2 Implementation
 */

import type { EditorialStatus, EditorialAction, EditorialAuditTrailEntry } from '../types/archive';
import type { ArchivalDossier } from '../types/dossier';
import { CLAIM_SOURCE_AUDIT_DATA, LEGAL_CITATION_AUDIT_DATA } from '../data/dossiers';

/**
 * Valid state transitions for the editorial approval workflow
 */
export const VALID_STATUS_TRANSITIONS: Record<EditorialStatus, EditorialStatus[]> = {
  draft: ['under_review', 'revision_requested'],
  submitted: ['under_review', 'draft', 'rejected'],
  under_review: ['approved', 'revision_requested', 'changes_requested', 'draft', 'rejected'],
  revision_requested: ['under_review', 'draft'],
  changes_requested: ['under_review', 'draft'],
  approved: ['published', 'under_review', 'withdrawn'],
  published: ['withdrawn', 'revision_requested'],
  withdrawn: ['draft', 'under_review', 'archived'],
  rejected: ['draft', 'archived'],
  archived: ['draft']
};

/**
 * Validates whether a requested editorial action and status transition is permissible
 */
export function validateStatusTransition(
  currentStatus: EditorialStatus,
  targetStatus: EditorialStatus,
  action: EditorialAction,
  reviewerNote?: string
): { isAllowed: boolean; error?: string } {
  // 1. Check state machine graph
  const allowedTargets = VALID_STATUS_TRANSITIONS[currentStatus] || [];
  if (!allowedTargets.includes(targetStatus)) {
    return {
      isAllowed: false,
      error: `Invalid transition from '${currentStatus}' to '${targetStatus}'. Allowed: ${allowedTargets.join(', ')}`
    };
  }

  // 2. Action semantic check
  if (action === 'request_revision' && targetStatus !== 'revision_requested' && targetStatus !== 'changes_requested') {
    return { isAllowed: false, error: `Action 'request_revision' must transition to 'revision_requested'` };
  }
  if (action === 'approve' && targetStatus !== 'approved') {
    return { isAllowed: false, error: `Action 'approve' must transition to 'approved'` };
  }
  if (action === 'publish' && targetStatus !== 'published') {
    return { isAllowed: false, error: `Action 'publish' must transition to 'published'` };
  }
  if (action === 'withdraw' && targetStatus !== 'withdrawn') {
    return { isAllowed: false, error: `Action 'withdraw' must transition to 'withdrawn'` };
  }

  // 3. Reviewer note requirement for critical actions
  if ((action === 'request_revision' || action === 'withdraw') && (!reviewerNote || reviewerNote.trim().length < 5)) {
    return {
      isAllowed: false,
      error: `Action '${action}' requires an explicit reviewer note explaining the editorial reasoning.`
    };
  }

  return { isAllowed: true };
}

/**
 * Helper to check whether a recorded legal status review is fresh (within 365 days)
 */
export function checkLegalStatusFreshness(dateString?: string): {
  isFresh: boolean;
  isStale: boolean;
  daysAgo: number;
  warning?: string;
} {
  if (!dateString) {
    return { isFresh: false, isStale: true, daysAgo: Infinity, warning: 'Legal review date is missing.' };
  }
  const reviewTime = new Date(dateString).getTime();
  if (isNaN(reviewTime)) {
    return { isFresh: false, isStale: true, daysAgo: Infinity, warning: 'Invalid review date format.' };
  }
  const now = new Date('2026-11-01T00:00:00Z').getTime(); // Project reference time
  const diffDays = Math.floor((now - reviewTime) / (1000 * 60 * 60 * 24));
  if (diffDays > 365) {
    return {
      isFresh: false,
      isStale: true,
      daysAgo: diffDays,
      warning: `Legal status check is stale (${diffDays} days old, exceeding 365-day threshold).`
    };
  }
  return { isFresh: true, isStale: false, daysAgo: diffDays };
}

/**
 * Validates individual claim relationship integrity, source resolution, and attribution.
 * Accepts either an entire ArchivalDossier or an individual claim with sources array.
 */
export function validateClaimIntegrity(
  dossierOrClaim: ArchivalDossier | { claimId: string; findingType?: string; sourceIds?: string[]; assertion?: { en: string; ur: string } },
  sourcesList?: { sourceId: string; authenticityStatus?: string; sourceAvailability?: string }[]
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  if ('claims' in dossierOrClaim && Array.isArray(dossierOrClaim.claims)) {
    const dossier = dossierOrClaim as ArchivalDossier;
    const sourceMap = new Map(dossier.sources.map(s => [s.sourceId, s]));
    for (const claim of dossier.claims) {
      if (!claim.claimId || claim.claimId.trim().length === 0) {
        issues.push('Claim lacks a stable claimId.');
      }
      if (!claim.sourceIds || claim.sourceIds.length === 0) {
        issues.push(`Claim '${claim.claimId}' has no supporting source IDs.`);
      } else {
        for (const sId of claim.sourceIds) {
          const src = sourceMap.get(sId);
          if (!src) {
            issues.push(`Claim '${claim.claimId}' cites non-existent source '${sId}'.`);
          } else if (src.sourceAvailability === 'not_checked' && src.authenticityStatus === 'official_document') {
            issues.push(
              `Claim '${claim.claimId}' relies on source '${sId}' which is marked 'not_checked' externally but claims 'official_document' authenticity.`
            );
          }
        }
      }
    }
    return { isValid: issues.length === 0, issues };
  }

  // Single claim mode
  const claim = dossierOrClaim as { claimId: string; findingType?: string; sourceIds?: string[]; assertion?: { en: string; ur: string } };
  const sources = sourcesList || [];
  if (!claim.claimId || claim.claimId.trim().length === 0) {
    issues.push('Claim lacks a stable claimId.');
  }
  if (!claim.sourceIds || claim.sourceIds.length === 0) {
    issues.push(`Claim '${claim.claimId}' has no supporting source IDs.`);
  } else {
    const sourceMap = new Map(sources.map(s => [s.sourceId, s]));
    for (const sId of claim.sourceIds) {
      const src = sourceMap.get(sId);
      if (!src) {
        issues.push(`Claim '${claim.claimId}' cites non-existent source '${sId}'.`);
      } else if (src.sourceAvailability === 'not_checked' && src.authenticityStatus === 'official_document') {
        issues.push(
          `Claim '${claim.claimId}' relies on source '${sId}' which is marked 'not_checked' externally but claims 'official_document' authenticity.`
        );
      }
    }
  }
  return { isValid: issues.length === 0, issues };
}

/**
 * Comprehensive publication safeguards check:
 * Distinguishes publication eligibility (evidentiary support, privacy, neutral framing)
 * from legal proceeding status (ongoing, stayed, pending appeal).
 * Ongoing or stayed proceedings DO NOT block publication provided they carry a prominent
 * pending proceedings notice, last review date, and clear separation of claims.
 */
export function validatePublicationSafeguards(dossier: ArchivalDossier): {
  canPublish: boolean;
  blockers: string[];
  warnings: string[];
} {
  const blockers: string[] = [];
  const warnings: string[] = [];

  // 1. Active reporting ban / court gag order (Hard Blocker)
  if (dossier.hasActiveReportingBan === true) {
    blockers.push(`Dossier is subject to an active court gag order or reporting prohibition.`);
  }

  // 2. Claims source existence & resolution (Hard Blocker)
  if (!dossier.claims || dossier.claims.length === 0) {
    blockers.push(`Dossier has zero evidentiary claims.`);
  } else {
    const sourceIds = new Set(dossier.sources.map(s => s.sourceId));
    for (const claim of dossier.claims) {
      if (!claim.sourceIds || claim.sourceIds.length === 0) {
        blockers.push(`Claim '${claim.claimId}' has no supporting source citations.`);
      } else {
        for (const sId of claim.sourceIds) {
          if (!sourceIds.has(sId)) {
            blockers.push(`Claim '${claim.claimId}' references non-existent source '${sId}'.`);
          }
        }
      }
    }
  }

  // 3. Claim audit verification
  const auditEntries = CLAIM_SOURCE_AUDIT_DATA.filter(c => c.dossierId === dossier.id);
  const isSubJudice =
    dossier.legalProceedingStatus === 'ongoing' ||
    dossier.legalProceedingStatus === 'pending_appeal' ||
    dossier.legalProceedingStatus === 'stayed' ||
    dossier.legalProceedingStatus === 'under_investigation';

  // Check mandatory pending proceedings disclosure if sub judice
  const hasDisclosureNotice =
    Boolean(dossier.pendingProceedingsNotice?.en?.trim()) &&
    Boolean(dossier.pendingProceedingsNotice?.ur?.trim());

  if (isSubJudice && !hasDisclosureNotice) {
    blockers.push(
      `Dossier involves active legal status '${dossier.legalProceedingStatus}' but lacks a mandatory bilingual Pending Proceedings Notice.`
    );
  }

  for (const audit of auditEntries) {
    // Unsupported or missing sources block publication
    if (
      audit.auditStatus === 'source_unavailable' ||
      audit.auditStatus === 'citation_missing' ||
      audit.verificationStatus === 'source_unavailable'
    ) {
      blockers.push(`Claim '${audit.claimId}' has unavailable source or missing citation.`);
    }
    if (
      audit.auditStatus === 'partially_supported' ||
      audit.verificationStatus === 'partially_supported'
    ) {
      blockers.push(`Claim '${audit.claimId}' is only partially supported by existing records.`);
    }
    if (audit.verificationStatus === 'contradicted') {
      blockers.push(`Claim '${audit.claimId}' is contradicted by primary evidence without editorial resolution.`);
    }

    // Pending appeal or stayed proceedings: Allowed with disclosure notice; blocked without
    if (audit.legalUpdateSensitivity === 'high_pending_appeal') {
      if (!hasDisclosureNotice) {
        blockers.push(`Claim '${audit.claimId}' is subject to pending appeal and lacks disclosure notice.`);
      } else {
        warnings.push(`Claim '${audit.claimId}' is subject to active appellate review; certified with disclosure notice.`);
      }
    }

    if (audit.auditStatus === 'requires_legal_review' || audit.verificationStatus === 'requires_human_review') {
      if (!hasDisclosureNotice) {
        blockers.push(`Claim '${audit.claimId}' requires legal review before publication.`);
      } else {
        warnings.push(`Claim '${audit.claimId}' requires ongoing legal monitoring.`);
      }
    }
  }

  // 4. Legal citations inspection and stay checks
  const legalCitations = LEGAL_CITATION_AUDIT_DATA.filter(c => c.dossierId === dossier.id);
  for (const cit of legalCitations) {
    if (cit.inspectionType === 'catalogued' && cit.actualHoldingCited) {
      warnings.push(`Legal citation '${cit.citationId}' (${cit.caseTitle}) is catalogued; pending full text inspection.`);
    }
    if (cit.legalReviewStatus === 'stayed_on_appeal') {
      if (!hasDisclosureNotice) {
        blockers.push(`Legal citation '${cit.citationId}' (${cit.caseTitle}) is stayed on appeal without disclosure notice.`);
      } else {
        warnings.push(`Legal citation '${cit.citationId}' is stayed on appeal; certified with pending proceedings disclosure.`);
      }
    }
  }

  // 5. Legal check date freshness
  if (isSubJudice) {
    if (!dossier.lastLegalStatusChecked) {
      blockers.push(`Sub judice dossier lacks a recorded lastLegalStatusChecked date.`);
    } else {
      const freshness = checkLegalStatusFreshness(dossier.lastLegalStatusChecked);
      if (!freshness.isFresh) {
        warnings.push(freshness.warning || 'Legal review date is stale.');
      }
    }
  }

  // 6. Privacy & Defamation Review (Hard Blocker)
  if (!dossier.privacyReview) {
    blockers.push(`Privacy review record is missing.`);
  } else {
    if (dossier.privacyReview.piiRedacted !== true) {
      blockers.push(`Privacy review does not confirm PII redaction.`);
    }
    if (dossier.privacyReview.allegationsDistinguishedFromFindings !== true) {
      blockers.push(`Privacy review does not confirm that allegations are separated from judicial findings.`);
    }
    if (dossier.privacyReview.riskAssessment === 'high_scrutiny') {
      warnings.push(`Dossier carries high scrutiny risk assessment; requires ongoing monitoring.`);
    }
  }

  // 7. Bilingual Completeness (Hard Blocker)
  if (!dossier.title?.en?.trim() || !dossier.title?.ur?.trim()) {
    blockers.push(`Bilingual title is incomplete.`);
  }
  if (!dossier.overview?.en?.trim() || !dossier.overview?.ur?.trim()) {
    blockers.push(`Bilingual overview is incomplete.`);
  }
  if (!dossier.scopeAndTerminology?.en?.trim() || !dossier.scopeAndTerminology?.ur?.trim()) {
    blockers.push(`Bilingual scope notes are incomplete.`);
  }

  // 8. Verification Status requirement
  if (dossier.verificationStatus === 'unverified' || dossier.verificationStatus === 'disputed' || dossier.verificationStatus === 'under_investigation') {
    blockers.push(`Cannot publish dossier with '${dossier.verificationStatus}' verification status; evidentiary basis remains incomplete.`);
  }

  // 9. Editorial Status requirement: Cannot publish directly from draft without formal review
  if (dossier.editorialStatus === 'draft') {
    blockers.push(`Cannot publish dossier while in 'draft' status; must undergo review and approval.`);
  }

  return {
    canPublish: blockers.length === 0,
    blockers,
    warnings
  };
}

/**
 * Creates an immutable, structured audit trail entry for editorial actions
 */
export function createEditorialAuditEntry(
  recordId: string,
  previousStatus: EditorialStatus,
  newStatus: EditorialStatus,
  action: EditorialAction,
  reviewerNote: string,
  changeSummary: string,
  gitReference?: string
): EditorialAuditTrailEntry {
  return {
    auditId: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    recordId,
    previousStatus,
    newStatus,
    action,
    reviewerNote: reviewerNote.trim(),
    changeSummary: changeSummary.trim(),
    timestamp: new Date().toISOString(),
    gitReference: gitReference?.trim() || undefined
  };
}
