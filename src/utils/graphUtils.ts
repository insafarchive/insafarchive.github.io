/**
 * INSAF ARCHIVE (انصاف آرکائیو)
 * Graph Traversal Engine & Indexed Relational Architecture
 */

import type { ArchiveRecord, RelationshipPredicate, RecordRelationship, SourceCitation } from '../types/archive';

export interface ConnectedRecordResult {
  targetRecord: ArchiveRecord;
  predicate: RelationshipPredicate;
  isInverse: boolean;
  label: { en: string; ur: string };
  description?: { en: string; ur: string };
}

export const PREDICATE_LABELS: Record<
  RelationshipPredicate,
  { en: string; ur: string; inverse: RelationshipPredicate; inverseEn: string; inverseUr: string }
> = {
  relatedTo: {
    en: 'Related to',
    ur: 'متعلقہ ہے',
    inverse: 'relatedTo',
    inverseEn: 'Related to',
    inverseUr: 'متعلقہ ہے',
  },
  causedBy: {
    en: 'Caused by',
    ur: 'وجہ بنا',
    inverse: 'resultedIn',
    inverseEn: 'Resulted in',
    inverseUr: 'کا نتیجہ نکلا',
  },
  followedBy: {
    en: 'Followed by',
    ur: 'اس کے بعد ہوا',
    inverse: 'precededBy',
    inverseEn: 'Preceded by',
    inverseUr: 'اس سے قبل ہوا',
  },
  precededBy: {
    en: 'Preceded by',
    ur: 'اس سے قبل ہوا',
    inverse: 'followedBy',
    inverseEn: 'Followed by',
    inverseUr: 'اس کے بعد ہوا',
  },
  partOf: {
    en: 'Part of',
    ur: 'حصہ ہے',
    inverse: 'supersedes',
    inverseEn: 'Encompasses',
    inverseUr: 'شامل کرتا ہے',
  },
  memberOf: {
    en: 'Member of',
    ur: 'رکن ہے',
    inverse: 'involvesPerson',
    inverseEn: 'Includes member',
    inverseUr: 'رکن شامل ہے',
  },
  involvesPerson: {
    en: 'Involves person',
    ur: 'شخصیت شامل ہے',
    inverse: 'subjectOf',
    inverseEn: 'Subject of',
    inverseUr: 'موضوع ہے',
  },
  involvesInstitution: {
    en: 'Involves institution',
    ur: 'ادارہ شامل ہے',
    inverse: 'subjectOf',
    inverseEn: 'Subject of',
    inverseUr: 'موضوع ہے',
  },
  documentedBy: {
    en: 'Documented by',
    ur: 'دستاویزی ثبوت بذریعہ',
    inverse: 'sourceFor',
    inverseEn: 'Documentary source for',
    inverseUr: 'دستاویزی ماخذ برائے',
  },
  reportedBy: {
    en: 'Reported by',
    ur: 'رپورٹ بذریعہ',
    inverse: 'sourceFor',
    inverseEn: 'Reported upon',
    inverseUr: 'پر رپورٹ کیا گیا',
  },
  investigatedBy: {
    en: 'Investigated by',
    ur: 'تحقیقات بذریعہ',
    inverse: 'subjectOf',
    inverseEn: 'Investigated incident',
    inverseUr: 'تحقیقی واقعہ',
  },
  challengedBy: {
    en: 'Challenged by',
    ur: 'چیلنج کیا گیا بذریعہ',
    inverse: 'respondedTo',
    inverseEn: 'Challenged',
    inverseUr: 'کو چیلنج کیا',
  },
  respondedTo: {
    en: 'Responded to',
    ur: 'جواب دیا گیا',
    inverse: 'challengedBy',
    inverseEn: 'Response from',
    inverseUr: 'کا جواب موصول ہوا',
  },
  contradicts: {
    en: 'Contradicts findings of',
    ur: 'نتائج سے متصادم ہے',
    inverse: 'contradicts',
    inverseEn: 'Contradicts findings of',
    inverseUr: 'نتائج سے متصادم ہے',
  },
  confirms: {
    en: 'Confirms / Corroborates',
    ur: 'تصدیق و تائید کرتا ہے',
    inverse: 'confirms',
    inverseEn: 'Confirmed by',
    inverseUr: 'کی تصدیق ہوئی بذریعہ',
  },
  cites: {
    en: 'Cites / References',
    ur: 'حوالہ دیتا ہے',
    inverse: 'sourceFor',
    inverseEn: 'Cited by',
    inverseUr: 'میں حوالہ دیا گیا',
  },
  sourceFor: {
    en: 'Source for',
    ur: 'ماخذ ہے برائے',
    inverse: 'documentedBy',
    inverseEn: 'Documented by',
    inverseUr: 'دستاویزی ثبوت بذریعہ',
  },
  subjectOf: {
    en: 'Subject of proceeding/dossier',
    ur: 'کارروائی کا موضوع ہے',
    inverse: 'involvesPerson',
    inverseEn: 'Involves subject',
    inverseUr: 'موضوع شامل ہے',
  },
  resultedIn: {
    en: 'Resulted in',
    ur: 'کا نتیجہ نکلا',
    inverse: 'causedBy',
    inverseEn: 'Caused by',
    inverseUr: 'وجہ بنا',
  },
  appealedAs: {
    en: 'Appealed as',
    ur: 'اپیل دائر ہوئی بطور',
    inverse: 'precededBy',
    inverseEn: 'Appeal arising from',
    inverseUr: 'سے متعلقہ اپیل',
  },
  supersedes: {
    en: 'Supersedes / Overrules',
    ur: 'کالعدم قرار دیا / منسوخ کیا',
    inverse: 'predecessorOf',
    inverseEn: 'Superseded by',
    inverseUr: 'کالعدم قرار دیا گیا بذریعہ',
  },
  successorOf: {
    en: 'Successor of',
    ur: 'جانشین ادارہ / واقعہ',
    inverse: 'predecessorOf',
    inverseEn: 'Predecessor of',
    inverseUr: 'پیش رو ادارہ / واقعہ',
  },
  predecessorOf: {
    en: 'Predecessor of',
    ur: 'پیش رو ادارہ / واقعہ',
    inverse: 'successorOf',
    inverseEn: 'Successor of',
    inverseUr: 'جانشین ادارہ / واقعہ',
  },
};

/**
 * High-Performance O(1) In-Memory Graph Index for 10,000+ Records
 */
export class ArchiveGraphIndex {
  public recordsById = new Map<string, ArchiveRecord>();
  public outboundBySourceId = new Map<string, RecordRelationship[]>();
  public inboundByTargetId = new Map<string, Array<{ sourceId: string; relationship: RecordRelationship }>>();
  public sourcesById = new Map<string, SourceCitation>();

  constructor(records: ArchiveRecord[] = []) {
    this.rebuildIndex(records);
  }

  public rebuildIndex(records: ArchiveRecord[]): void {
    this.recordsById.clear();
    this.outboundBySourceId.clear();
    this.inboundByTargetId.clear();
    this.sourcesById.clear();

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      this.recordsById.set(record.id, record);

      // Index sources
      for (let s = 0; s < record.sources.length; s++) {
        const src = record.sources[s];
        this.sourcesById.set(src.sourceId, src);
      }

      // Index outbound relationships
      if (record.relationships && record.relationships.length > 0) {
        this.outboundBySourceId.set(record.id, record.relationships);

        for (let r = 0; r < record.relationships.length; r++) {
          const rel = record.relationships[r];
          const inboundList = this.inboundByTargetId.get(rel.targetRecordId) || [];
          inboundList.push({ sourceId: record.id, relationship: rel });
          this.inboundByTargetId.set(rel.targetRecordId, inboundList);
        }
      }
    }
  }

  public getRecord(id: string): ArchiveRecord | undefined {
    return this.recordsById.get(id);
  }

  public getSource(sourceId: string): SourceCitation | undefined {
    return this.sourcesById.get(sourceId);
  }

  public getConnectedRecords(currentRecordId: string): ConnectedRecordResult[] {
    const current = this.recordsById.get(currentRecordId);
    if (!current) return [];

    const results: ConnectedRecordResult[] = [];
    const seenEdgeKeys = new Set<string>();

    // 1. Direct Outbound Relationships O(k)
    const outbound = this.outboundBySourceId.get(currentRecordId) || [];
    for (let i = 0; i < outbound.length; i++) {
      const rel = outbound[i];
      const target = this.recordsById.get(rel.targetRecordId);
      if (target) {
        const config = PREDICATE_LABELS[rel.predicate] || {
          en: rel.predicate,
          ur: rel.predicate,
          inverse: rel.predicate,
          inverseEn: rel.predicate,
          inverseUr: rel.predicate,
        };
        const edgeKey = `out-${target.id}-${rel.predicate}`;
        if (!seenEdgeKeys.has(edgeKey)) {
          seenEdgeKeys.add(edgeKey);
          results.push({
            targetRecord: target,
            predicate: rel.predicate,
            isInverse: false,
            label: { en: config.en, ur: config.ur },
            description: rel.description,
          });
        }
      }
    }

    // 2. Inbound Relationships O(k)
    const inbound = this.inboundByTargetId.get(currentRecordId) || [];
    for (let i = 0; i < inbound.length; i++) {
      const { sourceId, relationship } = inbound[i];
      const source = this.recordsById.get(sourceId);
      if (source) {
        const config = PREDICATE_LABELS[relationship.predicate];
        const inversePred = config?.inverse || relationship.predicate;
        const edgeKey = `in-${source.id}-${inversePred}`;
        if (!seenEdgeKeys.has(edgeKey)) {
          seenEdgeKeys.add(edgeKey);
          results.push({
            targetRecord: source,
            predicate: inversePred,
            isInverse: true,
            label: {
              en: config?.inverseEn || relationship.predicate,
              ur: config?.inverseUr || relationship.predicate,
            },
            description: relationship.description,
          });
        }
      }
    }

    return results;
  }

  public validateGraphIntegrity(): {
    isValid: boolean;
    brokenLinks: Array<{ sourceRecordId: string; targetRecordId: string; predicate: RelationshipPredicate }>;
  } {
    const brokenLinks: Array<{ sourceRecordId: string; targetRecordId: string; predicate: RelationshipPredicate }> = [];

    this.outboundBySourceId.forEach((relationships, sourceId) => {
      relationships.forEach(rel => {
        if (!this.recordsById.has(rel.targetRecordId)) {
          brokenLinks.push({
            sourceRecordId: sourceId,
            targetRecordId: rel.targetRecordId,
            predicate: rel.predicate,
          });
        }
      });
    });

    return {
      isValid: brokenLinks.length === 0,
      brokenLinks,
    };
  }
}

/**
 * Factory function to build an ArchiveGraphIndex
 */
export function buildGraphIndex(records: ArchiveRecord[]): ArchiveGraphIndex {
  return new ArchiveGraphIndex(records);
}

/**
 * Backward-compatible helper that resolves connected records
 */
export function resolveConnectedRecords(
  currentRecordId: string,
  allRecords: ArchiveRecord[],
  indexInstance?: ArchiveGraphIndex
): ConnectedRecordResult[] {
  const index = indexInstance || new ArchiveGraphIndex(allRecords);
  return index.getConnectedRecords(currentRecordId);
}
