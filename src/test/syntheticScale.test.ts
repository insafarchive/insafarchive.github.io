/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Synthetic Scale & Performance Benchmark Suite
 * Tests 100, 1,000, and 10,000 records
 */

import { describe, it, expect } from 'vitest';
import type { ArchiveRecord } from '../types/archive';
import { buildGraphIndex, resolveConnectedRecords } from '../utils/graphUtils';
import { executeSearch } from '../utils/searchEngine';

function generateSyntheticDataset(count: number): ArchiveRecord[] {
  const records: ArchiveRecord[] = [];
  const domains = ['legal', 'human_rights', 'journalism_media', 'political_constitutional', 'historical', 'economic_public_policy'] as const;
  const types = ['court_case', 'court_judgment', 'human_rights_incident', 'journalist_killing', 'ipp_record', 'commission_report'] as const;

  for (let i = 0; i < count; i++) {
    const padId = String(i + 1).padStart(6, '0');
    const recordId = `IA-AR-${padId}`;
    const domain = domains[i % domains.length];
    const recordType = types[i % types.length];
    const targetIdx = (i + 1) % count;
    const targetId = `IA-AR-${String(targetIdx + 1).padStart(6, '0')}`;

    records.push({
      schemaVersion: '1.0.0',
      id: recordId,
      slug: `record-${padId}-synthetic-benchmark`,
      domain,
      recordType,
      title: {
        en: `Archival Case Record ${padId} on Constitutional Governance`,
        ur: `آئینی حکمرانی اور عدالتی کارروائی پر آرکائیو ریکارڈ ${padId}`,
      },
      summary: {
        en: `Documentary evidentiary summary for archival node ${padId} in Pakistan legal and policy repository.`,
        ur: `پاکستانی قانونی و آئینی تاریخ میں دستاویزی آرکائیو نوڈ ${padId} کا خلاصہ۔`,
      },
      narrative: {
        en: `Full procedural history and documentary review for synthetic record ${padId}. Explores legal petitions, state inquiries, and gazetted decisions.`,
        ur: `ریکارڈ نمبر ${padId} کا مکمل عدالتی اور قانونی احوال اور دستاویزات کا جائزہ۔`,
      },
      date: {
        dateString: `202${(i % 5)}-0${(i % 9) + 1}-15`,
        precision: 'day',
        formattedDisplay: {
          en: `May 15, 202${i % 5}`,
          ur: `15 مئی 202${i % 5}ء`,
        },
      },
      claims: [
        {
          claimId: `clm-${padId}-1`,
          findingType: i % 2 === 0 ? 'court_finding' : 'documented_fact',
          assertion: {
            en: `Judicial finding establishing procedural compliance in transaction ${padId}.`,
            ur: `عدالتی کارروائی میں قانونی ضوابط کی توثیق برائے ریکارڈ ${padId}۔`,
          },
          sourceIds: [`src-${padId}-1`],
        },
      ],
      sources: [
        {
          sourceId: `src-${padId}-1`,
          sourceType: 'court_judgment',
          title: {
            en: `High Court / Supreme Court Order Sheet ${padId}`,
            ur: `عدالتی حکم نامہ و ریکارڈ ${padId}`,
          },
          language: 'both',
          verificationStatus: 'primary_source',
          documentIdentifier: `PLD 202${i % 5} SC ${i + 100}`,
        },
      ],
      evidenceMedia: [],
      relationships: [
        {
          relationshipId: `rel-${padId}-to-${targetId}`,
          targetRecordId: targetId,
          predicate: 'relatedTo',
        },
      ],
      categories: ['Governance', 'Constitutional Law', 'Judicial Orders'],
      tags: {
        en: ['Supreme Court', 'Public Policy', `Tag-${i % 20}`],
        ur: ['سپریم کورٹ', 'عوامی پالیسی', `ٹیگ-${i % 20}`],
      },
      verificationStatus: 'verified',
      editorialStatus: 'published',
      privacyClassification: 'public',
      privacyFlags: {},
      version: 1,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    });
  }

  return records;
}

describe('Synthetic Scale & Performance Benchmarks', () => {
  it('measures performance at 100 records', () => {
    const dataset = generateSyntheticDataset(100);
    expect(dataset.length).toBe(100);

    const indexStart = performance.now();
    const graphIndex = buildGraphIndex(dataset);
    const indexDuration = performance.now() - indexStart;

    expect(graphIndex.recordsById.size).toBe(100);
    expect(indexDuration).toBeLessThan(50); // Under 50ms

    const searchStart = performance.now();
    const searchResults = executeSearch(dataset, { query: 'Governance' });
    const searchDuration = performance.now() - searchStart;

    expect(searchResults.length).toBe(100);
    expect(searchDuration).toBeLessThan(50);
  });

  it('measures performance at 1,000 records', () => {
    const dataset = generateSyntheticDataset(1000);
    expect(dataset.length).toBe(1000);

    const indexStart = performance.now();
    const graphIndex = buildGraphIndex(dataset);
    const indexDuration = performance.now() - indexStart;

    expect(graphIndex.recordsById.size).toBe(1000);
    expect(indexDuration).toBeLessThan(100); // Under 100ms

    // O(1) indexed lookup vs graph traversal
    const lookupStart = performance.now();
    const targetRecord = graphIndex.recordsById.get('IA-AR-000500');
    const lookupDuration = performance.now() - lookupStart;

    expect(targetRecord).toBeDefined();
    expect(lookupDuration).toBeLessThan(5);

    // Search query timing
    const searchStart = performance.now();
    const searchResults = executeSearch(dataset, { query: '000500' });
    const searchDuration = performance.now() - searchStart;

    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchDuration).toBeLessThan(100);
  });

  it('measures performance at 10,000 records (Stress Target)', () => {
    const dataset = generateSyntheticDataset(10000);
    expect(dataset.length).toBe(10000);

    // Measure Graph Index Construction
    const indexStart = performance.now();
    const graphIndex = buildGraphIndex(dataset);
    const indexDuration = performance.now() - indexStart;

    expect(graphIndex.recordsById.size).toBe(10000);
    expect(indexDuration).toBeLessThan(500); // Under 500ms for 10k items

    // Measure O(1) Index Lookup
    const randomId = 'IA-AR-007542';
    const lookupStart = performance.now();
    const found = graphIndex.recordsById.get(randomId);
    const lookupDuration = performance.now() - lookupStart;

    expect(found).toBeDefined();
    expect(found?.id).toBe(randomId);
    expect(lookupDuration).toBeLessThan(2); // Sub-2ms instant lookup

    // Measure Traversal using Graph Index
    const traversalStart = performance.now();
    const connected = resolveConnectedRecords(randomId, dataset, graphIndex);
    const traversalDuration = performance.now() - traversalStart;

    expect(connected.length).toBeGreaterThan(0);
    expect(traversalDuration).toBeLessThan(15); // Sub-15ms graph edge resolution

    // Measure Full Text & Token Search across 10k Records
    const searchStart = performance.now();
    const searchResults = executeSearch(dataset, { query: '007542' });
    const searchDuration = performance.now() - searchStart;

    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults[0].id).toBe(randomId);
    expect(searchDuration).toBeLessThan(1000); // Sub-second (1000ms) full text scan across 10,000 complete items
  });
});
