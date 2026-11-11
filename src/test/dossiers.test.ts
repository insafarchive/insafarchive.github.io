/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Archival Dossiers Quality, Evidence Attribution & Privacy Validation Suite
 * Master Prompt — Part 5 Testing
 */

import { describe, it, expect } from 'vitest';
import { ALL_ARCHIVAL_DOSSIERS, validateDossiersIntegrity, getDossierById, getDossiersByStatus } from '../data/dossiers';
import { ALL_ARCHIVE_RECORDS } from '../data/records';
import { CONSTITUTION_COVERAGE_REGISTER } from '../data/constitution';

describe('Part 5 Archival Dossiers Quality & Evidence Suite', () => {
  it('validates dataset-wide integrity with zero broken links and zero duplicate IDs', () => {
    const result = validateDossiersIntegrity();
    expect(result.isValid, `Dossier integrity errors: ${result.errors.join('; ')}`).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('contains the target initial set of 12 dossiers spanning 6 core public-interest domains', () => {
    expect(ALL_ARCHIVAL_DOSSIERS.length).toBe(12);

    const domains = new Set(ALL_ARCHIVAL_DOSSIERS.map(d => d.domain));
    expect(domains.has('constitutional_legal')).toBe(true);
    expect(domains.has('major_public_events')).toBe(true);
    expect(domains.has('journalism_press_freedom')).toBe(true);
    expect(domains.has('historical_institutional')).toBe(true);
    expect(domains.has('energy_public_finance')).toBe(true);
    expect(domains.has('due_process_rights')).toBe(true);
  });

  it('guarantees all dossier IDs are stable, unique, and follow dos-pk-* convention', () => {
    const ids = new Set<string>();
    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      expect(dossier.id).toMatch(/^dos-pk-[a-z0-9-]+$/);
      expect(ids.has(dossier.id)).toBe(false);
      ids.add(dossier.id);
    }
  });

  it('guarantees complete bilingual titles, overviews, and scope notes for all 12 dossiers', () => {
    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      expect(dossier.title.en.trim().length).toBeGreaterThan(5);
      expect(dossier.title.ur.trim().length).toBeGreaterThan(5);
      expect(dossier.overview.en.trim().length).toBeGreaterThan(30);
      expect(dossier.overview.ur.trim().length).toBeGreaterThan(30);
      expect(dossier.scopeAndTerminology.en.trim().length).toBeGreaterThan(20);
      expect(dossier.scopeAndTerminology.ur.trim().length).toBeGreaterThan(20);
    }
  });

  it('enforces that every evidentiary claim has at least one valid primary or secondary source citation', () => {
    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      const sourceIdSet = new Set(dossier.sources.map(s => s.sourceId));
      expect(dossier.claims.length).toBeGreaterThan(0);

      for (const claim of dossier.claims) {
        expect(claim.sourceIds.length).toBeGreaterThan(0);
        for (const sId of claim.sourceIds) {
          expect(sourceIdSet.has(sId), `Claim ${claim.claimId} in dossier ${dossier.id} references missing source ${sId}`).toBe(true);
        }
      }
    }
  });

  it('strictly prohibits labeling political claims or news reports as court_finding without judicial sources', () => {
    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      for (const claim of dossier.claims) {
        if (claim.findingType === 'court_finding' || claim.findingType === 'appellate_court_finding') {
          const citedSources = dossier.sources.filter(s => claim.sourceIds.includes(s.sourceId));
          const hasJudicialSource = citedSources.some(s =>
            s.sourceType === 'court_judgment' ||
            s.sourceType === 'court_order' ||
            s.sourceType === 'supreme_court_record' ||
            s.sourceType === 'high_court_record'
          );
          expect(
            hasJudicialSource,
            `Dossier ${dossier.id} labels claim ${claim.claimId} as ${claim.findingType} without citing a court judgment or order.`
          ).toBe(true);
        }
      }
    }
  });

  it('verifies all featured and related records exist within the master ALL_ARCHIVE_RECORDS registry', () => {
    const recordIdSet = new Set(ALL_ARCHIVE_RECORDS.map(r => r.id));

    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      expect(
        recordIdSet.has(dossier.featuredRecordId),
        `Dossier ${dossier.id} featuredRecordId '${dossier.featuredRecordId}' missing in archive records.`
      ).toBe(true);

      for (const relId of dossier.relatedRecordIds) {
        expect(
          recordIdSet.has(relId),
          `Dossier ${dossier.id} relatedRecordId '${relId}' missing in archive records.`
        ).toBe(true);
      }
    }
  });

  it('verifies constitutional provision mappings reference valid Articles in CONSTITUTION_COVERAGE_REGISTER', () => {
    const validArticleIds = new Set(CONSTITUTION_COVERAGE_REGISTER.map(a => a.articleId));

    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      for (const artId of dossier.constitutionalProvisions) {
        expect(
          validArticleIds.has(artId),
          `Dossier ${dossier.id} maps invalid constitutional Article ID '${artId}'.`
        ).toBe(true);
      }
    }
  });

  it('enforces privacy review compliance: piiRedacted and allegationsDistinguished are confirmed true', () => {
    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      expect(dossier.privacyReview).toBeDefined();
      expect(dossier.privacyReview.piiRedacted).toBe(true);
      expect(dossier.privacyReview.allegationsDistinguishedFromFindings).toBe(true);
      expect(dossier.privacyReview.lastReviewedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('guarantees draft/research backlog dossiers are not marked as published', () => {
    const published = getDossiersByStatus('published');
    const underReview = getDossiersByStatus('under_review');
    const drafts = getDossiersByStatus('draft');

    expect(published.length).toBeGreaterThanOrEqual(6);
    expect(underReview.length).toBeGreaterThanOrEqual(5);
    expect(drafts.length).toBeGreaterThanOrEqual(1);

    const muridke = getDossierById('dos-pk-event-muridke-tragedy-2021');
    expect(muridke).toBeDefined();
    expect(muridke?.editorialStatus).toBe('draft');
    expect(muridke?.verificationStatus).toBe('under_investigation');
  });

  it('verifies chronology date formatting and ordering integrity', () => {
    for (const dossier of ALL_ARCHIVAL_DOSSIERS) {
      for (const item of dossier.chronology) {
        expect(item.date).toMatch(/^\d{4}(-\d{2}(-\d{2})?)?$/);
        expect(item.title.en.trim().length).toBeGreaterThan(3);
        expect(item.title.ur.trim().length).toBeGreaterThan(3);
      }
    }
  });
});
