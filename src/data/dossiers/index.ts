/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Master Dossiers Module & Query API
 */

import type { ArchivalDossier, DossierDomain } from '../../types/dossier';
import type { EditorialStatus } from '../../types/archive';
import { ALL_ARCHIVAL_DOSSIERS } from './dossiersData';
import { ALL_ARCHIVE_RECORDS } from '../records';

export { ALL_ARCHIVAL_DOSSIERS } from './dossiersData';
export { CLAIM_SOURCE_AUDIT_DATA, LEGAL_CITATION_AUDIT_DATA } from './dossierAudits';

export function getDossierById(id: string): ArchivalDossier | undefined {
  return ALL_ARCHIVAL_DOSSIERS.find(d => d.id === id || d.slug === id);
}

export function getDossiersByDomain(domain: DossierDomain): ArchivalDossier[] {
  return ALL_ARCHIVAL_DOSSIERS.filter(d => d.domain === domain);
}

export function getDossiersByStatus(status: EditorialStatus): ArchivalDossier[] {
  return ALL_ARCHIVAL_DOSSIERS.filter(d => d.editorialStatus === status);
}

export function getPublishedDossiers(): ArchivalDossier[] {
  return ALL_ARCHIVAL_DOSSIERS.filter(d => d.editorialStatus === 'published');
}

/**
 * Validates dataset-wide integrity of dossiers:
 * 1. Unique IDs and slugs
 * 2. Mandatory bilingual fields (title, overview, scopeAndTerminology)
 * 3. Sourced chronologies (sourceIds must exist in dossier.sources)
 * 4. Evidentiary claims citation integrity
 * 5. Related records existence in ALL_ARCHIVE_RECORDS
 * 6. Privacy review flags and no unsupported court finding labels
 */
export function validateDossiersIntegrity(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const recordIdSet = new Set(ALL_ARCHIVE_RECORDS.map(r => r.id));

  for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
    // 1. Identity & Routing
    if (!dossier.id || !dossier.id.startsWith('dos-pk-')) {
      errors.push(`Dossier ${dossier.id || 'UNKNOWN'}: ID must start with 'dos-pk-'`);
    }
    if (seenIds.has(dossier.id)) {
      errors.push(`Dossier ${dossier.id}: Duplicate dossier ID`);
    }
    seenIds.add(dossier.id);

    if (!dossier.slug) {
      errors.push(`Dossier ${dossier.id}: Missing slug`);
    }
    if (seenSlugs.has(dossier.slug)) {
      errors.push(`Dossier ${dossier.id}: Duplicate slug '${dossier.slug}'`);
    }
    seenSlugs.add(dossier.slug);

    // 2. Bilingual Text
    if (!dossier.title?.en || !dossier.title?.ur) {
      errors.push(`Dossier ${dossier.id}: Incomplete bilingual title`);
    }
    if (!dossier.overview?.en || !dossier.overview?.ur) {
      errors.push(`Dossier ${dossier.id}: Incomplete bilingual overview`);
    }
    if (!dossier.scopeAndTerminology?.en || !dossier.scopeAndTerminology?.ur) {
      errors.push(`Dossier ${dossier.id}: Incomplete bilingual scope and terminology`);
    }

    // 3. Sources Map
    const sourceIds = new Set(dossier.sources.map(s => s.sourceId));

    // 4. Chronology
    if (!dossier.chronology || dossier.chronology.length === 0) {
      errors.push(`Dossier ${dossier.id}: Chronology must contain at least one entry`);
    } else {
      for (const item of dossier.chronology) {
        if (!item.date || !item.title?.en || !item.title?.ur) {
          errors.push(`Dossier ${dossier.id}: Chronology item missing date or title`);
        }
        for (const sId of item.sourceIds) {
          if (!sourceIds.has(sId)) {
            errors.push(`Dossier ${dossier.id}: Chronology item cites missing source '${sId}'`);
          }
        }
      }
    }

    // 5. Claims & Evidence
    for (const claim of dossier.claims) {
      if (!claim.assertion?.en || !claim.assertion?.ur) {
        errors.push(`Dossier ${dossier.id}: Claim ${claim.claimId} missing bilingual assertion`);
      }
      if (!claim.sourceIds || claim.sourceIds.length === 0) {
        errors.push(`Dossier ${dossier.id}: Claim ${claim.claimId} lacks source citations`);
      } else {
        for (const sId of claim.sourceIds) {
          if (!sourceIds.has(sId)) {
            errors.push(`Dossier ${dossier.id}: Claim ${claim.claimId} cites missing source '${sId}'`);
          }
        }
      }

      // Epistemological check: court_finding must have a court_judgment or court_order source
      if (claim.findingType === 'court_finding' || claim.findingType === 'appellate_court_finding') {
        const citedSources = dossier.sources.filter(s => claim.sourceIds.includes(s.sourceId));
        const hasJudicialSource = citedSources.some(s =>
          s.sourceType === 'court_judgment' ||
          s.sourceType === 'court_order' ||
          s.sourceType === 'supreme_court_record' ||
          s.sourceType === 'high_court_record'
        );
        if (!hasJudicialSource) {
          errors.push(`Dossier ${dossier.id}: Claim ${claim.claimId} is labeled '${claim.findingType}' but lacks a primary judicial source.`);
        }
      }
    }

    // 6. Related Records
    for (const recId of dossier.relatedRecordIds) {
      if (!recordIdSet.has(recId)) {
        errors.push(`Dossier ${dossier.id}: Related record '${recId}' does not exist in ALL_ARCHIVE_RECORDS`);
      }
    }
    if (!recordIdSet.has(dossier.featuredRecordId)) {
      errors.push(`Dossier ${dossier.id}: Featured record '${dossier.featuredRecordId}' does not exist in ALL_ARCHIVE_RECORDS`);
    }

    // 7. Privacy Review
    if (!dossier.privacyReview) {
      errors.push(`Dossier ${dossier.id}: Missing privacy review object`);
    } else {
      if (dossier.privacyReview.piiRedacted !== true) {
        errors.push(`Dossier ${dossier.id}: Privacy review piiRedacted must be confirmed true`);
      }
      if (dossier.privacyReview.allegationsDistinguishedFromFindings !== true) {
        errors.push(`Dossier ${dossier.id}: Privacy review must confirm allegations are distinguished from findings`);
      }
      if (!dossier.privacyReview.lastReviewedDate) {
        errors.push(`Dossier ${dossier.id}: Privacy review must have a lastReviewedDate`);
      }
    }

    // 8. Editorial Status consistency
    if (dossier.editorialStatus === 'published' && dossier.verificationStatus === 'unverified') {
      errors.push(`Dossier ${dossier.id}: Cannot mark unverified dossier as published`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
