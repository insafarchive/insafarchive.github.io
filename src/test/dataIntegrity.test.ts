/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Production Dataset Integrity & Reference Auditing Suite
 */

import { describe, it, expect } from 'vitest';
import { SEED_ARCHIVE_RECORDS } from '../data/seedRecords';
import { validateDatasetIntegrity, validateArchiveRecord } from '../utils/schemaValidator';
import { buildGraphIndex } from '../utils/graphUtils';

describe('Production Seed Dataset Integrity Suite', () => {
  it('validates that all seed records pass individual Schema v1.0.0 validation', () => {
    expect(SEED_ARCHIVE_RECORDS.length).toBeGreaterThan(0);

    for (const record of SEED_ARCHIVE_RECORDS) {
      const result = validateArchiveRecord(record);
      expect(result.isValid, `Record ${record.id} failed validation: ${result.errors.map(e => `${e.field}: ${e.message}`).join(', ')}`).toBe(true);
      expect(result.errors.length).toBe(0);
    }
  });

  it('validates dataset-wide integrity with zero broken links and zero duplicate IDs', () => {
    const datasetResult = validateDatasetIntegrity(SEED_ARCHIVE_RECORDS);
    expect(datasetResult.isValid, `Dataset integrity errors: ${datasetResult.errors.join('; ')}`).toBe(true);
    expect(datasetResult.errors.length).toBe(0);
  });

  it('guarantees all record IDs are unique, non-empty, and follow naming conventions', () => {
    const idSet = new Set<string>();
    for (const record of SEED_ARCHIVE_RECORDS) {
      expect(record.id).toBeTruthy();
      expect(typeof record.id).toBe('string');
      expect(record.id.trim()).toBe(record.id);
      expect(idSet.has(record.id), `Duplicate record ID discovered: ${record.id}`).toBe(false);
      idSet.add(record.id);
    }
  });

  it('guarantees all evidentiary claims cite existing sources within the record or dataset', () => {
    for (const record of SEED_ARCHIVE_RECORDS) {
      const recordSourceIds = new Set(record.sources.map(s => s.sourceId));
      for (const claim of record.claims) {
        expect(claim.sourceIds.length).toBeGreaterThan(0);
        for (const sId of claim.sourceIds) {
          expect(recordSourceIds.has(sId), `Claim ${claim.claimId} in record ${record.id} references missing source ${sId}`).toBe(true);
        }
      }
    }
  });

  it('verifies graph index builds cleanly and all relationship targets exist', () => {
    const graph = buildGraphIndex(SEED_ARCHIVE_RECORDS);
    expect(graph.recordsById.size).toBe(SEED_ARCHIVE_RECORDS.length);

    for (const record of SEED_ARCHIVE_RECORDS) {
      for (const rel of record.relationships) {
        expect(graph.recordsById.has(rel.targetRecordId), `Record ${record.id} links to unknown target ${rel.targetRecordId}`).toBe(true);
      }
    }
  });

  it('verifies all bilingual titles, summaries, and narratives are non-empty', () => {
    for (const record of SEED_ARCHIVE_RECORDS) {
      expect(record.title.en.trim().length).toBeGreaterThan(3);
      expect(record.title.ur.trim().length).toBeGreaterThan(3);
      expect(record.summary.en.trim().length).toBeGreaterThan(10);
      expect(record.summary.ur.trim().length).toBeGreaterThan(10);
      expect(record.narrative.en.trim().length).toBeGreaterThan(20);
      expect(record.narrative.ur.trim().length).toBeGreaterThan(20);
    }
  });
});
