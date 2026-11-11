/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Dossier Claim-Source, Legal Citation & Publication Safeguards Audit Suite
 * Master Prompt — Part 5.3 Primary Source Verification, Publication Policy & Dossier Quality Audit
 * 12 Mandatory Testing Requirements
 */

import { describe, it, expect } from 'vitest';
import {
  ALL_ARCHIVAL_DOSSIERS,
  CLAIM_SOURCE_AUDIT_DATA,
  LEGAL_CITATION_AUDIT_DATA,
  getDossierById,
  getPublishedDossiers
} from '../data/dossiers';
import {
  validatePublicationSafeguards,
  validateStatusTransition,
  createEditorialAuditEntry,
  checkLegalStatusFreshness,
  validateClaimIntegrity
} from '../utils/editorialWorkflow';
import type { ArchivalDossier } from '../types/dossier';

describe('Part 5.3 Primary Source Verification & Publication Policy Test Suite', () => {
  // =========================================================================
  // Baseline Registry Integrity
  // =========================================================================
  it('guarantees all 39 material claims identified in ALL_ARCHIVAL_DOSSIERS are audited in CLAIM_SOURCE_AUDIT_DATA', () => {
    const auditClaimIds = new Set(CLAIM_SOURCE_AUDIT_DATA.map(c => c.claimId));
    let totalClaimsInDossiers = 0;

    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      expect(dossier.claims.length).toBeGreaterThanOrEqual(2);
      totalClaimsInDossiers += dossier.claims.length;

      for (const claim of dossier.claims) {
        expect(
          auditClaimIds.has(claim.claimId),
          `Claim ${claim.claimId} in dossier ${dossier.id} lacks an audit entry in CLAIM_SOURCE_AUDIT_DATA`
        ).toBe(true);
      }
    }

    expect(totalClaimsInDossiers).toBe(39);
    expect(CLAIM_SOURCE_AUDIT_DATA.length).toBe(39);
  });

  it('guarantees every claim audit entry references a valid dossier and existing sources', () => {
    const dossierMap = new Map(ALL_ARCHIVAL_DOSSIERS.map(d => [d.id, d]));

    for (const entry of CLAIM_SOURCE_AUDIT_DATA) {
      const dossier = dossierMap.get(entry.dossierId);
      expect(dossier, `Audit entry ${entry.claimId} references non-existent dossier ${entry.dossierId}`).toBeDefined();

      if (dossier) {
        const sourceIds = new Set(dossier.sources.map(s => s.sourceId));
        expect(entry.supportingSourceIds.length).toBeGreaterThan(0);
        for (const sId of entry.supportingSourceIds) {
          expect(
            sourceIds.has(sId),
            `Audit entry ${entry.claimId} cites source ${sId} not present in dossier ${dossier.id}`
          ).toBe(true);
        }
      }
    }
  });

  it('verifies all court findings across dossiers have an audit entry in LEGAL_CITATION_AUDIT_DATA', () => {
    const citationDossierIds = new Set(LEGAL_CITATION_AUDIT_DATA.map(c => c.dossierId));

    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      if (dossier.courtFindings && dossier.courtFindings.length > 0) {
        expect(
          citationDossierIds.has(dossier.id),
          `Dossier ${dossier.id} has court findings but lacks entry in LEGAL_CITATION_AUDIT_DATA`
        ).toBe(true);
      }
    }
  });

  // =========================================================================
  // Requirement 1: Ongoing case can be published when claims are supported
  // =========================================================================
  it('Requirement 1: proves an ongoing case can be published when claims are adequately supported and editorial requirements are met', () => {
    const publishedOngoing = getPublishedDossiers().filter(d => d.legalProceedingStatus === 'ongoing' || d.legalProceedingStatus === 'under_investigation');
    expect(publishedOngoing.length).toBeGreaterThan(0);

    for (const dossier of publishedOngoing) {
      const safeguards = validatePublicationSafeguards(dossier);
      expect(safeguards.canPublish, `Ongoing case ${dossier.id} was blocked from publication`).toBe(true);
      expect(dossier.pendingProceedingsNotice).toBeDefined();
      expect(dossier.pendingProceedingsNotice?.en.length).toBeGreaterThan(10);
      expect(dossier.pendingProceedingsNotice?.ur.length).toBeGreaterThan(10);
    }
  });

  // =========================================================================
  // Requirement 2: Pending appeal alone does not automatically block publication
  // =========================================================================
  it('Requirement 2: proves a pending appeal or stayed proceeding alone does not automatically block publication if notice is present', () => {
    const baseDossier = getDossierById('dos-pk-legal-military-courts-2023')!;
    expect(baseDossier).toBeDefined();

    // With prominent disclosure notice, stay/pending appeal is qualified as warning rather than hard blocker
    const withNotice = { ...baseDossier, editorialStatus: 'approved' as const };
    const resultWithNotice = validatePublicationSafeguards(withNotice);
    expect(resultWithNotice.canPublish).toBe(true);
    expect(resultWithNotice.warnings.some(w => w.includes('stayed') || w.includes('appellate review'))).toBe(true);

    // Without disclosure notice, pending appeal / stay becomes a hard blocker
    const withoutNotice = { ...withNotice, pendingProceedingsNotice: undefined };
    const resultWithoutNotice = validatePublicationSafeguards(withoutNotice);
    expect(resultWithoutNotice.canPublish).toBe(false);
    expect(resultWithoutNotice.blockers.some(b => b.includes('Pending Proceedings Notice') || b.includes('lacks disclosure notice'))).toBe(true);
  });

  // =========================================================================
  // Requirement 3: Active publication prohibition blocks affected content
  // =========================================================================
  it('Requirement 3: proves an active court gag order or publication prohibition blocks publication', () => {
    const baseDossier = getDossierById('dos-pk-legal-assembly-dissolution-2022')!;
    const withGagOrder: ArchivalDossier = {
      ...baseDossier,
      hasActiveReportingBan: true
    };

    const safeguards = validatePublicationSafeguards(withGagOrder);
    expect(safeguards.canPublish).toBe(false);
    expect(safeguards.blockers.some(b => b.includes('active court gag order'))).toBe(true);
  });

  // =========================================================================
  // Requirement 4: Unsupported material claim blocks publication
  // =========================================================================
  it('Requirement 4: proves an unsupported or partially supported material claim blocks publication of the dossier', () => {
    const muridke = getDossierById('dos-pk-event-muridke-tragedy-2021')!;
    expect(muridke).toBeDefined();

    const safeguards = validatePublicationSafeguards(muridke);
    expect(safeguards.canPublish).toBe(false);
    expect(safeguards.blockers.some(b => b.includes('partially supported') || b.includes('evidentiary basis remains incomplete'))).toBe(true);
  });

  // =========================================================================
  // Requirement 5: Missing or unresolved source is flagged
  // =========================================================================
  it('Requirement 5: proves a missing or unresolved source ID is flagged as a blocker', () => {
    const baseDossier = getDossierById('dos-pk-legal-asia-bibi-acquittal')!;
    const brokenDossier: ArchivalDossier = {
      ...baseDossier,
      claims: [
        ...baseDossier.claims,
        {
          claimId: 'clm-test-missing-source',
          findingType: 'court_finding',
          assertion: { en: 'Test assertion', ur: 'ٹیسٹ بیان' },
          attributedParty: { en: 'Court', ur: 'عدالت' },
          sourceIds: ['src-non-existent-source-xyz']
        }
      ]
    };

    const safeguards = validatePublicationSafeguards(brokenDossier);
    expect(safeguards.canPublish).toBe(false);
    expect(safeguards.blockers.some(b => b.includes("non-existent source 'src-non-existent-source-xyz'"))).toBe(true);
  });

  // =========================================================================
  // Requirement 6: Uninspected internal source not falsely marked verified
  // =========================================================================
  it('Requirement 6: proves a source that has not been externally inspected is not falsely marked verified', () => {
    const baseDossier = getDossierById('dos-pk-soe-pakistan-steel-mills-2006')!;
    const uninspectedDossier: ArchivalDossier = {
      ...baseDossier,
      sources: [
        {
          ...baseDossier.sources[0],
          sourceAvailability: 'not_checked',
          authenticityStatus: 'official_document' // Inconsistent: claiming official authenticity while marked not_checked
        }
      ]
    };

    const integrityCheck = validateClaimIntegrity(uninspectedDossier);
    expect(integrityCheck.isValid).toBe(false);
    expect(integrityCheck.issues.some(i => i.includes('not_checked') && i.includes('official_document'))).toBe(true);
  });

  // =========================================================================
  // Requirement 7: Contradictory evidence is disclosed
  // =========================================================================
  it('Requirement 7: proves contradictory or qualifying evidence is disclosed in claim audit registry', () => {
    const claimsWithDisclosures = CLAIM_SOURCE_AUDIT_DATA.filter(
      c => c.contradictoryOrQualifyingSourceIds && c.contradictoryOrQualifyingSourceIds.length > 0
    );

    expect(claimsWithDisclosures.length).toBeGreaterThanOrEqual(4);

    // Verify ISPR vs PTI denial disclosure
    const isprClaim = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === 'clm-may09-ispr-allegation');
    expect(isprClaim?.contradictoryOrQualifyingSourceIds).toContain('src-pti-press-statement-13may2023');

    // Verify PIA parliamentary statement vs EASA regulatory notice
    const piaClaim = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === 'clm-pia-parliamentary-statement');
    expect(piaClaim?.contradictoryOrQualifyingSourceIds).toContain('src-easa-suspension-notice-2020');

    // Verify Military Courts trial order vs ICA stay order
    const milTrialClaim = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === 'clm-mil-trial-unconst');
    expect(milTrialClaim?.contradictoryOrQualifyingSourceIds).toContain('src-sc-ica-mil-courts-stay-2023');
  });

  // =========================================================================
  // Requirement 8: Allegation cannot silently become a judicial finding
  // =========================================================================
  it('Requirement 8: proves an official position or allegation cannot masquerade as a judicial finding', () => {
    const isprClaim = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === 'clm-may09-ispr-allegation')!;
    expect(isprClaim).toBeDefined();
    expect(isprClaim.claimClassification).toBe('official_position');
    expect(isprClaim.claimClassification).not.toBe('judicial_finding');
    expect(isprClaim.whatEvidenceDoesNotEstablish).toContain('Does not constitute a judicial conviction');

    const muridkeAllegation = CLAIM_SOURCE_AUDIT_DATA.find(c => c.claimId === 'clm-muridke-civilian-claim')!;
    expect(muridkeAllegation.claimClassification).toBe('reported_allegation');
    expect(muridkeAllegation.claimClassification).not.toBe('judicial_finding');
  });

  // =========================================================================
  // Requirement 9: Stale legal status check generates a warning
  // =========================================================================
  it('Requirement 9: proves a stale legal review date (> 365 days) generates a freshness warning', () => {
    const staleDate = '2022-01-01';
    const freshnessStale = checkLegalStatusFreshness(staleDate);
    expect(freshnessStale.isFresh).toBe(false);
    expect(freshnessStale.isStale).toBe(true);
    expect(freshnessStale.warning).toContain('365-day threshold');

    const freshDate = new Date().toISOString().slice(0, 10);
    const freshnessCurrent = checkLegalStatusFreshness(freshDate);
    expect(freshnessCurrent.isFresh).toBe(true);
    expect(freshnessCurrent.isStale).toBe(false);
  });

  // =========================================================================
  // Requirement 10: Privacy-sensitive information triggers review
  // =========================================================================
  it('Requirement 10: proves unredacted PII or unseparated allegations trigger hard publication blockers', () => {
    const baseDossier = getDossierById('dos-pk-legal-asia-bibi-acquittal')!;
    const unredactedDossier: ArchivalDossier = {
      ...baseDossier,
      privacyReview: {
        ...baseDossier.privacyReview,
        piiRedacted: false
      }
    };

    const safeguards = validatePublicationSafeguards(unredactedDossier);
    expect(safeguards.canPublish).toBe(false);
    expect(safeguards.blockers.some(b => b.includes('PII redaction'))).toBe(true);
  });

  // =========================================================================
  // Requirement 11: Urdu and English coverage checked independently
  // =========================================================================
  it('Requirement 11: proves Urdu and English content coverage is checked independently without fallback masking', () => {
    const baseDossier = getDossierById('dos-pk-hist-hamoodur-rahman-1971')!;
    const missingUrduDossier: ArchivalDossier = {
      ...baseDossier,
      overview: {
        en: 'Valid English overview text',
        ur: '   ' // Empty Urdu overview
      }
    };

    const safeguards = validatePublicationSafeguards(missingUrduDossier);
    expect(safeguards.canPublish).toBe(false);
    expect(safeguards.blockers.some(b => b.includes('Bilingual overview is incomplete'))).toBe(true);
  });

  // =========================================================================
  // Requirement 12: No dossier automatically promoted without editorial approval
  // =========================================================================
  it('Requirement 12: proves no dossier can publish directly from draft without formal editorial review and approval', () => {
    const draftDossier: ArchivalDossier = {
      ...getDossierById('dos-pk-event-muridke-tragedy-2021')!,
      editorialStatus: 'draft'
    };

    const safeguards = validatePublicationSafeguards(draftDossier);
    expect(safeguards.canPublish).toBe(false);
    expect(safeguards.blockers.some(b => b.includes("while in 'draft' status"))).toBe(true);

    // Status transition directly from draft to published is strictly prohibited
    const directPublishTransition = validateStatusTransition('draft', 'published', 'publish', 'Direct publish attempt');
    expect(directPublishTransition.isAllowed).toBe(false);
    expect(directPublishTransition.error).toContain('Invalid transition');
  });

  // =========================================================================
  // Editorial Transitions & Audit Trail Integrity
  // =========================================================================
  it('validates editorial status transitions and requires reviewer notes for revision and withdrawal', () => {
    expect(validateStatusTransition('draft', 'under_review', 'submit_for_review').isAllowed).toBe(true);
    expect(validateStatusTransition('under_review', 'approved', 'approve').isAllowed).toBe(true);
    expect(validateStatusTransition('approved', 'published', 'publish').isAllowed).toBe(true);

    expect(validateStatusTransition('under_review', 'revision_requested', 'request_revision', '').isAllowed).toBe(false);
    expect(validateStatusTransition('under_review', 'revision_requested', 'request_revision', 'Need primary ballistic report').isAllowed).toBe(true);

    expect(validateStatusTransition('published', 'withdrawn', 'withdraw', '').isAllowed).toBe(false);
    expect(validateStatusTransition('published', 'withdrawn', 'withdraw', 'Court granted emergency stay order').isAllowed).toBe(true);

    expect(validateStatusTransition('published', 'draft', 'request_revision').isAllowed).toBe(false);
  });

  it('guarantees audit trail entry creation captures all required metadata without fabrication', () => {
    const entry = createEditorialAuditEntry(
      'dos-pk-legal-military-courts-2023',
      'published',
      'under_review',
      'withdraw',
      'Suspended by 6-member larger bench in ICA 558/2023 on 13 Dec 2023.',
      'Stay order added to chronology and court findings; status downgraded.',
      'PR #42'
    );

    expect(entry.auditId).toMatch(/^audit-\d+-[a-z0-9]+$/);
    expect(entry.recordId).toBe('dos-pk-legal-military-courts-2023');
    expect(entry.previousStatus).toBe('published');
    expect(entry.newStatus).toBe('under_review');
    expect(entry.action).toBe('withdraw');
    expect(entry.reviewerNote).toContain('ICA 558/2023');
    expect(entry.gitReference).toBe('PR #42');
    expect(entry.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
